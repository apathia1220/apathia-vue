import{V as f,_ as m,c as x,a as u,w as y,b as s,d as e,e as g,r as A,o as B}from"./app.fa44e209.js";const{defineComponent:E}=f,b=E({name:"component-doc",components:{"render-demo-0":function(){const{createElementVNode:c,resolveComponent:o,withCtx:l,createVNode:p,openBlock:F,createBlock:D}=f,t=c("span",{style:{background:"#00aeec","font-size":"16px",padding:"10px"}},"Here is the content of the fixed top",-1);function n(d,C){const a=o("Affix"),r=o("ClientOnly");return F(),D(r,null,{default:l(()=>[p(a,null,{default:l(()=>[t]),_:1})]),_:1})}return{render:n,...{}}}(),"render-demo-1":function(){const{createElementVNode:c,resolveComponent:o,withCtx:l,createVNode:p,openBlock:F,createBlock:D}=f,t=c("span",{style:{background:"#00aeec","font-size":"16px",padding:"10px"}},"Fix the position at the top of 50px at the top",-1);function n(d,C){const a=o("Affix"),r=o("ClientOnly");return F(),D(r,null,{default:l(()=>[p(a,{"offset-top":50},{default:l(()=>[t]),_:1})]),_:1})}return{render:n,...{}}}(),"render-demo-2":function(){const{createElementVNode:c,resolveComponent:o,withCtx:l,createVNode:p,openBlock:F,createBlock:D}=f,t=c("span",{style:{background:"#00aeec","font-size":"16px",padding:"10px"}},"Fix the position at the top of 100px at the top",-1);function n(a,r){const _=o("Affix"),h=o("ClientOnly");return F(),D(h,null,{default:l(()=>[p(_,{"offset-top":100,onChange:a.handleChange},{default:l(()=>[t]),_:1},8,["onChange"])]),_:1})}const{getCurrentInstance:i,defineComponent:d}=f,C=d({setup(){const{proxy:a}=i();let r=!1;return{handleChange:h=>{r!==h&&(r=h,console.log(h),a.$toast({type:"info",duration:1e3,message:`Status has changed, current status is ${h}`}))}}}});return{render:n,...C}}(),"render-demo-3":function(){const{createElementVNode:c,resolveComponent:o,withCtx:l,createVNode:p,openBlock:F,createBlock:D}=f,t=c("span",{style:{background:"#00aeec","font-size":"16px",padding:"10px"}},"Here is the content of the fixed bottom",-1);function n(d,C){const a=o("Affix"),r=o("ClientOnly");return F(),D(r,null,{default:l(()=>[p(a,{"offset-bottom":10},{default:l(()=>[t]),_:1})]),_:1})}return{render:n,...{}}}()}}),G=JSON.parse('{"title":"Affix","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u57FA\u7840\u7528\u6CD5","slug":"\u57FA\u7840\u7528\u6CD5","link":"#\u57FA\u7840\u7528\u6CD5","children":[]},{"level":2,"title":"\u504F\u79FB","slug":"\u504F\u79FB","link":"#\u504F\u79FB","children":[]},{"level":2,"title":"\u72B6\u6001\u6539\u53D8\u65F6\u7684\u56DE\u8C03","slug":"\u72B6\u6001\u6539\u53D8\u65F6\u7684\u56DE\u8C03","link":"#\u72B6\u6001\u6539\u53D8\u65F6\u7684\u56DE\u8C03","children":[]},{"level":2,"title":"\u56FA\u5B9A\u5E95\u90E8","slug":"\u56FA\u5B9A\u5E95\u90E8","link":"#\u56FA\u5B9A\u5E95\u90E8","children":[]},{"level":2,"title":"Props","slug":"props","link":"#props","children":[]},{"level":2,"title":"Events","slug":"events","link":"#events","children":[]},{"level":2,"title":"Slots","slug":"slots","link":"#slots","children":[]}],"relativePath":"component/Affix.md"}'),k=s("h1",{id:"affix",tabindex:"-1"},[e("Affix "),s("a",{class:"header-anchor",href:"#affix","aria-hidden":"true"},"#")],-1),v=s("p",null,"\u56FA\u9489",-1),V=s("p",null,"Affix \u7EC4\u4EF6 \u7528\u4E8E\u5C06\u5185\u5BB9\u56FA\u5B9A\u9875\u9762\u7684\u4F4D\u7F6E\uFF0C\u4E0D\u968F\u7740\u9875\u9762\u6EDA\u52A8\u800C\u6539\u53D8\u4F4D\u7F6E",-1),N=s("h2",{id:"\u57FA\u7840\u7528\u6CD5",tabindex:"-1"},[e("\u57FA\u7840\u7528\u6CD5 "),s("a",{class:"header-anchor",href:"#\u57FA\u7840\u7528\u6CD5","aria-hidden":"true"},"#")],-1),O=s("p",null,"\u56FA\u5B9A\u9876\u90E8",-1),z=s("div",{class:"language-vue"},[s("pre",{class:"shiki"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#FFCB6B"}},"Affix"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"span"),s("span",{style:{color:"#89DDFF"}}," "),s("span",{style:{color:"#C792EA"}},"style"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"background: #00aeec; font-size: 16px; padding: 10px"),s("span",{style:{color:"#89DDFF"}},'"')]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"      >"),s("span",{style:{color:"#A6ACCD"}},"Here is the content of the fixed top"),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"span")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"    >")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#FFCB6B"}},"Affix"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"})])])],-1),w=s("h2",{id:"\u504F\u79FB",tabindex:"-1"},[e("\u504F\u79FB "),s("a",{class:"header-anchor",href:"#\u504F\u79FB","aria-hidden":"true"},"#")],-1),$=s("p",null,"\u56FA\u5B9A\u5728\u9876\u90E8\u6307\u5B9A\u4F4D\u7F6E",-1),S=s("div",{class:"language-vue"},[s("pre",{class:"shiki"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#FFCB6B"}},"Affix"),s("span",{style:{color:"#89DDFF"}}," :"),s("span",{style:{color:"#C792EA"}},"offset-top"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#F78C6C"}},"50"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"span"),s("span",{style:{color:"#89DDFF"}}," "),s("span",{style:{color:"#C792EA"}},"style"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"background: #00aeec; font-size: 16px; padding: 10px"),s("span",{style:{color:"#89DDFF"}},'"')]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"      >"),s("span",{style:{color:"#A6ACCD"}},"Fix the position at the top of 50px at the top"),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"span")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"    >")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#FFCB6B"}},"Affix"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"})])])],-1),H=s("h2",{id:"\u72B6\u6001\u6539\u53D8\u65F6\u7684\u56DE\u8C03",tabindex:"-1"},[e("\u72B6\u6001\u6539\u53D8\u65F6\u7684\u56DE\u8C03 "),s("a",{class:"header-anchor",href:"#\u72B6\u6001\u6539\u53D8\u65F6\u7684\u56DE\u8C03","aria-hidden":"true"},"#")],-1),I=s("div",{class:"language-vue"},[s("pre",{class:"shiki"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#FFCB6B"}},"Affix"),s("span",{style:{color:"#89DDFF"}}," :"),s("span",{style:{color:"#C792EA"}},"offset-top"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#F78C6C"}},"100"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}}," @"),s("span",{style:{color:"#C792EA"}},"change"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#A6ACCD"}},"handleChange"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"span"),s("span",{style:{color:"#89DDFF"}}," "),s("span",{style:{color:"#C792EA"}},"style"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"background: #00aeec; font-size: 16px; padding: 10px"),s("span",{style:{color:"#89DDFF"}},'"')]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"      >"),s("span",{style:{color:"#A6ACCD"}},"Fix the position at the top of 100px at the top"),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"span")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"    >")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#FFCB6B"}},"Affix"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"}),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"script"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"import"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"getCurrentInstance"),s("span",{style:{color:"#89DDFF"}},","),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"defineComponent"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"from"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"vue"),s("span",{style:{color:"#89DDFF"}},"'")]),e(`
`),s("span",{class:"line"}),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"export"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"default"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#82AAFF"}},"defineComponent"),s("span",{style:{color:"#A6ACCD"}},"("),s("span",{style:{color:"#89DDFF"}},"{")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#F07178"}},"setup"),s("span",{style:{color:"#89DDFF"}},"()"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#89DDFF"}},"{")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#C792EA"}},"const"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"proxy"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#82AAFF"}},"getCurrentInstance"),s("span",{style:{color:"#F07178"}},"()")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#C792EA"}},"let"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"flag"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#FF9CAC"}},"false")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#C792EA"}},"const"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"handleChange"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"status"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#C792EA"}},"=>"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"{")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"      "),s("span",{style:{color:"#89DDFF"}},"if"),s("span",{style:{color:"#F07178"}}," ("),s("span",{style:{color:"#A6ACCD"}},"flag"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"==="),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"status"),s("span",{style:{color:"#F07178"}},") "),s("span",{style:{color:"#89DDFF"}},"{")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"        "),s("span",{style:{color:"#89DDFF"}},"return")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"      "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"else"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"{")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"        "),s("span",{style:{color:"#A6ACCD"}},"flag"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#A6ACCD"}},"status")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"        "),s("span",{style:{color:"#A6ACCD"}},"console"),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#82AAFF"}},"log"),s("span",{style:{color:"#F07178"}},"("),s("span",{style:{color:"#A6ACCD"}},"status"),s("span",{style:{color:"#F07178"}},")")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"        "),s("span",{style:{color:"#A6ACCD"}},"proxy"),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#82AAFF"}},"$toast"),s("span",{style:{color:"#F07178"}},"("),s("span",{style:{color:"#89DDFF"}},"{")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"          type"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"info"),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#89DDFF"}},",")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"          duration"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#F78C6C"}},"1000"),s("span",{style:{color:"#89DDFF"}},",")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"          message"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"`"),s("span",{style:{color:"#C3E88D"}},"Status has changed, current status is "),s("span",{style:{color:"#89DDFF"}},"${"),s("span",{style:{color:"#A6ACCD"}},"status"),s("span",{style:{color:"#89DDFF"}},"}`"),s("span",{style:{color:"#89DDFF"}},",")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"        "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#F07178"}},")")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"      "),s("span",{style:{color:"#89DDFF"}},"}")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#89DDFF"}},"}")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#89DDFF"}},"return"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"{")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"      "),s("span",{style:{color:"#A6ACCD"}},"handleChange")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"    "),s("span",{style:{color:"#89DDFF"}},"}")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#F07178"}},"  "),s("span",{style:{color:"#89DDFF"}},"}")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#A6ACCD"}},")")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"script"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"})])])],-1),P=s("h2",{id:"\u56FA\u5B9A\u5E95\u90E8",tabindex:"-1"},[e("\u56FA\u5B9A\u5E95\u90E8 "),s("a",{class:"header-anchor",href:"#\u56FA\u5B9A\u5E95\u90E8","aria-hidden":"true"},"#")],-1),J=s("div",{class:"language-vue"},[s("pre",{class:"shiki"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#FFCB6B"}},"Affix"),s("span",{style:{color:"#89DDFF"}}," :"),s("span",{style:{color:"#C792EA"}},"offset-bottom"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#F78C6C"}},"10"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"span"),s("span",{style:{color:"#89DDFF"}}," "),s("span",{style:{color:"#C792EA"}},"style"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"background: #00aeec; font-size: 16px; padding: 10px"),s("span",{style:{color:"#89DDFF"}},'"')]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"      >"),s("span",{style:{color:"#A6ACCD"}},"Here is the content of the fixed bottom"),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"span")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"    >")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  "),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#FFCB6B"}},"Affix"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),e(`
`),s("span",{class:"line"})])])],-1),T=g('<h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-hidden="true">#</a></h2><table><thead><tr><th>\u53C2\u6570</th><th>\u7C7B\u578B</th><th>\u662F\u5426\u5FC5\u4F20</th><th>\u8BF4\u660E</th><th>\u9ED8\u8BA4\u503C</th></tr></thead><tbody><tr><td>offset-top</td><td>number</td><td>\u5426</td><td>\u8DDD\u79BB\u9876\u90E8\u7684\u8DDD\u79BB</td><td>0</td></tr><tr><td>offset-bottom</td><td>number</td><td>\u5426</td><td>\u8DDD\u79BB\u5E95\u90E8\u7684\u8DDD\u79BB</td><td>-</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-hidden="true">#</a></h2><table><thead><tr><th>\u4E8B\u4EF6\u540D\u79F0</th><th>\u8BF4\u660E</th><th>\u56DE\u8C03\u53C2\u6570</th></tr></thead><tbody><tr><td>change</td><td>\u5F53\u56FA\u5B9A\u72B6\u6001\u6539\u53D8\u65F6\u89E6\u53D1</td><td>true/false</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-hidden="true">#</a></h2><table><thead><tr><th>\u63D2\u69FD\u540D\u79F0</th><th>\u8BF4\u660E</th><th>\u53C2\u6570</th></tr></thead><tbody><tr><td>default</td><td>\u663E\u793A\u5185\u5BB9</td><td>-</td></tr></tbody></table>',6);function j(c,o,l,p,F,D){const t=A("render-demo-0"),n=A("demo"),i=A("render-demo-1"),d=A("render-demo-2"),C=A("render-demo-3");return B(),x("div",null,[k,v,V,N,O,u(n,{customClass:"undefined",sourceCode:`<template><ClientOnly>\r
  <Affix>\r
    <span style="background: #00aeec; font-size: 16px; padding: 10px"\r
      >Here is the content of the fixed top</span\r
    >\r
  </Affix>\r
</ClientOnly></template>\r
`},{highlight:y(()=>[z]),default:y(()=>[u(t)]),_:1}),w,$,u(n,{customClass:"undefined",sourceCode:`<template><ClientOnly>\r
  <Affix :offset-top="50">\r
    <span style="background: #00aeec; font-size: 16px; padding: 10px"\r
      >Fix the position at the top of 50px at the top</span\r
    >\r
  </Affix>\r
</ClientOnly></template>\r
`},{highlight:y(()=>[S]),default:y(()=>[u(i)]),_:1}),H,u(n,{customClass:"undefined",sourceCode:`<template><ClientOnly>\r
  <Affix :offset-top="100" @change="handleChange">\r
    <span style="background: #00aeec; font-size: 16px; padding: 10px"\r
      >Fix the position at the top of 100px at the top</span\r
    >\r
  </Affix>\r
</ClientOnly></template>\r
\r
<script>\r
import { getCurrentInstance, defineComponent } from 'vue'\r
\r
export default defineComponent({\r
  setup() {\r
    const { proxy } = getCurrentInstance()\r
    let flag = false\r
    const handleChange = status => {\r
      if (flag === status) {\r
        return\r
      } else {\r
        flag = status\r
        console.log(status)\r
        proxy.$toast({\r
          type: 'info',\r
          duration: 1000,\r
          message: \`Status has changed, current status is \${status}\`,\r
        })\r
      }\r
    }\r
    return {\r
      handleChange\r
    }\r
  }\r
})\r
<\/script>\r
`},{highlight:y(()=>[I]),default:y(()=>[u(d)]),_:1}),P,u(n,{customClass:"undefined",sourceCode:`<template><ClientOnly>\r
  <Affix :offset-bottom="10">\r
    <span style="background: #00aeec; font-size: 16px; padding: 10px"\r
      >Here is the content of the fixed bottom</span\r
    >\r
  </Affix>\r
</ClientOnly></template>\r
`},{highlight:y(()=>[J]),default:y(()=>[u(C)]),_:1}),T])}const K=m(b,[["render",j]]);export{G as __pageData,K as default};
