# Dockerfile
# 使用node做为镜像
FROM nginx:1.15.5-alpine
# MAINTAINER 维护者信息
MAINTAINER lsiten
WORKDIR /app
# 拷贝文件
COPY ./dist /app/dist
COPY ./favicon.ico /app/dist
COPY ./nginx/default.conf /ert/nginx/conf.d/
# 暴露端口
EXPOSE 8000
# 启动代理服务器
ENTRYPOINT ["nginx", "-g", "daemon off;"] 