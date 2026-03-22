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
