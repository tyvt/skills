# H5改源码仍弹业主表决框：实际跑的是dist旧编译产物
无锡市区H5嵌小程序已删除showOwnerDecisionConfirmModal改为直接进WebView，真机/预览仍出现登录校验→实名校验→uni.showModal二次确认。

## 问题根因
- 小程序或宿主加载的是历史npm run build的dist/assets，其中usePortal等chunk未更新
- 改src不会自动反映到已部署的dist
- 一侧仍弹窗可能因H5与wygl-wxxcx小程序两侧业主决策入口未同步删modal逻辑

## 验证与定位
- 会话9b0c382d最终结论：实际跑的是dist目录旧编译产物，usePortal仍走登录校验→实名校验→uni.showModal
- 已删showOwnerDecisionConfirmModal并npm run build更新usePortal.be15442a.js

## 解决方案
- 改交互后必须重新build，并在产物里grep确认弹窗文案已消失
- 微信开发者工具/宿主侧清缓存并确认web-view指向新dist
- H5与wygl-wxxcx小程序两侧若都有业主决策入口需同步删modal逻辑

## 验证与归属
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/hooks/usePortal.js、zhi2-mobile-admin-h5-c-unlimited/dist
- 所属项目：无锡市区小程序嵌入H5；来源会话：9b0c382d-6f57-4324-ab6b-ebafaf8e1362；代码基线：3fb9434

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "h5_dist_stale_build",
  "source_extraction_id": "2ecfaf2eb90d45a1a96af78198fcde16",
  "version": 1,
  "memory_type": "entities"
}
-->