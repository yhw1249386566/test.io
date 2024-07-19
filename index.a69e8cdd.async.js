(self["webpackChunk"]=self["webpackChunk"]||[]).push([[4826],{28487:function(e){e.exports={layout:"layout___1uzIr",container:"container___3XCPZ",absoluteHorizontalVerticalCenter:"absoluteHorizontalVerticalCenter___21_uB",marginHorizontalVerticalCenter:"marginHorizontalVerticalCenter___3QJyU",textOverflowEllipsis:"textOverflowEllipsis___1wr59"}},92649:function(e){e.exports={"header-light":"header-light___3cGmx","header-dark":"header-dark___pcRuq",header:"header___2O2lm",menuIcon:"menuIcon___3n4mO",themeIcon:"themeIcon___q2Qkx",logo:"logo___11RZm",headerInfo:"headerInfo___25wHO",searchBox:"searchBox___3hXJ9",hideMenuIcon:"hideMenuIcon___f7ivs",left:"left___2g1gv",absoluteHorizontalVerticalCenter:"absoluteHorizontalVerticalCenter___2C_vn",marginHorizontalVerticalCenter:"marginHorizontalVerticalCenter___scs3c",textOverflowEllipsis:"textOverflowEllipsis___PsGMq"}},19696:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return Z}});var r=a(34699),o=a(67294),l=a(98881),n=a(9382),c=a(84131),s=a(747),i=a(28487),_=a.n(i),m=a(8675),u=a(51615),g=a(40646),h=a(62132),v=a(67814),E=a(80560),d=a(27398),f=a(92649),S=a.n(f),k=e=>{var t=e.theme,a=void 0===t?"light":t,l=e.onToggleTheme,n=void 0===l?()=>null:l,s=(0,o.useState)("bars"),i=(0,r.Z)(s,2),_=i[0],f=i[1],k=(0,u.k6)(),C=(0,u.TH)();return(0,o.useEffect)((()=>(h.Z.on(d.W1.HEADER_MENU_ICON,(e=>{f(e)})),()=>{h.Z.off(d.W1.HEADER_MENU_ICON)})),[]),o.createElement("div",{className:(0,g.Z)(S().header,S()["header-".concat(a)])},o.createElement(m.Nm,{className:S().headerInfo},o.createElement(m.Nm,{className:S().left},o.createElement(v.G,{icon:_,className:(0,g.Z)(S().menuIcon,{[S().hideMenuIcon]:!C.pathname.includes("/feature/article")}),onClick:()=>{f("bars"===_?"xmark":"bars"),h.Z.emit(d.W1.OPEN_ARTICLE_DIRECTORY)}}),o.createElement("div",{className:S().logo,onClick:()=>{k.push("/".concat(d.QV.Index)),f("bars")}})),o.createElement("div",{className:S().searchBox,onClick:()=>{h.Z.emit(d.W1.TOGGLE_SEARCH_PANEL,!0)}},C.pathname.includes("/feature/article")&&o.createElement(m.ol,{event:{name:"keydown",handler:function(e){var t=e.ctrlKey&&e.shiftKey&&"x"===e.key.toLowerCase();t&&(e.preventDefault(),h.Z.emit(d.W1.TOGGLE_SEARCH_PANEL,!1))}},kbd:[{text:"Ctrl"},{text:"Shift"},{text:"X"}]})),o.createElement(m.Nm,{style:S().right},o.createElement(v.G,{className:S().themeIcon,icon:"light"===a?c.enB:c.DBF,onClick:()=>{var e="light"===a?"dark":"light";E.Z.saveLocalStorage({key:d.by.DATA_THEME,value:e}),n(e)}}))))},C=(0,o.memo)(k),y=a(90155);n.vI.add(c.mRB,s.D9H,s.sd1,s.NY9,s.pZl);var I=e=>{var t=(0,o.useState)("light"),a=(0,r.Z)(t,2),n=a[0],c=a[1],s=(0,o.useCallback)((e=>{c(e)}),[]);return(0,o.useEffect)((()=>{var e=document.querySelector("html");e&&e.setAttribute(d.by.DATA_THEME,n)}),[n]),(0,o.useEffect)((()=>{var e=E.Z.getLocalStorage(d.by.DATA_THEME);e&&c(e)}),[]),o.createElement(y.f,{theme:n},o.createElement(l.Z,{className:_().layout},o.createElement(C,{theme:n,onToggleTheme:s}),o.createElement(l.Z.Content,{className:_().container},o.createElement(m.YE,null),e.children)))},Z=I},80560:function(e,t,a){"use strict";var r=a(11101),o=a(27398),l=e=>{var t=e.key,a=e.value;return t?(localStorage.setItem(t,a),!0):(r.Z.error("saveLocalStorage key \u4e0d\u5b58\u5728",t),!1)},n=e=>{var t=!0;return e.forEach((e=>{if(!e.key)return t=!1,void r.Z.error("\u6279\u91cf\u4fdd\u5b58\u6570\u636e\u5230\u672c\u5730\u5931\u8d25: saveBatchLocalStorage key \u4e0d\u5b58\u5728")})),!!t&&(e.forEach((e=>{var t=null!==e&&void 0!==e?e:{},a=t.key,r=t.value;localStorage.setItem(a,r)})),!0)},c=(e,t)=>{var a;if(!e)return r.Z.error("getLocalStorage: key \u4e0d\u5b58\u5728"),"";var l=null!==t&&void 0!==t?t:{},n=l.returnType,c=void 0===n?"string":n,s=o.c7[c];return s(null!==(a=localStorage.getItem(e))&&void 0!==a?a:"")},s=e=>e?(localStorage.removeItem(e),!0):(r.Z.error("clearLocalStorage: key \u4e0d\u5b58\u5728"),!1),i=()=>(localStorage.clear(),!0),_=e=>{var t=e.key,a=e.value;t?sessionStorage.setItem(t,a):r.Z.error("saveSessionStorage: key \u4e0d\u5b58\u5728")},m=e=>{var t;return e?null!==(t=sessionStorage.getItem(e))&&void 0!==t?t:"":(r.Z.error("getSessionStorage: key \u4e0d\u5b58\u5728"),"")};t["Z"]={saveLocalStorage:l,saveBatchLocalStorage:n,getLocalStorage:c,clearLocalStorage:s,clearAllLocalStorage:i,saveSessionStorage:_,getSessionStorage:m}}}]);
//# sourceMappingURL=index.a69e8cdd.async.js.map