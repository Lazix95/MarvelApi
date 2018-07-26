// Check if image exist
function checkImgNotAviable(src) {
    var srcsplit = src.split("/");
    if (srcsplit[srcsplit.length - 1] == "image_not_available.jpg") {
        return srcsplit[srcsplit.length - 1];
    } else {
        return true;
    }
}

// Search through heroes
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
    } 
}

// Initial Api request
function getApi(data = 0) {
    request.open('GET', getApiString(), true);
    request.send();
}

// Load bookmarked heroes
function loadBookmarked() {
    if (localStorage.getItem("bookmarkedHeroesId")) {
        bookmarkedHeroesId = JSON.parse(localStorage.getItem("bookmarkedHeroesId"));
        bookmarkedHeroesObj = JSON.parse(localStorage.getItem("bookmarkedHeroesObj"));
        for (var i=0;i<bookmarkedHeroesObj.length;i++){
            bookmarkedHeroesObj[i].animated = false;
        }
    }
}

// Correct page state number
function corectThePageState() {
    if (history.state.page != 1) {
        history.pushState({
            page: 1
        }, "title 1", "?page=1");
    }
}

// initial Bookmarked heroes view
function viewBookmarkedHeroesSetting() {
    document.getElementById("js-search").value = "";
    corectThePageState();
    viewYourBookmarkedHeroes(0);
}

// Check if element contains class
function isContainClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;

}

// Add class
function addClass(elem, param1) {
    var classString = elem.getAttribute("class");
    classString = classString + " " + param1;
    elem.setAttribute("class",classString);
}

// Remove one and add another class
function exchangeClasses(elem, param1, param2) {
    var classString = elem.getAttribute("class");
    classString = classString.replace(param1, param2);
    elem.setAttribute("class", classString);
}

// Remove class
function removeClass(elem, param) {
    var classString = elem.getAttribute("class");
    classString = classString.replace(param, "");
    elem.setAttribute("class", classString);
}

// Start app when loaded;
window.onload = function () {
    startHistory();
    loadBookmarked();
    viewBookmarkedHeroesSetting();
};