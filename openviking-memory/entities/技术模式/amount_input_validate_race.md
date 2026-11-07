# AmountInput 打包后 el-form 校验为空
AmountInput（vue-currency-input 封装）本地开发正常、打包后字段有值却被 el-form 校验为空的同 tick 竞态问题。

## 现象与问题
- 本地开发正常，打包后字段看起来有值却被 el-form 校验为空
- el-form 校验读 form.model + prop 的 fieldValue 而非输入框显示值；最后一位输入后立即失焦时，el.form.blur 校验可能早于父组件把 v-model 写进 model，读到旧值
- 自定义组件向上找 ElFormItem 用 $options.componentName === 'ElFormItem'，外链/压缩后 element-ui 表现不一致时找不到表单项，dispatch 失效

## 解决方案
- 显式声明 model: { prop: 'value', event: 'input' } 消除构建链对 v-model 的歧义
- numberValue 的 watch 加 { flush: 'sync' }，先同步 emit input 再处理 blur
- emit 改用 instance.proxy.$emit（与 vue-currency-input 内部一致）
- handleBlur 双 nextTick 后再 dispatch el.form.blur，给父级 model 留更新时间
- 向上查找表单项同时认 componentName 和 name 为 ElFormItem

## 关联信息
- 涉及文件：zhi2-web-admin/src/components/AmountInput/index.vue、src/views/property/feeDeclare2/components/feeBindScopeTable.vue（使用 AmountInput）；所属项目：园区物管2.0；来源会话：65814715-d99f-446d-b239-bd55aaced626；代码基线：7814a0c2a

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "amount_input_validate_race",
  "source_extraction_id": "d4c167325849479e80ae46b9e66aeb77",
  "version": 2,
  "memory_type": "entities"
}
-->
