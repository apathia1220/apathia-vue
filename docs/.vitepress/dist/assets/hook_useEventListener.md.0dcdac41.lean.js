import{V as y,_ as f,c as k,a as _,w as h,b as g,d as e,e as s,r as B,o as L}from"./app.617fe086.js";const{defineComponent:b}=y,w=b({name:"component-doc",components:{"render-demo-0":function(){const{toDisplayString:C,createTextVNode:i,resolveComponent:r,withCtx:a,createVNode:A,openBlock:d,createBlock:c}=y;function n(v,u){const o=r("BaseButton"),t=r("ClientOnly");return d(),c(t,null,{default:a(()=>[A(o,null,{default:a(()=>[i("\u70B9\u51FB\u4E86 "+C(v.count)+" \u6B21",1)]),_:1})]),_:1})}const{getCurrentInstance:l,ref:p}=y;return{render:n,...{setup(v,{expose:u}){u();const{proxy:o}=l(),{useEventListener:t}=o,F=p(0),E=t("click",()=>{F.value+=1}),D={proxy:o,useEventListener:t,count:F,stop:E,getCurrentInstance:l,ref:p};return Object.defineProperty(D,"__isScriptSetup",{enumerable:!1,value:!0}),D}}}}(),"render-demo-1":function(){const{toDisplayString:C,createElementVNode:i,createTextVNode:r,resolveComponent:a,withCtx:A,openBlock:d,createBlock:c}=y,n={style:{color:"red"}};function l(u,o){const t=a("ClientOnly");return d(),c(t,null,{default:A(()=>[r(" \u4F60\u6309\u4E0B\u7684\u952E\u4E3A\uFF1A "),i("div",n,C(u.name),1)]),_:1})}const{getCurrentInstance:p,ref:m}=y;return{render:l,...{setup(u,{expose:o}){o();const{proxy:t}=p(),{useEventListener:F}=t,E=m("");F("keydown",x=>{E.value=x.code});const D={proxy:t,useEventListener:F,name:E,getCurrentInstance:p,ref:m};return Object.defineProperty(D,"__isScriptSetup",{enumerable:!1,value:!0}),D}}}}()}}),P=JSON.parse('{"title":"useEventListener","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u57FA\u7840\u4F7F\u7528","slug":"\u57FA\u7840\u4F7F\u7528","link":"#\u57FA\u7840\u4F7F\u7528","children":[]},{"level":2,"title":"\u76D1\u542C\u952E\u76D8\u4E8B\u4EF6","slug":"\u76D1\u542C\u952E\u76D8\u4E8B\u4EF6","link":"#\u76D1\u542C\u952E\u76D8\u4E8B\u4EF6","children":[]},{"level":2,"title":"\u53C2\u6570","slug":"\u53C2\u6570","link":"#\u53C2\u6570","children":[]}],"relativePath":"hook/useEventListener.md"}'),V=g('<h1 id="useeventlistener" tabindex="-1">useEventListener <a class="header-anchor" href="#useeventlistener" aria-hidden="true">#</a></h1><p>\u66F4\u52A0\u65B9\u4FBF\u4F18\u96C5\u7684\u4F7F\u7528 addEvenetListener</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>useEventListener \u5E94\u5728 setup \u5185\u4F7F\u7528,\u8FD9\u6837\u624D\u4F1A\u5728\u7EC4\u4EF6\u5378\u8F7D\u65F6\u81EA\u52A8\u9500\u6BC1\u76D1\u542C\u3002\u5426\u5219\u4E0D\u4F1A\u81EA\u52A8\u9500\u6BC1\u3002</p></div><h2 id="\u57FA\u7840\u4F7F\u7528" tabindex="-1">\u57FA\u7840\u4F7F\u7528 <a class="header-anchor" href="#\u57FA\u7840\u4F7F\u7528" aria-hidden="true">#</a></h2><blockquote><p>useEventListener(target, event, listener, options)</p></blockquote><blockquote><p>useEventListener(event, listener, options) \u4E0D\u4F20 target \u4E3A window</p></blockquote>',6),N=e("div",{class:"language-vue"},[e("pre",{class:"shiki"},[e("code",null,[e("span",{class:"line"},[e("span",{style:{color:"#89DDFF"}},"<"),e("span",{style:{color:"#F07178"}},"template"),e("span",{style:{color:"#89DDFF"}},">")]),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#A6ACCD"}},"  "),e("span",{style:{color:"#89DDFF"}},"<"),e("span",{style:{color:"#FFCB6B"}},"BaseButton"),e("span",{style:{color:"#89DDFF"}},">"),e("span",{style:{color:"#A6ACCD"}},"\u70B9\u51FB\u4E86 "),e("span",{style:{color:"#89DDFF"}},"{{"),e("span",{style:{color:"#A6ACCD"}}," count "),e("span",{style:{color:"#89DDFF"}},"}}"),e("span",{style:{color:"#A6ACCD"}}," \u6B21"),e("span",{style:{color:"#89DDFF"}},"</"),e("span",{style:{color:"#FFCB6B"}},"BaseButton"),e("span",{style:{color:"#89DDFF"}},">")]),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#89DDFF"}},"</"),e("span",{style:{color:"#F07178"}},"template"),e("span",{style:{color:"#89DDFF"}},">")]),s(`
`),e("span",{class:"line"}),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#89DDFF"}},"<"),e("span",{style:{color:"#F07178"}},"script"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#C792EA"}},"setup"),e("span",{style:{color:"#89DDFF"}},">")]),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#89DDFF"}},"import"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#89DDFF"}},"{"),e("span",{style:{color:"#F07178"}}," "),e("span",{style:{color:"#A6ACCD"}},"getCurrentInstance"),e("span",{style:{color:"#89DDFF"}},","),e("span",{style:{color:"#F07178"}}," "),e("span",{style:{color:"#A6ACCD"}},"ref"),e("span",{style:{color:"#F07178"}}," "),e("span",{style:{color:"#89DDFF"}},"}"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#89DDFF"}},"from"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#89DDFF"}},"'"),e("span",{style:{color:"#C3E88D"}},"vue"),e("span",{style:{color:"#89DDFF"}},"'")]),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#C792EA"}},"const"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#89DDFF"}},"{"),e("span",{style:{color:"#A6ACCD"}}," proxy "),e("span",{style:{color:"#89DDFF"}},"}"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#89DDFF"}},"="),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#82AAFF"}},"getCurrentInstance"),e("span",{style:{color:"#A6ACCD"}},"()")]),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#C792EA"}},"const"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#89DDFF"}},"{"),e("span",{style:{color:"#A6ACCD"}}," useEventListener "),e("span",{style:{color:"#89DDFF"}},"}"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#89DDFF"}},"="),e("span",{style:{color:"#A6ACCD"}}," proxy")]),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#C792EA"}},"const"),e("span",{style:{color:"#A6ACCD"}}," count "),e("span",{style:{color:"#89DDFF"}},"="),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#82AAFF"}},"ref"),e("span",{style:{color:"#A6ACCD"}},"("),e("span",{style:{color:"#F78C6C"}},"0"),e("span",{style:{color:"#A6ACCD"}},")")]),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#C792EA"}},"const"),e("span",{style:{color:"#A6ACCD"}}," stop "),e("span",{style:{color:"#89DDFF"}},"="),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#82AAFF"}},"useEventListener"),e("span",{style:{color:"#A6ACCD"}},"("),e("span",{style:{color:"#89DDFF"}},"'"),e("span",{style:{color:"#C3E88D"}},"click"),e("span",{style:{color:"#89DDFF"}},"'"),e("span",{style:{color:"#89DDFF"}},","),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#89DDFF"}},"()"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#C792EA"}},"=>"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#89DDFF"}},"{")]),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#F07178"}},"  "),e("span",{style:{color:"#A6ACCD"}},"count"),e("span",{style:{color:"#89DDFF"}},"."),e("span",{style:{color:"#A6ACCD"}},"value"),e("span",{style:{color:"#F07178"}}," "),e("span",{style:{color:"#89DDFF"}},"+="),e("span",{style:{color:"#F07178"}}," "),e("span",{style:{color:"#F78C6C"}},"1")]),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#89DDFF"}},"}"),e("span",{style:{color:"#A6ACCD"}},")")]),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#89DDFF"}},"</"),e("span",{style:{color:"#F07178"}},"script"),e("span",{style:{color:"#89DDFF"}},">")]),s(`
`),e("span",{class:"line"})])])],-1),O=e("h2",{id:"\u76D1\u542C\u952E\u76D8\u4E8B\u4EF6",tabindex:"-1"},[s("\u76D1\u542C\u952E\u76D8\u4E8B\u4EF6 "),e("a",{class:"header-anchor",href:"#\u76D1\u542C\u952E\u76D8\u4E8B\u4EF6","aria-hidden":"true"},"#")],-1),I=e("div",{class:"language-vue"},[e("pre",{class:"shiki"},[e("code",null,[e("span",{class:"line"},[e("span",{style:{color:"#89DDFF"}},"<"),e("span",{style:{color:"#F07178"}},"template"),e("span",{style:{color:"#89DDFF"}},">")]),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#A6ACCD"}},"  \u4F60\u6309\u4E0B\u7684\u952E\u4E3A\uFF1A")]),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#A6ACCD"}},"  "),e("span",{style:{color:"#89DDFF"}},"<"),e("span",{style:{color:"#F07178"}},"div"),e("span",{style:{color:"#89DDFF"}}," "),e("span",{style:{color:"#C792EA"}},"style"),e("span",{style:{color:"#89DDFF"}},"="),e("span",{style:{color:"#89DDFF"}},'"'),e("span",{style:{color:"#C3E88D"}},"color: red"),e("span",{style:{color:"#89DDFF"}},'"'),e("span",{style:{color:"#89DDFF"}},">{{"),e("span",{style:{color:"#A6ACCD"}}," name "),e("span",{style:{color:"#89DDFF"}},"}}</"),e("span",{style:{color:"#F07178"}},"div"),e("span",{style:{color:"#89DDFF"}},">")]),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#89DDFF"}},"</"),e("span",{style:{color:"#F07178"}},"template"),e("span",{style:{color:"#89DDFF"}},">")]),s(`
`),e("span",{class:"line"}),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#89DDFF"}},"<"),e("span",{style:{color:"#F07178"}},"script"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#C792EA"}},"setup"),e("span",{style:{color:"#89DDFF"}},">")]),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#89DDFF"}},"import"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#89DDFF"}},"{"),e("span",{style:{color:"#F07178"}}," "),e("span",{style:{color:"#A6ACCD"}},"getCurrentInstance"),e("span",{style:{color:"#89DDFF"}},","),e("span",{style:{color:"#F07178"}}," "),e("span",{style:{color:"#A6ACCD"}},"ref"),e("span",{style:{color:"#F07178"}}," "),e("span",{style:{color:"#89DDFF"}},"}"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#89DDFF"}},"from"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#89DDFF"}},"'"),e("span",{style:{color:"#C3E88D"}},"vue"),e("span",{style:{color:"#89DDFF"}},"'")]),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#C792EA"}},"const"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#89DDFF"}},"{"),e("span",{style:{color:"#A6ACCD"}}," proxy "),e("span",{style:{color:"#89DDFF"}},"}"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#89DDFF"}},"="),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#82AAFF"}},"getCurrentInstance"),e("span",{style:{color:"#A6ACCD"}},"()")]),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#C792EA"}},"const"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#89DDFF"}},"{"),e("span",{style:{color:"#A6ACCD"}}," useEventListener "),e("span",{style:{color:"#89DDFF"}},"}"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#89DDFF"}},"="),e("span",{style:{color:"#A6ACCD"}}," proxy")]),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#C792EA"}},"const"),e("span",{style:{color:"#A6ACCD"}}," name "),e("span",{style:{color:"#89DDFF"}},"="),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#82AAFF"}},"ref"),e("span",{style:{color:"#A6ACCD"}},"("),e("span",{style:{color:"#89DDFF"}},"''"),e("span",{style:{color:"#A6ACCD"}},")")]),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#82AAFF"}},"useEventListener"),e("span",{style:{color:"#A6ACCD"}},"("),e("span",{style:{color:"#89DDFF"}},"'"),e("span",{style:{color:"#C3E88D"}},"keydown"),e("span",{style:{color:"#89DDFF"}},"'"),e("span",{style:{color:"#89DDFF"}},","),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#A6ACCD"}},"e"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#C792EA"}},"=>"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#89DDFF"}},"{")]),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#F07178"}},"  "),e("span",{style:{color:"#A6ACCD"}},"name"),e("span",{style:{color:"#89DDFF"}},"."),e("span",{style:{color:"#A6ACCD"}},"value"),e("span",{style:{color:"#F07178"}}," "),e("span",{style:{color:"#89DDFF"}},"="),e("span",{style:{color:"#F07178"}}," "),e("span",{style:{color:"#A6ACCD"}},"e"),e("span",{style:{color:"#89DDFF"}},"."),e("span",{style:{color:"#A6ACCD"}},"code")]),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#89DDFF"}},"}"),e("span",{style:{color:"#A6ACCD"}},")")]),s(`
`),e("span",{class:"line"},[e("span",{style:{color:"#89DDFF"}},"</"),e("span",{style:{color:"#F07178"}},"script"),e("span",{style:{color:"#89DDFF"}},">")]),s(`
`),e("span",{class:"line"})])])],-1),S=g('<p>target</p><h2 id="\u53C2\u6570" tabindex="-1">\u53C2\u6570 <a class="header-anchor" href="#\u53C2\u6570" aria-hidden="true">#</a></h2><p><code>useEventListener(target, event, listener, options)</code> \u5C06\u8FD4\u56DE\u4E00\u4E2A\u51FD\u6570 stop, \u7528\u4E8E\u9500\u6BC1\u76D1\u542C</p><table><thead><tr><th>\u53C2\u6570</th><th style="text-align:center;">\u8BF4\u660E</th><th style="text-align:right;">\u7C7B\u578B</th><th style="text-align:right;">\u9ED8\u8BA4\u503C</th></tr></thead><tbody><tr><td>target</td><td style="text-align:center;">\u7ED1\u5B9A\u76D1\u542C\u4E8B\u4EF6\u7684dom\u5143\u7D20\uFF08\u53EF\u9009\uFF0C\u9ED8\u8BA4\u4E3Awindow\uFF09</td><td style="text-align:right;">HtmlElement</td><td style="text-align:right;">window</td></tr><tr><td>event</td><td style="text-align:center;">\u76D1\u542C\u4E8B\u4EF6\u7684\u7C7B\u578B\u3002\u4F8B\u5982 click, input</td><td style="text-align:right;">Event</td><td style="text-align:right;">-</td></tr><tr><td>listener</td><td style="text-align:center;">\u56DE\u8C03\u51FD\u6570</td><td style="text-align:right;">(this: Window, ev: WindowEventMap[Event]) =&gt; void</td><td style="text-align:right;">-</td></tr><tr><td>options</td><td style="text-align:center;">addEventlistener \u7684 options(\u53EF\u9009)</td><td style="text-align:right;">AddEventListenerOptions</td><td style="text-align:right;">-</td></tr></tbody></table>',4);function T(C,i,r,a,A,d){const c=B("render-demo-0"),n=B("demo"),l=B("render-demo-1");return L(),k("div",null,[V,_(n,{customClass:"undefined",sourceCode:`<template><ClientOnly>\r
  <BaseButton>\u70B9\u51FB\u4E86 {{ count }} \u6B21</BaseButton>\r
</ClientOnly></template>\r
\r
<script setup>\r
import { getCurrentInstance, ref } from 'vue'\r
const { proxy } = getCurrentInstance()\r
const { useEventListener } = proxy\r
const count = ref(0)\r
const stop = useEventListener('click', () => {\r
  count.value += 1\r
})\r
<\/script>\r
`},{highlight:h(()=>[N]),default:h(()=>[_(c)]),_:1}),O,_(n,{customClass:"undefined",sourceCode:`<template><ClientOnly>\r
  \u4F60\u6309\u4E0B\u7684\u952E\u4E3A\uFF1A\r
  <div style="color: red">{{ name }}</div>\r
</ClientOnly></template>\r
\r
<script setup>\r
import { getCurrentInstance, ref } from 'vue'\r
const { proxy } = getCurrentInstance()\r
const { useEventListener } = proxy\r
const name = ref('')\r
useEventListener('keydown', e => {\r
  name.value = e.code\r
})\r
<\/script>\r
`},{highlight:h(()=>[I]),default:h(()=>[_(l)]),_:1}),S])}const $=f(w,[["render",T]]);export{P as __pageData,$ as default};