//=============================================================================
// MK_ChoiceWait.js
// 选项等待
//=============================================================================
//  author : Mikan 
//  plugin : MK_ChoiceWait.js 选项等待
// version : v0.1.0 2021/01/07 完成基础的功能
// ------------------------------------------------------------------------------
// [Twitter] https://twitter.com/_MikanHako/
// -[GitHub] https://github.com/MikanHako1024/
// ---[Blog] NONE
// -----[QQ] 312859582
//=============================================================================




/*:
 * @plugindesc 选项等待 <MK_ChoiceWait>
 * @author Mikan 
 * @version v0.1.0 2021/01/07 完成基础的功能
 * v0.0.0 2021/01/07 项目计划中
 * 
 * 
 * 
 * 
 * @help
 * 
 * ---- 简要说明 ----
 * 
 * 防止玩家误操作地进行选择，在进行选择前需要确认或等待
 * 
 * 提供三种模式：
 *   等待按键模式 : 按下方向键后 才可以进行选择
 *   等待时间模式 : 等待一定时间后 才可以进行选择
 *   以上两者之一 : 按下方向键 或者 等待一定时间后 才可以进行选择
 * 
 * 使用 ChoiceEx.js (by 冷血) 插件时，可以提供记忆功能，第二次选择时将不再等待
 * 
 * ---- 插件指令 ----
 * 
 * NONE
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
 * □ both模式 : 两者都需要满足
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
 * @param WaitMode
 * @text 等待模式
 * @desc 
 * 等待按键模式 : 按下方向键后 才可以进行选择
 * 等待事件模式 : 等待【waittime】帧后 才可以进行选择
 * @type select
 * @option 等待按键模式 @value keydown
 * @option 等待时间模式 @value waittime
 * @option 以上两者之一 @value any
 * @default 等待按键
 * @parent 
 * 
 * @param waittime
 * @text 等待时间
 * @desc 【等待模式】 - 【等待时间模式】 的等待时间
 * @default 45
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

	var pluginName = 'MK_ChoiceWait';
	MK_Plugins.paramGet[pluginName] = MK_Plugins.getPluginParam(pluginName);
	MK_Plugins.param[pluginName] = {};

	var paramGet = MK_Plugins.paramGet[pluginName];
	var param = MK_Plugins.param[pluginName];

	param['WaitMode'] 	 = String(paramGet['WaitMode'] 	 || 'keydown');
	param['waittime'] 	 = Number(paramGet['waittime'] 	 || 45);

	const WAITMODE = param['WaitMode'];
	const WAITMODE_KEYDOWN  = ['keydown', 'any'].includes(WAITMODE);
	const WAITMODE_WAITTIME = ['waittime', 'any'].includes(WAITMODE);
	const WAITTIME = param['waittime'];


	Window_ChoiceList.prototype.needChoiceWait = function() {
		return true;
	};

	const _MK_Window_ChoiceList_selectDefault = Window_ChoiceList.prototype.selectDefault;
	Window_ChoiceList.prototype.selectDefault = function() {
		if (this.needChoiceWait()) {
		    this._choiceWaiting = true;
		    this.select(-1);
		}
	};

	const _MK_Window_ChoiceList_processCursorMove = Window_ChoiceList.prototype.processCursorMove;
	Window_ChoiceList.prototype.processCursorMove = function() {
		!this._choiceWaiting && _MK_Window_ChoiceList_processCursorMove.apply(this, arguments);
	};

	const _MK_Window_ChoiceList_processHandling = Window_ChoiceList.prototype.processHandling;
	Window_ChoiceList.prototype.processHandling = function() {
		!this._choiceWaiting && _MK_Window_ChoiceList_processHandling.apply(this, arguments);
	};

	const _MK_Window_ChoiceList_processWheel = Window_ChoiceList.prototype.processWheel;
	Window_ChoiceList.prototype.processWheel = function() {
		!this._choiceWaiting && _MK_Window_ChoiceList_processWheel.apply(this, arguments);
	};

	const _MK_Window_ChoiceList_processTouch = Window_ChoiceList.prototype.processTouch;
	Window_ChoiceList.prototype.processTouch = function() {
		!this._choiceWaiting && _MK_Window_ChoiceList_processTouch.apply(this, arguments);
	};

	const _MK_Window_ChoiceList_update = Window_ChoiceList.prototype.update;
	Window_ChoiceList.prototype.update = function() {
		_MK_Window_ChoiceList_update.apply(this, arguments);

		if (this._choiceWaiting) {
			if (WAITMODE_KEYDOWN) {
				if (Input.isPressed('left') || Input.isPressed('right')
					 || Input.isPressed('up') || Input.isPressed('down')) {
					_MK_Window_ChoiceList_selectDefault.apply(this, arguments);
					this._choiceWaiting = false;
					return ;
				}
			}
			if (WAITMODE_WAITTIME) {
				if (this._stayCount >= WAITTIME) {
					_MK_Window_ChoiceList_selectDefault.apply(this, arguments);
					this._choiceWaiting = false;
					return ;
				}
			}
		}
	};


	// 重复选择时不再等待  依赖 ChoiceEx.js (by 冷血)
	if (!!Game_Message.prototype.isEnableChoice) {
		Window_ChoiceList.prototype.needChoiceWait = function() {
			for (var i = 0; i < this.maxItems(); i++) {
				if (!$gameMessage.isEnableChoice(i)) {
					return false;
				}
			}
			return true;
		}
	};
})();


