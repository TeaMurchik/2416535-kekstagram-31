import { fetchRequest } from './server-control.js';

const fragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const pictures = document.querySelector('.pictures');

fetchRequest
  .then((photos) => {
    // photos.sort((a, b) => a.comments.length - b.comments.length);

    photos.forEach((photo) => {
      const pictureElement = pictureTemplate.cloneNode(true);
      pictureElement.querySelector('.picture__img').src = photo.url;
      pictureElement.querySelector('.picture__img').alt = photo.description;
      pictureElement.querySelector('.picture__likes').textContent = photo.likes;
      pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
      fragment.appendChild(pictureElement);
    });
    return fragment;
  })
  .then((fragmentTemplate) => {
    pictures.appendChild(fragmentTemplate);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  })
  .catch(() => {
    const dataError = errorTemplate.cloneNode(true);
    fragment.appendChild(dataError);
    pictures.appendChild(fragment);
    setTimeout(() => {
      pictures.removeChild(document.querySelector('.data-error'));
    }, 5000);
  });
export { fragment };
