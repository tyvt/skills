# ProjectCertificateDetailDialog
弹窗组件用于项目备案申请页查看不动产权证书、规划、施工证书详情。

## 功能
- 位于 zhi2-web-admin 的 src/views/projectManagement/customerProject/components/
- 复用详情页 detail-from-container + zs-form 结构渲染证书详情
- 支持三种证书类型（不动产/规划/施工）共用该弹窗结构

## 已知问题修复
- 2026-11-05 修复查看弹窗右侧大片空白：根因为全局样式 .el-dialog__body .detail-from-container > .zs-form { flex-direction: row } 使区块容器收缩
- 修复方式：在组件 style 中新增作用域规则恢复 zs-form 纵向堆叠并让 .presale-detail-section-stack 铺满整行
- 修复已提交推送至 develop/v3.0.0（子模块提交 2674155，父仓库 46cef57）

## 相关文件
- 修改文件：ProjectCertificateDetailDialog.vue
- 关联样式：detail-form.scss 全局规则、index.scss 中 .presale-detail-section-stack 宽度规则


<!-- MEMORY_FIELDS
{
  "category": "前端组件",
  "name": "project_certificate_detail_dialog",
  "source_extraction_id": "ec3b7501f743451aba57e020c9762d0b",
  "version": 1,
  "memory_type": "entities"
}
-->