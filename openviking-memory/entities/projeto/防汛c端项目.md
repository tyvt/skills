# 防汛 C 端 uni-app 项目
uni-app Vue3 + TypeScript 开发的防汛 C 端移动应用，用于汛前/汛中/汛后检查、求援与历史记录。

## 页面结构
- 已完成 6 类页面：工作台、汛前/汛中/汛后检查、历史记录、求援、详情
- 详情页含两种布局：汛中巡检详情与求援工单详情
- 归档参考截图共 8 张 PNG，位于 C:\Users\Administrator\Downloads\归档

## 验收标准
- 补全缺失页面后，UI e2e 截图与归档截图逐像素相似度需达到 95% 以上

## 技术要点
- 使用 z-paging 做列表分页，种子数据经 uni.getStorageSync 注入需注意 UniApp 包装格式
- 截图比对需屏蔽 Figma 字体 CDN 并使用本地字体回退，归档截图按 414×1953 的 1x 视口渲染

<!-- MEMORY_FIELDS
{
  "category": "Projeto",
  "name": "防汛C端项目",
  "source_extraction_id": "11ae8be425bf4675afd3f62a0549acbb",
  "version": 2,
  "memory_type": "entities"
}
-->