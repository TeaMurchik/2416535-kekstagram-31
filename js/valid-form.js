
const imgUpload = document.querySelector('.img-upload__input');
const uploadForm = document.querySelector('.img-upload__form');
const textHashTags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const imgUploadPreview = document.querySelector('#imgUploadPreview');
const btnUpload = document.querySelector('.img-upload__submit');

const puth = 'photos/';

imgUpload.addEventListener('click', () => {
  document.addEventListener('keydown', closeFormByKey);
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
});

function closeFormByKey(evt) {
  if (evt.key === 'Escape') {
    if (textHashTags === document.activeElement || textDescription === document.activeElement) {
      return;
    }
    document.body.classList.remove('modal-open');
    imgUploadPreview.src = '';
    textHashTags.value = '';
    textDescription.value = '';
    document.querySelector('.img-upload__overlay').classList.add('hidden');
  }
}

function closeFormLoadByClick() {
  document.body.classList.remove('modal-open');
  imgUploadPreview.src = '';
  textHashTags.value = '';
  textDescription.value = '';
  document.querySelector('.img-upload__overlay').classList.add('hidden');
}

function closeErrorByKey(evt) {
  if (evt.key === 'Escape') {
    document.body.removeChild(document.querySelector('.error'));
  }
}
function closeError() {
  document.body.removeChild(document.querySelector('.error'));
}
//код для валидации формы
let hashTags = [];
const hashTag = /^#[a-zа-яё0-9]{1,19}$/i;

//первый объект валидации
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

function checkHashTag(value) {
  hashTags = value.split(' ');
  if (value === '') {
    return true;
  }
  for (let i = 0; i < hashTags.length; i++) {
    if (!(hashTag.test(hashTags[i])) || hashTags.length > 5) {
      return false;
    }
    for (let j = 0; j < i; j++) {
      if (hashTags[j] === hashTags[i]) {
        return false;
      }
    }
  }
  return true;
}

pristine.addValidator(textHashTags, checkHashTag, 'хэш-тэги введены некорректно');

function checkDesctiption(value) {
  return value.length <= 140;
}

pristine.addValidator(textDescription, checkDesctiption, 'описание превышает максимально допустимую длину');

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  btnUpload.disabled = true;
  if (pristine.validate()) {
    fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
      method: 'POST',
      head: {
        'Content-Type': 'multipart/form-data'
      },
      body: new FormData(uploadForm)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((data) => {
        imgUploadPreview.src = puth + data.filename.filename;
        closeFormLoadByClick();
        btnUpload.disabled = false;
      })
      .catch(() => {
        const errorTemplate = document.querySelector('#error').content.querySelector('.error');
        const errorElement = errorTemplate.cloneNode(true);
        document.body.appendChild(errorElement);
        document.addEventListener('keydown', closeErrorByKey);
        document.querySelector('.error__button').addEventListener('click', closeError);
      });
  }
});

export { closeFormLoadByClick, pristine, uploadForm };
