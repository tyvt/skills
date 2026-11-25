---
audit_status: valid
last_checked: 2026-11-25T17:39:19+08:00
verdict_note: 核验通过：产品2.0/zhi2-web-admin 存在，src/views/dataProperty/scrappedRecord/{detail,index}.vue 与 mixins/detailMixins、ruoyi getRouterPathByFilePath 工具链均命中，技术栈(Vue+Ruoyi)与业务模块描述一致
---
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