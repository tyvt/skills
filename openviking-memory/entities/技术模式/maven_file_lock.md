# Maven 复制构件失败因本地实例占着 jar
全量构建中途报 Failed to copy artifact ... 另一个程序正在使用此文件，根因是本地还在跑的实例占着 target/lib 的 jar，停掉后用 -rf 续建。

## 问题根因
- 全量构建中途 common-flowable-server 报 Failed to copy artifact ... 另一个程序正在使用此文件
- 本地还在运行的 flowable 实例（java 进程）把 target/lib 下的 jar 句柄占着
- Windows 上文件被独占，Maven 打包时要复制/替换该文件，导致复制失败

## 解决方案
- 先确认是不是「上次启动的服务还在跑」——本模块有本地实例时优先怀疑它
- 停掉占用进程（结束对应 java 进程）再重跑
- 不用从头重跑，用 mvn -DskipTests install -rf :common-flowable-server 从失败模块续建，省掉前面已成功的 32 个模块
- 排查顺序固定：报错被占用路径 → 是否 target/lib 下构件 → 找占用进程 → 停 → 续建，不要一上来怀疑 Maven 或依赖版本

## 验证与归属
- 验证：会话 2010156f（基线 02900b8）最终结论停掉 flowable 实例后 -rf :common-flowable-server 续建即通过
- 涉及文件：common-flowable/pom.xml
- 来源会话ID：2010156f-5fb3-49c1-859a-daa3a63a94f2；代码基线：02900b8

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "maven_file_lock",
  "source_extraction_id": "67f0bec8f7804bb8904f00a630a74b4e",
  "version": 1,
  "memory_type": "entities"
}
-->