//=============================================================================
// MessageCustom2.js
//=============================================================================

/*:
 * @plugindesc 自定义消息窗口优化
 *   Update : 2021-10-09T17:00:00+0800
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
 *   @param backgroundType
 *   @desc 窗口背景类型，0：窗口，1：暗淡，2：透明
 * 	 @default 2
 *
 *   @param choicePositionType
 *   @desc 选项窗口位置，0：左侧，1：中间，2：右侧
 * 	 @default 1
 *
 *   @param textWidth
 * 	 @desc 有立绘时文本框宽度
 * 	 @default 700
 *
 *   @param textWidth2
 * 	 @desc 无立绘时文本框宽度
 * 	 @default 700
 *
 *   @param textAreaOffestX
 * 	 @desc 文本框X轴偏移量
 * 	 @default 0
 *
 *   @param nameSpace
 * 	 @desc 名字和正文之间的空格数
 * 	 @default 2
 *
 * @help
 *
 * 文本代码：
 *	 \tc                   # 文本居中显示
 * 
 * 
 * Mikan (2021-10-09T17:00:00+0800)
 *   调整角色名的识别
 */
(function() {
	var parameters = PluginManager.parameters('MessageCustom2');
	var roleImageWidth = parseInt(parameters['roleImageWidth']);
	var roleImageHeight = parseInt(parameters['roleImageHeight']);
	var roleImagePadding1 = parseInt(parameters['roleImagePadding1']);
	var messageLineHeight = parseInt(parameters['messageLineHeight']);
	var choiceBackMaskOpacity = parseInt(parameters['choiceBackMaskOpacity']);
	var backgroundType = parseInt(parameters['backgroundType']);
	var choicePositionType = parseInt(parameters['choicePositionType']);
	var textWidth = parseInt(parameters['textWidth']);
	var textWidth2 = parseInt(parameters['textWidth2']);
	var textAreaOffestX = parseInt(parameters['textAreaOffestX']);
	var nameSpace = parseInt(parameters['nameSpace']);

	//const roleNameReg = '^.*?\\x1bC\\[\\d+\\]([^\\x1b]+)\\x1bC\\[\\d+\\](\\s*)';
	const roleNameReg = (function() {
		const ocSymbol = '\\x1boc\\[\\d+\\]';
		const cSymbol = '\\x1bC\\[\\d+\\]';
		const format = '^(' + ocSymbol + ')?' + cSymbol + '([^\\x1b]+)' + cSymbol + '(\\s*)';
		return format;
	})();
	//  /^(\x1boc\[\d+\])?\x1bC\[\d+\]([^\x1b]+)\x1bC\[\d+\](\s*)/i

	const roleNameRegOptions = 'i';
	
	const roleNameReg_nameIndex1 = 2;
	const roleNameReg_nameIndex2 = 3;

	Game_Message.prototype.background = function() 
	{
	    return backgroundType;
	};

	Game_Message.prototype.choicePositionType = function() 
	{
	    return choicePositionType;
	};

	Game_Message.prototype.setTextCenter = function(center) 
	{
		this._textCenter = center;
	}

	Game_Message.prototype.isTextCenterOn = function()
	{
		return this._textCenter;
	}

	var _Spriteset_Base_update = Spriteset_Base.prototype.update;
	Spriteset_Base.prototype.update = function() 
	{
		_Spriteset_Base_update.call(this);
		this._choiceBackMask.visible = $gameMessage.isChoice();
	};

	var _Spriteset_Base_createUpperLayer = Spriteset_Base.prototype.createUpperLayer;
	Spriteset_Base.prototype.createUpperLayer = function() 
	{
		this.createChoiceBackMask();
		_Spriteset_Base_createUpperLayer.call(this);
	};

	//var _Spriteset_Base_createBusts = Spriteset_Base.prototype.createBusts;
	Spriteset_Base.prototype.createChoiceBackMask = function()
	{
		//创建一个选择窗口背景遮罩
		this._choiceBackMask = new Sprite();
		this._choiceBackMask.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
		this._choiceBackMask.bitmap.fillAll('#000000');
		this._choiceBackMask.opacity = choiceBackMaskOpacity;
		this._choiceBackMask.visible = false;
		this.addChild(this._choiceBackMask);
		//_Spriteset_Base_createBusts.call(this);
	};

	Sprite_GalvBust.prototype.controlBitmap = function() 
	{
		if ($gameMessage.faceName() && this.name !== $gameMessage.faceName() + "_" + ($gameMessage.faceIndex() + 1)) 
		{
	    	this.loadBitmap();  // If image changed, reload bitmap
		};
		
		if (Galv.MB.msgWindow.openness <= 0 || !this.hasBust || $gameSystem.bustDisable) 
		{
			this.opacity = 0;
			this.name = "";
			this.hasBust = false;
			return;
		};

		if ($gameSystem.bustMirror) 
		{
			this.scale.x = -1;
			var offset = this.bitmap.width;
		} 
		else 
		{
			this.scale.x = 1;
			var offset = 0;
		};

		this.opacity = $gameMessage.faceName() ? Galv.MB.msgWindow._openness : this.opacity - 32;
		
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
			if (Galv.MB.prio == 1) 
			{
				this.y = Galv.MB.msgWindow.height - this.bitmap.height;
			} 
			else if (Galv.MB.pos === 1) 
			{
				this.y = this.baseY();
			} 
			else 
			{
				this.y = this.baseY() - Galv.MB.msgWindow.height;
			};
			break;
		};
		
		if ($gameSystem.bustPos == 1) 
		{
			// if on the right
			if (Galv.MB.prio == 1) 
			{
				this.x = Galv.MB.msgWindow.width - this.bitmap.width + offset - roleImagePadding1;
			} 
			else 
			{
				this.x = Galv.MB.msgWindow.x + Galv.MB.msgWindow.width - this.bitmap.width + offset - roleImagePadding1;
			};
		} 
		else 
		{
			// else on the left
			if (Galv.MB.prio == 1) 
			{
				this.x = 0 + offset + roleImagePadding1;
			} 
			else 
			{
				this.x = Galv.MB.msgWindow.x + offset + roleImagePadding1;
			};
		};
	};

	var _Window_Base_wordwrapWidth = Window_Base.prototype.wordwrapWidth;
	Window_Base.prototype.wordwrapWidth = function()
	{
	  //return $gameMessage.faceName() ? textWidth : _Window_Base_wordwrapWidth.call(this);
	  return $gameMessage.faceName() ? textWidth : textWidth2;
	};

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

	var _Window_Message_newPage = Window_Message.prototype.newPage;
	Window_Message.prototype.newPage = function(textState) 
	{
		_Window_Message_newPage.call(this, textState);
		//若该文本存在人名则在换页时追加
		if(this._roleName && this._roleName != "")
		{
			var t1 = textState.text.slice(0, textState.index);
			var t2 = textState.text.slice(textState.index);
			//console.log(t1);
			//console.log(t2);
			textState.text = t1 + this._roleName + t2;
			this._textOffestX = 0;
			this._roleNameEnd = t1.length + this._roleName.length;
			//计算正文的偏移量
			if(this._roleName && this._textOffestX == 0)
			{
				//var reg = /\x1bC\[\d+\](.+)\x1bC\[\d+\](\s*)/gi;
				//var reg = /^\x1bC\[\d+\]([^\x1bC\[\d+\]]+)\x1bC\[\d+\](\s*)/gi;
				//var reg = /^\x1bC\[\d+\]([^\x1b]+)\x1bC\[\d+\](\s*)/gi;
				//var reg = /\x1bC\[\d+\]([^\x1b]+)\x1bC\[\d+\](\s*)/i;
				var reg = new RegExp(roleNameReg, roleNameRegOptions);
				var res = reg.exec(this._roleName);
				//var nametext = res[1] + res[2];
				var nametext = res[roleNameReg_nameIndex1] + res[roleNameReg_nameIndex2];
				this._textOffestX = -this.textWidth(nametext);
			}
		}
	}

	Window_Message.prototype.standardPadding = function() 
	{
    	return 0;
	};

	Window_Message.prototype.lineHeight = function() 
	{
	    return messageLineHeight || 36;
	};

	var _Window_Message_startMessage = Window_Message.prototype.startMessage;
	Window_Message.prototype.startMessage = function() 
	{
		_Window_Message_startMessage.call(this);
		//提取角色名字
		var text = this._textState.text;
		//var reg = /^\x1bC\[\d+\]([^\x1bC\[\d+\]]+)\x1bC\[\d+\](\s*)/gi;
		//var reg = /^\x1bC\[\d+\]([^\x1b]+)\x1bC\[\d+\](\s*)/gi;
		//var reg = /\x1bC\[\d+\]([^\x1b]+)\x1bC\[\d+\](\s*)/i;
		var reg = new RegExp(roleNameReg, roleNameRegOptions);
		var name = reg.exec(text);
		this._roleName = "";
		this._roleNameEnd = -1;
		if(name && name[0])
		{
			this._roleName = name[0];
			//console.log('_roleNameEnd: ' + this._textState.text[this._roleNameEnd]);
			for(var i = 0;i < nameSpace;i++)
			{
				this._roleName += " ";
			}
			this._roleNameEnd = this._roleName.length;
			this._textState.text = this._roleName + this._textState.text.replace(reg, '');
		}
		
		//处理自动换行
		var textState = JSON.parse(JSON.stringify(this._textState));
		textState.text = textState.text.replace(reg, '');
		var tempText = "";
		while (textState.index < textState.text.length)
		{
			var c = textState.text[textState.index];
			tempText += c;
			textState.x += this.textWidth(c);
			if (this.checkWordWrap(textState)) 
			{
				tempText += '\n';
			}
			textState.index++;
		}
		//textState.text = this._roleName != "" ? this._roleName + tempText : tempText;
		textState.text = tempText;


		//计算字体大小，让字体居中对齐显示
		this._lineIndex = 0;
		this._centerOffestX = [];
		var textArr = textState.text.split('\n');
		for(var i = 0;i < textArr.length;i++)
		{
			var text = textArr[i];
			text = text.replace(/\x1b[A-Za-z]+\[(\d+)\]/gi, '');
			text = text.replace(/\x1b[{\\$\\.\\|!><\\^]/gi, '');
			var lineW = this.textWidth(text);
			this._centerOffestX.push((this.width - lineW) / 2);
		}
		if(!$gameMessage.isTextCenterOn()) this._centerOffestX = Math.min.apply(Math, this._centerOffestX);
		//正文x轴偏移量，用来处理名字和正文之间的对齐效果
		this._textOffestX = 0;	
		//计算正文的偏移量
		if(this._roleName && this._textOffestX == 0)
		{
			//var reg = /\x1bC\[\d+\](.+)\x1bC\[\d+\](\s*)/gi;
			//var reg = /^\x1bC\[\d+\]([^\x1bC\[\d+\]]+)\x1bC\[\d+\](\s*)/gi;
			//var reg = /^\x1bC\[\d+\]([^\x1b]+)\x1bC\[\d+\](\s*)/gi;
			//var reg = /\x1bC\[\d+\]([^\x1b]+)\x1bC\[\d+\](\s*)/i;
			var reg = new RegExp(roleNameReg, roleNameRegOptions);
			var res = reg.exec(this._roleName);
			//var nametext = res[1] + res[2];
			var nametext = res[roleNameReg_nameIndex1] + res[roleNameReg_nameIndex2];
			this._textOffestX = -this.textWidth(nametext);
		}
	};

	var _Window_Message_processNewLine = Window_Message.prototype.processNewLine;
	Window_Message.prototype.processNewLine = function(textState) 
	{
		_Window_Message_processNewLine.call(this, textState);
		this._lineIndex++;
		this._textOffestX = 0;
	};

	Window_Message.prototype.processNormalCharacter = function(textState) 
	{
		if(textState.index >= this._roleNameEnd)
		{
			var temp = JSON.parse(JSON.stringify(this._textState));
			temp.x += this._textOffestX;
			if (this.checkWordWrap(temp)) return this.processNewLine(textState);
		}
		//console.log(this._centerOffestX);
	    var c = textState.text[textState.index++];
	    var w = this.textWidth(c);
	    var centerOffestX = this._centerOffestX instanceof Array ? this._centerOffestX[this._lineIndex] : this._centerOffestX;
	    var drawX = textAreaOffestX + textState.x + centerOffestX + this._textOffestX;
	    this.contents.drawText(c, drawX, textState.y, w * 2, textState.height);
	    textState.x += w;
	};

	var _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
	Window_Message.prototype.terminateMessage = function()
	{
		_Window_Message_terminateMessage.call(this);
		$gameMessage.setTextCenter(false);
		this._lineIndex = 0;
		this._roleName = "";
		this._roleNameEnd = -1;
	};

	Window_ChoiceList.prototype.processNormalCharacter = function(textState) 
	{
		var leftOffestX = 5;//向左偏移值
		var text = textState.text;
		text = text.replace(/\x1b[A-Za-z]+\[(\d+)\]/gi, '');
		text = text.replace(/\x1b[{\\$\\.\\|!><\\^]/gi, '');
		var centerOffestX = (this.contentsWidth() - this.textWidth(text)) / 2 - leftOffestX;
		//console.log(centerOffestX);
	    var c = textState.text[textState.index++];
	    var w = this.textWidth(c);
	    this.contents.drawText(c, textState.x + centerOffestX, textState.y, w * 2, textState.height);
	    textState.x += w;
	};
})();