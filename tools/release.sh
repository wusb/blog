#!/bin/bash

/usr/bin/rsync -av \
	--delete \
    --exclude '.git' \
    --exclude '.DS_Store' \
    --exclude 'Runtime' \
    -e 'ssh -p 22' \
    ./dist/ root@115.28.222.218:/alidata/www/simbawu/simba/blog
