package layui.instructor.enumhandle;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@Accessors(chain = true)
public class EnumItemDTO implements Serializable {
    private static final long serialVersionUID = -5994339944831900033L;
    private Object value;
    private String id;
    private String name;
    private Boolean defaultValue;
}
