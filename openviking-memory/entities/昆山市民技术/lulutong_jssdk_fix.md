# 鹿路通小程序H5对接JSSDK修复
平安报事通在鹿路通小程序 web-view 中提示「请在微信小程序中打开」的问题修复。

## 问题根因
- 未引入微信 JSSDK：index.html 未加载 jweixin-1.6.0.js，window.wx.miniProgram 不存在
- 错误 wx 占位：main.js 在 JSSDK 未加载时执行 window.wx = {}，环境检测失败
- 跳转方式不符：原用 navigateTo 直接打开，应按鹿路通文档通过 JumpMiniProgram action 跳转

## 修复方案
- index.html 引入微信 JSSDK（jweixin-1.6.0.js）
- 新建 src/utils/wxJssdk.js 封装 initWxJssdk()、isInMiniProgram()、jumpToMiniProgram()
- main.js 移除空 window.wx = {}，启动时初始化 JSSDK
- 按鹿路通文档 §4 通过 JumpMiniProgram 跳转其他小程序

## 验证与归属
- 涉及文件：index.html、jweixin-1.6.0.js、src/main.js、src/utils/wxJssdk.js
- 所属项目：昆山市民；来源会话ID：9727f7d9-56fd-48f1-b779-7c22335440a7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "lulutong_jssdk_fix",
  "source_extraction_id": "f93ad767e88948b5b1deeea32b5a0798",
  "version": 1,
  "memory_type": "entities"
}
-->