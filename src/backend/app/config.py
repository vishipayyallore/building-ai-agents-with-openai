from pathlib import Path

from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

REPO_ROOT = Path(__file__).resolve().parents[3]
CONFIG_DIR = REPO_ROOT / "config"
MCP_SERVER_DIR = REPO_ROOT / "src" / "mcp-server"


def resolve_env_files() -> tuple[Path, ...]:
    """Prefer ``config/.env``; fall back to legacy repo-root ``.env``."""
    config_env = CONFIG_DIR / ".env"
    root_env = REPO_ROOT / ".env"
    if config_env.is_file():
        return (config_env,)
    if root_env.is_file():
        return (root_env,)
    # Expected path when neither file exists yet (pydantic ignores missing files).
    return (config_env,)


ENV_FILES = resolve_env_files()

# Load all keys into os.environ so MCP stdio children (e.g. weather) see them.
for _env_path in ENV_FILES:
    if _env_path.is_file():
        load_dotenv(_env_path, override=False)


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=ENV_FILES,
        env_file_encoding="utf-8",
        extra="ignore",
    )

    openai_api_key: str = ""
    openai_model: str = "gpt-4.1-mini"
    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"
    mcp_server_dir: Path = MCP_SERVER_DIR

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
