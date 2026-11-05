# 我的房源页面UI回归修复
苏住房C小程序「我的房源」页面UI回归问题已修复，涉及 pages_transaction/publishHouse/index.vue。

## 问题原因
- 顶部 Banner 不显示：`ZsImage` 内部 image 使用 `width/height:100%`，父级无有效尺寸致高度0被折叠
- 空状态插图不显示：`ZsEmpty` 的 `url` 写成 `../static/images/szf/empty-publish.svg` 路径解析错误
- Tab 栏逻辑：原版始终显示 Tab，当前代码在 `totalSum==0` 时隐藏 Tab，与原版不一致

## 修复内容
- 参考同目录 `stockHouse/index.vue` 实现：Banner 改为直接 `import publishBanner` 用原生 `<img>` 渲染
- 空状态图片路径改为 `images/szf/empty-publish.svg` 并指定 `subpackage="pages_transaction"`
- Tab 栏和列表区域始终显示，与原版布局一致

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`publishHouse/index.vue`、`components/ZsEmpty/ZsEmpty.vue`、`components/ZsImage/ZsImage.vue`、`stockHouse/index.vue`
- 来源会话ID：0ebb8db9-ff2f-4012-8c52-e519ed22bee2
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "publish_house_ui_fix",
  "source_extraction_id": "f112774c505640e3b6c48d36ad3aaf81",
  "version": 1,
  "memory_type": "entities"
}
-->