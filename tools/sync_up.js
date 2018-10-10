'use strict';
const fs = require('fs');
const path = require('path');

const SWG_ROOT = path.join(__dirname, '..', 'node_modules', 'security-wg', 'vuln');
const NPM_TARGET_ROOT = path.join(__dirname, '..', 'ecosystem');

// collect and set up ecosystem reports
fs.readdirSync(path.join(SWG_ROOT, 'npm'))
    .forEach((vulnname) => {

        const rawContent = fs.readFileSync(path.join(SWG_ROOT, 'npm', vulnname));
        const content = JSON.parse(rawContent);
        const pkg = content.module_name;

        const targetPath = path.join(NPM_TARGET_ROOT, pkg);
        if(!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath);
        }
        if (!fs.existsSync(path.join(targetPath, vulnname))) {
            fs.writeFileSync(path.join(targetPath, vulnname), rawContent);
        }
    });


