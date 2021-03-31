$(document).ready(function() {

  let colors = ["pink", "yellow", "white", "green", "white"];
  let animation = ["animation1", "animation2", "animation3", "animation4", "animation5", "animation6", "animation7"];
  function update () {
      $(".fish").removeClass("pink yellow green white");
      $(".fish").removeClass("animation1 animation2 animation3 animation4 animation5 animation6 animation7");
      $(".fish").each( function(index) {
          $(this).addClass(colors[Math.floor(Math.random() * colors.length)]);
          $(this).addClass(animation[Math.floor(Math.random() * animation.length)]);
      });
  }
  update();
  // setInterval (update, 1000);

  class ValuesLoop {
    constructor(default_, values) {
        this.values = [default_].concat(values);
        this.index = 0;
    }
    isSet() {
        return this.index > 0;
    }
    get() {
        return this.values[this.index];
    }
    next() {
        this.index++;
        if (this.index >= this.values.length) {
            this.index = 0;
        }
        return this.get();
    }
  }

  class ButtonPanelState {
    constructor() {
        this.color = new ValuesLoop("#8B8B8B", ["#95C11F", "#E72174", "#FAB334", "white", "red", "green", "blue", "yellow"]);
        this.brush = new ValuesLoop("#8B8B8B", ["white"])
        this.cut = new ValuesLoop("#8B8B8B", ["white"])
        this.lupa = new ValuesLoop("#8B8B8B", ["white"])
        this.zlo = new ValuesLoop("#8B8B8B", ["red"])
    }
    draw(element) {
        if ($(element).attr("forceDisabled")) {
            return;
        }
        if (this.color.isSet()) {
            $(element).css("background-color", this.color.get());
        }
        if (this.brush.isSet()){
          let masks = ["v2", "v3", "v4"];
          let classList = $(element).attr("class").split(/\s+/);
          for (let i = 0; i < classList.length; i++) {
            let index = masks.indexOf(classList[i]);
            if (index >= 0) {
              $(element).removeClass(classList[i]);
              $(element).addClass(masks[index + 1 == masks.length ? 0 : index + 1]);
              break;
            }
          }
        }
        if (this.cut.isSet()) {
          $(element).css("opacity", 0);
          $(element).attr("forceDisabled", true);
        }
    }
  }

  state = new ButtonPanelState();

  function drawButton(button, color) {
    $(button).css("background-color", color);
  }
  $(".btn.color").on("click", function(event) {
    drawButton(this, state.color.next());
  });
  $(".btn.brush").on("click", function(event) {
    drawButton(this, state.brush.next());
  });
  $(".btn.cut, .btn.lupa").on("click", function(event) {
    drawButton(this, state.cut.next());
  });
  $(".btn.lupa").on("click", function(event) {
    drawButton(this, state.lupa.next());
  });
  $(".btn.zlo").on("click", function(event) {
    drawButton(this, state.zlo.next());
    $("body").css("background-color", state.zlo.get());
    $(".btn").remove();
  });

  $(".volos").on("click", function() {
    state.draw(this);
  });

});
