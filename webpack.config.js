module.exports = {
    entry: './src/app.js',
    output: {
      filename: './dist/app.bundle.js'
    },
    module: {
        rules: [
          // ... other rules omitted
    
          // this will apply to both plain `.scss` files
          // AND `<style lang="scss">` blocks in `.vue` files
          {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass'],
          }
        ]
      },
  };
  