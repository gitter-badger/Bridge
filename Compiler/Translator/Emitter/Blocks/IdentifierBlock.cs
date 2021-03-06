using Bridge.Contract;
using ICSharpCode.NRefactory.CSharp;
using ICSharpCode.NRefactory.Semantics;
using ICSharpCode.NRefactory.TypeSystem;
using ICSharpCode.NRefactory.TypeSystem.Implementation;
using System.Text;

namespace Bridge.Translator
{
    public class IdentifierBlock : ConversionBlock
    {
        private bool isRefArg;

        public IdentifierBlock(IEmitter emitter, IdentifierExpression identifierExpression)
            : base(emitter, identifierExpression)
        {
            this.Emitter = emitter;
            this.IdentifierExpression = identifierExpression;
        }

        public IdentifierExpression IdentifierExpression
        {
            get;
            set;
        }

        protected override Expression GetExpression()
        {
            return this.IdentifierExpression;
        }

        protected override void EmitConversionExpression()
        {
            this.VisitIdentifierExpression();
        }

        protected void VisitIdentifierExpression()
        {
            IdentifierExpression identifierExpression = this.IdentifierExpression;
            int pos = this.Emitter.Output.Length;
            ResolveResult resolveResult = null;
            this.isRefArg = this.Emitter.IsRefArg;
            this.Emitter.IsRefArg = false;

            resolveResult = this.Emitter.Resolver.ResolveNode(identifierExpression, this.Emitter);

            var id = identifierExpression.Identifier;

            var isResolved = resolveResult != null && !(resolveResult is ErrorResolveResult);
            var memberResult = resolveResult as MemberResolveResult;

            if (this.Emitter.Locals != null && this.Emitter.Locals.ContainsKey(id) && resolveResult is LocalResolveResult)
            {
                if (this.Emitter.LocalsMap != null && this.Emitter.LocalsMap.ContainsKey(id) && !(identifierExpression.Parent is DirectionExpression))
                {
                    this.Write(this.Emitter.LocalsMap[id]);
                }
                else if (this.Emitter.LocalsNamesMap != null && this.Emitter.LocalsNamesMap.ContainsKey(id))
                {
                    this.Write(this.Emitter.LocalsNamesMap[id]);
                }
                else
                {
                    this.Write(id);
                }

                Helpers.CheckValueTypeClone(resolveResult, identifierExpression, this, pos);

                return;
            }

            if (resolveResult is TypeResolveResult)
            {
                this.Write(BridgeTypes.ToJsName(resolveResult.Type, this.Emitter));
                /*if (this.Emitter.Validator.IsIgnoreType(resolveResult.Type.GetDefinition()) || resolveResult.Type.Kind == TypeKind.Enum)
                {
                    this.Write(BridgeTypes.ToJsName(resolveResult.Type, this.Emitter));
                }
                else
                {
                    this.Write("Bridge.get(" + BridgeTypes.ToJsName(resolveResult.Type, this.Emitter) + ")");
                }*/
                
                return;
            }

            string inlineCode = memberResult != null ? this.Emitter.GetInline(memberResult.Member) : null;
            bool hasInline = !string.IsNullOrEmpty(inlineCode);
            bool hasThis = hasInline && inlineCode.Contains("{this}");

            if (hasInline && inlineCode.StartsWith("<self>"))
            {
                hasThis = true;
                inlineCode = inlineCode.Substring(6);
            }

            if (hasThis)
            {
                this.Write("");
                var oldBuilder = this.Emitter.Output;
                this.Emitter.Output = new StringBuilder();

                if (memberResult.Member.IsStatic)
                {
                    this.Write(BridgeTypes.ToJsName(memberResult.Member.DeclaringType, this.Emitter));
                    /*if (!this.Emitter.Validator.IsIgnoreType(memberResult.Member.DeclaringTypeDefinition) && memberResult.Member.DeclaringTypeDefinition.Kind != TypeKind.Enum)
                    {
                        this.Write("(Bridge.get(" + BridgeTypes.ToJsName(memberResult.Member.DeclaringType, this.Emitter) + "))");
                    }
                    else
                    {
                        this.Write(BridgeTypes.ToJsName(memberResult.Member.DeclaringType, this.Emitter));
                    }*/
                }
                else
                {
                    this.WriteThis();
                }

                var thisArg = this.Emitter.Output.ToString();
                inlineCode = inlineCode.Replace("{this}", thisArg);
                this.Emitter.Output = oldBuilder;

                if (resolveResult is InvocationResolveResult)
                {
                    this.PushWriter(inlineCode, null, thisArg);
                }
                else
                {
                    this.Write(inlineCode);
                }

                return;
            }

            if (hasInline && memberResult.Member.IsStatic)
            {
                if (resolveResult is InvocationResolveResult)
                {
                    this.PushWriter(inlineCode);
                }
                else
                {
                    this.Write(inlineCode);
                }

                return;
            }

            string appendAdditionalCode = null;
            if (memberResult != null &&
                        memberResult.Member is IMethod &&
                        !(memberResult is InvocationResolveResult) &&
                        !(
                        identifierExpression.Parent is InvocationExpression &&
                        identifierExpression.NextSibling != null &&
                        identifierExpression.NextSibling.Role is TokenRole &&
                        ((TokenRole)identifierExpression.NextSibling.Role).Token == "("
                        )
                )
            {
                var resolvedMethod = (IMethod)memberResult.Member;
                bool isStatic = resolvedMethod != null && resolvedMethod.IsStatic;

                if (!isStatic)
                {
                    var isExtensionMethod = resolvedMethod.IsExtensionMethod;
                    this.Write(Bridge.Translator.Emitter.ROOT + "." + (isExtensionMethod ? Bridge.Translator.Emitter.DELEGATE_BIND_SCOPE : Bridge.Translator.Emitter.DELEGATE_BIND) + "(");
                    this.WriteThis();
                    this.Write(", ");
                    appendAdditionalCode = ")";
                }
            }

            if (memberResult != null && memberResult.Member.SymbolKind == SymbolKind.Field && this.Emitter.IsMemberConst(memberResult.Member) && this.Emitter.IsInlineConst(memberResult.Member))
            {
                this.WriteScript(memberResult.ConstantValue);
                return;
            }
            
            if (memberResult != null && memberResult.Member.SymbolKind == SymbolKind.Property && memberResult.TargetResult.Type.Kind != TypeKind.Anonymous)
            {
                bool isStatement = false;
                string valueVar = null;

                if (this.Emitter.IsUnaryAccessor)
                {
                    isStatement = identifierExpression.Parent is UnaryOperatorExpression && identifierExpression.Parent.Parent is ExpressionStatement;

                    if (NullableType.IsNullable(memberResult.Type))
                    {
                        isStatement = false;
                    }

                    if (!isStatement)
                    {
                        this.WriteOpenParentheses();

                        valueVar = this.GetTempVarName();

                        this.Write(valueVar);
                        this.Write(" = ");
                    }
                }

                this.WriteTarget(memberResult);

                if (!string.IsNullOrWhiteSpace(inlineCode))
                {
                    //this.Write(inlineCode);
                    if (resolveResult is InvocationResolveResult || (memberResult.Member.SymbolKind == SymbolKind.Property && this.Emitter.IsAssignment))
                    {
                        this.PushWriter(inlineCode);
                    }
                    else
                    {
                        this.Write(inlineCode);
                    }
                }
                else if (Helpers.IsFieldProperty(memberResult.Member, this.Emitter))
                {
                    this.Write(Helpers.GetPropertyRef(memberResult.Member, this.Emitter));
                }
                else if (!this.Emitter.IsAssignment)
                {
                    if (this.Emitter.IsUnaryAccessor)
                    {
                        bool isDecimal = Helpers.IsDecimalType(memberResult.Member.ReturnType, this.Emitter.Resolver);
                        bool isLong = Helpers.Is64Type(memberResult.Member.ReturnType, this.Emitter.Resolver);
                        bool isNullable = NullableType.IsNullable(memberResult.Member.ReturnType);
                        if (isStatement)
                        {
                            this.Write(Helpers.GetPropertyRef(memberResult.Member, this.Emitter, true));
                            this.WriteOpenParentheses();

                            if (isDecimal || isLong)
                            {
                                if (isNullable)
                                {
                                    this.Write("Bridge.Nullable.lift1");
                                    this.WriteOpenParentheses();
                                    if (this.Emitter.UnaryOperatorType == UnaryOperatorType.Increment ||
                                        this.Emitter.UnaryOperatorType == UnaryOperatorType.PostIncrement)
                                    {
                                        this.WriteScript("inc");
                                    }
                                    else
                                    {
                                        this.WriteScript("dec");
                                    }

                                    this.WriteComma();

                                    this.WriteTarget(memberResult);

                                    this.Write(Helpers.GetPropertyRef(memberResult.Member, this.Emitter, false));
                                    this.WriteOpenParentheses();
                                    this.WriteCloseParentheses();
                                    this.WriteCloseParentheses();
                                }
                                else
                                {
                                    this.WriteTarget(memberResult);
                                    this.Write(Helpers.GetPropertyRef(memberResult.Member, this.Emitter, false));
                                    this.WriteOpenParentheses();
                                    this.WriteCloseParentheses();
                                    this.WriteDot();

                                    if (this.Emitter.UnaryOperatorType == UnaryOperatorType.Increment ||
                                        this.Emitter.UnaryOperatorType == UnaryOperatorType.PostIncrement)
                                    {
                                        this.Write("inc");
                                    }
                                    else
                                    {
                                        this.Write("dec");
                                    }

                                    this.WriteOpenParentheses();
                                    this.WriteCloseParentheses();
                                }
                            }
                            else
                            {
                                this.WriteTarget(memberResult);

                                this.Write(Helpers.GetPropertyRef(memberResult.Member, this.Emitter, false));
                                this.WriteOpenParentheses();
                                this.WriteCloseParentheses();

                                if (this.Emitter.UnaryOperatorType == UnaryOperatorType.Increment || this.Emitter.UnaryOperatorType == UnaryOperatorType.PostIncrement)
                                {
                                    this.Write("+");
                                }
                                else
                                {
                                    this.Write("-");
                                }

                                this.Write("1");
                            }

                            this.WriteCloseParentheses();
                        }
                        else
                        {
                            this.Write(Helpers.GetPropertyRef(memberResult.Member, this.Emitter, false));
                            this.WriteOpenParentheses();
                            this.WriteCloseParentheses();
                            this.WriteComma();

                            this.WriteTarget(memberResult);
                            this.Write(Helpers.GetPropertyRef(memberResult.Member, this.Emitter, true));
                            this.WriteOpenParentheses();

                            if (isDecimal || isLong)
                            {
                                if (isNullable)
                                {
                                    this.Write("Bridge.Nullable.lift1");
                                    this.WriteOpenParentheses();
                                    if (this.Emitter.UnaryOperatorType == UnaryOperatorType.Increment ||
                                        this.Emitter.UnaryOperatorType == UnaryOperatorType.PostIncrement)
                                    {
                                        this.WriteScript("inc");
                                    }
                                    else
                                    {
                                        this.WriteScript("dec");
                                    }

                                    this.WriteComma();
                                    this.Write(valueVar);
                                    this.WriteCloseParentheses();
                                }
                                else
                                {
                                    this.Write(valueVar);

                                    this.WriteDot();

                                    if (this.Emitter.UnaryOperatorType == UnaryOperatorType.Increment ||
                                        this.Emitter.UnaryOperatorType == UnaryOperatorType.PostIncrement)
                                    {
                                        this.Write("inc");
                                    }
                                    else
                                    {
                                        this.Write("dec");
                                    }

                                    this.WriteOpenParentheses();
                                    this.WriteCloseParentheses();
                                }
                            }
                            else
                            {
                                this.Write(valueVar);

                                if (this.Emitter.UnaryOperatorType == UnaryOperatorType.Increment || this.Emitter.UnaryOperatorType == UnaryOperatorType.PostIncrement)
                                {
                                    this.Write("+");
                                }
                                else
                                {
                                    this.Write("-");
                                }

                                this.Write("1");
                            }

                            this.WriteCloseParentheses();
                            this.WriteComma();

                            if (this.Emitter.UnaryOperatorType == UnaryOperatorType.Increment ||
                                this.Emitter.UnaryOperatorType == UnaryOperatorType.Decrement)
                            {
                                this.WriteTarget(memberResult);
                                this.Write(Helpers.GetPropertyRef(memberResult.Member, this.Emitter, false));
                                this.WriteOpenParentheses();
                                this.WriteCloseParentheses();
                            }
                            else
                            {
                                this.Write(valueVar);
                            }

                            this.WriteCloseParentheses();

                            if (valueVar != null)
                            {
                                this.RemoveTempVar(valueVar);
                            }
                        }
                    }
                    else
                    {
                        this.Write(Helpers.GetPropertyRef(memberResult.Member, this.Emitter));
                        this.WriteOpenParentheses();
                        this.WriteCloseParentheses();
                    }
                }
                else if (this.Emitter.AssignmentType != AssignmentOperatorType.Assign)
                {
                    string trg;

                    if (memberResult.Member.IsStatic)
                    {
                        trg = BridgeTypes.ToJsName(memberResult.Member.DeclaringType, this.Emitter);
                    }
                    else
                    {
                        trg = "this";
                    }

                    this.PushWriter(string.Concat(Helpers.GetPropertyRef(memberResult.Member, this.Emitter, true),
                        "(",
                        trg,
                        ".",
                        Helpers.GetPropertyRef(memberResult.Member, this.Emitter, false),
                        "()",
                        "{0})"));
                }
                else
                {
                    this.PushWriter(Helpers.GetPropertyRef(memberResult.Member, this.Emitter, true) + "({0})");
                }
            }
            else if (memberResult != null && memberResult.Member is DefaultResolvedEvent)
            {
                if (this.Emitter.IsAssignment &&
                    (this.Emitter.AssignmentType == AssignmentOperatorType.Add ||
                     this.Emitter.AssignmentType == AssignmentOperatorType.Subtract))
                {
                    this.WriteTarget(memberResult);

                    if (!string.IsNullOrWhiteSpace(inlineCode))
                    {
                        this.Write(inlineCode);
                    }
                    else
                    {
                        this.Write(this.Emitter.AssignmentType == AssignmentOperatorType.Add ? "add" : "remove");
                        this.Write(
                            OverloadsCollection.Create(this.Emitter, memberResult.Member,
                                this.Emitter.AssignmentType == AssignmentOperatorType.Subtract).GetOverloadName());
                    }

                    this.WriteOpenParentheses();
                }
                else
                {
                    this.WriteTarget(memberResult);
                    this.Write(this.Emitter.GetEntityName(memberResult.Member, true));
                }
            }
            else
            {
                if (!string.IsNullOrWhiteSpace(inlineCode))
                {
                    this.Write(inlineCode);
                }
                else if (isResolved)
                {
                    if (resolveResult is TypeResolveResult)
                    {
                        var typeResolveResult = (TypeResolveResult)resolveResult;

                        var isNative = this.Emitter.Validator.IsIgnoreType(typeResolveResult.Type.GetDefinition());
                        this.Write(BridgeTypes.ToJsName(typeResolveResult.Type, this.Emitter));
                        /*if (!isNative)
                        {
                            this.Write("Bridge.get(" + BridgeTypes.ToJsName(typeResolveResult.Type, this.Emitter));
                        }
                        else
                        {
                            this.Write(BridgeTypes.ToJsName(typeResolveResult.Type, this.Emitter));
                        }*/
                        

                        if (typeResolveResult.Type.TypeParameterCount > 0)
                        {
                            this.WriteOpenParentheses();
                            new TypeExpressionListBlock(this.Emitter, this.IdentifierExpression.TypeArguments).Emit();
                            this.WriteCloseParentheses();
                        }

                        if (!isNative)
                        {
                            this.Write(")");
                        }                        
                    }
                    else if (resolveResult is LocalResolveResult)
                    {
                        var localResolveResult = (LocalResolveResult)resolveResult;
                        this.Write(localResolveResult.Variable.Name);
                    }
                    else if (memberResult != null)
                    {
                        this.WriteTarget(memberResult);
                        string name = OverloadsCollection.Create(this.Emitter, memberResult.Member).GetOverloadName();
                        if (isRefArg)
                        {
                            this.WriteScript(name);
                        }
                        else
                        {
                            this.Write(name);
                        }
                    }
                    else
                    {
                        this.Write(resolveResult.ToString());
                    }
                }
                else
                {
                    throw new EmitterException(identifierExpression, "Cannot resolve identifier: " + id);
                }
            }

            if (appendAdditionalCode != null)
            {
                this.Write(appendAdditionalCode);
            }

            Helpers.CheckValueTypeClone(resolveResult, identifierExpression, this, pos);
        }

        protected void WriteTarget(MemberResolveResult memberResult)
        {            
            if (memberResult.Member.IsStatic)
            {
                this.Write(BridgeTypes.ToJsName(memberResult.Member.DeclaringType, this.Emitter));
                /*if (!this.Emitter.Validator.IsIgnoreType(memberResult.Member.DeclaringTypeDefinition) && memberResult.Member.DeclaringTypeDefinition.Kind != TypeKind.Enum)
                {
                    this.Write("Bridge.get(" + BridgeTypes.ToJsName(memberResult.Member.DeclaringType, this.Emitter) + ")");
                }
                else
                {
                    this.Write(BridgeTypes.ToJsName(memberResult.Member.DeclaringType, this.Emitter));
                }*/
            }
            else
            {
                this.WriteThis();
            }

            if (this.isRefArg)
            {
                this.WriteComma();
            }
            else
            {
                this.WriteDot();    
            }
            
        }
    }
}
