
# 资产全景经营资源子分类解析适配
园区物管2.0 资产全景页 `assetPanorama/index.vue` 已根据新接口结构更新 `operatingResources` 的解析逻辑。

## 数据接口
- `operatingResources.assetCategories` 现为扁平列表：同一 `category`（如「公共场地」）下有多条带 `subCategory` 的记录。
- `subCategory` 为 `null` 时表示大类本身（如「广告位」）。

## 解析逻辑
- `parseAssetCategories` 自动识别：若列表中存在非空 `subCategory`，则按子类展示；否则用 `category`。
- 展示名称：有 `subCategory` 用子类名（如「快递柜/驿站」「其他场地」），否则用 `category`（如「广告位」）。
- 配色：仍按父级 `category` 取色（`operatingResourceCategoryColors` 中的「广告位」「公共场地」），子类与父类同色。
- 其它字段 `count`、`ratio`、`regionAsset` 逻辑不变，区域条形图仍按区名读取。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 按示例数据，环形图显示 `count > 0` 的 4 项：广告位(4)、快递柜/驿站(1)、其他场地(2)、临时摊位(1)，合计 8，与 `data.count` 一致。
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/assetPanorama/index.vue、src/api/benefit/assetPanorama.js、assetPanorama/mock.js
- 所属项目：园区物管2.0；来源会话：c124ec6d-cfdd-4039-bf13-b501e1b22a3a；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "asset_panorama_subcategory",
  "source_extraction_id": "33c6d2042a9d403098535653cf9a2ce6",
  "version": 2,
  "memory_type": "entities"
}
-->