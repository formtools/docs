$(function () {
  $(".codemirror").each(function () {
    var lang = $(this).data("lang");

    var map = {
      js: "javascript",
      html: "htmlmixed",
      smarty: "smarty",
      php: "text/x-php"
    };

    CodeMirror.fromTextArea(this, {
      mode: map[lang],
      readonly: true,
      viewportMargin: Infinity
    });
  });

  $(".ss").magnificPopup({
    type: 'image',
    mainClass: 'mfp-fade',
    gallery: {
      enabled:true
    }
  });
});
