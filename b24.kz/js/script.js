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
				},
				navigation: {
					enabled: false,
					nextEl: '.arrow-right',
					prevEl: '.arrow-left',
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
				delay: 4000,
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
		centeredSlides: false,
		loopedSlidesLimit: false,
		speed: 10000,
		spaceBetween: 50,
		autoplay: {
			delay: 0,
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
				const element = items[index];
				element.addEventListener('click', function() {
					if (this.classList.contains('_active')) {
						return;
					} else {
						for (let index = 0; index < items.length; index++) {
							const element = items[index];
							element.classList.remove('_active');
						}
						this.classList.add('_active');
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