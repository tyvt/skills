# DetailTemplate image 类型无后缀退化成链接
产品2.0 的 zhi2-web-admin 中，DetailTemplate 查看态 type:'image' 会因 URL 无后缀而退化成可点链接而非缩略图。

## 问题现象
- 配置 type:'image' 的图片字段（如维保记录步骤图）显示成可点链接而非缩略图，尽管接口返回了图片地址
- 已知 type:'link' 分支只认 item.link 的问题与此是 image 分支的另一个独立坑

## 根因
- type:'image' 分支按 URL 取后缀，仅 jpg/jpeg/png/gif/bmp/webp/svg 渲染 `<img>`，否则走「附件」分支用 detail-link 当链接
- 设计初衷是避免把 PDF 等当图加载，但本项目图片地址常无后缀（如 /profile/xxx 或带 token 查询串）被误判为非图片

## 修复做法
- 查看模式改用 type:'images'，直接用 resolveServerAssetUrl 拼 `<img>`，不做后缀判断，无后缀站内图也能显示
- 用计算属性把原始数据统一整理成字符串 URL 数组（兼容 url/fileSite/path/link 多字段、逗号分隔串），与编辑态 detailCallback 同源
- 无图时回退 type:'text' 显示占位，保持空值「-」行为
- 其他页面遇到「传了 type:'image' 却变链接」同理改 images + URL 数组，或在 detail-template 层放宽无后缀默认按图展示

## 验证与归属
- 来源会话 163b2e12-92bf-4951-9a98-c06e20a552e8；代码基线 64fa9e2
- 涉及文件：zhi2-web-admin/src/views/dataProperty/recordProcess/components/recordProcessStepDialog.vue、zhi2-web-admin/src/views/dataProperty/scrappedRecord/detail.vue

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "detail_template_image",
  "source_extraction_id": "dce3834ae6534892beb7c0f65614063a",
  "version": 1,
  "memory_type": "entities"
}
-->