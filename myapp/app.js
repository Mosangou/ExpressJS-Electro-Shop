const express = require('express');
require('dotenv').config();
const  bcrypt  =  require ( 'bcrypt' ) ; 
const path = require('path');
var session = require('express-session')
const {engine} = require('express-handlebars');
const app = express();
const port = 3000;
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', "./views");
app.use(express.static(path.join(__dirname, 'public')));
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('electro_shop');
const {users, products} = require('./data');
let isAdmin = false;

app.use(session({
  name: process.env.SESSION_NAME,
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000*60*60*24*7, 
    secure: false,
   }
}));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const routeProtection = (req, res, next) => {
  if(!req.session.user_id){
    res.redirect('/login')
  }else{
    next();
  }
}

const verifyAdmin = (req, res, next)=>{
  if(req.session.user_rule === 'admin')
  isAdmin = true;
  next();
}

app.get('/error', (req,res)=>{
  req.render('error');
})

 
  app.post('/login/password', async (req, res, next)=> {
    const {username, password} = req.body;
    if(username && password){
      const user = users.find((user)=>user.name === username);
      if(user){
        const checkedpwd = await bcrypt.compare(password, user.password);
        if(checkedpwd){
          req.session.user_id = user.id;
          req.session.user_rule = user.rule;
          return res.redirect('/');
        } else {
          message = "Invalid password";
          return res.redirect('/login');
        }
      } else {
        
        return res.redirect('/login');
      }
    }else{
      redirect('/login')
    }
  });

app.post('/register/data', async(req, res, next) => {
  const {username, password} = req.body;
  if(username && password){
    const user = users.some((user)=>user.name === username);
    if(!user){
      const salt = await bcrypt.genSalt(10);
      const pwdToSave = await bcrypt.hash(password, salt);

      newUser = {
        id: users.length + 1,
        name: username,
        password: pwdToSave 
      }
      users.push(newUser);
      req.session.user_id = newUser.id;
      res.redirect('/');
    } 
  }else{
    message = "empty field"
    res.redirect('register');
  }
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.get('/register', function(req, res) {
  res.render('register');
});


app.get('/', routeProtection, verifyAdmin, (req, res) => {

  const currentPage = 1; 
  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const pages = [];
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);
  for(let i = 0; i < totalPages; i++){
    pages[i] = i+1;
  }
  res.render('home', {
    title: 'home',
    products: paginatedProducts,
    pages: pages, 
    isAdmin: isAdmin
  });
  
});

app.get('/paginate/:name', routeProtection, verifyAdmin, (req, res) => {
  const category = req.params.name;
  let itemsPerPage = 5;
  const productsCategory = filterProductsByCategorie(products, category);
  const totalPages = Math.ceil(productsCategory.length / itemsPerPage);
  if (req.query.page%totalPages == 0) {
    currentPage = totalPages;
  } else {
    currentPage = parseInt(req.query.page) % totalPages;
  }
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = productsCategory.slice(startIndex, endIndex);
 
  res.json({ products: paginatedProducts, category: category, isAdmin: isAdmin });
});

function filterProductsByCategorie(products, category) {
  return products.filter(function(product) {
    if(category !== 'all'){
      return product.category === category || product.name === category;
    }else{
      return products;
    }
  });
}

app.get('/categories/:name', routeProtection, (req, res) => {
  const category = req.params.name;
  const productsCategory = filterProductsByCategorie(products, category);
  const currentPage = 1; 
  const itemsPerPage = 5;
  const totalPages = Math.ceil(productsCategory.length / itemsPerPage);
  const pages = [];
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = productsCategory.slice(startIndex, endIndex);
  for(let i = 0; i < totalPages; i++){
    pages[i] = i+1;
  }
  res.render('categories', {
    title: category,
    products: paginatedProducts,
    category: category,
    pages: pages,
    
  });
})


app.post('/add-product', (req, res) => {
  const { name, price, image, description, category } = req.body;
  const newProduct = { name: name, price: price, image: image, description: description, category: category }
  products.push(newProduct);
  res.sendStatus(200);
});

app.get('/about', routeProtection, (req, res) => {
  res.render('about', {
    title: 'about'
  });

});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});