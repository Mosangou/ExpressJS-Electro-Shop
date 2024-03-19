
$( "#clickme" ).on( "click", function() {
    $( "#book" ).hide( "slow", function() {
      alert( "Animation complete." );
    });
  });