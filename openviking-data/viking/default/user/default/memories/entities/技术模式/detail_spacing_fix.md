# 详情页间距全局统一
苏州市房地产监测V3 项目完成详情页表单项与 Collapse 间距全局统一规范。

## 样式变量
- `variables.css`：`--detail-section-gap`(16px)=Headline/顶层区块，`--detail-block-gap`(12px)=表单项行距
- `--detail-section-form-row-gap` 改为 `var(--detail-block-gap)`，避免两处漂移

## 样式调整
- `index.scss`：`detail-from-container` 及内 `el-form`/`zs-form` 纵向间距统一 16px
- 上浮 `.basic-appendix-row` 栅格、`permit-appendix-panel` 高度链，取消 margin 叠加
- `.supervise-bank-row > .collapse-container` 高度规则全局化；删除冲突的 `.detail-from-container.el-row { gap: 0 }`
- `detail-form.scss` 同步调整

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`variables.css`、`index.scss`、`detail-form.scss`
- 所属项目：苏州市房地产监测V3；来源会话：5c76bcbe-41b3-4397-80d0-5a0934fb8fbd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_spacing_fix",
  "source_extraction_id": "62dedeb762f4419ea3e8f6efbbe1b55c",
  "version": 1,
  "memory_type": "entities"
}
-->