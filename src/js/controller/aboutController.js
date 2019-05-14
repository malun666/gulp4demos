requirejs.config({
  paths: {
    jquery: '/lib/jquery',
    api: '/js/service/api',
    tpl: '/js/tmpl/tpl',
    easyui: '/lib/jquery-easyui-1.7.0/jquery.easyui.min'
  },
  shim: {
    'easyui': {
      deps: ['jquery']
    }
  }
});

requirejs(['jquery', 'api', 'tpl', 'easyui'], function($, api, tpl) {
  $(function () {
    $('.header').html(tpl('header', {title: 'aicoder.com 哈哈哈！'}));
    $('.footer').html(tpl('stu/footer', {}));
    $('.ctn').html(tpl('about_ctn', {about: '你好， 老马， aicoder！'}));
    $('#btnOpenDialog').on('click', function() {
      $('.dialog-box').dialog({
        title: '你好！aicoder.com',
        width: 400,
        height: 400,
        content: tpl('stu/footer', {})
      });
    });
  });
});