//=============================================================================
// MK_MovePicture.js
// 移动图片拓展
//=============================================================================
//  author : Mikan 
//  plugin : MK_MovePicture.js 移动图片拓展
// version : v0.1.0 2021/01/06 完成基本功能
// ------------------------------------------------------------------------------
// [Twitter] https://twitter.com/_MikanHako/
// -[GitHub] https://github.com/MikanHako1024/
// ---[Blog] NONE
// -----[QQ] 312859582
//=============================================================================




/*:
 * @plugindesc 移动图片拓展 <MK_MovePicture>
 * @author Mikan 
 * @version v0.1.0 2021/01/06 完成基本功能
 * v0.0.0 2021/01/06 项目计划中
 * 
 * 
 * 
 * 
 * @help
 * 
 * ---- 简要说明 ----
 * 
 * 本插件拓展【移动图片】命令，实现以下功能
 *   1. 可以设置任意的图片移动时长，突破默认 999帧 的上限
 *   2. 按住按键时影响图片移动速度的倍率
 *        按住对应按键时，可以加快、减慢、跳过或暂停图片的移动
 *        倍率会在原速度的基础上做乘法
 *        这必然会导致实际图片移动时间，不同于设置的时间
 * 
 * 本插件的【插件指令】 需要位于 任意一条【移动图片】命令的上一条
 * 插件会以 下一条【移动图片】命令的配置作为基础配置
 *   示例：
 *     ...
 *     ...
 * 
 * 
 * ---- 插件指令 ----
 * 
 *   # 突破 【移动图片】 命令的时间上限
 *       MovePicture 时间
 *         时间 : 帧数，突破默认的 999帧 上限
 * 
 *   # 突破时间上限，同时设置按键控制图片移动速度的倍率
 *       MovePicture 时间 按键1 倍率1
 *       MovePicture 时间 按键1 倍率1 按键2 倍率2 ...
 *         按键 : ok, cancel 等，详见 【其他说明】
 *         倍率 :
 *           任意正数   加速或减速，为 原速度的倍率
 *           #skip      跳过，瞬间完成
 *           #pause     暂停移动
 *   
 *   # 例：一分钟内移动，按住Z(ok)四倍移动，按住shift暂停移动，按住X(cancel)跳过移动
 *       MovePicture 3600  ok 4  shift #pause#  cancel #skip#
 *       (允许多空格，区分大小写)
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
 * # 按键表
 *     按键名       PC按键描述    手柄按键描述
 *  (用于插件指令)
 *     ok          enter         A
 *                 space
 *                 Z
 *     escape      escape
 *                 numpad 0
 *                 X
 *                 insert
 *     cancel      (同escape)    B
 *     menu        (同escape)    Y
 *     shift       shift         X
 * 
 *     down        numpad 2      D-pad down
 *                 down arrow
 *     left        numpad 4      D-pad left
 *                 left arrow
 *     right       numpad 6      D-pad right
 *                 right arrow 
 *     up          numpad 8      D-pad up
 *                 up arrow
 * 
 *     pageup      pageup        LB
 *                 Q
 *     pagedown    pagedown      RB
 *                 W
 * 
 *     tab         tab
 *     control     control
 *                 alt
 *     debug       F9
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
 */




(function () {
	
	const _MK_Game_Picture_updateMove = Game_Picture.prototype.updateMove;
	Game_Picture.prototype.updateMove = function() {
		//if (!!this._needMoveRatio && !!this._moveRatioMap) {
		if (!!this._moveRatioMap) {
			var moveRatio = 1;
			for (var keyName in this._moveRatioMap) {
				if (Input.isPressed(keyName)) {
					moveRatio = this._moveRatioMap[keyName];
					if (moveRatio == -1) {
						// pause : 暂停
						return ;
					}
					else if (moveRatio == -2) {
						// skip : 非常快速的 moveRatio
						moveRatio = this._duration + 1;
					}
					break;
				}
			}

			if (moveRatio > 0 && moveRatio != 1) {
				if (this._duration > 0) {
					this._duration /= moveRatio; // 设置
				}
				_MK_Game_Picture_updateMove.apply(this, arguments);
				if (this._duration > 0) {
					this._duration *= moveRatio; // 还原
				}
				else {
					// 移动结束 全部还原
					this._moveRatioMap = null;
				}
			}
			else {
				_MK_Game_Picture_updateMove.apply(this, arguments);
			}
		}
		else {
			_MK_Game_Picture_updateMove.apply(this, arguments);
		}
	};

	const _MK_Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
	Game_Interpreter.prototype.updateWaitMode = function () {
		if (this._waitMode == 'movePicture') {
			if (!!this._movingPicture && this._movingPicture._duration > 0) {
				return true;
			}
			else {
				this._waitMode = '';
				this._movingPicture = null;
			}
		}
		else {
			!!this._movingPicture && (this._movingPicture = null);
			return _MK_Game_Interpreter_updateWaitMode.apply(this, arguments);
		}
	};

	const _MK_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_MK_Game_Interpreter_pluginCommand.apply(this, arguments);
		if (command == 'MovePicture') {
			var nextCommand = this._list[this._index + 1] || {};
			if (nextCommand.code !== 232) return ;
			this._index++;
			var params = nextCommand.parameters || [];

			var args = args.concat().filter((s) => !!s); // 去除空字符串，允许插件指令中多空格
			params[10] = Number(args.shift()) || 1; // 移动时间
			
			// command232 移动图片
			var x, y;
			if (params[3] === 0) {
				x = params[4];
				y = params[5];
			} else {
				x = $gameVariables.value(params[4]);
				y = $gameVariables.value(params[5]);
			}
			$gameScreen.movePicture(params[0], params[2], x, y, params[6],
				params[7], params[8], params[9], params[10]);

			if (params[11]) {
				var pictureId = params[0];
				var picture = $gameScreen.picture(pictureId);
				this._movingPicture = picture;
				this.setWaitMode('movePicture');

				var ratioMap = {};
				while (args.length >= 2) {
					var keyName = String(args.shift()) || '';
					var moveRatio = args.shift() || '';
					if (moveRatio == '#pause#') {
						moveRatio = -1;
					}
					else if (moveRatio == '#skip#') {
						moveRatio = -2;
					}
					else {
						moveRatio = Number(moveRatio) || 0;
					}
					ratioMap[keyName] = moveRatio;
				}
				picture._moveRatioMap = ratioMap;
			}
		}
	};

})();



