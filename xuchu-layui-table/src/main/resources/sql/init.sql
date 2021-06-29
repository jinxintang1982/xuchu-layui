DROP TABLE IF EXISTS `t_station`;
CREATE TABLE `t_station` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `no` varchar(32) NOT NULL DEFAULT '' COMMENT '站点编码',
  `name` varchar(32) NOT NULL DEFAULT '' COMMENT '名称',
  `lock_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '锁定状态:0未锁定，1锁定',
  `lock_job_id` bigint(20) DEFAULT '-1' COMMENT '锁定订单',
  `type` tinyint(2) DEFAULT NULL COMMENT '0发车 1空车 2送货',
  `description` varchar(255) DEFAULT NULL,
  `frame_no` varchar(40) NOT NULL DEFAULT '' COMMENT 'NO',
  `create_time` varchar(40) ,
  `update_time` varchar(40) ,
  PRIMARY KEY (`id`)
) ;