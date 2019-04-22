$(document).ready(function(){
	
	$(".wp-input input, .wp-input textarea").on("focus", function(){
		$(this).parents(".wp-input").addClass("active");
	}).on("blur", function(){
		$(this).parents(".wp-input").removeClass("active");
	});

	$("#go-down").on("click", function(e){
		e.preventDefault();
		var scroll = $(".wrapper-yourself").offset().top;
		$("html, body").stop().animate({
			scrollTop: scroll
		}, 600, 'swing');
	});

	$(window).scroll(function(){
		viewMotivation();
	});

	function viewMotivation() {
		if ($(this).scrollTop() > ($(".mot-container").height() + 80) || $(window).width() < 1000)  {
			if (!$(".mot-container").hasClass("animate-view")) $(".mot-container").addClass("animate-view")
		}
	} viewMotivation();

	// ***** Form validation *****

	var options =  {
		onComplete: function(cep) {
			if ($("#phone").hasClass("error")) $("#phone").removeClass("error");
		}
	};

	$('#phone').mask('+7(000)-000-00-00', options);

	$("#go-valid").on("click", function(e){
		e.preventDefault();
		var name = $("#name").val(),
			 email = $("#email").val(),
			 phone = $("#phone").val();

		if (name.length < 4) {
			$("#go-down").trigger("click");
			$("#name").addClass("error");
		} else $("#name").removeClass("error");

		if (!validateEmail(email)) {
			$("#go-down").trigger("click");
			$("#email").addClass("error");
		} else $("#email").removeClass("error");

		if (phone.length != 17) {
			$("#go-down").trigger("click");
			$("#phone").addClass("error");
			return false;
		} else $("#phone").removeClass("error");

		if (!$(".wp-input .error").hasClass("error")) alert("Success");
	});

	function validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

});