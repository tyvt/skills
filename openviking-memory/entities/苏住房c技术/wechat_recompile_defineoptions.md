# 微信工具未重编译致defineOptions未定义
苏住房C的dist构建后微信开发者工具未重导dist，旧vendor.js缓存致defineOptions is not defined报错。

## 问题现象
- 运行报defineOptions is not defined，根因为旧vendor.js缓存未更新

## 根因与修复
- dist/pages/index/components/menu/MenuImage.js已移除defineOptions，改inheritAttrs:false与options.virtualHost:true
- 微信开发者工具需重新导入D:\repository\苏住房C\dist并编译，或重启npm run dev后刷新消除缓存

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：苏住房C/046.md；来源会话2f622576-daa0-4a02-9ddc-d01ed2a8da69
- 涉及文件：src/pages/index/components/menu/MenuImage.vue、package.json、src/utils/virtualHost.js、src/components/ZsPaging/ZsPaging.vue、src/components/commonNew/viewAll.vue、dist/pages/index/components/menu/MenuImage.js、vite.config.ts
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "wechat_recompile_defineoptions",
  "source_extraction_id": "cf25625703d14c518174696c3e7c1a4c",
  "version": 1,
  "memory_type": "entities"
}
-->