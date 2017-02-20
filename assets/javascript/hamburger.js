$(document).ready(function(){
	$("#burger").click(function() {
	  $(this).toggleClass("active");
	  $("nav").toggleClass("show");
	});
});

function playAudio(){
	let self = this;
	setTimeout(function() { self.play(); }, 2000);
}
