"""Safe arithmetic evaluation for calculator tool."""

import ast
import operator
from typing import Any

_ALLOWED_BINOPS = {
    ast.Add: operator.add,
    ast.Sub: operator.sub,
    ast.Mult: operator.mul,
    ast.Div: operator.truediv,
    ast.FloorDiv: operator.floordiv,
    ast.Mod: operator.mod,
    ast.Pow: operator.pow,
}
_ALLOWED_UNARYOPS = {
    ast.UAdd: operator.pos,
    ast.USub: operator.neg,
}


def safe_evaluate(expression: str) -> float:
    """Evaluate a simple math expression without using eval()."""
    cleaned = expression.strip().replace("^", "**")
    if not cleaned:
        raise ValueError("Expression is empty")

    node = ast.parse(cleaned, mode="eval")

    def _eval(n: ast.AST) -> Any:
        if isinstance(n, ast.Expression):
            return _eval(n.body)
        if isinstance(n, ast.Constant) and isinstance(n.value, (int, float)):
            return n.value
        if isinstance(n, ast.UnaryOp) and type(n.op) in _ALLOWED_UNARYOPS:
            return _ALLOWED_UNARYOPS[type(n.op)](_eval(n.operand))
        if isinstance(n, ast.BinOp) and type(n.op) in _ALLOWED_BINOPS:
            return _ALLOWED_BINOPS[type(n.op)](_eval(n.left), _eval(n.right))
        raise ValueError(f"Unsupported expression: {expression}")

    result = _eval(node)
    if not isinstance(result, (int, float)):
        raise ValueError("Expression did not evaluate to a number")
    return float(result)
