// layui.define('jquery', function (exports) {
//     var $ = jquery,
//         param;
//
//     init();
//
//     exports("myMode", param)
// });

(function (w) {
    init()
})(window);

function init() {
    let projectPath = getPathName();

    document.write('<meta http-equiv="Expires" content="0">');
    document.write('<meta http-equiv="Pragma" content="no-cache">');
    document.write('<meta http-equiv="Cache-control" content="no-cache">');
    document.write('<meta http-equiv="Cache" content="no-cache">');

    <!-- xAdmin css-->
    document.write('<link rel="stylesheet" href="' + projectPath + '/xAdminFrame/xadmin2.2/css/font.css?v=">');
    document.write('<link rel="stylesheet" href="' + projectPath + '/xAdminFrame/xadmin2.2/css/login.css?v=">' );
    document.write('<link rel="stylesheet" href="' + projectPath + '/xAdminFrame/xadmin2.2/css/xadmin.css?v=">' );
    document.write('<link rel="stylesheet" href="' + projectPath + '/xAdminFrame/xadmin2.2/css/theme5.css?v=">' );
    <!-- xAdmin js-->
    document.write('<script type="text/javascript" src="' + projectPath + '/xAdminFrame/xadmin2.2/lib/layui/layui.js?v=" charset="utf-8"></script>' );
    document.write('<script type="text/javascript" src="' + projectPath + '/xAdminFrame/xadmin2.2/js/jquery.min.js?v="></script>' );
    document.write('<script type="text/javascript" src="' + projectPath + '/xAdminFrame/xadmin2.2/js/xadmin.js?v="></script>' );

    <!-- my js -->
    document.write('<script type="text/javascript" src="' + projectPath + '/lib/util.js?v="></script>' );
    document.write('<script type="text/javascript" src="' + projectPath + '/lib/commonAjax.js?v="></script>' );

    window.DEFAULT_PAGE_SIZE = 10;
}

function getPathName() {
    let pathName = top.document.location.pathname;
    let index = pathName.substr(1).indexOf("/");
    return pathName.substr(0, index + 1);
}