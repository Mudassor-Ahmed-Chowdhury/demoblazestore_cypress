import ContactPage from "../../pageobjects/ContactPage"
import MainPage from "../../pageobjects/MainPage"

describe('Tests for CONTACT feature.', () => {
    beforeEach(() => {
        cy.fixture('message').then((data) =>
        {
            cy.wrap(data).as('ms')
        })
        MainPage.open()
    })
    it('Positive: User can send contact message', () => {
        cy.get('@ms').then((ms) => {
            MainPage.moveToContactPage();
            ContactPage.fillTheForm(ms.email, ms.name, ms.message);
            ContactPage.sendMessage();

            cy.on ('window:alert', (text) => {
              expect(text).to.contains('Thanks for the message!!');
            })
        })
    })
})