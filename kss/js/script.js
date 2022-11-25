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
					let elemPos = element.getBoundingClientRect().top - window.innerHeight / 1.75;
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
document.addEventListener('DOMContentLoaded', function() {
	const tabs = document.querySelectorAll('.tabs__tabs');
if (tabs.length) {
	for (let index = 0; index < tabs.length; index++) {
		const element = tabs[index];
		const items = element.querySelectorAll('.tabs__item');
		let idInterval = setSlidesInterval(element);
		for (let index = 0; index < items.length; index++) {
			const elementChild = items[index];
			const button = elementChild.querySelector('.tabs__item-button');
			button.addEventListener('click', function() {
				clearInterval(idInterval);
				idInterval = setSlidesInterval(element);
				for (let index = 0; index < items.length; index++) {
					const elementChild = items[index];
					elementChild.classList.remove('_active');
				}
				elementChild.classList.add('_active');
			})
		}
	}
}
function setSlidesInterval(element) {
	let idInterval = setInterval(function changeSlide() {
		const currentElem = element.querySelector('.tabs__item._active');
		currentElem.classList.remove('_active');
		const nextElem = currentElem.nextElementSibling;
		if (nextElem) {
			nextElem.classList.add('_active');
		} else {
			element.querySelector('.tabs__item').classList.add('_active');
		}
	}, 7000);
	return idInterval;
}
})