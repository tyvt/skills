# el-select 多选长标签遮挡下拉箭头：预留 suffix 空间并加宽弹窗
「新增银行授权」弹窗银行名称多选时，长标签挤满输入框导致右侧下拉箭头被遮挡无法展开。
## 问题根因
- 多选标签容器未给 suffix 图标预留宽度，标签直接覆盖到箭头位置
- 520px 弹窗内一行放不下时不会换行，箭头被挤出可视区
- 组件内部靠 $children 反向调 resetInputHeight 调整高度，在 v-if/多层嵌套下不稳
## 解决方案
- 弹窗宽 520→720，表单 label-position="top" 让多选独占整行
- 标签区 max-width: calc(100% - 40px) 显式留位并允许 flex-wrap 换行
- 输入框 min-height:40px 随多行标签自然增高，不再依赖 $children 调内部方法
- 验收需选最长选项截图确认箭头可见且能展开
## 验证与归属
- 验证证据：会话 25f90065，用户反馈银行名称区域太小下拉按钮被遮挡，定位 StreetAuthDialog.vue 修改
- 涉及文件：zhi2-web-admin/src/views/system/regionBankAuth/components/StreetAuthDialog.vue
- 所属项目：苏住房G；来源会话ID：25f90065-5711-4fcc-a0ab-c949d750a651；代码基线：315702f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "el_select_label_arrow",
  "source_extraction_id": "6309376b0dde46f082e58b77a70f3936",
  "version": 1,
  "memory_type": "entities"
}
-->