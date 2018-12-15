 $(document).on('click', '.camon', function (e) {
    e.preventDefault();
    let id = $(this).attr('data-id');
   
        
    if ($(this).attr('data-b')== "false"){
        $(this).text('свернуть  ▲');
        $(this).attr('data-b',"true");
        $('#'+id).slideToggle(300);
    
    }else {
        $(this).text('развернуть  ▼');
        $(this).attr('data-b',"false");
        $('#'+id).slideToggle(300);
    }
         

});
// $(".svg_star").ready(function(){
//     console.log($('svg_star'));
// })
$("#btn_main").click(function(){
    window.location.replace("../target");
})

// $(".svg_star").hover(function(){  
//     let id = $(this).attr('data-id');
//     // if($(this).attr('data-id'))

//         $("#img"+id).attr("src", '../img/star-true.png');
    
   
// },function(){           
//     let id = $(this).attr('data-id'); 
//     if($(this).attr('data-bol')=="false"){
//     $("#img"+id).attr("src", '../img/star-false.png');    
//     }  
// });

// $(".svg_star").click(function(){  
//     let id = $(this).attr('data-id'); 
//    $("#img"+id).attr("src", '../img/star-true.png');
// },function(){           
//     let id = $(this).attr('data-id'); 
//     $("#img"+id).attr("src", '../img/star-false.png');      
// });