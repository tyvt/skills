# 选举须知页按钮倒计时禁用说明
苏住房C小程序选举须知页（pages_vote/elect/needToKnow）在苏住房环境下因包裹AgreementPage且开启倒计时，按钮初始处于禁用态。

## 页面结构
- pages_vote/elect/needToKnow.vue 本身无按钮逻辑，仅包裹 AgreementPage 组件
- 传入 api-key="jyq.elect.agreement"、url="form"、btn-text="我已阅读并了解"
- 苏住房环境下 :showCount="appStore.isSuZhuFang" 为 true，走带倒计时按钮分支

## 按钮禁用原因
- AgreementPage 内使用 useCountDown(5) 做 5 秒倒计时
- 倒计时期间 isCounting 为 true，按钮绑定 :disabled="isCounting"
- 使用的按钮组件为 ZsButton（type="primary"）

## 涉及文件与归属
- 涉及文件：pages_vote/elect/needToKnow.vue、components/shared/AgreementPage.vue、components/ZsButton/ZsButton.vue、styles/index.css
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：2a7e26fd-2145-4c85-840c-3ea11b150b32；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "elect_needtoknow_disabled",
  "source_extraction_id": "642aa7d9ea214737a67f2ff39ac74aef",
  "version": 1,
  "memory_type": "entities"
}
-->