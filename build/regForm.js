!function(e){function t(t){for(var n,l,u=t[0],c=t[1],o=t[2],m=0,d=[];m<u.length;m++)l=u[m],Object.prototype.hasOwnProperty.call(r,l)&&r[l]&&d.push(r[l][0]),r[l]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);for(s&&s(t);d.length;)d.shift()();return i.push.apply(i,o||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],n=!0,u=1;u<a.length;u++){var c=a[u];0!==r[c]&&(n=!1)}n&&(i.splice(t--,1),e=l(l.s=a[0]))}return e}var n={},r={6:0},i=[];function l(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.m=e,l.c=n,l.d=function(e,t,a){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)l.d(a,n,function(t){return e[t]}.bind(null,n));return a},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="";var u=window.webpackJsonp=window.webpackJsonp||[],c=u.push.bind(u);u.push=t,u=u.slice();for(var o=0;o<u.length;o++)t(u[o]);var s=c;i.push([228,0,1]),a()}({12:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n=a(0),r=a.n(n),i=function(e){var t=e.isRequired,a=void 0!==t&&t,n=e.name,i=void 0===n?"":n,l=e.label,u=void 0!==l&&l,c=e.minLength,o=void 0!==c&&c,s=e.isEditable,m=void 0===s||s,d=e.value,v=e.onChange;return r.a.createElement("div",{className:a?"required field":"field"},u&&r.a.createElement("label",{htmlFor:i},u),r.a.createElement("input",{type:"text",name:i,value:d,onChange:v,required:a,disabled:!m,minLength:o||void 0}))}},14:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var n=a(0),r=a.n(n),i=a(27),l=a(29),u=Object(l.a)(),c=function(e){var t=e.isRequired,a=void 0!==t&&t,n=e.isEditable,l=void 0===n||n,c=e.name,o=void 0===c?"":c,s=e.isMulti,m=void 0!==s&&s,d=e.onChange,v=e.value,b=e.label,f=e.options,p=e.optionWrapper,E=void 0!==p&&p,h=Array.isArray(v)?v.length?"a":"":v&&v.value?"a":"";return r.a.createElement("div",{className:a?"required field":"field"},b&&r.a.createElement("label",{htmlFor:o},b),r.a.createElement(i.a,{options:f,components:E?{Option:E}:u,name:o,onChange:d,isDisabled:!l,value:v,isMulti:m}),a&&r.a.createElement("input",{type:"text",value:h,required:a,style:{opacity:0,height:0,padding:0},tabIndex:-1,autoComplete:"off"}))}},15:function(e,t,a){"use strict";a.d(t,"c",(function(){return l})),a.d(t,"b",(function(){return u})),a.d(t,"a",(function(){return c}));var n=a(11),r=a.n(n);function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var l={value:"",isEditable:!0,isRequired:!0},u={value:"",options:[],isEditable:!0,isRequired:!1},c=function(e){return e.length&&e.map((function(e){return function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({label:e.name,value:e.type},e)}))}},21:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n=a(0),r=a.n(n),i=function(e){var t=e.isRequired,a=void 0!==t&&t,n=e.name,i=void 0===n?"":n,l=e.label,u=void 0!==l&&l,c=e.min,o=void 0!==c&&c,s=e.max,m=void 0!==s&&s,d=e.step,v=void 0!==d&&d,b=e.isEditable,f=void 0===b||b,p=e.value,E=e.onChange;return r.a.createElement("div",{className:"field ".concat(a&&"required")},u&&r.a.createElement("label",{htmlFor:i},u),r.a.createElement("input",{type:"number",name:i,value:p,required:a,disabled:!f,onChange:E,min:o||void 0,max:m||void 0,step:v||void 0}))}},228:function(e,t,a){"use strict";a.r(t);var n,r=a(0),i=a.n(r),l=a(10),u=a.n(l),c=a(3),o=a.n(c),s=a(8),m=a.n(s),d=a(9),v=a.n(d),b=a(1),f=a.n(b),p=a(11),E=a.n(p),h=a(14),g=a(12),y=a(15),O=a(47);function j(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function N(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?j(Object(a),!0).forEach((function(t){E()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):j(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var q=function(e){return e.length&&e.map((function(e){return N({value:e.type},e)}))},C=function(){var e=Object(r.useState)(0),t=f()(e,2),a=t[0],l=t[1],u=function(e){return l(Number(e.target.name))},c=Object(r.useState)(!1),s=f()(c,2),d=s[0],b=s[1],p=Object(r.useState)(""),E=f()(p,2),j=E[0],C=E[1],x=Object(r.useState)("test@remove.later"),w=f()(x,2),S=w[0],k=w[1],R=Object(r.useState)(""),P=f()(R,2),F=P[0],D=P[1],A=Object(r.useState)(""),M=f()(A,2),T=M[0],_=M[1],L=Object(r.useState)(""),I=f()(L,2),B=I[0],J=I[1],W=Object(r.useState)(""),K=f()(W,2),V=K[0],z=K[1],G=Object(r.useState)(""),H=f()(G,2),Q=H[0],U=H[1],X=Object(r.useState)(""),Y=f()(X,2),Z=Y[0],$=Y[1],ee=Object(r.useState)(""),te=f()(ee,2),ae=te[0],ne=te[1],re=Object(r.useState)(""),ie=f()(re,2),le=ie[0],ue=ie[1],ce=Object(r.useState)(""),oe=f()(ce,2),se=oe[0],me=oe[1],de=Object(r.useState)({options:[{label:"@(Отменить выбор)",value:""},{label:"VK",value:"vk"},{label:"Facebook",value:"facebook"}],value:"",isEditable:!0,isRequired:!1}),ve=f()(de,2),be=ve[0],fe=ve[1],pe=Object(r.useState)(y.c),Ee=f()(pe,2),he=Ee[0],ge=Ee[1],ye=Object(r.useState)(y.c),Oe=f()(ye,2),je=Oe[0],Ne=Oe[1],qe=Object(r.useState)(y.c),Ce=f()(qe,2),xe=Ce[0],we=Ce[1],Se=Object(r.useState)(N(N({},y.c),{},{isRequired:!1})),ke=f()(Se,2),Re=ke[0],Pe=ke[1],Fe=Object(r.useState)(N(N({},y.b),{},{accounts:[{type:"",value:""}]})),De=f()(Fe,2),Ae=De[0],Me=De[1],Te=function(e,t){var a=v()(Ae.accounts),n={label:e.label,value:e.value,type:e.type};e.fields.forEach((function(e){n[e.name]=e.value})),a[t]=n,Me(N(N({},Ae),{},{accounts:a}))},_e=function(e,t,a){var n=v()(Ae.accounts);n[a][e]=t,Me(N(N({},Ae),{},{accounts:n}))},Le=function(e){var t=v()(Ae.accounts);t.splice(e,1),Me(N(N({},Ae),{},{accounts:t}))},Ie=function(){var e=m()(o.a.mark((function e(t){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),a={main:{login:j,"e-mail":S,password:F},personal:{firstName:B,secondName:V,thirdName:Q,country:Z,adress:ae,phone:le,birthday:se},accounts:Ae},j&&S&&F&&F===T){e.next=7;break}l(0),b(!0),e.next=17;break;case 7:if(B&&V){e.next=12;break}b(!0),l(1),e.next=17;break;case 12:return b(!1),console.log(a),e.next=16,n.send("accounts","accountsFormData",a);case 16:e.sent;case 17:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){function e(){return(e=m()(o.a.mark((function e(){var t,a,r,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new WebsocketPromiseLiteClient({url:"ws://localhost:5555"}),e.next=3,n.connectionEstablished();case 3:return e.next=5,n.send("accounts","accountsFormData",{});case 5:t=e.sent,a=t.accountsMetaData,r=Object(y.a)(a.options),i=q(a.accounts),Me(N(N({},a),{},{options:r,accounts:i}));case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),i.a.createElement("div",{className:"ui container"},i.a.createElement("div",{className:"ui fragment"},i.a.createElement("button",{onClick:u,className:"ui button ".concat(0===a&&"secondary"),name:"0"},"Основная информация"),i.a.createElement("button",{onClick:u,className:"ui button ".concat(1===a&&"secondary"),name:"1"},"Личная информация"),i.a.createElement("button",{onClick:u,className:"ui button ".concat(2===a&&"secondary"),name:"2"},"Аккаунты и счета"),d&&i.a.createElement("div",{className:"ui warning message"},i.a.createElement("h5",{className:"text red"},"Заполните все обязательные поля"))),i.a.createElement("form",{className:"ui form",onSubmit:Ie},0===a&&i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"field required"},i.a.createElement("label",{htmlFor:"name"},"Логин"),i.a.createElement("input",{name:"name",type:"text",value:j,onChange:function(e){return C(e.target.value)},required:!0})),i.a.createElement("div",{className:"field required"},i.a.createElement("label",{htmlFor:"email"},"E-mail"),i.a.createElement("input",{name:"email",type:"email",value:S,onChange:function(e){return k(e.target.value)},required:!0})),i.a.createElement("div",{className:"field required"},i.a.createElement("label",{htmlFor:"password"},"Пароль"),i.a.createElement("input",{type:"password",value:F,onChange:function(e){return D(e.target.value)},required:!0,minLength:"6"})),i.a.createElement("div",{className:"field required"},i.a.createElement("label",{htmlFor:"password"},"Повторите пароль"),i.a.createElement("input",{type:"password",value:T,onChange:function(e){return _(e.target.value)},required:!0})),i.a.createElement("div",{className:"field inline"},i.a.createElement("label",{htmlFor:"pwordCheck"},"Пароли совпадают"),i.a.createElement("input",{type:"checkbox",required:!0,name:"pwordCheck",checked:F===T&&F}))),1===a&&i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"three fields"},i.a.createElement("div",{className:"field required"},i.a.createElement("label",{htmlFor:"firstName"},"Имя"),i.a.createElement("input",{name:"firstName",type:"text",value:B,onChange:function(e){return J(e.target.value)},required:!0})),i.a.createElement("div",{className:"field required"},i.a.createElement("label",{htmlFor:"secondName"},"Фамилия"),i.a.createElement("input",{name:"secondName",type:"text",value:V,onChange:function(e){return z(e.target.value)},required:!0})),i.a.createElement("div",{className:"field"},i.a.createElement("label",{htmlFor:"thirdName"},"Отчество"),i.a.createElement("input",{name:"thirdName",type:"text",value:Q,onChange:function(e){return U(e.target.value)}}))),i.a.createElement("div",{className:"field"},i.a.createElement("label",{htmlFor:"country"},"Страна"),i.a.createElement("input",{name:"country",type:"text",value:Z,onChange:function(e){return $(e.target.value)}})),i.a.createElement("div",{className:"field"},i.a.createElement("label",{htmlFor:"adress"},"Адрес"),i.a.createElement("input",{name:"adress",type:"text",value:ae,onChange:function(e){return ne(e.target.value)}})),i.a.createElement("div",{className:"two fields"},i.a.createElement("div",{className:"field"},i.a.createElement("label",{htmlFor:"phone"},"Телефон"),i.a.createElement("input",{name:"phone",type:"text",value:le,onChange:function(e){return ue(e.target.value)}})),i.a.createElement("div",{className:"field"},i.a.createElement("label",{htmlFor:"birtdate"},"Дата рождения"),i.a.createElement("input",{name:"birtdate",type:"date",value:se,onChange:function(e){return me(e.target.value)}})))),2===a&&i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"ui segment"},i.a.createElement("h4",null,"@(Счета)"),Boolean(Ae.accounts.length)&&Ae.accounts.map((function(e,t){var a=Ae.accounts.length>1;return i.a.createElement("div",{className:"ui clearing  segment",key:t},i.a.createElement(O.a,{account:e,options:Ae.options,isEditable:Ae.isEditable,isRequired:Ae.isRequired,onAccountTypeChange:Te,index:t,onCustomAccChange:_e,deleteField:Le,canDelete:a}))})),i.a.createElement("button",{className:"ui button green",type:"button",onClick:function(){var e=v()(Ae.accounts);e.push({type:"",value:""}),Me(N(N({},Ae),{},{accounts:e}))}},"@(Добавить)")),i.a.createElement("div",{className:"ui segment"},i.a.createElement("h4",null,"@(Соцсети)"),i.a.createElement(h.a,{label:"@(Выберите соцсеть)",name:"social",isRequired:be.isRequired,isEditable:be.isEditable,options:be.options,value:be.value,onChange:function(e){return fe(N(N({},be),{},{value:e}))}}),be.value&&be.value.value&&i.a.createElement("div",null,i.a.createElement(g.a,{label:"@(Логин или почта)",name:"socialLogin",isRequired:he.isRequired,isEditable:he.isEditable,value:he.value,onChange:function(e){return ge(N(N({},he),{},{value:e.target.value}))}}),i.a.createElement("div",{className:"three fields"},i.a.createElement(g.a,{label:"@(Имя)",name:"socialName",isRequired:je.isRequired,isEditable:je.isEditable,value:je.value,onChange:function(e){return Ne(N(N({},je),{},{value:e.target.value}))}}),i.a.createElement(g.a,{label:"@(Фамилия)",name:"socialSecondName",isRequired:xe.isRequired,isEditable:xe.isEditable,value:xe.value,onChange:function(e){return we(N(N({},xe),{},{value:e.target.value}))}}),i.a.createElement(g.a,{label:"@(Отчество)",name:"socialThirdName",isRequired:Re.isRequired,isEditable:Re.isEditable,value:Re.value,onChange:function(e){return Pe(N(N({},Re),{},{value:e.target.value}))}}))))),i.a.createElement("button",{type:"submit",className:"ui button teal"},"Submit")))};u.a.render(i.a.createElement(C,null),document.getElementById("root"))},39:function(e,t,a){var n=a(38);e.exports=function(e){if(Array.isArray(e))return n(e)}},40:function(e,t){e.exports=function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},41:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},47:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(1),r=a.n(n),i=a(0),l=a.n(i),u=a(14),c=a(12),o=a(21),s=function(e){var t=e.account,a=e.options,n=e.isRequired,s=void 0===n||n,m=e.isEditable,d=void 0===m||m,v=e.onAccountTypeChange,b=e.onCustomAccChange,f=e.index,p=e.deleteField,E=e.canDelete,h=Object(i.useState)([]),g=r()(h,2),y=g[0],O=g[1],j=function(e){return b(e.target.name,e.target.value,f)};return Object(i.useEffect)((function(){var e=a.filter((function(e){return e.value===t.value}))[0];e&&O(e.fields)}),[t.value]),l.a.createElement("div",null,l.a.createElement(u.a,{label:"@(Тип платежной системы)",name:"accountType",isRequired:s,isEditable:d,options:a,value:t,onChange:function(e){return v(e,f)}}),l.a.createElement("div",{className:"fields"},Boolean(y.length)&&y.map((function(e){return"text"===e.type?l.a.createElement(c.a,{label:e.label,name:e.name,isRequired:e.isRequired,isEditable:e.isEditable,value:t[e.name],onChange:j,key:e.name+"txt"+t.value}):"number"===e.type?l.a.createElement(o.a,{label:e.label,name:e.name,isRequired:e.isRequired,isEditable:e.isEditable,value:t[e.name],onChange:j,step:e.step,min:e.min,max:e.max,key:e.name+"txt"+t.value}):void 0}))),l.a.createElement("button",{className:"ui right floated button red ".concat(!E&&"disabled"),type:"button",onClick:function(){return p(f)}},"@(Удалить)"))}},9:function(e,t,a){var n=a(39),r=a(40),i=a(37),l=a(41);e.exports=function(e){return n(e)||r(e)||i(e)||l()}}});