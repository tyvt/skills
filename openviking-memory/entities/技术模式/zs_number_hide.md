# zs-input-number 数字不显示修复
园区物管2.0 弹窗表单中 zs-input-number 数量选择器数字不显示的根因与适配规则。

## 问题根因
- 组件默认 controls-position="right"（按钮在右），但 padding-left 仍按两侧按钮 56px 写死，覆盖 Element UI 默认内边距，数字区被挤压/遮挡。
- 页面在 el-form-item__content 加 display:flex 并强制 .el-input width:100%，与单位「个」挤同行时宽度计算异常。

## 解决方案
- 公共组件层：zs-input-number 按 controls-position 区分内边距（右侧按钮用 15px/50px，两侧按钮保持 56px/56px）；新增 controls-position 形态须同步核对内边距适配。
- 页面层：不在 el-form-item__content 做全局 flex+width:100% 覆盖，「控件+单位」组合统一用 input-with-unit 类容器包裹（同 input-with-actions 思路）。

## 适用场景
- 所有被 flex 容器包裹的数值/单位组合控件出现内容不可见的场景。
- 涉及文件：zs-input-number.vue、parkingManage/subDialog.vue、pubAdvertiseSpace/advertiseDialog.vue、zs-search-form.vue；所属项目：园区物管2.0。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_number_hide",
  "source_extraction_id": "dcd23ce75bc845459e6f23b743f4afe2",
  "version": 1,
  "memory_type": "entities"
}
-->