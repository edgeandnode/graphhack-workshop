(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[47],{81532:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/project/add",function(){return t(34337)}])},34337:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return D}});var n=t(35810),o=t(52159),i=t(57744),a=t.n(i),l=t(18855),c=t(20483),u=t(42038);function s(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function d(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}function p(e){var r=e.children,t=e.icon,o=d(e,["children","icon"]);return(0,n.BX)("button",function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),n.forEach((function(r){s(e,r,t[r])}))}return e}({sx:{backgroundColor:"primary.64",color:"white",borderRadius:"4px",p:"1rem 2rem",fontSize:"0.875rem",fontWeight:600,display:"flex",flexDirection:"row",gap:"0.25rem",alignItems:"center",justifyContent:"center",":hover, :focus-visible":{backgroundColor:"primary"},"> svg":t&&{ml:"-0.5rem"}}},o,{children:[t,r]}))}var f=t(36511),m=t.n(f);function h(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function b(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),n.forEach((function(r){h(e,r,t[r])}))}return e}function g(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}function v(e){var r=e.labelId,t=e.className,o=g(e,["labelId","className"]);return(0,n.tZ)(m(),b({},o,{children:function(e){var o=e.imageList,i=e.onImageUpload,a=e.isDragging,l=e.dragProps;return(0,n.BX)("div",b({className:t,sx:{position:"relative",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"8px",overflow:"hidden",minHeight:300,p:"2px"}},l,{children:[(0,n.tZ)("button",{title:0===o.length?"Add image":"Change image",type:"button",sx:b({position:"absolute",inset:0,borderRadius:"8px",backgroundColor:"background.tertiary",border:"2px solid",borderColor:"neutral.08",transition:"all 250ms linear","&:hover":{borderColor:o.length?"neutral.64":"neutral.16"}},a&&{borderColor:"neutral.32"}),onClick:function(){i()},"aria-labelledby":r}),(0,n.tZ)("div",{sx:{pointerEvents:"none",zIndex:1,height:"100%",flex:1},children:0===o.length?(0,n.BX)("div",{sx:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100%"},children:[(0,n.tZ)(x,{}),(0,n.tZ)("div",{children:(0,n.tZ)("span",{id:r,sx:{fontWeight:500,color:"primary"},children:"Add an image"})})]}):(0,n.tZ)("img",{height:"100%",width:"100%",src:o[0].dataURL,alt:"Uploaded image",sx:{objectFit:"cover",borderRadius:"8px"}})})]}))}}))}function x(e){return(0,n.tZ)("svg",b({width:59,height:59,viewBox:"0 0 59 59",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e,{children:(0,n.tZ)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M14.75 12.292h29.5a7.375 7.375 0 017.375 7.375v22.125a7.375 7.375 0 01-7.375 7.375h-29.5a7.375 7.375 0 01-7.375-7.375V19.667a7.375 7.375 0 017.375-7.375zm-2.458 29.5h22.125l-11.063-14.75-11.062 14.75zm27.041-7.375a7.375 7.375 0 100-14.75 7.375 7.375 0 000 14.75z",fill:"#A38CFF"})}))}var y=t(11847);function w(e,r,t,n,o,i,a){try{var l=e[i](a),c=l.value}catch(u){return void t(u)}l.done?r(c):Promise.resolve(c).then(n,o)}var O=new URL("api/v0","https://api.thegraph.com/ipfs/").href,j=(0,y.Ue)({url:O}),P=function(){var e,r=(e=a().mark((function e(r){var t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.add(r);case 2:return t=e.sent,e.abrupt("return","".concat(O,"/cat?arg=").concat(t.path));case 4:case"end":return e.stop()}}),e)})),function(){var r=this,t=arguments;return new Promise((function(n,o){var i=e.apply(r,t);function a(e){w(i,n,o,a,l,"next",e)}function l(e){w(i,n,o,a,l,"throw",e)}a(void 0)}))});return function(e){return r.apply(this,arguments)}}(),S=t(50966),k=t(51323);function Z(e,r,t,n,o,i,a){try{var l=e[i](a),c=l.value}catch(u){return void t(u)}l.done?r(c):Promise.resolve(c).then(n,o)}function C(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function I(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),n.forEach((function(r){C(e,r,t[r])}))}return e}var X={borderRadius:"8px",mx:"auto",display:"flex",flexDirection:"column",gap:"1rem"};function B(){var e=(0,k.m)("submitProject",{description:function(e){var r=(null===e||void 0===e?void 0:e.name)&&'"'.concat(e.name,'"');return"Submit ".concat(r||"Project")}}),r=(0,u.mA)(),t=(0,l.useState)([]),i=t[0],s=t[1],d=(0,l.useState)(),f=d[0],m=d[1],h=function(){var r,t=(r=a().mark((function r(t){var n,o,l,c,u,s,d;return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(t.preventDefault(),o=t.currentTarget.elements,l=o.name,c=o.subtitle,u=o.description,s=null===(n=i[0])||void 0===n?void 0:n.file){r.next=7;break}return m("image-required"),r.abrupt("return");case 7:return r.prev=8,r.next=11,P(s);case 11:d=r.sent,console.log("Image uploaded to",d),r.next=20;break;case 15:return r.prev=15,r.t0=r.catch(8),console.error(r.t0),m("ipfs-upload-failed"),r.abrupt("return");case 20:e.write({name:l.value,subtitle:c.value,description:u.value,imageUrl:d});case 21:case"end":return r.stop()}}),r,null,[[8,15]])})),function(){var e=this,t=arguments;return new Promise((function(n,o){var i=r.apply(e,t);function a(e){Z(i,n,o,a,l,"next",e)}function l(e){Z(i,n,o,a,l,"throw",e)}a(void 0)}))});return function(e){return t.apply(this,arguments)}}();if(e.error&&console.error(e.error),e.response&&e.lastArgs){var b;console.log("Project submitted ",e.response);var g=e.lastArgs[0],x=null===(b=r.data)||void 0===b?void 0:b.address;return(0,n.BX)("div",{sx:X,children:[(0,n.tZ)(o.X,{as:"h2",sx:{fontSize:"lg",letterSpacing:"-0.4px",color:"neutral.64"},children:"Submitted"}),(0,n.BX)("div",{sx:{display:"flex",gap:"1rem"},children:[(0,n.tZ)(S.t,{name:g.name,owner:(null===x||void 0===x?void 0:x.slice(0,16))+"..."||0,imageUrl:g.imageUrl,sx:{width:"200px",flexShrink:0,border:"1px solid",borderColor:"neutral.32"}}),(0,n.tZ)("pre",{sx:{backgroundColor:"background",borderRadius:"4px",color:"neutral.88",flex:1,p:"0.75rem",border:"1px solid",borderColor:"neutral.32",overflow:"auto"},children:JSON.stringify(I({},g,{owner:x}),null,2)})]}),(0,n.tZ)(p,{onClick:function(){return e.reset()},children:"Add Another Project"}),(0,n.tZ)("a",{href:"https://rinkeby.etherscan.io/tx/".concat(e.response.hash),target:"__blank",sx:{cursor:"pointer",textDecoration:"underline",textDecorationColor:"primary.64",borderRadius:"4px",p:"1rem",textAlign:"center",fontSize:"0.875rem",fontWeight:600,":hover, :focus-visible":{backgroundColor:"primary.08"}},children:"See Transaction on Etherscan"})]})}return(0,n.BX)("form",{onSubmit:h,sx:I({},X,{gap:["1rem","2rem"],"> label":{display:"flex",gap:[0,"2rem","3rem"],flexDirection:["column","row"],"> div":{pb:"0.5rem",color:"neutral.64",fontWeight:500,width:["auto","6rem"],textAlign:["left","right"]},input:{textIndent:"1rem",py:"1rem"},textarea:{p:"1rem"},"input, textarea":{borderColor:"neutral.16",borderWidth:"2px"}}}),children:[e.error&&(0,n.tZ)("section",{sx:{color:"red"},children:(0,n.tZ)("pre",{children:e.error.message})}),(0,n.tZ)(v,{value:i,onChange:s,labelId:"submit-project-image-upload",sx:{height:"400px"}}),"image-required"===f&&(0,n.tZ)("p",{sx:{color:"critical"},children:"The image is required."}),"ipfs-upload-failed"===f&&(0,n.tZ)("p",{sx:{color:"critical"},children:"IPFS upload failed."}),(0,n.BX)("label",{children:[(0,n.tZ)("div",{children:"Name"}),(0,n.tZ)(c.II,{name:"name",type:"text",required:!0,autoComplete:"off"})]}),(0,n.BX)("label",{children:[(0,n.BX)("div",{children:["Subtitle ",(0,n.tZ)("small",{children:"(optional)"})]}),(0,n.tZ)(c.II,{name:"subtitle",type:"text"})]}),(0,n.BX)("label",{children:[(0,n.BX)("div",{children:["Description ",(0,n.tZ)("small",{children:"(optional)"})]}),(0,n.tZ)(c.gx,{name:"description",rows:5})]}),(0,n.BX)(p,{type:"submit",sx:{width:["auto","min-content"],whiteSpace:"pre",ml:"auto"},disabled:e.isLoading,children:[e.isLoading?"Submitting":"Submit"," Project"]})]})}var D=function(){return(0,n.BX)("main",{sx:{px:"1rem",maxWidth:"920px",mx:"auto"},children:[(0,n.tZ)("header",{sx:{pb:["1rem","3.5rem"]},children:(0,n.tZ)(o.X,{children:"Add a project"})}),(0,n.tZ)(B,{})]})}},50966:function(e,r,t){"use strict";t.d(r,{t:function(){return a}});var n=t(35810);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}function a(e){var r=e.name,t=e.imageUrl,a=e.owner,l=e.createdAt,c=i(e,["name","imageUrl","owner","createdAt"]);return(0,n.BX)("article",function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),n.forEach((function(r){o(e,r,t[r])}))}return e}({sx:{borderRadius:"4px",overflow:"hidden",backgroundColor:"background.card",boxShadow:"0px 4px 24px rgba(30, 37, 44, 0.16)",transition:"box-shadow 250ms linear, transform 250ms linear",height:"222px",display:"flex",flexDirection:"column",":hover, a:focus-visible > &":{boxShadow:"0px 4px 36px rgba(30, 37, 44, 0.32)",transform:"scale(1.050)","> img":{opacity:0,height:0},"> div":{backgroundColor:"background.secondary"},h2:{color:"neutral.88",pt:"1rem"},".ProjectCard__Details":{opacity:1,height:"4rem"}}}},c,{children:[(0,n.tZ)("img",{width:"100%",alt:"",role:"presentation",src:t,sx:{objectFit:"cover",height:"150px",transition:"height 350ms ease, opacity 350ms ease"}}),(0,n.BX)("div",{sx:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",p:"1rem 0.5rem",m:"0.5rem",borderRadius:"4px",transition:"background-color 250ms linear",flex:1,overflow:"hidden"},children:[(0,n.tZ)("h2",{sx:{fontWeight:700,fontSize:"1rem",textAlign:"center",color:"neutral.32",transition:"color 250ms linear, padding 350ms ease"},children:r}),(0,n.BX)("div",{className:"ProjectCard__Details",sx:{display:"flex",flexDirection:"column",alignItems:"center",opacity:0,height:0,transition:"height 350ms ease, opacity 350ms linear",pt:"0.5rem",fontSize:"sm",color:"#515B64",fontWeight:400},children:[(0,n.tZ)("span",{children:a}),(0,n.tZ)("span",{children:l})]})]})]}))}},92520:function(){},31092:function(){}},function(e){e.O(0,[309,358,623,774,888,179],(function(){return r=81532,e(e.s=r);var r}));var r=e.O();_N_E=r}]);