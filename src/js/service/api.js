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
      jquery: '/lib/jquery'
  }
});

// 用require定义一个模块
define(['jquery'], function($) {
  'use strict';
  return {
    getUserList: function (params, callback) {
      $.ajax({
        url: '/api/userlist',
        type: 'GET',
        data: params,
        success: callback
      });
    }
  };
});