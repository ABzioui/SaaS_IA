const validator = require('validator');
const Joi = require('joi');

exports.validateRegisterInput = (data) => {
  const errors = {};

  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = 'Valid email is required';
  }

  if (!data.password || data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!data.firstName || data.firstName.trim() === '') {
    errors.firstName = 'First name is required';
  }

  if (!data.lastName || data.lastName.trim() === '') {
    errors.lastName = 'Last name is required';
  }

  if (!data.role || !['proprietaire', 'locataire'].includes(data.role)) {
    errors.role = 'Valid role is required (proprietaire or locataire)';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

exports.validateLoginInput = (data) => {
  const errors = {};

  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = 'Valid email is required';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

// Property validation schema
const propertySchema = Joi.object({
  address: Joi.string().required().trim(),
  city: Joi.string().required().trim(),
  postalCode: Joi.string().required().pattern(/^\d{5}$/),
  neighborhood: Joi.string().allow('', null),
  coordinates: Joi.object({
    lat: Joi.number(),
    lng: Joi.number()
  }),
  propertyType: Joi.string().required().valid(
    'appartement',
    'maison',
    'studio',
    'duplex',
    'loft',
    'villa',
    'commerce',
    'bureau'
  ),
  surface: Joi.number().required().min(0),
  rooms: Joi.number().required().min(0),
  rent: Joi.number().required().min(0),
  charges: Joi.number().min(0).default(0),
  deposit: Joi.number().min(0),
  description: Joi.string().allow('', null),
  furnished: Joi.boolean().default(false),
  status: Joi.string().valid('libre', 'occupé', 'maintenance').default('libre'),
  availability: Joi.string().required().valid('immediate', 'date', 'occupied'),
  availabilityDate: Joi.when('availability', {
    is: 'date',
    then: Joi.date().required(),
    otherwise: Joi.date().allow(null)
  }),
  tenant: Joi.string().allow(null),
  lease: Joi.object({
    startDate: Joi.date(),
    endDate: Joi.date(),
    deposit: Joi.number().min(0),
    status: Joi.string().valid('actif', 'terminé', 'résilié')
  }).allow(null)
});

exports.validateProperty = (data) => {
  return propertySchema.validate(data, { abortEarly: false });
};