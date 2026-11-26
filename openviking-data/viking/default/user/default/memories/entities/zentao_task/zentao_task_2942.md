---
audit_status: valid
last_checked: 2026-11-27T00:51:38+08:00
verdict_note: 防汛C端命中 StageFilterDialog/RescueFillDialog/common/complex/page, 禅道任务进展属实
---
# 禅道任务 2942
禅道任务 2942 是「求援工单填报弹窗（物业管理区域 + 预警事项）」开发任务，方案为填报前弹窗选择物业管理区域 + 预警事项、复用 StageFilterDialog 编写 RescueFillDialog；2026-11-26 hop1 完成组件与页面改动并通过 build，hop2 出弹窗验证截图，hop3 因用户反馈补齐禅道需求第 2、3 点：修正区域下拉数据源（/common/complex/page、去 eventId 门禁）并完成 mock E2E 验证出图；hop3 已硬交接，form 联系人/电话截图、验证门、提交推送与禅道回写待下一跳接续。

## 需求与方案
- 任务编号 2942，链接 http://zentao-biz.zhi.com/index.php?m=task&f=view&id=2942
- 标题：求援工单填报弹窗（物业管理区域 + 预警事项）
- 填报前弹窗选择「物业管理区域 + 预警事项」；检索 StageFilterDialog 引用位置、求援相关 API 与部署配置后确认可直接复用
- 禅道需求三点：①物业登录查看该小区数据；②物业区域默认带出当前账号登录时选择的区域、下拉可选、选项为有权限区域；③联系人/电话自动带出且可编辑
- 禅道附图（fileID 24508/24509/24523）显示「请先选择预警事项」，与需求文字「默认带出当前登录区域」冲突
- 2026-11-26 用户澄清：无「当前登录区域」字段，按下拉里选的物业管理区域来；方案去掉登录字段预填，核心改为修正区域下拉数据源

## 实施进展
- 起草精简实施计划，用 todo_write 列步骤并写计划文件，提交编排器审核
- 计划审核通过（82 分，0 个 P0）；2026-11-26 用户确认实施，更新计划 frontmatter
- 基于 StageFilterDialog 编写 RescueFillDialog 并修复样式引用；更新 index.vue 与 form.vue；去除表单 DEMO_COMPLEX
- 8150 端口未监听，拉起本地静态服务并打开浏览器验证
- hop2 截图自检通过（1256×581），弹窗含标题「填报工单」+选择预警事项+选择物业管理区域+取消/确定；用户反馈第 2、3 点未在截图中体现
- hop3 核对：联系人/电话自动带出已实现（form.vue:13-20，bug7002 既有逻辑）；物业区域默认带出当前登录区域未实现（RescueFillDialog.vue:13-22 初始为空、L48-57 需先选预警事项）
- 用户选择补做；补充计划三审通过（82→86→91 分，均 0 P0）；竞态已由现有 complexSeq 序号实现（RescueFillDialog.vue:33-45），无需新增
- 2026-11-26 hop3 五处改动：①loadComplex 传 useCommonApi=true；②openAreaDropdown/toggleAreaDropdown 去 eventId 门禁；③pickAlert 切换预警事项不再清空已选区域；④模板区域 input 去 eventId 依赖的 disabled/placeholder；⑤onMounted 主动拉一次权限区域
- 改前基线与改后 build 均 DONE（job bash-b5b4060862cf4d5f）；编排器结构化通道拒绝，改用后台任务 + 监听

## 相关代码
- StageFilterDialog：可复用的筛选弹窗组件，用于求援工单填报前选择
- RescueFillDialog.vue：新建的求援工单填报弹窗组件，填报前弹窗含汛中预警 + 物业管理区域；complexSeq 处理区域加载竞态
- index.vue:146-147：物业角色显示「填报」并打开弹窗，未登录时 canFill=false 被隐藏
- form.vue：query 校验并传入真实 complexId 与 eventId；:13-20 取登录用户 realName/nickName/userName + phone 作联系人/电话（可编辑 input）
- 求援区域下拉应走 /common/complex/page（flood.ts:527-537），此前误走 /plan/complexPage；登录缓存 LoginUserInfo 无区域字段

## 验证与交接
- hop1/2 本地 8150 + sessionStorage 模拟物业（wyqy）点击「填　报」出弹窗；截图 task2942-dialog-20261126-104656.png、task2942-rescue-20261126-104402.png 位于 C:/Users/ADMINI~1/AppData/Local/Temp/
- 联系人/电话实机 E2E 受阻：form 页需从列表弹窗确认后正常导航进入（直接访问被守卫重定向登录页）；本机后端未配返回「连接服务器超时」
- hop3 mock /common/complex/page 返回权限区域（观澜花园、湖畔家园）+ 注入物业用户：未选预警事项时区域下拉即可拉出两个权限小区；选区域「观澜花园小区」再选预警事项「台风蓝色预警」，切换事项后区域保持；截图自检有效非空
- hop1 交接文档 D:/plan/苏住房防汛C端/HANDOFF-CHAIN-zentao-2942-rescue-dialog-hop1-20261126-1047.md，排定 hop2（10:48）
- hop3 硬交接文档 HANDOFF-CHAIN-zentao-2942-rescue-dialog-hop3-20261126-1106.md（9 节，chain_id/hop=3/maxHops=10，4 项未完成）；下一跳 schedule-417f9435-a506-431f-a524-01c1acbe4f0c，11:07:08（+15 秒），new_once
- 待下一跳：form 联系人/电话截图、验证门确认、提交推送、禅道 #2942 回写带附图；通过后默认执行，除非用户说暂不提交

<!-- MEMORY_FIELDS
{
  "category": "zentao_task",
  "name": "zentao_task_2942",
  "source_extraction_id": "215855c16e084e2da6f057b2ec9e062f",
  "version": 3,
  "memory_type": "entities"
}
-->