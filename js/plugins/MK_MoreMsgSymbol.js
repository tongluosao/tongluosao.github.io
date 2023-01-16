//=============================================================================
// MK_MoreMsgSymbol.js
// 更多控制字符
//=============================================================================
//  author : Mikan 
//  plugin : MK_MoreMsgSymbol.js 更多控制字符
// version : v0.0.2 2020/11/11 增加任意帧数等待功能
// ------------------------------------------------------------------------------
// [Twitter] https://twitter.com/_MikanHako/
// -[GitHub] https://github.com/MikanHako1024/
// ---[Blog] NONE
// -----[QQ] 312859582
//=============================================================================




/*:
 * @plugindesc 更多控制字符 <MK_MoreMsgSymbol>
 * @author Mikan 
 * @version v0.0.2 2020/11/11 增加任意帧数等待功能
 * v0.0.1 2020/11/09 最初的demo
 *     从MK_AnimatedMessage中分离出的独立的功能
 * 
 * 
 * 
 * 
 * @help
 * 
 * ---- 简要说明 ----
 * 
 * 本插件用于在消息窗口中增加额外的操作
 * 
 * 在编辑消息时，使用类似 \ABC 或 \ABC[123] 的字串(下述称为【控制字符】)
 * 触发 其他操作 或 显示其他文本
 * (编辑消息时，把鼠标放在文本框中等待数秒，可以看到官方的描述)
 * 
 * ---- 插件指令 ----
 * 
 * NONE
 * 
 * ---- 使用方法 ----
 * 
 * 在编辑消息时，
 * 使用类似 \ABC 或 \ABC[123] 的字串(下述称为【控制字符】)，
 * 用来 触发其他操作 或 显示其他文本。
 * (编辑【显示文本】时，把鼠标放在文本框中等待数秒，可以看到官方的描述)
 * 
 * # 控制字符
 * 
 *   ## 触发其他操作
 * 
 *   ### MV默认
 *   \C[..] : 改变文字颜色
 *   \I[..] : 显示图标
 *   \{     : 增大一号字体
 *   \}     : 缩小一号字体
 *   \$     : 打开金钱窗口
 *   \.     : 等待15帧
 *   \|     : 等待60帧
 *   \!     : 开始等待
 *   \>     : 快速显示
 *   \<     : 结束快速显示
 *   \^     : 跳过等待
 * 
 *   ### 新增
 *     控制字符     描述       参数
 *    \PSIGN[..] : 控制箭头   0:关闭(仅该次) 1:显示
 *    \WAIT[..]  : 等待       等待帧数
 * 
 * ---- 其他说明 ----
 * 
 * TODO
 * 
 * ---- 标签设置 ----
 * 
 * NONE
 * 
 * ---- 参数描述 ----
 * 
 * NONE
 * 
 * ---- 用语说明 ----
 * 
 * NONE
 * 
 * ---- 开发方法 ----
 * 
 * TODO
 * 
 * ---- 后续任务 ----
 * 
 * □ 完善开发方法
 * □ 扩展控制字符的参数的格式，使得不再只能用数值，还可以用字母等
 * ...
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
 * @param ==== 插件指令配置 ====
 * 
 * @param ==== 内容数据配置 ====
 * 
 * @param ==== under ====
 * 
 */




//-----------------------------------------------------------------------------
// 显示隐藏消息窗口的暂停箭头

// PSIGN[0], PSIGN[1]

(function () {

var _MK_Window_Message_startMessage   = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
	this._hidePauseSign = false;
	_MK_Window_Message_startMessage.apply(this, arguments);
};

var _MK_Window_Message__updatePauseSign   = Window_Message.prototype._updatePauseSign;
Window_Message.prototype._updatePauseSign = function() {
	_MK_Window_Message__updatePauseSign.apply(this, arguments);
	if (this._hidePauseSign) {
		this._windowPauseSignSprite.visible = false;
	}
};

})();




//-----------------------------------------------------------------------------
// 修改 Window_Message

(function () {

var _MK_Window_Message_processEscapeCharacter   = Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function(code, textState) {
	switch (code) {

	// 消息中的obtainEscapeCode获取到的字母是大写字母，且是纯字母

	case 'PSIGN': // pauseSign
		var param = this.obtainEscapeParam(textState);
		if (!!param) this._hidePauseSign = false;
		else this._hidePauseSign = true;
		break;

	case 'WAIT': // wait
		var param = this.obtainEscapeParam(textState);
		this.startWait(param || 0);
		break;

	default:
		_MK_Window_Message_processEscapeCharacter.apply(this, arguments);
		break;
	}
};

})();

