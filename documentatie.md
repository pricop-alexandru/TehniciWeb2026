# Documentatie Proiect OnlyMerch

## Etapa 2: Schema Cromatica (identificator: schema-cromatica)

### Schema cromatica aleasa

Culorile au fost generate cu [Adobe Color Wheel](https://color.adobe.com/create/color-wheel), avand culoarea principala in centrul tool-ului.

| Pozitie | Hex | Rol in schema |
|---------|-----|---------------|
| Centru (principala) | `#754DF7` | Culoare de baza, accent principal |
| Stanga 1 | `#704AEF` | Varianta deschisa, highlight |
| Stanga 2 | `#6040CD` | Ton mediu, borduri |
| Dreapta 1 | `#5035AB` | Ton inchis, text secundar |
| Dreapta 2 | `#48348A` | Cel mai inchis, text principal |

### Motivul alegerii

**Tipul schemei:** Monocromatica / analoaga (nuante de violet indigo).

**Legatura cu tema site-ului:** OnlyMerch vinde funny t-shirts si hoodies inspirate din meme-uri si cultura pop. Violetul transmite creativitate, originalitate si un ton young/playful, potrivit pentru un public care apreciaza umorul si designurile neconventionale.

**Psihologia culorilor:**
- Violetul asociaza imaginatie, expresie si nonconformism
- Comunică un mesaj modern si cool, nu corporate
- Indigo/violet functioneaza bine pentru branduri creative si lifestyle
- Nuanta aleasa (#754DF7) e suficient de vioaie pentru a atrage atentia, dar nu agresiva

### Variabile CSS definite

Variabilele sunt definite in `body` (fisier `resources/css/style.css`) si folosite in tot CSS-ul proiectului (fara valori hex hardcodate in regulile de stil).

---

## Etapa 2: Layout Responsive (identificator: layout-responsive)

### Principii de design si ierarhie vizuala

- **Contrast:** Header si footer folosesc culori inchise (primary, darker) pe fond deschis; zonele de continut au background alternativ pentru delimitare.
- **Proximitate:** Elemente legate (zone in grid) sunt grupate; spatiere consistenta (gap) intre zone.
- **Aliniere:** Grid asigura aliniere pe coloane; zonele se stack pe ecran mic.
- **Repetitie:** Schema cromatica si unitatile rem se aplica consistent.
- **Ierarhie vizuala:** Zona 1 (prezentare) e prima si cea mai mare; zonele 2 si 7 au mai mult spatiu (2fr) decat vecinele pentru accentuare.
- **Responsive:** Breakpoints la 768px si 1200px; ecran mic = o coloana, fara animatii; font-size scade cu viewport-ul (16px -> 17px -> 18px).

### Grid si zone

- **Ecran mare (≥1200px):** zone1 | zone3 zone2 zone4 | zone8 | zone7 zone5 zone6
- **Ecran mediu (768-1199px):** 2 coloane, zone2 si zone7 full-width
- **Ecran mic (<768px):** o coloana, toate zonele stack

---

## Etapa 2: Stilizare Taburi (identificator: stilizare-taburi)

Linkurile catre iframe (Video 1, 2, 3) sunt stilizate ca taburi verticale. Layout flexbox: taburi stanga, iframe dreapta. Taburi: colțuri rotunjite, border violet, fundal deschis inactiv, fundal inchis + text alb la hover/active. Iframe: border gros violet, fundal alb.

---

## Etapa 2: Stilizare Tabel (identificator: stilizare-tabel)

Caption sub tabel (caption-side: bottom). Borduri coloane alternate c1/c2 (par-impar: color-mid, impar-par: color-dark). Borduri groase (3px) thead/tbody si tbody/tfoot. Hover pe rand: box-shadow inset 0.5s. Container overflow-x auto pe ecran mic/mediu.

---

## Etapa 2: Link Top (identificator: link-top)

Buton fix dreapta jos, fara imagini. Paranteze: block cu border-left/right rotunjite, fara top/bottom. Triunghi: div cu border trick (transparent stanga/dreapta, colorat jos). Hover: triunghi urca, schimba culoare, opacity 1, tooltip afisat. Semi-transparent implicit.

---

## Design rudimentar

- **Spatiere:** variabile --spacing-page, --grid-gap, --zone-padding; descresc pe ecran mediu/mic
- **Gap:** intre celule grid, responsive
- **Izolare vizuala:** header/footer/zone cu background diferit, border, border-radius, box-shadow (min 3 efecte)
- **Padding:** egal pentru zone (--zone-padding)
- **Media:** img, iframe, object cu width %, min-width, max-width responsive
- **Font extern:** Nunito (Google Fonts)
- **Iconuri Font Awesome:** fa-shirt static in header, fa-truck animate (fa-bounce) la Free Shipping

---

## Etapa 3: Variante Meniu (identificator: variante-meniu)

### Implementare HTML

- Meniul a fost inlocuit in `index.html` (in interiorul `header`) cu un meniu derulant folosind `nav > ul > li > a` (submeniuri cu `ul` imbricat).
- In `index.html` meniul include:
  - Checkbox toggle pentru hamburger (`input.nav-toggle` + `label.nav-burger`).
  - Optiuni principale cu iconuri Font Awesome si text (`.nav-text`).
  - Submeniu 1 pentru pagina principala/sectiuni din prima pagina (ex: `#zone1`, `#zone2`, `#zone3`, etc.).
  - Submeniu 2 pentru linkuri catre pagini din site (ex: `shop.html`, `newsletter.html`, `contact.html`).

### Implementare SASS/CSS

- Stile pentru meniu sunt in `resources/css/style.css` (compilate manual).
- Sursa SCSS este in `resources/scss/variante-meniu.scss`.
- Comportamente (desktop):
  - Hover pe optiune: umbre/text-shadow care "aluneca" in sus pana se aliniaza, plus schimbare culoare a "butonului"-link.
  - Deschidere submeniu: animatie cu `transform: scaleY(0) -> scaleY(1)`.
  - Hover pe suboptiune: underline progresiv (pseudo-element `::after` cu `transform: scaleX`).

### Responsive

- Pe ecran mediu (<1200px): textul se ascunde (`.nav-text`), raman iconurile.
- Pe ecran mic (<768px):
  - Se afiseaza hamburger-ul.
  - Submeniul se deschide prin checkbox (`.nav-toggle:checked ~ .nav-menu`).
  - Textul este comprimat/anima in aparitie (letter spacing + scaleX), iar umbrele initiale sunt dezactivate pe hover pentru acest breakpoint.

---

## Etapa 3: CSS Printare (identificator: css-printare)

### Ce face la print (`@media print`)

- Bannerul „Acesta este un proiect școlar!” este afisat sus in prima pagina (80% latime, border negru punctat).
- Meniul si butonul „Back to Top” sunt ascunse la print.
- Imaginile, video/iframe/object si elementele dependente (ex: `figure`, `figcaption`) sunt ascunse.
- Gridul din `main.layout-grid` este fortat sa fie `display: block` ca sa nu se taie celulele.
- Toate linkurile apar ca text normal (fara colorare/subline).
- `h1` (titlul site-ului) este centrat vertical si orizontal pe prima pagina, este subliniat si are font-size de ~2.5 ori fata de font-size-ul html-ului.
- Se face `page-break` dupa heading (header) si inainte de footer.
- Se afiseaza un watermark pe fiecare pagina: dimensiune 100px x 2cm, border dublu, opacity 0.65.
- Se seteaza margini diferite in functie de pagina stanga/dreapta prin `@page :left` / `@page :right` (stanga: 2.5cm/0.5cm, dreapta: invers).

---

## Etapa 4 (partea 1) - Server Express + EJS

- **Pornire:** din folderul proiectului rulezi `npm start` sau `node index.js`. Serverul asculta pe **http://localhost:8080**.
- **Fisiere principale:** `index.js`, `package.json`, `erori.json`, `views/fragmente/`, `views/pagini/`, resurse statice in `resources/` expuse la `/resources/...`.
- **Rute:** `GET /`, `/index`, `/home` randeaza `pagini/index.ejs`. Ultimul `GET /:pagina` randeaza `pagini/<pagina>.ejs` sau 404 (prin callback la `render`).
- **Erori:** `erori.json` + imagini in `resources/img/erori/`.
