# 多列表异步装载防竞态序号
苏住房G index-v2.vue 同页多异步装载需逐个补齐请求序号，避免慢请求覆盖与闭包 Tab 错配。

## 问题根因
- 页面有 loadKeyData、loadCheckData、loadTodoPanelList、loadRegionOptions、loadStudyList 多个异步装载，审查发现只给其中一个加 xxxFetchSeq 其余无条件赋值。
- 未加序号列表在慢请求或 Tab 快速切换时，后返回旧响应覆盖新结果。
- loadStudyList 闭包用当前 this.studyTab 归一化旧行数据，导致类型/标题错配，「更多」按错误 Tab total 判断；组件销毁时写已销毁实例报 Vue2 告警。

## 统一解法
- 模式：const tab = this.studyTab; const seq = ++this.studyListFetchSeq; 请求后只把闭包 tab 传归一化函数；then/catch/finally 里 if (seq !== this.<x>FetchSeq) return。
- 可选 beforeDestroy 置 alive=false 或读 this._isDestroyed 跳过赋值。
- review 用 grep 'FetchSeq' 列出页面全部装载函数逐个确认对称，别只修报错那条；涉及文件 index-v2.vue；来源会话 838fa9dd、c02d127a；基线 15e201a。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_fetch_seq_race",
  "source_extraction_id": "7d100a0bc1f64c549abc1801c01d6406",
  "version": 1,
  "memory_type": "entities"
}
-->