# listMixins 切 POST 接口旁路请求同源
综合查询多条件混合搜索接口换 pageNew 且只支持 POST，需页面声明 apiMethod:'post' 并让导出/打印校验共用同一请求方法。

## 问题根因
- 列表接口换 v2.0/property/complex/pageNew 仅支持 POST，listMixins 的 getList 用 this[`$${this.apiMethod}`] 自动走 $post。
- 页面「导出/打印前先查一次数据校验」常自写 this.$get(...)，只改列表会留 GET 打 POST 接口的死路（405 或空数据），验收末尾才暴露。
- 与已知 /list→/page 路径改造不同：本条是同路径下请求方法切换，风险点在导出、打印、统计等旁路调用。

## 解决方案
- 页面声明 apiMethod:'post'，列表自动走 $post，页面不必另写请求。
- 导出、打印前的数据校验统一写成 this[`$${this.apiMethod}`]，与列表共用同一请求方法来源。
- pageNew 参数结构不同，pageNum/pageSize 与条件字段一起核对，不能只改 apiMethod。

## 验证与归属
- 验证证据：会话 80913079（基线 26069c8）用户要求替换接口并确认 POST，增加 apiMethod:'post' 且导出打印校验改同源，实际请求 POST api/v2.0/property/complex/pageNew。
- 涉及文件：zhi2-web-admin/src/views/publicQuery/complex/index.vue、src/mixins/listMixins.js、src/mixins/table.js。
- 所属项目：苏住房G；来源会话ID：80913079-78af-4fe5-b215-9a8e1583a91f；代码基线：26069c8

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "listmixins_post_method",
  "source_extraction_id": "b318b5f0cb1c4578bf248ffcf2cf1f85",
  "version": 1,
  "memory_type": "entities"
}
-->