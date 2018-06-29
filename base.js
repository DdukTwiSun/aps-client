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
        imgDom.attr('src', image);
        $('#pdf-image').append(imgDom);
    }
}