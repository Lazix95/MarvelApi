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
    buttonForward.setAttribute("onclick","goForward()");
    buttonBack.setAttribute("onclick","goBack()");
    elem.appendChild(buttonBack);
    elem.appendChild(buttonForward);
}

function goForward(){
    if(document.getElementsByClassName("thumbnaill").length == 20){
        offset += 20;
        search();
    }else{
        alert("There is no forward!!");
    }
}

function goBack(){
    if(offset < 1){
        alert("There is no back!!");
    }else{
        offset -= 20;
        search();
    }
}

function addEventListener(showBookmarked = false) {
    var buttons = document.getElementsByClassName("controllButton");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function (e) {
            var page = (e.target.innerHTML - 1) * 20;
            history.pushState({
                page: e.target.innerHTML
            }, "title " + e.target.innerHTML + "", "?page=" + e.target.innerHTML + "");
            if (!showBookmarked) {
                removeButtons();
                trashHeroList();
                //getApi(page);
                offset = page;
                search();
            } else {
                currentPage = page;
                viewYourBookmarkedHeroes(page);
            }
        });
    }
}

function bookmarkOrUnbookmark(elem) {
    if (bookmarkedHeroesId.includes(elem.dataset.id)) {
        elem.src = "./img/empty star.png";
        elem.parentNode.setAttribute("tooltip", elem.parentNode.getAttribute("tooltip").replace("Unbookmark", "Bookmark"));
        for (var i = 0; i < bookmarkedHeroesId.length; i++) {
            if (bookmarkedHeroesId[i] == elem.dataset.id) {
                bookmarkedHeroesId.splice(i, 1);
            }
            if (bookmarkedHeroesObj[i].id == elem.dataset.id) {
                bookmarkedHeroesObj.splice(i, 1);
            }
        }
        if (bookmarkedFlag) {
            if (bookmarkedHeroesId.length <= currentPage) {
                setpage = currentPage - 20;
            } else {
                setpage = currentPage;
            }
            viewYourBookmarkedHeroes(setpage);
        }
    } else {
        elem.src = "./img/full star.png";
        elem.parentNode.setAttribute("tooltip", elem.parentNode.getAttribute("tooltip").replace("Bookmark", "Unbookmark"));
        bookmarkedHeroesId.push(elem.dataset.id);
        for (var j = 0; j < arrayOfThumbnails.length; j++) {
            if (arrayOfThumbnails[j].id == elem.dataset.id) {
                bookmarkedHeroesObj.push(arrayOfThumbnails[j]);
                break;
            }
        }

    }
    localStorage.setItem("bookmarkedHeroesId", JSON.stringify(bookmarkedHeroesId));
    localStorage.setItem("bookmarkedHeroesObj", JSON.stringify(bookmarkedHeroesObj));
}

function bookmarkButtonChangeBack() {
    var elem = document.getElementById("js-bookmarkedHeroesButton");
    bookmarkedFlag = false;
    elem.innerHTML = '<img src="img/full star.png"><p>Veiw your bookmarked heroes!!</p>';
    elem.setAttribute("onclick", "viewBookmarkedHeroesSetting()");
}


function removeButtons() {
    var elem = document.getElementById("js-controll");
    flagButtons = true;
    elem.innerHTML = "";
}

function trashHeroList() {
    arrayOfThumbnails = [];
    document.getElementById("js-heroesSection").innerHTML = "";
}