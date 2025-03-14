import articleCrawler from './article';
import battingCrawler from './batting';

(async () => {
  while (1) {
    await battingCrawler();
  }
})();

(async () => {
  while (1) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await articleCrawler();
    await new Promise((resolve) => setTimeout(resolve, 600000));
  }
})();
