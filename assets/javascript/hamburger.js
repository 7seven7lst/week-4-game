$(document).ready(function(){
	$("#burger").click(function() {
	  $(this).toggleClass("active");
	  $("nav").toggleClass("show");
	});
});
