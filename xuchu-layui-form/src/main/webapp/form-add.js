layui.use(["jquery", "form", "laydate"], function () {
    let $ = layui.jquery;
    let form = layui.form;

    initEnums(form);

    function initEnums(form) {
        console.info("form add");
        let formEnum = new util.FormEnumOption();
        formEnum = formEnum.add("sltLock","LockStatusEnum");
        new util.setFormEnum(formEnum, form);
    }
});