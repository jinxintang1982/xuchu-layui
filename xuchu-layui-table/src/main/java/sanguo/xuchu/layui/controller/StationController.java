package sanguo.xuchu.layui.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sanguo.xuchu.layui.common.DataResult;
import sanguo.xuchu.layui.common.PageResult;
import sanguo.xuchu.layui.controller.dto.RequestCommit;
import sanguo.xuchu.layui.controller.dto.RequestQueryPage;
import sanguo.xuchu.layui.domain.db.entity.TStation;
import sanguo.xuchu.layui.domain.db.service.ITStationService;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/station")
public class StationController {

    @Autowired
    ITStationService itStationService;

    @RequestMapping(value = "/hello")
    public String hello() {
        return "hello";
    }

    @RequestMapping(value = "/list")
    public DataResult<List<TStation>> list() {
        return DataResult.success(itStationService.list());
    }

    @RequestMapping(value = "/listPage")
    public DataResult<PageResult<TStation>> listPage(@RequestBody RequestQueryPage query) {
        IPage<TStation> actionData =  itStationService.listPage(query);

        PageResult<TStation> pageResult = new PageResult<>();
        pageResult.setTotal(actionData.getTotal());
        pageResult.setData(actionData.getRecords());
        return DataResult.success(pageResult);

    }

    @RequestMapping(value = "/finish")
    public DataResult finish(String no) {
        log.info("finish no = {}" ,no );
        return DataResult.success();
    }

    @RequestMapping(value = "/cancel")
    public DataResult cancel(@RequestBody RequestCommit commit) {
        log.info("cancel = {}", commit);
        return DataResult.success();
    }
}



