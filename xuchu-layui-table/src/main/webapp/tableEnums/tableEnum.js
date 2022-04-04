layui.use(["table", "jquery", "form", "laydate"], function () {
    let table = layui.table;
    let $ = layui.jquery;
    let form = layui.form;
    let laydate = layui.laydate;
    let layer = layui.layer;

    // 初始化表格
    initTable();
    //执行一个laydate实例
    ldate.render({
        elem: '#start' ,//指定元素
        type: 'datetime'
    });


    initEvent(form, table);//

    function initEvent(form, table) {
        form.on('submit(search)', function (data) {
            //刷新table
            table.reload("myTable", {where: data.field, page: {curr: 1}})
        });
    }

    function initTable() {
        // 设置表格列
        let option = {
            cols: [[
                {type: "checkbox",fixed: "left"},
                {field: "id", title: "ID", hide: true},
                {field: "no", title: "编码",hide: false},
                {field: "type", title: "任务类型", hide: false,},
                {field: "name", title: "名称", hide: false},
                {field: "frameNo", title: "任务参数", hide: false},
                {field: "description", title: "memo", hide: false},
                {field: "createTime",title: "创建时间"},
            ]],

            parseData : function (res) {
                return {
                    "code": res.code,
                    "msg": res.msg,
                    "data": res.data
                }
            },
            elem: '#myTable',
            url: "/station/list",
            title: "运输任务配置",
        };
        table.render(option);
    }
});
