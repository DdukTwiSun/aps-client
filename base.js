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
