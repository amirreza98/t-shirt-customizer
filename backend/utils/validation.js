// Validation utilities for input sanitization and validation

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // Minimum 8 characters, at least one letter and one number
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters long" };
  }

  if (!/[a-zA-Z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one letter" };
  }

  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must contain at least one number" };
  }

  return { valid: true };
};

export const validateName = (name) => {
  if (!name || name.trim().length < 2) {
    return { valid: false, message: "Name must be at least 2 characters long" };
  }

  if (name.length > 100) {
    return { valid: false, message: "Name must be less than 100 characters" };
  }

  return { valid: true };
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim();
};
