'use strict';
(function () {
  var PINS_COUNT = 5;
  var mapPins = window.map.element.querySelector('.map__pins');
  var mapFilters = window.map.element.querySelector('.map__filters-container');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var pinRender = function (ad, i) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinElementWidth = window.map.pin.offsetWidth;
    var pinElementHeight = window.map.pin.offsetHeight;
    var pinImage = pinElement.querySelector('img');
    pinElement.style = 'left:' + (ad.location.x - pinElementWidth / 2) + 'px; top: ' + (ad.location.y - pinElementHeight) + 'px';
    pinImage.src = ad.author.avatar;
    pinImage.alt = ad.offer.title;
    pinElement.setAttribute('data-index', i);

    pinElement.addEventListener('click', function (evt) {
      var allPins = window.map.element.querySelectorAll('.map__pin');
      allPins.forEach(function (current) {
        current.classList.remove('map__pin--active');
      });
      var currentElement = evt.currentTarget;
      currentElement.classList.add('map__pin--active');
      var elementIndex = currentElement.dataset.index;
      window.map.element.insertBefore(window.card.render(window.dataArrayCopy[elementIndex]), mapFilters);
    });

    return pinElement;
  };

  var fragment = document.createDocumentFragment();
  var showPins = function () {
    var allPins = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
    allPins.forEach(function (item) {
      item.remove();
    });
    for (var i = 0; i < PINS_COUNT; i++) {
      if (window.dataArrayCopy[i]) {
        fragment.appendChild(pinRender(window.dataArrayCopy[i], i));
      }
    }
    mapPins.appendChild(fragment);
  };
  window.showPins = showPins;
})();
