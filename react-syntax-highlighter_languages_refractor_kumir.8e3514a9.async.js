(self["webpackChunk"]=self["webpackChunk"]||[]).push([[1627],{27614:function(n){"use strict";function o(n){(function(n){var o=/\s\x00-\x1f\x22-\x2f\x3a-\x3f\x5b-\x5e\x60\x7b-\x7e/.source;function e(n,e){return RegExp(n.replace(/<nonId>/g,o),e)}n.languages.kumir={comment:{pattern:/\|.*/},prolog:{pattern:/#.*/,greedy:!0},string:{pattern:/"[^\n\r"]*"|'[^\n\r']*'/,greedy:!0},boolean:{pattern:e(/(^|[<nonId>])(?:\u0434\u0430|\u043d\u0435\u0442)(?=[<nonId>]|$)/.source),lookbehind:!0},"operator-word":{pattern:e(/(^|[<nonId>])(?:\u0438|\u0438\u043b\u0438|\u043d\u0435)(?=[<nonId>]|$)/.source),lookbehind:!0,alias:"keyword"},"system-variable":{pattern:e(/(^|[<nonId>])\u0437\u043d\u0430\u0447(?=[<nonId>]|$)/.source),lookbehind:!0,alias:"keyword"},type:[{pattern:e(/(^|[<nonId>])(?:\u0432\u0435\u0449|\u043b\u0438\u0442|\u043b\u043e\u0433|\u0441\u0438\u043c|\u0446\u0435\u043b)(?:\x20*\u0442\u0430\u0431)?(?=[<nonId>]|$)/.source),lookbehind:!0,alias:"builtin"},{pattern:e(/(^|[<nonId>])(?:\u043a\u043e\u043c\u043f\u043b|\u0441\u043a\u0430\u043d\u043a\u043e\u0434|\u0444\u0430\u0439\u043b|\u0446\u0432\u0435\u0442)(?=[<nonId>]|$)/.source),lookbehind:!0,alias:"important"}],keyword:{pattern:e(/(^|[<nonId>])(?:\u0430\u043b\u0433|\u0430\u0440\u0433(?:\x20*\u0440\u0435\u0437)?|\u0432\u0432\u043e\u0434|\u0412\u041a\u041b\u042e\u0427\u0418\u0422\u042c|\u0432\u0441[\u0435\u0451]|\u0432\u044b\u0431\u043e\u0440|\u0432\u044b\u0432\u043e\u0434|\u0432\u044b\u0445\u043e\u0434|\u0434\u0430\u043d\u043e|\u0434\u043b\u044f|\u0434\u043e|\u0434\u0441|\u0435\u0441\u043b\u0438|\u0438\u043d\u0430\u0447\u0435|\u0438\u0441\u043f|\u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c|\u043a\u043e\u043d(?:(?:\x20+|_)\u0438\u0441\u043f)?|\u043a\u0446(?:(?:\x20+|_)\u043f\u0440\u0438)?|\u043d\u0430\u0434\u043e|\u043d\u0430\u0447|\u043d\u0441|\u043d\u0446|\u043e\u0442|\u043f\u0430\u0443\u0437\u0430|\u043f\u043e\u043a\u0430|\u043f\u0440\u0438|\u0440\u0430\u0437\u0430?|\u0440\u0435\u0437|\u0441\u0442\u043e\u043f|\u0442\u0430\u0431|\u0442\u043e|\u0443\u0442\u0432|\u0448\u0430\u0433)(?=[<nonId>]|$)/.source),lookbehind:!0},name:{pattern:e(/(^|[<nonId>])[^\d<nonId>][^<nonId>]*(?:\x20+[^<nonId>]+)*(?=[<nonId>]|$)/.source),lookbehind:!0},number:{pattern:e(/(^|[<nonId>])(?:\B\$[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)(?=[<nonId>]|$)/.source,"i"),lookbehind:!0},punctuation:/:=|[(),:;\[\]]/,"operator-char":{pattern:/\*\*?|<[=>]?|>=?|[-+/=]/,alias:"operator"}},n.languages.kum=n.languages.kumir})(n)}n.exports=o,o.displayName="kumir",o.aliases=["kum"]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_kumir.8e3514a9.async.js.map