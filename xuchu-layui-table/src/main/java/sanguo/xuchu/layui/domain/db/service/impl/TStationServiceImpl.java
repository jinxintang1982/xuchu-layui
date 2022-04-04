package sanguo.xuchu.layui.domain.db.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
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
        queryWrapper.eq(!StringUtils.isEmpty(query.getName()), TStation::getName, query.getName())
                .eq(!StringUtils.isEmpty(query.getNo()), TStation::getNo, query.getNo())
                .eq(!StringUtils.isEmpty(query.getTaskType()), TStation::getType, query.getTaskType());

        return page(new Page<>(query.getCurrentPage(), query.getPageSize()), queryWrapper);
    }
}
