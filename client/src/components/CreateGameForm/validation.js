const validation = (formData) => {
  const errors = {};
  if (!formData.name) {
    errors.name = 'Name is required';
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
  }
  if (!formData.genres || formData.genres.length === 0) {
    errors.genres = 'At least one genre is required';
  }

  // Retornar un objeto vacío si no hay errores
  return errors;
};

export default validation;
