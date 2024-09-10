import { createBooking, partialUpdateBooking } from "../../service/bookingService";
import { getBookingData } from "../../helper/dataGenerator";

describe('Tests for partial UPDATE (PATCH) Booking endpoint', () => {
    const updateBookingField = (fixtureName, expectedFields, bookingData) => {
        cy.fixture(fixtureName).as('body');
        cy.get('@body').then(fixture => {
            partialUpdateBooking(fixture, Cypress.env('responses')[0].bookingid).then(response => {
                expect(response.status).to.eq(200);
                expectedFields.forEach(field => {
                    expect(response.body).to.have.property(field.key, field.value);
                });
                expect(response.body).to.have.property('depositpaid', bookingData.depositpaid);
            });
        });
    };

    it('Positive: Update only firstname field', () => {
        let bookingData = getBookingData();
        createBooking(bookingData).then(() => {
            updateBookingField('update_firstname', [
                { key: 'firstname', value: Cypress.env('responses')[0].firstname },
                { key: 'lastname', value: bookingData.lastname }
            ], bookingData);
        });
    });

    it('Positive: Update only lastname field', () => {
        let bookingData = getBookingData();
        createBooking(bookingData).then(() => {
            updateBookingField('update_lastname', [
                { key: 'lastname', value: Cypress.env('responses')[0].lastname },
                { key: 'firstname', value: bookingData.firstname }
            ], bookingData);
        });
    });

    it('Positive: Update only lastname and firstname fields', () => {
        let bookingData = getBookingData();
        createBooking(bookingData).then(() => {
            updateBookingField('update_firstname_lastname', [
                { key: 'firstname', value: Cypress.env('responses')[0].firstname },
                { key: 'lastname', value: Cypress.env('responses')[0].lastname }
            ], bookingData);
        });
    });

    it('Positive: Update only totalprice field', () => {
        let bookingData = getBookingData();
        createBooking(bookingData).then(() => {
            updateBookingField('update_totalprice', [
                { key: 'firstname', value: bookingData.firstname },
                { key: 'lastname', value: bookingData.lastname },
                { key: 'totalprice', value: Cypress.env('responses')[0].totalprice }
            ], bookingData);
        });
    });
});
