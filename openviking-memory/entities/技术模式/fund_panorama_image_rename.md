# 资金全景图片重命名与引入
园区物管2.0 项目中对 mapOverview 图片资源重命名并在 fundPanorama 引入，以匹配设计稿与 mock 数据。

## 资源重命名
- 将 `zhi2-web-admin/src/assets/images/mapOverview/` 下 `收入金额.png` 重命名为 `metric-income-amount.png`
- `账户数量.png` 重命名为 `metric-account-count.png`
- `账户余额.png` 重命名为 `metric-account-balance.png`
- `资金支出.png` 重命名为 `metric-fund-expenditure.png`
- 恢复目录中 `切图 6@2x*.png` 为 `assetPanorama` 引用的 `metric-card-*@2x.png`，避免资产全景缺图

## 资金全景调整
- `fundPanorama/index.vue` 引入上述 4 张图并在 `data` 中暴露给模板
- 左列 `accountCount` 使用 `metric-account-count.png`，`accountBalance` 使用 `metric-account-balance.png`（按 `c.key` 与 mock 一致）
- 中列收入卡使用对应 `metric-income-amount.png` 等图标

## 涉及信息
- 涉及文件：src/views/benefit/dataSandbox/fundPanorama/index.vue、mock.js
- 所属项目：园区物管2.0；来源会话：a7eff455-f431-4f3e-8c5e-2dd6890bc140；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fund_panorama_image_rename",
  "source_extraction_id": "9b2ff210e04c406b95120c0b33048de0",
  "version": 1,
  "memory_type": "entities"
}
-->
