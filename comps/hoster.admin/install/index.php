<?php
use Bitrix\Main\Application;

IncludeModuleLangFile(__FILE__);

Class hoster_admin extends CModule {
	var $MODULE_ID = "hoster.admin";
	var $MODULE_VERSION;
	var $MODULE_VERSION_DATE;
	var $MODULE_NAME;
	var $MODULE_DESCRIPTION;
	var $MODULE_CSS;

	function __construct()
	{
		$arModuleVersion = array();

		include(__DIR__ . "/version.php");

		$this->MODULE_ID = "hoster.admin";
		$this->MODULE_VERSION = $arModuleVersion["VERSION"];
		$this->MODULE_VERSION_DATE = $arModuleVersion["VERSION_DATE"];
		$this->MODULE_NAME = GetMessage("HOSTER_ADMIN_MODULE_NAME");
		$this->MODULE_DESCRIPTION = GetMessage("HOSTER_ADMIN_MODULE_DESC");

		$this->PARTNER_NAME = GetMessage("HOSTER_ADMIN_PARTNER_NAME");
		$this->PARTNER_URI = GetMessage("HOSTER_ADMIN_PARTNER_URI");
	}

	function DoInstall()
	{
		global $DOCUMENT_ROOT, $APPLICATION;
		$modulePath = $DOCUMENT_ROOT . '/bitrix/modules/' . $this->MODULE_ID;

		RegisterModule($this->MODULE_ID);

		$this->InstallAdminPage();
		$this->InstallMainFiles();
		$this->InstallGadgets();
		
		$APPLICATION->IncludeAdminFile(GetMessage("HOSTER_ADMIN_INSTALL_TITLE"), $modulePath . "/install/step.php");
	}
	function DoUninstall()
	{
		global $DOCUMENT_ROOT, $APPLICATION;
		$modulePath = $DOCUMENT_ROOT . '/bitrix/modules/' . $this->MODULE_ID;

		$this->UninstallGadgets();
		$this->UninstallMainFiles();
		$this->UninstallAdminPage();

		UnRegisterModule($this->MODULE_ID);

		$APPLICATION->IncludeAdminFile(GetMessage("HOSTER_ADMIN_UNINSTALL_TITLE"), $modulePath . "/install/unstep.php");
	}



	protected function InstallMainFiles()
	{
		global $DOCUMENT_ROOT;
		$modulePath = $DOCUMENT_ROOT . '/bitrix/modules/' . $this->MODULE_ID;
		// Перенос CSS файлов
		$installPath = $DOCUMENT_ROOT . "/bitrix/css/{$this->MODULE_ID}/";
		CheckDirPath($installPath);
		CopyDirFiles(
			"{$modulePath}/install/css/",
			$installPath,
			true, // Копировать поддиректории
			true // Заменять существующие файлы
		);
		// Перенос images
		$installPath = $DOCUMENT_ROOT . "/bitrix/images/{$this->MODULE_ID}/";
		CheckDirPath($installPath);
		CopyDirFiles(
			"{$modulePath}/install/images/",
			$installPath,
			true, // Копировать поддиректории
			true // Заменять существующие файлы
		);
	}
	protected function UninstallMainFiles()
	{
		global $DOCUMENT_ROOT;
		$modulePath = $DOCUMENT_ROOT . '/bitrix/modules/' . $this->MODULE_ID;
		// Удаление CSS файлов
		$installPath = $DOCUMENT_ROOT . "/bitrix/css/{$this->MODULE_ID}/";
		if (is_dir($installPath)) {
			DeleteDirFilesEx("/bitrix/css/{$this->MODULE_ID}/");
		}
		// Удаление images
		$installPath = $DOCUMENT_ROOT . "/bitrix/images/{$this->MODULE_ID}/";
		if (is_dir($installPath)) {
			DeleteDirFilesEx("/bitrix/images/{$this->MODULE_ID}/");
		}
	}
	protected function InstallGadgets()
	{
		global $DOCUMENT_ROOT;
		$modulePath = $DOCUMENT_ROOT . '/bitrix/modules/' . $this->MODULE_ID;
		// Перенос gadgets
		$installPath = $DOCUMENT_ROOT . "/bitrix/gadgets/{$this->MODULE_ID}/";
		CheckDirPath($installPath);
		CopyDirFiles(
			"{$modulePath}/install/gadgets/",
			$installPath,
			true, // Копировать поддиректории
			true // Заменять существующие файлы
		);
		$gadget_id = str_replace('.', '_', strtoupper($this->MODULE_ID));
		$gdid = $gadget_id."@".rand();
		if(class_exists('CUserOptions')){
			$arUserOptions = CUserOptions::GetOption('intranet', '~gadgets_admin_index', false, false);
			if(is_array($arUserOptions) && isset($arUserOptions[0])){
				foreach($arUserOptions[0]['GADGETS'] as $tempid => $tempgadget){
					$p = strpos($tempid, '@');
					$gadget_id_tmp = ($p === false ? $tempid : substr($tempid, 0, $p));

					if($gadget_id_tmp == $gadget_id){
						return false;
					}
					if($tempgadget['COLUMN'] == 0){
						++$arUserOptions[0]['GADGETS'][$tempid]['ROW'];
					}
				}
				$arUserOptions[0]['GADGETS'][$gdid] = array('COLUMN' => 0, 'ROW' => 0);
				CUserOptions::SetOption('intranet', '~gadgets_admin_index', $arUserOptions, false, false);
			}
		}
	}
	protected function UninstallGadgets()
	{
		global $DOCUMENT_ROOT;
		$modulePath = $DOCUMENT_ROOT . '/bitrix/modules/' . $this->MODULE_ID;
		$installPath = $DOCUMENT_ROOT . "/bitrix/gadgets/{$this->MODULE_ID}/";

		// Удаление gadgets
		$gadget_id = str_replace('.', '_', strtoupper($this->MODULE_ID));
		if(class_exists('CUserOptions')){
			$arUserOptions = CUserOptions::GetOption('intranet', '~gadgets_admin_index', false, false);
			if(is_array($arUserOptions) && isset($arUserOptions[0])){
				foreach($arUserOptions[0]['GADGETS'] as $tempid => $tempgadget){
					$p = strpos($tempid, '@');
					$gadget_id_tmp = ($p === false ? $tempid : substr($tempid, 0, $p));

					if($gadget_id_tmp == $gadget_id){
						unset($arUserOptions[0]['GADGETS'][$tempid]);
					}
				}
				CUserOptions::SetOption('intranet', '~gadgets_admin_index', $arUserOptions, false, false);
			}
		}
		if (is_dir($installPath)) {
			DeleteDirFilesEx("/bitrix/gadgets/{$this->MODULE_ID}/");
		}
	}
	protected function InstallAdminPage()
	{
		global $DOCUMENT_ROOT;
		$moduleID = $this->MODULE_ID;
		$adminPagePath = $DOCUMENT_ROOT.'/bitrix/admin/'.$moduleID.'_main_tab.php';
		$customPagePath = $DOCUMENT_ROOT . '/bitrix/modules/' . $moduleID . '/install/admin/' . $moduleID . '_main_tab.php';
		// Проверяем, не существует ли уже страницы
		if (!file_exists($adminPagePath)) {
			// Создание файла страницы
			$customPageContent = file_get_contents($customPagePath);
			if ($customPageContent !== false && !empty($customPageContent)) {
				file_put_contents($adminPagePath, $customPageContent);
			}
		}
		
	}
	protected function UninstallAdminPage()
	{
		global $DOCUMENT_ROOT;
		$moduleID = $this->MODULE_ID;
		$adminPagePath = $DOCUMENT_ROOT.'/bitrix/admin/'.$moduleID.'_main_tab.php';
		// Удаление файла страницы, если он существует
		if (file_exists($adminPagePath)) {
			unlink($adminPagePath);
		}
	}
}