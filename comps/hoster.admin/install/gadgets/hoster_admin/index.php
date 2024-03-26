<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
$gadgetID = strtolower($arGadget['GADGET_ID']);
$moduleID = str_replace('_', '.', $gadgetID);
/*echo "<pre>";
var_dump('/bitrix/gadgets/hoster/'.$gadgetID.'/styles.css');
echo "</pre>";*/
$GLOBALS['APPLICATION']->SetAdditionalCSS('/bitrix/gadgets/'.$moduleID.'/'.$gadgetID.'/styles.css');
?>
<div class="hoster-gadget-admin__container">
    <div class="hoster-gadget-admin__title" title="<?=$arGadget['NAME']?>"><?=$arGadget['NAME']?></div> 
	<div class="hoster-gadget-admin__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic dicta at, omnis totam voluptas laudantium, velit iste molestiae sapiente eum tempora facere, voluptates quo? Voluptatibus veniam adipisci tenetur blanditiis et!</div>
	<div class="hoster-gadget-admin__btn-container">
		<a href="/bitrix/admin/<?=$moduleID?>_main_tab.php?lang=ru" class="hoster-gadget-admin__btn">Подробнее</a>
	</div>
</div>