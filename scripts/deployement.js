$(function() {

    var converter = new showdown.Converter({
        parseImgDimensions: true,
        strikethrough: true,
        smoothLivePreview: true,
        tables: true,
        tasklists: true
    });

    var convertPadToMarkdown = function($input, $dest) {
        var markdownText = $input.val();
        var html = converter.makeHtml(markdownText);
        $dest.html(html);
    }

    var previewHeader = function(input, $dest) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $dest.removeClass('no-background');
                $dest.css("background-image", 'url(' + e.target.result + ')');
            }
            reader.readAsDataURL(input.files[0]);
        } else {
            $dest.addClass('no-background');
        }
    }
    var previewTitle = function($input, $dest) {
        $dest.html($input.val());
    }

    $('#articleHeader').change(function() {
        previewHeader(this, $('#result_header'));
    })

    var $pad = $('#pad');
    var $markdown = $('#markdown');
    $pad.on('input', function() {
        convertPadToMarkdown($pad, $markdown);
    });
    convertPadToMarkdown($pad, $markdown);

    $inputTitle = $('#titre');
    $resultTitle = $('#result_title');
    $inputTitle.on('input', function() {
        previewTitle($inputTitle, $resultTitle);
    });

    var $padArea = $('#pad_area');
    $padArea.css('width', '50%');
    var padIsVisible = true;
    $('#toggle_editor').on('click', function(event) {
        event.stopPropagation();
        event.preventDefault();


        if (padIsVisible) {
            $padArea.animate({ width: '0' }, 300);
        } else {
            $padArea.animate({ width: '50%' }, 300);
        }

        padIsVisible = !padIsVisible;
    })
});