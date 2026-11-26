# zentao-analyzer
DSH 技能，用于禅道缺陷根因分析。

## 功能
- 根因顺序：症状 → 先查真实数据 → 再读代码；2026-11-11 起第 5 条改为阻塞项，必须先完成一条真实数据查询（表结构或样本行，如 ALL_TAB_COLUMNS 与一行样本固定 SQL，见 references/dbx.md）才能进入代码阅读。
- 2026-11-24 codeerror 类 UI 缺陷须先用 agent-browser 在目标环境复现再写修复方案；zt_action 无评论时改读 zt_bug.steps 分片与附件截图辅助定位；codeimprovement 类型无强制复现要求，可直接以附件截图作证据。
- 截图用缓存下载脚本落到 `D:\禅道附件\bug\<bugID>\`；DBX 连接名「新禅道」，工具参数为 sql 与 connection_id/connection_name；2026-11-26 DBX 查禅道缺陷时 zt_action 与 zt_bug 列名不同，先 describe 两张表再查询。
- 2026-11-25 目标环境登录复现受限（验证码算术题、login POST 不触发）时记「登录失败」为复现失败退出，按技能非阻塞，转代码+截图证据；2026-11-26 devel 类型任务（非 bug）无需浏览器复现，禅道任务通过 `index.php?m=task&f=view&id=<id>` 定位，查 zt_task 与 zt_action 评论，任务表无 steps 列。
- 2026-11-24 行号脚本改大文件易引入语法错误（重复 methods/items、缺括号），恢复文件后改用精确字符串替换加断言更稳；文件缩进为 20 空格而非 21，区块插入须消耗锚点行否则死循环。2026-11-26 完整任务工作流含计划文件、todo 清单 gate、计划复审评分、用户确认（approved_sha256）、实施、构建、前端验证 gate（带时间戳截图证据）与回写禅道。
- 2026-11-26 浏览器复现时 `data-testid="login-submit"` 被 span 遮挡的 covered 提示可用 JS 直接点击绕过；侧边栏收起/展开用 `.hamburger-svg`；registry 的 `frontend_url` 可能过期，实际服务端口需另行探测确认。截图视觉识别可能误读标题遮挡，需精确裁剪原图核对；元素 DOM 几何无重叠时应转向父容器固定高度/overflow 排查。

## 关系
- 与 dsh-cost-meter、agent-cost-hygiene 同批次降本优化。


<!-- MEMORY_FIELDS
{
  "category": "skill",
  "name": "zentao_analyzer",
  "source_extraction_id": "a2b4d7adda7641e58acfada91fed7d03",
  "version": 7,
  "memory_type": "entities"
}
-->