cd /release/push

pm2 start ecosystem.config.js

node /release/dist/main.js
