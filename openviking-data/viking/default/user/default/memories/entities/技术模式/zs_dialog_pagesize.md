# zs-select-dialog 左侧列表 pageSize 写死致超量不显示
苏住房G 公共选择弹窗 zs-select-dialog 左侧列表 pageSize 写死为 10，选项超 10 条不显示且下方留白，多业务页共现。

## 问题现象
- 资金缴款选「收入类别名称」超 10 条后不再显示，经营资产租赁合同、资产租赁合同备案、停车泊位合同备案、手工记账等页同样现象
- 左侧列表下方还有一片留白，默认铺满失效

## 根因
- zs-select-dialog 左侧列表 pageSize 被写死为 10，容器高度足以显示二三十条却只装 10 条
- 容器未溢出，scroll-view / 滚动事件永不触发，「加载更多」走不到
- 与 #388（布局宽度/空态）和 #519（v-if 懒挂载不拉数）根因不同：此处确实拉了数据、仅首屏条数写死且无续拉

## 解决方案
- 首屏 pageSize 由左侧列表容器高度动态计算，不再取常量 10
- 首次加载后若未铺满且仍有数据，自动续拉下一页直到铺满或取尽
- 监听滚动接近底部时继续分页加载
- 首次查询放到弹窗打开后的 $nextTick 中发起，保证算到真实容器高度
- 必须同时改 zs-select-dialog-func.vue（函数式）与 zs-select-dialog.vue（模板式 #define），否则函数式打开的页仍异常

## 发布与验证
- 发布须同步 develop/v2.6.2-suzhufang、develop/v2.6.2、develop/v2.6.1，冲突分支手动 cherry-pick 提交号 cb5ef3166
- 验证证据：会话 5fa377d6（基线 fb3e960），结论为动态分页+自动铺满+滚动加载+$nextTick 首查
- 涉及文件：zs-select-dialog.vue、zs-select-dialog-func.vue、pubPaymentNotice/detail.vue、businessItemDialog.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_dialog_pagesize",
  "source_extraction_id": "cf02b3f3f9344491b308ce9fec4efa24",
  "version": 1,
  "memory_type": "entities"
}
-->