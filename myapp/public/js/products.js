  let pageSend = 1;
  $(document).ready(function () {
    $(".page-link").on("click", function (event) {
        event.preventDefault();
        let pageNumber = $(this).data("page");
        let move = $(this).data('move') || null;
        // if($(this).data("category") == 'all') paginate('all', pageNumber, move);
        paginate($(this).data("category"), pageNumber, move);
    });

    $('#searchForm').submit(function(event) {
      //event.preventDefault();
       const mysearchValue = $('input[name="mysearch"]').val();
       // Met à jour l'attribut action du formulaire avec la valeur de mysearch
       $(this).attr('action', '/categories/' + mysearchValue);
       $(this).submit();
       
     });

     // toogle add-product form
     $("#add").click(function() {
      $("#add-form").toggle();
        toggleContent();
    });

    

     // add-product form
     $("#addProduct").click(function() {
      const formData = {
        name: $("#name").val(),
        price: $("#price").val(),
        image: $("#image").val(),
        description: $("#description").val(),
        category: $("#category").val()
      };
  
      $.ajax({
        url: "/add-product",
        method: "POST",
        data: formData,
        success: function(response) {
          // Traitez la réponse du serveur en conséquence
          console.log(response);
        },
        error: function(error) {
          // Gérez les erreurs de requête
          console.log(error);
        }
      });
    });

});

function paginate(category, pageNumber, move){
     if (typeof pageNumber !== 'undefined') pageSend = pageNumber;
     if (move === "prev") {if(pageSend>=1)pageSend--;
     }else if (move === "next") pageSend++; 
     $.ajax({
         url: "/paginate/" + category, // L'URL de notre route dans app.js
         method: "GET",
         data: { page: pageSend,}, // Données à envoyer
         success: function (response) {
             renderProducts(response.products, response.isAdmin);
             console.log("Produits mis à jour pour la page " + pageNumber);
         },
         error: function (error) {
             console.error("Erreur lors de la mise à jour des produits : " + error);
         }
     });

    
}

function toggleContent() {
  var addElement = document.getElementById('add');
  if (addElement.innerHTML === 'Add new product') {
    addElement.innerHTML = 'hide';
  } else if (addElement.innerHTML === 'hide') {
    addElement.innerHTML = 'Add new product';
  }
}


function renderProducts(products, isAdmin) {
    // Utilisation de Handlebars pour afficher les produits
    var template = Handlebars.compile(`
      
        <div class="row d-flex justify-content-center">
          {{#each products}}
            <div class=" col-5 col-md-2 m-2 bg-white">
              <img src="{{image}}" class="img-fluid" alt="{{name}}">
              <h2>{{name}}</h2>
              <p >Prix: <span class="text-danger">{{price}} $</span></p>
              <p><span class="">Description: </span>{{description}}</p>
              {{#if ../isAdmin}} 
                <div class="d-flex" style="ustify-content: space-between; display: flex;">
                <button class="btn btn-danger float-start data-bs-toggle="button"" style="flex: 1; --bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">SUPPRIMER</button>
                <button class="btn btn-secondary float-end ms-1 data-bs-toggle="button"" style="flex: 1; --bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">EDITER</button>
                </div>
              {{/if}}
            </div>
          {{/each}}
        </div>
      
    `);
  
    var renderedHTML = template({ products: products, isAdmin: isAdmin});
    $('#product-list').html(renderedHTML);
  }
