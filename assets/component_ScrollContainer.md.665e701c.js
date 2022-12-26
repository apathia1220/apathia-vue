import{V as _,_ as b,c as S,a as d,w as C,b as l,d as o,e as T,r as m,o as V}from"./app.fa44e209.js";const{defineComponent:N}=_,O=N({name:"component-doc",components:{"render-demo-0":function(){const{renderList:D,Fragment:u,openBlock:t,createElementBlock:y,toDisplayString:i,createElementVNode:s,resolveComponent:n,withCtx:e,createVNode:c,createBlock:p}=_,F={style:{height:"200px",width:"400px",border:"1px solid pink"}};function A(f,v){const h=n("ScrollContainer"),a=n("ClientOnly");return t(),p(a,null,{default:e(()=>[s("div",F,[c(h,{size:7},{default:e(()=>[s("ul",null,[(t(),y(u,null,D(20,r=>s("li",{key:r},i(new Array(100).fill("a").join(",")),1)),64))])]),_:1})])]),_:1})}return{render:A,...{}}}(),"render-demo-1":function(){const{renderList:D,Fragment:u,openBlock:t,createElementBlock:y,toDisplayString:i,createElementVNode:s,resolveComponent:n,withCtx:e,createVNode:c,createBlock:p}=_,F={style:{height:"200px",border:"1px solid pink"}};function A(f,v){const h=n("ScrollContainer"),a=n("ClientOnly");return t(),p(a,null,{default:e(()=>[s("div",F,[c(h,{size:7,"auto-hide":""},{default:e(()=>[s("ul",null,[(t(),y(u,null,D(20,r=>s("li",{key:r},i(r),1)),64))])]),_:1})])]),_:1})}return{render:A,...{}}}(),"render-demo-2":function(){const{renderList:D,Fragment:u,openBlock:t,createElementBlock:y,toDisplayString:i,createElementVNode:s,resolveComponent:n,withCtx:e,createVNode:c,createBlock:p}=_,F={style:{height:"200px",border:"1px solid pink"}};function A(f,v){const h=n("ScrollContainer"),a=n("ClientOnly");return t(),p(a,null,{default:e(()=>[s("div",F,[c(h,{size:7,"hide-vertical":""},{default:e(()=>[s("ul",null,[(t(),y(u,null,D(20,r=>s("li",{key:r},i(r),1)),64))])]),_:1})])]),_:1})}return{render:A,...{}}}(),"render-demo-3":function(){const{renderList:D,Fragment:u,openBlock:t,createElementBlock:y,toDisplayString:i,createElementVNode:s,resolveComponent:n,withCtx:e,createVNode:c,createTextVNode:p,createBlock:F}=_,A={style:{height:"200px",border:"1px solid pink"}};function B(a,r){const k=n("ScrollContainer"),x=n("Input"),g=n("ClientOnly");return t(),F(g,null,{default:e(()=>[s("div",A,[c(k,{scrollTop:a.scrollTop,"onUpdate:scrollTop":r[0]||(r[0]=E=>a.scrollTop=E),size:7},{default:e(()=>[s("ul",null,[(t(),y(u,null,D(20,E=>s("li",{key:E},i(E),1)),64))])]),_:1},8,["scrollTop"])]),s("p",null,[p(" scrollTop: "),c(x,{modelValue:a.scrollTop,"onUpdate:modelValue":r[1]||(r[1]=E=>a.scrollTop=E),modelModifiers:{number:!0}},null,8,["modelValue"])])]),_:1})}const{ref:f,defineComponent:v}=_,h=v({setup(){return{scrollTop:f(0)}}});return{render:B,...h}}()}}),X=JSON.parse('{"title":"ScrollContainer","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u57FA\u7840\u7528\u6CD5","slug":"\u57FA\u7840\u7528\u6CD5","link":"#\u57FA\u7840\u7528\u6CD5","children":[]},{"level":2,"title":"\u81EA\u52A8\u9690\u85CF","slug":"\u81EA\u52A8\u9690\u85CF","link":"#\u81EA\u52A8\u9690\u85CF","children":[]},{"level":2,"title":"\u9690\u85CF\u6EDA\u52A8\u6761","slug":"\u9690\u85CF\u6EDA\u52A8\u6761","link":"#\u9690\u85CF\u6EDA\u52A8\u6761","children":[]},{"level":2,"title":"\u63A7\u5236\u6EDA\u52A8\u4F4D\u7F6E","slug":"\u63A7\u5236\u6EDA\u52A8\u4F4D\u7F6E","link":"#\u63A7\u5236\u6EDA\u52A8\u4F4D\u7F6E","children":[]},{"level":2,"title":"props","slug":"props","link":"#props","children":[]},{"level":2,"title":"events","slug":"events","link":"#events","children":[]},{"level":2,"title":"slots","slug":"slots","link":"#slots","children":[]},{"level":2,"title":"\u6CE8\u610F","slug":"\u6CE8\u610F","link":"#\u6CE8\u610F","children":[]}],"relativePath":"component/ScrollContainer.md"}'),w=l("h1",{id:"scrollcontainer",tabindex:"-1"},[o("ScrollContainer "),l("a",{class:"header-anchor",href:"#scrollcontainer","aria-hidden":"true"},"#")],-1),z=l("p",null,"\u6EDA\u52A8\u6761",-1),L=l("p",null,[l("code",null,"ScrollContainer\u7EC4\u4EF6\u5305\u542B\u4E86\u81EA\u5B9A\u4E49\u7684\u6EDA\u52A8\u6761\uFF0C\u53EF\u7528\u4E8E\u5C55\u793A\u53EF\u80FD\u51FA\u73B0\u6EDA\u52A8\u6761\u7684\u5185\u5BB9\u5217\u8868")],-1),I=l("h2",{id:"\u57FA\u7840\u7528\u6CD5",tabindex:"-1"},[o("\u57FA\u7840\u7528\u6CD5 "),l("a",{class:"header-anchor",href:"#\u57FA\u7840\u7528\u6CD5","aria-hidden":"true"},"#")],-1),$=l("div",{class:"language-vue"},[l("pre",{class:"shiki"},[l("code",null,[l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"template"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"  "),l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"div"),l("span",{style:{color:"#89DDFF"}}," "),l("span",{style:{color:"#C792EA"}},"style"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#C3E88D"}},"height: 200px; width: 400px; border: 1px solid pink"),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"    "),l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#FFCB6B"}},"ScrollContainer"),l("span",{style:{color:"#89DDFF"}}," :"),l("span",{style:{color:"#C792EA"}},"size"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#F78C6C"}},"7"),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"      "),l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"ul"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"        "),l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"li"),l("span",{style:{color:"#89DDFF"}}," "),l("span",{style:{color:"#C792EA"}},"v-for"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#A6ACCD"}},"i"),l("span",{style:{color:"#89DDFF"}}," in "),l("span",{style:{color:"#F78C6C"}},"20"),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#89DDFF"}}," :"),l("span",{style:{color:"#C792EA"}},"key"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#A6ACCD"}},"i"),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"          "),l("span",{style:{color:"#89DDFF"}},"{{"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"new"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#82AAFF"}},"Array"),l("span",{style:{color:"#A6ACCD"}},"("),l("span",{style:{color:"#F78C6C"}},"100"),l("span",{style:{color:"#A6ACCD"}},")"),l("span",{style:{color:"#89DDFF"}},"."),l("span",{style:{color:"#82AAFF"}},"fill"),l("span",{style:{color:"#A6ACCD"}},"("),l("span",{style:{color:"#89DDFF"}},"'"),l("span",{style:{color:"#C3E88D"}},"a"),l("span",{style:{color:"#89DDFF"}},"'"),l("span",{style:{color:"#A6ACCD"}},")"),l("span",{style:{color:"#89DDFF"}},"."),l("span",{style:{color:"#82AAFF"}},"join"),l("span",{style:{color:"#A6ACCD"}},"("),l("span",{style:{color:"#89DDFF"}},"'"),l("span",{style:{color:"#C3E88D"}},","),l("span",{style:{color:"#89DDFF"}},"'"),l("span",{style:{color:"#A6ACCD"}},") "),l("span",{style:{color:"#89DDFF"}},"}}")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"        "),l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"li"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"      "),l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"ul"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"    "),l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#FFCB6B"}},"ScrollContainer"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"  "),l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"div"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"template"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"})])])],-1),j=l("h2",{id:"\u81EA\u52A8\u9690\u85CF",tabindex:"-1"},[o("\u81EA\u52A8\u9690\u85CF "),l("a",{class:"header-anchor",href:"#\u81EA\u52A8\u9690\u85CF","aria-hidden":"true"},"#")],-1),H=l("p",null,"\u901A\u8FC7auto-hide\u5C5E\u6027\u53EF\u4EE5\u8BBE\u7F6E\u9F20\u6807\u5728\u7EC4\u4EF6\u5916\u65F6\u81EA\u52A8\u9690\u85CF\u6EDA\u52A8\u6761",-1),U=l("div",{class:"language-vue"},[l("pre",{class:"shiki"},[l("code",null,[l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"template"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"  "),l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"div"),l("span",{style:{color:"#89DDFF"}}," "),l("span",{style:{color:"#C792EA"}},"style"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#C3E88D"}},"height: 200px; border: 1px solid pink"),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"    "),l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#FFCB6B"}},"ScrollContainer"),l("span",{style:{color:"#89DDFF"}}," :"),l("span",{style:{color:"#C792EA"}},"size"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#F78C6C"}},"7"),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#89DDFF"}}," "),l("span",{style:{color:"#C792EA"}},"auto-hide"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"      "),l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"ul"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"        "),l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"li"),l("span",{style:{color:"#89DDFF"}}," "),l("span",{style:{color:"#C792EA"}},"v-for"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#A6ACCD"}},"i"),l("span",{style:{color:"#89DDFF"}}," in "),l("span",{style:{color:"#F78C6C"}},"20"),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#89DDFF"}}," :"),l("span",{style:{color:"#C792EA"}},"key"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#A6ACCD"}},"i"),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"          "),l("span",{style:{color:"#89DDFF"}},"{{"),l("span",{style:{color:"#A6ACCD"}}," i "),l("span",{style:{color:"#89DDFF"}},"}}")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"        "),l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"li"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"      "),l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"ul"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"    "),l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#FFCB6B"}},"ScrollContainer"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"  "),l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"div"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"template"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"})])])],-1),J=l("h2",{id:"\u9690\u85CF\u6EDA\u52A8\u6761",tabindex:"-1"},[o("\u9690\u85CF\u6EDA\u52A8\u6761 "),l("a",{class:"header-anchor",href:"#\u9690\u85CF\u6EDA\u52A8\u6761","aria-hidden":"true"},"#")],-1),M=l("p",null,"\u901A\u8FC7hide-vertical/hide-horizontal\u5C5E\u6027\u53EF\u4EE5\u9690\u85CF\u5782\u76F4/\u6C34\u5E73\u6EDA\u52A8\u6761 \u9690\u85CF\u5782\u76F4\u6EDA\u52A8\u6761\u5982\u4E0B\uFF1A",-1),P=l("div",{class:"language-vue"},[l("pre",{class:"shiki"},[l("code",null,[l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"template"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"  "),l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"div"),l("span",{style:{color:"#89DDFF"}}," "),l("span",{style:{color:"#C792EA"}},"style"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#C3E88D"}},"height: 200px; border: 1px solid pink"),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"    "),l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#FFCB6B"}},"ScrollContainer"),l("span",{style:{color:"#89DDFF"}}," :"),l("span",{style:{color:"#C792EA"}},"size"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#F78C6C"}},"7"),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#89DDFF"}}," "),l("span",{style:{color:"#C792EA"}},"hide-vertical"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"      "),l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"ul"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"        "),l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"li"),l("span",{style:{color:"#89DDFF"}}," "),l("span",{style:{color:"#C792EA"}},"v-for"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#A6ACCD"}},"i"),l("span",{style:{color:"#89DDFF"}}," in "),l("span",{style:{color:"#F78C6C"}},"20"),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#89DDFF"}}," :"),l("span",{style:{color:"#C792EA"}},"key"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#A6ACCD"}},"i"),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"          "),l("span",{style:{color:"#89DDFF"}},"{{"),l("span",{style:{color:"#A6ACCD"}}," i "),l("span",{style:{color:"#89DDFF"}},"}}")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"        "),l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"li"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"      "),l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"ul"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"    "),l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#FFCB6B"}},"ScrollContainer"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"  "),l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"div"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"template"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"})])])],-1),q=l("h2",{id:"\u63A7\u5236\u6EDA\u52A8\u4F4D\u7F6E",tabindex:"-1"},[o("\u63A7\u5236\u6EDA\u52A8\u4F4D\u7F6E "),l("a",{class:"header-anchor",href:"#\u63A7\u5236\u6EDA\u52A8\u4F4D\u7F6E","aria-hidden":"true"},"#")],-1),G=l("p",null,"\u901A\u8FC7scrollTop/scrollLeft\u5C5E\u6027\u53EF\u4EE5\u63A7\u5236\u5782\u76F4/\u6C34\u5E73\u6EDA\u52A8\u6761\u7684\u4F4D\u7F6E",-1),K=l("div",{class:"language-vue"},[l("pre",{class:"shiki"},[l("code",null,[l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"template"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"  "),l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"div"),l("span",{style:{color:"#89DDFF"}}," "),l("span",{style:{color:"#C792EA"}},"style"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#C3E88D"}},"height: 200px; border: 1px solid pink"),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"    "),l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#FFCB6B"}},"ScrollContainer"),l("span",{style:{color:"#89DDFF"}}," "),l("span",{style:{color:"#C792EA"}},"v-model"),l("span",{style:{color:"#89DDFF"}},":"),l("span",{style:{color:"#C792EA"}},"scrollTop"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#A6ACCD"}},"scrollTop"),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#89DDFF"}}," :"),l("span",{style:{color:"#C792EA"}},"size"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#F78C6C"}},"7"),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"      "),l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"ul"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"        "),l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"li"),l("span",{style:{color:"#89DDFF"}}," "),l("span",{style:{color:"#C792EA"}},"v-for"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#A6ACCD"}},"i"),l("span",{style:{color:"#89DDFF"}}," in "),l("span",{style:{color:"#F78C6C"}},"20"),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#89DDFF"}}," :"),l("span",{style:{color:"#C792EA"}},"key"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#A6ACCD"}},"i"),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"          "),l("span",{style:{color:"#89DDFF"}},"{{"),l("span",{style:{color:"#A6ACCD"}}," i "),l("span",{style:{color:"#89DDFF"}},"}}")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"        "),l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"li"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"      "),l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"ul"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"    "),l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#FFCB6B"}},"ScrollContainer"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"  "),l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"div"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"  "),l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"p"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"    scrollTop:")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"    "),l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#FFCB6B"}},"Input"),l("span",{style:{color:"#89DDFF"}}," "),l("span",{style:{color:"#C792EA"}},"v-model"),l("span",{style:{color:"#89DDFF"}},"."),l("span",{style:{color:"#C792EA"}},"number"),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#A6ACCD"}},"scrollTop"),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#89DDFF"}}," />")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"  "),l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"p"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"template"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"}),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"<"),l("span",{style:{color:"#F07178"}},"script"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#C792EA"}},"lang"),l("span",{style:{color:"#A6ACCD"}},"="),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#C3E88D"}},"ts"),l("span",{style:{color:"#89DDFF"}},'"'),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"import"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"{"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#A6ACCD"}},"ref"),l("span",{style:{color:"#89DDFF"}},","),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#A6ACCD"}},"defineComponent"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#89DDFF"}},"}"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"from"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"'"),l("span",{style:{color:"#C3E88D"}},"vue"),l("span",{style:{color:"#89DDFF"}},"'")]),o(`
`),l("span",{class:"line"}),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"export"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"default"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#82AAFF"}},"defineComponent"),l("span",{style:{color:"#A6ACCD"}},"("),l("span",{style:{color:"#89DDFF"}},"{")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#A6ACCD"}},"  "),l("span",{style:{color:"#F07178"}},"setup"),l("span",{style:{color:"#89DDFF"}},"()"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#89DDFF"}},"{")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"    "),l("span",{style:{color:"#C792EA"}},"const"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#A6ACCD"}},"scrollTop"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#89DDFF"}},"="),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#82AAFF"}},"ref"),l("span",{style:{color:"#F07178"}},"("),l("span",{style:{color:"#F78C6C"}},"0"),l("span",{style:{color:"#F07178"}},")")]),o(`
`),l("span",{class:"line"}),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"    "),l("span",{style:{color:"#89DDFF"}},"return"),l("span",{style:{color:"#F07178"}}," "),l("span",{style:{color:"#89DDFF"}},"{")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"      "),l("span",{style:{color:"#A6ACCD"}},"scrollTop"),l("span",{style:{color:"#89DDFF"}},",")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"    "),l("span",{style:{color:"#89DDFF"}},"}")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#F07178"}},"  "),l("span",{style:{color:"#89DDFF"}},"},")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"}"),l("span",{style:{color:"#A6ACCD"}},")")]),o(`
`),l("span",{class:"line"},[l("span",{style:{color:"#89DDFF"}},"</"),l("span",{style:{color:"#F07178"}},"script"),l("span",{style:{color:"#89DDFF"}},">")]),o(`
`),l("span",{class:"line"})])])],-1),Q=T('<h2 id="props" tabindex="-1">props <a class="header-anchor" href="#props" aria-hidden="true">#</a></h2><table><thead><tr><th>\u53C2\u6570</th><th>\u7C7B\u578B</th><th>\u662F\u5426\u5FC5\u4F20</th><th>\u8BF4\u660E</th><th>\u9ED8\u8BA4\u503C</th></tr></thead><tbody><tr><td>size</td><td>number/&#39;thick&#39;/&#39;normal&#39;/&#39;thin&#39;</td><td>\u5426</td><td>\u6EDA\u52A8\u6761\u7684\u5BBD\u5EA6</td><td>&#39;normal&#39;</td></tr><tr><td>tag</td><td>string</td><td>\u5426</td><td>\u6EDA\u52A8\u5BB9\u5668\u4F7F\u7528\u7684\u6807\u7B7E</td><td>&#39;div&#39;</td></tr><tr><td>scrollTop</td><td>number</td><td>\u5426</td><td>\u6EDA\u52A8scrollTop</td><td>0</td></tr><tr><td>scrollLeft</td><td>number</td><td>\u5426</td><td>\u6EDA\u52A8scrollLeft</td><td>0</td></tr><tr><td>autoHide</td><td>boolean</td><td>\u5426</td><td>\u5F53\u9F20\u6807\u5728\u5143\u7D20\u5916\u9762\u7684\u65F6\u5019\uFF0C\u9690\u85CF\u6EDA\u52A8\u6761</td><td>false</td></tr><tr><td>hideVertical</td><td>boolean</td><td>\u5426</td><td>\u662F\u5426\u9690\u85CF\u5782\u76F4\u6EDA\u52A8\u6761</td><td>false</td></tr><tr><td>hideHorizontal</td><td>boolean</td><td>\u5426</td><td>\u662F\u5426\u9690\u85CF\u6C34\u5E73\u6EDA\u52A8\u6761</td><td>false</td></tr></tbody></table><h2 id="events" tabindex="-1">events <a class="header-anchor" href="#events" aria-hidden="true">#</a></h2><table><thead><tr><th>\u4E8B\u4EF6\u540D\u79F0</th><th>\u8BF4\u660E</th><th>\u56DE\u8C03\u53C2\u6570</th></tr></thead><tbody><tr><td>update:scrollTop</td><td>\u5F53\u6EDA\u52A8scrollTop\u6539\u53D8\u65F6\u89E6\u53D1</td><td>\u65B0\u7684scrollTop\u503C</td></tr><tr><td>update:scrollLeft</td><td>\u5F53\u6EDA\u52A8scrollLeft\u6539\u53D8\u65F6\u89E6\u53D1</td><td>\u65B0\u7684scrollLeft\u503C</td></tr></tbody></table><h2 id="slots" tabindex="-1">slots <a class="header-anchor" href="#slots" aria-hidden="true">#</a></h2><table><thead><tr><th>\u63D2\u69FD\u540D\u79F0</th><th>\u8BF4\u660E</th><th>\u53C2\u6570</th></tr></thead><tbody><tr><td>default</td><td>\u663E\u793A\u5185\u5BB9</td><td>-</td></tr></tbody></table><h2 id="\u6CE8\u610F" tabindex="-1">\u6CE8\u610F <a class="header-anchor" href="#\u6CE8\u610F" aria-hidden="true">#</a></h2><p>\u6EDA\u52A8\u6761\u80FD\u591F\u663E\u793A\u7684\u539F\u56E0\u662F\uFF0C\u5BB9\u5668\u7684\u5BBD\u5EA6/\u9AD8\u5EA6\u6BD4\u5185\u5BB9\u7684\u5BBD\u5EA6/\u9AD8\u5EA6 \u5C0F\u3002\u53EA\u6709\u7B26\u5408\u6B64\u6761\u4EF6\uFF0C\u624D\u4F1A\u51FA\u73B0\u6EDA\u52A8\u6761</p>',8);function R(D,u,t,y,i,s){const n=m("render-demo-0"),e=m("demo"),c=m("render-demo-1"),p=m("render-demo-2"),F=m("render-demo-3");return V(),S("div",null,[w,z,L,I,d(e,{customClass:"undefined",sourceCode:`<template><ClientOnly>\r
  <div style="height: 200px; width: 400px; border: 1px solid pink">\r
    <ScrollContainer :size="7">\r
      <ul>\r
        <li v-for="i in 20" :key="i">\r
          {{ new Array(100).fill('a').join(',') }}\r
        </li>\r
      </ul>\r
    </ScrollContainer>\r
  </div>\r
</ClientOnly></template>\r
`},{highlight:C(()=>[$]),default:C(()=>[d(n)]),_:1}),j,H,d(e,{customClass:"undefined",sourceCode:`<template><ClientOnly>\r
  <div style="height: 200px; border: 1px solid pink">\r
    <ScrollContainer :size="7" auto-hide>\r
      <ul>\r
        <li v-for="i in 20" :key="i">\r
          {{ i }}\r
        </li>\r
      </ul>\r
    </ScrollContainer>\r
  </div>\r
</ClientOnly></template>\r
`},{highlight:C(()=>[U]),default:C(()=>[d(c)]),_:1}),J,M,d(e,{customClass:"undefined",sourceCode:`<template><ClientOnly>\r
  <div style="height: 200px; border: 1px solid pink">\r
    <ScrollContainer :size="7" hide-vertical>\r
      <ul>\r
        <li v-for="i in 20" :key="i">\r
          {{ i }}\r
        </li>\r
      </ul>\r
    </ScrollContainer>\r
  </div>\r
</ClientOnly></template>\r
`},{highlight:C(()=>[P]),default:C(()=>[d(p)]),_:1}),q,G,d(e,{customClass:"undefined",sourceCode:`<template><ClientOnly>\r
  <div style="height: 200px; border: 1px solid pink">\r
    <ScrollContainer v-model:scrollTop="scrollTop" :size="7">\r
      <ul>\r
        <li v-for="i in 20" :key="i">\r
          {{ i }}\r
        </li>\r
      </ul>\r
    </ScrollContainer>\r
  </div>\r
  <p>\r
    scrollTop:\r
    <Input v-model.number="scrollTop" />\r
  </p>\r
</ClientOnly></template>\r
\r
<script lang="ts">\r
import { ref, defineComponent } from 'vue'\r
\r
export default defineComponent({\r
  setup() {\r
    const scrollTop = ref(0)\r
\r
    return {\r
      scrollTop,\r
    }\r
  },\r
})\r
<\/script>\r
`},{highlight:C(()=>[K]),default:C(()=>[d(F)]),_:1}),Q])}const Y=b(O,[["render",R]]);export{X as __pageData,Y as default};
