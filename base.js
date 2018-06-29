$(() => {
	$('#navbar-container').on('mouseover', () => {
		console.log("mouseover");
		$('#navbar').css("top", "0px");
	})
	$('#navbar-container').on('mouseout', () => {
		console.log("mouseout");
		$('#navbar').css("top", "-70px");
	})

});

function add() {
            $('.floating-box').addClass('animated fadeInLeft')
            setTimeout("remove()", 1000);

        }
function remove() {
            $('.floating-box').removeClass('animated fadeInLeft');

        }

function getUrlVar(key){
	var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search); 
	return result && unescape(result[1]) || ""; 
}

function loadOcrData() {
  let key = getUrlVar('file_id');
	return JSON.parse(localStorage.getItem(key))
}

const translateApiUrl = 'http://openhack.make.codes/translate';
function translate(text, targetLang, callback) {
  $.post(
    translateApiUrl,
    {
      target: targetLang,
      text: text
    },
    callback
  )
}


var jsonData = loadOcrData();
function makeImage(){
    console.log(jsonData);

    for(let i=0; i<jsonData.pages.length; i++){
        let image = jsonData.pages[i].image;
        let imgDom = $('<img/>');
        let mapDom = $('<map/>');
        mapDom.attr('name', 'img-highlight_'+i);
        mapDom.attr('id', 'img-map_'+i);
        imgDom.attr('src', image);
        imgDom.attr('usemap','#img-highlight_'+i);
        $('#pdf-image').append(imgDom);
        $('#map-div').append(mapDom);


        for(let j=0; j<jsonData.pages[i].ocr.length; j++){
            let coords = jsonData.pages[i].ocr[j].bounding_box;
            let imgMap = $('<area/>');
            //let mapname = 'img-highlight_'+i;
            let mapId = '#img-map_'+i;
            imgMap.attr('shape', 'rect');
            imgMap.attr('coords', coords.x + ','+ coords.y + ',' +(coords.x+coords.width) + ','+ (coords.y+coords.height));
            imgMap.attr('href', '#');
            $('#map-div').find(mapId).append(imgMap);

            //console.log(coords);
        }
        /*$('#map-div area').hover(function () {
            $(this).css('background', 'rgba(255,0,0,0.2)');
        }, function () {
            $(this).css('background', '');
        });*/

        $('#pdf-image > img').maphilight();

    }
}
