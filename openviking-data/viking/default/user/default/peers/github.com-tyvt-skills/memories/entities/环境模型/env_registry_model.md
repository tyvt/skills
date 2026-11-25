# deploy-env 环境模型
deploy-env 把项目登记为固定五环境槽位，并用网关后缀判定 dev/test 归属。

## 槽位与网关
- 每项目固定 5 槽位：本地、公司开发、公司测试、客户测试、生产，端口按 port_base+0..4 分配并各自代理不同网关；注册站点 10→26 个，env 取 local/dev/test/uat/prod，sites-enabled 30 个文件均为真实活站点、占 8090-8104。
- 网关归类：dev.zhi.com 结尾为公司开发，test.zhi.com 为公司测试，本地须 localhost 或 127.0.0.x；据此批量修正 8 行 env（园区公共收益→dev；太仓一网通办H5、无锡市区G、无锡市区小程序嵌入H5、江阴公共收益、泰兴G、淮安物管、防汛C端→test），portal/fdc-v3 五槽模板与 192.168/公网网关行未动。
- fdc-v3 严格 5 槽 8100/8101/8102/8103/8104：合并残留行 local-8098（8098）已删除，客测网关 http://58.210.252.230:9002 归位 uat（8103）；迁移脚本仅重映射已存在的 id=24，不会重建 8098。

## 清理规则
- 2026-11-25 prune_mismatched_gw_envs.py：无 local 的项目删掉全部 dev/test/uat/prod；有 local 的删掉网关与本地不一致的非 local。
- 已 --apply 清理并备份 registry.sqlite.bak-prune-gw-20261125_163806、registry.sqlite.bak-prune-gw-20261125_164322；共删除 19 条环境（含相城G 公司开发、苏州房G 公司测试、防汛C 端 dev/test 等无 local 或多网关登记）。


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "环境模型",
  "name": "env_registry_model",
  "source_extraction_id": "c22a6b38e8e84968b7382f215bcb18d7",
  "version": 1,
  "memory_type": "entities"
}
-->