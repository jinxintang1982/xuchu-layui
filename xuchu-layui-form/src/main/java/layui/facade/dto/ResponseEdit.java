package layui.facade.dto;

import lombok.Data;
import lombok.experimental.Accessors;

/**
 * @description:
 * @author: zhangchangzhi
 * @create: 2021-08-15 21:37
 **/
@Data
@Accessors(chain = true)
public class ResponseEdit {
    private Integer intEdt;
    private String strEdt;
    private String email;
    private String arriveDate;
    private Integer lockStatus;
    private boolean switchBool;
}
