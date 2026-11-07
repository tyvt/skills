# 门户表格标题栏高度统一 60px
portal.scss 将 .portal-table-toolbar 高度由 46px 改为 60px，使标题文字垂直居中且布局零位移。

## 样式规则
- .portal-table-toolbar 高度由 46px 改 60px
- .has-toolbar 上内边距归零使标题文字垂直居中
- PortalSkeleton.vue 骨架屏同步 60px
- 原 14px+46px 合计不变，表头与卡片位置零位移

## 验证与归属
- 验证证据：extracted source=zcode session=session_aa20395abc9239656fdafa009d6de60f
- 涉及文件：portal.scss ; PortalSkeleton.vue
- 来源会话ID：session_aa20395abc9239656fdafa009d6de60f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_toolbar_60px",
  "source_extraction_id": "33f4963f45204d3a81f502bef31db9dd",
  "version": 1,
  "memory_type": "entities"
}
-->