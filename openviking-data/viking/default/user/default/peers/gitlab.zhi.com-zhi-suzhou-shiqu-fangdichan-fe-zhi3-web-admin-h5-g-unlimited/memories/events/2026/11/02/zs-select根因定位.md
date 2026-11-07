# Summary
2026-11-02，浏览器实测发现下拉显示「无数据」，根因定位为 zs-select 组件仅支持 :options 属性、不支持 <zs-option> 子节点写法。
# 2026-11-02 (Monday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: 走浏览器 UI 实际操作
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: **找到根因！** `zs-select` 通过 `:options` 属性接收选项，但我用的是 `<zs-option v-for>` 子元素写法——**该组件不支持 `zs-option` 子节点，只认 `options` prop**。

修正详情页的下拉写法：

<!-- MEMORY_FIELDS
{
  "event_name": "zs-select根因定位",
  "goal": "排查下拉无数据",
  "summary": "2026-11-02，浏览器实测发现下拉显示「无数据」，根因定位为 zs-select 组件仅支持 :options 属性、不支持 <zs-option> 子节点写法。",
  "ranges": "0,143",
  "source_extraction_id": "02bbd63fa1f2447f91ec80c61f9b32df",
  "version": 1,
  "memory_type": "events"
}
-->