//=============================================================================
// MiniGames.js
//=============================================================================

/*:
 * @plugindesc 小游戏插件，包括拼图、修水管。
 * @author 冷血
 *
 * 插件参数：
 *
 *   @param fadeDuration
 * 	 @desc 淡入淡出时间
 * 	 @default 30
 *
 * @help
 *
 * 插件命令：
 *
 *   ●设置音效的命令(放在开启命令前)
 *
 *       MiniGame GameSe EnterSe MoveSe
 *
 *            EnterSe： 指定音效的文件名，当按下确定后播放该音效，
 *                      不可缺省
 *
 *            MoveSe ： 指定音效的文件名，当移动光标时播放该音效，
 *                      可缺省
 *
 *   ●设置水管的初始角度(放在开启命令前)
 *
 *       MiniGame SetAngle Args
 *
 *            Args： 设置水管的初始角度，格式以3*3为例子，如下
                          [[90,90,90],
                           [90,90,90],
                           [90,90,90]]
                     以上的数组与3*3的格子相对应。
 *
 *   ●设置水管的旋转方向(放在开启命令前)
 *
 *       MiniGame SetRotate Num
 *
 *            Num： 默认值为4，360/4=90，每次旋转90度，如果是6就是60度
 *
 *   ●开启游戏的命令
 *
 *       MiniGame GameType Pic Size Spacing OffestX OffestY backImg
 *
 *            GameType： 指定为以下任意一种游戏类型，不可缺省
 *                       Jigsaw     ->   拼图
 *                       Waterpipe  ->   修水管
 *						 
 *            Pic     ： 指定游戏使用图片的文件名(指.png之前的部分)，
 *                       路径位于pictures下，不可缺省
 *			  		   
 *            Size    ： 指定游戏所使用的棋盘大小，如9宫格棋盘，应填写3*3，
 *                       不可缺省
 *			  
 *            Spacing ： 指定每个图片碎片之间的间距，可缺省默认0。
 *
 *            OffestX ： 指定整个棋盘的x轴偏移，正数如10向右偏移，负数如-10向左
 *                       偏移，可缺省默认0。
 *
 *            OffestY ： 指定整个棋盘的y轴偏移，正数如10向下偏移，负数如-10向上
 *                       偏移，可缺省默认0。
 *
 *            backImg ： 指定该游戏使用的背景图，路径位于pictures文件夹下。
 *
 *   ●退出游戏的命令
 *
 *       MiniGame Dispose
 *
 * 使用方法：
 *
 *   ●生成九宫格拼图，拼图完成后退出游戏
 *
 *       插件指令    ->    MiniGame Jigsaw pic 3*3
 *       等待        ->    30帧
 *       显示消息    ->    你赢了！
 *       插件指令    ->    MiniGame Dispose
 *       其他事件    ->    做你想做的事……
 *
 *   ●生成九宫格水管，水管完成后退出游戏
 *
 *       插件指令    ->    MiniGame Waterpipe pic 3*3
 *       等待        ->    30帧
 *       显示消息    ->    你赢了！
 *       插件指令    ->    MiniGame Dispose
 *       其他事件    ->    做你想做的事……
  *
 *   ●生成九宫格水管，同时设置旋转方向以及初始角度，水管完成后退出游戏
 *
 *       插件指令    ->    MiniGame SetRotate 6
 *       插件指令    ->    MiniGame SetAngle [[60,60,60],[60,60,60],[60,60,60]]
 *       插件指令    ->    MiniGame Waterpipe pic 3*3
 *       等待        ->    30帧
 *       显示消息    ->    你赢了！
 *       插件指令    ->    MiniGame Dispose
 *       其他事件    ->    做你想做的事……
 */
(function() {
	var parameters = PluginManager.parameters('MiniGames');
	var fadeDuration = parseInt(parameters['fadeDuration']);

	var _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
	Game_Interpreter.prototype.updateWaitMode = function() 
	{
		if($gameSystem.isStartMiniGame()) return true;
		return _Game_Interpreter_updateWaitMode.call(this);
	}

 	var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args)
    {
    	_Game_Interpreter_pluginCommand.call(this, command, args);
    	if (command === 'MiniGame')
    	{
    		SceneManager._scene._spriteset.SetInterpreter(this);
    		switch (args[0])
    		{
    		case 'GameSe':
    			SceneManager._scene._spriteset.setGameSe(args[1], args[2]);
    			break;
    		case 'Jigsaw':
    			var picName = args[1];
    			var sizeTextArr = args[2].split('*');
    			var wsize = parseInt(sizeTextArr[0]);
    			var hsize = parseInt(sizeTextArr[1]);
    			var gameType = args[0];
    			var spacing = parseInt(args[3]) || 0;
    			var offestX = parseInt(args[4]) || 0;
    			var offestY = parseInt(args[5]) || 0;
    			var backImg = args[6] || "";
    			SceneManager._scene._spriteset.generateJigsaw(picName, wsize, hsize, gameType, spacing, offestX, offestY, backImg);
    			break;
    		case 'Waterpipe':
    			var picName = args[1];
    			var sizeTextArr = args[2].split('*');
    			var wsize = parseInt(sizeTextArr[0]);
    			var hsize = parseInt(sizeTextArr[1]);
    			var gameType = args[0];
    			var spacing = parseInt(args[3]) || 0;
    			var offestX = parseInt(args[4]) || 0;
    			var offestY = parseInt(args[5]) || 0;
    			var backImg = args[6] || "";
    			SceneManager._scene._spriteset.generateWaterpipe(picName, wsize, hsize, gameType, spacing, offestX, offestY, backImg);
    			break;
    		case 'Dispose':
    			SceneManager._scene._spriteset.disposeGameSprite();
    			break;
    		case 'SetAngle':
    			SceneManager._scene._spriteset.SetAngle(args[1]);
    			break;
    		case 'SetRotate':
    			SceneManager._scene._spriteset.SetRotate(args[1]);
    			break;
    		}
    	}
    }

	Game_System.prototype.startMiniGame = function(flag)
	{
		this._startMiniGame = flag;
	}

	Game_System.prototype.isStartMiniGame = function()
	{
		return this._startMiniGame;
	}

	var _Game_Player_canMove = Game_Player.prototype.canMove;
	Game_Player.prototype.canMove = function() 
	{
		if($gameSystem.isStartMiniGame()) return false;
		return _Game_Player_canMove.call(this);
	}

	Spriteset_Map.prototype.createUpperLayer = function()
	{
		Spriteset_Base.prototype.createUpperLayer.call(this);
		this.createGameSprite();
	}

	Spriteset_Map.prototype.createGameSprite = function()
	{
		//var maxSprites = 25;
		this._gameBaseSprite = new Sprite();
		this.addChild(this._gameBaseSprite);
		// for(var i = 0;i < maxSprites;i++)
		// {
		// 	this._gameBaseSprite.addChild(new Sprite());
		// }
		this._gameCursor = new Sprite();
		this.addChild(this._gameCursor);
		$gameSystem.startMiniGame(false);
	}

	Spriteset_Map.prototype.setGameFadeIn = function()
	{
		this._gameFadeIn = true;
		this._gameFadeDuration = fadeDuration;
		this._gameBaseSprite.opacity = 0;
	}

	Spriteset_Map.prototype.setGameFadeOut = function()
	{
		this._gameFadeOut = true;
		this._gameFadeDuration = fadeDuration;
		this._gameBaseSprite.opacity = 255;
	}

	Spriteset_Map.prototype.isGameFade = function()
	{
		return this._gameFadeIn || this._gameFadeOut;
	}

	Spriteset_Map.prototype.setGameSe = function(enterSe, moveSe)
	{
		this._enterSe = enterSe;
		this._moveSe = moveSe;
	}

	Spriteset_Map.prototype.SetAngle = function(args)
	{
		this._defaultAngle = eval(args);
	}

	Spriteset_Map.prototype.SetRotate = function(num)
	{
		this._rotateNum = parseInt(num);
	}

	Spriteset_Map.prototype.SetInterpreter = function(Interpreter)
	{
		this._Interpreter = Interpreter;
	}

	var _Spriteset_Map_update = Spriteset_Map.prototype.update;
	Spriteset_Map.prototype.update = function() 
	{
		_Spriteset_Map_update.call(this);
		if(this._gameFadeIn)
		{
			if (this._gameFadeDuration > 0)
		    {
		        var d = this._gameFadeDuration;
		        this._gameBaseSprite.opacity = (this._gameBaseSprite.opacity * (d - 1) + 255) / d;
		        this._gameFadeDuration--;
		    }
		    else
		    {
		    	this._gameFadeIn = false;
		    }
		}
		if(this._gameFadeOut)
		{
			if (this._gameFadeDuration > 0)
		    {
		        var d = this._gameFadeDuration;
		        this._gameBaseSprite.opacity = (this._gameBaseSprite.opacity * (d - 1) + 0) / d;
		        this._gameFadeDuration--;
		    }
		    else
		    {
		    	this._gameFadeOut = false;
		    	$gameSystem.startMiniGame(false);
		    	//淡出结束,删掉背景图精灵
		    	if(this._showGameBack)
				{
					this._gameBaseSprite.removeChildAt(0);
				}
		    }
		}
		if($gameSystem.isStartMiniGame() && !this.isGameFade())
		{
			var cursorIndex = this._gameCursor.index;
			if(Input.isTriggered('up'))
			{
				this._gameCursor.index -= this._gameSpriteArr[0].length;
			}
			if(Input.isTriggered('down'))
			{
				this._gameCursor.index += this._gameSpriteArr[0].length;
			}
			if(Input.isTriggered('left'))
			{
				this._gameCursor.index -= 1;
			}
			if(Input.isTriggered('right'))
			{
				this._gameCursor.index += 1;
			}
			if(cursorIndex != this._gameCursor.index)
			{
				var size = this._gameSpriteArr.length * this._gameSpriteArr[0].length;
				if(this._gameCursor.index < 0 || this._gameCursor.index >= size)
				{
					this._gameCursor.index = cursorIndex;
				}
				this.moveGameCursor(this._gameCursor.index);
				if(this._moveSe) AudioManager.playSe({"name":this._moveSe,"pan":0,"pitch":100,"volume":90});
			}

			if(Input.isTriggered('ok'))
			{
				if(this._gameType == 'Jigsaw')
				{
					this.moveJigsaw(this._gameCursor.index);
					if(this.isJigsawWin())
					{
						//alert('你赢了');
						$gameSystem.startMiniGame(false);
					}
				}
				else if(this._gameType == 'Waterpipe')
				{
					this.rotateWaterpipe(this._gameCursor.index);
					if(this.isWaterpipeWin())
					{
						//alert('你赢了');
						$gameSystem.startMiniGame(false);
					}
				}
			}
			if(Input.isTriggered('cancel'))
			{
				//alert('取消');
				this.disposeGameSprite();
				this._Interpreter.command115();
			}
		}
	};

	Spriteset_Map.prototype.isJigsawWin = function()
	{
		var win = true;
		for(var i = 0;i < this._gameSpriteArr.length;i++)
		{
			var jlen = this._gameSpriteArr[i].length;
			var breakflag = false;
			for(var j = 0;j < jlen;j++)
			{
				var s = this._gameSpriteArr[i][j];
				if(s.x != s.originalX || s.y != s.originalY)
				{
					win = false;
					breakflag = true;
					break;
				}
			}
			if(breakflag) break;
		}
		return win;
	}

	Spriteset_Map.prototype.isWaterpipeWin = function()
	{
		var win = true;
		for(var i = 0;i < this._gameSpriteArr.length;i++)
		{
			var jlen = this._gameSpriteArr[i].length;
			var breakflag = false;
			for(var j = 0;j < jlen;j++)
			{
				var s = this._gameSpriteArr[i][j];
				if(s.angle != 0)
				{
					win = false;
					breakflag = true;
					break;
				}
			}
			if(breakflag) break;
		}
		return win;
	}

	Spriteset_Map.prototype.generateJigsaw = function(picName, wsize, hsize, gameType, spacing, offestX, offestY, backImg)
	{
		//加载原图
		this.setGameFadeIn();
		this._gameType = gameType;
		var original = ImageManager.loadPicture(picName);
		original.addLoadListener(function() {
			var picW = parseInt(original.width / wsize);
			var picH = parseInt(original.height / hsize);
			//var spacing = 10;
			//var spacing = 0;
			var posX = parseInt((Graphics.width - (original.width + (wsize - 1) * spacing)) / 2) + offestX;
			var posY = parseInt((Graphics.height - (original.height + (hsize - 1) * spacing)) / 2) + offestY;

			//分割原图给不同的精灵展示
			this._gameSpriteArr = [];
			for(var i = 0;i < hsize;i++)
			{
				var tempArr = [];
				for(var j = 0;j < wsize;j++)
				{
					//console.log('index: ' + (i * wsize + j));
					var sprite = this.getGameSprite(i * wsize + j);
					sprite.bitmap = new Bitmap(picW, picH);
					sprite.bitmap.blt(original, j * picW, i * picH, picW, picH, 0, 0);
					sprite.anchor.x = 0;
					sprite.anchor.y = 0;
					sprite.x = posX + j * picW + j * spacing;
					sprite.y = posY + i * picH + i * spacing;
					sprite.originalX = sprite.x;
					sprite.originalY = sprite.y;
					//最右下角的那块拼图置空
					if(i == hsize - 1 && j == wsize - 1 && (wsize != 1 || hsize != 1)) sprite.bitmap = null;
					tempArr.push(sprite);
				}
				this._gameSpriteArr.push(tempArr);
			}
			//从右下到左上打乱
			for(var i = this._gameSpriteArr.length - 1;i > 0;i--)
			{
				this.swapGameSprite(new Point(i, i), new Point(i - 1, i));
				this.swapGameSprite(new Point(i - 1, i), new Point(i - 1, i - 1));
			}
			//从左上到右下打乱
			for(var i = 0;i < this._gameSpriteArr.length - 1;i++)
			{
				this.swapGameSprite(new Point(i, i), new Point(i + 1, i));
				this.swapGameSprite(new Point(i + 1, i), new Point(i + 1, i + 1));
			}
			//判断胜败
			if(this.isJigsawWin())
			{
				//alert('你赢了');
				$gameSystem.startMiniGame(false);
				return;
			}
			//处理光标
			this._gameCursor.anchor.x = 0;
			this._gameCursor.anchor.y = 0;
			this._gameCursor.bitmap = new Bitmap(picW, picH);
			var cursorW = 3;
			var cursorC = '#FF0000';
			this._gameCursor.bitmap.fillRect (0, 0, picW, cursorW, cursorC);
			this._gameCursor.bitmap.fillRect (0, picH - cursorW, picW, cursorW, cursorC);
			this._gameCursor.bitmap.fillRect (0, 0, cursorW, picH, cursorC);
			this._gameCursor.bitmap.fillRect (picW - cursorW, 0, cursorW, picH, cursorC);
			this.moveGameCursor(wsize * hsize - 2);
			$gameSystem.startMiniGame(true);
	        //背景图处理
	        this._showGameBack = false;
			if(backImg && backImg != "")
			{
				this._showGameBack = true;
				var backImgBitmap = ImageManager.loadPicture(backImg);
				backImgBitmap.addLoadListener(function() {
					var posX = (Graphics.width - backImgBitmap.width) / 2;
					var posY = (Graphics.height - backImgBitmap.height) / 2;
					var sprite = new Sprite(backImgBitmap);
					sprite.x = posX;
					sprite.y = posY;
					this._gameBaseSprite.addChildAt(sprite, 0);
				}.bind(this));
			}
        }.bind(this));
	}

	Spriteset_Map.prototype.generateWaterpipe = function(picName, wsize, hsize, gameType, spacing, offestX, offestY, backImg)
	{
		//加载原图
		this.setGameFadeIn();
		this._gameType = gameType;
		var original = ImageManager.loadPicture(picName);
		original.addLoadListener(function() {
			var picW = parseInt(original.width / wsize);
			var picH = parseInt(original.height / hsize);
			//var spacing = 10;
			//var spacing = 0;
			var posX = parseInt((Graphics.width - (original.width + (wsize - 1) * spacing)) / 2) + offestX;
			var posY = parseInt((Graphics.height - (original.height + (hsize - 1) * spacing)) / 2) + offestY;

			//分割原图给不同的精灵展示
			this._gameSpriteArr = [];
			for(var i = 0;i < hsize;i++)
			{
				var tempArr = [];
				for(var j = 0;j < wsize;j++)
				{
					//console.log('index: ' + (i * wsize + j));
					var sprite = this.getGameSprite(i * wsize + j);
					sprite.bitmap = new Bitmap(picW, picH);
					sprite.bitmap.blt(original, j * picW, i * picH, picW, picH, 0, 0);
					sprite.anchor.x = 0.5;
					sprite.anchor.y = 0.5;
					sprite.x = posX + j * picW + j * spacing + picW / 2;
					sprite.y = posY + i * picH + i * spacing + picH / 2;
					sprite.angle = 0;
					//sprite.originalAngle = sprite.rotation;
					//sprite.originalX = sprite.x;
					//sprite.originalY = sprite.y;
					//最右下角的那块拼图置空
					//if(i == hsize - 1 && j == wsize - 1) sprite.bitmap = null;
					tempArr.push(sprite);
				}
				this._gameSpriteArr.push(tempArr);
			}
			//使用默认角度
			if(this._defaultAngle)
			{
				for(var i = 0;i < this._gameSpriteArr.length;i++)
				{
					var jlen = this._gameSpriteArr[i].length;
					for(var j = 0;j < jlen;j++)
					{
						var angle = this._defaultAngle[i][j];
						this._gameSpriteArr[i][j].angle = angle;
						this._gameSpriteArr[i][j].rotation = angle * Math.PI / 180;
						console.log('angle: ' + angle);
					}
				}

			}
			//打乱角度
			else
			{
				//根据旋转方向生成角度
				var angles = [0,90,180,270];
				if(this._rotateNum)
				{
					angles = [];
					for(var i = 0;i < this._rotateNum;i++)
					{
						angles.push(i * (360 / this._rotateNum));
					}
				}
				angles.shift();

				if(wsize == 1 && hsize == 1)
				{
					var angle = angles[Math.floor(Math.random() * angles.length)];
					this._gameSpriteArr[0][0].angle = angle;
					this._gameSpriteArr[0][0].rotation = angle * Math.PI / 180;
				}
				else
				{
					var lastpos = -1;
					for(var i = 0;i < this._gameSpriteArr.length;i++)
					{
						var jlen = this._gameSpriteArr[i].length;
						for(var j = 0;j < jlen;j++)
						{
							var index = i * wsize + j;
							var pos = (lastpos + index + 1) % angles.length;
							lastpos = pos;
							var angle = angles[pos];
							this._gameSpriteArr[i][j].angle = angle;
							this._gameSpriteArr[i][j].rotation = angle * Math.PI / 180;
							console.log('angle: ' + angle);
						}
					}
				}
			}
			//判断胜败
			if(this.isWaterpipeWin())
			{
				//alert('你赢了');
				$gameSystem.startMiniGame(false);
				return;
			}
			//处理光标
			this._gameCursor.anchor.x = 0.5;
			this._gameCursor.anchor.y = 0.5;
			this._gameCursor.bitmap = new Bitmap(picW, picH);
			var cursorW = 3;
			var cursorC = '#FF0000';
			this._gameCursor.bitmap.fillRect (0, 0, picW, cursorW, cursorC);
			this._gameCursor.bitmap.fillRect (0, picH - cursorW, picW, cursorW, cursorC);
			this._gameCursor.bitmap.fillRect (0, 0, cursorW, picH, cursorC);
			this._gameCursor.bitmap.fillRect (picW - cursorW, 0, cursorW, picH, cursorC);
			this.moveGameCursor(wsize * hsize - 2);
			$gameSystem.startMiniGame(true);
 			//背景图处理
 			this._showGameBack = false;
			if(backImg && backImg != "")
			{
				this._showGameBack = true;
				var backImgBitmap = ImageManager.loadPicture(backImg);
				backImgBitmap.addLoadListener(function() {
					var posX = (Graphics.width - backImgBitmap.width) / 2;
					var posY = (Graphics.height - backImgBitmap.height) / 2;
					var sprite = new Sprite(backImgBitmap);
					sprite.x = posX;
					sprite.y = posY;
					this._gameBaseSprite.addChildAt(sprite, 0);
				}.bind(this));
			}
        }.bind(this));
	}

	Spriteset_Map.prototype.moveGameCursor = function(index)
	{
		var size = this._gameSpriteArr.length * this._gameSpriteArr[0].length;
		index = index < 0 ? 0 : index >= size ? size - 1 : index;
		var y = parseInt(index / this._gameSpriteArr[0].length);
		var x = index % this._gameSpriteArr[0].length;
		this._gameCursor.x = this._gameSpriteArr[y][x].x;
		this._gameCursor.y = this._gameSpriteArr[y][x].y;
		this._gameCursor.index = index;
	}

	Spriteset_Map.prototype.moveJigsaw = function(index)
	{
		var y = parseInt(index / this._gameSpriteArr[0].length);
		var x = index % this._gameSpriteArr[0].length;
		if(!this._gameSpriteArr[y][x] || this._gameSpriteArr[y][x].bitmap == null) return;
		for(var i = 0;i < 4;i++)
		{
			var y1 = i == 0 ? y - 1 : i == 1 ? y + 1 : y;
			var x1 = i == 2 ? x - 1 : i == 3 ? x + 1 : x;
			if(y1 >= 0 && y1 < this._gameSpriteArr.length && x1 >= 0 && x1 < this._gameSpriteArr[0].length)
			{
				var s = this._gameSpriteArr[y1][x1];
				if(s.bitmap == null)
				{
					this.swapGameSprite(new Point(x, y), new Point(x1, y1));
					if(this._enterSe) AudioManager.playSe({"name":this._enterSe,"pan":0,"pitch":100,"volume":90});
					break;
				}
			}
		}
	}

	Spriteset_Map.prototype.rotateWaterpipe = function(index)
	{
		var y = parseInt(index / this._gameSpriteArr[0].length);
		var x = index % this._gameSpriteArr[0].length;
		var s = this._gameSpriteArr[y][x];
		s.angle = (s.angle + (this._rotateNum ? 360 / this._rotateNum : 90)) % 360;
		s.rotation = s.angle * Math.PI / 180;
		if(this._enterSe) AudioManager.playSe({"name":this._enterSe,"pan":0,"pitch":100,"volume":90});
	}

	Spriteset_Map.prototype.swapGameSprite = function(p1, p2)
	{
		var s1 = this._gameSpriteArr[p1.y][p1.x];
		var s2 = this._gameSpriteArr[p2.y][p2.x];
		if(s1 && s2)
		{
			//换坐标
			var tempX = s1.x;
			var tempY = s1.y;
			s1.x = s2.x;
			s1.y = s2.y;
			s2.x = tempX;
			s2.y = tempY;

			//换索引
			this._gameSpriteArr[p1.y][p1.x] = s2;
			this._gameSpriteArr[p2.y][p2.x] = s1;
		}
	}

	Spriteset_Map.prototype.getGameSprite = function(index)
	{
		this._gameBaseSprite.visible = true;
		var childs = this._gameBaseSprite.children;
		var sprite = null;
		if(index >= childs.length)
		{
			sprite = new Sprite();
			this._gameBaseSprite.addChild(sprite);
		}
		else
		{
			sprite = childs[index];
		}
		sprite.visible = true;
		return sprite;
	}

	Spriteset_Map.prototype.disposeGameSprite = function()
	{
		$gameSystem.startMiniGame(true);
		this.setGameFadeOut();
		this._gameCursor.bitmap = null;
		this._enterSe = null;
		this._moveSe = null;
		this._defaultAngle = null;
		this._rotateNum = null;
		// this._gameBaseSprite.visible = false;
		// var childs = this._gameBaseSprite.children;
		// for(var i = 0;i < childs.length;i++)
		// {
		// 	childs[i].bitmap = null;
		// 	childs[i].visible = false;
		// }
	}
})();