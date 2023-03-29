import * as yup from 'yup';

export async function validateEmail(email) {
  const schema = yup.string().email().required();
  try {
    await schema.validate(email);
    return true;
  } catch {
    return false;
  }
}

export async function validatePassword(password) {
  const schema = yup.string().required();
  try {
    await schema.validate(password);
    return true;
  } catch {
    return false;
  }
}

export async function validateName(name) {
  const schema = yup.string().min(2).max(30);
  try {
    await schema.validate(name);
    return true;
  } catch {
    return false;
  }
}
