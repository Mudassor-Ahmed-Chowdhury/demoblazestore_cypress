import {
    createBooking, getBookingByCheckin, getBookingByCheckout, getBookingByFirstname,
    getBookingById, getBookingByLastname, getBookingIds } from "../../service/bookingService";
import { getBookingData } from "../../helper/dataGenerator";

const createAndVerifyBooking = (requestFunction, searchParam) => {
    let bookingData = getBookingData();
    createBooking(bookingData).then(response => {
        expect(response.status).to.eq(200);
        let bookingID = Cypress.env('responses')[0].bookingid;
        let bookingObject = { "bookingid": bookingID };
        cy.log(`Booking ID: ${bookingID}`);

        // Verify the booking based on the parameter
        requestFunction(searchParam).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).deep.include(bookingObject);
        });
    });
};

describe('Tests for GET Bookings endpoints', () => {

    it('Positive: Get bookings data', () => {
        createAndVerifyBooking(getBookingIds);
    });

    it('Positive: Get bookings by firstname', () => {
        createAndVerifyBooking(getBookingByFirstname, (bookingData) => bookingData.firstname);
    });

    it('Positive: Get bookings by lastname', () => {
        createAndVerifyBooking(getBookingByLastname, (bookingData) => bookingData.lastname);
    });

    it('Positive: Get bookings by checkin date', () => {
        createAndVerifyBooking(getBookingByCheckin, (bookingData) => bookingData.bookingdates.checkin);
    });

    it('Positive: Get bookings by checkout date', () => {
        createAndVerifyBooking(getBookingByCheckout, (bookingData) => bookingData.bookingdates.checkout);
    });
});
