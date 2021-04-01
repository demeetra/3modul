function startMagnify() {
  $(".magnify_glass").css("visibility", "visible");
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
    'top':'7.5%',
    'left':'67%'
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
