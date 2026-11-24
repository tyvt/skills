# 资金拨付详情作废按钮显隐条件
资金拨付详情页的「作废」按钮由详情模板内联 v-if 与权限指令共同决定，同文件另有一个未被引用的 showVoidButton() 死代码。

## 实际生效条件
- 代码位置：`zhi2-web-admin/src/views/benefit/pubAllotNotice/detail.vue:285-292`
- 内联条件：`isFormDisabled && form.tradeStateCode != '0000' && form.tradeStateCode != null`
- `isFormDisabled` 来自 `mixins/form.js:23`，表示页面处于查看态（`mode == 'view'`）
- `tradeStateCode` 来自详情接口 `response.data`，`'0000'` 表示交易已完成/缴款成功
- 权限字符：`benefit:pubAllotNotice:cancel`（通过 `v-haspermi` 控制）
- 点击按钮触发 `toVoid`

## 按钮不显示的常见原因
- 走在线支付且交易状态已为 `0000`（缴款完成），按钮被隐藏
- 单据没有交易流水导致 `tradeStateCode` 为空（线下支付或未发起在线交易）
- 当前账号缺少 `benefit:pubAllotNotice:cancel` 权限

## 死代码与规则不一致
- 同文件 `:678-681` 存在 `showVoidButton()`，按通知书状态判断（`noticeState !== 'X'` 非全部缴款、`!== '4'` 非已作废）
- 该方法未被任何地方引用，属死代码，实际不生效
- 代码描述的业务规则（通知书状态）与实际生效规则（交易状态码）是两套，可能是「该有却没有/该没有却有」困惑的根源
- 如需统一口径，可启用 `showVoidButton()` 或改写内联判断依据

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "pub_allot_notice_void_button",
  "source_extraction_id": "c3fd140f93074924a597272134925f5c",
  "version": 1,
  "memory_type": "entities"
}
-->