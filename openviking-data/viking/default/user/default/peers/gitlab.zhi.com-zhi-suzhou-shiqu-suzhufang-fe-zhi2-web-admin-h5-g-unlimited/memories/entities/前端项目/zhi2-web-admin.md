# zhi2-web-admin
苏住房G前端后台项目，采用 Vue 编写，包含电动车管理等业务模块。

## 项目结构
- 列表页按业务分目录存放，如电动车管理 > 隐患处置列表页为 `src/views/electrocar/hazard/index.vue`。
- 隐患处置详情页另设有反馈进度、处置完成等操作入口。

## 列表按钮机制
- 列表操作列按钮由 mixin 的 `disableButton` 基于 `bizState` 控制禁用，可在 `buttons()` 中通过 `disabled` 覆写覆盖默认逻辑。
- 接口返回的行字段包含 `canEdit`、`canDelete`、`canFeedback`、`canFinish`，用于判断按钮是否禁用。

## 验证方式
- 静态检查使用 `eslint src/views/<dir> --ext .vue,.js`。
- 构建检查使用 `npm test`（test 模式的 Vite 构建）。

## Environment and Access
- Real-machine URL is `http://localhost:8101/#/safety/electrocar/hazard`; port 8100 serves a different app (无锡市惠山住建局维修基金管理系统), not 苏住房G.
- Property account 601117997 (李翠萍) can log in on 8101, but its menu has no hazard/electrocar route, so direct access redirects back to index.
- Admin account zsbase holds `*:*:*` permissions and can open the hazard route; its password is stored in `%TEMP%\e2e_pass.txt`.

<!-- MEMORY_FIELDS
{
  "category": "前端项目",
  "name": "zhi2-web-admin",
  "source_extraction_id": "b264f29f13c442be959a7c52d1304e4d",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->