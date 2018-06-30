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


let jsonData = loadOcrData();

let selectedAnnotationDom = null;
function makeImage(){
  $('#pdf-image').html('');

  console.log(jsonData);

  for(let i=0; i<jsonData.pages.length; i++){
    let page = jsonData.pages[i];
    let image = page.image;
    let size = page.size;
    console.log(size)
    let ocrs = page.ocr;

    let imgDiv = $('<div/>')
    let imgDom = $('<img/>');

    imgDiv.attr('class', 'img-container');
    imgDom.attr('src', image);

    imgDiv.append(imgDom);

    let convertPos = (boundingBox, domWidth, domHeight) => {
      let x = boundingBox.x;
      let y = boundingBox.y;
      let width = boundingBox.width;
      let height = boundingBox.height;

      x = boundingBox.x / size.width;
      y = boundingBox.y / size.height;
      width = boundingBox.width / size.width;
      height = boundingBox.height / size.width;

      return {
        x: x * domWidth,
        y: y * domHeight,
        width: width * domWidth,
        height: height * domHeight
      };
    }


    imgDom.on('load', () => {
      for (let j=0; j<ocrs.length; j++) {
        let ocr = ocrs[j];

        let pos = convertPos(
          ocr.bounding_box,
          imgDom.width(),
          imgDom.height());
        let mark = $('<div/>');
        mark.attr('class', 'annotation')
        mark.css('top', pos.y);
        mark.css('left', pos.x);
        mark.css('width', pos.width);
        mark.css('height', pos.height);

        imgDiv.append(mark);
        mark.on('click', function () {
            $('.ocr').css("height", '');
            $('.ocr').css("bottom", '');
            if (selectedAnnotationDom) {
              selectedAnnotationDom.removeClass('selected');
            }

            selectedAnnotationDom = mark;
            mark.addClass('selected');

            $('#ocr-textarea').val(ocr.text);
            //$('.floating-box').html(ocr.text);
            $(".ocr").removeClass('clicked');
            $('.ocr').addClass('activated');
            translate(ocr.text, 'ko', function (data) {
                $('.floating-box .default').html(data.TranslatedText);
            });
            
        });

      }

    });

    $("#pdf-image").append(imgDiv);

  }
}

$(window).resize(makeImage);
$(document).ready(function(){
  makeImage();

  let intervalId = null;
  $("#ocr-textarea").on('change keyup paste', () => {
    if (intervalId) {
      clearTimeout(intervalId);
    }

    intervalId = setTimeout(() => {
      translate($('#ocr-textarea').val(), 'ko', function (data) {
        $('.floating-box .default').html(data.TranslatedText);
      });

    }, 500);

  });

  let animationInterval;
  $(".ocr").on("click", () => {
    let ocr = $(".ocr");

    if(animationInterval)
      clearInterval(animationInterval);

    if (!$('.ocr').hasClass("clicked")) {
      ocr.addClass("clicked");

      animationInterval = setInterval(() => {
        let height = ocr.height();
        if( height > 200) {
          clearInterval(animationInterval);
        }
        ocr.css("height", height + 20);
        var bottom = ocr.position().top + ocr.height();
        ocr.css("bottom", -130 - height + 56);
      }, 1/60 * 1000);


    }

  });

});
