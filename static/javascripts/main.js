
candidates = ['玫樺0','玫樺1','玫樺2','玫樺3','玫樺4','玫樺5','玫樺6','玫樺7','玫樺8','玫樺9']

$(document).ready(function(){

    events();
    
});

function events()
{
    $(document).keyup(function(e){
        if(e.which == 13 || e.which == 32)
        {
            $('#yo-btn').click();
        }
    });
    $('#yo-btn').click(function(e){
        var idx = Math.floor((Math.random()*candidates.length)+1);
        var name = candidates[idx];

        $('.result').hide(100, function(){
            $('.result').text(name).show(200);
        });
        
        // console.log();
    });    
}
