# /bin/bash

# 设置环境变量，指定后端地址
echo set \$MS_URL $MS_URL\; >> /etc/nginx/conf.d/env.variable

echo "Sense UI 启动"
nginx -g 'daemon off;'
