var App = (function (document, XMLHttpRequest) {
  var slike = document.getElementById("photos");
  var apiKey = 'a66205f0e96fff74cff92e5ed60e7ba4';
  var url = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=" + apiKey + "&per_page=&page=&format=json&nojsoncallback=1";
  var photos;
  var activePhotoIndex;


  function createPhotoElement(index, photoData) {
    var photoUrl = "https://farm" + photoData.farm + ".staticflickr.com/" + photoData.server + "/" + photoData.id + "_" + photoData.secret + ".jpg";

    var bodyDiv = document.createElement('DIV');
    bodyDiv.classList.add('container');
    bodyDiv.id = 'photos';

    var overlayDiv = document.createElement('DIV');
    overlayDiv.classList.add('overlay');

    var activePhoto = document.createElement('IMG');
    activePhoto.src = "";
    activePhoto.classList.add('active-photo');

    var left = document.createElement('IMG');
    left.src = "left.png";
    left.classList.add('left');
    left.addEventListener('click', App.previous);

    var right = document.createElement('IMG');
    right.src = "right.png";
    right.classList.add('right');
    right.addEventListener('click', App.next);

    var exit = document.createElement('IMG');
    exit.src = "x.png";
    exit.classList.add('exit');
    exit.addEventListener('click', App.exit);

    var wrapperDiv = document.createElement('DIV');
    wrapperDiv.classList.add('photo-wrapper');

    var newImg = document.createElement('IMG');
    newImg.src = photoUrl;
    newImg.addEventListener('click', App.enlargePhoto);
    newImg.classList.add('img-' + index);

     var button = document.createElement('BUTTON');
     button.innerHTML = "flipThePhoto";
     button.addEventListener('click', App.flip);

    var titleEl = document.createElement('P');
    titleEl.innerHTML = 'Title: ' + photoData.title;

    var ownerEl = document.createElement('P');
    ownerEl.innerHTML = 'Owner: ' + photoData.owner;

    var geoLocation = document.createElement('P');
    geoLocation.innerHTML = 'GeoLocation: ' + photoData.location;

    var flipper = document.createElement('DIV');
    flipper.classList.add('flipper');

    var front = document.createElement('DIV');
    front.classList.add('front');

    var back = document.createElement('DIV');
    back.classList.add('back');


    document.body.appendChild(bodyDiv);
    bodyDiv.appendChild(overlayDiv);
    overlayDiv.appendChild(activePhoto);
    overlayDiv.appendChild(left);
    overlayDiv.appendChild(right);
    overlayDiv.appendChild(exit);
    wrapperDiv.appendChild(flipper);
    flipper.appendChild(front);
    flipper.appendChild(back);
    back.appendChild(titleEl);
    back.appendChild(ownerEl);
    back.appendChild(geoLocation);
    front.appendChild(newImg);
    wrapperDiv.appendChild(button);



    document.querySelector('.container').appendChild(wrapperDiv);
  }


  function createPhoto(data){
    photos = data.photos.photo;
    for (var i = 0; i < photos.length; i++) {
      getPhotoLocation(i, photos[i]);

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

  function getPhotoLocation(index, photo) {
    var photoUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=" +apiKey+ "&photo_id=" +photo.id+ "&format=json&nojsoncallback=1";

    var xhttpForLocation = new XMLHttpRequest();
    xhttpForLocation.onreadystatechange = function() {
      if (xhttpForLocation.readyState == 4 && xhttpForLocation.status == 200) {
        var data = JSON.parse(xhttpForLocation.responseText);
        photo.location = data.message;
        createPhotoElement(index, photo);
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
    console.log(activePhotoIndex);
  }

  function exit() {
    document.querySelector('.overlay').style.display = 'none';
  }

  function next() {
    if (activePhotoIndex == photos.length - 1) {
      return;
    }
    var nextPhoto = photos[activePhotoIndex + 1];
    var photoUrl = "https://farm" + nextPhoto.farm + ".staticflickr.com/" + nextPhoto.server + "/" + nextPhoto.id + "_" + nextPhoto.secret + ".jpg";
    document.querySelector('.active-photo').src = photoUrl;
    activePhotoIndex ++;
  }

  function previous() {
    if (activePhotoIndex == 0) {
      return;
    }
    var previousPhoto = photos[activePhotoIndex - 1];
    var photoUrl = "https://farm" + previousPhoto.farm + ".staticflickr.com/" + previousPhoto.server + "/" + previousPhoto.id + "_" + previousPhoto.secret + ".jpg";
    document.querySelector('.active-photo').src = photoUrl;
    activePhotoIndex --;
  }

   function flip(event) {
     var currentPhoto = event.target.closest('.photo-wrapper');
     currentPhoto.classList.toggle('clicked');
   }

  return {
    loadDoc: loadDoc,
    enlargePhoto: enlargePhoto,
    exit: exit,
    next: next,
    previous: previous,
    flip: flip

  }

})(window.document, window.XMLHttpRequest);

document.addEventListener("DOMContentLoaded", App.loadDoc);
