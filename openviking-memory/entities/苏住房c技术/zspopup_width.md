# 苏住房C弹窗ZsPopup左右留白约束
苏住房C认证失败等弹窗因ZsPopup缺少视口相对宽度约束贴边，需在公共组件加max-width与margin居中。

## 问题背景
- 认证失败、重复账号、撤销确认等弹窗左右贴边，用户要求左右各留20px
- 根因是ZsPopup的.popup-container只给max-width:360px，无相对视口宽度约束，小屏下贴边
- 页面侧未覆盖宽度，造成各弹窗口径不一

## 解决方案
- 在公共组件ZsPopup的.popup-container统一加width:360px; max-width:calc(100vw - 40px); margin:0 auto
- 语义为最大360px且无论屏宽左右至少留20px并水平居中，勿在业务页面单独加padding
- 配合已有box-sizing:border-box与border-radius；100vw即屏宽不需减scrollbar

## 验证与归属
- 验证证据：会话2795d7c1用户要求弹窗留白20px，结论加约束于ZsPopup.vue并作用于所有使用该组件的弹窗
- 涉及文件：src/components/ZsPopup/ZsPopup.vue、src/pages_my/verification/FormLocal.vue
- 所属项目：苏住房C；来源会话：2795d7c1-b57e-448c-bc6a-90330c419f2b；代码基线：0801b84

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "zspopup_width",
  "source_extraction_id": "524203ab1a35488d949dbc062913ff56",
  "version": 1,
  "memory_type": "entities"
}
-->