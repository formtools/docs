#!/bin/bash

#-----------------------------------------------------------------------------------------------------------------------
# This is a quick helper script to wipe out the gh-pages branch with the latest from github's master branch.
#
# WARNING! Only ever run this script if your master branch has been fully checked in. Otherwise you may lose your
# changes. You Have Been Warned.
#-----------------------------------------------------------------------------------------------------------------------

git checkout gh-pages
git reset --hard origin/master
git push origin gh-pages
git checkout master
