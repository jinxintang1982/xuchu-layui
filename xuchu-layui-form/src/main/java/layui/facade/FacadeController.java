package layui.facade;

import layui.domain.db.enums.LockStatusEnum;
import layui.facade.dto.ResponseEdit;
import layui.instructor.DataResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @description:
 * @author: zhangchangzhi
 * @create: 2021-08-07 11:34
 **/
@RestController
@Slf4j
@RequestMapping("/facade")
public class FacadeController {

    @RequestMapping(value = "/hello")
    public String hello() {
        return "hello";
    }

    @RequestMapping(value = "/edit")
    public DataResult edit() {
        log.info("~~~ edit ~~~");
        return DataResult.success(new ResponseEdit().setLockStatus(LockStatusEnum.LOCKED.getId())
                .setArriveDate("2021-09-03").setEmail("zcz@12.com").setIntEdt(11).setStrEdt("222"));
    }
}
