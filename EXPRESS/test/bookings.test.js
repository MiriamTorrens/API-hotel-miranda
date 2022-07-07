const request = require("supertest");
const app = require("../app");
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
  });
  it("should create a new booking", async () => {
    const res = await request(app)
      .post("/bookings")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
  it("should get one booking", async () => {
    const res = await request(app)
      .get("/bookings/00703b45-c245")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
  it("should delete a booking", async () => {
    const res = await request(app)
      .delete("/bookings/00703b45-c245")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
  it("should update a booking", async () => {
    const res = await request(app)
      .patch("/bookings/00703b45-c245")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  });
  it("should get booking not found", async () => {
    const res = await request(app)
      .get("/bookings/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(404);
  });
});
