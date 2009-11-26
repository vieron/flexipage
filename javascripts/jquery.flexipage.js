var colect = [];

(function($) {


  
 $.fn.flexipage = function(options) {

 // build main options before element iteration
 var opts = $.extend({}, $.fn.flexipage.defaults, options);
 $.fn.flexipage.options = opts;

 // iterate and reformat each matched element
 
 return this.each(function() {   
   var $target = $(this);

   $target.data("opts", opts)

   opts.wrapper = $target.closest('div')
   opts.actual = opts.firstpage;
   opts.total_pages = Math.ceil(($(opts.element , $target).length)/opts.perpage);
   
   // if paginator is set to true
   if (opts.paginator == true && opts.navigation == false) {
      (opts.showcounter == true)? opts.showcounter ='<li><span class="actual"></span>/<span class="total">'+opts.total_pages+'</span></li>' : opts.showcounter = ' ';
      var paginatorHTML = '<li class="prev"><a href="#">'+opts.prev_txt+'</a></li>'+
                          opts.showcounter+
                          '<li class="next"><a href="#">'+opts.next_txt+'</a></li>';
      //pagination controls construct
      if (opts.paginator_selector == false) {
        $target.after('<ul class="paginator">'+paginatorHTML+'</ul>')
        opts.paginator_selector = ".paginator"
      }else{
        $(opts.paginator_selector , $.fn.flexipage.options.parent_cont ).html(paginatorHTML)
      };
      //click event for next page 
      $(opts.paginator_selector+' li.next a', opts.wrapper).click(function(e){
        e.preventDefault();
   
        if (opts.actual <= (opts.total_pages-1)) {
          $target.selectPage( opts.actual+1 );
        };
      })
      //click event for prev page 
      $(opts.paginator_selector+' li.prev a', opts.wrapper).click(function(e){
        e.preventDefault();
        
        if (opts.actual <= (opts.total_pages+1)) {
          $target.selectPage( opts.actual-1 );
        };
      })
   };
      
   //if navigation is set to true
   if (opts.navigation == true && opts.paginator == false) {
     var navigationHTML = "";
     var actual;
     
     for (var i = 1; i <= opts.total_pages; i++){
       (opts.firstpage == i)? actual = ' class="active" ' : actual = '';
       navigationHTML += '<li'+actual+'><a rel="'+i+'" href="#">'+i+'</a></li>';
     };
     
     //pagination controls construct
     //TODO: dont repeat yourselfff
      if (opts.paginator_selector == false) {
        $target.after('<ul class="paginator">'+navigationHTML+'</ul>')
        opts.paginator_selector = ".paginator"
      }else{
        $(opts.paginator_selector , $.fn.flexipage.options.parent_cont ).html(navigationHTML)
      };
      
      // CLICK EVENTS
      $(opts.paginator_selector+' li a', opts.wrapper).click(function(e){
         e.preventDefault();
         var $$ = $(this)
         $('li', $$.closest('ul')).removeClass('active')
         $$.parent().addClass('active')
         var topage = $$.attr('rel');
         if (topage <= opts.total_pages && topage > 0) {
           $target.selectPage(topage);
         };
       })
   };
   //if carousel set to true
   if (opts.carousel == true) {
     opts.wrapper_width = $(opts.element, $target).width();
     $target.wrap('<div class="flexiwrap"></div>')
     $target.parent().css({overflow:'hidden', position: 'relative'})
     $target.css({overflow:'hidden', position: 'absolute', top: '0px', left: '0px' })
     opts.distances = [];
     for (var i = 0; i <= opts.total_pages; i++){
       opts.distances[i] =  i*opts.wrapper_width
      };
   };
   
   //show first page, first time
   $target.selectPage(opts.firstpage);

  });
	
 }; 

  
  //show pages function
  $.fn.selectPage = function(n){
    
    var opts = $(this).data('opts')
    var parent = $(this)
    
    if (n==0 || n==undefined)
      n = 1
    
    if (n > 1)
      var $selected_items = $(opts.element+':lt('+(n*opts.perpage)+'):gt('+(((n-1)*opts.perpage)-1)+')', parent);
    else
      var $selected_items = $(opts.element+':lt('+(n*opts.perpage)+')', parent);
    
    if (opts.carousel == true) {
      parent.animate({ left: '-'+opts.distances[n-1]+'px' })
    }else{
      $selected_items.css(opts.visible_css)
      $(opts.element, parent).not($selected_items).css(opts.hidden_css)
    }
    
    $(opts.paginator_selector+' .actual', opts.wrapper).html(n);
    $(opts.paginator_selector+' .disabled', opts.wrapper).removeClass('disabled');
    
    if (n == opts.total_pages )
       $(opts.paginator_selector+' .next', opts.wrapper).addClass('disabled');
    
    if (n == 1 ) 
       $(opts.paginator_selector+' .prev', opts.wrapper).addClass('disabled');
    
    opts.actual = n;
    
  };
  
  
  
  // plugin defaults
  $.fn.flexipage.defaults = {
    element : "li",
    paginator : true,
    next_txt : "Siguente",
    prev_txt : "Anterior",
    paginator_selector : false,
    perpage : 5,
    showcounter : true,
    hidden_css : {display:'none'},
    visible_css : {display:'block'},
    firstpage : 1,
    navigation: false,
    carousel: false
  };


})(jQuery);
