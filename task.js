var App = (function (document, XMLHttpRequest) {
  var slike = document.getElementById("photos");
  var apiKey = 'a66205f0e96fff74cff92e5ed60e7ba4';
  var url = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=" + apiKey + "&per_page=&page=&format=json&nojsoncallback=1";
  var link = function(index, farm, server, id, secret) {
    var slika = "https://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + ".jpg"
    return "<li class='row'><a class='thumbnail' href='#'><img class='img-"+index+"' class='group1' src ='" + slika + "'onclick='App.enlargePhoto(event, "+index+")'/></a></li>";
  }
  var photos;
  var activePhotoIndex;



function createPhoto(data){
  photos = data.photos.photo;
  for (var i = 0; i < photos.length; i++) {
    slike.innerHTML = slike.innerHTML + link(i, photos[i].farm, photos[i].server, photos[i].id, photos[i].secret);
    getPhotoLocation(photos[i].id);
  };
}


  function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
      	var data = JSON.parse(xhttp.responseText);
        createPhoto(data);
  	    }
      }
    xhttp.open("GET", url, true);
    xhttp.send();
  }

  function getPhotoLocation(photoId) {
    var photoUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=" +apiKey+ "&photo_id=" +photoId+ "&format=json&nojsoncallback=1";

    var xhttpForLocation = new XMLHttpRequest();
    xhttpForLocation.onreadystatechange = function() {
      if (xhttpForLocation.readyState == 4 && xhttpForLocation.status == 200) {
        var data = JSON.parse(xhttpForLocation.responseText);
      }
    }
    xhttpForLocation.open("GET", photoUrl, true);
    xhttpForLocation.send();
  }

  function enlargePhoto(event, index) {
    var currentCardElement = event.target;
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.active-photo').src = currentCardElement.src;
    activePhotoIndex = Number(currentCardElement.className.slice(4));
  }

  function exit() {
    document.querySelector('.overlay').style.display = 'none';
    currentCardElement.classList.remove('active-card');
  }

  function next() {
    var nextPhoto = photos[activePhotoIndex + 1];
    var photoUrl = "https://farm" + nextPhoto.farm + ".staticflickr.com/" + nextPhoto.server + "/" + nextPhoto.id + "_" + nextPhoto.secret + ".jpg";
    document.querySelector('.active-photo').src = photoUrl;
    activePhotoIndex ++;
  }

  function previous() {
    var previousPhoto = photos[activePhotoIndex - 1];
    var photoUrl = "https://farm" + previousPhoto.farm + ".staticflickr.com/" + previousPhoto.server + "/" + previousPhoto.id + "_" + previousPhoto.secret + ".jpg";
    document.querySelector('.active-photo').src = photoUrl;
    activePhotoIndex --;
  }

  return {
    loadDoc: loadDoc,
    enlargePhoto: enlargePhoto,
    exit: exit,
    next: next,
    previous: previous
  }

})(window.document, window.XMLHttpRequest);
