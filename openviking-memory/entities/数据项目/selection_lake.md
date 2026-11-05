# selection_lake 数据湖项目
本地股票数据湖项目，用于抓取东财、腾讯等数据源并做筛选，依赖本地 HTTP 代理出口。

## 代理配置
- 配置文件 `configs/selection_lake_policy.json` 中设置 `"proxy_url": "http://127.0.0.1:7890"`
- 7890 为本地 HTTP 代理端口，通常是 Clash / Clash Verge / mihomo 等外部代理客户端的默认混合代理端口（非数据湖自身服务）
- `external_lake.py` 的 `configure_proxy()` 会把 `HTTP_PROXY/HTTPS_PROXY` 强制指向 127.0.0.1:7890，抓数据源时走 HTTPS CONNECT
- 代理客户端必须保持运行，否则更新会报 `ProxyError ... 127.0.0.1:7890 ... WinError 10061 由于目标计算机积极拒绝`

## 关键脚本
- `scripts/update_selection_lake.py`：完整数据更新脚本，后台运行可能耗时 10–90 分钟
- `screen_sh.py` / `screen_sz.py`：筛选脚本，默认基准日取最近完整交易日
- `external_lake.py`：外部数据抓取与代理配置模块

## 更新行为
- 若历史日期（如 2026-10-29）有失败阶段，本次运行会先按 retry-previous-date 补该日计划
- 更新阶段包括 BSE 快照、push2、baostock、instruments、compact、公告 events（cninfo）等


<!-- MEMORY_FIELDS
{
  "category": "数据项目",
  "name": "selection_lake",
  "source_extraction_id": "cc131970811c4d0a89db58f5fb681feb",
  "version": 1,
  "memory_type": "entities"
}
-->