var slike = document.getElementById("photos");
var apiKey = 'a66205f0e96fff74cff92e5ed60e7ba4';
var url = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=" + apiKey + "&per_page=&page=&format=json&nojsoncallback=1";
var link = function(index, farm, server, id, secret) {
  return "<img class='img-"+index+"' src = 'https://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + ".jpg' onclick='printData(event, "+index+")'/>";
}
var photos;



function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
    	var data = JSON.parse(xhttp.responseText);
      photos = data.photos.photo;
      for (var i = 0; i < photos.length; i++) {
    		slike.innerHTML = slike.innerHTML + link(i, photos[i].farm, photos[i].server, photos[i].id, photos[i].secret);
        getPhotoLocation(photos[i].id);
	    }
    }
  };
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

function printData(event, index) {
  console.log(event)
  event.target.style.display = 'none';
  console.log(photos[index]);
}
