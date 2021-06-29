import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import sanguo.xuchu.layui.MegviiApplication;
import sanguo.xuchu.layui.domain.db.service.ITStationService;
import sanguo.xuchu.layui.domain.service.IServiceCurd;

/**
 * @description:
 * @author: zhangchangzhi
 * @create: 2021-06-14 23:35
 **/
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MegviiApplication.class)
public class DevTest {
    @Autowired
    ITStationService itStationService;

    @Test
    public void getObjTest() {
        System.out.println(itStationService.list().get(0));
    }

}
