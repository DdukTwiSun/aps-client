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
    dropZone: $("#drag-box"),
    add: (e, data) => {
      console.log('loading');
      $(".mainalign").css("display", "none");
      $(".card1").css("display", "block");
      data.submit()
    },
    done: (e, data) => {
      let result = data.result;
      localStorage.setItem(result.file_id, JSON.stringify(data.result));

      window.location = 'base.html?file_id=' + result.file_id;
      console.log("end");
    }

  });

  $("#add-button").on('click', () => {
    console.log('#add-button');
    $('#fileupload').click();
  })

  $(document).bind('dragover', function (e) {
      var dropZones = $('#drag-box'),
          timeout = window.dropZoneTimeout;
      if (timeout) {
          clearTimeout(timeout);
      } else {
          dropZones.addClass('in');
      }
      var hoveredDropZone = $(e.target).closest(dropZones);
      dropZones.not(hoveredDropZone).removeClass('hover');
      hoveredDropZone.addClass('hover');
      window.dropZoneTimeout = setTimeout(function () {
          window.dropZoneTimeout = null;
          dropZones.removeClass('in hover');
      }, 100);
  });
});
