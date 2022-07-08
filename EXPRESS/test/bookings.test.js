const request = require("supertest");
const app = require("../app");
const bookings = require("../data/bookings.json");

const booking = {
  fullName: "Natalie Fadel",
  id: "00703b45-c245",
  date: "2022-2-18",
  checkin: "2021-6-17",
  checkout: "2022-1-20",
  roomInfo: 18,
  price: 78,
  specialRequest:
    "aliquip in qui tempor nulla laboris consequat pariatur veniam id cupidatat tempor dolore mollit velit esse mollit duis et est deserunt ad fugiat cillum minim velit minim labore dolor pariatur enim sunt nostrud officia eiusmod ipsum commodo sit irure sunt nisi dolor nisi deserunt excepteur nulla non et minim velit elit occaecat sit ad minim aliquip pariatur sunt in commodo non eu velit qui ex anim dolor adipisicing commodo id",
  amenities: {},
  images: [],
  roomType: {
    type: "BACAADAD",
    roomNumber: 18,
  },
  roomDescription:
    "nostrud pariatur cillum cillum velit cupidatat aute qui elit occaecat occaecat aliquip excepteur cupidatat excepteur cupidatat in duis id incididunt tempor enim Lorem incididunt exercitation dolor commodo dolore enim ipsum sit est velit in pariatur cupidatat non ipsum voluptate ullamco veniam culpa tempor nostrud incididunt reprehenderit cillum culpa sunt voluptate amet quis Lorem culpa pariatur cupidatat proident mollit sint mollit reprehenderit amet in pariatur veniam ipsum aliquip aliquip elit excepteur eu consectetur cillum minim velit",
  status: "Check In",
};

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjU3MTkyODkyfQ.hQdZsZrNqi2RJFv04knOoFfqNpk4xwsnQtogu0ne3Y8";

describe("Bookings route", () => {
  it("should not access bookings without authorization", async () => {
    const res = await request(app).get("/bookings");
    expect(res.statusCode).toEqual(401);
  });
  it("should get bookings list", async () => {
    const res = await request(app)
      .get("/bookings")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject(bookings);
  });
  it("should create a new booking", async () => {
    const res = await request(app)
      .post("/bookings")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "Booking successfully added",
    });
  });
  it("should get one booking", async () => {
    const res = await request(app)
      .get("/bookings/00703b45-c245")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject(booking);
  });
  it("should delete a booking", async () => {
    const res = await request(app)
      .delete("/bookings/00703b45-c245")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "Booking successfully deleted",
    });
  });
  it("should update a booking", async () => {
    const res = await request(app)
      .patch("/bookings/00703b45-c245")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "Booking successfully updated",
    });
  });
  it("should get booking not found", async () => {
    const res = await request(app)
      .get("/bookings/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toMatchObject({
      success: false,
      message: "Booking not found",
    });
  });
});
