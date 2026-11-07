# dialogMixins 弹窗契约字段补齐规范
使用 dialogMixins 的弹窗必须声明 primaryKey、moduleName、businessName 三个字段，否则详情保存会打到旧的 V2 REST 接口。

## 问题现象
- 附件配置弹窗（FjDialog.vue）打开/保存打到 GET /file/appendixConfig/{雪花ID}、PUT /file/appendixConfig 等 V2 风格 REST 地址
- 列表页已走 POST /page 的 V3 规范，同一模块存在两种接口风格并存

## 根本原因
- 组件虽 mixins 了 dialogMixins，但页面自定义了 getDetail()/submitForm() 且未声明三个契约字段
- dialogMixins 标准 CRUD 链路（detail 走 POST /detail、add/update 走 /add 与 /update）未生效，mixin 只贡献弹窗开合

## 修复步骤
- 补齐 primaryKey、moduleName、businessName 三个字段
- 将父级 mode 映射成 dialogFormMode，对齐 dialogMixins 的 onOpen/init 流程
- 删除自定义 getDetail() 和 submitForm()，交给 mixin 发 POST
- 列表页补 @refresh="getList" 保证保存后刷新

## 排查与范围
- 参照已迁移的 ArchiveDetailDialog.vue
- 排查同类问题 grep 弹窗里是否有 `$get('.../append/ + id)` 或 `$put(`
- 只改本模块 CRUD 范围，附件上传类接口（/file/appendix）不在规范化范围内
- 涉及文件：zhi2-web-admin/src/views/tool/fjflpz/components/FjDialog.vue、index.vue、mixins/dialogMixins.js、mixins/form.js；来源会话 4d504758，代码基线 5169909

<!-- MEMORY_FIELDS
{
  "category": "代码规范",
  "name": "dialog_mixins_contract",
  "source_extraction_id": "fe98c453fafb46bda36d6363aa048c3d",
  "version": 1,
  "memory_type": "entities"
}
-->