/*// 1. Фиксация <body>
function bodyFixPosition() {
	setTimeout(function() {
		if (!document.body.hasAttribute('data-body-scroll-fix')) {
			let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
			document.body.setAttribute('data-body-scroll-fix', scrollPosition);
			document.body.style.overflow = 'hidden';
			document.body.style.position = 'fixed';
			document.body.style.top = '-' + scrollPosition + 'px';
			document.body.style.left = '0';
		}
	}, 15);
}
function bodyUnfixPosition() {
	if (document.body.hasAttribute('data-body-scroll-fix')) {
		let scrollPosition = document.body.getAttribute('data-body-scroll-fix');
		document.body.removeAttribute('data-body-scroll-fix');
		document.body.style.overflow = '';
		document.body.style.position = '';
		document.body.style.top = '';
		document.body.style.left = '';
		window.scroll(0, scrollPosition);
	}
}
//===============================*/
document.addEventListener('DOMContentLoaded', function() {
	const sliders = document.querySelectorAll('.slider');
	if (sliders) {
		sliders.forEach(slider => {
			if (slider.classList.contains('slider--bottom')) {
				new Swiper(slider, {
					slidesPerView: 'auto',
					loop: false,
					centeredSlides: true,
					spaceBetween: 30,
					initialSlide: 2,
					pagination: {
						clickable: true,
						el: '.swiper-pagination',
					},
				});
			} else if (slider.classList.contains('slider--prize')) {
				new Swiper(slider, {
					slidesPerView: 'auto',
					loop: false,
					spaceBetween: 30,
					pagination: {
						clickable: true,
						el: '.swiper-pagination',
					},
				});
			} else {
				new Swiper(slider, {
					slidesPerView: 'auto',
					loop: false,
					spaceBetween: 30,
					pagination: {
						clickable: true,
						el: '.swiper-pagination',
					},
				});
			}
		});
	}
	const header = document.querySelector('.header');
	if (header) {
		if (window.scrollY > 0) {
			header.classList.add('header--fixed');
		}
		window.addEventListener('scroll', () => {
			if (window.scrollY > 0) {
				header.classList.add('header--fixed');
			} else {
				header.classList.remove('header--fixed');
			}
		});
	}
});
