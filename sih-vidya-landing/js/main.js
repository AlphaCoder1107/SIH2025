import { loadUpdates, loadResources, loadTeams } from './data-loader.js';

function ready(fn){
  if(document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

ready(() => {
  // current year
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // load sections
  loadUpdates();
  loadResources();
  loadTeams();

  // filters
  const us = document.getElementById('updates-search');
  if(us) us.addEventListener('input', () => loadUpdates(us.value.trim()))

  const rs = document.getElementById('resources-search');
  if(rs) rs.addEventListener('input', () => loadResources(rs.value.trim()))

  // slideshow: auto-load images from a folder with numeric filenames
  initGallerySlideshow();
});

function initGallerySlideshow(){
  const box = document.querySelector('#teams-gallery .slideshow');
  if(!box) return;

  const slidesHost = box.querySelector('#gallery-slides');
  const start = parseInt(box.dataset.start || '1', 10);
  const end = parseInt(box.dataset.end || '12', 10);
  const ext = box.dataset.ext || '.jpg';
  const folder = box.dataset.folder || './assets/images/gallery';
  const interval = parseInt(box.dataset.interval || '3000', 10);

  const sources = [];
  for(let i=start;i<=end;i++){
    // try with zero padding optional? keep simple sequential
    sources.push(`${folder}/${i}${ext}`);
  }

  // create slides
  const slides = sources.map((src, idx) => {
    const s = document.createElement('div');
    s.className = 'slide' + (idx===0 ? ' active' : '');
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Gallery image ${idx+1}`;
    img.loading = 'lazy';
    s.appendChild(img);
    return s;
  });
  slides.forEach(s => slidesHost.appendChild(s));

  // optional indicators (dots)
  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'indicators';
  const dots = slides.map((_, idx) => {
    const d = document.createElement('span');
    d.className = 'dot' + (idx===0 ? ' active' : '');
    dotsWrap.appendChild(d);
    return d;
  });
  box.appendChild(dotsWrap);

  // autoplay loop
  let current = 0;
  function show(n){
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = n;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }
  setInterval(() => {
    const next = (current + 1) % slides.length;
    show(next);
  }, interval);
}
