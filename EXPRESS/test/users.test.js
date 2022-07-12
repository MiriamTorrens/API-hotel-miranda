const request = require("supertest");
const app = require("../app");
const users = require("../data/users.json");
const jwt = require("jsonwebtoken");
const { passportKey } = require("../env");
const { timeToRefreshToken } = require("../constants");

const token = jwt.sign({ user: {} }, passportKey, {
  expiresIn: timeToRefreshToken,
});

const user = {
  fullName: "Antonio Emard",
  id: "f4fd0bf0-54db",
  email: "a.emard@miranda.com",
  startDate: "2022-04-02",
  occupation: "Manager",
  description:
    "cillum ea ea ullamco culpa veniam est aute Lorem exercitation irure veniam irure aliqua magna fugiat labore ex et",
  contact: "836-287-2369",
  status: "ACTIVE",
  photo: "https://xsgames.co/randomusers/assets/avatars/male/60.jpg",
  password: "HBUKGB4133K",
};

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
    expect(res.body).toMatchObject(users);
  });
  it("should create a new user", async () => {
    const res = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "User successfully added",
    });
  });
  it("should get one user", async () => {
    const res = await request(app)
      .get("/users/f4fd0bf0-54db")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject(user);
  });
  it("should delete a contact", async () => {
    const res = await request(app)
      .delete("/users/f4fd0bf0-54db")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "User successfully deleted",
    });
  });
  it("should update a user", async () => {
    const res = await request(app)
      .patch("/users/f4fd0bf0-54db")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "User successfully updated",
    });
  });
  it("should get user not found", async () => {
    const res = await request(app)
      .get("/users/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toMatchObject({
      success: false,
      message: "User not found",
    });
  });
});
