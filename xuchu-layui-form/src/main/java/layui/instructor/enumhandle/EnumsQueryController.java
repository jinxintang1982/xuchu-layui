package layui.instructor.enumhandle;

import layui.instructor.DataResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.Assert;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author anning
 * 2019-08-21 18:20
 **/
@RestController
@RequestMapping("enums")
@Slf4j
public class EnumsQueryController {

    @PostMapping(value = "/query")
    public DataResult<List<EnumDataDTO>> getEnums(@RequestBody List<EnumQuery> queryList) {
        log.info("getEnums queryList = {}",queryList);
        Assert.notNull(queryList, "查询参数不能为空");
        Assert.notEmpty(queryList.toArray(), "查询参数不能为空");

        List<EnumDataDTO> enumDataDTOList = new ArrayList<>();
        queryList.forEach(query -> {
            EnumDataDTO enumDataDTO = new EnumDataDTO();
            enumDataDTO.setKey(query.getKey());
            enumDataDTO.setEnumList(EnumsCache.getData(query.getKey()));
            if (!CollectionUtils.isEmpty(query.getNameList())
                    && !CollectionUtils.isEmpty(enumDataDTO.getEnumList())) {
                enumDataDTO.setEnumList(
                        enumDataDTO.getEnumList().stream()
                                .filter(x -> query.getNameList().contains(x.getName()))
                                .collect(Collectors.toList()));
            }
            enumDataDTOList.add(enumDataDTO);
        });
        return DataResult.success(enumDataDTOList);
    }
}
