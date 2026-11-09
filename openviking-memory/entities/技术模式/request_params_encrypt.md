# request.js 非白名单接口分页参数进加密 body
苏州市房地产监测V3 / zhi2-web-admin 前端请求层对非白名单接口将 params 并入加密 body，翻页失效排查应先确认后端是否真分页。

## 机制
- src/utils/request.js 第194–205行对非白名单接口执行 moveUrlQueryToBody，将 config.params 合并进 config.data 后 delete config.params
- 白名单在 src/config/security.js 维护；不在白名单内的接口 request({params}) 与 post(url,data) 最终发出的加密请求完全相同

## 排查原则
- 翻页失效不要把「params vs body」当根因
- 应先查后端接口是否真的按 pageNum 分页，还是一次返回全量户室并忽略分页参数
- 实例：禅道 bug 6235 的 queryHousesByBuildCode 因不在白名单，使 11/6 的「分页参数放 URL query」改动为空操作

## 关联缺陷
- 禅道 bug 6235（户室翻页失效）依此原则订正根因

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "request_params_encrypt",
  "source_extraction_id": "3e80c19fa57041f3b2e0b2c286355493",
  "version": 1,
  "memory_type": "entities"
}
-->