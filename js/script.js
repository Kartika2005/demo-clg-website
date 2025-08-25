
// Active nav highlighting
(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, nav a').forEach(a=>{
    if(a.getAttribute('href') === path){ a.classList.add('active'); }
  });
})();

// Simple carousel
(function(){
  const slides = document.querySelectorAll('.carousel .slide');
  if(!slides.length) return;
  let i = 0;
  slides[i].classList.add('active');
  setInterval(()=>{
    slides[i].classList.remove('active');
    i = (i+1)%slides.length;
    slides[i].classList.add('active');
  }, 3500);
})();

// Contact form validation + store
(function(){
  const form = document.querySelector('#contact-form');
  const msgBox = document.querySelector('#form-msg');
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if(!data.name || !data.email || !data.message){
      msgBox.className = 'alert error';
      msgBox.textContent = 'Please fill all required fields.';
      return;
    }
    // rudimentary email check
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)){
      msgBox.className = 'alert error';
      msgBox.textContent = 'Please enter a valid email address.';
      return;
    }
    const all = JSON.parse(localStorage.getItem('enquiries')||'[]');
    all.push({...data, ts:new Date().toISOString()});
    localStorage.setItem('enquiries', JSON.stringify(all));
    form.reset();
    msgBox.className = 'alert success';
    msgBox.textContent = 'Thank you! Your enquiry has been recorded.';
  });
})();

// Back to top
(function(){
  const btn = document.getElementById('backTop');
  if(!btn) return;
  window.addEventListener('scroll', ()=>{
    if(window.scrollY>300){ btn.style.display='block'; } else { btn.style.display='none'; }
  });
  btn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
})();
