import { createBooking, getBookingById, updateBooking, updateBookingNoBody } from "../../service/bookingService";
import { getBookingData } from "../../helper/dataGenerator";
import { faker } from '@faker-js/faker';

describe('Tests for UPDATE (PUT) Booking endpoint', () => {
    it('Positive: Update booking data', () => {
        let bookingData = getBookingData();
        let newBookingData = getBookingData();

        createBooking(bookingData).then(response => {
            const newBookingDataId = Cypress.env('responses')[0].bookingid;
            expect(response.status).to.eq(200);
            expect(response.body.booking).to.include({
                firstname: bookingData.firstname,
                lastname: bookingData.lastname,
                depositpaid: bookingData.depositpaid,
                additionalneeds: bookingData.additionalneeds,
            });
            expect(response.body.booking.bookingdates).to.include({
                checkin: bookingData.bookingdates.checkin.toLocaleDateString('fr-CA'),
                checkout: bookingData.bookingdates.checkout.toLocaleDateString('fr-CA'),
            });

            updateBooking(newBookingData, newBookingDataId).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body).to.include({
                    firstname: newBookingData.firstname,
                    lastname: newBookingData.lastname,
                    depositpaid: newBookingData.depositpaid,
                    additionalneeds: newBookingData.additionalneeds,
                });
                expect(response.body.bookingdates).to.include({
                    checkin: newBookingData.bookingdates.checkin.toLocaleDateString('fr-CA'),
                    checkout: newBookingData.bookingdates.checkout.toLocaleDateString('fr-CA'),
                });

                getBookingById(newBookingDataId).then(response => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.include({
                        firstname: newBookingData.firstname,
                        lastname: newBookingData.lastname,
                        depositpaid: newBookingData.depositpaid,
                        additionalneeds: newBookingData.additionalneeds,
                    });
                    expect(response.body.bookingdates).to.include({
                        checkin: newBookingData.bookingdates.checkin.toLocaleDateString('fr-CA'),
                        checkout: newBookingData.bookingdates.checkout.toLocaleDateString('fr-CA'),
                    });
                });
            });
        });
    });

    it('Negative: Update booking data - empty body', () => {
        let bookingData = getBookingData();
        createBooking(bookingData).then(response => {
            const newBookingDataId = Cypress.env('responses')[0].bookingid;
            updateBooking({}, newBookingDataId, false).then(response => {
                expect(response.status).to.eq(400, 'Bad request');
            });
        });
    });

    it('Negative: Update booking data - no body in a request', () => {
        const newBookingDataId = faker.datatype.number({ min: 10000, max: 100000, precision: 0 });
        updateBookingNoBody(newBookingDataId, false).then(response => {
            expect(response.status).to.eq(400, 'Bad request');
        });
    });

    it('Negative: Update with nonexistent id', () => {
        const newBookingData = getBookingData();
        const newBookingDataId = 1;
        updateBooking(newBookingData, newBookingDataId, false).then(response => {
            expect(response.status).to.eq(405, 'Not allowed');
        });
    });

    it('Negative: Update with invalid booking id - empty', () => {
        const newBookingData = getBookingData();
        updateBooking(newBookingData, "", false).then(response => {
            expect(response.status).to.eq(404, 'Not found');
        });
    });

    it('Negative: Update with invalid booking id - string instead of number', () => {
        const newBookingData = getBookingData();
        const newBookingDataId = faker.commerce.product();
        updateBooking(newBookingData, newBookingDataId, false).then(response => {
            expect(response.status).to.eq(405, 'Not allowed');
        });
    });
});
