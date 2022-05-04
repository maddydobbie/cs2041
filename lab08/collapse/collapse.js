function collapseboi(x) {
	document.getElementById(x).remove();
};


document.getElementById("item-1").addEventListener("click", function(){collapseboi("item-1-content")});
document.getElementById("item-2").addEventListener("click", function(){collapseboi("item-2-content")});
