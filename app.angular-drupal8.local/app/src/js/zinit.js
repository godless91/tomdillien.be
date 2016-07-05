(function($) {

	// Animations on scroll viewport.
	var $window       = $(window),
    win_height_padded = $window.height() * 1.1,
    isTouch           = Modernizr.touch;

    $window.on('scroll', revealOnScroll);
    function revealOnScroll() {
	    var scrolled = $window.scrollTop();
	    $(".revealOnScroll:not(.animated)").each(function () {
	      	var $this     = $(this),
	        offsetTop = $this.offset().top;

	        if (scrolled + win_height_padded > offsetTop) {
		        if ($this.data('timeout')) {
		          window.setTimeout(function(){
		          	setTimeout(function () {
				    	$this.removeClass('visuallyhidden');
				    }, 10)
		            $this.addClass('animated ' + $this.data('animation'));
		          }, parseInt($this.data('timeout'),10));
		        } else {
		          $this.addClass('animated ' + $this.data('animation'));
		        }
	      	}
	      });
    }

	// parallax top header.
	$('.parallax-window').parallax();

	// works detail fluid image.
	//$('.photoGrid').wookmark();


})(jQuery);