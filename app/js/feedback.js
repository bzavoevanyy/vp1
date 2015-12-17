$(window).load(function() {
		    		
		    	
		    	function headler_form() {
		    		$('#name').focus(function() {
		    			$('.name_tooltip').hide();
		    			$('#name').removeClass('input_error');
		    		});
		    		$('#email').focus(function() {
		    			$('.email_tooltip').hide();
		    			$('#email').removeClass('input_error');
		    		});
		    		$('#message').focus(function() {
		    			$('.message_tooltip').hide();
		    			$('#message').removeClass('input_error');
		    		});
		    		$('.captcha').hover(function() {
		    			$('.captcha_tooltip').hide()
		    		});
		    	};
		    	function checkForm() {

		    		var name = $('#name').val(),
		    			email = $('#email').val(),
		    			message = $('#message').val();
		    			captcha = grecaptcha.getResponse();
		    		if (name.length <= 2 || name == '') {
		    			$('.name_tooltip').show();
		    			$('#name').addClass('input_error')
		    		}; 
		    		if (email == '') {
		    			$('.email_tooltip').show();
		    			$('#email').addClass('input_error')
		    		}; 
		    		if (message.length <= 2 || message == '') {
		    			$('.message_tooltip').show();
		    			$('#message').addClass('input_error')
		    		}; 
		    		if (captcha == "") {
		    			console.log(captcha);
		    			$('.captcha_tooltip').show();
		    		}
		    	};
		    	$('#feedback').submit(function(e) {
		    		e.preventDefault();
		    		checkForm();
		    		headler_form();
		    		console.log($('#feedback').serializeArray()[0]['value']);
		    		
		    	});
		    	});