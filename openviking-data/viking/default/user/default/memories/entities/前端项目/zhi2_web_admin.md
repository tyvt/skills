# zhi2-web-admin

产品2.0 的前端 Web 管理后台项目，基于 Vue 与 Ruoyi 框架。

## 技术栈
- 基于 Vue 前端框架
- 沿用 Ruoyi 脚手架与工具（如 @/utils/ruoyi 的 getRouterPathByFilePath）
- 采用 mixins 复用（detailMixins、form、area、listMixins 等）

## 业务模块
- dataProperty：报废记录（scrappedRecord）、设施设备
- property：区域综合体（complex）、物业工单（workOrder）
- building：项目（project）
- maintenance：维修（repair）、设施设备详情（facility/detail）

## 项目归属
- 所属项目代号：产品2.0

<!-- MEMORY_FIELDS
{
  "category": "前端项目",
  "name": "zhi2_web_admin",
  "source_extraction_id": "219797852bbf4ca9af49c0cfb7160242",
  "version": 1,
  "memory_type": "entities"
}
-->