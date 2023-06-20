document.addEventListener('DOMContentLoaded', function () {
	let animateItems = document.querySelectorAll("[class*='animate-']");
	let animateItemsArray = Array.prototype.slice.call(animateItems);
	let locked = false;
	if (animateItemsArray.length > 0) {
		window.addEventListener('scroll', animations);
		function animations() {
			if (locked) return;
			locked = true;
			setTimeout(() => {
				for (let index = 0; index < animateItemsArray.length; index++) {
					let element = animateItemsArray[index];
					let elemPos = element.getBoundingClientRect().top - window.innerHeight / 1.5;
					if (elemPos <= 0) {
						element.classList.add('_active');
						animateItemsArray.splice(index, 1);
						index = index - 1;
					}
				}
				if (animateItemsArray == 0) {
					window.removeEventListener('scroll', animations);
				}
				locked = false;
			}, 100)
		}
	}
});