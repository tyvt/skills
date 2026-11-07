# rent个人资料页新增收货地址与工作单位字段
在 rent 个人资料展示页 per.vue 与编辑页 perEdit.vue 增加「收货地址」「工作单位」两个字段。

## per.vue 展示页
- detail 增加 receiveAddress、workUnit
- detailKeys 基本信息区块（学位后）增加两项展示配置，对应 per.receiveAddress、per.workUnit
- onLoad 回调从接口赋值 detail.receiveAddress、detail.workUnit

## perEdit.vue 编辑页
- model 增加 receiveAddress、workUnit
- 我的信息表单项（学位选择器下方）增加两个 wd-input：收货地址绑定 model.receiveAddress（label $t('per.receiveAddress')），工作单位绑定 model.workUnit（label $t('per.workUnit')）
- onLoad 拉取用户信息后赋值 model.receiveAddress、model.workUnit

## 验证与归属
- 所属项目：0
- 验证证据：extracted source=cursor project=0
- 涉及文件：@src/pages-rent/my/per.vue、@src/pages-rent/my/perEdit.vue
- 来源会话：163cd24f-0205-4241-941b-7ad8647f2e4c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rent_per_profile_fields",
  "source_extraction_id": "a8cb5c6f003a4f60938b19021b4f9a9c",
  "version": 1,
  "memory_type": "entities"
}
-->