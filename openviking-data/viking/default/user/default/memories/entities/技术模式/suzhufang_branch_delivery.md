# 苏住房G 同源多分支交付规范
苏住房G 与惠山等是同源复制多分支，需求只进指定分支，另一分支用 revert 反向剔除，tag 用年月日时分纯数字。
## 交付规则
- 先确认需求归属分支再动代码，别在当前分支直接开发完就推
- 目标分支不该有的功能用 git revert 生成反向提交保留历史痕迹，禁止 git reset --hard 改写历史后强推
- 另一分支本地落后先 rebase 到远程最新再推
- 打 tag 按年月日时分纯数字（如 202608051736），git tag + git push origin <tag> 单独推
## 仓库拓扑
- zhi2-web-admin 是子模块：子模块提交→父仓库更新指针→两边分别 push，顺序不能反
- 交付汇报须给出两仓库各自 before→after commit、新 tag 名，并说明已切回哪个分支
## 涉及与来源
- 本批示例：suzhufang 推 revert 房屋产权功能并打 tag 202608051736；huishan rebase 后推含 pageHouseProperty
- 涉及文件：zhi2-web-admin、complex/detail.vue、housePropertyTable.vue
- 所属项目：苏住房G；来源会话：ff247e73-6d29-4b14-bad2-8846f15f3105；代码基线：b6932ba

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhufang_branch_delivery",
  "source_extraction_id": "d4f9217e4b834d00b440bed176913edd",
  "version": 1,
  "memory_type": "entities"
}
-->