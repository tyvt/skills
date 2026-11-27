- When console output mangles Chinese text because of codepage issues, dump readable UTF-8 text to a cache file and read it with the UTF-8 file tool instead of relying on console rendering.
- When shell redirection corrupts Chinese output, write the file directly with Python using explicit UTF-8 encoding instead of relying on shell redirection.
- When a redirected output file contains non-UTF-8 bytes, read it with decoding errors ignored (`errors='ignore'`) to salvage readable content before regenerating a clean UTF-8 dump.
- When subprocess-captured output has encoding problems, correct the subprocess decoding parameters and rerun the batch.
- When output is truncated and omits a middle range, re-read that specific range before compiling verdicts.
- Treat capped sample-count fields (for example n_sample meaning at least N files) and generic tokens such as moduleName or nginx as non-evidence; dump the actual matched file paths for distinctive tokens and confirm they align with each memory's claimed files before judging.

<!-- MEMORY_FIELDS
{
  "user": "github.com-tyvt-skills",
  "topic": "audit_verification_tooling",
  "source_extraction_id": "6d74980a2a6c44099a2f02e2ecab23a0",
  "peer_id": "github.com-tyvt-skills",
  "version": 4,
  "memory_type": "preferences"
}
-->