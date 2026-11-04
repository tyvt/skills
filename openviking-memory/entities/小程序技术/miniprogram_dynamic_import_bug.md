# 微信小程序动态导入返回路径字符串致模块未定义
苏住房C小程序分包提交将 menuStore 改为动态 import，微信小程序编译返回路径字符串而非模块对象，致 loadMenu 报错，回退静态导入。

## 问题现象
- zhi2-mobile-shimin/src/utils/tabBar.js 分包提交将 menuStore 改为动态 import('@/store/menu')
- 微信小程序编译返回路径字符串而非模块对象，致 menuStore.loadMenu() 报错

## 根因
- 微信小程序对动态 import 的编译结果与预期模块对象不符，返回路径字符串
- 分包构建链路对动态导入处理异常

## 解决方案
- 回退为静态导入 import menuStore from '@/store/menu'

## 验证与归属
- 验证：会话 160a40f4 用户反馈小程序报错，回退静态导入后修复
- 涉及文件：src/utils/tabBar.js、package.json、小程序报错问题汇总.md、src/utils/app.js、src/App.vue、src/store/index.ts、src/store/app.js、src/utils/index.js
- 所属项目：苏住房C；来源会话ID：160a40f4-daed-4e76-ae44-e7c0120d9b6f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "miniprogram_dynamic_import_bug",
  "source_extraction_id": "395f446932c540848feb870a30c2925f",
  "version": 1,
  "memory_type": "entities"
}
-->