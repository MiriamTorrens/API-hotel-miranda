require("./db");
const User = require("./models/User");
// const Booking = require("./models/Booking");
const Contact = require("./models/Contact");
// const Room = require("./models/Room");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

//Crear collection users
// for (let i = 0; i < 10; i++) {
//   let newUser = new User({
//     user_name: faker.name.firstName() + " " + faker.name.lastName(),
//     user_email: faker.internet.email(),
//     user_phone: faker.phone.number("###-###-###"),
//     start_date: faker.date.past(),
//     occupation: faker.helpers.arrayElement([
//       "manager",
//       "reception",
//       "room_service",
//     ]),
//     status: faker.helpers.arrayElement([0, 1]),
//     user_image: faker.image.avatar(),
//     password: bcrypt.hashSync(faker.internet.password(), 5),
//   });

//   newUser.save((err, document) => {
//     if (err) console.log(err);
//     console.log(document);
//   });
// }

//Crear collection contact

for (let i = 0; i < 10; i++) {
  let newContact = new Contact({
    contact_name: faker.name.firstName() + " " + faker.name.lastName(),
    contact_email: faker.internet.email(),
    contact_phone: faker.phone.number("###-###-###"),
    contact_date: faker.date.past(),
    subject: faker.hacker.phrase(),
    comment: faker.lorem.sentence(),
    viewed: faker.helpers.arrayElement([0, 1]),
    archived: faker.helpers.arrayElement([0, 1]),
  });

  newContact.save((err, document) => {
    if (err) console.log(err);
    console.log(document);
  });
}
