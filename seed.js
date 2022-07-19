require("./db");
const User = require("./models/User");
// const Booking = require("./models/Booking");
// const Contact = require("./models/Contact");
// const Room = require("./models/Room");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

for (let i = 0; i < 10; i++) {
  let newUser = new User({
    user_name: faker.name.firstName() + " " + faker.name.lastName(),
    user_email: faker.internet.email(),
    user_phone: faker.phone.number("###-###-###"),
    start_date: faker.date.past(),
    occupation: faker.helpers.arrayElement([
      "manager",
      "reception",
      "room_service",
    ]),
    status: faker.helpers.arrayElement([0, 1]),
    user_image: faker.image.avatar(),
    password: bcrypt.hashSync(faker.internet.password(), 5),
  });

  newUser.save((err, document) => {
    if (err) console.log(err);
    console.log(document);
  });
}
