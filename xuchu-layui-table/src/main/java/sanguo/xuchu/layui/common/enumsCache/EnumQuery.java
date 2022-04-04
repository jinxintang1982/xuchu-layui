package sanguo.xuchu.layui.common.enumsCache;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * @author anning
 * 2019-09-02 12:20
 **/
@Data
public class EnumQuery implements Serializable {

    private static final long serialVersionUID = 2317537826739738069L;

    private String key;
    private List<String> nameList;
}
