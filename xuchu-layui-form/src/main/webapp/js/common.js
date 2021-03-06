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

    document.write('<link rel="stylesheet" href="' + projectPath + '/xAdminFrame/xadmin2.2/css/font.css?v=">');
    document.write('<link rel="stylesheet" href="' + projectPath + '/xAdminFrame/xadmin2.2/css/login.css?v=">' );
    document.write('<link rel="stylesheet" href="' + projectPath + '/xAdminFrame/xadmin2.2/css/xadmin.css?v=">' );
    document.write('<link rel="stylesheet" href="' + projectPath + '/xAdminFrame/xadmin2.2/css/theme5.css?v=">' );

    document.write('<script type="text/javascript" src="' + projectPath + '/xAdminFrame/xadmin2.2/lib/layui/layui.js?v=" charset="utf-8"></script>' );
    document.write('<script type="text/javascript" src="' + projectPath + '/xAdminFrame/xadmin2.2/js/jquery.min.js?v="></script>' );
    document.write('<script type="text/javascript" src="' + projectPath + '/xAdminFrame/xadmin2.2/js/xadmin.js?v="></script>' );

    document.write('<script type="text/javascript" src="' + projectPath + '/js/commonJs.js?"></script>');
    document.write('<script type="text/javascript" src="' + projectPath + '/js/EnumUtils.js"></script>' );
    window.DEFAULT_PAGE_SIZE = 10;
}

function getPathName() {
    let pathName = top.document.location.pathname;
    let index = pathName.substr(1).indexOf("/");
    return pathName.substr(0, index + 1);
}

(function () {
    function MyAjax(opts) {
        this.type = opts.type || "post";
        this.url = opts.url;
        this.param = opts.param || {};
        this.isShowLoader = opts.isShowLoader || true;
        this.dataType = opts.dataType || "json";
        this.success = opts.success;
        this.error = opts.error;
        this.url = getPathName() + this.url;
        this.init();
    }

    MyAjax.prototype = {
        //?????????
        init: function () {
            this.sendRequest();
        },
        //??????loader
        showLoader: function () {
            if (this.isShowLoader) {
                this.loading = layer.load(1, {
                    shade: [0.1, '#fff'] //0.1????????????????????????
                });
            }
        },
        //??????loader
        hideLoader: function () {
            if (this.isShowLoader) {
                layer.close(this.loading);
            }
        },
        //????????????
        sendRequest: function () {
            let self = this;
            let user = layui.data("user");
            let token = user.token;
            $.ajax({
                type: this.type,
                url: this.url,
                cache: false,
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "token": token
                },
                data: JSON.stringify(this.param),
                dataType: this.dataType,
                beforeSend: this.showLoader(),
                success: function (res) {
                    console.info("myAjax success" + this.url);
                    self.hideLoader();
                    if (res != null) {
                        let code = res.code;
                        let msg = res.msg;
                        let data = res.data;
                        if (code === 0) {
                            if (self.success) {
                                self.success(data);
                            }
                        } else {
                            self.resErr(code, msg);
                        }
                    }
                },
                error: function (res) {
                    self.hideLoader();
                    if (res != null) {
                        let code = res.code;
                        let msg = res.msg;
                        self.resErr(code, msg);
                    }
                }
            });
        },
        resErr: function (code, msg) {
            console.error(code,msg);
            if (code === 2006) {
                layer.msg(msg);
                parent.location.href = getPathName() + "/login.html";
                return;
            }
            if (this.error) {
                this.error(code, msg);
            } else {
                let content = '????????????' + code + '??? ???????????????' + msg;

                if (code === undefined) {
                    content = "??????????????????";
                }
                console.error(content);
                layer.confirm(content, {
                    btn: ['??????'],
                    success: function (layero, index) {
                        $("*").blur();
                        this.keyDown = function (event) {
                            if (event.keyCode === 13) {
                                layer.close(index);
                                return false; //??????????????????????????????
                            } else if (event.keyCode === 27) {
                                layer.close(index);
                                return false; //????????????????????????
                            }
                        };
                        $(document).on('keydown', this.keyDown); //??????????????????????????????
                    },
                    end: function () {
                        $(document).off('keydown', this.keyDown); //????????????????????????
                    },
                    yes: function (index, layero) {
                        let event = window.event;
                        event.keyCode = 13;
                        this.keyDown(event);
                    }
                });

            }
        }
    };

    window.MyAjax = MyAjax;
})();