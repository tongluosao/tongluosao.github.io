//=============================================================================
// MK_KeyConfig.js
// 按键设置
//=============================================================================
//  author : Mikan 
//  plugin : MK_KeyConfig.js 按键设置
// version : v0.1.2.branch1 2021/10/05 调整对其他插件的支持
// ------------------------------------------------------------------------------
// [Twitter] https://twitter.com/_MikanHako/
// -[GitHub] https://github.com/MikanHako1024/
// ---[Blog] NONE
// -----[QQ] 312859582
//=============================================================================




/*:
 * @plugindesc 按键设置 <MK_KeyConfig>
 * @author Mikan 
 * @version v0.1.2.branch1 2021/10/05 调整对其他插件的支持
 *   KJ_Menu.js by Kong Jing  (烟火 菜单)  增加英文换行的处理
 * v0.1.2 2021/01/18 添加禁用F5选项
 * v0.1.1.fix1 2021/01/17 尝试修复手柄信号检查异常问题
 * v0.1.1 2021/01/16 增加对输入信号类型的判断
 * v0.1.0.fix1.branch1 2021/01/15 增加对一些其他插件的支持
 *   MessageCustom2.js by 冷血  (自定义消息窗口优化 文本居中显示)
 *   KJ_Menu.js by Kong Jing  (烟火 菜单)
 * v0.1.0.fix1 2021/01/14 修正一些说明
 * v0.1.0 2021/01/14 完成最初的版本
 * v0.0.0 2021/01/11 项目计划中
 * 
 * 
 * 
 * 
 * @help
 * 
 * ---- 简要说明 ----
 * 
 * 可以在插件参数里 修改游戏按键
 * 默认提供的是MV原有的按键配置
 * 位于下方的配置 会覆盖上方相同按键的配置
 * 
 * 可以在插件参数里 配置各个按键的文本名或图片
 * 通过 【控制字符】 指定游戏键位，显示该键位对应的键盘或手柄的文本名或图片
 *   图片将会自动地等比例缩放 以适应文本行高
 * 
 * 在不指定游戏按键时，仍然可以正常地显示文本或图片
 * 这是可以看做 显示任意文本或图片 的能力，详见 【使用方法】
 * 
 * ---- 插件指令 ----
 * 
 * NONE
 * 
 * ---- 使用方法 ----
 * 
 * 假设有如下配置
 * 
 * 键盘按键配置:
 *    备注  按键文本  按键图片  游戏键位  键盘按键
 * 1  加速            shift    shift    16(ShiftLeft)
 * 2  确定     Z                 ok     90(KeyX)
 * 手柄按键配置:
 *    备注  按键文本  按键图片  游戏键位  键盘按键
 * 1  确定     A                 ok     0(A)
 * 2  方向键           pad
 * 
 * 使用控制字符 \BKN[1] 显示 图片 shift.png
 * 使用控制字符 \BKN[1] 显示 Z
 * 使用控制字符 \PKN[1] 显示 A
 * 使用控制字符 \PKN[2] 显示 图片 pad.png
 * 使用控制字符 \PK[1]  当有手柄时 显示 A
 * 使用控制字符 \BK[2]  当没有手柄时 显示 Z
 * 使用控制字符 \BK[2]\PK[1]  当有手柄时 显示 A 没有手柄时 显示 Z
 * 
 * ---- 其他说明 ----
 * 
 * # 按键表
 *     按键名       PC按键描述    手柄按键描述
 *     ok          enter         A
 *                 space
 *                 Z
 *     escape      escape
 *                 numpad 0
 *                 X
 *                 insert
 *     cancel      (同escape)    B
 *     menu        (同escape)    Y
 *     shift       shift         X
 * 
 *     down        numpad 2      D-pad down
 *                 down arrow
 *     left        numpad 4      D-pad left
 *                 left arrow
 *     right       numpad 6      D-pad right
 *                 right arrow 
 *     up          numpad 8      D-pad up
 *                 up arrow
 * 
 *     pageup      pageup        LB
 *                 Q
 *     pagedown    pagedown      RB
 *                 W
 * 
 *     tab         tab
 *     control     control
 *                 alt
 *     debug       F9
 * 
 * ...
 * 
 * ---- 标签设置 ----
 * 
 * TODO
 * 
 * ---- 控制字符 ----
 * 
 * \BK[]
 *   如果没有连接手柄，显示一个键盘按键的文本名或图片
 *   参数 : 指定一个游戏按键，显示对应按键
 *          插件参数 【键盘按键的配置】 中的索引(序号) (从1开始)
 * \BKN[]
 *   显示一个键盘按键的文本名或图片
 *   参数 : 同\BK[]
 * 
 * \PK[]
 *   如果 有 连接手柄，显示一个手柄按键的文本名或图片
 *   参数 : 同\BK[]
 * \PKN[]
 *   显示一个手柄按键的文本名或图片
 *   参数 : 同\BK[]
 * 
 * BK  : keyboard key
 * BKN : keyboard key not check
 * PKN : gamepad key
 * PK  : gamepad key not check
 * 
 * ---- 参数描述 ----
 * 
 * TODO
 * 
 * ---- 用语说明 ----
 * 
 * 游戏键位
 *   ...
 * 
 * ---- 开发方法 ----
 * 
 * TODO
 * 
 * ---- 后续任务 ----
 * 
 * □ bugfix : 在显示消息前记录信号类型
 * □ 更完整的手柄按键
 * √ 适应地调整图片大小
 * □ 独立的 按键-文本/图片 配置
 * □ 检查是否有手柄信号
 * □ 简化配置
 * □ 配置分组
 * □ 按键显示的图片加载失败时，使用文本
 * □ 添加屏蔽按键设置
 * □ 插件参数中可以用索引快速找到按键
 * □ 游戏内可以对按键进行修改，并且保存
 * □ 动态图标
 * ...
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
 * @param KeyboardMapper
 * @text 键盘按键的配置
 * @desc 设置键盘按键的游戏键位，配置键盘键位的文本或图片
 * 这里的序号 即是 \BK[], \BKN[] 使用的序号 (从1开始)
 * @type struct<aKeyboardKey>[]
 * @default ["{\"_\":\"\",\"text\":\"\",\"icon\":\"\",\"name\":\"tab\",\"keycode\":\"9\"}","{\"_\":\"确定(Z)\",\"text\":\"Z\",\"icon\":\"\",\"name\":\"ok\",\"keycode\":\"13\"}","{\"_\":\"加速(Shift)\",\"text\":\"\",\"icon\":\"shift\",\"name\":\"shift\",\"keycode\":\"16\"}","{\"_\":\"特殊控制(ctrl)\",\"text\":\"\",\"icon\":\"\",\"name\":\"control\",\"keycode\":\"17\"}","{\"_\":\"特殊控制(alt)\",\"text\":\"\",\"icon\":\"\",\"name\":\"control\",\"keycode\":\"18\"}","{\"_\":\"退出/菜单(Esc)\",\"text\":\"\",\"icon\":\"\",\"name\":\"escape\",\"keycode\":\"27\"}","{\"_\":\"确定(space)\",\"text\":\"\",\"icon\":\"\",\"name\":\"ok\",\"keycode\":\"32\"}","{\"_\":\"上翻页(pageup)\",\"text\":\"\",\"icon\":\"\",\"name\":\"pageup\",\"keycode\":\"33\"}","{\"_\":\"下翻页(pagedown)\",\"text\":\"\",\"icon\":\"\",\"name\":\"pagedown\",\"keycode\":\"34\"}","{\"_\":\"左移动(left)\",\"text\":\"\",\"icon\":\"\",\"name\":\"left\",\"keycode\":\"37\"}","{\"_\":\"上移动(up)\",\"text\":\"\",\"icon\":\"\",\"name\":\"up\",\"keycode\":\"38\"}","{\"_\":\"右移动(right)\",\"text\":\"\",\"icon\":\"\",\"name\":\"right\",\"keycode\":\"39\"}","{\"_\":\"下移动(down)\",\"text\":\"\",\"icon\":\"\",\"name\":\"down\",\"keycode\":\"40\"}","{\"_\":\"退出/菜单(ins)\",\"text\":\"\",\"icon\":\"\",\"name\":\"escape\",\"keycode\":\"45\"}","{\"_\":\"上翻页(Q)\",\"text\":\"\",\"icon\":\"\",\"name\":\"pageup\",\"keycode\":\"81\"}","{\"_\":\"下翻页(W)\",\"text\":\"\",\"icon\":\"\",\"name\":\"pagedown\",\"keycode\":\"87\"}","{\"_\":\"退出/菜单(X)\",\"text\":\"\",\"icon\":\"\",\"name\":\"escape\",\"keycode\":\"88\"}","{\"_\":\"确定(Z)\",\"text\":\"\",\"icon\":\"\",\"name\":\"ok\",\"keycode\":\"90\"}","{\"_\":\"退出/菜单(Num0)\",\"text\":\"\",\"icon\":\"\",\"name\":\"escape\",\"keycode\":\"96\"}","{\"_\":\"下移动(Num2)\",\"text\":\"\",\"icon\":\"\",\"name\":\"down\",\"keycode\":\"98\"}","{\"_\":\"左移动(Num4)\",\"text\":\"\",\"icon\":\"\",\"name\":\"left\",\"keycode\":\"100\"}","{\"_\":\"右移动(Num6)\",\"text\":\"\",\"icon\":\"\",\"name\":\"right\",\"keycode\":\"102\"}","{\"_\":\"上移动(Num8)\",\"text\":\"\",\"icon\":\"\",\"name\":\"up\",\"keycode\":\"104\"}","{\"_\":\"调试(F9)\",\"text\":\"\",\"icon\":\"\",\"name\":\"debug\",\"keycode\":\"120\"}"]
 * 
 * @param GamepadMapper
 * @text 手柄按键的配置
 * @desc 设置手柄按键的游戏键位，配置手柄键位的文本或图片
 * 这里的序号 即是 \PK[], \PKN[] 使用的序号 (从1开始)
 * @type struct<aGamepadKey>[]
 * @default ["{\"_\":\"确定\",\"text\":\"\",\"icon\":\"\",\"name\":\"ok\",\"keycode\":\"0\"}","{\"_\":\"退出\",\"text\":\"\",\"icon\":\"\",\"name\":\"cancel\",\"keycode\":\"1\"}","{\"_\":\"加速\",\"text\":\"\",\"icon\":\"\",\"name\":\"shift\",\"keycode\":\"2\"}","{\"_\":\"菜单\",\"text\":\"\",\"icon\":\"\",\"name\":\"menu\",\"keycode\":\"3\"}","{\"_\":\"上翻页\",\"text\":\"\",\"icon\":\"\",\"name\":\"pageup\",\"keycode\":\"4\"}","{\"_\":\"下翻页\",\"text\":\"\",\"icon\":\"\",\"name\":\"pagedown\",\"keycode\":\"5\"}","{\"_\":\"上移动\",\"text\":\"\",\"icon\":\"\",\"name\":\"up\",\"keycode\":\"12\"}","{\"_\":\"下移动\",\"text\":\"\",\"icon\":\"\",\"name\":\"down\",\"keycode\":\"13\"}","{\"_\":\"左移动\",\"text\":\"\",\"icon\":\"\",\"name\":\"left\",\"keycode\":\"14\"}","{\"_\":\"右移动\",\"text\":\"\",\"icon\":\"\",\"name\":\"right\",\"keycode\":\"15\"}"]
 * 
 * @param PreventReload
 * @text 是否禁用F5重置
 * @desc 
 * @type boolean
 * @on 禁用F5重置
 * @off 启用F5重置
 * @default false
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
/*~struct~aKeyboardKey:
 * @param _
 * @text 备注
 * @desc 为这条配置进行备注，不会影响游戏
 * @type string
 * @default 
 * 
 * @param text
 * @text 按键文本
 * @desc 未填写图片时，将显示该文本
 * @type string
 * @default 
 * 
 * @param icon
 * @text 按键图片
 * @desc 填写图片时，将显示该图片
 * @type file
 * @dir img/pictures
 * @default 
 * 
 * @param name
 * @text 游戏键位
 * @desc 游戏内的键位名  如 ok, escape, up, down 等，也可以自设
 * 不写任何值 : 不会影响游戏按键，但仍然可以正常显示文本或图片
 * @type combo
 * @option up @option down
 * @option left @option right
 * @option ok @option escape
 * @option pageup @option pagedown
 * @option shift @option control @option tab
 * @option debug
 * @default 
 * 
 * @param keycode
 * @text 键盘按键
 * @desc 选择键盘上的一个按键
 * @type select
 * @option Backspace	@value 8
 * @option Tab	@value 9
 * @option NumpadEnter	@value 13
 * @option Enter	@value 13
 * @option ShiftLeft	@value 16
 * @option ShiftRight	@value 16
 * @option ControlLeft	@value 17
 * @option ControlRight	@value 17
 * @option AltLeft	@value 18
 * @option AltRight	@value 18
 * @option Pause	@value 19
 * @option CapsLock	@value 20
 * @option Escape	@value 27
 * @option Space	@value 32
 * @option PageUp	@value 33
 * @option PageDown	@value 34
 * @option End	@value 35
 * @option Home	@value 36
 * @option ArrowLeft	@value 37
 * @option ArrowUp	@value 38
 * @option ArrowRight	@value 39
 * @option ArrowDown	@value 40
 * @option Insert	@value 45
 * @option Delete	@value 46
 * @option Digit0	@value 48
 * @option Digit1	@value 49
 * @option Digit2	@value 50
 * @option Digit3	@value 51
 * @option Digit4	@value 52
 * @option Digit5	@value 53
 * @option Digit6	@value 54
 * @option Digit7	@value 55
 * @option Digit8	@value 56
 * @option Digit9	@value 57
 * @option KeyA	@value 65
 * @option KeyB	@value 66
 * @option KeyC	@value 67
 * @option KeyD	@value 68
 * @option KeyE	@value 69
 * @option KeyF	@value 70
 * @option KeyG	@value 71
 * @option KeyH	@value 72
 * @option KeyI	@value 73
 * @option KeyJ	@value 74
 * @option KeyK	@value 75
 * @option KeyL	@value 76
 * @option KeyM	@value 77
 * @option KeyN	@value 78
 * @option KeyO	@value 79
 * @option KeyP	@value 80
 * @option KeyQ	@value 81
 * @option KeyR	@value 82
 * @option KeyS	@value 83
 * @option KeyT	@value 84
 * @option KeyU	@value 85
 * @option KeyV	@value 86
 * @option KeyW	@value 87
 * @option KeyX	@value 88
 * @option KeyY	@value 89
 * @option KeyZ	@value 90
 * @option MetaLeft	@value 91
 * @option ContextMenu	@value 93
 * @option Numpad0	@value 96
 * @option Numpad1	@value 97
 * @option Numpad2	@value 98
 * @option Numpad3	@value 99
 * @option Numpad4	@value 100
 * @option Numpad5	@value 101
 * @option Numpad6	@value 102
 * @option Numpad7	@value 103
 * @option Numpad8	@value 104
 * @option Numpad9	@value 105
 * @option NumpadMultiply	@value 106
 * @option NumpadAdd	@value 107
 * @option NumpadSubtract	@value 109
 * @option NumpadDecimal	@value 110
 * @option NumpadDivide	@value 111
 * @option F1	@value 112
 * @option F2	@value 113
 * @option F3	@value 114
 * @option F4	@value 115
 * @option F5	@value 116
 * @option F6	@value 117
 * @option F7	@value 118
 * @option F8	@value 119
 * @option F9	@value 120
 * @option F10	@value 121
 * @option F11	@value 122
 * @option F12	@value 123
 * @option NumLock	@value 144
 * @option ScrollLock	@value 145
 * @option Semicolon	@value 186
 * @option Equal	@value 187
 * @option Comma	@value 188
 * @option Minus	@value 189
 * @option Period	@value 190
 * @option Slash	@value 191
 * @option Backquote	@value 192
 * @option BracketLeft	@value 219
 * @option Backslash	@value 220
 * @option BracketRight	@value 221
 * @option Quote	@value 222
 * @default 
 */
/*~struct~aGamepadKey:
 * @param _
 * @text 备注
 * @desc 为这条配置进行备注，不会影响游戏
 * @type string
 * @default 
 * 
 * @param text
 * @text 按键文本
 * @desc 未填写图片时将，显示该文本
 * @type string
 * @default 
 * 
 * @param icon
 * @text 按键图片
 * @desc 填写图片时，将显示该图片
 * @type file
 * @dir img/pictures
 * @default 
 * 
 * @param name
 * @text 游戏键位
 * @desc 游戏内的键位名  如 ok, escape, up, down 等，也可以自设
 * 不写任何值 : 不会影响游戏按键，但仍然可以正常显示文本或图片
 * @type combo
 * @option up @option down
 * @option left @option right
 * @option ok @option escape @option cancel @option menu
 * @option pageup @option pagedown
 * @option shift @option control @option tab
 * @option debug
 * @default 
 * 
 * @param keycode
 * @text 手柄按键
 * @desc 选择手柄上的一个按键
 * @type select
 * @option A	@value 0
 * @option B	@value 1
 * @option X	@value 2
 * @option Y	@value 3
 * @option LB	@value 4
 * @option RB	@value 5
 * @option D-pad-up	@value 12
 * @option D-pad-down	@value 13
 * @option D-pad-left	@value 14
 * @option D-pad-right	@value 15
 * @default 
 */

var MK_Plugins = MK_Plugins || {};

MK_Plugins.paramGet = MK_Plugins.paramGet || {}, MK_Plugins.param = MK_Plugins.param || {}, 
MK_Plugins.class = MK_Plugins.class || {}, MK_Plugins.datas = MK_Plugins.datas || {}, 
MK_Plugins.getPluginParam = MK_Plugins.getPluginParam || function(a) {
    var e = PluginManager.parameters(a);
    if (e && "{}" !== JSON.stringify(e)) return e;
    for (var t = $plugins.filter(function(e) {
        return e.description.contains("<" + a + ">");
    }), n = 0; n < t.length; n++) {
        var i = t[n].name;
        if (i !== a) return PluginManager.parameters(i);
    }
    return {};
}, function() {
    var e = "MK_KeyConfig";
    MK_Plugins.paramGet[e] = MK_Plugins.getPluginParam(e), MK_Plugins.param[e] = {};
    var a = MK_Plugins.paramGet[e];
    const t = MK_Plugins.param[e];
    function parse_aKeyboardKey(a, t) {
        a = a || t;
        let n = {}, e = {};
        try {
            n = JSON.parse(a);
        } catch (e) {
            n = t || a == t ? {} : arguments.callee(t);
        }
        return e._ = String(n._ || ""), e.text = String(n.text || ""), e.icon = String(n.icon || ""), 
        e.name = String(n.name || ""), e.keycode = Number(n.keycode || 0), e;
    }
    function parse_aKeyboardKeys(a, t) {
        a = a || t;
        let n = [];
        try {
            n = JSON.parse(a);
        } catch (e) {
            n = t || a == t ? [] : arguments.callee(t);
        }
        return n.map(e => parse_aKeyboardKey(e, "{}"));
    }
    t.KeyboardMapper = parse_aKeyboardKeys(a.KeyboardMapper || "[]"), t.GamepadMapper = function parse_aGamepadKeys(e, a) {
        return parse_aKeyboardKeys(e, a);
    }(a.GamepadMapper || "[]"), t.PreventReload = String(a.PreventReload || "false"), 
    t.PreventReload = "true" == t.PreventReload.toLowerCase();
}(), function() {
    var d, e = "MK_KeyConfig";
    MK_Plugins.param[e];
    const I = MK_Plugins.param[e].KeyboardMapper, b = MK_Plugins.param[e].GamepadMapper, t = MK_Plugins.param[e].PreventReload, v = {};
    !function() {
        const a = {}, t = {};
        I.forEach(function(e) {
            0 <= e.keycode && "" != e.name && (a[e.keycode] = e.name);
        }), b.forEach(function(e) {
            0 <= e.keycode && "" != e.name && (t[e.keycode] = e.name);
        }), Input.keyMapper = a, Input.gamepadMapper = t;
    }(), function() {
        if (t) {
            const a = SceneManager.onKeyDown;
            SceneManager.onKeyDown = function(e) {
                e.ctrlKey || e.altKey || 116 != e.keyCode && a.apply(this, arguments);
            };
        }
    }(), I.forEach(function(e) {
        e.icon && !v[e] && (v[e.icon] = ImageManager.loadPicture(e.icon));
    }), b.forEach(function(e) {
        e.icon && !v[e] && (v[e.icon] = ImageManager.loadPicture(e.icon));
    }), Input.haveGamepad = function() {
        if (navigator.getGamepads) {
            var e = navigator.getGamepads();
            if (e) for (var a = 0; a < e.length; a++) if (e[a] && e[a].connected) return !0;
        }
        return !1;
    };
    const a = Input.clear;
    Input.clear = function() {
        a.apply(this, arguments), this._keyboardDate = this._keyboardDate || 0, this._gamepadDate = this._gamepadDate || 0, 
        this._inputSignalMode = this._inputSignalMode || (this.haveGamepad() ? 2 : 1);
    };
    const n = Input._onKeyDown;
    Input._onKeyDown = function(e) {
        n.apply(this, arguments), this.keyMapper[e.keyCode] && (this._keyboardDate = Date.now());
    };
    const r = Input._updateGamepadState;
    Input._updateGamepadState = function(e) {
        r.apply(this, arguments);
        for (var a = !1, t = e.buttons, n = e.axes, i = 0; i < t.length; i++) if (t[i].pressed) {
            a = !0;
            break;
        }
        (n[1] < -.5 || .5 < n[1]) && (a = !0), (a = n[0] < -.5 || .5 < n[0] ? !0 : a) && (this._gamepadDate = Date.now());
    }, Input.updateInputSignalMode = function() {
        var e, a;
        navigator.getGamepads && navigator.getGamepads() ? (e = (a = Date.now()) - this._keyboardDate, 
        a = a - this._gamepadDate, this._inputSignalMode = null == a || e < a ? 1 : 2) : this._inputSignalMode = 1;
    };
    const i = Input.update;
    Input.update = function() {
        i.apply(this, arguments), this.updateInputSignalMode();
    }, Input.inputSignalMode = function() {
        return this._inputSignalMode;
    }, Input.isGamepadSignal = function() {
        return 2 == this._inputSignalMode;
    }, Window_Base.prototype.processDrawKey = function(e, a, t) {
        var n, i, r, s, o, p;
        a ? (n = v[a]) && (i = n.width, r = n.height, s = t.x, o = t.y, a = t.height, p = Math.round(a * i / r), 
        this.contents.blt(n, 0, 0, i, r, s, o, p, a), t.x += p) : e && (p = this.textWidth(e), 
        this.contents.drawText(e, t.x, t.y, 2 * p, t.height), t.x += p);
    }, Window_Base.prototype.processDrawKeyboardKey = function(e, a) {
        var t = I[e - 1] || {}, e = t.text, t = t.icon;
        this.processDrawKey(e, t, a);
    }, Window_Base.prototype.processDrawGamepadKey = function(e, a) {
        var t = b[e - 1] || {}, e = t.text, t = t.icon;
        this.processDrawKey(e, t, a);
    };
    const s = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function(e, a) {
        switch (e) {
          case "BK":
            var t = this.obtainEscapeParam(a);
            Input.isGamepadSignal() || this.processDrawKeyboardKey(t, a);
            break;

          case "PK":
            t = this.obtainEscapeParam(a);
            Input.isGamepadSignal() && this.processDrawGamepadKey(t, a);
            break;

          case "BKN":
            t = this.obtainEscapeParam(a);
            this.processDrawKeyboardKey(t, a);
            break;

          case "PKN":
            t = this.obtainEscapeParam(a);
            this.processDrawGamepadKey(t, a);
            break;

          default:
            s.apply(this, arguments);
        }
    }, PluginManager._parameters["MessageCustom2".toLowerCase()] && (e = PluginManager.parameters("MessageCustom2"), 
    parseInt(e.roleImageWidth), parseInt(e.roleImageHeight), parseInt(e.roleImagePadding1), 
    parseInt(e.messageLineHeight), parseInt(e.choiceBackMaskOpacity), parseInt(e.backgroundType), 
    parseInt(e.choicePositionType), parseInt(e.textWidth), d = parseInt(e.textAreaOffestX), 
    parseInt(e.nameSpace), Window_Message.prototype.processDrawKey = function(e, a, t) {
        var n, i, r, s, o, p, c, u;
        a ? (u = this._centerOffestX instanceof Array ? this._centerOffestX[this._lineIndex] : this._centerOffestX, 
        c = d + t.x + u + this._textOffestX, (n = v[a]) && (i = n.width, r = n.height, s = c, 
        o = t.y, p = t.height, a = Math.round(p * i / r), this.contents.blt(n, 0, 0, i, r, s, o, a, p), 
        t.x += a)) : e && (u = this._centerOffestX instanceof Array ? this._centerOffestX[this._lineIndex] : this._centerOffestX, 
        c = d + t.x + u + this._textOffestX, u = this.textWidth(e), this.contents.drawText(e, c, t.y, 2 * u, t.height), 
        t.x += u);
    }), PluginManager._parameters["KJ_Menu".toLowerCase()] && (Bitmap.prototype.drawMutiTexts, 
    Bitmap.prototype.drawMutiTexts = function(e, a, t, n, i) {
        for (var r, s = t, o = a, p = 0, c = e.split(""), u = 0; u < c.length; u++) if ("\n" == (r = c[u])) s += i, 
        o = a; else if ("\\" == r && /^(\\([BP]KN?)\[(\d+)\])/i.exec(e.slice(u))) {
            var d = RegExp.$2 || "", h = RegExp.$3 || "", g = (RegExp.$1 || "").length, l = {}, m = !1, y = !1;
            switch (d) {
              case "BK":
              case "BKN":
                l = I[h - 1] || {};
                break;

              case "PK":
              case "PKN":
                l = b[h - 1] || {};
                break;

              default:
                y = !0;
            }
            switch (d) {
              case "BK":
                m = !Input.isGamepadSignal();
                break;

              case "PK":
                m = !!Input.isGamepadSignal();
                break;

              case "BKN":
              case "PKN":
                m = !0;
                break;

              default:
                y = !(m = !1);
            }
            var f, K, _, M, P = l.text, x = l.icon, w = v[x];
            y ? (n < o + (p = this.measureTextWidth(r)) && (s += i, o = a), this.drawText(r, o, s, 100, i), 
            o += p) : m ? x && w ? (f = w.width, K = w.height, _ = s, M = i, n < (d = o) + (x = Math.round(M * f / K)) && (d = o = a, 
            _ = s += i), this.blt(w, 0, 0, f, K, d, _, x, M), o += x, u += g - 1) : P ? (n < o + (p = this.measureTextWidth(r)) && (s += i, 
            o = a), this.drawText(P, o, s, 100, i), o += p, u += g - 1) : (n < o + (p = this.measureTextWidth(r)) && (s += i, 
            o = a), this.drawText(r, o, s, 100, i), o += p) : u += g - 1;
        } else /[a-zA-Z0-9]/.test(r) && /^([a-zA-Z0-9]+)([ ._\-\/\)]?)/.test(e.slice(u)) ? (g = RegExp.$1 + RegExp.$2, 
        n < o + (p = this.measureTextWidth(g)) && (s += i, o = a), console.log(g, o, s, p, Math.min(p, n - a)), 
        this.drawText(g, o, s, Math.min(p, n - a), i), o += p, u += g.length - 1) : (n < o + (p = this.measureTextWidth(r)) && (s += i, 
        o = a), this.drawText(r, o, s, 100, i), o += p);
        return o != a && (s += i), s;
    });
}();