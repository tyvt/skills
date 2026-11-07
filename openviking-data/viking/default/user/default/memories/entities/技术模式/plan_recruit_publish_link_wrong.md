# 维修方案征集详情对外发布链接显示错误修复
园区公共收益项目维修方案征集详情对外发布链接显示成 https:sipps... 的根因与修复。

## 根因
- publishLinkDialog.vue 手工拼接链接：${window.location.protocol}${window.location.host}/#/solicitation?id=...
- window.location.protocol 值为 "https:"（自带冒号无 //），拼出错误链接

## 修复要点
- 分支 develop/v2.6.2-yuanqu，未提交，共 3 个文件
- publishLinkDialog.vue 展示链接改为 this.$router.resolve({path:'/solicitation',query:{id}}).href，显示为相对路径，新开页解析为完整正确链接
- 顺带修 goto() 原手工拼中文参数问题

## 涉及文件
- zhi2-web-admin/src/views/maintenance/planRecruitDecision/components/publishLinkDialog.vue
- zhi2-web-admin/src/views/maintenance/planRecruit/components/publishLinkDialog.vue
- zhi2-web-admin/src/views/solicitation/components/loginDialog.vue

## 验证与归属
- 验证证据：extracted source=workbuddy project=园区公共收益
- 所属项目：园区公共收益；来源会话ID：5b869557-b1d3-4952-bc5f-9fb97b7b4809

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "plan_recruit_publish_link_wrong",
  "source_extraction_id": "95cd5696de3f4e369b28c91aad42dc97",
  "version": 1,
  "memory_type": "entities"
}
-->