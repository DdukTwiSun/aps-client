var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-70px";
  }
  prevScrollpos = currentScrollPos;
}

$(() => {
  $('#fileupload').fileupload({
    add: (e, data) => {
      console.log('loading');
      data.submit()
    },
    done: (e, data) => {
      let result = data.result;
      localStorage.setItem(result.file_id, JSON.stringify(data.result));

      window.location = 'base.html?file_id=' + result.file_id;
      console.log("end");
    }

  });
});
