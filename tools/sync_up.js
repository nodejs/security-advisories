'use strict';
const fs = require('fs');
const path = require('path');

const SWG_ROOT_SRC = path.join(__dirname, '..', 'node_modules', 'security-wg', 'vuln');
const NPM_TARGET_ROOT = path.join(__dirname, '..', 'ecosystem');
const CORE_TARGET_ROOT = path.join(__dirname, '..', 'core');

// collect and set up ecosystem reports
const npmPath = path.join(SWG_ROOT_SRC, 'npm');
fs.readdirSync(npmPath).forEach((vulnname) => {

        const rawContent = fs.readFileSync(path.join(npmPath, vulnname));
        const content = JSON.parse(rawContent);
        const pkg = content.module_name;

        const targetPath = path.join(NPM_TARGET_ROOT, pkg);
        if(!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath);
        }
        fs.writeFileSync(path.join(targetPath, vulnname), rawContent);
    });

// same for core vulns
fs.readdirSync(path.join(SWG_ROOT_SRC, 'core'))
    .forEach((vulnname) => {

        const rawContent = fs.readFileSync(path.join(SWG_ROOT_SRC, 'core', vulnname));

        const targetPath = CORE_TARGET_ROOT;
        fs.writeFileSync(path.join(targetPath, vulnname), rawContent);
    });



