layui.use(["jquery", "form", "laydate"], function () {
    let form = layui.form;

    initEvent(form);

    function initEvent(form) {
        //1.触发select下拉选择事件
        form.on('select(lf_select)', function(data){
            console.log("select(lf_select) data= ",data);
        });

        //2.触发checkbox复选框勾选事件
        form.on('checkbox(lf_checkbox)', function(data){
            //console.log(data.elem.checked); //是否被选中，true或者false
            console.log("checkbox(lf_checkbox) data= ",data);
        });

        //3.触发switch复选框勾选事件
        form.on('switch(lf_switch)', function(data){
            //console.log(data.elem.checked); //是否被选中，true或者false
            console.log("switch(lf_switch) data= ",data);
        });

        //4.radio
        form.on('radio(lf_radio)', function(data){
            console.log(data.value); //被点击的radio的value值
        });

        //5.submit
        form.on('submit(*)', function(data){
            console.log(data.elem); //被执行事件的元素DOM对象，一般为button对象
            console.log(data.form); //被执行提交的form对象，一般在存在form标签时才会返回
            console.log(data.field);//当前容器的全部表单字段，名值对形式：{name: value}
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });

        //6.使用Jquery绑定事件
        $("#save").on("click", function(){
            alert( "save" );
        });

        //7.<button type="reset">会自动重置当前form表单；
    }

});