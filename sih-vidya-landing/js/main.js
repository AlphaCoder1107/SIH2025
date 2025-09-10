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
});
