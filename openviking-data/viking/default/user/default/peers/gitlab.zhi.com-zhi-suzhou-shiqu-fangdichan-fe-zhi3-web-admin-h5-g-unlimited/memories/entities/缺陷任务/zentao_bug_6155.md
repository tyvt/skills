# 禅道Bug 6155 预售土地使用权证号placeholder错误
房产管理系统zhi2-web-admin中预售/现售方案维护页「土地使用权证号」字段placeholder文案错误缺陷任务，zhunan提交、指派tiany。

## 根因与定位
- 标题：【苏州房产客测环境】预售许可-预售许可申请，土地使用权证号的提示词是不动产权证号
- 截图确认页面为「预售方案维护」，土地使用权证号输入框placeholder显示为「请输入不动产权证号」（错），应为「请输入土地使用权证号」
- 根因：土地使用权证号字段（landUseCertNo）的placeholder从不动产字段复制而来，文案写错
- 同源缺陷：现售方案维护页（cashsale/plan/detail.vue）同一字段存在相同错误

## 修复方案
- 纯文案替换，2处placeholder改正：
- permit/plan/detail.vue 第71行（预售方案维护，即bug截图页）
- cashsale/plan/detail.vue 第73行（现售方案维护，同源缺陷）

## 验证与交付
- worktree zhi2-web-admin-wt-6155（分支 bugfix/6155-presale-landcert-placeholder）修改，npm run build 构建通过（version.json buildTime 2026/11/4 15:18）
- fast-forward 合并回 develop/v3.0.0、删除 worktree
- 提交推送：子模块 bc5f26d62..ec1a252c5，父仓库 gitlink f9768ba..bad38a5，均已推远程

## 禅道回写与未验证
- bug 6155：status=resolved、resolution=fixed、resolvedBy=tiany、resolvedDate=2026-11-04 15:18:49、assignedTo=zhunan（退回提交人验证）
- 未验证：未启动本地dev server实机点击核对；纯文案替换且构建通过，风险极低

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6155",
  "source_extraction_id": "dcbfb71b75b747a288e41f332a08f4bf",
  "version": 1,
  "memory_type": "entities"
}
-->