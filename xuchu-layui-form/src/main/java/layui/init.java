package layui;

import layui.instructor.enumhandle.EnumsCache;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * @description:
 * @author: zhangchangzhi
 * @create: 2021-08-07 16:54
 **/
@Component
@Slf4j
public class init implements CommandLineRunner {
    @Override
    public void run(String... args) {
        EnumsCache.init();
    }
}
