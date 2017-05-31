const merry = require('merry');
const fs = require('fs');

const port = process.env.PORT ? Number(process.env.PORT) : 8080;

const app = merry();

app.listen(port);

app.route('GET', '/', (req, res, ctx) => {
  const index = fs.readFileSync('./public/index.html');
  ctx.send(200, index.toString());
});

app.route('default', (req, res, ctx) => {
  const error = fs.readFileSync('./public/error.html');
  ctx.send(404, error.toString());
});
