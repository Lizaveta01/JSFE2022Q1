(()=>{var e={669:(e,r,n)=>{"use strict";n.d(r,{Z:()=>s});var t=n(645),o=n.n(t)()((function(e){return e[1]}));o.push([e.id,".news__item {\r\n    display: flex;\r\n    flex-direction: column;\r\n    margin: 1rem auto;\r\n    margin-bottom: 1.6%;\r\n    background: #fff;\r\n    color: #333;\r\n    line-height: 1.4;\r\n    font-family: Arial, sans-serif;\r\n    border-radius: 5px;\r\n    overflow: hidden;\r\n}\r\n\r\n.news__item:hover .news__meta-photo {\r\n    transform: scale(1.3) rotate(3deg);\r\n}\r\n\r\n.news__item .news__meta {\r\n    position: relative;\r\n    height: 200px;\r\n}\r\n\r\n.news__item .news__meta-photo {\r\n    position: absolute;\r\n    top: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    background-size: cover;\r\n    background-position: center;\r\n    transition: transform 0.2s;\r\n}\r\n\r\n.news__item .news__meta-details,\r\n.news__item .news__meta-details ul {\r\n    margin: auto;\r\n    padding: 0;\r\n    list-style: none;\r\n}\r\n\r\n.news__item .news__meta-details {\r\n    position: absolute;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: -120%;\r\n    margin: auto;\r\n    transition: left 0.2s;\r\n    background: rgba(0, 0, 0, 0.6);\r\n    color: #fff;\r\n    padding: 10px;\r\n    width: 100%;\r\n    font-size: 0.9rem;\r\n}\r\n\r\n.news__item .news__description {\r\n    padding: 1rem;\r\n    background: #fff;\r\n    position: relative;\r\n    z-index: 1;\r\n}\r\n\r\n.news__item .news__description h2 {\r\n    line-height: 1;\r\n    margin: 0;\r\n    font-size: 1.7rem;\r\n}\r\n\r\n.news__item .news__description h3 {\r\n    font-size: 1rem;\r\n    font-weight: 300;\r\n    text-transform: uppercase;\r\n    color: #a2a2a2;\r\n    margin-top: 5px;\r\n}\r\n\r\n.news__item .news__description .news__read-more {\r\n    text-align: right;\r\n}\r\n\r\n.news__item .news__description .news__read-more a {\r\n    color: #5ad67d;\r\n    display: inline-block;\r\n    position: relative;\r\n    text-decoration: none;\r\n    font-weight: 800;\r\n}\r\n\r\n.news__item .news__description .news__read-more a:after {\r\n    content: '→';\r\n    margin-left: -10px;\r\n    opacity: 0;\r\n    vertical-align: middle;\r\n    transition: margin 0.3s, opacity 0.3s;\r\n}\r\n\r\n.news__item .news__description .news__read-more a:hover:after {\r\n    margin-left: 5px;\r\n    opacity: 1;\r\n}\r\n\r\n.news__item p {\r\n    margin: 1rem 0 0;\r\n}\r\n\r\n.news__item p:first-of-type {\r\n    margin-top: 1.25rem;\r\n    position: relative;\r\n}\r\n\r\n.news__item p:first-of-type:before {\r\n    content: '';\r\n    position: absolute;\r\n    height: 5px;\r\n    background: #5ad67d;\r\n    width: 35px;\r\n    top: -0.75rem;\r\n    border-radius: 3px;\r\n}\r\n\r\n.news__item:hover .news__meta-details {\r\n    left: 0%;\r\n}\r\n\r\n@media (min-width: 640px) {\r\n    .news__item {\r\n        flex-direction: row;\r\n        max-width: 700px;\r\n    }\r\n\r\n    .news__item .news__meta {\r\n        flex-basis: 40%;\r\n        height: auto;\r\n    }\r\n\r\n    .news__item .news__description {\r\n        flex-basis: 60%;\r\n    }\r\n\r\n    .news__item .news__description:before {\r\n        -webkit-transform: skewX(-3deg);\r\n        transform: skewX(-3deg);\r\n        content: '';\r\n        background: #fff;\r\n        width: 30px;\r\n        position: absolute;\r\n        left: -10px;\r\n        top: 0;\r\n        bottom: 0;\r\n        z-index: -1;\r\n    }\r\n\r\n    .news__item.alt {\r\n        flex-direction: row-reverse;\r\n    }\r\n\r\n    .news__item.alt .news__description:before {\r\n        left: inherit;\r\n        right: -10px;\r\n        -webkit-transform: skew(3deg);\r\n        transform: skew(3deg);\r\n    }\r\n\r\n    .news__item.alt .news__meta-details {\r\n        padding-left: 25px;\r\n    }\r\n}\r\n",""]);const s=o},501:(e,r,n)=>{"use strict";n.d(r,{Z:()=>s});var t=n(645),o=n.n(t)()((function(e){return e[1]}));o.push([e.id,".sources {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    width: 100%;\r\n    height: auto;\r\n    overflow: auto;\r\n    align-items: center;\r\n    font: 300 1em 'Fira Sans', sans-serif;\r\n    align-items: center;\r\n    justify-content: center;\r\n}\r\n.source__item {\r\n    background: none;\r\n    border: 2px solid #30c5ff;\r\n    font: inherit;\r\n    line-height: 1;\r\n    margin: 0.5em;\r\n    padding: 1em 2em;\r\n    color: #70d6ff;\r\n    transition: 0.25s;\r\n    cursor: pointer;\r\n}\r\n.source__item:hover,\r\n.source__item:focus {\r\n    border-color: #3fcc59;\r\n    color: #69db7e;\r\n    box-shadow: 0 0.5em 0.5em -0.4em #3fcc59;\r\n    transform: translateY(-0.25em);\r\n}\r\n.source__item-name {\r\n    font-weight: 400;\r\n    white-space: nowrap;\r\n}\r\n",""]);const s=o},694:(e,r,n)=>{"use strict";n.d(r,{Z:()=>s});var t=n(645),o=n.n(t)()((function(e){return e[1]}));o.push([e.id,".select {\r\n  position: relative;\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  width: auto;\r\n  height: auto;\r\n  line-height: 3;\r\n  overflow: hidden;\r\n  border-radius: .25em;\r\n  align-items: flex-end;\r\n  justify-content: center;\r\n  margin: 0 auto;\r\n}\r\n\r\n.section {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n.section__title{\r\n  font-size: 1.2em;\r\n  margin: 0;\r\n  padding-left: 0.5em; \r\n  line-height: 1em;\r\n}\r\n\r\nselect {\r\n  width: 20em;\r\n  box-shadow:none;\r\n  margin: 0.5em;\r\n  padding: 0.5em;\r\n  font-size: 1em;\r\n  background:#17181c;\r\n  border: 2px solid #30c5ff;\r\n  color: #70d6ff;\r\n  transition: 0.25s;\r\n  cursor: pointer;\r\n  margin-bottom: 1em;\r\n}\r\n\r\nselect:focus {\r\n  border-color: #3fcc59;\r\n  color: #69db7e;\r\n  box-shadow: 0 0.5em 0.5em -0.4em #3fcc59;\r\n}\r\n\r\n.filter__button{\r\n  background:#70d6ff;\r\n  margin: 1em 0;\r\n  margin-bottom: 17px;\r\n  color: #17181c;\r\n  height: 2em;\r\n  width: 15em;\r\n  border: none;\r\n  font-size: 1.2em;\r\n}\r\n\r\n.filter__button:hover {\r\n  border:2px solid #3fcc59;\r\n  color: #69db7e;\r\n  box-shadow: 0 0.5em 0.5em -0.4em #3fcc59;\r\n  background: inherit;\r\n\r\n}\r\n\r\n@media screen and (min-width: 320px) and (max-width:1060px){\r\n  .select{\r\n    width: 360px;\r\n    align-items: center;\r\n  }\r\n}\r\n@media screen and (min-width: 300px) and (max-width:400px){\r\n  .select{\r\n    width: 360px;\r\n    align-items: center;\r\n  }\r\n  select{\r\n    width: 16em;\r\n  }\r\n  .filter__button{\r\n    width: 14em;\r\n  }\r\n}",""]);const s=o},767:(e,r,n)=>{"use strict";n.d(r,{Z:()=>f});var t=n(645),o=n.n(t),s=n(694),i=n(667),a=n.n(i),c=n(403),l=n.n(c),d=o()((function(e){return e[1]}));d.i(s.Z);var u=a()(l());d.push([e.id,"body {\r\n    color: #fff;\r\n    background: #17181c;\r\n    font-family: sans-serif;\r\n    margin: auto 0;\r\n    overflow-x:hidden;\r\n}\r\nheader {\r\n    padding: 10px 30px;\r\n}\r\nheader h1 {\r\n    font-size: 40px;\r\n    font-weight: 800;\r\n}\r\nfooter {\r\n    height: 100px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n}\r\nfooter .copyright {\r\n    font-size: 14px;\r\n    color: #333;\r\n    text-align: center;\r\n}\r\nfooter .copyright a {\r\n    color: #444;\r\n}\r\nfooter .copyright a:hover {\r\n    color: #555;\r\n}\r\nfooter .copyright:before {\r\n    content: '©';\r\n}\r\n.about-rss {\r\n    width: 100vw;\r\n    display: flex;\r\n    justify-content: space-evenly;\r\n    align-items: center;\r\n    font-size: 14px;\r\n    color: #333;\r\n    text-align: center;\r\n}\r\n.about-rss p {\r\n    font-size: 14px;\r\n    color: #333;\r\n    text-align: center;\r\n}\r\n.rss {\r\n\twidth: 112px;\r\n\theight: 45px;\r\n    background-image: url("+u+");   \r\n\tbackground-size: contain;\r\n\tbackground-repeat: no-repeat;\r\n  }\r\n.nav-link {\r\n\tposition: relative;\r\n\tpadding: 0 24px; \r\n\ttext-decoration: none; \r\n\tfont-size: 20px; \r\n\tfont-size: 14px;\r\n    color: #333;\r\n    text-align: center;\r\n}\r\n",""]);const f=d},645:e=>{"use strict";e.exports=function(e){var r=[];return r.toString=function(){return this.map((function(r){var n=e(r);return r[2]?"@media ".concat(r[2]," {").concat(n,"}"):n})).join("")},r.i=function(e,n,t){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(t)for(var s=0;s<this.length;s++){var i=this[s][0];null!=i&&(o[i]=!0)}for(var a=0;a<e.length;a++){var c=[].concat(e[a]);t&&o[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),r.push(c))}},r}},667:e=>{"use strict";e.exports=function(e,r){return r||(r={}),"string"!=typeof(e=e&&e.__esModule?e.default:e)?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),r.hash&&(e+=r.hash),/["'() \t\n]/.test(e)||r.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e)}},379:(e,r,n)=>{"use strict";var t,o=function(){var e={};return function(r){if(void 0===e[r]){var n=document.querySelector(r);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[r]=n}return e[r]}}(),s=[];function i(e){for(var r=-1,n=0;n<s.length;n++)if(s[n].identifier===e){r=n;break}return r}function a(e,r){for(var n={},t=[],o=0;o<e.length;o++){var a=e[o],c=r.base?a[0]+r.base:a[0],l=n[c]||0,d="".concat(c," ").concat(l);n[c]=l+1;var u=i(d),f={css:a[1],media:a[2],sourceMap:a[3]};-1!==u?(s[u].references++,s[u].updater(f)):s.push({identifier:d,updater:h(f,r),references:1}),t.push(d)}return t}function c(e){var r=document.createElement("style"),t=e.attributes||{};if(void 0===t.nonce){var s=n.nc;s&&(t.nonce=s)}if(Object.keys(t).forEach((function(e){r.setAttribute(e,t[e])})),"function"==typeof e.insert)e.insert(r);else{var i=o(e.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(r)}return r}var l,d=(l=[],function(e,r){return l[e]=r,l.filter(Boolean).join("\n")});function u(e,r,n,t){var o=n?"":t.media?"@media ".concat(t.media," {").concat(t.css,"}"):t.css;if(e.styleSheet)e.styleSheet.cssText=d(r,o);else{var s=document.createTextNode(o),i=e.childNodes;i[r]&&e.removeChild(i[r]),i.length?e.insertBefore(s,i[r]):e.appendChild(s)}}function f(e,r,n){var t=n.css,o=n.media,s=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),s&&"undefined"!=typeof btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}var m=null,p=0;function h(e,r){var n,t,o;if(r.singleton){var s=p++;n=m||(m=c(r)),t=u.bind(null,n,s,!1),o=u.bind(null,n,s,!0)}else n=c(r),t=f.bind(null,n,r),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else o()}}e.exports=function(e,r){(r=r||{}).singleton||"boolean"==typeof r.singleton||(r.singleton=(void 0===t&&(t=Boolean(window&&document&&document.all&&!window.atob)),t));var n=a(e=e||[],r);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var t=0;t<n.length;t++){var o=i(n[t]);s[o].references--}for(var c=a(e,r),l=0;l<n.length;l++){var d=i(n[l]);0===s[d].references&&(s[d].updater(),s.splice(d,1))}n=c}}}},403:e=>{e.exports="data:image/svg+xml,%3csvg id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 552.8 205.3'%3e%3cstyle%3e.st0%7bfill:%23fff%7d.st1%7bclip-path:url(%23SVGID_2_)%7d.st2%7bclip-path:url(%23SVGID_4_)%7d.st3%7bclip-path:url(%23SVGID_6_)%7d.st4%7bclip-path:url(%23SVGID_8_)%7d.st5%7bfill:%23fff;stroke:%23000;stroke-width:4;stroke-miterlimit:10%7d.st6%7bclip-path:url(%23SVGID_8_)%7d.st6,.st7%7bfill:none;stroke:%23000;stroke-width:4;stroke-miterlimit:10%7d.st8,.st9%7bclip-path:url(%23SVGID_10_)%7d.st9%7bfill:none;stroke:%23000;stroke-width:4;stroke-miterlimit:10%7d%3c/style%3e%3ctitle%3ers_school_js%3c/title%3e%3cpath d='M285.4 68l26.3-1.7c.6 4.3 1.7 7.5 3.5 9.8 2.9 3.6 6.9 5.4 12.2 5.4 3.9 0 7-.9 9.1-2.8 2-1.5 3.2-3.9 3.2-6.4 0-2.4-1.1-4.7-3-6.2-2-1.8-6.7-3.6-14.1-5.2-12.1-2.7-20.8-6.3-25.9-10.9-5.1-4.3-8-10.6-7.8-17.3 0-4.6 1.4-9.2 4-13 3-4.3 7.1-7.7 12-9.6 5.3-2.3 12.7-3.5 22-3.5 11.4 0 20.1 2.1 26.1 6.4 6 4.2 9.6 11 10.7 20.3l-26 1.5c-.7-4-2.1-6.9-4.4-8.8s-5.3-2.8-9.2-2.8c-3.2 0-5.6.7-7.2 2-1.5 1.2-2.5 3-2.4 5 0 1.5.8 2.9 2 3.8 1.3 1.2 4.4 2.3 9.3 3.3 12.1 2.6 20.7 5.2 26 7.9 5.3 2.7 9.1 6 11.4 9.9 2.4 4 3.6 8.6 3.5 13.3 0 5.6-1.6 11.2-4.8 15.9-3.3 4.9-7.9 8.7-13.3 11-5.7 2.5-12.9 3.8-21.5 3.8-15.2 0-25.7-2.9-31.6-8.8S286.1 77 285.4 68zM6.3 97.6V8.2h46.1c8.5 0 15.1.7 19.6 2.2 4.4 1.4 8.3 4.3 10.9 8.2 2.9 4.3 4.3 9.3 4.2 14.5.3 8.8-4.2 17.2-11.9 21.6-3 1.7-6.3 2.9-9.7 3.5 2.5.7 5 1.9 7.2 3.3 1.7 1.4 3.1 3 4.4 4.7 1.5 1.7 2.8 3.6 3.9 5.6l13.4 25.9H63L48.2 70.2c-1.9-3.5-3.5-5.8-5-6.9-2-1.4-4.4-2.1-6.8-2.1H34v36.3H6.3zM34 44.4h11.7c2.5-.2 4.9-.6 7.3-1.2 1.8-.3 3.4-1.3 4.5-2.8 2.7-3.6 2.3-8.7-1-11.8-1.8-1.5-5.3-2.3-10.3-2.3H34v18.1zM0 174.2l26.3-1.7c.6 4.3 1.7 7.5 3.5 9.8 2.8 3.6 6.9 5.5 12.2 5.5 3.9 0 7-.9 9.1-2.8 2-1.6 3.2-3.9 3.2-6.4 0-2.4-1.1-4.7-3-6.2-2-1.8-6.7-3.6-14.2-5.2-12.1-2.7-20.8-6.3-25.9-10.9-5.1-4.3-8-10.6-7.8-17.3 0-4.6 1.4-9.2 4-13 3-4.3 7.1-7.7 12-9.6 5.3-2.3 12.7-3.5 22-3.5 11.4 0 20.1 2.1 26.1 6.4s9.5 11 10.6 20.3l-26 1.5c-.7-4-2.1-6.9-4.4-8.8-2.2-1.9-5.3-2.8-9.2-2.7-3.2 0-5.6.7-7.2 2.1-1.6 1.2-2.5 3-2.4 5 0 1.5.8 2.9 2 3.8 1.3 1.2 4.4 2.3 9.3 3.3 12.1 2.6 20.7 5.2 26 7.9 5.3 2.7 9.1 6 11.4 9.9 2.4 4 3.6 8.6 3.6 13.2 0 5.6-1.7 11.1-4.8 15.8-3.3 4.9-7.9 8.7-13.3 11-5.7 2.5-12.9 3.8-21.5 3.8-15.2 0-25.7-2.9-31.6-8.8-5.9-6-9.2-13.4-10-22.4z'/%3e%3cpath d='M133 167.2l24.2 7.3c-1.3 6.1-4 11.9-7.7 17-3.4 4.5-7.9 8-13 10.3-5.2 2.3-11.8 3.5-19.8 3.5-9.7 0-17.7-1.4-23.8-4.2-6.2-2.8-11.5-7.8-16-14.9-4.5-7.1-6.7-16.2-6.7-27.3 0-14.8 3.9-26.2 11.8-34.1s19-11.9 33.4-11.9c11.3 0 20.1 2.3 26.6 6.8 6.4 4.6 11.2 11.6 14.4 21l-24.4 5.4c-.6-2.1-1.5-4.2-2.7-6-1.5-2.1-3.4-3.7-5.7-4.9-2.3-1.2-4.9-1.7-7.5-1.7-6.3 0-11.1 2.5-14.4 7.6-2.5 3.7-3.8 9.6-3.8 17.6 0 9.9 1.5 16.7 4.5 20.4 3 3.7 7.2 5.5 12.7 5.5 5.3 0 9.3-1.5 12-4.4 2.7-3.1 4.7-7.4 5.9-13zm56.5-52.8h27.6v31.3h30.2v-31.3h27.8v89.4h-27.8v-36.2h-30.2v36.2h-27.6v-89.4z'/%3e%3cpath d='M271.3 159.1c0-14.6 4.1-26 12.2-34.1 8.1-8.1 19.5-12.2 34-12.2 14.9 0 26.3 4 34.4 12S364 144 364 158.4c0 10.5-1.8 19-5.3 25.7-3.4 6.6-8.7 12-15.2 15.6-6.7 3.7-15 5.6-24.9 5.6-10.1 0-18.4-1.6-25-4.8-6.8-3.4-12.4-8.7-16.1-15.2-4.1-7-6.2-15.7-6.2-26.2zm27.6.1c0 9 1.7 15.5 5 19.5 3.3 3.9 7.9 5.9 13.7 5.9 5.9 0 10.5-1.9 13.8-5.8s4.9-10.8 4.9-20.8c0-8.4-1.7-14.6-5.1-18.4-3.4-3.9-8-5.8-13.8-5.8-5.1-.2-10 2-13.4 5.9-3.4 3.9-5.1 10.4-5.1 19.5zm93.4-.1c0-14.6 4.1-26 12.2-34.1 8.1-8.1 19.5-12.2 34-12.2 14.9 0 26.4 4 34.4 12S485 144 485 158.4c0 10.5-1.8 19-5.3 25.7-3.4 6.6-8.7 12-15.2 15.6-6.7 3.7-15 5.6-24.9 5.6-10.1 0-18.4-1.6-25-4.8-6.8-3.4-12.4-8.7-16.1-15.2-4.1-7-6.2-15.7-6.2-26.2zm27.6.1c0 9 1.7 15.5 5 19.5 3.3 3.9 7.9 5.9 13.7 5.9 5.9 0 10.5-1.9 13.8-5.8 3.3-3.9 4.9-10.8 4.9-20.8 0-8.4-1.7-14.6-5.1-18.4-3.4-3.9-8-5.8-13.8-5.8-5.1-.2-10.1 2-13.4 5.9-3.4 3.9-5.1 10.4-5.1 19.5z'/%3e%3cpath d='M482.1 114.4h27.6v67.4h43.1v22H482v-89.4z'/%3e%3cellipse transform='rotate(-37.001 420.46 67.88)' class='st0' cx='420.5' cy='67.9' rx='63' ry='51.8'/%3e%3cdefs%3e%3cellipse id='SVGID_1_' transform='rotate(-37.001 420.46 67.88)' cx='420.5' cy='67.9' rx='63' ry='51.8'/%3e%3c/defs%3e%3cclipPath id='SVGID_2_'%3e%3cuse xlink:href='%23SVGID_1_' overflow='visible'/%3e%3c/clipPath%3e%3cg class='st1'%3e%3cpath transform='rotate(-37.001 420.82 68.353)' class='st0' d='M330.9-14.2h179.8v165.1H330.9z'/%3e%3cg id='Layer_2_1_'%3e%3cdefs%3e%3cpath id='SVGID_3_' transform='rotate(-37.001 420.82 68.353)' d='M330.9-14.2h179.8v165.1H330.9z'/%3e%3c/defs%3e%3cclipPath id='SVGID_4_'%3e%3cuse xlink:href='%23SVGID_3_' overflow='visible'/%3e%3c/clipPath%3e%3cg id='Layer_1-2' class='st2'%3e%3cellipse transform='rotate(-37.001 420.46 67.88)' class='st0' cx='420.5' cy='67.9' rx='63' ry='51.8'/%3e%3cdefs%3e%3cellipse id='SVGID_5_' transform='rotate(-37.001 420.46 67.88)' cx='420.5' cy='67.9' rx='63' ry='51.8'/%3e%3c/defs%3e%3cclipPath id='SVGID_6_'%3e%3cuse xlink:href='%23SVGID_5_' overflow='visible'/%3e%3c/clipPath%3e%3cg class='st3'%3e%3cpath transform='rotate(-37 420.799 68.802)' class='st0' d='M357.8 17h125.9v103.7H357.8z'/%3e%3cdefs%3e%3cpath id='SVGID_7_' transform='rotate(-37 420.799 68.802)' d='M357.8 17h125.9v103.7H357.8z'/%3e%3c/defs%3e%3cclipPath id='SVGID_8_'%3e%3cuse xlink:href='%23SVGID_7_' overflow='visible'/%3e%3c/clipPath%3e%3cg class='st4'%3e%3cellipse transform='rotate(-37.001 420.46 67.88)' class='st5' cx='420.5' cy='67.9' rx='63' ry='51.8'/%3e%3c/g%3e%3cpath transform='rotate(-37 420.799 68.802)' class='st6' d='M357.8 17h125.9v103.7H357.8z'/%3e%3cellipse transform='rotate(-37.001 420.46 67.88)' class='st7' cx='420.5' cy='67.9' rx='63' ry='51.8'/%3e%3cpath transform='rotate(-37 420.799 68.802)' class='st0' d='M357.8 17h125.9v103.7H357.8z'/%3e%3cdefs%3e%3cpath id='SVGID_9_' transform='rotate(-37 420.799 68.802)' d='M357.8 17h125.9v103.7H357.8z'/%3e%3c/defs%3e%3cclipPath id='SVGID_10_'%3e%3cuse xlink:href='%23SVGID_9_' overflow='visible'/%3e%3c/clipPath%3e%3cg class='st8'%3e%3cellipse transform='rotate(-37.001 420.46 67.88)' class='st5' cx='420.5' cy='67.9' rx='63' ry='51.8'/%3e%3c/g%3e%3cpath transform='rotate(-37 420.799 68.802)' class='st9' d='M357.8 17h125.9v103.7H357.8z'/%3e%3cpath transform='rotate(-37.001 420.82 68.353)' class='st7' d='M330.9-14.2h179.8v165.1H330.9z'/%3e%3c/g%3e%3cellipse transform='rotate(-37.001 420.46 67.88)' class='st7' cx='420.5' cy='67.9' rx='63' ry='51.8'/%3e%3cpath d='M392.4 61.3l10-7 12.3 17.5c2.1 2.8 3.7 5.8 4.9 9.1.7 2.5.5 5.2-.5 7.6-1.3 3-3.4 5.5-6.2 7.3-3.3 2.3-6.1 3.6-8.5 4-2.3.4-4.7 0-6.9-1-2.4-1.2-4.5-2.9-6.1-5.1l8.6-8c.7 1.1 1.6 2.1 2.6 2.9.7.5 1.5.8 2.4.8.7 0 1.4-.3 1.9-.7 1-.6 1.7-1.8 1.6-3-.3-1.7-1-3.4-2.1-4.7l-14-19.7zm30 11.1l9.1-7.2c1 1.2 2.3 2.1 3.7 2.6 2 .6 4.1.2 5.8-1.1 1.2-.8 2.2-1.9 2.6-3.3.6-1.8-.4-3.8-2.2-4.4-.3-.1-.6-.2-.9-.2-1.2-.1-3.3.4-6.4 1.7-5.1 2.1-9.1 2.9-12.1 2.6-2.9-.3-5.6-1.8-7.2-4.3-1.2-1.7-1.8-3.7-1.9-5.7 0-2.3.6-4.6 1.9-6.5 1.9-2.7 4.2-5 7-6.8 4.2-2.9 7.9-4.3 11.1-4.3 3.2 0 6.2 1.5 9 4.6l-9 7.1c-1.8-2.3-5.2-2.8-7.5-1l-.3.3c-1 .6-1.7 1.5-2.1 2.6-.3.8-.1 1.7.4 2.4.4.5 1 .9 1.7.9.8.1 2.2-.3 4.2-1.2 5-2.1 8.8-3.3 11.4-3.7 2.2-.4 4.5-.2 6.6.7 1.9.8 3.5 2.2 4.6 3.9 1.4 2 2.2 4.4 2.3 6.9.1 2.6-.6 5.1-2 7.3-1.8 2.7-4.1 5-6.8 6.8-5.5 3.8-10 5.4-13.6 4.8-3.9-.6-7.1-2.6-9.4-5.5z'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e"}},r={};function n(t){var o=r[t];if(void 0!==o)return o.exports;var s=r[t]={id:t,exports:{}};return e[t](s,s.exports,n),s.exports}n.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return n.d(r,{a:r}),r},n.d=(e,r)=>{for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},n.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{"use strict";var e;!function(e){e[e.Error_404=404]="Error_404",e[e.Error_401=401]="Error_401"}(e||(e={}));var r=n(379),t=n.n(r),o=n(669);t()(o.Z,{insert:"head",singleton:!1}),o.Z.locals;var s=n(501);t()(s.Z,{insert:"head",singleton:!1}),s.Z.locals;class i{constructor(){this.news=new class{draw(e){const r=e.length>=10?e.filter(((e,r)=>r<10)):e,n=document.createDocumentFragment(),t=document.querySelector("#newsItemTemp");r.forEach(((e,r)=>{const o=t.content.cloneNode(!0),s=o.querySelector(".news__item");r%2&&s.classList.add("alt"),o.querySelector(".news__meta-photo").style.backgroundImage=`url(${e.urlToImage||"img/news_placeholder.jpg"})`,o.querySelector(".news__meta-author").textContent=e.author||e.source.name,o.querySelector(".news__meta-date").textContent=e.publishedAt.slice(0,10).split("-").reverse().join("-"),o.querySelector(".news__description-title").textContent=e.title,o.querySelector(".news__description-source").textContent=e.source.name,o.querySelector(".news__description-content").textContent=e.description,o.querySelector(".news__read-more a").setAttribute("href",e.url),n.append(o)}));const o=document.querySelector(".news");o.innerHTML="",o.appendChild(n)}},this.sources=new class{draw(e){const r=document.querySelector(".sources"),n=document.createDocumentFragment(),t=document.querySelector("#sourceItemTemp");r.innerHTML="",e.forEach((e=>{const r=t.content.cloneNode(!0);r.querySelector(".source__item-name").textContent=e.name,r.querySelector(".source__item").setAttribute("data-source-id",e.id),n.append(r)})),r.append(n)}}}drawNews(e){const r=(null==e?void 0:e.articles)?null==e?void 0:e.articles:[];this.news.draw(r)}drawSources(e){const r=(null==e?void 0:e.sources)?null==e?void 0:e.sources:[];this.sources.draw(r)}}const a=document.getElementById("section__category"),c=document.getElementById("section__country"),l=document.getElementById("section__language");function d(e,r){e.forEach((e=>{const n=document.createElement("option");n.value=e,n.innerText=e,r.appendChild(n)}))}d(["general","business","technology","sports","entertainment","health","science"],a),d(["us","au","no","it","sa","pk","gb","de","br","ca","es","ar","fr","in","is","ru","se","za","ie","nl","zh"],c),d(["en","no","it","ar","ud","de","pt","es","fr","he","ru","sv","nl","zh"],l),document.addEventListener("DOMContentLoaded",(function(){const e=localStorage.getItem("category"),r=localStorage.getItem("country"),n=localStorage.getItem("language");e&&r&&n&&(a.value=e,c.value=r,l.value=n)}));var u=n(767);t()(u.Z,{insert:"head",singleton:!1}),u.Z.locals;const f=document.querySelector("form"),m=new class{constructor(){this.controller=new class extends class extends class{constructor(e,r){this.baseLink=e,this.options=r}getResp({endpoint:e,options:r},n=(()=>{console.error("No callback for GET response")})){this.load("GET",e,n,r)}errorHandler(r){if(!r.ok)throw r.status!==e.Error_401&&r.status!==e.Error_404||console.log(`Sorry, but there is ${r.status} error: ${r.statusText}`),Error(r.statusText);return r}makeUrl(e,r){const n=Object.assign(Object.assign({},this.options),e);console.log(n);let t=`${this.baseLink}${r}?`;return Object.keys(n).forEach((e=>{t+=`${e}=${n[e]}&`})),t.slice(0,-1)}load(e,r,n,t){console.log(t),fetch(this.makeUrl(t,r),{method:e}).then(this.errorHandler).then((e=>e.json())).then((e=>n(e))).catch((e=>console.error(e)))}}{constructor(){super("https://newsapi.org/v2/",{apiKey:"8a0c446e37a14e469e683932db32fed2"})}}{constructor(){super(...arguments),this.callback=()=>{console.error("No callback for GET response")}}getSources(e){super.getResp({endpoint:"sources",options:{category:localStorage.getItem("category"),country:localStorage.getItem("country"),language:localStorage.getItem("language")}},e)}getNews(e,r){let n=e.target instanceof Element?e.target:null;const t=e.currentTarget instanceof Element?e.currentTarget:null;for(;n!==t;){if(n instanceof Element&&n.classList.contains("source__item")){const e=n.getAttribute("data-source-id");return void(t instanceof Element&&t.getAttribute("data-source")!==e&&(t.setAttribute("data-source",e||""),super.getResp({endpoint:"everything",options:{sources:e}},r)))}n=n instanceof Element?n.parentNode:null}}},this.view=new i}start(){document.querySelector(".sources").addEventListener("click",(e=>this.controller.getNews(e,(e=>this.view.drawNews(e))))),this.controller.getSources((e=>this.view.drawSources(e)))}};f.addEventListener("submit",(e=>{e.preventDefault(),function(){const e=a.options[a.selectedIndex].value,r=c.options[c.selectedIndex].value,n=l.options[l.selectedIndex].value;localStorage.setItem("category",e),localStorage.setItem("country",r),localStorage.setItem("language",n)}(),m.start()}))})()})();