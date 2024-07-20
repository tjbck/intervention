var Ii = Object.defineProperty;
var ji = (e, t, i) =>
  t in e
    ? Ii(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
    : (e[t] = i);
var Un = (e, t, i) => ji(e, typeof t != "symbol" ? t + "" : t, i);
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) l(s);
  new MutationObserver((s) => {
    for (const c of s)
      if (c.type === "childList")
        for (const f of c.addedNodes)
          f.tagName === "LINK" && f.rel === "modulepreload" && l(f);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(s) {
    const c = {};
    return (
      s.integrity && (c.integrity = s.integrity),
      s.referrerPolicy && (c.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (c.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (c.credentials = "omit")
        : (c.credentials = "same-origin"),
      c
    );
  }
  function l(s) {
    if (s.ep) return;
    s.ep = !0;
    const c = i(s);
    fetch(s.href, c);
  }
})();
function Le() {}
function Ai(e, t) {
  for (const i in t) e[i] = t[i];
  return e;
}
function Ci(e) {
  return e();
}
function bi() {
  return Object.create(null);
}
function qt(e) {
  e.forEach(Ci);
}
function Di(e) {
  return typeof e == "function";
}
function Rt(e, t) {
  return e != e
    ? t == t
    : e !== t || (e && typeof e == "object") || typeof e == "function";
}
function Ni(e) {
  return Object.keys(e).length === 0;
}
function Pi(e, ...t) {
  if (e == null) {
    for (const l of t) l(void 0);
    return Le;
  }
  const i = e.subscribe(...t);
  return i.unsubscribe ? () => i.unsubscribe() : i;
}
function yi(e) {
  let t;
  return Pi(e, (i) => (t = i))(), t;
}
function Ri(e, t, i, l) {
  if (e) {
    const s = Ei(e, t, i, l);
    return e[0](s);
  }
}
function Ei(e, t, i, l) {
  return e[1] && l ? Ai(i.ctx.slice(), e[1](l(t))) : i.ctx;
}
function Yi(e, t, i, l) {
  if (e[2] && l) {
    const s = e[2](l(i));
    if (t.dirty === void 0) return s;
    if (typeof s == "object") {
      const c = [],
        f = Math.max(t.dirty.length, s.length);
      for (let m = 0; m < f; m += 1) c[m] = t.dirty[m] | s[m];
      return c;
    }
    return t.dirty | s;
  }
  return t.dirty;
}
function Ui(e, t, i, l, s, c) {
  if (s) {
    const f = Ei(t, i, l, c);
    e.p(f, s);
  }
}
function Wi(e) {
  if (e.ctx.length > 32) {
    const t = [],
      i = e.ctx.length / 32;
    for (let l = 0; l < i; l++) t[l] = -1;
    return t;
  }
  return -1;
}
function n(e, t) {
  e.appendChild(t);
}
function Qe(e, t, i) {
  e.insertBefore(t, i || null);
}
function Pe(e) {
  e.parentNode && e.parentNode.removeChild(e);
}
function u(e) {
  return document.createElement(e);
}
function Jn(e) {
  return document.createTextNode(e);
}
function a() {
  return Jn(" ");
}
function qi() {
  return Jn("");
}
function D(e, t, i, l) {
  return e.addEventListener(t, i, l), () => e.removeEventListener(t, i, l);
}
function zi(e) {
  return function (t) {
    return t.preventDefault(), e.call(this, t);
  };
}
function r(e, t, i) {
  i == null
    ? e.removeAttribute(t)
    : e.getAttribute(t) !== i && e.setAttribute(t, i);
}
function Ae(e, t, i) {
  const l = new Set();
  for (let s = 0; s < e.length; s += 1) e[s].checked && l.add(e[s].__value);
  return i || l.delete(t), Array.from(l);
}
function $t(e) {
  let t;
  return {
    p(...i) {
      (t = i), t.forEach((l) => e.push(l));
    },
    r() {
      t.forEach((i) => e.splice(e.indexOf(i), 1));
    },
  };
}
function Dn(e) {
  return e === "" ? null : +e;
}
function Fi(e) {
  return Array.from(e.childNodes);
}
function Bi(e, t) {
  (t = "" + t), e.data !== t && (e.data = t);
}
function O(e, t) {
  e.value = t ?? "";
}
function wi(e, t, i, l) {
  i == null ? e.style.removeProperty(t) : e.style.setProperty(t, i, "");
}
let Pt;
function Nt(e) {
  Pt = e;
}
function Qi() {
  if (!Pt) throw new Error("Function called outside component initialization");
  return Pt;
}
function Ti(e) {
  Qi().$$.on_mount.push(e);
}
const Dt = [],
  Fn = [];
let Et = [];
const xi = [],
  Ji = Promise.resolve();
let Bn = !1;
function Gi() {
  Bn || ((Bn = !0), Ji.then(Li));
}
function Qn(e) {
  Et.push(e);
}
const Wn = new Set();
let St = 0;
function Li() {
  if (St !== 0) return;
  const e = Pt;
  do {
    try {
      for (; St < Dt.length; ) {
        const t = Dt[St];
        St++, Nt(t), Vi(t.$$);
      }
    } catch (t) {
      throw ((Dt.length = 0), (St = 0), t);
    }
    for (Nt(null), Dt.length = 0, St = 0; Fn.length; ) Fn.pop()();
    for (let t = 0; t < Et.length; t += 1) {
      const i = Et[t];
      Wn.has(i) || (Wn.add(i), i());
    }
    Et.length = 0;
  } while (Dt.length);
  for (; xi.length; ) xi.pop()();
  (Bn = !1), Wn.clear(), Nt(e);
}
function Vi(e) {
  if (e.fragment !== null) {
    e.update(), qt(e.before_update);
    const t = e.dirty;
    (e.dirty = [-1]),
      e.fragment && e.fragment.p(e.ctx, t),
      e.after_update.forEach(Qn);
  }
}
function Zi(e) {
  const t = [],
    i = [];
  Et.forEach((l) => (e.indexOf(l) === -1 ? t.push(l) : i.push(l))),
    i.forEach((l) => l()),
    (Et = t);
}
const Cn = new Set();
let Ve;
function Ki() {
  Ve = { r: 0, c: [], p: Ve };
}
function Xi() {
  Ve.r || qt(Ve.c), (Ve = Ve.p);
}
function Ne(e, t) {
  e && e.i && (Cn.delete(e), e.i(t));
}
function Ze(e, t, i, l) {
  if (e && e.o) {
    if (Cn.has(e)) return;
    Cn.add(e),
      Ve.c.push(() => {
        Cn.delete(e), l && (i && e.d(1), l());
      }),
      e.o(t);
  } else l && l();
}
function Gn(e) {
  e && e.c();
}
function En(e, t, i) {
  const { fragment: l, after_update: s } = e.$$;
  l && l.m(t, i),
    Qn(() => {
      const c = e.$$.on_mount.map(Ci).filter(Di);
      e.$$.on_destroy ? e.$$.on_destroy.push(...c) : qt(c),
        (e.$$.on_mount = []);
    }),
    s.forEach(Qn);
}
function qn(e, t) {
  const i = e.$$;
  i.fragment !== null &&
    (Zi(i.after_update),
    qt(i.on_destroy),
    i.fragment && i.fragment.d(t),
    (i.on_destroy = i.fragment = null),
    (i.ctx = []));
}
function es(e, t) {
  e.$$.dirty[0] === -1 && (Dt.push(e), Gi(), e.$$.dirty.fill(0)),
    (e.$$.dirty[(t / 31) | 0] |= 1 << t % 31);
}
function Tn(e, t, i, l, s, c, f = null, m = [-1]) {
  const M = Pt;
  Nt(e);
  const w = (e.$$ = {
    fragment: null,
    ctx: [],
    props: c,
    update: Le,
    not_equal: s,
    bound: bi(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(t.context || (M ? M.$$.context : [])),
    callbacks: bi(),
    dirty: m,
    skip_bound: !1,
    root: t.target || M.$$.root,
  });
  f && f(w.root);
  let j = !1;
  if (
    ((w.ctx = i
      ? i(e, t.props || {}, (k, J, ...z) => {
          const R = z.length ? z[0] : J;
          return (
            w.ctx &&
              s(w.ctx[k], (w.ctx[k] = R)) &&
              (!w.skip_bound && w.bound[k] && w.bound[k](R), j && es(e, k)),
            J
          );
        })
      : []),
    w.update(),
    (j = !0),
    qt(w.before_update),
    (w.fragment = l ? l(w.ctx) : !1),
    t.target)
  ) {
    if (t.hydrate) {
      const k = Fi(t.target);
      w.fragment && w.fragment.l(k), k.forEach(Pe);
    } else w.fragment && w.fragment.c();
    t.intro && Ne(e.$$.fragment), En(e, t.target, t.anchor), Li();
  }
  Nt(M);
}
class Ln {
  constructor() {
    Un(this, "$$");
    Un(this, "$$set");
  }
  $destroy() {
    qn(this, 1), (this.$destroy = Le);
  }
  $on(t, i) {
    if (!Di(i)) return Le;
    const l = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return (
      l.push(i),
      () => {
        const s = l.indexOf(i);
        s !== -1 && l.splice(s, 1);
      }
    );
  }
  $set(t) {
    this.$$set &&
      !Ni(t) &&
      ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
  }
}
const ts = "4";
typeof window < "u" &&
  (window.__svelte || (window.__svelte = { v: new Set() })).v.add(ts);
function ki(e) {
  let t;
  return {
    c() {
      (t = u("div")),
        r(
          t,
          "class",
          "tw-fixed tw-top-0 tw-right-0 tw-left-0 tw-bottom-0 tw-w-full tw-min-h-screen tw-h-screen tw-flex tw-justify-center tw-z-[9999999999] tw-overflow-hidden tw-overscroll-contain tw-pointer-events-none"
        ),
        wi(t, "backdrop-filter", "grayscale(" + e[1] + ")");
    },
    m(i, l) {
      Qe(i, t, l);
    },
    p(i, l) {
      l & 2 && wi(t, "backdrop-filter", "grayscale(" + i[1] + ")");
    },
    d(i) {
      i && Pe(t);
    },
  };
}
function ns(e) {
  let t,
    i = e[0] && ki(e);
  return {
    c() {
      i && i.c(), (t = qi());
    },
    m(l, s) {
      i && i.m(l, s), Qe(l, t, s);
    },
    p(l, [s]) {
      l[0]
        ? i
          ? i.p(l, s)
          : ((i = ki(l)), i.c(), i.m(t.parentNode, t))
        : i && (i.d(1), (i = null));
    },
    i: Le,
    o: Le,
    d(l) {
      l && Pe(t), i && i.d(l);
    },
  };
}
function rs(e, t, i) {
  let { show: l = !1 } = t,
    { delta: s = 0.1 } = t,
    c = 0,
    f = null;
  return (
    Ti(() => {
      const m = (M) => {
        clearTimeout(f),
          (f = setTimeout(function () {
            i(1, (c = Math.min(1, c + s))), console.log("Grayscale", c);
          }, 50));
      };
      return (
        window.addEventListener("wheel", m),
        () => {
          window.removeEventListener("wheel", m);
        }
      );
    }),
    (e.$$set = (m) => {
      "show" in m && i(0, (l = m.show)), "delta" in m && i(2, (s = m.delta));
    }),
    [l, c, s]
  );
}
class is extends Ln {
  constructor(t) {
    super(), Tn(this, t, rs, ns, Rt, { show: 0, delta: 2 });
  }
}
var ss =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
function ls(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Hi = { exports: {} };
(function (e, t) {
  (function (i, l) {
    e.exports = l();
  })(ss, function () {
    var i = 1e3,
      l = 6e4,
      s = 36e5,
      c = "millisecond",
      f = "second",
      m = "minute",
      M = "hour",
      w = "day",
      j = "week",
      k = "month",
      J = "quarter",
      z = "year",
      R = "date",
      $e = "Invalid Date",
      Re =
        /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
      h =
        /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      p = {
        name: "en",
        weekdays:
          "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months:
          "January_February_March_April_May_June_July_August_September_October_November_December".split(
            "_"
          ),
        ordinal: function (b) {
          var o = ["th", "st", "nd", "rd"],
            d = b % 100;
          return "[" + b + (o[(d - 20) % 10] || o[d] || o[0]) + "]";
        },
      },
      $ = function (b, o, d) {
        var g = String(b);
        return !g || g.length >= o
          ? b
          : "" + Array(o + 1 - g.length).join(d) + b;
      },
      F = {
        s: $,
        z: function (b) {
          var o = -b.utcOffset(),
            d = Math.abs(o),
            g = Math.floor(d / 60),
            _ = d % 60;
          return (o <= 0 ? "+" : "-") + $(g, 2, "0") + ":" + $(_, 2, "0");
        },
        m: function b(o, d) {
          if (o.date() < d.date()) return -b(d, o);
          var g = 12 * (d.year() - o.year()) + (d.month() - o.month()),
            _ = o.clone().add(g, k),
            y = d - _ < 0,
            v = o.clone().add(g + (y ? -1 : 1), k);
          return +(-(g + (d - _) / (y ? _ - v : v - _)) || 0);
        },
        a: function (b) {
          return b < 0 ? Math.ceil(b) || 0 : Math.floor(b);
        },
        p: function (b) {
          return (
            { M: k, y: z, w: j, d: w, D: R, h: M, m, s: f, ms: c, Q: J }[b] ||
            String(b || "")
              .toLowerCase()
              .replace(/s$/, "")
          );
        },
        u: function (b) {
          return b === void 0;
        },
      },
      N = "en",
      T = {};
    T[N] = p;
    var G = "$isDayjsObject",
      U = function (b) {
        return b instanceof Se || !(!b || !b[G]);
      },
      Q = function b(o, d, g) {
        var _;
        if (!o) return N;
        if (typeof o == "string") {
          var y = o.toLowerCase();
          T[y] && (_ = y), d && ((T[y] = d), (_ = y));
          var v = o.split("-");
          if (!_ && v.length > 1) return b(v[0]);
        } else {
          var q = o.name;
          (T[q] = o), (_ = q);
        }
        return !g && _ && (N = _), _ || (!g && N);
      },
      C = function (b, o) {
        if (U(b)) return b.clone();
        var d = typeof o == "object" ? o : {};
        return (d.date = b), (d.args = arguments), new Se(d);
      },
      E = F;
    (E.l = Q),
      (E.i = U),
      (E.w = function (b, o) {
        return C(b, { locale: o.$L, utc: o.$u, x: o.$x, $offset: o.$offset });
      });
    var Se = (function () {
        function b(d) {
          (this.$L = Q(d.locale, null, !0)),
            this.parse(d),
            (this.$x = this.$x || d.x || {}),
            (this[G] = !0);
        }
        var o = b.prototype;
        return (
          (o.parse = function (d) {
            (this.$d = (function (g) {
              var _ = g.date,
                y = g.utc;
              if (_ === null) return new Date(NaN);
              if (E.u(_)) return new Date();
              if (_ instanceof Date) return new Date(_);
              if (typeof _ == "string" && !/Z$/i.test(_)) {
                var v = _.match(Re);
                if (v) {
                  var q = v[2] - 1 || 0,
                    L = (v[7] || "0").substring(0, 3);
                  return y
                    ? new Date(
                        Date.UTC(
                          v[1],
                          q,
                          v[3] || 1,
                          v[4] || 0,
                          v[5] || 0,
                          v[6] || 0,
                          L
                        )
                      )
                    : new Date(
                        v[1],
                        q,
                        v[3] || 1,
                        v[4] || 0,
                        v[5] || 0,
                        v[6] || 0,
                        L
                      );
                }
              }
              return new Date(_);
            })(d)),
              this.init();
          }),
          (o.init = function () {
            var d = this.$d;
            (this.$y = d.getFullYear()),
              (this.$M = d.getMonth()),
              (this.$D = d.getDate()),
              (this.$W = d.getDay()),
              (this.$H = d.getHours()),
              (this.$m = d.getMinutes()),
              (this.$s = d.getSeconds()),
              (this.$ms = d.getMilliseconds());
          }),
          (o.$utils = function () {
            return E;
          }),
          (o.isValid = function () {
            return this.$d.toString() !== $e;
          }),
          (o.isSame = function (d, g) {
            var _ = C(d);
            return this.startOf(g) <= _ && _ <= this.endOf(g);
          }),
          (o.isAfter = function (d, g) {
            return C(d) < this.startOf(g);
          }),
          (o.isBefore = function (d, g) {
            return this.endOf(g) < C(d);
          }),
          (o.$g = function (d, g, _) {
            return E.u(d) ? this[g] : this.set(_, d);
          }),
          (o.unix = function () {
            return Math.floor(this.valueOf() / 1e3);
          }),
          (o.valueOf = function () {
            return this.$d.getTime();
          }),
          (o.startOf = function (d, g) {
            var _ = this,
              y = !!E.u(g) || g,
              v = E.p(d),
              q = function (B, I) {
                var Ee = E.w(
                  _.$u ? Date.UTC(_.$y, I, B) : new Date(_.$y, I, B),
                  _
                );
                return y ? Ee : Ee.endOf(w);
              },
              L = function (B, I) {
                return E.w(
                  _.toDate()[B].apply(
                    _.toDate("s"),
                    (y ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(I)
                  ),
                  _
                );
              },
              P = this.$W,
              A = this.$M,
              H = this.$D,
              Ce = "set" + (this.$u ? "UTC" : "");
            switch (v) {
              case z:
                return y ? q(1, 0) : q(31, 11);
              case k:
                return y ? q(1, A) : q(0, A + 1);
              case j:
                var V = this.$locale().weekStart || 0,
                  De = (P < V ? P + 7 : P) - V;
                return q(y ? H - De : H + (6 - De), A);
              case w:
              case R:
                return L(Ce + "Hours", 0);
              case M:
                return L(Ce + "Minutes", 1);
              case m:
                return L(Ce + "Seconds", 2);
              case f:
                return L(Ce + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }),
          (o.endOf = function (d) {
            return this.startOf(d, !1);
          }),
          (o.$set = function (d, g) {
            var _,
              y = E.p(d),
              v = "set" + (this.$u ? "UTC" : ""),
              q = ((_ = {}),
              (_[w] = v + "Date"),
              (_[R] = v + "Date"),
              (_[k] = v + "Month"),
              (_[z] = v + "FullYear"),
              (_[M] = v + "Hours"),
              (_[m] = v + "Minutes"),
              (_[f] = v + "Seconds"),
              (_[c] = v + "Milliseconds"),
              _)[y],
              L = y === w ? this.$D + (g - this.$W) : g;
            if (y === k || y === z) {
              var P = this.clone().set(R, 1);
              P.$d[q](L),
                P.init(),
                (this.$d = P.set(R, Math.min(this.$D, P.daysInMonth())).$d);
            } else q && this.$d[q](L);
            return this.init(), this;
          }),
          (o.set = function (d, g) {
            return this.clone().$set(d, g);
          }),
          (o.get = function (d) {
            return this[E.p(d)]();
          }),
          (o.add = function (d, g) {
            var _,
              y = this;
            d = Number(d);
            var v = E.p(g),
              q = function (A) {
                var H = C(y);
                return E.w(H.date(H.date() + Math.round(A * d)), y);
              };
            if (v === k) return this.set(k, this.$M + d);
            if (v === z) return this.set(z, this.$y + d);
            if (v === w) return q(1);
            if (v === j) return q(7);
            var L = ((_ = {}), (_[m] = l), (_[M] = s), (_[f] = i), _)[v] || 1,
              P = this.$d.getTime() + d * L;
            return E.w(P, this);
          }),
          (o.subtract = function (d, g) {
            return this.add(-1 * d, g);
          }),
          (o.format = function (d) {
            var g = this,
              _ = this.$locale();
            if (!this.isValid()) return _.invalidDate || $e;
            var y = d || "YYYY-MM-DDTHH:mm:ssZ",
              v = E.z(this),
              q = this.$H,
              L = this.$m,
              P = this.$M,
              A = _.weekdays,
              H = _.months,
              Ce = _.meridiem,
              V = function (I, Ee, He, Ge) {
                return (I && (I[Ee] || I(g, y))) || He[Ee].slice(0, Ge);
              },
              De = function (I) {
                return E.s(q % 12 || 12, I, "0");
              },
              B =
                Ce ||
                function (I, Ee, He) {
                  var Ge = I < 12 ? "AM" : "PM";
                  return He ? Ge.toLowerCase() : Ge;
                };
            return y.replace(h, function (I, Ee) {
              return (
                Ee ||
                (function (He) {
                  switch (He) {
                    case "YY":
                      return String(g.$y).slice(-2);
                    case "YYYY":
                      return E.s(g.$y, 4, "0");
                    case "M":
                      return P + 1;
                    case "MM":
                      return E.s(P + 1, 2, "0");
                    case "MMM":
                      return V(_.monthsShort, P, H, 3);
                    case "MMMM":
                      return V(H, P);
                    case "D":
                      return g.$D;
                    case "DD":
                      return E.s(g.$D, 2, "0");
                    case "d":
                      return String(g.$W);
                    case "dd":
                      return V(_.weekdaysMin, g.$W, A, 2);
                    case "ddd":
                      return V(_.weekdaysShort, g.$W, A, 3);
                    case "dddd":
                      return A[g.$W];
                    case "H":
                      return String(q);
                    case "HH":
                      return E.s(q, 2, "0");
                    case "h":
                      return De(1);
                    case "hh":
                      return De(2);
                    case "a":
                      return B(q, L, !0);
                    case "A":
                      return B(q, L, !1);
                    case "m":
                      return String(L);
                    case "mm":
                      return E.s(L, 2, "0");
                    case "s":
                      return String(g.$s);
                    case "ss":
                      return E.s(g.$s, 2, "0");
                    case "SSS":
                      return E.s(g.$ms, 3, "0");
                    case "Z":
                      return v;
                  }
                  return null;
                })(I) ||
                v.replace(":", "")
              );
            });
          }),
          (o.utcOffset = function () {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }),
          (o.diff = function (d, g, _) {
            var y,
              v = this,
              q = E.p(g),
              L = C(d),
              P = (L.utcOffset() - this.utcOffset()) * l,
              A = this - L,
              H = function () {
                return E.m(v, L);
              };
            switch (q) {
              case z:
                y = H() / 12;
                break;
              case k:
                y = H();
                break;
              case J:
                y = H() / 3;
                break;
              case j:
                y = (A - P) / 6048e5;
                break;
              case w:
                y = (A - P) / 864e5;
                break;
              case M:
                y = A / s;
                break;
              case m:
                y = A / l;
                break;
              case f:
                y = A / i;
                break;
              default:
                y = A;
            }
            return _ ? y : E.a(y);
          }),
          (o.daysInMonth = function () {
            return this.endOf(k).$D;
          }),
          (o.$locale = function () {
            return T[this.$L];
          }),
          (o.locale = function (d, g) {
            if (!d) return this.$L;
            var _ = this.clone(),
              y = Q(d, g, !0);
            return y && (_.$L = y), _;
          }),
          (o.clone = function () {
            return E.w(this.$d, this);
          }),
          (o.toDate = function () {
            return new Date(this.valueOf());
          }),
          (o.toJSON = function () {
            return this.isValid() ? this.toISOString() : null;
          }),
          (o.toISOString = function () {
            return this.$d.toISOString();
          }),
          (o.toString = function () {
            return this.$d.toUTCString();
          }),
          b
        );
      })(),
      Je = Se.prototype;
    return (
      (C.prototype = Je),
      [
        ["$ms", c],
        ["$s", f],
        ["$m", m],
        ["$H", M],
        ["$W", w],
        ["$M", k],
        ["$y", z],
        ["$D", R],
      ].forEach(function (b) {
        Je[b[1]] = function (o) {
          return this.$g(o, b[0], b[1]);
        };
      }),
      (C.extend = function (b, o) {
        return b.$i || (b(o, Se, C), (b.$i = !0)), C;
      }),
      (C.locale = Q),
      (C.isDayjs = U),
      (C.unix = function (b) {
        return C(1e3 * b);
      }),
      (C.en = T[N]),
      (C.Ls = T),
      (C.p = {}),
      C
    );
  });
})(Hi);
var us = Hi.exports;
const as = ls(us),
  Ct = [];
function cs(e, t = Le) {
  let i;
  const l = new Set();
  function s(m) {
    if (Rt(e, m) && ((e = m), i)) {
      const M = !Ct.length;
      for (const w of l) w[1](), Ct.push(w, e);
      if (M) {
        for (let w = 0; w < Ct.length; w += 2) Ct[w][0](Ct[w + 1]);
        Ct.length = 0;
      }
    }
  }
  function c(m) {
    s(m(e));
  }
  function f(m, M = Le) {
    const w = [m, M];
    return (
      l.add(w),
      l.size === 1 && (i = t(s, c) || Le),
      m(e),
      () => {
        l.delete(w), l.size === 0 && i && (i(), (i = null));
      }
    );
  }
  return { set: s, update: c, subscribe: f };
}
const Mi = typeof document < "u";
function Oi(e) {
  const t = cs(e);
  function i(s) {
    Mi && t.set(s);
  }
  function l(s) {
    Mi && t.update(s);
  }
  return { subscribe: t.subscribe, set: i, update: l };
}
let $i = 0;
function os() {
  const e = Oi([]),
    t = Oi([]);
  function i(h) {
    e.update((p) => [h, ...p]);
  }
  function l(h) {
    var Q;
    const { message: p, ...$ } = h,
      F =
        typeof (h == null ? void 0 : h.id) == "number" ||
        (h.id && ((Q = h.id) == null ? void 0 : Q.length) > 0)
          ? h.id
          : $i++,
      N = h.dismissable === void 0 ? !0 : h.dismissable,
      T = h.type === void 0 ? "default" : h.type;
    return (
      yi(e).find((C) => C.id === F)
        ? e.update((C) =>
            C.map((E) =>
              E.id === F
                ? {
                    ...E,
                    ...h,
                    id: F,
                    title: p,
                    dismissable: N,
                    type: T,
                    updated: !0,
                  }
                : { ...E, updated: !1 }
            )
          )
        : i({ ...$, id: F, title: p, dismissable: N, type: T }),
      F
    );
  }
  function s(h) {
    if (h === void 0) {
      e.update((p) => p.map(($) => ({ ...$, dismiss: !0 })));
      return;
    }
    return (
      e.update((p) => p.map(($) => ($.id === h ? { ...$, dismiss: !0 } : $))), h
    );
  }
  function c(h) {
    if (h === void 0) {
      e.set([]);
      return;
    }
    return e.update((p) => p.filter(($) => $.id !== h)), h;
  }
  function f(h, p) {
    return l({ ...p, type: "default", message: h });
  }
  function m(h, p) {
    return l({ ...p, type: "error", message: h });
  }
  function M(h, p) {
    return l({ ...p, type: "success", message: h });
  }
  function w(h, p) {
    return l({ ...p, type: "info", message: h });
  }
  function j(h, p) {
    return l({ ...p, type: "warning", message: h });
  }
  function k(h, p) {
    return l({ ...p, type: "loading", message: h });
  }
  function J(h, p) {
    if (!p) return;
    let $;
    p.loading !== void 0 &&
      ($ = l({ ...p, promise: h, type: "loading", message: p.loading }));
    const F = h instanceof Promise ? h : h();
    let N = $ !== void 0;
    return (
      F.then((T) => {
        if (T && typeof T.ok == "boolean" && !T.ok) {
          N = !1;
          const G =
            typeof p.error == "function"
              ? p.error(`HTTP error! status: ${T.status}`)
              : p.error;
          l({ id: $, type: "error", message: G });
        } else if (p.success !== void 0) {
          N = !1;
          const G = typeof p.success == "function" ? p.success(T) : p.success;
          l({ id: $, type: "success", message: G });
        }
      })
        .catch((T) => {
          if (p.error !== void 0) {
            N = !1;
            const G = typeof p.error == "function" ? p.error(T) : p.error;
            l({ id: $, type: "error", message: G });
          }
        })
        .finally(() => {
          var T;
          N && (s($), ($ = void 0)), (T = p.finally) == null || T.call(p);
        }),
      $
    );
  }
  function z(h, p) {
    const $ = (p == null ? void 0 : p.id) || $i++;
    return l({ component: h, id: $, ...p }), $;
  }
  function R(h) {
    t.update((p) => p.filter(($) => $.toastId !== h));
  }
  function $e(h) {
    if (yi(t).find(($) => $.toastId === h.toastId) === void 0) {
      t.update(($) => [h, ...$]);
      return;
    }
    t.update(($) => $.map((F) => (F.toastId === h.toastId ? h : F)));
  }
  function Re() {
    e.set([]), t.set([]);
  }
  return {
    create: l,
    addToast: i,
    dismiss: s,
    remove: c,
    message: f,
    error: m,
    success: M,
    info: w,
    warning: j,
    loading: k,
    promise: J,
    custom: z,
    removeHeight: R,
    setHeight: $e,
    reset: Re,
    toasts: e,
    heights: t,
  };
}
const Ie = os();
function ds(e, t) {
  return Ie.create({ message: e, ...t });
}
const fs = ds,
  zn = Object.assign(fs, {
    success: Ie.success,
    info: Ie.info,
    warning: Ie.warning,
    error: Ie.error,
    custom: Ie.custom,
    message: Ie.message,
    promise: Ie.promise,
    dismiss: Ie.dismiss,
    loading: Ie.loading,
  }),
  _s = "https://intervention.jryng.com",
  hs = async (e) => {
    let t = null;
    const i = await fetch(`${_s}/users/survey`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    })
      .then(async (l) => {
        if (!l.ok) throw await l.json();
        return l.json();
      })
      .catch((l) => (console.log(l), (t = l.detail), null));
    if (t) throw t;
    return i;
  };
function Si(e) {
  let t, i, l;
  const s = e[4].default,
    c = Ri(s, e, e[3], null);
  return {
    c() {
      (t = u("div")),
        (i = u("div")),
        c && c.c(),
        r(
          i,
          "class",
          "tw-m-auto tw-rounded-2xl tw-w-[48rem] tw-max-w-full tw-mx-2 tw-bg-white tw-shadow-3xl tw-max-h-[100dvh] tw-overflow-y-auto"
        ),
        r(
          t,
          "class",
          "modal tw-fixed tw-top-0 tw-right-0 tw-left-0 tw-bottom-0 tw-bg-black/60 tw-w-full tw-min-h-screen tw-h-screen tw-flex tw-justify-center tw-z-[9999] tw-overflow-hidden tw-overscroll-contain"
        );
    },
    m(f, m) {
      Qe(f, t, m), n(t, i), c && c.m(i, null), e[5](t), (l = !0);
    },
    p(f, m) {
      c &&
        c.p &&
        (!l || m & 8) &&
        Ui(c, s, f, f[3], l ? Yi(s, f[3], m, null) : Wi(f[3]), null);
    },
    i(f) {
      l || (Ne(c, f), (l = !0));
    },
    o(f) {
      Ze(c, f), (l = !1);
    },
    d(f) {
      f && Pe(t), c && c.d(f), e[5](null);
    },
  };
}
function ms(e) {
  let t,
    i,
    l = e[0] && Si(e);
  return {
    c() {
      l && l.c(), (t = qi());
    },
    m(s, c) {
      l && l.m(s, c), Qe(s, t, c), (i = !0);
    },
    p(s, [c]) {
      s[0]
        ? l
          ? (l.p(s, c), c & 1 && Ne(l, 1))
          : ((l = Si(s)), l.c(), Ne(l, 1), l.m(t.parentNode, t))
        : l &&
          (Ki(),
          Ze(l, 1, 1, () => {
            l = null;
          }),
          Xi());
    },
    i(s) {
      i || (Ne(l), (i = !0));
    },
    o(s) {
      Ze(l), (i = !1);
    },
    d(s) {
      s && Pe(t), l && l.d(s);
    },
  };
}
function gs(e, t, i) {
  let { $$slots: l = {}, $$scope: s } = t,
    { show: c = !0 } = t,
    f = null,
    { closeOnEsc: m = !1 } = t;
  const M = (k) => {
      k.key === "Escape" && w() && (console.log("Escape"), i(0, (c = !1)));
    },
    w = () => {
      const k = document.getElementsByClassName("modal");
      return k.length && k[k.length - 1] === f;
    };
  Ti(() => {});
  function j(k) {
    Fn[k ? "unshift" : "push"](() => {
      (f = k), i(1, f);
    });
  }
  return (
    (e.$$set = (k) => {
      "show" in k && i(0, (c = k.show)),
        "closeOnEsc" in k && i(2, (m = k.closeOnEsc)),
        "$$scope" in k && i(3, (s = k.$$scope));
    }),
    (e.$$.update = () => {
      e.$$.dirty & 7 &&
        (c && f
          ? (m && window.addEventListener("keydown", M),
            (document.body.style.overflow = "hidden"))
          : f &&
            (m && window.removeEventListener("keydown", M),
            (document.body.style.overflow = "unset")));
    }),
    [c, f, m, s, l, j]
  );
}
class vs extends Ln {
  constructor(t) {
    super(), Tn(this, t, gs, ms, Rt, { show: 0, closeOnEsc: 2 });
  }
}
function ps(e) {
  let t,
    i,
    l,
    s,
    c,
    f,
    m,
    M,
    w,
    j,
    k,
    J,
    z,
    R,
    $e,
    Re,
    h,
    p,
    $,
    F,
    N,
    T,
    G,
    U,
    Q,
    C,
    E,
    Se,
    Je,
    b,
    o,
    d,
    g,
    _,
    y,
    v,
    q,
    L,
    P,
    A,
    H,
    Ce,
    V,
    De,
    B,
    I,
    Ee,
    He,
    Ge,
    Yt,
    Vn,
    Ye,
    Tt,
    Zn,
    Y,
    Ke,
    Z,
    Kn,
    Ut,
    Xn,
    Xe,
    K,
    er,
    Wt,
    tr,
    et,
    X,
    nr,
    zt,
    rr,
    tt,
    ee,
    ir,
    Ft,
    sr,
    nt,
    te,
    lr,
    Bt,
    ur,
    rt,
    ne,
    ar,
    Qt,
    cr,
    it,
    re,
    or,
    Jt,
    dr,
    st,
    ie,
    fr,
    Gt,
    _r,
    lt,
    se,
    hr,
    Vt,
    mr,
    Zt,
    gr,
    Ue,
    Lt,
    vr,
    W,
    ut,
    le,
    pr,
    Kt,
    br,
    at,
    ue,
    yr,
    Xt,
    wr,
    ct,
    ae,
    xr,
    en,
    kr,
    ot,
    ce,
    Mr,
    tn,
    Or,
    dt,
    oe,
    $r,
    nn,
    Sr,
    ft,
    de,
    Cr,
    rn,
    Dr,
    _t,
    fe,
    Er,
    sn,
    qr,
    ht,
    _e,
    Tr,
    ln,
    Lr,
    un,
    Hr,
    We,
    Ht,
    Ir,
    qe,
    mt,
    he,
    jr,
    an,
    Ar,
    gt,
    me,
    Nr,
    cn,
    Pr,
    vt,
    ge,
    Rr,
    on,
    Yr,
    pt,
    ve,
    Ur,
    dn,
    Wr,
    fn,
    zr,
    ze,
    It,
    Fr,
    Te,
    bt,
    pe,
    Br,
    _n,
    Qr,
    yt,
    be,
    Jr,
    hn,
    Gr,
    wt,
    ye,
    Vr,
    mn,
    Zr,
    xt,
    we,
    Kr,
    gn,
    Xr,
    vn,
    ei,
    Fe,
    jt,
    ti,
    xe,
    ni,
    pn,
    ri,
    Be,
    At,
    ii,
    je,
    kt,
    ke,
    si,
    bn,
    li,
    Mt,
    Me,
    ui,
    yn,
    ai,
    Ot,
    Oe,
    ci,
    wn,
    oi,
    xn,
    di,
    fi,
    _i,
    kn,
    hi,
    mi,
    gi,
    Mn,
    vi,
    On,
    $n,
    Sn = JSON.stringify(e[1]) + "",
    Hn,
    In,
    jn,
    An,
    Nn,
    Pn,
    Rn,
    Yn,
    pi;
  return (
    (In = $t(e[7][0])),
    (jn = $t(e[7][1])),
    (An = $t(e[7][2])),
    (Nn = $t(e[7][3])),
    (Pn = $t(e[7][4])),
    (Rn = $t(e[7][5])),
    {
      c() {
        (t = u("form")),
          (i = u("div")),
          (l = u("label")),
          (l.textContent = "Date"),
          (s = a()),
          (c = u("input")),
          (f = a()),
          (m = u("div")),
          (M = u("label")),
          (M.textContent = "Participant Email"),
          (w = a()),
          (j = u("input")),
          (k = a()),
          (J = u("div")),
          (J.innerHTML = "<span>REQUIRED</span>"),
          (z = a()),
          (R = u("div")),
          ($e = u("label")),
          ($e.textContent = "Age"),
          (Re = a()),
          (h = u("input")),
          (p = a()),
          ($ = u("div")),
          ($.innerHTML = "<span>REQUIRED</span>"),
          (F = a()),
          (N = u("div")),
          (T = u("label")),
          (T.textContent = "Gender"),
          (G = a()),
          (U = u("div")),
          (Q = u("div")),
          (C = u("input")),
          (E = a()),
          (Se = u("div")),
          (Se.textContent = "Man"),
          (Je = a()),
          (b = u("div")),
          (o = u("input")),
          (d = a()),
          (g = u("div")),
          (g.textContent = "Woman"),
          (_ = a()),
          (y = u("div")),
          (v = u("input")),
          (q = a()),
          (L = u("div")),
          (L.textContent = "Non-binary"),
          (P = a()),
          (A = u("div")),
          (H = u("input")),
          (Ce = a()),
          (V = u("div")),
          (V.textContent = "Other"),
          (De = a()),
          (B = u("div")),
          (I = u("input")),
          (Ee = a()),
          (He = u("div")),
          (He.textContent = "Prefer not to answer"),
          (Ge = a()),
          (Yt = u("div")),
          (Yt.innerHTML = "<span>REQUIRED</span>"),
          (Vn = a()),
          (Ye = u("div")),
          (Tt = u("label")),
          (Tt.innerHTML =
            "What is your race?<br/> (One or more categories may be selected)"),
          (Zn = a()),
          (Y = u("div")),
          (Ke = u("div")),
          (Z = u("input")),
          (Kn = a()),
          (Ut = u("div")),
          (Ut.textContent = "Black"),
          (Xn = a()),
          (Xe = u("div")),
          (K = u("input")),
          (er = a()),
          (Wt = u("div")),
          (Wt.textContent = "East/Southeast Asian"),
          (tr = a()),
          (et = u("div")),
          (X = u("input")),
          (nr = a()),
          (zt = u("div")),
          (zt.textContent = "Indigenous"),
          (rr = a()),
          (tt = u("div")),
          (ee = u("input")),
          (ir = a()),
          (Ft = u("div")),
          (Ft.textContent = "Latino"),
          (sr = a()),
          (nt = u("div")),
          (te = u("input")),
          (lr = a()),
          (Bt = u("div")),
          (Bt.textContent = "Middle Eastern"),
          (ur = a()),
          (rt = u("div")),
          (ne = u("input")),
          (ar = a()),
          (Qt = u("div")),
          (Qt.textContent = "South Asian"),
          (cr = a()),
          (it = u("div")),
          (re = u("input")),
          (or = a()),
          (Jt = u("div")),
          (Jt.textContent = "White"),
          (dr = a()),
          (st = u("div")),
          (ie = u("input")),
          (fr = a()),
          (Gt = u("div")),
          (Gt.textContent = "Other"),
          (_r = a()),
          (lt = u("div")),
          (se = u("input")),
          (hr = a()),
          (Vt = u("div")),
          (Vt.textContent = "Prefer not to say"),
          (mr = a()),
          (Zt = u("div")),
          (Zt.innerHTML = "<span>REQUIRED</span>"),
          (gr = a()),
          (Ue = u("div")),
          (Lt = u("label")),
          (Lt.textContent = "Which of these describes your income last year?"),
          (vr = a()),
          (W = u("div")),
          (ut = u("div")),
          (le = u("input")),
          (pr = a()),
          (Kt = u("div")),
          (Kt.textContent = "$0 to $9,999"),
          (br = a()),
          (at = u("div")),
          (ue = u("input")),
          (yr = a()),
          (Xt = u("div")),
          (Xt.textContent = "$10,000 to $24,999"),
          (wr = a()),
          (ct = u("div")),
          (ae = u("input")),
          (xr = a()),
          (en = u("div")),
          (en.textContent = "$25,000 to 49,999"),
          (kr = a()),
          (ot = u("div")),
          (ce = u("input")),
          (Mr = a()),
          (tn = u("div")),
          (tn.textContent = "$50,000 to 74,999"),
          (Or = a()),
          (dt = u("div")),
          (oe = u("input")),
          ($r = a()),
          (nn = u("div")),
          (nn.textContent = "$75,000 to 99,999"),
          (Sr = a()),
          (ft = u("div")),
          (de = u("input")),
          (Cr = a()),
          (rn = u("div")),
          (rn.textContent = "$100,000 to 149,999"),
          (Dr = a()),
          (_t = u("div")),
          (fe = u("input")),
          (Er = a()),
          (sn = u("div")),
          (sn.textContent = "$150,000 and greater"),
          (qr = a()),
          (ht = u("div")),
          (_e = u("input")),
          (Tr = a()),
          (ln = u("div")),
          (ln.textContent = "Prefer not to answer"),
          (Lr = a()),
          (un = u("div")),
          (un.innerHTML = "<span>REQUIRED</span>"),
          (Hr = a()),
          (We = u("div")),
          (Ht = u("label")),
          (Ht.textContent = "How often do you use TikTok?"),
          (Ir = a()),
          (qe = u("div")),
          (mt = u("div")),
          (he = u("input")),
          (jr = a()),
          (an = u("div")),
          (an.textContent = "Never"),
          (Ar = a()),
          (gt = u("div")),
          (me = u("input")),
          (Nr = a()),
          (cn = u("div")),
          (cn.textContent = "Infrequently"),
          (Pr = a()),
          (vt = u("div")),
          (ge = u("input")),
          (Rr = a()),
          (on = u("div")),
          (on.textContent = "A moderate amount"),
          (Yr = a()),
          (pt = u("div")),
          (ve = u("input")),
          (Ur = a()),
          (dn = u("div")),
          (dn.textContent = "Frequently"),
          (Wr = a()),
          (fn = u("div")),
          (fn.innerHTML = "<span>REQUIRED</span>"),
          (zr = a()),
          (ze = u("div")),
          (It = u("label")),
          (It.textContent = `How often do you catch yourself consuming content on TikTok without
            being aware of what you are doing?`),
          (Fr = a()),
          (Te = u("div")),
          (bt = u("div")),
          (pe = u("input")),
          (Br = a()),
          (_n = u("div")),
          (_n.textContent = "Never"),
          (Qr = a()),
          (yt = u("div")),
          (be = u("input")),
          (Jr = a()),
          (hn = u("div")),
          (hn.textContent = "Infrequently"),
          (Gr = a()),
          (wt = u("div")),
          (ye = u("input")),
          (Vr = a()),
          (mn = u("div")),
          (mn.textContent = "A moderate amount"),
          (Zr = a()),
          (xt = u("div")),
          (we = u("input")),
          (Kr = a()),
          (gn = u("div")),
          (gn.textContent = "Frequently"),
          (Xr = a()),
          (vn = u("div")),
          (vn.innerHTML = "<span>REQUIRED</span>"),
          (ei = a()),
          (Fe = u("div")),
          (jt = u("label")),
          (jt.textContent =
            "On average, how long do these sessions of content consumption last?"),
          (ti = a()),
          (xe = u("input")),
          (ni = a()),
          (pn = u("div")),
          (pn.innerHTML = "<span>REQUIRED</span>"),
          (ri = a()),
          (Be = u("div")),
          (At = u("label")),
          (At.textContent = `How do you feel your social media usage affects your physical and
            mental health and well-being?`),
          (ii = a()),
          (je = u("div")),
          (kt = u("div")),
          (ke = u("input")),
          (si = a()),
          (bn = u("div")),
          (bn.textContent = "Social media positively affects my health"),
          (li = a()),
          (Mt = u("div")),
          (Me = u("input")),
          (ui = a()),
          (yn = u("div")),
          (yn.textContent = "Social media has no effect on my health"),
          (ai = a()),
          (Ot = u("div")),
          (Oe = u("input")),
          (ci = a()),
          (wn = u("div")),
          (wn.textContent = "Social media negatively affects my health"),
          (oi = a()),
          (xn = u("div")),
          (xn.innerHTML = "<span>REQUIRED</span>"),
          (di = a()),
          (fi = u("hr")),
          (_i = a()),
          (kn = u("div")),
          (kn.innerHTML = `<div class="text-gray-600 text-sm">If you would like to reschedule or cancel your participation in the
            study for any reason, please notify the student lead
            (jaeryang_baek@sfu.ca) or the principle investigator
            (lawkim@sfu.ca).</div>`),
          (hi = a()),
          (mi = u("hr")),
          (gi = a()),
          (Mn = u("div")),
          (Mn.innerHTML =
            '<div><button class="flex text-sm w-full font-normal rounded-lg py-1.5 px-3 bg-blue-500 hover:bg-blue-600 text-white transition-all cursor-pointer" type="submit"><div class="">Submit</div> <div class="my-auto ml-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z"></path></svg></div></button></div>'),
          (vi = a()),
          (On = u("div")),
          ($n = u("div")),
          (Hn = Jn(Sn)),
          r(l, "for", "date"),
          r(l, "class", "tw-block tw-mb-2 tw-text-sm tw-text-gray-900"),
          (c.disabled = !0),
          r(c, "type", "date"),
          r(c, "id", "date"),
          r(
            c,
            "class",
            "tw-bg-gray-50 tw-border tw-border-gray-100 tw-text-gray-900 tw-text-sm tw-rounded-lg tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-disabled:text-gray-500 tw-disabled:bg-gray-200 tw-block tw-w-full tw-p-3"
          ),
          (c.required = !0),
          r(i, "class", "tw-my-6"),
          r(M, "for", "email"),
          r(M, "class", "block mb-2 text-sm text-gray-900"),
          r(j, "type", "email"),
          r(j, "id", "email"),
          r(
            j,
            "class",
            "tw-bg-gray-50 tw-border tw-border-gray-100 tw-text-gray-900 tw-text-sm tw-rounded-lg tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-disabled:text-gray-500 tw-disabled:bg-gray-200 tw-block tw-w-full tw-p-3"
          ),
          r(j, "placeholder", "Your email address"),
          (j.required = !0),
          r(j, "autocomplete", "email"),
          r(J, "class", "tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right"),
          r(m, "class", "my-6"),
          r($e, "for", "age"),
          r($e, "class", "block mb-2 text-sm text-gray-900"),
          r(h, "type", "number"),
          r(h, "id", "age"),
          r(h, "min", "0"),
          r(
            h,
            "class",
            "tw-bg-gray-50 tw-border tw-border-gray-100 tw-text-gray-900 tw-text-sm tw-rounded-lg tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-disabled:text-gray-500 tw-disabled:bg-gray-200 tw-block tw-w-full tw-p-3"
          ),
          r(h, "placeholder", "Your age"),
          (h.required = !0),
          r(h, "autocomplete", "off"),
          r($, "class", "tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right"),
          r(R, "class", "my-6"),
          r(T, "for", "gender"),
          r(T, "class", "block mb-2 text-sm text-gray-900"),
          r(C, "type", "radio"),
          (C.__value = "M"),
          O(C, C.__value),
          r(
            C,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(Se, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(Q, "class", "tw-flex tw-items-center tw-mb-2"),
          r(o, "type", "radio"),
          (o.__value = "F"),
          O(o, o.__value),
          r(
            o,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(g, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(b, "class", "tw-flex tw-items-center tw-mb-2"),
          r(v, "type", "radio"),
          (v.__value = "N"),
          O(v, v.__value),
          r(
            v,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(L, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(y, "class", "tw-flex tw-items-center tw-mb-2"),
          r(H, "type", "radio"),
          (H.__value = "O"),
          O(H, H.__value),
          r(
            H,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(V, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(A, "class", "tw-flex tw-items-center tw-mb-2"),
          r(I, "type", "radio"),
          (I.__value = "NA"),
          O(I, I.__value),
          r(
            I,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(He, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(B, "class", "flex items-center"),
          r(U, "id", "gender"),
          r(U, "class", "mt-5"),
          r(Yt, "class", "tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right"),
          r(N, "class", "my-6"),
          r(Tt, "for", "race"),
          r(Tt, "class", "block mb-2 text-sm text-gray-900"),
          r(Z, "type", "checkbox"),
          (Z.__value = "B"),
          O(Z, Z.__value),
          r(
            Z,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          ),
          r(Ut, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(Ke, "class", "tw-flex tw-items-center tw-mb-2"),
          r(K, "type", "checkbox"),
          (K.__value = "EA"),
          O(K, K.__value),
          r(
            K,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          ),
          r(Wt, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(Xe, "class", "tw-flex tw-items-center tw-mb-2"),
          r(X, "type", "checkbox"),
          (X.__value = "I"),
          O(X, X.__value),
          r(
            X,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          ),
          r(zt, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(et, "class", "tw-flex tw-items-center tw-mb-2"),
          r(ee, "type", "checkbox"),
          (ee.__value = "L"),
          O(ee, ee.__value),
          r(
            ee,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          ),
          r(Ft, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(tt, "class", "tw-flex tw-items-center tw-mb-2"),
          r(te, "type", "checkbox"),
          (te.__value = "M"),
          O(te, te.__value),
          r(
            te,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          ),
          r(Bt, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(nt, "class", "tw-flex tw-items-center tw-mb-2"),
          r(ne, "type", "checkbox"),
          (ne.__value = "SA"),
          O(ne, ne.__value),
          r(
            ne,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          ),
          r(Qt, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(rt, "class", "tw-flex tw-items-center tw-mb-2"),
          r(re, "type", "checkbox"),
          (re.__value = "W"),
          O(re, re.__value),
          r(
            re,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          ),
          r(Jt, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(it, "class", "tw-flex tw-items-center tw-mb-2"),
          r(ie, "type", "checkbox"),
          (ie.__value = "O"),
          O(ie, ie.__value),
          r(
            ie,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          ),
          r(Gt, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(st, "class", "tw-flex tw-items-center tw-mb-2"),
          r(se, "type", "checkbox"),
          (se.__value = "NA"),
          O(se, se.__value),
          r(
            se,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          ),
          r(Vt, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(lt, "class", "tw-flex tw-items-center tw-mb-2"),
          r(Y, "id", "race"),
          r(Y, "class", "mt-5"),
          r(Zt, "class", "tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right"),
          r(Ye, "class", "my-6"),
          r(Lt, "for", "income-bracket"),
          r(Lt, "class", "block mb-2 text-sm text-gray-900"),
          r(le, "type", "radio"),
          (le.__value = "0"),
          O(le, le.__value),
          r(
            le,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(Kt, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(ut, "class", "tw-flex tw-items-center tw-mb-2"),
          r(ue, "type", "radio"),
          (ue.__value = "10"),
          O(ue, ue.__value),
          r(
            ue,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(Xt, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(at, "class", "tw-flex tw-items-center tw-mb-2"),
          r(ae, "type", "radio"),
          (ae.__value = "25"),
          O(ae, ae.__value),
          r(
            ae,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(en, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(ct, "class", "tw-flex tw-items-center tw-mb-2"),
          r(ce, "type", "radio"),
          (ce.__value = "50"),
          O(ce, ce.__value),
          r(
            ce,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(tn, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(ot, "class", "tw-flex tw-items-center tw-mb-2"),
          r(oe, "type", "radio"),
          (oe.__value = "75"),
          O(oe, oe.__value),
          r(
            oe,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(nn, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(dt, "class", "tw-flex tw-items-center tw-mb-2"),
          r(de, "type", "radio"),
          (de.__value = "100"),
          O(de, de.__value),
          r(
            de,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(rn, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(ft, "class", "tw-flex tw-items-center tw-mb-2"),
          r(fe, "type", "radio"),
          (fe.__value = "150"),
          O(fe, fe.__value),
          r(
            fe,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(sn, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(_t, "class", "tw-flex tw-items-center tw-mb-2"),
          r(_e, "type", "radio"),
          (_e.__value = "NA"),
          O(_e, _e.__value),
          r(
            _e,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(ln, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(ht, "class", "flex items-center"),
          r(W, "id", "income-bracket"),
          r(W, "class", "mt-5"),
          r(un, "class", "tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right"),
          r(Ue, "class", "my-6"),
          r(Ht, "for", "app-usage-frequency"),
          r(Ht, "class", "block mb-2 text-sm text-gray-900"),
          r(he, "type", "radio"),
          (he.__value = "1"),
          O(he, he.__value),
          r(
            he,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(an, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(mt, "class", "tw-flex tw-items-center tw-mb-2"),
          r(me, "type", "radio"),
          (me.__value = "2"),
          O(me, me.__value),
          r(
            me,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(cn, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(gt, "class", "tw-flex tw-items-center tw-mb-2"),
          r(ge, "type", "radio"),
          (ge.__value = "3"),
          O(ge, ge.__value),
          r(
            ge,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(on, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(vt, "class", "tw-flex tw-items-center tw-mb-2"),
          r(ve, "type", "radio"),
          (ve.__value = "4"),
          O(ve, ve.__value),
          r(
            ve,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(dn, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(pt, "class", "flex items-center"),
          r(qe, "id", "app-usage-frequency"),
          r(qe, "class", "mt-5"),
          r(fn, "class", "tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right"),
          r(We, "class", "my-6"),
          r(It, "for", "mindless-usage-frequency"),
          r(It, "class", "block mb-2 text-sm text-gray-900"),
          r(pe, "type", "radio"),
          (pe.__value = "1"),
          O(pe, pe.__value),
          r(
            pe,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(_n, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(bt, "class", "tw-flex tw-items-center tw-mb-2"),
          r(be, "type", "radio"),
          (be.__value = "2"),
          O(be, be.__value),
          r(
            be,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(hn, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(yt, "class", "tw-flex tw-items-center tw-mb-2"),
          r(ye, "type", "radio"),
          (ye.__value = "3"),
          O(ye, ye.__value),
          r(
            ye,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(mn, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(wt, "class", "tw-flex tw-items-center tw-mb-2"),
          r(we, "type", "radio"),
          (we.__value = "4"),
          O(we, we.__value),
          r(
            we,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(gn, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(xt, "class", "flex items-center"),
          r(Te, "id", "mindless-usage-frequency"),
          r(Te, "class", "mt-5"),
          r(vn, "class", "tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right"),
          r(ze, "class", "my-6"),
          r(jt, "for", "average-mindless-usage-duration-minutes"),
          r(jt, "class", "block mb-2 text-sm text-gray-900"),
          r(xe, "type", "number"),
          r(xe, "id", "average-mindless-usage-duration-minutes"),
          r(
            xe,
            "class",
            "tw-bg-gray-50 tw-border tw-border-gray-100 tw-text-gray-900 tw-text-sm tw-rounded-lg tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-disabled:text-gray-500 tw-disabled:bg-gray-200 tw-block tw-w-full tw-p-3"
          ),
          r(xe, "placeholder", "Duration minutes"),
          r(xe, "min", "0"),
          (xe.required = !0),
          r(xe, "autocomplete", "off"),
          r(pn, "class", "tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right"),
          r(Fe, "class", "my-6"),
          r(At, "for", "social-media-health-impact"),
          r(At, "class", "block mb-2 text-sm text-gray-900"),
          r(ke, "type", "radio"),
          (ke.__value = "1"),
          O(ke, ke.__value),
          r(
            ke,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(bn, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(kt, "class", "tw-flex tw-items-center tw-mb-2"),
          r(Me, "type", "radio"),
          (Me.__value = "2"),
          O(Me, Me.__value),
          r(
            Me,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(yn, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(Mt, "class", "tw-flex tw-items-center tw-mb-2"),
          r(Oe, "type", "radio"),
          (Oe.__value = "3"),
          O(Oe, Oe.__value),
          r(
            Oe,
            "class",
            "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          ),
          r(wn, "class", "ml-2 text-sm font-medium text-gray-700"),
          r(Ot, "class", "flex items-center"),
          r(je, "id", "social-media-health-impact"),
          r(je, "class", "mt-5"),
          r(xn, "class", "tw-mt-2 tw-text-xs tw-text-gray-500 tw-text-right"),
          r(Be, "class", "my-6"),
          r(kn, "class", "my-6"),
          r(Mn, "class", "flex justify-end my-6"),
          r($n, "class", "mt-2 text-sm break-words"),
          r(On, "class", "text-white"),
          In.p(ke, Me, Oe),
          jn.p(pe, be, ye, we),
          An.p(he, me, ge, ve),
          Nn.p(le, ue, ae, ce, oe, de, fe, _e),
          Pn.p(Z, K, X, ee, te, ne, re, ie, se),
          Rn.p(C, o, v, H, I);
      },
      m(x, S) {
        Qe(x, t, S),
          n(t, i),
          n(i, l),
          n(i, s),
          n(i, c),
          O(c, e[1].date),
          n(t, f),
          n(t, m),
          n(m, M),
          n(m, w),
          n(m, j),
          O(j, e[1].email),
          n(m, k),
          n(m, J),
          n(t, z),
          n(t, R),
          n(R, $e),
          n(R, Re),
          n(R, h),
          O(h, e[1].age),
          n(R, p),
          n(R, $),
          n(t, F),
          n(t, N),
          n(N, T),
          n(N, G),
          n(N, U),
          n(U, Q),
          n(Q, C),
          (C.checked = C.__value === e[1].gender),
          n(Q, E),
          n(Q, Se),
          n(U, Je),
          n(U, b),
          n(b, o),
          (o.checked = o.__value === e[1].gender),
          n(b, d),
          n(b, g),
          n(U, _),
          n(U, y),
          n(y, v),
          (v.checked = v.__value === e[1].gender),
          n(y, q),
          n(y, L),
          n(U, P),
          n(U, A),
          n(A, H),
          (H.checked = H.__value === e[1].gender),
          n(A, Ce),
          n(A, V),
          n(U, De),
          n(U, B),
          n(B, I),
          (I.checked = I.__value === e[1].gender),
          n(B, Ee),
          n(B, He),
          n(N, Ge),
          n(N, Yt),
          n(t, Vn),
          n(t, Ye),
          n(Ye, Tt),
          n(Ye, Zn),
          n(Ye, Y),
          n(Y, Ke),
          n(Ke, Z),
          (Z.checked = ~(e[1].race || []).indexOf(Z.__value)),
          n(Ke, Kn),
          n(Ke, Ut),
          n(Y, Xn),
          n(Y, Xe),
          n(Xe, K),
          (K.checked = ~(e[1].race || []).indexOf(K.__value)),
          n(Xe, er),
          n(Xe, Wt),
          n(Y, tr),
          n(Y, et),
          n(et, X),
          (X.checked = ~(e[1].race || []).indexOf(X.__value)),
          n(et, nr),
          n(et, zt),
          n(Y, rr),
          n(Y, tt),
          n(tt, ee),
          (ee.checked = ~(e[1].race || []).indexOf(ee.__value)),
          n(tt, ir),
          n(tt, Ft),
          n(Y, sr),
          n(Y, nt),
          n(nt, te),
          (te.checked = ~(e[1].race || []).indexOf(te.__value)),
          n(nt, lr),
          n(nt, Bt),
          n(Y, ur),
          n(Y, rt),
          n(rt, ne),
          (ne.checked = ~(e[1].race || []).indexOf(ne.__value)),
          n(rt, ar),
          n(rt, Qt),
          n(Y, cr),
          n(Y, it),
          n(it, re),
          (re.checked = ~(e[1].race || []).indexOf(re.__value)),
          n(it, or),
          n(it, Jt),
          n(Y, dr),
          n(Y, st),
          n(st, ie),
          (ie.checked = ~(e[1].race || []).indexOf(ie.__value)),
          n(st, fr),
          n(st, Gt),
          n(Y, _r),
          n(Y, lt),
          n(lt, se),
          (se.checked = ~(e[1].race || []).indexOf(se.__value)),
          n(lt, hr),
          n(lt, Vt),
          n(Ye, mr),
          n(Ye, Zt),
          n(t, gr),
          n(t, Ue),
          n(Ue, Lt),
          n(Ue, vr),
          n(Ue, W),
          n(W, ut),
          n(ut, le),
          (le.checked = le.__value === e[1].income_bracket),
          n(ut, pr),
          n(ut, Kt),
          n(W, br),
          n(W, at),
          n(at, ue),
          (ue.checked = ue.__value === e[1].income_bracket),
          n(at, yr),
          n(at, Xt),
          n(W, wr),
          n(W, ct),
          n(ct, ae),
          (ae.checked = ae.__value === e[1].income_bracket),
          n(ct, xr),
          n(ct, en),
          n(W, kr),
          n(W, ot),
          n(ot, ce),
          (ce.checked = ce.__value === e[1].income_bracket),
          n(ot, Mr),
          n(ot, tn),
          n(W, Or),
          n(W, dt),
          n(dt, oe),
          (oe.checked = oe.__value === e[1].income_bracket),
          n(dt, $r),
          n(dt, nn),
          n(W, Sr),
          n(W, ft),
          n(ft, de),
          (de.checked = de.__value === e[1].income_bracket),
          n(ft, Cr),
          n(ft, rn),
          n(W, Dr),
          n(W, _t),
          n(_t, fe),
          (fe.checked = fe.__value === e[1].income_bracket),
          n(_t, Er),
          n(_t, sn),
          n(W, qr),
          n(W, ht),
          n(ht, _e),
          (_e.checked = _e.__value === e[1].income_bracket),
          n(ht, Tr),
          n(ht, ln),
          n(Ue, Lr),
          n(Ue, un),
          n(t, Hr),
          n(t, We),
          n(We, Ht),
          n(We, Ir),
          n(We, qe),
          n(qe, mt),
          n(mt, he),
          (he.checked = he.__value === e[1].app_usage_frequency),
          n(mt, jr),
          n(mt, an),
          n(qe, Ar),
          n(qe, gt),
          n(gt, me),
          (me.checked = me.__value === e[1].app_usage_frequency),
          n(gt, Nr),
          n(gt, cn),
          n(qe, Pr),
          n(qe, vt),
          n(vt, ge),
          (ge.checked = ge.__value === e[1].app_usage_frequency),
          n(vt, Rr),
          n(vt, on),
          n(qe, Yr),
          n(qe, pt),
          n(pt, ve),
          (ve.checked = ve.__value === e[1].app_usage_frequency),
          n(pt, Ur),
          n(pt, dn),
          n(We, Wr),
          n(We, fn),
          n(t, zr),
          n(t, ze),
          n(ze, It),
          n(ze, Fr),
          n(ze, Te),
          n(Te, bt),
          n(bt, pe),
          (pe.checked = pe.__value === e[1].mindless_usage_frequency),
          n(bt, Br),
          n(bt, _n),
          n(Te, Qr),
          n(Te, yt),
          n(yt, be),
          (be.checked = be.__value === e[1].mindless_usage_frequency),
          n(yt, Jr),
          n(yt, hn),
          n(Te, Gr),
          n(Te, wt),
          n(wt, ye),
          (ye.checked = ye.__value === e[1].mindless_usage_frequency),
          n(wt, Vr),
          n(wt, mn),
          n(Te, Zr),
          n(Te, xt),
          n(xt, we),
          (we.checked = we.__value === e[1].mindless_usage_frequency),
          n(xt, Kr),
          n(xt, gn),
          n(ze, Xr),
          n(ze, vn),
          n(t, ei),
          n(t, Fe),
          n(Fe, jt),
          n(Fe, ti),
          n(Fe, xe),
          O(xe, e[1].average_mindless_usage_duration_minutes),
          n(Fe, ni),
          n(Fe, pn),
          n(t, ri),
          n(t, Be),
          n(Be, At),
          n(Be, ii),
          n(Be, je),
          n(je, kt),
          n(kt, ke),
          (ke.checked = ke.__value === e[1].social_media_health_impact),
          n(kt, si),
          n(kt, bn),
          n(je, li),
          n(je, Mt),
          n(Mt, Me),
          (Me.checked = Me.__value === e[1].social_media_health_impact),
          n(Mt, ui),
          n(Mt, yn),
          n(je, ai),
          n(je, Ot),
          n(Ot, Oe),
          (Oe.checked = Oe.__value === e[1].social_media_health_impact),
          n(Ot, ci),
          n(Ot, wn),
          n(Be, oi),
          n(Be, xn),
          n(t, di),
          n(t, fi),
          n(t, _i),
          n(t, kn),
          n(t, hi),
          n(t, mi),
          n(t, gi),
          n(t, Mn),
          n(t, vi),
          n(t, On),
          n(On, $n),
          n($n, Hn),
          Yn ||
            ((pi = [
              D(c, "input", e[3]),
              D(j, "input", e[4]),
              D(h, "input", e[5]),
              D(C, "change", e[6]),
              D(o, "change", e[8]),
              D(v, "change", e[9]),
              D(H, "change", e[10]),
              D(I, "change", e[11]),
              D(Z, "change", e[12]),
              D(K, "change", e[13]),
              D(X, "change", e[14]),
              D(ee, "change", e[15]),
              D(te, "change", e[16]),
              D(ne, "change", e[17]),
              D(re, "change", e[18]),
              D(ie, "change", e[19]),
              D(se, "change", e[20]),
              D(le, "change", e[21]),
              D(ue, "change", e[22]),
              D(ae, "change", e[23]),
              D(ce, "change", e[24]),
              D(oe, "change", e[25]),
              D(de, "change", e[26]),
              D(fe, "change", e[27]),
              D(_e, "change", e[28]),
              D(he, "change", e[29]),
              D(me, "change", e[30]),
              D(ge, "change", e[31]),
              D(ve, "change", e[32]),
              D(pe, "change", e[33]),
              D(be, "change", e[34]),
              D(ye, "change", e[35]),
              D(we, "change", e[36]),
              D(xe, "input", e[37]),
              D(ke, "change", e[38]),
              D(Me, "change", e[39]),
              D(Oe, "change", e[40]),
              D(t, "submit", zi(e[2])),
            ]),
            (Yn = !0));
      },
      p(x, S) {
        S[0] & 2 && O(c, x[1].date),
          S[0] & 2 && j.value !== x[1].email && O(j, x[1].email),
          S[0] & 2 && Dn(h.value) !== x[1].age && O(h, x[1].age),
          S[0] & 2 && (C.checked = C.__value === x[1].gender),
          S[0] & 2 && (o.checked = o.__value === x[1].gender),
          S[0] & 2 && (v.checked = v.__value === x[1].gender),
          S[0] & 2 && (H.checked = H.__value === x[1].gender),
          S[0] & 2 && (I.checked = I.__value === x[1].gender),
          S[0] & 2 && (Z.checked = ~(x[1].race || []).indexOf(Z.__value)),
          S[0] & 2 && (K.checked = ~(x[1].race || []).indexOf(K.__value)),
          S[0] & 2 && (X.checked = ~(x[1].race || []).indexOf(X.__value)),
          S[0] & 2 && (ee.checked = ~(x[1].race || []).indexOf(ee.__value)),
          S[0] & 2 && (te.checked = ~(x[1].race || []).indexOf(te.__value)),
          S[0] & 2 && (ne.checked = ~(x[1].race || []).indexOf(ne.__value)),
          S[0] & 2 && (re.checked = ~(x[1].race || []).indexOf(re.__value)),
          S[0] & 2 && (ie.checked = ~(x[1].race || []).indexOf(ie.__value)),
          S[0] & 2 && (se.checked = ~(x[1].race || []).indexOf(se.__value)),
          S[0] & 2 && (le.checked = le.__value === x[1].income_bracket),
          S[0] & 2 && (ue.checked = ue.__value === x[1].income_bracket),
          S[0] & 2 && (ae.checked = ae.__value === x[1].income_bracket),
          S[0] & 2 && (ce.checked = ce.__value === x[1].income_bracket),
          S[0] & 2 && (oe.checked = oe.__value === x[1].income_bracket),
          S[0] & 2 && (de.checked = de.__value === x[1].income_bracket),
          S[0] & 2 && (fe.checked = fe.__value === x[1].income_bracket),
          S[0] & 2 && (_e.checked = _e.__value === x[1].income_bracket),
          S[0] & 2 && (he.checked = he.__value === x[1].app_usage_frequency),
          S[0] & 2 && (me.checked = me.__value === x[1].app_usage_frequency),
          S[0] & 2 && (ge.checked = ge.__value === x[1].app_usage_frequency),
          S[0] & 2 && (ve.checked = ve.__value === x[1].app_usage_frequency),
          S[0] & 2 &&
            (pe.checked = pe.__value === x[1].mindless_usage_frequency),
          S[0] & 2 &&
            (be.checked = be.__value === x[1].mindless_usage_frequency),
          S[0] & 2 &&
            (ye.checked = ye.__value === x[1].mindless_usage_frequency),
          S[0] & 2 &&
            (we.checked = we.__value === x[1].mindless_usage_frequency),
          S[0] & 2 &&
            Dn(xe.value) !== x[1].average_mindless_usage_duration_minutes &&
            O(xe, x[1].average_mindless_usage_duration_minutes),
          S[0] & 2 &&
            (ke.checked = ke.__value === x[1].social_media_health_impact),
          S[0] & 2 &&
            (Me.checked = Me.__value === x[1].social_media_health_impact),
          S[0] & 2 &&
            (Oe.checked = Oe.__value === x[1].social_media_health_impact),
          S[0] & 2 && Sn !== (Sn = JSON.stringify(x[1]) + "") && Bi(Hn, Sn);
      },
      d(x) {
        x && Pe(t),
          In.r(),
          jn.r(),
          An.r(),
          Nn.r(),
          Pn.r(),
          Rn.r(),
          (Yn = !1),
          qt(pi);
      },
    }
  );
}
function bs(e) {
  let t;
  return {
    c() {
      (t = u("div")),
        (t.innerHTML =
          "Survey successfully registered.<br/> You may now close this tab."),
        r(
          t,
          "class",
          "tw-text-center tw-text-gray-700 tw-text-2xl tw-font-semibold"
        );
    },
    m(i, l) {
      Qe(i, t, l);
    },
    p: Le,
    d(i) {
      i && Pe(t);
    },
  };
}
function ys(e) {
  let t, i, l;
  function s(m, M) {
    return m[0] ? bs : ps;
  }
  let c = s(e),
    f = c(e);
  return {
    c() {
      (t = u("div")),
        (i = u("div")),
        (i.innerHTML =
          '<div class="tw-flex tw-justify-center"><img src="/logo.png" alt="logo" class="tw-size-12 tw-rounded-full"/></div> <div class="tw-text-xl tw-text-gray-600 tw-font-semibold">Pre-Experiment Survey</div>'),
        (l = a()),
        f.c(),
        r(i, "class", ""),
        r(t, "class", "tw-overflow-scroll");
    },
    m(m, M) {
      Qe(m, t, M), n(t, i), n(t, l), f.m(t, null);
    },
    p(m, M) {
      c === (c = s(m)) && f
        ? f.p(m, M)
        : (f.d(1), (f = c(m)), f && (f.c(), f.m(t, null)));
    },
    d(m) {
      m && Pe(t), f.d();
    },
  };
}
function ws(e) {
  let t, i;
  return (
    (t = new vs({
      props: { $$slots: { default: [ys] }, $$scope: { ctx: e } },
    })),
    {
      c() {
        Gn(t.$$.fragment);
      },
      m(l, s) {
        En(t, l, s), (i = !0);
      },
      p(l, s) {
        const c = {};
        (s[0] & 3) | (s[1] & 2048) && (c.$$scope = { dirty: s, ctx: l }),
          t.$set(c);
      },
      i(l) {
        i || (Ne(t.$$.fragment, l), (i = !0));
      },
      o(l) {
        Ze(t.$$.fragment, l), (i = !1);
      },
      d(l) {
        qn(t, l);
      },
    }
  );
}
function xs(e, t, i) {
  let l = !1,
    s = {
      date: as().format("YYYY-MM-DD"),
      email: "",
      age: "",
      gender: "",
      race: [],
      income_bracket: "",
      app_usage_frequency: "",
      mindless_usage_frequency: "",
      average_mindless_usage_duration_minutes: "",
      social_media_health_impact: "",
    };
  const c = async () => {
      if (
        s.email !== "" &&
        s.age !== "" &&
        s.gender !== "" &&
        s.race.length > 0 &&
        s.income_bracket !== "" &&
        s.app_usage_frequency !== "" &&
        s.mindless_usage_frequency !== "" &&
        s.average_mindless_usage_duration_minutes !== "" &&
        s.social_media_health_impact !== ""
      ) {
        console.log({ ...s, race: s.race.join(",") });
        const De = await hs({ ...s, race: s.race.join(",") }).catch((B) => {
          console.error(B), zn.error(B);
        });
        De &&
          De.id &&
          (i(0, (l = !0)),
          zn.success("Survey successfully registered.", { duration: 6e3 }));
      } else zn.error("Please complete all required form inputs.");
    },
    f = [[], [], [], [], [], []];
  function m() {
    (s.date = this.value), i(1, s);
  }
  function M() {
    (s.email = this.value), i(1, s);
  }
  function w() {
    (s.age = Dn(this.value)), i(1, s);
  }
  function j() {
    (s.gender = this.__value), i(1, s);
  }
  function k() {
    (s.gender = this.__value), i(1, s);
  }
  function J() {
    (s.gender = this.__value), i(1, s);
  }
  function z() {
    (s.gender = this.__value), i(1, s);
  }
  function R() {
    (s.gender = this.__value), i(1, s);
  }
  function $e() {
    (s.race = Ae(f[4], this.__value, this.checked)), i(1, s);
  }
  function Re() {
    (s.race = Ae(f[4], this.__value, this.checked)), i(1, s);
  }
  function h() {
    (s.race = Ae(f[4], this.__value, this.checked)), i(1, s);
  }
  function p() {
    (s.race = Ae(f[4], this.__value, this.checked)), i(1, s);
  }
  function $() {
    (s.race = Ae(f[4], this.__value, this.checked)), i(1, s);
  }
  function F() {
    (s.race = Ae(f[4], this.__value, this.checked)), i(1, s);
  }
  function N() {
    (s.race = Ae(f[4], this.__value, this.checked)), i(1, s);
  }
  function T() {
    (s.race = Ae(f[4], this.__value, this.checked)), i(1, s);
  }
  function G() {
    (s.race = Ae(f[4], this.__value, this.checked)), i(1, s);
  }
  function U() {
    (s.income_bracket = this.__value), i(1, s);
  }
  function Q() {
    (s.income_bracket = this.__value), i(1, s);
  }
  function C() {
    (s.income_bracket = this.__value), i(1, s);
  }
  function E() {
    (s.income_bracket = this.__value), i(1, s);
  }
  function Se() {
    (s.income_bracket = this.__value), i(1, s);
  }
  function Je() {
    (s.income_bracket = this.__value), i(1, s);
  }
  function b() {
    (s.income_bracket = this.__value), i(1, s);
  }
  function o() {
    (s.income_bracket = this.__value), i(1, s);
  }
  function d() {
    (s.app_usage_frequency = this.__value), i(1, s);
  }
  function g() {
    (s.app_usage_frequency = this.__value), i(1, s);
  }
  function _() {
    (s.app_usage_frequency = this.__value), i(1, s);
  }
  function y() {
    (s.app_usage_frequency = this.__value), i(1, s);
  }
  function v() {
    (s.mindless_usage_frequency = this.__value), i(1, s);
  }
  function q() {
    (s.mindless_usage_frequency = this.__value), i(1, s);
  }
  function L() {
    (s.mindless_usage_frequency = this.__value), i(1, s);
  }
  function P() {
    (s.mindless_usage_frequency = this.__value), i(1, s);
  }
  function A() {
    (s.average_mindless_usage_duration_minutes = Dn(this.value)), i(1, s);
  }
  function H() {
    (s.social_media_health_impact = this.__value), i(1, s);
  }
  function Ce() {
    (s.social_media_health_impact = this.__value), i(1, s);
  }
  function V() {
    (s.social_media_health_impact = this.__value), i(1, s);
  }
  return [
    l,
    s,
    c,
    m,
    M,
    w,
    j,
    f,
    k,
    J,
    z,
    R,
    $e,
    Re,
    h,
    p,
    $,
    F,
    N,
    T,
    G,
    U,
    Q,
    C,
    E,
    Se,
    Je,
    b,
    o,
    d,
    g,
    _,
    y,
    v,
    q,
    L,
    P,
    A,
    H,
    Ce,
    V,
  ];
}
class ks extends Ln {
  constructor(t) {
    super(), Tn(this, t, xs, ws, Rt, {}, null, [-1, -1]);
  }
}
function Ms(e) {
  let t, i;
  return (
    (t = new ks({})),
    {
      c() {
        Gn(t.$$.fragment);
      },
      m(l, s) {
        En(t, l, s), (i = !0);
      },
      i(l) {
        i || (Ne(t.$$.fragment, l), (i = !0));
      },
      o(l) {
        Ze(t.$$.fragment, l), (i = !1);
      },
      d(l) {
        qn(t, l);
      },
    }
  );
}
function Os(e) {
  let t, i;
  return (
    (t = new is({ props: { show: !0 } })),
    {
      c() {
        Gn(t.$$.fragment);
      },
      m(l, s) {
        En(t, l, s), (i = !0);
      },
      i(l) {
        i || (Ne(t.$$.fragment, l), (i = !0));
      },
      o(l) {
        Ze(t.$$.fragment, l), (i = !1);
      },
      d(l) {
        qn(t, l);
      },
    }
  );
}
function $s(e) {
  let t, i, l, s;
  const c = [Os, Ms],
    f = [];
  function m(M, w) {
    return 1;
  }
  return (
    (i = m()),
    (l = f[i] = c[i](e)),
    {
      c() {
        (t = u("div")),
          l.c(),
          r(
            t,
            "class",
            "tw-fixed tw-top-0 tw-right-0 tw-left-0 tw-bottom-0 tw-w-full tw-min-h-screen tw-h-screen tw-flex tw-justify-center tw-z-[9999999999] tw-overflow-hidden tw-overscroll-contain tw-pointer-events-none font-cabin"
          );
      },
      m(M, w) {
        Qe(M, t, w), f[i].m(t, null), (s = !0);
      },
      p: Le,
      i(M) {
        s || (Ne(l), (s = !0));
      },
      o(M) {
        Ze(l), (s = !1);
      },
      d(M) {
        M && Pe(t), f[i].d();
      },
    }
  );
}
class Ss extends Ln {
  constructor(t) {
    super(), Tn(this, t, null, $s, Rt, {});
  }
}
new Ss({ target: document.getElementById("extension-app") });
