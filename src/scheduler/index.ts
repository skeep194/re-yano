import battingCrawler from './batting';

(async () => {
  while (1) {
    await battingCrawler();
  }
})();
