
	
	var app = (function() {
		
		var init = function() {
			setUpListeners();
		};

		var setUpListeners = function() {
			showModal();
			closeModal();
			checkForm();
			upLoadFile();
		};
		
		var formReset = function() {
			$('form')[0].reset();
			$('.project_picture').html('Загрузите изображение');
			$('.project_tooltip_name').hide();
			$('.project_tooltip_url').hide();
			$('.project_tooltip_disc').hide();
			$('.project_tooltip_picture').hide();
			$('.project_name').removeClass('input_error');
			$('.project_picture').removeClass('input_error');
			$('.project_url').removeClass('input_error');
			$('.project_disc').removeClass('input_error');
		};
		var showModal = function() {
			$('.add_item').on('click', function(e) {
			e.preventDefault();
			$('.modal_window').bPopup();
			});

		};
		var closeModal = function() {
			$('.close_window').on('click', function(e) {
			e.preventDefault();
			$('.modal_window').bPopup().close();
			formReset();
		});
		};
		var upLoadFile = function() {
			$('.fakeinput').on('change', function() {
				var fake = $('.fakeinput');
				var path = fake.val();
				$('.project_picture').html(path.slice(path.lastIndexOf('\\')+1));
				$('.project_tooltip_picture').hide();
				$('.project_picture').removeClass('input_error');
			});
			
		};
		var hideTooltips = function(form) {
			var forms = $(form).not(".not_error");
			$(forms).each(function(i,v) {
				$(this).on('focus', function() {
					var whichInput = this['name'];
					$(this).removeClass('input_error');
					switch(whichInput) {
						case 'name':
							$('.project_tooltip_name').hide();
						break;
						case 'URL':
							$('.project_tooltip_url').hide();
						break;
						case 'disc':
							$('.project_tooltip_disc').hide();
						break;
					};
				})
			})
		};
		var sendForm = function(form) {
				var formData = new FormData();
				
				formData.append('picture',$('.fakeinput')[0].files[0]);
				formData.append('name',$('.project_name').val());
				formData.append('URL',$('.project_url').val());
				formData.append('disc',$('.project_disc').val());
				var url = 'php/add_project.php';
				$.ajax({
					url: url,
					type: 'POST',
					processData: false,
      				contentType: false,
      				cashe: false,
					dataType:'json',
					data: formData

				}).done(
				function(data){
					console.log(data.status);
				}
				).fail(function(){
					console.log('Ошибка');
				});
			};
		var checkForm = function() {
			$('.add_project').submit(function(e){
				e.preventDefault();
				var form = $(this).find('input, textarea').not('input[type="submit"]');
				$(form).each(function(i,v) {
					switch(i) {
						case 0:
							if ($(v).val() == '') {
								$('.project_tooltip_name').show();
								$(this).addClass('error');
								$('.project_name').addClass('input_error');
								$(this).removeClass('not_error');
							} else {
								$(this).addClass('not_error');
								$(this).removeClass('error');
							};
						break;
						case 1:
							if ($(v).val() == '') {
								$('.project_tooltip_picture').show();
								$(this).addClass('error');
								$('.project_picture').addClass('input_error');
								$(this).removeClass('not_error');
							} else {
								$(this).addClass('not_error');
								$(this).removeClass('error');
							};
						break;
						case 2:
							if ($(v).val() == '') {
								$('.project_tooltip_url').show();
								$(this).addClass('error');
								$('.project_url').addClass('input_error');
								$(this).removeClass('not_error');
							} else {
								$(this).addClass('not_error');
								$(this).removeClass('error');
							};
						break;
						case 3:
							if ($(v).val() == '') {
								$('.project_tooltip_disc').show();
								$(this).addClass('error');
								$('.project_disc').addClass('input_error');
								$(this).removeClass('not_error');
							} else {
								$(this).addClass('not_error');
								$(this).removeClass('error');
							};
						break;
					}
				});
			hideTooltips(form);
			if ($('.not_error').length != 0) {
				sendForm(form);
			}
			});
		};
		return {
			init : init
		}
}());
	app.init();
