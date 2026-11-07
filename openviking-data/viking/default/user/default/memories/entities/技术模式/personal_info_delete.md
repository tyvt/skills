# 个人基本信息删除仅清空表单未调接口
个人中心 personalInfo.vue 的删除按钮只重置表单不调用后端删除接口，属逻辑缺陷。

## 问题根因
- `head-edit` 内头像右侧按钮区，紧挨着“保存 / 修改 / 取消”按钮，新增红色删除按钮，文案 `{{ $t('message.delete') }}`（即“删除”），点击 `@click="deletePersonalInfo"`；该方法仅重置 `form`、`userforms` 为空且 `pictureUrl` 为 `undefined` 并提示成功。
- 未调用任何后端删除接口，数据实际未删除。

## 涉及文件
- `src/views/personalCenter/personalInfo/personalInfo.vue`。

## 验证与归属
- 验证证据：extracted source=cursor project=iHomePC
- 验证：增加删除个人基本信息功能后点击提示删除成功，但仅前端清表单。
- 所属项目：iHomePC；来源会话：2dc7e41c-982b-4291-bc42-b9f1df70756a；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personal_info_delete",
  "source_extraction_id": "1167e1792b9b40dfbcb6256ab4a97c5a",
  "version": 2,
  "memory_type": "entities"
}
-->