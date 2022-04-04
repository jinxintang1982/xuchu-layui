package sanguo.xuchu.layui.common.enumsCache;

import java.lang.annotation.*;

/**
 * @author anning
 * 2019-09-02 11:31
 **/
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Enum {

    String key() default "";
}
