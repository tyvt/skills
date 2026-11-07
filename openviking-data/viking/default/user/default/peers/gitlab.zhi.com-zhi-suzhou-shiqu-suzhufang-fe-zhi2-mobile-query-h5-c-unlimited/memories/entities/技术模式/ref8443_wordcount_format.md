# 求援工单字数统计格式
苏住房防汛C端查询H5（zhi2-mobile-query-h5-c / ref8443）项目中，求援工单与 Ref8443 演示组件的大文本字数统计统一为「当前字数/上限」分数式。

## 格式约定
- 字数统计采用分数式 `当前字数/上限`（如 `10/200`），替代原「已输入 N 字」写法
- 与现场照片 `n/6` 同一种分数式展示

## 实现位置
- 正式求援表单（src/pages/rescue/index.vue）：`现场险情描述`/`所需支援描述` 右下角 `{{ dangerCount }}/200`、`{{ supportCount }}/200`，上限与 `maxlength="200"` 一致
- Ref8443 演示（src/components/flood/Ref8443Rescue.vue）：引入 `computed`、`RISK_MAX=200`，展示 `{{ riskLen }}/{{ RISK_MAX }}`、`{{ supportLen }}/{{ RISK_MAX }}`，按真实字符串长度绑定避免写死
- src/styles/ref8443.css 注释改为说明「当前字数/上限」

## 提交记录
- 2026-11-06 本地提交（未推送）dev 分支 commit 6e14926 — fix(rescue): unify textarea word count as current/200

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "技术模式",
  "name": "ref8443_wordcount_format",
  "source_extraction_id": "a9bef9b8e9ea4ddabebc782120282dfd",
  "version": 1,
  "memory_type": "entities"
}
-->