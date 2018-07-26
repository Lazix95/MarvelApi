// Add bookmarked pagination buttons
function addButtons(numbOfPage = NumberOfPages) {
    var elem = document.getElementById("js-controll");
    var text;
    if (elem.childNodes.length < 12) {
        for (var i = 1; i <= numbOfPage; i++) {
            var button = document.createElement("button");
            button.classList.add("controllButton");
            button.id = "js-" + i + "";
            text = document.createTextNode(i);
            button.appendChild(text);
            elem.appendChild(button);
        }
    }
}

// Add back and forward pagination buttons
function addSearchButtons() {
    var elem = document.getElementById("js-controll");
    var buttonForward = document.createElement("button");
    var buttonBack = document.createElement("button");
    var textForward;
    var textBack;
    buttonForward.classList.add("controllButton");
    buttonBack.classList.add("controllButton");
    buttonForward.id = "js-forward";
    buttonBack.id = "js-Back";
    textForward = document.createTextNode("Forward");
    textBack = document.createTextNode("Back");
    buttonForward.appendChild(textForward);
    buttonBack.appendChild(textBack);
    buttonForward.setAttribute("onclick", "goForward()");
    buttonBack.setAttribute("onclick", "goBack()");
    elem.appendChild(buttonBack);
    elem.appendChild(buttonForward);
}

// Go forward
function goForward() {
    var elem = event.target;
    var value = document.getElementById("js-search").value;
    if (document.getElementsByClassName("thumbnaill").length == 20 && value.length > 0) {
        offset += 20;
        search();
        upadtePageState(1);
    } else if (!bookmarkedFlag && value.length == 0) {
        offset += 20;
        trashHeroList();
        upadtePageState(1);
        removeButtons();
        getApi();
    } else {
        elem.setAttribute("disabled", "");
        addClass(elem, "buttonDisabled");
    }
}

// Go back
function goBack() {
    var value = document.getElementById("js-search").value;
    var elem = event.target;
    if (offset < 1) {
        elem.setAttribute("disabled", "");
        addClass(elem, "buttonDisabled");
    } else if (!bookmarkedFlag && value.length == 0) {
        offset -= 20;
        trashHeroList();
        upadtePageState(-1);
        removeButtons();
        getApi();
    } else {
        offset -= 20;
        search();
        upadtePageState(-1);
    }
}

// Upadate page state number
function upadtePageState(param) {
    param = parseInt(param) + parseInt(history.state.page);
    history.pushState({
        page: param
    }, "title " + param + "", "?page=" + param + "");
}

// Reset page state back to 1
function resetPageState() {
    history.pushState({
        page: 1
    }, "title " + 1 + "", "?page=" + 1 + "");
}

// Set page state on start
function startHistory() {
    history.replaceState({
        page: 1
    }, "title " + 1 + "", "?page=" + 1 + "");
}

// Add event listener for bookmark pagination buttons
function addEventListener(showBookmarked = false) {
    var buttons = document.getElementsByClassName("controllButton");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function (e) {
            var page = (e.target.innerHTML - 1) * 20;
            history.replaceState({
                page: e.target.innerHTML
            }, "title " + e.target.innerHTML + "", "?page=" + e.target.innerHTML + "");
            if (!showBookmarked) {
                removeButtons();
                trashHeroList();
                offset = page;
                search();
            } else {
                currentPage = page;
                viewYourBookmarkedHeroes(page);
            }
        });
    }
}

// Change hero view button
function bookmarkButtonChangeBack() {
    var elem = document.getElementById("js-bookmarkedHeroesButton");
    bookmarkedFlag = false;
    elem.innerHTML = '<img src="img/full star.png"><p>Veiw your bookmarked heroes!!</p>';
    elem.setAttribute("onclick", "viewBookmarkedHeroesSetting()");
}

// Removes buttons
function removeButtons() {
    var elem = document.getElementById("js-controll");
    flagButtons = true;
    elem.innerHTML = "";
}

// Removes all thumbnails
function trashHeroList() {
    arrayOfThumbnails = [];
    document.getElementById("js-heroesSection").innerHTML = "";
}

// Switch from bookmarked to all heroes;
function browseAll(elem) {
    corectThePageState();
    bookmarkButtonChangeBack();
    trashHeroList();
    removeButtons();
    getApi();
}

// Animate rotation of thumbnails
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
        for (var i = 0; i < bookmarkedHeroesObj.length; i++) {
            if (event.target.parentNode.dataset.id == bookmarkedHeroesObj[i].id) {
                bookmarkedHeroesObj[i].animated = true;
            }
        }
    }
}

// Animate reverse rotation of thumbnails
function hideDescription(e) {
    removeClass(e,"tumbnailStopAnimation");
    if (event.target.className != "bookmark") {
        var index = array.indexOf(e);
        if (array.includes(e)) {
            array.splice(index, 1);
            exchangeClasses(e, "thumbnaillAnimation", "thumbnaillAnimationReverse");
            setTimeout(function () {
                removeClass(e, "thumbnaillDescription");
            }, 800);
            setTimeout(function () {
                e.setAttribute("onclick", "showDescription(this)");
            }, 1600);
            for (var i = 0; i < bookmarkedHeroesObj.length; i++) {
                if (event.target.parentNode.dataset.id == bookmarkedHeroesObj[i].id) {
                    bookmarkedHeroesObj[i].animated = false;
                }
            }
        } else if (!array.includes(e) && isContainClass(e, "thumbnaillAnimation")) {
            array.push(e);
            hideDescription(e);
        }
    }
}

// Delay search for 500ms
var delaySearch = debounce(function () {
    search();
}, 500);

// Debaunce funnction call
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Convert img to Base 64
function toDataUrl(obj, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result, obj);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', obj.src);
    xhr.responseType = 'blob';
    xhr.send();
}

// Go forward and go back browser buttons event
window.onpopstate = function () {
    var value = document.getElementById("js-search").value;
    if (bookmarkedFlag) {
        viewYourBookmarkedHeroes((this.history.state.page - 1) * 20);
    } else if (!bookmarkedFlag && value.length < 1) {
        offset = (this.history.state.page - 1) * 20;
        trashHeroList();
        removeButtons();
        getApi();
    } else if (!bookmarkedFlag && value > 0) {
        offset = (this.history.state.page - 1) * 20;
        trashHeroList();
        removeButtons();
        search();
    }
};

// Reset offset on every search
function resetOffset() {
    offset = 0;
}