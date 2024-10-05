(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const n of e.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function c(t){if(t.ep)return;t.ep=!0;const e=i(t);fetch(t.href,e)}})();function b(){document.addEventListener("DOMContentLoaded",()=>{const o=document.querySelectorAll(".hamburger-menu-button"),s=document.querySelector(".sidebar"),i=document.querySelector(".mobile-sidebar"),c=document.querySelector(".overlay"),t=s==null?void 0:s.querySelector("ul"),e=i==null?void 0:i.querySelector("ul"),n=()=>{s&&(t==null||t.classList.remove("visible"),setTimeout(()=>{s.classList.remove("open"),setTimeout(()=>{s.style.display="none"},300)},100)),i&&(e==null||e.classList.remove("visible"),setTimeout(()=>{i.classList.remove("open"),setTimeout(()=>{i.style.display="none"},300)},100)),c==null||c.classList.remove("open"),o==null||o.forEach(a=>a.classList.remove("open"))};o.length>0?o.forEach(a=>{a.addEventListener("click",()=>{s?s.classList.contains("open")?(t==null||t.classList.remove("visible"),setTimeout(()=>{s.classList.remove("open"),setTimeout(()=>{s.style.display="none"},300)},100)):(s.style.display="flex",setTimeout(()=>{s.classList.add("open"),setTimeout(()=>{t==null||t.classList.add("visible")},500)},10)):console.error("Sidebar not found on click"),i?i.classList.contains("open")?(e==null||e.classList.remove("visible"),setTimeout(()=>{i.classList.remove("open"),setTimeout(()=>{i.style.display="none"},300)},100)):(i.style.display="flex",setTimeout(()=>{i.classList.add("open"),setTimeout(()=>{e==null||e.classList.add("visible")},500)},10)):console.error("Sidebar not found on click"),c==null||c.classList.toggle("open"),a.classList.toggle("open")})}):console.error("Hamburger menu button not found"),c==null||c.addEventListener("click",()=>{s&&(t==null||t.classList.remove("visible"),setTimeout(()=>{s.classList.remove("open"),setTimeout(()=>{s.style.display="none"},300)},100)),i&&(e==null||e.classList.remove("visible"),setTimeout(()=>{i.classList.remove("open"),setTimeout(()=>{i.style.display="none"},300)},100)),c==null||c.classList.remove("open"),o==null||o.forEach(a=>a.classList.remove("open"))}),document.addEventListener("keydown",a=>{a.key==="Escape"&&(s!=null&&s.classList.contains("open"))&&n()}),document.querySelectorAll(".menu-item").forEach(a=>{a.addEventListener("click",d=>{d.preventDefault();const u=d.target.getAttribute("href"),p=document.querySelector(u);p?(window.scrollTo({top:p.offsetTop,behavior:"smooth"}),n()):console.log(`Element not found: ${u}`)})})})}b();document.addEventListener("DOMContentLoaded",()=>{const o=document.querySelectorAll(".indicator"),s=[];o.forEach(t=>{const e=t.getAttribute("data-section");if(e){const n=document.querySelector(e);n&&s.push(n)}});const i=new IntersectionObserver(t=>{t.forEach(e=>{const n=s.indexOf(e.target);n!==-1&&(e.isIntersecting?o[n].classList.add("active"):o[n].classList.remove("active"))})},{threshold:Array.from({length:101},(t,e)=>e*.01)});s.forEach(t=>{i.observe(t)}),document.querySelectorAll(".menu-item").forEach(t=>{t.addEventListener("click",e=>{var l;e.preventDefault();const n=e.target.getAttribute("href");n&&((l=document.querySelector(n))==null||l.scrollIntoView({behavior:"smooth"}))})})});const P=async()=>await(await fetch("undefined/api/notion-events")).json(),$="_spinner_1n8nv_1",k="_rotation_1n8nv_1",E={spinner:$,rotation:k,"spinner-container":"_spinner-container_1n8nv_11"},w={"past-events-grid":"_past-events-grid_v4ppr_1","past-event":"_past-event_v4ppr_1"},M=async()=>{const o=document.getElementById("past-events-container");if(!o){console.error("Events container not found.");return}const s=()=>{const n=document.createElement("div");n.classList.add(E["spinner-container"]);const l=document.createElement("span");l.classList.add(E.spinner),n.appendChild(l),o.appendChild(n)},i=()=>{const n=document.querySelector(`.${E.spinner}`);n&&n.remove()};o.innerHTML="",s(),await new Promise(n=>setTimeout(n,1e4));const c=await P(),t=new Date,e=c.filter(n=>{var a,d;return new Date((d=(a=n.properties.event_date)==null?void 0:a.date)==null?void 0:d.start)<t});if(i(),e.length===0){const n=document.createElement("p");n.textContent="No past events available.",o.appendChild(n);return}e.forEach(n=>{var y,x,g,D,T,r,m,L,_;const l=document.createElement("div");l.classList.add(w.event);const a=((x=(y=n.properties.event_name)==null?void 0:y.title[0])==null?void 0:x.plain_text)||"Unnamed Event",d=document.createElement("h3");d.classList.add(w["past-event-name"]),d.textContent=a,l.appendChild(d);const u=((D=(g=n.properties.event_date)==null?void 0:g.date)==null?void 0:D.start)||"Date not set",p=document.createElement("p");p.classList.add(w["past-event-date"]),p.textContent=`Date: ${new Date(u).toLocaleDateString()}`,l.appendChild(p);const h=((r=(T=n.properties.event_description)==null?void 0:T.rich_text[0])==null?void 0:r.plain_text)||"No description available",v=document.createElement("p");v.classList.add(w["past-event-description"]),v.textContent=h,l.appendChild(v);const S=((L=(m=n.properties.event_location_name)==null?void 0:m.rich_text[0])==null?void 0:L.plain_text)||"Location not set",C=((_=n.properties.event_location_link)==null?void 0:_.url)||"#",f=document.createElement("a");f.href=C,f.classList.add(w["past-event-location"]),f.textContent=S,l.appendChild(f),o.appendChild(l)})};M();const q={"next-event-container":"_next-event-container_nnup8_1","next-event-inner":"_next-event-inner_nnup8_22","next-event-title":"_next-event-title_nnup8_25","next-event-details":"_next-event-details_nnup8_30","next-event-description":"_next-event-description_nnup8_37","cta-button":"_cta-button_nnup8_44"},U=async()=>{var S,C,f,y,x,g,D,T;const o=document.querySelector(".next-event-container");if(!o){console.error("Next event container not found.");return}const s=()=>{const r=document.createElement("div");r.classList.add(E["spinner-container"]);const m=document.createElement("span");m.classList.add(E.spinner),r.appendChild(m),o.appendChild(r)},i=()=>{const r=document.querySelector(`.${E["spinner-container"]}`);r&&r.remove()};o.innerHTML="",s(),await new Promise(r=>setTimeout(r,1e3));const c=await P();if(i(),c.length===0){const r=document.createElement("p");r.textContent="No upcoming events.",o.appendChild(r);return}const t=new Date,e=c.filter(r=>{var L,_;return new Date((_=(L=r.properties.event_date)==null?void 0:L.date)==null?void 0:_.start)>t});if(e.length===0){const r=document.createElement("p");r.textContent="No upcoming events.",o.appendChild(r);return}e.sort((r,m)=>{var N,I,A,O;const L=new Date((I=(N=r.properties.event_date)==null?void 0:N.date)==null?void 0:I.start),_=new Date((O=(A=m.properties.event_date)==null?void 0:A.date)==null?void 0:O.start);return L.getTime()-_.getTime()});const n=e[0],l=((C=(S=n.properties.event_date)==null?void 0:S.date)==null?void 0:C.start)||"Date not set",a=((y=(f=n.properties.event_location_name)==null?void 0:f.rich_text[0])==null?void 0:y.plain_text)||"Location not set",d=((g=(x=n.properties.event_description)==null?void 0:x.rich_text[0])==null?void 0:g.plain_text)||"No description available",u=document.createElement("h1");u.classList.add(q["next-event-title"],"title-md"),u.textContent=((T=(D=n.properties.event_name)==null?void 0:D.title[0])==null?void 0:T.plain_text)||"Unnamed Event";const p=document.createElement("p");p.classList.add(q["next-event-details"]),p.textContent=`Date: ${new Date(l).toLocaleDateString()} | Location: ${a}`;const h=document.createElement("p");h.classList.add(q["next-event-description"]),h.textContent=d;const v=document.createElement("a");v.href="#",v.classList.add(q["cta-button"]),v.textContent="RSVP",o.appendChild(u),o.appendChild(p),o.appendChild(h),o.appendChild(v)};U();