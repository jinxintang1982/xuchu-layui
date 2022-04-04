package sanguo.xuchu.layui.common.enumsCache;

import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author anning
 * 2019-09-02 13:02
 **/
@Slf4j
public class EnumsCache {

    private static Map<String, List<EnumItemDTO>> cache = new ConcurrentHashMap<>(64);

    public static List<EnumItemDTO> getData(String key) {
        return cache.get(key);
    }

    public static void init(String basePackage) {
        Set<Class> classSet = ClassScaner.scan(basePackage, Enum.class);
        classSet.forEach(clazz -> {
            if (!clazz.isEnum()) {
                return;
            }
            Enum enumData = (Enum) clazz.getAnnotation(Enum.class);
            String key = enumData.key();
            if (!org.springframework.util.StringUtils.hasText(key)) {
                key = clazz.getSimpleName();
            }
            if (cache.containsKey(key)) {
                log.error("存在重复key值得枚举：{}", key);
                System.exit(-1);
            }
            Object[] enums = clazz.getEnumConstants();
            if (enums == null || enums.length < 1) {
                return;
            }
            List<EnumItemDTO> enumItemList = new ArrayList<>();
            Field[] fields = clazz.getDeclaredFields();
            for (Field field : fields) {
                if (field.getType() != clazz) {
                    continue;
                }
                String name = field.getName();
                try {
                    Object enumValue = field.get(null);
                    Method getIdMethod = clazz.getDeclaredMethod("getId");
                    if (getIdMethod == null) {
                        continue;
                    }
                    Object idValue = getIdMethod.invoke(enumValue);
                    if (idValue == null) {
                        continue;
                    }
                    String id = String.valueOf(idValue);
                    try {
                        String text = clazz.getDeclaredMethod("getValue").invoke(enumValue).toString();
                        EnumItemDTO enumItem = new EnumItemDTO();
                        enumItem.setId(id).setValue(text).setName(name);
                        enumItemList.add(enumItem);
                    } catch (Exception ex) {
                        ex.printStackTrace();
                    }
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                    continue;
                } catch (NoSuchMethodException e) {
                    e.printStackTrace();
                    continue;
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                    continue;
                }
            }
            if (enumItemList.size() < 1) {
                return;
            }
            cache.put(key, enumItemList);
        });
    }
}
