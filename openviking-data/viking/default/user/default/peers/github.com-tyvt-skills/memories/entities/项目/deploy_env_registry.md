# deploy-env 注册表
deploy-env 的 SQLite 站点注册表（registry.sqlite），保存 nginx 站点、环境与账号的结构化数据，是部署单一事实来源的数据层。

## 数据与迁移
- registry.sqlite 按约定不入 git、保持基线脏状态；迁移新增 3 列与 events 事件流水表，迁移前留备份。
- 表含 env_registry、projects、deploy_events、env_accounts；sync.ps1 片段命名 <project>-<env>.conf，模板仅 portal、fdc。

## 环境模型
- 每项目固定 5 槽位：本地、公司开发、公司测试、客户测试、生产，端口分开并分别代理不同网关，端口按 port_base + 0..4 分配。
- 注册站点 10 → 26 个，env 取值 local/dev/test/uat/prod；sites-enabled 30 个文件均为真实活站点，占 8090-8104。
- 2026-11-24 用户定规则：网关以 dev.zhi.com 结尾为公司开发、test.zhi.com 为公司测试，本地环境必须是 localhost 或 127.0.0.x；据此批量修正 8 行 env（园区公共收益→dev；太仓一网通办H5、无锡市区G、无锡市区小程序嵌入H5、江阴公共收益、泰兴G、淮安物管、防汛C端→test），portal/fdc-v3 五槽模板与 192.168/公网网关行未动。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "项目",
  "name": "deploy_env_registry",
  "source_extraction_id": "edc2e728179a45caa86599d19b54bd39",
  "version": 1,
  "memory_type": "entities"
}
-->