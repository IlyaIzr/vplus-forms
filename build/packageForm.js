!function(e){function t(t){for(var r,o,u=t[0],c=t[1],l=t[2],d=0,f=[];d<u.length;d++)o=u[d],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(s&&s(t);f.length;)f.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,u=1;u<n.length;u++){var c=n[u];0!==a[c]&&(r=!1)}r&&(i.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},a={6:0},i=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var u=window.webpackJsonp=window.webpackJsonp||[],c=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var s=c;i.push([227,0,1]),n()}({13:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(0),a=n.n(r),i=n(22),o=n(26),u=Object(o.a)(),c=function(e){var t=e.isRequired,n=void 0!==t&&t,r=e.isEditable,o=void 0===r||r,c=e.name,l=void 0===c?"":c,s=e.isMulti,d=void 0!==s&&s,f=e.onChange,p=e.value,m=e.label,h=e.options,v=e.optionWrapper,b=void 0!==v&&v,g=Array.isArray(p)?p.length?"a":"":p&&p.value?"a":"";return a.a.createElement("div",{className:n?"required field":"field"},m&&a.a.createElement("label",{htmlFor:l},m),a.a.createElement(i.a,{options:h,components:b?{Option:b}:u,name:l,onChange:f,isDisabled:!o,value:p,isMulti:d}),n&&a.a.createElement("input",{type:"text",value:g,required:n,style:{opacity:0,height:0,padding:0},tabIndex:-1,autoComplete:"off"}))}},222:function(e,t,n){var r=n(75),a=n(223);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var i={insert:"head",singleton:!1};r(a,i);e.exports=a.locals||{}},223:function(e,t,n){"use strict";n.r(t);var r=n(47),a=n.n(r)()(!1);a.push([e.i,".inputRange {\r\n  -webkit-appearance: none;\r\n  vertical-align: middle;\r\n  outline: none;\r\n  border: none;\r\n  padding: 0;\r\n  background: none;\r\n  width: 95%;\r\n  position: absolute;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n}\r\n\r\n.positionRelative {\r\n  position: relative;\r\n}\r\n\r\n.inputRange::-webkit-slider-runnable-track {\r\n  background-color: #d7dbdd;\r\n  height: 6px;\r\n  border-radius: 3px;\r\n  border: 1px solid transparent;\r\n}\r\n\r\n.inputRange::-moz-range-track {\r\n  background-color: #d7dbdd;\r\n  height: 6px;\r\n  border-radius: 3px;\r\n  border: none;\r\n}\r\n\r\n.inputRange::-ms-track {\r\n  color: transparent;\r\n  border: none;\r\n  background: none;\r\n  height: 6px;\r\n}\r\n\r\n.inputRange::-ms-fill-lower { \r\n  background-color: #d7dbdd;\r\n  border-radius: 3px;\r\n}\r\n\r\n.inputRange::-ms-fill-upper { \r\n  background-color: #d7dbdd;\r\n  border-radius: 3px;\r\n}\r\n\r\n.inputRange::-ms-tooltip { display: none; /* display and visibility only */ }\r\n\r\n.inputRange::-moz-range-thumb {\r\n  border-radius: 20px;\r\n  height: 18px;\r\n  width: 18px;\r\n  border: none;\r\n  background: none;\r\n  background-color: #606670;\r\n}\r\n\r\n.inputRange:active::-moz-range-thumb {\r\n  outline: none;\r\n}\r\n\r\n.inputRange::-webkit-slider-thumb {\r\n  -webkit-appearance: none !important;\r\n  border-radius: 100%;\r\n  background-color: #606670;\r\n  height: 18px;\r\n  width: 18px;\r\n  margin-top: -7px;\r\n}\r\n\r\n.inputRange[disabled]::-webkit-slider-thumb {\r\n  background-color: transparent;\r\n  border: 1px solid #d7dbdd;\r\n}\r\n\r\n.inputRange:active::-webkit-slider-thumb {\r\n  outline: none;\r\n}\r\n\r\n.inputRange::-ms-thumb { \r\n  border-radius: 100%;\r\n  background-color: #606670;\r\n  height: 18px;\r\n  width: 18px; \r\n  border: none;\r\n}\r\n\r\n.inputRange:active::-ms-thumb {\r\n  border: none;\r\n}\r\n\r\n@media (max-width: 960px) {\r\n  .inputRange{\r\n    position: relative;\r\n  }\r\n  \r\n }",""]),t.default=a},227:function(e,t,n){"use strict";n.r(t);var r,a=n(0),i=n.n(a),o=n(9),u=n.n(o),c=n(3),l=n.n(c),s=n(7),d=n.n(s),f=n(11),p=n.n(f),m=n(1),h=n.n(m),v=(n(222),n(13));function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){p()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y={value:"",isEditable:!0,isRequired:!0,min:"",max:""},x={value:"",isEditable:!0,isRequired:!0},w=function(){var e=Object(a.useState)({options:[],isEditable:!1,isRequired:!0,value:[]}),t=h()(e,2),n=t[0],o=t[1],u=Object(a.useState)(y),c=h()(u,2),s=c[0],f=c[1],p=Object(a.useState)(50),m=h()(p,2),b=m[0],w=m[1],E=Object(a.useState)(g(g({},y),{},{max:100,min:0})),R=h()(E,2),O=R[0],k=R[1],j=Object(a.useState)(g(g({},y),{},{max:100,min:0})),F=h()(j,2),q=F[0],N=F[1],S=function(e){"playerRiskField"===e.target.name||"playerRisk"===e.target.name?(w(e.target.value),k(g(g({},O),{},{value:e.target.value})),N(g(g({},q),{},{value:100-e.target.value}))):"fundRiskField"===e.target.name&&(w(100-e.target.value),k(g(g({},O),{},{value:100-e.target.value})),N(g(g({},q),{},{value:e.target.value})))},L=Object(a.useState)(y),C=h()(L,2),P=C[0],_=C[1],M=Object(a.useState)(y),I=h()(M,2),T=I[0],D=I[1],A=Object(a.useState)(g({},y)),B=h()(A,2),G=B[0],U=B[1],z=Object(a.useState)(y),J=h()(z,2),Y=J[0],H=J[1],W=Object(a.useState)(g(g({},x),{},{isRequired:!1})),K=h()(W,2),Q=K[0],V=K[1];Object(a.useEffect)((function(){function e(){return(e=d()(l.a.mark((function e(){var t,n,a,i,u,c,s,d,p,m,h,v;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new WebsocketPromiseLiteClient({url:"ws://localhost:5555"}),e.next=3,r.connectionEstablished();case 3:return e.next=5,r.send("package","packageFormData",{});case 5:return t=e.sent,n=t.roomsFieldMeta,a=t.tournamentsNumberMeta,i=t.playerRiskMeta,u=t.fundRiskMeta,c=t.BIMeta,s=t.BRSumField,d=t.RollbackField,p=t.BuyInsField,m=t.ExtraInfoField,h=[],e.next=10,n.options.forEach((function(e){h.push({value:e.id,label:e.name})}));case 10:return v=[],e.next=13,n.value.forEach((function(e){v.push({value:e.id,label:e.name})}));case 13:o(g(g({},n),{},{options:h,value:v})),f(a),k(i),N(u),w(i.value),_(c),D(s),U(d),H(p),V(m);case 23:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var X=function(){var e=d()(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a={roomsField:n,tournamentsField:s,playerRiskField:O,fundRiskField:q,aBIField:P,bRSumField:T,rollbackField:G,buyInsField:Y,extraInfoField:Q},console.log(a),e.next=5,r.send("package","packageFormData",a);case 5:e.sent;case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return i.a.createElement("div",{className:"ui container"},i.a.createElement("form",{className:"ui form",onSubmit:X,onReset:function(){o(g(g({},n),{},{value:[]})),f(y),k(g(g({},y),{},{max:100,min:0})),N(g(g({},y),{},{max:100,min:0})),w(50),_(y),D(y),U(y),H(y),V(g(g({},x),{},{isRequired:!1}))}},i.a.createElement("h3",{className:"title"},"@(Новый пакет)"),i.a.createElement("div",{className:"field ".concat(s.isRequired&&"required")},i.a.createElement("label",{htmlFor:"tournamentsField"},"@(Количество турниров в пакете) "),i.a.createElement("input",{type:"number",value:s.value,required:s.isRequired,disabled:!s.isEditable,min:s.min,max:s.max,onChange:function(e){return f(g(g({},s),{},{value:e.target.value}))},name:"tournamentsField"})),i.a.createElement("h4",{className:"title"},"@(Заявленные доли рисков в пакете)"),i.a.createElement("div",{className:"three fields"},i.a.createElement("div",{className:"field ".concat(O.isRequired&&"required")},i.a.createElement("label",{htmlFor:"playerRiskField"},"Игрок"),i.a.createElement("input",{type:"number",value:b,required:O.isRequired,disabled:!O.isEditable,min:O.min,max:O.max,onChange:S,name:"playerRiskField"})),i.a.createElement("div",{className:"field positionRelative"},i.a.createElement("input",{type:"range",name:"playerRisk",value:b,onChange:S,className:"inputRange"})),i.a.createElement("div",{className:"field ".concat(q.isRequired&&"required")},i.a.createElement("label",{htmlFor:"fundRiskField"},"Фонд"),i.a.createElement("input",{type:"number",value:100-b,required:q.isRequired,disabled:!q.isEditable,min:q.min,max:q.max,onChange:S,name:"fundRiskField"}))),i.a.createElement("div",{className:"ui horizontal divider"}),i.a.createElement("div",{className:"two fields"},i.a.createElement("div",{className:"field ".concat(P.isRequired&&"required")},i.a.createElement("label",{htmlFor:"buyInsField"},"@(Рекомендованное количество БИ)"),i.a.createElement("input",{type:"number",value:P.value,required:P.isRequired,disabled:!P.isEditable,min:P.min,max:P.max,onChange:function(e){return _(g(g({},P),{},{value:e.target.value}))}})),i.a.createElement("div",{className:"field ".concat(T.isRequired&&"required")},i.a.createElement("label",{htmlFor:"buyInsField"},"@(Сумма игрока в своей БР)"),i.a.createElement("input",{type:"number",value:T.value,required:T.isRequired,disabled:!T.isEditable,min:T.min,max:T.max,onChange:function(e){return D(g(g({},T),{},{value:e.target.value}))}}))),i.a.createElement("div",{className:"two fields"},i.a.createElement("div",{className:"field ".concat(G.isRequired&&"required")},i.a.createElement("label",{htmlFor:"rollbackField"},"@(Величина отката игроку)"),i.a.createElement("input",{type:"number",value:G.value,required:G.isRequired,disabled:!G.isEditable,min:G.min,max:G.max,onChange:function(e){U(g(g({},G),{},{value:e.target.value}))},name:"rollbackField"})),i.a.createElement("div",{className:"field ".concat(Y.isRequired&&"required")},i.a.createElement("label",{htmlFor:"buyInsField"},"@(Кол-во байинов на счету игрока)"),i.a.createElement("input",{type:"number",value:Y.value,required:Y.isRequired,disabled:!Y.isEditable,min:Y.min,max:Y.max,onChange:function(e){return H(g(g({},Y),{},{value:e.target.value}))}}))),i.a.createElement(v.a,{label:"Выберите один или несколько румов",options:n.options,isMulti:!0,onChange:function(e){o(g(g({},n),{},{value:e}))},value:n.value,name:"rooms",isRequired:n.isRequired}),i.a.createElement("div",{className:"field"},i.a.createElement("label",{htmlFor:"extraInfoField"},"@(Дополнительные условия пакета)"),i.a.createElement("textarea",{name:"extraInfoField",cols:"100",rows:"10",value:Q.value,onChange:function(e){return V(g(g({},Q),{},{value:e.target.value}))},disabled:!Q.isEditable})),i.a.createElement("button",{type:"reset",className:"ui button red"},"@(Сбросить поля)"),i.a.createElement("button",{type:"submit",className:"ui button green"},"@(Отправить)")))};u.a.render(i.a.createElement(w,null),document.getElementById("root"))},28:function(e,t,n){var r=function(e){"use strict";var t=Object.prototype,n=t.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},a=r.iterator||"@@iterator",i=r.asyncIterator||"@@asyncIterator",o=r.toStringTag||"@@toStringTag";function u(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{u({},"")}catch(e){u=function(e,t,n){return e[t]=n}}function c(e,t,n,r){var a=t&&t.prototype instanceof d?t:d,i=Object.create(a.prototype),o=new R(r||[]);return i._invoke=function(e,t,n){var r="suspendedStart";return function(a,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===a)throw i;return k()}for(n.method=a,n.arg=i;;){var o=n.delegate;if(o){var u=x(o,n);if(u){if(u===s)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var c=l(e,t,n);if("normal"===c.type){if(r=n.done?"completed":"suspendedYield",c.arg===s)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r="completed",n.method="throw",n.arg=c.arg)}}}(e,n,o),i}function l(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}e.wrap=c;var s={};function d(){}function f(){}function p(){}var m={};m[a]=function(){return this};var h=Object.getPrototypeOf,v=h&&h(h(O([])));v&&v!==t&&n.call(v,a)&&(m=v);var b=p.prototype=d.prototype=Object.create(m);function g(e){["next","throw","return"].forEach((function(t){u(e,t,(function(e){return this._invoke(t,e)}))}))}function y(e,t){var r;this._invoke=function(a,i){function o(){return new t((function(r,o){!function r(a,i,o,u){var c=l(e[a],e,i);if("throw"!==c.type){var s=c.arg,d=s.value;return d&&"object"==typeof d&&n.call(d,"__await")?t.resolve(d.__await).then((function(e){r("next",e,o,u)}),(function(e){r("throw",e,o,u)})):t.resolve(d).then((function(e){s.value=e,o(s)}),(function(e){return r("throw",e,o,u)}))}u(c.arg)}(a,i,r,o)}))}return r=r?r.then(o,o):o()}}function x(e,t){var n=e.iterator[t.method];if(void 0===n){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,x(e,t),"throw"===t.method))return s;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return s}var r=l(n,e.iterator,t.arg);if("throw"===r.type)return t.method="throw",t.arg=r.arg,t.delegate=null,s;var a=r.arg;return a?a.done?(t[e.resultName]=a.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,s):a:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,s)}function w(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function E(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function R(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(w,this),this.reset(!0)}function O(e){if(e){var t=e[a];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,i=function t(){for(;++r<e.length;)if(n.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=void 0,t.done=!0,t};return i.next=i}}return{next:k}}function k(){return{value:void 0,done:!0}}return f.prototype=b.constructor=p,p.constructor=f,f.displayName=u(p,o,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===f||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,p):(e.__proto__=p,u(e,o,"GeneratorFunction")),e.prototype=Object.create(b),e},e.awrap=function(e){return{__await:e}},g(y.prototype),y.prototype[i]=function(){return this},e.AsyncIterator=y,e.async=function(t,n,r,a,i){void 0===i&&(i=Promise);var o=new y(c(t,n,r,a),i);return e.isGeneratorFunction(n)?o:o.next().then((function(e){return e.done?e.value:o.next()}))},g(b),u(b,o,"Generator"),b[a]=function(){return this},b.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=O,R.prototype={constructor:R,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(E),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(n,r){return o.type="throw",o.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],o=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),c=n.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var i=a;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=e,o.arg=t,i?(this.method="next",this.next=i.finallyLoc,s):this.complete(o)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),s},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),E(n),s}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var a=r.arg;E(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:O(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),s}},e}(e.exports);try{regeneratorRuntime=r}catch(e){Function("r","regeneratorRuntime = r")(r)}},3:function(e,t,n){e.exports=n(28)},47:function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var a=(o=r,u=btoa(unescape(encodeURIComponent(JSON.stringify(o)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(u),"/*# ".concat(c," */")),i=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")}));return[n].concat(i).concat([a]).join("\n")}var o,u,c;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,r){"string"==typeof e&&(e=[[null,e,""]]);var a={};if(r)for(var i=0;i<this.length;i++){var o=this[i][0];null!=o&&(a[o]=!0)}for(var u=0;u<e.length;u++){var c=[].concat(e[u]);r&&a[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),t.push(c))}},t}},7:function(e,t){function n(e,t,n,r,a,i,o){try{var u=e[i](o),c=u.value}catch(e){return void n(e)}u.done?t(c):Promise.resolve(c).then(r,a)}e.exports=function(e){return function(){var t=this,r=arguments;return new Promise((function(a,i){var o=e.apply(t,r);function u(e){n(o,a,i,u,c,"next",e)}function c(e){n(o,a,i,u,c,"throw",e)}u(void 0)}))}}},75:function(e,t,n){"use strict";var r,a=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},i=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),o=[];function u(e){for(var t=-1,n=0;n<o.length;n++)if(o[n].identifier===e){t=n;break}return t}function c(e,t){for(var n={},r=[],a=0;a<e.length;a++){var i=e[a],c=t.base?i[0]+t.base:i[0],l=n[c]||0,s="".concat(c," ").concat(l);n[c]=l+1;var d=u(s),f={css:i[1],media:i[2],sourceMap:i[3]};-1!==d?(o[d].references++,o[d].updater(f)):o.push({identifier:s,updater:v(f,t),references:1}),r.push(s)}return r}function l(e){var t=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var a=n.nc;a&&(r.nonce=a)}if(Object.keys(r).forEach((function(e){t.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(t);else{var o=i(e.insert||"head");if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}return t}var s,d=(s=[],function(e,t){return s[e]=t,s.filter(Boolean).join("\n")});function f(e,t,n,r){var a=n?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=d(t,a);else{var i=document.createTextNode(a),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(i,o[t]):e.appendChild(i)}}function p(e,t,n){var r=n.css,a=n.media,i=n.sourceMap;if(a?e.setAttribute("media",a):e.removeAttribute("media"),i&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var m=null,h=0;function v(e,t){var n,r,a;if(t.singleton){var i=h++;n=m||(m=l(t)),r=f.bind(null,n,i,!1),a=f.bind(null,n,i,!0)}else n=l(t),r=p.bind(null,n,t),a=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else a()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=a());var n=c(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<n.length;r++){var a=u(n[r]);o[a].references--}for(var i=c(e,t),l=0;l<n.length;l++){var s=u(n[l]);0===o[s].references&&(o[s].updater(),o.splice(s,1))}n=i}}}}});