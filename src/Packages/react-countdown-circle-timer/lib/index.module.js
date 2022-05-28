import F from 'react';
import { useRef as D } from 'react';
import { useState as q, useRef as g, useCallback as L } from 'react';
import { useEffect as M, useLayoutEffect as z } from 'react';
var B = typeof window == 'undefined' ? M : z,
  I = ({ isPlaying: n, duration: e, startAt: o = 0, updateInterval: t = 0, onComplete: u, onUpdate: r }) => {
    let [s, m] = q(o),
      l = g(0),
      p = g(o),
      d = g(o * -1e3),
      i = g(null),
      c = g(null),
      w = g(null),
      y = f => {
        let a = f / 1e3;
        if (c.current === null) {
          (c.current = a), (i.current = requestAnimationFrame(y));
          return;
        }
        let R = a - c.current,
          h = l.current + R;
        (c.current = a), (l.current = h);
        let S = p.current + (t === 0 ? h : ((h / t) | 0) * t),
          E = p.current + h,
          k = typeof e == 'number' && E >= e;
        m(k ? e : S), k || (i.current = requestAnimationFrame(y));
      },
      C = () => {
        i.current && cancelAnimationFrame(i.current), w.current && clearTimeout(w.current), (c.current = null);
      },
      b = L(
        f => {
          C(), (l.current = 0);
          let a = typeof f == 'number' ? f : o;
          (p.current = a), m(a), n && (i.current = requestAnimationFrame(y));
        },
        [n, o],
      );
    return (
      B(() => {
        if ((r == null || r(s), e && s >= e)) {
          d.current += e * 1e3;
          let { shouldRepeat: f = !1, delay: a = 0, newStartAt: R } = (u == null ? void 0 : u(d.current / 1e3)) || {};
          f && (w.current = setTimeout(() => b(R), a * 1e3));
        }
      }, [s, e]),
      B(() => (n && (i.current = requestAnimationFrame(y)), C), [n, e, t]),
      { elapsedTime: s, reset: b }
    );
  };
var A = (n, e, o) => {
    let t = n / 2,
      u = e / 2,
      r = t - u,
      s = 2 * r,
      m = o === 'clockwise' ? '1,0' : '0,1',
      l = 2 * Math.PI * r;
    return {
      path: `m ${t},${u} a ${r},${r} 0 ${m} 0,${s} a ${r},${r} 0 ${m} 0,-${s}`,
      pathLength: l,
    };
  },
  x = (n, e) => (n === 0 || n === e ? 0 : typeof e == 'number' ? n - e : 0),
  T = n => ({ position: 'relative' }),
  P = { display: 'flex', justifyContent: 'center', alignItems: 'center' };
var G = (n, e, o, t) => {
    if (t === 0) return e;
    let u = n / t;
    return e + o * u;
  },
  v = n => {
    var e, o;
    return (o =
      (e = n
        .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (t, u, r, s) => `#${u}${u}${r}${r}${s}${s}`)
        .substring(1)
        .match(/.{2}/g)) == null
        ? void 0
        : e.map(t => parseInt(t, 16))) != null
      ? o
      : [];
  },
  U = (n, e) => {
    var d;
    let { colors: o, colorsTime: t, isSmoothColorTransition: u = !0 } = n;
    if (typeof o == 'string') return o;
    let r = (d = t == null ? void 0 : t.findIndex((i, c) => i >= e && e >= t[c + 1])) != null ? d : -1;
    if (!t || r === -1) return o[0];
    if (!u) return o[r];
    let s = t[r] - e,
      m = t[r] - t[r + 1],
      l = v(o[r]),
      p = v(o[r + 1]);
    return `rgb(${l.map((i, c) => G(s, i, p[c] - i, m) | 0).join(',')})`;
  },
  $ = n => {
    let {
        duration: e,
        initialRemainingTime: o,
        updateInterval: t,
        size: u = 120,
        strokeWidth: r = 12,
        trailStrokeWidth: s,
        isPlaying: m = !0,
        rotation: l = 'clockwise',
        onComplete: p,
        onUpdate: d,
      } = n,
      i = D(),
      c = Math.max(r, s != null ? s : 0),
      { path: w, pathLength: y } = A(u, c, l),
      { elapsedTime: C } = I({
        isPlaying: m,
        duration: e,
        startAt: x(e, o),
        updateInterval: t,
        onUpdate:
          typeof d == 'function'
            ? f => {
                let a = Math.ceil(e - f);
                a !== i.current && ((i.current = a), d(a));
              }
            : void 0,
        onComplete:
          typeof p == 'function'
            ? f => {
                var S;
                let { shouldRepeat: a, delay: R, newInitialRemainingTime: h } = (S = p(f)) != null ? S : {};
                if (a) return { shouldRepeat: a, delay: R, newStartAt: x(e, h) };
              }
            : void 0,
      }),
      b = e - C;
    return {
      elapsedTime: C,
      path: w,
      pathLength: y,
      remainingTime: Math.ceil(b),
      rotation: l,
      size: u,
      stroke: U(n, b),
      strokeDashoffset: G(C, 0, y, e),
      strokeWidth: r,
    };
  };
var W = n => {
  let { children: e, strokeLinecap: o, trailColor: t, trailStrokeWidth: u } = n,
    {
      path: r,
      pathLength: s,
      stroke: m,
      strokeDashoffset: l,
      remainingTime: p,
      elapsedTime: d,
      size: i,
      strokeWidth: c,
    } = $(n);
  return F.createElement(
    'div',
    { style: T(i) },
    typeof e == 'function' && F.createElement('div', { style: P }, e({ remainingTime: p, elapsedTime: d, color: m })),
  );
};
W.displayName = 'CountdownCircleTimer';
export { W as CountdownCircleTimer, $ as useCountdown };
