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

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "llt_download_bridge",
  "source_extraction_id": "227214d675d14725964edfb851677a3e",
  "version": 1,
  "memory_type": "entities"
}
-->