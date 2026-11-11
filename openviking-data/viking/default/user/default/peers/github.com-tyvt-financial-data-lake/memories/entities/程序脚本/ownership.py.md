# ownership.py
数据湖选股模块中的实控人归属判定脚本，加载国资白名单/黑名单并供 screen_sz.py、screen_sh.py 调用。

## 功能
- 加载 `国资主体白名单.csv`（51 条）与 `非国资法人名单.csv`（3 条）进行实控人三态分类
- `classify_owner` 依次走 `_CENTRAL` 关键词（含「中央汇金」）、白名单精确匹配、黑名单匹配
- 输出三态：通过（国资/无实控人）、否决（个人/家族/民营法人）、待确认（法人未列名录/供销社集体所有制）、缺失

## 路径 Bug 与修复（2026-11-11）
- 原 WL/NEG/CACHE 用相对路径（如 '国资主体白名单.csv'），从非 分析产出/ 的 cwd 运行时 os.path.exists 返回 False，静默返回空表
- 后果：所有法人一律落入「待确认」，5 家央企（华润三九/招商公路/湖北能源/国药一致/长城证券）被误挂待确认，双汇发展未命中黑名单
- 白名单/黑名单内容本身正确（5 家央企与兴泰集团均在），是加载路径让名单「隐身」
- 已改为基于 __file__ 的绝对路径，修复后 5 家央企回归通过、双汇命中黑名单进否决

## Relations
- 被 screen_sz.py、screen_sh.py import 复用
- 治理核查流程见实体「governance_check」


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-financial-data-lake",
  "category": "程序脚本",
  "name": "ownership.py",
  "source_extraction_id": "2571d6307e8e4e6f99943d20ceca54c3",
  "version": 1,
  "memory_type": "entities"
}
-->