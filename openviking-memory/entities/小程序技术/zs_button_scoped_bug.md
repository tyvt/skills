# ZsButton scoped样式作用不到组件内部
苏住房C小程序大量页面按钮宽度/padding不生效，根因为页面scoped样式无法作用到自定义组件ZsButton内部的真实button节点，最终收敛为全局zs-button.scss统一布局规则。

## 问题现象
- 大量页面按钮宽度/padding/margin不生效，登录按钮只剩文字宽
- 决策详情底部「参与决策」不是长按钮，用户多轮连续报「全局排查」「还是有问题」「登录页按钮也不对」
- 逐个页面补class永远补不完，每次修完又暴露新页面

## 根因
- ZsButton是自定义组件，页面style scoped写的.btn-login{display:block}/width等按小程序样式隔离作用不到内部真实<button>节点；组件自身写width:auto/display默认值进一步压掉外部意图

## 解决方案
- 新增styles/zs-button.scss统一维护全部按钮布局规则，在uni.scss全局引入；默认非mini全宽100%，mini保持inline-flex自适应；.btn-login全宽+上下间距；.page-button-container/.submit-button-wrapper内全宽
- .button-group/.btn-container内并排固定300rpx；.popup-footer内220rpx×90rpx；搜索栏.reset-button/.search-button固定宽；.btn-block内fit-content
- 删掉ZsButton组件里覆盖全局的width:auto/display只保留高度、padding、颜色；在uni.scss全局以白名单统一满宽：.zs-button.long、.zs-button--block、.btn-container > .zs-button:only-child、.submit-button-wrapper > .zs-button四条选择器width:100%，避免波及弹窗双按钮等；后续个别页面不对往zs-button.scss补一条规则不再改页面

## 验证与归属
- 验证会话：2a76ac67（基线 5f0f4dc），用户4轮反复报按钮不生效，定位scoped样式作用不到组件内部<button>，新增全局scss并删组件覆盖规则后修复
- 涉及文件：src/components/ZsButton/ZsButton.vue、src/uni.scss、src/styles/btn.scss、src/App.vue、src/pages_owner/decision/index.vue、DecisionList.vue、decision/styles/btn.css
- 所属项目：苏住房C；来源会话ID：2a76ac67-47ce-4046-a986-f88a0614d57f；代码基线：5f0f4dc

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "zs_button_scoped_bug",
  "source_extraction_id": "dca35173571046008ab4d13a3f707715",
  "version": 4,
  "memory_type": "entities"
}
-->