/*:
 * @plugindesc Menu.
 * @author Kong Jing
 * 
 *
 * @param SaveFile
 * @text 最大存档数量
 * @type number
 * @default 5
 * @desc 最大存档数量
 *
 * @param SettingPic
 * @text 制作组图片
 * @type file
 * @dir img/UI/
 * @default 
 *
 *
 * @param OldScreenWidth
 * @text 原屏幕宽
 * @type number
 * @default 816
 *
 * @param OldScreenHeieght
 * @text 原屏幕高
 * @type number
 * @default 624
 *
 * @param NewScreenWidth
 * @text 新屏幕宽
 * @type number
 * @default 1280
 *
 * @param NewScreenHeight
 * @text 新屏幕高
 * @type number
 * @default 720
 *
 * 
 * @param StageNames
 * @text 章节名
 * @desc 
 * @type string[]
 * @default []
 * 
 * @param StageVariable
 * @text 章节序号变量
 * @desc 控制章节的变量
 * 变量值为 【章节名】 的序号 (从1开始)
 * @type variable
 * @default 0
 * 
 * @param StageFormats
 * @text 章节名显示格式
 * @desc $1 : 代替章节名  $2 : 代替地图名
 * 章节名或地图名为空时 不显示
 * @type string[]
 * @default ["$1·$2"]
 * 
 * @param StageFormatVariable
 * @text 章节名显示格式序号变量
 * @desc 控制章节名显示格式的变量
 * 变量值为 【章节名显示格式】 的序号 (从1开始)
 * @type variable
 * @default 0
 *
 * 
 * @help
 *
 * autosave
 * 自动存档
 * 
 * Mikan 2021/01/15 修改
 *   1. 音量调整：左右调整音量，并用箭头进行按键反馈
 *   2. 删除结束游戏按钮
 *        12. 修复取消结束游戏会使游戏结束的问题
 *   3. 存档显示章节名和地图名
 *   4. 操作提示
 *     道具 : img/UI/ui_oper_item.png
 *     存档 : img/UI/ui_oper_save.png
 *     设置 : img/UI/ui_oper_options.png
 *     结束 : img/UI/ui_oper_gameend.png
 *     图片结构 : 
 *       上 : 键盘操作提示  下 : 手柄操作提示
 *       (在道具菜单时) 左 : 操作(可以使用时出现)  右 : 取消(一直出现)
 *   5. 修复存档数达到最大时，进入存档界面会超出上限的问题
 *   6. 可设置的素材尺寸
 *   7. 操作提示增加读档菜单
 *     读档 : img/UI/ui_oper_load.png
 *   8. 支持绘制按键文本和图片 (MK_KeyConfig.js by Mikan)
 *   9. 地图场景中不显示地图名
 *  10. 支持识别输入信号是键盘还是手柄 (MK_KeyConfig.js by Mikan)
 *  11. 变量控制章节名
 */

var parameters = PluginManager.parameters('KJ_Menu');
var KJ = KJ || {};
KJ.UI = KJ.UI || {};
KJ.UI.SaveFile = parseInt(parameters['SaveFile'] || 5);
KJ.UI.SettingPic = String(parameters['SettingPic'] || "");

// 为了分辨率变化的相对位移 by Mikan
KJ.UI.ScreenChange = KJ.UI.ScreenChange || {};
KJ.UI.ScreenChange.oldWidth  = Number(parameters['OldScreenWidth']  || '816');
KJ.UI.ScreenChange.oldHeight = Number(parameters['OldScreenHeight'] || '624');
KJ.UI.ScreenChange.newWidth  = Number(parameters['NewScreenWidth']  || '1280');
KJ.UI.ScreenChange.newHeight = Number(parameters['NewScreenHeight'] || '720');
KJ.UI.ScreenChange.offsetW = (KJ.UI.ScreenChange.newWidth  - KJ.UI.ScreenChange.oldWidth ) / 2;
KJ.UI.ScreenChange.offsetH = (KJ.UI.ScreenChange.newHeight - KJ.UI.ScreenChange.oldHeight) / 2;


KJ.UI.NoteSize = KJ.UI.NoteSize || {};
KJ.UI.NoteSize.width  = 85;
KJ.UI.NoteSize.height = 22;


KJ.UI.StageNames = JSON.parse(parameters['StageNames'] || '[]');
KJ.UI.StageVariable = Number(parameters['StageVariable'] || '0');
KJ.UI.StageFormats = JSON.parse(parameters['StageFormats'] || '[]');
KJ.UI.StageFormatVariable = Number(parameters['StageFormatVariable'] || '0');
KJ.UI.getStageName = function() {
	return KJ.UI.StageNames[$gameVariables.value(KJ.UI.StageVariable) - 1] || '';
};
KJ.UI.getStageFormat = function() {
	return KJ.UI.StageFormats[$gameVariables.value(KJ.UI.StageFormatVariable) - 1] || '';
};
KJ.UI.getStageShowName = function(mapname) {
	//mapname = typeof mapname === 'undefined' ? $gameMap.displayName() : mapname;
	//KJ.UI.StageFormat
	//	.replace(/\$1/g, KJ.UI.getStageName())
	//	.replace(/\$1/g, mapname);
	// 无地图名时 不显示
	var stagename = KJ.UI.getStageName() || '';
	mapname = mapname || '';
	return !!mapname && !!stagename
		 ? KJ.UI.getStageFormat()
			.replace(/\$1/g, stagename)
			.replace(/\$2/g, mapname)
		 : '';
};


var _Game_Interpreter_pluginCommand_Title = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
	_Game_Interpreter_pluginCommand_Title.call(this, command, args);
	command = command.toLowerCase();
	if(command === 'autosave'){
		DataManager.autoSaveFile();
	}
};
Decrypter.checkImgIgnore = function(url){
    for(var cnt = 0; cnt < this._ignoreList.length; cnt++) {
        if(url === this._ignoreList[cnt]) return true;
    }
	if(url.contains("savePic")){
		return true;
	}
    return false;
};
//加载图片
ImageManager.loadUI = function(filename, hue) {
	return this.loadBitmap('img/UI/', filename, hue, false);
};
Graphics._createGameFontLoader = function() {
    this._createFontLoader('GameFont');
	this._createFontLoader('UIFont-Heavy');
	this._createFontLoader('UIFont-Medium');
};
DataManager._lastAccessedId = 2;
DataManager.autoSaveFile = function(){
    $gameSystem.onBeforeSave();
	SceneManager.snapForSave();
    if (DataManager.saveGame(1)) {
		// SoundManager.playSave();
        StorageManager.cleanBackup(1);
		var sprite = new Sprite_AnimationText(TextManager.surprise,60,60,60,20,"white","rgba(0,0,0,0)",Graphics.boxWidth-120,Graphics.boxHeight-24,120,24);
		var scene = SceneManager._scene;
		if(scene._textContainer){
			scene._textContainer.addChild(sprite);
		}
		return true;
    }
	return false;
};
var _Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function(){
	_Scene_Map_update.call(this);
	
};
var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function(){
	_Scene_Map_createDisplayObjects.call(this);
	this.createTextContainer();
};


//var _Scene_Map_createMapNameWindow = Scene_Map.prototype.createMapNameWindow;
//Scene_Map.prototype.createMapNameWindow = function() {
//	_Scene_Map_createMapNameWindow.apply(this, arguments);
//    this._mapNameWindow.hide();
//};
Window_MapName.prototype.refresh = function() {
    this.contents.clear();
    //if ($gameMap.displayName()) {
    //    var width = this.contentsWidth();
    //    this.drawBackground(0, 0, width, this.lineHeight());
    //    this.drawText($gameMap.displayName(), 0, 0, width, 'center');
    //}
};


Scene_Map.prototype.createTextContainer = function(index){
	this._textContainer = new Sprite();
	this.addChild(this._textContainer);
	//this._textContainer.x += KJ.UI.ScreenChange.offsetW;
	//this._textContainer.y += KJ.UI.ScreenChange.offsetH;
};
function Sprite_AnimationText() {
    this.initialize.apply(this, arguments);
}
Sprite_AnimationText.prototype = Object.create(Sprite.prototype);
Sprite_AnimationText.prototype.constructor = Sprite_AnimationText;
Sprite_AnimationText.prototype.initialize = function(text,time1,time2,time3,fontSize,textColor,outlineColor,x,y,width){
	Sprite.prototype.initialize.call(this);
	this.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
	this.bitmap.fontFace = 'UIFont-Heavy';
	this.bitmap.fontSize = fontSize;
	this.bitmap.textColor = textColor;
	this.bitmap.outlineColor = outlineColor;
	this._basetime = [time1,time3];
	this._time1 = time1;
	this._time2 = time2;
	this._time3 = time3;
	this.bitmap.drawText(text,x,y,width,0);
};
Sprite_AnimationText.prototype.update = function(){
	if(this._time1 > 0){
		this._time1--;
		var per = 1 - this._time1 / this._basetime[0];
		this.opacity = per*255;
	}else if(this._time2 > 0){
		this._time2--;
	}else if(this._time3 > 0){
		this._time3--;
		var per = this._time3 / this._basetime[1];
		this.opacity = per*255;
		if(this._time3 == 0){
			var parent = this.parent;
			if(parent){
				parent.removeChild(this);
			}
		}
	}
};
//自动换行
Bitmap.prototype.drawMutiTexts = function(text, startX, startY, endX, lineHeight){
	var y = startY;
	var x = startX;
	var w = 0;
	text.split("").forEach(function(c){
		if(c == '\n'){
			y += lineHeight;
			x = startX;
		}else{
			w = this.measureTextWidth(c);
			if(x + w > endX){
				y += lineHeight;
				x = startX;
			}
			this.drawText(c, x, y, 100, lineHeight);
			x += w;
		}
	}, this);
	if(x != startX){
		y += lineHeight;
	}
	return y;
};
//-------------------------------------------------------
Scene_MenuBase.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
	this._backgroundSprite.opacity = 40;
    this.addChild(this._backgroundSprite);
	//this._backgroundSprite.x += KJ.UI.ScreenChange.offsetW;
	//this._backgroundSprite.y += KJ.UI.ScreenChange.offsetH;
};
Scene_MenuBase.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
	this._longTime = 10;
	/*
	if(Input.isTriggered('ok')){
		this.updateKeyOk();
	}
	else if(Input.isRepeated('cancel')){
		this.updateCancel();
	}
	else if(Input.isTriggered('up') || Input.isLongPressed('up')){
		this.updateKeyUp();
	}
	else if(Input.isTriggered('down') || Input.isLongPressed('down')){
		this.updateKeyDown();
	}
	else if(Input.isTriggered('left') || Input.isLongPressed('left')){
		this.updateKeyLeft();
	}
	else if(Input.isTriggered('right') || Input.isLongPressed('right')){
		this.updateKeyRight();
	}
	*/


	if(Input.isTriggered('ok')){
		this.updateKeyOk();
		this.updateInputMode();
	}
	else if(Input.isRepeated('cancel')){
		this.updateCancel();
		this.updateInputMode();
	}
	else if(Input.isTriggered('up') || Input.isLongPressed('up')){
		this.updateKeyUp();
		this.updateInputMode();
	}
	else if(Input.isTriggered('down') || Input.isLongPressed('down')){
		this.updateKeyDown();
		this.updateInputMode();
	}
	else if(Input.isTriggered('left') || Input.isLongPressed('left')){
		this.updateKeyLeft();
		this.updateInputMode();
	}
	else if(Input.isTriggered('right') || Input.isLongPressed('right')){
		this.updateKeyRight();
		this.updateInputMode();
	}


};
Scene_MenuBase.prototype.updateKeyOk = function(){
};
Scene_MenuBase.prototype.updateCancel = function(){
	SoundManager.playCancel();
	SceneManager.pop();
};
Scene_MenuBase.prototype.updateKeyUp = function(){
};
Scene_MenuBase.prototype.updateKeyDown = function(){
};
Scene_MenuBase.prototype.updateKeyLeft = function(){
};
Scene_MenuBase.prototype.updateKeyRight = function(){
};
//-------------------------------------------------------


Input.haveGamepad = function() {
	if (navigator.getGamepads) {
		var gamepads = navigator.getGamepads();
		if (gamepads) {
			for (var i = 0; i < gamepads.length; i++) {
				if (gamepads[i] && gamepads[i].connected) return true;
			}
		}
	}
	return false;
};
//Scene_MenuBase.prototype.haveGamepadSignal = function() {
//	//return (Input.haveGamepadSignal && Input.haveGamepadSignal()) || Input.haveGamepad();
//	return Input.isGamepadSignal ? Input.isGamepadSignal() : Input.haveGamepad();
//};
Scene_MenuBase.prototype.updateNoteSprite = function() {
	if (this._noteSprite) {
		//var newFrameY = this.haveGamepadSignal() ? KJ.UI.NoteSize.height : 0;
		//if (this._noteSprite._frame.y != newFrameY) {
		//	var frame = this._noteSprite._frame;
		//	this._noteSprite.setFrame(frame.x, newFrameY, frame.width, frame.height);
		//}

		if (Input.inputSignalMode) {
			// 有 Input.inputSignalMode 支持 (MK_KeyConfig.js by Mikan)
			/*
			this._lastInputSignal = this._lastInputSignal || 0;
			var inputSignal = Input.inputSignalMode();
			if (inputSignal != 0 && inputSignal != this._lastInputSignal) {
				this._lastInputSignal = inputSignal;

				var newFrameY = this._lastInputSignal == 2 ? KJ.UI.NoteSize.height : 0;
				if (this._noteSprite._frame.y != newFrameY) {
					var frame = this._noteSprite._frame;
					this._noteSprite.setFrame(frame.x, newFrameY, frame.width, frame.height);
				}
			}
			else if (inputSignal == 0 && this._lastInputSignal == 0) {
				this._lastInputSignal = Input.haveGamepad() ? 2 : 1;

				var newFrameY = this._lastInputSignal == 2 ? KJ.UI.NoteSize.height : 0;
				if (this._noteSprite._frame.y != newFrameY) {
					var frame = this._noteSprite._frame;
					this._noteSprite.setFrame(frame.x, newFrameY, frame.width, frame.height);
				}
			}
			*/
			// ？刷新bug，默认使用 键盘的frame 但因 _lastInputSignal 未改变 所以不会更新 ...

			var inputSignal = Input.inputSignalMode();
			inputSignal = inputSignal != 0 ? inputSignal : (Input.haveGamepad() ? 2 : 1);

			var newFrameY = inputSignal == 2 ? KJ.UI.NoteSize.height : 0;
			if (this._noteSprite._frame.y != newFrameY) {
				var frame = this._noteSprite._frame;
				this._noteSprite.setFrame(frame.x, newFrameY, frame.width, frame.height);
			}
		}
		else {
			var newFrameY = Input.haveGamepad() ? KJ.UI.NoteSize.height : 0;
			if (this._noteSprite._frame.y != newFrameY) {
				var frame = this._noteSprite._frame;
				this._noteSprite.setFrame(frame.x, newFrameY, frame.width, frame.height);
			}
		}
	}
};
Scene_MenuBase.prototype.updateInputMode = function() {
	this.updateNoteSprite();
};


//-------------------------------------------------------
// Open Menu Screen
Game_Interpreter.prototype.command351 = function() {
    if (!$gameParty.inBattle()) {
		Scene_Menu._lastCommandSymbol = 0;
        SceneManager.push(Scene_Menu);
    }
    return true;
};
Scene_Map.prototype.callMenu = function() {
    SoundManager.playOk();
	Scene_Menu._lastCommandSymbol = 0;
    SceneManager.push(Scene_Menu);
    $gameTemp.clearDestination();
    this._mapNameWindow.hide();
    this._waitCount = 2;
};
function Scene_Menu() {
    this.initialize.apply(this, arguments);
}
Scene_Menu.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Menu.prototype.constructor = Scene_Menu;
Scene_Menu.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
Scene_Menu._lastCommandSymbol = 0;
Scene_Menu.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
	this.createBackground();
	this.createMenuSprite();
};
Scene_Menu.prototype.createMenuSprite = function() {
	this._menuSprite = new Sprite();
	this._menuSprite.move(308, 186);
	this.addChild(this._menuSprite);
	this._menuSprite.x += KJ.UI.ScreenChange.offsetW;
	this._menuSprite.y += KJ.UI.ScreenChange.offsetH;
	
	this._currentSprite = new Sprite();
	this._currentSprite.move(308, 186);
	this.addChild(this._currentSprite);
	this._currentSprite.x += KJ.UI.ScreenChange.offsetW;
	this._currentSprite.y += KJ.UI.ScreenChange.offsetH;
	
	var bitmap = ImageManager.loadUI('ui_menu');
	bitmap.addLoadListener(this._createMenuSprite.bind(this));
};
Scene_Menu.prototype._createMenuSprite = function(bitmap) {
	this._menuSprite.bitmap = bitmap;
	this._menuSprite.setFrame(0, 0, 200, 230);
	this._currentSprite.bitmap = bitmap;
};
Scene_Menu.prototype.setIndex = function(index) {
    this._index = (index == undefined)? Scene_Menu._lastCommandSymbol:index;
	if(this._currentSprite){
		this._currentSprite.setFrame(200, this._index*60, 200, 60);
		this._currentSprite.y = this._menuSprite.y + this._index*60;
	}
	Scene_Menu._lastCommandSymbol = this._index;
};
Scene_Menu.prototype.updateKeyOk = function() {
	SoundManager.playOk();
	switch(this._index){
	case 0:SceneManager.push(Scene_Item);break;
	case 1:SceneManager.push(Scene_Save);break;
	case 2:SceneManager.push(Scene_Options);break;
	case 3:SceneManager.push(Scene_GameEnd);break;
	}
};
Scene_Menu.prototype.updateKeyMove = function(key, num){
	if(Input.isLongPressed(key)){
		if(Input._pressedTime % this._longTime){
			return;
		}
	}
	this.setIndex((this._index + num + 4) % 4);
	SoundManager.playCursor();
}
Scene_Menu.prototype.updateKeyUp = function(){
	this.updateKeyMove('up', -1);
};
Scene_Menu.prototype.updateKeyDown = function(){
	this.updateKeyMove('down', 1);
};
Scene_Menu.prototype.start = function(){
	Scene_Base.prototype.start.call(this);
	this.setIndex();
};
//-------------------------------------------------------
function Scene_Item() {
    this.initialize.apply(this, arguments);
}
Scene_Item.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Item.prototype.constructor = Scene_Item;
Scene_Item.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
Scene_Item.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
	this.createBackground();
	this.createMenuSprite();
};
Scene_Item.prototype.createMenuSprite = function() {
	this._menuSprite = new Sprite(ImageManager.loadUI('ui_item'));
	this._menuSprite.move(90, 130);
	this.addChild(this._menuSprite);
	this._menuSprite.x += KJ.UI.ScreenChange.offsetW;
	this._menuSprite.y += KJ.UI.ScreenChange.offsetH;
	
	this._textSprite = new Sprite();
	this._textSprite.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
	this.content = this._textSprite.bitmap;
	this.addChild(this._textSprite);
	this._textSprite.x += KJ.UI.ScreenChange.offsetW;
	this._textSprite.y += KJ.UI.ScreenChange.offsetH;
	
	// this._shadowSprite1 = new Sprite(ImageManager.loadUI('ui_frame_02'));
	// this._shadowSprite1.move(200, 130);
	// this.addChild(this._shadowSprite1);
	
	// this._shadowSprite2 = new Sprite(ImageManager.loadUI('ui_frame_03'));
	// this._shadowSprite2.move(200, 414); 
	// this.addChild(this._shadowSprite2);
	
	this._sliderSprite = new Sprite(ImageManager.loadUI('ui_slider'));
	this._sliderSprite.move(184-2, 180);
	this._sliderSprite.visible = false;
	this.addChild(this._sliderSprite);
	this._sliderSprite.x += KJ.UI.ScreenChange.offsetW;
	this._sliderSprite.y += KJ.UI.ScreenChange.offsetH;
	
	//this._noteSprite = new Sprite(ImageManager.loadUI('ui_back'));
	this._noteSprite = new Sprite(ImageManager.loadUI('ui_oper_item'));
	//this._noteSprite.move(562+152, 494);
	this._noteSprite.move(546 + 2 * KJ.UI.NoteSize.width, 494);
	this._noteSprite.anchor.x = 1;
	//this._noteSprite.setFrame(76,0,152,18);
	this._noteSprite.setFrame(KJ.UI.NoteSize.width, 0,
		2 * KJ.UI.NoteSize.width, KJ.UI.NoteSize.height);
	this.addChild(this._noteSprite);
	this._noteSprite.x += KJ.UI.ScreenChange.offsetW;
	this._noteSprite.y += KJ.UI.ScreenChange.offsetH;
};
Scene_Item.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
	this.setIndex(0);
	this.updateInputMode();
};
Scene_Item.prototype.includes = function(item) {
	return DataManager.isItem(item) && item.itypeId === 1;
    // switch (this._category) {
    // case 'item':
        // return DataManager.isItem(item) && item.itypeId === 1;
    // case 'weapon':
        // return DataManager.isWeapon(item);
    // case 'armor':
        // return DataManager.isArmor(item);
    // case 'keyItem':
        // return DataManager.isItem(item) && item.itypeId === 2;
    // default:
        // return false;
    // }
};
Scene_Item.prototype.makeItemList = function() {
    this._data = $gameParty.allItems().filter(function(item) {
        return this.includes(item);
    }, this);
    if (this.includes(null)) {
        this._data.push(null);
    }
};
Scene_Item.prototype.setIndex = function(index) {
    this._index = index;
	if(!this._data){
		this.makeItemList();
	}
	this.drawAll();
};


Scene_Item.prototype.updateInputMode = function() {
	// 重绘，需要在 updateNoteSprite 前
	this.drawAll();
	Scene_MenuBase.prototype.updateInputMode.apply(this, arguments);
};


Scene_Item.prototype.updateKeyMove = function(key, num){
	if(Input.isLongPressed(key)){
		if(Input._pressedTime % this._longTime){
			return;
		}
	}
	var length = this._data.length;
	this.setIndex((this._index + num + length) % length);
	SoundManager.playCursor();
}
Scene_Item.prototype.updateKeyUp = function(){
	this.updateKeyMove('up', -1);
};
Scene_Item.prototype.updateKeyDown = function(){
	this.updateKeyMove('down', 1);
};
Scene_Item.prototype.updateKeyOk = function() {
	var item = this._data[this._index];
	if(!item){
		SoundManager.playBuzzer();
		return;
	}
	SoundManager.playOk();
	if(this.hasCommenEvent(item)){
		this.applyGlobal(item);
		SoundManager.playOk();
		this.checkCommonEvent();
	}else{
		SoundManager.playBuzzer();
	}
};
Scene_Item.prototype.drawAll = function(){
	this.content.clear();
	var startX = 208;
	var startY = 200;
	var paddingH = 32;
	this.content.fontSize = 16;
	this.content.outlineColor = "rgba(0,0,0,0)";
	this.content.fontFace = 'UIFont-Heavy';
	var startI = 0;
	var length = 214;
	var slider = 244;
	if(this._data.length > 7){
		this.content.fillRect(184, 180, 1, slider, "#bfbfbf");
		var per = this._index/(this._data.length-1);
		var H = paddingH*this._data.length - 14 - length;
		var deltaH = H*per;
		var deltaI = Math.floor(deltaH / paddingH);
		startI = deltaI;
		startY = startY + deltaI * paddingH - deltaH;
		this._sliderSprite.visible = true;
		this._sliderSprite.y = 180 + (slider-this._sliderSprite.height)*per;
		this._sliderSprite.y += KJ.UI.ScreenChange.offsetH;
	}else{
		this._sliderSprite.visible = false;
	}
	for(var i = startI; i < startI + 8; i++){
		var item = this._data[i];
		if(item){
			if(i == this._index){
				this.content.textColor = "#19a506"
			}else{
				this.content.textColor = "#181818"
			}
			this.content.drawText(item.name, startX, startY, 220, 20);
			startY += paddingH;
		}
	}
	var item = this._data[this._index];
	if(item){
		this.content.fontSize = 18;
		this.content.fontFace = 'UIFont-Medium';
		this.content.textColor = "#0e0e0e"
		//this.content.drawMutiTexts(item.description, 408, 234, 408+252, 18+8);
		this.content.drawMutiTexts(item.description, 408, 234, 408+252, KJ.UI.NoteSize.height+8);
		if(this.hasCommenEvent(item)){
			//this._noteSprite.setFrame(0,0,152,18);
			this._noteSprite.setFrame(0, 0, 2 * KJ.UI.NoteSize.width, KJ.UI.NoteSize.height);
		}else{
			//this._noteSprite.setFrame(76,0,152,18);
			this._noteSprite.setFrame(KJ.UI.NoteSize.width, 0,
				2 * KJ.UI.NoteSize.width, KJ.UI.NoteSize.height);
		}	
	}
};


Scene_Item.prototype.textWidth = function(test){
	return this.contents.measureTextWidth(text);
};


Scene_Item.prototype.hasCommenEvent = function(item){
	for(var i = 0; i < item.effects.length; i++){
		if(item.effects[i].code === Game_Action.EFFECT_COMMON_EVENT) {
            return true;
        }
	}
	return false;
};
Scene_Item.prototype.applyGlobal = function(item) {
    item.effects.forEach(function(effect) {
        if (effect.code === Game_Action.EFFECT_COMMON_EVENT) {
            $gameTemp.reserveCommonEvent(effect.dataId);
        }
    }, this);
};
Scene_Item.prototype.checkCommonEvent = function() {
    if ($gameTemp.isCommonEventReserved()) {
        SceneManager.goto(Scene_Map);
    }
};
//-------------------------------------------------------
DataManager.loadAllSavefileImages = function() {
    var globalInfo = this.loadGlobalInfo();
    if (globalInfo){
        for (var i = 0; i < globalInfo.length; i++) {
            if(this.isThisGameFile(i)) {
                // ImageManager.loadSavePicture(this.savePicturePath(i));
            }
        }
    }
};
DataManager.savePicturePath = function(savefileId){
	return 'savePic' + savefileId;
};
DataManager.saveGameWithoutRescue = function(savefileId) {
	if(StorageManager.exists(savefileId)) {
        this.removeSavePicture(this.savePicturePath(savefileId));
    }
	this.saveSavePicture(this.savePicturePath(savefileId), SceneManager.saveSavePicture());
	
    var json = JsonEx.stringify(this.makeSaveContents());
    if (json.length >= 200000) {
        console.warn('Save data too big!');
    }
    StorageManager.save(savefileId, json);
	if(savefileId != 1){
		this._lastAccessedId = savefileId;
	}
    var globalInfo = this.loadGlobalInfo() || [];
    globalInfo[savefileId] = this.makeSavefileInfo();
    this.saveGlobalInfo(globalInfo);
    return true;
};

DataManager.loadGameWithoutRescue = function(savefileId) {
    var globalInfo = this.loadGlobalInfo();
    if (this.isThisGameFile(savefileId)) {
        var json = StorageManager.load(savefileId);
        this.createGameObjects();
        this.extractSaveContents(JsonEx.parse(json));
        if(savefileId != 1){
			this._lastAccessedId = savefileId;
		}
        return true;
    } else {
        return false;
    }
};

DataManager.selectSavefileForNewGame = function() {
    var globalInfo = this.loadGlobalInfo();
    this._lastAccessedId = 2;
    if (globalInfo) {
        var numSavefiles = Math.max(1, globalInfo.length - 1);
        if (numSavefiles < this.maxSavefiles()) {
            this._lastAccessedId = numSavefiles + 1;
        } else {
            var timestamp = Number.MAX_VALUE;
            for (var i = 2; i < globalInfo.length; i++) {
                if (!globalInfo[i]) {
                    this._lastAccessedId = i;
                    break;
                }
                if (globalInfo[i].timestamp < timestamp) {
                    timestamp = globalInfo[i].timestamp;
                    this._lastAccessedId = i;
                }
            }
        }
    }
};
DataManager.saveSavePicture = function (key, SavePicture) {
    StorageManager.saveSavePicture(key, SavePicture.canvas.toDataURL('image/png'));
};
DataManager.loadSavePicture = function (key) {
    return StorageManager.loadSavePicture(key);
};
DataManager.removeSavePicture = function (key) {
    StorageManager.removeSavePicture(key);
};
StorageManager.saveSavePicture = function (key, data) {
    if (this.isLocalMode()) {
        var fs = require('fs');
        var dirPath = this.localFileDirectoryPath();
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        fs.writeFileSync(dirPath + key, data);
    } else {
        localStorage.setItem(key, data);
    }
};
StorageManager.loadSavePicture = function (key) {
    if (this.isLocalMode()) {
        var data = null;
        var fs = require('fs');
        var filePath = this.localFileDirectoryPath() + key;
        if (fs.existsSync(filePath)) {
            data = fs.readFileSync(filePath, { encoding: 'utf8' });
        }
        return data;
    } else {
        var data = localStorage.getItem(key);
        return data;
    }
};
StorageManager.removeSavePicture = function (key) {
    if (this.isLocalMode()) {
        var fs = require('fs');
        var filePath = this.localFileDirectoryPath() + key;
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    } else {
        localStorage.removeItem(key);
    }
};
ImageManager.loadSavePicture = function(key, hue, re) {
	var bitmap = this._imageCache.get(key);
    if (!bitmap || re) {
		var data = DataManager.loadSavePicture(key);
		if(data){
			bitmap = Bitmap.load(data);
			bitmap.addLoadListener(function() {
				bitmap.rotateHue(hue);
			});
			this._imageCache.add(key, bitmap);
		}
    }
    return bitmap;
};
SceneManager._savePicture = null;
SceneManager.snapForSave = function () {
    this._savePicture = this.snap();
};
SceneManager.saveSavePicture = function () {
    return this._savePicture;
};
var _Scene_Map_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function () {
    SceneManager.snapForSave();
    _Scene_Map_terminate.call(this);
};
function Scene_File() {
    this.initialize.apply(this, arguments);
}
Scene_File.prototype = Object.create(Scene_MenuBase.prototype);
Scene_File.prototype.constructor = Scene_File;
Scene_File.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
	this._topIndex = 0;
};
Scene_File.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    DataManager.loadAllSavefileImages();
	this.createBackground();
	this.createMenuSprite();
};
Scene_File.prototype.createMenuSprite = function() {
	this._menuSprite = new Sprite(ImageManager.loadUI('ui_save'));
	this._menuSprite.move(90, 130);
	this.addChild(this._menuSprite);
	this._menuSprite.x += KJ.UI.ScreenChange.offsetW;
	this._menuSprite.y += KJ.UI.ScreenChange.offsetH;
	
	this._textSprite = new Sprite();
	this._textSprite.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
	this.content = this._textSprite.bitmap;
	this.addChild(this._textSprite);
	this._textSprite.x += KJ.UI.ScreenChange.offsetW;
	this._textSprite.y += KJ.UI.ScreenChange.offsetH;

	// this._shadowSprite1 = new Sprite(ImageManager.loadUI('ui_frame_01'));
	// this._shadowSprite1.move(200, 130);
	// this.addChild(this._shadowSprite1);
	
	// this._shadowSprite2 = new Sprite(ImageManager.loadUI('ui_frame_03'));
	// this._shadowSprite2.move(200, 414); 
	// this.addChild(this._shadowSprite2);
	
	this._sliderSprite = new Sprite(ImageManager.loadUI('ui_slider'));
	this._sliderSprite.move(184-2, 180);
	this._sliderSprite.visible = false;
	this.addChild(this._sliderSprite);
	this._sliderSprite.x += KJ.UI.ScreenChange.offsetW;
	this._sliderSprite.y += KJ.UI.ScreenChange.offsetH;
	
	this._picSprite = new Sprite();
	this._picSprite.move(434, 200);
	this._picSprite.scale.x = 256/Graphics.boxWidth;
	this._picSprite.scale.y = 214/Graphics.boxHeight;
	this.addChild(this._picSprite);
	this._picSprite.x += KJ.UI.ScreenChange.offsetW;
	this._picSprite.y += KJ.UI.ScreenChange.offsetH;
	
	//this._noteSprite = new Sprite(ImageManager.loadUI('ui_back'));
	if (this.mode() == 'save') {
		this._noteSprite = new Sprite(ImageManager.loadUI('ui_oper_save'));
	}
	else if (this.mode() == 'load') {
		this._noteSprite = new Sprite(ImageManager.loadUI('ui_oper_load'));
	}
	else {
		this._noteSprite = new Sprite(ImageManager.loadUI('ui_back'));
	}

	//this._noteSprite.move(562+152, 494);
	this._noteSprite.move(546 + 2 * KJ.UI.NoteSize.width, 494);
	this._noteSprite.anchor.x = 1;
	//this._noteSprite.setFrame(0,0,152,18);
	this._noteSprite.setFrame(0, 0, 2 * KJ.UI.NoteSize.width, KJ.UI.NoteSize.height);
	this.addChild(this._noteSprite);
	this._noteSprite.x += KJ.UI.ScreenChange.offsetW;
	this._noteSprite.y += KJ.UI.ScreenChange.offsetH;
};
Scene_File.prototype.start = function() {
    Scene_Base.prototype.start.call(this);


	//this.setIndex(this.firstSavefileIndex());
	var saveId = this.firstSavefileIndex();
	saveId = saveId < 0 ? 0 : saveId;
	saveId = saveId >= KJ.UI.SaveFile ? KJ.UI.SaveFile-1 : saveId;
	this.setIndex(saveId);


	this.updateInputMode();
};
Scene_File.prototype.setIndex = function(index) {
    this._index = index;
	if(!this._data){
		this.makeItemList();
	}
	this.drawAll();
};
DataManager.makeSavefileInfo = function() {
    var info = {};
    info.globalId   = this._globalId;
    info.title      = $dataSystem.gameTitle;
    info.characters = $gameParty.charactersForSavefile();
    info.faces      = $gameParty.facesForSavefile();
    info.playtime   = $gameSystem.playtimeText();
    info.timestamp  = Date.now();
	//info.mapname 	= $gameMap.displayName();
	info.mapname 	= KJ.UI.getStageShowName($gameMap.displayName());
    return info;
};
Scene_File.prototype.makeItemList = function() {
	this._data = [];
    for(var i = 1; i < KJ.UI.SaveFile + 1; i++){
		var valid = DataManager.isThisGameFile(i);
		var data = null;
		if(valid){
			var info = DataManager.loadSavefileInfo(i);
			if(info){
				data = {};
				data.playtime = info.playtime;
				data.mapname = info.mapname;
				// data.picname = DataManager.savePicturePath(i);
			}
		}
		this._data.push(data);
	}
};
Scene_File.prototype.updateKeyMove = function(key, num){
	if(Input.isLongPressed(key)){
		if(Input._pressedTime % this._longTime){
			return;
		}
	}
	var delta = (this.mode() == 'save') ? 1:0;
	var length = this._data.length - delta;
	this.setIndex((this._index - delta + num + length) % length + delta);
	SoundManager.playCursor();
}
Scene_File.prototype.updateKeyUp = function(){
	this.updateKeyMove('up', -1);
};
Scene_File.prototype.updateKeyDown = function(){
	this.updateKeyMove('down', 1);
};
Scene_File.prototype.updateKeyOk = function() {
	this.onSavefileOk();
};
Scene_File.prototype.savefileId = function() {
    return this._index + 1;
};
Scene_File.prototype.mode = function() {
    return null;
};
Scene_File.prototype.helpWindowText = function() {
    return '';
};

Scene_File.prototype.firstSavefileIndex = function() {
    return 0;
};
Scene_File.prototype.onSavefileOk = function() {
};
Scene_File.prototype.drawAll = function(re) {
	this.content.clear();
	var max = 3;
	var startX = 200;
	var startY = 200;
	var paddingH = 46+10;
	this.content.fontSize = 24;
	this.content.outlineColor = "rgba(0,0,0,0)";
	this.content.fontFace = 'UIFont-Heavy';
	var startI = Math.max(0, this._index-max+1);;
	var slider = 244;
	this.content.textColor = "#000000";
	this.content.drawText(this.helpWindowText(), 200, 154, 220, 26);
	var textColor = "gray";
	startI = Math.max(1, startI);
	if(this._data.length > max){
		this.content.fillRect(184, 180, 1, slider, "#bfbfbf");
		var delta = (this.mode() == 'save')? 1:0;
		var per = (this._index-delta)/(this._data.length-1-delta);
		this._sliderSprite.visible = true;
		this._sliderSprite.y = 180 + (slider-this._sliderSprite.height)*per;
		this._sliderSprite.y += KJ.UI.ScreenChange.offsetH;

	}else{
		this._sliderSprite.visible = false;
	}
	this.content.textColor = "#ffffff";
	this.drawItem(0, startX, startY);
	startY += paddingH;
	
	for(var i = startI; i < startI + max; i++){
		this.drawItem(i, startX, startY);
		startY += paddingH;
	}
	// this._picSprite.bitmap = ImageManager.loadSavePicture(DataManager.savePicturePath(this.savefileId()), undefined, re);
};
Scene_File.prototype.drawItem = function(i, startX, startY){
	var item = this._data[i];
	var textColor = "gray";
	if(i == 0 && this.mode() == 'save'){
		textColor = "gray";
	}else if(i == this._index){
		textColor = "#19a506"
	}else if(item){
		textColor = "#181818"
	}
	this.content.fillRect(startX, startY, 460, 46, textColor);
	var text = TextManager.file + i;
	if(i == 0){
		text = TextManager.preemptive;
	}
	this.content.fontSize = 24;
	this.content.drawText(text, startX+15, startY+10, 190, 26);
	if(item){
		this.content.fontSize = 20;
		//this.content.drawText(item.mapname, startX+15+120, startY+10, 200, 26, 'center');
		//this.content.drawText(item.mapname, 
		//this.content.drawText(KJ.UI.getStageShowName(item.mapname), 
		//	570 - KJ.UI.ScreenChange.offsetW, startY+10, 200, 26, 'left');
		// 区分存档读档的情况  存档 : 构造章节显示名  读档 : 读取章节显示名  显示 : 读取章节显示名
		this.content.drawText(item.mapname, 
			570 - KJ.UI.ScreenChange.offsetW, startY+10, 200, 26, 'left');
		this.content.fontSize = 18;
		this.content.drawText(item.playtime, startX+15+240, startY+10, 190, 26, 'right');
	}
};
//-----------------------------------------------------------------------------
// Scene_Save
//
// The scene class of the save screen.

function Scene_Save() {
    this.initialize.apply(this, arguments);
}

Scene_Save.prototype = Object.create(Scene_File.prototype);
Scene_Save.prototype.constructor = Scene_Save;

Scene_Save.prototype.initialize = function() {
    Scene_File.prototype.initialize.call(this);
};

Scene_Save.prototype.mode = function() {
    return 'save';
};
Scene_Save.prototype.helpWindowText = function() {
    return TextManager.saveMessage;
};

Scene_Save.prototype.firstSavefileIndex = function() {
    return DataManager.lastAccessedSavefileId() - 1;
};
Scene_Save.prototype.onSavefileOk = function() {
	if(this._index == 0){
		return;
	}
    Scene_File.prototype.onSavefileOk.call(this);
    $gameSystem.onBeforeSave();
    if (DataManager.saveGame(this.savefileId())) {
        this.onSaveSuccess();
    } else {
        this.onSaveFailure();
    }
};

Scene_Save.prototype.onSaveSuccess = function() {
    SoundManager.playSave();
	StorageManager.cleanBackup(this.savefileId());
    // this.popScene();
	this.makeItemList();
	this.drawAll(true);
};

Scene_Save.prototype.onSaveFailure = function() {
    SoundManager.playBuzzer();
};

//-----------------------------------------------------------------------------
// Scene_Load
//
// The scene class of the load screen.

function Scene_Load() {
    this.initialize.apply(this, arguments);
}
Scene_Load.prototype = Object.create(Scene_File.prototype);
Scene_Load.prototype.constructor = Scene_Load;
Scene_Load.prototype.initialize = function() {
    Scene_File.prototype.initialize.call(this);
    this._loadSuccess = false;
};
Scene_Load.prototype.terminate = function() {
    Scene_File.prototype.terminate.call(this);
    if (this._loadSuccess) {
        $gameSystem.onAfterLoad();
    }
};
Scene_Load.prototype.mode = function() {
    return 'load';
};
Scene_Load.prototype.helpWindowText = function() {
    return TextManager.loadMessage;
};
Scene_Load.prototype.firstSavefileIndex = function() {
    return DataManager.latestSavefileId() - 1;
};
Scene_Load.prototype.onSavefileOk = function() {
    Scene_File.prototype.onSavefileOk.call(this);
    if (DataManager.loadGame(this.savefileId())) {
        this.onLoadSuccess();
    } else {
        this.onLoadFailure();
    }
};
Scene_Load.prototype.onLoadSuccess = function() {
    SoundManager.playLoad();
    this.fadeOutAll();
    this.reloadMapIfUpdated();
    SceneManager.goto(Scene_Map);
	KJ.UI.LoadSaveFile = true;
    this._loadSuccess = true;
};
Scene_Load.prototype.onLoadFailure = function() {
    SoundManager.playBuzzer();
};
Scene_Load.prototype.reloadMapIfUpdated = function() {
    if ($gameSystem.versionId() !== $dataSystem.versionId) {
        $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
        $gamePlayer.requestMapReload();
    }
};
Scene_Gameover.prototype.reloadMapIfUpdated = function() {
    if ($gameSystem.versionId() !== $dataSystem.versionId) {
        $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
        $gamePlayer.requestMapReload();
    }
};
Scene_Gameover.prototype.gotoTitle = function() {
	// 自动读档
    // SceneManager.goto(Scene_Title);
	SoundManager.playLoad();
	if (DataManager.loadGame(0)) {
        SoundManager.playLoad();
		this.fadeOutAll();
		this.reloadMapIfUpdated();
		SceneManager.goto(Scene_Map);
		KJ.UI.LoadSaveFile = true;
    } else {
        SceneManager.goto(Scene_Title);
    }
};
Scene_Map.prototype.needsFadeIn = function() {
	if(KJ.UI.LoadSaveFile){
		KJ.UI.LoadSaveFile = false;
		return true;
	}
    return (SceneManager.isPreviousScene(Scene_Battle) ||
            SceneManager.isPreviousScene(Scene_Load));
};
//-------------------------------------------------------
function Scene_Options() {
    this.initialize.apply(this, arguments);
}
Scene_Options.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Options.prototype.constructor = Scene_Options;
Scene_Options.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
Scene_Options.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
	this.createBackground();
	this.createMenuSprite();
};
Scene_Options.prototype.createMenuSprite = function() {
	this._menuSprite = new Sprite(ImageManager.loadUI('ui_setting'));
	this._menuSprite.move(90, 130);
	this.addChild(this._menuSprite);
	this._menuSprite.x += KJ.UI.ScreenChange.offsetW;
	this._menuSprite.y += KJ.UI.ScreenChange.offsetH;
	
	this._textSprite = new Sprite();
	this._textSprite.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
	this.content = this._textSprite.bitmap;
	this.addChild(this._textSprite);
	this._textSprite.x += KJ.UI.ScreenChange.offsetW;
	this._textSprite.y += KJ.UI.ScreenChange.offsetH;
	
	// this._shadowSprite1 = new Sprite(ImageManager.loadUI('ui_frame_02'));
	// this._shadowSprite1.move(200, 130);
	// this.addChild(this._shadowSprite1);
	
	// this._shadowSprite2 = new Sprite(ImageManager.loadUI('ui_frame_03'));
	// this._shadowSprite2.move(200, 414); 
	// this.addChild(this._shadowSprite2);
	

	this._arrowSprite = new Sprite();
	this.addChild(this._arrowSprite);
	this._arrowSprite.x += KJ.UI.ScreenChange.offsetW;
	this._arrowSprite.y += KJ.UI.ScreenChange.offsetH;

	this._arrowSprites = [];
	this._arrowSelBitmapL = ImageManager.loadUI('UIsound1_1');
	this._arrowSelBitmapR = ImageManager.loadUI('UIsound1_2');
	this._arrowIndBitmapL = ImageManager.loadUI('UIsound2_1');
	this._arrowIndBitmapR = ImageManager.loadUI('UIsound2_2');
	this._arrowBitmapL = ImageManager.loadUI('UIsound3_1');
	this._arrowBitmapR = ImageManager.loadUI('UIsound3_2');
	var arrowBitmapL = this._arrowBitmapL;
	var arrowBitmapR = this._arrowBitmapR;
	//var arrowSpace = 10;
	var arrowSpaceL = 6;
	var arrowSpaceR = 10;
	//var arrowOffsetY = Math.floor((20 - arrowBitmapL.height) / 2);
	var arrowOffsetY = Math.floor((20 - 11) / 2);
	console.log(arrowOffsetY);
	for (var i = 0; i < 4; i++) {
		// number rect : (508, 202+44*i, 57, 20)
		var spriteL = new Sprite(arrowBitmapL);
		var spriteR = new Sprite(arrowBitmapR);
		//spriteL.x = - arrowBitmapL.width - arrowSpaceL + 508;
		spriteL.x = -7 - arrowSpaceL + 508;
		spriteL.y = 202+44*i + arrowOffsetY;
		spriteR.x = 508 + 57 + arrowSpaceR;
		spriteR.y = 202+44*i + arrowOffsetY;
		this._arrowSprites.push([spriteL, spriteR]);
		this._arrowSprite.addChild(spriteL);
		this._arrowSprite.addChild(spriteR);
	}

	//this._noteSprite = new Sprite(ImageManager.loadUI('ui_back'));
	this._noteSprite = new Sprite(ImageManager.loadUI('ui_oper_options'));
	//this._noteSprite.move(562+152, 494);
	this._noteSprite.move(546 + 2 * KJ.UI.NoteSize.width, 494);
	this._noteSprite.anchor.x = 1;
	//this._noteSprite.setFrame(0,0,152,18);
	this._noteSprite.setFrame(0, 0, 2 * KJ.UI.NoteSize.width, KJ.UI.NoteSize.height);
	this.addChild(this._noteSprite);
	this._noteSprite.x += KJ.UI.ScreenChange.offsetW;
	this._noteSprite.y += KJ.UI.ScreenChange.offsetH;
	
	this._picSprite = new Sprite(ImageManager.loadUI(KJ.UI.SettingPic));
	this._picSprite.anchor.x = 0.5;
	this._picSprite.anchor.y = 0.5;
	this._picSprite.move(Graphics.boxWidth/2, Graphics.boxHeight/2);
	this._picSprite.visible = false;
	this.addChild(this._picSprite);
	//this._picSprite.x += KJ.UI.ScreenChange.offsetW;
	//this._picSprite.y += KJ.UI.ScreenChange.offsetH;
};
Scene_Options.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
	this._show = false;
	this.setIndex(0);
	this.updateInputMode();
};
Scene_Options.prototype.setIndex = function(index) {
    this._index = index;
	if(!this._data){
		this.makeItemList();
	}
	this.drawAll();
};


Scene_Options.prototype.update = function() {
	Scene_MenuBase.prototype.update.apply(this, arguments);

	this._arrowSprites.forEach(function(arr, index) {
		var targetL = index != this._index
			 ? this._arrowBitmapL
			 : Input.isPressed('left')  ? this._arrowSelBitmapL : this._arrowIndBitmapL;
		var targetR = index != this._index
			 ? this._arrowBitmapR
			 : Input.isPressed('right') ? this._arrowSelBitmapR : this._arrowIndBitmapR;
		if (arr[0].bitmap != targetL) arr[0].bitmap = targetL;
		if (arr[1].bitmap != targetR) arr[1].bitmap = targetR;
	}, this);
};


Scene_Options.prototype.updateKeyMove = function(key, num){
	if(this._show){
		return;
	}
	if(Input.isLongPressed(key)){
		if(Input._pressedTime % this._longTime){
			return;
		}
	}
	var length = this._data.length;
	this.setIndex((this._index + num + length) % length);
	SoundManager.playCursor();
}
Scene_Options.prototype.updateKeyUp = function(){
	this.updateKeyMove('up', -1);
};
Scene_Options.prototype.updateKeyDown = function(){
	this.updateKeyMove('down', 1);
};


Scene_Options.prototype.updateVolume = function(key, num){
	if(this._show){
		return;
	}
	if(Input.isLongPressed(key)){
		if(Input._pressedTime % this._longTime){
			return;
		}
	}
	if (0 <= this._index && this._index < 4) {
		SoundManager.playCursor();
		var value = ConfigManager[this._data[this._index]];
		value += num;
		if (value > 100) value = 100;
		if (value < 0) value = 0;
		ConfigManager[this._data[this._index]] = value;
		ConfigManager.save();
		this.drawAll();
	}
}
Scene_Options.prototype.updateKeyLeft = function(){
	this.updateVolume('left', -10);
};
Scene_Options.prototype.updateKeyRight = function(){
	this.updateVolume('right', 10);
};


// Scene_Options.prototype.updateKeyOk = function() {
	// SoundManager.playOk();
	// ConfigManager.save();
	// SceneManager.pop();
// };
Scene_Options.prototype.updateKeyOk = function(){
	SoundManager.playOk();
	if(this._index == 4){
		this._show = !this._show;
		this._picSprite.visible = this._show;
	}else{
		var value = ConfigManager[this._data[this._index]];
		console.log(value);
		value += 20;
		if(value > 100){
			value -= 100;
		}
		ConfigManager[this._data[this._index]] = value;
		ConfigManager.save();
		this.drawAll();
	}
};
Scene_Options.prototype.makeItemList = function() {
	this._data = ['bgmVolume', 'bgsVolume', 'meVolume', 'seVolume', TextManager.escapeStart];
};
Scene_Options.prototype.drawAll = function() {
    this.content.clear();
	this.content.fontSize = 20;
	this.content.outlineColor = "rgba(0,0,0,0)";
	this.content.fontFace = 'UIFont-Heavy';
	this.content.textColor = "#181818";
	var text,number;
	for(var i = 0; i < 5; i++){
		if(i == this._index){
			this.content.textColor = "#19a506";
		}else{
			this.content.textColor = "#181818";
		}
		if(i == 4){
			text = TextManager.escapeStart;
			number = "";
		}else{
			text = TextManager[this._data[i]];
			number = ConfigManager[this._data[i]] + '%';	
		}
		this.content.drawText(text, 298, 202+44*i, 200, 20);
		this.content.drawText(number, 508, 202+44*i, 57, 20, 'right');
	}
};
//-------------------------------------------------------
function Scene_GameEnd() {
    this.initialize.apply(this, arguments);
}

Scene_GameEnd.prototype = Object.create(Scene_MenuBase.prototype);
Scene_GameEnd.prototype.constructor = Scene_GameEnd;

Scene_GameEnd.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

Scene_GameEnd.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
	this.createBackground();
	this.createMenuSprite();
};
Scene_GameEnd.prototype.createMenuSprite = function() {
	this._menuSprite = new Sprite(ImageManager.loadUI('ui_quit'));
	this._menuSprite.move(90, 130);
	this.addChild(this._menuSprite);
	this._menuSprite.x += KJ.UI.ScreenChange.offsetW;
	this._menuSprite.y += KJ.UI.ScreenChange.offsetH;
	
	this._textSprite = new Sprite();
	this._textSprite.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
	//this._textSprite.bitmap = new Bitmap(KJ.UI.ScreenChange.oldWidth, KJ.UI.ScreenChange.oldHeight);
	this.content = this._textSprite.bitmap;
	this.addChild(this._textSprite);
	this._textSprite.x += KJ.UI.ScreenChange.offsetW;
	this._textSprite.y += KJ.UI.ScreenChange.offsetH;
	
	//this._noteSprite = new Sprite(ImageManager.loadUI('ui_back'));
	this._noteSprite = new Sprite(ImageManager.loadUI('ui_oper_gameend'));
	//this._noteSprite.move(562+170, 494);
	this._noteSprite.move(546 + 2 * KJ.UI.NoteSize.width, 494);
	this._noteSprite.anchor.x = 1;
	//this._noteSprite.setFrame(0,0,170,18);
	this._noteSprite.setFrame(0, 0, 2 * KJ.UI.NoteSize.width, KJ.UI.NoteSize.height);
	this.addChild(this._noteSprite);
	this._noteSprite.x += KJ.UI.ScreenChange.offsetW;
	this._noteSprite.y += KJ.UI.ScreenChange.offsetH;
};
Scene_GameEnd.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this.setIndex(0);
	this.updateInputMode();
};
Scene_GameEnd.prototype.setIndex = function(index) {
    this._index = index;
	if(!this._data){
		//this._data = [TextManager.defeat,TextManager.obtainExp,TextManager.obtainGold]

		// 不需要结束游戏项
		this._data = [TextManager.defeat,TextManager.obtainGold];
	}
	this.drawAll();
};
Scene_GameEnd.prototype.drawAll = function() {
    this.content.clear();
	this.content.fontSize = 22;
	this.content.outlineColor = "rgba(0,0,0,0)";
	this.content.fontFace = 'UIFont-Heavy';
	this.content.textColor = "#181818";
	var text = TextManager.escapeFailure;
	var width = this.content.measureTextWidth(text);
	this.content.drawText(text, 180, 240, width, 22, 'center');
	text = TextManager.victory;
	this.content.drawText(text, 180, 270, width, 22, 'center');
	
	//width = this.content.measureTextWidth(this._data[0]) + 40;
	width = this.content.measureTextWidth(this._data[0]) + 62;
	//for(var i = 0; i < 3; i++){
	for(var i = 0; i < this._data.length; i++){
		if(i == this._index){
			this.content.textColor = "#19a506";
		}else{
			this.content.textColor = "#181818";
		}
		//this.content.drawText(this._data[i], 250+width*i, 340, width, 24);
		this.content.drawText(this._data[i], 
			504-KJ.UI.ScreenChange.offsetW+width*i, 
			380-KJ.UI.ScreenChange.offsetH, 
			width, 24);
	}
};
Scene_GameEnd.prototype.updateKeyMove = function(key, num){
	if(Input.isLongPressed(key)){
		if(Input._pressedTime % this._longTime){
			return;
		}
	}
	var length = this._data.length;
	this.setIndex((this._index + num + length) % length);
	SoundManager.playCursor();
}
Scene_GameEnd.prototype.updateKeyLeft = function(){
	this.updateKeyMove('left', -1);
};
Scene_GameEnd.prototype.updateKeyRight = function(){
	this.updateKeyMove('right', 1);
};
// Scene_GameEnd.prototype.createBackground = function() {
    // Scene_MenuBase.prototype.createBackground.call(this);
    // this.setBackgroundOpacity(128);
// };
Scene_GameEnd.prototype.commandToTitle = function() {
	SoundManager.playOk();
    this.fadeOutAll();
    SceneManager.goto(Scene_Title);
};
Scene_GameEnd.prototype.commandExit = function() {
    SoundManager.playOk();
    SceneManager.exit();
};
Scene_GameEnd.prototype.updateKeyOk = function(){
	switch(this._index){
	case 0:this.commandToTitle();break;

	
	//case 1:this.commandExit();break;
	//case 2:this.popScene();break;
	// 不需要结束游戏项
	case 1:this.popScene();break;


	default:break;
	}
};
//-------------------------------------------------------