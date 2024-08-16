var Re=Object.defineProperty;var ze=(t,e,n)=>e in t?Re(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var fe=(t,e,n)=>ze(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();function x(){}const $e=t=>t;function Ie(t){return t()}function ve(){return Object.create(null)}function B(t){t.forEach(Ie)}function pe(t){return typeof t=="function"}function q(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function Fe(t){return Object.keys(t).length===0}const Oe=typeof window<"u";let He=Oe?()=>window.performance.now():()=>Date.now(),_e=Oe?t=>requestAnimationFrame(t):x;const N=new Set;function Ce(t){N.forEach(e=>{e.c(t)||(N.delete(e),e.f())}),N.size!==0&&_e(Ce)}function Ue(t){let e;return N.size===0&&_e(Ce),{promise:new Promise(n=>{N.add(e={c:t,f:n})}),abort(){N.delete(e)}}}function _(t,e){t.appendChild(e)}function Pe(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Ve(t){const e=w("style");return e.textContent="/* empty */",qe(Pe(t),e),e.sheet}function qe(t,e){return _(t.head||t,e),e.sheet}function S(t,e,n){t.insertBefore(e,n||null)}function E(t){t.parentNode&&t.parentNode.removeChild(t)}function w(t){return document.createElement(t)}function U(t){return document.createTextNode(t)}function $(){return U(" ")}function se(){return U("")}function F(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function h(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function ee(t){return t===""?null:+t}function Ke(t){return Array.from(t.childNodes)}function Ae(t,e){e=""+e,t.data!==e&&(t.data=e)}function Z(t,e){t.value=e??""}function be(t,e,n,o){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,"")}function Me(t,e,{bubbles:n=!1,cancelable:o=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:o})}const te=new Map;let ne=0;function Ge(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Je(t,e){const n={stylesheet:Ve(e),rules:{}};return te.set(t,n),n}function Ye(t,e,n,o,r,i,l,u=0){const s=16.666/o;let c=`{
`;for(let p=0;p<=1;p+=s){const v=e+(n-e)*i(p);c+=p*100+`%{${l(v,1-v)}}
`}const d=c+`100% {${l(n,1-n)}}
}`,a=`__svelte_${Ge(d)}_${u}`,m=Pe(t),{stylesheet:g,rules:y}=te.get(m)||Je(m,t);y[a]||(y[a]=!0,g.insertRule(`@keyframes ${a} ${d}`,g.cssRules.length));const f=t.style.animation||"";return t.style.animation=`${f?`${f}, `:""}${a} ${o}ms linear ${r}ms 1 both`,ne+=1,a}function xe(t,e){const n=(t.style.animation||"").split(", "),o=n.filter(e?i=>i.indexOf(e)<0:i=>i.indexOf("__svelte")===-1),r=n.length-o.length;r&&(t.style.animation=o.join(", "),ne-=r,ne||Qe())}function Qe(){_e(()=>{ne||(te.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&E(e)}),te.clear())})}let V;function H(t){V=t}function ge(){if(!V)throw new Error("Function called outside component initialization");return V}function K(t){ge().$$.on_mount.push(t)}function Xe(t){ge().$$.on_destroy.push(t)}function Ne(){const t=ge();return(e,n,{cancelable:o=!1}={})=>{const r=t.$$.callbacks[e];if(r){const i=Me(e,n,{cancelable:o});return r.slice().forEach(l=>{l.call(t,i)}),!i.defaultPrevented}return!0}}const M=[],oe=[];let j=[];const me=[],Ze=Promise.resolve();let he=!1;function We(){he||(he=!0,Ze.then(je))}function D(t){j.push(t)}function et(t){me.push(t)}const de=new Set;let A=0;function je(){if(A!==0)return;const t=V;do{try{for(;A<M.length;){const e=M[A];A++,H(e),tt(e.$$)}}catch(e){throw M.length=0,A=0,e}for(H(null),M.length=0,A=0;oe.length;)oe.pop()();for(let e=0;e<j.length;e+=1){const n=j[e];de.has(n)||(de.add(n),n())}j.length=0}while(M.length);for(;me.length;)me.pop()();he=!1,de.clear(),H(t)}function tt(t){if(t.fragment!==null){t.update(),B(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(D)}}function nt(t){const e=[],n=[];j.forEach(o=>t.indexOf(o)===-1?e.push(o):n.push(o)),n.forEach(o=>o()),j=e}let z;function ot(){return z||(z=Promise.resolve(),z.then(()=>{z=null})),z}function ke(t,e,n){t.dispatchEvent(Me(`intro${n}`))}const W=new Set;let P;function De(){P={r:0,c:[],p:P}}function Be(){P.r||B(P.c),P=P.p}function T(t,e){t&&t.i&&(W.delete(t),t.i(e))}function C(t,e,n,o){if(t&&t.o){if(W.has(t))return;W.add(t),P.c.push(()=>{W.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}else o&&o()}const rt={duration:0};function Ee(t,e,n){const o={direction:"in"};let r=e(t,n,o),i=!1,l,u,s=0;function c(){l&&xe(t,l)}function d(){const{delay:m=0,duration:g=300,easing:y=$e,tick:f=x,css:p}=r||rt;p&&(l=Ye(t,0,1,g,m,y,p,s++)),f(0,1);const v=He()+m,b=v+g;u&&u.abort(),i=!0,D(()=>ke(t,!0,"start")),u=Ue(I=>{if(i){if(I>=b)return f(1,0),ke(t,!0,"end"),c(),i=!1;if(I>=v){const k=y((I-v)/g);f(k,1-k)}}return i})}let a=!1;return{start(){a||(a=!0,xe(t),pe(r)?(r=r(o),ot().then(d)):d())},invalidate(){a=!1},end(){i&&(c(),i=!1)}}}function it(t,e,n){const o=t.$$.props[e];o!==void 0&&(t.$$.bound[o]=n,n(t.$$.ctx[o]))}function le(t){t&&t.c()}function G(t,e,n){const{fragment:o,after_update:r}=t.$$;o&&o.m(e,n),D(()=>{const i=t.$$.on_mount.map(Ie).filter(pe);t.$$.on_destroy?t.$$.on_destroy.push(...i):B(i),t.$$.on_mount=[]}),r.forEach(D)}function J(t,e){const n=t.$$;n.fragment!==null&&(nt(n.after_update),B(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function st(t,e){t.$$.dirty[0]===-1&&(M.push(t),We(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Y(t,e,n,o,r,i,l=null,u=[-1]){const s=V;H(t);const c=t.$$={fragment:null,ctx:[],props:i,update:x,not_equal:r,bound:ve(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(s?s.$$.context:[])),callbacks:ve(),dirty:u,skip_bound:!1,root:e.target||s.$$.root};l&&l(c.root);let d=!1;if(c.ctx=n?n(t,e.props||{},(a,m,...g)=>{const y=g.length?g[0]:m;return c.ctx&&r(c.ctx[a],c.ctx[a]=y)&&(!c.skip_bound&&c.bound[a]&&c.bound[a](y),d&&st(t,a)),m}):[],c.update(),d=!0,B(c.before_update),c.fragment=o?o(c.ctx):!1,e.target){if(e.hydrate){const a=Ke(e.target);c.fragment&&c.fragment.l(a),a.forEach(E)}else c.fragment&&c.fragment.c();e.intro&&T(t.$$.fragment),G(t,e.target,e.anchor),je()}H(s)}class Q{constructor(){fe(this,"$$");fe(this,"$$set")}$destroy(){J(this,1),this.$destroy=x}$on(e,n){if(!pe(n))return x;const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(n),()=>{const r=o.indexOf(n);r!==-1&&o.splice(r,1)}}$set(e){this.$$set&&!Fe(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const lt="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(lt);const re="https://intervention.jryng.com",ct=`${re}/api/v1`,ie=async(t,e,n=null)=>{let o=null;const r=await fetch(`${ct}/usage/`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_id:t,extension_id:e,...n&&{event_id:n}})}).then(async i=>{if(!i.ok)throw await i.json();return i.json()}).catch(i=>(console.log(i),o=i.detail,null));if(o)throw o;return r},Le=t=>{const e=i=>String(i).padStart(2,"0"),n=Math.floor(t/3600),o=Math.floor(t%3600/60),r=t%60;return n>0?`${e(n)}:${e(o)}:${e(r)}`:`${e(o)}:${e(r)}`},at=async(t,e)=>{const n=window.location.hostname;console.log("startTracker: ",t,e,n),await ie(t,e,n),setInterval(async()=>{await ie(t,e)},5e3)},ut=async(t,e)=>{console.log("key",t),chrome.storage.sync.set({[t]:e})},ft=async t=>new Promise(e=>{chrome.storage.sync.get(t,n=>{e(n[t])})}),dt=async t=>{chrome.storage.sync.remove(t)},O={get:ft,set:ut,remove:dt};function mt(t){let e;return{c(){e=w("div"),h(e,"class","fixed top-0 right-0 left-0 bottom-0 w-full min-h-screen h-screen flex justify-center z-[9999999999] overflow-hidden overscroll-contain pointer-events-none"),be(e,"backdrop-filter","grayscale("+t[0]+")")},m(n,o){S(n,e,o)},p(n,[o]){o&1&&be(e,"backdrop-filter","grayscale("+n[0]+")")},i:x,o:x,d(n){n&&E(e)}}}function ht(t,e,n){let{delta:o=.01}=e,r=0,i=null;return K(()=>{n(0,r=parseFloat(sessionStorage.getItem("grayscale")??"0")||0);const l=s=>{console.log("mousedown",s),n(0,r=Math.min(1,r+o)),console.log("Grayscale",r),sessionStorage.setItem("grayscale",r)},u=s=>{clearTimeout(i),i=setTimeout(function(){n(0,r=Math.min(1,r+o)),sessionStorage.setItem("grayscale",r),console.log("Grayscale",r)},50)};return window.addEventListener("wheel",u),window.addEventListener("mousedown",l),()=>{window.removeEventListener("wheel",u),window.removeEventListener("mousedown",l)}}),t.$$set=l=>{"delta"in l&&n(1,o=l.delta)},[r,o]}class pt extends Q{constructor(e){super(),Y(this,e,ht,mt,q,{delta:1})}}function _t(t){const e=t-1;return e*e*e+1}function gt(t,{delay:e=0,duration:n=400,easing:o=$e}={}){const r=+getComputedStyle(t).opacity;return{delay:e,duration:n,easing:o,css:i=>`opacity: ${i*r}`}}const yt={y:-8,start:.95,duration:200},wt=(t,e)=>{const n=getComputedStyle(t),o=n.transform==="none"?"":n.transform,r={...yt,...e},i=(u,s,c)=>{const[d,a]=s,[m,g]=c;return(u-d)/(a-d)*(g-m)+m},l=u=>Object.keys(u).reduce((s,c)=>u[c]===void 0?s:s+`${c}:${u[c]};`,"");return{duration:r.duration??200,delay:0,css:u=>{const s=i(u,[0,1],[r.y,0]),c=i(u,[0,1],[r.start,1]);return l({transform:`${o} translate3d(0, ${s}px, 0) scale(${c})`,opacity:u})},easing:_t}};function Se(t){let e,n,o,r,i,l,u,s,c,d,a,m,g,y,f,p,v,b,I,k,ye,X,ce,ae,ue,we;return{c(){e=w("div"),n=w("div"),o=w("div"),r=w("div"),i=w("div"),i.textContent="Timer",l=$(),u=w("button"),s=U(t[1]),c=$(),d=w("div"),a=w("div"),a.textContent="Set a duration for the timer",m=$(),g=w("div"),y=w("div"),f=w("input"),p=$(),v=w("div"),v.textContent="hours",b=$(),I=w("div"),k=w("input"),ye=$(),X=w("div"),X.textContent="min",h(i,"class","timer-modal-title self-center"),h(u,"class","timer-set-button"),h(u,"type","button"),h(r,"class","flex justify-between items-center"),h(a,"class","text-sm text-gray-500"),h(f,"placeholder","0"),h(f,"class","timer-input"),h(f,"type","number"),h(f,"min","0"),h(f,"max","23"),h(f,"step","1"),f.required=!0,h(v,"class","translate-y-1 text-gray-500 text-sm"),h(y,"class","flex items-center gap-2 w-full"),h(k,"placeholder","0"),h(k,"class","timer-input"),h(k,"type","number"),h(k,"min","0"),h(k,"max","59"),h(k,"step","1"),k.required=!0,h(X,"class","translate-y-1 text-gray-500 text-sm"),h(I,"class","flex items-center gap-2 w-full"),h(g,"class","timer-input-container"),h(o,"class","px-[1.75rem] py-6"),h(n,"class","overlay-modal-container"),h(e,"class","overlay-modal")},m(L,R){S(L,e,R),_(e,n),_(n,o),_(o,r),_(r,i),_(r,l),_(r,u),_(u,s),_(o,c),_(o,d),_(d,a),_(d,m),_(d,g),_(g,y),_(y,f),Z(f,t[3]),_(y,p),_(y,v),_(g,b),_(g,I),_(I,k),Z(k,t[4]),_(I,ye),_(I,X),t[14](e),ue||(we=[F(u,"click",t[11]),F(f,"input",t[12]),F(k,"input",t[13]),F(n,"mousedown",bt)],ue=!0)},p(L,R){R&2&&Ae(s,L[1]),R&8&&ee(f.value)!==L[3]&&Z(f,L[3]),R&16&&ee(k.value)!==L[4]&&Z(k,L[4])},i(L){L&&(ce||D(()=>{ce=Ee(n,wt,{}),ce.start()})),L&&(ae||D(()=>{ae=Ee(e,gt,{duration:10}),ae.start()}))},o:x,d(L){L&&E(e),t[14](null),ue=!1,B(we)}}}function vt(t){let e,n=t[0]&&Se(t);return{c(){n&&n.c(),e=se()},m(o,r){n&&n.m(o,r),S(o,e,r)},p(o,[r]){o[0]?n?(n.p(o,r),r&1&&T(n,1)):(n=Se(o),n.c(),T(n,1),n.m(e.parentNode,e)):n&&(n.d(1),n=null)},i(o){T(n)},o:x,d(o){o&&E(e),n&&n.d(o)}}}const bt=t=>{t.stopPropagation()};function xt(t,e,n){const o=Ne();let{message:r=""}=e,{cancelLabel:i="Cancel"}=e,{confirmLabel:l="Set"}=e,{input:u=!1}=e,{inputPlaceholder:s=""}=e,{show:c=!1}=e,d=null,a=!1,m="0",g="20";K(()=>{n(10,a=!0)});const y=()=>{n(0,c=!1);const b=parseInt(m)*60+parseInt(g);o("confirm",b)};function f(){m=ee(this.value),n(3,m)}function p(){g=ee(this.value),n(4,g)}function v(b){oe[b?"unshift":"push"](()=>{d=b,n(2,d)})}return t.$$set=b=>{"message"in b&&n(6,r=b.message),"cancelLabel"in b&&n(7,i=b.cancelLabel),"confirmLabel"in b&&n(1,l=b.confirmLabel),"input"in b&&n(8,u=b.input),"inputPlaceholder"in b&&n(9,s=b.inputPlaceholder),"show"in b&&n(0,c=b.show)},t.$$.update=()=>{t.$$.dirty&1025&&a&&(c?document.body.style.overflow="hidden":document.body.style.overflow="unset")},[c,l,d,m,g,o,r,i,u,s,a,y,f,p,v]}class kt extends Q{constructor(e){super(),Y(this,e,xt,vt,q,{message:6,cancelLabel:7,confirmLabel:1,input:8,inputPlaceholder:9,show:0})}}function Te(t){let e,n,o,r,i,l,u,s,c,d,a,m,g;return{c(){e=w("div"),n=w("div"),o=w("div"),r=w("div"),r.innerHTML='<svg class="size-10 text-gray-800 font-medium" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"></path></svg>',i=$(),l=w("div"),l.textContent="Time Limit",u=$(),s=w("div"),s.textContent="You've reached your limit on this page.",c=$(),d=w("div"),a=w("button"),a.textContent="Ignore Timer",h(r,"class","text-center"),h(l,"class","text-3xl font-medium"),h(s,"class","mt-2"),h(a,"class","timer-ignore-button"),h(d,"class","mt-2"),h(o,"class","my-auto text-center"),h(n,"class","flex"),h(e,"class","full-screen-overlay")},m(y,f){S(y,e,f),_(e,n),_(n,o),_(o,r),_(o,i),_(o,l),_(o,u),_(o,s),_(o,c),_(o,d),_(d,a),m||(g=F(a,"click",t[7]),m=!0)},p:x,d(y){y&&E(e),m=!1,g()}}}function Et(t){let e,n,o,r,i=Le(t[0])+"",l,u,s,c,d,a,m;function g(p){t[5](p)}let y={};t[1]!==void 0&&(y.show=t[1]),s=new kt({props:y}),oe.push(()=>it(s,"show",g)),s.$on("confirm",t[6]);let f=t[2]&&Te(t);return{c(){e=w("div"),n=w("div"),o=w("div"),r=U("Time remaining: "),l=U(i),u=$(),le(s.$$.fragment),d=$(),f&&f.c(),a=se(),h(o,"class","timer-display"),h(n,"class","timer-display-container"),h(e,"class","overlay")},m(p,v){S(p,e,v),_(e,n),_(n,o),_(o,r),_(o,l),S(p,u,v),G(s,p,v),S(p,d,v),f&&f.m(p,v),S(p,a,v),m=!0},p(p,[v]){(!m||v&1)&&i!==(i=Le(p[0])+"")&&Ae(l,i);const b={};!c&&v&2&&(c=!0,b.show=p[1],et(()=>c=!1)),s.$set(b),p[2]?f?f.p(p,v):(f=Te(p),f.c(),f.m(a.parentNode,a)):f&&(f.d(1),f=null)},i(p){m||(T(s.$$.fragment,p),m=!0)},o(p){C(s.$$.fragment,p),m=!1},d(p){p&&(E(e),E(u),E(d),E(a)),J(s,p),f&&f.d(p)}}}function Lt(t,e,n){const o=Ne();let r=0,i=null,l=0,u=!1,s=!1;const c=()=>{i&&clearInterval(i),n(0,l=r),i=setInterval(()=>{l>0?(n(0,l--,l),sessionStorage.timer_duration=l):(clearInterval(i),o("done"),n(2,s=!0),sessionStorage.timer_duration=0,r=0)},1e3)};K(()=>{sessionStorage.timer_duration&&parseInt(sessionStorage.timer_duration)>0?(r=parseInt(sessionStorage.timer_duration),c()):parseInt(sessionStorage.timer_duration)===0?n(2,s=!0):n(1,u=!0)});const d=f=>{n(1,u=!1),r=parseInt(f*60),c()},a=()=>{o("ignore"),sessionStorage.removeItem("timer_duration"),n(2,s=!1),n(1,u=!0)};function m(f){u=f,n(1,u)}return[l,u,s,d,a,m,f=>{d(f.detail)},()=>{a()}]}class St extends Q{constructor(e){super(),Y(this,e,Lt,Et,q,{})}}function Tt(t){const e=o=>{switch(o.key){case"ArrowUp":console.log("ArrowUp"),window.scrollBy(0,-20);break;case"ArrowDown":console.log("ArrowDown"),window.scrollBy(0,20);break}},n=o=>{o.preventDefault()};return K(()=>{window.addEventListener("wheel",n,{passive:!1}),window.addEventListener("touchmove",n,{passive:!1}),window.addEventListener("keydown",e)}),Xe(()=>{window.removeEventListener("wheel",n),window.removeEventListener("touchmove",n),window.removeEventListener("keydown",e)}),[]}class $t extends Q{constructor(e){super(),Y(this,e,Tt,null,q,{})}}function It(t){let e;return{c(){e=w("div"),e.innerHTML='<div class="m-auto rounded-2xl w-[36rem] max-w-full mx-2 bg-white shadow-2xl max-h-[100dvh] overflow-y-auto"><div class="flex flex-col p-4 text-center">Loading...</div></div>',h(e,"class","modal fixed top-0 right-0 left-0 bottom-0 bg-black/60 w-full min-h-screen h-screen flex justify-center z-[9999] overflow-hidden overscroll-contain")},m(n,o){S(n,e,o)},p:x,i:x,o:x,d(n){n&&E(e)}}}function Ot(t){let e;return{c(){e=w("div"),e.innerHTML=`<div class="m-auto rounded-2xl w-[36rem] max-w-full mx-2 bg-white shadow-2xl max-h-[100dvh] overflow-y-auto"><div class="flex flex-col p-4 mb-4"><div class="w-full flex items-center gap-3"><div class="flex justify-center"><img src="${re}/logo.png" alt="logo" class="size-12 rounded-full"/></div> <div class="text-xl text-gray-600 font-semibold"></div></div> <div class="flex flex-col"><iframe src="${re}/survey" style="border-style: none;width: 100%; height: 30rem; overflow: hidden;"></iframe></div></div></div>`,h(e,"class","modal fixed top-0 right-0 left-0 bottom-0 bg-black/60 w-full min-h-screen h-screen flex justify-center z-[9999] overflow-hidden overscroll-contain")},m(n,o){S(n,e,o)},p:x,i:x,o:x,d(n){n&&E(e)}}}function Ct(t){let e,n,o,r;const i=[Mt,At,Pt],l=[];function u(s,c){return s[1]==="timer"?0:s[1]==="gray"?1:s[1]==="tap"?2:-1}return~(e=u(t))&&(n=l[e]=i[e](t)),{c(){n&&n.c(),o=se()},m(s,c){~e&&l[e].m(s,c),S(s,o,c),r=!0},p(s,c){let d=e;e=u(s),e===d?~e&&l[e].p(s,c):(n&&(De(),C(l[d],1,1,()=>{l[d]=null}),Be()),~e?(n=l[e],n?n.p(s,c):(n=l[e]=i[e](s),n.c()),T(n,1),n.m(o.parentNode,o)):n=null)},i(s){r||(T(n),r=!0)},o(s){C(n),r=!1},d(s){s&&E(o),~e&&l[e].d(s)}}}function Pt(t){let e,n;return e=new $t({}),{c(){le(e.$$.fragment)},m(o,r){G(e,o,r),n=!0},p:x,i(o){n||(T(e.$$.fragment,o),n=!0)},o(o){C(e.$$.fragment,o),n=!1},d(o){J(e,o)}}}function At(t){let e,n;return e=new pt({}),{c(){le(e.$$.fragment)},m(o,r){G(e,o,r),n=!0},p:x,i(o){n||(T(e.$$.fragment,o),n=!0)},o(o){C(e.$$.fragment,o),n=!1},d(o){J(e,o)}}}function Mt(t){let e,n;return e=new St({}),e.$on("done",t[3]),e.$on("ignore",t[4]),{c(){le(e.$$.fragment)},m(o,r){G(e,o,r),n=!0},p:x,i(o){n||(T(e.$$.fragment,o),n=!0)},o(o){C(e.$$.fragment,o),n=!1},d(o){J(e,o)}}}function Nt(t){let e,n,o,r;const i=[Ct,Ot,It],l=[];function u(s,c){return s[1]?0:s[0]===""?1:2}return e=u(t),n=l[e]=i[e](t),{c(){n.c(),o=se()},m(s,c){l[e].m(s,c),S(s,o,c),r=!0},p(s,[c]){let d=e;e=u(s),e===d?l[e].p(s,c):(De(),C(l[d],1,1,()=>{l[d]=null}),Be(),n=l[e],n?n.p(s,c):(n=l[e]=i[e](s),n.c()),T(n,1),n.m(o.parentNode,o))},i(s){r||(T(n),r=!0)},o(s){C(n),r=!1},d(s){s&&E(o),l[e].d(s)}}}function jt(t,e,n){const o=["timer","gray","tap"];let r=null,i=null,l=null;K(async()=>{console.log(!1),window.addEventListener("message",async a=>{if(console.log("message",a.data),a.origin!==re){console.log("Ignored message from untrusted origin:",a.origin);return}const m=JSON.parse(a.data);m!=null&&m.user_id&&(await O.set("user_id",m==null?void 0:m.user_id),await O.set("installation_timestamp",Math.round(Date.now()/1e3)),n(0,r=m.user_id),n(2,l=Math.round(Date.now()/1e3)))}),n(0,r=await O.get("user_id")??""),n(2,l=await O.get("installation_timestamp")??""),l&&n(2,l=parseInt(l)),console.log(r),window.addEventListener("keydown",a=>{a.ctrlKey&&a.shiftKey&&a.key==="Q"&&(O.remove("user_id"),O.remove("installation_timestamp"),O.remove("activated"),n(0,r=""),n(2,l=null),n(1,i=null))})});const u=60*60*24,s=async(a,m)=>{console.log(a,m);const g=Math.round(Date.now()/1e3);a=parseInt(a);const y=a%3,f=(a+(y===0?0:y===1?2:1))/3;if(console.log("extensionIdx",y),console.log("user_idx_in_group",f),f%2===0&&g<m+u*7||f%2===1&&g>m+u*7){console.log("The intervention is currently active"),n(1,i=o[y]);const p=await O.get("activated");if(console.log(p),p)console.log("The intervention is currently active");else{O.set("activated",!0);let v="The intervention is currently active";i==="timer"?v="From now on, every time you access Social Media websites, you will be prompted to set a time limit for yourself. The remaining time is visible on the bottom right-hand corner of the screen. Once your time is up, you will be prompted to close the app, but you may alternatively set an additional time limit for yourself and continue using them.":i==="gray"?v="From this moment on, with each interaction with the website, your screen will slowly turn grayscale. This visual cue is designed to raise awareness of your screen time and promote a healthier relationship with the website.":i==="tap"&&(v="From now on, traditional scrolling methods will be disabled, and you can now navigate through the website by using the arrow up/down keys. This is designed to make you more aware of your interactions with the website and promote a healthier relationship with it."),alert(v)}}else n(1,i="none");at(a,i)},c=()=>{ie(r,i,"done")},d=()=>{ie(r,i,"ignore")};return t.$$.update=()=>{t.$$.dirty&5&&r!==null&&r!==""&&l!==null&&l!==""&&s(r,l)},[r,i,l,c,d]}class Dt extends Q{constructor(e){super(),Y(this,e,jt,Nt,q,{})}}new Dt({target:document.getElementById("extension-app")});
