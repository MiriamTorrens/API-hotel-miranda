const request = require("supertest");
const app = require("../app");

describe("Login route", () => {
  it("should login - correct username and password", async () => {
    const res = await request(app).post("/login").send({
      username: "m.torrens@miranda.com",
      password: "1234",
    });
    expect(res.statusCode).toEqual(200);
  });
  it("should not login - incorrect username and password", async () => {
    const res = await request(app).post("/login").send({
      username: "m.torrens@miranda.com",
      password: "1235",
    });
    expect(res.statusCode).toEqual(500);
  });
});
