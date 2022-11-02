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
document.addEventListener('DOMContentLoaded', function() {
	const aboutSlider = document.querySelector('.about .swiper');
	if (aboutSlider) {
		const swiperAboutSlides = aboutSlider.querySelectorAll('.about__item');
		if (swiperAboutSlides.length > 1) {
			const swiper = new Swiper(aboutSlider, {
				loop: true,
				spaceBetween: 0,
				slidesPerView: 1,
				centeredSlides: true,
				effect: 'fade',
				fadeEffect: {
					crossFade: true
				},
				pagination: {
					enabled: true,
					el: '.swiper-pagination',
					clickable: true,
				},
				navigation: {
					enabled: false,
					nextEl: '.arrow-right',
					prevEl: '.arrow-left',
				},
				autoplay: {
					delay: 7000,
					disableOnInteraction: false,
				},
				breakpoints: {
					1024: {
						pagination: {
							enabled: false,
						},
						navigation: {
							enabled: true,
						}
					},
				}
			})
		} else {
			aboutSlider.classList.add('_inactive');
		}
	}
	const testBlock = document.querySelector('.test');
	if (testBlock) {
		const swiperTest = new Swiper('.test .swiper', {
			loop: true,
			spaceBetween: 0,
			slidesPerView: 1,
			centeredSlides: true,
			autoplay: {
				delay: 8000,
				disableOnInteraction: false,
			},
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			pagination: {
				enabled: true,
				clickable: true,
				el: '.test__pagination',
			},
			navigation: {
				enabled: false,
			},
			breakpoints: {
				1024: {
					pagination: {
						enabled: true,
					},
				},
			}
		})
		swiperTest.autoplay.stop();
		let pos = testBlock.getBoundingClientRect().top;
		window.addEventListener('scroll', checkPos);
		function checkPos() {
			pos = testBlock.getBoundingClientRect().top - window.innerHeight / 1.5;
			if (pos <= 0) {
				testBlock.classList.add('_active');
				swiperTest.autoplay.start();
				window.removeEventListener('scroll', checkPos);
			}
		}
	}
	const swiperPartners = new Swiper('.partners .swiper', {
		loop: true,
		spaceBetween: 0,
		slidesPerView: 'auto',
		height: 70,
		freeMode: true,
		centeredSlides: true,
		loopedSlidesLimit: false,
		speed: 10000,
		spaceBetween: 50,
		autoplay: {
			delay: 1,
			pauseOnMouseEnter: true,
			disableOnInteraction: false,
		},
		pagination: {
			enabled: false,
		},
		navigation: {
			enabled: false,
		},
		breakpoints: {
			768: {
				spaceBetween: 120,
			},
		}
	})
	const swiperReviews = new Swiper('.reviews .swiper', {
		loop: true,
		slidesPerView: 1,
		centeredSlides: true,
		pagination: {
			enabled: true,
			el: '.swiper-pagination',
		},
		navigation: {
			enabled: false,
			nextEl: '.arrow-right',
			prevEl: '.arrow-left',
		},
		breakpoints: {
			1024: {
				spaceBetween: 110,
				pagination: {
					enabled: false,
				},
				navigation: {
					enabled: true,
				}
			},
		}
	})
})
document.addEventListener('DOMContentLoaded', function() {
	const header = document.querySelector('.header');
	if (header) {
		if (window.pageYOffset > 10) {
			header.classList.add('_active');
		}
		window.addEventListener('scroll', function() {
			let currentPos2 = window.pageYOffset;
			if (currentPos2 > 10) {
				header.classList.add('_active');
			} else {
				header.classList.remove('_active');
			}
		})
	}
	const burger = document.querySelector('.header__burger');
	const menu = document.querySelector('.header__menu');
	if (burger && menu) {
		let currentPos;
		burger.addEventListener('click', function() {
			if (this.classList.contains('_active')) {
				this.classList.remove('_active');
				menu.classList.remove('_active');
				document.body.classList.remove('lock');
				header.classList.remove('burger_active');
				window.scrollTo(0, currentPos);
			} else {
				currentPos = window.pageYOffset;
				document.body.classList.add('lock');
				this.classList.add('_active');
				menu.classList.add('_active');
				header.classList.add('burger_active');
			}
			
		})
	}
})
document.addEventListener('DOMContentLoaded', function() {
	const accordions = document.querySelectorAll('.accordion');
	if (accordions.length > 0) {
		for (let index = 0; index < accordions.length; index++) {
			const element = accordions[index];
			const items = element.querySelectorAll('.accordion__item');
			for (let index = 0; index < items.length; index++) {
				const elementItem = items[index];
				const elementMain = elementItem.querySelector('.accordion__main-head');
				elementMain.addEventListener('click', function() {
					if (!elementItem.classList.contains('_active')) {
						if (element.classList.contains('_close-all')) {
							for (let index = 0; index < items.length; index++) {
								const elementItem = items[index];
								elementItem.classList.remove('_active');
							}
						}
						elementItem.classList.add('_active');
					} else if (!element.classList.contains('videos__accordion')) {
						elementItem.classList.remove('_active');
					}
				})
			}
		}
		
	}
})
document.addEventListener('DOMContentLoaded', function() {
	const buttonTop = document.querySelector('.btn-top');
	if (buttonTop) {
		buttonTop.addEventListener('click', function() {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth',
			});
		})
		let currentScroll = window.pageYOffset;
		if (currentScroll> 600) {
			buttonTop.classList.add('_visible');
		}
		window.addEventListener('scroll', function() {
			currentScroll = window.pageYOffset;
			if (currentScroll > 600) {
				buttonTop.classList.add('_visible');
			}
			else {
				buttonTop.classList.remove('_visible');
			}
		})
	}
})
document.addEventListener('DOMContentLoaded', function() {
	const itemsContainer = document.querySelectorAll('.licenses__items');
	if (itemsContainer.length) {
		for (let index = 0; index < itemsContainer.length; index++) {
			const element = itemsContainer[index];
			if (window.innerWidth >= 1024) {
				const itemsHoverElem = element.querySelector('.licenses__characters-hover');
				const item = element.querySelectorAll('.licenses__characters-item');
				for (let index = 0; index < item.length; index++) {
					const element = item[index];
					element.addEventListener('mouseenter', function() {
						const top = element.offsetTop;
						const height = element.clientHeight;
						itemsHoverElem.style.height = height + 20 + 'px';
						itemsHoverElem.style.top = top - 10 + 'px';
						itemsHoverElem.style.opacity = '1';
					})
				}
			}
			const items = element.querySelectorAll('.licenses__item');
			for (let index = 0; index < items.length; index++) {
				const element = items[index];
				const button = element.querySelector('.licenses__more');
				const characters = element.querySelector('.licenses__characters');
				button.addEventListener('click', function() {
					if (this.classList.contains('_active')) {
						this.classList.remove('_active');
						this.querySelector('.button-with-arrow__text').textContent = 'Подробнее';
						characters.classList.remove('_active');
						window.scrollTo({
							top: element.offsetTop - 100,
						});
					} else {
						//window.scrollTo({
						//	top: this.offsetTop - 200,
						//});
						this.classList.add('_active');
						this.querySelector('.button-with-arrow__text').textContent = 'Скрыть';
						characters.classList.add('_active');
					}
				})
			}
		}
	}
	const usersButtons = document.querySelectorAll('.licenses__users-button');
	if (usersButtons.length) {
		for (let index = 0; index < usersButtons.length; index++) {
			const element = usersButtons[index];
			element.addEventListener('click', function() {
				for (let index = 0; index < usersButtons.length; index++) {
					const element = usersButtons[index];
					element.classList.remove('_active');
				}
				this.classList.add('_active');
			})
		}
	}
})
document.addEventListener('DOMContentLoaded', function() {
	const selects = document.querySelectorAll('.select');
	if (selects.length) {
		for (let index = 0; index < selects.length; index++) {
			const element = selects[index];
			const mainItem = element.querySelector('.select__main-item');
			element.addEventListener('click', function(e) {
				e.stopPropagation();
				this.classList.toggle('_active');
				if (e.target.classList.contains('select__drop-item')) {
					mainItem.innerHTML= e.target.innerHTML;
				}
			})
		}
		document.body.addEventListener('click', function() {
			for (let index = 0; index < selects.length; index++) {
				const element = selects[index];
				element.classList.remove('_active');
			}
		})
	}
})
document.addEventListener('DOMContentLoaded', function() {
	const tabsButtons = document.querySelectorAll('.tab__btn');
	const tabItems = document.querySelectorAll('.tab__item');
	if (tabsButtons.length && tabItems.length) {
		for (let index = 0; index < tabsButtons.length; index++) {
			const element = tabsButtons[index];
			element.addEventListener('click', function() {
				const buttonVal = this.dataset.tab;
				if (!this.classList.contains('_active')) {
					for (let index = 0; index < tabsButtons.length; index++) {
						const element = tabsButtons[index];
						element.classList.remove('_active');
					}
					this.classList.add('_active');
					for (let index = 0; index < tabItems.length; index++) {
						const element = tabItems[index];
						if (element.dataset.tab == buttonVal) {
							element.classList.add('_active');
						} else {
							element.classList.remove('_active');
						}
					}
				}
			})
		}
	}
})
document.addEventListener('DOMContentLoaded', function() {
	const links = document.querySelectorAll('.btn-scroll');
if (links.length) {
	for (let index = 0; index < links.length; index++) {
		const element = links[index];
		const elementHash = element.hash;
		if (elementHash) {
			const point = document.querySelector(elementHash);
			if (point) {
				element.addEventListener('click', function(e) {
					e.preventDefault();
					const pointPos = point.offsetTop;
					window.scrollTo({
						top: pointPos - 100,
						behavior: 'smooth',
					});
				})
			}
		}
	}
}
})