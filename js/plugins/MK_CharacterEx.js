//=============================================================================
// MK_CharacterEx.js
// 
//=============================================================================
//  author : Mikan 
//  plugin : MK_CharacterEx.js 人物图像扩展
// version : v1.0.0 2020/06/04 完成基本的版本
// ------------------------------------------------------------------------------
// [Twitter] https://twitter.com/_MikanHako/
//  [GitHub] https://github.com/MikanHako1024/
//	[Blog] NONE
//=============================================================================




/*:
 * @plugindesc 人物图像扩展 <MK_CharacterEx>
 * @author Mikan 
 * @version v1.0.0 2020/06/04 完成基本的版本
 *   v0.1.0 2020/05/29 完成测试素材用的版本
 *   v0.0.0 2020/04/27 项目计划中
 * 
 * 
 * @param ==== 游戏参数配置 ====
 * 
 * @param trg_config
 * @text 触发事件用开关、变量配置
 * @desc 触发事件时自动输入对应值
 * 该项无序配置
 * 
 * @param trg_swi_isPlayer
 * @parent trg_config
 * @text 输入开关_是否为玩家
 * @desc 开关id
 * 开关值 : 是否为玩家
 * @type switch
 * @default 0
 * 
 * @param trg_swi_isActor
 * @parent trg_config
 * @text 输入开关_是否为角色
 * @desc 开关id
 * 开关值 : 是否为角色
 * @type switch
 * @default 0
 * 
 * @param trg_var_eventId
 * @parent trg_config
 * @text 输入变量_事件或角色id
 * @desc 变量id
 * 变量值 : 事件id 或 角色id (基于【输入开关_是否为角色】)
 * @type variable
 * @default 0
 * 
 * @param trg_var_currFrame
 * @parent trg_config
 * @text 输入变量_当前帧数
 * @desc 变量id
 * 变量值 : 准备进入下一帧前的播放帧数
 * @type variable
 * @default 0
 * 
 * @param trg_var_direction
 * @parent trg_config
 * @text 输入变量_方向
 * @desc 变量id
 * 变量值 : 人物转变方向后的方向
 * @type variable
 * @default 0
 * 
 * @param trg_var_stopCount
 * @parent trg_config
 * @text 输入变量_静止计时
 * @desc 变量id
 * 变量值 : 人物静止的帧数(60帧/1秒)
 * @type variable
 * @default 0
 * 
 * @param ==== 插件指令配置 ====
 * 
 * @param
 * @desc 
 * @type number
 * @default 
 * 
 * @param ==== 内容数据配置 ====
 * 
 * @param CharacterPictureData
 * @text 人物图像数据
 * @desc 配置用于扩展人物行走图图片
 * @type struct<CharacterPicture>[]
 * @default []
 * 
 * @param ==== under ====
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
 *   # 控制行走图图像.
 *   CharacterEx 目标 指令
 *   目标 : 
 *       event 事件id   -   对事件操作，将在切换地图后恢复
 *       actor 人物id   -   对人物操作，将一直保留
 *       player         -   对玩家操作，相当于对其人物操作
 *       follower id    -   对随从操作，id从1开始，相当于对其人物操作
 *   指令 : 
 *       setDefaultCurrent              -   设置当前行走图为默认行走图
 *       goBackDefault                  -   返回默认行走图
 *       setImage 图片名 块索引          -   设置行走图，索引从0开始，可以用内置的 设置人物图像-设置行走图 代替
 *       setDefaultImage 图片名 块索引   -   设置默认行走图
 * 
 *   # 在触发公共事件中 控制触发人物的行走图图像.
 *   CharacterEx trigger 指令
 *   指令 : 
 *       同 【控制行走图图像】 的四个指令
 * 
 * 
 * ---- 使用方法 ----
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
 * TODO
 * 
 * 
 */
/*~struct~CharacterPicture:
 * @param picture
 * @text 图片
 * @desc 图片
 * @type file
 * @dir img/characters
 *
 * @param frame
 * @text 帧数
 * @desc 图片帧数(列数)
 * @type number
 * @min 1
 * @default 1
 *
 * @param speed
 * @text 速度
 * @desc 播放速度(游戏帧/图案帧) (越小播放越快)
 * 0 : 使用默认的移动速度
 * @type number
 * @min 0
 * @default 0
 * 
 * @param loop
 * @text 是否循环 【弃用】
 * @desc 循环  : 在播放到结束后，回到循环开始帧继续播放
 * 不循环：在播放到结束后，回到第一帧(？循环开始帧)
 * @type boolean
 * @default false
 *
 * @param loopFrame
 * @text 循环帧
 * @desc 循环开始帧：第二次及以后的播放，从该帧开始
 * 设为最后一帧时，可以停在最后一帧
 * @type number
 * @min 1
 * @default 1
 *
 * @param playByWalk
 * @text 行走时播放
 * @desc 是：类似一般的行走图，使用踏步进行播放 (无视[结束退出])
 * 否：用于特殊的动作等，自动播放 (若无[结束退出]，将会循环)
 * @type boolean
 * @default false
 *
 * @param needExit
 * @text 结束退出
 * @desc 是：自动在结束时退出，回到默认行走图 (会无视循环)
 * @type boolean
 * @default true
 *
 * @param canBreak
 * @text 可以中断
 * @desc 是：动作将会做到结束再中止或切换动作
 * 暂时只对 行走时播放 有效
 * @type boolean
 * @default true
 *
 * @param triggerId
 * @text 触发事件
 * @desc 结束时触发的公共事件 (只支持部分功能)
 * 0 : 不触发
 * @type common_event
 * @default 0
 * 
 * @param triggerCondition
 * @text 触发条件
 * @desc 触发事件的条件 0:无 1:当前帧数 2:转变方向 3:静止计时
 * 【触发条件】设置触发条件的编号，再设置对应的【触发条件:XX】
 * @type number
 * @default 0
 * 
 * @param condition_currentFrame
 * @parent triggerCondition
 * @text 触发条件:当前帧数 (1)
 * @desc 当前帧数为【触发条件:当前帧数】，准备进入下一帧，触发事件
 * (帧数从1开始计算 1~N:某帧数 0:任意)
 * @type number
 * @default 0
 * 
 * @param condition_changeDirection
 * @parent triggerCondition
 * @text 触发条件:转变方向 (2)
 * @desc 人物准备转向到【触发条件:转变方向】时，触发事件
 * (方向 2:下 4:左 6:右 8:上 0:任意)
 * @type number
 * @default 0
 * 
 * @param condition_stopCount
 * @parent triggerCondition
 * @text 触发条件:静止计时 (3)
 * @desc 人物停止帧数达到或超过【触发条件:静止计时】时，清除静止计数并触发事件
 * @type number
 * @default 0
 */




var MK_Plugins = MK_Plugins || {};
MK_Plugins.paramGet = MK_Plugins.paramGet || {};
MK_Plugins.param = MK_Plugins.param || {};
MK_Plugins.class = MK_Plugins.class || {};
MK_Plugins.datas = MK_Plugins.datas || {};

MK_Plugins.getPluginParam = 
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




//-----------------------------------------------------------------------------
// MK_CharacterPictureData

function MK_CharacterPictureData() {
	throw new Error('This is a static class');
}


// --------------------------------
// 基本数据读写

MK_CharacterPictureData._data = {};

MK_CharacterPictureData.clearData = function() {
	this._data = {};
};
MK_CharacterPictureData.initData = function(list) {
	list = list || [];
	this.clearData();
	list.forEach(function(obj) {
		var data = {
			name	   : obj.picture, 
			frame	   : obj.frame, 
			speed      : obj.speed, 
			loopFrame  : obj.loopFrame, 

			loop	   : obj.loop, 
			playByWalk : obj.playByWalk, 
			needExit   : obj.needExit, 
			canBreak   : obj.canBreak, 

			triggerId                 : obj.triggerId, 
			triggerCondition          : obj.triggerCondition, 
			condition_currentFrame    : obj.condition_currentFrame, 
			condition_changeDirection : obj.condition_changeDirection, 
			condition_stopCount       : obj.condition_stopCount, 
		};
		this._data[data.name] = data;
	}, this);
};

MK_CharacterPictureData.hasCharacterData = function(name) {
	return !!this._data[name];
};
MK_CharacterPictureData.getCharacterData = function(name) {
	return this._data[name] || {};
};

MK_CharacterPictureData.getCharacterName = function(name) {
	return this.getCharacterData(name).name || '';
};
MK_CharacterPictureData.getCharacterFrame = function(name) {
	return this.getCharacterData(name).frame || 1;
};
MK_CharacterPictureData.getCharacterSpeed = function(name) {
	return this.getCharacterData(name).speed || 0;
};
MK_CharacterPictureData.getCharacterLoopFrame = function(name) {
	return this.getCharacterData(name).loopFrame || 1;
};

MK_CharacterPictureData.getCharacterLoop = function(name) {
	return !!this.getCharacterData(name).loop;
};
MK_CharacterPictureData.getCharacterPlayByWalk = function(name) {
	return !!this.getCharacterData(name).playByWalk;
};
MK_CharacterPictureData.getCharacterNeedExit = function(name) {
	return !!this.getCharacterData(name).needExit;
};
MK_CharacterPictureData.getCharacterCanBreak = function(name) {
	return !!this.getCharacterData(name).canBreak;
};

MK_CharacterPictureData.getCharacterTriggerId = function(name) {
	return this.getCharacterData(name).triggerId;
};
MK_CharacterPictureData.getCharacterTriggerCondition = function(name) {
	return this.getCharacterData(name).triggerCondition;
};
MK_CharacterPictureData.getCharacterCondition_currentFrame = function(name) {
	return this.getCharacterData(name).condition_currentFrame;
};
MK_CharacterPictureData.getCharacterCondition_changeDirection = function(name) {
	return this.getCharacterData(name).condition_changeDirection;
};
MK_CharacterPictureData.getCharacterCondition_stopCount = function(name) {
	return this.getCharacterData(name).condition_stopCount;
};


// --------------------------------
// 基本数据读写-简单名称映射

MK_CharacterPictureData.clear = function() {
	return this.clearData.apply(this, arguments);
};
MK_CharacterPictureData.init = function(list) {
	return this.initData.apply(this, arguments);
};

MK_CharacterPictureData.has = function(name) {
	return this.hasCharacterData.apply(this, arguments);
};
MK_CharacterPictureData.data = function(name) {
	return this.getCharacterData.apply(this, arguments);
};

MK_CharacterPictureData.name = function(name) {
	return this.getCharacterName.apply(this, arguments);
};
MK_CharacterPictureData.frame = function(name) {
	return this.getCharacterFrame.apply(this, arguments);
};
MK_CharacterPictureData.speed = function(name) {
	return this.getCharacterSpeed.apply(this, arguments);
};
MK_CharacterPictureData.loopFrame = function(name) {
	return this.getCharacterLoopFrame.apply(this, arguments);
};

MK_CharacterPictureData.loop = function(name) {
	return this.getCharacterLoop.apply(this, arguments);
};
MK_CharacterPictureData.playByWalk = function(name) {
	return this.getCharacterPlayByWalk.apply(this, arguments);
};
MK_CharacterPictureData.needExit = function(name) {
	return this.getCharacterNeedExit.apply(this, arguments);
};
MK_CharacterPictureData.canBreak = function(name) {
	return this.getCharacterCanBreak.apply(this, arguments);
};

MK_CharacterPictureData.triggerId = function(name) {
	return this.getCharacterTriggerId.apply(this, arguments);
};
MK_CharacterPictureData.triggerCondition = function(name) {
	return this.getCharacterTriggerCondition.apply(this, arguments);
};
MK_CharacterPictureData.condition_currentFrame = function(name) {
	return this.getCharacterCondition_currentFrame.apply(this, arguments);
};
MK_CharacterPictureData.condition_changeDirection = function(name) {
	return this.getCharacterCondition_changeDirection.apply(this, arguments);
};
MK_CharacterPictureData.condition_stopCount = function(name) {
	return this.getCharacterCondition_stopCount.apply(this, arguments);
};


// --------------------------------
// 参数配置读写

MK_CharacterPictureData._config = {
	trg_swi_isPlayer  : 0, 
	trg_swi_isActor   : 0, 
	trg_var_eventId   : 0, 
	trg_var_currFrame : 0, 
	trg_var_direction : 0, 
	trg_var_stopCount : 0, 
};

MK_CharacterPictureData.initConfig = function(config) {
	this._config.trg_swi_isPlayer  = config.trg_swi_isPlayer;
	this._config.trg_swi_isActor   = config.trg_swi_isActor;
	this._config.trg_var_eventId   = config.trg_var_eventId;
	this._config.trg_var_currFrame = config.trg_var_currFrame;
	this._config.trg_var_direction = config.trg_var_direction;
	this._config.trg_var_stopCount = config.trg_var_stopCount;
};


MK_CharacterPictureData.setTriggerSwitch = function(id, value) {
	!!$gameSwitches && id > 0 && $gameSwitches.setValue(id, value);
};
MK_CharacterPictureData.setTriggerVariable = function(id, value) {
	!!$gameVariables && id > 0 && $gameVariables.setValue(id, value);
};

MK_CharacterPictureData.setTriggerIsPlayer = function(value) {
	this.setTriggerSwitch(this._config.trg_swi_isPlayer, value);
};
MK_CharacterPictureData.setTriggerIsActor = function(value) {
	this.setTriggerSwitch(this._config.trg_swi_isActor, value);
};
MK_CharacterPictureData.setTriggerEventId = function(value) {
	this.setTriggerVariable(this._config.trg_var_eventId, value);
};
MK_CharacterPictureData.setTriggerCurrFrame = function(value) {
	this.setTriggerVariable(this._config.trg_var_currFrame, value);
};
MK_CharacterPictureData.setTriggerDirection = function(value) {
	this.setTriggerVariable(this._config.trg_var_direction, value);
};
MK_CharacterPictureData.setTriggerStopCount = function(value) {
	this.setTriggerVariable(this._config.trg_var_stopCount, value);
};


// --------------------------------
// 公共事件触发

MK_CharacterPictureData._triggerCharacterStack = [];

MK_CharacterPictureData.clearTriggerCharacter = function() {
	this._triggerCharacterStack = [];
};
MK_CharacterPictureData.getTriggerCharacter = function() {
	obj = this._triggerCharacterStack[this._triggerCharacterStack.length - 1];
	return !!obj ? obj.target : null;
};
MK_CharacterPictureData.popTriggerCharacter = function() {
	return this._triggerCharacterStack.pop();
};
MK_CharacterPictureData.pushTriggerCharacter = function(character) {
	obj = {
		'target' : character, 
		'changed' : false, 
	}
	this._triggerCharacterStack.push(obj); 
};
MK_CharacterPictureData.setTriggerCharacterChanged = function(value) {
	value = !!value;
	obj = this._triggerCharacterStack[this._triggerCharacterStack.length - 1];
	if (!!obj) obj.changed = value;
};


MK_CharacterPictureData.executeCommonEvent = function(commonEventId) {
	var commonEvent = $dataCommonEvents[commonEventId];
	if (commonEvent) {
	    var interpreter = new Game_Interpreter();
	    interpreter.setup(commonEvent.list, 0);
	    interpreter.update();
	}
};

MK_CharacterPictureData.triggerCommonEvent = function(name, character) {
	if (typeof name === 'object') {
		character = name;
		name = character._characterName;
	}

	var triggerId = this.triggerId(name);
	if (!triggerId && triggerId <= 0) return ;

	this.inputCharacterData(character);

	this.pushTriggerCharacter(character);
	this.executeCommonEvent(triggerId);
	var obj = this.popTriggerCharacter();

	return !!obj ? obj.changed : false;
};

MK_CharacterPictureData.triggerByCurrentFrameIfNeed = function(name, character) {
	if (this.needTriggerByCurrentFrame(name, character)) {
		return this.triggerCommonEvent(name, character);
	}
	else 
		return false;
};

MK_CharacterPictureData.triggerByChangeDirectionIfNeed = function(name, character) {
	if (this.needTriggerByChangeDirection(name, character)) {
		return this.triggerCommonEvent(name, character);
	}
	else 
		return false;
};

MK_CharacterPictureData.triggerByStopCountIfNeed = function(name, character) {
	if (this.needTriggerByStopCount(name, character)) {
		var res = this.triggerCommonEvent(name, character);
		if (typeof name === 'object') {
			character = name;
			name = character._characterName;
		}
		if (character) character._stopCount = 0;
		return res;
	}
	else 
		return false;
};


MK_CharacterPictureData.inputCharacterData = function(character) {
	if (!character) return ;

	var isPlayer = character.constructor === Game_Player;
	this.setTriggerIsPlayer(isPlayer);
	var isFollower = character.constructor === Game_Follower;
	this.setTriggerIsActor(isPlayer || isFollower);
	var eventId = 0;
	if (isPlayer) {
		var leader = $gameParty.leader();
		eventId = leader ? leader.actor()._actorId : 0;
	}
	else if (isFollower) {
		eventId = character.actor()._actorId;
	}
	else {
		eventId = character._eventId;
	}
	this.setTriggerEventId(eventId);
	this.setTriggerCurrFrame(character._pattern);
	this.setTriggerDirection(character._direction);
	this.setTriggerStopCount(character._stopCount);
};


// --------------------------------
// 触发事件判断

MK_CharacterPictureData.needTriggerByCurrentFrame = function(name, character) {
	if (typeof name === 'object') {
		character = name;
		name = character._characterName;
	}

	if (this.triggerCondition(name) == 1) {
		if (!character) return true; // ？TODO ...
		else {
			var value = character._pattern + 1;
			var target = this.condition_currentFrame(name);
			return value == target || target == 0;
		}
	}
	else 
		return false;
};
MK_CharacterPictureData.needTriggerByChangeDirection = function(name, character) {
	if (typeof name === 'object') {
		character = name;
		name = character._characterName;
	}

	if (this.triggerCondition(name) == 2) {
		if (!character) return true; // ？TODO ...
		else {
			var value = character._direction;
			var target = this.condition_changeDirection(name);
			return value == target || target == 0;
		}
	}
	else 
		return false;
};
MK_CharacterPictureData.needTriggerByStopCount = function(name, character) {
	if (typeof name === 'object') {
		character = name;
		name = character._characterName;
	}

	if (this.triggerCondition(name) == 3) {
		if (!character) return true; // ？TODO ...
		else {
			var value = character._stopCount;
			var target = this.condition_stopCount(name);
			return value >= target;
		}
	}
	else 
		return false;
};


MK_Plugins.class['MK_CharacterPictureData'] = MK_CharacterPictureData;




//-----------------------------------------------------------------------------
// getPluginParam

(function() {

	var pluginName = 'MK_CharacterEx';
	MK_Plugins.paramGet[pluginName] = MK_Plugins.getPluginParam(pluginName);
	MK_Plugins.param[pluginName] = {};

	var paramGet = MK_Plugins.paramGet[pluginName];
	var param = MK_Plugins.param[pluginName];

	param['CharacterPictureData'] = JSON.parse(String(paramGet['CharacterPictureData'] || '[]' ));
	param['CharacterPictureData'] = param['CharacterPictureData'].map(function(str) { return JSON.parse(str); })
	
	param['CharacterPictureData'].forEach(function(obj) { obj.frame = Number(obj.frame || 1); });
	param['CharacterPictureData'].forEach(function(obj) {
		obj.name	                  = String(obj.name      || '');
		obj.frame	                  = Number(obj.frame	 || 1);
		obj.speed	                  = Number(obj.speed	 || 0);
		obj.loopFrame                 = Number(obj.loopFrame || 1);

		obj.loop	                  = /true/i.test(obj.loop);
		obj.autoPlay                 = !/false/i.test(obj.autoPlay);
		obj.playByWalk                = /true/i.test(obj.playByWalk);
		obj.needExit                  = !/false/i.test(obj.needExit);
		obj.canBreak                  = !/false/i.test(obj.canBreak);

		obj.triggerId                 = Number(obj.triggerId                 || 0);
		obj.triggerCondition          = Number(obj.triggerCondition          || 0);
		obj.condition_currentFrame    = Number(obj.condition_currentFrame    || 0);
		obj.condition_changeDirection = Number(obj.condition_changeDirection || 0);
		obj.condition_stopCount       = Number(obj.condition_stopCount       || 0);
	});

	MK_CharacterPictureData.initData(param['CharacterPictureData']);

	param['trg_swi_isPlayer']  = Number(paramGet['trg_swi_isPlayer']  || 0);
	param['trg_swi_isActor']   = Number(paramGet['trg_swi_isActor']   || 0); 
	param['trg_var_eventId']   = Number(paramGet['trg_var_eventId']   || 0); 
	param['trg_var_currFrame'] = Number(paramGet['trg_var_currFrame'] || 0); 
	param['trg_var_direction'] = Number(paramGet['trg_var_direction'] || 0); 
	param['trg_var_stopCount'] = Number(paramGet['trg_var_stopCount'] || 0); 

	var config = {
		trg_swi_isPlayer  : param['trg_swi_isPlayer'], 
		trg_swi_isActor   : param['trg_swi_isActor'], 
		trg_var_eventId   : param['trg_var_eventId'], 
		trg_var_currFrame : param['trg_var_currFrame'], 
		trg_var_direction : param['trg_var_direction'], 
		trg_var_stopCount : param['trg_var_stopCount'], 
	};

	MK_CharacterPictureData.initConfig(config);
})();




//-----------------------------------------------------------------------------
// Game_CharacterBase

(function() {
	Game_CharacterBase.prototype.isCharacterEx = function() {
		if (typeof this._isCharacterEx === 'undefined') 
			return this.refreshCheckCharacterEx();
		else 
			return this._isCharacterEx;
	};


	var _MK_Game_CharacterBase_updateAnimation   = Game_CharacterBase.prototype.updateAnimation;
	Game_CharacterBase.prototype.updateAnimation = function() {
		_MK_Game_CharacterBase_updateAnimation.apply(this, arguments);
	};

	var _MK_Game_CharacterBase_animationWait   = Game_CharacterBase.prototype.animationWait;
	Game_CharacterBase.prototype.animationWait = function() {
		var speed = MK_CharacterPictureData.speed(this._characterName);
		if (!this.isCharacterEx() || !(speed > 0)) {
			return _MK_Game_CharacterBase_animationWait.apply(this, arguments);
		}
		else {
			return speed;
		}
	};

	var _MK_Game_CharacterBase_updateAnimationCount   = Game_CharacterBase.prototype.updateAnimationCount;
	Game_CharacterBase.prototype.updateAnimationCount = function() {
		if (!this.isCharacterEx()) {
			_MK_Game_CharacterBase_updateAnimationCount.apply(this, arguments);
		}
		else {
			if (MK_CharacterPictureData.playByWalk(this._characterName)) {
				_MK_Game_CharacterBase_updateAnimationCount.apply(this, arguments);
			}
			else {
				this._animationCount++;
			}
		}
	};

	var _MK_Game_CharacterBase_updatePattern   = Game_CharacterBase.prototype.updatePattern;
	Game_CharacterBase.prototype.updatePattern = function() {
		if (!this.isCharacterEx()) {
			_MK_Game_CharacterBase_updatePattern.apply(this, arguments);
		}
		else {
			var res = MK_CharacterPictureData.triggerByCurrentFrameIfNeed(this);
			if (res) return ;

			if (MK_CharacterPictureData.playByWalk(this._characterName)) {
				// 通过行走播放
				if (!this.hasStepAnime() && this._stopCount > 0) {
					// 需要停止步行
					if (MK_CharacterPictureData.canBreak(this._characterName)) {
						// 可以中断
						this.resetPattern();
					}
					else {
						// 不可中断
						// ？TODO : 可以设定一些退出帧 ...
						if (!this.isOriginalPattern()) {
							// 已经播放 (非最初帧)
							this._pattern = (this._pattern + 1) % this.maxPattern();
						}
						else {
							MK_CharacterPictureData.triggerCommonEvent(this._characterName, this);
						}
					}
				} else {
					// 不是停止步行
					// ？这里 不考虑 结束退出 ...
					var frame = this.maxPattern();
					if (this._pattern == frame - 1) {
						this._pattern = MK_CharacterPictureData.loopFrame(this._characterName) - 1;
						this._pattern = (this._pattern % frame + frame) % frame;
					}
					else {
						this._pattern = (this._pattern + 1) % this.maxPattern();
					}
				}
			}
			else {
				// 自动播放
				this._pattern = (this._pattern + 1) % this.maxPattern();
			}
		}
	};


	var _MK_Game_CharacterBase_maxPattern   = Game_CharacterBase.prototype.maxPattern;
	Game_CharacterBase.prototype.maxPattern = function() {
		if (!this.isCharacterEx()) {
			return _MK_Game_CharacterBase_maxPattern.apply(this, arguments);
		}
		else {
			return MK_CharacterPictureData.getCharacterFrame(this._characterName);
		}
	};

	var _MK_Game_CharacterBase_pattern   = Game_CharacterBase.prototype.pattern;
	Game_CharacterBase.prototype.pattern = function() {
		if (!this.isCharacterEx()) {
			return _MK_Game_CharacterBase_pattern.apply(this, arguments);
		}
		else {
			return this._pattern;
		}
	};

	var _MK_Game_CharacterBase_setPattern   = Game_CharacterBase.prototype.setPattern;
	Game_CharacterBase.prototype.setPattern = function(pattern) {
		if (!this.isCharacterEx()) {
			_MK_Game_CharacterBase_setPattern.apply(this, arguments);
		}
		else {
			this._pattern = pattern;
		}
	};

	var _MK_Game_CharacterBase_isOriginalPattern   = Game_CharacterBase.prototype.isOriginalPattern;
	Game_CharacterBase.prototype.isOriginalPattern = function() {
		if (!this.isCharacterEx()) {
			return _MK_Game_CharacterBase_isOriginalPattern.apply(this, arguments);
		}
		else {
			return this.pattern() === 0;
		}
	};

	var _MK_Game_CharacterBase_resetPattern   = Game_CharacterBase.prototype.resetPattern;
	Game_CharacterBase.prototype.resetPattern = function() {
		if (!this.isCharacterEx()) {
			_MK_Game_CharacterBase_resetPattern.apply(this, arguments);
		}
		else {
			this.setPattern(0);
		}
	};

	var _MK_Game_CharacterBase_setImage   = Game_CharacterBase.prototype.setImage;
	Game_CharacterBase.prototype.setImage = function(characterName, characterIndex) {
		_MK_Game_CharacterBase_setImage.apply(this, arguments);
		this.refreshCheckCharacterEx();
		this.resetPattern();

		this.refreshDefaultCharacter();
	};

	Game_CharacterBase.prototype.refreshCheckCharacterEx = function() {
		return this._isCharacterEx = MK_CharacterPictureData.has(this._characterName);
	};

	Game_CharacterBase.prototype.characterFrameCount = function() {
		return this.maxPattern() || 1;
	};


	var _MK_Game_CharacterBase_initMembers   = Game_CharacterBase.prototype.initMembers;
	Game_CharacterBase.prototype.initMembers = function() {
		_MK_Game_CharacterBase_initMembers.apply(this, arguments);
		this.clearDefaultCharacter();
	};


	Game_CharacterBase.prototype.clearDefaultCharacter = function() {
		this._defaultCharacterName = undefined;
		this._defaultCharacterIndex = undefined;
	};

	Game_CharacterBase.prototype.setCurrentDefaultCharacter = function() {
		this.setDefaultCharacter(this._characterName, this._characterIndex);
	};

	Game_CharacterBase.prototype.setDefaultCharacter = function(characterName, characterIndex) {
		this._defaultCharacterName = characterName;
		this._defaultCharacterIndex = characterIndex;
	};

	Game_CharacterBase.prototype.refreshDefaultCharacter = function() {
		if (typeof this._defaultCharacterName === 'undefined') {
			this._defaultCharacterName = this._characterName;
			this._defaultCharacterIndex = this._characterIndex;
		}
	};


	Game_CharacterBase.prototype.goBackDefaultCharacter = function() {
		this.setImage(this._defaultCharacterName, this._defaultCharacterIndex);
	};


	var _MK_Game_CharacterBase_straighten   = Game_CharacterBase.prototype.straighten;
	Game_CharacterBase.prototype.straighten = function() {
		if (!this.isCharacterEx()) {
			return _MK_Game_CharacterBase_straighten.apply(this, arguments);
		}
		else {
		}
	};


	var _MK_Game_CharacterBase_updateStop   = Game_CharacterBase.prototype.updateStop;
	Game_CharacterBase.prototype.updateStop = function() {
		_MK_Game_CharacterBase_updateStop.apply(this, arguments);
		if (this.isCharacterEx()) {
			MK_CharacterPictureData.triggerByStopCountIfNeed(this);
		}
	};


	var _MK_Game_CharacterBase_setDirection   = Game_CharacterBase.prototype.setDirection;
	Game_CharacterBase.prototype.setDirection = function(d) {
		var changeDir = this._direction != d;
		_MK_Game_CharacterBase_setDirection.apply(this, arguments);
		if (changeDir && this.isCharacterEx()) {
			MK_CharacterPictureData.triggerByChangeDirectionIfNeed(this);
		}
	};
})();




//-----------------------------------------------------------------------------
// Sprite_Character

(function() {

	var _MK_Sprite_Character_updateBitmap   = Sprite_Character.prototype.updateBitmap;
	Sprite_Character.prototype.updateBitmap = function() {
		if (this.isImageChanged()) {
			this._isCharacterEx = this._character.isCharacterEx();
			this._characterFrameCount = this._character.characterFrameCount();
		}
		_MK_Sprite_Character_updateBitmap.apply(this, arguments);
	};

	var _MK_Sprite_Character_isImageChanged   = Sprite_Character.prototype.isImageChanged;
	Sprite_Character.prototype.isImageChanged = function() {
		return (_MK_Sprite_Character_isImageChanged.apply(this, arguments) ||
				this._isCharacterEx !== this._character._isCharacterEx);
	};


	Sprite_Character.prototype.isCharacterEx = function() {
		return this._isCharacterEx;
	};

	Sprite_Character.prototype.characterFrameCount = function() {
		return this._characterFrameCount;
	};

	var _MK_Sprite_Character_characterBlockX   = Sprite_Character.prototype.characterBlockX;
	Sprite_Character.prototype.characterBlockX = function() {
		if (!this.isCharacterEx()) {
			return _MK_Sprite_Character_characterBlockX.apply(this, arguments);
		}
		else {
			if (this._isBigCharacter) {
				return 0;
			} else {
				var index = this._character.characterIndex();
				return index % 4 * this.characterFrameCount();
			}
		}
	};

	var _MK_Sprite_Character_patternWidth   = Sprite_Character.prototype.patternWidth;
	Sprite_Character.prototype.patternWidth = function() {
		if (!this.isCharacterEx()) {
			return _MK_Sprite_Character_patternWidth.apply(this, arguments);
		}
		else {
			if (this._tileId > 0) {
				return $gameMap.tileWidth();
			} else if (this._isBigCharacter) {
				return this.bitmap.width / this.characterFrameCount();
			} else {
				return this.bitmap.width / 4 / this.characterFrameCount();
			}
		}
	};
})();




//-----------------------------------------------------------------------------
// Game_Event

(function() {
	var _MK_Game_Event_setupPage   = Game_Event.prototype.setupPage;
	Game_Event.prototype.setupPage = function() {
		this.clearDefaultCharacter();
		_MK_Game_Event_setupPage.apply(this, arguments);
	};
})();




//-----------------------------------------------------------------------------
// Game_Actor

(function() {

	var _MK_Game_Actor_initMembers   = Game_Actor.prototype.initMembers;
	Game_Actor.prototype.initMembers = function() {
		_MK_Game_Actor_initMembers.apply(this, arguments);
		this.clearDefaultCharacter();
	};

	var _MK_Game_Actor_initImages   = Game_Actor.prototype.initImages;
	Game_Actor.prototype.initImages = function() {
		_MK_Game_Actor_initImages.apply(this, arguments);
		this.setCurrentDefaultCharacter();
	};

	var _MK_Game_Actor_setCharacterImage   = Game_Actor.prototype.setCharacterImage;
	Game_Actor.prototype.setCharacterImage = function(characterName, characterIndex) {
		_MK_Game_Actor_setCharacterImage.apply(this, arguments);
		this.refreshDefaultCharacter();
	};


	Game_Actor.prototype.clearDefaultCharacter = function() {
		this._defaultCharacterName = undefined;
		this._defaultCharacterIndex = undefined;
	};

	Game_Actor.prototype.setCurrentDefaultCharacter = function() {
		this.setDefaultCharacter(this._characterName, this._characterIndex);
	};

	Game_Actor.prototype.setDefaultCharacter = function(characterName, characterIndex) {
		this._defaultCharacterName = characterName;
		this._defaultCharacterIndex = characterIndex;
	};

	Game_Actor.prototype.refreshDefaultCharacter = function() {
		if (typeof this._defaultCharacterName === 'undefined') {
			this._defaultCharacterName = this._characterName;
			this._defaultCharacterIndex = this._characterIndex;
		}
	};


	Game_Actor.prototype.goBackDefaultCharacter = function() {
		this.setCharacterImage(this._defaultCharacterName, this._defaultCharacterIndex);
	};
})();




(function() {
	var _MK_Game_Interpreter_pluginCommand   = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function (command, args) {
		_MK_Game_Interpreter_pluginCommand.apply(this, arguments);

		if (/CharacterEx/i.test(command)) {
			var index = 0;

			var targetType = String(args[index++]);
			var targetId = Number(args[index++]);
			var target = null;
			var targetActor = null;
			var isTriggerTarget = false;

			if (/event/i.test(targetType)) {
				target = $gameMap.event(targetId);
			}
			else if (/actor/i.test(targetType)) {
				targetActor = $gameActors.actor(targetId);
				target = actorToTarget(targetActor);
			}
			else if (/player/i.test(targetType)) {
				target = $gamePlayer;
				targetActor = targetToActor(target);
				index--;
			}
			else if (/follower/i.test(targetType)) {
				target = $gamePlayer.followers().follower(targetId - 1);
				targetActor = targetToActor(target);
			}
			else if (/trigger/i.test(targetType)) {
				target = MK_CharacterPictureData.getTriggerCharacter();
				targetActor = targetToActor(target);
				isTriggerTarget = true;
				index--;
			}


			var subCommand = String(args[index++]);
			var picName = String(args[index++]);
			var picIndex = Number(args[index++] || 0);
			if (/setImage/i.test(subCommand)) {
				if (!!targetActor) {
					targetActor.setCharacterImage(picName, picIndex);
					!!target && target.setImage(targetActor._characterName, targetActor._characterIndex);
				}
				else {
					!!target && target.setImage(picName, picIndex);
				}

				if (isTriggerTarget && target) 
					MK_CharacterPictureData.setTriggerCharacterChanged(true);
			}
			else if (/setDefaultImage/i.test(subCommand)) {
				if (!!targetActor) {
					targetActor.setCharacterImage(picName, picIndex);
				}
			}
			else if (/setDefaultCurrent/i.test(subCommand)) {
				if (!!targetActor) {
					targetActor.setCurrentDefaultCharacter();
				}
				index--; index--;
			}
			else if (/goBackDefault/i.test(subCommand)) {
				if (!!targetActor) {
					targetActor.goBackDefaultCharacter();
					!!target && target.setImage(targetActor._characterName, targetActor._characterIndex);
				}
				else {
					!!target && target.goBackDefaultCharacter();
				}
				index--; index--;

				if (isTriggerTarget && target) 
					MK_CharacterPictureData.setTriggerCharacterChanged(true);
			}
		}
	};

	function actorToTarget(targetActor) {
		if (!targetActor) return null;
		var target = null;
		if ($gameParty.leader() === targetActor) {
			target = $gamePlayer;
		}
		else {
			$gamePlayer.followers._followers.forEach(function(follower) {
				if (follower.actor() === targetActor) {
					target = follower;
				}
			});
		}
	}

	function targetToActor(target) {
		if (!target) return null;
		var targetActor = null;
		if (target.constructor === Game_Player) {
			targetActor = $gameParty.leader();
		}
		else if (target.constructor === Game_Follower) {
			targetActor = target.actor();
		}
		return targetActor;
	}
})();

