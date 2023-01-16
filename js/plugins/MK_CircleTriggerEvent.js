//=============================================================================
// MK_CircleTriggerEvent.js
// 圆形触发事件
//=============================================================================
//  author : Mikan 
//  plugin : MK_CircleTriggerEvent.js 圆形触发事件
// version : v1.0.0 2020/09/22 完成基本功能
// ------------------------------------------------------------------------------
// [Twitter] https://twitter.com/_MikanHako/
//  [GitHub] https://github.com/MikanHako1024/
//    [Blog] NONE
//=============================================================================




/*:
 * @plugindesc 插圆形触发事件 <MK_CircleTriggerEvent>
 * @author Mikan 
 * @version v1.0.0 2020/09/22 完成基本功能
 *   v0.0.0 2020/09/22 项目计划中
 * 
 * 
 * @param ==== 游戏参数配置 ====
 * 
 * @param 
 * @text 
 * @desc 
 * @type 
 * @default 
 * @parent 
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
 * 
 * 
 * 
 * @help
 * 
 * ---- 简要说明 ----
 * 
 * TODO
 * 
 * 
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
 * 事件标签
 *     <CircleTrigger:varId>
 *     varId : 设置变量id，半径像素将使用该变量值
 *     例 : <CircleTrigger:1>
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
 * ---- 使用规约 ----
 * 
 * 如果需要使用本插件，只需要在GitHub给本插件一个Star或Watching即可。
 * 仓库：https://github.com/MikanHako1024/RPGMakerMV-MyPlugins
 * 
 * 这之后，可以对本插件随意修改使用，或二次开发。（但是，请保留页眉的著作权表示部分。）
 * 
 * 使用形式（自由游戏、商业游戏、R-18作品等）没有限制，请随意使用。
 * 
 * 由于使用本插件而发生的问题，作者不负任何责任。有必要时请注意备份。
 * 
 * 如果您有任何要求，您可能需要本插件的版本升级。
 * 根据版本升级，本插件的规格有可能变更。请谅解。
 * 
 * 如果有什么意见或建议可以联系我，欢迎。
 * 
 * 
 * ---- 后续任务 ----
 * 
 * 扇形
 * 
 * TODO
 * 
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

	Game_Map.prototype.eventsXyCircle = function(x, y) {
		return this.events().filter(function(event) {
			if (!event.pos(x, y) && event.event().meta['CircleTrigger']) {
				var radiusVarId = Number(event.event().meta['CircleTrigger']) || 0;
				var radius = Number($gameVariables.value(radiusVarId)) || 0;
				if (radius > 0) {
					var dx = event._x - x;
					var dy = event._y - y;
					dx *= this.tileWidth();
					dy *= this.tileHeight();
					return radius * radius >= dx * dx + dy * dy;
				}
			}
			return false;
		}, this);
	};

	var _MK_Game_Player_startMapEvent   = Game_Player.prototype.startMapEvent;
	Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {
		_MK_Game_Player_startMapEvent.apply(this, arguments);

		if (!$gameMap.isEventRunning()) {
			console.log($gameMap.eventsXyCircle(x, y));
			$gameMap.eventsXyCircle(x, y).forEach(function(event) {
				if (event.isTriggerIn(triggers) && event.isNormalPriority() === normal) {
					event.start();
				}
			});
		}
	};
})();



