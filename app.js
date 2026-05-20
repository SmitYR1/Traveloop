// ===== AUTH GUARD =====
if (localStorage.getItem('tl_loggedIn') !== 'true') {
  window.location.href = 'login.html';
}

// ===== STATE — loaded from localStorage =====
let currentUser = JSON.parse(localStorage.getItem('tl_user')) || { name: 'Traveler', email: '', initials: 'T' };
let trips       = JSON.parse(localStorage.getItem('tl_trips')) || [];
let notes       = JSON.parse(localStorage.getItem('tl_notes')) || [];
let isLoggedIn  = true;

// ===== PERSIST HELPERS =====
function saveTrips() { localStorage.setItem('tl_trips', JSON.stringify(trips)); }
function saveNotes() { localStorage.setItem('tl_notes', JSON.stringify(notes)); }
function saveUser()  { localStorage.setItem('tl_user',  JSON.stringify(currentUser)); }

// ===== DESTINATIONS DATA =====
const destinations = [
  { name: 'Paris',     country: 'France',    region: 'Europe',   emoji: '🗼', cost: '₹8,500/day',  popularity: '⭐ 4.9', badge: '🔥 Trending' },
  { name: 'Tokyo',     country: 'Japan',     region: 'Asia',     emoji: '🗾', cost: '₹6,200/day',  popularity: '⭐ 4.8', badge: '✨ Popular' },
  { name: 'New York',  country: 'USA',       region: 'Americas', emoji: '🗽', cost: '₹10,000/day', popularity: '⭐ 4.7', badge: '🌟 Top Pick' },
  { name: 'Bali',      country: 'Indonesia', region: 'Asia',     emoji: '🌴', cost: '₹3,500/day',  popularity: '⭐ 4.9', badge: '💎 Budget Friendly' },
  { name: 'London',    country: 'UK',        region: 'Europe',   emoji: '🎡', cost: '₹9,000/day',  popularity: '⭐ 4.6', badge: '' },
  { name: 'Dubai',     country: 'UAE',       region: 'Asia',     emoji: '🏙️', cost: '₹12,000/day', popularity: '⭐ 4.8', badge: '🔥 Trending' },
  { name: 'Rome',      country: 'Italy',     region: 'Europe',   emoji: '🏛️', cost: '₹7,000/day',  popularity: '⭐ 4.7', badge: '' },
  { name: 'Sydney',    country: 'Australia', region: 'Oceania',  emoji: '🦘', cost: '₹9,500/day',  popularity: '⭐ 4.6', badge: '✨ Popular' },
  { name: 'Bangkok',   country: 'Thailand',  region: 'Asia',     emoji: '🛕', cost: '₹2,800/day',  popularity: '⭐ 4.8', badge: '💎 Budget Friendly' },
  { name: 'Barcelona', country: 'Spain',     region: 'Europe',   emoji: '🌊', cost: '₹6,800/day',  popularity: '⭐ 4.7', badge: '' },
  { name: 'Cairo',     country: 'Egypt',     region: 'Africa',   emoji: '🐫', cost: '₹2,200/day',  popularity: '⭐ 4.5', badge: '' },
  { name: 'Santorini', country: 'Greece',    region: 'Europe',   emoji: '🏝️', cost: '₹8,000/day',  popularity: '⭐ 4.9', badge: '🌟 Top Pick' },
];

const allCities = [
  ...destinations,
  { name: 'Amsterdam',     country: 'Netherlands',    region: 'Europe',   emoji: '🚲', cost: '₹7,500/day',  popularity: '⭐ 4.6' },
  { name: 'Singapore',     country: 'Singapore',      region: 'Asia',     emoji: '🦁', cost: '₹8,800/day',  popularity: '⭐ 4.8' },
  { name: 'Istanbul',      country: 'Turkey',         region: 'Europe',   emoji: '🕌', cost: '₹4,500/day',  popularity: '⭐ 4.7' },
  { name: 'Prague',        country: 'Czech Republic', region: 'Europe',   emoji: '🏰', cost: '₹5,000/day',  popularity: '⭐ 4.8' },
  { name: 'Maldives',      country: 'Maldives',       region: 'Asia',     emoji: '🐠', cost: '₹18,000/day', popularity: '⭐ 5.0' },
  { name: 'Kyoto',         country: 'Japan',          region: 'Asia',     emoji: '⛩️', cost: '₹5,500/day',  popularity: '⭐ 4.9' },
  { name: 'Lisbon',        country: 'Portugal',       region: 'Europe',   emoji: '🌉', cost: '₹5,800/day',  popularity: '⭐ 4.7' },
  { name: 'Cape Town',     country: 'South Africa',   region: 'Africa',   emoji: '🦁', cost: '₹4,200/day',  popularity: '⭐ 4.6' },
  { name: 'Buenos Aires',  country: 'Argentina',      region: 'Americas', emoji: '🥩', cost: '₹3,800/day',  popularity: '⭐ 4.5' },
];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  updateNavForAuth();
  renderDestinations();
  renderCitySearch();
  renderRecentTrips();
  renderTripList();
  renderNotes();
  setupScrollBehavior();
  closeDropdownOnOutsideClick();

  // show recent trips section if there are trips
  const sec = document.getElementById('recentTripsSection');
  if (sec) sec.style.display = trips.length ? 'block' : 'none';

  // Pre-fill profile modal
  const parts = currentUser.name.split(' ');
  const pf = document.getElementById('profileFirst');
  const pl = document.getElementById('profileLast');
  const pe = document.getElementById('profileEmail');
  if (pf) pf.value = parts[0] || '';
  if (pl) pl.value = parts.slice(1).join(' ') || '';
  if (pe) pe.value = currentUser.email || '';
});

// ===== NAV AUTH =====
function updateNavForAuth() {
  const liMenu = document.getElementById('loggedInMenu');
  const loMenu = document.getElementById('loggedOutMenu');
  const avatar = document.getElementById('navAvatar');
  const profAv = document.getElementById('profileAvatar');
  if (liMenu) liMenu.style.display = 'block';
  if (loMenu) loMenu.style.display = 'none';
  if (avatar) avatar.textContent   = currentUser.initials || 'T';
  if (profAv) profAv.textContent   = currentUser.initials || 'T';
}

// ===== LOGOUT =====
function handleLogout() {
  localStorage.removeItem('tl_loggedIn');
  localStorage.removeItem('tl_user');
  showToast('Logged out. See you soon! 👋');
  setTimeout(() => { window.location.href = 'login.html'; }, 900);
}

// kept for HTML compatibility — user is always logged in on this page
function requireLogin(cb) { cb(); }

// ===== DESTINATIONS =====
function renderDestinations() {
  const grid = document.getElementById('destinationsGrid');
  if (!grid) return;
  grid.innerHTML = destinations.map(d => `
    <div class="dest-card" onclick="openCityFromCard('${d.name}')">
      <div class="dest-img-placeholder">${d.emoji}</div>
      ${d.badge ? `<div class="dest-badge">${d.badge}</div>` : ''}
      <button class="add-to-trip-btn" onclick="event.stopPropagation(); addCityToNewTrip('${d.name}')">+ Add to Trip</button>
      <div class="dest-info">
        <div class="dest-name">${d.name}</div>
        <div class="dest-country">${d.country}</div>
        <div class="dest-meta">
          <span class="dest-cost">${d.cost}</span>
          <span class="dest-popularity">${d.popularity}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function openCityFromCard(cityName) {
  openModal('citySearchModal');
  setTimeout(() => {
    document.getElementById('citySearchInput').value = cityName;
    filterCities();
  }, 100);
}

// ===== CITY SEARCH =====
function renderCitySearch(list = allCities) {
  const grid = document.getElementById('citySearchGrid');
  if (!grid) return;
  if (!list.length) { grid.innerHTML = '<div class="empty-state">No cities found.</div>'; return; }
  grid.innerHTML = list.map(c => `
    <div class="city-search-card">
      <div class="city-emoji">${c.emoji}</div>
      <h4>${c.name}</h4>
      <p>${c.country} · ${c.region}</p>
      <div class="city-cost">${c.cost}</div>
      <div class="city-cost" style="color:var(--mid);font-weight:400">${c.popularity}</div>
      <button class="add-city-btn" onclick="addCityToCurrentTrip('${c.name}')">+ Add to Trip</button>
    </div>
  `).join('');
}

function filterCities() {
  const q      = document.getElementById('citySearchInput').value.toLowerCase();
  const region = document.getElementById('regionFilter').value;
  renderCitySearch(allCities.filter(c =>
    (c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)) &&
    (!region || c.region === region)
  ));
}

function addCityToCurrentTrip(city) {
  closeModal('citySearchModal');
  openModal('createTripModal');
  setTimeout(() => { addCityTag(city); showToast(city + ' added! ✈️'); }, 300);
}

function addCityToNewTrip(city) {
  openModal('createTripModal');
  setTimeout(() => addCityTag(city), 300);
}

// ===== CITY TAGS =====
let tripCities = [];

function addCity() {
  const input = document.getElementById('cityInput');
  const val   = input.value.trim();
  if (val && !tripCities.includes(val)) { addCityTag(val); input.value = ''; }
}

function addCityTag(city) {
  if (!tripCities.includes(city)) { tripCities.push(city); renderCityTags(); }
}

function addCityOnEnter(e) { if (e.key === 'Enter') addCity(); }

function removeCityTag(city) {
  tripCities = tripCities.filter(c => c !== city);
  renderCityTags();
}

function renderCityTags() {
  const el = document.getElementById('cityTags');
  if (!el) return;
  el.innerHTML = tripCities.map(c => `
    <div class="city-tag">${c}<button onclick="removeCityTag('${c}')">✕</button></div>
  `).join('');
}

// ===== MODALS =====
function openModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.add('open'); document.body.style.overflow = 'hidden'; }
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
  if (!document.querySelector('.modal-overlay.open')) document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        if (!document.querySelector('.modal-overlay.open')) document.body.style.overflow = '';
      }
    });
  });
});

// ===== PROFILE =====
function saveProfile() {
  const first = (document.getElementById('profileFirst').value || '').trim();
  const last  = (document.getElementById('profileLast').value  || '').trim();
  const email = (document.getElementById('profileEmail').value || '').trim();
  currentUser.name     = `${first} ${last}`.trim() || 'Traveler';
  currentUser.email    = email;
  currentUser.initials = (first[0] || 'T').toUpperCase();
  saveUser();
  updateNavForAuth();
  closeModal('profileModal');
  showToast('Profile updated! ✅');
}

function confirmDelete() {
  if (confirm('Delete your account? All data will be lost.')) {
    localStorage.clear();
    window.location.href = 'login.html';
  }
}

// ===== TRIPS =====
function saveTrip() {
  const nameEl  = document.querySelector('#createTripModal input[type="text"]');
  const dates   = document.querySelectorAll('#createTripModal input[type="date"]');
  const descEl  = document.querySelector('#createTripModal textarea');

  const name  = nameEl ? nameEl.value.trim() : '';
  const start = dates[0] ? dates[0].value : '';
  const end   = dates[1] ? dates[1].value : '';
  const desc  = descEl  ? descEl.value.trim()  : '';

  if (!name) { showToast('Please enter a trip name!'); return; }

  trips.push({
    id:        Date.now(),
    name,
    cities:    [...tripCities],
    startDate: start || 'TBD',
    endDate:   end   || 'TBD',
    desc,
    createdAt: new Date().toLocaleDateString()
  });
  saveTrips();

  // reset form
  tripCities = [];
  renderCityTags();
  if (nameEl)  nameEl.value  = '';
  if (dates[0]) dates[0].value = '';
  if (dates[1]) dates[1].value = '';
  if (descEl)  descEl.value  = '';

  closeModal('createTripModal');
  renderRecentTrips();
  renderTripList();
  const sec = document.getElementById('recentTripsSection');
  if (sec) sec.style.display = 'block';
  showToast('Trip "' + name + '" created! 🎉');
}

function renderRecentTrips() {
  const c = document.getElementById('recentTripCards');
  if (!c) return;
  if (!trips.length) { c.innerHTML = '<div class="empty-state">No trips yet. Start planning!</div>'; return; }
  c.innerHTML = trips.slice(-3).reverse().map(t => `
    <div class="trip-card" style="min-width:260px;flex:1;">
      <div class="trip-card-info">
        <h4>${t.name}</h4>
        <p>📍 ${t.cities.join(', ') || 'No cities added'}</p>
        <p style="margin-top:4px">📅 ${t.startDate}${t.endDate !== 'TBD' ? ' → ' + t.endDate : ''}</p>
      </div>
      <div class="trip-card-actions">
        <button onclick="viewItinerary(${t.id})">View</button>
        <button onclick="shareTrip(${t.id})">Share 🔗</button>
        <button class="del-btn" onclick="deleteTrip(${t.id})">✕</button>
      </div>
    </div>
  `).join('');
}

function renderTripList() {
  const c = document.getElementById('tripList');
  if (!c) return;
  if (!trips.length) { c.innerHTML = '<div class="empty-state">No trips yet. Start planning your first adventure!</div>'; return; }
  c.innerHTML = trips.map(t => `
    <div class="trip-card">
      <div class="trip-card-info">
        <h4>${t.name}</h4>
        <p>📍 ${t.cities.join(' → ') || 'No stops'} &nbsp;|&nbsp; 📅 ${t.startDate}</p>
      </div>
      <div class="trip-card-actions">
        <button onclick="viewItinerary(${t.id}); closeModal('myTripsModal')">View</button>
        <button onclick="shareTrip(${t.id})">Share</button>
        <button class="del-btn" onclick="deleteTrip(${t.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

function deleteTrip(id) {
  trips = trips.filter(t => t.id !== id);
  saveTrips();
  renderTripList();
  renderRecentTrips();
  const sec = document.getElementById('recentTripsSection');
  if (sec) sec.style.display = trips.length ? 'block' : 'none';
  showToast('Trip deleted.');
}

function viewItinerary(id) {
  const trip = trips.find(t => t.id === id);
  if (!trip) return;
  const c = document.getElementById('itineraryContent');
  if (!c) return;
  if (!trip.cities.length) {
    c.innerHTML = `<div style="margin-bottom:16px"><strong>${trip.name}</strong></div><div class="empty-state">No cities added yet.</div>`;
  } else {
    c.innerHTML = `
      <h3 style="font-family:var(--font-display);margin-bottom:8px;font-size:1.4rem">${trip.name}</h3>
      <p style="color:var(--mid);font-size:0.85rem;margin-bottom:24px">
        📅 ${trip.startDate}${trip.endDate !== 'TBD' ? ' → ' + trip.endDate : ''}
        ${trip.desc ? ' · ' + trip.desc : ''}
      </p>
      ${trip.cities.map((city, i) => `
        <div class="itinerary-stop">
          <div class="stop-dot"></div>
          <div class="stop-city">📍 ${city}</div>
          <div class="stop-dates">Stop ${i + 1} of ${trip.cities.length}</div>
        </div>
      `).join('')}
      <button class="btn-secondary" style="margin-top:12px" onclick="shareTrip(${trip.id})">🔗 Share This Itinerary</button>
    `;
  }
  openModal('itineraryModal');
}

function shareTrip(id) {
  document.getElementById('shareUrl').textContent = `https://traveloop.app/trip/${id}`;
  closeModal('myTripsModal');
  openModal('shareModal');
}

// ===== NOTES =====
function addNote() {
  const title = document.getElementById('noteTitle').value.trim();
  const body  = document.getElementById('noteBody').value.trim();
  if (!title && !body) { showToast('Write something first!'); return; }
  notes.push({ id: Date.now(), title: title || 'Untitled', body, time: new Date().toLocaleString() });
  saveNotes();
  document.getElementById('noteTitle').value = '';
  document.getElementById('noteBody').value  = '';
  renderNotes();
  showToast('Note saved! 📝');
}

function deleteNote(id) {
  notes = notes.filter(n => n.id !== id);
  saveNotes();
  renderNotes();
}

function renderNotes() {
  const c = document.getElementById('notesList');
  if (!c) return;
  if (!notes.length) { c.innerHTML = '<div class="empty-state">No notes yet. Jot something down!</div>'; return; }
  c.innerHTML = [...notes].reverse().map(n => `
    <div class="note-card">
      <div class="note-card-header">
        <h4>${n.title}</h4>
        <button class="delete-note" onclick="deleteNote(${n.id})">✕</button>
      </div>
      <p>${n.body}</p>
      <div class="note-card-time">${n.time}</div>
    </div>
  `).join('');
}

// ===== PACKING =====
function addPackingItem() {
  const category = document.getElementById('itemCategory').value;
  const input    = document.getElementById('newPackItem');
  const val      = input.value.trim();
  if (!val) return;
  const lbl = document.createElement('label');
  lbl.className = 'check-item';
  lbl.innerHTML = `<input type="checkbox"/> ${val}`;
  document.getElementById(category).appendChild(lbl);
  input.value = '';
  showToast('Item added! 🎒');
}

function resetChecklist() {
  document.querySelectorAll('.check-item input[type="checkbox"]').forEach(cb => cb.checked = false);
  showToast('Checklist reset!');
}

// ===== SEARCH BAR =====
function handleSearch() {
  const dest = document.getElementById('destValue').textContent;
  if (dest === 'Search cities') openModal('citySearchModal');
  else openModal('createTripModal');
}

// ===== SHARE =====
function copyShareUrl() {
  navigator.clipboard.writeText(document.getElementById('shareUrl').textContent)
    .then(() => showToast('Link copied! 🔗'));
}

// ===== DROPDOWN =====
function toggleMenu()    { document.getElementById('dropdownMenu').classList.toggle('open'); }
function closeDropdown() { document.getElementById('dropdownMenu').classList.remove('open'); }

function closeDropdownOnOutsideClick() {
  document.addEventListener('click', e => {
    const menu = document.getElementById('dropdownMenu');
    const btn  = document.querySelector('.nav-menu-btn');
    if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target))
      menu.classList.remove('open');
  });
}

// ===== SCROLL =====
function setupScrollBehavior() {
  const navbar = document.getElementById('navbar');
  const pill   = document.querySelector('.nav-search-pill');
  window.addEventListener('scroll', () => {
    const s = window.scrollY > 80;
    if (navbar) navbar.classList.toggle('scrolled', s);
    if (pill)   pill.classList.toggle('visible', s);
  });
}

function scrollToSearch() {
  const el = document.getElementById('heroSearch');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ===== TOAST =====
let toastTimeout;
function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => t.classList.remove('show'), 3000);
}

// legacy compat
function switchTab(tab) {
  ['loginForm','signupForm'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const show = document.getElementById(tab === 'login' ? 'loginForm' : 'signupForm');
  if (show) show.style.display = 'block';
  document.getElementById('loginTab')?.classList.toggle('active', tab === 'login');
  document.getElementById('signupTab')?.classList.toggle('active', tab === 'signup');
}
