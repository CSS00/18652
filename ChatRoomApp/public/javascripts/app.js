// var doStuff = function() {
//     $.get( "/", function( data ) {
//       $( "#msgContainer" ).html( data );
//       console.log( "Load was performed." );
//     });
// };
// setInterval(doStuff, 30000);
setInterval(function() {
    $('#msgContainer').load('/ #msgContainer');
    // var elem = document.getElementById('msgContainer');
    // elem.scrollTop = elem.scrollHeight;
    // console.log( "Load was performed." );
}, 3000);
