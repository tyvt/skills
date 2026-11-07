# 分包新增.vue未注册pages.json致page not found
苏住房C小程序在 pages_my 分包新增 setting/userInfo、setting/realInfo 等 .vue 页面后，未在 pages.json 对应分包 pages 数组补注册，运行时报 navigateTo:fail page not found。

## 问题现象
- 「我的」点头像报 navigateTo:fail page "pages_my/setting/userInfo" is not found，但 .vue 文件确实存在
- 编译期无任何提示，只有运行期跳转才报错
- 同分包内 realInfo.vue（实名信息页）同理未被注册

## 根因
- uni-app 小程序页面可见性只由 pages.json 决定，右键建 .vue 不会自动注册
- subPackages[].pages 数组漏了 setting/userInfo 等条目，运行期找不到页面

## 解决方案
- 新增页面后立刻在 pages.json 对应分包 pages 数组补一条（路径相对分包 root，如 setting/userInfo）并配 style.navigationBarTitleText
- 报 page not found 时先搜文件是否存在：存在→查注册；不存在→查路径前缀是否写错
- 入口页跳转路径同步核对（如 My_Suzhufang.vue），避免注册与跳转两侧各写一路径
- 批次搬迁后做一次「分包目录下 .vue 文件 vs pages.json 注册项」对账

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 4cc33d41 报 userInfo 页 not found，文件存在但未在 pages_my 分包注册；补注册 setting/userInfo（个人信息）与 setting/realInfo（实名信息）两条路由
- 涉及文件：src/pages.json、src/pages/index/components/My_Suzhufang.vue、src/pages_my/setting/userInfo.vue、src/pages_my/setting/realInfo.vue
- 所属项目：苏住房C；来源会话ID：4cc33d41-1cbc-4887-bc8a-15d1fdcc8a0e；代码基线：9832ba3

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "subpackage_page_unregistered",
  "source_extraction_id": "f077e1fff63b403981d63766777c8762",
  "version": 1,
  "memory_type": "entities"
}
-->