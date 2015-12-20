// rend : 'show' or 'hide'
// pos  : 'left' or 'right'
// cont : string

$.fn.tooltips = function(rend, pos, cont) {
	elem = $(this);
	
	if ((rend == 'hide') && (elem.parent().find('.project_tooltip').length >= 1)) {
		elem.parent().find('.project_tooltip').remove();
		return;
	};
	
	if ((rend == 'show') && (elem.parent().find('.project_tooltip').length == 0)) {
		ttop = ($(elem)
			.position()['top'] + ($(elem).outerHeight()/2));
		
		
		elem.before("<div class='project_tooltip'></div");
		tip = $(elem).prev().text(cont);

		$(tip).append("<div class='project_tooltip_pointer'></div");
		pointer = $(tip).find('.project_tooltip_pointer');
		if (ie == 8) {
				$(pointer).css({
					"display" : "none"
			});
			};
		
		if (pos == 'left') {
			
			$(tip).css({
				
				"top" : (ttop-($(tip).height()/2)),
				"left" : -($(tip).width()+25)
			});
			$(pointer).css({
				"left" : ($(tip).width()+8),
				
			});
			
		};
		if (pos == 'right') {
		
			$(tip).css({
				"top" : (ttop-($(tip).height()/2)),
				"left" : (elem.position()['left'] + elem.outerWidth() + 10)
			});
			
			$(pointer).css({
				"left" : "-5px",
				"border" : "none",
				"border-left" : "1px solid #f19a7c",
				"border-bottom" : "1px solid #d27c5e"
			});
		};
	

	};

};