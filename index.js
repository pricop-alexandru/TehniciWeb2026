/**
 * Server Express + EJS - OnlyMerch
 * etapa 4 cerinta 1: npm init + express + ejs (vezi package.json)
 * etapa 4 cerinta 2: server pe port 8080
 * etapa 4 cerinta 3: log __dirname, __filename, process.cwd() + explicatie
 * etapa 4 cerinta 4: views + subfoldere pagini / fragmente + motor ejs
 * etapa 4 cerinta 5: include() in fisiere .ejs
 * etapa 4 cerinta 6: folder resources ca static /resources
 * etapa 4 cerinta 7: cai absolute /resources/...
 * etapa 4 cerinta 8: rute ['/', '/index', '/home']
 * etapa 4 cerinta 9-10: ultimul app.get /:pagina + render cu callback
 * etapa 4 cerinta 11-14: erori.json, obGlobal, initErori, afisareEroare, eroare.ejs
 * etapa 4 cerinta 15: pagina despre (+ newsletter, contact in meniu)
 * etapa 4 cerinta 16: fara shop produse / login (omise)
 * etapa 4 cerinta 17: IP in res.locals.clientIp
 * etapa 4 cerinta 18: /resources/.../ cu trailing slash -> 403
 * etapa 4 cerinta 19: cereri .ejs -> 400; favicon.ico -> sendFile
 * etapa 4 cerinta 20: vect_foldere + mkdir cu path.join
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

// etapa 4 cerinta 13 - variabila globala
const obGlobal = {
    obErori: null
};

const PORT = 8080;

// etapa 4 cerinta 20 - foldere generate de aplicatie
const vect_foldere = ['temp', 'logs', 'backup', 'fisiere_uploadate'];
vect_foldere.forEach((folder) => {
    const folderPath = path.join(__dirname, folder);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
});

// etapa 4 cerinta 13 - incarcare erori din JSON
function initErori() {
    const eroriPath = path.join(__dirname, 'erori.json');
    const raw = fs.readFileSync(eroriPath, 'utf8');
    const data = JSON.parse(raw);
    const baseAbs = path.join(__dirname, data.cale_baza);

    data.info_erori = data.info_erori.map((e) => ({
        ...e,
        imagine: path.join(baseAbs, path.basename(e.imagine))
    }));

    if (data.eroare_default && data.eroare_default.imagine) {
        data.eroare_default = {
            ...data.eroare_default,
            imagine: path.join(baseAbs, path.basename(data.eroare_default.imagine))
        };
    }

    data._baseAbs = baseAbs;
    obGlobal.obErori = data;
}

function imagineAbsToUrl(absPath) {
    if (!absPath) return '';
    const rel = path.relative(path.join(__dirname), absPath);
    return '/' + rel.split(path.sep).join('/');
}

/**
 * etapa 4 cerinta 14
 * @param {import('express').Response} res
 * @param {number|null|undefined} identificator
 * @param {string|undefined} titlu
 * @param {string|undefined} text
 * @param {string|undefined} imagine - cale relativa la cale_baza sau URL
 */
function afisareEroare(res, identificator, titlu, text, imagine) {
    const data = obGlobal.obErori;
    if (!data) {
        res.status(500).send('Erori neincarcate');
        return;
    }

    let sursa = null;
    if (identificator != null && identificator !== undefined) {
        sursa = data.info_erori.find((e) => e.identificator === identificator) || null;
    }
    if (!sursa) {
        sursa = { ...data.eroare_default, identificator: null, status: false };
    }

    const titluF = titlu !== undefined ? titlu : sursa.titlu;
    const textF = text !== undefined ? text : sursa.text;

    let imagineUrl;
    if (imagine !== undefined) {
        if (imagine.startsWith('http') || imagine.startsWith('/')) {
            imagineUrl = imagine;
        } else {
            imagineUrl = imagineAbsToUrl(path.join(data._baseAbs, path.basename(imagine)));
        }
    } else if (sursa.imagine) {
        imagineUrl = imagineAbsToUrl(sursa.imagine);
    } else {
        imagineUrl = '';
    }

    if (sursa.status === true && sursa.identificator != null) {
        res.status(sursa.identificator);
    }

    res.render(
        'pagini/eroare',
        { titlu: titluF, text: textF, imagine: imagineUrl },
        (err, html) => {
            if (err) {
                console.error(err);
                res.status(500).send('Eroare la randarea paginii de eroare');
                return;
            }
            res.send(html);
        }
    );
}

function renderPagina(res, numeFisier, locals) {
    res.render(`pagini/${numeFisier}`, locals || {}, (err, html) => {
        // etapa 4 cerinta 10
        if (err && err.message && err.message.startsWith('Failed to lookup view')) {
            afisareEroare(res, 404);
            return;
        }
        if (err) {
            console.error(err);
            afisareEroare(res, 500);
            return;
        }
        res.send(html);
    });
}

initErori();

const app = express();

// etapa 4 cerinta 2
// etapa 4 cerinta 3
console.log('__dirname:', __dirname);
console.log('__filename:', __filename);
console.log('process.cwd():', process.cwd());
console.log(
    'Sunt __dirname si process.cwd() mereu la fel? Nu: __dirname = folderul fisierului curent; cwd = directorul din care ai pornit node (ex: npm start din alta cale).'
);

// etapa 4 cerinta 4 - motor views EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// etapa 4 cerinta 17 - IP vizitator (disponibil in toate paginile)
app.use((req, res, next) => {
    res.locals.clientIp = req.ip || req.socket.remoteAddress || '';
    next();
});

// etapa 4 cerinta 19 - cereri catre fisiere .ejs
app.use((req, res, next) => {
    if (req.path.toLowerCase().endsWith('.ejs')) {
        afisareEroare(res, 400);
        return;
    }
    next();
});

// etapa 4 cerinta 19 - favicon.ico
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'resources', 'ico', 'favicon.ico'));
});

// etapa 4 cerinta 6 + 7 + 18 - resurse statice
app.use('/resources', (req, res, next) => {
    if (req.path !== '/' && req.path.endsWith('/')) {
        afisareEroare(res, 403);
        return;
    }
    next();
});
app.use('/resources', express.static(path.join(__dirname, 'resources')));

// etapa 4 cerinta 8
app.get(['/', '/index', '/home'], (req, res) => {
    renderPagina(res, 'index', { titluPagina: 'OnlyMerch - Funny T-Shirts & Hoodies' });
});

// etapa 4 cerinta 15 - pagina suplimentara (despre)
// (rute explicite inainte de catch-all)

// etapa 4 cerinta 9 + 10 - ultimul app.get: orice /:pagina (trebuie ultimul dintre app.get)
app.get('/:pagina', (req, res) => {
    const { pagina } = req.params;
    if (pagina === 'favicon.ico') {
        res.status(404).end();
        return;
    }
    renderPagina(res, pagina, { titluPagina: `OnlyMerch - ${pagina}` });
});

app.listen(PORT, () => {
    console.log(`Server pe http://localhost:${PORT}`);
});
