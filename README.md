### npm install

- client
  - npm i -D webpack webpack-cli
  - npm i -D babel-loader @babel/preset-env @babel/core
  - npm i -D style-loader css-loader sass-loader sass
  - npm i -D mini-css-extract-plugin
  - npm i -D html-loader
  - npm i -D html-webpack-plugin
  - npm i -D webpack-dev-server
- server
  - npm i -D webpack-dev-middleware webpack-hot-middleware
  - npm i -D livereload connect-livereload
  - npm i -S nodemon
  - npm i -S concurrently
  - npm i -S express
- socket.io
  - npm i -S socket.io socket.io-client
- file system
  - npm i -S chokidar
  - npm i -S rimraf

### 실행 순서

- npm run start
- client : http://localhost:3000
- server : http://localhost:5000
- 모든 수정은 client(http://localhost:3000) 에서 확인

### 현재 상황

- src의 파일을 수정할 경우 localhost:3000에서 잘 반영됨
- socket.io 연동함

### 할 일

- server.js에서 html을 삭제할 경우, webpack.config.js의 Entrypoint에 반영이 안됨
- 그래서 src 폴더의 index.html을 삭제하도 Entrypoint를 찾음
- server.js의 watcher.on unlink 계속 테스트 필요
- 할 수 있다!!
