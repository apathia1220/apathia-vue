import{V as F,_ as h,c as B,a as A,w as y,d as t,e as l,b as f,r as m,o as _}from"./app.213b433d.js";const{defineComponent:v}=F,b=v({name:"component-doc",components:{"render-demo-0":function(){const{resolveComponent:n,createVNode:c,withCtx:p,openBlock:d,createBlock:D}=F;function i(e,u){const r=n("Upload"),a=n("ClientOnly");return d(),D(a,null,{default:p(()=>[c(r,{modelValue:e.file1,"onUpdate:modelValue":u[0]||(u[0]=o=>e.file1=o),action:"/upload/path","resolve-url":e.resolveLocation},null,8,["modelValue","resolve-url"])]),_:1})}const{ref:s}=F;return{render:i,...{setup(e,{expose:u}){u();const o={file1:s(""),resolveLocation:E=>E.data,ref:s};return Object.defineProperty(o,"__isScriptSetup",{enumerable:!1,value:!0}),o}}}}(),"render-demo-1":function(){const{resolveComponent:n,createVNode:c,withCtx:p,openBlock:d,createBlock:D}=F;function i(e,u){const r=n("Upload"),a=n("ClientOnly");return d(),D(a,null,{default:p(()=>[c(r,{modelValue:e.file2s,"onUpdate:modelValue":u[0]||(u[0]=o=>e.file2s=o),multiple:!0,action:"/upload/path","resolve-url":e.resolveLocation},null,8,["modelValue","resolve-url"])]),_:1})}const{ref:s}=F;return{render:i,...{setup(e,{expose:u}){u();const o={file2s:s(""),resolveLocation:E=>E.data,ref:s};return Object.defineProperty(o,"__isScriptSetup",{enumerable:!1,value:!0}),o}}}}(),"render-demo-2":function(){const{resolveComponent:n,createVNode:c,withCtx:p,openBlock:d,createBlock:D}=F;function i(e,u){const r=n("Upload"),a=n("ClientOnly");return d(),D(a,null,{default:p(()=>[c(r,{modelValue:e.file4s,"onUpdate:modelValue":u[0]||(u[0]=o=>e.file4s=o),draggable:!0,multiple:!0,action:"/upload/path","resolve-url":e.resolveLocation},null,8,["modelValue","resolve-url"])]),_:1})}const{ref:s}=F;return{render:i,...{setup(e,{expose:u}){u();const o={file4s:s([]),resolveLocation:E=>E.data,ref:s};return Object.defineProperty(o,"__isScriptSetup",{enumerable:!1,value:!0}),o}}}}()}}),I=JSON.parse('{"title":"Upload \u4E0A\u4F20","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u57FA\u7840\u7528\u6CD5","slug":"\u57FA\u7840\u7528\u6CD5","link":"#\u57FA\u7840\u7528\u6CD5","children":[]},{"level":2,"title":"\u4E0A\u4F20\u591A\u5F20\u56FE\u7247","slug":"\u4E0A\u4F20\u591A\u5F20\u56FE\u7247","link":"#\u4E0A\u4F20\u591A\u5F20\u56FE\u7247","children":[]},{"level":2,"title":"\u62D6\u62FD\u4E0A\u4F20\u591A\u4E2A\u6587\u4EF6","slug":"\u62D6\u62FD\u4E0A\u4F20\u591A\u4E2A\u6587\u4EF6","link":"#\u62D6\u62FD\u4E0A\u4F20\u591A\u4E2A\u6587\u4EF6","children":[]},{"level":2,"title":"Upload Props","slug":"upload-props","link":"#upload-props","children":[]},{"level":2,"title":"Upload \u4E8B\u4EF6","slug":"upload-\u4E8B\u4EF6","link":"#upload-\u4E8B\u4EF6","children":[]},{"level":2,"title":"Upload \u63D2\u69FD","slug":"upload-\u63D2\u69FD","link":"#upload-\u63D2\u69FD","children":[]}],"relativePath":"component/Upload.md"}'),g=t("h1",{id:"upload-\u4E0A\u4F20",tabindex:"-1"},[l("Upload \u4E0A\u4F20 "),t("a",{class:"header-anchor",href:"#upload-\u4E0A\u4F20","aria-hidden":"true"},"#")],-1),U=t("p",null,"\u901A\u8FC7\u70B9\u51FB\u6216\u8005\u62D6\u62FD\u4E0A\u4F20\u6587\u4EF6",-1),k=t("h2",{id:"\u57FA\u7840\u7528\u6CD5",tabindex:"-1"},[l("\u57FA\u7840\u7528\u6CD5 "),t("a",{class:"header-anchor",href:"#\u57FA\u7840\u7528\u6CD5","aria-hidden":"true"},"#")],-1),V=t("p",null,"\u6307\u5B9A\u4E0A\u4F20\u8DEF\u5F84",-1),L=t("div",{class:"language-vue"},[t("pre",{class:"shiki"},[t("code",null,[t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"<"),t("span",{style:{color:"#F07178"}},"template"),t("span",{style:{color:"#89DDFF"}},">")]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#A6ACCD"}},"  "),t("span",{style:{color:"#89DDFF"}},"<"),t("span",{style:{color:"#FFCB6B"}},"Upload")]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"    "),t("span",{style:{color:"#C792EA"}},"v-model"),t("span",{style:{color:"#89DDFF"}},"="),t("span",{style:{color:"#89DDFF"}},'"'),t("span",{style:{color:"#A6ACCD"}},"file1"),t("span",{style:{color:"#89DDFF"}},'"')]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"    "),t("span",{style:{color:"#C792EA"}},"action"),t("span",{style:{color:"#89DDFF"}},"="),t("span",{style:{color:"#89DDFF"}},'"'),t("span",{style:{color:"#C3E88D"}},"/upload/path"),t("span",{style:{color:"#89DDFF"}},'"')]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"    :"),t("span",{style:{color:"#C792EA"}},"resolve-url"),t("span",{style:{color:"#89DDFF"}},"="),t("span",{style:{color:"#89DDFF"}},'"'),t("span",{style:{color:"#A6ACCD"}},"resolveLocation"),t("span",{style:{color:"#89DDFF"}},'"')]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"  />")]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"</"),t("span",{style:{color:"#F07178"}},"template"),t("span",{style:{color:"#89DDFF"}},">")]),l(`
`),t("span",{class:"line"}),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"<"),t("span",{style:{color:"#F07178"}},"script"),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#C792EA"}},"setup"),t("span",{style:{color:"#89DDFF"}},">")]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"import"),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#89DDFF"}},"{"),t("span",{style:{color:"#F07178"}}," "),t("span",{style:{color:"#A6ACCD"}},"ref"),t("span",{style:{color:"#F07178"}}," "),t("span",{style:{color:"#89DDFF"}},"}"),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#89DDFF"}},"from"),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#89DDFF"}},"'"),t("span",{style:{color:"#C3E88D"}},"vue"),t("span",{style:{color:"#89DDFF"}},"'")]),l(`
`),t("span",{class:"line"}),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#C792EA"}},"const"),t("span",{style:{color:"#A6ACCD"}}," file1 "),t("span",{style:{color:"#89DDFF"}},"="),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#82AAFF"}},"ref"),t("span",{style:{color:"#A6ACCD"}},"("),t("span",{style:{color:"#89DDFF"}},"''"),t("span",{style:{color:"#A6ACCD"}},")")]),l(`
`),t("span",{class:"line"}),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#C792EA"}},"const"),t("span",{style:{color:"#A6ACCD"}}," resolveLocation "),t("span",{style:{color:"#89DDFF"}},"="),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#A6ACCD"}},"resp"),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#C792EA"}},"=>"),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#89DDFF"}},"{")]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#F07178"}},"  "),t("span",{style:{color:"#89DDFF"}},"return"),t("span",{style:{color:"#F07178"}}," "),t("span",{style:{color:"#A6ACCD"}},"resp"),t("span",{style:{color:"#89DDFF"}},"."),t("span",{style:{color:"#A6ACCD"}},"data")]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"}")]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"</"),t("span",{style:{color:"#F07178"}},"script"),t("span",{style:{color:"#89DDFF"}},">")]),l(`
`),t("span",{class:"line"})])])],-1),x=t("h2",{id:"\u4E0A\u4F20\u591A\u5F20\u56FE\u7247",tabindex:"-1"},[l("\u4E0A\u4F20\u591A\u5F20\u56FE\u7247 "),t("a",{class:"header-anchor",href:"#\u4E0A\u4F20\u591A\u5F20\u56FE\u7247","aria-hidden":"true"},"#")],-1),O=t("p",null,[l("\u901A\u8FC7\u6307\u5B9A "),t("code",null,"multiple"),l(" \u4E3A true \u53EF\u4EE5\u5141\u8BB8\u4E0A\u4F20\u591A\u5F20\u56FE\u7247")],-1),P=t("div",{class:"language-vue"},[t("pre",{class:"shiki"},[t("code",null,[t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"<"),t("span",{style:{color:"#F07178"}},"template"),t("span",{style:{color:"#89DDFF"}},">")]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#A6ACCD"}},"  "),t("span",{style:{color:"#89DDFF"}},"<"),t("span",{style:{color:"#FFCB6B"}},"Upload")]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"    "),t("span",{style:{color:"#C792EA"}},"v-model"),t("span",{style:{color:"#89DDFF"}},"="),t("span",{style:{color:"#89DDFF"}},'"'),t("span",{style:{color:"#A6ACCD"}},"file2s"),t("span",{style:{color:"#89DDFF"}},'"')]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"    :"),t("span",{style:{color:"#C792EA"}},"multiple"),t("span",{style:{color:"#89DDFF"}},"="),t("span",{style:{color:"#89DDFF"}},'"'),t("span",{style:{color:"#FF9CAC"}},"true"),t("span",{style:{color:"#89DDFF"}},'"')]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"    "),t("span",{style:{color:"#C792EA"}},"action"),t("span",{style:{color:"#89DDFF"}},"="),t("span",{style:{color:"#89DDFF"}},'"'),t("span",{style:{color:"#C3E88D"}},"/upload/path"),t("span",{style:{color:"#89DDFF"}},'"')]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"    :"),t("span",{style:{color:"#C792EA"}},"resolve-url"),t("span",{style:{color:"#89DDFF"}},"="),t("span",{style:{color:"#89DDFF"}},'"'),t("span",{style:{color:"#A6ACCD"}},"resolveLocation"),t("span",{style:{color:"#89DDFF"}},'"')]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"  />")]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"</"),t("span",{style:{color:"#F07178"}},"template"),t("span",{style:{color:"#89DDFF"}},">")]),l(`
`),t("span",{class:"line"}),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"<"),t("span",{style:{color:"#F07178"}},"script"),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#C792EA"}},"setup"),t("span",{style:{color:"#89DDFF"}},">")]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"import"),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#89DDFF"}},"{"),t("span",{style:{color:"#F07178"}}," "),t("span",{style:{color:"#A6ACCD"}},"ref"),t("span",{style:{color:"#F07178"}}," "),t("span",{style:{color:"#89DDFF"}},"}"),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#89DDFF"}},"from"),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#89DDFF"}},"'"),t("span",{style:{color:"#C3E88D"}},"vue"),t("span",{style:{color:"#89DDFF"}},"'")]),l(`
`),t("span",{class:"line"}),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#C792EA"}},"const"),t("span",{style:{color:"#A6ACCD"}}," file2s "),t("span",{style:{color:"#89DDFF"}},"="),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#82AAFF"}},"ref"),t("span",{style:{color:"#A6ACCD"}},"("),t("span",{style:{color:"#89DDFF"}},"''"),t("span",{style:{color:"#A6ACCD"}},")")]),l(`
`),t("span",{class:"line"}),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#C792EA"}},"const"),t("span",{style:{color:"#A6ACCD"}}," resolveLocation "),t("span",{style:{color:"#89DDFF"}},"="),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#A6ACCD"}},"resp"),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#C792EA"}},"=>"),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#89DDFF"}},"{")]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#F07178"}},"  "),t("span",{style:{color:"#89DDFF"}},"return"),t("span",{style:{color:"#F07178"}}," "),t("span",{style:{color:"#A6ACCD"}},"resp"),t("span",{style:{color:"#89DDFF"}},"."),t("span",{style:{color:"#A6ACCD"}},"data")]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"}")]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"</"),t("span",{style:{color:"#F07178"}},"script"),t("span",{style:{color:"#89DDFF"}},">")]),l(`
`),t("span",{class:"line"})])])],-1),N=t("h2",{id:"\u62D6\u62FD\u4E0A\u4F20\u591A\u4E2A\u6587\u4EF6",tabindex:"-1"},[l("\u62D6\u62FD\u4E0A\u4F20\u591A\u4E2A\u6587\u4EF6 "),t("a",{class:"header-anchor",href:"#\u62D6\u62FD\u4E0A\u4F20\u591A\u4E2A\u6587\u4EF6","aria-hidden":"true"},"#")],-1),w=t("p",null,[l("\u901A\u8FC7\u6307\u5B9A "),t("code",null,"draggable"),l(" \u4E3A true \u53EF\u4EE5\u5141\u8BB8\u62D6\u62FD\u4E0A\u4F20")],-1),S=t("div",{class:"language-vue"},[t("pre",{class:"shiki"},[t("code",null,[t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"<"),t("span",{style:{color:"#F07178"}},"template"),t("span",{style:{color:"#89DDFF"}},">")]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#A6ACCD"}},"  "),t("span",{style:{color:"#89DDFF"}},"<"),t("span",{style:{color:"#FFCB6B"}},"Upload")]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"    "),t("span",{style:{color:"#C792EA"}},"v-model"),t("span",{style:{color:"#89DDFF"}},"="),t("span",{style:{color:"#89DDFF"}},'"'),t("span",{style:{color:"#A6ACCD"}},"file4s"),t("span",{style:{color:"#89DDFF"}},'"')]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"    :"),t("span",{style:{color:"#C792EA"}},"draggable"),t("span",{style:{color:"#89DDFF"}},"="),t("span",{style:{color:"#89DDFF"}},'"'),t("span",{style:{color:"#FF9CAC"}},"true"),t("span",{style:{color:"#89DDFF"}},'"')]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"    :"),t("span",{style:{color:"#C792EA"}},"multiple"),t("span",{style:{color:"#89DDFF"}},"="),t("span",{style:{color:"#89DDFF"}},'"'),t("span",{style:{color:"#FF9CAC"}},"true"),t("span",{style:{color:"#89DDFF"}},'"')]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"    "),t("span",{style:{color:"#C792EA"}},"action"),t("span",{style:{color:"#89DDFF"}},"="),t("span",{style:{color:"#89DDFF"}},'"'),t("span",{style:{color:"#C3E88D"}},"/upload/path"),t("span",{style:{color:"#89DDFF"}},'"')]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"    :"),t("span",{style:{color:"#C792EA"}},"resolve-url"),t("span",{style:{color:"#89DDFF"}},"="),t("span",{style:{color:"#89DDFF"}},'"'),t("span",{style:{color:"#A6ACCD"}},"resolveLocation"),t("span",{style:{color:"#89DDFF"}},'"')]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"  />")]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"</"),t("span",{style:{color:"#F07178"}},"template"),t("span",{style:{color:"#89DDFF"}},">")]),l(`
`),t("span",{class:"line"}),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"<"),t("span",{style:{color:"#F07178"}},"script"),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#C792EA"}},"setup"),t("span",{style:{color:"#89DDFF"}},">")]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"import"),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#89DDFF"}},"{"),t("span",{style:{color:"#F07178"}}," "),t("span",{style:{color:"#A6ACCD"}},"ref"),t("span",{style:{color:"#F07178"}}," "),t("span",{style:{color:"#89DDFF"}},"}"),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#89DDFF"}},"from"),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#89DDFF"}},"'"),t("span",{style:{color:"#C3E88D"}},"vue"),t("span",{style:{color:"#89DDFF"}},"'")]),l(`
`),t("span",{class:"line"}),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#C792EA"}},"const"),t("span",{style:{color:"#A6ACCD"}}," file4s "),t("span",{style:{color:"#89DDFF"}},"="),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#82AAFF"}},"ref"),t("span",{style:{color:"#A6ACCD"}},"([])")]),l(`
`),t("span",{class:"line"}),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#C792EA"}},"const"),t("span",{style:{color:"#A6ACCD"}}," resolveLocation "),t("span",{style:{color:"#89DDFF"}},"="),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#A6ACCD"}},"resp"),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#C792EA"}},"=>"),t("span",{style:{color:"#A6ACCD"}}," "),t("span",{style:{color:"#89DDFF"}},"{")]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#F07178"}},"  "),t("span",{style:{color:"#89DDFF"}},"return"),t("span",{style:{color:"#F07178"}}," "),t("span",{style:{color:"#A6ACCD"}},"resp"),t("span",{style:{color:"#89DDFF"}},"."),t("span",{style:{color:"#A6ACCD"}},"data")]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"}")]),l(`
`),t("span",{class:"line"},[t("span",{style:{color:"#89DDFF"}},"</"),t("span",{style:{color:"#F07178"}},"script"),t("span",{style:{color:"#89DDFF"}},">")]),l(`
`),t("span",{class:"line"})])])],-1),j=f('<h2 id="upload-props" tabindex="-1">Upload Props <a class="header-anchor" href="#upload-props" aria-hidden="true">#</a></h2><table><thead><tr><th>\u53C2\u6570</th><th>\u7C7B\u578B</th><th>\u662F\u5426\u5FC5\u4F20</th><th>\u8BF4\u660E</th><th>\u9ED8\u8BA4\u503C</th></tr></thead><tbody><tr><td>modelValue</td><td>array/string</td><td>\u662F</td><td>\u4E0A\u4F20\u5730\u5740\u7684\u503C\uFF0C\u5982\u679C multiple \u662F true\uFF0C\u5219\u662F\u6570\u7EC4\uFF0C\u5426\u5219\u662F\u5355\u4E2A\u5B57\u7B26\u4E32</td><td>-</td></tr><tr><td>valid</td><td>boolean</td><td>\u5426</td><td>\u4E0A\u4F20\u8D44\u6E90\u662F\u5426\u7B26\u5408\u8981\u6C42</td><td>false</td></tr><tr><td>draggable</td><td>boolean</td><td>\u5426</td><td>\u8BBE\u7F6E\u4E3A true \u5141\u8BB8\u62D6\u62FD\u4E0A\u4F20</td><td>false</td></tr><tr><td>headers</td><td>object</td><td>\u5426</td><td>\u4E0A\u4F20\u65F6\u9700\u8981\u9644\u5E26\u7684 http \u8BF7\u6C42\u5934</td><td>false</td></tr><tr><td>action</td><td>string</td><td>\u662F</td><td>\u4E0A\u4F20\u5730\u5740</td><td>-</td></tr><tr><td>name</td><td>string</td><td>\u5426</td><td>\u4E0A\u4F20\u65F6\u6587\u4EF6\u7684\u540D\u5B57\uFF0CFormData \u7684 key \u952E\u540D</td><td>&#39;file&#39;</td></tr><tr><td>data</td><td>object</td><td>\u5426</td><td>\u4E0A\u4F20\u65F6\u9700\u8981\u989D\u5916\u6DFB\u52A0\u5230 FormData \u7684 k-v \u5BF9</td><td>-</td></tr><tr><td>inputDisabled</td><td>boolean</td><td>\u5426</td><td>input \u8F93\u5165\u6846\u7981\u6B62\u8F93\u5165</td><td>false</td></tr><tr><td>noInput</td><td>boolean</td><td>\u5426</td><td>\u4E0D\u663E\u793A\u8F93\u5165\u6846</td><td>false</td></tr><tr><td>buttonName</td><td>string</td><td>\u5426</td><td>\u4E0A\u4F20\u6309\u94AE\u7684\u540D\u5B57</td><td>&#39;\u4E0A\u4F20&#39;</td></tr><tr><td>withCredentials</td><td>boolean</td><td>\u5426</td><td>http \u8BF7\u6C42\u662F\u5426\u5F00\u53D1 withCredentials\uFF0C\u8DE8\u57DF\u65F6\u8BBE\u7F6E\u4E3A true \u624D\u4F1A\u5E26\u4E0A cookie</td><td>false</td></tr><tr><td>multiple</td><td>boolean</td><td>\u5426</td><td>\u662F\u5426\u652F\u6301\u591A\u6587\u4EF6\u4E0A\u4F20</td><td>false</td></tr><tr><td>limit</td><td>number</td><td>\u5426</td><td>multiple \u4E3A true \u4E8B\uFF0C\u6700\u591A\u652F\u6301\u51E0\u4E2A\u6587\u4EF6</td><td>5</td></tr><tr><td>filesize</td><td>string/number</td><td>\u5426</td><td>\u6587\u4EF6\u6700\u5927\u7684\u5927\u5C0F\uFF0C\u5355\u4F4D\u4E0E File.size \u4E00\u81F4</td><td>-</td></tr><tr><td>accept</td><td>string</td><td>\u5426</td><td>\u53EF\u4E0A\u4F20\u7684\u6587\u4EF6\u7C7B\u578B\uFF0C\u4E0E input \u6807\u7B7E\u7684 accept \u4E00\u81F4</td><td>&#39;image/*&#39;</td></tr><tr><td>disabled</td><td>boolean</td><td>\u5426</td><td>\u7981\u6B62\u4E0A\u4F20\u6587\u4EF6</td><td>false</td></tr><tr><td>onBeforeEachUpload</td><td>function</td><td>\u5426</td><td>\u5728\u6BCF\u4E2A\u6587\u4EF6\u4E0A\u4F20\u524D\u8C03\u7528 \u53C2\u6570\u662F\u9009\u4E2D\u7684 File \u5BF9\u8C61\uFF0C\u901A\u8FC7\u8FD4\u56DE File/Promise&lt;File&gt;\u6765\u7EE7\u7EED\u4E0A\u4F20\uFF0C\u901A\u8FC7\u629B\u51FA\u51FA\u9519\u8BEF\u6765\u963B\u6B62\u4E0A\u4F20</td><td>-</td></tr><tr><td>onBeforeAllUpload</td><td>function</td><td>\u5426</td><td>\u5728\u6BCF\u6B21\u6587\u4EF6\u4E0A\u4F20\u524D\u8C03\u7528 \u53C2\u6570\u662F\u9009\u4E2D\u7684 FileList \u5BF9\u8C61\uFF0C\u901A\u8FC7\u8FD4\u56DE true/Promise&lt;true&gt;\u6765\u7EE7\u7EED\u4E0A\u4F20\uFF0C\u901A\u8FC7\u8FD4\u56DE false/Promise&lt;false&gt;/Promise.reject()\u6765\u963B\u6B62\u4E0A\u4F20</td><td>-</td></tr><tr><td>onAfterEachUpload</td><td>function</td><td>\u5426</td><td>\u5728\u6BCF\u4E2A\u6587\u4EF6\u4E0A\u4F20\u5B8C\u8C03\u7528\uFF0C \u53C2\u6570\u662F\u9009\u4E2D\u7684\u6587\u4EF6\u4E0A\u4F20\u540E\u8FD4\u56DE\u7684 url \u5730\u5740\u548C\u6587\u4EF6\u5BF9\u8C61\uFF0C\u8FD4\u56DE true/Promise&lt;true&gt;\uFF0C\u503C\u4F1A\u88AB\u5F53\u6210\u6709\u6548\u7684\u503C\uFF1B\u8FD4\u56DE false/Promise&lt;false&gt;/Promise.reject()\u6587\u4EF6\u4F1A\u88AB\u4E22\u5F03</td><td>-</td></tr><tr><td>onError</td><td>function</td><td>\u5426</td><td>\u5728\u4E0A\u4F20\u51FA\u9519\u65F6\u8C03\u7528</td><td>-</td></tr><tr><td>resolveUrl</td><td>function</td><td>\u5426</td><td>\u4ECE http \u8BF7\u6C42\uFF08\u5C31\u662F action \u90A3\u4E2A\u5730\u5740\uFF09\u54CD\u5E94\u62FF\u5230\u56FE\u7247\u5730\u5740\uFF0C\u8FD4\u56DE\u4E00\u4E2A\u5B57\u7B26\u4E32\u4F5C\u4E3A\u56FE\u7247\u5730\u5740</td><td>-</td></tr><tr><td>checkUrl</td><td>function</td><td>\u5426</td><td>\u7528\u6765\u68C0\u67E5 url \u662F\u5426\u5408\u6CD5\u7684\u65B9\u6CD5\uFF0C\u56E0\u4E3A\u6709\u65F6\u5019\u7EC4\u4EF6\u662F\u6709\u521D\u59CB\u503C\u7684\uFF0C\u9700\u8981\u8FD9\u4E2A\u65B9\u6CD5\u6765\u68C0\u67E5\u4E00\u4E0B url \u662F\u5426\u7B26\u5408\u8981\u6C42</td><td>-</td></tr></tbody></table><h2 id="upload-\u4E8B\u4EF6" tabindex="-1">Upload \u4E8B\u4EF6 <a class="header-anchor" href="#upload-\u4E8B\u4EF6" aria-hidden="true">#</a></h2><table><thead><tr><th>\u4E8B\u4EF6\u540D\u79F0</th><th>\u8BF4\u660E</th><th>\u56DE\u8C03\u53C2\u6570</th></tr></thead><tbody><tr><td>update:modelValue</td><td>\u6587\u4EF6\u7684\u8DEF\u5F84\u7684\u66F4\u65B0\u64CD\u4F5C</td><td>\u6587\u4EF6\u8DEF\u5F84\u6539\u53D8\u540E\u7684\u503C</td></tr><tr><td>update:valid</td><td>\u66F4\u65B0\u9700\u8981\u4E0A\u4F20\u7684\u6587\u4EF6\u662F\u5426\u6B63\u786E</td><td>modelValue \u6709\u503C\u65F6\uFF0C\u4F1A\u89E6\u53D1\u8BE5\u4E8B\u4EF6\uFF0C\u7ED3\u679C\u662F\u8BE5 url \u662F\u5426\u7B26\u5408\u8981\u6C42\uFF0C\u6BD4\u5982 url \u5BF9\u5E94\u7684\u6587\u4EF6\u5927\u5C0F</td></tr></tbody></table><h2 id="upload-\u63D2\u69FD" tabindex="-1">Upload \u63D2\u69FD <a class="header-anchor" href="#upload-\u63D2\u69FD" aria-hidden="true">#</a></h2><table><thead><tr><th>\u63D2\u69FD\u540D\u79F0</th><th>\u8BF4\u660E</th><th>\u53C2\u6570</th></tr></thead><tbody><tr><td>drag</td><td>\u5141\u8BB8\u62D6\u62FD\u4E0A\u4F20\u65F6\uFF0C\u62D6\u62FD\u533A\u57DF\u7684\u663E\u793A\u3002</td><td>-</td></tr><tr><td>button</td><td>\u70B9\u51FB\u4E0A\u4F20\u65F6\uFF0C\u4E0A\u4F20\u6309\u94AE\u7684\u663E\u793A\u5185\u5BB9</td><td>-</td></tr></tbody></table>',6);function $(n,c,p,d,D,i){const s=m("render-demo-0"),C=m("demo"),e=m("render-demo-1"),u=m("render-demo-2");return _(),B("div",null,[g,U,k,V,A(C,{customClass:"undefined",sourceCode:`<template><ClientOnly>\r
  <Upload\r
    v-model="file1"\r
    action="/upload/path"\r
    :resolve-url="resolveLocation"\r
  />\r
</ClientOnly></template>\r
\r
<script setup>\r
import { ref } from 'vue'\r
\r
const file1 = ref('')\r
\r
const resolveLocation = resp => {\r
  return resp.data\r
}\r
<\/script>\r
`},{highlight:y(()=>[L]),default:y(()=>[A(s)]),_:1}),x,O,A(C,{customClass:"undefined",sourceCode:`<template><ClientOnly>\r
  <Upload\r
    v-model="file2s"\r
    :multiple="true"\r
    action="/upload/path"\r
    :resolve-url="resolveLocation"\r
  />\r
</ClientOnly></template>\r
\r
<script setup>\r
import { ref } from 'vue'\r
\r
const file2s = ref('')\r
\r
const resolveLocation = resp => {\r
  return resp.data\r
}\r
<\/script>\r
`},{highlight:y(()=>[P]),default:y(()=>[A(e)]),_:1}),N,w,A(C,{customClass:"undefined",sourceCode:`<template><ClientOnly>\r
  <Upload\r
    v-model="file4s"\r
    :draggable="true"\r
    :multiple="true"\r
    action="/upload/path"\r
    :resolve-url="resolveLocation"\r
  />\r
</ClientOnly></template>\r
\r
<script setup>\r
import { ref } from 'vue'\r
\r
const file4s = ref([])\r
\r
const resolveLocation = resp => {\r
  return resp.data\r
}\r
<\/script>\r
`},{highlight:y(()=>[S]),default:y(()=>[A(u)]),_:1}),j])}const J=h(b,[["render",$]]);export{I as __pageData,J as default};