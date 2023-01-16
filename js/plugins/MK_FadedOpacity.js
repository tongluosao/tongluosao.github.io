//=============================================================================
// MK_FadedOpacity.js
// 渐变不透明度
//=============================================================================
//  author : Mikan 
//  plugin : MK_FadedOpacity.js 渐变不透明度
// version : v1.1.0 2020/10/14 增加根据距离改变透明度的功能
// ------------------------------------------------------------------------------
// [Twitter] https://twitter.com/_MikanHako/
//  [GitHub] https://github.com/MikanHako1024/
//    [Blog] NONE
//=============================================================================




/*:
 * @plugindesc 渐变不透明度 <MK_FadedOpacity>
 * @author Mikan 
 * @version v1.1.0 2020/10/14 增加根据距离改变透明度的功能
 * v1.0.0 2020/03/24 完成基本功能
 * v0.1.0 2020/03/24 开发中
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
 * ---- 插件指令 ----
 *   
 *   # 不透明度渐变
 *   
 *     ## 设置事件不透明度渐变
 *     FadeOpacity Event 事件id 变化值目标 变化时间
 *     
 *       ex : 设置事件5 在180帧内 变成全透明 (全透明为0)
 *            FadeOpacity Event 5 0 180
 *       ex : 设置事件5 在180帧内 变成全显示 (全显示为255)
 *            FadeOpacity Event 5 255 180
 *       ex : 设置事件5 立即变成全透明 (设置时间为0表示立即)
 *            FadeOpacity Event 5 0 0
 *   
 *     ## 设置角色不透明度渐变
 *     FadeOpacity Player 变化值目标 变化时间
 *   
 *     ## 设置事件不透明度渐变 完成时触发开关
 *     FadeOpacity Event 事件id 变化值目标 变化时间 开关id 开关状态
 *     
 *       ex : 设置事件5 在180帧内 变成全透明 结束后设置开关7 为on
 *            FadeOpacity Event 5 0 180 7 on
 *   
 *     ## 设置角色不透明度渐变
 *     FadeOpacity Player 变化值目标 变化时间
 *   
 *   
 *   # 自动不透明度
 *     
 *     ## 根据距离自动设置不透明度
 *     AutoOpacity [目标] [模式] [参考] [变化参数]
 *     
 *       目标 : 被设置不透明度的目标
 *              Event 事件id / Player
 *       模式 : 计算距离的方法
 *              dist / distX / distY
 *         直线距离 / 横向距离 / 纵向距离
 *       参考 : 计算目标到谁的距离
 *              Event 事件id / Player / Number x y / Number x / Number y
 *                  事件        玩家     固定点 (分别是dist/distX/distY) (从左上角0,0开始数格子数)
 *       变化参数 : 不透明度变化的范围
 *              值1 to 值2 on 距离1 to 距离2 by 速度
 *                                             (每帧变化量，0为立即变化)
 *              距离从距离1到距离2时，不透明度将从值1变化到值2
 *              距离小于距离1时取值1；距离大于距离2时取值2
 *       
 *       例 : AutoPacity player dist number 0 5 0 to 255 on 2 to 6 by 0
 *     
 *     ## 取消自动设置不透明度
 *     EndAutoOpacity [目标]
 *     
 * 
 *   
 * ---- 用语说明 ----
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
 * ---- 标签设置 ----
 * 
 * TODO
 * 
 * 
 * 
 * ---- 使用方法 ----
 * 
 * 提供基本的使角色、事件、交通工具透明度渐变的功能，
 * 可以让其在规定帧数内透明度均匀变化至某个值，要注意的是透明度范围0-255。
 * 当然也可以设置变化为立即变化。
 * 
 * 另外在切换地图、存读档时，会保留透明度变化状态，
 * 即回到地图、读档时，会恢复之前的透明度，或是继续尚未完成的渐变。
 * 
 * 插件允许在渐变完成时改变一个开关的状态，
 * 可以借此切换事件的事件页，在事件页中实现需要的控制。
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
 * 仓库：https://github.com/MikanHako1024/  ___TBD___
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
 */




var MK_Plugins = MK_Plugins || {};
MK_Plugins.paramGet = MK_Plugins.paramGet || {};
MK_Plugins.param = MK_Plugins.param || {};
MK_Plugins.class = MK_Plugins.class || {};
MK_Plugins.datas = MK_Plugins.datas || {};



//-----------------------------------------------------------------------------
// FadedOpacityData

function FadedOpacityData() {
	this.initialize.apply(this, arguments);
}

FadedOpacityData.prototype.constructor = FadedOpacityData;


FadedOpacityData.prototype.initialize = function() {
	this._fade = {};
	this._callback = {};
};

FadedOpacityData.prototype.setFadeValue = function(flag, fromOp, toOp, time) {
	this._fade[flag] = this._fade[flag] || {};
	this._fade[flag].nowOpacity  = fromOp;
	this._fade[flag].fromOpacity = fromOp;
	this._fade[flag].toOpacity   = toOp;
	this._fade[flag].fadeTime    = time;
	this._fade[flag].mode = 0;
};

FadedOpacityData.prototype.setAutoFadeValue = function(flag, nowOp, refer, distMode, fromOp, toOp, fromDist, toDist, speed) {
	this._fade[flag] = this._fade[flag] || {};
	
	this._fade[flag].nowOpacity  = nowOp;
	
	this._fade[flag].refer       = refer;
	this._fade[flag].distMode    = distMode;
	
	if (fromDist > toDist) {
		var tmp;
		tmp = fromOp;
		fromOp = toOp;
		toOp = tmp;
		tmp = fromDist;
		fromDist = toDist;
		toDist = tmp;
	}
	this._fade[flag].fromOp   = fromOp;
	this._fade[flag].toOp     = toOp;
	this._fade[flag].fromDist = fromDist;
	this._fade[flag].toDist   = toDist;
	
	this._fade[flag].speed    = speed;
	this._fade[flag].mode = 1;
};

FadedOpacityData.prototype.unsetAutoFade = function(flag) {
	var data = this._fade[flag];
	if (!!data && data.mode == 1) {
		delete this._fade[flag];
	}
};


FadedOpacityData.prototype.getCharacterPos = function(c) {
	if (!!c && !!(c instanceof Game_Character)) {
		return {x : c._realX, y : c._realY};
	}
};

FadedOpacityData.prototype.getReferPos = function(flag) {
	var pos = {x : 0, y : 0};
	var data = this._fade[flag];
	if (!data || data.mode != 1 || !data.refer) return pos;
	
	var refer = data.refer;
	if (refer[0] == 'number') {
		pos.x = Number(refer[1]);
		pos.y = Number(refer[2]);
	}
	else {
		var referObj = null;
		if (refer[0] == 'event') {
			referObj = $gameMap.event(Number(refer[1]) || 0);
		}
		else if (refer[0] == 'player') {
			referObj = $gamePlayer;
		}
		// TODO : follower
		else if (refer[0] == 'vehicle') {
			referObj = $gameMap.vehicle(String(refer[1]).toLowerCase());
		}
		
		if (!!referObj) {
			var referPos = this.getCharacterPos(referObj);
			if (!!referPos) pos = referPos;
		}
	}
	return pos;
};

FadedOpacityData.prototype.calDistance = function(pos1, pos2) {
	var dx = pos1.x - pos2.x;
	var dy = pos1.y - pos2.y;
	return Math.sqrt(dx * dx + dy * dy);
};

FadedOpacityData.prototype.calObjDistance = function(flag, target) {
	var data = this._fade[flag];
	if (!data || !data.distMode || !target || !(target instanceof Game_Character)) return ;
	
	var pos1 = this.getCharacterPos(target);
	var pos2 = this.getReferPos(flag);
	if (!!pos1 && !!pos2) {
		switch (data.distMode) {
			case 1:
				break;
			case 2:
				pos1.y = pos2.y = 0;
				break;
			case 3:
				pos1.x = pos2.x = 0;
				break;
		}
		return this.calDistance(pos1, pos2);
	}
};

FadedOpacityData.prototype.updateToOpacity = function(flag, target) {
	var data = this._fade[flag];
	if (!data || data.mode != 1) return ;
	
	var dist = Number(this.calObjDistance(flag, target));
	var opacity = data.toOpacity;

	var fromOp = data.fromOp;
	var toOp = data.toOp;
	var fromDist = data.fromDist;
	var toDist = data.toDist;

	// 之前保证了 fromDist小于toDist
	if (dist <= fromDist) {
		opacity = fromOp;
	}
	else if (dist >= toDist) {
		opacity = toOp;
	}
	else {
		var rate = (toOp - fromOp) / (toDist - fromDist);
		var tmp = fromOp + rate * (dist - fromDist);
		if (!Number.isNaN(tmp)) {
			opacity = Math.floor(tmp);
		}
	}

	if (!Number.isNaN(Number(opacity))) {
		data.toOpacity = opacity;
	}
	else {
		console.log('error');
	}
};


FadedOpacityData.prototype.getFadeValue = function(flag, target) {
    this.updateToOpacity(flag, target);
	return this._fade[flag];
};

FadedOpacityData.prototype.setNowOpacity = function(flag, value) {
	var data = this._fade[flag];
	if (!!data) {
		data.nowOpacity = value;
	}
};

FadedOpacityData.prototype.setFixedOpacity = function(flag) {
	var data = this._fade[flag];
	if (!!data) {
		data.fadeTime = 0;
	}
};

FadedOpacityData.prototype.setCallbackValue = function(flag, id, value) {
	this._callback[flag] = this._callback[flag] || {};
	this._callback[flag].switchId    = id;
	this._callback[flag].switchValue = value;
};

FadedOpacityData.prototype.getCallbackValue = function(flag) {
	return this._callback[flag];
};

FadedOpacityData.prototype.unsetCallback = function(flag) {
	delete this._callback[flag];
};


FadedOpacityData.prototype.makeCallbackFunction = function(flag) {
	var that = this;
	var data = this._callback[flag];
	if (!!data) {
		return function() {
			$gameSwitches.setValue(data.switchId, data.switchValue);
			
			that.unsetCallback(flag);
		};
	}
	else {
		return function() {};
	}
};


MK_Plugins.class['FadedOpacityData'] = FadedOpacityData;



var fadedOpacityData;

(function() {


//-----------------------------------------------------------------------------
// DataManager  save and load data

var pluginName = 'MK_FadedOpacity';

var _MK_DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
	_MK_DataManager_createGameObjects.apply(this, arguments);
	fadedOpacityData = new FadedOpacityData();
};

var _MK_DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
	var contents = _MK_DataManager_makeSaveContents.apply(this, arguments);
	contents.fadedOpacityData = fadedOpacityData || new FadedOpacityData();
	return contents;
};

var _MK_DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
	_MK_DataManager_extractSaveContents.apply(this, arguments);
	fadedOpacityData = contents.fadedOpacityData || new FadedOpacityData();
};




//-----------------------------------------------------------------------------
// Game_Character  updateFadeOpacity

var _MK_Game_Character_update   = Game_Character.prototype.update;
Game_Character.prototype.update = function() {
	_MK_Game_Character_update.apply(this, arguments);
	this.updateFadeOpacity();
};

Game_Character.prototype.updateFadeOpacity = function() {
	if (this.needFadeOpacity()) {
		var flag = this.fadeOpacityFlag();
		var data = fadedOpacityData.getFadeValue(flag, this);

		var opacity = this.opacity();
		
		if (data.mode == 0) {
			if (data.fadeTime > 0)
				opacity += (data.toOpacity - data.fromOpacity) / data.fadeTime;
			else
				opacity = data.toOpacity;
			
			if (!(Math.min(data.fromOpacity, data.toOpacity) <= opacity
					 && opacity <= Math.max(data.fromOpacity, data.toOpacity))) {
				opacity = data.toOpacity;
				fadedOpacityData.setFixedOpacity(flag);
				var callback = fadedOpacityData.makeCallbackFunction(flag);
				!!callback && callback.call(this);
			}
		}
		else if (data.mode == 1) {
			if (data.speed > 0) {
				if (data.toOpacity > opacity) {
					var d = data.toOpacity - opacity;
					if (d < data.speed)
						opacity = data.toOpacity;
					else
						opacity += data.speed;
				}
				else {
					var d = opacity - data.toOpacity;
					if (d < data.speed)
						opacity = data.toOpacity;
					else
						opacity -= data.speed;
				}
			}
			else {
				opacity = data.toOpacity;
			}
		}
		
		if (!Number.isNaN(Number(opacity))) {
			this.setOpacity(opacity);
			fadedOpacityData.setNowOpacity(flag, opacity);
		}
	}
};

Game_Character.prototype.fadeOpacityFlag = function() {
	if (this.constructor === Game_Event) {
		return [this._mapId, this._eventId].toString();
	}
	else if (this.constructor === Game_Player) {
		return 'player';
	}
	else if (this.constructor === Game_Vehicle) {
		return this._type;
	}
};

Game_Character.prototype.needFadeOpacity = function() {
	var flag = this.fadeOpacityFlag();
	var data = fadedOpacityData.getFadeValue(flag, this);
	return !!data && this.opacity() !== data.toOpacity;
};


Game_Character.prototype.startFadeOpacity = function(toOpacity, fadeTime) {
	var fromOpacity = this.opacity();
	toOpacity = Number(toOpacity) || 0;
	fadeTime  = Number(fadeTime)  || 0;
	var flag = this.fadeOpacityFlag();
	fadedOpacityData.setFadeValue(flag, fromOpacity, toOpacity, fadeTime);
};

Game_Character.prototype.startAutoFadeOpacity = function(refer, distMode, fromOp, toOp, fromDist, toDist, speed) {
	var nowOp = this.opacity();
	fromOp   = Number(fromOp)   || 0;
	toOp     = Number(toOp)     || 0;
	fromDist = Number(fromDist) || 0;
	toDist   = Number(toDist)   || 0;
	speed    = Number(speed)    || 0;
	var flag = this.fadeOpacityFlag();
	fadedOpacityData.setAutoFadeValue(flag, nowOp, refer, distMode, fromOp, toOp, fromDist, toDist, speed);
};

Game_Character.prototype.endAutoFadeOpacity = function() {
	var flag = this.fadeOpacityFlag();
	fadedOpacityData.unsetAutoFade(flag);
};



Game_Character.prototype.setFadeOpacityCallBack = function(switchId, switchValue) {
	switchId    = Number(switchId) || 0;
	switchValue = /on/i.test(switchValue);
	var flag = this.fadeOpacityFlag();
	fadedOpacityData.setCallbackValue(flag, switchId, switchValue);
};

Game_Character.prototype.unsetFadeOpacityCallBack = function() {
	var flag = this.fadeOpacityFlag();
	fadedOpacityData.unsetCallback();
};


Game_Character.prototype.initFadeOpacity = function() {
	if (!fadedOpacityData) return;
	var flag = this.fadeOpacityFlag();
	var data = fadedOpacityData.getFadeValue(flag, this);
	!!data && this.setOpacity(data.nowOpacity);
};


var _MK_Game_Event_initialize   = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function() {
	_MK_Game_Event_initialize.apply(this, arguments);
	this.initFadeOpacity();
};
var _MK_Game_Player_initialize   = Game_Player.prototype.initialize;
Game_Player.prototype.initialize = function() {
	_MK_Game_Player_initialize.apply(this, arguments);
	this.initFadeOpacity();
};
var _MK_Game_Vehicle_initialize   = Game_Vehicle.prototype.initialize;
Game_Vehicle.prototype.initialize = function() {
	_MK_Game_Vehicle_initialize.apply(this, arguments);
	this.initFadeOpacity();
};




//-----------------------------------------------------------------------------
// plugin commands

var _MK_Game_Interpreter_pluginCommand   = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
	_MK_Game_Interpreter_pluginCommand.apply(this, arguments);

	if (/^FadeOpacity$/i.test(command)) {
		// 插件指令 : FadeOpacity 目标 .. 变化参数 .. 回调 ..
		// 目标 : Event id / Player / Vehicle name
		// 变化参数 : 值目标 时间
		// 回调 : 开关id 开关值(on/off)
		
		if (/^Event$/i.test(args[0])) {
			var event = $gameMap.event(Number(args[1]) || 0);
			!!event && event.startFadeOpacity(args[2], args[3]);
			!!event && event.setFadeOpacityCallBack(args[4], args[5]);
		}
		else if (/^Player$/i.test(args[0])) {
			!!$gamePlayer && $gamePlayer.startFadeOpacity(args[1], args[2]);
			!!$gamePlayer && $gamePlayer.setFadeOpacityCallBack(args[3], args[4]);
		}
		else if (/^Vehicle$/i.test(args[0])) {
			var vehicle = $gameMap.vehicle(String(args[1]).toLowerCase());
			!!vehicle && vehicle.startFadeOpacity(args[2], args[3]);
			!!vehicle && vehicle.setFadeOpacityCallBack(args[4], args[5]);
		}
	}
	else if (/^AutoOpacity$/i.test(command)) {
		// 插件指令 : AutoOpacity 目标 .. 模式 参考 .. 变化参数 .. (xx 回调 ..)
		// 目标 : Event id / Player / Vehicle name
		// 参考 : Event id / Player / Vehicle name / Number x y / Number x / Number y
		// 变化参数 : 值1 to 值2 on 距离1 to 距离2 by 速度
		// xx 回调 : 开关id 开关值(on/off)
		
	    var target = null;
		var targetType = args.shift();
		if (/^Event$/i.test(targetType)) {
			target = $gameMap.event(Number(args.shift()) || 0);
		}
		else if (/^Player$/i.test(targetType)) {
		    target = $gamePlayer;
		}
		// TODO : follower
		else if (/^Vehicle$/i.test(targetType)) {
			target = $gameMap.vehicle(String(args.shift()).toLowerCase());
		}
		
		var dMode = 0;
		var modeType = args.shift();
		if (/^(distance|dist)$/i.test(modeType)) {
			dMode = 1;
		}
		else if (/^(distanceX|distX)$/i.test(modeType)) {
			dMode = 2;
		}
		else if (/^(distanceY|distY)$/i.test(modeType)) {
			dMode = 3;
		}
		// TODO : 按某一角度计算距离模式
		
		var refer = [];
		var refreType = args.shift();
		if (/^Event$/i.test(refreType)) {
			var id = Number(args.shift() || 0);
			refer.push('event');
			refer.push(id);
		}
		else if (/^Player$/i.test(refreType)) {
			refer.push('player');
		}
		// TODO : follower
		else if (/^Vehicle$/i.test(refreType)) {
			var vname = String(args.shift().toLowerCase());
			refer.push('event');
			refer.push(vname);
		}
		else if (/^Number$/i.test(refreType)) {
			refer.push('number');
			
			var x = 0, y = 0;
			switch (dMode) {
				case 1: 
					x = Number(args.shift() || 0);
					y = Number(args.shift() || 0);
					break;
				case 2:
					x = Number(args.shift() || 0);
					y = 0;
					break;
				case 3: 
					x = 0;
					y = Number(args.shift() || 0);
					break;
			}
			refer.push(x);
			refer.push(y);
		}
		
		if (target != null && dMode != 0 && refer != null) {
			target.endAutoFadeOpacity();

			target.startAutoFadeOpacity(refer, dMode, args[0], args[2], args[4], args[6], args[8]);
			target.unsetFadeOpacityCallBack();
		}
	}
	else if (/^EndAutoOpacity$/i.test(command)) {
		// 插件指令 : EndAutoOpacity 目标 ..
		// 目标 : Event id / Player / Vehicle name
		
	    var target = null;
		var targetType = args.shift();
		if (/^Event$/i.test(targetType)) {
			target = $gameMap.event(Number(args.shift()) || 0);
		}
		else if (/^Player$/i.test(targetType)) {
		    target = $gamePlayer;
		}
		// TODO : follower
		else if (/^Vehicle$/i.test(targetType)) {
			target = $gameMap.vehicle(String(args.shift()).toLowerCase());
		}
		
		!!target && target.endAutoFadeOpacity();
	}
};


})();




