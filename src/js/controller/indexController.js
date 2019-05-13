requirejs.config({
  paths: {
      // the left side is the module ID,
      // the right side is the path to
      // the jQuery file, relative to baseUrl.
      // Also, the path should NOT include
      // the '.js' file extension. This example
      // is using jQuery 1.9.0 located at
      // js/lib/jquery-1.9.0.js, relative to
      // the HTML page.
      jquery: '/lib/jquery',
      api: '/js/service/api',
      tpl: '/js/tmpl/tpl'
  }
});

requirejs(['jquery', 'api', 'tpl'], function($, api, tpl) {
  $(function () {
    $('.box').click(function () {
      alert(2333);
    });

    $('.header').html(tpl('header', {title: 'aicoder.com 哈哈哈！'}));
    $('.footer').html(tpl('stu/footer', {}));


    // 控制器层，调用服务器层获取数据
    api.getUserList(null, function (data) {
      console.log(data);
      // console.log(data); // 配合模板引擎（art-template ) + data => html标签
      let html = tpl('userlist', {userlist: data});
      $('.userlist').html(html);
    });

    // console.log(tpl('header', {title: 'aicoder.com 哈哈哈！'}));
    // console.log(tpl('stu/footer', {}));
  
    // $.ajax({
    //   url: '/api/userlist',
    //   type: 'GET',
    //   success: function (data) {
    //     console.log(data);
    //   }
    // });
  });
});