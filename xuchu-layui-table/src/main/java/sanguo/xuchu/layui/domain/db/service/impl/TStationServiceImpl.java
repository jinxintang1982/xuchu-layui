package sanguo.xuchu.layui.domain.db.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import sanguo.xuchu.layui.common.DataResult;
import sanguo.xuchu.layui.controller.dto.RequestQueryPage;
import sanguo.xuchu.layui.domain.db.entity.TStation;
import sanguo.xuchu.layui.domain.db.mapper.TStationMapper;
import sanguo.xuchu.layui.domain.db.service.ITStationService;

/**
 * <p>
 * 站点表 服务实现类
 * </p>
 *
 * @author zhangchangzhi
 * @since 2021-06-10
 */
@Service
public class TStationServiceImpl extends ServiceImpl<TStationMapper, TStation> implements ITStationService {

    @Override
    public IPage<TStation> listPage(RequestQueryPage query) {
        LambdaQueryWrapper<TStation> queryWrapper = Wrappers.lambdaQuery();
        if (query.getName() != null) {
            queryWrapper.eq(TStation::getName, query.getName());
        }
        if (query.getNo() != null) {
            queryWrapper.eq(TStation::getNo, query.getNo());
        }
        return page(new Page<>(query.getCurrentPage(), query.getPageSize()), queryWrapper);
    }
}
