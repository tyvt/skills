# el-input IME 过滤失效
在园区物管2.0 中，使用 @input.native 监听 el-input 搜索过滤会在中文输入法下失效，需改 @input 并直接使用事件参数。

## 现象
- 搜索/过滤输入框（如菜单图标选择 IconSelect.vue）英文输入可过滤，切中文输入法输入拼音基本搜不到。

## 根因
- @input.native 监听原生 DOM input 事件，IME 组字过程中原生事件多次触发但 v-model 尚未更新。
- 选字确认后 el-input 通过组件 input 事件更新 v-model，原生 input 不一定再触发，过滤函数读到关键词为空或仍是拼音。
- 英文逐字输入两者时机接近故偶发正常。

## 解决方案
- 去掉 .native，改用 @input 监听 el-input 组件事件。
- 过滤函数直接使用事件回调传入的关键词参数，不依赖可能滞后的 this.xxx 值。
- 凡是「输入触发过滤」场景均适用此规则。

## 验证与归属
- 验证：会话 0f4d7bcd 用户报「菜单图标，用中文搜索不生效」，修复为 @input.native 改 @input 且 filterIcons 直接用事件参数，刷新后输入「三方」可正确过滤。
- 涉及文件：src/views/system/menu/IconSelect.vue。
- 所属项目：园区物管2.0；来源会话：0f4d7bcd-4f58-428d-a808-a25b8e090d3a；代码基线：7f13a8a38。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "el_input_ime_filter",
  "source_extraction_id": "c83f42b2da4141d9b9f2031f7272f576",
  "version": 1,
  "memory_type": "entities"
}
-->