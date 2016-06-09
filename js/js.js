// tabbed content and positioning
(function($) {
    var $showContent = $('#show-content');
    var $container = $('#container');
    // To get to:
    // if url param for bkgd, use it for bkgd

    // position tabbed content area and hide show content button
    $showContent
        .position({'my':'center top', 'at': 'center top', 'of': 'body'})
        .hide();

    // Tabbed Behavior
    $('#tabs').tabs();

    // set container as draggable and position it
    $container
        .draggable({ cursor: "crosshair", handle: ".draggable" })
        // .draggable({ cursor: "crosshair", handle: "ul" })
        .position({
            "my": "center top",
            "at": "center top",
            "of": "body"
        });

    // set up minimize and re-show content
    $('#minimize').on('click', function(e) {
        e.preventDefault();
        $container.position({
            "my": "center top",
            "at": "center top",
            "of": "body"
        }).hide();
        setTimeout(function() {
            $showContent.slideDown();
        }, 1000);
    });
    $showContent.on('click', function(e) {
        e.preventDefault();
        $showContent.hide();
        $container.show();
    });
})(window.jQuery);



// Bkgd Images Gallery
(function($) {

    var theWindow       = $(window);

    var galleryArray = [
            'control_room_fisheye',
            'ant_67',
            'P1060686',
            'IMG_2108',
            'bassman_w_pyramid',
            'control-room-2',
            'DSC_8700',
            'high_street_iphone',
            'P1060692',
            'Pictures-047',
            'IMG_0836',
            'DSC_4016',
            'kofi_and_bugsy',
            'live_room_fisheye',
            'live_room_west',
            'outboard_fisheye',
            'P1040716',
            'DSC_8710',
            'IMG_0067',
            'john_bugsy_parkinson',
            'p1050274',
            'outboard_fisheye',
            '737a',
            'P1060967',
            'paul_frank_mouse',
            'reel_rays',
            'The-Conductor',
            'P1060936',
            'vocal',
            'P1060861',
            '009_27_MCI_3',
            '030_6_John_Acoustic',
            '2824',
            'IMG_0055',
            'CIMG2086',
            'DSC_3963',
            'P1060865',
            'DSC_4044',
            'IMG_0123',
            'P1060927',
            'Pictures-048',
            '011_25_PatchingIn',
            '014_22_DigitalDub',
            '023_13_KeysWithGuitar2',
            '109-0935_IMG',
            'B15U67',
            'Curt-sitar',
            'Danny-Curt-John-IMG_2286',
            'Goodbye-Old-Friend-023',
            'IMG_0124',
            'IMG_3234',
            'IMG_3496',
            'IMG_3565',
            'IMG_3567',
            'IMG_3815-brainmix',
            'IMG_3888',
            'IMG_3930',
            'IMG_4154',
            'Michael',
            'music---19',
            'music---27',
            'music---46',
            'music---47',
            'P1000004',
            'rs---CRB---84',
            'rs---CRB---93',
            'rs---CRB---94',
            'Rs---Mouses-friends---34',
            'Twistin',
            'P1080658',
            'P1080671'
        ];

    var galleryArrayIndex;
    var galleryArrayLength = galleryArray.length - 1;

    var loading = $('<div id="loading"><img src="/images/ajax-loader.gif"/></div>');
    $('#container').append(loading);

    var resizeBg = function () {
        var $bg             = $('#' + galleryArray[galleryArrayIndex]);
        var aspectRatio     = $bg.width() / $bg.height();

        if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
            $bg
                .addClass('bgheight');
        } else {
            $bg
                .addClass('bgwidth');
        }
    };

    var getGalleryArrayIndex = function () {
        var paramArray = window.location.search.substring(1).split('&');
        var paramArrayLen = paramArray.length;
        var paramMap = {};
        var bkgdParamValue;

        if (window.location.search.substring(1) === "") {
            return 0;
        }
        for (var i = 0; i < paramArrayLen; i += 1) {
            var tempArray = paramArray[i].split('=');
            var key = tempArray[0];
            var val = tempArray[1];
            paramMap[key] = val;
        }

        if (paramMap['bkgd']) {
            bkgdParamValue = parseInt(paramMap['bkgd'],10);
            // convert human to array understanding
            if (bkgdParamValue !== 0) {
                bkgdParamValue -= 1;
            }
        } else {
            bkgdParamValue = 0;
        }

        return bkgdParamValue;
    };

    var showLoadingGraphic = function () {
        $('#loading').show();
        //console.log('show');
    };

    var hideLoadingGraphic = function () {
        $('#loading').hide();
        //console.log('hide');
    };

    var lazyLoadImages = function () {
        var nextImageIndex, prevImageIndex;
        // next - at end of gallery
        if (galleryArrayIndex === galleryArrayLength) {
            nextImageIndex = 0;
            prevImageIndex = galleryArrayIndex - 1;
        }
        // previous - at beginning of gallery
        else if (galleryArrayIndex === 0) {
            prevImageIndex = galleryArrayLength;
            nextImageIndex = galleryArrayIndex + 1;
        }
        else {
            nextImageIndex = galleryArrayIndex + 1;
            prevImageIndex = galleryArrayIndex - 1;
        }

        if ($('#' + galleryArray[nextImageIndex]).length === 0) {
            $('<img>')
                .addClass('bg-image')
                .appendTo('#bg-container')
                .attr({
                    'id' : galleryArray[nextImageIndex],
                    'src' : 'images/bkgds/' + galleryArray[nextImageIndex] + '.jpg'
                });
        }
        if ($('#' + galleryArray[prevImageIndex]).length === 0) {
            $('<img>')
                .addClass('bg-image')
                .appendTo('#bg-container')
                .attr({
                    'id' : galleryArray[prevImageIndex],
                    'src' : 'images/bkgds/' + galleryArray[prevImageIndex] + '.jpg'
                });
        }
    };

    var handleImageLoading = function () {
        if ($('#' + galleryArray[galleryArrayIndex]).length > 0) {
            $('.bg-image').fadeOut('slow');
            resizeBg();
            $('#' + galleryArray[galleryArrayIndex]).fadeIn('slow');
            lazyLoadImages();
        } else {
            doImageLoading();
        }
    };

    var doImageLoading = function () {
        showLoadingGraphic();
        $('<img>')
            .addClass('bg-image')
            .appendTo('#bg-container')
            .load(function() {
                resizeBg();
                hideLoadingGraphic();
                $(this).fadeIn('slow');
                lazyLoadImages();
            })
            .attr({
                'id' : galleryArray[galleryArrayIndex],
                'src' : 'images/bkgds/' + galleryArray[galleryArrayIndex] + '.jpg'
            });
    };

    // set up index
    galleryArrayIndex = getGalleryArrayIndex();

    // handle keypress for gallery
    theWindow.keydown(function(e) {
        if (e.which === 37) { // LEFT / previous
            if (galleryArrayIndex === 0) {
                galleryArrayIndex = galleryArrayLength;
            } else {
                galleryArrayIndex -= 1;
            }
            handleImageLoading();
        }
        if (e.which === 39) { // RIGHT / next
            if (galleryArrayIndex === galleryArrayLength) {
                galleryArrayIndex = 0;
            } else {
                galleryArrayIndex += 1;
            }
            handleImageLoading();
        }
    });

    // handle window resize
    theWindow.resize(resizeBg).trigger("resize");

    // do initial load:
    doImageLoading();
})();

// Contact Form
(function() {
    /* attach a submit handler to the form */
    $("#contact-form").submit(function(event) {

        /* stop form from submitting normally */
        event.preventDefault();

        /* get some values from elements on the page: */
        var values = $(this).serialize();

        /* Send the data using post and put the results in a div */
        $.ajax({
            url: "http://formmail.dreamhost.com/cgi-bin/formmail.cgi",
            type: "POST",
            data: values,
            success: function(){
                $("#contact-form").html('Thanks! We\'ll get back to you soon!');
            },
            error:function(){
                $("#contact-form").html('Thanks! We\'ll get back to you soon!');
            }
        });
    });
})(window.jQuery);
