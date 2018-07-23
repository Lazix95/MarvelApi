// Query api from Marvel.com;
var request = new XMLHttpRequest();
request.onload = function () {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        trashHeroList();
        for (var i = 0; i < data.data.results.length; i++) {
            var src = data.data.results[i].thumbnail.path + ".jpg";
            imgAttr = checkImgNotAviable(src);
            var thumbnail = {
                "id": data.data.results[i].id,
                "name": data.data.results[i].name,
                "description": data.data.results[i].description ? data.data.results[i].description : "Description Not Available!!",
                "src": src,
                "imgAttr": imgAttr,
                "url": data.data.results[i].urls[0].url
            };
            arrayOfThumbnails.push(thumbnail);
        }
        template4x5();
        if (flagButtons) {
            addButtons();
            addEventListener();
            flagButtons = false;
        }
    } else {
        console.log('error');
    }
};

request.onloadstart = function(){
    var img = document.createElement("img");
    img.src = "./img/loading.gif";
    img.classList.add("loadingScreen");
    document.getElementById("js-heroesSection").appendChild(img);

}

// Point page button when api loaded;
request.onloadend = function () {
    if (document.getElementsByClassName("controllButton").length>0) {
        var buttonID = "js-" + history.state.page + "";
        document.getElementById(buttonID).classList.add("active");
    }
};