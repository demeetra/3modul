$(document).ready(function() {

  let colors = ["pink", "yellow", "white", "green", "white"];
  let animation = ["animation1", "animation2", "animation3", "animation4", "animation5", "animation6", "animation7"];
  function updateColor () {
      $(".fish").removeClass("pink yellow green white");
      $(".fish").each( function(index) {
          $(this).addClass(colors[Math.floor(Math.random() * colors.length)]);
      });
      setInterval (updateColor, 1000);
  }
  updateColor();

  function update () {
      $(".fish").removeClass("animation1 animation2 animation3 animation4 animation5 animation6 animation7");
      $(".fish").each( function(index) {
          $(this).addClass(animation[Math.floor(Math.random() * animation.length)]);
      });
  }
  update();


  class Button {
    constructor(name, defaultColor, colors, eSet=null, eUnSet=null) {
      this.name = name
      this.selector = ".btn." + name
      this.colors = [defaultColor].concat(colors);
      this.index = 0;
      this.eSet = eSet === null ? () => null : eSet;
      this.eUnSet = eUnSet === null ? () => null : eUnSet;
    }
    unSet() {
      this.index = 0;
      $(this.selector).css("background-color", this.get());
      $("body").css("cursor", "auto");
      this.eUnSet();
    }
    isSet() {
      return this.index > 0;
    }
    get() {
      return this.colors[this.index];
    }
    next() {
      this.index++;
      if (this.index >= this.colors.length) {
          this.index = 0;
      }
      return this.get();
    }
    onClick(button) {
      this.next();
      if (this.isSet()) {
        $(button).css("background-color", this.get());
        $("body").css("cursor", "url('https://raw.githubusercontent.com/demeetra/3modul/main/images/" + this.name + "_cursor.svg'), auto");
        this.eSet();
        return true;
      }
      this.unSet()
      return false;
    }
  }

  class ButtonPanelState {
    constructor() {
        this.color = new Button("color", "#8B8B8B", ["#95C11F", "#E72174", "#FAB334", "white", "red", "green", "blue", "yellow"]);
        this.brush = new Button("brush", "#8B8B8B", ["white"])
        this.cut = new Button("cut", "#8B8B8B", ["white"])
        this.lupa = new Button("lupa", "#8B8B8B", ["white"], startMagnify, stopMagnify)
        this.all = [this.color, this.brush, this.cut, this.lupa]
    }
    draw(element) {
        if ($(element).attr("forceDisabled")) {
            return;
        }
        if (this.color.isSet()) {
            $(".color_cursor").css("background-color", this.color.get());
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
    onClick(element) {
      let button = this.all.filter(item => $(element).hasClass(item.name))[0];
      if (!button) {
        return;
      }
      if (!button.isSet()) {
        this.all.forEach(item => item.unSet());
      }
      button.onClick(element);
    }
  }

  panel = new ButtonPanelState();

  $(".btn").on("click", function(event) {
    panel.onClick(this);
  });

  $(".btn.zlo").on("click", function(event) {
    $(this).css("background-color", "red");
    setTimeout(function () {
      $("body").css("background-color", "red");
    }, 1500);
    setTimeout(function () {
      $(".btn, .zlo_fon, .btn_fon, .text, .podval").remove();
      $(".fish").removeClass("fish1 fish2 fish3 fish4");
      $(".fish").addClass("zlofish");
    }, 500);
    setTimeout(function () {
      $(".volos").remove();
    }, 1000);
    setTimeout(function () {
      $(".foot").css("background-image", "url('images/foot_zlo.svg')");
    }, 2000);
    setTimeout(function () {
      $(".foot").css("opacity", "0");
    }, 3000);
    setTimeout(function () {
      $(".game_over").css("visibility", "visible");
    }, 3500);


  });

  $(".volos").on("click", function() {
    panel.draw(this);
  });

});
