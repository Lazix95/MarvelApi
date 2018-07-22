var templateArray = [];
var k = 0;
var br = document.createElement("br");

function template4x5() {
    var imgSrc;
    k = 0;
    for (var i = 0; i < 5; i++) {
        var div = document.createElement("div");
        var scndDiv = document.createElement("div");
        for (var j = (0 + k); j < (4 + k); j++) {
            if (typeof arrayOfTgumnnails[j] !== 'undefined') {
                if (bookmarkedHeroesId.includes(arrayOfTgumnnails[j].id.toString())) {
                    imgSrc = "./img/full star.png";
                } else {
                    imgSrc = "./img/empty star.png";
                }
                var temp = '<div class="thumbnaill" ><img src="' + arrayOfTgumnnails[j].src + '" alt="" data-img="' +
                    arrayOfTgumnnails[j].imgAttr + '" onerror="error(this)"><div tooltip="Bookmark \n ' +
                    arrayOfTgumnnails[j].name.split("(")[0] + '" tooltip-position="buttom"><img class="bookmark" onclick="bookmarkOrUnbookmark(this)" data-id="' +
                    arrayOfTgumnnails[j].id + '" src="' + imgSrc + '"></div><p><a  tooltip="More details about \n ' +
                    arrayOfTgumnnails[j].name.split("(")[0] + ' on Marvel.com" tooltip-position="buttom" href="' +
                    arrayOfTgumnnails[j].url + '" target="_blank">' +
                    arrayOfTgumnnails[j].name + '</a></p></div>';
                div.innerHTML += temp;
                var s = div.querySelectorAll('[data-img="image_not_available.jpg"]');
                if (s[0] != null) {
                    s.forEach(function (elem) {
                        elem.classList.add("imageNotFound");
                    });
                }
                scndDiv.appendChild(div);
            }
        }
        document.getElementById("js-heroesSection").appendChild(scndDiv);
        k += 4;
    }
}

function error(event) {
    event.classList.add("imageNotFound");
    event.src = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
}

function getApiString(searchString = "") {
    return 'https://gateway.marvel.com/v1/public/characters?' + searchString + 'limit=' + limit +
        '&offset=' + offset + '&apikey=92bf368a68c00ab3cf0a9bc0f6538777&ts=1532018471155&hash=724d05c07ce94cb07d55b76b87543998';
}