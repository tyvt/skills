# 苏住房防汛C端（移动查询 H5）
苏住房防汛C端移动查询 H5 项目，主检出位于 D:\repository\苏住房防汛C端，nginx 直读 dist 目录。

## 结构与页面
- 仓库主检出在 dev 分支、非 detached，改动直接落在主检出；dist 根为 D:\repository\苏住房防汛C端\dist，由 nginx 直接读取
- 求援工单模块含列表页 index.vue、详情页 detail.vue、填报页 form.vue，页面与导航配置在 src/pages.json
- 三页均为标准 navigationBarTitleText 配置、无 navigationStyle:custom，页面跳转走 uni.navigateTo

## 接口与渲染
- 求援工单列表接口 /api/v2.0/safety/flood/rescue/page，详情接口 /api/v2.0/safety/flood/rescue/{id}
- 列表图片字段 attachUrl 在 mapRow 中被 split(',') 切分，data-URL 自带逗号会导致图片不渲染，需改用真实 PNG 的 URL
- H5 编译产物不渲染可见导航栏条（DOM 无 .uni-page-head），与项目其他页面一致，页面标题正常、顶部仅有约 8px 正常内边距

## 验证与交付约定
- 前端验证门：先产出实机截图证据 → 用户确认 → 才提交推送；推送完成后清理临时过程产物
- 浏览器 mock 需用简单 pattern 且不加 --allow-origin 才能命中（route URL 带 /api 前缀）
- 项目未安装 eslint，语法校验以基线+改后构建 exit 0 为准
- 2026-11-24 求援工单三页验证通过并提交推送，dev 分支 HEAD=3516f598（pages.json + index/form/detail.vue 共 4 文件）


<!-- MEMORY_FIELDS
{
  "category": "技术项目",
  "name": "苏住房防汛C端",
  "source_extraction_id": "8d60940fc739414888eb76c67d34fa85",
  "version": 1,
  "memory_type": "entities"
}
-->