# ZsDatePicker 底部弹出定位修复
泰兴小程序日期选择器底部弹出定位已统一修复，避免部分页面日期 Picker 显示异常。

## 改动要点
- `src/components/ZsDatePicker/ZsDatePicker.vue` 与 `src/staff/components/ZsDatePicker/ZsDatePicker.vue` 同步修改。
- `uni-popup` 增加 `type="bottom"` 与 `z-index:10001`，补充 CSS 强制 popup 相对视口固定底部。

## 影响范围
- 巡检记录筛选、报事报修筛选、消息/公告筛选、维保详情筛选、添加巡检/报废记录自动受益。

## 验证与归属
- 微信开发者工具测试：巡检记录→筛选→日期输入框，确认从屏幕底部弹出。
- 来源会话ID：74c2503c-4dc9-4911-aaee-7a84ea12f9bc；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_datepicker_bottom_fix",
  "source_extraction_id": "51cb70092e4e466f85cae7370abe915c",
  "version": 1,
  "memory_type": "entities"
}
-->