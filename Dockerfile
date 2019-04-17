# Dockerfile
# 使用node做为镜像
FROM node
# MAINTAINER 维护者信息
MAINTAINER lsiten
#安装nginx
RUN sudo yum install -y nginx
#删除nginx 默认配置
RUN rm /etc/nginx/conf.d/default.conf
#添加自己的配置
ADD nginx/default.conf /etc/nginx/conf.d/
# 在容器中创建该目录
RUN mkdir -p /home/project
# 设置容器的项目目录为该目录
WORKDIR /home/project/
# 容器创建完成后执行的命令
CMD npm install --registry=https://registry.npm.taobao.org && node build/build.js
# 启动nginx
RUN sudo systemctl start nginx.service