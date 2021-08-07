(function (w) {
    // let pathName = document.location.pathname;
    // let index = pathName.substr(1).indexOf("/");
    // let projectPath = pathName.substr(0, index + 1);
})(window);


var _layer = null;
layui.use(["table", "layer", "form"], function () {
    _layer = layui.layer;
    let table = layui.table;
    let form = layui.form;
    let second = false;
    let table_tr_click_times = 0;
    $(document).on("mousedown", "div.layui-layer-title", function (event) {
        if (second) {
            let parent = $(event.target).parent();
            var iframeName = $(parent).find("iframe")[0].name;
            var index = _layer.getFrameIndex(iframeName);
            _layer.close(index);
            return;
        }
        setTimeout(function () {
            second = false;
        }, 500);
        second = true;
    });

    // $(document).on("click", "td div.laytable-cell-checkbox div.layui-form-checkbox", function (e) {
    $(document).on("click", ".layui-table-fixed-l .layui-table-body table td div.layui-form-checkbox", function (e) {

        let tableBox = $(this).parents('.layui-table-box');
        let tr = $(this).parents('tr');
        let index = $(tr).attr('data-index');
        //存在固定列
        let leftTableDiv = tableBox.find(".layui-table-fixed-l");
        let mainTableDiv = tableBox.find(".layui-table-main");
        let mainTr = mainTableDiv.find("tr[data-index=" + index + "]");
        let checkDiv = leftTableDiv.find("tr[data-index=" + index + "]").find("td div.laytable-cell-checkbox div.layui-form-checkbox");
        let clickTrCls = "layui-table-tr-click";
        let checkSelCls = "layui-form-checked";
        if (!$(checkDiv).hasClass(checkSelCls)) {
            $(mainTr).removeClass(clickTrCls);    //删除背景色和字体色
        } else {
            $(mainTr).addClass(clickTrCls);      //设置背景色和字体色
        }
        e.stopPropagation();
    });


    // $(document).on("click", ".layui-table-body table.layui-table tbody tr", function () {
    $(document).on("click", ".layui-table-main table.layui-table tbody tr", function (e) {
        let index = $(this).attr('data-index');
        let tableBox = $(this).parents('.layui-table-box');
        //存在固定列
        let leftTableDiv = tableBox.find(".layui-table-fixed-l");
        let checkCell = leftTableDiv.find("tr[data-index=" + index + "]").find("td div.laytable-cell-checkbox div.layui-form-checkbox I");
        if (checkCell.length > 0) {
            checkCell.click();
            return;
        }
        // let mainTableDiv = tableBox.find(".layui-table-main");
        // let mainTr = mainTableDiv.find("tr[data-index=" + index + "]");
        let clickTrCls = "layui-table-tr-click";
        if ($(this).hasClass(clickTrCls)) {
            $(this).removeClass(clickTrCls);    //删除背景色和字体色
        } else {
            $(this).addClass(clickTrCls);      //设置背景色和字体色
        }

    });
});
/*
* type              请求的方式  默认为post
* url               发送请求的地址
* param             发送请求的参数
* isShowLoader      是否显示loader动画  默认为true
* dataType          返回JSON数据  默认为JSON格式数据
* success(data)     请求成功的回调函数
* error(code,msg)   请求失败的回调函数 默认弹窗提示错误
*/
(function () {
    function MyAjax(opts) {
        this.type = opts.type || "post";
        this.url = opts.url;
        this.param = opts.param;
        this.isShowLoader = opts.isShowLoader || true;
        this.dataType = opts.dataType || "json";
        this.success = opts.success;
        this.error = opts.error;
        this.url = getPathName() + this.url;
        this.init();
    }

    MyAjax.prototype = {
        //初始化
        init: function () {
            this.sendRequest();
        },
        //渲染loader
        showLoader: function () {
            if (this.isShowLoader) {
                this.loading = layer.load(1, {
                    shade: [0.1, '#fff'] //0.1透明度的白色背景
                });
            }
        },
        //隐藏loader
        hideLoader: function () {
            if (this.isShowLoader) {
                layer.close(this.loading);
            }
        },
        //发送请求
        sendRequest: function () {
            let self = this;
            let user = layui.sessionData("user");
            let token = user.token;
            $.ajax({
                type: this.type,
                url: this.url,
                cache: false,
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "access_token": token
                },
                data: JSON.stringify(this.param),
                dataType: this.dataType,
                beforeSend: this.showLoader(),
                success: function (res) {
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
            if (code === 1001 || code === 1004) {
                layer.msg(msg);
                parent.location.href = getPathName() + "/login.html";
                return;
            }
            if (this.error) {
                this.error(code, msg);
            } else {
                let content = '错误码：' + code + '； 错误原因：' + msg;
                if (code === undefined) {
                    content = "后端服务异常";
                }
                ;
                layer.confirm(content, {
                    btn: ['关闭'],
                    success: function (layero, index) {
                        $("*").blur();
                        this.keyDown = function (event) {
                            if (event.keyCode === 13) {
                                layer.close(index);
                                return false; //阻止系统默认回车事件
                            } else if (event.keyCode === 27) {
                                layer.close(index);
                                return false; //阻止系统默认事件
                            }
                        };
                        $(document).on('keydown', this.keyDown); //监听键盘事件，关闭层
                    },
                    end: function () {
                        $(document).off('keydown', this.keyDown); //解除键盘关闭事件
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


var _ajaxme = $.ajax;
$.extend({
    ajaxM: function (param) {
        var _index = 0;
        var headers = param.headers;
        if (headers == null || headers == undefined) {
            headers = {"Accept": "application/json; charset=utf-8"};
        }
        //设置同步异步
        param.async = param.async || true;
        param.dataType = param.dataType || "json";
        param.contentType = param.contentType || "application/json;charset=utf-8";
        param.type = param.type || 'POST';
        var paramData = param.data ? param.data : param.param;
        if (param.dataType == 'json' && paramData) {
            paramData = JSON.stringify(paramData)
        }
        param.data = paramData;
        let token = layui.sessionData("user").token;
        headers.access_token = token;
        param.headers = headers;

        var _success = param.success;
        param.success = function (result) {
            var code = result.code;
            var msg = result.msg;
            var data = result.data;
            if (code === 0) {
                if (_success) {
                    _success(data, code, msg)
                }
            } else if (code === 1001 || code === 1004) {
                layer.msg(msg);
                parent.location.href = getPathName() + "/login.html";
            } else {
                layer.msg(msg ? msg : "操作失败");
            }
        };
        var _beforeSend = param.beforeSend;
        param.beforeSend = function () {
            if (_layer) {
                _index = _layer.load(1, {
                    shade: [0.1, '#000'] //0.1透明度的白色背景
                });
            }
            if (_beforeSend) {
                _beforeSend();
            }
        };
        var _complete = param.complete;
        param.complete = function () {
            if (_layer) {
                _layer.close(_index);
            }
            if (_complete) {
                _complete();
            }
        };

        var _error = param.error;
        param.error = function (jqXHR, textStatus, errorThrown) {
            if (_layer) {
                _layer.close(_index);
            }
            if (_error) {
                _error();
            }
        };
        _ajaxme(param);
    }
});


var LayUIDataTable = (function () {
    var rowData = {};
    var $;

    function checkJquery() {
        if (!$) {
            console.log("未获取jquery对象，请检查是否在调用ConvertDataTable方法之前调用SetJqueryObj进行设置！")
            return false;
        } else return true;
    }

    /**
     * 转换数据表格。
     * @param callback 双击行的回调函数，该回调函数返回三个参数，分别为：当前点击行的索引值、当前点击单元格的值、当前行数据
     * @returns {Array} 返回当前数据表当前页的所有行数据。数据结构：<br/>
     * [
     *      {字段名称1:{value:"当前字段值",cell:"当前字段所在单元格td对象",row:"当前字段所在行tr对象"}}
     *     ,{字段名称2:{value:"",cell:"",row:""}}
     * ]
     * @constructor
     */
    function ConvertDataTable(callback) {
        if (!checkJquery()) return;
        var dataList = [];
        var rowData = {};
        var trArr = $(".layui-table-body.layui-table-main tr");// 行数据
        if (!trArr || trArr.length == 0) {
            console.log("未获取到相关行数据，请检查数据表格是否渲染完毕！");
            return;
        }
        $.each(trArr, function (index, trObj) {
            var currentClickRowIndex;
            var currentClickCellValue;

            $(trObj).dblclick(function (e) {
                var returnData = {};
                var currentClickRow = $(e.currentTarget);
                currentClickRowIndex = currentClickRow.data("index");
                currentClickCellValue = e.target.innerHTML
                $.each(dataList[currentClickRowIndex], function (key, obj) {
                    returnData[key] = obj.value;
                });
                callback(currentClickRowIndex, currentClickCellValue, returnData);
            });
            var tdArrObj = $(trObj).find('td');
            rowData = {};
            //  每行的单元格数据
            $.each(tdArrObj, function (index_1, tdObj) {
                var td_field = $(tdObj).data("field");
                rowData[td_field] = {};
                rowData[td_field]["value"] = $($(tdObj).html()).html();
                rowData[td_field]["cell"] = $(tdObj);
                rowData[td_field]["row"] = $(trObj);

            })
            dataList.push(rowData);
        })
        return dataList;
    }

    return {
        /**
         * 设置JQuery对象，第一步操作。如果你没有在head标签里面引入jquery且未执行该方法的话，ParseDataTable方法、HideField方法会无法执行，出现找不到 $ 的错误。如果你是使用LayUI内置的Jquery，可以
         * var $ = layui.jquery   然后把 $ 传入该方法
         * @param jqueryObj
         * @constructor
         */
        SetJqueryObj: function (jqueryObj) {
            $ = jqueryObj;
        }

        /**
         * 转换数据表格
         */
        , ParseDataTable: ConvertDataTable

        /**
         * 隐藏字段
         * @param fieldName 要隐藏的字段名（field名称）参数可为字符串（隐藏单列）或者数组（隐藏多列）
         * @constructor
         */
        , HideField: function (fieldName) {
            if (!checkJquery()) return;
            if (fieldName instanceof Array) {
                $.each(fieldName, function (index, field) {
                    $("[data-field='" + field + "']").css('display', 'none');
                })
            } else if (typeof fieldName === 'string') {
                $("[data-field='" + fieldName + "']").css('display', 'none');
            } else {

            }
        }
    }
})();

function _flush_table(tableId) {
    util.flushTableData(tableId);
}

// 关闭页面
window.cancelDate = function () {
    xadmin.close();
}