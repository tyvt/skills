# 只读详情附件点击三分流套路
产品2.0 的 detail-template 只读详情中，附件点击需按文件类型分流：图片缩略图预览、PDF 新窗口打开、其余 fetch blob 下载。

## 判定规则
- 图片后缀白名单：jpg/jpeg/png/gif/bmp/webp/svg 走 <img> 预览，避免无后缀或未知文件误塞 <img> 加载失败
- PDF 使用 window.open(url,'_blank','noopener,noreferrer') 由浏览器原生预览
- 其余类型走 downloadAttachmentFile：优先 fetch（credentials:'same-origin' 带 Cookie）取 blob 后 downloadBlobFile 保存，失败回退带 download 属性的 <a> 点击

## 边界事实
- 附件 URL 跨域且未配 CORS 时 fetch 会失败，浏览器可能忽略 download 属性变成预览
- 完全可控必须后端配合 Content-Disposition: attachment 或走带鉴权下载接口，前端兜底无法根治

## 涉及文件与归属
- 改动文件：zhi2-web-admin/src/components/detail-template/detail-template.vue、zhi2-web-admin/src/utils/index.js
- 所属项目：产品2.0；来源会话：f249a45a-ccde-47e1-8e0c-9e45f3720ad5；代码基线：8d416b2

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_attach_split",
  "source_extraction_id": "4c0f6b4a207146ac99f3be82996d2ef1",
  "version": 1,
  "memory_type": "entities"
}
-->