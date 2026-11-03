# 质保金协议物业弹窗 organType 须用 02
房屋质量保证金协议物业服务企业弹窗误用 organType '03'（会计机构），正确为 '02'，导致列表为空，须修正并规范自动填充逻辑。
## 问题根因
- 物业服务企业弹窗误用 organType: '03'（会计机构），正确应为 '02'，导致列表为空查不到数据。
## 解决方案
- 修复 guaranteeDepositAgreement/detail.vue 将 organType 改为 '02'。
- 选物业管理区域后调 /property/propertyContract/getByComplexId/{complexId} 自动填充合同字段并置只读，无合同则保留 /maintenance/propertyProject/companyInfo 兜底手动选择。
## 验证与归属
- 验证：会话 a8ef8efd 用户报弹窗列表为空，根因 organType 用错，修复改 '02' 并加自动填充兜底。
- 涉及文件：榆林G 项目 zhi2-web-admin/src/views/maintenance/guaranteeDepositAgreement/detail.vue、petition/petition/detail.vue、maintenance/initiation/detail.vue、credit/record/components/handle.vue、property/handover/detail.vue、company/companyManagement/components/detail.vue、property/propertyContract/components/detail.vue、src/components/zs-select-dialog/zs-select-dialog.vue；来源会话：a8ef8efd-ce98-4799-a804-7ad84b70236e；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "deposit_organ_type",
  "source_extraction_id": "00baf7a307324dad9ee0f606b283ca05",
  "version": 1,
  "memory_type": "entities"
}
-->