<? if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>

<div id="history" class="section-for-menu">
	<img src="<?=SITE_TEMPLATE_PATH?>/src/media/history/11.png" class="outside-1" alt="">
	<img src="<?=SITE_TEMPLATE_PATH?>/src/media/history/22.png" class="outside-2" alt="">
	<img src="<?=SITE_TEMPLATE_PATH?>/src/media/history/33.png" class="outside-3" alt="">

	<div class="container">
		<h3><?=$arResult["SECTION_CURRENT_NAME"]?></h3>
	</div>
	<div class="swiper-control-wrapper history-swiper-wrapper marker-id" id="<?=$arParams["ITEM_CODE"];?>">
	<?if($arResult["SECTION_ELEMENT_CNT"]>0):?>
		<div class="container">
			<div class="swiper history-swiper">
				<div class="swiper-wrapper">
					<?$APPLICATION->IncludeComponent(
						"bitrix:news.list", 
						"about_history", 
						array(
							// "LANGUAGE_ID" => LANGUAGE_ID,
							"ACTIVE_DATE_FORMAT" => "d.m.Y",
							"ADD_SECTIONS_CHAIN" => "N",
							"AJAX_MODE" => "N",
							"AJAX_OPTION_ADDITIONAL" => "",
							"AJAX_OPTION_HISTORY" => "N",
							"AJAX_OPTION_JUMP" => "N",
							"AJAX_OPTION_STYLE" => "N",
							"CACHE_FILTER" => "N",
							"CACHE_GROUPS" => "Y",
							"CACHE_TIME" => "36000000",
							"CACHE_TYPE" => "A",
							"CHECK_DATES" => "Y",
							"COMPOSITE_FRAME_MODE" => "A",
							"COMPOSITE_FRAME_TYPE" => "AUTO",
							"DETAIL_URL" => "",
							"DISPLAY_BOTTOM_PAGER" => "N",
							"DISPLAY_DATE" => "N",
							"DISPLAY_NAME" => "Y",
							"DISPLAY_PICTURE" => "Y",
							"DISPLAY_PREVIEW_TEXT" => "N",
							"DISPLAY_TOP_PAGER" => "N",
							"FIELD_CODE" => array(
								0 => "",
							),
							"FILTER_NAME" => "",
							"HIDE_LINK_WHEN_NO_DETAIL" => "N",
							"IBLOCK_ID" => $arParams["IBLOCK_ID"],
							"IBLOCK_TYPE" => $arParams["IBLOCK_TYPE"],
							"INCLUDE_IBLOCK_INTO_CHAIN" => "N",
							"INCLUDE_SUBSECTIONS" => "Y",
							"MESSAGE_404" => "",
							"NEWS_COUNT" => "99",
							"PAGER_BASE_LINK_ENABLE" => "N",
							"PAGER_DESC_NUMBERING" => "N",
							"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
							"PAGER_SHOW_ALL" => "N",
							"PAGER_SHOW_ALWAYS" => "N",
							"PAGER_TEMPLATE" => ".default",
							"PAGER_TITLE" => "История компании",
							"PARENT_SECTION" => $arResult["SECTION_CURRENT_ID"],
							"PARENT_SECTION_CODE" => "",
							"PREVIEW_TRUNCATE_LEN" => "",
							"PROPERTY_CODE" => array(
								0 => "NAME_KZ",
								1 => "HISTORY_TEXT_RU",
								2 => "HISTORY_TEXT_KZ",
								3 => "PHOTO_570",
								4 => "PHOTO_153",
								5 => "PHOTO_116",
							),
							"SET_BROWSER_TITLE" => "N",
							"SET_LAST_MODIFIED" => "N",
							"SET_META_DESCRIPTION" => "N",
							"SET_META_KEYWORDS" => "N",
							"SET_STATUS_404" => "N",
							"SET_TITLE" => "N",
							"SHOW_404" => "N",
							"SORT_BY1" => "SORT",
							"SORT_BY2" => "SORT",
							"SORT_ORDER1" => "ASC",
							"SORT_ORDER2" => "ASC",
							"STRICT_SECTION_CHECK" => "N",
							"COMPONENT_TEMPLATE" => "about_history",
						),
						false
					);?>
				</div>
			</div>
		</div>
		<?endif;?>
		
		<?if($arResult["SECTION_ELEMENT_CNT"]>1):?>
			<div class="container navigation">
				<div class="swiper-button-next"></div>
				<div class="swiper-button-prev"></div>
			</div>
		<?endif;?>
		
		<div class="history-pagination">
			<?foreach($arResult["SECTION_LIST"] as $arSection){?>
				<button data-section="<?=$arSection["ID"]?>" class="year <?=$arSection["ID"]==$arResult["SECTION_CURRENT_ID"]?"active":"";?>"><p><?=$arSection["NAME_".$arResult["LANGUAGE_ID"]]?></p><span class="star-big"></span></button>
			<?}?>
		</div>
		<form 
			method="POST" 
			enctype="multipart/form-data" 
			action="<?=POST_FORM_ACTION_URI?>" 
			id="<?=$arResult["FORM_PREFIX"]?>_form" 
			name="<?=$arResult["FORM_PREFIX"]?>_form">
			<?=bitrix_sessid_post();?>
			<input type="hidden" name="<?=$arResult["FORM_PREFIX"]?>[is_real_submit]" value="Y">
			<input type="hidden" name="<?=$arResult["FORM_PREFIX"]?>[section_id]" value="<?=$arResult["SECTION_CURRENT_ID"]?>">
			<button type="submit" name="<?=$arResult["FORM_PREFIX"]?>_button" style="display:none;"></button>
		</form>
	</div>
</div>

<script>
	function swiperHistoryOverUpdate() {
		this.params.navigation.nextEl = this.el.closest('.swiper-control-wrapper').querySelector('.swiper-button-next');
		this.params.navigation.prevEl = this.el.closest('.swiper-control-wrapper').querySelector('.swiper-button-prev');
		this.navigation.update()
	}
	function swiperHistoryOverInit() {
		this.params.navigation.nextEl = this.el.closest('.swiper-control-wrapper').querySelector('.swiper-button-next');
		this.params.navigation.prevEl = this.el.closest('.swiper-control-wrapper').querySelector('.swiper-button-prev');
		this.navigation.init()
		this.navigation.update()
	}
	var historySwiper = new Swiper(".history-swiper", {
		slidesPerView: 'auto',
		spaceBetween: 80,
		grabCursor: true,
		loop: true,
		observeParents: true,
		effect: 'coverflow',
		pagination: {
			el: '#history-pagination',
			bulletActiveClass: 'active',
			bulletClass: 'year',
			clickable: true,
			renderBullet: function (index, className) {
				let currentYear = this.slides[index].getAttribute('year')
				return '<button class="' + className + '"><p>' + currentYear + '</p><span class="star-big"></span></button>';
			}
		},
		on: {
			init: function (swiper) {
				let bindedInit = swiperHistoryOverInit.bind(swiper)
				bindedInit()
			},
			update: function (swiper) {
				let bindedUpdate = swiperHistoryOverUpdate.bind(swiper)
				bindedUpdate()
			}
		},
	});
	
	var wrapperHistory = document.querySelector('#history');
	if (wrapperHistory) {
		let btns = wrapperHistory.querySelectorAll('button.year');
		if (btns.length) {
			btns.forEach(btn => {
				btn.addEventListener('click', function() {
					btns.forEach(btn => btn.classList.remove('active'));
					this.classList.add('active');
					//imitate fake submit
					let form = document.querySelector('form#<?=$arResult["FORM_PREFIX"]?>_form');
					form.querySelector('input[name*="[is_real_submit]"]').value = 'N';
					form.querySelector('input[name*="[section_id]"]').value = this.getAttribute('data-section');
					form.querySelector('button[type="submit"]').click();
				})
			})
		}
	}
	
</script>