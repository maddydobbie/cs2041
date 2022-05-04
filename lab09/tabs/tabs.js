export default function runApp() {
	fetch("./planets.json")
	.then(res => res.json())
	.then(function(data) {
		var out = document.createElement("div");
		document.getElementById("main").appendChild(out);
		for (var i = 0; i < data.length; i++) { // get all planets into their own divs
			// planet div
			var planet = document.createElement("div");
			planet.setAttribute("id", data[i].name);
			planet.setAttribute("class", information);
			// name heading
			var heading = document.createElement("h2");
			var text = document.createTextNode(data[i].name);
			heading.appendChild(text);
			planet.appendChild(heading);
			// hr
			var hr = document.createElement("hr");
			planet.appendChild(hr);
			// details paragraph
			var deets = document.createElement("p");
			var text = document.createTextNode(data[i].details);
			deets.appendChild(text);
			planet.appendChild(deets);
			// info list
			var list = document.createElement("ul");
			// add list elements from summary
			for (var j = 0; j < data[i].summary.length; j++) {
				// info element
				var el = document.createElement("li");
				// info title
				var elTitle = document.createElement("b");
				var text = document.createTextNode(data[i].summary[j]);
				elTitle.appendChild(text);
				// info details
				var text = document.createTextNode(data[i].summary[j]);
				el.appendChild(text);
				list.appendChild(el);
			}
			// append to output
			out.appendChild(planet);
		}
		// depending on i, attach div to corresponding tab
		//var id = "tab-"+(i-1);
		//console.log(document.getElementById(id));
		if (document.getElementById("tab-1") == "nav-link active") {
			Saturn.setAttribute("class", "active");
		} else if (document.getElementById("tab-2") == "nav-link active") {
			Earth.setAttribute("class", "active");
		} else if (document.getElementById("tab-3") == "nav-link active") {
			Jupiter.setAttribute("class", "active");
		} else if (document.getElementById("tab-4") == "nav-link active") {
			Mercury.setAttribute("class", "active");
		} else if (document.getElementById("tab-5") == "nav-link active") {
			Uranus.setAttribute("class", "active");
		} else if (document.getElementById("tab-6") == "nav-link active") {
			Venus.setAttribute("class", "active");
		} else if (document.getElementById("tab-7") == "nav-link active") {
			Mars.setAttribute("class", "active");
		} else if (document.getElementById("tab-8") == "nav-link active") {
			Neptune.setAttribute("class", "active");
		} 


	})
}
