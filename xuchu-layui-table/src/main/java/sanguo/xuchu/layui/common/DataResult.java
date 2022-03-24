package sanguo.xuchu.layui.common;

import lombok.Getter;

import java.io.Serializable;

/**
 * 返回结果
 *
 * @author anning
 * 2019-08-21 19:08
 **/
@Getter
public class DataResult<T> implements Serializable {

    private static final long serialVersionUID = -8206968944610455117L;

    private int code;

    private String msg;

    private T data;

    private DataResult(int code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
    private DataResult(int code, String msg)  {
        this.code = code;
        this.msg = msg;
    }

    public static DataResult success() {
        return success(null);
    }
    public static DataResult success(String msg) {
        return new DataResult<>(0, msg);
    }
    public static <T> DataResult success(T data) {
        return new DataResult<>(0, "操作成功", data);
    }

}
