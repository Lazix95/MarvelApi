function getNotLoadedPics() {
    var requestNotLoaded = new XMLHttpRequest();
    limit = limit + moveLimit;
    requestNotLoaded.open('GET',
        'https://gateway.marvel.com/v1/public/characters?limit=' + notLoaded +
        '&offset=' + limit +
        '&apikey=92bf368a68c00ab3cf0a9bc0f6538777&ts=1532018471155&hash=724d05c07ce94cb07d55b76b87543998',
        true);
    moveLimit = notLoaded;
    notLoaded = 0;
    requestNotLoaded.onload = function () {
        var data = JSON.parse(this.response);
        if (requestNotLoaded.status >= 200 && requestNotLoaded.status < 400) {
            for (var i = 0; i < data.data.results.length; i++) {
                var src = data.data.results[i].thumbnail.path + ".jpg";
                fillThumbnails(src);
            }
            if (notLoaded > 0) {
                getNotLoadedPics();
            }
        } else {
            console.log('error');
        }
    }
    requestNotLoaded.send();
}

function addAnimationListener() {
    var thumbnails = document.getElementsByClassName("thumbnaill");
    for (var i = 0; i < thumbnails.length; i++) {
        thumbnails[i].addEventListener("click", function (e) {
            if (isContainClass(e.target.parentNode, "thumbnaill")) {
                if (!isContainClass(e.target.parentNode, "thumbnaillAnimation")) {
                    e.target.parentNode.classList = "thumbnaill";
                    e.target.parentNode.classList.add("thumbnaillAnimation");
                    setTimeout(function () {
                        e.target.parentNode.classList.add("thumbnaillDescription");
                    }, 1000);
                }
            }
        });
    }
}

function addAnimationListenerReverse() {
    var thumbnails = document.getElementsByClassName("thumbnaill");
    for (var i = 0; i < thumbnails.length; i++) {
        thumbnails[i].addEventListener("click", function (e) {
            if (isContainClass(e.target.parentNode, "thumbnaill")) {
                if (isContainClass(e.target.parentNode, "thumbnaillAnimation")) {
                    exchangeClasses(e.target.parentNode, "thumbnaillAnimation", "thumbnaillAnimationReverse");
                    setTimeout(function () {
                        removeClass(e.target.parentNode, "thumbnaillDescription");
                    }, 1000);

                }
            }
        });
    }
}