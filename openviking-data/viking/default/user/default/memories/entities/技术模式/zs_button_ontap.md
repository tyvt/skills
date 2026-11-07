# zs-button onTap 统一 emit 事件
全局检索确认 @click.stop 问题根源仅在 zs-button，其 defineEmits(['click']) 时未带事件，改用 onTap 统一向外 emit('click', …)。

## 问题根因
- 全局检索确认 @click.stop 问题根源仅在 zs-button 组件
- zs-button 在 defineEmits(['click']) 时未带事件参数
- 全局排查：除 zs-button 自身根节点外，仅 src/pages_owner/decision/index.vue 里 4 处在 <zs-button> 上使用 @click.stop
- HouseList / NoticeList 的 emit('click-item', item) 首参为业务数据，当前无 @click-item.stop，不受影响
- zs-image 已是 @tap="$emit('tap', $event)"，无需改动

## 解决方案
- 修改 zs-button 用 onTap 统一向外 emit('click', …)

## 验证与归属
- 验证证据：src=H5/001.md；extracted source=cursor project=H5
- 涉及文件：.vue、src/pages_owner/decision/index.vue
- 来源会话：b22779f7-0591-43f5-b4b9-fd2594f16d79；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_button_ontap",
  "source_extraction_id": "18b10a22986c4cf9b78c51c8d85f5db8",
  "version": 2,
  "memory_type": "entities"
}
-->