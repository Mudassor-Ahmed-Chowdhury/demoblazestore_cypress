import AboutUsPage from "../../pageobjects/AboutUsPage"
import MainPage from "../../pageobjects/MainPage"

describe('Tests for CONTACT feature.', () => {
    beforeEach(() => {
        MainPage.open()
    })
    it('Positive: User can watch video about company.', () => {
        MainPage.moveToAboutUsPage();
        AboutUsPage
        .getVideo()
        .invoke('attr', 'class')
        .should('contain', 'vjs-paused');
        AboutUsPage.startVideo();
        AboutUsPage
        .getVideo()
        .invoke('attr', 'class')
        .should('contain', 'vjs-playing');

        
    })
})