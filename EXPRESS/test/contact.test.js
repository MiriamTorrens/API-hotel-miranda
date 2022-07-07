const request = require("supertest");
const app = require("../app");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjU3MTkyODkyfQ.hQdZsZrNqi2RJFv04knOoFfqNpk4xwsnQtogu0ne3Y8";

describe("Contact route", () => {
  it("should not access contact without authorization", async () => {
    const res = await request(app).get("/contact");
    expect(res.statusCode).toEqual(401);
  });
  it("should get contact list", async () => {
    const res = await request(app)
      .get("/contact")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
  it("should create a new contact", async () => {
    const res = await request(app)
      .post("/contact")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
  it("should get one contact", async () => {
    const res = await request(app)
      .get("/contact/8e8e7c2f-7506")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
  it("should delete a contact", async () => {
    const res = await request(app)
      .delete("/contact/8e8e7c2f-7506")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
  it("should update a contact", async () => {
    const res = await request(app)
      .patch("/contact/8e8e7c2f-7506")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  });
  it("should contact not found", async () => {
    const res = await request(app)
      .get("/contact/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(404);
  });
});
