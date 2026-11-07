# Vite启动失败：ImageViewer深链element-ui包内.vue
zhi2-web-admin 用 Vite 跑 dev 时，若报 `Could not resolve "element-ui/packages/image/src/image-viewer.vue"`（引用链来自 `src/components/ImageViewer/index.vue`），属于对 element-ui 源码路径的直接依赖。

## 现象
- Vite dev 报 Could not resolve "element-ui/packages/image/src/image-viewer.vue"
- 清 node_modules + bun/npm install 后 Vite 能起但仍会卡在此解析错误

## 根因
- 代码直接依赖 element-ui 源码路径（packages/image/src/image-viewer.vue），而非官方入口

## 解决方案
- 改 ImageViewer 封装：别名、换官方入口或本地 shim
- 触发场景：`bun --no-install run dev` 下 element-ui/packages/image/src/image-viewer.vue 无法解析，且 8081 端口被占用
- 修复点：清理 zhi2-web-admin/node_modules 重装，修正引用路径并释放端口
- 不能仅靠把 zrender 标 external 消除 echarts 连带报错（同会话另有 zrender/lib/* 解析错误，与 echarts 依赖链相关但非最终阻塞项）

## 关联信息
- 验证证据：会话 90a7260d（src=2-0/008.md）重装依赖后 Vite 监听成功但阻塞点为 image-viewer.vue
- 涉及文件：zhi2-web-admin/src/components/ImageViewer/index.vue、zhi2-web-admin/vite.config.js；根因文件 element-ui/packages/image/src/image-viewer.vue
- 所属项目：2-0
- 来源会话：90a7260d-f70a-4ecc-b36f-75044e76566b
- 代码基线：zhi2-web-admin Vite + Vue2 + element-ui

## 验证与归属
- 验证证据：extracted source=cursor project=2-0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_imageviewer_elementui",
  "source_extraction_id": "9b7970b9216d41dfac7377ac2dcc844d",
  "version": 2,
  "memory_type": "entities"
}
-->
