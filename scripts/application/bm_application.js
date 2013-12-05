$(document).ready (function () {
    
    //alert ("ready"); 
    
    
     $.ajax ( {url:"graphic/game/animation/animation_break.json", dataType:"json"}).done(function (data) {
         trace (data); 

        var animation=new SpriteAnimation ("graphic/game/animation/animation_break.png", data, 36);
        $("body").append (animation.tag_$);
        animation.play ();   
       
    }); 
    
    
       
});
   
