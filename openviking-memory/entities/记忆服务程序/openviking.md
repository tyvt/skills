
# OpenViking
开源记忆服务程序，负责会话存储、向量索引与记忆抽取；被 DeepSeek Harness 用作长期记忆替代旧库。

## 基本信息
- 版本 0.5.3，端口 1933，auth_mode=dev 无鉴权；/health 返回 {"status":"ok","healthy":true}
- 数据目录 ~/.openviking（含 vectordb、viking 文件层与日志）；记忆文件路径 data/viking/default/user/default/memories/，含 identity/soul/entities/events/preferences

## 组件与配置
- 嵌入模型 bge-m3-ov（litellm/ollama，dim 1024，num_batch=1024、num_ctx=8192 解决 batch 超限）
- 抽取 VLM：openai/auto/hy3（复用 magpie 网关）；DSH 插件 @openviking/dsh-memory-plugin 写会话镜像
- allow_metadata_override: true 避免换模型后元数据不匹配拒绝启动

## 命令行工具与运行
- ov CLI 需 ovcli.conf（url 字段，dev 无鉴权）连本地；ov add-memory 自动分类结构化（无 --file 走 HTTP API）
- ov mv 经 API 移动/重命名并保持向量索引一致；ov rm 删记忆及索引条目；二者处理手动改名的幽灵条目（旧 URI 残留、检索返回不存在路径）
- ov reindex --mode vectors_only --wait true 重建向量索引（CLI 调 HTTP reindex 异步；大批量易超时但服务端后台继续）；ov wait 等待后台任务（命令超时不等同任务失败）
- start-server.bat 先启 Ollama 再启 server，启动文件夹放 OpenVikingServer.lnk 开机自启；会话按 token 阈值或结束触发 commit，同日冷启动全杀后 12 秒内自恢复

## 版本控制与导入
- 2026-11-02 git 仓库建于 ~/.openviking（基线 4f822ff，跟踪 42 .md(~54KB)/4 配置(ov.conf、ovcli.conf、start-server.bat、bge-m3-ov.Modelfile)/23 目录索引，排除 vectordb/_system/sessions，.gitattributes 强制 eol=lf）；同日决定暂不批量导入 1541 历史会话（~158h/8000万tokens），先实时积累
- 2026-11-02 验证 BatchAddMessageRequest maxItems=100；预提炼记忆导入时 VLM 仅保留分类与落地文件、丢失 sessionIds/baseline/evidence 原文及部分路径，批量 3 条仅写1更新1丢失1，证实用覆盖合并致信息遗漏
- 2026-11-02 园区物管2.0 试跑导入(309条/78批)：溯源内嵌保留率73%(元数据仍丢)，数量守恒(批76→75、续跑176→175)；分类漂移致 bug 全归 entities/前端技术笔记/ 而非 events(零新增)；Ollama 断连加5秒批间隔缓解，耗时151→174s/批(+15%)；完成42/78批，累计1199万tokens；全量77项目预估9小时/1300万tokens存风险
- 2026-11-02 园区物管2.0 全量导入完成：309条/77批0失败，净增295(31→326)，合并损耗14条(4.5%)，耗141万tokens/3小时；提交链 17ce5bd→3375b90(语言修复)→36912c5→8d9f312(索引清理)；修复 VLM 语言漂移(23条译葡语、目录名葡语化，用内容指纹反查中文原文重写23→0)与手动改名幽灵URI(ov rm 13+ov reindex重建)；暴露设计问题：VLM 自由命名致22目录中12个仅1-2条记忆，建议后续全量导入先固定分类词表
- 2026-11-02 决定全量导入其余84项目/4122条记忆(每条约1.9万tokens、单项目每批30-114秒)；启动 job pwsh-d6b09e9963d649f1，截至会话末完成49/84，预估8-10小时


<!-- MEMORY_FIELDS
{
  "category": "记忆服务程序",
  "name": "openviking",
  "source_extraction_id": "607996754a514d91ab85ae0c4acbe98d",
  "version": 19,
  "memory_type": "entities"
}
-->