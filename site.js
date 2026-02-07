(function(){
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if(toggle && menu){
    const close = () => { menu.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); };
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    // Close on link click
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    // Close on escape
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') close(); });
  }

  // Video fallback: if video can't play, show poster image only
  const v = document.querySelector('video[data-hero-video]');
  if(v){
    const fail = () => {
      v.classList.add('is-hidden');
      const fallback = document.querySelector('[data-hero-fallback]');
      if(fallback) fallback.classList.remove('is-hidden');
    };
    v.addEventListener('error', fail);
    // Some browsers block autoplay; if it won't play, keep background image visible.
    const playPromise = v.play && v.play();
    if(playPromise && typeof playPromise.catch === 'function'){
      playPromise.catch(()=>{/* keep silent; image is already behind */});
    }
  }
})();
