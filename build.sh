#!/bin/bash
set -x

npm install --registry=https://registry.npm.taobao.org && node build/build.js
npm run build