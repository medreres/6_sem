#include "ast_evaluator.hh"
#include "../utils/errors.hh"
#include <map>

namespace ast {

int ASTEvaluator::visit(const IntegerLiteral &literal) {
  return literal.value;
}

int ASTEvaluator::visit(const StringLiteral &literal) {
  utils::error("string literal can't be evaluated");
}

// Define the functions for each operation
int add(int a, int b) {
    return a + b;
}

int subtract(int a, int b) {
    return a - b;
}

int multiply(int a, int b) {
    return a * b;
}

int divide(int a, int b) {
  if (b != 0) {
      return a / b;
  } else {
    utils::error("division by zero");
  }
}

// Define the map with std::function for better flexibility
std::map<Operator, std::function<int(int, int)>> operation_to_function_map = {
  {o_plus, add},
  {o_minus, subtract},
  {o_times, multiply},
  {o_divide, divide},
};

// TODO handle floating point
int ASTEvaluator::visit(const BinaryOperator &binop) {
  int lhs = binop.get_left().accept(*this);
  int rhs = binop.get_right().accept(*this);

  // Find the operation in the map and handle unsupported operators
  auto op = operation_to_function_map.find(binop.op);
  if (op != operation_to_function_map.end()) {
    return op->second(lhs, rhs);
  } else {
    utils::error("unsupported binary operator");
  }
}

int ASTEvaluator::visit(const Sequence &seqExpr) {
  const auto& exprs = seqExpr.get_exprs();

  if (exprs.empty()) {
    utils::error("cannot evaluate empty sequence");
  }

  int result = 0;
  for (const auto& expr : exprs) {
    result = expr->accept(*this);
  }

  return result;
}

int ASTEvaluator::visit(const IfThenElse &ite) {
  auto condition_result = ite.get_condition().accept(*this);

  return condition_result ? ite.get_then_part().accept(*this) : ite.get_else_part().accept(*this);
}

} // namespace ast