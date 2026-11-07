# v-show未阻模板求值致空数组取icon报错
苏住房C移动端详情页根节点v-show不阻止模板求值，facilityCategory初始空数组致首屏访问.icon报错。

## 问题根因
- pages_transaction/newHouse/detail.vue 根节点 v-show="showPage" 不阻止模板求值
- facilityCategory 初始为空数组，onLoad 才赋值，首屏访问 .icon 报错

## 修复要点
- 在 data() 用导入配置初始化 facilityCategory
- 模板对 .icon 使用可选链 ?. 防止空值报错
- 涉及文件：detail.vue、transaction.js、stockHouse/detail.vue、info/index.vue

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：src=苏住房C/079.md
- 来源会话ID：7f29f06a-70ca-4db2-9199-e681d3284e78

<!-- MEMORY_FIELDS
{
  "category": "su_housing_tech",
  "name": "vshow_icon_fail",
  "source_extraction_id": "2426b49c7fdf4f01ad92a4896738da13",
  "version": 1,
  "memory_type": "entities"
}
-->