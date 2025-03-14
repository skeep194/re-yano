import axios from 'axios';
import { discordClient, prismaClient } from '../util/externalClient';
import { ErArticle } from '@prisma/client';
import { EmbedBuilder } from 'discord.js';
import { DateTime } from 'luxon';

interface APIArticle {
  per_page: number;
  current_page: number;
  total_page: number;
  article_count: number;
  articles: {
    id: number;
    url: string;
    board_id: number;
    category_id: number;
    thumbnail_url: string;
    view_count: number;
    created_at: string;
    updated_at: string;
    i18ns: {
      ko_KR: {
        locale: string;
        title: string;
        summary: string;
      };
    };
  }[];
}

export default async function articleCrawler() {
  const response = (
    await axios.get<APIArticle>('/posts/news?page=1', {
      baseURL: 'https://playeternalreturn.com/api/v1',
      headers: { 'Accept-Language': 'ko' },
    })
  ).data;

  const channels = await prismaClient.articleSubscribe.findMany();
  const messages: { type: 'UPDATE' | 'CREATE'; data: ErArticle }[] = [];

  await Promise.all(
    response.articles.map(async (article) => {
      const existArticle = await prismaClient.erArticle.findUnique({
        where: {
          id: article.id,
        },
      });
      if (existArticle == null) {
        const data = await prismaClient.erArticle.create({
          data: {
            id: article.id,
            createAt: article.created_at,
            thumbnailUrl: article.thumbnail_url,
            title: article.i18ns.ko_KR.title,
            updateAt: article.updated_at,
            url: article.url,
            summary: article.i18ns.ko_KR.summary,
          },
        });
        console.log(`notice create: ${data.title}`);
        messages.push({ type: 'CREATE', data: data });
      } else if (
        DateTime.fromJSDate(existArticle.updateAt) <
        DateTime.fromISO(article.updated_at)
      ) {
        const data = await prismaClient.erArticle.update({
          where: {
            id: article.id,
          },
          data: {
            id: article.id,
            createAt: article.created_at,
            thumbnailUrl: article.thumbnail_url,
            title: article.i18ns.ko_KR.title,
            updateAt: article.updated_at,
            url: article.url,
            summary: article.i18ns.ko_KR.summary,
          },
        });
        console.log(`notice update: ${data.title}`);
        // 이리 웹 API의 문제인지는 모르겠으나 매 API 호출마다 update_at값이 바뀌는 문제가 있어 확인될 때 까지 업데이트 알림은 보내지 않음
        // messages.push({ type: 'UPDATE', data: data });
      }
    })
  );

  channels.forEach(async (value) => {
    const channel = await discordClient.channels.fetch(value.channelId);
    if (channel?.isSendable()) {
      messages.forEach((message) => {
        console.log(`notice send: ${channel.id}: ${message.data.title}`);
        const embed = new EmbedBuilder()
          .setTitle(message.data.title === '' ? ' ' : message.data.title)
          .setDescription(
            message.data.summary === '' ? ' ' : message.data.summary
          )
          .setThumbnail(message.data.thumbnailUrl)
          .setURL(message.data.url)
          .setAuthor({
            name: message.type === 'UPDATE' ? '공지 수정' : '신규 공지',
          });
        channel.send({ embeds: [embed] });
      });
    }
  });
}
