//=============================================================================
// MK_ParallaxPicture.js
// 
//=============================================================================
//  author : Mikan 
//  plugin : MK_ParallaxPicture.js 视差图片
// version : v1.0.0 2020/06/14 完成基本功能
// ------------------------------------------------------------------------------
// [Twitter] https://twitter.com/_MikanHako/
//  [GitHub] https://github.com/MikanHako1024/
//    [Blog] NONE
//=============================================================================




/*:
 * @plugindesc 视差图片 <MK_ParallaxPicture>
 * @author Mikan 
 * @version v1.0.0 2020/06/14 完成基本功能
 *   v0.0.0 2020/06/12 项目计划中
 * 
 * 
 * @param ==== 游戏参数配置 ====
 * 
 * @param 
 * @text 
 * @desc 
 * @type 
 * @default 
 * @parent 
 * 
 * @param ==== 插件指令配置 ====
 * 
 * @param 
 * @text 
 * @desc 
 * @type 
 * @default 
 * 
 * @param ==== 内容数据配置 ====
 * 
 * @param 
 * @text 
 * @desc 
 * @type 
 * @default 
 * 
 * @param ==== under ====
 * 
 * 
 * 
 * 
 * @help
 * 
 * ---- 简要说明 ----
 * 
 * 需求是能在地图滚动的时候，让前景、背景以不同的速度移动，以达到简单3D的视觉效果
 * 
 * 原本打算控制【显示图片】来达到目的
 * 但是为了能方便地控制图片层级，特别是与玩家、事件的层级
 * 于是改用控制事件位置实现
 * 
 * 不自带 调整事件图像位置插件 的功能
 * 
 * 通过事件标签配置视差事件
 * 不提供修改功能，修改需求可以通过更换事件实现
 * 
 * 
 * ---- 插件指令 ----
 * 
 * None
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
 *   # 设置事件为视差事件.
 *   <Parallax:a,b,c,d>
 *     a : 数值，横向偏移比率
 *     b : 数值，纵向偏移比率
 *     c : 数值，横向初始位置
 *     d : 数值，纵向初始位置
 *     偏移比率 : 视差事件移动速度 相对 地图滚动速度 的比率
 *       0 : 相对屏幕静止
 *       1 : 相对地图静止
 *       0~1  : 与地图滚动同向，移动更慢
 *       1~.. : 与地图滚动同向，移动更快
 *       ..~0 : 与地图滚动反向
 *     初始位置 : 地图滚动到最左上角时，事件的位置
 *       可以用here代替，详见 【标签设置】-【设置事件为视差事件，使用事件位置作为初始位置】
 * 
 *   ex : <Parallax:0.5,0,3,6>
 * 
 * 
 *   # 设置事件为视差事件，使用事件位置作为初始位置.
 *   <Parallax:a,b,here>
 *     a,b  : 同 【设置事件为视差事件】
 *     here : 设置here，表示用事件初始的位置代替c,d配置初始位置
 * 
 *   ex : <Parallax:0.5,0,here>
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




(function() {

	Game_Map.prototype.updateEventParallaxPicture = function() {
	    this.events().forEach(function(event) {
	        event.updateParallaxPicture();
	    });
	};

	var _MK_Game_Map_scrollDown   = Game_Map.prototype.scrollDown;
	Game_Map.prototype.scrollDown = function(distance) {
		_MK_Game_Map_scrollDown.apply(this, arguments);
		this.updateEventParallaxPicture();
	};

	var _MK_Game_Map_scrollLeft   = Game_Map.prototype.scrollLeft;
	Game_Map.prototype.scrollLeft = function(distance) {
		_MK_Game_Map_scrollLeft.apply(this, arguments);
		this.updateEventParallaxPicture();
	};

	var _MK_Game_Map_scrollRight   = Game_Map.prototype.scrollRight;
	Game_Map.prototype.scrollRight = function(distance) {
		_MK_Game_Map_scrollRight.apply(this, arguments);
		this.updateEventParallaxPicture();
	};

	var _MK_Game_Map_scrollUp   = Game_Map.prototype.scrollUp;
	Game_Map.prototype.scrollUp = function(distance) {
		_MK_Game_Map_scrollUp.apply(this, arguments);
		this.updateEventParallaxPicture();
	};


	var _MK_Game_Map_setDisplayPos   = Game_Map.prototype.setDisplayPos;
	Game_Map.prototype.setDisplayPos = function(x, y) {
		_MK_Game_Map_setDisplayPos.apply(this, arguments);
		this.updateEventParallaxPicture();
	};


	Game_Event.prototype.updateParallaxPicture = function() {
		this.initParallaxPictureConfigIfEmpty();
		if (this._parallaxMode) {
			this._x = this._realX = $gameMap.displayX() * this._parallax_xRate + this._parallax_xOffs;
			this._y = this._realY = $gameMap.displayY() * this._parallax_yRate + this._parallax_yOffs;
		}
	};


	Game_Event.prototype.initParallaxPictureConfig = function() {
		var regexp = /<Parallax:(.*?),(.*?),((.*?),(.*?)|here)>/;
		var res = regexp.exec(this.event().note);
		if (!!res) {
			var xRate = Number(res[1]) || 0;
			var yRate = Number(res[2]) || 0;
			if (res[3] === 'here') {
				var xOffs = this.event().x;
				var yOffs = this.event().y;
			}
			else {
				var xOffs = Number(res[4]) || 0;
				var yOffs = Number(res[5]) || 0;
			}

			this._parallaxMode = true;
			this._parallax_xRate = xRate;
			this._parallax_yRate = yRate;
			this._parallax_xOffs = xOffs;
			this._parallax_yOffs = yOffs;
		}
		else {
			this._parallaxMode = false;
		}
	};

	Game_Event.prototype.initParallaxPictureConfigIfEmpty = function() {
		if (typeof this._parallaxMode === 'undefined') {
			this.initParallaxPictureConfig();
		}
	};

})();



