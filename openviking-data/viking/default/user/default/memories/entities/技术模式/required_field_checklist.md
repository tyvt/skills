# 新增必填字段前置核对表工作流
在苏住房G项目中，后端新增必填字段并要求前端多页面落地时，须先产出「接口 × 入参/返回值」核对表 md 再动手。
## 适用场景
- 后端新增必填字段（如法人-证件 legalPersonIdFile，String、逗号分隔多文件 URL）需前端在多个页面落地
- 同一字段散落在多条业务链路（登录页机构注册、物业服务企业/开发企业新增编辑详情、机构注册审核、企业变更记录、企业查询详情等）
## 做法
- 先按需求产出 md 核对表，逐个接口标注字段是「入参」「返回值」或两者，交后端核对确认契约
- 确认后按「编辑表单 → 保存载荷 → 查看/只读态展示 → 校验规则 → 变更记录差异比对」五条链路逐页对照改，表中打勾
- 文件类字段上传约束（≤5MB、png/jpg/jpeg/pdf、最多5个）同时落进上传组件限制与校验提示
## 验证与归属
- 验证证据：用户多次要求列出涉及接口及字段作为入参/返回值形成 md 与后端核对，后再按计划实施
- 涉及文件：companyInfo.vue、companyManagement/detail.vue、companyRegister/detail.vue、table.vue、ImageUpload/index.vue、zs-file-upload.vue 等
- 所属项目：苏住房G；来源会话：e747dadd-5d94-41a0-aacd-f7ce9b7e6647；代码基线：b0f2039

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "required_field_checklist",
  "source_extraction_id": "85080ea7fd7b49f2a6f0d4ca4a7361e9",
  "version": 1,
  "memory_type": "entities"
}
-->