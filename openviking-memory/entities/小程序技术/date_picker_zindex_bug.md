# 弹层日期选择器无响应因自定义遮罩拦截且组件未引入
苏住房C小程序/H5明细页日期区间选择点按无响应，根因是自定义period-overlay遮罩z-index:996在H5下盖住弹层，且误用未引入的uv-datetime-picker，改用uni-popup+ZsDatePicker解决。

## 问题现象
- 苏住房C小程序/H5明细页“日期区间→选自定义”后点“开始日期-结束日期”区域完全没反应，控制台无报错
- 同期伴[Vue warn] Failed to resolve component: uv-datetime-picker
- 用户贴出报错并要求换成当前项目使用的组件库

## 根因
- 页面手写period-overlay自定义遮罩(z-index:996)，H5下盖在日期选择器弹层之上，点击被遮罩吃掉
- 日期控件沿用uv-datetime-picker(uv-ui生态)，本项目未引入该库，组件解析失败又被遮罩问题掩盖

## 解决方案
- 删掉自定义period-overlay遮罩
- 日期区间弹窗改用uni-popup(与“类型”选择一致，tenant/index.vue已验证可配合)
- 自定义日期统一换项目封装的ZsDatePicker type="range"，点击即弹区间选择器
- 排查提示：“点击无响应但无报错”优先查更高z-index自绘遮罩拦截，再查控件是否真被解析(uv-*非本库)，别先查业务逻辑

## 验证与归属
- 验证：会话c2002207根因定位H5下自定义遮罩z-index:996挡住弹层，去遮罩+改uni-popup+ZsDatePicker type="range"后修复
- 涉及文件：src/pages_benefit/tenant/index.vue、src/components/ZsDatePicker
- 所属项目：苏住房C；来源会话ID：c2002207-e827-4fb1-95af-8409ac89d1b0；代码基线：200c2f3

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "date_picker_zindex_bug",
  "source_extraction_id": "c55f157f273a42cf88ad1d855a226491",
  "version": 1,
  "memory_type": "entities"
}
-->