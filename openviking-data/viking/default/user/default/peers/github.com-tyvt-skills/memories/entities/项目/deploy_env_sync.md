# deploy-env 收敛脚本
deploy-env 的 sync.ps1 负责把注册表站点片段部署到 nginx，并执行门禁、退化检测与冲突归档。

## 收敛机制
- 探活由串行改并行：26 站点串行最坏约 100 秒会让 /api/state 超时；取消「未收录」区块前 /api/state 返回 200 含 26 站点、9 个未收录 conf、20 条事件。
- 门禁：nginx -t 失败自动还原备份并 exit 1；nginx 调用需显式 -p 前缀；deployed=0 跳过 reload。
- 退化检测：sync 前快照探活，仅「此前通、sync 后不通」算失败。
- include 须锚点插入 sites-enabled include 之后（http 上下文内），禁止 Add-Content 追加文件末尾；与注册表端口冲突的片段归档待人工，不自动覆盖。

## 验证与结果
- 正式收敛 SYNC_OK：1 个片段部署、25 个因 legacy 端口冲突归档，reload 后存量站点探活全 200。
- listen-parse 改按行首 listen 解析，fixture 用真实 conf 换行格式、不占运行端口。
- 负向测试确认还原备份、不 reload、exit 1。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "项目",
  "name": "deploy_env_sync",
  "source_extraction_id": "edc2e728179a45caa86599d19b54bd39",
  "version": 1,
  "memory_type": "entities"
}
-->