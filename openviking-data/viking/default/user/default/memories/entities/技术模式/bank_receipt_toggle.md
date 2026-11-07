# 银行回单双模式切换与空态
园区公共收益银行对账页 pubBankDetailDay 在对账单与银行回单间切换时，需隐藏全局核销并展示空态提示。

## 业务约定
- 进入回单模式应隐藏「手工核销」「自动对账」，因回单行内已有核销入口，避免按钮消失后用户找不到退出路径
- 「银行回单」按钮需支持再次点击退出回单模式并恢复对账单列表与左右联动加载；当前模式用按钮 plain/激活样式区分

## 空态处理
- 回单接口无数据时右侧表格展示「暂无银行回单数据」空状态
- 必要时在加载完成后用 msg 提示一次，避免用户以为按钮无响应

## 验证与归属
- 验证证据：用户反馈点银行回单后自动核销消失、再点无反应、回单为空无提示；实现为模式切换+隐藏全局核销+空态文案
- 涉及文件：zhi2-web-admin/src/views/benefit/pubBankDetailDay/index.vue、zhi2-web-admin/src/views/benefit/pubBankDetailDay/detail.vue
- 所属项目：园区公共收益；来源会话：e77c4a66-d59c-4814-96ed-5e80c60960d1；代码基线：36a9a7e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_receipt_toggle",
  "source_extraction_id": "819e5a7101104283bab49fe88e924f5a",
  "version": 1,
  "memory_type": "entities"
}
-->