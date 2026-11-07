# 弹窗表单 el-row 须置于 zs-form 外部
在 zs-dialog 弹窗两列表单中，将 el-row 放在 zs-form 内部会导致输入框宽度塌陷、placeholder 显示不全。

## 问题根因
- 本项目 zs-form 已接管栅格计算（平台级 label 宽度 + 全局满宽规则）
- 内部再塞 el-row 造成两层栅格叠加，el-col 的 50% 相对于已被收缩的容器计算，宽度塌陷
- placeholder 长于压窄输入框时被截断，表现为显示不全而非布局错乱

## 解决方案
- 按已有弹窗（addpopupDialog 等）写法，将 el-row 提到 zs-form 外面：form-box → el-row → detail-from-container → zs-form.form → el-col(50%)
- 改完后要求用户 Ctrl+F5 强刷，避免 Vite 热更新残留旧样式
- 与「el-col 必须是 .zs-form 直接子级」「弹窗内禁写 el-row/el-col」两条口径互补：本条针对确实需要栅格时 el-row 放外层

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：zhi2-web-admin/src/views/maintenance/accRefund/components/AccountRefundTable.vue
- 所属项目：产品2.0
- 来源会话ID：d5ae2f3e-c3d7-4c77-8ef2-048ffc7b39f4
- 代码基线：94b86fa

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsform_elrow_bug",
  "source_extraction_id": "2c4fb9e23b1f49d3949a5b972ee566fe",
  "version": 1,
  "memory_type": "entities"
}
-->