# 程序化赋值误写表单缓存致刷新跳过详情
detailMixins 的 originForm 提前同步使程序化赋值被误判为用户编辑写入 sessionStorage，刷新读假缓存跳过 getDetail()。

## 问题根因
- detailMixins 的 originForm 在 detailCallback 提前同步
- 详情返回后程序化赋值改变 form 被误判为用户编辑写入 sessionStorage
- 刷新读假缓存跳过 getDetail()

## 解决方案
- detailMixins.js 增加 skipFormCache 标志禁写加载期缓存
- 重写 getDetail() 在 $nextTick 经 syncOriginFormAfterLoad() 同步 originForm
- 编辑恢复缓存时同步 originForm 并校验主键 ID

## 验证与归属
- 验证：src=园区公共收益/029.md
- 涉及文件：building/plot/detail.vue、mixins/detailMixins.js、mixins/form.js、utils/ruoyi.js、mixins/area.js、components/AmountInput/index.vue、building/project/detail.vue、building/landPlotChange/detail.vue
- 所属项目：园区公共收益；来源会话：0bafb3e6-385f-404a-b48a-91cebb47c939；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detailmixins_form_cache_skip",
  "source_extraction_id": "73db46eea5524c5d9a7735b32709d2a9",
  "version": 1,
  "memory_type": "entities"
}
-->