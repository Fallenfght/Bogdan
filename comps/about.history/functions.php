<? if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>

<?
class CAboutHistory{

	public static function getSections($iblock_id){
		$arSections=array();
		$arrFilter = array("IBLOCK_ID"=>$iblock_id,"ACTIVE"=>"Y","DEPTH_LEVEL"=>1);
		$arCacheSections = CDevCache::CIBlockSection_GetList(array("SORT" => "ASC"),$arrFilter, true, array("ID","NAME","UF_NAME_KZ"), false);
		foreach($arCacheSections as $arCacheSections){
			$arSections[$arCacheSections["ID"]]["ID"] = $arCacheSections["ID"];
			$arSections[$arCacheSections["ID"]]["NAME_RU"] = $arCacheSections["NAME"];
			$arSections[$arCacheSections["ID"]]["NAME_KZ"] = $arCacheSections["UF_NAME_KZ"];
			$arSections[$arCacheSections["ID"]]["ELEMENT_CNT"] = $arCacheSections["ELEMENT_CNT"];
		}
		return $arSections;
	}
}
?>