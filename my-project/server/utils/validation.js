// utils/validation.js
import Joi from 'joi';


export function validateRegisterInput(data) {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('student', 'teacher').required(),
  });
  return schema.validate(data);
}

export function validateSendNotificationInput(data) {
  const schema = Joi.object().keys({
    userId: Joi.string().required(),
    message: Joi.string().required(),
  });
  return schema.validate(data);
}
