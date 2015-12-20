				var hideTooltips = function(form) {
					var forms = $(form).not(".not_error");
					$(forms).each(function(i,v) {
						$(this).on('focus', function() {
							var whichInput = this['name'];
							$(this).removeClass('input_error');
							switch(whichInput) {
								case 'email':
									$(this).tooltips('hide');	
								break;
								case 'password':
									$(this).tooltips('hide');	
								break;
							};
						})
					})
					
					};
				var sendForm = function(form) {
					var fdata = $(form).serialize();
					var url = 'php/login.php';
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
		    		var form = $('.login_form').find('input').not("input[type='submit']");
		    			
		    		$(form).each(function(i,v) {
		    			switch(i) {
		    				case 0:
		    					if ($(v).val() == '') {
		    						$(v).tooltips('show','right','Введите e-mail');
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
		    						$(v).tooltips('show','right','Введите пароль');
		    						$(v).addClass('input_error');
		    						$(v).removeClass('not_error');
		    						$(v).addClass('error');
		    					} else {
		    						$(v).addClass('not_error');
		    						$(v).removeClass('error');
		    					};
		    					break;
		    				
		    			}
		    		})
		    		hideTooltips(form);
		    		if ($('.not_error').length == 2)  {
		    			sendForm(form);
		    		};
		    	};

		    	$('.login_form').submit(function(e) {
		    		e.preventDefault();
		    		checkForm();	
		    	});
		    	