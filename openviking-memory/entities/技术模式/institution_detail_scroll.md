# 机构注册详情页内容被裁切且无法滚动
苏州市房地产监测V3 中 `company/institutionRegister/detail.vue` 的四个区块直接挂在 `.detail-container` 下导致内容超出固定高度后被裁切且无法滚动。

## 问题根因
- `styles/index.scss` 中 `.detail-container` 为 `height: calc(100vh - 120px); overflow: hidden` 的 flex 列容器，本身不滚动
- 真正滚动容器是 `.detail-from-container`（`flex: 1; min-height: 0; overflow-y: auto`）
- 该页面四个 `Headline` 直接挂在 `.detail-container` 下，缺少这层包装 → 内容超出后被裁掉且滚不动

## 解决方案
- 在 `company/institutionRegister/detail.vue` 中将「基本信息 / 机构管理员信息 / 要件上传 / 服务方案」四个区块包进 `<div class="detail-from-container">` 并缩进
- 操作按钮组与弹窗留在外层，与 `companyApplyAudit/detail.vue`、`companyCancel/detail.vue` 写法一致

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：styles/index.scss、zhi2-web-admin/src/views/company/institutionRegister/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：cdc32b79-3b70-462e-be5f-487ebd59e555；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "institution_detail_scroll",
  "source_extraction_id": "c5d95a38a9c04a809be2e123d4710d6d",
  "version": 1,
  "memory_type": "entities"
}
-->