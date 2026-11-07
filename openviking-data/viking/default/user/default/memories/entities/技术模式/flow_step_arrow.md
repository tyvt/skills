# 业务流步骤箭头绝对定位层叠遮挡
门户 index-new.vue 业务流步骤区固定列宽与 .flow-arrow 绝对定位组合，存在 display:none 调试残留与伸入邻列被后绘步骤盖住的问题。

## 问题根因
- --flow-step-col 固定列宽，.flow-arrow 在 .flow-step-group 内 position:absolute; right:0; transform:translateX(50%)
- 样式末尾保留 display:none（调试残留）时模板仍渲染箭头但界面全无箭头
- 去掉 display:none 后箭头伸入右侧下一列，后绘制的 .flow-step 可能盖住箭头
- .flow-step-label 为 nowrap+ellipsis 时长文案在列宽内截断

## 修复方向
- 提高箭头 z-index 或改为 flex 间隙布局避免遮挡
- 固定列宽长文案截断需与设计确认或加大 --flow-step-col
- 清理 display:none 调试残留

## 验证与归属
- 验证证据：CSS 审查 index-new.vue 约 715 行 .flow-arrow { display: none } 及绝对定位伸入邻列的层叠问题
- 涉及文件：zhi2-web-admin/src/views/home/index-new.vue
- 所属项目：门户；来源会话ID：a638af97-69cb-4e16-b733-2ad9b2290077；代码基线：04586c4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "flow_step_arrow",
  "source_extraction_id": "d5288c49d81f4413bc5e4aeaa9a95188",
  "version": 1,
  "memory_type": "entities"
}
-->