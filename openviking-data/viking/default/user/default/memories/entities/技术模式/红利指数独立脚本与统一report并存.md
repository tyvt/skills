# 红利指数独立脚本与统一report并存
投资推送仓库在统一 report.py -m 流水线之外，保留按指数拆分的独立脚本并约定新增同类指数时的复制规范。

## 结构约定
- 除 report.py -m 统一报告外，保留按指数拆分的独立脚本（如 930955.py、H30269.py）
- 各指数配套 *.example.env → *.env、run_*.bat、setup_*_task.bat，股债利差逻辑与主仓一致
- 新增同类指数时复制该套文件，改指数代码与名称即可

## 估值表与配置
- 估值表为 {code}indicator.xls，列结构与 930955 相同（PE 取第 7 列、股息率取第 10 列）
- config.INDICES 登记的是统一推送路径用的元数据，不替代独立脚本入口

## 验证与归属
- 验证证据：H30269 仿照 930955 新增脚本并实测 PE/股息率/国债/利差输出
- 涉及文件：930955.py、H30269.py、H30269.example.env、config.py
- 所属项目：投资推送；来源会话ID：45feeec0-aa70-4a57-8db0-3ebecabbf778

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "红利指数独立脚本与统一report并存",
  "source_extraction_id": "ca3327d69d744217af07100af44ea99c",
  "version": 1,
  "memory_type": "entities"
}
-->