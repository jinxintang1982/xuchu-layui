package sanguo.xuchu.layui.domain.db.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import sanguo.xuchu.layui.controller.dto.RequestQueryPage;
import sanguo.xuchu.layui.domain.db.entity.TStation;

/**
 * <p>
 * 站点表 服务类
 * </p>
 *
 * @author zhangchangzhi
 * @since 2021-06-10
 */
public interface ITStationService extends IService<TStation> {
    IPage<TStation> listPage(RequestQueryPage query);
}
