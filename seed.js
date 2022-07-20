require("./db");
const User = require("./models/User");
const Booking = require("./models/Booking");
const Contact = require("./models/Contact");
const Room = require("./models/Room");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

// //Crear collection users
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

// //Crear collection contacts
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

//Crear collection rooms
const rooms = [];
for (let i = 0; i < 10; i++) {
  let newRoom = new Room({
    room_number: i,
    bed_type: faker.helpers.arrayElement([
      "single_bed",
      "double_bed",
      "double_superior",
      "suite",
    ]),
    description: faker.lorem.sentence(10),
    offer: faker.helpers.arrayElement([0, 1]),
    price: faker.finance.amount(50, 100, 0),
    discount: faker.finance.amount(0, 15, 0),
    cancellation: faker.lorem.sentence(10),
    amenities: ["TV", "WIFI", "BATHROOM-KIT"]
      .concat(
        faker.helpers.arrayElements(["JACUZZI", "HAIR-DRYER", "MINIBAR"], 2)
      )
      .join(" "),
    images: [
      faker.image.imageUrl("", "", "", true),
      faker.image.imageUrl("", "", "", true),
      faker.image.imageUrl("", "", "", true),
      faker.image.imageUrl("", "", "", true),
      faker.image.imageUrl("", "", "", true),
    ],
  });

  newRoom.save((err, document) => {
    if (err) console.log(err);
    console.log(document);
  });
  rooms.push(newRoom);
}

//Crear collection bookings
for (let i = 0; i < 10; i++) {
  let index = Math.floor(Math.random() * 9);
  let newBooking = new Booking({
    guest_name: faker.name.firstName() + " " + faker.name.lastName(),
    order_date: faker.date.past(),
    checkin: faker.date.future(),
    checkout: faker.date.future(),
    special_request: faker.hacker.phrase(),
    room_id: rooms[index]._id,
    status: faker.helpers.arrayElement(["checkin", "checkout", "in_progress"]),
  });

  newBooking.save((err, document) => {
    if (err) console.log(err);
    console.log(document);
  });
}
