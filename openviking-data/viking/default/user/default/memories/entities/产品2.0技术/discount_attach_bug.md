# 折扣弹窗附件下载失败与回显残留
新增折扣附件编辑下载不了且再次新增带出上次附件，根因是行内附件走临时 busId 且弹窗复用未重置。

## 问题现象
- 新增优惠折扣上传附件，保存后编辑页点下载无效
- 再点新增自动带出上一次上传的附件

## 根因分析
- 折扣明细是子表行，附件上传到临时/匿名占位分组（busId 占位或空，保存时后端转挂）
- 编辑页拿到未落库临时路径/空 busId 下载不到
- 弹窗组件复用（v-if 未重建或未显式重置），上次表单与附件列表留实例里回显

## 解决方案
- 附件上传按新增态 busId 占位 + 保存后后端转挂统一约定，成功后用返回真实分组/主键回填并重拉列表
- 弹窗每次打开显式重置表单与附件列表（重置 data 附件数组 + 清 uploader fileList）
- 编辑态下载走按附件 ID 取地址接口，不用提交前临时地址

## 验证与归属
- 来源会话 d093c203 诉求新增折扣上传附件后编辑不能下载、再次新增带出上次附件
- 涉及文件：zhi2-web-admin/src/views/property/spFeeBill/components/discountDialog.vue、discountTable.vue
- 所属项目：产品2.0；代码基线：a5e7e78

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "discount_attach_bug",
  "source_extraction_id": "023be684d29240b38dd4e584c076013b",
  "version": 1,
  "memory_type": "entities"
}
-->