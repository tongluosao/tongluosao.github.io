//=============================================================================
// MK_TextSprite.js
// 文本精灵
//=============================================================================
//  author : Mikan 
//  plugin : MK_TextSprite.js 文本精灵
// version : v0.1.0.fix1.temp2 2021/10/11 (临时)文字宽度考虑文字描边
// ------------------------------------------------------------------------------
// [Twitter] https://twitter.com/_MikanHako/
// -[GitHub] https://github.com/MikanHako1024/
// ---[Blog] NONE
// -----[QQ] 312859582
//=============================================================================



/*:
 * @plugindesc 文本精灵 <MK_TextSprite>
 * @author Mikan 
 * @version v0.1.0.fix1.temp2 2021/10/11 (临时)文字宽度考虑文字描边
 * v0.1.0.fix1.temp1 2021/10/09 (临时)文字宽度考虑文字描边
 * v0.1.0.fix1 2020/11/14 修复绘制文字不会同步字体的问题
 * v0.1.0 2020/11/11 完成基本框架和功能的demo
 *     把最初的MK_AnimatedMessage分成了MK_SpriteAnimManager和MK_TextSprite
 * v0.0.0 2020/08/20 项目计划中
 * 
 * 
 * @param ==== 游戏参数配置 ====
 * 
 * @param 
 * @text 
 * @desc 
 * @type 
 * @default 
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
 * 本插件(MK_TextSprite)用来播放动画
 * 设置动画和动画参数由另一个插件(MK_SpriteAnimManager)负责
 * 
 * 首先对动画进行配置，详细操作见 插件【MK_SpriteAnimManager】
 * 之后在编辑消息时，使用特殊字串触发一些播放动画的操作，
 * 如：创建动画、播放动画、暂停动画 等
 * 详见 【使用方法】
 * 
 * 
 * ---- 插件指令 ----
 * 
 * NONE
 * 
 * ---- 使用方法 ----
 * 
 * 在【显示文本】之前，需要设置动画，详见 插件【MK_SpriteAnimManager】，
 * 之后在【显示文本】里编辑消息时，使用类似 \ABC 或 \ABC[123] 的字串(下述称为【控制字符】)触发操作。
 * 
 * # 控制字符
 * 
 *   用于消息窗口显示文本的 特殊符号
 *   不区分大小写，参数只能使用数字
 * 
 *   ## 文本动画相关
 * 
 *     控制字符              简述            描述
 *     \TEXTANIM[动画id] : textanim      : 为文本创建一个指定动画
 *     \TAPLAY[动画id]   : TA play       : 播放指定动画(不会默认播放)
 *     \TAPAUSE[动画id]  : TA pause      : 暂停指定动画
 *     \TACONT[动画id]   : TA cont       : 继续指定动画
 *     \TASTOP[动画id]   : TA stop       : 停止指定动画
 *     \TAADDOFF[动画id] : TA add off    : 关闭指定动画添加文本
 *     \TAADDON[动画id]  : TA add on     : 开启指定动画添加文本(默认开启)
 * 
 *   ## RM自带控制字符
 * 
 *     编辑【显示文本】时，把鼠标放在文本框中等待数秒，可以看到官方的描述
 * 
 * 
 * # 动画列表，详细说明和参数见插件【MK_TextSprite】
 * 
 *   动画id	动画效果
 *   1		淡入淡出
 *   2		缩放
 *   3		翻转
 *   4		上下出现
 *   5		震动
 *   6		剧烈缩放
 *   7		波浪缩放
 *   8		旋涡
 *   9		摇晃
 *   10 	随机
 *   11 	卡拉OK
 * 
 * 
 * # 示例
 * 
 *   ## 让一段文字同时淡入显示
 *       配置动画id=101为基础动画id=1
 *       显示文本 : \TextAnim[101]\>我是一段文字\TAplay[101]
 *     ### 说明
 *       首先创建动画，使得之后的文字能被动画识别 : \TextAnim[101]
 *       文字需要同时显示，所以需要开启快速显示模式，详见 【RM自带控制字符】说明 : \>
 *       之后输入需要的文字
 *       最后开启动画，使得文字同时进行动画 : \TAplay[101]
 *   
 *   ...
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
 * □ 添加使用文本精灵模式的控制字符，以减少普通模式下的不稳定性
 * □ 消息窗口关闭时，停止(?或销毁)动画实例
 * □ 绘画文字时，考虑文字阴影，增加宽度
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
 */




//-----------------------------------------------------------------------------
// MK_TextBitmap
// 拓展contents 修改drawText

function MK_TextBitmap() {
    this.initialize.apply(this, arguments);
};

MK_TextBitmap.prototype = Object.create(Bitmap.prototype);
MK_TextBitmap.prototype.constructor = MK_TextBitmap;

MK_TextBitmap.prototype.initialize = function(width, height) {
    Bitmap.prototype.initialize.apply(this, arguments);

    this._textSprite = null;
    this._textMode = false;
};

MK_TextBitmap.prototype.setTextSprite = function(sprite) {
    this._textSprite = sprite;
};
MK_TextBitmap.prototype.textModeOn = function() {
    this._textMode = true;
};
MK_TextBitmap.prototype.textModeOff = function() {
    this._textMode = false;
};

MK_TextBitmap.prototype.needTextMode = function() {
    return this._textMode && this._textSprite;
};

MK_TextBitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
	if (this.needTextMode()) {
		var bitmap = new Bitmap(this.measureTextWidth(text) + this.outlineWidth, lineHeight);
		var sprite = new Sprite(bitmap);
		sprite.x = x - this.outlineWidth / 2;
		sprite.y = y;
		var canvas = this._canvas;
		var context = this._context;
		this.__canvas = bitmap._canvas;
		this.__context = bitmap._context;
		this.textModeOff();
		//this.drawText(text, 0, 0, maxWidth, lineHeight, align);
		this.drawText(text, this.outlineWidth / 2, 0, maxWidth + this.outlineWidth, lineHeight, align);
		this.textModeOn();
		this.__canvas = canvas;
		this.__context = context;
		this._textSprite.addLetterSprite(sprite);
	}
	else {
		Bitmap.prototype.drawText.apply(this, arguments);
	}
};

MK_TextBitmap.prototype.clearTextSprite = function() {
	this._textSprite.clearLetters();
};

MK_TextBitmap.prototype.clear = function() {
	Bitmap.prototype.clear.apply(this, arguments);
	this.clearTextSprite();
};





//-----------------------------------------------------------------------------
// MK_TextSprite
// 字母容器

// 借助MK_TextBitmap，把本应该绘制在contents的文字，生成单独的精灵，挂在MK_TextSprite里

// MK_TextSprite不再存储动画参数，而是由MK_SpriteAnimManager储存
// MK_TextSprite不再处理动画，而是由MK_TextAnimBase处理动画逻辑，以及保存动画播放信息
// 每个精灵的信息 仍由文字的精灵存储
// MK_TextSprite是精灵容器，同时储存动画，控制动画

function MK_TextSprite() {
	this.initialize.apply(this, arguments);
};

MK_TextSprite.prototype = Object.create(Sprite.prototype);
MK_TextSprite.prototype.constructor = MK_TextSprite;

MK_TextSprite.prototype.initialize = function() {
	Sprite.prototype.initialize.apply(this, arguments);

	// 文字精灵列表
	this.initLetterList();

	// 文本动画列表
	this.initTextAnimList();

	// 消息窗口
	this._msgWindow = null;
};

MK_TextSprite.prototype.init = function() {
	this.bitmap = null;

	// 文字精灵列表
	this.initLetterList();

	// 文本动画列表
	this.initTextAnimList();

	// 消息窗口
	this._msgWindow = null;
};



// --------------------------------
// 文字精灵列表

MK_TextSprite.prototype.initLetterList = function() {
	this._letters = [];
};

MK_TextSprite.prototype.clearLetters = function() {
	this._letters = [];
	this.removeChildren();
};



// --------------------------------
// 添加文字精灵

MK_TextSprite.prototype.addLetterSprite = function(sprite) {
	this.addTextAnimTarget(sprite);

	this._letters.push(sprite);

	this.addChild(sprite);
};

MK_TextSprite.prototype.addTextAnimTarget = function(sprite) {
	this._textAnimList.forEach(function(textAnim) {
		textAnim.addTarget(sprite);
	}, this);
};



// --------------------------------
// 文本动画列表

MK_TextSprite.prototype.initTextAnimList = function() {
	this._textAnimList = [];
};

MK_TextSprite.prototype.getTextAnim = function(code) {
	return this._textAnimList[code];
};



// --------------------------------
// 添加文本动画

MK_TextSprite.prototype.addTextAnim = function(textAnim) {
	this._textAnimList[textAnim.getAnimCode()] = textAnim;
	textAnim.setTargets(this._letters);
};

MK_TextSprite.prototype.createTextAnim = function(code) {
	return MK_SpriteAnimManager.createSpriteAnim(code);
};

MK_TextSprite.prototype.addTextAnimByCode = function(code) {
	var textAnim = this.createTextAnim(code);
	!!textAnim && this.addTextAnim(textAnim);
};



// --------------------------------
// update

MK_TextSprite.prototype.update = function() {
	this.updateTextAnim();
	Sprite.prototype.update.apply(this, arguments);
};

MK_TextSprite.prototype.updateTextAnim = function() {
	this._textAnimList.forEach(function(textAnim) {
		!!textAnim && textAnim.update();
	}, this);
};



// --------------------------------
// 控制动画

MK_TextSprite.prototype.setFlagAutoOn = function(code) {
	var textAnim = this.getTextAnim(code);
	!!textAnim && textAnim.setFlagAutoOn();
};
MK_TextSprite.prototype.setFlagAutoOff = function(code) {
	var textAnim = this.getTextAnim(code);
	!!textAnim && textAnim.setFlagAutoOff();
};

MK_TextSprite.prototype.setFlagPlayOn = function(code) {
	var textAnim = this.getTextAnim(code);
	!!textAnim && textAnim.setFlagPlayOn();
};
MK_TextSprite.prototype.setFlagPauseOn = function(code) {
	var textAnim = this.getTextAnim(code);
	!!textAnim && textAnim.setFlagPauseOn();
};
MK_TextSprite.prototype.setFlagContinueOn = function(code) {
	var textAnim = this.getTextAnim(code);
	!!textAnim && textAnim.setFlagContinueOn();
};
MK_TextSprite.prototype.setFlagStopOn = function(code) {
	var textAnim = this.getTextAnim(code);
	!!textAnim && textAnim.setFlagStopOn();
};

MK_TextSprite.prototype.setFlagInitOn = function(code) {
	var textAnim = this.getTextAnim(code);
	!!textAnim && textAnim.setFlagInitOn();
};
MK_TextSprite.prototype.setFlagInitOff = function(code) {
	var textAnim = this.getTextAnim(code);
	!!textAnim && textAnim.setFlagInitOff();
};

MK_TextSprite.prototype.setFlagEnabledOn = function(code) {
	var textAnim = this.getTextAnim(code);
	!!textAnim && textAnim.setFlagEnabledOn();
};
MK_TextSprite.prototype.setFlagEnabledOff = function(code) {
	var textAnim = this.getTextAnim(code);
	!!textAnim && textAnim.setFlagEnabledOff();
};


MK_TextSprite.prototype.setFlagAllowAddOn = function(code) {
	var textAnim = this.getTextAnim(code);
	!!textAnim && textAnim.setFlagAllowAddOn();
};
MK_TextSprite.prototype.setFlagAllowAddOff = function(code) {
	var textAnim = this.getTextAnim(code);
	!!textAnim && textAnim.setFlagAllowAddOff();
};



// --------------------------------
// 消息窗口

// 设置消息窗口，传给需要的动画实例使用

MK_TextSprite.prototype.setMsgWindow = function(msgWindow) {
	this._msgWindow = msgWindow;
};





//-----------------------------------------------------------------------------
// 修改 Window_Message

(function() {

var _MK_Window_Message__createAllParts   = Window_Message.prototype._createAllParts;
Window_Message.prototype._createAllParts = function() {
	_MK_Window_Message__createAllParts.apply(this, arguments);
	this._infoTextSprite = new MK_TextSprite();
	this._windowContentsSprite.addChildAt(this._infoTextSprite, 0);
};

var _MK_Window_Message_createContents   = Window_Message.prototype.createContents;
Window_Message.prototype.createContents = function() {
	_MK_Window_Message_createContents.apply(this, arguments);

    this.contents = new MK_TextBitmap(this.contentsWidth(), this.contentsHeight());
	this.contents.setTextSprite(this._infoTextSprite);
	this.contents.textModeOn();
    this.resetFontSettings();
};

var _MK_Window_Message_startMessage   = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
	this._infoTextSprite.init();
	this._infoTextSprite.setMsgWindow(this);
	_MK_Window_Message_startMessage.apply(this, arguments);
};



var _MK_Window_Message_processEscapeCharacter   = Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function(code, textState) {
	switch (code) {

	// 消息中的obtainEscapeCode获取到的字母是大写字母，且是纯字母

	case 'TEXTANIM': // create text anim
		var param = this.obtainEscapeParam(textState);
		this._infoTextSprite.addTextAnimByCode(param || 0);
		break;

	case 'TAPLAY': // text anim play
		var param = this.obtainEscapeParam(textState);
		this._infoTextSprite.setFlagPlayOn(param || 0);
		break;
	case 'TAPAUSE': // text anim pause
		var param = this.obtainEscapeParam(textState);
		this._infoTextSprite.setFlagPauseOn(param || 0);
		break;
	case 'TACONT': // text anim continue
		var param = this.obtainEscapeParam(textState);
		this._infoTextSprite.setFlagContinueOn(param || 0);
		break;
	case 'TASTOP': // text anim stop
		var param = this.obtainEscapeParam(textState);
		this._infoTextSprite.setFlagStopOn(param || 0);
		break;

	case 'TAADDON': // text anim add(allow add) on
		var param = this.obtainEscapeParam(textState);
		this._infoTextSprite.setFlagAllowAddOn(param || 0);
		break;
	case 'TAADDOFF': // text anim add(allow add) off
		var param = this.obtainEscapeParam(textState);
		this._infoTextSprite.setFlagAllowAddOff(param || 0);
		break;

	case 'TAACTON': // text anim active(enabled) on
		var param = this.obtainEscapeParam(textState);
		this._infoTextSprite.setFlagEnabledOn(param || 0);
		break;
	case 'TAACTOFF': // text anim active(enabled) off
		var param = this.obtainEscapeParam(textState);
		this._infoTextSprite.setFlagEnabledOff(param || 0);
		break;

	default:
		_MK_Window_Message_processEscapeCharacter.apply(this, arguments);
		break;
	}
};

})();



