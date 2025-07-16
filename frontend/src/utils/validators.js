export function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export function validatePassword(password) {
  // At least 6 characters
  return typeof password === 'string' && password.length >= 6;
}

export function validateProfileForm({ firstName, lastName }) {
  const errors = {};
  if (!firstName || firstName.trim() === '') errors.firstName = 'First name is required';
  if (!lastName || lastName.trim() === '') errors.lastName = 'Last name is required';
  return errors;
} 