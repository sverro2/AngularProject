import { AngularAssessmentPage } from './app.po';

describe('angular-assessment App', () => {
  let page: AngularAssessmentPage;

  beforeEach(() => {
    page = new AngularAssessmentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
