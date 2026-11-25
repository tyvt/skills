# deploy-env 收敛器
sync.ps1 与 gen_nginx_sites.ps1 是 deploy-env 中把注册表片段同步到 nginx 并做安全收敛的脚本。

## 片段与模板
- sync.ps1 片段命名 `<project>-<env>.conf`，模板仅 portal、fdc。
- 若 nginx 片段需与注册表完全对齐，可运行 deploy-env/sync.ps1 或 gen_nginx_sites.ps1；2026-11-25 会话未执行。

## 收敛安全
- nginx -t 失败自动还原备份并 exit 1，nginx 调用需显式 -p 前缀；退化检测仅「此前通、sync 后不通」算失败，deployed=0 跳过 reload。
- include 须锚点插入 sites-enabled include 之后（http 上下文内）、禁止追加文件末尾；与注册表端口冲突的片段归档待人工、不自动覆盖。
- listen 按行首解析，fixture 用真实 conf 换行且不占运行端口。
- SYNC_OK 为 1 个片段部署 + 25 个因 legacy 端口冲突归档，reload 后存量站点探活全 200，负向测试确认还原备份/不 reload/exit 1。


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "脚本",
  "name": "deploy_env_sync",
  "source_extraction_id": "c22a6b38e8e84968b7382f215bcb18d7",
  "version": 1,
  "memory_type": "entities"
}
-->