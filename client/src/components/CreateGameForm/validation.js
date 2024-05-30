const validation = (formData) => {
  const errors = {};
  if (!formData.name) {
    errors.name = 'Name is required';
  } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.name)) {
    errors.name = 'The name cannot contain symbols or special characters';
  }

  if (!formData.description) {
    errors.description = 'Description is required';
  }
  if (!formData.platforms || formData.platforms.length === 0) {
    errors.platforms = 'At least one platform is required';
  }

  if (!formData.released) {
    errors.released = 'Released date is required';
  }
  if (!formData.rating) {
    errors.rating = 'Rating is required';
  } else if (!/^[1-5]$/.test(formData.rating)) {
    errors.rating = 'The rating must be a number between 1 and 5';
  }
  if (!formData.genres || formData.genres.length === 0) {
    errors.genres = 'At least one genre is required';
  }

  // Retornar un objeto vacío si no hay errores
  return errors;
};

export default validation;
