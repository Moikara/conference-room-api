function validateRoomIdParam(req) {
  const { roomId } = req.params;

  if (!roomId) return "roomId is required";
  if (typeof roomId !== "string") return "roomId must be a string";

  return null;
}

module.exports = {
  validateRoomIdParam
};
