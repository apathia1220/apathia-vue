import{V as a,_ as h,c as m,a as y,w as i,b as l,d as s,e as f,r as E,o as B}from"./app.fa44e209.js";const{defineComponent:v}=a,_=v({name:"component-doc",components:{"render-demo-0":function(){const{resolveComponent:u,createVNode:r,withCtx:F,openBlock:c,createBlock:p}=a;function d(o,t){const e=u("Upload"),C=u("ClientOnly");return c(),p(C,null,{default:F(()=>[r(e,{modelValue:o.file1,"onUpdate:modelValue":t[0]||(t[0]=A=>o.file1=A),action:"/upload/path","resolve-url":o.resolveLocation},null,8,["modelValue","resolve-url"])]),_:1})}const{ref:n}=a;return{render:d,...{setup(){return{file1:n(""),resolveLocation:e=>e.data}}}}}(),"render-demo-1":function(){const{resolveComponent:u,createVNode:r,withCtx:F,openBlock:c,createBlock:p}=a;function d(o,t){const e=u("Upload"),C=u("ClientOnly");return c(),p(C,null,{default:F(()=>[r(e,{modelValue:o.file2s,"onUpdate:modelValue":t[0]||(t[0]=A=>o.file2s=A),multiple:!0,action:"/upload/path","resolve-url":o.resolveLocation},null,8,["modelValue","resolve-url"])]),_:1})}const{ref:n}=a;return{render:d,...{setup(){return{file2s:n(""),resolveLocation:e=>e.data}}}}}(),"render-demo-2":function(){const{resolveComponent:u,createVNode:r,withCtx:F,openBlock:c,createBlock:p}=a;function d(o,t){const e=u("Upload"),C=u("ClientOnly");return c(),p(C,null,{default:F(()=>[r(e,{modelValue:o.file4s,"onUpdate:modelValue":t[0]||(t[0]=A=>o.file4s=A),draggable:!0,multiple:!0,action:"/upload/path","resolve-url":o.resolveLocation},null,8,["modelValue","resolve-url"])]),_:1})}const{ref:n}=a;return{render:d,...{setup(){return{file4s:n(""),resolveLocation:e=>e.data}}}}}()}}),S=JSON.parse('{"title":"Upload \u4E0A\u4F20","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u57FA\u7840\u7528\u6CD5","slug":"\u57FA\u7840\u7528\u6CD5","link":"#\u57FA\u7840\u7528\u6CD5","children":[]},{"level":2,"title":"\u4E0A\u4F20\u591A\u5F20\u56FE\u7247","slug":"\u4E0A\u4F20\u591A\u5F20\u56FE\u7247","link":"#\u4E0A\u4F20\u591A\u5F20\u56FE\u7247","children":[]},{"level":2,"title":"\u62D6\u62FD\u4E0A\u4F20\u591A\u4E2A\u6587\u4EF6","slug":"\u62D6\u62FD\u4E0A\u4F20\u591A\u4E2A\u6587\u4EF6","link":"#\u62D6\u62FD\u4E0A\u4F20\u591A\u4E2A\u6587\u4EF6","children":[]},{"level":2,"title":"Upload Props","slug":"upload-props","link":"#upload-props","children":[]},{"level":2,"title":"Upload \u4E8B\u4EF6","slug":"upload-\u4E8B\u4EF6","link":"#upload-\u4E8B\u4EF6","children":[]},{"level":2,"title":"Upload \u63D2\u69FD","slug":"upload-\u63D2\u69FD","link":"#upload-\u63D2\u69FD","children":[]}],"relativePath":"component/Upload.md"}'),g=l("h1",{id:"upload-\u4E0A\u4F20",tabindex:"-1"},[s("Upload \u4E0A\u4F20 "),l("a",{class:"header-anchor",href:"#upload-\u4E0A\u4F20","aria-hidden":"true"},"#")],-1),b=l("p",null,"\u901A\u8FC7\u70B9\u51FB\u6216\u8005\u62D6\u62FD\u4E0A\u4F20\u6587\u4EF6",-1),U=l("h2",{id:"\u57FA\u7840\u7528\u6CD5",tabindex:"-1"},[s("\u57FA\u7840\u7528\u6CD5 "),l("a",{class:"header-anchor",href:"#\u57FA\u7840\u7528\u6CD5","aria-hidden":"true"},"#")],-1),L=l("p",null,"\u6307\u5B9A\u4E0A\u4F20\u8DEF\u5F84",-1),k=l("div",{class:"language-vue"},[l("pre",{class:"shiki"},[l("code",null,[l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"template"),l("span",{style:{color:"#89DDFF"}},">")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"  "),l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#FFCB6B"}},"Upload")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"    "),l("span",{style:{color:"#C792EA"}},"v-model"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#A6ACCD"}},"file1"),l("span",{style:{color:"#89DDFF"}},'"')]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"    "),l("span",{style:{color:"#C792EA"}},"action"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#C3E88D"}},"/upload/path"),l("span",{style:{color:"#89DDFF"}},'"')]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"    :"),l("span",{style:{color:"#C792EA"}},"resolve-url"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#A6ACCD"}},"resolveLocation"),l("span",{style:{color:"#89DDFF"}},'"')]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"  />")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"template"),l("span",{style:{color:"#89DDFF"}},">")]),s(`
`),l("span",{class:"line"}),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"script"),l("span",{style:{color:"#89DDFF"}},">")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"import"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"{"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#A6ACCD"}},"ref"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#89DDFF"}},"}"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"from"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"'"),l("span",{style:{color:"#C3E88D"}},"vue"),l("span",{style:{color:"#89DDFF"}},"'")]),s(`
`),l("span",{class:"line"}),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"export"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"default"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"{")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"  "),l("span",{style:{color:"#F07178"}},"setup"),l("span",{style:{color:"#89DDFF"}},"()"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"{")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"    "),l("span",{style:{color:"#C792EA"}},"const"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#A6ACCD"}},"file1"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#82AAFF"}},"ref"),l("span",{style:{color:"#F07178"}},"("),l("span",{style:{color:"#89DDFF"}},"''"),l("span",{style:{color:"#F07178"}},")")]),s(`
`),l("span",{class:"line"}),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"    "),l("span",{style:{color:"#C792EA"}},"const"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#A6ACCD"}},"resolveLocation"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#A6ACCD"}},"resp"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#C792EA"}},"=>"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#89DDFF"}},"{")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"      "),l("span",{style:{color:"#89DDFF"}},"return"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#A6ACCD"}},"resp"),l("span",{style:{color:"#89DDFF"}},"."),l("span",{style:{color:"#A6ACCD"}},"data")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"    "),l("span",{style:{color:"#89DDFF"}},"}")]),s(`
`),l("span",{class:"line"}),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"    "),l("span",{style:{color:"#89DDFF"}},"return"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#89DDFF"}},"{")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"      "),l("span",{style:{color:"#A6ACCD"}},"file1"),l("span",{style:{color:"#89DDFF"}},",")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"      "),l("span",{style:{color:"#A6ACCD"}},"resolveLocation")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"    "),l("span",{style:{color:"#89DDFF"}},"}")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"  "),l("span",{style:{color:"#89DDFF"}},"}")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"}")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"script"),l("span",{style:{color:"#89DDFF"}},">")]),s(`
`),l("span",{class:"line"})])])],-1),x=l("h2",{id:"\u4E0A\u4F20\u591A\u5F20\u56FE\u7247",tabindex:"-1"},[s("\u4E0A\u4F20\u591A\u5F20\u56FE\u7247 "),l("a",{class:"header-anchor",href:"#\u4E0A\u4F20\u591A\u5F20\u56FE\u7247","aria-hidden":"true"},"#")],-1),V=l("p",null,[s("\u901A\u8FC7\u6307\u5B9A "),l("code",null,"multiple"),s(" \u4E3A true \u53EF\u4EE5\u5141\u8BB8\u4E0A\u4F20\u591A\u5F20\u56FE\u7247")],-1),O=l("div",{class:"language-vue"},[l("pre",{class:"shiki"},[l("code",null,[l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"template"),l("span",{style:{color:"#89DDFF"}},">")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"  "),l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#FFCB6B"}},"Upload")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"    "),l("span",{style:{color:"#C792EA"}},"v-model"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#A6ACCD"}},"file2s"),l("span",{style:{color:"#89DDFF"}},'"')]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"    :"),l("span",{style:{color:"#C792EA"}},"multiple"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#FF9CAC"}},"true"),l("span",{style:{color:"#89DDFF"}},'"')]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"    "),l("span",{style:{color:"#C792EA"}},"action"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#C3E88D"}},"/upload/path"),l("span",{style:{color:"#89DDFF"}},'"')]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"    :"),l("span",{style:{color:"#C792EA"}},"resolve-url"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#A6ACCD"}},"resolveLocation"),l("span",{style:{color:"#89DDFF"}},'"')]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"  />")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"template"),l("span",{style:{color:"#89DDFF"}},">")]),s(`
`),l("span",{class:"line"}),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"script"),l("span",{style:{color:"#89DDFF"}},">")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"import"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"{"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#A6ACCD"}},"ref"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#89DDFF"}},"}"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"from"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"'"),l("span",{style:{color:"#C3E88D"}},"vue"),l("span",{style:{color:"#89DDFF"}},"'")]),s(`
`),l("span",{class:"line"}),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"export"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"default"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"{")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"  "),l("span",{style:{color:"#F07178"}},"setup"),l("span",{style:{color:"#89DDFF"}},"()"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"{")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"    "),l("span",{style:{color:"#C792EA"}},"const"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#A6ACCD"}},"file2s"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#82AAFF"}},"ref"),l("span",{style:{color:"#F07178"}},"("),l("span",{style:{color:"#89DDFF"}},"''"),l("span",{style:{color:"#F07178"}},")")]),s(`
`),l("span",{class:"line"}),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"    "),l("span",{style:{color:"#C792EA"}},"const"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#A6ACCD"}},"resolveLocation"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#A6ACCD"}},"resp"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#C792EA"}},"=>"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#89DDFF"}},"{")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"      "),l("span",{style:{color:"#89DDFF"}},"return"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#A6ACCD"}},"resp"),l("span",{style:{color:"#89DDFF"}},"."),l("span",{style:{color:"#A6ACCD"}},"data")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"    "),l("span",{style:{color:"#89DDFF"}},"}")]),s(`
`),l("span",{class:"line"}),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"    "),l("span",{style:{color:"#89DDFF"}},"return"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#89DDFF"}},"{")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"      "),l("span",{style:{color:"#A6ACCD"}},"file2s"),l("span",{style:{color:"#89DDFF"}},",")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"      "),l("span",{style:{color:"#A6ACCD"}},"resolveLocation")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"    "),l("span",{style:{color:"#89DDFF"}},"}")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"  "),l("span",{style:{color:"#89DDFF"}},"}")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"}")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"script"),l("span",{style:{color:"#89DDFF"}},">")]),s(`
`),l("span",{class:"line"})])])],-1),N=l("h2",{id:"\u62D6\u62FD\u4E0A\u4F20\u591A\u4E2A\u6587\u4EF6",tabindex:"-1"},[s("\u62D6\u62FD\u4E0A\u4F20\u591A\u4E2A\u6587\u4EF6 "),l("a",{class:"header-anchor",href:"#\u62D6\u62FD\u4E0A\u4F20\u591A\u4E2A\u6587\u4EF6","aria-hidden":"true"},"#")],-1),w=l("p",null,[s("\u901A\u8FC7\u6307\u5B9A "),l("code",null,"draggable"),s(" \u4E3A true \u53EF\u4EE5\u5141\u8BB8\u62D6\u62FD\u4E0A\u4F20")],-1),P=l("div",{class:"language-vue"},[l("pre",{class:"shiki"},[l("code",null,[l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"template"),l("span",{style:{color:"#89DDFF"}},">")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"  "),l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#FFCB6B"}},"Upload")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"    "),l("span",{style:{color:"#C792EA"}},"v-model"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#A6ACCD"}},"file4s"),l("span",{style:{color:"#89DDFF"}},'"')]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"    :"),l("span",{style:{color:"#C792EA"}},"draggable"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#FF9CAC"}},"true"),l("span",{style:{color:"#89DDFF"}},'"')]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"    :"),l("span",{style:{color:"#C792EA"}},"multiple"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#FF9CAC"}},"true"),l("span",{style:{color:"#89DDFF"}},'"')]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"    "),l("span",{style:{color:"#C792EA"}},"action"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#C3E88D"}},"/upload/path"),l("span",{style:{color:"#89DDFF"}},'"')]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"    :"),l("span",{style:{color:"#C792EA"}},"resolve-url"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#A6ACCD"}},"resolveLocation"),l("span",{style:{color:"#89DDFF"}},'"')]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"  />")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"template"),l("span",{style:{color:"#89DDFF"}},">")]),s(`
`),l("span",{class:"line"}),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"script"),l("span",{style:{color:"#89DDFF"}},">")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"import"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"{"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#A6ACCD"}},"ref"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#89DDFF"}},"}"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"from"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"'"),l("span",{style:{color:"#C3E88D"}},"vue"),l("span",{style:{color:"#89DDFF"}},"'")]),s(`
`),l("span",{class:"line"}),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"export"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"default"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"{")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"  "),l("span",{style:{color:"#F07178"}},"setup"),l("span",{style:{color:"#89DDFF"}},"()"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"{")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"    "),l("span",{style:{color:"#C792EA"}},"const"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#A6ACCD"}},"file4s"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#82AAFF"}},"ref"),l("span",{style:{color:"#F07178"}},"("),l("span",{style:{color:"#89DDFF"}},"''"),l("span",{style:{color:"#F07178"}},")")]),s(`
`),l("span",{class:"line"}),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"    "),l("span",{style:{color:"#C792EA"}},"const"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#A6ACCD"}},"resolveLocation"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#A6ACCD"}},"resp"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#C792EA"}},"=>"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#89DDFF"}},"{")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"      "),l("span",{style:{color:"#89DDFF"}},"return"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#A6ACCD"}},"resp"),l("span",{style:{color:"#89DDFF"}},"."),l("span",{style:{color:"#A6ACCD"}},"data")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"    "),l("span",{style:{color:"#89DDFF"}},"}")]),s(`
`),l("span",{class:"line"}),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"    "),l("span",{style:{color:"#89DDFF"}},"return"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#89DDFF"}},"{")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"      "),l("span",{style:{color:"#A6ACCD"}},"file4s"),l("span",{style:{color:"#89DDFF"}},",")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"      "),l("span",{style:{color:"#A6ACCD"}},"resolveLocation")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"    "),l("span",{style:{color:"#89DDFF"}},"}")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"  "),l("span",{style:{color:"#89DDFF"}},"}")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"}")]),s(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"script"),l("span",{style:{color:"#89DDFF"}},">")]),s(`
`),l("span",{class:"line"})])])],-1),j=f('<h2 id="upload-props" tabindex="-1">Upload Props <a class="header-anchor" href="#upload-props" aria-hidden="true">#</a></h2><table><thead><tr><th>\u53C2\u6570</th><th>\u7C7B\u578B</th><th>\u662F\u5426\u5FC5\u4F20</th><th>\u8BF4\u660E</th><th>\u9ED8\u8BA4\u503C</th></tr></thead><tbody><tr><td>modelValue</td><td>array/string</td><td>\u662F</td><td>\u4E0A\u4F20\u5730\u5740\u7684\u503C\uFF0C\u5982\u679C multiple \u662F true\uFF0C\u5219\u662F\u6570\u7EC4\uFF0C\u5426\u5219\u662F\u5355\u4E2A\u5B57\u7B26\u4E32</td><td>-</td></tr><tr><td>valid</td><td>boolean</td><td>\u5426</td><td>\u4E0A\u4F20\u8D44\u6E90\u662F\u5426\u7B26\u5408\u8981\u6C42</td><td>false</td></tr><tr><td>draggable</td><td>boolean</td><td>\u5426</td><td>\u8BBE\u7F6E\u4E3A true \u5141\u8BB8\u62D6\u62FD\u4E0A\u4F20</td><td>false</td></tr><tr><td>headers</td><td>object</td><td>\u5426</td><td>\u4E0A\u4F20\u65F6\u9700\u8981\u9644\u5E26\u7684 http \u8BF7\u6C42\u5934</td><td>false</td></tr><tr><td>action</td><td>string</td><td>\u662F</td><td>\u4E0A\u4F20\u5730\u5740</td><td>-</td></tr><tr><td>name</td><td>string</td><td>\u5426</td><td>\u4E0A\u4F20\u65F6\u6587\u4EF6\u7684\u540D\u5B57\uFF0CFormData \u7684 key \u952E\u540D</td><td>&#39;file&#39;</td></tr><tr><td>data</td><td>object</td><td>\u5426</td><td>\u4E0A\u4F20\u65F6\u9700\u8981\u989D\u5916\u6DFB\u52A0\u5230 FormData \u7684 k-v \u5BF9</td><td>-</td></tr><tr><td>inputDisabled</td><td>boolean</td><td>\u5426</td><td>input \u8F93\u5165\u6846\u7981\u6B62\u8F93\u5165</td><td>false</td></tr><tr><td>noInput</td><td>boolean</td><td>\u5426</td><td>\u4E0D\u663E\u793A\u8F93\u5165\u6846</td><td>false</td></tr><tr><td>buttonName</td><td>string</td><td>\u5426</td><td>\u4E0A\u4F20\u6309\u94AE\u7684\u540D\u5B57</td><td>&#39;\u4E0A\u4F20&#39;</td></tr><tr><td>withCredentials</td><td>boolean</td><td>\u5426</td><td>http \u8BF7\u6C42\u662F\u5426\u5F00\u53D1 withCredentials\uFF0C\u8DE8\u57DF\u65F6\u8BBE\u7F6E\u4E3A true \u624D\u4F1A\u5E26\u4E0A cookie</td><td>false</td></tr><tr><td>multiple</td><td>boolean</td><td>\u5426</td><td>\u662F\u5426\u652F\u6301\u591A\u6587\u4EF6\u4E0A\u4F20</td><td>false</td></tr><tr><td>limit</td><td>number</td><td>\u5426</td><td>multiple \u4E3A true \u4E8B\uFF0C\u6700\u591A\u652F\u6301\u51E0\u4E2A\u6587\u4EF6</td><td>5</td></tr><tr><td>filesize</td><td>string/number</td><td>\u5426</td><td>\u6587\u4EF6\u6700\u5927\u7684\u5927\u5C0F\uFF0C\u5355\u4F4D\u4E0E File.size \u4E00\u81F4</td><td>-</td></tr><tr><td>accept</td><td>string</td><td>\u5426</td><td>\u53EF\u4E0A\u4F20\u7684\u6587\u4EF6\u7C7B\u578B\uFF0C\u4E0E input \u6807\u7B7E\u7684 accept \u4E00\u81F4</td><td>&#39;image/*&#39;</td></tr><tr><td>disabled</td><td>boolean</td><td>\u5426</td><td>\u7981\u6B62\u4E0A\u4F20\u6587\u4EF6</td><td>false</td></tr><tr><td>onBeforeEachUpload</td><td>function</td><td>\u5426</td><td>\u5728\u6BCF\u4E2A\u6587\u4EF6\u4E0A\u4F20\u524D\u8C03\u7528 \u53C2\u6570\u662F\u9009\u4E2D\u7684 File \u5BF9\u8C61\uFF0C\u901A\u8FC7\u8FD4\u56DE File/Promise&lt;File&gt;\u6765\u7EE7\u7EED\u4E0A\u4F20\uFF0C\u901A\u8FC7\u629B\u51FA\u51FA\u9519\u8BEF\u6765\u963B\u6B62\u4E0A\u4F20</td><td>-</td></tr><tr><td>onBeforeAllUpload</td><td>function</td><td>\u5426</td><td>\u5728\u6BCF\u6B21\u6587\u4EF6\u4E0A\u4F20\u524D\u8C03\u7528 \u53C2\u6570\u662F\u9009\u4E2D\u7684 FileList \u5BF9\u8C61\uFF0C\u901A\u8FC7\u8FD4\u56DE true/Promise&lt;true&gt;\u6765\u7EE7\u7EED\u4E0A\u4F20\uFF0C\u901A\u8FC7\u8FD4\u56DE false/Promise&lt;false&gt;/Promise.reject()\u6765\u963B\u6B62\u4E0A\u4F20</td><td>-</td></tr><tr><td>onAfterEachUpload</td><td>function</td><td>\u5426</td><td>\u5728\u6BCF\u4E2A\u6587\u4EF6\u4E0A\u4F20\u5B8C\u8C03\u7528\uFF0C \u53C2\u6570\u662F\u9009\u4E2D\u7684\u6587\u4EF6\u4E0A\u4F20\u540E\u8FD4\u56DE\u7684 url \u5730\u5740\u548C\u6587\u4EF6\u5BF9\u8C61\uFF0C\u8FD4\u56DE true/Promise&lt;true&gt;\uFF0C\u503C\u4F1A\u88AB\u5F53\u6210\u6709\u6548\u7684\u503C\uFF1B\u8FD4\u56DE false/Promise&lt;false&gt;/Promise.reject()\u6587\u4EF6\u4F1A\u88AB\u4E22\u5F03</td><td>-</td></tr><tr><td>onError</td><td>function</td><td>\u5426</td><td>\u5728\u4E0A\u4F20\u51FA\u9519\u65F6\u8C03\u7528</td><td>-</td></tr><tr><td>resolveUrl</td><td>function</td><td>\u5426</td><td>\u4ECE http \u8BF7\u6C42\uFF08\u5C31\u662F action \u90A3\u4E2A\u5730\u5740\uFF09\u54CD\u5E94\u62FF\u5230\u56FE\u7247\u5730\u5740\uFF0C\u8FD4\u56DE\u4E00\u4E2A\u5B57\u7B26\u4E32\u4F5C\u4E3A\u56FE\u7247\u5730\u5740</td><td>-</td></tr><tr><td>checkUrl</td><td>function</td><td>\u5426</td><td>\u7528\u6765\u68C0\u67E5 url \u662F\u5426\u5408\u6CD5\u7684\u65B9\u6CD5\uFF0C\u56E0\u4E3A\u6709\u65F6\u5019\u7EC4\u4EF6\u662F\u6709\u521D\u59CB\u503C\u7684\uFF0C\u9700\u8981\u8FD9\u4E2A\u65B9\u6CD5\u6765\u68C0\u67E5\u4E00\u4E0B url \u662F\u5426\u7B26\u5408\u8981\u6C42</td><td>-</td></tr></tbody></table><h2 id="upload-\u4E8B\u4EF6" tabindex="-1">Upload \u4E8B\u4EF6 <a class="header-anchor" href="#upload-\u4E8B\u4EF6" aria-hidden="true">#</a></h2><table><thead><tr><th>\u4E8B\u4EF6\u540D\u79F0</th><th>\u8BF4\u660E</th><th>\u56DE\u8C03\u53C2\u6570</th></tr></thead><tbody><tr><td>update:modelValue</td><td>\u6587\u4EF6\u7684\u8DEF\u5F84\u7684\u66F4\u65B0\u64CD\u4F5C</td><td>\u6587\u4EF6\u8DEF\u5F84\u6539\u53D8\u540E\u7684\u503C</td></tr><tr><td>update:valid</td><td>\u66F4\u65B0\u9700\u8981\u4E0A\u4F20\u7684\u6587\u4EF6\u662F\u5426\u6B63\u786E</td><td>modelValue \u6709\u503C\u65F6\uFF0C\u4F1A\u89E6\u53D1\u8BE5\u4E8B\u4EF6\uFF0C\u7ED3\u679C\u662F\u8BE5 url \u662F\u5426\u7B26\u5408\u8981\u6C42\uFF0C\u6BD4\u5982 url \u5BF9\u5E94\u7684\u6587\u4EF6\u5927\u5C0F</td></tr></tbody></table><h2 id="upload-\u63D2\u69FD" tabindex="-1">Upload \u63D2\u69FD <a class="header-anchor" href="#upload-\u63D2\u69FD" aria-hidden="true">#</a></h2><table><thead><tr><th>\u63D2\u69FD\u540D\u79F0</th><th>\u8BF4\u660E</th><th>\u53C2\u6570</th></tr></thead><tbody><tr><td>drag</td><td>\u5141\u8BB8\u62D6\u62FD\u4E0A\u4F20\u65F6\uFF0C\u62D6\u62FD\u533A\u57DF\u7684\u663E\u793A\u3002</td><td>-</td></tr><tr><td>button</td><td>\u70B9\u51FB\u4E0A\u4F20\u65F6\uFF0C\u4E0A\u4F20\u6309\u94AE\u7684\u663E\u793A\u5185\u5BB9</td><td>-</td></tr></tbody></table>',6);function $(u,r,F,c,p,d){const n=E("render-demo-0"),D=E("demo"),o=E("render-demo-1"),t=E("render-demo-2");return B(),m("div",null,[g,b,U,L,y(D,{customClass:"undefined",sourceCode:`<template><ClientOnly>\r
  <Upload\r
    v-model="file1"\r
    action="/upload/path"\r
    :resolve-url="resolveLocation"\r
  />\r
</ClientOnly></template>\r
\r
<script>\r
import { ref } from 'vue'\r
\r
export default {\r
  setup() {\r
    const file1 = ref('')\r
\r
    const resolveLocation = resp => {\r
      return resp.data\r
    }\r
\r
    return {\r
      file1,\r
      resolveLocation\r
    }\r
  }\r
}\r
<\/script>\r
`},{highlight:i(()=>[k]),default:i(()=>[y(n)]),_:1}),x,V,y(D,{customClass:"undefined",sourceCode:`<template><ClientOnly>\r
  <Upload\r
    v-model="file2s"\r
    :multiple="true"\r
    action="/upload/path"\r
    :resolve-url="resolveLocation"\r
  />\r
</ClientOnly></template>\r
\r
<script>\r
import { ref } from 'vue'\r
\r
export default {\r
  setup() {\r
    const file2s = ref('')\r
\r
    const resolveLocation = resp => {\r
      return resp.data\r
    }\r
\r
    return {\r
      file2s,\r
      resolveLocation\r
    }\r
  }\r
}\r
<\/script>\r
`},{highlight:i(()=>[O]),default:i(()=>[y(o)]),_:1}),N,w,y(D,{customClass:"undefined",sourceCode:`<template><ClientOnly>\r
  <Upload\r
    v-model="file4s"\r
    :draggable="true"\r
    :multiple="true"\r
    action="/upload/path"\r
    :resolve-url="resolveLocation"\r
  />\r
</ClientOnly></template>\r
\r
<script>\r
import { ref } from 'vue'\r
\r
export default {\r
  setup() {\r
    const file4s = ref('')\r
\r
    const resolveLocation = resp => {\r
      return resp.data\r
    }\r
\r
    return {\r
      file4s,\r
      resolveLocation\r
    }\r
  }\r
}\r
<\/script>\r
`},{highlight:i(()=>[P]),default:i(()=>[y(t)]),_:1}),j])}const I=h(_,[["render",$]]);export{S as __pageData,I as default};
