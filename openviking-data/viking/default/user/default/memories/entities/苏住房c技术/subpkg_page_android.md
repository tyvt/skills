# 分包内二级目录页面安卓端报Component not found
苏住房C小程序「求购信息」在安卓端整页空白并报页面路径找不到，根因为分包内再套子目录页面路径在安卓产物解析不到。

## 问题现象
- 苏找房「求购信息」安卓端整页空白，控制台报`Component is not found in path pages_transaction/intention/my/list`
- iOS/开发者工具可能正常，易被当作偶发
- 仅抽组件到components目录而未删旧页面注册，安卓端仍按旧路径加载，报错照旧

## 根因与解决
- 根因：intention/my/list在分包intention目录下再建my子目录放页面，安卓端产物chunk位置对不上
- 正确三件套：删旧页面注册与文件；合并为intention/list用query区分mode；共享组件放分包components下
- 同步更新menuRouteMap.js与scripts/merge-main-leaks.mjs的stub路径（list.js→pages_transaction/intention/list.js）
- 验证必须清理dist/unpackage旧产物重新打包，并排查后端菜单路径是否仍指向旧地址

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证会话e0538ad3：用户两次报同错，最终删页合并+组件上提+同步脚本
- 涉及文件：pages.json、intention/list.vue、IntentionMyList.vue、utils/menuNav.js、scripts/merge-main-leaks.mjs
- 所属项目：苏住房C；代码基线：f1939b0；来源会话ID：e0538ad3-fc2d-43a5-8b21-e951b74289dd

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "subpkg_page_android",
  "source_extraction_id": "28d9eabd30b54d718cb36189284f8f55",
  "version": 1,
  "memory_type": "entities"
}
-->