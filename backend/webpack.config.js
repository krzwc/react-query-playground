const path = require('path');
const nodeExternals = require('webpack-node-externals');
// const exec = require('child_process').exec;
// const spawn = require('child_process').spawn;
const WebpackShellPlugin = require('webpack-shell-plugin');

const {
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  target: 'node',
  watch: NODE_ENV === 'development',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    // {
    //   apply: (compiler) => {
    //     compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {

    //       // const child = spawn('npm run run:dev');
    //       // child.stdout.on('data', function (data) {
    //       //     process.stdout.write(data);
    //       // });
    //       // child.stderr.on('data', function (data) {
    //       //     process.stderr.write(data);
    //       // });

    //       exec('npm run run:dev', (err, stdout, stderr) => {
    //         if (stdout) process.stdout.write(stdout);
    //         if (stderr) process.stderr.write(stderr);
    //       });
    //     });
    //   }
    // }
    new WebpackShellPlugin({
      onBuildEnd: ['npm run run:dev']
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader'
        ]
      }
    ]
  }
}

