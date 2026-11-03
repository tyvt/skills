# 公示起止日期不少于7天校验
自治/公示类详情要求公示期不少于7天，产品约定初始日期不算天数，用 dayjs 日历差实现。

## 业务口径
- 公示期不少于7天，2026-08-01～2026-08-08 计为7天（日历日差），2026-08-01～2026-08-07 为6天应拦截
- 边界自测用7/6/1天三组日期在新增/编辑保存前验证

## 实现要点
- detail.vue 抽 validatePublicityDateRange：dayjs diff('day') >=7，不满足 callback 固定提示
- publicityBeginDate、publicityEndDate 两条 rules 挂同一 validator，trigger:'change'
- syncPublicityDays 用 watch 监听起止日期写回 form.publicityDays，结束日期变更时主动 validateField('publicityBeginDate')

## 验证与归属
- 验证：会话 b11d3681 实现 validator、rules trigger 改 change、watch 同步天数并重校验 begin；边界表 08-01~08-08 通过、08-07 与 08-03~08-04 拦截
- 涉及文件：zhi2-web-admin/src/views/autonomy/publicity/detail.vue
- 所属项目：园区公共收益；来源会话：b11d3681-1919-4ab7-bb72-0f3cec392874；代码基线：0abcb96

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "publicity_date_check",
  "source_extraction_id": "d709eae86a0446e2bbf553bea5add833",
  "version": 1,
  "memory_type": "entities"
}
-->