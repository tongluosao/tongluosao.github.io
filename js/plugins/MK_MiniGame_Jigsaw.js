//=============================================================================
// MK_MiniGame_Jigsaw.js
// 拼图小游戏
//=============================================================================
//  author : Mikan 
//  plugin : MK_MiniGame_Jigsaw.js 拼图小游戏
// version : v0.1.3 2021/01/25 增加碎片初始区域的限制
// ------------------------------------------------------------------------------
// [Twitter] https://twitter.com/_MikanHako/
// -[GitHub] https://github.com/MikanHako1024/
// ---[Blog] NONE
// -----[QQ] 312859582
//=============================================================================




/*:
 * @plugindesc 拼图小游戏 <MK_MiniGame_Jigsaw>
 * @author Mikan 
 * @version v0.1.3 2021/01/25 增加碎片初始区域的限制
 * v0.1.2 2020/12/25 增加场景淡入淡出
 * v0.1.1 2020/12/24 完成退出演出；修正插件说明
 * v0.1.0 2020/12/20 完成最初的版本
 * v0.0.0 2020/12/13 项目计划中
 * 
 * 
 * 
 * 
 * @help
 * 
 * ---- 简要说明 ----
 * 
 * 使用插件指令，开始一个拼图游戏。
 * 
 * 细则 :
 *   关卡 : 暂时只有一个关卡，在插件参数中配置 拼图碎片素材 及 拼图碎片正确位置
 * 
 *   游戏开始 : 进入场景时，游戏开始，拼图碎片随机摆放在场景左右两侧
 *   游戏结束 : 仅当完全正确拼合拼图时，等待数帧，回到原先的地图
 *
 *   十字键 : 八方向移动光标，拿起碎片时，该碎片会连同一起移动
 *   确定键 : 拿起/放下拼图碎片
 *   取消键 : 旋转碎片，以光标为中心，90度顺时针旋转碎片
 *   (暂无按键触发结束，全部正确拼合后触发结束)
 * 
 *   拿起碎片 : 光标处于碎片图片有效像素上时，可以拿起碎片
 *     有效像素 : 半径3像素内的所有像素的平均不透明度(0~255) >= 31
 *   
 *   放下碎片 :
 *     放下碎片，使其与另一碎片 一定程度上正确拼合 : 不自动拼合
 *     放下碎片，使其与拼图背景 一定程度上正确拼合 : 自动拼合
 *     放下碎片进行拼合后，检查是否所有碎片都已经拼合 : 结束游戏
 * 
 * 其他增强效果 :
 *    BGM : 可以设置一个bgm (audio_jigsaw)
 *      在场景开始时播放，场景结束时停止，缺省则忽略
 *    音效 : 以下四种情况 各自可以设置一个音效，缺省表示无音效
 *      拿起碎片 : audio_pick
 *      放下碎片 : audio_put
 *      旋转碎片 : audio_spin
 *      拼合碎片 : audio_splice
 *    光标 : 以下三种状态 各自可以设置一个图片，缺省表示无图片
 *      未拿起碎片且处于可以拿起碎片的状态 : picture_cursor_canpick
 *      拿起碎片 : picture_cursor_onpick
 *      其他情况 : picture_cursor
 *    拼图碎片 : 以下两种状态 各自可以设置一个图片，缺省表示无图片
 *      碎片未被拿起 : picture_chip
 *      碎片被拿起 : picture_chip_sel
 *      拿起拼图碎片后，该碎片将被提升至最高层级，不被其他碎片遮盖
 *    成功地结束游戏 : 暂无演出
 * 
 * 
 * 以上规则 适合只出现一次的拼图游戏，操作和拼合规则也是固定的
 * 未来版本可能出现游戏规则的变动，或是插件参数、插件指令的变动，请注意关注插件说明
 * 
 * 
 * ---- 插件指令 ----
 * 
 *   # 进入拼图游戏场景
 *   MiniGame_Jigsaw start
 * 
 * 
 * ---- 使用方法 ----
 * 
 * TODO
 * 
 * 
 * ---- 其他说明 ----
 * 
 * TODO
 * 
 * 
 * ---- 标签设置 ----
 * 
 * TODO
 * 
 * 
 * ---- 参数描述 ----
 * 
 * TODO
 * 
 * 
 * ---- 用语说明 ----
 * 
 * TODO
 * 
 * 
 * ---- 开发方法 ----
 * 
 * TODO
 * 
 * 
 * ---- 后续任务 ----
 * 
 * □ 鼠标操作
 * ...
 * 
 * 
 * ---- 使用规约 ----
 * 
 * 此插件由客户私人定制，其保留完全的使用权，以及二次开发的权利。
 * 二次创作保留页眉的著作权表示部分，谢谢。
 * 此插件的著作权归插件作者所有，同时享有使用权等其他权利。
 * 
 * 如果需要使用本插件，请联系插件作者授权，联系方式在下方。
 * 当然，没有授权也能使用，不过能事先联系的话，我会很感谢；否则，我留有追究责任的权利。
 * 
 * 使用形式（自由游戏、商业游戏、R-18作品等）没有限制，请随意使用。
 * 使用此插件的创作作品出现的法律问题，插件作者不负任何责任。
 * 
 * 创作中，由于使用此插件而发生的问题，插件作者不负任何责任。有必要时请注意备份。
 * 
 * 如果您有任何要求，您可能需要本插件的版本升级，请联系插件作者。
 * 根据版本升级，本插件的规格有可能变更，请谅解。
 * 
 * 如果有什么意见或建议可以联系我，欢迎唠嗑。
 * 
 * 
 * ---- 联系方式 ----
 * [Twitter] https://twitter.com/_MikanHako/
 * -[GitHub] https://github.com/MikanHako1024/
 * ---[Blog] NONE
 * -----[QQ] 312859582
 * 
 * 
 * 
 * 
 * @param ==== 游戏参数配置 ====
 * 
 * @param cursor_speed
 * @text 光标移动速度
 * @desc 光标移动速度 (单位 : 像素/帧)
 * @type number
 * @default 3
 * 
 * @param splice_tolerance
 * @text 拼合容差
 * @desc 检测拼合时允许的最大误差 (单位 : 像素)
 * 放下碎片在误差内时会进行拼合
 * @type number
 * @default 6
 * 
 * @param scene_pop_wait_time
 * @text 拼图游戏结束后的等待时间
 * @desc 拼图游戏结束后等待一定帧数，之后返回原先的场景
 * (单位 : 帧)
 * @type number
 * @default 60
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
 * @param 拼图配置
 * 
 * @param jigsaw_chips
 * @text 拼图碎片列表
 * @desc 用于一个拼图的所有碎片
 * @type struct<chip>[]
 * @default []
 * @parent 拼图配置
 * 
 * @param picture_bg
 * @text 拼图背景图
 * @desc 拼图场景的背景图，背景图会居中处理
 * @type file
 * @dir img/pictures
 * @default 
 * @parent 拼图配置
 * 
 * @param picture_cursor
 * @text 光标图
 * @desc 拼图场景中，显示光标位置的图片
 * @type file
 * @dir img/pictures
 * @default 
 * @parent 拼图配置
 * 
 * @param picture_cursor_onpick
 * @text 拿起时光标图
 * @desc 拿起碎片时显示的光标图片
 * @type file
 * @dir img/pictures
 * @default 
 * @parent 拼图配置
 * 
 * @param picture_cursor_canpick
 * @text 可拿起时光标图
 * @desc 光标移动到可以拿起碎片的位置时显示的光标图片
 * @type file
 * @dir img/pictures
 * @default 
 * @parent 拼图配置
 * 
 * @param audio_jigsaw
 * @text 声音 - 拼图场景bgm
 * @desc 拼图场景的bgm
 * @type struct<audioObj>
 * @default 
 * @parent 拼图配置
 * 
 * @param audio_pick
 * @text 声音 - 拿起碎片音效
 * @desc 拿起拼图碎片的音效
 * @type struct<audioObj>
 * @default 
 * @parent 拼图配置
 * 
 * @param audio_put
 * @text 声音 - 放下碎片音效
 * @desc 放下拼图碎片的音效
 * @type struct<audioObj>
 * @default 
 * @parent 拼图配置
 * 
 * @param audio_spin
 * @text 声音 - 旋转碎片音效
 * @desc 旋转拼图碎片的音效
 * @type struct<audioObj>
 * @default 
 * @parent 拼图配置
 * 
 * @param audio_splice
 * @text 声音 - 拼合碎片音效
 * @desc 拼合拼图碎片时的音效
 * 拼合 : 拼图碎片放置到合适位置时，将固定到背景或与另一碎片锁定
 * @type struct<audioObj>
 * @default 
 * @parent 拼图配置
 * 
 * @param chip_init_limit_LU
 * @text 碎片初始位置限制-左上
 * @desc 限制碎片初始位置在 左/右侧的上/下部 一定距离不摆放
 * 左侧上部
 * @type number
 * @default 0
 * @parent 拼图配置
 * 
 * @param chip_init_limit_LD
 * @text 碎片初始位置限制-左下
 * @desc 限制碎片初始位置在 左/右侧的上/下部 一定距离不摆放
 * 左侧下部
 * @type number
 * @default 0
 * @parent 拼图配置
 * 
 * @param chip_init_limit_RU
 * @text 碎片初始位置限制-右上
 * @desc 限制碎片初始位置在 左/右侧的上/下部 一定距离不摆放
 * 右侧上部
 * @type number
 * @default 0
 * @parent 拼图配置
 * 
 * @param chip_init_limit_RD
 * @text 碎片初始位置限制-右下
 * @desc 限制碎片初始位置在 左/右侧的上/下部 一定距离不摆放
 * 右侧下部
 * @type number
 * @default 0
 * @parent 拼图配置
 * 
 * @param ==== under ====
 * 
 */
/*~struct~chip:
 * 
 * @param picture_chip
 * @text 碎片图片
 * @desc 碎片的图片
 * @type file
 * @dir img/pictures
 * @default 
 * 
 * @param picture_chip_sel
 * @text 碎片选中图片
 * @desc 碎片被选中时的图片
 * @type file
 * @dir img/pictures
 * @default 
 * 
 * @param chip_x
 * @text 碎片正确位置 X
 * @desc 完整拼图中 该碎片的位置 X
 * 相对于背景左上角的位置 X
 * @type number
 * @min -999999999999999
 * @default 
 * 
 * @param chip_y
 * @text 碎片正确位置 Y
 * @desc 完整拼图中 该碎片的位置 Y
 * 相对于背景左上角的位置 Y
 * @type number
 * @min -999999999999999
 * @default 
 * 
 * @param chip_w
 * @text 碎片 W
 * @desc 完整拼图中 该碎片的宽 W
 * 即有效宽度 默认为碎片图片的宽
 * @type number
 * @default 
 * 
 * @param chip_h
 * @text 碎片 H
 * @desc 完整拼图中 该碎片的高 H
 * 即有效高度 默认为碎片图片的高
 * @type number
 * @default 
 * 
 */
/*~struct~audioObj:
 * 
 * @param name
 * @text 声音文件
 * @desc 声音文件
 * @type file
 * @dir audio
 * @default 
 * 
 * @param volume
 * @text 音量
 * @desc 音量
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * 
 * @param pitch
 * @text 音调
 * @desc 音调
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * 
 * @param pan
 * @text 声像
 * @desc 声像
 * @type number
 * @min -100
 * @max 100
 * @default 0
 */





var MK_Plugins = MK_Plugins || {};
MK_Plugins.paramGet = MK_Plugins.paramGet || {};
MK_Plugins.param = MK_Plugins.param || {};
MK_Plugins.class = MK_Plugins.class || {};
MK_Plugins.datas = MK_Plugins.datas || {};

MK_Plugins.getPluginParam = MK_Plugins.getPluginParam ||
function (pluginName) {
	var param = PluginManager.parameters(pluginName);
	if (!param || JSON.stringify(param) === '{}') {
		var list = $plugins.filter(function (i) {
			return i.description.contains('<' + pluginName + '>');
		});
		for (var i = 0; i < list.length; i++) {
			var realPluginName = list[i].name;
			if (realPluginName !== pluginName)
				return PluginManager.parameters(realPluginName);
		}
		return {};
	}
	return param;
};





(function() {

	var pluginName = 'MK_MiniGame_Jigsaw';
	MK_Plugins.paramGet[pluginName] = MK_Plugins.getPluginParam(pluginName);
	MK_Plugins.param[pluginName] = {};

	var paramGet = MK_Plugins.paramGet[pluginName];
	var param = MK_Plugins.param[pluginName];

	function parse_chip(str, defstr) {
		str = str || defstr;
		try {
			data = JSON.parse(str);
		}
		catch(e) {
			data = (!defstr && str != defstr) ? arguments.callee(defstr) : {};
		}
		var res = {};
		res['picture_chip'] 	 = String(data['picture_chip']  	 || '');
		res['picture_chip_sel']	 = String(data['picture_chip_sel'] 	 || '');
		res['chip_x']        	 = Number(data['chip_x']        	 || 0);
		res['chip_y']        	 = Number(data['chip_y']        	 || 0);
		res['chip_w']        	 = Number(data['chip_w']        	 || 0);
		res['chip_h']        	 = Number(data['chip_h']        	 || 0);
		return res;
	}

	function parse_chips(str, defstr) {
		str = str || defstr;
		try {
			data = JSON.parse(str);
		}
		catch(e) {
			data = (!defstr && str != defstr) ? arguments.callee(defstr) : [];
		}
		res = data.map(s => parse_chip(s, '{}'));
		return res;
	}

	function parse_audioObj(str, defstr) {
		str = str || defstr;
		try {
			data = JSON.parse(str);
		}
		catch(e) {
			data = (!defstr && str != defstr) ? arguments.callee(defstr) : {};
		}
		var res = {};
		res['name'] 	 = String(data['name'] 	 ||  '');
		res['volume'] 	 = Number(data['volume'] ||  90);
		res['pitch'] 	 = Number(data['pitch']  || 100);
		res['pan']  	 = Number(data['pan'] 	 ||   0);
		return res;
	}

	param['jigsaw_chips']       	 = parse_chips(paramGet['jigsaw_chips'] 	 || '[]');

	param['picture_bg']         	 = String(paramGet['picture_bg']        	 || '');
	param['picture_cursor']     	 = String(paramGet['picture_cursor']    	 || '');
	param['picture_cursor_onpick'] 	 = String(paramGet['picture_cursor_onpick']  || '');
	param['picture_cursor_canpick']  = String(paramGet['picture_cursor_canpick'] || '');

	param['audio_jigsaw']       	 = parse_audioObj(paramGet['audio_jigsaw'] 	 || '{"name":"","volume":"90","pitch":"100","pan":"0"}');
	param['audio_pick']         	 = parse_audioObj(paramGet['audio_pick'] 	 || '{"name":"","volume":"90","pitch":"100","pan":"0"}');
	param['audio_put']          	 = parse_audioObj(paramGet['audio_put'] 	 || '{"name":"","volume":"90","pitch":"100","pan":"0"}');
	param['audio_spin']         	 = parse_audioObj(paramGet['audio_spin'] 	 || '{"name":"","volume":"90","pitch":"100","pan":"0"}');
	param['audio_splice']       	 = parse_audioObj(paramGet['audio_splice'] 	 || '{"name":"","volume":"90","pitch":"100","pan":"0"}');

	param['chip_init_limit_LU'] 	 = Number(paramGet['chip_init_limit_LU'] 	 ||  0);
	param['chip_init_limit_LD'] 	 = Number(paramGet['chip_init_limit_LD'] 	 ||  0);
	param['chip_init_limit_RU'] 	 = Number(paramGet['chip_init_limit_RU'] 	 ||  0);
	param['chip_init_limit_RD'] 	 = Number(paramGet['chip_init_limit_RD'] 	 ||  0);

	param['cursor_speed']       	 = Number(paramGet['cursor_speed']      	 ||  3);

	param['splice_tolerance']   	 = Number(paramGet['splice_tolerance']  	 || 6 );

	param['scene_pop_wait_time'] 	 = Number(paramGet['scene_pop_wait_time'] 	 || 60);

})();





//-----------------------------------------------------------------------------
// Scene_MiniGame_Jigsaw
// 拼图游戏场景

function Scene_MiniGame_Jigsaw() {
    this.initialize.apply(this, arguments);
};

Scene_MiniGame_Jigsaw.prototype = Object.create(Scene_Base.prototype);

Scene_MiniGame_Jigsaw.prototype.constructor = Scene_MiniGame_Jigsaw;



// --------------------------------
// 初始化

Scene_MiniGame_Jigsaw.prototype.initialize = function() {
	Scene_Base.prototype.initialize.apply(this, arguments);

	this._gameStarting = false;

	this._picking = false;
	this._pickChipId = -1;
};


Scene_MiniGame_Jigsaw.prototype.create = function() {
	this.setDefaultConfig();
	this.setAllByDefaultConfig();
};

Scene_MiniGame_Jigsaw.prototype.onSceneStart = function() {
	this.initJigsawRange();

	this.createBackgroundSprite();
	this.createChipContainerSprite();
	this.createAllChipSprite();
	this.createCursorSprite();
};


Scene_MiniGame_Jigsaw.prototype.initJigsawRange = function() {
	if (!!this._backgroundBitmap) {
		this._rangeW = this._backgroundBitmap.width ;
		this._rangeH = this._backgroundBitmap.height;
		this._rangeX = Math.floor((Graphics.boxWidth  - this._rangeW) / 2);
		this._rangeY = Math.floor((Graphics.boxHeight - this._rangeH) / 2);
	}
	else {
		this._rangeW = Graphics.boxWidth ;
		this._rangeH = Graphics.boxHeight;
		this._rangeX = 0;
		this._rangeY = 0;
	}
};

Scene_MiniGame_Jigsaw.prototype.initCompleteJigsawRectangle = function() {
	if (this._chips.length > 0) {
		this._compRectW = this._chips.map(chip => chip.x+chip.width ).reduce((a,b) => a>b?a:b);
		this._compRectH = this._chips.map(chip => chip.y+chip.height).reduce((a,b) => a>b?a:b);
	}
	else {
		this._compRectW = 0;
		this._compRectH = 0;
	}
};


Scene_MiniGame_Jigsaw.prototype.createBackgroundSprite = function() {
	var sprite = new Sprite(this._backgroundBitmap);
	sprite.anchor = new Point(0.5, 0.5);
	sprite.x = Math.floor(Graphics.boxWidth  / 2);
	sprite.y = Math.floor(Graphics.boxHeight / 2);
	this.addChild(this._backgroundSprite = sprite);
};


Scene_MiniGame_Jigsaw.prototype.createChipContainerSprite = function() {
	var sprite = new Sprite();
	sprite.x = this._rangeX;
	sprite.y = this._rangeY;
	this.addChild(this._chipContainerSprite = sprite);
};

Scene_MiniGame_Jigsaw.prototype.createAllChipSprite = function() {
	this._chipSpriteList = [];
	this._chips.forEach(function(chip, chipId) {
		var sprite = new Sprite(chip.picBitmap);
		sprite._chipId = chipId; // 需要可以 从 children 里的 sprite 获取 chipId
		sprite._rotationAngle = 0; // 旋转角度
		sprite._spliced = false; // 拼合状态(拼合背景)
		this._chipSpriteList.push(sprite);
		this._chipContainerSprite.addChild(sprite);
	}, this);
	this.refreshChipRectangle(); // 重新读取碎片宽高
	this.initChipPosition();
	this.initChipRotation();
};

Scene_MiniGame_Jigsaw.prototype.refreshChipRectangle = function() {
	this._chipSpriteList.forEach(function(sprite) {
		var chip = this._chips[sprite._chipId];
		chip.width  = chip.width  || chip.picBitmap.width;
		chip.height = chip.height || chip.picBitmap.height;
	}, this);
};


Scene_MiniGame_Jigsaw.prototype.shuffleArray = function(arr) {
	if (Array.isArray(arr)) {
		var tmp;
		for (var i = arr.length-1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i+1));
			i != j && (tmp = arr[j], arr[j] = arr[i], arr[i] = tmp);
		}
		return arr;
	}
	else {
		return arr;
	}
};

Scene_MiniGame_Jigsaw.prototype.initChipPosition = function() {
	if (this._chips.length <= 0) return ;

	var totalHeight = this._chips.map(chip => chip.height).reduce((a,b) => a+b);
	var lRangeH = this._rangeH - this._chipInitLimitLU - this._chipInitLimitLD;
	var rRangeH = this._rangeH - this._chipInitLimitRU - this._chipInitLimitRD;
	lRangeH = lRangeH < 0 ? 0 : lRangeH;
	rRangeH = rRangeH < 0 ? 0 : rRangeH;
	var targetHeight = Math.round(totalHeight * Math.min(lRangeH, rRangeH) / (lRangeH + rRangeH));
	var heightList = this._chips.map(function(chip,i) {
									return {'height' : chip.height, 'chip' : chip, 'id' : i}
								})
								.sort((o1,o2) => o2.height - o1.height
												  ? o2.height - o1.height
												  : Math.random() < 0.5 ? -1 : 1);

	var dp = [ [ {height: 0, flag: ''} ] ];
	for (var index = 0; index < heightList.length; index++) {
		dp[index + 1] = [];
		for (var j = 0; j < dp[index].length; j++) {
			if (dp[index][j].height + heightList[index].height <= targetHeight) {
				dp[index + 1].push({
					height: dp[index][j].height + heightList[index].height,
					flag: dp[index][j].flag + '1',
				});
			}
			dp[index + 1].push({
				height: dp[index][j].height, 
				flag: dp[index][j].flag + '0',
			});
		}
		dp[index + 1].sort((a,b) => b.height - a.height);
	}

	var targetDpList = dp[heightList.length];
	targetDpList = (function(lmt) {
		return targetDpList.filter((o) => o.height >= lmt);
	})( (dp[heightList.length][0].height || 0) * 0.98 );
	var targetDp = targetDpList[Math.floor(Math.random() * targetDpList.length)];

	var leftList  = targetDp.flag.split('')
						.map((flag, i) => flag == '1' ? i : -1)
						.filter(index => index >= 0)
						.map(index => heightList[index]);
	var rightList = targetDp.flag.split('')
						.map((flag, i) => flag == '0' ? i : -1)
						.filter(index => index >= 0)
						.map(index => heightList[index]);

	if (leftList.length > 0) {
		leftList = this.shuffleArray(leftList);
		var totalHeightL = leftList.map(obj => obj.chip.height).reduce((a,b) => a+b);
		var spaceHeightL = lRangeH - totalHeightL;
		var spacePerL = spaceHeightL / (leftList.length + 1);
		var sumHeight = this._chipInitLimitLU;
		leftList.forEach(function(obj, i) {
			var sprite = this._chipSpriteList[obj.id];
			sprite.x = 0;
			sumHeight += spacePerL;
			sprite.y = sumHeight;
			sumHeight += obj.chip.height;
		}, this);
	}
	if (rightList.length > 0) {
		rightList = this.shuffleArray(rightList);
		var totalHeightR = rightList.map(obj => obj.chip.height).reduce((a,b) => a+b);
		var spaceHeightR = rRangeH - totalHeightR;
		var spacePerR = spaceHeightR / (rightList.length + 1);
		var sumHeight = this._chipInitLimitRU;
		rightList.forEach(function(obj, i) {
			var sprite = this._chipSpriteList[obj.id];
			sprite.x = this._rangeW - obj.chip.width;
			sumHeight += spacePerR;
			sprite.y = sumHeight;
			sumHeight += obj.chip.height;
		}, this);
	}
};

Scene_MiniGame_Jigsaw.prototype.initChipRotation = function() {
	this._chipSpriteList.forEach(function(sprite) {
		var spinCount = Math.floor(Math.random() * 4);
		for (var i = 0; i < spinCount; i++) {
			this.spinChipSprite(sprite);
		}
	}, this);
};

Scene_MiniGame_Jigsaw.prototype.createCursorSprite = function() {
	var sprite = new Sprite(this._cursorPicBitmap);
	sprite.anchor = new Point(0.5, 0.5);
	sprite.x = Math.floor(Graphics.boxWidth  / 2);
	sprite.y = Math.floor(Graphics.boxHeight / 2);
	this.addChild(this._cursorSprite = sprite);
};



// --------------------------------
// 初始化配置

{
	var pluginName = 'MK_MiniGame_Jigsaw';
	var param = MK_Plugins.param[pluginName];

	Scene_MiniGame_Jigsaw.DEFAULT_CONFIG = JSON.parse(JSON.stringify(param));
	var config = Scene_MiniGame_Jigsaw.DEFAULT_CONFIG;
}

Scene_MiniGame_Jigsaw.prototype.setDefaultConfig = function() {
	var config = this.constructor.DEFAULT_CONFIG;
	this._config = JSON.parse(JSON.stringify(config));
	return this._config;
};

Scene_MiniGame_Jigsaw.prototype.setAllByDefaultConfig = function() {
	var config = this._config;

	this.setCursorSpeed(config['cursor_speed']);
	this.setSpliceTolerance(config['splice_tolerance']);
	this.setScenePopWaitTime(config['scene_pop_wait_time']);

	this.setChips(config['jigsaw_chips']);

	this.setImageBackground(config['picture_bg']);
	this.setImageCursorPic(config['picture_cursor']);
	this.setImageCursorOnpickPic(config['picture_cursor_onpick']);
	this.setImageCursorCanpickPic(config['picture_cursor_canpick']);

	this.setAudioBgm(config['audio_jigsaw']);
	this.setAudioPick(config['audio_pick']);
	this.setAudioPut(config['audio_put']);
	this.setAudioSpin(config['audio_spin']);
	this.setAudioSplice(config['audio_splice']);

	this.setChipInitLimitLU(config['chip_init_limit_LU']);
	this.setChipInitLimitLD(config['chip_init_limit_LD']);
	this.setChipInitLimitRU(config['chip_init_limit_RU']);
	this.setChipInitLimitRD(config['chip_init_limit_RD']);
};


Scene_MiniGame_Jigsaw.prototype.setCursorSpeed = function(speed) {
	this._cursorSpeed = speed;
};

Scene_MiniGame_Jigsaw.prototype.setSpliceTolerance = function(tolerance) {
	this._spliceTolerance = tolerance;
};

Scene_MiniGame_Jigsaw.prototype.setScenePopWaitTime = function(waitTime) {
	this._scenePopWaitTime = waitTime;
};

Scene_MiniGame_Jigsaw.prototype.createImageBitmap = function(name) {
	return !!name ? ImageManager.loadPicture(name) : null;
};

Scene_MiniGame_Jigsaw.prototype.setChips = function(list) {
	this._chips = list.map(function(obj) {
		var chip = {};
		chip.picBitmap = this.createImageBitmap(chip.picName = obj['picture_chip']);
		chip.selPicBitmap = this.createImageBitmap(chip.selPicName = obj['picture_chip_sel']);
		chip.x      = obj['chip_x'] || 0;
		chip.y      = obj['chip_y'] || 0;
		chip.width  = obj['chip_w'] || chip.picBitmap.width;
		chip.height = obj['chip_h'] || chip.picBitmap.height;
		return chip;
	}, this);
};

Scene_MiniGame_Jigsaw.prototype.setImageBackground = function(name) {
	this._backgroundBitmap = this.createImageBitmap(this._backgroundName = name);
};
Scene_MiniGame_Jigsaw.prototype.setImageCursorPic = function(name) {
	this._cursorPicBitmap = this.createImageBitmap(this._cursorPicName = name);
};
Scene_MiniGame_Jigsaw.prototype.setImageCursorOnpickPic = function(name) {
	this._cursorOnpickPicBitmap = this.createImageBitmap(this._cursorOnpickPicName = name);
};
Scene_MiniGame_Jigsaw.prototype.setImageCursorCanpickPic = function(name) {
	this._cursorCanpickPicBitmap = this.createImageBitmap(this._cursorCanpickPicName = name);
};

Scene_MiniGame_Jigsaw.prototype.makeEmptyAudioObject = function(name) {
	var obj = AudioManager.makeEmptyAudioObject();
    obj['name'] = name;
    obj['volume'] = 90;
    obj['pitch'] = 100;
    obj['pan'] = 0;
    return obj;
};

Scene_MiniGame_Jigsaw.prototype.setAudioBgm = function(obj) {
	obj = this._bgmAudioObject = obj || this.makeEmptyAudioObject('');
	var tmp = (obj.name || '').split('/');
	obj.type = tmp.shift() || '';
	obj.name = tmp.join('/') || '';
};

Scene_MiniGame_Jigsaw.prototype.setAudioPick = function(obj) {
	obj = this._pickAudioObject = obj || this.makeEmptyAudioObject('');
	var tmp = (obj.name || '').split('/');
	obj.type = tmp.shift() || '';
	obj.name = tmp.join('/') || '';
};

Scene_MiniGame_Jigsaw.prototype.setAudioPut = function(obj) {
	obj = this._putAudioObject = obj || this.makeEmptyAudioObject('');
	var tmp = (obj.name || '').split('/');
	obj.type = tmp.shift() || '';
	obj.name = tmp.join('/') || '';
};

Scene_MiniGame_Jigsaw.prototype.setAudioSpin = function(obj) {
	obj = this._spinAudioObject = obj || this.makeEmptyAudioObject('');
	var tmp = (obj.name || '').split('/');
	obj.type = tmp.shift() || '';
	obj.name = tmp.join('/') || '';
};

Scene_MiniGame_Jigsaw.prototype.setAudioSplice = function(obj) {
	obj = this._spliceAudioObject = obj || this.makeEmptyAudioObject('');
	var tmp = (obj.name || '').split('/');
	obj.type = tmp.shift() || '';
	obj.name = tmp.join('/') || '';
};


Scene_MiniGame_Jigsaw.prototype.setChipInitLimitLU = function(num) {
	this._chipInitLimitLU = num || 0;
};
Scene_MiniGame_Jigsaw.prototype.setChipInitLimitLD = function(num) {
	this._chipInitLimitLD = num || 0;
};
Scene_MiniGame_Jigsaw.prototype.setChipInitLimitRU = function(num) {
	this._chipInitLimitRU = num || 0;
};
Scene_MiniGame_Jigsaw.prototype.setChipInitLimitRD = function(num) {
	this._chipInitLimitRD = num || 0;
};




// --------------------------------
// 音效

Scene_MiniGame_Jigsaw.prototype.playAudio = function(audioObj) {
	if (!!audioObj && !!audioObj.name && !!audioObj.type) {
		switch (audioObj.type) {
			case 'bgm': AudioManager.playBgm(audioObj); break;
			case 'bgs': AudioManager.playBgs(audioObj); break;
			case 'me': AudioManager.playMe(audioObj); break;
			case 'se': AudioManager.playSe(audioObj); break;
		}
	}
};

Scene_MiniGame_Jigsaw.prototype.playBgm = function() {
	this.playAudio(this._bgmAudioObject);
};

Scene_MiniGame_Jigsaw.prototype.playPickAudio = function() {
	this.playAudio(this._pickAudioObject);
};

Scene_MiniGame_Jigsaw.prototype.playPutAudio = function() {
	this.playAudio(this._putAudioObject);
};

Scene_MiniGame_Jigsaw.prototype.playSpinAudio = function() {
	this.playAudio(this._spinAudioObject);
};

Scene_MiniGame_Jigsaw.prototype.playSpliceAudio = function() {
	this.playAudio(this._spliceAudioObject);
};


Scene_MiniGame_Jigsaw.prototype.stopBgm = function() {
	if (!!this._bgmAudioObject.name) {
		AudioManager.stopBgm();
	}
};



// --------------------------------
// 光标移动、显示、隐藏、切换图片

Scene_MiniGame_Jigsaw.prototype.cursorMoveTo = function(x, y) {
	x = x < this._rangeX ? this._rangeX : x;
	x = x > this._rangeX + this._rangeW ? this._rangeX + this._rangeW : x;
	y = y < this._rangeY ? this._rangeY : y;
	y = y > this._rangeY + this._rangeH ? this._rangeY + this._rangeH : y;
	this._cursorSprite.x = Math.floor(x);
	this._cursorSprite.y = Math.floor(y);
};

Scene_MiniGame_Jigsaw.prototype.cursorMove = function(offsetX, offsetY) {
	var x = this._cursorSprite.x + offsetX;
	var y = this._cursorSprite.y + offsetY;
	this.cursorMoveTo(x, y);
};

Scene_MiniGame_Jigsaw.prototype.cursorSpeed = function() {
	return this._cursorSpeed;
};


Scene_MiniGame_Jigsaw.prototype.showCursor = function() {
	this._cursorSprite.visible = true;
};

Scene_MiniGame_Jigsaw.prototype.hideCursor = function() {
	this._cursorSprite.visible = false;
};


Scene_MiniGame_Jigsaw.prototype.changeCursorNormal = function() {
	if (this._cursorSprite.bitmap != this._cursorPicBitmap) {
		this._cursorSprite.bitmap = this._cursorPicBitmap;
	}
};

Scene_MiniGame_Jigsaw.prototype.changeCursorOnpick = function() {
	if (this._cursorSprite.bitmap != this._cursorOnpickPicBitmap) {
		this._cursorSprite.bitmap = this._cursorOnpickPicBitmap;
	}
};

Scene_MiniGame_Jigsaw.prototype.changeCursorCanpick = function() {
	if (this._cursorSprite.bitmap != this._cursorCanpickPicBitmap) {
		this._cursorSprite.bitmap = this._cursorCanpickPicBitmap;
	}
};



// --------------------------------
// 碎片移动、图像层级、切换图片

Scene_MiniGame_Jigsaw.prototype.chipSpriteMoveTo = function(chipId, x, y) {
	var sprite = this._chipSpriteList[chipId];
	if (!sprite) return ;
	var chip = this._chips[chipId];
	var transform = sprite.worldTransform || sprite.localTransform;
	if (!transform) {
		console.error('do not have transform', 'sprite : ', sprite);
		return false;
	}
	var point1 = transform.apply(new Point(0, 0));
	var point2 = transform.apply(new Point(chip.width, chip.height));

	var x1 = point1.x < point2.x ? point1.x : point2.x;
	var x2 = point1.x > point2.x ? point1.x : point2.x;
	var y1 = point1.y < point2.y ? point1.y : point2.y;
	var y2 = point1.y > point2.y ? point1.y : point2.y;

	var realX = x1;
	var realY = y1;
	var realW = x2 - x1;
	var realH = y2 - y1;

	var minx = this._rangeX - realX + sprite.x;
	var maxx = this._rangeX + this._rangeW - realW - realX + sprite.x;
	var miny = this._rangeY - realY + sprite.y;
	var maxy = this._rangeY + this._rangeH - realH - realY + sprite.y;
	x = x < minx ? minx : x;
	x = x > maxx ? maxx : x;
	y = y < miny ? miny : y;
	y = y > maxy ? maxy : y;
	sprite.x = Math.round(x);
	sprite.y = Math.round(y);
}; 

Scene_MiniGame_Jigsaw.prototype.chipSpriteMove = function(chipId, offsetX, offsetY) {
	var sprite = this._chipSpriteList[chipId];
	if (!sprite) return ;
	var x = sprite.x + offsetX;
	var y = sprite.y + offsetY;
	this.chipSpriteMoveTo(chipId, x, y);
};


// 设置碎片图像到最上层
Scene_MiniGame_Jigsaw.prototype.chipSpriteTop = function(index) {
	var container = this._chipContainerSprite;
	var sprite = container.children[index];
	!!sprite && container.addChild(sprite);
};


Scene_MiniGame_Jigsaw.prototype.changeChipNormal = function(chipId) {
	var chip = this._chips[chipId];
	var sprite = this._chipSpriteList[chipId];
	if (!chip || !sprite) return ;
	if (sprite.bitmap != chip.picBitmap) {
		sprite.bitmap = chip.picBitmap;
	}
};

Scene_MiniGame_Jigsaw.prototype.changeChipOnpick = function(chipId) {
	var chip = this._chips[chipId];
	var sprite = this._chipSpriteList[chipId];
	if (!chip || !sprite) return ;
	if (sprite.bitmap != chip.selPicBitmap) {
		sprite.bitmap = chip.selPicBitmap;
	}
};



// --------------------------------
// 拿起放下操作

Scene_MiniGame_Jigsaw.prototype.pickOrPutChip = function() {
	if (this.isPicking()) {
		this.putChip();
	}
	else {
		var children = this._chipContainerSprite.children;
		for (var i = children.length-1; i >= 0; i--) {
			if (!children[i]._spliced && this.checkCursorOnChipSprite(children[i])) {
				this.pickChip(children[i]._chipId);
				this.chipSpriteTop(i);
				break;
			}
		}
	}
};


Scene_MiniGame_Jigsaw.CLICK_IMAGE_ALPHA_THRESHOLD = 31; 
Scene_MiniGame_Jigsaw.CLICK_IMAGE_CHECK_RADIUS = 3; 
Scene_MiniGame_Jigsaw.prototype.checkClickImage = function(bitmap, cx, cy) {
	if (!bitmap) return false;
	var r = this.constructor.CLICK_IMAGE_CHECK_RADIUS, d = r + 1 + r;
	var data = bitmap._context.getImageData(cx-r, cy-r, d, d).data;
	var sum = 0;
	for (var i = data.length-1; i >= 0; i -= 4) {
		sum += data[i];
	}
	return sum / d / d >= this.constructor.CLICK_IMAGE_ALPHA_THRESHOLD;
}; 

Scene_MiniGame_Jigsaw.prototype.checkClickChipSprite = function(sprite, x, y) {
	var transform = sprite.worldTransform || sprite.localTransform;
	if (!transform) {
		console.error('do not have transform', 'sprite : ', sprite);
		return false;
	}
	var point = transform.applyInverse(new Point(x, y));
	return this.checkClickImage(sprite.bitmap, point.x, point.y);
};

Scene_MiniGame_Jigsaw.prototype.checkCursorOnChipSprite = function(sprite) {
	return this.checkClickChipSprite(sprite, this._cursorSprite.x, this._cursorSprite.y);
};

Scene_MiniGame_Jigsaw.prototype.checkCursorCanPick = function() {
	var children = this._chipContainerSprite.children;
	for (var i = children.length-1; i >= 0; i--) {

		if (!children[i]._spliced && this.checkCursorOnChipSprite(children[i])) {
			return true;
		}
	}
	return false;
}; 


Scene_MiniGame_Jigsaw.prototype.pickChip = function(chipId) {
	this._picking = true;
	this._pickChipId = chipId;
	this.changeCursorOnpick();
	this.changeChipOnpick(chipId);

	this.onPickChip(chipId);
};

Scene_MiniGame_Jigsaw.prototype.putChip = function() {
	var chipId = this.getPickedChipId();
	this.changeChipNormal(chipId);

	this._picking = false;
	this._pickChipId = -1;

	this.onPutChip(chipId);
	this.refreshCursorBitmap();
};


Scene_MiniGame_Jigsaw.prototype.isPicking = function() {
	return this._picking;
};

Scene_MiniGame_Jigsaw.prototype.getPickedChipSprite = function() {
	return this._chipSpriteList[this._pickChipId];
};

Scene_MiniGame_Jigsaw.prototype.getPickedChipId = function() {
	return this._pickChipId;
};


Scene_MiniGame_Jigsaw.prototype.onPickChip = function(chipId) {
	this.playPickAudio();
};

Scene_MiniGame_Jigsaw.prototype.onPutChip = function(chipId) {
	this.playPutAudio();
	this.spliceChipIfCan(chipId);
};



// --------------------------------
// 移动操作

Scene_MiniGame_Jigsaw.prototype.cursorMoveToWithPickChip = function(x, y) {
	if (this.isPicking() && this.getPickedChipSprite()) {

		var chipId = this.getPickedChipId();
		var oldX = this._cursorSprite.x;
		var oldY = this._cursorSprite.y;
		this.cursorMoveTo(x, y);
		var offsetX = this._cursorSprite.x - oldX;
		var offsetY = this._cursorSprite.y - oldY;
		this.chipSpriteMoveTo(chipId, offsetX, offsetY);
	}
	else {
		this.cursorMoveTo(x, y);
	}
};

Scene_MiniGame_Jigsaw.prototype.cursorMoveWithPickChip = function(offsetX, offsetY) {
	if (this.isPicking() && this.getPickedChipSprite()) {
		var chipId = this.getPickedChipId();
		var oldX = this._cursorSprite.x;
		var oldY = this._cursorSprite.y;
		this.cursorMove(offsetX, offsetY);

		var realOffsetX = this._cursorSprite.x - oldX;
		var realOffsetY = this._cursorSprite.y - oldY;
		this.chipSpriteMove(chipId, realOffsetX, realOffsetY);
	}
	else {
		this.cursorMove(offsetX, offsetY);
	}
};


Scene_MiniGame_Jigsaw.prototype.updateCursorMove = function() {
	if (this.isGameStarting()) {
		var move = false;
		!move && (move = this.updateCursorMoveByInput());
		!!move && this.onCursorMove();
	}
};

Scene_MiniGame_Jigsaw.prototype.updateCursorMoveByTouchInput = function() {
	if (TouchInput.isPressed()) {
		this.cursorMoveToWithPickChip(TouchInput.x, TouchInput.y);
		return true;
	}
	return false;
};

Scene_MiniGame_Jigsaw.prototype.updateCursorMoveByInput = function() {
	var movementX = 0;
	var movementY = 0;
	if (Input.isPressed('left')) {
		movementX -= 1;
    }
    if (Input.isPressed('right')) {
		movementX += 1;
    }
    if (Input.isPressed('up')) {
		movementY -= 1;
    }
    if (Input.isPressed('down')) {
		movementY += 1;
    }
    
    if (movementX != 0 || movementY != 0) {
    	movementX *= this.cursorSpeed();
    	movementY *= this.cursorSpeed();

		this.cursorMoveWithPickChip(movementX, movementY);
		return true;
    }
    return false;
};


Scene_MiniGame_Jigsaw.prototype.onCursorMove = function() {
	this.refreshCursorBitmap();
};

Scene_MiniGame_Jigsaw.prototype.refreshCursorBitmap = function() {
	if (!this.isPicking()) {
		if (this.checkCursorCanPick()) {
			this.changeCursorCanpick();
		}
		else {
			this.changeCursorNormal();
		}
	}
	else {
		this.changeCursorOnpick();
	}
};



// --------------------------------
// 旋转操作

Scene_MiniGame_Jigsaw.prototype.spinChip = function() {
	var sprite = this.getPickedChipSprite();
	if (this.isPicking() && !!sprite) {

		this.spinChipSpriteByCursor(sprite);

		this.onSpinChip();
	}
};

Scene_MiniGame_Jigsaw.prototype.spinChipSprite = function(sprite, x0, y0) {
	if (!sprite) return ;
	if (typeof x0 == 'undefined' || typeof y0 == 'undefined') {

		sprite.updateTransform();
		var transform = sprite.worldTransform || sprite.localTransform;
		if (!transform) {
			console.error('do not have transform', 'sprite : ', sprite);
			return ;
		}
		var center = transform.apply(new Point(
			Math.floor(sprite.width / 2), Math.floor(sprite.height / 2)));
		x0 = center.x;
		y0 = center.y;
	}

	var x1 = sprite.x;
	var y1 = sprite.y;

	var aw = sprite.width;
	var ah = sprite.height;

	var x2 = x0 + y0 - y1;
	var y2 = y0 - x0 + x1;
	sprite.x = x2;
	sprite.y = y2;

	sprite._rotationAngle = (sprite._rotationAngle + 90) % 360;
	sprite.rotation = sprite._rotationAngle / 180 * Math.PI;
};

Scene_MiniGame_Jigsaw.prototype.spinChipSpriteByCursor = function(sprite) {
	var cursor = this._cursorSprite;
	this.spinChipSprite(sprite, cursor.x, cursor.y);
};

Scene_MiniGame_Jigsaw.prototype.onSpinChip = function() {
	this.playSpinAudio();
};



// --------------------------------
// 拼合检测

Scene_MiniGame_Jigsaw.prototype.spliceTolerance = function() {
	return this._spliceTolerance;
};

Scene_MiniGame_Jigsaw.prototype.checkChipSpliceBackground = function(chipId) {
	var sprite = this._chipSpriteList[chipId];
	var chip = this._chips[chipId];
	if (!sprite || !chip) return false;
	if (sprite._rotationAngle != 0) return false;

	var tolerance = this.spliceTolerance();
	var dx = chip.x - sprite.x;
	var dy = chip.y - sprite.y;
	if (dx * dx + dy * dy <= tolerance * tolerance) {
		return true;
	}
	return false;
};

Scene_MiniGame_Jigsaw.prototype.checkAllChipSpliceBackground = function() {
	return this._chips.every((chip,chipId) => this.checkChipSpliceBackground(chipId), this);
};


Scene_MiniGame_Jigsaw.prototype.chipIsSpliced = function(chipId) {
	return this._chipSpriteList[chipId] && this._chipSpriteList[chipId]._spliced;
};

Scene_MiniGame_Jigsaw.prototype.allChipIsSpliced = function() {
	return this._chipSpriteList.every(s => s._spliced);
};



// --------------------------------
// 拼合

Scene_MiniGame_Jigsaw.prototype.chipSpliceBackground = function(chipId) {
	var sprite = this._chipSpriteList[chipId];
	var chip = this._chips[chipId];
	if (!sprite || !chip) return false;

	sprite.x = chip.x;
	sprite.y = chip.y;
	sprite.rotation = sprite._rotationAngle = 0;
	sprite._spliced = true;

	this.onSpliceChip(chipId);
};

Scene_MiniGame_Jigsaw.prototype.spliceChipIfCan = function(chipId) {
	if (true) { 
		if (!this.isPicking() || this.getPickedChipId != chipId) {
			if (this.checkChipSpliceBackground(chipId)) {
				this.chipSpliceBackground(chipId);
			}
		}
	}
	else {

	}
};

Scene_MiniGame_Jigsaw.prototype.onSpliceChip = function(chipId) {
	this.playSpliceAudio();

	if (this.checkGameSuccess()) {
		this.gameSuccessEnd();
	}
};



// --------------------------------
// 游戏状态控制

Scene_MiniGame_Jigsaw.prototype.startGame = function() {
	this._gameStarting = true;
	this.playBgm();
};

Scene_MiniGame_Jigsaw.prototype.terminateGame = function() {
	this._gameStarting = false;
	this.stopBgm();
};

Scene_MiniGame_Jigsaw.prototype.isGameStarting = function() {
	return this._gameStarting;
};


Scene_MiniGame_Jigsaw.prototype.start = function() {
	Scene_Base.prototype.start.apply(this, arguments);
	this.onSceneStart();
	this.startFadeIn(this.slowFadeSpeed(), false);
	this.startGame();
};

Scene_MiniGame_Jigsaw.prototype.terminate = function() {
	Scene_Base.prototype.terminate.apply(this, arguments);
	this.terminateGame();
};

Scene_MiniGame_Jigsaw.prototype.stop = function() {
	Scene_Base.prototype.stop.apply(this, arguments);
	this.startFadeOut(this.slowFadeSpeed(), false);
};


Scene_MiniGame_Jigsaw.prototype.checkGameSuccess = function() {
	return this.allChipIsSpliced();
};

Scene_MiniGame_Jigsaw.prototype.gameSuccessEnd = function() {
	this._needScenePop = true;
	this._scenePopWaitCount = 0;
	this._gameStarting = false;
};


Scene_MiniGame_Jigsaw.prototype.updateGameStatus = function() {
	if (!!this._needScenePop) {
		if (this._scenePopWaitCount >= this._scenePopWaitTime) {
			SceneManager.pop();
			this._needScenePop = false;
		}
		this._scenePopWaitCount++;
	}
};



// --------------------------------
// 帧更新

Scene_MiniGame_Jigsaw.prototype.update = function() {
	Scene_Base.prototype.update.apply(this, arguments);

	this.updateCursorMove();
	this.processHandling();
	this.updateGameStatus();
};

Scene_MiniGame_Jigsaw.prototype.processHandling = function() {
    if (this.isGameStarting()) {
        if (Input.isRepeated('ok')) {
        	this.pickOrPutChip();
        }
        else if (Input.isRepeated('cancel')) {
        	this.spinChip(); // 取消键 旋转
        }
    }
    else {

    }
};



// --------------------------------
// 插件指令

(function() {
	var _MK_Game_Interpreter_pluginCommand   = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function (command, args) {
		_MK_Game_Interpreter_pluginCommand.apply(this, arguments);

		if ((command || '').toLocaleLowerCase() == 'MiniGame_Jigsaw'.toLocaleLowerCase()) {
			if ((args[0] || '').toLocaleLowerCase() == 'start'.toLocaleLowerCase()) {
				SceneManager.push(Scene_MiniGame_Jigsaw);
			}
		}
	};
})();



MK_Plugins.class['Scene_MiniGame_Jigsaw'] = Scene_MiniGame_Jigsaw;




