// https://github.com/fonstok/jfMagnify
// https://codepen.io/fonstok/pen/reLmOJ

function startMagnify() {
  $(".magnify_glass").css("visibility", "visible");
  $(".magnify").jfMagnify();
  $(".magnified_element>.foot").css("background-image", "url('images/foot_lupa.svg')");
  var scaleNum = 2;
  $(".magnify").data("jfMagnify").scaleMe(1 + scaleNum * 0.5);
  $('.plus').click(function(){
    scaleNum += 1;
    if (scaleNum >= 12) {
      scaleNum = 12;
    };
    $(".magnify").data("jfMagnify").scaleMe(1 + scaleNum * 0.5);
  });
  $('.minus').click(function(){
    scaleNum -= 1;
    if (scaleNum <=2) {
      scaleNum = 2;
    };
    $(".magnify").data("jfMagnify").scaleMe(1 + scaleNum * 0.5);
  });
  $('.magnify_glass').animate({
    'top': window.scrollY + 0.475 * window.screen.height + 'px',
    'left': window.scrollX + 0.67 * $(".magnify").width() + 'px'
    },{
    duration: 2000,
    progress: function(){
      let data = $(".magnify").data("jfMagnify")
      if (data)
        data.update();
    },
    easing: "easeOutElastic"
  });
}

function stopMagnify() {
  let data = $(".magnify").data("jfMagnify");
  if (!data)
    return;
  data.destroy();
  $(".magnify_glass").css("visibility", "hidden");
}
