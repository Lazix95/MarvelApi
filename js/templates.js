function template4x5() {
    var imgSrc;
    var toolTipText;
    k = 0;
    for (var i = 0; i < 5; i++) {
        var div = document.createElement("div");
        var scndDiv = document.createElement("div");
        for (var j = (0 + k); j < (4 + k); j++) {
            if (typeof arrayOfThumbnails[j] !== 'undefined') {
                if (bookmarkedHeroesId.includes(arrayOfThumbnails[j].id.toString())) {
                    imgSrc = "./img/full star.png";
                    toolTipText = "Unbookmark";
                } else {
                    imgSrc = "./img/empty star.png";
                    toolTipText = "Bookmark";
                }
                var temp = '<div class="thumbnaill" onclick="showDescription(this)" ><img src="' + arrayOfThumbnails[j].src + '" alt="" data-img="' +
                    arrayOfThumbnails[j].imgAttr + '" onerror="error(this)"><div tooltip="'+ toolTipText +' \n ' +
                    arrayOfThumbnails[j].name.split("(")[0] + '" tooltip-position="buttom"><img class="bookmark" onclick="bookmarkOrUnbookmark(this)" data-id="' +
                    arrayOfThumbnails[j].id + '" src="' + imgSrc + '"></div><p><a  tooltip="More details about \n ' +
                    arrayOfThumbnails[j].name.split("(")[0] + ' on Marvel.com" tooltip-position="buttom" href="' +
                    arrayOfThumbnails[j].url + '" target="_blank">' +
                    arrayOfThumbnails[j].name + '</a></p><p class="description">Description: '+ arrayOfThumbnails[j].description+'</p></div>';
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


function viewYourBookmarkedHeroes(k = 0) {
    k = parseInt(k);
    removeButtons();
    trashHeroList();
    bookmarkedFlag = true;
    elem = document.getElementById("js-bookmarkedHeroesButton");
    elem.innerHTML = "<img src='./img/full star.png'><img src='./img/empty star.png'><p>Browse All Heroes!!</p>";
    elem.setAttribute("onclick", "browseAll(this)");
    var imgSrc = "./img/full star.png";
    var toolTipText = "Unbookmark";
    for (var i = 0; i < 5; i++) {
        var div = document.createElement("div");
        var scndDiv = document.createElement("div");
        for (var j = (0 + k); j < (4 + k); j++) {
            if (bookmarkedHeroesObj[j]) {
                var temp = '<div class="thumbnaill"  onclick="showDescription(this)" ><img src="' + bookmarkedHeroesObj[j].src + '" alt="" data-img="' +
                    bookmarkedHeroesObj[j].imgAttr + '" onerror="error(this)"><div tooltip="'+ toolTipText +' \n ' +
                    bookmarkedHeroesObj[j].name.split("(")[0] + '" tooltip-position="buttom"><img class="bookmark" onclick="bookmarkOrUnbookmark(this)" data-id="' +
                    bookmarkedHeroesObj[j].id + '" src="' + imgSrc + '"></div><p><a  tooltip="More details about \n ' +
                    bookmarkedHeroesObj[j].name.split("(")[0] + ' on Marvel.com" tooltip-position="buttom" href="' +
                    bookmarkedHeroesObj[j].url + '" target="_blank">' +
                    bookmarkedHeroesObj[j].name + '</a></p><p class="description">Description: ' + bookmarkedHeroesObj[j].description + '</p></div>';
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
    if (bookmarkedHeroesId.length > 20) {
        addButtons(Math.ceil(bookmarkedHeroesId.length / 20));
        addEventListener(true);
        pointThePage();
    }
}

function pointThePage(){
    console.log("daw",history.state.page);
    var elem = document.getElementById("js-"+history.state.page+"");
    elem.classList.add("active");
}

function error(event) {
    event.classList.add("imageNotFound");
    event.src = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
}

function getApiString(searchString = "") {
    return 'https://gateway.marvel.com/v1/public/characters?' + searchString + 'limit=' + limit +
        '&offset=' + offset + '&apikey=92bf368a68c00ab3cf0a9bc0f6538777&ts=1532018471155&hash=724d05c07ce94cb07d55b76b87543998';
}


