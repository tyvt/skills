# 禅道 2953 工作台新增入口交接 hop13
物业手持B端（zhi2-mobile-shimin-h5-b-unlimited）禅道 2953「工作台新增入口及跳转」任务的交接文档，记录于 2026-11-26 hop13。

## 位置与链路
- 路径：D:/plan/物业手持B端/HANDOFF-CHAIN-禅道2953工作台新增入口及跳转-hop13-20261126-1706.md
- 链路按交接文档第 9 节继续；不设最大跳数、禁标「最后一跳」，完成只看第 4 节清空。
- hop14 已排程 2026-11-26 17:06:46 投递（target=new、active、schedule_list 第一条，P0 置顶已确认）；无遗留后台 job。

## 已完成不重做
- 两仓代码与 build、凭据 upsert、验证码识别、XHR patch、网关/conf 修正并 reload 均在前几跳完成。
- 早前登录失败根因为网关域名不匹配，非凭据/patch/验证码问题，现已排除。
- hop12 通过重新生成 env-sites confs 解决登录阻塞的网关不匹配；技术细节另存于 h5_gateway_registry。
- 唯一被跟踪的 conf 变更为 `D:\nginx\conf\env-sites\物业手持B端-local.conf` 第 2、13、30、35、37-39 行。

## hop13 结果
- 刷新页面并重新 patch XHR（`__netlog`，刷新后失效）、vision 两步识别验证码（`3+5=?`→8）、账号 `601117997` / 密码隐私库取值、单引号填表读回校验正确；MSYS `/tmp` 与 Windows python 不互通，改用 Windows 临时路径。
- 用 eval 点击单个 `uni-button` 登录成功：URL→`/#/pages/home/index`，user/permission/msg 接口 200，token 落 localStorage（42259 字符）。当前区域=嘉樾时代花园（projectId=667585159348728）。
- 进入工作台页 `/#/pages/workbench/index`，6 组菜单已加载；核对 h5RouteMap/openH5/handleMenu 锚点（`src/pages/workbench/index.vue:197-256`）。
- 等效成本 152k 触顶，按链规则交接 hop14；实机验证、出图、提交推送与禅道回写仍待完成。

## hop14 待办
- agent-browser 实机验证 6 组入口跳转 + 新入口跳转 + req2/3/4（req2/start 带出选中区域、req3/更多筛选隐藏行政区划、req4/checkType 2/3/4 隐藏发起检查），截图落 `$env:TEMP` 自检、用户确认后提交推送两仓并回写禅道 2953（comment 附图）。
- 目前尚未提交、推送或回写禅道；验证门须先出图并经用户确认。

<!-- MEMORY_FIELDS
{
  "category": "tech_doc",
  "name": "zentao_2953_handoff",
  "source_extraction_id": "bbda7c72ef2746f9a023ae0f689cb0cd",
  "peer_id": "gitlab.zhi.com-zhi-yulin-all-wuguan-fe-zhi2-mobile-shimin-h5-b-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->