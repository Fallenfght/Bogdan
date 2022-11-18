document.addEventListener('DOMContentLoaded', function() {
	const aboutSlider = document.querySelector('.about .swiper');
	if (aboutSlider) {
		const swiperAboutSlides = aboutSlider.querySelectorAll('.about__item');
		if (swiperAboutSlides.length) {
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
							enabled: true,
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
	const numberedSlider = document.querySelectorAll('.slider-numbered .swiper');
	if (numberedSlider.length) {
		for (let index = 0; index < numberedSlider.length; index++) {
			const element = numberedSlider[index];
			const swiper = new Swiper(element, {
				rewind: true,
				spaceBetween: 0,
				slidesPerView: 1,
				centeredSlides: true,
				effect: 'fade',
				grabCursor: true,
				fadeEffect: {
					crossFade: true
				},
				pagination: {
					enabled: true,
					el: '.swiper-pagination',
					clickable: true,
					bulletClass: 'slider-numbered__dot',
					bulletActiveClass: '_active',
				},
				autoplay: {
					delay: 8000,
					disableOnInteraction: false,
				},
				on: {
					beforeInit: function() {
						const slides = element.querySelectorAll('.swiper-slide');
						for (let index = 0; index < slides.length; index++) {
							const element = slides[index];
							const head = element.querySelector('.slider-numbered__item-head');
							const count = index + 1;
							head.innerHTML = String(count) + '. ' + head.innerHTML;
						}
					},
				},
			});
			const dotsContainer = element.querySelector('.slider-numbered__dots');
			swiper.on('slideChange', function() {
				const currentDotPos = element.querySelector('.slider-numbered__dot._active').offsetLeft;
				dotsContainer.scrollTo({
					top: 0,
					left: currentDotPos - 26,
					behavior: 'smooth',
				})
			});
			swiper.autoplay.stop();
			let pos;
			window.addEventListener('scroll', checkPos);
			function checkPos() {
				pos = element.getBoundingClientRect().top - window.innerHeight / 1.5;
				if (pos <= 0) {
					element.classList.add('_active');
					swiper.autoplay.start();
					window.removeEventListener('scroll', checkPos);
				}
			}
		}
	}
	const testBlock = document.querySelectorAll('.test');
	if (testBlock.length) {
		for (let index = 0; index < testBlock.length; index++) {
			const element = testBlock[index];
			if (element.querySelector('.swiper')) {
				let autoplaySpeed = 8000;
				if (element.querySelector('.test_autoplay_long')) {
					autoplaySpeed = 14000;
				}
				const swiperTest = new Swiper(element.querySelector('.swiper'), {
					loop: true,
					spaceBetween: 0,
					slidesPerView: 1,
					centeredSlides: true,
					autoplay: {
						delay: autoplaySpeed,
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
				let pos;
				window.addEventListener('scroll', checkPos);
				function checkPos() {
					pos = element.getBoundingClientRect().top - window.innerHeight / 1.5;
					if (pos <= 0) {
						element.classList.add('_active');
						swiperTest.autoplay.start();
						window.removeEventListener('scroll', checkPos);
					}
				}
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
				if (itemsHoverElem && item.length) {
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
			}
			const items = element.querySelectorAll('.licenses__item');
			for (let index = 0; index < items.length; index++) {
				const element = items[index];
				const button = element.querySelector('.licenses__more');
				const characters = element.querySelector('.licenses__characters');
				if (button && characters) {
					button.addEventListener('click', function() {
						if (this.classList.contains('_active')) {
							this.classList.remove('_active');
							this.querySelector('.button-with-arrow__text').textContent = 'Подробнее';
							characters.classList.remove('_active');
							window.scrollTo({
								top: element.offsetTop - 100,
							});
						} else {
							this.classList.add('_active');
							this.querySelector('.button-with-arrow__text').textContent = 'Скрыть';
							characters.classList.add('_active');
						}
					})
				}
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
	const questions = document.querySelectorAll('.question');
if (questions.length) {
	for (let index = 0; index < questions.length; index++) {
		const element = questions[index];
		element.addEventListener('click', function(e) {
			e.stopPropagation();
			if (element.classList.contains('_active')) {
				element.classList.remove('_active');
			} else {
				for (let index = 0; index < questions.length; index++) {
					questions[index].classList.remove('_active');
				}
				element.classList.add('_active');
			}
		})
	}
	document.addEventListener('click', function() {
		for (let index = 0; index < questions.length; index++) {
			questions[index].classList.remove('_active');
		}
	})
}
	let sliderButton = document.querySelectorAll('.slider-grab__item-two-slides');
if (sliderButton.length > 0) {
	for (let index = 0; index < sliderButton.length; index++) {
		const element = sliderButton[index];
		const button = element.querySelector('.item-bg-two-images__button');
		let buttonWidth = button.offsetWidth;
		let buttonHalfWidth = button.offsetWidth / 2;
		let containerleftPos = element.getBoundingClientRect().left;
		let containerWidth = element.offsetWidth;
		const body = document.body;
		const image = element.querySelector('.item-bg-two-images__first');
		const imageSecond = element.querySelector('.item-bg-two-images__second');
		image.querySelector('img').style.width = containerWidth + 'px';
		imageSecond.querySelector('img').style.width = containerWidth + 'px';
		let shiftX = {};
		if (window.innerWidth < 1024) {
			button.addEventListener('touchstart', function(event) {
				shiftX = event.touches[0].clientX - button.getBoundingClientRect().left;
				button.classList.add('_active');
				button.classList.add('_activated');
				button.style.left = 0;
				button.style.zIndex = 200;
				body.style.cursor = 'grabbing';
				moveAt(event.touches[0].pageX);
				function onMouseMove(event) {
					event.preventDefault();
					moveAt(event.touches[0].pageX);
				};
				document.addEventListener('touchmove', onMouseMove, {passive:false});
				document.addEventListener('touchend', function() {
					document.body.style.position = '';
					document.removeEventListener('touchmove', onMouseMove);
					button.onmouseup = null;
					body.style.cursor = '';
					button.classList.remove('_active');
				});
			});
		} else {
			button.addEventListener('pointerdown', function(event) {
				shiftX = event.clientX - button.getBoundingClientRect().left;
				button.classList.add('_active');
				button.classList.add('_activated');
				button.style.left = 0;
				button.style.zIndex = 200;
				body.style.cursor = 'grabbing';
				moveAt(event.pageX);
				function onMouseMove(event) {
					event.preventDefault();
					moveAt(event.pageX);
				};
				document.addEventListener('pointermove', onMouseMove, {passive:false});
				document.addEventListener('pointerup', function() {
					document.body.style.position = '';
					document.removeEventListener('pointermove', onMouseMove);
					button.onmouseup = null;
					body.style.cursor = '';
					button.classList.remove('_active');
				});
			});
		}
		button.addEventListener('dragstart', function() {
			return false;
		});
		function moveAt(pageX) {
			let position = pageX - shiftX - containerleftPos;
			if (position <= 0) {
				button.style.transform = 'translate(0, 0px)';
				image.style.transition = 'width 0.3s ease';
				imageSecond.style.transition = 'width 0.3s ease';
				image.style.width = '100%';
				imageSecond.style.width = '0%';
			} else if (position + buttonWidth >= containerWidth) {
				button.style.transform = 'translate(' + (containerWidth - buttonWidth) + 'px, 0)';
				image.style.transition = 'width 0.3s ease';
				imageSecond.style.transition = 'width 0.3s ease';
				image.style.width = 'calc(100% - ' + (containerWidth - 3) + 'px)';
				imageSecond.style.width = 'calc(0% + ' + (containerWidth - 3) + 'px)';
			} else {
				button.style.transform = 'translate(' + position + 'px, 0';
				image.style.transition = '';
				imageSecond.style.transition = '';
				image.style.width = 'calc(100% - ' + (position + buttonHalfWidth) + 'px)';
				imageSecond.style.width = 'calc(0% + ' + (position + buttonHalfWidth) + 'px)';
			}
		};
	}
}
})
const modal = document.querySelectorAll('body>.modal');
const buttonModal = document.querySelectorAll('.btn-modal-consult');
if (modal.length && buttonModal.length) {
	for (let index = 0; index < buttonModal.length; index++) {
		const element = buttonModal[index];
		element.addEventListener('click', function(e) {
			e.preventDefault();
			for (let index = 0; index < modal.length; index++) {
				const element = modal[index];
				element.classList.add('_active');
			}
			bodyFixPosition();
		})
	}
	for (let index = 0; index < modal.length; index++) {
		const element = modal[index];
		element.addEventListener('click', function() {
			element.classList.remove('_active');
			bodyUnfixPosition();
		})
		const modalClose = element.querySelector('.modal__close');
		modalClose.addEventListener('click', function(e) {
			element.classList.remove('_active');
			bodyUnfixPosition();
		})
		const modalContainer = element.querySelector('.modal__container');
		modalContainer.addEventListener('click', function(e) {
			e.stopPropagation();
		})
	}
}
const masks = document.querySelectorAll('.mask');
if (masks.length) {
	Inputmask({
		mask: "+7 (999) 999 99 99",
		showMaskOnHover: false,
	}).mask(masks);
}
// 1. Фиксация <body>
function bodyFixPosition() {

  setTimeout( function() {
  /* Ставим необходимую задержку, чтобы не было «конфликта» в случае, если функция фиксации вызывается сразу после расфиксации (расфиксация отменяет действия расфиксации из-за одновременного действия) */

    if ( !document.body.hasAttribute('data-body-scroll-fix') ) {

      // Получаем позицию прокрутки
      let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      // Ставим нужные стили
      document.body.setAttribute('data-body-scroll-fix', scrollPosition); // Cтавим атрибут со значением прокрутки
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + scrollPosition + 'px';
      document.body.style.left = '0';
      document.body.style.width = '100%';

    }

  }, 15 ); /* Можно задержку ещё меньше, но у меня работало хорошо именно с этим значением на всех устройствах и браузерах */

}
// 2. Расфиксация <body>
function bodyUnfixPosition() {

  if ( document.body.hasAttribute('data-body-scroll-fix') ) {

    // Получаем позицию прокрутки из атрибута
    let scrollPosition = document.body.getAttribute('data-body-scroll-fix');

    // Удаляем атрибут
    document.body.removeAttribute('data-body-scroll-fix');

    // Удаляем ненужные стили
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';

    // Прокручиваем страницу на полученное из атрибута значение
    window.scroll(0, scrollPosition);

  }

}