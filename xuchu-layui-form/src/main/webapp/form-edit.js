layui.use(["jquery", "form", "laydate"], function () {
    let form = layui.form;
    let laydate = layui.laydate;
    init();

    function init() {
        $.ajaxM({
            url: "/facade/edit",
            type: "get",
            success: function (res) {
                console.info("res = ",res);
                //初始化下来列表
                initFormSelect(res);
                //初始化checkBox
                initCheckBox(res);
                form.val("filEditForm", res);
            }
        });
    }

    // 日期控件
    laydate.render({
        elem: '#idArriveDate'
        , type: 'date'
        , format: "yyyy-MM-dd"
    });

    function inintCheckBox(res) {
        if(res.switchBool === true){
            $("#switchBool").attr("checked","checked");//未测试
        }else {
            $("#switchBool").removeAttr("checked");//未测试
        }
    }
    // 下拉
    function initFormSelect(data) {
        let enumSelect = new util.FormEnumOption()
            .add("selLockStatus", "LockStatusEnum", data.lockStatus);
        util.setFormEnum(enumSelect, form);
    }
});