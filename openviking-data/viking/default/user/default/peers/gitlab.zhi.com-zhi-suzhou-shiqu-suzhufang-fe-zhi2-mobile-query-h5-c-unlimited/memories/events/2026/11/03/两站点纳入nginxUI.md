# Summary
2026-11-03 助手排查发现昆山物管（端口 8103）与苏州市房地产监测V3-bug6073（端口 8099）是手工写入 sites-enabled 的实体文件、未走 nginx UI 创建，故未登记在 nginx-ui 数据库。修复：复制为 sites-available 模板、在 database.db 的 sites 表插入记录（id 27、28）、将 enabled 实体文件改为软链接，nginx -t 通过并 reload。UI 站点从 8 个增至 10 个，全部 status=enabled，端口 8103/8099 均在线。
# 2026-11-03 (Tuesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 很多nginx里面部署的项目没有同步到nginx UI当中
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 找到差集了。对比：

**nginx-ui 数据库已登记（8 个）：** 苏州市房地产监测V3、产品2.0、苏州市房地产监测、太仓一网通办H5、门户、惠山物管V1、苏住房G、江阴智慧物业H5

**磁盘 `sites-enabled` 实际启用（生效站点的源文件）：**
- 昆山物管.conf ← **不在 UI 中**
- 苏州市房地产监测V3-bug6073.conf ← **不在 UI 中**（且与 UI 里的「苏州市房地产监测V3」可能是并行/替代版本）

**`sites-available` 模板（9 个）：** 产品2.0、太仓一网通办H5、惠山物管V1、江阴智慧物业H5、苏住房G、苏州市房地产监测、苏州市房地产监测V3、门户 —— 这些都在 UI 里；**昆山物管** 没有 available 模板文件（enabled 里是实体文件）。

所以核心缺失是 **昆山物管** 和 **苏州市房地产监测V3-bug6073**。先核实这两个 enabled 文件内容与其余站点是否已生效。
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: ...- 全量对比：所有生效站点遗漏数 **0**
- 数据库已备份：`D:\nginx-ui\database.db.bak-sync-20261103-141305`

现在打开 nginx UI（http://127.0.0.1:9000）的「网站」页即可看到全部 10 个站点，可正常启停、编辑。

以后新增站点建议统一在 nginx UI 里创建，避免再次出现"实际在跑、面板没有"的情况。

要我把这次的同步排查方法记进全局规则（新建站点必须走 nginx UI 创建）吗？

<!-- MEMORY_FIELDS
{
  "event_name": "两站点纳入nginxUI",
  "goal": "记录修复结果",
  "summary": "2026-11-03 助手排查发现昆山物管（端口 8103）与苏州市房地产监测V3-bug6073（端口 8099）是手工写入 sites-enabled 的实体文件、未走 nginx UI 创建，故未登记在 nginx-ui 数据库。修复：复制为 sites-available 模板、在 database.db 的 sites 表插入记录（id 27、28）、将 enabled 实体文件改为软链接，nginx -t 通过并 reload。UI 站点从 8 个增至 10 个，全部 status=enabled，端口 8103/8099 均在线。",
  "ranges": "49,70,122",
  "source_extraction_id": "ba60ef6d565b491cbf2d548c42ebd22e",
  "version": 1,
  "memory_type": "events"
}
-->