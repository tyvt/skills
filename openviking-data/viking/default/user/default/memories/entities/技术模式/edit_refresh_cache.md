# 编辑态刷新详情页未调接口修复
园区公共收益项目中，编辑态详情页刷新后未调用详情接口，直接恢复 sessionStorage 假缓存。

## 问题根因
- 进入编辑模式时若 sessionStorage 有该路由缓存，直接恢复表单并跳过 getDetail() 接口
- form 的 deep watch 在 form !== originForm 时写入缓存
- 详情接口返回后程序化赋值改变 form，但 originForm 已提前同步，被误判为用户已编辑写入缓存
- 刷新后读到假缓存不再请求详情接口

## 修复方案
- detailMixins.js 增加 skipFormCache 标志，详情加载期间不写入缓存
- 重写 getDetail()，在 detailCallback 完成后通过 syncOriginFormAfterLoad() 在 $nextTick 中再同步 originForm
- 编辑模式从缓存恢复时同步设置 originForm，并校验缓存主键 ID

## 涉及文件与归属
- 涉及文件：src/views/building/plot/detail.vue、src/mixins/detailMixins.js、src/mixins/form.js
- 所属项目：园区公共收益
- 来源会话：0bafb3e6-385f-404a-b48a-91cebb47c939
- 代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "edit_refresh_cache",
  "source_extraction_id": "79cc694f12bc4bf391a9c1460e65a168",
  "version": 1,
  "memory_type": "entities"
}
-->
