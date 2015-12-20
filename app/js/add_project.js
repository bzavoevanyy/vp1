
	
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
			$('.project_name').tooltips('hide');
			$('.project_url').tooltips('hide');
			$('.project_disc').tooltips('hide');
			$('.project_picture').tooltips('hide');
			$('.project_name').removeClass('input_error');
			$('.project_picture').removeClass('input_error');
			$('.project_url').removeClass('input_error');
			$('.project_disc').removeClass('input_error');
			$('.error_window').remove();
		};

		var showModal = function() {
			$('.add_item').on('click', function(e) {
				e.preventDefault();
				$('.modal_window').bPopup({
					onClose: function() {formReset();}
				},
				function() {
					if(!Modernizr.placeholder) {
							$('input, textarea').placeholder()}
				}
				);
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
				$('.project_picture').tooltips('hide');
				$('.project_picture').removeClass('input_error');
				if ($('.input_error').length == 0) $('.error_window').remove();
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
							$('.project_name').tooltips('hide');	
						break;
						case 'URL':
							$('.project_url').tooltips('hide');	
						break;
						case 'disc':
							$('.project_disc').tooltips('hide');	
						break;
					};
					if ($('.input_error').length == 0) $('.error_window').remove();
				})
			})
		};

		var showError = function(cont) {
			if ( $('.error_window').length == 0 ) {
				$('label:first').before("<div class='error_window'><a href='#' class='close_error_window'></a><p class='error_window_text'>Ошибка!</p></div>");
				$('.error_window').append(cont);
				$('.close_error_window').on('click', function(){
					formReset();
				})
			}
		};

		var showDone = function() {
			$('.modal_window').append("<div class='done_window'><a href='#' class='close_window'></a><div class='done_window_content'><p class='done_window_text'>УРА!</p>Проект успешно добавлен.</div></div>");
			$('.close_window').on('click', function(){
				$('.modal_window').bPopup().close();
				formReset();
			});
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
						showDone();
					}

				).fail(function(){
						console.log('Ошибка');
						showError();
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
								showError('Невозможно добавить проект.');
								$(v).tooltips('show', 'left', 'Введите название');
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
								showError('Невозможно добавить проект.');
								$('.project_picture').tooltips('show', 'left', 'Загрузите изображение');
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
								showError('Невозможно добавить проект.');
								$(v).tooltips('show', 'left', 'Ссылка на проект');
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
								showError('Невозможно добавить проект.');
								$(v).tooltips('show', 'left', 'Описание проекта');
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
			
			if ($('.not_error').length == 4) {
				sendForm(form);
			} else {
				showError('Невозможно добавить проект.'); };
			});
		};
		return {
			init : init
		}
}());
$(document).ready(function () {


				
		app.init();
})
	
