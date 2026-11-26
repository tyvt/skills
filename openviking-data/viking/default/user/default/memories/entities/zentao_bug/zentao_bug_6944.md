# 禅道 Bug 6944
禅道缺陷 6944 于 2026-11-25 完成零报告提示去除验证与禅道回写，Git 推送与 TEMP 清理仍待 hop3。

## 工单与代码
- 禅道链接 http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6944；2026-11-25 会话先加载 zentao-analyzer 拉取详情。
- 原始目标：「发现隐患」下不再出现灰字「不登记任何隐患直接保存即为零报告，仍计入巡查次数」（需求无此文案）；重新激活因新增/编辑页仍显示该提示，禅道截图可见。
- 仓库 D:/repository/苏住房G/zhi2-web-admin；检索提示文案与相关页面，核对 patrol/index.vue 新增入口与 detail.vue 现状。
- 提交 94e58351c 已删除提示；develop/v2.6.2-suzhufang @ 9a86b3bc7；npm run build 与 dist 全文 grep 均无目标串，本地 dist 无该文案。
- 判断重新激活多半因测试环境旧包/未重建；除 grep 再出现该句外不改码，聚焦重建与实机验证，避免再全仓检索。

## 验证
- 上轮卡点：agent-browser 验证码未过关、未进入 patrol/add，禅道回写未做；环境 http://localhost:8167（本地 dist，git 含 94e58351c），页面 #/safety/electrocar/patrol/add?formMode=add。
- 曾探测 /code 响应结构、查 token 存储（login.vue 含登录接口细节），计划 API 取 token 注入会话直达新增页；浏览器识图登录反复失败（0+8=8 填 8、0×4=0 填 0）。
- 曾看禅道截图路由、打开部署面板测试域名（与禅道截图一致）、关闭验证码弹窗刷新重试；后改原子链路：拉新验证码→识图→API `/api/v2.0/code` 登录取 JWT→浏览器注入→打开 patrol/add，并在同一次 /code 响应下完成识图与 API 登录。
- API 登录与 JWT 注入后页面打开且无目标灰字；全页截图 C:/Users/Administrator/AppData/Local/Temp/bug6944-verify-full-20261125-1433.png；DOM 无目标提示、patrol 源码 grep 0 命中。

## 回写
- 用户通过「发现隐患」子表截图确认页面无灰字；禅道回写 status=resolved、resolution=fixed、resolvedBy=tiany、assignedTo 回退创建人 lichandan，验证图 fileID 24363 写入处理记录。
- 回写 comment 说明根因为测试环境旧包/未部署、代码已修（commit 94e58351c）并附验证图。
- 提交 94e58351c 已在 origin/develop/v2.6.2-suzhufang 祖先链上；本会话未再改业务代码。

## 待办与收尾
- 未完成（交给 hop3）：git push 失败（http://gitlab.zhi.com 无交互凭据，credential-manager/用户名无法读取）；子模块工作区索引仍脏，勿 git add -A，只推已有提交即可。
- 禅道确认附图后可清理 $env:TEMP/bug6944-*；交接文档 HANDOFF-CHAIN-bug6944-零报告提示-hop3-20261125-1509.md；排程 schedule-a02144ed-… 约 15:09:55 new_once 接续推送与清理。
- 本机已登录 Git 的终端可手动执行：cd /d/repository/苏住房G/zhi2-web-admin && git push origin develop/v2.6.2-suzhufang；cd /d/repository/苏住房G && git push origin develop/v2.6.2-suzhufang。


<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6944",
  "source_extraction_id": "4c7cdd6113aa40cbb73b4339838a263a",
  "version": 4,
  "memory_type": "entities"
}
-->