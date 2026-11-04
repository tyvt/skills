# H5外链complexId缺projectName修复
i淮安公版 H5 外链仅解析 complexId 未同步 projectName，导致资产公示、公共收益等页项目名显示为空，已修复。

## 问题根因
- H5 外链进入时只解析了 complexId，没有同步 projectName，依赖 userStore.projectName 的页面（如资产公示、公共收益等）项目名称显示为空。

## 修复内容
- 从 URL 解析项目名称：支持 name 和 complexName 两个参数名（兼容不同外链格式）。
- 写入 store：解析到名称后设置 userStore.projectName。
- API 兜底：URL 没有名称但有 token + complexId 时，调用 listComplexCommunitySubdistrictByToken 按 complexId 匹配并补全 projectName（与 benefit/index.vue 逻辑一致）。
- 清空逻辑：无 complexId 时同时清空 project 和 projectName。
- 外链 URL 示例：...?token=xxx&complexId=123&name=某某小区 或 ...?token=xxx&complexId=123&complexName=某某小区。

## 验证与归属
- 验证证据：extracted source=cursor project=i淮安公版
- 涉及文件：App.vue、benefit/index.vue、assetsPublicity/index.vue、elevatorPubEngCons/index.vue、my.vue
- 所属项目：i淮安公版；来源会话 ID：1f0e9970-bd03-4731-9554-11ef4c522ce2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "project_name_fix",
  "source_extraction_id": "0c28d5f415194f44b604cfd2092ad894",
  "version": 1,
  "memory_type": "entities"
}
-->