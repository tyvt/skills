# qa_checks.py
数据湖项目中用于质量校验的脚本。
## 功能
- 在 Windows 下将 stdout/stderr 设为 UTF-8，避免校验项名称中的特殊字符触发 UnicodeEncodeError
- 检查 final_portfolio_v3.py 导出数据的一致性
## 关系
- 与 final_portfolio_v3.py 同属数据湖分析产出脚本

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-financial-data-lake",
  "category": "Python分析脚本",
  "name": "qa_checks.py",
  "source_extraction_id": "a8cd84a5bb1642c4a12ccfa93189212a",
  "version": 1,
  "memory_type": "entities"
}
-->