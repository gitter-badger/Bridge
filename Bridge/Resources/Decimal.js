﻿    // @source Decimal.js

    /* decimal.js v5.0.7 https://github.com/MikeMcl/decimal.js/LICENCE */

    !function (n) { "use strict"; function e(n) { var e, i, t, r = n.length - 1, s = "", o = n[0]; if (r > 0) { for (s += o, e = 1; r > e; e++) t = n[e] + "", i = Sn - t.length, i && (s += l(i)), s += t; o = n[e], t = o + "", i = Sn - t.length, i && (s += l(i)) } else if (0 === o) return "0"; for (; o % 10 === 0;) o /= 10; return s + o } function i(n, e, i) { if (n !== ~~n || e > n || n > i) throw Error(yn + n) } function t(n, e, i, t) { var r, s, o, u; for (s = n[0]; s >= 10; s /= 10)--e; return --e < 0 ? (e += Sn, r = 0) : (r = Math.ceil((e + 1) / Sn), e %= Sn), s = qn(10, Sn - e), u = n[r] % s | 0, null == t ? 3 > e ? (0 == e ? u = u / 100 | 0 : 1 == e && (u = u / 10 | 0), o = 4 > i && 99999 == u || i > 3 && 49999 == u || 5e4 == u || 0 == u) : o = (4 > i && u + 1 == s || i > 3 && u + 1 == s / 2) && (n[r + 1] / s / 100 | 0) == qn(10, e - 2) - 1 || (u == s / 2 || 0 == u) && 0 == (n[r + 1] / s / 100 | 0) : 4 > e ? (0 == e ? u = u / 1e3 | 0 : 1 == e ? u = u / 100 | 0 : 2 == e && (u = u / 10 | 0), o = (t || 4 > i) && 9999 == u || !t && i > 3 && 4999 == u) : o = ((t || 4 > i) && u + 1 == s || !t && i > 3 && u + 1 == s / 2) && (n[r + 1] / s / 1e3 | 0) == qn(10, e - 3) - 1, o } function r(n, e, i) { for (var t, r, s = [0], o = 0, u = n.length; u > o;) { for (r = s.length; r--;) s[r] *= e; for (s[0] += mn.indexOf(n.charAt(o++)), t = 0; t < s.length; t++) s[t] > i - 1 && (void 0 === s[t + 1] && (s[t + 1] = 0), s[t + 1] += s[t] / i | 0, s[t] %= i) } return s.reverse() } function s(n, e) { var i, t, r = e.d.length; 32 > r ? (i = Math.ceil(r / 3), t = Math.pow(4, -i).toString()) : (i = 16, t = "2.3283064365386962890625e-10"), n.precision += i, e = E(n, 1, e.times(t), new n(1)); for (var s = i; s--;) { var o = e.times(e); e = o.times(o).minus(o).times(8).plus(1) } return n.precision -= i, e } function o(n, e, i, t) { var r, s, o, u, c, f, h, a, l, d = n.constructor; n: if (null != e) { if (a = n.d, !a) return n; for (r = 1, u = a[0]; u >= 10; u /= 10) r++; if (s = e - r, 0 > s) s += Sn, o = e, h = a[l = 0], c = h / qn(10, r - o - 1) % 10 | 0; else if (l = Math.ceil((s + 1) / Sn), u = a.length, l >= u) { if (!t) break n; for (; u++ <= l;) a.push(0); h = c = 0, r = 1, s %= Sn, o = s - Sn + 1 } else { for (h = u = a[l], r = 1; u >= 10; u /= 10) r++; s %= Sn, o = s - Sn + r, c = 0 > o ? 0 : h / qn(10, r - o - 1) % 10 | 0 } if (t = t || 0 > e || void 0 !== a[l + 1] || (0 > o ? h : h % qn(10, r - o - 1)), f = 4 > i ? (c || t) && (0 == i || i == (n.s < 0 ? 3 : 2)) : c > 5 || 5 == c && (4 == i || t || 6 == i && (s > 0 ? o > 0 ? h / qn(10, r - o) : 0 : a[l - 1]) % 10 & 1 || i == (n.s < 0 ? 8 : 7)), 1 > e || !a[0]) return a.length = 0, f ? (e -= n.e + 1, a[0] = qn(10, (Sn - e % Sn) % Sn), n.e = -e || 0) : a[0] = n.e = 0, n; if (0 == s ? (a.length = l, u = 1, l--) : (a.length = l + 1, u = qn(10, Sn - s), a[l] = o > 0 ? (h / qn(10, r - o) % qn(10, o) | 0) * u : 0), f) for (; ;) { if (0 == l) { for (s = 1, o = a[0]; o >= 10; o /= 10) s++; for (o = a[0] += u, u = 1; o >= 10; o /= 10) u++; s != u && (n.e++, a[0] == Rn && (a[0] = 1)); break } if (a[l] += u, a[l] != Rn) break; a[l--] = 0, u = 1 } for (s = a.length; 0 === a[--s];) a.pop() } return En && (n.e > d.maxE ? (n.d = null, n.e = NaN) : n.e < d.minE && (n.e = 0, n.d = [0])), n } function u(n, i, t) { if (!n.isFinite()) return v(n); var r, s = n.e, o = e(n.d), u = o.length; return i ? (t && (r = t - u) > 0 ? o = o.charAt(0) + "." + o.slice(1) + l(r) : u > 1 && (o = o.charAt(0) + "." + o.slice(1)), o = o + (n.e < 0 ? "e" : "e+") + n.e) : 0 > s ? (o = "0." + l(-s - 1) + o, t && (r = t - u) > 0 && (o += l(r))) : s >= u ? (o += l(s + 1 - u), t && (r = t - s - 1) > 0 && (o = o + "." + l(r))) : ((r = s + 1) < u && (o = o.slice(0, r) + "." + o.slice(r)), t && (r = t - u) > 0 && (s + 1 === u && (o += "."), o += l(r))), o } function c(n, e) { for (var i = 1, t = n[0]; t >= 10; t /= 10) i++; return i + e * Sn - 1 } function f(n, e, i) { if (e > Un) throw En = !0, i && (n.precision = i), Error(An); return o(new n(vn), e, 1, !0) } function h(n, e, i) { if (e > _n) throw Error(An); return o(new n(Nn), e, i, !0) } function a(n) { var e = n.length - 1, i = e * Sn + 1; if (e = n[e]) { for (; e % 10 == 0; e /= 10) i--; for (e = n[0]; e >= 10; e /= 10) i++ } return i } function l(n) { for (var e = ""; n--;) e += "0"; return e } function d(n, e, i, t) { var r, s = new n(1), o = Math.ceil(t / Sn + 4); for (En = !1; ;) { if (i % 2 && (s = s.times(e), A(s.d, o) && (r = !0)), i = On(i / 2), 0 === i) { i = s.d.length - 1, r && 0 === s.d[i] && ++s.d[i]; break } e = e.times(e), A(e.d, o) } return En = !0, s } function g(n) { return 1 & n.d[n.d.length - 1] } function p(n, e, i) { for (var t, r = new n(e[0]), s = 0; ++s < e.length;) { if (t = new n(e[s]), !t.s) { r = t; break } r[i](t) && (r = t) } return r } function w(n, i) { var r, s, u, c, f, h, a, l = 0, d = 0, g = 0, p = n.constructor, w = p.rounding, m = p.precision; if (!n.d || !n.d[0] || n.e > 17) return new p(n.d ? n.d[0] ? n.s < 0 ? 0 : 1 / 0 : 1 : n.s ? n.s < 0 ? 0 : n : NaN); for (null == i ? (En = !1, a = m) : a = i, h = new p(.03125) ; n.e > -2;) n = n.times(h), g += 5; for (s = Math.log(qn(2, g)) / Math.LN10 * 2 + 5 | 0, a += s, r = c = f = new p(1), p.precision = a; ;) { if (c = o(c.times(n), a, 1), r = r.times(++d), h = f.plus(Tn(c, r, a, 1)), e(h.d).slice(0, a) === e(f.d).slice(0, a)) { for (u = g; u--;) f = o(f.times(f), a, 1); if (null != i) return p.precision = m, f; if (!(3 > l && t(f.d, a - s, w, l))) return o(f, p.precision = m, w, En = !0); p.precision = a += 10, r = c = h = new p(1), d = 0, l++ } f = h } } function m(n, i) { var r, s, u, c, h, a, l, d, g, p, w, v = 1, N = 10, x = n, b = x.d, E = x.constructor, M = E.rounding, y = E.precision; if (x.s < 0 || !b || !b[0] || !x.e && 1 == b[0] && 1 == b.length) return new E(b && !b[0] ? -1 / 0 : 1 != x.s ? NaN : b ? 0 : x); if (null == i ? (En = !1, g = y) : g = i, E.precision = g += N, r = e(b), s = r.charAt(0), !(Math.abs(c = x.e) < 15e14)) return d = f(E, g + 2, y).times(c + ""), x = m(new E(s + "." + r.slice(1)), g - N).plus(d), E.precision = y, null == i ? o(x, y, M, En = !0) : x; for (; 7 > s && 1 != s || 1 == s && r.charAt(1) > 3;) x = x.times(n), r = e(x.d), s = r.charAt(0), v++; for (c = x.e, s > 1 ? (x = new E("0." + r), c++) : x = new E(s + "." + r.slice(1)), p = x, l = h = x = Tn(x.minus(1), x.plus(1), g, 1), w = o(x.times(x), g, 1), u = 3; ;) { if (h = o(h.times(w), g, 1), d = l.plus(Tn(h, new E(u), g, 1)), e(d.d).slice(0, g) === e(l.d).slice(0, g)) { if (l = l.times(2), 0 !== c && (l = l.plus(f(E, g + 2, y).times(c + ""))), l = Tn(l, new E(v), g, 1), null != i) return E.precision = y, l; if (!t(l.d, g - N, M, a)) return o(l, E.precision = y, M, En = !0); E.precision = g += N, d = h = x = Tn(p.minus(1), p.plus(1), g, 1), w = o(x.times(x), g, 1), u = a = 1 } l = d, u += 2 } } function v(n) { return String(n.s * n.s / 0) } function N(n, e) { var i, t, r; for ((i = e.indexOf(".")) > -1 && (e = e.replace(".", "")), (t = e.search(/e/i)) > 0 ? (0 > i && (i = t), i += +e.slice(t + 1), e = e.substring(0, t)) : 0 > i && (i = e.length), t = 0; 48 === e.charCodeAt(t) ; t++); for (r = e.length; 48 === e.charCodeAt(r - 1) ; --r); if (e = e.slice(t, r)) { if (r -= t, n.e = i = i - t - 1, n.d = [], t = (i + 1) % Sn, 0 > i && (t += Sn), r > t) { for (t && n.d.push(+e.slice(0, t)), r -= Sn; r > t;) n.d.push(+e.slice(t, t += Sn)); e = e.slice(t), t = Sn - e.length } else t -= r; for (; t--;) e += "0"; n.d.push(+e), En && (n.e > n.constructor.maxE ? (n.d = null, n.e = NaN) : n.e < n.constructor.minE && (n.e = 0, n.d = [0])) } else n.e = 0, n.d = [0]; return n } function x(n, e) { var i, t, s, o, u, f, h, a, l; if ("Infinity" === e || "NaN" === e) return +e || (n.s = NaN), n.e = NaN, n.d = null, n; if (Dn.test(e)) i = 16, e = e.toLowerCase(); else if (Fn.test(e)) i = 2; else { if (!Zn.test(e)) throw Error(yn + e); i = 8 } for (o = e.search(/p/i), o > 0 ? (h = +e.slice(o + 1), e = e.substring(2, o)) : e = e.slice(2), o = e.indexOf("."), u = o >= 0, t = n.constructor, u && (e = e.replace(".", ""), f = e.length, o = f - o, s = d(t, new t(i), o, 2 * o)), a = r(e, i, Rn), l = a.length - 1, o = l; 0 === a[o]; --o) a.pop(); return 0 > o ? new t(0 * n.s) : (n.e = c(a, l), n.d = a, En = !1, u && (n = Tn(n, s, 4 * f)), h && (n = n.times(Math.abs(h) < 54 ? Math.pow(2, h) : xn.pow(2, h))), En = !0, n) } function b(n, e) { var i, t = e.d.length; if (3 > t) return E(n, 2, e, e); i = 1.4 * Math.sqrt(t), i = i > 16 ? 16 : 0 | i, e = e.times(Math.pow(5, -i)), e = E(n, 2, e, e); for (var r, s = new n(5), o = new n(16), u = new n(20) ; i--;) r = e.times(e), e = e.times(s.plus(r.times(o.times(r).minus(u)))); return e } function E(n, e, i, t, r) { var s, o, u, c, f = 1, h = n.precision, a = Math.ceil(h / Sn); for (En = !1, c = i.times(i), u = new n(t) ; ;) { if (o = Tn(u.times(c), new n(e++ * e++), h, 1), u = r ? t.plus(o) : t.minus(o), t = Tn(o.times(c), new n(e++ * e++), h, 1), o = u.plus(t), void 0 !== o.d[a]) { for (s = a; o.d[s] === u.d[s] && s--;); if (-1 == s) break } s = u, u = t, t = o, o = s, f++ } return En = !0, o.d.length = a + 1, o } function M(n, e) { var i, t = e.s < 0, r = h(n, n.precision, 1), s = r.times(.5); if (e = e.abs(), e.lte(s)) return gn = t ? 4 : 1, e; if (i = e.divToInt(r), i.isZero()) gn = t ? 3 : 2; else { if (e = e.minus(i.times(r)), e.lte(s)) return gn = g(i) ? t ? 2 : 3 : t ? 4 : 1, e; gn = g(i) ? t ? 1 : 4 : t ? 3 : 2 } return e.minus(r).abs() } function y(n, e, t, s) { var o, c, f, h, a, l, d, g, p, w = n.constructor, m = void 0 !== t; if (m ? (i(t, 1, wn), void 0 === s ? s = w.rounding : i(s, 0, 8)) : (t = w.precision, s = w.rounding), n.isFinite()) { for (d = u(n), f = d.indexOf("."), m ? (o = 2, 16 == e ? t = 4 * t - 3 : 8 == e && (t = 3 * t - 2)) : o = e, f >= 0 && (d = d.replace(".", ""), p = new w(1), p.e = d.length - f, p.d = r(u(p), 10, o), p.e = p.d.length), g = r(d, 10, o), c = a = g.length; 0 == g[--a];) g.pop(); if (g[0]) { if (0 > f ? c-- : (n = new w(n), n.d = g, n.e = c, n = Tn(n, p, t, s, 0, o), g = n.d, c = n.e, l = ln), f = g[t], h = o / 2, l = l || void 0 !== g[t + 1], l = 4 > s ? (void 0 !== f || l) && (0 === s || s === (n.s < 0 ? 3 : 2)) : f > h || f === h && (4 === s || l || 6 === s && 1 & g[t - 1] || s === (n.s < 0 ? 8 : 7)), g.length = t, l) for (; ++g[--t] > o - 1;) g[t] = 0, t || (++c, g.unshift(1)); for (a = g.length; !g[a - 1]; --a); for (f = 0, d = ""; a > f; f++) d += mn.charAt(g[f]); if (m) { if (a > 1) if (16 == e || 8 == e) { for (f = 16 == e ? 4 : 3, --a; a % f; a++) d += "0"; for (g = r(d, o, e), a = g.length; !g[a - 1]; --a); for (f = 1, d = "1."; a > f; f++) d += mn.charAt(g[f]) } else d = d.charAt(0) + "." + d.slice(1); d = d + (0 > c ? "p" : "p+") + c } else if (0 > c) { for (; ++c;) d = "0" + d; d = "0." + d } else if (++c > a) for (c -= a; c--;) d += "0"; else a > c && (d = d.slice(0, c) + "." + d.slice(c)) } else d = m ? "0p+0" : "0"; d = (16 == e ? "0x" : 2 == e ? "0b" : 8 == e ? "0o" : "") + d } else d = v(n); return n.s < 0 ? "-" + d : d } function A(n, e) { return n.length > e ? (n.length = e, !0) : void 0 } function O(n) { return new this(n).abs() } function q(n) { return new this(n).acos() } function F(n) { return new this(n).acosh() } function D(n, e) { return new this(n).plus(e) } function Z(n) { return new this(n).asin() } function P(n) { return new this(n).asinh() } function R(n) { return new this(n).atan() } function S(n) { return new this(n).atanh() } function L(n, e) { n = new this(n), e = new this(e); var i, t = this.precision, r = this.rounding, s = t + 4; return n.s && e.s ? n.d || e.d ? !e.d || n.isZero() ? (i = e.s < 0 ? h(this, t, r) : new this(0), i.s = n.s) : !n.d || e.isZero() ? (i = h(this, s, 1).times(.5), i.s = n.s) : e.s < 0 ? (this.precision = s, this.rounding = 1, i = this.atan(Tn(n, e, s, 1)), e = h(this, s, 1), this.precision = t, this.rounding = r, i = n.s < 0 ? i.minus(e) : i.plus(e)) : i = this.atan(Tn(n, e, s, 1)) : (i = h(this, s, 1).times(e.s > 0 ? .25 : .75), i.s = n.s) : i = new this(NaN), i } function U(n) { return new this(n).cbrt() } function _(n) { return o(n = new this(n), n.e + 1, 2) } function k(n) { if (!n || "object" != typeof n) throw Error(Mn + "Object expected"); var e, i, t, r = ["precision", 1, wn, "rounding", 0, 8, "toExpNeg", -pn, 0, "toExpPos", 0, pn, "maxE", 0, pn, "minE", -pn, 0, "modulo", 0, 9]; for (e = 0; e < r.length; e += 3) if (void 0 !== (t = n[i = r[e]])) { if (!(On(t) === t && t >= r[e + 1] && t <= r[e + 2])) throw Error(yn + i + ": " + t); this[i] = t } if (n.hasOwnProperty(i = "crypto")) if (void 0 === (t = n[i])) this[i] = t; else { if (t !== !0 && t !== !1 && 0 !== t && 1 !== t) throw Error(yn + i + ": " + t); this[i] = !(!t || !bn || !bn.getRandomValues && !bn.randomBytes) } return this } function T(n) { return new this(n).cos() } function C(n) { return new this(n).cosh() } function I(n) { function e(n) { var i, t, r, s = this; if (!(s instanceof e)) return new e(n); if (s.constructor = e, n instanceof e) return s.s = n.s, s.e = n.e, void (s.d = (n = n.d) ? n.slice() : n); if (r = typeof n, "number" === r) { if (0 === n) return s.s = 0 > 1 / n ? -1 : 1, s.e = 0, void (s.d = [0]); if (0 > n ? (n = -n, s.s = -1) : s.s = 1, n === ~~n && 1e7 > n) { for (i = 0, t = n; t >= 10; t /= 10) i++; return s.e = i, void (s.d = [n]) } return 0 * n !== 0 ? (n || (s.s = NaN), s.e = NaN, void (s.d = null)) : N(s, n.toString()) } if ("string" !== r) throw Error(yn + n); return 45 === n.charCodeAt(0) ? (n = n.slice(1), s.s = -1) : s.s = 1, Pn.test(n) ? N(s, n) : x(s, n) } var i, t, r; if (e.prototype = kn, e.ROUND_UP = 0, e.ROUND_DOWN = 1, e.ROUND_CEIL = 2, e.ROUND_FLOOR = 3, e.ROUND_HALF_UP = 4, e.ROUND_HALF_DOWN = 5, e.ROUND_HALF_EVEN = 6, e.ROUND_HALF_CEIL = 7, e.ROUND_HALF_FLOOR = 8, e.EUCLID = 9, e.config = k, e.clone = I, e.abs = O, e.acos = q, e.acosh = F, e.add = D, e.asin = Z, e.asinh = P, e.atan = R, e.atanh = S, e.atan2 = L, e.cbrt = U, e.ceil = _, e.cos = T, e.cosh = C, e.div = H, e.exp = B, e.floor = V, e.fromJSON = j, e.hypot = $, e.ln = J, e.log = W, e.log10 = G, e.log2 = z, e.max = K, e.min = Q, e.mod = X, e.mul = Y, e.pow = nn, e.random = en, e.round = tn, e.sign = rn, e.sin = sn, e.sinh = on, e.sqrt = un, e.sub = cn, e.tan = fn, e.tanh = hn, e.trunc = an, void 0 === n && (n = {}), n) for (r = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], i = 0; i < r.length;) n.hasOwnProperty(t = r[i++]) || (n[t] = this[t]); return e.config(n), e } function H(n, e) { return new this(n).div(e) } function B(n) { return new this(n).exp() } function V(n) { return o(n = new this(n), n.e + 1, 3) } function j(n) { var e, i, t, s; if ("string" != typeof n || !n) throw Error(yn + n); if (t = n.length, s = mn.indexOf(n.charAt(0)), 1 === t) return new this(s > 81 ? [-1 / 0, 1 / 0, NaN][s - 82] : s > 40 ? -(s - 41) : s); if (64 & s) i = 16 & s, e = i ? (7 & s) - 3 : (15 & s) - 7, t = 1; else { if (2 === t) return s = 88 * s + mn.indexOf(n.charAt(1)), new this(s >= 2816 ? -(s - 2816) - 41 : s + 41); if (i = 32 & s, !(31 & s)) return n = r(n.slice(1), 88, 10).join(""), new this(i ? "-" + n : n); e = 15 & s, t = e + 1, e = 1 === e ? mn.indexOf(n.charAt(1)) : 2 === e ? 88 * mn.indexOf(n.charAt(1)) + mn.indexOf(n.charAt(2)) : +r(n.slice(1, t), 88, 10).join(""), 16 & s && (e = -e) } return n = r(n.slice(t), 88, 10).join(""), e = e - n.length + 1, n = n + "e" + e, new this(i ? "-" + n : n) } function $() { var n, e, i = new this(0); for (En = !1, n = 0; n < arguments.length;) if (e = new this(arguments[n++]), e.d) i.d && (i = i.plus(e.times(e))); else { if (e.s) return En = !0, new this(1 / 0); i = e } return En = !0, i.sqrt() } function J(n) { return new this(n).ln() } function W(n, e) { return new this(n).log(e) } function z(n) { return new this(n).log(2) } function G(n) { return new this(n).log(10) } function K() { return p(this, arguments, "lt") } function Q() { return p(this, arguments, "gt") } function X(n, e) { return new this(n).mod(e) } function Y(n, e) { return new this(n).mul(e) } function nn(n, e) { return new this(n).pow(e) } function en(n) { var e, t, r, s, o = 0, u = new this(1), c = []; if (void 0 === n ? n = this.precision : i(n, 1, wn), r = Math.ceil(n / Sn), this.crypto === !1) for (; r > o;) c[o++] = 1e7 * Math.random() | 0; else if (bn && bn.getRandomValues) for (e = bn.getRandomValues(new Uint32Array(r)) ; r > o;) s = e[o], s >= 429e7 ? e[o] = bn.getRandomValues(new Uint32Array(1))[0] : c[o++] = s % 1e7; else if (bn && bn.randomBytes) { for (e = bn.randomBytes(r *= 4) ; r > o;) s = e[o] + (e[o + 1] << 8) + (e[o + 2] << 16) + ((127 & e[o + 3]) << 24), s >= 214e7 ? bn.randomBytes(4).copy(e, o) : (c.push(s % 1e7), o += 4); o = r / 4 } else { if (this.crypto) throw Error(Mn + "crypto unavailable"); for (; r > o;) c[o++] = 1e7 * Math.random() | 0 } for (r = c[--o], n %= Sn, r && n && (s = qn(10, Sn - n), c[o] = (r / s | 0) * s) ; 0 === c[o]; o--) c.pop(); if (0 > o) t = 0, c = [0]; else { for (t = -1; 0 === c[0]; t -= Sn) c.shift(); for (r = 1, s = c[0]; s >= 10; s /= 10) r++; Sn > r && (t -= Sn - r) } return u.e = t, u.d = c, u } function tn(n) { return o(n = new this(n), n.e + 1, this.rounding) } function rn(n) { return n = new this(n), n.d ? n.d[0] ? n.s : 0 * n.s : n.s || NaN } function sn(n) { return new this(n).sin() } function on(n) { return new this(n).sinh() } function un(n) { return new this(n).sqrt() } function cn(n, e) { return new this(n).sub(e) } function fn(n) { return new this(n).tan() } function hn(n) { return new this(n).tanh() } function an(n) { return o(n = new this(n), n.e + 1, 1) } var ln, dn, gn, pn = 9e15, wn = 1e9, mn = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%()*+,-./:;=?@[]^_`{|}~", vn = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", Nn = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", xn = { precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -pn, maxE: pn, crypto: void 0 }, bn = "undefined" != typeof crypto ? crypto : null, En = !0, Mn = "[DecimalError] ", yn = Mn + "Invalid argument: ", An = Mn + "Precision limit exceeded", On = Math.floor, qn = Math.pow, Fn = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, Dn = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, Zn = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, Pn = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Rn = 1e7, Sn = 7, Ln = 9007199254740991, Un = vn.length - 1, _n = Nn.length - 1, kn = {}; kn.absoluteValue = kn.abs = function () { var n = new this.constructor(this); return n.s < 0 && (n.s = 1), o(n) }, kn.ceil = function () { return o(new this.constructor(this), this.e + 1, 2) }, kn.comparedTo = kn.cmp = function (n) { var e, i, t, r, s = this, o = s.d, u = (n = new s.constructor(n)).d, c = s.s, f = n.s; if (!o || !u) return c && f ? c !== f ? c : o === u ? 0 : !o ^ 0 > c ? 1 : -1 : NaN; if (!o[0] || !u[0]) return o[0] ? c : u[0] ? -f : 0; if (c !== f) return c; if (s.e !== n.e) return s.e > n.e ^ 0 > c ? 1 : -1; for (t = o.length, r = u.length, e = 0, i = r > t ? t : r; i > e; ++e) if (o[e] !== u[e]) return o[e] > u[e] ^ 0 > c ? 1 : -1; return t === r ? 0 : t > r ^ 0 > c ? 1 : -1 }, kn.cosine = kn.cos = function () { var n, e, i = this, t = i.constructor; return i.d ? i.d[0] ? (n = t.precision, e = t.rounding, t.precision = n + Math.max(i.e, i.sd()) + Sn, t.rounding = 1, i = s(t, M(t, i)), t.precision = n, t.rounding = e, o(2 == gn || 3 == gn ? i.neg() : i, n, e, !0)) : new t(1) : new t(NaN) }, kn.cubeRoot = kn.cbrt = function () { var n, i, t, r, s, u, c, f, h, a, l = this, d = l.constructor; if (!l.isFinite() || l.isZero()) return new d(l); for (En = !1, u = l.s * Math.pow(l.s * l, 1 / 3), u && Math.abs(u) != 1 / 0 ? r = new d(u.toString()) : (t = e(l.d), n = l.e, (u = (n - t.length + 1) % 3) && (t += 1 == u || -2 == u ? "0" : "00"), u = Math.pow(t, 1 / 3), n = On((n + 1) / 3) - (n % 3 == (0 > n ? -1 : 2)), u == 1 / 0 ? t = "5e" + n : (t = u.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + n), r = new d(t), r.s = l.s), c = (n = d.precision) + 3; ;) if (f = r, h = f.times(f).times(f), a = h.plus(l), r = Tn(a.plus(l).times(f), a.plus(h), c + 2, 1), e(f.d).slice(0, c) === (t = e(r.d)).slice(0, c)) { if (t = t.slice(c - 3, c + 1), "9999" != t && (s || "4999" != t)) { (!+t || !+t.slice(1) && "5" == t.charAt(0)) && (o(r, n + 1, 1), i = !r.times(r).times(r).eq(l)); break } if (!s && (o(f, n + 1, 0), f.times(f).times(f).eq(l))) { r = f; break } c += 4, s = 1 } return En = !0, o(r, n, d.rounding, i) }, kn.decimalPlaces = kn.dp = function () { var n, e = this.d, i = NaN; if (e) { if (n = e.length - 1, i = (n - On(this.e / Sn)) * Sn, n = e[n]) for (; n % 10 == 0; n /= 10) i--; 0 > i && (i = 0) } return i }, kn.dividedBy = kn.div = function (n) { return Tn(this, new this.constructor(n)) }, kn.dividedToIntegerBy = kn.divToInt = function (n) { var e = this, i = e.constructor; return o(Tn(e, new i(n), 0, 1, 1), i.precision, i.rounding) }, kn.equals = kn.eq = function (n) { return 0 === this.cmp(n) }, kn.floor = function () { return o(new this.constructor(this), this.e + 1, 3) }, kn.greaterThan = kn.gt = function (n) { return this.cmp(n) > 0 }, kn.greaterThanOrEqualTo = kn.gte = function (n) { var e = this.cmp(n); return 1 == e || 0 === e }, kn.hyperbolicCosine = kn.cosh = function () { var n, e, i, t, r, s = this, u = s.constructor, c = new u(1); if (!s.isFinite()) return new u(s.s ? 1 / 0 : NaN); if (s.isZero()) return c; i = u.precision, t = u.rounding, u.precision = i + Math.max(s.e, s.sd()) + 4, u.rounding = 1, r = s.d.length, 32 > r ? (n = Math.ceil(r / 3), e = Math.pow(4, -n).toString()) : (n = 16, e = "2.3283064365386962890625e-10"), s = E(u, 1, s.times(e), new u(1), !0); for (var f, h = n, a = new u(8) ; h--;) f = s.times(s), s = c.minus(f.times(a.minus(f.times(a)))); return o(s, u.precision = i, u.rounding = t, !0) }, kn.hyperbolicSine = kn.sinh = function () { var n, e, i, t, r = this, s = r.constructor; if (!r.isFinite() || r.isZero()) return new s(r); if (e = s.precision, i = s.rounding, s.precision = e + Math.max(r.e, r.sd()) + 4, s.rounding = 1, t = r.d.length, 3 > t) r = E(s, 2, r, r, !0); else { n = 1.4 * Math.sqrt(t), n = n > 16 ? 16 : 0 | n, r = r.times(Math.pow(5, -n)), r = E(s, 2, r, r, !0); for (var u, c = new s(5), f = new s(16), h = new s(20) ; n--;) u = r.times(r), r = r.times(c.plus(u.times(f.times(u).plus(h)))) } return s.precision = e, s.rounding = i, o(r, e, i, !0) }, kn.hyperbolicTangent = kn.tanh = function () { var n, e, i = this, t = i.constructor; return i.isFinite() ? i.isZero() ? new t(i) : (n = t.precision, e = t.rounding, t.precision = n + 7, t.rounding = 1, Tn(i.sinh(), i.cosh(), t.precision = n, t.rounding = e)) : new t(i.s) }, kn.inverseCosine = kn.acos = function () { var n, e = this, i = e.constructor, t = e.abs().cmp(1), r = i.precision, s = i.rounding; return -1 !== t ? 0 === t ? e.isNeg() ? h(i, r, s) : new i(0) : new i(NaN) : e.isZero() ? h(i, r + 4, s).times(.5) : (i.precision = r + 6, i.rounding = 1, e = e.asin(), n = h(i, r + 4, s).times(.5), i.precision = r, i.rounding = s, n.minus(e)) }, kn.inverseHyperbolicCosine = kn.acosh = function () { var n, e, i = this, t = i.constructor; return i.lte(1) ? new t(i.eq(1) ? 0 : NaN) : i.isFinite() ? (n = t.precision, e = t.rounding, t.precision = n + Math.max(Math.abs(i.e), i.sd()) + 4, t.rounding = 1, En = !1, i = i.times(i).minus(1).sqrt().plus(i), En = !0, t.precision = n, t.rounding = e, i.ln()) : new t(i) }, kn.inverseHyperbolicSine = kn.asinh = function () { var n, e, i = this, t = i.constructor; return !i.isFinite() || i.isZero() ? new t(i) : (n = t.precision, e = t.rounding, t.precision = n + 2 * Math.max(Math.abs(i.e), i.sd()) + 6, t.rounding = 1, En = !1, i = i.times(i).plus(1).sqrt().plus(i), En = !0, t.precision = n, t.rounding = e, i.ln()) }, kn.inverseHyperbolicTangent = kn.atanh = function () { var n, e, i, t, r = this, s = r.constructor; return r.isFinite() ? r.e >= 0 ? new s(r.abs().eq(1) ? r.s / 0 : r.isZero() ? r : NaN) : (n = s.precision, e = s.rounding, t = r.sd(), Math.max(t, n) < 2 * -r.e - 1 ? o(new s(r), n, e, !0) : (s.precision = i = t - r.e, r = Tn(r.plus(1), new s(1).minus(r), i + n, 1), s.precision = n + 4, s.rounding = 1, r = r.ln(), s.precision = n, s.rounding = e, r.times(.5))) : new s(NaN) }, kn.inverseSine = kn.asin = function () { var n, e, i, t, r = this, s = r.constructor; return r.isZero() ? new s(r) : (e = r.abs().cmp(1), i = s.precision, t = s.rounding, -1 !== e ? 0 === e ? (n = h(s, i + 4, t).times(.5), n.s = r.s, n) : new s(NaN) : (s.precision = i + 6, s.rounding = 1, r = r.div(new s(1).minus(r.times(r)).sqrt().plus(1)).atan(), s.precision = i, s.rounding = t, r.times(2))) }, kn.inverseTangent = kn.atan = function () { var n, e, i, t, r, s, u, c, f, a = this, l = a.constructor, d = l.precision, g = l.rounding; if (a.isFinite()) { if (a.isZero()) return new l(a); if (a.abs().eq(1) && _n >= d + 4) return u = h(l, d + 4, g).times(.25), u.s = a.s, u } else { if (!a.s) return new l(NaN); if (_n >= d + 4) return u = h(l, d + 4, g).times(.5), u.s = a.s, u } for (l.precision = c = d + 10, l.rounding = 1, i = Math.min(28, c / Sn + 2 | 0), n = i; n; --n) a = a.div(a.times(a).plus(1).sqrt().plus(1)); for (En = !1, e = Math.ceil(c / Sn), t = 1, f = a.times(a), u = new l(a), r = a; -1 !== n;) if (r = r.times(f), s = u.minus(r.div(t += 2)), r = r.times(f), u = s.plus(r.div(t += 2)), void 0 !== u.d[e]) for (n = e; u.d[n] === s.d[n] && n--;); return i && (u = u.times(2 << i - 1)), En = !0, o(u, l.precision = d, l.rounding = g, !0) }, kn.isFinite = function () { return !!this.d }, kn.isInteger = kn.isInt = function () { return !!this.d && On(this.e / Sn) > this.d.length - 2 }, kn.isNaN = function () { return !this.s }, kn.isNegative = kn.isNeg = function () { return this.s < 0 }, kn.isPositive = kn.isPos = function () { return this.s > 0 }, kn.isZero = function () { return !!this.d && 0 === this.d[0] }, kn.lessThan = kn.lt = function (n) { return this.cmp(n) < 0 }, kn.lessThanOrEqualTo = kn.lte = function (n) { return this.cmp(n) < 1 }, kn.logarithm = kn.log = function (n) { var i, r, s, u, c, h, a, l, d = this, g = d.constructor, p = g.precision, w = g.rounding, v = 5; if (null == n) n = new g(10), i = !0; else { if (n = new g(n), r = n.d, n.s < 0 || !r || !r[0] || n.eq(1)) return new g(NaN); i = n.eq(10) } if (r = d.d, d.s < 0 || !r || !r[0] || d.eq(1)) return new g(r && !r[0] ? -1 / 0 : 1 != d.s ? NaN : r ? 0 : 1 / 0); if (i) if (r.length > 1) c = !0; else { for (u = r[0]; u % 10 === 0;) u /= 10; c = 1 !== u } if (En = !1, a = p + v, h = m(d, a), s = i ? f(g, a + 10) : m(n, a), l = Tn(h, s, a, 1), t(l.d, u = p, w)) do if (a += 10, h = m(d, a), s = i ? f(g, a + 10) : m(n, a), l = Tn(h, s, a, 1), !c) { +e(l.d).slice(u + 1, u + 15) + 1 == 1e14 && (l = o(l, p + 1, 0)); break } while (t(l.d, u += 10, w)); return En = !0, o(l, p, w) }, kn.minus = kn.sub = function (n) { var e, i, t, r, s, u, f, h, a, l, d, g, p = this, w = p.constructor; if (n = new w(n), !p.d || !n.d) return p.s && n.s ? p.d ? n.s = -n.s : n = new w(n.d || p.s !== n.s ? p : NaN) : n = new w(NaN), n; if (p.s != n.s) return n.s = -n.s, p.plus(n); if (a = p.d, g = n.d, f = w.precision, h = w.rounding, !a[0] || !g[0]) { if (g[0]) n.s = -n.s; else { if (!a[0]) return new w(3 === h ? -0 : 0); n = new w(p) } return En ? o(n, f, h) : n } if (i = On(n.e / Sn), l = On(p.e / Sn), a = a.slice(), s = l - i) { for (d = 0 > s, d ? (e = a, s = -s, u = g.length) : (e = g, i = l, u = a.length), t = Math.max(Math.ceil(f / Sn), u) + 2, s > t && (s = t, e.length = 1), e.reverse(), t = s; t--;) e.push(0); e.reverse() } else { for (t = a.length, u = g.length, d = u > t, d && (u = t), t = 0; u > t; t++) if (a[t] != g[t]) { d = a[t] < g[t]; break } s = 0 } for (d && (e = a, a = g, g = e, n.s = -n.s), u = a.length, t = g.length - u; t > 0; --t) a[u++] = 0; for (t = g.length; t > s;) { if (a[--t] < g[t]) { for (r = t; r && 0 === a[--r];) a[r] = Rn - 1; --a[r], a[t] += Rn } a[t] -= g[t] } for (; 0 === a[--u];) a.pop(); for (; 0 === a[0]; a.shift())--i; return a[0] ? (n.d = a, n.e = c(a, i), En ? o(n, f, h) : n) : new w(3 === h ? -0 : 0) }, kn.modulo = kn.mod = function (n) { var e, i = this, t = i.constructor; return n = new t(n), !i.d || !n.s || n.d && !n.d[0] ? new t(NaN) : !n.d || i.d && !i.d[0] ? o(new t(i), t.precision, t.rounding) : (En = !1, 9 == t.modulo ? (e = Tn(i, n.abs(), 0, 3, 1), e.s *= n.s) : e = Tn(i, n, 0, t.modulo, 1), e = e.times(n), En = !0, i.minus(e)) }, kn.naturalExponential = kn.exp = function () { return w(this) }, kn.naturalLogarithm = kn.ln = function () { return m(this) }, kn.negated = kn.neg = function () { var n = new this.constructor(this); return n.s = -n.s, o(n) }, kn.plus = kn.add = function (n) { var e, i, t, r, s, u, f, h, a, l, d = this, g = d.constructor; if (n = new g(n), !d.d || !n.d) return d.s && n.s ? d.d || (n = new g(n.d || d.s === n.s ? d : NaN)) : n = new g(NaN), n; if (d.s != n.s) return n.s = -n.s, d.minus(n); if (a = d.d, l = n.d, f = g.precision, h = g.rounding, !a[0] || !l[0]) return l[0] || (n = new g(d)), En ? o(n, f, h) : n; if (s = On(d.e / Sn), t = On(n.e / Sn), a = a.slice(), r = s - t) { for (0 > r ? (i = a, r = -r, u = l.length) : (i = l, t = s, u = a.length), s = Math.ceil(f / Sn), u = s > u ? s + 1 : u + 1, r > u && (r = u, i.length = 1), i.reverse() ; r--;) i.push(0); i.reverse() } for (u = a.length, r = l.length, 0 > u - r && (r = u, i = l, l = a, a = i), e = 0; r;) e = (a[--r] = a[r] + l[r] + e) / Rn | 0, a[r] %= Rn; for (e && (a.unshift(e), ++t), u = a.length; 0 == a[--u];) a.pop(); return n.d = a, n.e = c(a, t), En ? o(n, f, h) : n }, kn.precision = kn.sd = function (n) { var e, i = this; if (void 0 !== n && n !== !!n && 1 !== n && 0 !== n) throw Error(yn + n); return i.d ? (e = a(i.d), n && i.e + 1 > e && (e = i.e + 1)) : e = NaN, e }, kn.round = function () { var n = this, e = n.constructor; return o(new e(n), n.e + 1, e.rounding) }, kn.sine = kn.sin = function () { var n, e, i = this, t = i.constructor; return i.isFinite() ? i.isZero() ? new t(i) : (n = t.precision, e = t.rounding, t.precision = n + Math.max(i.e, i.sd()) + Sn, t.rounding = 1, i = b(t, M(t, i)), t.precision = n, t.rounding = e, o(gn > 2 ? i.neg() : i, n, e, !0)) : new t(NaN) }, kn.squareRoot = kn.sqrt = function () { var n, i, t, r, s, u, c = this, f = c.d, h = c.e, a = c.s, l = c.constructor; if (1 !== a || !f || !f[0]) return new l(!a || 0 > a && (!f || f[0]) ? NaN : f ? c : 1 / 0); for (En = !1, a = Math.sqrt(+c), 0 == a || a == 1 / 0 ? (i = e(f), (i.length + h) % 2 == 0 && (i += "0"), a = Math.sqrt(i), h = On((h + 1) / 2) - (0 > h || h % 2), a == 1 / 0 ? i = "1e" + h : (i = a.toExponential(), i = i.slice(0, i.indexOf("e") + 1) + h), r = new l(i)) : r = new l(a.toString()), t = (h = l.precision) + 3; ;) if (u = r, r = u.plus(Tn(c, u, t + 2, 1)).times(.5), e(u.d).slice(0, t) === (i = e(r.d)).slice(0, t)) { if (i = i.slice(t - 3, t + 1), "9999" != i && (s || "4999" != i)) { (!+i || !+i.slice(1) && "5" == i.charAt(0)) && (o(r, h + 1, 1), n = !r.times(r).eq(c)); break } if (!s && (o(u, h + 1, 0), u.times(u).eq(c))) { r = u; break } t += 4, s = 1 } return En = !0, o(r, h, l.rounding, n) }, kn.tangent = kn.tan = function () { var n, e, i = this, t = i.constructor; return i.isFinite() ? i.isZero() ? new t(i) : (n = t.precision, e = t.rounding, t.precision = n + 10, t.rounding = 1, i = i.sin(), i.s = 1, i = Tn(i, new t(1).minus(i.times(i)).sqrt(), n + 10, 0), t.precision = n, t.rounding = e, o(2 == gn || 4 == gn ? i.neg() : i, n, e, !0)) : new t(NaN) }, kn.times = kn.mul = function (n) { var e, i, t, r, s, u, f, h, a, l = this, d = l.constructor, g = l.d, p = (n = new d(n)).d; if (n.s *= l.s, !(g && g[0] && p && p[0])) return new d(!n.s || g && !g[0] && !p || p && !p[0] && !g ? NaN : g && p ? 0 * n.s : n.s / 0); for (i = On(l.e / Sn) + On(n.e / Sn), h = g.length, a = p.length, a > h && (s = g, g = p, p = s, u = h, h = a, a = u), s = [], u = h + a, t = u; t--;) s.push(0); for (t = a; --t >= 0;) { for (e = 0, r = h + t; r > t;) f = s[r] + p[t] * g[r - t - 1] + e, s[r--] = f % Rn | 0, e = f / Rn | 0; s[r] = (s[r] + e) % Rn | 0 } for (; !s[--u];) s.pop(); for (e ? ++i : s.shift(), t = s.length; !s[--t];) s.pop(); return n.d = s, n.e = c(s, i), En ? o(n, d.precision, d.rounding) : n }, kn.toBinary = function (n, e) { return y(this, 2, n, e) }, kn.toDecimalPlaces = kn.toDP = function (n, e) { var t = this, r = t.constructor; return t = new r(t), void 0 === n ? t : (i(n, 0, wn), void 0 === e ? e = r.rounding : i(e, 0, 8), o(t, n + t.e + 1, e)) }, kn.toExponential = function (n, e) { var t, r = this, s = r.constructor; return void 0 === n ? t = u(r, !0) : (i(n, 0, wn), void 0 === e ? e = s.rounding : i(e, 0, 8), r = o(new s(r), n + 1, e), t = u(r, !0, n + 1)), r.isNeg() && !r.isZero() ? "-" + t : t }, kn.toFixed = function (n, e) { var t, r, s = this, c = s.constructor; return void 0 === n ? t = u(s) : (i(n, 0, wn), void 0 === e ? e = c.rounding : i(e, 0, 8), r = o(new c(s), n + s.e + 1, e), t = u(r, !1, n + r.e + 1)), s.isNeg() && !s.isZero() ? "-" + t : t }, kn.toFraction = function (n) { var i, t, r, s, o, u, c, f, h, l, d, g, p = this, w = p.d, m = p.constructor; if (!w) return new m(p); if (h = t = new m(1), r = f = new m(0), i = new m(r), o = i.e = a(w) - p.e - 1, u = o % Sn, i.d[0] = qn(10, 0 > u ? Sn + u : u), null == n) n = o > 0 ? i : h; else { if (c = new m(n), !c.isInt() || c.lt(h)) throw Error(yn + c); n = c.gt(i) ? o > 0 ? i : h : c } for (En = !1, c = new m(e(w)), l = m.precision, m.precision = o = w.length * Sn * 2; d = Tn(c, i, 0, 1, 1), s = t.plus(d.times(r)), 1 != s.cmp(n) ;) t = r, r = s, s = h, h = f.plus(d.times(s)), f = s, s = i, i = c.minus(d.times(s)), c = s; return s = Tn(n.minus(t), r, 0, 1, 1), f = f.plus(s.times(h)), t = t.plus(s.times(r)), f.s = h.s = p.s, g = Tn(h, r, o, 1).minus(p).abs().cmp(Tn(f, t, o, 1).minus(p).abs()) < 1 ? [h, r] : [f, t], m.precision = l, En = !0, g }, kn.toHexadecimal = kn.toHex = function (n, e) { return y(this, 16, n, e) }, kn.toJSON = function () { var n, i, t, s, o, u, c, f, h = this, a = h.s < 0; if (!h.d) return mn.charAt(h.s ? a ? 82 : 83 : 84); if (i = h.e, 1 === h.d.length && 4 > i && i >= 0 && (u = h.d[0], 2857 > u)) return 41 > u ? mn.charAt(a ? u + 41 : u) : (u -= 41, a && (u += 2816), s = u / 88 | 0, mn.charAt(s) + mn.charAt(u - 88 * s)); if (f = e(h.d), c = "", !a && 8 >= i && i >= -7) s = 64 + i + 7; else if (a && 4 >= i && i >= -3) s = 80 + i + 3; else if (f.length === i + 1) s = 32 * a; else if (s = 32 * a + 16 * (0 > i), i = Math.abs(i), 88 > i) s += 1, c = mn.charAt(i); else if (7744 > i) s += 2, u = i / 88 | 0, c = mn.charAt(u) + mn.charAt(i - 88 * u); else for (n = r(String(i), 10, 88), o = n.length, s += o, t = 0; o > t; t++) c += mn.charAt(n[t]); for (c = mn.charAt(s) + c, n = r(f, 10, 88), o = n.length, t = 0; o > t; t++) c += mn.charAt(n[t]); return c }, kn.toNearest = function (n, e) { var t = this, r = t.constructor; if (t = new r(t), null == n) { if (!t.d) return t; n = new r(1), e = r.rounding } else { if (n = new r(n), void 0 !== e && i(e, 0, 8), !t.d) return n.s ? t : n; if (!n.d) return n.s && (n.s = t.s), n } return n.d[0] ? (En = !1, 4 > e && (e = [4, 5, 7, 8][e]), t = Tn(t, n, 0, e, 1).times(n), En = !0, o(t)) : (n.s = t.s, t = n), t }, kn.toNumber = function () { return +this }, kn.toOctal = function (n, e) { return y(this, 8, n, e) }, kn.toPower = kn.pow = function (n) { var i, r, s, u, c, f, h, a = this, l = a.constructor, g = +(n = new l(n)); if (!(a.d && n.d && a.d[0] && n.d[0])) return new l(qn(+a, g)); if (a = new l(a), a.eq(1)) return a; if (s = l.precision, c = l.rounding, n.eq(1)) return o(a, s, c); if (i = On(n.e / Sn), r = n.d.length - 1, h = i >= r, f = a.s, h) { if ((r = 0 > g ? -g : g) <= Ln) return u = d(l, a, r, s), n.s < 0 ? new l(1).div(u) : o(u, s, c) } else if (0 > f) return new l(NaN); return f = 0 > f && 1 & n.d[Math.max(i, r)] ? -1 : 1, r = qn(+a, g), i = 0 != r && isFinite(r) ? new l(r + "").e : On(g * (Math.log("0." + e(a.d)) / Math.LN10 + a.e + 1)), i > l.maxE + 1 || i < l.minE - 1 ? new l(i > 0 ? f / 0 : 0) : (En = !1, l.rounding = a.s = 1, r = Math.min(12, (i + "").length), u = w(n.times(m(a, s + r)), s), u = o(u, s + 5, 1), t(u.d, s, c) && (i = s + 10, u = o(w(n.times(m(a, i + r)), i), i + 5, 1), +e(u.d).slice(s + 1, s + 15) + 1 == 1e14 && (u = o(u, s + 1, 0))), u.s = f, En = !0, l.rounding = c, o(u, s, c)) }, kn.toPrecision = function (n, e) { var t, r = this, s = r.constructor; return void 0 === n ? t = u(r, r.e <= s.toExpNeg || r.e >= s.toExpPos) : (i(n, 1, wn), void 0 === e ? e = s.rounding : i(e, 0, 8), r = o(new s(r), n, e), t = u(r, n <= r.e || r.e <= s.toExpNeg, n)), r.isNeg() && !r.isZero() ? "-" + t : t }, kn.toSignificantDigits = kn.toSD = function (n, e) { var t = this, r = t.constructor; return void 0 === n ? (n = r.precision, e = r.rounding) : (i(n, 1, wn), void 0 === e ? e = r.rounding : i(e, 0, 8)), o(new r(t), n, e) }, kn.toString = function () { var n = this, e = n.constructor, i = u(n, n.e <= e.toExpNeg || n.e >= e.toExpPos); return n.isNeg() && !n.isZero() ? "-" + i : i }, kn.truncated = kn.trunc = function () { return o(new this.constructor(this), this.e + 1, 1) }, kn.valueOf = function () { var n = this, e = n.constructor, i = u(n, n.e <= e.toExpNeg || n.e >= e.toExpPos); return n.isNeg() ? "-" + i : i }; var Tn = function () { function n(n, e, i) { var t, r = 0, s = n.length; for (n = n.slice() ; s--;) t = n[s] * e + r, n[s] = t % i | 0, r = t / i | 0; return r && n.unshift(r), n } function e(n, e, i, t) { var r, s; if (i != t) s = i > t ? 1 : -1; else for (r = s = 0; i > r; r++) if (n[r] != e[r]) { s = n[r] > e[r] ? 1 : -1; break } return s } function i(n, e, i, t) { for (var r = 0; i--;) n[i] -= r, r = n[i] < e[i] ? 1 : 0, n[i] = r * t + n[i] - e[i]; for (; !n[0] && n.length > 1;) n.shift() } return function (t, r, s, u, c, f) { var h, a, l, d, g, p, w, m, v, N, x, b, E, M, y, A, O, q, F, D, Z = t.constructor, P = t.s == r.s ? 1 : -1, R = t.d, S = r.d; if (!(R && R[0] && S && S[0])) return new Z(t.s && r.s && (R ? !S || R[0] != S[0] : S) ? R && 0 == R[0] || !S ? 0 * P : P / 0 : NaN); for (f ? (g = 1, a = t.e - r.e) : (f = Rn, g = Sn, a = On(t.e / g) - On(r.e / g)), F = S.length, O = R.length, v = new Z(P), N = v.d = [], l = 0; S[l] == (R[l] || 0) ; l++); if (S[l] > (R[l] || 0) && a--, null == s ? (M = s = Z.precision, u = Z.rounding) : M = c ? s + (t.e - r.e) + 1 : s, 0 > M) N.push(1), p = !0; else { if (M = M / g + 2 | 0, l = 0, 1 == F) { for (d = 0, S = S[0], M++; (O > l || d) && M--; l++) y = d * f + (R[l] || 0), N[l] = y / S | 0, d = y % S | 0; p = d || O > l } else { for (d = f / (S[0] + 1) | 0, d > 1 && (S = n(S, d, f), R = n(R, d, f), F = S.length, O = R.length), A = F, x = R.slice(0, F), b = x.length; F > b;) x[b++] = 0; D = S.slice(), D.unshift(0), q = S[0], S[1] >= f / 2 && ++q; do d = 0, h = e(S, x, F, b), 0 > h ? (E = x[0], F != b && (E = E * f + (x[1] || 0)), d = E / q | 0, d > 1 ? (d >= f && (d = f - 1), w = n(S, d, f), m = w.length, b = x.length, h = e(w, x, m, b), 1 == h && (d--, i(w, m > F ? D : S, m, f))) : (0 == d && (h = d = 1), w = S.slice()), m = w.length, b > m && w.unshift(0), i(x, w, b, f), -1 == h && (b = x.length, h = e(S, x, F, b), 1 > h && (d++, i(x, b > F ? D : S, b, f))), b = x.length) : 0 === h && (d++, x = [0]), N[l++] = d, h && x[0] ? x[b++] = R[A] || 0 : (x = [R[A]], b = 1); while ((A++ < O || void 0 !== x[0]) && M--); p = void 0 !== x[0] } N[0] || N.shift() } if (1 == g) v.e = a, ln = p; else { for (l = 1, d = N[0]; d >= 10; d /= 10) l++; v.e = l + a * g - 1, o(v, c ? s + v.e + 1 : s, u, p) } return v } }(); if (xn = I(xn), vn = new xn(vn), Nn = new xn(Nn), Bridge.$Decimal = xn, "function" == typeof define && define.amd) define(function () { return xn }); else if ("undefined" != typeof module && module.exports) { if (module.exports = xn, !bn) try { bn = require("crypto") } catch (Cn) { } } else n || (n = "undefined" != typeof self && self && self.self == self ? self : Function("return this")()), dn = n.Decimal, xn.noConflict = function () { return n.Decimal = dn, xn }, n.Decimal = xn }(Bridge.global);

    Bridge.Decimal = function (v, provider) {
        if (this.constructor !== Bridge.Decimal) {
            return new Bridge.Decimal(v);
        }

        if (typeof v === "string") {
            provider = provider || Bridge.CultureInfo.getCurrentCulture();

            var nfInfo = provider && provider.getFormat(Bridge.NumberFormatInfo);

            if (nfInfo && nfInfo.numberDecimalSeparator !== ".") {
                v = v.replace(nfInfo.numberDecimalSeparator, ".");
            }

            if (!/^\s*[+-]?(\d+|\d*\.\d+)((e|E)[+-]?\d+)?\s*$/.test(v)) {
                throw new Bridge.FormatException();
            }

            v = v.replace(/\s/g, "");
        }

        this.value = Bridge.Decimal.getValue(v);
    }

    Bridge.Decimal.$$name = "Bridge.Decimal";
    Bridge.Decimal.prototype.$$name = "Bridge.Decimal";

    Bridge.Decimal.$$inherits = [];
    Bridge.Class.addExtend(Bridge.Decimal, [Bridge.IComparable, Bridge.IFormattable, Bridge.IComparable$1(Bridge.Decimal), Bridge.IEquatable$1(Bridge.Decimal)]);

    Bridge.Decimal.instanceOf = function (instance) {
        return instance instanceof Bridge.Decimal;
    };

    Bridge.Decimal.getDefaultValue = function () {
        return new Bridge.Decimal(0);
    };

    Bridge.Decimal.getValue = function (d) {
        if (!Bridge.hasValue(d)) {
            return this.getDefaultValue();
        }

        if (d instanceof Bridge.Decimal) {
            return d.value;
        }

        if (d instanceof Bridge.Long || d instanceof Bridge.ULong) {
            return new Bridge.$Decimal(d.toString());
        }

        return new Bridge.$Decimal(d);
    };

    Bridge.Decimal.create = function (d) {
        if (!Bridge.hasValue(d)) {
            return null;
        }

        if (d instanceof Bridge.Decimal) {
            return d;
        }

        return new Bridge.Decimal(d);
    };

    Bridge.Decimal.lift = function (d) {
        return d == null ? null : Bridge.Decimal.create(d);
    }; 

    Bridge.Decimal.prototype.toString = function (format, provider) {
        if (!format && !provider) {
            return this.value.toString();
        }

        return Bridge.Int.format(this, format, provider);
    };

    Bridge.Decimal.prototype.toFloat = function () {
        return this.value.toNumber();
    };

    Bridge.Decimal.prototype.format = function (format, provider) {
        return Bridge.Int.format(this.toFloat(), format, provider);
    };

    Bridge.Decimal.prototype.decimalPlaces = function () {
        return this.value.decimalPlaces();
    };

    Bridge.Decimal.prototype.dividedToIntegerBy = function (d) {
        return new Bridge.Decimal(this.value.dividedToIntegerBy(Bridge.Decimal.getValue(d)));
    };

    Bridge.Decimal.prototype.exponential = function () {
        return new Bridge.Decimal(this.value.exponential());
    };

    Bridge.Decimal.prototype.abs = function () {
        return new Bridge.Decimal(this.value.abs());
    };

    Bridge.Decimal.prototype.floor = function () {
        return new Bridge.Decimal(this.value.floor());
    };

    Bridge.Decimal.prototype.ceil = function () {
        return new Bridge.Decimal(this.value.ceil());
    };

    Bridge.Decimal.prototype.trunc = function () {
        return new Bridge.Decimal(this.value.trunc());
    };

    Bridge.Decimal.round = function (obj, mode) {
        obj = Bridge.Decimal.create(obj);

        var old = Bridge.$Decimal.rounding;

        Bridge.$Decimal.rounding = mode;

        var d = new Bridge.Decimal(obj.value.round());

        Bridge.$Decimal.rounding = old;

        return d;
    };

    Bridge.Decimal.toDecimalPlaces = function (obj, decimals, mode) {
        obj = Bridge.Decimal.create(obj);
        var d = new Bridge.Decimal(obj.value.toDecimalPlaces(decimals, mode));
        return d;
    };

    Bridge.Decimal.prototype.compareTo = function (another) {
        return this.value.comparedTo(Bridge.Decimal.getValue(another));
    };

    Bridge.Decimal.prototype.add = function (another) {
        return new Bridge.Decimal(this.value.plus(Bridge.Decimal.getValue(another)));
    };

    Bridge.Decimal.prototype.sub = function (another) {
        return new Bridge.Decimal(this.value.minus(Bridge.Decimal.getValue(another)));
    };

    Bridge.Decimal.prototype.isZero = function () {
        return this.value.isZero;
    };

    Bridge.Decimal.prototype.mul = function (another) {
        return new Bridge.Decimal(this.value.times(Bridge.Decimal.getValue(another)));
    };

    Bridge.Decimal.prototype.div = function (another) {
        return new Bridge.Decimal(this.value.dividedBy(Bridge.Decimal.getValue(another)));
    };

    Bridge.Decimal.prototype.mod = function (another) {
        return new Bridge.Decimal(this.value.modulo(Bridge.Decimal.getValue(another)));
    };

    Bridge.Decimal.prototype.neg = function () {
        return new Bridge.Decimal(this.value.negated());
    };

    Bridge.Decimal.prototype.inc = function () {
        return new Bridge.Decimal(this.value.plus(Bridge.Decimal.getValue(1)));
    };

    Bridge.Decimal.prototype.dec = function () {
        return new Bridge.Decimal(this.value.minus(Bridge.Decimal.getValue(1)));
    };

    Bridge.Decimal.prototype.sign = function () {
        return this.value.isZero() ? 0 : (this.value.isNegative() ? -1 : 1);
    };

    Bridge.Decimal.prototype.clone = function () {
        return new Bridge.Decimal(this);
    };

    Bridge.Decimal.prototype.ne = function (v) {
        return !!this.compareTo(v);
    };

    Bridge.Decimal.prototype.lt = function (v) {
        return this.compareTo(v) < 0;
    };

    Bridge.Decimal.prototype.lte = function (v) {
        return this.compareTo(v) <= 0;
    };

    Bridge.Decimal.prototype.gt = function (v) {
        return this.compareTo(v) > 0;
    };

    Bridge.Decimal.prototype.gte = function (v) {
        return this.compareTo(v) >= 0;
    };

    Bridge.Decimal.prototype.equals = function (v) {
        return !this.compareTo(v);
    };

    Bridge.Decimal.prototype.equalsT = function (v) {
        return !this.compareTo(v);
    };

    Bridge.Decimal.prototype.getHashCode = function () {
        var n = (this.sign() * 397 + this.value.e) | 0;

        for (var i = 0; i < this.value.d.length; i++) {
            n = (n * 397 + this.value.d[i]) | 0;
        }

        return n;
    };

    Bridge.Decimal.toInt = function (v, tp) {
        if (!v) {
            return null;
        }

        if (tp) {
            var str,
                r;

            if (tp === Bridge.Long) {
                str = v.value.trunc().toString();
                r = new Bridge.Long(str);

                if (str !== r.value.toString()) {
                    throw new Bridge.OverflowException();
                }

                return r;
            }

            if (tp === Bridge.ULong) {
                if (v.value.isNegative()) {
                    throw new Bridge.OverflowException();
                }

                str = v.value.trunc().toString();
                r = new Bridge.ULong(str);

                if (str !== r.value.toString()) {
                    throw new Bridge.OverflowException();
                }

                return r;
            }

            return Bridge.Int.check(Bridge.Int.trunc(v.value.toNumber()), tp);
        }

        var i = Bridge.Int.trunc(Bridge.Decimal.getValue(v).toNumber());

        if (!Bridge.Int.instanceOf(i)) {
            throw new Bridge.OverflowException();
        }

        return i;
    };

    Bridge.Decimal.tryParse = function (s, provider, v) {
        try {
            v.v = new Bridge.Decimal(s, provider);

            return true;
        } catch (e) {
            v.v = new Bridge.Decimal(0);

            return false;
        }
    };

    Bridge.Decimal.toFloat = function (v) {
        if (!v) {
            return null;
        }

        return Bridge.Decimal.getValue(v).toNumber();
    };

    Bridge.Decimal.setConfig = function (config) {
        Bridge.$Decimal.config(config);
    };

    Bridge.Decimal.min = function () {
        var values = [];

        for (var i = 0, len = arguments.length; i < len; i++) {
            values.push(Bridge.Decimal.getValue(arguments[i]));
        }

        return new Bridge.Decimal(Bridge.$Decimal.min.apply(Bridge.$Decimal, values));
    };

    Bridge.Decimal.max = function () {
        var values = [];

        for (var i = 0, len = arguments.length; i < len; i++) {
            values.push(Bridge.Decimal.getValue(arguments[i]));
        }

        return new Bridge.Decimal(Bridge.$Decimal.max.apply(Bridge.$Decimal, values));
    };

    Bridge.Decimal.random = function (dp) {
        return new Bridge.Decimal(Bridge.$Decimal.random(dp));
    };

    Bridge.Decimal.exp = function (d) {
        return new Bridge.Decimal(Bridge.Decimal.getValue(d).exp());
    };

    Bridge.Decimal.exp = function (d) {
        return new Bridge.Decimal(Bridge.Decimal.getValue(d).exp());
    };

    Bridge.Decimal.ln = function (d) {
        return new Bridge.Decimal(Bridge.Decimal.getValue(d).ln());
    };

    Bridge.Decimal.log = function (d, logBase) {
        return new Bridge.Decimal(Bridge.Decimal.getValue(d).log(logBase));
    };

    Bridge.Decimal.pow = function (d, exponent) {
        return new Bridge.Decimal(Bridge.Decimal.getValue(d).pow(exponent));
    };

    Bridge.Decimal.sqrt = function (d) {
        return new Bridge.Decimal(Bridge.Decimal.getValue(d).sqrt());
    };

    Bridge.Decimal.prototype.isFinite = function () {
        return this.value.isFinite();
    };

    Bridge.Decimal.prototype.isInteger = function () {
        return this.value.isInteger();
    };

    Bridge.Decimal.prototype.isNaN = function () {
        return this.value.isNaN();
    };

    Bridge.Decimal.prototype.isNegative = function () {
        return this.value.isNegative();
    };

    Bridge.Decimal.prototype.isZero = function () {
        return this.value.isZero();
    };

    Bridge.Decimal.prototype.log = function (logBase) {
        return new Bridge.Decimal(this.value.log(logBase));
    };

    Bridge.Decimal.prototype.ln = function () {
        return new Bridge.Decimal(this.value.ln());
    };

    Bridge.Decimal.prototype.precision = function () {
        return this.value.precision();
    };

    Bridge.Decimal.prototype.round = function () {
        var old = Bridge.$Decimal.rounding,
            r;

        Bridge.$Decimal.rounding = 6;
        r = new Bridge.Decimal(this.value.round());
        Bridge.$Decimal.rounding = old;

        return r;
    };

    Bridge.Decimal.prototype.sqrt = function () {
        return new Bridge.Decimal(this.value.sqrt());
    };

    Bridge.Decimal.prototype.toDecimalPlaces = function (dp, rm) {
        return new Bridge.Decimal(this.value.toDecimalPlaces(dp, rm));
    };

    Bridge.Decimal.prototype.toExponential = function (dp, rm) {
        return this.value.toExponential(dp, rm);
    };

    Bridge.Decimal.prototype.toFixed = function (dp, rm) {
        return this.value.toFixed(dp, rm);
    };

    Bridge.Decimal.prototype.pow = function (n) {
        return new Bridge.Decimal(this.value.pow(n));
    };

    Bridge.Decimal.prototype.toPrecision = function (dp, rm) {
        return this.value.toPrecision(dp, rm);
    };

    Bridge.Decimal.prototype.toSignificantDigits = function (dp, rm) {
        return new Bridge.Decimal(this.value.toSignificantDigits(dp, rm));
    };

    Bridge.Decimal.prototype.valueOf = function () {
        return this.value.valueOf();
    };

    Bridge.Decimal.prototype.toFormat = function (dp, rm, provider) {
        var old = Bridge.$Decimal.format,
            d;

        if (provider && !provider.getFormat) {
            var oldConfig = Bridge.merge({}, old || {});

            Bridge.$Decimal.format = Bridge.merge(oldConfig, provider);
            d = this.value.toFormat(dp, rm);
        } else {
            provider = provider || Bridge.CultureInfo.getCurrentCulture();

            var nfInfo = provider && provider.getFormat(Bridge.NumberFormatInfo);

            if (nfInfo) {
                Bridge.$Decimal.format.decimalSeparator = nfInfo.numberDecimalSeparator;
                Bridge.$Decimal.format.groupSeparator = nfInfo.numberGroupSeparator;
                Bridge.$Decimal.format.groupSize = nfInfo.numberGroupSizes[0];
            }

            d = this.value.toFormat(dp, rm);
        }
        
        
        Bridge.$Decimal.format = old;
        return d;
    };

    Bridge.$Decimal.config({ precision: 29 });

    Bridge.Decimal.Zero = Bridge.Decimal(0);
    Bridge.Decimal.One = Bridge.Decimal(1);
    Bridge.Decimal.MinusOne = Bridge.Decimal(-1);
    Bridge.Decimal.MinValue = Bridge.Decimal("-79228162514264337593543950335");
    Bridge.Decimal.MaxValue = Bridge.Decimal("79228162514264337593543950335");
