# 编辑态F5不拉详情修复（detailMixins误写sessionStorage假缓存）
编辑态详情依赖detailMixins的sessionStorage缓存，程序化改form被误判为用户编辑写入缓存，刷新后跳过getDetail。

## 问题根因
- form deep watch在form!==originForm时写缓存
- 详情返回后detailCallback过早同步originForm，而getArea()、子组件金额格式化等仍改form，被当已编辑写入缓存
- 刷新后读假缓存不再请求详情

## 解决方案
- 加载期skipFormCache禁止写缓存
- 重写getDetail，在detailCallback后用syncOriginFormAfterLoad()于$nextTick再对齐originForm（等子组件渲染完）
- 从缓存恢复时同步originForm并校验缓存主键与路由id一致
- 页面侧在同步originForm前完成getArea()等派生赋值，勿再手写originForm

## 验证与归属
- 验证：地块编辑页未改任何字段直接F5，因sessionStorage假缓存跳过getDetail；结论程序化赋值与originForm时序是根因
- 涉及文件：zhi2-web-admin/src/mixins/detailMixins.js、zhi2-web-admin/src/views/building/plot/detail.vue
- 所属项目：园区公共收益；来源会话：0bafb3e6-385f-404a-b48a-91cebb47c939；代码基线：86a4227

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_mixins_cache",
  "source_extraction_id": "14ba31c6dc8f4d5282d0b9f4f6413e26",
  "version": 1,
  "memory_type": "entities"
}
-->