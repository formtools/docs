#!/bin/bash
git checkout gh-pages
git reset --hard origin/master
git push origin gh-pages
git checkout master
