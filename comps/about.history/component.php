<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<?
CModule::IncludeModule('iblock');
require 'functions.php';

$prefix = $this->__templateName;
$prefix_clear = trim(str_replace(["-","."],[""],$prefix));
$arResult["FORM_PREFIX"] = $prefix_clear;
$arResult["LANGUAGE_ID"] = strtoupper(LANGUAGE_ID);

$submit = isset($_REQUEST[$arResult["FORM_PREFIX"]]['is_real_submit']);
$arCategories = CAboutHistory::getSections($arParams["IBLOCK_ID"]);

if($submit){
	$categoryId = $_REQUEST[$prefix]['section_id'];
	$arResult["SECTION_LIST"] = $arCategories;
	$arResult["SECTION_CURRENT_ID"] = $arCategories[$categoryId]["ID"];
	$arResult["SECTION_CURRENT_NAME"] = $arCategories[$categoryId]["NAME_".$arResult["LANGUAGE_ID"]];
	$arResult["SECTION_ELEMENT_CNT"] = $arCategories[$categoryId]["ELEMENT_CNT"];
}
else{
	$arCurrentCategory = current($arCategories);
	$arResult["SECTION_LIST"] = $arCategories;
	$arResult["SECTION_CURRENT_ID"] = $arCurrentCategory["ID"];
	$arResult["SECTION_CURRENT_NAME"] = $arCurrentCategory["NAME_".$arResult["LANGUAGE_ID"]];
	$arResult["SECTION_ELEMENT_CNT"] = $arCurrentCategory["ELEMENT_CNT"];
} 

$this->IncludeComponentTemplate();
?>