//=============================================================================
// MK_FadeLoadGame.js
// 读档淡入
//=============================================================================
//  author : Mikan 
//  plugin : MK_FadeLoadGame.js 读档淡入
// version : v0.1.0 2021/01/08 完成基本功能
// ------------------------------------------------------------------------------
// [Twitter] https://twitter.com/_MikanHako/
// -[GitHub] https://github.com/MikanHako1024/
// ---[Blog] NONE
// -----[QQ] 312859582
//=============================================================================




/*:
 * @plugindesc 读档淡入 <MK_FadeLoadGame>
 * @author Mikan 
 * @version v0.1.0 2021/01/08 完成基本功能
 * v0.0.0 2021/01/08 项目计划中
 * 
 * 
 * 
 * 
 * @help
 * 
 * ---- 简要说明 ----
 * 
 * 修复数据版本不统一时，读档不淡入的问题 (RM问题)
 * 新增 : 可以自定义读档淡入的时长
 * 
 * (地图淡入时可以移动)
 * 
 * ---- 插件指令 ----
 * 
 *   # xxx.
 *   xxx
 *   ex : xxx
 * 
 * 
 * 
 * ---- 使用方法 ----
 * 
 * TODO
 * 
 * 
 * 
 * ---- 其他说明 ----
 * 
 * TODO
 * 
 * 
 * 
 * ---- 标签设置 ----
 * 
 * TODO
 * 
 * 
 * 
 * ---- 参数描述 ----
 * 
 * TODO
 * 
 * 
 * 
 * ---- 用语说明 ----
 * 
 * TODO
 * 
 * 
 * 
 * ---- 开发方法 ----
 * 
 * TODO
 * 
 * 
 * 
 * ---- 后续任务 ----
 * 
 * □ xxx
 * ...
 * 
 * 
 * 
 * ---- 使用规约 ----
 * 
 * 此插件由客户私人定制，其保留完全的使用权，以及二次开发的权利。
 * 二次创作保留页眉的著作权表示部分，谢谢。
 * 此插件的著作权归插件作者所有，同时享有使用权等其他权利。
 * 
 * 如果需要使用本插件，请联系插件作者授权，联系方式在下方。
 * 当然，没有授权也能使用，不过能事先联系的话，我会很感谢；否则，我留有追究责任的权利。
 * 
 * 使用形式（自由游戏、商业游戏、R-18作品等）没有限制，请随意使用。
 * 使用此插件的创作作品出现的法律问题，插件作者不负任何责任。
 * 
 * 创作中，由于使用此插件而发生的问题，插件作者不负任何责任。有必要时请注意备份。
 * 
 * 如果您有任何要求，您可能需要本插件的版本升级，请联系插件作者。
 * 根据版本升级，本插件的规格有可能变更，请谅解。
 * 
 * 如果有什么意见或建议可以联系我，欢迎唠嗑。
 * 
 * ---- 联系方式 ----
 * [Twitter] https://twitter.com/_MikanHako/
 * -[GitHub] https://github.com/MikanHako1024/
 * ---[Blog] NONE
 * -----[QQ] 312859582
 * 
 * 
 * 
 * 
 * @param ==== 游戏参数配置 ====
 * 
 * @param fadetime
 * @text 淡入时长
 * @desc 读档淡入地图的淡入时长
 * 单位 : 帧
 * @type number
 * @default 24
 * 
 * @param ==== 插件指令配置 ====
 * 
 * @param 
 * @text 
 * @desc 
 * @type 
 * @default 
 * 
 * @param ==== 内容数据配置 ====
 * 
 * @param 
 * @text 
 * @desc 
 * @type 
 * @default 
 * 
 * @param ==== under ====
 * 
 */



var MK_Plugins = MK_Plugins || {};
MK_Plugins.paramGet = MK_Plugins.paramGet || {};
MK_Plugins.param = MK_Plugins.param || {};
MK_Plugins.class = MK_Plugins.class || {};
MK_Plugins.datas = MK_Plugins.datas || {};

MK_Plugins.getPluginParam = MK_Plugins.getPluginParam ||
function (pluginName) {
	var param = PluginManager.parameters(pluginName);
	if (!param || JSON.stringify(param) === '{}') {
		var list = $plugins.filter(function (i) {
			return i.description.contains('<' + pluginName + '>');
		});
		for (var i = 0; i < list.length; i++) {
			var realPluginName = list[i].name;
			if (realPluginName !== pluginName)
				return PluginManager.parameters(realPluginName);
		}
		return {};
	}
	return param;
};



(function() {

	var pluginName = 'MK_FadeLoadGame';
	MK_Plugins.paramGet[pluginName] = MK_Plugins.getPluginParam(pluginName);
	MK_Plugins.param[pluginName] = {};

	var paramGet = MK_Plugins.paramGet[pluginName];
	var param = MK_Plugins.param[pluginName];

	param['fadetime'] = Number(paramGet['fadetime'] || 24);

	const FADETIME = param['fadetime'];


	const _MK_Scene_Load_reloadMapIfUpdated = Scene_Load.prototype.reloadMapIfUpdated;
	Scene_Load.prototype.reloadMapIfUpdated = function() {
		_MK_Scene_Load_reloadMapIfUpdated.apply(this, arguments);
		if ($gameSystem.versionId() !== $dataSystem.versionId) {
			$gamePlayer._fadeType = 0; 
		}
	};
	
	const _MK_Scene_Map_fadeSpeed = Scene_Map.prototype.fadeSpeed;
	Scene_Map.prototype.fadeSpeed = function() {
		if (SceneManager.isPreviousScene(Scene_Load)) {
			return FADETIME;
		}
		else {
			_MK_Scene_Map_fadeSpeed.apply(this, arguments);
		}
	};

})();


