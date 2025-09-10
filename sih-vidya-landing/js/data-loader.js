async function fetchJSON(path){
  const res = await fetch(path, {cache:'no-store'});
  if(!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  return res.json();
}

function textMatch(q, ...fields){
  if(!q) return true;
  const s = q.toLowerCase();
  return fields.some(f => String(f||'').toLowerCase().includes(s));
}

export async function loadUpdates(query=''){
  const container = document.getElementById('updates-list');
  if(!container) return;
  container.setAttribute('aria-busy','true');
  try{
    let items = await fetchJSON('./data/updates.json');
    // sort by pinned then date desc
    items.sort((a,b)=> (b.pinned===true)-(a.pinned===true) || (new Date(b.date)-new Date(a.date)) );
    if(query) items = items.filter(it => textMatch(query, it.title, it.body, it.date));
    container.innerHTML = '';
    if(items.length===0){
      container.innerHTML = '<p class="muted">No updates found.</p>';
      return;
    }
    const ANNOUNCE_ONLY = true; // show placeholder and hide details as requested
    const PLACEHOLDER_TEXT = 'Now Open for registrations!';
    for(const it of items){
      const card = document.createElement('article');
      card.className = 'card update-card';
      const pin = it.pinned? '<span class="chip" title="Pinned">📌 Pinned</span>' : '';
      const link = (!ANNOUNCE_ONLY && it.link)? `<a class="btn" target="_blank" rel="noopener" href="${it.link}">Open</a>`: '';
      card.innerHTML = `
        <div class="row">
          <h4>${it.title}</h4>
          ${pin}
        </div>
        <time datetime="${it.date}">${ANNOUNCE_ONLY ? PLACEHOLDER_TEXT : new Date(it.date).toLocaleDateString()}</time>
        ${ANNOUNCE_ONLY ? '' : `<p>${it.body||''}</p>`}
        ${ANNOUNCE_ONLY ? '' : `<div class="row">${link}</div>`}
      `;
      container.appendChild(card);
    }
  }catch(err){
    container.innerHTML = `<p class="muted">Unable to load updates. ${err.message}</p>`;
  }finally{
    container.removeAttribute('aria-busy');
  }
}

const typeIcon = {
  pptx:'📊', pdf:'📄', form:'📝', url:'🔗', doc:'📄', sheet:'📊'
};

export async function loadResources(query=''){
  const container = document.getElementById('resources-list');
  if(!container) return;
  container.setAttribute('aria-busy','true');
  try{
    let items = await fetchJSON('./data/resources.json');
    if(query) items = items.filter(it => textMatch(query, it.title, it.desc, it.type));
    container.innerHTML = '';
    if(items.length===0){
      container.innerHTML = '<p class="muted">No resources found.</p>';
      return;
    }
    for(const it of items){
      const icon = typeIcon[it.type] || '🔗';
      const url = it.url || '';
      const isDownload = url.startsWith('/downloads/') || url.startsWith('downloads/');
      const target = isDownload? '' : ' target="_blank" rel="noopener"';
      const downloadAttr = isDownload? ' download' : '';
      const typeChip = it.type? `<span class="chip">${it.type.toUpperCase()}</span>` : '';
      const a11yTitle = `${it.title} (${it.type||'link'})`;
      const card = document.createElement('article');
      card.className = 'card resource-card';
      card.innerHTML = `
        <div class="row">
          <h4>${icon} ${it.title}</h4>
          ${typeChip}
        </div>
        <p class="muted">${it.desc||''}</p>
        <a class="btn" href="${it.url}" aria-label="${a11yTitle}"${target}${downloadAttr}>Open</a>
      `;
      container.appendChild(card);
    }
  }catch(err){
    container.innerHTML = `<p class="muted">Unable to load resources. ${err.message}</p>`;
  }finally{
    container.removeAttribute('aria-busy');
  }
}

export async function loadTeams(){
  const grid = document.getElementById('teams-grid');
  if(!grid) return;
  grid.setAttribute('aria-busy','true');
  try{
    const items = await fetchJSON('./data/teams.json');
    grid.innerHTML = '';
    if(!items.length){
      grid.innerHTML = '<p class="muted">Teams will appear here after the event.</p>';
      return;
    }
    for(const t of items){
  const card = document.createElement('article');
      card.className = 'team-card';
  const img = t.image || './assets/images/teams/placeholder.svg';
      const members = Array.isArray(t.members)? t.members.join(', ') : '';
      const gh = t.github? `<div class="meta"><a href="${t.github}" target="_blank" rel="noopener">GitHub</a></div>` : '';
      card.innerHTML = `
        <img src="${img}" alt="${t.name} team image" loading="lazy" />
        <div class="body">
          <div class="name">${t.name}</div>
          <div class="meta">${t.project||''}</div>
          <div class="meta">${members}</div>
          ${gh}
        </div>`;
      grid.appendChild(card);
    }
  }catch(err){
    grid.innerHTML = `<p class="muted">Unable to load teams. ${err.message}</p>`;
  }finally{
    grid.removeAttribute('aria-busy');
  }
}
