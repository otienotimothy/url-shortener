/**Integrate the shrtcode API */

async function shortenLink(url) {
	const userLink = `https://api.shrtco.de/v2/shorten?url=${url}`;

    try {
		let res = await fetch(userLink);
		res = await res.json();
		let shortUrl = res.result.full_short_link
		console.log(res);
		insertLinks(url,shortUrl);
	} catch (error) {
		console.log(error)
	}
}

// shortenLink(
// 	"https://www.google.com/search?q=really+long+url&oq=really+long+url&aqs=chrome..69i57j0i512l2.8071j1j7&sourceid=chrome&ie=UTF-8"
// );

/** Insert Shortened Links to the Page */

function insertLinks(longLink, shortLink) {
	let linkContainer = document.createElement("div");
	linkContainer.setAttribute('class', 'short-link-container')
	let userLink = document.createElement("p");
	let shortenedLink = document.createElement("p");
	let button = document.createElement("button");

	
	userLink.innerHTML = longLink;
	shortenedLink.innerHTML = shortLink;
	button.innerHTML = 'Copy';

	const elements = [userLink, shortenedLink, button];

	for (let i = 0; i < elements.length; i++) {
		linkContainer.appendChild(elements[i]);
	}

	let section = document.querySelector(".main-shortener");
	section.insertBefore(
		linkContainer,
		document.querySelector(".advanced-statistics")
	);
}

/** Listen to Form Submit Event */

let form = document.querySelector('.shortener-form');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	let inputUrl = document.querySelector('#url').value;
	console.log(inputUrl);
	shortenLink(inputUrl)
	// reset input elements
	form.reset()
})
