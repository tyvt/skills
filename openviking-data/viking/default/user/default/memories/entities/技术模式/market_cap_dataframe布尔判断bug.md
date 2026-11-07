# market_cap_dataframe布尔判断bug
引入市值过滤后 market_cap.py 对 pandas DataFrame 做裸 if df 判断会触发 FutureWarning/逻辑错误，导致 report.py 长跑失败。

## 根因
- market_cap.py 若对 pandas DataFrame 做裸 if df 判断会触发 FutureWarning 或逻辑错误
- report.py 长跑因此失败

## 修复做法
- 改用 df.empty、len(df) 或显式 is None 进行判断
- 修复后 report.py 冒烟约 5 分钟可通过

## 验证与归属
- 验证证据：「market_cap.py 的 DataFrame 判断修复有效」「report.py 冒烟测试已通过」
- 涉及文件：market_cap.py、report.py、dividend_lowvol_rotation/strategy.py
- 所属项目：投资推送；来源会话ID：a2c7cc90-42ee-4d7e-bdd6-92c635fcfe4b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "market_cap_dataframe布尔判断bug",
  "source_extraction_id": "be1298dcc5b446338f9b296050c4d29e",
  "version": 1,
  "memory_type": "entities"
}
-->