'use strict';
const Fs = require('fs');
const Path = require('path');
const Algolia = require('algoliasearch');

const INDEX_NAME_CORE = 'sec_wg_core';
const INDEX_NAME_ECOSYSTEM= 'sec_wg_ecosystem';

const ALGOLIA_APP_ID = '5X1W7FVRK5';
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;

const client = Algolia(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

const upload = function (indexName, data) {
    const index = client.initIndex(indexName);
    return index.saveObjects(data);
};

const collectCoreVulns = function () {
    const root = Path.join(__dirname, '..', 'core');
    return Fs.readdirSync(root)
        .map((filename) => {
            const id = filename.split('.').shift();
            const data = JSON.parse(Fs.readFileSync(Path.join(root, filename)));
            return Object.assign({ objectID: id }, data);
        });
};


const collectEcosystemVulns = function () {
    const root = Path.join(__dirname, '..', 'ecosystem');
    const data = [];
    Fs.readdirSync(root)
        .forEach((pkgName) => {
            Fs.readdirSync(Path.join(root, pkgName))
                .forEach((filename) => {
                    const content = JSON.parse(Fs.readFileSync(Path.join(root, pkgName, filename)));
                    content.objectID = content.id;
                    data.push(content);
                });
        });
    return data;
};

const fail = function (err) {
    process.exitCode = 1;
    console.error(err);
};


upload(INDEX_NAME_CORE, collectCoreVulns())
    .catch(fail);
upload(INDEX_NAME_ECOSYSTEM, collectEcosystemVulns())
    .catch(fail);

