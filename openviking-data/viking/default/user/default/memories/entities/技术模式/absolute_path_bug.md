
# 绝对路径静态资源导致H5构建失败
泰兴小程序模板使用以 `/` 开头的绝对路径引用静态资源，导致 Vite/Rollup H5 构建失败，改为相对路径 import 与 :src 绑定修复。

## 问题根因
- 模板（如 src/pages_owner/decision/detail.vue）中写了 `src="/pages_owner/static/detail_bg.png"` 这类以 `/` 开头的路径。
- H5 构建时 Vite 将其当成模块解析，Rollup 找不到对应文件即报错。

## 解决方案
- 与项目其它页面（如 house/index.vue）一致，用相对路径 import，模板里用 :src 绑定。
- 同批改了 src/pages_owner/elect/detail.vue、src/pages_property/gauge/detail.vue 等相同写法，避免下一处再挂。

## 验证与归属
- 本地已跑过 `npm run build:h5`，构建成功；可重新执行确认。
- 涉及文件：d:/repository/泰兴小程序/src/pages_owner/decision/detail.vue、d:/repository/泰兴小程序/src/pages_owner/house/index.vue、d:/repository/泰兴小程序/src/pages_owner/elect/detail.vue、d:/repository/泰兴小程序/package.json、d:/repository/泰兴小程序/src/pages_property/gauge/detail.vue、d:/repository/泰兴小程序/src/pages_property/payment/index.vue、d:/repository/泰兴小程序/src/pages_property/payment/components/PaymentChannelPopup.vue、d:/repository/泰兴小程序/src/pages_property/payment/bills.vue
- 验证：extracted source=cursor session=86482c93-650d-48c7-9ed2-4c1ad439ee68
- 所属项目：泰兴小程序；来源会话：86482c93-650d-48c7-9ed2-4c1ad439ee68；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "absolute_path_bug",
  "source_extraction_id": "930aeb202b4947b390d651ba7a9adf06",
  "version": 2,
  "memory_type": "entities"
}
-->