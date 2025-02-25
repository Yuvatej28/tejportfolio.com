let theme = localStorage.getItem('theme');

if(theme == null){
	setTheme('light')
}else{
	setTheme(theme)
}

let themeDots = document.getElementsByClassName('theme-dot')


for (var i=0; themeDots.length > i; i++){
	themeDots[i].addEventListener('click', function(){
		let mode = this.dataset.mode;
		setTheme(mode)
	})
}

function setTheme(mode){
	if(mode == 'light'){
		document.getElementById('theme-style').href = 'default.css'
	}

	if(mode == 'blue'){
		document.getElementById('theme-style').href = 'blue.css'
	}

	if(mode == 'green'){
		document.getElementById('theme-style').href = 'green.css'
	}

	if(mode == 'purple'){
		document.getElementById('theme-style').href = 'purple.css'
	}

	localStorage.setItem('theme', mode)
}

let currentPost = 0;
const posts = [
		{
				title: "Talk and guess the number",
				intro: "You can interact with your voice",
				image: "images/Speech.jpeg",
				link: "post.html"
		},
		{
				title: "Micro Posts",
				intro: "GIT projects with a json server",
				image: "images/MICROpOSTS HOME PAGE.jpeg",
				link: "post2.html"
		},
		{
			title: "Library - Add Your books",
			intro: "All the book you want you can add it here",
			image: "images/Library home page.jpeg",
			link: "post3.html"
	},{
		title: "Hangman Game - Guess the word!",
		intro: "Guess the word before the stick figure is fully formed",
		image: "images/Hangman.jpg",
		link: "post4.html"
},{
	title: "Todo-list - The best todo list you will ever use",
	intro: "Store all your tasks activities anything you want!!",
	image: "images/Todo.jpg",
	link: "post5.html"
},
{
	title: "Movie Informations - Trending movies and every movies ever",
	intro: "See any of your movies you want!!",
	image: "images/movie1.jpg",
	link: "post6.html"
}
];

function initializePosts() {
		const postWrapper = document.getElementById("postWrapper");

		posts.forEach((post, index) => {
				const postDiv = document.createElement("div");
				postDiv.className = "post";
				postDiv.style.display = index === 0 ? "block" : "none"; // Show the first post initially

				postDiv.innerHTML = `
						<div class="post">
								<img class="thumbnail" src="${post.image}">
								<div class="post-preview">
										<h6 class="post-title">${post.title}</h6>
										<p class="post-intro">${post.intro}</p>
										<a class="a" href="${post.link}">Read More</a>
								</div>
						</div>
				`;

				postWrapper.appendChild(postDiv);
		});
}

function showNextPost() {
		if (currentPost < posts.length - 1) {
				togglePostVisibility(currentPost, "none");
				currentPost++;
				togglePostVisibility(currentPost, "block");
		}
}

function showPreviousPost() {
		if (currentPost > 0) {
				togglePostVisibility(currentPost, "none");
				currentPost--;
				togglePostVisibility(currentPost, "block");
		}
}

function togglePostVisibility(index, displayValue) {
		const postWrapper = document.getElementById("postWrapper");
		const postDiv = postWrapper.children[index];
		postDiv.style.display = displayValue;
}

initializePosts(); 
