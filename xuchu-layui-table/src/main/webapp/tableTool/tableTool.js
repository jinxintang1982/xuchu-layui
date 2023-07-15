layui.use(["table", "jquery", "form", "laydate"], function () {
    let table = layui.table;
    let $ = layui.jquery;
    let form = layui.form;
    let laydate = layui.laydate;
    let layer = layui.layer;

    initTable();
    initEvent(form, table);
    initSelect(form);
    initData(laydate);
    initToolBar(table);

    function initEvent(form, table) {
        form.on('submit(search)', function (data) {
            //刷新table
            table.reload("myTableId", {where: data.field, page: {curr: 1}})
        });
    }

    function initData() {
        //执行一个laydate实例
        laydate.render({
            elem: '#start',//指定元素
            type: 'date'
        });

        laydate.render({
            elem: '#end',//指定元素
            type: 'datetime'
        });
    }

    function initSelect(form) {
        let enumSelect = new util.FormEnumOption();
        enumSelect.add("taskType", "TaskTypeEnum");
        util.setFormEnum(enumSelect, form);
    }

    function initTable() {
        // 设置表格列
        let option = {
            cols: [[
                {type: "checkbox", fixed: "left"},
                {field: "id", title: "ID", hide: true},
                {field: "no", title: "编码", hide: false},
                {field: "typeDesc", title: "任务类型", hide: false,},
                {field: "name", title: "名称", hide: false},
                {field: "frameNo", title: "任务参数", hide: false},
                {field: "description", title: "memo", hide: false},
                {field: "createTime", title: "创建时间"},
                {field: "option", title: "操作", toolbar: "#myToolBar"}
            ]],

            parseData: function (res) {
                return {
                    "code": res.code,
                    "msg": res.msg,
                    "data": res.data.data,
                    "count": res.data.total, //解析数据长度
                }
            },

            elem: '#myTableId',
            url: "/station/listPage",
            title: "运输任务配置",
            method: 'POST',
            dataType: 'json',
            contentType: "application/json",
            request: {
                pageName: 'currentPage', //页码的参数名称，默认：page
                limitName: 'pageSize' //每页数据量的参数名，默认：limit
            },
            page: true, //开启分页
        };
        table.render(option);
    }

    // 表格行工具条事件
    function initToolBar(table) {
        table.on("tool(myTableFilter)", function (obj) {
            let data = obj.data;//获得当前行数据

            switch (obj.event) {
                case "finish":
                    $.ajaxM({
                        url: "/station/finish?no=" + data.no,
                        type: "get",
                        success: function (res) {
                            alert("完成订单成功");
                        }
                    });
                    break;
                case "cancel":
                    $.ajaxM({
                        url: "/station/cancel",
                        type: "post",
                        data: {no: data.no, id: data.id},
                        success: function (res) {
                            alert("取消订单成功");
                        }
                    });
                    break;
                default:
                    alert("选择错误");
            }
        });
    }
});
