/*:
 * @plugindesc Title
 * @author Kong Jing
 *
 * @requiredAssets img/UI/title
 * @requiredAssets img/UI/button
 *
 * @param Newgame
 * @text 新游戏
 * @type struct<Position>
 * @default {"X":"550","Y":"378","Name":"newgame"}
 * @desc 图片要求上下等分,上一半为未选中,下一半为选中.
 *
 * @param Continue
 * @text 继续游戏
 * @type struct<Position>
 * @default {"X":"550","Y":"428","Name":"continue"}
 * @desc 图片要求上下等分,上一半为未选中,下一半为选中.
 *
 * @param Exit
 * @text 退出游戏
 * @type struct<Position>
 * @default {"X":"550","Y":"478","Name":"exit"}
 * @desc 图片要求上下等分,上一半为未选中,下一半为选中.
 *
 * @param Animation
 * @text 帧动画
 * @type struct<Animation>[]
 * @default ["{\"Speed\":\"10\",\"Xnumber\":\"1\",\"Ynumber\":\"1\",\"Name\":\"title\",\"Total\":\"1\",\"Z\":\"0\"}"]
 *
 * @help
 *
 * animation index speed xnumber ynumber name total z x y type
 * index/频率/横向数量/纵向数量/图片名字/帧数/Z/X/Y/动画效果
 * 其中index是索引,即修改第几条,0为第一条
 * 其余和插件命令设置的一样
 *
 * 单个动画效果的格式 类型,参数1,参数2,...
 * 多个动画效果的格式 单个动画效果|单个动画效果|.....
 *
 * 类型0-没有任何事情发生
 *
 * 类型1-平移
 * 参数1频率,多少帧更新一次
 * 参数2方向,左0,右1,上2,下3
 * 参数3速度,单位是帧每次
 * 参数4范围,比如方向是向右,则x坐标增加到此范围则重置到初始位置
 * (如果不想要重置,则设置填写任意非数字即可,比如a)
 * 如果想要左上这种组合平移,可以设置2次平移的动画效果
 *
 * 类型2-震动
 * 参数1频率,多少帧更新一次
 * 参数2方向,0左右,1上下
 * 参数3强度,如rpgmaker系统自带震动
 * 参数4速度,如rpgmaker系统自带震动
 * 如果想要左右上下组合震动,可以设置2次震动的动画效果
 *
 *
 */
/*~struct~Position:
 * @param X
 * @type number
 * @text X坐标
 * @default 0
 *
 * @param Y
 * @text Y坐标
 * @type number
 * @default 0
 *
 * @param Name
 * @type file
 * @dir img/UI/
 * @text 图片名字
 *
 */
/*~struct~Animation:
 * @param Speed
 * @text 频率
 * @type number
 * @default 3
 * @desc 多少帧播放下一张图
 *
 * @param Xnumber
 * @text 横向有多少张图
 * @type number
 * @default 3
 * @desc 用于计算每帧图片的宽度
 *
 * @param Ynumber
 * @text 纵向有多少张图
 * @type number
 * @default 4
 * @desc 用于计算每帧图片的高度
 *
 * @param Name
 * @text 图片名字
 * @type file
 * @dir img/UI/
 *
 * @param Total
 * @text 帧数
 * @default 12
 *
 * @param Z
 * @text 图层位置
 * @desc 请填写整数,数字越小的在越下面,其中开始游戏那些按钮的图层位置为100,同数字的index在上面的帧动画在下层
 * @default 0
 *
 * @param X
 * @text X坐标
 * @default 0
 *
 * @param Y
 * @text Y坐标
 * @default 0
 *
 * @param Type
 * @text 动画效果
 * @type string
 * @desc 格式为 动画效果|动画效果|动画效果
 * 即可以设置多个动画效果同时生效,单个动画效果设置见插件帮助
 * @default 0
 */
var KJ = KJ || {};
KJ.UI = KJ.UI || {};
(function(){
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args){
    _Game_Interpreter_pluginCommand.call(this, command, args);
    command = command.toLowerCase();
    if(command === 'animation'){
      var index = parseInt(args[0]);
      var speed = parseInt(args[1]);
      var xnumber = parseInt(args[2]);
      var ynumber = parseInt(args[3]);
      var name = String(args[4]);
      var total = parseInt(args[5]);
      var z = parseInt(args[6]);
      var x = parseInt(args[7]);
      var y = parseInt(args[8]);
      var type = String(args[9]);
      ConfigManager.saveAnimation(index,speed,xnumber,ynumber,name,total,z,x,y,type);
    }
  };
})();
//处理参数
var parameters = PluginManager.parameters('KJ_Title');
KJ.UI.Newgame = JSON.parse(parameters["Newgame"]);
KJ.UI.Continue = JSON.parse(parameters["Continue"]);
KJ.UI.Exit = JSON.parse(parameters["Exit"]);
KJ.UI.Animation = JSON.parse(parameters["Animation"]);
//加载图片
ImageManager.loadUI = function(filename, hue) {
	return this.loadBitmap('img/UI/', filename, hue, false);
};
//Sprite_UIButton 包含鼠标效果(虽然被禁用了,但我懒得改了)
function Sprite_UIButton() {
    this.initialize.apply(this, arguments);
}
Sprite_UIButton.prototype = Object.create(Sprite_Button.prototype);
Sprite_UIButton.prototype.constructor = Sprite_UIButton;
Sprite_UIButton.prototype.initialize = function(args,index) {
    Sprite_Button.prototype.initialize.call(this);
    this.x = args.X;
    this.y = args.Y;
    this.z = 100;
    this.bitmap = ImageManager.loadUI(args.Name);
    this.bitmap.addLoadListener(this.setButtonFrame.bind(this));
    this._index = index;
};
Sprite_UIButton.prototype.setButtonFrame = function(){
  var width = this.bitmap.width;
  var height = this.bitmap.height;
  this.setColdFrame(0,0,width,height/2);
  this.setHotFrame(0,height/2,width,height/2);
};
Sprite_UIButton.prototype.update = function() {
    Sprite_Button.prototype.update.call(this);
    this.updateIndex();
};
Sprite_UIButton.prototype.updateIndex = function(){
  if(this._index != undefined && this.parent){
    if(this._touching){
      this.parent._index = this._index;
    }else if(this._index == this.parent._index){
      this._keepHot = true;
    }else{
      this._keepHot = false;
    }
  }
};
Sprite_UIButton.prototype.updateFrame = function() {
    var frame;
    if (this._touching || this._keepHot) {
        frame = this._hotFrame;
    } else{
        frame = this._coldFrame;
    }
    if (frame) {
        this.setFrame(frame.x, frame.y, frame.width, frame.height);
    }
};
Sprite_UIButton.prototype.processTouch = function() {
    if (this.isActive()) {
        if (this.isButtonTouched()) {
            this._touching = true;
        }
        if (this._touching) {
            if (TouchInput.isReleased() || !this.isButtonTouched()) {
                this._touching = false;
                if (TouchInput.isReleased()) {
                    this.callClickHandler();
                }
            }
        }
    } else {
        this._touching = false;
    }
};
//-----------------------------------------------------------------------------
// Scene_Title
//
// The scene class of the title screen.
//function Scene_Title() {
//    this.initialize.apply(this, arguments);
//}
//Scene_Title.prototype = Object.create(Scene_Base.prototype);
//Scene_Title.prototype.constructor = Scene_Title;
Scene_Title.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
    if(DataManager.isAnySavefileExists()){
      this._index = 1;
    }else{
      this._index = 0;
    }
};
Scene_Title.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
	this.createAnimations();
	this.createBackground();
    this.createButtonSprite();
    this.children.sort(this.compareChildOrder.bind(this));
};
Scene_Title.prototype.compareChildOrder = function(a,b) {
  return a.z > b.z;
};
Scene_Title.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    this.playTitleMusic();
    this.startFadeIn(this.fadeSpeed(), false);
};
Scene_Title.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    this.updateControl();
};
Scene_Title.prototype.isBusy = function() {
    return Scene_Base.prototype.isBusy.call(this);
};
Scene_Title.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    SceneManager.snapForBackground();
};
Scene_Title.prototype.createAnimations = function() {
    var args = KJ.UI.Animation;
    // if(ConfigManager.animation){
    //   args = ConfigManager.animation;
    // }else{
    //   ConfigManager.animation = args;
    //   ConfigManager.save();
    // }
    args.forEach(function(a){
      if(typeof(a) != "object"){
        a = JSON.parse(a);
      }
      var sprite = new Sprite_AnimationUI(a);
      this.addChild(sprite);
    },this);
};
Scene_Title.prototype.createButtonSprite = function() {
    this._newgameSprite = new Sprite_UIButton(KJ.UI.Newgame,0);
    this._newgameSprite.setClickHandler(this.commandNewGame.bind(this));
    this.addChild(this._newgameSprite);
    this._continueSprite = new Sprite_UIButton(KJ.UI.Continue,1);
    this._continueSprite.setClickHandler(this.commandContinue.bind(this));
    this.addChild(this._continueSprite);
    this._exitSprite = new Sprite_UIButton(KJ.UI.Exit,2);
    this._exitSprite.setClickHandler(this.commandExit.bind(this));
    this.addChild(this._exitSprite);
};
Scene_Title.prototype.commandNewGame = function() {
    SoundManager.playOk();
    DataManager.setupNewGame();
    this.fadeOutAll();
    SceneManager.goto(Scene_Map);
};
Scene_Title.prototype.commandContinue = function() {
    if(DataManager.isAnySavefileExists()){
      SoundManager.playOk();
      SceneManager.push(Scene_Load);
    }
    else{
      SoundManager.playBuzzer();
    }
};
Scene_Title.prototype.commandOptions = function() {
    SceneManager.push(Scene_Options);
};
Scene_Title.prototype.commandExit = function() {
    SoundManager.playOk();
    SceneManager.exit();
};
Scene_Title.prototype.playTitleMusic = function() {
    AudioManager.playBgm($dataSystem.titleBgm);
    AudioManager.stopBgs();
    AudioManager.stopMe();
};
Scene_Title.prototype.updateControl = function() {
	// if(TouchInput.isTriggered()){
	// 	this.updateTouchOk();
	// }
	// else if(TouchInput.isCancelled()){
	// 	this.updateCancel();
	// }
	if(Input.isTriggered('ok')){
		this.updateKeyOk();
	}
	// else if(Input.isRepeated('cancel')){
	// 	this.updateCancel();
	// }
	else if(Input.isTriggered('up') || Input.isLongPressed('up')){
		this.updateKeyUp();
	}
	else if(Input.isTriggered('down') || Input.isLongPressed('down')){
		this.updateKeyDown();
	}
	// else if(Input.isTriggered('left') || Input.isLongPressed('left')){
	// 	this.updateKeyLeft();
	// }
	// else if(Input.isTriggered('right') || Input.isLongPressed('right')){
	// 	this.updateKeyRight();
	// }
};
Scene_Title.prototype.updateKeyOk = function(){
	if(this._index != -1){
		switch (this._index) {
      case 0:
        this.commandNewGame();
        break;
      case 1:
        this.commandContinue();
        break;
      case 2:
        this.commandExit();
        break;
      default:
        break;
    }
	}
	else{
		SoundManager.playBuzzer();
	}
};
Scene_Title.prototype.updateKeyMove = function(key, num){
	if(Input.isLongPressed(key)){
		if(Input._pressedTime % 15){
			return;
		}
	}
  var length = 3;
	this._index = (this._index + num + length) % length;
	SoundManager.playCursor();
}
Scene_Title.prototype.updateKeyUp = function(){
	this.updateKeyMove('up', -1);
};
Scene_Title.prototype.updateKeyDown = function(){
	this.updateKeyMove('down', 1);
};
//帧动画
//speed,xnumber,ynumber,name,total,z,x,y,type
function Sprite_AnimationUI() {
    this.initialize.apply(this, arguments);
}
Sprite_AnimationUI.prototype = Object.create(Sprite.prototype);
Sprite_AnimationUI.prototype.constructor = Sprite_AnimationUI;
Sprite_AnimationUI.prototype.initialize = function(args) {
  Sprite.prototype.initialize.call(this);
  this._animationIndex = 0;
  this._lengthX = parseInt(args.Xnumber);
  this._lengthY = parseInt(args.Ynumber);
  this._length = parseInt(args.Total);
  this._speed = parseInt(args.Speed);
  this._baseX = parseInt(args.X);
  this._baseY = parseInt(args.Y);
  this.x = this._baseX;
  this.y = this._baseY;
  this.z = parseInt(args.Z);
  console.log(args,this);
  this.setupAnimation(args.Type);
  this._animationCount = 0;
  this.bitmap = ImageManager.loadUI(args.Name);
  this.bitmap.addLoadListener(this.updateFrame.bind(this));
};
Sprite_AnimationUI.prototype.updateFrame = function() {
  var width = this.bitmap.width / this._lengthX;
  var height = this.bitmap.height / this._lengthY;
  var x = (this._animationIndex % this._lengthX) * width;
  var y = parseInt((this._animationIndex / this._lengthX)) * height;
  this.setFrame(x,y,width,height);
};
Sprite_AnimationUI.prototype.update = function(){
  Sprite.prototype.update.call(this);
  this.updateAnimation();
};
Sprite_AnimationUI.prototype.setupAnimation = function(type){
  this.type = (type || "").split("|");
  for(var i = 0; i < this.type.length; i++){
    this.type[i] = this.type[i].split(",");
    for(var j = 0; j < this.type[i].length; j++){
      this.type[i][j] = parseInt(this.type[i][j]);
    }
  }
  console.log(type,this.type);
};
Sprite_AnimationUI.prototype.updateAnimation = function(){
  this._animationCount++;
   if(this._animationCount % this._speed == 0){
     this._animationIndex = (this._animationIndex + 1) % this._length;
     this.updateFrame();
   }
  for(var i = 0; i < this.type.length; i++){
    switch (this.type[i][0]) {
	  case 1:this.updateMove(this.type[i]);break;
	  case 2:this.updateShake(this.type[i]);break;
	  case 3:break;
	  default:break;
    }
  }
};
Sprite_AnimationUI.prototype.updateShake = function(args){
};
Sprite_AnimationUI.prototype.updateShake = function(args){
	if(this._animationCount % args[1]){
		return;
	}
	//2方向,0左右,1上下
	//3强度,4速度
	//5-this._shakeDirection
	//6-this._shake
	args[5] = args[5] || 1;//初始化
	args[6] = args[6] || 0;//初始化
	args[7] = args[7] || 0;//初始化
	var delta = (args[3] * args[4] * args[5]) / 10;
	args[6] += delta;
	if (args[6] > args[3] * 2) {
		args[5] = -1;
	}
	if (args[6] < - args[3] * 2) {
		args[5] = 1;
	}
	switch(args[2]){
		case 0:
			this.x = this.x - args[7] + args[6];
			break;
		case 1:
			this.y = this.y - args[7] + args[6];
		default:break;
	}
	args[7] = args[6];
	// console.log(args);
};
Sprite_AnimationUI.prototype.updateMove = function(args){
	if(this._animationCount % args[1]){
		return;
	}
	//2方向,左0,右1,上2,下3
	//3速度,4范围
	switch(args[2]){
	case 0:
		this.x -= args[3];
		if(this.x < args[4]){
			this.x = this._baseX;
		}
		break;
	case 1:
		this.x += args[3];
		if(this.x > args[4]){
			this.x = this._baseX;
		}
		break;
	case 2:
		this.y -= args[3];
		if(this.y < args[4]){
			this.y = this._baseY;
		}
		break;
	case 3:
		this.y += args[3];
		if(this.y > args[4]){
			this.y = this._baseY;
		}
		break;
	default:break;
	}
};

//---------------
ConfigManager.makeData = function() {
    var config = {};
    config.alwaysDash = this.alwaysDash;
    config.commandRemember = this.commandRemember;
    config.bgmVolume = this.bgmVolume;
    config.bgsVolume = this.bgsVolume;
    config.meVolume = this.meVolume;
    config.seVolume = this.seVolume;
    config.animation = this.animation;
    return config;
};
ConfigManager.applyData = function(config) {
    this.alwaysDash = this.readFlag(config, 'alwaysDash');
    this.commandRemember = this.readFlag(config, 'commandRemember');
    this.bgmVolume = this.readVolume(config, 'bgmVolume');
    this.bgsVolume = this.readVolume(config, 'bgsVolume');
    this.meVolume = this.readVolume(config, 'meVolume');
    this.seVolume = this.readVolume(config, 'seVolume');
    this.animation = config["animation"];
};
ConfigManager.saveAnimation = function(index,speed,xnumber,ynumber,name,total,z,x,y,type) {
  this.animation = this.animation || [];
  this.animation[index] = {};
  var animation = this.animation[index];
  animation.Speed = speed;
  animation.Xnumber = xnumber;
  animation.Ynumber = ynumber;
  animation.Name = name;
  animation.Total = total;
  animation.Z = z;
  animation.X = x;
  animation.Y = y;
  animation.Type = type;
  ConfigManager.save();
};
