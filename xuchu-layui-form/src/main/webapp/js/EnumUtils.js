;!function (win) {

    let EnumUtils = function () {

    };
    console.info("EnumUtils begin");
    EnumUtils.prototype = {

        // 构建表单枚举
        FormEnumOption: function () {
            let cache = [];
            let enumKeys = [];
            let urlEnumArr = [];
            this.add = function (selectId, enumKey, defaultValue) {
                enumKeys.push({key: enumKey});
                defaultValue = defaultValue == null || defaultValue == undefined ? "" : defaultValue;
                cache.push({"selectId": selectId, "enumKey": enumKey, "defaultValue": defaultValue})
                return this;
            };

            /*
            selectId:html中select标签对应的id；
            enumKey：项目中定义的枚举类名；
            nameList:枚举类中的属性名，用来过滤；
             */
            this.addEx = function (selectId,enumKey, nameList, defaultValue) {
                enumKeys.push({key: enumKey,nameList:nameList});
                console.info("addEx",enumKeys);
                defaultValue = defaultValue == null || defaultValue == undefined ? "" : defaultValue;
                cache.push({"selectId": selectId, "enumKey": enumKey, "defaultValue": defaultValue});
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
    };

    win.util = new EnumUtils();
    console.info("EnumUtils finish");
}(window);