const FILE_TYPES = ['gif', 'jpeg', 'jpg', 'png'];

const imgUpload = document.querySelector('.img-upload__input');
const imgUploadPreview = document.querySelector('#imgUploadPreview');

function onImgUpload () {
  const file = imgUpload.files[0];
  const matches = FILE_TYPES.some((it) => file.name.endsWith(it));
  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
  }
}

export {onImgUpload};
