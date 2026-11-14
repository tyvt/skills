# 需求截图基准图视觉回归E2E
在 zhi2-web-admin 的 E2E 视觉回归中以需求截图作为基准图，并通过单文件用例落实计划约束。

## 基准图与可复用能力
- 已生成尺寸为 1920×110 的需求截图基准图，作为视觉比对参照。
- 现有 E2E 可直接复用 Playwright、Pixelmatch、PNG 解码器，以及认证与 API mock 能力。

## 实现方式
- 编排器代码草拟调用卡住后，改为直接编写受计划约束的单文件 E2E 用例。
- 明确不再重试同形态的编排器调用，避免重复踩坑。


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "visual_baseline_screenshot_e2e",
  "source_extraction_id": "a3c02bb625a24ca7848bb6e0e249dc9f",
  "version": 1,
  "memory_type": "entities"
}
-->