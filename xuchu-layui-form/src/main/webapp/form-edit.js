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

                initFormSelect(res);
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

    // 下拉
    function initFormSelect(data) {
        let enumSelect = new util.FormEnumOption()
            .add("selLockStatus", "LockStatusEnum", data.lockStatus);
        util.setFormEnum(enumSelect, form);
    }
});