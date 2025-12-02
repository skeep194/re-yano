import articleCrawler from './article';
import deleteUserScheduler from './userDelete';

(async () => {
  while (1) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await articleCrawler();
    await new Promise((resolve) => setTimeout(resolve, 600000));
  }
})();

(async () => {
  while (1) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await deleteUserScheduler();
    await new Promise((resolve) => setTimeout(resolve, 6000000));
  }
})();
