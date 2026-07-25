from pathlib import Path

from app.config import CONFIG_DIR, REPO_ROOT, resolve_env_files


def test_resolve_env_files_prefers_config(tmp_path, monkeypatch):
    from app import config as config_module

    config_dir = tmp_path / "config"
    config_dir.mkdir()
    config_env = config_dir / ".env"
    root_env = tmp_path / ".env"
    config_env.write_text("OPENAI_API_KEY=from-config\n", encoding="utf-8")
    root_env.write_text("OPENAI_API_KEY=from-root\n", encoding="utf-8")

    monkeypatch.setattr(config_module, "CONFIG_DIR", config_dir)
    monkeypatch.setattr(config_module, "REPO_ROOT", tmp_path)

    assert config_module.resolve_env_files() == (config_env,)


def test_resolve_env_files_falls_back_to_root(tmp_path, monkeypatch):
    from app import config as config_module

    root_env = tmp_path / ".env"
    root_env.write_text("OPENAI_API_KEY=from-root\n", encoding="utf-8")
    config_dir = tmp_path / "config"
    config_dir.mkdir()

    monkeypatch.setattr(config_module, "CONFIG_DIR", config_dir)
    monkeypatch.setattr(config_module, "REPO_ROOT", tmp_path)

    assert config_module.resolve_env_files() == (root_env,)


def test_resolve_env_files_defaults_to_config_path(tmp_path, monkeypatch):
    from app import config as config_module

    config_dir = tmp_path / "config"
    config_dir.mkdir()

    monkeypatch.setattr(config_module, "CONFIG_DIR", config_dir)
    monkeypatch.setattr(config_module, "REPO_ROOT", tmp_path)

    assert config_module.resolve_env_files() == (config_dir / ".env",)


def test_config_dir_is_under_repo_root():
    assert CONFIG_DIR == REPO_ROOT / "config"
    assert isinstance(CONFIG_DIR, Path)
    assert resolve_env_files()  # non-empty tuple at import time
