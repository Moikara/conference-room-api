const app = require("./app");

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Conference Room API running on port ${PORT}`);
});
