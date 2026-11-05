# 中间Tab图标绝对路径404修复
H5部署在/h5/子路径时，中间Tab图标用了绝对路径/static/icon/icon_tab_middle.jpg导致404，首页与我的图标已通过resolveZhishuAsset处理而中间未处理。

## 问题根因
- 浏览器请求 https://域名/static/... 而实际资源在 https://域名/h5/static/...
- custom-tabbar.vue 中间按钮使用绝对路径未适配子路径

## 解决方案
- zhishuAsset.js 新增 resolveStaticIcon()，用 Vite 解析 static/icon 资源
- custom-tabbar.vue 中间按钮改用 :src="middleIcon"
- 问答页机器人头像同步修复

## 验证与归属
- 验证证据：会话 f82a50f9 用户反馈中间凸起按钮不显示
- 涉及文件：zhishuAsset.js、custom-tabbar.vue、pages.js 等
- 所属项目：无锡市区小程序嵌入H5；来源会话：f82a50f9-f635-4d0d-8382-d57ff27fd4c7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "tab_middle_icon_404_fix",
  "source_extraction_id": "d627421ec49c4bd58fa21558c5e6d07e",
  "version": 1,
  "memory_type": "entities"
}
-->