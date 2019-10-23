window.addEventListener('resize', displayDate);

function displayDate() {
	document.querySelector('#demo').innerHTML = new Date();
}
