# vux-template

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

#docker 启动命令
docker run -d -p 80 -e HOST_IP=<域名> --privileged=true --name nodeapp -p 3000:3000 -v /root/jenkins_node1/workspace/node:/app/dist node
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
