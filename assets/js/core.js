$(function () {
  $(".codemirror").each(function () {
    var lang = $(this).data("lang");

    var map = {
      js: "javascript",
      html: "htmlmixed",
      smarty: "smarty",
      php: "php"
    };

    CodeMirror.fromTextArea(this, {
      mode: map[lang],
      readonly: true,
      viewportMargin: Infinity
    });
  });
});
