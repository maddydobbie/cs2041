export default function runApp() {
	fetch("https://jsonplaceholder.typicode.com/users")
		.then(function(response) {
				return response.json();
		}).then(function(results) {
			for (var i = 0; i < results.length; i++) {
				// style div						
				var styleDiv = document.createElement("div");
				styleDiv.setAttribute("style", "width: 100%; display: flex; align-items: center; justify-content: center");
				// user div
				var user = document.createElement("div");
				user.setAttribute("class", "user");		
				// name element
				var person = document.createElement("h2");
				var text = document.createTextNode(results[i].name);
				person.appendChild(text);
				user.appendChild(person);
				// phrase element
				var phrase = document.createElement("p");
				var text = document.createTextNode(results[i].company.catchPhrase);
				phrase.appendChild(text);
				user.appendChild(phrase);
				// append to style div and then output
				styleDiv.appendChild(user);
				document.getElementById("output").appendChild(styleDiv);	
			}
		})
}
