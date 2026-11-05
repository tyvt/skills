# 抽取专家详情页面UI调整
园区物管2.0 按截图要求完成「抽取专家详情」页面 UI 调整，统一备注位置并补充表格记录数。

## 修改要点
- 基本信息表单：查看模式用 DetailTemplate 蓝色矩形表单，字段顺序为抽取事项→专家总数/抽取人数/屏蔽专家数→备注（最后一行）
- 编辑模式备注移到专家总数那一行下方
- 屏蔽专家表（BlockExpertTable.vue）与抽选结果表（ExpertResultTable.vue）底部增加「共 XX 条记录」
- 同步修复物业模块（property/extract/detail.vue）编辑模式备注位置与查看模式备注移至最后

## 涉及文件
- credit/extract/detail.vue、BlockExpertTable.vue、ExpertResultTable.vue、property/extract/detail.vue

## 验证与归属
- 所属项目：园区物管2.0；来源会话：87a99be6-6232-4f70-af80-05cf6659e728

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "extract_expert_detail_ui",
  "source_extraction_id": "7f0421bf3af94f03b6b0c602ea55cca8",
  "version": 1,
  "memory_type": "entities"
}
-->