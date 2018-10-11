'use strict';
(function () {
  var ESC = 27;
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var cardPhotos = {
    width: 45,
    height: 35,
    alt: 'Фотография жилья'
  };

  var getCardFeatures = function (features) {
    var featuresItemsArr = [];

    features.forEach(function (item) {
      var featuresItem = document.createElement('li');
      featuresItem.classList.add('popup__feature', 'popup__feature--' + item);
      featuresItemsArr.push(featuresItem);
    });

    return featuresItemsArr;
  };

  var getCardImages = function (images) {
    var cardImages = [];
    images.forEach(function (item) {
      var cardImage = document.createElement('img');
      cardImage.src = item;
      cardImage.width = cardPhotos.width;
      cardImage.height = cardPhotos.height;
      cardImage.alt = cardPhotos.alt;
      cardImage.classList.add('popup__photo');
      cardImages.push(cardImage);
    });

    return cardImages;
  };

  var renderElements = function (elements, parent) {
    parent.innerHTML = '';
    elements.forEach(function (el) {
      parent.appendChild(el);
    });
  };
  var removeElement = function (parent, element) {
    parent.removeChild(element);
  };
  var closeCard = function (button) {
    button.addEventListener('click', function (evt) {
      var target = evt.target;
      var targetBlock = target.parentNode;
      removeElement(window.map.element, targetBlock);
    });
  };
  var removeCard = function () {
    var currentCard = window.map.element.querySelector('.map__card');
    if (currentCard !== null) {
      currentCard.remove();
    }
  };
  var cardRender = function (ad) {
    removeCard();
    var cardElement = cardTemplate.cloneNode(true);
    var cardFeatures = cardElement.querySelector('.popup__features');
    var cardPhotosWrapper = cardElement.querySelector('.popup__photos');
    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = ad.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
    var cardCloseButton = cardElement.querySelector('.popup__close');

    renderElements(getCardFeatures(ad.offer.features), cardFeatures);
    renderElements(getCardImages(ad.offer.photos), cardPhotosWrapper);
    closeCard(cardCloseButton);
    return cardElement;
  };

  document.addEventListener('keydown', function (evt) {
    var currentCard = window.map.element.querySelector('.map__card');
    if (evt.keyCode === ESC) {
      if (currentCard !== null) {
        currentCard.remove();
      }
    }
  });

  window.card = {
    render: cardRender,
    remove: removeCard
  };
})();
