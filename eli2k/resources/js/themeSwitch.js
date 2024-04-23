const themeSwitch = document.querySelector('.theme-switch');
const pageImage = document.querySelector('.pageContent h1');
const header = document.querySelector('#header');
themeSwitch.checked = localStorage.getItem('switchedTheme') === 'true';
themeSwitch.addEventListener('change', function(e) {
	if(e.currentTarget.checked === true) {
		// Add item to localstorage
		localStorage.setItem('switchedTheme', 'true');
		header.style.backgroundImage = "url('https://eli2k.com/resources/images/space_animation_05-light.gif')";
		pageImage.style.backgroundImage = "url('https://eli2k.com/resources/images/computer_73-light.gif')";
	} else {
		// Remove item if theme is switched back to normal
		localStorage.removeItem('switchedTheme');
		header.style.backgroundImage = "url('https://eli2k.com/resources/images/space_animation_05.gif')";
		pageImage.style.backgroundImage = "url('https://eli2k.com/resources/images/computer_73.gif')";
	}
});