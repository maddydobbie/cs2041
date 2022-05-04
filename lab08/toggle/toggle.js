function togboi() {
   	'use strict';
	var thing = document.getElementById("output").className;
	if (thing == "hide") {
		document.getElementById("output").className = "kms";
	} else {
		document.getElementById("output").className = "hide";
	}
};

window.setInterval(togboi, 2000);
