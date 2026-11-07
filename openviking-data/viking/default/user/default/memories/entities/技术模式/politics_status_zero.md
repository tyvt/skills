# politics_status_zero
园区公共收益业主自治模块中政治面貌「党员」字典值必须为 '0' 而非 '01' 的契约与附件联动处理。
## 字典契约
- 本环境政治面貌字典：党员对应 dictValue === '0'，建议用 String(politicsStatus) === '0' 判断。
- 不能沿用苏住房等产品线常见的 '01' 或中文码。
## 附件联动
- 「党员证明」附件显示/必填条件按上述取值。
- 切换为非党员时同步清空已上传党员证明并移除校验项，避免隐藏字段拦截提交。
## 验证与归属
- 验证：用户纠正 dictValue 0 是党员后，showPartyCertificate 从 == '01' 改为 String()==='0'，并更新变更监听与后端契约。
- 涉及文件：zhi2-web-admin/src/views/autonomy/candidateCollect/components/CandidateDialog.vue、detail.vue
- 所属项目：园区公共收益；来源会话：9188dc08-2eb6-4f25-a62a-99cd041edbf7；代码基线：191094f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "politics_status_zero",
  "source_extraction_id": "04f44256a020407aa30d82b50cc89746",
  "version": 1,
  "memory_type": "entities"
}
-->