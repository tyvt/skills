# 后端基础表空致功能块不渲染
功能整块不渲染且前端无报错时，先查后端指标/字典类基础表是否为空，别默认前端迁移遗漏。
## 现象
- 业主端报事报修详情页「满意度评价」区域整块不渲染（星星与标签都没有），模板/SVG/接口路径全对，似前端漏代码。
- 接口 `/property/workOrder/satisfaction/app/metrics/{workOrderId}` 正常返回空数组。
## 根因
- 测试库 `ZHISHU_PROPERTY.T_SATISFACTION_METRIC` 是空表，接口返回空数组，前端按数组渲染自然无内容。
- 指标/字典/枚举型基础配置表由后台配置，测试环境常未初始化；接口不报错只返空集合，现象同代码没写。
## 解决方案
- 排查顺序：先 curl 接口看空数组 → 查后端基础配置表 → 有数据再查前端映射，勿一上来翻前端 diff。
- 补数据带必填与状态位：插 3 条通用 STAR 指标（ORDER_TYPE=NULL 通用、必填、启用、未删除，ID 2115692100000000001~3，CREATE_USER='pua-fix'）。
- 补完回查落库，同页面重开验证（`detail?id=2115692010430087170` 出现 3 行指标×5 星+标签）。
- 若仍无星星抓接口响应，可能后端按 dept 过滤（指标行 DEPT_ID 补成 667599881032181）。
- 回归整条链路：评星→提交→详情页评价记录展示星星。
## 验证与归属
- 验证证据：会话 ea231417（基线 1660dca）根因测试库空表非前端遗漏，插入 3 条通用 STAR 指标并回查。
- 涉及文件：zhi2-mobile-shimin/src/pages_owner_extra/repair/detail.vue、pages_owner/repair/detail.vue、src/api/property.js。
- 提醒：3 条为测试数据，生产前由后端配正式指标后删除。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "empty_table_no_render",
  "source_extraction_id": "ca1c03debbd649dab1b71cd5d75db317",
  "version": 1,
  "memory_type": "entities"
}
-->