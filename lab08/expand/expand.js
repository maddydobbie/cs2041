function expandboi(x) {
	var boi = x.concat("-content");
	if (document.getElementById(boi).style.display == "none") {
		document.getElementById(boi).style.display = "block";
		document.getElementById(x).innerHTML = "expand_less";
	} else {
		document.getElementById(boi).style.display = "none";
		document.getElementById(x).innerHTML = "expand_more";
	}
};


document.getElementById("item-1").addEventListener("click", function(){expandboi("item-1")});
document.getElementById("item-2").addEventListener("click", function(){expandboi("item-2")});
