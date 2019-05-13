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
      api: '/js/service/api'
  }
});

requirejs(['jquery', 'api'], function($, api) {
  $(function () {
    $('.box').click(function () {
      alert(2333);
    });

    // 控制器层，调用服务器层获取数据
    api.getUserList(null, function (data) {
      console.log(data); // 配合模板引擎（art-template ) + data => html标签
    });
  
    // $.ajax({
    //   url: '/api/userlist',
    //   type: 'GET',
    //   success: function (data) {
    //     console.log(data);
    //   }
    // });
  });
});