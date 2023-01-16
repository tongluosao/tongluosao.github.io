//=============================================================================
// MK_ScreenEffectOptimize.js
// 
//=============================================================================
//  author : Mikan 
//  plugin : MK_ScreenEffectOptimize.js ScreenEffect优化
// version : v1.0.3 2020/07/26 修复了人物气泡异常的问题
// ------------------------------------------------------------------------------
// [Twitter] https://twitter.com/_MikanHako/
//  [GitHub] https://github.com/MikanHako1024/
//    [Blog] NONE
//=============================================================================




/*:
 * @plugindesc ScreenEffect优化 <MK_ScreenEffectOptimize>
 * @author Mikan 
 * @version v1.0.3 2020/07/26 修复了人物气泡异常的问题
 * v1.0.2 2020/07/22 修复了事件修改层级后，不更新的问题
 * v1.0.1 2020/07/22 更新了优化方法，允许了keepColor
 * v1.0.0 2020/07/22 完成简单的优化
 * v0.0.1 2020/07/17 项目计划中
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
 * 尝试对 插件ScreenEffect(@author 冷血) 进行优化
 * 需要有 插件ScreenEffect 的前置
 * 
 * 在多事件的地图可以提高帧数，但帧数可能会有点波动
 * 
 * 
 * ---- 插件指令 ----
 * 
 *   # xxx.
 *   xxx
 *   ex : xxx
 * 
 * 
 * 
 * ---- 使用方法 ----
 * 
 * TODO
 * 
 * 
 * 
 * ---- 其他说明 ----
 * 
 * 优化1 : 避免对每一个事件都设置滤镜，而是把事件用容器做父对象，对父对象设置滤镜
 * 
 * 缺点1 : 对事件的单独设置，如保留颜色，将会无效
 * 
 * 
 * 
 * ---- 标签设置 ----
 * 
 * TODO
 * 
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
 * 更多优化，和消除缺点
 * 
 * 
 */



(function() {


var _MK_Tilemap__createLayers   = Tilemap.prototype._createLayers;
Tilemap.prototype._createLayers = function() {
	_MK_Tilemap__createLayers.apply(this, arguments);
	this.createCharaterLayer();
};

var _MK_ShaderTilemap__createLayers   = ShaderTilemap.prototype._createLayers;
ShaderTilemap.prototype._createLayers = function() {
	_MK_ShaderTilemap__createLayers.apply(this, arguments);
	this.createCharaterLayer();
};


Tilemap.prototype.createCharaterLayer = function() {
	if (!this._characterLayers) {
		this._characterLayers = [];
		this.addChild(this.addCharaterLayer());
	}
};


Tilemap.prototype.addCharaterLayer = function() {
	var layer = new Sprite();
	if (this._characterLayers.length > 0) {
		if (this._characterLayers[0]._filters) {
			layer._filters = this._characterLayers[0]._filters.concat();
		}
	}
	this._characterLayers.push(layer);
	return layer;
};

Tilemap.prototype.setCharaterLayerNum = function(num) {
	num = num <= 0 ? 1 : num;
	if (!this._characterLayers) this._characterLayers = [];

	var removeLayers = this._characterLayers.splice(num);
	this._characterLayers = this._characterLayers.splice(0, num);

	if (this._characterLayers.length < num) {
		for (var i = this._characterLayers.length; i <= num; i++) {
			this.addCharaterLayer();
		}
	}
	else if (removeLayers.length > 0) {
		this.removeChild(...removeLayers);
	}
};


var _MK_Spriteset_Map_createCharacters   = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	_MK_Spriteset_Map_createCharacters.apply(this, arguments);

	for (var i = 0; i < this._characterSprites.length; i++) {
		var sprite = this._characterSprites[i];
		if (sprite._character === $gamePlayer) {
			this._tilemap._gamePlayer = sprite;
		}
		else {
			if (typeof sprite.z !== 'undefined') {
				this._tilemap.removeChild(sprite);
				this._tilemap._characterLayers[0].addChild(sprite);
			}
		}
	}
};

var _MK_Spriteset_Map_updateTilemap   = Spriteset_Map.prototype.updateTilemap;
Spriteset_Map.prototype.updateTilemap = function() {
	_MK_Spriteset_Map_updateTilemap.apply(this, arguments);
	this._tilemap.updateTransform();
};


Tilemap.prototype.spriteNeedLonely = function(sprite) {
	if (!sprite) return true;
	if (!(sprite instanceof Sprite_Character)) return false;
	if (sprite === this._gamePlayer) return true; // Game_Player
	if (sprite._character instanceof Game_Event) { // Game_Event
		var keepColor = sprite._character.event().meta.keepColor; // keepColor
		return keepColor;
	}
	return false; // 其他 Sprite_Character
};


var _MK_Tilemap_sortChildren    = Tilemap.prototype._sortChildren;
Tilemap.prototype._sortChildren = function() {
	_MK_Tilemap_sortChildren.apply(this, arguments);

	var sorted = [];
	this._characterLayers.forEach(function(layer) {
		this.removeChild(layer);
		sorted = sorted.concat(layer.children);
	}, this);
	sorted = sorted.concat(this.children);
	sorted.sort(this._compareChildOrder.bind(this));

	var children = [];
	var container = [];
	var containerList = [];
	var containerIndex = [];
	var lastSpriteNeedLonely = false;

	for (var i = 0; i < sorted.length; i++) {
		var sprite = sorted[i];
		if (this.spriteNeedLonely(sprite)) {
			if (!lastSpriteNeedLonely) {
				children.push(null);
				containerIndex.push(children.length - 1);

				containerList.push(container);
				container = [];
			}

			children.push(sprite);
			lastSpriteNeedLonely = true;
		}
		else {
			container.push(sprite);
			lastSpriteNeedLonely = false;
		}
	}

	if (!lastSpriteNeedLonely) {
		children.push(null);
		containerIndex.push(children.length - 1);

		containerList.push(container);
		container = [];
	}

	this.setCharaterLayerNum(containerList.length);
	if (containerList.length > 0) {
		for (var i = 0; i < containerList.length; i++) {
			this._characterLayers[i].removeChildren();
			this._characterLayers[i].addChild(...containerList[i]);
			children[containerIndex[i]] = this._characterLayers[i];
		}
	}
	else {
		children.push(this._characterLayers[0]);
	}

	this.removeChildren();
	this.addChild(...children);
};


var _MK_Sprite_Character_endBalloon   = Sprite_Character.prototype.endBalloon;
Sprite_Character.prototype.endBalloon = function() {
    if (this._balloonSprite) {
        this._balloonSprite.parent.removeChild(this._balloonSprite);
        this._balloonSprite = null;
    }
	_MK_Sprite_Character_endBalloon.apply(this, arguments);
};


})();


