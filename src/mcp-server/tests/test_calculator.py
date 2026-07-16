import pytest

from tools.calculator import safe_evaluate


@pytest.mark.parametrize(
    ("expr", "expected"),
    [
        ("15 * 23", 345.0),
        ("(10 + 5) / 3", 5.0),
        ("2 ** 8", 256.0),
    ],
)
def test_safe_evaluate(expr: str, expected: float):
    assert safe_evaluate(expr) == expected


def test_safe_evaluate_rejects_invalid():
    with pytest.raises(ValueError):
        safe_evaluate("__import__('os')")


def test_safe_evaluate_rejects_empty_expression():
    with pytest.raises(ValueError, match="empty"):
        safe_evaluate("   ")


def test_safe_evaluate_division_by_zero():
    with pytest.raises(ZeroDivisionError):
        safe_evaluate("10 / 0")
