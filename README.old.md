# nasa-apod

###### 필요 모듈 설치
$ yarn add axios classnames sass-loader node-sass include-media open-color better-react-spinkit react-icons moment
axios: Promise 기반 웹 요청 클라이언트
classnames: CSS Module 과 조건부 className 을 설정 하는 것을 도와주는 라이브러리
sass-loader, node-sass: 프로젝트에서 Sass 를 사용하기 위하여 필요한 도구
include-media, open-color: Sass 라이브러리 (반응형 디자인, 색상 팔레트)
better-react-spinkit: 로딩 시 보여줄 컴포넌트
react-icons: SVG 형태의 리액트 컴포넌트 모음 라이브러리
moemnt: 날짜 관련 라이브러리

###### Sass + CSS Module 적용
우리의 프로젝트에는 Sass 와 CSS Module 을 함께 사용하겠습니다.
config 디렉토리 내부의 webpack.config.dev.js 파일을 열어서 style-loader 를 검색해보세요.
config/webpack.config.dev.js – css 설정 부분
{
  test: /\.css$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
  ],
},

이런 부분이 보여질 것입니다. 해당 부분을 그대로 복사하여 바로 아래에 붙여넣으세요. 
그리고, 확장자를 scss 로 변경하고, css-loader 의 options 를 설정하고, 배열의 끝에 sass-loader 를 설정하세요.
{
  test: /\.css$/,
  (...)
},
{
  test: /\.scss$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
        modules: true,
        localIdentName: '[name]__[local]__[hash:base64:5]'
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
    {
      loader: require.resolve('sass-loader'),
      options: {
        includePaths: [paths.styles]
      }
    }
  ],
},

여기서, sass-loader 쪽에 includePaths 를 넣어주었는데, 이 값은 sass 에서 공통적으로 사용되는 유틸 함수들을 필요할 때 import ../../styles/utils 형식으로 작성 할 필요 없이 @import 'utils'; 형태로 불러 올 수 있게 해주는 설정입니다.
그러려면, paths.styles 를 설정해주어야 하는데요, 이 값은 config.paths.js 파일 내부에 있습니다.
다음과 같이 파일의 맨 끝에 styles 값도 설정하세요.
config/paths.js
// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
  styles: resolveApp('src/styles')
};
