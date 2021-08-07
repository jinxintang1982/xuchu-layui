package layui.domain.db.enums;

import layui.instructor.enumhandle.Enum;

@Enum
public enum LockStatusEnum {
    LOCKED(1,"加锁"),
    UNLOCKED(0,"未加锁");

    private Integer id;
    private String value;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    LockStatusEnum(Integer id, String value) {
        this.id = id;
        this.value = value;
    }
}
