import MainPage from "../../pageobjects/MainPage"

describe('Tests for product categories change.', () => {
    const verifyProducts = (expectedProducts) => {
        MainPage.getProductsList()
            .then(items => {
                expectedProducts.forEach((product, index) => {
                    expect(items[index]).to.contain.text(product);
                });
            });
    };

    beforeEach(() => {
        MainPage.open();
    });

    it('Positive: User can choose product category: Phones', () => {
        cy.log('WHEN User clicks Phones category');
        MainPage.performPhonesSearch();
        cy.log('THEN phones are presented on main page');
        const phones = ['Samsung', 'Nokia', 'Nexus', 'Samsung', 'Iphone', 'Sony', 'HTC'];
        verifyProducts(phones);
    });

    it('Positive: User can choose product category: Laptops', () => {
        cy.log('WHEN User clicks Laptops category');
        MainPage.performLaptopesSearch();
        cy.log('THEN laptops are presented on main page');
        const laptops = ['Sony', 'Sony', 'MacBook air', 'Dell', 'Dell', 'MacBook Pro'];
        verifyProducts(laptops);
    });

    it('Positive: User can choose product category: Monitors', () => {
        cy.log('WHEN User clicks Monitors category');
        MainPage.performMonitorsSearch();
        cy.log('THEN monitors are presented on main page');
        const monitors = ['Apple monitor', 'ASUS'];
        verifyProducts(monitors);
    });
});
