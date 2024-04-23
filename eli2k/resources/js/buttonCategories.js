// functionality:
// display a list of buttons which are tags at the top
// below the tags, display list of posts and blurbs in div
// when a tag is clicked, hide the posts and blurbs in the div and only display entry links which have a class that matches the tag

const tags = document.querySelectorAll('#tags > button');
const blurbs = document.querySelectorAll('#blurbs > div');
const posts = document.querySelectorAll('#posts > div');
const displayAll = document.getElementById('all');
console.log(posts.length, blurbs.length);

displayAll.addEventListener('click', event => {
	for(let i = 0; i < posts.length; i++) {
		posts[i].style.display = "block";
	}
	for(let i = 0; i < blurbs.length; i++) {
		blurbs[i].style.display = "block";
	}
});

for(let i = 0; i < tags.length; i++) {
	// when a tag button is clicked...
	tags[i].addEventListener('click', event => {
		// identify which classes belong to button
		const buttonTag = tags[i].getAttribute('class');
		// loop through post tags
		for(let j = 0; j < posts.length; j++) {
			// get post tags
			const postTag = posts[j].getAttribute('class');
			// if the "all" button is clicked, display everything
			if(buttonTag === 'all') {
				posts[j].style.display = 'block';
			}
			// if the post tag matches the button tag...
			else if(postTag === buttonTag) {
				// display posts
				posts[j].style.display = "block";
			}
			// if the post tag does not match the button tag...
			else {
				// hide the other posts
				posts[j].style.display = "none";
			}
		}
		// loop through blurb tags
		for(let k = 0; k < blurbs.length; k++) {
			// get blurb tags
			const blurbTag = blurbs[k].getAttribute('class');
			// if the "all" button is clicked, display everything
			if(buttonTag === 'all') {
				blurbs[k].style.display = 'block';
			}
			// if the blurb tag matches the button tag...
			else if(blurbTag === buttonTag) {
				// display blurbs
				blurbs[k].style.display = "block";
			}
			// if the blurb tag does not match the button tag...
			else {
				// hide the other blurbs
				blurbs[k].style.display = "none";
			}
		}
	});
}