package sanguo.xuchu.layui.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sanguo.xuchu.layui.common.DataResult;
import sanguo.xuchu.layui.domain.db.entity.TStation;
import sanguo.xuchu.layui.domain.db.service.ITStationService;
import sanguo.xuchu.layui.domain.service.IServiceCurd;

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
}



