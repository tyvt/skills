
# 维修对象数展示修复
泰兴小程序项目列表页将展示改为接口返回的 objectNum（维修对象数），并修正空值显示逻辑。

## 问题背景
- project.vue 原展示用 houseMaintenanceApplyVoList.length 算出的 applyCount（维修申请数量）。
- 用户要求与字段含义一致，改为展示 item.objectNum（维修对象数）。

## 修复内容
- project.vue：该行展示改为 item.objectNum，仅 null/undefined/空字符串显示 `-`，0 正常显示为 0。
- maintainProject.js：去掉 applyCount 计算，objectNum 随 ...row 保留在列表项。
- 若需文案一致，可将标签从「维修申请数量」改为「维修对象数」。

## 验证与归属
- 验证：extracted source=cursor session=bc34b808-3561-437d-9b34-098a77d7e44d
- 涉及文件：d:/repository/泰兴小程序/src/pages_maintain_project/project.vue、maintainProject.js、index.vue、api/maintenance.js、project-detail.vue
- 所属项目：泰兴小程序；来源会话：bc34b808-3561-437d-9b34-098a77d7e44d；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "objectnum_display_fix",
  "source_extraction_id": "930aeb202b4947b390d651ba7a9adf06",
  "version": 1,
  "memory_type": "entities"
}
-->