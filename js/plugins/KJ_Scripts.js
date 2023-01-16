/*:
 * @plugindesc 插件命令
 * @author Kong Jing
 *
 * @help
 *
 * edging_in height(|height) time color
 * height(不写默认为20)
 * 写一个height就会上下宽度一致,如10
 * 写两个height前一个是上方宽度后一个是下方宽度,如10|20
 * time(不写默认为20)
 * 指渐进的时间,单位为帧,通常是60帧为1秒,最小是1
 * color(不写默认为black)
 * 可以是简单颜色的英文名字,如black
 * 可以是rgb形式,如rgb(10,10,10),或如rgba(10,10,10,1)
 * 其中rgb中范围0~255指红绿蓝,a范围0~1指透明度
 *
 * edging_out time
 * time
 * 指渐出的时间,单位为帧,通常是60帧为1秒,最小是1
 *
 * shake_in power speed direction time
 * power强度,speed速度,和系统震动的设置一样
 * direction(不写默认左右)
 * 指震动方向,1代表左右,2代表上下,3上下左右,4...待补充添加
 * time(不写默认永久)
 * 指震动时间,单位为帧,整数,负数为永久,其他为对应时间
 *
 * shake_out
 * 清除一切震动
 *
 * fade_color r g b
 * 设置系统淡入淡出的颜色
 *
 * fade_time time
 * 设置系统淡入淡出的时间
 *
 */
(function(){
	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args){
		_Game_Interpreter_pluginCommand.call(this, command, args);
		command = command.toLowerCase();
		if(command === 'edging_in'){
			var heights = (args[0] || "").split("|");
			var up = parseInt(heights[0] || 20);
			var down = parseInt(heights[1] || up);
			var time = parseInt(args[1] || 20);
			var color = String(args[2] || "black");
			$gameMap.setEdging(up,down,time,color);
		}else if(command === 'edging_out'){
			var time = parseInt(args[0] || 20);
			$gameMap.removeEdging(time);
		}else if(command === 'shake_in'){
			var power = parseInt(args[0] || 5);
			var speed = parseInt(args[1] || 5);
			var direction = parseInt(args[2] || 1);
			var time = parseInt(args[3] || -1);
			$gameScreen.startShakeUI(power,speed,direction,time);
		}else if(command === 'shake_out'){
			$gameScreen.clearShakeUI();
		}else if(command === 'fade_color'){
			var r = parseInt(args[0] || 0);
			var g = parseInt(args[1] || 0);
			var b = parseInt(args[2] || 0);
			$gameScreen.setFadeColor(r,g,b);
		}else if(command === 'fade_time'){
			var time = parseInt(args[0] || 10);
			$gameScreen.setFadeTime(time);
		}
	};
	//edging
	var _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
	Window_Message.prototype.updatePlacement = function() {
		_Window_Message_updatePlacement.call(this);
		if(this._positionType == 2){
			if($gameMap._edgingSprite){
				this.y -= $gameMap._edgingSprite[1];
			}
		}
	};
	var _Scene_Map_start = Scene_Map.prototype.start;
	Scene_Map.prototype.start = function() {
		_Scene_Map_start.call(this);
		this.addEdging();
	};
	Scene_Map.prototype.addEdging = function(){
		this._edgingSprite = $gameMap.getEdging();
		if(this._edgingSprite){
			this._spriteset.removeChild(this._spriteset._fadeSprite);
			this.addChild(this._spriteset._fadeSprite);
			this.addChild(this._edgingSprite);
			var length = this.children.length;
			this.children.splice(length - 2);
			this.children.splice(1,0,this._edgingSprite);
			this.children.splice(1,0,this._spriteset._fadeSprite);
		}
	};
	Game_Map.prototype.setEdging = function(up,down,time,color){
		this._edgingSprite = [up,down,time,color];
		if($gameTemp._edgingSprite){
			$gameTemp._edgingSprite.setInfo(up,down,time,color);
		}else{
			this.createEdging();
			if(SceneManager._scene.constructor == Scene_Map){
				SceneManager._scene.addEdging();
			}
		}
	};
	Game_Map.prototype.createEdging = function(){
		var info = this._edgingSprite;
		$gameTemp._edgingSprite = new Sprite_Edging(info[0],info[1],info[2],info[3]);

	};
	Game_Map.prototype.getEdging = function(){
		if(this._edgingSprite && !$gameTemp._edgingSprite){
			this.createEdging();
		}
		return $gameTemp._edgingSprite;
	};
	Game_Map.prototype.removeEdging = function(time){
		if($gameTemp._edgingSprite){
			$gameTemp._edgingSprite.setOut(time);
			$gameMap.clearEdging();
		}
	};
	Game_Map.prototype.clearEdging = function(){
		if(this._edgingSprite){
			this._edgingSprite = null;
			$gameTemp._edgingSprite = null;
		}
	};
	function Sprite_Edging() {
		this.initialize.apply(this, arguments);
	}
	Sprite_Edging.prototype = Object.create(Sprite.prototype);
	Sprite_Edging.prototype.constructor = Sprite_Edging;
	Sprite_Edging.prototype.initialize = function(up,down,time,color) {
		Sprite.prototype.initialize.call(this);
		this.bitmap = new Bitmap(Graphics.boxWidth,Graphics.boxHeight);
		this.setInfo(up,down,time,color);
	};
	Sprite_Edging.prototype.setInfo = function(up,down,time,color){
		this.bitmap.clear();
		this._up = up;
		this._down = down;
		this._time = time;
		this._color = color;
		this._in = true;
		this._animationCount = 0;
	};
	Sprite_Edging.prototype.update = function() {
		Sprite.prototype.update.call(this);
		this._animationCount++;
		if(this._animationCount <= this._time){
			var percent = this._animationCount / this._time;
			var height = percent*this._up;
			this.drawUp(0,0,Graphics.boxWidth,height,this._color,this._up);
			height = percent*this._down;
			this.drawDown(0,Graphics.boxHeight,Graphics.boxWidth,height,this._color,this._down);
			if(this._animationCount >= this._time && !this._in){
				if(this.parent){
					this.parent.removeChild(this);
				}
				// $gameMap.clearEdging();
			}
		}
	};
	Sprite_Edging.prototype.drawUp = function(x,y,width,height,color,total){
		if(this._in){
			this.bitmap.fillRect(x,y,width,height,color);
		}else{
			this.bitmap.clearRect(x,total-height,width,height);
		}
	}
	Sprite_Edging.prototype.drawDown = function(x,y,width,height,color,total){
		if(this._in){
			this.bitmap.fillRect(x,y-height,width,height,color);
		}else{
			this.bitmap.clearRect(x,y-total,width,height);
		}
	}
	Sprite_Edging.prototype.setOut = function(time){
		this._time = time;
		this._in = false;
		this._animationCount = 0;
	};
	//shake
	Game_Screen.prototype.clearShakeUI = function() {
		this._shakePowerUI = 0;
		this._shakeSpeedUI = 0;
		this._shakeDurationUI = 0;
		this._shakeDirectionUI = 0;
		this._shakeDirectionsUI = [1,1];
		this._shakeUI = [0,0];
	};
	Game_Screen.prototype.startShakeUI = function(power, speed, direction, time) {
    this._shakePowerUI = power;
    this._shakeSpeedUI = speed;
    this._shakeDurationUI = time;
		this._shakeDirectionUI = direction;
		this._shakeDirectionsUI = [1,1];
		this._shakeUI = [0,0];
	};
	Game_Screen.prototype.updateShakeUIone = function(index) {
		var delta = (this._shakePowerUI * this._shakeSpeedUI * this._shakeDirectionsUI[index]) / 10;
		if (this._shakeDurationUI >= 0 && this._shakeDurationUI <= 1 && this._shakeUI[index] * (this._shakeUI[index] + delta) < 0) {
	    this._shakeUI[index] = 0;
		} else {
	    this._shakeUI[index] += delta;
		}
		if (this._shakeUI[index] > this._shakePowerUI * 2) {
	    this._shakeDirectionsUI[index] = -1;
		}
		if (this._shakeUI[index] < - this._shakePowerUI * 2) {
	    this._shakeDirectionsUI[index] = 1;
		}
	};
	Game_Screen.prototype.updateShakeUI = function() {
    if (this._shakeDurationUI != 0) {
			switch (this._shakeDirectionUI) {
				case 1:
					this.updateShakeUIone(0);
					break;
				case 2:
					this.updateShakeUIone(1);
					break;
				case 3:
					this.updateShakeUIone(0);
					this.updateShakeUIone(1);
					break;
				default:
					break;
			}
      this._shakeDurationUI--;
    }
	};
	Game_Screen.prototype.shakeUI = function() {
		return this._shakeUI || [0,0];
	};
	var _Game_Screen_update = Game_Screen.prototype.update;
	Game_Screen.prototype.update = function(){
		_Game_Screen_update.call(this);
		this.updateShakeUI();
	};
	var _Spriteset_Base_updatePosition = Spriteset_Base.prototype.updatePosition;
	Spriteset_Base.prototype.updatePosition = function(){
		_Spriteset_Base_updatePosition.call(this);
		var shakeUI = $gameScreen.shakeUI();
		this.x += shakeUI[0];
		this.y += shakeUI[1];
	};
	//fade
	var _Spriteset_Base_updateScreenSprites = Spriteset_Base.prototype.updateScreenSprites;
	Spriteset_Base.prototype.updateScreenSprites = function() {
			_Spriteset_Base_updateScreenSprites.call(this);
			var color = $gameScreen.fadeColor();
			this._fadeSprite.setColor(color[0], color[1], color[2]);
	};
	Game_Screen.prototype.setFadeTime = function(time){
		this._fadeTime = time;
	};
	Game_Screen.prototype.setFadeColor = function(r,g,b){
		this._fadeColor = [r,g,b];
	};
	Game_Screen.prototype.fadeColor = function(){
		return this._fadeColor || [0,0,0];
	};
	Game_Screen.prototype.fadeTime = function(){
		return this._fadeTime || 24;
	};
	Game_Interpreter.prototype.fadeSpeed = function() {
	    return $gameScreen.fadeTime();
	};
})();
