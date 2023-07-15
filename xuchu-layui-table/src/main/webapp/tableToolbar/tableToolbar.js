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
    initToolbar(table);

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
                {field: "createTime", title: "创建时间"}
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
            toolbar: '#toolbarDemo'
        };
        table.render(option);
    }

    // 表格行工具条事件
    function initToolbar(table) {
        table.on("toolbar(myTableFilter)", function (obj) {
            var checkStatus = table.checkStatus(obj.config.id);

            switch(obj.event){
                case 'getCheckData':
                    var data = checkStatus.data;
                    layer.alert(JSON.stringify(data));
                    break;
                case 'getCheckLength':
                    var data = checkStatus.data;
                    layer.msg('选中了：'+ data.length + ' 个');
                    break;
                case 'isAll':
                    layer.msg(checkStatus.isAll ? '全选': '未全选');
                    break;

                //自定义头工具栏右侧图标 - 提示
                case 'LAYTABLE_TIPS':
                    layer.alert('这是工具栏右侧自定义的一个图标按钮');
                    break;
            };

        });
    }
});
