import Joi from 'joi';

export const schema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/).required(),
    age: Joi.number().min(4).max(130).required()
});