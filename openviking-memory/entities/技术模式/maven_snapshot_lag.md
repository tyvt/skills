# Maven 缺自家包因 Nexus 快照落后源码
全量 Maven 构建报缺 com.zhishu.property.api.complex.util，根因是 Nexus 上发布的 SNAPSHOT 构件比分支源码旧，需先本地 install 依赖模块再续建。

## 问题根因
- 全量 mvn -DskipTests install 时，common-framework / data-property / service-expand 三个模块编译失败，报缺 com.zhishu.property.api.complex.util
- Nexus 上 zhi2-property-api:2.5-SNAPSHOT（快照停在 20260703.070124-7）里没有该 util 包
- 分支上钉的 zhi2-property 提交比快照新，新源码依赖了尚未发布的类，Maven 从远端拉到旧快照自然找不到

## 解决方案
- 遇「某模块缺自己项目里的包」，先比对本地分支 zhi2-property 提交时间与远端快照发布时间，确认是构件落后而非源码写错
- 把被依赖模块先本地安装（mvn -DskipTests install -pl zhi2-property-api -am，或整条链 install），让下游解析到本地新构件
- 源码到位后链路打通，全量 reactor 33 个子工程 BUILD SUCCESS
- 仅为治标，下次别人拉代码同样会缺，除非把 zhi2-property-api 重新 deploy 到 Nexus 并让下游依赖新快照

## 验证与归属
- 验证：会话 2010156f（基线 02900b8）最终结论全量 reactor BUILD SUCCESS，根因是 Nexus 快照缺 util 包，本地先装 zhi2-property-api 后链路打通
- 涉及文件：pom.xml ; zhi2-property/pom.xml
- 来源会话ID：2010156f-5fb3-49c1-859a-daa3a63a94f2；代码基线：02900b8

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "maven_snapshot_lag",
  "source_extraction_id": "67f0bec8f7804bb8904f00a630a74b4e",
  "version": 1,
  "memory_type": "entities"
}
-->