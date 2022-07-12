const request = require("supertest");
const app = require("../app");
const rooms = require("../data/rooms.json");
const jwt = require("jsonwebtoken");
const { passportKey } = require("../env");
const { timeToRefreshToken } = require("../constants");

const token = jwt.sign({ user: {} }, passportKey, {
  expiresIn: timeToRefreshToken,
});

const room = {
  id: "a1ca1095-2cb8",
  images: [
    "https://d2wiks2irojx7z.cloudfront.net/cache/img/hotel-marais-bastille-chambre-30813-1600-900-auto.jpeg?q=1528112600",
    "https://d2wiks2irojx7z.cloudfront.net/cache/img/hotel-marais-bastille-chambre-30807-1600-900-auto.jpeg?q=1528112601",
    "https://d2wiks2irojx7z.cloudfront.net/cache/img/hotel-marais-bastille-chambre-30819-1600-900-auto.jpeg?q=1528112602",
    "https://d2wiks2irojx7z.cloudfront.net/cache/img/hotel-marais-bastille-chambre-30831-1600-900-auto.jpeg?q=1528112603",
  ],
  roomType: "Single Bed",
  roomNumber: 0,
  offer: false,
  price: 75.32,
  discount: 11,
  cancellation: "",
  amenities: [
    "AC",
    "Shower",
    "Single Bed",
    "Towel",
    "Bathup",
    "Coffe Set",
    "LED TV",
    "WiFi",
  ],
  status: "Available",
  roomName: "MMSPZAJ1",
};

describe("Rooms route", () => {
  it("should not access rooms without authorization", async () => {
    const res = await request(app).get("/rooms");
    expect(res.statusCode).toEqual(401);
  });
  it("should get rooms list", async () => {
    const res = await request(app)
      .get("/rooms")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject(rooms);
  });
  it("should create a new room", async () => {
    const res = await request(app)
      .post("/rooms")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "Room successfully added",
    });
  });
  it("should get one room", async () => {
    const res = await request(app)
      .get("/rooms/a1ca1095-2cb8")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject(room);
  });
  it("should delete a room", async () => {
    const res = await request(app)
      .delete("/rooms/a1ca1095-2cb8")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "Room successfully deleted",
    });
  });
  it("should update a booking", async () => {
    const res = await request(app)
      .patch("/rooms/a1ca1095-2cb8")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "Booking successfully updated",
    });
  });
  it("should get room not found", async () => {
    const res = await request(app)
      .get("/rooms/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toMatchObject({
      success: false,
      message: "Room not found",
    });
  });
});
