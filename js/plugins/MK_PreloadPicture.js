//=============================================================================
// MK_PreloadPicture.js
// 
//=============================================================================
//  author : Mikan 
//  plugin : MK_PreloadPicture.js 图片预加载
// version : v1.1.0 2020/07/19 添加了对人物行走图的加载
// ------------------------------------------------------------------------------
// [Twitter] https://twitter.com/_MikanHako/
//  [GitHub] https://github.com/MikanHako1024/
//    [Blog] NONE
//=============================================================================




/*:
 * @plugindesc 图片预加载 <MK_PreloadPicture>
 * @author Mikan 
 * @version v1.1.0 2020/07/19 添加了对人物行走图的加载
 *   v1.0.2 2020/04/28 修复了一些问题
 *     修复了预加载无事件页的事件时报错的问题
 *     修复了不预加载非当前事件页图片的问题
 *   v1.0.1 2020/04/27 修复了读档报错问题
 *   v1.0.0 2020/04/27 完成基本功能
 * 
 * 
 * @param ==== 游戏参数配置 ====
 * 
 * @param 
 * @desc 
 * @default 
 * 
 * @param ==== 插件指令配置 ====
 * 
 * @param 
 * @desc 
 * @default 
 * 
 * @param ==== under ====
 * 
 * 
 * 
 * 
 * @help
 * 
 * TODO
 * 
 * 
 * ---- 插件指令 ----
 * 
 * NONE
 * 
 * 
 * 
 * ---- 使用方法 ----
 * 
 * 事件备注中添加 <preload> 可以预加载事件中的图片和行走图
 * 
 * 可以直接为控制逻辑的事件备注
 * 也可以额外用一个事件，配置所有可能出现的图片
 * 
 * 
 * 
 * ---- 标签设置 ----
 * 
 * # 事件备注 : <preload>
 *   会预加载事件中的【显示图片】项的图片
 *   会预加载事件中的【更改角色图像】项的行走图
 *   会预加载事件中的【设置移动路线】-【图像】项的行走图
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
 * 显示 Loading
 * FINISH : 对人物行走图加载
 * 用Game_Interpreter的执行脚本项进行加载，并设置image等待
 * 
 * 
 */




(function() {

var _MK_Scene_Map_start   = Scene_Map.prototype.start;
Scene_Map.prototype.start = function(mapId) {
	_MK_Scene_Map_start.apply(this, arguments);
	this.preloadPicture();
	this.preloadCharacter();
};

Scene_Map.prototype.preloadPicture = function() {
	var pictureDict = {};
	$gameMap._events.filter(function(event) {
		return !!event && /<preload>/i.test(event.event().note);
	}).forEach(function(event) {
		event.event().pages.forEach(function(page) {
			page.list.forEach(function(line) {
				if (line.code == 231) { // 显示图片
					pictureDict[line.parameters[1]] = true;
				}
			});
		});
	});
	for (var name in pictureDict) {
		ImageManager.loadPicture(name);
	}
};

Scene_Map.prototype.preloadCharacter = function() {
	var characterDict = {};
	
	$gameMap._events.filter(function(event) {
		return !!event && /<preload>/i.test(event.event().note);
	}).forEach(function(event) {
		event.event().pages.forEach(function(page) {
			page.list.forEach(function(line) {
				if (line.code == 322) { // 更改角色图像
					characterDict[line.parameters[1]] = true;
				}
				else if (line.code == 205) { // 设置移动路线
					line.parameters[1].list.forEach(function(moveRoute) {
						if (moveRoute.code == 41) { // 图像
							characterDict[moveRoute.parameters[0]] = true;
						}
					});
				}
			});
		});
	});
	for (var name in characterDict) {
		ImageManager.loadCharacter(name);
	}
};

})();



