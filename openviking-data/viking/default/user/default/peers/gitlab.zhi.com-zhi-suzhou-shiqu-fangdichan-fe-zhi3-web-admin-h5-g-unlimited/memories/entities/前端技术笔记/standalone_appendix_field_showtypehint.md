# StandaloneAppendixField 附件类型提示
在 zhi3-web-admin-h5-g 的 StandaloneAppendixField 中新增 opt-in prop `showTypeHint`，于上传框下方显示允许的文件类型提示。

## 功能与定位
- 为「新增宗地信息」弹窗的土地出让合同上传框增加「支持的文件类型：jpg/jpeg/png/pdf」灰色提示
- 复用工程已有 `appendix-upload-accept-tip` 样式与文案约定，保持全站一致

## Props 与行为
- 新增 `showTypeHint` prop（默认 false），仅显式开启时渲染，避免影响其他 45+ 处 `zs-file-upload` 调用
- 计算属性 `acceptTypeHint` 按 `fileType` 汇总扩展名生成提示文本
- `zs-file-upload` 透传 `showTypeHint`，`ParcelDialog` 对该字段启用 `show-type-hint`

## 关联改造
- 涉及文件：StandaloneAppendixField/index.vue、zs-file-upload.vue、ParcelDialog.vue
- 代码基线：develop/v3.0.0，合并提交 f7a555128，推送 HEAD 39d694e4f


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "前端技术笔记",
  "name": "standalone_appendix_field_showtypehint",
  "source_extraction_id": "4bfefd8adf404eddb261f7f5d801f90e",
  "version": 1,
  "memory_type": "entities"
}
-->