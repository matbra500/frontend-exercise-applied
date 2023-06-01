$(document).ready(function () {
  $("#cancel-icon-container").hide();
  $(".navbar").hide();
  $(".navbar").slideDown(1500);
});

function showMenu() {
  $("#mobile-menu").slideDown(1000);
  $("#bars-icon-container").hide();
  $("#cancel-icon-container").show();
}

function hideMenu() {
  $("#mobile-menu").slideUp(1000);
  $("#cancel-icon-container").hide();
  $("#bars-icon-container").show();
}