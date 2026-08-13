document.addEventListener('DOMContentLoaded',()=>{
  const b=document.body,l=document.getElementById('loader'),h=document.getElementById('header'),n=document.getElementById('nav'),m=document.getElementById('menu');
  window.addEventListener('load',()=>setTimeout(()=>{l?.classList.add('hidden');setTimeout(()=>l?.remove(),800)},450));
  const sh=()=>h?.classList.toggle('scrolled',scrollY>35);addEventListener('scroll',sh,{passive:true});sh();
  m?.addEventListener('click',()=>{const o=n.classList.toggle('open');m.classList.toggle('open',o);m.setAttribute('aria-expanded',o);b.classList.toggle('lock',o)});
  n?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{n.classList.remove('open');m?.classList.remove('open');b.classList.remove('lock');m?.setAttribute('aria-expanded','false')}));
  const rs=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');ro.unobserve(e.target)}}),{threshold:.12});rs.forEach(x=>ro.observe(x));}else{rs.forEach(x=>x.classList.add('visible'));}
  const lb=document.getElementById('lightbox'),im=document.getElementById('lightboxImage'),ti=document.getElementById('lightboxTitle'),cl=document.getElementById('closeLightbox');
  document.querySelectorAll('.zoom').forEach(x=>x.addEventListener('click',()=>{im.src=x.dataset.image;im.alt=x.dataset.title||'';ti.textContent=x.dataset.title||'';lb.classList.add('open');b.classList.add('lock')}));
  const cx=()=>{lb?.classList.remove('open');b.classList.remove('lock')};cl?.addEventListener('click',cx);lb?.addEventListener('click',e=>{if(e.target===lb)cx()});addEventListener('keydown',e=>{if(e.key==='Escape')cx()});
  const f=document.getElementById('contactForm'),s=document.getElementById('formStatus');
  f?.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!s) return;
    const submit=f.querySelector('button[type="submit"]');
    const original=submit?.innerHTML;
    if(submit){submit.disabled=true;submit.innerHTML='Sending…';}
    s.textContent='Sending your enquiry…';
    try{
      const response=await fetch('https://formsubmit.co/ajax/wanjalatim@gmail.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(f)))});
      const data=await response.json();
      if(!response.ok || data.success===false) throw new Error(data.message||'Submission failed');
      s.textContent='Thank you — your enquiry has been sent to Msanii Records.';
      f.reset();
    }catch(err){
      s.textContent='We could not send the enquiry right now. Please try again or contact Msanii Records directly.';
    }finally{
      if(submit){submit.disabled=false;submit.innerHTML=original;}
    }
  });

  /* Keep Uncle Tim's full head visible and prevent the old cached/cropped rendering. */
  const unclePhoto='uncle-tim.jpg?v=3';
  document.querySelectorAll('img[src="uncle-tim.jpg"]').forEach(img=>{img.src=unclePhoto;img.loading='eager';});
  const fixStyle=document.createElement('style');
  fixStyle.textContent=`
    .about-image{height:auto!important;aspect-ratio:220/245!important;overflow:hidden!important;background:var(--paper)!important;}
    .about-image img{width:100%!important;height:100%!important;object-fit:contain!important;object-position:center top!important;background:var(--paper)!important;}
    .work img[src*="uncle-tim.jpg"]{object-position:center top!important;object-fit:contain!important;background:#1a1a18!important;}
    @media(max-width:760px){.about-image{height:auto!important;aspect-ratio:220/245!important}.about-image img{object-fit:contain!important;object-position:center top!important}.work img[src*="uncle-tim.jpg"]{object-fit:contain!important;object-position:center top!important;}}
  `;
  document.head.appendChild(fixStyle);
});
