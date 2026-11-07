# 新增保存后主动拉取详情回显
详情页保存成功切到视图态后字段为空，因同组件复用未重新挂载，需覆写 addCallback 主动拉取最新详情。

## 问题根因
- changeFormState('view', id) 改路由后 formMode watch 触发 init()，但 router.push 同组件复用未重新挂载
- 新增表单无 orgCode 等字段，view 态 contentInfo 取不到值，字段全空

## 解决方案
- 给 4 个详情页统一添加 addCallback 覆写：保存成功后主动调用 getDetail/loadDetail
- 参考老页面标准做法保证保存后回显

## 验证与归属
- UI 测试 9 passed，DetailTemplate 渲染但字段为空待 addCallback 修复
- 涉及文件：regulatorOrg/detail.vue 等 4 个详情页
- 所属项目：苏州市房地产监测V3（gitlab.zhi.com web-admin-h5）；来源会话：2026-11-02 调试会话

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "addcallback_reload_detail",
  "source_extraction_id": "b89b8ed6451e4730b1124ac28d421186",
  "version": 1,
  "memory_type": "entities"
}
-->