const request = require("supertest");
const app = require("../app");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjU3MTkyODkyfQ.hQdZsZrNqi2RJFv04knOoFfqNpk4xwsnQtogu0ne3Y8";

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
  });
  it("should create a new room", async () => {
    const res = await request(app)
      .post("/rooms")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
  it("should get one room", async () => {
    const res = await request(app)
      .get("/rooms/1930977f-abf3")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
  it("should delete a room", async () => {
    const res = await request(app)
      .delete("/rooms/1930977f-abf3")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
  it("should update a booking", async () => {
    const res = await request(app)
      .patch("/rooms/1930977f-abf3")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  });
  it("should get room not found", async () => {
    const res = await request(app)
      .get("/rooms/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(404);
  });
});
