import{V as C,_ as T,c as k,a as g,w as B,d as s,e,b as v,r as _,o as b}from"./app.617fe086.js";const{defineComponent:S}=C,V=S({name:"component-doc",components:{"render-demo-0":function(){const{toDisplayString:i,createElementVNode:p,createTextVNode:t,resolveComponent:F,withCtx:n,createVNode:r,openBlock:D,createBlock:y}=C,h={style:{margin:"10px 0"}},m={style:{color:"red"}};function f(a,o){const l=F("BaseButton"),c=F("ClientOnly");return D(),y(c,null,{default:n(()=>[p("div",h,[t(" Effects: "),p("span",m,i(a.state),1)]),r(l,{onClick:a.toggle},{default:n(()=>[t("Toggle")]),_:1},8,["onClick"]),r(l,{onClick:o[0]||(o[0]=u=>a.setState(!1))},{default:n(()=>[t("Toggle False")]),_:1}),r(l,{onClick:o[1]||(o[1]=u=>a.setState(!0))},{default:n(()=>[t("Toggle True")]),_:1})]),_:1})}const{getCurrentInstance:A}=C;return{render:f,...{setup(a,{expose:o}){o();const{proxy:l}=A(),{useToggle:c}=l,[u,E,x]=c(),d={proxy:l,useToggle:c,state:u,toggle:E,setState:x,getCurrentInstance:A};return Object.defineProperty(d,"__isScriptSetup",{enumerable:!1,value:!0}),d}}}}()}}),J=JSON.parse('{"title":"useToggle","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u57FA\u7840\u4F7F\u7528","slug":"\u57FA\u7840\u4F7F\u7528","link":"#\u57FA\u7840\u4F7F\u7528","children":[]},{"level":2,"title":"\u53C2\u6570","slug":"\u53C2\u6570","link":"#\u53C2\u6570","children":[]}],"relativePath":"hook/useToggle.md"}'),N=s("h1",{id:"usetoggle",tabindex:"-1"},[e("useToggle "),s("a",{class:"header-anchor",href:"#usetoggle","aria-hidden":"true"},"#")],-1),O=s("h2",{id:"\u57FA\u7840\u4F7F\u7528",tabindex:"-1"},[e("\u57FA\u7840\u4F7F\u7528 "),s("a",{class:"header-anchor",href:"#\u57FA\u7840\u4F7F\u7528","aria-hidden":"true"},"#")],-1),$=s("p",null,"boolean \u7684\u5207\u6362",-1),I=s("div",{class:"language-vue"},[s("pre",{class:"shiki"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"div"),s("span",{style:{color:"#89DDFF"}}," "),s("span",{style:{color:"#C792EA"}},"style"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"margin: 10px 0"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    Effects:")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"span"),s("span",{style:{color:"#89DDFF"}}," "),s("span",{style:{color:"#C792EA"}},"style"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"color: red"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}},">{{"),s("span",{style:{color:"#A6ACCD"}}," state "),s("span",{style:{color:"#89DDFF"}},"}}</"),s("span",{style:{color:"#F07178"}},"span"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"div"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#FFCB6B"}},"BaseButton"),s("span",{style:{color:"#89DDFF"}}," @"),s("span",{style:{color:"#C792EA"}},"click"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#A6ACCD"}},"toggle"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}},">"),s("span",{style:{color:"#A6ACCD"}},"Toggle"),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#FFCB6B"}},"BaseButton"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#FFCB6B"}},"BaseButton"),s("span",{style:{color:"#89DDFF"}}," @"),s("span",{style:{color:"#C792EA"}},"click"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#82AAFF"}},"setState"),s("span",{style:{color:"#89DDFF"}},"("),s("span",{style:{color:"#FF9CAC"}},"false"),s("span",{style:{color:"#89DDFF"}},")"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}},">"),s("span",{style:{color:"#A6ACCD"}},"Toggle False"),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#FFCB6B"}},"BaseButton"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#FFCB6B"}},"BaseButton"),s("span",{style:{color:"#89DDFF"}}," @"),s("span",{style:{color:"#C792EA"}},"click"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#82AAFF"}},"setState"),s("span",{style:{color:"#89DDFF"}},"("),s("span",{style:{color:"#FF9CAC"}},"true"),s("span",{style:{color:"#89DDFF"}},")"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}},">"),s("span",{style:{color:"#A6ACCD"}},"Toggle True"),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#FFCB6B"}},"BaseButton"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"}),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"script"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#C792EA"}},"setup"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"import"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"getCurrentInstance"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"from"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"vue"),s("span",{style:{color:"#89DDFF"}},"'")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C792EA"}},"const"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#A6ACCD"}}," proxy "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#82AAFF"}},"getCurrentInstance"),s("span",{style:{color:"#A6ACCD"}},"()")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C792EA"}},"const"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#A6ACCD"}}," useToggle "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#A6ACCD"}}," proxy")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C792EA"}},"const"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"["),s("span",{style:{color:"#A6ACCD"}},"state"),s("span",{style:{color:"#89DDFF"}},","),s("span",{style:{color:"#A6ACCD"}}," toggle"),s("span",{style:{color:"#89DDFF"}},","),s("span",{style:{color:"#A6ACCD"}}," setState"),s("span",{style:{color:"#89DDFF"}},"]"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#82AAFF"}},"useToggle"),s("span",{style:{color:"#A6ACCD"}},"()")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"script"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"})])])],-1),w=v('<h2 id="\u53C2\u6570" tabindex="-1">\u53C2\u6570 <a class="header-anchor" href="#\u53C2\u6570" aria-hidden="true">#</a></h2><blockquote><p><code>useToggle(val)</code> \u5C06\u8FD4\u56DE\u4E00\u4E2A \u54CD\u5E94\u5F0F\u7684 bool \u503C\u3001 \u5207\u6362\u51FD\u6570\u3001 \u8D4B\u503C\u51FD\u6570</p></blockquote><table><thead><tr><th>\u53C2\u6570</th><th style="text-align:center;">\u8BF4\u660E</th><th style="text-align:right;">\u7C7B\u578B</th><th style="text-align:right;">\u9ED8\u8BA4\u503C</th></tr></thead><tbody><tr><td>val</td><td style="text-align:center;">\u521D\u59CB\u5316\u7684 boolean \u503C</td><td style="text-align:right;">Boolean</td><td style="text-align:right;">false</td></tr></tbody></table>',3);function q(i,p,t,F,n,r){const D=_("render-demo-0"),y=_("demo");return b(),k("div",null,[N,O,$,g(y,{customClass:"undefined",sourceCode:`<template><ClientOnly>\r
  <div style="margin: 10px 0">\r
    Effects:\r
    <span style="color: red">{{ state }}</span>\r
  </div>\r
  <BaseButton @click="toggle">Toggle</BaseButton>\r
  <BaseButton @click="setState(false)">Toggle False</BaseButton>\r
  <BaseButton @click="setState(true)">Toggle True</BaseButton>\r
</ClientOnly></template>\r
\r
<script setup>\r
import { getCurrentInstance } from 'vue'\r
const { proxy } = getCurrentInstance()\r
const { useToggle } = proxy\r
const [state, toggle, setState] = useToggle()\r
<\/script>\r
`},{highlight:B(()=>[I]),default:B(()=>[g(D)]),_:1}),w])}const z=T(V,[["render",q]]);export{J as __pageData,z as default};
