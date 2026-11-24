# 苏住房G 网关 nginx 配置
苏住房G 前端的 nginx 站点配置，负责把大屏接口代理到对应网关环境。

## 文件与软链
- `sites-enabled\苏住房G.conf` 本身为 0 字节，实为指向 `sites-available\苏住房G`（2518 字节）的软链，nginx 实际加载的是该实体文件。
- 同目录 `苏住房G.conf.bak-test`（2525 字节）是 2026-11-15 的测试网关备份。
- 2026-11-24 切换前另存备份 `苏住房G.conf.bak-6899`（2518B）。

## 域名替换
- 生效 conf 内共 7 处 `.suzhou.dev.zhi.com`：L14 的 Host 与 L43/46/49/52/55/58 的 proxy_pass。
- 2026-11-24 将 7 处全部改为 `.suzhou.test.zhi.com`，把 dev 网关切换为 test 网关。
- 切换依据为 60 行交接文档的 hop2 结论与第 9 节目标。

## 校验结果
- 执行 `nginx -t` 校验通过，reload 成功。
- `/v2.0/` 探测返回 401（网关鉴权挑战），说明代理已通测试网关。
- 切换后访问 8101 大屏页会跳登录页，需要重新登录才能继续实机验证。

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "技术配置",
  "name": "苏住房g网关配置",
  "source_extraction_id": "8f450e1205b9484b83642ded6f3e51ad",
  "version": 1,
  "memory_type": "entities"
}
-->