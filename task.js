var slike = document.getElementById("photos");
var url = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=a66205f0e96fff74cff92e5ed60e7ba4&per_page=&page=&format=json&nojsoncallback=1"
var link = function(farm, server, id, secret) {
  return "<img src = 'https://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + ".jpg' />";
}



function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
    	var data = JSON.parse(xhttp.responseText);
      var photos = data.photos.photo;
      for (var i = 0; i < photos.length; i++) {
    		slike.innerHTML = slike.innerHTML + link(photos[i].farm,photos[i].server,photos[i].id, photos[i].secret);
		}
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
