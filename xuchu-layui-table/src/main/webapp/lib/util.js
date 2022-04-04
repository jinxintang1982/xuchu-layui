;!function (win) {

    let Util = function () {

    };


    Util.prototype = {
        // 缓存菜单
        cacheMenu: function (webMenu) {
            layui.sessionData("webMenu" + webMenu.id, {key: "id", value: webMenu.id});
            layui.sessionData("webMenu" + webMenu.id, {key: "name", value: webMenu.name});
            layui.sessionData("webMenu" + webMenu.id, {key: "url", value: webMenu.url});
            layui.sessionData("webMenu" + webMenu.id, {key: "target", value: webMenu.target});
            layui.sessionData("webMenu" + webMenu.id, {key: "icon", value: webMenu.icon});
            layui.sessionData("webMenu" + webMenu.id, {key: "catalog", value: webMenu.catalog});
        },
        getMenu: function (id) {
            return layui.sessionData("webMenu" + id);
        },
        // 获取地址栏参数
        getQueryString: function (name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            let r = window.location.search.substr(1).match(reg);
            if (r != null)
                return unescape(r[2]);
            return null;
        },
        // 获取菜单id
        getMenuId: function () {
            return util.getQueryString("menuId");
        },
        layerRenderHeader: function (option) {
            let header = option.headers;
            header = header ? header : {};
            let user = layui.sessionData("user");
            let token = user.token;
            header.access_token = token;
            // "Content-Type": "application/json;charset=utf-8",
            option.headers = header;
            return option;
        },
        createTableOption: function (option) {
            option = util.layerRenderHeader(option);
            if (option.id === undefined) {
                let tableId = option.elem;
                if (tableId) {
                    tableId = tableId.substring(1);
                    option.id = tableId;
                }
            }
            if (option.autoWidth !== false) {
                option.autoColumnWidth = {init: true};//初始化自适应列宽
            }
            option.filter = {cache: true};//开启缓存
            if (option.height === undefined) {
                option.height = "full";
            }
            if (option.text === undefined) {
                option.text = {none: "没有数据"};
            }
            if (option.page === undefined || option.page === true) {
                option.page = {
                    theme: 'megvii'
                }
            } else if (typeof option.page === 'object') {
                if (option.page.theme === undefined) {
                    option.page.theme = 'megvii';
                }
            }
            if (option.limit === undefined) {
                option.limit = DEFAULT_PAGE_SIZE;
            }
            if (option.method === undefined) {
                option.method = "post";
            }
            if (option.contentType === undefined) {
                option.contentType = "application/json";
            }

            if (option.parseData === undefined) {
                option.parseData = function (res) {
                    return {
                        "code": res.code,
                        "msg": res.msg,
                        "count": res.data === undefined ? 0 : (res.data.total === undefined ? 0 : res.data.total),
                        "data": res.data === undefined ? 0 : (res.data.data === undefined ? 0 : res.data.data)
                    }
                };
            }
            if (option.request === undefined) {
                option.request = {
                    pageName: "currentPage",
                    limitName: "pageSize"
                }
            }
            if (option.loading === undefined) {
                option.loading = true;
            }
            if (option.loadBtnAuth === undefined) {
                option.loadBtnAuth = true;
            }
            let optionDone = option.done;
            option.done = function (res, curr, count) {
                if (option.loadBtnAuth) {
                    util.authority();
                }

                if (option.dragCol !== false) {
                    // 加载soulTable
                    let _this = this;
                    layui.use(['soulTable'], function () {
                        layui.soulTable.render(_this);
                    });
                }

                if (optionDone) {
                    optionDone(res, curr, count)
                }
                // 表头字体加粗
                let table = document.getElementsByClassName('layui-table-header');
                let th = table[0].getElementsByTagName("th");
                for (let j = 0; j < th.length; j++) {
                    th[j].style.fontWeight = 'bold';
                }

                // let _this = this;
                // layui.use(['soulTable'], function () {
                //     layui.soulTable.render(_this);
                // });
            };

            // option.defaultToolbar = ["filter", "print", "exports", {
            //     title: '导出全部' //标题
            //     ,layEvent: 'DOWN_ALL' //事件名，用于 toolbar 事件中使用
            //     ,icon: 'layui-icon-download-circle' //图标类名
            // }];
            return option;
        },
        authority: function () {
            if (util.getMenuId() == null) {
                return;
            }
            $.ajaxM({
                url: "/permission/getMenuPerm/" + util.getMenuId(),
                type: "get",
                success: function (res) {
                    let authBtns = $(".btnAuthoritys").children();
                    if (res.length == 0) {
                        $.each(authBtns, function (index, item) {
                            let authCode = $(item).attr("attr_auth");
                            if (authCode === undefined || authCode.trim() === "") {
                                return false;
                            }
                            $(item).remove();
                        })
                    } else if (res.length > 0) {
                        $.each(authBtns, function (index, item) {
                            let authCode = $(item).attr("attr_auth");
                            if (authCode === undefined || authCode.trim() === "") {
                                return false;
                            }
                            if ($.inArray(authCode, res) === -1) {
                                $(item).remove();
                            }
                        })
                    }
                }
            });
        },
        hasPerm: function (perm, callback) {
            if (perm == null || perm == undefined || undefined == "") {
                return false;
            }
            $.ajaxM({
                url: "/permission/hasPerm?perm=" + perm,
                type: "get",
                success: function (res) {
                    if (callback != null && callback != undefined && typeof callback == "function") {
                        callback(res);
                    }
                    return res;
                }
            });
        },
        // 构建表单枚举
        FormEnumOption: function () {
            let cache = [];
            let enumKeys = [];
            let urlEnumArr = [];
            this.add = function (selectId, enumKey, defaultValue, nameList) {
                if (enumKey == null || enumKey == "") {
                    return this;
                }
                let keyParam = {key: enumKey}
                if (nameList != null) {
                    keyParam.nameList = nameList;
                }

                enumKeys.push(keyParam);
                defaultValue = defaultValue == null || defaultValue == undefined ? "" : defaultValue;
                cache.push({"selectId": selectId, "enumKey": enumKey, "defaultValue": defaultValue})
                return this;
            };
            this.addUrl = function (selectId, urlOptions, defaultValue) {
                let urlEnum = {};
                urlEnum.selectId = selectId;
                urlEnum.urlOptions = urlOptions;
                urlEnum.defaultValue = defaultValue || "";
                urlEnumArr.push(urlEnum);
                return this;
            };
            this.getEnumKeys = function () {
                return enumKeys;
            };
            this.getUrlEnums = function () {
                return urlEnumArr;
            };
            this.getSelectOptionAll = function () {
                return cache;
            }
        },
        // 下拉菜单
        setFormEnum: function (option, form) {
            if (option.getUrlEnums().length > 0) {
                $.each(option.getUrlEnums(), function (index, item) {
                    let selectId = item.selectId;
                    let defaultValue = item.defaultValue;
                    let urlOptions = item.urlOptions;
                    $.ajaxM({
                        url: urlOptions.url,
                        param: urlOptions.param || {},
                        success: function (res) {
                            $.each(res, function (index, item) {
                                let selectValue;
                                if (defaultValue) {
                                    if (item.id === defaultValue.toString()) {
                                        selectValue = new Option(item.value, item.id, false, true);
                                    } else {
                                        selectValue = new Option(item.value, item.id);
                                    }
                                } else {
                                    // 代码中指定了默认值
                                    if (item.defaultValue && item.defaultValue === true) {
                                        selectValue = new Option(item.value, item.id, false, true);
                                    } else {
                                        selectValue = new Option(item.value, item.id);
                                    }
                                }
                                $('#' + selectId).append(selectValue);
                            });
                            form.render("select");
                        }
                    });
                });
            }
            if (option.getEnumKeys().length > 0) {
                $.ajaxM({
                    url: "/enums/query",
                    param: option.getEnumKeys(),
                    success: function (res) {

                        let enumsMap = {};
                        $.each(res, function (resIndex, resItem) {
                            enumsMap[resItem.key] = resItem.enumList;
                        });
                        $.each(option.getSelectOptionAll(), function (index, selectOption) {
                            $.each(enumsMap[selectOption.enumKey], function (index, item) {
                                let selectValue;
                                if (item.id === selectOption.defaultValue.toString()) {
                                    selectValue = new Option(item.value, item.id, false, true);
                                } else {
                                    selectValue = new Option(item.value, item.id);
                                }
                                $('#' + selectOption.selectId).append(selectValue);// 下拉菜单里添加元素
                            });
                        });
                        form.render("select");
                    }
                });
            }

        },
        createRadioInput: function (field, value, title, checked) {
            let checkedValue = "";
            if (checked) {
                checkedValue = "checked";
            }
            return "<input type='radio' name=" + field + " value=" + value + " title=" + title + " " + checkedValue + ">";
        },
        formatDateTime: function (datetime) {
            // datetime 格式：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            // 返回格式：2017-08-18 00:00:00
            if (!datetime.year) return '';
            return datetime.year + "-"
                + prefixZero(datetime.month, 2) + "-"
                + prefixZero(datetime.date, 2) + " "
                + prefixZero(datetime.hours, 2) + ":"
                + prefixZero(datetime.minutes, 2) + ":"
                + prefixZero(datetime.seconds, 2);
        },
        formatDate: function (datetime) {
            // datetime 格式：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            // 返回格式：2017-08-18 00:00:00
            if (!datetime.year) return '';
            return datetime.year + "-"
                + prefixZero(datetime.month, 2) + "-"
                + prefixZero(datetime.date, 2);
        },
        flushTableData: function (tableId, where) {
            // 刷新列表table数据
            layui.use(["table"], function () {
                let table = layui.table;
                table.reload(tableId, {
                    where: where || {},
                    page: {curr: $("#" + tableId + " .layui-laypage-em").next().html()}
                });
            });
        },
        moreSearch: function (form) {
            form.on('submit(more)', function (data) {
                let more = $("#more");
                if (more.hasClass('layui-hide')) {
                    more.removeClass('layui-hide');
                    more.addClass('layui-show');

                    $("#moreIcon").removeClass("layui-icon-down");
                    $("#moreIcon").addClass("layui-icon-up");
                } else {
                    more.removeClass('layui-show');
                    more.addClass('layui-hide');

                    $("#moreIcon").removeClass("layui-icon-up");
                    $("#moreIcon").addClass("layui-icon-down");
                }
                /*let moreClass = $("#more").attr("class");
                if (moreClass === "layui-hide") {
                    $("#more").removeClass("layui-hide");
                    $("#more").addClass("layui-show");

                    $("#moreIcon").removeClass("layui-icon-down");
                    $("#moreIcon").addClass("layui-icon-up");
                } else {
                    $("#more").removeClass("layui-show");
                    $("#more").addClass("layui-hide");

                    $("#moreIcon").removeClass("layui-icon-up");
                    $("#moreIcon").addClass("layui-icon-down");
                }*/
                return false;
            });
        },
        sleep: function (millisecond) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve()
                }, millisecond)
            })
        },
        // 导出excel
        export: function (url, data) {
            $.ajaxM({
                url: url,
                data: data,
                success: function (res) {
                    let u = "/download?oldName=" + res.oldName + "&newName="
                        + res.newName + "&delete=" + res.delete;
                    window.open(u, '_self');
                }
            });
        },
        // json格式化
        jsonStr: function (str) {
            var stack = []; //栈-用于括号匹配
            var tmpStr = '';    //新格式化JSON字符串
            var len = str.length;   //原始JSON长度
            //遍历每一个字符
            for (let i = 0; i < len; i++) {
                //当遇到结构块起始结构
                if (str[i] == '{' || str[i] === '[') {
                    //起始结构后面直接换行
                    tmpStr += str[i] + "\n";
                    //入栈
                    stack.push(str[i]);
                    //这里的意思是结构块起始的下一行开始就会有一个缩进，缩进量与遇到的结构块起始符个数成正比1:1
                    tmpStr += "\t".repeat(stack.length);
                }
                //当遇到结构块结束符
                else if (str[i] == ']' || str[i] === '}') {
                    //因为本身JSON格式是固定的，所以括号一定是成对的，这里先不考虑错误的json数据
                    //遇到结束符就退栈，
                    stack.pop();
                    //结束符本身输出到下一行，并减少一个缩进
                    tmpStr += "\n" + "\t".repeat(stack.length) + str[i];
                }
                //当遇到逗号的时候
                else if (str[i] == ',') {
                    //逗号后方直接换行，以及下一行的缩进处理
                    tmpStr += str[i] + "\n" + "\t".repeat(stack.length);
                } else {
                    //其他字符直接复制
                    tmpStr += str[i];
                }
            }
            return tmpStr;
        },
        // 是否为十进制小数字符串
        isNumber: function (s) {
            return /^(\-|\+)?\d+(\.\d+)?$/.test(s);
        },
        // 是否为自然数
        isNaturalNumber: function (s) {
            return /^\d+$/.test(s);
            // 实测/^([1-9]\d*)|\0$/
            // return /^([1-9]\d*)$/.test(s);
        },
        // 动态调整查询表单
        adjustQueryForm: function (form) {
            let firstLine = $('#mySearch .layui-query-form-first-line');

            let layuiFormItem = firstLine.children('.layui-form-item');
            let remainWidth = layuiFormItem.innerWidth();
            let i = 0;

            let formInlineList = layuiFormItem.children();
            formInlineList.each(function (index, element) {
                // 此处的计算还有问题，处于同一个BFC的框，外边距会合并
                let takeUp = $(element).outerWidth(true);
                if (takeUp > remainWidth) {
                    i = index;
                    return false;
                }
                remainWidth = remainWidth - takeUp;
                return true;
            });

            if (i !== 0) {
                let firstLineContent = formInlineList.slice(0, i);
                let otherContent = formInlineList.slice(i);

                let btnCache = $('.btn-cache').html();
                $('.btn-cache').empty();

                layuiFormItem.empty();
                layuiFormItem.append(firstLineContent);
                layuiFormItem.css('margin-right', 0);
                layuiFormItem.append(btnCache);

                let other = $('#mySearch .layui-query-form-other');
                other.empty();
                other.append(otherContent);
                other.css('margin-right', remainWidth + 'px');
            } else {
                layuiFormItem.css('margin-right', 0);
                let btnCache = $('.btn-cache').html();
                $('.btn-cache').empty();
                layuiFormItem.append(btnCache);

                $('#moreIcon').parent().remove();
            }
            util.moreSearch(form);
        },
        /**
         * 对表单参数进行下钻处理
         * {"id":12,"name":"我们","dto.id":43,"dto.name":"中国"} => {"id":12,"name":"我们","dto":{"id":43,"name":"中国"}}
         * @param field 必须是一个json对象
         * @returns {{}|null}
         */
        formatFormField: function (field) {
            if (field == null) {
                return null;
            }
            let returnJson = {};
            let innerJson = {};
            for (let key in field) {
                if (key.indexOf(".") > -1) {
                    let keys = key.split(".");
                    let dto = keys[0];
                    let dtoColumn = keys[1];
                    let keyJson = innerJson[dto]
                    if (keyJson == null) {
                        keyJson = {};
                    }
                    keyJson[dtoColumn] = field[key];
                    innerJson[dto] = keyJson;
                } else {
                    returnJson[key] = field[key];
                }
            }
            for (let key in innerJson) {
                returnJson[key] = innerJson[key];
            }
            return returnJson;
        }
    };
    win.util = new Util();

    /**
     * 自定义函数名：PrefixZero
     * @param num： 被操作数
     * @param n： 固定的总位数
     * @return {string}
     */
    function prefixZero(num, n) {
        return (Array(n).join(0) + num).slice(-n);
    }

}(window);
