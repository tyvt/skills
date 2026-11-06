# 银行选择弹窗确定锁与联行选择统一修复
苏州市房地产监测V3 中修复 zs-select-dialog-func.vue 确定无效果问题，并统一联行选择弹窗。

## 问题原因
- SelectDialog.open 点「确定」先 setData（应 resolve），关窗触发 update:visible(false) 再 reject('cancel')，若 reject 覆盖 resolve，handleAdd 的 .catch(() => {}) 吞掉错误，表现为关窗但列表不刷新

## 修复内容
- zs-select-dialog-func.vue 增加 settled 锁，保证只结算一次（成功或取消）
- 未选左侧分行时提示「请先在左侧选择监管银行分行」
- 挂接成功后 msgSuccess('添加成功')
- 未选行时提示「请至少选择一条网点」
- 新增 openUnionBankWdmcSelect（unionBankWdmc.js），对接 /system/unionBank/page，单选+勾选+确定
- 银行网点管理 jgwd/detail.vue、委托监管协议 wtjgxy/detail.vue 改用该弹窗

## 验证与归属
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：zs-select-dialog-func.vue、unionBankWdmc.js、jgwd/detail.vue、wtjgxy/detail.vue
- 来源会话ID：b1936cf8-2758-4591-92a8-a76aef6e1db5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "v3_bank_fix",
  "source_extraction_id": "9ec3c07b17f34b9c98be7b3373038dfb",
  "version": 1,
  "memory_type": "entities"
}
-->