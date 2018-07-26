// Bookmark or unbookmark hero 
function bookmarkOrUnbookmark(elem) {
    if (bookmarkedHeroesId.includes(elem.dataset.id)) {
        Unbookmark(elem);
    } else {
        bookmark(elem);
    }
}

// Bookmark
function bookmark(elem) {
    elem.src = "./img/full star.png";
    elem.parentNode.setAttribute("tooltip", elem.parentNode.getAttribute("tooltip").replace("Bookmark", "Unbookmark"));
    bookmarkedHeroesId.push(elem.dataset.id);
    for (var j = 0; j < arrayOfThumbnails.length; j++) {
        if (arrayOfThumbnails[j].id == elem.dataset.id) {
            //  toDataUrl(arrayOfThumbnails[j], function (base64, obj) {
            //  obj.src = base64;
            //  bookmarkedHeroesObj.push(obj);
            // saveToLocalStorge();
            // });
            var obj = arrayOfThumbnails[j];
            obj.animated = false;
            bookmarkedHeroesObj.push(obj);
            saveToLocalStorge();
            break;
        }
    }
}

// Unbookmark
function Unbookmark(elem) {
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
            upadtePageState(-1);
        } else {
            setpage = currentPage;
        }
        saveToLocalStorge();
        viewYourBookmarkedHeroes(setpage);
    }
}

// Save to local storge
function saveToLocalStorge() {
    localStorage.setItem("bookmarkedHeroesId", JSON.stringify(bookmarkedHeroesId));
    localStorage.setItem("bookmarkedHeroesObj", JSON.stringify(bookmarkedHeroesObj));
}