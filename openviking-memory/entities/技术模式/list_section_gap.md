# 全局列表查询区与卡片间距统一为12px
苏州市房地产监测V3 的 zhi2-web-admin 通过调整 CSS 变量与容器 gap 统一列表间距。

## 变更内容
- variables.css 新增 --list-section-gap: 12px（与 --detail-block-gap 同档）
- index.scss 中 .list-container 增加 gap: var(--list-section-gap)，查询区与 list-card 之间统一 12px
- .list-container .region-tree-layout .type-right-body 增加相同 gap
- .lease-contract-list 去掉重复 gap:12px，仅保留 search-form-container { margin-bottom: 0 }

## 影响范围
- 企业入网变更备案 companyManagement/change → ListTemplate 吃到全局 gap
- 区域树列表 property/complex/index.vue 等

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：variables.css、index.scss、property/complex/index.vue、e2e/company/company-record-change.spec.js
- 所属项目：苏州市房地产监测V3；来源会话：750c5f05-27fa-429e-89fd-82d7adcd5bc9；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_section_gap",
  "source_extraction_id": "2c79c87a304d4b9a9dcb02329c6a7a73",
  "version": 1,
  "memory_type": "entities"
}
-->