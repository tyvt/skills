# vue与组件拆包致H5跨块循环依赖初始化报错
惠山二期H5 的 vite manualChunks 将 Vue 与组件拆为独立包，H5 下跨包循环依赖致模块初始化报错。

## 问题根因
- vite.config.ts 的 manualChunks 将 Vue 拆为 vue-vendor、src/pages/components 拆为 owner-shared
- H5 下跨包循环依赖致模块初始化访问未赋值变量报 Cannot access 'wt' before initialization
- node_modules 路径分割笔误（原 node_modules\/\//）

## 解决方案
- H5 不启用该强制拆包（该拆包原本只用于小程序减小主包体积）
- 小程序侧 includes('vue') 改精确匹配 vue/@vue
- 修正 node_modules 路径分割笔误
- H5 修复后需重新构建：npm run build:h5；本地开发重启 npm run dev:h5

## 验证与归属
- 验证：src=惠山二期H5/007.md
- 涉及文件：package.json、vite.config.ts
- 所属项目：惠山二期H5（zhi2-mobile-admin-h5-c-unlimited）；来源会话：7e939ba2-7874-4ea9-9bce-1323e58f9e11；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "vite_manualchunks_circular",
  "source_extraction_id": "0dfd4f13547047ad84a80b4f19903007",
  "version": 2,
  "memory_type": "entities"
}
-->