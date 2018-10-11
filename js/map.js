'use strict';
(function () {
  var userDialog = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pin');
  var mapElement = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinWidth = mainPin.offsetWidth;
  var mainPinStartHeight = mainPin.offsetHeight;
  var adress = document.querySelector('#address');
  var formHeader = document.querySelector('.ad-form-header');
  var formFieldsets = document.querySelectorAll('.ad-form__element');
  var mapFieldsets = document.querySelectorAll('.map__filter');
  var formFeatures = document.querySelector('.map__features');
  var adForm = document.querySelector('.ad-form');
  var mapHeight = mapElement.offsetHeight;
  var mapWidth = mapElement.offsetWidth;
  var mapCenterY = mapHeight / 2 - mainPinStartHeight / 2;
  var mapCenterX = mapWidth / 2 - mainPinWidth / 2;
  var main = document.querySelector('main');
  var mapCard = mapElement.querySelector('.map__card');

  window.map = {
    userDialog: userDialog,
    pin: mapPin,
    element: mapElement,
    mainPinWidth: mainPinWidth,
    mainPinStartHeight: mainPinStartHeight,
    adress: adress,
    formHeader: formHeader,
    formFieldsets: formFieldsets,
    fieldsets: mapFieldsets,
    formFeatures: formFeatures,
    adForm: adForm,
    mainPin: mainPin,
    centerY: mapCenterY,
    centerX: mapCenterX,
    main: main,
    card: mapCard
  };

  var onPinChange = function () {
    userDialog.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.activateInputs(window.fieldsets);
    window.activateInputs(window.selects);
    window.load(window.showPins, onSubmitError);
  };

  var mainPinHeight = mainPinStartHeight + 22;

  var mapPinsLimits = {
    MIN_Y: 130 - mainPinHeight,
    MAX_Y: 630,
    MIN_X: 0 - mainPinWidth / 2,
    MAX_X: mapWidth - mainPinWidth / 2
  };

  var getValueInLimit = function (value, min, max) {
    if (value < min) {
      value = min;
    }

    if (value > max) {
      value = max;
    }

    return value;
  };

  var pinCoords = function (coords) {
    coords.x = getValueInLimit(coords.x, mapPinsLimits.MIN_X, mapPinsLimits.MAX_X);
    coords.y = getValueInLimit(coords.y, mapPinsLimits.MIN_Y, mapPinsLimits.MAX_Y);

    return coords;
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var resultCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinCoords(resultCoords);

      mainPin.style.top = resultCoords.y + 'px';
      mainPin.style.left = resultCoords.x + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      var mainPinY = Math.ceil(mainPin.offsetTop + mainPinHeight);
      var mainPinX = Math.ceil(mainPin.offsetLeft + mainPinWidth / 2);
      adress.setAttribute('value', mainPinX + ' , ' + mainPinY);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    mainPin.addEventListener('mouseup', onPinChange);
  });
  var onShowSuccess = function () {
    var success = document.querySelector('#success').content.querySelector('.success');
    var successElement = success.cloneNode(true);
    main.appendChild(successElement);
    successElement.addEventListener('mousedown', window.onCloseSuccess);
    document.addEventListener('keydown', window.onCloseSuccess);
  };

  var onCloseSuccess = function () {
    var successElement = document.querySelector('.success');
    main.removeChild(successElement);
    document.removeEventListener('keydown', onCloseSuccess);
  };
  var onSubmitError = function (errorMessage) {
    var error = document.querySelector('#error').content.querySelector('.error');
    var errorElement = error.cloneNode(true);
    var errorText = error.querySelector('.error__message');
    errorText.textContent = errorMessage;
    main.appendChild(errorElement);
    document.addEventListener('keydown', window.onCloseError);
    errorElement.addEventListener('click', window.onCloseError);
  };
  var onCloseError = function () {
    var errorElement = document.querySelector('.error');
    main.removeChild(errorElement);
    document.removeEventListener('keydown', window.onCloseError);
    errorElement.removeEventListener('click', window.onCloseError);
  };

  window.onSubmitError = onSubmitError;
  window.onShowSuccess = onShowSuccess;
  window.onCloseSuccess = onCloseSuccess;
  window.onCloseError = onCloseError;
})();


