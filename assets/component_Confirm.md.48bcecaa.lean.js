import{V as y,_ as x,o as v,c as V,a as d,w as m,e as _,b as s,d as o,r as g}from"./app.da716a13.js";const{defineComponent:k}=y,w=k({name:"component-doc",components:{"render-demo-0":function(){const{createTextVNode:n,resolveComponent:e,withCtx:t,createVNode:D,toDisplayString:i,createElementVNode:u,openBlock:c,createBlock:r}=y;function p(a,C){const l=e("BaseButton"),A=e("ClientOnly");return c(),r(A,null,{default:t(()=>[u("div",null,[D(l,{onClick:a.showConfirm},{default:t(()=>[n("\u57FA\u672C\u7528\u6CD5")]),_:1},8,["onClick"]),n(" "+i(a.confirmVal),1)])]),_:1})}const{defineComponent:f,getCurrentInstance:h}=y,B=f({setup(){const{proxy:a}=h(),{confirm:C}=a.useConfirm();function l(){C({title:"\u786E\u8BA4",render:"\u5185\u5BB9",btnPosition:"center"}).then(()=>{console.log("\u786E\u8BA4")}).catch(()=>{console.log("\u53D6\u6D88")})}return{showConfirm:l}}});return{render:p,...B}}(),"render-demo-1":function(){const{createTextVNode:n,resolveComponent:e,withCtx:t,createVNode:D,toDisplayString:i,createElementVNode:u,openBlock:c,createBlock:r}=y;function p(l,A){const F=e("BaseButton"),E=e("ClientOnly");return c(),r(E,null,{default:t(()=>[u("div",null,[D(F,{onClick:l.showConfirm},{default:t(()=>[n("\u81EA\u5B9A\u4E49footer")]),_:1},8,["onClick"]),n(" "+i(l.confirmVal),1)])]),_:1})}const{defineComponent:f,getCurrentInstance:h,h:B,ref:a}=y,C=f({setup(){const{proxy:l}=h(),{confirm:A}=l.useConfirm(),F=a("");function E(){A({title:"\u786E\u8BA4",render:"\u5185\u5BB9",renderFooter:()=>B("div","\u81EA\u5B9A\u4E49footer")}).then(()=>{F.value="\u786E\u8BA4"}).catch(()=>{F.value="\u53D6\u6D88"})}return{confirmVal:F,showConfirm:E}}});return{render:p,...C}}()}}),j=JSON.parse('{"title":"Confirm \u786E\u8BA4\u6846","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u57FA\u7840\u7528\u6CD5","slug":"\u57FA\u7840\u7528\u6CD5","link":"#\u57FA\u7840\u7528\u6CD5","children":[]},{"level":2,"title":"\u81EA\u5B9A\u4E49 footer","slug":"\u81EA\u5B9A\u4E49-footer","link":"#\u81EA\u5B9A\u4E49-footer","children":[]},{"level":2,"title":"Confirm Props","slug":"confirm-props","link":"#confirm-props","children":[]}],"relativePath":"component/Confirm.md"}'),b=_(`<h1 id="confirm-\u786E\u8BA4\u6846" tabindex="-1">Confirm \u786E\u8BA4\u6846 <a class="header-anchor" href="#confirm-\u786E\u8BA4\u6846" aria-hidden="true">#</a></h1><p>\u5728<code>modal</code>\u7684\u57FA\u7840\u4E0A\uFF0C\u5FEB\u901F\u5B9E\u73B0\u786E\u8BA4\u529F\u80FD</p><h2 id="\u57FA\u7840\u7528\u6CD5" tabindex="-1">\u57FA\u7840\u7528\u6CD5 <a class="header-anchor" href="#\u57FA\u7840\u7528\u6CD5" aria-hidden="true">#</a></h2><div class="tip custom-block"><p class="custom-block-title">\u7528\u6CD5</p><p>\u4F7F\u7528\u9700\u8981\u5168\u5C40\u6CE8\u518C\u4F7F\u7528 <code>modalInstall</code> \u65B9\u6CD5</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">modalInstall</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@apathia/apathia</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(modalInstall)</span></span>
<span class="line"></span></code></pre></div><p>\u4F7F\u7528<code>useConfirm</code>\u65B9\u6CD5\u5B9E\u73B0</p></div>`,4),N=s("div",{class:"language-vue"},[s("pre",{class:"shiki"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"div"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#FFCB6B"}},"BaseButton"),s("span",{style:{color:"#89DDFF"}}," @"),s("span",{style:{color:"#C792EA"}},"click"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#A6ACCD"}},"showConfirm"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}},">"),s("span",{style:{color:"#A6ACCD"}},"\u57FA\u672C\u7528\u6CD5"),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#FFCB6B"}},"BaseButton"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    "),s("span",{style:{color:"#89DDFF"}},"{{"),s("span",{style:{color:"#A6ACCD"}},"confirmVal"),s("span",{style:{color:"#89DDFF"}},"}}")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"div"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"}),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"script"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"import"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"defineComponent"),s("span",{style:{color:"#89DDFF"}},","),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"getCurrentInstance"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"from"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"vue"),s("span",{style:{color:"#89DDFF"}},"'")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"export"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"default"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#82AAFF"}},"defineComponent"),s("span",{style:{color:"#A6ACCD"}},"("),s("span",{style:{color:"#89DDFF"}},"{")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#F07178"}},"setup"),s("span",{style:{color:"#89DDFF"}},"()"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"{")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#C792EA"}},"const"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"proxy"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#82AAFF"}},"getCurrentInstance"),s("span",{style:{color:"#F07178"}},"()")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#C792EA"}},"const"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"confirm"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"proxy"),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#82AAFF"}},"useConfirm"),s("span",{style:{color:"#F07178"}},"()")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#C792EA"}},"function"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#82AAFF"}},"showConfirm"),s("span",{style:{color:"#89DDFF"}},"()"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"{")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"      "),s("span",{style:{color:"#82AAFF"}},"confirm"),s("span",{style:{color:"#F07178"}},"("),s("span",{style:{color:"#89DDFF"}},"{")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"        title"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"\u786E\u8BA4"),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#89DDFF"}},",")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"        render"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"\u5185\u5BB9"),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#89DDFF"}},",")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"        btnPosition"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"center"),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#89DDFF"}},",")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"      "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#F07178"}},")")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"        "),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#82AAFF"}},"then"),s("span",{style:{color:"#F07178"}},"("),s("span",{style:{color:"#89DDFF"}},"()"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#C792EA"}},"=>"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"{")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"          "),s("span",{style:{color:"#A6ACCD"}},"console"),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#82AAFF"}},"log"),s("span",{style:{color:"#F07178"}},"("),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"\u786E\u8BA4"),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#F07178"}},")")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"        "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#F07178"}},")")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"        "),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#82AAFF"}},"catch"),s("span",{style:{color:"#F07178"}},"("),s("span",{style:{color:"#89DDFF"}},"()"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#C792EA"}},"=>"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"{")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"          "),s("span",{style:{color:"#A6ACCD"}},"console"),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#82AAFF"}},"log"),s("span",{style:{color:"#F07178"}},"("),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"\u53D6\u6D88"),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#F07178"}},")")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"        "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#F07178"}},")")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#89DDFF"}},"}")]),o(`
`),s("span",{class:"line"}),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#89DDFF"}},"return"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"{")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"      "),s("span",{style:{color:"#A6ACCD"}},"showConfirm"),s("span",{style:{color:"#89DDFF"}},",")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#89DDFF"}},"}")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"  "),s("span",{style:{color:"#89DDFF"}},"},")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#A6ACCD"}},")")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"script"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"})])])],-1),I=s("h2",{id:"\u81EA\u5B9A\u4E49-footer",tabindex:"-1"},[o("\u81EA\u5B9A\u4E49 footer "),s("a",{class:"header-anchor",href:"#\u81EA\u5B9A\u4E49-footer","aria-hidden":"true"},"#")],-1),O=s("p",null,[o("\u53EF\u4EE5\u901A\u8FC7"),s("code",null,"renderFooter"),o("\u7684\u65B9\u5F0F\u6765\u5B9E\u73B0\u81EA\u5B9A\u4E49 footer")],-1),P=s("div",{class:"language-vue"},[s("pre",{class:"shiki"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"div"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#FFCB6B"}},"BaseButton"),s("span",{style:{color:"#89DDFF"}}," @"),s("span",{style:{color:"#C792EA"}},"click"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#A6ACCD"}},"showConfirm"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}},">"),s("span",{style:{color:"#A6ACCD"}},"\u81EA\u5B9A\u4E49footer"),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#FFCB6B"}},"BaseButton"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    "),s("span",{style:{color:"#89DDFF"}},"{{"),s("span",{style:{color:"#A6ACCD"}}," confirmVal "),s("span",{style:{color:"#89DDFF"}},"}}")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"div"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"}),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"script"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"import"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"defineComponent"),s("span",{style:{color:"#89DDFF"}},","),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"getCurrentInstance"),s("span",{style:{color:"#89DDFF"}},","),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"h"),s("span",{style:{color:"#89DDFF"}},","),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"ref"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"from"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"vue"),s("span",{style:{color:"#89DDFF"}},"'")]),o(`
`),s("span",{class:"line"}),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"export"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"default"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#82AAFF"}},"defineComponent"),s("span",{style:{color:"#A6ACCD"}},"("),s("span",{style:{color:"#89DDFF"}},"{")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#F07178"}},"setup"),s("span",{style:{color:"#89DDFF"}},"()"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"{")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#C792EA"}},"const"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"proxy"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#82AAFF"}},"getCurrentInstance"),s("span",{style:{color:"#F07178"}},"()")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#C792EA"}},"const"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"confirm"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"proxy"),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#82AAFF"}},"useConfirm"),s("span",{style:{color:"#F07178"}},"()")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#C792EA"}},"const"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"confirmVal"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#82AAFF"}},"ref"),s("span",{style:{color:"#F07178"}},"("),s("span",{style:{color:"#89DDFF"}},"''"),s("span",{style:{color:"#F07178"}},")")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#C792EA"}},"function"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#82AAFF"}},"showConfirm"),s("span",{style:{color:"#89DDFF"}},"()"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"{")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"      "),s("span",{style:{color:"#82AAFF"}},"confirm"),s("span",{style:{color:"#F07178"}},"("),s("span",{style:{color:"#89DDFF"}},"{")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"        title"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"\u786E\u8BA4"),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#89DDFF"}},",")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"        render"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"\u5185\u5BB9"),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#89DDFF"}},",")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"        "),s("span",{style:{color:"#82AAFF"}},"renderFooter"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"()"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#C792EA"}},"=>"),s("span",{style:{color:"#F07178"}}," ")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"          "),s("span",{style:{color:"#82AAFF"}},"h"),s("span",{style:{color:"#F07178"}},"(")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"            "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"div"),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#89DDFF"}},",")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"            "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"\u81EA\u5B9A\u4E49footer"),s("span",{style:{color:"#89DDFF"}},"'")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"          )")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"      "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#F07178"}},")")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"        "),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#82AAFF"}},"then"),s("span",{style:{color:"#F07178"}},"("),s("span",{style:{color:"#89DDFF"}},"()"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#C792EA"}},"=>"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"{")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"          "),s("span",{style:{color:"#A6ACCD"}},"confirmVal"),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#A6ACCD"}},"value"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"\u786E\u8BA4"),s("span",{style:{color:"#89DDFF"}},"'")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"        "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#F07178"}},")")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"        "),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#82AAFF"}},"catch"),s("span",{style:{color:"#F07178"}},"("),s("span",{style:{color:"#89DDFF"}},"()"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#C792EA"}},"=>"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"{")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"          "),s("span",{style:{color:"#A6ACCD"}},"confirmVal"),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#A6ACCD"}},"value"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"\u53D6\u6D88"),s("span",{style:{color:"#89DDFF"}},"'")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"        "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#F07178"}},")")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#89DDFF"}},"}")]),o(`
`),s("span",{class:"line"}),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#89DDFF"}},"return"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"{")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"      "),s("span",{style:{color:"#A6ACCD"}},"confirmVal"),s("span",{style:{color:"#89DDFF"}},",")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"      "),s("span",{style:{color:"#A6ACCD"}},"showConfirm")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#89DDFF"}},"}")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"  "),s("span",{style:{color:"#89DDFF"}},"}")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#A6ACCD"}},")")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"script"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"})])])],-1),T=_('<h2 id="confirm-props" tabindex="-1">Confirm Props <a class="header-anchor" href="#confirm-props" aria-hidden="true">#</a></h2><table><thead><tr><th>prop</th><th style="text-align:center;">\u8BF4\u660E</th><th style="text-align:right;">\u7C7B\u578B</th><th style="text-align:right;">\u9ED8\u8BA4\u503C</th></tr></thead><tbody><tr><td>title</td><td style="text-align:center;">\u6807\u9898</td><td style="text-align:right;">string</td><td style="text-align:right;">&#39;&#39;</td></tr><tr><td>render</td><td style="text-align:center;">\u5185\u5BB9</td><td style="text-align:right;">string &amp; CustomRender</td><td style="text-align:right;">&#39;&#39;</td></tr><tr><td>confirmText</td><td style="text-align:center;">\u786E\u8BA4\u6309\u94AE</td><td style="text-align:right;">string</td><td style="text-align:right;">\u786E\u8BA4</td></tr><tr><td>cancelText</td><td style="text-align:center;">\u53D6\u6D88\u6309\u94AE</td><td style="text-align:right;">string</td><td style="text-align:right;">\u53D6\u6D88</td></tr><tr><td>btnPosition</td><td style="text-align:center;">\u6309\u94AE\u4F4D\u7F6E</td><td style="text-align:right;">[&#39;left&#39;, &#39;right&#39;, &#39;center&#39;]</td><td style="text-align:right;">right</td></tr><tr><td>renderFooter</td><td style="text-align:center;">\u81EA\u5B9A\u4E49\u5E95\u90E8</td><td style="text-align:right;">CustomRender</td><td style="text-align:right;">() =&gt; {}</td></tr></tbody></table>',2);function S(n,e,t,D,i,u){const c=g("render-demo-0"),r=g("demo"),p=g("render-demo-1");return v(),V("div",null,[b,d(r,{customClass:"undefined",sourceCode:`<template><ClientOnly>\r
  <div>\r
    <BaseButton @click="showConfirm">\u57FA\u672C\u7528\u6CD5</BaseButton>\r
    {{confirmVal}}\r
  </div>\r
</ClientOnly></template>\r
\r
<script>\r
import { defineComponent, getCurrentInstance } from 'vue'\r
export default defineComponent({\r
  setup() {\r
    const { proxy } = getCurrentInstance()\r
    const { confirm } = proxy.useConfirm()\r
    function showConfirm() {\r
      confirm({\r
        title: '\u786E\u8BA4',\r
        render: '\u5185\u5BB9',\r
        btnPosition: 'center',\r
      })\r
        .then(() => {\r
          console.log('\u786E\u8BA4')\r
        })\r
        .catch(() => {\r
          console.log('\u53D6\u6D88')\r
        })\r
    }\r
\r
    return {\r
      showConfirm,\r
    }\r
  },\r
})\r
<\/script>\r
`},{highlight:m(()=>[N]),default:m(()=>[d(c)]),_:1}),I,O,d(r,{customClass:"undefined",sourceCode:`<template><ClientOnly>\r
  <div>\r
    <BaseButton @click="showConfirm">\u81EA\u5B9A\u4E49footer</BaseButton>\r
    {{ confirmVal }}\r
  </div>\r
</ClientOnly></template>\r
\r
<script>\r
import { defineComponent, getCurrentInstance, h, ref } from 'vue'\r
\r
export default defineComponent({\r
  setup() {\r
    const { proxy } = getCurrentInstance()\r
    const { confirm } = proxy.useConfirm()\r
    const confirmVal = ref('')\r
    function showConfirm() {\r
      confirm({\r
        title: '\u786E\u8BA4',\r
        render: '\u5185\u5BB9',\r
        renderFooter: () => \r
          h(\r
            'div',\r
            '\u81EA\u5B9A\u4E49footer'\r
          )\r
      })\r
        .then(() => {\r
          confirmVal.value = '\u786E\u8BA4'\r
        })\r
        .catch(() => {\r
          confirmVal.value = '\u53D6\u6D88'\r
        })\r
    }\r
\r
    return {\r
      confirmVal,\r
      showConfirm\r
    }\r
  }\r
})\r
<\/script>\r
`},{highlight:m(()=>[P]),default:m(()=>[d(p)]),_:1}),T])}const R=x(w,[["render",S]]);export{j as __pageData,R as default};
