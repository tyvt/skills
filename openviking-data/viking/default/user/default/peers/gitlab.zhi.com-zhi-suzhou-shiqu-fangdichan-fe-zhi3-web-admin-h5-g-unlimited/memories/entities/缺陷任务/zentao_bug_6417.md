# 禅道Bug 6417 从业人员备案申请证书字段保存后不显示
房产管理系统zhi2-web-admin中从业人员备案申请表单，专业人员类型下资格证书类型/证书管理号自动填充但保存后详情页显示“-”，2026-11-10 分析中。

## 基本信息
- 提交人/指派：用户贴出禅道链接 bugID=6417（zentao-biz.zhi.com），由助手代理分析
- 模块：苏州市房地产综合服务平台门户站点，路由 `jgcyry/agencyPersonnelApply`
- 代码位置：`zhi2-web-admin/src/views/institution/agencyPersonnel/`，详情页 `detail.vue` 兼做新增/申请

## 现象与根因分析
- 现象：人员类型=专业人员时，certificateType/certificateCode 自动填充，保存后详情页显示“-”
- 前端保存 payload 包含 certificateType/certificateCode，loadDetail 直接展开后端 personnel 对象
- 后端表 `T_PERSONNEL_RECORD`/`T_PERSONNEL_APPLY` 无 CERTIFICATE_TYPE/CERTIFICATE_CODE 列，证书为独立实体 `T_PERSONNEL_CERTIFICATE`（含 CERTIFICATE_TYPE、CERTIFICATE_CODE、PERSONNEL_ID）
- 前端 loadDetail 仅映射 `data.certificateList`，未回填基础信息表单的 certificateType/certificateCode，导致详情展示缺失
- SHOW_EXTENDED_PERSONNEL_SECTIONS=false，资格证书独立区块隐藏，证书字段寄居基础信息表单与详情视图

## 分析进度
- 截至 2026-11-10 会话，根因定位完成，正在参考并行模块（企业人员管理详情）确认 API 契约，尚未修复与禅道回写

## 关联
- 同类门户前端项目 zhi2-web-admin；参照缺陷 6145/6363/6372 处理流程（见对应实体）

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6417",
  "source_extraction_id": "910156a9b6ba44b698fa72ea4a87c60d",
  "version": 1,
  "memory_type": "entities"
}
-->