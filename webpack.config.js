const path = require("path");
const nodeExternals  = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

    /**
     * 시작 지점 설정
     */
    entry: {
        'index': './src/index.js',
    },

    /**
     * fs 모듈 찾을 수 없다는 오류 방지용
     */
    target: 'node',

    /**
   * webpack4 의 신기능
   * development, production
   * production 이면 배포용 최적화가 자동 진행
   */
    mode: process.env.mode || 'production',

    /**
     * node_modules가 빌드 과정에 포함되어 발생하는 문제 해결
     * 아래와 같은 오류 발생하는것을 막아줌
     * WARNING in ./node_modules/express/lib/view.js 81:13-25
     * Critical dependency: the request of a dependency is an expression
     *  @ ./node_modules/express/lib/application.js
     *  @ ./node_modules/express/lib/express.js
     *  @ ./node_modules/express/index.js
     *  @ ./src/index.js
     */
    externals: [nodeExternals()],

    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            /**
             * babel 처리
             * cache 로 빠른 빌드에 도움
             */
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                        ],
                        cacheDirectory: true
                    }
                }
            }
        ],
    },
    
    /**
     * moduleIds : 'hsahed' : 캐시 사용으로 빠르게 처리
     */
    optimization: {
        moduleIds: 'hashed'
    },

    plugins: [
        new CleanWebpackPlugin(),
    ]
}