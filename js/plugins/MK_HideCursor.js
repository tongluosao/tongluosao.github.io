//=============================================================================
// MK_HideCursor.js
// 
//=============================================================================
//  author : Mikan 
//  plugin : MK_HideCursor.js 隐藏鼠标光标
// version : v1.0.0 2020/05/29 完成基本功能
// ------------------------------------------------------------------------------
// [Twitter] https://twitter.com/_MikanHako/
//  [GitHub] https://github.com/MikanHako1024/
//    [Blog] NONE
//=============================================================================




/*:
 * @plugindesc 隐藏鼠标光标 <MK_HideCursor>
 * @author Mikan 
 * @version v1.0.0 2020/05/29 完成基本功能
 * 
 * @help
 * 
 * ---- 简要说明 ----
 * 
 * 开启插件时，若鼠标移到游戏画面上，将会隐藏鼠标光标
 * 
 * 
 * ---- 后续任务 ----
 * 
 * 可以在游戏中开关
 * 
 * 
 */



(function() {
	var body = document.getElementsByTagName('body')[0];
	body.style.cursor = 'none';
})();

