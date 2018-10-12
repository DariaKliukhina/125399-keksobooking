'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarInput = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoInput = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreviewBlock = document.querySelector('.ad-form__photo');
  var photosContainer = document.querySelector('.ad-form__photo-container');

  var loadPhoto = function (fileChooser, preview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var clearPhotos = function () {
    var photos = document.querySelectorAll('.ad-form__photo');
    photos.forEach(function (item) {
      item.remove();
    });
  };

  var addPhoto = function (file, preview, parentBlock) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', function () {
      var photoPreviewClone = preview.cloneNode(true);
      var newImage = photoPreviewClone.querySelector('img');
      newImage.src = reader.result;
      photoPreviewClone.appendChild(newImage);
      parentBlock.appendChild(photoPreviewClone);
    });
  };

  var loadSomePhotos = function (fileChooser, preview, parentBlock) {
    var filesArray = fileChooser.files;
    clearPhotos();
    for (var i = 0; i < filesArray.length; i++) {
      var file = filesArray.item(i);
      addPhoto(file, preview, parentBlock);
    }
  };

  var createImage = function () {
    var previewBlock = document.querySelector('.ad-form__photo');
    var newImage = document.createElement('img');
    previewBlock.appendChild(newImage);
    newImage.setAttribute('src', 'img/muffin-grey.svg');
    newImage.setAttribute('width', '70');
    newImage.setAttribute('height', '70');
  };
  createImage();

  var appendPhoto = function () {
    var newPhotoPreview = document.createElement('div');
    newPhotoPreview.classList.add('ad-form__photo');
    window.photos.container.appendChild(newPhotoPreview);
  };

  var onAvatarChange = function () {
    loadPhoto(avatarInput, avatarPreview);
  };

  var onPhotoUpload = function () {
    loadSomePhotos(photoInput, photoPreviewBlock, photosContainer);
  };

  avatarInput.addEventListener('change', onAvatarChange);
  photoInput.addEventListener('change', onPhotoUpload);

  window.photos = {
    clear: clearPhotos,
    avatar: avatarPreview,
    previewBlock: photoPreviewBlock,
    append: appendPhoto,
    createImg: createImage,
    container: photosContainer
  };
})();
