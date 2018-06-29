// var prevScrollpos = window.pageYOffset;
// window.onmouseover = function() {
//   var currentScrollPos = window.pageYOffset;
//   if (prevScrollpos > currentScrollPos) {
//     document.getElementById("navbar").style.top = "0";
//   } else {
//     document.getElementById("navbar").style.top = "-70px";
//   }
//   prevScrollpos = currentScrollPos;
// }
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