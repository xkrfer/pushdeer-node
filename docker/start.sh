cd /release/push

if [ $1 == 'railway' ]; then
    pm2 start railway.config.js
else
    pm2 start host.config.js
fi

node /release/dist/main.js

