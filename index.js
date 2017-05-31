const { createElement } = require('react');
const { renderToString } = require('react-dom/server');
const merry = require('merry');
const fs = require('fs');

require('babel-core/register');
require('babel-polyfill');

const App = require('./src/App').default;
const version = require('./package').version;

const port = process.env.PORT ? Number(process.env.PORT) : 8080;

const app = merry();

app.listen(port);

app.route('GET', '/', (req, res, ctx) => {
  const index = fs.readFileSync('./public/index.html');
  ctx.send(200,
    index.toString()
      .replace('{{app}}', renderToString(createElement(App, { from: 'Server' })))
      .replace('{{version}}', version));
});

app.route('GET', '/javascripts/bundle.js', (req, res, ctx) => {
  const bundle = fs.readFileSync('./public/javascripts/bundle.js');
  ctx.send(200, bundle.toString());
});

app.route('default', (req, res, ctx) => {
  const error = fs.readFileSync('./public/error.html');
  ctx.send(404,
    error.toString()
      .replace('{{version}}', version));
});
