## webpack, express를 사용하여 server까지 포괄한, gulp와 동일한 환경 세팅 시도 중

### 1. npm install

- client
  - npm i -D webpack webpack-cli
  - npm i -D babel-loader @babel/preset-env @babel/core
  - npm i -D style-loader css-loader sass-loader sass
  - npm i -D mini-css-extract-plugin
  - npm i -D html-loader
  - npm i -D html-webpack-plugin
  - npm i -D copy-webpack-plugin image-webpack-loader file-loader
  - npm i -D webpack-dev-server
- server
  - npm i -D webpack-dev-middleware webpack-hot-middleware
  - npm i -D livereload connect-livereload
  - npm i -S nodemon
  - npm i -S concurrently
  - npm i -S express
- socket.io
  - npm i -S socket.io socket.io-client
- file - Create, Delete, Modify
  - npm i -S chokidar
- clear cache
  - npm i -S rimraf

### 2. 실행 순서

- npm run start
- client : http://localhost:3000
- server : http://localhost:5000
- 모든 수정은 client(http://localhost:3000) 에서 확인

### 3. 현재 상황

- src의 파일을 수정할 경우 localhost:3000에서 잘 반영됨
- socket.io 연동함
- html, js 파일 삭제 시, dist에 연동 안되고 있음

### 4. 할 일

- server.js에서 html을 삭제할 경우, webpack.config.js의 Entrypoint에 반영이 안됨
- 그래서 src 폴더의 index.html을 삭제해도 삭제한 index Entrypoint를 찾음
- 캐시삭제, webpack server 재가동 시도해봤으나 안됨 이 방법은 아닌듯 함
- server.js의 watcher.on unlink 계속 테스트 필요
- 할 수 있다!!
- image 파일에 hash를 붙이면, html img src가 적용안됨, js에서 임포트한 이미지로 강제지정 필요
- 이미지 경로 지정 공통화 필요

### 5. 느끼는 점

- gulp와 webpack
  - 공통점 :
    - html, css, js를 수정하고, 동시에 dist에 번들링된다.
    - 작업 파일을 수정하면 브라우저에 바로바로 반영이 된다.
  - 차이점 :
    - 작업 환경에서 html,css,js를 추가, 삭제하면 dist에 바로바로 반영 되고, 안되고 차이가 있다.
  - gulp
    - 목적
      - html, css, js를 수정하고, 동시에 dist에 번들링된다.
      - 작업 파일을 수정하면 브라우저에 바로바로 반영이 된다.
      - 작업 환경에서 모든 파일(html,css,js)을 추가, 삭제하면 dist에 바로바로 반영 된다.
    - 브라우저의 url로 같은 wifi 환경에서, 같은 url로 핸드폰에서 볼 수 있다.
    - 이 정해진 기능을 구현하는 방식
  - webpack
    - 목적 :
      - 작업 완료된 파일을 dist에 번들링한다.
    - 작압 완료 후 번들링 이기 때문에, 어떤 파일을 번들링 할 지 지정한다.
    - 위에 설명한 gulp와 동일한 기능을 구현할 수 있다.
    - 원하는 기능을 구현하는 방식
