# security-advisories
Serurity advisories for Node.js and JavaScript ecosytem [WIP]

### Tools

#### tools/sync_up.js
This script is run by the `./travis/sync.sh` script when a build is triggered by `Travis`. It syncs the vulnerability database in the [nodejs/security-wg](https://github.com/nodejs/security-wg) repository with the vulnerability database in this repository to allow for automated backwards compatibility as well as sorting of the vulnerabilities with respect to their names.

Please refer to Security WG repo for now (https://github.com/nodejs/security-wg)
