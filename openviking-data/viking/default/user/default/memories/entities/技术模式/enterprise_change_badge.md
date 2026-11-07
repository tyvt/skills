# 企业信息变更角标比对
苏州市房地产监测V3 中新增企业信息变更列表与详情菜单（主管部门审批用），变更项角标比对已实现，lint 0 错误。

## 公共 Mixin
- 新增 `src/mixins/changeObjectMixins.js`（资质 / 从业人员复用）
- `parseChangeObject(raw)`：`JSON.parse(changeObject)`，失败 / 为空返回 null
- `applyChangeObjectSnapshot(data)`：详情返回体提取快照写入 `beforeForm`；`changeObject` 为空时跳过比对并回落 `originInfo`
- `changeBadgeValue(field)`：逐字段比对，不一致返回快照原值显示角标；日期字段只比对 `yyyy-MM-dd`

## 变更详情
- 资质变更详情 `qualificationManagement/components/detail.vue` 重写 `detailCallback`，加载时快照入 `beforeForm`，编辑态 8 个表单项比对
- 从业人员变更详情 `staffManagement/components/detail.vue` 同步接入角标比对

## 验证与归属
- 涉及文件：`src/mixins/changeObjectMixins.js`、`qualificationManagement/components/detail.vue`、`staffManagement/components/detail.vue`
- 来源会话：57beaecb-baa4-4b9f-8dba-33b703218dcd；所属项目：苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "enterprise_change_badge",
  "source_extraction_id": "c9b7683152ec4919bda99ba8cded66d5",
  "version": 1,
  "memory_type": "entities"
}
-->