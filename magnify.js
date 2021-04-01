function startMagnify() {
  var scaleNum = 2;
  $(".magnify").jfMagnify();
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
    'top':'5%',
    'left':'30%'
    },{
    duration: 2000,
    progress: function(){
      $(".magnify").data("jfMagnify").update();
    },
    easing: "easeOutElastic"
  });
}

/*$(document).ready(function() {
  startMagnify()
});*/
