//=============================================================================
// MK_LoadingBackground.js
// 背景加载
//=============================================================================
//  author : Mikan 
//  plugin : MK_LoadingBackground.js 背景加载
// version : v0.1.0 2021/01/29 完成基础的功能
// ------------------------------------------------------------------------------
// [Twitter] https://twitter.com/_MikanHako/
// -[GitHub] https://github.com/MikanHako1024/
// ---[Blog] NONE
// -----[QQ] 312859582
//=============================================================================




/*:
 * @plugindesc 背景加载 <MK_LoadingBackground>
 * @author Mikan 
 * @version v0.1.0 2021/01/29 完成基础的功能
 * v0.0.0 2021/01/29 项目计划中
 * 
 * 
 * 
 * 
 * @help
 * 
 * ---- 简要说明 ----
 * 
 * 窗口加载时显示图片 (HTML方法 TODO : ...)
 * 加载完成后清除背景
 * 
 * ---- 插件指令 ----
 * 
 * ---- 使用方法 ----
 * 
 * ---- 其他说明 ----
 * 
 * ---- 标签设置 ----
 * 
 * ---- 控制字符 ----
 * 
 * ---- 参数描述 ----
 * 
 * ---- 用语说明 ----
 * 
 * ---- 开发方法 ----
 * 
 * ---- 后续任务 ----
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
 */




(function() {

	const _MK_SceneManager_initialize = SceneManager.initialize;
	SceneManager.initialize = function() {
		_MK_SceneManager_initialize.apply(this, arguments);

		if (document) {
			var body = (document.getElementsByTagName('body') || [])[0];
			!!body && body.style.setProperty('background-image', '');
		}
		
	};

})();



