
// var candidates = ['玫樺0','玫樺1','玫樺2','玫樺3','玫樺4','玫樺5','玫樺6','玫樺7','玫樺8','玫樺9']

var gdocurl = 'https://docs.google.com/spreadsheets/d/1-teCetf_KoSe2TkI9L8eyp9O7slcr6R3Bd558kPUOcQ/pubhtml'
var url = 'https://spreadsheets.google.com/feeds/list/1-teCetf_KoSe2TkI9L8eyp9O7slcr6R3Bd558kPUOcQ/od6/public/values?alt=json-in-script&callback=?';

var TEXT = $('.button-text');
var LOADING = $('.fa-spinner');

var current_class = 'classa';
// my_students = {
//     classa: [...],
//     classb: [...],
// }
var my_students = {};

$(window).on('hashchange', function(e){

    var hash = location.hash;
    current_class = hash.replace( /^#/, '' );

    console.log(current_class);

    if($.isEmptyObject(my_students))
    {
        console.log('>> run fetchALL');
        fetchALL(url);
    }else
    {
        // rebind event by passing differernt `current_class`
        bind_events(my_students[current_class]);
    }
    
});

var bind_events = function(candidates)
{   
    console.log("====== in bind_events ======");
    console.log("current_class:",current_class);
    console.log("my_students:",my_students);
    console.log("candidates:",candidates);

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
    });    
}

function fetchALL(url) 
{
    if(TEXT.hasClass("hide"))
    {
        LOADING.fadeIn(50);
    }else{
        TEXT.fadeOut(200, function(){ LOADING.fadeIn(50); });    
    }
    
    $.getJSON(url, function(data) {
        // open spinner

        // TEXT.hide(0, function(){
            // LOADING.fadeIn(300);
        // });

        var classes_num = -1;
        // console.log(data);
        $.each(data.feed.entry, function(i,obj){

            // "classb: 搗蛋的學生B"
            // "classa: 認真的學生A, classb: 認真的學生B"
            var text = obj.content.$t;

            // "classa": "認真的學生A", "classb": "認真的學生B"
            var classes = text.split(",");
            classes_num = classes_num < 0 ? classes.length : classes_num;

            // will yield ["認真的學生A", "認真的學生B"]
            var students = $.map( classes, function(cls, j){ return cls.split(":") } );

            // console.log('students:', students);
            for(var sid=0; sid<students.length/2; sid++)
            {
                var cls_name = $.trim(students[sid*2]);
                var stu_name = $.trim(students[sid*2+1]);

                if(!my_students.hasOwnProperty(cls_name)){
                    my_students[cls_name] = new Array();
                }
                my_students[cls_name].push(stu_name);
            }
        });
        
    }).done(function () {
        // var candidates = my_students[current_class];
        console.log("====== ajax done ======");
        console.log("current_class:",current_class);
        console.log("my_students:",my_students);
        console.log("candidates:",my_students[current_class]);
        console.log("run bind_events");

        // close spinner
        LOADING.fadeOut(200, function(){ TEXT.fadeIn(150); });
            // TEXT.fadeIn(100);
        // });
        bind_events(my_students[current_class]);
        // console.log(my_students);
    });
}

$(document).ready(function(){

    $(window).trigger('hashchange');
    // bind_events();
});

