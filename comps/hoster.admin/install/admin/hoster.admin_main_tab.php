<?php
require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_admin.php");
$APPLICATION->SetTitle("Информация");
?>
<?
	$moduleID = 'hoster.admin';
	$GLOBALS['APPLICATION']->SetAdditionalCss('/bitrix/css/'.$moduleID.'/style.css');
?>
	<div class="hoster-iframe">
		<iframe src="https://siter.kz/"></iframe>
	</div>
<?require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/epilog_admin.php");?>