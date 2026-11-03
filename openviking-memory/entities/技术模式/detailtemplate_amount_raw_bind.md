# DetailTemplate 金额字段原始绑定规范
产品2.0 中 DetailTemplate 的 type:'amount' 展示项须直接绑定 form 原始数字字段，禁止 amountFormatter 预格式化。

## 问题根因
- type:'amount' 的 value 曾写成 `this.formatters.amountFormatter('', '', this.form.xxx)` 预格式化后传入，属错误写法
- amount 类型内部已按 unit/dot 自行做格式化，预格式化字符串会引发双重格式化（千分位/小数被二次处理）
- 组件按纯数字判定：type:'amount' 只认纯数字，非数字会静默显示「-」并无条件拼单位

## 修复做法
- 凡是 type:'amount' 展示项，value 一律直接绑定 `this.form.xxx` 原始数字字段，小数位与单位交给组件 unit/dot 配置
- 全量检索 `value: this.formatters.amountFormatter('', '', this.form.` 清零并跑 lint 验证

## 验证与归属
- 验证证据：owner/vote/detail.vue:410-424 写法不正确，应以 building/project/detail.vue:601-614 为范例
- 涉及文件：autonomy/election/owner/vote/detail.vue、building/project/detail.vue（正确范例）
- 所属项目：产品2.0；来源会话：959c4f79-0192-4b53-a367-9630388e7f62；代码基线：645607c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detailtemplate_amount_raw_bind",
  "source_extraction_id": "0484b9296d2e4e3da6a631e0d03fa14f",
  "version": 1,
  "memory_type": "entities"
}
-->