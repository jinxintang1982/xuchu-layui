package sanguo.xuchu.layui.domain.db.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 * 站点表
 * </p>
 *
 * @author zhangchangzhi
 * @since 2021-06-10
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class TStation implements Serializable {

    private static final long serialVersionUID = 1L;
    /**
     * 站点编码
     */
    private String no;
    /**
     * ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 名称
     */
    private String name;

    /**
     * 锁定状态:0未锁定，1锁定
     */
    private Boolean lockStatus;

    /**
     * 锁定订单
     */
    private Long lockJobId;

    /**
     * 0发车 1空车 2送货
     */
    private Integer type;

    private String description;

    /**
     * NO
     */
    private String frameNo;

    /**
     * 记录插入时间
     */
    private LocalDateTime createTime;

    /**
     * 记录更新时间
     */
    private LocalDateTime updateTime;
}
