/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var I18N = {
    'en': __webpack_require__(1),
    'zh-tw': __webpack_require__(2)
};

var lazyImages = void 0;
var offset = 0;
var row = document.querySelector('.row');
var title = document.getElementById('title');
var LANG = 'zh-tw';
console.log('123');
initLazyImages = function initLazyImages() {
    var temp = [];
    lazyImages = document.querySelectorAll('img[data-src]');
    for (var i = 0; i < lazyImages.length; i++) {
        temp.push(lazyImages[i]);
    }
    lazyImages = temp;
}, loadImage = function loadImage(img) {
    var imgObj = new Image(),
        src = img.getAttribute('data-src');
    imgObj.onload = function () {
        if (src) {
            img.src = src;
        };
        img.removeAttribute('data-src');
    };
    imgObj.src = src;
}, canLoadImage = function canLoadImage(elem) {
    var pos = elem.getBoundingClientRect();
    return pos.top >= 0 && pos.left >= 0 && pos.top <= (window.innerHeight || document.documentElement.clientHeight);
}, handleLazyImages = function handleLazyImages() {
    for (var i = 0; i < lazyImages.length; i++) {
        var image = lazyImages[i];
        // if (canLoadImage(image)) {
        //     loadImage(lazyImages.splice(i, 1)[0]);
        //     i--;
        // }
        loadImage(lazyImages.splice(i, 1)[0]);
        i--;
    }
}, getData = function getData() {
    var clientId = 's44s145uexjgeu9mqqa1s93oc1bnli';
    var limit = 21;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&limit=' + limit + '&offset=' + offset + '&language=' + LANG, false);
    xhr.setRequestHeader('client-ID', clientId);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            getDataCallbakFunc(null, response);
        }
    };
    xhr.send();
    // $.ajax({
    //     url: 'https://api.twitch.tv/kraken/streams/?client_id=' + clientId + '&game=League%20of%20Legends&limit=' + limit + '&offset=' + offset,
    //     success: (response) => {
    //         console.log(response);
    //         getDataCallbakFunc(null, response);
    //     },
    //     error: (err) => {
    //         getDataCallbakFunc(err)
    //     }
    // })
}, getDataCallbakFunc = function getDataCallbakFunc(err, data) {
    if (err) {
        console.log(err);
    } else {
        var streams = data.streams;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = streams[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var stream = _step.value;

                var div = document.createElement('div');
                div.className = 'col';
                div.innerHTML = getColumn(stream);
                row.append(div);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        initLazyImages();
        handleLazyImages();
    }
}, getColumn = function getColumn(data) {
    return '\n          <div class="preview">\n            <img src="./assets/image/preview.jpg" data-src="' + data.preview.medium + '"/>\n          </div>\n          <div class="bottom">\n            <div class="intro">\n              <div class="logo">\n                <img src="./assets/image/preview.jpg" data-src="' + data.channel.logo + '"/>\n              </div>\n              <div class="desc">\n                <div class="title">\n                  ' + data.channel.status + '\n                </div>\n                <div class="name">\n                  ' + data.channel.display_name + '\n                </div>\n              </div>\n            </div>\n          </div>';
}, getScrollXY = function getScrollXY() {
    var scrOfX = 0,
        scrOfY = 0;

    if (typeof window.pageYOffset == 'number') {
        //Netscape compliant
        scrOfY = window.pageYOffset;
        scrOfX = window.pageXOffset;
    } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
        //DOM compliant
        scrOfY = document.body.scrollTop;
        scrOfX = document.body.scrollLeft;
    } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
        //IE6 standards compliant mode
        scrOfY = document.documentElement.scrollTop;
        scrOfX = document.documentElement.scrollLeft;
    }
    return [scrOfX, scrOfY];
}, getDocHeight = function getDocHeight() {
    var D = document;
    return Math.max(D.body.scrollHeight, D.documentElement.scrollHeight, D.body.offsetHeight, D.documentElement.offsetHeight, D.body.clientHeight, D.documentElement.clientHeight);
}, changeLang = function changeLang(e) {
    e = event.target;
    var currentLang = e.getAttribute('data-lang');
    //title.innerHTML = (currentLang == 'en') ? window.I18N['en'].TITLE : window.I18N['zh-tw'].TITLE;
    title.innerHTML = I18N[currentLang].TITLE;
    console.log(currentLang);
    LANG = currentLang;
    row.innerHTML = "";
    getData();
};
// scroll code
// https://codedump.io/share/PQ7drQ5rPhUQ/1/how-to-do-infinite-scrolling-with-javascript-only-without-jquery

document.addEventListener("scroll", function (event) {
    if (getDocHeight() <= getScrollXY()[1] + window.innerHeight) {
        offset += 21;
        getData();
    }
});

var langChange = document.getElementsByClassName('lang-change');
Array.from(langChange).forEach(function (ele) {
    ele.addEventListener('click', changeLang);
});
getData();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  TITLE: 'Steams English Version'
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  TITLE: '中文直播頻道'
};

/***/ })
/******/ ]);