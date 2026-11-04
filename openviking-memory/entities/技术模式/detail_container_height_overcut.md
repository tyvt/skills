# 详情页容器高度多扣致底部留白与标题截断
苏州市房地产监测V3 中 `src/styles/index.scss` 的 `.detail-container` 写死 `height: calc(100vh - 120px)`，比真实可用高度多扣 16px，导致底部 40px 灰白带且"变更信息"标题被截断。

## 问题根因
- 真实表头合计 navbar 56px + tags-view 48px = 104px，但 CSS 写死 `calc(100vh - 120px)` 多扣 16px
- 容器比视口矮 16px 形成底部死区，叠加自身 `padding-bottom: 24px` → 页面底部出现 40px 灰色空白带（截图 y=913→953 实测 40px）
- "变更信息"标题被容器下边缘拦腰截断（仅露上半截）

## 修复要点
- 作用域收敛到 `#app-main:has(> .detail-container)` 直属详情页，弹窗内 `detail-container`（468 处引用，部分在 el-dialog）不受影响
- 修正高度计算以匹配真实表头高度

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/src/styles/index.scss、zhi2-web-admin/src/views/company/companyManagement/change/detail.vue、zhi2-web-admin/src/views/toB/companyRecord/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：21609fbb-aecf-47c4-8d70-955eeb1e9b2b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_container_height_overcut",
  "source_extraction_id": "6e905a64a52f47dcb6f6e7f89e7320b7",
  "version": 1,
  "memory_type": "entities"
}
-->