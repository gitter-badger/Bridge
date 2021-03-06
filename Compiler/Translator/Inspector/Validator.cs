﻿using Bridge.Contract;
using Bridge.Translator.Constants;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using ICSharpCode.NRefactory.CSharp;
using ICSharpCode.NRefactory.CSharp.Resolver;
using ICSharpCode.NRefactory.Semantics;
using ICSharpCode.NRefactory.TypeSystem;
using ICSharpCode.NRefactory.TypeSystem.Implementation;
using Mono.Cecil;
using Object.Net.Utilities;
using ICustomAttributeProvider = Mono.Cecil.ICustomAttributeProvider;

namespace Bridge.Translator
{
    public class Validator : IValidator
    {
        public virtual bool CanIgnoreType(TypeDefinition type)
        {
            if (this.IsIgnoreType(type))
            {
                return true;
            }

            if (type.BaseType != null && type.BaseType.FullName == "System.MulticastDelegate")
            {
                return true;
            }

            return false;
        }

        public virtual void CheckType(TypeDefinition type, ITranslator translator)
        {
            if (this.CanIgnoreType(type) && !this.IsObjectLiteral(type))
            {
                return;
            }

            this.CheckConstructors(type, translator);
            this.CheckFields(type, translator);
            this.CheckMethods(type, translator);
            this.CheckProperties(type, translator);
            this.CheckFileName(type, translator);
            this.CheckModule(type, translator);
            this.CheckModuleDependenies(type, translator);
        }

        public virtual bool IsIgnoreType(ICustomAttributeProvider type, bool ignoreLiteral = false)
        {
            string ignoreAttr = Translator.Bridge_ASSEMBLY + ".IgnoreAttribute";
            string externalAttr = Translator.Bridge_ASSEMBLY + ".ExternalAttribute";
            string objectLiteralAttr = Translator.Bridge_ASSEMBLY + ".ObjectLiteralAttribute";

            return this.HasAttribute(type.CustomAttributes, ignoreAttr) || this.HasAttribute(type.CustomAttributes, externalAttr) || (!ignoreLiteral && this.HasAttribute(type.CustomAttributes, objectLiteralAttr));
        }

        public virtual bool IsIgnoreType(IEntity enity, bool ignoreLiteral = false)
        {
            string ignoreAttr = Translator.Bridge_ASSEMBLY + ".IgnoreAttribute";
            string externalAttr = Translator.Bridge_ASSEMBLY + ".ExternalAttribute";
            string objectLiteralAttr = Translator.Bridge_ASSEMBLY + ".ObjectLiteralAttribute";

            return this.HasAttribute(enity.Attributes, ignoreAttr)
                   || this.HasAttribute(enity.Attributes, externalAttr)
                   || (!ignoreLiteral && this.HasAttribute(enity.Attributes, objectLiteralAttr));
        }

        public virtual bool IsBridgeClass(TypeDefinition type)
        {
            foreach (var i in type.Interfaces)
            {
                if (i.FullName == "Bridge.IBridgeClass")
                {
                    return true;
                }
            }

            return false;
        }

        public virtual bool IsIgnoreType(ICSharpCode.NRefactory.TypeSystem.ITypeDefinition typeDefinition, bool ignoreLiteral = false)
        {
            string ignoreAttr = Translator.Bridge_ASSEMBLY + ".IgnoreAttribute";
            string externalAttr = Translator.Bridge_ASSEMBLY + ".ExternalAttribute";
            string objectLiteralAttr = Translator.Bridge_ASSEMBLY + ".ObjectLiteralAttribute";

            return typeDefinition.Attributes.Any(attr => attr.Constructor != null && ((attr.Constructor.DeclaringType.FullName == ignoreAttr) || (attr.Constructor.DeclaringType.FullName == externalAttr) || (!ignoreLiteral && attr.Constructor.DeclaringType.FullName == objectLiteralAttr)));
        }

        public virtual bool IsImmutableType(ICustomAttributeProvider type)
        {
            string attrName = Translator.Bridge_ASSEMBLY + ".ImmutableAttribute";

            return this.HasAttribute(type.CustomAttributes, attrName);
        }

        public virtual int EnumEmitMode(DefaultResolvedTypeDefinition type)
        {
            string enumAttr = Translator.Bridge_ASSEMBLY + ".EnumAttribute";
            int result = -1;
            type.Attributes.Any(attr =>
            {
                if (attr.Constructor != null && attr.Constructor.DeclaringType.FullName == enumAttr && attr.PositionalArguments.Count > 0)
                {
                    result = (int)attr.PositionalArguments.First().ConstantValue;
                    return true;
                }

                return false;
            });

            return result;
        }

        public virtual int EnumEmitMode(IType type)
        {
            string enumAttr = Translator.Bridge_ASSEMBLY + ".EnumAttribute";
            int result = -1;
            type.GetDefinition().Attributes.Any(attr =>
            {
                if (attr.Constructor != null && attr.Constructor.DeclaringType.FullName == enumAttr && attr.PositionalArguments.Count > 0)
                {
                    result = (int)attr.PositionalArguments.First().ConstantValue;
                    return true;
                }

                return false;
            });

            return result;
        }

        public virtual bool IsValueEnum(DefaultResolvedTypeDefinition type)
        {
            return this.EnumEmitMode(type) == 2;
        }

        public virtual bool IsNameEnum(DefaultResolvedTypeDefinition type)
        {
            var enumEmitMode = this.EnumEmitMode(type);
            return enumEmitMode == 1 || enumEmitMode > 6;
        }

        public virtual bool IsStringNameEnum(DefaultResolvedTypeDefinition type)
        {
            return this.EnumEmitMode(type) == 3;
        }

        public virtual bool HasAttribute(IEnumerable<CustomAttribute> attributes, string name)
        {
            return this.GetAttribute(attributes, name) != null;
        }

        public virtual bool HasAttribute(IEnumerable<ICSharpCode.NRefactory.TypeSystem.IAttribute> attributes, string name)
        {
            return this.GetAttribute(attributes, name) != null;
        }

        public virtual CustomAttribute GetAttribute(IEnumerable<CustomAttribute> attributes, string name)
        {
            CustomAttribute a = attributes
                .FirstOrDefault(attr => attr.AttributeType.FullName == name);
            return a;
        }

        public virtual ICSharpCode.NRefactory.TypeSystem.IAttribute GetAttribute(IEnumerable<ICSharpCode.NRefactory.TypeSystem.IAttribute> attributes, string name)
        {
            ICSharpCode.NRefactory.TypeSystem.IAttribute a = attributes
                .FirstOrDefault(attr => attr.AttributeType.FullName == name);
            return a;
        }

        public virtual string GetAttributeValue(IEnumerable<CustomAttribute> attributes, string name)
        {
            CustomAttribute a = this.GetAttribute(attributes, name);

            if (a != null)
            {
                return (string)a.ConstructorArguments[0].Value;
            }

            return null;
        }

        public virtual bool IsInlineMethod(MethodDefinition method)
        {
            var attr = this.GetAttribute(method.CustomAttributes, Translator.Bridge_ASSEMBLY + ".TemplateAttribute");

            return attr != null && !attr.HasConstructorArguments;
        }

        public virtual string GetInlineCode(MethodDefinition method)
        {
            return this.GetAttributeValue(method.CustomAttributes, Translator.Bridge_ASSEMBLY + ".TemplateAttribute");
        }

        public virtual string GetInlineCode(PropertyDefinition property)
        {
            return this.GetAttributeValue(property.CustomAttributes, Translator.Bridge_ASSEMBLY + ".TemplateAttribute");
        }

        public virtual bool IsObjectLiteral(TypeDefinition type)
        {
            return this.HasAttribute(type.CustomAttributes, Translator.Bridge_ASSEMBLY + ".ObjectLiteralAttribute");
        }

        public virtual bool IsObjectLiteral(ICSharpCode.NRefactory.TypeSystem.ITypeDefinition type)
        {
            return this.HasAttribute(type.Attributes, Translator.Bridge_ASSEMBLY + ".ObjectLiteralAttribute");
        }

        private Stack<TypeDefinition> _stack = new Stack<TypeDefinition>(); 
        public virtual string GetCustomTypeName(TypeDefinition type, IEmitter emitter)
        {
            if (this._stack.Contains(type))
            {
                return null;
            }

            var nsAtrr = this.GetAttribute(type.CustomAttributes, Translator.Bridge_ASSEMBLY + ".NamespaceAttribute");
            bool hasNs = nsAtrr != null && nsAtrr.ConstructorArguments.Count > 0;
            var nameAttr = this.GetAttribute(type.CustomAttributes, Translator.Bridge_ASSEMBLY + ".NameAttribute");

            string name = null;
            bool changeCase = false;
            if (nameAttr != null && nameAttr.ConstructorArguments.Count > 0)
            {
                if (nameAttr.ConstructorArguments[0].Value is string)
                {
                    name = (string)nameAttr.ConstructorArguments[0].Value;
                }
                else if (nameAttr.ConstructorArguments[0].Value is bool)
                {
                    var boolValue = (bool)nameAttr.ConstructorArguments[0].Value;

                    if (boolValue)
                    {
                        if (hasNs)
                        {
                            changeCase = true;
                        }
                        else
                        {
                            this._stack.Push(type);
                            name = BridgeTypes.ToJsName(type, emitter);
                            var i = name.LastIndexOf(".");

                            if (i > -1)
                            {
                                char[] chars = name.ToCharArray();
                                chars[i + 1] = Char.ToLowerInvariant(chars[i + 1]);
                                name = new string(chars);
                            }
                            else
                            {
                                name = name.ToLowerCamelCase();
                            }
                            this._stack.Pop();

                            return name;
                        }
                    }
                }
            }

            if (!string.IsNullOrEmpty(name))
            {
                return name;
            }
            
            if (hasNs)
            {
                var arg = nsAtrr.ConstructorArguments[0];
                name = "";
                if (arg.Value is string)
                {
                    name = arg.Value.ToString();
                }

                if (arg.Value is bool && ((bool) arg.Value))
                {
                    return null;
                }

                if (type.IsNested)
                {
                    name = (string.IsNullOrEmpty(name) ? "" : (name + ".")) + BridgeTypes.GetParentNames(type);
                }

                name = (string.IsNullOrEmpty(name) ? "" : (name + ".")) + BridgeTypes.ConvertName(changeCase ? type.Name.ToLowerCamelCase() : type.Name);

                return name;
            }

            if (this.HasAttribute(type.CustomAttributes, Translator.Bridge_ASSEMBLY + ".ObjectLiteralAttribute"))
            {
                return "Object";
            }

            return null;
        }

        public virtual string GetCustomConstructor(TypeDefinition type)
        {
            string ctor = this.GetAttributeValue(type.CustomAttributes, Translator.Bridge_ASSEMBLY + ".ConstructorAttribute");

            if (!string.IsNullOrEmpty(ctor))
            {
                return ctor;
            }

            if (this.HasAttribute(type.CustomAttributes, Translator.Bridge_ASSEMBLY + ".ObjectLiteralAttribute"))
            {
                return "{ }";
            }

            return null;
        }

        public virtual void CheckConstructors(TypeDefinition type, ITranslator translator)
        {
            if (type.HasMethods)
            {
                var ctors = type.Methods.Where(method => method.IsConstructor);

                foreach (MethodDefinition ctor in ctors)
                {
                    this.CheckMethodArguments(ctor);
                }
            }
        }

        public virtual void CheckFields(TypeDefinition type, ITranslator translator)
        {
            if (this.IsObjectLiteral(type) && type.HasFields)
            {
                foreach (FieldDefinition field in type.Fields)
                {
                    if (field.IsStatic)
                    {
                        Exception.Throw("ObjectLiteral type doesn't support static members: {0}", type);
                    }
                }
            }
        }

        public virtual void CheckProperties(TypeDefinition type, ITranslator translator)
        {
            if (this.IsObjectLiteral(type) && type.HasProperties)
            {
                foreach (PropertyDefinition prop in type.Properties)
                {
                    if ((prop.GetMethod != null && prop.GetMethod.IsStatic) || (prop.SetMethod != null && prop.SetMethod.IsStatic))
                    {
                        Exception.Throw("ObjectLiteral type doesn't support static members: {0}", type);
                    }
                }
            }
        }

        public virtual void CheckMethods(TypeDefinition type, ITranslator translator)
        {
            var methodsCount = 0;
            foreach (MethodDefinition method in type.Methods)
            {
                if (method.HasCustomAttributes && method.CustomAttributes.Any(a => a.AttributeType.FullName == "System.Runtime.CompilerServices.CompilerGeneratedAttribute"))
                {
                    continue;
                }

                this.CheckMethodArguments(method);

                if (!method.IsConstructor && !method.IsGetter && !method.IsSetter)
                {
                    methodsCount++;
                }
            }

            if (this.IsObjectLiteral(type) && methodsCount > 0)
            {
                Bridge.Translator.Exception.Throw("ObjectLiteral doesn't support methods: {0}", type);
            }
        }

        public virtual void CheckMethodArguments(MethodDefinition method)
        {
        }

        public virtual HashSet<string> GetParentTypes(IDictionary<string, TypeDefinition> allTypes)
        {
            var result = new HashSet<string>();

            foreach (var type in allTypes.Values)
            {
                if (type.BaseType != null)
                {
                    string parentName = type.BaseType.FullName.LeftOf('<').Replace("`", "$");

                    if (!allTypes.ContainsKey(parentName))
                    {
                        Bridge.Translator.Exception.Throw("Unknown type {0}", parentName);
                    }

                    if (!result.Contains(parentName))
                    {
                        result.Add(parentName);
                    }
                }
            }
            return result;
        }

        public virtual void CheckFileName(TypeDefinition type, ITranslator translator)
        {
            if (type.HasCustomAttributes)
            {
                var attr = this.GetAttribute(type.CustomAttributes, Translator.Bridge_ASSEMBLY + ".FileNameAttribute");

                if (attr != null)
                {
                    var typeInfo = this.EnsureTypeInfo(type, translator);

                    var obj = this.GetAttributeArgumentValue(attr, 0);

                    if (obj is string)
                    {
                        typeInfo.FileName = obj.ToString();
                    }
                }
            }
        }

        public virtual void CheckModule(TypeDefinition type, ITranslator translator)
        {
            if (type.HasCustomAttributes)
            {
                var attr = this.GetAttribute(type.CustomAttributes, Translator.Bridge_ASSEMBLY + ".ModuleAttribute");

                if (attr != null)
                {
                    var typeInfo = this.EnsureTypeInfo(type, translator);

                    if (attr.ConstructorArguments.Count > 0)
                    {
                        var obj = this.GetAttributeArgumentValue(attr, 0);
                        typeInfo.Module = obj is string ? obj.ToString() : "";
                    }
                    else
                    {
                        typeInfo.Module = "";
                    }
                }
            }
        }

        public virtual void CheckModuleDependenies(TypeDefinition type, ITranslator translator)
        {
            if (type.HasCustomAttributes)
            {
                var attr = this.GetAttribute(type.CustomAttributes, Translator.Bridge_ASSEMBLY + ".ModuleDependencyAttribute");

                if (attr != null)
                {
                    var typeInfo = this.EnsureTypeInfo(type, translator);

                    if (attr.ConstructorArguments.Count > 0)
                    {
                        ModuleDependency dependency = new ModuleDependency();
                        var obj = this.GetAttributeArgumentValue(attr, 0);
                        dependency.DependencyName = obj is string ? obj.ToString() : "";

                        if (attr.ConstructorArguments.Count > 1)
                        {
                            obj = this.GetAttributeArgumentValue(attr, 1);
                            dependency.VariableName = obj is string ? obj.ToString() : "";
                        }

                        typeInfo.Dependencies.Add(dependency);
                    }
                }
            }
        }

        protected virtual object GetAttributeArgumentValue(CustomAttribute attr, int index)
        {
            return attr.ConstructorArguments.Skip(0).Take(1).First().Value;
        }

        protected virtual ITypeInfo EnsureTypeInfo(TypeDefinition type, ITranslator translator)
        {
            string key = BridgeTypes.GetTypeDefinitionKey(type);
            ITypeInfo typeInfo = null;

            if (translator.TypeInfoDefinitions.ContainsKey(key))
            {
                typeInfo = translator.TypeInfoDefinitions[key];
            }
            else
            {
                typeInfo = new TypeInfo();
                translator.TypeInfoDefinitions[key] = typeInfo;
            }
            return typeInfo;
        }

        public virtual bool IsDelegateOrLambda(ResolveResult result)
        {
            return result.Type.Kind == ICSharpCode.NRefactory.TypeSystem.TypeKind.Delegate || result is LambdaResolveResult;
        }

        public virtual void CheckIdentifier(string name, AstNode context)
        {
            if (Helpers.IsReservedWord(name))
            {
                throw new EmitterException(context, "Cannot use '" + name + "' as identifier");
            }
        }

        public virtual bool IsAccessorsIndexer(IEntity entity)
        {
            if (entity == null)
            {
                return false;
            }

            if (this.HasAttribute(entity.Attributes, AttributeConstants.ACCESSORSINDEXER_ATTRIBUTE_NAME))
            {
                return true;
            }

            return false;
        }
    }
}
