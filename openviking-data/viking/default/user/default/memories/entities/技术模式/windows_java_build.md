# Windows 本机首次构建 Java 后端拦路虎
在从未本地构建过的 Windows 机器上跑 Maven 编译会连续撞上空的 .m2 与公司 Nexus 被镜像和 HTTP blocker 双重拦截两个环境坑。

## 问题根因
- 本地 `.m2` 为空，父 POM `zhi2-be-parent` 解析不到，构建直接失败
- `com.aspose:aspose-words` 等商业依赖只存在于公司 Nexus（http 协议），被 `mirrorOf=*` 全量镜像重定向到 central 而找不到
- Maven 3.9 默认启用 HTTP blocker（`maven-default-http-blocker`），拒绝非 https 仓库，http Nexus 被拒
- 工具链缺失：机器没装 JDK、没装 Maven，jar 都是别处来的

## 解决方案
- 工具链装到独立目录 `D:\tools`：Temurin JDK 8 + Maven 3.9.16，用 `mvn -v` / `javac -v` 验证
- 空 `.m2` 下先在父 POM 目录跑 `mvn -N install`（`-N` 非递归只装根 POM），把 `zhi2-be-parent` 装进本地库再编子模块
- 改 `settings.xml`：`mirrorOf` 从 `*` 改为 `<mirrorOf>central</mirrorOf>`，让公司 Nexus 直连；同时禁用 HTTP blocker（`<blocked>false</blocked>` 或排除仓库 id）
- 验证顺序：先 `mvn -B compile` 全量通过 → `clean package -DskipTests` 出 jar → 最后才重启服务，先验证再停机避免白停
- 复盘结论写清根因是「这台机器从没本地构建过」，而非「依赖有冲突」

## 验证与归属
- 验证：会话 session-41beb375-55a3-4b4f-8f11-d8ecdaa2daa6（基线 6156653）最终结论确认两个拦路虎及修复后 BUILD SUCCESS
- 涉及文件：pom.xml、settings.xml
- 来源会话ID：session-41beb375-55a3-4b4f-8f11-d8ecdaa2daa6；代码基线：6156653


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "windows_java_build",
  "source_extraction_id": "e19e710c9628480f994e16c17d092217",
  "version": 1,
  "memory_type": "entities"
}
-->