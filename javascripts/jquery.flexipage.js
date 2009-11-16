(function($) {
 $.fn.flexipage = function(options) {

 // build main options before element iteration
 var opts = $.extend({}, $.fn.flexipage.defaults, options);
  $.fn.flexipage.options = opts;

 // iterate and reformat each matched element
 return this.each(function() {
   var $target = $(this);
   opts.wrapper = $target.closest('div')
   opts.actual = opts.firstpage;
    if (opts.paginator == true) {
       opts.total_pages = Math.ceil(($(opts.element , $target).length)/opts.perpage);
       (opts.showcounter == true)? opts.showcounter ='<li><span class="actual"></span>/<span class="total">'+opts.total_pages+'</span></li>' : opts.showcounter = ' ';
       var paginatorHTML = '<li class="next"><a href="#">'+opts.next_txt+'</a></li>'+
                           opts.showcounter+
                           '<li class="prev"><a href="#">'+opts.prev_txt+'</a></li>'
       //pagination controls construct
       if (opts.paginator_selector == false) {
         $target.after('<ul class="paginator">'+paginatorHTML+'</ul>')
         opts.paginator_selector = ".paginator"
       }else{
         $(opts.paginator_selector , $.fn.flexipage.options.parent_cont ).html(paginatorHTML)
       };
       //Next page
       $(opts.paginator_selector+' li.next a', opts.wrapper).click(function(e){
         e.preventDefault();

         if (opts.actual <= (opts.total_pages-1)) {
           $.fn.flexipage.selectPage( opts.actual+1 , $target, opts);
         };
       })
       //Prev page
       $(opts.paginator_selector+' li.prev a', opts.wrapper).click(function(e){
         e.preventDefault();
         
         if (opts.actual <= (opts.total_pages+1)) {
           $.fn.flexipage.selectPage( opts.actual-1 , $target, opts);
         };
       })
       
    };
   
    $.fn.flexipage.selectPage(opts.firstpage, $target, opts);

  });
 };
  
 
  
  $.fn.flexipage.selectPage = function(n, parent, opts) {
    
    if (n==0 || n==undefined)
      var n = 1
      
    if (n > 1)
      var $selected_items = $(opts.element+':lt('+(n*opts.perpage)+'):gt('+(((n-1)*opts.perpage)-1)+')', parent);
    else
      var $selected_items = $(opts.element+':lt('+(n*opts.perpage)+')', parent);
    
    $selected_items.css(opts.visible_css)
    $(opts.element, parent).not($selected_items).css(opts.hidden_css)
    $(opts.paginator_selector+' .actual', opts.wrapper).html(n);
    $(opts.paginator_selector+' .disabled', opts.wrapper).removeClass('disabled');
    
    
    if (n == opts.total_pages ) {
       $(opts.paginator_selector+' .next', opts.wrapper).addClass('disabled');
    };
    
    if (n == 1 ) {
       $(opts.paginator_selector+' .prev', opts.wrapper).addClass('disabled');
    };
    
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
    firstpage : 1
  };


})(jQuery);
