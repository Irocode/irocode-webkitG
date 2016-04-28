// Menu Highlighter Active Menu
var url = window.location;
// Will only work if string in href matches with location
$('ul.nav a[href="' + url + '"]').parent().addClass('active');
// Will also work for relative and absolute hrefs
$('ul.nav a').filter(function() {
    return this.href == url;
}).parent().addClass('active'); 
// Scroll to Top
$(document).ready(function() {
    $(window).scroll(function() {

        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut(); 
        } 
    });
    $('.scrollup').click(function() {

        $("html, body").animate({
            scrollTop: 0
        }, 600);

        // Close Menus deaktiviert     
        if ($("#nav-trigger").hasClass("navbar-toggle active")) {
            $('.navbar-toggle').click()
        } else {}
        return false;
    });
});

/*Lightbox Menü Effect*/
var lightBox = $('#lightbox'),
    lightBoxContent = $('#lb-content');

var positionLightbox = function() {
    var veiwWidth = $(window).width(),
        lbContentMargin = (veiwWidth / 2) - 148,
        lbContent = $('#lb-content');

    lbContent.css({
        'left': lbContentMargin,
        'top': $(window).scrollTop() + 50 + 'px'
    });
};

$('#search-submit').click(function() {
    lightBox.fadeIn(function() {
        lightBoxContent.show();
    });
    positionLightbox();
});

$('#lb-close').click(function() {
    lightBox.hide();
    lightBoxContent.hide();
});

// Dropdown Menu Hover activate    
jQuery(document).ready(function() {
    $(".dropdown").hover(
        function() {
            $('.dropdown-menu', this).stop().fadeIn(1);
            lightBox.show();

            $(this).toggleClass('open');
        },
        function() {
            $('.dropdown-menu', this).stop().fadeOut(1);
            lightBox.hide();
            $(this).toggleClass('open');
        });
});

// Dropdown Menu Click Tab 
$(".dropdown-toggle").click(function() {

    ($(".dropdown.menu-large").removeClass("open"));
    ($(".dropdown.menu-large").removeClass("active"));
});

/*Focus Menu Input Field and dropdown-menu*/
$(function() { 
    // Fix input element click problem
    $('.dropdown input, .dropdown label, .dropdown-menu').click(function(e) {
        e.stopPropagation();
    });
});



// ORF Side Menu
$(document).ready(function() {
    var sideslider = $('[data-toggle=collapse-side]');
    var sel = sideslider.attr('data-target');
    var sel2 = sideslider.attr('data-target-2');
    sideslider.click(function(event) {
        $(sel).toggleClass('in');
        $(sel2).toggleClass('out');
    });
});

/*Searchleiste*/
$(document).ready(function() {
    $("div#menu-icons-sort div#searchbtn.icon-search").click(function() {

        $("#login").slideUp("fast");
        $("#searchbtn.icon-search").addClass("active_search");
        $("#loginbtn.icon-login").removeClass("active_login");
        $("#search").slideToggle("slow", function() {
            if ($(this).is(':hidden')) {
                $("#searchbtn.icon-search").removeClass("active_search");
                $("#loginbtn.icon-login").removeClass("active_login");
            } else {
                $("#login").slideUp("fast");
                $("#searchbtn.icon-search").addClass("active_search");
                $("#loginbtn.icon-login").removeClass("active_login");
            }
        });
    });
});

/*Loginleiste*/
$(document).ready(function() {
    $("div#menu-icons-sort div#loginbtn.icon-login").click(function() {
        $("#search").slideUp("fast");
        $("#loginbtn.icon-login").addClass("active_login");
        $("#searchbtn.icon-search").removeClass("active_search");
        $("#login").slideToggle("slow", function() {
            if ($(this).is(':hidden')) {
                $("#loginbtn.icon-login").removeClass("active_login");
                $("#searchbtn.icon-search").removeClass("active_search");
            } else {
                $("#search").slideUp("fast");
                $("#loginbtn.icon-login").addClass("active_login");
                $("#searchbtn.icon-search").removeClass("active_search");
            }
        });
    });
});

/*Tab_opener - Ansprechpartner*/
$(document).ready(function() {
    $("#tab-opener_1").click(function() {
        $("#abteilung_1").slideToggle(1, function() {

            if ($(this).is(':hidden')) {

                $("#abteilung_1 #abteilungs_member img.img-circle").css("display", "none");
                $("#tab-opener_1 .orf-icon-right-arrow").css("display", "none");
                $("#tab-opener_1 .orf-icon-down-arrow").css("display", "inline-block");
            } else {
                $("#abteilung_1 #abteilungs_member img.img-circle").css("display", "none");
                $("#abteilung_1 #abteilungs_member img.img-circle").fadeIn("slow");
                $("#tab-opener_1 .orf-icon-right-arrow").css("display", "inline-block");
                $("#tab-opener_1 .orf-icon-down-arrow").css("display", "none");
            }

        });
    });
});
$(document).ready(function() {
    $("#tab-opener_2").click(function() {
        $("#abteilung_2").slideToggle(1, function() {

            if ($(this).is(':hidden')) {
                $("#abteilung_2 #abteilungs_member img.img-circle").css("display", "none");
                $("#tab-opener_2 .orf-icon-right-arrow").css("display", "none");
                $("#tab-opener_2 .orf-icon-down-arrow").css("display", "inline-block");
            } else {
                $("#abteilung_2 #abteilungs_member img.img-circle").fadeIn("slow");
                $("#tab-opener_2 .orf-icon-right-arrow").css("display", "inline-block");
                $("#tab-opener_2 .orf-icon-down-arrow").css("display", "none");
            }

        });
    });
});

/* Kitty*/
$(".kitty").mouseover(function() {
    $("#kitty1").hide();
    $("#kitty2").show();
});

$("#mouseout").mouseout(function() {
    $("#kitty2").hide();
    $("#kitty1").show();
});

/* Kitty*/
$(".kitty").mouseover(function() {
    $("#kitty1").hide();
    $("#kitty2").show();
});

$("#mouseout").mouseout(function() {
    $("#kitty3").hide();
    $("#kitty1").show();
});

$("#kittyout").hover(function() {
    $("#kitty3").show();
    $("#kitty2").hide();
    $("#kitty1").hide();
});
$("#kittyoutout").mouseout(function() {
    $("#kitty3").hide();
    $("#kitty2").hide();
    $("#kitty1").show();
});


/*Accordion Start*/
function toggleChevron(e) {
    $(e.target)
        .prev('.panel-heading')
        .find("i.indicator")
        /*.toggleClass('glyphicon-chevron-down glyphicon-chevron-up');*/

           .toggleClass('orf-icon-down orf-icon-up');
}
$('#accordion').on('hidden.bs.collapse', toggleChevron);
$('#accordion').on('shown.bs.collapse', toggleChevron);

/*Separator ausblenden*/
$('.dropdown.menu-large').hover(function() {
if ($(".dropdown.menu-large").hasClass("open")) {
   $(this).next().attr('id', 'separator-active'); 

    } else { 
   
     $(this).next().attr('id', 'separator-none');       
    }
});