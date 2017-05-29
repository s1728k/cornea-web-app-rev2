import { CorenaPage } from './app.po';

describe('corena App', () => {
  let page: CorenaPage;

  beforeEach(() => {
    page = new CorenaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
