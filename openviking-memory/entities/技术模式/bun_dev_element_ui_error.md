# bun dev 启动项目出现 element-ui 解析错误
产品2.0前端使用 `bun --no-install run dev` 启动时报 element-ui 与 zrender 依赖解析错误，需修复引用路径。

## 现象
- 清理 node_modules 并重装后，Vite 能启动但 8081 被占用自动切到 8082
- 依赖解析错误：`element-ui/packages/image/src/image-viewer.vue` 无法解析（来自 `src/components/ImageViewer/index.vue`）
- 另见 `zrender/lib/graphic/helper/subPixelOptimize.js` 与 `zrender/lib/core/util.js` 解析异常

## 处理
- 已停止后台 dev 进程避免占用端口
- 下一步计划修复 element-ui 引用问题作为启动失败关键点

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：`src/components/ImageViewer/index.vue`、`element-ui/packages/image/src/image-viewer.vue`
- 所属项目：2-0（园区物管2.0）
- 来源会话：90a7260d-f70a-4ecc-b36f-75044e76566b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bun_dev_element_ui_error",
  "source_extraction_id": "d84370698f6d4f08927a749b5ae08557",
  "version": 1,
  "memory_type": "entities"
}
-->