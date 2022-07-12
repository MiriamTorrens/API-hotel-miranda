const request = require("supertest");
const app = require("../app");
const contact = require("../data/contact.json");
const jwt = require("jsonwebtoken");
const { passportKey } = require("../env");
const { timeToRefreshToken } = require("../constants");

const token = jwt.sign({ user: {} }, passportKey, {
  expiresIn: timeToRefreshToken,
});

const contactMessage = {
  id: "8e8e7c2f-7506",
  date: "2022-5-06",
  customer: {
    fullName: "Brandi Cremin",
    email: "Charley.Pouros2@hotmail.com",
    phoneNumber: "014-993-0360",
  },
  subject: "do laborum ut",
  comment:
    "culpa enim qui voluptate id ex aliqua veniam irure aute eu ad aliqua irure exercitation sint dolor et do nostrud eu dolore laboris ex tempor minim voluptate consectetur qui id ea laboris ut quis adipisicing officia sint consectetur labore qui tempor ipsum duis fugiat ad sunt et aliquip nisi commodo sit veniam magna aliqua culpa incididunt voluptate exercitation magna magna exercitation dolor occaecat sint do sint voluptate tempor commodo amet mollit fugiat magna tempor exercitation quis velit aliqua deserunt est consectetur elit",
  viewed: false,
  archived: false,
};

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
    expect(res.body).toMatchObject(contact);
  });
  it("should create a new contact", async () => {
    const res = await request(app)
      .post("/contact")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "Contact successfully added",
    });
  });
  it("should get one contact", async () => {
    const res = await request(app)
      .get("/contact/8e8e7c2f-7506")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject(contactMessage);
  });
  it("should delete a contact", async () => {
    const res = await request(app)
      .delete("/contact/8e8e7c2f-7506")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      sucess: true,
      message: "Contact successfully deleted",
    });
  });
  it("should update a contact", async () => {
    const res = await request(app)
      .patch("/contact/8e8e7c2f-7506")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "Contact successfully updated",
    });
  });
  it("should contact not found", async () => {
    const res = await request(app)
      .get("/contact/:id")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toMatchObject({
      success: false,
      message: "Contact not found",
    });
  });
});
