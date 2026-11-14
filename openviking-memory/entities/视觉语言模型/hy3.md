# hy3
OpenViking 使用的视觉语言模型（VLM），负责从会话中抽取记忆。

## 基本信息
- 在 OpenViking 中引用为 openai/auto/hy3
- 复用 magpie 配置；在 OpenViking 中承担双重角色：记忆抽取（vlm）与 query_planner（每次检索时改写/规划查询，单次 search 约 17 万 token，2026-11-12 排查确认）
- 于 2026-11-02 在 doctor 检查中确认 VLM 探活成功
- 2026-11-09 用户确认其不支持图像识别（识图），视觉对比基准中排除全部 hy3 变体（auto/hy3、workbuddy-ai/hy3、workbuddy/hy3）

## 状态备注
- 2026-11-02 验证 VLM 抽取链路完全打通：实测会话抽取成功（单次 11578 tokens 抽 4 条、8973 tokens 抽 3 条、8712 tokens 抽 2 条记忆），中文结构化抽取准确
- 抽取速度较慢：实测 2 条消息 commit 耗时 126 秒、12K tokens 仅产 1 条记忆约 100 秒
- 单次 commit 约消耗 22K tokens，其中 VLM 抽取约 8K 推理 tokens
- add-memory 直灌路径单条约 40 秒、约 4K tokens，自动分类写入（entities/preferences 等）
- 2026-11-02 当前会话单次 commit 实测：约 370 秒、52K tokens，产出 3 条新增 + 3 条更新记忆（全量抽取含较长上下文）

## 预提炼记忆导入表现
- 2026-11-02 实测：将带 type/files/evidence/sessionIds/baseline 的预提炼记忆原样导入 OpenViking 时，VLM 仅保留语义分类（如 preference）与关键落地文件（例：VerificationReceiptDetailTable.vue），丢失 sessionIds（溯源 UUID）、baseline（代码基线如 c97957703）、evidence 原文及部分文件完整路径
- 2026-11-02 园区物管2.0 试跑导入：hy3 每批抽4条，溯源内嵌正文保留率73%(偏好类本不带会话ID)，bug 归 entities 而非 events，实体卡增大致合并增强、write 降 edit 增；单批耗时151→174s/批，累计1199万tokens@42批，VLM 导入成本高但可控
- 2026-11-02 园区物管2.0 全量导入暴露语言漂移严重缺陷：hy3 将23条记忆整体葡萄牙语翻译(技术术语与中文项目名受损)，并生成葡语目录名（技术模式/布局根因）；修复未重跑VLM(会再漂移)，改用内容指纹(变量名/组件名/接口名等ASCII标识符)从源数据精确反查中文原文逐条重写，23条全部恢复、残留0

<!-- MEMORY_FIELDS
{
  "category": "视觉语言模型",
  "name": "hy3",
  "source_extraction_id": "7cbb0faea272400a87fc7fde9a490bd8",
  "version": 10,
  "memory_type": "entities"
}
-->