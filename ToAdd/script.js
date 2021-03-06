/* global $ */

function renew () {
  var maxHealth = 99;
  var maxMana = 99;
  var maxStamina = 99;
  var health = (Math.random() * maxHealth).toFixed(0);
  var mana = (Math.random() * maxMana).toFixed(0);
  var stamina = (Math.random() * maxStamina).toFixed(0);
  $('#health-bar .level').css('left', '-' + (maxHealth - health) + '%');
  $('#health-text').html(health);
  $('#mana-bar .level').css('left', '-' + (maxMana - mana) + '%');
  $('#mana-text').html(mana);
  $('#stamina-bar .level').css('left', '-' + (maxStamina - stamina) + '%');
  $('#stamina-text').html(stamina);
}

// setInterval(renew ,2000);
renew();

$(document).ready(function () {
  // Init slick carousel
  $('#slick-carousel').slick({
    dots: false,
    infinite: true,
    centerMode: true,
    slidesToShow: 5,
    swipeToSlide: true,
    speed: 140,
    // cssEase: true,
    focusOnSelect: true,
    nextArrow: "<i class=\"fa fa-angle-double-right slick-new-next\"></i>",
    prevArrow: "<i class=\"fa fa-angle-double-left slick-new-prev\"></i>",

  });

  $('#slick-carousel').bind('mousewheel', function (e) {
    if (e.originalEvent.wheelDelta / 120 > 0) {
      $('#slick-carousel').slick('slickNext');
    } else {
      $('#slick-carousel').slick('slickPrev');
    }
  });
});
