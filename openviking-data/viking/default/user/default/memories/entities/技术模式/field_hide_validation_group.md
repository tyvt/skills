# 字段级隐藏需与校验/变更对比成组处理
以「物业管理区域隐藏住宅性质字段」为例，V3 字段隐藏必须编辑表单、必填校验、只读详情、变更对比四处声明同步改，否则出现列表没了详情还在、保存被必填拦住、变更对比凭空多一项。

## 问题与根因
- 用户要求「物业管理区域隐藏住宅性质字段」，范围含物业管理区域信息、楼幢授权、变更记录及公共查询下物业管理区域查询，且「新增、详情列表都隐藏」
- V3 字段隐藏从不是删一行为止——编辑表单、必填校验、只读详情（contentInfo 的 visible）、变更页「变更前/变更后」对比是四份独立声明，漏一处即不一致

## 怎么做
- 每个相关 detail.vue 三件事一起做：移除新增/编辑表单表单项、移除对应必填校验规则、详情展示项置 visible: false
- 变更记录页额外处理变更对比展示；publicQuery 下同名模块只查看无编辑表单，只改 visible
- 后端字段（本例 propertyProjectType）保留不动，仅前端隐藏，避免影响已有数据与提交载荷；列表页本就无该列则不处理

## 与已知差异及验证
- 与 701/1050 差异：那两条强调「用常量开关而非删模板，避免保存时清空历史数据」；本条补充同次改造里「校验规则」与「变更前后对比」两处最易漏落点，且明确「只隐藏 UI、保留字段」是用户可接受口径
- 验证证据：会话 4e58a576，4 个文件同改（property/complex、complexBuildingAuth、complexChange、publicQuery/complex 的 detail.vue），说明「后端字段 propertyProjectType 仍保留，仅前端 UI 隐藏」，列表页无该列故未改
- 涉及文件：zhi2-web-admin/src/views/property/complex/detail.vue；complexBuildingAuth/detail.vue；complexChange/detail.vue；publicQuery/complex/detail.vue
- 所属项目：苏住房G；来源会话ID：4e58a576-9c70-464d-9300-446437e74594；代码基线：4fad664


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "field_hide_validation_group",
  "source_extraction_id": "397984d9306b4d00ab495e7e01753845",
  "version": 1,
  "memory_type": "entities"
}
-->