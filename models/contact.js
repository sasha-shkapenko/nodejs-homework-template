const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require('../helpers')
const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String,
        match: /^\d{3}-\d{3}-\d{2}-\d{2}$/
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
}, { versionKey: false, timestamps: true })
contactSchema.post('save', handleSaveErrors);

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
});

const updateFavFieldSchema = Joi.object({
    favorite: Joi.boolean().required(),
})
const schemas = {
    addSchema,
    updateFavFieldSchema,
}

const Contact = model('contact', contactSchema);

module.exports = { Contact, schemas };