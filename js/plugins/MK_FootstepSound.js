//=============================================================================
// MK_FootstepSound.js
// 
//=============================================================================
//  author : Mikan 
//  plugin : MK_FootstepSound.js 脚步声
// version : v1.1.0 2020/08/01 允许设置声音的音量、音调
// ------------------------------------------------------------------------------
// [Twitter] https://twitter.com/_MikanHako/
//  [GitHub] https://github.com/MikanHako1024/
//    [Blog] NONE
//=============================================================================




/*:
 * @plugindesc 脚步声 <MK_FootstepSound>
 * @author Mikan 
 * @version v1.1.0 2020/08/01 允许设置声音的音量、音调
 * v1.0.0 2020/07/28 完成了基本的功能
 * v0.0.0 2020/07/21 项目计划中
 * 
 * 
 * @param ==== 游戏参数配置 ====
 * 
 * @param soundSwitchId
 * @text 声音开关id
 * @desc 控制声音开启关闭的开关id
 * @type switch
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
 * @param fixedReionList
 * @text 固定区域列表
 * @desc 配置所有的固定区域
 * 要包括所有要用到的音效
 * @type struct<FixedRegion>[]
 * @default []
 * 
 * @param variableReionList
 * @text 可变区域列表
 * @desc 配置所有的可变区域
 * @type struct<VariableRegion>[]
 * @default []
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
 * 设置区域，当玩家移动走进有区域的格子时，播放对应音效
 * 
 * 区域分为两种
 * 固定区域 : 直接设置声音文件
 * 可变区域 : 设置变量id，使用变量值作为固定区域id，使用该区域的对应声音文件
 *           变量值只能设置成固定区域id，暂时不支持设置成可变区域时的迭代
 * 
 * 声音文件放在 audio/se 文件夹下
 * 声音配置将使用游戏默认的声音配置 (音量:se音量设置*90，音调:100, 音像:0)
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
 * 为方便调整，提供了可变区域 ...
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
 * 交通工具
 * 事件移动脚步声
 * 未设置区域部分也当做一种区域，可以播放脚步声
 * FINISH : 可以设置声音的音量、音调
 * 
 * TODO : other
 * 
 * 
 */
/*~struct~FixedRegion:
 * @param regionId
 * @text 固定区域id
 * @desc 固定区域id
 * @type number
 * @min 1
 * @max 255
 * @default 
 * 
 * @param sound
 * @text 声音文件
 * @desc 声音文件(se)
 * @type file
 * @dir audio/se
 * @default 
 * 
 * @param volume
 * @text 音量
 * @desc 音量
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * 
 * @param pitch
 * @text 音调
 * @desc 音调
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param pan
 * @text 声像
 * @desc 声像
 * @type number
 * @min 0
 * @max 100
 * @default 0
 */
/*~struct~VariableRegion:
 * @param regionId
 * @text 可变区域id
 * @desc 可变区域id 
 * 需要确保固定区域中没有使用这个id
 * @type number
 * @min 1
 * @max 255
 * @default 
 * 
 * @param variableId
 * @text 变量id
 * @desc 可变区域引用变量id
 * @type variable
 * @default 
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

	var pluginName = 'MK_FootstepSound';
	MK_Plugins.paramGet[pluginName] = MK_Plugins.getPluginParam(pluginName);
	MK_Plugins.param[pluginName] = {};

	var paramGet = MK_Plugins.paramGet[pluginName];
	var param = MK_Plugins.param[pluginName];


	function StructFixRegion(str) {
		var obj = JSON.parse(str || '{}');
		obj.regionId = Number(obj.regionId ||   0);
		obj.sound 	 = String(obj.sound    ||  '');
		obj.volume 	 = Number(obj.volume   ||  90);
		obj.pitch 	 = Number(obj.pitch    || 100);
		obj.pan 	 = Number(obj.pan      ||   0);
		return obj;
	}

	function ArrayStructFixRegion(str) {
		var arr = JSON.parse(str || '[]');
		arr = arr.map(function(s) { return StructFixRegion(s); });
		return arr;
	}

	function StructVarRegion(str) {
		var obj = JSON.parse(str || '{}');
		obj.regionId   = Number(obj.regionId   || 0);
		obj.variableId = String(obj.variableId || 0);
		return obj;
	}

	function ArrayStructVarRegion(str) {
		var arr = JSON.parse(str || '[]');
		arr = arr.map(function(s) { return StructVarRegion(s); });
		return arr;
	}


	param['soundSwitchId'] 		 = Number(paramGet['soundSwitchId'] ||  0 );

	param['fixedReionList'] 	 = ArrayStructFixRegion(paramGet['fixedReionList']    || '[]' );
	param['variableReionList'] 	 = ArrayStructVarRegion(paramGet['variableReionList'] || '[]' );


})();




//-----------------------------------------------------------------------------
// MK_FootstepSound

function MK_FootstepSound() {
    throw new Error('This is a static class');
}

MK_FootstepSound._fixRegionData = [];
MK_FootstepSound._varRegionData = [];
MK_FootstepSound._soundConfig   = []; 

(function() {

	var pluginName = 'MK_FootstepSound';
	var param = MK_Plugins.param[pluginName];

	param['fixedReionList'].forEach(function(d) {
		MK_FootstepSound._fixRegionData[d.regionId] = d.sound;
		var config = {};
		config.volume = d.volume;
		config.pitch  = d.pitch;
		config.pan    = d.pan;
		MK_FootstepSound._soundConfig[d.regionId] = config;
	});
	param['variableReionList'].forEach(function(d) {
		MK_FootstepSound._varRegionData[d.regionId] = d.variableId;
	});

})();


MK_FootstepSound._regionAudioObjects = [];

MK_FootstepSound.getAudioObjectById = function(regionId) {
	this._regionAudioObjects[regionId] = this._regionAudioObjects[regionId]
		 || this.makeAudioObject(this._fixRegionData[regionId], this._soundConfig[regionId]);
	return this._regionAudioObjects[regionId];
};

MK_FootstepSound.makeAudioObject = function(name, config) {
	var audio = AudioManager.makeEmptyAudioObject();
	if (!!config) {
		audio.name   = name;
		audio.volume = config.volume;
		audio.pitch  = config.pitch;
		audio.pan    = config.pan;
	}
	else {
		audio.name   = name;
		audio.volume = 100;
		audio.pitch  = 100;
	}
	return audio;
};


MK_FootstepSound.getFixRegionSound = function(regionId) {
	return this._fixRegionData[regionId] || '';
};

MK_FootstepSound.getRealVarRegionId = function(regionId) {
	var varId = this._varRegionData[regionId];
	return !!$gameVariables ? $gameVariables.value(varId) : 0;
};

MK_FootstepSound.getVarRegionSound = function(regionId) {
	return this.getFixRegionSound(this.getRealVarRegionId(regionId));
};

MK_FootstepSound.isFixRegionSound = function(regionId) {
	return !!this.getFixRegionSound(regionId);
};

MK_FootstepSound.getRealRegionId = function(regionId) {
	return this.isFixRegionSound(regionId) ? regionId : this.getRealVarRegionId(regionId);
};


MK_FootstepSound.playByRegionId = function(regionId) {
	var se = this.getAudioObjectById(this.getRealRegionId(regionId));
	se.name && AudioManager.playSe(se);
};

MK_FootstepSound._soundSwitchId = 0;

(function() {

	var pluginName = 'MK_FootstepSound';
	var param = MK_Plugins.param[pluginName];

	MK_FootstepSound._soundSwitchId = param['soundSwitchId'] || 0;

})();

MK_FootstepSound.needPlaySound = function() {
	var switchId = MK_FootstepSound._soundSwitchId;
	return (switchId > 0 && $gameSwitches) ? $gameSwitches.value(switchId) : false;
};


MK_Plugins.class['MK_FootstepSound'] = MK_FootstepSound;




//-----------------------------------------------------------------------------
// 修改 Game_Player

(function() {

var _MK_Game_Player_executeMove   = Game_Player.prototype.executeMove;
Game_Player.prototype.executeMove = function(direction) {

	var x1 = this.x;
	var y1 = this.y;

	_MK_Game_Player_executeMove.apply(this, arguments);

	var x2 = this.x;
	var y2 = this.y;

	if (MK_FootstepSound.needPlaySound() && (x1 != x2 || y1 != y2)) {
		var regionId = $gameMap.regionId(x2, y2);
		MK_FootstepSound.playByRegionId(regionId);
	}
};

})();



