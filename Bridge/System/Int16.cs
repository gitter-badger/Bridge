using Bridge;

namespace System
{
    [External]
    [Name("Bridge.Int16")]
    [Constructor("Number")]
    public struct Int16 : IComparable, IComparable<Int16>, IEquatable<Int16>, IFormattable
    {
        private Int16(int i)
        {
        }

        [InlineConst]
        public const short MinValue = -32768;

        [InlineConst]
        public const short MaxValue = 32767;

        [Template("Bridge.Int16.parse({s})")]
        public static short Parse(string s)
        {
            return 0;
        }

        [Template("Bridge.Int16.parse({s}, {radix})")]
        public static short Parse(string s, int radix)
        {
            return 0;
        }

        [Template("Bridge.Int16.tryParse({s}, {result})")]
        public static bool TryParse(string s, out short result)
        {
            result = 0;
            return false;
        }

        [Template("Bridge.Int16.tryParse({s}, {result}, {radix})")]
        public static bool TryParse(string s, out short result, int radix)
        {
            result = 0;
            return false;
        }

        public string ToString(int radix)
        {
            return null;
        }

        [Template("Bridge.Int16.format({this}, {format})")]
        public string Format(string format)
        {
            return null;
        }

        [Template("Bridge.Int16.format({this}, {format}, {provider})")]
        public string Format(string format, IFormatProvider provider)
        {
            return null;
        }

        [Template("Bridge.Int16.format({this}, {format})")]
        public string ToString(string format)
        {
            return null;
        }

        [Template("Bridge.Int16.format({this}, {format}, {provider})")]
        public string ToString(string format, IFormatProvider provider)
        {
            return null;
        }

        [Template("Bridge.compare({this}, {other})")]
        public int CompareTo(short other)
        {
            return 0;
        }

        [Template("Bridge.compare({this}, {obj})")]
        public int CompareTo(object obj)
        {
            return 0;
        }

        [Template("{this} === {other}")]
        public bool Equals(short other)
        {
            return false;
        }
    }
}