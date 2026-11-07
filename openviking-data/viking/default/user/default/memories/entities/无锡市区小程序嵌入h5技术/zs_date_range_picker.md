# ZsDateRangePicker快捷区间须确认且查询手动触发
共有资金等页的 ZsDateRangePicker 快捷项仅更新预选区间，须点「确定」关弹层回传，且父组件显式调用查询不用 watch。

## 行为约束
- 点「当季/当年/自定义」等快捷项只更新内部预选区间，不能立刻关弹层并当作已提交
- 必须等用户点「确定」再关闭遮罩并回传区间
- 切换快捷项或自定义日期后，父组件显式调用列表查询，不用 watch 监听区间对象自动拉数

## 避坑要点
- 用户明确要求「不用 watch，在需要调用的地方手动调用」，避免首次选快捷项不刷新、遮罩残留
- 自定义模式下嵌套日期面板要抬高层级或收紧父弹层 overflow，防止子面板被父层遮挡

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 来源会话：26ca4c09-5707-4402-a54f-9c9491ec3455
- 验证会话：26ca4c09-5707-4402-a54f-9c9491ec3455（同会话多轮）
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/components/ZsDateRangePicker/ZsDateRangePicker.vue、src/pages_benefit/sharedFunds/components/DetailsTab.vue
- 所属项目：无锡市区小程序嵌入H5；代码基线：a951bf3

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "zs_date_range_picker",
  "source_extraction_id": "af236467f8db4b978378c3b60607a339",
  "version": 1,
  "memory_type": "entities"
}
-->