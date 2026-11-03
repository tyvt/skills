# Vite+Vue3模板require报错规避
Vite+Vue3模板里写require()会在运行时报ReferenceError: require is not defined。
## 根因
- Vite面向ESM，浏览器bundle不提供Node的require；模板表达式按运行时JS执行
## 解决方案
- 静态资源改为script顶部import iconX from '@/assets/...'再在模板绑定
- 或用new URL('./x.png', import.meta.url).href
- 改完刷新对应路由确认控制台无require报错
- 若同时出现非标准标签解析错误，先检查多余</div>导致模板HTML结构损坏，再查资源引用方式
## 涉及文件
- zhi2-web-admin/src/views/company/companyManagement/components/DeveloperBasicInfoForm.vue
- zhi2-web-admin/src/views/company/companyManagement/components/transferDiscount.vue
## 验证与归属
- 所属项目：2-0；代码基线：none
- 验证证据：会话7f3a94cb控制台require is not defined改import；会话c2d6f7c9 transferDiscount多</div>导致Invalid end tag同类排查
- 来源会话ID：7f3a94cb-8b2a-4c1e-9d3e-4f8a1b2c3d4e, c2d6f7c9-0a1b-2c3d-4e5f-6a7b8c9d0e1f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_vue_require_bug",
  "source_extraction_id": "e7cf9d3a99174c338e4a5820d2038936",
  "version": 1,
  "memory_type": "entities"
}
-->