/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 * 
 * Updated 2019.
 */

// import your own scripts here.

// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with 
// different datasets.
function initApp(apiUrl) {
	page_design();
	login_system(apiUrl);
	signup_system(apiUrl);
	load_feed(apiUrl);
}

function page_design() {
	// Navbar
	var navbar = document.createElement("div");
	document.getElementById("root").appendChild(navbar);
	navbar.setAttribute("class","topnav");
	navbar.setAttribute("id","mytopnav");
	// s/Seddit
	var sed = document.createElement("button");
    sed.setAttribute("data-id-login", "");
	sed.setAttribute("id","page_title");
	sed.setAttribute("class","header");
	navbar.appendChild(sed);
	var text = document.createTextNode("s/Seddit");
	sed.appendChild(text);
	// but_div
	var but_div = document.createElement("div");
	but_div.setAttribute("class","but_div");
	but_div.setAttribute("id","but_div");
	//but_div.setAttribute("align","right");
	navbar.appendChild(but_div);
	// Main body div
	var main_body = document.createElement("div");
	main_body.setAttribute("class", "main_body");
	document.getElementById("root").appendChild(main_body);
}

function login_system(apiUrl) {
	// Login button
	var login_button = document.createElement("button");
    login_button.setAttribute("data-id-login", "");
	login_button.setAttribute("id","login_button");
	login_button.setAttribute("class","button_style");
	login_button.setAttribute("align","right");
	document.getElementById("but_div").appendChild(login_button);
	var text = document.createTextNode("Login");
	login_button.appendChild(text);	
	// Username div in navbar 
	var logout_user = document.createElement("button");
	logout_user.setAttribute("id", "logout_user");
	logout_user.setAttribute("class","button_style");
	logout_user.setAttribute("align","right");
	document.getElementById("but_div").appendChild(logout_user);
	var text = document.createTextNode("Logout");
	logout_user.appendChild(text);	
	logout_user.style.display = "none";
	// Close button	
	var close = document.createElement("span");
	close.setAttribute("class","close");
	var text = document.createTextNode("x");
	close.appendChild(text);
	// Login window
	var login_window = document.createElement("div");
	login_window.setAttribute("class", "modal");
	login_window.setAttribute("id","login_window");
	login_window.style.display = "none";
	document.getElementById("root").appendChild(login_window);	
	// Login content	
	var login_content = document.createElement("div");
	login_content.setAttribute("class", "modal-content");
	login_window.appendChild(login_content);		
	login_content.appendChild(close);
	// title
	var title = document.createElement("h3");
	login_content.appendChild(title);
	var text = document.createTextNode("Login");
	title.appendChild(text);
	// username box
	var username = document.createElement("input");
	username.setAttribute("placeholder","username");
	username.setAttribute("id","login_user");
	login_content.appendChild(username);
	var br = document.createElement("br");
	login_content.appendChild(br);
	var br = document.createElement("br");
	login_content.appendChild(br);
	// password box
	var password = document.createElement("input");
	password.setAttribute("placeholder","password");
	password.setAttribute("id","login_pwd");
	password.setAttribute("type","password");
	login_content.appendChild(password);
	var br = document.createElement("br");
	login_content.appendChild(br);
	var br = document.createElement("br");
	login_content.appendChild(br);
	// Submit button
	var submit = document.createElement("button");
	submit.setAttribute("type","button");
	submit.setAttribute("class","button_style");
	login_content.appendChild(submit);
	var text = document.createTextNode("Submit");
	submit.appendChild(text);
	submit.addEventListener("click", function () {auth_login(username.value, password.value, apiUrl)});
	// Error message
	var br = document.createElement("br");
	login_content.appendChild(br);
	var error = document.createElement("p");
	error.setAttribute("id","login_error_msg");
	error.style.display = "none";
	login_content.appendChild(error);
	var text = document.createTextNode("Username or password is incorrect");
	error.appendChild(text);
	// Onclick functions
	login_button.onclick = function() {
		login_window.style.display = "block";
	}
	close.onclick = function() {
		login_window.style.display = "none";
		error.style.display = "none";
	}
	logout_user.onclick = function() {
		logout_user.style.display = "none";
		login_button.style.display = "inline-block";
		document.getElementById("signup_button").style.display = "inline-block";
		document.getElementById("page_title").removeChild(document.getElementById("page_title").childNodes[0]);	
		var text = document.createTextNode("s/Seddit");
		document.getElementById("page_title").appendChild(text);
		document.getElementById("profile_button").remove();
		document.getElementById("profile_window").remove();
		depop_feed();
		load_feed(apiUrl);
	}
}

function auth_login(user, pwd, URL) {
	const login_creds = {
		"method" : "POST",
		"headers" : {
			"Content-Type" : "application/json"
		},
		"body" : JSON.stringify({
			"username":user,
			"password":pwd
		})
	};
	fetch(URL+"/auth/login",login_creds).then(res=>res.json())
	.then(function (res) {
		if (res.token != null) {
			localStorage.setItem("token", res.token);
			var auth_token = localStorage.getItem("token");
			document.getElementById("login_error_msg").style.display = "none";
			document.getElementById("login_window").style.display = "none";
			document.getElementById("logout_user").style.display = "inline-block";			
			document.getElementById("login_button").style.display = "none";
			document.getElementById("signup_button").style.display = "none";
			// change s/username
			var user = document.getElementById("login_user").value;			
			var text = document.createTextNode("s/"+user);
			document.getElementById("page_title").appendChild(text);
			document.getElementById("page_title").removeChild(document.getElementById("page_title").childNodes[0]);
			// fetch user posts and profile
			load_user_feed(auth_token, URL);
			load_user_profile(URL);
		} else {
			document.getElementById("login_error_msg").style.display = "block";
		}
	});
}

function load_user_feed(token, URL) {
	const feed_creds = {
		"method" : "GET",
		"headers" : {
			"Content-Type" : "application/json",
			"Authorization" : "Token "+token
		},
	};
	fetch(URL+"/user/feed",feed_creds).then(res=>res.json())
	.then(function (res) {
		depop_feed(res);
		format_posts(res, URL);

	});
}

function load_user_profile(apiUrl) {
	// button
	var butt = document.createElement("button");
	butt.setAttribute("type","button");
	butt.setAttribute("class","button_style");
	butt.setAttribute("id","profile_button");
	document.getElementById("but_div").appendChild(butt);
	var text = document.createTextNode("Profile");
	butt.appendChild(text);
	// Close button	
	var close = document.createElement("span");
	close.setAttribute("class","close");
	var text = document.createTextNode("x");
	close.appendChild(text);
	// profile window
	var profile_window = document.createElement("div");
	profile_window.setAttribute("class", "modal");
	profile_window.setAttribute("id","profile_window");
	profile_window.style.display = "none";
	document.getElementById("root").appendChild(profile_window);	
	// profile content	
	var profile_content = document.createElement("div");
	profile_content.setAttribute("class", "modal-content");
	profile_window.appendChild(profile_content);		
	profile_content.appendChild(close);
	// title
	var title = document.createElement("h3");
	profile_content.appendChild(title);
	var text = document.createTextNode("Profile");
	title.appendChild(text);
	butt.addEventListener("click",function () {profile_window.style.display = "block";});
	close.addEventListener("click",function () {profile_window.style.display = "none";});

	// fetch for user info and populate username, number of posts, number of upvotes
	var auth_token = localStorage.getItem("token");
	const user_creds = {
		"method" : "GET",
		"headers" : {
			"Content-Type" : "application/json",
			"Authorization" : "Token "+auth_token,
		},
	};
	fetch(apiUrl+"/user",user_creds).then(res=>res.json())
	.then(function (res) {
		// username
		var username = document.createElement("div");
		profile_content.appendChild(username);
		var text = document.createTextNode("username: "+res.username);
		username.appendChild(text);
		//email
		var email = document.createElement("div");
		profile_content.appendChild(email);
		var text = document.createTextNode("email: "+res.email);
		email.appendChild(text);
		//num post
		var num_post = document.createElement("div");
		profile_content.appendChild(num_post);
		var text = document.createTextNode("number of posts: "+res.posts.length);
		num_post.appendChild(text);
		// num upvotes
		var num_votes = document.createElement("div");
		profile_content.appendChild(num_votes);
		var text = document.createTextNode("total upvotes: ");
		num_votes.appendChild(text);
		var count = 0;
		var text = document.createTextNode(count);
		num_votes.appendChild(text);
		// count upvotes
		for (var i = 0; i < res.posts.length; i++) {
			const post_creds = {
				"method" : "GET",
				"headers" : {
					"Content-Type" : "application/json",
					"Authorization" : "Token "+auth_token,
				},
			};
			fetch(apiUrl+"/post?id="+res.posts[i],user_creds).then(r=>r.json())
			.then(function (r) {
				var new_count = +num_votes.childNodes[1].data + +r.meta.upvotes.length;	
				num_votes.removeChild(num_votes.childNodes[1]);
				var text = document.createTextNode(new_count);
				num_votes.appendChild(text);
			})
		}
	})
	
	
	

}

function signup_system(apiUrl) {
	// Registration button
	var rego_button = document.createElement("button");
	rego_button.setAttribute("type","button");
    rego_button.setAttribute("data-id-signup", "");
	rego_button.setAttribute("id","signup_button");
	rego_button.setAttribute("class","button_style");
	rego_button.setAttribute("align","right");
	document.getElementById("but_div").appendChild(rego_button);	
	var text = document.createTextNode("Sign Up");
	rego_button.appendChild(text);	
	// Close button	
	var close = document.createElement("span");
	close.setAttribute("class","close");
	var text = document.createTextNode("x");
	close.appendChild(text);
	// Rego window
	var rego_window = document.createElement("div");
	rego_window.setAttribute("class", "modal");
	rego_window.setAttribute("id","rego_window");
	rego_window.style.display = "none";
	document.getElementById("root").appendChild(rego_window);	
	// Rego content	
	var rego_content = document.createElement("form");
	rego_content.setAttribute("class", "modal-content");
	rego_window.appendChild(rego_content);		
	rego_content.appendChild(close);
	// title
	var title = document.createElement("h3");
	rego_content.appendChild(title);
	var text = document.createTextNode("Register");
	title.appendChild(text);
	// name box
	var new_name = document.createElement("input");
	new_name.setAttribute("placeholder","name");
	new_name.setAttribute("id","name_value");
	rego_content.appendChild(new_name);
	var br = document.createElement("br");
	rego_content.appendChild(br);
	var br = document.createElement("br");
	rego_content.appendChild(br);
	// email box
	var email = document.createElement("input");
	email.setAttribute("placeholder","email");
	email.setAttribute("id","email_value");
	rego_content.appendChild(email);
	var br = document.createElement("br");
	rego_content.appendChild(br);
	var br = document.createElement("br");
	rego_content.appendChild(br);
	// username box
	var username = document.createElement("input");
	username.setAttribute("placeholder","username");
	username.setAttribute("id","username_value");
	rego_content.appendChild(username);
	var br = document.createElement("br");
	rego_content.appendChild(br);
	var br = document.createElement("br");
	rego_content.appendChild(br);
	// password box
	var password = document.createElement("input");	
	password.setAttribute("placeholder","password");
	password.setAttribute("id","pwd_value");
	password.setAttribute("type","password");
	rego_content.appendChild(password);
	var br = document.createElement("br");
	rego_content.appendChild(br);
	var br = document.createElement("br");
	rego_content.appendChild(br);
	// Submit button
	var submit = document.createElement("button");
	submit.setAttribute("class","button_style");
	submit.setAttribute("type","button");
	rego_content.appendChild(submit);
	var text = document.createTextNode("Submit");
	submit.appendChild(text);	
	submit.addEventListener("click", function () {auth_signup(new_name.value, email.value, username.value, password.value, apiUrl)});
	// Error message
	var br = document.createElement("br");
	rego_content.appendChild(br);
	var error = document.createElement("p");
	error.setAttribute("id","signup_error_msg");
	error.style.display = "none";
	rego_content.appendChild(error);
	var text = document.createTextNode("Attempt failed.");
	error.appendChild(text);
	// Onclick functions
	rego_button.onclick = function() {
		rego_window.style.display = "block";
	}
	close.onclick = function() {
		rego_window.style.display = "none";
		error.style.display = "none";
	}
} 

function auth_signup(nam, email, user, pwd, URL) {
	const signup_creds = {
		"method" : "POST",
		"headers" : {
			"Content-Type" : "application/json"
		},
		"body" : JSON.stringify({
			"username":user,
			"password":pwd,
			"email":email,
			"name":nam
		})
	};
	fetch(URL+"/auth/signup",signup_creds).then(res=>res.json())
	.then(function (res) {
		if (document.getElementById("pwd_value").value == "") { //no password
			var msg = document.getElementById("signup_error_msg");
			msg.removeChild(msg.childNodes[0]);
			var text = document.createTextNode("Please enter a password");
			msg.appendChild(text);		
			msg.style.display = "block";	
		} else if (document.getElementById("email_value").value == "") { // no email
			var msg = document.getElementById("signup_error_msg");
			msg.removeChild(msg.childNodes[0]);
			var text = document.createTextNode("Please enter an email");
			msg.appendChild(text);
			msg.style.display = "block";
		} else if (document.getElementById("name_value").value == "") { // no name
			var msg = document.getElementById("signup_error_msg");
			msg.removeChild(msg.childNodes[0]);
			var text = document.createTextNode("Please enter your name");
			msg.appendChild(text);
			msg.style.display = "block";
		} else if (document.getElementById("username_value").value == "") { // no username 
			var msg = document.getElementById("signup_error_msg");
			msg.removeChild(msg.childNodes[0]);
			var text = document.createTextNode("Please enter a username");
			msg.appendChild(text);
			msg.style.display = "block";
		} else if (res.token != null) { // success
			var msg = document.getElementById("signup_error_msg");
			msg.removeChild(msg.childNodes[0]);
			var text = document.createTextNode("Success");
			msg.appendChild(text);
			msg.style.display = "block";
		} else { // username taken
			var msg = document.getElementById("signup_error_msg");
			msg.removeChild(msg.childNodes[0]);
			var text = document.createTextNode("Username Taken");
			msg.appendChild(text);
			msg.style.display = "block";
			
		}
	})

}

function load_feed(apiUrl) {
	// Create feed for posts
	var feed_div = document.createElement("div");
	feed_div.setAttribute("class", "feed_body");
	document.getElementById("root").appendChild(feed_div);
	// feed, unordered list
	var feed = document.createElement("ul");
	feed.setAttribute("id", "feed");
	feed_div.appendChild(feed);

	// Load posts from data
	fetch("data/feed.json",{credentials: 'include'}).then(r=>r.json()).then(r=>format_posts(r,apiUrl));
}

function format_posts(response, apiUrl) {
	// sort posts by date
	response.posts.sort(function(a, b){
    return b.meta.published-a.meta.published
	})
	
	for (var i = 0; i < response.posts.length; i++) {
		// New post		
		var new_post = document.createElement("li");
		new_post.setAttribute("id",response.posts[i].id);
		new_post.setAttribute("data-id-post", "");
		new_post.setAttribute("class","post");
		document.getElementById("feed").appendChild(new_post);
		// Add title
		var title = document.createElement("div");
		title.setAttribute("id","title"+response.posts[i].id);
		title.setAttribute("data-id-title","");
		title.setAttribute("class","title");
		new_post.appendChild(title);
		var text = document.createTextNode(response.posts[i].title);
		title.appendChild(text);
		// check if user is logged in, if so add icon
		var page_title = document.getElementById("page_title").childNodes[0].data;
		if (page_title != "s/Seddit") {
			add_upvote(response.posts[i], new_post.id ,apiUrl);
		}
		// Add subseddit
		var subseddit = document.createElement("p");
		subseddit.setAttribute("id","subseddit");
		new_post.appendChild(subseddit);
		var text = document.createTextNode("s/"+response.posts[i].meta.subseddit);
		subseddit.setAttribute("class","subseddit");
		subseddit.appendChild(text);
		// Content
		var content = document.createElement("div");
		new_post.appendChild(content);
		content.setAttribute("class","post_content");
		// Add text
		var post_text = document.createElement("div");
		post_text.setAttribute("id","text");	
		post_text.setAttribute("class","post_text");	
		content.appendChild(post_text);
		var text = document.createTextNode(response.posts[i].text);
		post_text.appendChild(text);
		// Add picture
		if (response.posts[i].image != null) {
			var image = document.createElement("img");
			image.setAttribute("class","image");
			image.setAttribute("src","data:image/png;base64,"+response.posts[i].image);
			content.appendChild(image);
		}
		// Add date
		var dateObj = new Date(response.posts[i].meta.published * 1000); 
		var utcString = dateObj.toUTCString(); 
		var time = utcString.slice(0, -4); 		
		var date = document.createElement("p");
		date.setAttribute("id","date");
		date.setAttribute("class","time");
		new_post.appendChild(date);
		var text = document.createTextNode(time);
		date.appendChild(text);
		// div for comments, upvotes, author
		var info = document.createElement("div");
		info.setAttribute("class","info");
		new_post.appendChild(info);
		// Count and show number of upvotes	
		var num_votes = document.createElement("button");
		num_votes.setAttribute("type","button");
		num_votes.setAttribute("id","num_votes"+response.posts[i].id);
		num_votes.setAttribute("class","num_votes");
		num_votes.addEventListener("click", function () {click_votes(response, apiUrl, this.id)});
		info.appendChild(num_votes);
		var text = document.createTextNode(response.posts[i].meta.upvotes.length+" upvotes");
		num_votes.appendChild(text);	
		// Count and show number of comments
		var num_comments = document.createElement("button");
		num_comments.setAttribute("type","button");
		num_comments.setAttribute("id","num_comments"+response.posts[i].id);
		num_comments.setAttribute("class","num_comments");
		info.appendChild(num_comments);
		var text = document.createTextNode(response.posts[i].comments.length+" comments");
		num_comments.appendChild(text);	
		// Add author
		var author = document.createElement("p");
		author.setAttribute("id","author");
		author.setAttribute("class","author");
		author.setAttribute("data-id-author","");
		info.appendChild(author);
		var text = document.createTextNode("written by: "+response.posts[i].meta.author);
		author.appendChild(text);
		// UPVOTE CONTENT
		// Close button	
		var up_close = document.createElement("span");
		up_close.setAttribute("class","close");
		up_close.setAttribute("id","up_close"+response.posts[i].id);
		var text = document.createTextNode("x");
		up_close.appendChild(text);
		// Upvote window
		var upvote_window = document.createElement("div");
		upvote_window.setAttribute("class", "modal");
		upvote_window.setAttribute("id","upvote_window"+response.posts[i].id);
		upvote_window.style.display = "none";
		new_post.appendChild(upvote_window);
		up_close.addEventListener("click", function () {close_upvotes(this.id)});
		// Upvote content	
		var upvote_content = document.createElement("form");
		upvote_content.setAttribute("class", "modal-content");
		upvote_content.setAttribute("id","upvote_content"+response.posts[i].id);
		upvote_window.appendChild(upvote_content);		
		upvote_content.appendChild(up_close);
		// not logged in message
		var msg = document.createElement("p");
		msg.setAttribute("id","upvote_error"+response.posts[i].id);
		upvote_content.appendChild(msg);
		var text = document.createTextNode("You must be logged in to see users who upvoted.");
		msg.appendChild(text);
		msg.style.display = "none";
		// div for upvoters
		var up = document.createElement("div");
		up.setAttribute("id","upvote_div"+response.posts[i].id);
		upvote_content.appendChild(up);
		var up_title = document.createElement("h3");
		up.appendChild(up_title);
		var text = document.createTextNode("Upvoters:");
		up_title.appendChild(text);
		// COMMENT CONTENT sort first
		response.posts[i].comments.sort(function(a, b){
			return b.published-a.published
		})
		// Close button	
		var com_close = document.createElement("span");
		com_close.setAttribute("class","close");
		com_close.setAttribute("id","com_close"+response.posts[i].id);
		var text = document.createTextNode("x");
		com_close.appendChild(text);
		// Comment window
		var comment_window = document.createElement("div");
		comment_window.setAttribute("class", "modal");
		comment_window.setAttribute("id","comment_window"+response.posts[i].id);
		comment_window.style.display = "none";
		new_post.appendChild(comment_window);	
		// Comment content	
		var comment_content = document.createElement("div");
		comment_content.setAttribute("class", "modal-content");
		comment_window.appendChild(comment_content);
		comment_content.appendChild(com_close);		
		// not logged in message
		var com_msg = document.createElement("p");
		com_msg.setAttribute("id","comment_error"+response.posts[i].id);
		comment_content.appendChild(com_msg);
		var text = document.createTextNode("You must be logged in to see comments.");
		com_msg.appendChild(text);
		com_msg.style.display = "none";
		// div for comments
		var com_div = document.createElement("div");
		com_div.setAttribute("id","comment_div"+response.posts[i].id);
		com_div.setAttribute("class", "com_div");
		comment_content.appendChild(com_div);
		// list for comment
		var com = document.createElement("ul");
		com_div.appendChild(com);
		// populate comments
		for (var m = 0; m < response.posts[i].comments.length; m++) {
			var comment = document.createElement("li");
			comment.setAttribute("class","comment");
			com.appendChild(comment);
			//com		
			var content = document.createElement("p");
			comment.appendChild(content);
			var text = document.createTextNode(response.posts[i].comments[m].comment);
			content.appendChild(text);
			// info div
			var com_info = document.createElement("div");
			comment.appendChild(com_info);
			com_info.setAttribute("class","info");
			//author			
			var writer = document.createElement("p");
			com_info.appendChild(writer);
			writer.setAttribute("class","writer");
			var text = document.createTextNode("- "+response.posts[i].comments[m].author);
			writer.appendChild(text);
			//published	
			var dateObj = new Date(response.posts[i].comments[m].published * 1000); 
			var utcString = dateObj.toUTCString(); 
			var time = utcString.slice(0, -4);
			var com_time = document.createElement("p");	
			com_time.setAttribute("class","com_time");
			com_info.appendChild(com_time);
			var text = document.createTextNode(", "+time);
			com_time.appendChild(text);
		}
		// Onlick functions		
		com_close.onclick = function() {
			//document.getElementById("comment_window").style.display = "none";
			document.getElementById("comment_window"+this.id.replace("com_close","")).style.display = "none";
		}	
		num_comments.onclick = function() {
			document.getElementById("comment_window"+this.id.replace("num_comments","")).style.display = "block";
			var title = document.getElementById("page_title").childNodes[0].data;
			if (title == "s/Seddit") {
				document.getElementById("comment_error"+this.id.replace("num_comments","")).style.display = "block";
				document.getElementById("comment_div"+this.id.replace("num_comments","")).style.display = "none";
			} else {
				document.getElementById("comment_error"+this.id.replace("num_comments","")).style.display = "none";
				document.getElementById("comment_div"+this.id.replace("num_comments","")).style.display = "block";
			}
		}
	}
}

function add_upvote(post, new_post, apiUrl) {
	// check if logged in user has upvoted post
	var auth_token = localStorage.getItem("token");
	const log_creds = {
		"method" : "GET",
		"headers" : {
			"Content-Type" : "application/json",
			"Authorization" : "Token "+auth_token,
		},
	};
	fetch(apiUrl+"/user",log_creds).then(res=>res.json())
	.then(function (res) {
		var flag = 0;
		for (var n = 0; n < post.meta.upvotes.length; n++) {
			if (post.meta.upvotes[n] == res.id) {
				flag = 1;
			}
		}
		if (flag == 1) {
			var icon_div = document.createElement("div");
			document.getElementById("title"+new_post).appendChild(icon_div);
			var icon = document.createElement("i");
			icon.setAttribute("id","icon"+post.id);
			icon.setAttribute("class","material-icons");
			var text = document.createTextNode("favorite");
			icon.appendChild(text);
			icon_div.appendChild(icon);
		} else {
			var icon_div = document.createElement("div");
			document.getElementById("title"+new_post).appendChild(icon_div);
			var icon = document.createElement("i");
			icon.setAttribute("id","icon"+post.id);
			icon.setAttribute("class","material-icons");
			var text = document.createTextNode("favorite_border");
			icon.appendChild(text);
			icon_div.appendChild(icon);
		}
		// onlick fucntion
		document.getElementById("icon"+post.id).onclick = function() {
			var icon = document.getElementById("icon"+post.id);
			if (icon.childNodes[0].data == "favorite_border"); {
				// need to put a like and change icon filled byt deleting
				var auth_token = localStorage.getItem("token");
				const empty_creds = {
					"method" : "PUT",
					"headers" : {
						"Content-Type" : "application/json",
						"Authorization" : "Token "+auth_token,
					},
				};
				fetch(apiUrl+"/post/vote?id="+post.id,empty_creds).then(res=>res.json())
				.then(function (res) {
					if (res.message == "success") {
						//change icon, delete first
						icon.removeChild(icon.childNodes[0]);
						var text = document.createTextNode("favorite");
						icon.appendChild(text);
					}
				})
			}
			if (icon.childNodes[0].data == "favorite"); {
				// need to put a like and change icon filled byt deleting
				var auth_token = localStorage.getItem("token");
				const filled_creds = {
					"method" : "DELETE",
					"headers" : {
						"Content-Type" : "application/json",
						"Authorization" : "Token "+auth_token,
					},
				};
				fetch(apiUrl+"/post/vote?id="+post.id,filled_creds).then(res=>res.json())
				.then(function (res) {
					if (res.message == "success") {
						//change icon, delete first
						icon.removeChild(icon.childNodes[0]);
						var text = document.createTextNode("favorite_border");
						icon.appendChild(text);
					}
				})
			}
		}

	})
}

function close_upvotes(id) {
	id = id.replace("up_close","");
	var window = document.getElementById("upvote_window"+id);
	window.style.display = "none";
	for (var i = window.childNodes[0].childNodes[2].childNodes.length-1; i > 0; i--) {
		window.childNodes[0].childNodes[2].removeChild(window.childNodes[0].childNodes[2].childNodes[i]);
	}
}

function click_votes(response, apiUrl, id) {
	id = id.replace("num_votes","");
	for (var k = 0; k < response.posts.length; k++) {
		if (response.posts[k].id == id) {
			var i = k;
		}
	}

	document.getElementById("upvote_window"+id).style.display = "block";
	var title = document.getElementById("page_title").childNodes[0].data;
	if (title == "s/Seddit") {
		document.getElementById("upvote_error"+id).style.display = "block";
		document.getElementById("upvote_div"+id).style.display = "none";
	} else { //logged in
		document.getElementById("upvote_error"+id).style.display = "none";
		document.getElementById("upvote_div"+id).style.display = "block";
		// loop through each upvote and add to div
		for (var j = 0; j < response.posts[i].meta.upvotes.length; j++) {
			// fetch for user info
			var auth_token = localStorage.getItem("token");
			var fetch_id = response.posts[i].meta.upvotes[j];
			const user_creds = {
				"method" : "GET",
				"headers" : {
					"Content-Type" : "application/json",
					"Authorization" : "Token "+auth_token,
				},
			};
			fetch(apiUrl+"/user?id="+fetch_id,user_creds).then(res=>res.json())
			.then(function (res) {
				var vote = document.createElement("p");
				vote.setAttribute("id","vote_text"+id);
				document.getElementById("upvote_div"+id).appendChild(vote);
				var text = document.createTextNode(res.username);
				vote.appendChild(text);
			})
		}
	}
}

function depop_feed() {
	var feed = document.getElementById("feed");
	var child = feed.lastElementChild;  
    while (child) { 
    	feed.removeChild(child); 
    	child = feed.lastElementChild;
	}
}

export default initApp;
