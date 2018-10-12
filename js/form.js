'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var adFormType = adForm.querySelector('#type');
  var adFormPrice = adForm.querySelector('#price');
  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');
  var fieldsets = document.querySelectorAll('fieldset');
  var selects = document.querySelectorAll('select');
  var resetButton = document.querySelector('.ad-form__reset');

  var OFFER_PRICE = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  window.map.formHeader.setAttribute('disabled', true);
  window.map.formFeatures.setAttribute('disabled', true);

  window.map.formFieldsets.forEach(function (el) {
    el.setAttribute('disabled', true);
  });
  window.map.fieldsets.forEach(function (el) {
    el.setAttribute('disabled', true);
  });

  var mainPinStartY = Math.ceil(window.map.mainPin.offsetTop + window.map.mainPinStartHeight / 2);
  var mainPinStartX = Math.ceil(window.map.mainPin.offsetLeft + window.map.mainPinWidth / 2);
  window.map.adress.setAttribute('value', mainPinStartX + ' , ' + mainPinStartY);
  var onTimeInChange = function () {
    adFormTimeOut.value = adFormTimeIn.value;
  };
  var onTimeOutChange = function () {
    adFormTimeIn.value = adFormTimeOut.value;
  };
  var onFormTypeChange = function () {
    var minValue = OFFER_PRICE[adFormType.value];
    adFormPrice.placeholder = minValue;
    adFormPrice.min = minValue;
  };
  var maxCapacity = {
    '1': 1,
    '2': 2,
    '3': 3,
    '100': 0
  };
  var checkCapacity = function () {
    var roomsNumber = adFormRoomNumber.value;
    var capacity = adFormCapacity.value;
    var possibleCapacity = maxCapacity[roomsNumber];
    if (capacity > possibleCapacity) {
      adFormCapacity.setAttribute('disable', true);
      adFormCapacity.setCustomValidity('Недопустимое количество мест для выбранного числа комнат');
    } else if (capacity === '0' && possibleCapacity > 0) {
      adFormCapacity.setAttribute('disable', true);
      adFormCapacity.setCustomValidity('Недопустимое количество мест для выбранного числа комнат');
    } else {
      adFormCapacity.setAttribute('disable', false);
      adFormCapacity.setCustomValidity('');
    }
  };
  checkCapacity();
  var onFormCapacityChange = function () {
    checkCapacity();
  };
  adFormTimeIn.addEventListener('change', onTimeInChange);
  adFormTimeOut.addEventListener('change', onTimeOutChange);
  adFormType.addEventListener('change', onFormTypeChange);
  adFormCapacity.addEventListener('change', onFormCapacityChange);
  adFormRoomNumber.addEventListener('change', onFormCapacityChange);

  var disableInputs = function (inputsList) {
    for (var i = 0; i < inputsList.length; i++) {
      inputsList[i].disabled = true;
    }
  };

  var activateInputs = function (inputsList) {
    for (var i = 0; i < inputsList.length; i++) {
      inputsList[i].disabled = false;
    }
  };

  var formReset = function () {
    window.photos.avatar.setAttribute('src', 'img/muffin-grey.svg');
    window.photos.clear();
    adForm.reset();
    window.map.mainPin.style = 'left:' + window.map.centerX + 'px; top:' + window.map.centerY + 'px;';
    window.map.element.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.card.remove();
    var mapPins = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
    var pinsContainer = document.querySelector('.map__pins');
    for (var t = 0; t < mapPins.length; t++) {
      pinsContainer.removeChild(mapPins[t]);
    }
    disableInputs(fieldsets);
    disableInputs(selects);
    window.photos.append();
    window.photos.createImg();
  };

  var onReset = function () {
    formReset();

  };

  var onSubmit = function () {
    formReset();
    window.onShowSuccess();
  };

  resetButton.addEventListener('click', onReset);
  adForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(adForm), onSubmit, window.onSubmitError);
    evt.preventDefault();
  });
  window.activateInputs = activateInputs;
  window.selects = selects;
  window.fieldsets = fieldsets;
})();
