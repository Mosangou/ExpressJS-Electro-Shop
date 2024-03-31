const  bcrypt  =  require ( 'bcrypt' ) ; 
const  saltRounds  =  10 ; 
const  myPlaintextPassword  =  '1234' ;
const users = [];
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
    
    ]; 

(async () =>{
    const salt= await bcrypt.genSalt(10);
    const myPlaintextPassword = await bcrypt.hash('1234', salt);
    users.push({id: 1, name: "user1", email: "user1@gmail.com", password: myPlaintextPassword, rule: "admin"});
    users.push({id: 2, name: "user2", email: "user2@gmail.com", password: myPlaintextPassword, rule: "user"});
    users.push({id: 3, name: "user3", email: "user3@gmail.com", password: myPlaintextPassword, rule: "user"});
})()

module.exports = {users, products}