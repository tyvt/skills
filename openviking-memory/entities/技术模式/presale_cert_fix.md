# 预售许可证PDF模板文本框截断修复
苏州市房地产监测V3 后端生成的《商品房预售许可证》PDF 因 docx 模板文本框宽度不足，导致「预售单位」「开户行」值折行被裁或压住相邻标签（缺陷 bug6315）。

## 问题根因
- 证书由后端 zhi3-presale 模块的 presale-permit-template.docx（19 个浮动文本框：18 占位符 + 1 静态发证机关）经 Aspose 填充转 PDF 生成
- companyName 框宽 197.55pt / 12pt 字号，测试值「测试开发企业_202610301124有限公司」≈198pt → 折行后被固定高度裁掉「司」字
- bankName 框宽 193pt / 11pt 字号，「中国工商银行股份有限公司北京怀柔支行」18 字 ≈198pt → 折行且右缘压到「预售资金监管账户」标签

## 修复方案
- companyName 框加宽到 217pt（单行放下测试值，右侧「统一社会信用代码」标签起点 399.4pt）
- bankName 框收窄到 157pt（不再压右侧标签）+ 加高到 45pt（两行折行完整显示不裁切）
- 修改需同步 mc:Choice 与 mc:Fallback 两处文本框几何

## 生成链路与协作
- 占位符值由 PresalePermitCertModelBuilder.java 提供；渲染由 PresaleDocGenerateService + PresaleDocRenderEngine 完成
- 证书在备案完成时一次性生成，无重新生成入口
- 后端 worktree 基线惯例：ty 的 bug6164、dzc 11-05 客测修复均基于 ligy 特性分支 4432d357（非 origin/dev）
- 本地可用 aspose-words 22.5 jar 渲染验证

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_cert_fix",
  "source_extraction_id": "1b54ac09e30b43a8b8a947056b402f71",
  "version": 1,
  "memory_type": "entities"
}
-->