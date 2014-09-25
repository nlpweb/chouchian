
// var candidates = ['玫樺0','玫樺1','玫樺2','玫樺3','玫樺4','玫樺5','玫樺6','玫樺7','玫樺8','玫樺9']
// var gdocurl = 'https://docs.google.com/spreadsheets/d/1-teCetf_KoSe2TkI9L8eyp9O7slcr6R3Bd558kPUOcQ/pubhtml'
// var url = 'https://spreadsheets.google.com/feeds/list/1-teCetf_KoSe2TkI9L8eyp9O7slcr6R3Bd558kPUOcQ/od6/public/values?alt=json-in-script&callback=?';

var LOCK = true;

var TEXT = $('.button-text');
var LOADING = $('.fa-spinner');

var url = '';
var all_candidates = {};
var spread_id = '';
var sheet_name = '';

$(window).on('hashchange', function(e){

    if(LOCK){ return false; }

    // hash:
    //  "#spread=1-teCetf_KoSe2TkI9L8eyp9O7slcr6R3Bd558kPUOcQ&sheet=classa"
    var hash = location.hash;

    // param:
    //  {spread: "1-teCetf_KoSe2TkI9L8eyp9O7slcr6R3Bd558kPUOcQ", sheet: "classa"}
    var param = $.deparam.fragment( hash );
    console.debug('parse hash',hash,'-> param:',param);

    // extract params
    spread_id = param.spread;
    sheet_name = param.sheet;

    // form the url of spreadsheet
    url = form_url(spread_id);

    if($.isEmptyObject(all_candidates)) {
        console.debug('fetch data from', url);
        fetchALL( url );
    }else {
        // rebind event by passing differernt name of sheet
        console.debug('all_candidates has been fetched. bind events');
        bind_events( all_candidates[sheet_name] );
    }
    
});

var bind_events = function(candidates) {   
    console.debug("====== bind_events ======");

    console.debug('bind keyup event');
    $(document).keyup(function(e){
        if(e.which == 13 || e.which == 32) {
            $('#yo-btn').click();
        }
    });
    console.debug('bind click event');
    $('#yo-btn').click(function(e){

        var idx = Math.floor((Math.random()*candidates.length)+1);
        var name = candidates[idx];

        $('.result').hide(100, function(){
            $('.result').text(name).show(200);
        });
    });    
}

var form_url = function(spread_id){
    var spread_url = 'https://spreadsheets.google.com/feeds/list/'+spread_id+'/od6/public/values?alt=json-in-script&callback=?';
    return spread_url;
}

function fetchALL(url) {

    // open spinner
    if(TEXT.hasClass("hide")) {
        LOADING.fadeIn(50);
    }else{
        TEXT.fadeOut(200, function(){ LOADING.fadeIn(50); });    
    }
    
    $.getJSON(url, function(data) {

        var classes_num = -1;
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

                if(!all_candidates.hasOwnProperty(cls_name)){
                    all_candidates[cls_name] = new Array();
                }
                all_candidates[cls_name].push(stu_name);
            }
        });
        
    }).done(function () {
        // var candidates = all_candidates[current_class];
        console.debug("====== ajax done ======");
        console.debug("sheet_name:",sheet_name);
        console.debug("all_candidates:",all_candidates);
        console.debug("candidates:",all_candidates[sheet_name]);
        console.debug("run `bind_events`");

        bind_events(all_candidates[sheet_name]);

        // close spinner
        LOADING.fadeOut(200, function(){ TEXT.fadeIn(150); });
    });
}

$(document).ready(function(){

    $(window).trigger('hashchange');
});

