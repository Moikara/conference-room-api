let rooms = [];
let bookings = [];

function initializeStore() {
  rooms = [
    { id: "room-1", name: "Conference Room A" },
    { id: "room-2", name: "Conference Room B" }
  ];
  bookings = [];
}

function getRooms() {
  return rooms;
}

function getBookings() {
  return bookings;
}

function addBooking(booking) {
  bookings.push(booking);
}

function removeBooking(bookingId) {
  bookings = bookings.filter(b => b.id !== bookingId);
}

module.exports = {
  initializeStore,
  getRooms,
  getBookings,
  addBooking,
  removeBooking
};
