# 开发企业注册列间距与成立日期必填修复
苏州市房地产监测V3 项目完成开发企业注册 Step4 股东列表列间距调整与 Step1 成立日期必填校验。

## Step4 股东列表列间距
- `Step4Shareholders.vue` 序号列：`width="96"` 改为 `width="60"`
- 股东名称列：`min-width="180"` 改为 `width="140"`，并增加 `show-overflow-tooltip`（长名称悬停显示）
- 表格增加 `:fit="false"`，避免列被强行拉满容器宽度

## Step1 成立日期必填
- `Step1CompanyInfo.vue` 表单规则新增 `foundingDate: [{ required: true, message: '成立日期不能为空', trigger: ['change'] }]`
- 与旧版 `companyInfo.vue` 及最终 `editAndSubmit` 提交要求一致
- 未填写时第1步显示必填星号并阻止进入下一步，避免第4步「申请入网」才报错

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证建议：第4步查看股东列表列宽是否正常；第1步不填成立日期点「下一步」应提示「成立日期不能为空」
- 所属项目：苏州市房地产监测V3
- 涉及文件：Step4Shareholders.vue、Step1CompanyInfo.vue、companyInfo.vue、registerValidate.js
- 来源会话：07ea18e2-6956-4c76-aee4-59cf48b781f9

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "register_spacing_required",
  "source_extraction_id": "9e1ffa47190141f69bafb695413c998f",
  "version": 1,
  "memory_type": "entities"
}
-->