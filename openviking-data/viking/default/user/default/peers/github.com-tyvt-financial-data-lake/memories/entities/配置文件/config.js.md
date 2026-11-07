# config.js
持仓面板的配置文件，由 final_portfolio_v3.py 导出生成。
## 内容
- 包含 port 数组，每只标的含 payout2y、ocfd2y 字段
- targets[] 含 governance、rules、margin 等配置
## 关系
- 由 final_portfolio_v3.py 写入
- 被持仓面板前端 HTML 使用

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-financial-data-lake",
  "category": "配置文件",
  "name": "config.js",
  "source_extraction_id": "a8cd84a5bb1642c4a12ccfa93189212a",
  "version": 1,
  "memory_type": "entities"
}
-->