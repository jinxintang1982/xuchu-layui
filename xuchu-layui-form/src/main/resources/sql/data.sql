BEGIN;
INSERT INTO `t_station` VALUES (1, '1#', '1#', 0, -1, 0, '发车1号', '', '2021-01-28 07:38:19', '2021-06-21 22:25:15');
INSERT INTO `t_station` VALUES (2, '2#', '2#', 0, -1, 0, '发车2号', '', '2021-01-28 08:04:47', '2021-02-03 11:44:03');
INSERT INTO `t_station` VALUES (3, '3#', '3#', 0, -1, 0, '发车3号', '', '2021-01-30 07:30:07', '2021-02-03 11:44:07');
INSERT INTO `t_station` VALUES (4, '4#', '4#', 0, -1, 0, '发车4号', '', '2021-01-30 07:30:20', '2021-02-03 04:10:33');
INSERT INTO `t_station` VALUES (5, '5#', '5#', 0, -1, 0, '发车5号', '', '2021-01-30 07:30:43', '2021-02-03 11:44:13');
INSERT INTO `t_station` VALUES (6, '6#', '空车位', 1, 137, 1, '空车位', 'ws01-02', '2021-01-30 07:30:57', '2021-03-04 08:41:21');
INSERT INTO `t_station` VALUES (7, 'OP10', 'OP10', 0, -1, 2, '送货位', '', '2021-01-30 07:31:25', '2021-03-04 07:48:37');
INSERT INTO `t_station` VALUES (8, 'OP20', 'OP20', 1, 139, 2, '送货位', 'ws01-05', '2021-01-30 07:31:30', '2021-03-04 08:53:07');
INSERT INTO `t_station` VALUES (9, 'OP30', 'OP30', 0, -1, 2, '送货位', '', '2021-01-30 07:31:35', '2021-03-04 08:43:43');
INSERT INTO `t_station` VALUES (10, 'OP40', 'OP40', 0, -1, 2, '送货位', '', '2021-01-30 07:31:39', '2021-03-03 08:14:34');
INSERT INTO `t_station` VALUES (11, 'OP50', 'OP50', 0, -1, 2, '送货位', '', '2021-01-30 07:31:43', '2021-03-03 08:27:20');
INSERT INTO `t_station` VALUES (12, 'OP60', 'OP60', 0, -1, 2, '送货位', '', '2021-01-30 07:31:48', '2021-02-04 02:22:10');
INSERT INTO `t_station` VALUES (13, 'CPZZ', '成品装载', 0, -1, 0, '送货位', '', '2021-01-30 07:32:31', '2021-03-04 07:35:50');
INSERT INTO `t_station` VALUES (14, 'CP', '成品', 1, 138, 2, '送货位', 'ws01-06', '2021-03-04 07:34:11', '2021-03-04 08:49:18');
COMMIT;