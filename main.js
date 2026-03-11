/* ================================================
   REDVORN ENGINEERING — main.js
   ================================================
   Tartalom:
   1. Témaváltó (sötét/világos)
   2. Hamburger / mobil menü
   3. Nyelvválasztó → átirányítás
   4. Képcsúszka (carousel)
   5. Kapcsolati űrlap
   6. Scroll-reveal animáció
   7. Aktív nav link görgethető figyelő
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ════════════════════════════════════
     1. TÉMAVÁLTÓ
  ════════════════════════════════════ */
  const temaBtn   = document.getElementById('temaBtn');
  const gyoker    = document.documentElement;
  let sotetMod    = true;   // alapértelmezett: sötét

  temaBtn.addEventListener('click', () => {
    sotetMod = !sotetMod;
    gyoker.setAttribute('data-theme', sotetMod ? 'dark' : 'light');
    temaBtn.textContent = sotetMod ? '🌙' : '☀️';
  });


  /* ════════════════════════════════════
     2. HAMBURGER / MOBIL MENÜ
  ════════════════════════════════════ */
  const hamburger  = document.getElementById('hamburger');
  const mobilMenu  = document.getElementById('mobilMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('nyitva');
    mobilMenu.classList.toggle('nyitva');
  });

  // Bezárás linkre kattintáskor
  mobilMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('nyitva');
      mobilMenu.classList.remove('nyitva');
    });
  });


  /* ════════════════════════════════════
     3. NYELVVÁLASZTÓ → ÁTIRÁNYÍTÁS
     Minden nyelv egy külön HTML fájl:
       redvorn-hu.html
       redvorn-en.html
       redvorn-de.html
       redvorn-nl.html
  ════════════════════════════════════ */
  const langV    = document.getElementById('langV');
  const langGomb = document.getElementById('langGomb');

  // Megnyitás/csukás
  langGomb.addEventListener('click', e => {
    e.stopPropagation();
    langV.classList.toggle('nyitva');
  });
  document.addEventListener('click', () => langV.classList.remove('nyitva'));

  // Átirányítás kattintásra
  document.querySelectorAll('.lang-elem').forEach(elem => {
    elem.addEventListener('click', () => {
      const lang = elem.dataset.lang;          // pl. "en"
      const cel  = 'redvorn-' + lang + '.html';
      if (window.location.href.indexOf(cel) === -1) {
        window.location.href = cel;
      }
      langV.classList.remove('nyitva');
    });
  });

  // Aktív nyelv kiemelése az aktuális fájlnév alapján
  const aktFajl = window.location.pathname.split('/').pop();
  document.querySelectorAll('.lang-elem').forEach(elem => {
    if (aktFajl.includes(elem.dataset.lang)) {
      elem.classList.add('aktiv');
    }
  });


  /* ════════════════════════════════════
     4. KÉPCSÚSZKA (CAROUSEL)
  ════════════════════════════════════ */
  const sliderSav   = document.getElementById('sliderSav');
  const diasok      = document.querySelectorAll('.dia');
  const pontokTart  = document.getElementById('sliderPontok');
  const balNyil     = document.getElementById('slNyilBal');
  const jobbNyil    = document.getElementById('slNyilJobb');

  let aktDia    = 0;
  let autoPompa = null;
  const DELAY   = 4500;   // ms — automatikus váltás ideje

  function pontokFrissit() {
    document.querySelectorAll('.sl-pont').forEach((p, i) => {
      p.classList.toggle('aktiv', i === aktDia);
    });
    diasok.forEach((d, i) => d.classList.toggle('aktiv-dia', i === aktDia));
  }

  function diara(i) {
    aktDia = (i + diasok.length) % diasok.length;
    sliderSav.style.transform = `translateX(-${aktDia * 100}%)`;
    pontokFrissit();
  }

  // Pontok generálása
  if (pontokTart && diasok.length > 0) {
    diasok.forEach((_, i) => {
      const p = document.createElement('button');
      p.className = 'sl-pont' + (i === 0 ? ' aktiv' : '');
      p.setAttribute('aria-label', `${i + 1}. kép`);
      p.addEventListener('click', () => {
        clearInterval(autoPompa);
        diara(i);
        autoPompa = setInterval(() => diara(aktDia + 1), DELAY);
      });
      pontokTart.appendChild(p);
    });
    diasok[0].classList.add('aktiv-dia');
  }

  // Nyilak
  if (balNyil)  balNyil.addEventListener('click',  () => { clearInterval(autoPompa); diara(aktDia - 1); autoPompa = setInterval(() => diara(aktDia + 1), DELAY); });
  if (jobbNyil) jobbNyil.addEventListener('click', () => { clearInterval(autoPompa); diara(aktDia + 1); autoPompa = setInterval(() => diara(aktDia + 1), DELAY); });

  // Automatikus lejátszás
  if (diasok.length > 1) {
    autoPompa = setInterval(() => diara(aktDia + 1), DELAY);
  }

  // Touch/Swipe támogatás
  let erintesX = 0;
  if (sliderSav) {
    sliderSav.addEventListener('touchstart', e => { erintesX = e.touches[0].clientX; }, { passive: true });
    sliderSav.addEventListener('touchend', e => {
      const diff = erintesX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        clearInterval(autoPompa);
        diara(diff > 0 ? aktDia + 1 : aktDia - 1);
        autoPompa = setInterval(() => diara(aktDia + 1), DELAY);
      }
    });
  }


  /* ════════════════════════════════════
     5. KAPCSOLATI ŰRLAP
  ════════════════════════════════════ */
const urlap   = document.getElementById('kapcsolatUrlap');
const urlapOk = document.getElementById('urlapOk');

if (urlap) {
  urlap.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(urlap);

    fetch(window.location.pathname, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(response => {
      if (response.ok) {
        urlap.style.display = 'none';
        urlapOk.classList.add('latszik');
      } else {
        throw new Error('Hálózati hiba: ' + response.status);
      }
    })
    .catch((error) => {
      alert('Hiba történt, kérjük próbálja újra.');
      console.error('Form hiba:', error);
    });
  });
}


  /* ════════════════════════════════════
     6. SCROLL-REVEAL ANIMÁCIÓ
  ════════════════════════════════════ */
  const megjelenok = document.querySelectorAll('.megjeleno');

  const figyelo = new IntersectionObserver((bejegyzesek) => {
    bejegyzesek.forEach((b, i) => {
      if (b.isIntersecting) {
        setTimeout(() => b.target.classList.add('latható'), i * 75);
        figyelo.unobserve(b.target);
      }
    });
  }, { threshold: 0.1 });

  megjelenok.forEach(el => figyelo.observe(el));


  /* ════════════════════════════════════
     7. AKTÍV NAV LINK FIGYELŐ
  ════════════════════════════════════ */
  const szekcíók = document.querySelectorAll('section[id]');
  const navLinkek = document.querySelectorAll('.nav-linkek a');

  const navFigyelo = new IntersectionObserver((bejegyzesek) => {
    bejegyzesek.forEach(b => {
      if (b.isIntersecting) {
        navLinkek.forEach(a => {
          a.classList.toggle('aktiv', a.getAttribute('href') === '#' + b.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  szekcíók.forEach(sz => navFigyelo.observe(sz));

}); // DOMContentLoaded vége
