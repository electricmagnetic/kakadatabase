import placeholderThumbnail from '../../../../assets/img/placeholderThumbnail.png';
import placeholderLarge from '../../../../assets/img/placeholderLarge.png';

/**
  Provides appropriate image link for a bird profile or a placeholder.
  Protects against invalid size types.
  */
const getPicture = (bird, size = 'thumbnail') => {
  const placeholders = {
    thumbnail: placeholderThumbnail,
    large: placeholderLarge,
    default: placeholderThumbnail,
  };
  const profile = (bird && bird.profile) || null; // Allows for no bird being provided (i.e. shows placeholder)

  if (profile && profile.picture)
    return profile.picture[size] || placeholders[size] || placeholders['default'];
  else return placeholders[size] || placeholders['default'];
};

export default getPicture;
