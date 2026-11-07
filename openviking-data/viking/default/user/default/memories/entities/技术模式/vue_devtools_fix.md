# Vue DevTools 无法跳转源码修复
惠山G 项目 zhi1-web-admin 中 Vue DevTools 无法跳转到组件源码，相关配置已修复并写入项目。

## 现象
- Vue DevTools 中选中组件后无法通过「在编辑器中打开」跳转到源码

## 解决方案
- 修改 vite.config.js 等配置文件以支持 Vue DevTools 打开编辑器
- 本机重新执行 `npm run dev` 后，在 Vue DevTools 选中组件点击「在编辑器中打开」验证

## 验证与归属
- 验证证据：extracted source=cursor project=惠山G
- 涉及文件：zhi1-web-admin/vite.config.js、zhi1-web-admin/src/main.js、zhi1-web-admin/index.html、env/.env、package.json
- 所属项目：惠山G；来源会话：c500dd33-22a6-40cf-9da0-977a1fb237b1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_devtools_fix",
  "source_extraction_id": "620ae39c66f049e4bb469a7490ac0c83",
  "version": 1,
  "memory_type": "entities"
}
-->