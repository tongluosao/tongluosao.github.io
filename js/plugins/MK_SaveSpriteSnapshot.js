//=============================================================================
// MK_SaveSpriteSnapshot.js
// 
//=============================================================================
//  author : Mikan 
//  plugin : MK_SaveSpriteSnapshot.js 保存图像快照
// version : v1.0.2 2020/07/19 增加了对显卡配置的收集
// ------------------------------------------------------------------------------
// [Twitter] https://twitter.com/_MikanHako/
//  [GitHub] https://github.com/MikanHako1024/
//    [Blog] NONE
//=============================================================================




/*:
 * @plugindesc 保存图像快照 <MK_SaveSpriteSnapshot>
 * @author Mikan 
 * @version v1.0.2 2020/07/19 增加了对显卡配置的收集
 * v1.0.1 2020/07/17 修复了一些数据错误，添加了一些新数据
 * v1.0.0 2020/07/17 完成基本功能
 * v0.0.1 2020/07/16 项目计划中
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
 * 临时用 收集场景信息
 * 按下 Ctrl + F9 可保存场景快照
 * 
 * 可以在游戏工程中加入并开启改插件，然后复制或替换一些文件到发布后的程序里
 * 需要复制或替换的文件 (共2个)
 * www/js/plugins.js 和 www/js/plugins/MK_SaveSpriteSnapshot.js
 * (www : 【xxx】/Steam/steamapps/common/烟火  Firework Demo/www)
 * 
 * 在bug场景里，按下 Ctrl + F9
 * 之后找到 www/save/fileSnapshot.rpgsave
 * 提交该文件给开发人员即可
 * 
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
 * TODO
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
 * TODO
 * 
 * 
 */




DataManager.saveSnapshot = function() {
	var data = this.makeSnapshotContents();
	var json = JsonEx.stringify(data);
	StorageManager.save('Snapshot', json);
	console.log('save snapshot finish', data);
};

DataManager.makeSnapshotContents = function() {
	var content = {};
	content.scene = this.makeSpriteSnapshotData(SceneManager._scene);

	content.gameMap = {};
	if ($gameMap) {
		content.gameMap.tileWidth  = $gameMap.tileWidth ();
		content.gameMap.tileHeight = $gameMap.tileHeight();
	}

	content.graphics = {};
	var graphics = content.graphics;
	graphics.isWebGL   = Graphics.isWebGL();
	graphics.hasWebGL  = Graphics.hasWebGL();
	graphics.width     = Graphics.width;
	graphics.height    = Graphics.height;
	graphics.boxWidth  = Graphics.boxWidth;
	graphics.boxHeight = Graphics.boxHeight;
	graphics.scale     = Graphics.scale;
	graphics.realScale = Graphics._realScale;

	var gl = Graphics._canvas.getContext('webgl');
	if (gl) {
		var debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
		graphics.renderer_webgl = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
	}

	content.tilemap = {};
	if (SceneManager._scene
		 && SceneManager._scene._spriteset
		 && SceneManager._scene._spriteset._tilemap) {
		var tilemap = SceneManager._scene._spriteset._tilemap;
		content.tilemap.hasTilemap = true;
		content.tilemap.bitmaps = tilemap.bitmaps.map(function(b) {
			return {
				url : b.url, 
				width : b.width, 
				height : b.height, 
				loadingState : b._loadingState, 
		    };
		});
		content.tilemap.origin      = tilemap.origin;
		content.tilemap.tileWidth   = tilemap.tileWidth;
		content.tilemap.tileHeight  = tilemap.tileHeight;
		content.tilemap.mapWidth    = tilemap._mapWidth;
		content.tilemap.mapHeight   = tilemap._mapHeight;
		content.tilemap.layerWidth  = tilemap._layerWidth;
		content.tilemap.layerHeight = tilemap._layerHeight;
	}
	else {
		content.tilemap.hasTilemap = false;
	}

	// 加上基本的游戏保存数据
	content.defaultContent = this.makeSaveContents();

	return content;
};

DataManager.makeSpriteSnapshotData = function(sprite) {
	if (!sprite) return {};
	if (!sprite.isPrototypeOf(PIXI.Container) && !sprite instanceof PIXI.Container) return {};

	var s = sprite;
	var cp = {};

	// 获取point
	function tmpFN1(p) {
		return typeof p == 'object' ? {x : p.x, y : p.y} : p;
	}
	cp['pivot'] 	 = tmpFN1(s['pivot']);
	cp['position'] 	 = tmpFN1(s['position']);
	cp['scale'] 	 = tmpFN1(s['scale']);
	cp['skew'] 		 = tmpFN1(s['skew']);
	cp['anchor'] 	 = tmpFN1(s['anchor']);

	cp['t_pivot'] 	 = tmpFN1(s.transform['pivot']);
	cp['t_position'] = tmpFN1(s.transform['position']);
	cp['t_scale'] 	 = tmpFN1(s.transform['scale']);
	cp['t_skew'] 	 = tmpFN1(s.transform['skew']);

	// 直接获取
	function tmpFN2(d) {
		return d;
	}
	cp['width'] 	 = tmpFN2(s['width']);
	cp['height'] 	 = tmpFN2(s['height']);
	cp['opacity'] 	 = tmpFN2(s['opacity']);
	cp['rotation'] 	 = tmpFN2(s['rotation']);
	cp['visible'] 	 = tmpFN2(s['visible']);

	cp['_frame'] 	 = tmpFN2(s['_frame']);
	cp['t_local'] 	 = tmpFN2(s.transform['localTransform']);
	cp['t_world'] 	 = tmpFN2(s.transform['worldTransform']);
	cp['t_localID']  = tmpFN2(s.transform['_localID']);
	cp['t_worldID']  = tmpFN2(s.transform['_worldID']);
	cp['t_parentID'] = tmpFN2(s.transform['_parentID']);
	cp['t_localIDc'] = tmpFN2(s.transform['_currentLocalID']);
	cp['t_cx'] 		 = tmpFN2(s.transform['_cx']);
	cp['t_cy'] 		 = tmpFN2(s.transform['_cy']);
	cp['t_sx'] 		 = tmpFN2(s.transform['_sx']);
	cp['t_sy'] 		 = tmpFN2(s.transform['_sy']);

	// 获取bitmap
	function tmpFN3(b) {
		if (!b) {
			return b;
		}
		else {
			return {
				url	: b.url, 
				width  : b.width, 
				height : b.height, 
			};
		}
	}
	cp['bitmap'] 	 = tmpFN3(s['bitmap']);

	// 获取children
	var that = this;
	function tmpFN4(l) {
		if (!l) {
			return l;
		}
		else {
			return l.map(function(s) {
				return that.makeSpriteSnapshotData(s);
			});
		}
	}
	cp['children'] 	 = tmpFN4(s['children']);

	// 获取character
	function tmpFN5(c) {
		if (!c) {
			return c;
		}
		else {
			return {
				_characterIndex : c._characterIndex, 
				_characterName  : c._characterName, 
				_realX		  : c._realX, 
				_realY		  : c._realY, 
				_x			  : c._x, 
				_y			  : c._y, 
				_eventId		: c._eventId, 
				_mapId		  : c._mapId, 
				_type		   : c._type, 
			};
		}
	}
	cp['_character']  = tmpFN5(s['_character']);

	return cp;
};


(function() {
	var _MK_Input__onKeyDown = Input._onKeyDown;
	Input._onKeyDown = function(event) {
		var flag1 = this._currentState['control'];
		var flag2 = this._currentState['debug'];

		_MK_Input__onKeyDown.apply(this, arguments);

		var flag3 = this._currentState['control'];
		var flag4 = this._currentState['debug'];

		// 若在按下Ctrl或Alt的情况下又按下了F9
		if (flag1 && !flag2 && flag3 && flag4) {
			DataManager.saveSnapshot();
		}
	};
})();




(function() {

	for (var num = 0; num <= 9; num++) {
		Input.keyMapper[48 + num] = num.toString();
	}

	var testFuncSet = {};

	testFuncSet.getTilemap = function() {
		if (SceneManager._scene) {
			if (SceneManager._scene._spriteset) {
				if (SceneManager._scene._spriteset._tilemap) {
					return SceneManager._scene._spriteset._tilemap;
				}
			}
		}
		return null;
	};

	testFuncSet.test1 = function() {
		var tilemap = this.getTilemap();
		if (!tilemap) return ;

		tilemap.refresh();
	};

	testFuncSet.test2 = function() {
		var tilemap = this.getTilemap();
		if (!tilemap) return ;

		tilemap.scale = new Point(1, 1);
	};

	testFuncSet.test3 = function() {
		var tilemap = this.getTilemap();
		if (!tilemap) return ;

		tilemap.children.forEach(function(s) {
			s.transform.updateWorldTransform(tilemap.transform);
		}, this);
	};

	testFuncSet.test4 = function() {
		var tilemap = this.getTilemap();
		if (!tilemap) return ;

		tilemap.updateTransform();
	};

	testFuncSet.test5 = function() {
		var tilemap = this.getTilemap();
		if (!tilemap) return ;

		tilemap.children.forEach(function(s) {
			s && s.transform && s.transform.updateWorldTransform && 
				s.transform.updateWorldTransform(SceneManager._scene);
		}, this);
	};

	testFuncSet.test6 = function() {
		var tilemap = this.getTilemap();
		if (!tilemap) return ;

		tilemap.scale = new Point(1/1.61, 1/1.41);
	};

	testFuncSet.test9 = function() {
		var tilemap = this.getTilemap();
		if (!tilemap) return ;

		// TODO
	};

	var _MK_Input__onKeyDown = Input._onKeyDown;
	Input._onKeyDown = function(event) {
		var flag1 = this._currentState['control'];
		var flag2 = [];
		for (var num = 0; num <= 9; num++) {
			flag2[num] = this._currentState[num.toString()];
		}

		_MK_Input__onKeyDown.apply(this, arguments);

		var flag3 = this._currentState['control'];
		var flag4 = [];
		for (var num = 0; num <= 9; num++) {
			flag4[num] = this._currentState[num.toString()];
		}

		// 若在按下Ctrl或Alt的情况下又按下了0~9
		for (var num = 0; num <= 9; num++) {
			if (flag1 && !flag2[num] && flag3 && flag4[num]) {
				testFuncSet['test'+num] && testFuncSet['test'+num]();
			}
		}
	};

})();



