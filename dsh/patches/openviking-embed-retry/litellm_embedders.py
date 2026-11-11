# Copyright (c) 2026 Beijing Volcano Engine Technology Co., Ltd.
# SPDX-License-Identifier: AGPL-3.0
"""LiteLLM Embedder Implementation

Uses litellm to provide a unified embedding interface across many providers
(OpenRouter, Ollama, vLLM, and any OpenAI-compatible endpoint).
"""

import os
from typing import Any, Dict, List, Optional

import litellm

# litellm's module-level async client is backed by a loop-bound aiohttp session.
# OpenViking drives embedding from short-lived worker event loops, so that session
# gets garbage-collected on a different loop and raises
# "Task ... got Future ... attached to a different loop". httpx has no such binding.
os.environ.setdefault("DISABLE_AIOHTTP_TRANSPORT", "True")
litellm.disable_aiohttp_transport = True

from openviking.models.embedder.base import DenseEmbedderBase, EmbedResult
from openviking.models.model_error import model_error_boundary
from openviking.telemetry import get_current_telemetry
from openviking_cli.utils import get_logger

logger = get_logger(__name__)


class LiteLLMDenseEmbedder(DenseEmbedderBase):
    """LiteLLM Dense Embedder Implementation

    Routes embedding requests through litellm, supporting dozens of providers
    via a unified interface. Model names use litellm's provider/model format
    (e.g., "openai/text-embedding-3-small", "ollama/nomic-embed-text").

    Example:
        >>> # OpenRouter embeddings
        >>> embedder = LiteLLMDenseEmbedder(
        ...     model_name="openai/text-embedding-3-small",
        ...     api_key="sk-or-...",
        ...     api_base="https://openrouter.ai/api/v1",
        ...     dimension=1536,
        ... )
        >>> result = embedder.embed("Hello world")

        >>> # Local Ollama embeddings
        >>> embedder = LiteLLMDenseEmbedder(
        ...     model_name="ollama/nomic-embed-text",
        ...     api_base="http://localhost:11434",
        ...     dimension=768,
        ... )
        >>> result = embedder.embed("Hello world")
    """

    def __init__(
        self,
        model_name: str,
        api_key: Optional[str] = None,
        api_base: Optional[str] = None,
        dimension: Optional[int] = None,
        query_param: Optional[str] = None,
        document_param: Optional[str] = None,
        extra_headers: Optional[Dict[str, str]] = None,
        config: Optional[Dict[str, Any]] = None,
    ):
        """Initialize LiteLLM Dense Embedder

        Args:
            model_name: Model name in litellm format (e.g., "openai/text-embedding-3-small").
            api_key: API key for the provider. Falls back to provider-specific env vars.
            api_base: Custom API base URL (e.g., "https://openrouter.ai/api/v1").
            dimension: Embedding vector dimension (required).
            query_param: Parameter value for query-side embeddings (non-symmetric mode).
            document_param: Parameter value for document-side embeddings (non-symmetric mode).
            extra_headers: Extra HTTP headers for API requests.
            config: Additional configuration dict.
        """
        super().__init__(model_name, config)
        self.provider = "litellm"

        os.environ.setdefault("LITELLM_LOCAL_MODEL_COST_MAP", "True")

        self.api_key = api_key
        self.api_base = api_base
        self.dimension = dimension
        self.query_param = query_param
        self.document_param = document_param
        self.extra_headers = extra_headers

        if dimension is None:
            raise ValueError(
                "LiteLLM embedding provider requires 'dimension' to be set explicitly. "
                "Check your embedding model's documentation for the correct dimension."
            )
        self._dimension = dimension

    def _truncate_vector(self, vector: List[float]) -> List[float]:
        """Truncate vector to target dimension if needed.

        Args:
            vector: Input vector from API

        Returns:
            Truncated vector if dimension is set and smaller than input, otherwise original vector
        """
        if self.dimension is not None and len(vector) > self.dimension:
            return vector[: self.dimension]
        return vector

    def _build_kwargs(self, is_query: bool = False) -> Dict[str, Any]:
        """Build kwargs dict for litellm.embedding() call."""
        kwargs: Dict[str, Any] = {"model": self.model_name, "num_retries": 0}

        if self.api_key:
            kwargs["api_key"] = self.api_key
        if self.api_base:
            kwargs["api_base"] = self.api_base
        if self.extra_headers:
            kwargs["extra_headers"] = self.extra_headers
        # Don't pass dimensions parameter to API - some models don't support it
        # (e.g., Qwen3-Embedding-4B doesn't support matryoshka representation)
        # Instead, we'll truncate the result vector if needed

        # Non-symmetric embedding support
        active_param = None
        if is_query and self.query_param is not None:
            active_param = self.query_param
        elif not is_query and self.document_param is not None:
            active_param = self.document_param

        if active_param:
            if "=" in active_param:
                # Parse key=value format (e.g., "input_type=query,task=search")
                extra_body = {}
                for part in active_param.split(","):
                    part = part.strip()
                    if "=" in part:
                        key, value = part.split("=", 1)
                        extra_body[key.strip()] = value.strip()
                if extra_body:
                    kwargs["extra_body"] = extra_body
            else:
                kwargs["input_type"] = active_param

        return kwargs

    def _update_telemetry_token_usage(self, response) -> None:
        """Update telemetry and token usage from response."""
        usage = getattr(response, "usage", None)
        if not usage:
            return

        def _usage_value(key: str, default: int = 0) -> int:
            if isinstance(usage, dict):
                return int(usage.get(key, default) or default)
            return int(getattr(usage, key, default) or default)

        prompt_tokens = _usage_value("prompt_tokens", 0)
        total_tokens = _usage_value("total_tokens", prompt_tokens)
        output_tokens = max(total_tokens - prompt_tokens, 0)

        # Update telemetry
        get_current_telemetry().add_token_usage_by_source(
            "embedding",
            prompt_tokens,
            output_tokens,
        )

        # Update token usage tracker
        self.update_token_usage(
            model_name=self.model_name,
            provider="litellm",
            prompt_tokens=prompt_tokens,
            completion_tokens=output_tokens,
        )

    @model_error_boundary
    def embed(self, text: str, is_query: bool = False) -> EmbedResult:
        """Perform dense embedding on text via litellm.

        Args:
            text: Input text
            is_query: Flag to indicate if this is a query embedding

        Returns:
            EmbedResult: Result containing dense_vector

        Raises:
            RuntimeError: When embedding call fails
        """

        def _call() -> EmbedResult:
            kwargs = self._build_kwargs(is_query=is_query)
            kwargs["input"] = [text]
            response = litellm.embedding(**kwargs)
            self._update_telemetry_token_usage(response)
            vector = response.data[0]["embedding"]
            # Truncate vector if needed
            vector = self._truncate_vector(vector)
            return EmbedResult(dense_vector=vector)

        try:
            return self._run_once(
                _call,
                logger=logger,
                operation_name="LiteLLM embedding",
            )
        except Exception as e:
            raise RuntimeError(f"LiteLLM embedding failed: {e}") from e

    @staticmethod
    def _is_stale_client_error(exc: BaseException) -> bool:
        """True when httpx was asked to send on a client that was already closed."""
        cur: Optional[BaseException] = exc
        seen: set[int] = set()
        while cur is not None and id(cur) not in seen:
            seen.add(id(cur))
            # LiteLLM wraps the httpx RuntimeError in APIConnectionError, so the
            # closed-client text may sit on a non-RuntimeError in the chain.
            if "client has been closed" in str(cur):
                return True
            nxt = cur.__cause__ or cur.__context__
            cur = nxt if nxt is not cur else None
        return False

    @staticmethod
    def _is_transient_ollama_error(exc: BaseException) -> bool:
        """True when Ollama dropped the socket but a single retry can succeed."""
        cur: Optional[BaseException] = exc
        seen: set[int] = set()
        while cur is not None and id(cur) not in seen:
            seen.add(id(cur))
            msg = str(cur).lower()
            if "server disconnected" in msg or "ollamaexception" in msg:
                return True
            nxt = cur.__cause__ or cur.__context__
            cur = nxt if nxt is not cur else None
        return False

    @staticmethod
    def _drop_cached_async_client() -> None:
        """Drop litellm's module client and the httpx handler cache that still holds it.

        Deleting only ``module_level_aclient`` is not enough: the next lookup goes
        through ``get_async_httpx_client`` and returns the same closed handler until
        its one-hour cache entry expires.
        """
        try:
            delattr(litellm, "module_level_aclient")
        except Exception:
            pass
        cache = getattr(litellm, "in_memory_llm_clients_cache", None)
        flush = getattr(cache, "flush_cache", None)
        if callable(flush):
            try:
                flush()
            except Exception:
                pass

    @model_error_boundary
    async def embed_async(self, text: str, is_query: bool = False) -> EmbedResult:
        async def _call() -> EmbedResult:
            kwargs = self._build_kwargs(is_query=is_query)
            kwargs["input"] = [text]
            try:
                response = await litellm.aembedding(**kwargs)
            except Exception as exc:
                if self._is_stale_client_error(exc):
                    logger.warning(
                        "LiteLLM async client was already closed; dropping the cached "
                        "handler and retrying the embedding once"
                    )
                    self._drop_cached_async_client()
                    response = await litellm.aembedding(**kwargs)
                elif self._is_transient_ollama_error(exc):
                    logger.warning(
                        "Ollama embedding disconnected; retrying the embedding once"
                    )
                    response = await litellm.aembedding(**kwargs)
                else:
                    raise
            self._update_telemetry_token_usage(response)
            vector = response.data[0]["embedding"]
            vector = self._truncate_vector(vector)
            return EmbedResult(dense_vector=vector)

        try:
            return await self._run_once_async(
                _call,
                is_query=is_query,
                logger=logger,
                operation_name="LiteLLM async embedding",
            )
        except Exception as e:
            raise RuntimeError(f"LiteLLM embedding failed: {e}") from e

    def get_dimension(self) -> int:
        """Get embedding dimension.

        Returns:
            int: Vector dimension
        """
        return self._dimension
