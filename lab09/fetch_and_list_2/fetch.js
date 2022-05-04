export default function runApp() {
    fetch("https://jsonplaceholder.typicode.com/users")
		.then(function(response) {
				return response.json();
		}).then(function(results) {
			fetch("https://jsonplaceholder.typicode.com/posts")
				.then(function(response) {
					return response.json();
				}).then(function(posts) {
					//var userList = document.createElement("ul")
	
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
						// list of posts
						var list = document.createElement("ul");
						list.setAttribute("class", "posts");
						for (var j = 0; j < posts.length; j++) {
							if (posts[j].userId == (i+1)) {
								var node = document.createElement("li");
								node.setAttribute("class", "post");
								var text = document.createTextNode(posts[j].title);
								node.appendChild(text);
								list.appendChild(node);
							}
	
						}
						user.appendChild(list);
						// append to style div and then output
						styleDiv.appendChild(user);
						document.getElementById("output").appendChild(styleDiv);
					}

				})
		})
}
