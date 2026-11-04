# 开户变更按钮跳转空白页修复
无锡市区G项目zhi2-web-admin中，开户申请详情页「变更」按钮因路由参数缺失跳转空白页，已改用文件路径拼新增页并携带accountId修复。

## 根因
- pubRegulatoryAccount/detail.vue的modify()原使用命名路由且缺少tableid:'add'，校验无生效监管协议后跳转到根路径空白页
- 原路由未携带accountId，无法预填数据

## 修复方案
- 增加import { getRouterPathByFilePath } from '@/utils/ruoyi'
- modify()改为this.$router.push({ path: getRouterPathByFilePath('benefit/pubRegAccountChange/detail') + 'add', query: { formMode: 'add', accountId: this.form.accountId } })
- 进入开户变更新增页（路径含add），由pubRegAccountChange/detail.vue的getOldDetail()根据accountId预填数据
- 同步更新了permission.js、listMixins.js、ruoyi.js、autonomy/record/components/detail.vue、indemnity/project/index.vue等文件

## 验证与来源
- 验证：src=无锡市区G/003.md（会话be9a1d85-fae7-46fb-9f25-1f3d40a49c4d）
- 涉及文件：zhi2-web-admin/src/views/benefit/pubRegulatoryAccount/detail.vue、pubRegAccountChange/detail.vue、pubRegAccountChange/index.vue等
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_change_blank_page",
  "source_extraction_id": "487b125f28014405af5c516b05a5f94f",
  "version": 2,
  "memory_type": "entities"
}
-->