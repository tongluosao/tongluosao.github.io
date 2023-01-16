//=============================================================================
// ChoiceEx.js
//=============================================================================

/*:
 * @plugindesc 选项功能增强插件
 * @author 冷血
 *
 * @help
 *
 * 文本代码：
 *	 \ex                   # 启用选项功能增强，在任意选项的头部加入即可
 */

(function() {
	var _Game_System_initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function() 
	{
		_Game_System_initialize.call(this);
		this._choiceId = "";
		this._choiceExOn = false;
		this._choiceIndex = -1;
	}

	Game_System.prototype.setChoiceExOn = function(on)
	{
		this._choiceExOn = on;
	}

	Game_System.prototype.isChoiceExOn = function()
	{
		this._choiceExOn = typeof(this._choiceExOn) == "undefined" ? false : this._choiceExOn;
		return this._choiceExOn;
	}

	Game_System.prototype.rememberChoiceIndex = function(choiceIndex)
	{
		this._choiceIndex = choiceIndex;
	}

	Game_System.prototype.getChoiceIndex = function()
	{
		this._choiceIndex = typeof(this._choiceIndex) == "undefined" ? -1 : this._choiceIndex;
		return this._choiceIndex;
	}

	Game_System.prototype.rememberChoice = function(choiceId)
	{
		this._choiceId = typeof(this._choiceId) == "undefined" ? "" : this._choiceId;
		if(choiceId && this._choiceId.indexOf(choiceId) == -1)
		{
			this._choiceId += choiceId + ",";
		}
	}

	Game_System.prototype.isRememberChoice = function(choiceId)
	{
		this._choiceId = typeof(this._choiceId) == "undefined" ? "" : this._choiceId;
		return choiceId && this._choiceId.indexOf(choiceId) != -1;
	}

	var _Game_Message_clear = Game_Message.prototype.clear;
	Game_Message.prototype.clear = function() 
	{
		_Game_Message_clear.call(this);
	}

	Game_Message.prototype.setChoiceTarget = function(tar)
	{
		this._choiceTarget = tar;
	}

	Game_Message.prototype.getChoiceTarget = function()
	{
		return this._choiceTarget;
	}

	Game_Message.prototype.showChoices = function()
	{
		var res = this.choices();
		var choices = [];
		for(var i = 0;i < res.length;i++)
		{
			if(!this.isHideChoice(i))
			{
				choices.push(res[i]);
			}
		}
	    return choices;
	};

	var _Game_Message_setChoices = Game_Message.prototype.setChoices;
	Game_Message.prototype.setChoices = function(choices, defaultType, cancelType) 
	{
		_Game_Message_setChoices.call(this, choices, defaultType, cancelType);
		var reg = /^\\ex/gi;
		if(choices && choices.length > 0)
		{
			for(var i = 0;i < choices.length;i++)
			{
				if(reg.exec(choices[i]))
				{
					$gameSystem.setChoiceExOn(true);
					choices[i] = choices[i].replace(reg, '');
				}
			}
		}
	};

	Game_Message.prototype.isEnableChoice = function(choiceIndex)
	{
		return !$gameSystem.isRememberChoice(this.generateChoiceId(choiceIndex));
	}

	Game_Message.prototype.isHideChoice = function(choiceIndex)
	{
		var hide = false;
		for(var i = 0;i < this._choices.length;i++)
		{
			if(i == this.choiceCancelType()) continue;
			if(this.isEnableChoice(i)) hide = true;
		}
		return choiceIndex == this.choiceCancelType() && $gameSystem.isChoiceExOn() && hide;
	}

	Game_Message.prototype.rememberChoice = function(choiceIndex)
	{
		$gameSystem.rememberChoice(this.generateChoiceId(choiceIndex));
	}

	Game_Message.prototype.generateChoiceId = function(choiceIndex)
	{
		var tar = this.getChoiceTarget();
		if(!tar) return "";
		var event = $gameMap.event(tar.eventId());
		var mapId = event._mapId;
		var eventId = event.eventId();
		var pageIndex = event._pageIndex;
		var commandIndex = tar._index;
		//允许命令行数变动，允许选项位置变动，但同一事件页相同的选项会出错，同一选项命令下相同选项会出错
		//var choiceId = mapId + '#' + eventId + '#' + pageIndex + '#' + commandIndex + '#' + choiceIndex;
		//var choiceId = mapId + '#' + eventId + '#' + pageIndex + '#' + choiceIndex;
		var choices = this._choices.slice();
		choices = choices.sort();
		var choiceId = mapId + '#' + eventId + '#' + pageIndex + '#' + choices + '#' + 
		this._choices[choiceIndex];
		return choiceId;
	}

	var _Game_Message_onChoice = Game_Message.prototype.onChoice;
	Game_Message.prototype.onChoice = function(n) 
	{
		_Game_Message_onChoice.call(this, n);
		if(n == this._choiceCancelType && $gameSystem.isChoiceExOn())
		{
			$gameSystem.setChoiceExOn(false);
			$gameSystem.rememberChoiceIndex(-1);
		}
	}

	var _Game_Interpreter_setupChoices = Game_Interpreter.prototype.setupChoices;
	Game_Interpreter.prototype.setupChoices = function(params)
	{
		$gameMessage.setChoiceTarget(this);
		_Game_Interpreter_setupChoices.call(this, params);
	}

	Game_Interpreter.prototype.command0 = function() 
	{
		console.log('command0');
		if($gameSystem.isChoiceExOn())
		{
		    for (var i = this._index; i >= 0; i--)
		    {
		        var command = this._list[i];
		        if (command.code === 102 && command.indent === (this._indent - 1)) 
		        {
		        	var preCommand = this._list[i - 2];
		        	if(preCommand && preCommand.code === 101)
		        	{
		        		this.jumpTo(i - 2);
		        	}
		        	else
		        	{
		        		this.jumpTo(i);
		        	}
		            return;
		        }
		    }
		}
	    return true;
	}

	Window_Message.prototype.close = function()
	{
		this.contents.clear();
		if($gameSystem.isChoiceExOn()) return;
		Window_Base.prototype.close.call(this);
	}

	Window_ChoiceList.prototype.numVisibleRows = function() 
	{
	    var messageY = this._messageWindow.y;
	    var messageHeight = this._messageWindow.height;
	    var centerY = Graphics.boxHeight / 2;
	    var choices = $gameMessage.showChoices();
	    var numLines = choices.length;
	    var maxLines = 8;
	    if (messageY < centerY && messageY + messageHeight > centerY) {
	        maxLines = 4;
	    }
	    if (numLines > maxLines) {
	        numLines = maxLines;
	    }
	    return numLines;
	};

	var _Window_ChoiceList_selectDefault = Window_ChoiceList.prototype.selectDefault;
	Window_ChoiceList.prototype.selectDefault = function() 
	{
		if($gameSystem.getChoiceIndex() < 0)
			$gameSystem.rememberChoiceIndex($gameMessage.choiceDefaultType());
		this.select($gameSystem.getChoiceIndex());
	};

	Window_ChoiceList.prototype.makeCommandList = function() 
	{
	    var choices = $gameMessage.choices();
	    for (var i = 0; i < choices.length; i++) 
	    {
	    	if($gameMessage.isHideChoice(i)) continue;
	        this.addCommand(choices[i], 'choice');
	    }
	};

	Window_ChoiceList.prototype.drawItem = function(index) 
	{
    	var rect = this.itemRectForText(index);
    	this.changePaintOpacity($gameMessage.isEnableChoice(index));
    	this.drawTextEx(this.commandName(index), rect.x, rect.y);
	};

	var _Window_ChoiceList_callOkHandler = Window_ChoiceList.prototype.callOkHandler;
	Window_ChoiceList.prototype.callOkHandler = function()
	{
		$gameMessage.rememberChoice(this.index());
		if($gameSystem.isChoiceExOn())
		{
			$gameSystem.rememberChoiceIndex(this.index());
		}
		else
		{
			$gameSystem.rememberChoiceIndex($gameMessage.choiceDefaultType());
		}
		_Window_ChoiceList_callOkHandler.call(this);
	}

	Window_ChoiceList.prototype.processCancel = function() 
	{
		if($gameSystem.isChoiceExOn()) return;
		Window_Command.prototype.processCancel.call(this);
	}

	var _Window_ChoiceList_callCancelHandler = Window_ChoiceList.prototype.callCancelHandler;
	Window_ChoiceList.prototype.callCancelHandler = function() 
	{
		$gameMessage.rememberChoice($gameMessage.choiceCancelType());
		_Window_ChoiceList_callCancelHandler.call(this);
	};
})();