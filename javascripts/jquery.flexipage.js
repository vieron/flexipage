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
   opts.total_pages = Math.ceil(($(opts.element , $target).length)/opts.perpage);
    if (opts.paginator == true && opts.navigation == false) {
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
    
    if (opts.navigation == true && opts.paginator == false) {
      var navigationHTML = "";
      var actual;
      
      
      for (var i = 1; i <= opts.total_pages; i++){
        (opts.firstpage == i)? actual = ' class="active" ' : actual = '';
        navigationHTML += '<li'+actual+'><a rel="'+i+'" href="#">'+i+'</a></li>';
      };
      
      // (opts.firstpage-1 <= 0)? navigationHTML += "" : navigationHTML += '<li class="prev"><a rel="'+(opts.firstpage-1)+'" href="#">'+opts.prev_txt+'</a></li>';
      // (opts.firstpage-2 <= 0)? navigationHTML += "" : navigationHTML += '<li><a rel="'+(opts.firstpage-2)+'" href="#">'+(opts.firstpage-2)+'</a></li>';
      // (opts.firstpage-1 <= 0)? navigationHTML += "" : navigationHTML += '<li><a rel="'+(opts.firstpage-1)+'" href="#">'+(opts.firstpage-1)+'</a></li>';
      // navigationHTML += '<li class="active"><a rel="'+(opts.firstpage)+'" href="#">'+(opts.firstpage)+'</a></li>';
      // (opts.firstpage+1 >= opts.total_pages)? navigationHTML += "" : navigationHTML += '<li><a rel="'+(opts.firstpage+1)+'" href="#">'+(opts.firstpage+1)+'</a></li>';
      // (opts.firstpage+2 >= opts.total_pages)? navigationHTML += "" : navigationHTML += '<li><a  rel="'+(opts.firstpage+2)+'" href="#">'+(opts.firstpage+2)+'</a></li>';
      // (opts.firstpage+1 >= opts.total_pages)? navigationHTML += "" : navigationHTML += '<li class="next"><a  rel="'+(opts.firstpage+1)+'" href="#">'+opts.next_txt+'</a></li>';
      
      //pagination controls construct
      //TODO hacer function
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
            $.fn.flexipage.selectPage( topage , $target, opts);
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
    firstpage : 1,
    navigation: false
  };


})(jQuery);
