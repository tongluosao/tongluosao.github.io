//=============================================================================
// MK_expand_MOG_TitleSplashScreen.js
// 拓展-MOG_TitleSplashScreen
//=============================================================================
//  author : Mikan 
//  plugin : MK_temp_MOG_TitleSplashScreen.js 拓展-MK_expand_MOG_TitleSplashScreen
// version : v0.1.1 2021/01/09 追加可以指定图片需要确认
// ------------------------------------------------------------------------------
// [Twitter] https://twitter.com/_MikanHako/
// -[GitHub] https://github.com/MikanHako1024/
// ---[Blog] NONE
// -----[QQ] 312859582
//=============================================================================




/*:
 * @plugindesc 拓展-MOG_TitleSplashScreen <MK_expand_MOG_TitleSplashScreen>
 * @author Mikan 
 * @version v0.1.1 2021/01/09 追加可以指定图片需要确认
 * v0.1.0 2021/01/08 完成基本的功能
 * v0.0.0 2021/01/07 项目计划中
 * 
 * 
 * 
 * @help
 * 
 * ---- 简要说明 ----
 * 
 * 依赖插件 MOG_TitleSplashScreen.js
 *   plugindesc (v1.0) Adiciona logos antes da tela de título.
 *   author Moghunter
 * 
 * 原功能 标题前连续显示一些图片，按确定键跳过
 * 追加 指定一些图片不能跳过 (后续可跳过的图片依旧会被跳过)
 * 追加 指定一些图片需要确认
 *   (按下ok键后才继续，不会进行提示，请在图片中进行引导)
 * 
 * ---- 插件指令 ----
 * 
 * NONE
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
 * ---- 后续任务 ----
 * 
 * □ 可选的 不全部跳过，只跳过到下一张不可跳过的图片 模式
 * ...
 * 
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
 * @param notSkippedPictures
 * @text 不可跳过图片列表
 * @desc 指定图片索引 (Splash_INDEX.png 的 INDEX)
 * 作为不可跳过的图片
 * @type number[]
 * @default []
 * 
 * @param confirmPictures
 * @text 需要确定的图片列表
 * @desc 指定图片索引 (Splash_INDEX.png 的 INDEX)
 * 作为需要确定的的图片
 * @type number[]
 * @default []
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

	var pluginName = 'MK_expand_MOG_TitleSplashScreen';
	MK_Plugins.paramGet[pluginName] = MK_Plugins.getPluginParam(pluginName);
	MK_Plugins.param[pluginName] = {};

	var paramGet = MK_Plugins.paramGet[pluginName];
	var param = MK_Plugins.param[pluginName];

	param['notSkippedPictures'] = JSON.parse(paramGet['notSkippedPictures'] || '[]');
	param['confirmPictures']    = JSON.parse(paramGet['confirmPictures']    || '[]');

	param['notSkippedPictures'] = param['notSkippedPictures'].map((s) => Number(s));
	param['confirmPictures']    = param['confirmPictures']   .map((s) => Number(s));

	const NOT_SKIPPED_PICTURES = param['notSkippedPictures'];
	const CONFIRM_PICTURES = param['confirmPictures'];


	const _MK_Scene_Splash_Screen_refresh_splash_screen = Scene_Splash_Screen.prototype.refresh_splash_screen;
	Scene_Splash_Screen.prototype.refresh_splash_screen = function() {
   		if (this._splash_data[0] >= this._splash_img.length) {
			_MK_Scene_Splash_Screen_refresh_splash_screen.apply(this, arguments);
		}
		else if (this._splash_skip) {
			// 寻找下一个不可跳过的图片或需要确定的图片
			// this._splash_data[0] : 准备显示的图片
			while (this._splash_data[0] < this._splash_img.length) {
				if (NOT_SKIPPED_PICTURES.includes(this._splash_data[0])) {
					break;
				}
				else if (CONFIRM_PICTURES.includes(this._splash_data[0])) {
					break;
				}
				else {
					this._splash_data[0]++;
				}
			}
			_MK_Scene_Splash_Screen_refresh_splash_screen.apply(this, arguments);
		}
		else {
			_MK_Scene_Splash_Screen_refresh_splash_screen.apply(this, arguments);
		}
	};

	Scene_Splash_Screen.prototype.update = function() {
		Scene_Base.prototype.update.call(this);
		const isConfirmPicture = CONFIRM_PICTURES.includes(this._splash_data[0] - 1);
		const isNotSkippedPicture = NOT_SKIPPED_PICTURES.includes(this._splash_data[0] - 1);
		const isTriggeredOK = Input.isTriggered("ok") || TouchInput.isTriggered();
		
		if (isConfirmPicture) {
			// 需要确认
			if (this._splash_data[1] <= 0) {
				// 等待确认 或 正在消失 或 完全消失
				if (this._splash_sprite.opacity >= 255) {
					// 等待确认
					if (isTriggeredOK) {
						this._splash_sprite.opacity -= this._splash_data[3];
						// 使其可以判定为 正在消失
					}
				}
				else {
					// 正在消失 或 完全消失
					this._splash_sprite.opacity -= this._splash_data[3];
					// 完全消失
					if (this._splash_sprite.opacity <= 0) {
						this.refresh_splash_screen();
					};
				}
			}
			else {
				// 正在出现 或 完全出现
				this._splash_sprite.opacity += this._splash_data[3];
				// 提前确认
				if (isTriggeredOK && this._splash_sprite.opacity > 180) {
					this._splash_data[1] = 0; // 清除时间
					// 使其可以判定为 正在消失
					if (this._splash_sprite.opacity >= 255) {
						this._splash_sprite.opacity = 254;
					}
				}
				// 完全出现
				else if (this._splash_sprite.opacity >= 255) {
					this._splash_data[1] -= 1;
				};
			}
		}
		else {
			// 无需确认
			if (this._splash_data[1] <= 0) {
				// 无需确认，正在消失 或 完全消失
				this._splash_sprite.opacity -= this._splash_data[3];
				if (isTriggeredOK) {
					this._splash_skip = true;
				};
				// 完全消失
				if (this._splash_sprite.opacity <= 0) {
					this.refresh_splash_screen();
				};
			}
			else {
				// 无需确认，正在出现 或 完全出现
				this._splash_sprite.opacity += this._splash_data[3];
				if (isTriggeredOK && this._splash_sprite.opacity > 60) {
					if (!isNotSkippedPicture) {
						this._splash_data[1] = 0;
					}
					this._splash_skip = true;
				};
				// 完全出现
				if (this._splash_sprite.opacity >= 255) {
					this._splash_data[1] -= 1;
				};
			};
		}
	};

})();


