<?php
use Bitrix\Main\Localization\Loc;

AddEventHandler('main', 'OnBuildGlobalMenu', 'OnBuildGlobalMenuHandlerHosterAdmin');

function OnBuildGlobalMenuHandlerHosterAdmin(&$arGlobalMenu, &$arModuleMenu) {
	if (!defined('HOSTER_ADMIN_MENU_INCLUDED')) {
		define('HOSTER_ADMIN_MENU_INCLUDED', true);

		IncludeModuleLangFile(__FILE__);
		$moduleID = 'hoster.admin';
		$GLOBALS['APPLICATION']->SetAdditionalCss('/bitrix/css/'.$moduleID.'/menu.css');

		if ($GLOBALS['APPLICATION']->GetGroupRight($moduleID) >= 'R') {
			$arMenu = array(
				'menu_id' => 'global_menu_hoster_admin',
				'text' => Loc::getMessage('HOSTER_ADMIN_MENU_TEXT'),
				'title' => Loc::getMessage('HOSTER_ADMIN_MENU_TITLE'),
				'sort' => 10,
				'items_id' => 'global_menu_hoster_admin_items',
				'icon' => 'hoster-info-icon',
				'page_icon' => 'pi_hoster_admin',
				'url' => '/bitrix/admin/'.$moduleID.'_main_tab.php?lang='.LANGUAGE_ID,
			);

			if (!isset($arGlobalMenu['global_menu_hoster_admin'])) {
				$arGlobalMenu['global_menu_hoster_admin'] = array(
					'menu_id' => 'global_menu_hoster_admin',
					'text' => Loc::getMessage('HOSTER_ADMIN_GLOBAL_MENU_TEXT'),
					'title' => Loc::getMessage('HOSTER_ADMIN_GLOBAL_MENU_TITLE'),
					'sort' => 50,
					'items_id' => 'global_menu_hoster_admin_items',
					'icon' => "hello"
				);
			}

			$arGlobalMenu['global_menu_hoster_admin']['items'][$moduleID] = $arMenu;
		}
	}
}
?>
