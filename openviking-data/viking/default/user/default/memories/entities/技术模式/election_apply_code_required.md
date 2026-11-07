# 业委会选举申请筹建编号恢复必填
在泰兴G项目业委会/监委会选举申请共用组件 `election/components/apply/detail.vue` 中，恢复 `preparatoryApplyCode` 必填规则，未填保存时提示「筹建申请编号不能为空」。

## 改动与提交
- 修改文件：`election/components/apply/detail.vue`
- 子模块 `zhi2-web-admin` 提交 `a5ed781` 已推 `develop/v2.6.2`
- 主仓提交 `94abb8c`（更新 submodule 指针）已推 `develop/v2.6.2`

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴G
- 涉及文件：`election/components/apply/detail.vue` 等（路径 d:/repository/泰兴G/zhi2-web-admin/src/views/autonomy）
- 所属项目：泰兴G；来源会话：c2b7f8fe-ee88-4f92-b79e-263bb7ea98c3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "election_apply_code_required",
  "source_extraction_id": "47b34f339d8f45c8bb02598401ebc0b1",
  "version": 1,
  "memory_type": "entities"
}
-->