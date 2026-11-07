# element-ui走CDN时ImageViewer自研预览层
工程通过 CDN 引入 element-ui 时禁止 SFC deep import element-ui/packages/*，图片预览需本地自实现。

## 问题根因
- CDN 模式不把 element-ui 打进 node_modules 解析链，源码级 deep import 与全量 external 策略冲突
- 组件 import element-ui/packages/image/src/image-viewer.vue 致 Vite 报 could not be resolved

## 解决方案
- 不要从 element-ui/packages 拉内部 Vue 文件
- 需要图片预览时用本地遮罩层自实现（如 ImageViewer 纯组件），或改用全局注册的 el- 组件 API
- CDN 与 bun 缺 lodash.merge/zrender 等是另一条依赖链，勿混为一谈

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证：dev 不再报 image-viewer.vue resolve 失败，预览功能仍可用
- 验证证据：会话 78e2d6bf 用户说明 element-ui 是 CDN 引入，结论 ImageViewer 改为纯本地实现；另有 src=2-0/012.md、来源会话 05e68b5b-3b5d-4912-9698-90636098e05c 印证 CDN 引入致内包解析失败、ImageViewer 重构为纯本地预览遮罩层、残留 lodash.merge 缺失属独立依赖问题
- 涉及文件：zhi2-web-admin/src/components/ImageViewer/index.vue
- 所属项目：2-0；来源会话：78e2d6bf-b094-40ec-ad1a-12067cd6e020；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "image_viewer_cdn",
  "source_extraction_id": "e92e113b6217448e810aa27c305e1d32",
  "version": 2,
  "memory_type": "entities"
}
-->