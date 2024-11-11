module.exports = {
    mode: 'production',
    entry: ['./src/main.js', './src/loader.js'],
    output: {
      filename: './bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    }	
  };