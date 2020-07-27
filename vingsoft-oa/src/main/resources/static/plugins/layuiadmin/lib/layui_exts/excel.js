/* JeffreyWang压缩打包 lay-excel 1.6.0*/
function make_xlsx_lib(a) {
    function b() {
        Fl(1252)
    }

    function c() {
        Gl(1200), b()
    }

    function d(a) {
        for (var b = [], c = 0, d = a.length; c < d; ++c) b[c] = a.charCodeAt(c);
        return b
    }

    function e(a) {
        for (var b = [], c = 0; c < a.length >> 1; ++c) b[c] = String.fromCharCode(a.charCodeAt(2 * c) + (a.charCodeAt(2 * c + 1) << 8));
        return b.join("")
    }

    function f(a) {
        for (var b = [], c = 0; c < a.length >> 1; ++c) b[c] = String.fromCharCode(a.charCodeAt(2 * c + 1) + (a.charCodeAt(2 * c) << 8));
        return b.join("")
    }

    function g(a) {
        return Ml ? Buffer.alloc(a) : new Array(a)
    }

    function h(a) {
        return Ml ? Buffer.allocUnsafe(a) : new Array(a)
    }

    function i(a) {
        if ("undefined" == typeof ArrayBuffer) return Pl(a);
        for (var b = new ArrayBuffer(a.length), c = new Uint8Array(b), d = 0; d != a.length; ++d) c[d] = 255 & a.charCodeAt(d);
        return b
    }

    function j(a) {
        if (Array.isArray(a)) return a.map(kq).join("");
        for (var b = [], c = 0; c < a.length; ++c) b[c] = kq(a[c]);
        return b.join("")
    }

    function k(a) {
        if ("undefined" == typeof Uint8Array) throw new Error("Unsupported");
        return new Uint8Array(a)
    }

    function l(a) {
        if ("undefined" == typeof ArrayBuffer) throw new Error("Unsupported");
        if (a instanceof ArrayBuffer) return l(new Uint8Array(a));
        for (var b = new Array(a.length), c = 0; c < a.length; ++c) b[c] = a[c];
        return b
    }

    function m(a) {
        var b = "number" == typeof a ? Tl._table[a] : a;
        return b = b.replace(Yl, "(\\d+)"), new RegExp("^" + b + "$")
    }

    function n(a, b, c) {
        var d = -1, e = -1, f = -1, g = -1, h = -1, i = -1;
        (b.match(Yl) || []).forEach(function (a, b) {
            var j = parseInt(c[b + 1], 10);
            switch (a.toLowerCase().charAt(0)) {
                case"y":
                    d = j;
                    break;
                case"d":
                    f = j;
                    break;
                case"h":
                    g = j;
                    break;
                case"s":
                    i = j;
                    break;
                case"m":
                    g >= 0 ? h = j : e = j
            }
        }), i >= 0 && -1 == h && e >= 0 && (h = e, e = -1);
        var j = ("" + (d >= 0 ? d : (new Date).getFullYear())).slice(-4) + "-" + ("00" + (e >= 1 ? e : 1)).slice(-2) + "-" + ("00" + (f >= 1 ? f : 1)).slice(-2);
        7 == j.length && (j = "0" + j), 8 == j.length && (j = "20" + j);
        var k = ("00" + (g >= 0 ? g : 0)).slice(-2) + ":" + ("00" + (h >= 0 ? h : 0)).slice(-2) + ":" + ("00" + (i >= 0 ? i : 0)).slice(-2);
        return -1 == g && -1 == h && -1 == i ? j : -1 == d && -1 == e && -1 == f ? k : j + "T" + k
    }

    function o(a) {
        return "string" == typeof a ? i(a) : Array.isArray(a) ? k(a) : a
    }

    function p(a, b, c) {
        if (void 0 !== _l && _l.writeFileSync) return c ? _l.writeFileSync(a, b, c) : _l.writeFileSync(a, b);
        var d = "utf8" == c ? um(b) : b;
        if ("undefined" != typeof IE_SaveFile) return IE_SaveFile(d, a);
        if ("undefined" != typeof Blob) {
            var e = new Blob([o(d)], {type: "application/octet-stream"});
            if ("undefined" != typeof navigator && navigator.msSaveBlob) return navigator.msSaveBlob(e, a);
            if ("undefined" != typeof saveAs) return saveAs(e, a);
            if ("undefined" != typeof URL && "undefined" != typeof document && document.createElement && URL.createObjectURL) {
                var f = URL.createObjectURL(e);
                if ("object" == typeof chrome && "function" == typeof (chrome.downloads || {}).download) return URL.revokeObjectURL && "undefined" != typeof setTimeout && setTimeout(function () {
                    URL.revokeObjectURL(f)
                }, 6e4), chrome.downloads.download({url: f, filename: a, saveAs: !0});
                var g = document.createElement("a");
                if (null != g.download) return g.download = a, g.href = f, document.body.appendChild(g), g.click(), document.body.removeChild(g), URL.revokeObjectURL && "undefined" != typeof setTimeout && setTimeout(function () {
                    URL.revokeObjectURL(f)
                }, 6e4), f
            }
        }
        if ("undefined" != typeof $ && "undefined" != typeof File && "undefined" != typeof Folder) try {
            var h = File(a);
            return h.open("w"), h.encoding = "binary", Array.isArray(b) && (b = j(b)), h.write(b), h.close(), b
        } catch (a) {
            if (!a.message || !a.message.match(/onstruct/)) throw a
        }
        throw new Error("cannot save file " + a)
    }

    function q(a) {
        if (void 0 !== _l) return _l.readFileSync(a);
        if ("undefined" != typeof $ && "undefined" != typeof File && "undefined" != typeof Folder) try {
            var b = File(a);
            b.open("r"), b.encoding = "binary";
            var c = b.read();
            return b.close(), c
        } catch (a) {
            if (!a.message || !a.message.match(/onstruct/)) throw a
        }
        throw new Error("Cannot access file " + a)
    }

    function r(a) {
        for (var b = Object.keys(a), c = [], d = 0; d < b.length; ++d) a.hasOwnProperty(b[d]) && c.push(b[d]);
        return c
    }

    function s(a, b) {
        for (var c = [], d = r(a), e = 0; e !== d.length; ++e) null == c[a[d[e]][b]] && (c[a[d[e]][b]] = d[e]);
        return c
    }

    function t(a) {
        for (var b = [], c = r(a), d = 0; d !== c.length; ++d) b[a[c[d]]] = c[d];
        return b
    }

    function u(a) {
        for (var b = [], c = r(a), d = 0; d !== c.length; ++d) b[a[c[d]]] = parseInt(c[d], 10);
        return b
    }

    function v(a) {
        for (var b = [], c = r(a), d = 0; d !== c.length; ++d) null == b[a[c[d]]] && (b[a[c[d]]] = []), b[a[c[d]]].push(c[d]);
        return b
    }

    function w(a, b) {
        var c = a.getTime();
        return b && (c -= 1263168e5), (c - bm) / 864e5
    }

    function x(a) {
        var b = new Date;
        return b.setTime(24 * a * 60 * 60 * 1e3 + bm), b
    }

    function y(a) {
        var b = 0, c = 0, d = !1,
            e = a.match(/P([0-9\.]+Y)?([0-9\.]+M)?([0-9\.]+D)?T([0-9\.]+H)?([0-9\.]+M)?([0-9\.]+S)?/);
        if (!e) throw new Error("|" + a + "| is not an ISO8601 Duration");
        for (var f = 1; f != e.length; ++f) if (e[f]) {
            switch (c = 1, f > 3 && (d = !0), e[f].slice(e[f].length - 1)) {
                case"Y":
                    throw new Error("Unsupported ISO Duration Field: " + e[f].slice(e[f].length - 1));
                case"D":
                    c *= 24;
                case"H":
                    c *= 60;
                case"M":
                    if (!d) throw new Error("Unsupported ISO Duration Field: M");
                    c *= 60
            }
            b += c * parseInt(e[f], 10)
        }
        return b
    }

    function z(a, b) {
        var c = new Date(a);
        if (em) return b > 0 ? c.setTime(c.getTime() + 60 * c.getTimezoneOffset() * 1e3) : b < 0 && c.setTime(c.getTime() - 60 * c.getTimezoneOffset() * 1e3), c;
        if (a instanceof Date) return a;
        if (1917 == cm.getFullYear() && !isNaN(c.getFullYear())) {
            var d = c.getFullYear();
            return a.indexOf("" + d) > -1 ? c : (c.setFullYear(c.getFullYear() + 100), c)
        }
        var e = a.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"],
            f = new Date(+e[0], +e[1] - 1, +e[2], +e[3] || 0, +e[4] || 0, +e[5] || 0);
        return a.indexOf("Z") > -1 && (f = new Date(f.getTime() - 60 * f.getTimezoneOffset() * 1e3)), f
    }

    function A(a) {
        for (var b = "", c = 0; c != a.length; ++c) b += String.fromCharCode(a[c]);
        return b
    }

    function B(a) {
        if ("undefined" != typeof JSON && !Array.isArray(a)) return JSON.parse(JSON.stringify(a));
        if ("object" != typeof a || null == a) return a;
        if (a instanceof Date) return new Date(a.getTime());
        var b = {};
        for (var c in a) a.hasOwnProperty(c) && (b[c] = B(a[c]));
        return b
    }

    function C(a, b) {
        for (var c = ""; c.length < b;) c += a;
        return c
    }

    function D(a) {
        var b = Number(a);
        if (!isNaN(b)) return b;
        var c = 1, d = a.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function () {
            return c *= 100, ""
        });
        return isNaN(b = Number(d)) ? (d = d.replace(/[(](.*)[)]/, function (a, b) {
            return c = -c, b
        }), isNaN(b = Number(d)) ? b : b / c) : b / c
    }

    function E(a) {
        var b = new Date(a), c = new Date(NaN), d = b.getYear(), e = b.getMonth(), f = b.getDate();
        return isNaN(f) ? c : d < 0 || d > 8099 ? c : (e > 0 || f > 1) && 101 != d ? b : a.toLowerCase().match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/) ? b : a.match(/[^-0-9:,\/\\]/) ? c : b
    }

    function F(a, b, c) {
        if (fm || "string" == typeof b) return a.split(b);
        for (var d = a.split(b), e = [d[0]], f = 1; f < d.length; ++f) e.push(c), e.push(d[f]);
        return e
    }

    function G(a) {
        return a ? a.data ? Hl(a.data) : a.asNodeBuffer && Ml ? Hl(a.asNodeBuffer().toString("binary")) : a.asBinary ? Hl(a.asBinary()) : a._data && a._data.getContent ? Hl(A(Array.prototype.slice.call(a._data.getContent(), 0))) : null : null
    }

    function H(a) {
        if (!a) return null;
        if (a.data) return d(a.data);
        if (a.asNodeBuffer && Ml) return a.asNodeBuffer();
        if (a._data && a._data.getContent) {
            var b = a._data.getContent();
            return "string" == typeof b ? d(b) : Array.prototype.slice.call(b)
        }
        return null
    }

    function I(a) {
        return a && ".bin" === a.name.slice(-4) ? H(a) : G(a)
    }

    function J(a, b) {
        for (var c = r(a.files), d = b.toLowerCase(), e = d.replace(/\//g, "\\"), f = 0; f < c.length; ++f) {
            var g = c[f].toLowerCase();
            if (d == g || e == g) return a.files[c[f]]
        }
        return null
    }

    function K(a, b) {
        var c = J(a, b);
        if (null == c) throw new Error("Cannot find file " + b + " in zip");
        return c
    }

    function L(a, b, c) {
        if (!c) return I(K(a, b));
        if (!b) return null;
        try {
            return L(a, b)
        } catch (a) {
            return null
        }
    }

    function M(a, b, c) {
        if (!c) return G(K(a, b));
        if (!b) return null;
        try {
            return M(a, b)
        } catch (a) {
            return null
        }
    }

    function N(a) {
        for (var b = r(a.files), c = [], d = 0; d < b.length; ++d) "/" != b[d].slice(-1) && c.push(b[d]);
        return c.sort()
    }

    function O(a, b) {
        var c = b.split("/");
        "/" != b.slice(-1) && c.pop();
        for (var d = a.split("/"); 0 !== d.length;) {
            var e = d.shift();
            ".." === e ? c.pop() : "." !== e && c.push(e)
        }
        return c.join("/")
    }

    function P(a, b) {
        for (var c = {}, d = 0, e = 0; d !== a.length && (32 !== (e = a.charCodeAt(d)) && 10 !== e && 13 !== e); ++d) ;
        if (b || (c[0] = a.slice(0, d)), d === a.length) return c;
        var f = a.match(hm), g = 0, h = "", i = 0, j = "", k = "", l = 1;
        if (f) for (i = 0; i != f.length; ++i) {
            for (k = f[i], e = 0; e != k.length && 61 !== k.charCodeAt(e); ++e) ;
            for (j = k.slice(0, e).trim(); 32 == k.charCodeAt(e + 1);) ++e;
            for (l = 34 == (d = k.charCodeAt(e + 1)) || 39 == d ? 1 : 0, h = k.slice(e + 1 + l, k.length - l), g = 0; g != j.length && 58 !== j.charCodeAt(g); ++g) ;
            if (g === j.length) j.indexOf("_") > 0 && (j = j.slice(0, j.indexOf("_"))), c[j] = h, c[j.toLowerCase()] = h; else {
                var m = (5 === g && "xmlns" === j.slice(0, 5) ? "xmlns" : "") + j.slice(g + 1);
                if (c[m] && "ext" == j.slice(g - 3, g)) continue;
                c[m] = h, c[m.toLowerCase()] = h
            }
        }
        return c
    }

    function Q(a) {
        return a.replace(km, "<$1")
    }

    function R(a) {
        return (a + "").replace(om, function (a) {
            return mm[a]
        }).replace(pm, function (a) {
            return "_x" + ("000" + a.charCodeAt(0).toString(16)).slice(-4) + "_"
        })
    }

    function S(a) {
        return R(a).replace(/ /g, "_x0020_")
    }

    function T(a) {
        return (a + "").replace(om, function (a) {
            return mm[a]
        }).replace(/\n/g, "<br/>").replace(qm, function (a) {
            return "&#x" + ("000" + a.charCodeAt(0).toString(16)).slice(-4) + ";"
        })
    }

    function U(a) {
        return (a + "").replace(om, function (a) {
            return mm[a]
        }).replace(qm, function (a) {
            return "&#x" + a.charCodeAt(0).toString(16).toUpperCase() + ";"
        })
    }

    function V(a) {
        switch (a) {
            case 1:
            case!0:
            case"1":
            case"true":
            case"TRUE":
                return !0;
            default:
                return !1
        }
    }

    function W(a, b) {
        var c = P(a), d = a.match(Am(c.baseType)) || [], e = [];
        if (d.length != c.size) {
            if (b.WTF) throw new Error("unexpected vector length " + d.length + " != " + c.size);
            return e
        }
        return d.forEach(function (a) {
            var b = a.replace(Bm, "").match(Cm);
            b && e.push({v: tm(b[2]), t: b[1]})
        }), e
    }

    function X(a, b) {
        return "<" + a + (b.match(Dm) ? ' xml:space="preserve"' : "") + ">" + b + "</" + a + ">"
    }

    function Y(a) {
        return r(a).map(function (b) {
            return " " + b + '="' + a[b] + '"'
        }).join("")
    }

    function Z(a, b, c) {
        return "<" + a + (null != c ? Y(c) : "") + (null != b ? (b.match(Dm) ? ' xml:space="preserve"' : "") + ">" + b + "</" + a : "/") + ">"
    }

    function _(a, b) {
        try {
            return a.toISOString().replace(/\.\d*/, "")
        } catch (a) {
            if (b) throw a
        }
        return ""
    }

    function aa(a) {
        switch (typeof a) {
            case"string":
                return Z("vt:lpwstr", a);
            case"number":
                return Z((0 | a) == a ? "vt:i4" : "vt:r8", String(a));
            case"boolean":
                return Z("vt:bool", a ? "true" : "false")
        }
        if (a instanceof Date) return Z("vt:filetime", _(a));
        throw new Error("Unable to serialize " + a)
    }

    function ba(a, b) {
        for (var c = 1 - 2 * (a[b + 7] >>> 7), d = ((127 & a[b + 7]) << 4) + (a[b + 6] >>> 4 & 15), e = 15 & a[b + 6], f = 5; f >= 0; --f) e = 256 * e + a[b + f];
        return 2047 == d ? 0 == e ? c * (1 / 0) : NaN : (0 == d ? d = -1022 : (d -= 1023, e += Math.pow(2, 52)), c * Math.pow(2, d - 52) * e)
    }

    function ca(a, b, c) {
        var d = (b < 0 || 1 / b == -1 / 0 ? 1 : 0) << 7, e = 0, f = 0, g = d ? -b : b;
        isFinite(g) ? 0 == g ? e = f = 0 : (e = Math.floor(Math.log(g) / Math.LN2), f = g * Math.pow(2, 52 - e), e <= -1023 && (!isFinite(f) || f < Math.pow(2, 52)) ? e = -1022 : (f -= Math.pow(2, 52), e += 1023)) : (e = 2047, f = isNaN(b) ? 26985 : 0);
        for (var h = 0; h <= 5; ++h, f /= 256) a[c + h] = 255 & f;
        a[c + 6] = (15 & e) << 4 | 15 & f, a[c + 7] = e >> 4 | d
    }

    function da(a, b) {
        var c, d, e, f, g, h, i = "", j = [];
        switch (b) {
            case"dbcs":
                if (h = this.l, Ml && Buffer.isBuffer(this)) i = this.slice(this.l, this.l + 2 * a).toString("utf16le"); else for (g = 0; g < a; ++g) i += String.fromCharCode(an(this, h)), h += 2;
                a *= 2;
                break;
            case"utf8":
                i = Om(this, this.l, this.l + a);
                break;
            case"utf16le":
                a *= 2, i = Km(this, this.l, this.l + a);
                break;
            case"wstr":
                if ("undefined" == typeof cptable) return da.call(this, a, "dbcs");
                i = cptable.utils.decode(Al, this.slice(this.l, this.l + 2 * a)), a *= 2;
                break;
            case"lpstr-ansi":
                i = Qm(this, this.l), a = 4 + cn(this, this.l);
                break;
            case"lpstr-cp":
                i = Sm(this, this.l), a = 4 + cn(this, this.l);
                break;
            case"lpwstr":
                i = Um(this, this.l), a = 4 + 2 * cn(this, this.l);
                break;
            case"lpp4":
                a = 4 + cn(this, this.l), i = Fm(this, this.l), 2 & a && (a += 2);
                break;
            case"8lpp4":
                a = 4 + cn(this, this.l), i = Ym(this, this.l), 3 & a && (a += 4 - (3 & a));
                break;
            case"cstr":
                for (a = 0, i = ""; 0 !== (e = _m(this, this.l + a++));) j.push(Il(e));
                i = j.join("");
                break;
            case"_wstr":
                for (a = 0, i = ""; 0 !== (e = an(this, this.l + a));) j.push(Il(e)), a += 2;
                a += 2, i = j.join("");
                break;
            case"dbcs-cont":
                for (i = "", h = this.l, g = 0; g < a; ++g) {
                    if (this.lens && -1 !== this.lens.indexOf(h)) return e = _m(this, h), this.l = h + 1, f = da.call(this, a - g, e ? "dbcs-cont" : "sbcs-cont"), j.join("") + f;
                    j.push(Il(an(this, h))), h += 2
                }
                i = j.join(""), a *= 2;
                break;
            case"cpstr":
                if ("undefined" != typeof cptable) {
                    i = cptable.utils.decode(Al, this.slice(this.l, this.l + a));
                    break
                }
            case"sbcs-cont":
                for (i = "", h = this.l, g = 0; g != a; ++g) {
                    if (this.lens && -1 !== this.lens.indexOf(h)) return e = _m(this, h), this.l = h + 1, f = da.call(this, a - g, e ? "dbcs-cont" : "sbcs-cont"), j.join("") + f;
                    j.push(Il(_m(this, h))), h += 1
                }
                i = j.join("");
                break;
            default:
                switch (a) {
                    case 1:
                        return c = _m(this, this.l), this.l++, c;
                    case 2:
                        return c = ("i" === b ? bn : an)(this, this.l), this.l += 2, c;
                    case 4:
                    case-4:
                        return "i" === b || 0 == (128 & this[this.l + 3]) ? (c = (a > 0 ? dn : en)(this, this.l), this.l += 4, c) : (d = cn(this, this.l), this.l += 4, d);
                    case 8:
                    case-8:
                        if ("f" === b) return d = 8 == a ? Wm(this, this.l) : Wm([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, d;
                        a = 8;
                    case 16:
                        i = Mm(this, this.l, a)
                }
        }
        return this.l += a, i
    }

    function ea(a, b, c) {
        var d = 0, e = 0;
        if ("dbcs" === c) {
            for (e = 0; e != b.length; ++e) hn(this, b.charCodeAt(e), this.l + 2 * e);
            d = 2 * b.length
        } else if ("sbcs" === c) {
            for (b = b.replace(/[^\x00-\x7F]/g, "_"), e = 0; e != b.length; ++e) this[this.l + e] = 255 & b.charCodeAt(e);
            d = b.length
        } else {
            if ("hex" === c) {
                for (; e < a; ++e) this[this.l++] = parseInt(b.slice(2 * e, 2 * e + 2), 16) || 0;
                return this
            }
            if ("utf16le" === c) {
                var f = Math.min(this.l + a, this.length);
                for (e = 0; e < Math.min(b.length, a); ++e) {
                    var g = b.charCodeAt(e);
                    this[this.l++] = 255 & g, this[this.l++] = g >> 8
                }
                for (; this.l < f;) this[this.l++] = 0;
                return this
            }
            switch (a) {
                case 1:
                    d = 1, this[this.l] = 255 & b;
                    break;
                case 2:
                    d = 2, this[this.l] = 255 & b, b >>>= 8, this[this.l + 1] = 255 & b;
                    break;
                case 3:
                    d = 3, this[this.l] = 255 & b, b >>>= 8, this[this.l + 1] = 255 & b, b >>>= 8, this[this.l + 2] = 255 & b;
                    break;
                case 4:
                    d = 4, fn(this, b, this.l);
                    break;
                case 8:
                    if (d = 8, "f" === c) {
                        ca(this, b, this.l);
                        break
                    }
                case 16:
                    break;
                case-4:
                    d = 4, gn(this, b, this.l)
            }
        }
        return this.l += d, this
    }

    function fa(a, b) {
        var c = Mm(this, this.l, a.length >> 1);
        if (c !== a) throw new Error(b + "Expected " + a + " saw " + c);
        this.l += a.length >> 1
    }

    function ga(a, b) {
        a.l = b, a.read_shift = da, a.chk = fa, a.write_shift = ea
    }

    function ha(a, b) {
        a.l += b
    }

    function ia(a) {
        var b = g(a);
        return ga(b, 0), b
    }

    function ja(a, b, c) {
        if (a) {
            var d, e, f;
            ga(a, a.l || 0);
            for (var g = a.length, h = 0, i = 0; a.l < g;) {
                h = a.read_shift(1), 128 & h && (h = (127 & h) + ((127 & a.read_shift(1)) << 7));
                var j = nq[h] || nq[65535];
                for (d = a.read_shift(1), f = 127 & d, e = 1; e < 4 && 128 & d; ++e) f += (127 & (d = a.read_shift(1))) << 7 * e;
                i = a.l + f;
                var k = (j.f || ha)(a, f, c);
                if (a.l = i, b(k, j.n, h)) return
            }
        }
    }

    function ka() {
        var a = [], b = Ml ? 256 : 2048, c = function (a) {
            var b = ia(a);
            return ga(b, 0), b
        }, d = c(b), e = function () {
            d && (d.length > d.l && (d = d.slice(0, d.l), d.l = d.length), d.length > 0 && a.push(d), d = null)
        }, f = function (a) {
            return d && a < d.length - d.l ? d : (e(), d = c(Math.max(a + 1, b)))
        }, g = function () {
            return e(), Im([a])
        };
        return {
            next: f, push: function (a) {
                e(), d = a, null == d.l && (d.l = d.length), f(b)
            }, end: g, _bufs: a
        }
    }

    function la(a, b, c, d) {
        var e, f = +oq[b];
        if (!isNaN(f)) {
            d || (d = nq[f].p || (c || []).length || 0), e = 1 + (f >= 128 ? 1 : 0) + 1, d >= 128 && ++e, d >= 16384 && ++e, d >= 2097152 && ++e;
            var g = a.next(e);
            f <= 127 ? g.write_shift(1, f) : (g.write_shift(1, 128 + (127 & f)), g.write_shift(1, f >> 7));
            for (var h = 0; 4 != h; ++h) {
                if (!(d >= 128)) {
                    g.write_shift(1, d);
                    break
                }
                g.write_shift(1, 128 + (127 & d)), d >>= 7
            }
            d > 0 && $m(c) && a.push(c)
        }
    }

    function ma(a, b, c) {
        var d = B(a);
        if (b.s ? (d.cRel && (d.c += b.s.c), d.rRel && (d.r += b.s.r)) : (d.cRel && (d.c += b.c), d.rRel && (d.r += b.r)), !c || c.biff < 12) {
            for (; d.c >= 256;) d.c -= 256;
            for (; d.r >= 65536;) d.r -= 65536
        }
        return d
    }

    function na(a, b, c) {
        var d = B(a);
        return d.s = ma(d.s, b.s, c), d.e = ma(d.e, b.s, c), d
    }

    function oa(a, b) {
        a.cRel && a.c < 0 && (a = B(a), a.c += b > 8 ? 16384 : 256), a.rRel && a.r < 0 && (a = B(a), a.r += b > 8 ? 1048576 : b > 5 ? 65536 : 16384);
        var c = Aa(a);
        return 0 === a.cRel && (c = wa(c)), 0 === a.rRel && (c = sa(c)), c
    }

    function pa(a, b) {
        return 0 != a.s.r || a.s.rRel || a.e.r != (b.biff >= 12 ? 1048575 : b.biff >= 8 ? 65536 : 16384) || a.e.rRel ? 0 != a.s.c || a.s.cRel || a.e.c != (b.biff >= 12 ? 65535 : 255) || a.e.cRel ? oa(a.s, b.biff) + ":" + oa(a.e, b.biff) : (a.s.rRel ? "" : "$") + ra(a.s.r) + ":" + (a.e.rRel ? "" : "$") + ra(a.e.r) : (a.s.cRel ? "" : "$") + va(a.s.c) + ":" + (a.e.cRel ? "" : "$") + va(a.e.c)
    }

    function qa(a) {
        return parseInt(ta(a), 10) - 1
    }

    function ra(a) {
        return "" + (a + 1)
    }

    function sa(a) {
        return a.replace(/([A-Z]|^)(\d+)$/, "$1$$$2")
    }

    function ta(a) {
        return a.replace(/\$(\d+)$/, "$1")
    }

    function ua(a) {
        for (var b = xa(a), c = 0, d = 0; d !== b.length; ++d) c = 26 * c + b.charCodeAt(d) - 64;
        return c - 1
    }

    function va(a) {
        var b = "";
        for (++a; a; a = Math.floor((a - 1) / 26)) b = String.fromCharCode((a - 1) % 26 + 65) + b;
        return b
    }

    function wa(a) {
        return a.replace(/^([A-Z])/, "$$$1")
    }

    function xa(a) {
        return a.replace(/^\$([A-Z])/, "$1")
    }

    function ya(a) {
        return a.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",")
    }

    function za(a) {
        var b = ya(a);
        return {c: ua(b[0]), r: qa(b[1])}
    }

    function Aa(a) {
        return va(a.c) + ra(a.r)
    }

    function Ba(a) {
        var b = a.split(":").map(za);
        return {s: b[0], e: b[b.length - 1]}
    }

    function Ca(a, b) {
        return void 0 === b || "number" == typeof b ? Ca(a.s, a.e) : ("string" != typeof a && (a = Aa(a)), "string" != typeof b && (b = Aa(b)), a == b ? a : a + ":" + b)
    }

    function Da(a) {
        var b = {s: {c: 0, r: 0}, e: {c: 0, r: 0}}, c = 0, d = 0, e = 0, f = a.length;
        for (c = 0; d < f && !((e = a.charCodeAt(d) - 64) < 1 || e > 26); ++d) c = 26 * c + e;
        for (b.s.c = --c, c = 0; d < f && !((e = a.charCodeAt(d) - 48) < 0 || e > 9); ++d) c = 10 * c + e;
        if (b.s.r = --c, d === f || 58 === a.charCodeAt(++d)) return b.e.c = b.s.c, b.e.r = b.s.r, b;
        for (c = 0; d != f && !((e = a.charCodeAt(d) - 64) < 1 || e > 26); ++d) c = 26 * c + e;
        for (b.e.c = --c, c = 0; d != f && !((e = a.charCodeAt(d) - 48) < 0 || e > 9); ++d) c = 10 * c + e;
        return b.e.r = --c, b
    }

    function Ea(a, b) {
        var c = "d" == a.t && b instanceof Date;
        if (null != a.z) try {
            return a.w = Tl.format(a.z, c ? w(b) : b)
        } catch (a) {
        }
        try {
            return a.w = Tl.format((a.XF || {}).numFmtId || (c ? 14 : 0), c ? w(b) : b)
        } catch (a) {
            return "" + b
        }
    }

    function Fa(a, b, c) {
        return null == a || null == a.t || "z" == a.t ? "" : void 0 !== a.w ? a.w : ("d" == a.t && !a.z && c && c.dateNF && (a.z = c.dateNF), void 0 == b ? Ea(a, a.v) : Ea(a, b))
    }

    function Ga(a, b) {
        var c = b && b.sheet ? b.sheet : "Sheet1", d = {};
        return d[c] = a, {SheetNames: [c], Sheets: d}
    }

    function Ha(a, b, c) {
        var d = c || {}, e = a ? Array.isArray(a) : d.dense;
        null != Jl && null == e && (e = Jl);
        var f = a || (e ? [] : {}), g = 0, h = 0;
        if (f && null != d.origin) if ("number" == typeof d.origin) g = d.origin; else {
            var i = "string" == typeof d.origin ? za(d.origin) : d.origin;
            g = i.r, h = i.c
        }
        var j = {s: {c: 1e7, r: 1e7}, e: {c: 0, r: 0}};
        if (f["!ref"]) {
            var k = Da(f["!ref"]);
            j.s.c = k.s.c, j.s.r = k.s.r, j.e.c = Math.max(j.e.c, k.e.c), j.e.r = Math.max(j.e.r, k.e.r), -1 == g && (j.e.r = g = k.e.r + 1)
        }
        for (var l = 0; l != b.length; ++l) if (b[l]) {
            if (!Array.isArray(b[l])) throw new Error("aoa_to_sheet expects an array of arrays");
            for (var m = 0; m != b[l].length; ++m) if (void 0 !== b[l][m]) {
                var n = {v: b[l][m]}, o = g + l, p = h + m;
                if (j.s.r > o && (j.s.r = o), j.s.c > p && (j.s.c = p), j.e.r < o && (j.e.r = o), j.e.c < p && (j.e.c = p), !b[l][m] || "object" != typeof b[l][m] || Array.isArray(b[l][m]) || b[l][m] instanceof Date) if (Array.isArray(n.v) && (n.f = b[l][m][1], n.v = n.v[0]), null === n.v) if (n.f) n.t = "n"; else {
                    if (!d.sheetStubs) continue;
                    n.t = "z"
                } else "number" == typeof n.v ? n.t = "n" : "boolean" == typeof n.v ? n.t = "b" : n.v instanceof Date ? (n.z = d.dateNF || Tl._table[14], d.cellDates ? (n.t = "d", n.w = Tl.format(n.z, w(n.v))) : (n.t = "n", n.v = w(n.v), n.w = Tl.format(n.z, n.v))) : n.t = "s"; else n = b[l][m];
                if (e) f[o] || (f[o] = []), f[o][p] = n; else {
                    var q = Aa({c: p, r: o});
                    f[q] = n
                }
            }
        }
        return j.s.c < 1e7 && (f["!ref"] = Ca(j)), f
    }

    function Ia(a, b) {
        return Ha(null, a, b)
    }

    function Ja(a, b) {
        return b || (b = ia(4)), b.write_shift(4, a), b
    }

    function Ka(a) {
        var b = a.read_shift(4);
        return 0 === b ? "" : a.read_shift(b, "dbcs")
    }

    function La(a, b) {
        var c = !1;
        return null == b && (c = !0, b = ia(4 + 2 * a.length)), b.write_shift(4, a.length), a.length > 0 && b.write_shift(0, a, "dbcs"), c ? b.slice(0, b.l) : b
    }

    function Ma(a) {
        return {ich: a.read_shift(2), ifnt: a.read_shift(2)}
    }

    function Na(a, b) {
        return b || (b = ia(4)), b.write_shift(2, a.ich || 0), b.write_shift(2, a.ifnt || 0), b
    }

    function Oa(a, b) {
        var c = a.l, d = a.read_shift(1), e = Ka(a), f = [], g = {t: e, h: e};
        if (0 != (1 & d)) {
            for (var h = a.read_shift(4), i = 0; i != h; ++i) f.push(Ma(a));
            g.r = f
        } else g.r = [{ich: 0, ifnt: 0}];
        return a.l = c + b, g
    }

    function Pa(a, b) {
        var c = !1;
        return null == b && (c = !0, b = ia(15 + 4 * a.t.length)), b.write_shift(1, 0), La(a.t, b), c ? b.slice(0, b.l) : b
    }

    function Qa(a, b) {
        var c = !1;
        return null == b && (c = !0, b = ia(23 + 4 * a.t.length)), b.write_shift(1, 1), La(a.t, b), b.write_shift(4, 1), Na({
            ich: 0,
            ifnt: 0
        }, b), c ? b.slice(0, b.l) : b
    }

    function Ra(a) {
        var b = a.read_shift(4), c = a.read_shift(2);
        return c += a.read_shift(1) << 16, a.l++, {c: b, iStyleRef: c}
    }

    function Sa(a, b) {
        return null == b && (b = ia(8)), b.write_shift(-4, a.c), b.write_shift(3, a.iStyleRef || a.s), b.write_shift(1, 0), b
    }

    function Ta(a) {
        var b = a.read_shift(4);
        return 0 === b || 4294967295 === b ? "" : a.read_shift(b, "dbcs")
    }

    function Ua(a, b) {
        var c = !1;
        return null == b && (c = !0, b = ia(127)), b.write_shift(4, a.length > 0 ? a.length : 4294967295), a.length > 0 && b.write_shift(0, a, "dbcs"), c ? b.slice(0, b.l) : b
    }

    function Va(a) {
        var b = a.slice(a.l, a.l + 4), c = 1 & b[0], d = 2 & b[0];
        a.l += 4, b[0] &= 252;
        var e = 0 === d ? Wm([0, 0, 0, 0, b[0], b[1], b[2], b[3]], 0) : dn(b, 0) >> 2;
        return c ? e / 100 : e
    }

    function Wa(a, b) {
        null == b && (b = ia(4));
        var c = 0, d = 0, e = 100 * a;
        if (a == (0 | a) && a >= -(1 << 29) && a < 1 << 29 ? d = 1 : e == (0 | e) && e >= -(1 << 29) && e < 1 << 29 && (d = 1, c = 1), !d) throw new Error("unsupported RkNumber " + a);
        b.write_shift(-4, ((c ? e : a) << 2) + (c + 2))
    }

    function Xa(a) {
        var b = {s: {}, e: {}};
        return b.s.r = a.read_shift(4), b.e.r = a.read_shift(4), b.s.c = a.read_shift(4), b.e.c = a.read_shift(4), b
    }

    function Ya(a, b) {
        return b || (b = ia(16)), b.write_shift(4, a.s.r), b.write_shift(4, a.e.r), b.write_shift(4, a.s.c), b.write_shift(4, a.e.c), b
    }

    function Za(a) {
        return a.read_shift(8, "f")
    }

    function $a(a, b) {
        return (b || ia(8)).write_shift(8, a, "f")
    }

    function _a(a) {
        var b = {}, c = a.read_shift(1), d = c >>> 1, e = a.read_shift(1), f = a.read_shift(2, "i"),
            g = a.read_shift(1), h = a.read_shift(1), i = a.read_shift(1);
        switch (a.l++, d) {
            case 0:
                b.auto = 1;
                break;
            case 1:
                b.index = e;
                var j = On[e];
                j && (b.rgb = Ke(j));
                break;
            case 2:
                b.rgb = Ke([g, h, i]);
                break;
            case 3:
                b.theme = e
        }
        return 0 != f && (b.tint = f > 0 ? f / 32767 : f / 32768), b
    }

    function ab(a, b) {
        if (b || (b = ia(8)), !a || a.auto) return b.write_shift(4, 0), b.write_shift(4, 0), b;
        a.index ? (b.write_shift(1, 2), b.write_shift(1, a.index)) : a.theme ? (b.write_shift(1, 6), b.write_shift(1, a.theme)) : (b.write_shift(1, 5), b.write_shift(1, 0));
        var c = a.tint || 0;
        if (c > 0 ? c *= 32767 : c < 0 && (c *= 32768), b.write_shift(2, c), a.rgb) {
            var d = a.rgb || "FFFFFF";
            b.write_shift(1, parseInt(d.slice(0, 2), 16)), b.write_shift(1, parseInt(d.slice(2, 4), 16)), b.write_shift(1, parseInt(d.slice(4, 6), 16)), b.write_shift(1, 255)
        } else b.write_shift(2, 0), b.write_shift(1, 0), b.write_shift(1, 0);
        return b
    }

    function bb(a) {
        var b = a.read_shift(1);
        return a.l++, {
            fItalic: 2 & b,
            fStrikeout: 8 & b,
            fOutline: 16 & b,
            fShadow: 32 & b,
            fCondense: 64 & b,
            fExtend: 128 & b
        }
    }

    function cb(a, b) {
        b || (b = ia(2));
        var c = (a.italic ? 2 : 0) | (a.strike ? 8 : 0) | (a.outline ? 16 : 0) | (a.shadow ? 32 : 0) | (a.condense ? 64 : 0) | (a.extend ? 128 : 0);
        return b.write_shift(1, c), b.write_shift(1, 0), b
    }

    function db(a, b) {
        var c = {2: "BITMAP", 3: "METAFILEPICT", 8: "DIB", 14: "ENHMETAFILE"}, d = a.read_shift(4);
        switch (d) {
            case 0:
                return "";
            case 4294967295:
            case 4294967294:
                return c[a.read_shift(4)] || ""
        }
        if (d > 400) throw new Error("Unsupported Clipboard: " + d.toString(16));
        return a.l -= 4, a.read_shift(0, 1 == b ? "lpstr" : "lpwstr")
    }

    function eb(a) {
        return db(a, 1)
    }

    function fb(a) {
        return db(a, 2)
    }

    function gb(a) {
        return a.map(function (a) {
            return [a >> 16 & 255, a >> 8 & 255, 255 & a]
        })
    }

    function hb() {
        return {
            workbooks: [],
            sheets: [],
            charts: [],
            dialogs: [],
            macros: [],
            rels: [],
            strs: [],
            comments: [],
            links: [],
            coreprops: [],
            extprops: [],
            custprops: [],
            themes: [],
            styles: [],
            calcchains: [],
            vba: [],
            drawings: [],
            TODO: [],
            xmlns: ""
        }
    }

    function ib(a) {
        var b = hb();
        if (!a || !a.match) return b;
        var c = {};
        if ((a.match(im) || []).forEach(function (a) {
            var d = P(a);
            switch (d[0].replace(jm, "<")) {
                case"<?xml":
                    break;
                case"<Types":
                    b.xmlns = d["xmlns" + (d[0].match(/<(\w+):/) || ["", ""])[1]];
                    break;
                case"<Default":
                    c[d.Extension] = d.ContentType;
                    break;
                case"<Override":
                    void 0 !== b[Pn[d.ContentType]] && b[Pn[d.ContentType]].push(d.PartName)
            }
        }), b.xmlns !== Em.CT) throw new Error("Unknown Namespace: " + b.xmlns);
        return b.calcchain = b.calcchains.length > 0 ? b.calcchains[0] : "", b.sst = b.strs.length > 0 ? b.strs[0] : "", b.style = b.styles.length > 0 ? b.styles[0] : "", b.defaults = c, delete b.calcchains, b
    }

    function jb(a, b) {
        var c, d = [];
        d[d.length] = gm, d[d.length] = Sn, d = d.concat(Tn);
        var e = function (e) {
            a[e] && a[e].length > 0 && (c = a[e][0], d[d.length] = Z("Override", null, {
                PartName: ("/" == c[0] ? "" : "/") + c,
                ContentType: Qn[e][b.bookType || "xlsx"]
            }))
        }, f = function (c) {
            (a[c] || []).forEach(function (a) {
                d[d.length] = Z("Override", null, {
                    PartName: ("/" == a[0] ? "" : "/") + a,
                    ContentType: Qn[c][b.bookType || "xlsx"]
                })
            })
        }, g = function (b) {
            (a[b] || []).forEach(function (a) {
                d[d.length] = Z("Override", null, {PartName: ("/" == a[0] ? "" : "/") + a, ContentType: Rn[b][0]})
            })
        };
        return e("workbooks"), f("sheets"), f("charts"), g("themes"), ["strs", "styles"].forEach(e), ["coreprops", "extprops", "custprops"].forEach(g), g("vba"), g("comments"), g("drawings"), d.length > 2 && (d[d.length] = "</Types>", d[1] = d[1].replace("/>", ">")), d.join("")
    }

    function kb(a) {
        var b = a.lastIndexOf("/");
        return a.slice(0, b + 1) + "_rels/" + a.slice(b + 1) + ".rels"
    }

    function lb(a, b) {
        if (!a) return a;
        "/" !== b.charAt(0) && (b = "/" + b);
        var c = {}, d = {};
        return (a.match(im) || []).forEach(function (a) {
            var e = P(a);
            if ("<Relationship" === e[0]) {
                var f = {};
                f.Type = e.Type, f.Target = e.Target, f.Id = e.Id, f.TargetMode = e.TargetMode;
                var g = "External" === e.TargetMode ? e.Target : O(e.Target, b);
                c[g] = f, d[e.Id] = f
            }
        }), c["!id"] = d, c
    }

    function mb(a) {
        var b = [gm, Vn];
        return r(a["!id"]).forEach(function (c) {
            b[b.length] = Z("Relationship", null, a["!id"][c])
        }), b.length > 2 && (b[b.length] = "</Relationships>", b[1] = b[1].replace("/>", ">")), b.join("")
    }

    function nb(a, b, c, d, e) {
        if (e || (e = {}), a["!id"] || (a["!id"] = {}), b < 0) for (b = 1; a["!id"]["rId" + b]; ++b) ;
        if (e.Id = "rId" + b, e.Type = d, e.Target = c, e.Type == Un.HLINK && (e.TargetMode = "External"), a["!id"][e.Id]) throw new Error("Cannot rewrite rId " + b);
        return a["!id"][e.Id] = e, a[("/" + e.Target).replace("//", "/")] = e, b
    }

    function ob(a, b) {
        for (var c, d, e = Vj(a); c = lq.exec(e);) switch (c[3]) {
            case"manifest":
                break;
            case"file-entry":
                if (d = P(c[0], !1), "/" == d.path && d.type !== Wn) throw new Error("This OpenDocument is not a spreadsheet");
                break;
            case"encryption-data":
            case"algorithm":
            case"start-key-generation":
            case"key-derivation":
                throw new Error("Unsupported ODS Encryption");
            default:
                if (b && b.WTF) throw c
        }
    }

    function pb(a) {
        var b = [gm];
        b.push('<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">\n'), b.push('  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>\n');
        for (var c = 0; c < a.length; ++c) b.push('  <manifest:file-entry manifest:full-path="' + a[c][0] + '" manifest:media-type="' + a[c][1] + '"/>\n');
        return b.push("</manifest:manifest>"), b.join("")
    }

    function qb(a, b, c) {
        return ['  <rdf:Description rdf:about="' + a + '">\n', '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (c || "odf") + "#" + b + '"/>\n', "  </rdf:Description>\n"].join("")
    }

    function rb(a, b) {
        return ['  <rdf:Description rdf:about="' + a + '">\n', '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + b + '"/>\n', "  </rdf:Description>\n"].join("")
    }

    function sb(a) {
        var b = [gm];
        b.push('<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n');
        for (var c = 0; c != a.length; ++c) b.push(qb(a[c][0], a[c][1])), b.push(rb("", a[c][0]));
        return b.push(qb("", "Document", "pkg")), b.push("</rdf:RDF>"), b.join("")
    }

    function tb(a) {
        var b = {};
        a = tm(a);
        for (var c = 0; c < Yn.length; ++c) {
            var d = Yn[c], e = a.match(Zn[c]);
            null != e && e.length > 0 && (b[d[1]] = e[1]), "date" === d[2] && b[d[1]] && (b[d[1]] = z(b[d[1]]))
        }
        return b
    }

    function ub(a, b, c, d, e) {
        null == e[a] && null != b && "" !== b && (e[a] = b, d[d.length] = c ? Z(a, b, c) : X(a, b))
    }

    function vb(a, b) {
        var c = b || {}, d = [gm, $n], e = {};
        if (!a && !c.Props) return d.join("");
        a && (null != a.CreatedDate && ub("dcterms:created", "string" == typeof a.CreatedDate ? a.CreatedDate : _(a.CreatedDate, c.WTF), {"xsi:type": "dcterms:W3CDTF"}, d, e), null != a.ModifiedDate && ub("dcterms:modified", "string" == typeof a.ModifiedDate ? a.ModifiedDate : _(a.ModifiedDate, c.WTF), {"xsi:type": "dcterms:W3CDTF"}, d, e));
        for (var f = 0; f != Yn.length; ++f) {
            var g = Yn[f], h = c.Props && null != c.Props[g[1]] ? c.Props[g[1]] : a ? a[g[1]] : null;
            !0 === h ? h = "1" : !1 === h ? h = "0" : "number" == typeof h && (h = String(h)), null != h && ub(g[0], h, null, d, e)
        }
        return d.length > 2 && (d[d.length] = "</cp:coreProperties>", d[1] = d[1].replace("/>", ">")), d.join("")
    }

    function wb(a, b, c, d) {
        var e = [];
        if ("string" == typeof a) e = W(a, d); else for (var f = 0; f < a.length; ++f) e = e.concat(a[f].map(function (a) {
            return {v: a}
        }));
        var g = "string" == typeof b ? W(b, d).map(function (a) {
            return a.v
        }) : b, h = 0, i = 0;
        if (g.length > 0) for (var j = 0; j !== e.length; j += 2) {
            switch (i = +e[j + 1].v, e[j].v) {
                case"Worksheets":
                case"工作表":
                case"Листы":
                case"أوراق العمل":
                case"ワークシート":
                case"גליונות עבודה":
                case"Arbeitsblätter":
                case"Çalışma Sayfaları":
                case"Feuilles de calcul":
                case"Fogli di lavoro":
                case"Folhas de cálculo":
                case"Planilhas":
                case"Regneark":
                case"Werkbladen":
                    c.Worksheets = i, c.SheetNames = g.slice(h, h + i);
                    break;
                case"Named Ranges":
                case"名前付き一覧":
                case"Benannte Bereiche":
                case"Navngivne områder":
                    c.NamedRanges = i, c.DefinedNames = g.slice(h, h + i);
                    break;
                case"Charts":
                case"Diagramme":
                    c.Chartsheets = i, c.ChartNames = g.slice(h, h + i)
            }
            h += i
        }
    }

    function xb(a, b, c) {
        var d = {};
        return b || (b = {}), a = tm(a), _n.forEach(function (c) {
            switch (c[2]) {
                case"string":
                    b[c[1]] = (a.match(ym(c[0])) || [])[1];
                    break;
                case"bool":
                    b[c[1]] = "true" === (a.match(ym(c[0])) || [])[1];
                    break;
                case"raw":
                    var e = a.match(new RegExp("<" + c[0] + "[^>]*>([\\s\\S]*?)</" + c[0] + ">"));
                    e && e.length > 0 && (d[c[1]] = e[1])
            }
        }), d.HeadingPairs && d.TitlesOfParts && wb(d.HeadingPairs, d.TitlesOfParts, b, c), b
    }

    function yb(a) {
        var b = [], c = Z;
        return a || (a = {}), a.Application = "SheetJS", b[b.length] = gm, b[b.length] = bo, _n.forEach(function (d) {
            if (void 0 !== a[d[1]]) {
                var e;
                switch (d[2]) {
                    case"string":
                        e = String(a[d[1]]);
                        break;
                    case"bool":
                        e = a[d[1]] ? "true" : "false"
                }
                void 0 !== e && (b[b.length] = c(d[0], e))
            }
        }), b[b.length] = c("HeadingPairs", c("vt:vector", c("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + c("vt:variant", c("vt:i4", String(a.Worksheets))), {
            size: 2,
            baseType: "variant"
        })), b[b.length] = c("TitlesOfParts", c("vt:vector", a.SheetNames.map(function (a) {
            return "<vt:lpstr>" + R(a) + "</vt:lpstr>"
        }).join(""), {
            size: a.Worksheets,
            baseType: "lpstr"
        })), b.length > 2 && (b[b.length] = "</Properties>", b[1] = b[1].replace("/>", ">")), b.join("")
    }

    function zb(a, b) {
        var c = {}, d = "", e = a.match(co);
        if (e) for (var f = 0; f != e.length; ++f) {
            var g = e[f], h = P(g);
            switch (h[0]) {
                case"<?xml":
                case"<Properties":
                    break;
                case"<property":
                    d = h.name;
                    break;
                case"</property>":
                    d = null;
                    break;
                default:
                    if (0 === g.indexOf("<vt:")) {
                        var i = g.split(">"), j = i[0].slice(4), k = i[1];
                        switch (j) {
                            case"lpstr":
                            case"bstr":
                            case"lpwstr":
                                c[d] = nm(k);
                                break;
                            case"bool":
                                c[d] = V(k);
                                break;
                            case"i1":
                            case"i2":
                            case"i4":
                            case"i8":
                            case"int":
                            case"uint":
                                c[d] = parseInt(k, 10);
                                break;
                            case"r4":
                            case"r8":
                            case"decimal":
                                c[d] = parseFloat(k);
                                break;
                            case"filetime":
                            case"date":
                                c[d] = z(k);
                                break;
                            case"cy":
                            case"error":
                                c[d] = nm(k);
                                break;
                            default:
                                if ("/" == j.slice(-1)) break;
                                b.WTF && "undefined" != typeof console && console.warn("Unexpected", g, j, i)
                        }
                    } else if ("</" === g.slice(0, 2)) ; else if (b.WTF) throw new Error(g)
            }
        }
        return c
    }

    function Ab(a) {
        var b = [gm, eo];
        if (!a) return b.join("");
        var c = 1;
        return r(a).forEach(function (d) {
            ++c, b[b.length] = Z("property", aa(a[d]), {
                fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
                pid: c,
                name: d
            })
        }), b.length > 2 && (b[b.length] = "</Properties>", b[1] = b[1].replace("/>", ">")), b.join("")
    }

    function Bb(a, b, c) {
        b = go[b] || b, a[b] = c
    }

    function Cb(a, b) {
        var c = [];
        return r(fo).map(function (a) {
            for (var b = 0; b < Yn.length; ++b) if (Yn[b][1] == a) return Yn[b];
            for (b = 0; b < _n.length; ++b) if (_n[b][1] == a) return _n[b];
            throw a
        }).forEach(function (d) {
            if (null != a[d[1]]) {
                var e = b && b.Props && null != b.Props[d[1]] ? b.Props[d[1]] : a[d[1]];
                switch (d[2]) {
                    case"date":
                        e = new Date(e).toISOString().replace(/\.\d*Z/, "Z")
                }
                "number" == typeof e ? e = String(e) : !0 === e || !1 === e ? e = e ? "1" : "0" : e instanceof Date && (e = new Date(e).toISOString().replace(/\.\d*Z/, "")), c.push(X(fo[d[1]] || d[1], e))
            }
        }), Z("DocumentProperties", c.join(""), {xmlns: Hm.o})
    }

    function Db(a, b) {
        var c = ["Worksheets", "SheetNames"], d = "CustomDocumentProperties", e = [];
        return a && r(a).forEach(function (b) {
            if (a.hasOwnProperty(b)) {
                for (var d = 0; d < Yn.length; ++d) if (b == Yn[d][1]) return;
                for (d = 0; d < _n.length; ++d) if (b == _n[d][1]) return;
                for (d = 0; d < c.length; ++d) if (b == c[d]) return;
                var f = a[b], g = "string";
                "number" == typeof f ? (g = "float", f = String(f)) : !0 === f || !1 === f ? (g = "boolean", f = f ? "1" : "0") : f = String(f), e.push(Z(S(b), f, {"dt:dt": g}))
            }
        }), b && r(b).forEach(function (c) {
            if (b.hasOwnProperty(c) && (!a || !a.hasOwnProperty(c))) {
                var d = b[c], f = "string";
                "number" == typeof d ? (f = "float", d = String(d)) : !0 === d || !1 === d ? (f = "boolean", d = d ? "1" : "0") : d instanceof Date ? (f = "dateTime.tz", d = d.toISOString()) : d = String(d), e.push(Z(S(c), d, {"dt:dt": f}))
            }
        }), "<" + d + ' xmlns="' + Hm.o + '">' + e.join("") + "</" + d + ">"
    }

    function Eb(a) {
        var b = a.read_shift(4), c = a.read_shift(4);
        return new Date(1e3 * (c / 1e7 * Math.pow(2, 32) + b / 1e7 - 11644473600)).toISOString().replace(/\.000/, "")
    }

    function Fb(a) {
        var b = "string" == typeof a ? new Date(Date.parse(a)) : a, c = b.getTime() / 1e3 + 11644473600,
            d = c % Math.pow(2, 32), e = (c - d) / Math.pow(2, 32);
        d *= 1e7, e *= 1e7;
        var f = d / Math.pow(2, 32) | 0;
        f > 0 && (d %= Math.pow(2, 32), e += f);
        var g = ia(8);
        return g.write_shift(4, d), g.write_shift(4, e), g
    }

    function Gb(a, b, c) {
        var d = a.l, e = a.read_shift(0, "lpstr-cp");
        if (c) for (; a.l - d & 3;) ++a.l;
        return e
    }

    function Hb(a, b, c) {
        var d = a.read_shift(0, "lpwstr");
        return c && (a.l += 4 - (d.length + 1 & 3) & 3), d
    }

    function Ib(a, b, c) {
        return 31 === b ? Hb(a) : Gb(a, b, c)
    }

    function Jb(a, b, c) {
        return Ib(a, b, !1 === c ? 0 : 4)
    }

    function Kb(a, b) {
        if (!b) throw new Error("VtUnalignedString must have positive length");
        return Ib(a, b, 0)
    }

    function Lb(a) {
        for (var b = a.read_shift(4), c = [], d = 0; d != b; ++d) c[d] = a.read_shift(0, "lpstr-cp").replace(Rl, "");
        return c
    }

    function Mb(a) {
        return Lb(a)
    }

    function Nb(a) {
        return [Tb(a, Fn), Tb(a, vn)]
    }

    function Ob(a) {
        for (var b = a.read_shift(4), c = [], d = 0; d != b / 2; ++d) c.push(Nb(a));
        return c
    }

    function Pb(a) {
        return Ob(a)
    }

    function Qb(a, b) {
        for (var c = a.read_shift(4), d = {}, e = 0; e != c; ++e) {
            var f = a.read_shift(4), g = a.read_shift(4);
            d[f] = a.read_shift(g, 1200 === b ? "utf16le" : "utf8").replace(Rl, "").replace(Sl, "!"), 1200 === b && g % 2 && (a.l += 2)
        }
        return 3 & a.l && (a.l = a.l >> 3 << 2), d
    }

    function Rb(a) {
        var b = a.read_shift(4), c = a.slice(a.l, a.l + b);
        return a.l += b, (3 & b) > 0 && (a.l += 4 - (3 & b) & 3), c
    }

    function Sb(a) {
        var b = {};
        return b.Size = a.read_shift(4), a.l += b.Size + 3 - (b.Size - 1) % 4, b
    }

    function Tb(a, b, c) {
        var d, e = a.read_shift(2), f = c || {};
        if (a.l += 2, b !== xn && e !== b && -1 === Gn.indexOf(b)) throw new Error("Expected type " + b + " saw " + e);
        switch (b === xn ? e : b) {
            case 2:
                return d = a.read_shift(2, "i"), f.raw || (a.l += 2), d;
            case 3:
                return d = a.read_shift(4, "i");
            case 11:
                return 0 !== a.read_shift(4);
            case 19:
                return d = a.read_shift(4);
            case 30:
                return Gb(a, e, 4).replace(Rl, "");
            case 31:
                return Hb(a);
            case 64:
                return Eb(a);
            case 65:
                return Rb(a);
            case 71:
                return Sb(a);
            case 80:
                return Jb(a, e, !f.raw).replace(Rl, "");
            case 81:
                return Kb(a, e).replace(Rl, "");
            case 4108:
                return Pb(a);
            case 4126:
                return Mb(a);
            default:
                throw new Error("TypedPropertyValue unrecognized type " + b + " " + e)
        }
    }

    function Ub(a, b) {
        var c = ia(4), d = ia(4);
        switch (c.write_shift(4, 80 == a ? 31 : a), a) {
            case 3:
                d.write_shift(-4, b);
                break;
            case 5:
                d = ia(8), d.write_shift(8, b, "f");
                break;
            case 11:
                d.write_shift(4, b ? 1 : 0);
                break;
            case 64:
                d = Fb(b);
                break;
            case 31:
            case 80:
                for (d = ia(4 + 2 * (b.length + 1) + (b.length % 2 ? 0 : 2)), d.write_shift(4, b.length + 1), d.write_shift(0, b, "dbcs"); d.l != d.length;) d.write_shift(1, 0);
                break;
            default:
                throw new Error("TypedPropertyValue unrecognized type " + a + " " + b)
        }
        return Ql([c, d])
    }

    function Vb(a, b) {
        var c = a.l, d = a.read_shift(4), e = a.read_shift(4), f = [], g = 0, h = 0, i = -1, j = {};
        for (g = 0; g != e; ++g) {
            var k = a.read_shift(4), l = a.read_shift(4);
            f[g] = [k, l + c]
        }
        f.sort(function (a, b) {
            return a[1] - b[1]
        });
        var m = {};
        for (g = 0; g != e; ++g) {
            if (a.l !== f[g][1]) {
                var n = !0;
                if (g > 0 && b) switch (b[f[g - 1][0]].t) {
                    case 2:
                        a.l + 2 === f[g][1] && (a.l += 2, n = !1);
                        break;
                    case 80:
                    case 4108:
                        a.l <= f[g][1] && (a.l = f[g][1], n = !1)
                }
                if ((!b || 0 == g) && a.l <= f[g][1] && (n = !1, a.l = f[g][1]), n) throw new Error("Read Error: Expected address " + f[g][1] + " at " + a.l + " :" + g)
            }
            if (b) {
                var o = b[f[g][0]];
                if (m[o.n] = Tb(a, o.t, {raw: !0}), "version" === o.p && (m[o.n] = String(m[o.n] >> 16) + "." + ("0000" + String(65535 & m[o.n])).slice(-4)), "CodePage" == o.n) switch (m[o.n]) {
                    case 0:
                        m[o.n] = 1252;
                    case 874:
                    case 932:
                    case 936:
                    case 949:
                    case 950:
                    case 1250:
                    case 1251:
                    case 1253:
                    case 1254:
                    case 1255:
                    case 1256:
                    case 1257:
                    case 1258:
                    case 1e4:
                    case 1200:
                    case 1201:
                    case 1252:
                    case 65e3:
                    case-536:
                    case 65001:
                    case-535:
                        Gl(h = m[o.n] >>> 0 & 65535);
                        break;
                    default:
                        throw new Error("Unsupported CodePage: " + m[o.n])
                }
            } else if (1 === f[g][0]) {
                if (h = m.CodePage = Tb(a, un), Gl(h), -1 !== i) {
                    var p = a.l;
                    a.l = f[i][1], j = Qb(a, h), a.l = p
                }
            } else if (0 === f[g][0]) {
                if (0 === h) {
                    i = g, a.l = f[g + 1][1];
                    continue
                }
                j = Qb(a, h)
            } else {
                var q, r = j[f[g][0]];
                switch (a[a.l]) {
                    case 65:
                        a.l += 4, q = Rb(a);
                        break;
                    case 30:
                    case 31:
                        a.l += 4, q = Jb(a, a[a.l - 4]).replace(/\u0000+$/, "");
                        break;
                    case 3:
                        a.l += 4, q = a.read_shift(4, "i");
                        break;
                    case 19:
                        a.l += 4, q = a.read_shift(4);
                        break;
                    case 5:
                        a.l += 4, q = a.read_shift(8, "f");
                        break;
                    case 11:
                        a.l += 4, q = bc(a, 4);
                        break;
                    case 64:
                        a.l += 4, q = z(Eb(a));
                        break;
                    default:
                        throw new Error("unparsed value: " + a[a.l])
                }
                m[r] = q
            }
        }
        return a.l = c + d, m
    }

    function Wb(a) {
        switch (typeof a) {
            case"boolean":
                return 11;
            case"number":
                return (0 | a) == a ? 3 : 5;
            case"string":
                return 31;
            case"object":
                if (a instanceof Date) return 64
        }
        return -1
    }

    function Xb(a, b, c) {
        var d = ia(8), e = [], f = [], g = 8, h = 0, i = ia(8), j = ia(8);
        if (i.write_shift(4, 2), i.write_shift(4, 1200), j.write_shift(4, 1), f.push(i), e.push(j), g += 8 + i.length, !b) {
            j = ia(8), j.write_shift(4, 0), e.unshift(j);
            var k = [ia(4)];
            for (k[0].write_shift(4, a.length), h = 0; h < a.length; ++h) {
                var l = a[h][0];
                for (i = ia(8 + 2 * (l.length + 1) + (l.length % 2 ? 0 : 2)), i.write_shift(4, h + 2), i.write_shift(4, l.length + 1), i.write_shift(0, l, "dbcs"); i.l != i.length;) i.write_shift(1, 0);
                k.push(i)
            }
            i = Ql(k), f.unshift(i), g += 8 + i.length
        }
        for (h = 0; h < a.length; ++h) if ((!b || b[a[h][0]]) && !(ho.indexOf(a[h][0]) > -1) && null != a[h][1]) {
            var m = a[h][1], n = 0;
            if (b) {
                n = +b[a[h][0]];
                var o = c[n];
                if ("version" == o.p && "string" == typeof m) {
                    var p = m.split(".");
                    m = (+p[0] << 16) + (+p[1] || 0)
                }
                i = Ub(o.t, m)
            } else {
                var q = Wb(m);
                -1 == q && (q = 31, m = String(m)), i = Ub(q, m)
            }
            f.push(i), j = ia(8), j.write_shift(4, b ? n : 2 + h), e.push(j), g += 8 + i.length
        }
        var r = 8 * (f.length + 1);
        for (h = 0; h < f.length; ++h) e[h].write_shift(4, r), r += f[h].length;
        return d.write_shift(4, g), d.write_shift(4, f.length), Ql([d].concat(e).concat(f))
    }

    function Yb(a, b, c) {
        var d = a.content;
        if (!d) return {};
        ga(d, 0);
        var e, f, g, h, i = 0;
        d.chk("feff", "Byte Order: "), d.read_shift(2);
        var j = d.read_shift(4), k = d.read_shift(16);
        if (k !== $l.utils.consts.HEADER_CLSID && k !== c) throw new Error("Bad PropertySet CLSID " + k);
        if (1 !== (e = d.read_shift(4)) && 2 !== e) throw new Error("Unrecognized #Sets: " + e);
        if (f = d.read_shift(16), h = d.read_shift(4), 1 === e && h !== d.l) throw new Error("Length mismatch: " + h + " !== " + d.l);
        2 === e && (g = d.read_shift(16), i = d.read_shift(4));
        var l = Vb(d, b), m = {SystemIdentifier: j};
        for (var n in l) m[n] = l[n];
        if (m.FMTID = f, 1 === e) return m;
        if (i - d.l == 2 && (d.l += 2), d.l !== i) throw new Error("Length mismatch 2: " + d.l + " !== " + i);
        var o;
        try {
            o = Vb(d, null)
        } catch (a) {
        }
        for (n in o) m[n] = o[n];
        return m.FMTID = [f, g], m
    }

    function Zb(a, b, c, d, e, f) {
        var g = ia(e ? 68 : 48), h = [g];
        g.write_shift(2, 65534), g.write_shift(2, 0), g.write_shift(4, 842412599), g.write_shift(16, $l.utils.consts.HEADER_CLSID, "hex"), g.write_shift(4, e ? 2 : 1), g.write_shift(16, b, "hex"), g.write_shift(4, e ? 68 : 48);
        var i = Xb(a, c, d);
        if (h.push(i), e) {
            var j = Xb(e, null, null);
            g.write_shift(16, f, "hex"), g.write_shift(4, 68 + i.length), h.push(j)
        }
        return Ql(h)
    }

    function $b(a, b) {
        return a.read_shift(b), null
    }

    function _b(a, b) {
        b || (b = ia(a));
        for (var c = 0; c < a; ++c) b.write_shift(1, 0);
        return b
    }

    function ac(a, b, c) {
        for (var d = [], e = a.l + b; a.l < e;) d.push(c(a, e - a.l));
        if (e !== a.l) throw new Error("Slurp error");
        return d
    }

    function bc(a, b) {
        return 1 === a.read_shift(b)
    }

    function cc(a, b) {
        return b || (b = ia(2)), b.write_shift(2, +!!a), b
    }

    function dc(a) {
        return a.read_shift(2, "u")
    }

    function ec(a, b) {
        return b || (b = ia(2)), b.write_shift(2, a), b
    }

    function fc(a, b) {
        return ac(a, b, dc)
    }

    function gc(a) {
        var b = a.read_shift(1);
        return 1 === a.read_shift(1) ? b : 1 === b
    }

    function hc(a, b, c) {
        return c || (c = ia(2)), c.write_shift(1, +a), c.write_shift(1, "e" == b ? 1 : 0), c
    }

    function ic(a, b, c) {
        var d = a.read_shift(c && c.biff >= 12 ? 2 : 1), e = "sbcs-cont", f = Al;
        if (c && c.biff >= 8 && (Al = 1200), c && 8 != c.biff) 12 == c.biff && (e = "wstr"); else {
            a.read_shift(1) && (e = "dbcs-cont")
        }
        c.biff >= 2 && c.biff <= 5 && (e = "cpstr");
        var g = d ? a.read_shift(d, e) : "";
        return Al = f, g
    }

    function jc(a) {
        var b = Al;
        Al = 1200;
        var c, d = a.read_shift(2), e = a.read_shift(1), f = 4 & e, g = 8 & e, h = 1 + (1 & e), i = 0, j = {};
        g && (i = a.read_shift(2)), f && (c = a.read_shift(4));
        var k = 2 == h ? "dbcs-cont" : "sbcs-cont", l = 0 === d ? "" : a.read_shift(d, k);
        return g && (a.l += 4 * i), f && (a.l += c), j.t = l, g || (j.raw = "<t>" + j.t + "</t>", j.r = j.t), Al = b, j
    }

    function kc(a, b, c) {
        if (c) {
            if (c.biff >= 2 && c.biff <= 5) return a.read_shift(b, "cpstr");
            if (c.biff >= 12) return a.read_shift(b, "dbcs-cont")
        }
        return 0 === a.read_shift(1) ? a.read_shift(b, "sbcs-cont") : a.read_shift(b, "dbcs-cont")
    }

    function lc(a, b, c) {
        var d = a.read_shift(c && 2 == c.biff ? 1 : 2);
        return 0 === d ? (a.l++, "") : kc(a, d, c)
    }

    function mc(a, b, c) {
        if (c.biff > 5) return lc(a, b, c);
        var d = a.read_shift(1);
        return 0 === d ? (a.l++, "") : a.read_shift(d, c.biff <= 4 || !a.lens ? "cpstr" : "sbcs-cont")
    }

    function nc(a, b, c) {
        return c || (c = ia(3 + 2 * a.length)), c.write_shift(2, a.length), c.write_shift(1, 1), c.write_shift(31, a, "utf16le"), c
    }

    function oc(a) {
        var b = a.read_shift(1);
        a.l++;
        var c = a.read_shift(2);
        return a.l += 2, [b, c]
    }

    function pc(a) {
        var b = a.read_shift(4), c = a.l, d = !1;
        b > 24 && (a.l += b - 24, "795881f43b1d7f48af2c825dc4852763" === a.read_shift(16) && (d = !0), a.l = c);
        var e = a.read_shift((d ? b - 24 : b) >> 1, "utf16le").replace(Rl, "");
        return d && (a.l += 24), e
    }

    function qc(a) {
        a.l += 2;
        var b = a.read_shift(0, "lpstr-ansi");
        if (a.l += 2, 57005 != a.read_shift(2)) throw new Error("Bad FileMoniker");
        if (0 === a.read_shift(4)) return b.replace(/\\/g, "/");
        var c = a.read_shift(4);
        if (3 != a.read_shift(2)) throw new Error("Bad FileMoniker");
        return a.read_shift(c >> 1, "utf16le").replace(Rl, "")
    }

    function rc(a, b) {
        var c = a.read_shift(16);
        switch (b -= 16, c) {
            case"e0c9ea79f9bace118c8200aa004ba90b":
                return pc(a, b);
            case"0303000000000000c000000000000046":
                return qc(a, b);
            default:
                throw new Error("Unsupported Moniker " + c)
        }
    }

    function sc(a) {
        var b = a.read_shift(4);
        return b > 0 ? a.read_shift(b, "utf16le").replace(Rl, "") : ""
    }

    function tc(a, b) {
        var c = a.l + b, d = a.read_shift(4);
        if (2 !== d) throw new Error("Unrecognized streamVersion: " + d);
        var e = a.read_shift(2);
        a.l += 2;
        var f, g, h, i, j, k, l = "";
        16 & e && (f = sc(a, c - a.l)), 128 & e && (g = sc(a, c - a.l)), 257 == (257 & e) && (h = sc(a, c - a.l)), 1 == (257 & e) && (i = rc(a, c - a.l)), 8 & e && (l = sc(a, c - a.l)), 32 & e && (j = a.read_shift(16)), 64 & e && (k = Eb(a)), a.l = c;
        var m = g || h || i || "";
        m && l && (m += "#" + l), m || (m = "#" + l);
        var n = {Target: m};
        return j && (n.guid = j), k && (n.time = k), f && (n.Tooltip = f), n
    }

    function uc(a) {
        var b = ia(512), c = 0, d = a.Target, e = d.indexOf("#") > -1 ? 31 : 23;
        switch (d.charAt(0)) {
            case"#":
                e = 28;
                break;
            case".":
                e &= -3
        }
        b.write_shift(4, 2), b.write_shift(4, e);
        var f = [8, 6815827, 6619237, 4849780, 83];
        for (c = 0; c < f.length; ++c) b.write_shift(4, f[c]);
        if (28 == e) {
            for (d = d.slice(1), b.write_shift(4, d.length + 1), c = 0; c < d.length; ++c) b.write_shift(2, d.charCodeAt(c));
            b.write_shift(2, 0)
        } else if (2 & e) {
            for (f = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), c = 0; c < f.length; ++c) b.write_shift(1, parseInt(f[c], 16));
            for (b.write_shift(4, 2 * (d.length + 1)), c = 0; c < d.length; ++c) b.write_shift(2, d.charCodeAt(c));
            b.write_shift(2, 0)
        } else {
            for (f = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "), c = 0; c < f.length; ++c) b.write_shift(1, parseInt(f[c], 16));
            for (var g = 0; "../" == d.slice(3 * g, 3 * g + 3) || "..\\" == d.slice(3 * g, 3 * g + 3);) ++g;
            for (b.write_shift(2, g), b.write_shift(4, d.length + 1), c = 0; c < d.length; ++c) b.write_shift(1, 255 & d.charCodeAt(c));
            for (b.write_shift(1, 0), b.write_shift(2, 65535), b.write_shift(2, 57005), c = 0; c < 6; ++c) b.write_shift(4, 0)
        }
        return b.slice(0, b.l)
    }

    function vc(a) {
        return [a.read_shift(1), a.read_shift(1), a.read_shift(1), a.read_shift(1)]
    }

    function wc(a, b) {
        var c = vc(a, b);
        return c[3] = 0, c
    }

    function xc(a) {
        return {r: a.read_shift(2), c: a.read_shift(2), ixfe: a.read_shift(2)}
    }

    function yc(a, b, c, d) {
        return d || (d = ia(6)), d.write_shift(2, a), d.write_shift(2, b), d.write_shift(2, c || 0), d
    }

    function zc(a) {
        var b = a.read_shift(2), c = a.read_shift(2);
        return a.l += 8, {type: b, flags: c}
    }

    function Ac(a, b, c) {
        return 0 === b ? "" : mc(a, b, c)
    }

    function Bc(a, b, c) {
        var d = c.biff > 8 ? 4 : 2;
        return [a.read_shift(d), a.read_shift(d, "i"), a.read_shift(d, "i")]
    }

    function Cc(a) {
        return [a.read_shift(2), Va(a)]
    }

    function Dc(a, b, c) {
        a.l += 4, b -= 4;
        var d = a.l + b, e = ic(a, b, c), f = a.read_shift(2);
        if (d -= a.l, f !== d) throw new Error("Malformed AddinUdf: padding = " + d + " != " + f);
        return a.l += f, e
    }

    function Ec(a) {
        var b = a.read_shift(2), c = a.read_shift(2);
        return {s: {c: a.read_shift(2), r: b}, e: {c: a.read_shift(2), r: c}}
    }

    function Fc(a, b) {
        return b || (b = ia(8)), b.write_shift(2, a.s.r), b.write_shift(2, a.e.r), b.write_shift(2, a.s.c), b.write_shift(2, a.e.c), b
    }

    function Gc(a) {
        var b = a.read_shift(2), c = a.read_shift(2);
        return {s: {c: a.read_shift(1), r: b}, e: {c: a.read_shift(1), r: c}}
    }

    function Hc(a) {
        a.l += 4;
        var b = a.read_shift(2), c = a.read_shift(2), d = a.read_shift(2);
        return a.l += 12, [c, b, d]
    }

    function Ic(a) {
        var b = {};
        return a.l += 4, a.l += 16, b.fSharedNote = a.read_shift(2), a.l += 4, b
    }

    function Jc(a) {
        var b = {};
        return a.l += 4, a.cf = a.read_shift(2), b
    }

    function Kc(a) {
        a.l += 2, a.l += a.read_shift(2)
    }

    function Lc(a, b) {
        for (var c = a.l + b, d = []; a.l < c;) {
            var e = a.read_shift(2);
            a.l -= 2;
            try {
                d.push(jo[e](a, c - a.l))
            } catch (b) {
                return a.l = c, d
            }
        }
        return a.l != c && (a.l = c), d
    }

    function Mc(a, b) {
        var c = {BIFFVer: 0, dt: 0};
        switch (c.BIFFVer = a.read_shift(2), b -= 2, b >= 2 && (c.dt = a.read_shift(2), a.l -= 2), c.BIFFVer) {
            case 1536:
            case 1280:
            case 1024:
            case 768:
            case 512:
            case 2:
            case 7:
                break;
            default:
                if (b > 6) throw new Error("Unexpected BIFF Ver " + c.BIFFVer)
        }
        return a.read_shift(b), c
    }

    function Nc(a, b, c) {
        var d = 1536, e = 16;
        switch (c.bookType) {
            case"biff8":
                break;
            case"biff5":
                d = 1280, e = 8;
                break;
            case"biff4":
                d = 4, e = 6;
                break;
            case"biff3":
                d = 3, e = 6;
                break;
            case"biff2":
                d = 2, e = 4;
                break;
            case"xla":
                break;
            default:
                throw new Error("unsupported BIFF version")
        }
        var f = ia(e);
        return f.write_shift(2, d), f.write_shift(2, b), e > 4 && f.write_shift(2, 29282), e > 6 && f.write_shift(2, 1997), e > 8 && (f.write_shift(2, 49161), f.write_shift(2, 1), f.write_shift(2, 1798), f.write_shift(2, 0)), f
    }

    function Oc(a, b) {
        return 0 === b ? 1200 : (a.read_shift(2), 1200)
    }

    function Pc(a, b, c) {
        if (c.enc) return a.l += b, "";
        var d = a.l, e = mc(a, 0, c);
        return a.read_shift(b + d - a.l), e
    }

    function Qc(a, b) {
        var c = !b || 8 == b.biff, d = ia(c ? 112 : 54);
        for (d.write_shift(8 == b.biff ? 2 : 1, 7), c && d.write_shift(1, 0), d.write_shift(4, 859007059), d.write_shift(4, 5458548 | (c ? 0 : 536870912)); d.l < d.length;) d.write_shift(1, c ? 0 : 32);
        return d
    }

    function Rc(a, b, c) {
        return {fDialog: 16 & (c && 8 == c.biff || 2 == b ? a.read_shift(2) : (a.l += b, 0))}
    }

    function Sc(a, b, c) {
        var d = a.read_shift(4), e = 3 & a.read_shift(1), f = a.read_shift(1);
        switch (f) {
            case 0:
                f = "Worksheet";
                break;
            case 1:
                f = "Macrosheet";
                break;
            case 2:
                f = "Chartsheet";
                break;
            case 6:
                f = "VBAModule"
        }
        var g = ic(a, 0, c);
        return 0 === g.length && (g = "Sheet1"), {pos: d, hs: e, dt: f, name: g}
    }

    function Tc(a, b) {
        var c = !b || b.biff >= 8 ? 2 : 1, d = ia(8 + c * a.name.length);
        d.write_shift(4, a.pos), d.write_shift(1, a.hs || 0), d.write_shift(1, a.dt), d.write_shift(1, a.name.length), b.biff >= 8 && d.write_shift(1, 1), d.write_shift(c * a.name.length, a.name, b.biff < 8 ? "sbcs" : "utf16le");
        var e = d.slice(0, d.l);
        return e.l = d.l, e
    }

    function Uc(a, b) {
        for (var c = a.l + b, d = a.read_shift(4), e = a.read_shift(4), f = [], g = 0; g != e && a.l < c; ++g) f.push(jc(a));
        return f.Count = d, f.Unique = e, f
    }

    function Vc(a, b) {
        var c = {};
        return c.dsst = a.read_shift(2), a.l += b - 2, c
    }

    function Wc(a) {
        var b = {};
        b.r = a.read_shift(2), b.c = a.read_shift(2), b.cnt = a.read_shift(2) - b.c;
        var c = a.read_shift(2);
        a.l += 4;
        var d = a.read_shift(1);
        return a.l += 3, 7 & d && (b.level = 7 & d), 32 & d && (b.hidden = !0), 64 & d && (b.hpt = c / 20), b
    }

    function Xc(a) {
        var b = zc(a);
        if (2211 != b.type) throw new Error("Invalid Future Record " + b.type);
        return 0 !== a.read_shift(4)
    }

    function Yc(a) {
        return a.read_shift(2), a.read_shift(4)
    }

    function Zc(a, b, c) {
        var d = 0;
        c && 2 == c.biff || (d = a.read_shift(2));
        var e = a.read_shift(2);
        return c && 2 == c.biff && (d = 1 - (e >> 15), e &= 32767), [{
            Unsynced: 1 & d,
            DyZero: (2 & d) >> 1,
            ExAsc: (4 & d) >> 2,
            ExDsc: (8 & d) >> 3
        }, e]
    }

    function $c(a) {
        return {
            Pos: [a.read_shift(2), a.read_shift(2)],
            Dim: [a.read_shift(2), a.read_shift(2)],
            Flags: a.read_shift(2),
            CurTab: a.read_shift(2),
            FirstTab: a.read_shift(2),
            Selected: a.read_shift(2),
            TabRatio: a.read_shift(2)
        }
    }

    function _c() {
        var a = ia(18);
        return a.write_shift(2, 0), a.write_shift(2, 0), a.write_shift(2, 29280), a.write_shift(2, 17600), a.write_shift(2, 56), a.write_shift(2, 0), a.write_shift(2, 0), a.write_shift(2, 1), a.write_shift(2, 500), a
    }

    function ad(a, b, c) {
        return c && c.biff >= 2 && c.biff < 8 ? {} : {RTL: 64 & a.read_shift(2)}
    }

    function bd(a) {
        var b = ia(18), c = 1718;
        return a && a.RTL && (c |= 64), b.write_shift(2, c), b.write_shift(4, 0), b.write_shift(4, 64), b.write_shift(4, 0), b.write_shift(4, 0), b
    }

    function cd(a, b, c) {
        var d = {dyHeight: a.read_shift(2), fl: a.read_shift(2)};
        switch (c && c.biff || 8) {
            case 2:
                break;
            case 3:
            case 4:
                a.l += 2;
                break;
            default:
                a.l += 10
        }
        return d.name = ic(a, 0, c), d
    }

    function dd(a, b) {
        var c = a.name || "Arial", d = b && 5 == b.biff, e = d ? 15 + c.length : 16 + 2 * c.length, f = ia(e);
        return f.write_shift(2, 20 * (a.sz || 12)), f.write_shift(4, 0), f.write_shift(2, 400), f.write_shift(4, 0), f.write_shift(2, 0), f.write_shift(1, c.length), d || f.write_shift(1, 1), f.write_shift((d ? 1 : 2) * c.length, c, d ? "sbcs" : "utf16le"), f
    }

    function ed(a) {
        var b = xc(a);
        return b.isst = a.read_shift(4), b
    }

    function fd(a, b, c) {
        var d = a.l + b, e = xc(a, 6);
        2 == c.biff && a.l++;
        var f = lc(a, d - a.l, c);
        return e.val = f, e
    }

    function gd(a, b, c, d, e) {
        var f = !e || 8 == e.biff, g = ia(+f + 8 + (1 + f) * c.length);
        return yc(a, b, d, g), g.write_shift(2, c.length), f && g.write_shift(1, 1), g.write_shift((1 + f) * c.length, c, f ? "utf16le" : "sbcs"), g
    }

    function hd(a, b, c) {
        return [a.read_shift(2), mc(a, 0, c)]
    }

    function id(a, b, c, d) {
        var e = c && 5 == c.biff;
        d || (d = ia(e ? 3 + b.length : 5 + 2 * b.length)), d.write_shift(2, a), d.write_shift(e ? 1 : 2, b.length), e || d.write_shift(1, 1), d.write_shift((e ? 1 : 2) * b.length, b, e ? "sbcs" : "utf16le");
        var f = d.length > d.l ? d.slice(0, d.l) : d;
        return null == f.l && (f.l = f.length), f
    }

    function jd(a, b, c) {
        var d = a.l + b, e = 8 != c.biff && c.biff ? 2 : 4, f = a.read_shift(e), g = a.read_shift(e),
            h = a.read_shift(2), i = a.read_shift(2);
        return a.l = d, {s: {r: f, c: h}, e: {r: g, c: i}}
    }

    function kd(a, b) {
        var c = 8 != b.biff && b.biff ? 2 : 4, d = ia(2 * c + 6);
        return d.write_shift(c, a.s.r), d.write_shift(c, a.e.r + 1), d.write_shift(2, a.s.c), d.write_shift(2, a.e.c + 1), d.write_shift(2, 0), d
    }

    function ld(a) {
        var b = a.read_shift(2), c = a.read_shift(2), d = Cc(a);
        return {r: b, c: c, ixfe: d[0], rknum: d[1]}
    }

    function md(a, b) {
        for (var c = a.l + b - 2, d = a.read_shift(2), e = a.read_shift(2), f = []; a.l < c;) f.push(Cc(a));
        if (a.l !== c) throw new Error("MulRK read error");
        var g = a.read_shift(2);
        if (f.length != g - e + 1) throw new Error("MulRK length mismatch");
        return {r: d, c: e, C: g, rkrec: f}
    }

    function nd(a, b) {
        for (var c = a.l + b - 2, d = a.read_shift(2), e = a.read_shift(2), f = []; a.l < c;) f.push(a.read_shift(2));
        if (a.l !== c) throw new Error("MulBlank read error");
        var g = a.read_shift(2);
        if (f.length != g - e + 1) throw new Error("MulBlank length mismatch");
        return {r: d, c: e, C: g, ixfe: f}
    }

    function od(a, b, c, d) {
        var e = {}, f = a.read_shift(4), g = a.read_shift(4), h = a.read_shift(4), i = a.read_shift(2);
        return e.patternType = Nn[h >> 26], d.cellStyles ? (e.alc = 7 & f, e.fWrap = f >> 3 & 1, e.alcV = f >> 4 & 7, e.fJustLast = f >> 7 & 1, e.trot = f >> 8 & 255, e.cIndent = f >> 16 & 15, e.fShrinkToFit = f >> 20 & 1, e.iReadOrder = f >> 22 & 2, e.fAtrNum = f >> 26 & 1, e.fAtrFnt = f >> 27 & 1, e.fAtrAlc = f >> 28 & 1, e.fAtrBdr = f >> 29 & 1, e.fAtrPat = f >> 30 & 1, e.fAtrProt = f >> 31 & 1, e.dgLeft = 15 & g, e.dgRight = g >> 4 & 15, e.dgTop = g >> 8 & 15, e.dgBottom = g >> 12 & 15, e.icvLeft = g >> 16 & 127, e.icvRight = g >> 23 & 127, e.grbitDiag = g >> 30 & 3, e.icvTop = 127 & h, e.icvBottom = h >> 7 & 127, e.icvDiag = h >> 14 & 127, e.dgDiag = h >> 21 & 15, e.icvFore = 127 & i, e.icvBack = i >> 7 & 127, e.fsxButton = i >> 14 & 1, e) : e
    }

    function pd(a, b, c) {
        var d = {};
        return d.ifnt = a.read_shift(2), d.numFmtId = a.read_shift(2), d.flags = a.read_shift(2), d.fStyle = d.flags >> 2 & 1, b -= 6, d.data = od(a, b, d.fStyle, c), d
    }

    function qd(a, b, c, d) {
        var e = c && 5 == c.biff;
        return d || (d = ia(e ? 16 : 20)), d.write_shift(2, 0), a.style ? (d.write_shift(2, a.numFmtId || 0), d.write_shift(2, 65524)) : (d.write_shift(2, a.numFmtId || 0), d.write_shift(2, b << 4)), d.write_shift(4, 0), d.write_shift(4, 0), e || d.write_shift(4, 0), d.write_shift(2, 0), d
    }

    function rd(a) {
        a.l += 4;
        var b = [a.read_shift(2), a.read_shift(2)];
        if (0 !== b[0] && b[0]--, 0 !== b[1] && b[1]--, b[0] > 7 || b[1] > 7) throw new Error("Bad Gutters: " + b.join("|"));
        return b
    }

    function sd(a) {
        var b = ia(8);
        return b.write_shift(4, 0), b.write_shift(2, a[0] ? a[0] + 1 : 0), b.write_shift(2, a[1] ? a[1] + 1 : 0), b
    }

    function td(a, b, c) {
        var d = xc(a, 6);
        2 == c.biff && ++a.l;
        var e = gc(a, 2);
        return d.val = e, d.t = !0 === e || !1 === e ? "b" : "e", d
    }

    function ud(a, b, c, d, e, f) {
        var g = ia(8);
        return yc(a, b, d, g), hc(c, f, g), g
    }

    function vd(a) {
        var b = xc(a, 6), c = Za(a, 8);
        return b.val = c, b
    }

    function wd(a, b, c, d) {
        var e = ia(14);
        return yc(a, b, d, e), $a(c, e), e
    }

    function xd(a, b, c) {
        var d = a.l + b, e = a.read_shift(2), f = a.read_shift(2);
        if (c.sbcch = f, 1025 == f || 14849 == f) return [f, e];
        if (f < 1 || f > 255) throw new Error("Unexpected SupBook type: " + f);
        for (var g = kc(a, f), h = []; d > a.l;) h.push(lc(a));
        return [f, e, g, h]
    }

    function yd(a, b, c) {
        var d, e = a.read_shift(2), f = {
            fBuiltIn: 1 & e,
            fWantAdvise: e >>> 1 & 1,
            fWantPict: e >>> 2 & 1,
            fOle: e >>> 3 & 1,
            fOleLink: e >>> 4 & 1,
            cf: e >>> 5 & 1023,
            fIcon: e >>> 15 & 1
        };
        return 14849 === c.sbcch && (d = Dc(a, b - 2, c)), f.body = d || a.read_shift(b - 2), "string" == typeof d && (f.Name = d), f
    }

    function zd(a, b, c) {
        var d = a.l + b, e = a.read_shift(2), f = a.read_shift(1), g = a.read_shift(1),
            h = a.read_shift(c && 2 == c.biff ? 1 : 2), i = 0;
        (!c || c.biff >= 5) && (5 != c.biff && (a.l += 2), i = a.read_shift(2), 5 == c.biff && (a.l += 2), a.l += 4);
        var j = kc(a, g, c);
        32 & e && (j = mo[j.charCodeAt(0)]);
        var k = d - a.l;
        return c && 2 == c.biff && --k, {chKey: f, Name: j, itab: i, rgce: d == a.l || 0 === h ? [] : zh(a, k, c, h)}
    }

    function Ad(a, b, c) {
        if (c.biff < 8) return Bd(a, b, c);
        for (var d = [], e = a.l + b, f = a.read_shift(c.biff > 8 ? 4 : 2); 0 != f--;) d.push(Bc(a, c.biff > 8 ? 12 : 6, c));
        if (a.l != e) throw new Error("Bad ExternSheet: " + a.l + " != " + e);
        return d
    }

    function Bd(a, b, c) {
        3 == a[a.l + 1] && a[a.l]++;
        var d = ic(a, b, c);
        return 3 == d.charCodeAt(0) ? d.slice(1) : d
    }

    function Cd(a, b, c) {
        if (c.biff < 8) return void (a.l += b);
        var d = a.read_shift(2), e = a.read_shift(2);
        return [kc(a, d, c), kc(a, e, c)]
    }

    function Dd(a, b, c) {
        var d = Gc(a, 6);
        a.l++;
        var e = a.read_shift(1);
        return b -= 8, [Ah(a, b, c), e, d]
    }

    function Ed(a, b, c) {
        var d = io(a, 6);
        switch (c.biff) {
            case 2:
                a.l++, b -= 7;
                break;
            case 3:
            case 4:
                a.l += 2, b -= 8;
                break;
            default:
                a.l += 6, b -= 12
        }
        return [d, xh(a, b, c, d)]
    }

    function Fd(a) {
        return [0 !== a.read_shift(4), 0 !== a.read_shift(4), a.read_shift(4)]
    }

    function Gd(a, b, c) {
        if (!(c.biff < 8)) {
            var d = a.read_shift(2), e = a.read_shift(2), f = a.read_shift(2), g = a.read_shift(2), h = mc(a, 0, c);
            return c.biff < 8 && a.read_shift(1), [{r: d, c: e}, h, g, f]
        }
    }

    function Hd(a, b, c) {
        return Gd(a, b, c)
    }

    function Id(a, b) {
        for (var c = [], d = a.read_shift(2); d--;) c.push(Ec(a, b));
        return c
    }

    function Jd(a) {
        var b = ia(2 + 8 * a.length);
        b.write_shift(2, a.length);
        for (var c = 0; c < a.length; ++c) Fc(a[c], b);
        return b
    }

    function Kd(a, b, c) {
        if (c && c.biff < 8) return Ld(a, b, c);
        var d = Hc(a, 22);
        return {cmo: d, ft: Lc(a, b - 22, d[1])}
    }

    function Ld(a, b, c) {
        a.l += 4;
        var d = a.read_shift(2), e = a.read_shift(2), f = a.read_shift(2);
        a.l += 2, a.l += 2, a.l += 2, a.l += 2, a.l += 2, a.l += 2, a.l += 2, a.l += 2, a.l += 2, a.l += 6, b -= 36;
        var g = [];
        return g.push((no[d] || ha)(a, b, c)), {cmo: [e, d, f], ft: g}
    }

    function Md(a, b, c) {
        var d = a.l, e = "";
        try {
            a.l += 4;
            var f = (c.lastobj || {cmo: [0, 0]}).cmo[1];
            -1 == [0, 5, 7, 11, 12, 14].indexOf(f) ? a.l += 6 : oc(a, 6, c);
            var g = a.read_shift(2);
            a.read_shift(2), dc(a, 2);
            var h = a.read_shift(2);
            a.l += h;
            for (var i = 1; i < a.lens.length - 1; ++i) {
                if (a.l - d != a.lens[i]) throw new Error("TxO: bad continue record");
                var j = a[a.l], k = kc(a, a.lens[i + 1] - a.lens[i] - 1);
                if (e += k, e.length >= (j ? g : 2 * g)) break
            }
            if (e.length !== g && e.length !== 2 * g) throw new Error("cchText: " + g + " != " + e.length);
            return a.l = d + b, {t: e}
        } catch (c) {
            return a.l = d + b, {t: e}
        }
    }

    function Nd(a, b) {
        var c = Ec(a, 8);
        return a.l += 16, [c, tc(a, b - 24)]
    }

    function Od(a) {
        var b = ia(24), c = za(a[0]);
        b.write_shift(2, c.r), b.write_shift(2, c.r), b.write_shift(2, c.c), b.write_shift(2, c.c);
        for (var d = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), e = 0; e < 16; ++e) b.write_shift(1, parseInt(d[e], 16));
        return Ql([b, uc(a[1])])
    }

    function Pd(a, b) {
        a.read_shift(2);
        var c = Ec(a, 8), d = a.read_shift((b - 10) / 2, "dbcs-cont");
        return d = d.replace(Rl, ""), [c, d]
    }

    function Qd(a) {
        var b = a[1].Tooltip, c = ia(10 + 2 * (b.length + 1));
        c.write_shift(2, 2048);
        var d = za(a[0]);
        c.write_shift(2, d.r), c.write_shift(2, d.r), c.write_shift(2, d.c), c.write_shift(2, d.c);
        for (var e = 0; e < b.length; ++e) c.write_shift(2, b.charCodeAt(e));
        return c.write_shift(2, 0), c
    }

    function Rd(a) {
        var b, c = [0, 0];
        return b = a.read_shift(2), c[0] = Mn[b] || b, b = a.read_shift(2), c[1] = Mn[b] || b, c
    }

    function Sd(a) {
        return a || (a = ia(4)), a.write_shift(2, 1), a.write_shift(2, 1), a
    }

    function Td(a) {
        for (var b = a.read_shift(2), c = []; b-- > 0;) c.push(wc(a, 8));
        return c
    }

    function Ud(a) {
        for (var b = a.read_shift(2), c = []; b-- > 0;) c.push(wc(a, 8));
        return c
    }

    function Vd(a) {
        a.l += 2;
        var b = {cxfs: 0, crc: 0};
        return b.cxfs = a.read_shift(2), b.crc = a.read_shift(4), b
    }

    function Wd(a, b, c) {
        if (!c.cellStyles) return ha(a, b);
        var d = c && c.biff >= 12 ? 4 : 2, e = a.read_shift(d), f = a.read_shift(d), g = a.read_shift(d),
            h = a.read_shift(d), i = a.read_shift(2);
        return 2 == d && (a.l += 2), {s: e, e: f, w: g, ixfe: h, flags: i}
    }

    function Xd(a, b) {
        var c = {};
        return b < 32 ? c : (a.l += 16, c.header = Za(a, 8), c.footer = Za(a, 8), a.l += 2, c)
    }

    function Yd(a, b, c) {
        var d = {area: !1};
        if (5 != c.biff) return a.l += b, d;
        var e = a.read_shift(1);
        return a.l += 3, 16 & e && (d.area = !0), d
    }

    function Zd(a) {
        for (var b = ia(2 * a), c = 0; c < a; ++c) b.write_shift(2, c + 1);
        return b
    }

    function $d(a) {
        var b = a.read_shift(2), c = a.read_shift(2), d = a.read_shift(4),
            e = {fmt: b, env: c, len: d, data: a.slice(a.l, a.l + d)};
        return a.l += d, e
    }

    function _d(a, b, c) {
        var d = xc(a, 6);
        ++a.l;
        var e = mc(a, b - 7, c);
        return d.t = "str", d.val = e, d
    }

    function ae(a) {
        var b = xc(a, 6);
        ++a.l;
        var c = Za(a, 8);
        return b.t = "n", b.val = c, b
    }

    function be(a, b, c) {
        var d = ia(15);
        return tk(d, a, b), d.write_shift(8, c, "f"), d
    }

    function ce(a) {
        var b = xc(a, 6);
        ++a.l;
        var c = a.read_shift(2);
        return b.t = "n", b.val = c, b
    }

    function de(a, b, c) {
        var d = ia(9);
        return tk(d, a, b), d.write_shift(2, c), d
    }

    function ee(a) {
        var b = a.read_shift(1);
        return 0 === b ? (a.l++, "") : a.read_shift(b, "sbcs-cont")
    }

    function fe(a, b) {
        a.l += 6, a.l += 2, a.l += 1, a.l += 3, a.l += 1, a.l += b - 13
    }

    function ge(a, b, c) {
        var d = a.l + b, e = xc(a, 6), f = a.read_shift(2), g = kc(a, f, c);
        return a.l = d, e.t = "str", e.val = g, e
    }

    function he(a, b) {
        var c = b || {}, d = !!c.WTF;
        c.WTF = !0;
        try {
            var e = so.to_workbook(a, c);
            return c.WTF = d, e
        } catch (e) {
            if (c.WTF = d, !e.message.match(/SYLK bad record ID/) && d) throw e;
            return vo.to_workbook(a, b)
        }
    }

    function ie(a, b) {
        var c = !b || b.cellHTML, d = {};
        return a ? (a.match(/^\s*<(?:\w+:)?t[^>]*>/) ? (d.t = nm(tm(a.slice(a.indexOf(">") + 1).split(/<\/(?:\w+:)?t>/)[0] || "")), d.r = tm(a), c && (d.h = T(d.t))) : a.match(zo) && (d.r = tm(a), d.t = nm(tm((a.replace(Ao, "").match(yo) || []).join("").replace(im, ""))), c && (d.h = xo(d.r))), d) : null
    }

    function je(a, b) {
        var c = [], d = "";
        if (!a) return c;
        var e = a.match(Bo);
        if (e) {
            d = e[2].replace(Co, "").split(Do);
            for (var f = 0; f != d.length; ++f) {
                var g = ie(d[f].trim(), b);
                null != g && (c[c.length] = g)
            }
            e = P(e[1]), c.Count = e.count, c.Unique = e.uniqueCount
        }
        return c
    }

    function ke(a, b) {
        if (!b.bookSST) return "";
        var c = [gm];
        c[c.length] = Z("sst", null, {xmlns: Em.main[0], count: a.Count, uniqueCount: a.Unique});
        for (var d = 0; d != a.length; ++d) if (null != a[d]) {
            var e = a[d], f = "<si>";
            e.r ? f += e.r : (f += "<t", e.t || (e.t = ""), e.t.match(Eo) && (f += ' xml:space="preserve"'), f += ">" + R(e.t) + "</t>"), f += "</si>", c[c.length] = f
        }
        return c.length > 2 && (c[c.length] = "</sst>", c[1] = c[1].replace("/>", ">")), c.join("")
    }

    function le(a) {
        return [a.read_shift(4), a.read_shift(4)]
    }

    function me(a, b) {
        var c = [], d = !1;
        return ja(a, function (a, e, f) {
            switch (f) {
                case 159:
                    c.Count = a[0], c.Unique = a[1];
                    break;
                case 19:
                    c.push(a);
                    break;
                case 160:
                    return !0;
                case 35:
                    d = !0;
                    break;
                case 36:
                    d = !1;
                    break;
                default:
                    if (e.indexOf("Begin") > 0 || e.indexOf("End"), !d || b.WTF) throw new Error("Unexpected record " + f + " " + e)
            }
        }), c
    }

    function ne(a, b) {
        return b || (b = ia(8)), b.write_shift(4, a.Count), b.write_shift(4, a.Unique), b
    }

    function oe(a) {
        var b = ka();
        la(b, "BrtBeginSst", ne(a));
        for (var c = 0; c < a.length; ++c) la(b, "BrtSSTItem", Fo(a[c]));
        return la(b, "BrtEndSst"), b.end()
    }

    function pe(a) {
        if ("undefined" != typeof cptable) return cptable.utils.encode(Bl, a);
        for (var b = [], c = a.split(""), d = 0; d < c.length; ++d) b[d] = c[d].charCodeAt(0);
        return b
    }

    function qe(a, b) {
        var c = {};
        return c.Major = a.read_shift(2), c.Minor = a.read_shift(2), b >= 4 && (a.l += b - 4), c
    }

    function re(a) {
        var b = {};
        return b.id = a.read_shift(0, "lpp4"), b.R = qe(a, 4), b.U = qe(a, 4), b.W = qe(a, 4), b
    }

    function se(a) {
        for (var b = a.read_shift(4), c = a.l + b - 4, d = {}, e = a.read_shift(4), f = []; e-- > 0;) f.push({
            t: a.read_shift(4),
            v: a.read_shift(0, "lpp4")
        });
        if (d.name = a.read_shift(0, "lpp4"), d.comps = f, a.l != c) throw new Error("Bad DataSpaceMapEntry: " + a.l + " != " + c);
        return d
    }

    function te(a) {
        var b = [];
        a.l += 4;
        for (var c = a.read_shift(4); c-- > 0;) b.push(se(a));
        return b
    }

    function ue(a) {
        var b = [];
        a.l += 4;
        for (var c = a.read_shift(4); c-- > 0;) b.push(a.read_shift(0, "lpp4"));
        return b
    }

    function ve(a) {
        var b = {};
        return a.read_shift(4), a.l += 4, b.id = a.read_shift(0, "lpp4"), b.name = a.read_shift(0, "lpp4"), b.R = qe(a, 4), b.U = qe(a, 4), b.W = qe(a, 4), b
    }

    function we(a) {
        var b = ve(a);
        if (b.ename = a.read_shift(0, "8lpp4"), b.blksz = a.read_shift(4), b.cmode = a.read_shift(4), 4 != a.read_shift(4)) throw new Error("Bad !Primary record");
        return b
    }

    function xe(a, b) {
        var c = a.l + b, d = {};
        d.Flags = 63 & a.read_shift(4), a.l += 4, d.AlgID = a.read_shift(4);
        var e = !1;
        switch (d.AlgID) {
            case 26126:
            case 26127:
            case 26128:
                e = 36 == d.Flags;
                break;
            case 26625:
                e = 4 == d.Flags;
                break;
            case 0:
                e = 16 == d.Flags || 4 == d.Flags || 36 == d.Flags;
                break;
            default:
                throw"Unrecognized encryption algorithm: " + d.AlgID
        }
        if (!e) throw new Error("Encryption Flags/AlgID mismatch");
        return d.AlgIDHash = a.read_shift(4), d.KeySize = a.read_shift(4), d.ProviderType = a.read_shift(4), a.l += 8, d.CSPName = a.read_shift(c - a.l >> 1, "utf16le"), a.l = c, d
    }

    function ye(a, b) {
        var c = {}, d = a.l + b;
        return a.l += 4, c.Salt = a.slice(a.l, a.l + 16), a.l += 16, c.Verifier = a.slice(a.l, a.l + 16), a.l += 16, a.read_shift(4), c.VerifierHash = a.slice(a.l, d), a.l = d, c
    }

    function ze(a) {
        var b = qe(a);
        switch (b.Minor) {
            case 2:
                return [b.Minor, Ae(a, b)];
            case 3:
                return [b.Minor, Be(a, b)];
            case 4:
                return [b.Minor, Ce(a, b)]
        }
        throw new Error("ECMA-376 Encrypted file unrecognized Version: " + b.Minor)
    }

    function Ae(a) {
        if (36 != (63 & a.read_shift(4))) throw new Error("EncryptionInfo mismatch");
        return {t: "Std", h: xe(a, a.read_shift(4)), v: ye(a, a.length - a.l)}
    }

    function Be() {
        throw new Error("File is password-protected: ECMA-376 Extensible")
    }

    function Ce(a) {
        var b = ["saltSize", "blockSize", "keyBits", "hashSize", "cipherAlgorithm", "cipherChaining", "hashAlgorithm", "saltValue"];
        a.l += 4;
        var c = a.read_shift(a.length - a.l, "utf8"), d = {};
        return c.replace(im, function (a) {
            var c = P(a);
            switch (Q(c[0])) {
                case"<?xml":
                    break;
                case"<encryption":
                case"</encryption>":
                    break;
                case"<keyData":
                    b.forEach(function (a) {
                        d[a] = c[a]
                    });
                    break;
                case"<dataIntegrity":
                    d.encryptedHmacKey = c.encryptedHmacKey, d.encryptedHmacValue = c.encryptedHmacValue;
                    break;
                case"<keyEncryptors>":
                case"<keyEncryptors":
                    d.encs = [];
                    break;
                case"</keyEncryptors>":
                    break;
                case"<keyEncryptor":
                    d.uri = c.uri;
                    break;
                case"</keyEncryptor>":
                    break;
                case"<encryptedKey":
                    d.encs.push(c);
                    break;
                default:
                    throw c[0]
            }
        }), d
    }

    function De(a, b) {
        var c = {}, d = c.EncryptionVersionInfo = qe(a, 4);
        if (b -= 4, 2 != d.Minor) throw new Error("unrecognized minor version code: " + d.Minor);
        if (d.Major > 4 || d.Major < 2) throw new Error("unrecognized major version code: " + d.Major);
        c.Flags = a.read_shift(4), b -= 4;
        var e = a.read_shift(4);
        return b -= 4, c.EncryptionHeader = xe(a, e), b -= e, c.EncryptionVerifier = ye(a, b), c
    }

    function Ee(a) {
        var b = {}, c = b.EncryptionVersionInfo = qe(a, 4);
        if (1 != c.Major || 1 != c.Minor) throw"unrecognized version code " + c.Major + " : " + c.Minor;
        return b.Salt = a.read_shift(16), b.EncryptedVerifier = a.read_shift(16), b.EncryptedVerifierHash = a.read_shift(16), b
    }

    function Fe(a) {
        var b, c, d, e, f, h, i = 0, j = pe(a), k = j.length + 1;
        for (b = g(k), b[0] = j.length, c = 1; c != k; ++c) b[c] = j[c - 1];
        for (c = k - 1; c >= 0; --c) d = b[c], e = 0 == (16384 & i) ? 0 : 1, f = i << 1 & 32767, h = e | f, i = h ^ d;
        return 52811 ^ i
    }

    function Ge(a, b, c, d) {
        var e = {key: dc(a), verificationBytes: dc(a)};
        return c.password && (e.verifier = Fe(c.password)), d.valid = e.verificationBytes === e.verifier, d.valid && (d.insitu = Io(c.password)), e
    }

    function He(a, b, c) {
        var d = c || {};
        return d.Info = a.read_shift(2), a.l -= 2, 1 === d.Info ? d.Data = Ee(a, b) : d.Data = De(a, b), d
    }

    function Ie(a, b, c) {
        var d = {Type: c.biff >= 8 ? a.read_shift(2) : 0};
        return d.Type ? He(a, b - 2, d) : Ge(a, c.biff >= 8 ? b : b - 2, c, d), d
    }

    function Je(a) {
        var b = a.slice("#" === a[0] ? 1 : 0).slice(0, 6);
        return [parseInt(b.slice(0, 2), 16), parseInt(b.slice(2, 4), 16), parseInt(b.slice(4, 6), 16)]
    }

    function Ke(a) {
        for (var b = 0, c = 1; 3 != b; ++b) c = 256 * c + (a[b] > 255 ? 255 : a[b] < 0 ? 0 : a[b]);
        return c.toString(16).toUpperCase().slice(1)
    }

    function Le(a) {
        var b = a[0] / 255, c = a[1] / 255, d = a[2] / 255, e = Math.max(b, c, d), f = Math.min(b, c, d), g = e - f;
        if (0 === g) return [0, 0, b];
        var h = 0, i = 0, j = e + f;
        switch (i = g / (j > 1 ? 2 - j : j), e) {
            case b:
                h = ((c - d) / g + 6) % 6;
                break;
            case c:
                h = (d - b) / g + 2;
                break;
            case d:
                h = (b - c) / g + 4
        }
        return [h / 6, i, j / 2]
    }

    function Me(a) {
        var b, c = a[0], d = a[1], e = a[2], f = 2 * d * (e < .5 ? e : 1 - e), g = e - f / 2, h = [g, g, g], i = 6 * c;
        if (0 !== d) switch (0 | i) {
            case 0:
            case 6:
                b = f * i, h[0] += f, h[1] += b;
                break;
            case 1:
                b = f * (2 - i), h[0] += b, h[1] += f;
                break;
            case 2:
                b = f * (i - 2), h[1] += f, h[2] += b;
                break;
            case 3:
                b = f * (4 - i), h[1] += b, h[2] += f;
                break;
            case 4:
                b = f * (i - 4), h[2] += f, h[0] += b;
                break;
            case 5:
                b = f * (6 - i), h[2] += b, h[0] += f
        }
        for (var j = 0; 3 != j; ++j) h[j] = Math.round(255 * h[j]);
        return h
    }

    function Ne(a, b) {
        if (0 === b) return a;
        var c = Le(Je(a));
        return c[2] = b < 0 ? c[2] * (1 + b) : 1 - (1 - c[2]) * (1 - b), Ke(Me(c))
    }

    function Oe(a) {
        return Math.floor((a + Math.round(128 / No) / 256) * No)
    }

    function Pe(a) {
        return Math.floor((a - 5) / No * 100 + .5) / 100
    }

    function Qe(a) {
        return Math.round((a * No + 5) / No * 256) / 256
    }

    function Re(a) {
        return Qe(Pe(Oe(a)))
    }

    function Se(a) {
        var b = Math.abs(a - Re(a)), c = No;
        if (b > .005) for (No = Mo; No < Lo; ++No) Math.abs(a - Re(a)) <= b && (b = Math.abs(a - Re(a)), c = No);
        No = c
    }

    function Te(a) {
        a.width ? (a.wpx = Oe(a.width), a.wch = Pe(a.wpx), a.MDW = No) : a.wpx ? (a.wch = Pe(a.wpx), a.width = Qe(a.wch), a.MDW = No) : "number" == typeof a.wch && (a.width = Qe(a.wch), a.wpx = Oe(a.width), a.MDW = No), a.customWidth && delete a.customWidth
    }

    function Ue(a) {
        return 96 * a / Po
    }

    function Ve(a) {
        return a * Po / 96
    }

    function We(a, b, c, d) {
        b.Borders = [];
        var e = {}, f = !1;
        a[0].match(im).forEach(function (a) {
            var c = P(a);
            switch (Q(c[0])) {
                case"<borders":
                case"<borders>":
                case"</borders>":
                    break;
                case"<border":
                case"<border>":
                case"<border/>":
                    e = {}, c.diagonalUp && (e.diagonalUp = c.diagonalUp), c.diagonalDown && (e.diagonalDown = c.diagonalDown), b.Borders.push(e);
                    break;
                case"</border>":
                case"<left/>":
                    break;
                case"<left":
                case"<left>":
                case"</left>":
                case"<right/>":
                    break;
                case"<right":
                case"<right>":
                case"</right>":
                case"<top/>":
                    break;
                case"<top":
                case"<top>":
                case"</top>":
                case"<bottom/>":
                    break;
                case"<bottom":
                case"<bottom>":
                case"</bottom>":
                    break;
                case"<diagonal":
                case"<diagonal>":
                case"<diagonal/>":
                case"</diagonal>":
                    break;
                case"<horizontal":
                case"<horizontal>":
                case"<horizontal/>":
                case"</horizontal>":
                    break;
                case"<vertical":
                case"<vertical>":
                case"<vertical/>":
                case"</vertical>":
                    break;
                case"<start":
                case"<start>":
                case"<start/>":
                case"</start>":
                    break;
                case"<end":
                case"<end>":
                case"<end/>":
                case"</end>":
                    break;
                case"<color":
                case"<color>":
                    break;
                case"<color/>":
                case"</color>":
                    break;
                case"<extLst":
                case"<extLst>":
                case"</extLst>":
                    break;
                case"<ext":
                    f = !0;
                    break;
                case"</ext>":
                    f = !1;
                    break;
                default:
                    if (d && d.WTF && !f) throw new Error("unrecognized " + c[0] + " in borders")
            }
        })
    }

    function Xe(a, b, c, d) {
        b.Fills = [];
        var e = {}, f = !1;
        a[0].match(im).forEach(function (a) {
            var c = P(a);
            switch (Q(c[0])) {
                case"<fills":
                case"<fills>":
                case"</fills>":
                    break;
                case"<fill>":
                case"<fill":
                case"<fill/>":
                    e = {}, b.Fills.push(e);
                    break;
                case"</fill>":
                case"<gradientFill>":
                    break;
                case"<gradientFill":
                case"</gradientFill>":
                    b.Fills.push(e), e = {};
                    break;
                case"<patternFill":
                case"<patternFill>":
                    c.patternType && (e.patternType = c.patternType);
                    break;
                case"<patternFill/>":
                case"</patternFill>":
                    break;
                case"<bgColor":
                    e.bgColor || (e.bgColor = {}), c.indexed && (e.bgColor.indexed = parseInt(c.indexed, 10)), c.theme && (e.bgColor.theme = parseInt(c.theme, 10)), c.tint && (e.bgColor.tint = parseFloat(c.tint)), c.rgb && (e.bgColor.rgb = c.rgb.slice(-6));
                    break;
                case"<bgColor/>":
                case"</bgColor>":
                    break;
                case"<fgColor":
                    e.fgColor || (e.fgColor = {}), c.theme && (e.fgColor.theme = parseInt(c.theme, 10)), c.tint && (e.fgColor.tint = parseFloat(c.tint)), c.rgb && (e.fgColor.rgb = c.rgb.slice(-6));
                    break;
                case"<fgColor/>":
                case"</fgColor>":
                    break;
                case"<stop":
                case"<stop/>":
                case"</stop>":
                    break;
                case"<color":
                case"<color/>":
                case"</color>":
                    break;
                case"<extLst":
                case"<extLst>":
                case"</extLst>":
                    break;
                case"<ext":
                    f = !0;
                    break;
                case"</ext>":
                    f = !1;
                    break;
                default:
                    if (d && d.WTF && !f) throw new Error("unrecognized " + c[0] + " in fills")
            }
        })
    }

    function Ye(a, b, c, d) {
        b.Fonts = [];
        var e = {}, f = !1;
        a[0].match(im).forEach(function (a) {
            var g = P(a);
            switch (Q(g[0])) {
                case"<fonts":
                case"<fonts>":
                case"</fonts>":
                    break;
                case"<font":
                case"<font>":
                    break;
                case"</font>":
                case"<font/>":
                    b.Fonts.push(e), e = {};
                    break;
                case"<name":
                    g.val && (e.name = g.val);
                    break;
                case"<name/>":
                case"</name>":
                    break;
                case"<b":
                    e.bold = g.val ? V(g.val) : 1;
                    break;
                case"<b/>":
                    e.bold = 1;
                    break;
                case"<i":
                    e.italic = g.val ? V(g.val) : 1;
                    break;
                case"<i/>":
                    e.italic = 1;
                    break;
                case"<u":
                    switch (g.val) {
                        case"none":
                            e.underline = 0;
                            break;
                        case"single":
                            e.underline = 1;
                            break;
                        case"double":
                            e.underline = 2;
                            break;
                        case"singleAccounting":
                            e.underline = 33;
                            break;
                        case"doubleAccounting":
                            e.underline = 34
                    }
                    break;
                case"<u/>":
                    e.underline = 1;
                    break;
                case"<strike":
                    e.strike = g.val ? V(g.val) : 1;
                    break;
                case"<strike/>":
                    e.strike = 1;
                    break;
                case"<outline":
                    e.outline = g.val ? V(g.val) : 1;
                    break;
                case"<outline/>":
                    e.outline = 1;
                    break;
                case"<shadow":
                    e.shadow = g.val ? V(g.val) : 1;
                    break;
                case"<shadow/>":
                    e.shadow = 1;
                    break;
                case"<condense":
                    e.condense = g.val ? V(g.val) : 1;
                    break;
                case"<condense/>":
                    e.condense = 1;
                    break;
                case"<extend":
                    e.extend = g.val ? V(g.val) : 1;
                    break;
                case"<extend/>":
                    e.extend = 1;
                    break;
                case"<sz":
                    g.val && (e.sz = +g.val);
                    break;
                case"<sz/>":
                case"</sz>":
                    break;
                case"<vertAlign":
                    g.val && (e.vertAlign = g.val);
                    break;
                case"<vertAlign/>":
                case"</vertAlign>":
                    break;
                case"<family":
                    g.val && (e.family = parseInt(g.val, 10));
                    break;
                case"<family/>":
                case"</family>":
                    break;
                case"<scheme":
                    g.val && (e.scheme = g.val);
                    break;
                case"<scheme/>":
                case"</scheme>":
                    break;
                case"<charset":
                    if ("1" == g.val) break;
                    g.codepage = El[parseInt(g.val, 10)];
                    break;
                case"<color":
                    if (e.color || (e.color = {}), g.auto && (e.color.auto = V(g.auto)), g.rgb) e.color.rgb = g.rgb.slice(-6); else if (g.indexed) {
                        e.color.index = parseInt(g.indexed, 10);
                        var h = On[e.color.index];
                        if (81 == e.color.index && (h = On[1]), !h) throw new Error(a);
                        e.color.rgb = h[0].toString(16) + h[1].toString(16) + h[2].toString(16)
                    } else g.theme && (e.color.theme = parseInt(g.theme, 10), g.tint && (e.color.tint = parseFloat(g.tint)), g.theme && c.themeElements && c.themeElements.clrScheme && (e.color.rgb = Ne(c.themeElements.clrScheme[e.color.theme].rgb, e.color.tint || 0)));
                    break;
                case"<color/>":
                case"</color>":
                    break;
                case"<extLst":
                case"<extLst>":
                case"</extLst>":
                    break;
                case"<ext":
                    f = !0;
                    break;
                case"</ext>":
                    f = !1;
                    break;
                default:
                    if (d && d.WTF && !f) throw new Error("unrecognized " + g[0] + " in fonts")
            }
        })
    }

    function Ze(a, b, c) {
        b.NumberFmt = [];
        for (var d = r(Tl._table), e = 0; e < d.length; ++e) b.NumberFmt[d[e]] = Tl._table[d[e]];
        var f = a[0].match(im);
        if (f) for (e = 0; e < f.length; ++e) {
            var g = P(f[e]);
            switch (Q(g[0])) {
                case"<numFmts":
                case"</numFmts>":
                case"<numFmts/>":
                case"<numFmts>":
                    break;
                case"<numFmt":
                    var h = nm(tm(g.formatCode)), i = parseInt(g.numFmtId, 10);
                    if (b.NumberFmt[i] = h, i > 0) {
                        if (i > 392) {
                            for (i = 392; i > 60 && null != b.NumberFmt[i]; --i) ;
                            b.NumberFmt[i] = h
                        }
                        Tl.load(h, i)
                    }
                    break;
                case"</numFmt>":
                    break;
                default:
                    if (c.WTF) throw new Error("unrecognized " + g[0] + " in numFmts")
            }
        }
    }

    function $e(a) {
        var b = ["<numFmts>"];
        return [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function (c) {
            for (var d = c[0]; d <= c[1]; ++d) null != a[d] && (b[b.length] = Z("numFmt", null, {
                numFmtId: d,
                formatCode: R(a[d])
            }))
        }), 1 === b.length ? "" : (b[b.length] = "</numFmts>", b[0] = Z("numFmts", null, {count: b.length - 2}).replace("/>", ">"), b.join(""))
    }

    function _e(a, b, c) {
        b.CellXf = [];
        var d, e = !1;
        a[0].match(im).forEach(function (a) {
            var f = P(a), g = 0;
            switch (Q(f[0])) {
                case"<cellXfs":
                case"<cellXfs>":
                case"<cellXfs/>":
                case"</cellXfs>":
                    break;
                case"<xf":
                case"<xf/>":
                    for (d = f, delete d[0], g = 0; g < Ro.length; ++g) d[Ro[g]] && (d[Ro[g]] = parseInt(d[Ro[g]], 10));
                    for (g = 0; g < So.length; ++g) d[So[g]] && (d[So[g]] = V(d[So[g]]));
                    if (d.numFmtId > 392) for (g = 392; g > 60; --g) if (b.NumberFmt[d.numFmtId] == b.NumberFmt[g]) {
                        d.numFmtId = g;
                        break
                    }
                    b.CellXf.push(d);
                    break;
                case"</xf>":
                    break;
                case"<alignment":
                case"<alignment/>":
                    var h = {};
                    f.vertical && (h.vertical = f.vertical), f.horizontal && (h.horizontal = f.horizontal), null != f.textRotation && (h.textRotation = f.textRotation), f.indent && (h.indent = f.indent), f.wrapText && (h.wrapText = f.wrapText), d.alignment = h;
                    break;
                case"</alignment>":
                    break;
                case"<protection":
                case"</protection>":
                case"<protection/>":
                    break;
                case"<extLst":
                case"<extLst>":
                case"</extLst>":
                    break;
                case"<ext":
                    e = !0;
                    break;
                case"</ext>":
                    e = !1;
                    break;
                default:
                    if (c && c.WTF && !e) throw new Error("unrecognized " + f[0] + " in cellXfs")
            }
        })
    }

    function af(a) {
        var b = [];
        return b[b.length] = Z("cellXfs", null), a.forEach(function (a) {
            b[b.length] = Z("xf", null, a)
        }), b[b.length] = "</cellXfs>", 2 === b.length ? "" : (b[0] = Z("cellXfs", null, {count: b.length - 2}).replace("/>", ">"), b.join(""))
    }

    function bf(a, b) {
        if ("undefined" != typeof style_builder) return style_builder.toXml();
        var c, d = [gm, Uo];
        return a.SSF && null != (c = $e(a.SSF)) && (d[d.length] = c), d[d.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>', d[d.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>', d[d.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>', d[d.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>', (c = af(b.cellXfs)) && (d[d.length] = c), d[d.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>', d[d.length] = '<dxfs count="0"/>', d[d.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>', d.length > 2 && (d[d.length] = "</styleSheet>", d[1] = d[1].replace("/>", ">")), d.join("")
    }

    function cf(a, b) {
        return [a.read_shift(2), Ka(a, b - 2)]
    }

    function df(a, b, c) {
        c || (c = ia(6 + 4 * b.length)), c.write_shift(2, a), La(b, c);
        var d = c.length > c.l ? c.slice(0, c.l) : c;
        return null == c.l && (c.l = c.length), d
    }

    function ef(a, b, c) {
        var d = {};
        d.sz = a.read_shift(2) / 20;
        var e = bb(a, 2, c);
        switch (e.fCondense && (d.condense = 1), e.fExtend && (d.extend = 1), e.fShadow && (d.shadow = 1), e.fOutline && (d.outline = 1), e.fStrikeout && (d.strike = 1), e.fItalic && (d.italic = 1), 700 === a.read_shift(2) && (d.bold = 1), a.read_shift(2)) {
            case 1:
                d.vertAlign = "superscript";
                break;
            case 2:
                d.vertAlign = "subscript"
        }
        var f = a.read_shift(1);
        0 != f && (d.underline = f);
        var g = a.read_shift(1);
        g > 0 && (d.family = g);
        var h = a.read_shift(1);
        switch (h > 0 && (d.charset = h), a.l++, d.color = _a(a, 8), a.read_shift(1)) {
            case 1:
                d.scheme = "major";
                break;
            case 2:
                d.scheme = "minor"
        }
        return d.name = Ka(a, b - 21), d
    }

    function ff(a, b) {
        b || (b = ia(153)), b.write_shift(2, 20 * a.sz), cb(a, b), b.write_shift(2, a.bold ? 700 : 400);
        var c = 0;
        "superscript" == a.vertAlign ? c = 1 : "subscript" == a.vertAlign && (c = 2), b.write_shift(2, c), b.write_shift(1, a.underline || 0), b.write_shift(1, a.family || 0), b.write_shift(1, a.charset || 0), b.write_shift(1, 0), ab(a.color, b);
        var d = 0;
        return "major" == a.scheme && (d = 1), "minor" == a.scheme && (d = 2), b.write_shift(1, d), La(a.name, b), b.length > b.l ? b.slice(0, b.l) : b
    }

    function gf(a, b) {
        b || (b = ia(84));
        var c = Wo[a.patternType];
        null == c && (c = 40), b.write_shift(4, c);
        var d = 0;
        if (40 != c) for (ab({auto: 1}, b), ab({auto: 1}, b); d < 12; ++d) b.write_shift(4, 0); else {
            for (; d < 4; ++d) b.write_shift(4, 0);
            for (; d < 12; ++d) b.write_shift(4, 0)
        }
        return b.length > b.l ? b.slice(0, b.l) : b
    }

    function hf(a, b) {
        var c = a.l + b, d = a.read_shift(2), e = a.read_shift(2);
        return a.l = c, {ixfe: d, numFmtId: e}
    }

    function jf(a, b, c) {
        return c || (c = ia(16)), c.write_shift(2, b || 0), c.write_shift(2, a.numFmtId || 0), c.write_shift(2, 0), c.write_shift(2, 0), c.write_shift(2, 0), c.write_shift(1, 0), c.write_shift(1, 0), c.write_shift(1, 0), c.write_shift(1, 0), c.write_shift(1, 0), c.write_shift(1, 0), c
    }

    function kf(a, b) {
        return b || (b = ia(10)), b.write_shift(1, 0), b.write_shift(1, 0), b.write_shift(4, 0), b.write_shift(4, 0), b
    }

    function lf(a, b) {
        return b || (b = ia(51)), b.write_shift(1, 0), kf(null, b), kf(null, b), kf(null, b), kf(null, b), kf(null, b), b.length > b.l ? b.slice(0, b.l) : b
    }

    function mf(a, b) {
        return b || (b = ia(52)), b.write_shift(4, a.xfId), b.write_shift(2, 1), b.write_shift(1, +a.builtinId), b.write_shift(1, 0), Ua(a.name || "", b), b.length > b.l ? b.slice(0, b.l) : b
    }

    function nf(a, b, c) {
        var d = ia(2052);
        return d.write_shift(4, a), Ua(b, d), Ua(c, d), d.length > d.l ? d.slice(0, d.l) : d
    }

    function of(a, b, c) {
        var d = {};
        d.NumberFmt = [];
        for (var e in Tl._table) d.NumberFmt[e] = Tl._table[e];
        d.CellXf = [], d.Fonts = [];
        var f = [], g = !1;
        return ja(a, function (a, e, h) {
            switch (h) {
                case 44:
                    d.NumberFmt[a[0]] = a[1], Tl.load(a[1], a[0]);
                    break;
                case 43:
                    d.Fonts.push(a), null != a.color.theme && b && b.themeElements && b.themeElements.clrScheme && (a.color.rgb = Ne(b.themeElements.clrScheme[a.color.theme].rgb, a.color.tint || 0));
                    break;
                case 1025:
                case 45:
                case 46:
                    break;
                case 47:
                    "BrtBeginCellXFs" == f[f.length - 1] && d.CellXf.push(a);
                    break;
                case 48:
                case 507:
                case 572:
                case 475:
                    break;
                case 1171:
                case 2102:
                case 1130:
                case 512:
                case 2095:
                case 3072:
                    break;
                case 35:
                    g = !0;
                    break;
                case 36:
                    g = !1;
                    break;
                case 37:
                    f.push(e);
                    break;
                case 38:
                    f.pop();
                    break;
                default:
                    if ((e || "").indexOf("Begin") > 0) f.push(e); else if ((e || "").indexOf("End") > 0) f.pop(); else if (!g || c.WTF) throw new Error("Unexpected record " + h + " " + e)
            }
        }), d
    }

    function pf(a, b) {
        if (b) {
            var c = 0;
            [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function (a) {
                for (var d = a[0]; d <= a[1]; ++d) null != b[d] && ++c
            }), 0 != c && (la(a, "BrtBeginFmts", Ja(c)), [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function (c) {
                for (var d = c[0]; d <= c[1]; ++d) null != b[d] && la(a, "BrtFmt", df(d, b[d]))
            }), la(a, "BrtEndFmts"))
        }
    }

    function qf(a) {
        var b = 1;
        0 != b && (la(a, "BrtBeginFonts", Ja(b)), la(a, "BrtFont", ff({
            sz: 12,
            color: {theme: 1},
            name: "Calibri",
            family: 2,
            scheme: "minor"
        })), la(a, "BrtEndFonts"))
    }

    function rf(a) {
        var b = 2;
        0 != b && (la(a, "BrtBeginFills", Ja(b)), la(a, "BrtFill", gf({patternType: "none"})), la(a, "BrtFill", gf({patternType: "gray125"})), la(a, "BrtEndFills"))
    }

    function sf(a) {
        var b = 1;
        0 != b && (la(a, "BrtBeginBorders", Ja(b)), la(a, "BrtBorder", lf({})), la(a, "BrtEndBorders"))
    }

    function tf(a) {
        la(a, "BrtBeginCellStyleXFs", Ja(1)), la(a, "BrtXF", jf({
            numFmtId: 0,
            fontId: 0,
            fillId: 0,
            borderId: 0
        }, 65535)), la(a, "BrtEndCellStyleXFs")
    }

    function uf(a, b) {
        la(a, "BrtBeginCellXFs", Ja(b.length)), b.forEach(function (b) {
            la(a, "BrtXF", jf(b, 0))
        }), la(a, "BrtEndCellXFs")
    }

    function vf(a) {
        la(a, "BrtBeginStyles", Ja(1)), la(a, "BrtStyle", mf({
            xfId: 0,
            builtinId: 0,
            name: "Normal"
        })), la(a, "BrtEndStyles")
    }

    function wf(a) {
        la(a, "BrtBeginDXFs", Ja(0)), la(a, "BrtEndDXFs")
    }

    function xf(a) {
        la(a, "BrtBeginTableStyles", nf(0, "TableStyleMedium9", "PivotStyleMedium4")), la(a, "BrtEndTableStyles")
    }

    function yf() {
    }

    function zf(a, b) {
        var c = ka();
        return la(c, "BrtBeginStyleSheet"), pf(c, a.SSF), qf(c, a), rf(c, a), sf(c, a), tf(c, a), uf(c, b.cellXfs), vf(c, a), wf(c, a), xf(c, a), yf(c, a), la(c, "BrtEndStyleSheet"), c.end()
    }

    function Af(a, b, c) {
        b.themeElements.clrScheme = [];
        var d = {};
        (a[0].match(im) || []).forEach(function (a) {
            var e = P(a);
            switch (e[0]) {
                case"<a:clrScheme":
                case"</a:clrScheme>":
                    break;
                case"<a:srgbClr":
                    d.rgb = e.val;
                    break;
                case"<a:sysClr":
                    d.rgb = e.lastClr;
                    break;
                case"<a:dk1>":
                case"</a:dk1>":
                case"<a:lt1>":
                case"</a:lt1>":
                case"<a:dk2>":
                case"</a:dk2>":
                case"<a:lt2>":
                case"</a:lt2>":
                case"<a:accent1>":
                case"</a:accent1>":
                case"<a:accent2>":
                case"</a:accent2>":
                case"<a:accent3>":
                case"</a:accent3>":
                case"<a:accent4>":
                case"</a:accent4>":
                case"<a:accent5>":
                case"</a:accent5>":
                case"<a:accent6>":
                case"</a:accent6>":
                case"<a:hlink>":
                case"</a:hlink>":
                case"<a:folHlink>":
                case"</a:folHlink>":
                    "/" === e[0].charAt(1) ? (b.themeElements.clrScheme.push(d), d = {}) : d.name = e[0].slice(3, e[0].length - 1);
                    break;
                default:
                    if (c && c.WTF) throw new Error("Unrecognized " + e[0] + " in clrScheme")
            }
        })
    }

    function Bf() {
    }

    function Cf() {
    }

    function Df(a, b, c) {
        b.themeElements = {};
        var d;
        [["clrScheme", Zo, Af], ["fontScheme", $o, Bf], ["fmtScheme", _o, Cf]].forEach(function (e) {
            if (!(d = a.match(e[1]))) throw new Error(e[0] + " not found in themeElements");
            e[2](d, b, c)
        })
    }

    function Ef(a, b) {
        if (!a || 0 === a.length) return Ef(Ff());
        var c, d = {};
        if (!(c = a.match(ap))) throw new Error("themeElements not found in theme");
        return Df(c[0], d, b), d
    }

    function Ff(a, b) {
        if (b && b.themeXLSX) return b.themeXLSX;
        var c = [gm];
        return c[c.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', c[c.length] = "<a:themeElements>", c[c.length] = '<a:clrScheme name="Office">', c[c.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', c[c.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', c[c.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', c[c.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', c[c.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', c[c.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', c[c.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', c[c.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', c[c.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', c[c.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', c[c.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', c[c.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', c[c.length] = "</a:clrScheme>", c[c.length] = '<a:fontScheme name="Office">', c[c.length] = "<a:majorFont>", c[c.length] = '<a:latin typeface="Cambria"/>', c[c.length] = '<a:ea typeface=""/>', c[c.length] = '<a:cs typeface=""/>', c[c.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', c[c.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', c[c.length] = '<a:font script="Hans" typeface="宋体"/>', c[c.length] = '<a:font script="Hant" typeface="新細明體"/>', c[c.length] = '<a:font script="Arab" typeface="Times New Roman"/>', c[c.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', c[c.length] = '<a:font script="Thai" typeface="Tahoma"/>', c[c.length] = '<a:font script="Ethi" typeface="Nyala"/>', c[c.length] = '<a:font script="Beng" typeface="Vrinda"/>', c[c.length] = '<a:font script="Gujr" typeface="Shruti"/>', c[c.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', c[c.length] = '<a:font script="Knda" typeface="Tunga"/>', c[c.length] = '<a:font script="Guru" typeface="Raavi"/>', c[c.length] = '<a:font script="Cans" typeface="Euphemia"/>', c[c.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', c[c.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', c[c.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', c[c.length] = '<a:font script="Thaa" typeface="MV Boli"/>', c[c.length] = '<a:font script="Deva" typeface="Mangal"/>', c[c.length] = '<a:font script="Telu" typeface="Gautami"/>', c[c.length] = '<a:font script="Taml" typeface="Latha"/>', c[c.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', c[c.length] = '<a:font script="Orya" typeface="Kalinga"/>', c[c.length] = '<a:font script="Mlym" typeface="Kartika"/>', c[c.length] = '<a:font script="Laoo" typeface="DokChampa"/>', c[c.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', c[c.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', c[c.length] = '<a:font script="Viet" typeface="Times New Roman"/>', c[c.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', c[c.length] = '<a:font script="Geor" typeface="Sylfaen"/>', c[c.length] = "</a:majorFont>", c[c.length] = "<a:minorFont>", c[c.length] = '<a:latin typeface="Calibri"/>', c[c.length] = '<a:ea typeface=""/>', c[c.length] = '<a:cs typeface=""/>', c[c.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', c[c.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', c[c.length] = '<a:font script="Hans" typeface="宋体"/>', c[c.length] = '<a:font script="Hant" typeface="新細明體"/>', c[c.length] = '<a:font script="Arab" typeface="Arial"/>', c[c.length] = '<a:font script="Hebr" typeface="Arial"/>', c[c.length] = '<a:font script="Thai" typeface="Tahoma"/>', c[c.length] = '<a:font script="Ethi" typeface="Nyala"/>', c[c.length] = '<a:font script="Beng" typeface="Vrinda"/>', c[c.length] = '<a:font script="Gujr" typeface="Shruti"/>', c[c.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', c[c.length] = '<a:font script="Knda" typeface="Tunga"/>', c[c.length] = '<a:font script="Guru" typeface="Raavi"/>', c[c.length] = '<a:font script="Cans" typeface="Euphemia"/>', c[c.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', c[c.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', c[c.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', c[c.length] = '<a:font script="Thaa" typeface="MV Boli"/>', c[c.length] = '<a:font script="Deva" typeface="Mangal"/>', c[c.length] = '<a:font script="Telu" typeface="Gautami"/>', c[c.length] = '<a:font script="Taml" typeface="Latha"/>', c[c.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', c[c.length] = '<a:font script="Orya" typeface="Kalinga"/>', c[c.length] = '<a:font script="Mlym" typeface="Kartika"/>', c[c.length] = '<a:font script="Laoo" typeface="DokChampa"/>', c[c.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', c[c.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', c[c.length] = '<a:font script="Viet" typeface="Arial"/>', c[c.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', c[c.length] = '<a:font script="Geor" typeface="Sylfaen"/>', c[c.length] = "</a:minorFont>", c[c.length] = "</a:fontScheme>", c[c.length] = '<a:fmtScheme name="Office">', c[c.length] = "<a:fillStyleLst>", c[c.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', c[c.length] = '<a:gradFill rotWithShape="1">', c[c.length] = "<a:gsLst>", c[c.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', c[c.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', c[c.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', c[c.length] = "</a:gsLst>", c[c.length] = '<a:lin ang="16200000" scaled="1"/>', c[c.length] = "</a:gradFill>", c[c.length] = '<a:gradFill rotWithShape="1">', c[c.length] = "<a:gsLst>",c[c.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>',c[c.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>',c[c.length] = "</a:gsLst>",c[c.length] = '<a:lin ang="16200000" scaled="0"/>',c[c.length] = "</a:gradFill>",c[c.length] = "</a:fillStyleLst>",c[c.length] = "<a:lnStyleLst>",c[c.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>',c[c.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>',c[c.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>',c[c.length] = "</a:lnStyleLst>",c[c.length] = "<a:effectStyleLst>",c[c.length] = "<a:effectStyle>",c[c.length] = "<a:effectLst>",c[c.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>',c[c.length] = "</a:effectLst>",c[c.length] = "</a:effectStyle>",c[c.length] = "<a:effectStyle>",c[c.length] = "<a:effectLst>",c[c.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>',c[c.length] = "</a:effectLst>",c[c.length] = "</a:effectStyle>",c[c.length] = "<a:effectStyle>",c[c.length] = "<a:effectLst>",c[c.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>',c[c.length] = "</a:effectLst>",c[c.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>',c[c.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>',c[c.length] = "</a:effectStyle>",c[c.length] = "</a:effectStyleLst>",c[c.length] = "<a:bgFillStyleLst>",c[c.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>',c[c.length] = '<a:gradFill rotWithShape="1">',c[c.length] = "<a:gsLst>",c[c.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>',c[c.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>',c[c.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>',c[c.length] = "</a:gsLst>",c[c.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>',c[c.length] = "</a:gradFill>",c[c.length] = '<a:gradFill rotWithShape="1">',c[c.length] = "<a:gsLst>",c[c.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>',c[c.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>',c[c.length] = "</a:gsLst>",c[c.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>',c[c.length] = "</a:gradFill>",c[c.length] = "</a:bgFillStyleLst>",c[c.length] = "</a:fmtScheme>",c[c.length] = "</a:themeElements>",c[c.length] = "<a:objectDefaults>",c[c.length] = "<a:spDef>",c[c.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>',c[c.length] = "</a:spDef>",c[c.length] = "<a:lnDef>",c[c.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>',c[c.length] = "</a:lnDef>",c[c.length] = "</a:objectDefaults>",c[c.length] = "<a:extraClrSchemeLst/>",c[c.length] = "</a:theme>",c.join("")
    }

    function Gf(a, b, c) {
        var d = a.l + b;
        if (124226 !== a.read_shift(4)) {
            if (!c.cellStyles || !dm) return void (a.l = d);
            var e = a.slice(a.l);
            a.l = d;
            var f;
            try {
                f = new dm(e)
            } catch (a) {
                return
            }
            var g = M(f, "theme/theme/theme1.xml", !0);
            if (g) return Ef(g, c)
        }
    }

    function Hf(a) {
        return a.read_shift(4)
    }

    function If(a) {
        var b = {};
        switch (b.xclrType = a.read_shift(2), b.nTintShade = a.read_shift(2), b.xclrType) {
            case 0:
                a.l += 4;
                break;
            case 1:
                b.xclrValue = Jf(a, 4);
                break;
            case 2:
                b.xclrValue = vc(a, 4);
                break;
            case 3:
                b.xclrValue = Hf(a, 4);
                break;
            case 4:
                a.l += 4
        }
        return a.l += 8, b
    }

    function Jf(a, b) {
        return ha(a, b)
    }

    function Kf(a, b) {
        return ha(a, b)
    }

    function Lf(a) {
        var b = a.read_shift(2), c = a.read_shift(2) - 4, d = [b];
        switch (b) {
            case 4:
            case 5:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 13:
                d[1] = If(a, c);
                break;
            case 6:
                d[1] = Kf(a, c);
                break;
            case 14:
            case 15:
                d[1] = a.read_shift(1 === c ? 1 : 2);
                break;
            default:
                throw new Error("Unrecognized ExtProp type: " + b + " " + c)
        }
        return d
    }

    function Mf(a, b) {
        var c = a.l + b;
        a.l += 2;
        var d = a.read_shift(2);
        a.l += 2;
        for (var e = a.read_shift(2), f = []; e-- > 0;) f.push(Lf(a, c - a.l));
        return {ixfe: d, ext: f}
    }

    function Nf(a, b) {
        b.forEach(function (a) {
            a[0]
        })
    }

    function Of(a) {
        var b = [];
        if (!a) return b;
        var c = 1;
        return (a.match(im) || []).forEach(function (a) {
            var d = P(a);
            switch (d[0]) {
                case"<?xml":
                    break;
                case"<calcChain":
                case"<calcChain>":
                case"</calcChain>":
                    break;
                case"<c":
                    delete d[0], d.i ? c = d.i : d.i = c, b.push(d)
            }
        }), b
    }

    function Pf(a) {
        var b = {};
        b.i = a.read_shift(4);
        var c = {};
        c.r = a.read_shift(4), c.c = a.read_shift(4), b.r = Aa(c);
        var d = a.read_shift(1);
        return 2 & d && (b.l = "1"), 8 & d && (b.a = "1"), b
    }

    function Qf(a, b, c) {
        var d = [];
        return ja(a, function (a, b, c) {
            switch (c) {
                case 63:
                    d.push(a);
                    break;
                default:
                    if ((b || "").indexOf("Begin") > 0) ; else if (!((b || "").indexOf("End") > 0)) throw new Error("Unexpected record " + c + " " + b)
            }
        }), d
    }

    function Rf() {
    }

    function Sf(a, b, c) {
        if (!a) return a;
        var d = c || {}, e = !1;
        ja(a, function (a, b, c) {
            switch (c) {
                case 359:
                case 363:
                case 364:
                case 366:
                case 367:
                case 368:
                case 369:
                case 370:
                case 371:
                case 472:
                case 577:
                case 578:
                case 579:
                case 580:
                case 581:
                case 582:
                case 583:
                case 584:
                case 585:
                case 586:
                case 587:
                    break;
                case 35:
                    e = !0;
                    break;
                case 36:
                    e = !1;
                    break;
                default:
                    if ((b || "").indexOf("Begin") > 0) ; else if ((b || "").indexOf("End") > 0) ; else if (!e || d.WTF) throw new Error("Unexpected record " + c.toString(16) + " " + b)
            }
        }, d)
    }

    function Tf(a, b) {
        if (!a) return "??";
        var c = (a.match(/<c:chart [^>]*r:id="([^"]*)"/) || ["", ""])[1];
        return b["!id"][c].Target
    }

    function Uf(a, b) {
        for (var c = [21600, 21600], d = ["m0,0l0", c[1], c[0], c[1], c[0], "0xe"].join(","), e = [Z("xml", null, {
            "xmlns:v": Hm.v,
            "xmlns:o": Hm.o,
            "xmlns:x": Hm.x,
            "xmlns:mv": Hm.mv
        }).replace(/\/>/, ">"), Z("o:shapelayout", Z("o:idmap", null, {
            "v:ext": "edit",
            data: a
        }), {"v:ext": "edit"}), Z("v:shapetype", [Z("v:stroke", null, {joinstyle: "miter"}), Z("v:path", null, {
            gradientshapeok: "t",
            "o:connecttype": "rect"
        })].join(""), {id: "_x0000_t202", "o:spt": 202, coordsize: c.join(","), path: d})]; bp < 1e3 * a;) bp += 1e3;
        return b.forEach(function (a) {
            var b = za(a[0]);
            e = e.concat(["<v:shape" + Y({
                id: "_x0000_s" + ++bp,
                type: "#_x0000_t202",
                style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (a[1].hidden ? ";visibility:hidden" : ""),
                fillcolor: "#ECFAD4",
                strokecolor: "#edeaa1"
            }) + ">", Z("v:fill", Z("o:fill", null, {type: "gradientUnscaled", "v:ext": "view"}), {
                color2: "#BEFF82",
                angle: "-180",
                type: "gradient"
            }), Z("v:shadow", null, {
                on: "t",
                obscured: "t"
            }), Z("v:path", null, {"o:connecttype": "none"}), '<v:textbox><div style="text-align:left"></div></v:textbox>', '<x:ClientData ObjectType="Note">', "<x:MoveWithCells/>", "<x:SizeWithCells/>", X("x:Anchor", [b.c, 0, b.r, 0, b.c + 3, 100, b.r + 5, 100].join(",")), X("x:AutoFill", "False"), X("x:Row", String(b.r)), X("x:Column", String(b.c)), a[1].hidden ? "" : "<x:Visible/>", "</x:ClientData>", "</v:shape>"])
        }), e.push("</xml>"), e.join("")
    }

    function Vf(a, b, c, d, e) {
        for (var f = 0; f != b.length; ++f) {
            var g = b[f], h = Fj(L(a, g.replace(/^\//, ""), !0), g, e);
            if (h && h.length) for (var i = r(c), j = 0; j != i.length; ++j) {
                var k = i[j], l = d[k];
                if (l) {
                    var m = l[g];
                    m && Wf(k, c[k], h)
                }
            }
        }
    }

    function Wf(a, b, c) {
        var d, e = Array.isArray(b);
        c.forEach(function (a) {
            var c = za(a.ref);
            if (e ? (b[c.r] || (b[c.r] = []), d = b[c.r][c.c]) : d = b[a.ref], !d) {
                d = {}, e ? b[c.r][c.c] = d : b[a.ref] = d;
                var f = Da(b["!ref"] || "BDWGO1000001:A1");
                f.s.r > c.r && (f.s.r = c.r), f.e.r < c.r && (f.e.r = c.r), f.s.c > c.c && (f.s.c = c.c), f.e.c < c.c && (f.e.c = c.c);
                var g = Ca(f);
                g !== b["!ref"] && (b["!ref"] = g)
            }
            d.c || (d.c = []);
            var h = {a: a.author, t: a.t, r: a.r};
            a.h && (h.h = a.h), d.c.push(h)
        })
    }

    function Xf(a, b) {
        if (a.match(/<(?:\w+:)?comments *\/>/)) return [];
        var c = [], d = [], e = a.match(/<(?:\w+:)?authors>([\s\S]*)<\/(?:\w+:)?authors>/);
        e && e[1] && e[1].split(/<\/\w*:?author>/).forEach(function (a) {
            if ("" !== a && "" !== a.trim()) {
                var b = a.match(/<(?:\w+:)?author[^>]*>(.*)/);
                b && c.push(b[1])
            }
        });
        var f = a.match(/<(?:\w+:)?commentList>([\s\S]*)<\/(?:\w+:)?commentList>/);
        return f && f[1] && f[1].split(/<\/\w*:?comment>/).forEach(function (a) {
            if ("" !== a && "" !== a.trim()) {
                var e = a.match(/<(?:\w+:)?comment[^>]*>/);
                if (e) {
                    var f = P(e[0]),
                        g = {author: f.authorId && c[f.authorId] || "sheetjsghost", ref: f.ref, guid: f.guid},
                        h = za(f.ref);
                    if (!(b.sheetRows && b.sheetRows <= h.r)) {
                        var i = a.match(/<(?:\w+:)?text>([\s\S]*)<\/(?:\w+:)?text>/),
                            j = !!i && !!i[1] && ie(i[1]) || {r: "", t: "", h: ""};
                        g.r = j.r, "<t></t>" == j.r && (j.t = j.h = ""), g.t = j.t.replace(/\r\n/g, "\n").replace(/\r/g, "\n"), b.cellHTML && (g.h = j.h), d.push(g)
                    }
                }
            }
        }), d
    }

    function Yf(a) {
        var b = [gm, cp], c = [];
        return b.push("<authors>"), a.forEach(function (a) {
            a[1].forEach(function (a) {
                var d = R(a.a);
                c.indexOf(d) > -1 || (c.push(d), b.push("<author>" + d + "</author>"))
            })
        }), b.push("</authors>"), b.push("<commentList>"), a.forEach(function (a) {
            a[1].forEach(function (d) {
                b.push('<comment ref="' + a[0] + '" authorId="' + c.indexOf(R(d.a)) + '"><text>'), b.push(X("t", null == d.t ? "" : R(d.t))), b.push("</text></comment>")
            })
        }), b.push("</commentList>"), b.length > 2 && (b[b.length] = "</comments>", b[1] = b[1].replace("/>", ">")), b.join("")
    }

    function Zf(a) {
        var b = {};
        b.iauthor = a.read_shift(4);
        var c = qn(a, 16);
        return b.rfx = c.s, b.ref = Aa(c.s), a.l += 16, b
    }

    function $f(a, b) {
        return null == b && (b = ia(36)), b.write_shift(4, a[1].iauthor), rn(a[0], b), b.write_shift(4, 0), b.write_shift(4, 0), b.write_shift(4, 0), b.write_shift(4, 0), b
    }

    function _f(a) {
        return La(a.slice(0, 54))
    }

    function ag(a, b) {
        var c = [], d = [], e = {}, f = !1;
        return ja(a, function (a, g, h) {
            switch (h) {
                case 632:
                    d.push(a);
                    break;
                case 635:
                    e = a;
                    break;
                case 637:
                    e.t = a.t, e.h = a.h, e.r = a.r;
                    break;
                case 636:
                    if (e.author = d[e.iauthor], delete e.iauthor, b.sheetRows && b.sheetRows <= e.rfx.r) break;
                    e.t || (e.t = ""), delete e.rfx, c.push(e);
                    break;
                case 3072:
                    break;
                case 35:
                    f = !0;
                    break;
                case 36:
                    f = !1;
                    break;
                case 37:
                case 38:
                    break;
                default:
                    if ((g || "").indexOf("Begin") > 0) ; else if ((g || "").indexOf("End") > 0) ; else if (!f || b.WTF) throw new Error("Unexpected record " + h + " " + g)
            }
        }), c
    }

    function bg(a) {
        var b = ka(), c = [];
        return la(b, "BrtBeginComments"), la(b, "BrtBeginCommentAuthors"), a.forEach(function (a) {
            a[1].forEach(function (a) {
                c.indexOf(a.a) > -1 || (c.push(a.a.slice(0, 54)), la(b, "BrtCommentAuthor", _f(a.a)))
            })
        }), la(b, "BrtEndCommentAuthors"), la(b, "BrtBeginCommentList"), a.forEach(function (a) {
            a[1].forEach(function (d) {
                d.iauthor = c.indexOf(d.a);
                var e = {s: za(a[0]), e: za(a[0])};
                la(b, "BrtBeginComment", $f([e, d])), d.t && d.t.length > 0 && la(b, "BrtCommentText", Qa(d)), la(b, "BrtEndComment"), delete d.iauthor
            })
        }), la(b, "BrtEndCommentList"), la(b, "BrtEndComments"), b.end()
    }

    function cg(a) {
        var b = $l.utils.cfb_new({root: "R"});
        return a.FullPaths.forEach(function (c, d) {
            if ("/" !== c.slice(-1) && c.match(/_VBA_PROJECT_CUR/)) {
                var e = c.replace(/^[^\/]*/, "R").replace(/\/_VBA_PROJECT_CUR\u0000*/, "");
                $l.utils.cfb_add(b, e, a.FileIndex[d].content)
            }
        }), $l.write(b)
    }

    function dg(a, b) {
        b.FullPaths.forEach(function (c, d) {
            if (0 != d) {
                var e = c.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
                "/" !== e.slice(-1) && $l.utils.cfb_add(a, e, b.FileIndex[d].content)
            }
        })
    }

    function eg() {
        return {"!type": "dialog"}
    }

    function fg() {
        return {"!type": "dialog"}
    }

    function gg() {
        return {"!type": "macro"}
    }

    function hg() {
        return {"!type": "macro"}
    }

    function ig(a, b) {
        return a.replace(hp, function (a, c, d, e, f, g) {
            return c + ("$" == d ? d + e : va(ua(e) + b.c)) + ("$" == f ? f + g : ra(qa(g) + b.r))
        })
    }

    function jg(a, b, c) {
        var d = Ba(b), e = d.s, f = za(c);
        return ig(a, {r: f.r - e.r, c: f.c - e.c})
    }

    function kg(a) {
        return 1 != a.length
    }

    function lg(a) {
        return a.replace(/_xlfn\./g, "")
    }

    function mg(a) {
        a.l += 1
    }

    function ng(a, b) {
        var c = a.read_shift(1 == b ? 1 : 2);
        return [16383 & c, c >> 14 & 1, c >> 15 & 1]
    }

    function og(a, b, c) {
        var d = 2;
        if (c) {
            if (c.biff >= 2 && c.biff <= 5) return pg(a, b, c);
            12 == c.biff && (d = 4)
        }
        var e = a.read_shift(d), f = a.read_shift(d), g = ng(a, 2), h = ng(a, 2);
        return {s: {r: e, c: g[0], cRel: g[1], rRel: g[2]}, e: {r: f, c: h[0], cRel: h[1], rRel: h[2]}}
    }

    function pg(a) {
        var b = ng(a, 2), c = ng(a, 2), d = a.read_shift(1), e = a.read_shift(1);
        return {s: {r: b[0], c: d, cRel: b[1], rRel: b[2]}, e: {r: c[0], c: e, cRel: c[1], rRel: c[2]}}
    }

    function qg(a, b, c) {
        if (c.biff < 8) return pg(a, b, c);
        var d = a.read_shift(12 == c.biff ? 4 : 2), e = a.read_shift(12 == c.biff ? 4 : 2), f = ng(a, 2), g = ng(a, 2);
        return {s: {r: d, c: f[0], cRel: f[1], rRel: f[2]}, e: {r: e, c: g[0], cRel: g[1], rRel: g[2]}}
    }

    function rg(a, b, c) {
        if (c && c.biff >= 2 && c.biff <= 5) return sg(a, b, c);
        var d = a.read_shift(c && 12 == c.biff ? 4 : 2), e = ng(a, 2);
        return {r: d, c: e[0], cRel: e[1], rRel: e[2]}
    }

    function sg(a) {
        var b = ng(a, 2), c = a.read_shift(1);
        return {r: b[0], c: c, cRel: b[1], rRel: b[2]}
    }

    function tg(a) {
        var b = a.read_shift(2), c = a.read_shift(2);
        return {r: b, c: 255 & c, fQuoted: !!(16384 & c), cRel: c >> 15, rRel: c >> 15}
    }

    function ug(a, b, c) {
        var d = c && c.biff ? c.biff : 8;
        if (d >= 2 && d <= 5) return vg(a, b, c);
        var e = a.read_shift(d >= 12 ? 4 : 2), f = a.read_shift(2), g = (16384 & f) >> 14, h = (32768 & f) >> 15;
        if (f &= 16383, 1 == h) for (; e > 524287;) e -= 1048576;
        if (1 == g) for (; f > 8191;) f -= 16384;
        return {r: e, c: f, cRel: g, rRel: h}
    }

    function vg(a) {
        var b = a.read_shift(2), c = a.read_shift(1), d = (32768 & b) >> 15, e = (16384 & b) >> 14;
        return b &= 16383, 1 == d && b >= 8192 && (b -= 16384), 1 == e && c >= 128 && (c -= 256), {
            r: b,
            c: c,
            cRel: e,
            rRel: d
        }
    }

    function wg(a, b, c) {
        return [(96 & a[a.l++]) >> 5, og(a, c.biff >= 2 && c.biff <= 5 ? 6 : 8, c)]
    }

    function xg(a, b, c) {
        var d = (96 & a[a.l++]) >> 5, e = a.read_shift(2, "i"), f = 8;
        if (c) switch (c.biff) {
            case 5:
                a.l += 12, f = 6;
                break;
            case 12:
                f = 12
        }
        return [d, e, og(a, f, c)]
    }

    function yg(a, b, c) {
        var d = (96 & a[a.l++]) >> 5;
        return a.l += c && c.biff > 8 ? 12 : c.biff < 8 ? 6 : 8, [d]
    }

    function zg(a, b, c) {
        var d = (96 & a[a.l++]) >> 5, e = a.read_shift(2), f = 8;
        if (c) switch (c.biff) {
            case 5:
                a.l += 12, f = 6;
                break;
            case 12:
                f = 12
        }
        return a.l += f, [d, e]
    }

    function Ag(a, b, c) {
        return [(96 & a[a.l++]) >> 5, qg(a, b - 1, c)]
    }

    function Bg(a, b, c) {
        var d = (96 & a[a.l++]) >> 5;
        return a.l += 2 == c.biff ? 6 : 12 == c.biff ? 14 : 7, [d]
    }

    function Cg(a) {
        var b = 1 & a[a.l + 1];
        return a.l += 4, [b, 1]
    }

    function Dg(a, b, c) {
        a.l += 2;
        for (var d = a.read_shift(c && 2 == c.biff ? 1 : 2), e = [], f = 0; f <= d; ++f) e.push(a.read_shift(c && 2 == c.biff ? 1 : 2));
        return e
    }

    function Eg(a, b, c) {
        var d = 255 & a[a.l + 1] ? 1 : 0;
        return a.l += 2, [d, a.read_shift(c && 2 == c.biff ? 1 : 2)]
    }

    function Fg(a, b, c) {
        var d = 255 & a[a.l + 1] ? 1 : 0;
        return a.l += 2, [d, a.read_shift(c && 2 == c.biff ? 1 : 2)]
    }

    function Gg(a) {
        var b = 255 & a[a.l + 1] ? 1 : 0;
        return a.l += 2, [b, a.read_shift(2)]
    }

    function Hg(a, b, c) {
        var d = 255 & a[a.l + 1] ? 1 : 0;
        return a.l += c && 2 == c.biff ? 3 : 4, [d]
    }

    function Ig(a) {
        return [a.read_shift(1), a.read_shift(1)]
    }

    function Jg(a) {
        return a.read_shift(2), Ig(a, 2)
    }

    function Kg(a) {
        return a.read_shift(2), Ig(a, 2)
    }

    function Lg(a, b, c) {
        var d = (96 & a[a.l]) >> 5;
        return a.l += 1, [d, rg(a, 0, c)]
    }

    function Mg(a, b, c) {
        var d = (96 & a[a.l]) >> 5;
        return a.l += 1, [d, ug(a, 0, c)]
    }

    function Ng(a, b, c) {
        var d = (96 & a[a.l]) >> 5;
        a.l += 1;
        var e = a.read_shift(2);
        return c && 5 == c.biff && (a.l += 12), [d, e, rg(a, 0, c)]
    }

    function Og(a, b, c) {
        var d = (96 & a[a.l]) >> 5;
        a.l += 1;
        var e = a.read_shift(c && c.biff <= 3 ? 1 : 2);
        return [Hp[e], Gp[e], d]
    }

    function Pg(a, b, c) {
        var d = a[a.l++], e = a.read_shift(1), f = c && c.biff <= 3 ? [88 == d ? -1 : 0, a.read_shift(1)] : Qg(a);
        return [e, (0 === f[0] ? Gp : Fp)[f[1]]]
    }

    function Qg(a) {
        return [a[a.l + 1] >> 7, 32767 & a.read_shift(2)]
    }

    function Rg(a, b, c) {
        a.l += c && 2 == c.biff ? 3 : 4
    }

    function Sg(a, b, c) {
        return a.l++, c && 12 == c.biff ? [a.read_shift(4, "i"), 0] : [a.read_shift(2), a.read_shift(c && 2 == c.biff ? 1 : 2)]
    }

    function Tg(a) {
        return a.l++, sn[a.read_shift(1)]
    }

    function Ug(a) {
        return a.l++, a.read_shift(2)
    }

    function Vg(a) {
        return a.l++, 0 !== a.read_shift(1)
    }

    function Wg(a) {
        return a.l++, Za(a, 8)
    }

    function Xg(a, b, c) {
        return a.l++, ic(a, b - 1, c)
    }

    function Yg(a, b) {
        var c = [a.read_shift(1)];
        if (12 == b) switch (c[0]) {
            case 2:
                c[0] = 4;
                break;
            case 4:
                c[0] = 16;
                break;
            case 0:
                c[0] = 1;
                break;
            case 1:
                c[0] = 2
        }
        switch (c[0]) {
            case 4:
                c[1] = bc(a, 1) ? "TRUE" : "FALSE", 12 != b && (a.l += 7);
                break;
            case 37:
            case 16:
                c[1] = sn[a[a.l]], a.l += 12 == b ? 4 : 8;
                break;
            case 0:
                a.l += 8;
                break;
            case 1:
                c[1] = Za(a, 8);
                break;
            case 2:
                c[1] = mc(a, 0, {biff: b > 0 && b < 8 ? 2 : b});
                break;
            default:
                throw new Error("Bad SerAr: " + c[0])
        }
        return c
    }

    function Zg(a, b, c) {
        for (var d = a.read_shift(12 == c.biff ? 4 : 2), e = [], f = 0; f != d; ++f) e.push((12 == c.biff ? qn : Ec)(a, 8));
        return e
    }

    function $g(a, b, c) {
        var d = 0, e = 0;
        12 == c.biff ? (d = a.read_shift(4), e = a.read_shift(4)) : (e = 1 + a.read_shift(1), d = 1 + a.read_shift(2)), c.biff >= 2 && c.biff < 8 && (--d, 0 == --e && (e = 256));
        for (var f = 0, g = []; f != d && (g[f] = []); ++f) for (var h = 0; h != e; ++h) g[f][h] = Yg(a, c.biff);
        return g
    }

    function _g(a, b, c) {
        var d = a.read_shift(1) >>> 5 & 3, e = !c || c.biff >= 8 ? 4 : 2, f = a.read_shift(e);
        switch (c.biff) {
            case 2:
                a.l += 5;
                break;
            case 3:
            case 4:
                a.l += 8;
                break;
            case 5:
                a.l += 12
        }
        return [d, 0, f]
    }

    function ah(a, b, c) {
        return 5 == c.biff ? bh(a, b, c) : [a.read_shift(1) >>> 5 & 3, a.read_shift(2), a.read_shift(4)]
    }

    function bh(a) {
        var b = a.read_shift(1) >>> 5 & 3, c = a.read_shift(2, "i");
        a.l += 8;
        var d = a.read_shift(2);
        return a.l += 12, [b, c, d]
    }

    function ch(a, b, c) {
        var d = a.read_shift(1) >>> 5 & 3;
        return a.l += c && 2 == c.biff ? 3 : 4, [d, a.read_shift(c && 2 == c.biff ? 1 : 2)]
    }

    function dh(a, b, c) {
        return [a.read_shift(1) >>> 5 & 3, a.read_shift(c && 2 == c.biff ? 1 : 2)]
    }

    function eh(a, b, c) {
        var d = a.read_shift(1) >>> 5 & 3;
        return a.l += 4, c.biff < 8 && a.l--, 12 == c.biff && (a.l += 2), [d]
    }

    function fh(a, b, c) {
        var d = (96 & a[a.l++]) >> 5, e = a.read_shift(2), f = 4;
        if (c) switch (c.biff) {
            case 5:
                f = 15;
                break;
            case 12:
                f = 6
        }
        return a.l += f, [d, e]
    }

    function gh(a, b, c) {
        return a.l += 2, [tg(a, 4, c)]
    }

    function hh(a) {
        return a.l += 6, []
    }

    function ih(a) {
        return a.l += 2, [dc(a), 1 & a.read_shift(2)]
    }

    function jh(a) {
        a.l += 2;
        var b = a.read_shift(2), c = a.read_shift(2), d = a.read_shift(4), e = a.read_shift(2), f = a.read_shift(2);
        return {ixti: b, coltype: 3 & c, rt: vp[c >> 2 & 31], idx: d, c: e, C: f}
    }

    function kh(a) {
        return a.l += 2, [a.read_shift(4)]
    }

    function lh(a, b, c) {
        return a.l += 5, a.l += 2, a.l += 2 == c.biff ? 1 : 4, ["PTGSHEET"]
    }

    function mh(a, b, c) {
        return a.l += 2 == c.biff ? 4 : 5, ["PTGENDSHEET"]
    }

    function nh(a) {
        return [a.read_shift(1) >>> 5 & 3, a.read_shift(2)]
    }

    function oh(a) {
        return [a.read_shift(1) >>> 5 & 3, a.read_shift(2)]
    }

    function ph(a) {
        return a.l += 4, [0, 0]
    }

    function qh(a, b, c, d) {
        if (d.biff < 8) return ha(a, b);
        for (var e = a.l + b, f = [], g = 0; g !== c.length; ++g) switch (c[g][0]) {
            case"PtgArray":
                c[g][1] = $g(a, 0, d), f.push(c[g][1]);
                break;
            case"PtgMemArea":
                c[g][2] = Zg(a, c[g][1], d), f.push(c[g][2]);
                break;
            case"PtgExp":
                d && 12 == d.biff && (c[g][1][1] = a.read_shift(4), f.push(c[g][1]));
                break;
            case"PtgList":
            case"PtgElfRadicalS":
            case"PtgElfColS":
            case"PtgElfColSV":
                throw"Unsupported " + c[g][0]
        }
        return b = e - a.l, 0 !== b && f.push(ha(a, b)), f
    }

    function rh(a, b, c) {
        for (var d, e, f = a.l + b, g = []; f != a.l;) b = f - a.l, e = a[a.l], d = wp[e], 24 !== e && 25 !== e || (d = (24 === e ? yp : zp)[a[a.l + 1]]), d && d.f ? g.push([d.n, d.f(a, b, c)]) : ha(a, b);
        return g
    }

    function sh(a) {
        for (var b = [], c = 0; c < a.length; ++c) {
            for (var d = a[c], e = [], f = 0; f < d.length; ++f) {
                var g = d[f];
                if (g) switch (g[0]) {
                    case 2:
                        e.push('"' + g[1].replace(/"/g, '""') + '"');
                        break;
                    default:
                        e.push(g[1])
                } else e.push("")
            }
            b.push(e.join(","))
        }
        return b.join(";")
    }

    function th(a, b) {
        if (!(a || b && b.biff <= 5 && b.biff >= 2)) throw new Error("empty sheet name");
        return a.indexOf(" ") > -1 ? "'" + a + "'" : a
    }

    function uh(a, b, c) {
        if (!a) return "SH33TJSERR0";
        if (c.biff > 8 && (!a.XTI || !a.XTI[b])) return a.SheetNames[b];
        if (!a.XTI) return "SH33TJSERR6";
        var d = a.XTI[b];
        if (c.biff < 8) return b > 1e4 && (b -= 65536), b < 0 && (b = -b), 0 == b ? "" : a.XTI[b - 1];
        if (!d) return "SH33TJSERR1";
        var e = "";
        if (c.biff > 8) switch (a[d[0]][0]) {
            case 357:
                return e = -1 == d[1] ? "#REF" : a.SheetNames[d[1]], d[1] == d[2] ? e : e + ":" + a.SheetNames[d[2]];
            case 358:
                return null != c.SID ? a.SheetNames[c.SID] : "SH33TJSSAME" + a[d[0]][0];
            case 355:
            default:
                return "SH33TJSSRC" + a[d[0]][0]
        }
        switch (a[d[0]][0][0]) {
            case 1025:
                return e = -1 == d[1] ? "#REF" : a.SheetNames[d[1]] || "SH33TJSERR3", d[1] == d[2] ? e : e + ":" + a.SheetNames[d[2]];
            case 14849:
                return "SH33TJSERR8";
            default:
                return a[d[0]][0][3] ? (e = -1 == d[1] ? "#REF" : a[d[0]][0][3][d[1]] || "SH33TJSERR4", d[1] == d[2] ? e : e + ":" + a[d[0]][0][3][d[2]]) : "SH33TJSERR2"
        }
    }

    function vh(a, b, c) {
        return th(uh(a, b, c), c)
    }

    function wh(a, b, c, d, e) {
        var f, g, h, i, j = e && e.biff || 8, k = {s: {c: 0, r: 0}, e: {c: 0, r: 0}}, l = [], m = 0, n = 0, o = "";
        if (!a[0] || !a[0][0]) return "";
        for (var p = -1, q = "", r = 0, s = a[0].length; r < s; ++r) {
            var t = a[0][r];
            switch (t[0]) {
                case"PtgUminus":
                    l.push("-" + l.pop());
                    break;
                case"PtgUplus":
                    l.push("+" + l.pop());
                    break;
                case"PtgPercent":
                    l.push(l.pop() + "%");
                    break;
                case"PtgAdd":
                case"PtgConcat":
                case"PtgDiv":
                case"PtgEq":
                case"PtgGe":
                case"PtgGt":
                case"PtgLe":
                case"PtgLt":
                case"PtgMul":
                case"PtgNe":
                case"PtgPower":
                case"PtgSub":
                    if (f = l.pop(), g = l.pop(), p >= 0) {
                        switch (a[0][p][1][0]) {
                            case 0:
                                q = C(" ", a[0][p][1][1]);
                                break;
                            case 1:
                                q = C("\r", a[0][p][1][1]);
                                break;
                            default:
                                if (q = "", e.WTF) throw new Error("Unexpected PtgAttrSpaceType " + a[0][p][1][0])
                        }
                        g += q, p = -1
                    }
                    l.push(g + Ap[t[0]] + f);
                    break;
                case"PtgIsect":
                    f = l.pop(), g = l.pop(), l.push(g + " " + f);
                    break;
                case"PtgUnion":
                    f = l.pop(), g = l.pop(), l.push(g + "," + f);
                    break;
                case"PtgRange":
                    f = l.pop(), g = l.pop(), l.push(g + ":" + f);
                    break;
                case"PtgAttrChoose":
                case"PtgAttrGoto":
                case"PtgAttrIf":
                case"PtgAttrIfError":
                    break;
                case"PtgRef":
                    h = ma(t[1][1], k, e), l.push(oa(h, j));
                    break;
                case"PtgRefN":
                    h = c ? ma(t[1][1], c, e) : t[1][1], l.push(oa(h, j));
                    break;
                case"PtgRef3d":
                    m = t[1][1], h = ma(t[1][2], k, e), o = vh(d, m, e);
                    l.push(o + "!" + oa(h, j));
                    break;
                case"PtgFunc":
                case"PtgFuncVar":
                    var u = t[1][0], v = t[1][1];
                    u || (u = 0), u &= 127;
                    var w = 0 == u ? [] : l.slice(-u);
                    l.length -= u, "User" === v && (v = w.shift()), l.push(v + "(" + w.join(",") + ")");
                    break;
                case"PtgBool":
                    l.push(t[1] ? "TRUE" : "FALSE");
                    break;
                case"PtgInt":
                    l.push(t[1]);
                    break;
                case"PtgNum":
                    l.push(String(t[1]));
                    break;
                case"PtgStr":
                    l.push('"' + t[1] + '"');
                    break;
                case"PtgErr":
                    l.push(t[1]);
                    break;
                case"PtgAreaN":
                    i = na(t[1][1], c ? {s: c} : k, e), l.push(pa(i, e));
                    break;
                case"PtgArea":
                    i = na(t[1][1], k, e), l.push(pa(i, e));
                    break;
                case"PtgArea3d":
                    m = t[1][1], i = t[1][2], o = vh(d, m, e), l.push(o + "!" + pa(i, e));
                    break;
                case"PtgAttrSum":
                    l.push("SUM(" + l.pop() + ")");
                    break;
                case"PtgAttrBaxcel":
                case"PtgAttrSemi":
                    break;
                case"PtgName":
                    n = t[1][2];
                    var x = (d.names || [])[n - 1] || (d[0] || [])[n], y = x ? x.Name : "SH33TJSNAME" + String(n);
                    y in Ip && (y = Ip[y]), l.push(y);
                    break;
                case"PtgNameX":
                    var z = t[1][1];
                    n = t[1][2];
                    var A;
                    if (!(e.biff <= 5)) {
                        var B = "";
                        14849 == ((d[z] || [])[0] || [])[0] || (1025 == ((d[z] || [])[0] || [])[0] ? d[z][n] && d[z][n].itab > 0 && (B = d.SheetNames[d[z][n].itab - 1] + "!") : B = d.SheetNames[n - 1] + "!"), d[z] && d[z][n] ? B += d[z][n].Name : d[0] && d[0][n] ? B += d[0][n].Name : B += "SH33TJSERRX", l.push(B);
                        break
                    }
                    z < 0 && (z = -z), d[z] && (A = d[z][n]), A || (A = {Name: "SH33TJSERRY"}), l.push(A.Name);
                    break;
                case"PtgParen":
                    var D = "(", E = ")";
                    if (p >= 0) {
                        switch (q = "", a[0][p][1][0]) {
                            case 2:
                                D = C(" ", a[0][p][1][1]) + D;
                                break;
                            case 3:
                                D = C("\r", a[0][p][1][1]) + D;
                                break;
                            case 4:
                                E = C(" ", a[0][p][1][1]) + E;
                                break;
                            case 5:
                                E = C("\r", a[0][p][1][1]) + E;
                                break;
                            default:
                                if (e.WTF) throw new Error("Unexpected PtgAttrSpaceType " + a[0][p][1][0])
                        }
                        p = -1
                    }
                    l.push(D + l.pop() + E);
                    break;
                case"PtgRefErr":
                case"PtgRefErr3d":
                    l.push("#REF!");
                    break;
                case"PtgExp":
                    h = {c: t[1][1], r: t[1][0]};
                    var F = {c: c.c, r: c.r};
                    if (d.sharedf[Aa(h)]) {
                        var G = d.sharedf[Aa(h)];
                        l.push(wh(G, k, F, d, e))
                    } else {
                        var H = !1;
                        for (f = 0; f != d.arrayf.length; ++f) if (g = d.arrayf[f], !(h.c < g[0].s.c || h.c > g[0].e.c || h.r < g[0].s.r || h.r > g[0].e.r)) {
                            l.push(wh(g[1], k, F, d, e)), H = !0;
                            break
                        }
                        H || l.push(t[1])
                    }
                    break;
                case"PtgArray":
                    l.push("{" + sh(t[1]) + "}");
                    break;
                case"PtgMemArea":
                    break;
                case"PtgAttrSpace":
                case"PtgAttrSpaceSemi":
                    p = r;
                    break;
                case"PtgTbl":
                case"PtgMemErr":
                    break;
                case"PtgMissArg":
                    l.push("");
                    break;
                case"PtgAreaErr":
                case"PtgAreaErr3d":
                    l.push("#REF!");
                    break;
                case"PtgList":
                    l.push("Table" + t[1].idx + "[#" + t[1].rt + "]");
                    break;
                case"PtgMemAreaN":
                case"PtgMemNoMemN":
                case"PtgAttrNoop":
                case"PtgSheet":
                case"PtgEndSheet":
                case"PtgMemFunc":
                case"PtgMemNoMem":
                    break;
                case"PtgElfCol":
                case"PtgElfColS":
                case"PtgElfColSV":
                case"PtgElfColV":
                case"PtgElfLel":
                case"PtgElfRadical":
                case"PtgElfRadicalLel":
                case"PtgElfRadicalS":
                case"PtgElfRw":
                case"PtgElfRwV":
                    throw new Error("Unsupported ELFs");
                case"PtgSxName":
                default:
                    throw new Error("Unrecognized Formula Token: " + String(t))
            }
            var I = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
            if (3 != e.biff && p >= 0 && -1 == I.indexOf(a[0][r][0])) {
                t = a[0][p];
                var J = !0;
                switch (t[1][0]) {
                    case 4:
                        J = !1;
                    case 0:
                        q = C(" ", t[1][1]);
                        break;
                    case 5:
                        J = !1;
                    case 1:
                        q = C("\r", t[1][1]);
                        break;
                    default:
                        if (q = "", e.WTF) throw new Error("Unexpected PtgAttrSpaceType " + t[1][0])
                }
                l.push((J ? q : "") + l.pop() + (J ? "" : q)), p = -1
            }
        }
        if (l.length > 1 && e.WTF) throw new Error("bad formula stack");
        return l[0]
    }

    function xh(a, b, c) {
        var d, e = a.l + b, f = 2 == c.biff ? 1 : 2, g = a.read_shift(f);
        if (65535 == g) return [[], ha(a, b - 2)];
        var h = rh(a, g, c);
        return b !== g + f && (d = qh(a, b - g - f, h, c)), a.l = e, [h, d]
    }

    function yh(a, b, c) {
        var d, e = a.l + b, f = 2 == c.biff ? 1 : 2, g = a.read_shift(f);
        if (65535 == g) return [[], ha(a, b - 2)];
        var h = rh(a, g, c);
        return b !== g + f && (d = qh(a, b - g - f, h, c)), a.l = e, [h, d]
    }

    function zh(a, b, c, d) {
        var e, f = a.l + b, g = rh(a, d, c);
        return f !== a.l && (e = qh(a, f - a.l, g, c)), [g, e]
    }

    function Ah(a, b, c) {
        var d, e = a.l + b, f = a.read_shift(2), g = rh(a, f, c);
        return 65535 == f ? [[], ha(a, b - 2)] : (b !== f + 2 && (d = qh(a, e - f - 2, g, c)), [g, d])
    }

    function Bh(a) {
        var b;
        if (65535 !== an(a, a.l + 6)) return [Za(a), "n"];
        switch (a[a.l]) {
            case 0:
                return a.l += 8, ["String", "s"];
            case 1:
                return b = 1 === a[a.l + 2], a.l += 8, [b, "b"];
            case 2:
                return b = a[a.l + 2], a.l += 8, [b, "e"];
            case 3:
                return a.l += 8, ["", "s"]
        }
        return []
    }

    function Ch(a, b, c) {
        var d = a.l + b, e = xc(a, 6);
        2 == c.biff && ++a.l;
        var f = Bh(a, 8), g = a.read_shift(1);
        2 != c.biff && (a.read_shift(1), c.biff >= 5 && a.read_shift(4));
        var h = yh(a, d - a.l, c);
        return {cell: e, val: f[0], formula: h, shared: g >> 3 & 1, tt: f[1]}
    }

    function Dh(a, b, c) {
        var d = a.read_shift(4), e = rh(a, d, c), f = a.read_shift(4);
        return [e, f > 0 ? qh(a, f, e, c) : null]
    }

    function Eh(a) {
        return "of:" == a.slice(0, 3) && (a = a.slice(3)), 61 == a.charCodeAt(0) && (a = a.slice(1), 61 == a.charCodeAt(0) && (a = a.slice(1))), a = a.replace(/COM\.MICROSOFT\./g, ""), a = a.replace(/\[((?:\.[A-Z]+[0-9]+)(?::\.[A-Z]+[0-9]+)?)\]/g, function (a, b) {
            return b.replace(/\./g, "")
        }), a = a.replace(/\[.(#[A-Z]*[?!])\]/g, "$1"), a.replace(/[;~]/g, ",").replace(/\|/g, ";")
    }

    function Fh(a) {
        return ("of:=" + a.replace(hp, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":")).replace(/;/g, "|").replace(/,/g, ";")
    }

    function Gh(a) {
        var b = a.split(":");
        return [b[0].split(".")[0], b[0].split(".")[1] + (b.length > 1 ? ":" + (b[1].split(".")[1] || b[1].split(".")[0]) : "")]
    }

    function Hh(a) {
        return a.replace(/\./, "!")
    }

    function Ih(a, b, c) {
        var d = 0, e = a.length;
        if (c) {
            if (Lp ? c.has(b) : c.hasOwnProperty(b)) for (var f = Lp ? c.get(b) : c[b]; d < f.length; ++d) if (a[f[d]].t === b) return a.Count++, f[d]
        } else for (; d < e; ++d) if (a[d].t === b) return a.Count++, d;
        return a[e] = {t: b}, a.Count++, a.Unique++, c && (Lp ? (c.has(b) || c.set(b, []), c.get(b).push(e)) : (c.hasOwnProperty(b) || (c[b] = []), c[b].push(e))), e
    }

    function Jh(a, b) {
        var c = {min: a + 1, max: a + 1}, d = -1;
        return b.MDW && (No = b.MDW), null != b.width ? c.customWidth = 1 : null != b.wpx ? d = Pe(b.wpx) : null != b.wch && (d = b.wch), d > -1 ? (c.width = Qe(d), c.customWidth = 1) : null != b.width && (c.width = b.width), b.hidden && (c.hidden = !0), c
    }

    function Kh(a, b) {
        if (a) {
            var c = [.7, .7, .75, .75, .3, .3];
            "xlml" == b && (c = [1, 1, 1, 1, .5, .5]), null == a.left && (a.left = c[0]), null == a.right && (a.right = c[1]), null == a.top && (a.top = c[2]), null == a.bottom && (a.bottom = c[3]), null == a.header && (a.header = c[4]), null == a.footer && (a.footer = c[5])
        }
    }

    function Lh(a, b, c) {
        if ("undefined" != typeof style_builder) {
            if (/^\d+$/.exec(b.s)) return b.s;
            if (b.s && b.s == +b.s) return b.s;
            var d = b.s || {};
            return b.z && (d.numFmt = b.z), style_builder.addStyle(d)
        }
        var e = c.revssf[null != b.z ? b.z : "General"], f = 60, g = a.length;
        if (null == e && c.ssf) for (; f < 392; ++f) if (null == c.ssf[f]) {
            Tl.load(b.z, f), c.ssf[f] = b.z, c.revssf[b.z] = e = f;
            break
        }
        for (f = 0; f != g; ++f) if (a[f].numFmtId === e) return f;
        return a[g] = {numFmtId: e, fontId: 0, fillId: 0, borderId: 0, xfId: 0, applyNumberFormat: 1}, g
    }

    function Mh(a, b, c, d, e, f) {
        if ("z" !== a.t) {
            "d" === a.t && "string" == typeof a.v && (a.v = z(a.v));
            try {
                d.cellNF && (a.z = Tl._table[b])
            } catch (a) {
                if (d.WTF) throw a
            }
            if (!d || !1 !== d.cellText) try {
                if (null == Tl._table[b] && Tl.load(Xl[b] || "General", b), "e" === a.t) a.w = a.w || sn[a.v]; else if (0 === b) if ("n" === a.t) (0 | a.v) === a.v ? a.w = Tl._general_int(a.v) : a.w = Tl._general_num(a.v); else if ("d" === a.t) {
                    var g = w(a.v);
                    a.w = (0 | g) === g ? Tl._general_int(g) : Tl._general_num(g)
                } else {
                    if (void 0 === a.v) return "";
                    a.w = Tl._general(a.v, Kp)
                } else "d" === a.t ? a.w = Tl.format(b, w(a.v), Kp) : a.w = Tl.format(b, a.v, Kp)
            } catch (a) {
                if (d.WTF) throw a
            }
            if (d.cellStyles && null != c) try {
                a.s = f.Fills[c], a.s.fgColor && a.s.fgColor.theme && !a.s.fgColor.rgb && (a.s.fgColor.rgb = Ne(e.themeElements.clrScheme[a.s.fgColor.theme].rgb, a.s.fgColor.tint || 0), d.WTF && (a.s.fgColor.raw_rgb = e.themeElements.clrScheme[a.s.fgColor.theme].rgb)), a.s.bgColor && a.s.bgColor.theme && (a.s.bgColor.rgb = Ne(e.themeElements.clrScheme[a.s.bgColor.theme].rgb, a.s.bgColor.tint || 0), d.WTF && (a.s.bgColor.raw_rgb = e.themeElements.clrScheme[a.s.bgColor.theme].rgb))
            } catch (a) {
                if (d.WTF && f.Fills) throw a
            }
        }
    }

    function Nh(a, b, c) {
        if (a && a["!ref"]) {
            var d = Da(a["!ref"]);
            if (d.e.c < d.s.c || d.e.r < d.s.r) throw new Error("Bad range (" + c + "): " + a["!ref"])
        }
    }

    function Oh(a, b) {
        var c = Da(b);
        c.s.r <= c.e.r && c.s.c <= c.e.c && c.s.r >= 0 && c.s.c >= 0 && (a["!ref"] = Ca(c))
    }

    function Ph(a, b, c, d, e, f, g) {
        if (!a) return a;
        null != Jl && null == b.dense && (b.dense = Jl);
        var h = b.dense ? [] : {}, i = {s: {r: 2e6, c: 2e6}, e: {r: 0, c: 0}}, j = "", k = "", l = a.match(Np);
        l ? (j = a.slice(0, l.index), k = a.slice(l.index + l[0].length)) : j = k = a;
        var m = j.match(Tp);
        m && Rh(m[0], h, e, c);
        var n = (j.match(/<(?:\w*:)?dimension/) || {index: -1}).index;
        if (n > 0) {
            var o = j.slice(n, n + 50).match(Pp);
            o && Oh(h, o[1])
        }
        var p = j.match(Up);
        p && p[1] && $h(p[1], e);
        var q = [];
        if (b.cellStyles) {
            var r = j.match(Qp);
            r && Wh(q, r)
        }
        l && Wp(l[1], h, b, i, f, g);
        var s = k.match(Rp);
        s && (h["!autofilter"] = Yh(s[0]));
        var t = [], u = k.match(Mp);
        if (u) for (n = 0; n != u.length; ++n) t[n] = Da(u[n].slice(u[n].indexOf('"') + 1));
        var v = k.match(Op);
        v && Th(h, v, d);
        var w = k.match(Sp);
        if (w && (h["!margins"] = Uh(P(w[0]))), !h["!ref"] && i.e.c >= i.s.c && i.e.r >= i.s.r && (h["!ref"] = Ca(i)), b.sheetRows > 0 && h["!ref"]) {
            var x = Da(h["!ref"]);
            b.sheetRows <= +x.e.r && (x.e.r = b.sheetRows - 1, x.e.r > i.e.r && (x.e.r = i.e.r), x.e.r < x.s.r && (x.s.r = x.e.r), x.e.c > i.e.c && (x.e.c = i.e.c), x.e.c < x.s.c && (x.s.c = x.e.c), h["!fullref"] = h["!ref"], h["!ref"] = Ca(x))
        }
        return q.length > 0 && (h["!cols"] = q), t.length > 0 && (h["!merges"] = t), h
    }

    function Qh(a) {
        if (0 === a.length) return "";
        for (var b = '<mergeCells count="' + a.length + '">', c = 0; c != a.length; ++c) b += '<mergeCell ref="' + Ca(a[c]) + '"/>';
        return b + "</mergeCells>"
    }

    function Rh(a, b, c, d) {
        var e = P(a);
        c.Sheets[d] || (c.Sheets[d] = {}), e.codeName && (c.Sheets[d].CodeName = e.codeName)
    }

    function Sh(a) {
        var b = {sheet: 1}, c = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"],
            d = ["formatColumns", "formatRows", "formatCells", "insertColumns", "insertRows", "insertHyperlinks", "deleteColumns", "deleteRows", "sort", "autoFilter", "pivotTables"];
        return c.forEach(function (c) {
            null != a[c] && a[c] && (b[c] = "1")
        }), d.forEach(function (c) {
            null == a[c] || a[c] || (b[c] = "0")
        }), a.password && (b.password = Fe(a.password).toString(16).toUpperCase()), Z("sheetProtection", null, b)
    }

    function Th(a, b, c) {
        for (var d = Array.isArray(a), e = 0; e != b.length; ++e) {
            var f = P(tm(b[e]), !0);
            if (!f.ref) return;
            var g = ((c || {})["!id"] || [])[f.id];
            g ? (f.Target = g.Target, f.location && (f.Target += "#" + f.location)) : (f.Target = "#" + f.location, g = {
                Target: f.Target,
                TargetMode: "Internal"
            }), f.Rel = g, f.tooltip && (f.Tooltip = f.tooltip, delete f.tooltip);
            for (var h = Da(f.ref), i = h.s.r; i <= h.e.r; ++i) for (var j = h.s.c; j <= h.e.c; ++j) {
                var k = Aa({c: j, r: i});
                d ? (a[i] || (a[i] = []), a[i][j] || (a[i][j] = {
                    t: "z",
                    v: void 0
                }), a[i][j].l = f) : (a[k] || (a[k] = {t: "z", v: void 0}), a[k].l = f)
            }
        }
    }

    function Uh(a) {
        var b = {};
        return ["left", "right", "top", "bottom", "header", "footer"].forEach(function (c) {
            a[c] && (b[c] = parseFloat(a[c]))
        }), b
    }

    function Vh(a) {
        return Kh(a), Z("pageMargins", null, a)
    }

    function Wh(a, b) {
        for (var c = !1, d = 0; d != b.length; ++d) {
            var e = P(b[d], !0);
            e.hidden && (e.hidden = V(e.hidden));
            var f = parseInt(e.min, 10) - 1, g = parseInt(e.max, 10) - 1;
            for (delete e.min, delete e.max, e.width = +e.width, !c && e.width && (c = !0, Se(e.width)), Te(e); f <= g;) a[f++] = B(e)
        }
    }

    function Xh(a, b) {
        for (var c, d = ["<cols>"], e = 0; e != b.length; ++e) (c = b[e]) && (d[d.length] = Z("col", null, Jh(e, c)));
        return d[d.length] = "</cols>", d.join("")
    }

    function Yh(a) {
        return {ref: (a.match(/ref="([^"]*)"/) || [])[1]}
    }

    function Zh(a, b, c, d) {
        var e = "string" == typeof a.ref ? a.ref : Ca(a.ref);
        c.Workbook || (c.Workbook = {}), c.Workbook.Names || (c.Workbook.Names = []);
        var f = c.Workbook.Names, g = Ba(e);
        g.s.r == g.e.r && (g.e.r = Ba(b["!ref"]).e.r, e = Ca(g));
        for (var h = 0; h < f.length; ++h) {
            var i = f[h];
            if ("_xlnm._FilterDatabase" == i.Name && i.Sheet == d) {
                i.Ref = "'" + c.SheetNames[d] + "'!" + e;
                break
            }
        }
        return h == f.length && f.push({
            Name: "_xlnm._FilterDatabase",
            Sheet: d,
            Ref: "'" + c.SheetNames[d] + "'!" + e
        }), Z("autoFilter", null, {ref: e})
    }

    function $h(a, b) {
        (a.match(Vp) || []).forEach(function (a) {
            V(P(a).rightToLeft) && (b.Views || (b.Views = [{}]), b.Views[0] || (b.Views[0] = {}), b.Views[0].RTL = !0)
        })
    }

    function _h(a, b, c, d) {
        var e = {workbookViewId: "0"};
        return (((d || {}).Workbook || {}).Views || [])[0] && (e.rightToLeft = d.Workbook.Views[0].RTL ? "1" : "0"), Z("sheetViews", Z("sheetView", null, e), {})
    }

    function ai(a, b, c, d) {
        if (void 0 === a.v && void 0 === a.f || "z" === a.t) return "";
        var e = "", f = a.t, g = a.v;
        switch (a.t) {
            case"b":
                e = a.v ? "1" : "0";
                break;
            case"n":
                e = "" + a.v;
                break;
            case"e":
                e = sn[a.v];
                break;
            case"d":
                d.cellDates ? e = z(a.v, -1).toISOString() : (a = B(a), a.t = "n", e = "" + (a.v = w(z(a.v)))), void 0 === a.z && (a.z = Tl._table[14]);
                break;
            default:
                e = a.v
        }
        var h = X("v", R(e)), i = {r: b}, j = Lh(d.cellXfs, a, d);
        switch (0 !== j && (i.s = j), a.t) {
            case"n":
                break;
            case"d":
                i.t = "d";
                break;
            case"b":
                i.t = "b";
                break;
            case"e":
                i.t = "e";
                break;
            default:
                if (null == a.v) {
                    delete a.t;
                    break
                }
                if (d.bookSST) {
                    h = X("v", "" + Ih(d.Strings, a.v, d.revStrings)), i.t = "s";
                    break
                }
                i.t = "str"
        }
        if (a.t != f && (a.t = f, a.v = g), a.f) {
            var k = a.F && a.F.slice(0, b.length) == b ? {t: "array", ref: a.F} : null;
            h = Z("f", R(a.f), k) + (null != a.v ? h : "")
        }
        return a.l && c["!links"].push([b, a.l]), a.c && c["!comments"].push([b, a.c]), Z("c", h, i)
    }

    function bi(a, b, c, d) {
        var e, f, g = [], h = [], i = Da(a["!ref"]), j = "", k = "", l = [], m = 0, n = 0, o = a["!rows"],
            p = Array.isArray(a), q = {r: k}, r = -1;
        for (n = i.s.c; n <= i.e.c; ++n) l[n] = va(n);
        for (m = i.s.r; m <= i.e.r; ++m) {
            for (h = [], k = ra(m), n = i.s.c; n <= i.e.c; ++n) {
                e = l[n] + k;
                var s = p ? (a[m] || [])[n] : a[e];
                void 0 !== s && (null != (j = ai(s, e, a, b, c, d)) && h.push(j))
            }
            (h.length > 0 || o && o[m]) && (q = {r: k}, o && o[m] && (f = o[m], f.hidden && (q.hidden = 1), r = -1, f.hpx ? r = Ue(f.hpx) : f.hpt && (r = f.hpt), r > -1 && (q.ht = r, q.customHeight = 1), f.level && (q.outlineLevel = f.level)), g[g.length] = Z("row", h.join(""), q))
        }
        if (o) for (; m < o.length; ++m) o && o[m] && (q = {r: m + 1}, f = o[m], f.hidden && (q.hidden = 1), r = -1, f.hpx ? r = Ue(f.hpx) : f.hpt && (r = f.hpt), r > -1 && (q.ht = r, q.customHeight = 1), f.level && (q.outlineLevel = f.level), g[g.length] = Z("row", "", q));
        return g.join("")
    }

    function ci(a, b, c, d) {
        var e = [gm, Xp], f = c.SheetNames[a], g = 0, h = "", i = c.Sheets[f];
        null == i && (i = {});
        var j = i["!ref"] || "A1", k = Da(j);
        if (k.e.c > 16383 || k.e.r > 1048575) {
            if (b.WTF) throw new Error("Range " + j + " exceeds format limit A1:XFD1048576");
            k.e.c = Math.min(k.e.c, 16383), k.e.r = Math.min(k.e.c, 1048575), j = Ca(k)
        }
        if (d || (d = {}), i["!comments"] = [], i["!drawing"] = [], "xlsx" !== b.bookType && c.vbaraw) {
            var l = c.SheetNames[a];
            try {
                c.Workbook && (l = c.Workbook.Sheets[a].CodeName || l)
            } catch (a) {
            }
            e[e.length] = Z("sheetPr", null, {codeName: R(l)})
        }
        e[e.length] = Z("dimension", null, {ref: j}), e[e.length] = _h(i, b, a, c), b.sheetFormat && (e[e.length] = Z("sheetFormatPr", null, {
            defaultRowHeight: b.sheetFormat.defaultRowHeight || "16",
            baseColWidth: b.sheetFormat.baseColWidth || "10",
            outlineLevelRow: b.sheetFormat.outlineLevelRow || "7"
        })), null != i["!cols"] && i["!cols"].length > 0 && (e[e.length] = Xh(i, i["!cols"])), e[g = e.length] = "<sheetData/>", i["!links"] = [], null != i["!ref"] && (h = bi(i, b, a, c, d), h.length > 0 && (e[e.length] = h)), e.length > g + 1 && (e[e.length] = "</sheetData>", e[g] = e[g].replace("/>", ">")), null != i["!protect"] && (e[e.length] = Sh(i["!protect"])), null != i["!autofilter"] && (e[e.length] = Zh(i["!autofilter"], i, c, a)), null != i["!merges"] && i["!merges"].length > 0 && (e[e.length] = Qh(i["!merges"]));
        var m, n = -1, o = -1;
        return i["!links"].length > 0 && (e[e.length] = "<hyperlinks>", i["!links"].forEach(function (a) {
            a[1].Target && (m = {ref: a[0]}, "#" != a[1].Target.charAt(0) && (o = nb(d, -1, R(a[1].Target).replace(/#.*$/, ""), Un.HLINK), m["r:id"] = "rId" + o), (n = a[1].Target.indexOf("#")) > -1 && (m.location = R(a[1].Target.slice(n + 1))), a[1].Tooltip && (m.tooltip = R(a[1].Tooltip)), e[e.length] = Z("hyperlink", null, m))
        }), e[e.length] = "</hyperlinks>"), delete i["!links"], null != i["!margins"] && (e[e.length] = Vh(i["!margins"])), e[e.length] = "", b && !b.ignoreEC && void 0 != b.ignoreEC || (e[e.length] = X("ignoredErrors", Z("ignoredError", null, {
            numberStoredAsText: 1,
            sqref: j
        }))), i["!drawing"].length > 0 ? (o = nb(d, -1, "../drawings/drawing" + (a + 1) + ".xml", Un.DRAW), e[e.length] = Z("drawing", null, {"r:id": "rId" + o})) : delete i["!drawing"], i["!comments"].length > 0 && (o = nb(d, -1, "../drawings/vmlDrawing" + (a + 1) + ".vml", Un.VML), e[e.length] = Z("legacyDrawing", null, {"r:id": "rId" + o}), i["!legacy"] = o), e.length > 2 && (e[e.length] = "</worksheet>", e[1] = e[1].replace("/>", ">")), e.join("")
    }

    function di(a, b) {
        var c = {}, d = a.l + b;
        c.r = a.read_shift(4), a.l += 4;
        var e = a.read_shift(2);
        a.l += 1;
        var f = a.read_shift(1);
        return a.l = d, 7 & f && (c.level = 7 & f), 16 & f && (c.hidden = !0), 32 & f && (c.hpt = e / 20), c
    }

    function ei(a, b, c) {
        var d = ia(145), e = (c["!rows"] || [])[a] || {};
        d.write_shift(4, a), d.write_shift(4, 0);
        var f = 320;
        e.hpx ? f = 20 * Ue(e.hpx) : e.hpt && (f = 20 * e.hpt), d.write_shift(2, f), d.write_shift(1, 0);
        var g = 0;
        e.level && (g |= e.level), e.hidden && (g |= 16), (e.hpx || e.hpt) && (g |= 32), d.write_shift(1, g), d.write_shift(1, 0);
        var h = 0, i = d.l;
        d.l += 4;
        for (var j = {r: a, c: 0}, k = 0; k < 16; ++k) if (!(b.s.c > k + 1 << 10 || b.e.c < k << 10)) {
            for (var l = -1, m = -1, n = k << 10; n < k + 1 << 10; ++n) {
                j.c = n;
                var o = Array.isArray(c) ? (c[j.r] || [])[j.c] : c[Aa(j)];
                o && (l < 0 && (l = n), m = n)
            }
            l < 0 || (++h, d.write_shift(4, l), d.write_shift(4, m))
        }
        var p = d.l;
        return d.l = i, d.write_shift(4, h), d.l = p, d.length > d.l ? d.slice(0, d.l) : d
    }

    function fi(a, b, c, d) {
        var e = ei(d, c, b);
        (e.length > 17 || (b["!rows"] || [])[d]) && la(a, "BrtRowHdr", e)
    }

    function gi() {
    }

    function hi(a, b) {
        var c = {};
        return a.l += 19, c.name = ln(a, b - 19), c
    }

    function ii(a, b) {
        null == b && (b = ia(84 + 4 * a.length));
        for (var c = 0; c < 3; ++c) b.write_shift(1, 0);
        return ab({auto: 1}, b), b.write_shift(-4, -1), b.write_shift(-4, -1), mn(a, b), b.slice(0, b.l)
    }

    function ji(a) {
        return [Ra(a)]
    }

    function ki(a, b, c) {
        return null == c && (c = ia(8)), Sa(b, c)
    }

    function li(a) {
        return [Ra(a), a.read_shift(1), "b"]
    }

    function mi(a, b, c) {
        return null == c && (c = ia(9)), Sa(b, c), c.write_shift(1, a.v ? 1 : 0), c
    }

    function ni(a) {
        return [Ra(a), a.read_shift(1), "e"]
    }

    function oi(a) {
        return [Ra(a), a.read_shift(4), "s"]
    }

    function pi(a, b, c) {
        return null == c && (c = ia(12)), Sa(b, c), c.write_shift(4, b.v), c
    }

    function qi(a) {
        return [Ra(a), Za(a), "n"]
    }

    function ri(a, b, c) {
        return null == c && (c = ia(16)), Sa(b, c), $a(a.v, c), c
    }

    function si(a) {
        return [Ra(a), Va(a), "n"]
    }

    function ti(a, b, c) {
        return null == c && (c = ia(12)), Sa(b, c), Wa(a.v, c), c
    }

    function ui(a) {
        return [Ra(a), Ka(a), "str"]
    }

    function vi(a, b, c) {
        return null == c && (c = ia(12 + 4 * a.v.length)), Sa(b, c), La(a.v, c), c.length > c.l ? c.slice(0, c.l) : c
    }

    function wi(a, b, c) {
        var d = a.l + b, e = Ra(a);
        e.r = c["!row"];
        var f = a.read_shift(1), g = [e, f, "b"];
        if (c.cellFormula) {
            a.l += 2;
            var h = Cp(a, d - a.l, c);
            g[3] = wh(h, null, e, c.supbooks, c)
        } else a.l = d;
        return g
    }

    function xi(a, b, c) {
        var d = a.l + b, e = Ra(a);
        e.r = c["!row"];
        var f = a.read_shift(1), g = [e, f, "e"];
        if (c.cellFormula) {
            a.l += 2;
            var h = Cp(a, d - a.l, c);
            g[3] = wh(h, null, e, c.supbooks, c)
        } else a.l = d;
        return g
    }

    function yi(a, b, c) {
        var d = a.l + b, e = Ra(a);
        e.r = c["!row"];
        var f = Za(a), g = [e, f, "n"];
        if (c.cellFormula) {
            a.l += 2;
            var h = Cp(a, d - a.l, c);
            g[3] = wh(h, null, e, c.supbooks, c)
        } else a.l = d;
        return g
    }

    function zi(a, b, c) {
        var d = a.l + b, e = Ra(a);
        e.r = c["!row"];
        var f = Ka(a), g = [e, f, "str"];
        if (c.cellFormula) {
            a.l += 2;
            var h = Cp(a, d - a.l, c);
            g[3] = wh(h, null, e, c.supbooks, c)
        } else a.l = d;
        return g
    }

    function Ai(a, b) {
        return null == b && (b = ia(4)), b.write_shift(4, a), b
    }

    function Bi(a, b) {
        var c = a.l + b, d = qn(a, 16), e = Ta(a), f = Ka(a), g = Ka(a), h = Ka(a);
        a.l = c;
        var i = {rfx: d, relId: e, loc: f, display: h};
        return g && (i.Tooltip = g), i
    }

    function Ci(a, b) {
        var c = ia(50 + 4 * (a[1].Target.length + (a[1].Tooltip || "").length));
        rn({s: za(a[0]), e: za(a[0])}, c), pn("rId" + b, c);
        var d = a[1].Target.indexOf("#");
        return La((-1 == d ? "" : a[1].Target.slice(d + 1)) || "", c), La(a[1].Tooltip || "", c), La("", c), c.slice(0, c.l)
    }

    function Di(a, b, c) {
        var d = a.l + b, e = Xa(a, 16), f = a.read_shift(1), g = [e];
        if (g[2] = f, c.cellFormula) {
            var h = Bp(a, d - a.l, c);
            g[1] = h
        } else a.l = d;
        return g
    }

    function Ei(a, b, c) {
        var d = a.l + b, e = qn(a, 16), f = [e];
        if (c.cellFormula) {
            var g = Ep(a, d - a.l, c);
            f[1] = g, a.l = d
        } else a.l = d;
        return f
    }

    function Fi(a, b, c) {
        null == c && (c = ia(18));
        var d = Jh(a, b);
        c.write_shift(-4, a), c.write_shift(-4, a), c.write_shift(4, 256 * (d.width || 10)), c.write_shift(4, 0);
        var e = 0;
        return b.hidden && (e |= 1), "number" == typeof d.width && (e |= 2), c.write_shift(1, e), c.write_shift(1, 0), c
    }

    function Gi(a) {
        var b = {};
        return aq.forEach(function (c) {
            b[c] = Za(a, 8)
        }), b
    }

    function Hi(a, b) {
        return null == b && (b = ia(48)), Kh(a), aq.forEach(function (c) {
            $a(a[c], b)
        }), b
    }

    function Ii(a) {
        var b = a.read_shift(2);
        return a.l += 28, {RTL: 32 & b}
    }

    function Ji(a, b, c) {
        null == c && (c = ia(30));
        var d = 924;
        return (((b || {}).Views || [])[0] || {}).RTL && (d |= 32), c.write_shift(2, d), c.write_shift(4, 0), c.write_shift(4, 0), c.write_shift(4, 0), c.write_shift(1, 0), c.write_shift(1, 0), c.write_shift(2, 0), c.write_shift(2, 100), c.write_shift(2, 0), c.write_shift(2, 0), c.write_shift(2, 0), c.write_shift(4, 0), c
    }

    function Ki(a) {
        var b = ia(24);
        return b.write_shift(4, 4), b.write_shift(4, 1), rn(a, b), b
    }

    function Li(a, b) {
        return null == b && (b = ia(66)), b.write_shift(2, a.password ? Fe(a.password) : 0), b.write_shift(4, 1), [["objects", !1], ["scenarios", !1], ["formatCells", !0], ["formatColumns", !0], ["formatRows", !0], ["insertColumns", !0], ["insertRows", !0], ["insertHyperlinks", !0], ["deleteColumns", !0], ["deleteRows", !0], ["selectLockedCells", !1], ["sort", !0], ["autoFilter", !0], ["pivotTables", !0], ["selectUnlockedCells", !1]].forEach(function (c) {
            c[1] ? b.write_shift(4, null == a[c[0]] || a[c[0]] ? 0 : 1) : b.write_shift(4, null != a[c[0]] && a[c[0]] ? 0 : 1)
        }), b
    }

    function Mi(a, b, c, d, e, f, g) {
        if (!a) return a;
        var h = b || {};
        d || (d = {"!id": {}}), null != Jl && null == h.dense && (h.dense = Jl);
        var i, j, k, l, m, n, o, p, q, r, s = h.dense ? [] : {}, t = {s: {r: 2e6, c: 2e6}, e: {r: 0, c: 0}}, u = !1,
            v = !1, w = [];
        h.biff = 12, h["!row"] = 0;
        var x = 0, y = !1, z = [], A = {}, B = h.supbooks || e.supbooks || [[]];
        if (B.sharedf = A, B.arrayf = z, B.SheetNames = e.SheetNames || e.Sheets.map(function (a) {
            return a.name
        }), !h.supbooks && (h.supbooks = B, e.Names)) for (var C = 0; C < e.Names.length; ++C) B[0][C + 1] = e.Names[C];
        var D = [], E = [], F = !1;
        if (ja(a, function (a, b, C) {
            if (!v) switch (C) {
                case 148:
                    i = a;
                    break;
                case 0:
                    j = a, h.sheetRows && h.sheetRows <= j.r && (v = !0), q = ra(m = j.r), h["!row"] = j.r, (a.hidden || a.hpt || null != a.level) && (a.hpt && (a.hpx = Ve(a.hpt)), E[a.r] = a);
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                    switch (k = {t: a[2]}, a[2]) {
                        case"n":
                            k.v = a[1];
                            break;
                        case"s":
                            p = Jp[a[1]], k.v = p.t, k.r = p.r;
                            break;
                        case"b":
                            k.v = !!a[1];
                            break;
                        case"e":
                            k.v = a[1], !1 !== h.cellText && (k.w = sn[k.v]);
                            break;
                        case"str":
                            k.t = "s", k.v = a[1]
                    }
                    if ((l = g.CellXf[a[0].iStyleRef]) && Mh(k, l.numFmtId, null, h, f, g), n = a[0].c, h.dense ? (s[m] || (s[m] = []), s[m][n] = k) : s[va(n) + q] = k, h.cellFormula) {
                        for (y = !1, x = 0; x < z.length; ++x) {
                            var G = z[x];
                            j.r >= G[0].s.r && j.r <= G[0].e.r && n >= G[0].s.c && n <= G[0].e.c && (k.F = Ca(G[0]), y = !0)
                        }
                        !y && a.length > 3 && (k.f = a[3])
                    }
                    if (t.s.r > j.r && (t.s.r = j.r), t.s.c > n && (t.s.c = n), t.e.r < j.r && (t.e.r = j.r), t.e.c < n && (t.e.c = n), h.cellDates && l && "n" == k.t && Tl.is_date(Tl._table[l.numFmtId])) {
                        var H = Tl.parse_date_code(k.v);
                        H && (k.t = "d", k.v = new Date(H.y, H.m - 1, H.d, H.H, H.M, H.S, H.u))
                    }
                    break;
                case 1:
                    if (!h.sheetStubs || u) break;
                    k = {
                        t: "z",
                        v: void 0
                    }, n = a[0].c, h.dense ? (s[m] || (s[m] = []), s[m][n] = k) : s[va(n) + q] = k, t.s.r > j.r && (t.s.r = j.r), t.s.c > n && (t.s.c = n), t.e.r < j.r && (t.e.r = j.r), t.e.c < n && (t.e.c = n);
                    break;
                case 176:
                    w.push(a);
                    break;
                case 494:
                    var I = d["!id"][a.relId];
                    for (I ? (a.Target = I.Target, a.loc && (a.Target += "#" + a.loc), a.Rel = I) : "" == a.relId && (a.Target = "#" + a.loc), m = a.rfx.s.r; m <= a.rfx.e.r; ++m) for (n = a.rfx.s.c; n <= a.rfx.e.c; ++n) h.dense ? (s[m] || (s[m] = []), s[m][n] || (s[m][n] = {
                        t: "z",
                        v: void 0
                    }), s[m][n].l = a) : (o = Aa({c: n, r: m}), s[o] || (s[o] = {t: "z", v: void 0}), s[o].l = a);
                    break;
                case 426:
                    if (!h.cellFormula) break;
                    z.push(a), r = h.dense ? s[m][n] : s[va(n) + q], r.f = wh(a[1], t, {
                        r: j.r,
                        c: n
                    }, B, h), r.F = Ca(a[0]);
                    break;
                case 427:
                    if (!h.cellFormula) break;
                    A[Aa(a[0].s)] = a[1], r = h.dense ? s[m][n] : s[va(n) + q], r.f = wh(a[1], t, {r: j.r, c: n}, B, h);
                    break;
                case 60:
                    if (!h.cellStyles) break;
                    for (; a.e >= a.s;) D[a.e--] = {
                        width: a.w / 256,
                        hidden: !!(1 & a.flags)
                    }, F || (F = !0, Se(a.w / 256)), Te(D[a.e + 1]);
                    break;
                case 161:
                    s["!autofilter"] = {ref: Ca(a)};
                    break;
                case 476:
                    s["!margins"] = a;
                    break;
                case 147:
                    e.Sheets[c] || (e.Sheets[c] = {}), a.name && (e.Sheets[c].CodeName = a.name);
                    break;
                case 137:
                    e.Views || (e.Views = [{}]), e.Views[0] || (e.Views[0] = {}), a.RTL && (e.Views[0].RTL = !0);
                    break;
                case 485:
                    break;
                case 175:
                case 644:
                case 625:
                case 562:
                case 396:
                case 1112:
                case 1146:
                case 471:
                case 1050:
                case 649:
                case 1105:
                case 49:
                case 589:
                case 607:
                case 564:
                case 1055:
                case 168:
                case 174:
                case 1180:
                case 499:
                case 64:
                case 1053:
                case 550:
                case 171:
                case 167:
                case 1177:
                case 169:
                case 1181:
                case 551:
                case 552:
                case 661:
                case 639:
                case 478:
                case 151:
                case 537:
                case 477:
                case 536:
                case 1103:
                case 680:
                case 1104:
                case 1024:
                case 152:
                case 663:
                case 535:
                case 678:
                case 504:
                case 1043:
                case 428:
                case 170:
                case 3072:
                case 50:
                case 2070:
                case 1045:
                    break;
                case 35:
                    u = !0;
                    break;
                case 36:
                    u = !1;
                    break;
                case 37:
                case 38:
                    break;
                default:
                    if ((b || "").indexOf("Begin") > 0) ; else if ((b || "").indexOf("End") > 0) ; else if (!u || h.WTF) throw new Error("Unexpected record " + C + " " + b)
            }
        }, h), delete h.supbooks, delete h["!row"], !s["!ref"] && (t.s.r < 2e6 || i && (i.e.r > 0 || i.e.c > 0 || i.s.r > 0 || i.s.c > 0)) && (s["!ref"] = Ca(i || t)), h.sheetRows && s["!ref"]) {
            var G = Da(s["!ref"]);
            h.sheetRows <= +G.e.r && (G.e.r = h.sheetRows - 1, G.e.r > t.e.r && (G.e.r = t.e.r), G.e.r < G.s.r && (G.s.r = G.e.r), G.e.c > t.e.c && (G.e.c = t.e.c), G.e.c < G.s.c && (G.s.c = G.e.c), s["!fullref"] = s["!ref"], s["!ref"] = Ca(G))
        }
        return w.length > 0 && (s["!merges"] = w), D.length > 0 && (s["!cols"] = D), E.length > 0 && (s["!rows"] = E), s
    }

    function Ni(a, b, c, d, e, f) {
        if (void 0 === b.v) return "";
        var g = "";
        switch (b.t) {
            case"b":
                g = b.v ? "1" : "0";
                break;
            case"d":
                b = B(b), b.z = b.z || Tl._table[14], b.v = w(z(b.v)), b.t = "n";
                break;
            case"n":
            case"e":
                g = "" + b.v;
                break;
            default:
                g = b.v
        }
        var h = {r: c, c: d};
        switch (h.s = Lh(e.cellXfs, b, e), b.l && f["!links"].push([Aa(h), b.l]), b.c && f["!comments"].push([Aa(h), b.c]), b.t) {
            case"s":
            case"str":
                return void (e.bookSST ? (g = Ih(e.Strings, b.v, e.revStrings), h.t = "s", h.v = g, la(a, "BrtCellIsst", pi(b, h))) : (h.t = "str", la(a, "BrtCellSt", vi(b, h))));
            case"n":
                return void (b.v == (0 | b.v) && b.v > -1e3 && b.v < 1e3 ? la(a, "BrtCellRk", ti(b, h)) : la(a, "BrtCellReal", ri(b, h)));
            case"b":
                return h.t = "b", void la(a, "BrtCellBool", mi(b, h));
            case"e":
                h.t = "e"
        }
        la(a, "BrtCellBlank", ki(b, h))
    }

    function Oi(a, b, c, d) {
        var e, f = Da(b["!ref"] || "A1"), g = "", h = [];
        la(a, "BrtBeginSheetData");
        var i = Array.isArray(b), j = f.e.r;
        b["!rows"] && (j = Math.max(f.e.r, b["!rows"].length - 1));
        for (var k = f.s.r; k <= j; ++k) if (g = ra(k), fi(a, b, f, k), k <= f.e.r) for (var l = f.s.c; l <= f.e.c; ++l) {
            k === f.s.r && (h[l] = va(l)), e = h[l] + g;
            var m = i ? (b[k] || [])[l] : b[e];
            m && Ni(a, m, k, l, d, b)
        }
        la(a, "BrtEndSheetData")
    }

    function Pi(a, b) {
        b && b["!merges"] && (la(a, "BrtBeginMergeCells", Ai(b["!merges"].length)), b["!merges"].forEach(function (b) {
            la(a, "BrtMergeCell", _p(b))
        }), la(a, "BrtEndMergeCells"))
    }

    function Qi(a, b) {
        b && b["!cols"] && (la(a, "BrtBeginColInfos"), b["!cols"].forEach(function (b, c) {
            b && la(a, "BrtColInfo", Fi(c, b))
        }), la(a, "BrtEndColInfos"))
    }

    function Ri(a, b) {
        b && b["!ref"] && (la(a, "BrtBeginCellIgnoreECs"), la(a, "BrtCellIgnoreEC", Ki(Da(b["!ref"]))), la(a, "BrtEndCellIgnoreECs"))
    }

    function Si(a, b, c) {
        b["!links"].forEach(function (b) {
            if (b[1].Target) {
                var d = nb(c, -1, b[1].Target.replace(/#.*$/, ""), Un.HLINK);
                la(a, "BrtHLink", Ci(b, d))
            }
        }), delete b["!links"]
    }

    function Ti(a, b, c, d) {
        if (b["!comments"].length > 0) {
            var e = nb(d, -1, "../drawings/vmlDrawing" + (c + 1) + ".vml", Un.VML);
            la(a, "BrtLegacyDrawing", pn("rId" + e)), b["!legacy"] = e
        }
    }

    function Ui(a, b) {
        b["!autofilter"] && (la(a, "BrtBeginAFilter", rn(Da(b["!autofilter"].ref))), la(a, "BrtEndAFilter"))
    }

    function Vi(a, b, c) {
        la(a, "BrtBeginWsViews"), la(a, "BrtBeginWsView", Ji(b, c)), la(a, "BrtEndWsView"), la(a, "BrtEndWsViews")
    }

    function Wi() {
    }

    function Xi(a, b) {
        b["!protect"] && la(a, "BrtSheetProtection", Li(b["!protect"]))
    }

    function Yi(a, b, c, d) {
        var e = ka(), f = c.SheetNames[a], g = c.Sheets[f] || {}, h = f;
        try {
            c && c.Workbook && (h = c.Workbook.Sheets[a].CodeName || h)
        } catch (a) {
        }
        var i = Da(g["!ref"] || "A1");
        if (i.e.c > 16383 || i.e.r > 1048575) {
            if (b.WTF) throw new Error("Range " + (g["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
            i.e.c = Math.min(i.e.c, 16383), i.e.r = Math.min(i.e.c, 1048575)
        }
        return g["!links"] = [], g["!comments"] = [], la(e, "BrtBeginSheet"), c.vbaraw && la(e, "BrtWsProp", ii(h)), la(e, "BrtWsDim", Zp(i)), Vi(e, g, c.Workbook), Wi(e, g), Qi(e, g, a, b, c), Oi(e, g, a, b, c), Xi(e, g), Ui(e, g), Pi(e, g), Si(e, g, d), g["!margins"] && la(e, "BrtMargins", Hi(g["!margins"])), b && !b.ignoreEC && void 0 != b.ignoreEC || Ri(e, g), Ti(e, g, a, d), la(e, "BrtEndSheet"), e.end()
    }

    function Zi(a) {
        var b = [];
        (a.match(/<c:pt idx="(\d*)">(.*?)<\/c:pt>/gm) || []).forEach(function (a) {
            var c = a.match(/<c:pt idx="(\d*?)"><c:v>(.*)<\/c:v><\/c:pt>/);
            c && (b[+c[1]] = +c[2])
        });
        var c = nm((a.match(/<c:formatCode>([\s\S]*?)<\/c:formatCode>/) || ["", "General"])[1]);
        return [b, c]
    }

    function $i(a, b, c, d, e, f) {
        var g = f || {"!type": "chart"};
        if (!a) return f;
        var h = 0, i = 0, j = "A", k = {s: {r: 2e6, c: 2e6}, e: {r: 0, c: 0}};
        return (a.match(/<c:numCache>[\s\S]*?<\/c:numCache>/gm) || []).forEach(function (a) {
            var b = Zi(a);
            k.s.r = k.s.c = 0, k.e.c = h, j = va(h), b[0].forEach(function (a, c) {
                g[j + ra(c)] = {t: "n", v: a, z: b[1]}, i = c
            }), k.e.r < i && (k.e.r = i), ++h
        }), h > 0 && (g["!ref"] = Ca(k)), g
    }

    function _i(a, b, c, d, e) {
        if (!a) return a;
        d || (d = {"!id": {}});
        var f, g = {"!type": "chart", "!chart": null, "!rel": ""}, h = a.match(Tp);
        return h && Rh(h[0], g, e, c), (f = a.match(/drawing r:id="(.*?)"/)) && (g["!rel"] = f[1]), d["!id"][g["!rel"]] && (g["!chart"] = d["!id"][g["!rel"]]), g
    }

    function aj(a, b) {
        return a.l += 10, {name: Ka(a, b - 10)}
    }

    function bj(a, b, c, d, e) {
        if (!a) return a;
        d || (d = {"!id": {}});
        var f = {"!type": "chart", "!chart": null, "!rel": ""}, g = [], h = !1;
        return ja(a, function (a, d, i) {
            switch (i) {
                case 550:
                    f["!rel"] = a;
                    break;
                case 651:
                    e.Sheets[c] || (e.Sheets[c] = {}), a.name && (e.Sheets[c].CodeName = a.name);
                    break;
                case 562:
                case 652:
                case 669:
                case 679:
                case 551:
                case 552:
                case 476:
                case 3072:
                    break;
                case 35:
                    h = !0;
                    break;
                case 36:
                    h = !1;
                    break;
                case 37:
                    g.push(d);
                    break;
                case 38:
                    g.pop();
                    break;
                default:
                    if ((d || "").indexOf("Begin") > 0) g.push(d); else if ((d || "").indexOf("End") > 0) g.pop(); else if (!h || b.WTF) throw new Error("Unexpected record " + i + " " + d)
            }
        }, b), d["!id"][f["!rel"]] && (f["!chart"] = d["!id"][f["!rel"]]), f
    }

    function cj(a, b) {
        for (var c = 0; c != a.length; ++c) for (var d = a[c], e = 0; e != b.length; ++e) {
            var f = b[e];
            if (null == d[f[0]]) d[f[0]] = f[1]; else switch (f[2]) {
                case"bool":
                    "string" == typeof d[f[0]] && (d[f[0]] = V(d[f[0]]));
                    break;
                case"int":
                    "string" == typeof d[f[0]] && (d[f[0]] = parseInt(d[f[0]], 10))
            }
        }
    }

    function dj(a, b) {
        for (var c = 0; c != b.length; ++c) {
            var d = b[c];
            if (null == a[d[0]]) a[d[0]] = d[1]; else switch (d[2]) {
                case"bool":
                    "string" == typeof a[d[0]] && (a[d[0]] = V(a[d[0]]));
                    break;
                case"int":
                    "string" == typeof a[d[0]] && (a[d[0]] = parseInt(a[d[0]], 10))
            }
        }
    }

    function ej(a) {
        dj(a.WBProps, bq), dj(a.CalcPr, eq), cj(a.WBView, cq), cj(a.Sheets, dq), Kp.date1904 = V(a.WBProps.date1904)
    }

    function fj(a) {
        return a.Workbook && a.Workbook.WBProps && V(a.Workbook.WBProps.date1904) ? "true" : "false"
    }

    function gj(a, b) {
        if (a.length > 31) {
            if (b) return !1;
            throw new Error("Sheet names cannot exceed 31 chars")
        }
        var c = !0;
        return fq.forEach(function (d) {
            if (-1 != a.indexOf(d)) {
                if (!b) throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
                c = !1
            }
        }), c
    }

    function hj(a, b, c) {
        a.forEach(function (d, e) {
            gj(d);
            for (var f = 0; f < e; ++f) if (d == a[f]) throw new Error("Duplicate Sheet Name: " + d);
            if (c) {
                var g = b && b[e] && b[e].CodeName || d;
                if (95 == g.charCodeAt(0) && g.length > 22) throw new Error("Bad Code Name: Worksheet" + g)
            }
        })
    }

    function ij(a) {
        if (!a || !a.SheetNames || !a.Sheets) throw new Error("Invalid Workbook");
        if (!a.SheetNames.length) throw new Error("Workbook is empty");
        var b = a.Workbook && a.Workbook.Sheets || [];
        hj(a.SheetNames, b, !!a.vbaraw);
        for (var c = 0; c < a.SheetNames.length; ++c) Nh(a.Sheets[a.SheetNames[c]], a.SheetNames[c], c)
    }

    function jj(a, b) {
        if (!a) throw new Error("Could not find file");
        var c = {AppVersion: {}, WBProps: {}, WBView: [], Sheets: [], CalcPr: {}, Names: [], xmlns: ""}, d = !1,
            e = "xmlns", f = {}, g = 0;
        if (a.replace(im, function (h, i) {
            var j = P(h);
            switch (Q(j[0])) {
                case"<?xml":
                    break;
                case"<workbook":
                    h.match(gq) && (e = "xmlns" + h.match(/<(\w+):/)[1]), c.xmlns = j[e];
                    break;
                case"</workbook>":
                    break;
                case"<fileVersion":
                    delete j[0], c.AppVersion = j;
                    break;
                case"<fileVersion/>":
                case"</fileVersion>":
                    break;
                case"<fileSharing":
                case"<fileSharing/>":
                    break;
                case"<workbookPr":
                case"<workbookPr/>":
                    bq.forEach(function (a) {
                        if (null != j[a[0]]) switch (a[2]) {
                            case"bool":
                                c.WBProps[a[0]] = V(j[a[0]]);
                                break;
                            case"int":
                                c.WBProps[a[0]] = parseInt(j[a[0]], 10);
                                break;
                            default:
                                c.WBProps[a[0]] = j[a[0]]
                        }
                    }), j.codeName && (c.WBProps.CodeName = j.codeName);
                    break;
                case"</workbookPr>":
                case"<workbookProtection":
                case"<workbookProtection/>":
                    break;
                case"<bookViews":
                case"<bookViews>":
                case"</bookViews>":
                    break;
                case"<workbookView":
                case"<workbookView/>":
                    delete j[0], c.WBView.push(j);
                    break;
                case"</workbookView>":
                    break;
                case"<sheets":
                case"<sheets>":
                case"</sheets>":
                    break;
                case"<sheet":
                    switch (j.state) {
                        case"hidden":
                            j.Hidden = 1;
                            break;
                        case"veryHidden":
                            j.Hidden = 2;
                            break;
                        default:
                            j.Hidden = 0
                    }
                    delete j.state, j.name = nm(tm(j.name)), delete j[0], c.Sheets.push(j);
                    break;
                case"</sheet>":
                    break;
                case"<functionGroups":
                case"<functionGroups/>":
                case"<functionGroup":
                    break;
                case"<externalReferences":
                case"</externalReferences>":
                case"<externalReferences>":
                case"<externalReference":
                case"<definedNames/>":
                    break;
                case"<definedNames>":
                case"<definedNames":
                    d = !0;
                    break;
                case"</definedNames>":
                    d = !1;
                    break;
                case"<definedName":
                    f = {}, f.Name = tm(j.name), j.comment && (f.Comment = j.comment), j.localSheetId && (f.Sheet = +j.localSheetId), V(j.hidden || "0") && (f.Hidden = !0), g = i + h.length;
                    break;
                case"</definedName>":
                    f.Ref = nm(tm(a.slice(g, i))), c.Names.push(f);
                    break;
                case"<definedName/>":
                    break;
                case"<calcPr":
                case"<calcPr/>":
                    delete j[0], c.CalcPr = j;
                    break;
                case"</calcPr>":
                case"<oleSize":
                    break;
                case"<customWorkbookViews>":
                case"</customWorkbookViews>":
                case"<customWorkbookViews":
                    break;
                case"<customWorkbookView":
                case"</customWorkbookView>":
                    break;
                case"<pivotCaches>":
                case"</pivotCaches>":
                case"<pivotCaches":
                case"<pivotCache":
                    break;
                case"<smartTagPr":
                case"<smartTagPr/>":
                    break;
                case"<smartTagTypes":
                case"<smartTagTypes>":
                case"</smartTagTypes>":
                case"<smartTagType":
                    break;
                case"<webPublishing":
                case"<webPublishing/>":
                    break;
                case"<fileRecoveryPr":
                case"<fileRecoveryPr/>":
                    break;
                case"<webPublishObjects>":
                case"<webPublishObjects":
                case"</webPublishObjects>":
                case"<webPublishObject":
                    break;
                case"<extLst":
                case"<extLst>":
                case"</extLst>":
                case"<extLst/>":
                    break;
                case"<ext":
                    d = !0;
                    break;
                case"</ext>":
                    d = !1;
                    break;
                case"<ArchID":
                    break;
                case"<AlternateContent":
                case"<AlternateContent>":
                    d = !0;
                    break;
                case"</AlternateContent>":
                    d = !1;
                    break;
                case"<revisionPtr":
                    break;
                default:
                    if (!d && b.WTF) throw new Error("unrecognized " + j[0] + " in workbook")
            }
            return h
        }), -1 === Em.main.indexOf(c.xmlns)) throw new Error("Unknown Namespace: " + c.xmlns);
        return ej(c), c
    }

    function kj(a) {
        var b = [gm];
        b[b.length] = hq;
        var c = a.Workbook && (a.Workbook.Names || []).length > 0, d = {codeName: "ThisWorkbook"};
        a.Workbook && a.Workbook.WBProps && (bq.forEach(function (b) {
            null != a.Workbook.WBProps[b[0]] && a.Workbook.WBProps[b[0]] != b[1] && (d[b[0]] = a.Workbook.WBProps[b[0]])
        }), a.Workbook.WBProps.CodeName && (d.codeName = a.Workbook.WBProps.CodeName, delete d.CodeName)), b[b.length] = Z("workbookPr", null, d);
        var e = a.Workbook && a.Workbook.Sheets || [], f = 0;
        for (b[b.length] = "<sheets>", f = 0; f != a.SheetNames.length; ++f) {
            var g = {name: R(a.SheetNames[f].slice(0, 31))};
            if (g.sheetId = "" + (f + 1), g["r:id"] = "rId" + (f + 1), e[f]) switch (e[f].Hidden) {
                case 1:
                    g.state = "hidden";
                    break;
                case 2:
                    g.state = "veryHidden"
            }
            b[b.length] = Z("sheet", null, g)
        }
        return b[b.length] = "</sheets>", c && (b[b.length] = "<definedNames>", a.Workbook && a.Workbook.Names && a.Workbook.Names.forEach(function (a) {
            var c = {name: a.Name};
            a.Comment && (c.comment = a.Comment), null != a.Sheet && (c.localSheetId = "" + a.Sheet), a.Hidden && (c.hidden = "1"), a.Ref && (b[b.length] = Z("definedName", String(a.Ref).replace(/</g, "&lt;").replace(/>/g, "&gt;"), c))
        }), b[b.length] = "</definedNames>"), b.length > 2 && (b[b.length] = "</workbook>", b[1] = b[1].replace("/>", ">")), b.join("")
    }

    function lj(a, b) {
        var c = {};
        return c.Hidden = a.read_shift(4), c.iTabID = a.read_shift(4), c.strRelID = on(a, b - 8), c.name = Ka(a), c
    }

    function mj(a, b) {
        return b || (b = ia(127)), b.write_shift(4, a.Hidden), b.write_shift(4, a.iTabID), pn(a.strRelID, b), La(a.name.slice(0, 31), b), b.length > b.l ? b.slice(0, b.l) : b
    }

    function nj(a, b) {
        var c = {}, d = a.read_shift(4);
        c.defaultThemeVersion = a.read_shift(4);
        var e = b > 8 ? Ka(a) : "";
        return e.length > 0 && (c.CodeName = e), c.autoCompressPictures = !!(65536 & d), c.backupFile = !!(64 & d), c.checkCompatibility = !!(4096 & d), c.date1904 = !!(1 & d), c.filterPrivacy = !!(8 & d), c.hidePivotFieldList = !!(1024 & d), c.promptedSolutions = !!(16 & d), c.publishItems = !!(2048 & d), c.refreshAllConnections = !!(262144 & d), c.saveExternalLinkValues = !!(128 & d), c.showBorderUnselectedTables = !!(4 & d), c.showInkAnnotation = !!(32 & d), c.showObjects = ["all", "placeholders", "none"][d >> 13 & 3], c.showPivotChartFilter = !!(32768 & d), c.updateLinks = ["userSet", "never", "always"][d >> 8 & 3], c
    }

    function oj(a, b) {
        b || (b = ia(72));
        var c = 0;
        return a && a.filterPrivacy && (c |= 8), b.write_shift(4, c), b.write_shift(4, 0), mn(a && a.CodeName || "ThisWorkbook", b), b.slice(0, b.l)
    }

    function pj(a, b) {
        var c = {};
        return a.read_shift(4), c.ArchID = a.read_shift(4), a.l += b - 8, c
    }

    function qj(a, b, c) {
        var d = a.l + b;
        a.l += 4, a.l += 1;
        var e = a.read_shift(4), f = nn(a), g = Dp(a, 0, c), h = Ta(a);
        a.l = d;
        var i = {Name: f, Ptg: g};
        return e < 268435455 && (i.Sheet = e), h && (i.Comment = h), i
    }

    function rj(a, b) {
        var c = {AppVersion: {}, WBProps: {}, WBView: [], Sheets: [], CalcPr: {}, xmlns: ""}, d = [], e = !1;
        b || (b = {}), b.biff = 12;
        var f = [], g = [[]];
        return g.SheetNames = [], g.XTI = [], ja(a, function (a, h, i) {
            switch (i) {
                case 156:
                    g.SheetNames.push(a.name), c.Sheets.push(a);
                    break;
                case 153:
                    c.WBProps = a;
                    break;
                case 39:
                    null != a.Sheet && (b.SID = a.Sheet), a.Ref = wh(a.Ptg, null, null, g, b), delete b.SID, delete a.Ptg, f.push(a);
                    break;
                case 1036:
                    break;
                case 357:
                case 358:
                case 355:
                case 667:
                    g[0].length ? g.push([i, a]) : g[0] = [i, a], g[g.length - 1].XTI = [];
                    break;
                case 362:
                    0 === g.length && (g[0] = [], g[0].XTI = []), g[g.length - 1].XTI = g[g.length - 1].XTI.concat(a), g.XTI = g.XTI.concat(a);
                    break;
                case 361:
                    break;
                case 3072:
                case 3073:
                case 2071:
                case 534:
                case 677:
                case 158:
                case 157:
                case 610:
                case 2050:
                case 155:
                case 548:
                case 676:
                case 128:
                case 665:
                case 2128:
                case 2125:
                case 549:
                case 2053:
                case 596:
                case 2076:
                case 2075:
                case 2082:
                case 397:
                case 154:
                case 1117:
                case 553:
                case 2091:
                    break;
                case 35:
                    d.push(h), e = !0;
                    break;
                case 36:
                    d.pop(), e = !1;
                    break;
                case 37:
                    d.push(h), e = !0;
                    break;
                case 38:
                    d.pop(), e = !1;
                    break;
                case 16:
                    break;
                default:
                    if ((h || "").indexOf("Begin") > 0) ; else if ((h || "").indexOf("End") > 0) ; else if (!e || b.WTF && "BrtACBegin" != d[d.length - 1] && "BrtFRTBegin" != d[d.length - 1]) throw new Error("Unexpected record " + i + " " + h)
            }
        }, b), ej(c), c.Names = f, c.supbooks = g, c
    }

    function sj(a, b) {
        la(a, "BrtBeginBundleShs");
        for (var c = 0; c != b.SheetNames.length; ++c) {
            la(a, "BrtBundleSh", mj({
                Hidden: b.Workbook && b.Workbook.Sheets && b.Workbook.Sheets[c] && b.Workbook.Sheets[c].Hidden || 0,
                iTabID: c + 1,
                strRelID: "rId" + (c + 1),
                name: b.SheetNames[c]
            }))
        }
        la(a, "BrtEndBundleShs")
    }

    function tj(b, c) {
        c || (c = ia(127));
        for (var d = 0; 4 != d; ++d) c.write_shift(4, 0);
        return La("SheetJS", c), La(a.version, c), La(a.version, c), La("7262", c), c.length = c.l, c.length > c.l ? c.slice(0, c.l) : c
    }

    function uj(a, b) {
        return b || (b = ia(29)), b.write_shift(-4, 0), b.write_shift(-4, 460), b.write_shift(4, 28800), b.write_shift(4, 17600), b.write_shift(4, 500), b.write_shift(4, a), b.write_shift(4, a), b.write_shift(1, 120), b.length > b.l ? b.slice(0, b.l) : b
    }

    function vj(a, b) {
        if (b.Workbook && b.Workbook.Sheets) {
            for (var c = b.Workbook.Sheets, d = 0, e = -1, f = -1; d < c.length; ++d) !c[d] || !c[d].Hidden && -1 == e ? e = d : 1 == c[d].Hidden && -1 == f && (f = d);
            f > e || (la(a, "BrtBeginBookViews"), la(a, "BrtBookView", uj(e)), la(a, "BrtEndBookViews"))
        }
    }

    function wj(a, b) {
        var c = ka();
        return la(c, "BrtBeginBook"), la(c, "BrtFileVersion", tj()), la(c, "BrtWbProp", oj(a.Workbook && a.Workbook.WBProps || null)), vj(c, a, b), sj(c, a, b), la(c, "BrtEndBook"), c.end()
    }

    function xj(a, b, c) {
        return ".bin" === b.slice(-4) ? rj(a, c) : jj(a, c)
    }

    function yj(a, b, c, d, e, f, g, h) {
        return ".bin" === b.slice(-4) ? Mi(a, d, c, e, f, g, h) : Ph(a, d, c, e, f, g, h)
    }

    function zj(a, b, c, d, e, f, g, h) {
        return ".bin" === b.slice(-4) ? bj(a, d, c, e, f, g, h) : _i(a, d, c, e, f, g, h)
    }

    function Aj(a, b, c, d, e, f, g, h) {
        return ".bin" === b.slice(-4) ? gg(a, d, c, e, f, g, h) : hg(a, d, c, e, f, g, h)
    }

    function Bj(a, b, c, d, e, f, g, h) {
        return ".bin" === b.slice(-4) ? eg(a, d, c, e, f, g, h) : fg(a, d, c, e, f, g, h)
    }

    function Cj(a, b, c, d) {
        return ".bin" === b.slice(-4) ? of(a, c, d) : To(a, c, d)
    }

    function Dj(a, b, c) {
        return Ef(a, c)
    }

    function Ej(a, b, c) {
        return ".bin" === b.slice(-4) ? me(a, c) : je(a, c)
    }

    function Fj(a, b, c) {
        return ".bin" === b.slice(-4) ? ag(a, c) : Xf(a, c)
    }

    function Gj(a, b, c) {
        return ".bin" === b.slice(-4) ? Qf(a, b, c) : Of(a, b, c)
    }

    function Hj(a, b, c) {
        return ".bin" === b.slice(-4) ? Sf(a, b, c) : Rf(a, b, c)
    }

    function Ij(a, b, c) {
        return (".bin" === b.slice(-4) ? wj : kj)(a, c)
    }

    function Jj(a, b, c, d, e) {
        return (".bin" === b.slice(-4) ? Yi : ci)(a, c, d, e)
    }

    function Kj(a, b, c) {
        return (".bin" === b.slice(-4) ? zf : bf)(a, c)
    }

    function Lj(a, b, c) {
        return (".bin" === b.slice(-4) ? oe : ke)(a, c)
    }

    function Mj(a, b, c) {
        return (".bin" === b.slice(-4) ? bg : Yf)(a, c)
    }

    function Nj(a, b) {
        var c = a.split(/\s+/), d = [];
        if (b || (d[0] = c[0]), 1 === c.length) return d;
        var e, f, g, h, i = a.match(iq);
        if (i) for (h = 0; h != i.length; ++h) e = i[h].match(jq), -1 === (f = e[1].indexOf(":")) ? d[e[1]] = e[2].slice(1, e[2].length - 1) : (g = "xmlns:" === e[1].slice(0, 6) ? "xmlns" + e[1].slice(6) : e[1].slice(f + 1), d[g] = e[2].slice(1, e[2].length - 1));
        return d
    }

    function Oj(a) {
        var b = a.split(/\s+/), c = {};
        if (1 === b.length) return c;
        var d, e, f, g, h = a.match(iq);
        if (h) for (g = 0; g != h.length; ++g) d = h[g].match(jq), -1 === (e = d[1].indexOf(":")) ? c[d[1]] = d[2].slice(1, d[2].length - 1) : (f = "xmlns:" === d[1].slice(0, 6) ? "xmlns" + d[1].slice(6) : d[1].slice(e + 1), c[f] = d[2].slice(1, d[2].length - 1));
        return c
    }

    function Pj(a, b) {
        var c = Wl[a] || nm(a);
        return "General" === c ? Tl._general(b) : Tl.format(c, b)
    }

    function Qj(a, b, c, d) {
        var e = d;
        switch ((c[0].match(/dt:dt="([\w.]+)"/) || ["", ""])[1]) {
            case"boolean":
                e = V(d);
                break;
            case"i2":
            case"int":
                e = parseInt(d, 10);
                break;
            case"r4":
            case"float":
                e = parseFloat(d);
                break;
            case"date":
            case"dateTime.tz":
                e = z(d);
                break;
            case"i8":
            case"string":
            case"fixed":
            case"uuid":
            case"bin.base64":
                break;
            default:
                throw new Error("bad custprop:" + c[0])
        }
        a[nm(b)] = e
    }

    function Rj(a, b, c) {
        if ("z" !== a.t) {
            if (!c || !1 !== c.cellText) try {
                "e" === a.t ? a.w = a.w || sn[a.v] : "General" === b ? "n" === a.t ? (0 | a.v) === a.v ? a.w = Tl._general_int(a.v) : a.w = Tl._general_num(a.v) : a.w = Tl._general(a.v) : a.w = Pj(b || "General", a.v)
            } catch (a) {
                if (c.WTF) throw a
            }
            try {
                var d = Wl[b] || b || "General";
                if (c.cellNF && (a.z = d), c.cellDates && "n" == a.t && Tl.is_date(d)) {
                    var e = Tl.parse_date_code(a.v);
                    e && (a.t = "d", a.v = new Date(e.y, e.m - 1, e.d, e.H, e.M, e.S, e.u))
                }
            } catch (a) {
                if (c.WTF) throw a
            }
        }
    }

    function Sj(a, b, c) {
        if (c.cellStyles && b.Interior) {
            var d = b.Interior;
            d.Pattern && (d.patternType = Qo[d.Pattern] || d.Pattern)
        }
        a[b.ID] = b
    }

    function Tj(a, b, c, d, e, f, g, h, i, j) {
        var k = "General", l = d.StyleID, m = {};
        j = j || {};
        var n = [], o = 0;
        for (void 0 === l && h && (l = h.StyleID), void 0 === l && g && (l = g.StyleID); void 0 !== f[l] && (f[l].nf && (k = f[l].nf), f[l].Interior && n.push(f[l].Interior), f[l].Parent);) l = f[l].Parent;
        switch (c.Type) {
            case"Boolean":
                d.t = "b", d.v = V(a);
                break;
            case"String":
                d.t = "s", d.r = rm(nm(a)), d.v = a.indexOf("<") > -1 ? nm(b) : d.r;
                break;
            case"DateTime":
                "Z" != a.slice(-1) && (a += "Z"), d.v = (z(a) - new Date(Date.UTC(1899, 11, 30))) / 864e5, d.v !== d.v ? d.v = nm(a) : d.v < 60 && (d.v = d.v - 1), k && "General" != k || (k = "yyyy-mm-dd");
            case"Number":
                void 0 === d.v && (d.v = +a), d.t || (d.t = "n");
                break;
            case"Error":
                d.t = "e", d.v = tn[a], !1 !== j.cellText && (d.w = a);
                break;
            default:
                d.t = "s", d.v = rm(b || a)
        }
        if (Rj(d, k, j), !1 !== j.cellFormula) if (d.Formula) {
            var p = nm(d.Formula);
            61 == p.charCodeAt(0) && (p = p.slice(1)), d.f = gp(p, e), delete d.Formula, "RC" == d.ArrayRange ? d.F = gp("RC:RC", e) : d.ArrayRange && (d.F = gp(d.ArrayRange, e), i.push([Da(d.F), d.F]))
        } else for (o = 0; o < i.length; ++o) e.r >= i[o][0].s.r && e.r <= i[o][0].e.r && e.c >= i[o][0].s.c && e.c <= i[o][0].e.c && (d.F = i[o][1]);
        j.cellStyles && (n.forEach(function (a) {
            !m.patternType && a.patternType && (m.patternType = a.patternType)
        }), d.s = m), void 0 !== d.StyleID && (d.ixfe = d.StyleID)
    }

    function Uj(a) {
        a.t = a.v || "", a.t = a.t.replace(/\r\n/g, "\n").replace(/\r/g, "\n"), a.v = a.w = a.ixfe = void 0
    }

    function Vj(a) {
        if (Ml && Buffer.isBuffer(a)) return a.toString("utf8");
        if ("string" == typeof a) return a;
        if ("undefined" != typeof Uint8Array && a instanceof Uint8Array) return tm(j(l(a)));
        throw new Error("Bad input format: expected Buffer or string")
    }

    function Wj(a, b) {
        var c = b || {};
        Ul(Tl);
        var e = Hl(Vj(a));
        "binary" != c.type && "array" != c.type && "base64" != c.type || (e = "undefined" != typeof cptable ? cptable.utils.decode(65001, d(e)) : tm(e));
        var f = e.slice(0, 1024).toLowerCase(), g = !1;
        if (-1 == f.indexOf("<?xml") && ["html", "table", "head", "meta", "script", "style", "div"].forEach(function (a) {
            f.indexOf("<" + a) >= 0 && (g = !0)
        }), g) return rq.to_workbook(e, c);
        var h, i, j = [];
        null != Jl && null == c.dense && (c.dense = Jl);
        var k, l = {}, m = [], n = c.dense ? [] : {}, o = "", p = {}, q = {}, r = Nj('<Data ss:Type="String">'), s = 0,
            t = 0, u = 0, v = {s: {r: 2e6, c: 2e6}, e: {r: 0, c: 0}}, w = {}, x = {}, y = "", z = 0, A = [], C = {},
            D = {}, E = 0, F = [], G = [], H = {}, I = [], J = !1, K = [], L = [], M = {}, N = 0, O = 0,
            Q = {Sheets: [], WBProps: {date1904: !1}}, R = {};
        for (lq.lastIndex = 0, e = e.replace(/<!--([\s\S]*?)-->/gm, ""); h = lq.exec(e);) switch (h[3]) {
            case"Data":
                if (j[j.length - 1][1]) break;
                "/" === h[1] ? Tj(e.slice(s, h.index), y, r, "Comment" == j[j.length - 1][0] ? H : p, {
                    c: t,
                    r: u
                }, w, I[t], q, K, c) : (y = "", r = Nj(h[0]), s = h.index + h[0].length);
                break;
            case"Cell":
                if ("/" === h[1]) if (G.length > 0 && (p.c = G), (!c.sheetRows || c.sheetRows > u) && void 0 !== p.v && (c.dense ? (n[u] || (n[u] = []), n[u][t] = p) : n[va(t) + ra(u)] = p), p.HRef && (p.l = {Target: p.HRef}, p.HRefScreenTip && (p.l.Tooltip = p.HRefScreenTip), delete p.HRef, delete p.HRefScreenTip), (p.MergeAcross || p.MergeDown) && (N = t + (0 | parseInt(p.MergeAcross, 10)), O = u + (0 | parseInt(p.MergeDown, 10)), A.push({
                    s: {
                        c: t,
                        r: u
                    }, e: {c: N, r: O}
                })), c.sheetStubs) if (p.MergeAcross || p.MergeDown) {
                    for (var S = t; S <= N; ++S) for (var T = u; T <= O; ++T) (S > t || T > u) && (c.dense ? (n[T] || (n[T] = []), n[T][S] = {t: "z"}) : n[va(S) + ra(T)] = {t: "z"});
                    t = N + 1
                } else ++t; else p.MergeAcross ? t = N + 1 : ++t; else p = Oj(h[0]), p.Index && (t = +p.Index - 1), t < v.s.c && (v.s.c = t), t > v.e.c && (v.e.c = t), "/>" === h[0].slice(-2) && ++t, G = [];
                break;
            case"Row":
                "/" === h[1] || "/>" === h[0].slice(-2) ? (u < v.s.r && (v.s.r = u), u > v.e.r && (v.e.r = u), "/>" === h[0].slice(-2) && (q = Nj(h[0]), q.Index && (u = +q.Index - 1)), t = 0, ++u) : (q = Nj(h[0]), q.Index && (u = +q.Index - 1), M = {}, ("0" == q.AutoFitHeight || q.Height) && (M.hpx = parseInt(q.Height, 10), M.hpt = Ue(M.hpx), L[u] = M), "1" == q.Hidden && (M.hidden = !0, L[u] = M));
                break;
            case"Worksheet":
                if ("/" === h[1]) {
                    if ((i = j.pop())[0] !== h[3]) throw new Error("Bad state: " + i.join("|"));
                    m.push(o), v.s.r <= v.e.r && v.s.c <= v.e.c && (n["!ref"] = Ca(v), c.sheetRows && c.sheetRows <= v.e.r && (n["!fullref"] = n["!ref"], v.e.r = c.sheetRows - 1, n["!ref"] = Ca(v))), A.length && (n["!merges"] = A), I.length > 0 && (n["!cols"] = I), L.length > 0 && (n["!rows"] = L), l[o] = n
                } else v = {
                    s: {r: 2e6, c: 2e6},
                    e: {r: 0, c: 0}
                }, u = t = 0, j.push([h[3], !1]), i = Nj(h[0]), o = nm(i.Name), n = c.dense ? [] : {}, A = [], K = [], L = [], R = {
                    name: o,
                    Hidden: 0
                }, Q.Sheets.push(R);
                break;
            case"Table":
                if ("/" === h[1]) {
                    if ((i = j.pop())[0] !== h[3]) throw new Error("Bad state: " + i.join("|"))
                } else {
                    if ("/>" == h[0].slice(-2)) break;
                    Nj(h[0]), j.push([h[3], !1]), I = [], J = !1
                }
                break;
            case"Style":
                "/" === h[1] ? Sj(w, x, c) : x = Nj(h[0]);
                break;
            case"NumberFormat":
                x.nf = nm(Nj(h[0]).Format || "General"), Wl[x.nf] && (x.nf = Wl[x.nf]);
                for (var U = 0; 392 != U && Tl._table[U] != x.nf; ++U) ;
                if (392 == U) for (U = 57; 392 != U; ++U) if (null == Tl._table[U]) {
                    Tl.load(x.nf, U);
                    break
                }
                break;
            case"Column":
                if ("Table" !== j[j.length - 1][0]) break;
                if (k = Nj(h[0]), k.Hidden && (k.hidden = !0, delete k.Hidden), k.Width && (k.wpx = parseInt(k.Width, 10)), !J && k.wpx > 10) {
                    J = !0, No = Ko;
                    for (var V = 0; V < I.length; ++V) I[V] && Te(I[V])
                }
                J && Te(k), I[k.Index - 1 || I.length] = k;
                for (var W = 0; W < +k.Span; ++W) I[I.length] = B(k);
                break;
            case"NamedRange":
                Q.Names || (Q.Names = []);
                var X = P(h[0]), Y = {Name: X.Name, Ref: gp(X.RefersTo.slice(1), {r: 0, c: 0})};
                Q.Sheets.length > 0 && (Y.Sheet = Q.Sheets.length - 1), Q.Names.push(Y);
                break;
            case"NamedCell":
            case"B":
            case"I":
            case"U":
            case"S":
            case"Sub":
            case"Sup":
            case"Span":
            case"Border":
            case"Alignment":
            case"Borders":
                break;
            case"Font":
                if ("/>" === h[0].slice(-2)) break;
                "/" === h[1] ? y += e.slice(z, h.index) : z = h.index + h[0].length;
                break;
            case"Interior":
                if (!c.cellStyles) break;
                x.Interior = Nj(h[0]);
                break;
            case"Protection":
                break;
            case"Author":
            case"Title":
            case"Description":
            case"Created":
            case"Keywords":
            case"Subject":
            case"Category":
            case"Company":
            case"LastAuthor":
            case"LastSaved":
            case"LastPrinted":
            case"Version":
            case"Revision":
            case"TotalTime":
            case"HyperlinkBase":
            case"Manager":
            case"ContentStatus":
            case"Identifier":
            case"Language":
            case"AppName":
                if ("/>" === h[0].slice(-2)) break;
                "/" === h[1] ? Bb(C, h[3], e.slice(E, h.index)) : E = h.index + h[0].length;
                break;
            case"Paragraphs":
                break;
            case"Styles":
            case"Workbook":
                if ("/" === h[1]) {
                    if ((i = j.pop())[0] !== h[3]) throw new Error("Bad state: " + i.join("|"))
                } else j.push([h[3], !1]);
                break;
            case"Comment":
                if ("/" === h[1]) {
                    if ((i = j.pop())[0] !== h[3]) throw new Error("Bad state: " + i.join("|"));
                    Uj(H), G.push(H)
                } else j.push([h[3], !1]), i = Nj(h[0]), H = {a: i.Author};
                break;
            case"AutoFilter":
                if ("/" === h[1]) {
                    if ((i = j.pop())[0] !== h[3]) throw new Error("Bad state: " + i.join("|"))
                } else if ("/" !== h[0].charAt(h[0].length - 2)) {
                    var Z = Nj(h[0]);
                    n["!autofilter"] = {ref: gp(Z.Range).replace(/\$/g, "")}, j.push([h[3], !0])
                }
                break;
            case"Name":
                break;
            case"ComponentOptions":
            case"DocumentProperties":
            case"CustomDocumentProperties":
            case"OfficeDocumentSettings":
            case"PivotTable":
            case"PivotCache":
            case"Names":
            case"MapInfo":
            case"PageBreaks":
            case"QueryTable":
            case"DataValidation":
            case"Sorting":
            case"Schema":
            case"data":
            case"ConditionalFormatting":
            case"SmartTagType":
            case"SmartTags":
            case"ExcelWorkbook":
            case"WorkbookOptions":
            case"WorksheetOptions":
                if ("/" === h[1]) {
                    if ((i = j.pop())[0] !== h[3]) throw new Error("Bad state: " + i.join("|"))
                } else "/" !== h[0].charAt(h[0].length - 2) && j.push([h[3], !0]);
                break;
            default:
                if (0 == j.length && "document" == h[3]) return Ok(e, c);
                if (0 == j.length && "UOF" == h[3]) return Ok(e, c);
                var $ = !0;
                switch (j[j.length - 1][0]) {
                    case"OfficeDocumentSettings":
                        switch (h[3]) {
                            case"AllowPNG":
                            case"RemovePersonalInformation":
                            case"DownloadComponents":
                            case"LocationOfComponents":
                            case"Colors":
                            case"Color":
                            case"Index":
                            case"RGB":
                            case"PixelsPerInch":
                            case"TargetScreenSize":
                            case"ReadOnlyRecommended":
                                break;
                            default:
                                $ = !1
                        }
                        break;
                    case"ComponentOptions":
                        switch (h[3]) {
                            case"Toolbar":
                            case"HideOfficeLogo":
                            case"SpreadsheetAutoFit":
                            case"Label":
                            case"Caption":
                            case"MaxHeight":
                            case"MaxWidth":
                            case"NextSheetNumber":
                                break;
                            default:
                                $ = !1
                        }
                        break;
                    case"ExcelWorkbook":
                        switch (h[3]) {
                            case"Date1904":
                                Q.WBProps.date1904 = !0;
                                break;
                            case"WindowHeight":
                            case"WindowWidth":
                            case"WindowTopX":
                            case"WindowTopY":
                            case"TabRatio":
                            case"ProtectStructure":
                            case"ProtectWindows":
                            case"ActiveSheet":
                            case"DisplayInkNotes":
                            case"FirstVisibleSheet":
                            case"SupBook":
                            case"SheetName":
                            case"SheetIndex":
                            case"SheetIndexFirst":
                            case"SheetIndexLast":
                            case"Dll":
                            case"AcceptLabelsInFormulas":
                            case"DoNotSaveLinkValues":
                            case"Iteration":
                            case"MaxIterations":
                            case"MaxChange":
                            case"Path":
                            case"Xct":
                            case"Count":
                            case"SelectedSheets":
                            case"Calculation":
                            case"Uncalced":
                            case"StartupPrompt":
                            case"Crn":
                            case"ExternName":
                            case"Formula":
                            case"ColFirst":
                            case"ColLast":
                            case"WantAdvise":
                            case"Boolean":
                            case"Error":
                            case"Text":
                            case"OLE":
                            case"NoAutoRecover":
                            case"PublishObjects":
                            case"DoNotCalculateBeforeSave":
                            case"Number":
                            case"RefModeR1C1":
                            case"EmbedSaveSmartTags":
                                break;
                            default:
                                $ = !1
                        }
                        break;
                    case"WorkbookOptions":
                        switch (h[3]) {
                            case"OWCVersion":
                            case"Height":
                            case"Width":
                                break;
                            default:
                                $ = !1
                        }
                        break;
                    case"WorksheetOptions":
                        switch (h[3]) {
                            case"Visible":
                                if ("/>" === h[0].slice(-2)) ; else if ("/" === h[1]) switch (e.slice(E, h.index)) {
                                    case"SheetHidden":
                                        R.Hidden = 1;
                                        break;
                                    case"SheetVeryHidden":
                                        R.Hidden = 2
                                } else E = h.index + h[0].length;
                                break;
                            case"Header":
                                n["!margins"] || Kh(n["!margins"] = {}, "xlml"), n["!margins"].header = P(h[0]).Margin;
                                break;
                            case"Footer":
                                n["!margins"] || Kh(n["!margins"] = {}, "xlml"), n["!margins"].footer = P(h[0]).Margin;
                                break;
                            case"PageMargins":
                                var _ = P(h[0]);
                                n["!margins"] || Kh(n["!margins"] = {}, "xlml"), _.Top && (n["!margins"].top = _.Top), _.Left && (n["!margins"].left = _.Left), _.Right && (n["!margins"].right = _.Right), _.Bottom && (n["!margins"].bottom = _.Bottom);
                                break;
                            case"DisplayRightToLeft":
                                Q.Views || (Q.Views = []), Q.Views[0] || (Q.Views[0] = {}), Q.Views[0].RTL = !0;
                                break;
                            case"Unsynced":
                            case"Print":
                            case"Panes":
                            case"Scale":
                            case"Pane":
                            case"Number":
                            case"Layout":
                            case"PageSetup":
                            case"Selected":
                            case"ProtectObjects":
                            case"EnableSelection":
                            case"ProtectScenarios":
                            case"ValidPrinterInfo":
                            case"HorizontalResolution":
                            case"VerticalResolution":
                            case"NumberofCopies":
                            case"ActiveRow":
                            case"ActiveCol":
                            case"ActivePane":
                            case"TopRowVisible":
                            case"TopRowBottomPane":
                            case"LeftColumnVisible":
                            case"LeftColumnRightPane":
                            case"FitToPage":
                            case"RangeSelection":
                            case"PaperSizeIndex":
                            case"PageLayoutZoom":
                            case"PageBreakZoom":
                            case"FilterOn":
                            case"DoNotDisplayGridlines":
                            case"SplitHorizontal":
                            case"SplitVertical":
                            case"FreezePanes":
                            case"FrozenNoSplit":
                            case"FitWidth":
                            case"FitHeight":
                            case"CommentsLayout":
                            case"Zoom":
                            case"LeftToRight":
                            case"Gridlines":
                            case"AllowSort":
                            case"AllowFilter":
                            case"AllowInsertRows":
                            case"AllowDeleteRows":
                            case"AllowInsertCols":
                            case"AllowDeleteCols":
                            case"AllowInsertHyperlinks":
                            case"AllowFormatCells":
                            case"AllowSizeCols":
                            case"AllowSizeRows":
                            case"NoSummaryRowsBelowDetail":
                            case"TabColorIndex":
                            case"DoNotDisplayHeadings":
                            case"ShowPageLayoutZoom":
                            case"NoSummaryColumnsRightDetail":
                            case"BlackAndWhite":
                            case"DoNotDisplayZeros":
                            case"DisplayPageBreak":
                            case"RowColHeadings":
                            case"DoNotDisplayOutline":
                            case"NoOrientation":
                            case"AllowUsePivotTables":
                            case"ZeroHeight":
                            case"ViewableRange":
                            case"Selection":
                            case"ProtectContents":
                                break;
                            default:
                                $ = !1
                        }
                        break;
                    case"PivotTable":
                    case"PivotCache":
                        switch (h[3]) {
                            case"ImmediateItemsOnDrop":
                            case"ShowPageMultipleItemLabel":
                            case"CompactRowIndent":
                            case"Location":
                            case"PivotField":
                            case"Orientation":
                            case"LayoutForm":
                            case"LayoutSubtotalLocation":
                            case"LayoutCompactRow":
                            case"Position":
                            case"PivotItem":
                            case"DataType":
                            case"DataField":
                            case"SourceName":
                            case"ParentField":
                            case"PTLineItems":
                            case"PTLineItem":
                            case"CountOfSameItems":
                            case"Item":
                            case"ItemType":
                            case"PTSource":
                            case"CacheIndex":
                            case"ConsolidationReference":
                            case"FileName":
                            case"Reference":
                            case"NoColumnGrand":
                            case"NoRowGrand":
                            case"BlankLineAfterItems":
                            case"Hidden":
                            case"Subtotal":
                            case"BaseField":
                            case"MapChildItems":
                            case"Function":
                            case"RefreshOnFileOpen":
                            case"PrintSetTitles":
                            case"MergeLabels":
                            case"DefaultVersion":
                            case"RefreshName":
                            case"RefreshDate":
                            case"RefreshDateCopy":
                            case"VersionLastRefresh":
                            case"VersionLastUpdate":
                            case"VersionUpdateableMin":
                            case"VersionRefreshableMin":
                            case"Calculation":
                                break;
                            default:
                                $ = !1
                        }
                        break;
                    case"PageBreaks":
                        switch (h[3]) {
                            case"ColBreaks":
                            case"ColBreak":
                            case"RowBreaks":
                            case"RowBreak":
                            case"ColStart":
                            case"ColEnd":
                            case"RowEnd":
                                break;
                            default:
                                $ = !1
                        }
                        break;
                    case"AutoFilter":
                        switch (h[3]) {
                            case"AutoFilterColumn":
                            case"AutoFilterCondition":
                            case"AutoFilterAnd":
                            case"AutoFilterOr":
                                break;
                            default:
                                $ = !1
                        }
                        break;
                    case"QueryTable":
                        switch (h[3]) {
                            case"Id":
                            case"AutoFormatFont":
                            case"AutoFormatPattern":
                            case"QuerySource":
                            case"QueryType":
                            case"EnableRedirections":
                            case"RefreshedInXl9":
                            case"URLString":
                            case"HTMLTables":
                            case"Connection":
                            case"CommandText":
                            case"RefreshInfo":
                            case"NoTitles":
                            case"NextId":
                            case"ColumnInfo":
                            case"OverwriteCells":
                            case"DoNotPromptForFile":
                            case"TextWizardSettings":
                            case"Source":
                            case"Number":
                            case"Decimal":
                            case"ThousandSeparator":
                            case"TrailingMinusNumbers":
                            case"FormatSettings":
                            case"FieldType":
                            case"Delimiters":
                            case"Tab":
                            case"Comma":
                            case"AutoFormatName":
                            case"VersionLastEdit":
                            case"VersionLastRefresh":
                                break;
                            default:
                                $ = !1
                        }
                        break;
                    case"Sorting":
                    case"ConditionalFormatting":
                    case"DataValidation":
                        switch (h[3]) {
                            case"Range":
                            case"Type":
                            case"Min":
                            case"Max":
                            case"Sort":
                            case"Descending":
                            case"Order":
                            case"CaseSensitive":
                            case"Value":
                            case"ErrorStyle":
                            case"ErrorMessage":
                            case"ErrorTitle":
                            case"CellRangeList":
                            case"InputMessage":
                            case"InputTitle":
                            case"ComboHide":
                            case"InputHide":
                            case"Condition":
                            case"Qualifier":
                            case"UseBlank":
                            case"Value1":
                            case"Value2":
                            case"Format":
                                break;
                            default:
                                $ = !1
                        }
                        break;
                    case"MapInfo":
                    case"Schema":
                    case"data":
                        switch (h[3]) {
                            case"Map":
                            case"Entry":
                            case"Range":
                            case"XPath":
                            case"Field":
                            case"XSDType":
                            case"FilterOn":
                            case"Aggregate":
                            case"ElementType":
                            case"AttributeType":
                                break;
                            case"schema":
                            case"element":
                            case"complexType":
                            case"datatype":
                            case"all":
                            case"attribute":
                            case"extends":
                            case"row":
                                break;
                            default:
                                $ = !1
                        }
                        break;
                    case"SmartTags":
                        break;
                    default:
                        $ = !1
                }
                if ($) break;
                if (!j[j.length - 1][1]) throw"Unrecognized tag: " + h[3] + "|" + j.join("|");
                if ("CustomDocumentProperties" === j[j.length - 1][0]) {
                    if ("/>" === h[0].slice(-2)) break;
                    "/" === h[1] ? Qj(D, h[3], F, e.slice(E, h.index)) : (F = h, E = h.index + h[0].length);
                    break
                }
                if (c.WTF) throw"Unrecognized tag: " + h[3] + "|" + j.join("|")
        }
        var aa = {};
        return c.bookSheets || c.bookProps || (aa.Sheets = l), aa.SheetNames = m, aa.Workbook = Q, aa.SSF = Tl.get_table(), aa.Props = C, aa.Custprops = D, aa
    }

    function Xj(a, b) {
        switch (Eq(b = b || {}), b.type || "base64") {
            case"base64":
                return Wj(Ll.decode(a), b);
            case"binary":
            case"buffer":
            case"file":
                return Wj(a, b);
            case"array":
                return Wj(j(a), b)
        }
    }

    function Yj(a, b) {
        var c = [];
        return a.Props && c.push(Cb(a.Props, b)), a.Custprops && c.push(Db(a.Props, a.Custprops, b)), c.join("")
    }

    function Zj() {
        return ""
    }

    function $j(a, b) {
        var c = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
        return b.cellXfs.forEach(function (a, b) {
            var d = [];
            d.push(Z("NumberFormat", null, {"ss:Format": R(Tl._table[a.numFmtId])})), c.push(Z("Style", d.join(""), {"ss:ID": "s" + (21 + b)}))
        }), Z("Styles", c.join(""))
    }

    function _j(a) {
        return Z("NamedRange", null, {"ss:Name": a.Name, "ss:RefersTo": "=" + ip(a.Ref, {r: 0, c: 0})})
    }

    function ak(a) {
        if (!((a || {}).Workbook || {}).Names) return "";
        for (var b = a.Workbook.Names, c = [], d = 0; d < b.length; ++d) {
            var e = b[d];
            null == e.Sheet && (e.Name.match(/^_xlfn\./) || c.push(_j(e)))
        }
        return Z("Names", c.join(""))
    }

    function bk(a, b, c, d) {
        if (!a) return "";
        if (!((d || {}).Workbook || {}).Names) return "";
        for (var e = d.Workbook.Names, f = [], g = 0; g < e.length; ++g) {
            var h = e[g];
            h.Sheet == c && (h.Name.match(/^_xlfn\./) || f.push(_j(h)))
        }
        return f.join("")
    }

    function ck(a, b, c, d) {
        if (!a) return "";
        var e = [];
        if (a["!margins"] && (e.push("<PageSetup>"), a["!margins"].header && e.push(Z("Header", null, {"x:Margin": a["!margins"].header})), a["!margins"].footer && e.push(Z("Footer", null, {"x:Margin": a["!margins"].footer})), e.push(Z("PageMargins", null, {
            "x:Bottom": a["!margins"].bottom || "0.75",
            "x:Left": a["!margins"].left || "0.7",
            "x:Right": a["!margins"].right || "0.7",
            "x:Top": a["!margins"].top || "0.75"
        })), e.push("</PageSetup>")), d && d.Workbook && d.Workbook.Sheets && d.Workbook.Sheets[c]) if (d.Workbook.Sheets[c].Hidden) e.push(Z("Visible", 1 == d.Workbook.Sheets[c].Hidden ? "SheetHidden" : "SheetVeryHidden", {})); else {
            for (var f = 0; f < c && (!d.Workbook.Sheets[f] || d.Workbook.Sheets[f].Hidden); ++f) ;
            f == c && e.push("<Selected/>")
        }
        return ((((d || {}).Workbook || {}).Views || [])[0] || {}).RTL && e.push("<DisplayRightToLeft/>"), a["!protect"] && (e.push(X("ProtectContents", "True")), a["!protect"].objects && e.push(X("ProtectObjects", "True")), a["!protect"].scenarios && e.push(X("ProtectScenarios", "True")), null == a["!protect"].selectLockedCells || a["!protect"].selectLockedCells ? null == a["!protect"].selectUnlockedCells || a["!protect"].selectUnlockedCells || e.push(X("EnableSelection", "UnlockedCells")) : e.push(X("EnableSelection", "NoSelection")), [["formatCells", "AllowFormatCells"], ["formatColumns", "AllowSizeCols"], ["formatRows", "AllowSizeRows"], ["insertColumns", "AllowInsertCols"], ["insertRows", "AllowInsertRows"], ["insertHyperlinks", "AllowInsertHyperlinks"], ["deleteColumns", "AllowDeleteCols"], ["deleteRows", "AllowDeleteRows"], ["sort", "AllowSort"], ["autoFilter", "AllowFilter"], ["pivotTables", "AllowUsePivotTables"]].forEach(function (b) {
            a["!protect"][b[0]] && e.push("<" + b[1] + "/>")
        })), 0 == e.length ? "" : Z("WorksheetOptions", e.join(""), {xmlns: Hm.x})
    }

    function dk(a) {
        return a.map(function (a) {
            return Z("Comment", Z("ss:Data", sm(a.t || ""), {xmlns: "http://www.w3.org/TR/REC-html40"}), {"ss:Author": a.a})
        }).join("")
    }

    function ek(a, b, c, d, e, f, g) {
        if (!a || void 0 == a.v && void 0 == a.f) return "";
        var h = {};
        if (a.f && (h["ss:Formula"] = "=" + R(ip(a.f, g))), a.F && a.F.slice(0, b.length) == b) {
            var i = za(a.F.slice(b.length + 1));
            h["ss:ArrayRange"] = "RC:R" + (i.r == g.r ? "" : "[" + (i.r - g.r) + "]") + "C" + (i.c == g.c ? "" : "[" + (i.c - g.c) + "]")
        }
        if (a.l && a.l.Target && (h["ss:HRef"] = R(a.l.Target), a.l.Tooltip && (h["x:HRefScreenTip"] = R(a.l.Tooltip))), c["!merges"]) for (var j = c["!merges"], k = 0; k != j.length; ++k) j[k].s.c == g.c && j[k].s.r == g.r && (j[k].e.c > j[k].s.c && (h["ss:MergeAcross"] = j[k].e.c - j[k].s.c), j[k].e.r > j[k].s.r && (h["ss:MergeDown"] = j[k].e.r - j[k].s.r));
        var l = "", m = "";
        switch (a.t) {
            case"z":
                return "";
            case"n":
                l = "Number", m = String(a.v);
                break;
            case"b":
                l = "Boolean", m = a.v ? "1" : "0";
                break;
            case"e":
                l = "Error", m = sn[a.v];
                break;
            case"d":
                l = "DateTime", m = new Date(a.v).toISOString(), null == a.z && (a.z = a.z || Tl._table[14]);
                break;
            case"s":
                l = "String", m = U(a.v || "")
        }
        var n = Lh(d.cellXfs, a, d);
        h["ss:StyleID"] = "s" + (21 + n), h["ss:Index"] = g.c + 1;
        var o = null != a.v ? m : "", p = '<Data ss:Type="' + l + '">' + o + "</Data>";
        return (a.c || []).length > 0 && (p += dk(a.c)), Z("Cell", p, h)
    }

    function fk(a, b) {
        var c = '<Row ss:Index="' + (a + 1) + '"';
        return b && (b.hpt && !b.hpx && (b.hpx = Ve(b.hpt)), b.hpx && (c += ' ss:AutoFitHeight="0" ss:Height="' + b.hpx + '"'), b.hidden && (c += ' ss:Hidden="1"')), c + ">"
    }

    function gk(a, b, c, d) {
        if (!a["!ref"]) return "";
        var e = Da(a["!ref"]), f = a["!merges"] || [], g = 0, h = [];
        a["!cols"] && a["!cols"].forEach(function (a, b) {
            Te(a);
            var c = !!a.width, d = Jh(b, a), e = {"ss:Index": b + 1};
            c && (e["ss:Width"] = Oe(d.width)), a.hidden && (e["ss:Hidden"] = "1"), h.push(Z("Column", null, e))
        });
        for (var i = Array.isArray(a), j = e.s.r; j <= e.e.r; ++j) {
            for (var k = [fk(j, (a["!rows"] || [])[j])], l = e.s.c; l <= e.e.c; ++l) {
                var m = !1;
                for (g = 0; g != f.length; ++g) if (!(f[g].s.c > l || f[g].s.r > j || f[g].e.c < l || f[g].e.r < j)) {
                    f[g].s.c == l && f[g].s.r == j || (m = !0);
                    break
                }
                if (!m) {
                    var n = {r: j, c: l}, o = Aa(n), p = i ? (a[j] || [])[l] : a[o];
                    k.push(ek(p, o, a, b, c, d, n))
                }
            }
            k.push("</Row>"), k.length > 2 && h.push(k.join(""))
        }
        return h.join("")
    }

    function hk(a, b, c) {
        var d = [], e = c.SheetNames[a], f = c.Sheets[e], g = f ? bk(f, b, a, c) : "";
        return g.length > 0 && d.push("<Names>" + g + "</Names>"), g = f ? gk(f, b, a, c) : "", g.length > 0 && d.push("<Table>" + g + "</Table>"), d.push(ck(f, b, a, c)), d.join("")
    }

    function ik(a, b) {
        b || (b = {}), a.SSF || (a.SSF = Tl.get_table()), a.SSF && (Ul(Tl), Tl.load_table(a.SSF), b.revssf = u(a.SSF), b.revssf[a.SSF[65535]] = 0, b.ssf = a.SSF, b.cellXfs = [], Lh(b.cellXfs, {}, {revssf: {General: 0}}));
        var c = [];
        c.push(Yj(a, b)), c.push(Zj(a, b)), c.push(""), c.push("");
        for (var d = 0; d < a.SheetNames.length; ++d) c.push(Z("Worksheet", hk(d, b, a), {"ss:Name": R(a.SheetNames[d])}));
        return c[2] = $j(a, b), c[3] = ak(a, b), gm + Z("Workbook", c.join(""), {
            xmlns: Hm.ss,
            "xmlns:o": Hm.o,
            "xmlns:x": Hm.x,
            "xmlns:ss": Hm.ss,
            "xmlns:dt": Hm.dt,
            "xmlns:html": Hm.html
        })
    }

    function jk(a) {
        var b = {}, c = a.content;
        if (c.l = 28, b.AnsiUserType = c.read_shift(0, "lpstr-ansi"), b.AnsiClipboardFormat = eb(c), c.length - c.l <= 4) return b;
        var d = c.read_shift(4);
        return 0 == d || d > 40 ? b : (c.l -= 4, b.Reserved1 = c.read_shift(0, "lpstr-ansi"), c.length - c.l <= 4 ? b : 1907505652 !== (d = c.read_shift(4)) ? b : (b.UnicodeClipboardFormat = fb(c), 0 == (d = c.read_shift(4)) || d > 40 ? b : (c.l -= 4, void (b.Reserved2 = c.read_shift(0, "lpwstr")))))
    }

    function kk(a, b, c, d) {
        var e = c, f = [], g = b.slice(b.l, b.l + e);
        if (d && d.enc && d.enc.insitu) switch (a.n) {
            case"BOF":
            case"FilePass":
            case"FileLock":
            case"InterfaceHdr":
            case"RRDInfo":
            case"RRDHead":
            case"UsrExcl":
                break;
            default:
                if (0 === g.length) break;
                d.enc.insitu(g)
        }
        f.push(g), b.l += e;
        for (var h = pq[an(b, b.l)], i = 0; null != h && "Continue" === h.n.slice(0, 8);) e = an(b, b.l + 2), i = b.l + 4, "ContinueFrt" == h.n ? i += 4 : "ContinueFrt" == h.n.slice(0, 11) && (i += 12), f.push(b.slice(i, b.l + 4 + e)), b.l += 4 + e, h = pq[an(b, b.l)];
        var j = Ql(f);
        ga(j, 0);
        var k = 0;
        j.lens = [];
        for (var l = 0; l < f.length; ++l) j.lens.push(k), k += f[l].length;
        return a.f(j, j.length, d)
    }

    function lk(a, b, c) {
        if ("z" !== a.t && a.XF) {
            var d = 0;
            try {
                d = a.z || a.XF.numFmtId || 0, b.cellNF && (a.z = Tl._table[d])
            } catch (a) {
                if (b.WTF) throw a
            }
            if (!b || !1 !== b.cellText) try {
                "e" === a.t ? a.w = a.w || sn[a.v] : 0 === d || "General" == d ? "n" === a.t ? (0 | a.v) === a.v ? a.w = Tl._general_int(a.v) : a.w = Tl._general_num(a.v) : a.w = Tl._general(a.v) : a.w = Tl.format(d, a.v, {date1904: !!c})
            } catch (a) {
                if (b.WTF) throw a
            }
            if (b.cellDates && d && "n" == a.t && Tl.is_date(Tl._table[d] || String(d))) {
                var e = Tl.parse_date_code(a.v);
                e && (a.t = "d", a.v = new Date(e.y, e.m - 1, e.d, e.H, e.M, e.S, e.u))
            }
        }
    }

    function mk(a, b, c) {
        return {v: a, ixfe: b, t: c}
    }

    function nk(a, b) {
        var c = {opts: {}}, d = {};
        null != Jl && null == b.dense && (b.dense = Jl);
        var e, f, g, h, i, j, k, l = b.dense ? [] : {}, m = {}, n = {}, o = null, p = [], q = "", s = {}, t = "",
            u = {}, v = [], w = !0, x = [], y = [], z = {Sheets: [], WBProps: {date1904: !1}, Views: [{}]}, A = {},
            B = function (a) {
                return a < 8 ? On[a] : a < 64 ? y[a - 8] || On[a] : On[a]
            }, C = function (a, b, c) {
                var d = b.XF.data;
                if (d && d.patternType && c && c.cellStyles) {
                    b.s = {}, b.s.patternType = d.patternType;
                    var e;
                    (e = Ke(B(d.icvFore))) && (b.s.fgColor = {rgb: e}), (e = Ke(B(d.icvBack))) && (b.s.bgColor = {rgb: e})
                }
            }, D = function (a, b, c) {
                if (!(O > 1) && (c.sheetRows && a.r >= c.sheetRows && (w = !1), w)) {
                    if (c.cellStyles && b.XF && b.XF.data && C(a, b, c), delete b.ixfe, delete b.XF, e = a, t = Aa(a), n && n.s && n.e || (n = {
                        s: {
                            r: 0,
                            c: 0
                        }, e: {r: 0, c: 0}
                    }), a.r < n.s.r && (n.s.r = a.r), a.c < n.s.c && (n.s.c = a.c), a.r + 1 > n.e.r && (n.e.r = a.r + 1), a.c + 1 > n.e.c && (n.e.c = a.c + 1), c.cellFormula && b.f) for (var d = 0; d < v.length; ++d) if (!(v[d][0].s.c > a.c || v[d][0].s.r > a.r || v[d][0].e.c < a.c || v[d][0].e.r < a.r)) {
                        b.F = Ca(v[d][0]), v[d][0].s.c == a.c && v[d][0].s.r == a.r || delete b.f, b.f && (b.f = "" + wh(v[d][1], n, a, L, E));
                        break
                    }
                    c.dense ? (l[a.r] || (l[a.r] = []), l[a.r][a.c] = b) : l[t] = b
                }
            }, E = {
                enc: !1,
                sbcch: 0,
                snames: [],
                sharedf: u,
                arrayf: v,
                rrtabid: [],
                lastuser: "",
                biff: 8,
                codepage: 0,
                winlocked: 0,
                cellStyles: !!b && !!b.cellStyles,
                WTF: !!b && !!b.wtf
            };
        b.password && (E.password = b.password);
        var F, G = [], H = [], I = [], J = [], K = !1, L = [];
        L.SheetNames = E.snames, L.sharedf = E.sharedf, L.arrayf = E.arrayf, L.names = [], L.XTI = [];
        var M, N = "", O = 0, P = 0, Q = [], R = [];
        E.codepage = 1200, Gl(1200);
        for (var S = !1; a.l < a.length - 1;) {
            var T = a.l, U = a.read_shift(2);
            if (0 === U && "EOF" === N) break;
            var V = a.l === a.length ? 0 : a.read_shift(2), W = pq[U];
            if (W && W.f) {
                if (b.bookSheets && "BoundSheet8" === N && "BoundSheet8" !== W.n) break;
                if (N = W.n, 2 === W.r || 12 == W.r) {
                    var X = a.read_shift(2);
                    if (V -= 2, !E.enc && X !== U && ((255 & X) << 8 | X >> 8) !== U) throw new Error("rt mismatch: " + X + "!=" + U);
                    12 == W.r && (a.l += 10, V -= 10)
                }
                var Y;
                Y = "EOF" === W.n ? W.f(a, V, E) : kk(W, a, V, E);
                var Z = W.n;
                if (0 == O && "BOF" != Z) continue;
                switch (Z) {
                    case"Date1904":
                        c.opts.Date1904 = z.WBProps.date1904 = Y;
                        break;
                    case"WriteProtect":
                        c.opts.WriteProtect = !0;
                        break;
                    case"FilePass":
                        if (E.enc || (a.l = 0), E.enc = Y, !b.password) throw new Error("File is password-protected");
                        if (null == Y.valid) throw new Error("Encryption scheme unsupported");
                        if (!Y.valid) throw new Error("Password is incorrect");
                        break;
                    case"WriteAccess":
                        E.lastuser = Y;
                        break;
                    case"FileSharing":
                        break;
                    case"CodePage":
                        switch (Y) {
                            case 21010:
                                Y = 1200;
                                break;
                            case 32768:
                                Y = 1e4;
                                break;
                            case 32769:
                                Y = 1252
                        }
                        Gl(E.codepage = Y), S = !0;
                        break;
                    case"RRTabId":
                        E.rrtabid = Y;
                        break;
                    case"WinProtect":
                        E.winlocked = Y;
                        break;
                    case"Template":
                    case"BookBool":
                    case"UsesELFs":
                    case"MTRSettings":
                        break;
                    case"RefreshAll":
                    case"CalcCount":
                    case"CalcDelta":
                    case"CalcIter":
                    case"CalcMode":
                    case"CalcPrecision":
                    case"CalcSaveRecalc":
                        c.opts[Z] = Y;
                        break;
                    case"CalcRefMode":
                        E.CalcRefMode = Y;
                        break;
                    case"Uncalced":
                        break;
                    case"ForceFullCalculation":
                        c.opts.FullCalc = Y;
                        break;
                    case"WsBool":
                        Y.fDialog && (l["!type"] = "dialog");
                        break;
                    case"XF":
                        x.push(Y);
                        break;
                    case"ExtSST":
                    case"BookExt":
                    case"RichTextStream":
                    case"BkHim":
                        break;
                    case"SupBook":
                        L.push([Y]), L[L.length - 1].XTI = [];
                        break;
                    case"ExternName":
                        L[L.length - 1].push(Y);
                        break;
                    case"Index":
                        break;
                    case"Lbl":
                        M = {
                            Name: Y.Name,
                            Ref: wh(Y.rgce, n, null, L, E)
                        }, Y.itab > 0 && (M.Sheet = Y.itab - 1), L.names.push(M), L[0] || (L[0] = [], L[0].XTI = []), L[L.length - 1].push(Y), "_xlnm._FilterDatabase" == Y.Name && Y.itab > 0 && Y.rgce && Y.rgce[0] && Y.rgce[0][0] && "PtgArea3d" == Y.rgce[0][0][0] && (R[Y.itab - 1] = {ref: Ca(Y.rgce[0][0][1][2])});
                        break;
                    case"ExternCount":
                        E.ExternCount = Y;
                        break;
                    case"ExternSheet":
                        0 == L.length && (L[0] = [], L[0].XTI = []), L[L.length - 1].XTI = L[L.length - 1].XTI.concat(Y), L.XTI = L.XTI.concat(Y);
                        break;
                    case"NameCmt":
                        if (E.biff < 8) break;
                        null != M && (M.Comment = Y[1]);
                        break;
                    case"Protect":
                        l["!protect"] = Y;
                        break;
                    case"Password":
                        0 !== Y && E.WTF && console.error("Password verifier: " + Y);
                        break;
                    case"Prot4Rev":
                    case"Prot4RevPass":
                        break;
                    case"BoundSheet8":
                        m[Y.pos] = Y, E.snames.push(Y.name);
                        break;
                    case"EOF":
                        if (--O) break;
                        if (n.e) {
                            if (n.e.r > 0 && n.e.c > 0) {
                                if (n.e.r--, n.e.c--, l["!ref"] = Ca(n), b.sheetRows && b.sheetRows <= n.e.r) {
                                    var $ = n.e.r;
                                    n.e.r = b.sheetRows - 1, l["!fullref"] = l["!ref"], l["!ref"] = Ca(n), n.e.r = $
                                }
                                n.e.r++, n.e.c++
                            }
                            G.length > 0 && (l["!merges"] = G), H.length > 0 && (l["!objects"] = H), I.length > 0 && (l["!cols"] = I), J.length > 0 && (l["!rows"] = J), z.Sheets.push(A)
                        }
                        "" === q ? s = l : d[q] = l, l = b.dense ? [] : {};
                        break;
                    case"BOF":
                        if (8 === E.biff && (E.biff = {9: 2, 521: 3, 1033: 4}[U] || {
                            512: 2,
                            768: 3,
                            1024: 4,
                            1280: 5,
                            1536: 8,
                            2: 2,
                            7: 2
                        }[Y.BIFFVer] || 8), 8 == E.biff && 0 == Y.BIFFVer && 16 == Y.dt && (E.biff = 2), O++) break;
                        if (w = !0, l = b.dense ? [] : {}, E.biff < 8 && !S && (S = !0, Gl(E.codepage = b.codepage || 1252)), E.biff < 5) {
                            "" === q && (q = "Sheet1"), n = {s: {r: 0, c: 0}, e: {r: 0, c: 0}};
                            var _ = {pos: a.l - V, name: q};
                            m[_.pos] = _, E.snames.push(q)
                        } else q = (m[T] || {name: ""}).name;
                        32 == Y.dt && (l["!type"] = "chart"), 64 == Y.dt && (l["!type"] = "macro"), G = [], H = [], E.arrayf = v = [], I = [], J = [], 0, K = !1, A = {
                            Hidden: (m[T] || {hs: 0}).hs,
                            name: q
                        };
                        break;
                    case"Number":
                    case"BIFF2NUM":
                    case"BIFF2INT":
                        "chart" == l["!type"] && (b.dense ? (l[Y.r] || [])[Y.c] : l[Aa({
                            c: Y.c,
                            r: Y.r
                        })]) && ++Y.c, j = {
                            ixfe: Y.ixfe,
                            XF: x[Y.ixfe] || {},
                            v: Y.val,
                            t: "n"
                        }, P > 0 && (j.z = Q[j.ixfe >> 8 & 31]), lk(j, b, c.opts.Date1904), D({c: Y.c, r: Y.r}, j, b);
                        break;
                    case"BoolErr":
                        j = {
                            ixfe: Y.ixfe,
                            XF: x[Y.ixfe],
                            v: Y.val,
                            t: Y.t
                        }, P > 0 && (j.z = Q[j.ixfe >> 8 & 31]), lk(j, b, c.opts.Date1904), D({c: Y.c, r: Y.r}, j, b);
                        break;
                    case"RK":
                        j = {
                            ixfe: Y.ixfe,
                            XF: x[Y.ixfe],
                            v: Y.rknum,
                            t: "n"
                        }, P > 0 && (j.z = Q[j.ixfe >> 8 & 31]), lk(j, b, c.opts.Date1904), D({c: Y.c, r: Y.r}, j, b);
                        break;
                    case"MulRk":
                        for (var aa = Y.c; aa <= Y.C; ++aa) {
                            var ba = Y.rkrec[aa - Y.c][0];
                            j = {
                                ixfe: ba,
                                XF: x[ba],
                                v: Y.rkrec[aa - Y.c][1],
                                t: "n"
                            }, P > 0 && (j.z = Q[j.ixfe >> 8 & 31]), lk(j, b, c.opts.Date1904), D({c: aa, r: Y.r}, j, b)
                        }
                        break;
                    case"Formula":
                        if ("String" == Y.val) {
                            o = Y;
                            break
                        }
                        if (j = mk(Y.val, Y.cell.ixfe, Y.tt), j.XF = x[j.ixfe], b.cellFormula) {
                            var ca = Y.formula;
                            if (ca && ca[0] && ca[0][0] && "PtgExp" == ca[0][0][0]) {
                                var da = ca[0][0][1][0], ea = ca[0][0][1][1], fa = Aa({r: da, c: ea});
                                u[fa] ? j.f = "" + wh(Y.formula, n, Y.cell, L, E) : j.F = ((b.dense ? (l[da] || [])[ea] : l[fa]) || {}).F
                            } else j.f = "" + wh(Y.formula, n, Y.cell, L, E)
                        }
                        P > 0 && (j.z = Q[j.ixfe >> 8 & 31]), lk(j, b, c.opts.Date1904), D(Y.cell, j, b), o = Y;
                        break;
                    case"String":
                        if (!o) throw new Error("String record expects Formula");
                        o.val = Y, j = mk(Y, o.cell.ixfe, "s"), j.XF = x[j.ixfe], b.cellFormula && (j.f = "" + wh(o.formula, n, o.cell, L, E)), P > 0 && (j.z = Q[j.ixfe >> 8 & 31]), lk(j, b, c.opts.Date1904), D(o.cell, j, b), o = null;
                        break;
                    case"Array":
                        v.push(Y);
                        var ga = Aa(Y[0].s);
                        if (f = b.dense ? (l[Y[0].s.r] || [])[Y[0].s.c] : l[ga], b.cellFormula && f) {
                            if (!o) break;
                            if (!ga || !f) break;
                            f.f = "" + wh(Y[1], n, Y[0], L, E), f.F = Ca(Y[0])
                        }
                        break;
                    case"ShrFmla":
                        if (!w) break;
                        if (!b.cellFormula) break;
                        if (t) {
                            if (!o) break;
                            u[Aa(o.cell)] = Y[0], f = b.dense ? (l[o.cell.r] || [])[o.cell.c] : l[Aa(o.cell)], (f || {}).f = "" + wh(Y[0], n, e, L, E)
                        }
                        break;
                    case"LabelSst":
                        j = mk(p[Y.isst].t, Y.ixfe, "s"), j.XF = x[j.ixfe], P > 0 && (j.z = Q[j.ixfe >> 8 & 31]), lk(j, b, c.opts.Date1904), D({
                            c: Y.c,
                            r: Y.r
                        }, j, b);
                        break;
                    case"Blank":
                        b.sheetStubs && (j = {
                            ixfe: Y.ixfe,
                            XF: x[Y.ixfe],
                            t: "z"
                        }, P > 0 && (j.z = Q[j.ixfe >> 8 & 31]), lk(j, b, c.opts.Date1904), D({c: Y.c, r: Y.r}, j, b));
                        break;
                    case"MulBlank":
                        if (b.sheetStubs) for (var ha = Y.c; ha <= Y.C; ++ha) {
                            var ia = Y.ixfe[ha - Y.c];
                            j = {
                                ixfe: ia,
                                XF: x[ia],
                                t: "z"
                            }, P > 0 && (j.z = Q[j.ixfe >> 8 & 31]), lk(j, b, c.opts.Date1904), D({c: ha, r: Y.r}, j, b)
                        }
                        break;
                    case"RString":
                    case"Label":
                    case"BIFF2STR":
                        j = mk(Y.val, Y.ixfe, "s"), j.XF = x[j.ixfe], P > 0 && (j.z = Q[j.ixfe >> 8 & 31]), lk(j, b, c.opts.Date1904), D({
                            c: Y.c,
                            r: Y.r
                        }, j, b);
                        break;
                    case"Dimensions":
                        1 === O && (n = Y);
                        break;
                    case"SST":
                        p = Y;
                        break;
                    case"Format":
                        if (4 == E.biff) {
                            Q[P++] = Y[1];
                            for (var ja = 0; ja < P + 163 && Tl._table[ja] != Y[1]; ++ja) ;
                            ja >= 163 && Tl.load(Y[1], P + 163)
                        } else Tl.load(Y[1], Y[0]);
                        break;
                    case"BIFF2FORMAT":
                        Q[P++] = Y;
                        for (var ka = 0; ka < P + 163 && Tl._table[ka] != Y; ++ka) ;
                        ka >= 163 && Tl.load(Y, P + 163);
                        break;
                    case"MergeCells":
                        G = G.concat(Y);
                        break;
                    case"Obj":
                        H[Y.cmo[0]] = E.lastobj = Y;
                        break;
                    case"TxO":
                        E.lastobj.TxO = Y;
                        break;
                    case"ImData":
                        E.lastobj.ImData = Y;
                        break;
                    case"HLink":
                        for (i = Y[0].s.r; i <= Y[0].e.r; ++i) for (h = Y[0].s.c; h <= Y[0].e.c; ++h) (f = b.dense ? (l[i] || [])[h] : l[Aa({
                            c: h,
                            r: i
                        })]) && (f.l = Y[1]);
                        break;
                    case"HLinkTooltip":
                        for (i = Y[0].s.r; i <= Y[0].e.r; ++i) for (h = Y[0].s.c; h <= Y[0].e.c; ++h) (f = b.dense ? (l[i] || [])[h] : l[Aa({
                            c: h,
                            r: i
                        })]) && f.l && (f.l.Tooltip = Y[1]);
                        break;
                    case"Note":
                        if (E.biff <= 5 && E.biff >= 2) break;
                        f = b.dense ? (l[Y[0].r] || [])[Y[0].c] : l[Aa(Y[0])];
                        var la = H[Y[2]];
                        if (!f) break;
                        f.c || (f.c = []), g = {a: Y[1], t: la.TxO.t}, f.c.push(g);
                        break;
                    default:
                        switch (W.n) {
                            case"ClrtClient":
                                break;
                            case"XFExt":
                                Nf(x[Y.ixfe], Y.ext);
                                break;
                            case"DefColWidth":
                                Y;
                                break;
                            case"DefaultRowHeight":
                                Y[1];
                                break;
                            case"ColInfo":
                                if (!E.cellStyles) break;
                                for (; Y.e >= Y.s;) I[Y.e--] = {width: Y.w / 256}, K || (K = !0, Se(Y.w / 256)), Te(I[Y.e + 1]);
                                break;
                            case"Row":
                                var ma = {};
                                null != Y.level && (J[Y.r] = ma, ma.level = Y.level), Y.hidden && (J[Y.r] = ma, ma.hidden = !0), Y.hpt && (J[Y.r] = ma, ma.hpt = Y.hpt, ma.hpx = Ve(Y.hpt));
                                break;
                            case"LeftMargin":
                            case"RightMargin":
                            case"TopMargin":
                            case"BottomMargin":
                                l["!margins"] || Kh(l["!margins"] = {}), l["!margins"][Z.slice(0, -6).toLowerCase()] = Y;
                                break;
                            case"Setup":
                                l["!margins"] || Kh(l["!margins"] = {}), l["!margins"].header = Y.header, l["!margins"].footer = Y.footer;
                                break;
                            case"Window2":
                                Y.RTL && (z.Views[0].RTL = !0);
                                break;
                            case"Header":
                            case"Footer":
                            case"HCenter":
                            case"VCenter":
                            case"Pls":
                            case"GCW":
                            case"LHRecord":
                            case"DBCell":
                            case"EntExU2":
                            case"SxView":
                            case"Sxvd":
                            case"SXVI":
                            case"SXVDEx":
                            case"SxIvd":
                            case"SXString":
                            case"Sync":
                            case"Addin":
                            case"SXDI":
                            case"SXLI":
                            case"SXEx":
                            case"QsiSXTag":
                            case"Selection":
                            case"Feat":
                                break;
                            case"FeatHdr":
                            case"FeatHdr11":
                                break;
                            case"Feature11":
                            case"Feature12":
                            case"List12":
                                break;
                            case"Country":
                                k = Y;
                                break;
                            case"RecalcId":
                            case"DxGCol":
                                break;
                            case"Fbi":
                            case"Fbi2":
                            case"GelFrame":
                            case"Font":
                            case"XFCRC":
                            case"Style":
                            case"StyleExt":
                                break;
                            case"Palette":
                                y = Y;
                                break;
                            case"Theme":
                                F = Y;
                                break;
                            case"ScenarioProtect":
                            case"ObjProtect":
                            case"CondFmt12":
                            case"Table":
                            case"TableStyles":
                            case"TableStyle":
                            case"TableStyleElement":
                            case"SXStreamID":
                            case"SXVS":
                            case"DConRef":
                            case"SXAddl":
                            case"DConBin":
                            case"DConName":
                            case"SXPI":
                            case"SxFormat":
                            case"SxSelect":
                            case"SxRule":
                            case"SxFilt":
                            case"SxItm":
                            case"SxDXF":
                            case"ScenMan":
                            case"DCon":
                            case"CellWatch":
                            case"PrintRowCol":
                            case"PrintGrid":
                            case"PrintSize":
                            case"XCT":
                            case"CRN":
                            case"Scl":
                            case"SheetExt":
                            case"SheetExtOptional":
                            case"ObNoMacros":
                            case"ObProj":
                                break;
                            case"CodeName":
                                q ? A.CodeName = Y || A.name : z.WBProps.CodeName = Y || "ThisWorkbook";
                                break;
                            case"GUIDTypeLib":
                            case"WOpt":
                            case"PhoneticInfo":
                            case"OleObjectSize":
                                break;
                            case"DXF":
                            case"DXFN":
                            case"DXFN12":
                            case"DXFN12List":
                            case"DXFN12NoCB":
                                break;
                            case"Dv":
                            case"DVal":
                                break;
                            case"BRAI":
                            case"Series":
                            case"SeriesText":
                            case"DConn":
                            case"DbOrParamQry":
                            case"DBQueryExt":
                            case"OleDbConn":
                            case"ExtString":
                            case"IFmtRecord":
                                break;
                            case"CondFmt":
                            case"CF":
                            case"CF12":
                            case"CFEx":
                            case"Excel9File":
                            case"Units":
                                break;
                            case"InterfaceHdr":
                            case"Mms":
                            case"InterfaceEnd":
                            case"DSF":
                            case"BuiltInFnGroupCount":
                                break;
                            case"Window1":
                            case"HideObj":
                            case"GridSet":
                            case"Guts":
                            case"UserBView":
                            case"UserSViewBegin":
                            case"UserSViewEnd":
                            case"Pane":
                                break;
                            default:
                                switch (W.n) {
                                    case"Dat":
                                    case"Begin":
                                    case"End":
                                    case"StartBlock":
                                    case"EndBlock":
                                    case"Frame":
                                    case"Area":
                                    case"Axis":
                                    case"AxisLine":
                                    case"Tick":
                                        break;
                                    case"AxesUsed":
                                    case"CrtLayout12":
                                    case"CrtLayout12A":
                                    case"CrtLink":
                                    case"CrtLine":
                                    case"CrtMlFrt":
                                    case"CrtMlFrtContinue":
                                        break;
                                    case"LineFormat":
                                    case"AreaFormat":
                                    case"Chart":
                                    case"Chart3d":
                                    case"Chart3DBarShape":
                                    case"ChartFormat":
                                    case"ChartFrtInfo":
                                        break;
                                    case"PlotArea":
                                    case"PlotGrowth":
                                        break;
                                    case"SeriesList":
                                    case"SerParent":
                                    case"SerAuxTrend":
                                        break;
                                    case"DataFormat":
                                    case"SerToCrt":
                                    case"FontX":
                                        break;
                                    case"CatSerRange":
                                    case"AxcExt":
                                    case"SerFmt":
                                    case"ShtProps":
                                        break;
                                    case"DefaultText":
                                    case"Text":
                                    case"CatLab":
                                    case"DataLabExtContents":
                                        break;
                                    case"Legend":
                                    case"LegendException":
                                        break;
                                    case"Pie":
                                    case"Scatter":
                                        break;
                                    case"PieFormat":
                                    case"MarkerFormat":
                                        break;
                                    case"StartObject":
                                    case"EndObject":
                                        break;
                                    case"AlRuns":
                                    case"ObjectLink":
                                    case"SIIndex":
                                        break;
                                    case"AttachedLabel":
                                    case"YMult":
                                        break;
                                    case"Line":
                                    case"Bar":
                                    case"Surf":
                                    case"AxisParent":
                                    case"Pos":
                                    case"ValueRange":
                                    case"SXViewEx9":
                                    case"SXViewLink":
                                    case"PivotChartBits":
                                    case"SBaseRef":
                                    case"TextPropsStream":
                                    case"LnExt":
                                    case"MkrExt":
                                    case"CrtCoopt":
                                        break;
                                    case"Qsi":
                                    case"Qsif":
                                    case"Qsir":
                                    case"QsiSXTag":
                                    case"TxtQry":
                                    case"FilterMode":
                                        break;
                                    case"AutoFilter":
                                    case"AutoFilterInfo":
                                    case"AutoFilter12":
                                    case"DropDownObjIds":
                                    case"Sort":
                                    case"SortData":
                                    case"ShapePropsStream":
                                        break;
                                    case"MsoDrawing":
                                    case"MsoDrawingGroup":
                                    case"MsoDrawingSelection":
                                        break;
                                    case"WebPub":
                                    case"AutoWebPub":
                                        break;
                                    case"HeaderFooter":
                                    case"HFPicture":
                                    case"PLV":
                                    case"HorizontalPageBreaks":
                                    case"VerticalPageBreaks":
                                        break;
                                    case"Backup":
                                    case"CompressPictures":
                                    case"Compat12":
                                        break;
                                    case"Continue":
                                    case"ContinueFrt12":
                                        break;
                                    case"FrtFontList":
                                    case"FrtWrapper":
                                        break;
                                    default:
                                        switch (W.n) {
                                            case"TabIdConf":
                                            case"Radar":
                                            case"RadarArea":
                                            case"DropBar":
                                            case"Intl":
                                            case"CoordList":
                                            case"SerAuxErrBar":
                                                break;
                                            case"BIFF2FONTCLR":
                                            case"BIFF2FMTCNT":
                                            case"BIFF2FONTXTRA":
                                                break;
                                            case"BIFF2XF":
                                            case"BIFF3XF":
                                            case"BIFF4XF":
                                                break;
                                            case"BIFF4FMTCNT":
                                            case"BIFF2ROW":
                                            case"BIFF2WINDOW2":
                                                break;
                                            case"SCENARIO":
                                            case"DConBin":
                                            case"PicF":
                                            case"DataLabExt":
                                            case"Lel":
                                            case"BopPop":
                                            case"BopPopCustom":
                                            case"RealTimeData":
                                            case"Name":
                                                break;
                                            case"LHNGraph":
                                            case"FnGroupName":
                                            case"AddMenu":
                                            case"LPr":
                                                break;
                                            case"ListObj":
                                            case"ListField":
                                            case"RRSort":
                                            case"BigName":
                                                break;
                                            case"ToolbarHdr":
                                            case"ToolbarEnd":
                                            case"DDEObjName":
                                            case"FRTArchId$":
                                                break;
                                            default:
                                                if (b.WTF) throw"Unrecognized Record " + W.n
                                        }
                                }
                        }
                }
            } else a.l += V
        }
        return c.SheetNames = r(m).sort(function (a, b) {
            return Number(a) - Number(b)
        }).map(function (a) {
            return m[a].name
        }), b.bookSheets || (c.Sheets = d), c.Sheets && R.forEach(function (a, b) {
            c.Sheets[c.SheetNames[b]]["!autofilter"] = a
        }), c.Preamble = s, c.Strings = p, c.SSF = Tl.get_table(), E.enc && (c.Encryption = E.enc), F && (c.Themes = F), c.Metadata = {}, void 0 !== k && (c.Metadata.Country = k), L.names.length > 0 && (z.Names = L.names), c.Workbook = z, c
    }

    function ok(a, b, c) {
        var d = $l.find(a, "!DocumentSummaryInformation");
        if (d && d.size > 0) try {
            var e = Yb(d, Hn, mq.DSI);
            for (var f in e) b[f] = e[f]
        } catch (a) {
            if (c.WTF) throw a
        }
        var g = $l.find(a, "!SummaryInformation");
        if (g && g.size > 0) try {
            var h = Yb(g, In, mq.SI);
            for (var i in h) null == b[i] && (b[i] = h[i])
        } catch (a) {
            if (c.WTF) throw a
        }
        b.HeadingPairs && b.TitlesOfParts && (wb(b.HeadingPairs, b.TitlesOfParts, b, c), delete b.HeadingPairs, delete b.TitlesOfParts)
    }

    function pk(a, b) {
        var c, d = [], e = [], f = [], g = 0;
        if (a.Props) for (c = r(a.Props), g = 0; g < c.length; ++g) (Kn.hasOwnProperty(c[g]) ? d : Ln.hasOwnProperty(c[g]) ? e : f).push([c[g], a.Props[c[g]]]);
        if (a.Custprops) for (c = r(a.Custprops), g = 0; g < c.length; ++g) (a.Props || {}).hasOwnProperty(c[g]) || (Kn.hasOwnProperty(c[g]) ? d : Ln.hasOwnProperty(c[g]) ? e : f).push([c[g], a.Custprops[c[g]]]);
        var h = [];
        for (g = 0; g < f.length; ++g) ho.indexOf(f[g][0]) > -1 || null != f[g][1] && h.push(f[g]);
        e.length && $l.utils.cfb_add(b, "/SummaryInformation", Zb(e, mq.SI, Ln, In)), (d.length || h.length) && $l.utils.cfb_add(b, "/DocumentSummaryInformation", Zb(d, mq.DSI, Kn, Hn, h.length ? h : null, mq.UDI))
    }

    function qk(a, b) {
        b || (b = {}), Eq(b), c(), b.codepage && Fl(b.codepage);
        var d, e;
        if (a.FullPaths) {
            if ($l.find(a, "/encryption")) throw new Error("File is password-protected");
            d = $l.find(a, "!CompObj"), e = $l.find(a, "/Workbook") || $l.find(a, "/Book")
        } else {
            switch (b.type) {
                case"base64":
                    a = Pl(Ll.decode(a));
                    break;
                case"binary":
                    a = Pl(a);
                    break;
                case"buffer":
                    break;
                case"array":
                    Array.isArray(a) || (a = Array.prototype.slice.call(a))
            }
            ga(a, 0), e = {content: a}
        }
        var f, g;
        if (d && jk(d), b.bookProps && !b.bookSheets) f = {}; else {
            var h = Ml ? "buffer" : "array";
            if (e && e.content) f = nk(e.content, b); else if ((g = $l.find(a, "PerfectOffice_MAIN")) && g.content) f = wo.to_workbook(g.content, (b.type = h, b)); else {
                if (!(g = $l.find(a, "NativeContent_MAIN")) || !g.content) throw new Error("Cannot find Workbook stream");
                f = wo.to_workbook(g.content, (b.type = h, b))
            }
            b.bookVBA && a.FullPaths && $l.find(a, "/_VBA_PROJECT_CUR/VBA/dir") && (f.vbaraw = cg(a))
        }
        var i = {};
        return a.FullPaths && ok(a, i, b), f.Props = f.Custprops = i, b.bookFiles && (f.cfb = a), f
    }

    function rk(a, b) {
        var c = b || {}, d = $l.utils.cfb_new({root: "R"}), e = "/Workbook";
        switch (c.bookType || "xls") {
            case"xls":
                c.bookType = "biff8";
            case"xla":
                c.bookType || (c.bookType = "xla");
            case"biff8":
                e = "/Workbook", c.biff = 8;
                break;
            case"biff5":
                e = "/Book", c.biff = 5;
                break;
            default:
                throw new Error("invalid type " + c.bookType + " for XLS CFB")
        }
        return $l.utils.cfb_add(d, e, Ik(a, c)), 8 == c.biff && (a.Props || a.Custprops) && pk(a, d), 8 == c.biff && a.vbaraw && dg(d, $l.read(a.vbaraw, {type: "string" == typeof a.vbaraw ? "binary" : "buffer"})), d
    }

    function sk(a, b, c, d) {
        var e = +b || +qq[b];
        if (!isNaN(e)) {
            var f = d || (c || []).length || 0, g = a.next(4);
            g.write_shift(2, e), g.write_shift(2, f), f > 0 && $m(c) && a.push(c)
        }
    }

    function tk(a, b, c) {
        return a || (a = ia(7)), a.write_shift(2, b), a.write_shift(2, c), a.write_shift(2, 0), a.write_shift(1, 0), a
    }

    function uk(a, b, c, d) {
        var e = ia(9);
        return tk(e, a, b), "e" == d ? (e.write_shift(1, c), e.write_shift(1, 1)) : (e.write_shift(1, c ? 1 : 0), e.write_shift(1, 0)), e
    }

    function vk(a, b, c) {
        var d = ia(8 + 2 * c.length);
        return tk(d, a, b), d.write_shift(1, c.length), d.write_shift(c.length, c, "sbcs"), d.l < d.length ? d.slice(0, d.l) : d
    }

    function wk(a, b, c, d) {
        if (null != b.v) switch (b.t) {
            case"d":
            case"n":
                var e = "d" == b.t ? w(z(b.v)) : b.v;
                return void (e == (0 | e) && e >= 0 && e < 65536 ? sk(a, 2, de(c, d, e)) : sk(a, 3, be(c, d, e)));
            case"b":
            case"e":
                return void sk(a, 5, uk(c, d, b.v, b.t));
            case"s":
            case"str":
                return void sk(a, 4, vk(c, d, b.v))
        }
        sk(a, 1, tk(null, c, d))
    }

    function xk(a, b, c, d) {
        var e, f = Array.isArray(b), g = Da(b["!ref"] || "A1"), h = "", i = [];
        if (g.e.c > 255 || g.e.r > 16383) {
            if (d.WTF) throw new Error("Range " + (b["!ref"] || "A1") + " exceeds format limit A1:IV16384");
            g.e.c = Math.min(g.e.c, 255), g.e.r = Math.min(g.e.c, 16383), e = Ca(g)
        }
        for (var j = g.s.r; j <= g.e.r; ++j) {
            h = ra(j);
            for (var k = g.s.c; k <= g.e.c; ++k) {
                j === g.s.r && (i[k] = va(k)), e = i[k] + h;
                var l = f ? (b[j] || [])[k] : b[e];
                l && wk(a, l, j, k, d)
            }
        }
    }

    function yk(a, b) {
        var c = b || {};
        null != Jl && null == c.dense && (c.dense = Jl);
        for (var d = ka(), e = 0, f = 0; f < a.SheetNames.length; ++f) a.SheetNames[f] == c.sheet && (e = f);
        if (0 == e && c.sheet && a.SheetNames[0] != c.sheet) throw new Error("Sheet not found: " + c.sheet);
        return sk(d, 9, Nc(a, 16, c)), xk(d, a.Sheets[a.SheetNames[e]], e, c, a), sk(d, 10), d.end()
    }

    function zk(a, b, c) {
        sk(a, "Font", dd({sz: 12, color: {theme: 1}, name: "Arial", family: 2, scheme: "minor"}, c))
    }

    function Ak(a, b, c) {
        b && [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function (d) {
            for (var e = d[0]; e <= d[1]; ++e) null != b[e] && sk(a, "Format", id(e, b[e], c))
        })
    }

    function Bk(a, b) {
        var c = ia(19);
        c.write_shift(4, 2151), c.write_shift(4, 0), c.write_shift(4, 0), c.write_shift(2, 3), c.write_shift(1, 1), c.write_shift(4, 0), sk(a, "FeatHdr", c), c = ia(39), c.write_shift(4, 2152), c.write_shift(4, 0), c.write_shift(4, 0), c.write_shift(2, 3), c.write_shift(1, 0), c.write_shift(4, 0), c.write_shift(2, 1), c.write_shift(4, 4), c.write_shift(2, 0), Fc(Da(b["!ref"] || "A1"), c), c.write_shift(4, 4), sk(a, "Feat", c)
    }

    function Ck(a, b) {
        for (var c = 0; c < 16; ++c) sk(a, "XF", qd({numFmtId: 0, style: !0}, 0, b));
        b.cellXfs.forEach(function (c) {
            sk(a, "XF", qd(c, 0, b))
        })
    }

    function Dk(a, b) {
        for (var c = 0; c < b["!links"].length; ++c) {
            var d = b["!links"][c];
            sk(a, "HLink", Od(d)), d[1].Tooltip && sk(a, "HLinkTooltip", Qd(d))
        }
        delete b["!links"]
    }

    function Ek(a, b, c, d, e) {
        var f = 16 + Lh(e.cellXfs, b, e);
        if (null != b.v) switch (b.t) {
            case"d":
            case"n":
                return void sk(a, "Number", wd(c, d, "d" == b.t ? w(z(b.v)) : b.v, f, e));
            case"b":
            case"e":
                return void sk(a, 517, ud(c, d, b.v, f, e, b.t));
            case"s":
            case"str":
                return void sk(a, "Label", gd(c, d, b.v, f, e))
        }
        sk(a, "Blank", yc(c, d, f))
    }

    function Fk(a, b, c) {
        var d, e = ka(), f = c.SheetNames[a], g = c.Sheets[f] || {}, h = (c || {}).Workbook || {},
            i = (h.Sheets || [])[a] || {}, j = Array.isArray(g), k = 8 == b.biff, l = "", m = [],
            n = Da(g["!ref"] || "A1"), o = k ? 65536 : 16384;
        if (n.e.c > 255 || n.e.r >= o) {
            if (b.WTF) throw new Error("Range " + (g["!ref"] || "A1") + " exceeds format limit A1:IV16384");
            n.e.c = Math.min(n.e.c, 255), n.e.r = Math.min(n.e.c, o - 1)
        }
        sk(e, 2057, Nc(c, 16, b)), sk(e, "CalcMode", ec(1)), sk(e, "CalcCount", ec(100)), sk(e, "CalcRefMode", cc(!0)), sk(e, "CalcIter", cc(!1)), sk(e, "CalcDelta", $a(.001)), sk(e, "CalcSaveRecalc", cc(!0)), sk(e, "PrintRowCol", cc(!1)), sk(e, "PrintGrid", cc(!1)), sk(e, "GridSet", ec(1)), sk(e, "Guts", sd([0, 0])), sk(e, "HCenter", cc(!1)), sk(e, "VCenter", cc(!1)), sk(e, 512, kd(n, b)), k && (g["!links"] = []);
        for (var p = n.s.r; p <= n.e.r; ++p) {
            l = ra(p);
            for (var q = n.s.c; q <= n.e.c; ++q) {
                p === n.s.r && (m[q] = va(q)), d = m[q] + l;
                var r = j ? (g[p] || [])[q] : g[d];
                r && (Ek(e, r, p, q, b), k && r.l && g["!links"].push([d, r.l]))
            }
        }
        var s = i.CodeName || i.name || f;
        return k && h.Views && sk(e, "Window2", bd(h.Views[0])), k && (g["!merges"] || []).length && sk(e, "MergeCells", Jd(g["!merges"])), k && Dk(e, g), sk(e, "CodeName", nc(s, b)), k && Bk(e, g), sk(e, "EOF"), e.end()
    }

    function Gk(a, b, c) {
        var d = ka(), e = (a || {}).Workbook || {}, f = e.Sheets || [], g = e.WBProps || {}, h = 8 == c.biff,
            i = 5 == c.biff;
        if (sk(d, 2057, Nc(a, 5, c)), "xla" == c.bookType && sk(d, "Addin"), sk(d, "InterfaceHdr", h ? ec(1200) : null), sk(d, "Mms", _b(2)), i && sk(d, "ToolbarHdr"), i && sk(d, "ToolbarEnd"), sk(d, "InterfaceEnd"), sk(d, "WriteAccess", Qc("SheetJS", c)), sk(d, "CodePage", ec(h ? 1200 : 1252)), h && sk(d, "DSF", ec(0)), h && sk(d, "Excel9File"), sk(d, "RRTabId", Zd(a.SheetNames.length)), h && a.vbaraw) {
            sk(d, "ObProj");
            sk(d, "CodeName", nc(g.CodeName || "ThisWorkbook", c))
        }
        sk(d, "BuiltInFnGroupCount", ec(17)), sk(d, "WinProtect", cc(!1)), sk(d, "Protect", cc(!1)), sk(d, "Password", ec(0)), h && sk(d, "Prot4Rev", cc(!1)), h && sk(d, "Prot4RevPass", ec(0)), sk(d, "Window1", _c(c)), sk(d, "Backup", cc(!1)), sk(d, "HideObj", ec(0)), sk(d, "Date1904", cc("true" == fj(a))), sk(d, "CalcPrecision", cc(!0)), h && sk(d, "RefreshAll", cc(!1)), sk(d, "BookBool", ec(0)), zk(d, a, c), Ak(d, a.SSF, c), Ck(d, c), h && sk(d, "UsesELFs", cc(!1));
        var j = d.end(), k = ka();
        h && sk(k, "Country", Sd()), sk(k, "EOF");
        var l = k.end(), m = ka(), n = 0, o = 0;
        for (o = 0; o < a.SheetNames.length; ++o) n += (h ? 12 : 11) + (h ? 2 : 1) * a.SheetNames[o].length;
        var p = j.length + n + l.length;
        for (o = 0; o < a.SheetNames.length; ++o) {
            sk(m, "BoundSheet8", Tc({
                pos: p,
                hs: (f[o] || {}).Hidden || 0,
                dt: 0,
                name: a.SheetNames[o]
            }, c)), p += b[o].length
        }
        var q = m.end();
        if (n != q.length) throw new Error("BS8 " + n + " != " + q.length);
        var r = [];
        return j.length && r.push(j), q.length && r.push(q), l.length && r.push(l), Im([r])
    }

    function Hk(a, b) {
        var c = b || {}, d = [];
        a && !a.SSF && (a.SSF = Tl.get_table()), a && a.SSF && (Ul(Tl), Tl.load_table(a.SSF), c.revssf = u(a.SSF), c.revssf[a.SSF[65535]] = 0, c.ssf = a.SSF), c.cellXfs = [], c.Strings = [], c.Strings.Count = 0, c.Strings.Unique = 0, Lh(c.cellXfs, {}, {revssf: {General: 0}});
        for (var e = 0; e < a.SheetNames.length; ++e) d[d.length] = Fk(e, c, a);
        return d.unshift(Gk(a, d, c)), Im([d])
    }

    function Ik(a, b) {
        var c = b || {};
        switch (c.biff || 2) {
            case 8:
            case 5:
                return Hk(a, b);
            case 4:
            case 3:
            case 2:
                return yk(a, b)
        }
        throw new Error("invalid type " + c.bookType + " for BIFF")
    }

    function Jk(a, b) {
        var c = b || {};
        null != Jl && (c.dense = Jl);
        for (var d, e, f, g, h = c.dense ? [] : {}, i = a.getElementsByTagName("tr"), j = c.sheetRows || 1e7, k = {
            s: {
                r: 0,
                c: 0
            }, e: {r: 0, c: 0}
        }, l = [], m = 0, n = [], o = 0, p = 0; o < i.length && p < j; ++o) {
            var q = i[o];
            if (Lk(q)) {
                if (c.display) continue;
                n[p] = {hidden: !0}
            }
            var r = q.children;
            for (d = e = 0; d < r.length; ++d) {
                var s = r[d];
                if (!c.display || !Lk(s)) {
                    var t = zm(s.innerHTML);
                    for (m = 0; m < l.length; ++m) {
                        var u = l[m];
                        u.s.c == e && u.s.r <= p && p <= u.e.r && (e = u.e.c + 1, m = -1)
                    }
                    g = +s.getAttribute("colspan") || 1, ((f = +s.getAttribute("rowspan")) > 0 || g > 1) && l.push({
                        s: {
                            r: p,
                            c: e
                        }, e: {r: p + (f || 1) - 1, c: e + g - 1}
                    });
                    var v = {t: "s", v: t}, x = s.getAttribute("t") || "";
                    null != t && (0 == t.length ? v.t = x || "z" : c.raw || 0 == t.trim().length || "s" == x || ("TRUE" === t ? v = {
                        t: "b",
                        v: !0
                    } : "FALSE" === t ? v = {t: "b", v: !1} : isNaN(D(t)) ? isNaN(E(t).getDate()) || (v = {
                        t: "d",
                        v: z(t)
                    }, c.cellDates || (v = {t: "n", v: w(v.v)}), v.z = c.dateNF || Tl._table[14]) : v = {
                        t: "n",
                        v: D(t)
                    })), c.dense ? (h[p] || (h[p] = []), h[p][e] = v) : h[Aa({
                        c: e,
                        r: p
                    })] = v, k.e.c < e && (k.e.c = e), e += g
                }
            }
            ++p
        }
        return l.length && (h["!merges"] = l), n.length && (h["!rows"] = n), k.e.r = p - 1, h["!ref"] = Ca(k), p >= j && (h["!fullref"] = Ca((k.e.r = i.length - o + p - 1, k))), h
    }

    function Kk(a, b) {
        return Ga(Jk(a, b), b)
    }

    function Lk(a) {
        var b = "", c = Mk(a);
        return c && (b = c(a).getPropertyValue("display")), b || (b = a.style.display), "none" === b
    }

    function Mk(a) {
        return a.ownerDocument.defaultView && "function" == typeof a.ownerDocument.defaultView.getComputedStyle ? a.ownerDocument.defaultView.getComputedStyle : "function" == typeof getComputedStyle ? getComputedStyle : null
    }

    function Nk(a, b) {
        b = b || {};
        var c = !!J(a, "objectdata");
        c && ob(L(a, "META-INF/manifest.xml"), b);
        var d = M(a, "content.xml");
        if (!d) throw new Error("Missing content.xml in " + (c ? "ODS" : "UOF") + " file");
        var e = sq(c ? d : tm(d), b);
        return J(a, "meta.xml") && (e.Props = tb(L(a, "meta.xml"))), e
    }

    function Ok(a, b) {
        return sq(a, b)
    }

    function Pk(a, b) {
        if ("fods" == b.bookType) return uq(a, b);
        var c = new dm, d = "", e = [], f = [];
        return d = "mimetype", c.file(d, "application/vnd.oasis.opendocument.spreadsheet"), d = "content.xml", c.file(d, uq(a, b)), e.push([d, "text/xml"]), f.push([d, "ContentFile"]), d = "styles.xml", c.file(d, tq(a, b)), e.push([d, "text/xml"]), f.push([d, "StylesFile"]), d = "meta.xml", c.file(d, Xn()), e.push([d, "text/xml"]), f.push([d, "MetadataFile"]), d = "manifest.rdf", c.file(d, sb(f)), e.push([d, "application/rdf+xml"]), d = "META-INF/manifest.xml", c.file(d, pb(e)), c
    }

    function Qk(a, b) {
        if (!b) return 0;
        var c = a.SheetNames.indexOf(b);
        if (-1 == c) throw new Error("Sheet not found: " + b);
        return c
    }

    function Rk(a) {
        return function (b, c) {
            var d = Qk(b, c.sheet);
            return a.from_sheet(b.Sheets[b.SheetNames[d]], c, b)
        }
    }

    function Sk(a) {
        return function (b) {
            for (var c = 0; c != a.length; ++c) {
                var d = a[c];
                void 0 === b[d[0]] && (b[d[0]] = d[1]), "n" === d[2] && (b[d[0]] = Number(b[d[0]]))
            }
        }
    }

    function Tk(a) {
        return Un.WS.indexOf(a) > -1 ? "sheet" : Un.CS && a == Un.CS ? "chart" : Un.DS && a == Un.DS ? "dialog" : Un.MS && a == Un.MS ? "macro" : a && a.length ? a : "sheet"
    }

    function Uk(a, b) {
        if (!a) return 0;
        try {
            a = b.map(function (b) {
                return b.id || (b.id = b.strRelID), [b.name, a["!id"][b.id].Target, Tk(a["!id"][b.id].Type)]
            })
        } catch (a) {
            return null
        }
        return a && 0 !== a.length ? a : null
    }

    function Vk(a, b, c, d, e, f, g, h, i, j, k, l) {
        try {
            f[d] = lb(M(a, c, !0), b);
            var m, n = L(a, b);
            switch (h) {
                case"sheet":
                    m = yj(n, b, e, i, f[d], j, k, l);
                    break;
                case"chart":
                    if (!(m = zj(n, b, e, i, f[d], j, k, l)) || !m["!chart"]) break;
                    var o = O(m["!chart"].Target, b), p = kb(o), q = Tf(M(a, o, !0), lb(M(a, p, !0), o)), r = O(q, o),
                        s = kb(r);
                    m = $i(M(a, r, !0), r, i, lb(M(a, s, !0), r), j, m);
                    break;
                case"macro":
                    m = Aj(n, b, e, i, f[d], j, k, l);
                    break;
                case"dialog":
                    m = Bj(n, b, e, i, f[d], j, k, l)
            }
            g[d] = m
        } catch (a) {
            if (i.WTF) throw a
        }
    }

    function Wk(a) {
        return "/" == a.charAt(0) ? a.slice(1) : a
    }

    function Xk(a, b) {
        if (Ul(Tl), b = b || {}, Eq(b), J(a, "META-INF/manifest.xml")) return Nk(a, b);
        if (J(a, "objectdata.xml")) return Nk(a, b);
        if (J(a, "Index/Document.iwa")) throw new Error("Unsupported NUMBERS file");
        var c, d, e = N(a), f = ib(M(a, "[Content_Types].xml")), g = !1;
        if (0 === f.workbooks.length && (d = "xl/workbook.xml", L(a, d, !0) && f.workbooks.push(d)), 0 === f.workbooks.length) {
            if (d = "xl/workbook.bin", !L(a, d, !0)) throw new Error("Could not find workbook");
            f.workbooks.push(d), g = !0
        }
        "bin" == f.workbooks[0].slice(-3) && (g = !0);
        var h = {}, i = {};
        if (!b.bookSheets && !b.bookProps) {
            if (Jp = [], f.sst) try {
                Jp = Ej(L(a, Wk(f.sst)), f.sst, b)
            } catch (a) {
                if (b.WTF) throw a
            }
            b.cellStyles && f.themes.length && (h = Dj(M(a, f.themes[0].replace(/^\//, ""), !0) || "", f.themes[0], b)), f.style && (i = Cj(L(a, Wk(f.style)), f.style, h, b))
        }
        f.links.map(function (c) {
            return Hj(L(a, Wk(c)), c, b)
        });
        var j = xj(L(a, Wk(f.workbooks[0])), f.workbooks[0], b), k = {}, l = "";
        f.coreprops.length && (l = L(a, Wk(f.coreprops[0]), !0), l && (k = tb(l)), 0 !== f.extprops.length && (l = L(a, Wk(f.extprops[0]), !0)) && xb(l, k, b));
        var m = {};
        b.bookSheets && !b.bookProps || 0 !== f.custprops.length && (l = M(a, Wk(f.custprops[0]), !0)) && (m = zb(l, b));
        var n = {};
        if ((b.bookSheets || b.bookProps) && (j.Sheets ? c = j.Sheets.map(function (a) {
            return a.name
        }) : k.Worksheets && k.SheetNames.length > 0 && (c = k.SheetNames), b.bookProps && (n.Props = k, n.Custprops = m), b.bookSheets && void 0 !== c && (n.SheetNames = c), b.bookSheets ? n.SheetNames : b.bookProps)) return n;
        c = {};
        var o = {};
        b.bookDeps && f.calcchain && (o = Gj(L(a, Wk(f.calcchain)), f.calcchain, b));
        var p, q, r = 0, s = {}, t = j.Sheets;
        k.Worksheets = t.length, k.SheetNames = [];
        for (var u = 0; u != t.length; ++u) k.SheetNames[u] = t[u].name;
        var v = g ? "bin" : "xml", w = f.workbooks[0].lastIndexOf("/"),
            x = (f.workbooks[0].slice(0, w + 1) + "_rels/" + f.workbooks[0].slice(w + 1) + ".rels").replace(/^\//, "");
        J(a, x) || (x = "xl/_rels/workbook." + v + ".rels");
        var y = lb(M(a, x, !0), x);
        y && (y = Uk(y, j.Sheets));
        var z = L(a, "xl/worksheets/sheet.xml", !0) ? 1 : 0;
        for (r = 0; r != k.Worksheets; ++r) {
            var A = "sheet";
            y && y[r] ? (p = "xl/" + y[r][1].replace(/[\/]?xl\//, ""), J(a, p) || (p = y[r][1]), J(a, p) || (p = x.replace(/_rels\/.*$/, "") + y[r][1]), A = y[r][2]) : (p = "xl/worksheets/sheet" + (r + 1 - z) + "." + v, p = p.replace(/sheet0\./, "sheet.")), q = p.replace(/^(.*)(\/)([^\/]*)$/, "$1/_rels/$3.rels"), Vk(a, p, q, k.SheetNames[r], r, s, c, A, b, j, h, i)
        }
        return f.comments && Vf(a, f.comments, c, s, b), n = {
            Directory: f,
            Workbook: j,
            Props: k,
            Custprops: m,
            Deps: o,
            Sheets: c,
            SheetNames: k.SheetNames,
            Strings: Jp,
            Styles: i,
            Themes: h,
            SSF: Tl.get_table()
        }, b.bookFiles && (n.keys = e, n.files = a.files), b.bookVBA && (f.vba.length > 0 ? n.vbaraw = L(a, Wk(f.vba[0]), !0) : f.defaults && f.defaults.bin === ep && (n.vbaraw = L(a, "xl/vbaProject.bin", !0))), n
    }

    function Yk(a, b) {
        var c = b || {}, d = "Workbook", e = $l.find(a, d);
        try {
            if (d = "/!DataSpaces/Version", !(e = $l.find(a, d)) || !e.content) throw new Error("ECMA-376 Encrypted file missing " + d);
            if (re(e.content), d = "/!DataSpaces/DataSpaceMap", !(e = $l.find(a, d)) || !e.content) throw new Error("ECMA-376 Encrypted file missing " + d);
            var f = te(e.content);
            if (1 !== f.length || 1 !== f[0].comps.length || 0 !== f[0].comps[0].t || "StrongEncryptionDataSpace" !== f[0].name || "EncryptedPackage" !== f[0].comps[0].v) throw new Error("ECMA-376 Encrypted file bad " + d);
            if (d = "/!DataSpaces/DataSpaceInfo/StrongEncryptionDataSpace", !(e = $l.find(a, d)) || !e.content) throw new Error("ECMA-376 Encrypted file missing " + d);
            var g = ue(e.content);
            if (1 != g.length || "StrongEncryptionTransform" != g[0]) throw new Error("ECMA-376 Encrypted file bad " + d);
            if (d = "/!DataSpaces/TransformInfo/StrongEncryptionTransform/!Primary", !(e = $l.find(a, d)) || !e.content) throw new Error("ECMA-376 Encrypted file missing " + d);
            we(e.content)
        } catch (a) {
        }
        if (d = "/EncryptionInfo", !(e = $l.find(a, d)) || !e.content) throw new Error("ECMA-376 Encrypted file missing " + d);
        var h = ze(e.content);
        if (d = "/EncryptedPackage", !(e = $l.find(a, d)) || !e.content) throw new Error("ECMA-376 Encrypted file missing " + d);
        if (4 == h[0] && "undefined" != typeof decrypt_agile) return decrypt_agile(h[1], e.content, c.password || "", c);
        if (2 == h[0] && "undefined" != typeof decrypt_std76) return decrypt_std76(h[1], e.content, c.password || "", c);
        throw new Error("File is password-protected")
    }

    function Zk(a, b) {
        if (bp = 1024, "ods" == b.bookType) return Pk(a, b);
        a && !a.SSF && (a.SSF = Tl.get_table()), a && a.SSF && (Ul(Tl), Tl.load_table(a.SSF), b.revssf = u(a.SSF), b.revssf[a.SSF[65535]] = 0, b.ssf = a.SSF), b.rels = {}, b.wbrels = {}, b.Strings = [], b.Strings.Count = 0, b.Strings.Unique = 0, Lp ? b.revStrings = new Map : (b.revStrings = {}, b.revStrings.foo = [], delete b.revStrings.foo);
        var c = "xlsb" == b.bookType ? "bin" : "xml", d = fp.indexOf(b.bookType) > -1, e = hb();
        Fq(b = b || {});
        var f = new dm, g = "", h = 0;
        if (b.cellXfs = [], Lh(b.cellXfs, {}, {revssf: {General: 0}}), a.Props || (a.Props = {}), g = "docProps/core.xml", f.file(g, vb(a.Props, b)), e.coreprops.push(g), nb(b.rels, 2, g, Un.CORE_PROPS), g = "docProps/app.xml", a.Props && a.Props.SheetNames) ; else if (a.Workbook && a.Workbook.Sheets) {
            for (var i = [], j = 0; j < a.SheetNames.length; ++j) 2 != (a.Workbook.Sheets[j] || {}).Hidden && i.push(a.SheetNames[j]);
            a.Props.SheetNames = i
        } else a.Props.SheetNames = a.SheetNames;
        for (a.Props.Worksheets = a.Props.SheetNames.length, f.file(g, yb(a.Props, b)), e.extprops.push(g), nb(b.rels, 3, g, Un.EXT_PROPS), a.Custprops !== a.Props && r(a.Custprops || {}).length > 0 && (g = "docProps/custom.xml", f.file(g, Ab(a.Custprops, b)), e.custprops.push(g), nb(b.rels, 4, g, Un.CUST_PROPS)), h = 1; h <= a.SheetNames.length; ++h) {
            var k = {"!id": {}}, l = a.Sheets[a.SheetNames[h - 1]];
            switch ((l || {})["!type"] || "sheet") {
                case"chart":
                default:
                    g = "xl/worksheets/sheet" + h + "." + c, f.file(g, Jj(h - 1, g, b, a, k)), e.sheets.push(g), nb(b.wbrels, -1, "worksheets/sheet" + h + "." + c, Un.WS[0])
            }
            if (l) {
                var m = l["!comments"], n = !1;
                if (m && m.length > 0) {
                    var o = "xl/comments" + h + "." + c;
                    f.file(o, Mj(m, o, b)), e.comments.push(o), nb(k, -1, "../comments" + h + "." + c, Un.CMNT), n = !0
                }
                l["!legacy"] && n && f.file("xl/drawings/vmlDrawing" + h + ".vml", Uf(h, l["!comments"])), delete l["!comments"], delete l["!legacy"]
            }
            k["!id"].rId1 && f.file(kb(g), mb(k))
        }
        return null != b.Strings && b.Strings.length > 0 && (g = "xl/sharedStrings." + c, f.file(g, Lj(b.Strings, g, b)), e.strs.push(g), nb(b.wbrels, -1, "sharedStrings." + c, Un.SST)), g = "xl/workbook." + c, f.file(g, Ij(a, g, b)), e.workbooks.push(g), nb(b.rels, 1, g, Un.WB), g = "xl/theme/theme1.xml", f.file(g, Ff(a.Themes, b)), e.themes.push(g), nb(b.wbrels, -1, "theme/theme1.xml", Un.THEME), g = "xl/styles." + c, f.file(g, Kj(a, g, b)), e.styles.push(g), nb(b.wbrels, -1, "styles." + c, Un.STY), a.vbaraw && d && (g = "xl/vbaProject.bin", f.file(g, a.vbaraw), e.vba.push(g), nb(b.wbrels, -1, "vbaProject.bin", Un.VBA)), f.file("[Content_Types].xml", jb(e, b)), f.file("_rels/.rels", mb(b.rels)), f.file("xl/_rels/workbook." + c + ".rels", mb(b.wbrels)), delete b.revssf, delete b.ssf, f
    }

    function $k(a, b) {
        var c = "";
        switch ((b || {}).type || "base64") {
            case"buffer":
                return [a[0], a[1], a[2], a[3]];
            case"base64":
                c = Ll.decode(a.slice(0, 24));
                break;
            case"binary":
                c = a;
                break;
            case"array":
                return [a[0], a[1], a[2], a[3]];
            default:
                throw new Error("Unrecognized type " + (b && b.type || "undefined"))
        }
        return [c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2), c.charCodeAt(3)]
    }

    function _k(a, b) {
        return $l.find(a, "EncryptedPackage") ? Yk(a, b) : qk(a, b)
    }

    function al(a, b) {
        var c, d = a, e = b || {};
        switch (e.type || (e.type = Ml && Buffer.isBuffer(a) ? "buffer" : "base64"), e.type) {
            case"base64":
                c = new dm(d, {base64: !0});
                break;
            case"binary":
            case"array":
                c = new dm(d, {base64: !1});
                break;
            case"buffer":
                c = new dm(d);
                break;
            default:
                throw new Error("Unrecognized type " + e.type)
        }
        return Xk(c, e)
    }

    function bl(a, b) {
        var c = 0;
        a:for (; c < a.length;) switch (a.charCodeAt(c)) {
            case 10:
            case 13:
            case 32:
                ++c;
                break;
            case 60:
                return Xj(a.slice(c), b);
            default:
                break a
        }
        return vo.to_workbook(a, b)
    }

    function cl(a, b) {
        var c = "", d = $k(a, b);
        switch (b.type) {
            case"base64":
                c = Ll.decode(a);
                break;
            case"binary":
                c = a;
                break;
            case"buffer":
                c = a.toString("binary");
                break;
            case"array":
                c = A(a);
                break;
            default:
                throw new Error("Unrecognized type " + b.type)
        }
        return 239 == d[0] && 187 == d[1] && 191 == d[2] && (c = tm(c)), bl(c, b)
    }

    function dl(a, b) {
        var c = a;
        return "base64" == b.type && (c = Ll.decode(c)), c = cptable.utils.decode(1200, c.slice(2), "str"), b.type = "binary", bl(c, b)
    }

    function el(a) {
        return a.match(/[^\x00-\x7F]/) ? um(a) : a
    }

    function fl(a, b, c, d) {
        return d ? (c.type = "string", vo.to_workbook(a, c)) : vo.to_workbook(b, c)
    }

    function gl(a, b) {
        if (c(), "undefined" != typeof ArrayBuffer && a instanceof ArrayBuffer) return gl(new Uint8Array(a), b);
        var d = a, e = [0, 0, 0, 0], f = !1, g = b || {};
        if (Kp = {}, g.dateNF && (Kp.dateNF = g.dateNF), g.type || (g.type = Ml && Buffer.isBuffer(a) ? "buffer" : "base64"), "file" == g.type && (g.type = Ml ? "buffer" : "binary", d = q(a)), "string" == g.type && (f = !0, g.type = "binary", g.codepage = 65001, d = el(a)), "array" == g.type && "undefined" != typeof Uint8Array && a instanceof Uint8Array && "undefined" != typeof ArrayBuffer) {
            var h = new ArrayBuffer(3), i = new Uint8Array(h);
            if (i.foo = "bar", !i.foo) return g = B(g), g.type = "array", gl(l(d), g)
        }
        switch ((e = $k(d, g))[0]) {
            case 208:
                return _k($l.read(d, g), g);
            case 9:
                return qk(d, g);
            case 60:
                return Xj(d, g);
            case 73:
                if (68 === e[1]) return he(d, g);
                break;
            case 84:
                if (65 === e[1] && 66 === e[2] && 76 === e[3]) return to.to_workbook(d, g);
                break;
            case 80:
                return 75 === e[1] && e[2] < 9 && e[3] < 9 ? al(d, g) : fl(a, d, g, f);
            case 239:
                return 60 === e[3] ? Xj(d, g) : fl(a, d, g, f);
            case 255:
                if (254 === e[1]) return dl(d, g);
                break;
            case 0:
                if (0 === e[1] && e[2] >= 2 && 0 === e[3]) return wo.to_workbook(d, g);
                break;
            case 3:
            case 131:
            case 139:
            case 140:
                return ro.to_workbook(d, g);
            case 123:
                if (92 === e[1] && 114 === e[2] && 116 === e[3]) return Jo.to_workbook(d, g);
                break;
            case 10:
            case 13:
            case 32:
                return cl(d, g)
        }
        return e[2] <= 12 && e[3] <= 31 ? ro.to_workbook(d, g) : fl(a, d, g, f)
    }

    function hl(a, b) {
        var c = b || {};
        return c.type = "file", gl(a, c)
    }

    function il(a, b) {
        switch (b.type) {
            case"base64":
            case"binary":
                break;
            case"buffer":
            case"array":
                b.type = "";
                break;
            case"file":
                return p(b.file, $l.write(a, {type: Ml ? "buffer" : ""}));
            case"string":
                throw new Error("'string' output type invalid for '" + b.bookType + "' files");
            default:
                throw new Error("Unrecognized type " + b.type)
        }
        return $l.write(a, b)
    }

    function jl(a, b) {
        var c = b || {};
        style_builder = new Jq(b);
        var d = Zk(a, c), e = {};
        if (c.compression && (e.compression = "DEFLATE"), c.password) e.type = Ml ? "nodebuffer" : "string"; else switch (c.type) {
            case"base64":
                e.type = "base64";
                break;
            case"binary":
                e.type = "string";
                break;
            case"string":
                throw new Error("'string' output type invalid for '" + c.bookType + "' files");
            case"buffer":
            case"file":
                e.type = Ml ? "nodebuffer" : "string";
                break;
            default:
                throw new Error("Unrecognized type " + c.type)
        }
        var f = d.generate(e);
        return c.password && "undefined" != typeof encrypt_agile ? il(encrypt_agile(f, c.password), c) : "file" === c.type ? p(c.file, f) : "string" == c.type ? tm(f) : f
    }

    function kl(a, b) {
        var c = b || {};
        return il(rk(a, c), c)
    }

    function ll(a, b, c) {
        c || (c = "");
        var d = c + a;
        switch (b.type) {
            case"base64":
                return Ll.encode(um(d));
            case"binary":
                return um(d);
            case"string":
                return a;
            case"file":
                return p(b.file, d, "utf8");
            case"buffer":
                return Ml ? Nl(d, "utf8") : ll(d, {type: "binary"}).split("").map(function (a) {
                    return a.charCodeAt(0)
                })
        }
        throw new Error("Unrecognized type " + b.type)
    }

    function ml(a, b) {
        switch (b.type) {
            case"base64":
                return Ll.encode(a);
            case"binary":
            case"string":
                return a;
            case"file":
                return p(b.file, a, "binary");
            case"buffer":
                return Ml ? Nl(a, "binary") : a.split("").map(function (a) {
                    return a.charCodeAt(0)
                })
        }
        throw new Error("Unrecognized type " + b.type)
    }

    function nl(a, b) {
        switch (b.type) {
            case"string":
            case"base64":
            case"binary":
                for (var c = "", d = 0; d < a.length; ++d) c += String.fromCharCode(a[d]);
                return "base64" == b.type ? Ll.encode(c) : "string" == b.type ? tm(c) : c;
            case"file":
                return p(b.file, a);
            case"buffer":
                return a;
            default:
                throw new Error("Unrecognized type " + b.type)
        }
    }

    function ol(a, b) {
        ij(a);
        var c = b || {};
        if ("array" == c.type) {
            c.type = "binary";
            var d = ol(a, c);
            return c.type = "array", i(d)
        }
        switch (c.bookType || "xlsb") {
            case"xml":
            case"xlml":
                return ll(ik(a, c), c);
            case"slk":
            case"sylk":
                return ll(xq(a, c), c);
            case"htm":
            case"html":
                return ll(vq(a, c), c);
            case"txt":
                return ml(Bq(a, c), c);
            case"csv":
                return ll(wq(a, c), c, "\ufeff");
            case"dif":
                return ll(yq(a, c), c);
            case"dbf":
                return nl(Cq(a, c), c);
            case"prn":
                return ll(zq(a, c), c);
            case"rtf":
                return ll(Aq(a, c), c);
            case"eth":
                return ll(Dq(a, c), c);
            case"fods":
                return ll(Pk(a, c), c);
            case"biff2":
                c.biff || (c.biff = 2);
            case"biff3":
                c.biff || (c.biff = 3);
            case"biff4":
                return c.biff || (c.biff = 4), nl(Ik(a, c), c);
            case"biff5":
                c.biff || (c.biff = 5);
            case"biff8":
            case"xla":
            case"xls":
                return c.biff || (c.biff = 8), kl(a, c);
            case"xlsx":
            case"xlsm":
            case"xlam":
            case"xlsb":
            case"ods":
                return jl(a, c);
            default:
                throw new Error("Unrecognized bookType |" + c.bookType + "|")
        }
    }

    function pl(a) {
        if (!a.bookType) {
            var b = {xls: "biff8", htm: "html", slk: "sylk", socialcalc: "eth", Sh33tJS: "WTF"},
                c = a.file.slice(a.file.lastIndexOf(".")).toLowerCase();
            c.match(/^\.[a-z]+$/) && (a.bookType = c.slice(1)), a.bookType = b[a.bookType] || a.bookType
        }
    }

    function ql(a, b, c) {
        var d = c || {};
        return d.type = "file", d.file = b, pl(d), ol(a, d)
    }

    function rl(a, b, c, d) {
        var e = c || {};
        e.type = "file", e.file = a, pl(e), e.type = "buffer";
        var f = d;
        return f instanceof Function || (f = c), _l.writeFile(a, ol(b, e), f)
    }

    function sl(a, b, c, d, e, f, g, h) {
        var i = ra(c), j = h.defval, k = h.raw || !h.hasOwnProperty("raw"), l = !0, m = 1 === e ? [] : {};
        if (1 !== e) if (Object.defineProperty) try {
            Object.defineProperty(m, "__rowNum__", {value: c, enumerable: !1})
        } catch (a) {
            m.__rowNum__ = c
        } else m.__rowNum__ = c;
        if (!g || a[c]) for (var n = b.s.c; n <= b.e.c; ++n) {
            var o = g ? a[c][n] : a[d[n] + i];
            if (void 0 !== o && void 0 !== o.t) {
                var p = o.v;
                switch (o.t) {
                    case"z":
                        if (null == p) break;
                        continue;
                    case"e":
                        p = void 0;
                        break;
                    case"s":
                    case"d":
                    case"b":
                    case"n":
                        break;
                    default:
                        throw new Error("unrecognized type " + o.t)
                }
                if (null != f[n]) {
                    if (null == p) if (void 0 !== j) m[f[n]] = j; else {
                        if (!k || null !== p) continue;
                        m[f[n]] = null
                    } else m[f[n]] = k ? p : Fa(o, p, h);
                    null != p && (l = !1)
                }
            } else {
                if (void 0 === j) continue;
                null != f[n] && (m[f[n]] = j)
            }
        }
        return {row: m, isempty: l}
    }

    function tl(a, b) {
        if (null == a || null == a["!ref"]) return [];
        var c = {t: "n", v: 0}, d = 0, e = 1, f = [], g = 0, h = "", i = {s: {r: 0, c: 0}, e: {r: 0, c: 0}},
            j = b || {}, k = null != j.range ? j.range : a["!ref"];
        switch (1 === j.header ? d = 1 : "A" === j.header ? d = 2 : Array.isArray(j.header) && (d = 3), typeof k) {
            case"string":
                i = Da(k);
                break;
            case"number":
                i = Da(a["!ref"]), i.s.r = k;
                break;
            default:
                i = k
        }
        d > 0 && (e = 0);
        var l = ra(i.s.r), m = [], n = [], o = 0, p = 0, q = Array.isArray(a), r = i.s.r, s = 0, t = 0;
        for (q && !a[r] && (a[r] = []), s = i.s.c; s <= i.e.c; ++s) switch (m[s] = va(s), c = q ? a[r][s] : a[m[s] + l], d) {
            case 1:
                f[s] = s - i.s.c;
                break;
            case 2:
                f[s] = m[s];
                break;
            case 3:
                f[s] = j.header[s - i.s.c];
                break;
            default:
                for (null == c && (c = {
                    w: "__EMPTY",
                    t: "s"
                }), h = g = Fa(c, null, j), p = 0, t = 0; t < f.length; ++t) f[t] == h && (h = g + "_" + ++p);
                f[s] = h
        }
        for (r = i.s.r + e; r <= i.e.r; ++r) {
            var u = sl(a, i, r, m, d, f, q, j);
            !1 !== u.isempty && (1 === d ? !1 === j.blankrows : !j.blankrows) || (n[o++] = u.row)
        }
        return n.length = o, n
    }

    function ul(a, b, c, d, e, f, g, h) {
        for (var i = !0, j = [], k = "", l = ra(c), m = b.s.c; m <= b.e.c; ++m) if (d[m]) {
            var n = h.dense ? (a[c] || [])[m] : a[d[m] + l];
            if (null == n) k = ""; else if (null != n.v) {
                i = !1, k = "" + Fa(n, null, h);
                for (var o = 0, p = 0; o !== k.length; ++o) if ((p = k.charCodeAt(o)) === e || p === f || 34 === p) {
                    k = '"' + k.replace(Gq, '""') + '"';
                    break
                }
                "ID" == k && (k = '"ID"')
            } else null == n.f || n.F ? k = "" : (i = !1, k = "=" + n.f, k.indexOf(",") >= 0 && (k = '"' + k.replace(Gq, '""') + '"'));
            j.push(k)
        }
        return !1 === h.blankrows && i ? null : j.join(g)
    }

    function vl(a, b) {
        var c = [], d = null == b ? {} : b;
        if (null == a || null == a["!ref"]) return "";
        var e = Da(a["!ref"]), f = void 0 !== d.FS ? d.FS : ",", g = f.charCodeAt(0), h = void 0 !== d.RS ? d.RS : "\n",
            i = h.charCodeAt(0), j = new RegExp(("|" == f ? "\\|" : f) + "+$"), k = "", l = [];
        d.dense = Array.isArray(a);
        for (var m = d.skipHidden && a["!cols"] || [], n = d.skipHidden && a["!rows"] || [], o = e.s.c; o <= e.e.c; ++o) (m[o] || {}).hidden || (l[o] = va(o));
        for (var p = e.s.r; p <= e.e.r; ++p) (n[p] || {}).hidden || null != (k = ul(a, e, p, l, g, i, f, d)) && (d.strip && (k = k.replace(j, "")), c.push(k + h));
        return delete d.dense, c.join("")
    }

    function wl(a, b) {
        b || (b = {}), b.FS = "\t", b.RS = "\n";
        var c = vl(a, b);
        if ("undefined" == typeof cptable || "string" == b.type) return c;
        var d = cptable.utils.encode(1200, c, "str");
        return String.fromCharCode(255) + String.fromCharCode(254) + d
    }

    function xl(a) {
        var b, c = "", d = "";
        if (null == a || null == a["!ref"]) return [];
        var e, f = Da(a["!ref"]), g = "", h = [], i = [], j = Array.isArray(a);
        for (e = f.s.c; e <= f.e.c; ++e) h[e] = va(e);
        for (var k = f.s.r; k <= f.e.r; ++k) for (g = ra(k), e = f.s.c; e <= f.e.c; ++e) if (c = h[e] + g, b = j ? (a[k] || [])[e] : a[c], d = "", void 0 !== b) {
            if (null != b.F) {
                if (c = b.F, !b.f) continue;
                d = b.f, -1 == c.indexOf(":") && (c = c + ":" + c)
            }
            if (null != b.f) d = b.f; else {
                if ("z" == b.t) continue;
                if ("n" == b.t && null != b.v) d = "" + b.v; else if ("b" == b.t) d = b.v ? "TRUE" : "FALSE"; else if (void 0 !== b.w) d = "'" + b.w; else {
                    if (void 0 === b.v) continue;
                    d = "s" == b.t ? "'" + b.v : "" + b.v
                }
            }
            i[i.length] = c + "=" + d
        }
        return i
    }

    function yl(a, b, c) {
        var d = c || {}, e = +!d.skipHeader, f = a || {}, g = 0, h = 0;
        if (f && null != d.origin) if ("number" == typeof d.origin) g = d.origin; else {
            var i = "string" == typeof d.origin ? za(d.origin) : d.origin;
            g = i.r, h = i.c
        }
        var j, k = {s: {c: 0, r: 0}, e: {c: h, r: g + b.length - 1 + e}};
        if (f["!ref"]) {
            var l = Da(f["!ref"]);
            k.e.c = Math.max(k.e.c, l.e.c), k.e.r = Math.max(k.e.r, l.e.r), -1 == g && (g = k.e.r + 1, k.e.r = g + b.length - 1 + e)
        }
        var m = d.header || [], n = 0;
        b.forEach(function (a, b) {
            r(a).forEach(function (c) {
                -1 == (n = m.indexOf(c)) && (m[n = m.length] = c);
                var i = a[c], k = "z", l = "";
                !i || "object" != typeof i || i instanceof Date ? ("number" == typeof i ? k = "n" : "boolean" == typeof i ? k = "b" : "string" == typeof i ? k = "s" : i instanceof Date && (k = "d", d.cellDates || (k = "n", i = w(i)), l = d.dateNF || Tl._table[14]), f[Aa({
                    c: h + n,
                    r: g + b + e
                })] = j = {t: k, v: i}, l && (j.z = l)) : f[Aa({c: h + n, r: g + b + e})] = i
            })
        }), k.e.c = Math.max(k.e.c, h + m.length - 1);
        var o = ra(g);
        if (e) for (n = 0; n < m.length; ++n) f[va(n + h) + o] = {t: "s", v: m[n]};
        return f["!ref"] = Ca(k), f
    }

    function zl(a, b) {
        return yl(null, a, b)
    }

    a.version = "0.14.3";
    var Al = 1200, Bl = 1252;
    "undefined" != typeof module && "undefined" != typeof require && "undefined" == typeof cptable && ("undefined" != typeof global ? global.cptable = void 0 : "undefined" != typeof window && (window.cptable = void 0));
    for (var Cl = [874, 932, 936, 949, 950], Dl = 0; Dl <= 8; ++Dl) Cl.push(1250 + Dl);
    var El = {
        0: 1252,
        1: 65001,
        2: 65001,
        77: 1e4,
        128: 932,
        129: 949,
        130: 1361,
        134: 936,
        136: 950,
        161: 1253,
        162: 1254,
        163: 1258,
        177: 1255,
        178: 1256,
        186: 1257,
        204: 1251,
        222: 874,
        238: 1250,
        255: 1252,
        69: 6969
    }, Fl = function (a) {
        -1 != Cl.indexOf(a) && (Bl = El[0] = a)
    }, Gl = function (a) {
        Al = a, Fl(a)
    }, Hl = function (a) {
        var b = a.charCodeAt(0), c = a.charCodeAt(1);
        return 255 == b && 254 == c ? e(a.slice(2)) : 254 == b && 255 == c ? f(a.slice(2)) : 65279 == b ? a.slice(1) : a
    }, Il = function (a) {
        return String.fromCharCode(a)
    };
    "undefined" != typeof cptable && (Gl = function (a) {
        Al = a
    }, Hl = function (a) {
        return 255 === a.charCodeAt(0) && 254 === a.charCodeAt(1) ? cptable.utils.decode(1200, d(a.slice(2))) : a
    }, Il = function (a) {
        return 1200 === Al ? String.fromCharCode(a) : cptable.utils.decode(Al, [255 & a, a >> 8])[0]
    });
    var Jl = null, Kl = !0, Ll = function () {
            var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            return {
                encode: function (b) {
                    for (var c = "", d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0; k < b.length;) d = b.charCodeAt(k++), g = d >> 2, e = b.charCodeAt(k++), h = (3 & d) << 4 | e >> 4, f = b.charCodeAt(k++), i = (15 & e) << 2 | f >> 6, j = 63 & f, isNaN(e) ? i = j = 64 : isNaN(f) && (j = 64), c += a.charAt(g) + a.charAt(h) + a.charAt(i) + a.charAt(j);
                    return c
                }, decode: function (b) {
                    var c = "", d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0;
                    b = b.replace(/[^\w\+\/\=]/g, "");
                    for (var k = 0; k < b.length;) g = a.indexOf(b.charAt(k++)), h = a.indexOf(b.charAt(k++)), d = g << 2 | h >> 4, c += String.fromCharCode(d), i = a.indexOf(b.charAt(k++)), e = (15 & h) << 4 | i >> 2, 64 !== i && (c += String.fromCharCode(e)), j = a.indexOf(b.charAt(k++)), f = (3 & i) << 6 | j, 64 !== j && (c += String.fromCharCode(f));
                    return c
                }
            }
        }(),
        Ml = "undefined" != typeof Buffer && "undefined" != typeof process && void 0 !== process.versions && !!process.versions.node,
        Nl = function () {
        };
    if ("undefined" != typeof Buffer) {
        var Ol = !Buffer.from;
        if (!Ol) try {
            Buffer.from("foo", "utf8")
        } catch (a) {
            Ol = !0
        }
        Nl = Ol ? function (a, b) {
            return b ? new Buffer(a, b) : new Buffer(a)
        } : Buffer.from.bind(Buffer), Buffer.alloc || (Buffer.alloc = function (a) {
            return new Buffer(a)
        }), Buffer.allocUnsafe || (Buffer.allocUnsafe = function (a) {
            return new Buffer(a)
        })
    }
    var Pl = function (a) {
        return Ml ? Nl(a, "binary") : a.split("").map(function (a) {
            return 255 & a.charCodeAt(0)
        })
    }, Ql = function (a) {
        return [].concat.apply([], a)
    }, Rl = /\u0000/g, Sl = /[\u0001-\u0006]/g, Tl = {}, Ul = function (a) {
        function b(a) {
            for (var b = "", c = a.length - 1; c >= 0;) b += a.charAt(c--);
            return b
        }

        function c(a, b) {
            for (var c = ""; c.length < b;) c += a;
            return c
        }

        function d(a, b) {
            var d = "" + a;
            return d.length >= b ? d : c("0", b - d.length) + d
        }

        function e(a, b) {
            var d = "" + a;
            return d.length >= b ? d : c(" ", b - d.length) + d
        }

        function f(a, b) {
            var d = "" + a;
            return d.length >= b ? d : d + c(" ", b - d.length)
        }

        function g(a, b) {
            var d = "" + Math.round(a);
            return d.length >= b ? d : c("0", b - d.length) + d
        }

        function h(a, b) {
            var d = "" + a;
            return d.length >= b ? d : c("0", b - d.length) + d
        }

        function i(a, b) {
            return a > A || a < -A ? g(a, b) : h(Math.round(a), b)
        }

        function j(a, b) {
            return b = b || 0, a.length >= 7 + b && 103 == (32 | a.charCodeAt(b)) && 101 == (32 | a.charCodeAt(b + 1)) && 110 == (32 | a.charCodeAt(b + 2)) && 101 == (32 | a.charCodeAt(b + 3)) && 114 == (32 | a.charCodeAt(b + 4)) && 97 == (32 | a.charCodeAt(b + 5)) && 108 == (32 | a.charCodeAt(b + 6))
        }

        function k(a) {
            a[0] = "General", a[1] = "0", a[2] = "0.00", a[3] = "#,##0", a[4] = "#,##0.00", a[9] = "0%", a[10] = "0.00%", a[11] = "0.00E+00", a[12] = "# ?/?", a[13] = "# ??/??", a[14] = "m/d/yy", a[15] = "d-mmm-yy", a[16] = "d-mmm", a[17] = "mmm-yy", a[18] = "h:mm AM/PM", a[19] = "h:mm:ss AM/PM", a[20] = "h:mm", a[21] = "h:mm:ss", a[22] = "m/d/yy h:mm", a[37] = "#,##0 ;(#,##0)", a[38] = "#,##0 ;[Red](#,##0)", a[39] = "#,##0.00;(#,##0.00)", a[40] = "#,##0.00;[Red](#,##0.00)", a[45] = "mm:ss", a[46] = "[h]:mm:ss", a[47] = "mmss.0", a[48] = "##0.0E+0", a[49] = "@", a[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "', a[65535] = "General"
        }

        function l(a, b, c) {
            for (var d = a < 0 ? -1 : 1, e = a * d, f = 0, g = 1, h = 0, i = 1, j = 0, k = 0, l = Math.floor(e); j < b && (l = Math.floor(e), h = l * g + f, k = l * j + i, !(e - l < 5e-8));) e = 1 / (e - l), f = g, g = h, i = j, j = k;
            if (k > b && (j > b ? (k = i, h = f) : (k = j, h = g)), !c) return [0, d * h, k];
            var m = Math.floor(d * h / k);
            return [m, d * h - m * k, k]
        }

        function m(a, b, c) {
            if (a > 2958465 || a < 0) return null;
            var d = 0 | a, e = Math.floor(86400 * (a - d)), f = 0, g = [],
                h = {D: d, T: e, u: 86400 * (a - d) - e, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0};
            if (Math.abs(h.u) < 1e-6 && (h.u = 0), b && b.date1904 && (d += 1462), h.u > .9999 && (h.u = 0, 86400 == ++e && (h.T = e = 0, ++d, ++h.D)), 60 === d) g = c ? [1317, 10, 29] : [1900, 2, 29], f = 3; else if (0 === d) g = c ? [1317, 8, 29] : [1900, 1, 0], f = 6; else {
                d > 60 && --d;
                var i = new Date(1900, 0, 1);
                i.setDate(i.getDate() + d - 1), g = [i.getFullYear(), i.getMonth() + 1, i.getDate()], f = i.getDay(), d < 60 && (f = (f + 6) % 7), c && (f = q(i, g))
            }
            return h.y = g[0], h.m = g[1], h.d = g[2], h.S = e % 60, e = Math.floor(e / 60), h.M = e % 60, e = Math.floor(e / 60), h.H = e, h.q = f, h
        }

        function n(a, b) {
            var c = a.getTime();
            return b ? c -= 1262304e5 : a >= G && (c += 864e5), (c - (F + 6e4 * (a.getTimezoneOffset() - E.getTimezoneOffset()))) / 864e5
        }

        function o(a) {
            return a.toString(10)
        }

        function p(a, b) {
            switch (typeof a) {
                case"string":
                    return a;
                case"boolean":
                    return a ? "TRUE" : "FALSE";
                case"number":
                    return (0 | a) === a ? o(a) : H(a);
                case"undefined":
                    return "";
                case"object":
                    if (null == a) return "";
                    if (a instanceof Date) return y(14, n(a, b && b.date1904), b)
            }
            throw new Error("unsupported value in General format: " + a)
        }

        function q() {
            return 0
        }

        function r(a, b, c, e) {
            var f, g = "", h = 0, i = 0, j = c.y, k = 0;
            switch (a) {
                case 98:
                    j = c.y + 543;
                case 121:
                    switch (b.length) {
                        case 1:
                        case 2:
                            f = j % 100, k = 2;
                            break;
                        default:
                            f = j % 1e4, k = 4
                    }
                    break;
                case 109:
                    switch (b.length) {
                        case 1:
                        case 2:
                            f = c.m, k = b.length;
                            break;
                        case 3:
                            return C[c.m - 1][1];
                        case 5:
                            return C[c.m - 1][0];
                        default:
                            return C[c.m - 1][2]
                    }
                    break;
                case 100:
                    switch (b.length) {
                        case 1:
                        case 2:
                            f = c.d, k = b.length;
                            break;
                        case 3:
                            return B[c.q][0];
                        default:
                            return B[c.q][1]
                    }
                    break;
                case 104:
                    switch (b.length) {
                        case 1:
                        case 2:
                            f = 1 + (c.H + 11) % 12, k = b.length;
                            break;
                        default:
                            throw"bad hour format: " + b
                    }
                    break;
                case 72:
                    switch (b.length) {
                        case 1:
                        case 2:
                            f = c.H, k = b.length;
                            break;
                        default:
                            throw"bad hour format: " + b
                    }
                    break;
                case 77:
                    switch (b.length) {
                        case 1:
                        case 2:
                            f = c.M, k = b.length;
                            break;
                        default:
                            throw"bad minute format: " + b
                    }
                    break;
                case 115:
                    if ("s" != b && "ss" != b && ".0" != b && ".00" != b && ".000" != b) throw"bad second format: " + b;
                    return 0 !== c.u || "s" != b && "ss" != b ? (i = e >= 2 ? 3 === e ? 1e3 : 100 : 1 === e ? 10 : 1, h = Math.round(i * (c.S + c.u)), h >= 60 * i && (h = 0), "s" === b ? 0 === h ? "0" : "" + h / i : (g = d(h, 2 + e), "ss" === b ? g.substr(0, 2) : "." + g.substr(2, b.length - 1))) : d(c.S, b.length);
                case 90:
                    switch (b) {
                        case"[h]":
                        case"[hh]":
                            f = 24 * c.D + c.H;
                            break;
                        case"[m]":
                        case"[mm]":
                            f = 60 * (24 * c.D + c.H) + c.M;
                            break;
                        case"[s]":
                        case"[ss]":
                            f = 60 * (60 * (24 * c.D + c.H) + c.M) + Math.round(c.S + c.u);
                            break;
                        default:
                            throw"bad abstime format: " + b
                    }
                    k = 3 === b.length ? 1 : 2;
                    break;
                case 101:
                    f = j, k = 1
            }
            return k > 0 ? d(f, k) : ""
        }

        function s(a) {
            var b = 3;
            if (a.length <= b) return a;
            for (var c = a.length % b, d = a.substr(0, c); c != a.length; c += b) d += (d.length > 0 ? "," : "") + a.substr(c, b);
            return d
        }

        function t(a) {
            for (var b = [], c = !1, d = 0, e = 0; d < a.length; ++d) switch (a.charCodeAt(d)) {
                case 34:
                    c = !c;
                    break;
                case 95:
                case 42:
                case 92:
                    ++d;
                    break;
                case 59:
                    b[b.length] = a.substr(e, d - e), e = d + 1
            }
            if (b[b.length] = a.substr(e), !0 === c) throw new Error("Format |" + a + "| unterminated string ");
            return b
        }

        function u(a) {
            for (var b = 0, c = "", d = ""; b < a.length;) switch (c = a.charAt(b)) {
                case"G":
                    j(a, b) && (b += 6), b++;
                    break;
                case'"':
                    for (; 34 !== a.charCodeAt(++b) && b < a.length;) ++b;
                    ++b;
                    break;
                case"\\":
                case"_":
                    b += 2;
                    break;
                case"@":
                    ++b;
                    break;
                case"B":
                case"b":
                    if ("1" === a.charAt(b + 1) || "2" === a.charAt(b + 1)) return !0;
                case"M":
                case"D":
                case"Y":
                case"H":
                case"S":
                case"E":
                case"m":
                case"d":
                case"y":
                case"h":
                case"s":
                case"e":
                case"g":
                    return !0;
                case"A":
                case"a":
                    if ("A/P" === a.substr(b, 3).toUpperCase()) return !0;
                    if ("AM/PM" === a.substr(b, 5).toUpperCase()) return !0;
                    ++b;
                    break;
                case"[":
                    for (d = c; "]" !== a.charAt(b++) && b < a.length;) d += a.charAt(b);
                    if (d.match(J)) return !0;
                    break;
                case".":
                case"0":
                case"#":
                    for (; b < a.length && ("0#?.,E+-%".indexOf(c = a.charAt(++b)) > -1 || "\\" == c && "-" == a.charAt(b + 1) && "0#".indexOf(a.charAt(b + 2)) > -1);) ;
                    break;
                case"?":
                    for (; a.charAt(++b) === c;) ;
                    break;
                case"*":
                    ++b, " " != a.charAt(b) && "*" != a.charAt(b) || ++b;
                    break;
                case"(":
                case")":
                    ++b;
                    break;
                case"1":
                case"2":
                case"3":
                case"4":
                case"5":
                case"6":
                case"7":
                case"8":
                case"9":
                    for (; b < a.length && "0123456789".indexOf(a.charAt(++b)) > -1;) ;
                    break;
                case" ":
                default:
                    ++b
            }
            return !1
        }

        function v(a, b, c, d) {
            for (var e, f, g, h = [], i = "", k = 0, l = "", n = "t", o = "H"; k < a.length;) switch (l = a.charAt(k)) {
                case"G":
                    if (!j(a, k)) throw new Error("unrecognized character " + l + " in " + a);
                    h[h.length] = {t: "G", v: "General"}, k += 7;
                    break;
                case'"':
                    for (i = ""; 34 !== (g = a.charCodeAt(++k)) && k < a.length;) i += String.fromCharCode(g);
                    h[h.length] = {t: "t", v: i}, ++k;
                    break;
                case"\\":
                    var q = a.charAt(++k), s = "(" === q || ")" === q ? q : "t";
                    h[h.length] = {t: s, v: q}, ++k;
                    break;
                case"_":
                    h[h.length] = {t: "t", v: " "}, k += 2;
                    break;
                case"@":
                    h[h.length] = {t: "T", v: b}, ++k;
                    break;
                case"B":
                case"b":
                    if ("1" === a.charAt(k + 1) || "2" === a.charAt(k + 1)) {
                        if (null == e && null == (e = m(b, c, "2" === a.charAt(k + 1)))) return "";
                        h[h.length] = {t: "X", v: a.substr(k, 2)}, n = l, k += 2;
                        break
                    }
                case"M":
                case"D":
                case"Y":
                case"H":
                case"S":
                case"E":
                    l = l.toLowerCase();
                case"m":
                case"d":
                case"y":
                case"h":
                case"s":
                case"e":
                case"g":
                    if (b < 0) return "";
                    if (null == e && null == (e = m(b, c))) return "";
                    for (i = l; ++k < a.length && a.charAt(k).toLowerCase() === l;) i += l;
                    "m" === l && "h" === n.toLowerCase() && (l = "M"), "h" === l && (l = o), h[h.length] = {
                        t: l,
                        v: i
                    }, n = l;
                    break;
                case"A":
                case"a":
                    var t = {t: l, v: l};
                    if (null == e && (e = m(b, c)), "A/P" === a.substr(k, 3).toUpperCase() ? (null != e && (t.v = e.H >= 12 ? "P" : "A"), t.t = "T", o = "h", k += 3) : "AM/PM" === a.substr(k, 5).toUpperCase() ? (null != e && (t.v = e.H >= 12 ? "PM" : "AM"), t.t = "T", k += 5, o = "h") : (t.t = "t", ++k), null == e && "T" === t.t) return "";
                    h[h.length] = t, n = l;
                    break;
                case"[":
                    for (i = l; "]" !== a.charAt(k++) && k < a.length;) i += a.charAt(k);
                    if ("]" !== i.slice(-1)) throw'unterminated "[" block: |' + i + "|";
                    if (i.match(J)) {
                        if (null == e && null == (e = m(b, c))) return "";
                        h[h.length] = {t: "Z", v: i.toLowerCase()}, n = i.charAt(1)
                    } else i.indexOf("$") > -1 && (i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$", u(a) || (h[h.length] = {
                        t: "t",
                        v: i
                    }));
                    break;
                case".":
                    if (null != e) {
                        for (i = l; ++k < a.length && "0" === (l = a.charAt(k));) i += l;
                        h[h.length] = {t: "s", v: i};
                        break
                    }
                case"0":
                case"#":
                    for (i = l; ++k < a.length && "0#?.,E+-%".indexOf(l = a.charAt(k)) > -1 || "\\" == l && "-" == a.charAt(k + 1) && k < a.length - 2 && "0#".indexOf(a.charAt(k + 2)) > -1;) i += l;
                    h[h.length] = {t: "n", v: i};
                    break;
                case"?":
                    for (i = l; a.charAt(++k) === l;) i += l;
                    h[h.length] = {t: l, v: i}, n = l;
                    break;
                case"*":
                    ++k, " " != a.charAt(k) && "*" != a.charAt(k) || ++k;
                    break;
                case"(":
                case")":
                    h[h.length] = {t: 1 === d ? "t" : l, v: l}, ++k;
                    break;
                case"1":
                case"2":
                case"3":
                case"4":
                case"5":
                case"6":
                case"7":
                case"8":
                case"9":
                    for (i = l; k < a.length && "0123456789".indexOf(a.charAt(++k)) > -1;) i += a.charAt(k);
                    h[h.length] = {t: "D", v: i};
                    break;
                case" ":
                    h[h.length] = {t: l, v: l}, ++k;
                    break;
                default:
                    if (-1 === ",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(l)) throw new Error("unrecognized character " + l + " in " + a);
                    h[h.length] = {t: "t", v: l}, ++k
            }
            var v, w = 0, x = 0;
            for (k = h.length - 1, n = "t"; k >= 0; --k) switch (h[k].t) {
                case"h":
                case"H":
                    h[k].t = o, n = "h", w < 1 && (w = 1);
                    break;
                case"s":
                    (v = h[k].v.match(/\.0+$/)) && (x = Math.max(x, v[0].length - 1)), w < 3 && (w = 3);
                case"d":
                case"y":
                case"M":
                case"e":
                    n = h[k].t;
                    break;
                case"m":
                    "s" === n && (h[k].t = "M", w < 2 && (w = 2));
                    break;
                case"X":
                    break;
                case"Z":
                    w < 1 && h[k].v.match(/[Hh]/) && (w = 1), w < 2 && h[k].v.match(/[Mm]/) && (w = 2), w < 3 && h[k].v.match(/[Ss]/) && (w = 3)
            }
            switch (w) {
                case 0:
                    break;
                case 1:
                    e.u >= .5 && (e.u = 0, ++e.S), e.S >= 60 && (e.S = 0, ++e.M), e.M >= 60 && (e.M = 0, ++e.H);
                    break;
                case 2:
                    e.u >= .5 && (e.u = 0, ++e.S), e.S >= 60 && (e.S = 0, ++e.M)
            }
            var y, z = "";
            for (k = 0; k < h.length; ++k) switch (h[k].t) {
                case"t":
                case"T":
                case" ":
                case"D":
                    break;
                case"X":
                    h[k].v = "", h[k].t = ";";
                    break;
                case"d":
                case"m":
                case"y":
                case"h":
                case"H":
                case"M":
                case"s":
                case"e":
                case"b":
                case"Z":
                    h[k].v = r(h[k].t.charCodeAt(0), h[k].v, e, x), h[k].t = "t";
                    break;
                case"n":
                case"(":
                case"?":
                    for (y = k + 1; null != h[y] && ("?" === (l = h[y].t) || "D" === l || (" " === l || "t" === l) && null != h[y + 1] && ("?" === h[y + 1].t || "t" === h[y + 1].t && "/" === h[y + 1].v) || "(" === h[k].t && (" " === l || "n" === l || ")" === l) || "t" === l && ("/" === h[y].v || " " === h[y].v && null != h[y + 1] && "?" == h[y + 1].t));) h[k].v += h[y].v, h[y] = {
                        v: "",
                        t: ";"
                    }, ++y;
                    z += h[k].v, k = y - 1;
                    break;
                case"G":
                    h[k].t = "t", h[k].v = p(b, c)
            }
            var A, B, C = "";
            if (z.length > 0) {
                40 == z.charCodeAt(0) ? (A = b < 0 && 45 === z.charCodeAt(0) ? -b : b, B = I("(", z, A)) : (A = b < 0 && d > 1 ? -b : b, B = I("n", z, A), A < 0 && h[0] && "t" == h[0].t && (B = B.substr(1), h[0].v = "-" + h[0].v)), y = B.length - 1;
                var D = h.length;
                for (k = 0; k < h.length; ++k) if (null != h[k] && "t" != h[k].t && h[k].v.indexOf(".") > -1) {
                    D = k;
                    break
                }
                var E = h.length;
                if (D === h.length && -1 === B.indexOf("E")) {
                    for (k = h.length - 1; k >= 0; --k) null != h[k] && -1 !== "n?(".indexOf(h[k].t) && (y >= h[k].v.length - 1 ? (y -= h[k].v.length, h[k].v = B.substr(y + 1, h[k].v.length)) : y < 0 ? h[k].v = "" : (h[k].v = B.substr(0, y + 1), y = -1), h[k].t = "t", E = k);
                    y >= 0 && E < h.length && (h[E].v = B.substr(0, y + 1) + h[E].v)
                } else if (D !== h.length && -1 === B.indexOf("E")) {
                    for (y = B.indexOf(".") - 1, k = D; k >= 0; --k) if (null != h[k] && -1 !== "n?(".indexOf(h[k].t)) {
                        for (f = h[k].v.indexOf(".") > -1 && k === D ? h[k].v.indexOf(".") - 1 : h[k].v.length - 1, C = h[k].v.substr(f + 1); f >= 0; --f) y >= 0 && ("0" === h[k].v.charAt(f) || "#" === h[k].v.charAt(f)) && (C = B.charAt(y--) + C);
                        h[k].v = C, h[k].t = "t", E = k
                    }
                    for (y >= 0 && E < h.length && (h[E].v = B.substr(0, y + 1) + h[E].v), y = B.indexOf(".") + 1, k = D; k < h.length; ++k) if (null != h[k] && (-1 !== "n?(".indexOf(h[k].t) || k === D)) {
                        for (f = h[k].v.indexOf(".") > -1 && k === D ? h[k].v.indexOf(".") + 1 : 0, C = h[k].v.substr(0, f); f < h[k].v.length; ++f) y < B.length && (C += B.charAt(y++));
                        h[k].v = C, h[k].t = "t", E = k
                    }
                }
            }
            for (k = 0; k < h.length; ++k) null != h[k] && "n(?".indexOf(h[k].t) > -1 && (A = d > 1 && b < 0 && k > 0 && "-" === h[k - 1].v ? -b : b, h[k].v = I(h[k].t, h[k].v, A), h[k].t = "t");
            var F = "";
            for (k = 0; k !== h.length; ++k) null != h[k] && (F += h[k].v);
            return F
        }

        function w(a, b) {
            if (null == b) return !1;
            var c = parseFloat(b[2]);
            switch (b[1]) {
                case"=":
                    if (a == c) return !0;
                    break;
                case">":
                    if (a > c) return !0;
                    break;
                case"<":
                    if (a < c) return !0;
                    break;
                case"<>":
                    if (a != c) return !0;
                    break;
                case">=":
                    if (a >= c) return !0;
                    break;
                case"<=":
                    if (a <= c) return !0
            }
            return !1
        }

        function x(a, b) {
            var c = t(a), d = c.length, e = c[d - 1].indexOf("@");
            if (d < 4 && e > -1 && --d, c.length > 4) throw new Error("cannot find right format for |" + c.join("|") + "|");
            if ("number" != typeof b) return [4, 4 === c.length || e > -1 ? c[c.length - 1] : "@"];
            switch (c.length) {
                case 1:
                    c = e > -1 ? ["General", "General", "General", c[0]] : [c[0], c[0], c[0], "@"];
                    break;
                case 2:
                    c = e > -1 ? [c[0], c[0], c[0], c[1]] : [c[0], c[1], c[0], "@"];
                    break;
                case 3:
                    c = e > -1 ? [c[0], c[1], c[0], c[2]] : [c[0], c[1], c[2], "@"]
            }
            var f = b > 0 ? c[0] : b < 0 ? c[1] : c[2];
            if (-1 === c[0].indexOf("[") && -1 === c[1].indexOf("[")) return [d, f];
            if (null != c[0].match(K) || null != c[1].match(K)) {
                var g = c[0].match(L), h = c[1].match(L);
                return w(b, g) ? [d, c[0]] : w(b, h) ? [d, c[1]] : [d, c[null != g && null != h ? 2 : 1]]
            }
            return [d, f]
        }

        function y(a, b, c) {
            null == c && (c = {});
            var d = "";
            switch (typeof a) {
                case"string":
                    d = "m/d/yy" == a && c.dateNF ? c.dateNF : a;
                    break;
                case"number":
                    d = 14 == a && c.dateNF ? c.dateNF : (null != c.table ? c.table : D)[a]
            }
            if (j(d, 0)) return p(b, c);
            b instanceof Date && (b = n(b, c.date1904));
            var e = x(d, b);
            if (j(e[1])) return p(b, c);
            if (!0 === b) b = "TRUE"; else if (!1 === b) b = "FALSE"; else if ("" === b || null == b) return "";
            return v(e[1], b, c, e[0])
        }

        function z(a, b) {
            if ("number" != typeof b) {
                b = +b || -1;
                for (var c = 0; c < 392; ++c) if (void 0 != D[c]) {
                    if (D[c] == a) {
                        b = c;
                        break
                    }
                } else b < 0 && (b = c);
                b < 0 && (b = 391)
            }
            return D[b] = a, b
        }

        a.version = "0.10.2";
        var A = Math.pow(2, 32),
            B = [["Sun", "Sunday"], ["Mon", "Monday"], ["Tue", "Tuesday"], ["Wed", "Wednesday"], ["Thu", "Thursday"], ["Fri", "Friday"], ["Sat", "Saturday"]],
            C = [["J", "Jan", "January"], ["F", "Feb", "February"], ["M", "Mar", "March"], ["A", "Apr", "April"], ["M", "May", "May"], ["J", "Jun", "June"], ["J", "Jul", "July"], ["A", "Aug", "August"], ["S", "Sep", "September"], ["O", "Oct", "October"], ["N", "Nov", "November"], ["D", "Dec", "December"]],
            D = {};
        k(D), a.parse_date_code = m;
        var E = new Date(1899, 11, 31, 0, 0, 0), F = E.getTime(), G = new Date(1900, 2, 1, 0, 0, 0);
        a._general_int = o;
        var H = function () {
            function a(a) {
                var b = a < 0 ? 12 : 11, c = d(a.toFixed(12));
                return c.length <= b ? c : (c = a.toPrecision(10), c.length <= b ? c : a.toExponential(5))
            }

            function b(a) {
                var b = a.toFixed(11).replace(e, ".$1");
                return b.length > (a < 0 ? 12 : 11) && (b = a.toPrecision(6)), b
            }

            function c(a) {
                for (var b = 0; b != a.length; ++b) if (101 == (32 | a.charCodeAt(b))) return a.replace(g, ".$1").replace(h, "E").replace("e", "E").replace(i, "$10$2");
                return a
            }

            function d(a) {
                return a.indexOf(".") > -1 ? a.replace(f, "").replace(e, ".$1") : a
            }

            var e = /\.(\d*[1-9])0+$/, f = /\.0*$/, g = /\.(\d*[1-9])0+/, h = /\.0*[Ee]/, i = /(E[+-])(\d)$/;
            return function (e) {
                var f, g = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E);
                return f = g >= -4 && g <= -1 ? e.toPrecision(10 + g) : Math.abs(g) <= 9 ? a(e) : 10 === g ? e.toFixed(10).substr(0, 12) : b(e), d(c(f))
            }
        }();
        a._general_num = H, a._general = p;
        var I = function () {
            function a(a, b, d) {
                var e = b.replace(x, ""), f = b.length - e.length;
                return I(a, e, d * Math.pow(10, 2 * f)) + c("%", f)
            }

            function g(a, b, c) {
                for (var d = b.length - 1; 44 === b.charCodeAt(d - 1);) --d;
                return I(a, b.substr(0, d), c / Math.pow(10, 3 * (b.length - d)))
            }

            function h(a, b) {
                var c, d = a.indexOf("E") - a.indexOf(".") - 1;
                if (a.match(/^#+0.0E\+0$/)) {
                    if (0 == b) return "0.0E+0";
                    if (b < 0) return "-" + h(a, -b);
                    var e = a.indexOf(".");
                    -1 === e && (e = a.indexOf("E"));
                    var f = Math.floor(Math.log(b) * Math.LOG10E) % e;
                    if (f < 0 && (f += e), c = (b / Math.pow(10, f)).toPrecision(d + 1 + (e + f) % e), -1 === c.indexOf("e")) {
                        var g = Math.floor(Math.log(b) * Math.LOG10E);
                        for (-1 === c.indexOf(".") ? c = c.charAt(0) + "." + c.substr(1) + "E+" + (g - c.length + f) : c += "E+" + (g - f); "0." === c.substr(0, 2);) c = c.charAt(0) + c.substr(2, e) + "." + c.substr(2 + e), c = c.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
                        c = c.replace(/\+-/, "-")
                    }
                    c = c.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function (a, b, c, d) {
                        return b + c + d.substr(0, (e + f) % e) + "." + d.substr(f) + "E"
                    })
                } else c = b.toExponential(d);
                return a.match(/E\+00$/) && c.match(/e[+-]\d$/) && (c = c.substr(0, c.length - 1) + "0" + c.charAt(c.length - 1)), a.match(/E\-/) && c.match(/e\+/) && (c = c.replace(/e\+/, "e")), c.replace("e", "E")
            }

            function j(a, b, f) {
                var g = parseInt(a[4], 10), h = Math.round(b * g), i = Math.floor(h / g), j = h - i * g, k = g;
                return f + (0 === i ? "" : "" + i) + " " + (0 === j ? c(" ", a[1].length + 1 + a[4].length) : e(j, a[1].length) + a[2] + "/" + a[3] + d(k, a[4].length))
            }

            function k(a, b, d) {
                return d + (0 === b ? "" : "" + b) + c(" ", a[1].length + 2 + a[4].length)
            }

            function m(a) {
                for (var b, c = "", d = 0; d != a.length; ++d) switch (b = a.charCodeAt(d)) {
                    case 35:
                        break;
                    case 63:
                        c += " ";
                        break;
                    case 48:
                        c += "0";
                        break;
                    default:
                        c += String.fromCharCode(b)
                }
                return c
            }

            function n(a, b) {
                var c = Math.pow(10, b);
                return "" + Math.round(a * c) / c
            }

            function o(a, b) {
                return b < ("" + Math.round((a - Math.floor(a)) * Math.pow(10, b))).length ? 0 : Math.round((a - Math.floor(a)) * Math.pow(10, b))
            }

            function p(a, b) {
                return b < ("" + Math.round((a - Math.floor(a)) * Math.pow(10, b))).length ? 1 : 0
            }

            function q(a) {
                return a < 2147483647 && a > -2147483648 ? "" + (a >= 0 ? 0 | a : a - 1 | 0) : "" + Math.floor(a)
            }

            function r(k, t, u) {
                if (40 === k.charCodeAt(0) && !t.match(A)) {
                    var v = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
                    return u >= 0 ? r("n", v, u) : "(" + r("n", v, -u) + ")"
                }
                if (44 === t.charCodeAt(t.length - 1)) return g(k, t, u);
                if (-1 !== t.indexOf("%")) return a(k, t, u);
                if (-1 !== t.indexOf("E")) return h(t, u);
                if (36 === t.charCodeAt(0)) return "$" + r(k, t.substr(" " == t.charAt(1) ? 2 : 1), u);
                var w, x, C, D, E = Math.abs(u), F = u < 0 ? "-" : "";
                if (t.match(/^00+$/)) return F + i(E, t.length);
                if (t.match(/^[#?]+$/)) return w = i(u, 0), "0" === w && (w = ""), w.length > t.length ? w : m(t.substr(0, t.length - w.length)) + w;
                if (x = t.match(y)) return j(x, E, F);
                if (t.match(/^#+0+$/)) return F + i(E, t.length - t.indexOf("0"));
                if (x = t.match(z)) return w = n(u, x[1].length).replace(/^([^\.]+)$/, "$1." + m(x[1])).replace(/\.$/, "." + m(x[1])).replace(/\.(\d*)$/, function (a, b) {
                    return "." + b + c("0", m(x[1]).length - b.length)
                }), -1 !== t.indexOf("0.") ? w : w.replace(/^0\./, ".");
                if (t = t.replace(/^#+([0.])/, "$1"), x = t.match(/^(0*)\.(#*)$/)) return F + n(E, x[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, x[1].length ? "0." : ".");
                if (x = t.match(/^#{1,3},##0(\.?)$/)) return F + s(i(E, 0));
                if (x = t.match(/^#,##0\.([#0]*0)$/)) return u < 0 ? "-" + r(k, t, -u) : s("" + (Math.floor(u) + p(u, x[1].length))) + "." + d(o(u, x[1].length), x[1].length);
                if (x = t.match(/^#,#*,#0/)) return r(k, t.replace(/^#,#*,/, ""), u);
                if (x = t.match(/^([0#]+)(\\?-([0#]+))+$/)) return w = b(r(k, t.replace(/[\\-]/g, ""), u)), C = 0, b(b(t.replace(/\\/g, "")).replace(/[0#]/g, function (a) {
                    return C < w.length ? w.charAt(C++) : "0" === a ? "0" : ""
                }));
                if (t.match(B)) return w = r(k, "##########", u), "(" + w.substr(0, 3) + ") " + w.substr(3, 3) + "-" + w.substr(6);
                var G = "";
                if (x = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) return C = Math.min(x[4].length, 7), D = l(E, Math.pow(10, C) - 1, !1), w = "" + F, G = I("n", x[1], D[1]), " " == G.charAt(G.length - 1) && (G = G.substr(0, G.length - 1) + "0"), w += G + x[2] + "/" + x[3], G = f(D[2], C), G.length < x[4].length && (G = m(x[4].substr(x[4].length - G.length)) + G), w += G;
                if (x = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) return C = Math.min(Math.max(x[1].length, x[4].length), 7), D = l(E, Math.pow(10, C) - 1, !0), F + (D[0] || (D[1] ? "" : "0")) + " " + (D[1] ? e(D[1], C) + x[2] + "/" + x[3] + f(D[2], C) : c(" ", 2 * C + 1 + x[2].length + x[3].length));
                if (x = t.match(/^[#0?]+$/)) return w = i(u, 0), t.length <= w.length ? w : m(t.substr(0, t.length - w.length)) + w;
                if (x = t.match(/^([#0?]+)\.([#0]+)$/)) {
                    w = "" + u.toFixed(Math.min(x[2].length, 10)).replace(/([^0])0+$/, "$1"), C = w.indexOf(".");
                    var H = t.indexOf(".") - C, J = t.length - w.length - H;
                    return m(t.substr(0, H) + w + t.substr(t.length - J))
                }
                if (x = t.match(/^00,000\.([#0]*0)$/)) return C = o(u, x[1].length), u < 0 ? "-" + r(k, t, -u) : s(q(u)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function (a) {
                    return "00," + (a.length < 3 ? d(0, 3 - a.length) : "") + a
                }) + "." + d(C, x[1].length);
                switch (t) {
                    case"###,##0.00":
                        return r(k, "#,##0.00", u);
                    case"###,###":
                    case"##,###":
                    case"#,###":
                        var K = s(i(E, 0));
                        return "0" !== K ? F + K : "";
                    case"###,###.00":
                        return r(k, "###,##0.00", u).replace(/^0\./, ".");
                    case"#,###.00":
                        return r(k, "#,##0.00", u).replace(/^0\./, ".")
                }
                throw new Error("unsupported format |" + t + "|")
            }

            function t(a, b, c) {
                for (var d = b.length - 1; 44 === b.charCodeAt(d - 1);) --d;
                return I(a, b.substr(0, d), c / Math.pow(10, 3 * (b.length - d)))
            }

            function u(a, b, d) {
                var e = b.replace(x, ""), f = b.length - e.length;
                return I(a, e, d * Math.pow(10, 2 * f)) + c("%", f)
            }

            function v(a, b) {
                var c, d = a.indexOf("E") - a.indexOf(".") - 1;
                if (a.match(/^#+0.0E\+0$/)) {
                    if (0 == b) return "0.0E+0";
                    if (b < 0) return "-" + v(a, -b);
                    var e = a.indexOf(".");
                    -1 === e && (e = a.indexOf("E"));
                    var f = Math.floor(Math.log(b) * Math.LOG10E) % e;
                    if (f < 0 && (f += e), c = (b / Math.pow(10, f)).toPrecision(d + 1 + (e + f) % e), !c.match(/[Ee]/)) {
                        var g = Math.floor(Math.log(b) * Math.LOG10E);
                        -1 === c.indexOf(".") ? c = c.charAt(0) + "." + c.substr(1) + "E+" + (g - c.length + f) : c += "E+" + (g - f), c = c.replace(/\+-/, "-")
                    }
                    c = c.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function (a, b, c, d) {
                        return b + c + d.substr(0, (e + f) % e) + "." + d.substr(f) + "E"
                    })
                } else c = b.toExponential(d);
                return a.match(/E\+00$/) && c.match(/e[+-]\d$/) && (c = c.substr(0, c.length - 1) + "0" + c.charAt(c.length - 1)), a.match(/E\-/) && c.match(/e\+/) && (c = c.replace(/e\+/, "e")), c.replace("e", "E")
            }

            function w(a, g, h) {
                if (40 === a.charCodeAt(0) && !g.match(A)) {
                    var i = g.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
                    return h >= 0 ? w("n", i, h) : "(" + w("n", i, -h) + ")"
                }
                if (44 === g.charCodeAt(g.length - 1)) return t(a, g, h);
                if (-1 !== g.indexOf("%")) return u(a, g, h);
                if (-1 !== g.indexOf("E")) return v(g, h);
                if (36 === g.charCodeAt(0)) return "$" + w(a, g.substr(" " == g.charAt(1) ? 2 : 1), h);
                var j, n, o, p, q = Math.abs(h), r = h < 0 ? "-" : "";
                if (g.match(/^00+$/)) return r + d(q, g.length);
                if (g.match(/^[#?]+$/)) return j = "" + h, 0 === h && (j = ""), j.length > g.length ? j : m(g.substr(0, g.length - j.length)) + j;
                if (n = g.match(y)) return k(n, q, r);
                if (g.match(/^#+0+$/)) return r + d(q, g.length - g.indexOf("0"));
                if (n = g.match(z)) return j = ("" + h).replace(/^([^\.]+)$/, "$1." + m(n[1])).replace(/\.$/, "." + m(n[1])), j = j.replace(/\.(\d*)$/, function (a, b) {
                    return "." + b + c("0", m(n[1]).length - b.length)
                }), -1 !== g.indexOf("0.") ? j : j.replace(/^0\./, ".");
                if (g = g.replace(/^#+([0.])/, "$1"), n = g.match(/^(0*)\.(#*)$/)) return r + ("" + q).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, n[1].length ? "0." : ".");
                if (n = g.match(/^#{1,3},##0(\.?)$/)) return r + s("" + q);
                if (n = g.match(/^#,##0\.([#0]*0)$/)) return h < 0 ? "-" + w(a, g, -h) : s("" + h) + "." + c("0", n[1].length);
                if (n = g.match(/^#,#*,#0/)) return w(a, g.replace(/^#,#*,/, ""), h);
                if (n = g.match(/^([0#]+)(\\?-([0#]+))+$/)) return j = b(w(a, g.replace(/[\\-]/g, ""), h)), o = 0, b(b(g.replace(/\\/g, "")).replace(/[0#]/g, function (a) {
                    return o < j.length ? j.charAt(o++) : "0" === a ? "0" : ""
                }));
                if (g.match(B)) return j = w(a, "##########", h), "(" + j.substr(0, 3) + ") " + j.substr(3, 3) + "-" + j.substr(6);
                var x = "";
                if (n = g.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) return o = Math.min(n[4].length, 7), p = l(q, Math.pow(10, o) - 1, !1), j = "" + r, x = I("n", n[1], p[1]), " " == x.charAt(x.length - 1) && (x = x.substr(0, x.length - 1) + "0"), j += x + n[2] + "/" + n[3], x = f(p[2], o), x.length < n[4].length && (x = m(n[4].substr(n[4].length - x.length)) + x), j += x;
                if (n = g.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) return o = Math.min(Math.max(n[1].length, n[4].length), 7), p = l(q, Math.pow(10, o) - 1, !0), r + (p[0] || (p[1] ? "" : "0")) + " " + (p[1] ? e(p[1], o) + n[2] + "/" + n[3] + f(p[2], o) : c(" ", 2 * o + 1 + n[2].length + n[3].length));
                if (n = g.match(/^[#0?]+$/)) return j = "" + h, g.length <= j.length ? j : m(g.substr(0, g.length - j.length)) + j;
                if (n = g.match(/^([#0]+)\.([#0]+)$/)) {
                    j = "" + h.toFixed(Math.min(n[2].length, 10)).replace(/([^0])0+$/, "$1"), o = j.indexOf(".");
                    var C = g.indexOf(".") - o, D = g.length - j.length - C;
                    return m(g.substr(0, C) + j + g.substr(g.length - D))
                }
                if (n = g.match(/^00,000\.([#0]*0)$/)) return h < 0 ? "-" + w(a, g, -h) : s("" + h).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function (a) {
                    return "00," + (a.length < 3 ? d(0, 3 - a.length) : "") + a
                }) + "." + d(0, n[1].length);
                switch (g) {
                    case"###,###":
                    case"##,###":
                    case"#,###":
                        var E = s("" + q);
                        return "0" !== E ? r + E : "";
                    default:
                        if (g.match(/\.[0#?]*$/)) return w(a, g.slice(0, g.lastIndexOf(".")), h) + m(g.slice(g.lastIndexOf(".")))
                }
                throw new Error("unsupported format |" + g + "|")
            }

            var x = /%/g, y = /# (\?+)( ?)\/( ?)(\d+)/, z = /^#*0*\.([0#]+)/, A = /\).*[0#]/, B = /\(###\) ###\\?-####/;
            return function (a, b, c) {
                return (0 | c) === c ? w(a, b, c) : r(a, b, c)
            }
        }();
        a._split = t;
        var J = /\[[HhMmSs]*\]/;
        a.is_date = u, a._eval = v;
        var K = /\[[=<>]/, L = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
        a.load = z, a._table = D, a.get_table = function () {
            return D
        }, a.load_table = function (a) {
            for (var b = 0; 392 != b; ++b) void 0 !== a[b] && z(a[b], b)
        }, a.init_table = k, a.format = y
    };
    Ul(Tl);
    var Vl, Wl = {
        "General Number": "General",
        "General Date": Tl._table[22],
        "Long Date": "dddd, mmmm dd, yyyy",
        "Medium Date": Tl._table[15],
        "Short Date": Tl._table[14],
        "Long Time": Tl._table[19],
        "Medium Time": Tl._table[18],
        "Short Time": Tl._table[20],
        Currency: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
        Fixed: Tl._table[2],
        Standard: Tl._table[4],
        Percent: Tl._table[10],
        Scientific: Tl._table[11],
        "Yes/No": '"Yes";"Yes";"No";@',
        "True/False": '"True";"True";"False";@',
        "On/Off": '"Yes";"Yes";"No";@'
    }, Xl = {
        5: '"$"#,##0_);\\("$"#,##0\\)',
        6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
        7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
        8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
        23: "General",
        24: "General",
        25: "General",
        26: "General",
        27: "m/d/yy",
        28: "m/d/yy",
        29: "m/d/yy",
        30: "m/d/yy",
        31: "m/d/yy",
        32: "h:mm:ss",
        33: "h:mm:ss",
        34: "h:mm:ss",
        35: "h:mm:ss",
        36: "m/d/yy",
        41: '_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)',
        42: '_("$"* #,##0_);_("$"* (#,##0);_("$"* "-"_);_(@_)',
        43: '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)',
        44: '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)',
        50: "m/d/yy",
        51: "m/d/yy",
        52: "m/d/yy",
        53: "m/d/yy",
        54: "m/d/yy",
        55: "m/d/yy",
        56: "m/d/yy",
        57: "m/d/yy",
        58: "m/d/yy",
        59: "0",
        60: "0.00",
        61: "#,##0",
        62: "#,##0.00",
        63: '"$"#,##0_);\\("$"#,##0\\)',
        64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
        65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
        66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
        67: "0%",
        68: "0.00%",
        69: "# ?/?",
        70: "# ??/??",
        71: "m/d/yy",
        72: "m/d/yy",
        73: "d-mmm-yy",
        74: "d-mmm",
        75: "mmm-yy",
        76: "h:mm",
        77: "h:mm:ss",
        78: "m/d/yy h:mm",
        79: "mm:ss",
        80: "[h]:mm:ss",
        81: "mmss.0"
    }, Yl = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g, Zl = !0;
    !function (a) {
        a(Vl = {})
    }(function (a) {
        function b() {
            for (var a = 0, b = new Array(256), c = 0; 256 != c; ++c) a = c, a = 1 & a ? -306674912 ^ a >>> 1 : a >>> 1, a = 1 & a ? -306674912 ^ a >>> 1 : a >>> 1, a = 1 & a ? -306674912 ^ a >>> 1 : a >>> 1, a = 1 & a ? -306674912 ^ a >>> 1 : a >>> 1, a = 1 & a ? -306674912 ^ a >>> 1 : a >>> 1, a = 1 & a ? -306674912 ^ a >>> 1 : a >>> 1, a = 1 & a ? -306674912 ^ a >>> 1 : a >>> 1, a = 1 & a ? -306674912 ^ a >>> 1 : a >>> 1, b[c] = a;
            return "undefined" != typeof Int32Array ? new Int32Array(b) : b
        }

        function c(a, b) {
            for (var c = -1 ^ b, d = a.length - 1, e = 0; e < d;) c = c >>> 8 ^ g[255 & (c ^ a.charCodeAt(e++))], c = c >>> 8 ^ g[255 & (c ^ a.charCodeAt(e++))];
            return e === d && (c = c >>> 8 ^ g[255 & (c ^ a.charCodeAt(e))]), -1 ^ c
        }

        function d(a, b) {
            if (a.length > 1e4) return e(a, b);
            for (var c = -1 ^ b, d = a.length - 3, f = 0; f < d;) c = c >>> 8 ^ g[255 & (c ^ a[f++])], c = c >>> 8 ^ g[255 & (c ^ a[f++])], c = c >>> 8 ^ g[255 & (c ^ a[f++])], c = c >>> 8 ^ g[255 & (c ^ a[f++])];
            for (; f < d + 3;) c = c >>> 8 ^ g[255 & (c ^ a[f++])];
            return -1 ^ c
        }

        function e(a, b) {
            for (var c = -1 ^ b, d = a.length - 7, e = 0; e < d;) c = c >>> 8 ^ g[255 & (c ^ a[e++])], c = c >>> 8 ^ g[255 & (c ^ a[e++])], c = c >>> 8 ^ g[255 & (c ^ a[e++])], c = c >>> 8 ^ g[255 & (c ^ a[e++])], c = c >>> 8 ^ g[255 & (c ^ a[e++])], c = c >>> 8 ^ g[255 & (c ^ a[e++])], c = c >>> 8 ^ g[255 & (c ^ a[e++])], c = c >>> 8 ^ g[255 & (c ^ a[e++])];
            for (; e < d + 7;) c = c >>> 8 ^ g[255 & (c ^ a[e++])];
            return -1 ^ c
        }

        function f(a, b) {
            for (var c, d, e = -1 ^ b, f = 0, h = a.length; f < h;) c = a.charCodeAt(f++), c < 128 ? e = e >>> 8 ^ g[255 & (e ^ c)] : c < 2048 ? (e = e >>> 8 ^ g[255 & (e ^ (192 | c >> 6 & 31))], e = e >>> 8 ^ g[255 & (e ^ (128 | 63 & c))]) : c >= 55296 && c < 57344 ? (c = 64 + (1023 & c), d = 1023 & a.charCodeAt(f++), e = e >>> 8 ^ g[255 & (e ^ (240 | c >> 8 & 7))], e = e >>> 8 ^ g[255 & (e ^ (128 | c >> 2 & 63))], e = e >>> 8 ^ g[255 & (e ^ (128 | d >> 6 & 15 | (3 & c) << 4))], e = e >>> 8 ^ g[255 & (e ^ (128 | 63 & d))]) : (e = e >>> 8 ^ g[255 & (e ^ (224 | c >> 12 & 15))], e = e >>> 8 ^ g[255 & (e ^ (128 | c >> 6 & 63))], e = e >>> 8 ^ g[255 & (e ^ (128 | 63 & c))]);
            return -1 ^ e
        }

        a.version = "1.2.0";
        var g = b();
        a.table = g, a.bstr = c, a.buf = d, a.str = f
    });
    var $l = function () {
        function a(a, b) {
            for (var c = a.split("/"), d = b.split("/"), e = 0, f = 0, g = Math.min(c.length, d.length); e < g; ++e) {
                if (f = c[e].length - d[e].length) return f;
                if (c[e] != d[e]) return c[e] < d[e] ? -1 : 1
            }
            return c.length - d.length
        }

        function b(a) {
            if ("/" == a.charAt(a.length - 1)) return -1 === a.slice(0, -1).indexOf("/") ? a : b(a.slice(0, -1));
            var c = a.lastIndexOf("/");
            return -1 === c ? a : a.slice(0, c + 1)
        }

        function c(a) {
            if ("/" == a.charAt(a.length - 1)) return c(a.slice(0, -1));
            var b = a.lastIndexOf("/");
            return -1 === b ? a : a.slice(b + 1)
        }

        function d(a, b) {
            "string" == typeof b && (b = new Date(b));
            var c = b.getHours();
            c = c << 6 | b.getMinutes(), c = c << 5 | b.getSeconds() >>> 1, a.write_shift(2, c);
            var d = b.getFullYear() - 1980;
            d = d << 4 | b.getMonth() + 1, d = d << 5 | b.getDate(), a.write_shift(2, d)
        }

        function e(a) {
            var b = 65535 & a.read_shift(2), c = 65535 & a.read_shift(2), d = new Date, e = 31 & c;
            c >>>= 5;
            var f = 15 & c;
            c >>>= 4, d.setMilliseconds(0), d.setFullYear(c + 1980), d.setMonth(f - 1), d.setDate(e);
            var g = 31 & b;
            b >>>= 5;
            var h = 63 & b;
            return b >>>= 6, d.setHours(b), d.setMinutes(h), d.setSeconds(g << 1), d
        }

        function f(a) {
            ga(a, 0);
            for (var b = {}, c = 0; a.l <= a.length - 4;) {
                var d = a.read_shift(2), e = a.read_shift(2), f = a.l + e, g = {};
                switch (d) {
                    case 21589:
                        c = a.read_shift(1), 1 & c && (g.mtime = a.read_shift(4)), e > 5 && (2 & c && (g.atime = a.read_shift(4)), 4 & c && (g.ctime = a.read_shift(4))), g.mtime && (g.mt = new Date(1e3 * g.mtime))
                }
                a.l = f, b[d] = g
            }
            return b
        }

        function i() {
            return ea || (ea = require("fs"))
        }

        function j(a, b) {
            if (80 == a[0] && 75 == a[1]) return W(a, b);
            if (a.length < 512) throw new Error("CFB file size " + a.length + " < 512");
            var c = 3, d = 512, e = 0, f = 0, g = 0, h = 0, i = 0, j = [], o = a.slice(0, 512);
            ga(o, 0);
            var q = k(o);
            switch (c = q[0]) {
                case 3:
                    d = 512;
                    break;
                case 4:
                    d = 4096;
                    break;
                case 0:
                    if (0 == q[1]) return W(a, b);
                default:
                    throw new Error("Major Version: Expected 3 or 4 saw " + c)
            }
            512 !== d && (o = a.slice(0, d), ga(o, 28));
            var t = a.slice(0, d);
            l(o, c);
            var u = o.read_shift(4, "i");
            if (3 === c && 0 !== u) throw new Error("# Directory Sectors: Expected 0 saw " + u);
            o.l += 4, g = o.read_shift(4, "i"), o.l += 4, o.chk("00100000", "Mini Stream Cutoff Size: "), h = o.read_shift(4, "i"), e = o.read_shift(4, "i"), i = o.read_shift(4, "i"), f = o.read_shift(4, "i");
            for (var v = -1, w = 0; w < 109 && !((v = o.read_shift(4, "i")) < 0); ++w) j[w] = v;
            var x = m(a, d);
            p(i, f, x, d, j);
            var y = r(x, g, j, d);
            y[g].name = "!Directory", e > 0 && h !== ka && (y[h].name = "!MiniFAT"), y[j[0]].name = "!FAT", y.fat_addrs = j, y.ssz = d;
            var z = {}, A = [], B = [], C = [];
            s(g, y, x, A, e, z, B, h), n(B, C, A), A.shift();
            var D = {FileIndex: B, FullPaths: C};
            return b && b.raw && (D.raw = {header: t, sectors: x}), D
        }

        function k(a) {
            if (80 == a[a.l] && 75 == a[a.l + 1]) return [0, 0];
            a.chk(la, "Header Signature: "), a.chk(na, "CLSID: ");
            var b = a.read_shift(2, "u");
            return [a.read_shift(2, "u"), b]
        }

        function l(a, b) {
            var c = 9;
            switch (a.l += 2, c = a.read_shift(2)) {
                case 9:
                    if (3 != b) throw new Error("Sector Shift: Expected 9 saw " + c);
                    break;
                case 12:
                    if (4 != b) throw new Error("Sector Shift: Expected 12 saw " + c);
                    break;
                default:
                    throw new Error("Sector Shift: Expected 9 or 12 saw " + c)
            }
            a.chk("0600", "Mini Sector Shift: "), a.chk("000000000000", "Reserved: ")
        }

        function m(a, b) {
            for (var c = Math.ceil(a.length / b) - 1, d = [], e = 1; e < c; ++e) d[e - 1] = a.slice(e * b, (e + 1) * b);
            return d[c - 1] = a.slice(c * b), d
        }

        function n(a, b, c) {
            for (var d = 0, e = 0, f = 0, g = 0, h = 0, i = c.length, j = [], k = []; d < i; ++d) j[d] = k[d] = d, b[d] = c[d];
            for (; h < k.length; ++h) d = k[h], e = a[d].L, f = a[d].R, g = a[d].C, j[d] === d && (-1 !== e && j[e] !== e && (j[d] = j[e]), -1 !== f && j[f] !== f && (j[d] = j[f])), -1 !== g && (j[g] = d), -1 !== e && (j[e] = j[d], k.lastIndexOf(e) < h && k.push(e)), -1 !== f && (j[f] = j[d], k.lastIndexOf(f) < h && k.push(f));
            for (d = 1; d < i; ++d) j[d] === d && (-1 !== f && j[f] !== f ? j[d] = j[f] : -1 !== e && j[e] !== e && (j[d] = j[e]));
            for (d = 1; d < i; ++d) if (0 !== a[d].type) {
                if (0 === (h = j[d])) b[d] = b[0] + "/" + b[d]; else for (; 0 !== h && h !== j[h];) b[d] = b[h] + "/" + b[d], h = j[h];
                j[d] = 0
            }
            for (b[0] += "/", d = 1; d < i; ++d) 2 !== a[d].type && (b[d] += "/")
        }

        function o(a, b, c) {
            for (var d = a.start, e = a.size, f = [], g = d; c && e > 0 && g >= 0;) f.push(b.slice(g * ja, g * ja + ja)), e -= ja, g = dn(c, 4 * g);
            return 0 === f.length ? ia(0) : Ql(f).slice(0, a.size)
        }

        function p(a, b, c, d, e) {
            var f = ka;
            if (a === ka) {
                if (0 !== b) throw new Error("DIFAT chain shorter than expected")
            } else if (-1 !== a) {
                var g = c[a], h = (d >>> 2) - 1;
                if (!g) return;
                for (var i = 0; i < h && (f = dn(g, 4 * i)) !== ka; ++i) e.push(f);
                p(dn(g, d - 4), b - 1, c, d, e)
            }
        }

        function q(a, b, c, d, e) {
            var f = [], g = [];
            e || (e = []);
            var h = d - 1, i = 0, j = 0;
            for (i = b; i >= 0;) {
                e[i] = !0, f[f.length] = i, g.push(a[i]);
                var k = c[Math.floor(4 * i / d)];
                if (j = 4 * i & h, d < 4 + j) throw new Error("FAT boundary crossed: " + i + " 4 " + d);
                if (!a[k]) break;
                i = dn(a[k], j)
            }
            return {nodes: f, data: Im([g])}
        }

        function r(a, b, c, d) {
            var e = a.length, f = [], g = [], h = [], i = [], j = d - 1, k = 0, l = 0, m = 0, n = 0;
            for (k = 0; k < e; ++k) if (h = [], m = k + b, m >= e && (m -= e), !g[m]) {
                for (i = [], l = m; l >= 0;) {
                    g[l] = !0, h[h.length] = l, i.push(a[l]);
                    var o = c[Math.floor(4 * l / d)];
                    if (n = 4 * l & j, d < 4 + n) throw new Error("FAT boundary crossed: " + l + " 4 " + d);
                    if (!a[o]) break;
                    l = dn(a[o], n)
                }
                f[m] = {nodes: h, data: Im([i])}
            }
            return f
        }

        function s(a, b, c, d, e, f, g, h) {
            for (var i, j = 0, k = d.length ? 2 : 0, l = b[a].data, m = 0, n = 0; m < l.length; m += 128) {
                var p = l.slice(m, m + 128);
                ga(p, 64), n = p.read_shift(2), i = Km(p, 0, n - k), d.push(i);
                var r = {
                    name: i,
                    type: p.read_shift(1),
                    color: p.read_shift(1),
                    L: p.read_shift(4, "i"),
                    R: p.read_shift(4, "i"),
                    C: p.read_shift(4, "i"),
                    clsid: p.read_shift(16),
                    state: p.read_shift(4, "i"),
                    start: 0,
                    size: 0
                };
                0 !== p.read_shift(2) + p.read_shift(2) + p.read_shift(2) + p.read_shift(2) && (r.ct = t(p, p.l - 8));
                0 !== p.read_shift(2) + p.read_shift(2) + p.read_shift(2) + p.read_shift(2) && (r.mt = t(p, p.l - 8)), r.start = p.read_shift(4, "i"), r.size = p.read_shift(4, "i"), r.size < 0 && r.start < 0 && (r.size = r.type = 0, r.start = ka, r.name = ""), 5 === r.type ? (j = r.start, e > 0 && j !== ka && (b[j].name = "!StreamData")) : r.size >= 4096 ? (r.storage = "fat", void 0 === b[r.start] && (b[r.start] = q(c, r.start, b.fat_addrs, b.ssz)), b[r.start].name = r.name, r.content = b[r.start].data.slice(0, r.size)) : (r.storage = "minifat", r.size < 0 ? r.size = 0 : j !== ka && r.start !== ka && b[j] && (r.content = o(r, b[j].data, (b[h] || {}).data))), r.content && ga(r.content, 0), f[i] = r, g.push(r)
            }
        }

        function t(a, b) {
            return new Date(1e3 * (cn(a, b + 4) / 1e7 * Math.pow(2, 32) + cn(a, b) / 1e7 - 11644473600))
        }

        function u(a, b) {
            return i(), j(ea.readFileSync(a), b)
        }

        function v(a, b) {
            switch (b && b.type || "base64") {
                case"file":
                    return u(a, b);
                case"base64":
                    return j(Pl(Ll.decode(a)), b);
                case"binary":
                    return j(Pl(a), b)
            }
            return j(a, b)
        }

        function w(a, b) {
            var c = b || {}, d = c.root || "Root Entry";
            if (a.FullPaths || (a.FullPaths = []), a.FileIndex || (a.FileIndex = []), a.FullPaths.length !== a.FileIndex.length) throw new Error("inconsistent CFB structure");
            0 === a.FullPaths.length && (a.FullPaths[0] = d + "/", a.FileIndex[0] = {
                name: d,
                type: 5
            }), c.CLSID && (a.FileIndex[0].clsid = c.CLSID), x(a)
        }

        function x(a) {
            var b = "Sh33tJ5";
            if (!$l.find(a, "/" + b)) {
                var c = ia(4);
                c[0] = 55, c[1] = c[3] = 50, c[2] = 54, a.FileIndex.push({
                    name: b,
                    type: 2,
                    content: c,
                    size: 4,
                    L: 69,
                    R: 69,
                    C: 69
                }), a.FullPaths.push(a.FullPaths[0] + b), y(a)
            }
        }

        function y(d, e) {
            w(d);
            for (var f = !1, g = !1, h = d.FullPaths.length - 1; h >= 0; --h) {
                var i = d.FileIndex[h];
                switch (i.type) {
                    case 0:
                        g ? f = !0 : (d.FileIndex.pop(), d.FullPaths.pop());
                        break;
                    case 1:
                    case 2:
                    case 5:
                        g = !0, isNaN(i.R * i.L * i.C) && (f = !0), i.R > -1 && i.L > -1 && i.R == i.L && (f = !0);
                        break;
                    default:
                        f = !0
                }
            }
            if (f || e) {
                var j = new Date(1987, 1, 19), k = 0, l = [];
                for (h = 0; h < d.FullPaths.length; ++h) 0 !== d.FileIndex[h].type && l.push([d.FullPaths[h], d.FileIndex[h]]);
                for (h = 0; h < l.length; ++h) {
                    var m = b(l[h][0]);
                    for (g = !1, k = 0; k < l.length; ++k) l[k][0] === m && (g = !0);
                    g || l.push([m, {name: c(m).replace("/", ""), type: 1, clsid: na, ct: j, mt: j, content: null}])
                }
                for (l.sort(function (b, c) {
                    return a(b[0], c[0])
                }), d.FullPaths = [], d.FileIndex = [], h = 0; h < l.length; ++h) d.FullPaths[h] = l[h][0], d.FileIndex[h] = l[h][1];
                for (h = 0; h < l.length; ++h) {
                    var n = d.FileIndex[h], o = d.FullPaths[h];
                    if (n.name = c(o).replace("/", ""), n.L = n.R = n.C = -(n.color = 1), n.size = n.content ? n.content.length : 0, n.start = 0, n.clsid = n.clsid || na, 0 === h) n.C = l.length > 1 ? 1 : -1, n.size = 0, n.type = 5; else if ("/" == o.slice(-1)) {
                        for (k = h + 1; k < l.length && b(d.FullPaths[k]) != o; ++k) ;
                        for (n.C = k >= l.length ? -1 : k, k = h + 1; k < l.length && b(d.FullPaths[k]) != b(o); ++k) ;
                        n.R = k >= l.length ? -1 : k, n.type = 1
                    } else b(d.FullPaths[h + 1] || "") == b(o) && (n.R = h + 1), n.type = 2
                }
            }
        }

        function z(a, b) {
            var c = b || {};
            if (y(a), "zip" == c.fileType) return Y(a, c);
            var d = function (a) {
                for (var b = 0, c = 0, d = 0; d < a.FileIndex.length; ++d) {
                    var e = a.FileIndex[d];
                    if (e.content) {
                        var f = e.content.length;
                        f > 0 && (f < 4096 ? b += f + 63 >> 6 : c += f + 511 >> 9)
                    }
                }
                for (var g = a.FullPaths.length + 3 >> 2, h = b + 7 >> 3, i = b + 127 >> 7, j = h + c + g + i, k = j + 127 >> 7, l = k <= 109 ? 0 : Math.ceil((k - 109) / 127); j + k + l + 127 >> 7 > k;) l = ++k <= 109 ? 0 : Math.ceil((k - 109) / 127);
                var m = [1, l, k, i, g, c, b, 0];
                return a.FileIndex[0].size = b << 6, m[7] = (a.FileIndex[0].start = m[0] + m[1] + m[2] + m[3] + m[4] + m[5]) + (m[6] + 7 >> 3), m
            }(a), e = ia(d[7] << 9), f = 0, g = 0;
            for (f = 0; f < 8; ++f) e.write_shift(1, ma[f]);
            for (f = 0; f < 8; ++f) e.write_shift(2, 0);
            for (e.write_shift(2, 62), e.write_shift(2, 3), e.write_shift(2, 65534), e.write_shift(2, 9), e.write_shift(2, 6), f = 0; f < 3; ++f) e.write_shift(2, 0);
            for (e.write_shift(4, 0), e.write_shift(4, d[2]), e.write_shift(4, d[0] + d[1] + d[2] + d[3] - 1), e.write_shift(4, 0), e.write_shift(4, 4096), e.write_shift(4, d[3] ? d[0] + d[1] + d[2] - 1 : ka), e.write_shift(4, d[3]), e.write_shift(-4, d[1] ? d[0] - 1 : ka), e.write_shift(4, d[1]), f = 0; f < 109; ++f) e.write_shift(-4, f < d[2] ? d[1] + f : -1);
            if (d[1]) for (g = 0; g < d[1]; ++g) {
                for (; f < 236 + 127 * g; ++f) e.write_shift(-4, f < d[2] ? d[1] + f : -1);
                e.write_shift(-4, g === d[1] - 1 ? ka : g + 1)
            }
            var h = function (a) {
                for (g += a; f < g - 1; ++f) e.write_shift(-4, f + 1);
                a && (++f, e.write_shift(-4, ka))
            };
            for (g = f = 0, g += d[1]; f < g; ++f) e.write_shift(-4, oa.DIFSECT);
            for (g += d[2]; f < g; ++f) e.write_shift(-4, oa.FATSECT);
            h(d[3]), h(d[4]);
            for (var i = 0, j = 0, k = a.FileIndex[0]; i < a.FileIndex.length; ++i) k = a.FileIndex[i], k.content && ((j = k.content.length) < 4096 || (k.start = g, h(j + 511 >> 9)));
            for (h(d[6] + 7 >> 3); 511 & e.l;) e.write_shift(-4, oa.ENDOFCHAIN);
            for (g = f = 0, i = 0; i < a.FileIndex.length; ++i) k = a.FileIndex[i], k.content && (!(j = k.content.length) || j >= 4096 || (k.start = g, h(j + 63 >> 6)));
            for (; 511 & e.l;) e.write_shift(-4, oa.ENDOFCHAIN);
            for (f = 0; f < d[4] << 2; ++f) {
                var l = a.FullPaths[f];
                if (l && 0 !== l.length) {
                    k = a.FileIndex[f], 0 === f && (k.start = k.size ? k.start - 1 : ka);
                    var m = 0 === f && c.root || k.name;
                    if (j = 2 * (m.length + 1), e.write_shift(64, m, "utf16le"), e.write_shift(2, j), e.write_shift(1, k.type), e.write_shift(1, k.color), e.write_shift(-4, k.L), e.write_shift(-4, k.R), e.write_shift(-4, k.C), k.clsid) e.write_shift(16, k.clsid, "hex"); else for (i = 0; i < 4; ++i) e.write_shift(4, 0);
                    e.write_shift(4, k.state || 0), e.write_shift(4, 0), e.write_shift(4, 0), e.write_shift(4, 0), e.write_shift(4, 0), e.write_shift(4, k.start), e.write_shift(4, k.size), e.write_shift(4, 0)
                } else {
                    for (i = 0; i < 17; ++i) e.write_shift(4, 0);
                    for (i = 0; i < 3; ++i) e.write_shift(4, -1);
                    for (i = 0; i < 12; ++i) e.write_shift(4, 0)
                }
            }
            for (f = 1; f < a.FileIndex.length; ++f) if (k = a.FileIndex[f], k.size >= 4096) {
                for (e.l = k.start + 1 << 9, i = 0; i < k.size; ++i) e.write_shift(1, k.content[i]);
                for (; 511 & i; ++i) e.write_shift(1, 0)
            }
            for (f = 1; f < a.FileIndex.length; ++f) if (k = a.FileIndex[f], k.size > 0 && k.size < 4096) {
                for (i = 0; i < k.size; ++i) e.write_shift(1, k.content[i]);
                for (; 63 & i; ++i) e.write_shift(1, 0)
            }
            for (; e.l < e.length;) e.write_shift(1, 0);
            return e
        }

        function A(a, b) {
            var c = a.FullPaths.map(function (a) {
                return a.toUpperCase()
            }), d = c.map(function (a) {
                var b = a.split("/");
                return b[b.length - ("/" == a.slice(-1) ? 2 : 1)]
            }), e = !1;
            47 === b.charCodeAt(0) ? (e = !0, b = c[0].slice(0, -1) + b) : e = -1 !== b.indexOf("/");
            var f = b.toUpperCase(), g = !0 === e ? c.indexOf(f) : d.indexOf(f);
            if (-1 !== g) return a.FileIndex[g];
            var h = !f.match(Sl);
            for (f = f.replace(Rl, ""), h && (f = f.replace(Sl, "!")), g = 0; g < c.length; ++g) {
                if ((h ? c[g].replace(Sl, "!") : c[g]).replace(Rl, "") == f) return a.FileIndex[g];
                if ((h ? d[g].replace(Sl, "!") : d[g]).replace(Rl, "") == f) return a.FileIndex[g]
            }
            return null
        }

        function B(a, b, c) {
            i();
            var d = z(a, c);
            ea.writeFileSync(b, d)
        }

        function C(a) {
            for (var b = new Array(a.length), c = 0; c < a.length; ++c) b[c] = String.fromCharCode(a[c]);
            return b.join("")
        }

        function D(a, b) {
            var c = z(a, b);
            switch (b && b.type) {
                case"file":
                    return i(), ea.writeFileSync(b.filename, c), c;
                case"binary":
                    return C(c);
                case"base64":
                    return Ll.encode(C(c))
            }
            return c
        }

        function E(a) {
            try {
                var b = a.InflateRaw, c = new b;
                if (c._processChunk(new Uint8Array([3, 0]), c._finishFlushFlag), !c.bytesRead) throw new Error("zlib does not expose bytesRead");
                ha = a
            } catch (a) {
                console.error("cannot use native zlib: " + (a.message || a))
            }
        }

        function F(a, b) {
            if (!ha) return U(a, b);
            var c = ha.InflateRaw, d = new c, e = d._processChunk(a.slice(a.l), d._finishFlushFlag);
            return a.l += d.bytesRead, e
        }

        function G(a) {
            return ha ? ha.deflateRawSync(a) : va(a)
        }

        function H(a) {
            var b = 139536 & (a << 1 | a << 11) | 558144 & (a << 5 | a << 15);
            return 255 & (b >> 16 | b >> 8 | b)
        }

        function I(a, b) {
            var c = ta[255 & a];
            return b <= 8 ? c >>> 8 - b : (c = c << 8 | ta[a >> 8 & 255], b <= 16 ? c >>> 16 - b : (c = c << 8 | ta[a >> 16 & 255]) >>> 24 - b)
        }

        function J(a, b) {
            var c = 7 & b, d = b >>> 3;
            return (a[d] | (c <= 6 ? 0 : a[d + 1] << 8)) >>> c & 3
        }

        function K(a, b) {
            var c = 7 & b, d = b >>> 3;
            return (a[d] | (c <= 5 ? 0 : a[d + 1] << 8)) >>> c & 7
        }

        function L(a, b) {
            var c = 7 & b, d = b >>> 3;
            return (a[d] | (c <= 4 ? 0 : a[d + 1] << 8)) >>> c & 15
        }

        function M(a, b) {
            var c = 7 & b, d = b >>> 3;
            return (a[d] | (c <= 3 ? 0 : a[d + 1] << 8)) >>> c & 31
        }

        function N(a, b) {
            var c = 7 & b, d = b >>> 3;
            return (a[d] | (c <= 1 ? 0 : a[d + 1] << 8)) >>> c & 127
        }

        function O(a, b, c) {
            var d = 7 & b, e = b >>> 3, f = (1 << c) - 1, g = a[e] >>> d;
            return c < 8 - d ? g & f : (g |= a[e + 1] << 8 - d, c < 16 - d ? g & f : (g |= a[e + 2] << 16 - d, c < 24 - d ? g & f : (g |= a[e + 3] << 24 - d) & f))
        }

        function P(a, b) {
            var c = a.length, d = 2 * c > b ? 2 * c : b + 5, e = 0;
            if (c >= b) return a;
            if (Ml) {
                var f = h(d);
                if (a.copy) a.copy(f); else for (; e < a.length; ++e) f[e] = a[e];
                return f
            }
            if (sa) {
                var g = new Uint8Array(d);
                if (g.set) g.set(a); else for (; e < a.length; ++e) g[e] = a[e];
                return g
            }
            return a.length = d, a
        }

        function Q(a) {
            for (var b = new Array(a), c = 0; c < a; ++c) b[c] = 0;
            return b
        }

        function R(a, b, c) {
            var d = 1, e = 0, f = 0, g = 0, h = 0, i = a.length, j = sa ? new Uint16Array(32) : Q(32);
            for (f = 0; f < 32; ++f) j[f] = 0;
            for (f = i; f < c; ++f) a[f] = 0;
            i = a.length;
            var k = sa ? new Uint16Array(i) : Q(i);
            for (f = 0; f < i; ++f) j[e = a[f]]++, d < e && (d = e), k[f] = 0;
            for (j[0] = 0, f = 1; f <= d; ++f) j[f + 16] = h = h + j[f - 1] << 1;
            for (f = 0; f < i; ++f) 0 != (h = a[f]) && (k[f] = j[h + 16]++);
            var l = 0;
            for (f = 0; f < i; ++f) if (0 != (l = a[f])) for (h = I(k[f], d) >> d - l, g = (1 << d + 4 - l) - 1; g >= 0; --g) b[h | g << l] = 15 & l | f << 4;
            return d
        }

        function S(a, b) {
            var c = M(a, b) + 257;
            b += 5;
            var d = M(a, b) + 1;
            b += 5;
            var e = L(a, b) + 4;
            b += 4;
            for (var f = 0, g = sa ? new Uint8Array(19) : Q(19), h = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], i = 1, j = sa ? new Uint8Array(8) : Q(8), k = sa ? new Uint8Array(8) : Q(8), l = g.length, m = 0; m < e; ++m) g[pa[m]] = f = K(a, b), i < f && (i = f), j[f]++, b += 3;
            var n = 0;
            for (j[0] = 0, m = 1; m <= i; ++m) k[m] = n = n + j[m - 1] << 1;
            for (m = 0; m < l; ++m) 0 != (n = g[m]) && (h[m] = k[n]++);
            var o = 0;
            for (m = 0; m < l; ++m) if (0 != (o = g[m])) {
                n = ta[h[m]] >> 8 - o;
                for (var p = (1 << 7 - o) - 1; p >= 0; --p) Ba[n | p << o] = 7 & o | m << 3
            }
            var q = [];
            for (i = 1; q.length < c + d;) switch (n = Ba[N(a, b)], b += 7 & n, n >>>= 3) {
                case 16:
                    for (f = 3 + J(a, b), b += 2, n = q[q.length - 1]; f-- > 0;) q.push(n);
                    break;
                case 17:
                    for (f = 3 + K(a, b), b += 3; f-- > 0;) q.push(0);
                    break;
                case 18:
                    for (f = 11 + N(a, b), b += 7; f-- > 0;) q.push(0);
                    break;
                default:
                    q.push(n), i < n && (i = n)
            }
            var r = q.slice(0, c), s = q.slice(c);
            for (m = c; m < 286; ++m) r[m] = 0;
            for (m = d; m < 30; ++m) s[m] = 0;
            return Ca = R(r, za, 286), Da = R(s, Aa, 30), b
        }

        function T(a, b) {
            if (3 == a[0] && !(3 & a[1])) return [g(b), 2];
            for (var c = 0, d = 0, e = h(b || 1 << 18), f = 0, i = e.length >>> 0, j = 0, k = 0; 0 == (1 & d);) if (d = K(a, c), c += 3, d >>> 1 != 0) for (d >>> 1 == 1 ? (j = 9, k = 5) : (c = S(a, c), j = Ca, k = Da), !b && i < f + 32767 && (e = P(e, f + 32767), i = e.length); ;) {
                var l = O(a, c, j), m = d >>> 1 == 1 ? wa[l] : za[l];
                if (c += 15 & m, 0 == ((m >>>= 4) >>> 8 & 255)) e[f++] = m; else {
                    if (256 == m) break;
                    m -= 257;
                    var n = m < 8 ? 0 : m - 4 >> 2;
                    n > 5 && (n = 0);
                    var o = f + qa[m];
                    n > 0 && (o += O(a, c, n), c += n), l = O(a, c, k), m = d >>> 1 == 1 ? xa[l] : Aa[l], c += 15 & m, m >>>= 4;
                    var p = m < 4 ? 0 : m - 2 >> 1, q = ra[m];
                    for (p > 0 && (q += O(a, c, p), c += p), !b && i < o && (e = P(e, o), i = e.length); f < o;) e[f] = e[f - q], ++f
                }
            } else {
                7 & c && (c += 8 - (7 & c));
                var r = a[c >>> 3] | a[1 + (c >>> 3)] << 8;
                if (c += 32, !b && i < f + r && (e = P(e, f + r), i = e.length), "function" == typeof a.copy) a.copy(e, f, c >>> 3, (c >>> 3) + r), f += r, c += 8 * r; else for (; r-- > 0;) e[f++] = a[c >>> 3], c += 8
            }
            return [b ? e : e.slice(0, f), c + 7 >>> 3]
        }

        function U(a, b) {
            var c = a.slice(a.l || 0), d = T(c, b);
            return a.l += d[1], d[0]
        }

        function V(a, b) {
            if (!a) throw new Error(b);
            "undefined" != typeof console && console.error(b)
        }

        function W(a, b) {
            var c = a;
            ga(c, 0);
            var d = [], e = [], g = {FileIndex: d, FullPaths: e};
            w(g, {root: b.root});
            for (var h = c.length - 4; (80 != c[h] || 75 != c[h + 1] || 5 != c[h + 2] || 6 != c[h + 3]) && h >= 0;) --h;
            c.l = h + 4, c.l += 4;
            var i = c.read_shift(2);
            c.l += 6;
            var j = c.read_shift(4);
            for (c.l = j, h = 0; h < i; ++h) {
                c.l += 20;
                var k = c.read_shift(4), l = c.read_shift(4), m = c.read_shift(2), n = c.read_shift(2),
                    o = c.read_shift(2);
                c.l += 8;
                var p = c.read_shift(4), q = f(c.slice(c.l + m, c.l + m + n));
                c.l += m + n + o;
                var r = c.l;
                c.l = p + 4, X(c, k, l, g, q), c.l = r
            }
            return g
        }

        function X(a, b, c, d, g) {
            a.l += 2;
            var h = a.read_shift(2), i = a.read_shift(2), j = e(a);
            if (8257 & h) throw new Error("Unsupported ZIP encryption");
            for (var k = a.read_shift(4), l = a.read_shift(4), m = a.read_shift(4), n = a.read_shift(2), o = a.read_shift(2), p = "", q = 0; q < n; ++q) p += String.fromCharCode(a[a.l++]);
            if (o) {
                var r = f(a.slice(a.l, a.l + o));
                (r[21589] || {}).mt && (j = r[21589].mt), ((g || {})[21589] || {}).mt && (j = g[21589].mt)
            }
            a.l += o;
            var s = a.slice(a.l, a.l + l);
            switch (i) {
                case 8:
                    s = F(a, m);
                    break;
                case 0:
                    break;
                default:
                    throw new Error("Unsupported ZIP Compression method " + i)
            }
            var t = !1;
            8 & h && (k = a.read_shift(4), 134695760 == k && (k = a.read_shift(4), t = !0), l = a.read_shift(4), m = a.read_shift(4)), l != b && V(t, "Bad compressed size: " + b + " != " + l), m != c && V(t, "Bad uncompressed size: " + c + " != " + m);
            var u = Vl.buf(s, 0);
            k != u && V(t, "Bad CRC32 checksum: " + k + " != " + u), $(d, p, s, {unsafe: !0, mt: j})
        }

        function Y(a, b) {
            var c = b || {}, e = [], f = [], g = ia(1), h = c.compression ? 8 : 0, i = 0;
            var j = 0, k = 0, l = 0, m = 0, n = a.FullPaths[0], o = n, p = a.FileIndex[0], q = [], r = 0;
            for (j = 1; j < a.FullPaths.length; ++j) if (o = a.FullPaths[j].slice(n.length), p = a.FileIndex[j], p.size && p.content && "Sh33tJ5" != o) {
                var s = l, t = ia(o.length);
                for (k = 0; k < o.length; ++k) t.write_shift(1, 127 & o.charCodeAt(k));
                t = t.slice(0, t.l), q[m] = Vl.buf(p.content, 0);
                var u = p.content;
                8 == h && (u = G(u)), g = ia(30), g.write_shift(4, 67324752), g.write_shift(2, 20), g.write_shift(2, i), g.write_shift(2, h), p.mt ? d(g, p.mt) : g.write_shift(4, 0), g.write_shift(-4, 8 & i ? 0 : q[m]), g.write_shift(4, 8 & i ? 0 : u.length), g.write_shift(4, 8 & i ? 0 : p.content.length), g.write_shift(2, t.length), g.write_shift(2, 0), l += g.length, e.push(g), l += t.length, e.push(t), l += u.length, e.push(u), 8 & i && (g = ia(12), g.write_shift(-4, q[m]), g.write_shift(4, u.length), g.write_shift(4, p.content.length), l += g.l, e.push(g)), g = ia(46), g.write_shift(4, 33639248), g.write_shift(2, 0), g.write_shift(2, 20), g.write_shift(2, i), g.write_shift(2, h), g.write_shift(4, 0), g.write_shift(-4, q[m]), g.write_shift(4, u.length), g.write_shift(4, p.content.length), g.write_shift(2, t.length), g.write_shift(2, 0), g.write_shift(2, 0), g.write_shift(2, 0), g.write_shift(2, 0), g.write_shift(4, 0), g.write_shift(4, s), r += g.l, f.push(g), r += t.length, f.push(t), ++m
            }
            return g = ia(22), g.write_shift(4, 101010256), g.write_shift(2, 0), g.write_shift(2, 0), g.write_shift(2, m), g.write_shift(2, m), g.write_shift(4, r), g.write_shift(4, l), g.write_shift(2, 0), Ql([Ql(e), Ql(f), g])
        }

        function Z(a) {
            var b = {};
            return w(b, a), b
        }

        function $(a, b, d, e) {
            var f = e && e.unsafe;
            f || w(a);
            var g = !f && $l.find(a, b);
            if (!g) {
                var h = a.FullPaths[0];
                b.slice(0, h.length) == h ? h = b : ("/" != h.slice(-1) && (h += "/"), h = (h + b).replace("//", "/")), g = {
                    name: c(b),
                    type: 2
                }, a.FileIndex.push(g), a.FullPaths.push(h), f || $l.utils.cfb_gc(a)
            }
            return g.content = d, g.size = d ? d.length : 0, e && (e.CLSID && (g.clsid = e.CLSID), e.mt && (g.mt = e.mt), e.ct && (g.ct = e.ct)), g
        }

        function _(a, b) {
            w(a);
            var c = $l.find(a, b);
            if (c) for (var d = 0; d < a.FileIndex.length; ++d) if (a.FileIndex[d] == c) return a.FileIndex.splice(d, 1), a.FullPaths.splice(d, 1), !0;
            return !1
        }

        function aa(a, b, d) {
            w(a);
            var e = $l.find(a, b);
            if (e) for (var f = 0; f < a.FileIndex.length; ++f) if (a.FileIndex[f] == e) return a.FileIndex[f].name = c(d), a.FullPaths[f] = d, !0;
            return !1
        }

        function ba(a) {
            y(a, !0)
        }

        var ca = {};
        ca.version = "1.1.0";
        for (var ea, ha, ja = 64, ka = -2, la = "d0cf11e0a1b11ae1", ma = [208, 207, 17, 224, 161, 177, 26, 225], na = "00000000000000000000000000000000", oa = {
            MAXREGSECT: -6,
            DIFSECT: -4,
            FATSECT: -3,
            ENDOFCHAIN: ka,
            FREESECT: -1,
            HEADER_SIGNATURE: la,
            HEADER_MINOR_VERSION: "3e00",
            MAXREGSID: -6,
            NOSTREAM: -1,
            HEADER_CLSID: na,
            EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
        }, pa = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], qa = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], ra = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577], sa = "undefined" != typeof Uint8Array, ta = sa ? new Uint8Array(256) : [], ua = 0; ua < 256; ++ua) ta[ua] = H(ua);
        var va = function () {
            var a = function () {
                return function (a, b) {
                    for (var c = 0; c < a.length;) {
                        var d = Math.min(65535, a.length - c), e = c + d == a.length;
                        for (b.write_shift(1, +e), b.write_shift(2, d), b.write_shift(2, 65535 & ~d); d-- > 0;) b[b.l++] = a[c++]
                    }
                    return b.l
                }
            }();
            return function (b) {
                var c = ia(50 + Math.floor(1.1 * b.length)), d = a(b, c);
                return c.slice(0, d)
            }
        }(), wa = sa ? new Uint16Array(512) : Q(512), xa = sa ? new Uint16Array(32) : Q(32);
        if (!sa) {
            for (var ya = 0; ya < 512; ++ya) wa[ya] = 0;
            for (ya = 0; ya < 32; ++ya) xa[ya] = 0
        }
        !function () {
            for (var a = [], b = 0; b < 32; b++) a.push(5);
            R(a, xa, 32);
            var c = [];
            for (b = 0; b <= 143; b++) c.push(8);
            for (; b <= 255; b++) c.push(9);
            for (; b <= 279; b++) c.push(7);
            for (; b <= 287; b++) c.push(8);
            R(c, wa, 288)
        }();
        var za = sa ? new Uint16Array(32768) : Q(32768), Aa = sa ? new Uint16Array(32768) : Q(32768),
            Ba = sa ? new Uint16Array(128) : Q(128), Ca = 1, Da = 1;
        return ca.find = A, ca.read = v, ca.parse = j, ca.write = D, ca.writeFile = B, ca.utils = {
            cfb_new: Z,
            cfb_add: $,
            cfb_del: _,
            cfb_mov: aa,
            cfb_gc: ba,
            ReadShift: da,
            CheckField: fa,
            prep_blob: ga,
            bconcat: Ql,
            use_zlib: E,
            _deflateRaw: va,
            _inflateRaw: U,
            consts: oa
        }, ca
    }();
    "undefined" != typeof require && "undefined" != typeof module && void 0 === Zl && (module.exports = $l);
    var _l;
    if ("undefined" != typeof require) try {
        _l = require("fs")
    } catch (a) {
    }
    var am = new Date(1899, 11, 30, 0, 0, 0),
        bm = am.getTime() + 6e4 * ((new Date).getTimezoneOffset() - am.getTimezoneOffset()),
        cm = new Date("2017-02-19T19:06:09.000Z");
    isNaN(cm.getFullYear()) && (cm = new Date("2/19/17"));
    var dm, em = 2017 == cm.getFullYear(), fm = 5 == "abacaba".split(/(:?b)/i).length;
    "undefined" != typeof JSZipSync && (dm = JSZipSync), "undefined" != typeof exports && "undefined" != typeof module && module.exports && void 0 === dm && (dm = void 0);
    var gm = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n',
        hm = /([^"\s?>\/]+)\s*=\s*((?:")([^"]*)(?:")|(?:')([^']*)(?:')|([^'">\s]+))/g,
        im = /<[\/\?]?[a-zA-Z0-9:]+(?:\s+[^"\s?>\/]+\s*=\s*(?:"[^"]*"|'[^']*'|[^'">\s=]+))*\s?[\/\?]?>/g;
    gm.match(im) || (im = /<[^>]*>/g);
    var jm = /<\w*:/, km = /<(\/?)\w+:/, lm = {"&quot;": '"', "&apos;": "'", "&gt;": ">", "&lt;": "<", "&amp;": "&"},
        mm = t(lm), nm = function () {
            var a = /&(?:quot|apos|gt|lt|amp|#x?([\da-fA-F]+));/g, b = /_x([\da-fA-F]{4})_/g;
            return function c(d) {
                var e = d + "", f = e.indexOf("<![CDATA[");
                if (-1 == f) return e.replace(a, function (a, b) {
                    return lm[a] || String.fromCharCode(parseInt(b, a.indexOf("x") > -1 ? 16 : 10)) || a
                }).replace(b, function (a, b) {
                    return String.fromCharCode(parseInt(b, 16))
                });
                var g = e.indexOf("]]>");
                return c(e.slice(0, f)) + e.slice(f + 9, g) + c(e.slice(g + 3))
            }
        }(), om = /[&<>'"]/g, pm = /[\u0000-\u0008\u000b-\u001f]/g, qm = /[\u0000-\u001f]/g, rm = function () {
            function a(a, b) {
                return String.fromCharCode(parseInt(b, 10))
            }

            var b = /&#(\d+);/g;
            return function (c) {
                return c.replace(b, a)
            }
        }(), sm = function () {
            return function (a) {
                return a.replace(/(\r\n|[\r\n])/g, "&#10;")
            }
        }(), tm = function (a) {
            for (var b = "", c = 0, d = 0, e = 0, f = 0, g = 0, h = 0; c < a.length;) d = a.charCodeAt(c++), d < 128 ? b += String.fromCharCode(d) : (e = a.charCodeAt(c++), d > 191 && d < 224 ? (g = (31 & d) << 6, g |= 63 & e, b += String.fromCharCode(g)) : (f = a.charCodeAt(c++), d < 240 ? b += String.fromCharCode((15 & d) << 12 | (63 & e) << 6 | 63 & f) : (g = a.charCodeAt(c++), h = ((7 & d) << 18 | (63 & e) << 12 | (63 & f) << 6 | 63 & g) - 65536, b += String.fromCharCode(55296 + (h >>> 10 & 1023)), b += String.fromCharCode(56320 + (1023 & h)))));
            return b
        }, um = function (a) {
            for (var b = [], c = 0, d = 0, e = 0; c < a.length;) switch (d = a.charCodeAt(c++), !0) {
                case d < 128:
                    b.push(String.fromCharCode(d));
                    break;
                case d < 2048:
                    b.push(String.fromCharCode(192 + (d >> 6))), b.push(String.fromCharCode(128 + (63 & d)));
                    break;
                case d >= 55296 && d < 57344:
                    d -= 55296, e = a.charCodeAt(c++) - 56320 + (d << 10), b.push(String.fromCharCode(240 + (e >> 18 & 7))), b.push(String.fromCharCode(144 + (e >> 12 & 63))), b.push(String.fromCharCode(128 + (e >> 6 & 63))), b.push(String.fromCharCode(128 + (63 & e)));
                    break;
                default:
                    b.push(String.fromCharCode(224 + (d >> 12))), b.push(String.fromCharCode(128 + (d >> 6 & 63))), b.push(String.fromCharCode(128 + (63 & d)))
            }
            return b.join("")
        };
    if (Ml) {
        var vm = function (a) {
            var b, c, d, e = Buffer.alloc(2 * a.length), f = 1, g = 0, h = 0;
            for (c = 0; c < a.length; c += f) f = 1, (d = a.charCodeAt(c)) < 128 ? b = d : d < 224 ? (b = 64 * (31 & d) + (63 & a.charCodeAt(c + 1)), f = 2) : d < 240 ? (b = 4096 * (15 & d) + 64 * (63 & a.charCodeAt(c + 1)) + (63 & a.charCodeAt(c + 2)), f = 3) : (f = 4, b = 262144 * (7 & d) + 4096 * (63 & a.charCodeAt(c + 1)) + 64 * (63 & a.charCodeAt(c + 2)) + (63 & a.charCodeAt(c + 3)), b -= 65536, h = 55296 + (b >>> 10 & 1023), b = 56320 + (1023 & b)), 0 !== h && (e[g++] = 255 & h, e[g++] = h >>> 8, h = 0), e[g++] = b % 256, e[g++] = b >>> 8;
            return e.slice(0, g).toString("ucs2")
        }, wm = "foo bar bazâð£";
        tm(wm) == vm(wm) && (tm = vm);
        var xm = function (a) {
            return Nl(a, "binary").toString("utf8")
        };
        tm(wm) == xm(wm) && (tm = xm), um = function (a) {
            return Nl(a, "utf8").toString("binary")
        }
    }
    var ym = function () {
        var a = {};
        return function (b, c) {
            var d = b + "|" + (c || "");
            return a[d] ? a[d] : a[d] = new RegExp("<(?:\\w+:)?" + b + '(?: xml:space="preserve")?(?:[^>]*)>([\\s\\S]*?)</(?:\\w+:)?' + b + ">", c || "")
        }
    }(), zm = function () {
        var a = [["nbsp", " "], ["middot", "·"], ["quot", '"'], ["apos", "'"], ["gt", ">"], ["lt", "<"], ["amp", "&"]].map(function (a) {
            return [new RegExp("&" + a[0] + ";", "g"), a[1]]
        });
        return function (b) {
            for (var c = b.replace(/^[\t\n\r ]+/, "").replace(/[\t\n\r ]+$/, "").replace(/[\t\n\r ]+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, "\n").replace(/<[^>]*>/g, ""), d = 0; d < a.length; ++d) c = c.replace(a[d][0], a[d][1]);
            return c
        }
    }(), Am = function () {
        var a = {};
        return function (b) {
            return void 0 !== a[b] ? a[b] : a[b] = new RegExp("<(?:vt:)?" + b + ">([\\s\\S]*?)</(?:vt:)?" + b + ">", "g")
        }
    }(), Bm = /<\/?(?:vt:)?variant>/g, Cm = /<(?:vt:)([^>]*)>([\s\S]*)</, Dm = /(^\s|\s$|\n)/, Em = {
        dc: "http://purl.org/dc/elements/1.1/",
        dcterms: "http://purl.org/dc/terms/",
        dcmitype: "http://purl.org/dc/dcmitype/",
        mx: "http://schemas.microsoft.com/office/mac/excel/2008/main",
        r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
        sjs: "http://schemas.openxmlformats.org/package/2006/sheetjs/core-properties",
        vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
        xsi: "http://www.w3.org/2001/XMLSchema-instance",
        xsd: "http://www.w3.org/2001/XMLSchema"
    };
    Em.main = ["http://schemas.openxmlformats.org/spreadsheetml/2006/main", "http://purl.oclc.org/ooxml/spreadsheetml/main", "http://schemas.microsoft.com/office/excel/2006/main", "http://schemas.microsoft.com/office/excel/2006/2"];
    var Fm, Gm, Hm = {
        o: "urn:schemas-microsoft-com:office:office",
        x: "urn:schemas-microsoft-com:office:excel",
        ss: "urn:schemas-microsoft-com:office:spreadsheet",
        dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
        mv: "http://macVmlSchemaUri",
        v: "urn:schemas-microsoft-com:vml",
        html: "http://www.w3.org/TR/REC-html40"
    }, Im = function (a) {
        for (var b = [], c = 10240, d = 0; d < a[0].length; ++d) if (a[0][d]) for (var e = 0, f = a[0][d].length; e < f; e += c) b.push.apply(b, a[0][d].slice(e, e + c));
        return b
    }, Jm = Im, Km = function (a, b, c) {
        for (var d = [], e = b; e < c; e += 2) d.push(String.fromCharCode(an(a, e)));
        return d.join("").replace(Rl, "")
    }, Lm = Km, Mm = function (a, b, c) {
        for (var d = [], e = b; e < b + c; ++e) d.push(("0" + a[e].toString(16)).slice(-2));
        return d.join("")
    }, Nm = Mm, Om = function (a, b, c) {
        for (var d = [], e = b; e < c; e++) d.push(String.fromCharCode(_m(a, e)));
        return d.join("")
    }, Pm = Om, Qm = function (a, b) {
        var c = cn(a, b);
        return c > 0 ? Om(a, b + 4, b + 4 + c - 1) : ""
    }, Rm = Qm, Sm = function (a, b) {
        var c = cn(a, b);
        return c > 0 ? Om(a, b + 4, b + 4 + c - 1) : ""
    }, Tm = Sm, Um = function (a, b) {
        var c = 2 * cn(a, b);
        return c > 0 ? Om(a, b + 4, b + 4 + c - 1) : ""
    }, Vm = Um;
    Fm = Gm = function (a, b) {
        var c = cn(a, b);
        return c > 0 ? Km(a, b + 4, b + 4 + c) : ""
    };
    var Wm, Xm, Ym = function (a, b) {
        var c = cn(a, b);
        return c > 0 ? Om(a, b + 4, b + 4 + c) : ""
    }, Zm = Ym;
    Wm = Xm = function (a, b) {
        return ba(a, b)
    };
    var $m = function (a) {
        return Array.isArray(a)
    };
    Ml && (Km = function (a, b, c) {
        return Buffer.isBuffer(a) ? a.toString("utf16le", b, c).replace(Rl, "") : Lm(a, b, c)
    }, Mm = function (a, b, c) {
        return Buffer.isBuffer(a) ? a.toString("hex", b, b + c) : Nm(a, b, c)
    }, Qm = function (a, b) {
        if (!Buffer.isBuffer(a)) return Rm(a, b);
        var c = a.readUInt32LE(b);
        return c > 0 ? a.toString("utf8", b + 4, b + 4 + c - 1) : ""
    }, Sm = function (a, b) {
        if (!Buffer.isBuffer(a)) return Tm(a, b);
        var c = a.readUInt32LE(b);
        return c > 0 ? a.toString("utf8", b + 4, b + 4 + c - 1) : ""
    }, Um = function (a, b) {
        if (!Buffer.isBuffer(a)) return Vm(a, b);
        var c = 2 * a.readUInt32LE(b);
        return a.toString("utf16le", b + 4, b + 4 + c - 1)
    }, Fm = function (a, b) {
        if (!Buffer.isBuffer(a)) return Gm(a, b);
        var c = a.readUInt32LE(b);
        return a.toString("utf16le", b + 4, b + 4 + c)
    }, Ym = function (a, b) {
        if (!Buffer.isBuffer(a)) return Zm(a, b);
        var c = a.readUInt32LE(b);
        return a.toString("utf8", b + 4, b + 4 + c)
    }, Om = function (a, b, c) {
        return Buffer.isBuffer(a) ? a.toString("utf8", b, c) : Pm(a, b, c)
    }, Im = function (a) {
        return a[0].length > 0 && Buffer.isBuffer(a[0][0]) ? Buffer.concat(a[0]) : Jm(a)
    }, Ql = function (a) {
        return Buffer.isBuffer(a[0]) ? Buffer.concat(a) : [].concat.apply([], a)
    }, Wm = function (a, b) {
        return Buffer.isBuffer(a) ? a.readDoubleLE(b) : Xm(a, b)
    }, $m = function (a) {
        return Buffer.isBuffer(a) || Array.isArray(a)
    }), "undefined" != typeof cptable && (Km = function (a, b, c) {
        return cptable.utils.decode(1200, a.slice(b, c)).replace(Rl, "")
    }, Om = function (a, b, c) {
        return cptable.utils.decode(65001, a.slice(b, c))
    }, Qm = function (a, b) {
        var c = cn(a, b);
        return c > 0 ? cptable.utils.decode(Bl, a.slice(b + 4, b + 4 + c - 1)) : ""
    }, Sm = function (a, b) {
        var c = cn(a, b);
        return c > 0 ? cptable.utils.decode(Al, a.slice(b + 4, b + 4 + c - 1)) : ""
    }, Um = function (a, b) {
        var c = 2 * cn(a, b);
        return c > 0 ? cptable.utils.decode(1200, a.slice(b + 4, b + 4 + c - 1)) : ""
    }, Fm = function (a, b) {
        var c = cn(a, b);
        return c > 0 ? cptable.utils.decode(1200, a.slice(b + 4, b + 4 + c)) : ""
    }, Ym = function (a, b) {
        var c = cn(a, b);
        return c > 0 ? cptable.utils.decode(65001, a.slice(b + 4, b + 4 + c)) : ""
    });
    var _m = function (a, b) {
        return a[b]
    }, an = function (a, b) {
        return 256 * a[b + 1] + a[b]
    }, bn = function (a, b) {
        var c = 256 * a[b + 1] + a[b];
        return c < 32768 ? c : -1 * (65535 - c + 1)
    }, cn = function (a, b) {
        return a[b + 3] * (1 << 24) + (a[b + 2] << 16) + (a[b + 1] << 8) + a[b]
    }, dn = function (a, b) {
        return a[b + 3] << 24 | a[b + 2] << 16 | a[b + 1] << 8 | a[b]
    }, en = function (a, b) {
        return a[b] << 24 | a[b + 1] << 16 | a[b + 2] << 8 | a[b + 3]
    }, fn = function (a, b, c) {
        a[c] = 255 & b, a[c + 1] = b >>> 8 & 255, a[c + 2] = b >>> 16 & 255, a[c + 3] = b >>> 24 & 255
    }, gn = function (a, b, c) {
        a[c] = 255 & b, a[c + 1] = b >> 8 & 255, a[c + 2] = b >> 16 & 255, a[c + 3] = b >> 24 & 255
    }, hn = function (a, b, c) {
        a[c] = 255 & b, a[c + 1] = b >>> 8 & 255
    }, jn = {};
    !function (a, b) {
        var c;
        if (void 0 !== b) c = b; else if ("undefined" != typeof require) try {
            c = void 0
        } catch (a) {
            c = null
        }
        a.rc4 = function (a, b) {
            var c = new Array(256), d = 0, e = 0, f = 0, g = 0;
            for (e = 0; 256 != e; ++e) c[e] = e;
            for (e = 0; 256 != e; ++e) f = f + c[e] + a[e % a.length].charCodeAt(0) & 255, g = c[e], c[e] = c[f], c[f] = g;
            e = f = 0;
            var h = Buffer(b.length);
            for (d = 0; d != b.length; ++d) e = e + 1 & 255, f = (f + c[e]) % 256, g = c[e], c[e] = c[f], c[f] = g, h[d] = b[d] ^ c[c[e] + c[f] & 255];
            return h
        }, a.md5 = function (a) {
            if (!c) throw new Error("Unsupported crypto");
            return c.createHash("md5").update(a).digest("hex")
        }
    }(jn, "undefined" != typeof crypto ? crypto : void 0);
    var kn = Oa, ln = Ka, mn = La, nn = Ka, on = Ta, pn = Ua, qn = Xa, rn = Ya, sn = {
            0: "#NULL!",
            7: "#DIV/0!",
            15: "#VALUE!",
            23: "#REF!",
            29: "#NAME?",
            36: "#NUM!",
            42: "#N/A",
            43: "#GETTING_DATA",
            255: "#WTF?"
        }, tn = u(sn), un = 2, vn = 3, wn = 11, xn = 12, yn = 19, zn = 30, An = 64, Bn = 65, Cn = 71, Dn = 4096, En = 80,
        Fn = 81, Gn = [En, Fn], Hn = {
            1: {n: "CodePage", t: un},
            2: {n: "Category", t: En},
            3: {n: "PresentationFormat", t: En},
            4: {n: "ByteCount", t: vn},
            5: {n: "LineCount", t: vn},
            6: {n: "ParagraphCount", t: vn},
            7: {n: "SlideCount", t: vn},
            8: {n: "NoteCount", t: vn},
            9: {n: "HiddenCount", t: vn},
            10: {n: "MultimediaClipCount", t: vn},
            11: {n: "ScaleCrop", t: wn},
            12: {n: "HeadingPairs", t: Dn | xn},
            13: {n: "TitlesOfParts", t: Dn | zn},
            14: {n: "Manager", t: En},
            15: {n: "Company", t: En},
            16: {n: "LinksUpToDate", t: wn},
            17: {n: "CharacterCount", t: vn},
            19: {n: "SharedDoc", t: wn},
            22: {n: "HyperlinksChanged", t: wn},
            23: {n: "AppVersion", t: vn, p: "version"},
            24: {n: "DigSig", t: Bn},
            26: {n: "ContentType", t: En},
            27: {n: "ContentStatus", t: En},
            28: {n: "Language", t: En},
            29: {n: "Version", t: En},
            255: {}
        }, In = {
            1: {n: "CodePage", t: un},
            2: {n: "Title", t: En},
            3: {n: "Subject", t: En},
            4: {n: "Author", t: En},
            5: {n: "Keywords", t: En},
            6: {n: "Comments", t: En},
            7: {n: "Template", t: En},
            8: {n: "LastAuthor", t: En},
            9: {n: "RevNumber", t: En},
            10: {n: "EditTime", t: An},
            11: {n: "LastPrinted", t: An},
            12: {n: "CreatedDate", t: An},
            13: {n: "ModifiedDate", t: An},
            14: {n: "PageCount", t: vn},
            15: {n: "WordCount", t: vn},
            16: {n: "CharCount", t: vn},
            17: {n: "Thumbnail", t: Cn},
            18: {n: "Application", t: En},
            19: {n: "DocSecurity", t: vn},
            255: {}
        }, Jn = {2147483648: {n: "Locale", t: yn}, 2147483651: {n: "Behavior", t: yn}, 1919054434: {}};
    !function () {
        for (var a in Jn) Jn.hasOwnProperty(a) && (Hn[a] = In[a] = Jn[a])
    }();
    var Kn = s(Hn, "n"), Ln = s(In, "n"), Mn = {
            1: "US",
            2: "CA",
            3: "",
            7: "RU",
            20: "EG",
            30: "GR",
            31: "NL",
            32: "BE",
            33: "FR",
            34: "ES",
            36: "HU",
            39: "IT",
            41: "CH",
            43: "AT",
            44: "GB",
            45: "DK",
            46: "SE",
            47: "NO",
            48: "PL",
            49: "DE",
            52: "MX",
            55: "BR",
            61: "AU",
            64: "NZ",
            66: "TH",
            81: "JP",
            82: "KR",
            84: "VN",
            86: "CN",
            90: "TR",
            105: "JS",
            213: "DZ",
            216: "MA",
            218: "LY",
            351: "PT",
            354: "IS",
            358: "FI",
            420: "CZ",
            886: "TW",
            961: "LB",
            962: "JO",
            963: "SY",
            964: "IQ",
            965: "KW",
            966: "SA",
            971: "AE",
            972: "IL",
            974: "QA",
            981: "IR",
            65535: "US"
        },
        Nn = [null, "solid", "mediumGray", "darkGray", "lightGray", "darkHorizontal", "darkVertical", "darkDown", "darkUp", "darkGrid", "darkTrellis", "lightHorizontal", "lightVertical", "lightDown", "lightUp", "lightGrid", "lightTrellis", "gray125", "gray0625"],
        On = gb([0, 16777215, 16711680, 65280, 255, 16776960, 16711935, 65535, 0, 16777215, 16711680, 65280, 255, 16776960, 16711935, 65535, 8388608, 32768, 128, 8421376, 8388736, 32896, 12632256, 8421504, 10066431, 10040166, 16777164, 13434879, 6684774, 16744576, 26316, 13421823, 128, 16711935, 16776960, 65535, 8388736, 8388608, 32896, 255, 52479, 13434879, 13434828, 16777113, 10079487, 16751052, 13408767, 16764057, 3368703, 3394764, 10079232, 16763904, 16750848, 16737792, 6710937, 9868950, 13158, 3381606, 13056, 3355392, 10040064, 10040166, 3355545, 3355443, 16777215, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
        Pn = {
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": "workbooks",
            "application/vnd.ms-excel.binIndexWs": "TODO",
            "application/vnd.ms-excel.intlmacrosheet": "TODO",
            "application/vnd.ms-excel.binIndexMs": "TODO",
            "application/vnd.openxmlformats-package.core-properties+xml": "coreprops",
            "application/vnd.openxmlformats-officedocument.custom-properties+xml": "custprops",
            "application/vnd.openxmlformats-officedocument.extended-properties+xml": "extprops",
            "application/vnd.openxmlformats-officedocument.customXmlProperties+xml": "TODO",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty": "TODO",
            "application/vnd.ms-excel.pivotTable": "TODO",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml": "TODO",
            "application/vnd.ms-office.chartcolorstyle+xml": "TODO",
            "application/vnd.ms-office.chartstyle+xml": "TODO",
            "application/vnd.ms-excel.calcChain": "calcchains",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml": "calcchains",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings": "TODO",
            "application/vnd.ms-office.activeX": "TODO",
            "application/vnd.ms-office.activeX+xml": "TODO",
            "application/vnd.ms-excel.attachedToolbars": "TODO",
            "application/vnd.ms-excel.connections": "TODO",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": "TODO",
            "application/vnd.ms-excel.externalLink": "links",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml": "links",
            "application/vnd.ms-excel.sheetMetadata": "TODO",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml": "TODO",
            "application/vnd.ms-excel.pivotCacheDefinition": "TODO",
            "application/vnd.ms-excel.pivotCacheRecords": "TODO",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml": "TODO",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml": "TODO",
            "application/vnd.ms-excel.queryTable": "TODO",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml": "TODO",
            "application/vnd.ms-excel.userNames": "TODO",
            "application/vnd.ms-excel.revisionHeaders": "TODO",
            "application/vnd.ms-excel.revisionLog": "TODO",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml": "TODO",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml": "TODO",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml": "TODO",
            "application/vnd.ms-excel.tableSingleCells": "TODO",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml": "TODO",
            "application/vnd.ms-excel.slicer": "TODO",
            "application/vnd.ms-excel.slicerCache": "TODO",
            "application/vnd.ms-excel.slicer+xml": "TODO",
            "application/vnd.ms-excel.slicerCache+xml": "TODO",
            "application/vnd.ms-excel.wsSortMap": "TODO",
            "application/vnd.ms-excel.table": "TODO",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": "TODO",
            "application/vnd.openxmlformats-officedocument.theme+xml": "themes",
            "application/vnd.openxmlformats-officedocument.themeOverride+xml": "TODO",
            "application/vnd.ms-excel.Timeline+xml": "TODO",
            "application/vnd.ms-excel.TimelineCache+xml": "TODO",
            "application/vnd.ms-office.vbaProject": "vba",
            "application/vnd.ms-office.vbaProjectSignature": "vba",
            "application/vnd.ms-office.volatileDependencies": "TODO",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml": "TODO",
            "application/vnd.ms-excel.controlproperties+xml": "TODO",
            "application/vnd.openxmlformats-officedocument.model+data": "TODO",
            "application/vnd.ms-excel.Survey+xml": "TODO",
            "application/vnd.openxmlformats-officedocument.drawing+xml": "drawings",
            "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": "TODO",
            "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": "TODO",
            "application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml": "TODO",
            "application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml": "TODO",
            "application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml": "TODO",
            "application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml": "TODO",
            "application/vnd.openxmlformats-officedocument.vmlDrawing": "TODO",
            "application/vnd.openxmlformats-package.relationships+xml": "rels",
            "application/vnd.openxmlformats-officedocument.oleObject": "TODO",
            "image/png": "TODO",
            sheet: "js"
        }, Qn = function () {
            var a = {
                workbooks: {
                    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
                    xlsm: "application/vnd.ms-excel.sheet.macroEnabled.main+xml",
                    xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.main",
                    xlam: "application/vnd.ms-excel.addin.macroEnabled.main+xml",
                    xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml"
                },
                strs: {
                    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",
                    xlsb: "application/vnd.ms-excel.sharedStrings"
                },
                comments: {
                    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml",
                    xlsb: "application/vnd.ms-excel.comments"
                },
                sheets: {
                    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
                    xlsb: "application/vnd.ms-excel.worksheet"
                },
                charts: {
                    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",
                    xlsb: "application/vnd.ms-excel.chartsheet"
                },
                dialogs: {
                    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml",
                    xlsb: "application/vnd.ms-excel.dialogsheet"
                },
                macros: {xlsx: "application/vnd.ms-excel.macrosheet+xml", xlsb: "application/vnd.ms-excel.macrosheet"},
                styles: {
                    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",
                    xlsb: "application/vnd.ms-excel.styles"
                }
            };
            return r(a).forEach(function (b) {
                ["xlsm", "xlam"].forEach(function (c) {
                    a[b][c] || (a[b][c] = a[b].xlsx)
                })
            }), r(a).forEach(function (b) {
                r(a[b]).forEach(function (c) {
                    Pn[a[b][c]] = b
                })
            }), a
        }(), Rn = v(Pn);
    Em.CT = "http://schemas.openxmlformats.org/package/2006/content-types";
    var Sn = Z("Types", null, {xmlns: Em.CT, "xmlns:xsd": Em.xsd, "xmlns:xsi": Em.xsi}),
        Tn = [["xml", "application/xml"], ["bin", "application/vnd.ms-excel.sheet.binary.macroEnabled.main"], ["vml", "application/vnd.openxmlformats-officedocument.vmlDrawing"], ["bmp", "image/bmp"], ["png", "image/png"], ["gif", "image/gif"], ["emf", "image/x-emf"], ["wmf", "image/x-wmf"], ["jpg", "image/jpeg"], ["jpeg", "image/jpeg"], ["tif", "image/tiff"], ["tiff", "image/tiff"], ["pdf", "application/pdf"], ["rels", Rn.rels[0]]].map(function (a) {
            return Z("Default", null, {Extension: a[0], ContentType: a[1]})
        }), Un = {
            WB: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
            SHEET: "http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
            HLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
            VML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",
            VBA: "http://schemas.microsoft.com/office/2006/relationships/vbaProject"
        };
    Em.RELS = "http://schemas.openxmlformats.org/package/2006/relationships";
    var Vn = Z("Relationships", null, {xmlns: Em.RELS}), Wn = "application/vnd.oasis.opendocument.spreadsheet",
        Xn = function () {
            var b = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' + a.version + "</meta:generator></office:meta></office:document-meta>";
            return function () {
                return b
            }
        }(),
        Yn = [["cp:category", "Category"], ["cp:contentStatus", "ContentStatus"], ["cp:keywords", "Keywords"], ["cp:lastModifiedBy", "LastAuthor"], ["cp:lastPrinted", "LastPrinted"], ["cp:revision", "RevNumber"], ["cp:version", "Version"], ["dc:creator", "Author"], ["dc:description", "Comments"], ["dc:identifier", "Identifier"], ["dc:language", "Language"], ["dc:subject", "Subject"], ["dc:title", "Title"], ["dcterms:created", "CreatedDate", "date"], ["dcterms:modified", "ModifiedDate", "date"]];
    Em.CORE_PROPS = "http://schemas.openxmlformats.org/package/2006/metadata/core-properties", Un.CORE_PROPS = "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties";
    var Zn = function () {
            for (var a = new Array(Yn.length), b = 0; b < Yn.length; ++b) {
                var c = Yn[b], d = "(?:" + c[0].slice(0, c[0].indexOf(":")) + ":)" + c[0].slice(c[0].indexOf(":") + 1);
                a[b] = new RegExp("<" + d + "[^>]*>([\\s\\S]*?)</" + d + ">")
            }
            return a
        }(), $n = Z("cp:coreProperties", null, {
            "xmlns:cp": Em.CORE_PROPS,
            "xmlns:dc": Em.dc,
            "xmlns:dcterms": Em.dcterms,
            "xmlns:dcmitype": Em.dcmitype,
            "xmlns:xsi": Em.xsi
        }),
        _n = [["Application", "Application", "string"], ["AppVersion", "AppVersion", "string"], ["Company", "Company", "string"], ["DocSecurity", "DocSecurity", "string"], ["Manager", "Manager", "string"], ["HyperlinksChanged", "HyperlinksChanged", "bool"], ["SharedDoc", "SharedDoc", "bool"], ["LinksUpToDate", "LinksUpToDate", "bool"], ["ScaleCrop", "ScaleCrop", "bool"], ["HeadingPairs", "HeadingPairs", "raw"], ["TitlesOfParts", "TitlesOfParts", "raw"]];
    Em.EXT_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties", Un.EXT_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties";
    var ao = ["Worksheets", "SheetNames", "NamedRanges", "DefinedNames", "Chartsheets", "ChartNames"],
        bo = Z("Properties", null, {xmlns: Em.EXT_PROPS, "xmlns:vt": Em.vt});
    Em.CUST_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties", Un.CUST_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties";
    var co = /<[^>]+>[^<]*/g, eo = Z("Properties", null, {xmlns: Em.CUST_PROPS, "xmlns:vt": Em.vt}), fo = {
            Title: "Title",
            Subject: "Subject",
            Author: "Author",
            Keywords: "Keywords",
            Comments: "Description",
            LastAuthor: "LastAuthor",
            RevNumber: "Revision",
            Application: "AppName",
            LastPrinted: "LastPrinted",
            CreatedDate: "Created",
            ModifiedDate: "LastSaved",
            Category: "Category",
            Manager: "Manager",
            Company: "Company",
            AppVersion: "Version",
            ContentStatus: "ContentStatus",
            Identifier: "Identifier",
            Language: "Language"
        }, go = t(fo),
        ho = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"].concat(ao), io = Gc,
        jo = {
            0: Kc,
            4: Kc,
            5: Kc,
            6: Kc,
            7: Jc,
            8: Kc,
            9: Kc,
            10: Kc,
            11: Kc,
            12: Kc,
            13: Ic,
            14: Kc,
            15: Kc,
            16: Kc,
            17: Kc,
            18: Kc,
            19: Kc,
            20: Kc,
            21: Hc
        }, ko = mc, lo = Ac,
        mo = ["_xlnm.Consolidate_Area", "_xlnm.Auto_Open", "_xlnm.Auto_Close", "_xlnm.Extract", "_xlnm.Database", "_xlnm.Criteria", "_xlnm.Print_Area", "_xlnm.Print_Titles", "_xlnm.Recorder", "_xlnm.Data_Form", "_xlnm.Auto_Activate", "_xlnm.Auto_Deactivate", "_xlnm.Sheet_Title", "_xlnm._FilterDatabase"],
        no = [];
    no[8] = function (a, b) {
        var c = a.l + b;
        a.l += 10;
        var d = a.read_shift(2);
        a.l += 4, a.l += 2, a.l += 2, a.l += 2, a.l += 4;
        var e = a.read_shift(1);
        return a.l += e, a.l = c, {fmt: d}
    };
    var oo = xc, po = fc, qo = lc, ro = function () {
            function a(a, b) {
                var c = [], d = g(1);
                switch (b.type) {
                    case"base64":
                        d = Pl(Ll.decode(a));
                        break;
                    case"binary":
                        d = Pl(a);
                        break;
                    case"buffer":
                    case"array":
                        d = a
                }
                ga(d, 0);
                var f = d.read_shift(1), h = !1, i = !1, j = !1;
                switch (f) {
                    case 2:
                    case 3:
                        break;
                    case 48:
                        i = !0, h = !0;
                        break;
                    case 49:
                        i = !0;
                        break;
                    case 131:
                    case 139:
                        h = !0;
                        break;
                    case 140:
                        h = !0, j = !0;
                        break;
                    case 245:
                        h = !0;
                        break;
                    default:
                        throw new Error("DBF Unsupported Version: " + f.toString(16))
                }
                var k = 0, l = 0;
                2 == f && (k = d.read_shift(2)), d.l += 3, 2 != f && (k = d.read_shift(4)), 2 != f && (l = d.read_shift(2));
                var m = d.read_shift(2), n = 1252;
                2 != f && (d.l += 16, d.read_shift(1), 0 !== d[d.l] && (n = e[d[d.l]]), d.l += 1, d.l += 2), j && (d.l += 36);
                for (var o = [], p = {}, q = l - 10 - (i ? 264 : 0), r = j ? 32 : 11; 2 == f ? d.l < d.length && 13 != d[d.l] : d.l < q;) switch (p = {}, p.name = cptable.utils.decode(n, d.slice(d.l, d.l + r)).replace(/[\u0000\r\n].*$/g, ""), d.l += r, p.type = String.fromCharCode(d.read_shift(1)), 2 == f || j || (p.offset = d.read_shift(4)), p.len = d.read_shift(1), 2 == f && (p.offset = d.read_shift(2)), p.dec = d.read_shift(1), p.name.length && o.push(p), 2 != f && (d.l += j ? 13 : 14), p.type) {
                    case"B":
                        i && 8 == p.len || !b.WTF || console.log("Skipping " + p.name + ":" + p.type);
                        break;
                    case"G":
                    case"P":
                        b.WTF && console.log("Skipping " + p.name + ":" + p.type);
                        break;
                    case"C":
                    case"D":
                    case"F":
                    case"I":
                    case"L":
                    case"M":
                    case"N":
                    case"O":
                    case"T":
                    case"Y":
                    case"0":
                    case"@":
                    case"+":
                        break;
                    default:
                        throw new Error("Unknown Field Type: " + p.type)
                }
                if (13 !== d[d.l] ? d.l = l - 1 : 2 == f && (d.l = 521), 2 != f) {
                    if (13 !== d.read_shift(1)) throw new Error("DBF Terminator not found " + d.l + " " + d[d.l]);
                    d.l = l
                }
                var s = 0, t = 0;
                for (c[0] = [], t = 0; t != o.length; ++t) c[0][t] = o[t].name;
                for (; k-- > 0;) if (42 !== d[d.l]) for (++d.l, c[++s] = [], t = 0, t = 0; t != o.length; ++t) {
                    var u = d.slice(d.l, d.l + o[t].len);
                    d.l += o[t].len, ga(u, 0);
                    var v = cptable.utils.decode(n, u);
                    switch (o[t].type) {
                        case"C":
                            c[s][t] = cptable.utils.decode(n, u), c[s][t] = c[s][t].trim();
                            break;
                        case"D":
                            8 === v.length ? c[s][t] = new Date(+v.slice(0, 4), +v.slice(4, 6) - 1, +v.slice(6, 8)) : c[s][t] = v;
                            break;
                        case"F":
                            c[s][t] = parseFloat(v.trim());
                            break;
                        case"+":
                        case"I":
                            c[s][t] = j ? 2147483648 ^ u.read_shift(-4, "i") : u.read_shift(4, "i");
                            break;
                        case"L":
                            switch (v.toUpperCase()) {
                                case"Y":
                                case"T":
                                    c[s][t] = !0;
                                    break;
                                case"N":
                                case"F":
                                    c[s][t] = !1;
                                    break;
                                case" ":
                                case"?":
                                    c[s][t] = !1;
                                    break;
                                default:
                                    throw new Error("DBF Unrecognized L:|" + v + "|")
                            }
                            break;
                        case"M":
                            if (!h) throw new Error("DBF Unexpected MEMO for type " + f.toString(16));
                            c[s][t] = "##MEMO##" + (j ? parseInt(v.trim(), 10) : u.read_shift(4));
                            break;
                        case"N":
                            c[s][t] = +v.replace(/\u0000/g, "").trim();
                            break;
                        case"@":
                            c[s][t] = new Date(u.read_shift(-8, "f") - 621356832e5);
                            break;
                        case"T":
                            c[s][t] = new Date(864e5 * (u.read_shift(4) - 2440588) + u.read_shift(4));
                            break;
                        case"Y":
                            c[s][t] = u.read_shift(4, "i") / 1e4;
                            break;
                        case"O":
                            c[s][t] = -u.read_shift(-8, "f");
                            break;
                        case"B":
                            if (i && 8 == o[t].len) {
                                c[s][t] = u.read_shift(8, "f");
                                break
                            }
                        case"G":
                        case"P":
                            u.l += o[t].len;
                            break;
                        case"0":
                            if ("_NullFlags" === o[t].name) break;
                        default:
                            throw new Error("DBF Unsupported data type " + o[t].type)
                    }
                } else d.l += m;
                if (2 != f && d.l < d.length && 26 != d[d.l++]) throw new Error("DBF EOF Marker missing " + (d.l - 1) + " of " + d.length + " " + d[d.l - 1].toString(16));
                return b && b.sheetRows && (c = c.slice(0, b.sheetRows)), c
            }

            function b(b, c) {
                var d = c || {};
                return d.dateNF || (d.dateNF = "yyyymmdd"), Ia(a(b, d), d)
            }

            function c(a, c) {
                try {
                    return Ga(b(a, c), c)
                } catch (a) {
                    if (c && c.WTF) throw a
                }
                return {SheetNames: [], Sheets: {}}
            }

            function d(a, b) {
                if ("string" == (b || {}).type) throw new Error("Cannot write DBF to JS string");
                var c = ka(), d = tl(a, {header: 1, cellDates: !0}), e = d[0], g = d.slice(1), h = 0, i = 0, j = 0, k = 1;
                for (h = 0; h < e.length; ++h) if (null != h) {
                    if (++j, "number" == typeof e[h] && (e[h] = e[h].toString(10)), "string" != typeof e[h]) throw new Error("DBF Invalid column name " + e[h] + " |" + typeof e[h] + "|");
                    if (e.indexOf(e[h]) !== h) for (i = 0; i < 1024; ++i) if (-1 == e.indexOf(e[h] + "_" + i)) {
                        e[h] += "_" + i;
                        break
                    }
                }
                var l = Da(a["!ref"]), m = [];
                for (h = 0; h <= l.e.c - l.s.c; ++h) {
                    var n = [];
                    for (i = 0; i < g.length; ++i) null != g[i][h] && n.push(g[i][h]);
                    if (0 != n.length && null != e[h]) {
                        var o = "", p = "";
                        for (i = 0; i < n.length; ++i) {
                            switch (typeof n[i]) {
                                case"number":
                                    p = "B";
                                    break;
                                case"string":
                                    p = "C";
                                    break;
                                case"boolean":
                                    p = "L";
                                    break;
                                case"object":
                                    p = n[i] instanceof Date ? "D" : "C";
                                    break;
                                default:
                                    p = "C"
                            }
                            if ("C" == (o = o && o != p ? "C" : p)) break
                        }
                        k += f[o] || 0, m[h] = o
                    } else m[h] = "?"
                }
                var q = c.next(32);
                for (q.write_shift(4, 318902576), q.write_shift(4, g.length), q.write_shift(2, 296 + 32 * j), q.write_shift(2, k), h = 0; h < 4; ++h) q.write_shift(4, 0);
                for (q.write_shift(4, 768), h = 0, i = 0; h < e.length; ++h) if (null != e[h]) {
                    var r = c.next(32), s = (e[h].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
                    r.write_shift(1, s, "sbcs"), r.write_shift(1, "?" == m[h] ? "C" : m[h], "sbcs"), r.write_shift(4, i), r.write_shift(1, f[m[h]] || 0), r.write_shift(1, 0), r.write_shift(1, 2), r.write_shift(4, 0), r.write_shift(1, 0), r.write_shift(4, 0), r.write_shift(4, 0), i += f[m[h]] || 0
                }
                var t = c.next(264);
                for (t.write_shift(4, 13), h = 0; h < 65; ++h) t.write_shift(4, 0);
                for (h = 0; h < g.length; ++h) {
                    var u = c.next(k);
                    for (u.write_shift(1, 0), i = 0; i < e.length; ++i) if (null != e[i]) switch (m[i]) {
                        case"L":
                            u.write_shift(1, null == g[h][i] ? 63 : g[h][i] ? 84 : 70);
                            break;
                        case"B":
                            u.write_shift(8, g[h][i] || 0, "f");
                            break;
                        case"D":
                            g[h][i] ? (u.write_shift(4, ("0000" + g[h][i].getFullYear()).slice(-4), "sbcs"), u.write_shift(2, ("00" + (g[h][i].getMonth() + 1)).slice(-2), "sbcs"), u.write_shift(2, ("00" + g[h][i].getDate()).slice(-2), "sbcs")) : u.write_shift(8, "00000000", "sbcs");
                            break;
                        case"C":
                            var v = String(g[h][i] || "");
                            for (u.write_shift(1, v, "sbcs"), j = 0; j < 250 - v.length; ++j) u.write_shift(1, 32)
                    }
                }
                return c.next(1).write_shift(1, 26), c.end()
            }

            var e = {
                1: 437,
                2: 850,
                3: 1252,
                4: 1e4,
                100: 852,
                101: 866,
                102: 865,
                103: 861,
                104: 895,
                105: 620,
                106: 737,
                107: 857,
                120: 950,
                121: 949,
                122: 936,
                123: 932,
                124: 874,
                125: 1255,
                126: 1256,
                150: 10007,
                151: 10029,
                152: 10006,
                200: 1250,
                201: 1251,
                202: 1254,
                203: 1253,
                0: 20127,
                8: 865,
                9: 437,
                10: 850,
                11: 437,
                13: 437,
                14: 850,
                15: 437,
                16: 850,
                17: 437,
                18: 850,
                19: 932,
                20: 850,
                21: 437,
                22: 850,
                23: 865,
                24: 437,
                25: 437,
                26: 850,
                27: 437,
                28: 863,
                29: 850,
                31: 852,
                34: 852,
                35: 852,
                36: 860,
                37: 850,
                38: 866,
                55: 850,
                64: 852,
                77: 936,
                78: 949,
                79: 950,
                80: 874,
                87: 1252,
                88: 1252,
                89: 1252,
                255: 16969
            }, f = {B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0};
            return {to_workbook: c, to_sheet: b, from_sheet: d}
        }(), so = function () {
            function a(a, c) {
                switch (c.type) {
                    case"base64":
                        return b(Ll.decode(a), c);
                    case"binary":
                        return b(a, c);
                    case"buffer":
                        return b(a.toString("binary"), c);
                    case"array":
                        return b(A(a), c)
                }
                throw new Error("Unrecognized type " + c.type)
            }

            function b(a, b) {
                for (var c, d = a.split(/[\n\r]+/), e = -1, f = -1, g = 0, h = 0, i = [], j = [], k = null, l = {}, m = [], n = [], o = [], p = 0; g !== d.length; ++g) {
                    p = 0;
                    var q, r = d[g].trim(), s = r.replace(/;;/g, "").split(";").map(function (a) {
                        return a.replace(/\u0001/g, ";")
                    }), t = s[0];
                    if (r.length > 0) switch (t) {
                        case"ID":
                        case"E":
                        case"B":
                        case"O":
                            break;
                        case"P":
                            "P" == s[1].charAt(0) && j.push(r.slice(3).replace(/;;/g, ";"));
                            break;
                        case"C":
                            var u = !1, v = !1;
                            for (h = 1; h < s.length; ++h) switch (s[h].charAt(0)) {
                                case"X":
                                    f = parseInt(s[h].slice(1)) - 1, v = !0;
                                    break;
                                case"Y":
                                    for (e = parseInt(s[h].slice(1)) - 1, v || (f = 0), c = i.length; c <= e; ++c) i[c] = [];
                                    break;
                                case"K":
                                    q = s[h].slice(1), '"' === q.charAt(0) ? q = q.slice(1, q.length - 1) : "TRUE" === q ? q = !0 : "FALSE" === q ? q = !1 : isNaN(D(q)) ? isNaN(E(q).getDate()) || (q = z(q)) : (q = D(q), null !== k && Tl.is_date(k) && (q = x(q))), "undefined" != typeof cptable && "string" == typeof q && "string" != (b || {}).type && (b || {}).codepage && (q = cptable.utils.decode(b.codepage, q)), u = !0;
                                    break;
                                case"E":
                                    var w = gp(s[h].slice(1), {r: e, c: f});
                                    i[e][f] = [i[e][f], w];
                                    break;
                                default:
                                    if (b && b.WTF) throw new Error("SYLK bad record " + r)
                            }
                            u && (i[e][f] = q, k = null);
                            break;
                        case"F":
                            var y = 0;
                            for (h = 1; h < s.length; ++h) switch (s[h].charAt(0)) {
                                case"X":
                                    f = parseInt(s[h].slice(1)) - 1, ++y;
                                    break;
                                case"Y":
                                    for (e = parseInt(s[h].slice(1)) - 1, c = i.length; c <= e; ++c) i[c] = [];
                                    break;
                                case"M":
                                    p = parseInt(s[h].slice(1)) / 20;
                                    break;
                                case"F":
                                case"G":
                                    break;
                                case"P":
                                    k = j[parseInt(s[h].slice(1))];
                                    break;
                                case"S":
                                case"D":
                                case"N":
                                    break;
                                case"W":
                                    for (o = s[h].slice(1).split(" "), c = parseInt(o[0], 10); c <= parseInt(o[1], 10); ++c) p = parseInt(o[2], 10), n[c - 1] = 0 === p ? {hidden: !0} : {wch: p}, Te(n[c - 1]);
                                    break;
                                case"C":
                                    f = parseInt(s[h].slice(1)) - 1, n[f] || (n[f] = {});
                                    break;
                                case"R":
                                    e = parseInt(s[h].slice(1)) - 1, m[e] || (m[e] = {}), p > 0 ? (m[e].hpt = p, m[e].hpx = Ve(p)) : 0 === p && (m[e].hidden = !0);
                                    break;
                                default:
                                    if (b && b.WTF) throw new Error("SYLK bad record " + r)
                            }
                            y < 1 && (k = null);
                            break;
                        default:
                            if (b && b.WTF) throw new Error("SYLK bad record " + r)
                    }
                }
                return m.length > 0 && (l["!rows"] = m), n.length > 0 && (l["!cols"] = n), b && b.sheetRows && (i = i.slice(0, b.sheetRows)), [i, l]
            }

            function c(b, c) {
                var d = a(b, c), e = d[0], f = d[1], g = Ia(e, c);
                return r(f).forEach(function (a) {
                    g[a] = f[a]
                }), g
            }

            function d(a, b) {
                return Ga(c(a, b), b)
            }

            function e(a, b, c, d) {
                var e = "C;Y" + (c + 1) + ";X" + (d + 1) + ";K";
                switch (a.t) {
                    case"n":
                        e += a.v || 0, a.f && !a.F && (e += ";E" + ip(a.f, {r: c, c: d}));
                        break;
                    case"b":
                        e += a.v ? "TRUE" : "FALSE";
                        break;
                    case"e":
                        e += a.w || a.v;
                        break;
                    case"d":
                        e += '"' + (a.w || a.v) + '"';
                        break;
                    case"s":
                        e += '"' + a.v.replace(/"/g, "") + '"'
                }
                return e
            }

            function f(a, b) {
                b.forEach(function (b, c) {
                    var d = "F;W" + (c + 1) + " " + (c + 1) + " ";
                    b.hidden ? d += "0" : ("number" == typeof b.width && (b.wpx = Oe(b.width)), "number" == typeof b.wpx && (b.wch = Pe(b.wpx)), "number" == typeof b.wch && (d += Math.round(b.wch))), " " != d.charAt(d.length - 1) && a.push(d)
                })
            }

            function g(a, b) {
                b.forEach(function (b, c) {
                    var d = "F;";
                    b.hidden ? d += "M0;" : b.hpt ? d += "M" + 20 * b.hpt + ";" : b.hpx && (d += "M" + 20 * Ue(b.hpx) + ";"), d.length > 2 && a.push(d + "R" + (c + 1))
                })
            }

            function h(a, b) {
                var c, d = ["ID;PWXL;N;E"], h = [], i = Da(a["!ref"]), j = Array.isArray(a), k = "\r\n";
                d.push("P;PGeneral"), d.push("F;P0;DG0G8;M255"), a["!cols"] && f(d, a["!cols"]), a["!rows"] && g(d, a["!rows"]), d.push("B;Y" + (i.e.r - i.s.r + 1) + ";X" + (i.e.c - i.s.c + 1) + ";D" + [i.s.c, i.s.r, i.e.c, i.e.r].join(" "));
                for (var l = i.s.r; l <= i.e.r; ++l) for (var m = i.s.c; m <= i.e.c; ++m) {
                    var n = Aa({r: l, c: m});
                    c = j ? (a[l] || [])[m] : a[n], c && (null != c.v || c.f && !c.F) && h.push(e(c, a, l, m, b))
                }
                return d.join(k) + k + h.join(k) + k + "E" + k
            }

            return {to_workbook: d, to_sheet: c, from_sheet: h}
        }(), to = function () {
            function a(a, c) {
                switch (c.type) {
                    case"base64":
                        return b(Ll.decode(a), c);
                    case"binary":
                        return b(a, c);
                    case"buffer":
                        return b(a.toString("binary"), c);
                    case"array":
                        return b(A(a), c)
                }
                throw new Error("Unrecognized type " + c.type)
            }

            function b(a, b) {
                for (var c = a.split("\n"), d = -1, e = -1, f = 0, g = []; f !== c.length; ++f) if ("BOT" !== c[f].trim()) {
                    if (!(d < 0)) {
                        var h = c[f].trim().split(","), i = h[0], j = h[1];
                        ++f;
                        var k = c[f].trim();
                        switch (+i) {
                            case-1:
                                if ("BOT" === k) {
                                    g[++d] = [], e = 0;
                                    continue
                                }
                                if ("EOD" !== k) throw new Error("Unrecognized DIF special command " + k);
                                break;
                            case 0:
                                "TRUE" === k ? g[d][e] = !0 : "FALSE" === k ? g[d][e] = !1 : isNaN(D(j)) ? isNaN(E(j).getDate()) ? g[d][e] = j : g[d][e] = z(j) : g[d][e] = D(j), ++e;
                                break;
                            case 1:
                                k = k.slice(1, k.length - 1), g[d][e++] = "" !== k ? k : null
                        }
                        if ("EOD" === k) break
                    }
                } else g[++d] = [], e = 0;
                return b && b.sheetRows && (g = g.slice(0, b.sheetRows)), g
            }

            function c(b, c) {
                return Ia(a(b, c), c)
            }

            function d(a, b) {
                return Ga(c(a, b), b)
            }

            return {
                to_workbook: d, to_sheet: c, from_sheet: function () {
                    var a = function (a, b, c, d, e) {
                        a.push(b), a.push(c + "," + d), a.push('"' + e.replace(/"/g, '""') + '"')
                    }, b = function (a, b, c, d) {
                        a.push(b + "," + c), a.push(1 == b ? '"' + d.replace(/"/g, '""') + '"' : d)
                    };
                    return function (c) {
                        var d, e = [], f = Da(c["!ref"]), g = Array.isArray(c);
                        a(e, "TABLE", 0, 1, "sheetjs"), a(e, "VECTORS", 0, f.e.r - f.s.r + 1, ""), a(e, "TUPLES", 0, f.e.c - f.s.c + 1, ""), a(e, "DATA", 0, 0, "");
                        for (var h = f.s.r; h <= f.e.r; ++h) {
                            b(e, -1, 0, "BOT");
                            for (var i = f.s.c; i <= f.e.c; ++i) {
                                var j = Aa({r: h, c: i});
                                if (d = g ? (c[h] || [])[i] : c[j]) switch (d.t) {
                                    case"n":
                                        var k = Kl ? d.w : d.v;
                                        k || null == d.v || (k = d.v), null == k ? Kl && d.f && !d.F ? b(e, 1, 0, "=" + d.f) : b(e, 1, 0, "") : b(e, 0, k, "V");
                                        break;
                                    case"b":
                                        b(e, 0, d.v ? 1 : 0, d.v ? "TRUE" : "FALSE");
                                        break;
                                    case"s":
                                        b(e, 1, 0, !Kl || isNaN(d.v) ? d.v : '="' + d.v + '"');
                                        break;
                                    case"d":
                                        d.w || (d.w = Tl.format(d.z || Tl._table[14], w(z(d.v)))), Kl ? b(e, 0, d.w, "V") : b(e, 1, 0, d.w);
                                        break;
                                    default:
                                        b(e, 1, 0, "")
                                } else b(e, 1, 0, "")
                            }
                        }
                        return b(e, -1, 0, "EOD"), e.join("\r\n")
                    }
                }()
            }
        }(), uo = function () {
            function a(a) {
                return a.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, "\n")
            }

            function b(a) {
                return a.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n")
            }

            function c(b, c) {
                for (var d = b.split("\n"), e = -1, f = -1, g = 0, h = []; g !== d.length; ++g) {
                    var i = d[g].trim().split(":");
                    if ("cell" === i[0]) {
                        var j = za(i[1]);
                        if (h.length <= j.r) for (e = h.length; e <= j.r; ++e) h[e] || (h[e] = []);
                        switch (e = j.r, f = j.c, i[2]) {
                            case"t":
                                h[e][f] = a(i[3]);
                                break;
                            case"v":
                                h[e][f] = +i[3];
                                break;
                            case"vtf":
                                var k = i[i.length - 1];
                            case"vtc":
                                switch (i[3]) {
                                    case"nl":
                                        h[e][f] = !!+i[4];
                                        break;
                                    default:
                                        h[e][f] = +i[4]
                                }
                                "vtf" == i[2] && (h[e][f] = [h[e][f], k])
                        }
                    }
                }
                return c && c.sheetRows && (h = h.slice(0, c.sheetRows)), h
            }

            function d(a, b) {
                return Ia(c(a, b), b)
            }

            function e(a, b) {
                return Ga(d(a, b), b)
            }

            function f(a) {
                if (!a || !a["!ref"]) return "";
                for (var c, d = [], e = [], f = "", g = Ba(a["!ref"]), h = Array.isArray(a), i = g.s.r; i <= g.e.r; ++i) for (var j = g.s.c; j <= g.e.c; ++j) if (f = Aa({
                    r: i,
                    c: j
                }), (c = h ? (a[i] || [])[j] : a[f]) && null != c.v && "z" !== c.t) {
                    switch (e = ["cell", f, "t"], c.t) {
                        case"s":
                        case"str":
                            e.push(b(c.v));
                            break;
                        case"n":
                            c.f ? (e[2] = "vtf", e[3] = "n", e[4] = c.v, e[5] = b(c.f)) : (e[2] = "v", e[3] = c.v);
                            break;
                        case"b":
                            e[2] = "vt" + (c.f ? "f" : "c"), e[3] = "nl", e[4] = c.v ? "1" : "0", e[5] = b(c.f || (c.v ? "TRUE" : "FALSE"));
                            break;
                        case"d":
                            var k = w(z(c.v));
                            e[2] = "vtc", e[3] = "nd", e[4] = "" + k, e[5] = c.w || Tl.format(c.z || Tl._table[14], k);
                            break;
                        case"e":
                            continue
                    }
                    d.push(e.join(":"))
                }
                return d.push("sheet:c:" + (g.e.c - g.s.c + 1) + ":r:" + (g.e.r - g.s.r + 1) + ":tvf:1"), d.push("valueformat:1:text-wiki"), d.join("\n")
            }

            function g(a) {
                return [h, i, j, i, f(a), k].join("\n")
            }

            var h = ["socialcalc:version:1.5", "MIME-Version: 1.0", "Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave"].join("\n"),
                i = ["--SocialCalcSpreadsheetControlSave", "Content-type: text/plain; charset=UTF-8"].join("\n") + "\n",
                j = ["# SocialCalc Spreadsheet Control Save", "part:sheet"].join("\n"),
                k = "--SocialCalcSpreadsheetControlSave--";
            return {to_workbook: e, to_sheet: d, from_sheet: g}
        }(), vo = function () {
            function a(a, b, c, d, e) {
                e.raw ? b[c][d] = a : "TRUE" === a ? b[c][d] = !0 : "FALSE" === a ? b[c][d] = !1 : "" === a || (isNaN(D(a)) ? isNaN(E(a).getDate()) ? b[c][d] = a : b[c][d] = z(a) : b[c][d] = D(a))
            }

            function b(b, c) {
                var d = c || {}, e = [];
                if (!b || 0 === b.length) return e;
                for (var f = b.split(/[\r\n]/), g = f.length - 1; g >= 0 && 0 === f[g].length;) --g;
                for (var h = 10, i = 0, j = 0; j <= g; ++j) i = f[j].indexOf(" "), -1 == i ? i = f[j].length : i++, h = Math.max(h, i);
                for (j = 0; j <= g; ++j) {
                    e[j] = [];
                    var k = 0;
                    for (a(f[j].slice(0, h).trim(), e, j, k, d), k = 1; k <= (f[j].length - h) / 10 + 1; ++k) a(f[j].slice(h + 10 * (k - 1), h + 10 * k).trim(), e, j, k, d)
                }
                return d.sheetRows && (e = e.slice(0, d.sheetRows)), e
            }

            function c(a) {
                for (var b = {}, c = !1, d = 0, e = 0; d < a.length; ++d) 34 == (e = a.charCodeAt(d)) ? c = !c : !c && e in i && (b[e] = (b[e] || 0) + 1);
                e = [];
                for (d in b) b.hasOwnProperty(d) && e.push([b[d], d]);
                if (!e.length) {
                    b = j;
                    for (d in b) b.hasOwnProperty(d) && e.push([b[d], d])
                }
                return e.sort(function (a, b) {
                    return a[0] - b[0] || j[a[1]] - j[b[1]]
                }), i[e.pop()[1]]
            }

            function d(a, b) {
                function d() {
                    var b = a.slice(l, o), c = {};
                    if ('"' == b.charAt(0) && '"' == b.charAt(b.length - 1) && (b = b.slice(1, -1).replace(/""/g, '"')), 0 === b.length) c.t = "z"; else if (e.raw) c.t = "s", c.v = b; else if (0 === b.trim().length) c.t = "s", c.v = b; else if (61 == b.charCodeAt(0)) 34 == b.charCodeAt(1) && 34 == b.charCodeAt(b.length - 1) ? (c.t = "s", c.v = b.slice(2, -1).replace(/""/g, '"')) : kg(b) ? (c.t = "n", c.f = b.slice(1)) : (c.t = "s", c.v = b); else if ("TRUE" == b) c.t = "b", c.v = !0; else if ("FALSE" == b) c.t = "b", c.v = !1; else if (isNaN(k = D(b))) if (!isNaN(E(b).getDate()) || s && b.match(s)) {
                        c.z = e.dateNF || Tl._table[14];
                        var d = 0;
                        s && b.match(s) && (b = n(b, e.dateNF, b.match(s) || []), d = 1), e.cellDates ? (c.t = "d", c.v = z(b, d)) : (c.t = "n", c.v = w(z(b, d))), !1 !== e.cellText && (c.w = Tl.format(c.z, c.v instanceof Date ? w(c.v) : c.v)), e.cellNF || delete c.z
                    } else c.t = "s", c.v = b; else c.t = "n", !1 !== e.cellText && (c.w = b), c.v = k;
                    if ("z" == c.t || (e.dense ? (g[i] || (g[i] = []), g[i][j] = c) : g[Aa({
                        c: j,
                        r: i
                    })] = c), l = o + 1, h.e.c < j && (h.e.c = j), h.e.r < i && (h.e.r = i), r == p) ++j; else if (j = 0, ++i, e.sheetRows && e.sheetRows <= i) return !0
                }

                var e = b || {}, f = "";
                null != Jl && null == e.dense && (e.dense = Jl);
                var g = e.dense ? [] : {}, h = {s: {c: 0, r: 0}, e: {c: 0, r: 0}};
                "sep=" == a.slice(0, 4) && 10 == a.charCodeAt(5) ? (f = a.charAt(4), a = a.slice(6)) : f = c(a.slice(0, 1024));
                var i = 0, j = 0, k = 0, l = 0, o = 0, p = f.charCodeAt(0), q = !1, r = 0;
                a = a.replace(/\r\n/gm, "\n");
                var s = null != e.dateNF ? m(e.dateNF) : null;
                a:for (; o < a.length; ++o) switch (r = a.charCodeAt(o)) {
                    case 34:
                        q = !q;
                        break;
                    case p:
                    case 10:
                    case 13:
                        if (!q && d()) break a
                }
                return o - l > 0 && d(), g["!ref"] = Ca(h), g
            }

            function e(a, c) {
                return "sep=" == a.slice(0, 4) ? d(a, c) : a.indexOf("\t") >= 0 || a.indexOf(",") >= 0 || a.indexOf(";") >= 0 ? d(a, c) : Ia(b(a, c), c)
            }

            function f(a, b) {
                var c = "", d = "string" == b.type ? [0, 0, 0, 0] : $k(a, b);
                switch (b.type) {
                    case"base64":
                        c = Ll.decode(a);
                        break;
                    case"binary":
                        c = a;
                        break;
                    case"buffer":
                        c = 65001 == b.codepage ? a.toString("utf8") : b.codepage && "undefined" != typeof cptable ? cptable.utils.decode(b.codepage, a) : a.toString("binary");
                        break;
                    case"array":
                        c = A(a);
                        break;
                    case"string":
                        c = a;
                        break;
                    default:
                        throw new Error("Unrecognized type " + b.type)
                }
                return 239 == d[0] && 187 == d[1] && 191 == d[2] ? c = tm(c.slice(3)) : "binary" == b.type && "undefined" != typeof cptable && b.codepage && (c = cptable.utils.decode(b.codepage, cptable.utils.encode(1252, c))), "socialcalc:version:" == c.slice(0, 19) ? uo.to_sheet("string" == b.type ? c : tm(c), b) : e(c, b)
            }

            function g(a, b) {
                return Ga(f(a, b), b)
            }

            function h(a) {
                for (var b, c = [], d = Da(a["!ref"]), e = Array.isArray(a), f = d.s.r; f <= d.e.r; ++f) {
                    for (var g = [], h = d.s.c; h <= d.e.c; ++h) {
                        var i = Aa({r: f, c: h});
                        if ((b = e ? (a[f] || [])[h] : a[i]) && null != b.v) {
                            for (var j = (b.w || (Fa(b), b.w) || "").slice(0, 10); j.length < 10;) j += " ";
                            g.push(j + (0 === h ? " " : ""))
                        } else g.push("          ")
                    }
                    c.push(g.join(""))
                }
                return c.join("\n")
            }

            var i = {44: ",", 9: "\t", 59: ";"}, j = {44: 3, 9: 2, 59: 1};
            return {to_workbook: g, to_sheet: f, from_sheet: h}
        }(), wo = function () {
            function a(a, b, c) {
                if (a) {
                    ga(a, a.l || 0);
                    for (var d = c.Enum || r; a.l < a.length;) {
                        var e = a.read_shift(2), f = d[e] || d[255], g = a.read_shift(2), h = a.l + g,
                            i = (f.f || ha)(a, g, c);
                        if (a.l = h, b(i, f.n, e)) return
                    }
                }
            }

            function b(a, b) {
                switch (b.type) {
                    case"base64":
                        return c(Pl(Ll.decode(a)), b);
                    case"binary":
                        return c(Pl(a), b);
                    case"buffer":
                    case"array":
                        return c(a, b)
                }
                throw"Unsupported type " + b.type
            }

            function c(b, c) {
                if (!b) return b;
                var d = c || {};
                null != Jl && null == d.dense && (d.dense = Jl);
                var e = d.dense ? [] : {}, f = "Sheet1", g = 0, h = {}, i = [f], j = {s: {r: 0, c: 0}, e: {r: 0, c: 0}},
                    k = d.sheetRows || 0;
                if (2 == b[2]) d.Enum = r; else if (26 == b[2]) d.Enum = s; else {
                    if (14 != b[2]) throw new Error("Unrecognized LOTUS BOF " + b[2]);
                    d.Enum = s, d.qpro = !0, b.l = 0
                }
                return a(b, function (a, c, l) {
                    if (2 == b[2]) switch (l) {
                        case 0:
                            d.vers = a, a >= 4096 && (d.qpro = !0);
                            break;
                        case 6:
                            j = a;
                            break;
                        case 15:
                            d.qpro || (a[1].v = a[1].v.slice(1));
                        case 13:
                        case 14:
                        case 16:
                        case 51:
                            14 == l && 112 == (112 & a[2]) && (15 & a[2]) > 1 && (15 & a[2]) < 15 && (a[1].z = d.dateNF || Tl._table[14], d.cellDates && (a[1].t = "d", a[1].v = x(a[1].v))), d.dense ? (e[a[0].r] || (e[a[0].r] = []), e[a[0].r][a[0].c] = a[1]) : e[Aa(a[0])] = a[1]
                    } else switch (l) {
                        case 22:
                            a[1].v = a[1].v.slice(1);
                        case 23:
                        case 24:
                        case 25:
                        case 37:
                        case 39:
                        case 40:
                            if (a[3] > g && (e["!ref"] = Ca(j), h[f] = e, e = d.dense ? [] : {}, j = {
                                s: {r: 0, c: 0},
                                e: {r: 0, c: 0}
                            }, g = a[3], f = "Sheet" + (g + 1), i.push(f)), k > 0 && a[0].r >= k) break;
                            d.dense ? (e[a[0].r] || (e[a[0].r] = []), e[a[0].r][a[0].c] = a[1]) : e[Aa(a[0])] = a[1], j.e.c < a[0].c && (j.e.c = a[0].c), j.e.r < a[0].r && (j.e.r = a[0].r)
                    }
                }, d), e["!ref"] = Ca(j), h[f] = e, {SheetNames: i, Sheets: h}
            }

            function d(a) {
                var b = {s: {c: 0, r: 0}, e: {c: 0, r: 0}};
                return b.s.c = a.read_shift(2), b.s.r = a.read_shift(2), b.e.c = a.read_shift(2), b.e.r = a.read_shift(2), 65535 == b.s.c && (b.s.c = b.e.c = b.s.r = b.e.r = 0), b
            }

            function e(a, b, c) {
                var d = [{c: 0, r: 0}, {t: "n", v: 0}, 0];
                return c.qpro && 20768 != c.vers ? (d[0].c = a.read_shift(1), a.l++, d[0].r = a.read_shift(2), a.l += 2) : (d[2] = a.read_shift(1), d[0].c = a.read_shift(2), d[0].r = a.read_shift(2)), d
            }

            function f(a, b, c) {
                var d = a.l + b, f = e(a, b, c);
                if (f[1].t = "s", 20768 == c.vers) {
                    a.l++;
                    var g = a.read_shift(1);
                    return f[1].v = a.read_shift(g, "utf8"), f
                }
                return c.qpro && a.l++, f[1].v = a.read_shift(d - a.l, "cstr"), f
            }

            function g(a, b, c) {
                var d = e(a, b, c);
                return d[1].v = a.read_shift(2, "i"), d
            }

            function h(a, b, c) {
                var d = e(a, b, c);
                return d[1].v = a.read_shift(8, "f"), d
            }

            function i(a, b, c) {
                var d = a.l + b, f = e(a, b, c);
                if (f[1].v = a.read_shift(8, "f"), c.qpro) a.l = d; else {
                    var g = a.read_shift(2);
                    a.l += g
                }
                return f
            }

            function j(a) {
                var b = [{c: 0, r: 0}, {t: "n", v: 0}, 0];
                return b[0].r = a.read_shift(2), b[3] = a[a.l++], b[0].c = a[a.l++], b
            }

            function k(a, b) {
                var c = j(a, b);
                return c[1].t = "s", c[1].v = a.read_shift(b - 4, "cstr"), c
            }

            function l(a, b) {
                var c = j(a, b);
                c[1].v = a.read_shift(2);
                var d = c[1].v >> 1;
                if (1 & c[1].v) switch (7 & d) {
                    case 1:
                        d = 500 * (d >> 3);
                        break;
                    case 2:
                        d = (d >> 3) / 20;
                        break;
                    case 4:
                        d = (d >> 3) / 2e3;
                        break;
                    case 6:
                        d = (d >> 3) / 16;
                        break;
                    case 7:
                        d = (d >> 3) / 64;
                        break;
                    default:
                        throw"unknown NUMBER_18 encoding " + (7 & d)
                }
                return c[1].v = d, c
            }

            function m(a, b) {
                var c = j(a, b), d = a.read_shift(4), e = a.read_shift(4), f = a.read_shift(2);
                if (65535 == f) return c[1].v = 0, c;
                var g = 32768 & f;
                return f = (32767 & f) - 16446, c[1].v = (2 * g - 1) * ((f > 0 ? e << f : e >>> -f) + (f > -32 ? d << f + 32 : d >>> -(f + 32))), c
            }

            function n(a, b) {
                var c = m(a, 14);
                return a.l += b - 14, c
            }

            function o(a, b) {
                var c = j(a, b), d = a.read_shift(4);
                return c[1].v = d >> 6, c
            }

            function p(a, b) {
                var c = j(a, b), d = a.read_shift(8, "f");
                return c[1].v = d, c
            }

            function q(a, b) {
                var c = p(a, 14);
                return a.l += b - 10, c
            }

            var r = {
                0: {n: "BOF", f: dc},
                1: {n: "EOF"},
                2: {n: "CALCMODE"},
                3: {n: "CALCORDER"},
                4: {n: "SPLIT"},
                5: {n: "SYNC"},
                6: {n: "RANGE", f: d},
                7: {n: "WINDOW1"},
                8: {n: "COLW1"},
                9: {n: "WINTWO"},
                10: {n: "COLW2"},
                11: {n: "NAME"},
                12: {n: "BLANK"},
                13: {n: "INTEGER", f: g},
                14: {n: "NUMBER", f: h},
                15: {n: "LABEL", f: f},
                16: {n: "FORMULA", f: i},
                24: {n: "TABLE"},
                25: {n: "ORANGE"},
                26: {n: "PRANGE"},
                27: {n: "SRANGE"},
                28: {n: "FRANGE"},
                29: {n: "KRANGE1"},
                32: {n: "HRANGE"},
                35: {n: "KRANGE2"},
                36: {n: "PROTEC"},
                37: {n: "FOOTER"},
                38: {n: "HEADER"},
                39: {n: "SETUP"},
                40: {n: "MARGINS"},
                41: {n: "LABELFMT"},
                42: {n: "TITLES"},
                43: {n: "SHEETJS"},
                45: {n: "GRAPH"},
                46: {n: "NGRAPH"},
                47: {n: "CALCCOUNT"},
                48: {n: "UNFORMATTED"},
                49: {n: "CURSORW12"},
                50: {n: "WINDOW"},
                51: {n: "STRING", f: f},
                55: {n: "PASSWORD"},
                56: {n: "LOCKED"},
                60: {n: "QUERY"},
                61: {n: "QUERYNAME"},
                62: {n: "PRINT"},
                63: {n: "PRINTNAME"},
                64: {n: "GRAPH2"},
                65: {n: "GRAPHNAME"},
                66: {n: "ZOOM"},
                67: {n: "SYMSPLIT"},
                68: {n: "NSROWS"},
                69: {n: "NSCOLS"},
                70: {n: "RULER"},
                71: {n: "NNAME"},
                72: {n: "ACOMM"},
                73: {n: "AMACRO"},
                74: {n: "PARSE"},
                255: {n: "", f: ha}
            }, s = {
                0: {n: "BOF"},
                1: {n: "EOF"},
                3: {n: "??"},
                4: {n: "??"},
                5: {n: "??"},
                6: {n: "??"},
                7: {n: "??"},
                9: {n: "??"},
                10: {n: "??"},
                11: {n: "??"},
                12: {n: "??"},
                14: {n: "??"},
                15: {n: "??"},
                16: {n: "??"},
                17: {n: "??"},
                18: {n: "??"},
                19: {n: "??"},
                21: {n: "??"},
                22: {n: "LABEL16", f: k},
                23: {n: "NUMBER17", f: m},
                24: {n: "NUMBER18", f: l},
                25: {n: "FORMULA19", f: n},
                26: {n: "??"},
                27: {n: "??"},
                28: {n: "??"},
                29: {n: "??"},
                30: {n: "??"},
                31: {n: "??"},
                33: {n: "??"},
                37: {n: "NUMBER25", f: o},
                39: {n: "NUMBER27", f: p},
                40: {n: "FORMULA28", f: q},
                255: {n: "", f: ha}
            };
            return {to_workbook: b}
        }(), xo = function () {
            function a(a) {
                var d = [[], "", []], e = a.match(b);
                if (!e) return "";
                d[1] = e[1];
                var h = a.match(c);
                return h && g(h[1], d[0], d[2]), d[0].join("") + d[1].replace(f, "<br/>") + d[2].join("")
            }

            var b = ym("t"), c = ym("rPr"), d = /<(?:\w+:)?r>/g, e = /<\/(?:\w+:)?r>/, f = /\r\n/g, g = function (a, b, c) {
                var d = {}, e = 65001, f = "", g = !1, h = a.match(im), i = 0;
                if (h) for (; i != h.length; ++i) {
                    var j = P(h[i]);
                    switch (j[0].replace(/\w*:/g, "")) {
                        case"<condense":
                        case"<extend":
                            break;
                        case"<shadow":
                            if (!j.val) break;
                        case"<shadow>":
                        case"<shadow/>":
                            d.shadow = 1;
                            break;
                        case"</shadow>":
                            break;
                        case"<charset":
                            if ("1" == j.val) break;
                            e = El[parseInt(j.val, 10)];
                            break;
                        case"<outline":
                            if (!j.val) break;
                        case"<outline>":
                        case"<outline/>":
                            d.outline = 1;
                            break;
                        case"</outline>":
                            break;
                        case"<rFont":
                            d.name = j.val;
                            break;
                        case"<sz":
                            d.sz = j.val;
                            break;
                        case"<strike":
                            if (!j.val) break;
                        case"<strike>":
                        case"<strike/>":
                            d.strike = 1;
                            break;
                        case"</strike>":
                            break;
                        case"<u":
                            if (!j.val) break;
                            switch (j.val) {
                                case"double":
                                    d.uval = "double";
                                    break;
                                case"singleAccounting":
                                    d.uval = "single-accounting";
                                    break;
                                case"doubleAccounting":
                                    d.uval = "double-accounting"
                            }
                        case"<u>":
                        case"<u/>":
                            d.u = 1;
                            break;
                        case"</u>":
                            break;
                        case"<b":
                            if ("0" == j.val) break;
                        case"<b>":
                        case"<b/>":
                            d.b = 1;
                            break;
                        case"</b>":
                            break;
                        case"<i":
                            if ("0" == j.val) break;
                        case"<i>":
                        case"<i/>":
                            d.i = 1;
                            break;
                        case"</i>":
                            break;
                        case"<color":
                            j.rgb && (d.color = j.rgb.slice(2, 8));
                            break;
                        case"<family":
                            d.family = j.val;
                            break;
                        case"<vertAlign":
                            f = j.val;
                            break;
                        case"<scheme":
                            break;
                        case"<extLst":
                        case"<extLst>":
                        case"</extLst>":
                            break;
                        case"<ext":
                            g = !0;
                            break;
                        case"</ext>":
                            g = !1;
                            break;
                        default:
                            if (47 !== j[0].charCodeAt(1) && !g) throw new Error("Unrecognized rich format " + j[0])
                    }
                }
                var k = [];
                return d.u && k.push("text-decoration: underline;"), d.uval && k.push("text-underline-style:" + d.uval + ";"), d.sz && k.push("font-size:" + d.sz + "pt;"), d.outline && k.push("text-effect: outline;"), d.shadow && k.push("text-shadow: auto;"), b.push('<span style="' + k.join("") + '">'), d.b && (b.push("<b>"), c.push("</b>")), d.i && (b.push("<i>"), c.push("</i>")), d.strike && (b.push("<s>"), c.push("</s>")), "superscript" == f ? f = "sup" : "subscript" == f && (f = "sub"), "" != f && (b.push("<" + f + ">"), c.push("</" + f + ">")), c.push("</span>"), e
            };
            return function (b) {
                return b.replace(d, "").split(e).map(a).join("")
            }
        }(), yo = /<(?:\w+:)?t[^>]*>([^<]*)<\/(?:\w+:)?t>/g, zo = /<(?:\w+:)?r>/,
        Ao = /<(?:\w+:)?rPh.*?>([\s\S]*?)<\/(?:\w+:)?rPh>/g, Bo = /<(?:\w+:)?sst([^>]*)>([\s\S]*)<\/(?:\w+:)?sst>/,
        Co = /<(?:\w+:)?(?:si|sstItem)>/g, Do = /<\/(?:\w+:)?(?:si|sstItem)>/;
    Un.SST = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings";
    var Eo = /^\s|\s$|[\t\n\r]/, Fo = Pa, Go = function () {
            var a = [187, 255, 255, 186, 255, 255, 185, 128, 0, 190, 15, 0, 191, 15, 0],
                b = [57840, 7439, 52380, 33984, 4364, 3600, 61902, 12606, 6258, 57657, 54287, 34041, 10252, 43370, 20163],
                c = [44796, 19929, 39858, 10053, 20106, 40212, 10761, 31585, 63170, 64933, 60267, 50935, 40399, 11199, 17763, 35526, 1453, 2906, 5812, 11624, 23248, 885, 1770, 3540, 7080, 14160, 28320, 56640, 55369, 41139, 20807, 41614, 21821, 43642, 17621, 28485, 56970, 44341, 19019, 38038, 14605, 29210, 60195, 50791, 40175, 10751, 21502, 43004, 24537, 18387, 36774, 3949, 7898, 15796, 31592, 63184, 47201, 24803, 49606, 37805, 14203, 28406, 56812, 17824, 35648, 1697, 3394, 6788, 13576, 27152, 43601, 17539, 35078, 557, 1114, 2228, 4456, 30388, 60776, 51953, 34243, 7079, 14158, 28316, 14128, 28256, 56512, 43425, 17251, 34502, 7597, 13105, 26210, 52420, 35241, 883, 1766, 3532, 4129, 8258, 16516, 33032, 4657, 9314, 18628],
                d = function (a) {
                    return 255 & (a / 2 | 128 * a)
                }, e = function (a, b) {
                    return d(a ^ b)
                }, f = function (a) {
                    for (var d = b[a.length - 1], e = 104, f = a.length - 1; f >= 0; --f) for (var g = a[f], h = 0; 7 != h; ++h) 64 & g && (d ^= c[e]), g *= 2, --e;
                    return d
                };
            return function (b) {
                for (var c = pe(b), d = f(c), h = c.length, i = g(16), j = 0; 16 != j; ++j) i[j] = 0;
                var k, l, m;
                for (1 == (1 & h) && (k = d >> 8, i[h] = e(a[0], k), --h, k = 255 & d, l = c[c.length - 1], i[h] = e(l, k)); h > 0;) --h, k = d >> 8, i[h] = e(c[h], k), --h, k = 255 & d, i[h] = e(c[h], k);
                for (h = 15, m = 15 - c.length; m > 0;) k = d >> 8, i[h] = e(a[m], k), --h, --m, k = 255 & d, i[h] = e(c[h], k), --h, --m;
                return i
            }
        }(), Ho = function (a, b, c, d, e) {
            e || (e = b), d || (d = Go(a));
            var f, g;
            for (f = 0; f != b.length; ++f) g = b[f], g ^= d[c], g = 255 & (g >> 5 | g << 3), e[f] = g, ++c;
            return [e, c, d]
        }, Io = function (a) {
            var b = 0, c = Go(a);
            return function (a) {
                var d = Ho("", a, b, c);
                return b = d[1], d[0]
            }
        }, Jo = function () {
            function a(a, c) {
                switch (c.type) {
                    case"base64":
                        return b(Ll.decode(a), c);
                    case"binary":
                        return b(a, c);
                    case"buffer":
                        return b(a.toString("binary"), c);
                    case"array":
                        return b(A(a), c)
                }
                throw new Error("Unrecognized type " + c.type)
            }

            function b(a, b) {
                var c = b || {}, d = c.dense ? [] : {}, e = {s: {c: 0, r: 0}, e: {c: 0, r: 0}};
                if (!a.match(/\\trowd/)) throw new Error("RTF missing table");
                return d["!ref"] = Ca(e), d
            }

            function c(b, c) {
                return Ga(a(b, c), c)
            }

            function d(a) {
                for (var b, c = ["{\\rtf1\\ansi"], d = Da(a["!ref"]), e = Array.isArray(a), f = d.s.r; f <= d.e.r; ++f) {
                    c.push("\\trowd\\trautofit1");
                    for (var g = d.s.c; g <= d.e.c; ++g) c.push("\\cellx" + (g + 1));
                    for (c.push("\\pard\\intbl"), g = d.s.c; g <= d.e.c; ++g) {
                        var h = Aa({r: f, c: g});
                        b = e ? (a[f] || [])[g] : a[h], b && (null != b.v || b.f && !b.F) && (c.push(" " + (b.w || (Fa(b), b.w))), c.push("\\cell"))
                    }
                    c.push("\\pard\\intbl\\row")
                }
                return c.join("") + "}"
            }

            return {to_workbook: c, to_sheet: a, from_sheet: d}
        }(), Ko = 6, Lo = 15, Mo = 1, No = Ko, Oo = 96, Po = Oo, Qo = {
            None: "none",
            Solid: "solid",
            Gray50: "mediumGray",
            Gray75: "darkGray",
            Gray25: "lightGray",
            HorzStripe: "darkHorizontal",
            VertStripe: "darkVertical",
            ReverseDiagStripe: "darkDown",
            DiagStripe: "darkUp",
            DiagCross: "darkGrid",
            ThickDiagCross: "darkTrellis",
            ThinHorzStripe: "lightHorizontal",
            ThinVertStripe: "lightVertical",
            ThinReverseDiagStripe: "lightDown",
            ThinHorzCross: "lightGrid"
        }, Ro = ["numFmtId", "fillId", "fontId", "borderId", "xfId"],
        So = ["applyAlignment", "applyBorder", "applyFill", "applyFont", "applyNumberFormat", "applyProtection", "pivotButton", "quotePrefix"],
        To = function () {
            var a = /<(?:\w+:)?numFmts([^>]*)>[\S\s]*?<\/(?:\w+:)?numFmts>/,
                b = /<(?:\w+:)?cellXfs([^>]*)>[\S\s]*?<\/(?:\w+:)?cellXfs>/,
                c = /<(?:\w+:)?fills([^>]*)>[\S\s]*?<\/(?:\w+:)?fills>/,
                d = /<(?:\w+:)?fonts([^>]*)>[\S\s]*?<\/(?:\w+:)?fonts>/,
                e = /<(?:\w+:)?borders([^>]*)>[\S\s]*?<\/(?:\w+:)?borders>/;
            return function (f, g, h) {
                var i = {};
                if (!f) return i;
                f = f.replace(/<!--([\s\S]*?)-->/gm, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, "");
                var j;
                return (j = f.match(a)) && Ze(j, i, h), (j = f.match(d)) && Ye(j, i, g, h), (j = f.match(c)) && Xe(j, i, g, h), (j = f.match(e)) && We(j, i, g, h), (j = f.match(b)) && _e(j, i, h), i
            }
        }(), Uo = Z("styleSheet", null, {xmlns: Em.main[0], "xmlns:vt": Em.vt});
    Un.STY = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles";
    var Vo = ["none", "solid", "mediumGray", "darkGray", "lightGray", "darkHorizontal", "darkVertical", "darkDown", "darkUp", "darkGrid", "darkTrellis", "lightHorizontal", "lightVertical", "lightDown", "lightUp", "lightGrid", "lightTrellis", "gray125", "gray0625"],
        Wo = t(Vo), Xo = ha, Yo = ha;
    Un.THEME = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme";
    var Zo = /<a:clrScheme([^>]*)>[\s\S]*<\/a:clrScheme>/, $o = /<a:fontScheme([^>]*)>[\s\S]*<\/a:fontScheme>/,
        _o = /<a:fmtScheme([^>]*)>[\s\S]*<\/a:fmtScheme>/, ap = /<a:themeElements([^>]*)>[\s\S]*<\/a:themeElements>/;
    Un.IMG = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", Un.DRAW = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing";
    var bp = 1024;
    Un.CMNT = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments";
    var cp = Z("comments", null, {xmlns: Em.main[0]}), dp = Ka, ep = "application/vnd.ms-office.vbaProject",
        fp = ["xlsb", "xlsm", "xlam", "biff8", "xla"];
    Un.DS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet", Un.MS = "http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet";
    var gp = function () {
            function a(a, b, d, e, f, g) {
                var h = e.length > 0 ? 0 | parseInt(e, 10) : 0, i = g.length > 0 ? 0 | parseInt(g, 10) : 0;
                i < 0 && 0 === f.length && (i = 0);
                var j = !1, k = !1;
                return (f.length > 0 || 0 == g.length) && (j = !0), j ? i += c.c : --i, (d.length > 0 || 0 == e.length) && (k = !0), k ? h += c.r : --h, b + (j ? "" : "$") + va(i) + (k ? "" : "$") + ra(h)
            }

            var b = /(^|[^A-Za-z])R(\[?)(-?\d+|)\]?C(\[?)(-?\d+|)\]?/g, c = {r: 0, c: 0};
            return function (d, e) {
                return c = e, d.replace(b, a)
            }
        }(),
        hp = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)([1-9]\d{0,5}|10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6])(?![_.\(A-Za-z0-9])/g,
        ip = function () {
            return function (a, b) {
                return a.replace(hp, function (a, c, d, e, f, g) {
                    var h = ua(e) - (d ? 0 : b.c), i = qa(g) - (f ? 0 : b.r);
                    return c + "R" + (0 == i ? "" : f ? i + 1 : "[" + i + "]") + "C" + (0 == h ? "" : d ? h + 1 : "[" + h + "]")
                })
            }
        }(), jp = ha, kp = ha, lp = ha, mp = gh, np = hh, op = hh, pp = gh, qp = gh, rp = ih, sp = hh, tp = gh, up = gh,
        vp = ["Data", "All", "Headers", "??", "?Data2", "??", "?DataHeaders", "??", "Totals", "??", "??", "??", "?DataTotals", "??", "??", "??", "?Current"],
        wp = {
            1: {n: "PtgExp", f: Sg},
            2: {n: "PtgTbl", f: lp},
            3: {n: "PtgAdd", f: mg},
            4: {n: "PtgSub", f: mg},
            5: {n: "PtgMul", f: mg},
            6: {n: "PtgDiv", f: mg},
            7: {n: "PtgPower", f: mg},
            8: {n: "PtgConcat", f: mg},
            9: {n: "PtgLt", f: mg},
            10: {n: "PtgLe", f: mg},
            11: {n: "PtgEq", f: mg},
            12: {n: "PtgGe", f: mg},
            13: {n: "PtgGt", f: mg},
            14: {n: "PtgNe", f: mg},
            15: {n: "PtgIsect", f: mg},
            16: {n: "PtgUnion", f: mg},
            17: {n: "PtgRange", f: mg},
            18: {n: "PtgUplus", f: mg},
            19: {n: "PtgUminus", f: mg},
            20: {n: "PtgPercent", f: mg},
            21: {n: "PtgParen", f: mg},
            22: {n: "PtgMissArg", f: mg},
            23: {n: "PtgStr", f: Xg},
            26: {n: "PtgSheet", f: lh},
            27: {n: "PtgEndSheet", f: mh},
            28: {n: "PtgErr", f: Tg},
            29: {n: "PtgBool", f: Vg},
            30: {n: "PtgInt", f: Ug},
            31: {n: "PtgNum", f: Wg},
            32: {n: "PtgArray", f: Bg},
            33: {n: "PtgFunc", f: Og},
            34: {n: "PtgFuncVar", f: Pg},
            35: {n: "PtgName", f: _g},
            36: {n: "PtgRef", f: Lg},
            37: {n: "PtgArea", f: wg},
            38: {n: "PtgMemArea", f: ch},
            39: {n: "PtgMemErr", f: jp},
            40: {n: "PtgMemNoMem", f: kp},
            41: {n: "PtgMemFunc", f: dh},
            42: {n: "PtgRefErr", f: eh},
            43: {n: "PtgAreaErr", f: yg},
            44: {n: "PtgRefN", f: Mg},
            45: {n: "PtgAreaN", f: Ag},
            46: {n: "PtgMemAreaN", f: nh},
            47: {n: "PtgMemNoMemN", f: oh},
            57: {n: "PtgNameX", f: ah},
            58: {n: "PtgRef3d", f: Ng},
            59: {n: "PtgArea3d", f: xg},
            60: {n: "PtgRefErr3d", f: fh},
            61: {n: "PtgAreaErr3d", f: zg},
            255: {}
        }, xp = {
            64: 32,
            96: 32,
            65: 33,
            97: 33,
            66: 34,
            98: 34,
            67: 35,
            99: 35,
            68: 36,
            100: 36,
            69: 37,
            101: 37,
            70: 38,
            102: 38,
            71: 39,
            103: 39,
            72: 40,
            104: 40,
            73: 41,
            105: 41,
            74: 42,
            106: 42,
            75: 43,
            107: 43,
            76: 44,
            108: 44,
            77: 45,
            109: 45,
            78: 46,
            110: 46,
            79: 47,
            111: 47,
            88: 34,
            120: 34,
            89: 57,
            121: 57,
            90: 58,
            122: 58,
            91: 59,
            123: 59,
            92: 60,
            124: 60,
            93: 61,
            125: 61
        };
    !function () {
        for (var a in xp) wp[a] = wp[xp[a]]
    }();
    var yp = {
        1: {n: "PtgElfLel", f: ih},
        2: {n: "PtgElfRw", f: tp},
        3: {n: "PtgElfCol", f: mp},
        6: {n: "PtgElfRwV", f: up},
        7: {n: "PtgElfColV", f: pp},
        10: {n: "PtgElfRadical", f: qp},
        11: {n: "PtgElfRadicalS", f: sp},
        13: {n: "PtgElfColS", f: np},
        15: {n: "PtgElfColSV", f: op},
        16: {n: "PtgElfRadicalLel", f: rp},
        25: {n: "PtgList", f: jh},
        29: {n: "PtgSxName", f: kh},
        255: {}
    }, zp = {
        0: {n: "PtgAttrNoop", f: ph},
        1: {n: "PtgAttrSemi", f: Hg},
        2: {n: "PtgAttrIf", f: Fg},
        4: {n: "PtgAttrChoose", f: Dg},
        8: {n: "PtgAttrGoto", f: Eg},
        16: {n: "PtgAttrSum", f: Rg},
        32: {n: "PtgAttrBaxcel", f: Cg},
        64: {n: "PtgAttrSpace", f: Jg},
        65: {n: "PtgAttrSpaceSemi", f: Kg},
        128: {n: "PtgAttrIfError", f: Gg},
        255: {}
    };
    zp[33] = zp[32];
    var Ap = {
        PtgAdd: "+",
        PtgConcat: "&",
        PtgDiv: "/",
        PtgEq: "=",
        PtgGe: ">=",
        PtgGt: ">",
        PtgLe: "<=",
        PtgLt: "<",
        PtgMul: "*",
        PtgNe: "<>",
        PtgPower: "^",
        PtgSub: "-"
    }, Bp = Dh, Cp = Dh, Dp = Dh, Ep = Dh, Fp = {
        0: "BEEP",
        1: "OPEN",
        2: "OPEN.LINKS",
        3: "CLOSE.ALL",
        4: "SAVE",
        5: "SAVE.AS",
        6: "FILE.DELETE",
        7: "PAGE.SETUP",
        8: "PRINT",
        9: "PRINTER.SETUP",
        10: "QUIT",
        11: "NEW.WINDOW",
        12: "ARRANGE.ALL",
        13: "WINDOW.SIZE",
        14: "WINDOW.MOVE",
        15: "FULL",
        16: "CLOSE",
        17: "RUN",
        22: "SET.PRINT.AREA",
        23: "SET.PRINT.TITLES",
        24: "SET.PAGE.BREAK",
        25: "REMOVE.PAGE.BREAK",
        26: "FONT",
        27: "DISPLAY",
        28: "PROTECT.DOCUMENT",
        29: "PRECISION",
        30: "A1.R1C1",
        31: "CALCULATE.NOW",
        32: "CALCULATION",
        34: "DATA.FIND",
        35: "EXTRACT",
        36: "DATA.DELETE",
        37: "SET.DATABASE",
        38: "SET.CRITERIA",
        39: "SORT",
        40: "DATA.SERIES",
        41: "TABLE",
        42: "FORMAT.NUMBER",
        43: "ALIGNMENT",
        44: "STYLE",
        45: "BORDER",
        46: "CELL.PROTECTION",
        47: "COLUMN.WIDTH",
        48: "UNDO",
        49: "CUT",
        50: "COPY",
        51: "PASTE",
        52: "CLEAR",
        53: "PASTE.SPECIAL",
        54: "EDIT.DELETE",
        55: "INSERT",
        56: "FILL.RIGHT",
        57: "FILL.DOWN",
        61: "DEFINE.NAME",
        62: "CREATE.NAMES",
        63: "FORMULA.GOTO",
        64: "FORMULA.FIND",
        65: "SELECT.LAST.CELL",
        66: "SHOW.ACTIVE.CELL",
        67: "GALLERY.AREA",
        68: "GALLERY.BAR",
        69: "GALLERY.COLUMN",
        70: "GALLERY.LINE",
        71: "GALLERY.PIE",
        72: "GALLERY.SCATTER",
        73: "COMBINATION",
        74: "PREFERRED",
        75: "ADD.OVERLAY",
        76: "GRIDLINES",
        77: "SET.PREFERRED",
        78: "AXES",
        79: "LEGEND",
        80: "ATTACH.TEXT",
        81: "ADD.ARROW",
        82: "SELECT.CHART",
        83: "SELECT.PLOT.AREA",
        84: "PATTERNS",
        85: "MAIN.CHART",
        86: "OVERLAY",
        87: "SCALE",
        88: "FORMAT.LEGEND",
        89: "FORMAT.TEXT",
        90: "EDIT.REPEAT",
        91: "PARSE",
        92: "JUSTIFY",
        93: "HIDE",
        94: "UNHIDE",
        95: "WORKSPACE",
        96: "FORMULA",
        97: "FORMULA.FILL",
        98: "FORMULA.ARRAY",
        99: "DATA.FIND.NEXT",
        100: "DATA.FIND.PREV",
        101: "FORMULA.FIND.NEXT",
        102: "FORMULA.FIND.PREV",
        103: "ACTIVATE",
        104: "ACTIVATE.NEXT",
        105: "ACTIVATE.PREV",
        106: "UNLOCKED.NEXT",
        107: "UNLOCKED.PREV",
        108: "COPY.PICTURE",
        109: "SELECT",
        110: "DELETE.NAME",
        111: "DELETE.FORMAT",
        112: "VLINE",
        113: "HLINE",
        114: "VPAGE",
        115: "HPAGE",
        116: "VSCROLL",
        117: "HSCROLL",
        118: "ALERT",
        119: "NEW",
        120: "CANCEL.COPY",
        121: "SHOW.CLIPBOARD",
        122: "MESSAGE",
        124: "PASTE.LINK",
        125: "APP.ACTIVATE",
        126: "DELETE.ARROW",
        127: "ROW.HEIGHT",
        128: "FORMAT.MOVE",
        129: "FORMAT.SIZE",
        130: "FORMULA.REPLACE",
        131: "SEND.KEYS",
        132: "SELECT.SPECIAL",
        133: "APPLY.NAMES",
        134: "REPLACE.FONT",
        135: "FREEZE.PANES",
        136: "SHOW.INFO",
        137: "SPLIT",
        138: "ON.WINDOW",
        139: "ON.DATA",
        140: "DISABLE.INPUT",
        142: "OUTLINE",
        143: "LIST.NAMES",
        144: "FILE.CLOSE",
        145: "SAVE.WORKBOOK",
        146: "DATA.FORM",
        147: "COPY.CHART",
        148: "ON.TIME",
        149: "WAIT",
        150: "FORMAT.FONT",
        151: "FILL.UP",
        152: "FILL.LEFT",
        153: "DELETE.OVERLAY",
        155: "SHORT.MENUS",
        159: "SET.UPDATE.STATUS",
        161: "COLOR.PALETTE",
        162: "DELETE.STYLE",
        163: "WINDOW.RESTORE",
        164: "WINDOW.MAXIMIZE",
        166: "CHANGE.LINK",
        167: "CALCULATE.DOCUMENT",
        168: "ON.KEY",
        169: "APP.RESTORE",
        170: "APP.MOVE",
        171: "APP.SIZE",
        172: "APP.MINIMIZE",
        173: "APP.MAXIMIZE",
        174: "BRING.TO.FRONT",
        175: "SEND.TO.BACK",
        185: "MAIN.CHART.TYPE",
        186: "OVERLAY.CHART.TYPE",
        187: "SELECT.END",
        188: "OPEN.MAIL",
        189: "SEND.MAIL",
        190: "STANDARD.FONT",
        191: "CONSOLIDATE",
        192: "SORT.SPECIAL",
        193: "GALLERY.3D.AREA",
        194: "GALLERY.3D.COLUMN",
        195: "GALLERY.3D.LINE",
        196: "GALLERY.3D.PIE",
        197: "VIEW.3D",
        198: "GOAL.SEEK",
        199: "WORKGROUP",
        200: "FILL.GROUP",
        201: "UPDATE.LINK",
        202: "PROMOTE",
        203: "DEMOTE",
        204: "SHOW.DETAIL",
        206: "UNGROUP",
        207: "OBJECT.PROPERTIES",
        208: "SAVE.NEW.OBJECT",
        209: "SHARE",
        210: "SHARE.NAME",
        211: "DUPLICATE",
        212: "APPLY.STYLE",
        213: "ASSIGN.TO.OBJECT",
        214: "OBJECT.PROTECTION",
        215: "HIDE.OBJECT",
        216: "SET.EXTRACT",
        217: "CREATE.PUBLISHER",
        218: "SUBSCRIBE.TO",
        219: "ATTRIBUTES",
        220: "SHOW.TOOLBAR",
        222: "PRINT.PREVIEW",
        223: "EDIT.COLOR",
        224: "SHOW.LEVELS",
        225: "FORMAT.MAIN",
        226: "FORMAT.OVERLAY",
        227: "ON.RECALC",
        228: "EDIT.SERIES",
        229: "DEFINE.STYLE",
        240: "LINE.PRINT",
        243: "ENTER.DATA",
        249: "GALLERY.RADAR",
        250: "MERGE.STYLES",
        251: "EDITION.OPTIONS",
        252: "PASTE.PICTURE",
        253: "PASTE.PICTURE.LINK",
        254: "SPELLING",
        256: "ZOOM",
        259: "INSERT.OBJECT",
        260: "WINDOW.MINIMIZE",
        265: "SOUND.NOTE",
        266: "SOUND.PLAY",
        267: "FORMAT.SHAPE",
        268: "EXTEND.POLYGON",
        269: "FORMAT.AUTO",
        272: "GALLERY.3D.BAR",
        273: "GALLERY.3D.SURFACE",
        274: "FILL.AUTO",
        276: "CUSTOMIZE.TOOLBAR",
        277: "ADD.TOOL",
        278: "EDIT.OBJECT",
        279: "ON.DOUBLECLICK",
        280: "ON.ENTRY",
        281: "WORKBOOK.ADD",
        282: "WORKBOOK.MOVE",
        283: "WORKBOOK.COPY",
        284: "WORKBOOK.OPTIONS",
        285: "SAVE.WORKSPACE",
        288: "CHART.WIZARD",
        289: "DELETE.TOOL",
        290: "MOVE.TOOL",
        291: "WORKBOOK.SELECT",
        292: "WORKBOOK.ACTIVATE",
        293: "ASSIGN.TO.TOOL",
        295: "COPY.TOOL",
        296: "RESET.TOOL",
        297: "CONSTRAIN.NUMERIC",
        298: "PASTE.TOOL",
        302: "WORKBOOK.NEW",
        305: "SCENARIO.CELLS",
        306: "SCENARIO.DELETE",
        307: "SCENARIO.ADD",
        308: "SCENARIO.EDIT",
        309: "SCENARIO.SHOW",
        310: "SCENARIO.SHOW.NEXT",
        311: "SCENARIO.SUMMARY",
        312: "PIVOT.TABLE.WIZARD",
        313: "PIVOT.FIELD.PROPERTIES",
        314: "PIVOT.FIELD",
        315: "PIVOT.ITEM",
        316: "PIVOT.ADD.FIELDS",
        318: "OPTIONS.CALCULATION",
        319: "OPTIONS.EDIT",
        320: "OPTIONS.VIEW",
        321: "ADDIN.MANAGER",
        322: "MENU.EDITOR",
        323: "ATTACH.TOOLBARS",
        324: "VBAActivate",
        325: "OPTIONS.CHART",
        328: "VBA.INSERT.FILE",
        330: "VBA.PROCEDURE.DEFINITION",
        336: "ROUTING.SLIP",
        338: "ROUTE.DOCUMENT",
        339: "MAIL.LOGON",
        342: "INSERT.PICTURE",
        343: "EDIT.TOOL",
        344: "GALLERY.DOUGHNUT",
        350: "CHART.TREND",
        352: "PIVOT.ITEM.PROPERTIES",
        354: "WORKBOOK.INSERT",
        355: "OPTIONS.TRANSITION",
        356: "OPTIONS.GENERAL",
        370: "FILTER.ADVANCED",
        373: "MAIL.ADD.MAILER",
        374: "MAIL.DELETE.MAILER",
        375: "MAIL.REPLY",
        376: "MAIL.REPLY.ALL",
        377: "MAIL.FORWARD",
        378: "MAIL.NEXT.LETTER",
        379: "DATA.LABEL",
        380: "INSERT.TITLE",
        381: "FONT.PROPERTIES",
        382: "MACRO.OPTIONS",
        383: "WORKBOOK.HIDE",
        384: "WORKBOOK.UNHIDE",
        385: "WORKBOOK.DELETE",
        386: "WORKBOOK.NAME",
        388: "GALLERY.CUSTOM",
        390: "ADD.CHART.AUTOFORMAT",
        391: "DELETE.CHART.AUTOFORMAT",
        392: "CHART.ADD.DATA",
        393: "AUTO.OUTLINE",
        394: "TAB.ORDER",
        395: "SHOW.DIALOG",
        396: "SELECT.ALL",
        397: "UNGROUP.SHEETS",
        398: "SUBTOTAL.CREATE",
        399: "SUBTOTAL.REMOVE",
        400: "RENAME.OBJECT",
        412: "WORKBOOK.SCROLL",
        413: "WORKBOOK.NEXT",
        414: "WORKBOOK.PREV",
        415: "WORKBOOK.TAB.SPLIT",
        416: "FULL.SCREEN",
        417: "WORKBOOK.PROTECT",
        420: "SCROLLBAR.PROPERTIES",
        421: "PIVOT.SHOW.PAGES",
        422: "TEXT.TO.COLUMNS",
        423: "FORMAT.CHARTTYPE",
        424: "LINK.FORMAT",
        425: "TRACER.DISPLAY",
        430: "TRACER.NAVIGATE",
        431: "TRACER.CLEAR",
        432: "TRACER.ERROR",
        433: "PIVOT.FIELD.GROUP",
        434: "PIVOT.FIELD.UNGROUP",
        435: "CHECKBOX.PROPERTIES",
        436: "LABEL.PROPERTIES",
        437: "LISTBOX.PROPERTIES",
        438: "EDITBOX.PROPERTIES",
        439: "PIVOT.REFRESH",
        440: "LINK.COMBO",
        441: "OPEN.TEXT",
        442: "HIDE.DIALOG",
        443: "SET.DIALOG.FOCUS",
        444: "ENABLE.OBJECT",
        445: "PUSHBUTTON.PROPERTIES",
        446: "SET.DIALOG.DEFAULT",
        447: "FILTER",
        448: "FILTER.SHOW.ALL",
        449: "CLEAR.OUTLINE",
        450: "FUNCTION.WIZARD",
        451: "ADD.LIST.ITEM",
        452: "SET.LIST.ITEM",
        453: "REMOVE.LIST.ITEM",
        454: "SELECT.LIST.ITEM",
        455: "SET.CONTROL.VALUE",
        456: "SAVE.COPY.AS",
        458: "OPTIONS.LISTS.ADD",
        459: "OPTIONS.LISTS.DELETE",
        460: "SERIES.AXES",
        461: "SERIES.X",
        462: "SERIES.Y",
        463: "ERRORBAR.X",
        464: "ERRORBAR.Y",
        465: "FORMAT.CHART",
        466: "SERIES.ORDER",
        467: "MAIL.LOGOFF",
        468: "CLEAR.ROUTING.SLIP",
        469: "APP.ACTIVATE.MICROSOFT",
        470: "MAIL.EDIT.MAILER",
        471: "ON.SHEET",
        472: "STANDARD.WIDTH",
        473: "SCENARIO.MERGE",
        474: "SUMMARY.INFO",
        475: "FIND.FILE",
        476: "ACTIVE.CELL.FONT",
        477: "ENABLE.TIPWIZARD",
        478: "VBA.MAKE.ADDIN",
        480: "INSERTDATATABLE",
        481: "WORKGROUP.OPTIONS",
        482: "MAIL.SEND.MAILER",
        485: "AUTOCORRECT",
        489: "POST.DOCUMENT",
        491: "PICKLIST",
        493: "VIEW.SHOW",
        494: "VIEW.DEFINE",
        495: "VIEW.DELETE",
        509: "SHEET.BACKGROUND",
        510: "INSERT.MAP.OBJECT",
        511: "OPTIONS.MENONO",
        517: "MSOCHECKS",
        518: "NORMAL",
        519: "LAYOUT",
        520: "RM.PRINT.AREA",
        521: "CLEAR.PRINT.AREA",
        522: "ADD.PRINT.AREA",
        523: "MOVE.BRK",
        545: "HIDECURR.NOTE",
        546: "HIDEALL.NOTES",
        547: "DELETE.NOTE",
        548: "TRAVERSE.NOTES",
        549: "ACTIVATE.NOTES",
        620: "PROTECT.REVISIONS",
        621: "UNPROTECT.REVISIONS",
        647: "OPTIONS.ME",
        653: "WEB.PUBLISH",
        667: "NEWWEBQUERY",
        673: "PIVOT.TABLE.CHART",
        753: "OPTIONS.SAVE",
        755: "OPTIONS.SPELL",
        808: "HIDEALL.INKANNOTS"
    }, Gp = {
        0: "COUNT",
        1: "IF",
        2: "ISNA",
        3: "ISERROR",
        4: "SUM",
        5: "AVERAGE",
        6: "MIN",
        7: "MAX",
        8: "ROW",
        9: "COLUMN",
        10: "NA",
        11: "NPV",
        12: "STDEV",
        13: "DOLLAR",
        14: "FIXED",
        15: "SIN",
        16: "COS",
        17: "TAN",
        18: "ATAN",
        19: "PI",
        20: "SQRT",
        21: "EXP",
        22: "LN",
        23: "LOG10",
        24: "ABS",
        25: "INT",
        26: "SIGN",
        27: "ROUND",
        28: "LOOKUP",
        29: "INDEX",
        30: "REPT",
        31: "MID",
        32: "LEN",
        33: "VALUE",
        34: "TRUE",
        35: "FALSE",
        36: "AND",
        37: "OR",
        38: "NOT",
        39: "MOD",
        40: "DCOUNT",
        41: "DSUM",
        42: "DAVERAGE",
        43: "DMIN",
        44: "DMAX",
        45: "DSTDEV",
        46: "VAR",
        47: "DVAR",
        48: "TEXT",
        49: "LINEST",
        50: "TREND",
        51: "LOGEST",
        52: "GROWTH",
        53: "GOTO",
        54: "HALT",
        55: "RETURN",
        56: "PV",
        57: "FV",
        58: "NPER",
        59: "PMT",
        60: "RATE",
        61: "MIRR",
        62: "IRR",
        63: "RAND",
        64: "MATCH",
        65: "DATE",
        66: "TIME",
        67: "DAY",
        68: "MONTH",
        69: "YEAR",
        70: "WEEKDAY",
        71: "HOUR",
        72: "MINUTE",
        73: "SECOND",
        74: "NOW",
        75: "AREAS",
        76: "ROWS",
        77: "COLUMNS",
        78: "OFFSET",
        79: "ABSREF",
        80: "RELREF",
        81: "ARGUMENT",
        82: "SEARCH",
        83: "TRANSPOSE",
        84: "ERROR",
        85: "STEP",
        86: "TYPE",
        87: "ECHO",
        88: "SET.NAME",
        89: "CALLER",
        90: "DEREF",
        91: "WINDOWS",
        92: "SERIES",
        93: "DOCUMENTS",
        94: "ACTIVE.CELL",
        95: "SELECTION",
        96: "RESULT",
        97: "ATAN2",
        98: "ASIN",
        99: "ACOS",
        100: "CHOOSE",
        101: "HLOOKUP",
        102: "VLOOKUP",
        103: "LINKS",
        104: "INPUT",
        105: "ISREF",
        106: "GET.FORMULA",
        107: "GET.NAME",
        108: "SET.VALUE",
        109: "LOG",
        110: "EXEC",
        111: "CHAR",
        112: "LOWER",
        113: "UPPER",
        114: "PROPER",
        115: "LEFT",
        116: "RIGHT",
        117: "EXACT",
        118: "TRIM",
        119: "REPLACE",
        120: "SUBSTITUTE",
        121: "CODE",
        122: "NAMES",
        123: "DIRECTORY",
        124: "FIND",
        125: "CELL",
        126: "ISERR",
        127: "ISTEXT",
        128: "ISNUMBER",
        129: "ISBLANK",
        130: "T",
        131: "N",
        132: "FOPEN",
        133: "FCLOSE",
        134: "FSIZE",
        135: "FREADLN",
        136: "FREAD",
        137: "FWRITELN",
        138: "FWRITE",
        139: "FPOS",
        140: "DATEVALUE",
        141: "TIMEVALUE",
        142: "SLN",
        143: "SYD",
        144: "DDB",
        145: "GET.DEF",
        146: "REFTEXT",
        147: "TEXTREF",
        148: "INDIRECT",
        149: "REGISTER",
        150: "CALL",
        151: "ADD.BAR",
        152: "ADD.MENU",
        153: "ADD.COMMAND",
        154: "ENABLE.COMMAND",
        155: "CHECK.COMMAND",
        156: "RENAME.COMMAND",
        157: "SHOW.BAR",
        158: "DELETE.MENU",
        159: "DELETE.COMMAND",
        160: "GET.CHART.ITEM",
        161: "DIALOG.BOX",
        162: "CLEAN",
        163: "MDETERM",
        164: "MINVERSE",
        165: "MMULT",
        166: "FILES",
        167: "IPMT",
        168: "PPMT",
        169: "COUNTA",
        170: "CANCEL.KEY",
        171: "FOR",
        172: "WHILE",
        173: "BREAK",
        174: "NEXT",
        175: "INITIATE",
        176: "REQUEST",
        177: "POKE",
        178: "EXECUTE",
        179: "TERMINATE",
        180: "RESTART",
        181: "HELP",
        182: "GET.BAR",
        183: "PRODUCT",
        184: "FACT",
        185: "GET.CELL",
        186: "GET.WORKSPACE",
        187: "GET.WINDOW",
        188: "GET.DOCUMENT",
        189: "DPRODUCT",
        190: "ISNONTEXT",
        191: "GET.NOTE",
        192: "NOTE",
        193: "STDEVP",
        194: "VARP",
        195: "DSTDEVP",
        196: "DVARP",
        197: "TRUNC",
        198: "ISLOGICAL",
        199: "DCOUNTA",
        200: "DELETE.BAR",
        201: "UNREGISTER",
        204: "USDOLLAR",
        205: "FINDB",
        206: "SEARCHB",
        207: "REPLACEB",
        208: "LEFTB",
        209: "RIGHTB",
        210: "MIDB",
        211: "LENB",
        212: "ROUNDUP",
        213: "ROUNDDOWN",
        214: "ASC",
        215: "DBCS",
        216: "RANK",
        219: "ADDRESS",
        220: "DAYS360",
        221: "TODAY",
        222: "VDB",
        223: "ELSE",
        224: "ELSE.IF",
        225: "END.IF",
        226: "FOR.CELL",
        227: "MEDIAN",
        228: "SUMPRODUCT",
        229: "SINH",
        230: "COSH",
        231: "TANH",
        232: "ASINH",
        233: "ACOSH",
        234: "ATANH",
        235: "DGET",
        236: "CREATE.OBJECT",
        237: "VOLATILE",
        238: "LAST.ERROR",
        239: "CUSTOM.UNDO",
        240: "CUSTOM.REPEAT",
        241: "FORMULA.CONVERT",
        242: "GET.LINK.INFO",
        243: "TEXT.BOX",
        244: "INFO",
        245: "GROUP",
        246: "GET.OBJECT",
        247: "DB",
        248: "PAUSE",
        251: "RESUME",
        252: "FREQUENCY",
        253: "ADD.TOOLBAR",
        254: "DELETE.TOOLBAR",
        255: "User",
        256: "RESET.TOOLBAR",
        257: "EVALUATE",
        258: "GET.TOOLBAR",
        259: "GET.TOOL",
        260: "SPELLING.CHECK",
        261: "ERROR.TYPE",
        262: "APP.TITLE",
        263: "WINDOW.TITLE",
        264: "SAVE.TOOLBAR",
        265: "ENABLE.TOOL",
        266: "PRESS.TOOL",
        267: "REGISTER.ID",
        268: "GET.WORKBOOK",
        269: "AVEDEV",
        270: "BETADIST",
        271: "GAMMALN",
        272: "BETAINV",
        273: "BINOMDIST",
        274: "CHIDIST",
        275: "CHIINV",
        276: "COMBIN",
        277: "CONFIDENCE",
        278: "CRITBINOM",
        279: "EVEN",
        280: "EXPONDIST",
        281: "FDIST",
        282: "FINV",
        283: "FISHER",
        284: "FISHERINV",
        285: "FLOOR",
        286: "GAMMADIST",
        287: "GAMMAINV",
        288: "CEILING",
        289: "HYPGEOMDIST",
        290: "LOGNORMDIST",
        291: "LOGINV",
        292: "NEGBINOMDIST",
        293: "NORMDIST",
        294: "NORMSDIST",
        295: "NORMINV",
        296: "NORMSINV",
        297: "STANDARDIZE",
        298: "ODD",
        299: "PERMUT",
        300: "POISSON",
        301: "TDIST",
        302: "WEIBULL",
        303: "SUMXMY2",
        304: "SUMX2MY2",
        305: "SUMX2PY2",
        306: "CHITEST",
        307: "CORREL",
        308: "COVAR",
        309: "FORECAST",
        310: "FTEST",
        311: "INTERCEPT",
        312: "PEARSON",
        313: "RSQ",
        314: "STEYX",
        315: "SLOPE",
        316: "TTEST",
        317: "PROB",
        318: "DEVSQ",
        319: "GEOMEAN",
        320: "HARMEAN",
        321: "SUMSQ",
        322: "KURT",
        323: "SKEW",
        324: "ZTEST",
        325: "LARGE",
        326: "SMALL",
        327: "QUARTILE",
        328: "PERCENTILE",
        329: "PERCENTRANK",
        330: "MODE",
        331: "TRIMMEAN",
        332: "TINV",
        334: "MOVIE.COMMAND",
        335: "GET.MOVIE",
        336: "CONCATENATE",
        337: "POWER",
        338: "PIVOT.ADD.DATA",
        339: "GET.PIVOT.TABLE",
        340: "GET.PIVOT.FIELD",
        341: "GET.PIVOT.ITEM",
        342: "RADIANS",
        343: "DEGREES",
        344: "SUBTOTAL",
        345: "SUMIF",
        346: "COUNTIF",
        347: "COUNTBLANK",
        348: "SCENARIO.GET",
        349: "OPTIONS.LISTS.GET",
        350: "ISPMT",
        351: "DATEDIF",
        352: "DATESTRING",
        353: "NUMBERSTRING",
        354: "ROMAN",
        355: "OPEN.DIALOG",
        356: "SAVE.DIALOG",
        357: "VIEW.GET",
        358: "GETPIVOTDATA",
        359: "HYPERLINK",
        360: "PHONETIC",
        361: "AVERAGEA",
        362: "MAXA",
        363: "MINA",
        364: "STDEVPA",
        365: "VARPA",
        366: "STDEVA",
        367: "VARA",
        368: "BAHTTEXT",
        369: "THAIDAYOFWEEK",
        370: "THAIDIGIT",
        371: "THAIMONTHOFYEAR",
        372: "THAINUMSOUND",
        373: "THAINUMSTRING",
        374: "THAISTRINGLENGTH",
        375: "ISTHAIDIGIT",
        376: "ROUNDBAHTDOWN",
        377: "ROUNDBAHTUP",
        378: "THAIYEAR",
        379: "RTD",
        380: "CUBEVALUE",
        381: "CUBEMEMBER",
        382: "CUBEMEMBERPROPERTY",
        383: "CUBERANKEDMEMBER",
        384: "HEX2BIN",
        385: "HEX2DEC",
        386: "HEX2OCT",
        387: "DEC2BIN",
        388: "DEC2HEX",
        389: "DEC2OCT",
        390: "OCT2BIN",
        391: "OCT2HEX",
        392: "OCT2DEC",
        393: "BIN2DEC",
        394: "BIN2OCT",
        395: "BIN2HEX",
        396: "IMSUB",
        397: "IMDIV",
        398: "IMPOWER",
        399: "IMABS",
        400: "IMSQRT",
        401: "IMLN",
        402: "IMLOG2",
        403: "IMLOG10",
        404: "IMSIN",
        405: "IMCOS",
        406: "IMEXP",
        407: "IMARGUMENT",
        408: "IMCONJUGATE",
        409: "IMAGINARY",
        410: "IMREAL",
        411: "COMPLEX",
        412: "IMSUM",
        413: "IMPRODUCT",
        414: "SERIESSUM",
        415: "FACTDOUBLE",
        416: "SQRTPI",
        417: "QUOTIENT",
        418: "DELTA",
        419: "GESTEP",
        420: "ISEVEN",
        421: "ISODD",
        422: "MROUND",
        423: "ERF",
        424: "ERFC",
        425: "BESSELJ",
        426: "BESSELK",
        427: "BESSELY",
        428: "BESSELI",
        429: "XIRR",
        430: "XNPV",
        431: "PRICEMAT",
        432: "YIELDMAT",
        433: "INTRATE",
        434: "RECEIVED",
        435: "DISC",
        436: "PRICEDISC",
        437: "YIELDDISC",
        438: "TBILLEQ",
        439: "TBILLPRICE",
        440: "TBILLYIELD",
        441: "PRICE",
        442: "YIELD",
        443: "DOLLARDE",
        444: "DOLLARFR",
        445: "NOMINAL",
        446: "EFFECT",
        447: "CUMPRINC",
        448: "CUMIPMT",
        449: "EDATE",
        450: "EOMONTH",
        451: "YEARFRAC",
        452: "COUPDAYBS",
        453: "COUPDAYS",
        454: "COUPDAYSNC",
        455: "COUPNCD",
        456: "COUPNUM",
        457: "COUPPCD",
        458: "DURATION",
        459: "MDURATION",
        460: "ODDLPRICE",
        461: "ODDLYIELD",
        462: "ODDFPRICE",
        463: "ODDFYIELD",
        464: "RANDBETWEEN",
        465: "WEEKNUM",
        466: "AMORDEGRC",
        467: "AMORLINC",
        468: "CONVERT",
        724: "SHEETJS",
        469: "ACCRINT",
        470: "ACCRINTM",
        471: "WORKDAY",
        472: "NETWORKDAYS",
        473: "GCD",
        474: "MULTINOMIAL",
        475: "LCM",
        476: "FVSCHEDULE",
        477: "CUBEKPIMEMBER",
        478: "CUBESET",
        479: "CUBESETCOUNT",
        480: "IFERROR",
        481: "COUNTIFS",
        482: "SUMIFS",
        483: "AVERAGEIF",
        484: "AVERAGEIFS"
    }, Hp = {
        2: 1,
        3: 1,
        10: 0,
        15: 1,
        16: 1,
        17: 1,
        18: 1,
        19: 0,
        20: 1,
        21: 1,
        22: 1,
        23: 1,
        24: 1,
        25: 1,
        26: 1,
        27: 2,
        30: 2,
        31: 3,
        32: 1,
        33: 1,
        34: 0,
        35: 0,
        38: 1,
        39: 2,
        40: 3,
        41: 3,
        42: 3,
        43: 3,
        44: 3,
        45: 3,
        47: 3,
        48: 2,
        53: 1,
        61: 3,
        63: 0,
        65: 3,
        66: 3,
        67: 1,
        68: 1,
        69: 1,
        70: 1,
        71: 1,
        72: 1,
        73: 1,
        74: 0,
        75: 1,
        76: 1,
        77: 1,
        79: 2,
        80: 2,
        83: 1,
        85: 0,
        86: 1,
        89: 0,
        90: 1,
        94: 0,
        95: 0,
        97: 2,
        98: 1,
        99: 1,
        101: 3,
        102: 3,
        105: 1,
        106: 1,
        108: 2,
        111: 1,
        112: 1,
        113: 1,
        114: 1,
        117: 2,
        118: 1,
        119: 4,
        121: 1,
        126: 1,
        127: 1,
        128: 1,
        129: 1,
        130: 1,
        131: 1,
        133: 1,
        134: 1,
        135: 1,
        136: 2,
        137: 2,
        138: 2,
        140: 1,
        141: 1,
        142: 3,
        143: 4,
        144: 4,
        161: 1,
        162: 1,
        163: 1,
        164: 1,
        165: 2,
        172: 1,
        175: 2,
        176: 2,
        177: 3,
        178: 2,
        179: 1,
        184: 1,
        186: 1,
        189: 3,
        190: 1,
        195: 3,
        196: 3,
        197: 1,
        198: 1,
        199: 3,
        201: 1,
        207: 4,
        210: 3,
        211: 1,
        212: 2,
        213: 2,
        214: 1,
        215: 1,
        225: 0,
        229: 1,
        230: 1,
        231: 1,
        232: 1,
        233: 1,
        234: 1,
        235: 3,
        244: 1,
        247: 4,
        252: 2,
        257: 1,
        261: 1,
        271: 1,
        273: 4,
        274: 2,
        275: 2,
        276: 2,
        277: 3,
        278: 3,
        279: 1,
        280: 3,
        281: 3,
        282: 3,
        283: 1,
        284: 1,
        285: 2,
        286: 4,
        287: 3,
        288: 2,
        289: 4,
        290: 3,
        291: 3,
        292: 3,
        293: 4,
        294: 1,
        295: 3,
        296: 1,
        297: 3,
        298: 1,
        299: 2,
        300: 3,
        301: 3,
        302: 4,
        303: 2,
        304: 2,
        305: 2,
        306: 2,
        307: 2,
        308: 2,
        309: 3,
        310: 2,
        311: 2,
        312: 2,
        313: 2,
        314: 2,
        315: 2,
        316: 4,
        325: 2,
        326: 2,
        327: 2,
        328: 2,
        331: 2,
        332: 2,
        337: 2,
        342: 1,
        343: 1,
        346: 2,
        347: 1,
        350: 4,
        351: 3,
        352: 1,
        353: 2,
        360: 1,
        368: 1,
        369: 1,
        370: 1,
        371: 1,
        372: 1,
        373: 1,
        374: 1,
        375: 1,
        376: 1,
        377: 1,
        378: 1,
        382: 3,
        385: 1,
        392: 1,
        393: 1,
        396: 2,
        397: 2,
        398: 2,
        399: 1,
        400: 1,
        401: 1,
        402: 1,
        403: 1,
        404: 1,
        405: 1,
        406: 1,
        407: 1,
        408: 1,
        409: 1,
        410: 1,
        414: 4,
        415: 1,
        416: 1,
        417: 2,
        420: 1,
        421: 1,
        422: 2,
        424: 1,
        425: 2,
        426: 2,
        427: 2,
        428: 2,
        430: 3,
        438: 3,
        439: 3,
        440: 3,
        443: 2,
        444: 2,
        445: 2,
        446: 2,
        447: 6,
        448: 6,
        449: 2,
        450: 2,
        464: 2,
        468: 3,
        476: 2,
        479: 1,
        480: 2,
        65535: 0
    }, Ip = {
        "_xlfn.ACOT": "ACOT",
        "_xlfn.ACOTH": "ACOTH",
        "_xlfn.AGGREGATE": "AGGREGATE",
        "_xlfn.ARABIC": "ARABIC",
        "_xlfn.AVERAGEIF": "AVERAGEIF",
        "_xlfn.AVERAGEIFS": "AVERAGEIFS",
        "_xlfn.BASE": "BASE",
        "_xlfn.BETA.DIST": "BETA.DIST",
        "_xlfn.BETA.INV": "BETA.INV",
        "_xlfn.BINOM.DIST": "BINOM.DIST",
        "_xlfn.BINOM.DIST.RANGE": "BINOM.DIST.RANGE",
        "_xlfn.BINOM.INV": "BINOM.INV",
        "_xlfn.BITAND": "BITAND",
        "_xlfn.BITLSHIFT": "BITLSHIFT",
        "_xlfn.BITOR": "BITOR",
        "_xlfn.BITRSHIFT": "BITRSHIFT",
        "_xlfn.BITXOR": "BITXOR",
        "_xlfn.CEILING.MATH": "CEILING.MATH",
        "_xlfn.CEILING.PRECISE": "CEILING.PRECISE",
        "_xlfn.CHISQ.DIST": "CHISQ.DIST",
        "_xlfn.CHISQ.DIST.RT": "CHISQ.DIST.RT",
        "_xlfn.CHISQ.INV": "CHISQ.INV",
        "_xlfn.CHISQ.INV.RT": "CHISQ.INV.RT",
        "_xlfn.CHISQ.TEST": "CHISQ.TEST",
        "_xlfn.COMBINA": "COMBINA",
        "_xlfn.CONCAT": "CONCAT",
        "_xlfn.CONFIDENCE.NORM": "CONFIDENCE.NORM",
        "_xlfn.CONFIDENCE.T": "CONFIDENCE.T",
        "_xlfn.COT": "COT",
        "_xlfn.COTH": "COTH",
        "_xlfn.COUNTIFS": "COUNTIFS",
        "_xlfn.COVARIANCE.P": "COVARIANCE.P",
        "_xlfn.COVARIANCE.S": "COVARIANCE.S",
        "_xlfn.CSC": "CSC",
        "_xlfn.CSCH": "CSCH",
        "_xlfn.DAYS": "DAYS",
        "_xlfn.DECIMAL": "DECIMAL",
        "_xlfn.ECMA.CEILING": "ECMA.CEILING",
        "_xlfn.ERF.PRECISE": "ERF.PRECISE",
        "_xlfn.ERFC.PRECISE": "ERFC.PRECISE",
        "_xlfn.EXPON.DIST": "EXPON.DIST",
        "_xlfn.F.DIST": "F.DIST",
        "_xlfn.F.DIST.RT": "F.DIST.RT",
        "_xlfn.F.INV": "F.INV",
        "_xlfn.F.INV.RT": "F.INV.RT",
        "_xlfn.F.TEST": "F.TEST",
        "_xlfn.FILTERXML": "FILTERXML",
        "_xlfn.FLOOR.MATH": "FLOOR.MATH",
        "_xlfn.FLOOR.PRECISE": "FLOOR.PRECISE",
        "_xlfn.FORECAST.ETS": "FORECAST.ETS",
        "_xlfn.FORECAST.ETS.CONFINT": "FORECAST.ETS.CONFINT",
        "_xlfn.FORECAST.ETS.SEASONALITY": "FORECAST.ETS.SEASONALITY",
        "_xlfn.FORECAST.ETS.STAT": "FORECAST.ETS.STAT",
        "_xlfn.FORECAST.LINEAR": "FORECAST.LINEAR",
        "_xlfn.FORMULATEXT": "FORMULATEXT",
        "_xlfn.GAMMA": "GAMMA",
        "_xlfn.GAMMA.DIST": "GAMMA.DIST",
        "_xlfn.GAMMA.INV": "GAMMA.INV",
        "_xlfn.GAMMALN.PRECISE": "GAMMALN.PRECISE",
        "_xlfn.GAUSS": "GAUSS",
        "_xlfn.HYPGEOM.DIST": "HYPGEOM.DIST",
        "_xlfn.IFERROR": "IFERROR",
        "_xlfn.IFNA": "IFNA",
        "_xlfn.IFS": "IFS",
        "_xlfn.IMCOSH": "IMCOSH",
        "_xlfn.IMCOT": "IMCOT",
        "_xlfn.IMCSC": "IMCSC",
        "_xlfn.IMCSCH": "IMCSCH",
        "_xlfn.IMSEC": "IMSEC",
        "_xlfn.IMSECH": "IMSECH",
        "_xlfn.IMSINH": "IMSINH",
        "_xlfn.IMTAN": "IMTAN",
        "_xlfn.ISFORMULA": "ISFORMULA",
        "_xlfn.ISO.CEILING": "ISO.CEILING",
        "_xlfn.ISOWEEKNUM": "ISOWEEKNUM",
        "_xlfn.LOGNORM.DIST": "LOGNORM.DIST",
        "_xlfn.LOGNORM.INV": "LOGNORM.INV",
        "_xlfn.MAXIFS": "MAXIFS",
        "_xlfn.MINIFS": "MINIFS",
        "_xlfn.MODE.MULT": "MODE.MULT",
        "_xlfn.MODE.SNGL": "MODE.SNGL",
        "_xlfn.MUNIT": "MUNIT",
        "_xlfn.NEGBINOM.DIST": "NEGBINOM.DIST",
        "_xlfn.NETWORKDAYS.INTL": "NETWORKDAYS.INTL",
        "_xlfn.NIGBINOM": "NIGBINOM",
        "_xlfn.NORM.DIST": "NORM.DIST",
        "_xlfn.NORM.INV": "NORM.INV",
        "_xlfn.NORM.S.DIST": "NORM.S.DIST",
        "_xlfn.NORM.S.INV": "NORM.S.INV",
        "_xlfn.NUMBERVALUE": "NUMBERVALUE",
        "_xlfn.PDURATION": "PDURATION",
        "_xlfn.PERCENTILE.EXC": "PERCENTILE.EXC",
        "_xlfn.PERCENTILE.INC": "PERCENTILE.INC",
        "_xlfn.PERCENTRANK.EXC": "PERCENTRANK.EXC",
        "_xlfn.PERCENTRANK.INC": "PERCENTRANK.INC",
        "_xlfn.PERMUTATIONA": "PERMUTATIONA",
        "_xlfn.PHI": "PHI",
        "_xlfn.POISSON.DIST": "POISSON.DIST",
        "_xlfn.QUARTILE.EXC": "QUARTILE.EXC",
        "_xlfn.QUARTILE.INC": "QUARTILE.INC",
        "_xlfn.QUERYSTRING": "QUERYSTRING",
        "_xlfn.RANK.AVG": "RANK.AVG",
        "_xlfn.RANK.EQ": "RANK.EQ",
        "_xlfn.RRI": "RRI",
        "_xlfn.SEC": "SEC",
        "_xlfn.SECH": "SECH",
        "_xlfn.SHEET": "SHEET",
        "_xlfn.SHEETS": "SHEETS",
        "_xlfn.SKEW.P": "SKEW.P",
        "_xlfn.STDEV.P": "STDEV.P",
        "_xlfn.STDEV.S": "STDEV.S",
        "_xlfn.SUMIFS": "SUMIFS",
        "_xlfn.SWITCH": "SWITCH",
        "_xlfn.T.DIST": "T.DIST",
        "_xlfn.T.DIST.2T": "T.DIST.2T",
        "_xlfn.T.DIST.RT": "T.DIST.RT",
        "_xlfn.T.INV": "T.INV",
        "_xlfn.T.INV.2T": "T.INV.2T",
        "_xlfn.T.TEST": "T.TEST",
        "_xlfn.TEXTJOIN": "TEXTJOIN",
        "_xlfn.UNICHAR": "UNICHAR",
        "_xlfn.UNICODE": "UNICODE",
        "_xlfn.VAR.P": "VAR.P",
        "_xlfn.VAR.S": "VAR.S",
        "_xlfn.WEBSERVICE": "WEBSERVICE",
        "_xlfn.WEIBULL.DIST": "WEIBULL.DIST",
        "_xlfn.WORKDAY.INTL": "WORKDAY.INTL",
        "_xlfn.XOR": "XOR",
        "_xlfn.Z.TEST": "Z.TEST"
    }, Jp = {}, Kp = {};
    Un.WS = ["http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet", "http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"];
    var Lp = "undefined" != typeof Map, Mp = /<(?:\w:)?mergeCell ref="[A-Z0-9:]+"\s*[\/]?>/g,
        Np = /<(?:\w+:)?sheetData>([\s\S]*)<\/(?:\w+:)?sheetData>/, Op = /<(?:\w:)?hyperlink [^>]*>/gm,
        Pp = /"(\w*:\w*)"/, Qp = /<(?:\w:)?col\b[^>]*[\/]?>/g,
        Rp = /<(?:\w:)?autoFilter[^>]*([\/]|>([\s\S]*)<\/(?:\w:)?autoFilter)>/g, Sp = /<(?:\w:)?pageMargins[^>]*\/>/g,
        Tp = /<(?:\w:)?sheetPr\b(?:[^>a-z][^>]*)?\/>/,
        Up = /<(?:\w:)?sheetViews[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetViews)>/,
        Vp = /<(?:\w:)?sheetView(?:[^>a-z][^>]*)?\/>/, Wp = function () {
            var a = /<(?:\w+:)?c[ >]/, b = /<\/(?:\w+:)?row>/, c = /r=["']([^"']*)["']/,
                d = /<(?:\w+:)?is>([\S\s]*?)<\/(?:\w+:)?is>/, e = /ref=["']([^"']*)["']/, f = ym("v"), g = ym("f");
            return function (h, i, j, k, l, m) {
                for (var n, o, p, q, r, s = 0, t = "", u = [], v = [], y = 0, A = 0, B = 0, C = "", D = 0, E = 0, F = 0, G = 0, H = Array.isArray(m.CellXf), I = [], J = [], K = Array.isArray(i), L = [], M = {}, N = !1, O = h.split(b), Q = 0, R = O.length; Q != R; ++Q) {
                    t = O[Q].trim();
                    var S = t.length;
                    if (0 !== S) {
                        for (s = 0; s < S && 62 !== t.charCodeAt(s); ++s) ;
                        if (++s, o = P(t.slice(0, s), !0), D = null != o.r ? parseInt(o.r, 10) : D + 1, E = -1, !(j.sheetRows && j.sheetRows < D)) for (k.s.r > D - 1 && (k.s.r = D - 1), k.e.r < D - 1 && (k.e.r = D - 1), j && j.cellStyles && (M = {}, N = !1, o.ht && (N = !0, M.hpt = parseFloat(o.ht), M.hpx = Ve(M.hpt)), "1" == o.hidden && (N = !0, M.hidden = !0), null != o.outlineLevel && (N = !0, M.level = +o.outlineLevel), N && (L[D - 1] = M)), u = t.slice(s).split(a), s = 0; s != u.length; ++s) if (t = u[s].trim(), 0 !== t.length) {
                            if (v = t.match(c), y = s, A = 0, B = 0, t = "<c " + ("<" == t.slice(0, 1) ? ">" : "") + t, null != v && 2 === v.length) {
                                for (y = 0, C = v[1], A = 0; A != C.length && !((B = C.charCodeAt(A) - 64) < 1 || B > 26); ++A) y = 26 * y + B;
                                --y, E = y
                            } else ++E;
                            for (A = 0; A != t.length && 62 !== t.charCodeAt(A); ++A) ;
                            if (++A, o = P(t.slice(0, A), !0), o.r || (o.r = Aa({
                                r: D - 1,
                                c: E
                            })), C = t.slice(A), n = {t: ""}, null != (v = C.match(f)) && "" !== v[1] && (n.v = nm(v[1])), j.cellFormula) {
                                null != (v = C.match(g)) && "" !== v[1] ? (n.f = lg(nm(tm(v[1]))), v[0].indexOf('t="array"') > -1 ? (n.F = (C.match(e) || [])[1], n.F.indexOf(":") > -1 && I.push([Da(n.F), n.F])) : v[0].indexOf('t="shared"') > -1 && (q = P(v[0]), J[parseInt(q.si, 10)] = [q, lg(nm(tm(v[1]))), o.r])) : (v = C.match(/<f[^>]*\/>/)) && (q = P(v[0]), J[q.si] && (n.f = jg(J[q.si][1], J[q.si][2], o.r)));
                                var U = za(o.r);
                                for (A = 0; A < I.length; ++A) U.r >= I[A][0].s.r && U.r <= I[A][0].e.r && U.c >= I[A][0].s.c && U.c <= I[A][0].e.c && (n.F = I[A][1])
                            }
                            if (null == o.t && void 0 === n.v) if (n.f || n.F) n.v = 0, n.t = "n"; else {
                                if (!j.sheetStubs) continue;
                                n.t = "z"
                            } else n.t = o.t || "n";
                            switch (k.s.c > E && (k.s.c = E), k.e.c < E && (k.e.c = E), n.t) {
                                case"n":
                                    if ("" == n.v || null == n.v) {
                                        if (!j.sheetStubs) continue;
                                        n.t = "z"
                                    } else n.v = parseFloat(n.v);
                                    break;
                                case"s":
                                    if (void 0 === n.v) {
                                        if (!j.sheetStubs) continue;
                                        n.t = "z"
                                    } else p = Jp[parseInt(n.v, 10)], n.v = p.t, n.r = p.r, j.cellHTML && (n.h = p.h);
                                    break;
                                case"str":
                                    n.t = "s", n.v = null != n.v ? tm(n.v) : "", j.cellHTML && (n.h = T(n.v));
                                    break;
                                case"inlineStr":
                                    v = C.match(d), n.t = "s", null != v && (p = ie(v[1])) ? n.v = p.t : n.v = "";
                                    break;
                                case"b":
                                    n.v = V(n.v);
                                    break;
                                case"d":
                                    j.cellDates ? n.v = z(n.v, 1) : (n.v = w(z(n.v, 1)), n.t = "n");
                                    break;
                                case"e":
                                    j && !1 === j.cellText || (n.w = n.v), n.v = tn[n.v]
                            }
                            if (F = G = 0, H && void 0 !== o.s && null != (r = m.CellXf[o.s]) && (null != r.numFmtId && (F = r.numFmtId), j.cellStyles && null != r.fillId && (G = r.fillId)), Mh(n, F, G, j, l, m), j.cellDates && H && "n" == n.t && Tl.is_date(Tl._table[F]) && (n.t = "d", n.v = x(n.v)), K) {
                                var W = za(o.r);
                                i[W.r] || (i[W.r] = []), i[W.r][W.c] = n
                            } else i[o.r] = n
                        }
                    }
                }
                L.length > 0 && (i["!rows"] = L)
            }
        }(), Xp = Z("worksheet", null, {xmlns: Em.main[0], "xmlns:r": Em.r}), Yp = qn, Zp = rn, $p = qn, _p = rn,
        aq = ["left", "right", "top", "bottom", "header", "footer"];
    Un.CS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet";
    var bq = (Z("chartsheet", null, {
            xmlns: Em.main[0],
            "xmlns:r": Em.r
        }), [["allowRefreshQuery", !1, "bool"], ["autoCompressPictures", !0, "bool"], ["backupFile", !1, "bool"], ["checkCompatibility", !1, "bool"], ["CodeName", ""], ["date1904", !1, "bool"], ["defaultThemeVersion", 0, "int"], ["filterPrivacy", !1, "bool"], ["hidePivotFieldList", !1, "bool"], ["promptedSolutions", !1, "bool"], ["publishItems", !1, "bool"], ["refreshAllConnections", !1, "bool"], ["saveExternalLinkValues", !0, "bool"], ["showBorderUnselectedTables", !0, "bool"], ["showInkAnnotation", !0, "bool"], ["showObjects", "all"], ["showPivotChartFilter", !1, "bool"], ["updateLinks", "userSet"]]),
        cq = [["activeTab", 0, "int"], ["autoFilterDateGrouping", !0, "bool"], ["firstSheet", 0, "int"], ["minimized", !1, "bool"], ["showHorizontalScroll", !0, "bool"], ["showSheetTabs", !0, "bool"], ["showVerticalScroll", !0, "bool"], ["tabRatio", 600, "int"], ["visibility", "visible"]],
        dq = [],
        eq = [["calcCompleted", "true"], ["calcMode", "auto"], ["calcOnSave", "true"], ["concurrentCalc", "true"], ["fullCalcOnLoad", "false"], ["fullPrecision", "true"], ["iterate", "false"], ["iterateCount", "100"], ["iterateDelta", "0.001"], ["refMode", "A1"]],
        fq = "][*?/\\".split(""), gq = /<\w+:workbook/, hq = Z("workbook", null, {xmlns: Em.main[0], "xmlns:r": Em.r}),
        iq = /([\w:]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g,
        jq = /([\w:]+)=((?:")(?:[^"]*)(?:")|(?:')(?:[^']*)(?:'))/, kq = function (a) {
            return String.fromCharCode(a)
        }, lq = /<(\/?)([^\s?>!\/:]*:|)([^\s?>:\/]+)[^>]*>/gm, mq = {
            SI: "e0859ff2f94f6810ab9108002b27b3d9",
            DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
            UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
        }, nq = {
            0: {n: "BrtRowHdr", f: di},
            1: {n: "BrtCellBlank", f: ji},
            2: {n: "BrtCellRk", f: si},
            3: {n: "BrtCellError", f: ni},
            4: {n: "BrtCellBool", f: li},
            5: {n: "BrtCellReal", f: qi},
            6: {n: "BrtCellSt", f: ui},
            7: {n: "BrtCellIsst", f: oi},
            8: {n: "BrtFmlaString", f: zi},
            9: {n: "BrtFmlaNum", f: yi},
            10: {n: "BrtFmlaBool", f: wi},
            11: {n: "BrtFmlaError", f: xi},
            16: {n: "BrtFRTArchID$", f: pj},
            19: {n: "BrtSSTItem", f: Oa},
            20: {n: "BrtPCDIMissing"},
            21: {n: "BrtPCDINumber"},
            22: {n: "BrtPCDIBoolean"},
            23: {n: "BrtPCDIError"},
            24: {n: "BrtPCDIString"},
            25: {n: "BrtPCDIDatetime"},
            26: {n: "BrtPCDIIndex"},
            27: {n: "BrtPCDIAMissing"},
            28: {n: "BrtPCDIANumber"},
            29: {n: "BrtPCDIABoolean"},
            30: {n: "BrtPCDIAError"},
            31: {n: "BrtPCDIAString"},
            32: {n: "BrtPCDIADatetime"},
            33: {n: "BrtPCRRecord"},
            34: {n: "BrtPCRRecordDt"},
            35: {n: "BrtFRTBegin"},
            36: {n: "BrtFRTEnd"},
            37: {n: "BrtACBegin"},
            38: {n: "BrtACEnd"},
            39: {n: "BrtName", f: qj},
            40: {n: "BrtIndexRowBlock"},
            42: {n: "BrtIndexBlock"},
            43: {n: "BrtFont", f: ef},
            44: {n: "BrtFmt", f: cf},
            45: {n: "BrtFill", f: Xo},
            46: {n: "BrtBorder", f: Yo},
            47: {n: "BrtXF", f: hf},
            48: {n: "BrtStyle"},
            49: {n: "BrtCellMeta"},
            50: {n: "BrtValueMeta"},
            51: {n: "BrtMdb"},
            52: {n: "BrtBeginFmd"},
            53: {n: "BrtEndFmd"},
            54: {n: "BrtBeginMdx"},
            55: {n: "BrtEndMdx"},
            56: {n: "BrtBeginMdxTuple"},
            57: {n: "BrtEndMdxTuple"},
            58: {n: "BrtMdxMbrIstr"},
            59: {n: "BrtStr"},
            60: {n: "BrtColInfo", f: Wd},
            62: {n: "BrtCellRString"},
            63: {n: "BrtCalcChainItem$", f: Pf},
            64: {n: "BrtDVal"},
            65: {n: "BrtSxvcellNum"},
            66: {n: "BrtSxvcellStr"},
            67: {n: "BrtSxvcellBool"},
            68: {n: "BrtSxvcellErr"},
            69: {n: "BrtSxvcellDate"},
            70: {n: "BrtSxvcellNil"},
            128: {n: "BrtFileVersion"},
            129: {n: "BrtBeginSheet"},
            130: {n: "BrtEndSheet"},
            131: {n: "BrtBeginBook", f: ha, p: 0},
            132: {n: "BrtEndBook"},
            133: {n: "BrtBeginWsViews"},
            134: {n: "BrtEndWsViews"},
            135: {n: "BrtBeginBookViews"},
            136: {n: "BrtEndBookViews"},
            137: {n: "BrtBeginWsView", f: Ii},
            138: {n: "BrtEndWsView"},
            139: {n: "BrtBeginCsViews"},
            140: {n: "BrtEndCsViews"},
            141: {n: "BrtBeginCsView"},
            142: {n: "BrtEndCsView"},
            143: {n: "BrtBeginBundleShs"},
            144: {n: "BrtEndBundleShs"},
            145: {n: "BrtBeginSheetData"},
            146: {n: "BrtEndSheetData"},
            147: {n: "BrtWsProp", f: hi},
            148: {n: "BrtWsDim", f: Yp, p: 16},
            151: {n: "BrtPane"},
            152: {n: "BrtSel"},
            153: {n: "BrtWbProp", f: nj},
            154: {n: "BrtWbFactoid"},
            155: {n: "BrtFileRecover"},
            156: {n: "BrtBundleSh", f: lj},
            157: {n: "BrtCalcProp"},
            158: {n: "BrtBookView"},
            159: {n: "BrtBeginSst", f: le},
            160: {n: "BrtEndSst"},
            161: {n: "BrtBeginAFilter", f: qn},
            162: {n: "BrtEndAFilter"},
            163: {n: "BrtBeginFilterColumn"},
            164: {n: "BrtEndFilterColumn"},
            165: {n: "BrtBeginFilters"},
            166: {n: "BrtEndFilters"},
            167: {n: "BrtFilter"},
            168: {n: "BrtColorFilter"},
            169: {n: "BrtIconFilter"},
            170: {n: "BrtTop10Filter"},
            171: {n: "BrtDynamicFilter"},
            172: {n: "BrtBeginCustomFilters"},
            173: {n: "BrtEndCustomFilters"},
            174: {n: "BrtCustomFilter"},
            175: {n: "BrtAFilterDateGroupItem"},
            176: {n: "BrtMergeCell", f: $p},
            177: {n: "BrtBeginMergeCells"},
            178: {n: "BrtEndMergeCells"},
            179: {n: "BrtBeginPivotCacheDef"},
            180: {n: "BrtEndPivotCacheDef"},
            181: {n: "BrtBeginPCDFields"},
            182: {n: "BrtEndPCDFields"},
            183: {n: "BrtBeginPCDField"},
            184: {n: "BrtEndPCDField"},
            185: {n: "BrtBeginPCDSource"},
            186: {n: "BrtEndPCDSource"},
            187: {n: "BrtBeginPCDSRange"},
            188: {n: "BrtEndPCDSRange"},
            189: {n: "BrtBeginPCDFAtbl"},
            190: {n: "BrtEndPCDFAtbl"},
            191: {n: "BrtBeginPCDIRun"},
            192: {n: "BrtEndPCDIRun"},
            193: {n: "BrtBeginPivotCacheRecords"},
            194: {n: "BrtEndPivotCacheRecords"},
            195: {n: "BrtBeginPCDHierarchies"},
            196: {n: "BrtEndPCDHierarchies"},
            197: {n: "BrtBeginPCDHierarchy"},
            198: {n: "BrtEndPCDHierarchy"},
            199: {n: "BrtBeginPCDHFieldsUsage"},
            200: {n: "BrtEndPCDHFieldsUsage"},
            201: {n: "BrtBeginExtConnection"},
            202: {n: "BrtEndExtConnection"},
            203: {n: "BrtBeginECDbProps"},
            204: {n: "BrtEndECDbProps"},
            205: {n: "BrtBeginECOlapProps"},
            206: {n: "BrtEndECOlapProps"},
            207: {n: "BrtBeginPCDSConsol"},
            208: {n: "BrtEndPCDSConsol"},
            209: {n: "BrtBeginPCDSCPages"},
            210: {n: "BrtEndPCDSCPages"},
            211: {n: "BrtBeginPCDSCPage"},
            212: {n: "BrtEndPCDSCPage"},
            213: {n: "BrtBeginPCDSCPItem"},
            214: {n: "BrtEndPCDSCPItem"},
            215: {n: "BrtBeginPCDSCSets"},
            216: {n: "BrtEndPCDSCSets"},
            217: {n: "BrtBeginPCDSCSet"},
            218: {n: "BrtEndPCDSCSet"},
            219: {n: "BrtBeginPCDFGroup"},
            220: {n: "BrtEndPCDFGroup"},
            221: {n: "BrtBeginPCDFGItems"},
            222: {n: "BrtEndPCDFGItems"},
            223: {n: "BrtBeginPCDFGRange"},
            224: {n: "BrtEndPCDFGRange"},
            225: {n: "BrtBeginPCDFGDiscrete"},
            226: {n: "BrtEndPCDFGDiscrete"},
            227: {n: "BrtBeginPCDSDTupleCache"},
            228: {n: "BrtEndPCDSDTupleCache"},
            229: {n: "BrtBeginPCDSDTCEntries"},
            230: {n: "BrtEndPCDSDTCEntries"},
            231: {n: "BrtBeginPCDSDTCEMembers"},
            232: {n: "BrtEndPCDSDTCEMembers"},
            233: {n: "BrtBeginPCDSDTCEMember"},
            234: {n: "BrtEndPCDSDTCEMember"},
            235: {n: "BrtBeginPCDSDTCQueries"},
            236: {n: "BrtEndPCDSDTCQueries"},
            237: {n: "BrtBeginPCDSDTCQuery"},
            238: {n: "BrtEndPCDSDTCQuery"},
            239: {n: "BrtBeginPCDSDTCSets"},
            240: {n: "BrtEndPCDSDTCSets"},
            241: {n: "BrtBeginPCDSDTCSet"},
            242: {n: "BrtEndPCDSDTCSet"},
            243: {n: "BrtBeginPCDCalcItems"},
            244: {n: "BrtEndPCDCalcItems"},
            245: {n: "BrtBeginPCDCalcItem"},
            246: {n: "BrtEndPCDCalcItem"},
            247: {n: "BrtBeginPRule"},
            248: {n: "BrtEndPRule"},
            249: {n: "BrtBeginPRFilters"},
            250: {n: "BrtEndPRFilters"},
            251: {n: "BrtBeginPRFilter"},
            252: {n: "BrtEndPRFilter"},
            253: {n: "BrtBeginPNames"},
            254: {n: "BrtEndPNames"},
            255: {n: "BrtBeginPName"},
            256: {n: "BrtEndPName"},
            257: {n: "BrtBeginPNPairs"},
            258: {n: "BrtEndPNPairs"},
            259: {n: "BrtBeginPNPair"},
            260: {n: "BrtEndPNPair"},
            261: {n: "BrtBeginECWebProps"},
            262: {n: "BrtEndECWebProps"},
            263: {n: "BrtBeginEcWpTables"},
            264: {n: "BrtEndECWPTables"},
            265: {n: "BrtBeginECParams"},
            266: {n: "BrtEndECParams"},
            267: {n: "BrtBeginECParam"},
            268: {n: "BrtEndECParam"},
            269: {n: "BrtBeginPCDKPIs"},
            270: {n: "BrtEndPCDKPIs"},
            271: {n: "BrtBeginPCDKPI"},
            272: {n: "BrtEndPCDKPI"},
            273: {n: "BrtBeginDims"},
            274: {n: "BrtEndDims"},
            275: {n: "BrtBeginDim"},
            276: {n: "BrtEndDim"},
            277: {n: "BrtIndexPartEnd"},
            278: {n: "BrtBeginStyleSheet"},
            279: {n: "BrtEndStyleSheet"},
            280: {n: "BrtBeginSXView"},
            281: {n: "BrtEndSXVI"},
            282: {n: "BrtBeginSXVI"},
            283: {n: "BrtBeginSXVIs"},
            284: {n: "BrtEndSXVIs"},
            285: {n: "BrtBeginSXVD"},
            286: {n: "BrtEndSXVD"},
            287: {n: "BrtBeginSXVDs"},
            288: {n: "BrtEndSXVDs"},
            289: {n: "BrtBeginSXPI"},
            290: {n: "BrtEndSXPI"},
            291: {n: "BrtBeginSXPIs"},
            292: {n: "BrtEndSXPIs"},
            293: {n: "BrtBeginSXDI"},
            294: {n: "BrtEndSXDI"},
            295: {n: "BrtBeginSXDIs"},
            296: {n: "BrtEndSXDIs"},
            297: {n: "BrtBeginSXLI"},
            298: {n: "BrtEndSXLI"},
            299: {n: "BrtBeginSXLIRws"},
            300: {n: "BrtEndSXLIRws"},
            301: {n: "BrtBeginSXLICols"},
            302: {n: "BrtEndSXLICols"},
            303: {n: "BrtBeginSXFormat"},
            304: {n: "BrtEndSXFormat"},
            305: {n: "BrtBeginSXFormats"},
            306: {n: "BrtEndSxFormats"},
            307: {n: "BrtBeginSxSelect"},
            308: {n: "BrtEndSxSelect"},
            309: {n: "BrtBeginISXVDRws"},
            310: {n: "BrtEndISXVDRws"},
            311: {n: "BrtBeginISXVDCols"},
            312: {n: "BrtEndISXVDCols"},
            313: {n: "BrtEndSXLocation"},
            314: {n: "BrtBeginSXLocation"},
            315: {n: "BrtEndSXView"},
            316: {n: "BrtBeginSXTHs"},
            317: {n: "BrtEndSXTHs"},
            318: {n: "BrtBeginSXTH"},
            319: {n: "BrtEndSXTH"},
            320: {n: "BrtBeginISXTHRws"},
            321: {n: "BrtEndISXTHRws"},
            322: {n: "BrtBeginISXTHCols"},
            323: {n: "BrtEndISXTHCols"},
            324: {n: "BrtBeginSXTDMPS"},
            325: {n: "BrtEndSXTDMPs"},
            326: {n: "BrtBeginSXTDMP"},
            327: {n: "BrtEndSXTDMP"},
            328: {n: "BrtBeginSXTHItems"},
            329: {n: "BrtEndSXTHItems"},
            330: {n: "BrtBeginSXTHItem"},
            331: {n: "BrtEndSXTHItem"},
            332: {n: "BrtBeginMetadata"},
            333: {n: "BrtEndMetadata"},
            334: {n: "BrtBeginEsmdtinfo"},
            335: {n: "BrtMdtinfo"},
            336: {n: "BrtEndEsmdtinfo"},
            337: {n: "BrtBeginEsmdb"},
            338: {n: "BrtEndEsmdb"},
            339: {n: "BrtBeginEsfmd"},
            340: {n: "BrtEndEsfmd"},
            341: {n: "BrtBeginSingleCells"},
            342: {n: "BrtEndSingleCells"},
            343: {n: "BrtBeginList"},
            344: {n: "BrtEndList"},
            345: {n: "BrtBeginListCols"},
            346: {n: "BrtEndListCols"},
            347: {n: "BrtBeginListCol"},
            348: {n: "BrtEndListCol"},
            349: {n: "BrtBeginListXmlCPr"},
            350: {n: "BrtEndListXmlCPr"},
            351: {n: "BrtListCCFmla"},
            352: {n: "BrtListTrFmla"},
            353: {n: "BrtBeginExternals"},
            354: {n: "BrtEndExternals"},
            355: {n: "BrtSupBookSrc", f: on},
            357: {n: "BrtSupSelf"},
            358: {n: "BrtSupSame"},
            359: {n: "BrtSupTabs"},
            360: {n: "BrtBeginSupBook"},
            361: {n: "BrtPlaceholderName"},
            362: {n: "BrtExternSheet", f: Ad},
            363: {n: "BrtExternTableStart"},
            364: {n: "BrtExternTableEnd"},
            366: {n: "BrtExternRowHdr"},
            367: {n: "BrtExternCellBlank"},
            368: {n: "BrtExternCellReal"},
            369: {n: "BrtExternCellBool"},
            370: {n: "BrtExternCellError"},
            371: {n: "BrtExternCellString"},
            372: {n: "BrtBeginEsmdx"},
            373: {n: "BrtEndEsmdx"},
            374: {n: "BrtBeginMdxSet"},
            375: {n: "BrtEndMdxSet"},
            376: {n: "BrtBeginMdxMbrProp"},
            377: {n: "BrtEndMdxMbrProp"},
            378: {n: "BrtBeginMdxKPI"},
            379: {n: "BrtEndMdxKPI"},
            380: {n: "BrtBeginEsstr"},
            381: {n: "BrtEndEsstr"},
            382: {n: "BrtBeginPRFItem"},
            383: {n: "BrtEndPRFItem"},
            384: {n: "BrtBeginPivotCacheIDs"},
            385: {n: "BrtEndPivotCacheIDs"},
            386: {n: "BrtBeginPivotCacheID"},
            387: {n: "BrtEndPivotCacheID"},
            388: {n: "BrtBeginISXVIs"},
            389: {n: "BrtEndISXVIs"},
            390: {n: "BrtBeginColInfos"},
            391: {n: "BrtEndColInfos"},
            392: {n: "BrtBeginRwBrk"},
            393: {n: "BrtEndRwBrk"},
            394: {n: "BrtBeginColBrk"},
            395: {n: "BrtEndColBrk"},
            396: {n: "BrtBrk"},
            397: {n: "BrtUserBookView"},
            398: {n: "BrtInfo"},
            399: {n: "BrtCUsr"},
            400: {n: "BrtUsr"},
            401: {n: "BrtBeginUsers"},
            403: {n: "BrtEOF"},
            404: {n: "BrtUCR"},
            405: {n: "BrtRRInsDel"},
            406: {n: "BrtRREndInsDel"},
            407: {n: "BrtRRMove"},
            408: {n: "BrtRREndMove"},
            409: {n: "BrtRRChgCell"},
            410: {n: "BrtRREndChgCell"},
            411: {n: "BrtRRHeader"},
            412: {n: "BrtRRUserView"},
            413: {n: "BrtRRRenSheet"},
            414: {n: "BrtRRInsertSh"},
            415: {n: "BrtRRDefName"},
            416: {n: "BrtRRNote"},
            417: {n: "BrtRRConflict"},
            418: {n: "BrtRRTQSIF"},
            419: {n: "BrtRRFormat"},
            420: {n: "BrtRREndFormat"},
            421: {n: "BrtRRAutoFmt"},
            422: {n: "BrtBeginUserShViews"},
            423: {n: "BrtBeginUserShView"},
            424: {n: "BrtEndUserShView"},
            425: {n: "BrtEndUserShViews"},
            426: {n: "BrtArrFmla", f: Di},
            427: {n: "BrtShrFmla", f: Ei},
            428: {n: "BrtTable"},
            429: {n: "BrtBeginExtConnections"},
            430: {n: "BrtEndExtConnections"},
            431: {n: "BrtBeginPCDCalcMems"},
            432: {n: "BrtEndPCDCalcMems"},
            433: {n: "BrtBeginPCDCalcMem"},
            434: {n: "BrtEndPCDCalcMem"},
            435: {n: "BrtBeginPCDHGLevels"},
            436: {n: "BrtEndPCDHGLevels"},
            437: {n: "BrtBeginPCDHGLevel"},
            438: {n: "BrtEndPCDHGLevel"},
            439: {n: "BrtBeginPCDHGLGroups"},
            440: {n: "BrtEndPCDHGLGroups"},
            441: {n: "BrtBeginPCDHGLGroup"},
            442: {n: "BrtEndPCDHGLGroup"},
            443: {n: "BrtBeginPCDHGLGMembers"},
            444: {n: "BrtEndPCDHGLGMembers"},
            445: {n: "BrtBeginPCDHGLGMember"},
            446: {n: "BrtEndPCDHGLGMember"},
            447: {n: "BrtBeginQSI"},
            448: {n: "BrtEndQSI"},
            449: {n: "BrtBeginQSIR"},
            450: {n: "BrtEndQSIR"},
            451: {n: "BrtBeginDeletedNames"},
            452: {n: "BrtEndDeletedNames"},
            453: {n: "BrtBeginDeletedName"},
            454: {n: "BrtEndDeletedName"},
            455: {n: "BrtBeginQSIFs"},
            456: {n: "BrtEndQSIFs"},
            457: {n: "BrtBeginQSIF"},
            458: {n: "BrtEndQSIF"},
            459: {n: "BrtBeginAutoSortScope"},
            460: {n: "BrtEndAutoSortScope"},
            461: {n: "BrtBeginConditionalFormatting"},
            462: {n: "BrtEndConditionalFormatting"},
            463: {n: "BrtBeginCFRule"},
            464: {n: "BrtEndCFRule"},
            465: {n: "BrtBeginIconSet"},
            466: {n: "BrtEndIconSet"},
            467: {n: "BrtBeginDatabar"},
            468: {n: "BrtEndDatabar"},
            469: {n: "BrtBeginColorScale"},
            470: {n: "BrtEndColorScale"},
            471: {n: "BrtCFVO"},
            472: {n: "BrtExternValueMeta"},
            473: {n: "BrtBeginColorPalette"},
            474: {n: "BrtEndColorPalette"},
            475: {n: "BrtIndexedColor"},
            476: {n: "BrtMargins", f: Gi},
            477: {n: "BrtPrintOptions"},
            478: {n: "BrtPageSetup"},
            479: {n: "BrtBeginHeaderFooter"},
            480: {n: "BrtEndHeaderFooter"},
            481: {n: "BrtBeginSXCrtFormat"},
            482: {n: "BrtEndSXCrtFormat"},
            483: {n: "BrtBeginSXCrtFormats"},
            484: {n: "BrtEndSXCrtFormats"},
            485: {n: "BrtWsFmtInfo", f: gi},
            486: {n: "BrtBeginMgs"},
            487: {n: "BrtEndMGs"},
            488: {n: "BrtBeginMGMaps"},
            489: {n: "BrtEndMGMaps"},
            490: {n: "BrtBeginMG"},
            491: {n: "BrtEndMG"},
            492: {n: "BrtBeginMap"},
            493: {n: "BrtEndMap"},
            494: {n: "BrtHLink", f: Bi},
            495: {n: "BrtBeginDCon"},
            496: {n: "BrtEndDCon"},
            497: {n: "BrtBeginDRefs"},
            498: {n: "BrtEndDRefs"},
            499: {n: "BrtDRef"},
            500: {n: "BrtBeginScenMan"},
            501: {n: "BrtEndScenMan"},
            502: {n: "BrtBeginSct"},
            503: {n: "BrtEndSct"},
            504: {n: "BrtSlc"},
            505: {n: "BrtBeginDXFs"},
            506: {n: "BrtEndDXFs"},
            507: {n: "BrtDXF"},
            508: {n: "BrtBeginTableStyles"},
            509: {n: "BrtEndTableStyles"},
            510: {n: "BrtBeginTableStyle"},
            511: {n: "BrtEndTableStyle"},
            512: {n: "BrtTableStyleElement"},
            513: {n: "BrtTableStyleClient"},
            514: {n: "BrtBeginVolDeps"},
            515: {n: "BrtEndVolDeps"},
            516: {n: "BrtBeginVolType"},
            517: {n: "BrtEndVolType"},
            518: {n: "BrtBeginVolMain"},
            519: {n: "BrtEndVolMain"},
            520: {n: "BrtBeginVolTopic"},
            521: {n: "BrtEndVolTopic"},
            522: {n: "BrtVolSubtopic"},
            523: {n: "BrtVolRef"},
            524: {n: "BrtVolNum"},
            525: {n: "BrtVolErr"},
            526: {n: "BrtVolStr"},
            527: {n: "BrtVolBool"},
            528: {n: "BrtBeginCalcChain$"},
            529: {n: "BrtEndCalcChain$"},
            530: {n: "BrtBeginSortState"},
            531: {n: "BrtEndSortState"},
            532: {n: "BrtBeginSortCond"},
            533: {n: "BrtEndSortCond"},
            534: {n: "BrtBookProtection"},
            535: {n: "BrtSheetProtection"},
            536: {n: "BrtRangeProtection"},
            537: {n: "BrtPhoneticInfo"},
            538: {n: "BrtBeginECTxtWiz"},
            539: {n: "BrtEndECTxtWiz"},
            540: {n: "BrtBeginECTWFldInfoLst"},
            541: {n: "BrtEndECTWFldInfoLst"},
            542: {n: "BrtBeginECTwFldInfo"},
            548: {n: "BrtFileSharing"},
            549: {n: "BrtOleSize"},
            550: {n: "BrtDrawing", f: on},
            551: {n: "BrtLegacyDrawing"},
            552: {n: "BrtLegacyDrawingHF"},
            553: {n: "BrtWebOpt"},
            554: {n: "BrtBeginWebPubItems"},
            555: {n: "BrtEndWebPubItems"},
            556: {n: "BrtBeginWebPubItem"},
            557: {n: "BrtEndWebPubItem"},
            558: {n: "BrtBeginSXCondFmt"},
            559: {n: "BrtEndSXCondFmt"},
            560: {n: "BrtBeginSXCondFmts"},
            561: {n: "BrtEndSXCondFmts"},
            562: {n: "BrtBkHim"},
            564: {n: "BrtColor"},
            565: {n: "BrtBeginIndexedColors"},
            566: {n: "BrtEndIndexedColors"},
            569: {n: "BrtBeginMRUColors"},
            570: {n: "BrtEndMRUColors"},
            572: {n: "BrtMRUColor"},
            573: {n: "BrtBeginDVals"},
            574: {n: "BrtEndDVals"},
            577: {n: "BrtSupNameStart"},
            578: {n: "BrtSupNameValueStart"},
            579: {n: "BrtSupNameValueEnd"},
            580: {n: "BrtSupNameNum"},
            581: {n: "BrtSupNameErr"},
            582: {n: "BrtSupNameSt"},
            583: {n: "BrtSupNameNil"},
            584: {n: "BrtSupNameBool"},
            585: {n: "BrtSupNameFmla"},
            586: {n: "BrtSupNameBits"},
            587: {n: "BrtSupNameEnd"},
            588: {n: "BrtEndSupBook"},
            589: {n: "BrtCellSmartTagProperty"},
            590: {n: "BrtBeginCellSmartTag"},
            591: {n: "BrtEndCellSmartTag"},
            592: {n: "BrtBeginCellSmartTags"},
            593: {n: "BrtEndCellSmartTags"},
            594: {n: "BrtBeginSmartTags"},
            595: {n: "BrtEndSmartTags"},
            596: {n: "BrtSmartTagType"},
            597: {n: "BrtBeginSmartTagTypes"},
            598: {n: "BrtEndSmartTagTypes"},
            599: {n: "BrtBeginSXFilters"},
            600: {n: "BrtEndSXFilters"},
            601: {n: "BrtBeginSXFILTER"},
            602: {n: "BrtEndSXFilter"},
            603: {n: "BrtBeginFills"},
            604: {n: "BrtEndFills"},
            605: {n: "BrtBeginCellWatches"},
            606: {n: "BrtEndCellWatches"},
            607: {n: "BrtCellWatch"},
            608: {n: "BrtBeginCRErrs"},
            609: {n: "BrtEndCRErrs"},
            610: {n: "BrtCrashRecErr"},
            611: {n: "BrtBeginFonts"},
            612: {n: "BrtEndFonts"},
            613: {n: "BrtBeginBorders"},
            614: {n: "BrtEndBorders"},
            615: {n: "BrtBeginFmts"},
            616: {n: "BrtEndFmts"},
            617: {n: "BrtBeginCellXFs"},
            618: {n: "BrtEndCellXFs"},
            619: {n: "BrtBeginStyles"},
            620: {n: "BrtEndStyles"},
            625: {n: "BrtBigName"},
            626: {n: "BrtBeginCellStyleXFs"},
            627: {n: "BrtEndCellStyleXFs"},
            628: {n: "BrtBeginComments"},
            629: {n: "BrtEndComments"},
            630: {n: "BrtBeginCommentAuthors"},
            631: {n: "BrtEndCommentAuthors"},
            632: {n: "BrtCommentAuthor", f: dp},
            633: {n: "BrtBeginCommentList"},
            634: {n: "BrtEndCommentList"},
            635: {n: "BrtBeginComment", f: Zf},
            636: {n: "BrtEndComment"},
            637: {n: "BrtCommentText", f: kn},
            638: {n: "BrtBeginOleObjects"},
            639: {n: "BrtOleObject"},
            640: {n: "BrtEndOleObjects"},
            641: {n: "BrtBeginSxrules"},
            642: {n: "BrtEndSxRules"},
            643: {n: "BrtBeginActiveXControls"},
            644: {n: "BrtActiveX"},
            645: {n: "BrtEndActiveXControls"},
            646: {n: "BrtBeginPCDSDTCEMembersSortBy"},
            648: {n: "BrtBeginCellIgnoreECs"},
            649: {n: "BrtCellIgnoreEC"},
            650: {n: "BrtEndCellIgnoreECs"},
            651: {n: "BrtCsProp", f: aj},
            652: {n: "BrtCsPageSetup"},
            653: {n: "BrtBeginUserCsViews"},
            654: {n: "BrtEndUserCsViews"},
            655: {n: "BrtBeginUserCsView"},
            656: {n: "BrtEndUserCsView"},
            657: {n: "BrtBeginPcdSFCIEntries"},
            658: {n: "BrtEndPCDSFCIEntries"},
            659: {n: "BrtPCDSFCIEntry"},
            660: {n: "BrtBeginListParts"},
            661: {n: "BrtListPart"},
            662: {n: "BrtEndListParts"},
            663: {n: "BrtSheetCalcProp"},
            664: {n: "BrtBeginFnGroup"},
            665: {n: "BrtFnGroup"},
            666: {n: "BrtEndFnGroup"},
            667: {n: "BrtSupAddin"},
            668: {n: "BrtSXTDMPOrder"},
            669: {n: "BrtCsProtection"},
            671: {n: "BrtBeginWsSortMap"},
            672: {n: "BrtEndWsSortMap"},
            673: {n: "BrtBeginRRSort"},
            674: {n: "BrtEndRRSort"},
            675: {n: "BrtRRSortItem"},
            676: {n: "BrtFileSharingIso"},
            677: {n: "BrtBookProtectionIso"},
            678: {n: "BrtSheetProtectionIso"},
            679: {n: "BrtCsProtectionIso"},
            680: {n: "BrtRangeProtectionIso"},
            1024: {n: "BrtRwDescent"},
            1025: {n: "BrtKnownFonts"},
            1026: {n: "BrtBeginSXTupleSet"},
            1027: {n: "BrtEndSXTupleSet"},
            1028: {n: "BrtBeginSXTupleSetHeader"},
            1029: {n: "BrtEndSXTupleSetHeader"},
            1030: {n: "BrtSXTupleSetHeaderItem"},
            1031: {n: "BrtBeginSXTupleSetData"},
            1032: {n: "BrtEndSXTupleSetData"},
            1033: {n: "BrtBeginSXTupleSetRow"},
            1034: {n: "BrtEndSXTupleSetRow"},
            1035: {n: "BrtSXTupleSetRowItem"},
            1036: {n: "BrtNameExt"},
            1037: {n: "BrtPCDH14"},
            1038: {n: "BrtBeginPCDCalcMem14"},
            1039: {n: "BrtEndPCDCalcMem14"},
            1040: {n: "BrtSXTH14"},
            1041: {n: "BrtBeginSparklineGroup"},
            1042: {n: "BrtEndSparklineGroup"},
            1043: {n: "BrtSparkline"},
            1044: {n: "BrtSXDI14"},
            1045: {n: "BrtWsFmtInfoEx14"},
            1046: {n: "BrtBeginConditionalFormatting14"},
            1047: {n: "BrtEndConditionalFormatting14"},
            1048: {n: "BrtBeginCFRule14"},
            1049: {n: "BrtEndCFRule14"},
            1050: {n: "BrtCFVO14"},
            1051: {n: "BrtBeginDatabar14"},
            1052: {n: "BrtBeginIconSet14"},
            1053: {n: "BrtDVal14"},
            1054: {n: "BrtBeginDVals14"},
            1055: {n: "BrtColor14"},
            1056: {n: "BrtBeginSparklines"},
            1057: {n: "BrtEndSparklines"},
            1058: {n: "BrtBeginSparklineGroups"},
            1059: {n: "BrtEndSparklineGroups"},
            1061: {n: "BrtSXVD14"},
            1062: {n: "BrtBeginSXView14"},
            1063: {n: "BrtEndSXView14"},
            1064: {n: "BrtBeginSXView16"},
            1065: {n: "BrtEndSXView16"},
            1066: {n: "BrtBeginPCD14"},
            1067: {n: "BrtEndPCD14"},
            1068: {n: "BrtBeginExtConn14"},
            1069: {n: "BrtEndExtConn14"},
            1070: {n: "BrtBeginSlicerCacheIDs"},
            1071: {n: "BrtEndSlicerCacheIDs"},
            1072: {n: "BrtBeginSlicerCacheID"},
            1073: {n: "BrtEndSlicerCacheID"},
            1075: {n: "BrtBeginSlicerCache"},
            1076: {n: "BrtEndSlicerCache"},
            1077: {n: "BrtBeginSlicerCacheDef"},
            1078: {n: "BrtEndSlicerCacheDef"},
            1079: {n: "BrtBeginSlicersEx"},
            1080: {n: "BrtEndSlicersEx"},
            1081: {n: "BrtBeginSlicerEx"},
            1082: {n: "BrtEndSlicerEx"},
            1083: {n: "BrtBeginSlicer"},
            1084: {n: "BrtEndSlicer"},
            1085: {n: "BrtSlicerCachePivotTables"},
            1086: {n: "BrtBeginSlicerCacheOlapImpl"},
            1087: {n: "BrtEndSlicerCacheOlapImpl"},
            1088: {n: "BrtBeginSlicerCacheLevelsData"},
            1089: {n: "BrtEndSlicerCacheLevelsData"},
            1090: {n: "BrtBeginSlicerCacheLevelData"},
            1091: {n: "BrtEndSlicerCacheLevelData"},
            1092: {n: "BrtBeginSlicerCacheSiRanges"},
            1093: {n: "BrtEndSlicerCacheSiRanges"},
            1094: {n: "BrtBeginSlicerCacheSiRange"},
            1095: {n: "BrtEndSlicerCacheSiRange"},
            1096: {n: "BrtSlicerCacheOlapItem"},
            1097: {n: "BrtBeginSlicerCacheSelections"},
            1098: {n: "BrtSlicerCacheSelection"},
            1099: {n: "BrtEndSlicerCacheSelections"},
            1100: {n: "BrtBeginSlicerCacheNative"},
            1101: {n: "BrtEndSlicerCacheNative"},
            1102: {n: "BrtSlicerCacheNativeItem"},
            1103: {n: "BrtRangeProtection14"},
            1104: {n: "BrtRangeProtectionIso14"},
            1105: {n: "BrtCellIgnoreEC14"},
            1111: {n: "BrtList14"},
            1112: {n: "BrtCFIcon"},
            1113: {n: "BrtBeginSlicerCachesPivotCacheIDs"},
            1114: {n: "BrtEndSlicerCachesPivotCacheIDs"},
            1115: {n: "BrtBeginSlicers"},
            1116: {n: "BrtEndSlicers"},
            1117: {n: "BrtWbProp14"},
            1118: {n: "BrtBeginSXEdit"},
            1119: {n: "BrtEndSXEdit"},
            1120: {n: "BrtBeginSXEdits"},
            1121: {n: "BrtEndSXEdits"},
            1122: {n: "BrtBeginSXChange"},
            1123: {n: "BrtEndSXChange"},
            1124: {n: "BrtBeginSXChanges"},
            1125: {n: "BrtEndSXChanges"},
            1126: {n: "BrtSXTupleItems"},
            1128: {n: "BrtBeginSlicerStyle"},
            1129: {n: "BrtEndSlicerStyle"},
            1130: {n: "BrtSlicerStyleElement"},
            1131: {n: "BrtBeginStyleSheetExt14"},
            1132: {n: "BrtEndStyleSheetExt14"},
            1133: {n: "BrtBeginSlicerCachesPivotCacheID"},
            1134: {n: "BrtEndSlicerCachesPivotCacheID"},
            1135: {n: "BrtBeginConditionalFormattings"},
            1136: {n: "BrtEndConditionalFormattings"},
            1137: {n: "BrtBeginPCDCalcMemExt"},
            1138: {n: "BrtEndPCDCalcMemExt"},
            1139: {n: "BrtBeginPCDCalcMemsExt"},
            1140: {n: "BrtEndPCDCalcMemsExt"},
            1141: {n: "BrtPCDField14"},
            1142: {n: "BrtBeginSlicerStyles"},
            1143: {n: "BrtEndSlicerStyles"},
            1144: {n: "BrtBeginSlicerStyleElements"},
            1145: {n: "BrtEndSlicerStyleElements"},
            1146: {n: "BrtCFRuleExt"},
            1147: {n: "BrtBeginSXCondFmt14"},
            1148: {n: "BrtEndSXCondFmt14"},
            1149: {n: "BrtBeginSXCondFmts14"},
            1150: {n: "BrtEndSXCondFmts14"},
            1152: {n: "BrtBeginSortCond14"},
            1153: {n: "BrtEndSortCond14"},
            1154: {n: "BrtEndDVals14"},
            1155: {n: "BrtEndIconSet14"},
            1156: {n: "BrtEndDatabar14"},
            1157: {n: "BrtBeginColorScale14"},
            1158: {n: "BrtEndColorScale14"},
            1159: {n: "BrtBeginSxrules14"},
            1160: {n: "BrtEndSxrules14"},
            1161: {n: "BrtBeginPRule14"},
            1162: {n: "BrtEndPRule14"},
            1163: {n: "BrtBeginPRFilters14"},
            1164: {n: "BrtEndPRFilters14"},
            1165: {n: "BrtBeginPRFilter14"},
            1166: {n: "BrtEndPRFilter14"},
            1167: {n: "BrtBeginPRFItem14"},
            1168: {n: "BrtEndPRFItem14"},
            1169: {n: "BrtBeginCellIgnoreECs14"},
            1170: {n: "BrtEndCellIgnoreECs14"},
            1171: {n: "BrtDxf14"},
            1172: {n: "BrtBeginDxF14s"},
            1173: {n: "BrtEndDxf14s"},
            1177: {n: "BrtFilter14"},
            1178: {n: "BrtBeginCustomFilters14"},
            1180: {n: "BrtCustomFilter14"},
            1181: {n: "BrtIconFilter14"},
            1182: {n: "BrtPivotCacheConnectionName"},
            2048: {n: "BrtBeginDecoupledPivotCacheIDs"},
            2049: {n: "BrtEndDecoupledPivotCacheIDs"},
            2050: {n: "BrtDecoupledPivotCacheID"},
            2051: {n: "BrtBeginPivotTableRefs"},
            2052: {n: "BrtEndPivotTableRefs"},
            2053: {n: "BrtPivotTableRef"},
            2054: {n: "BrtSlicerCacheBookPivotTables"},
            2055: {n: "BrtBeginSxvcells"},
            2056: {n: "BrtEndSxvcells"},
            2057: {n: "BrtBeginSxRow"},
            2058: {n: "BrtEndSxRow"},
            2060: {n: "BrtPcdCalcMem15"},
            2067: {n: "BrtQsi15"},
            2068: {n: "BrtBeginWebExtensions"},
            2069: {n: "BrtEndWebExtensions"},
            2070: {n: "BrtWebExtension"},
            2071: {n: "BrtAbsPath15"},
            2072: {n: "BrtBeginPivotTableUISettings"},
            2073: {n: "BrtEndPivotTableUISettings"},
            2075: {n: "BrtTableSlicerCacheIDs"},
            2076: {n: "BrtTableSlicerCacheID"},
            2077: {n: "BrtBeginTableSlicerCache"},
            2078: {n: "BrtEndTableSlicerCache"},
            2079: {n: "BrtSxFilter15"},
            2080: {n: "BrtBeginTimelineCachePivotCacheIDs"},
            2081: {n: "BrtEndTimelineCachePivotCacheIDs"},
            2082: {n: "BrtTimelineCachePivotCacheID"},
            2083: {n: "BrtBeginTimelineCacheIDs"},
            2084: {n: "BrtEndTimelineCacheIDs"},
            2085: {n: "BrtBeginTimelineCacheID"},
            2086: {n: "BrtEndTimelineCacheID"},
            2087: {n: "BrtBeginTimelinesEx"},
            2088: {n: "BrtEndTimelinesEx"},
            2089: {n: "BrtBeginTimelineEx"},
            2090: {n: "BrtEndTimelineEx"},
            2091: {n: "BrtWorkBookPr15"},
            2092: {n: "BrtPCDH15"},
            2093: {n: "BrtBeginTimelineStyle"},
            2094: {n: "BrtEndTimelineStyle"},
            2095: {n: "BrtTimelineStyleElement"},
            2096: {n: "BrtBeginTimelineStylesheetExt15"},
            2097: {n: "BrtEndTimelineStylesheetExt15"},
            2098: {n: "BrtBeginTimelineStyles"},
            2099: {n: "BrtEndTimelineStyles"},
            2100: {n: "BrtBeginTimelineStyleElements"},
            2101: {n: "BrtEndTimelineStyleElements"},
            2102: {n: "BrtDxf15"},
            2103: {n: "BrtBeginDxfs15"},
            2104: {n: "brtEndDxfs15"},
            2105: {n: "BrtSlicerCacheHideItemsWithNoData"},
            2106: {n: "BrtBeginItemUniqueNames"},
            2107: {n: "BrtEndItemUniqueNames"},
            2108: {n: "BrtItemUniqueName"},
            2109: {n: "BrtBeginExtConn15"},
            2110: {n: "BrtEndExtConn15"},
            2111: {n: "BrtBeginOledbPr15"},
            2112: {n: "BrtEndOledbPr15"},
            2113: {n: "BrtBeginDataFeedPr15"},
            2114: {n: "BrtEndDataFeedPr15"},
            2115: {n: "BrtTextPr15"},
            2116: {n: "BrtRangePr15"},
            2117: {n: "BrtDbCommand15"},
            2118: {n: "BrtBeginDbTables15"},
            2119: {n: "BrtEndDbTables15"},
            2120: {n: "BrtDbTable15"},
            2121: {n: "BrtBeginDataModel"},
            2122: {n: "BrtEndDataModel"},
            2123: {n: "BrtBeginModelTables"},
            2124: {n: "BrtEndModelTables"},
            2125: {n: "BrtModelTable"},
            2126: {n: "BrtBeginModelRelationships"},
            2127: {n: "BrtEndModelRelationships"},
            2128: {n: "BrtModelRelationship"},
            2129: {n: "BrtBeginECTxtWiz15"},
            2130: {n: "BrtEndECTxtWiz15"},
            2131: {n: "BrtBeginECTWFldInfoLst15"},
            2132: {n: "BrtEndECTWFldInfoLst15"},
            2133: {n: "BrtBeginECTWFldInfo15"},
            2134: {n: "BrtFieldListActiveItem"},
            2135: {n: "BrtPivotCacheIdVersion"},
            2136: {n: "BrtSXDI15"},
            2137: {n: "BrtBeginModelTimeGroupings"},
            2138: {n: "BrtEndModelTimeGroupings"},
            2139: {n: "BrtBeginModelTimeGrouping"},
            2140: {n: "BrtEndModelTimeGrouping"},
            2141: {n: "BrtModelTimeGroupingCalcCol"},
            3072: {n: "BrtUid"},
            3073: {n: "BrtRevisionPtr"},
            5095: {n: "BrtBeginCalcFeatures"},
            5096: {n: "BrtEndCalcFeatures"},
            5097: {n: "BrtCalcFeature"},
            65535: {n: ""}
        }, oq = s(nq, "n"), pq = {
            3: {n: "BIFF2NUM", f: ae},
            4: {n: "BIFF2STR", f: _d},
            6: {n: "Formula", f: Ch},
            9: {n: "BOF", f: Mc},
            10: {n: "EOF", f: $b},
            12: {n: "CalcCount", f: dc},
            13: {n: "CalcMode", f: dc},
            14: {n: "CalcPrecision", f: bc},
            15: {n: "CalcRefMode", f: bc},
            16: {n: "CalcDelta", f: Za},
            17: {n: "CalcIter", f: bc},
            18: {n: "Protect", f: bc},
            19: {n: "Password", f: dc},
            20: {n: "Header", f: lo},
            21: {n: "Footer", f: lo},
            23: {n: "ExternSheet", f: Ad},
            24: {n: "Lbl", f: zd},
            25: {n: "WinProtect", f: bc},
            26: {n: "VerticalPageBreaks"},
            27: {n: "HorizontalPageBreaks"},
            28: {n: "Note", f: Hd},
            29: {n: "Selection"},
            34: {n: "Date1904", f: bc},
            35: {n: "ExternName", f: yd},
            38: {n: "LeftMargin", f: Za},
            39: {n: "RightMargin", f: Za},
            40: {n: "TopMargin", f: Za},
            41: {n: "BottomMargin", f: Za},
            42: {n: "PrintRowCol", f: bc},
            43: {n: "PrintGrid", f: bc},
            47: {n: "FilePass", f: Ie},
            49: {n: "Font", f: cd},
            51: {n: "PrintSize", f: dc},
            60: {n: "Continue"},
            61: {n: "Window1", f: $c},
            64: {n: "Backup", f: bc},
            65: {n: "Pane"},
            66: {n: "CodePage", f: dc},
            77: {n: "Pls"},
            80: {n: "DCon"},
            81: {n: "DConRef"},
            82: {n: "DConName"},
            85: {n: "DefColWidth", f: dc},
            89: {n: "XCT"},
            90: {n: "CRN"},
            91: {n: "FileSharing"},
            92: {n: "WriteAccess", f: Pc},
            93: {n: "Obj", f: Kd},
            94: {n: "Uncalced"},
            95: {n: "CalcSaveRecalc", f: bc},
            96: {n: "Template"},
            97: {n: "Intl"},
            99: {n: "ObjProtect", f: bc},
            125: {n: "ColInfo", f: Wd},
            128: {n: "Guts", f: rd},
            129: {n: "WsBool", f: Rc},
            130: {n: "GridSet", f: dc},
            131: {n: "HCenter", f: bc},
            132: {n: "VCenter", f: bc},
            133: {n: "BoundSheet8", f: Sc},
            134: {n: "WriteProtect"},
            140: {n: "Country", f: Rd},
            141: {n: "HideObj", f: dc},
            144: {n: "Sort"},
            146: {n: "Palette", f: Ud},
            151: {n: "Sync"},
            152: {n: "LPr"},
            153: {n: "DxGCol"},
            154: {n: "FnGroupName"},
            155: {n: "FilterMode"},
            156: {n: "BuiltInFnGroupCount", f: dc},
            157: {n: "AutoFilterInfo"},
            158: {n: "AutoFilter"},
            160: {n: "Scl", f: po},
            161: {n: "Setup", f: Xd},
            174: {n: "ScenMan"},
            175: {n: "SCENARIO"},
            176: {n: "SxView"},
            177: {n: "Sxvd"},
            178: {n: "SXVI"},
            180: {n: "SxIvd"},
            181: {n: "SXLI"},
            182: {n: "SXPI"},
            184: {n: "DocRoute"},
            185: {n: "RecipName"},
            189: {n: "MulRk", f: md},
            190: {n: "MulBlank", f: nd},
            193: {n: "Mms", f: $b},
            197: {n: "SXDI"},
            198: {n: "SXDB"},
            199: {n: "SXFDB"},
            200: {n: "SXDBB"},
            201: {n: "SXNum"},
            202: {n: "SxBool", f: bc},
            203: {n: "SxErr"},
            204: {n: "SXInt"},
            205: {n: "SXString"},
            206: {n: "SXDtr"},
            207: {n: "SxNil"},
            208: {n: "SXTbl"},
            209: {n: "SXTBRGIITM"},
            210: {n: "SxTbpg"},
            211: {n: "ObProj"},
            213: {n: "SXStreamID"},
            215: {n: "DBCell"},
            216: {n: "SXRng"},
            217: {n: "SxIsxoper"},
            218: {n: "BookBool", f: dc},
            220: {n: "DbOrParamQry"},
            221: {n: "ScenarioProtect", f: bc},
            222: {n: "OleObjectSize"},
            224: {n: "XF", f: pd},
            225: {n: "InterfaceHdr", f: Oc},
            226: {n: "InterfaceEnd", f: $b},
            227: {n: "SXVS"},
            229: {n: "MergeCells", f: Id},
            233: {n: "BkHim"},
            235: {n: "MsoDrawingGroup"},
            236: {n: "MsoDrawing"},
            237: {n: "MsoDrawingSelection"},
            239: {n: "PhoneticInfo"},
            240: {n: "SxRule"},
            241: {n: "SXEx"},
            242: {n: "SxFilt"},
            244: {n: "SxDXF"},
            245: {n: "SxItm"},
            246: {n: "SxName"},
            247: {n: "SxSelect"},
            248: {n: "SXPair"},
            249: {n: "SxFmla"},
            251: {n: "SxFormat"},
            252: {n: "SST", f: Uc},
            253: {n: "LabelSst", f: ed},
            255: {n: "ExtSST", f: Vc},
            256: {n: "SXVDEx"},
            259: {n: "SXFormula"},
            290: {n: "SXDBEx"},
            311: {n: "RRDInsDel"},
            312: {n: "RRDHead"},
            315: {n: "RRDChgCell"},
            317: {n: "RRTabId", f: fc},
            318: {n: "RRDRenSheet"},
            319: {n: "RRSort"},
            320: {n: "RRDMove"},
            330: {n: "RRFormat"},
            331: {n: "RRAutoFmt"},
            333: {n: "RRInsertSh"},
            334: {n: "RRDMoveBegin"},
            335: {n: "RRDMoveEnd"},
            336: {n: "RRDInsDelBegin"},
            337: {n: "RRDInsDelEnd"},
            338: {n: "RRDConflict"},
            339: {n: "RRDDefName"},
            340: {n: "RRDRstEtxp"},
            351: {n: "LRng"},
            352: {n: "UsesELFs", f: bc},
            353: {n: "DSF", f: $b},
            401: {n: "CUsr"},
            402: {n: "CbUsr"},
            403: {n: "UsrInfo"},
            404: {n: "UsrExcl"},
            405: {n: "FileLock"},
            406: {n: "RRDInfo"},
            407: {n: "BCUsrs"},
            408: {n: "UsrChk"},
            425: {n: "UserBView"},
            426: {n: "UserSViewBegin"},
            427: {n: "UserSViewEnd"},
            428: {n: "RRDUserView"},
            429: {n: "Qsi"},
            430: {n: "SupBook", f: xd},
            431: {n: "Prot4Rev", f: bc},
            432: {n: "CondFmt"},
            433: {n: "CF"},
            434: {n: "DVal"},
            437: {n: "DConBin"},
            438: {n: "TxO", f: Md},
            439: {n: "RefreshAll", f: bc},
            440: {n: "HLink", f: Nd},
            441: {n: "Lel"},
            442: {n: "CodeName", f: lc},
            443: {n: "SXFDBType"},
            444: {n: "Prot4RevPass", f: dc},
            445: {n: "ObNoMacros"},
            446: {n: "Dv"},
            448: {n: "Excel9File", f: $b},
            449: {n: "RecalcId", f: Yc, r: 2},
            450: {n: "EntExU2", f: $b},
            512: {n: "Dimensions", f: jd},
            513: {n: "Blank", f: oo},
            515: {n: "Number", f: vd},
            516: {n: "Label", f: fd},
            517: {n: "BoolErr", f: td},
            518: {n: "Formula", f: Ch},
            519: {n: "String", f: qo},
            520: {n: "Row", f: Wc},
            523: {n: "Index"},
            545: {n: "Array", f: Ed},
            549: {n: "DefaultRowHeight", f: Zc},
            566: {n: "Table"},
            574: {n: "Window2", f: ad},
            638: {n: "RK", f: ld},
            659: {n: "Style"},
            1030: {n: "Formula", f: Ch},
            1048: {n: "BigName"},
            1054: {n: "Format", f: hd},
            1084: {n: "ContinueBigName"},
            1212: {n: "ShrFmla", f: Dd},
            2048: {n: "HLinkTooltip", f: Pd},
            2049: {n: "WebPub"},
            2050: {n: "QsiSXTag"},
            2051: {n: "DBQueryExt"},
            2052: {n: "ExtString"},
            2053: {n: "TxtQry"},
            2054: {n: "Qsir"},
            2055: {n: "Qsif"},
            2056: {n: "RRDTQSIF"},
            2057: {n: "BOF", f: Mc},
            2058: {n: "OleDbConn"},
            2059: {n: "WOpt"},
            2060: {n: "SXViewEx"},
            2061: {n: "SXTH"},
            2062: {n: "SXPIEx"},
            2063: {n: "SXVDTEx"},
            2064: {n: "SXViewEx9"},
            2066: {n: "ContinueFrt"},
            2067: {n: "RealTimeData"},
            2128: {n: "ChartFrtInfo"},
            2129: {n: "FrtWrapper"},
            2130: {n: "StartBlock"},
            2131: {n: "EndBlock"},
            2132: {n: "StartObject"},
            2133: {n: "EndObject"},
            2134: {n: "CatLab"},
            2135: {n: "YMult"},
            2136: {n: "SXViewLink"},
            2137: {n: "PivotChartBits"},
            2138: {n: "FrtFontList"},
            2146: {n: "SheetExt"},
            2147: {n: "BookExt", r: 12},
            2148: {n: "SXAddl"},
            2149: {n: "CrErr"},
            2150: {n: "HFPicture"},
            2151: {n: "FeatHdr", f: $b},
            2152: {n: "Feat"},
            2154: {n: "DataLabExt"},
            2155: {n: "DataLabExtContents"},
            2156: {n: "CellWatch"},
            2161: {n: "FeatHdr11"},
            2162: {n: "Feature11"},
            2164: {n: "DropDownObjIds"},
            2165: {n: "ContinueFrt11"},
            2166: {n: "DConn"},
            2167: {n: "List12"},
            2168: {n: "Feature12"},
            2169: {n: "CondFmt12"},
            2170: {n: "CF12"},
            2171: {n: "CFEx"},
            2172: {n: "XFCRC", f: Vd, r: 12},
            2173: {n: "XFExt", f: Mf, r: 12},
            2174: {n: "AutoFilter12"},
            2175: {n: "ContinueFrt12"},
            2180: {n: "MDTInfo"},
            2181: {n: "MDXStr"},
            2182: {n: "MDXTuple"},
            2183: {n: "MDXSet"},
            2184: {n: "MDXProp"},
            2185: {n: "MDXKPI"},
            2186: {n: "MDB"},
            2187: {n: "PLV"},
            2188: {n: "Compat12", f: bc, r: 12},
            2189: {n: "DXF"},
            2190: {n: "TableStyles", r: 12},
            2191: {n: "TableStyle"},
            2192: {n: "TableStyleElement"},
            2194: {n: "StyleExt"},
            2195: {n: "NamePublish"},
            2196: {n: "NameCmt", f: Cd, r: 12},
            2197: {n: "SortData"},
            2198: {n: "Theme", f: Gf, r: 12},
            2199: {n: "GUIDTypeLib"},
            2200: {n: "FnGrp12"},
            2201: {n: "NameFnGrp12"},
            2202: {n: "MTRSettings", f: Fd, r: 12},
            2203: {n: "CompressPictures", f: $b},
            2204: {n: "HeaderFooter"},
            2205: {n: "CrtLayout12"},
            2206: {n: "CrtMlFrt"},
            2207: {n: "CrtMlFrtContinue"},
            2211: {n: "ForceFullCalculation", f: Xc},
            2212: {n: "ShapePropsStream"},
            2213: {n: "TextPropsStream"},
            2214: {n: "RichTextStream"},
            2215: {n: "CrtLayout12A"},
            4097: {n: "Units"},
            4098: {n: "Chart"},
            4099: {n: "Series"},
            4102: {n: "DataFormat"},
            4103: {n: "LineFormat"},
            4105: {n: "MarkerFormat"},
            4106: {n: "AreaFormat"},
            4107: {n: "PieFormat"},
            4108: {n: "AttachedLabel"},
            4109: {n: "SeriesText"},
            4116: {n: "ChartFormat"},
            4117: {n: "Legend"},
            4118: {n: "SeriesList"},
            4119: {n: "Bar"},
            4120: {n: "Line"},
            4121: {n: "Pie"},
            4122: {n: "Area"},
            4123: {n: "Scatter"},
            4124: {n: "CrtLine"},
            4125: {n: "Axis"},
            4126: {n: "Tick"},
            4127: {n: "ValueRange"},
            4128: {n: "CatSerRange"},
            4129: {n: "AxisLine"},
            4130: {n: "CrtLink"},
            4132: {n: "DefaultText"},
            4133: {n: "Text"},
            4134: {n: "FontX", f: dc},
            4135: {n: "ObjectLink"},
            4146: {n: "Frame"},
            4147: {n: "Begin"},
            4148: {n: "End"},
            4149: {n: "PlotArea"},
            4154: {n: "Chart3d"},
            4156: {n: "PicF"},
            4157: {n: "DropBar"},
            4158: {n: "Radar"},
            4159: {n: "Surf"},
            4160: {n: "RadarArea"},
            4161: {n: "AxisParent"},
            4163: {n: "LegendException"},
            4164: {n: "ShtProps", f: Yd},
            4165: {n: "SerToCrt"},
            4166: {n: "AxesUsed"},
            4168: {n: "SBaseRef"},
            4170: {n: "SerParent"},
            4171: {n: "SerAuxTrend"},
            4174: {n: "IFmtRecord"},
            4175: {n: "Pos"},
            4176: {n: "AlRuns"},
            4177: {n: "BRAI"},
            4187: {n: "SerAuxErrBar"},
            4188: {n: "ClrtClient", f: Td},
            4189: {n: "SerFmt"},
            4191: {n: "Chart3DBarShape"},
            4192: {n: "Fbi"},
            4193: {n: "BopPop"},
            4194: {n: "AxcExt"},
            4195: {n: "Dat"},
            4196: {n: "PlotGrowth"},
            4197: {n: "SIIndex"},
            4198: {n: "GelFrame"},
            4199: {n: "BopPopCustom"},
            4200: {n: "Fbi2"},
            0: {n: "Dimensions", f: jd},
            2: {n: "BIFF2INT", f: ce},
            5: {n: "BoolErr", f: td},
            7: {n: "String", f: ee},
            8: {n: "BIFF2ROW"},
            11: {n: "Index"},
            22: {n: "ExternCount", f: dc},
            30: {n: "BIFF2FORMAT", f: ko},
            31: {n: "BIFF2FMTCNT"},
            32: {n: "BIFF2COLINFO"},
            33: {n: "Array", f: Ed},
            37: {n: "DefaultRowHeight", f: Zc},
            50: {n: "BIFF2FONTXTRA", f: fe},
            52: {n: "DDEObjName"},
            62: {n: "BIFF2WINDOW2"},
            67: {n: "BIFF2XF"},
            69: {n: "BIFF2FONTCLR"},
            86: {n: "BIFF4FMTCNT"},
            126: {n: "RK"},
            127: {n: "ImData", f: $d},
            135: {n: "Addin"},
            136: {n: "Edg"},
            137: {n: "Pub"},
            145: {n: "Sub"},
            148: {n: "LHRecord"},
            149: {n: "LHNGraph"},
            150: {n: "Sound"},
            169: {n: "CoordList"},
            171: {n: "GCW"},
            188: {n: "ShrFmla"},
            191: {n: "ToolbarHdr"},
            192: {n: "ToolbarEnd"},
            194: {n: "AddMenu"},
            195: {n: "DelMenu"},
            214: {n: "RString", f: ge},
            223: {n: "UDDesc"},
            234: {n: "TabIdConf"},
            354: {n: "XL5Modify"},
            421: {n: "FileSharing2"},
            521: {n: "BOF", f: Mc},
            536: {n: "Lbl", f: zd},
            547: {n: "ExternName", f: yd},
            561: {n: "Font"},
            579: {n: "BIFF3XF"},
            1033: {n: "BOF", f: Mc},
            1091: {n: "BIFF4XF"},
            2157: {n: "FeatInfo"},
            2163: {n: "FeatInfo11"},
            2177: {n: "SXAddl12"},
            2240: {n: "AutoWebPub"},
            2241: {n: "ListObj"},
            2242: {n: "ListField"},
            2243: {n: "ListDV"},
            2244: {n: "ListCondFmt"},
            2245: {n: "ListCF"},
            2246: {n: "FMQry"},
            2247: {n: "FMSQry"},
            2248: {n: "PLV"},
            2249: {n: "LnExt"},
            2250: {n: "MkrExt"},
            2251: {n: "CrtCoopt"},
            2262: {n: "FRTArchId$", r: 12},
            29282: {}
        }, qq = s(pq, "n"), rq = function () {
            function a(a, b) {
                var c = b || {};
                null != Jl && null == c.dense && (c.dense = Jl);
                var d = c.dense ? [] : {}, e = a.match(/<table/i);
                if (!e) throw new Error("Invalid HTML: could not find <table>");
                var f = a.match(/<\/table/i), g = e.index, h = f && f.index || a.length,
                    i = F(a.slice(g, h), /(:?<tr[^>]*>)/i, "<tr>"), j = -1, k = 0, l = 0, m = 0,
                    n = {s: {r: 1e7, c: 1e7}, e: {r: 0, c: 0}}, o = [];
                for (g = 0; g < i.length; ++g) {
                    var p = i[g].trim(), q = p.slice(0, 3).toLowerCase();
                    if ("<tr" != q) {
                        if ("<td" == q || "<th" == q) {
                            var r = p.split(/<\/t[dh]>/i);
                            for (h = 0; h < r.length; ++h) {
                                var s = r[h].trim();
                                if (s.match(/<t[dh]/i)) {
                                    for (var t = s, u = 0; "<" == t.charAt(0) && (u = t.indexOf(">")) > -1;) t = t.slice(u + 1);
                                    var v = P(s.slice(0, s.indexOf(">")));
                                    m = v.colspan ? +v.colspan : 1, ((l = +v.rowspan) > 1 || m > 1) && o.push({
                                        s: {
                                            r: j,
                                            c: k
                                        }, e: {r: j + (l || 1) - 1, c: k + m - 1}
                                    });
                                    var x = v.t || "";
                                    if (t.length) {
                                        if (t = zm(t), n.s.r > j && (n.s.r = j), n.e.r < j && (n.e.r = j), n.s.c > k && (n.s.c = k), n.e.c < k && (n.e.c = k), t.length) {
                                            var y = {t: "s", v: t};
                                            c.raw || !t.trim().length || "s" == x || ("TRUE" === t ? y = {
                                                t: "b",
                                                v: !0
                                            } : "FALSE" === t ? y = {
                                                t: "b",
                                                v: !1
                                            } : isNaN(D(t)) ? isNaN(E(t).getDate()) || (y = {
                                                t: "d",
                                                v: z(t)
                                            }, c.cellDates || (y = {
                                                t: "n",
                                                v: w(y.v)
                                            }), y.z = c.dateNF || Tl._table[14]) : y = {
                                                t: "n",
                                                v: D(t)
                                            }), c.dense ? (d[j] || (d[j] = []), d[j][k] = y) : d[Aa({
                                                r: j,
                                                c: k
                                            })] = y, k += m
                                        }
                                    } else k += m
                                }
                            }
                        }
                    } else {
                        if (++j, c.sheetRows && c.sheetRows <= j) {
                            --j;
                            break
                        }
                        k = 0
                    }
                }
                return d["!ref"] = Ca(n), d
            }

            function b(b, c) {
                return Ga(a(b, c), c)
            }

            function c(a, b, c, d) {
                for (var e = a["!merges"] || [], f = [], g = b.s.c; g <= b.e.c; ++g) {
                    for (var h = 0, i = 0, j = 0; j < e.length; ++j) if (!(e[j].s.r > c || e[j].s.c > g || e[j].e.r < c || e[j].e.c < g)) {
                        if (e[j].s.r < c || e[j].s.c < g) {
                            h = -1;
                            break
                        }
                        h = e[j].e.r - e[j].s.r + 1, i = e[j].e.c - e[j].s.c + 1;
                        break
                    }
                    if (!(h < 0)) {
                        var k = Aa({r: c, c: g}), l = d.dense ? (a[c] || [])[g] : a[k], m = {};
                        h > 1 && (m.rowspan = h), i > 1 && (m.colspan = i);
                        var n = l && null != l.v && (l.h || T(l.w || (Fa(l), l.w) || "")) || "";
                        m.t = l && l.t || "z", d.editable && (n = '<span contenteditable="true">' + n + "</span>"), m.id = "sjs-" + k, f.push(Z("td", n, m))
                    }
                }
                return "<tr>" + f.join("") + "</tr>"
            }

            function d(a, b, c) {
                return [].join("") + "<table" + (c && c.id ? ' id="' + c.id + '"' : "") + ">"
            }

            function e(a, b) {
                var e = b || {}, h = null != e.header ? e.header : f, i = null != e.footer ? e.footer : g, j = [h],
                    k = Ba(a["!ref"]);
                e.dense = Array.isArray(a), j.push(d(a, k, e));
                for (var l = k.s.r; l <= k.e.r; ++l) j.push(c(a, k, l, e));
                return j.push("</table>" + i), j.join("")
            }

            var f = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>',
                g = "</body></html>";
            return {to_workbook: b, to_sheet: a, _row: c, BEGIN: f, END: g, _preamble: d, from_sheet: e}
        }(), sq = function () {
            var a = function (a) {
                var b = a.replace(/[\t\r\n]/g, " ").trim().replace(/ +/g, " ").replace(/<text:s\/>/g, " ").replace(/<text:s text:c="(\d+)"\/>/g, function (a, b) {
                    return Array(parseInt(b, 10) + 1).join(" ")
                }).replace(/<text:tab[^>]*\/>/g, "\t").replace(/<text:line-break\/>/g, "\n");
                return [nm(b.replace(/<[^>]*>/g, ""))]
            }, b = {
                day: ["d", "dd"],
                month: ["m", "mm"],
                year: ["y", "yy"],
                hours: ["h", "hh"],
                minutes: ["m", "mm"],
                seconds: ["s", "ss"],
                "am-pm": ["A/P", "AM/PM"],
                "day-of-week": ["ddd", "dddd"],
                era: ["e", "ee"],
                quarter: ["\\Qm", 'm\\"th quarter"']
            };
            return function (c, d) {
                var e = d || {};
                null != Jl && null == e.dense && (e.dense = Jl);
                var f, g, h, i, j, k, l, m = Vj(c), n = [], o = {name: ""}, p = "", q = 0, r = {}, s = [],
                    t = e.dense ? [] : {}, u = {value: ""}, v = "", x = 0, A = [], C = -1, D = -1,
                    E = {s: {r: 1e6, c: 1e7}, e: {r: 0, c: 0}}, F = 0, G = {}, H = [], I = {}, J = 0, K = 0, L = [], M = 1,
                    N = 1, O = [], Q = {Names: []}, R = {}, S = ["", ""], T = [], U = {}, W = "", X = 0, Y = !1, Z = !1,
                    $ = 0;
                for (lq.lastIndex = 0, m = m.replace(/<!--([\s\S]*?)-->/gm, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, ""); j = lq.exec(m);) switch (j[3] = j[3].replace(/_.*$/, "")) {
                    case"table":
                    case"工作表":
                        "/" === j[1] ? (E.e.c >= E.s.c && E.e.r >= E.s.r && (t["!ref"] = Ca(E)), e.sheetRows > 0 && e.sheetRows <= E.e.r && (t["!fullref"] = t["!ref"], E.e.r = e.sheetRows - 1, t["!ref"] = Ca(E)), H.length && (t["!merges"] = H), L.length && (t["!rows"] = L), h.name = h["名称"] || h.name, "undefined" != typeof JSON && JSON.stringify(h), s.push(h.name), r[h.name] = t, Z = !1) : "/" !== j[0].charAt(j[0].length - 2) && (h = P(j[0], !1), C = D = -1, E.s.r = E.s.c = 1e7, E.e.r = E.e.c = 0, t = e.dense ? [] : {}, H = [], L = [], Z = !0);
                        break;
                    case"table-row-group":
                        "/" === j[1] ? --F : ++F;
                        break;
                    case"table-row":
                    case"行":
                        if ("/" === j[1]) {
                            C += M, M = 1;
                            break
                        }
                        if (i = P(j[0], !1), i["行号"] ? C = i["行号"] - 1 : -1 == C && (C = 0), (M = +i["number-rows-repeated"] || 1) < 10) for ($ = 0; $ < M; ++$) F > 0 && (L[C + $] = {level: F});
                        D = -1;
                        break;
                    case"covered-table-cell":
                        "/" !== j[1] && ++D, e.sheetStubs && (e.dense ? (t[C] || (t[C] = []), t[C][D] = {t: "z"}) : t[Aa({
                            r: C,
                            c: D
                        })] = {t: "z"}), v = "", A = [];
                        break;
                    case"table-cell":
                    case"数据":
                        if ("/" === j[0].charAt(j[0].length - 2)) ++D, u = P(j[0], !1), N = parseInt(u["number-columns-repeated"] || "1", 10), k = {
                            t: "z",
                            v: null
                        }, u.formula && 0 != e.cellFormula && (k.f = Eh(nm(u.formula))), "string" == (u["数据类型"] || u["value-type"]) && (k.t = "s", k.v = nm(u["string-value"] || ""), e.dense ? (t[C] || (t[C] = []), t[C][D] = k) : t[Aa({
                            r: C,
                            c: D
                        })] = k), D += N - 1; else if ("/" !== j[1]) {
                            ++D, N = 1;
                            var _ = M ? C + M - 1 : C;
                            if (D > E.e.c && (E.e.c = D), D < E.s.c && (E.s.c = D), C < E.s.r && (E.s.r = C), _ > E.e.r && (E.e.r = _), u = P(j[0], !1), T = [], U = {}, k = {
                                t: u["数据类型"] || u["value-type"],
                                v: null
                            }, e.cellFormula) if (u.formula && (u.formula = nm(u.formula)), u["number-matrix-columns-spanned"] && u["number-matrix-rows-spanned"] && (J = parseInt(u["number-matrix-rows-spanned"], 10) || 0, K = parseInt(u["number-matrix-columns-spanned"], 10) || 0, I = {
                                s: {
                                    r: C,
                                    c: D
                                }, e: {r: C + J - 1, c: D + K - 1}
                            }, k.F = Ca(I), O.push([I, k.F])), u.formula) k.f = Eh(u.formula); else for ($ = 0; $ < O.length; ++$) C >= O[$][0].s.r && C <= O[$][0].e.r && D >= O[$][0].s.c && D <= O[$][0].e.c && (k.F = O[$][1]);
                            switch ((u["number-columns-spanned"] || u["number-rows-spanned"]) && (J = parseInt(u["number-rows-spanned"], 10) || 0, K = parseInt(u["number-columns-spanned"], 10) || 0, I = {
                                s: {
                                    r: C,
                                    c: D
                                }, e: {r: C + J - 1, c: D + K - 1}
                            }, H.push(I)), u["number-columns-repeated"] && (N = parseInt(u["number-columns-repeated"], 10)), k.t) {
                                case"boolean":
                                    k.t = "b", k.v = V(u["boolean-value"]);
                                    break;
                                case"float":
                                case"percentage":
                                case"currency":
                                    k.t = "n", k.v = parseFloat(u.value);
                                    break;
                                case"date":
                                    k.t = "d", k.v = z(u["date-value"]), e.cellDates || (k.t = "n", k.v = w(k.v)), k.z = "m/d/yy";
                                    break;
                                case"time":
                                    k.t = "n", k.v = y(u["time-value"]) / 86400;
                                    break;
                                case"number":
                                    k.t = "n", k.v = parseFloat(u["数据数值"]);
                                    break;
                                default:
                                    if ("string" !== k.t && "text" !== k.t && k.t) throw new Error("Unsupported value type " + k.t);
                                    k.t = "s", null != u["string-value"] && (v = nm(u["string-value"]), A = [])
                            }
                        } else {
                            if (Y = !1, "s" === k.t && (k.v = v || "", A.length && (k.R = A), Y = 0 == x), R.Target && (k.l = R), T.length > 0 && (k.c = T, T = []), v && !1 !== e.cellText && (k.w = v), (!Y || e.sheetStubs) && !(e.sheetRows && e.sheetRows <= C)) for (var aa = 0; aa < M; ++aa) {
                                if (N = parseInt(u["number-columns-repeated"] || "1", 10), e.dense) for (t[C + aa] || (t[C + aa] = []), t[C + aa][D] = 0 == aa ? k : B(k); --N > 0;) t[C + aa][D + N] = B(k); else for (t[Aa({
                                    r: C + aa,
                                    c: D
                                })] = k; --N > 0;) t[Aa({r: C + aa, c: D + N})] = B(k);
                                E.e.c <= D && (E.e.c = D)
                            }
                            N = parseInt(u["number-columns-repeated"] || "1", 10), D += N - 1, N = 0, k = {}, v = "", A = []
                        }
                        R = {};
                        break;
                    case"document":
                    case"document-content":
                    case"电子表格文档":
                    case"spreadsheet":
                    case"主体":
                    case"scripts":
                    case"styles":
                    case"font-face-decls":
                        if ("/" === j[1]) {
                            if ((f = n.pop())[0] !== j[3]) throw"Bad state: " + f
                        } else "/" !== j[0].charAt(j[0].length - 2) && n.push([j[3], !0]);
                        break;
                    case"annotation":
                        if ("/" === j[1]) {
                            if ((f = n.pop())[0] !== j[3]) throw"Bad state: " + f;
                            U.t = v, A.length && (U.R = A), U.a = W, T.push(U)
                        } else "/" !== j[0].charAt(j[0].length - 2) && n.push([j[3], !1]);
                        W = "", X = 0, v = "", x = 0, A = [];
                        break;
                    case"creator":
                        "/" === j[1] ? W = m.slice(X, j.index) : X = j.index + j[0].length;
                        break;
                    case"meta":
                    case"元数据":
                    case"settings":
                    case"config-item-set":
                    case"config-item-map-indexed":
                    case"config-item-map-entry":
                    case"config-item-map-named":
                    case"shapes":
                    case"frame":
                    case"text-box":
                    case"image":
                    case"data-pilot-tables":
                    case"list-style":
                    case"form":
                    case"dde-links":
                    case"event-listeners":
                    case"chart":
                        if ("/" === j[1]) {
                            if ((f = n.pop())[0] !== j[3]) throw"Bad state: " + f
                        } else "/" !== j[0].charAt(j[0].length - 2) && n.push([j[3], !1]);
                        v = "", x = 0, A = [];
                        break;
                    case"scientific-number":
                    case"currency-symbol":
                    case"currency-style":
                        break;
                    case"number-style":
                    case"percentage-style":
                    case"date-style":
                    case"time-style":
                        if ("/" === j[1]) {
                            if (G[o.name] = p, (f = n.pop())[0] !== j[3]) throw"Bad state: " + f
                        } else "/" !== j[0].charAt(j[0].length - 2) && (p = "", o = P(j[0], !1), n.push([j[3], !0]));
                        break;
                    case"script":
                    case"libraries":
                    case"automatic-styles":
                    case"master-styles":
                        break;
                    case"default-style":
                    case"page-layout":
                    case"style":
                    case"map":
                    case"font-face":
                    case"paragraph-properties":
                    case"table-properties":
                    case"table-column-properties":
                    case"table-row-properties":
                    case"table-cell-properties":
                        break;
                    case"number":
                        switch (n[n.length - 1][0]) {
                            case"time-style":
                            case"date-style":
                                g = P(j[0], !1), p += b[j[3]]["long" === g.style ? 1 : 0]
                        }
                        break;
                    case"fraction":
                        break;
                    case"day":
                    case"month":
                    case"year":
                    case"era":
                    case"day-of-week":
                    case"week-of-year":
                    case"quarter":
                    case"hours":
                    case"minutes":
                    case"seconds":
                    case"am-pm":
                        switch (n[n.length - 1][0]) {
                            case"time-style":
                            case"date-style":
                                g = P(j[0], !1), p += b[j[3]]["long" === g.style ? 1 : 0]
                        }
                        break;
                    case"boolean-style":
                    case"boolean":
                    case"text-style":
                        break;
                    case"text":
                        if ("/>" === j[0].slice(-2)) break;
                        if ("/" === j[1]) switch (n[n.length - 1][0]) {
                            case"number-style":
                            case"date-style":
                            case"time-style":
                                p += m.slice(q, j.index)
                        } else q = j.index + j[0].length;
                        break;
                    case"named-range":
                        g = P(j[0], !1), S = Gh(g["cell-range-address"]);
                        var ba = {Name: g.name, Ref: S[0] + "!" + S[1]};
                        Z && (ba.Sheet = s.length), Q.Names.push(ba);
                        break;
                    case"text-content":
                    case"text-properties":
                    case"embedded-text":
                        break;
                    case"body":
                    case"电子表格":
                    case"forms":
                    case"table-column":
                    case"table-header-rows":
                    case"table-rows":
                    case"table-column-group":
                    case"table-header-columns":
                    case"table-columns":
                    case"null-date":
                    case"graphic-properties":
                    case"calculation-settings":
                    case"named-expressions":
                    case"label-range":
                    case"label-ranges":
                    case"named-expression":
                    case"sort":
                    case"sort-by":
                    case"sort-groups":
                    case"tab":
                    case"line-break":
                    case"span":
                        break;
                    case"p":
                    case"文本串":
                        if ("/" !== j[1] || u && u["string-value"]) l = P(j[0], !1), x = j.index + j[0].length; else {
                            var ca = a(m.slice(x, j.index), l);
                            v = (v.length > 0 ? v + "\n" : "") + ca[0]
                        }
                        break;
                    case"s":
                        break;
                    case"database-range":
                        if ("/" === j[1]) break;
                        try {
                            S = Gh(P(j[0])["target-range-address"]), r[S[0]]["!autofilter"] = {ref: S[1]}
                        } catch (a) {
                        }
                        break;
                    case"date":
                    case"object":
                        break;
                    case"title":
                    case"标题":
                    case"desc":
                    case"binary-data":
                    case"table-source":
                    case"scenario":
                    case"iteration":
                    case"content-validations":
                    case"content-validation":
                    case"help-message":
                    case"error-message":
                    case"database-ranges":
                    case"filter":
                    case"filter-and":
                    case"filter-or":
                    case"filter-condition":
                    case"list-level-style-bullet":
                    case"list-level-style-number":
                    case"list-level-properties":
                        break;
                    case"sender-firstname":
                    case"sender-lastname":
                    case"sender-initials":
                    case"sender-title":
                    case"sender-position":
                    case"sender-email":
                    case"sender-phone-private":
                    case"sender-fax":
                    case"sender-company":
                    case"sender-phone-work":
                    case"sender-street":
                    case"sender-city":
                    case"sender-postal-code":
                    case"sender-country":
                    case"sender-state-or-province":
                    case"author-name":
                    case"author-initials":
                    case"chapter":
                    case"file-name":
                    case"template-name":
                    case"sheet-name":
                    case"event-listener":
                        break;
                    case"initial-creator":
                    case"creation-date":
                    case"print-date":
                    case"generator":
                    case"document-statistic":
                    case"user-defined":
                    case"editing-duration":
                    case"editing-cycles":
                    case"config-item":
                    case"page-number":
                    case"page-count":
                    case"time":
                    case"cell-range-source":
                    case"detective":
                    case"operation":
                    case"highlighted-range":
                        break;
                    case"data-pilot-table":
                    case"source-cell-range":
                    case"source-service":
                    case"data-pilot-field":
                    case"data-pilot-level":
                    case"data-pilot-subtotals":
                    case"data-pilot-subtotal":
                    case"data-pilot-members":
                    case"data-pilot-member":
                    case"data-pilot-display-info":
                    case"data-pilot-sort-info":
                    case"data-pilot-layout-info":
                    case"data-pilot-field-reference":
                    case"data-pilot-groups":
                    case"data-pilot-group":
                    case"data-pilot-group-member":
                    case"rect":
                        break;
                    case"dde-connection-decls":
                    case"dde-connection-decl":
                    case"dde-link":
                    case"dde-source":
                    case"properties":
                    case"property":
                        break;
                    case"a":
                        if ("/" !== j[1]) {
                            if (R = P(j[0], !1), !R.href) break;
                            R.Target = R.href, delete R.href, "#" == R.Target.charAt(0) && R.Target.indexOf(".") > -1 && (S = Gh(R.Target.slice(1)), R.Target = "#" + S[0] + "!" + S[1])
                        }
                        break;
                    case"table-protection":
                    case"data-pilot-grand-total":
                    case"office-document-common-attrs":
                        break;
                    default:
                        switch (j[2]) {
                            case"dc:":
                            case"calcext:":
                            case"loext:":
                            case"ooo:":
                            case"chartooo:":
                            case"draw:":
                            case"style:":
                            case"chart:":
                            case"form:":
                            case"uof:":
                            case"表:":
                            case"字:":
                                break;
                            default:
                                if (e.WTF) throw new Error(j)
                        }
                }
                var da = {Sheets: r, SheetNames: s, Workbook: Q};
                return e.bookSheets && delete da.Sheets, da
            }
        }(), tq = function () {
            var a = "<office:document-styles " + Y({
                "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
                "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
                "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
                "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
                "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
                "xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
                "xmlns:xlink": "http://www.w3.org/1999/xlink",
                "xmlns:dc": "http://purl.org/dc/elements/1.1/",
                "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
                "xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
                "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
                "office:version": "1.2"
            }) + "></office:document-styles>";
            return function () {
                return gm + a
            }
        }(), uq = function () {
            var a = function (a) {
                    return R(a).replace(/  +/g, function (a) {
                        return '<text:s text:c="' + a.length + '"/>'
                    }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "<text:line-break/>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>")
                }, b = "          <table:table-cell />\n", c = "          <table:covered-table-cell/>\n",
                d = function (d, e, f) {
                    var g = [];
                    g.push('      <table:table table:name="' + R(e.SheetNames[f]) + '">\n');
                    var h = 0, i = 0, j = Ba(d["!ref"]), k = d["!merges"] || [], l = 0, m = Array.isArray(d);
                    for (h = 0; h < j.s.r; ++h) g.push("        <table:table-row></table:table-row>\n");
                    for (; h <= j.e.r; ++h) {
                        for (g.push("        <table:table-row>\n"), i = 0; i < j.s.c; ++i) g.push(b);
                        for (; i <= j.e.c; ++i) {
                            var n = !1, o = {}, p = "";
                            for (l = 0; l != k.length; ++l) if (!(k[l].s.c > i || k[l].s.r > h || k[l].e.c < i || k[l].e.r < h)) {
                                k[l].s.c == i && k[l].s.r == h || (n = !0), o["table:number-columns-spanned"] = k[l].e.c - k[l].s.c + 1, o["table:number-rows-spanned"] = k[l].e.r - k[l].s.r + 1;
                                break
                            }
                            if (n) g.push(c); else {
                                var q = Aa({r: h, c: i}), r = m ? (d[h] || [])[i] : d[q];
                                if (r && r.f && (o["table:formula"] = R(Fh(r.f)), r.F && r.F.slice(0, q.length) == q)) {
                                    var s = Ba(r.F);
                                    o["table:number-matrix-columns-spanned"] = s.e.c - s.s.c + 1, o["table:number-matrix-rows-spanned"] = s.e.r - s.s.r + 1
                                }
                                if (r) {
                                    switch (r.t) {
                                        case"b":
                                            p = r.v ? "TRUE" : "FALSE", o["office:value-type"] = "boolean", o["office:boolean-value"] = r.v ? "true" : "false";
                                            break;
                                        case"n":
                                            p = r.w || String(r.v || 0), o["office:value-type"] = "float", o["office:value"] = r.v || 0;
                                            break;
                                        case"s":
                                        case"str":
                                            p = r.v, o["office:value-type"] = "string";
                                            break;
                                        case"d":
                                            p = r.w || z(r.v).toISOString(), o["office:value-type"] = "date", o["office:date-value"] = z(r.v).toISOString(), o["table:style-name"] = "ce1";
                                            break;
                                        default:
                                            g.push(b);
                                            continue
                                    }
                                    var t = a(p);
                                    if (r.l && r.l.Target) {
                                        var u = r.l.Target;
                                        u = "#" == u.charAt(0) ? "#" + Hh(u.slice(1)) : u, t = Z("text:a", t, {"xlink:href": u})
                                    }
                                    g.push("          " + Z("table:table-cell", Z("text:p", t, {}), o) + "\n")
                                } else g.push(b)
                            }
                        }
                        g.push("        </table:table-row>\n")
                    }
                    return g.push("      </table:table>\n"), g.join("")
                }, e = function (a) {
                    a.push(" <office:automatic-styles>\n"), a.push('  <number:date-style style:name="N37" number:automatic-order="true">\n'), a.push('   <number:month number:style="long"/>\n'), a.push("   <number:text>/</number:text>\n"), a.push('   <number:day number:style="long"/>\n'), a.push("   <number:text>/</number:text>\n"), a.push("   <number:year/>\n"), a.push("  </number:date-style>\n"), a.push('  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>\n'), a.push(" </office:automatic-styles>\n")
                };
            return function (a, b) {
                var c = [gm], f = Y({
                    "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
                    "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
                    "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
                    "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
                    "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
                    "xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
                    "xmlns:xlink": "http://www.w3.org/1999/xlink",
                    "xmlns:dc": "http://purl.org/dc/elements/1.1/",
                    "xmlns:meta": "urn:oasis:names:tc:opendocument:xmlns:meta:1.0",
                    "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
                    "xmlns:presentation": "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
                    "xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
                    "xmlns:chart": "urn:oasis:names:tc:opendocument:xmlns:chart:1.0",
                    "xmlns:dr3d": "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",
                    "xmlns:math": "http://www.w3.org/1998/Math/MathML",
                    "xmlns:form": "urn:oasis:names:tc:opendocument:xmlns:form:1.0",
                    "xmlns:script": "urn:oasis:names:tc:opendocument:xmlns:script:1.0",
                    "xmlns:ooo": "http://openoffice.org/2004/office",
                    "xmlns:ooow": "http://openoffice.org/2004/writer",
                    "xmlns:oooc": "http://openoffice.org/2004/calc",
                    "xmlns:dom": "http://www.w3.org/2001/xml-events",
                    "xmlns:xforms": "http://www.w3.org/2002/xforms",
                    "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
                    "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                    "xmlns:sheet": "urn:oasis:names:tc:opendocument:sh33tjs:1.0",
                    "xmlns:rpt": "http://openoffice.org/2005/report",
                    "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
                    "xmlns:xhtml": "http://www.w3.org/1999/xhtml",
                    "xmlns:grddl": "http://www.w3.org/2003/g/data-view#",
                    "xmlns:tableooo": "http://openoffice.org/2009/table",
                    "xmlns:drawooo": "http://openoffice.org/2010/draw",
                    "xmlns:calcext": "urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0",
                    "xmlns:loext": "urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0",
                    "xmlns:field": "urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0",
                    "xmlns:formx": "urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0",
                    "xmlns:css3t": "http://www.w3.org/TR/css3-text/",
                    "office:version": "1.2"
                }), g = Y({
                    "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
                    "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
                });
                "fods" == b.bookType ? c.push("<office:document" + f + g + ">\n") : c.push("<office:document-content" + f + ">\n"), e(c), c.push("  <office:body>\n"), c.push("    <office:spreadsheet>\n");
                for (var h = 0; h != a.SheetNames.length; ++h) c.push(d(a.Sheets[a.SheetNames[h]], a, h, b));
                return c.push("    </office:spreadsheet>\n"), c.push("  </office:body>\n"), "fods" == b.bookType ? c.push("</office:document>") : c.push("</office:document-content>"), c.join("")
            }
        }(), vq = Rk(rq), wq = Rk({from_sheet: vl}), xq = Rk(so), yq = Rk(to), zq = Rk(vo), Aq = Rk(Jo),
        Bq = Rk({from_sheet: wl}), Cq = Rk(ro), Dq = Rk(uo),
        Eq = Sk([["cellNF", !1], ["cellHTML", !0], ["cellFormula", !0], ["cellStyles", !1], ["cellText", !0], ["cellDates", !1], ["sheetStubs", !1], ["sheetRows", 0, "n"], ["bookDeps", !1], ["bookSheets", !1], ["bookProps", !1], ["bookFiles", !1], ["bookVBA", !1], ["password", ""], ["WTF", !1]]),
        Fq = Sk([["cellDates", !1], ["bookSST", !1], ["bookType", "xlsx"], ["compression", !1], ["WTF", !1]]),
        Gq = /"/g, Hq = {
            encode_col: va,
            encode_row: ra,
            encode_cell: Aa,
            encode_range: Ca,
            decode_col: ua,
            decode_row: qa,
            split_cell: ya,
            decode_cell: za,
            decode_range: Ba,
            format_cell: Fa,
            get_formulae: xl,
            make_csv: vl,
            make_json: tl,
            make_formulae: xl,
            sheet_add_aoa: Ha,
            sheet_add_json: yl,
            aoa_to_sheet: Ia,
            json_to_sheet: zl,
            table_to_sheet: Jk,
            table_to_book: Kk,
            sheet_to_csv: vl,
            sheet_to_txt: wl,
            sheet_to_json: tl,
            sheet_to_html: rq.from_sheet,
            sheet_to_dif: to.from_sheet,
            sheet_to_slk: so.from_sheet,
            sheet_to_eth: uo.from_sheet,
            sheet_to_formulae: xl,
            sheet_to_row_object_array: tl
        };
    !function (a) {
        function b(b) {
            b.forEach(function (b) {
                a.consts[b[0]] = b[1]
            })
        }

        function c(a, b, c) {
            return null != a[b] ? a[b] : a[b] = c
        }

        function d(a, b, c) {
            return "string" == typeof b ? a[b] || (a[b] = {t: "z"}) : "number" != typeof b ? d(a, Aa(b)) : d(a, Aa({
                r: b,
                c: c || 0
            }))
        }

        function e(a, b) {
            if ("number" == typeof b) {
                if (b >= 0 && a.SheetNames.length > b) return b;
                throw new Error("Cannot find sheet # " + b)
            }
            if ("string" == typeof b) {
                var c = a.SheetNames.indexOf(b);
                if (c > -1) return c;
                throw new Error("Cannot find sheet name |" + b + "|")
            }
            throw new Error("Cannot find sheet |" + b + "|")
        }

        a.consts = a.consts || {}, a.book_new = function () {
            return {SheetNames: [], Sheets: {}}
        }, a.book_append_sheet = function (a, b, c) {
            if (!c) for (var d = 1; d <= 65535 && -1 != a.SheetNames.indexOf(c = "Sheet" + d); ++d) ;
            if (!c) throw new Error("Too many worksheets");
            if (gj(c), a.SheetNames.indexOf(c) >= 0) throw new Error("Worksheet with name |" + c + "| already exists!");
            a.SheetNames.push(c), a.Sheets[c] = b
        }, a.book_set_sheet_visibility = function (a, b, d) {
            c(a, "Workbook", {}), c(a.Workbook, "Sheets", []);
            var f = e(a, b);
            switch (c(a.Workbook.Sheets, f, {}), d) {
                case 0:
                case 1:
                case 2:
                    break;
                default:
                    throw new Error("Bad sheet visibility setting " + d)
            }
            a.Workbook.Sheets[f].Hidden = d
        }, b([["SHEET_VISIBLE", 0], ["SHEET_HIDDEN", 1], ["SHEET_VERY_HIDDEN", 2]]), a.cell_set_number_format = function (a, b) {
            return a.z = b, a
        }, a.cell_set_hyperlink = function (a, b, c) {
            return b ? (a.l = {Target: b}, c && (a.l.Tooltip = c)) : delete a.l, a
        }, a.cell_set_internal_link = function (b, c, d) {
            return a.cell_set_hyperlink(b, "#" + c, d)
        }, a.cell_add_comment = function (a, b, c) {
            a.c || (a.c = []), a.c.push({t: b, a: c || "SheetJS"})
        }, a.sheet_set_array_formula = function (a, b, c) {
            for (var e = "string" != typeof b ? b : Da(b), f = "string" == typeof b ? b : Ca(b), g = e.s.r; g <= e.e.r; ++g) for (var h = e.s.c; h <= e.e.c; ++h) {
                var i = d(a, g, h);
                i.t = "n", i.F = f, delete i.v, g == e.s.r && h == e.s.c && (i.f = c)
            }
            return a
        }
    }(Hq), Ml && "undefined" != typeof require && function () {
        var b = {}.Readable, c = function (a, c) {
            var d = b(), e = null == c ? {} : c;
            if (null == a || null == a["!ref"]) return d.push(null), d;
            var f = Da(a["!ref"]), g = void 0 !== e.FS ? e.FS : ",", h = g.charCodeAt(0),
                i = void 0 !== e.RS ? e.RS : "\n", j = i.charCodeAt(0), k = new RegExp(("|" == g ? "\\|" : g) + "+$"),
                l = "", m = [];
            e.dense = Array.isArray(a);
            for (var n = e.skipHidden && a["!cols"] || [], o = e.skipHidden && a["!rows"] || [], p = f.s.c; p <= f.e.c; ++p) (n[p] || {}).hidden || (m[p] = va(p));
            var q = f.s.r, r = !1;
            return d._read = function () {
                if (!r) return r = !0, d.push("\ufeff");
                if (q > f.e.r) return d.push(null);
                for (; q <= f.e.r;) if (++q, !(o[q - 1] || {}).hidden && null != (l = ul(a, f, q - 1, m, h, j, g, e))) {
                    e.strip && (l = l.replace(k, "")), d.push(l + i);
                    break
                }
            }, d
        }, d = function (a, c) {
            var d = b(), e = c || {}, f = null != e.header ? e.header : rq.BEGIN,
                g = null != e.footer ? e.footer : rq.END;
            d.push(f);
            var h = Ba(a["!ref"]);
            e.dense = Array.isArray(a), d.push(rq._preamble(a, h, e));
            var i = h.s.r, j = !1;
            return d._read = function () {
                if (i > h.e.r) return j || (j = !0, d.push("</table>" + g)), d.push(null);
                for (; i <= h.e.r;) {
                    d.push(rq._row(a, h, i, e)), ++i;
                    break
                }
            }, d
        }, e = function (a, c) {
            var d = b({objectMode: !0});
            if (null == a || null == a["!ref"]) return d.push(null), d;
            var e = {t: "n", v: 0}, f = 0, g = 1, h = [], i = 0, j = "", k = {s: {r: 0, c: 0}, e: {r: 0, c: 0}},
                l = c || {}, m = null != l.range ? l.range : a["!ref"];
            switch (1 === l.header ? f = 1 : "A" === l.header ? f = 2 : Array.isArray(l.header) && (f = 3), typeof m) {
                case"string":
                    k = Da(m);
                    break;
                case"number":
                    k = Da(a["!ref"]), k.s.r = m;
                    break;
                default:
                    k = m
            }
            f > 0 && (g = 0);
            var n = ra(k.s.r), o = [], p = 0, q = Array.isArray(a), r = k.s.r, s = 0, t = 0;
            for (q && !a[r] && (a[r] = []), s = k.s.c; s <= k.e.c; ++s) switch (o[s] = va(s), e = q ? a[r][s] : a[o[s] + n], f) {
                case 1:
                    h[s] = s - k.s.c;
                    break;
                case 2:
                    h[s] = o[s];
                    break;
                case 3:
                    h[s] = l.header[s - k.s.c];
                    break;
                default:
                    for (null == e && (e = {
                        w: "__EMPTY",
                        t: "s"
                    }), j = i = Fa(e, null, l), p = 0, t = 0; t < h.length; ++t) h[t] == j && (j = i + "_" + ++p);
                    h[s] = j
            }
            return r = k.s.r + g, d._read = function () {
                if (r > k.e.r) return d.push(null);
                for (; r <= k.e.r;) {
                    var b = sl(a, k, r, o, f, h, q, l);
                    if (++r, !1 === b.isempty || (1 === f ? !1 !== l.blankrows : !!l.blankrows)) {
                        d.push(b.row);
                        break
                    }
                }
            }, d
        };
        a.stream = {to_json: e, to_html: d, to_csv: c}
    }();
    var Iq = function () {
        function a(b, c, d) {
            return this instanceof a ? (this.tagName = b, this._attributes = c || {}, this._children = d || [], this._prefix = "", this) : new a(b, c, d)
        }

        a.prototype.createElement = function () {
            return new a(arguments)
        }, a.prototype.children = function () {
            return this._children
        }, a.prototype.append = function (a) {
            return this._children.push(a), this
        }, a.prototype.prefix = function (a) {
            return 0 == arguments.length ? this._prefix : (this._prefix = a, this)
        }, a.prototype.attr = function (a, b) {
            if (void 0 == b) return delete this._attributes[a], this;
            if (0 == arguments.length) return this._attributes;
            if ("string" == typeof a && 1 == arguments.length) return this._attributes.attr[a];
            if ("object" == typeof a && 1 == arguments.length) for (var c in a) this._attributes[c] = a[c]; else 2 == arguments.length && "string" == typeof a && (this._attributes[a] = b);
            return this
        };
        var b = "'";
        QUOTE = '"';
        var c = {};
        return c[QUOTE] = "&quot;", c[b] = "&apos;", a.prototype.escapeAttributeValue = function (a) {
            return '"' + a.replace(/\"/g, "&quot;") + '"'
        }, a.prototype.toXml = function (a) {
            a || (a = this);
            var b = a._prefix;
            if (b += "<" + a.tagName, a._attributes) for (var c in a._attributes) b += " " + c + "=" + this.escapeAttributeValue("" + a._attributes[c]);
            if (a._children && a._children.length > 0) {
                b += ">";
                for (var d = 0; d < a._children.length; d++) b += this.toXml(a._children[d]);
                b += "</" + a.tagName + ">"
            } else b += "/>";
            return b
        }, a
    }(), Jq = function (a) {
        var b = 164, c = {
            0: "General",
            1: "0",
            2: "0.00",
            3: "#,##0",
            4: "#,##0.00",
            9: "0%",
            10: "0.00%",
            11: "0.00E+00",
            12: "# ?/?",
            13: "# ??/??",
            14: "m/d/yy",
            15: "d-mmm-yy",
            16: "d-mmm",
            17: "mmm-yy",
            18: "h:mm AM/PM",
            19: "h:mm:ss AM/PM",
            20: "h:mm",
            21: "h:mm:ss",
            22: "m/d/yy h:mm",
            37: "#,##0 ;(#,##0)",
            38: "#,##0 ;[Red](#,##0)",
            39: "#,##0.00;(#,##0.00)",
            40: "#,##0.00;[Red](#,##0.00)",
            45: "mm:ss",
            46: "[h]:mm:ss",
            47: "mmss.0",
            48: "##0.0E+0",
            49: "@",
            56: '"上午/下午 "hh"時"mm"分"ss"秒 "'
        }, d = {};
        for (var e in c) d[c[e]] = e;
        return _hashIndex = {}, _listIndex = [], {
            initialize: function (a) {
                this.$fonts = Iq("fonts").attr("count", 0).attr("x14ac:knownFonts", "1"), this.$fills = Iq("fills").attr("count", 0), this.$borders = Iq("borders").attr("count", 0), this.$numFmts = Iq("numFmts").attr("count", 0), this.$cellStyleXfs = Iq("cellStyleXfs"), this.$xf = Iq("xf").attr("numFmtId", 0).attr("fontId", 0).attr("fillId", 0).attr("borderId", 0), this.$cellXfs = Iq("cellXfs").attr("count", 0), this.$cellStyles = Iq("cellStyles").append(Iq("cellStyle").attr("name", "Normal").attr("xfId", 0).attr("builtinId", 0)), this.$dxfs = Iq("dxfs").attr("count", "0"), this.$tableStyles = Iq("tableStyles").attr("count", "0").attr("defaultTableStyle", "TableStyleMedium9").attr("defaultPivotStyle", "PivotStyleMedium4"), this.$styles = Iq("styleSheet").attr("xmlns:mc", "http://schemas.openxmlformats.org/markup-compatibility/2006").attr("xmlns:x14ac", "http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac").attr("xmlns", "http://schemas.openxmlformats.org/spreadsheetml/2006/main").attr("mc:Ignorable", "x14ac").prefix('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>').append(this.$numFmts).append(this.$fonts).append(this.$fills).append(this.$borders).append(this.$cellStyleXfs.append(this.$xf)).append(this.$cellXfs).append(this.$cellStyles).append(this.$dxfs).append(this.$tableStyles);
                var b = a.defaultCellStyle || {};
                b.font || (b.font = {
                    name: "Calibri",
                    sz: "12"
                }), b.font.name || (b.font.name = "Calibri"), b.font.sz || (b.font.sz = 11), b.fill || (b.fill = {
                    patternType: "none",
                    fgColor: {}
                }), b.border || (b.border = {}), b.numFmt || (b.numFmt = 0), this.defaultStyle = b;
                var c = JSON.parse(JSON.stringify(b));
                return c.fill = {patternType: "gray125", fgColor: {}}, this.addStyles([b, c]), this
            }, addStyle: function (a) {
                var b = JSON.stringify(a), c = _hashIndex[b];
                return void 0 == c ? (c = this._addXf(a), _hashIndex[b] = c) : c = _hashIndex[b], c
            }, addStyles: function (a) {
                var b = this;
                return a.map(function (a) {
                    return b.addStyle(a)
                })
            }, _duckTypeStyle: function (a) {
                return "object" == typeof a && (a.patternFill || a.fgColor) ? {fill: a} : a.font || a.numFmt || a.border || a.fill ? a : this._getStyleCSS(a)
            }, _getStyleCSS: function (a) {
                return a
            }, _addXf: function (a) {
                var b = this._addFont(a.font), c = this._addFill(a.fill), d = this._addBorder(a.border),
                    e = this._addNumFmt(a.numFmt),
                    f = Iq("xf").attr("numFmtId", e).attr("fontId", b).attr("fillId", c).attr("borderId", d).attr("xfId", "0");
                if (b > 0 && f.attr("applyFont", "1"), c > 0 && f.attr("applyFill", "1"), d > 0 && f.attr("applyBorder", "1"), e > 0 && f.attr("applyNumberFormat", "1"), a.alignment) {
                    var g = Iq("alignment");
                    a.alignment.horizontal && g.attr("horizontal", a.alignment.horizontal), a.alignment.vertical && g.attr("vertical", a.alignment.vertical), a.alignment.indent && g.attr("indent", a.alignment.indent), a.alignment.readingOrder && g.attr("readingOrder", a.alignment.readingOrder), a.alignment.wrapText && g.attr("wrapText", a.alignment.wrapText), void 0 != a.alignment.textRotation && g.attr("textRotation", a.alignment.textRotation), f.append(g).attr("applyAlignment", 1)
                }
                this.$cellXfs.append(f);
                var h = +this.$cellXfs.children().length;
                return this.$cellXfs.attr("count", h), h - 1
            }, _addFont: function (a) {
                if (!a) return 0;
                var b = Iq("font").append(Iq("sz").attr("val", a.sz || this.defaultStyle.font.sz)).append(Iq("name").attr("val", a.name || this.defaultStyle.font.name));
                a.bold && b.append(Iq("b")), a.underline && b.append(Iq("u")), a.italic && b.append(Iq("i")), a.strike && b.append(Iq("strike")), a.outline && b.append(Iq("outline")), a.shadow && b.append(Iq("shadow")), a.vertAlign && b.append(Iq("vertAlign").attr("val", a.vertAlign)), a.color && (a.color.theme ? (b.append(Iq("color").attr("theme", a.color.theme)), a.color.tint && b.append(Iq("tint").attr("theme", a.color.tint))) : a.color.rgb && b.append(Iq("color").attr("rgb", a.color.rgb))), this.$fonts.append(b);
                var c = this.$fonts.children().length;
                return this.$fonts.attr("count", c), c - 1
            }, _addNumFmt: function (a) {
                if (!a) return 0;
                if ("string" == typeof a) {
                    var c = d[a];
                    if (c >= 0) return c
                }
                if (/^[0-9]+$/.exec(a)) return a;
                a = a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
                var e = Iq("numFmt").attr("numFmtId", ++b).attr("formatCode", a);
                this.$numFmts.append(e);
                var f = this.$numFmts.children().length;
                return this.$numFmts.attr("count", f), b
            }, _addFill: function (a) {
                if (!a) return 0;
                var b = Iq("patternFill").attr("patternType", a.patternType || "solid");
                if (a.fgColor) {
                    var c = Iq("fgColor");
                    a.fgColor.rgb ? (6 == a.fgColor.rgb.length && (a.fgColor.rgb = "FF" + a.fgColor.rgb), c.attr("rgb", a.fgColor.rgb), b.append(c)) : a.fgColor.theme && (c.attr("theme", a.fgColor.theme), a.fgColor.tint && c.attr("tint", a.fgColor.tint), b.append(c)), a.bgColor || (a.bgColor = {indexed: "64"})
                }
                if (a.bgColor) {
                    var d = Iq("bgColor").attr(a.bgColor);
                    b.append(d)
                }
                var e = Iq("fill").append(b);
                this.$fills.append(e);
                var f = this.$fills.children().length;
                return this.$fills.attr("count", f), f - 1
            }, _getSubBorder: function (a, b) {
                var c = Iq(a);
                if (b && (b.style && c.attr("style", b.style), b.color)) {
                    var d = Iq("color");
                    b.color.auto ? d.attr("auto", b.color.auto) : b.color.rgb ? d.attr("rgb", b.color.rgb) : (b.color.theme || b.color.tint) && (d.attr("theme", b.color.theme || "1"), d.attr("tint", b.color.tint || "0")), c.append(d)
                }
                return c
            }, _addBorder: function (a) {
                if (!a) return 0;
                var b = this, c = Iq("border").attr("diagonalUp", a.diagonalUp).attr("diagonalDown", a.diagonalDown);
                ["left", "right", "top", "bottom", "diagonal"].forEach(function (d) {
                    c.append(b._getSubBorder(d, a[d]))
                }), this.$borders.append(c);
                var d = this.$borders.children().length;
                return this.$borders.attr("count", d), d - 1
            }, toXml: function () {
                return this.$styles.toXml()
            }
        }.initialize(a || {})
    };
    a.parse_xlscfb = qk, a.parse_ods = Nk, a.parse_fods = Ok, a.write_ods = Pk, a.parse_zip = Xk, a.read = gl, a.readFile = hl, a.readFileSync = hl, a.write = ol, a.writeFile = ql, a.writeFileSync = ql, a.writeFileAsync = rl, a.utils = Hq, a.SSF = Tl, a.CFB = $l
}

"undefined" == typeof layui && "undefined" == typeof jQuery && console.error("非layui调用请先加载jQuery"), "undefined" != typeof jQuery && ($ = jQuery), LAY_EXCEL = {
    downloadExl: function (a, b, c) {
        c = c || "xlsx", this.exportExcel({sheet1: a}, b + "." + c, c, null)
    }, exportExcel: function (a, b, c, d) {
        c = c || "xlsx", b = b || "导出数据." + c;
        var e = XLSX.utils.book_new(), f = {
            Title: b,
            Subject: "Export From web browser",
            Author: "excel.wj2015.com",
            Manager: "",
            Company: "",
            Category: "",
            Keywords: "",
            Comments: "",
            LastAuthor: "",
            CreatedData: new Date
        };
        d && d.Props && (f = $.extend(f, d.Props)), e.compression = !d || d.compression, !1 !== e.compression && (e.compression = !0), e.Props = f;
        var g = {
            "!merges": null,
            "!margins": null,
            "!cols": null,
            "!rows": null,
            "!protect": null,
            "!autofilter": null
        };
        d && d.extend && (g = $.extend(g, d.extend));
        for (var h in g) g.hasOwnProperty(h) && (g[h] || delete g[h]);
        $.isArray(a) && (a = {sheet1: a});
        for (var i in a) if (a.hasOwnProperty(i)) {
            var j = a[i];
            e.SheetNames.push(i);
            var k = !1;
            if (j.length && j[0] && $.isArray(j[0]) && (k = !0), k) n = XLSX.utils.aoa_to_sheet(j); else {
                var l = {};
                if (j.length) {
                    l.headers = j.unshift(), l.skipHeader = !0;
                    var m = this.splitContent(j)
                }
                var n = XLSX.utils.json_to_sheet(j, l);
                g[i] ? $.extend(n, g[i]) : $.extend(n, g), void 0 !== m && this.mergeCellOpt(n, m.style)
            }
            e.Sheets[i] = n
        }
        var o = XLSX.write(e, {bookType: c, type: "binary", cellStyles: !0, compression: e.compression});
        saveAs(new Blob([this.s2ab(o)], {type: "application/octet-stream"}), b)
    }, splitContent: function (a) {
        for (var b = {}, c = 0; c < a.length; c++) {
            var d = a[c], e = 0;
            for (var f in d) if (d.hasOwnProperty(f)) {
                var g = d[f];
                "object" == typeof g ? null !== g ? b[this.numToTitle(e + 1) + (parseInt(c) + 1)] = g : d[f] = "" : (0 === g && (g = {
                    v: "0",
                    s: {alignment: {horizontal: "right"}}
                }), b[this.numToTitle(e + 1) + (parseInt(c) + 1)] = g), e++
            }
        }
        return {content: a, style: b}
    }, mergeCellOpt: function (a, b) {
        for (var c in b) if (b.hasOwnProperty(c)) {
            var d = b[c];
            if (a[c]) {
                for (var e = ["t", "w", "f", "r", "h", "c", "z", "l", "s"], f = 0; f < e.length; f++) a[c][e[f]] = a[c][e[f]];
                $.extend(a[c], d)
            }
        }
    }, tableToJson: function (a) {
        a = $(a);
        var b = [];
        a.find("thead > tr").each(function () {
            var a = [];
            $(this).find("td,th").each(function () {
                a.push($(this).text())
            }), b.push(a)
        });
        var c = [];
        return a.find("tbody > tr").each(function () {
            var a = [];
            $(this).find("td").each(function () {
                a.push($(this).text())
            }), c.push(a)
        }), {head: b, body: c}
    }, numsTitleCache: {}, titleNumsCache: {}, numToTitle: function (a) {
        if (this.numsTitleCache[a]) return this.numsTitleCache[a];
        var b = "";
        if (a > 26) {
            var c = a % 26;
            return b = this.numToTitle((a - c) / 26) + this.numToTitle(c || 26), this.numsTitleCache[a] = b, this.titleNumsCache[b] = a, b
        }
        return b = String.fromCharCode(64 + a), this.numsTitleCache[a] = b, this.titleNumsCache[b] = a, b
    }, titleToNum: function (a) {
        if (this.titleNumsCache[a]) return this.titleNumsCache[a];
        var b = a.length, c = 0;
        for (var d in a) if (a.hasOwnProperty(d)) {
            var e = a[d], f = e.charCodeAt() - 64;
            c += f * Math.pow(26, b - d - 1)
        }
        return this.numsTitleCache[c] = a, this.titleNumsCache[a] = c, c
    }, getDefaultRange: function (a, b) {
        var c = Object.keys(a[0]), d = c.length - 1, e = a.length - 1, f = {c: 0, r: 0}, g = {c: d, r: e};
        if (b && "string" == typeof b) {
            var h = b.split(":");
            h[0].length && (f = this.splitPosition(h[0])), void 0 !== h[1] && "" !== h[1] && (g = this.splitPosition(h[1]))
        }
        return f.c > g.c && console.error("开始列不得大于结束列"), f.r > g.r && console.error("开始行不得大于结束行"), {
            startPos: f,
            endPos: g,
            fieldKeys: c
        }
    }, setCellStyle: function (a, b, c, d, e, f) {
        for (var g = b.r; g <= c.r; g++) for (var h = b.c; h <= c.c; h++) {
            var i = a[g];
            if (!i) {
                i = {};
                for (var j = 0; j < d.length; j++) i[d[j]] = "";
                a[g] = i
            }
            var k = i[d[h]], l = null;
            null !== k && void 0 !== k || (k = ""), l = "object" == typeof k ? $.extend(!0, {}, k, e) : $.extend(!0, {}, {v: k}, e), "function" == typeof f && (l = f(k, l, i, e, g, h, d[h])), a[g][d[h]] = l
        }
    }, setRoundBorder: function (a, b, c) {
        if ("object" != typeof a || !a.length || !a[0] || !Object.keys(a[0]).length) return [];
        var d = this.getDefaultRange(a, b), e = d.startPos, f = d.endPos, g = d.fieldKeys;
        this.setCellStyle(a, e, {c: f.c, r: e.r}, g, {
            s: {
                border: {
                    top: c.top,
                    diagonal: c.top.diagonal,
                    diagonalUp: c.top.diagonalUp,
                    diagonalDown: c.top.diagonalDown
                }
            }
        }), this.setCellStyle(a, {c: f.c, r: e.r}, f, g, {
            s: {
                border: {
                    right: c.right,
                    diagonal: c.right.diagonal,
                    diagonalUp: c.right.diagonalUp,
                    diagonalDown: c.right.diagonalDown
                }
            }
        }), this.setCellStyle(a, {c: e.c, r: f.r}, f, g, {
            s: {
                border: {
                    bottom: c.bottom,
                    diagonal: c.bottom.diagonal,
                    diagonalUp: c.bottom.diagonalUp,
                    diagonalDown: c.bottom.diagonalDown
                }
            }
        }), this.setCellStyle(a, e, {c: e.c, r: f.r}, g, {
            s: {
                border: {
                    left: c.left,
                    diagonal: c.left.diagonal,
                    diagonalUp: c.left.diagonalUp,
                    diagonalDown: c.left.diagonalDown
                }
            }
        })
    }, setExportCellStyle: function (a, b, c, d) {
        if ("object" != typeof a || !a.length || !a[0] || !Object.keys(a[0]).length) return [];
        var e = this.getDefaultRange(a, b), f = e.startPos, g = e.endPos, h = e.fieldKeys;
        return this.setCellStyle(a, f, g, h, c, d), a
    }, makeMergeConfig: function (a) {
        for (var b = [], c = 0; c < a.length; c++) b.push({
            s: this.splitPosition(a[c][0]),
            e: this.splitPosition(a[c][1])
        });
        return b
    }, makeColConfig: function (a, b) {
        b = b > 0 ? b : 50;
        var c = [], d = 0;
        for (var e in a) if (a.hasOwnProperty(e)) {
            var f = a[e];
            if (e.match && e.match(/[A-Z]*/)) {
                for (var g = this.titleToNum(e) - 1; d < g;) c.push({wpx: b}), d++;
                d = g + 1, c.push({wpx: f > 0 ? f : b})
            }
        }
        return c
    }, makeRowConfig: function (a, b) {
        b = b > 0 ? b : 10;
        var c = [], d = 0;
        for (var e in a) if (a.hasOwnProperty(e)) {
            var f = a[e];
            if (e.match && e.match(/[0-9]*/)) {
                for (var g = parseInt(e) - 1; d < g;) c.push({hpx: b}), d++;
                d = g + 1, c.push({hpx: f > 0 ? f : b})
            }
        }
        return c
    }, splitPosition: function (a) {
        var b = a.match("^([A-Z]+)([0-9]+)$");
        return b ? {c: this.titleToNum(b[1]) - 1, r: parseInt(b[2]) - 1} : {c: 0, r: 0}
    }, s2ab: function (a) {
        for (var b = new ArrayBuffer(a.length), c = new Uint8Array(b), d = 0; d < a.length; d++) c[d] = 255 & a.charCodeAt(d);
        return b
    }, filterDataToAoaData: function (a) {
        var b = [];
        return $.each(a, function (a, c) {
            var d = [];
            for (var e in c) c.hasOwnProperty(e) && d.push(c[e]);
            b.push(d)
        }), b
    }, filterExportData: function (a, b) {
        var c = [], d = [];
        if (Array.isArray(b)) for (var e = 0; e < b.length; e++) d[b[e]] = b[e]; else d = b;
        for (var e = 0; e < a.length; e++) {
            var f = a[e];
            c[e] = {};
            for (var g in d) if (d.hasOwnProperty(g)) {
                var h = g, i = d[g];
                "function" == typeof i && i.apply ? c[e][h] = i.apply(window, [f[h], f, a, e, h]) : void 0 !== f[i] ? c[e][h] = f[i] : c[e][h] = ""
            }
        }
        return c
    }, filterImportData: function (a, b) {
        var c = this;
        return $.each(a, function (a, d) {
            $.each(d, function (a, e) {
                d[a] = c.filterExportData(e, b)
            })
        }), a
    }, importExcel: function (a, b, c) {
        var d = {header: "A", range: null, fields: null};
        $.extend(d, b);
        var e = this;
        if (a.length < 1) throw{code: 999, message: "传入文件为空"};
        var f = {}, g = {};
        $.each(a, function (b, h) {
            var i = new FileReader;
            if (!i) throw{code: 999, message: "不支持FileReader，请更换更新的浏览器"};
            i.onload = function (h) {
                var i = XLSX.read(h.target.result, {type: "binary"}), j = {};
                $.each(i.Sheets, function (a, b) {
                    if (i.Sheets.hasOwnProperty(a)) {
                        var c = {header: d.header, defval: ""};
                        d.range && (c.range = d.range), j[a] = XLSX.utils.sheet_to_json(b, c), d.fields && (j[a] = e.filterExportData(j[a], d.fields))
                    }
                }), f[b] = j, g[b] = i, b === a.length - 1 && c && c.apply && c.apply(window, [f, g])
            }, i.readAsBinaryString(h)
        })
    }, dateCodeToDate: function (a) {
        var b = XLSX.SSF.parse_date_code(a);
        return new Date(b.y + "-" + b.m + "-" + b.d + " " + b.H + ":" + b.M + ":" + b.S)
    }, strPad: function (a, b, c) {
        if (a += "", void 0 === b && (b = 2), void 0 === c && (c = "0"), c.length <= 0) return console.error("strPad error"), a;
        if (a.length < b) {
            var d = Math.floor((b - a.length) / c.length), e = "";
            return d * c.length < b - 1 && (e = c.substr(0, b - 1 - d * c.length)), c * d + e + a
        }
        return a
    }, dateFormat: function (a, b) {
        a instanceof Date || console.error(a + "需要是时间日期对象"), void 0 === b && (b = "YYYY-MM-DD HH:ii:ss");
        var c = a.getFullYear(), d = (c + "").substr(2, 2), e = a.getMonth(), f = this.strPad(e, 2, "0"),
            g = a.getDay(), h = this.strPad(g, 2, "0"), i = a.getHours(), j = this.strPad(i, 2, "0"),
            k = a.getMinutes(), l = this.strPad(k, 2, "0"), m = a.getSeconds(), n = this.strPad(m, 2, "0"),
            o = {YYYY: c, YY: d, MM: f, M: e, DD: h, D: g, HH: j, H: i, ii: l, i: k, ss: n, s: m};
        for (var p in o) if (o.hasOwnProperty(p)) {
            var q = RegExp(p, "g");
            b = b.replace(q, o[p])
        }
        return b
    }, dateCodeFormat: function (a, b) {
        return this.dateFormat(this.dateCodeToDate(a), b)
    }
}, "undefined" != typeof layui && layui.define(["jquery"], function (a) {
    $ = layui.jquery, a("excel", LAY_EXCEL)
}), function () {
    function a(a) {
        return a.map(function (a) {
            if (a.buffer instanceof ArrayBuffer) {
                var b = a.buffer;
                if (a.byteLength !== b.byteLength) {
                    var c = new Uint8Array(a.byteLength);
                    c.set(new Uint8Array(b, a.byteOffset, a.byteLength)), b = c.buffer
                }
                return b
            }
            return a
        })
    }

    function b(b, c) {
        c = c || {};
        var d = new g;
        return a(b).forEach(function (a) {
            d.append(a)
        }), c.type ? d.getBlob(c.type) : d.getBlob()
    }

    function c(b, c) {
        return new h(a(b), c || {})
    }

    function d() {
        function a(a) {
            for (var b = [], c = 0; c < a.length; c++) {
                var d = a.charCodeAt(c);
                d < 128 ? b.push(d) : d < 2048 ? b.push(192 | d >> 6, 128 | 63 & d) : d < 55296 || d >= 57344 ? b.push(224 | d >> 12, 128 | d >> 6 & 63, 128 | 63 & d) : (c++, d = 65536 + ((1023 & d) << 10 | 1023 & a.charCodeAt(c)), b.push(240 | d >> 18, 128 | d >> 12 & 63, 128 | d >> 6 & 63, 128 | 63 & d))
            }
            return b
        }

        function b(a) {
            var b, c, d, e, f, g;
            for (b = "", d = a.length, c = 0; c < d;) switch ((e = a[c++]) >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    b += String.fromCharCode(e);
                    break;
                case 12:
                case 13:
                    f = a[c++], b += String.fromCharCode((31 & e) << 6 | 63 & f);
                    break;
                case 14:
                    f = a[c++], g = a[c++], b += String.fromCharCode((15 & e) << 12 | (63 & f) << 6 | (63 & g) << 0)
            }
            return b
        }

        function c(a) {
            return a && DataView.prototype.isPrototypeOf(a)
        }

        function d(a) {
            for (var b = new Array(a.byteLength), c = new Uint8Array(a), d = b.length; d--;) b[d] = c[d];
            return b
        }

        function e(a) {
            for (var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", c = [], d = 0; d < a.length; d += 3) {
                var e = a[d], f = d + 1 < a.length, g = f ? a[d + 1] : 0, h = d + 2 < a.length, i = h ? a[d + 2] : 0,
                    j = e >> 2, k = (3 & e) << 4 | g >> 4, l = (15 & g) << 2 | i >> 6, m = 63 & i;
                h || (m = 64, f || (l = 64)), c.push(b[j], b[k], b[l], b[m])
            }
            return c.join("")
        }

        function g(b, e) {
            b = b || [];
            for (var f = 0, h = b.length; f < h; f++) {
                var i = b[f];
                i instanceof g ? b[f] = i._buffer : "string" == typeof i ? b[f] = a(i) : n && (ArrayBuffer.prototype.isPrototypeOf(i) || p(i)) ? b[f] = d(i) : n && c(i) ? b[f] = d(i.buffer) : b[f] = a(String(i))
            }
            this._buffer = [].concat.apply([], b), this.size = this._buffer.length, this.type = e ? e.type || "" : ""
        }

        function h(a, b, c) {
            c = c || {};
            var d = g.call(this, a, c) || this;
            return d.name = b, d.lastModifiedDate = c.lastModified ? new Date(c.lastModified) : new Date, d.lastModified = +d.lastModifiedDate, d
        }

        function k() {
            if (!(this instanceof k)) throw new TypeError("Failed to construct 'FileReader': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
            var a = document.createDocumentFragment();
            this.addEventListener = a.addEventListener, this.dispatchEvent = function (b) {
                var c = this["on" + b.type];
                "function" == typeof c && c(b), a.dispatchEvent(b)
            }, this.removeEventListener = a.removeEventListener
        }

        function l(a, b, c) {
            if (!(b instanceof g)) throw new TypeError("Failed to execute '" + c + "' on 'FileReader': parameter 1 is not of type 'Blob'.");
            a.result = "", setTimeout(function () {
                this.readyState = k.LOADING, a.dispatchEvent(new Event("load")), a.dispatchEvent(new Event("loadend"))
            })
        }

        var m = Object.create || function (a) {
            function b() {
            }

            return b.prototype = a, new b
        };
        if (n) var o = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
            p = ArrayBuffer.isView || function (a) {
                return a && o.indexOf(Object.prototype.toString.call(a)) > -1
            };
        if (g.prototype.slice = function (a, b, c) {
            return new g([this._buffer.slice(a || 0, b || this._buffer.length)], {type: c})
        }, g.prototype.toString = function () {
            return "[object Blob]"
        }, h.prototype = m(g.prototype), h.prototype.constructor = h, Object.setPrototypeOf) Object.setPrototypeOf(h, g); else try {
            h.__proto__ = g
        } catch (a) {
        }
        h.prototype.toString = function () {
            return "[object File]"
        }, k.EMPTY = 0, k.LOADING = 1, k.DONE = 2, k.prototype.error = null, k.prototype.onabort = null, k.prototype.onerror = null, k.prototype.onload = null, k.prototype.onloadend = null, k.prototype.onloadstart = null, k.prototype.onprogress = null, k.prototype.readAsDataURL = function (a) {
            l(this, a, "readAsDataURL"), this.result = "data:" + a.type + ";base64," + e(a._buffer)
        }, k.prototype.readAsText = function (a) {
            l(this, a, "readAsText"), this.result = b(a._buffer)
        }, k.prototype.readAsArrayBuffer = function (a) {
            l(this, a, "readAsText"), this.result = a._buffer.slice()
        }, k.prototype.abort = function () {
        }, URL.createObjectURL = function (a) {
            return a instanceof g ? "data:" + a.type + ";base64," + e(a._buffer) : i.call(URL, a)
        }, URL.revokeObjectURL = function (a) {
            j && j.call(URL, a)
        };
        var q = f.XMLHttpRequest && f.XMLHttpRequest.prototype.send;
        q && (XMLHttpRequest.prototype.send = function (a) {
            a instanceof g ? (this.setRequestHeader("Content-Type", a.type), q.call(this, b(a._buffer))) : q.call(this, a)
        }), f.FileReader = k, f.File = h, f.Blob = g
    }

    function e() {
        var a = !!f.ActiveXObject || "-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style,
            b = f.XMLHttpRequest && f.XMLHttpRequest.prototype.send;
        a && b && (XMLHttpRequest.prototype.send = function (a) {
            a instanceof Blob ? (this.setRequestHeader("Content-Type", a.type), b.call(this, a)) : b.call(this, a)
        });
        try {
            new File([], "")
        } catch (a) {
            try {
                var c = new Function('class File extends Blob {constructor(chunks, name, opts) {opts = opts || {};super(chunks, opts || {});this.name = name;this.lastModifiedDate = opts.lastModified ? new Date(opts.lastModified) : new Date;this.lastModified = +this.lastModifiedDate;}};return new File([], ""), File')();
                f.File = c
            } catch (a) {
                var c = function (a, b, c) {
                    var d = new Blob(a, c), e = c && void 0 !== c.lastModified ? new Date(c.lastModified) : new Date;
                    return d.name = b, d.lastModifiedDate = e, d.lastModified = +e, d.toString = function () {
                        return "[object File]"
                    }, k && (d[k] = "File"), d
                };
                f.File = c
            }
        }
    }

    var f = "object" == typeof window ? window : "object" == typeof self ? self : this,
        g = f.BlobBuilder || f.WebKitBlobBuilder || f.MSBlobBuilder || f.MozBlobBuilder;
    f.URL = f.URL || f.webkitURL || function (a, b) {
        return b = document.createElement("a"), b.href = a, b
    };
    var h = f.Blob, i = URL.createObjectURL, j = URL.revokeObjectURL, k = f.Symbol && f.Symbol.toStringTag, l = !1,
        m = !1, n = !!f.ArrayBuffer, o = g && g.prototype.append && g.prototype.getBlob;
    try {
        l = 2 === new Blob(["ä"]).size, m = 2 === new Blob([new Uint8Array([1, 2])]).size
    } catch (a) {
    }
    f.Blob && (b.prototype = Blob.prototype, c.prototype = Blob.prototype), k && (File.prototype[k] = "File", Blob.prototype[k] = "Blob", FileReader.prototype[k] = "FileReader"), l ? (e(), f.Blob = m ? f.Blob : c) : o ? (e(), f.Blob = b) : d()
}(), function (a, b) {
    "function" == typeof define && define.amd ? define([], b) : "undefined" != typeof exports ? b() : (b(), a.FileSaver = {exports: {}}.exports)
}(this, function () {
    "use strict";

    function a(a, b) {
        return void 0 === b ? b = {autoBom: !1} : "object" != typeof b && (console.warn("Depricated: Expected third argument to be a object"), b = {autoBom: !b}), b.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type) ? new Blob(["\ufeff", a], {type: a.type}) : a
    }

    function b(a, b, c) {
        var d = new XMLHttpRequest;
        d.open("GET", a), d.responseType = "blob", d.onload = function () {
            f(d.response, b, c)
        }, d.onerror = function () {
            console.error("could not download file")
        }, d.send()
    }

    function c(a) {
        var b = new XMLHttpRequest;
        return b.open("HEAD", a, !1), b.send(), 200 <= b.status && 299 >= b.status
    }

    function d(a) {
        try {
            a.dispatchEvent(new MouseEvent("click"))
        } catch (c) {
            var b = document.createEvent("MouseEvents");
            b.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), a.dispatchEvent(b)
        }
    }

    var e = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof global && global.global === global ? global : void 0,
        f = e.saveAs || "object" != typeof window || window !== e ? function () {
        } : "download" in HTMLAnchorElement.prototype ? function (a, f, g) {
            var h = e.URL || e.webkitURL, i = document.createElement("a");
            f = f || a.name || "download", i.download = f, i.rel = "noopener", "string" == typeof a ? (i.href = a, i.origin === location.origin ? d(i) : c(i.href) ? b(a, f, g) : d(i, i.target = "_blank")) : (i.href = h.createObjectURL(a), setTimeout(function () {
                h.revokeObjectURL(i.href)
            }, 4e4), setTimeout(function () {
                d(i)
            }, 0))
        } : "msSaveOrOpenBlob" in navigator ? function (e, f, g) {
            if (f = f || e.name || "download", "string" != typeof e) navigator.msSaveOrOpenBlob(a(e, g), f); else if (c(e)) b(e, f, g); else {
                var h = document.createElement("a");
                h.href = e, h.target = "_blank", setTimeout(function () {
                    d(h)
                })
            }
        } : function (a, c, d, f) {
            if (f = f || open("", "_blank"), f && (f.document.title = f.document.body.innerText = "downloading..."), "string" == typeof a) return b(a, c, d);
            var g = "application/octet-stream" === a.type, h = /constructor/i.test(e.HTMLElement) || e.safari,
                i = /CriOS\/[\d]+/.test(navigator.userAgent);
            if ((i || g && h) && "object" == typeof FileReader) {
                var j = new FileReader;
                j.onloadend = function () {
                    var a = j.result;
                    a = i ? a : a.replace(/^data:[^;]*;/, "data:attachment/file;"), f ? f.location.href = a : location = a, f = null
                }, j.readAsDataURL(a)
            } else {
                var k = e.URL || e.webkitURL, l = k.createObjectURL(a);
                f ? f.location = l : location.href = l, f = null, setTimeout(function () {
                    k.revokeObjectURL(l)
                }, 4e4)
            }
        };
    e.saveAs = f.saveAs = f, "undefined" != typeof module && (module.exports = f)
}), function (a) {
    if ("object" == typeof exports && "undefined" != typeof module && "undefined" == typeof DO_NOT_EXPORT_JSZIP) module.exports = a(); else if ("function" == typeof define && define.amd && "undefined" == typeof DO_NOT_EXPORT_JSZIP) JSZipSync = a(), define([], a); else {
        var b;
        "undefined" != typeof window ? b = window : "undefined" != typeof global ? b = global : "undefined" != typeof $ && $.global ? b = $.global : "undefined" != typeof self && (b = self), b.JSZipSync = a()
    }
}(function () {
    return function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    throw new Error("Cannot find module '" + g + "'")
                }
                var j = c[g] = {exports: {}};
                b[g][0].call(j.exports, function (a) {
                    var c = b[g][1][a];
                    return e(c || a)
                }, j, j.exports, a, b, c, d)
            }
            return c[g].exports
        }

        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
        return e
    }({
        1: [function (a, b, c) {
            "use strict";
            var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            c.encode = function (a, b) {
                for (var c, e, f, g, h, i, j, k = "", l = 0; l < a.length;) c = a.charCodeAt(l++), e = a.charCodeAt(l++), f = a.charCodeAt(l++), g = c >> 2, h = (3 & c) << 4 | e >> 4, i = (15 & e) << 2 | f >> 6, j = 63 & f, isNaN(e) ? i = j = 64 : isNaN(f) && (j = 64), k = k + d.charAt(g) + d.charAt(h) + d.charAt(i) + d.charAt(j);
                return k
            }, c.decode = function (a, b) {
                var c, e, f, g, h, i, j, k = "", l = 0;
                for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); l < a.length;) g = d.indexOf(a.charAt(l++)), h = d.indexOf(a.charAt(l++)), i = d.indexOf(a.charAt(l++)), j = d.indexOf(a.charAt(l++)), c = g << 2 | h >> 4, e = (15 & h) << 4 | i >> 2, f = (3 & i) << 6 | j, k += String.fromCharCode(c), 64 != i && (k += String.fromCharCode(e)), 64 != j && (k += String.fromCharCode(f));
                return k
            }
        }, {}],
        2: [function (a, b, c) {
            "use strict";

            function d() {
                this.compressedSize = 0, this.uncompressedSize = 0, this.crc32 = 0, this.compressionMethod = null, this.compressedContent = null
            }

            d.prototype = {
                getContent: function () {
                    return null
                }, getCompressedContent: function () {
                    return null
                }
            }, b.exports = d
        }, {}],
        3: [function (a, b, c) {
            "use strict";
            c.STORE = {
                magic: "\0\0", compress: function (a) {
                    return a
                }, uncompress: function (a) {
                    return a
                }, compressInputType: null, uncompressInputType: null
            }, c.DEFLATE = a("./flate")
        }, {"./flate": 8}],
        4: [function (a, b, c) {
            "use strict";
            var d = a("./utils"),
                e = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];
            b.exports = function (a, b) {
                if (void 0 === a || !a.length) return 0;
                var c = "string" !== d.getTypeOf(a);
                void 0 === b && (b = 0);
                var f = 0, g = 0, h = 0;
                b ^= -1;
                for (var i = 0, j = a.length; i < j; i++) h = c ? a[i] : a.charCodeAt(i), g = 255 & (b ^ h), f = e[g], b = b >>> 8 ^ f;
                return -1 ^ b
            }
        }, {"./utils": 21}],
        5: [function (a, b, c) {
            "use strict";

            function d(a) {
                this.data = null, this.length = 0, this.index = 0
            }

            var e = a("./utils");
            d.prototype = {
                checkOffset: function (a) {
                    this.checkIndex(this.index + a)
                }, checkIndex: function (a) {
                    if (this.length < a || a < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + a + "). Corrupted zip ?")
                }, setIndex: function (a) {
                    this.checkIndex(a), this.index = a
                }, skip: function (a) {
                    this.setIndex(this.index + a)
                }, byteAt: function (a) {
                }, readInt: function (a) {
                    var b, c = 0;
                    for (this.checkOffset(a), b = this.index + a - 1; b >= this.index; b--) c = (c << 8) + this.byteAt(b);
                    return this.index += a, c
                }, readString: function (a) {
                    return e.transformTo("string", this.readData(a))
                }, readData: function (a) {
                }, lastIndexOfSignature: function (a) {
                }, readDate: function () {
                    var a = this.readInt(4);
                    return new Date(1980 + (a >> 25 & 127), (a >> 21 & 15) - 1, a >> 16 & 31, a >> 11 & 31, a >> 5 & 63, (31 & a) << 1)
                }
            }, b.exports = d
        }, {"./utils": 21}],
        6: [function (a, b, c) {
            "use strict";
            c.base64 = !1, c.binary = !1, c.dir = !1, c.createFolders = !1, c.date = null, c.compression = null, c.comment = null
        }, {}],
        7: [function (a, b, c) {
            "use strict";
            var d = a("./utils");
            c.string2binary = function (a) {
                return d.string2binary(a)
            }, c.string2Uint8Array = function (a) {
                return d.transformTo("uint8array", a)
            }, c.uint8Array2String = function (a) {
                return d.transformTo("string", a)
            }, c.string2Blob = function (a) {
                var b = d.transformTo("arraybuffer", a);
                return d.arrayBuffer2Blob(b)
            }, c.arrayBuffer2Blob = function (a) {
                return d.arrayBuffer2Blob(a)
            }, c.transformTo = function (a, b) {
                return d.transformTo(a, b)
            }, c.getTypeOf = function (a) {
                return d.getTypeOf(a)
            }, c.checkSupport = function (a) {
                return d.checkSupport(a)
            }, c.MAX_VALUE_16BITS = d.MAX_VALUE_16BITS, c.MAX_VALUE_32BITS = d.MAX_VALUE_32BITS, c.pretty = function (a) {
                return d.pretty(a)
            }, c.findCompression = function (a) {
                return d.findCompression(a)
            }, c.isRegExp = function (a) {
                return d.isRegExp(a)
            }
        }, {"./utils": 21}],
        8: [function (a, b, c) {
            "use strict";
            var d = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array,
                e = a("pako");
            c.uncompressInputType = d ? "uint8array" : "array", c.compressInputType = d ? "uint8array" : "array", c.magic = "\b\0", c.compress = function (a) {
                return e.deflateRaw(a)
            }, c.uncompress = function (a) {
                return e.inflateRaw(a)
            }
        }, {pako: 24}],
        9: [function (a, b, c) {
            "use strict";

            function d(a, b) {
                if (!(this instanceof d)) return new d(a, b);
                this.files = {}, this.comment = null, this.root = "", a && this.load(a, b), this.clone = function () {
                    var a = new d;
                    for (var b in this) "function" != typeof this[b] && (a[b] = this[b]);
                    return a
                }
            }

            var e = a("./base64");
            d.prototype = a("./object"), d.prototype.load = a("./load"), d.support = a("./support"), d.defaults = a("./defaults"), d.utils = a("./deprecatedPublicUtils"), d.base64 = {
                encode: function (a) {
                    return e.encode(a)
                }, decode: function (a) {
                    return e.decode(a)
                }
            }, d.compressions = a("./compressions"), b.exports = d
        }, {
            "./base64": 1,
            "./compressions": 3,
            "./defaults": 6,
            "./deprecatedPublicUtils": 7,
            "./load": 10,
            "./object": 13,
            "./support": 17
        }],
        10: [function (a, b, c) {
            "use strict";
            var d = a("./base64"), e = a("./zipEntries");
            b.exports = function (a, b) {
                var c, f, g, h;
                for (b = b || {}, b.base64 && (a = d.decode(a)), f = new e(a, b), c = f.files, g = 0; g < c.length; g++) h = c[g], this.file(h.fileName, h.decompressed, {
                    binary: !0,
                    optimizedBinaryString: !0,
                    date: h.date,
                    dir: h.dir,
                    comment: h.fileComment.length ? h.fileComment : null,
                    createFolders: b.createFolders
                });
                return f.zipComment.length && (this.comment = f.zipComment), this
            }
        }, {"./base64": 1, "./zipEntries": 22}],
        11: [function (a, b, c) {
            (function (a) {
                "use strict";
                var c = function () {
                };
                if (void 0 !== a) {
                    var d = !a.from;
                    if (!d) try {
                        a.from("foo", "utf8")
                    } catch (a) {
                        d = !0
                    }
                    c = d ? function (b, c) {
                        return c ? new a(b, c) : new a(b)
                    } : a.from.bind(a), a.alloc || (a.alloc = function (b) {
                        return new a(b)
                    })
                }
                b.exports = function (b, d) {
                    return "number" == typeof b ? a.alloc(b) : c(b, d)
                }, b.exports.test = function (b) {
                    return a.isBuffer(b)
                }
            }).call(this, "undefined" != typeof Buffer ? Buffer : void 0)
        }, {}],
        12: [function (a, b, c) {
            "use strict";

            function d(a) {
                this.data = a, this.length = this.data.length, this.index = 0
            }

            var e = a("./uint8ArrayReader");
            d.prototype = new e, d.prototype.readData = function (a) {
                this.checkOffset(a);
                var b = this.data.slice(this.index, this.index + a);
                return this.index += a, b
            }, b.exports = d
        }, {"./uint8ArrayReader": 18}],
        13: [function (a, b, c) {
            "use strict";
            var d = a("./support"), e = a("./utils"), f = a("./crc32"), g = a("./signature"), h = a("./defaults"),
                i = a("./base64"), j = a("./compressions"), k = a("./compressedObject"), l = a("./nodeBuffer"),
                m = a("./utf8"), n = a("./stringWriter"), o = a("./uint8ArrayWriter"), p = function (a) {
                    if (a._data instanceof k && (a._data = a._data.getContent(), a.options.binary = !0, a.options.base64 = !1, "uint8array" === e.getTypeOf(a._data))) {
                        var b = a._data;
                        a._data = new Uint8Array(b.length), 0 !== b.length && a._data.set(b, 0)
                    }
                    return a._data
                }, q = function (a) {
                    var b = p(a);
                    return "string" === e.getTypeOf(b) ? !a.options.binary && d.nodebuffer ? l(b, "utf-8") : a.asBinary() : b
                }, r = function (a) {
                    var b = p(this);
                    return null === b || void 0 === b ? "" : (this.options.base64 && (b = i.decode(b)), b = a && this.options.binary ? B.utf8decode(b) : e.transformTo("string", b), a || this.options.binary || (b = e.transformTo("string", B.utf8encode(b))), b)
                }, s = function (a, b, c) {
                    this.name = a, this.dir = c.dir, this.date = c.date, this.comment = c.comment, this._data = b, this.options = c, this._initialMetadata = {
                        dir: c.dir,
                        date: c.date
                    }
                };
            s.prototype = {
                asText: function () {
                    return r.call(this, !0)
                }, asBinary: function () {
                    return r.call(this, !1)
                }, asNodeBuffer: function () {
                    var a = q(this);
                    return e.transformTo("nodebuffer", a)
                }, asUint8Array: function () {
                    var a = q(this);
                    return e.transformTo("uint8array", a)
                }, asArrayBuffer: function () {
                    return this.asUint8Array().buffer
                }
            };
            var t = function (a, b) {
                var c, d = "";
                for (c = 0; c < b; c++) d += String.fromCharCode(255 & a), a >>>= 8;
                return d
            }, u = function () {
                var a, b, c = {};
                for (a = 0; a < arguments.length; a++) for (b in arguments[a]) arguments[a].hasOwnProperty(b) && void 0 === c[b] && (c[b] = arguments[a][b]);
                return c
            }, v = function (a) {
                return a = a || {}, !0 !== a.base64 || null !== a.binary && void 0 !== a.binary || (a.binary = !0), a = u(a, h), a.date = a.date || new Date, null !== a.compression && (a.compression = a.compression.toUpperCase()), a
            }, w = function (a, b, c) {
                var d, f = e.getTypeOf(b);
                if (c = v(c), c.createFolders && (d = x(a)) && y.call(this, d, !0), c.dir || null === b || void 0 === b) c.base64 = !1, c.binary = !1, b = null; else if ("string" === f) c.binary && !c.base64 && !0 !== c.optimizedBinaryString && (b = e.string2binary(b)); else {
                    if (c.base64 = !1, c.binary = !0, !(f || b instanceof k)) throw new Error("The data of '" + a + "' is in an unsupported format !");
                    "arraybuffer" === f && (b = e.transformTo("uint8array", b))
                }
                var g = new s(a, b, c);
                return this.files[a] = g, g
            }, x = function (a) {
                "/" == a.slice(-1) && (a = a.substring(0, a.length - 1));
                var b = a.lastIndexOf("/");
                return b > 0 ? a.substring(0, b) : ""
            }, y = function (a, b) {
                return "/" != a.slice(-1) && (a += "/"), b = void 0 !== b && b, this.files[a] || w.call(this, a, null, {
                    dir: !0,
                    createFolders: b
                }), this.files[a]
            }, z = function (a, b) {
                var c, d = new k;
                return a._data instanceof k ? (d.uncompressedSize = a._data.uncompressedSize, d.crc32 = a._data.crc32, 0 === d.uncompressedSize || a.dir ? (b = j.STORE, d.compressedContent = "", d.crc32 = 0) : a._data.compressionMethod === b.magic ? d.compressedContent = a._data.getCompressedContent() : (c = a._data.getContent(), d.compressedContent = b.compress(e.transformTo(b.compressInputType, c)))) : (c = q(a), c && 0 !== c.length && !a.dir || (b = j.STORE, c = ""), d.uncompressedSize = c.length, d.crc32 = f(c), d.compressedContent = b.compress(e.transformTo(b.compressInputType, c))), d.compressedSize = d.compressedContent.length, d.compressionMethod = b.magic, d
            }, A = function (a, b, c, d) {
                var h, i, j, k, l = (c.compressedContent, e.transformTo("string", m.utf8encode(b.name))),
                    n = b.comment || "", o = e.transformTo("string", m.utf8encode(n)), p = l.length !== b.name.length,
                    q = o.length !== n.length, r = b.options, s = "", u = "", v = "";
                j = b._initialMetadata.dir !== b.dir ? b.dir : r.dir, k = b._initialMetadata.date !== b.date ? b.date : r.date, h = k.getHours(), h <<= 6, h |= k.getMinutes(), h <<= 5, h |= k.getSeconds() / 2, i = k.getFullYear() - 1980, i <<= 4, i |= k.getMonth() + 1, i <<= 5, i |= k.getDate(), p && (u = t(1, 1) + t(f(l), 4) + l, s += "up" + t(u.length, 2) + u), q && (v = t(1, 1) + t(this.crc32(o), 4) + o, s += "uc" + t(v.length, 2) + v);
                var w = "";
                return w += "\n\0", w += p || q ? "\0\b" : "\0\0", w += c.compressionMethod, w += t(h, 2), w += t(i, 2), w += t(c.crc32, 4), w += t(c.compressedSize, 4), w += t(c.uncompressedSize, 4), w += t(l.length, 2), w += t(s.length, 2), {
                    fileRecord: g.LOCAL_FILE_HEADER + w + l + s,
                    dirRecord: g.CENTRAL_FILE_HEADER + "\0" + w + t(o.length, 2) + "\0\0\0\0" + (!0 === j ? "\0\0\0" : "\0\0\0\0") + t(d, 4) + l + s + o,
                    compressedObject: c
                }
            }, B = {
                load: function (a, b) {
                    throw new Error("Load method is not defined. Is the file jszip-load.js included ?")
                }, filter: function (a) {
                    var b, c, d, e, f = [];
                    for (b in this.files) this.files.hasOwnProperty(b) && (d = this.files[b], e = new s(d.name, d._data, u(d.options)), c = b.slice(this.root.length, b.length), b.slice(0, this.root.length) === this.root && a(c, e) && f.push(e));
                    return f
                }, file: function (a, b, c) {
                    if (1 === arguments.length) {
                        if (e.isRegExp(a)) {
                            var d = a;
                            return this.filter(function (a, b) {
                                return !b.dir && d.test(a)
                            })
                        }
                        return this.filter(function (b, c) {
                            return !c.dir && b === a
                        })[0] || null
                    }
                    return a = this.root + a, w.call(this, a, b, c), this
                }, folder: function (a) {
                    if (!a) return this;
                    if (e.isRegExp(a)) return this.filter(function (b, c) {
                        return c.dir && a.test(b)
                    });
                    var b = this.root + a, c = y.call(this, b), d = this.clone();
                    return d.root = c.name, d
                }, remove: function (a) {
                    a = this.root + a;
                    var b = this.files[a];
                    if (b || ("/" != a.slice(-1) && (a += "/"), b = this.files[a]), b && !b.dir) delete this.files[a]; else for (var c = this.filter(function (b, c) {
                        return c.name.slice(0, a.length) === a
                    }), d = 0; d < c.length; d++) delete this.files[c[d].name];
                    return this
                }, generate: function (a) {
                    a = u(a || {}, {
                        base64: !0,
                        compression: "STORE",
                        type: "base64",
                        comment: null
                    }), e.checkSupport(a.type);
                    var b, c, d = [], f = 0, h = 0,
                        k = e.transformTo("string", this.utf8encode(a.comment || this.comment || ""));
                    for (var l in this.files) if (this.files.hasOwnProperty(l)) {
                        var m = this.files[l], p = m.options.compression || a.compression.toUpperCase(), q = j[p];
                        if (!q) throw new Error(p + " is not a valid compression method !");
                        var r = z.call(this, m, q), s = A.call(this, l, m, r, f);
                        f += s.fileRecord.length + r.compressedSize, h += s.dirRecord.length, d.push(s)
                    }
                    var v = "";
                    v = g.CENTRAL_DIRECTORY_END + "\0\0\0\0" + t(d.length, 2) + t(d.length, 2) + t(h, 4) + t(f, 4) + t(k.length, 2) + k;
                    var w = a.type.toLowerCase();
                    for (b = "uint8array" === w || "arraybuffer" === w || "blob" === w || "nodebuffer" === w ? new o(f + h + v.length) : new n(f + h + v.length), c = 0; c < d.length; c++) b.append(d[c].fileRecord), b.append(d[c].compressedObject.compressedContent);
                    for (c = 0; c < d.length; c++) b.append(d[c].dirRecord);
                    b.append(v);
                    var x = b.finalize();
                    switch (a.type.toLowerCase()) {
                        case"uint8array":
                        case"arraybuffer":
                        case"nodebuffer":
                            return e.transformTo(a.type.toLowerCase(), x);
                        case"blob":
                            return e.arrayBuffer2Blob(e.transformTo("arraybuffer", x));
                        case"base64":
                            return a.base64 ? i.encode(x) : x;
                        default:
                            return x
                    }
                }, crc32: function (a, b) {
                    return f(a, b)
                }, utf8encode: function (a) {
                    return e.transformTo("string", m.utf8encode(a))
                }, utf8decode: function (a) {
                    return m.utf8decode(a)
                }
            };
            b.exports = B
        }, {
            "./base64": 1,
            "./compressedObject": 2,
            "./compressions": 3,
            "./crc32": 4,
            "./defaults": 6,
            "./nodeBuffer": 11,
            "./signature": 14,
            "./stringWriter": 16,
            "./support": 17,
            "./uint8ArrayWriter": 19,
            "./utf8": 20,
            "./utils": 21
        }],
        14: [function (a, b, c) {
            "use strict";
            c.LOCAL_FILE_HEADER = "PK", c.CENTRAL_FILE_HEADER = "PK", c.CENTRAL_DIRECTORY_END = "PK", c.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK", c.ZIP64_CENTRAL_DIRECTORY_END = "PK", c.DATA_DESCRIPTOR = "PK\b"
        }, {}],
        15: [function (a, b, c) {
            "use strict";

            function d(a, b) {
                this.data = a, b || (this.data = f.string2binary(this.data)), this.length = this.data.length, this.index = 0
            }

            var e = a("./dataReader"), f = a("./utils");
            d.prototype = new e, d.prototype.byteAt = function (a) {
                return this.data.charCodeAt(a)
            }, d.prototype.lastIndexOfSignature = function (a) {
                return this.data.lastIndexOf(a)
            }, d.prototype.readData = function (a) {
                this.checkOffset(a);
                var b = this.data.slice(this.index, this.index + a);
                return this.index += a, b
            }, b.exports = d
        }, {"./dataReader": 5, "./utils": 21}],
        16: [function (a, b, c) {
            "use strict";
            var d = a("./utils"), e = function () {
                this.data = []
            };
            e.prototype = {
                append: function (a) {
                    a = d.transformTo("string", a), this.data.push(a)
                }, finalize: function () {
                    return this.data.join("")
                }
            }, b.exports = e
        }, {"./utils": 21}],
        17: [function (a, b, c) {
            (function (a) {
                "use strict";
                if (c.base64 = !0, c.array = !0, c.string = !0, c.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, c.nodebuffer = void 0 !== a, c.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) c.blob = !1; else {
                    var b = new ArrayBuffer(0);
                    try {
                        c.blob = 0 === new Blob([b], {type: "application/zip"}).size
                    } catch (a) {
                        try {
                            var d = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
                                e = new d;
                            e.append(b), c.blob = 0 === e.getBlob("application/zip").size
                        } catch (a) {
                            c.blob = !1
                        }
                    }
                }
            }).call(this, "undefined" != typeof Buffer ? Buffer : void 0)
        }, {}],
        18: [function (a, b, c) {
            "use strict";

            function d(a) {
                a && (this.data = a, this.length = this.data.length, this.index = 0)
            }

            var e = a("./dataReader");
            d.prototype = new e, d.prototype.byteAt = function (a) {
                return this.data[a]
            }, d.prototype.lastIndexOfSignature = function (a) {
                for (var b = a.charCodeAt(0), c = a.charCodeAt(1), d = a.charCodeAt(2), e = a.charCodeAt(3), f = this.length - 4; f >= 0; --f) if (this.data[f] === b && this.data[f + 1] === c && this.data[f + 2] === d && this.data[f + 3] === e) return f;
                return -1
            }, d.prototype.readData = function (a) {
                if (this.checkOffset(a), 0 === a) return new Uint8Array(0);
                var b = this.data.subarray(this.index, this.index + a);
                return this.index += a, b
            }, b.exports = d
        }, {"./dataReader": 5}],
        19: [function (a, b, c) {
            "use strict";
            var d = a("./utils"), e = function (a) {
                this.data = new Uint8Array(a), this.index = 0
            };
            e.prototype = {
                append: function (a) {
                    0 !== a.length && (a = d.transformTo("uint8array", a), this.data.set(a, this.index), this.index += a.length)
                }, finalize: function () {
                    return this.data
                }
            }, b.exports = e
        }, {"./utils": 21}],
        20: [function (a, b, c) {
            "use strict";
            for (var d = a("./utils"), e = a("./support"), f = a("./nodeBuffer"), g = new Array(256), h = 0; h < 256; h++) g[h] = h >= 252 ? 6 : h >= 248 ? 5 : h >= 240 ? 4 : h >= 224 ? 3 : h >= 192 ? 2 : 1;
            g[254] = g[254] = 1;
            var i = function (a) {
                var b, c, d, f, g, h = a.length, i = 0;
                for (f = 0; f < h; f++) c = a.charCodeAt(f), 55296 == (64512 & c) && f + 1 < h && 56320 == (64512 & (d = a.charCodeAt(f + 1))) && (c = 65536 + (c - 55296 << 10) + (d - 56320), f++), i += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
                for (b = e.uint8array ? new Uint8Array(i) : new Array(i), g = 0, f = 0; g < i; f++) c = a.charCodeAt(f), 55296 == (64512 & c) && f + 1 < h && 56320 == (64512 & (d = a.charCodeAt(f + 1))) && (c = 65536 + (c - 55296 << 10) + (d - 56320), f++), c < 128 ? b[g++] = c : c < 2048 ? (b[g++] = 192 | c >>> 6, b[g++] = 128 | 63 & c) : c < 65536 ? (b[g++] = 224 | c >>> 12, b[g++] = 128 | c >>> 6 & 63, b[g++] = 128 | 63 & c) : (b[g++] = 240 | c >>> 18, b[g++] = 128 | c >>> 12 & 63, b[g++] = 128 | c >>> 6 & 63, b[g++] = 128 | 63 & c);
                return b
            }, j = function (a, b) {
                var c;
                for (b = b || a.length, b > a.length && (b = a.length), c = b - 1; c >= 0 && 128 == (192 & a[c]);) c--;
                return c < 0 ? b : 0 === c ? b : c + g[a[c]] > b ? c : b
            }, k = function (a) {
                var b, c, e, f, h = a.length, i = new Array(2 * h);
                for (c = 0, b = 0; b < h;) if ((e = a[b++]) < 128) i[c++] = e; else if ((f = g[e]) > 4) i[c++] = 65533, b += f - 1; else {
                    for (e &= 2 === f ? 31 : 3 === f ? 15 : 7; f > 1 && b < h;) e = e << 6 | 63 & a[b++], f--;
                    f > 1 ? i[c++] = 65533 : e < 65536 ? i[c++] = e : (e -= 65536, i[c++] = 55296 | e >> 10 & 1023, i[c++] = 56320 | 1023 & e)
                }
                return i.length !== c && (i.subarray ? i = i.subarray(0, c) : i.length = c), d.applyFromCharCode(i)
            };
            c.utf8encode = function (a) {
                return e.nodebuffer ? f(a, "utf-8") : i(a)
            }, c.utf8decode = function (a) {
                if (e.nodebuffer) return d.transformTo("nodebuffer", a).toString("utf-8");
                a = d.transformTo(e.uint8array ? "uint8array" : "array", a);
                for (var b = [], c = 0, f = a.length, g = 65536; c < f;) {
                    var h = j(a, Math.min(c + g, f));
                    e.uint8array ? b.push(k(a.subarray(c, h))) : b.push(k(a.slice(c, h))), c = h
                }
                return b.join("")
            }
        }, {"./nodeBuffer": 11, "./support": 17, "./utils": 21}],
        21: [function (a, b, c) {
            "use strict";

            function d(a) {
                return a
            }

            function e(a, b) {
                for (var c = 0; c < a.length; ++c) b[c] = 255 & a.charCodeAt(c);
                return b
            }

            function f(a) {
                var b = 65536, d = [], e = a.length, f = c.getTypeOf(a), g = 0, h = !0;
                try {
                    switch (f) {
                        case"uint8array":
                            String.fromCharCode.apply(null, new Uint8Array(0));
                            break;
                        case"nodebuffer":
                            String.fromCharCode.apply(null, j(0))
                    }
                } catch (a) {
                    h = !1
                }
                if (!h) {
                    for (var i = "", k = 0; k < a.length; k++) i += String.fromCharCode(a[k]);
                    return i
                }
                for (; g < e && b > 1;) try {
                    "array" === f || "nodebuffer" === f ? d.push(String.fromCharCode.apply(null, a.slice(g, Math.min(g + b, e)))) : d.push(String.fromCharCode.apply(null, a.subarray(g, Math.min(g + b, e)))), g += b
                } catch (a) {
                    b = Math.floor(b / 2)
                }
                return d.join("")
            }

            function g(a, b) {
                for (var c = 0; c < a.length; c++) b[c] = a[c];
                return b
            }

            var h = a("./support"), i = a("./compressions"), j = a("./nodeBuffer");
            c.string2binary = function (a) {
                for (var b = "", c = 0; c < a.length; c++) b += String.fromCharCode(255 & a.charCodeAt(c));
                return b
            }, c.arrayBuffer2Blob = function (a) {
                c.checkSupport("blob");
                try {
                    return new Blob([a], {type: "application/zip"})
                } catch (c) {
                    try {
                        var b = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
                            d = new b;
                        return d.append(a), d.getBlob("application/zip")
                    } catch (a) {
                        throw new Error("Bug : can't construct the Blob.")
                    }
                }
            }, c.applyFromCharCode = f;
            var k = {};
            k.string = {
                string: d, array: function (a) {
                    return e(a, new Array(a.length))
                }, arraybuffer: function (a) {
                    return k.string.uint8array(a).buffer
                }, uint8array: function (a) {
                    return e(a, new Uint8Array(a.length))
                }, nodebuffer: function (a) {
                    return e(a, j(a.length))
                }
            }, k.array = {
                string: f, array: d, arraybuffer: function (a) {
                    return new Uint8Array(a).buffer
                }, uint8array: function (a) {
                    return new Uint8Array(a)
                }, nodebuffer: function (a) {
                    return j(a)
                }
            }, k.arraybuffer = {
                string: function (a) {
                    return f(new Uint8Array(a))
                }, array: function (a) {
                    return g(new Uint8Array(a), new Array(a.byteLength))
                }, arraybuffer: d, uint8array: function (a) {
                    return new Uint8Array(a)
                }, nodebuffer: function (a) {
                    return j(new Uint8Array(a))
                }
            }, k.uint8array = {
                string: f, array: function (a) {
                    return g(a, new Array(a.length))
                }, arraybuffer: function (a) {
                    return a.buffer
                }, uint8array: d, nodebuffer: function (a) {
                    return j(a)
                }
            }, k.nodebuffer = {
                string: f, array: function (a) {
                    return g(a, new Array(a.length))
                }, arraybuffer: function (a) {
                    return k.nodebuffer.uint8array(a).buffer
                }, uint8array: function (a) {
                    return g(a, new Uint8Array(a.length))
                }, nodebuffer: d
            }, c.transformTo = function (a, b) {
                if (b || (b = ""), !a) return b;
                c.checkSupport(a);
                var d = c.getTypeOf(b);
                return k[d][a](b)
            }, c.getTypeOf = function (a) {
                return "string" == typeof a ? "string" : "[object Array]" === Object.prototype.toString.call(a) ? "array" : h.nodebuffer && j.test(a) ? "nodebuffer" : h.uint8array && a instanceof Uint8Array ? "uint8array" : h.arraybuffer && a instanceof ArrayBuffer ? "arraybuffer" : void 0
            }, c.checkSupport = function (a) {
                if (!h[a.toLowerCase()]) throw new Error(a + " is not supported by this browser")
            }, c.MAX_VALUE_16BITS = 65535, c.MAX_VALUE_32BITS = -1, c.pretty = function (a) {
                var b, c, d = "";
                for (c = 0; c < (a || "").length; c++) b = a.charCodeAt(c), d += "\\x" + (b < 16 ? "0" : "") + b.toString(16).toUpperCase();
                return d
            }, c.findCompression = function (a) {
                for (var b in i) if (i.hasOwnProperty(b) && i[b].magic === a) return i[b];
                return null
            }, c.isRegExp = function (a) {
                return "[object RegExp]" === Object.prototype.toString.call(a)
            }
        }, {"./compressions": 3, "./nodeBuffer": 11, "./support": 17}],
        22: [function (a, b, c) {
            "use strict";

            function d(a, b) {
                this.files = [], this.loadOptions = b, a && this.load(a)
            }

            var e = a("./stringReader"), f = a("./nodeBufferReader"), g = a("./uint8ArrayReader"), h = a("./utils"),
                i = a("./signature"), j = a("./zipEntry"), k = a("./support"), l = a("./object");
            d.prototype = {
                checkSignature: function (a) {
                    var b = this.reader.readString(4);
                    if (b !== a) throw new Error("Corrupted zip or bug : unexpected signature (" + h.pretty(b) + ", expected " + h.pretty(a) + ")")
                }, readBlockEndOfCentral: function () {
                    this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2), this.zipComment = this.reader.readString(this.zipCommentLength), this.zipComment = l.utf8decode(this.zipComment)
                }, readBlockZip64EndOfCentral: function () {
                    this.zip64EndOfCentralSize = this.reader.readInt(8), this.versionMadeBy = this.reader.readString(2), this.versionNeeded = this.reader.readInt(2), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
                    for (var a, b, c, d = this.zip64EndOfCentralSize - 44, e = 0; e < d;) a = this.reader.readInt(2), b = this.reader.readInt(4), c = this.reader.readString(b), this.zip64ExtensibleData[a] = {
                        id: a,
                        length: b,
                        value: c
                    }
                }, readBlockZip64EndOfCentralLocator: function () {
                    if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), this.disksCount > 1) throw new Error("Multi-volumes zip are not supported")
                }, readLocalFiles: function () {
                    var a, b;
                    for (a = 0; a < this.files.length; a++) b = this.files[a], this.reader.setIndex(b.localHeaderOffset), this.checkSignature(i.LOCAL_FILE_HEADER), b.readLocalPart(this.reader), b.handleUTF8()
                }, readCentralDir: function () {
                    var a;
                    for (this.reader.setIndex(this.centralDirOffset); this.reader.readString(4) === i.CENTRAL_FILE_HEADER;) a = new j({zip64: this.zip64}, this.loadOptions), a.readCentralPart(this.reader), this.files.push(a)
                }, readEndOfCentral: function () {
                    var a = this.reader.lastIndexOfSignature(i.CENTRAL_DIRECTORY_END);
                    if (-1 === a) throw new Error("Corrupted zip : can't find end of central directory");
                    if (this.reader.setIndex(a), this.checkSignature(i.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === h.MAX_VALUE_16BITS || this.diskWithCentralDirStart === h.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === h.MAX_VALUE_16BITS || this.centralDirRecords === h.MAX_VALUE_16BITS || this.centralDirSize === h.MAX_VALUE_32BITS || this.centralDirOffset === h.MAX_VALUE_32BITS) {
                        if (this.zip64 = !0, -1 === (a = this.reader.lastIndexOfSignature(i.ZIP64_CENTRAL_DIRECTORY_LOCATOR))) throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator");
                        this.reader.setIndex(a), this.checkSignature(i.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(i.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral()
                    }
                }, prepareReader: function (a) {
                    var b = h.getTypeOf(a);
                    "string" !== b || k.uint8array ? this.reader = "nodebuffer" === b ? new f(a) : new g(h.transformTo("uint8array", a)) : this.reader = new e(a, this.loadOptions.optimizedBinaryString)
                }, load: function (a) {
                    this.prepareReader(a), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles()
                }
            }, b.exports = d
        }, {
            "./nodeBufferReader": 12,
            "./object": 13,
            "./signature": 14,
            "./stringReader": 15,
            "./support": 17,
            "./uint8ArrayReader": 18,
            "./utils": 21,
            "./zipEntry": 23
        }],
        23: [function (a, b, c) {
            "use strict";

            function d(a, b) {
                this.options = a, this.loadOptions = b
            }

            var e = a("./stringReader"), f = a("./utils"), g = a("./compressedObject"), h = a("./object");
            d.prototype = {
                isEncrypted: function () {
                    return 1 == (1 & this.bitFlag)
                }, useUTF8: function () {
                    return 2048 == (2048 & this.bitFlag)
                }, prepareCompressedContent: function (a, b, c) {
                    return function () {
                        var d = a.index;
                        a.setIndex(b);
                        var e = a.readData(c);
                        return a.setIndex(d), e
                    }
                }, prepareContent: function (a, b, c, d, e) {
                    return function () {
                        var a = f.transformTo(d.uncompressInputType, this.getCompressedContent()), b = d.uncompress(a);
                        if (b.length !== e) throw new Error("Bug : uncompressed data size mismatch");
                        return b
                    }
                }, readLocalPart: function (a) {
                    var b, c;
                    if (a.skip(22), this.fileNameLength = a.readInt(2), c = a.readInt(2), this.fileName = a.readString(this.fileNameLength), a.skip(c), -1 == this.compressedSize || -1 == this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory (compressedSize == -1 || uncompressedSize == -1)");
                    if (null === (b = f.findCompression(this.compressionMethod))) throw new Error("Corrupted zip : compression " + f.pretty(this.compressionMethod) + " unknown (inner file : " + this.fileName + ")");
                    if (this.decompressed = new g, this.decompressed.compressedSize = this.compressedSize, this.decompressed.uncompressedSize = this.uncompressedSize, this.decompressed.crc32 = this.crc32, this.decompressed.compressionMethod = this.compressionMethod, this.decompressed.getCompressedContent = this.prepareCompressedContent(a, a.index, this.compressedSize, b), this.decompressed.getContent = this.prepareContent(a, a.index, this.compressedSize, b, this.uncompressedSize), this.loadOptions.checkCRC32 && (this.decompressed = f.transformTo("string", this.decompressed.getContent()), h.crc32(this.decompressed) !== this.crc32)) throw new Error("Corrupted zip : CRC32 mismatch")
                }, readCentralPart: function (a) {
                    if (this.versionMadeBy = a.readString(2), this.versionNeeded = a.readInt(2), this.bitFlag = a.readInt(2), this.compressionMethod = a.readString(2), this.date = a.readDate(), this.crc32 = a.readInt(4), this.compressedSize = a.readInt(4), this.uncompressedSize = a.readInt(4), this.fileNameLength = a.readInt(2), this.extraFieldsLength = a.readInt(2), this.fileCommentLength = a.readInt(2), this.diskNumberStart = a.readInt(2), this.internalFileAttributes = a.readInt(2), this.externalFileAttributes = a.readInt(4), this.localHeaderOffset = a.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
                    this.fileName = a.readString(this.fileNameLength), this.readExtraFields(a), this.parseZIP64ExtraField(a), this.fileComment = a.readString(this.fileCommentLength), this.dir = !!(16 & this.externalFileAttributes)
                }, parseZIP64ExtraField: function (a) {
                    if (this.extraFields[1]) {
                        var b = new e(this.extraFields[1].value);
                        this.uncompressedSize === f.MAX_VALUE_32BITS && (this.uncompressedSize = b.readInt(8)), this.compressedSize === f.MAX_VALUE_32BITS && (this.compressedSize = b.readInt(8)), this.localHeaderOffset === f.MAX_VALUE_32BITS && (this.localHeaderOffset = b.readInt(8)), this.diskNumberStart === f.MAX_VALUE_32BITS && (this.diskNumberStart = b.readInt(4))
                    }
                }, readExtraFields: function (a) {
                    var b, c, d, e = a.index;
                    for (this.extraFields = this.extraFields || {}; a.index < e + this.extraFieldsLength;) b = a.readInt(2), c = a.readInt(2), d = a.readString(c), this.extraFields[b] = {
                        id: b,
                        length: c,
                        value: d
                    }
                }, handleUTF8: function () {
                    if (this.useUTF8()) this.fileName = h.utf8decode(this.fileName), this.fileComment = h.utf8decode(this.fileComment); else {
                        var a = this.findExtraFieldUnicodePath();
                        null !== a && (this.fileName = a);
                        var b = this.findExtraFieldUnicodeComment();
                        null !== b && (this.fileComment = b)
                    }
                }, findExtraFieldUnicodePath: function () {
                    var a = this.extraFields[28789];
                    if (a) {
                        var b = new e(a.value);
                        return 1 !== b.readInt(1) ? null : h.crc32(this.fileName) !== b.readInt(4) ? null : h.utf8decode(b.readString(a.length - 5))
                    }
                    return null
                }, findExtraFieldUnicodeComment: function () {
                    var a = this.extraFields[25461];
                    if (a) {
                        var b = new e(a.value);
                        return 1 !== b.readInt(1) ? null : h.crc32(this.fileComment) !== b.readInt(4) ? null : h.utf8decode(b.readString(a.length - 5))
                    }
                    return null
                }
            }, b.exports = d
        }, {"./compressedObject": 2, "./object": 13, "./stringReader": 15, "./utils": 21}],
        24: [function (a, b, c) {
            "use strict";
            var d = a("./lib/utils/common").assign, e = a("./lib/deflate"), f = a("./lib/inflate"),
                g = a("./lib/zlib/constants"), h = {};
            d(h, e, f, g), b.exports = h
        }, {"./lib/deflate": 25, "./lib/inflate": 26, "./lib/utils/common": 27, "./lib/zlib/constants": 30}],
        25: [function (a, b, c) {
            "use strict";

            function d(a, b) {
                var c = new r(b);
                if (c.push(a, !0), c.err) throw c.msg;
                return c.result
            }

            function e(a, b) {
                return b = b || {}, b.raw = !0, d(a, b)
            }

            function f(a, b) {
                return b = b || {}, b.gzip = !0, d(a, b)
            }

            var g = a("./zlib/deflate.js"), h = a("./utils/common"), i = a("./utils/strings"), j = a("./zlib/messages"),
                k = a("./zlib/zstream"), l = 4, m = 0, n = 1, o = -1, p = 0, q = 8, r = function (a) {
                    this.options = h.assign({
                        level: o,
                        method: q,
                        chunkSize: 16384,
                        windowBits: 15,
                        memLevel: 8,
                        strategy: p,
                        to: ""
                    }, a || {});
                    var b = this.options;
                    b.raw && b.windowBits > 0 ? b.windowBits = -b.windowBits : b.gzip && b.windowBits > 0 && b.windowBits < 16 && (b.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new k, this.strm.avail_out = 0;
                    var c = g.deflateInit2(this.strm, b.level, b.method, b.windowBits, b.memLevel, b.strategy);
                    if (c !== m) throw new Error(j[c]);
                    b.header && g.deflateSetHeader(this.strm, b.header)
                };
            r.prototype.push = function (a, b) {
                var c, d, e = this.strm, f = this.options.chunkSize;
                if (this.ended) return !1;
                d = b === ~~b ? b : !0 === b ? l : 0, e.input = "string" == typeof a ? i.string2buf(a) : a, e.next_in = 0, e.avail_in = e.input.length;
                do {
                    if (0 === e.avail_out && (e.output = new h.Buf8(f), e.next_out = 0, e.avail_out = f), (c = g.deflate(e, d)) !== n && c !== m) return this.onEnd(c), this.ended = !0, !1;
                    (0 === e.avail_out || 0 === e.avail_in && d === l) && ("string" === this.options.to ? this.onData(i.buf2binstring(h.shrinkBuf(e.output, e.next_out))) : this.onData(h.shrinkBuf(e.output, e.next_out)))
                } while ((e.avail_in > 0 || 0 === e.avail_out) && c !== n);
                return d !== l || (c = g.deflateEnd(this.strm), this.onEnd(c), this.ended = !0, c === m)
            }, r.prototype.onData = function (a) {
                this.chunks.push(a)
            }, r.prototype.onEnd = function (a) {
                a === m && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = h.flattenChunks(this.chunks)), this.chunks = [], this.err = a, this.msg = this.strm.msg
            }, c.Deflate = r, c.deflate = d, c.deflateRaw = e, c.gzip = f
        }, {
            "./utils/common": 27,
            "./utils/strings": 28,
            "./zlib/deflate.js": 32,
            "./zlib/messages": 37,
            "./zlib/zstream": 39
        }],
        26: [function (a, b, c) {
            "use strict";

            function d(a, b) {
                var c = new m(b);
                if (c.push(a, !0), c.err) throw c.msg;
                return c.result
            }

            function e(a, b) {
                return b = b || {}, b.raw = !0, d(a, b)
            }

            var f = a("./zlib/inflate.js"), g = a("./utils/common"), h = a("./utils/strings"),
                i = a("./zlib/constants"), j = a("./zlib/messages"), k = a("./zlib/zstream"), l = a("./zlib/gzheader"),
                m = function (a) {
                    this.options = g.assign({chunkSize: 16384, windowBits: 0, to: ""}, a || {});
                    var b = this.options;
                    b.raw && b.windowBits >= 0 && b.windowBits < 16 && (b.windowBits = -b.windowBits, 0 === b.windowBits && (b.windowBits = -15)), !(b.windowBits >= 0 && b.windowBits < 16) || a && a.windowBits || (b.windowBits += 32), b.windowBits > 15 && b.windowBits < 48 && 0 == (15 & b.windowBits) && (b.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new k, this.strm.avail_out = 0;
                    var c = f.inflateInit2(this.strm, b.windowBits);
                    if (c !== i.Z_OK) throw new Error(j[c]);
                    this.header = new l, f.inflateGetHeader(this.strm, this.header)
                };
            m.prototype.push = function (a, b) {
                var c, d, e, j, k, l = this.strm, m = this.options.chunkSize;
                if (this.ended) return !1;
                d = b === ~~b ? b : !0 === b ? i.Z_FINISH : i.Z_NO_FLUSH, l.input = "string" == typeof a ? h.binstring2buf(a) : a, l.next_in = 0, l.avail_in = l.input.length;
                do {
                    if (0 === l.avail_out && (l.output = new g.Buf8(m), l.next_out = 0, l.avail_out = m), (c = f.inflate(l, i.Z_NO_FLUSH)) !== i.Z_STREAM_END && c !== i.Z_OK) return this.onEnd(c), this.ended = !0, !1;
                    l.next_out && (0 === l.avail_out || c === i.Z_STREAM_END || 0 === l.avail_in && d === i.Z_FINISH) && ("string" === this.options.to ? (e = h.utf8border(l.output, l.next_out), j = l.next_out - e, k = h.buf2string(l.output, e), l.next_out = j, l.avail_out = m - j, j && g.arraySet(l.output, l.output, e, j, 0), this.onData(k)) : this.onData(g.shrinkBuf(l.output, l.next_out)))
                } while (l.avail_in > 0 && c !== i.Z_STREAM_END);
                return c === i.Z_STREAM_END && (d = i.Z_FINISH), d !== i.Z_FINISH || (c = f.inflateEnd(this.strm), this.onEnd(c), this.ended = !0, c === i.Z_OK)
            }, m.prototype.onData = function (a) {
                this.chunks.push(a)
            }, m.prototype.onEnd = function (a) {
                a === i.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = g.flattenChunks(this.chunks)), this.chunks = [], this.err = a, this.msg = this.strm.msg
            }, c.Inflate = m, c.inflate = d, c.inflateRaw = e, c.ungzip = d
        }, {
            "./utils/common": 27,
            "./utils/strings": 28,
            "./zlib/constants": 30,
            "./zlib/gzheader": 33,
            "./zlib/inflate.js": 35,
            "./zlib/messages": 37,
            "./zlib/zstream": 39
        }],
        27: [function (a, b, c) {
            "use strict";
            var d = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
            c.assign = function (a) {
                for (var b = Array.prototype.slice.call(arguments, 1); b.length;) {
                    var c = b.shift();
                    if (c) {
                        if ("object" != typeof c) throw new TypeError(c + "must be non-object");
                        for (var d in c) c.hasOwnProperty(d) && (a[d] = c[d])
                    }
                }
                return a
            }, c.shrinkBuf = function (a, b) {
                return a.length === b ? a : a.subarray ? a.subarray(0, b) : (a.length = b, a)
            };
            var e = {
                arraySet: function (a, b, c, d, e) {
                    if (b.subarray && a.subarray) return void a.set(b.subarray(c, c + d), e);
                    for (var f = 0; f < d; f++) a[e + f] = b[c + f]
                }, flattenChunks: function (a) {
                    var b, c, d, e, f, g;
                    for (d = 0, b = 0, c = a.length; b < c; b++) d += a[b].length;
                    for (g = new Uint8Array(d), e = 0, b = 0, c = a.length; b < c; b++) f = a[b], g.set(f, e), e += f.length;
                    return g
                }
            }, f = {
                arraySet: function (a, b, c, d, e) {
                    for (var f = 0; f < d; f++) a[e + f] = b[c + f]
                }, flattenChunks: function (a) {
                    return [].concat.apply([], a)
                }
            };
            c.setTyped = function (a) {
                a ? (c.Buf8 = Uint8Array, c.Buf16 = Uint16Array, c.Buf32 = Int32Array, c.assign(c, e)) : (c.Buf8 = Array, c.Buf16 = Array, c.Buf32 = Array, c.assign(c, f))
            }, c.setTyped(d)
        }, {}],
        28: [function (a, b, c) {
            "use strict";

            function d(a, b) {
                if (b < 65537 && (a.subarray && g || !a.subarray && f)) return String.fromCharCode.apply(null, e.shrinkBuf(a, b));
                for (var c = "", d = 0; d < b; d++) c += String.fromCharCode(a[d]);
                return c
            }

            var e = a("./common"), f = !0, g = !0;
            try {
                String.fromCharCode.apply(null, [0])
            } catch (a) {
                f = !1
            }
            try {
                String.fromCharCode.apply(null, new Uint8Array(1))
            } catch (a) {
                g = !1
            }
            for (var h = new e.Buf8(256), i = 0; i < 256; i++) h[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1;
            h[254] = h[254] = 1, c.string2buf = function (a) {
                var b, c, d, f, g, h = a.length, i = 0;
                for (f = 0; f < h; f++) c = a.charCodeAt(f), 55296 == (64512 & c) && f + 1 < h && 56320 == (64512 & (d = a.charCodeAt(f + 1))) && (c = 65536 + (c - 55296 << 10) + (d - 56320), f++), i += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
                for (b = new e.Buf8(i), g = 0, f = 0; g < i; f++) c = a.charCodeAt(f), 55296 == (64512 & c) && f + 1 < h && 56320 == (64512 & (d = a.charCodeAt(f + 1))) && (c = 65536 + (c - 55296 << 10) + (d - 56320), f++), c < 128 ? b[g++] = c : c < 2048 ? (b[g++] = 192 | c >>> 6, b[g++] = 128 | 63 & c) : c < 65536 ? (b[g++] = 224 | c >>> 12, b[g++] = 128 | c >>> 6 & 63, b[g++] = 128 | 63 & c) : (b[g++] = 240 | c >>> 18, b[g++] = 128 | c >>> 12 & 63, b[g++] = 128 | c >>> 6 & 63, b[g++] = 128 | 63 & c);
                return b
            }, c.buf2binstring = function (a) {
                return d(a, a.length)
            }, c.binstring2buf = function (a) {
                for (var b = new e.Buf8(a.length), c = 0, d = b.length; c < d; c++) b[c] = a.charCodeAt(c);
                return b
            }, c.buf2string = function (a, b) {
                var c, e, f, g, i = b || a.length, j = new Array(2 * i);
                for (e = 0, c = 0; c < i;) if ((f = a[c++]) < 128) j[e++] = f; else if ((g = h[f]) > 4) j[e++] = 65533, c += g - 1; else {
                    for (f &= 2 === g ? 31 : 3 === g ? 15 : 7; g > 1 && c < i;) f = f << 6 | 63 & a[c++], g--;
                    g > 1 ? j[e++] = 65533 : f < 65536 ? j[e++] = f : (f -= 65536, j[e++] = 55296 | f >> 10 & 1023, j[e++] = 56320 | 1023 & f)
                }
                return d(j, e)
            }, c.utf8border = function (a, b) {
                var c;
                for (b = b || a.length, b > a.length && (b = a.length), c = b - 1; c >= 0 && 128 == (192 & a[c]);) c--;
                return c < 0 ? b : 0 === c ? b : c + h[a[c]] > b ? c : b
            }
        }, {"./common": 27}],
        29: [function (a, b, c) {
            "use strict";

            function d(a, b, c, d) {
                for (var e = 65535 & a | 0, f = a >>> 16 & 65535 | 0, g = 0; 0 !== c;) {
                    g = c > 2e3 ? 2e3 : c, c -= g;
                    do {
                        e = e + b[d++] | 0, f = f + e | 0
                    } while (--g);
                    e %= 65521, f %= 65521
                }
                return e | f << 16 | 0
            }

            b.exports = d
        }, {}],
        30: [function (a, b, c) {
            b.exports = {
                Z_NO_FLUSH: 0,
                Z_PARTIAL_FLUSH: 1,
                Z_SYNC_FLUSH: 2,
                Z_FULL_FLUSH: 3,
                Z_FINISH: 4,
                Z_BLOCK: 5,
                Z_TREES: 6,
                Z_OK: 0,
                Z_STREAM_END: 1,
                Z_NEED_DICT: 2,
                Z_ERRNO: -1,
                Z_STREAM_ERROR: -2,
                Z_DATA_ERROR: -3,
                Z_BUF_ERROR: -5,
                Z_NO_COMPRESSION: 0,
                Z_BEST_SPEED: 1,
                Z_BEST_COMPRESSION: 9,
                Z_DEFAULT_COMPRESSION: -1,
                Z_FILTERED: 1,
                Z_HUFFMAN_ONLY: 2,
                Z_RLE: 3,
                Z_FIXED: 4,
                Z_DEFAULT_STRATEGY: 0,
                Z_BINARY: 0,
                Z_TEXT: 1,
                Z_UNKNOWN: 2,
                Z_DEFLATED: 8
            }
        }, {}],
        31: [function (a, b, c) {
            "use strict";

            function d() {
                for (var a, b = [], c = 0; c < 256; c++) {
                    a = c;
                    for (var d = 0; d < 8; d++) a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
                    b[c] = a
                }
                return b
            }

            function e(a, b, c, d) {
                var e = f, g = d + c;
                a ^= -1;
                for (var h = d; h < g; h++) a = a >>> 8 ^ e[255 & (a ^ b[h])];
                return -1 ^ a
            }

            var f = d();
            b.exports = e
        }, {}],
        32: [function (a, b, c) {
            "use strict";

            function d(a, b) {
                return a.msg = G[b], b
            }

            function e(a) {
                return (a << 1) - (a > 4 ? 9 : 0)
            }

            function f(a) {
                for (var b = a.length; --b >= 0;) a[b] = 0
            }

            function g(a) {
                var b = a.state, c = b.pending;
                c > a.avail_out && (c = a.avail_out), 0 !== c && (C.arraySet(a.output, b.pending_buf, b.pending_out, c, a.next_out), a.next_out += c, b.pending_out += c, a.total_out += c, a.avail_out -= c, b.pending -= c, 0 === b.pending && (b.pending_out = 0))
            }

            function h(a, b) {
                D._tr_flush_block(a, a.block_start >= 0 ? a.block_start : -1, a.strstart - a.block_start, b), a.block_start = a.strstart, g(a.strm)
            }

            function i(a, b) {
                a.pending_buf[a.pending++] = b
            }

            function j(a, b) {
                a.pending_buf[a.pending++] = b >>> 8 & 255, a.pending_buf[a.pending++] = 255 & b
            }

            function k(a, b, c, d) {
                var e = a.avail_in;
                return e > d && (e = d), 0 === e ? 0 : (a.avail_in -= e, C.arraySet(b, a.input, a.next_in, e, c), 1 === a.state.wrap ? a.adler = E(a.adler, b, e, c) : 2 === a.state.wrap && (a.adler = F(a.adler, b, e, c)), a.next_in += e, a.total_in += e, e)
            }

            function l(a, b) {
                var c, d, e = a.max_chain_length, f = a.strstart, g = a.prev_length, h = a.nice_match,
                    i = a.strstart > a.w_size - ja ? a.strstart - (a.w_size - ja) : 0, j = a.window, k = a.w_mask,
                    l = a.prev, m = a.strstart + ia, n = j[f + g - 1], o = j[f + g];
                a.prev_length >= a.good_match && (e >>= 2), h > a.lookahead && (h = a.lookahead);
                do {
                    if (c = b, j[c + g] === o && j[c + g - 1] === n && j[c] === j[f] && j[++c] === j[f + 1]) {
                        f += 2, c++;
                        do {
                        } while (j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && f < m);
                        if (d = ia - (m - f), f = m - ia, d > g) {
                            if (a.match_start = b, g = d, d >= h) break;
                            n = j[f + g - 1], o = j[f + g]
                        }
                    }
                } while ((b = l[b & k]) > i && 0 != --e);
                return g <= a.lookahead ? g : a.lookahead
            }

            function m(a) {
                var b, c, d, e, f, g = a.w_size;
                do {
                    if (e = a.window_size - a.lookahead - a.strstart, a.strstart >= g + (g - ja)) {
                        C.arraySet(a.window, a.window, g, g, 0), a.match_start -= g, a.strstart -= g, a.block_start -= g, c = a.hash_size, b = c;
                        do {
                            d = a.head[--b], a.head[b] = d >= g ? d - g : 0
                        } while (--c);
                        c = g, b = c;
                        do {
                            d = a.prev[--b], a.prev[b] = d >= g ? d - g : 0
                        } while (--c);
                        e += g
                    }
                    if (0 === a.strm.avail_in) break;
                    if (c = k(a.strm, a.window, a.strstart + a.lookahead, e), a.lookahead += c, a.lookahead + a.insert >= ha) for (f = a.strstart - a.insert, a.ins_h = a.window[f], a.ins_h = (a.ins_h << a.hash_shift ^ a.window[f + 1]) & a.hash_mask; a.insert && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[f + ha - 1]) & a.hash_mask, a.prev[f & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = f, f++, a.insert--, !(a.lookahead + a.insert < ha));) ;
                } while (a.lookahead < ja && 0 !== a.strm.avail_in)
            }

            function n(a, b) {
                var c = 65535;
                for (c > a.pending_buf_size - 5 && (c = a.pending_buf_size - 5); ;) {
                    if (a.lookahead <= 1) {
                        if (m(a), 0 === a.lookahead && b === H) return sa;
                        if (0 === a.lookahead) break
                    }
                    a.strstart += a.lookahead, a.lookahead = 0;
                    var d = a.block_start + c;
                    if ((0 === a.strstart || a.strstart >= d) && (a.lookahead = a.strstart - d, a.strstart = d, h(a, !1), 0 === a.strm.avail_out)) return sa;
                    if (a.strstart - a.block_start >= a.w_size - ja && (h(a, !1), 0 === a.strm.avail_out)) return sa
                }
                return a.insert = 0, b === K ? (h(a, !0), 0 === a.strm.avail_out ? ua : va) : (a.strstart > a.block_start && (h(a, !1), a.strm.avail_out), sa)
            }

            function o(a, b) {
                for (var c, d; ;) {
                    if (a.lookahead < ja) {
                        if (m(a), a.lookahead < ja && b === H) return sa;
                        if (0 === a.lookahead) break
                    }
                    if (c = 0, a.lookahead >= ha && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + ha - 1]) & a.hash_mask, c = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart), 0 !== c && a.strstart - c <= a.w_size - ja && (a.match_length = l(a, c)), a.match_length >= ha) if (d = D._tr_tally(a, a.strstart - a.match_start, a.match_length - ha), a.lookahead -= a.match_length, a.match_length <= a.max_lazy_match && a.lookahead >= ha) {
                        a.match_length--;
                        do {
                            a.strstart++, a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + ha - 1]) & a.hash_mask, c = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart
                        } while (0 != --a.match_length);
                        a.strstart++
                    } else a.strstart += a.match_length, a.match_length = 0, a.ins_h = a.window[a.strstart], a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + 1]) & a.hash_mask; else d = D._tr_tally(a, 0, a.window[a.strstart]), a.lookahead--, a.strstart++;
                    if (d && (h(a, !1), 0 === a.strm.avail_out)) return sa
                }
                return a.insert = a.strstart < ha - 1 ? a.strstart : ha - 1, b === K ? (h(a, !0), 0 === a.strm.avail_out ? ua : va) : a.last_lit && (h(a, !1), 0 === a.strm.avail_out) ? sa : ta
            }

            function p(a, b) {
                for (var c, d, e; ;) {
                    if (a.lookahead < ja) {
                        if (m(a), a.lookahead < ja && b === H) return sa;
                        if (0 === a.lookahead) break
                    }
                    if (c = 0, a.lookahead >= ha && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + ha - 1]) & a.hash_mask, c = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart), a.prev_length = a.match_length, a.prev_match = a.match_start, a.match_length = ha - 1, 0 !== c && a.prev_length < a.max_lazy_match && a.strstart - c <= a.w_size - ja && (a.match_length = l(a, c), a.match_length <= 5 && (a.strategy === S || a.match_length === ha && a.strstart - a.match_start > 4096) && (a.match_length = ha - 1)), a.prev_length >= ha && a.match_length <= a.prev_length) {
                        e = a.strstart + a.lookahead - ha, d = D._tr_tally(a, a.strstart - 1 - a.prev_match, a.prev_length - ha), a.lookahead -= a.prev_length - 1, a.prev_length -= 2;
                        do {
                            ++a.strstart <= e && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + ha - 1]) & a.hash_mask, c = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart)
                        } while (0 != --a.prev_length);
                        if (a.match_available = 0, a.match_length = ha - 1, a.strstart++, d && (h(a, !1), 0 === a.strm.avail_out)) return sa
                    } else if (a.match_available) {
                        if (d = D._tr_tally(a, 0, a.window[a.strstart - 1]), d && h(a, !1), a.strstart++, a.lookahead--, 0 === a.strm.avail_out) return sa
                    } else a.match_available = 1, a.strstart++, a.lookahead--
                }
                return a.match_available && (d = D._tr_tally(a, 0, a.window[a.strstart - 1]), a.match_available = 0), a.insert = a.strstart < ha - 1 ? a.strstart : ha - 1, b === K ? (h(a, !0), 0 === a.strm.avail_out ? ua : va) : a.last_lit && (h(a, !1), 0 === a.strm.avail_out) ? sa : ta
            }

            function q(a, b) {
                for (var c, d, e, f, g = a.window; ;) {
                    if (a.lookahead <= ia) {
                        if (m(a), a.lookahead <= ia && b === H) return sa;
                        if (0 === a.lookahead) break
                    }
                    if (a.match_length = 0, a.lookahead >= ha && a.strstart > 0 && (e = a.strstart - 1, (d = g[e]) === g[++e] && d === g[++e] && d === g[++e])) {
                        f = a.strstart + ia;
                        do {
                        } while (d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && e < f);
                        a.match_length = ia - (f - e), a.match_length > a.lookahead && (a.match_length = a.lookahead)
                    }
                    if (a.match_length >= ha ? (c = D._tr_tally(a, 1, a.match_length - ha), a.lookahead -= a.match_length, a.strstart += a.match_length, a.match_length = 0) : (c = D._tr_tally(a, 0, a.window[a.strstart]), a.lookahead--, a.strstart++), c && (h(a, !1), 0 === a.strm.avail_out)) return sa
                }
                return a.insert = 0, b === K ? (h(a, !0), 0 === a.strm.avail_out ? ua : va) : a.last_lit && (h(a, !1), 0 === a.strm.avail_out) ? sa : ta
            }

            function r(a, b) {
                for (var c; ;) {
                    if (0 === a.lookahead && (m(a), 0 === a.lookahead)) {
                        if (b === H) return sa;
                        break
                    }
                    if (a.match_length = 0, c = D._tr_tally(a, 0, a.window[a.strstart]), a.lookahead--, a.strstart++, c && (h(a, !1), 0 === a.strm.avail_out)) return sa
                }
                return a.insert = 0, b === K ? (h(a, !0), 0 === a.strm.avail_out ? ua : va) : a.last_lit && (h(a, !1), 0 === a.strm.avail_out) ? sa : ta
            }

            function s(a) {
                a.window_size = 2 * a.w_size, f(a.head), a.max_lazy_match = B[a.level].max_lazy, a.good_match = B[a.level].good_length, a.nice_match = B[a.level].nice_length, a.max_chain_length = B[a.level].max_chain, a.strstart = 0, a.block_start = 0, a.lookahead = 0, a.insert = 0, a.match_length = a.prev_length = ha - 1, a.match_available = 0, a.ins_h = 0
            }

            function t() {
                this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = Y, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new C.Buf16(2 * fa), this.dyn_dtree = new C.Buf16(2 * (2 * da + 1)), this.bl_tree = new C.Buf16(2 * (2 * ea + 1)), f(this.dyn_ltree), f(this.dyn_dtree), f(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new C.Buf16(ga + 1), this.heap = new C.Buf16(2 * ca + 1), f(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new C.Buf16(2 * ca + 1), f(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0
            }

            function u(a) {
                var b;
                return a && a.state ? (a.total_in = a.total_out = 0, a.data_type = X, b = a.state, b.pending = 0, b.pending_out = 0, b.wrap < 0 && (b.wrap = -b.wrap), b.status = b.wrap ? la : qa, a.adler = 2 === b.wrap ? 0 : 1, b.last_flush = H, D._tr_init(b), M) : d(a, O)
            }

            function v(a) {
                var b = u(a);
                return b === M && s(a.state), b
            }

            function w(a, b) {
                return a && a.state ? 2 !== a.state.wrap ? O : (a.state.gzhead = b, M) : O
            }

            function x(a, b, c, e, f, g) {
                if (!a) return O;
                var h = 1;
                if (b === R && (b = 6), e < 0 ? (h = 0, e = -e) : e > 15 && (h = 2, e -= 16), f < 1 || f > Z || c !== Y || e < 8 || e > 15 || b < 0 || b > 9 || g < 0 || g > V) return d(a, O);
                8 === e && (e = 9);
                var i = new t;
                return a.state = i, i.strm = a, i.wrap = h, i.gzhead = null, i.w_bits = e, i.w_size = 1 << i.w_bits, i.w_mask = i.w_size - 1, i.hash_bits = f + 7, i.hash_size = 1 << i.hash_bits, i.hash_mask = i.hash_size - 1, i.hash_shift = ~~((i.hash_bits + ha - 1) / ha), i.window = new C.Buf8(2 * i.w_size), i.head = new C.Buf16(i.hash_size), i.prev = new C.Buf16(i.w_size), i.lit_bufsize = 1 << f + 6, i.pending_buf_size = 4 * i.lit_bufsize, i.pending_buf = new C.Buf8(i.pending_buf_size), i.d_buf = i.lit_bufsize >> 1, i.l_buf = 3 * i.lit_bufsize, i.level = b, i.strategy = g, i.method = c, v(a)
            }

            function y(a, b) {
                return x(a, b, Y, $, _, W)
            }

            function z(a, b) {
                var c, h, k, l;
                if (!a || !a.state || b > L || b < 0) return a ? d(a, O) : O;
                if (h = a.state, !a.output || !a.input && 0 !== a.avail_in || h.status === ra && b !== K) return d(a, 0 === a.avail_out ? Q : O);
                if (h.strm = a, c = h.last_flush, h.last_flush = b, h.status === la) if (2 === h.wrap) a.adler = 0, i(h, 31), i(h, 139), i(h, 8), h.gzhead ? (i(h, (h.gzhead.text ? 1 : 0) + (h.gzhead.hcrc ? 2 : 0) + (h.gzhead.extra ? 4 : 0) + (h.gzhead.name ? 8 : 0) + (h.gzhead.comment ? 16 : 0)), i(h, 255 & h.gzhead.time), i(h, h.gzhead.time >> 8 & 255), i(h, h.gzhead.time >> 16 & 255), i(h, h.gzhead.time >> 24 & 255), i(h, 9 === h.level ? 2 : h.strategy >= T || h.level < 2 ? 4 : 0), i(h, 255 & h.gzhead.os), h.gzhead.extra && h.gzhead.extra.length && (i(h, 255 & h.gzhead.extra.length), i(h, h.gzhead.extra.length >> 8 & 255)), h.gzhead.hcrc && (a.adler = F(a.adler, h.pending_buf, h.pending, 0)), h.gzindex = 0, h.status = ma) : (i(h, 0), i(h, 0), i(h, 0), i(h, 0), i(h, 0), i(h, 9 === h.level ? 2 : h.strategy >= T || h.level < 2 ? 4 : 0), i(h, wa), h.status = qa); else {
                    var m = Y + (h.w_bits - 8 << 4) << 8, n = -1;
                    n = h.strategy >= T || h.level < 2 ? 0 : h.level < 6 ? 1 : 6 === h.level ? 2 : 3, m |= n << 6, 0 !== h.strstart && (m |= ka), m += 31 - m % 31, h.status = qa, j(h, m), 0 !== h.strstart && (j(h, a.adler >>> 16), j(h, 65535 & a.adler)), a.adler = 1
                }
                if (h.status === ma) if (h.gzhead.extra) {
                    for (k = h.pending; h.gzindex < (65535 & h.gzhead.extra.length) && (h.pending !== h.pending_buf_size || (h.gzhead.hcrc && h.pending > k && (a.adler = F(a.adler, h.pending_buf, h.pending - k, k)), g(a), k = h.pending, h.pending !== h.pending_buf_size));) i(h, 255 & h.gzhead.extra[h.gzindex]), h.gzindex++;
                    h.gzhead.hcrc && h.pending > k && (a.adler = F(a.adler, h.pending_buf, h.pending - k, k)), h.gzindex === h.gzhead.extra.length && (h.gzindex = 0, h.status = na)
                } else h.status = na;
                if (h.status === na) if (h.gzhead.name) {
                    k = h.pending;
                    do {
                        if (h.pending === h.pending_buf_size && (h.gzhead.hcrc && h.pending > k && (a.adler = F(a.adler, h.pending_buf, h.pending - k, k)), g(a), k = h.pending, h.pending === h.pending_buf_size)) {
                            l = 1;
                            break
                        }
                        l = h.gzindex < h.gzhead.name.length ? 255 & h.gzhead.name.charCodeAt(h.gzindex++) : 0, i(h, l)
                    } while (0 !== l);
                    h.gzhead.hcrc && h.pending > k && (a.adler = F(a.adler, h.pending_buf, h.pending - k, k)), 0 === l && (h.gzindex = 0, h.status = oa)
                } else h.status = oa;
                if (h.status === oa) if (h.gzhead.comment) {
                    k = h.pending;
                    do {
                        if (h.pending === h.pending_buf_size && (h.gzhead.hcrc && h.pending > k && (a.adler = F(a.adler, h.pending_buf, h.pending - k, k)), g(a), k = h.pending, h.pending === h.pending_buf_size)) {
                            l = 1;
                            break
                        }
                        l = h.gzindex < h.gzhead.comment.length ? 255 & h.gzhead.comment.charCodeAt(h.gzindex++) : 0, i(h, l)
                    } while (0 !== l);
                    h.gzhead.hcrc && h.pending > k && (a.adler = F(a.adler, h.pending_buf, h.pending - k, k)), 0 === l && (h.status = pa)
                } else h.status = pa;
                if (h.status === pa && (h.gzhead.hcrc ? (h.pending + 2 > h.pending_buf_size && g(a), h.pending + 2 <= h.pending_buf_size && (i(h, 255 & a.adler), i(h, a.adler >> 8 & 255), a.adler = 0, h.status = qa)) : h.status = qa), 0 !== h.pending) {
                    if (g(a), 0 === a.avail_out) return h.last_flush = -1, M
                } else if (0 === a.avail_in && e(b) <= e(c) && b !== K) return d(a, Q);
                if (h.status === ra && 0 !== a.avail_in) return d(a, Q);
                if (0 !== a.avail_in || 0 !== h.lookahead || b !== H && h.status !== ra) {
                    var o = h.strategy === T ? r(h, b) : h.strategy === U ? q(h, b) : B[h.level].func(h, b);
                    if (o !== ua && o !== va || (h.status = ra), o === sa || o === ua) return 0 === a.avail_out && (h.last_flush = -1), M;
                    if (o === ta && (b === I ? D._tr_align(h) : b !== L && (D._tr_stored_block(h, 0, 0, !1), b === J && (f(h.head), 0 === h.lookahead && (h.strstart = 0, h.block_start = 0, h.insert = 0))), g(a), 0 === a.avail_out)) return h.last_flush = -1, M
                }
                return b !== K ? M : h.wrap <= 0 ? N : (2 === h.wrap ? (i(h, 255 & a.adler), i(h, a.adler >> 8 & 255), i(h, a.adler >> 16 & 255), i(h, a.adler >> 24 & 255), i(h, 255 & a.total_in), i(h, a.total_in >> 8 & 255), i(h, a.total_in >> 16 & 255), i(h, a.total_in >> 24 & 255)) : (j(h, a.adler >>> 16), j(h, 65535 & a.adler)), g(a), h.wrap > 0 && (h.wrap = -h.wrap), 0 !== h.pending ? M : N)
            }

            function A(a) {
                var b;
                return a && a.state ? (b = a.state.status) !== la && b !== ma && b !== na && b !== oa && b !== pa && b !== qa && b !== ra ? d(a, O) : (a.state = null, b === qa ? d(a, P) : M) : O
            }

            var B, C = a("../utils/common"), D = a("./trees"), E = a("./adler32"), F = a("./crc32"),
                G = a("./messages"), H = 0, I = 1, J = 3, K = 4, L = 5, M = 0, N = 1, O = -2, P = -3, Q = -5, R = -1,
                S = 1, T = 2, U = 3, V = 4, W = 0, X = 2, Y = 8, Z = 9, $ = 15, _ = 8, aa = 29, ba = 256,
                ca = ba + 1 + aa, da = 30, ea = 19, fa = 2 * ca + 1, ga = 15, ha = 3, ia = 258, ja = ia + ha + 1,
                ka = 32, la = 42, ma = 69, na = 73, oa = 91, pa = 103, qa = 113, ra = 666, sa = 1, ta = 2, ua = 3,
                va = 4, wa = 3, xa = function (a, b, c, d, e) {
                    this.good_length = a, this.max_lazy = b, this.nice_length = c, this.max_chain = d, this.func = e
                };
            B = [new xa(0, 0, 0, 0, n), new xa(4, 4, 8, 4, o), new xa(4, 5, 16, 8, o), new xa(4, 6, 32, 32, o), new xa(4, 4, 16, 16, p), new xa(8, 16, 32, 32, p), new xa(8, 16, 128, 128, p), new xa(8, 32, 128, 256, p), new xa(32, 128, 258, 1024, p), new xa(32, 258, 258, 4096, p)], c.deflateInit = y, c.deflateInit2 = x, c.deflateReset = v, c.deflateResetKeep = u, c.deflateSetHeader = w, c.deflate = z, c.deflateEnd = A, c.deflateInfo = "pako deflate (from Nodeca project)"
        }, {"../utils/common": 27, "./adler32": 29, "./crc32": 31, "./messages": 37, "./trees": 38}],
        33: [function (a, b, c) {
            "use strict";

            function d() {
                this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1
            }

            b.exports = d
        }, {}],
        34: [function (a, b, c) {
            "use strict";
            var d = 30;
            b.exports = function (a, b) {
                var c, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B;
                c = a.state, e = a.next_in, A = a.input, f = e + (a.avail_in - 5), g = a.next_out, B = a.output, h = g - (b - a.avail_out), i = g + (a.avail_out - 257), j = c.dmax, k = c.wsize, l = c.whave, m = c.wnext, n = c.window, o = c.hold, p = c.bits, q = c.lencode, r = c.distcode, s = (1 << c.lenbits) - 1, t = (1 << c.distbits) - 1;
                a:do {
                    p < 15 && (o += A[e++] << p, p += 8, o += A[e++] << p, p += 8), u = q[o & s];
                    b:for (; ;) {
                        if (v = u >>> 24, o >>>= v, p -= v, 0 == (v = u >>> 16 & 255)) B[g++] = 65535 & u; else {
                            if (!(16 & v)) {
                                if (0 == (64 & v)) {
                                    u = q[(65535 & u) + (o & (1 << v) - 1)];
                                    continue b
                                }
                                if (32 & v) {
                                    c.mode = 12;
                                    break a
                                }
                                a.msg = "invalid literal/length code", c.mode = d;
                                break a
                            }
                            w = 65535 & u, v &= 15, v && (p < v && (o += A[e++] << p, p += 8), w += o & (1 << v) - 1, o >>>= v, p -= v), p < 15 && (o += A[e++] << p, p += 8, o += A[e++] << p, p += 8), u = r[o & t];
                            c:for (; ;) {
                                if (v = u >>> 24, o >>>= v, p -= v, !(16 & (v = u >>> 16 & 255))) {
                                    if (0 == (64 & v)) {
                                        u = r[(65535 & u) + (o & (1 << v) - 1)];
                                        continue c
                                    }
                                    a.msg = "invalid distance code", c.mode = d;
                                    break a
                                }
                                if (x = 65535 & u, v &= 15, p < v && (o += A[e++] << p, (p += 8) < v && (o += A[e++] << p, p += 8)), (x += o & (1 << v) - 1) > j) {
                                    a.msg = "invalid distance too far back", c.mode = d;
                                    break a
                                }
                                if (o >>>= v, p -= v, v = g - h, x > v) {
                                    if ((v = x - v) > l && c.sane) {
                                        a.msg = "invalid distance too far back", c.mode = d;
                                        break a
                                    }
                                    if (y = 0, z = n, 0 === m) {
                                        if (y += k - v, v < w) {
                                            w -= v;
                                            do {
                                                B[g++] = n[y++]
                                            } while (--v);
                                            y = g - x, z = B
                                        }
                                    } else if (m < v) {
                                        if (y += k + m - v, (v -= m) < w) {
                                            w -= v;
                                            do {
                                                B[g++] = n[y++]
                                            } while (--v);
                                            if (y = 0, m < w) {
                                                v = m, w -= v;
                                                do {
                                                    B[g++] = n[y++]
                                                } while (--v);
                                                y = g - x, z = B
                                            }
                                        }
                                    } else if (y += m - v, v < w) {
                                        w -= v;
                                        do {
                                            B[g++] = n[y++]
                                        } while (--v);
                                        y = g - x, z = B
                                    }
                                    for (; w > 2;) B[g++] = z[y++], B[g++] = z[y++], B[g++] = z[y++], w -= 3;
                                    w && (B[g++] = z[y++], w > 1 && (B[g++] = z[y++]))
                                } else {
                                    y = g - x;
                                    do {
                                        B[g++] = B[y++], B[g++] = B[y++], B[g++] = B[y++], w -= 3
                                    } while (w > 2);
                                    w && (B[g++] = B[y++], w > 1 && (B[g++] = B[y++]))
                                }
                                break
                            }
                        }
                        break
                    }
                } while (e < f && g < i);
                w = p >> 3, e -= w, p -= w << 3, o &= (1 << p) - 1, a.next_in = e, a.next_out = g, a.avail_in = e < f ? f - e + 5 : 5 - (e - f), a.avail_out = g < i ? i - g + 257 : 257 - (g - i), c.hold = o, c.bits = p
            }
        }, {}],
        35: [function (a, b, c) {
            "use strict";

            function d(a) {
                return (a >>> 24 & 255) + (a >>> 8 & 65280) + ((65280 & a) << 8) + ((255 & a) << 24)
            }

            function e() {
                this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new r.Buf16(320), this.work = new r.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
            }

            function f(a) {
                var b;
                return a && a.state ? (b = a.state, a.total_in = a.total_out = b.total = 0, a.msg = "", b.wrap && (a.adler = 1 & b.wrap), b.mode = K, b.last = 0, b.havedict = 0, b.dmax = 32768, b.head = null, b.hold = 0, b.bits = 0, b.lencode = b.lendyn = new r.Buf32(oa), b.distcode = b.distdyn = new r.Buf32(pa), b.sane = 1, b.back = -1, C) : F
            }

            function g(a) {
                var b;
                return a && a.state ? (b = a.state, b.wsize = 0, b.whave = 0, b.wnext = 0, f(a)) : F
            }

            function h(a, b) {
                var c, d;
                return a && a.state ? (d = a.state, b < 0 ? (c = 0, b = -b) : (c = 1 + (b >> 4), b < 48 && (b &= 15)), b && (b < 8 || b > 15) ? F : (null !== d.window && d.wbits !== b && (d.window = null), d.wrap = c, d.wbits = b, g(a))) : F
            }

            function i(a, b) {
                var c, d;
                return a ? (d = new e, a.state = d, d.window = null, c = h(a, b), c !== C && (a.state = null), c) : F
            }

            function j(a) {
                return i(a, ra)
            }

            function k(a) {
                if (sa) {
                    var b;
                    for (p = new r.Buf32(512), q = new r.Buf32(32), b = 0; b < 144;) a.lens[b++] = 8;
                    for (; b < 256;) a.lens[b++] = 9;
                    for (; b < 280;) a.lens[b++] = 7;
                    for (; b < 288;) a.lens[b++] = 8;
                    for (v(x, a.lens, 0, 288, p, 0, a.work, {bits: 9}), b = 0; b < 32;) a.lens[b++] = 5;
                    v(y, a.lens, 0, 32, q, 0, a.work, {bits: 5}), sa = !1
                }
                a.lencode = p, a.lenbits = 9, a.distcode = q, a.distbits = 5
            }

            function l(a, b, c, d) {
                var e, f = a.state;
                return null === f.window && (f.wsize = 1 << f.wbits, f.wnext = 0, f.whave = 0, f.window = new r.Buf8(f.wsize)), d >= f.wsize ? (r.arraySet(f.window, b, c - f.wsize, f.wsize, 0), f.wnext = 0, f.whave = f.wsize) : (e = f.wsize - f.wnext, e > d && (e = d), r.arraySet(f.window, b, c - d, e, f.wnext), d -= e, d ? (r.arraySet(f.window, b, c - d, d, 0), f.wnext = d, f.whave = f.wsize) : (f.wnext += e, f.wnext === f.wsize && (f.wnext = 0), f.whave < f.wsize && (f.whave += e))), 0
            }

            function m(a, b) {
                var c, e, f, g, h, i, j, m, n, o, p, q, oa, pa, qa, ra, sa, ta, ua, va, wa, xa, ya, za, Aa = 0,
                    Ba = new r.Buf8(4), Ca = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                if (!a || !a.state || !a.output || !a.input && 0 !== a.avail_in) return F;
                c = a.state, c.mode === V && (c.mode = W), h = a.next_out, f = a.output, j = a.avail_out, g = a.next_in, e = a.input, i = a.avail_in, m = c.hold, n = c.bits, o = i, p = j, xa = C;
                a:for (; ;) switch (c.mode) {
                    case K:
                        if (0 === c.wrap) {
                            c.mode = W;
                            break
                        }
                        for (; n < 16;) {
                            if (0 === i) break a;
                            i--, m += e[g++] << n, n += 8
                        }
                        if (2 & c.wrap && 35615 === m) {
                            c.check = 0, Ba[0] = 255 & m, Ba[1] = m >>> 8 & 255, c.check = t(c.check, Ba, 2, 0), m = 0, n = 0, c.mode = L;
                            break
                        }
                        if (c.flags = 0, c.head && (c.head.done = !1), !(1 & c.wrap) || (((255 & m) << 8) + (m >> 8)) % 31) {
                            a.msg = "incorrect header check", c.mode = la;
                            break
                        }
                        if ((15 & m) !== J) {
                            a.msg = "unknown compression method", c.mode = la;
                            break
                        }
                        if (m >>>= 4, n -= 4, wa = 8 + (15 & m), 0 === c.wbits) c.wbits = wa; else if (wa > c.wbits) {
                            a.msg = "invalid window size", c.mode = la;
                            break
                        }
                        c.dmax = 1 << wa, a.adler = c.check = 1, c.mode = 512 & m ? T : V, m = 0, n = 0;
                        break;
                    case L:
                        for (; n < 16;) {
                            if (0 === i) break a;
                            i--, m += e[g++] << n, n += 8
                        }
                        if (c.flags = m, (255 & c.flags) !== J) {
                            a.msg = "unknown compression method", c.mode = la;
                            break
                        }
                        if (57344 & c.flags) {
                            a.msg = "unknown header flags set", c.mode = la;
                            break
                        }
                        c.head && (c.head.text = m >> 8 & 1), 512 & c.flags && (Ba[0] = 255 & m, Ba[1] = m >>> 8 & 255, c.check = t(c.check, Ba, 2, 0)), m = 0, n = 0, c.mode = M;
                    case M:
                        for (; n < 32;) {
                            if (0 === i) break a;
                            i--, m += e[g++] << n, n += 8
                        }
                        c.head && (c.head.time = m), 512 & c.flags && (Ba[0] = 255 & m, Ba[1] = m >>> 8 & 255, Ba[2] = m >>> 16 & 255, Ba[3] = m >>> 24 & 255, c.check = t(c.check, Ba, 4, 0)), m = 0, n = 0, c.mode = N;
                    case N:
                        for (; n < 16;) {
                            if (0 === i) break a;
                            i--, m += e[g++] << n, n += 8
                        }
                        c.head && (c.head.xflags = 255 & m, c.head.os = m >> 8), 512 & c.flags && (Ba[0] = 255 & m, Ba[1] = m >>> 8 & 255, c.check = t(c.check, Ba, 2, 0)), m = 0, n = 0, c.mode = O;
                    case O:
                        if (1024 & c.flags) {
                            for (; n < 16;) {
                                if (0 === i) break a;
                                i--, m += e[g++] << n, n += 8
                            }
                            c.length = m, c.head && (c.head.extra_len = m), 512 & c.flags && (Ba[0] = 255 & m, Ba[1] = m >>> 8 & 255, c.check = t(c.check, Ba, 2, 0)), m = 0, n = 0
                        } else c.head && (c.head.extra = null);
                        c.mode = P;
                    case P:
                        if (1024 & c.flags && (q = c.length, q > i && (q = i), q && (c.head && (wa = c.head.extra_len - c.length, c.head.extra || (c.head.extra = new Array(c.head.extra_len)), r.arraySet(c.head.extra, e, g, q, wa)), 512 & c.flags && (c.check = t(c.check, e, q, g)), i -= q, g += q, c.length -= q), c.length)) break a;
                        c.length = 0, c.mode = Q;
                    case Q:
                        if (2048 & c.flags) {
                            if (0 === i) break a;
                            q = 0;
                            do {
                                wa = e[g + q++], c.head && wa && c.length < 65536 && (c.head.name += String.fromCharCode(wa))
                            } while (wa && q < i);
                            if (512 & c.flags && (c.check = t(c.check, e, q, g)), i -= q, g += q, wa) break a
                        } else c.head && (c.head.name = null);
                        c.length = 0, c.mode = R;
                    case R:
                        if (4096 & c.flags) {
                            if (0 === i) break a;
                            q = 0;
                            do {
                                wa = e[g + q++], c.head && wa && c.length < 65536 && (c.head.comment += String.fromCharCode(wa))
                            } while (wa && q < i);
                            if (512 & c.flags && (c.check = t(c.check, e, q, g)), i -= q, g += q, wa) break a
                        } else c.head && (c.head.comment = null);
                        c.mode = S;
                    case S:
                        if (512 & c.flags) {
                            for (; n < 16;) {
                                if (0 === i) break a;
                                i--, m += e[g++] << n, n += 8
                            }
                            if (m !== (65535 & c.check)) {
                                a.msg = "header crc mismatch", c.mode = la;
                                break
                            }
                            m = 0, n = 0
                        }
                        c.head && (c.head.hcrc = c.flags >> 9 & 1, c.head.done = !0), a.adler = c.check = 0, c.mode = V;
                        break;
                    case T:
                        for (; n < 32;) {
                            if (0 === i) break a;
                            i--, m += e[g++] << n, n += 8
                        }
                        a.adler = c.check = d(m), m = 0, n = 0, c.mode = U;
                    case U:
                        if (0 === c.havedict) return a.next_out = h, a.avail_out = j, a.next_in = g, a.avail_in = i, c.hold = m, c.bits = n, E;
                        a.adler = c.check = 1, c.mode = V;
                    case V:
                        if (b === A || b === B) break a;
                    case W:
                        if (c.last) {
                            m >>>= 7 & n, n -= 7 & n, c.mode = ia;
                            break
                        }
                        for (; n < 3;) {
                            if (0 === i) break a;
                            i--, m += e[g++] << n, n += 8
                        }
                        switch (c.last = 1 & m, m >>>= 1, n -= 1, 3 & m) {
                            case 0:
                                c.mode = X;
                                break;
                            case 1:
                                if (k(c), c.mode = ba, b === B) {
                                    m >>>= 2, n -= 2;
                                    break a
                                }
                                break;
                            case 2:
                                c.mode = $;
                                break;
                            case 3:
                                a.msg = "invalid block type", c.mode = la
                        }
                        m >>>= 2, n -= 2;
                        break;
                    case X:
                        for (m >>>= 7 & n, n -= 7 & n; n < 32;) {
                            if (0 === i) break a;
                            i--, m += e[g++] << n, n += 8
                        }
                        if ((65535 & m) != (m >>> 16 ^ 65535)) {
                            a.msg = "invalid stored block lengths", c.mode = la;
                            break
                        }
                        if (c.length = 65535 & m, m = 0, n = 0, c.mode = Y, b === B) break a;
                    case Y:
                        c.mode = Z;
                    case Z:
                        if (q = c.length) {
                            if (q > i && (q = i), q > j && (q = j), 0 === q) break a;
                            r.arraySet(f, e, g, q, h), i -= q, g += q, j -= q, h += q, c.length -= q;
                            break
                        }
                        c.mode = V;
                        break;
                    case $:
                        for (; n < 14;) {
                            if (0 === i) break a;
                            i--, m += e[g++] << n, n += 8
                        }
                        if (c.nlen = 257 + (31 & m), m >>>= 5, n -= 5, c.ndist = 1 + (31 & m), m >>>= 5, n -= 5, c.ncode = 4 + (15 & m), m >>>= 4, n -= 4, c.nlen > 286 || c.ndist > 30) {
                            a.msg = "too many length or distance symbols", c.mode = la;
                            break
                        }
                        c.have = 0, c.mode = _;
                    case _:
                        for (; c.have < c.ncode;) {
                            for (; n < 3;) {
                                if (0 === i) break a;
                                i--, m += e[g++] << n, n += 8
                            }
                            c.lens[Ca[c.have++]] = 7 & m, m >>>= 3, n -= 3
                        }
                        for (; c.have < 19;) c.lens[Ca[c.have++]] = 0;
                        if (c.lencode = c.lendyn, c.lenbits = 7, ya = {bits: c.lenbits}, xa = v(w, c.lens, 0, 19, c.lencode, 0, c.work, ya), c.lenbits = ya.bits, xa) {
                            a.msg = "invalid code lengths set", c.mode = la;
                            break
                        }
                        c.have = 0, c.mode = aa;
                    case aa:
                        for (; c.have < c.nlen + c.ndist;) {
                            for (; Aa = c.lencode[m & (1 << c.lenbits) - 1], qa = Aa >>> 24, ra = Aa >>> 16 & 255, sa = 65535 & Aa, !(qa <= n);) {
                                if (0 === i) break a;
                                i--, m += e[g++] << n, n += 8
                            }
                            if (sa < 16) m >>>= qa, n -= qa, c.lens[c.have++] = sa; else {
                                if (16 === sa) {
                                    for (za = qa + 2; n < za;) {
                                        if (0 === i) break a;
                                        i--, m += e[g++] << n, n += 8
                                    }
                                    if (m >>>= qa, n -= qa, 0 === c.have) {
                                        a.msg = "invalid bit length repeat", c.mode = la;
                                        break
                                    }
                                    wa = c.lens[c.have - 1], q = 3 + (3 & m), m >>>= 2, n -= 2
                                } else if (17 === sa) {
                                    for (za = qa + 3; n < za;) {
                                        if (0 === i) break a;
                                        i--, m += e[g++] << n, n += 8
                                    }
                                    m >>>= qa, n -= qa, wa = 0, q = 3 + (7 & m), m >>>= 3, n -= 3
                                } else {
                                    for (za = qa + 7; n < za;) {
                                        if (0 === i) break a;
                                        i--, m += e[g++] << n, n += 8
                                    }
                                    m >>>= qa, n -= qa, wa = 0, q = 11 + (127 & m), m >>>= 7, n -= 7
                                }
                                if (c.have + q > c.nlen + c.ndist) {
                                    a.msg = "invalid bit length repeat", c.mode = la;
                                    break
                                }
                                for (; q--;) c.lens[c.have++] = wa
                            }
                        }
                        if (c.mode === la) break;
                        if (0 === c.lens[256]) {
                            a.msg = "invalid code -- missing end-of-block", c.mode = la;
                            break
                        }
                        if (c.lenbits = 9, ya = {bits: c.lenbits}, xa = v(x, c.lens, 0, c.nlen, c.lencode, 0, c.work, ya), c.lenbits = ya.bits, xa) {
                            a.msg = "invalid literal/lengths set", c.mode = la;
                            break
                        }
                        if (c.distbits = 6, c.distcode = c.distdyn, ya = {bits: c.distbits}, xa = v(y, c.lens, c.nlen, c.ndist, c.distcode, 0, c.work, ya), c.distbits = ya.bits, xa) {
                            a.msg = "invalid distances set", c.mode = la;
                            break
                        }
                        if (c.mode = ba, b === B) break a;
                    case ba:
                        c.mode = ca;
                    case ca:
                        if (i >= 6 && j >= 258) {
                            a.next_out = h, a.avail_out = j, a.next_in = g, a.avail_in = i, c.hold = m, c.bits = n, u(a, p), h = a.next_out, f = a.output, j = a.avail_out, g = a.next_in, e = a.input, i = a.avail_in, m = c.hold, n = c.bits, c.mode === V && (c.back = -1);
                            break
                        }
                        for (c.back = 0; Aa = c.lencode[m & (1 << c.lenbits) - 1], qa = Aa >>> 24, ra = Aa >>> 16 & 255, sa = 65535 & Aa, !(qa <= n);) {
                            if (0 === i) break a;
                            i--, m += e[g++] << n, n += 8
                        }
                        if (ra && 0 == (240 & ra)) {
                            for (ta = qa, ua = ra, va = sa; Aa = c.lencode[va + ((m & (1 << ta + ua) - 1) >> ta)], qa = Aa >>> 24, ra = Aa >>> 16 & 255, sa = 65535 & Aa, !(ta + qa <= n);) {
                                if (0 === i) break a;
                                i--, m += e[g++] << n, n += 8
                            }
                            m >>>= ta, n -= ta, c.back += ta
                        }
                        if (m >>>= qa, n -= qa, c.back += qa, c.length = sa, 0 === ra) {
                            c.mode = ha;
                            break
                        }
                        if (32 & ra) {
                            c.back = -1, c.mode = V;
                            break
                        }
                        if (64 & ra) {
                            a.msg = "invalid literal/length code", c.mode = la;
                            break
                        }
                        c.extra = 15 & ra, c.mode = da;
                    case da:
                        if (c.extra) {
                            for (za = c.extra; n < za;) {
                                if (0 === i) break a;
                                i--, m += e[g++] << n, n += 8
                            }
                            c.length += m & (1 << c.extra) - 1, m >>>= c.extra, n -= c.extra, c.back += c.extra
                        }
                        c.was = c.length, c.mode = ea;
                    case ea:
                        for (; Aa = c.distcode[m & (1 << c.distbits) - 1], qa = Aa >>> 24, ra = Aa >>> 16 & 255, sa = 65535 & Aa, !(qa <= n);) {
                            if (0 === i) break a;
                            i--, m += e[g++] << n, n += 8
                        }
                        if (0 == (240 & ra)) {
                            for (ta = qa, ua = ra, va = sa; Aa = c.distcode[va + ((m & (1 << ta + ua) - 1) >> ta)], qa = Aa >>> 24, ra = Aa >>> 16 & 255, sa = 65535 & Aa, !(ta + qa <= n);) {
                                if (0 === i) break a;
                                i--, m += e[g++] << n, n += 8
                            }
                            m >>>= ta, n -= ta, c.back += ta
                        }
                        if (m >>>= qa, n -= qa, c.back += qa, 64 & ra) {
                            a.msg = "invalid distance code", c.mode = la;
                            break
                        }
                        c.offset = sa, c.extra = 15 & ra, c.mode = fa;
                    case fa:
                        if (c.extra) {
                            for (za = c.extra; n < za;) {
                                if (0 === i) break a;
                                i--, m += e[g++] << n, n += 8
                            }
                            c.offset += m & (1 << c.extra) - 1, m >>>= c.extra, n -= c.extra, c.back += c.extra
                        }
                        if (c.offset > c.dmax) {
                            a.msg = "invalid distance too far back", c.mode = la;
                            break
                        }
                        c.mode = ga;
                    case ga:
                        if (0 === j) break a;
                        if (q = p - j, c.offset > q) {
                            if ((q = c.offset - q) > c.whave && c.sane) {
                                a.msg = "invalid distance too far back", c.mode = la;
                                break
                            }
                            q > c.wnext ? (q -= c.wnext, oa = c.wsize - q) : oa = c.wnext - q, q > c.length && (q = c.length), pa = c.window
                        } else pa = f, oa = h - c.offset, q = c.length;
                        q > j && (q = j), j -= q, c.length -= q;
                        do {
                            f[h++] = pa[oa++]
                        } while (--q);
                        0 === c.length && (c.mode = ca);
                        break;
                    case ha:
                        if (0 === j) break a;
                        f[h++] = c.length, j--, c.mode = ca;
                        break;
                    case ia:
                        if (c.wrap) {
                            for (; n < 32;) {
                                if (0 === i) break a;
                                i--, m |= e[g++] << n, n += 8
                            }
                            if (p -= j, a.total_out += p, c.total += p, p && (a.adler = c.check = c.flags ? t(c.check, f, p, h - p) : s(c.check, f, p, h - p)), p = j, (c.flags ? m : d(m)) !== c.check) {
                                a.msg = "incorrect data check", c.mode = la;
                                break
                            }
                            m = 0, n = 0
                        }
                        c.mode = ja;
                    case ja:
                        if (c.wrap && c.flags) {
                            for (; n < 32;) {
                                if (0 === i) break a;
                                i--, m += e[g++] << n, n += 8
                            }
                            if (m !== (4294967295 & c.total)) {
                                a.msg = "incorrect length check", c.mode = la;
                                break
                            }
                            m = 0, n = 0
                        }
                        c.mode = ka;
                    case ka:
                        xa = D;
                        break a;
                    case la:
                        xa = G;
                        break a;
                    case ma:
                        return H;
                    case na:
                    default:
                        return F
                }
                return a.next_out = h, a.avail_out = j, a.next_in = g, a.avail_in = i, c.hold = m, c.bits = n, (c.wsize || p !== a.avail_out && c.mode < la && (c.mode < ia || b !== z)) && l(a, a.output, a.next_out, p - a.avail_out) ? (c.mode = ma, H) : (o -= a.avail_in, p -= a.avail_out, a.total_in += o, a.total_out += p, c.total += p, c.wrap && p && (a.adler = c.check = c.flags ? t(c.check, f, p, a.next_out - p) : s(c.check, f, p, a.next_out - p)), a.data_type = c.bits + (c.last ? 64 : 0) + (c.mode === V ? 128 : 0) + (c.mode === ba || c.mode === Y ? 256 : 0), (0 === o && 0 === p || b === z) && xa === C && (xa = I), xa)
            }

            function n(a) {
                if (!a || !a.state) return F;
                var b = a.state;
                return b.window && (b.window = null), a.state = null, C
            }

            function o(a, b) {
                var c;
                return a && a.state ? (c = a.state, 0 == (2 & c.wrap) ? F : (c.head = b, b.done = !1, C)) : F
            }

            var p, q, r = a("../utils/common"), s = a("./adler32"), t = a("./crc32"), u = a("./inffast"),
                v = a("./inftrees"), w = 0, x = 1, y = 2, z = 4, A = 5, B = 6, C = 0, D = 1, E = 2, F = -2, G = -3,
                H = -4, I = -5, J = 8, K = 1, L = 2, M = 3, N = 4, O = 5, P = 6, Q = 7, R = 8, S = 9, T = 10, U = 11,
                V = 12, W = 13, X = 14, Y = 15, Z = 16, $ = 17, _ = 18, aa = 19, ba = 20, ca = 21, da = 22, ea = 23,
                fa = 24, ga = 25, ha = 26, ia = 27, ja = 28, ka = 29, la = 30, ma = 31, na = 32, oa = 852, pa = 592,
                qa = 15, ra = qa, sa = !0;
            c.inflateReset = g, c.inflateReset2 = h, c.inflateResetKeep = f, c.inflateInit = j, c.inflateInit2 = i, c.inflate = m, c.inflateEnd = n, c.inflateGetHeader = o, c.inflateInfo = "pako inflate (from Nodeca project)"
        }, {"../utils/common": 27, "./adler32": 29, "./crc32": 31, "./inffast": 34, "./inftrees": 36}],
        36: [function (a, b, c) {
            "use strict";
            var d = a("../utils/common"), e = 15, f = 852, g = 592, h = 0, i = 1, j = 2,
                k = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
                l = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
                m = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
                n = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
            b.exports = function (a, b, c, o, p, q, r, s) {
                var t, u, v, w, x, y, z, A, B, C = s.bits, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0,
                    L = 0, M = 0, N = null, O = 0, P = new d.Buf16(e + 1), Q = new d.Buf16(e + 1), R = null, S = 0;
                for (D = 0; D <= e; D++) P[D] = 0;
                for (E = 0; E < o; E++) P[b[c + E]]++;
                for (H = C, G = e; G >= 1 && 0 === P[G]; G--) ;
                if (H > G && (H = G), 0 === G) return p[q++] = 20971520, p[q++] = 20971520, s.bits = 1, 0;
                for (F = 1; F < G && 0 === P[F]; F++) ;
                for (H < F && (H = F), K = 1, D = 1; D <= e; D++) if (K <<= 1, (K -= P[D]) < 0) return -1;
                if (K > 0 && (a === h || 1 !== G)) return -1;
                for (Q[1] = 0, D = 1; D < e; D++) Q[D + 1] = Q[D] + P[D];
                for (E = 0; E < o; E++) 0 !== b[c + E] && (r[Q[b[c + E]]++] = E);
                if (a === h ? (N = R = r, y = 19) : a === i ? (N = k, O -= 257, R = l, S -= 257, y = 256) : (N = m, R = n, y = -1), M = 0, E = 0, D = F, x = q, I = H, J = 0, v = -1, L = 1 << H, w = L - 1, a === i && L > f || a === j && L > g) return 1;
                for (var T = 0; ;) {
                    T++, z = D - J, r[E] < y ? (A = 0, B = r[E]) : r[E] > y ? (A = R[S + r[E]], B = N[O + r[E]]) : (A = 96, B = 0), t = 1 << D - J, u = 1 << I, F = u;
                    do {
                        u -= t, p[x + (M >> J) + u] = z << 24 | A << 16 | B | 0
                    } while (0 !== u);
                    for (t = 1 << D - 1; M & t;) t >>= 1;
                    if (0 !== t ? (M &= t - 1, M += t) : M = 0, E++, 0 == --P[D]) {
                        if (D === G) break;
                        D = b[c + r[E]]
                    }
                    if (D > H && (M & w) !== v) {
                        for (0 === J && (J = H), x += F, I = D - J, K = 1 << I; I + J < G && !((K -= P[I + J]) <= 0);) I++, K <<= 1;
                        if (L += 1 << I, a === i && L > f || a === j && L > g) return 1;
                        v = M & w, p[v] = H << 24 | I << 16 | x - q | 0
                    }
                }
                return 0 !== M && (p[x + M] = D - J << 24 | 64 << 16 | 0), s.bits = H, 0
            }
        }, {"../utils/common": 27}],
        37: [function (a, b, c) {
            "use strict";
            b.exports = {
                2: "need dictionary",
                1: "stream end",
                0: "",
                "-1": "file error",
                "-2": "stream error",
                "-3": "data error",
                "-4": "insufficient memory",
                "-5": "buffer error",
                "-6": "incompatible version"
            }
        }, {}],
        38: [function (a, b, c) {
            "use strict";

            function d(a) {
                for (var b = a.length; --b >= 0;) a[b] = 0
            }

            function e(a) {
                return a < 256 ? ga[a] : ga[256 + (a >>> 7)]
            }

            function f(a, b) {
                a.pending_buf[a.pending++] = 255 & b, a.pending_buf[a.pending++] = b >>> 8 & 255
            }

            function g(a, b, c) {
                a.bi_valid > V - c ? (a.bi_buf |= b << a.bi_valid & 65535, f(a, a.bi_buf), a.bi_buf = b >> V - a.bi_valid, a.bi_valid += c - V) : (a.bi_buf |= b << a.bi_valid & 65535, a.bi_valid += c)
            }

            function h(a, b, c) {
                g(a, c[2 * b], c[2 * b + 1])
            }

            function i(a, b) {
                var c = 0;
                do {
                    c |= 1 & a, a >>>= 1, c <<= 1
                } while (--b > 0);
                return c >>> 1
            }

            function j(a) {
                16 === a.bi_valid ? (f(a, a.bi_buf), a.bi_buf = 0, a.bi_valid = 0) : a.bi_valid >= 8 && (a.pending_buf[a.pending++] = 255 & a.bi_buf, a.bi_buf >>= 8, a.bi_valid -= 8)
            }

            function k(a, b) {
                var c, d, e, f, g, h, i = b.dyn_tree, j = b.max_code, k = b.stat_desc.static_tree,
                    l = b.stat_desc.has_stree, m = b.stat_desc.extra_bits, n = b.stat_desc.extra_base,
                    o = b.stat_desc.max_length, p = 0;
                for (f = 0; f <= U; f++) a.bl_count[f] = 0;
                for (i[2 * a.heap[a.heap_max] + 1] = 0, c = a.heap_max + 1; c < T; c++) d = a.heap[c], f = i[2 * i[2 * d + 1] + 1] + 1, f > o && (f = o, p++), i[2 * d + 1] = f, d > j || (a.bl_count[f]++, g = 0, d >= n && (g = m[d - n]), h = i[2 * d], a.opt_len += h * (f + g), l && (a.static_len += h * (k[2 * d + 1] + g)));
                if (0 !== p) {
                    do {
                        for (f = o - 1; 0 === a.bl_count[f];) f--;
                        a.bl_count[f]--, a.bl_count[f + 1] += 2, a.bl_count[o]--, p -= 2
                    } while (p > 0);
                    for (f = o; 0 !== f; f--) for (d = a.bl_count[f]; 0 !== d;) (e = a.heap[--c]) > j || (i[2 * e + 1] !== f && (a.opt_len += (f - i[2 * e + 1]) * i[2 * e], i[2 * e + 1] = f), d--)
                }
            }

            function l(a, b, c) {
                var d, e, f = new Array(U + 1), g = 0;
                for (d = 1; d <= U; d++) f[d] = g = g + c[d - 1] << 1;
                for (e = 0; e <= b; e++) {
                    var h = a[2 * e + 1];
                    0 !== h && (a[2 * e] = i(f[h]++, h))
                }
            }

            function m() {
                var a, b, c, d, e, f = new Array(U + 1);
                for (c = 0, d = 0; d < O - 1; d++) for (ia[d] = c, a = 0; a < 1 << _[d]; a++) ha[c++] = d;
                for (ha[c - 1] = d, e = 0, d = 0; d < 16; d++) for (ja[d] = e, a = 0; a < 1 << aa[d]; a++) ga[e++] = d;
                for (e >>= 7; d < R; d++) for (ja[d] = e << 7, a = 0; a < 1 << aa[d] - 7; a++) ga[256 + e++] = d;
                for (b = 0; b <= U; b++) f[b] = 0;
                for (a = 0; a <= 143;) ea[2 * a + 1] = 8, a++, f[8]++;
                for (; a <= 255;) ea[2 * a + 1] = 9, a++, f[9]++;
                for (; a <= 279;) ea[2 * a + 1] = 7, a++, f[7]++;
                for (; a <= 287;) ea[2 * a + 1] = 8, a++, f[8]++;
                for (l(ea, Q + 1, f), a = 0; a < R; a++) fa[2 * a + 1] = 5, fa[2 * a] = i(a, 5);
                ka = new na(ea, _, P + 1, Q, U), la = new na(fa, aa, 0, R, U), ma = new na(new Array(0), ba, 0, S, W)
            }

            function n(a) {
                var b;
                for (b = 0; b < Q; b++) a.dyn_ltree[2 * b] = 0;
                for (b = 0; b < R; b++) a.dyn_dtree[2 * b] = 0;
                for (b = 0; b < S; b++) a.bl_tree[2 * b] = 0;
                a.dyn_ltree[2 * X] = 1, a.opt_len = a.static_len = 0, a.last_lit = a.matches = 0
            }

            function o(a) {
                a.bi_valid > 8 ? f(a, a.bi_buf) : a.bi_valid > 0 && (a.pending_buf[a.pending++] = a.bi_buf), a.bi_buf = 0, a.bi_valid = 0
            }

            function p(a, b, c, d) {
                o(a), d && (f(a, c), f(a, ~c)), E.arraySet(a.pending_buf, a.window, b, c, a.pending), a.pending += c
            }

            function q(a, b, c, d) {
                var e = 2 * b, f = 2 * c;
                return a[e] < a[f] || a[e] === a[f] && d[b] <= d[c]
            }

            function r(a, b, c) {
                for (var d = a.heap[c], e = c << 1; e <= a.heap_len && (e < a.heap_len && q(b, a.heap[e + 1], a.heap[e], a.depth) && e++, !q(b, d, a.heap[e], a.depth));) a.heap[c] = a.heap[e], c = e, e <<= 1;
                a.heap[c] = d
            }

            function s(a, b, c) {
                var d, f, i, j, k = 0;
                if (0 !== a.last_lit) do {
                    d = a.pending_buf[a.d_buf + 2 * k] << 8 | a.pending_buf[a.d_buf + 2 * k + 1], f = a.pending_buf[a.l_buf + k], k++, 0 === d ? h(a, f, b) : (i = ha[f], h(a, i + P + 1, b), j = _[i], 0 !== j && (f -= ia[i], g(a, f, j)), d--, i = e(d), h(a, i, c), 0 !== (j = aa[i]) && (d -= ja[i], g(a, d, j)))
                } while (k < a.last_lit);
                h(a, X, b)
            }

            function t(a, b) {
                var c, d, e, f = b.dyn_tree, g = b.stat_desc.static_tree, h = b.stat_desc.has_stree,
                    i = b.stat_desc.elems, j = -1;
                for (a.heap_len = 0, a.heap_max = T, c = 0; c < i; c++) 0 !== f[2 * c] ? (a.heap[++a.heap_len] = j = c, a.depth[c] = 0) : f[2 * c + 1] = 0;
                for (; a.heap_len < 2;) e = a.heap[++a.heap_len] = j < 2 ? ++j : 0, f[2 * e] = 1, a.depth[e] = 0, a.opt_len--, h && (a.static_len -= g[2 * e + 1]);
                for (b.max_code = j, c = a.heap_len >> 1; c >= 1; c--) r(a, f, c);
                e = i;
                do {
                    c = a.heap[1], a.heap[1] = a.heap[a.heap_len--], r(a, f, 1), d = a.heap[1], a.heap[--a.heap_max] = c, a.heap[--a.heap_max] = d, f[2 * e] = f[2 * c] + f[2 * d], a.depth[e] = (a.depth[c] >= a.depth[d] ? a.depth[c] : a.depth[d]) + 1, f[2 * c + 1] = f[2 * d + 1] = e, a.heap[1] = e++, r(a, f, 1)
                } while (a.heap_len >= 2);
                a.heap[--a.heap_max] = a.heap[1], k(a, b), l(f, j, a.bl_count)
            }

            function u(a, b, c) {
                var d, e, f = -1, g = b[1], h = 0, i = 7, j = 4;
                for (0 === g && (i = 138, j = 3), b[2 * (c + 1) + 1] = 65535, d = 0; d <= c; d++) e = g, g = b[2 * (d + 1) + 1], ++h < i && e === g || (h < j ? a.bl_tree[2 * e] += h : 0 !== e ? (e !== f && a.bl_tree[2 * e]++, a.bl_tree[2 * Y]++) : h <= 10 ? a.bl_tree[2 * Z]++ : a.bl_tree[2 * $]++, h = 0, f = e, 0 === g ? (i = 138, j = 3) : e === g ? (i = 6, j = 3) : (i = 7, j = 4))
            }

            function v(a, b, c) {
                var d, e, f = -1, i = b[1], j = 0, k = 7, l = 4;
                for (0 === i && (k = 138, l = 3), d = 0; d <= c; d++) if (e = i, i = b[2 * (d + 1) + 1], !(++j < k && e === i)) {
                    if (j < l) do {
                        h(a, e, a.bl_tree)
                    } while (0 != --j); else 0 !== e ? (e !== f && (h(a, e, a.bl_tree), j--), h(a, Y, a.bl_tree), g(a, j - 3, 2)) : j <= 10 ? (h(a, Z, a.bl_tree), g(a, j - 3, 3)) : (h(a, $, a.bl_tree), g(a, j - 11, 7));
                    j = 0, f = e, 0 === i ? (k = 138, l = 3) : e === i ? (k = 6, l = 3) : (k = 7, l = 4)
                }
            }

            function w(a) {
                var b;
                for (u(a, a.dyn_ltree, a.l_desc.max_code), u(a, a.dyn_dtree, a.d_desc.max_code), t(a, a.bl_desc), b = S - 1; b >= 3 && 0 === a.bl_tree[2 * ca[b] + 1]; b--) ;
                return a.opt_len += 3 * (b + 1) + 5 + 5 + 4, b
            }

            function x(a, b, c, d) {
                var e;
                for (g(a, b - 257, 5), g(a, c - 1, 5), g(a, d - 4, 4), e = 0; e < d; e++) g(a, a.bl_tree[2 * ca[e] + 1], 3);
                v(a, a.dyn_ltree, b - 1), v(a, a.dyn_dtree, c - 1)
            }

            function y(a) {
                var b, c = 4093624447;
                for (b = 0; b <= 31; b++, c >>>= 1) if (1 & c && 0 !== a.dyn_ltree[2 * b]) return G;
                if (0 !== a.dyn_ltree[18] || 0 !== a.dyn_ltree[20] || 0 !== a.dyn_ltree[26]) return H;
                for (b = 32; b < P; b++) if (0 !== a.dyn_ltree[2 * b]) return H;
                return G
            }

            function z(a) {
                pa || (m(), pa = !0), a.l_desc = new oa(a.dyn_ltree, ka), a.d_desc = new oa(a.dyn_dtree, la), a.bl_desc = new oa(a.bl_tree, ma), a.bi_buf = 0, a.bi_valid = 0, n(a)
            }

            function A(a, b, c, d) {
                g(a, (J << 1) + (d ? 1 : 0), 3), p(a, b, c, !0)
            }

            function B(a) {
                g(a, K << 1, 3), h(a, X, ea), j(a)
            }

            function C(a, b, c, d) {
                var e, f, h = 0;
                a.level > 0 ? (a.strm.data_type === I && (a.strm.data_type = y(a)), t(a, a.l_desc), t(a, a.d_desc), h = w(a), e = a.opt_len + 3 + 7 >>> 3, (f = a.static_len + 3 + 7 >>> 3) <= e && (e = f)) : e = f = c + 5, c + 4 <= e && -1 !== b ? A(a, b, c, d) : a.strategy === F || f === e ? (g(a, (K << 1) + (d ? 1 : 0), 3), s(a, ea, fa)) : (g(a, (L << 1) + (d ? 1 : 0), 3), x(a, a.l_desc.max_code + 1, a.d_desc.max_code + 1, h + 1), s(a, a.dyn_ltree, a.dyn_dtree)), n(a), d && o(a)
            }

            function D(a, b, c) {
                return a.pending_buf[a.d_buf + 2 * a.last_lit] = b >>> 8 & 255, a.pending_buf[a.d_buf + 2 * a.last_lit + 1] = 255 & b, a.pending_buf[a.l_buf + a.last_lit] = 255 & c, a.last_lit++, 0 === b ? a.dyn_ltree[2 * c]++ : (a.matches++, b--, a.dyn_ltree[2 * (ha[c] + P + 1)]++, a.dyn_dtree[2 * e(b)]++), a.last_lit === a.lit_bufsize - 1
            }

            var E = a("../utils/common"), F = 4, G = 0, H = 1, I = 2, J = 0, K = 1, L = 2, M = 3, N = 258, O = 29,
                P = 256, Q = P + 1 + O, R = 30, S = 19, T = 2 * Q + 1, U = 15, V = 16, W = 7, X = 256, Y = 16, Z = 17,
                $ = 18, _ = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
                aa = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
                ba = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
                ca = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], da = 512,
                ea = new Array(2 * (Q + 2));
            d(ea);
            var fa = new Array(2 * R);
            d(fa);
            var ga = new Array(da);
            d(ga);
            var ha = new Array(N - M + 1);
            d(ha);
            var ia = new Array(O);
            d(ia);
            var ja = new Array(R);
            d(ja);
            var ka, la, ma, na = function (a, b, c, d, e) {
                this.static_tree = a, this.extra_bits = b, this.extra_base = c, this.elems = d, this.max_length = e, this.has_stree = a && a.length
            }, oa = function (a, b) {
                this.dyn_tree = a, this.max_code = 0, this.stat_desc = b
            }, pa = !1;
            c._tr_init = z, c._tr_stored_block = A, c._tr_flush_block = C, c._tr_tally = D, c._tr_align = B
        }, {"../utils/common": 27}],
        39: [function (a, b, c) {
            "use strict";

            function d() {
                this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
            }

            b.exports = d
        }, {}]
    }, {}, [9])(9)
});
var XLSX = {};
"undefined" != typeof exports ? make_xlsx_lib(exports) : "undefined" != typeof module && module.exports ? make_xlsx_lib(module.exports) : "function" == typeof define && define.amd ? define("xlsx", function () {
    return XLSX.version || make_xlsx_lib(XLSX), XLSX
}) : make_xlsx_lib(XLSX);
var XLS = XLSX, ODS = XLSX;
!function (a) {
    "use strict";

    function b(a) {
        switch (typeof a) {
            case"undefined":
                return "undefined";
            case"boolean":
                return "boolean";
            case"number":
                return "number";
            case"string":
                return "string";
            default:
                return null === a ? "null" : "object"
        }
    }

    function c(a) {
        return Object.prototype.toString.call(a).replace(/^\[object *|\]$/g, "")
    }

    function d(a) {
        return "function" == typeof a
    }

    function e(a) {
        if (null === a || a === D) throw TypeError();
        return Object(a)
    }

    function f(a) {
        return a >> 0
    }

    function g(a) {
        return a >>> 0
    }

    function h(b) {
        function c(a) {
            Object.defineProperty(b, a, {
                get: function () {
                    return b._getter(a)
                }, set: function (c) {
                    b._setter(a, c)
                }, enumerable: !0, configurable: !1
            })
        }

        if (!("TYPED_ARRAY_POLYFILL_NO_ARRAY_ACCESSORS" in a)) {
            if (b.length > E) throw RangeError("Array too large for polyfill");
            var d;
            for (d = 0; d < b.length; d += 1) c(d)
        }
    }

    function i(a, b) {
        var c = 32 - b;
        return a << c >> c
    }

    function j(a, b) {
        var c = 32 - b;
        return a << c >>> c
    }

    function k(a) {
        return [255 & a]
    }

    function l(a) {
        return i(a[0], 8)
    }

    function m(a) {
        return [255 & a]
    }

    function n(a) {
        return j(a[0], 8)
    }

    function o(a) {
        return a = M(Number(a)), [a < 0 ? 0 : a > 255 ? 255 : 255 & a]
    }

    function p(a) {
        return [255 & a, a >> 8 & 255]
    }

    function q(a) {
        return i(a[1] << 8 | a[0], 16)
    }

    function r(a) {
        return [255 & a, a >> 8 & 255]
    }

    function s(a) {
        return j(a[1] << 8 | a[0], 16)
    }

    function t(a) {
        return [255 & a, a >> 8 & 255, a >> 16 & 255, a >> 24 & 255]
    }

    function u(a) {
        return i(a[3] << 24 | a[2] << 16 | a[1] << 8 | a[0], 32)
    }

    function v(a) {
        return [255 & a, a >> 8 & 255, a >> 16 & 255, a >> 24 & 255]
    }

    function w(a) {
        return j(a[3] << 24 | a[2] << 16 | a[1] << 8 | a[0], 32)
    }

    function x(a, b, c) {
        function d(a) {
            var b = H(a), c = a - b;
            return c < .5 ? b : c > .5 ? b + 1 : b % 2 ? b + 1 : b
        }

        var e, f, g, h = (1 << b - 1) - 1;
        if (a !== a) f = (1 << b) - 1, g = L(2, c - 1), e = 0; else if (a === 1 / 0 || a === -1 / 0) f = (1 << b) - 1, g = 0, e = a < 0 ? 1 : 0; else if (0 === a) f = 0, g = 0, e = 1 / a == -1 / 0 ? 1 : 0; else if (e = a < 0, (a = G(a)) >= L(2, 1 - h)) {
            f = K(H(I(a) / F), 1023);
            var i = a / L(2, f);
            i < 1 && (f -= 1, i *= 2), i >= 2 && (f += 1, i /= 2);
            var j = L(2, c);
            g = d(i * j) - j, f += h, g / j >= 1 && (f += 1, g = 0), f > 2 * h && (f = (1 << b) - 1, g = 0)
        } else f = 0, g = d(a / L(2, 1 - h - c));
        var k, l = [];
        for (k = c; k; k -= 1) l.push(g % 2 ? 1 : 0), g = H(g / 2);
        for (k = b; k; k -= 1) l.push(f % 2 ? 1 : 0), f = H(f / 2);
        l.push(e ? 1 : 0), l.reverse();
        for (var m = l.join(""), n = []; m.length;) n.unshift(parseInt(m.substring(0, 8), 2)), m = m.substring(8);
        return n
    }

    function y(a, b, c) {
        var d, e, f, g, h, i, j, k, l = [];
        for (d = 0; d < a.length; ++d) for (f = a[d], e = 8; e; e -= 1) l.push(f % 2 ? 1 : 0), f >>= 1;
        return l.reverse(), g = l.join(""), h = (1 << b - 1) - 1, i = parseInt(g.substring(0, 1), 2) ? -1 : 1, j = parseInt(g.substring(1, 1 + b), 2), k = parseInt(g.substring(1 + b), 2), j === (1 << b) - 1 ? 0 !== k ? NaN : i * (1 / 0) : j > 0 ? i * L(2, j - h) * (1 + k / L(2, c)) : 0 !== k ? i * L(2, -(h - 1)) * (k / L(2, c)) : i < 0 ? -0 : 0
    }

    function z(a) {
        return y(a, 11, 52)
    }

    function A(a) {
        return x(a, 11, 52)
    }

    function B(a) {
        return y(a, 8, 23)
    }

    function C(a) {
        return x(a, 8, 23)
    }

    var D = void 0, E = 1e5, F = Math.LN2, G = Math.abs, H = Math.floor, I = Math.log, J = Math.max, K = Math.min,
        L = Math.pow, M = Math.round;
    !function () {
        var a = Object.defineProperty, b = !function () {
            try {
                return Object.defineProperty({}, "x", {})
            } catch (a) {
                return !1
            }
        }();
        a && !b || (Object.defineProperty = function (b, c, d) {
            if (a) try {
                return a(b, c, d)
            } catch (a) {
            }
            if (b !== Object(b)) throw TypeError("Object.defineProperty called on non-object");
            return Object.prototype.__defineGetter__ && "get" in d && Object.prototype.__defineGetter__.call(b, c, d.get), Object.prototype.__defineSetter__ && "set" in d && Object.prototype.__defineSetter__.call(b, c, d.set), "value" in d && (b[c] = d.value), b
        })
    }(), function () {
        function i(a) {
            if ((a = f(a)) < 0) throw RangeError("ArrayBuffer size is not a small enough positive integer.");
            Object.defineProperty(this, "byteLength", {value: a}), Object.defineProperty(this, "_bytes", {value: Array(a)});
            for (var b = 0; b < a; b += 1) this._bytes[b] = 0
        }

        function j() {
            if (!arguments.length || "object" != typeof arguments[0]) return function (a) {
                if ((a = f(a)) < 0) throw RangeError("length is not a small enough positive integer.");
                Object.defineProperty(this, "length", {value: a}), Object.defineProperty(this, "byteLength", {value: a * this.BYTES_PER_ELEMENT}), Object.defineProperty(this, "buffer", {value: new i(this.byteLength)}), Object.defineProperty(this, "byteOffset", {value: 0})
            }.apply(this, arguments);
            if (arguments.length >= 1 && "object" === b(arguments[0]) && arguments[0] instanceof j) return function (a) {
                if (this.constructor !== a.constructor) throw TypeError();
                var b = a.length * this.BYTES_PER_ELEMENT;
                Object.defineProperty(this, "buffer", {value: new i(b)}), Object.defineProperty(this, "byteLength", {value: b}), Object.defineProperty(this, "byteOffset", {value: 0}), Object.defineProperty(this, "length", {value: a.length});
                for (var c = 0; c < this.length; c += 1) this._setter(c, a._getter(c))
            }.apply(this, arguments);
            if (arguments.length >= 1 && "object" === b(arguments[0]) && !(arguments[0] instanceof j) && !(arguments[0] instanceof i || "ArrayBuffer" === c(arguments[0]))) return function (a) {
                var b = a.length * this.BYTES_PER_ELEMENT;
                Object.defineProperty(this, "buffer", {value: new i(b)}), Object.defineProperty(this, "byteLength", {value: b}), Object.defineProperty(this, "byteOffset", {value: 0}), Object.defineProperty(this, "length", {value: a.length});
                for (var c = 0; c < this.length; c += 1) {
                    var d = a[c];
                    this._setter(c, Number(d))
                }
            }.apply(this, arguments);
            if (arguments.length >= 1 && "object" === b(arguments[0]) && (arguments[0] instanceof i || "ArrayBuffer" === c(arguments[0]))) return function (a, b, c) {
                if ((b = g(b)) > a.byteLength) throw RangeError("byteOffset out of range");
                if (b % this.BYTES_PER_ELEMENT) throw RangeError("buffer length minus the byteOffset is not a multiple of the element size.");
                if (c === D) {
                    var d = a.byteLength - b;
                    if (d % this.BYTES_PER_ELEMENT) throw RangeError("length of buffer minus byteOffset not a multiple of the element size");
                    c = d / this.BYTES_PER_ELEMENT
                } else c = g(c), d = c * this.BYTES_PER_ELEMENT;
                if (b + d > a.byteLength) throw RangeError("byteOffset and length reference an area beyond the end of the buffer");
                Object.defineProperty(this, "buffer", {value: a}), Object.defineProperty(this, "byteLength", {value: d}), Object.defineProperty(this, "byteOffset", {value: b}), Object.defineProperty(this, "length", {value: c})
            }.apply(this, arguments);
            throw TypeError()
        }

        function x(a, b, c) {
            var d = function () {
                Object.defineProperty(this, "constructor", {value: d}), j.apply(this, arguments), h(this)
            };
            "__proto__" in d ? d.__proto__ = j : (d.from = j.from, d.of = j.of), d.BYTES_PER_ELEMENT = a;
            var e = function () {
            };
            return e.prototype = y, d.prototype = new e, Object.defineProperty(d.prototype, "BYTES_PER_ELEMENT", {value: a}), Object.defineProperty(d.prototype, "_pack", {value: b}), Object.defineProperty(d.prototype, "_unpack", {value: c}), d
        }

        a.ArrayBuffer = a.ArrayBuffer || i, Object.defineProperty(j, "from", {
            value: function (a) {
                return new this(a)
            }
        }), Object.defineProperty(j, "of", {
            value: function () {
                return new this(arguments)
            }
        });
        var y = {};
        j.prototype = y, Object.defineProperty(j.prototype, "_getter", {
            value: function (a) {
                if (arguments.length < 1) throw SyntaxError("Not enough arguments");
                if ((a = g(a)) >= this.length) return D;
                var b, c, d = [];
                for (b = 0, c = this.byteOffset + a * this.BYTES_PER_ELEMENT; b < this.BYTES_PER_ELEMENT; b += 1, c += 1) d.push(this.buffer._bytes[c]);
                return this._unpack(d)
            }
        }), Object.defineProperty(j.prototype, "get", {value: j.prototype._getter}), Object.defineProperty(j.prototype, "_setter", {
            value: function (a, b) {
                if (arguments.length < 2) throw SyntaxError("Not enough arguments");
                if (!((a = g(a)) >= this.length)) {
                    var c, d, e = this._pack(b);
                    for (c = 0, d = this.byteOffset + a * this.BYTES_PER_ELEMENT; c < this.BYTES_PER_ELEMENT; c += 1, d += 1) this.buffer._bytes[d] = e[c]
                }
            }
        }), Object.defineProperty(j.prototype, "constructor", {value: j}), Object.defineProperty(j.prototype, "copyWithin", {
            value: function (a, b) {
                var c = arguments[2], d = e(this), h = d.length, i = g(h);
                i = J(i, 0);
                var j, k = f(a);
                j = k < 0 ? J(i + k, 0) : K(k, i);
                var l, m = f(b);
                l = m < 0 ? J(i + m, 0) : K(m, i);
                var n;
                n = c === D ? i : f(c);
                var o;
                o = n < 0 ? J(i + n, 0) : K(n, i);
                var p, q = K(o - l, i - j);
                for (l < j && j < l + q ? (p = -1, l = l + q - 1, j = j + q - 1) : p = 1; q > 0;) d._setter(j, d._getter(l)), l += p, j += p, q -= 1;
                return d
            }
        }), Object.defineProperty(j.prototype, "every", {
            value: function (a) {
                if (this === D || null === this) throw TypeError();
                var b = Object(this), c = g(b.length);
                if (!d(a)) throw TypeError();
                for (var e = arguments[1], f = 0; f < c; f++) if (!a.call(e, b._getter(f), f, b)) return !1;
                return !0
            }
        }), Object.defineProperty(j.prototype, "fill", {
            value: function (a) {
                var b = arguments[1], c = arguments[2], d = e(this), h = d.length, i = g(h);
                i = J(i, 0);
                var j, k = f(b);
                j = k < 0 ? J(i + k, 0) : K(k, i);
                var l;
                l = c === D ? i : f(c);
                var m;
                for (m = l < 0 ? J(i + l, 0) : K(l, i); j < m;) d._setter(j, a), j += 1;
                return d
            }
        }), Object.defineProperty(j.prototype, "filter", {
            value: function (a) {
                if (this === D || null === this) throw TypeError();
                var b = Object(this), c = g(b.length);
                if (!d(a)) throw TypeError();
                for (var e = [], f = arguments[1], h = 0; h < c; h++) {
                    var i = b._getter(h);
                    a.call(f, i, h, b) && e.push(i)
                }
                return new this.constructor(e)
            }
        }), Object.defineProperty(j.prototype, "find", {
            value: function (a) {
                var b = e(this), c = b.length, f = g(c);
                if (!d(a)) throw TypeError();
                for (var h = arguments.length > 1 ? arguments[1] : D, i = 0; i < f;) {
                    var j = b._getter(i), k = a.call(h, j, i, b);
                    if (Boolean(k)) return j;
                    ++i
                }
                return D
            }
        }), Object.defineProperty(j.prototype, "findIndex", {
            value: function (a) {
                var b = e(this), c = b.length, f = g(c);
                if (!d(a)) throw TypeError();
                for (var h = arguments.length > 1 ? arguments[1] : D, i = 0; i < f;) {
                    var j = b._getter(i), k = a.call(h, j, i, b);
                    if (Boolean(k)) return i;
                    ++i
                }
                return -1
            }
        }), Object.defineProperty(j.prototype, "forEach", {
            value: function (a) {
                if (this === D || null === this) throw TypeError();
                var b = Object(this), c = g(b.length);
                if (!d(a)) throw TypeError();
                for (var e = arguments[1], f = 0; f < c; f++) a.call(e, b._getter(f), f, b)
            }
        }), Object.defineProperty(j.prototype, "indexOf", {
            value: function (a) {
                if (this === D || null === this) throw TypeError();
                var b = Object(this), c = g(b.length);
                if (0 === c) return -1;
                var d = 0;
                if (arguments.length > 0 && (d = Number(arguments[1]), d !== d ? d = 0 : 0 !== d && d !== 1 / 0 && d !== -1 / 0 && (d = (d > 0 || -1) * H(G(d)))), d >= c) return -1;
                for (var e = d >= 0 ? d : J(c - G(d), 0); e < c; e++) if (b._getter(e) === a) return e;
                return -1
            }
        }), Object.defineProperty(j.prototype, "join", {
            value: function (a) {
                if (this === D || null === this) throw TypeError();
                for (var b = Object(this), c = g(b.length), d = Array(c), e = 0; e < c; ++e) d[e] = b._getter(e);
                return d.join(a === D ? "," : a)
            }
        }), Object.defineProperty(j.prototype, "lastIndexOf", {
            value: function (a) {
                if (this === D || null === this) throw TypeError();
                var b = Object(this), c = g(b.length);
                if (0 === c) return -1;
                var d = c;
                arguments.length > 1 && (d = Number(arguments[1]), d !== d ? d = 0 : 0 !== d && d !== 1 / 0 && d !== -1 / 0 && (d = (d > 0 || -1) * H(G(d))));
                for (var e = d >= 0 ? K(d, c - 1) : c - G(d); e >= 0; e--) if (b._getter(e) === a) return e;
                return -1
            }
        }), Object.defineProperty(j.prototype, "map", {
            value: function (a) {
                if (this === D || null === this) throw TypeError();
                var b = Object(this), c = g(b.length);
                if (!d(a)) throw TypeError();
                var e = [];
                e.length = c;
                for (var f = arguments[1], h = 0; h < c; h++) e[h] = a.call(f, b._getter(h), h, b);
                return new this.constructor(e)
            }
        }), Object.defineProperty(j.prototype, "reduce", {
            value: function (a) {
                if (this === D || null === this) throw TypeError();
                var b = Object(this), c = g(b.length);
                if (!d(a)) throw TypeError();
                if (0 === c && 1 === arguments.length) throw TypeError();
                var e, f = 0;
                for (e = arguments.length >= 2 ? arguments[1] : b._getter(f++); f < c;) e = a.call(D, e, b._getter(f), f, b), f++;
                return e
            }
        }), Object.defineProperty(j.prototype, "reduceRight", {
            value: function (a) {
                if (this === D || null === this) throw TypeError();
                var b = Object(this), c = g(b.length);
                if (!d(a)) throw TypeError();
                if (0 === c && 1 === arguments.length) throw TypeError();
                var e, f = c - 1;
                for (e = arguments.length >= 2 ? arguments[1] : b._getter(f--); f >= 0;) e = a.call(D, e, b._getter(f), f, b), f--;
                return e
            }
        }), Object.defineProperty(j.prototype, "reverse", {
            value: function () {
                if (this === D || null === this) throw TypeError();
                for (var a = Object(this), b = g(a.length), c = H(b / 2), d = 0, e = b - 1; d < c; ++d, --e) {
                    var f = a._getter(d);
                    a._setter(d, a._getter(e)), a._setter(e, f)
                }
                return a
            }
        }), Object.defineProperty(j.prototype, "set", {
            value: function (a, b) {
                if (arguments.length < 1) throw SyntaxError("Not enough arguments");
                var c, d, e, f, h, i, j, k, l, m;
                if ("object" == typeof arguments[0] && arguments[0].constructor === this.constructor) {
                    if (c = arguments[0], (e = g(arguments[1])) + c.length > this.length) throw RangeError("Offset plus length of array is out of range");
                    if (k = this.byteOffset + e * this.BYTES_PER_ELEMENT, l = c.length * this.BYTES_PER_ELEMENT, c.buffer === this.buffer) {
                        for (m = [], h = 0, i = c.byteOffset; h < l; h += 1, i += 1) m[h] = c.buffer._bytes[i];
                        for (h = 0, j = k; h < l; h += 1, j += 1) this.buffer._bytes[j] = m[h]
                    } else for (h = 0, i = c.byteOffset, j = k; h < l; h += 1, i += 1, j += 1) this.buffer._bytes[j] = c.buffer._bytes[i]
                } else {
                    if ("object" != typeof arguments[0] || void 0 === arguments[0].length) throw TypeError("Unexpected argument type(s)");
                    if (d = arguments[0], f = g(d.length), (e = g(arguments[1])) + f > this.length) throw RangeError("Offset plus length of array is out of range");
                    for (h = 0; h < f; h += 1) i = d[h], this._setter(e + h, Number(i))
                }
            }
        }), Object.defineProperty(j.prototype, "slice", {
            value: function (a, b) {
                for (var c = e(this), d = c.length, h = g(d), i = f(a), j = i < 0 ? J(h + i, 0) : K(i, h), k = b === D ? h : f(b), l = k < 0 ? J(h + k, 0) : K(k, h), m = l - j, n = c.constructor, o = new n(m), p = 0; j < l;) {
                    var q = c._getter(j);
                    o._setter(p, q), ++j, ++p
                }
                return o
            }
        }), Object.defineProperty(j.prototype, "some", {
            value: function (a) {
                if (this === D || null === this) throw TypeError();
                var b = Object(this), c = g(b.length);
                if (!d(a)) throw TypeError();
                for (var e = arguments[1], f = 0; f < c; f++) if (a.call(e, b._getter(f), f, b)) return !0;
                return !1
            }
        }), Object.defineProperty(j.prototype, "sort", {
            value: function (a) {
                function b(b, c) {
                    return b !== b && c !== c ? 0 : b !== b ? 1 : c !== c ? -1 : a !== D ? a(b, c) : b < c ? -1 : b > c ? 1 : 0
                }

                if (this === D || null === this) throw TypeError();
                for (var c = Object(this), d = g(c.length), e = Array(d), f = 0; f < d; ++f) e[f] = c._getter(f);
                for (e.sort(b), f = 0; f < d; ++f) c._setter(f, e[f]);
                return c
            }
        }), Object.defineProperty(j.prototype, "subarray", {
            value: function (a, b) {
                function c(a, b, c) {
                    return a < b ? b : a > c ? c : a
                }

                a = f(a), b = f(b), arguments.length < 1 && (a = 0), arguments.length < 2 && (b = this.length), a < 0 && (a = this.length + a), b < 0 && (b = this.length + b), a = c(a, 0, this.length), b = c(b, 0, this.length);
                var d = b - a;
                return d < 0 && (d = 0), new this.constructor(this.buffer, this.byteOffset + a * this.BYTES_PER_ELEMENT, d)
            }
        });
        var E = x(1, k, l), F = x(1, m, n), I = x(1, o, n), L = x(2, p, q), M = x(2, r, s), N = x(4, t, u),
            O = x(4, v, w), P = x(4, C, B), Q = x(8, A, z);
        a.Int8Array = a.Int8Array || E, a.Uint8Array = a.Uint8Array || F, a.Uint8ClampedArray = a.Uint8ClampedArray || I, a.Int16Array = a.Int16Array || L, a.Uint16Array = a.Uint16Array || M, a.Int32Array = a.Int32Array || N, a.Uint32Array = a.Uint32Array || O, a.Float32Array = a.Float32Array || P, a.Float64Array = a.Float64Array || Q
    }(), function () {
        function b(a, b) {
            return d(a.get) ? a.get(b) : a[b]
        }

        function e(a, b, d) {
            if (!(a instanceof ArrayBuffer || "ArrayBuffer" === c(a))) throw TypeError();
            if ((b = g(b)) > a.byteLength) throw RangeError("byteOffset out of range");
            if (d = d === D ? a.byteLength - b : g(d), b + d > a.byteLength) throw RangeError("byteOffset and length reference an area beyond the end of the buffer");
            Object.defineProperty(this, "buffer", {value: a}), Object.defineProperty(this, "byteLength", {value: d}), Object.defineProperty(this, "byteOffset", {value: b})
        }

        function f(a) {
            return function (c, d) {
                if ((c = g(c)) + a.BYTES_PER_ELEMENT > this.byteLength) throw RangeError("Array index out of range");
                c += this.byteOffset;
                for (var e = new Uint8Array(this.buffer, c, a.BYTES_PER_ELEMENT), f = [], h = 0; h < a.BYTES_PER_ELEMENT; h += 1) f.push(b(e, h));
                return Boolean(d) === Boolean(i) && f.reverse(), b(new a(new Uint8Array(f).buffer), 0)
            }
        }

        function h(a) {
            return function (c, d, e) {
                if ((c = g(c)) + a.BYTES_PER_ELEMENT > this.byteLength) throw RangeError("Array index out of range");
                var f, h, j = new a([d]), k = new Uint8Array(j.buffer), l = [];
                for (f = 0; f < a.BYTES_PER_ELEMENT; f += 1) l.push(b(k, f));
                Boolean(e) === Boolean(i) && l.reverse(), h = new Uint8Array(this.buffer, c, a.BYTES_PER_ELEMENT), h.set(l)
            }
        }

        var i = function () {
            var a = new Uint16Array([4660]);
            return 18 === b(new Uint8Array(a.buffer), 0)
        }();
        Object.defineProperty(e.prototype, "getUint8", {value: f(Uint8Array)}), Object.defineProperty(e.prototype, "getInt8", {value: f(Int8Array)}), Object.defineProperty(e.prototype, "getUint16", {value: f(Uint16Array)}), Object.defineProperty(e.prototype, "getInt16", {value: f(Int16Array)}), Object.defineProperty(e.prototype, "getUint32", {value: f(Uint32Array)}), Object.defineProperty(e.prototype, "getInt32", {value: f(Int32Array)}), Object.defineProperty(e.prototype, "getFloat32", {value: f(Float32Array)}), Object.defineProperty(e.prototype, "getFloat64", {value: f(Float64Array)}), Object.defineProperty(e.prototype, "setUint8", {value: h(Uint8Array)}), Object.defineProperty(e.prototype, "setInt8", {value: h(Int8Array)}), Object.defineProperty(e.prototype, "setUint16", {value: h(Uint16Array)}), Object.defineProperty(e.prototype, "setInt16", {value: h(Int16Array)}), Object.defineProperty(e.prototype, "setUint32", {value: h(Uint32Array)}), Object.defineProperty(e.prototype, "setInt32", {value: h(Int32Array)}), Object.defineProperty(e.prototype, "setFloat32", {value: h(Float32Array)}), Object.defineProperty(e.prototype, "setFloat64", {value: h(Float64Array)}), a.DataView = a.DataView || e
    }()
}(self);