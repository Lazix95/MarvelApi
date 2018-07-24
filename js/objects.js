// Check if image exist;
function checkImgNotAviable(src) {
    var srcsplit = src.split("/");
    if (srcsplit[srcsplit.length - 1] == "image_not_available.jpg") {
        return srcsplit[srcsplit.length - 1];
    } else {
        return true;
    }
}

// Search through heroes;
function search() {
    var value = document.getElementById("js-search").value;
    var nameStartWith = "nameStartsWith=" + value + "&";
    if (nameStartWith == "nameStartsWith=&") {
        trashHeroList();
        viewBookmarkedHeroesSetting();
    } else if (value.length >= 1) {
        trashHeroList();
        bookmarkButtonChangeBack();
        removeButtons();
        flag = true;
        flagButtons = false;
        request.open('GET', getApiString(nameStartWith), true);
        request.send();
    }// else if (value.length < 3 && flag && value.length >= 2) {
       // trashHeroList();
      //  flagButtons = true;
      // viewBookmarkedHeroesSetting();
   // }
}

// Initial Api request;
function getApi(data = 0) {
    offset = data;
    request.open('GET', getApiString(), true);
    request.send();
}

// Load bookmarked heroes;
function loadBookmarked() {
    if (localStorage.getItem("bookmarkedHeroesId")) {
        bookmarkedHeroesId = JSON.parse(localStorage.getItem("bookmarkedHeroesId"));
        bookmarkedHeroesObj = JSON.parse(localStorage.getItem("bookmarkedHeroesObj"));
    }
}

// Switch from bookmarked to all heroes;
function browseAll(elem) {
    corectThePageState();
    bookmarkButtonChangeBack();
    trashHeroList();
    removeButtons();
    getApi();
}

// Correct page state number;
function corectThePageState() {
    if (history.state.page != 1) {
        history.pushState({
            page: 1
        }, "title 1", "?page=1");
    }
}

// initial Bookmarked heroes view;
function viewBookmarkedHeroesSetting() {
    document.getElementById("js-search").value = "";
    corectThePageState();
    viewYourBookmarkedHeroes(0);
}

function showDescription(elem) {
    if (!array.includes(elem) && event.target.className != "bookmark") {
        array.push(elem);
        elem.classList = "thumbnaill";
        elem.classList.add("thumbnaillAnimation");
        setTimeout(function () {
            elem.classList.add("thumbnaillDescription");
        }, 800);
        setTimeout(function () {
            elem.setAttribute("onclick", "hideDescription(this)");
        }, 1600);
    }
}

function hideDescription(e) {
    if (event.target.className != "bookmark") {
        var index = array.indexOf(e);
        if (index > -1) {
            array.splice(index, 1);
            exchangeClasses(e, "thumbnaillAnimation", "thumbnaillAnimationReverse");
            setTimeout(function () {
                removeClass(e, "thumbnaillDescription");
            }, 800);
            setTimeout(function () {
                e.setAttribute("onclick", "showDescription(this)");
            }, 1600);
        }
    }
}

function isContainClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;

}

function exchangeClasses(elem, param1, param2) {
    var classString = elem.getAttribute("class");
    classString = classString.replace(param1, param2);
    elem.setAttribute("class", classString);
}

function removeClass(elem, param) {
    var classString = elem.getAttribute("class");
    classString = classString.replace(param, "");
    elem.setAttribute("class", classString);
}

// Start app when loaded;
window.onload = function () {
    loadBookmarked();
    viewBookmarkedHeroesSetting();
    history.pushState({
        page: 1
    }, "title 1", "?page=1");
};

