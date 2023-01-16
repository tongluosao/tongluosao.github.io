//=============================================================================
// MK_SpriteAnimManager.js
// 精灵动画管理器
//=============================================================================
//  author : Mikan 
//  plugin : MK_SpriteAnimManager.js 精灵动画管理器
// version : v0.1.0 2020/11/11 完成基本框架和功能的demo
// ------------------------------------------------------------------------------
// [Twitter] https://twitter.com/_MikanHako/
// -[GitHub] https://github.com/MikanHako1024/
// ---[Blog] NONE
// -----[QQ] 312859582
//=============================================================================




/*:
 * @plugindesc 精灵动画管理器 <MK_SpriteAnimManager>
 * @author Mikan 
 * @version v0.1.0 2020/11/11 完成基本框架和功能的demo
 *     把最初的MK_AnimatedMessage分成了MK_SpriteAnimManager和MK_TextSprite
 * v0.0.0 2020/08/20 项目计划中
 * 
 * 
 * 
 * 
 * @help
 * 
 * ---- 简要说明 ----
 * 
 * 本插件(MK_SpriteAnimManager)用来设置动画和动画参数
 * 播放动画由另一个插件(MK_TextSprite)负责
 * 
 * 首先对动画进行配置，
 * 每个动画id可以指定一个基础动画，并且可以配置一组参数，操作详见 【插件指令】
 * 之后在编辑消息使用特殊字串触发一些播放动画的操作，详见 插件【MK_TextSprite】
 * 
 * # 动画id
 *   动画分为基础动画和自定义参数动画
 *       基础动画拥有固定的默认参数，id分布在0~99
 *       自定义参数动画可以指定一个基础动画，并使用自己设置的参数，id分布在100及以后
 * 
 * # 动画参数
 *   可以在插件参数中配置初始动画参数，
 *       每条配置：有一个动画id，一个基础动画id，和一组参数
 *       每条参数：有一个参数序号或一个参数名，和一个参数值
 *   也可以通过插件指令，在游戏中修改动画参数，详见 【插件指令】
 * 
 *   在游戏中进行的修改并不会保存，
 *   这里的建议是，在插件参数中配置需要大量使用的固定的参数组，需要使用时直接使用对应id即可
 * 
 * 
 * ---- 插件指令 ----
 * 
 *   # 设置动画
 *     ## 设置在新id上设置动画id
 *       AnimMgr setAnim 自定义动画id 默认动画id
 *     ## 清除设置的动画id
 *       AnimMgr setAnim 自定义动画id 0
 * 
 *   # 设置动画参数
 *     ## 指定动画id，按参数序号设置一个参数值
 *       AnimMgr setParam 动画id 参数序号 参数值
 *     ## 指定动画id，按参数名设置一个参数值
 *       AnimMgr setParamByKey 动画id 参数名 参数值
 *     ## 指定动画id，按顺序设置所有参数值
 *       AnimMgr setParams 动画id 参数值1 参数值2 参数值3 ..
 *     ## 指定动画id，清除设置所有参数值
 *       AnimMgr clearparams 动画id
 * 
 * 
 * ---- 使用方法 ----
 * 
 * 使用插件参数或插件指令对动画进行设置，
 * 再使用其他插件播放动画 如 插件【MK_TextSprite】
 * 
 * ...
 * 
 * ---- 其他说明 ----
 * 
 * # 动画列表
 * 
 *     动画id	动画效果		动画名
 * 				描述
 * 							参数序号    参数说明    参数名    参数类型    参数默认值
 * 
 *   ## MOG_AnimterdText
 *     1		淡入淡出
 * 				Fade		xxxx
 *                         	0	初始不透明度		opacityStart	数值		0
 *                         	1	结束不透明度		opacityEnd		数值		255
 *                         	2	不透明度变化速度	opacitySpeed	数值		5
 *     2		缩放
 * 				Zoom		xxxx
 *                         	0	初始不透明度		opacityStart	数值		0
 *                         	1	结束不透明度		opacityEnd		数值		255
 *                         	2	不透明度变化速度	opacitySpeed	数值		4
 *                         	3	初始X缩放		scaleXStart		数值		2.0
 *                         	4	结束X缩放		scaleXEnd		数值		1.0
 *                         	5	X缩放变化速度		scaleXSpeed		数值		-0.04
 *                         	6	初始Y缩放		scaleYStart		数值		2.0
 *                         	7	结束Y缩放		scaleYEnd		数值		1.0
 *                         	8	Y缩放变化速度		scaleYSpeed		数值		-0.04
 *     3		翻转
 * 				Zoom2		xxxx
 *                         	0	初始不透明度		opacityStart	数值		0
 *                         	1	结束不透明度		opacityEnd		数值		255
 *                         	2	不透明度变化速度	opacitySpeed	数值		4
 *                         	3	初始X缩放		scaleXStart		数值		-1.0
 *                         	4	结束X缩放		scaleXEnd		数值		1.0
 *                         	5	X缩放变化速度		scaleXSpeed		数值		0.02
 *                         	6	初始Y缩放		scaleYStart		数值		2.0
 *                         	7	结束Y缩放		scaleYEnd		数值		1.0
 *                         	8	Y缩放变化速度		scaleYSpeed		数值		-0.02
 *     4		上下出现
 * 				Wipe		xxxx
 *                         	0	x		x	数值		x
 *                         	1	x		x	数值		x
 *                         	2	x		x	数值		x
 *     5		震动	
 * 				Shake		xxxx
 *                         	0	震动间隔(帧数)		shakeWaitCount	数值		3
 *                         	1	震动幅度(像素)		shakeAmplitude	数值		3
 *                         	2	是否停止(0不停;1停)	shakeNeedStop	数值		0
 *                         	3	震动总计数(若停止)	shakeTotalCount	数值		12
 *     6		剧烈缩放
 * 				Zoom3		xxxx
 *                         	0	初始不透明度		opacityStart	数值		0
 *                         	1	结束不透明度		opacityEnd		数值		255
 *                         	2	不透明度变化速度	opacitySpeed	数值		20
 *                         	3	初始X缩放		scaleXStart		数值		4.0
 *                         	4	结束X缩放		scaleXEnd		数值		1.0
 *                         	5	X缩放变化速度		scaleXSpeed		数值		-0.2
 *                         	6	初始Y缩放		scaleYStart		数值		4.0
 *                         	7	结束Y缩放		scaleYEnd		数值		1.0
 *                         	8	Y缩放变化速度		scaleYSpeed		数值		-0.2
 *                         	9	震动间隔(帧数)		shakeWaitCount	数值		3
 *                         	10	震动幅度(像素)		shakeAmplitude	数值		3
 *                         	11	是否停止(0不停;1停)	shakeNeedStop	数值		0
 *                         	12	震动总计数(若停止)	shakeTotalCount	数值		12
 *     7		波浪缩放
 * 				Wave		xxxx
 *                         	0	缩放速度					scaleSpeed	数值		0.015
 *                         	1	缩放帧数(来或回一次的)	scaleCount	数值		30
 *                         	2	总循环次数				loopTotal	数值		1
 *     8		旋涡
 * 				Rotation	xxxx
 *                         	0	x	x	数值		0.x
 *                         	1	x	x	数值		x
 *                         	2	x	x	数值		x
 *     9		摇晃
 * 				Swing		xxxx
 *                         	0	旋转速度(角度/帧)			rotateSpeed		数值		0.02
 *                         	1	初始旋转方向(L逆;R顺)		rotateInitDir	文本		R
 *                         	2	初始角度(正顺;负逆)		angleInit		数值		0
 *                         	3	角度左范围				angleRangeL		数值		-0.4
 *                         	4	角度右范围				angleRangeR		数值		0.4
 *     10		随机
 * 				Random		xxxx
 *                         	0	初始不透明度			opacityStart	数值		0
 *                         	1	结束不透明度			opacityEnd		数值		255
 *                         	2	不透明度变化速度		opacitySpeed	数值		4
 *                         	3	缩放最小范围			scaleRangeMin	数值		0.7
 *                         	4	缩放最大范围			scaleRangeMax	数值		1.4
 *                         	5	旋转范围				rotateRange		数值		0.4
 *                         	6	旋转方向(L逆;R顺)		rotateDir		文本		R
 * 
 *   ## 新增
 *     11		卡拉OK
 * 				Karaoke		模仿卡拉OK播放的效果
 *                         	0	初始不透明度			playSpeed	数值		2
 *                         	1	边框线宽				lineWidth	数值		4
 *                         	2	播放前文本边框颜色	uLineColor	文本		#FFFFFF
 *                         	3	播放前文本颜色		uTextColor	文本		#000000
 *                         	4	播放后文本边框颜色	dLineColor	文本		#000000
 *                         	5	播放后文本颜色		dTextColor	文本		#FFFFFF
 * 
 * # 对于简化设置决定的说明
 * 
 * 简化设置方面，有两种方案：
 * 一是保存在游戏存档中
 *     可以保存，所以在游戏开始时进行统一设置即可，这样可能会因为使用过期存档而失效
 * 二是使用插件参数进行设置
 *     这样每次启动会重置设置，所以不能保存，但是不会因为使用过期存档而失效
 * 二者不能兼得。
 * 这里使用方案二，原因如下：
 *     考虑到 固定设置的情况 比 根据游戏情况需要调整设置的情况 多；
 *     因为变数多，而使得保险起见会在使用前再次进行设置，所以使用到保存数据的设置的情况较少；
 *     多次使用固定设置时，为了方便调整设置，不建议在每次使用前都进行设置，
 *         作为代替的是，使用固定的一组设置，并把这组设置放在插件参数中。
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
 * □ 更符合Karaoke
 * TODO
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
 * @param AnimParamsConfig
 * @text 动画参数配置
 * @desc 
 * @type struct<AnimParams>[]
 * @default []
 * 
 * @param ==== under ====
 * 
 */
/*~struct~AnimParams:
 *
 * @param animCode
 * @text 动画id
 * @desc 
 * @type number
 * @default 100
 *
 * @param baseAnimCode
 * @text 基础动画id
 * @desc 
 * @type number
 * @default 0
 *
 * @param params
 * @text 
 * @desc 
 * @type struct<AnimParam>[]
 * @default []
 * 
 */
/*~struct~AnimParam:
 *
 * @param index
 * @text 
 * @desc 
 * @type number
 * @default 0
 *
 * @param key
 * @text 
 * @desc 
 * @type string
 * @default 
 *
 * @param value
 * @text 
 * @desc 
 * @type string
 * @default 
 * 
 */


 

var MK_Data = MK_Data || {};
MK_Data.paramGet = MK_Data.paramGet || {};
MK_Data.param = MK_Data.param || {};
MK_Data.paramParse = MK_Data.paramParse || {};
MK_Data.class = MK_Data.class || {};

MK_Data.getPluginParam = MK_Data.getPluginParam ||
function (pluginName) {
	var param = PluginManager.parameters(pluginName);
	if (!param || JSON.stringify(param) === '{}') {
		var list = $plugins.filter(function (i) {
			return i.description.contains('<' + pluginName + '>');
		});
		if (list.length > 0) {
			var realPluginName = list[0].name;
			if (realPluginName && realPluginName !== pluginName)
				return PluginManager.parameters(realPluginName);
			else return {};
		}
		else return {};
	}
	return param;
};




//-----------------------------------------------------------------------------
// MK_SpriteAnimManager
// 文本动画管理器

function MK_SpriteAnimManager() {
    throw new Error('This is a static class');
};


// --------------------------------
// 动画编号映射表

// 映射表MapTable 映射值Mapping
// 映射表分为基础映射表和用户映射表
// 基础映射表序号分布为 0 到 99(MAX_ANIM_SIZE)
// 用户映射表序号分布为 100(MAX_ANIM_SIZE+1)以后
// 基础映射表为所有基础动画(系统动画)的code->key映射
// 用户映射表为用户设定的uCode->bCode(基础动画code)

MK_SpriteAnimManager.EMPTY_ANIM_CODE = 0;

// 基础映射表
MK_SpriteAnimManager._baseAnimMapTable = [
	// Empty
	'', 		// 0

	// MOG_AnimterdText
	'fade', 	// 1
	'zoom', 	// 2
	'zoom2', 	// 3
	'wipe', 	// 4
	'shake', 	// 5
	'zoom3', 	// 6
	'wave', 	// 7
	'rotation', // 8
	'swing', 	// 9
	'random', 	// 10

	// added
	'karaoke', 		// 11 // TODO
];
MK_SpriteAnimManager.getBaseMapTable = function() {
	return this._baseAnimMapTable;
};

// 用户映射表
MK_SpriteAnimManager._userAnimMapping = [];
MK_SpriteAnimManager.getUserMapTable = function() {
	return this._userAnimMapping;
};

MK_SpriteAnimManager.MAX_ANIM_SIZE = 99;
MK_SpriteAnimManager.maxAnimSize = function() {
	return this.MAX_ANIM_SIZE;
};
MK_SpriteAnimManager.isBaseMappingCode = function(code) {
	return code <= this.maxAnimSize();
};
MK_SpriteAnimManager.isUserMappingCode = function(code) {
	return code > this.maxAnimSize();
};

MK_SpriteAnimManager.setUserMapping = function(uCode, bCode) {
	if (this.isUserMappingCode(uCode) && this.isBaseMappingCode(bCode)) {
		this.getUserMapTable()[uCode] = bCode;
	}
};
MK_SpriteAnimManager.getUserMapping = function(uCode) {
	if (this.isUserMappingCode(uCode)) {
		var bCode = this.getUserMapTable()[uCode];
		if (this.isBaseMappingCode(bCode)) {
			return bCode;
		}
	}
	return this.EMPTY_ANIM_CODE;
};



// --------------------------------
// 动画编号映射

MK_SpriteAnimManager.codeToAnim = function(code) {
	if (this.isUserMappingCode(code)) {
		return this.getBaseMapping(this.getUserMapping(code));
	}
	else if (this.isBaseMappingCode(code)) {
		return this.getBaseMapping(code);
	}
	else {
		return this.EMPTY_ANIM_CODE;
	}
};



// --------------------------------
// 动画参数

// 每个动画的参数列表
// 基础动画的参数值为默认参数值，不可修改
// 用户动画的参数值默认为对应基础动画参数值，可以修改，不严格限制参数格式

MK_SpriteAnimManager._animParam = [];

MK_SpriteAnimManager.setAnimParam = function(code, index, value) {
	if (!this._animParam[code]) {
		this._animParam[code] = [];
	}
	this._animParam[code][index] = value;
};
MK_SpriteAnimManager.setAnimParams = function(code, values) {
	if (!Array.isArray(values)) {
		values = [values];
	}
	this._animParam[code] = values;
};

MK_SpriteAnimManager.getAnimParam = function(code, index) {
	if (!this._animParam[code]) return ;
	else return this._animParam[code][index];
};
MK_SpriteAnimManager.getAnimParams = function(code) {
	return this._animParam[code] || [];
};



// --------------------------------
// 参数 通过key

// 有 动画派生类列表 就可以获取 key->index 映射
MK_SpriteAnimManager.getParamIndex = function(code, key) {
	if (this.isUserMappingCode(code)) {
		code = this.getUserMapping(code);
	}
	animClass = this.getAnimClass(code);
	if (!!animClass) {
		return (new animClass()).getParamIndex(key);
	}
	else {
		return key;
	}
};

MK_SpriteAnimManager.setAnimParamByKey = function(code, key, value) {
	var index = this.getParamIndex(code, key);
	this.setAnimParam(code, index, value);
};
MK_SpriteAnimManager.getAnimParamByKey = function(code, key) {
	var index = this.getParamIndex(code, key);
	return this.getAnimParam(code, index);
};



// --------------------------------
// 动画派生类列表

MK_SpriteAnimManager._animClassList = [
];
MK_SpriteAnimManager.getAnimClass = function(code) {
	return this._animClassList[code];
};
MK_SpriteAnimManager.setAnimClass = function(code, animClass) {
	this._animClassList[code] = animClass;
};

MK_SpriteAnimManager.createSpriteAnimByRealCode = function(code) {
	var animClass = this.getAnimClass(code);
	if (!!animClass) {
		var args = [...arguments].splice(1);
		return new animClass(...args);
	}
	else {
		return null;
	}
};

MK_SpriteAnimManager.createSpriteAnim = function(code) {
	var bCode = this.isUserMappingCode(code) ? this.getUserMapping(code) : code;
	return this.createSpriteAnimByRealCode(bCode, code);
};



// --------------------------------
// 插件指令

(function () {

var _MK_Game_Interpreter_pluginCommand   = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
	_MK_Game_Interpreter_pluginCommand.apply(this, arguments);

	if ((command || '').toLowerCase() === 'animmgr') {
		var comm = (args[0] || '').toLowerCase();
		if (comm === 'setanim') { // setAnim
			var uCode = Number(args[1] || 0);
			var bCode = Number(args[2] || 0);
			MK_SpriteAnimManager.setUserMapping(uCode, bCode);
			// 不会自动清除动画参数
		}
		else if (comm === 'setparam') { // setParam
			var code  = Number(args[1] || 0);
			var index = Number(args[2] || 0);
			var value = Number(args[3] || null);
			MK_SpriteAnimManager.setAnimParam(code, index, value);
		}
		else if (comm === 'setparambykey') { // setParamByKey
			var code  = Number(args[1] || 0);
			var key   = Number(args[2] || '');
			var value = Number(args[3] || null);
			MK_SpriteAnimManager.setAnimParamByKey(code, key, value);
		}
		else if (comm === 'setparams') { // setParams
			var code   = Number(args[1] || 0);
			var values = args.concat().splice(2);
			MK_SpriteAnimManager.setAnimParams(code, values);
		}
		else if (comm === 'clearparams') { // clearParams
			// 清除参数，既设置参数列表为空列表
			var code   = Number(args[1] || 0);
			var values = [];
			MK_SpriteAnimManager.setAnimParams(code, values);
		}
	}
};

})();



// --------------------------------
// 插件参数初始化动画参数

(function() {

	// 提取插件参数

	var pluginName = 'MK_SpriteAnimManager';
	MK_Data.paramGet[pluginName] = MK_Data.getPluginParam(pluginName);
	MK_Data.param[pluginName] = {};
	MK_Data.paramParse[pluginName] = {};

	var paramGet   = MK_Data.paramGet[pluginName];
	var param      = MK_Data.param[pluginName];
	var paramParse = MK_Data.paramParse[pluginName];

	function parseAnimParam(str) {
		str = str || '{"index":0,"key":"","value":""}';
		var data = JSON.parse(str);
		data.index = Number(data.index ||  0);
		data.key   = String(data.key   || '');
		data.value = String(data.value || '');
		return data;
	}
	paramParse['parseAnimParam'] = parseAnimParam;

	function parseAnimParams(str) {
		str = str || '{"animCode":100,"baseAnimCode":0,"params":[]}';
		var data = JSON.parse(str);
		data.animCode     = Number(data.animCode     || 100);
		data.baseAnimCode = Number(data.baseAnimCode ||   0);
		data.params       = JSON.parse(data.params || '[]');
		for (var i = 0; i < data.params.length; i++) {
			data.params[i] = parseAnimParam(data.params[i]);
		}
		return data;
	}
	paramParse['parseAnimParams'] = parseAnimParams;

	function getAnimParamsConfig(str) {
		str = str || '[]';
		var data = JSON.parse(str);
		for (var i = 0; i < data.length; i++) {
			data[i] = parseAnimParams(data[i]);
		}
		return data;
	}
	paramParse['getAnimParamsConfig'] = getAnimParamsConfig;

	param['animParamsConfig'] = getAnimParamsConfig(paramGet['AnimParamsConfig'] || '[]');

})();





//-----------------------------------------------------------------------------
// MK_SpriteAnimBase
// 精灵动画基类

// 用来 控制文本精灵动画的类(动画类) 的基类
// 定义了 控制文本精灵动画的类(动画类) 的接口

// 一个动画类实例指定一个需要控制的精灵
// 动画相关数据存在动画类实例中，而不储存在精灵中
// 动画类实例可以挂在文本精灵(MK_TextAminSprite)中被精灵调用帧更新，也可以在其他地方调用帧更新
// 动画分为多个阶段(见下方动画流程)，阶段之间的变化在动画类实例的帧更新中完成

// ？TODO : 直接把动画类做成精灵，让父精灵自动调用动画类帧更新，同时减少对文本精灵的耦合 ...

// ？有些动画不能只由一个精灵完成 ...
// ？可能需要多个精灵共同配合 ...
// ？所以目标不能只有一个，而应该是一个列表 ...

// 动画流程 v0.1
// on_create  -> on_play  -> on_update -> on_stop -> on_destroy
// (on_start)       ↑           ↓            ↑       (on_end)
// (on_draw)  on_continue <- on_pause  ->    ↑

// 动画流程 v0.2
// 针对播放前、暂停时可能也需要进行操作，添加一些新的阶段
// 改名on_update为on_playing，以区别update的开始与结束之间的阶段
// 针对可能需要不管阶段的日常操作，添加帧更新开始和结束的阶段
// 改变流程绘制格式
// 添加阶段标识
// 添加阶段变换条件
// 区分瞬时阶段和循环阶段
// update {
//     on_update_start
//     on_update {
//         phase :   0 -> [auto]     -> on_start -> phase : 101
//         // ？on_create on_start on_draw 决定是on_start，而on_create作为创建动画示例的触发
// 
//         phase : 101 -> [auto]     -> on_pending  -> phase : 101  {loop}
//         phase : 101 -> [play]     -> on_play     -> phase : 102
//         phase : 102 -> [auto]     -> on_playing  -> phase : 102  {loop}
//         phase : 102 -> [stop]     -> on_stop     -> phase : 103
// 
//         phase : 102 -> [pause]    -> on_pause    -> phase : 201
//         phase : 201 -> [auto]     -> on_pausing  -> phase : 201  {loop}
//         phase : 201 -> [continue] -> on_continue -> phase : 102
//         phase : 201 -> [stop]     -> on_stop     -> phase : 103
//
//         phase : 103 -> [auto]     -> on_destroy  -> phase :  -1
//
//         phase :  -1 -> [init]     -> on_init     -> phase :   0
//     }
//     on_update_end
// }
// ？同时，因为要考虑播放时加入精灵，所以还要有一个initTarget方法
// on_addTarget
// on_initTarget
// 
// 操作(operation)
// on_create
// on_start
// on_pending
// on_play
// on_playing
// on_pause
// on_pausing
// on_continue
// on_stop
// on_destroy
// on_init
// 阶段(phase)
//   0 : 未创建
// - 1 : 已销毁
// 101 : 准备
// 102 : 开始
// 103 : 停止
// 201 : 暂停
// 标志(flag)
// [auto] 无条件，也作为一种标志
// [play]
// [pause]
// [continue]
// [stop]
// [init]
// [enabled] 启用
// [allowAdd] 允许添加

function MK_SpriteAnimBase() {
    this.initialize.apply(this, arguments);
};

MK_SpriteAnimBase.prototype = Object.create(Object.prototype);
MK_SpriteAnimBase.prototype.constructor = MK_SpriteAnimBase;

MK_SpriteAnimBase.prototype.initialize = function(code) {
	// 动画code
	this.initAnimCode(code);

	// 参数映射
	this._paramMapTable = {};
	this.initParamMapTable();

	// 目标
	this._targets = [];

	// 阶段
	this._phase = 0;

	// 标志
	this._flagAuto = true;
	this._flagPlay = false;
	this._flagPause = false;
	this._flagContinue = false;
	this._flagStop = false;
	this._flagInit = false;

	this._flagEnabled = true; // 是否启用的标记，用来禁用
	this._flagAllowAdd = true; // 是否允许添加精灵

	this.onCreate();
};



// --------------------------------
// 动画code

MK_SpriteAnimBase._DEFAULT_ANIM_CODE = 0;
MK_SpriteAnimBase.prototype.getDefaultAnimCode = function() {
	return this.constructor._DEFAULT_ANIM_CODE;
};

MK_SpriteAnimBase.prototype.getAnimCode = function() {
	return this._animCode;
};
MK_SpriteAnimBase.prototype.setAnimCode = function(code) {
	this._animCode = code;
};

MK_SpriteAnimBase.prototype.initAnimCode = function(code) {
	this.setAnimCode(code || this.getDefaultAnimCode());
};



// --------------------------------
// 目标列表

// 对于目标，分为多目标和单目标
// 多目标对应精灵列表
// 单目标对应精灵列表中的第一个

MK_SpriteAnimBase.prototype.setTargets = function(sprites) {
	if (!Array.isArray(sprites)) sprites = [sprites];
	//this._targets = sprites;
	this.initTargets();
	sprites.forEach(function(s) {
		this.addTarget(s);
	}, this);
};

MK_SpriteAnimBase.prototype.getTargets = function() {
	return this._targets || [];
};
MK_SpriteAnimBase.prototype.getTarget = function(index) {
	if (typeof index == 'number') {
		return this._targets[index];
	}
	else {
		return this._targets[0];
	}
};

MK_SpriteAnimBase.prototype.initTargets = function() {
	this._targets = [];
};



// --------------------------------
// 目标对象 (sprite + variable)

// 目标的变量不保存在目标精灵里
// 而是保存在动画类的目标中，并与精灵对应
// 所以添加目标时，要同时创建其保存变量的对象

MK_SpriteAnimBase.prototype.createTargetObjWithVar = function(sprite, varObj) {
	return {
		'sprite': sprite || null,
		'var': varObj || {},
	};
};
MK_SpriteAnimBase.prototype.createTargetObj = function(sprite) {
	return this.createTargetObjWithVar(sprite);
};



// --------------------------------
// 添加目标

MK_SpriteAnimBase.prototype.addTarget = function(sprite) {
	if (this._flagAllowAdd) {
		var targetObj = this.createTargetObj(sprite);
		this._targets.push(targetObj);
		var args = [...arguments].splice(1);
		this.onAddTarget(targetObj, ...args);
	}
};

MK_SpriteAnimBase.prototype.onAddTarget = function(targetObj) {
	this.onInitTarget(...arguments);
};

MK_SpriteAnimBase.prototype.onInitTarget = function(targetObj) {
};



// --------------------------------
// 标记

MK_SpriteAnimBase.prototype.getAnimFlagKey = function(flagName) {
	return '_flag' + flagName;
};

MK_SpriteAnimBase.prototype.setAnimFlag = function(flagName, value) {
	this[this.getAnimFlagKey(flagName)] = !!value;
};
MK_SpriteAnimBase.prototype.setAnimFlagOn = function(flagName) {
	this.setAnimFlag(flagName, true);
};
MK_SpriteAnimBase.prototype.setAnimFlagOff = function(flagName) {
	this.setAnimFlag(flagName, false);
};
MK_SpriteAnimBase.prototype.getAnimFlag = function(flagName) {
	return this[this.getAnimFlagKey(flagName)];
};

MK_SpriteAnimBase.prototype.setFlagAutoOn = function() {
	this.setAnimFlag('Auto', true);
};
MK_SpriteAnimBase.prototype.setFlagAutoOff = function() {
	this.setAnimFlag('Auto', false);
};
MK_SpriteAnimBase.prototype.setFlagPlayOn = function() {
	this.setAnimFlag('Play', true);
};
MK_SpriteAnimBase.prototype.setFlagPlayOff = function() {
	this.setAnimFlag('Play', false);
};
MK_SpriteAnimBase.prototype.setFlagPauseOn = function() {
	this.setAnimFlag('Pause', true);
};
MK_SpriteAnimBase.prototype.setFlagPauseOff = function() {
	this.setAnimFlag('Pause', false);
};
MK_SpriteAnimBase.prototype.setFlagContinueOn = function() {
	this.setAnimFlag('Continue', true);
};
MK_SpriteAnimBase.prototype.setFlagContinueOff = function() {
	this.setAnimFlag('Continue', false);
};
MK_SpriteAnimBase.prototype.setFlagStopOn = function() {
	this.setAnimFlag('Stop', true);
};
MK_SpriteAnimBase.prototype.setFlagStopOff = function() {
	this.setAnimFlag('Stop', false);
};
MK_SpriteAnimBase.prototype.setFlagInitOn = function() {
	this.setAnimFlag('Init', true);
};
MK_SpriteAnimBase.prototype.setFlagInitOff = function() {
	this.setAnimFlag('Init', false);
};

MK_SpriteAnimBase.prototype.setFlagEnabledOn = function() {
	this.setAnimFlag('Enabled', true);
};
MK_SpriteAnimBase.prototype.setFlagEnabledOff = function() {
	this.setAnimFlag('Enabled', false);
};

MK_SpriteAnimBase.prototype.setFlagAllowAddOn = function() {
	this.setAnimFlag('AllowAdd', true);
};
MK_SpriteAnimBase.prototype.setFlagAllowAddOff = function() {
	this.setAnimFlag('AllowAdd', false);
};



// --------------------------------
// 阶段操作

MK_SpriteAnimBase.prototype.onCreate = function() {
};

MK_SpriteAnimBase.prototype.onStart = function() {
};

MK_SpriteAnimBase.prototype.onPending = function() {
};
MK_SpriteAnimBase.prototype.onPlay = function() {
};
MK_SpriteAnimBase.prototype.onPlaying = function() {
};
MK_SpriteAnimBase.prototype.onStop = function() {
};

MK_SpriteAnimBase.prototype.onPause = function() {
};
MK_SpriteAnimBase.prototype.onPausing = function() {
};
MK_SpriteAnimBase.prototype.onContinue = function() {
};

MK_SpriteAnimBase.prototype.onInit = function() {
};

MK_SpriteAnimBase.prototype.onDestroy = function() {
};

MK_SpriteAnimBase.prototype.onUpdateStart = function() {
};
MK_SpriteAnimBase.prototype.onUpdate = function() {
	// 按顺序并行判断操作是否要进行

	if (this._phase ==   0 && this._flagAuto) {
		this.onStart();
		this._phase  = 101;
	}

	if (this._phase == 101 && this._flagAuto) {
		this.onPending();
	}
	if (this._phase == 101 && this._flagPlay) {
		this.onPlay();
		this._phase  = 102;
		this._flagPlay = false;
	}
	if (this._phase == 102 && this._flagAuto) {
		this.onPlaying();
	}
	if (this._phase == 102 && this._flagStop) {
		this.onStop();
		this._phase  = 103;
		this._flagStop = false;
	}

	if (this._phase == 102 && this._flagPause) {
		this.onPause();
		this._phase  = 201;
		this._flagPause = false;
	}
	if (this._phase == 201 && this._flagAuto) {
		this.onPausing();
	}
	if (this._phase == 201 && this._flagContinue) {
		this.onContinue();
		this._phase  = 102;
		this._flagContinue = false;
	}

	if (this._phase == 103 && this._flagAuto) {
		this.onDestroy();
		this._phase  =  -1;
	}

	if (this._phase ==  -1 && this._flagInit) {
		this.onInit();
		this._phase  =   0;
		this._flagInit = false;
	}
};
MK_SpriteAnimBase.prototype.onUpdateEnd = function() {
};

MK_SpriteAnimBase.prototype.update = function() {
	if (this._flagEnabled) {
		this.onUpdateStart();
		this.onUpdate();
		this.onUpdateEnd();
	}
};



// --------------------------------
// 参数配置

// 派生类必须重新设置这个
MK_SpriteAnimBase._PARAM_CONFIG = [
];

MK_SpriteAnimBase.prototype.getParamConfig = function() {
	return this.constructor._PARAM_CONFIG;
};



// --------------------------------
// 参数映射

// {key -> index}
MK_SpriteAnimBase.prototype.initParamMapTable = function() {
	this._paramMapTable = {};
	var keyList = this.getParamConfig();
	for (var i = 0; i < keyList.length; i++) {
		this._paramMapTable[keyList[i][0]] = i;
	}
};

MK_SpriteAnimBase.prototype.getParamIndex = function(key) {
	var index = this._paramMapTable[key];
	if (0 <= index) {
		return index;
	}
	else {
		console.error('key ' + key + ' not found');
		return 0;
	}
};



// --------------------------------
// 默认参数

MK_SpriteAnimBase.prototype.getDefaultParam = function(index) {
	return (this.getParamConfig()[index] || [])[2];
};



// --------------------------------
// 参数类型

// 得到参数的类型
MK_SpriteAnimBase.prototype.getParamType = function(index) {
	return (this.getParamConfig()[index] || [])[1];
};
// 得到类型化后的参数
MK_SpriteAnimBase.prototype.getTypedParam = function(param, index) {
	var type = this.getParamType(index);
	if (type == 'number') {
		return Number(param);
	}
	else if (type == 'string') {
		return String(param);
	}
	else {
		return param;
	}
};



// --------------------------------
// 获取参数

MK_SpriteAnimBase.prototype.getParams = function() {
	return MK_SpriteAnimManager.getAnimParams(this.getAnimCode()) || [];
};
MK_SpriteAnimBase.prototype.getParamByIndex = function(index) {
	var value = this.getParams()[index];
	if (value == null || typeof value == 'undefined') {
		// 缺少时，使用默认参数
		return this.getDefaultParam(index);
	}
	else {
		return this.getTypedParam(value, index);
	}
};
MK_SpriteAnimBase.prototype.getParamByKey = function(key) {
	var index = this.getParamIndex(key);
	return this.getParamByIndex(index);
};
MK_SpriteAnimBase.prototype.getParam = function(key) {
	if (typeof key == 'number') {
		return this.getParamByIndex(key);
	}
	else {
		return this.getParamByKey(key);
	}
};



// --------------------------------
// 设置参数

MK_SpriteAnimBase.prototype.setParamWithCode = function(code, index, value) {
	MK_SpriteAnimManager.setAnimParam(code, index, value);
};
MK_SpriteAnimBase.prototype.setParamByKeyWithCode = function(code, key, value) {
	var index = this.getParamIndex(key);
	MK_SpriteAnimManager.setParamWithCode(code, index, value);
};

MK_SpriteAnimBase.prototype.setParam = function(index, value) {
	var code = this.getAnimCode();
	MK_SpriteAnimManager.setAnimParam(code, index, value);
};
MK_SpriteAnimBase.prototype.setParamByKey = function(key, value) {
	var code = this.getAnimCode();
	MK_SpriteAnimManager.setAnimParam(code, index, value);
};





//-----------------------------------------------------------------------------
// MK_TextAnimBase
// 文本动画基类

// 区别于普通的MK_SpriteAnimBase，MK_TextAnimBase更加适合做文本的动画
// 允许设置消息窗口(messageWindow)或其contents和textStatus
// 以解决 需要获取messageWindow的contents和textStatus的功能 不方便改写MK_SpriteAnimBase 的尴尬

function MK_TextAnimBase() {
    this.initialize.apply(this, arguments);
};

MK_TextAnimBase.prototype = Object.create(MK_SpriteAnimBase.prototype);
MK_TextAnimBase.prototype.constructor = MK_TextAnimBase;

// 派生类必须重新设置这个
MK_TextAnimBase._PARAM_CONFIG = [
];

MK_TextAnimBase.prototype.initialize = function(code, msgWindow) {
	MK_SpriteAnimBase.prototype.initialize.apply(this, arguments);

	// 消息窗口
	this._msgWindow = msgWindow;
};



// --------------------------------
// 消息窗口

MK_TextAnimBase.prototype.setMsgWindow = function(msgWindow) {
	this._msgWindow = msgWindow;
};
MK_TextAnimBase.prototype.getMsgWindow = function() {
	return this._msgWindow;
};

MK_TextAnimBase.prototype.getMsgTextStatus = function() {
	if (!this._msgWindow) return null;
	else return this._msgWindow._textState; 
};

MK_TextAnimBase.prototype.getMsgContents = function() {
	if (!this._msgWindow) return null;
	else return this._msgWindow.contents; 
};



// --------------------------------
// 添加目标

// 示例
//MK_TextAnimBase.prototype.onAddTarget = function(targetObj, textStatus, contents) {
//	MK_SpriteAnimBase.prototype.onAddTarget.apply(this, arguments);
//	textStatus = textStatus || this.getMsgTextStatus;
//	contents   = contents   || this.getMsgContents;
//};

// 示例
//MK_TextAnimBase.prototype.onInitTarget = function(targetObj, textStatus, contents) {
//	MK_SpriteAnimBase.prototype.onInitTarget.apply(this, arguments);
//	textStatus = textStatus || this.getMsgTextStatus;
//	contents   = contents   || this.getMsgContents;
//};





//-----------------------------------------------------------------------------
// MK_TextAnim_Fade
// 文本动画派生类-fade

function MK_TextAnim_Fade() {
    this.initialize.apply(this, arguments);
};

MK_TextAnim_Fade.prototype = Object.create(MK_TextAnimBase.prototype);
MK_TextAnim_Fade.prototype.constructor = MK_TextAnim_Fade;

MK_TextAnim_Fade._DEFAULT_ANIM_CODE = 1;

MK_TextAnim_Fade._PARAM_CONFIG = [
	['opacityStart', 	'number', 0],
	['opacityEnd', 		'number', 255],
	['opacitySpeed', 	'number', 5],
];

MK_TextAnim_Fade.prototype.onInitTarget = function(obj) {
	MK_TextAnimBase.prototype.onInitTarget.apply(this, arguments);
	if (!obj || !obj.sprite) return ;
	s = obj.sprite;
	v = obj.var;

	var opacityStart = this.getParam('opacityStart');

	s.opacity = opacityStart;
};

MK_TextAnim_Fade.prototype.onPlaying = function() {
	MK_TextAnimBase.prototype.onPlaying.apply(this, arguments);
	
	var startO = this.getParam('opacityStart');
	var   endO = this.getParam('opacityEnd'  );
	var speedO = this.getParam('opacitySpeed');
	this.getTargets().forEach(function(obj) {
		if (!obj || !obj.sprite) return ;
		s = obj.sprite;
		v = obj.var;
		var nowO = s.opacity;
		if ((startO <= nowO && nowO < endO) || (startO >= nowO && nowO > endO)) {
			// 在变化范围(startO~endO)内
			s.opacity += speedO;
		}
	}, this);
};





//-----------------------------------------------------------------------------
// MK_TextAnim_Zoom
// 文本动画派生类-zoom

function MK_TextAnim_Zoom() {
    this.initialize.apply(this, arguments);
};

MK_TextAnim_Zoom.prototype = Object.create(MK_TextAnimBase.prototype);
MK_TextAnim_Zoom.prototype.constructor = MK_TextAnim_Zoom;

MK_TextAnim_Zoom._DEFAULT_ANIM_CODE = 2;

MK_TextAnim_Zoom._PARAM_CONFIG = [
	['opacityStart', 	'number', 0],
	['opacityEnd', 		'number', 255],
	['opacitySpeed', 	'number', 4],
	['scaleXStart', 	'number', 2.0],
	['scaleXEnd', 		'number', 1.0],
	['scaleXSpeed', 	'number', -0.04],
	['scaleYStart', 	'number', 2.0],
	['scaleYEnd', 		'number', 1.0],
	['scaleYSpeed', 	'number', -0.04],
];

MK_TextAnim_Zoom.prototype.onInitTarget = function(obj) {
	MK_TextAnimBase.prototype.onInitTarget.apply(this, arguments);
	if (!obj || !obj.sprite) return ;
	s = obj.sprite;
	v = obj.var;

	var opacityStart = this.getParam('opacityStart');
	var scaleXStart  = this.getParam('scaleXStart');
	var scaleYStart  = this.getParam('scaleYStart');

	s.opacity = opacityStart;
	s.scale.x = scaleXStart;
	s.scale.y = scaleYStart;
};

MK_TextAnim_Zoom.prototype.onPlaying = function() {
	MK_TextAnimBase.prototype.onPlaying.apply(this, arguments);
	
	var startO = this.getParam('opacityStart');
	var   endO = this.getParam('opacityEnd'  );
	var speedO = this.getParam('opacitySpeed');
	var startX = this.getParam('scaleXStart');
	var   endX = this.getParam('scaleXEnd'  );
	var speedX = this.getParam('scaleXSpeed');
	var startY = this.getParam('scaleYStart');
	var   endY = this.getParam('scaleYEnd'  );
	var speedY = this.getParam('scaleYSpeed');

	this.getTargets().forEach(function(obj) {
		if (!obj || !obj.sprite) return ;
		s = obj.sprite;
		v = obj.var;
		var   nowO = s.opacity;
		if ((startO <= nowO && nowO < endO) || (startO >= nowO && nowO > endO)) {
			// 在变化范围(startO~endO)内
			s.opacity += speedO;
		}
		var   nowX = s.scale.x;
		if ((startX <= nowX && nowX < endX) || (startX >= nowX && nowX > endX)) {
			// 在变化范围(startO~endO)内
			s.scale.x += speedX;
		}
		else {
			s.scale.x = endX;
		}
		var   nowY = s.scale.y;
		if ((startY <= nowY && nowY < endY) || (startY >= nowY && nowY > endY)) {
			// 在变化范围(startO~endO)内
			s.scale.y += speedY;
		}
		else {
			s.scale.y = endY;
		}
	}, this);
};





//-----------------------------------------------------------------------------
// MK_TextAnim_Zoom2
// 文本动画派生类-zoom2

function MK_TextAnim_Zoom2() {
    this.initialize.apply(this, arguments);
};

MK_TextAnim_Zoom2.prototype = Object.create(MK_TextAnim_Zoom.prototype);
MK_TextAnim_Zoom2.prototype.constructor = MK_TextAnim_Zoom2;

MK_TextAnim_Zoom2._DEFAULT_ANIM_CODE = 3;

MK_TextAnim_Zoom2._PARAM_CONFIG = [
	['opacityStart', 	'number', 0],
	['opacityEnd', 		'number', 255],
	['opacitySpeed', 	'number', 4],
	['scaleXStart', 	'number', -1.0],
	['scaleXEnd', 		'number', 1.0],
	['scaleXSpeed', 	'number', +0.02],
	['scaleYStart', 	'number', 2.0],
	['scaleYEnd', 		'number', 1.0],
	['scaleYSpeed', 	'number', -0.02],
];





//-----------------------------------------------------------------------------
// MK_TextAnim_Wipe
// 文本动画派生类-wipe





//-----------------------------------------------------------------------------
// MK_TextAnim_Shake
// 文本动画派生类-shake

function MK_TextAnim_Shake() {
    this.initialize.apply(this, arguments);
};

MK_TextAnim_Shake.prototype = Object.create(MK_TextAnimBase.prototype);
MK_TextAnim_Shake.prototype.constructor = MK_TextAnim_Shake;

MK_TextAnim_Shake._DEFAULT_ANIM_CODE = 5;

MK_TextAnim_Shake._PARAM_CONFIG = [
	['shakeWaitCount', 	'number', 3], // 震动等待计数(震动速度)
	['shakeAmplitude', 	'number', 3], // 震动幅度
	['shakeNeedStop', 	'number', 0], // 是否需要停止 (>0:需要)
	['shakeTotalCount', 'number', 12], // 震动总计数(震动时间)
];

MK_TextAnim_Shake.prototype.onInitTarget = function(obj) {
	MK_TextAnimBase.prototype.onInitTarget.apply(this, arguments);

	if (!obj || !obj.sprite) return ;
	s = obj.sprite;
	v = obj.var;

	v._orgX = s.x;
	v._orgY = s.y;
	v._shakeCount = 0;
	v._shakeWaitCount = 0;
};

MK_TextAnim_Shake.prototype.onPlaying = function() {
	MK_TextAnimBase.prototype.onPlaying.apply(this, arguments);

	var waitCount = this.getParam('shakeWaitCount');
	var amplitude = this.getParam('shakeAmplitude');
	var needStop = this.getParam('shakeNeedStop');
	var totalCount = this.getParam('shakeTotalCount');

	this.getTargets().forEach(function(obj) {
		if (!obj || !obj.sprite) return ;
		s = obj.sprite;
		v = obj.var;
		if (needStop > 0 && v._shakeCount >= totalCount) {
			s.x = v._orgX;
			s.y = v._orgY;
		}
		else {
			v._shakeCount++;
			v._shakeWaitCount++;
			if (v._shakeWaitCount >= waitCount) {
				v._shakeWaitCount = 0;
				var rnd1 = Math.randomInt(2 * amplitude) - amplitude;
				var rnd2 = Math.randomInt(2 * amplitude) - amplitude;
				s.x = rnd1 + v._orgX;
				s.y = rnd2 + v._orgY;
			}
		}
	}, this);
};





//-----------------------------------------------------------------------------
// MK_TextAnim_Zoom3
// 文本动画派生类-zoom3

function MK_TextAnim_Zoom3() {
    this.initialize.apply(this, arguments);
};

MK_TextAnim_Zoom3.prototype = Object.create(MK_TextAnim_Zoom.prototype);
MK_TextAnim_Zoom3.prototype.constructor = MK_TextAnim_Zoom3;

MK_TextAnim_Zoom3._DEFAULT_ANIM_CODE = 6;

MK_TextAnim_Zoom3._PARAM_CONFIG = [
	['opacityStart', 	'number', 0],
	['opacityEnd', 		'number', 255],
	['opacitySpeed', 	'number', 20],
	['scaleXStart', 	'number', 4.0],
	['scaleXEnd', 		'number', 1.0],
	['scaleXSpeed', 	'number', -0.2],
	['scaleYStart', 	'number', 4.0],
	['scaleYEnd', 		'number', 1.0],
	['scaleYSpeed', 	'number', -0.2],
	['shakeAmplitude', 	'number', 3], // 震动幅度
	['shakeWaitCount', 	'number', 3],  // 震动等待计数(震动速度)
	['shakeNeedStop', 	'number', 0], // 是否需要停止 (>0:需要)
	['shakeTotalCount', 'number', 12], // 震动总计数(震动时间)
];

MK_TextAnim_Zoom3.prototype.onInitTarget = function(obj) {
	MK_TextAnimBase.prototype.onInitTarget.apply(this, arguments);

	if (!obj || !obj.sprite) return ;
	s = obj.sprite;
	v = obj.var;

	var opacityStart = this.getParam('opacityStart');

	s.opacity = opacityStart;
	v._subPhase = 1;
	v._shakeCount = 0;
	v._shakeWaitCount = 0;
	v._orgX = s.x;
	v._orgY = s.y;
};

MK_TextAnim_Zoom3.prototype.onPlaying = function() {
	MK_TextAnimBase.prototype.onPlaying.apply(this, arguments);;
	
	var startO = this.getParam('opacityStart');
	var   endO = this.getParam('opacityEnd'  );
	var speedO = this.getParam('opacitySpeed');
	var startX = this.getParam('scaleXStart');
	var   endX = this.getParam('scaleXEnd'  );
	var speedX = this.getParam('scaleXSpeed');
	var startY = this.getParam('scaleYStart');
	var   endY = this.getParam('scaleYEnd'  );
	var speedY = this.getParam('scaleYSpeed');

	var shakeWaitCount = this.getParam('shakeWaitCount');
	var shakeAmplitude = this.getParam('shakeAmplitude');

	var shakeNeedStop   = this.getParam('shakeNeedStop');
	var shakeTotalCount = this.getParam('shakeTotalCount');

	this.getTargets().forEach(function(obj) {
		if (!obj || !obj.sprite) return ;
		s = obj.sprite;
		v = obj.var;

		if (v._subPhase == 1) {
			var hasChange = false;
			var   nowO = s.opacity;
			if ((startO <= nowO && nowO < endO) || (startO >= nowO && nowO > endO)) {
				// 在变化范围(startO~endO)内
				s.opacity += speedO;
				hasChange = true;
			}
			var   nowX = s.scale.x;
			if ((startX <= nowX && nowX < endX) || (startX >= nowX && nowX > endX)) {
				// 在变化范围(startO~endO)内
				s.scale.x += speedX;
				hasChange = true;
			}
			else {
				s.scale.x = endX;
			}
			var   nowY = s.scale.y;
			if ((startY <= nowY && nowY < endY) || (startY >= nowY && nowY > endY)) {
				// 在变化范围(startO~endO)内
				s.scale.y += speedY;
				hasChange = true;
			}
			else {
				s.scale.y = endY;
			}
		
			if (!hasChange) {
				v._subPhase = 2;
			}
		}
		
		if (v._subPhase == 2) {
			v._shakeCount++;
			this.playing_shake(obj, shakeWaitCount, shakeAmplitude);
			if (shakeNeedStop > 0 && v._shakeCount >= shakeTotalCount) {
				s.x = v._orgX;
				s.y = v._orgY;
				v._subPhase = 3;
			};		 
		};
	}, this);
};

MK_TextAnim_Zoom3.prototype.playing_shake = function(targetObj, waitCount, amplitude) {
	var obj = targetObj;
	if (!obj || !obj.sprite) return ;
	s = obj.sprite;
	v = obj.var;
	v._shakeWaitCount++;
	if (v._shakeWaitCount >= waitCount) {
		v._shakeWaitCount = 0;
		var rnd1 = Math.randomInt(2 * amplitude) - amplitude;
		var rnd2 = Math.randomInt(2 * amplitude) - amplitude;
		s.x = rnd1 + v._orgX;
		s.y = rnd2 + v._orgY;
	}
};





//-----------------------------------------------------------------------------
// MK_TextAnim_Wave
// 文本动画派生类-wave

function MK_TextAnim_Wave() {
    this.initialize.apply(this, arguments);
};

MK_TextAnim_Wave.prototype = Object.create(MK_TextAnimBase.prototype);
MK_TextAnim_Wave.prototype.constructor = MK_TextAnim_Wave;

MK_TextAnim_Wave._DEFAULT_ANIM_CODE = 7;

MK_TextAnim_Wave._PARAM_CONFIG = [
	['scaleSpeed', 	'number', 0.015], // 缩放速度
	['scaleCount', 	'number',    30], // 缩放帧数(来回共两次)
	['loopTotal', 	'number',     1], // 总循环次数
];

MK_TextAnim_Wave.prototype.onInitTarget = function(obj) {
	MK_TextAnimBase.prototype.onInitTarget.apply(this, arguments);

	if (!obj || !obj.sprite) return ;
	s = obj.sprite;
	v = obj.var;

	v._animCount = 0; // s.ani[0]
	v._loopCount = 0;
};

MK_TextAnim_Wave.prototype.onPlaying = function() {
	MK_TextAnimBase.prototype.onPlaying.apply(this, arguments);
	
	var scaleSpeed = this.getParam('scaleSpeed');
	var scaleCount = this.getParam('scaleCount');
	var loopTotal  = this.getParam('loopTotal');

	this.getTargets().forEach(function(obj) {
		if (!obj || !obj.sprite) return ;
		s = obj.sprite;
		v = obj.var;
		v._animCount++; 
		if (v._animCount <= 1 * scaleCount) {
			s.scale.x += scaleSpeed;
		}
		else if (v._animCount <= 2 * scaleCount) {
			s.scale.x -= scaleSpeed;
		}
		else {
			v._animCount = 0;
			v._loopCount++;
		};
		s.scale.y = s.scale.x;
		
		if (v._loopCount >= loopTotal) {
			s.scale.x = s.scale.y = 1.00;
		}
	}, this);
};





//-----------------------------------------------------------------------------
// MK_TextAnim_Rotation
// 文本动画派生类-rotation

function MK_TextAnim_Rotation() {
    this.initialize.apply(this, arguments);
};

MK_TextAnim_Rotation.prototype = Object.create(MK_TextAnimBase.prototype);
MK_TextAnim_Rotation.prototype.constructor = MK_TextAnim_Rotation;

MK_TextAnim_Rotation._DEFAULT_ANIM_CODE = 8;

MK_TextAnim_Rotation._PARAM_CONFIG = [
	['xx1', 	'number', 63], 
	['xx2', 	'number', 120], 
	['xx3', 	'number', 0.1], 
]; // TODO

MK_TextAnim_Rotation.prototype.onInitTarget = function(obj) {
	MK_TextAnimBase.prototype.onInitTarget.apply(this, arguments);
	
	if (!obj) return ;
	s = obj.sprite;
	v = obj.var;

	v._animCount = 0;
};

MK_TextAnim_Rotation.prototype.onPlaying = function() {
	MK_TextAnimBase.prototype.onPlaying.apply(this, arguments);
	
	var xx1 = this.getParam('xx1');
	var xx2 = this.getParam('xx2');
	var xx3 = this.getParam('xx3');

	this.getTargets().forEach(function(obj) {
		if (!obj || !obj.sprite) return ;
		s = obj.sprite;
		v = obj.var;

		v._animCount++;
		if (v._animCount <= xx1) {
			s.rotation += xx3;
		}
		else if (v._animCount <= xx2) {
			s.rotation = 0;
		}
		else {
			s.rotation = 0;
			v._animCount = 0;
		};
	}, this);
};





//-----------------------------------------------------------------------------
// MK_TextAnim_Swing
// 文本动画派生类-swing

function MK_TextAnim_Swing() {
    this.initialize.apply(this, arguments);
};

MK_TextAnim_Swing.prototype = Object.create(MK_TextAnimBase.prototype);
MK_TextAnim_Swing.prototype.constructor = MK_TextAnim_Swing;

MK_TextAnim_Swing._DEFAULT_ANIM_CODE = 9;

MK_TextAnim_Swing._PARAM_CONFIG = [
	['rotateSpeed', 	'number', 0.02], // 旋转速度 (角度/帧)
	['rotateInitDir', 	'string',  'R'], // 初始旋转方向(L:逆时针,R:顺时针,其他:'L')
	['angleInit', 		'number',    0], // 初始角度
	['angleRangeL', 	'number', -0.4], // 角度左范围
	['angleRangeR', 	'number',  0.4], // 角度右范围
];

MK_TextAnim_Swing.prototype.onInitTarget = function(obj) {
	MK_TextAnimBase.prototype.onInitTarget.apply(this, arguments);
	
	if (!obj || !obj.sprite) return ;
	s = obj.sprite;
	v = obj.var;

	var rotateInitDir = this.getParam('rotateInitDir');
	var angleInit     = this.getParam('angleInit');

	v._rotateR = (rotateInitDir == 'R');
	s.rotation = angleInit;
};

MK_TextAnim_Swing.prototype.onPlaying = function() {
	MK_TextAnimBase.prototype.onPlaying.apply(this, arguments);

	var rotateSpeed = this.getParam('rotateSpeed');
	var angleRangeL = this.getParam('angleRangeL');
	var angleRangeR = this.getParam('angleRangeR');

	this.getTargets().forEach(function(obj) {
		if (!obj || !obj.sprite) return ;
		s = obj.sprite;
		v = obj.var;
		if (v._rotateR) {
			s.rotation += rotateSpeed;
			if (s.rotation > angleRangeR) { 
			    s.rotation = angleRangeR;
		       v._rotateR = false;
			};
		} else {
			s.rotation -= rotateSpeed;
			if (s.rotation < angleRangeL) { 
			    s.rotation = angleRangeL;
		       v._rotateR = true;
			};
		};
	}, this);
};





//-----------------------------------------------------------------------------
// MK_TextAnim_Random
// 文本动画派生类-random

function MK_TextAnim_Random() {
    this.initialize.apply(this, arguments);
};

MK_TextAnim_Random.prototype = Object.create(MK_TextAnimBase.prototype);
MK_TextAnim_Random.prototype.constructor = MK_TextAnim_Random;

MK_TextAnim_Random._DEFAULT_ANIM_CODE = 10;

MK_TextAnim_Random._PARAM_CONFIG = [
	['opacityStart', 	'number', 0],
	['opacityEnd', 		'number', 255],
	['opacitySpeed', 	'number', 4],
	['scaleRangeMin', 	'number', 0.7], 
	['scaleRangeMax', 	'number', 1.4], 
	['rotateRange', 	'number', 0.4], 
	['rotateDir', 		'string', 'R'], // 旋转方向(L:逆时针,R:顺时针,其他:'L')
];

MK_TextAnim_Random.prototype.onInitTarget = function(obj) {
	MK_TextAnimBase.prototype.onInitTarget.apply(this, arguments);

	if (!obj || !obj.sprite) return ;
	s = obj.sprite;
	v = obj.var;

	var scaleRangeMin = this.getParam('scaleRangeMin');
	var scaleRangeMax = this.getParam('scaleRangeMax');
	var scaleRadomSize = scaleRangeMax - scaleRangeMin;

	var rotateRange = this.getParam('rotateRange');
	var rotateDir = this.getParam('rotateDir');
	
	s.opacity = 0;
	s.scale.x = s.scale.y = Math.random() * scaleRadomSize + scaleRangeMin;
	s.rotation = (Math.random() * rotateRange) * (rotateDir == 'R' ? 1: -1);
};

MK_TextAnim_Random.prototype.onPlaying = function() {
	MK_TextAnimBase.prototype.onPlaying.apply(this, arguments);
	
	var startO = this.getParam('opacityStart');
	var   endO = this.getParam('opacityEnd');
	var speedO = this.getParam('opacitySpeed');

	this.getTargets().forEach(function(obj) {
		if (!obj || !obj.sprite) return ;
		s = obj.sprite;
		v = obj.var;
		var nowO = s.opacity;
		if ((startO <= nowO && nowO < endO) || (startO >= nowO && nowO > endO)) {
			// 在变化范围(startO~endO)内
			s.opacity += speedO;
		}
	}, this);
};





//-----------------------------------------------------------------------------
// MK_TextAnim_Karaoke
// 文本动画派生类-karaoke





//-----------------------------------------------------------------------------
// 配置管理器

// 告诉管理器每个code对应的类

(function () {
	var list = [
		// empty
		MK_TextAnimBase, 		// 0 empty

		// MOG_AnimterdText
		MK_TextAnim_Fade, 		// 1 fade
		MK_TextAnim_Zoom, 		// 2 zoom
		MK_TextAnim_Zoom2, 		// 3 zoom2
		//MK_TextAnim_Wipe, 	// 4 wipe
		null, // tmp
		MK_TextAnim_Shake, 		// 5 shake
		MK_TextAnim_Zoom3, 		// 6 zoom3
		MK_TextAnim_Wave, 		// 7 wave
		MK_TextAnim_Rotation, 	// 8 rotation
		MK_TextAnim_Swing, 		// 9 swing
		MK_TextAnim_Random, 	// 10 random

		// added
		//MK_TextAnim_Karaoke, 	// 11 karaoke
	];
	list.forEach(function(animClass, idx) {
		!!animClass && MK_SpriteAnimManager.setAnimClass(idx, animClass);
	});
})();





//-----------------------------------------------------------------------------
// 写入动画参数

(function() {

	var pluginName = 'MK_SpriteAnimManager';
	var param      = MK_Data.param[pluginName];

	param['animParamsConfig'].forEach(function(animParams) {
		MK_SpriteAnimManager.setUserMapping(animParams.animCode, animParams.baseAnimCode);
		animParams.params.forEach(function(params) {
			if (!!params.key) {
				MK_SpriteAnimManager.setAnimParamByKey(
					animParams.animCode, params.key, params.value);
			}
			else {
				MK_SpriteAnimManager.setAnimParam(
					animParams.animCode, params.index, params.value);
			}
		});
	});

})();



