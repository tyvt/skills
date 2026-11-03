# 列表边框 list-card 合并丢失
产品2.0 中物业管理区域备案列表「没有框」反复出现，根源是定制分支合并时 list-card 包裹层被静默删掉。

## 问题根因
- 列表边框由包裹层 div.list-card 提供（V3 约定独立列表页必须套 list-card），非页面自绘
- 定制分支（如 develop/v2.6.2-yulin、*-szr）合入 getQueryParams 的 B 端改动时多次冲突，list-card 被静默删掉，功能正常故 CI 与类型检查都发现不了

## 解决方案
- 不再逐次微调样式，先确认是否包裹层缺失
- 同源多分支按页横向对比：基础分支与定制分支同名页面逐个 diff 容器结构
- 修复按「每页补回 list-card」逐页处理，提交信息写明补回边框容器
- 基础分支同样缺失要一并提交；评估其它定制分支是否同病
- 关键判断：改动须落到基础分支或每个定制分支，只改一条等于没修

## 验证与归属
- 验证证据：会话 7ae7d4b9 用户多次提列表没框疑合并问题；对比 develop/v2.6.2 与 -yulin 确认 4 页面 list-card 丢失，基础分支仅「权利人同步」缺，分别提交 1d2718782 与修复 4 文件
- 涉及文件：property/complex/index.vue、RegionTreeLayout.vue、styles/index.scss、listMixins.js、zs-table.vue
- 所属项目：产品2.0；来源会话：7ae7d4b9-281a-4316-bf51-824355179604；代码基线：50767de

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_card_loss",
  "source_extraction_id": "c6f7f75bccb4456b9472da01fa926967",
  "version": 1,
  "memory_type": "entities"
}
-->