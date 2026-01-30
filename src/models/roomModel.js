export const rooms = new Map([
  ["room-1", { id: "room-1", name: "Conference Room A" }],
  ["room-2", { id: "room-2", name: "Conference Room B" }],
  ["room-3", { id: "room-3", name: "Room 101" }]
]);

function getRoomById(roomId) {
  return rooms.get(roomId);
}

export default getRoomById;