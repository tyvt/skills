# 我的房源页UI回归致顶部Banner不显示
苏住房C 移动端 `pages_transaction/publishHouse` 页面 UI 回归引发顶部 Banner 不显示等异常，需调整布局样式恢复渲染。

## 问题根因
- `pages_transaction/publishHouse` 页面 UI 回归
- 引发顶部 Banner 不显示等渲染异常

## 修复要点
- 调整布局样式恢复 Banner 渲染

## 涉及文件
- src/pages_transaction/publishHouse/index.vue
- src/components/ZsEmpty/ZsEmpty.vue
- src/components/ZsImage/ZsImage.vue
- src/utils/index.js
- src/pages_transaction/stockHouse/index.vue

## 验证与归属
- 验证证据：extracted source=cursor session=0ebb8db9-ff2f-4012-8c52-e519ed22bee2
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：0ebb8db9-ff2f-4012-8c52-e519ed22bee2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "publishhouse_banner_bug",
  "source_extraction_id": "0b1118a667fb4be79fab1154368de06d",
  "version": 1,
  "memory_type": "entities"
}
-->