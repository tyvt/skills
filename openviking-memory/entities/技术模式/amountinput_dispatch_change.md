# AmountInput 校验事件分发契约
AmountInput 等自封装 v-model 输入组件需手动向最近 ElFormItem 分发 el.form.blur/change，否则 el-form 校验误判空或静默失效。

## 现象
- AmountInput 用户填了值，el-form 校验仍提示必填；或触发器（trigger:'blur'）永远不触发、一直红。
- 将内部 el-input+v-money 换成原生 input+vue-currency-input 后，进入「无法输入/无法校验」反复循环：校验不触发或输入被立刻清空。

## 根因
- el-input 内部自动把原生事件转发成 el.form.blur/el.form.change 分发给最近 ElFormItem，Element UI 校验完全依赖这条事件链。
- 自封装/原生 input 断链后，rules 的 trigger 永远收不到事件；值写回 form.model 与 blur/change 同帧时还可能读到旧 model。
- v-money 是格式化后回写 v-model，vue-currency-input 对非数字/空串处理不同，双向回写空值会让输入被立刻清空，看起来「输不进去」。

## 解决方案
- handleBlur：先 emit('blur', event)，再手动找到最近 ElFormItem 并 dispatch('el.form.blur')（构建后建议 nextTick/双 nextTick 留父级 model 更新时间）。
- handleChange / handleClear：同样向最近 ElFormItem dispatch('el.form.change')。
- numberValue watch 里 emit('input') 后 nextTick 中 dispatch('el.form.change')，覆盖值写回路径。
- 保留业务侧 listeners.blur/change 的转发，不要用它们替换 Element 的分发。
- 凡自封装 v-model 输入组件都要补此 form 事件派发契约；修复只落组件内部，不动上层表单（用户要求最最小化改动）。

## 关联信息
- 涉及文件：src/components/AmountInput/index.vue、src/components/zs-input/zs-input.vue；所属项目：园区物管2.0 / 产品2.0
- 来源会话：8430758d-a3eb-412d-97d4-0ab68ebf0303（基线 7814a0c2a）、96954bb5-7491-4bdf-854e-917a5232b9e6（基线 bd398ef）

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "amountinput_dispatch_change",
  "source_extraction_id": "ff13169b04d14a4c8a6747f663e042e9",
  "version": 2,
  "memory_type": "entities"
}
-->
