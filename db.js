const mongoose = require("mongoose");
const { uri } = require("./env");
const db = mongoose.connection;

const mongoConnection = async () => {
  try {
    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log(error);
  }
};
mongoConnection();

db.once("open", (_) => {
  console.log("Database is connected to", uri);
});
