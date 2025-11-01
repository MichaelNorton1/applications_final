import app from "./app.js";
import {appEvents} from "./controllers/addToDB.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

appEvents.on('nfl:inserted', ({ id, date }) => {
  console.log(`📣 New NFL data inserted (ID: ${id}, Date: ${date})`);
});
