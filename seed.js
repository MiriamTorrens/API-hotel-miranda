const { faker } = require("@faker-js/faker");
const { connection } = require("./db");
const bcrypt = require("bcrypt");

// Rellenar tabla users
const sqlUsers =
  "INSERT INTO users (user_name, user_email, user_phone, start_date, occupation, status, photo, password) VALUES (?)";
for (let i = 0; i < 10; i++) {
  let values = [
    faker.name.firstName() + " " + faker.name.lastName(),
    faker.internet.email(),
    faker.phone.number("###-###-###"),
    faker.date.past(),
    faker.helpers.arrayElement(["manager", "reception", "room_service"]),
    faker.helpers.arrayElement([0, 1]),
    faker.image.avatar(),
    bcrypt.hashSync(faker.internet.password(), 5),
  ];
  connection.query(sqlUsers, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
}

// Rellenar tabla contact
const sqlContact =
  "INSERT INTO contact (contact_name, contact_email, contact_phone, contact_date, subject, comment, viewed, archived) VALUES (?)";
for (let i = 0; i < 10; i++) {
  let values = [
    faker.name.firstName() + " " + faker.name.lastName(),
    faker.internet.email(),
    faker.phone.number("###-###-###"),
    faker.date.past(),
    faker.hacker.phrase(),
    faker.lorem.sentence(),
    faker.helpers.arrayElement([0, 1]),
    faker.helpers.arrayElement([0, 1]),
  ];
  connection.query(sqlContact, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
}

//Rellenar tabla rooms
const sqlRooms =
  "INSERT INTO rooms (room_number, bed_type, description, offer, price, discount, cancellation, amenities) VALUES (?)";
for (let i = 1; i <= 10; i++) {
  let values = [
    i,
    faker.helpers.arrayElement([
      "single_bed",
      "double_bed",
      "double_superior",
      "suite",
    ]),
    faker.lorem.sentence(10),
    faker.helpers.arrayElement([0, 1]),
    faker.finance.amount(50, 100, 0),
    faker.finance.amount(0, 15, 0),
    faker.lorem.sentence(10),
    ["TV", "WIFI", "BATHROOM-KIT"]
      .concat(
        faker.helpers.arrayElements(["JACUZZI", "HAIR-DRYER", "MINIBAR"], 2)
      )
      .join(" "),
  ];

  connection.query(sqlRooms, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });

  //   Rellenar tabla rooms_images
  for (let j = 1; j <= 5; j++) {
    const sqlImages =
      "INSERT INTO rooms_images (room_id, url_image) VALUES (?)";
    let values = [i, faker.image.imageUrl("", "", "", true)];
    connection.query(sqlImages, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  }
}

//Rellenar tabla bookings
const sqlBookings =
  "INSERT INTO bookings (guest_name, order_date, checkin, checkout, special_request, room_id, status) VALUES (?)";
for (let i = 0; i < 10; i++) {
  let values = [
    faker.name.firstName() + " " + faker.name.lastName(),
    faker.date.past(),
    faker.date.future(),
    faker.date.future(),
    faker.hacker.phrase(),
    Math.floor(Math.random() * (10 - 1) + 1),
    faker.helpers.arrayElement(["checkin", "checkout", "in_progress"]),
  ];
  connection.query(sqlBookings, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
}
