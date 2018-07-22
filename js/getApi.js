var limit = 20;
var pageLimit = 20;
var offset = 0;
var NumberOfPages = 12;
var arrayOfTgumnnails = [];
var getSecnd = true;

var imgAttr;
var request = new XMLHttpRequest();
request.onload = function () {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        document.getElementById('js-heroesSection').innerHTML = "";
        for (var i = 0; i < data.data.results.length; i++) {
            var src = data.data.results[i].thumbnail.path + ".jpg";
            imgAttr = checkImgNotAviable(src);
            if (imgAttr) {
                var thumbnail = {
                    "id": data.data.results[i].id,
                    "name": data.data.results[i].name,
                    "description": data.data.results[i].description,
                    "src": src,
                    "imgAttr": imgAttr,
                    "url": data.data.results[i].urls[0].url
                };
                arrayOfTgumnnails.push(thumbnail);
            } else {
                pageLimit++;
            }
        }
        template4x5();
        if (flagButtons){
            addButtons();
            flagButtons=false;
        }
    } else {
        console.log('error');
    }
};





