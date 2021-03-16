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
config 디렉토리 내부의 webpack.config.dev.js 파일을 열어서 sass-loader 를 검색해보세요.
{
  test: sassRegex,
  exclude: sassModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 3,
      sourceMap: isEnvProduction
        ? shouldUseSourceMap
        : isEnvDevelopment,
    },
    'sass-loader'
  ),
  // Don't consider CSS imports dead code even if the
  // containing package claims to have no side effects.
  // Remove this when webpack adds a warning or an error for this.
  // See https://github.com/webpack/webpack/issues/6571
  sideEffects: true,
 },
 
 
해당 부분을 아래 처럼 .concat하여 추가해준다.


{
  test: sassRegex,
  exclude: sassModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 3,
      sourceMap: isEnvProduction
        ? shouldUseSourceMap
        : isEnvDevelopment,
    }).concat({
    loader: require.resolve('sass-loader'),
    options: {
      sassOptions: {
        includePaths: [paths.appSrc + '/styles'],
        sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
      }
    }
  }),
  // Don't consider CSS imports dead code even if the
  // containing package claims to have no side effects.
  // Remove this when webpack adds a warning or an error for this.
  // See https://github.com/webpack/webpack/issues/6571
  sideEffects: true,
 },
