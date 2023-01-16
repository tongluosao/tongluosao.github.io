//=============================================================================
// MK_MOG_AnimatedText_Modify.js
// 插件修改:MOG_AnimatedText
//=============================================================================
//  author : Mikan 
//  plugin : MK_MOG_AnimatedText_Modify.js 插件修改:MOG_AnimatedText
// version : v0.0.2 2021/10/06 添加修改:适应性的文字间隔
// ------------------------------------------------------------------------------
// [Twitter] https://twitter.com/_MikanHako/
// -[GitHub] https://github.com/MikanHako1024/
// ---[Blog] NONE
// -----[QQ] 312859582
//=============================================================================

/*:
 * @plugindesc 插件修改:MOG_AnimatedText <MK_MOG_AnimatedText_Modify>
 * @author Mikan 
 * @version v0.0.2 2021/10/06 添加修改:适应性的文字间隔
 * v0.0.1 2020/11/15 添加修改:淡出时不再摇摆且同时淡出
 * 
 * 
 * 
 * 
 * @help
 * 
 * ---- 简要说明 ----
 * 
 * 对 插件MOG_AnimatedText 进行临时修改
 * 
 * 前置插件
 * =============================================================================
 * +++ MOG - Animated Text (1.3) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * 
 * # 修改1
 *   ## 对效果0(fade)修改
 *     ### 淡出时不再摇摆且同时淡出
 * 
 * # 修改2
 *   ## 适应性的文字间隔
 */

var MK_Plugins = MK_Plugins || {};

MK_Plugins.paramGet = MK_Plugins.paramGet || {}, MK_Plugins.param = MK_Plugins.param || {}, 
MK_Plugins.class = MK_Plugins.class || {}, MK_Plugins.datas = MK_Plugins.datas || {}, 
MK_Plugins.getPluginParam = MK_Plugins.getPluginParam || function(e) {
    var t = PluginManager.parameters(e);
    if (t && "{}" !== JSON.stringify(t)) return t;
    for (var s = $plugins.filter(function(t) {
        return t.description.contains("<" + e + ">");
    }), i = 0; i < s.length; i++) {
        var r = s[i].name;
        if (r !== e) return PluginManager.parameters(r);
    }
    return {};
}, function() {
    InfoText.prototype.updateFadeEnd = function(t) {
        t.opacity -= 5;
    };
    var t = InfoText.prototype.updateSprites;
    InfoText.prototype.updateSprites = function() {
        this._letters.some(function(t) {
            return 2 === t.phase;
        }, this) && this._letters.forEach(function(t) {
            0 !== t.phase && 1 !== t.phase || (t.phase = 2);
        }), t.apply(this, arguments);
    };
}(), InfoText.prototype.setBaseParameters = function(t, e, s, i) {
    var r;
    this._letters[t].bitmap.fontSize = this.fontsz(), this._letters[t].bitmap.textColor = this.textColor(this.fontColor()), 
    this._letters[t].anchor.x = .5, this._letters[t].anchor.y = .5, (this._letters[t].opacity = 0) === this.pos() ? (r = (r = this._letters[t].bitmap).measureTextWidth(this.text().slice(0, t + 1)) - r.measureTextWidth(this.text().slice(0, 1)) / 2 - r.measureTextWidth(this.text().slice(t, t + 1)) / 2, 
    this._letters[t].x = this.posX() + r, this._letters[t].y = this.posY()) : (this._letters[t].x = this.posX(), 
    this._letters[t].y = this.posY() + this.letterSpace() * t), this._letters[t].org = [ this._letters[t].x, this._letters[t].y ], 
    this._letters[t].index = t, this._letters[t].scaleX = 1, this._letters[t].scaleY = 1, 
    this._letters[t].d = e, this._letters[t].l = s, this._letters[t].w = 0, this._letters[t].w2 = 0, 
    this._letters[t].phase = 0, this._letters[t].ani = [ 0, 0, 0 ], this._letters[t].itemMax = i, 
    this._letters[t].pos = this.pos(), this._letters[t].color = 0;
};