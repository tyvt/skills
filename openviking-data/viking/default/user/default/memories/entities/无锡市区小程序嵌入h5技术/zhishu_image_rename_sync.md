# 中文图片改名英文须同步代码引用
无锡市区小程序嵌入 H5 的 static/images/zhishu/ 与 home-menu/ 中文图片重命名为英文时，代码引用与 dist 构建须同步更新。

## 重命名规则
### static/images/zhishu/ 根目录
- 背景@2x.jpg → background@2x.jpg
- 切换.png → switch.png
- 首页.png → home.png
- 我的.png → profile.png
- 头像@2x.jpg → avatar@2x.jpg
- 退出登录.png → logout.png
- 小区@3x.png 删除（与 community@3x.png 重复）
- 小区背景@3x.png 删除（与 community-bg@3x.png 重复）
### static/images/zhishu/home-menu/ 目录
- 小区信息.png → community-info.png
- 小区资产.png → community-assets.png
- 物业合同.png → property-contract.png
- 公共能耗.png → public-energy.png

## 同步要求
- 代码引用与 dist 构建须同步更新，避免引用失效
- 相关工具函数与组件引用需一并排查

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 验证证据：src=无锡市区小程序嵌入H5/007.md
- 涉及文件：src/utils/zhishuAsset.js、src/pages/index/commonMenu.vue、src/pages/index/propertyMenuConfig.js、src/pages/index/home.vue、src/components/custom-tabbar/custom-tabbar.vue、src/pages/index/components/GridMenu.vue、src/pages/webview/externalWebview.vue、package.json；另 wygl-wxxcx-dev-slh 子模块下 home.vue、externalWebview.vue、custom-tabbar.vue 也同步修改
- 所属项目：无锡市区小程序嵌入H5；来源会话ID：d757069f-a917-4079-bd4e-17af4bcc117e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "zhishu_image_rename_sync",
  "source_extraction_id": "b17238a633cf40de87c63c276c47e01c",
  "version": 2,
  "memory_type": "entities"
}
-->