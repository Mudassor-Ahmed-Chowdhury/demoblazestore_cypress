import { createBooking, deleteBooking } from "../../service/bookingService";
import { getBookingData } from "../../helper/dataGenerator";
import { faker } from '@faker-js/faker';

describe('Tests for DELETE Booking endpoint', () => {
    const performDeleteBooking = (bookingDataId, expectedStatus, message) => {
        deleteBooking(bookingDataId).then(response => {
            expect(response.status).to.eq(expectedStatus, message);
        });
    };

    let bookingData = getBookingData();

    it('Positive: Delete booking', () => {
        createBooking(bookingData).then(() => {
            const bookingDataId = Cypress.env('responses')[0].bookingid;
            performDeleteBooking(bookingDataId, 201, 'OK'); // Expecting 201 instead of 204 based on your comments
        });
    });

    it('Positive: Delete the same booking entity twice', () => {
        createBooking(bookingData).then(() => {
            const bookingDataId = Cypress.env('responses')[0].bookingid;
            performDeleteBooking(bookingDataId, 201, 'OK'); // First deletion
            performDeleteBooking(bookingDataId, 405, 'Method Not Allowed'); // Second deletion (should return 405)
        });
    });

    it('Negative: Delete nonexistent booking entity', () => {
        const nonexistentBookingId = "1123";
        performDeleteBooking(nonexistentBookingId, 405, 'Method Not Allowed');
    });

    it('Negative: Delete booking with invalid id - string instead of number', () => {
        const invalidBookingId = faker.commerce.product();
        performDeleteBooking(invalidBookingId, 405, 'Method Not Allowed');
    });

    it('Negative: Delete booking without id', () => {
        performDeleteBooking("", 404, 'Not Found');
    });
});
