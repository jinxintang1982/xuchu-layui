package layui.facade;

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
}
