  $( "#next" ).toggle();

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
             renderProducts(response.products);
             console.log("Produits mis à jour pour la page " + pageNumber);
         },
         error: function (error) {
             console.error("Erreur lors de la mise à jour des produits : " + error);
         }
     });

    
}

function renderProducts(products) {
    // Utilisation de Handlebars pour afficher les produits
    var template = Handlebars.compile(`
    
        <div class="row d-flex justify-content-center">
           {{#each products}}
           <div class=" col-5 col-md-2 m-2 bg-white">
             <img src="{{image}}" class="img-fluid" alt="{{name}}">
             <h2>{{name}}</h2>
             <p >Prix: <span class="text-danger">{{price}} $</span></p>
             <p><span class="">Description: </span>{{description}}</p>
            </div>
           {{/each}}
        </div>
    
      
    `);
  
    var renderedHTML = template({ products: products });
    $('#product-list').html(renderedHTML);
  }
