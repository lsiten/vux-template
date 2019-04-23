# Dockerfile
# 使用node做为镜像
FROM node
# MAINTAINER 维护者信息
MAINTAINER lsiten
# 拷贝文件
RUN mkdir -p /server/project
# 设置容器的工作目录为该目录
WORKDIR /server/project 
# 暴露端口
EXPOSE 3000
# 容器创建完成后执行的命令
CMD npm install --registry=https://registry.npm.taobao.org && node ./server/app.js