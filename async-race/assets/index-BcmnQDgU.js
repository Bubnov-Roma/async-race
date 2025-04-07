var M=Object.defineProperty;var I=(t,e,s)=>e in t?M(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var g=(t,e,s)=>I(t,typeof e!="symbol"?e+"":e,s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function s(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=s(a);fetch(a.href,o)}})();const j="http://127.0.0.1:3000";let _=0;const A=async t=>{try{const s=await fetch(`${j}/garage?_page=${t}&_limit=7`,{method:"GET"}),n=await s.json();return _=Number(s.headers.get("X-Total-count")),n}catch(s){console.error(s)}},P=t=>`<svg  width="5vw" height="4vw" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 17.485 10.5" xml:space="preserve" style="fill:${t};" stroke="white" stroke-width="2%"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path style="fill:#${t};" d="M17.477,8.149c-0.079-0.739-3.976-0.581-3.976-0.581L11.853,5.23H4.275L3.168,7.567H0v2.404 l2.029,0.682c0.123-0.836,0.843-1.48,1.711-1.48c0.939,0,1.704,0.751,1.73,1.685l6.62,0.041c0.004-0.951,0.779-1.726,1.733-1.726 c0.854,0,1.563,0.623,1.704,1.439l1.479-0.17C17.006,10.442,17.556,8.887,17.477,8.149z M4.007,7.568l0.746-1.771h2.864 l0.471,1.771H4.007z M8.484,7.568L8.01,5.797h3.67l1.137,1.771H8.484z"></path> <circle style="fill:#${t};" cx="3.759" cy="10.966" r="1.289"></circle> <circle style="fill:#${t};" cx="13.827" cy="10.9" r="1.29"></circle> </g> </g> </g></svg>`,G="_car_qgj5v_1",O="_stop_qgj5v_6",F="_options_qgj5v_10",U="_control_qgj5v_11",k="_select_qgj5v_17",V="_remove_qgj5v_18",W="_start_qgj5v_19",z="_title_qgj5v_27",X="_img_qgj5v_32",c={car:G,stop:O,options:F,control:U,select:k,remove:V,start:W,title:z,img:X},D=(t,e,s="#fede00")=>`<div class="${c.car}">
    <div class="${c.options}">
      <button class="${c.select}" data-select=${t}>Select</button>
      <button class="${c.remove}" data-remove=${t}>Remove</button>
      <h6 class="${c.title}">${e}</h6>
    </div>
    <div class="${c.control}">
      <button class="${c.start}" id="start-${t}" data-start=${t} >Start</button>
      <button class="${c.stop}" id="stop-${t}" data-stop=${t} disabled="true">Stop</button>
      <div class="${c.img}" id="car-${t}" data-car=${t}>${P(s)}</div>
      <div class="flag"></div>
    </div>
  </div>
`,J="http://127.0.0.1:3000",K=async t=>{await fetch(`${J}/garage`,{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}})},R="http://127.0.0.1:3000",Q=async t=>{await fetch(`${R}/garage/${t}`,{method:"DELETE"})},Y="http://127.0.0.1:3000",Z=async(t,e)=>{await fetch(`${Y}/garage/${t}`,{method:"PUT",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})},B="http://127.0.0.1:3000",tt=`${B}/engine`,et=async t=>(await fetch(`${tt}?id=${t}&status=started`,{method:"PATCH"})).json();let v=0;const st=(t,e,s)=>{let n=performance.now();function a(o){n||(n=o);const l=(o-n)/s,H=l*e;t.style.transform=`translateX(${H}px)`,l<1&&(v=globalThis.requestAnimationFrame(a))}return v=globalThis.requestAnimationFrame(a),v},at="http://127.0.0.1:3000",nt=`${at}/engine`,ot=async t=>{(await fetch(`${nt}?id=${t}&status=stopped`,{method:"PATCH"})).json()},rt="http://127.0.0.1:3000",ct=`${rt}/engine`,it=async t=>(await fetch(`${ct}?id=${t}&status=drive`,{method:"PATCH"}).catch()).status,i=async(t=1)=>{await A(t).then(e=>{f&&(f.innerHTML="");for(const s of e){const n=`${D(s.id,s.name,s.color)}`;f&&(f.innerHTML+=n)}T!==null&&(T.textContent=`total cars - ${_}`)})},S=async(t,e)=>{!t||!e?alert("Please, enter name for car"):(await K({name:`${t}`,color:`${e}`}),await i())},lt=async t=>{await Q(t),await i()},dt=async(t,e)=>{await Z(t,e),await i()},ut=()=>document.body.clientWidth-document.body.clientWidth/100*20,L=async t=>{await et(t).then(({velocity:e,distance:s})=>{const n=s/e,a=document.querySelector(`[data-car="${t}"]`);a instanceof HTMLElement&&st(a,ut(),n),it(t).then(o=>{o.success||globalThis.cancelAnimationFrame(v)})})},x=async t=>{await ot(t).then(()=>{globalThis.cancelAnimationFrame(v);const e=document.querySelector(`[data-car="${t}"]`);e instanceof HTMLElement&&(e.style.transform="translateX(0px)")})},bt="http://127.0.0.1:3000",mt=async t=>await(await fetch(`${bt}/garage/${t}`,{method:"GET"})).json(),pt=async t=>{await A(t).then(e=>{for(const s of e)x(s.id)})},ht=async t=>{await A(t).then(e=>{for(const s of e)L(s.id)})};class vt{constructor(){g(this,"value","");g(this,"generateFunction",e=>e==="color"?this.randomColor():void 0)}randomColor(){const e=[0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];let s="";for(let n=1;n<7;n+=1)s+=e[Math.floor(Math.random()*e.length)];return this.value=s,`#${this.value}`}}const N=new vt,gt="_header_1idfi_1",ft="_nav_1idfi_12",q={header:gt,nav:ft};class yt{constructor(){g(this,"element");this.element=this.createElement()}createElement(){var s;const e=`
    <header class="header">
      <div class="${q.nav}">
        <button class="buttons btn-to_garage">To garage</button>
        <button class="buttons btn-to_winners">To winners</button>
      </div>
    </header>
    <div class="page garage-page">
      <div class="generate-cars">
        <div class="field-create">
          <input class="generate-input_text text-create" type="text" autocomplete placeholder="Enter name сar...">
          <input class="generate-input_color color-create" type="color">
          <button class="buttons btn-create">create</button>
        </div>
        <div class="field-update">
          <input class="generate-input_text text-update" type="text" autocomplete disabled="true" placeholder="Enter new name сar...">
          <input class="generate-input_color color-update" type="color" disabled="true">
          <button class="buttons btn-update" disabled="true">update</button>
        </div>
        <div class="field-control">
          <button class="buttons btn-race">race</button>
          <button class="buttons btn-reset" disabled>reset</button>
          <button class="buttons btn-generate_cars">generate cars</button>
        </div>
      </div>

      <div class="container-garage">
        <h3 class="title">Garage <span class="count-garage"></span></h3>
        <h5 class="title">Page #<span class="count-page">1</span></h5>
    
        <div class="container-car"></div>
      </div>

      <div class="pagination">
        <button class="buttons btn-prev">Prev</button>
        <button class="buttons btn-next">Next</button>
      </div>

      <div class="winner-notice"></div>

    </div>

    <div class="page winners-page hide">
      <h1 class="title title-winners">Winners <span class="count-winners"></span></h1>
      <h3 class="title title-winners">Page #<span class="count-page_winners">1</span></h3>

      <div class="container-winners">
        <table class="table-winners">
          <thead>
            <tr>
              <th>Number</th>
              <th>Car</th>
              <th>Name</th>
              <th>Wins</th>
              <th>Best time (seconds)</th>
            </tr>
          </thead>
          <tbody class="container-win">
          </tbody>
        </table>
      </div>

      <div class="pagination pagination-win">
        <button class="buttons btn-prev-win">Prev</button>
        <button class="buttons btn-next-win">Next</button>
      </div>

    </div>

    <footer>
      <div class="link-github">
        <a href="https://github.com/Bubnov-Roma">GitHub</a>
      </div>
      <div class="year-create">&#9400; 2025</div>
      <div class="link-school">
        <a href="https://rs.school/">RSSchool</a>
      </div>
    </footer>
    `;return this.element=document.createElement("main"),this.element.className=q.header,this.element.innerHTML=e,(s=document.querySelector("body"))==null||s.insertAdjacentElement("beforebegin",this.element),this.element}}new yt;const f=document.querySelector(".container-car");document.querySelector(".generate-cars");const T=document.querySelector(".count-garage"),C=document.querySelector(".btn-update"),p=document.querySelector(".text-update"),h=document.querySelector(".color-update"),y=document.querySelector(".text-create"),$=document.querySelector(".color-create"),d=document.querySelector(".btn-next"),u=document.querySelector(".btn-prev"),w=document.querySelector(".count-page"),b=document.querySelector(".btn-race"),m=document.querySelector(".btn-reset");let E=0,r=1;function $t(t){const e=t.target;if(e instanceof HTMLElement){const s=e.className;if(s.match("btn-create")&&(y!=null&&y.value)&&($!=null&&$.value)&&S(y.value,$.value),s.match("_remove_")&&e.dataset.remove&&lt(Number.parseInt(e.dataset.remove)),s.match("select")&&e.dataset.select&&(p&&h&&C&&(p.disabled=!1,h.disabled=!1,C.disabled=!1,mt(Number.parseInt(e.dataset.select))),E=Number.parseInt(e.dataset.select)),s.match("btn-update")){const n=p==null?void 0:p.value,a=h==null?void 0:h.value;dt(E,{name:n,color:a})}if(s.match(".btn-generate_cars"))for(let n=0;n<100;n+=1){const a=N.generateFunction("color"),o=N.generateFunction("color");S(a,o),i()}if(s.match("btn-next"))if(r*7<=_)w!==null&&(w.innerHTML=`${r+=1}`,i(r)),r*7>_&&(d==null||d.setAttribute("disabled","disabled"),u==null||u.removeAttribute("disabled"));else return;if(s.match("btn-prev")&&(r>1?(w!==null&&(w.innerHTML=`${r-=1}`,i(r)),r===1&&(u==null||u.setAttribute("disabled","disabled"),d==null||d.removeAttribute("disabled"))):console.log("dis")),s.match("_start_")){const n=t.target;if(n instanceof HTMLElement){const a=Number(n.dataset.start),o=document.querySelector(`[data-stop="${a}"]`);e!==null&&o!==null&&(L(a),n.setAttribute("disabled","disabled"),o.removeAttribute("disabled"))}}if(s.match("_stop_")){const n=t.target;if(n instanceof HTMLElement){const a=Number(n.dataset.stop),o=document.querySelector(`[data-start="${a}"]`);e!==null&&o!==null&&(x(a),n.setAttribute("disabled","disabled"),o.removeAttribute("disabled"))}}s.match("btn-race")&&(ht(r),b==null||b.setAttribute("disabled","disabled"),m==null||m.removeAttribute("disabled")),s.match("btn-reset")&&(pt(r),m==null||m.setAttribute("disabled","disabled"),b==null||b.removeAttribute("disabled"))}}document==null||document.addEventListener("click",$t);i();
