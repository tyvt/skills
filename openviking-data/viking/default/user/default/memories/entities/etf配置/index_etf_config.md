# index.html ETF目标配置与偏离阈值
`index.html` 中 `savedTargetAllocation`、`allEtfCodes`、`etfNameMap`、`DEVIATION_THRESHOLD_MAP` 的 ETF 配置规则与变更记录。

## 分档配置与偏离阈值
- `savedTargetAllocation` 分档占比：510300 7.62%、512890 5.07%、513500 9.51%、513100 5.07%、513030 3.17%、159920 4.44%、511260 30.00%、511010 15.00%、159980 7.50%、518880 7.50%、159985 5.00%
- `DEVIATION_THRESHOLD_MAP` 按代码分档：A股/海外权益类(510300、512890、513500、513100、513030、159920)20%、债券类(511260、511010)15%、商品类(159980、518880、159985)25%，替换统一25%逻辑并同步页面文案为"分档阈值(15%/20%/25%)" 
- `159985` 豆粕ETF 新增至 `allEtfCodes` 与 `etfNameMap`

## 商品ETF等权配置
- 商品四项（有色、黄金、豆粕、能源）设为等权 5%
- 新增 `159981` 能源化工ETF，并配置其偏离阈值（DEVIATION_THRESHOLD_MAP）

## 已移除ETF
- `159980` 有色ETF大成 已从上述四个配置映射移除（交易记录保留见偏好）

## 验证与归属
- 所属项目：repository
- 验证证据：extracted source=cursor project=repository
- 验证证据：session 1f76fd6e（新增159981等权）、session 7df4151d（移除159985）、session ea4aedc2（分档配置与偏离阈值映射及159985新增至配置映射）
- 涉及文件：index.html；来源会话：1f76fd6e-d89a-458b-944c-33368cb75cd4、7df4151d-0bd9-481e-9050-c6497d096212、ea4aedc2-db69-496e-8208-4907694c7bb7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "ETF配置",
  "name": "index_etf_config",
  "source_extraction_id": "d44604109b454c76915803a669417212",
  "version": 3,
  "memory_type": "entities"
}
-->