# 数据沙盘资产/资金全景首次加载 loading
苏住房G(zhi2-web-admin) 已为「资产全景监管」和「资金全景监管」两个页面加上首次加载 loading，避免约 10 秒白屏。
## 实现方式
- 根容器增加 `v-loading="pageLoading"` 与 `element-loading-text="数据加载中..."`（与项目内其他页面一致）
- `data` 中 `pageLoading` 初始为 `true`
- `mounted` 中 `await loadPanoramaData()` 完成后在 `finally` 里将 `pageLoading` 设为 `false`
- 4 小时自动刷新不显示 loading，避免打断用户浏览
## 涉及文件与归属
- 文件：benefit/dataSandbox/assetPanorama/index.vue、benefit/dataSandbox/fundPanorama/index.vue
- 所属项目：苏住房G；来源会话：0e66deb2-651c-40b4-83b4-58b65b0015c3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "data_sandbox_loading",
  "source_extraction_id": "048951ab304943a585dc23187ac29bde",
  "version": 1,
  "memory_type": "entities"
}
-->