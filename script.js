const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const roles=["Web Developer","Digital Marketer","SEO Specialist","Freelancer"];
let ri=0,ci=0,deleting=false;

function typeRole(){
 const el=$("#roleText"), word=roles[ri];
 if(!deleting){
   el.textContent=word.slice(0,ci++);
   if(ci>word.length){deleting=true;setTimeout(typeRole,1200);return}
 } else {
   el.textContent=word.slice(0,ci--);
   if(ci<0){deleting=false;ri=(ri+1)%roles.length;ci=0}
 }
 setTimeout(typeRole,deleting?45:85);
}
typeRole();

const header=$(".site-header"), menu=$("#menuToggle"), nav=$("#mainNav");
if(menu && nav) menu.addEventListener("click",()=>nav.classList.toggle("open"));
$$("nav a").forEach(a=>a.addEventListener("click",()=>nav?.classList.remove("open")));

window.addEventListener("scroll",()=>{
 header?.classList.toggle("scrolled",scrollY>20);
 let current="home";
 $$("main section").forEach(s=>{if(scrollY>=s.offsetTop-180)current=s.id});
 $$("nav a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current));
});

const themeToggle=$("#themeToggle");
if(themeToggle){
 themeToggle.addEventListener("click",()=>{
   document.body.classList.toggle("light");
   $("#themeToggle i").className=document.body.classList.contains("light")
     ?"fa-solid fa-sun":"fa-solid fa-moon";
   localStorage.setItem("fh-theme",document.body.classList.contains("light")?"light":"dark");
 });
}
if(localStorage.getItem("fh-theme")==="light"){
 document.body.classList.add("light");
 $("#themeToggle i").className="fa-solid fa-sun";
}

const observer=new IntersectionObserver(
 es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),
 {threshold:.08}
);
$$(".reveal").forEach(e=>observer.observe(e));

const cards=[...$$(".cert-card")];
if($("#visibleCount")) $("#visibleCount").textContent=cards.length;

$("#certSearch")?.addEventListener("input",e=>{
 const q=e.target.value.toLowerCase().trim();
 let n=0;
 cards.forEach(c=>{
   const ok=(c.innerText+" "+(c.dataset.tags||"")).toLowerCase().includes(q);
   c.style.display=ok?"":"none";
   if(ok)n++;
 });
 if($("#visibleCount")) $("#visibleCount").textContent=n;
});

function openCert(card){
 const img=card.querySelector("img");
 const title=card.querySelector("h3");
 const desc=card.querySelector(".issuer");
 const id=card.querySelector(".cert-id");
 $("#modalImg").src=img?.src||"";
 $("#modalTitle").textContent=title?.textContent||"Certificate";
 $("#modalDesc").textContent=desc?.textContent||"";
 $("#modalId").textContent=id?.textContent||"";
 $("#certModal").classList.add("show");
 document.body.style.overflow="hidden";
}

cards.forEach(c=>{
 c.addEventListener("click",()=>openCert(c));
 c.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" ")openCert(c)});
});

function closeModal(){
 $("#certModal").classList.remove("show");
 document.body.style.overflow="";
}
$("#modalClose")?.addEventListener("click",closeModal);
$("#certModal")?.addEventListener("click",e=>{
 if(e.target.id==="certModal")closeModal();
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

$("#contactForm")?.addEventListener("submit",e=>{
 e.preventDefault();
 const name=$("#name").value.trim();
 const email=$("#email").value.trim();
 const subject=$("#subject").value.trim();
 const message=$("#message").value.trim();
 const body=`Name: ${name}%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`;
 window.location.href=`mailto:connect.fahim.edu@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
 $("#formStatus").textContent="Opening your email app...";
});

document.addEventListener("mousemove",e=>{
 const glow=$(".cursor-glow");
 if(glow){
   glow.style.left=e.clientX+"px";
   glow.style.top=e.clientY+"px";
 }
});

/* =========================================
   HERO PORTRAIT CARD - 3D TILT + SPOTLIGHT
========================================= */

const portraitCard=document.getElementById("portraitCard");

if(portraitCard){
 const maxTilt=9;

 portraitCard.addEventListener("mousemove",e=>{
   const r=portraitCard.getBoundingClientRect();
   const px=(e.clientX-r.left)/r.width;
   const py=(e.clientY-r.top)/r.height;
   const rx=((0.5-py)*maxTilt*2).toFixed(2);
   const ry=((px-0.5)*maxTilt*2).toFixed(2);
   portraitCard.style.transition="transform .08s linear";
   portraitCard.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.02)`;
   portraitCard.style.setProperty("--mx",(px*100)+"%");
   portraitCard.style.setProperty("--my",(py*100)+"%");
 });

 portraitCard.addEventListener("mouseleave",()=>{
   portraitCard.style.transition="transform .6s cubic-bezier(.2,.8,.2,1)";
   portraitCard.style.transform="";
   portraitCard.style.removeProperty("--mx");
   portraitCard.style.removeProperty("--my");
 });
}

/* =========================================
   FREELANCER ID CARD - CLICK TO TOGGLE FLIP
========================================= */

const freelancerCard=document.getElementById("freelancerIdCard");

if(freelancerCard){
 const cardInner=freelancerCard.querySelector(".id-card-inner");

 freelancerCard.setAttribute("role","button");
 freelancerCard.setAttribute("tabindex","0");

 function toggleFlip(){
   if(!cardInner) return;
   cardInner.classList.toggle("flipped");
 }

 freelancerCard.addEventListener("click",toggleFlip);
 freelancerCard.addEventListener("keydown",e=>{
   if(e.key==="Enter"||e.key===" "){
     e.preventDefault();
     toggleFlip();
   }
 });
}
