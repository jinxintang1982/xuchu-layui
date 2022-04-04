package sanguo.xuchu.layui.controller.dto;

import lombok.Data;

@Data
public class RequestQueryPage {
    private String no;
    private String name;
    private String beginDate;
    private String endDate;
    private Integer currentPage;
    private Integer pageSize;
}
