# 防汛C端公司测试环境（8162）
deploy-env 管理的苏住房防汛C端公司测试环境，前端走本机 dist，接口走环境网关。

## 站点配置
- 配置文件 `D:/nginx/conf/env-sites/防汛C端-test.conf`，监听 8162
- root 指向 `D:/repository/苏住房防汛C端/dist`，静态页面走本机 dist
- `/api/...`、`/zhi2/` 等 location 经 `proxy_pass` 到 test 远程网关
- 这是 deploy-env 的设计：页面本地、接口走环境网关，不是整站反代远程 H5

## 注册表字段问题
- 2026-11-25 核对：deploy-env 注册表「防汛C端 / test」的 `frontend_url` 误写为远程域名 `http://unlimited.c.h5...test.zhi.com/`
- `frontend_url` 应为 `http://localhost:8162`；`backend_gateway` 用远程域名合理
- dev 环境（8161）的 `frontend_url` 正确为 `http://localhost:8161`
- 该错误会让 agent 按 `query_env.py` / `/api/state` 首步打开远程页，绕开本机 8162
- 助手提出可用 `upsert_env.py` 修正 `frontend_url`（不动 `backend_gateway`），待用户确认

<!-- MEMORY_FIELDS
{
  "category": "部署环境",
  "name": "fangxun_test_8162",
  "source_extraction_id": "4a27cb0811cf41638470f3ea79348b8f",
  "version": 1,
  "memory_type": "entities"
}
-->