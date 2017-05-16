var lazyImages;
var offset = 0;
var row = document.querySelector('.row');
initLazyImages = function() {
        var temp = [];
        lazyImages = document.querySelectorAll('img[data-src]');
        for (var i = 0; i < lazyImages.length; i++) {
            temp.push(lazyImages[i]);
        }
        lazyImages = temp;
    },
    loadImage = function(img) {
        var imgObj = new Image(),
            src = img.getAttribute('data-src');
        imgObj.onload = function() {
            if (src) {
                img.src = src;
            };
            img.removeAttribute('data-src');
        };
        imgObj.src = src;
    },
    canLoadImage = function(elem) {
        var pos = elem.getBoundingClientRect();
        return pos.top >= 0 && pos.left >= 0 &&
            pos.top <= (window.innerHeight ||
                document.documentElement.clientHeight)
    },
    handleLazyImages = function() {
        for (var i = 0; i < lazyImages.length; i++) {
            var image = lazyImages[i];
            // if (canLoadImage(image)) {
            //     loadImage(lazyImages.splice(i, 1)[0]);
            //     i--;
            // }
            loadImage(lazyImages.splice(i, 1)[0]);
            i--;
        }
    },
    getData = function() {
        const clientId = 's44s145uexjgeu9mqqa1s93oc1bnli';
        const limit = 21;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", 'https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&limit=' + limit + '&offset=' + offset, false);
        xhr.setRequestHeader('client-ID', clientId)
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText)
                getDataCallbakFunc(null, response);
            }
        }
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
    },
    getDataCallbakFunc = function(err, data) {
        if (err) {
            console.log(err);
        } else {
            const streams = data.streams;

            for (const stream of streams) {
                var div = document.createElement('div');
                div.className = 'col';
                div.innerHTML = getColumn(stream);
                row.append(div);
            }
            initLazyImages();
            handleLazyImages();
        }
    },
    getColumn = function(data) {
        return `
          <div class="preview">
            <img src="./assets/image/preview.jpg" data-src="${data.preview.medium}"/>
          </div>
          <div class="bottom">
            <div class="intro">
              <div class="logo">
                <img src="./assets/image/preview.jpg" data-src="${data.channel.logo}"/>
              </div>
              <div class="desc">
                <div class="title">
                  ${data.channel.status}
                </div>
                <div class="name">
                  ${data.channel.display_name}
                </div>
              </div>
            </div>
          </div>`;
    },
    getScrollXY = function() {
        var scrOfX = 0,
            scrOfY = 0;

        if (typeof(window.pageYOffset) == 'number') {
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
    },
    getDocHeight = function() {
        var D = document;
        return Math.max(
            D.body.scrollHeight, D.documentElement.scrollHeight,
            D.body.offsetHeight, D.documentElement.offsetHeight,
            D.body.clientHeight, D.documentElement.clientHeight
        );
    };
// scroll code
// https://codedump.io/share/PQ7drQ5rPhUQ/1/how-to-do-infinite-scrolling-with-javascript-only-without-jquery

document.addEventListener("scroll", function(event) {
    if (getDocHeight() == getScrollXY()[1] + window.innerHeight) {
        offset += 21;
        getData();
    }
});

getData();