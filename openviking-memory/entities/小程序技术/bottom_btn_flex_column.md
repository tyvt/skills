# 底部固定按钮居中撑满修复
底部固定按钮区需居中且撑满宽度时，用 flex-direction:column + align-items:stretch 而非横排 align-items:center。

## 现象与根因
- 按钮不居中，加 display:flex+align-items:center 后左右居中但上下贴顶、按钮变窄
- 根因：默认横向 flex，加 align-items:center 使纵向居中但主轴横向子元素按内容收缩变窄
- 三个现象同属错误轴造成

## 解决方案
- 容器改 flex-direction:column + justify-content:center（纵向居中）+ align-items:stretch（横向撑满）
- 通过 :deep(.btn-container)、:deep(.zs-button) 强制 width:100% 钉死宽度契约
- 底部固定按钮为跨页面复制结构，修一处后全局搜同类容器统一修（用户要求全局修复）
- 修改后刷新页面复看，不用旧构建判断

## 验证与归属
- 验证会话 e1dc3fb9（基线 9cdf7b8）：用户报选举按钮不居中，逐步修正最终用 column+stretch+width:100%
- 涉及文件：pages_owner/elect/DecisionResult.vue、pages_vote/elect/DecisionResult.vue、pages_vote/decision/components/BackBtn.vue
- 所属项目：苏住房C；代码基线：9cdf7b8

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "bottom_btn_flex_column",
  "source_extraction_id": "c00494ad0ab84ac6adf97c304d84084f",
  "version": 1,
  "memory_type": "entities"
}
-->