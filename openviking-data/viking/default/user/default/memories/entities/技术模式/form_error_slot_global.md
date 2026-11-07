# 表单项纵向间距与校验错误全局统一
苏州市房地产监测V3 将表单项改为固定留白、不随报错撑高，统一全局样式。

## 调整说明
- variables.css 新增 --form-item-error-slot: 20px，每个表单项底部固定留出校验文案区域，--detail-block-gap 恢复为 12px
- element-ui.scss 去掉 position: static，全局 .el-form-item 使用 padding-bottom: var(--form-item-error-slot)，错误用 Element 默认绝对定位落在预留区内
- detail-form.scss 去掉折叠区内对 padding-bottom: 0 的覆盖，与全局预留一致
- 列表/搜索区仍为 padding-bottom: 0 避免搜索条变松，存量房合同详情右侧保留 position: absolute 局部样式不受影响

## 备注与归属
- 若 20px 仍偶发换行被裁切，可把 --form-item-error-slot 调到 22px
- 所属项目：苏州市房地产监测V3
- 来源会话：b34cefdf-bb09-4582-a539-6c0a8a4fcc9e
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：variables.css、element-ui.scss、detail-form.scss

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "form_error_slot_global",
  "source_extraction_id": "152541cf03c74c8fbf304040976910c6",
  "version": 1,
  "memory_type": "entities"
}
-->