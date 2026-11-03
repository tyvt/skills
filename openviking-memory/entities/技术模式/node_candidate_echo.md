# 流程节点面板候选组回显丢失
园区物管2.0 流程设计器节点面板（task.vue）候选组回显为空，根因是 watch(formData.dataType) 缺 oldVal 首次判空。

## 问题现象
- 候选组下拉有选项、保存后详情再进回显为空
- 再点保存会把被清空的模型写回 XML，造成库里数据真的丢失

## 根因
- data() 里 formData 先为 {}（无 dataType），created() 整份换成 XML 解析结果（含 dataType:'fixed' 和 candidateGroups）
- watch(formData.dataType) 在 undefined→'fixed' 首次赋值时执行了「切换指定方式清空关联字段」清理逻辑，删掉刚解析出的候选组
- 同文件 formData.userType 的同款逻辑写了 if(oldVal) 所以没事，只有 dataType 少了首次判断

## 解决方案
- watcher 处理首次绑定：oldVal 为 undefined/null/'' 视为初次赋值不清空，且仅 val !== oldVal 时才清空人员字段
- 已损坏流程 XML 需重新选候选组保存一次恢复
- 通用规则：任何「值变化即清空关联字段」的 watcher 都要防组件初始化/数据注水触发的首次赋值

## 关键事实
- 涉及文件：zhi2-web-admin/src/components/Process/components/nodePanel/task.vue
- 所属项目：产品2.0；来源会话：8e2e88bc-89fe-4391-8ce3-07a15df52e5c；代码基线：6b9d9d7

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "node_candidate_echo",
  "source_extraction_id": "065add8eab774fc2a55b7e59c38e0390",
  "version": 1,
  "memory_type": "entities"
}
-->