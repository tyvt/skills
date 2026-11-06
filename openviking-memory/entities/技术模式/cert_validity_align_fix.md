# 专业资格证书有效期列宽对齐修复
苏州市房地产监测V3 项目修复了 `personnelCertificate/detail.vue` 中「证书有效期」字段因 Element 默认最小宽度导致的列宽未对齐问题。

## 问题根因
- 「证书有效期」使用 `daterange`，置于 `el-row/el-col` 下易被 Element 默认最小宽度撑出列宽
- 同行 `input/select` 仍按列宽 100%，导致第三列最后一格偏长

## 修改内容
- 外层由 `el-row.detail-from-container` 改为 `div.detail-from-container`
- `zs-form` 增加 `label-position="top"`
- 编辑区改为 `section-form section-form--label-top` + 9 个 `section-field`（顺序不变），与品牌/机构基本信息页一致
- 套用 `detail-form.scss` 三列栅格与 `min-width: 0`，范围日期与其它控件同宽

## 涉及文件
- `zhi2-web-admin/src/views/company/personnelCertificate/detail.vue`
- `zhi2-web-admin/src/styles/detail-form.scss`
- `zhi2-web-admin/src/views/company/brand/detail.vue`（参照页）

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话ID：819c3c2f-b512-4af8-bde8-ad7a2b56d9c1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cert_validity_align_fix",
  "source_extraction_id": "6ec2c7711610458380e02ce0e47fab1d",
  "version": 1,
  "memory_type": "entities"
}
-->