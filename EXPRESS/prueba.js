const Joi = require("joi");

const userSchema = Joi.object({
  user_name: Joi.string().required(),
  user_email: Joi.string().email().required(),
  user_phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  start_date: Joi.date().required(),
  occupation: Joi.string().valid("manager", "reception", "room_service"),
  status: Joi.boolean(),
  photo: Joi.string(),
  password: Joi.string(),
});

const newUser = {
  user_name: "Miriam Torrens",
  user_email: "m.torrens14@gmail.com",
  user_phone: "6667562037",
  start_date: "07/14/2022",
  occupation: "bailarina",
  status: true,
  photo: "urldeunafoto",
  password: "1234",
};
const { error } = userSchema.validate(newUser);
if (error) {
  console.log(error.details[0].message);
} else {
  console.log(user);
}
