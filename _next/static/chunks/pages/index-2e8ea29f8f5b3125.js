(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{67548:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(90230)}])},90230:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return v}});var n=t(35810),o=t(91741),i=t.n(o),a=t(18855),c=t(52159),l=t(50966),u=t(57744),s=t.n(u),f=t(28575);function d(e,r,t,n,o,i,a){try{var c=e[i](a),l=c.value}catch(u){return void t(u)}c.done?r(l):Promise.resolve(l).then(n,o)}function p(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function m(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),n.forEach((function(r){p(e,r,t[r])}))}return e}function h(e,r){return t=s().mark((function t(){var n,o,i;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://gateway.testnet.thegraph.com/api/5ee2fbe7857f644cfa10ca67e3147a7d/subgraphs/id/EeYwFoxxSgtR1gRhejSDp9sCujDvedcbLGLDH4rucfoW",m({method:"POST"},{headers:{"Content-Type":"application/json"}},{body:JSON.stringify({query:e,variables:r})}));case 2:return n=t.sent,t.next=5,n.json();case 5:if(!(o=t.sent).errors){t.next=9;break}throw i=o.errors[0].message,new Error(i);case 9:return t.abrupt("return",o.data);case 10:case"end":return t.stop()}}),t)})),function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(e){d(i,n,o,a,c,"next",e)}function c(e){d(i,n,o,a,c,"throw",e)}a(void 0)}))};var t}function b(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function g(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function y(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),n.forEach((function(r){g(e,r,t[r])}))}return e}function x(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,o,i=[],a=!0,c=!1;try{for(t=t.call(e);!(a=(n=t.next()).done)&&(i.push(n.value),!r||i.length!==r);a=!0);}catch(l){c=!0,o=l}finally{try{a||null==t.return||t.return()}finally{if(c)throw o}}return i}}(e,r)||function(e,r){if(!e)return;if("string"===typeof e)return b(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return b(e,r)}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var v=function(){var e,r,t=(0,a.useState)({orderBy:"createdAt",orderDirection:"desc"}),o=t[0],u=t[1],s=(e=o,r={refetchOnWindowFocus:!1},(0,f.useQuery)(void 0===e?["Projects"]:["Projects",e],h("\n    query Projects($orderBy: Project_orderBy, $orderDirection: OrderDirection) {\n  projects(orderBy: $orderBy, orderDirection: $orderDirection) {\n    id\n    name\n    imageUrl\n    description\n    createdAt\n    owner {\n      id\n    }\n  }\n}\n    ",e),r)),d=s.data,p=s.isLoading,m=d&&d.projects.length;return(0,n.tZ)("main",{sx:{px:"1rem",maxWidth:"$container",mx:"auto"},children:(0,n.BX)("section",{children:[(0,n.BX)("header",{sx:{pb:"2rem",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,n.BX)("div",{children:[(0,n.tZ)(c.X,{children:"Projects Registry"}),(0,n.tZ)("p",{sx:{height:"1.5rem"},children:null==m?"":"".concat(m," Projects")})]}),(0,n.tZ)(O,{value:o,onChange:u})]}),(0,n.BX)("ul",{sx:y({listStyle:"none",m:0,p:0,display:"grid",gap:"2rem",gridTemplateColumns:"repeat(auto-fill, minmax(180px, 1fr))"},p&&{opacity:.8,cursor:"wait"}),children:[(0,n.tZ)("li",{sx:{display:"flex",flexDirection:"column",alignItems:"stretch",height:"222px"},children:(0,n.tZ)(i(),{href:"/project/add",children:(0,n.tZ)("a",{sx:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",backgroundColor:"background.card",borderRadius:"4px",boxShadow:"0px 4px 24px rgba(30, 37, 44, 0.16), inset 0 0 0 8px var(--theme-ui-colors-primary-88)",transition:"box-shadow 250ms linear, transform 250ms linear",fontWeight:600,color:"neutral.88",":hover, a:focus-visible > &":{boxShadow:"0px 4px 36px rgba(30, 37, 44, 0.32), inset 0 0 0 8px var(--theme-ui-colors-primary-88)",transform:"scale(1.05)"}},children:"Add Project"})})}),d?d.projects.map((function(e){return(0,n.tZ)("li",{children:(0,n.tZ)(i(),{href:"/project/".concat(e.id),children:(0,n.tZ)("a",{children:(0,n.tZ)(l.t,{imageUrl:e.imageUrl,name:e.name,owner:e.owner.id.slice(0,16)+"...",createdAt:new Date(1e3*Number(e.createdAt)).toDateString()})})})},e.id)})):(0,n.tZ)(w,{})]})]})})};function w(){return(0,n.tZ)(n.HY,{children:Array.from({length:11}).map((function(e,r){return(0,n.tZ)("li",{"aria-hidden":!0,sx:{height:"222px",border:"1px solid",borderColor:"neutral.16"}},r)}))})}function O(e){var r=e.value,t=r.orderBy,o=r.orderDirection,i=e.onChange,c=(0,a.useState)(!1),l=c[0],u=c[1],s=(0,a.useRef)(null);!function(e,r){var t=function(t){e.current&&!e.current.contains(t.target)&&r()};(0,a.useEffect)((function(){return document.addEventListener("click",t),function(){document.removeEventListener("click",t)}}))}(s,(function(){return u(!1)}));var f=[["createdAt","Most recent"],["upvotes","Upvotes"],["name","Alphabetical"]],d={border:"2px solid transparent",p:"0.5rem",borderRadius:"8px",transition:"box-shadow 250ms linear, transform 250ms linear, border 250ms linear","&:hover, &:focus-visible":{borderColor:"neutral.08",boxShadow:"0px 1px 8px rgba(30, 37, 44, 0.08)",transform:"scale(1.025)"}};return(0,n.BX)("div",{sx:{display:"flex",alignItems:"center",mr:"-0.5rem",gap:"0.25rem"},children:[(0,n.BX)("div",{ref:s,sx:{position:"relative"},children:[(0,n.tZ)("button",{onClick:function(){return u(!0)},sx:d,children:(0,n.tZ)("span",{sx:{fontSize:"sm",fontWeight:700},children:f.map((function(e){var r=x(e,2),n=r[0],o=r[1];return n===t?o:""}))})}),l&&(0,n.tZ)("div",{sx:{boxShadow:"0px 2px 16px rgba(30, 37, 44, 0.16)",position:"absolute",top:0,left:0,p:"0.25rem",backgroundColor:"background",borderRadius:"4px",display:"flex",flexDirection:"column",transform:"translateX(-25%)",zIndex:9},children:f.map((function(e){var r=x(e,2),t=r[0],o=r[1];return(0,n.tZ)("button",{sx:{fontSize:"sm",fontWeight:700,p:"0.5rem 1.5rem",borderRadius:"4px",textAlign:"left","&:hover, &:focus-visible":{backgroundColor:"background.tertiary"}},onClick:function(){i((function(e){return y({},e,{orderBy:t})})),u(!1)},children:o},t)}))})]}),(0,n.tZ)("button",{sx:d,onClick:function(){return i((function(e){return y({},e,{orderDirection:"asc"===e.orderDirection?"desc":"asc"})}))},children:(0,n.tZ)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,sx:{opacity:.5,size:"1.5rem",transform:"asc"===o&&"rotate(180deg)"},children:(0,n.tZ)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M7 11l5-5m0 0l5 5m-5-5v12"})})})]})}},52159:function(e,r,t){"use strict";t.d(r,{X:function(){return c}});var n=t(35810);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var a={letterSpacing:"-0.8px",fontSize:"xxl",fontWeight:700,color:"neutral.88"};function c(e){var r=e.as,t=void 0===r?"h1":r,c=i(e,["as"]);return(0,n.tZ)(t,function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),n.forEach((function(r){o(e,r,t[r])}))}return e}({sx:a},c))}},50966:function(e,r,t){"use strict";t.d(r,{t:function(){return a}});var n=t(35810);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}function a(e){var r=e.name,t=e.imageUrl,a=e.owner,c=e.createdAt,l=i(e,["name","imageUrl","owner","createdAt"]);return(0,n.BX)("article",function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),n.forEach((function(r){o(e,r,t[r])}))}return e}({sx:{borderRadius:"4px",overflow:"hidden",backgroundColor:"background.card",boxShadow:"0px 4px 24px rgba(30, 37, 44, 0.16)",transition:"box-shadow 250ms linear, transform 250ms linear",height:"222px",display:"flex",flexDirection:"column",":hover, a:focus-visible > &":{boxShadow:"0px 4px 36px rgba(30, 37, 44, 0.32)",transform:"scale(1.050)","> img":{opacity:0,height:0},"> div":{backgroundColor:"background.secondary"},h2:{color:"neutral.88",pt:"1rem"},".ProjectCard__Details":{opacity:1,height:"4rem"}}}},l,{children:[(0,n.tZ)("img",{width:"100%",alt:"",role:"presentation",src:t,sx:{objectFit:"cover",height:"150px",transition:"height 350ms ease, opacity 350ms ease"}}),(0,n.BX)("div",{sx:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",p:"1rem 0.5rem",m:"0.5rem",borderRadius:"4px",transition:"background-color 250ms linear",flex:1,overflow:"hidden"},children:[(0,n.tZ)("h2",{sx:{fontWeight:700,fontSize:"1rem",textAlign:"center",color:"neutral.32",transition:"color 250ms linear, padding 350ms ease"},children:r}),(0,n.BX)("div",{className:"ProjectCard__Details",sx:{display:"flex",flexDirection:"column",alignItems:"center",opacity:0,height:0,transition:"height 350ms ease, opacity 350ms linear",pt:"0.5rem",fontSize:"sm",color:"#515B64",fontWeight:400},children:[(0,n.tZ)("span",{children:a}),(0,n.tZ)("span",{children:c})]})]})]}))}}},function(e){e.O(0,[774,888,179],(function(){return r=67548,e(e.s=r);var r}));var r=e.O();_N_E=r}]);