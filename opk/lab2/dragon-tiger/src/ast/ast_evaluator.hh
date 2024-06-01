#ifndef AST_EVALUATOR_HH
#define AST_EVALUATOR_HH

#include "nodes.hh"
#include "../utils/errors.hh"

namespace ast {

  class ASTEvaluator : public ConstASTIntVisitor {
  public:
    ASTEvaluator() {}
    
    virtual int visit(const IntegerLiteral &);
    virtual int visit(const StringLiteral &);
    virtual int visit(const BinaryOperator &);
    virtual int visit(const Sequence &);
    virtual int visit(const IfThenElse &);

    int visit(const Let &) { utils::error("let declaration are not supported"); }
    int visit(const Identifier &) { utils::error("identifiers are not suppored"); }
    int visit(const VarDecl &) { utils::error("var declaration are not supported"); }
    int visit(const FunDecl &) { utils::error("function declaration are not supported"); }
    int visit(const FunCall &) { utils::error("function calls are not supported"); }
    int visit(const WhileLoop &) { utils::error("while loops are not supported"); }
    int visit(const ForLoop &) { utils::error("for loops are not supported"); }
    int visit(const Break &) { utils::error("break statements are not supported"); }
    int visit(const Assign &) { utils::error("assign statements are not supported"); }
  };

} // namespace ast

#endif // _AST_DUMPER_HH
