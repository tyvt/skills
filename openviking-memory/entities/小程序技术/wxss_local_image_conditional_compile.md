# WXSS本地背景图必须条件编译
苏住房C 小程序 WXSS 中 background:url() 引用本地图片必然失败，需条件编译区分 H5 本地路径与小程序 CDN 绝对地址。

## 问题现象
- 编译小程序报「渲染层网络层错误：pages_owner/house/index.wxss 中的本地资源图片无法通过 WXSS 获取」
- 指向 background: url("../../static/images/history-szf.png") 这类相对路径写法
- pages_owner 目录多处相同写法往往一次只报一处，其余会在后续编译陆续报错

## 根因
- WXSS 不支持本地资源图片引用（官方限制），小程序 CSS 的 url() 只能是网络图片、base64 或改用 <image> 标签
- H5 端本地相对路径完全正常，故问题只在编译小程序时暴露

## 解决方案
- 页面背景图统一写条件编译：H5 用本地路径（如 ../../static/images/szf/Bg-szf.png），小程序用 CDN 绝对地址（如 https://szf.szzfcjj.cn:8888/static/images/szf/Bg-szf.png）
- 改动时将该页所有 WXSS 背景图一次改完（示例页同时处理 .top-empty 与 .history-container），不要等逐条报错再补
- 验收标准：重新编译小程序后控制台无该类错误，且两端背景都真实显示

## 验证与归属
- 验证证据：会话 5fbd3e35（基线 9832ba3）报错 pages_owner/house/index.wxss 本地资源图片无法通过 WXSS 获取（第 251 行 background: url("../../static/images/history-szf.png")），环境 Windows/mp 2.01.2510260 lib 3.16.2；结论改为条件编译
- 涉及文件：src/pages_owner/house/index.vue、src/pages_owner/house/components/TypeChoose_Suzhufang.vue、src/components/ZsImage/ZsImage.vue
- 所属项目：苏住房C；来源会话ID：5fbd3e35-025c-45df-996f-22495a68d907；代码基线：9832ba3

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "wxss_local_image_conditional_compile",
  "source_extraction_id": "eb359f7e64864e958b7f30e05e2bdbc4",
  "version": 1,
  "memory_type": "entities"
}
-->