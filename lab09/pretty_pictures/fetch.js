export default function runApp() {
	//fetchImage(1);
	for (var i = 0; i < 5; i++) {
		fetchImage(i);
	}
	document.getElementById("more").addEventListener("click", moreImg);
}

function fetchImage(i) {
	fetch("https://picsum.photos/200/300/?random")
		.then(function(response) {
			return response.blob();
		}) .then(function(image) {
			
			var imageURL = URL.createObjectURL(image);

			var styleDiv = document.createElement("div");
			styleDiv.setAttribute("style", "width: 100%; display: flex; align-items: center; justify-content: center");
			var imgDiv = document.createElement("div");
			imgDiv.setAttribute("class", "img-post");
			
			var img = document.createElement("img");
			img.setAttribute("src", imageURL);
			img.setAttribute("id", "img"+i);
			imgDiv.appendChild(img);

			var time = document.createElement("p");
			time.setAttribute("id", "time"+i);
			var today = new Date();
			var curr = today.getHours() + ":" + today.getMinutes();
			var text = document.createTextNode("Fetched at "+curr);
			time.appendChild(text);
			imgDiv.appendChild(time);

			styleDiv.appendChild(imgDiv);
			document.getElementById("output").appendChild(styleDiv);

		})
}

function moreImg() {
	for (var j = 0; j < 5; j++) {
		changeImage(j);
	}
}

function changeImage(j) {
	fetch("https://picsum.photos/200/300/?random")
		.then(function(response) {
			return response.blob();
		}) .then(function(image) {
			// update image
			var imageURL = URL.createObjectURL(image);
			var imgId = "img"+j;
			document.getElementById(imgId).setAttribute("src", imageURL);
			// update time
			var today = new Date();
    		var curr = today.getHours() + ":" + today.getMinutes();
			var timeId = "time"+j;
			document.getElementById(timeId).childNodes[0].data = "Fetched at "+curr;
		})
}


