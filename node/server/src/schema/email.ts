import Joi from 'joi';

export type Email = {
    from: string;
    to: string[];
    subject: string;
    text: string;
};

export const EmailSchema = Joi.object().keys({
    from: Joi.string().email().required(),
    to: Joi.array().min(1).items(
        Joi.string().email().required()
    ).required(),
    subject: Joi.string().required(),
    text: Joi.string().required()
});