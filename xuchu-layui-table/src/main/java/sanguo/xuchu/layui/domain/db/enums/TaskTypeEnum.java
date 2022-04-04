package sanguo.xuchu.layui.domain.db.enums;

import sanguo.xuchu.layui.common.enumsCache.Enum;

/**
 * @description:
 * @author: zhangchangzhi
 * @create: 2020-08-20 19:26
 **/
@Enum
public enum TaskTypeEnum {
    INBOUND(1,"入库单"),
    OUTBOUND(2, "出库单"),
    ;
    private int id;

    private String value;

    TaskTypeEnum(int id, String value) {
        this.id = id;
        this.value = value;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public static TaskTypeEnum get(Integer id) {
        TaskTypeEnum thisEnum = getOrNull(id);
        if (thisEnum != null) {
            return thisEnum;
        }
        throw new RuntimeException("TaskTypeEnum is not correct id = "+id);
    }

    public static TaskTypeEnum getOrNull(Integer id) {
        for (TaskTypeEnum thisEnum : TaskTypeEnum.values()) {
            if (thisEnum.getId() == id) {
                return thisEnum;
            }
        }
        return null;
    }
    public static String getValueById(Integer id) {
        TaskTypeEnum thisEnum = getOrNull(id);
        if (thisEnum != null) {
            return thisEnum.getValue();
        }
        return null;
    }
}
