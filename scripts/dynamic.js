$(document).ready(function() {
  function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function addFish(cls, top, left, time, withPhantom=true) {
    let elClass = "fish " + "fish" + cls;
    let elPos = "top:" + top + "%; left:" + left + "%;"
    let elAnim = "animation: moveFish " + time + "s infinite linear;"
    $(".overflow_wrapper").append('<div class="' + elClass + '" style="' + elPos + elAnim + '"></div>')
    let elPosPh = "top:" + top + "%; left:" + (left - 100) + "%;"
    if (!withPhantom)
      return;
    let elAnimPh = "animation: moveFishPhantom " + time + "s infinite linear;"
    $(".overflow_wrapper").append('<div class="' + elClass + '" style="' + elPosPh + elAnimPh + '"></div>')
  }

  for (let start = 1; start < 11; start++) {
    addFish(randInt(1, 4), start*5 + randInt(-5, 5), randInt(0, 100), randInt(10, 20));
  }
  for (let start = 11; start < 20; start++) {
    for (let i=0; i< start/2 + (start/4)*(start/4)/2; i++) {
      addFish(randInt(1, 4), start*5 + randInt(-5, 5), randInt(0, 100), randInt(10, 20));
    }
  }
  addFish(5, 70, randInt(0, 10), randInt(10, 20), false);
  addFish(5, 75, randInt(10, 20), randInt(10, 20), false);
  addFish(5, 90, randInt(30, 40), randInt(10, 20), false);

  function updateColor(selector, interval) {
    let colors = ["pink", "yellow", "white", "green", "white"];
    let update = function() {
      let el = $(selector);
      el.removeClass("pink yellow green white");
      el.each( function(index) {
          $(this).addClass(colors[Math.floor(Math.random() * colors.length)]);
      });
    };
    update();
    if (interval == 0) {
      setInterval(update, interval);
    }
  }
  updateColor(".fish", 2000);
  updateColor(".fish5", 0);

  class Button {
    constructor(name, defaultColor, colors, eSet=null, eUnSet=null, useCursor=true) {
      this.name = name
      this.selector = ".btn." + name
      this.colors = [defaultColor].concat(colors);
      this.index = 0;
      this.eSet = eSet === null ? () => null : eSet;
      this.eUnSet = eUnSet === null ? () => null : eUnSet;
      this.useCursor = useCursor
    }
    unSet() {
      this.index = 0;
      $(this.selector).css("background-color", this.get());
      if (this.useCursor)
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
        if (this.useCursor)
          $("body").css("cursor", "url('images/" + this.name + "_cursor.svg'), auto");
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
        this.lupa = new Button("lupa", "#8B8B8B", ["white"], startMagnify, stopMagnify, false)
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
      $(".btn, .zlo_fon, .btn_fon, .text, .podval, .magnify_glass, .bubble_fish").remove();
      $(".fish").removeClass("fish1 fish2 fish3 fish4");
      $(".fish").addClass("zlofish");
    }, 500);
    setTimeout(function () {
      $(".volos").remove();
    }, 1000);
    setTimeout(function () {
      $(".foot").css("background-image", "url('images/foot_zlo.svg')");
      $("body").css("background-color", "red");
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
