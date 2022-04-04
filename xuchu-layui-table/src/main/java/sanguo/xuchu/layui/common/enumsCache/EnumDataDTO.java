package sanguo.xuchu.layui.common.enumsCache;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;

@Data
@Accessors(chain = true)
public class EnumDataDTO implements Serializable {
    private static final long serialVersionUID = -4019063374893498999L;
    private String key;
    private List<EnumItemDTO> enumList;
}
