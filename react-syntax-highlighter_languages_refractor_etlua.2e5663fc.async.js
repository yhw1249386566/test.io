(self["webpackChunk"]=self["webpackChunk"]||[]).push([[8126,8119,3047],{66055:function(e,n,t){"use strict";var a=t(59803),r=t(93205);function i(e){e.register(a),e.register(r),function(e){e.languages.etlua={delimiter:{pattern:/^<%[-=]?|-?%>$/,alias:"punctuation"},"language-lua":{pattern:/[\s\S]+/,inside:e.languages.lua}},e.hooks.add("before-tokenize",(function(n){var t=/<%[\s\S]+?%>/g;e.languages["markup-templating"].buildPlaceholders(n,"etlua",t)})),e.hooks.add("after-tokenize",(function(n){e.languages["markup-templating"].tokenizePlaceholders(n,"etlua")}))}(e)}e.exports=i,i.displayName="etlua",i.aliases=[]},59803:function(e){"use strict";function n(e){e.languages.lua={comment:/^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,string:{pattern:/(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[^z]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,greedy:!0},number:/\b0x[a-f\d]+(?:\.[a-f\d]*)?(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|(?:\.\d*)?(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,keyword:/\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,function:/(?!\d)\w+(?=\s*(?:[({]))/,operator:[/[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,{pattern:/(^|[^.])\.\.(?!\.)/,lookbehind:!0}],punctuation:/[\[\](){},;]|\.+|:+/}}e.exports=n,n.displayName="lua",n.aliases=[]},93205:function(e){"use strict";function n(e){(function(e){function n(e,n){return"___"+e.toUpperCase()+n+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(t,a,r,i){if(t.language===a){var o=t.tokenStack=[];t.code=t.code.replace(r,(function(e){if("function"===typeof i&&!i(e))return e;var r,u=o.length;while(-1!==t.code.indexOf(r=n(a,u)))++u;return o[u]=e,r})),t.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(t,a){if(t.language===a&&t.tokenStack){t.grammar=e.languages[a];var r=0,i=Object.keys(t.tokenStack);o(t.tokens)}function o(u){for(var l=0;l<u.length;l++){if(r>=i.length)break;var s=u[l];if("string"===typeof s||s.content&&"string"===typeof s.content){var c=i[r],g=t.tokenStack[c],p="string"===typeof s?s:s.content,f=n(a,c),d=p.indexOf(f);if(d>-1){++r;var k=p.substring(0,d),m=new e.Token(a,e.tokenize(g,t.grammar),"language-"+a,g),b=p.substring(d+f.length),h=[];k&&h.push.apply(h,o([k])),h.push(m),b&&h.push.apply(h,o([b])),"string"===typeof s?u.splice.apply(u,[l,1].concat(h)):s.content=h}}else s.content&&o(s.content)}return u}}}})})(e)}e.exports=n,n.displayName="markupTemplating",n.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_etlua.2e5663fc.async.js.map