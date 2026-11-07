# ImageViewer组件去除element-ui依赖
产品2.0（zhi2-web-admin）中 ImageViewer 组件改为纯本地预览遮罩层实现，不再依赖 element-ui 包。

## 问题背景
- 使用 CDN 引入 element-ui 时，源码里不能再 import element-ui/packages/...，否则报 `element-ui/packages/image/src/image-viewer.vue could not be resolved`
- 原 ImageViewer 依赖 element-ui 包导致上述解析错误

## 解决方案
- 将 `zhi2-web-admin/src/components/ImageViewer/index.vue` 改成纯本地预览遮罩层实现，不再依赖 `element-ui` 包
- 原 `element-ui/packages/image/src/image-viewer.vue could not be resolved` 错误消失

## 其他依赖问题
- 后续 `bun run dev` 报的 `lodash.merge / zrender / tslib / @babel/runtime / typed-function / form-data` 属另一批依赖问题，与 element-ui CDN 无关
- 可补齐缺失依赖或改回 yarn/npm 安装启动链路解决

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：zhi2-web-admin/src/components/ImageViewer/index.vue、element-ui/packages/image/src/image-viewer.vue
- 所属项目：2-0；来源会话：05e68b5b-3b5d-4912-9698-90636098e05c；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "image_viewer_remove_element_ui",
  "source_extraction_id": "2aa332ea5aa44f9da068c10bd4812892",
  "version": 1,
  "memory_type": "entities"
}
-->