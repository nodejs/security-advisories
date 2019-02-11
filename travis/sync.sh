#! /bin/sh
echo "Script is running"

setup_git_user(){
    git config --global user.email "travis@travis-ci.org"
    git config --global user.name "travis"
}

set_git_remote(){
    git remote -v
    git remote remove origin
    git remote add origin https://travis:${GH_TOKEN}@github.com/nodejs/security-advisories.git 
}

sync_files(){
    node tools/sync_up.js
}

commit_vuln_db(){
    git checkout master
    git add ecosystem
    git add core
    git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

push_changes(){
    git push origin master
}
 
setup_git_user
set_git_remote
sync_files
commit_vuln_db
push_changes
