# ZsMap 仅合并 object 型 attrs.style 致地图高度塌陷
苏住房C 市民端小区信息页「小区周边」地图因 ZsMap 忽略字符串 inline style 被压成细线。

## 问题现象
- 移动端 pages_owner/project/info/index.vue 的「小区周边」地图只显示细缝（仅腾讯地图 logo）
- houseMap.vue 相反：页面写死内联 height:200px 锁死高度，地图占不满屏

## 根因
- ZsMap 内部 mapStyle 计算属性仅合并 object 类型 attrs.style（typeof === 'object' 才展开）
- 字符串 inline style 被整体丢弃，高度回退默认 100%，父容器无固定高度致百分比高度无参照
- 同源组件 houseMap.vue 因写死像素高度导致另一极端

## 解决方案
- 统一写法：外层 .map-container 给固定高度（240rpx/400rpx/200px），删除组件 inline style
- ZsMap 内部 <map> 用 width:100%; height:100% 撑满
- 整屏时容器 height: calc(100vh - 43px - env(safe-area-inset-top))，地图绝对定位铺满、筛选栏浮上方
- 禁止在 ZsMap 标签写 style 字符串或写死像素高度

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证会话 a8639b2e / fc3995fc：houseMap.vue 移除 style 改 calc 高度，info/index.vue 参照 newHouse/detail.vue 用 .map-container 包裹
- 涉及文件：src/components/ZsMap/ZsMap.vue、src/pages_main/houseMap/houseMap.vue、src/pages_owner/project/info/index.vue、src/pages_transaction/newHouse/detail.vue
- 所属项目：苏住房C；来源会话ID：a8639b2e-9ee0-4789-a462-e47f95ce5510, fc3995fc-3653-441b-9537-8ac6acc697e9；代码基线：4630e8e、5f0f4dc

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "zsmap_string_style_ignored",
  "source_extraction_id": "d37fa3aa8383435db39d4c43bf59ba61",
  "version": 1,
  "memory_type": "entities"
}
-->