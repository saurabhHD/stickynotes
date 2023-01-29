
    $(document).ready(function (){
        
        load_notes();
        $(".note-box").draggable();
        $(".create-note-btn").click(function () {
            var id_num;
            if(localStorage['id_num'] == undefined)
            {
               id_num =  localStorage['id_num'] = 1;
                
            }
            else{
               var data =  localStorage['id_num'];
               id_num = parseInt(data)+1;
               localStorage['id_num'] = id_num;
               console.log(parseInt(id_num));
            }
            const CSS_COLOR_NAMES = ['pink','yellow','red','green','white','orange'];
            const rotat = ['5','10','15','20','25','-5','-10','-15','-20','-25'];
            var rand_rotat = Math.floor(Math.random() * (rotat.length-1));
            rand_rotat = 'rotate('+rotat[rand_rotat]+"deg)";
            var rand_color =Math.floor(Math.random() * (CSS_COLOR_NAMES.length-1));
            rand_color = CSS_COLOR_NAMES[rand_color];

            var element = '<div class="note-box ml-3 p-2 mt-5 shadow-sm" style="background-color:'+rand_color+';transform:'+rand_rotat+';z-index:1" note-id="'+id_num+'"><i class="fa fa-times-circle close mx-2 close-note-btn text-dark" aria-hidden="true" style="font-size:25px;cursor:pointer" note-id="'+id_num+'"></i><textarea placeholder="Title" class="note-title note-title-'+id_num+' ui-widget-content" style="background-color:'+rand_color+';"></textarea><textarea placeholder="Write something..." class="note-desc note-desc-'+id_num+'" rows="5" style="background-color:'+rand_color+';"></textarea></div>';
            $(".note-area").append(element);
            $(".note-box").draggable();
            $(".close-note-btn").click(function(){
                close_note(this);
            });
           
            $(".note-box").each(function(){
                
                $(this).click(function(){
                    $(".note-box").css("z-index",1);
                    $(this).css("z-index", 100);
                });
            });

            $(".note-box").each(function(){
                $(this).on('drag', function(){
                    store_notes(this.parentElement);
                });
            });
            $(".note-title").each(function(){
                $(this).on('input', function(){
                    store_notes(this.parentElement);
                });
            });

            $(".note-desc").each(function(){
                $(this).on('input', function(){
                    store_notes(this.parentElement);
                });
            });

        });
        
    });

    // to close notes

    function close_note(btn){
            var note_box = btn.parentElement;
            var id = $(note_box).attr('note-id');
            $(note_box).remove();
            window.localStorage.removeItem(id);
           
    }

    // to store content of notes

    function store_notes(note_text){
        var note_box = note_text;
        var rotate = $(note_box).css('transform');
        var bgColor  = $(note_box).css('background-color');
        var content_id = $(note_box).attr('note-id');
        var noteTitle = $(".note-title-"+content_id).val(); 
        var noteDesc = $(".note-desc-"+content_id).val();
        var coodrs = getCoords(note_box);
        var left = coodrs.left;
        var top = coodrs.top;

        var noteData = {
                id : content_id,
                title : noteTitle,
                desc : noteDesc,
                bgc : bgColor,
                rotate : rotate,
                left : left,
                top : top
                }; 
                
        
        localStorage[content_id] = JSON.stringify(noteData);
        
        
        
    }

    /*
    ** Load old notes On New window loads
    */
    function load_notes(){
        
        const totalNotes = parseInt(localStorage['id_num']);
        
        for(var i=0;i <= totalNotes;i++)
        {
          if(localStorage[i] != undefined)
          {
                var data = localStorage[i];
                data = JSON.parse(data);
                var title =  data.title;
                var desc = data.desc;
                var color = data.bgc;
                var id = data.id;
                
                //console.log(top);
                if(title != "" || desc != "")
                {
                    var rotate = data.rotate;
               
                    var left = data.left-16;
                    var top = data.top-140;
                    var element = '<div class="note-box ml-3 p-2 mt-5 shadow-sm" style="background-color:'+color+';left:'+left+'px;top:'+top+'px;transform:"'+rotate+'";z-index:1;" note-id="'+id+'"><i class="fa fa-times-circle close mx-2 close-note-btn text-dark" aria-hidden="true" style="font-size:25px;cursor:pointer" note-id="'+id+'"></i><textarea placeholder="Title" class="note-title note-title-'+id+' ui-widget-content" style="background-color:'+color+';">'+title+'</textarea><textarea placeholder="Write something..." class="note-desc note-desc-'+id+'" rows="5" style="background-color:'+color+';">'+desc+'</textarea></div>';
                    $(".note-area").append(element);
                    
                }
                
          }
          else
          {
              /*var num = window.localStorage.getItem('id_num');
              num = parseInt(num)-1;
              localStorage['id_num'] = num;*/
          }
        }
        $(".close-note-btn").click(function(){
                        close_note(this);
        });

        $(".note-title").each(function(){
                $(this).on('input', function(){
                    store_notes(this);
                });
        });

        $(".note-desc").each(function(){
                $(this).on('input', function(){
                    store_notes(this);
        });
        });

        $(".note-box").each(function(){
                $(this).on('drag', function(){
                    store_notes(this);
                });
        });
    }
    
    // get notepad box loaction
    
    function getCoords(elem) { // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}
    
