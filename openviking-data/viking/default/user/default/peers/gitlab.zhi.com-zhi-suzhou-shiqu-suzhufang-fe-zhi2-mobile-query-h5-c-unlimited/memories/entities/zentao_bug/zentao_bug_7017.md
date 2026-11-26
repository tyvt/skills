# 禅道缺陷 7017
苏住房防汛 C 端（zhi2-mobile-query-h5-c）管理 APP 检查填写页把「评价等级（可修改）」独立行改为分类标题栏徽标直接编辑 + 笔形图标，复用原改级逻辑；2026-11-26 经 hop3 完成闭环并终止链路。

## 目标与链路
- 禅道链接 http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=7017；属前端 UI 变更（src/pages/project-check/form/index.vue）。
- 目标：删除「评价等级（可修改）」独立行，将分类标题栏评价等级徽标改为可直接编辑并加笔形图标，复用原改级逻辑。
- chain_id=bug7017-评价等级标题栏直接编辑；hop1 的代码改动/build/静态检查/计划评审已完成，hop2→hop3 接续，已完成项不重做。
- 完成标准：实机截图经用户确认、commit/push dev、禅道回写 resolved/fixed 附图、产物清理。
- 文档冲突（hop2 判定）：第 5 节写 hop=1/maxHops=10，但实际排程 hop=2 无 maxHops，终止只看未完成项是否清零；第 9 节「hop=2」为 hop1 笔误，故下一跳应交接 hop=3。

## 登录与浏览器环境
- 直连 HTTP 登录：AES 加密密码，POST /api/v2.0/security/auth/userLogin，验证码取自 /api/v2.0/code（已启用），projectId=suzhufang；token 经 uni.setStorageSync 存入 sessionStorage，登录成功拿到有效 accessToken JWT + token。
- 8150、8162 及第三个端口均返回 200、服务同一 dist（含新 pc-cat-level-icon、旧类已删），修复已上线。
- 表单 local=1 模式从存储键 pc-check-draft:active 读草稿；App.vue 在 token 存在时 onLaunch 跳首页，故先无 token 启动、再注入 token 与草稿、经 SPA 跳表单 hash 路由。
- agent-browser batch 以 daemon 运行（kill 会重置状态）：用新 session 名、避免 wait --load（H5 长连接会挂）、用 wait --text；浏览器 session bug7017v2 此前存活。

## 验证过程与结果
- 表单加载出可编辑徽标；无障碍树显示可点击 picker、5 档、「市标三级」选中（ref=e7），确认 levelEditable=true 分支。
- DOM 自检：徽标文本「市标三级」包在 picker 内（pickerInsideBadge=true）、笔形图标 uni-icons uniui-compose pc-cat-level-icon 为 rgb(7,94,209)=#075ed1、12px，旧类已删，标题「01 综合能力」。
- 程序化 .click() 无法打开 uni-app picker（需真实指针事件）。
- 截图 C:/Users/Administrator/AppData/Local/Temp/bug7017-verify-editable-20261126-144114.png（135 KB）；hop3 自检五项过（尖括号包裹、无反斜杠、.png 后缀、时间戳 20261126-144114、/Temp/ 路径）并经用户确认，确认通过即默认提交推送 + 禅道回写（禅道任务免二次问）。
- hop3 真实指针点击改级：session bug7017v2 停在检查填写页、picker 展开（5 档 e34–e38，当前「市标三级」）；点「市标一级」(e34) 后需再点「确定」(e40) 提交；徽标文本「市标三级」→「市标一级」，onLevelChange 生效，pickerInsideBadge=true、oldClassGone=true、笔形图标仍在。
- levelEditable=false 分支：第 427 行 v-if="form.levelEditable" 为 picker+图标、第 430 行 v-else 为纯文本无图标不可点；改草稿重载、SPA hash 跳转、运行时改 Vue 组件值均失败（form 为闭包变量，setupState 遍历 14 层未暴露），按成本纪律改源码静态核验（v-else 构建期确定、无运行时不确定性），如实标注为静态核验。
- 改前/改后 npm run build 均 exit 0；无残留旧引用。

## 交付、回写与收尾（hop3 完成）
- hop3 交接文档 HANDOFF-CHAIN-bug7017-评价等级标题栏直接编辑-hop3-20261126-1441.md（9 节），第 5 节 chain_id/hop=3/maxHops=10，第 4 节 4 项未完成；hop2 排程 schedule-bcfb7b99…、new_once 2026-11-26 14:42:11（+15s）、四项提示、新 session-0d52e6c6…。
- 唯一改动 src/pages/project-check/form/index.vue:425-431,580-581；commit 9c3456e 已推送 dev，工作区干净。
- 禅道回写：截图上传得 fileID=24592；回写前现状 product=9/project=141/execution=142/openedBy=lichandan、status=active，assignedTo 回写 lichandan；因本轮首次落地改动触发门先补建 todo，再用 resolve 脚本生成事务；新禅道会话（4027e274）事务 UPDATE zt_bug + INSERT zt_action（14 列，comment 内嵌图、files='24592'、product/project/execution=9/141/142）+ 附件挂到 bug/7017；复核 status=resolved/resolution=fixed/resolvedBy=tiany/assignedTo=lichandan、action files=24592、附件 objectType=bug/objectID=7017，事务已提交并关会话。
- 清理：临时脚本目录、验证图（禅道落库 fileID 24592 后才删）、hop1/hop2 遗留 agent-browser batch 残留进程 PID 1820（runner）+ 24092（niu.exe，cwd 锁 bug7017 目录、曾致「Device or resource busy」，不原样重试）；不动 chrome daemon 全局；工作区干净、todo 收口，链路终止无下一跳。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_7017",
  "source_extraction_id": "49e0d092694449399b8fe6f75e5620c0",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->