<?php
	IncludeModuleLangFile(__FILE__);
	echo CAdminMessage::ShowMessage(array(
		"TYPE" => "OK",
		"MESSAGE" => GetMessage("HOSTER_ADMIN_INSTALL_SUCCESS"),
		"DETAILS" => GetMessage("HOSTER_ADMIN_INSTALL_SUCCESS_DESC"),
		"HTML" => true,
	));
?>
<form action="<?=$APPLICATION->GetCurPage(); ?>">
    <input type="hidden" name="lang" value="<?=LANG; ?>">
    <input type="submit" name="" value="<?=GetMessage("MOD_BACK"); ?>">
</form>