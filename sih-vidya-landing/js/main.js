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
  const ext = (box.dataset.ext || '').trim();
  // Allow multiple extensions via data-extlist, default common ones. Primary ext (data-ext) is tried first if present.
  let extList = (box.dataset.extlist || '').split(',').map(s => s.trim()).filter(Boolean);
  if(ext) extList = [ext, ...extList];
  if(extList.length === 0) extList = ['.JPG', '.jpg', '.jpeg', '.png', '.webp'];
  const folder = box.dataset.folder || './assets/images/gallery';
  const interval = parseInt(box.dataset.interval || '3000', 10);

  // Resolve actual sources by probing multiple extensions and skipping missing files
  const indices = [];
  for(let i=start;i<=end;i++) indices.push(i);

  Promise.all(indices.map(idx => resolveSource(idx)))
    .then(files => files.filter(Boolean))
    .then(sources => {
      if(sources.length === 0){
        slidesHost.innerHTML = '<p class="muted" style="padding:1rem">No gallery images found.</p>';
        return;
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

      // autoplay
      let current = 0;
      function show(n){
        slides[current].classList.remove('active');
        current = n;
        slides[current].classList.add('active');
      }
      setInterval(() => {
        const next = (current + 1) % slides.length;
        show(next);
      }, interval);
    });

  function resolveSource(i){
    return new Promise(resolve => {
      let k = 0;
      function attempt(){
        if(k >= extList.length){ resolve(null); return; }
        const candidate = `${folder}/${i}${extList[k]}`;
        const probe = new Image();
        probe.onload = () => resolve(candidate);
        probe.onerror = () => { k++; attempt(); };
        probe.src = candidate;
      }
      attempt();
    });
  }
}
