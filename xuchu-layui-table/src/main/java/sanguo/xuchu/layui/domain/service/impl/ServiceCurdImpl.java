package sanguo.xuchu.layui.domain.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sanguo.xuchu.layui.domain.db.entity.TStation;
import sanguo.xuchu.layui.domain.db.service.ITStationService;
import sanguo.xuchu.layui.domain.service.IServiceCurd;


/**
 * @description:
 * @author: zhangchangzhi
 * @create: 2021-06-14 20:22
 **/

@Slf4j
@Service
public class ServiceCurdImpl implements IServiceCurd {
    @Autowired
    ITStationService itStationService;


}
