function clockboi() {
    var now = new Date();
	var h = now.getHours();
	var m = now.getMinutes();
	var s = now.getSeconds();
    var bazinga = h + ":" + m + ":" + s; 
    document.getElementById("output").innerHTML = bazinga;
};

window.setInterval(clockboi, 1000);
