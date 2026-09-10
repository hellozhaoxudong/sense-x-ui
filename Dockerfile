FROM registry.cn-shanghai.aliyuncs.com/sense-ai/nginx:1.27.0-alpine-perl

EXPOSE 80

# 配置文件
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

# 环境变量脚本
COPY ./docker/env.sh /opt

# 前端文件
RUN mkdir -p /app/html
COPY ./dist /app/html/

# 环境变量脚本赋权
ENV MS_URL=127.0.0.1:9100
ENV AI_URL=127.0.0.1:9101
WORKDIR /opt
RUN chmod a+x ./env.sh

# 容器每次启动都执行脚本以将环境变量传入容器中
CMD ["sh", "env.sh"]