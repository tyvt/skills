# 禅道Bug 5980 flowable业务类型下拉
flowable 待办/已办/办结「业务类型」可搜索下拉，2026-11-03 lichandan 重开点查询后输入消失问题的缺陷任务。

## 根因
- 原修复 remoteMethod→remote-method 修「无数据」
- 2026-11-03 lichandan 重开，新问题「点查询后业务类型输入内容消失」
- 真因：后端 listBusCodeMenuByKeyWord 用 @RequestBody String 须原始纯文本 body，前端却以 JSON 对象 {keyWord} 发送→接口返空→下拉永远无选项→输入无匹配、点查询后内容被清空

## 修复方案
- fetchBusCodeMenu 改用 $post 以 text/plain 原始字符串发 keyWord（空格返全部 165 项）
- 加 handleQuery 关键字→busCode 自动匹配解决输入未选中即清空
- 涉及文件 todo.vue/process.vue/finished.vue

## 验证与交付
- 归属 tiany
- 修复后下拉可正常搜索并保留输入

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_5980",
  "source_extraction_id": "38eac9a37d954bfca6e3c6b80c3dec62",
  "version": 1,
  "memory_type": "entities"
}
-->