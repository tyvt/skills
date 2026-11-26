# 鹿路通 web-view 内附件下载桥接
昆物通嵌入鹿路通后，web-view 内 H5 不能直接下载，需调宿主小程序 navigateTo downloadFile action。

## 实现方式
- 在 `wx.miniProgram.getEnv` 判断 `miniprogram` 后，`navigateTo` 到 `/pages/action/index?action=downloadFile&data=${encodeURIComponent(JSON.stringify({ url, type }))}`。
- `type`：1 图片 / 2 视频 / 3 文档；参数语义对齐 `wx.downloadFile`。
- 实现落在 `src/utils/wxJssdk.js` 与 `src/utils/index.js` 下载入口。

## 发版信息
- 发版 tag 示例：`suzhou-kunshan-wuguan-v1.40.21`。

## 验证与归属
- 验证：会话 01a162c8 需求背景与鹿路通文档第六点一致，提交 2236a26 feat 鹿路通 web-view 内附件下载适配。
- 涉及文件：`src/utils/wxJssdk.js`、`src/utils/index.js`。
- 所属项目：昆山市民；代码基线：2236a26；来源会话ID：01a162c8-dee7-70c5-a400-75ccd003ebdf。

## 下载入口与合同页适配（2026-11-11 更新）
- 环境检测：`isInMiniProgram()` 依赖 jweixin SDK（index.html 第 13 行加载）提供的 `window.wx.miniProgram.getEnv` 判断 `miniprogram`；SDK 未加载时恒为 false 而走预览。
- `previewFileInH5` 新增 `download` 参数：为 true 时直接下载而非内嵌预览（PDF 原走 `uni.navigateTo` 到 `filePreview.vue`）；`filePreview(file, options)` 支持 `options.download`。
- 新增 `downloadFileViaBrowser`（H5）：带 `Authorization` 鉴权 + `credentials` 触发浏览器 blob 下载，用于非小程序环境；token 取自 `getToken`（`@/api/index`，读 `useUserStore().accessToken`），该引入无循环依赖。
- 合同详情页 `src/pages_contract/detail.vue` 修复：原传 `item.fileThumbnailSite`（缩略图）而非真实文件，改为 `item.fileUrl || item.fileThumbnailSite` 并传 `{ download: true }`。

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "llt_download_bridge",
  "source_extraction_id": "fd46031b97fe4c0e9efadae86b0a94ff",
  "version": 2,
  "memory_type": "entities"
}
-->