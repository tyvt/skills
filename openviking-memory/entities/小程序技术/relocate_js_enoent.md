# relocate脚本未改js引用致ENOENT
苏住房C市民端构建后处理脚本relocate-datetime-picker.mjs复制uni-datetime-picker到分包并删主包副本，但仅patch .json未patch .js懒加载路径，导致运行时ENOENT。

## 问题现象
- 真机/工具报 Error: ENOENT: no such file or directory, open 'dist/node-modules/@dcloudio/uni-ui/lib/uni-datetime-picker/time-picker.wxss'
- 受影响页面 pages_owner_extra/tenant/index、pages_owner_extra/committee/application/index 的 .js 仍写旧主包路径，运行时按旧路径找已删文件

## 根因
- 小程序组件路径在 .json 声明与 .js 懒加载代码各存一份，只改 .json 时静态检查未发现
- scripts/relocate-datetime-picker.mjs 的 patchDatetimePickerRef 只处理 .json 的 usingComponents，未处理 .js 内 lazy-load 段落

## 解决方案
- 修改 patchDatetimePickerRef 同时处理 .json 和 .js，统一指向分包内副本（如 pages_owner_extra/tenant/index.js → ../node-modules/.../uni-datetime-picker.js）
- 出现 ENOENT 先确认用 npm run build 构建（npm run dev 不执行 relocate 脚本），并检查新增页面是否命中脚本路径白名单

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 8f42167b（2026-08-28，基线 8fc3cc5）改 patchDatetimePickerRef 同时处理 .json/.js 后重新 build 与校验通过
- 涉及文件：zhi2-mobile-shimin/scripts/relocate-datetime-picker.mjs、scripts/validate-dist.mjs、package.json、dist/project.config.json
- 所属项目：苏住房C；来源会话ID：8f42167b-70b4-4ea9-85ad-c66840f5a3ba；代码基线：8fc3cc5

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "relocate_js_enoent",
  "source_extraction_id": "b9a53a62e5144180a2e64278aff6fe0f",
  "version": 1,
  "memory_type": "entities"
}
-->