var flagŞearch = false;
var flagButtons = true;
var bookmarkedHeroesId = [];
var bookmarkedHeroesObj = [];

function checkImgNotAviable(src) {
    var srcsplit = src.split("/");
    if (srcsplit[srcsplit.length - 1] == "image_not_available.jpg") {
        return srcsplit[srcsplit.length - 1];
    } else {
        return true;
    }
}

function search() {
    arrayOfTgumnnails = [];
    var value = document.getElementById("js-search").value;
    var nameStartWith = "nameStartsWith=" + value + "&";
    if (nameStartWith == "nameStartsWith=&") {
        getApi();
    } else if (value.length >= 3) {
        removeButtons();
        flag = true;
        request.open('GET', getApiString(nameStartWith), true);
        request.send();
    } else if (value.length < 3 && flag) {
        flagButtons = true;
        request.open('GET', getApiString(), true);
        request.send();
    }
}

function getApi(data = 0) {
    offset = data;
    request.open('GET', getApiString(), true);
    request.send();
}

function addEventListener() {
    var buttons = document.getElementsByClassName("controllButton");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function (e) {
            var page = (e.target.innerHTML - 1) * 20;
            arrayOfTgumnnails = [];
            document.getElementById("js-heroesSection").innerHTML = "";
            getApi(page);
        });
    }
}


function addButtons() {
    var elem = document.getElementById("js-controll");
    var text;
    if (elem.childNodes.length < 12) {
        for (var i = 1; i <= NumberOfPages; i++) {
            var button = document.createElement("button");
            button.classList.add("controllButton");
            text = document.createTextNode(i);
            button.appendChild(text);
            elem.appendChild(button);
        }
    }
}

function removeButtons() {
    var elem = document.getElementById("js-controll");
    elem.innerHTML = "";
}

function bookmarkOrUnbookmark(elem) {
    if (bookmarkedHeroesId.includes(elem.dataset.id)) {
        elem.src = "./img/empty star.png";
        for (var i = 0; i < bookmarkedHeroesId.length; i++) {
            if (bookmarkedHeroesId[i] == elem.dataset.id) {
                bookmarkedHeroesId.splice(i, 1);
            }
            if (bookmarkedHeroesObj[i].id == elem.dataset.id) {
                bookmarkedHeroesObj.splice(i, 1);
            }
        }
    } else {
        elem.src = "./img/full star.png";
        bookmarkedHeroesId.push(elem.dataset.id);
        for (var i = 0; i < arrayOfTgumnnails.length; i++) {
            if (arrayOfTgumnnails[i].id == elem.dataset.id) {
                bookmarkedHeroesObj.push(arrayOfTgumnnails[i]);
                break;
            }
        }

    }
    localStorage.setItem("bookmarkedHeroesId", JSON.stringify(bookmarkedHeroesId));
    localStorage.setItem("bookmarkedHeroesObj", JSON.stringify(bookmarkedHeroesObj));
}

function loadBookmarked() {
    if (localStorage.getItem("bookmarkedHeroesId")) {
        bookmarkedHeroesId = JSON.parse(localStorage.getItem("bookmarkedHeroesId"));
        bookmarkedHeroesObj = JSON.parse(localStorage.getItem("bookmarkedHeroesObj"));

    }
    console.log('​window.onload -> ', bookmarkedHeroesId);
    console.log('​window.onload -> ', bookmarkedHeroesObj);
}

function viewYourBookmarkedHeroes(elem) {
    elem.innerHTML = "<img src='./img/full star.png'><img src='./img/empty star.png'><p>Browse All Heroes!!</p>";
    elem.setAttribute("onclick", "browseAll(this)");
    document.getElementById('js-heroesSection').innerHTML = "";
    var imgSrc = "./img/full star.png"
    k = 0;
    for (var i = 0; i < 5; i++) {
        var div = document.createElement("div");
        var scndDiv = document.createElement("div");
        for (var j = (0 + k); j < (4 + k); j++) {
            if (bookmarkedHeroesObj[j]) {
                var temp = '<div class="thumbnaill" ><img src="' + bookmarkedHeroesObj[j].src + '" alt="" data-img="' +
                    bookmarkedHeroesObj[j].imgAttr + '" onerror="error(this)"><div tooltip="Bookmark \n ' +
                    bookmarkedHeroesObj[j].name.split("(")[0] + '" tooltip-position="buttom"><img class="bookmark" onclick="bookmarkOrUnbookmark(this)" data-id="' +
                    bookmarkedHeroesObj[j].id + '" src="' + imgSrc + '"></div><p><a  tooltip="More details about \n ' +
                    bookmarkedHeroesObj[j].name.split("(")[0] + ' on Marvel.com" tooltip-position="buttom" href="' +
                    bookmarkedHeroesObj[j].url + '" target="_blank">' +
                    bookmarkedHeroesObj[j].name + '</a></p></div>';
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

function browseAll(elem) {
    elem.innerHTML = '<img src="img/full star.png"><p>Veiw your bookmarked heroes!!</p>';
    elem.setAttribute("onclick", "viewYourBookmarkedHeroes(this)");
    document.getElementById('js-heroesSection').innerHTML = "";
    getApi();
}




window.onload = function () {
    loadBookmarked();
    getApi();
    addEventListener();
    history.pushState({
        page: 1
    }, "title 1", "?page=1");
};