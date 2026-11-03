# index.html ETF目标配置与偏离阈值
`index.html` 中 `savedTargetAllocation`、`allEtfCodes`、`etfNameMap`、`DEVIATION_THRESHOLD_MAP` 的 ETF 配置规则与变更记录。

## 分档配置与偏离阈值
- `savedTargetAllocation` 更新为分档占比
- `DEVIATION_THRESHOLD_MAP` 按代码分档设定偏离阈值：权益20%/债券15%/商品25%，替换统一25%逻辑并同步页面文案
- `159985` 豆粕ETF 新增至 `allEtfCodes` 与 `etfNameMap`

## 商品ETF等权配置
- 商品四项（有色、黄金、豆粕、能源）设为等权 5%
- 新增 `159981` 能源化工ETF，并配置其偏离阈值（DEVIATION_THRESHOLD_MAP）

## 已移除ETF
- `159980` 有色ETF大成 已从上述四个配置映射移除（交易记录保留见偏好）

## 验证与归属
- 验证证据：session 1f76fd6e（新增159981等权）、session 7df4151d（移除159985）、session ea4aedc2（分档配置与偏离阈值映射及159985新增至配置映射）
- 涉及文件：index.html；来源会话：1f76fd6e-d89a-458b-944c-33368cb75cd4、7df4151d-0bd9-481e-9050-c6497d096212、ea4aedc2-db69-496e-8208-4907694c7bb7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "ETF配置",
  "name": "index_etf_config",
  "source_extraction_id": "0e7434ba154d436d894fccd84beaef7d",
  "version": 2,
  "memory_type": "entities"
}
-->