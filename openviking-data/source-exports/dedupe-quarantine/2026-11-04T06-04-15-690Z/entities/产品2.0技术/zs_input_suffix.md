# zs-input 默认 clearable 引发带单位后缀高度异常
生产环境带「㎡」的 amount-input 后缀框高度与输入框不一致，根因是 zs-input 默认 clearable:true 引入多余 el-input--suffix。

## 现象与判据
- 生产（ylzhwy.com:8081）带单位后缀的 amount-input 后缀高度与输入框不一致，本地运行正常且打的对应代码，易误判为构建或样式未生效
- 生产 DevTools 验证判据：选中 .el-input-group__append，Computed 中 display 应为 flex（table-cell 说明 input-group-fix.css 未加载），高度应与 .el-input__inner 一致（约 36px）；Network 确认 input-group-fix.css 返回 200；修复后 DOM 不应再出现 el-input--suffix

## 根因
- zs-input 的 clearable 默认为 true，Element UI 只要 clearable 为 true 就会给输入框加 el-input--suffix 类并追加 padding-right:30px，即使禁用态不显示清除按钮也会加
- 叠加在 el-input-group__append 的单位后缀上把后缀高度/内边距顶歪；本地可能因改过 clearable 或缓存而复现不到

## 解决方案
- AmountInput 这类「数值+固定单位」控件显式设 :clearable="false"，从源头不生成 el-input--suffix
- zs-input 只在父组件真传了 suffix/prefix slot 时才转发 slot，避免空 slot 也触发后缀渲染

## 验证与归属
- 来源会话 49ff6642：用户贴图问生产后缀高度不对、本地正常，最终定位 zs-input 默认 clearable 并两处修复
- 涉及文件：src/components/AmountInput/index.vue、src/components/zs-input/zs-input.vue、src/styles/element-ui.scss、src/views/property/localPropertyBid/detail.vue
- 所属项目：产品2.0；代码基线：1fa4993

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "zs_input_suffix",
  "source_extraction_id": "ff13169b04d14a4c8a6747f663e042e9",
  "version": 1,
  "memory_type": "entities"
}
-->