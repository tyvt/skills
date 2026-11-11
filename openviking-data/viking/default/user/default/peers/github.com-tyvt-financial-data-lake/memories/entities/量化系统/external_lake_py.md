# external_lake.py
含代理配置的外部数据脚本。

## 关键逻辑
- `分析产出/external_lake.py` 含 `configure_proxy()` 配置网络代理
- `configure_proxy()` 从策略文件强制设置 `HTTP_PROXY/HTTPS_PROXY=http://127.0.0.1:7890`

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-financial-data-lake",
  "category": "量化系统",
  "name": "external_lake_py",
  "source_extraction_id": "0930b07e715c452a87b9125bb4a5dba6",
  "version": 1,
  "memory_type": "entities"
}
-->