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
        getApi();
    } else if (value.length >= 3) {
        bookmarkButtonChangeBack();
        removeButtons();
        flagButtons = false;
        flag = true;
        request.open('GET', getApiString(nameStartWith), true);
        request.send();
    } else if (value.length < 3 && flag) {
        flagButtons = true;
        request.open('GET', getApiString(), true);
        request.send();
    }
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
function corectThePageState(){
    if (history.state.page != 1){
        history.pushState({
            page: 1
        }, "title 1", "?page=1");
    }
}

// initial Bookmarked heroes view;
function viewBookmarkedHeroesSetting(){
    corectThePageState();
    viewYourBookmarkedHeroes(0);
}

// Start app when loaded;
window.onload = function () {
    loadBookmarked();
    getApi();
    history.pushState({
        page: 1
    }, "title 1", "?page=1");

};

  