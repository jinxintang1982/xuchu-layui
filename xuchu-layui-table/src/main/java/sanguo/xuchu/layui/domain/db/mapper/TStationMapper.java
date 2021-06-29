package sanguo.xuchu.layui.domain.db.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import sanguo.xuchu.layui.domain.db.entity.TStation;

import java.util.List;

/**
 * <p>
 * 站点表 Mapper 接口
 * </p>
 *
 * @author zhangchangzhi
 * @since 2021-06-10
 */
public interface TStationMapper extends BaseMapper<TStation> {
    @Select("SELECT * t_station FROM  ${ew.customSqlSegment}")
    List<TStation> selectBySql(@Param(Constants.WRAPPER) Wrapper<TStation> userWrapper);

}
