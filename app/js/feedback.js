				var hideTooltips = function(form) {
					var forms = $(form).not(".not_error");
					$(forms).each(function(i,v) {
						$(this).on('focus', function() {
							var whichInput = this['name'];
							$(this).removeClass('input_error');
							switch(whichInput) {
								case 'name':
									$(this).tooltips('hide');	
								break;
								case 'email':
									$(this).tooltips('hide');	
								break;
								case 'message':
									$(this).tooltips('hide');	
								break;
							};
						})
					})
					if (grecaptcha.getResponse() != '') {
						$('.g-recaptcha').tooltips('hide');
					};
				};
				var sendForm = function(form) {
					var fdata = $(form).serialize();
					var url = 'php/feedback.php';
					console.log(fdata['name']);
					$.ajax({
						url: url,
						type: 'POST',
						dataType:'json',
						data: fdata

					}).done(
						function(data){
							console.log(data.status);
						}

					).fail(function(){
							console.log('Ошибка');
							
					});
				};

		    	function checkForm() {
		    		var form = $('#feedback').find('input, textarea').not("input[type='submit'], input[type='reset']");
		    		
		    		$(form).each(function(i,v) {
		    			switch(i) {
		    				case 0:
		    					if ($(v).val() == '') {
		    						$(v).tooltips('show','left','Введите имя');
		    						$(v).addClass('input_error');
		    						$(v).removeClass('not_error');
		    						$(v).addClass('error');
		    					} else {
		    						$(v).addClass('not_error');
		    						$(v).removeClass('error');
		    					}
		    					break;
		    				case 1:
		    					if ($(v).val() == '') {
		    						$(v).tooltips('show','right','Введите e-mail');
		    						$(v).addClass('input_error');
		    						$(v).removeClass('not_error');
		    						$(v).addClass('error');
		    					} else {
		    						$(v).addClass('not_error');
		    						$(v).removeClass('error');
		    					};
		    					break;
		    				case 2:
		    					if ($(v).val() == '') {
		    						$(v).tooltips('show','left','Ваш вопрос');
		    						$(v).addClass('input_error');
		    						$(v).removeClass('not_error');
		    						$(v).addClass('error');
		    					} else {
		    						$(v).addClass('not_error');
		    						$(v).removeClass('error');
		    					};
		    					break;
		    				case 3:
		    					if (grecaptcha.getResponse() == '') {
		    					
		    						$('.g-recaptcha').tooltips('show','left','Вы не робот?')
		    					};
		    					break;
		    			}
		    		})
		    		hideTooltips(form);
		    		if (($('.not_error').length == 3) && (grecaptcha.getResponse() != '')) {
		    			sendForm(form);
		    		};
		    	};
		    	$('#feedback').submit(function(e) {
		    		e.preventDefault();
		    		checkForm();	
		    	});
		    	$('.clear_button').on('click', function(e) {
		    		var form = $('#feedback').find('input, textarea').not("input[type='submit'], input[type='reset']");
		    		$(form).each(function(i,v) {
		    			$(v).tooltips('hide');
		    			$(v).removeClass('input_error');
		    			$('.g-recaptcha').tooltips('hide');
		    		})
		    	});
		    	