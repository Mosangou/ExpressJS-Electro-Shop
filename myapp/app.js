const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');
const { log } = require('console');

const app = express();
const port = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
//app.set('views', path.join(__dirname, "views"));
app.set('views', "./views");

app.use(express.static(path.join(__dirname, "public")));

const products = [
  {name:"product1", price: "10000", image: "/img/14promax1.jpg", description: "desc du produit...", category: "phones"},
  {name:"product2", price: "5000", image: "/img/14promax1.jpg", description: "desc du produit...", category: "phones"},
  {name:"product3", price: "15000", image: "/img/14promax1.jpg", description: "desc du produit...", category: "phones"},
  {name:"product4", price: "20000", image: "/img/14promax1.jpg", description: "desc du produit...", category: "phones"},
  {name:"product5", price: "30000", image: "/img/14promax1.jpg", description: "desc du produit...", category: "phones"},
  {name:"product6", price: "40000", image: "/img/14promax1.jpg", description: "desc du produit...", category: "phones"},
  {name:"product7", price: "30000", image: "/img/14promax1.jpg", description: "desc du produit...", category: "phones"},
  {name:"product8", price: "30000", image: "/img/14promax1.jpg", description: "desc du produit...", category: "phones"},
  {name:"product9", price: "30000", image: "/img/14promax1.jpg", description: "desc du produit...", category: "phones"},
  {name:"product10", price: "30000", image: "/img/14promax1.jpg", description: "desc du produit...", category: "ordinateurs"},
  {name:"product11", price: "10000", image: "/img/14promax1.jpg", description: "desc du produit...", category: "ordinateurs"},
  {name:"product12", price: "5000", image: "/img/14promax1.jpg", description: "desc du produit...", category: "ordinateurs"},
  {name:"product13", price: "15000", image: "/img/14promax1.jpg", description: "desc du produit...", category: "ordinateurs"},
  {name:"product14", price: "20000", image: "/img/14promax1.jpg", description: "desc du produit...", category: "ordinateurs"},
  {name:"product15", price: "30000", image: "/img/14promax1.jpg", description: "desc du produit...", category: "ordinateurs"},
  {name:"product16", price: "40000", image: "/img/14promax1.jpg", description: "desc du produit...", category: "ordinateurs"},
  {name:"product17", price: "30000", image: "/img/14promax1.jpg", description: "desc du produit...", category: "tablettes"},
  {name:"product18", price: "30000", image: "/img/14promax1.jpg", description: "desc du produit...", category: "tablettes"},
  {name:"product19", price: "30000", image: "/img/14promax1.jpg", description: "desc du produit...", category: "tablettes"},
  {name:"product20", price: "30000", image: "/img/14promax1.jpg", description: "desc du produit...", category: "bureau"},
  {name:"product21", price: "30000", image: "/img/14promax1.jpg", description: "desc du produit...", category: "bureau"},
  {name:"product22", price: "30000", image: "/img/14promax1.jpg", description: "desc du produit...", category: "bureau"},
  
  ]


app.get('/', (req, res) => {
  
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
   
  });
});

app.get('/paginate/:name', (req, res) => {
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
 
  res.json({ products: paginatedProducts, category: category });
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

app.get('/categories/:name', (req, res) => {
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



app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about'
  });

});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});