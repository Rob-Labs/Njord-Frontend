var U = Object.create;
var x = Object.defineProperty;
var j = Object.getOwnPropertyDescriptor;
var N = Object.getOwnPropertyNames;
var O = Object.getPrototypeOf,
  V = Object.prototype.hasOwnProperty;
var F = t => x(t, '__esModule', { value: !0 });
var H = (t, e) => {
    F(t);
    for (var n in e) x(t, n, { get: e[n], enumerable: !0 });
  },
  J = (t, e, n) => {
    if ((e && typeof e == 'object') || typeof e == 'function')
      for (let r of N(e))
        !V.call(t, r) &&
          r !== 'default' &&
          x(t, r, {
            get: () => e[r],
            enumerable: !(n = j(e, r)) || n.enumerable,
          });
    return t;
  },
  T = t =>
    J(
      F(
        x(
          t != null ? U(O(t)) : {},
          'default',
          t && t.__esModule && 'default' in t ? { get: () => t.default, enumerable: !0 } : { value: t, enumerable: !0 },
        ),
      ),
      t,
    );
H(exports, { CountdownCircleTimer: () => G, useCountdown: () => S });
var A = T(require('react'));
var L = T(require('react'));
var d = T(require('react')),
  P = T(require('react')),
  W = typeof window == 'undefined' ? P.useEffect : P.useLayoutEffect,
  E = ({ isPlaying: t, duration: e, startAt: n = 0, updateInterval: r = 0, onComplete: u, onUpdate: o }) => {
    let [s, m] = (0, d.useState)(n),
      l = (0, d.useRef)(0),
      p = (0, d.useRef)(n),
      f = (0, d.useRef)(n * -1e3),
      i = (0, d.useRef)(null),
      c = (0, d.useRef)(null),
      w = (0, d.useRef)(null),
      C = y => {
        let a = y / 1e3;
        if (c.current === null) {
          (c.current = a), (i.current = requestAnimationFrame(C));
          return;
        }
        let R = a - c.current,
          g = l.current + R;
        (c.current = a), (l.current = g);
        let $ = p.current + (r === 0 ? g : ((g / r) | 0) * r),
          D = p.current + g,
          v = typeof e == 'number' && D >= e;
        m(v ? e : $), v || (i.current = requestAnimationFrame(C));
      },
      h = () => {
        i.current && cancelAnimationFrame(i.current), w.current && clearTimeout(w.current), (c.current = null);
      },
      b = (0, d.useCallback)(
        y => {
          h(), (l.current = 0);
          let a = typeof y == 'number' ? y : n;
          (p.current = a), m(a), t && (i.current = requestAnimationFrame(C));
        },
        [t, n],
      );
    return (
      W(() => {
        if ((o == null || o(s), e && s >= e)) {
          f.current += e * 1e3;
          let { shouldRepeat: y = !1, delay: a = 0, newStartAt: R } = (u == null ? void 0 : u(f.current / 1e3)) || {};
          y && (w.current = setTimeout(() => b(R), a * 1e3));
        }
      }, [s, e]),
      W(() => (t && (i.current = requestAnimationFrame(C)), h), [t, e, r]),
      { elapsedTime: s, reset: b }
    );
  };
var q = (t, e, n) => {
    let r = t / 2,
      u = e / 2,
      o = r - u,
      s = 2 * o,
      m = n === 'clockwise' ? '1,0' : '0,1',
      l = 2 * Math.PI * o;
    return {
      path: `m ${r},${u} a ${o},${o} 0 ${m} 0,${s} a ${o},${o} 0 ${m} 0,-${s}`,
      pathLength: l,
    };
  },
  k = (t, e) => (t === 0 || t === e ? 0 : typeof e == 'number' ? t - e : 0),
  B = t => ({ position: 'relative' }),
  I = { display: 'flex', justifyContent: 'center', alignItems: 'center' };
var M = (t, e, n, r) => {
    if (r === 0) return e;
    let u = t / r;
    return e + n * u;
  },
  z = t => {
    var e, n;
    return (n =
      (e = t
        .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (r, u, o, s) => `#${u}${u}${o}${o}${s}${s}`)
        .substring(1)
        .match(/.{2}/g)) == null
        ? void 0
        : e.map(r => parseInt(r, 16))) != null
      ? n
      : [];
  },
  K = (t, e) => {
    var f;
    let { colors: n, colorsTime: r, isSmoothColorTransition: u = !0 } = t;
    if (typeof n == 'string') return n;
    let o = (f = r == null ? void 0 : r.findIndex((i, c) => i >= e && e >= r[c + 1])) != null ? f : -1;
    if (!r || o === -1) return n[0];
    if (!u) return n[o];
    let s = r[o] - e,
      m = r[o] - r[o + 1],
      l = z(n[o]),
      p = z(n[o + 1]);
    return `rgb(${l.map((i, c) => M(s, i, p[c] - i, m) | 0).join(',')})`;
  },
  S = t => {
    let {
        duration: e,
        initialRemainingTime: n,
        updateInterval: r,
        size: u = 120,
        strokeWidth: o = 12,
        trailStrokeWidth: s,
        isPlaying: m = !0,
        rotation: l = 'clockwise',
        onComplete: p,
        onUpdate: f,
      } = t,
      i = (0, L.useRef)(),
      c = Math.max(o, s != null ? s : 0),
      { path: w, pathLength: C } = q(u, c, l),
      { elapsedTime: h } = E({
        isPlaying: m,
        duration: e,
        startAt: k(e, n),
        updateInterval: r,
        onUpdate:
          typeof f == 'function'
            ? y => {
                let a = Math.ceil(e - y);
                a !== i.current && ((i.current = a), f(a));
              }
            : void 0,
        onComplete:
          typeof p == 'function'
            ? y => {
                var $;
                let { shouldRepeat: a, delay: R, newInitialRemainingTime: g } = ($ = p(y)) != null ? $ : {};
                if (a) return { shouldRepeat: a, delay: R, newStartAt: k(e, g) };
              }
            : void 0,
      }),
      b = e - h;
    return {
      elapsedTime: h,
      path: w,
      pathLength: C,
      remainingTime: Math.ceil(b),
      rotation: l,
      size: u,
      stroke: K(t, b),
      strokeDashoffset: M(h, 0, C, e),
      strokeWidth: o,
    };
  };
var G = t => {
  let { children: e, strokeLinecap: n, trailColor: r, trailStrokeWidth: u } = t,
    {
      path: o,
      pathLength: s,
      stroke: m,
      strokeDashoffset: l,
      remainingTime: p,
      elapsedTime: f,
      size: i,
      strokeWidth: c,
    } = S(t);
  return A.default.createElement(
    'div',
    { style: B(i) },
    typeof e == 'function' &&
      A.default.createElement('div', { style: I }, e({ remainingTime: p, elapsedTime: f, color: m })),
  );
};
G.displayName = 'CountdownCircleTimer';
