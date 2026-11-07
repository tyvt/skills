# [苏房] zs-dialog 新增 scrollable 模式致内容溢出不能滚动
suzhufang 分支弹窗内容超出高度却无滚动条且滚不动，内容被裁掉，同页面在 develop/v2.6.2 正常。

## 问题现象
- suzhufang 分支上弹窗内容明显超出高度，既无滚动条也滚不动，内容被直接裁掉
- 同样页面在 develop/v2.6.2 上正常显示

## 根因
- 滚动能力被两次提交改坏：4defa2128 引入高度自适应+neutralizeInnerScrollContainers，中和内部滚动容器 overflow
- 4879d1d31 又引入 zs-dialog--scrollable 模式，最终无任何一层承担 overflow:auto+max-height
- 旧版 zs-dialog 是 .form-box 用 overflow:auto+max-height 做内部滚动，故 2.6.2 不受影响
- 这两个提交是从 2.6.2 分出后单独合入 suzhufang 的

## 解决方案
- 先按分支定位，用 git log -S/zs-dialog--scrollable 确认问题提交是否在当前分支，勿全分支盲改公共弹窗
- 修复落当前分支的 zs-dialog 滚动链（明确唯一滚动层）
- 排查所有依赖弹窗内滚动的页面（zs-dialog 是公共组件，改动面全局，不能只验证截图处）
- 「为什么别的地方没事」类问题先做分支差异比对再动手

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证会话 17392583（064.md 会话 17392583）：用户报弹窗内部超出无法滚动，结论仅 develop/v2.6.2-suzhufang 含 4defa2128 与 4879d1d31，develop/v2.6.2 停在 f1b078cb9 仍是旧滚动逻辑
- 涉及文件：components/zs-dialog/zs-dialog.vue、views/system/menu/index.vue
- 所属项目：苏住房G；代码基线：69e9d4d；来源会话ID：17392583-56a4-49a0-82fb-430a5f1aadfe

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术笔记",
  "name": "zs_dialog_scrollable",
  "source_extraction_id": "e5fee5879ff946e5b6c2d05414479365",
  "version": 1,
  "memory_type": "entities"
}
-->