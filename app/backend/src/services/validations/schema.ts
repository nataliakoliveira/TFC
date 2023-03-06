import * as joi from 'joi';

const loginSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

export default loginSchema;
