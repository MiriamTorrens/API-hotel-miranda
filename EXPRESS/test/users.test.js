const request = require("supertest");
const app = require("../app");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjU3MTkyODkyfQ.hQdZsZrNqi2RJFv04knOoFfqNpk4xwsnQtogu0ne3Y8";

describe("Users route", () => {
  it("should not access users without authorization", async () => {
    const res = await request(app).get("/contact");
    expect(res.statusCode).toEqual(401);
  });
  it("should get users list", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
  it("should create a new user", async () => {
    const res = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
  it("should get one user", async () => {
    const res = await request(app)
      .get("/users/f4fd0bf0-54db")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
  it("should delete a contact", async () => {
    const res = await request(app)
      .delete("/users/f4fd0bf0-54db")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
  it("should update a user", async () => {
    const res = await request(app)
      .patch("/users/f4fd0bf0-54db")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  });
  it("should get user not found", async () => {
    const res = await request(app)
      .get("/users/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(404);
  });
});
