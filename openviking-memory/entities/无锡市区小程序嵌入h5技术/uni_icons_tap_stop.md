# H5下uni-icons勿用@tap.stop
uni-app 编译到 H5 时 uni-icons 触发事件非标准 DOM Event，模板写 @tap.stop 会导致 event 为 undefined 报错并中断点击。

## 问题根因
- uni-app 编译到 H5 时，uni-icons 触发的事件对象不是标准 DOM Event
- 模板写 @tap.stop 时 Vue 仍调用 event.stopPropagation()，但 handler 收到的 event 为 undefined，控制台报错且点击逻辑中断
- 典型案例：共有资金明细查询时间旁的提示图标点击失效

## 解决方案
- 与同页其他 uni-icons 保持一致，改用 @tap
- 若必须阻止冒泡，在方法内先判断 event 再 stopPropagation，或把点击绑在外层 view 上处理

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 来源会话：26ca4c09-5707-4402-a54f-9c9491ec3455
- 验证会话：26ca4c09-5707-4402-a54f-9c9491ec3455
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/pages_benefit/sharedFunds/components/DetailsTab.vue、src/components/ZsDateRangePicker/ZsDateRangePicker.vue
- 所属项目：无锡市区小程序嵌入H5；代码基线：a951bf3

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "uni_icons_tap_stop",
  "source_extraction_id": "af236467f8db4b978378c3b60607a339",
  "version": 1,
  "memory_type": "entities"
}
-->