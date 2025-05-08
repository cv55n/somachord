import { randomBytes } from "crypto";
import { existsSync, unlinkSync, appendFileSync } from "fs";
import { createInterface } from "readline";
import { execSync } from "child_process";

import { Cyan, Bright, Green } from "./sub/console-text.js";

let envPath = './.env';
let q = `${Cyan('?')} \x1b[1m`;
let ob = { streamSalt: randomBytes(64).toString('hex') }
let rl = createInterface({ input: process.stdin,output: process.stdout });

console.log(
    `${Cyan("welcome to somachord!")}\n${Bright("we'll get you up and running in no time.\nlet's start by creating a ")}${Cyan(".env")}${Bright(" file. you can always change it later.")}`
);

console.log(
    Bright("\nwhat's the selfurl we'll be running on? (localhost)")
);

rl.question(q, r1 => {
    if (r1) {
        ob['selfURL'] = `https://${r1}/`;
    } else {
        ob['selfURL'] = `http://localhost`;
    }

    console.log(Bright("\ngreat. now, what's the port we'll be running on? (9000)"));

    rl.question(q, r2 => {
        if (!r1 && !r2) {
            ob['selfURL'] = `http://localhost:9000/`;

            ob['port'] = 9000;
        } else if (!r1 && r2) {
            ob['selfURL'] = `http://localhost:${r2}/`;

            ob['port'] = r2;
        } else {
            ob['port'] = r2;
        }

        final();
    });
})

let final = () => {
    if (existsSync(envPath)) {
        unlinkSync(envPath);
    }
    for (let i in ob) {
        appendFileSync(envPath, `${i}=${ob[i]}\n`);
    }
    console.log(Bright("\ni've created a .env file with selfurl, port, and stream salt."));
    console.log(`${Bright("now i'll run")} ${Cyan("npm install")} ${Bright("to install all dependencies. it shouldn't take long.\n\n")}`);

    execSync('npm install',{stdio:[0,1,2]});

    console.log(`\n\n${Green("all done!\n")}`);
    console.log("you can re-run this script any time to update the configuration.");
    console.log("\nyou're now ready to start the main project.\nhave fun!");

    rl.close();
}