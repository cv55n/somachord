import "dotenv/config"

import express from "express";
import cors from "cors";
import * as fs from "fs";
import rateLimit from "express-rate-limit";

import { shortCommit } from "./modules/sub/currentCommit.js";
import { appName, genericUserAgent, version, internetExplorerRedirect } from "./modules/config.js";
import { getJSON } from "./modules/api.js";
import renderPage from "./modules/pageRender.js";
import { apiJSON, languageCode } from "./modules/sub/utils.js";
import loc from "./modules/sub/i18n.js";
import { Bright, Cyan } from "./modules/sub/consoleText.js";
import stream from "./modules/stream/stream.js";
import loc, { loadLoc } from "./localization/manager.js";
import { buildFront } from "./modules/build.js"

const commitHash = shortCommit();
const app = express();

app.disable('x-powered-by');

if (fs.existsSync('./.env')) {
    const apiLimiter = rateLimit({
        windowMs: 20 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,

        handler: (req, res, next, opt) => {
            res.status(429).json({
                "status": "error",
                "text": loc(languageCode(req), 'ErrorRateLimit')
            });
        }
    });

    const apiLimiterStream = rateLimit({
        windowMs: 6 * 60 * 1000,
        max: 24,
        standardHeaders: true,
        legacyHeaders: false,

        handler: (req, res, next, opt) => {
            res.status(429).json({
                "status": "error",
                "text": loc(languageCode(req), 'ErrorRateLimit')
            });
        }
    });

    await buildFront();

    app.use('/api/', apiLimiter);
    app.use('/api/stream', apiLimiterStream);
    app.use('/', express.static('./min'));
    app.use('/', express.static('./src/front'));

    app.use((req, res, next) => {
        try {
            decodeURIComponent(req.path);
        } catch (e) {
            return res.redirect(process.env.selfURL);
        }

        next();
    });

    app.get('/api/:type', cors({ origin: process.env.selfURL, optionsSuccessStatus: 200 }), async (req, res) => {
        try {
            switch (req.params.type) {
                case 'json':
                    if (req.query.url && req.query.url.length < 150) {
                        let j = await getJSON(
                            req.query.url.trim(),

                            req.header('x-forwarded-for') ? req.header('x-forwarded-for') : req.ip,

                            languageCode(req),
                            
                            req.query.format ? req.query.format.slice(0, 5) : "mp4",
                            req.query.quality ? req.query.quality.slice(0, 3) : "max"
                        );

                        res.status(j.status).json(j.body);
                    } else {
                        let j = apiJSON(3, { t: loc(languageCode(req), 'ErrorNoLink', process.env.selfURL) });

                        res.status(j.status).json(j.body);
                    }

                    break;

                case 'stream':
                    if (req.query.p) {
                        res.status(200).json({ "status": "continue" });
                    } else if (req.query.t) {
                        let ip = req.header('x-forwarded-for') ? req.header('x-forwarded-for') : req.ip;

                        stream(res, ip, req.query.t, req.query.h, req.query.e);
                    } else {
                        let j = apiJSON(0, { t: loc(languageCode(req), 'ErrorNoStreamID') });

                        res.status(j.status).json(j.body);
                    }

                    break;

                default:
                    let j = apiJSON(0, { t: loc(languageCode(req), 'ErrorNoType') });

                    res.status(j.status).json(j.body);

                    break;
            }
        } catch (e) {
            res.status(500).json({ 'status': 'error', 'text': 'algo deu errado.' });
        }
    });

    app.get("/api", async (req, res) => {
        res.redirect('/api/json')
    });

    app.get("/", async (req, res) => {
        // redireciona para uma página onde eles podem instalar um navegador adequado
        if (req.header("user-agent") && req.header("user-agent").includes("Trident")) {
            if (internetExplorerRedirect.newNT.includes(req.header("user-agent").split('NT ')[1].split(';')[0])) {
                res.redirect(internetExplorerRedirect.new);

                return;
            } else {
                res.redirect(internetExplorerRedirect.old);

                return;
            }
        } else {
            res.send(renderPage({
                "hash": commitHash,
                "type": "default",
                "lang": languageCode(req),
                "useragent": req.header('user-agent') ? req.header('user-agent') : genericUserAgent
            }));
        }
    });

    app.get("/favicon.ico", async (req, res) => {
        res.redirect('/icons/favicon.ico');
    });

    app.get("/*", async (req, res) => {
        res.redirect('/');
    });

    app.listen(process.env.port, () => {
        console.log(`\n${Bright(`${appName} (${version})`)}\n\nurl: ${Cyan(`${process.env.selfURL}`)}\nporta: ${process.env.port}\ncommit atual: ${Bright(`${commitHash}`)}\nhora de início: ${Bright(Math.floor(new Date().getTime()))}\n`);
    });
} else {
    console.log('arquivos de configuração necessários estão faltando. rode "npm run setup" primeiro.');
}