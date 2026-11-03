# 产品2.0 ImageViewer常驻致层级失效
[苏房] 产品2.0 全局 ImageViewer 挂 App 常驻，el-dialog 缓存首次 zIndex，写死 z-index 也压不过后续业务弹窗。

## 问题现象
- 图片预览组件被后打开的业务弹窗盖住，写死 :z-index="9999" 仍翻车。

## 根因
- Element el-dialog 首次打开时 PopupManager 分配 zIndex 并缓存实例；ImageViewer 常驻单实例复用旧值。
- 业务弹窗每次打开拿更大新值，多轮开关后预览被压下面。

## 解决方案
- 给 el-dialog 加 v-if="showViewer"，关闭卸掉 DOM 再开新建实例，交 PopupManager 自然叠序。
- 删掉 :z-index 及 ::v-deep 写死 z-index；外层包 image-viewer-host 设 display:contents。
- 删除 App.vue 全局 .viewer-container { z-index: 9999 }。

## 验证与归属
- 验证会话 f6b10079：用户附 git diff，结论为实例缓存值增长，采用 v-if 重建。
- 涉及文件：ImageViewer/index.vue、App.vue、store/modules/preview.js。
- 所属项目：产品2.0；代码基线：8d416b2。

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术笔记",
  "name": "product2_viewer_zindex",
  "source_extraction_id": "ebabd8f7ad774dafbc19579a0e860e5b",
  "version": 1,
  "memory_type": "entities"
}
-->