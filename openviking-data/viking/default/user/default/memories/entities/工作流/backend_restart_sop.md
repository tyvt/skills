# 更新后端并重启标准 SOP
更新代码后必须先全量编译通过再停机，用原参数重启并以进程存活+端口监听+网关可连作为健康口径。

## 标准顺序
- 更新代码（如 `666c38f → ce348a3`，+8 提交，子模块同步、clean/ahead-0/fast-forward）
- `mvn -B compile`（14 模块 BUILD SUCCESS）→ `clean package -DskipTests`（BUILD SUCCESS，4 个 jar 重建）
- 以上通过后**才**停旧服务、用原参数启新服务，避免白停一轮

## 关键原则
- 用原参数重启保证端口、Nacos 注册、配置一致
- 健康判定仅做到「进程存活 + 端口监听 + 网关可连」，不做逐接口冒烟，需在交付中显式声明为未验证项
- 敏感配置（Nacos 密码等）内存内复用，不落盘、不打印
- 工具链装在 `D:\tools` 时注明未写入系统环境变量，换终端需重新指定 PATH

## 服务实例与配置
- common-gateway 33864/8080、service-expand-server 24192/9610
- common-framework-server 15264/9211、common-flowable-server 16176/9700
- 每步记 BUILD SUCCESS 与 jar mtime，重启后记新 PID/端口

## 验证与归属
- 验证：会话 session-41beb375-55a3-4b4f-8f11-d8ecdaa2daa6（基线 6156653）最终结论表与未覆盖风险段
- 涉及文件：pom.xml、settings.xml
- 来源会话ID：session-41beb375-55a3-4b4f-8f11-d8ecdaa2daa6；代码基线：6156653


<!-- MEMORY_FIELDS
{
  "category": "工作流",
  "name": "backend_restart_sop",
  "source_extraction_id": "e19e710c9628480f994e16c17d092217",
  "version": 1,
  "memory_type": "entities"
}
-->