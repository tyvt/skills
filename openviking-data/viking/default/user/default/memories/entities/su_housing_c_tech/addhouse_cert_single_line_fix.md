# 业主添加房源不动产权号单行布局修复
苏住房C小程序 `pages_owner/house/owner/addHouse.vue` 不动产权证号布局错乱（纵向拆成两行），已改为单行布局。

## 问题根因
- 原使用 `composition-row` 的 `flex-direction: column` 纵向布局，「苏 + 年份」与「苏州市不动产权第 + 编号 + 号」被拆成两行

## 修复内容
- 改为与 `stockHouseSign/apply.vue` 一致的 `flex items-center` 单行布局：`<div class="flex items-center composition-row">` 内含「苏」+年份输入框+「苏州市不动产权第」+编号输入框+「号」同处一行
- 年份输入框 `maxlength="4"`，placeholder 示例「2012」，字号 22rpx

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`pages_owner/house/owner/addHouse.vue`、`pages_transaction/stockHouseSign/apply.vue`、`pages_transaction/publishHouse/verification.vue`
- 来源会话ID：54f4fa88-f084-46ed-a03b-0f245a7026be
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "addhouse_cert_single_line_fix",
  "source_extraction_id": "f52854a4bf0f4d3c8f51f968519959b1",
  "version": 1,
  "memory_type": "entities"
}
-->