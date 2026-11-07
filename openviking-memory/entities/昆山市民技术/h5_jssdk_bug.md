# 鹿路通H5未引JSSDK误设wx占位跳转失败
昆山市民鹿路通小程序 web-view 未引入 JSSDK 致 `window.wx.miniProgram` 不存在，且 `main.js` 误设占位致跳转失败，已修复。

## 问题根因
- 鹿路通小程序 web-view 未引入 `jweixin-1.6.0.js` 致 `window.wx.miniProgram` 不存在
- `main.js` 错误设 `window.wx = {}` 占位且未按 `JumpMiniProgram` 跳转

## 修复方案
- `index.html` 引 JSSDK
- 新建 `src/utils/wxJssdk.js` 封装初始化与跳转，移空占位并启动初始化

## 验证与归属
- 所属项目：昆山市民
- 验证证据：extracted source=cursor project=昆山市民
- 来源会话ID：9727f7d9-56fd-48f1-b779-7c22335440a7
- 代码基线：none
- 涉及文件：src/pages_home/home.js、src/pages_home/home.vue、src/utils/wxLogin.js、index.html、src/main.js、src/App.vue、src/env/mp.js、src/api/modules/estate.js

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "h5_jssdk_bug",
  "source_extraction_id": "1e221c0770bc474fb2d32abe42a88d10",
  "version": 1,
  "memory_type": "entities"
}
-->