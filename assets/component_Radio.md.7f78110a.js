import{V as C,_ as b,o as g,c as V,a as h,w as E,e as _,b as o,d as l,r as v}from"./app.da716a13.js";const{defineComponent:x}=C,G=x({name:"component-doc",components:{"render-demo-0":function(){const{createTextVNode:p,resolveComponent:e,withCtx:n,createVNode:s,openBlock:a,createBlock:A}=C;function F(d,y){const i=e("Radio"),t=e("RadioGroup"),r=e("ClientOnly");return a(),A(r,null,{default:n(()=>[s(t,{modelValue:d.value,"onUpdate:modelValue":y[0]||(y[0]=u=>d.value=u)},{default:n(()=>[s(i,{value:1},{default:n(()=>[p("\u9009\u98791")]),_:1}),s(i,{value:2},{default:n(()=>[p("\u9009\u98792")]),_:1}),s(i,{value:3},{default:n(()=>[p("\u9009\u98793")]),_:1})]),_:1},8,["modelValue"])]),_:1})}const{defineComponent:c,ref:D}=C,B=c({setup(){return{value:D(1)}}});return{render:F,...B}}(),"render-demo-1":function(){const{createElementVNode:p,createTextVNode:e,resolveComponent:n,withCtx:s,createVNode:a,openBlock:A,createBlock:F}=C,c=p("p",null,"\u5168\u4F53\u7981\u7528",-1),D=p("p",null,"\u5C40\u90E8\u7981\u7528",-1);function B(t,r){const u=n("Radio"),f=n("RadioGroup"),R=n("ClientOnly");return A(),F(R,null,{default:s(()=>[c,a(f,{modelValue:t.value1,"onUpdate:modelValue":r[0]||(r[0]=m=>t.value1=m),disabled:""},{default:s(()=>[a(u,{value:1},{default:s(()=>[e("\u9009\u98791")]),_:1}),a(u,{value:2},{default:s(()=>[e("\u9009\u98792")]),_:1}),a(u,{value:3},{default:s(()=>[e("\u9009\u98793")]),_:1})]),_:1},8,["modelValue"]),D,a(f,{modelValue:t.value2,"onUpdate:modelValue":r[1]||(r[1]=m=>t.value2=m)},{default:s(()=>[a(u,{value:1},{default:s(()=>[e("\u9009\u98791")]),_:1}),a(u,{value:2},{default:s(()=>[e("\u9009\u98792")]),_:1}),a(u,{value:3,disabled:""},{default:s(()=>[e("\u9009\u98793")]),_:1})]),_:1},8,["modelValue"])]),_:1})}const{defineComponent:d,ref:y}=C,i=d({setup(){const t=y(1),r=y(2);return{value1:t,value2:r}}});return{render:B,...i}}()}}),q=JSON.parse('{"title":"Radio \u5355\u9009\u6846","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u57FA\u7840\u7528\u6CD5","slug":"\u57FA\u7840\u7528\u6CD5","link":"#\u57FA\u7840\u7528\u6CD5","children":[]},{"level":2,"title":"\u7981\u7528\u72B6\u6001","slug":"\u7981\u7528\u72B6\u6001","link":"#\u7981\u7528\u72B6\u6001","children":[]},{"level":2,"title":"Radio Props","slug":"radio-props","link":"#radio-props","children":[]},{"level":2,"title":"RadioGroup Props","slug":"radiogroup-props","link":"#radiogroup-props","children":[]},{"level":2,"title":"Radio \u4E8B\u4EF6","slug":"radio-\u4E8B\u4EF6","link":"#radio-\u4E8B\u4EF6","children":[]},{"level":2,"title":"RadioGroup \u4E8B\u4EF6","slug":"radiogroup-\u4E8B\u4EF6","link":"#radiogroup-\u4E8B\u4EF6","children":[]}],"relativePath":"component/Radio.md"}'),k=_('<h1 id="radio-\u5355\u9009\u6846" tabindex="-1">Radio \u5355\u9009\u6846 <a class="header-anchor" href="#radio-\u5355\u9009\u6846" aria-hidden="true">#</a></h1><p>\u5728\u4E00\u7EC4\u5907\u9009\u9879\u4E2D\u8FDB\u884C\u5355\u9009</p><h2 id="\u57FA\u7840\u7528\u6CD5" tabindex="-1">\u57FA\u7840\u7528\u6CD5 <a class="header-anchor" href="#\u57FA\u7840\u7528\u6CD5" aria-hidden="true">#</a></h2><p>\u5355\u9009\u6846\u4E0D\u5E94\u8BE5\u6709\u592A\u591A\u7684\u53EF\u9009\u9879\uFF0C \u5982\u679C\u4F60\u6709\u5F88\u591A\u7684\u53EF\u9009\u9879\u4F60\u5E94\u8BE5\u4F7F\u7528\u9009\u62E9\u6846\u800C\u4E0D\u662F\u5355\u9009\u6846\u3002</p><p>\u8981\u4F7F\u7528<code>Radio</code>\u7EC4\u4EF6\uFF0C\u53EA\u9700\u8981\u8BBE\u7F6E<code>v-model</code>\u7ED1\u5B9A\u53D8\u91CF\uFF0C \u9009\u4E2D\u610F\u5473\u7740\u53D8\u91CF\u7684\u503C\u4E3A\u76F8\u5E94<code>Radio</code> <code>value</code> \u5C5E\u6027\u7684\u503C\uFF0C <code>label</code>\u53EF\u4EE5\u662F<code>String</code>\u3001<code>Number </code>\u6216 <code>Boolean</code>\u3002</p>',5),N=o("div",{class:"language-vue"},[o("pre",{class:"shiki"},[o("code",null,[o("span",{class:"line"},[o("span",{style:{color:"#89DDFF"}},"<"),o("span",{style:{color:"#F07178"}},"template"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#A6ACCD"}},"  "),o("span",{style:{color:"#89DDFF"}},"<"),o("span",{style:{color:"#FFCB6B"}},"RadioGroup"),o("span",{style:{color:"#89DDFF"}}," "),o("span",{style:{color:"#C792EA"}},"v-model"),o("span",{style:{color:"#89DDFF"}},"="),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#A6ACCD"}},"value"),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#A6ACCD"}},"    "),o("span",{style:{color:"#89DDFF"}},"<"),o("span",{style:{color:"#FFCB6B"}},"Radio"),o("span",{style:{color:"#89DDFF"}}," :"),o("span",{style:{color:"#C792EA"}},"value"),o("span",{style:{color:"#89DDFF"}},"="),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#F78C6C"}},"1"),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#89DDFF"}},">"),o("span",{style:{color:"#A6ACCD"}},"\u9009\u98791"),o("span",{style:{color:"#89DDFF"}},"</"),o("span",{style:{color:"#FFCB6B"}},"Radio"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#A6ACCD"}},"    "),o("span",{style:{color:"#89DDFF"}},"<"),o("span",{style:{color:"#FFCB6B"}},"Radio"),o("span",{style:{color:"#89DDFF"}}," :"),o("span",{style:{color:"#C792EA"}},"value"),o("span",{style:{color:"#89DDFF"}},"="),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#F78C6C"}},"2"),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#89DDFF"}},">"),o("span",{style:{color:"#A6ACCD"}},"\u9009\u98792"),o("span",{style:{color:"#89DDFF"}},"</"),o("span",{style:{color:"#FFCB6B"}},"Radio"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#A6ACCD"}},"    "),o("span",{style:{color:"#89DDFF"}},"<"),o("span",{style:{color:"#FFCB6B"}},"Radio"),o("span",{style:{color:"#89DDFF"}}," :"),o("span",{style:{color:"#C792EA"}},"value"),o("span",{style:{color:"#89DDFF"}},"="),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#F78C6C"}},"3"),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#89DDFF"}},">"),o("span",{style:{color:"#A6ACCD"}},"\u9009\u98793"),o("span",{style:{color:"#89DDFF"}},"</"),o("span",{style:{color:"#FFCB6B"}},"Radio"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#A6ACCD"}},"  "),o("span",{style:{color:"#89DDFF"}},"</"),o("span",{style:{color:"#FFCB6B"}},"RadioGroup"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#89DDFF"}},"</"),o("span",{style:{color:"#F07178"}},"template"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"}),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#89DDFF"}},"<"),o("span",{style:{color:"#F07178"}},"script"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#89DDFF"}},"import"),o("span",{style:{color:"#A6ACCD"}}," "),o("span",{style:{color:"#89DDFF"}},"{"),o("span",{style:{color:"#F07178"}}," "),o("span",{style:{color:"#A6ACCD"}},"defineComponent"),o("span",{style:{color:"#89DDFF"}},","),o("span",{style:{color:"#F07178"}}," "),o("span",{style:{color:"#A6ACCD"}},"ref"),o("span",{style:{color:"#F07178"}}," "),o("span",{style:{color:"#89DDFF"}},"}"),o("span",{style:{color:"#A6ACCD"}}," "),o("span",{style:{color:"#89DDFF"}},"from"),o("span",{style:{color:"#A6ACCD"}}," "),o("span",{style:{color:"#89DDFF"}},"'"),o("span",{style:{color:"#C3E88D"}},"vue"),o("span",{style:{color:"#89DDFF"}},"'")]),l(`
`),o("span",{class:"line"}),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#89DDFF"}},"export"),o("span",{style:{color:"#A6ACCD"}}," "),o("span",{style:{color:"#89DDFF"}},"default"),o("span",{style:{color:"#A6ACCD"}}," "),o("span",{style:{color:"#82AAFF"}},"defineComponent"),o("span",{style:{color:"#A6ACCD"}},"("),o("span",{style:{color:"#89DDFF"}},"{")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#A6ACCD"}},"  "),o("span",{style:{color:"#F07178"}},"setup"),o("span",{style:{color:"#89DDFF"}},"()"),o("span",{style:{color:"#A6ACCD"}}," "),o("span",{style:{color:"#89DDFF"}},"{")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#F07178"}},"    "),o("span",{style:{color:"#C792EA"}},"const"),o("span",{style:{color:"#F07178"}}," "),o("span",{style:{color:"#A6ACCD"}},"value"),o("span",{style:{color:"#F07178"}}," "),o("span",{style:{color:"#89DDFF"}},"="),o("span",{style:{color:"#F07178"}}," "),o("span",{style:{color:"#82AAFF"}},"ref"),o("span",{style:{color:"#F07178"}},"("),o("span",{style:{color:"#F78C6C"}},"1"),o("span",{style:{color:"#F07178"}},")")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#F07178"}},"    "),o("span",{style:{color:"#89DDFF"}},"return"),o("span",{style:{color:"#F07178"}}," "),o("span",{style:{color:"#89DDFF"}},"{")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#F07178"}},"      "),o("span",{style:{color:"#A6ACCD"}},"value")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#F07178"}},"    "),o("span",{style:{color:"#89DDFF"}},"}")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#F07178"}},"  "),o("span",{style:{color:"#89DDFF"}},"}")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#89DDFF"}},"}"),o("span",{style:{color:"#A6ACCD"}},")")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#89DDFF"}},"</"),o("span",{style:{color:"#F07178"}},"script"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"})])])],-1),O=o("h2",{id:"\u7981\u7528\u72B6\u6001",tabindex:"-1"},[l("\u7981\u7528\u72B6\u6001 "),o("a",{class:"header-anchor",href:"#\u7981\u7528\u72B6\u6001","aria-hidden":"true"},"#")],-1),w=o("p",null,"disabled \u5C5E\u6027\u53EF\u4EE5\u7528\u6765\u63A7\u5236\u5355\u9009\u6846\u7684\u7981\u7528\u72B6\u6001\u3002",-1),P=o("blockquote",null,[o("p",null,"\u4F60\u53EA\u9700\u8981\u4E3A\u5355\u9009\u6846\u8BBE\u7F6E disabled \u5C5E\u6027\u5C31\u80FD\u63A7\u5236\u5176\u7981\u7528\u72B6\u6001\u3002")],-1),T=o("div",{class:"language-vue"},[o("pre",{class:"shiki"},[o("code",null,[o("span",{class:"line"},[o("span",{style:{color:"#89DDFF"}},"<"),o("span",{style:{color:"#F07178"}},"template"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#A6ACCD"}},"  "),o("span",{style:{color:"#89DDFF"}},"<"),o("span",{style:{color:"#F07178"}},"p"),o("span",{style:{color:"#89DDFF"}},">"),o("span",{style:{color:"#A6ACCD"}},"\u5168\u4F53\u7981\u7528"),o("span",{style:{color:"#89DDFF"}},"</"),o("span",{style:{color:"#F07178"}},"p"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#A6ACCD"}},"  "),o("span",{style:{color:"#89DDFF"}},"<"),o("span",{style:{color:"#FFCB6B"}},"RadioGroup"),o("span",{style:{color:"#89DDFF"}}," "),o("span",{style:{color:"#C792EA"}},"v-model"),o("span",{style:{color:"#89DDFF"}},"="),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#A6ACCD"}},"value1"),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#89DDFF"}}," "),o("span",{style:{color:"#C792EA"}},"disabled"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#A6ACCD"}},"    "),o("span",{style:{color:"#89DDFF"}},"<"),o("span",{style:{color:"#FFCB6B"}},"Radio"),o("span",{style:{color:"#89DDFF"}}," :"),o("span",{style:{color:"#C792EA"}},"value"),o("span",{style:{color:"#89DDFF"}},"="),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#F78C6C"}},"1"),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#89DDFF"}},">"),o("span",{style:{color:"#A6ACCD"}},"\u9009\u98791"),o("span",{style:{color:"#89DDFF"}},"</"),o("span",{style:{color:"#FFCB6B"}},"Radio"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#A6ACCD"}},"    "),o("span",{style:{color:"#89DDFF"}},"<"),o("span",{style:{color:"#FFCB6B"}},"Radio"),o("span",{style:{color:"#89DDFF"}}," :"),o("span",{style:{color:"#C792EA"}},"value"),o("span",{style:{color:"#89DDFF"}},"="),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#F78C6C"}},"2"),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#89DDFF"}},">"),o("span",{style:{color:"#A6ACCD"}},"\u9009\u98792"),o("span",{style:{color:"#89DDFF"}},"</"),o("span",{style:{color:"#FFCB6B"}},"Radio"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#A6ACCD"}},"    "),o("span",{style:{color:"#89DDFF"}},"<"),o("span",{style:{color:"#FFCB6B"}},"Radio"),o("span",{style:{color:"#89DDFF"}}," :"),o("span",{style:{color:"#C792EA"}},"value"),o("span",{style:{color:"#89DDFF"}},"="),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#F78C6C"}},"3"),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#89DDFF"}},">"),o("span",{style:{color:"#A6ACCD"}},"\u9009\u98793"),o("span",{style:{color:"#89DDFF"}},"</"),o("span",{style:{color:"#FFCB6B"}},"Radio"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#A6ACCD"}},"  "),o("span",{style:{color:"#89DDFF"}},"</"),o("span",{style:{color:"#FFCB6B"}},"RadioGroup"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#A6ACCD"}},"  "),o("span",{style:{color:"#89DDFF"}},"<"),o("span",{style:{color:"#F07178"}},"p"),o("span",{style:{color:"#89DDFF"}},">"),o("span",{style:{color:"#A6ACCD"}},"\u5C40\u90E8\u7981\u7528"),o("span",{style:{color:"#89DDFF"}},"</"),o("span",{style:{color:"#F07178"}},"p"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#A6ACCD"}},"  "),o("span",{style:{color:"#89DDFF"}},"<"),o("span",{style:{color:"#FFCB6B"}},"RadioGroup"),o("span",{style:{color:"#89DDFF"}}," "),o("span",{style:{color:"#C792EA"}},"v-model"),o("span",{style:{color:"#89DDFF"}},"="),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#A6ACCD"}},"value2"),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#A6ACCD"}},"    "),o("span",{style:{color:"#89DDFF"}},"<"),o("span",{style:{color:"#FFCB6B"}},"Radio"),o("span",{style:{color:"#89DDFF"}}," :"),o("span",{style:{color:"#C792EA"}},"value"),o("span",{style:{color:"#89DDFF"}},"="),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#F78C6C"}},"1"),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#89DDFF"}},">"),o("span",{style:{color:"#A6ACCD"}},"\u9009\u98791"),o("span",{style:{color:"#89DDFF"}},"</"),o("span",{style:{color:"#FFCB6B"}},"Radio"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#A6ACCD"}},"    "),o("span",{style:{color:"#89DDFF"}},"<"),o("span",{style:{color:"#FFCB6B"}},"Radio"),o("span",{style:{color:"#89DDFF"}}," :"),o("span",{style:{color:"#C792EA"}},"value"),o("span",{style:{color:"#89DDFF"}},"="),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#F78C6C"}},"2"),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#89DDFF"}},">"),o("span",{style:{color:"#A6ACCD"}},"\u9009\u98792"),o("span",{style:{color:"#89DDFF"}},"</"),o("span",{style:{color:"#FFCB6B"}},"Radio"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#A6ACCD"}},"    "),o("span",{style:{color:"#89DDFF"}},"<"),o("span",{style:{color:"#FFCB6B"}},"Radio"),o("span",{style:{color:"#89DDFF"}}," :"),o("span",{style:{color:"#C792EA"}},"value"),o("span",{style:{color:"#89DDFF"}},"="),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#F78C6C"}},"3"),o("span",{style:{color:"#89DDFF"}},'"'),o("span",{style:{color:"#89DDFF"}}," "),o("span",{style:{color:"#C792EA"}},"disabled"),o("span",{style:{color:"#89DDFF"}},">"),o("span",{style:{color:"#A6ACCD"}},"\u9009\u98793"),o("span",{style:{color:"#89DDFF"}},"</"),o("span",{style:{color:"#FFCB6B"}},"Radio"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#A6ACCD"}},"  "),o("span",{style:{color:"#89DDFF"}},"</"),o("span",{style:{color:"#FFCB6B"}},"RadioGroup"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#89DDFF"}},"</"),o("span",{style:{color:"#F07178"}},"template"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"}),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#89DDFF"}},"<"),o("span",{style:{color:"#F07178"}},"script"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#89DDFF"}},"import"),o("span",{style:{color:"#A6ACCD"}}," "),o("span",{style:{color:"#89DDFF"}},"{"),o("span",{style:{color:"#F07178"}}," "),o("span",{style:{color:"#A6ACCD"}},"defineComponent"),o("span",{style:{color:"#89DDFF"}},","),o("span",{style:{color:"#F07178"}}," "),o("span",{style:{color:"#A6ACCD"}},"ref"),o("span",{style:{color:"#F07178"}}," "),o("span",{style:{color:"#89DDFF"}},"}"),o("span",{style:{color:"#A6ACCD"}}," "),o("span",{style:{color:"#89DDFF"}},"from"),o("span",{style:{color:"#A6ACCD"}}," "),o("span",{style:{color:"#89DDFF"}},"'"),o("span",{style:{color:"#C3E88D"}},"vue"),o("span",{style:{color:"#89DDFF"}},"'")]),l(`
`),o("span",{class:"line"}),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#89DDFF"}},"export"),o("span",{style:{color:"#A6ACCD"}}," "),o("span",{style:{color:"#89DDFF"}},"default"),o("span",{style:{color:"#A6ACCD"}}," "),o("span",{style:{color:"#82AAFF"}},"defineComponent"),o("span",{style:{color:"#A6ACCD"}},"("),o("span",{style:{color:"#89DDFF"}},"{")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#A6ACCD"}},"  "),o("span",{style:{color:"#F07178"}},"setup"),o("span",{style:{color:"#89DDFF"}},"()"),o("span",{style:{color:"#A6ACCD"}}," "),o("span",{style:{color:"#89DDFF"}},"{")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#F07178"}},"    "),o("span",{style:{color:"#C792EA"}},"const"),o("span",{style:{color:"#F07178"}}," "),o("span",{style:{color:"#A6ACCD"}},"value1"),o("span",{style:{color:"#F07178"}}," "),o("span",{style:{color:"#89DDFF"}},"="),o("span",{style:{color:"#F07178"}}," "),o("span",{style:{color:"#82AAFF"}},"ref"),o("span",{style:{color:"#F07178"}},"("),o("span",{style:{color:"#F78C6C"}},"1"),o("span",{style:{color:"#F07178"}},")")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#F07178"}},"    "),o("span",{style:{color:"#C792EA"}},"const"),o("span",{style:{color:"#F07178"}}," "),o("span",{style:{color:"#A6ACCD"}},"value2"),o("span",{style:{color:"#F07178"}}," "),o("span",{style:{color:"#89DDFF"}},"="),o("span",{style:{color:"#F07178"}}," "),o("span",{style:{color:"#82AAFF"}},"ref"),o("span",{style:{color:"#F07178"}},"("),o("span",{style:{color:"#F78C6C"}},"2"),o("span",{style:{color:"#F07178"}},")")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#F07178"}},"    ")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#F07178"}},"    "),o("span",{style:{color:"#89DDFF"}},"return"),o("span",{style:{color:"#F07178"}}," "),o("span",{style:{color:"#89DDFF"}},"{")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#F07178"}},"      "),o("span",{style:{color:"#A6ACCD"}},"value1"),o("span",{style:{color:"#89DDFF"}},",")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#F07178"}},"      "),o("span",{style:{color:"#A6ACCD"}},"value2")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#F07178"}},"    "),o("span",{style:{color:"#89DDFF"}},"}")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#F07178"}},"  "),o("span",{style:{color:"#89DDFF"}},"}")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#89DDFF"}},"}"),o("span",{style:{color:"#A6ACCD"}},")")]),l(`
`),o("span",{class:"line"},[o("span",{style:{color:"#89DDFF"}},"</"),o("span",{style:{color:"#F07178"}},"script"),o("span",{style:{color:"#89DDFF"}},">")]),l(`
`),o("span",{class:"line"})])])],-1),$=_('<h2 id="radio-props" tabindex="-1">Radio Props <a class="header-anchor" href="#radio-props" aria-hidden="true">#</a></h2><table><thead><tr><th>\u53C2\u6570</th><th>\u7C7B\u578B</th><th>\u662F\u5426\u5FC5\u4F20</th><th>\u8BF4\u660E</th><th>\u9ED8\u8BA4\u503C</th></tr></thead><tbody><tr><td>modelValue</td><td>string/number/boolean</td><td>\u662F</td><td>\u9009\u4E2D\u7684\u503C</td><td>-</td></tr><tr><td>value</td><td>number/string/boolean</td><td>\u5426</td><td>\u5355\u9009\u6846\u5BF9\u5E94\u7684\u503C</td><td>undefined</td></tr><tr><td>disabled</td><td>boolean</td><td>\u5426</td><td>\u7981\u7528</td><td>false</td></tr></tbody></table><h2 id="radiogroup-props" tabindex="-1">RadioGroup Props <a class="header-anchor" href="#radiogroup-props" aria-hidden="true">#</a></h2><table><thead><tr><th>\u53C2\u6570</th><th>\u7C7B\u578B</th><th>\u662F\u5426\u5FC5\u4F20</th><th>\u8BF4\u660E</th><th>\u9ED8\u8BA4\u503C</th></tr></thead><tbody><tr><td>modelValue</td><td>string/number/boolean</td><td>\u662F</td><td>\u9009\u4E2D\u7684\u503C</td><td>-</td></tr><tr><td>disabled</td><td>boolean</td><td>\u5426</td><td>\u7981\u7528</td><td>false</td></tr></tbody></table><h2 id="radio-\u4E8B\u4EF6" tabindex="-1">Radio \u4E8B\u4EF6 <a class="header-anchor" href="#radio-\u4E8B\u4EF6" aria-hidden="true">#</a></h2><table><thead><tr><th>\u4E8B\u4EF6\u540D\u79F0</th><th>\u8BF4\u660E</th><th>\u53C2\u6570</th></tr></thead><tbody><tr><td>change</td><td>\u5F53\u7ED1\u5B9A\u503C\u53D8\u5316\u65F6\u89E6\u53D1\u7684\u4E8B\u4EF6</td><td>\u6539\u53D8\u540E\u7684\u503C</td></tr></tbody></table><h2 id="radiogroup-\u4E8B\u4EF6" tabindex="-1">RadioGroup \u4E8B\u4EF6 <a class="header-anchor" href="#radiogroup-\u4E8B\u4EF6" aria-hidden="true">#</a></h2><table><thead><tr><th>\u4E8B\u4EF6\u540D\u79F0</th><th>\u8BF4\u660E</th><th>\u53C2\u6570</th></tr></thead><tbody><tr><td>change</td><td>\u5F53\u7ED1\u5B9A\u503C\u53D8\u5316\u65F6\u89E6\u53D1\u7684\u4E8B\u4EF6</td><td>\u6539\u53D8\u540E\u7684\u503C</td></tr></tbody></table>',8);function S(p,e,n,s,a,A){const F=v("render-demo-0"),c=v("demo"),D=v("render-demo-1");return g(),V("div",null,[k,h(c,{customClass:"undefined",sourceCode:`<template><ClientOnly>\r
  <RadioGroup v-model="value">\r
    <Radio :value="1">\u9009\u98791</Radio>\r
    <Radio :value="2">\u9009\u98792</Radio>\r
    <Radio :value="3">\u9009\u98793</Radio>\r
  </RadioGroup>\r
</ClientOnly></template>\r
\r
<script>\r
import { defineComponent, ref } from 'vue'\r
\r
export default defineComponent({\r
  setup() {\r
    const value = ref(1)\r
    return {\r
      value\r
    }\r
  }\r
})\r
<\/script>\r
`},{highlight:E(()=>[N]),default:E(()=>[h(F)]),_:1}),O,w,P,h(c,{customClass:"undefined",sourceCode:`<template><ClientOnly>\r
  <p>\u5168\u4F53\u7981\u7528</p>\r
  <RadioGroup v-model="value1" disabled>\r
    <Radio :value="1">\u9009\u98791</Radio>\r
    <Radio :value="2">\u9009\u98792</Radio>\r
    <Radio :value="3">\u9009\u98793</Radio>\r
  </RadioGroup>\r
  <p>\u5C40\u90E8\u7981\u7528</p>\r
  <RadioGroup v-model="value2">\r
    <Radio :value="1">\u9009\u98791</Radio>\r
    <Radio :value="2">\u9009\u98792</Radio>\r
    <Radio :value="3" disabled>\u9009\u98793</Radio>\r
  </RadioGroup>\r
</ClientOnly></template>\r
\r
<script>\r
import { defineComponent, ref } from 'vue'\r
\r
export default defineComponent({\r
  setup() {\r
    const value1 = ref(1)\r
    const value2 = ref(2)\r
    \r
    return {\r
      value1,\r
      value2\r
    }\r
  }\r
})\r
<\/script>\r
`},{highlight:E(()=>[T]),default:E(()=>[h(D)]),_:1}),$])}const J=b(G,[["render",S]]);export{q as __pageData,J as default};