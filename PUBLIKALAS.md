# Redvorn Engineering — Weboldal publikálási útmutató

---

## Fájlszerkezet

A szerverre **ugyanabba a mappába** kell feltölteni ezeket:

```
redvorn-hu.html     ← Magyar oldal (ez a főoldal)
redvorn-en.html     ← Angol oldal  (majd te fordítod)
redvorn-de.html     ← Német oldal  (majd te fordítod)
redvorn-nl.html     ← Holland oldal (majd te fordítod)
style.css           ← Közös stílus
main.js             ← Közös JavaScript
redvorn-logo.png    ← Logókép (ha megvan)
hatter.gif          ← Háttér animáció (ha megvan)
kep1.jpg, kep2.jpg  ← Rólunk szekció fotók (ha megvan)
```

---

## 1. lépés — Tárhelyszolgáltató kiválasztása

**Ajánlott ingyenes megoldások (kis forgalmú weboldalhoz tökéletes):**

| Szolgáltató      | Ingyenes csomag | Domain összeköthető? | Sebesség |
|------------------|-----------------|----------------------|----------|
| **Netlify**      | ✅ Igen          | ✅ Igen               | ⭐⭐⭐⭐⭐ |
| **GitHub Pages** | ✅ Igen          | ✅ Igen               | ⭐⭐⭐⭐   |
| **Cloudflare Pages** | ✅ Igen      | ✅ Igen               | ⭐⭐⭐⭐⭐ |

👉 **Ajánlás: Netlify** — a leglegyszerűbb, csak drag-and-drop feltöltés kell.

---

## 2. lépés — Netlify-ra feltöltés (legegyszerűbb módszer)

1. Menj a https://netlify.com oldalra
2. Regisztrálj (Google-fiókkal is lehet)
3. A főoldalon kattints: **"Add new site" → "Deploy manually"**
4. Húzd rá az egész mappát a böngésző ablakára (drag & drop)
5. Kész! Kapsz egy automatikus URL-t, pl.: `amazing-redvorn-abc123.netlify.app`

---

## 3. lépés — Saját domain összekapcsolása

Ha van saját domained (pl. `redvorn.hu`):

### A) Netlify oldalán:
1. Site Settings → Domain Management → Add custom domain
2. Add meg: `redvorn.hu`

### B) Domain szolgáltatódnál (pl. Tárhely.eu, Domainregisztrátor stb.):
A DNS-beállításokban add hozzá:

```
Típus: A rekord
Név:   @
Érték: 75.2.60.5        ← Netlify IP-je
TTL:   3600

Típus: CNAME
Név:   www
Érték: [a netlify URL-ed].netlify.app
TTL:   3600
```

⏱ A DNS-változás 30 perctől 24 óráig terjedhet.

### C) HTTPS (SSL) bekapcsolása Netlify-on:
Site Settings → Domain Management → HTTPS → **Enable Netlify's free TLS certificate**
→ Zöld lakat 🔒 az oldaladon!

---

## 4. lépés — Főoldal beállítása

Alapértelmezés szerint a böngésző `index.html` fájlt keres.
Mivel a fő fájlod `redvorn-hu.html`, két megoldás:

**A) Egyszerűbb:** Hozz létre egy `index.html` fájlt ezzel a tartalommal:
```html
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0; url=redvorn-hu.html">
</head>
</html>
```

**B) Elegánsabb (Netlify):** Hozz létre egy `_redirects` nevű fájlt (kiterjesztés nélkül):
```
/  /redvorn-hu.html  200
```

---

## 5. lépés — Valódi e-mail küldés az űrlaphoz

Jelenleg az űrlap csak a "Köszönjük" üzenetet mutatja.
Ha valódi e-mailt akarsz kapni, a **Formspree** ingyenes és egyszerű:

1. Regisztrálj: https://formspree.io
2. Hozz létre egy új Form-ot → kapod az URL-t (pl. `https://formspree.io/f/abcd1234`)
3. A `redvorn-hu.html`-ben keresd meg ezt a sort:
   ```html
   <form id="kapcsolatUrlap">
   ```
   Módosítsd erre:
   ```html
   <form id="kapcsolatUrlap" action="https://formspree.io/f/abcd1234" method="POST">
   ```
4. A `main.js`-ben a fetch kommentet is szedd ki (ott is jelölve van)

---

## 6. lépés — Logók és képek hozzáadása

A HTML-ben mindenhol jelöltem a helyeket megjegyzésekkel:

- **Logó (nav + footer + hero):** Keresd a `<!-- <img src="redvorn-logo.png"` sorokat, szedd ki a kommentet és töröld a szöveges fallbacket
- **GIF háttér (hero):** Keresd a `<!-- <img src="hatter.gif"` sort
- **Rólunk fotók:** Minden `<div class="dia">` belsejébe egy `<img src="kepX.jpg">` tag kell

---

## Gyorslista — Mit kell megváltoztatni az induláshoz

- [ ] Valódi nevek, telefonszámok, e-mailek a Kapcsolat szekcióban
- [ ] Logókép feltöltve és beillesztve
- [ ] GIF háttér feltöltve (ha megvan)
- [ ] Rólunk fotók feltöltve
- [ ] Formspree integrálva (ha kell e-mail küldés)
- [ ] `index.html` redirect fájl létrehozva
- [ ] Domain összekapcsolva
- [ ] SSL bekapcsolva

---

*Kérdés esetén minden sor mellett komment jelzi mit kell szerkeszteni.*
