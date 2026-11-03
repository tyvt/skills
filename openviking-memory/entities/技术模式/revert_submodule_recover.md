# revert_submodule_recover
苏住房G 父仓为 superproject，真实代码在子模块 zhi2-web-admin；误 revert 子模块改动后需「子模块 revert the revert + 父仓更新指针」恢复。

## 背景与为什么
- 物业合同列表页 9/3-9/4 字段与展示规则优化被 revert，需恢复子模块最近 revert 的改动。
- 父仓只拨指针等于丢代码；只改子模块不改指针则父仓指向旧版本，提交链两端不对齐。
- 已知「子模块先行、父仓只更新指针」规则同样适用于 revert / revert-of-revert 反向操作。

## 恢复步骤
- ① 子模块对应分支（本例 develop/v2.6.2-suzhufang）执行 git revert <被 revert 的 commit>，生成新提交而非 reset/强推，保留历史。
- ② 核对 diff 只命中预期文件（本例 propertyContract/components/index.vue）。
- ③ 父仓提交指针更新（7f09295 → 9d849f1），提交信息写明恢复的是哪次 revert。
- ④ 按业务清单逐条验收：内联 template 结构（不走 ListTemplate.js）、默认筛选 bizState:'2'、搜索项合同有效期/是否上传备案表、顶部说明文案、按 businessType 区分表单项与列。
- ⑤ 确认无关修复（ImageUpload 路径）未被连带回滚。
- ⑥ 两端各自 push，本地领先远程时提醒用户按子模块先、父仓后顺序推。

## 验证与涉及
- 验证：会话 e6ba29d4 子模块 git revert c444795 生成 9d849f1（仅改 index.vue +228/-87）；父仓 cf4686b 更新指针 7f09295→9d849f1；清单五条全确认，ImageUpload 修复与 assets/images/file/3.png 路径保留。
- 涉及文件：zhi2-web-admin/src/views/property/propertyContract/components/index.vue、zhi2-web-admin/.gitmodules
- 所属项目：苏住房G；来源会话：e6ba29d4-cc1a-45ef-b933-282c90f69fcd；代码基线：17d79d3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "revert_submodule_recover",
  "source_extraction_id": "80b8d85da2ca487fb92817c245845f78",
  "version": 2,
  "memory_type": "entities"
}
-->