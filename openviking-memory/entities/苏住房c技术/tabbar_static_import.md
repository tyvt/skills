# tabBar.js动态导入报错修复
苏住房C(zhi2-mobile-shimin)微信小程序因tabBar.js动态import menuStore导致Cannot read property 'loadMenu' of undefined，已改回静态导入。

## 问题根因
- 在分包提交(17443e68)中为减小主包体积，把`menuStore`从静态导入改成动态`import()`
- 微信小程序端动态import编译后返回路径字符串而非模块对象，导致`menuStore`为undefined
- 调用`menuStore.loadMenu()`报`Cannot read property 'loadMenu' of undefined`；`@/store/menu.js`本身存在

## 修复方案
- 已改回静态导入：`import menuStore from '@/store/menu'`
- 恢复与分包前一致写法，避免小程序端动态导入失效

## 涉及文件与归属
- 文件：`zhi2-mobile-shimin/src/utils/tabBar.js`
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：160a40f4-daed-4e76-ae44-e7c0120d9b6f；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "tabbar_static_import",
  "source_extraction_id": "bf9a9e6490474d3899e2f109c73f11cf",
  "version": 1,
  "memory_type": "entities"
}
-->