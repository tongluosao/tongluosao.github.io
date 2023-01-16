//=============================================================================
// MessageCustom.js
//=============================================================================

/*:
 * @plugindesc 自定义消息窗口
 * @author 冷血
 *
 *
 * 插件参数：
 *
 *   @param roleImageWidth
 * 	 @desc 立绘图片的宽度
 * 	 @default 402
 *
 *   @param roleImageHeight
 * 	 @desc 立绘图片的高度
 * 	 @default 460
 *
 *   @param roleImagePadding1
 *   @desc 立绘图片距离窗口边缘距离
 * 	 @default 10
 *
 *   @param messageLineHeight
 *   @desc 消息窗口行高
 * 	 @default 36
 *
 *   @param choiceBackMaskOpacity
 *   @desc 选项背景遮罩的透明度(0-255)
 * 	 @default 100
 *
 *   @param roleAppearDuration
 *   @desc 角色登场时间,单位帧
 * 	 @default 60
 *
 *   @param roleAppearDistance
 *   @desc 角色登场滑动距离
 * 	 @default 30
 *
 *   @param roleBright
 *   @desc 未说话的角色明度,1为不变，1以下变暗，以上变亮
 * 	 @default 0.4
 *
 *   @param backgroundType
 *   @desc 窗口背景类型，0：窗口，1：暗淡，2：透明
 * 	 @default 2
 *
 *   @param choicePositionType
 *   @desc 选项窗口位置，0：左侧，1：中间，2：右侧
 * 	 @default 1
 *
 * @help
 *
 * 文本代码：
 *	 \tc                   # 文本居中显示
 *
 * 插件命令：
 *   MessageCustom TextCenter ON         	 # 对话框文字居中开启
 *   MessageCustom TextCenter OFF         	 # 对话框文字居中关闭
 *   MessageCustom LeftRole Appear     	 	 # 消息窗口左边的角色登场，可在后面指定镜像翻转,写true则翻转,false不翻转
 *   MessageCustom LeftRole Adjustbright     # 消息窗口左边的角色亮度调整, 可在后面追加亮度值(默认1，1以下变暗，以上变亮)
 *   MessageCustom LeftRole Exit     	 	 # 消息窗口左边的角色退出
 *   MessageCustom RightRole Appear     	 # 消息窗口右边的角色登场，可在后面指定镜像翻转,写true则翻转,false不翻转
 *   MessageCustom RightRole Adjustbright    # 消息窗口右边的角色亮度调整, 可在后面追加亮度值(默认1，1以下变暗，以上变亮)
 *   MessageCustom RightRole Exit     	 	 # 消息窗口右边的角色退出
 *   MessageCustom SwitchRole     			 # 切换说话的角色,写left为左侧角色，right为右侧
 *   MessageCustom RegistRole     	 		 # 可在后面追加文件名如Demo1，摆放位置left或right, 指定镜像翻转,写true则翻转,false不翻转
 */
(function() {
	var parameters = PluginManager.parameters('MessageCustom');
	var roleImageWidth = parseInt(parameters['roleImageWidth']);
	var roleImageHeight = parseInt(parameters['roleImageHeight']);
	var roleImagePadding1 = parseInt(parameters['roleImagePadding1']);
	var messageLineHeight = parseInt(parameters['messageLineHeight']);
	var choiceBackMaskOpacity = parseInt(parameters['choiceBackMaskOpacity']);
	var roleAppearDuration = parseInt(parameters['roleAppearDuration']);
	var roleAppearDistance = parseInt(parameters['roleAppearDistance']);
	var roleBright = parameters['roleBright'];
	var backgroundType = parseInt(parameters['backgroundType']);
	var choicePositionType = parseInt(parameters['choicePositionType']);

 	var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args)
    {
    	_Game_Interpreter_pluginCommand.call(this, command, args);
    	if (command === 'MessageCustom')
    	{
    		switch (args[0]) 
    		{
    			case 'TextCenter':
    				if(args[1] === 'ON')
    				{
    					$gameMessage.setTextCenter(true);
    				}
					if(args[1] === 'OFF')
    				{
    					$gameMessage.setTextCenter(false);
    				}
    				break;
    			case 'LeftRole':
    				if(args[1] === 'Appear')
    				{
    					var mirror = false;
    					if(args[2] && args[2] == 'true') mirror = true;
    					SceneManager._scene._spriteset._leftBustSprite.roleAppear(mirror);
    				}
    				if(args[1] === 'Adjustbright')
    				{
    					SceneManager._scene._spriteset._leftBustSprite.roleAdjustbright(args[2]);
    				}
    				if(args[1] === 'Exit')
    				{
    					SceneManager._scene._spriteset._leftBustSprite.roleExit();
    				}
    				break;
    			case 'RightRole':
    				if(args[1] === 'Appear')
    				{
    					var mirror = false;
    					if(args[2] && args[2] == 'true') mirror = true;
    					SceneManager._scene._spriteset._rightBustSprite.roleAppear(mirror);
    				}
    				if(args[1] === 'Adjustbright')
    				{
    					SceneManager._scene._spriteset._rightBustSprite.roleAdjustbright(args[2]);
    				}
    				if(args[1] === 'Exit')
    				{
    					SceneManager._scene._spriteset._rightBustSprite.roleExit();
    				}
    				break;
    			case 'SwitchRole':
    				var direction = args[1];
    				var bustTarget = SceneManager._scene._spriteset._leftBustSprite;
    				if(direction == 'right')
    				{
    					bustTarget = SceneManager._scene._spriteset._rightBustSprite;
    				}
    				$gameMessage.setBustTarget(bustTarget);
    				break;
    			case 'RegistRole':
    				var pic = args[1];
    				var bustSprite = null;
    				var mirror = false;
    				if(args[3] && args[3] == 'true') mirror = true;
    				if(args[2] == 'left')
    				{
    					bustSprite = SceneManager._scene._spriteset._leftBustSprite;
    				}
    				else
    				{
    					bustSprite = SceneManager._scene._spriteset._rightBustSprite;
    				}
    				if(bustSprite)
    				{
    					bustSprite.setShowPic(pic, mirror);
    				}
    				break;
    		}
    	}
    }		

	Game_Message.prototype.background = function() 
	{
	    return backgroundType;
	};

	Game_Message.prototype.choicePositionType = function() 
	{
	    return choicePositionType;
	};

	Game_Message.prototype.waitRoleEffect = function(roleEffect)
	{
		this._waitRoleEffect = roleEffect;
	}

	Game_Message.prototype.isRoleEffecting = function(roleEffect)
	{
		return this._waitRoleEffect;
	}

	Game_Message.prototype.setBustTarget = function(bustTarget)
	{
		if(this._bustTarget)
		{
			this._bustTarget.roleAdjustbright(roleBright);
		}
		this._bustTarget = bustTarget;
		if(this._bustTarget)
		{
			this._bustTarget.roleAdjustbright(1);
		}
		// if(this._bustTarget != bustTarget)
		// {
		// 	this._bustTarget = bustTarget;
		// 	if(this._bustTarget)
		// 	{
		// 		this._bustTarget.roleAdjustbright(1);
		// 	}
		// }
	}

	var _Game_Message_clear = Game_Message.prototype.clear;
	Game_Message.prototype.clear = function()
	{
		_Game_Message_clear.call(this);
		//this._textCenter = false;
		this._lineIndex = 0;
	}

	Game_Message.prototype.setTextCenter = function(center) 
	{
		this._textCenter = center;
	}

	Game_Message.prototype.isTextCenterOn = function()
	{
		return this._textCenter;
	}

	Game_Message.prototype.getCurrentLineText = function()
	{
		return this._texts[this._lineIndex];
	}

	Game_Message.prototype.nextLine = function()
	{
		this._lineIndex++;
	}

	var _Spriteset_Base_createUpperLayer = Spriteset_Base.prototype.createUpperLayer;
	Spriteset_Base.prototype.createUpperLayer = function() 
	{
		_Spriteset_Base_createUpperLayer.call(this);
	};

	var _Spriteset_Base_update = Spriteset_Base.prototype.update;
	Spriteset_Base.prototype.update = function() 
	{
		_Spriteset_Base_update.call(this);
		this._choiceBackMask.visible = $gameMessage.isChoice();
	};

	Spriteset_Base.prototype.createBusts = function()
	{
		//创建一个选择窗口背景遮罩
		this._choiceBackMask = new Sprite();
		this._choiceBackMask.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
		this._choiceBackMask.bitmap.fillAll('#000000');
		this._choiceBackMask.opacity = choiceBackMaskOpacity;
		this._choiceBackMask.visible = false;
		this.addChild(this._choiceBackMask);
		// Create bust image
		if (this._leftBustSprite) return;
		this._leftBustSprite = new Sprite_GalvBust();
		this._leftBustSprite.setShowPos(0);
		this._rightBustSprite = new Sprite_GalvBust();
		this._rightBustSprite.setShowPos(1);
		this.addChild(this._leftBustSprite);
		this.addChild(this._rightBustSprite);
		//$gameMessage.setBustTarget(this._leftBustSprite);
	};

	var _Sprite_GalvBust_initialize = Sprite_GalvBust.prototype.initialize;
	Sprite_GalvBust.prototype.initialize = function() 
	{
		_Sprite_GalvBust_initialize.call(this);
		this._adjustFilter = new PIXI.filters.ColorMatrixFilter();
		this.filters = [this._adjustFilter];
		this._bustMirror = false;
		this._appearFlag = false;
		this._exitFlag = true;
		this._bright = 1;
	};

	Sprite_GalvBust.prototype.setShowPic = function(pic, mirror)
	{
		if(this._showPic != pic) this._appearFlag = false;
		this._showPic = pic;
		this._bustMirror = (mirror == true || mirror == false) ? mirror : false;
	}

	Sprite_GalvBust.prototype.setShowPos = function(showPos)
	{
		this._showPos = showPos;		//0或1，0显示在左边，1显示在右边
	}

	Sprite_GalvBust.prototype.roleAppear = function(mirror)
	{
		if(this._showPic == $gameMessage.faceName() && this._appearFlag) return;
		//if(this._showPic == $gameMessage.faceName()) return;
		//if(!this._exitFlag) return;
		this._appearFlag = true;
		this._exitFlag = false;
		$gameMessage.waitRoleEffect(true);
		this._bustMirror = (mirror == true || mirror == false) ? mirror : false;
	    //设置图片镜像
		if (this._bustMirror)
		{
			this.scale.x = -1;
			var offset = this.bitmap.width;
		} 
		else 
		{
			this.scale.x = 1;
			var offset = 0;
		};
		//以下是设置图片的x坐标
 		//未开启镜像时,减去图片的偏移值
		var offset = 0;
		if(this._bustMirror)
		{
			offset = roleImageWidth;
		}

		//固定精灵的x坐标为立绘与窗口边缘的距离。
		if (this._showPos == 1) 
		{
			this.x = Graphics.boxWidth - roleImageWidth - roleImagePadding1 + offset;
		}
		else
		{
			this.x = roleImagePadding1 + offset;
		}

		this._roleAppear = true;
		this._roleAppearDuration = roleAppearDuration;
		this._roleAppearEndX = this.x;
		this.x = this._showPos == 1 ? this.x + roleAppearDistance : this.x - roleAppearDistance;
		this.opacity = 0;
	}

	Sprite_GalvBust.prototype.roleAdjustbright = function(light)
	{
		this._bright = light || 1;
		this._adjustFilter.brightness(this._bright);
	}

	Sprite_GalvBust.prototype.roleExit = function()
	{
		if(this._exitFlag) return;
		this._appearFlag = false;
		this._showPic = null;
		this.name = null;
		this._exitFlag = true;
		$gameMessage.waitRoleEffect(true);
		this._roleExit = true;
		this._roleExitDuration = roleAppearDuration;
		this._roleExitEndX = this._showPos == 1 ? this.x + roleAppearDistance : this.x - roleAppearDistance;
		this.opacity = 255;
	}

	Sprite_GalvBust.prototype.controlBitmap = function()
	{
		//载入图片
		if ($gameMessage.faceName() && this._showPic == $gameMessage.faceName() && this.name !== $gameMessage.faceName() + "_" + ($gameMessage.faceIndex() + 1)) 
		{
    		this.loadBitmap();  // If image changed, reload bitmap

    		//窗口未开启返回
			if (Galv.MB.msgWindow.openness <= 0 || !this.hasBust || $gameSystem.bustDisable) 
			{
				this.opacity = 0;
				this.name = "";
				this.hasBust = false;
				return;
			};

			//以下设置图片的y坐标
			// Control image position
			switch (Galv.MB.msgWindow.tempPosType) 
			{
			case 0:
				this.y = this.baseY();
				break;
			case 1:
			//top and middle
				this.y =  this.baseY() - Galv.MB.msgWindow.y;
				break;
			case 2:
			//bottom
				this.y = this.baseY();
				// if (Galv.MB.prio == 1)
				// {
				// 	this.y = Galv.MB.msgWindow.height - this.bitmap.height;
				// } 
				// else if (Galv.MB.pos === 1) 
				// {
				// 	this.y = this.baseY();
				// } 
				// else 
				// {
				// 	this.y = this.baseY() - Galv.MB.msgWindow.height;
				// };
				break;
			};

			this.roleAppear(this._bustMirror);
		};

		if($gameMessage.faceName())
		{
			if(this._showPic != $gameMessage.faceName())
			{
				if(this._bright == 1) this.roleAdjustbright(0.4);
			}
			else
			{
				if(this._bright < 1) this.roleAdjustbright(1);
			}
		}

		if(this._roleAppear)
		{
		    if (this._roleAppearDuration > 0) 
		    {
		        var d = this._roleAppearDuration;
		        this.opacity = (this.opacity * (d - 1) + 255) / d;
		        this.x = (this.x * (d - 1) + this._roleAppearEndX) / d;
		        this._roleAppearDuration--;
		    }
		    else
		    {
		    	this._roleAppear = false;
		    	$gameMessage.waitRoleEffect(false);
		    }
		}

		if(this._roleExit)
		{
		    if (this._roleExitDuration > 0) 
		    {
		        var d = this._roleExitDuration;
		        this.opacity = (this.opacity * (d - 1) + 0) / d;
		        this.x = (this.x * (d - 1) + this._roleExitEndX) / d;
		        this._roleExitDuration--;
		    }
		    else
		    {
		    	this._roleExit = false;
		    	$gameMessage.waitRoleEffect(false);
		    	//this.roleAdjustbright(1);
		    }
		}
		
		//this.opacity = $gameMessage.faceName() ? Galv.MB.msgWindow._openness : this.opacity - 32;
	}

	
	// var _Window_Message_initialize = Window_Message.prototype.initialize;
	// Window_Message.prototype.initialize = function() 
	// {
	// 	_Window_Message_initialize.call(this);
	// 	var width = this.windowWidth();
	// 	this.x = eval(messageX);
	// 	this.y = messageY;
	// }

	Window_Base.prototype.convertEscapeCharacters = function(text) 
	{
		text = this.setWordWrap(text);
		var tempText = text.replace(/\\TC/gi, '');
		if(tempText != text)
		{
			text = tempText;
			$gameMessage.setTextCenter(true);
		}
	    text = Yanfly.Message.Window_Base_convertEscapeCharacters.call(this, text);
	    text = this.convertExtraEscapeCharacters(text);
	    return text;
	};

	var _Window_Message_update = Window_Message.prototype.update;
	Window_Message.prototype.update = function() 
	{
		//未显示立绘的情况下，窗口可以有更多的空间显示文字
		// var leftBustSprite = SceneManager._scene._spriteset._leftBustSprite;
		// var rightBustSprite = SceneManager._scene._spriteset._rightBustSprite;
		// if(leftBustSprite._exitFlag && rightBustSprite._exitFlag)
		// {
		// 	if(this.width != Graphics.boxWidth) 
		// 	{
		// 		this.width = Graphics.boxWidth;
		// 		this.x = (Graphics.boxWidth - this.width) / 2;
		// 		this.createContents();
		// 	}
		// }
		// else
		// {
		// 	if(this.width != this.windowWidth())
		// 	{
		// 		this.width = this.windowWidth();
		// 		this.x = (Graphics.boxWidth - this.width) / 2;
		// 		this.createContents();
		// 	} 
		// }

		_Window_Message_update.call(this);
	}

	Window_Message.prototype.updateInput = function() 
	{

	    if (this.isAnySubWindowActive()) 
	    {
	        return true;
	    }
	    if (this.pause)
	    {
	        if (this.isTriggered() && !$gameMessage.isRoleEffecting()) 
	        {
	            Input.update();
	            this.pause = false;
	            if (!this._textState) 
	            {
	                this.terminateMessage();
	            }
	        }
	        return true;
	    }
	    return false;
	}

	// Window_Message.prototype.windowWidth = function()
	// {
	//     return Graphics.boxWidth - (roleImageWidth + roleImagePadding1 + roleImagePadding2) * 2;
	// };

	Window_Message.prototype.standardPadding = function() 
	{
    	return 0;
	};

	Window_Message.prototype.lineHeight = function() 
	{
	    return messageLineHeight || 36;
	};

	var _Window_Message_processNewLine = Window_Message.prototype.processNewLine;
	Window_Message.prototype.processNewLine = function(textState) 
	{
		_Window_Message_processNewLine.call(this, textState);
		$gameMessage.nextLine();
	};

	var _Window_Message_startMessage = Window_Message.prototype.startMessage;
	Window_Message.prototype.startMessage = function() 
	{
		_Window_Message_startMessage.call(this);
		//计算字体大小，让字体居中左对齐显示
		var lineW = 0;
		var textArr = this._textState.text.split('\n');
		for(var i = 0;i < textArr.length;i++)
		{
			var text = textArr[i];
			text = text.replace(/\x1b[A-Za-z]+\[(\d+)\]/gi, '');
			text = text.replace(/\x1b[\\$\\.\\|!><\\^]/gi, '');
			var w = 0;
			for(var j = 0;j < text.length;j++)
			{
				if(text[j] == '\x1b')
				{
					j++;
					if(text[j] == '{')
					{
						this.makeFontBigger();
					}
					if(text[j] == '}')
					{
						this.makeFontSmaller();
					}
				}
				else
				{
					w += this.textWidth(text[j]);
				}
			}
			lineW = lineW < w ? w : lineW;
		}
		this._centerOffestX = (this.width - lineW) / 2;
	};

	Window_Message.prototype.processNormalCharacter = function(textState) 
	{
		//var centerOffestX = 0;//居中偏移值
		//计算字体大小，让字体居中对齐显示
		if($gameMessage.isTextCenterOn())
		{
			var textArr = textState.text.split('\n');
			var text = textArr[$gameMessage._lineIndex];
			text = text.replace(/\x1b[A-Za-z]+\[(\d+)\]/gi, '');
			text = text.replace(/\x1b[{\\$\\.\\|!><\\^]/gi, '');
			var lineW = this.textWidth(text);
			this._centerOffestX = (this.width - lineW) / 2;
		}
		console.log(this._centerOffestX);
	    var c = textState.text[textState.index++];
	    var w = this.textWidth(c);
	    this.contents.drawText(c, textState.x + this._centerOffestX, textState.y, w * 2, textState.height);
	    textState.x += w;
	};

	var _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
	Window_Message.prototype.terminateMessage = function()
	{
		_Window_Message_terminateMessage.call(this);
		$gameMessage.setTextCenter(false);
	};

	var _Window_ChoiceList_initialize = Window_ChoiceList.prototype.initialize;
	Window_ChoiceList.prototype.initialize = function(messageWindow) 
	{
		_Window_ChoiceList_initialize.call(this, messageWindow);
	};

	Window_ChoiceList.prototype.processNormalCharacter = function(textState) 
	{
		var leftOffestX = 5;//向左偏移值
		var text = textState.text;
		text = text.replace(/\x1b[A-Za-z]+\[(\d+)\]/gi, '');
		text = text.replace(/\x1b[{\\$\\.\\|!><\\^]/gi, '');
		var centerOffestX = (this.contentsWidth() - this.textWidth(text)) / 2 - leftOffestX;
		console.log(centerOffestX);
	    var c = textState.text[textState.index++];
	    var w = this.textWidth(c);
	    this.contents.drawText(c, textState.x + centerOffestX, textState.y, w * 2, textState.height);
	    textState.x += w;
	};
})();