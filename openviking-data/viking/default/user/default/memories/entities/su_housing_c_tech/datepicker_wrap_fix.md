# 报事报修筛选弹窗日期换行修复
苏住房C小程序「报事报修」筛选弹窗中「上报日期」因宽度与换行问题掉字，已通过样式调整修复。

## 问题根因
- `ZsDatePicker`中间分隔符`flex: 1`占用过多横向空间，两侧日期框变窄
- 未设置`white-space: nowrap`，日期文本在窄容器内自动换行

## 修复方案
- `filter.scss`：日期值增加`white-space: nowrap`、`word-break: keep-all`；分隔符改`flex: 0 0 auto`；左右内边距对称`padding: 0 8px`并居中
- 三处`ZsDatePicker`组件（`pages_owner_extra`、`pages_owner`、`pages_main`）同步修复分隔符flex与日期不换行样式

## 涉及文件
- filter.scss
- pages_owner_extra/repair/index.vue
- 公共收益收支明细页
- 维修资金业务明细页

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：c59bc687-6e91-42f1-ba7a-8d423e305220；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "datepicker_wrap_fix",
  "source_extraction_id": "8ed8cc7c612c4cff9097a608de758469",
  "version": 1,
  "memory_type": "entities"
}
-->