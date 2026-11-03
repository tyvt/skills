# collectBtn图标不显示三连根因
苏住房C新房详情页底部「收藏」图标不显示，三独立根因：漏注册 ZsImage、subpackage 未传、小程序端 resolveStaticUrl 误走远程 IMAGE_BASE。

## 问题现象
- 新房详情页底部「收藏」图标不显示，文字在但图标节点缺失
- 未收藏图标 aixin_e.svg 实际位于分包 pages_transaction/static 下，组件按主包 static 解析路径不存在

## 根因
- collectBtn.vue 模板用了 ZsImage 却未 import 并注册，图标节点无法渲染
- 组件未按分包路径解析静态图，且 utils/index.js 的 resolveStaticUrl 在微信小程序端返回 IMAGE_BASE 远程 URL，本地打包图应走 /static/...
- 与泰兴“分包内图标必须放主包 static”老约定方向相反，苏住房C 静态图随业务分包走

## 解决方案
- collectBtn 显式 import 并注册 ZsImage，新增 subpackage 属性按收藏状态选主包/分包路径
- 调用侧 newHouse/detail.vue 传 emptyUrl="images/szf/aixin_e.svg" 与 subpackage="pages_transaction"
- utils/index.js 的 resolveStaticUrl 在微信小程序分支改为返回本地路径如 /pages_transaction/static/images/szf/aixin_e.svg

## 验证与归属
- 验证：会话 d53574b2（2026-08-21，基线 9832ba3）改 collectBtn.vue / newHouse/detail.vue / utils/index.js 后图标出现在「收藏」文字上方
- 涉及文件：src/components/collectBtn/collectBtn.vue、src/pages_transaction/newHouse/detail.vue、src/utils/index.js、src/components/ZsImage/ZsImage.vue
- 所属项目：苏住房C；来源会话ID：d53574b2-2d92-4663-9c80-ced6a44b903a；代码基线：9832ba3

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "collectbtn_icon_bug",
  "source_extraction_id": "b9a53a62e5144180a2e64278aff6fe0f",
  "version": 1,
  "memory_type": "entities"
}
-->