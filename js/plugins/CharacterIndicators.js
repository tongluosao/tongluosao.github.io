//=============================================================================
// CharacterIndicators.js
//=============================================================================

/*:
 * @plugindesc 扩展MOG_EventIndicators，让其可以对玩家产生效果。
 * @author 冷血
 *
 * 插件参数：
 *
 *   @param fadeDuration
 * 	 @desc 淡入淡出速度，数值越大速度越快
 * 	 @default 30
 *
 * @help
 *
 * =============================================================================
 * COMMENT (EVENT)
 * =============================================================================
 *
 * 我的插件在MOG_EventIndicators的基础上增加以下注释。
 *
 * indicator_target : player       添加这个注释，为事件设定的效果就会出现在玩家头上，
 *                                 因为事件和玩家是多对一的关系效果会互相覆盖，所以你
 *                                 还要设置range_indicator给一个接触范围。
 *
 *
 * =============================================================================
 * PLUGIN COMMAND
 * =============================================================================
 *
 * 在MOG_EventIndicators提供的插件命令中，将EVENT_ID指定为-1那么将会对玩家有效
 *
 * =============================================================================
 * 使用方法
 * =============================================================================
 *
 * ●玩家和事件的距离为1时，在玩家头上显示名称为Star图片,
 *   同时带有放大的动画效果
 *
 * 注释   ->   indicator_target : player
 * 注释   ->   indicator : Star : 0 : 0
 * 注释   ->   pulse_indicator : 0.008
 * 注释   ->   range_indicator : 1
 *
 * 以上案例除了多了一个indicator_target注释外，其他的和MOG_EventIndicators
 * 用法几乎没有区别所以更多的用法可以看一下MOG_EventIndicators，另外还有一个
 * 叫做MOG_Master_MV的demo工程，里面有很多实例可参考。
 */
(function() {
	var parameters = PluginManager.parameters('CharacterIndicators');
	var fadeDuration = parseInt(parameters['fadeDuration']);
	//==============================
	// * set Ind Interpreter
	//==============================
	Game_Interpreter.prototype.setIndInterpreter = function(command, args) {
		var event_id = 0 ; var indV = false; var indE = false; var indF = false;
		var indR = false; var indA = false; var indO = false; var indB = false;
		var indRot = false ; var indShake = false; var indZoom = false; 
		var x = 0; var y = 0 ; var indFloat = false; var indSlide = false;
		var indText = false; 
		var indClear = false ; var char = null;
		if (command === "hide_all_indicators") {
	        $gameSystem._eventIndVis = false;
	    } else if (command === "show_all_indicators") {
	        $gameSystem._eventIndVis = true;
		};
		if (command === "hide_indicator")  {
			var event_id = Number(args[1]);
			var enable = false;
			var indV = true;
		} else if (command === "show_indicator")  { 
			var event_id = Number(args[1]);
			var enable = true;	
			var indV = true;
		};	
		if (command === "indicator")  { 
		    var event_id = Number(args[1]);
		    var fileName = String(args[3]);
			var x = Number(args[5]);
			var y = Number(args[7]);
			var mode = 0;
			var id = 0;
			var indE = true;
		};
		if (command === "text_indicator")  {
			var event_id = Number(args[1]);
			var text = ""
			for (var i = 3; i < args.length; i++) {
				  text += args[i] + " ";
			};
			var indText = true;
			var id = 0
		}
		if (command === "variable_indicator")  { 	
			var event_id = Number(args[1]);
			var text = "VariableMode"
			var id = Number(args[3]);
			var indText = true;
		};	
		if (command === "range_indicator")  {
			var event_id = Number(args[1]);
			var indR = true;
			var range = true
			var d = Number(args[3]); 
		};
		if (command === "animated_indicator")  {
			var event_id = Number(args[1]);
			var indA = true;
			var animated = true		
			var frames = Number(args[3]);
			var frameSpeed = Number(args[5]);		
		};	
		if (command === "fontsize_indicator")  {
			var event_id = Number(args[1]);
			var indF = true;
			var fs = Number(args[3]);
		};
		if (command === "blendmode_indicator")  {
			var event_id = Number(args[1]);
			var indB = true;
			var blendMode = Number(args[3]);
		};		
		if (command === "rotation_indicator")  {
			var event_id = Number(args[1]);
			var indRot = true;
			var rots = Number(args[3]);
		};
		if (command === "shake_indicator")  {
			var event_id = Number(args[1]);
			var indShake = true;
			var shake = Number(args[3]);
		};
		if (command === "pulse_indicator")  {
			var event_id = Number(args[1]);
			var indZoom = true;
			var zoom = Number(args[3]);
		};
		if (command === "float_indicator")  {
			var event_id = Number(args[1]);
			var indFloat = true;
		};	
		if (command === "slide_indicator")  {
			var event_id = Number(args[1]);
			var indSlide = true;
		};		
		if (command === "clear_indicator")  {
			var event_id = Number(args[1]);
			var indClear = true;
		};						
		if (event_id > 0) {
			$gameMap.events().forEach(function(event) {
			if (event.eventId() === event_id) {char = event};
			}, this);
		}
		//直接为玩家设置效果的情况，清除和事件的关联
		else if(event_id == -1)
		{
			char = $gamePlayer;
			char._lastIndicatorEvent = null;
		}
		if (char) {
				if (indV) {char._indData.visible = enable};
				if (indE) {
					char.setIndicators(fileName,0,false,0,0,"",0,false,false,0,true,x,y);
				};
				if (indR) {
					char._indData.ref = true;
					char._indData.range = true;
					char._indData.rangeD = d;
				};
				if (indA) {
					char._indData.ref = true;
					char._indData.animated = true;
					char._indData.frames = [0,frames,0,frameSpeed]; 
				};			
				if (indO) {
					char._indData.ref = true;
					char._indData.x = xi;
					char._indData.x = yi;
				};
				if (indF) {
					char._indData.ref = true;
					char._indData.fontSize = fs;
				};
				if (indB) {
					char._indData.ref = true;
					char._indData.blendMode = blendMode;
				};
				if (indRot) {
					char._indData.rotation = [true,rots];
				};
				if (indShake) {
					char._indData.shake = [true,shake,0,0,0];	
				};
				if (indZoom) {
					char._indData.zoomE = [true,zoom,0];	
				};
				if (indFloat) {
					char._indData.aniMode = 1;	
				};			
				if (indSlide) {
					char._indData.aniMode = 2;	
				};				
				if (indText) {
					char._indData.ref = true;
					char._indData.text = String(text);
					char._indData.mode = String(text) === "VariableMode" ? 2 : 1;
					char._indData.id = id;
				};			
				if (indClear) {
				    char.clearIndicators();
					char._indData.ref = true;
				};		
		};
	};

	//==============================
	// * check Indicator Comments
	//==============================
	Game_Event.prototype.checkIndicatorComments = function() {
	 	var needClear = true;
	 	var needClear2 = false;
		if (!this._erased && this.page()) {this.list().forEach(function(l) {
		       if (l.code === 108) {var comment = l.parameters[0].split(' : ')
			           if (!this._indData.force) {
			           	   if (comment[0].toLowerCase() == "indicator_target" && comment[1] == "player")
			           	   {
							   needClear2 = true;
			           	   } 	
						   if (comment[0].toLowerCase() == "indicator"){
							   this.setIndicators(comment[1],0,false,0,0,"",0,false,0,0,false,comment[2],comment[3]);
							   needClear = false;
						   };
						   if (comment[0].toLowerCase() == "text_indicator"){
							   this._indData.ref = true;
							   this._indData.text = String(comment[1]);
							   this._indData.mode = 1;
							   this._indData.id = 0;
						   };					   
						   if (comment[0].toLowerCase() == "variable_indicator"){
							   this._indData.ref = true;
							   this._indData.text = "";
							   this._indData.mode = 2;
							   this._indData.id = Number(comment[1]);	   
						   };							   
						   if (comment[0].toLowerCase() == "range_indicator"){
							   this._indData.ref = true;
							   this._indData.range = true;
							   this._indData.rangeD = Number(comment[1]);	   
						   };
						   if (comment[0].toLowerCase() == "animated_indicator"){
							   this._indData.ref = true;
							   this._indData.animated = true;
							   this._indData.frames = [0,Number(comment[1]),0,Number(comment[2])];   
						   };
						   if (comment[0].toLowerCase() == "xyoffset_indicator"){
							   this._indData.x = Number(comment[1]);
							   this._indData.y = Number(comment[2]);
						   };				   		   
						   if (comment[0].toLowerCase() == "fontsize_indicator"){
							   this._indData.ref = true;
							   this._indData.fontSize = Number(comment[1]);
						   };
						   if (comment[0].toLowerCase() == "blendmode_indicator"){
							   this._indData.ref = true;
							   this._indData.blendMode = Number(comment[1]);
						   };	
						   if (comment[0].toLowerCase() == "rotation_indicator"){
							   this._indData.rotation = [true,Number(comment[1])]
						   };
						   if (comment[0].toLowerCase() == "shake_indicator"){
							   this._indData.shake = [true,Number(comment[1]),0,0,0];
						   };
						   if (comment[0].toLowerCase() == "pulse_indicator"){
							   this._indData.zoomE = [true,Number(comment[1]),0];
						   };
						   if (comment[0].toLowerCase() == "float_indicator"){
							   this._indData.aniMode = 1;
						   };
						   if (comment[0].toLowerCase() == "slide_indicator"){
							   this._indData.aniMode = 2;
						   };					   					   
						   if (comment[0].toLowerCase() == "clear_indicator"){
							   this.clearIndicators();
							   this._indData.ref = true;
						   };
			           };
				   };
		}, this);};
		if (needClear) {this.clearIndicators();this._indData.ref = true};
		if(needClear2) {this.clearIndicators();this._indData.ref = true};
	};

	var _Game_Event_setupPage = Game_Event.prototype.setupPage;
	Game_Event.prototype.setupPage = function() 
	{
		_Game_Event_setupPage.call(this);
	    $gamePlayer.checkIndicatorComments(true);
	};

	var _Game_Player_increaseSteps = Game_Player.prototype.increaseSteps;
	Game_Player.prototype.increaseSteps = function() 
	{
		_Game_Player_increaseSteps.call(this);
		this.checkIndicatorComments();
	}

	var _Game_Player_locate = Game_Player.prototype.locate;
	Game_Player.prototype.locate = function(x, y) 
	{
		_Game_Player_locate.call(this, x, y);
		this.checkIndicatorComments();
	}

	Game_Player.prototype.checkIndicatorComments = function(clear) 
	{
		if(clear)
		{
			this.clearIndicators();
			this._indData.ref = true;
			this._lastIndicatorEvent = null;
		}
		var events = $gameMap.events().filter(function(e){
			var flag = false;
			var flag2 = false;
			if(!e._erased && e.page())
			{
				e.list().forEach(function(l) {
					if(l.code == 108)
					{
						var comment = l.parameters[0].split(' : ');
						if (!e._indData.force) 
						{
							if(comment[0].toLowerCase() == "indicator_target" && comment[1] == "player")
							{
								flag = true;
							}
							if (comment[0].toLowerCase() == "range_indicator")
							{
								var rangeD = Number(comment[1]);
								var playerX = $gamePlayer.x;
								var playerY = $gamePlayer.y;
								if(Math.abs(playerX - e.x) + Math.abs(playerY - e.y) <= rangeD)
								{
									flag2 = true;
								}
							}
						}
					}
				});
			}
			return flag && flag2;
		});

		if(events && events.length > 0)
		{
			var res = events[0];
			if(this._lastIndicatorEvent != res)
			{
				this._lastIndicatorEvent = res;
				res.list().forEach(function(l) {
					if(l.code == 108)
					{
						var comment = l.parameters[0].split(' : ');
						if(!res._indData.force)
						{
							if (comment[0].toLowerCase() == "indicator")
							{
								this.setIndicators(comment[1],0,false,0,0,"",0,false,0,0,false,comment[2],comment[3]);
								//needClear = false;
							};
							if (comment[0].toLowerCase() == "text_indicator")
							{
								this._indData.ref = true;
								this._indData.text = String(comment[1]);
								this._indData.mode = 1;
								this._indData.id = 0;
							};
							if (comment[0].toLowerCase() == "variable_indicator")
							{
								this._indData.ref = true;
								this._indData.text = "";
								this._indData.mode = 2;
								this._indData.id = Number(comment[1]);
							};
							if (comment[0].toLowerCase() == "range_indicator")
							{
								this._indData.ref = true;
								this._indData.range = true;
								this._indData.rangeD = Number(comment[1]);
							};
							if (comment[0].toLowerCase() == "animated_indicator")
							{
								this._indData.ref = true;
								this._indData.animated = true;
								this._indData.frames = [0,Number(comment[1]),0,Number(comment[2])];
							};
							if (comment[0].toLowerCase() == "xyoffset_indicator")
							{
								this._indData.x = Number(comment[1]);
								this._indData.y = Number(comment[2]);
							};
							if (comment[0].toLowerCase() == "fontsize_indicator")
							{
								this._indData.ref = true;
								this._indData.fontSize = Number(comment[1]);
							};
							if (comment[0].toLowerCase() == "blendmode_indicator")
							{
								this._indData.ref = true;
								this._indData.blendMode = Number(comment[1]);
							};
							if (comment[0].toLowerCase() == "rotation_indicator")
							{
								this._indData.rotation = [true,Number(comment[1])]
							};
							if (comment[0].toLowerCase() == "shake_indicator")
							{
								this._indData.shake = [true,Number(comment[1]),0,0,0];
							};
							if (comment[0].toLowerCase() == "pulse_indicator")
							{
								this._indData.zoomE = [true,Number(comment[1]),0];
							};
							if (comment[0].toLowerCase() == "float_indicator")
							{
								this._indData.aniMode = 1;
							};
							if (comment[0].toLowerCase() == "slide_indicator")
							{
								this._indData.aniMode = 2;
							};
							if (comment[0].toLowerCase() == "clear_indicator")
							{
								this.clearIndicators();
								this._indData.ref = true;
								this._lastIndicatorEvent = null;
							};
						}
					}
				}.bind(this));
			}
		}
		// else
		// {
		// 	this.clearIndicators();
		// 	this._indData.ref = true;
		// 	this._lastIndicatorEvent = null;
		// }
	}

	//==============================
	// * Sensor D
	//==============================
	EventIndicators.prototype.sensorD = function() 
	{
		if(this.character() instanceof Game_Player && $gamePlayer._lastIndicatorEvent)
		{
			return Math.abs($gamePlayer.x - $gamePlayer._lastIndicatorEvent.x) + Math.abs($gamePlayer.y - $gamePlayer._lastIndicatorEvent.y);
		}
		return Math.abs($gamePlayer.x - this.character().x) + Math.abs($gamePlayer.y - this.character().y);
	};

	//==============================
	// * update Visible Range
	//==============================
	EventIndicators.prototype.updateVisibleRange = function() 
	{
		if (this.sensorD() <= this.data().rangeD) 
		{
			this.opacity += fadeDuration;
			//this.opacity += 7;
			//this.opacity = 255;
		}
		else
		{
			this.opacity -= fadeDuration;
			//this.opacity -= 7;
			//this.opacity = 0;
		};
	};

	//==============================
	// * create Event Indicators
	//==============================
	Spriteset_Map.prototype.createEventIndicators = function()
	{
		this._indicatorsField = new Sprite();
		//this._baseSprite.addChild(this._indicatorsField);
		//提高画面显示优先级
		this.addChild(this._indicatorsField);
		this._eventIndicators = [];
		for (var i = 0; i < this._characterSprites.length; i++) 
		{
		     this._eventIndicators[i] = new EventIndicators(this._characterSprites[i]);
			 this._indicatorsField.addChild(this._eventIndicators[i]);
	    };
	};
})();