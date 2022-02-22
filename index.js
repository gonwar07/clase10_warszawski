
const path = require('path');
const rutasApi = require('./routers/index');
const { engine } = require('express-handlebars');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;
const productos = [];

// Middlewares
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Template engines
//HANDLEBARS
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main.hbs',
  layoutsDir: path.resolve(__dirname, './views/hbs/layouts'),
  partialsDir: path.resolve(__dirname, './views/hbs/partials')
}));
app.set('views', './views/hbs');
app.set('view engine', 'hbs');

//EJS
// app.set('views', './views/ejs');
// app.set('view engine', 'ejs');

//PUG
// app.set('views', './views/pug');
// app.set('view engine', 'pug');

// ----------------------------------------------------------------------------

// Rutas
app.use('/api', rutasApi);

//HANDLEBARS
app.get('/', (req, res) => {
  const prod = ()=>{
    if(productos > 0){
      return {productos: true};
    } else{
      return {productos: false};
    }
  };
  res.render('index', prod());
});
app.post('/productos', (req, res) => {
  productos.push(req.body);
  res.redirect('/');
});
app.get('/productos', (req, res) =>{
  res.render('./productos', {productos});
});

// EJS
// app.get('/', (req, res) => {
//    res.render('index', { productos });
// });

// app.post('/productos', (req, res) => {
//   productos.push(req.body);
//   res.redirect('/');
// });

// app.get('/productos', (req, res) => {
//   res.render('productos', {productos});
// });

// PUG
// app.get('/', (req, res) => {
//   res.render('main', { productos });
// });

// app.post('/productos', (req, res) => {
//   productos.push(req.body);
//   res.redirect('/');
// });

// app.get('/productos', (req, res) => {
//   res.render('mainProductos', {productos});
// });


const connectedServer = app.listen(PORT, () => {
  console.log(`Servidor activo y escuchando en el puerto ${PORT}`);
});

connectedServer.on('error', (error) => {
  console.log(error.message);
});