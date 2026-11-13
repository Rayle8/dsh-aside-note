window.__ModuleLoader__.load({ id: "dsh-aside-note", factory: (require) => {

var module = { exports: {} }; var exports = module.exports;
// \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod, mod.exports), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") {
		for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp.call(to, key) && key !== except) {
				__defProp(to, key, {
					get: ((k) => from[k]).bind(null, key),
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
				});
			}
		}
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

let react = require("react");
react = __toESM(react, 1);
let react_dom_client = require("react-dom/client");
react_dom_client = __toESM(react_dom_client, 1);
let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
_deepseek_ai_dsh_client_ui_primitives = __toESM(_deepseek_ai_dsh_client_ui_primitives, 1);
let react_dom = require("react-dom");
react_dom = __toESM(react_dom, 1);

// node_modules/aegis-web-sdk/lib/aegis.min.js
var require_aegis_min = /* @__PURE__ */ __commonJSMin(((exports, module, this$1) => {
	/**
	*  ===========================================================================
	* aegis-web-sdk@1.41.17 (c) 2026 TencentCloud Real User Monitoring.
	* Author pumpkincai.
	* Last Release Time Tue Oct 27 2026 19:43:24 GMT+0800 (China Standard Time).
	* Released under the MIT License.
	* Thanks for supporting RUM & Aegis!
	* ===========================================================================
	**/
	((e, t) => {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Aegis = t();
	})(this$1, function() {
		var I, A;
		function M(e) {
			this.name = "__st" + (1e9 * Math.random() >>> 0) + I + "__", e?.forEach(this.add, this), I += 1;
		}
		Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
			configurable: !0,
			writable: !0,
			value: function(e) {
				if (null === this) throw new TypeError("\"this\" is null or not defined");
				var t = Object(this), n = t.length >>> 0;
				if ("function" != typeof e) throw new TypeError("predicate must be a function");
				for (var r = arguments[1], i = 0; i < n;) {
					var o = t[i];
					if (e.call(r, o, i, t)) return o;
					i += 1;
				}
			}
		}), window.WeakSet || (I = Date.now() % 1e9, M.prototype.add = function(e) {
			var t = this.name;
			return e[t] || Object.defineProperty(e, t, {
				value: !0,
				writable: !0
			}), this;
		}, M.prototype.delete = function(e) {
			return !!e[this.name] && !(e[this.name] = void 0);
		}, M.prototype.has = function(e) {
			return !!e[this.name];
		}, A = M, Object.defineProperty(window, "WeakSet", { value: function(e) {
			return new A(e);
		} })), Object.assign || Object.defineProperty(Object, "assign", {
			enumerable: !1,
			configurable: !0,
			writable: !0,
			value: function(e) {
				if (null == e) throw new TypeError("Cannot convert first argument to object");
				for (var t = Object(e), n = 1; n < arguments.length; n++) if (null != (r = arguments[n])) for (var r = Object(r), i = Object.keys(Object(r)), o = 0, a = i.length; o < a; o++) {
					var s = i[o], l = Object.getOwnPropertyDescriptor(r, s);
					null != l && l.enumerable && (t[s] = r[s]);
				}
				return t;
			}
		});
		var N = function(e, t) {
			return (N = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? function(e, t) {
				e.__proto__ = t;
			} : function(e, t) {
				for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
			}))(e, t);
		}, oe = function() {
			return (oe = Object.assign || function(e) {
				for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
				return e;
			}).apply(this, arguments);
		};
		function ae(e, a, s, l) {
			return new (s = s || Promise)(function(n, t) {
				function r(e) {
					try {
						o(l.next(e));
					} catch (e) {
						t(e);
					}
				}
				function i(e) {
					try {
						o(l.throw(e));
					} catch (e) {
						t(e);
					}
				}
				function o(e) {
					var t;
					e.done ? n(e.value) : ((t = e.value) instanceof s ? t : new s(function(e) {
						e(t);
					})).then(r, i);
				}
				o((l = l.apply(e, a || [])).next());
			});
		}
		function se(r, i) {
			var o, a, s, l = {
				label: 0,
				sent: function() {
					if (1 & s[0]) throw s[1];
					return s[1];
				},
				trys: [],
				ops: []
			}, e = {
				next: t(0),
				throw: t(1),
				return: t(2)
			};
			return "function" == typeof Symbol && (e[Symbol.iterator] = function() {
				return this;
			}), e;
			function t(n) {
				return function(e) {
					var t = [n, e];
					if (o) throw new TypeError("Generator is already executing.");
					for (; l;) try {
						if (o = 1, a && (s = 2 & t[0] ? a.return : t[0] ? a.throw || ((s = a.return) && s.call(a), 0) : a.next) && !(s = s.call(a, t[1])).done) return s;
						switch (a = 0, (t = s ? [2 & t[0], s.value] : t)[0]) {
							case 0:
							case 1:
								s = t;
								break;
							case 4: return l.label++, {
								value: t[1],
								done: !1
							};
							case 5:
								l.label++, a = t[1], t = [0];
								continue;
							case 7:
								t = l.ops.pop(), l.trys.pop();
								continue;
							default:
								if (!((s = 0 < (s = l.trys).length && s[s.length - 1]) || 6 !== t[0] && 2 !== t[0])) {
									l = 0;
									continue;
								}
								if (3 === t[0] && (!s || t[1] > s[0] && t[1] < s[3])) l.label = t[1];
								else if (6 === t[0] && l.label < s[1]) l.label = s[1], s = t;
								else {
									if (!(s && l.label < s[2])) {
										s[2] && l.ops.pop(), l.trys.pop();
										continue;
									}
									l.label = s[2], l.ops.push(t);
								}
						}
						t = i.call(r, l);
					} catch (e) {
						t = [6, e], a = 0;
					} finally {
						o = s = 0;
					}
					if (5 & t[0]) throw t[1];
					return {
						value: t[0] ? t[1] : void 0,
						done: !0
					};
				};
			}
		}
		function C() {
			for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
			for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var o = arguments[t], a = 0, s = o.length; a < s; a++, i++) r[i] = o[a];
			return r;
		}
		var le, m, u, _ = /_?t(\d)?(imestamp)?=\d+&?/g, F = [
			"aegis.qq.com",
			"tamaegis.com",
			"/aegis-sdk",
			"rumt-",
			"/flog.core.min.js",
			"pingfore.qq.com",
			"pingfore.tencent.com",
			"zhiyan.tencent-cloud.net",
			"h.trace.qq.com",
			"btrace.qq.com",
			"beacon.qq.com",
			"dmplog.qq.com",
			"qq.com/report",
			"svibeacon.onezapp.com",
			"cube.weixinbridge.com",
			"doubleclick.net",
			"pcmgrmonitor.3g.qq.com",
			"tdm.qq.com",
			"report.qqweb.qq.com",
			"tpstelemetry.tencent.com",
			"galileotelemetry.tencent.com",
			"insight.cloud.tencent.com",
			"facebook.com",
			"facebook.net",
			"google",
			"yahoo.com",
			"twitter.com",
			"ga-audiences",
			"report.idqqimg.com",
			"arms-retcode.aliyuncs.com",
			"px.effirst.com",
			"sentry",
			"baidu.com",
			"hot-update.json",
			"u.c.b.r.o.w.s.e.r",
			"report.url.cn",
			"sockjs-node",
			"m3u8",
			"flv"
		], H = [
			"ResizeObserver loop limit exceeded",
			"ResizeObserver loop completed",
			"Failed to execute 'transaction'",
			"window.indexedDB.deleteDatabase is not a function"
		], U = [
			"ext1",
			"ext2",
			"ext3",
			"ext4",
			"ext5",
			"ext6",
			"ext7",
			"ext8",
			"ext9",
			"ext10",
			"level",
			"trace",
			"tag",
			"seq",
			"code"
		], D = ["static", "fetch"], R = "unknown";
		(n = le = le || {}).INFO_ALL = "-1", n.API_RESPONSE = "1", n.INFO = "2", n.ERROR = "4", n.PROMISE_ERROR = "8", n.AJAX_ERROR = "16", n.SCRIPT_ERROR = "32", n.IMAGE_ERROR = "64", n.CSS_ERROR = "128", n.CONSOLE_ERROR = "256", n.MEDIA_ERROR = "512", n.RET_ERROR = "1024", n.PAGE_LOAD = "1025", n.SLOW_PAGE_LOAD = "1026", n.SLOW_NET_REQUEST = "1027", n.ASSERT_REQUEST = "1028", n.SLOW_ASSET_REQUEST = "1029", n.CLICK_EVENT = "1030", n.CONSOLE_LOG = "1031", n.BLANK_SCREEN = "1032", n.MEMORY_OOM = "1033", n.LAG_MONITOR = "1034", n.NORESPONSE_LOG = "1035", n.REPORT = "2048", n.PV = "4096", n.EVENT = "8192", n.SPEED_EVENT = "8193", n.PAGE_NOT_FOUND_ERROR = "16384", n.WEBSOCKET_ERROR = "32768", n.BRIDGE_ERROR = "65536", n.LAZY_LOAD_ERROR = "131072", n.CRASH_ERROR = "262144", (n = m = m || {}).LOG = "log", n.SPEED = "speed", n.PERFORMANCE = "performance", n.OFFLINE = "offline", n.WHITE_LIST = "whiteList", n.VITALS = "vitals", n.PV = "pv", n.CUSTOM_PV = "customPV", n.EVENT = "event", n.CUSTOM = "custom", n.SDK_ERROR = "sdkError", n.SET_DATA = "setData", n.LOAD_PACKAGE = "loadPackage", n.MEMORY = "memory", (n = u = u || {}).production = "production", n.development = "development", n.gray = "gray", n.pre = "pre", n.daily = "daily", n.local = "local", n.test = "test", n.others = "others";
		function q(e, n) {
			var t;
			return "string" != typeof e ? "" : "object" == typeof n && n ? (t = Object.getOwnPropertyNames(n).map(function(e) {
				var t = n[e];
				return e + "=" + ("string" == typeof t ? encodeURIComponent(t) : encodeURIComponent(JSON.stringify(t)));
			}).join("&").replace(/eval/gi, "evaI"), e + (-1 === e.indexOf("?") ? "?" : "&") + t) : e;
		}
		z.prototype.indexOf = function(e, t) {
			for (var n = 0; n < e.length; n++) if (e[n].callback === t) return n;
			return -1;
		}, z.prototype.on = function(e, t, n) {
			var r;
			if (void 0 === n && (n = 0), this) return (r = this.eventsList[e]) || (this.eventsList[e] = [], r = this.eventsList[e]), -1 === this.indexOf(r, t) && r.push({
				name: e,
				type: n || 0,
				callback: t
			}), this;
		}, z.prototype.one = function(e, t) {
			this.on(e, t, 1);
		}, z.prototype.remove = function(e, t) {
			if (this) {
				var n = this.eventsList[e];
				if (n) {
					if (t) return n.length && (t = this.indexOf(n, t), n.splice(t, 1)), this;
					try {
						delete this.eventsList[e];
					} catch (e) {}
				}
				return null;
			}
		}, z.prototype.clear = function() {
			this.eventsList = {};
		};
		var j, W = z, B = function(e) {
			if (!e || 0 === e.length) return "{}";
			e = Array.isArray(e) ? e : [e];
			var t = Array.from(new Set(e.flatMap(function(e) {
				return Object.keys(e);
			}))), n = {};
			return t.forEach(function(t) {
				n[t] = e.map(function(e) {
					return e[t] || "";
				});
			}), n.count = e.length, g(n);
		};
		function z() {
			var s = this;
			this.emit = function(e) {
				for (var t, n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
				if (s) {
					if (null != (i = s.eventsList[e]) && i.length) for (var i = i.slice(), o = 0; o < i.length; o++) {
						t = i[o];
						try {
							var a = t.callback.apply(s, n);
							if (1 === t.type && s.remove(e, t.callback), !1 === a) break;
						} catch (e) {
							throw e;
						}
					}
					return s;
				}
			}, this.eventsList = {};
		}
		(n = j = j || {})[n.number = -1] = "number", n.string = "";
		function G(e, t) {
			return "number" == typeof e || "string" == typeof e ? e : t ? j.string : j.number;
		}
		function V(e, t) {
			return "string" == typeof e ? e.split("?")[t ? 1 : 0] || "" : e;
		}
		function J(e, t) {
			return void 0 === t && (t = 2048), String(e).replace(_, "").slice(0, t);
		}
		function X(e) {
			return "string" == typeof e && /^\//.test(e) ? "https:" === (null == location ? void 0 : location.protocol) : /^https/.test(e);
		}
		function $(e, t, n) {
			var r, i, o;
			try {
				if ("function" == typeof (null == t ? void 0 : t.retCodeHandler)) return {
					code: void 0 === (o = (i = t.retCodeHandler(e, null == n ? void 0 : n.url, null == n ? void 0 : n.ctx, null == n ? void 0 : n.payload) || {}).code) ? R : o,
					isErr: i.isErr
				};
				if (!(e = "string" == typeof e ? JSON.parse(e) : e)) return {
					code: R,
					isErr: !1
				};
				"function" == typeof (null == (r = null == t ? void 0 : t.ret) ? void 0 : r.join) && (he = [].concat(t.ret.map(function(e) {
					return e.toLowerCase();
				})));
				var a = Object.getOwnPropertyNames(e).filter(function(e) {
					return -1 !== he.indexOf(e.toLowerCase());
				});
				return a.length ? {
					code: "" + (o = "未知" !== (o = e[a[0]]) && "" !== o ? o : R),
					isErr: 0 !== o && "0" !== o && o !== R
				} : {
					code: R,
					isErr: !1
				};
			} catch (e) {
				return {
					code: R,
					isErr: !1
				};
			}
		}
		function K(e, t, n) {
			try {
				return me("function" == typeof t ? t(e, null == n ? void 0 : n.url, null == n ? void 0 : n.ctx) || "" : e).slice(0, 10240);
			} catch (e) {
				return "";
			}
		}
		function Q(e, t) {
			var n, r = {
				fetch: [],
				static: [],
				bridge: []
			}, i = {};
			return Array.isArray(e) ? e.forEach(function(e) {
				var t;
				null != (t = r[e.type]) && t.push(e);
			}) : null != (n = r[e.type]) && n.push(e), i.payload = JSON.stringify(oe({ duration: r }, t)), i;
		}
		function Y(t, e) {
			return "string" != typeof t || !t || e && -1 < t.indexOf(e) || ye.test(t) || F.some(function(e) {
				return -1 < t.indexOf(e);
			});
		}
		function Z(e, t, n, r) {
			var i = e.rateLimitConfigs;
			i ? r === m.LOG && Array.isArray(t) ? (e = t.filter(function(e) {
				e = Ee(r, e.level);
				return Se(i[e]);
			})).length && n(e) : (e = Ee(r), Se(i[e]) && n(t)) : n(t);
		}
		function ee(n, r) {
			var i, o = [], a = n.config;
			return n.lifeCycle.on("destroy", function() {
				o.length = 0;
			}), function(e, t) {
				Array.isArray(e) ? o = o.concat(e) : o.push(e), r && o.length >= r || n.sendNow && 0 < o.length ? (o = Re(o), 0 < (o = Array.isArray(o) ? o : []).length && t(o.splice(0, o.length)), i && clearTimeout(i)) : (i && clearTimeout(i), i = setTimeout(function() {
					i = null, o = Re(o), 0 < (o = Array.isArray(o) ? o : []).length && t(o.splice(0, o.length));
				}, a.delay));
			};
		}
		function te(e, t) {
			return Array.isArray(e) ? t(e.map(function(e) {
				return t = oe(oe({}, e), { msg: "string" == typeof e.msg ? e.msg : [].concat(e.msg).map(ce).join(" ") }), U.forEach(function(e) {
					t[e] || delete t[e];
				}), t;
				var t;
			})) : t([oe(oe({}, e), { msg: "string" == typeof e.msg ? e.msg : ce(e.msg) })]);
		}
		function ne(l, c) {
			return function(i, o) {
				var a, s, e, t, n;
				null != i && i.log && null != i && i.type ? (a = function(e, t, n) {
					switch (t) {
						case m.LOG: return B(Pe(e));
						case m.SPEED:
							var r = e, i = n;
							return i = i && "undefined" !== i ? oe(oe({}, l.bean), { from: i }) : oe({}, l.bean), g(Q(r, i));
						case m.EVENT: return g({ payload: g(Array.isArray(e) ? e : [e]) });
						case m.CUSTOM: return g({ payload: g({ custom: Array.isArray(e) ? e : [e] }) });
						default: return {};
					}
				}, 1 !== (e = Array.isArray(i.log) ? i.log : [i.log]).length ? (s = {}, e.forEach(function(e) {
					var t = e.from || "undefined";
					delete e.from, s[t] || (s[t] = []), s[t].push(e);
				}), Object.keys(s).forEach(function(e) {
					var t, n = s[e], r = null != (r = i.url) && r.includes("?") ? "&" : "?";
					"undefined" === e ? (t = "" + i.url, o(oe(oe({}, i), {
						url: t,
						log: 1 === n.length ? n[0] : n,
						data: a(n, c, "")
					}))) : (t = i.url + r + "from=" + e, o(oe(oe({}, i), {
						url: t,
						log: 1 === n.length ? n[0] : n,
						beanFilter: C(i.beanFilter || [], ["from"]),
						data: a(n, c, e)
					})));
				})) : (t = (e = e[0]).from, delete e.from, n = null != (n = i.url) && n.includes("?") ? "&" : "?", t ? (n = i.url + n + "from=" + t, o(oe(oe({}, i), {
					url: n,
					log: e,
					beanFilter: C(i.beanFilter || [], ["from"]),
					data: a(e, c, t)
				}))) : (n = "" + i.url, o(oe(oe({}, i), {
					url: n,
					log: e,
					data: a(e, c, "")
				}))))) : o(i);
			};
		}
		function re(l, c) {
			return function(e, t) {
				var n, r, i, o = Array.isArray(e), a = o ? e : [e], s = (l.lifeCycle.emit("beforeRequest", e), l.config.beforeRequest);
				(a = "function" == typeof s ? a.map(function(t) {
					try {
						var e = s({
							logs: t,
							logType: c
						});
						return (null == e ? void 0 : e.logType) === c && null != e && e.logs ? e.logs : !1 !== e && t;
					} catch (e) {
						return t;
					}
				}).filter(function(e) {
					return !1 !== e;
				}) : a).length && (n = a, e = U, !Array.isArray(n) || n.length <= 1 || (r = [], i = [], !(i = "string" == typeof e ? [e] : e)) || i.length <= 0 || (i.forEach(function(t) {
					n.forEach(function(e) {
						null != e && e[t] && r.push(t);
					});
				}), 0 < r.length && (n = n.map(function(e) {
					var t = {};
					return r.forEach(function(e) {
						t[e] = "";
					}), oe(oe({}, t), e);
				}))), a = n, t(o ? a : a[0]));
			};
		}
		function ie(i) {
			return function(e, t) {
				i.lifeCycle.emit("modifyRequest", e);
				var n = i.config.modifyRequest;
				if ("function" == typeof n) try {
					var r = n(e);
					"object" == typeof r && "url" in r && (e = r);
				} catch (e) {
					console.error(e);
				}
				t(e);
			};
		}
		function ue(r) {
			return function(e, t) {
				null != (n = r.lifeCycle) && n.emit("afterRequest", e);
				var n = (r.config || {}).afterRequest;
				"function" == typeof n && !1 === n(e) || t(e);
			};
		}
		var de = [
			"application/xhtml+xml",
			"application/xml",
			"application/pdf",
			"application/pkcs12",
			"application/javascript",
			"application/x-javascript",
			"application/ecmascript",
			"application/vnd.mspowerpoint",
			"application/vnd.apple.mpegurl",
			"application/ogg",
			"text/css",
			"text/javascript",
			"image",
			"audio",
			"video",
			"video/mp2t"
		], fe = /\.(json|js|css|jpg|jpeg|png|svg|apng|webp|gif|bmp|mp4|mp3|ts|mpeg|wav|webm|ogg|flv|m3u8|ttf|woff2|otf|eot|woff|html|htm|shtml|shtm|)$/i, he = [
			"ret",
			"retcode",
			"code",
			"errcode"
		], pe = function() {
			var n = /* @__PURE__ */ new WeakSet();
			return function(e, t) {
				if (t instanceof Error) return "Error.message: " + t.message + " \n  Error.stack: " + t.stack;
				if ("object" == typeof t && null !== t) {
					if (n.has(t)) return "[Circular " + (e || "root") + "]";
					n.add(t);
				}
				return t;
			};
		}, ce = function(e) {
			if ("string" == typeof e) return e;
			try {
				return e instanceof Error ? (JSON.stringify(e, pe(), 2) || "undefined").replace(/"/gim, "") : JSON.stringify(e, pe(), 2) || "undefined";
			} catch (e) {
				return "error happen when aegis stringify: \n " + e.message + " \n " + e.stack;
			}
		}, g = function(e) {
			if ("string" == typeof e) return e;
			try {
				return JSON.stringify(e, pe()) || "undefined";
			} catch (e) {
				return "error happen when aegis stringify: \n " + e.message + " \n " + e.stack;
			}
		}, me = function(n, r) {
			void 0 === r && (r = 3);
			var i, o, a, s = "";
			return null === n ? "null" : (Array.isArray(n) ? (s += "[", i = n.length, n.forEach(function(e, t) {
				s = (s += "object" == typeof e && null !== e && 1 < r ? me(e, r - 1) : ve(e)) + (t === i - 1 ? "" : ",");
			}), s += "]") : n instanceof Object || "object" == typeof n ? (s = "{", o = Object.keys(n), a = o.length, o.forEach(function(e, t) {
				"object" == typeof n[e] && null !== n[e] && 1 < r ? s += "\"" + e + "\":" + me(n[e], r - 1) : s += ge(e, n[e]), s += t === a - 1 || t < a - 1 && void 0 === n[o[t + 1]] ? "" : ",";
			}), s += "}") : s += n, s);
		}, ge = function(e, t) {
			var n = typeof t, r = "";
			return null === t ? r += "\"" + e + "\": null" : "string" == n || "object" == n ? r += "\"" + e + "\":\"" + t + "\"" : "function" == typeof t ? r += "\"" + e + "\":\"function " + t.name + "\"" : "symbol" == typeof t ? r += "\"" + e + "\":\"symbol\"" : "number" != typeof t && "boolean" != n || (r += "\"" + e + "\": " + t), r;
		}, ve = function(e) {
			var t = typeof e;
			return "" + (null === e || "undefined" == t || "symbol" == t || "function" == t ? "null" : "string" == t || "object" == t ? "\"" + e + "\"" : e);
		}, ye = /data:(image|text|application|font)\/.*;base64/, we = ((n = {})[m.LOG] = "log", n[m.MEMORY] = "log", n[m.SPEED] = "speed", n[m.PERFORMANCE] = "performance", n[m.VITALS] = "webvitals", n[m.PV] = "pv", n[m.EVENT] = "event", n[m.CUSTOM] = "custom", n[m.SET_DATA] = "miniProgramData", n[m.LOAD_PACKAGE] = "miniProgramData", n), be = ((n = {})[le.ERROR] = "jsError", n[le.PROMISE_ERROR] = "jsError", n[le.BLANK_SCREEN] = "whiteScreen", n[le.SCRIPT_ERROR] = "assetsException", n[le.IMAGE_ERROR] = "assetsException", n[le.CSS_ERROR] = "assetsException", n[le.MEDIA_ERROR] = "assetsException", n), Ee = function(e, t) {
			return e === m.LOG && t && be[t] ? be[t] : we[e] || "";
		}, Se = function(e) {
			return null == e || !(e <= 0) && (100 <= e || 100 * Math.random() < e);
		}, Re = function(e) {
			return e.filter(function(n, r) {
				return "static" !== n.type || !e.find(function(e, t) {
					return n.url === e.url && 200 === n.status && r < t;
				});
			});
		}, Te = function(e) {
			e.level === le.INFO_ALL && (e.level = le.INFO);
		}, v = {}, Oe = {}, xe = function(e) {
			return v[e] || (v[e] = setTimeout(function() {
				Oe[e] = {}, v[e] = null;
			}, 6e4)), v[e];
		}, Pe = function(e) {
			return (Array.isArray(e) ? e : [e]).map(function(n) {
				return Object.getOwnPropertyNames(n).reduce(function(e, t) {
					return "ctx" !== t && (e[t] = n[t]), e;
				}, {
					level: le.INFO,
					msg: ""
				});
			});
		}, Le = function(r) {
			return function(e) {
				return r.sendPipeline([function(e, n) {
					return n({
						url: r.config.url || "",
						data: B(Pe(e)),
						method: "post",
						contentType: "application/json",
						type: m.LOG,
						log: e,
						requestConfig: { timeout: 5e3 },
						success: function() {
							var t = r.config.onReport;
							"function" == typeof t && e.forEach(function(e) {
								t(e);
							}), "function" == typeof n && n([]);
						}
					});
				}], m.LOG)(e);
			};
		}, Ce = {
			generateTraceId: Ie(16),
			generateSpanId: Ie(8)
		}, ke = Array(32);
		function Ie(t) {
			return function() {
				for (var e = 0; e < 2 * t; e++) ke[e] = Math.floor(16 * Math.random()) + 48, 58 <= ke[e] && (ke[e] += 39);
				return String.fromCharCode.apply(null, ke.slice(0, 2 * t));
			};
		}
		function Ae() {
			return "10000000100040008000100000000000".replace(/[018]/g, function(e) {
				return (e ^ (16 * Math.random() & 15) >> e / 4).toString(16);
			});
		}
		function Me() {
			return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
				var t = 16 * Math.random() | 0;
				return ("x" === e ? t : 3 & t | 8).toString(16);
			});
		}
		function Ne(e) {
			for (var t, n, r, i = "", o = 0, a = (e = String(e)).length % 3; o < e.length;) {
				if (255 < (t = e.charCodeAt(o++)) || 255 < (n = e.charCodeAt(o++)) || 255 < (r = e.charCodeAt(o++))) throw new TypeError("Failed to execute 'btoa': The string to be encoded contains characters outside of the Latin1 range.");
				i += s.charAt((t = t << 16 | n << 8 | r) >> 18 & 63) + s.charAt(t >> 12 & 63) + s.charAt(t >> 6 & 63) + s.charAt(63 & t);
			}
			return a ? i.slice(0, a - 3) + "===".substring(a) : i;
		}
		function _e(e) {
			if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !De.test(e)) throw new TypeError("Failed to execute 'atob': The string to be decoded is not correctly encoded.");
			var t;
			e += "==".slice(2 - (3 & e.length));
			for (var n, r, i = "", o = 0; o < e.length;) t = s.indexOf(e.charAt(o++)) << 18 | s.indexOf(e.charAt(o++)) << 12 | (n = s.indexOf(e.charAt(o++))) << 6 | (r = s.indexOf(e.charAt(o++))), i += 64 === n ? String.fromCharCode(t >> 16 & 255) : 64 === r ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, 255 & t);
			return i;
		}
		function Fe(e) {
			var t, n = "";
			return n = "object" == typeof e && (t = (e = ((e, t) => {
				for (var n = 0; n < t.length; n++) {
					var r = t[n], i = e[r] || "function" == typeof e.get && e.get(r);
					if (i) return [r, i];
				}
				return ["", ""];
			})(e, Object.keys(je)))[0]) ? je[t](e[1]) : n;
		}
		function He(n) {
			if (n && n.reduce && n.length) return 1 === n.length ? function(e, t) {
				n[0](e, t || We);
			} : n.reduce(function(n, r) {
				return function(e, t) {
					return void 0 === t && (t = We), n(e, function(e) {
						return null == r ? void 0 : r(e, t);
					});
				};
			});
			throw new TypeError("createPipeline need at least one function param");
		}
		function Ue(n, r) {
			Object.getOwnPropertyNames(n).forEach(function(e) {
				var t;
				"constructor" === e || !(t = Object.getOwnPropertyDescriptor(n, e)) || t.get || t.set || "function" == typeof t.value && (r ? r[e] = "sendPipeline" === e ? function() {
					return function() {};
				} : function() {} : n[e] = function() {});
			});
		}
		var s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", De = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/, qe = (e.prototype.generate = function(e, t, n) {
			if (void 0 === t && (t = {}), this.url = e, !this.isUrlIgnored() && this.isUrlInTraceUrls() && this.traceType) {
				switch (this.traceType) {
					case "traceparent":
						this.traceId = this.createTraceparent();
						break;
					case "b3":
						this.traceId = this.createB3();
						break;
					case "sw8":
						this.traceId = this.createSw8(n);
						break;
					case "sentry-trace":
						this.traceId = this.createSentryTrace();
						break;
					default:
						console.warn("this trace key " + this.traceType + " is not supported"), this.traceId = "";
						return;
				}
				return t[this.traceType] && (this.traceId = t[this.traceType]), {
					name: this.traceType,
					value: this.traceId
				};
			}
		}, e.prototype.createTraceparent = function() {
			var e = Ce.generateSpanId();
			return "00-" + Ce.generateTraceId() + "-" + e + "-0" + this.traceFlag.toString(16);
		}, e.prototype.createB3 = function() {
			var e = Ce.generateSpanId();
			return Ce.generateTraceId() + "-" + e + "-" + this.traceFlag;
		}, e.prototype.createSw8 = function(e) {
			var t = "function" == typeof btoa ? btoa : Ne, e = e || {}, n = e.host, n = void 0 === n ? "" : n, e = e.pathname, e = void 0 === e ? "" : e, r = Me(), i = Me();
			return "1-" + String(t(i)) + "-" + String(t(r)) + "-1-" + String(t("aegis")) + "-" + String(t("1.41.17")) + "-" + String(t(encodeURI(e))) + "-" + String(t(n));
		}, e.prototype.createSentryTrace = function() {
			var e = Ae().substring(16);
			return Ae() + "-" + e + "-" + this.traceFlag;
		}, e.prototype.isUrlIgnored = function() {
			if (Array.isArray(this.ignoreUrls) && 0 !== this.ignoreUrls.length) for (var e = 0, t = this.ignoreUrls; e < t.length; e++) {
				var n = t[e];
				if (this.urlMatches(this.url, n)) return !0;
			}
			return !1;
		}, e.prototype.isUrlInTraceUrls = function() {
			if (!this.urls) return !0;
			if (Array.isArray(this.urls)) {
				if (0 === this.urls.length) return !1;
				for (var e = 0, t = this.urls; e < t.length; e++) {
					var n = t[e];
					if (this.urlMatches(this.url, n)) return !0;
				}
			}
			return !1;
		}, e.prototype.urlMatches = function(e, t) {
			return "string" == typeof t ? e === t : !!e.match(t);
		}, e), je = {
			sw8: function(e) {
				var t = "function" == typeof atob ? atob : _e, e = e.split("-")[1];
				return e ? t(e) : "";
			},
			traceparent: function(e) {
				return e.split("-")[1];
			},
			b3: function(e) {
				return e.split("-")[0];
			},
			"sentry-trace": function(e) {
				return e.split("-")[0];
			}
		}, We = function() {};
		function e(e, t, n, r) {
			void 0 === n && (n = null), this.traceType = e, this.ignoreUrls = t, this.urls = n, this.traceFlag = null == r ? 1 : Number(!!r);
		}
		function Be(e, t) {
			return e ? t ? "gzip" : "identity" : null;
		}
		function ze() {
			return void 0 !== window.performance && "function" == typeof performance.getEntriesByType && "function" == typeof performance.now;
		}
		function Ge(e) {
			var t;
			return -1 < (null == (t = null == (t = window.PerformanceObserver) ? void 0 : t.supportedEntryTypes) ? void 0 : t.indexOf(e));
		}
		function t(e) {
			return -1 !== $e.indexOf(e);
		}
		y.use = function(e) {
			-1 === y.installedPlugins.indexOf(e) && e.aegisPlugin && y.installedPlugins.push(e);
		}, y.unuse = function(e) {
			e = y.installedPlugins.indexOf(e);
			-1 !== e && y.installedPlugins.splice(e, 1);
		}, y.prototype.init = function(e) {
			function t() {
				i || (n && clearTimeout(n), n = setTimeout(function() {
					i = !0, c();
				}, a.config.uin ? 50 : 500));
			}
			var a, n, r, i, o, s, l, c, u, d;
			this.setConfig(e), this.config = (d = this.config, e = e.hostUrl, d.url = (e = "string" != typeof (e = void 0 === e ? "https://rumt-zh.com" : e) ? "https://rumt-zh.com" : e) + "/collect", d.offlineUrl = e + "/offline", d.whiteListUrl = e + "/collect/whitelist", d.rateLimitUrl = e + "/rateConfig", d.pvUrl = e + "/collect/pv", d.eventUrl = e + "/collect/events", d.speedUrl = e + "/speed", d.customTimeUrl = e + "/speed/custom", d.performanceUrl = e + "/speed/performance", d.performanceUrlForHippy = e + "/speed/hippyPerformance", d.webVitalsUrl = e + "/speed/webvitals", d.setDataReportUrl = e + "/speed/miniProgramData", d.memoryUrl = e + "/memory", d), this.resetWhitelistGzipState(), a = this, i = !1, o = [
				3,
				30,
				300
			], s = 0, l = function() {
				e = o[Math.min(s, o.length - 1)], s += 1;
				var e;
				a.rateLimitSampled || (a.rateLimitReady = !0, a.rateLimitPool && a.rateLimitPool.length && a.rateLimitPool.splice(0).forEach(function(e) {
					e.resolve(e.logs);
				})), u(e);
			}, c = function() {
				var e = a.config.rateLimitUrl, n = void 0 === e ? "" : e;
				n && a.sendPipeline([function(e, t) {
					t({
						url: "" + n,
						type: m.WHITE_LIST,
						method: "get",
						success: function(e) {
							try {
								var n, t = e.data || JSON.parse(e), r = t.retcode, i = t.configs, o = t.ttl;
								0 === r && Array.isArray(i) ? (n = {}, i.forEach(function(e) {
									var t = e.limit_type;
									n[t] = e.sample_rate;
								}), a.rateLimitConfigs = n, a.rateLimitReady = !0, a.rateLimitSampled = !0, a.rateLimitPool && a.rateLimitPool.length && a.rateLimitPool.splice(0).forEach(function(e) {
									Z(a, e.logs, e.resolve, e.sendType);
								}), 0 < o && u(o)) : l();
							} catch (e) {
								l();
							}
						},
						fail: function() {
							l();
						}
					});
				}], m.WHITE_LIST)(null);
			}, u = function(e) {
				r && clearTimeout(r), r = setTimeout(function() {
					i = !1, c();
				}, 1e3 * e);
			}, t(), a.lifeCycle.on("onConfigChange", function() {
				i = !1, s = 0, t();
			}), a.lifeCycle.on("destroy", function() {
				n && clearTimeout(n), r && clearTimeout(r), a.rateLimitPool && (a.rateLimitPool.length = 0);
			});
			for (var f = 0; f < y.installedPlugins.length; f++) try {
				y.installedPlugins[f].patch(this);
			} catch (e) {
				this.sendSDKError(e);
			}
			this.lifeCycle.emit("onInited");
		}, y.prototype.destroy = function(e) {
			void 0 === e && (e = !1);
			var t, n, r = y.instances.indexOf(this);
			-1 !== r && y.instances.splice(r, 1);
			for (var i = y.installedPlugins.length - 1; 0 <= i; i--) try {
				y.installedPlugins[i].unpatch(this);
			} catch (e) {
				this.sendSDKError(e);
			}
			if (this.lifeCycle.emit("destroy"), this.lifeCycle.clear(), e) t = this, n = Object.getOwnPropertyDescriptors(t), Object.keys(n).forEach(function(e) {
				n[e].writable && (t[e] = null);
			}), Object.setPrototypeOf(this, null);
			else {
				for (var o = this; o.constructor !== Object && Ue(o, this), o = Object.getPrototypeOf(o););
				0 === y.instances.length && (r = Object.getPrototypeOf(this).constructor, Ue(r), Ue(y));
			}
		}, y.prototype.setConfig = function(e) {
			Object.assign(this.config, e);
			var e = this.config, t = e.id, n = e.uin, r = e.version, i = e.ext1, o = e.ext2, a = e.ext3, s = e.aid, l = e.env, c = void 0 === l ? "production" : l, l = e.pageUrl, e = this.bean.id !== t || this.bean.uin !== n || this.bean.aid !== s;
			return this.bean.id = t || "", this.bean.uin = n || "", this.bean.version = r || "1.41.17", this.bean.aid = s || "", this.bean.env = (() => {
				switch (c) {
					case u.production:
					case u.development:
					case u.gray:
					case u.pre:
					case u.daily:
					case u.local:
					case u.test:
					case u.others: return 1;
					default: return;
				}
			})() ? c : u.others, l && this.extendBean("from", encodeURIComponent(l.slice(0, 2048))), i && this.extendBean("ext1", encodeURIComponent(i)), o && this.extendBean("ext2", encodeURIComponent(o)), a && this.extendBean("ext3", encodeURIComponent(a)), e && this.lifeCycle.emit("onConfigChange", this.config), this.config;
		}, y.prototype.extendBean = function(e, t) {
			this.bean[e] = t;
		}, y.prototype.resetWhitelistGzipState = function() {
			this.whitelistUseGzip = !0, this.whitelistUseGzipReady = !0;
		}, y.prototype.updateWhitelistGzipState = function(e) {
			this.whitelistUseGzip = null == e || "" === e || 1 === Number(e), this.whitelistUseGzipReady = !0;
		}, y.prototype.disableWhitelistGzipState = function() {
			this.whitelistUseGzip = !1, this.whitelistUseGzipReady = !0;
		}, y.prototype.isGzipReportEnabled = function(e) {
			return !!e && (!this.config.whiteListUrl || this.whitelistUseGzipReady && this.whitelistUseGzip);
		}, y.prototype.send = function(e, i, o) {
			var t = this;
			return He([
				ie(this),
				ne(this, null == e ? void 0 : e.type),
				function(n, r) {
					t.request(n, function() {
						for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
						r({
							isErr: !1,
							result: e,
							logType: n.type,
							logs: n.log
						}), i?.apply(void 0, e);
					}, function() {
						for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
						r({
							isErr: !0,
							result: e,
							logType: n.type,
							logs: n.log
						}), o?.apply(void 0, e);
					});
				},
				ue(this)
			])(e);
		}, y.prototype.sendSDKError = function(e) {
			var n = this;
			this.sendPipeline([function(e, t) {
				t({
					url: n.config.url + "?id=1085&msg[0]=" + encodeURIComponent(ce(e)) + "&level[0]=2&from=" + n.config.id + "&count=1&version=" + n.config.id + "(1.41.17)",
					addBean: !1,
					method: "get",
					type: m.SDK_ERROR,
					log: e
				});
			}], m.SDK_ERROR)(e);
		}, y.prototype.sendPipeline = function(e, t) {
			var n, r, i, o = this;
			return He(C([
				function(e, t) {
					if ("number" != typeof n.config.random && (console.warn("random must in [0, 1], default is 1."), n.config.random = 1), !n.isHidden || !n.isGetSample) if (n.isGetSample) n.isHidden || t(e);
					else {
						if (n.isGetSample = !0, Math.random() < n.config.random) return n.isHidden = !1, t(e);
						n.isHidden = !0;
					}
				},
				function(e, t) {
					if (i !== m.SDK_ERROR && i !== m.WHITE_LIST) return r.rateLimitReady ? void Z(r, e, t, i) : (r.rateLimitPool || (r.rateLimitPool = []), void (r.rateLimitPool.length < 200 && r.rateLimitPool.push({
						logs: e,
						resolve: t,
						sendType: i
					})));
					t(e);
				},
				re(r = n = this, i = t)
			], e, [
				ne(this, t),
				ie(this),
				function(e, t) {
					var n;
					e.url && o.rateLimitSampled && (n = -1 === e.url.indexOf("?") ? "?" : "&", e.url = e.url + n + "sampled=1"), t(e);
				},
				function(r, i) {
					o.request(r, function() {
						for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
						var n = !1;
						-1 < ("" + e[o.failRequestCount = 0]).indexOf("403 forbidden") && (n = !0, o.destroy()), i({
							isErr: n,
							result: e,
							logType: null == r ? void 0 : r.type,
							logs: null == r ? void 0 : r.log
						}), null != (n = null == r ? void 0 : r.success) && n.call.apply(n, C([r], e));
					}, function() {
						for (var e, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
						o.shouldDestroyOnTransportFail() && o.destroy(), -1 < ("" + t[0]).indexOf("403 forbidden") && o.destroy(), i({
							isErr: !0,
							result: t,
							logType: null == r ? void 0 : r.type,
							logs: null == r ? void 0 : r.log
						}), null != (e = null == r ? void 0 : r.fail) && e.call.apply(e, C([r], t));
					});
				},
				ue(this)
			]));
		}, y.prototype.validateRange = function(e) {
			return 0 <= e && e <= 127 ? e : -1;
		}, y.prototype.info = function() {
			for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
			var n = {
				level: le.INFO,
				msg: e,
				originFrom: this.getOriginFrom()
			};
			1 === e.length && e[0].msg && Object.assign(n, oe({}, e[0]), {
				level: le.INFO,
				originFrom: this.getOriginFrom()
			}), this.normalLogPipeline(n);
		}, y.prototype.infoAll = function() {
			for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
			var n = {
				level: le.INFO_ALL,
				msg: e,
				originFrom: this.getOriginFrom()
			};
			1 === e.length && e[0].msg && Object.assign(n, oe({}, e[0]), {
				level: le.INFO_ALL,
				originFrom: this.getOriginFrom()
			}), this.normalLogPipeline(n);
		}, y.prototype.report = function() {
			for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
			var n = {
				level: le.REPORT,
				msg: e,
				originFrom: this.getOriginFrom()
			};
			1 === e.length && e[0].msg && Object.assign(n, oe({}, e[0]), { originFrom: this.getOriginFrom() }), this.normalLogPipeline(n);
		}, y.prototype.error = function() {
			for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
			var n = {
				level: le.ERROR,
				msg: e,
				originFrom: this.getOriginFrom()
			};
			1 === e.length && e[0].msg && Object.assign(n, oe({}, e[0]), {
				level: le.ERROR,
				originFrom: this.getOriginFrom()
			}), this.normalLogPipeline(n);
		}, y.prototype.reportEvent = function(e) {
			e && ((e = "string" == typeof e ? {
				name: e,
				ext1: this.config.ext1 || "",
				ext2: this.config.ext2 || "",
				ext3: this.config.ext3 || "",
				originFrom: this.getOriginFrom()
			} : oe(oe({}, e), { originFrom: e.originFrom || this.getOriginFrom() })).name ? ("string" != typeof e.name && (console.warn("reportEvent params name must be string"), e.name = String(e.name)), this.eventPipeline(e)) : console.warn("reportEvent params error"));
		}, y.prototype.reportT = function(e) {
			var t = e.name, n = e.duration, r = e.ext1, r = void 0 === r ? "" : r, i = e.ext2, i = void 0 === i ? "" : i, o = e.ext3, o = void 0 === o ? "" : o, a = e.ext4, s = e.ext5, l = e.ext6, c = e.ext7, u = e.ext8, d = e.ext9, f = e.ext10, e = e.from;
			if ("string" == typeof t && "number" == typeof n && "string" == typeof r && "string" == typeof i && "string" == typeof o) {
				if (!(n < 0 || 2147483646 < n)) return this.submitCustomTime(t, n, r, i, o, void 0 === a ? "" : a, void 0 === s ? "" : s, void 0 === l ? "" : l, void 0 === c ? "" : c, void 0 === u ? "" : u, void 0 === d ? "" : d, void 0 === f ? "" : f, void 0 === e ? "" : e);
				console.warn("reportTime: duration must between 0 and 2147483646");
			} else console.warn("reportTime: params error");
		}, y.prototype.reportTime = function(e, t) {
			if ("object" == typeof e) return this.reportT(e);
			"string" == typeof e ? "number" == typeof t ? t < 0 || 2147483646 < t ? console.warn("reportTime: duration must between 0 and 2147483646") : (this.submitCustomTime(e, t), this.normalLogPipeline({
				level: le.SPEED_EVENT,
				msg: "key:" + e + "\\n duration:" + t,
				errorMsg: "",
				originFrom: this.getOriginFrom()
			})) : console.warn("reportTime: second param must be number") : console.warn("reportTime: first param must be a string");
		}, y.prototype.time = function(e) {
			"string" == typeof e ? this.timeMap[e] ? console.warn("Timer " + e + " already exists") : this.timeMap[e] = Date.now() : console.warn("time: first param must be a string");
		}, y.prototype.timeEnd = function(e) {
			var t;
			"object" != typeof e || null === e ? "string" == typeof e ? void 0 !== (t = this.getTimeEventDuration(e)) ? (this.submitCustomTime(e, t), delete this.timeMap[e]) : console.warn("Timer " + e + " does not exist") : console.warn("timeEnd: first param must be a string") : void 0 !== (t = this.getTimeEventDuration(e.name)) ? (this.reportT(oe(oe({}, e), { duration: t })), delete this.timeMap[e.name]) : console.warn("Timer " + e.name + " does not exist");
		}, y.prototype.ready = function(e, t, n) {
			throw new Error("You need to override \"ready\" method");
		}, y.prototype.request = function(e, t, n) {
			throw new Error("You need to override \"request\" method");
		}, y.prototype.speedLogPipeline = function(e) {
			throw new Error("You need to override \"speedLogPipeline\" method");
		}, y.prototype.getOriginFrom = function() {
			throw new Error("You need to override \"getOriginFrom\" method");
		}, Object.defineProperty(y.prototype, "__version__", {
			get: function() {
				return "1.41.17";
			},
			enumerable: !1,
			configurable: !0
		}), Object.defineProperty(y.prototype, "LogType", {
			get: function() {
				return le;
			},
			enumerable: !1,
			configurable: !0
		}), y.prototype.reportPv = function(e) {
			e && console.warn("reportPv is deprecated, please use reportEvent");
		}, y.prototype.shouldDestroyOnTransportFail = function() {
			return 60 <= ++this.failRequestCount;
		}, y.prototype.submitCustomTime = function(e, t, n, r, i, o, a, s, l, c, u, d, f) {
			e = {
				name: e,
				duration: t,
				ext1: String(n || this.config.ext1 || "").slice(0, 1024),
				ext2: String(r || this.config.ext2 || "").slice(0, 1024),
				ext3: String(i || this.config.ext3 || "").slice(0, 1024),
				ext4: o || this.config.ext4,
				ext5: a || this.config.ext5,
				ext6: s || this.config.ext6,
				ext7: l || this.config.ext7,
				ext8: c || this.config.ext8,
				ext9: u || this.config.ext9,
				ext10: d || this.config.ext10,
				from: f || void 0
			};
			this.customTimePipeline(e);
		}, y.prototype.getTimeEventDuration = function(e) {
			if (void 0 !== e && this.timeMap[e]) return Date.now() - this.timeMap[e];
		}, y.version = "1.41.17", y.instances = [], y.logType = le, y.environment = u, y.installedPlugins = [];
		var n = y, r = (i.prototype.patch = function(e) {
			this.canUse(e) && this.exist(e) && (this.instances.push(e), this.triggerInit(e), this.triggerOnNewAegis(e));
		}, i.prototype.unpatch = function(e) {
			var t = this.instances.indexOf(e);
			-1 !== t && (this.instances.splice(t, 1), 0 === this.instances.length) && this.uninstall(e);
		}, i.prototype.countInstance = function() {
			return this.instances.length;
		}, i.prototype.uninstall = function(e) {
			var t;
			null != (t = null == (t = this.option) ? void 0 : t.destroy) && t.apply(this, [e]);
		}, i.prototype.walk = function(n) {
			var r = this;
			this.instances.forEach(function(e) {
				var t = r.canUse(e);
				t && n(e, t);
			});
		}, i.prototype.canUse = function(e) {
			e = this.getConfig(e);
			return !(!e || "object" != typeof e) || !!e;
		}, i.prototype.getConfig = function(e) {
			return null == (e = e.config) ? void 0 : e[this.name];
		}, i.prototype.exist = function(e) {
			return -1 === this.instances.indexOf(e);
		}, i.prototype.triggerInit = function(e) {
			var t;
			this.inited || (this.inited = !0, null == (t = null == (t = this.option) ? void 0 : t.init)) || t.call(this.option, this.getConfig(e));
		}, i.prototype.triggerOnNewAegis = function(e) {
			var t;
			null != (t = null == (t = this.option) ? void 0 : t.onNewAegis) && t.call(this.option, e, this.getConfig(e));
		}, i), Ve = new r({
			name: "aid",
			aid: "",
			init: function(e) {
				try {
					var t = !0 !== e && e || window.localStorage.getItem("AEGIS_ID");
					t || (t = Me(), window.localStorage.setItem("AEGIS_ID", t)), this.aid = t;
				} catch (e) {}
			},
			onNewAegis: function(e) {
				e.bean.aid = this.aid, e.config.aid = this.aid;
			}
		}), Je = new r({ name: "reportAssetSpeed" }), Xe = Je = new r({
			name: "reportAssetSpeed",
			collectCur: 0,
			collectEntryType: "resource",
			ASSETS_INITIATOR_TYPE: [
				"img",
				"css",
				"script",
				"link",
				"audio",
				"video"
			],
			getFromParam: function(e) {
				return e.getCurrentPageUrl();
			},
			onNewAegis: function(e) {
				var t = this;
				ze() && (setTimeout(function() {
					t.collectSuccessLog(e), t.collectFailLog(e);
				}, 5e3), performance.onresourcetimingbufferfull = function() {
					"function" == typeof performance.clearResourceTimings && (t.collectCur = 0, performance.clearResourceTimings());
				});
			},
			processLog: function(e, t) {
				var n = t.duration || 0, r = t.transferSize || 0, i = !1, o = e.config;
				if (null != (s = null == o ? void 0 : o.api) && s.isSlowAsset && "function" == typeof (null == (s = null == o ? void 0 : o.api) ? void 0 : s.isSlowAsset)) try {
					i = null == (a = null == o ? void 0 : o.api) ? void 0 : a.isSlowAsset(t);
				} catch (e) {
					console.warn("[Aegis] isSlowAsset function happen error:", e, ", this data will not be reported.");
					return;
				}
				else i = null != (s = null == o ? void 0 : o.api) && s.assetSlowThreshold && "number" == typeof (null == (a = null == o ? void 0 : o.api) ? void 0 : a.assetSlowThreshold) ? n > (null == (s = null == o ? void 0 : o.api) ? void 0 : s.assetSlowThreshold) : 1e3 < n;
				var a = [
					"ASSET_REQUEST: " + t.url,
					"status: " + t.status,
					"duration: " + n + "ms",
					"type: " + t.type,
					"domainLookup: " + t.domainLookup + "ms",
					"connectTime: " + t.connectTime + "ms",
					"transferSize: " + (0 < r ? r + "bytes" : "unknown")
				].filter(Boolean).join("\n\n"), o = e.isWhiteList && e.config.assetLog, s = e.config.slowAssetLog && i, t = {
					level: i ? e.LogType.SLOW_ASSET_REQUEST : e.LogType.ASSERT_REQUEST,
					msg: a,
					ext1: n.toString() || "",
					errorMsg: "",
					originFrom: e.getOriginFrom()
				};
				(o || s) && e.normalLogPipeline(t);
			},
			publish: function(t, n) {
				var r = this;
				this.$walk(function(e) {
					e === n && (e.speedLogPipeline(t), Array.isArray(t) ? t.forEach(r.processLog) : r.processLog(n, t));
				});
			},
			publishMany: function(e, t) {
				for (var n = t.config, r = this.getFromParam(t), i = 0, o = e.length; i < o; i++) {
					var a = e[i];
					-1 === this.ASSETS_INITIATOR_TYPE.indexOf(a.initiatorType) || Y(a.name, n.hostUrl) || this.publish(this.generateLog(a, n, r), t);
				}
			},
			collectSuccessLog: function(n) {
				var e, t, r = this;
				"function" == typeof window.PerformanceObserver ? (this.publishMany(performance.getEntriesByType(this.collectEntryType), n), (e = new window.PerformanceObserver(function(e) {
					r.publishMany(e.getEntries(), n);
				})).observe({ entryTypes: [this.collectEntryType] }), n.lifeCycle.on("destroy", function() {
					0 === Je.countInstance() && e.disconnect();
				})) : (t = setInterval(function() {
					var e = performance.getEntriesByType(r.collectEntryType), t = e.slice(r.collectCur);
					r.collectCur = e.length, r.publishMany(t, n);
				}, 3e3), n.lifeCycle.on("destroy", function() {
					0 === Je.countInstance() && clearInterval(t);
				}));
			},
			collectFailLog: function(o) {
				function e(e) {
					var t, n, r, i;
					e && (e = e.target || e.srcElement, !(t = (null == e ? void 0 : e.src) || (null == e ? void 0 : e.href)) || "string" != typeof t || -1 < window.location.href.indexOf(t) || (e = "function" == typeof (null == (e = s.api) ? void 0 : e.resourceTypeHandler) ? null == (e = s.api) ? void 0 : e.resourceTypeHandler(t) : "", n = performance.getEntriesByType(a.collectEntryType).find(function(e) {
						return e.name === t;
					}), Y(t, s.hostUrl)) || (r = a.getFromParam(o), i = Number(null == (i = n) ? void 0 : i.responseStatus), i = Number.isFinite(i) && 0 < i ? i : 400, i = {
						url: J(t),
						status: i,
						duration: Number(((null == n ? void 0 : n.duration) || 0).toFixed(2)),
						method: "get",
						type: e || "static",
						isHttps: X(t),
						urlQuery: V(t, !0),
						nextHopProtocol: "",
						domainLookup: 0,
						connectTime: 0,
						from: r
					}, a.publish(i, o)));
				}
				var a = this, s = o.config;
				window.document.addEventListener("error", e, !0), o.lifeCycle.on("destroy", function() {
					0 === Je.countInstance() && window.document.removeEventListener("error", e, !0);
				});
			},
			generateLog: function(e, t, n) {
				var t = "function" == typeof (null == (r = t.api) ? void 0 : r.resourceTypeHandler) ? null == (r = t.api) ? void 0 : r.resourceTypeHandler(e.name) : "", r = e.transferSize, i = Number(e.responseStatus), i = Number.isFinite(i) && 0 < i ? i : 200;
				return {
					url: J(e.name),
					method: "get",
					duration: Number(e.duration.toFixed(2)),
					status: i,
					type: t || "static",
					isHttps: X(e.name),
					nextHopProtocol: e.nextHopProtocol || "",
					urlQuery: V(e.name, !0),
					domainLookup: G(e.domainLookupEnd - e.domainLookupStart),
					connectTime: G(e.connectEnd - e.connectStart),
					transferSize: 0 < r ? r : -1,
					from: n
				};
			},
			collectNotReportedLog: function(e) {
				var t, n;
				ze() && (t = (n = performance.getEntriesByType(this.collectEntryType)).length, "function" != typeof window.PerformanceObserver) && this.collectCur !== t && (n = n.slice(this.collectCur), this.collectCur = t, this.publishMany(n, e));
			},
			destroy: function() {
				this.option.publish = function() {};
			}
		}), $e = window.navigator.userAgent.toLowerCase(), o = {};
		function i(e) {
			this.aegisPlugin = !0, this.name = "", this.instances = [], this.inited = !1, e.$walk = this.walk.bind(this), e.$getConfig = this.getConfig.bind(this), this.option = e, this.name = e.name;
		}
		function y(e) {
			var n, r, i, a, t, s, l, o, c, u, d, f, h, p = this;
			this.isGetSample = !1, this.isHidden = !1, this.config = {
				version: 0,
				delay: 1e3,
				onError: !0,
				repeat: 60,
				random: 1,
				aid: !0,
				device: !0,
				pagePerformance: !0,
				webVitals: !0,
				speedSample: !0,
				onClose: !0,
				reportLoadPackageSpeed: !0,
				hostUrl: "https://rumt-zh.com",
				env: "production",
				url: "",
				offlineUrl: "",
				whiteListUrl: "",
				rateLimitUrl: "",
				pvUrl: "",
				speedUrl: "",
				customTimeUrl: "",
				performanceUrl: "",
				performanceUrlForHippy: "",
				webVitalsUrl: "",
				eventUrl: "",
				setDataReportUrl: "",
				memoryUrl: "",
				reportImmediately: !0,
				gzip: !0
			}, this.isWhiteList = !1, this.whitelistUseGzip = !0, this.whitelistUseGzipReady = !1, this.lifeCycle = new W(), this.bean = {}, this.rateLimitConfigs = null, this.rateLimitReady = !1, this.rateLimitSampled = !1, this.rateLimitPool = [], this.normalLogPipeline = He([
				ee(this, 5),
				te,
				function(e, t) {
					var r = n.config;
					t(e = e.map(function(e) {
						var t, n = r.maxLength || 10240;
						try {
							if (!e.msg || e.msg.length <= n) return e;
							e.msg = null == (t = e.msg) ? void 0 : t.substring(0, n);
						} catch (t) {
							e.msg = ce(e.msg).substring(0, r.maxLength);
						}
						return e;
					}));
				},
				(h = (n = this).config, function(e, t) {
					var n = "number" == typeof h.repeat ? h.repeat : 60;
					if (n <= 0) return t(e);
					var r = (null == h ? void 0 : h.id) + "_error", i = Oe[r] || {};
					t(e.filter(function(e) {
						if (e.level === le.ERROR || e.level === le.PROMISE_ERROR || e.level === le.AJAX_ERROR || e.level === le.SCRIPT_ERROR || e.level === le.IMAGE_ERROR || e.level === le.CSS_ERROR || e.level === le.MEDIA_ERROR || e.level === le.RET_ERROR || e.level === le.BRIDGE_ERROR || e.level === le.PAGE_NOT_FOUND_ERROR || e.level === le.WEBSOCKET_ERROR || e.level === le.LAZY_LOAD_ERROR) {
							e = e.msg.slice(0, 200);
							if (i[e] > n) return v[r] || xe(r), !1;
							i[e] = 1 + ~~i[e], Oe[r] = i;
						}
						return !0;
					}));
				}),
				(d = this.lifeCycle.emit, f = this.config, function(e, t) {
					var n, r = f.logCreated;
					return "function" == typeof r ? (n = e.filter(function(e) {
						return !1 !== r(e);
					}), d("beforeWrite", n), t(n)) : (d("beforeWrite", e), t(e));
				}),
				(u = this, setTimeout(function() {
					var e = u.config, t = e.pvUrl, i = void 0 === t ? "" : t, t = e.spa, e = -1 < [
						"web-sdk",
						"mp-sdk",
						"rn-sdk"
					].indexOf("web-sdk");
					i && (e && !t || !e) && u.sendPipeline([function(e, t) {
						var n = u.getOriginFrom(), r = null != i && i.includes("?") ? "&" : "?";
						t({
							url: n ? i + r + "originFrom=" + encodeURIComponent(n) : i,
							type: m.PV
						});
					}], m.PV)(null);
				}, 100), function(e, t) {
					t(e);
				}),
				(o = l = s = !1, c = [], (a = this).lifeCycle.on("onConfigChange", function() {
					t && clearTimeout(t), t = setTimeout(function() {
						var e, n;
						!o && a.config && (o = !0, e = a.config.whiteListUrl, (n = void 0 === e ? "" : e) && a.sendPipeline([function(e, t) {
							t({
								url: n,
								type: m.WHITE_LIST,
								method: "get",
								success: function(e) {
									l = !0;
									try {
										var t = e.data || JSON.parse(e), n = t.retcode, r = t.result, i = void 0 === r ? {} : r, o = (0 === n ? (s = i.is_in_white_list, a.isWhiteList = s, a.updateWhitelistGzipState(i.use_gzip), 0 <= i.rate && i.rate <= 1 && (a.config.random = i.rate, a.isGetSample = !1)) : a.disableWhitelistGzipState(), a.isWhiteList && c.length ? Le(a)(c.splice(0), function() {}) : !a.isWhiteList && c.length && (c.length = 0), a.config.onWhitelist);
										"function" == typeof o && o(s);
									} catch (e) {}
								},
								fail: function() {
									l = !0;
								}
							});
						}], m.WHITE_LIST)(null), o = !1);
					}, a.config.uin ? 50 : 500);
				}), a.lifeCycle.on("destroy", function() {
					c.length = 0;
				}), function(e, t) {
					var n;
					s || null != (n = null == (n = a.config) ? void 0 : n.api) && n.reportRequest ? t(e.concat(c.splice(0)).map(function(e) {
						return Te(e), e;
					})) : (n = e.filter(function(e) {
						return e.level !== le.INFO && e.level !== le.API_RESPONSE ? (Te(e), !0) : (l || (c.push(e), 200 <= c.length && (c.length = 200)), !1);
					})).length && t(n);
				}),
				function(e, t) {
					try {
						var n = e.filter(function(e) {
							return [
								le.ERROR,
								le.PROMISE_ERROR,
								le.AJAX_ERROR,
								le.SCRIPT_ERROR,
								le.IMAGE_ERROR,
								le.CSS_ERROR,
								le.MEDIA_ERROR,
								le.WEBSOCKET_ERROR,
								le.BRIDGE_ERROR,
								le.BLANK_SCREEN,
								le.RET_ERROR,
								le.PAGE_NOT_FOUND_ERROR,
								le.LAZY_LOAD_ERROR
							].includes(e.level);
						}), r = (n.length && p.lifeCycle.emit("errorOccurred", n), e.forEach(function(t) {
							[
								"ext1",
								"ext2",
								"ext3"
							].forEach(function(e) {
								t[e] && "string" == typeof t[e] && (t[e] = t[e].slice(0, 1024));
							}), [
								"ext4",
								"ext5",
								"ext6",
								"ext7",
								"ext8",
								"ext9",
								"ext10"
							].forEach(function(e) {
								t[e] && "string" != typeof t[e] && (t[e] = String(t[e]));
							});
						}), JSON.parse(JSON.stringify(e))), i = (p.lifeCycle.emit("beforeReport", r), p.config.beforeReport);
						(e = "function" == typeof i ? e.filter(function(e) {
							return !1 !== i(e);
						}) : e).length && t(e);
					} catch (e) {}
				},
				Le(this)
			]), this.eventPipeline = He([ee(this, 10), (i = this, function(e) {
				i.sendPipeline([function(e, t) {
					var n = e.map(function(e) {
						return {
							name: e.name,
							originFrom: e.originFrom,
							ext1: String(e.ext1 || i.config.ext1 || "").slice(0, 1024),
							ext2: String(e.ext2 || i.config.ext2 || "").slice(0, 1024),
							ext3: String(e.ext3 || i.config.ext3 || "").slice(0, 1024),
							ext4: String(e.ext4 || i.config.ext4 || ""),
							ext5: String(e.ext5 || i.config.ext5 || ""),
							ext6: String(e.ext6 || i.config.ext6 || ""),
							ext7: String(e.ext7 || i.config.ext7 || ""),
							ext8: String(e.ext8 || i.config.ext8 || ""),
							ext9: String(e.ext9 || i.config.ext9 || ""),
							ext10: String(e.ext10 || i.config.ext10 || "")
						};
					});
					t({
						url: i.config.eventUrl,
						method: "post",
						contentType: "application/json",
						data: g({ payload: g(n) }),
						type: m.EVENT,
						log: e
					});
				}], m.EVENT)(e);
			})]), this.customTimePipeline = He([ee(this, 10), (r = this, function(e) {
				return r.sendPipeline([function(e, t) {
					t({
						url: r.config.customTimeUrl,
						method: "post",
						contentType: "application/json",
						data: g({ payload: g({ custom: e }) }),
						type: m.CUSTOM,
						log: e
					});
				}], m.CUSTOM)(e);
			})]), this.timeMap = {}, this.failRequestCount = 0, y.instances.push(this);
		}
		o.macos = function() {
			return t("mac");
		}, o.ios = function() {
			return o.iphone() || o.ipod() || o.ipad();
		}, o.iphone = function() {
			return !o.windows() && t("iphone");
		}, o.ipod = function() {
			return t("ipod");
		}, o.ipad = function() {
			var e = "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints;
			return t("ipad") || e;
		}, o.android = function() {
			return !o.windows() && t("android");
		}, o.androidPhone = function() {
			return o.android() && t("mobile");
		}, o.androidTablet = function() {
			return o.android() && !t("mobile");
		}, o.blackberry = function() {
			return t("blackberry") || t("bb10");
		}, o.blackberryPhone = function() {
			return o.blackberry() && !t("tablet");
		}, o.blackberryTablet = function() {
			return o.blackberry() && t("tablet");
		}, o.windows = function() {
			return t("windows");
		}, o.windowsPhone = function() {
			return o.windows() && t("phone");
		}, o.windowsTablet = function() {
			return o.windows() && t("touch") && !o.windowsPhone();
		}, o.fxos = function() {
			return (t("(mobile") || t("(tablet")) && t(" rv:");
		}, o.fxosPhone = function() {
			return o.fxos() && t("mobile");
		}, o.fxosTablet = function() {
			return o.fxos() && t("tablet");
		}, o.meego = function() {
			return t("meego");
		}, o.cordova = function() {
			return window.cordova && "file:" === location.protocol;
		}, o.nodeWebkit = function() {
			return "object" == typeof window.process;
		}, o.mobile = function() {
			return o.androidPhone() || o.iphone() || o.ipod() || o.windowsPhone() || o.blackberryPhone() || o.fxosPhone() || o.meego();
		}, o.tablet = function() {
			return o.ipad() || o.androidTablet() || o.blackberryTablet() || o.windowsTablet() || o.fxosTablet();
		}, o.desktop = function() {
			return !o.tablet() && !o.mobile();
		};
		function Ke() {
			return {
				host: new URL(location.href).host,
				pathname: location.pathname
			};
		}
		function Qe(r, e, i) {
			return null != e && e.length && "object" == typeof r ? e.reduce(function(e, t) {
				var n = window.Headers && r instanceof Headers ? r.get(t) : r[t];
				return n ? e + ("" === e ? "" : "\n\n") + i + " header " + t + ": " + n : e;
			}, "") : "";
		}
		function Ye(e, t) {
			return e && -1 === ["null", "undefined"].indexOf(e) ? t + ": " + e : "";
		}
		function Ze(e, t, n) {
			void 0 === t && (t = "");
			var r, i, e = "function" == typeof (null == (i = e.api) ? void 0 : i.resourceTypeHandler) ? null == (i = e.api) ? void 0 : i.resourceTypeHandler(n) : "";
			return -1 === D.indexOf(e) && (r = void 0 === t ? "" : t, i = (void 0 === n ? "" : n).split("?")[0], e = fe.test(i) || de.some(function(e) {
				return -1 !== String(r).indexOf(e);
			}) ? "static" : "fetch"), e;
		}
		function et(e, t) {
			return e ? le.AJAX_ERROR : t ? le.RET_ERROR : le.API_RESPONSE;
		}
		function tt(e, t, n) {
			var r, i;
			if (!e) return !1;
			if (null != (r = null == t ? void 0 : t.api) && r.isSlowApi && "function" == typeof (null == (r = null == t ? void 0 : t.api) ? void 0 : r.isSlowApi)) try {
				return null == (i = null == t ? void 0 : t.api) ? void 0 : i.isSlowApi(n || { duration: e });
			} catch (e) {
				return console.warn("[Aegis] isSlowApi function happen error:", e, ", this data will not be reported."), !1;
			}
			return null != (r = null == t ? void 0 : t.api) && r.apiSlowThreshold && "number" == typeof (null == (i = null == t ? void 0 : t.api) ? void 0 : i.apiSlowThreshold) ? e > (null == (n = null == t ? void 0 : t.api) ? void 0 : n.apiSlowThreshold) : 1e3 < e;
		}
		function nt(e, t) {
			if (null != (e = e.api) && e.usePerformanceTiming && "string" == typeof t.url) {
				e = null == (e = performance.getEntriesByName(t.url)) ? void 0 : e.pop();
				if (e) return {
					url: t.url,
					isHttps: X(t.url),
					method: t.method,
					type: t.type,
					status: t.status,
					duration: Number(e.duration.toFixed(2)),
					nextHopProtocol: e.nextHopProtocol || "",
					domainLookup: G(e.domainLookupEnd - e.domainLookupStart),
					connectTime: G(e.connectEnd - e.connectStart)
				};
			}
			return {
				url: t.url,
				isHttps: X(t.url),
				method: t.method,
				type: t.type,
				status: t.status,
				duration: Number(t.duration.toFixed(2)),
				nextHopProtocol: "",
				domainLookup: j.number,
				connectTime: j.number
			};
		}
		var rt, it, ot, at, a, st, lt, ct = !(o.isIE = function() {
			return "ActiveXObject" in window;
		}), l = [], ut = /^\/[^/]/, dt = !1, p = [], ft = {
			maxRetryCount: 10,
			retryInterval: function(e) {
				return 1e3 * (2 << e);
			},
			whenRetryEndStillFail: "discard",
			maxStorageCount: 50
		}, ht = (new r({ name: "reportApiSpeed" }), new r({
			name: "reportApiSpeed",
			override: !1,
			onNewAegis: function(e) {
				var t, n;
				this.override || (this.override = !0, null != (n = e.config.api) && n.injectTraceHeader && (this.traceRequestHeader = new qe(n.injectTraceHeader, null != (t = null == n ? void 0 : n.injectTraceIgnoreUrls) ? t : [], null == n ? void 0 : n.injectTraceUrls, null == n ? void 0 : n.traceFlag)), this.overrideFetch(e.config, e), this.overrideXhr(e.config, e));
			},
			getFromParam: function(e) {
				return e.getCurrentPageUrl();
			},
			overrideFetch: function(b, E) {
				var S = this, e = b.api, e = {
					name: this.name,
					traceRequestHeader: null != e && e.injectTraceHeader ? this.traceRequestHeader : null,
					getCurrentFrom: function() {
						return S.getFromParam(E);
					},
					then: function(f, h, p, m, g, v, y) {
						var e, w;
						Y(p, b.hostUrl) || (e = f.headers ? f.headers.get("content-type") : "", "fetch" === (w = Ze(b, e || "", p)) ? f.clone().text().then(function(r) {
							var e, i = f.status <= 0 || 400 <= f.status, t = (null == (t = b.api) ? void 0 : t.reqHeaders) || [], o = Qe(null == m ? void 0 : m.headers, t, "req"), t = (null == (t = b.api) ? void 0 : t.resHeaders) || [], a = Qe(f.headers, t, "res"), s = Fe(null == m ? void 0 : m.headers), t = $(r, b.api, {
								url: p,
								ctx: f,
								payload: null == m ? void 0 : m.body
							}), l = t.code, c = t.isErr, t = null == (t = b.api) ? void 0 : t.apiDetail, u = t ? K(null == m ? void 0 : m.body, null == (e = b.api) ? void 0 : e.reqParamHandler, { url: p }) : "", d = t ? K(r, null == (e = b.api) ? void 0 : e.resBodyHandler, {
								url: p,
								ctx: f
							}) : "";
							setTimeout(function() {
								var e = nt(b, {
									url: p,
									duration: h,
									type: w,
									status: f.status || 0,
									method: (null == m ? void 0 : m.method) || "get"
								}), t = [
									i ? "FETCH_ERROR: " + r : "",
									"fetch req url: " + p,
									"res status: " + (e.status || 0),
									"res duration: " + e.duration + "ms",
									"res startTime: " + g,
									o,
									a,
									"req method: " + (e.method || "GET"),
									"res retcode: " + l,
									Ye(u, "req param"),
									Ye(d, "res data")
								].filter(function(e) {
									return e;
								}).join("\n\n"), t = (e.payload = null == m ? void 0 : m.body, e.ret = l, e.isErr = +c, e.from = v || S.getFromParam(E), {
									msg: t,
									code: l,
									trace: s,
									errorMsg: "",
									from: v || S.getFromParam(E),
									originFrom: y,
									level: le.API_RESPONSE
								}), n = b.slowApiLog && tt(null == e ? void 0 : e.duration, b, e);
								t.level = n ? le.SLOW_NET_REQUEST : et(i, c), (n || t.level !== le.API_RESPONSE || E.isWhiteList || null != (n = null == (n = E.config) ? void 0 : n.api) && n.reportRequest) && S.publishNormalLog(t, E), S.publishSpeed(e, E);
							}, 0);
						}).catch(function(e) {
							console.info("ignore something error when process resp " + e);
						}) : setTimeout(function() {
							var e = nt(b, {
								url: p,
								duration: h,
								type: w,
								status: f.status || 0,
								method: (null == m ? void 0 : m.method) || "get"
							});
							e.type = "static", e.urlQuery = V(p, !0), e.from = v || S.getFromParam(E), S.publishSpeed(e, E);
						}, 0));
					},
					catch: function(t, n, r, i, o, a, s) {
						var l, e, c, u, d;
						throw Y(r, b.hostUrl) || (l = Ze(b, "", r), e = (null == (e = b.api) ? void 0 : e.reqHeaders) || [], c = Qe(null == i ? void 0 : i.headers, e, "req"), u = Fe(null == i ? void 0 : i.headers), d = null != (e = b.api) && e.apiDetail ? K(null == i ? void 0 : i.body, null == (e = b.api) ? void 0 : e.reqParamHandler, { url: r }) : "", setTimeout(function() {
							var e = nt(b, {
								url: r,
								duration: n,
								type: l,
								status: 0,
								method: (null == i ? void 0 : i.method) || "get"
							}), e = (e.from = a || S.getFromParam(E), S.publishSpeed(e, E), "AJAX_ERROR: " + t + "\n                          \nreq url: " + r + "\n                          \nres status: 0\n                          \nres duration: " + e.duration + "ms\n                          \nreq method: " + ((null == i ? void 0 : i.method) || "get") + "\n                          \nreq param: " + d + "\n                          \nres startTime: " + o + "\n                          \n" + c);
							S.publishNormalLog({
								msg: e,
								level: le.AJAX_ERROR,
								code: -400,
								trace: u,
								errorMsg: "",
								from: a || S.getFromParam(E),
								originFrom: s
							}, E);
						}, 0)), t;
					}
				}, f = (this.hackFetchOptions = e, this.hackFetchOptions), h = null == (e = b.api) ? void 0 : e.ignoreHackReg;
				if (void 0 === h && (h = /\.flv(\?|$)/i), p.find(function(e) {
					return e.name === f.name;
				})) throw new Error("name '" + f.name + "' is already in hackFetch option list");
				p.push(f), !dt && window.fetch && (dt = !0, at = window.fetch, window.fetch = function(e, i) {
					void 0 === i && (i = {});
					var o = "string" == typeof e ? e : null == e ? void 0 : e.url;
					if (null != (a = null == h ? void 0 : h.test) && a.call(h, o)) return at(o, i);
					ut.test(o) && (o = "" + location.origin + o);
					var t, n, r, a = (f || {}).traceRequestHeader;
					a && (t = void 0 === (t = (i || {}).headers) ? {} : t, n = (r = Ke()).host, n = (a = a.generate(o, t, {
						host: n,
						pathname: r.pathname
					}) || {}).name, r = a.value) && n && (i.headers = Object.assign(t, ((a = {})[n] = r, a)));
					for (var s = /* @__PURE__ */ new Map(), l = window.location.href, c = 0; c < p.length; c++) {
						var u = p[c];
						try {
							"function" == typeof u.beforeFetch && u.beforeFetch(o, i), "function" == typeof u.getCurrentFrom && s.set(u.name, u.getCurrentFrom());
						} catch (e) {}
					}
					var d = Date.now();
					return at(e, i).then(function(e) {
						for (var t = e.clone(), n = 0; n < p.length; n++) {
							var r = p[n];
							try {
								"function" == typeof r.then && r.then(t, Date.now() - d, o, i, d, s.get(r.name), l);
							} catch (e) {}
						}
						return t;
					}).catch(function(e) {
						for (var t = 0; t < p.length; t++) {
							var n = p[t];
							try {
								"function" == typeof n.catch && n.catch(e, Date.now() - d, o, i, d, s.get(n.name), l);
							} catch (e) {}
						}
						throw e;
					});
				});
			},
			overrideXhr: function(b, E) {
				var i, S = this, e = {
					name: this.name,
					ignoreHackReg: null == (e = b.api) ? void 0 : e.ignoreHackReg,
					traceRequestHeader: null != (e = b.api) && e.injectTraceHeader ? this.traceRequestHeader : null,
					getCurrentFrom: function() {
						return S.getFromParam(E);
					},
					send: function(f, h, p, m) {
						var e, t, g = Date.now(), v = (((null == b ? void 0 : b.api) || {}).injectTraceHeader && (t = (e = Ke()).host, e = (t = S.traceRequestHeader.generate(f.aegisUrl, {}, {
							host: t,
							pathname: e.pathname
						}) || {}).name, t = t.value, e) && t && f.setRequestHeader(e, t), f.addEventListener("loadend", function() {
							var c, n, e, u, d = f.aegisUrl || "";
							Y(d, b.hostUrl) || "abort" === f.failType || (c = "", (f.failType || !f.status || 400 <= f.status) && (c = f.failType || "failed"), n = Date.now() - g, e = f.getResponseHeader("content-type") || "", u = Ze(b, e, d), setTimeout(function() {
								var r = nt(b, {
									url: d,
									duration: n,
									type: u,
									status: f.status,
									method: f.aegisMethod || "get"
								});
								if (r.from = p || S.getFromParam(E), "fetch" === u) {
									var e = (null == (e = b.api) ? void 0 : e.reqHeaders) || [], i = Qe(f.aegisXhrReqHeader, e, "req"), e = (null == (e = b.api) ? void 0 : e.resHeaders) || [], t = f.getAllResponseHeaders().split("\r\n").reduce(function(e, t) {
										t = t.split(": ");
										return t[0] && t[1] && (e[t[0]] = t[1]), e;
									}, {}), o = Qe(t, e, "res"), a = Fe(f.aegisXhrReqHeader), e = null == (t = b.api) ? void 0 : t.apiDetail, s = e ? K(h, null == (t = b.api) ? void 0 : t.reqParamHandler, { url: d }) : "", l = e ? K(f.response, null == (t = b.api) ? void 0 : t.resBodyHandler, { url: d }) : "";
									try {
										((e, t, n, r) => {
											var i, o, a;
											try {
												if ("function" == typeof (null == t ? void 0 : t.retCodeHandlerAsync)) return t.retCodeHandlerAsync(e, null == n ? void 0 : n.url, null == n ? void 0 : n.ctx, function(e) {
													var t = e.code;
													r?.({
														code: void 0 === t ? R : t,
														isErr: e.isErr
													});
												});
												if ("function" == typeof (null == t ? void 0 : t.retCodeHandler)) return a = (o = t.retCodeHandler(e, null == n ? void 0 : n.url, null == n ? void 0 : n.ctx, null == n ? void 0 : n.payload) || {}).code, null != r && r({
													code: void 0 === a ? R : a,
													isErr: o.isErr
												});
												if (!(e = "string" == typeof e ? JSON.parse(e) : e)) return null != r && r({
													code: R,
													isErr: !1
												});
												"function" == typeof (null == (i = null == t ? void 0 : t.ret) ? void 0 : i.join) && (he = [].concat(t.ret.map(function(e) {
													return e.toLowerCase();
												})));
												var s = Object.getOwnPropertyNames(e).filter(function(e) {
													return -1 !== he.indexOf(e.toLowerCase());
												});
												if (s.length) return "未知" !== (a = e[s[0]]) && "" !== a || (a = R), null != r && r({
													code: "" + a,
													isErr: 0 !== a && "0" !== a && a !== R
												});
												r?.({
													code: R,
													isErr: !1
												});
											} catch (e) {
												r?.({
													code: R,
													isErr: !1
												});
											}
										})(f.response, b.api, {
											url: d,
											ctx: f,
											payload: h
										}, function(e) {
											var t = e.code, e = e.isErr, n = [
												c ? "AJAX_ERROR: request " + c : "",
												"fetch req url: " + d,
												"res status: " + (r.status || 0),
												"res duration: " + r.duration + "ms",
												"res startTime: " + g,
												i,
												o,
												"req method: " + (r.method || "GET"),
												"res retcode: " + t,
												Ye(s, "req param"),
												Ye(l, "res data")
											].filter(function(e) {
												return e;
											}).join("\n\n");
											r.ret = t, r.isErr = +e, r.payload = h, b.slowApiLog && tt(null == r ? void 0 : r.duration, b, r) ? S.publishNormalLog({
												msg: n,
												level: le.SLOW_NET_REQUEST,
												code: t,
												trace: a,
												errorMsg: "",
												from: p || S.getFromParam(E),
												originFrom: m
											}, E) : S.publishNormalLog({
												msg: n,
												level: et(!!c, e),
												code: t,
												trace: a,
												errorMsg: "",
												from: p || S.getFromParam(E),
												originFrom: m
											}, E), S.publishSpeed(r, E);
										});
									} catch (e) {
										r.ret = R, S.publishSpeed(r, E);
									}
								} else r.type = "static", r.urlQuery = V(d, !0), S.publishSpeed(r, E);
								f.removeEventListener("abort", v), f.removeEventListener("error", y), f.removeEventListener("timeout", w);
							}, 0));
						}), function() {
							f.failType = "abort";
						}), y = function() {
							f.failType = "error";
						}, w = function() {
							f.failType = "timeout";
						};
						f.addEventListener("abort", v), f.addEventListener("error", y), f.addEventListener("timeout", w);
					}
				};
				this.hackXHROptions = e, i = this.hackXHROptions, l.find(function(e) {
					return e.name === i.name;
				}) || (l.push(i), !ct && window.XMLHttpRequest && (rt = window.XMLHttpRequest.prototype.send, it = window.XMLHttpRequest.prototype.open, ot = window.XMLHttpRequest.prototype.setRequestHeader, ct = !0, window.XMLHttpRequest.prototype.open = function() {
					this.aegisMethod = arguments[0];
					var e, t = arguments[1];
					if (ut.test(t) && (t = "" + location.origin + t), this.aegisUrl = t, null == (t = null == (e = i.ignoreHackReg) ? void 0 : e.test) || !t.call(e, this.aegisUrl)) if (this.aegisXhrStartTime = Date.now(), this.sendByAegis) o.isIE() || (this.timeout = 5e3);
					else for (var n = 0; n < l.length; n++) {
						var r = l[n];
						try {
							"function" == typeof r.open && r.open(this);
						} catch (e) {}
					}
					return it.apply(this, arguments);
				}, window.XMLHttpRequest.prototype.setRequestHeader = function() {
					var e, t, n;
					return null != (t = null == (n = i.ignoreHackReg) ? void 0 : n.test) && t.call(n, this.aegisUrl) ? ot.apply(this, arguments) : (t = arguments[0], n = arguments[1], this.aegisXhrReqHeader = null != (e = this.aegisXhrReqHeader) ? e : {}, null != i && i.traceRequestHeader && -1 < [
						"traceparent",
						"b3",
						"sw8",
						"sentry-trace"
					].indexOf(t) && (this.aegisXhrReqHeader[t] || (arguments[1] = n), this.aegisXhrReqHeader[t]) ? void 0 : (this.aegisXhrReqHeader[t] = arguments[1], ot.apply(this, arguments)));
				}, window.XMLHttpRequest.prototype.send = function() {
					var e, t;
					if (!(null != (t = null == (e = i.ignoreHackReg) ? void 0 : e.test) && t.call(e, this.aegisUrl) || this.sendByAegis)) for (var n = 0; n < l.length; n++) {
						var r = l[n];
						try {
							"function" == typeof r.send && r.send(this, arguments[0], "function" == typeof r.getCurrentFrom ? r.getCurrentFrom() : void 0, window.location.href);
						} catch (e) {}
					}
					return rt.apply(this, arguments);
				}));
			},
			publishSpeed: function(n) {
				var r = this;
				this.$walk(function(e) {
					var t = r.$getConfig(e);
					"fetch" !== n.type || "function" != typeof (null == t ? void 0 : t.urlHandler) ? (n.url = V(n.url), e.speedLogPipeline(n)) : e.speedLogPipeline(oe(oe({}, n), { url: V(t.urlHandler(n.url, n.payload)) }));
				});
			},
			publishNormalLog: function(t) {
				this.$walk(function(e) {
					e.normalLogPipeline(t);
				});
			},
			destroy: function() {
				var t, n, e;
				this.option.publishSpeed = function() {}, this.option.publishNormalLog = function() {}, this.option.hackXHROptions && (t = this.option.hackXHROptions, -1 !== (e = l.findIndex(function(e) {
					return e.name === t.name;
				}))) && l.splice(e, 1), this.option.hackFetchOptions && (n = this.option.hackFetchOptions, -1 !== (e = p.findIndex(function(e) {
					return e.name === n.name;
				}))) && p.splice(e, 1), this.option.override = !1;
			}
		})), pt = {}, mt = new r({
			name: "reportBridgeSpeed",
			override: !1,
			onNewAegis: function(e) {
				this.override || (this.override = !0, this.overrideBridge(e));
			},
			getFromParam: function(e) {
				return e.getCurrentPageUrl();
			},
			publishSpeed: function(t, n) {
				this.$walk(function(e) {
					e === n && e.speedLogPipeline(t);
				});
			},
			overrideBridge: function(c) {
				var u = this, d = c.config;
				d.reportBridgeSpeed && d.h5Bridge && d.h5BridgeFunc.length && d.h5BridgeFunc.forEach(function(e) {
					var l = d.h5Bridge[e];
					pt[e] = l, d.h5Bridge[e] = function() {
						for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
						var r = e[0], i = e[1], n = e[2], o = e[3], a = Date.now(), s = u.getFromParam(c);
						l(r, i, n, function(e) {
							var t = $(e, d.api), n = t.code, t = t.isErr, n = {
								url: r + "-" + i,
								name: r + "-" + i,
								duration: Date.now() - a,
								type: "bridge",
								ret: n,
								isErr: +t,
								from: s
							};
							u.publishSpeed(n, c), o(e);
						});
					};
				});
			},
			unHackBridge: function(t) {
				Object.keys(pt).forEach(function(e) {
					pt[e] && (t.config.h5Bridge[e] = pt[e]);
				}), pt = {};
			},
			destroy: function(e) {
				this.option.publishSpeed = function() {}, this.option.unHackBridge(e), this.option.override = !1;
			}
		});
		(b = a = a || {})[b.unknown = 100] = "unknown", b[b.wifi = 1] = "wifi", b[b.net2g = 2] = "net2g", b[b.net3g = 3] = "net3g", b[b.net4g = 4] = "net4g", b[b.net5g = 5] = "net5g", b[b.net6g = 6] = "net6g", (b = st = st || {})[b.android = 1] = "android", b[b.ios = 2] = "ios", b[b.windows = 3] = "windows", b[b.macos = 4] = "macos", b[b.linux = 5] = "linux", b[b.other = 100] = "other", (b = lt = lt || {})[b.unknown = 100] = "unknown", b[b.normal = 0] = "normal", b[b.weak = 1] = "weak", b[b.disconnected = 2] = "disconnected";
		function gt() {
			return window.location.href;
		}
		function vt(e) {
			return (e = ((e) => {
				var t = "", n = e.nodeType;
				if (1 === n || 9 === n || 11 === n) {
					if ("string" == typeof e.textContent) return e.textContent;
					for (var r = e.firstChild; r; r = r.nextSibling) t += Gt(e);
				} else if (3 === n || 4 === n) return e.nodeValue;
				return t;
			})(e)) ? e.replace(/^\s+|\s+$/g, "") : "";
		}
		function f(e, t) {
			var n = Qt(), r = "navigate";
			return 0 <= $t ? r = "back-forward-cache" : n && (document.prerendering || 0 < Yt() ? r = "prerender" : document.wasDiscarded ? r = "restore" : n.type && (r = n.type.replace(/_/g, "-"))), {
				name: e,
				value: void 0 === t ? -1 : t,
				rating: "good",
				delta: 0,
				entries: [],
				id: "v4-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 0xe8d4a51000),
				navigationType: r
			};
		}
		function h(t, n, r, i) {
			var o, a;
			return function(e) {
				0 <= n.value && (e || i) && ((a = n.value - (o || 0)) || void 0 === o) && (o = n.value, n.delta = a, n.rating = (e = n.value) > r[1] ? "poor" : e > r[0] ? "needs-improvement" : "good", t(n));
			};
		}
		function yt(e) {
			requestAnimationFrame(function() {
				return requestAnimationFrame(function() {
					return e();
				});
			});
		}
		function wt(e) {
			document.addEventListener("visibilitychange", function() {
				"hidden" === document.visibilityState && e();
			});
		}
		function bt(e) {
			var t = !1;
			return function() {
				t || (e(), t = !0);
			};
		}
		function Et() {
			return en < 0 && (en = tn(), rn(), Kt(function() {
				setTimeout(function() {
					en = tn(), rn();
				}, 0);
			})), { get firstHiddenTime() {
				return en;
			} };
		}
		function St(e) {
			document.prerendering ? addEventListener("prerenderingchange", function() {
				return e();
			}, !0) : e();
		}
		function Rt(o, a) {
			a = a || {}, St(function() {
				var t, n = Et(), r = f("FCP"), i = Zt("paint", function(e) {
					e.forEach(function(e) {
						"first-contentful-paint" === e.name && (i.disconnect(), e.startTime < n.firstHiddenTime) && (r.value = Math.max(e.startTime - Yt(), 0), r.entries.push(e), t(!0));
					});
				});
				i && (t = h(o, r, an, a.reportAllChanges), Kt(function(e) {
					r = f("FCP"), t = h(o, r, an, a.reportAllChanges), yt(function() {
						r.value = performance.now() - e.timeStamp, t(!0);
					});
				}));
			});
		}
		function Tt() {
			return Mt ? ln : performance.interactionCount || 0;
		}
		function Ot(t) {
			var e, n;
			pn.forEach(function(e) {
				return e(t);
			}), !t.interactionId && "first-input" !== t.entryType || (n = S[S.length - 1], ((e = fn.get(t.interactionId)) || S.length < 10 || t.duration > n.latency) && (e ? t.duration > e.latency ? (e.entries = [t], e.latency = t.duration) : t.duration === e.latency && t.startTime === e.entries[0].startTime && e.entries.push(t) : (n = {
				id: t.interactionId,
				latency: t.duration,
				entries: [t]
			}, fn.set(n.id, n), S.push(n)), S.sort(function(e, t) {
				return t.latency - e.latency;
			}), 10 < S.length) && S.splice(10).forEach(function(e) {
				return fn.delete(e.id);
			}));
		}
		function xt(e) {
			var t = self.requestIdleCallback || self.setTimeout, n = -1;
			return e = bt(e), "hidden" === document.visibilityState ? e() : (n = t(e), wt(e)), n;
		}
		function Pt(o, a) {
			"PerformanceEventTiming" in self && "interactionId" in PerformanceEventTiming.prototype && (a = a || {}, St(function() {
				var e;
				"interactionCount" in performance || (Mt = Mt || Zt("event", dn, {
					type: "event",
					buffered: !0,
					durationThreshold: 0
				}));
				function t(t) {
					xt(function() {
						t.forEach(Ot);
						e = Math.min(S.length - 1, Math.floor((Tt() - hn) / 50));
						var e = S[e];
						e && e.latency !== n.value && (n.value = e.latency, n.entries = e.entries, i());
					});
				}
				var n = f("INP"), r = Zt("event", t, { durationThreshold: null != (e = a.durationThreshold) ? e : 40 }), i = h(o, n, mn, a.reportAllChanges);
				r && (r.observe({
					type: "first-input",
					buffered: !0
				}), wt(function() {
					t(r.takeRecords()), i(!0);
				}), Kt(function() {
					hn = Tt(), S.length = 0, fn.clear(), n = f("INP"), i = h(o, n, mn, a.reportAllChanges);
				}));
			}));
		}
		function Lt(e) {
			var t, n, r, i, o, a;
			e.cancelable && (t = (0xe8d4a51000 < e.timeStamp ? /* @__PURE__ */ new Date() : performance.now()) - e.timeStamp, "pointerdown" == e.type ? (n = t, r = e, i = function() {
				bn(n, r), a();
			}, o = function() {
				a();
			}, a = function() {
				removeEventListener("pointerup", i, yn), removeEventListener("pointercancel", o, yn);
			}, addEventListener("pointerup", i, yn), addEventListener("pointercancel", o, yn)) : bn(t, e));
		}
		function Ct(s, l) {
			var e;
			(null != (e = null == l ? void 0 : l.events) && e.length ? l.events : Tn).forEach(function(e) {
				var t, n = e, r = s, i = null == l ? void 0 : l.once, o = null == (t = null == l ? void 0 : l.delay) ? void 0 : t[e], a = function(e) {
					"visibilitychange" === n && "hidden" !== document.visibilityState || (o ? setTimeout(function() {
						return r(e);
					}, o) : r(e), i && removeEventListener(n, a, !0));
				};
				addEventListener(n, a, !0);
			});
		}
		function kt(e) {
			var t = e.name;
			(e = e.value) <= 0 || "INP" === t && 6e4 < e || (T[t] = e);
		}
		function c(e, t, n, r) {
			return void 0 === n && (n = 15e3), void 0 === r && (r = 0), (t = void 0 === t ? 0 : t) <= e && e <= n ? e : r;
		}
		function It(e, t) {
			void 0 === t && (t = []);
			try {
				var n = localStorage.getItem(e);
				if (null != n) {
					var r = JSON.parse(n);
					if (Array.isArray(t) && !Array.isArray(r)) try {
						localStorage.removeItem(e);
					} catch (e) {}
					else {
						if (Array.isArray(t) || "object" != typeof t || null === t || "object" == typeof r && null !== r && !Array.isArray(r)) return r;
						try {
							localStorage.removeItem(e);
						} catch (e) {}
					}
				}
				return t;
			} catch (n) {
				try {
					localStorage.removeItem(e);
				} catch (e) {}
				return t;
			}
		}
		function At(e, t) {
			try {
				localStorage.setItem(e, t);
			} catch (e) {}
		}
		var Mt, w, Nt, _t, Ft, d, b = new r({
			name: "device",
			onNewAegis: function(e) {
				e.extendBean("platform", this.getPlatform()), e.extendBean("netType", a.unknown), this.getDpi(e), this.refreshNetworkTypeToBean(e), this.refreshNetworkStatusToBean(e);
			},
			getDpi: function(e) {
				e.extendBean("vp", Math.round(window.innerWidth) + " * " + Math.round(window.innerHeight)), window.screen && e.extendBean("sr", Math.round(window.screen.width) + " * " + Math.round(window.screen.height));
			},
			getPlatform: function() {
				var t = {
					android: /\bAndroid\s*([^;]+)/,
					ios: /\b(iPad|iPhone|iPod)\b.*? OS ([\d_]+)/,
					windows: /\b(Windows NT)/,
					macos: /\b(Mac OS)/,
					linux: /\b(Linux)/i
				}, e = Object.keys(t).find(function(e) {
					return t[e].test(navigator.userAgent);
				});
				return e ? st[e] : st.other;
			},
			refreshNetworkTypeToBean: function(t) {
				var n = this, e = t.config;
				e && ("function" == typeof e.getNetworkType ? e.getNetworkType : Ht)(function(e) {
					a[e] || (e = a.unknown), t.extendBean("netType", e), n.NetworkRefreshTimer = setTimeout(function() {
						n.refreshNetworkTypeToBean(t), clearTimeout(n.NetworkRefreshTimer);
					}, 1e4);
				});
			},
			refreshNetworkStatusToBean: function(t) {
				var e, n = this, r = t.config;
				r && null != (e = "function" == typeof r.getNetworkStatus ? r.getNetworkStatus : e) && e(function(e) {
					void 0 === lt[e] && (e = lt.unknown), t.extendBean("netStatus", e), n.NetworkStatusRefreshTimer = setTimeout(function() {
						n.refreshNetworkStatusToBean(t), clearTimeout(n.NetworkStatusRefreshTimer);
					}, 1e4);
				});
			}
		}), Ht = function(e) {
			var t = "", n = navigator.userAgent.match(/NetType\/(\w+)/);
			n ? t = n[1] : navigator.connection && (t = navigator.connection.effectiveType || navigator.connection.type), e((n = t = t || R, 0 <= (n = String(n).toLowerCase()).indexOf("4g") ? a.net4g : 0 <= n.indexOf("wifi") ? a.wifi : 0 <= n.indexOf("5g") ? a.net5g : 0 <= n.indexOf("6g") ? a.net6g : 0 <= n.indexOf("3g") ? a.net3g : 0 <= n.indexOf("2g") ? a.net2g : a.unknown));
		}, Ut = window.WebSocket, E = [], Dt = { construct: function(e, t) {
			var r = new e(t[0], t[1]);
			return r.originSend = r.send, r.addEventListener("error", function(e) {
				var e = (null == e ? void 0 : e.currentTarget) || {}, t = e.url, n = e.readyState;
				E?.forEach(function(e) {
					e = e.onErr;
					e?.({
						msg: "无法获知具体错误信息，需在浏览器控制台查看！",
						readyState: n,
						connectUrl: t
					});
				});
			}), Object.defineProperty(r, "send", { get: function() {
				return function(e) {
					null != (t = r.originSend) && t.call(r, e);
					var t = r.readyState;
					if (t !== WebSocket.OPEN) {
						var n = {
							readyState: t,
							connectUrl: r.url
						};
						switch (t) {
							case WebSocket.CLOSED:
								E.forEach(function(e) {
									e = e.sendErr;
									e?.(oe({ msg: "消息发送失败，连接已关闭！" }, n));
								});
								break;
							case WebSocket.CONNECTING:
								E.forEach(function(e) {
									(0, e.sendErr)(oe({ msg: "消息发送失败，正在连接中！" }, n));
								});
								break;
							case WebSocket.CLOSING: E.forEach(function(e) {
								(0, e.sendErr)(oe({ msg: "消息发送失败，连接正在关闭！" }, n));
							});
						}
					}
				};
			} }), r;
		} }, qt = new r({ name: "onError" }), jt = qt = new r({
			name: "onError",
			onNewAegis: function(e) {
				this.startListen(e);
			},
			getFromParam: function(e) {
				return e.getCurrentPageUrl();
			},
			startListen: function(a) {
				function e(e) {
					var t, n = e && ce(e.reason);
					n && s.publishErrorLog({
						msg: "PROMISE_ERROR: " + n,
						errorMsg: null == (t = null == (e = (null == (t = e.reason) ? void 0 : t.message) || (null == (t = e.reason) ? void 0 : t.errMsg) || n) ? void 0 : e.slice) ? void 0 : t.call(e, 0, 150),
						level: le.PROMISE_ERROR,
						from: s.getFromParam(a),
						originFrom: a.getOriginFrom()
					}, a);
				}
				function t(e) {
					var t;
					if (e = (null == e ? void 0 : e.target) || (null == e ? void 0 : e.srcElement)) {
						var n = e.src || e.href || "", r = e.tagName, r = (void 0 === r ? "script" : r).toLowerCase(), i = ["audio", "video"].includes(r);
						if (!i || null != e && e.error) {
							if (!(Y(t = n, a.config.hostUrl) || -1 < window.location.href.indexOf(t))) {
								var o = {
									msg: r + " load fail: " + n + " " + (i ? "\n\nerror code: " + (null == (t = null == e ? void 0 : e.error) ? void 0 : t.code) + ("" !== (null == (i = null == e ? void 0 : e.error) ? void 0 : i.message) ? "\nerror msg: " + (null == (t = null == e ? void 0 : e.error) ? void 0 : t.message) : "") : ""),
									level: le.INFO,
									from: s.getFromParam(a),
									originFrom: a.getOriginFrom()
								};
								if (/\.js$/.test(n)) o.level = le.SCRIPT_ERROR;
								else if (/\.css$/.test(n)) o.level = le.CSS_ERROR;
								else switch (r) {
									case "script":
										o.level = le.SCRIPT_ERROR;
										break;
									case "link":
										o.level = le.CSS_ERROR;
										break;
									case "img":
										o.level = le.IMAGE_ERROR;
										break;
									case "audio":
									case "video":
										o.level = le.MEDIA_ERROR;
										break;
									default: return;
								}
								s.publishErrorLog(o, a);
							}
						} else console.log("may be media load success because error is undefine");
					}
				}
				var n, r, i, o, s = this, l = window.onerror;
				window.onerror = function() {
					for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
					var n, r = ce(e[0]);
					"string" != typeof (n = r) || !n || H.some(function(e) {
						return -1 < n.indexOf(e);
					}) || F.some(function(e) {
						return -1 < n.indexOf(e);
					}) || s.publishErrorLog({
						msg: (r || "") + " @ (" + (ce(e[1]) || "") + ":" + (e[2] || 0) + ":" + (e[3] || 0) + ")\n          \n" + ce(e[4] || ""),
						level: le.ERROR,
						from: s.getFromParam(a),
						originFrom: a.getOriginFrom()
					}, a), l?.call.apply(l, C([window], e));
				}, window.addEventListener("unhandledrejection", e);
				window.document.addEventListener("error", t, !0), a.lifeCycle.on("destroy", function() {
					0 === qt.countInstance() && (window.document.removeEventListener("unhandledrejection", e), window.document.removeEventListener("error", t, !0));
				}), a.config.websocketHack && (n = {
					key: a.config.id + "-" + this.name,
					onErr: function(e) {
						var t;
						null != (t = s.publishWsErrorLog) && t.call(s, e, a);
					},
					sendErr: function(e) {
						var t;
						null != (t = s.publishWsErrorLog) && t.call(s, e, a);
					}
				}, this.hackWebsocketConfig = n, n = this.hackWebsocketConfig, window.Proxy) && window.WebSocket && (r = window.WebSocket, window && !r.isHack && (i = new Proxy(WebSocket, Dt), r.isHack = !0, window.WebSocket = i), o = n, E.find(function(e) {
					return e.key === o.key;
				}) || o && E.push(o));
			},
			publishErrorLog: function(t, n) {
				this.$walk(function(e) {
					e === n && e.normalLogPipeline(t);
				});
			},
			publishWsErrorLog: function(e, t) {
				var n = e.connectUrl;
				this.publishErrorLog({
					msg: "WEBSOCKET_ERROR: \n              connect: " + n + "\n              readyState: " + e.readyState + "\n              msg: " + e.msg,
					level: le.WEBSOCKET_ERROR,
					from: this.getFromParam(t),
					originFrom: t.getOriginFrom()
				}, t);
			},
			destroy: function() {
				var t, e;
				this.option.publishErrorLog = function() {}, this.option.hackWebsocketConfig && (t = this.option.hackWebsocketConfig, window.WebSocket = Ut, -1 !== (e = E.findIndex(function(e) {
					return e.key === t.key;
				}))) && E.splice(e, 1);
			}
		}), Wt = (new r({ name: "clickElementLog" }), function(e) {
			if ("" !== e.id && e.id) return "id(\"" + e.id + "\")";
			if (e === document.body) return e.tagName;
			if (e instanceof Document) return "document";
			var t = 0;
			if (e.parentNode) for (var n = e.parentNode.childNodes, r = 0; r < n.length; r += 1) {
				var i = n[r];
				if (i === e) return Wt(e.parentNode) + "/" + e.tagName + "[" + (t + 1) + "]";
				1 === i.nodeType && i.tagName === e.tagName && (t += 1);
			}
			return 0;
		}), Bt = function(e) {
			return e instanceof Array ? new Map(e.map(function(e) {
				return [e, !0];
			})) : /* @__PURE__ */ new Map();
		}, zt = function(e, t) {
			return "string" == typeof e ? e.split(t) : [];
		}, Gt = function(e) {
			if (3 === e.nodeType || 4 === e.nodeType) return e.nodeValue || "";
			if (1 !== e.nodeType) return "";
			if ("string" == typeof e.textContent) return e.textContent;
			for (var t = "", n = e.firstChild; n; n = n.nextSibling) t += Gt(n);
			return t;
		}, Vt = new r({
			name: "clickElementLog",
			listeners: [],
			onNewAegis: function(e) {
				this.startListen(e);
			},
			startListen: function(a) {
				for (var e = function(o) {
					t.listeners.push(((e, t, n, r) => {
						function i(e) {
							var t = document.documentElement;
							t && n.call(t, e, e.target);
						}
						return void 0 === r && (r = !0), e.addEventListener(t, i, r), { destroy: function() {
							e.removeEventListener(t, i, r);
						} };
					})(document, o, function(e, t) {
						var n, r, i;
						t && !((e, t) => {
							n = Bt((null == (n = (e = e).ignoreElements) ? void 0 : n.ignoreClasses) || []) || /* @__PURE__ */ new Map();
							for (var n, r = (e = {
								ignoreIds: Bt((null == (e = e.ignoreElements) ? void 0 : e.ignoreIds) || []) || /* @__PURE__ */ new Map(),
								ignoreClasses: n
							}).ignoreClasses, i = e.ignoreIds, o = !(0 === i.size && 0 === r.size), a = t, s = (zt(t.getAttribute("id") || "", " "), zt(t.getAttribute("class") || "", ""), 0), l = !1; a && o && a.getAttribute;) {
								if (l) return !0;
								if (10 <= s) break;
								for (var c = zt(a.getAttribute("id") || "", " "), u = zt(a.getAttribute("class") || "", ""), d = 0, f = c; d < f.length; d++) {
									var h = f[d];
									if (i.has(h)) {
										l = !0;
										break;
									}
								}
								for (var p = 0, m = u; p < m.length; p++) {
									var g = m[p];
									if (r.has(g)) {
										l = !0;
										break;
									}
								}
								s += 1, a = a.parentNode || a.parentElement;
							}
							return !1;
						})(a.config, t) && (n = Wt(t), r = vt(t), i = t.getBoundingClientRect && t.getBoundingClientRect(), t = {
							op: o,
							view_type: (null == t ? void 0 : t.nodeName) || "",
							view_text: r.slice(0, 127),
							view_tag: n,
							page: gt(),
							page_id: gt(),
							view_pos: {
								p0: (parseInt(String(i.left), 10) || -1) + "," + (parseInt(String(i.top), 10) || -1),
								p1: (parseInt(String(i.left + window.scrollX), 10) || -1) + "," + (parseInt(String(i.top + window.scrollY), 10) || -1)
							}
						}, a.normalLogPipeline({
							msg: t,
							level: le.CLICK_EVENT,
							errorMsg: "",
							originFrom: a.getOriginFrom()
						}));
					}, !0));
				}, t = this, n = 0, r = Object.entries({
					click: 1,
					longpress: 2
				}); n < r.length; n++) e(r[n][0]);
			},
			destroy: function() {
				this.listeners.forEach(function(e) {
					return e.destroy();
				}), this.listeners = [];
			}
		}), Jt = (new r({ name: "consoleLog" }), {
			log: console.log,
			error: console.error,
			warn: console.warn,
			info: console.info,
			debug: console.debug,
			trace: console.trace
		}), Xt = new r({
			name: "consoleLog",
			onNewAegis: function(e) {
				this.startListen(e);
			},
			startListen: function(e) {
				var o = e;
				[
					"log",
					"error",
					"warn",
					"info",
					"debug",
					"trace"
				].forEach(function(r) {
					var i = Jt[r];
					console[r] = function() {
						for (var e, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
						try {
							i.apply(console, t), !o.isWhiteList && [
								"log",
								"info",
								"debug",
								"trace"
							].includes(r) || (e = t.map(function(e) {
								if ("object" == typeof e && null !== e) try {
									return JSON.stringify(e);
								} catch (e) {}
								return String(e);
							}).join(" "), o.normalLogPipeline({
								msg: "method: console." + r + "\nmessage: " + e,
								level: le.CONSOLE_LOG,
								errorMsg: "",
								originFrom: o.getOriginFrom()
							}));
						} catch (e) {
							Jt.error("Console hook error:", e);
						}
					};
				});
			},
			destroy: function() {
				Object.keys(Jt).forEach(function(e) {
					console[e] = Jt[e];
				});
			}
		}), $t = -1, Kt = function(t) {
			addEventListener("pageshow", function(e) {
				e.persisted && ($t = e.timeStamp, t(e));
			}, !0);
		}, Qt = function() {
			var e = self.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
			if (e && 0 < e.responseStart && e.responseStart < performance.now()) return e;
		}, Yt = function() {
			var e = Qt();
			return e && e.activationStart || 0;
		}, Zt = function(e, t, n) {
			try {
				var r;
				if (PerformanceObserver.supportedEntryTypes.includes(e)) return (r = new PerformanceObserver(function(e) {
					Promise.resolve().then(function() {
						t(e.getEntries());
					});
				})).observe(Object.assign({
					type: e,
					buffered: !0
				}, n || {})), r;
			} catch (e) {}
		}, en = -1, tn = function() {
			return "hidden" !== document.visibilityState || document.prerendering ? 1 / 0 : 0;
		}, nn = function(e) {
			"hidden" === document.visibilityState && -1 < en && (en = "visibilitychange" === e.type ? e.timeStamp : 0, on());
		}, rn = function() {
			addEventListener("visibilitychange", nn, !0), addEventListener("prerenderingchange", nn, !0);
		}, on = function() {
			removeEventListener("visibilitychange", nn, !0), removeEventListener("prerenderingchange", nn, !0);
		}, an = [1800, 3e3], sn = [.1, .25], ln = 0, cn = 1 / 0, un = 0, dn = function(e) {
			e.forEach(function(e) {
				e.interactionId && (cn = Math.min(cn, e.interactionId), un = Math.max(un, e.interactionId), ln = un ? (un - cn) / 7 + 1 : 0);
			});
		}, S = [], fn = /* @__PURE__ */ new Map(), hn = 0, pn = [], mn = [200, 500], gn = [2500, 4e3], vn = {}, yn = {
			passive: !0,
			capture: !0
		}, wn = /* @__PURE__ */ new Date(), bn = function(e, t) {
			w || (w = t, Nt = e, _t = /* @__PURE__ */ new Date(), Sn(removeEventListener), En());
		}, En = function() {
			var t;
			0 <= Nt && Nt < _t - wn && (t = {
				entryType: "first-input",
				name: w.type,
				target: w.target,
				cancelable: w.cancelable,
				startTime: w.timeStamp,
				processingStart: w.timeStamp + Nt
			}, Ft.forEach(function(e) {
				e(t);
			}), Ft = []);
		}, Sn = function(t) {
			[
				"mousedown",
				"keydown",
				"touchstart",
				"pointerdown"
			].forEach(function(e) {
				return t(e, Lt, yn);
			});
		}, Rn = [100, 300], Tn = [
			"visibilitychange",
			"pagehide",
			"beforeunload"
		], On = (O.prototype.start = function() {
			var t = this, n = new PerformanceObserver(function(e) {
				e = e.getEntriesByName("first-contentful-paint");
				0 < e.length && (t.fcp = e[0].startTime, t.slientWindowStartTime = t.fcp, n.disconnect(), setTimeout(function() {
					t.checkTTI();
				}, Math.max(t.slienceTimeInterval - (performance.now() - t.fcp) + 20, 1)));
			});
			n.observe({ entryTypes: ["paint"] }), this.longtaskObserver = new PerformanceObserver(function(e) {
				e = e.getEntries();
				t.longTaskEntries = t.longTaskEntries.concat(e);
			}), this.longtaskObserver.observe({ entryTypes: ["longtask"] }), this.resourceObserver = new PerformanceObserver(function(e) {
				e = e.getEntries();
				t.resourceEntries = t.resourceEntries.concat(e);
			}), this.resourceObserver.observe({ entryTypes: ["resource"] });
		}, O.prototype.checkTTI = function() {
			var e = this;
			this.hasSlientWindow() ? (this.calculateTTI(), this.longtaskObserver.disconnect(), this.resourceObserver.disconnect()) : setTimeout(function() {
				e.checkTTI();
			}, this.checkInterval);
		}, O.prototype.hasSlientWindow = function() {
			var e, t = performance.now();
			return !(t - this.slientWindowStartTime < 5e3 || ((e = this.getLastLongTaskEndTime()) > this.slientWindowStartTime ? (this.slientWindowStartTime = e, this.resourceEntries = []) : this.getRequestCount(this.slientWindowStartTime, t) <= 2 ? (this.lastLongtaskEndTime = e, 0) : (t = this.resourceEntries.sort(function(e, t) {
				return e.startTime - t.startTime;
			}), this.slientWindowStartTime = t[this.resourceEntries.length - 2].startTime, 1)));
		}, O.prototype.getLastLongTaskEndTime = function() {
			var t;
			return 0 === this.longTaskEntries.length ? -1 : (t = 0, this.longTaskEntries.forEach(function(e) {
				e.startTime + e.duration > t && (t = e.startTime + e.duration);
			}), t);
		}, O.prototype.getRequestCount = function(t, n) {
			var r = 0;
			return this.resourceEntries.forEach(function(e) {
				e.startTime >= t && e.startTime + e.duration <= n && (r += 1);
			}), r;
		}, O.prototype.calculateTTI = function() {
			var e = -1 === this.lastLongtaskEndTime ? this.slientWindowStartTime : this.lastLongtaskEndTime, t = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart, e = Math.max(t, e);
			this.onTTICallback(e);
		}, O), T = (new r({ name: "webVitals" }), {
			FCP: -1,
			LCP: -1,
			FID: -1,
			CLS: -1,
			INP: -1,
			TTI: -1,
			from: void 0
		}), xn = /* @__PURE__ */ new Map(), Pn = new r({
			name: "webVitals",
			onNewAegis: function(e) {
				var t, n, a, s, l, c, u, d, r = this;
				if (ze() && "function" == typeof window.PerformanceObserver && "function" == typeof performance.getEntriesByName) try {
					xn.set(e, {
						isWebVitalsReported: !1,
						hasFirstEntry: !1,
						custom: null
					}), Rt(kt), u = kt, d = {}, St(function() {
						function e(e) {
							(e = d.reportAllChanges ? e : e.slice(-1)).forEach(function(e) {
								e.startTime < r.firstHiddenTime && (i.value = Math.max(e.startTime - Yt(), 0), i.entries = [e], t());
							});
						}
						var t, n, r = Et(), i = f("LCP"), o = Zt("largest-contentful-paint", e);
						o && (t = h(u, i, gn, d.reportAllChanges), n = bt(function() {
							vn[i.id] || (e(o.takeRecords()), o.disconnect(), vn[i.id] = !0, t(!0));
						}), ["keydown", "click"].forEach(function(e) {
							addEventListener(e, function() {
								return xt(n);
							}, {
								once: !0,
								capture: !0
							});
						}), wt(n), Kt(function(e) {
							i = f("LCP"), t = h(u, i, gn, d.reportAllChanges), yt(function() {
								i.value = performance.now() - e.timeStamp, vn[i.id] = !0, t(!0);
							});
						}));
					}), l = kt, c = {}, Rt(bt(function() {
						function e(e) {
							e.forEach(function(e) {
								var t, n;
								e.hadRecentInput || (t = i[0], n = i[i.length - 1], r && e.startTime - n.startTime < 1e3 && e.startTime - t.startTime < 5e3 ? (r += e.value, i.push(e)) : (r = e.value, i = [e]));
							}), r > n.value && (n.value = r, n.entries = i, t());
						}
						var t, n = f("CLS", 0), r = 0, i = [], o = Zt("layout-shift", e);
						o && (t = h(l, n, sn, c.reportAllChanges), wt(function() {
							e(o.takeRecords()), t(!0);
						}), Kt(function() {
							n = f("CLS", r = 0), t = h(l, n, sn, c.reportAllChanges), yt(function() {
								return t();
							});
						}), setTimeout(t, 0));
					})), Pt(kt), a = kt, s = {}, St(function() {
						function t(e) {
							e.startTime < n.firstHiddenTime && (r.value = e.processingStart - e.startTime, r.entries.push(e), o(!0));
						}
						function e(e) {
							e.forEach(t);
						}
						var n = Et(), r = f("FID"), i = Zt("first-input", e), o = h(a, r, Rn, s.reportAllChanges);
						i && (wt(bt(function() {
							e(i.takeRecords()), i.disconnect();
						})), Kt(function() {
							r = f("FID"), o = h(a, r, Rn, s.reportAllChanges), Ft = [], Nt = -1, w = null, Sn(addEventListener), Ft.push(t), En();
						}));
					}), n = function(e) {
						kt({
							name: "TTI",
							value: e
						});
					}, ze() && new On(n).start(), Ct(function() {
						r.tryReport(e, null, "onHidden");
					}, {
						once: !0,
						delay: { visibilitychange: 10 }
					}), T.from = null == (t = e) ? void 0 : t.getCurrentPageUrl();
				} catch (e) {}
			},
			tryReport: function(t, n, r) {
				var i = this;
				void 0 === r && (r = "manual"), this.$walk(function(e) {
					e === t && ("object" == typeof (e = i.$getConfig(t)) && !0 === e.manualReport || "onHidden" !== r ? (e = xn.get(t)) && !e.hasFirstEntry ? (e.hasFirstEntry = !0, "manual" === r && n && (e.custom = n)) : i.doReport(t, (null == e ? void 0 : e.custom) || n) : i.doReport(t, null));
				});
			},
			doReport: function(n, r) {
				var e = xn.get(n);
				if (e) {
					if (null != e && e.isWebVitalsReported) return;
					e.isWebVitalsReported = !0;
				}
				this.$walk(function(o) {
					var e, t;
					o === n && (t = oe({}, T), r && Object.keys(r).forEach(function(e) {
						null != r[e] && (t[e] = r[e]);
					}), null != (e = o.sendPipeline)) && e.call(o, [function(e, t) {
						var n, r = [];
						for (n in e) "from" !== n && r.push(n + "=" + e[n]);
						var i = -1 === (null == (i = null == (i = o.config) ? void 0 : i.performanceUrl) ? void 0 : i.indexOf("?")) ? "?" : "&";
						t({
							url: o.config.webVitalsUrl + i + r.join("&"),
							type: m.VITALS,
							log: e,
							sendBeacon: !0
						});
					}], m.VITALS)(t);
				});
			},
			publish: function(e, t) {
				this.tryReport(e, t, "manual");
			},
			destroy: function() {
				this.option.publish = function() {};
			}
		}), Ln = (new r({ name: "pagePerformance" }), 3), Cn = /* @__PURE__ */ new Map(), kn = new r({
			name: "pagePerformance",
			performanceMap: {},
			onNewAegis: function(t) {
				var e;
				ze() && (Cn.set(t, { isPagePerformanceReported: !1 }), d ? this.publish(d, t) : this.startCalcPerformance(t), e = this.publishWhenObHidden.bind(this, t), Ct(e, { once: !0 }), t.lifeCycle.on("destroy", function() {
					var e = Cn.get(t);
					e && (e.isPagePerformanceReported = !1);
				}));
			},
			publishWhenObHidden: function(e) {
				var t, n = Cn.get(e);
				if (null == n || !n.isPagePerformanceReported) {
					n = 0;
					if (null != (t = e.firstScreenInfo) && t.timing) n = e.firstScreenInfo.timing;
					else if (Ge("paint")) try {
						var r, i = performance.getEntriesByName("first-contentful-paint");
						i && 0 < i.length && (r = i[0]) && 0 < r.startTime && (n = r.startTime);
					} catch (e) {}
					(d = this.buildPerformanceLog(e, n, this.getPageUrl(e), window.location.href)) && this.publish(d, e, !0);
				}
			},
			buildPerformanceLog: function(e, t, n, r) {
				var i = performance.timing;
				if (i) return n = {
					from: n,
					originFrom: r,
					dnsLookup: c(i.domainLookupEnd - i.domainLookupStart),
					tcp: c(i.connectEnd - i.connectStart),
					ssl: c(0 === i.secureConnectionStart ? 0 : i.requestStart - i.secureConnectionStart),
					ttfb: c(i.responseStart - i.requestStart),
					contentDownload: c(i.responseEnd - i.responseStart),
					domParse: c(i.domInteractive - i.domLoading, 0, 15e3, 1070),
					resourceDownload: c(i.loadEventStart - i.domInteractive, 0, 15e3, 1070),
					firstScreenTiming: c(Math.floor(t), 0, 15e3, 15e3)
				}, (r = e.config).extraPerformanceData && "{}" !== JSON.stringify(r.extraPerformanceData) && (t = (i = r.extraPerformanceData).engineInit, e = i.bundleLoad, n = oe(oe({}, n), {
					engineInit: c(t, 0, 1e4),
					bundleLoad: c(e, 0, 1e4)
				})), n;
			},
			publish: function(a, s, l) {
				var c = this;
				void 0 === l && (l = !1), this.$walk(function(o) {
					var e, i;
					o === s && ((e = Cn.get(o)) && (e.isPagePerformanceReported = !0), i = a.originFrom || window.location.href, a.originFrom && delete a.originFrom, o.sendPipeline([function(e, t) {
						var n, r, i = [];
						for (n in e) "from" !== n && i.push(n + "=" + e[n]);
						if (c.$getConfig(o)) return r = -1 === (null == (r = o.config.performanceUrl) ? void 0 : r.indexOf("?")) ? "?" : "&", t({
							url: o.config.performanceUrl + r + i.join("&"),
							type: m.PERFORMANCE,
							log: e,
							sendBeacon: l
						});
					}], m.PERFORMANCE)(oe({}, a)), setTimeout(function() {
						var e = [
							"duration: " + (a.dnsLookup + a.tcp + a.ssl + a.ttfb + a.contentDownload + a.domParse + a.resourceDownload) + "ms",
							"firstScreenTiming: " + a.firstScreenTiming + "ms",
							"dnsLookup: " + a.dnsLookup + "ms",
							"tcp: " + a.tcp + "ms",
							"ssl: " + a.ssl + "ms",
							"ttfb: " + a.ttfb + "ms",
							"contentDownload: " + a.contentDownload + "ms",
							"domParse: " + a.domParse + "ms",
							"resourceDownload: " + a.resourceDownload + "ms",
							"lcp: " + T.LCP + "ms",
							"fid: " + T.FID + "ms",
							"cls: " + T.CLS + "ms",
							"fcp: " + T.FCP + "ms",
							a.engineInit ? "engineInit: " + a.engineInit + "ms" : "",
							a.bundleLoad ? "bundleLoad: " + a.bundleLoad + "ms" : ""
						].filter(function(e) {
							return e;
						}).join("\n\n"), t = c.$getConfig(o), n = !1;
						if ("function" == typeof (null == t ? void 0 : t.isSlowPage)) try {
							n = null == t ? void 0 : t.isSlowPage(a, T);
						} catch (e) {
							console.warn("[Aegis] isSlowPage function happen error:", e, ", this data will not be reported.");
							return;
						}
						else null != t && t.slowPageThreshold && "number" == typeof t.slowPageThreshold ? a.firstScreenTiming > (null == t ? void 0 : t.slowPageThreshold) && (n = !0) : n = 1e3 < a.firstScreenTiming;
						var t = s.config.pageLoadLog, r = s.config.slowPageLoadLog && n, e = {
							msg: e,
							ext1: (null == (e = a.firstScreenTiming) ? void 0 : e.toString()) || "",
							level: n ? le.SLOW_PAGE_LOAD : le.PAGE_LOAD,
							errorMsg: "",
							originFrom: i
						};
						(t || r) && o.normalLogPipeline(e);
					}, 3e3));
				});
			},
			getPageUrl: function(e) {
				var t = this.$getConfig(e);
				if (null != t && t.urlHandler && "function" == typeof (null == t ? void 0 : t.urlHandler)) {
					t = null == t ? void 0 : t.urlHandler();
					if (t) return encodeURIComponent(t);
				}
				return e.getCurrentPageUrl();
			},
			startCalcPerformance: function(t) {
				var n = this;
				try {
					var r = this.getPageUrl(t), i = t.getOriginFrom();
					this.getFirstScreenTiming(t, function(e) {
						d = n.buildPerformanceLog(t, e, r, i);
						e = Cn.get(t);
						!d || null != e && e.isPagePerformanceReported || n.publish(d, t);
					});
				} catch (t) {}
			},
			getFirstScreenTiming: function(l, c) {
				var u = this;
				l.lifeCycle.on("destroy", function() {
					v && clearTimeout(v);
				});
				var d, f = this, n = [
					"script",
					"style",
					"link",
					"br"
				], h = [], p = {}, m = (Ge("paint") && (d = new PerformanceObserver(function(e) {
					e.getEntries().forEach(function(e) {
						var t;
						"paint" === e.entryType && "first-contentful-paint" === e.name && 0 < (t = document.querySelectorAll("[AEGIS-FIRST-SCREEN-TIMING]")).length && l.config.id && !u.performanceMap[l.config.id] && (u.setFirstScreenInfo(l, e.startTime, t[0], t), c?.(e.startTime), m.disconnect(), d.disconnect(), v) && clearTimeout(v);
					});
				})).observe({ entryTypes: ["paint"] }), new MutationObserver(function(e) {
					var t = {
						roots: [],
						ignores: [],
						rootsDomNum: [],
						time: performance.now()
					};
					e.forEach(function(e) {
						e && e.addedNodes && Array.prototype.slice.call(e.addedNodes).forEach(function(e) {
							f.isEleInArray(e, t.ignores) ? t.ignores.push(e) : 1 === e.nodeType && e.hasAttribute("AEGIS-FIRST-SCREEN-TIMING") ? (Object.prototype.hasOwnProperty.apply(p, [t.time]) || (p[t.time] = []), p[t.time].push(e)) : 1 === e.nodeType && (f.hasAncestorOrSelfWithAttribute(e, "AEGIS-IGNORE-FIRST-SCREEN-TIMING") ? t.ignores.push(e) : -1 !== n.indexOf(e.nodeName.toLocaleLowerCase()) || f.isEleInArray(e, t.roots) || (t.roots.push(e), t.rootsDomNum.push(f.walkAndCount(e) || 0)));
						});
					}), t.roots.length && h.push(t);
				})), g = (m.observe(document, {
					childList: !0,
					subtree: !0
				}), function(n) {
					(n = void 0 === n ? 0 : n) || (r = 0, e = Object.keys(p), i = null, e.length ? (n = Math.max.apply(null, e), i = null == (e = p[n]) ? void 0 : e[0]) : h.forEach(function(e) {
						for (var t = 0; t < e.roots.length; t++) e.rootsDomNum[t] > r && f.isInFirstScreen(e.roots[t]) && (r = e.rootsDomNum[t], n = e.time, i = e.roots[t]);
					}), i && u.setFirstScreenInfo(l, n, i, p), h.length = 0, Object.keys(p).forEach(function(e) {
						p[e] = p[e].map(function(e) {
							var t = { tagName: e.tagName }, n = e.attributes;
							if (!n) return e;
							for (var r = 0; r < n.length; r++) {
								var i = n[r];
								i.name && (t[i.name] = e.getAttribute(i.name));
							}
							return t;
						});
					}));
					var r, i, e = performance.timing, t = e.domInteractive - e.domLoading, o = n;
					v = null;
					for (var a = 0, s = [
						t,
						e.loadEventStart - e.domInteractive,
						o
					]; a < s.length; a++) if (s[a] <= 0 && 0 < Ln) {
						v = setTimeout(function() {
							return g(o);
						}, 3e3);
						break;
					}
					v ? --Ln : (m.disconnect(), d?.disconnect(), c?.(n));
				}), v = setTimeout(function() {
					return g();
				}, 3e3);
			},
			setFirstScreenInfo: function(e, t, n, r) {
				var i;
				e.config.id && this.performanceMap[e.config.id] || (e.config.id && (this.performanceMap[e.config.id] = !0), ("object" != typeof (null == (i = e.config) ? void 0 : i.pagePerformance) || null != (i = e.config.pagePerformance) && i.firstScreenInfo) && (e.firstScreenInfo = {
					element: n,
					timing: t,
					markDoms: r
				}));
			},
			isEleInArray: function(e, t) {
				return !(!e || e === document.documentElement) && (-1 !== t.indexOf(e) || this.isEleInArray(e.parentElement, t));
			},
			isInFirstScreen: function(e) {
				var t;
				return !(!e || "function" != typeof e.getBoundingClientRect) && (e = e.getBoundingClientRect(), t = window.innerHeight, 0 <= e.left) && e.left < window.innerWidth && 0 <= e.top && e.top < t && 0 < e.width && 0 < e.height;
			},
			walkAndCount: function(e) {
				var t = 0;
				if (e && 1 === e.nodeType) {
					t += 1;
					var n = e.children;
					if (null != n && n.length) for (var r = 0; r < n.length; r++) 1 === n[r].nodeType && n[r].hasAttribute("AEGIS-IGNORE-FIRST-SCREEN-TIMING") || (t += this.walkAndCount(n[r]));
				}
				return t;
			},
			hasAncestorOrSelfWithAttribute: function(e, t) {
				for (var n = e; n && n !== document.body;) {
					if (n.hasAttribute(t)) return !0;
					n = n.parentElement;
				}
				return !1;
			}
		}), In = (new r({ name: "spa" }), [
			"replaceState",
			"pushState",
			"popstate",
			"hashchange"
		]), An = new r({
			name: "spa",
			originFireUrl: "",
			onNewAegis: function(t) {
				var n = this;
				history.pushState = this.wr("pushState") || history.pushState, history.replaceState = this.wr("replaceState") || history.replaceState, this.sendPv = this.sendPv.bind(this), t.config.spa && this.sendPv(t), In.forEach(function(e) {
					return window.addEventListener(e, function() {
						return n.sendPv.call(n, t);
					});
				});
			},
			wr: function(n) {
				var r = history[n], e = "__" + n + "__hasWrittenByTamSpa";
				return "function" == typeof r && !history[e] && (Object.defineProperty(history, e, {
					value: !0,
					enumerable: !1
				}), function() {
					var e = r.apply(this, arguments), t = null;
					return "function" == typeof Event ? t = new Event(n) : (t = document.createEvent("HTMLEvents")).initEvent(n, !1, !0), window.dispatchEvent(t), e;
				});
			},
			sendPv: function(i) {
				var n = this;
				setTimeout(function() {
					var t = location.pathname + location.hash + i.config.id;
					n.$walk(function(e) {
						var r;
						e === i && (r = e.config.pvUrl) && t && t !== n.originFireUrl && (e.sendPipeline([function(e, t) {
							var n = null != r && r.includes("?") ? "&" : "?";
							t({
								url: r + n + "originFrom=" + encodeURIComponent(i.getOriginFrom()),
								type: m.PV
							});
						}], m.PV)(null), n.originFireUrl = t);
					});
				}, 0);
			},
			destroy: function() {
				this.option.sendPv = function() {};
			}
		});
		function O(e) {
			this.slienceTimeInterval = 5e3, this.checkInterval = 100, this.fcp = 0, this.longTaskEntries = [], this.resourceEntries = [], this.slientWindowStartTime = performance.now(), this.onTTICallback = e;
		}
		function Mn(l) {
			return ae(this, void 0, void 0, function() {
				var t, n, r, i, o, a, s;
				return se(this, function(e) {
					switch (e.label) {
						case 0: t = new Blob([l]).stream().pipeThrough(new CompressionStream("gzip")), t = t.getReader(), n = [], e.label = 1;
						case 1: return [4, t.read()];
						case 2:
							if (r = e.sent(), i = r.done, r = r.value, i) return [3, 4];
							n.push(r), e.label = 3;
						case 3: return [3, 1];
						case 4:
							if (1 === n.length) return [2, n[0]];
							for (i = n.reduce(function(e, t) {
								return e + t.length;
							}, 0), o = new Uint8Array(i), s = a = 0; s < n.length; s += 1) o.set(n[s], a), a += n[s].length;
							return [2, o];
					}
				});
			});
		}
		var x = null, Nn = !1, _n = 0, P = /* @__PURE__ */ new Map();
		var Fn = "__MONITOR_SESSION_V1__";
		function Hn(e) {
			try {
				sessionStorage.setItem("__MONITOR_SESSION_V1__", JSON.stringify(e));
			} catch (e) {}
		}
		function Un(e, t) {
			var n;
			return "undefined" == typeof window ? {
				sessionId: t(),
				createdAt: Date.now(),
				lastActivity: Date.now(),
				source: e,
				version: 1
			} : null != (n = window[Fn]) && n.sessionId ? (n.lastActivity = Date.now(), Hn(n), n) : (n = (() => {
				try {
					var e, t, n = sessionStorage.getItem("__MONITOR_SESSION_V1__");
					return n ? "string" != typeof (e = JSON.parse(n)).sessionId || "number" != typeof e.createdAt || "number" != typeof e.lastActivity || 36e5 < (t = Date.now()) - e.createdAt || 9e5 < t - e.lastActivity ? null : (e.lastActivity = t, e) : null;
				} catch (n) {
					return null;
				}
			})()) ? (Hn(window[Fn] = n), n) : (n = {
				sessionId: t(),
				createdAt: Date.now(),
				lastActivity: Date.now(),
				source: e,
				version: 1
			}, Hn(window[Fn] = n), n);
		}
		N(qn = L, n = Dn = n), qn.prototype = null === n ? Object.create(n) : (jn.prototype = n.prototype, new jn()), L.resolveGzipConfig = function(e) {
			var t, n = {
				enable: !0,
				threshold: 1024,
				debug: !1,
				useWorker: !0,
				workerThreshold: 4096
			};
			return !1 === e ? oe(oe({}, n), { enable: !1 }) : !0 === e || null == e ? n : {
				enable: !1 !== e.enable,
				threshold: null != (t = e.threshold) ? t : n.threshold,
				debug: null != (t = e.debug) ? t : n.debug,
				useWorker: null != (t = e.useWorker) ? t : n.useWorker,
				workerThreshold: null != (t = e.workerThreshold) ? t : n.workerThreshold
			};
		}, L.prototype.addExtBean = function(e, t) {
			t && this.extendBean(e, encodeURIComponent("string" == typeof t && [
				"ext1",
				"ext2",
				"ext3"
			].includes(e) ? t.slice(0, 1024) : t));
		}, L.prototype.getBean = function(t) {
			var n = this;
			return void 0 === t && (t = []), "" + Object.getOwnPropertyNames(this.bean).filter(function(e) {
				return -1 === t.indexOf(e);
			}).map(function(e) {
				return "from" === e ? "from=" + n.getCurrentPageUrl() : e + "=" + n.bean[e];
			}).join("&");
		}, L.prototype.getCurrentPageUrl = function() {
			var e = this.config.pageUrl || location.href, e = (e = "function" == typeof this.config.urlHandler ? this.config.urlHandler() || location.href : e).slice(0, 2048);
			return encodeURIComponent(e);
		}, L.prototype.getOriginFrom = function() {
			try {
				return ("undefined" != typeof window && window.location ? window.location.href : "").slice(0, 2048);
			} catch (e) {
				return "";
			}
		}, L.prototype.reportPageView = function(e) {
			var r, i, o = this.config.pvUrl;
			o && (r = this.getOriginFrom(), i = "string" == typeof e && e ? e.slice(0, 2048) : "", this.sendPipeline([function(e, t) {
				var n = r ? q(o, { originFrom: r }) : o;
				t({
					url: i ? q(n, { from: i }) : n,
					type: m.PV,
					beanFilter: i ? ["from"] : void 0
				});
			}], m.PV)(null));
		}, L.prototype.ready = function() {
			function o() {
				var e, n, r, i;
				t.reportRequestQueue.length && (e = t.reportRequestQueue.splice(0, 1)[0], n = e.options, r = e.success, i = e.fail, t.$request(n, function() {
					for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
					try {
						return null == r ? void 0 : r.apply(n, e);
					} finally {
						o();
					}
				}, function() {
					for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
					try {
						return null == i ? void 0 : i.apply(n, e);
					} finally {
						o();
					}
				}));
			}
			var t = this;
			o(), this.isReportReady = !0;
		}, L.prototype.request = function(u, r, d) {
			var f, h, p = this;
			this.config.reportImmediately || this.isReportReady ? this.$request(u, f = function(e) {
				var t, n = It("aegis-web-retry-report-requests");
				null != n && n.length && u.extraRetryOptions && (0 <= (t = n.findIndex(function(e) {
					return e.extraRetryOptions.requestId === u.extraRetryOptions.requestId;
				})) && (n.splice(t, 1), At("aegis-web-retry-report-requests", JSON.stringify(n))), delete window[u.extraRetryOptions.success], delete window[u.extraRetryOptions.fail]), r?.(e);
			}, h = function(n) {
				if (!p.config.reportRetry || u.type === m.WHITE_LIST || u.type === m.SDK_ERROR) return null == d ? void 0 : d(n);
				var e = "boolean" == typeof p.config.reportRetry ? ft : oe(oe({}, ft), p.config.reportRetry), t = e.maxRetryCount, r = void 0 === t ? ft.maxRetryCount : t, t = e.retryInterval, t = void 0 === t ? ft.retryInterval : t, i = e.whenRetryEndStillFail, o = void 0 === i ? ft.whenRetryEndStillFail : i, i = e.maxStorageCount, a = Math.min(100, Math.max(20, void 0 === i ? ft.maxStorageCount : i)), s = (u.extraRetryOptions || (u.extraRetryOptions = {
					requestId: "",
					retriedCount: 0,
					success: "",
					fail: ""
				}), u.extraRetryOptions), l = (s.requestId = s.requestId || u.url + "-" + Date.now() + "-" + Math.random(), s.requestId), c = (s.retriedCount = s.retriedCount || 0, s.success = s.success || l + "_successCallback", s.fail = s.fail || l + "_failCallback", It("aegis-web-retry-report-requests"));
				if (c.find(function(e) {
					return e.extraRetryOptions.requestId === l;
				})) {
					e = c.findIndex(function(e) {
						return e.extraRetryOptions.requestId === l;
					});
					c[e] = u;
				} else for (c.push(u); c.length > a;) c.shift();
				At("aegis-web-retry-report-requests", JSON.stringify(c)), setTimeout(function() {
					var e, t;
					s.retriedCount < r ? (u.extraRetryOptions.retriedCount += 1, p.$request(u, f, h)) : (-1 !== (t = (e = It("aegis-web-retry-report-requests")).findIndex(function(e) {
						return (null == (e = e.extraRetryOptions) ? void 0 : e.requestId) === l;
					})) && "discard" === o && (e.splice(t, 1), At("aegis-web-retry-report-requests", JSON.stringify(e))), d?.(n), delete window[s.success], delete window[s.fail]);
				}, "function" == typeof t ? t(u.extraRetryOptions.retriedCount) : t), window[s.success] || (window[s.success] = f), window[s.fail] || (window[s.fail] = h);
			}) : this.reportRequestQueue.push({
				options: u,
				success: r,
				fail: d
			});
		}, L.prototype.$request = function(s, e, t) {
			var n, r;
			if (s && "string" == typeof s.url && "" !== s.url && this.bean.id) return n = s.url, !1 !== s.addBean && (n = ((e, t) => {
				var n, r, i, o = e, a = s.beanFilter || [];
				for (n in t) -1 === a.indexOf(n) && ((i = (r = new RegExp("([?&])" + n + "(=([^&]*))?(?=&|$)")).exec(o)) ? i[2] && "" !== i[3] && "undefined" !== i[3] || (o = o.replace(r, "$1" + n + "=" + t[n])) : (i = -1 < o.indexOf("?") ? "&" : "?", o += i + n + "=" + t[n]));
				return o;
			})(n, oe(oe({}, this.bean), { from: this.getCurrentPageUrl() }))), s.url = n, n = s.method || "get", r = this.config.onBeforeRequest, (s = r ? r(s, this) : s) ? s.url ? void ((null != s && s.sendBeacon || this.sendNow) && "function" == typeof (null == navigator ? void 0 : navigator.sendBeacon) ? navigator.sendBeacon(s.url, s.data) : ("string" == typeof s.data && (s.data = s.data.replace(/eval/gi, "evaI")), (r = this.isGzipReportEnabled(this.resolvedGzipConfig.enable)) && L.compressionSupported && "get" !== n.toLowerCase() && "string" == typeof s.data && s.data.length >= this.resolvedGzipConfig.threshold ? this.sendWithGzip(s, n, r, e, t) : this.sendXhr(s, n, s.data, Be(r, !1), e, t))) : console.warn("Please handle the parameters reasonably, options.url is necessary") : console.warn("Sending request blocked");
		}, L.prototype.sendWithGzip = function(l, c, u, d, f) {
			return ae(this, void 0, void 0, function() {
				var r, i, o, s;
				return se(this, function(e) {
					switch (e.label) {
						case 0:
							if (e.trys.push([
								0,
								9,
								,
								10
							]), r = new TextEncoder(), r = r.encode(l.data), o = this.resolvedGzipConfig, i = o.useWorker, o = o.workerThreshold, s = void 0, !(i && r.byteLength >= o)) return [3, 6];
							e.label = 1;
						case 1: return e.trys.push([
							1,
							3,
							,
							5
						]), [4, (a = r, new Promise(function(t, n) {
							var r, i, e, o = (() => {
								if (Nn) return null;
								if (x) return x;
								try {
									var e = new Blob(["\nself.onmessage=async function(e){\n  try{\n    var d=e.data,id=d.id,raw=d.data;\n    var s=new Blob([raw]).stream().pipeThrough(new CompressionStream(\"gzip\"));\n    var r=s.getReader(),chunks=[];\n    for(;;){var res=r.read();var p=await res;if(p.done)break;chunks.push(p.value);}\n    var len=0;for(var i=0;i<chunks.length;i++)len+=chunks[i].length;\n    var out=new Uint8Array(len),off=0;\n    for(var i=0;i<chunks.length;i++){out.set(chunks[i],off);off+=chunks[i].length;}\n    self.postMessage({id:id,compressed:out},[out.buffer]);\n  }catch(err){\n    self.postMessage({id:id,error:err.message||\"compress error\"});\n  }\n};"], { type: "application/javascript" }), t = URL.createObjectURL(e);
									return x = new Worker(t), URL.revokeObjectURL(t), x.onmessage = function(e) {
										var e = e.data, t = e.id, n = e.compressed, e = e.error, r = P.get(t);
										r && (P.delete(t), e ? r.reject(new Error(e)) : r.resolve(n));
									}, x.onerror = function() {
										Nn = !0, P.forEach(function(e) {
											return e.reject(/* @__PURE__ */ new Error("gzip worker error"));
										}), P.clear(), x && (x.terminate(), x = null), P.forEach(function(e) {
											return e.reject(/* @__PURE__ */ new Error("worker terminated"));
										}), P.clear();
									}, x;
								} catch (e) {
									return Nn = !0, null;
								}
							})();
							o ? (r = _n += 1, i = setTimeout(function() {
								var e = P.get(r);
								e && (P.delete(r), e.reject(/* @__PURE__ */ new Error("gzip worker timeout")));
							}, 5e3), P.set(r, {
								resolve: function(e) {
									clearTimeout(i), t(e);
								},
								reject: function(e) {
									clearTimeout(i), n(e);
								}
							}), e = a.buffer.slice(a.byteOffset, a.byteOffset + a.byteLength), o.postMessage({
								id: r,
								data: new Uint8Array(e)
							}, [e])) : n(/* @__PURE__ */ new Error("worker unavailable"));
						}))];
						case 2: return s = e.sent(), [3, 5];
						case 3: return e.sent(), [4, Mn(r)];
						case 4: return s = e.sent(), [3, 5];
						case 5: return [3, 8];
						case 6: return [4, Mn(r)];
						case 7: s = e.sent(), e.label = 8;
						case 8: return this.resolvedGzipConfig.debug && console.info("[Aegis gzip] before=" + (t = r.byteLength) + "B after=" + (n = s.byteLength) + "B saved=" + (t - n) + "B ratio=" + (0 < t ? (n / t * 100).toFixed(1) : "0.0") + "%"), this.sendXhr(l, c, s, Be(u, !0), d, f), [3, 10];
						case 9: return e.sent(), this.sendXhr(l, c, l.data, Be(u, !1), d, f), [3, 10];
						case 10: return [2];
					}
					var t, n, a;
				});
			});
		}, L.prototype.sendXhr = function(e, t, n, r, i, o) {
			var a = new XMLHttpRequest();
			a.sendByAegis = !0, a.addEventListener("readystatechange", function() {
				4 === a.readyState && (400 <= a.status || 0 === a.status ? o?.(a.response) : i?.(a.response));
			}), "get" === t.toLocaleLowerCase() ? (a.open("get", q(e.url, e.data)), a.send()) : (a.open("post", e.url), e.contentType && a.setRequestHeader("Content-Type", e.contentType), r && a.setRequestHeader("Content-Encoding", r), a.send(n));
		}, L.prototype.publishPluginsLogs = function() {
			L.installedPlugins.find(function(e) {
				return "reportAssetSpeed" === e.name;
			})?.option.collectNotReportedLog(this);
		}, L.prototype.uploadLogs = function(e, t) {
			var n;
			void 0 === e && (e = {}), void 0 === t && (t = {}), null != (n = this.lifeCycle) && n.emit("uploadLogs", e, t);
		}, L.prototype.reportWebVitals = function(e) {
			try {
				var t = L.installedPlugins.find(function(e) {
					return "webVitals" === e.name;
				});
				t && this.config.webVitals && this.config.webVitals.manualReport && t.option.publish(this, e);
			} catch (e) {}
		}, L.sessionID = Un("aegis", Ae).sessionId, L.compressionSupported = null;
		var Dn, qn, n = L;
		function L(e) {
			var t, n, r, a, i, o, s = Dn.call(this, e) || this;
			s.sendNow = !1, s.isReportReady = !1, s.reportRequestQueue = [], s.speedLogPipeline = He([
				ee(s),
				(a = s.config, function(e, t) {
					var n, r, i, o = "number" == typeof a.repeat ? a.repeat : 60;
					!a.speedSample || o <= 0 ? t(e) : (n = (null == a ? void 0 : a.id) || "0", r = Oe[n] || {}, Array.isArray(e) ? (i = e.filter(function(e) {
						var t = !r[e.url] || r[e.url] < o;
						return t ? (r[e.url] = 1 + ~~r[e.url], Oe[n] = r) : v[n] || xe(n), t;
					})).length && t(i) : !r[e.url] || r[e.url] < o ? (r[e.url] = 1 + ~~r[e.url], Oe[n] = r, t(e)) : v[n] || xe(n));
				}),
				(r = s, function(t, n) {
					Ht(function(e) {
						r.extendBean("netType", e), n(t);
					});
				}),
				function(e, t) {
					null != (n = s.lifeCycle) && n.emit("beforeReportSpeed", e);
					var n, r = s.config.beforeReportSpeed;
					if ((e = "function" == typeof r ? e.filter(function(e) {
						return !1 !== r(e);
					}) : e).length) return t(e);
				},
				function(e, t) {
					t(e.map(function(e) {
						return void 0 !== e.payload && delete e.payload, e;
					}));
				},
				function(e) {
					return s.sendPipeline([function(e, t) {
						t({
							type: m.SPEED,
							url: "" + s.config.speedUrl,
							method: "post",
							contentType: "application/json",
							data: Q(e, oe(oe({}, s.bean), { from: s.getCurrentPageUrl() })),
							log: e
						});
					}], m.SPEED)(e);
				}
			]), e.asyncPlugin = !0;
			try {
				"undefined" != typeof document && (e.uin = e.uin || (null != (t = document.cookie.match(/\buin=\D+(\d*)/)) ? t : [])[1] || (null != (n = document.cookie.match(/\bilive_uin=\D*(\d+)/)) ? n : [])[1] || ""), s.init(e), s.resolvedGzipConfig = L.resolveGzipConfig(s.config.gzip), null === L.compressionSupported && (L.compressionSupported = (() => {
					try {
						return "function" == typeof CompressionStream;
					} catch (e) {
						return !1;
					}
				})()), s.extendBean("sessionId", L.sessionID), s.extendBean("from", s.getCurrentPageUrl()), "undefined" != typeof document && s.extendBean("referer", encodeURIComponent(document.referrer || ""));
				i = function(e, t) {
					"aegis" !== t && e && e !== L.sessionID && (L.sessionID = e, s.extendBean("sessionId", e));
				};
				var l = "undefined" == typeof window ? function() {} : (window.addEventListener("monitor-session-update", o = function(e) {
					i(e.detail.sessionId, e.detail.source);
				}), function() {
					return window.removeEventListener("monitor-session-update", o);
				}), c = (s.lifeCycle.on("destroy", l), function() {
					function i() {
						var r;
						e.length && (r = e.splice(0, 1)[0], At("aegis-web-retry-report-requests", JSON.stringify(e)), s.$request(r, function() {
							for (var e, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
							try {
								return null == (e = window[r.extraRetryOptions.success]) ? void 0 : e.apply(r, t);
							} finally {
								i();
							}
						}, function() {
							for (var e, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
							try {
								return null == (e = window[r.extraRetryOptions.fail]) ? void 0 : e.apply(r, t);
							} finally {
								i();
							}
						}));
					}
					var e = It("aegis-web-retry-report-requests");
					i();
				});
				"requestIdleCallback" in window ? window.requestIdleCallback(function() {
					return ae(s, void 0, void 0, function() {
						return se(this, function(e) {
							return c(), [2];
						});
					});
				}) : setTimeout(c, 5e3);
				for (var u = 1; u <= 10; u++) s.addExtBean("ext" + u, e["ext" + u]);
			} catch (e) {
				console.warn(e), console.log("%cThe above error occurred in the process of initializing Aegis, which will affect your normal use of Aegis.\nIt is recommended that you contact us for feedback and thank you for your support.", "color: red"), s.sendSDKError(e);
			}
			return s;
		}
		function jn() {
			this.constructor = qn;
		}
		new r({ name: "ie" }), new r({ name: "onClose" });
		var Wn = new r({
			name: "onClose",
			onNewAegis: function(e) {
				var t = this, n = !1;
				Ct(function() {
					n || (n = !0, t.publishNotReportedLog(e));
				}, { events: ["pagehide", "beforeunload"] });
			},
			publishNotReportedLog: function(t) {
				var n = this;
				this.$walk(function(e) {
					e === t && (e.sendNow = !0, e.publishPluginsLogs(), n.publishThrottlePipeLogs(e));
				});
			},
			publishThrottlePipeLogs: function(e) {
				e?.speedLogPipeline([]), e?.eventPipeline([]), e?.customTimePipeline([]), e?.normalLogPipeline([]);
			}
		});
		new r({ name: "aid" });
		var Bn, zn = {
			containers: [
				"body",
				"html",
				"#app",
				"#root"
			],
			ignoreContainers: [],
			containerMatchers: {
				tagName: ["body", "html"],
				id: ["app", "root"],
				className: []
			},
			ignoreMatchers: {
				tagName: [],
				id: [],
				className: []
			},
			detectStartPosition: {
				x: 0,
				y: 0
			},
			emptyElementsPercent: 70,
			sameElementsPercent: 70,
			debounceDuration: 2e3,
			everySideSampleNumber: 9,
			disableSameElementsCheck: !0,
			ignoreElesWhenDomChange: [],
			reDetectInterval: 2e3,
			samePointDepth: 5,
			customBlankScreenDector: null,
			enableScreenshot: !1,
			needScreenShotMeta: !1,
			screenshotQuality: .1,
			screenshotFormat: "image/webp",
			onBlankScreenCapture: null,
			clientScreenshotTimeout: 1e4
		}, Gn = [
			"canvas",
			"img",
			"svg",
			"iframe"
		], Vn = ((sr = Bn = Bn || {})[sr.UNKNOWN = 0] = "UNKNOWN", sr[sr.ERROR = 1] = "ERROR", sr[sr.DOM_CHANGE = 2] = "DOM_CHANGE", /* @__PURE__ */ new Set([
			"SCRIPT",
			"STYLE",
			"NOSCRIPT",
			"TEMPLATE",
			"HEAD",
			"META",
			"LINK",
			"BR",
			"WBR"
		])), Jn = (k.prototype.capture = function() {
			return ae(this, void 0, void 0, function() {
				var t, n, r, i, o, a, s, l, c, u, d, f, h, p, m, g, v, y, w;
				return se(this, function(e) {
					switch (e.label) {
						case 0: return e.trys.push([
							0,
							7,
							,
							8
						]), t = performance.now(), this.tasks = [], this.nodeCounter = 0, this.resourcePool.clear(), this.maxDepthReached = 0, this.depthLimitHitCount = 0, u = window.innerWidth, g = window.innerHeight, this.vw = u, this.vh = g, l = window.devicePixelRatio || 1, r = u * this.options.scale, c = g * this.options.scale, i = Math.min(1, this.options.maxWidth / r, this.options.maxHeight / c), n = r * i, r = c * i, c = l * this.options.scale, this.canvas.width = u * c, this.canvas.height = g * c, this.ctx.scale(c, c), i = n / (u * c), this.totalScale = c * i, this.ctx.beginPath(), this.ctx.rect(0, 0, u, g), this.ctx.clip(), this.collectTasks(document.body, 0, [], 0), this.tasks.sort(function(e, t) {
							return e.zIndex !== t.zIndex ? e.zIndex - t.zIndex : e.domOrder - t.domOrder;
						}), o = [], this.resourcePool.forEach(function(e) {
							e instanceof Promise && o.push(e);
						}), 0 < o.length ? [4, Promise.all(o)] : [3, 2];
						case 1: e.sent(), e.label = 2;
						case 2: a = "", s = 0, e.label = 3;
						case 3: return s < this.tasks.length ? (l = this.tasks[s], (c = 0 < l.clipRects.length ? l.clipRects.map(function(e) {
							return e.left + "," + e.top;
						}).join("|") : "") !== a && (a && this.ctx.restore(), c && (this.ctx.save(), this.applyClipRects(l.clipRects)), a = c), [4, l.render()]) : [3, 6];
						case 4: e.sent(), e.label = 5;
						case 5: return s++, [3, 3];
						case 6:
							if (a && this.ctx.restore(), u = this.canvas, i < .99) {
								if (d = this.canvas, f = this.canvas.width, h = this.canvas.height, 3 * n < f) for (; 2 * n < f && (f = Math.floor(f / 2), h = Math.floor(h / 2), (p = document.createElement("canvas")).width = f, p.height = h, m = p.getContext("2d"));) m.imageSmoothingEnabled = !0, m.imageSmoothingQuality = "medium", m.drawImage(d, 0, 0, f, h), d = p;
								(g = document.createElement("canvas")).width = n, g.height = r, (v = g.getContext("2d")) && (v.imageSmoothingEnabled = !0, v.imageSmoothingQuality = "medium", v.drawImage(d, 0, 0, n, r), u = g);
							}
							return v = "jpg" === this.options.format ? "jpeg" : this.options.format, y = u.toDataURL("image/" + v, this.options.quality), this.options.debug && (w = 0 < this.depthLimitHitCount ? " ⚠️ 深度限制触发" + this.depthLimitHitCount + "次" : "", console.log("%c🚀 截图完成 (" + Math.round(performance.now() - t) + "ms) 尺寸:" + u.width + "x" + u.height + " 节点:" + this.nodeCounter + " 任务:" + this.tasks.length + " 最大深度:" + this.maxDepthReached + "/100" + w, "color: #673AB7; font-weight: bold;")), this.cleanup(), [2, y];
						case 7: return w = e.sent(), this.cleanup(), this.options.debug && console.error("Screenshot capture failed:", w), [2, ""];
						case 8: return [2];
					}
				});
			});
		}, k.prototype.isElementVisible = function(e, t) {
			return 0 < t.length ? (t = t[t.length - 1], !(e.right < t.left || e.left > t.right) && (!(e.bottom < t.top || e.top > t.bottom) || Math.abs(e.width - t.width) < 50)) : !(e.bottom < 0 || e.top > this.vh || e.right < 0 || e.left > this.vw);
		}, k.prototype.applyClipRects = function(e) {
			for (var t = 0, n = e; t < n.length; t++) {
				var r = n[t];
				this.ctx.beginPath(), this.ctx.rect(r.left, r.top, r.width, r.height), this.ctx.clip();
			}
		}, k.prototype.collectTasks = function(n, e, t, r) {
			var i = this;
			if (void 0 === e && (e = 0), void 0 === t && (t = []), (r = void 0 === r ? 0 : r) > this.maxDepthReached && (this.maxDepthReached = r), 100 < r) this.depthLimitHitCount++;
			else {
				this.nodeCounter++;
				var o = this.nodeCounter;
				if (3 !== n.nodeType) {
					if (n instanceof Element) {
						var a = n.tagName;
						if (!Vn.has(a)) {
							var s = getComputedStyle(n);
							if ("none" !== s.display && "hidden" !== s.visibility && 0 !== parseFloat(s.opacity)) {
								var l = n.getBoundingClientRect(), c = s.position, u = "fixed" === c || "sticky" === c, d = e, f = s.zIndex, h = ("auto" !== f && (f = parseInt(f, 10), isNaN(f) || (d = f)), u && d < 2e4 && (d += 2e4), 2e4 <= e && d < 2e4 && (d += 2e4), d = d < e ? e : d), f = 2e4 <= e, p = "fixed" === c ? [] : t, d = 0 <= l.bottom && l.top <= this.vh && 0 <= l.right && l.left <= this.vw;
								if (this.options.viewportOnly) {
									if (0 === l.width && 0 === l.height && !u && !f) return;
									if (!(d || u || f || n.parentElement === document.body || this.isElementVisible(l, p))) return;
								}
								var m, g, c = s.overflow || s.overflowX || s.overflowY, c = "hidden" === c || "scroll" === c || "auto" === c || "clip" === c, v = (this.checkAndPreload(s), (d || u || f) && (0 < l.width || 0 < l.height) && (m = parseFloat(s.opacity), this.addTask(h, o, p, function() {
									return i.drawBox(s, l, u, m);
								})), ["::before", "::after"].forEach(function(e) {
									var t = getComputedStyle(n, e);
									"none" === t.content && "none" === t.backgroundImage && "none" === t.webkitMaskImage || (i.checkAndPreload(t), i.addTask(h, o, p, function() {
										return i.drawPseudoElement(t, l);
									}));
								}), n instanceof HTMLImageElement ? (this.preloadImage(n.src), this.addTask(h, o, p, function() {
									return i.drawImageFromUrl(n.src, l);
								})) : n instanceof SVGElement ? (g = this.preloadSVG(n), this.addTask(h, o, p, function() {
									return i.drawImageFromUrl(g, l);
								})) : n instanceof HTMLCanvasElement && n !== this.canvas ? this.addTask(h, o, p, function() {
									return i.drawCanvas(n, l);
								}) : (n instanceof HTMLInputElement || n instanceof HTMLTextAreaElement) && this.addTask(h, o, p, function() {
									return i.drawInputText(n, s, l);
								}), c ? C(p, [{
									left: l.left,
									top: l.top,
									right: l.right,
									bottom: l.bottom,
									width: l.width,
									height: l.height
								}]) : p), y = r + 1;
								if (n.shadowRoot) for (var w = 0, b = Array.from(n.shadowRoot.childNodes); w < b.length; w++) L = b[w], this.collectTasks(L, h, v, y);
								else if ("SLOT" === a) for (var E = 0, S = n.assignedNodes(); E < S.length; E++) {
									var R = S[E];
									this.collectTasks(R, h, v, y);
								}
								else for (var T = 0, O = Array.from(n.childNodes); T < O.length; T++) L = O[T], this.collectTasks(L, h, v, y);
							}
						}
					} else if (n.childNodes) for (var x = 0, P = Array.from(n.childNodes); x < P.length; x++) {
						var L = P[x];
						this.collectTasks(L, e, t, r + 1);
					}
				} else null != (d = n.textContent) && d.trim() && this.addTask(e, o, t, function() {
					return i.drawTextNode(n);
				});
			}
		}, k.prototype.addTask = function(e, t, n, r) {
			this.tasks.push({
				zIndex: e,
				domOrder: t,
				clipRects: n,
				render: r
			});
		}, k.prototype.drawBox = function(e, t, n, r) {
			void 0 === n && (n = !1), void 0 === r && (r = 1);
			var i, o = e.backgroundColor, a = e.borderColor, s = e.borderWidth, l = e.borderRadius, c = e.backgroundImage, u = e.boxShadow, d = e.webkitMaskImage || e.maskImage, f = "transparent" !== o && "rgba(0, 0, 0, 0)" !== o, h = 0 < parseFloat(s), p = c && "none" !== c, m = d && "none" !== d, g = u && "none" !== u && !u.includes("inset");
			(f || h || p || m || g || n) && (this.ctx.save(), r < 1 && (this.ctx.globalAlpha *= r), g && (i = u.match(/(-?\d+px)\s+(-?\d+px)\s+(\d+px)\s*(\d+px)?\s*(rgba?\(.*?\)|#\w+|\w+)/) || u.match(/(rgba?\(.*?\)|#\w+|\w+)\s+(-?\d+px)\s+(-?\d+px)\s+(\d+px)\s*(\d+px)?/)) && (r = isNaN(parseFloat(i[1])), this.ctx.shadowOffsetX = parseFloat(r ? i[2] : i[1]), this.ctx.shadowOffsetY = parseFloat(r ? i[3] : i[2]), this.ctx.shadowBlur = parseFloat(r ? i[4] : i[3]), this.ctx.shadowColor = r ? i[1] : i[5] || "transparent"), g = Math.min(parseFloat(l) || 0, Math.min(t.width, t.height) / 2), this.ctx.beginPath(), 0 < g ? this.roundRectPath(t.left, t.top, t.width, t.height, g) : this.ctx.rect(t.left, t.top, t.width, t.height), u = p && c.includes("gradient"), f ? (this.ctx.fillStyle = o, this.ctx.fill()) : (n || u) && (t.bottom > .85 * this.vh && t.height < .5 * this.vh || u) && (this.ctx.fillStyle = "#ffffff", this.ctx.fill()), m && this.drawMaskImage(d, e, t), p && !u && (i = c.match(/url\(["']?(.*?)["']?\)/)) && (r = this.resourcePool.get(i[1])) && r instanceof HTMLImageElement && this.ctx.drawImage(r, t.left, t.top, t.width, t.height), h && (this.ctx.shadowColor = "transparent", this.ctx.strokeStyle = a, l = parseFloat(s), g = 1 / this.totalScale, this.ctx.lineWidth = Math.max(l, g), this.ctx.stroke()), this.ctx.restore());
		}, k.prototype.drawMaskImage = function(e, t, n) {
			var r, i, o, e = e.match(/url\(["']?(.*?)["']?\)/);
			e && (e = this.resourcePool.get(e[1])) && e instanceof HTMLImageElement && ((r = document.createElement("canvas")).width = n.width, r.height = n.height, i = r.getContext("2d")) && (o = "transparent" !== t.backgroundColor && "rgba(0, 0, 0, 0)" !== t.backgroundColor, i.fillStyle = o ? t.backgroundColor : t.color || "#000", i.fillRect(0, 0, n.width, n.height), i.globalCompositeOperation = "destination-in", i.drawImage(e, 0, 0, n.width, n.height), this.ctx.drawImage(r, n.left, n.top));
		}, k.prototype.drawPseudoElement = function(e, t) {
			var n = e.content, r = e.backgroundImage, i = e.opacity, o = e.fontSize, a = e.color, s = e.webkitMaskImage || e.maskImage, i = (this.ctx.save(), this.ctx.globalAlpha *= parseFloat(i), s && "none" !== s ? this.drawMaskImage(s, e, t) : r && "none" !== r && (i = r.match(/url\(["']?(.*?)["']?\)/)) && (s = this.resourcePool.get(i[1])) && s instanceof HTMLImageElement && (r = parseFloat(o) || 16, this.ctx.drawImage(s, t.left + (t.width - r) / 2, t.top + (t.height - r) / 2, r, r)), (n || "").replace(/^["']|["']$/g, ""));
			i && ![
				"none",
				"normal",
				"on",
				"off",
				"",
				" "
			].includes(i.toLowerCase()) && (this.ctx.font = e.fontStyle + " " + e.fontWeight + " " + e.fontSize + " " + e.fontFamily, this.ctx.fillStyle = a, this.ctx.textAlign = "center", this.ctx.textBaseline = "middle", this.ctx.fillText(i, t.left + t.width / 2, t.top + t.height / 2)), this.ctx.restore();
		}, k.prototype.drawInputText = function(e, t, n) {
			if (e instanceof HTMLInputElement) {
				var r = null == (r = e.type) ? void 0 : r.toLowerCase();
				if ("checkbox" === r || "radio" === r || "file" === r || "submit" === r || "button" === r || "reset" === r || "image" === r || "hidden" === r || "color" === r || "range" === r) return;
			}
			var r = e.value, i = r || e.placeholder;
			i && (this.ctx.save(), this.ctx.globalAlpha *= parseFloat(t.opacity), this.ctx.font = t.fontStyle + " " + t.fontWeight + " " + t.fontSize + " " + t.fontFamily, this.ctx.fillStyle = r ? t.color : "rgba(153, 153, 153, 0.7)", this.ctx.textBaseline = "middle", this.ctx.textAlign = "center" === t.textAlign ? "center" : "left", r = "center" === this.ctx.textAlign ? n.left + n.width / 2 : n.left + 10, t = n.top + (e instanceof HTMLTextAreaElement ? 18 : n.height / 2), this.ctx.fillText(i, r, t), this.ctx.restore());
		}, k.prototype.drawTextNode = function(e) {
			var t = e.parentElement;
			if (t) {
				var n = e.textContent;
				if (n && n.trim() && !(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement)) try {
					var r = document.createRange(), i = (r.selectNodeContents(e), r.getClientRects());
					if (0 !== i.length) {
						var o = getComputedStyle(t);
						if (this.ctx.save(), this.ctx.globalAlpha *= parseFloat(o.opacity), this.ctx.font = o.fontStyle + " " + o.fontWeight + " " + o.fontSize + " " + o.fontFamily, this.ctx.fillStyle = o.color, this.ctx.textBaseline = "top", this.ctx.textAlign = "left", 1 === i.length) this.ctx.fillText(n.trim(), i[0].left, i[0].top);
						else for (var a = n.replace(/\n\s*/g, " "), s = 0, l = 0; l < i.length; l++) {
							var c = i[l];
							if (!(c.width < 1)) {
								for (var u = s, d = a.length, f = ""; u <= d;) {
									var h = u + d >> 1, p = a.substring(s, h);
									this.ctx.measureText(p).width <= c.width + 2 ? (f = p, u = 1 + h) : d = h - 1;
								}
								if (f && (this.ctx.fillText(f, c.left, c.top), s += f.length), s >= a.length) break;
							}
						}
						this.ctx.restore();
					}
				} catch (e) {}
			}
		}, k.prototype.drawCanvas = function(e, t) {
			try {
				this.ctx.drawImage(e, t.left, t.top, t.width, t.height);
			} catch (e) {}
		}, k.prototype.preloadImage = function(i) {
			var e, o = this;
			return !i || this.resourcePool.has(i) ? (e = this.resourcePool.get(i)) instanceof Promise ? e : Promise.resolve(e || null) : (e = new Promise(function(t) {
				function e(e) {
					r || (r = !0, o.resourcePool.set(i, e), t(e));
				}
				var n = new Image(), r = !1;
				o.options.useCORS && !i.startsWith("data:") && (n.crossOrigin = "anonymous"), n.onload = function() {
					return e(n);
				}, n.onerror = function() {
					return e(null);
				}, n.src = i, setTimeout(function() {
					return e(null);
				}, 2e3);
			}), this.resourcePool.set(i, e), e);
		}, k.prototype.preloadSVG = function(e) {
			try {
				var t = new XMLSerializer().serializeToString(e), n = URL.createObjectURL(new Blob([t], { type: "image/svg+xml;charset=utf-8" }));
				return this.blobUrls.add(n), this.preloadImage(n), n;
			} catch (e) {
				return "";
			}
		}, k.prototype.cleanup = function() {
			this.blobUrls.forEach(function(e) {
				try {
					URL.revokeObjectURL(e);
				} catch (e) {}
			}), this.blobUrls.clear(), this.resourcePool.clear(), this.tasks = [];
		}, k.prototype.drawImageFromUrl = function(e, t) {
			e && (e = this.resourcePool.get(e)) && e instanceof HTMLImageElement && this.ctx.drawImage(e, t.left, t.top, t.width, t.height);
		}, k.prototype.checkAndPreload = function(e) {
			var t = e.backgroundImage;
			t && "none" !== t && (n = t.match(/url\(["']?(.*?)["']?\)/)) && this.preloadImage(n[1]);
			var n, t = e.webkitMaskImage || e.maskImage;
			t && "none" !== t && (n = t.match(/url\(["']?(.*?)["']?\)/)) && this.preloadImage(n[1]);
		}, k.prototype.roundRectPath = function(e, t, n, r, i) {
			this.ctx.beginPath(), this.ctx.moveTo(e + i, t), this.ctx.lineTo(e + n - i, t), this.ctx.quadraticCurveTo(e + n, t, e + n, t + i), this.ctx.lineTo(e + n, t + r - i), this.ctx.quadraticCurveTo(e + n, t + r, e + n - i, t + r), this.ctx.lineTo(e + i, t + r), this.ctx.quadraticCurveTo(e, t + r, e, t + r - i), this.ctx.lineTo(e, t + i), this.ctx.quadraticCurveTo(e, t, e + i, t), this.ctx.closePath();
		}, k), Xn = {
			THRESHOLDS: {
				TINY: 1e5,
				SMALL: 3e5,
				MEDIUM: 8e5,
				LARGE: 15e5,
				LLARGE: 25e5
			},
			LEVELS: [
				{
					maxArea: 1e5,
					scale: 1,
					defaultQuality: .7
				},
				{
					maxArea: 3e5,
					scale: 1,
					defaultQuality: .6
				},
				{
					maxArea: 8e5,
					scale: .7,
					defaultQuality: .6
				},
				{
					maxArea: 15e5,
					scale: .5,
					defaultQuality: .65
				},
				{
					maxArea: 25e5,
					scale: .45,
					defaultQuality: .65
				},
				{
					maxArea: 1 / 0,
					scale: .45,
					defaultQuality: .65
				}
			]
		};
		function k(e) {
			void 0 === e && (e = {}), this.tasks = [], this.nodeCounter = 0, this.resourcePool = /* @__PURE__ */ new Map(), this.blobUrls = /* @__PURE__ */ new Set(), this.vw = 0, this.vh = 0, this.totalScale = 1, this.maxDepthReached = 0, this.depthLimitHitCount = 0, this.options = {
				useCORS: null == (t = e.useCORS) || t,
				scale: null != (t = e.scale) ? t : 1,
				quality: null != (t = e.quality) ? t : .8,
				format: null != (t = e.format) ? t : "webp",
				viewportOnly: null == (t = e.viewportOnly) || t,
				maxWidth: null != (t = e.maxWidth) ? t : 1920,
				maxHeight: null != (t = e.maxHeight) ? t : 1080,
				debug: null != (t = e.debug) && t
			}, this.canvas = document.createElement("canvas");
			var t, e = this.canvas.getContext("2d", { alpha: !0 });
			if (!e) throw new Error("Failed to get 2D canvas context");
			this.ctx = e;
		}
		function $n(t) {
			return Xn.LEVELS.find(function(e) {
				return t <= e.maxArea;
			});
		}
		function Kn(e) {
			return {
				tagName: C(e.tagName || []),
				id: C(e.id || []),
				className: C(e.className || [])
			};
		}
		function Qn(e) {
			return Array.isArray(e) ? e.filter(function(e) {
				return "string" == typeof e;
			}).map(function(e) {
				return e.trim();
			}).filter(Boolean) : [];
		}
		function Yn(e, t, n, r, i) {
			var o, a, s = (e = e.map(function(e) {
				return nr(e);
			})).map(function(e) {
				return e.selector;
			});
			return (e = e[0]) ? (a = o = !1, a = or(r) ? (o = rr(e, r), rr(e, i)) : (o = ir(e, t), ir(e, n)), {
				isWhitePoint: o && !a,
				selectorPointers: s
			}) : {
				isWhitePoint: !1,
				selectorPointers: s
			};
		}
		function Zn(e) {
			try {
				var t, n, r, i, o, a, s = e.config.blankScreen;
				return !0 === s ? oe({}, zn) : (n = "containerMatchers" in (t = s) || "ignoreMatchers" in t, r = "containers" in t || "ignoreContainers" in t, i = ar(oe({}, zn), t), n ? (or(i.containerMatchers) || (i.containerMatchers = Kn(zn.containerMatchers)), "object" == typeof i.ignoreMatchers && null !== i.ignoreMatchers || (i.ignoreMatchers = Kn(zn.ignoreMatchers)), i.containers = [], i.ignoreContainers = []) : r && (o = Qn(i.containers), a = Qn(i.ignoreContainers), i.containers = o.length ? o : C(zn.containers), i.ignoreContainers = a, i.containerMatchers = {
					tagName: [],
					id: [],
					className: []
				}, i.ignoreMatchers = {
					tagName: [],
					id: [],
					className: []
				}), i);
			} catch (e) {
				return oe({}, zn);
			}
		}
		function er(n, r) {
			function i(e) {
				var t = e[0];
				return t && null !== t.shadowRoot && (t = (null == (t = null == t ? void 0 : t.shadowRoot) ? void 0 : t.elementsFromPoint(n, r)) || []).length > e.length ? i(t || []) : e;
			}
			return i(document.elementsFromPoint(n, r));
		}
		function tr(i, o, a, s) {
			return void 0 === o && (o = "image/webp"), void 0 === a && (a = 1920), void 0 === s && (s = 1080), ae(void 0, void 0, void 0, function() {
				var n, r;
				return se(this, function(e) {
					switch (e.label) {
						case 0: return e.trys.push([
							0,
							2,
							,
							3
						]), n = Math.min(window.innerWidth, a), r = Math.min(window.innerHeight, s), n = $n(n * r), r = n.scale, n = n.defaultQuality, [4, new Jn(t = void 0 === (t = {
							scale: r,
							quality: null != i ? i : n,
							format: {
								"image/webp": "webp",
								"image/jpeg": "jpeg",
								"image/png": "png"
							}[o] || "webp",
							maxWidth: a,
							maxHeight: s,
							useCORS: !0,
							viewportOnly: !0,
							debug: !1
						}) ? {} : t).capture()];
						case 1: return [2, e.sent()];
						case 2: return [2, (r = e.sent()) instanceof Error ? r : new Error(String(r))];
						case 3: return [2];
					}
					var t;
				});
			});
		}
		var nr = function(e) {
			var t = e.nodeName.toLowerCase(), n = e.id || "", e = "string" == typeof (e = e).className ? e.className : e.getAttribute("class") || "", r = t;
			return n && (r += "#" + n), e && (r += e.split(" ").filter(function(e) {
				return !!e;
			}).map(function(e) {
				return "." + e;
			}).join("")), {
				tagName: t,
				id: n,
				className: e,
				selector: r
			};
		}, rr = function(t, e) {
			var n;
			if (null != (n = null == e ? void 0 : e.tagName) && n.length) {
				var r = t.tagName.toLowerCase();
				if (e.tagName.some(function(e) {
					return r === e.toLowerCase().trim();
				})) return !0;
			}
			if (null != (n = null == e ? void 0 : e.id) && n.length && t.id && e.id.some(function(e) {
				return t.id === e.trim();
			})) return !0;
			if (null != (n = null == e ? void 0 : e.className) && n.length && t.className) {
				var i = t.className.split(" ").map(function(e) {
					return e.trim();
				}).filter(Boolean);
				if (e.className.some(function(e) {
					e = e.trim();
					return !!e && i.includes(e);
				})) return !0;
			}
			return !1;
		}, ir = function(t, e) {
			return !(null == e || !e.length) && e.some(function(e) {
				return t.selector.includes(e);
			});
		}, or = function(e) {
			var t;
			return !(!e || !(null != (t = e.tagName) && t.length || null != (t = e.id) && t.length || null != (t = e.className) && t.length));
		}, ar = function(e) {
			for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
			if (!t.length) return e;
			var r = t.shift();
			if (r) for (var i in r) {
				var o = r[i];
				Array.isArray(o) ? e[i] = C(o) : "object" == typeof o && null !== o && Object.prototype.hasOwnProperty.call(e, i) && "object" == typeof e[i] && null !== e[i] && !Array.isArray(e[i]) ? ar(e[i], o) : e[i] = o;
			}
			return ar.apply(void 0, C([e], t));
		}, sr = new r({
			name: "blankScreen",
			captureScreenshotWithStrategy: function() {
				return ae(this, void 0, void 0, function() {
					var i, o, a, s, l, c;
					return se(this, function(e) {
						switch (e.label) {
							case 0: return e.trys.push([
								0,
								3,
								,
								4
							]), i = window.innerWidth, i = i * window.innerHeight, o = Date.now(), [4, tr()];
							case 1: return c = e.sent(), l = Date.now() - o, "object" == typeof c && null !== c ? [2, {
								error: "capture_failed",
								details: {
									firstCaptureTime: l,
									errorMessage: null == c ? void 0 : c.message
								}
							}] : c ? !(s = (null == (a = c) ? void 0 : a.length) / 1024) || s <= 0 || !isFinite(s) ? [2, {
								error: "invalid_size",
								details: {
									reason: "screenshot_size_invalid",
									size: s
								}
							}] : 90 < s ? [2, {
								error: "complex_page",
								details: {
									firstSize: Math.round(s),
									threshold: 90
								}
							}] : s <= 30 ? [2, a] : (l = 26 / s) < .5 ? [2, {
								error: "over_compression",
								details: {
									firstSize: Math.round(s),
									requiredRatio: Math.round(100 * l),
									minRatio: Math.round(50)
								}
							}] : (n = l, r = $n(t = i).defaultQuality, t = t <= Xn.THRESHOLDS.SMALL ? .25 : .3, c = Math.max(t, r * n), [4, tr(c)]) : [2, {
								error: "capture_failed",
								details: { reason: "empty_result" }
							}];
							case 2: return "object" == typeof (l = e.sent()) && null !== l ? [2, {
								error: "retry_capture_failed",
								details: {
									firstSize: Math.round(s),
									errorMessage: null == l ? void 0 : l.message
								}
							}] : (a = l) ? a && (null == a ? void 0 : a.length) <= 30720 ? [2, a] : [2, {
								error: "retry_failed",
								details: {
									firstSize: Math.round(s),
									finalSize: a ? Math.round((null == a ? void 0 : a.length) / 1024) : 0,
									maxSize: 30
								}
							}] : [2, {
								error: "retry_capture_failed",
								details: { reason: "empty_result" }
							}];
							case 3: return [2, {
								error: "exception",
								details: {
									message: (c = e.sent()) instanceof Error ? c.message : String(c),
									stack: c instanceof Error ? c.stack : void 0
								}
							}];
							case 4: return [2];
						}
						var t, n, r;
					});
				});
			},
			isDestroyed: !1,
			isAwaitingClientScreenshot: !1,
			pendingTimeouts: [],
			notifyClientScreenshot: function(e, t, n, r) {
				var i = this;
				if (!this.isDestroyed) {
					var o = !(this.isAwaitingClientScreenshot = !0), a = t.timestamp + "_" + Math.random().toString(36).slice(2, 10), t = oe(oe({}, t), { requestId: a }), s = setTimeout(function() {
						i.pendingTimeouts = i.pendingTimeouts.filter(function(e) {
							return e !== s;
						}), i.isDestroyed ? i.isAwaitingClientScreenshot = !1 : o || (o = !0, i.isAwaitingClientScreenshot = !1, r(null, {
							success: !1,
							source: "client",
							reason: "timeout",
							timeout: n,
							requestId: a
						}));
					}, n);
					this.pendingTimeouts.push(s);
					try {
						e(t, function(e) {
							i.isDestroyed ? (i.isAwaitingClientScreenshot = !1, clearTimeout(s)) : o || (o = !0, i.isAwaitingClientScreenshot = !1, clearTimeout(s), i.pendingTimeouts = i.pendingTimeouts.filter(function(e) {
								return e !== s;
							}), e && "string" == typeof e ? r(e, {
								success: !0,
								source: "client",
								requestId: a
							}) : r(null, {
								success: !1,
								source: "client",
								reason: "client_returned_null",
								requestId: a
							}));
						});
					} catch (e) {
						o || this.isDestroyed || (o = !0, this.isAwaitingClientScreenshot = !1, clearTimeout(s), this.pendingTimeouts = this.pendingTimeouts.filter(function(e) {
							return e !== s;
						}), r(null, {
							success: !1,
							source: "client",
							reason: "callback_error",
							error: e instanceof Error ? e.message : String(e),
							requestId: a
						}));
					}
				}
			},
			onNewAegis: function(H) {
				var U, D, e, q, t, j, W, B, z, G, n, V, J, X, $, re, K, ie, Q, Y, Z, r, ee, te, i, o, ne, a, g, s, v, l, c, u, y, d, f, h, p, m = this;
				document.elementFromPoint && (this.pendingTimeouts.forEach(function(e) {
					clearTimeout(e);
				}), this.pendingTimeouts = [], this.isDestroyed = !1, this.isAwaitingClientScreenshot = !1, e = Zn(H), q = e.everySideSampleNumber, t = e.sameElementsPercent, j = e.containers, W = e.ignoreContainers, B = e.containerMatchers, z = e.ignoreMatchers, G = e.detectStartPosition, n = e.ignoreElesWhenDomChange, V = e.reDetectInterval, J = e.disableSameElementsCheck, X = e.samePointDepth, $ = e.enableScreenshot, re = e.needScreenShotMeta, K = e.onBlankScreenCapture, ie = e.clientScreenshotTimeout, Q = 4 * q - 3, Y = Math.floor(Q * e.emptyElementsPercent / 100), Z = Math.floor(Q * t / 100), r = Bn.UNKNOWN, te = null, i = ee = !1, o = function() {
					return ae(m, void 0, void 0, function() {
						var i, o, a, s, l, c, u, d, f, h, p, m, g, v, y, w, b, E, S, R, T, O, x, P, L, C, k, I, A, M, N, _, F = this;
						return se(this, function(e) {
							switch (e.label) {
								case 0:
									if (i = window.innerHeight, o = window.innerWidth, a = G.x, s = G.y, o <= a || i <= s) return [2];
									for (l = a + (o - a) / 2, c = s + (i - s) / 2, u = [], d = q + 1, h = f = 0, p = 1; p < d; p++) v = s + (i - s) * p / d, w = er(m = a + (o - a) * p / d, c), g = er(l, v), y = er(m, v), m = er(m, i - v), v = Yn(w, j, W, B, z), v.isWhitePoint && (f += 1), u.push(v.selectorPointers), p !== d / 2 && (w = Yn(g, j, W, B, z), v = w.isWhitePoint, g = w.selectorPointers, v && (f += 1), w = Yn(y, j, W, B, z), v = w.isWhitePoint, y = w.selectorPointers, v && (f += 1), w = Yn(m, j, W, B, z), w.isWhitePoint && (f += 1), u.push(g, y, w.selectorPointers));
									return k = Y <= f, I = !1, b = {
										samePointerMap: {},
										maximumSamePointer: {}
									}, J || (S = u.map(function(e) {
										return e.slice(0, X);
									}), t = S.map(function(e) {
										return e.join(" < ");
									}).reduce(function(e, t) {
										return e[t] = e[t] ? e[t] + 1 : 1, e;
									}, {}), n = Object.keys(t).map(function(e) {
										return [e, t[e]];
									}).sort(function(e, t) {
										return t[1] - e[1];
									})[0], r = n[0], S = {
										samePointerMap: t,
										maximumSamePointerClass: r,
										maximumSamePointerCounter: n[1]
									}, b = {
										samePointerMap: S.samePointerMap,
										maximumSamePointer: ((_ = {})[E = S.maximumSamePointerClass] = S = S.maximumSamePointerCounter, _)
									}, h = S, _ = Gn.some(function(e) {
										return E.startsWith(e);
									}), I = Z <= S && !_), k || I ? [3, 1] : (ee = !1, te = null, [3, 8]);
								case 1: return ee ? (S = (null == te ? void 0 : te.whitePointCount) >= Y, _ = (null == te ? void 0 : te.samePointCount) >= Z, R = S && _ ? "both" : S ? "whitePoint" : "sameElement", T = U ? "error" : "domChange", O = window.innerWidth, x = window.innerHeight, P = Math.round((null == te ? void 0 : te.samePointCount) / Q * 100), L = {
									whitePointCount: null == te ? void 0 : te.whitePointCount,
									samePointCount: null == te ? void 0 : te.samePointCount,
									maximumSamePointer: null == te ? void 0 : te.maximumSamePointer,
									linkMsg: null == te ? void 0 : te.linkMsg
								}, C = function(e, t) {
									t = {
										msg: "decect blankscreen triggerReason: " + R + " triggerType: " + T + "\n\nwhitePointCount: " + L.whitePointCount + " whitePointerThreshold: " + Y + (J ? "" : "\n\nsameElementsCount: " + L.samePointCount + " samePointerThreshold: " + Z + " sameElementPercent: " + P + "%") + "\n\nviewport: " + O + "x" + x + " totalSamplePoints: " + Q + (J ? "" : "\n\nmaxSameElement: " + ce(L.maximumSamePointer)) + (re && $ && t ? "\n\nscreenShotMeta: " + JSON.stringify(t) : "") + (L.linkMsg ? "\n\nlinkError: " + L.linkMsg : ""),
										level: le.BLANK_SCREEN,
										errorMsg: e || null,
										originFrom: H.getOriginFrom()
									};
									H.normalLogPipeline(t);
								}, $ ? K ? (k = $n(O * x), I = {
									triggerReason: R,
									triggerType: T,
									whitePointCount: L.whitePointCount || 0,
									samePointCount: L.samePointCount || 0,
									viewportWidth: O,
									viewportHeight: x,
									url: window.location.href,
									timestamp: Date.now(),
									recommendedScale: k.scale,
									recommendedQuality: k.defaultQuality,
									maxSizeKB: 30
								}, this.notifyClientScreenshot(K, I, ie, function(e, t) {
									if (e && "string" == typeof e) {
										var n = e.length / 1024;
										if (30 < n) return void C(null, oe(oe({}, t), {
											success: !1,
											reason: "size_exceeded",
											size: Math.round(n),
											maxSize: 30
										}));
									}
									C(e, t);
								}), [3, 4]) : [3, 2] : [3, 5]) : [3, 7];
								case 2: return [4, this.captureScreenshotWithStrategy()];
								case 3: A = e.sent(), N = M = null, N = "string" == typeof A ? (M = A, {
									success: !0,
									source: "sdk"
								}) : (M = null, {
									success: !1,
									source: "sdk",
									error: A.error,
									details: A.details
								}), C(M, N), e.label = 4;
								case 4: return [3, 6];
								case 5: C(null, null), e.label = 6;
								case 6: return ee = !1, te = null, [3, 8];
								case 7: te = oe(oe({
									msg: "blank_screen",
									level: le.BLANK_SCREEN,
									whitePointCount: f,
									samePointCount: h
								}, b), U ? {
									linkLogType: null == U ? void 0 : U.type,
									linkLogLevel: null == U ? void 0 : U.level,
									linkErrorMsg: null == U ? void 0 : U.errorMsg,
									linkMsg: null == U ? void 0 : U.msg
								} : {}), ee = !0, D = setTimeout(function() {
									return ae(F, void 0, void 0, function() {
										return se(this, function(e) {
											switch (e.label) {
												case 0: return [4, ne()];
												case 1: return e.sent(), [2];
											}
										});
									});
								}, V), e.label = 8;
								case 8: return [2];
							}
							var t, n, r;
						});
					});
				}, ne = function() {
					return ae(m, void 0, void 0, function() {
						var n = this;
						return se(this, function(e) {
							switch (e.label) {
								case 0: return "requestIdleCallback" in window ? (window.requestIdleCallback(function(t) {
									return ae(n, void 0, void 0, function() {
										return se(this, function(e) {
											switch (e.label) {
												case 0: return 0 < t.timeRemaining() ? [4, o()] : [3, 2];
												case 1: e.sent(), e.label = 2;
												case 2: return [2];
											}
										});
									});
								}), [3, 3]) : [3, 1];
								case 1: return [4, o()];
								case 2: e.sent(), e.label = 3;
								case 3: return [2];
							}
						});
					});
				}, a = function() {
					var e;
					ee || m.isAwaitingClientScreenshot || r === Bn.ERROR && !U || (r = U ? Bn.ERROR : Bn.DOM_CHANGE, clearTimeout(D), e = Zn(H).debounceDuration, D = setTimeout(function() {
						return ae(m, void 0, void 0, function() {
							return se(this, function(e) {
								switch (e.label) {
									case 0: return clearTimeout(D), [4, ne()];
									case 1: return e.sent(), [2];
								}
							});
						});
					}, e));
				}, H.lifeCycle.on("errorOccurred", g = function(e) {
					e = e.filter(function(e) {
						return e.level !== le.BLANK_SCREEN;
					});
					0 < e.length && (U = e[e.length - 1], a());
				}), s = null, window.MutationObserver && (d = f = null, v = window.cancelAnimationFrame || function(e) {
					clearTimeout(e);
				}, l = window.requestAnimationFrame || function(e) {
					return setTimeout(e, 1e3 / 60);
				}, c = function() {
					(s = new MutationObserver(function(e) {
						var t = nr(e[0].target), t = n.includes(t.selector);
						1 === e.length && t || a();
					})).observe(document.body, {
						childList: !0,
						subtree: !0
					});
				}, u = function() {
					f && (clearTimeout(f), f = null), d && (v(d), d = null);
				}, document.body ? c() : (d = l(y = function() {
					document.body ? (u(), c()) : d = l(y);
				}), f = setTimeout(function() {
					u();
				}, 1e4))), h = function() {
					i && (i = !0, ee) && (clearTimeout(D), o());
				}, p = function() {
					"visible" === document.visibilityState && (i = !1), "hidden" === document.visibilityState && h();
				}, window.addEventListener("pagehide", h), window.addEventListener("beforeunload", h), window.addEventListener("visibilitychange", p), this.destroyBlanckScreenDetect = function() {
					window.removeEventListener("pagehide", h), window.removeEventListener("beforeunload", h), window.removeEventListener("visibilitychange", p), H.lifeCycle.remove("errorOccurred", g), s?.disconnect();
				});
			},
			destroy: function() {
				this.isDestroyed = !0, this.isAwaitingClientScreenshot = !1, this.pendingTimeouts.forEach(function(e) {
					clearTimeout(e);
				}), this.pendingTimeouts = [], this.destroyBlanckScreenDetect();
			}
		}), lr = (new r({ name: "lagMonitor" }), new r({
			name: "lagMonitor",
			observer: null,
			lagRecords: [],
			onNewAegis: function(e) {
				var t, n = this.$getConfig(e);
				n && n.enabled && "undefined" != typeof PerformanceObserver && PerformanceObserver.supportedEntryTypes && PerformanceObserver.supportedEntryTypes.includes("long-animation-frame") && (t = n.sampleRate || 1, Math.random() < t) && this.initLagMonitor(e, n);
			},
			initLagMonitor: function(n, e) {
				var r = this, i = e.threshold || 2e3, o = e.noResponseThreshold || 5e3;
				try {
					this.observer = new PerformanceObserver(function(e) {
						e.getEntries().forEach(function(e) {
							var t;
							e.duration > i && (t = e.scripts && 0 < e.scripts.length ? e.scripts[0] : null, e = {
								name: e.name,
								timestamp: Date.now(),
								entryType: e.entryType,
								startTime: e.startTime,
								duration: e.duration,
								invoker: null == t ? void 0 : t.invoker,
								sourceURL: null == t ? void 0 : t.sourceURL
							}, r.lagRecords.push(e), 100 < r.lagRecords.length && r.lagRecords.shift(), r.publishLagLog(e, n, o <= e.duration));
						});
					}), this.observer.observe({
						type: "long-animation-frame",
						buffered: !1
					}), "undefined" != typeof window && (window.__longTasks = this.lagRecords);
				} catch (n) {
					if ("undefined" != typeof console && console.warn && console.warn("Lag monitor initialization failed:", n), this.observer) {
						try {
							this.observer.disconnect();
						} catch (n) {}
						this.observer = null;
					}
				}
			},
			publishLagLog: function(n, r, i) {
				void 0 === i && (i = !1);
				try {
					this.$walk(function(e) {
						if (e === r) {
							var t = {
								msg: JSON.stringify({
									type: i ? "NORESPONSE_DETECTED" : "LAG_DETECTED",
									duration: Math.round(100 * n.duration) / 100,
									startTime: Math.round(100 * n.startTime) / 100,
									entryType: n.entryType,
									sourceURL: n.sourceURL || "unknown",
									invoker: n.invoker || "unknown",
									timestamp: n.timestamp
								}),
								level: i ? le.NORESPONSE_LOG : le.LAG_MONITOR,
								time: n.timestamp,
								originFrom: e.getOriginFrom()
							};
							try {
								e.normalLogPipeline(t);
							} catch (e) {
								"undefined" != typeof console && console.warn && console.warn("Lag log pipeline failed:", e);
							}
						}
					});
				} catch (n) {
					"undefined" != typeof console && console.warn && console.warn("Lag log publish failed:", n);
				}
			},
			getLagRecords: function() {
				return C(this.lagRecords);
			},
			clearLagRecords: function() {
				this.lagRecords.length = 0, "undefined" != typeof window && (window.__longTasks = []);
			},
			destroy: function() {
				if (this.observer) {
					try {
						this.observer.disconnect();
					} catch (e) {
						"undefined" != typeof console && console.warn && console.warn("Observer disconnect failed:", e);
					}
					this.observer = null;
				}
				this.clearLagRecords();
			}
		}));
		function cr() {
			try {
				return "undefined" != typeof window && window.performance && window.performance.memory && "number" == typeof window.performance.memory.usedJSHeapSize;
			} catch (e) {}
		}
		function ur() {
			try {
				var e, t, n;
				return cr() ? (t = (e = window.performance.memory).usedJSHeapSize || 0, n = e.jsHeapSizeLimit || 0, {
					usedJSHeapSize: t,
					totalJSHeapSize: e.totalJSHeapSize || 0,
					jsHeapSizeLimit: n,
					usageRatio: 0 < n ? Math.round(t / n * 1e4) / 100 : 0,
					timestamp: Date.now()
				}) : null;
			} catch (e) {
				return null;
			}
		}
		function dr(e) {
			return Math.round(e / 1048576 * 100) / 100;
		}
		new r({ name: "memoryMonitor" });
		r = new r({
			name: "memoryMonitor",
			memoryReportTimer: null,
			oomCheckTimer: null,
			lastOOMTime: 0,
			memoryRecords: [],
			onNewAegis: function(e) {
				var t, n, r = this.$getConfig(e);
				r && r.enabled && cr() && (t = r.sampleRate || 1, Math.random() < t) && (!(t = r.monitorPages) || 0 === t.length || (n = "undefined" != typeof window ? window.location.href : "", t.some(function(e) {
					return "string" == typeof e ? n.includes(e) : e instanceof RegExp && e.test(n);
				}))) && this.initMemoryMonitor(e, r);
			},
			initMemoryMonitor: function(e, t) {
				var n, r = this, i = !1 !== t.enableMemoryReport, o = !1 !== t.enableOOMReport, a = t.memoryReportInterval || 6e4, s = t.oomCheckInterval || 1e4, l = t.oomThreshold || (() => {
					try {
						var e, t;
						return cr() ? 0 < (e = window.performance.memory.jsHeapSizeLimit || 0) ? (t = dr(e), Math.round(.9 * t)) : 100 : 100;
					} catch (e) {
						return 100;
					}
				})();
				try {
					i && (this.memoryReportTimer = setInterval(function() {
						r.reportCurrentMemory(e, "MEMORY_REPORT");
					}, a)), o && (this.oomCheckTimer = setInterval(function() {
						r.checkOOMCondition(e, l);
					}, s)), "undefined" != typeof window && (window.addEventListener("beforeunload", n = function() {
						r.cleanup();
					}), window.addEventListener("pagehide", n));
				} catch (e) {
					"undefined" != typeof console && console.warn && console.warn("Memory monitor initialization failed:", e), this.cleanup();
				}
			},
			reportCurrentMemory: function(e, t) {
				try {
					var n, r = ur();
					r && (n = {
						type: t,
						memoryInfo: r,
						url: "undefined" != typeof window ? window.location.href : "",
						userAgent: "undefined" != typeof navigator ? navigator.userAgent : "",
						timestamp: Date.now()
					}, this.memoryRecords.push(n), 50 < this.memoryRecords.length && this.memoryRecords.shift(), this.publishMemoryLog(n, e));
				} catch (e) {
					"undefined" != typeof console && console.warn && console.warn("Memory report failed:", e);
				}
			},
			checkOOMCondition: function(e, t) {
				try {
					var n, r, i = ur();
					i && (n = dr(i.usedJSHeapSize), r = Date.now(), t < n) && 3e5 < r - this.lastOOMTime && (this.lastOOMTime = r, this.reportCurrentMemory(e, "MEMORY_OOM"));
				} catch (e) {
					"undefined" != typeof console && console.warn && console.warn("OOM check failed:", e);
				}
			},
			publishMemoryLog: function(e, t) {
				try {
					"MEMORY_REPORT" === e.type ? this.publishMemoryReport(e, t) : "MEMORY_OOM" === e.type && this.publishOOMLog(e, t);
				} catch (e) {
					"undefined" != typeof console && console.warn && console.warn("Memory log publish failed:", e);
				}
			},
			publishMemoryReport: function(e, t) {
				try {
					var n = {
						memoryUsed: e.memoryInfo.usedJSHeapSize,
						memoryAllocated: e.memoryInfo.totalJSHeapSize,
						memoryUsage: e.memoryInfo.usageRatio
					};
					this.$walk(function(i) {
						var e;
						if (i === t) try {
							null != (e = i.sendPipeline) && e.call(i, [function(n, e) {
								var t = i.config.memoryUrl || i.config.hostUrl + "/memory", r = new URLSearchParams();
								Object.keys(n).forEach(function(e) {
									var t = n[e];
									null != t && "" !== t && r.append(e, String(t));
								}), e({
									url: t + "?" + r.toString(),
									method: "post",
									type: m.MEMORY,
									log: n,
									success: function() {
										"undefined" != typeof console && console.debug && console.debug("Memory report success:", n.memory_used, "bytes");
									},
									fail: function(e) {
										"undefined" != typeof console && console.warn && console.warn("Memory report failed:", e);
									}
								});
							}], m.MEMORY)(n);
						} catch (i) {
							"undefined" != typeof console && console.warn && console.warn("Memory pipeline failed:", i);
						}
					});
				} catch (e) {
					"undefined" != typeof console && console.warn && console.warn("Memory report publish failed:", e);
				}
			},
			publishOOMLog: function(e, n) {
				try {
					var t = e.memoryInfo, r = "Memory OOM detected: Used " + dr(t.usedJSHeapSize) + "MB / Total " + dr(t.totalJSHeapSize) + "MB / Limit " + dr(t.jsHeapSizeLimit) + "MB (" + t.usageRatio + "%)", i = {
						msg: r,
						level: le.MEMORY_OOM,
						time: e.timestamp,
						originFrom: n.getOriginFrom()
					};
					this.$walk(function(e) {
						var t;
						if (e === n) try {
							null != (t = e.normalLogPipeline) && t.call(e, i), "undefined" != typeof console && console.warn && console.warn("OOM detected and reported:", r);
						} catch (e) {
							"undefined" != typeof console && console.warn && console.warn("OOM pipeline failed:", e);
						}
					});
				} catch (e) {
					"undefined" != typeof console && console.warn && console.warn("OOM log publish failed:", e);
				}
			},
			getMemoryRecords: function() {
				return C(this.memoryRecords);
			},
			getCurrentMemoryStatus: ur,
			clearMemoryRecords: function() {
				this.memoryRecords.length = 0;
			},
			cleanup: function() {
				this.memoryReportTimer && (clearInterval(this.memoryReportTimer), this.memoryReportTimer = null), this.oomCheckTimer && (clearInterval(this.oomCheckTimer), this.oomCheckTimer = null);
			},
			destroy: function() {
				this.cleanup(), this.clearMemoryRecords(), this.lastOOMTime = 0;
			}
		});
		return n.use(jt), n.use(ht), n.use(Xe), n.use(kn), n.use(Pn), n.use(Ve), n.use(b), n.use(An), n.use(Wn), n.use(Vt), n.use(Xt), n.use(lr), n.use(r), n.use(mt), n.use(sr), n;
	});
}));

// src/client/constants.ts
var import_aegis_min = /* @__PURE__ */ __toESM(require_aegis_min(), 1);
/**
* Plugin identity, storage keys, limits and platform helpers.
*
* Everything whose value is part of the on-disk contract lives here; the
* storage modules and the panel import it instead of repeating literals.
*/
/** Locale namespace of this plugin's copy (also binds the renderer's `t` prop). */
const NS = "dsh-aside-note";
/** Sidebar launcher id and the main panel key it addresses. */
const PANEL_ID = "dsh-aside-note";
/** Session-scoped memo store used by the popover and the session-header entry. */
const SESSION_STORAGE_KEY = "dsh.aside-note";
/** Notes shared by every session of one workspace; kept beside the session key. */
const WORKSPACE_STORAGE_KEY = "dsh.aside-note.workspaces";
/** Unsaved add/edit drafts, restored when the panel is reopened. */
const DRAFT_STORAGE_KEY = "dsh.aside-note.drafts";
/** Notes already forwarded to the composer, per session; marks the forward button. */
const FORWARDED_STORAGE_KEY = "dsh.aside-note.forwarded";
/** Anonymous RUM visitor id; fills the SDK's `uin` so UV survives reloads. */
const ANONYMOUS_UIN_KEY = "dsh.aside-note.uin";
/** Opt-out switch for anonymous usage events; stored as "off" when disabled. */
const ANALYTICS_ENABLED_KEY = "dsh.aside-note.analytics";
/** Whether this browser has opened the panel before; reported once as `first`. */
const PANEL_OPENED_KEY = "dsh.aside-note.panel-opened";
/** Shown in the in-panel settings; keep in sync with package.json. */
const PLUGIN_VERSION = "1.1.2-beta.5";
const PLUGIN_AUTHOR = "阿三石";
const PLUGIN_REPO_URL = "https://github.com/Rayle8/dsh-aside-note";
const PLUGIN_REPO_LABEL = "github.com/Rayle8/dsh-aside-note";
/** Send preference; persisted across panel openings. Enter sends by default. */
const SEND_SHORTCUT_KEY = "dsh.aside-note.send-shortcut";
/** Lead-in written before a forwarded note; empty means no prefix. */
const FORWARD_PREFIX_STORAGE_KEY = "dsh.aside-note.forward-prefix";
const SEND_SHORTCUT_DEFAULT = "enter";
/** macOS names the command modifier with a symbol; other platforms say Ctrl. */
const IS_MAC = (() => {
	try {
		const platform = navigator.userAgentData && navigator.userAgentData.platform || navigator.platform || "";
		return /mac/i.test(String(platform));
	} catch {
		return false;
	}
})();
const MOD_LABEL = IS_MAC ? "⌘" : "Ctrl";
/** Whether the key event carries this platform's command modifier. */
function isSendModifier(event) {
	return IS_MAC ? event.metaKey === true : event.ctrlKey === true;
}
/** Last chosen list scope: the workspace list or the session list. */
const SCOPE_MODE_KEY = "dsh.aside-note.scope-mode";
const SCOPE_MODE_DEFAULT = "workspace";
/** Remembered expand/collapse state of the open/completed sections. */
const SECTION_STATE_KEY = "dsh.aside-note.sections";
const SECTION_STATE_DEFAULT = {
	open: true,
	done: false
};
/** How long the inline clear-completed confirmation waits before it dismisses itself. */
const CLEAR_CONFIRM_MS = 5e3;
/** Persisted width of the experimental right-side panel. */
const PANEL_WIDTH_KEY = "dsh.aside-note.panel-width";
/** Persisted height of the experimental right-side panel; 0 means content-sized. */
const PANEL_HEIGHT_KEY = "dsh.aside-note.panel-height";

// src/client/storage/codec.ts
/** The browser store, or null when storage is blocked. */
/** The browser store, or null when storage is blocked. */
function storage() {
	try {
		return window.localStorage;
	} catch {
		return null;
	}
}

// src/client/storage/prefs.ts
/** Panel geometry, list scope, send shortcut, forward prefix and section state. */
/** Read the persisted right-panel width, clamped for the current viewport. */
function readPanelWidth() {
	const ls = storage();
	const max = Math.min(720, Math.max(280, window.innerWidth - 32));
	try {
		const saved = ls && Number(ls.getItem("dsh.aside-note.panel-width"));
		if (Number.isFinite(saved) && saved > 0) return Math.max(280, Math.min(max, saved));
	} catch {}
	return Math.max(280, Math.min(max, 360));
}
/** Persist the right-panel width so it survives reopening the popover. */
function writePanelWidth(width) {
	const ls = storage();
	if (!ls) return;
	try {
		ls.setItem(PANEL_WIDTH_KEY, String(Math.round(width)));
	} catch {}
}
/** Read the persisted right-panel height; 0 means content-sized. */
function readPanelHeight() {
	const ls = storage();
	try {
		const saved = ls && Number(ls.getItem("dsh.aside-note.panel-height"));
		if (Number.isFinite(saved) && saved > 0) return saved;
	} catch {}
	return 0;
}
/** Persist the right-panel height; 0 restores content sizing. */
function writePanelHeight(height) {
	const ls = storage();
	if (!ls) return;
	try {
		if (height > 0) ls.setItem(PANEL_HEIGHT_KEY, String(Math.round(height)));
		else ls.removeItem(PANEL_HEIGHT_KEY);
	} catch {}
}
/** Read the last chosen list scope; "workspace" is the default. */
function readScopeMode() {
	try {
		return (storage() && storage().getItem("dsh.aside-note.scope-mode")) === "session" ? "session" : SCOPE_MODE_DEFAULT;
	} catch {
		return SCOPE_MODE_DEFAULT;
	}
}
function writeScopeMode(mode) {
	try {
		const ls = storage();
		if (ls) ls.setItem(SCOPE_MODE_KEY, mode === "session" ? "session" : "workspace");
	} catch {}
}
/** Read the Enter-to-send preference. */
function readSendShortcut() {
	try {
		const saved = storage() && storage().getItem("dsh.aside-note.send-shortcut");
		return saved === "enter" || saved === "ctrl-enter" ? saved : SEND_SHORTCUT_DEFAULT;
	} catch {
		return SEND_SHORTCUT_DEFAULT;
	}
}
function writeSendShortcut(value) {
	try {
		const ls = storage();
		if (ls) ls.setItem(SEND_SHORTCUT_KEY, value === "enter" ? "enter" : "ctrl-enter");
	} catch {}
}
/** Read the user's forward lead-in; an empty string means no prefix. */
function readForwardPrefix() {
	try {
		const raw = storage() && storage().getItem("dsh.aside-note.forward-prefix");
		return typeof raw === "string" ? raw.slice(0, 80) : "";
	} catch {
		return "";
	}
}
function writeForwardPrefix(value) {
	try {
		const ls = storage();
		if (ls) ls.setItem(FORWARD_PREFIX_STORAGE_KEY, String(value || "").slice(0, 80));
	} catch {}
}
/** Remembered section state; corrupt or missing storage falls back to defaults. */
function readSectionState() {
	const fallback = {
		open: SECTION_STATE_DEFAULT.open,
		done: SECTION_STATE_DEFAULT.done
	};
	const ls = storage();
	if (!ls) return fallback;
	try {
		const raw = ls.getItem(SECTION_STATE_KEY);
		if (!raw) return fallback;
		const saved = JSON.parse(raw);
		if (!saved || typeof saved !== "object") return fallback;
		return {
			open: typeof saved.open === "boolean" ? saved.open : fallback.open,
			done: typeof saved.done === "boolean" ? saved.done : fallback.done
		};
	} catch {
		return fallback;
	}
}
/** Persist the section state immediately; storage failures are ignored. */
function writeSectionState(state) {
	const ls = storage();
	if (!ls) return;
	try {
		ls.setItem(SECTION_STATE_KEY, JSON.stringify({
			open: state.open === true,
			done: state.done === true
		}));
	} catch {}
}
/** Whether this browser has ever opened the panel; the first open is reported once. */
function hasOpenedPanel() {
	const ls = storage();
	try {
		return Boolean(ls && ls.getItem("dsh.aside-note.panel-opened"));
	} catch {
		return false;
	}
}
/** Record the first panel open; the caller decides what to report. */
function markPanelOpened() {
	const ls = storage();
	if (!ls) return;
	try {
		ls.setItem(PANEL_OPENED_KEY, "1");
	} catch {}
}
/** Anonymous usage events are opt-out: an explicit "off" disables them. */
function readAnalyticsEnabled() {
	try {
		return storage()?.getItem(ANALYTICS_ENABLED_KEY) !== "off";
	} catch {
		return true;
	}
}
/** Persist the analytics choice; "on" drops the key so the default stays on. */
function writeAnalyticsEnabled(enabled) {
	const ls = storage();
	if (!ls) return;
	try {
		if (enabled) ls.removeItem(ANALYTICS_ENABLED_KEY);
		else ls.setItem(ANALYTICS_ENABLED_KEY, "off");
	} catch {}
}

// src/client/rum.ts
/**
* Anonymous product analytics for the panel, reported to Tencent Cloud RUM.
*
* The appId is a browser-side project id, not a secret: it names the RUM
* project in every report. It is compiled in rather than read from a build-time
* env file, because `client/client.js` is a committed artifact and a local env
* file made CI rebuild a different byte stream than the one under review.
*
* The panel lives inside the shell's window, so the SDK's automatic collectors
* would measure the shell rather than the panel: page performance, web vitals,
* global JS errors, API and asset speed are all off. Only `reportEvent` calls
* from the UI modules are sent, and they carry the scope kind and a count —
* never note text, session ids or prompt content.
*
* Reporting is opt-out: the switch in Settings calls `setAnalyticsEnabled`.
* While it is off no SDK instance is created, so not even the SDK's page-view
* request leaves the browser; the switch itself sends one last event before
* the gate closes.
*/
/** RUM application id, shown in the console; safe to ship in a browser bundle. */
const APP_ID = "EPoknFrdnK4Z16YRlz";
/** The SDK only accepts this shape for `uin`. */
const UIN_PATTERN = /^[@=.0-9a-zA-Z_-]{1,60}$/;
function randomUin() {
	if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
	return `anon-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
/**
* One anonymous visitor id per browser, kept in localStorage so the RUM
* console can count UV and stitch a session across reloads. It carries no
* account, device or content information, and clearing site data rotates it.
*/
function anonymousUin() {
	try {
		const ls = window.localStorage;
		const saved = ls.getItem(ANONYMOUS_UIN_KEY);
		if (saved && UIN_PATTERN.test(saved)) return saved;
		const created = randomUin();
		ls.setItem(ANONYMOUS_UIN_KEY, created);
		return created;
	} catch {
		return randomUin();
	}
}
/**
* Tests boot the bundle in jsdom, where an initialized SDK would report to the
* real project. The realm identifies itself in the user agent, which is the
* only signal available before any layout exists.
*/
const inTestRealm = typeof navigator !== "undefined" && /\bjsdom\b/i.test(navigator.userAgent);
/** Aegis has no native DNT switch; `beforeReport` returning false drops a report. */
function doNotTrack() {
	const nav = navigator;
	return nav.doNotTrack === "1" || nav.msDoNotTrack === "1";
}
/**
* jsdom boots the bundle without the SDK (see `inTestRealm`), so the test realm
* cannot observe the gate any other way. Record what would have been sent.
*/
const testReports = [];
if (inTestRealm) window.__asideNoteReports = testReports;
function createRum() {
	return new import_aegis_min.default({
		id: APP_ID,
		uin: anonymousUin(),
		hostUrl: "https://rumt-zh.com",
		version: "1.1.2-beta.5",
		pagePerformance: false,
		webVitals: false,
		onError: false,
		reportApiSpeed: false,
		reportAssetSpeed: false,
		spa: false,
		pageUrl: "dsh-aside-note",
		beforeReport: () => !doNotTrack()
	});
}
let enabled = readAnalyticsEnabled();
let rum = null;
/**
* Lazily create the SDK: a browser that never had analytics on, or has turned
* it off, must not send even the page-view request the SDK emits at init.
*/
function ensureRum() {
	if (!rum && enabled && !inTestRealm) rum = createRum();
}
function send(name, fields) {
	if (!enabled) return;
	if (inTestRealm) {
		testReports.push({
			name,
			fields
		});
		return;
	}
	ensureRum();
	rum?.reportEvent({
		name,
		...fields
	});
}
/**
* Flip the opt-out switch. Turning it off is itself the last report; the SDK is
* destroyed once its one-second batch window has had time to flush that event.
*/
function setAnalyticsEnabled(next) {
	if (next === enabled) return;
	if (next) {
		enabled = true;
		ensureRum();
		return;
	}
	send("analytics_disabled", { ext1: "settings" });
	enabled = false;
	const instance = rum;
	rum = null;
	if (instance) setTimeout(() => instance.destroy(), 2e3);
}
function reportEvent(name, fields = {}) {
	send(name, fields);
}

// \0dsh-css:src/client/styles/panel.css.mjs
var panel_css_default = "/*\n * Panel, composer dock, header entry and toast styles.\n *\n * Only DSH semantic aliases and the shared scale are used here — no palette of\n * its own. The entry point injects this sheet once for the whole frame, because\n * the dock mounts outside the panel tree.\n */\n/* ── 1 令牌 · 只映射 DSH 语义别名与共享尺度，不新建调色板 ─────────── */\nbody{--an-space-1:4px;--an-space-2:8px;--an-space-3:12px;--an-space-4:16px;--an-space-5:24px;--an-space-6:32px;--an-radius-pill:999px;--an-fs-caption:12px;--an-lh-caption:20px;--an-fs-row:13px;--an-lh-row:20px;--an-fs-title:14px;--an-lh-title:20px;--an-hover:var(--dsw-alias-interactive-bg-hover);--an-active:var(--dsw-alias-interactive-bg-active);--an-field:var(--dsw-alias-bg-layer-1);--an-field-line:var(--dsw-alias-border-l4);--an-divider:var(--dsw-alias-border-l2);--an-dur-fast:var(--ds-transition-duration-fast);--an-dur-base:var(--ds-transition-duration);--an-dur-spin:700ms;--an-ease:var(--ds-ease-in-out);--an-transition:background-color var(--an-dur-fast) var(--an-ease),border-color var(--an-dur-fast) var(--an-ease),color var(--an-dur-fast) var(--an-ease),opacity var(--an-dur-fast) var(--an-ease),transform var(--an-dur-fast) var(--an-ease),box-shadow var(--an-dur-fast) var(--an-ease)}\n\n/* ── 2 浮层 · 菜单材质 + 三层阴影，边框为 0（发丝线在阴影第一层） ── */\n.dsh-an-popover{position:fixed;z-index:1000;box-sizing:border-box;display:flex;flex-direction:column;gap:var(--an-space-3);min-height:0;padding:var(--an-space-4);border:0;border-radius:var(--dsw-radius-panel);background:var(--dsh-an-panelSurface);box-shadow:var(--dsw-elevation-panel);color:var(--dsw-alias-label-primary);font-size:var(--an-fs-row);line-height:var(--an-lh-row);--dsw-elevation-stroke-color:var(--dsw-alias-border-l2);--dsh-scrollbar-thumb:var(--dsw-alias-scrollbar-bg-l2,var(--an-divider));--dsh-scrollbar-thumb-hover:var(--dsw-alias-scrollbar-hover-l2,var(--dsw-alias-scrollbar-bg-l2,var(--an-divider)));--dsh-an-panelSurface:var(--dsw-alias-bg-layer-2);--dsh-an-listGutter:var(--an-space-4);--dsh-an-scrollRail:9px;--dsh-an-scrollInset:2px;overflow:hidden;animation:dsh-an-pop-in var(--an-dur-base) var(--an-ease) both}\n.dsh-an-popoverRight{padding-left:var(--an-space-4)}\n\n/* ── 3 面板头 · 标题与计数同一行，动作收在右侧 ───────────────────── */\n.dsh-an-popHead{display:flex;align-items:center;justify-content:space-between;gap:var(--an-space-3);min-width:0}\n.dsh-an-popTitleLine{display:flex;align-items:center;gap:var(--an-space-3);flex:1 1 auto;min-width:0}\n.dsh-an-popTitle{min-width:0;overflow:hidden;font-size:var(--an-fs-title);line-height:var(--an-lh-title);font-weight:500;color:var(--dsw-alias-label-primary);white-space:nowrap;text-overflow:ellipsis}\n.dsh-an-popMeta{min-width:0;margin:0;overflow:hidden;font-size:var(--an-fs-caption);line-height:16px;color:var(--dsw-alias-label-secondary);font-weight:400;font-variant-numeric:tabular-nums;white-space:nowrap;text-overflow:ellipsis}\n.dsh-an-popActions{display:flex;align-items:center;flex:none;gap:var(--an-space-2)}\n.dsh-an-popClose,.dsh-an-settingsBtn{display:grid;place-items:center;flex:none;width:24px;height:24px;padding:0;border:0;border-radius:var(--dsw-radius-sm);background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;transition:var(--an-transition)}\n.dsh-an-popClose:active,.dsh-an-settingsBtn:active{background:var(--an-active)}\n.dsh-an-settingsBtn[data-active=\"true\"]{background:var(--an-hover);color:var(--dsw-alias-label-primary)}\n.dsh-an-settingsBtn{position:relative}\n.dsh-an-updateDot{position:absolute;top:3px;right:3px;width:6px;height:6px;border-radius:var(--an-radius-pill);corner-shape:round;background:var(--dsw-alias-brand-primary);box-shadow:0 0 0 2px var(--dsh-an-panelSurface)}\n/* The list-scope switch sits at the far right of the title line. */\n.dsh-an-scope{display:inline-flex;align-items:center;flex:none;box-sizing:border-box;height:24px;padding:1px;margin-left:auto;border:0.5px solid var(--dsw-alias-border-l2);border-radius:var(--an-radius-pill);corner-shape:round;background:var(--dsw-alias-bg-layer-1)}\n.dsh-an-scopeBtn{display:inline-flex;align-items:center;justify-content:center;height:20px;padding:0 var(--an-space-2);border:0;border-radius:var(--an-radius-pill);corner-shape:round;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:var(--an-fs-caption);line-height:16px;font-weight:500;cursor:pointer;transition:var(--an-transition)}\n.dsh-an-scopeBtn[data-active=\"true\"]{background:var(--dsw-alias-interactive-bg-hover-solid);color:var(--dsw-alias-label-primary)}\n.dsh-an-scopeBtn:focus-visible{outline:2px solid var(--dsw-alias-label-primary);outline-offset:1px}\n\n/* ── 4 添加区 · 嵌套表单组 R16，字段 0.5px 发丝线 ──────────────────── */\n.dsh-an-add{display:flex;flex-direction:column;gap:var(--an-space-2);padding:var(--an-space-3);border:0.5px solid var(--dsw-alias-settings-card-stroke);border-radius:var(--dsw-radius-lg);background:var(--dsw-alias-settings-card-fill);transition:var(--an-transition)}\n.dsh-an-add:focus-within{border-color:var(--dsw-alias-state-business-primary)}\n.dsh-an-input{display:block;flex:0 0 auto;width:100%;min-width:0;box-sizing:border-box;min-height:var(--an-lh-row);max-height:120px;padding:0;border:0;outline:0;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:var(--an-fs-row);line-height:var(--an-lh-row);resize:none;overflow-y:auto;overflow-x:hidden}\n.dsh-an-input::placeholder{color:var(--dsw-alias-label-secondary)}\n.dsh-an-addFoot{display:flex;align-items:center;justify-content:space-between;gap:var(--an-space-2);width:100%;min-width:0}\n.dsh-an-addShortcut{min-width:0;overflow:hidden;font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);color:var(--dsw-alias-label-secondary);white-space:nowrap;text-overflow:ellipsis}\n.dsh-an-addBtn{display:inline-flex;align-items:center;justify-content:center;flex:none;height:28px;padding:0 var(--an-space-2);border:0;border-radius:var(--dsw-radius-sm);background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-foreground);font:inherit;font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);font-weight:500;cursor:pointer;transition:var(--an-transition)}\n.dsh-an-addBtn:active{background:var(--dsw-alias-button-primary-dimmed);transform:scale(.97)}\n.dsh-an-addBtn[disabled]{background:transparent;color:var(--dsw-alias-label-secondary);box-shadow:inset 0 0 0 0.5px var(--an-field-line);cursor:not-allowed}\n\n/* ── 5 分区与列表 · 9px 轨道内嵌 2px，底部羽化只盖内容不盖滚动条 ──── */\n/* The viewport grows into the popover padding so the 9px rail does not steal from the cards; the list pays the padding back minus the rail, so cards and the add field keep one content width at every panel size. */\n.dsh-an-listViewport{position:relative;display:flex;flex-direction:column;flex:1 1 auto;min-height:0;margin-right:calc(var(--dsh-an-listGutter) * -1)}\n/* Bottom edge treatment: a viewport-fixed alpha mask over the scroller itself, exactly like the DSH scroll areas. The first gradient fades the last 48px to transparent; the second keeps the 9px scrollbar rail opaque so the thumb stays crisp. There is no backdrop-filter layer, so there is no hard compositing edge to see. */\n.dsh-an-listViewport[data-bottom=\"true\"] .dsh-an-listArea{--dsh-an-fadeHeight:calc(var(--an-space-6) + var(--an-space-4));-webkit-mask-image:linear-gradient(to bottom,currentColor 0,currentColor calc(100% - var(--dsh-an-fadeHeight)),transparent 100%),linear-gradient(to right,transparent calc(100% - var(--dsh-an-scrollRail)),currentColor calc(100% - var(--dsh-an-scrollRail)));mask-image:linear-gradient(to bottom,currentColor 0,currentColor calc(100% - var(--dsh-an-fadeHeight)),transparent 100%),linear-gradient(to right,transparent calc(100% - var(--dsh-an-scrollRail)),currentColor calc(100% - var(--dsh-an-scrollRail)));-webkit-mask-composite:source-over;mask-composite:add}\n/* Geometry only: the shared DSH skin paints the thumb, so the plugin declares no scrollbar pseudo-elements. The popover already binds the l2 thumb pair for the menu material. */\n.dsh-an-listArea{--dsh-scrollbar-width:var(--dsh-an-scrollRail);--dsh-scrollbar-thumb-border:var(--dsh-an-scrollInset);display:flex;flex-direction:column;flex:1 1 auto;min-height:0;padding-right:calc(var(--dsh-an-listGutter) - var(--dsh-an-scrollRail));overflow-x:hidden;overflow-y:auto;scrollbar-gutter:stable}\n.dsh-an-listSection{display:flex;flex-direction:column;gap:var(--an-space-2);min-width:0}\n.dsh-an-listSection+.dsh-an-listSection{margin-top:var(--an-space-2)}\n.dsh-an-sectionHead,.dsh-an-doneHead{position:sticky;top:0;z-index:3;display:flex;align-items:center;justify-content:space-between;gap:var(--an-space-3);min-height:28px;margin:0;padding:var(--an-space-1) 0;background:transparent;transition:background-color var(--an-dur-fast) var(--an-ease)}\n.dsh-an-sectionHead[data-stuck],.dsh-an-doneHead[data-stuck]{background:var(--dsh-an-panelSurface,var(--dsw-alias-bg-layer-2))}\n.dsh-an-doneToggle{display:flex;align-items:center;gap:var(--an-space-2);flex:none;min-width:0;margin:0;padding:var(--an-space-1) var(--an-space-2) var(--an-space-1) 0;border:0;border-radius:var(--dsw-radius-sm);background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);font-weight:500;text-align:left;cursor:pointer;transition:var(--an-transition)}\n.dsh-an-doneToggle:active{background:var(--an-active)}\n.dsh-an-doneToggle[disabled]{color:var(--dsw-alias-label-tertiary);cursor:not-allowed;pointer-events:none}\n.dsh-an-chevron{display:flex;align-items:center;justify-content:center;flex:none;width:16px;height:16px;color:var(--dsw-alias-label-secondary);transition:transform var(--an-dur-fast) var(--an-ease)}\n.dsh-an-chevron[data-open=\"true\"]{transform:rotate(90deg)}\n.dsh-an-sectionCount{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;padding:0 var(--an-space-1);border:0.5px solid var(--dsw-alias-border-l3);border-radius:var(--an-radius-pill);corner-shape:round;background:var(--dsw-alias-interactive-bg-hover-solid);color:var(--dsw-alias-label-primary);font-size:var(--an-fs-caption);line-height:16px;font-weight:500;font-variant-numeric:tabular-nums}\n.dsh-an-clear{display:inline-flex;align-items:center;flex:none;height:24px;margin-left:auto;padding:0 var(--an-space-2);border:0;border-radius:var(--dsw-radius-sm);background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);font-weight:500;cursor:pointer;transition:var(--an-transition)}\n.dsh-an-clear:active{background:var(--an-active);color:var(--dsw-alias-label-primary)}\n.dsh-an-clearConfirm{display:flex;align-items:center;justify-content:space-between;gap:var(--an-space-2);min-width:0;margin-top:var(--an-space-1);padding:var(--an-space-2);border:0.5px solid var(--dsw-alias-settings-card-stroke);border-radius:var(--dsw-radius-lg);background:var(--dsw-alias-settings-card-fill)}\n.dsh-an-clearConfirmText{flex:1 1 auto;min-width:0;margin:0;font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);color:var(--dsw-alias-label-primary);overflow-wrap:anywhere}\n.dsh-an-clearConfirmActions{display:flex;align-items:center;flex:none;gap:var(--an-space-1)}\n.dsh-an-doneRows{margin-top:var(--an-space-2)}\n.dsh-an-rows{list-style:none;margin:0;padding:0;border:0.5px solid var(--dsw-alias-settings-card-stroke);border-radius:var(--dsw-radius-lg);background:var(--dsw-alias-settings-card-fill);overflow:hidden}\n.dsh-an-row{display:flex;align-items:flex-start;gap:var(--an-space-2);padding:var(--an-space-2);border-top:0.5px solid var(--an-divider);transition:var(--an-transition)}\n.dsh-an-row:first-child{border-top:0}\n\n/* ── 6 一行便笺 · 勾选圈 14px，命中区 24px ─────────────────────────── */\n.dsh-an-check{display:flex;align-items:center;justify-content:center;flex:none;width:24px;height:24px;margin:-2px 0 0;padding:0;border:0;border-radius:var(--an-radius-pill);corner-shape:round;background:transparent;color:transparent;font:inherit;cursor:pointer;transition:var(--an-transition)}\n.dsh-an-checkCircle{display:flex;align-items:center;justify-content:center;width:14px;height:14px;box-sizing:border-box;border:0.5px solid var(--dsw-alias-label-tertiary);border-radius:var(--an-radius-pill);corner-shape:round;background:transparent;color:transparent;transition:border-color var(--an-dur-fast) var(--an-ease),background-color var(--an-dur-fast) var(--an-ease),color var(--an-dur-fast) var(--an-ease),transform var(--an-dur-fast) var(--an-ease)}\n.dsh-an-check:active .dsh-an-checkCircle{transform:scale(.9)}\n.dsh-an-check[aria-checked=\"true\"] .dsh-an-checkCircle{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary-foreground)}\n.dsh-an-itemBody{display:flex;flex:1;flex-direction:column;gap:var(--an-space-1);min-width:0}\n.dsh-an-text{display:block;width:100%;margin:0;padding:0;border:0;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:var(--an-fs-row);line-height:var(--an-lh-row);text-align:left;white-space:pre-wrap;overflow-wrap:anywhere;cursor:text;user-select:text;-webkit-user-select:text}\n.dsh-an-rowDone .dsh-an-text{color:var(--dsw-alias-label-secondary);text-decoration:line-through;text-decoration-thickness:1px;text-decoration-color:var(--dsw-alias-label-tertiary)}\n.dsh-an-rowFoot{display:flex;align-items:center;justify-content:space-between;gap:var(--an-space-2);min-height:24px}\n.dsh-an-meta{flex:0 1 auto;min-width:0;overflow:hidden;font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;white-space:nowrap;text-overflow:ellipsis}\n\n/* ── 7 行操作 · 图标按钮 H24/R8，触摸端常显 ────────────────────────── */\n.dsh-an-actions{display:flex;flex:none;gap:var(--an-space-1)}\n.dsh-an-iconBtn{position:relative;display:flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;border:0;border-radius:var(--dsw-radius-sm);background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;transition:var(--an-transition)}\n.dsh-an-iconBtn:active{background:var(--an-active);color:var(--dsw-alias-label-primary);transform:scale(.94)}\n.dsh-an-iconBtn:disabled,.dsh-an-iconBtn[disabled]{color:var(--dsw-alias-label-tertiary);cursor:not-allowed;pointer-events:none}\n.dsh-an-forwardMark{position:absolute;right:0;bottom:0;display:flex;align-items:center;justify-content:center;width:10px;height:10px;border-radius:var(--an-radius-pill);corner-shape:round;background:var(--dsw-alias-label-secondary);color:var(--dsw-alias-label-primary-foreground);pointer-events:none}\n\n/* ── 8 就地编辑 · 保存/取消为紧凑描边按钮 ──────────────────────────── */\n.dsh-an-edit{display:flex;flex-direction:column;gap:var(--an-space-1);width:100%}\n.dsh-an-editInput{display:block;width:100%;box-sizing:border-box;min-height:var(--an-lh-row);max-height:160px;padding:var(--an-space-1) var(--an-space-2);border:0.5px solid var(--an-field-line);border-radius:var(--dsw-radius-sm);background:var(--an-field);color:var(--dsw-alias-label-primary);font:inherit;font-size:var(--an-fs-row);line-height:var(--an-lh-row);outline:0;resize:none;overflow-y:auto;overflow-x:hidden;transition:var(--an-transition)}\n.dsh-an-editInput:focus{border-color:var(--dsw-alias-state-business-primary)}\n.dsh-an-editActions{display:flex;align-items:center;gap:var(--an-space-1)}\n.dsh-an-editHint{flex:1 1 auto;min-width:0;margin-left:auto;overflow:hidden;font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);text-align:right;color:var(--dsw-alias-label-secondary);white-space:nowrap;text-overflow:ellipsis}\n.dsh-an-mini{display:inline-flex;align-items:center;justify-content:center;flex:none;height:24px;padding:0 var(--an-space-2);border:0.5px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-sm);background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);font-weight:500;cursor:pointer;transition:var(--an-transition)}\n.dsh-an-mini:active{background:var(--an-active)}\n.dsh-an-mini[disabled]{color:var(--dsw-alias-label-tertiary);cursor:not-allowed;pointer-events:none}\n.dsh-an-miniPrimary{border-color:transparent;background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-foreground)}\n.dsh-an-miniPrimary:active{background:var(--dsw-alias-button-primary-dimmed)}\n.dsh-an-miniDanger{border-color:transparent;background:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-label-primary-foreground)}\n.dsh-an-miniDanger:active{background:var(--dsw-alias-state-error-primary)}\n\n/* ── 9 空态 · 虚线 1px，说明 12/次级墨色 ──────────────────────────── */\n.dsh-an-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--an-space-2);padding:var(--an-space-5) var(--an-space-4);border:1px dashed var(--an-divider);border-radius:var(--dsw-radius-lg);text-align:center}\n.dsh-an-emptyIcon{display:flex;align-items:center;justify-content:center;width:32px;height:32px;margin:0 0 var(--an-space-1);border-radius:var(--dsw-radius-md);background:var(--an-hover);color:var(--dsw-alias-label-secondary)}\n.dsh-an-emptyTitle{font-size:var(--an-fs-row);line-height:var(--an-lh-row);font-weight:500;color:var(--dsw-alias-label-primary)}\n.dsh-an-emptyBody{max-width:36ch;font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere}\n\n/* ── 10 设置 · 分组 R16，项间 0.5px 分隔线，链接走 --dsw-alias-link ── */\n.dsh-an-settings{--dsh-an-settingIndent:var(--an-space-3);display:flex;flex-direction:column;gap:var(--an-space-2);margin:0;padding:var(--an-space-3);border:0.5px solid var(--dsw-alias-settings-card-stroke);border-radius:var(--dsw-radius-lg);background:var(--dsw-alias-settings-card-fill)}\n.dsh-an-settingsHead{font-size:var(--an-fs-row);line-height:var(--an-lh-row);font-weight:500;color:var(--dsw-alias-label-primary)}\n.dsh-an-settingGroup{display:flex;flex-direction:column;gap:var(--an-space-1);min-width:0}\n.dsh-an-settingGroup+.dsh-an-settingGroup{margin-top:var(--an-space-2);padding-top:var(--an-space-2);border-top:0.5px solid var(--an-divider)}\n.dsh-an-settingLabel{font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);font-weight:500;color:var(--dsw-alias-label-secondary)}\n.dsh-an-settingBody{display:flex;flex-direction:column;gap:var(--an-space-1);padding-left:var(--dsh-an-settingIndent)}\n.dsh-an-settingItem{display:flex;flex-direction:column;gap:var(--an-space-1);min-width:0}\n.dsh-an-settingItem+.dsh-an-settingItem{margin-top:var(--an-space-2);padding-top:var(--an-space-2);border-top:0.5px solid var(--an-divider)}\n.dsh-an-settingChoices{display:flex;flex-direction:column;gap:var(--an-space-1)}\n.dsh-an-settingChoice{display:flex;align-items:flex-start;gap:var(--an-space-2);font-size:var(--an-fs-row);line-height:var(--an-lh-row);color:var(--dsw-alias-label-primary);cursor:pointer}\n.dsh-an-settingChoice input{appearance:none;flex:none;width:14px;height:14px;margin:calc((var(--an-lh-row) - 14px) / 2) 0 0;box-sizing:border-box;border:0.5px solid var(--dsw-alias-label-tertiary);border-radius:var(--an-radius-pill);corner-shape:round;background:transparent;cursor:pointer;transition:var(--an-transition)}\n.dsh-an-settingChoice input:checked{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-brand-primary);box-shadow:inset 0 0 0 3px var(--an-field)}\n.dsh-an-settingInput{box-sizing:border-box;width:100%;height:28px;padding:0 var(--an-space-2);border:0.5px solid var(--an-field-line);border-radius:var(--dsw-radius-sm);background:var(--an-field);color:var(--dsw-alias-label-primary);font-family:inherit;font-size:var(--an-fs-row);line-height:var(--an-lh-row);font-weight:500;outline:0;transition:var(--an-transition)}\n.dsh-an-settingItem>.dsh-an-settingInput{font-family:inherit;font-size:var(--an-fs-row);line-height:var(--an-lh-row);font-weight:500}\n.dsh-an-settingInput:focus{border-color:var(--dsw-alias-state-business-primary)}\n/* 前缀提示词改为文本域：min-height 兜住三行，空态也不会被内联高度压扁 */\n.dsh-an-settingTextarea{display:block;height:auto;min-height:calc(var(--an-lh-row) + var(--an-space-4) + 2px);padding:var(--an-space-2);resize:none;overflow-y:auto;white-space:pre-wrap;overflow-wrap:anywhere}\n.dsh-an-settingHint{margin:0;font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);color:var(--dsw-alias-label-secondary)}\n.dsh-an-settingHintNote{margin-top:var(--an-space-1)}\n/* 匿名统计开关 · 32×18 轨道 + 14px 圆钮，开态用品牌色填充 */\n.dsh-an-settingToggle{display:flex;align-items:center;justify-content:space-between;gap:var(--an-space-2);font-size:var(--an-fs-row);line-height:var(--an-lh-row);color:var(--dsw-alias-label-primary);cursor:pointer}\n.dsh-an-switch{appearance:none;position:relative;flex:none;box-sizing:border-box;width:32px;height:18px;margin:0;border:0.5px solid var(--dsw-alias-label-tertiary);border-radius:var(--an-radius-pill);corner-shape:round;background:transparent;cursor:pointer;transition:var(--an-transition)}\n.dsh-an-switch::after{content:'';position:absolute;top:1.5px;left:1.5px;width:14px;height:14px;border-radius:var(--an-radius-pill);corner-shape:round;background:var(--dsw-alias-label-tertiary);transition:transform var(--an-dur-fast) var(--an-ease),background-color var(--an-dur-fast) var(--an-ease)}\n.dsh-an-switch:checked{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-brand-primary)}\n.dsh-an-switch:checked::after{background:var(--dsw-alias-label-primary-foreground);transform:translateX(14px)}\n.dsh-an-switch:focus-visible{outline:2px solid var(--dsw-alias-label-primary);outline-offset:1px}\n.dsh-an-settingBrand{display:flex;flex-direction:column;gap:2px;min-width:0}\n.dsh-an-settingBrandName{font-size:var(--an-fs-row);line-height:var(--an-lh-row);font-weight:500;color:var(--dsw-alias-label-primary)}\n.dsh-an-settingBrandTagline{font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere}\n.dsh-an-settingAbout{display:flex;align-items:center;gap:var(--an-space-2);flex-wrap:wrap;min-width:0;font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);color:var(--dsw-alias-label-secondary)}\n.dsh-an-settingAbout>span{flex:none}\n.dsh-an-settingAbout .dsh-an-updateHint{flex:0 1 auto;min-width:0}\n.dsh-an-settingMetaRow{display:flex;align-items:baseline;gap:var(--an-space-1);min-width:0;overflow:hidden;font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);color:var(--dsw-alias-label-secondary);white-space:nowrap}\n.dsh-an-settingMetaRow>span{flex:none}\n.dsh-an-settingDot{flex:none;color:var(--dsw-alias-label-tertiary)}\n.dsh-an-settingLink{flex:0 1 auto;min-width:0;overflow:hidden;color:var(--dsw-alias-link);font-weight:500;text-decoration:none;text-overflow:ellipsis;transition:var(--an-transition)}\n.dsh-an-settingLink:focus-visible{text-decoration:underline;text-decoration-style:dotted;text-decoration-thickness:1px;text-underline-offset:3px}\n/* 更新中心：检查入口、可展开的更新说明与更新动作，全部走共享令牌 */\n.dsh-an-updateCheck{flex:none;height:24px;padding:0 var(--an-space-2);border:0.5px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-sm);background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);font-weight:500;cursor:pointer;transition:var(--an-transition)}\n.dsh-an-updateCheck:active{background:var(--an-active)}\n.dsh-an-updateCheck:disabled{color:var(--dsw-alias-label-tertiary);cursor:default}\n.dsh-an-updateCheck:focus-visible{outline-offset:2px}\n.dsh-an-updateHint{margin:0;font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere}\n.dsh-an-updateHintError{color:var(--dsw-alias-state-error-primary)}\n.dsh-an-updateCard{display:flex;flex-direction:column;gap:var(--an-space-2);margin-top:var(--an-space-1);padding:var(--an-space-2);border:0.5px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-md);background:var(--dsw-alias-bg-layer-1)}\n.dsh-an-updateTitle{font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);font-weight:500;color:var(--dsw-alias-label-primary)}\n.dsh-an-updateFull:focus-visible,.dsh-an-updateLinkBtn:focus-visible{text-decoration:underline;text-decoration-style:dotted;text-decoration-thickness:1px;text-underline-offset:3px}\n.dsh-an-updateFull{flex:none;color:var(--dsw-alias-link);font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);font-weight:500;text-decoration:none;transition:var(--an-transition)}\n.dsh-an-updateNotes{display:flex;flex-direction:column;gap:var(--an-space-2);max-height:220px;overflow-y:auto;padding-right:0;overscroll-behavior:contain;--dsh-scrollbar-width:var(--dsh-an-scrollRail);--dsh-scrollbar-thumb-border:var(--dsh-an-scrollInset);scrollbar-gutter:stable}\n.dsh-an-updateNotes[data-fade=\"true\"]{--dsh-an-fadeHeight:var(--an-space-5);-webkit-mask-image:linear-gradient(to bottom,currentColor 0,currentColor calc(100% - var(--dsh-an-fadeHeight)),transparent 100%),linear-gradient(to right,transparent calc(100% - var(--dsh-an-scrollRail)),currentColor calc(100% - var(--dsh-an-scrollRail)));mask-image:linear-gradient(to bottom,currentColor 0,currentColor calc(100% - var(--dsh-an-fadeHeight)),transparent 100%),linear-gradient(to right,transparent calc(100% - var(--dsh-an-scrollRail)),currentColor calc(100% - var(--dsh-an-scrollRail)));-webkit-mask-composite:source-over;mask-composite:add}\n.dsh-an-updateVersions{display:flex;flex-direction:column;gap:var(--an-space-1);min-width:0}\n.dsh-an-updateVersion{display:flex;flex-direction:column;gap:var(--an-space-1);min-width:0}\n.dsh-an-updateVersion+.dsh-an-updateVersion{padding-top:var(--an-space-1);border-top:0.5px solid var(--an-divider)}\n.dsh-an-updateVersionHead{display:flex;align-items:center;gap:var(--an-space-1);width:100%;padding:2px 0;border:0;border-radius:var(--dsw-radius-sm);background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);font-weight:500;text-align:left;cursor:pointer}\n.dsh-an-updateVersionHead:active{background:var(--an-active)}\n.dsh-an-updateVersionHead:focus-visible{text-decoration:underline;text-decoration-style:dotted;text-decoration-thickness:1px;text-underline-offset:3px}\n.dsh-an-updateChevron{display:flex;align-items:center;justify-content:center;flex:none;width:16px;height:16px;color:var(--dsw-alias-label-secondary);font-size:var(--an-fs-caption);transition:transform var(--an-dur-fast) var(--an-ease)}\n.dsh-an-updateChevron[data-open=\"true\"]{transform:rotate(90deg)}\n.dsh-an-updateVersionLabel{font-variant-numeric:tabular-nums}\n.dsh-an-updateLatest{display:inline-flex;align-items:center;justify-content:center;flex:none;min-width:18px;height:18px;padding:0 var(--an-space-1);border:0.5px solid var(--dsw-alias-border-l3);border-radius:var(--an-radius-pill);corner-shape:round;background:var(--dsw-alias-interactive-bg-hover-solid);color:var(--dsw-alias-label-primary);font-size:var(--an-fs-caption);line-height:16px;font-weight:500}\n.dsh-an-updateVersionBody{display:flex;flex-direction:column;gap:var(--an-space-2);padding-left:var(--an-space-4);min-width:0}\n.dsh-an-updateGroup{display:flex;flex-direction:column;gap:var(--an-space-1);min-width:0}\n.dsh-an-updateGroupTitle{font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);font-weight:500;color:var(--dsw-alias-label-secondary)}\n.dsh-an-updateItems{display:flex;flex-direction:column;gap:var(--an-space-1);margin:0;padding-left:var(--an-space-4);color:var(--dsw-alias-label-primary)}\n.dsh-an-updateItem{font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);overflow-wrap:anywhere}\n.dsh-an-updateItem strong{font-weight:500}\n.dsh-an-updateActions{display:flex;align-items:center;gap:var(--an-space-2);flex-wrap:wrap;min-width:0}\n.dsh-an-updatePrimary{display:inline-flex;align-items:center;justify-content:center;flex:none;height:24px;padding:0 var(--an-space-3);border:0;border-radius:var(--dsw-radius-sm);background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-foreground);font:inherit;font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);font-weight:500;cursor:pointer;transition:var(--an-transition)}\n.dsh-an-updatePrimary:active{background:var(--dsw-alias-button-primary-dimmed)}\n.dsh-an-updatePrimary:disabled{opacity:.55;cursor:default}\n.dsh-an-updatePrimary:focus-visible{outline-offset:2px}\n.dsh-an-updateDone{display:flex;align-items:center;gap:var(--an-space-2);flex-wrap:wrap;min-width:0}\n.dsh-an-updateErrorRow{display:flex;align-items:baseline;gap:var(--an-space-2);flex-wrap:wrap;min-width:0}\n.dsh-an-updateError{flex:1 1 auto;min-width:0;margin:0;font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);color:var(--dsw-alias-state-error-primary);overflow-wrap:anywhere}\n.dsh-an-updateLinkBtn{padding:0;border:0;background:transparent;color:var(--dsw-alias-link);font:inherit;font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);font-weight:500;cursor:pointer}\n.dsh-an-updateFallback{display:flex;align-items:center;gap:var(--an-space-2);flex-wrap:wrap;min-width:0;padding-top:var(--an-space-1);border-top:0.5px solid var(--an-divider)}\n.dsh-an-updateFallback .dsh-an-updateHint{flex:1 1 100%;min-width:0}\n.dsh-an-updateCopy{flex:none;height:24px;padding:0 var(--an-space-2);border:0.5px solid var(--dsw-alias-border-l3);border-radius:var(--dsw-radius-sm);background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);font-weight:500;cursor:pointer;transition:var(--an-transition)}\n.dsh-an-updateCopy:active{background:var(--an-active)}\n.dsh-an-updateCopy:focus-visible{outline-offset:2px}\n\n/* ── 11 面板脚注 · 存储状态就地提示，错误用状态色 ─────────────────── */\n.dsh-an-popFoot{margin:0;font-size:var(--an-fs-caption);line-height:var(--an-lh-caption);color:var(--dsw-alias-label-secondary)}\n.dsh-an-error{color:var(--dsw-alias-state-error-primary)}\n\n/* ── 12 会话顶部入口 · H28/R8，计数徽标为胶囊 ──────────────────────── */\n.dsh-an-headerBtn{position:relative;display:inline-flex;align-items:center;justify-content:center;flex:none;width:28px;height:28px;padding:0;border:0;border-radius:var(--dsw-radius-sm);background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;transition:var(--an-transition)}\n.dsh-an-headerBtn:active{background:var(--an-active);color:var(--dsw-alias-label-primary)}\n.dsh-an-headerBtn[data-active=\"true\"]{background:var(--an-hover);color:var(--dsw-alias-label-primary)}\n.dsh-an-headerBtn[data-disabled=\"true\"]{color:var(--dsw-alias-label-tertiary);cursor:not-allowed;pointer-events:none}\n.dsh-an-headerIcon{display:flex;align-items:center;justify-content:center;flex:none;width:16px;height:16px;color:currentColor}\n.dsh-an-headerCount{position:absolute;top:-2px;right:-2px;box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;min-width:16px;height:16px;padding:0 var(--an-space-1);border:0.5px solid var(--dsw-alias-bg-base);border-radius:var(--an-radius-pill);corner-shape:round;background:var(--dsw-alias-interactive-bg-hover-solid);color:var(--dsw-alias-label-secondary);font-size:var(--an-fs-caption);line-height:14px;font-weight:500;font-variant-numeric:tabular-nums}\n\n/* ── 13 拖拽把手 · 8px 命中带，3px 视觉条 ─────────────────────────── */\n.dsh-an-resizeHandle{position:absolute;left:0;top:0;bottom:0;z-index:2;display:flex;align-items:center;justify-content:center;width:var(--an-space-2);cursor:ew-resize;touch-action:none;outline:0}\n.dsh-an-resizeHandle::before{content:\"\";width:3px;height:var(--an-space-6);border-radius:var(--an-radius-pill);corner-shape:round;background:var(--dsw-alias-border-l4);transition:transform var(--an-dur-fast) var(--an-ease),background-color var(--an-dur-fast) var(--an-ease)}\n.dsh-an-resizeHandle:focus-visible::before{background:var(--dsw-alias-label-secondary)}\n.dsh-an-resizeHandle:focus-visible{outline-offset:-2px;border-radius:var(--dsw-radius-sm)}\n.dsh-an-resizeHandleBottom{position:absolute;left:50%;bottom:0;z-index:2;display:flex;align-items:center;justify-content:center;width:var(--an-space-6);height:var(--an-space-3);transform:translateX(-50%);cursor:ns-resize;touch-action:none;outline:0}\n.dsh-an-resizeHandleBottom::before{content:\"\";width:var(--an-space-5);height:3px;border-radius:var(--an-radius-pill);corner-shape:round;background:var(--dsw-alias-border-l4);transition:transform var(--an-dur-fast) var(--an-ease),background-color var(--an-dur-fast) var(--an-ease)}\n.dsh-an-resizeHandleBottom:focus-visible::before{background:var(--dsw-alias-label-secondary)}\n.dsh-an-resizeHandleBottom:focus-visible{outline-offset:-2px;border-radius:var(--dsw-radius-sm)}\n\n/* ── 14 加载 · 控件内 12px 环，文字隐藏，不报\"进行中\" ──────────────── */\n[data-loading=\"true\"]{position:relative;color:transparent!important;pointer-events:none;cursor:progress}\n[data-loading=\"true\"]>*{visibility:hidden}\n[data-loading=\"true\"]::after{content:\"\";position:absolute;left:50%;top:50%;box-sizing:border-box;width:12px;height:12px;margin:-6px 0 0 -6px;border:1.5px solid var(--dsw-alias-label-secondary);border-top-color:transparent;border-radius:var(--an-radius-pill);corner-shape:round;animation:dsh-an-spin var(--an-dur-spin) linear infinite}\n\n/* ── 15 悬停 · 只在支持 hover 的设备上启用（触摸端常显操作） ────────── */\n@media (hover:hover){\n.dsh-an-row:hover{background:var(--an-hover)}\n.dsh-an-actions{opacity:0;pointer-events:none}\n.dsh-an-row:hover .dsh-an-actions,.dsh-an-row:focus-within .dsh-an-actions{opacity:1;pointer-events:auto}\n.dsh-an-iconBtn:hover{background:var(--an-hover);color:var(--dsw-alias-label-primary)}\n.dsh-an-iconBtnDanger:hover{background:var(--dsw-alias-interactive-bg-hover-danger);color:var(--dsw-alias-state-error-primary)}\n.dsh-an-popClose:hover,.dsh-an-settingsBtn:hover{background:var(--an-hover);color:var(--dsw-alias-label-primary)}\n.dsh-an-scopeBtn:hover:not([data-active=\"true\"]){background:var(--an-hover);color:var(--dsw-alias-label-primary)}\n.dsh-an-addBtn:hover:not([disabled]){background:var(--dsw-alias-button-primary-hover)}\n.dsh-an-mini:hover:not([disabled]){background:var(--an-hover)}\n.dsh-an-miniPrimary:hover:not([disabled]){background:var(--dsw-alias-button-primary-hover);color:var(--dsw-alias-label-primary-foreground)}\n.dsh-an-miniDanger:hover:not([disabled]){background:var(--dsw-alias-interactive-bg-hover-danger);color:var(--dsw-alias-state-error-primary)}\n.dsh-an-clear:hover{background:var(--an-hover);color:var(--dsw-alias-label-primary)}\n.dsh-an-doneToggle:hover{background:var(--an-hover)}\n.dsh-an-check:hover .dsh-an-checkCircle{border-color:var(--dsw-alias-label-primary)}\n.dsh-an-settingChoice:hover input{border-color:var(--dsw-alias-label-primary)}\n.dsh-an-settingToggle:hover .dsh-an-switch:not(:checked){border-color:var(--dsw-alias-label-primary)}\n.dsh-an-settingLink:hover{text-decoration:underline;text-decoration-style:dotted;text-decoration-thickness:1px;text-underline-offset:3px}\n.dsh-an-updatePrimary:hover:not(:disabled){background:var(--dsw-alias-button-primary-hover)}\n.dsh-an-headerBtn:hover{background:var(--an-hover);color:var(--dsw-alias-label-primary)}\n.dsh-an-resizeHandle:hover::before{transform:scaleY(1.4);background:var(--dsw-alias-label-secondary)}\n.dsh-an-resizeHandleBottom:hover::before{transform:scaleX(1.4);background:var(--dsw-alias-label-secondary)}\n}\n\n/* ── 16 动效 · 只动 opacity/transform，错峰出场封顶 ─────────────────── */\n@media (prefers-reduced-motion:no-preference){\n.dsh-an-rows>.dsh-an-row{animation:dsh-an-row-in var(--an-dur-base) var(--an-ease) both}\n.dsh-an-rows>.dsh-an-row:nth-child(2){animation-delay:var(--an-space-1)}\n.dsh-an-rows>.dsh-an-row:nth-child(3){animation-delay:var(--an-space-2)}\n.dsh-an-rows>.dsh-an-row:nth-child(4){animation-delay:calc(var(--an-space-2) + var(--an-space-1))}\n.dsh-an-rows>.dsh-an-row:nth-child(n+5){animation-delay:var(--an-space-3)}\n}\n@keyframes dsh-an-pop-in{from{opacity:0}to{opacity:1}}\n@keyframes dsh-an-row-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}\n@keyframes dsh-an-spin{to{transform:rotate(360deg)}}\n@media (prefers-reduced-motion:reduce){\n.dsh-an-popover,.dsh-an-rows>.dsh-an-row,.dsh-an-chevron,[data-loading=\"true\"]::after{animation:none}\n.dsh-an-popover,.dsh-an-row,.dsh-an-actions,.dsh-an-iconBtn{transition-duration:1ms}\n}\n\n/* ── 17 窄视口 · 390 基准下收紧内边距，主操作全部可达 ──────────────── */\n@media (max-width:480px){\n.dsh-an-popover{padding:var(--an-space-3);--dsh-an-listGutter:var(--an-space-3)}\n.dsh-an-popoverRight{padding-left:var(--an-space-4)}\n.dsh-an-popHead{gap:var(--an-space-2)}\n.dsh-an-add{padding:var(--an-space-2) var(--an-space-3)}\n.dsh-an-sectionHead,.dsh-an-doneHead{min-height:24px}\n}\n\n";

// src/client/i18n/en.ts
/** English copy; a missing key fails the typecheck rather than falling back at runtime. */
const en = {
	"nav.label": "AsideNote",
	"title": "AsideNote",
	"popover.title": "AsideNote",
	"popover.close": "Close AsideNote",
	"popover.count": "{open} open · {total} total",
	"popover.completed": "Completed",
	"popover.clearCancel": "Cancel",
	"popover.clearConfirm": "Clear {n} completed notes?",
	"popover.clearConfirmAction": "Clear",
	"popover.clearDone": "Clear completed",
	"popover.local": "Notes are saved only on this device",
	"scope.label": "Note scope",
	"scope.workspace": "Workspace",
	"scope.session": "Session",
	"popover.empty.title": "No notes yet",
	"popover.empty.body": "Keep your ideas beside the conversation",
	"settings.open": "Settings",
	"settings.title": "Settings",
	"settings.about": "About",
	"settings.tagline": "Keep your ideas beside the conversation.",
	"settings.version": "Version",
	"settings.author": "Author",
	"settings.project": "Source",
	"settings.shortcut": "Send shortcut",
	"settings.shortcutCtrlEnter": "{mod}+Enter sends, Enter for a new line",
	"settings.shortcutEnter": "Enter sends, {mod}+Enter for a new line",
	"settings.forward": "One-click forward",
	"settings.forwardPrefixItem": "Prefix prompt",
	"settings.forwardPrefixHint": "When forwarding into an empty composer, this prompt is written before the note; leave it empty to forward the note on its own",
	"settings.privacy": "Privacy",
	"settings.analytics": "Anonymous usage statistics",
	"settings.analyticsHint": "Reports panel actions and update outcomes only — never note text or session ids. Turning it off stops reporting immediately; the switch itself sends one last event",
	"add.placeholder": "Jot one down",
	"add.shortcut": "{mod}+Enter sends · Enter for a new line",
	"add.shortcutEnter": "Enter sends · {mod}+Enter for a new line",
	"add.action": "Add",
	"list.open": "Open",
	"list.allDone.title": "Nothing left open",
	"list.allDone.body": "Add another note, or expand completed below to look back",
	"item.markDone": "Mark as done",
	"item.markOpen": "Mark as open",
	"item.copy": "Copy",
	"item.forward": "Forward to chat",
	"item.forwarded": "Forwarded to chat — click to remove the mark",
	"item.edit": "Edit",
	"item.delete": "Delete",
	"item.editHint": "Double-click to edit",
	"edit.save": "Save",
	"edit.cancel": "Cancel",
	"edit.hintCtrlEnter": "{mod}+Enter saves · Enter for a new line",
	"edit.hintEnter": "Enter saves · {mod}+Enter for a new line",
	"time.now": "just now",
	"time.minutes": "{n} min ago",
	"time.hours": "{n} hr ago",
	"time.days": "{n} d ago",
	"time.createdDone": "Created {created} · Completed {completed}",
	"storage.failed": "Local storage is unavailable; changes may not persist",
	"forward.prefix": "Complete this task:",
	"resize.width": "Resize AsideNote width",
	"resize.height": "Resize AsideNote height",
	"resize.hint": "Drag to resize, double-click to reset",
	"dock.open": "Open AsideNote",
	"dock.count": "{n} open",
	"header.tooltip": "AsideNote · {n} open",
	"header.tooltipEmpty": "AsideNote",
	"toast.copied": "Copied",
	"toast.copyFailed": "Copy failed — try again",
	"toast.forwarded": "Forwarded to chat",
	"toast.unforwarded": "Forward mark removed",
	"toast.forwardFailed": "No composer found — nothing was forwarded",
	"toast.deleted": "Deleted",
	"toast.cleared": "Cleared completed",
	"toast.saveFailed": "Save failed — nothing changed",
	"update.label": "Update available",
	"update.tip": "Version {version} is now available — open the release notes",
	"update.check": "Check for updates",
	"update.checking": "Checking…",
	"update.retryCheck": "Retry check",
	"update.current": "You're up to date",
	"update.checkFailed": "Check failed — try again later",
	"update.available": "Version {version} is available",
	"update.notesTitle": "Release notes",
	"update.notesLoading": "Loading release notes…",
	"update.notesMissing": "No release notes to show for this version yet",
	"update.historyCount": "{n} releases included",
	"update.latest": "Latest",
	"update.olderNotes": "Earlier releases are in the full release notes",
	"update.notesFailed": "Could not load the release notes — open the full notes",
	"update.full": "Full release notes",
	"update.now": "Update now",
	"update.starting": "Preparing the update…",
	"update.waiting": "Another automatic update is running — waiting…",
	"update.updating": "Updating…",
	"update.updatingPercent": "Updating… {percent}%",
	"update.updated": "Updated to {version}",
	"update.refresh": "Refresh page",
	"update.restartHint": "Restart DSH manually to finish the update",
	"update.failed": "Update failed: {reason}",
	"update.force": "Update anyway",
	"update.tooFresh": "This release is too new for the automatic update right now — retry later or update anyway",
	"update.unchanged": "The automatic update answered with the same version — retry later or update anyway",
	"update.notInstalled": "This plugin is not installed in the current profile, so it cannot be updated in-app",
	"update.forbidden": "The automatic update refused this request",
	"update.rejected": "The automatic update did not run; a linked checkout updates from its own directory",
	"update.busy": "Another automatic update is already running — try again shortly",
	"update.agentsRunning": "An agent is running, and the automatic update will not replace plugin files under it; wait for it to finish, or update with the command below",
	"update.timeout": "Timed out waiting for the update result — try again later",
	"update.bundleInUse": "This plugin is in use, and Desktop will not remove it first; the host route installs over it — if that still fails, run the command below",
	"update.alreadyInstalled": "This DSH only replaces a package after removing it, so it cannot install over the current copy; run the command below",
	"update.managementRequired": "This profile is managed by the desktop app, so the automatic update cannot change it; run the command below",
	"update.notRemovable": "The desktop app manages this plugin and the automatic update cannot remove it; run the command below",
	"update.stopProfile": "Removing it requires stopping this profile first; run the command below",
	"update.incompatible": "This version is not compatible with the running DSH, so the host refused it",
	"update.versionMismatch": "The installed version is not the one requested — a mirror or the release-age hold may have substituted it; retry later or install manually",
	"update.downgrade": "Refused: the target version is older than the installed one",
	"update.autoUnavailable": "This host offers no automatic update route; run the command below",
	"update.manualHint": "Or update directly: run npx -y dsh-aside-note install in a terminal, or update from the Plugins page, then reload",
	"update.copyPrompt": "Copy update prompt",
	"update.prompt": "Update the DSH plugin AsideNote to the latest version by running: npx -y dsh-aside-note install."
};

// src/client/i18n/zh.ts
/** Chinese copy — the single source of truth for the message keys. */
const zh = {
	"nav.label": "旁边记",
	"title": "旁边记",
	"popover.title": "旁边记",
	"popover.close": "关闭旁边记",
	"popover.count": "{open} 未完成 · {total} 条",
	"popover.completed": "已完成",
	"popover.clearCancel": "取消",
	"popover.clearConfirm": "清除 {n} 项已完成记录？",
	"popover.clearConfirmAction": "确认清除",
	"popover.clearDone": "清除已完成",
	"popover.local": "便笺数据仅保存在本地",
	"scope.label": "便笺范围",
	"scope.workspace": "工作区",
	"scope.session": "会话",
	"popover.empty.title": "旁边还没有记录",
	"popover.empty.body": "让想法留在对话旁边",
	"settings.open": "设置",
	"settings.title": "设置",
	"settings.about": "关于",
	"settings.tagline": "让想法留在对话旁边",
	"settings.version": "版本",
	"settings.author": "作者",
	"settings.project": "源代码",
	"settings.shortcut": "发送快捷键",
	"settings.shortcutCtrlEnter": "{mod}+Enter 发送，Enter 换行",
	"settings.shortcutEnter": "Enter 发送，{mod}+Enter 换行",
	"settings.forward": "一键转发",
	"settings.forwardPrefixItem": "前缀提示词",
	"settings.forwardPrefixHint": "转发到会话时，若输入框为空，会先写入这段提示词，再追加记录内容；留空则只转发记录内容",
	"settings.privacy": "隐私",
	"settings.analytics": "匿名使用统计",
	"settings.analyticsHint": "只上报面板操作和更新结果，不含便笺内容或会话 ID；关闭后立即停止上报，关闭这一刻会发送最后一条事件",
	"add.placeholder": "随手记一条",
	"add.shortcut": "{mod}+Enter 发送 · Enter 换行",
	"add.shortcutEnter": "Enter 发送 · {mod}+Enter 换行",
	"add.action": "添加",
	"list.open": "未完成",
	"list.allDone.title": "未完成的都清空了",
	"list.allDone.body": "可以继续添加，或展开下方回看已完成",
	"item.markDone": "标记为完成",
	"item.markOpen": "标记为未完成",
	"item.copy": "复制",
	"item.forward": "转发到会话",
	"item.forwarded": "已转发到会话，点击可移除标识",
	"item.edit": "编辑",
	"item.delete": "删除",
	"item.editHint": "双击编辑",
	"edit.save": "保存",
	"edit.cancel": "取消",
	"edit.hintCtrlEnter": "{mod}+Enter 保存 · Enter 换行",
	"edit.hintEnter": "Enter 保存 · {mod}+Enter 换行",
	"time.now": "刚刚",
	"time.minutes": "{n} 分钟前",
	"time.hours": "{n} 小时前",
	"time.days": "{n} 天前",
	"time.createdDone": "{created}创建，{completed}完成",
	"storage.failed": "本地存储不可用，改动不会保留",
	"forward.prefix": "完成以下任务：",
	"resize.width": "调整旁边记宽度",
	"resize.height": "调整旁边记高度",
	"resize.hint": "拖动调整，双击复位",
	"dock.open": "打开旁边记",
	"dock.count": "{n} 项未完成",
	"header.tooltip": "旁边记 · {n} 项未完成",
	"header.tooltipEmpty": "旁边记",
	"toast.copied": "已复制",
	"toast.copyFailed": "复制失败，请重试",
	"toast.forwarded": "已转发到会话",
	"toast.unforwarded": "已取消转发标识",
	"toast.forwardFailed": "没有找到输入框，转发失败",
	"toast.deleted": "已删除",
	"toast.cleared": "已清除已完成",
	"toast.saveFailed": "保存失败，内容没有改动",
	"update.label": "有新版本",
	"update.tip": "新版本 {version} 已发布，点击查看更新说明",
	"update.check": "检查更新",
	"update.checking": "正在检查…",
	"update.retryCheck": "重试检查",
	"update.current": "已是最新版本",
	"update.checkFailed": "检查失败，请稍后重试",
	"update.available": "有新版本 {version}",
	"update.notesTitle": "更新说明",
	"update.notesLoading": "正在读取更新说明…",
	"update.notesMissing": "这个版本还没有可显示的更新说明",
	"update.historyCount": "本次更新包含 {n} 个版本",
	"update.latest": "最新",
	"update.olderNotes": "更早的版本请见完整更新说明",
	"update.notesFailed": "更新说明读取失败，可打开完整更新说明查看",
	"update.full": "完整更新说明",
	"update.now": "立即更新",
	"update.starting": "正在准备更新…",
	"update.waiting": "自动更新正在执行另一个任务，等待中…",
	"update.updating": "正在更新…",
	"update.updatingPercent": "正在更新… {percent}%",
	"update.updated": "已更新到 {version}",
	"update.refresh": "刷新页面",
	"update.restartHint": "请手动重启 DSH 以完成更新",
	"update.failed": "更新失败：{reason}",
	"update.force": "仍要更新",
	"update.tooFresh": "新版本刚发布，自动更新会暂缓安装；可稍后重试，或选择仍要更新",
	"update.unchanged": "自动更新拿到的版本没有变化；可稍后重试，或选择仍要更新",
	"update.notInstalled": "当前 profile 中没有安装这个插件，无法在应用内更新",
	"update.forbidden": "自动更新被拒绝，这次请求没有执行",
	"update.rejected": "自动更新没有执行；link 安装的插件需要在 checkout 中更新后刷新",
	"update.busy": "自动更新正在执行另一个任务，请稍后再试",
	"update.agentsRunning": "有 agent 正在运行，自动更新不会在它运行期间替换插件文件；可以等它结束，或用下面的命令直接更新",
	"update.timeout": "等待更新结果超时，请稍后再试",
	"update.bundleInUse": "这个插件正被当前 DSH 使用中，桌面端不允许先移除再安装；宿主通道会就地覆盖，若仍失败请用下面的命令",
	"update.alreadyInstalled": "这个 DSH 只支持先移除再安装，无法原地覆盖；请用下面的命令",
	"update.managementRequired": "这个 profile 由桌面端自己管理，自动更新无法改动它；请用下面的命令",
	"update.notRemovable": "这个插件由桌面端管理，自动更新不能移除它；请用下面的命令",
	"update.stopProfile": "移除它需要先停止这个 profile；请用下面的命令",
	"update.incompatible": "这个版本与当前 DSH 不兼容，宿主拒绝了安装",
	"update.versionMismatch": "装到的版本与目标不一致（可能被镜像或发布保护替换）；可稍后重试或手动安装",
	"update.downgrade": "拒绝降级：目标版本低于当前已装版本",
	"update.autoUnavailable": "这台宿主没有可用的自动更新通道；请用下面的命令",
	"update.manualHint": "也可以直接更新：在终端执行 npx -y dsh-aside-note install，或到「插件」页更新，装好后刷新页面即可",
	"update.copyPrompt": "拷贝更新提示词",
	"update.prompt": "帮我更新 DSH 插件 AsideNote（旁边记）到最新版本：在终端执行 npx -y dsh-aside-note install。"
};

// src/client/i18n/index.ts
/** Both locales, in the shape `locale.register` expects. */
const DICT = {
	zh,
	en
};
/** Interpolate `{name}` placeholders; an absent value leaves the placeholder alone. */
function fill(template, vars) {
	return String(template).replace(/\{(\w+)\}/g, (match, name) => {
		return vars && vars[name] !== void 0 && vars[name] !== null ? String(vars[name]) : match;
	});
}
/**
* Translate through the locale service, falling back to the bundled copy.
*
* `say` stays string-keyed for now: the panel passes keys through props and
* literal objects, so a stricter key type waits until those call sites settle.
*/
function makeSay(ctx, getLocaleId) {
	const locale = ctx.get("locale");
	const bound = locale && typeof locale.bind === "function" ? locale.bind(NS) : null;
	return (key) => {
		if (bound) try {
			const value = bound(key);
			if (typeof value === "string" && value && value !== key) return value;
		} catch {}
		const language = String(getLocaleId()).split("-")[0];
		return (DICT[language] || DICT.zh)[key] || DICT.zh[key] || key;
	};
}

// src/client/scope.ts
const EMPTY = {
	sessionId: "",
	workspaceId: "",
	title: "",
	sessionIds: []
};
let binding = EMPTY;
const text$2 = (value) => value ? String(value) : "";
/** Resolve the workspace of the captured session; null clears the binding. */
function bindWorkspace(sessionId, workspace) {
	const next = workspace ? {
		sessionId: text$2(sessionId),
		workspaceId: text$2(workspace.workspaceId),
		title: text$2(workspace.title),
		sessionIds: Array.isArray(workspace.sessionIds) ? workspace.sessionIds.map(text$2).filter(Boolean) : []
	} : {
		...EMPTY,
		sessionId: text$2(sessionId)
	};
	if (next.sessionId === binding.sessionId && next.workspaceId === binding.workspaceId && next.title === binding.title && next.sessionIds.join("\0") === binding.sessionIds.join("\0")) return false;
	binding = next;
	return true;
}
/** The workspace list available to this session, or null outside a workspace. */
function workspaceScopeForSession(sessionId) {
	const id = text$2(sessionId);
	if (id && binding.sessionId === id && binding.workspaceId) return {
		kind: "workspace",
		id: binding.workspaceId,
		title: binding.title,
		sessionIds: binding.sessionIds
	};
	return null;
}
/** The list this session reads and writes under the chosen scope mode. */
function scopeForSession(sessionId, mode = "workspace") {
	const workspace = workspaceScopeForSession(sessionId);
	if (workspace && mode !== "session") return workspace;
	const id = text$2(sessionId);
	return {
		kind: "session",
		id,
		title: "",
		sessionIds: id ? [id] : []
	};
}
/** Stable key for the forward marks of one list. */
function scopeKey(scope) {
	if (!scope || !scope.id) return "";
	return scope.kind === "workspace" ? `ws:${scope.id}` : String(scope.id);
}
/**
* Stable key for the drafts of a conversation.
*
* Drafts belong to the workspace, not to the tab the panel is showing: every
* member conversation shares one buffer, so neither switching conversations
* nor switching the workspace/session scope strands half-typed text. The save
* itself still uses the scope selected at that moment. A session outside a
* workspace keeps its own buffer.
*/
function draftKeyForSession(sessionId) {
	const workspace = workspaceScopeForSession(sessionId);
	return workspace ? scopeKey(workspace) : text$2(sessionId);
}

// src/client/domain/forward.ts
/** Append one note to the conversation composer (Lexical contenteditable or textarea). */
/** Session whose conversation is on screen; the dock keeps this current. */
let targetSessionId = "";
/** Point forwarding at the conversation the user currently has open. */
function setForwardTarget(sessionId) {
	targetSessionId = sessionId ? String(sessionId) : "";
}
/** The visible conversation root of the target session, when the host marks one. */
function conversationRoot() {
	if (!targetSessionId) return null;
	for (const node of document.querySelectorAll("[data-conversation-session]")) if (node.getAttribute("data-conversation-session") === targetSessionId) return node;
	return null;
}
function appendToConversation(text, prefix = "") {
	const note = String(text || "").replace(/^\s+|\s+$/g, "");
	if (!note) return false;
	const bullet = `- ${note}`;
	const lead = prefix ? String(prefix).trim() : "";
	const emptyBlock = lead ? `${lead}\n${bullet}` : bullet;
	const visible = (node) => {
		const rect = node.getBoundingClientRect();
		return rect.width > 0 && rect.height > 0;
	};
	const root = conversationRoot() || document;
	const specific = [...root.querySelectorAll("[data-composer-input]")].filter(visible);
	const editor = (specific.length ? specific : [...root.querySelectorAll("[contenteditable=\"true\"][role=\"textbox\"], textarea[role=\"textbox\"]")].filter(visible))[0];
	if (!editor) return false;
	/** Payload for a composer whose current plain text is `current`. */
	const payloadFor = (current) => {
		const value = typeof current === "string" ? current : "";
		if (!value.trim()) return emptyBlock;
		return value.endsWith("\n") ? bullet : `\n${bullet}`;
	};
	if (editor.tagName === "TEXTAREA") {
		const textarea = editor;
		const current = textarea.value;
		const payload = payloadFor(current);
		Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").set.call(textarea, `${current}${payload}`);
		textarea.dispatchEvent(new Event("input", { bubbles: true }));
		textarea.focus();
		const end = textarea.value.length;
		textarea.setSelectionRange(end, end);
		return true;
	}
	const payload = payloadFor(typeof editor.innerText === "string" ? editor.innerText : "");
	editor.focus();
	try {
		const range = document.createRange();
		range.selectNodeContents(editor);
		range.collapse(false);
		const selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
	} catch {}
	try {
		const data = new DataTransfer();
		data.setData("text/plain", payload);
		const event = new ClipboardEvent("paste", {
			bubbles: true,
			cancelable: true,
			clipboardData: data
		});
		if (!editor.dispatchEvent(event)) return true;
	} catch {}
	try {
		return document.execCommand("insertText", false, payload);
	} catch {
		return false;
	}
}

// src/client/storage/drafts.ts
/**
* Unsaved add/edit drafts, so closing the panel never loses text.
*
* Records are keyed by draft scope, not by conversation: inside a workspace
* every member session shares one buffer (`ws:<workspaceId>`), so switching
* conversations or the workspace/session scope never strands half-typed text.
* A session outside a workspace keeps its own key. Saving still writes the
* list selected at that moment. The map field stays `sessions` so the existing
* store keeps its shape.
*/
const keyOf = (value) => value ? String(value) : "";
/** Empty unsaved-draft store. */
function emptyDraftStore() {
	return {
		version: 1,
		sessions: {}
	};
}
/** Read the unsaved add/edit drafts; corrupt or unavailable reads as empty. */
function readDraftStore() {
	const ls = storage();
	if (!ls) return emptyDraftStore();
	try {
		const raw = ls.getItem(DRAFT_STORAGE_KEY);
		if (!raw) return emptyDraftStore();
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return emptyDraftStore();
		const sessions = parsed.sessions;
		if (!sessions || typeof sessions !== "object" || Array.isArray(sessions)) return emptyDraftStore();
		return {
			version: 1,
			sessions
		};
	} catch {
		return emptyDraftStore();
	}
}
function writeDraftStore(store) {
	const ls = storage();
	if (!ls) return;
	try {
		ls.setItem(DRAFT_STORAGE_KEY, JSON.stringify(store));
	} catch {}
}
/** Unsaved add/edit drafts of one scope (a workspace or a lone session). */
function readScopeDrafts(key) {
	const id = keyOf(key);
	const record = id ? readDraftStore().sessions[id] : null;
	if (!record || typeof record !== "object" || Array.isArray(record)) return {
		add: "",
		edits: {}
	};
	return {
		add: typeof record.add === "string" ? record.add : "",
		edits: record.edits && typeof record.edits === "object" && !Array.isArray(record.edits) ? record.edits : {}
	};
}
function pruneDraftScope(store, key) {
	const record = store.sessions[key];
	if (!record) return;
	const hasAdd = typeof record.add === "string" && record.add.length > 0;
	const hasEdits = record.edits && typeof record.edits === "object" && Object.keys(record.edits).length > 0;
	if (!hasAdd && !hasEdits) delete store.sessions[key];
}
function saveAddDraft(key, text) {
	const id = keyOf(key);
	if (!id) return;
	const store = readDraftStore();
	const record = store.sessions[id] || {};
	const value = String(text || "").slice(0, 280);
	if (value) record.add = value;
	else delete record.add;
	record.edits = record.edits && typeof record.edits === "object" ? record.edits : {};
	store.sessions[id] = record;
	pruneDraftScope(store, id);
	writeDraftStore(store);
}
function clearAddDraft(key) {
	saveAddDraft(key, "");
}
function readEditDraft(key, itemId) {
	const id = keyOf(key);
	if (!id || !itemId) return null;
	const edits = readScopeDrafts(id).edits;
	return typeof edits[itemId] === "string" ? edits[itemId] : null;
}
function saveEditDraft(key, itemId, text) {
	const id = keyOf(key);
	if (!id || !itemId) return;
	const store = readDraftStore();
	const record = store.sessions[id] || {};
	record.edits = record.edits && typeof record.edits === "object" ? record.edits : {};
	record.edits[itemId] = String(text || "").slice(0, 280);
	store.sessions[id] = record;
	writeDraftStore(store);
}
function clearEditDraft(key, itemId) {
	const id = keyOf(key);
	if (!id || !itemId) return;
	const store = readDraftStore();
	const record = store.sessions[id];
	if (!record || !record.edits || typeof record.edits !== "object") return;
	delete record.edits[itemId];
	pruneDraftScope(store, id);
	writeDraftStore(store);
}
/**
* Move a conversation's pre-workspace draft under the shared workspace key.
*
* Runs once per workspace: the draft the user is looking at becomes the shared
* buffer, and the workspace members' per-session copies are retired so that
* clearing the buffer cannot resurrect them. A no-op outside a workspace, once
* the shared key exists, or when the legacy record holds no text.
*/
function ensureDraftScope(key, sessionId, sessionIds) {
	const target = keyOf(key);
	const source = keyOf(sessionId);
	if (!target || !source || target === source) return false;
	const members = (Array.isArray(sessionIds) ? sessionIds : []).map(keyOf).filter(Boolean);
	const store = readDraftStore();
	if (store.sessions[target]) return false;
	const legacy = store.sessions[source];
	if (!legacy || typeof legacy !== "object" || Array.isArray(legacy)) return false;
	const add = typeof legacy.add === "string" ? legacy.add.slice(0, 280) : "";
	const edits = {};
	const legacyEdits = legacy.edits && typeof legacy.edits === "object" && !Array.isArray(legacy.edits) ? legacy.edits : {};
	for (const [itemId, text] of Object.entries(legacyEdits)) {
		if (!itemId || typeof text !== "string") continue;
		edits[itemId] = text.slice(0, 280);
	}
	const editCount = Object.keys(edits).length;
	if (!add && !editCount) return false;
	store.sessions[target] = {
		...add ? { add } : {},
		...editCount ? { edits } : {}
	};
	for (const member of members) delete store.sessions[member];
	delete store.sessions[source];
	writeDraftStore(store);
	return true;
}

// src/client/domain/id.ts
/** Stable ids for notes and drafts. */
function uid() {
	try {
		if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") return globalThis.crypto.randomUUID();
	} catch {}
	return `todo-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

// src/client/domain/items.ts
/** Note shape, ordering and relative time copy. */
/**
* Sanitize one session's notes. The store is user-editable, so treat
* every field defensively and preserve the authored order.
*/
function normalizeItems(items) {
	if (!Array.isArray(items)) return [];
	const seen = /* @__PURE__ */ new Set();
	const normalized = [];
	for (const raw of items) {
		if (!raw || typeof raw !== "object") continue;
		const text = String(raw.text || "").trim().slice(0, 280);
		if (!text) continue;
		let id = typeof raw.id === "string" && raw.id ? raw.id : uid();
		if (seen.has(id)) id = uid();
		seen.add(id);
		const done = raw.done === true;
		const createdAt = Number.isFinite(raw.createdAt) ? raw.createdAt : Date.now();
		const updatedAt = Number.isFinite(raw.updatedAt) ? raw.updatedAt : createdAt;
		normalized.push({
			id,
			text,
			done,
			createdAt,
			updatedAt,
			...done && Number.isFinite(raw.completedAt) ? { completedAt: raw.completedAt } : {}
		});
		if (normalized.length >= 300) break;
	}
	return normalized;
}
/** Relative age copy for a note's creation stamp. */
function ageLabel(time, say, localeId) {
	const stamp = Number.isFinite(time) ? time : Date.now();
	const elapsed = Math.max(0, Date.now() - stamp);
	if (elapsed < 6e4) return say("time.now");
	const minutes = Math.floor(elapsed / 6e4);
	if (minutes < 60) return say("time.minutes", { n: minutes });
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return say("time.hours", { n: hours });
	const days = Math.floor(hours / 24);
	if (days < 7) return say("time.days", { n: days });
	try {
		return new Intl.DateTimeFormat(localeId, {
			month: "short",
			day: "numeric"
		}).format(stamp);
	} catch {
		return "";
	}
}
/**
* Best-known completion stamp for a done note. Newer records carry
* `completedAt`; older ones only have `updatedAt`, so fall back in order
* until a finite time is found. Returns 0 when the item has no usable stamp.
*/
function completedStamp(item) {
	if (!item) return 0;
	const candidates = [
		item.completedAt,
		item.updatedAt,
		item.createdAt
	];
	for (const time of candidates) if (Number.isFinite(time)) return time;
	return 0;
}
/** Newest completion first; updatedAt then createdAt keep equal stamps stable. */
function compareDoneItems(a, b) {
	const byCompletion = completedStamp(b) - completedStamp(a);
	if (byCompletion) return byCompletion;
	const aUpdated = Number.isFinite(a && a.updatedAt) ? a.updatedAt : 0;
	const bUpdated = Number.isFinite(b && b.updatedAt) ? b.updatedAt : 0;
	if (aUpdated !== bUpdated) return bUpdated - aUpdated;
	const aCreated = Number.isFinite(a && a.createdAt) ? a.createdAt : 0;
	return (Number.isFinite(b && b.createdAt) ? b.createdAt : 0) - aCreated;
}
/** Done notes show creation and completion age; open ones show creation age only. */
function metaLabel(item, say, localeId) {
	const created = ageLabel(item && item.createdAt, say, localeId);
	if (!item || item.done !== true) return created;
	return say("time.createdDone", {
		created,
		completed: ageLabel(completedStamp(item) || (item ? item.createdAt : 0), say, localeId)
	});
}

// src/client/storage/events.ts
/**
* Same-tab change bus.
*
* The `storage` event only crosses tabs, so a write here wakes the readers in
* this tab — the header count and an open panel.
*/
/** Same-tab subscribers, so the composer dock's count follows panel edits. */
const TODO_LISTENERS = /* @__PURE__ */ new Set();
/** Notify same-tab readers after a successful write (storage events only cross tabs). */
function notifyTodoChange() {
	for (const listener of TODO_LISTENERS) try {
		listener();
	} catch (error) {
		console.error("dsh-aside-note: listener failed", error);
	}
}

// src/client/storage/session.ts
/**
* Session-scoped notes in one localStorage record.
*
* The shape stays at v1: workspace notes now live under
* `WORKSPACE_STORAGE_KEY`, so the session key existing users already have is
* never rewritten into a new schema.
*/
/** Empty note store. */
function emptySessionStore() {
	return {
		version: 1,
		sessions: {}
	};
}
const bucket$1 = (value) => value && typeof value === "object" && !Array.isArray(value) ? value : {};
/** Read the whole note store; corrupt or unavailable reads as empty. */
function readSessionStore() {
	const ls = storage();
	if (!ls) return emptySessionStore();
	try {
		const raw = ls.getItem(SESSION_STORAGE_KEY);
		if (!raw) return emptySessionStore();
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return emptySessionStore();
		return {
			version: 1,
			sessions: bucket$1(parsed.sessions)
		};
	} catch {
		return emptySessionStore();
	}
}
/** Persist the whole session store; the single writer for this key. */
function writeSessionStore(store) {
	const ls = storage();
	if (!ls) return false;
	try {
		ls.setItem(SESSION_STORAGE_KEY, JSON.stringify({
			version: 1,
			sessions: bucket$1(store && store.sessions)
		}));
		notifyTodoChange();
		return true;
	} catch {
		return false;
	}
}
/** Read one session's memo record. */
function readSessionRecord(sessionId) {
	const key = sessionId ? String(sessionId) : "";
	if (!key) return {
		items: [],
		updatedAt: 0
	};
	const record = readSessionStore().sessions[key];
	return {
		items: normalizeItems(record && record.items),
		updatedAt: record && Number.isFinite(record.updatedAt) ? record.updatedAt : 0
	};
}
/** Persist one session's memo record. */
function writeSessionRecord(sessionId, record) {
	const key = sessionId ? String(sessionId) : "";
	if (!key) return false;
	const store = readSessionStore();
	store.sessions[key] = {
		sessionId: key,
		updatedAt: record.updatedAt || Date.now(),
		items: normalizeItems(record.items)
	};
	return writeSessionStore(store);
}

// src/client/storage/workspace.ts
/**
* Workspace-scoped notes.
*
* Stored under `WORKSPACE_STORAGE_KEY`, beside the session key, so adding
* workspace lists never changes the shape of existing per-session data. One
* list is shared by every session of a workspace. The first time a workspace
* is seen, notes already written per session are folded in once;
* `seededSessionIds` records that so a later delete is not undone by the merge
* running again.
*/
const text$1 = (value) => value ? String(value) : "";
const bucket = (value) => value && typeof value === "object" && !Array.isArray(value) ? value : {};
function seededOf(record) {
	const raw = record && record.seededSessionIds;
	if (!Array.isArray(raw)) return [];
	const seen = /* @__PURE__ */ new Set();
	const next = [];
	for (const value of raw) {
		const id = text$1(value);
		if (!id || seen.has(id)) continue;
		seen.add(id);
		next.push(id);
	}
	return next;
}
/** Empty workspace-note store. */
function emptyWorkspaceStore() {
	return {
		version: 1,
		workspaces: {}
	};
}
/** Read the workspace-note store; corrupt or unavailable reads as empty. */
function readWorkspaceStore() {
	const ls = storage();
	if (!ls) return emptyWorkspaceStore();
	try {
		const raw = ls.getItem(WORKSPACE_STORAGE_KEY);
		if (!raw) return emptyWorkspaceStore();
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return emptyWorkspaceStore();
		return {
			version: 1,
			workspaces: bucket(parsed.workspaces)
		};
	} catch {
		return emptyWorkspaceStore();
	}
}
/** Persist the whole workspace-note store. */
function writeWorkspaceStore(store) {
	const ls = storage();
	if (!ls) return false;
	try {
		ls.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify({
			version: 1,
			workspaces: bucket(store && store.workspaces)
		}));
		notifyTodoChange();
		return true;
	} catch {
		return false;
	}
}
/** One workspace's memo record. */
function readWorkspaceRecord(workspaceId) {
	const key = text$1(workspaceId);
	if (!key) return {
		items: [],
		updatedAt: 0,
		seededSessionIds: []
	};
	const record = readWorkspaceStore().workspaces[key];
	return {
		items: normalizeItems(record && record.items),
		updatedAt: record && Number.isFinite(record.updatedAt) ? record.updatedAt : 0,
		seededSessionIds: seededOf(record)
	};
}
/** Persist one workspace's memo record. */
function writeWorkspaceRecord(workspaceId, record) {
	const key = text$1(workspaceId);
	if (!key) return false;
	const store = readWorkspaceStore();
	const previous = store.workspaces[key];
	const seededSource = Array.isArray(record.seededSessionIds) ? record : previous;
	store.workspaces[key] = {
		workspaceId: key,
		updatedAt: record.updatedAt || Date.now(),
		items: normalizeItems(record.items),
		seededSessionIds: seededOf(seededSource)
	};
	return writeWorkspaceStore(store);
}
/**
* Fold the member sessions' existing notes into the workspace list once.
* Returns whether the store changed; repeated calls are cheap and idempotent.
*/
function ensureWorkspaceRecord(workspaceId, sessionIds) {
	const key = text$1(workspaceId);
	if (!key) return false;
	const previous = readWorkspaceStore().workspaces[key];
	const seeded = new Set(seededOf(previous));
	const items = normalizeItems(previous && previous.items);
	const seen = new Set(items.map((item) => item.id));
	let changed = !previous;
	if (!changed && Array.isArray(sessionIds)) for (const value of sessionIds) {
		const sessionId = text$1(value);
		if (!sessionId) continue;
		if (!seeded.has(sessionId)) {
			changed = true;
			break;
		}
	}
	if (!changed) return false;
	const sessionStore = readSessionStore();
	for (const value of Array.isArray(sessionIds) ? sessionIds : []) {
		const sessionId = text$1(value);
		if (!sessionId || seeded.has(sessionId)) continue;
		seeded.add(sessionId);
		changed = true;
		const sessionRecord = sessionStore.sessions[sessionId];
		for (const item of normalizeItems(sessionRecord && sessionRecord.items)) {
			if (seen.has(item.id)) continue;
			seen.add(item.id);
			items.push(item);
		}
	}
	return writeWorkspaceRecord(key, {
		items,
		updatedAt: previous && Number.isFinite(previous.updatedAt) ? previous.updatedAt : Date.now(),
		seededSessionIds: [...seeded]
	});
}

// src/client/ui/primitives.ts
/**
* Shared glyphs and the tooltip wrapper.
*
* Glyphs come from the product icon set; this plugin draws none of its own, so
* stroke weight, optical size and currentColor stay consistent with the shell.
* Tooltip and Toast are the seeded primitives — the bundle keeps them external.
*/
const h$12 = react.default.createElement;
const PRIMITIVES = _deepseek_ai_dsh_client_ui_primitives;
const Tooltip = typeof PRIMITIVES.Tooltip === "function" ? PRIMITIVES.Tooltip : null;
const Toast = typeof PRIMITIVES.Toast === "function" ? PRIMITIVES.Toast : null;
const icon = (name) => typeof PRIMITIVES[name] === "function" ? PRIMITIVES[name] : null;
/**
* Glyphs come from the shared product icon set; this plugin draws none of
* its own, so stroke weight, optical size and currentColor stay consistent
* with the surrounding shell.
*/
function Glyph(props) {
	const Component = icon(props.name);
	if (!Component) return null;
	return h$12(Component, { size: props.size });
}
const IconCheck = (props) => h$12(Glyph, {
	name: "IconCheckOutlineMedium",
	size: props && props.size ? props.size : 12
});
const IconCopy = () => h$12(Glyph, {
	name: "IconCopyOutlineRegular",
	size: 14
});
const IconForward = () => h$12(Glyph, {
	name: "IconShareOutlineRegular",
	size: 14
});
const IconGear = () => h$12(Glyph, {
	name: "IconSettingsOutlineRegular",
	size: 14
});
const IconPencil = () => h$12(Glyph, {
	name: "IconEditOutlineRegular",
	size: 14
});
const IconTrash = () => h$12(Glyph, {
	name: "IconTrashOutlineRegular",
	size: 14
});
const IconChevron = () => h$12(Glyph, {
	name: "IconChevronRightOutlineRegular",
	size: 12
});
const IconEmpty = () => h$12(Glyph, {
	name: "IconChecklistOutlineRegular",
	size: 18
});
const IconClose = () => h$12(Glyph, {
	name: "IconCloseOutlineRegular",
	size: 14
});
/** Wrap one icon-only control in the shared tooltip; a bare button when absent. */
function withTooltip(label, node) {
	if (!Tooltip) return node;
	return h$12(Tooltip, {
		label,
		side: "top",
		portal: true,
		gap: 6
	}, node);
}

// src/client/ui/toastSeat.ts
/** Frame-wide toast seat: one notice at a time, dismissed when it fades. */
const h$11 = react.default.createElement;
const TOAST_COPY = {
	copied: {
		key: "toast.copied",
		tone: "success"
	},
	forwarded: {
		key: "toast.forwarded",
		tone: "success"
	},
	unforwarded: {
		key: "toast.unforwarded",
		tone: "success"
	},
	deleted: {
		key: "toast.deleted",
		tone: "success"
	},
	cleared: {
		key: "toast.cleared",
		tone: "success"
	},
	copyFailed: { key: "toast.copyFailed" },
	forwardFailed: { key: "toast.forwardFailed" },
	saveFailed: { key: "toast.saveFailed" }
};
const WarningIcon = icon("IconWarningOutlineRegular");
/**
* Settled outcomes (copy, forward, delete, write failure) live in the frame,
* not inside the panel: the panel unmounts on close, the banner must not.
*/
function createToastSeat(tr) {
	const source = (() => {
		let notice = null;
		let sequence = 0;
		const listeners = /* @__PURE__ */ new Set();
		const publish = (next) => {
			notice = next;
			for (const listener of listeners) listener();
		};
		return {
			hooks: { notice: {
				getSnapshot: () => notice,
				subscribe: (listener) => {
					listeners.add(listener);
					return () => {
						listeners.delete(listener);
					};
				}
			} },
			show(kind) {
				sequence += 1;
				publish({
					kind,
					sequence
				});
			},
			dismiss() {
				publish(null);
			}
		};
	})();
	/** The slot the layout mounts once; it owns the only visible notice. */
	function ToastHost(props) {
		const notice = react.default.useSyncExternalStore(source.hooks.notice.subscribe, source.hooks.notice.getSnapshot);
		if (!notice || !Toast) return null;
		const copy = TOAST_COPY[notice.kind] || TOAST_COPY.saveFailed;
		const bound = props && typeof props.t === "function" ? props.t(copy.key) : "";
		const text = bound && bound !== copy.key ? bound : tr(copy.key);
		return h$11(Toast, {
			key: notice.sequence,
			text,
			tone: copy.tone,
			icon: copy.tone ? void 0 : WarningIcon ? h$11(WarningIcon, { size: 16 }) : void 0,
			onDone: source.dismiss
		});
	}
	return {
		show: source.show,
		ToastHost
	};
}

// src/client/ui/headerEntry.ts
/**
* The host-owned notes button in the conversation header.
*
* It is a plain DOM node beside the shell's utilities row: a React portal there
* would be reconciled away. The glyph is inlined for the same reason.
*/
const HEADER_ICON = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3.25 2.75h6.5l3 3v7.5c0 .55-.45 1-1 1H3.25c-.55 0-1-.45-1-1V3.75c0-.55.45-1 1-1Z\"/><path d=\"M9.75 2.75v3h3\"/><path d=\"M4.9 7.6h5.4M4.9 9.9h3.6\" stroke-linecap=\"round\"/></svg>";
function createHeaderEntry({ getSessionId, getActiveAnchor, getLocaleId, tr, onOpen }) {
	const refresh = () => {
		const sessionId = getSessionId();
		const host = document.querySelector("[class*=\"_headerUtilities\"]");
		let button = host ? host.querySelector(":scope > .dsh-an-headerBtn") : null;
		if (!host || !sessionId) {
			if (button) button.remove();
			return;
		}
		const scope = scopeForSession(sessionId, readScopeMode());
		const store = readSessionStore();
		const open = (scope.kind === "workspace" ? readWorkspaceRecord(scope.id).items : normalizeItems(store.sessions[sessionId] && store.sessions[sessionId].items)).filter((item) => !item.done).length;
		if (!button) {
			button = document.createElement("button");
			button.type = "button";
			button.className = "dsh-an-headerBtn";
			button.addEventListener("pointerdown", (event) => event.stopPropagation());
			button.addEventListener("click", (event) => {
				event.preventDefault();
				event.stopPropagation();
				onOpen(getSessionId(), button);
			});
			host.appendChild(button);
		}
		button.dataset.active = getActiveAnchor() === button ? "true" : "false";
		button.dataset.scope = scope.kind;
		const signature = `${getLocaleId()}:${scopeKey(scope)}:${open}`;
		if (button.dataset.signature !== signature) {
			const icon = document.createElement("span");
			icon.className = "dsh-an-headerIcon";
			icon.innerHTML = HEADER_ICON;
			button.replaceChildren(icon);
			if (open > 0) {
				const count = document.createElement("span");
				count.className = "dsh-an-headerCount";
				count.textContent = open > 99 ? "99+" : String(open);
				button.appendChild(count);
			}
			button.dataset.signature = signature;
		}
		button.dataset.sessionId = sessionId;
		button.title = open > 0 ? tr("header.tooltip", { n: open }) : tr("header.tooltipEmpty");
		button.setAttribute("aria-label", open > 0 ? `${tr("dock.open")}, ${tr("dock.count", { n: open })}` : tr("dock.open"));
	};
	/** Watch the store, the DOM and the viewport; returns the cleanup. */
	const attach = (onDispose) => {
		let scheduled = false;
		const schedule = () => {
			if (scheduled) return;
			scheduled = true;
			requestAnimationFrame(() => {
				scheduled = false;
				refresh();
			});
		};
		const onStorage = (event) => {
			if (event.key === "dsh.aside-note" || event.key === "dsh.aside-note.workspaces" || event.key === "dsh.aside-note.scope-mode") schedule();
		};
		TODO_LISTENERS.add(schedule);
		window.addEventListener("storage", onStorage);
		const observer = new MutationObserver(schedule);
		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
		refresh();
		return () => {
			TODO_LISTENERS.delete(schedule);
			window.removeEventListener("storage", onStorage);
			observer.disconnect();
			onDispose();
			for (const button of document.querySelectorAll(".dsh-an-headerBtn")) button.remove();
		};
	};
	return {
		refresh,
		attach
	};
}

// src/client/ui/useSessionMemoStore.ts
/** Notes for the active scope plus a synchronous writer that never invents state. */
/** Read the record the current scope renders. */
function readScope(scope) {
	return scope.kind === "workspace" ? readWorkspaceRecord(scope.id) : readSessionRecord(scope.id);
}
/** Write the record the current scope renders. */
function writeScope(scope, record) {
	return scope.kind === "workspace" ? writeWorkspaceRecord(scope.id, record) : writeSessionRecord(scope.id, record);
}
/** Notes of one list (a workspace, or a single session) and their writer. */
function useMemoStore(scope) {
	const kind = scope && scope.kind === "workspace" ? "workspace" : "session";
	const id = scope && scope.id ? String(scope.id) : "";
	const scopeRef = react.default.useRef({
		kind,
		id
	});
	scopeRef.current = {
		kind,
		id
	};
	const [record, setRecord] = react.default.useState(() => readScope(scopeRef.current));
	const [syncError, setSyncError] = react.default.useState(false);
	const recordRef = react.default.useRef(record);
	recordRef.current = record;
	react.default.useEffect(() => {
		setRecord(readScope(scopeRef.current));
		setSyncError(false);
	}, [kind, id]);
	react.default.useEffect(() => {
		const onStorage = (event) => {
			if (event.key !== "dsh.aside-note" && event.key !== "dsh.aside-note.workspaces") return;
			setRecord(readScope(scopeRef.current));
		};
		const onLocal = () => setRecord(readScope(scopeRef.current));
		TODO_LISTENERS.add(onLocal);
		window.addEventListener("storage", onStorage);
		return () => {
			TODO_LISTENERS.delete(onLocal);
			window.removeEventListener("storage", onStorage);
		};
	}, []);
	return {
		record,
		syncError,
		commit: react.default.useCallback((updater) => {
			const current = recordRef.current || {
				items: [],
				updatedAt: 0
			};
			const nextItems = normalizeItems(updater(current.items || []));
			const next = {
				...current,
				items: nextItems,
				updatedAt: Date.now()
			};
			const ok = writeScope(scopeRef.current, next);
			setSyncError(!ok);
			if (!ok) return false;
			recordRef.current = next;
			setRecord(next);
			return true;
		}, [])
	};
}

// src/client/ui/position.ts
/**
* Mark the section head that is actually pinned to the scroller's top edge.
* Sticky heads stay transparent in flow; only the pinned one takes the menu
* group-header fill, so no full-width layer sits over the list at rest.
*/
function syncStickyHeads(node) {
	const areaTop = node.getBoundingClientRect().top;
	for (const head of node.querySelectorAll(".dsh-an-sectionHead, .dsh-an-doneHead")) {
		const section = head.parentElement;
		if (!section) continue;
		const rect = section.getBoundingClientRect();
		head.toggleAttribute("data-stuck", rect.top < areaTop && rect.bottom > areaTop);
	}
}
/**
* Frame-owned top safety margin for floating surfaces. Read from the layout
* rather than baked in, so macOS window chrome and the Windows titlebar both
* keep their clearance without this page touching the global variable.
*/
function overlayTopFloor(margin) {
	try {
		const raw = getComputedStyle(document.body).getPropertyValue("--dsh-frame-overlay-top").trim();
		const value = Number.parseFloat(raw);
		if (Number.isFinite(value) && value > 0) return Math.max(margin, value);
	} catch {}
	return margin;
}
/**
* Fixed panel placement: a right-side panel for the experimental entry,
* otherwise below the anchor. Both stay inside the viewport margin, and the
* gap side is only abandoned when the opposite side genuinely fits.
*/
function memoPopoverStyle(anchor, placement, requestedWidth, requestedHeight) {
	const margin = window.innerWidth <= 480 ? 12 : 16;
	const topFloor = overlayTopFloor(margin);
	const available = Math.max(280, window.innerWidth - margin * 2);
	const width = Math.max(280, Math.min(720, available, requestedWidth || 360));
	if (placement === "right") {
		const rect = anchor && anchor.isConnected ? anchor.getBoundingClientRect() : null;
		let desiredRight = rect && rect.width > 0 ? rect.right : window.innerWidth - margin;
		const sidebar = [...document.querySelectorAll("[data-sidebar-right-panel][data-sidebar-right-open]")].find((node) => {
			const box = node.getBoundingClientRect();
			return box.width > 24 && box.left > 0 && box.left < window.innerWidth - 24;
		});
		if (sidebar) desiredRight = Math.min(desiredRight, sidebar.getBoundingClientRect().left - 8);
		const rightInset = Math.max(margin, Math.min(window.innerWidth - margin, window.innerWidth - desiredRight));
		const top = rect && rect.width > 0 ? Math.max(topFloor, Math.round(rect.bottom + 8)) : topFloor;
		const maxHeight = Math.max(160, window.innerHeight - top - margin);
		const height = requestedHeight ? Math.max(Math.min(240, maxHeight), Math.min(maxHeight, requestedHeight)) : 0;
		const style = {
			right: `${rightInset}px`,
			left: "auto",
			top: `${top}px`,
			width: `${width}px`,
			maxHeight: `${maxHeight}px`
		};
		if (height) style.height = `${height}px`;
		return style;
	}
	const maxHeight = Math.max(160, Math.min(460, window.innerHeight - topFloor - margin));
	if (!anchor) return {
		left: `${margin}px`,
		top: `${topFloor}px`,
		width: `${width}px`,
		maxHeight: `${maxHeight}px`
	};
	const rect = anchor.getBoundingClientRect();
	const left = rect.left < 420 ? Math.max(margin, rect.left) : Math.max(margin, Math.min(rect.right - width, window.innerWidth - width - margin));
	let top = rect.bottom + 8;
	if (top + maxHeight > window.innerHeight - margin) top = Math.max(topFloor, rect.top - maxHeight - 8);
	return {
		left: `${left}px`,
		top: `${top}px`,
		width: `${width}px`,
		maxHeight: `${maxHeight}px`
	};
}

// src/client/ui/usePanelGeometry.ts
/** Panel geometry: remembered width/height, pointer and keyboard resize, placement. */
function usePanelGeometry(anchorRef, placement, panelRef) {
	const [panelWidth, setPanelWidth] = react.default.useState(readPanelWidth);
	const [panelHeight, setPanelHeight] = react.default.useState(readPanelHeight);
	const [style, setStyle] = react.default.useState(() => memoPopoverStyle(anchorRef.current, placement, panelWidth, panelHeight));
	const panelWidthRef = react.default.useRef(panelWidth);
	const panelHeightRef = react.default.useRef(panelHeight);
	const lastStyleRef = react.default.useRef("");
	const updatePosition = react.default.useCallback(() => {
		if (anchorRef.current || placement === "right") {
			const next = memoPopoverStyle(anchorRef.current, placement, panelWidth, panelHeight);
			const key = JSON.stringify(next);
			if (key === lastStyleRef.current) return;
			lastStyleRef.current = key;
			setStyle(next);
		}
	}, [
		anchorRef,
		placement,
		panelWidth,
		panelHeight
	]);
	react.default.useEffect(() => {
		panelWidthRef.current = panelWidth;
	}, [panelWidth]);
	react.default.useEffect(() => {
		panelHeightRef.current = panelHeight;
	}, [panelHeight]);
	const clampPanelWidth = (value) => {
		const max = Math.min(720, Math.max(280, window.innerWidth - 32));
		return Math.max(280, Math.min(max, value));
	};
	const commitPanelWidth = (value) => {
		const next = clampPanelWidth(value);
		panelWidthRef.current = next;
		setPanelWidth(next);
		writePanelWidth(next);
	};
	const startPanelResize = (event) => {
		if (event.button !== 0) return;
		event.preventDefault();
		const startX = event.clientX;
		const startWidth = panelWidthRef.current;
		const onMove = (moveEvent) => {
			const next = clampPanelWidth(startWidth + (startX - moveEvent.clientX));
			panelWidthRef.current = next;
			setPanelWidth(next);
		};
		const onUp = () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onUp);
			document.body.style.userSelect = "";
			document.body.style.cursor = "";
			writePanelWidth(panelWidthRef.current);
		};
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onUp, { once: true });
		document.body.style.userSelect = "none";
		document.body.style.cursor = "ew-resize";
	};
	const onPanelResizeKeyDown = (event) => {
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			commitPanelWidth(panelWidthRef.current + 16);
		} else if (event.key === "ArrowRight") {
			event.preventDefault();
			commitPanelWidth(panelWidthRef.current - 16);
		} else if (event.key === "Home") {
			event.preventDefault();
			commitPanelWidth(360);
		}
	};
	const clampPanelHeight = (value) => {
		const max = Math.max(240, window.innerHeight - 64 - 16);
		return Math.max(240, Math.min(max, value));
	};
	const commitPanelHeight = (value) => {
		const next = value > 0 ? clampPanelHeight(value) : 0;
		panelHeightRef.current = next;
		setPanelHeight(next);
		writePanelHeight(next);
	};
	const startPanelHeightResize = (event) => {
		if (event.button !== 0) return;
		event.preventDefault();
		const startY = event.clientY;
		const startHeight = panelHeightRef.current || (panelRef.current ? panelRef.current.getBoundingClientRect().height : 360);
		const onMove = (moveEvent) => {
			const next = clampPanelHeight(startHeight + (moveEvent.clientY - startY));
			panelHeightRef.current = next;
			setPanelHeight(next);
		};
		const onUp = () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onUp);
			document.body.style.userSelect = "";
			document.body.style.cursor = "";
			writePanelHeight(panelHeightRef.current);
		};
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onUp, { once: true });
		document.body.style.userSelect = "none";
		document.body.style.cursor = "ns-resize";
	};
	const onPanelHeightKeyDown = (event) => {
		if (event.key === "ArrowDown") {
			event.preventDefault();
			commitPanelHeight((panelHeightRef.current || 360) + 16);
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			commitPanelHeight((panelHeightRef.current || 360) - 16);
		} else if (event.key === "Home") {
			event.preventDefault();
			commitPanelHeight(0);
		}
	};
	react.default.useLayoutEffect(() => {
		updatePosition();
		window.addEventListener("resize", updatePosition);
		window.addEventListener("scroll", updatePosition, true);
		return () => {
			window.removeEventListener("resize", updatePosition);
			window.removeEventListener("scroll", updatePosition, true);
		};
	}, [updatePosition]);
	react.default.useEffect(() => {
		const anchor = anchorRef.current;
		if (!anchor || typeof ResizeObserver !== "function") return void 0;
		const target = anchor.closest("[class*=\"_header\"]") || anchor;
		const observer = new ResizeObserver(updatePosition);
		observer.observe(target);
		return () => observer.disconnect();
	}, [anchorRef, updatePosition]);
	react.default.useEffect(() => {
		const timer = window.setInterval(updatePosition, 400);
		return () => window.clearInterval(timer);
	}, [updatePosition]);
	return {
		style,
		commitPanelWidth,
		commitPanelHeight,
		startPanelResize,
		startPanelHeightResize,
		onPanelResizeKeyDown,
		onPanelHeightKeyDown
	};
}

// src/client/ui/useSections.ts
/** Open/completed section visibility, remembered across panel opens. */
function useSections() {
	const [initial] = react.default.useState(readSectionState);
	const [showOpen, setShowOpen] = react.default.useState(initial.open);
	const [showDone, setShowDone] = react.default.useState(initial.done);
	const sectionsRef = react.default.useRef(initial);
	/** Apply one section state and remember it right away, using the next value. */
	const applySections = (next) => {
		sectionsRef.current = next;
		setShowOpen(next.open);
		setShowDone(next.done);
		writeSectionState(next);
	};
	return {
		sectionsRef,
		showOpen,
		showDone,
		applySections,
		toggleOpen: () => applySections({
			open: !sectionsRef.current.open,
			done: sectionsRef.current.done
		}),
		toggleDone: () => applySections({
			open: sectionsRef.current.open,
			done: !sectionsRef.current.done
		})
	};
}

// src/client/storage/forwarded.ts
/** Per-session forwarded marks behind the forward button. */
/** Empty forwarded-flag store; shape is { version, sessions: { [sessionId]: { [itemId]: true } } }. */
function emptyForwardedStore() {
	return {
		version: 1,
		sessions: {}
	};
}
/** Read the forwarded-flag store; corrupt or unavailable reads as empty. */
function readForwardedStore() {
	const ls = storage();
	if (!ls) return emptyForwardedStore();
	try {
		const raw = ls.getItem(FORWARDED_STORAGE_KEY);
		if (!raw) return emptyForwardedStore();
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return emptyForwardedStore();
		const sessions = parsed.sessions;
		if (!sessions || typeof sessions !== "object" || Array.isArray(sessions)) return emptyForwardedStore();
		return {
			version: 1,
			sessions
		};
	} catch {
		return emptyForwardedStore();
	}
}
function writeForwardedStore(store) {
	const ls = storage();
	if (!ls) return false;
	try {
		ls.setItem(FORWARDED_STORAGE_KEY, JSON.stringify(store));
		return true;
	} catch {
		return false;
	}
}
/** Keep only `true` flags on non-empty ids; anything else in the stored record is dropped. */
function normalizeForwardedRecord(record) {
	if (!record || typeof record !== "object" || Array.isArray(record)) return {};
	const next = {};
	for (const [itemId, flag] of Object.entries(record)) if (itemId && flag === true) next[itemId] = true;
	return next;
}
/** Forwarded item ids of one session, as an id -> true map. */
function readForwardedIds(sessionId) {
	const key = sessionId ? String(sessionId) : "";
	if (!key) return {};
	return normalizeForwardedRecord(readForwardedStore().sessions[key]);
}
/** Remember that one note was forwarded; best effort, never blocks the send. */
function markForwarded(sessionId, itemId) {
	const key = sessionId ? String(sessionId) : "";
	const id = itemId ? String(itemId) : "";
	if (!key || !id) return false;
	const store = readForwardedStore();
	store.sessions[key] = {
		...normalizeForwardedRecord(store.sessions[key]),
		[id]: true
	};
	return writeForwardedStore(store);
}
/** Drop forwarded flags that can no longer be rendered (deleted or cleared notes). */
function forgetForwarded(sessionId, itemIds) {
	const key = sessionId ? String(sessionId) : "";
	if (!key) return false;
	const ids = Array.isArray(itemIds) ? itemIds : [itemIds];
	const store = readForwardedStore();
	const record = normalizeForwardedRecord(store.sessions[key]);
	let changed = false;
	for (const rawId of ids) {
		const id = rawId ? String(rawId) : "";
		if (!id || !record[id]) continue;
		delete record[id];
		changed = true;
	}
	if (!changed) return false;
	if (Object.keys(record).length) store.sessions[key] = record;
	else delete store.sessions[key];
	return writeForwardedStore(store);
}

// src/client/ui/useForwardMarks.ts
/** Which notes of this list were forwarded, plus the toggle-off bookkeeping. */
/**
* Forward marks belong to the list, not to the conversation: the same note
* stays marked while the user moves between sessions of one workspace.
*/
function useForwardMarks(scopeKey) {
	const key = scopeKey ? String(scopeKey) : "";
	const [forwardedIds, setForwardedIds] = react.default.useState(() => readForwardedIds(key));
	const keyRef = react.default.useRef(key);
	react.default.useEffect(() => {
		if (keyRef.current === key) return;
		keyRef.current = key;
		setForwardedIds(readForwardedIds(key));
	}, [key]);
	/** Drop forwarded flags for notes that no longer render (deleted or cleared). */
	const forgetForwardedItems = (itemIds) => {
		const ids = (Array.isArray(itemIds) ? itemIds : [itemIds]).filter(Boolean);
		if (!ids.length) return;
		forgetForwarded(key, ids);
		setForwardedIds((current) => {
			if (!ids.some((id) => current[id])) return current;
			const next = { ...current };
			for (const id of ids) delete next[id];
			return next;
		});
	};
	/** Remember a successful forward so the forward button keeps its check after closing the panel. */
	const rememberForwarded = (item) => {
		const id = item && item.id ? String(item.id) : "";
		if (!id) return;
		markForwarded(key, id);
		setForwardedIds((current) => current[id] ? current : {
			...current,
			[id]: true
		});
	};
	/** Toggle the forward mark off; the note and its open/done state stay untouched. */
	const unrememberForwarded = (item) => {
		const id = item && item.id ? String(item.id) : "";
		if (!id) return;
		forgetForwardedItems(id);
	};
	return {
		forwardedIds,
		rememberForwarded,
		unrememberForwarded,
		forgetForwardedItems
	};
}

// src/client/ui/usePanelSettings.ts
/** Inline settings: send shortcut and the forward lead-in, both persisted. */
function usePanelSettings() {
	const [showSettings, setShowSettings] = react.default.useState(false);
	const [sendShortcut, setSendShortcut] = react.default.useState(readSendShortcut);
	const [forwardPrefix, setForwardPrefix] = react.default.useState(readForwardPrefix);
	const [analyticsEnabled, setAnalyticsEnabled$1] = react.default.useState(readAnalyticsEnabled);
	const prefixRef = react.default.useRef(null);
	react.default.useLayoutEffect(() => {
		const node = prefixRef.current;
		if (!node) return;
		node.style.height = "auto";
		node.style.height = `${Math.min(138, node.scrollHeight + 2)}px`;
	}, [forwardPrefix, showSettings]);
	const chooseShortcut = (value) => {
		setSendShortcut(value);
		writeSendShortcut(value);
	};
	const toggleAnalytics = (next) => {
		setAnalyticsEnabled$1(next);
		writeAnalyticsEnabled(next);
		setAnalyticsEnabled(next);
	};
	const changeForwardPrefix = (value) => {
		const next = String(value || "").slice(0, 80);
		setForwardPrefix(next);
		writeForwardPrefix(next);
	};
	return {
		showSettings,
		setShowSettings,
		sendShortcut,
		chooseShortcut,
		forwardPrefix,
		changeForwardPrefix,
		prefixRef,
		analyticsEnabled,
		toggleAnalytics
	};
}

// src/client/update/releaseHistory.ts
/** Enough history to explain a long gap without turning the card into a feed. */
const MAX_RELEASE_HISTORY = 6;
function core(version) {
	return String(version ?? "").replace(/^v/i, "").split("-", 1)[0].split(".").map((part) => Number.parseInt(part, 10) || 0);
}
/** A version carrying a prerelease part, e.g. `1.2.0-beta.1`. */
function isPrerelease(version) {
	return /^\D*\d+\.\d+\.\d+-/.test(String(version ?? "").trim());
}
/**
* Full ordering of two versions, prerelease identifiers included.
*
* A beta build asks for the notes between `1.2.0-beta.1` and `1.2.0-beta.2`;
* comparing the cores alone would call those equal and leave the card with no
* notes at all, which is exactly the case a beta test needs to read.
*/
function compareVersions(a, b) {
	const left = core(a);
	const right = core(b);
	for (let index = 0; index < Math.max(left.length, right.length); index += 1) {
		const difference = (left[index] || 0) - (right[index] || 0);
		if (difference !== 0) return difference > 0 ? 1 : -1;
	}
	const leftPre = prerelease(a);
	const rightPre = prerelease(b);
	if (leftPre.length === 0 && rightPre.length === 0) return 0;
	if (leftPre.length === 0) return 1;
	if (rightPre.length === 0) return -1;
	for (let index = 0; index < Math.max(leftPre.length, rightPre.length); index += 1) {
		const x = leftPre[index];
		const y = rightPre[index];
		if (x === void 0) return -1;
		if (y === void 0) return 1;
		if (x === y) continue;
		const xNumeric = /^\d+$/.test(x);
		const yNumeric = /^\d+$/.test(y);
		if (xNumeric && yNumeric) return Number(x) > Number(y) ? 1 : -1;
		if (xNumeric) return -1;
		if (yNumeric) return 1;
		return x > y ? 1 : -1;
	}
	return 0;
}
/** The prerelease identifiers of a version, or an empty list. */
function prerelease(version) {
	const normalized = String(version ?? "").trim().replace(/^v/i, "");
	const dash = normalized.indexOf("-");
	if (dash === -1) return [];
	const tail = normalized.slice(dash + 1).split("+")[0];
	return tail === "" ? [] : tail.split(".");
}
/** A `x.y.z` or `x.y.z-prerelease` tag, with the `v` prefix and whitespace removed. */
function normalizeVersion(version) {
	const normalized = String(version ?? "").trim().replace(/^v/i, "");
	return /^\d+(\.\d+)*(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(normalized) ? normalized : "";
}
/**
* Filter the feed down to the releases the user is about to receive:
* newer than `current`, not newer than `latest`, newest first, capped.
*/
function selectReleaseHistory(list, query) {
	const max = query.max && query.max > 0 ? query.max : 6;
	const seen = /* @__PURE__ */ new Set();
	const entries = [];
	const allowPrerelease = isPrerelease(query.current) && isPrerelease(query.latest ?? "");
	for (const item of Array.isArray(list) ? list : []) {
		const release = item;
		if (!release || typeof release !== "object") continue;
		if (release.draft === true) continue;
		if (release.prerelease === true && !allowPrerelease) continue;
		const version = normalizeVersion(typeof release.version === "string" ? release.version : release.tag_name);
		if (!version || seen.has(version)) continue;
		if (compareVersions(version, query.current) <= 0) continue;
		if (query.latest && compareVersions(version, query.latest) > 0) continue;
		seen.add(version);
		const url = release.url ?? release.html_url;
		const publishedAt = release.publishedAt ?? release.published_at;
		entries.push({
			version,
			body: typeof release.body === "string" ? release.body : "",
			url: typeof url === "string" ? url : "",
			publishedAt: typeof publishedAt === "string" ? publishedAt : ""
		});
	}
	entries.sort((a, b) => compareVersions(b.version, a.version));
	return {
		entries: entries.slice(0, max),
		truncated: entries.length > max
	};
}

// src/client/update/latest.ts
/**
* Published-version probes: the version number and the release notes behind it.
*
* The panel is usually installed from a checkout, not from a store, so it asks
* the npm registry first and falls back to the GitHub Release tag. Everything
* here is dependency-injected and free of widget state so the contract test can
* exercise the source order, the one-hour cache and the comparison in Node.
*/
/** npm metadata endpoints in fallback order; the mirror covers slow npmjs routes. */
const UPDATE_REGISTRY_HOSTS = ["https://registry.npmjs.org", "https://registry.npmmirror.com"];
/** GitHub's REST host for this repo, derived from the displayed repo URL. */
const UPDATE_GITHUB_API = `${PLUGIN_REPO_URL.replace("https://github.com/", "https://api.github.com/repos/")}/releases`;
/** Second source: a GitHub Release, for checkouts that are not published to npm. */
const UPDATE_GITHUB_RELEASE_URL = `${UPDATE_GITHUB_API}/latest`;
/** The releases feed; one page is enough for the gap the card is willing to show. */
const UPDATE_GITHUB_RELEASES_URL = `${UPDATE_GITHUB_API}?per_page=50`;
/** A resolved version is reused for an hour, including a miss, to keep opens quiet. */
const UPDATE_TTL_MS = 36e5;
/** A manual check should not hang the panel on a black-holed network. */
const UPDATE_TIMEOUT_MS = 8e3;
/** A version carrying a prerelease part, e.g. `1.2.0-beta.1`. */
function isPrereleaseVersion(version) {
	return /^\D*\d+\.\d+\.\d+-/.test(version.trim());
}
/**
* A prerelease on a channel this project actually publishes.
*
* `1.1.2-beta.1` is a build someone installed on purpose and it should check
* for updates like any other release; `2.1.0-dev` is a local build and must not
* nag. The suffix alone cannot tell them apart, so the channel names do.
*/
function isPublishedChannel(version) {
	return /^\d+\.\d+\.\d+-(?:alpha|beta|rc)\./.test(version.trim());
}
/**
* Full ordering, tolerant of a `v` prefix and short forms, with the prerelease
* identifiers compared as semver does: a release outranks any prerelease on the
* same core, `rc.1` sorts below `rc.2`, and a numeric identifier sorts below an
* alphanumeric one.
*
* The prerelease part matters here: a beta build must see the next beta as an
* update, which a comparison over the core alone would call "the same version".
*/
function compareVersionOrder(a, b) {
	const parse = (version) => {
		const [core, ...rest] = version.trim().replace(/^v/, "").split("-");
		const parts = core.split(".").map((part) => parseInt(part, 10));
		if (parts.length === 0 || parts.some((part) => Number.isNaN(part))) return null;
		const prerelease = rest.join("-");
		return {
			core: parts,
			prerelease: prerelease === "" ? [] : prerelease.split(".")
		};
	};
	const next = parse(a);
	const have = parse(b);
	if (next === null && have === null) return 0;
	if (next === null) return -1;
	if (have === null) return 1;
	for (let index = 0; index < Math.max(next.core.length, have.core.length); index += 1) {
		const left = next.core[index] || 0;
		const right = have.core[index] || 0;
		if (left !== right) return left > right ? 1 : -1;
	}
	if (next.prerelease.length === 0 && have.prerelease.length === 0) return 0;
	if (next.prerelease.length === 0) return 1;
	if (have.prerelease.length === 0) return -1;
	for (let index = 0; index < Math.max(next.prerelease.length, have.prerelease.length); index += 1) {
		const left = next.prerelease[index];
		const right = have.prerelease[index];
		if (left === void 0) return -1;
		if (right === void 0) return 1;
		if (left === right) continue;
		const leftNumeric = /^\d+$/.test(left);
		const rightNumeric = /^\d+$/.test(right);
		if (leftNumeric && rightNumeric) return Number(left) > Number(right) ? 1 : -1;
		if (leftNumeric) return -1;
		if (rightNumeric) return 1;
		return left > right ? 1 : -1;
	}
	return 0;
}
/** Whether `latest` is a newer release than `current`. */
function isNewerVersion(latest, current) {
	return compareVersionOrder(latest, current) > 0;
}
/** A fetch that gives up after {@link UPDATE_TIMEOUT_MS} instead of hanging. */
function fetchWithTimeout(fetchImpl, url) {
	if (typeof AbortController !== "function") return Promise.resolve().then(() => fetchImpl(url));
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), UPDATE_TIMEOUT_MS);
	return Promise.resolve().then(() => fetchImpl(url, { signal: controller.signal })).finally(() => clearTimeout(timer));
}
function createUpdateProbe(options = {}) {
	const fetchImpl = options.fetchImpl || ((url, init) => fetch(url, init));
	const now = options.now || (() => Date.now());
	const ttlMs = options.ttlMs || 36e5;
	let cached = null;
	function readJson(url) {
		return fetchWithTimeout(fetchImpl, url).then((response) => response.ok ? response.json() : null).catch(() => null);
	}
	function readNpmVersion(host, channel) {
		return readJson(`${host}/dsh-aside-note/${channel}`).then((body) => body !== null && typeof body.version === "string" ? body.version : null);
	}
	function readGitHubVersion() {
		return readJson(UPDATE_GITHUB_RELEASE_URL).then((body) => {
			const tag = body !== null && typeof body.tag_name === "string" ? body.tag_name : "";
			return tag === "" ? null : tag.replace(/^v/, "");
		});
	}
	function latest() {
		if (cached === null || now() - cached.at >= ttlMs) {
			const channels = isPrereleaseVersion(options.currentVersion ?? "") ? ["latest", "next"] : ["latest"];
			cached = {
				at: now(),
				promise: (async () => {
					let best = null;
					for (const host of UPDATE_REGISTRY_HOSTS) {
						let answered = false;
						for (const channel of channels) {
							const version = await readNpmVersion(host, channel);
							if (version === null) continue;
							answered = true;
							if (channel !== "latest" && !isPrereleaseVersion(version)) continue;
							if (best === null || isNewerVersion(version, best)) best = version;
						}
						if (answered) return best;
					}
					return best ?? readGitHubVersion();
				})()
			};
		}
		return cached.promise;
	}
	/** Drop the cached answer so the next call reads the network again. */
	function reset() {
		cached = null;
	}
	return {
		latest,
		reset
	};
}
/** Process-wide probe: one fetch per hour no matter how often the panel opens. */
const updateProbe = createUpdateProbe({ currentVersion: PLUGIN_VERSION });
function fetchLatestVersion() {
	return updateProbe.latest();
}
function readJsonWithTimeout(fetchImpl, url) {
	return fetchWithTimeout(fetchImpl, url).then((response) => response.ok ? response.json() : null).catch(() => null);
}
/**
* Fetch the releases between the running build and the published version.
* GitHub is the only source: the notes live on the Release, not in the npm
* manifest. A missing feed falls back to the single newest tag, and a missing
* release (a tag pushed without a Release) leaves the card with links only.
*/
function createReleaseHistoryProbe(options = {}) {
	const fetchImpl = options.fetchImpl || ((url, init) => fetch(url, init));
	const now = options.now || (() => Date.now());
	const ttlMs = options.ttlMs || 36e5;
	const cached = /* @__PURE__ */ new Map();
	function latest(current, target) {
		const key = `${current}..${target}`;
		const hit = cached.get(key);
		if (hit && now() - hit.at < ttlMs) return hit.promise;
		const entry = {
			at: now(),
			promise: (async () => {
				const list = await readJsonWithTimeout(fetchImpl, UPDATE_GITHUB_RELEASES_URL);
				if (Array.isArray(list)) return selectReleaseHistory(list.map((item) => ({
					version: typeof item?.tag_name === "string" ? item.tag_name : item?.version,
					body: item?.body,
					url: item?.html_url,
					prerelease: item?.prerelease,
					draft: item?.draft,
					publishedAt: item?.published_at
				})), {
					current,
					latest: target,
					max: 6
				});
				const single = await readJsonWithTimeout(fetchImpl, `${UPDATE_GITHUB_API}/tags/v${encodeURIComponent(target)}`);
				if (single === null) return {
					entries: [],
					truncated: false
				};
				const tag = typeof single.tag_name === "string" ? single.tag_name.replace(/^v/, "") : target;
				return {
					entries: [{
						version: tag,
						body: typeof single.body === "string" ? single.body : "",
						url: typeof single.html_url === "string" && single.html_url ? single.html_url : `${PLUGIN_REPO_URL}/releases/tag/v${encodeURIComponent(tag)}`,
						publishedAt: typeof single.published_at === "string" ? single.published_at : ""
					}],
					truncated: false
				};
			})()
		};
		cached.set(key, entry);
		return entry.promise;
	}
	function reset() {
		cached.clear();
	}
	return {
		latest,
		reset
	};
}
/** Process-wide history probe, cached per version gap for an hour. */
const releaseHistoryProbe = createReleaseHistoryProbe();
function fetchReleaseHistory(current, target) {
	return releaseHistoryProbe.latest(current, target);
}
/** Manual check: forget both cached answers so the next calls hit the network. */
function resetUpdateChecks() {
	updateProbe.reset();
	releaseHistoryProbe.reset();
}

// src/client/update/releaseNotes.ts
/** Bounds taken from the published-notes convention, not an editorial limit. */
const MAX_NOTE_GROUPS = 6;
const MAX_NOTE_ITEMS = 40;
const MAX_NOTE_ITEM_CHARS = 600;
const MARKER_RE = /<!--\s*app-update-notes:([A-Za-z-]+):start\s*-->([\s\S]*?)<!--\s*app-update-notes:\1:end\s*-->/g;
const GROUP_RE = /^#{2,4}\s+(.+?)\s*$/;
const ITEM_RE = /^\s*[-*]\s+(.+?)\s*$/;
const LEAD_RE = /^([^。．.!?！？:：]{1,40}?[:：])\s*(\S[\s\S]*)$/;
const TRAILING_PR_REFS_RE = /\s*(?:[（(]\s*#\d+(?:\s*[,，、]\s*#\d+)*\s*[)）])\s*$/;
const HTML_TAG_RE = /<\/?[A-Za-z][^>]*>/g;
const IMAGE_RE = /!\[[^\]]*\]\([^)]*\)/g;
const LINK_RE = /\[([^\]]+)\]\([^)]*\)/g;
const CODE_RE = /`([^`]+)`/g;
const STRONG_RE = /\*\*([^*]+)\*\*|__([^_]+)__/g;
const EMPHASIS_RE = /\*([^*]+)\*|_([^_]+)_/g;
const WHITESPACE_RE = /\s+/g;
const ENTITIES = {
	amp: "&",
	apos: "'",
	gt: ">",
	lt: "<",
	nbsp: " ",
	quot: "\""
};
function decodeEntities(value) {
	return value.replace(/&(#x[0-9a-f]+|#\d+|amp|apos|gt|lt|nbsp|quot);/gi, (match, entity) => {
		const lower = entity.toLowerCase();
		if (Object.prototype.hasOwnProperty.call(ENTITIES, lower)) return ENTITIES[lower];
		const codePoint = lower.startsWith("#x") ? Number.parseInt(lower.slice(2), 16) : Number.parseInt(lower.slice(1), 10);
		if (!Number.isInteger(codePoint) || codePoint < 0 || codePoint > 1114111) return match;
		try {
			return String.fromCodePoint(codePoint);
		} catch {
			return match;
		}
	});
}
/** Flatten one line of release-note markdown to readable plain text. */
function noteText(value) {
	return decodeEntities(String(value ?? "").replace(HTML_TAG_RE, "").replace(IMAGE_RE, "").replace(LINK_RE, "$1").replace(CODE_RE, "$1").replace(STRONG_RE, (_match, strong, underscored) => strong || underscored).replace(EMPHASIS_RE, (_match, italic, underscored) => italic || underscored).replace(TRAILING_PR_REFS_RE, "")).replace(WHITESPACE_RE, " ").trim();
}
/** Split "**Topic:** rest" into its bold lead and the remaining body. */
function splitNoteLead(value) {
	const text = noteText(value);
	const match = LEAD_RE.exec(text);
	return match ? {
		lead: match[1].trim(),
		body: match[2].trim()
	} : {
		lead: "",
		body: text
	};
}
function truncate(value, maxChars) {
	const characters = Array.from(value);
	return characters.length <= maxChars ? value : `${characters.slice(0, maxChars - 1).join("").trimEnd()}…`;
}
/**
* Locale fallback order for a DSH locale id. A Chinese UI reads the `zh` block,
* everything else reads `en`; either falls back to the other when a release
* only shipped one language.
*/
function noteLocalesFor(locale) {
	return String(locale ?? "").toLowerCase().startsWith("zh") ? ["zh", "en"] : ["en", "zh"];
}
/** The notes block for this locale, or an empty string when the release has none. */
function extractUpdateNotes(body, locale) {
	const blocks = /* @__PURE__ */ new Map();
	for (const match of String(body ?? "").matchAll(MARKER_RE)) {
		const key = match[1].toLowerCase();
		if (!blocks.has(key)) blocks.set(key, match[2]);
	}
	for (const key of noteLocalesFor(locale)) {
		const block = blocks.get(key);
		if (block && block.trim()) return block.trim();
	}
	return "";
}
/** Parse one marker block into headings and bullets. */
function parseReleaseNotes(markdown) {
	const drafts = [];
	let current = null;
	for (const rawLine of String(markdown ?? "").split(/\r?\n/)) {
		const line = rawLine.trimEnd();
		const heading = GROUP_RE.exec(line);
		if (heading) {
			current = {
				title: noteText(heading[1]),
				bullets: []
			};
			drafts.push(current);
			continue;
		}
		const item = ITEM_RE.exec(line);
		if (item) {
			if (current === null) {
				current = {
					title: "",
					bullets: []
				};
				drafts.push(current);
			}
			current.bullets.push(item[1]);
			continue;
		}
		if (line.trim() && current !== null && current.bullets.length > 0) {
			const last = current.bullets.length - 1;
			current.bullets[last] = `${current.bullets[last]} ${line.trim()}`;
		}
	}
	const parsed = [];
	for (const draft of drafts) {
		const items = [];
		for (const bullet of draft.bullets) {
			const text = truncate(noteText(bullet), 600);
			if (text) items.push(splitNoteLead(text));
			if (items.length >= 40) break;
		}
		if (items.length > 0) parsed.push({
			title: draft.title,
			items
		});
		if (parsed.length >= 6) break;
	}
	return parsed;
}
/** Convenience for the panel: extract and parse in one step. */
function updateNotesForLocale(body, locale) {
	return parseReleaseNotes(extractUpdateNotes(body, locale));
}

// src/client/update/market.ts
/**
* Client for the plugin market's public update API (v1, beta).
*
* The market publishes a small same-origin JSON API so a plugin can offer its
* own update button without running a package manager itself. Everything here
* degrades to `null` when the market is absent, older than the API, or refuses
* the request: an update button is a convenience, not a dependency.
*
* Contract: `dshmarket/UPDATE-API-V1.md` — endpoints come from
* `/capabilities`, so a path change does not need a client release.
*/
/** Where the market mounts its public API. */
const MARKET_API_BASE = "/dsh-market/api/v1";
/** The package this panel updates. */
const MARKET_PACKAGE = "dsh-aside-note";
/** A check should answer quickly; a slow market falls back to the manual path. */
const MARKET_TIMEOUT_MS = 8e3;
function asText(value) {
	return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}
function asRecord(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value) ? value : null;
}
function operationView(raw) {
	const operation = asRecord(raw);
	if (!operation) return null;
	const progress = asRecord(operation.progress) || {};
	const outcome = asRecord(operation.outcome) || {};
	const failure = asRecord(operation.failure);
	const percent = typeof progress.percent === "number" && Number.isFinite(progress.percent) ? Math.max(0, Math.min(100, Math.round(progress.percent))) : null;
	const state = asText(operation.state);
	return {
		operationId: asText(operation.operationId) || "",
		state: [
			"queued",
			"running",
			"succeeded",
			"failed",
			"cancelled",
			"rolled-back"
		].includes(state) ? state : "failed",
		percent,
		detail: asText(progress.detail),
		beforeVersion: asText(operation.beforeVersion),
		installedVersion: asText(operation.installedVersion),
		refreshRequired: outcome.refreshRequired === true,
		restartRequired: outcome.restartRequired === true,
		failure: failure ? {
			code: asText(failure.code) || "UPDATE_FAILED",
			message: asText(failure.message) || "",
			retryable: failure.retryable === true
		} : null
	};
}
function errorFrom(body, fallback) {
	const failure = asRecord(asRecord(body)?.failure);
	return {
		code: asText(failure?.code) || "UPDATE_FAILED",
		message: asText(failure?.message) || asText(asRecord(body)?.error) || fallback,
		retryable: failure?.retryable === true
	};
}
/**
* Build a market client. `fetchImpl` is injected so the client can be tested
* without a browser or a live market.
*/
function createMarketClient(options = {}) {
	const fetchImpl = options.fetchImpl || ((url, init) => fetch(url, init));
	const timeoutMs = options.timeoutMs || 8e3;
	const base = (options.base || "/dsh-market/api/v1").replace(/\/$/, "");
	async function request(path, init = {}) {
		const controller = typeof AbortController === "function" ? new AbortController() : null;
		const timer = setTimeout(() => controller?.abort(), timeoutMs);
		try {
			const response = await fetchImpl(path.startsWith("http") ? path : `${base}${path}`, {
				...init,
				...controller ? { signal: controller.signal } : {}
			});
			const body = await response.json().catch(() => null);
			return {
				status: response.status,
				body
			};
		} catch {
			return null;
		} finally {
			clearTimeout(timer);
		}
	}
	return {
		/**
		* Whether this host has a usable market: the v1 schema answered. The panel
		* needs no more than that — the endpoints it calls are fixed, and nothing
		* reads the market's version, restart support or advertised paths.
		*/
		async available() {
			const result = await request("/capabilities");
			const body = asRecord(result?.body);
			return result !== null && result.status === 200 && body !== null && body !== void 0 && body.schema === "dsh-market/update-api/v1";
		},
		/** Queue an update; returns the operation to poll or a stable failure code. */
		async start(name = MARKET_PACKAGE, force = false) {
			const result = await request("/updates", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					packageName: name,
					...force ? { force: true } : {}
				})
			});
			if (!result) return { error: {
				code: "UPDATE_FAILED",
				message: "market did not answer",
				retryable: true
			} };
			const operation = asRecord(asRecord(result.body)?.operation);
			const operationId = asText(operation?.operationId);
			if ((result.status === 200 || result.status === 202) && operationId) {
				const state = asText(operation?.state);
				return {
					operationId,
					state: state === "queued" || state === "running" ? state : "queued"
				};
			}
			return { error: errorFrom(result.body, `update failed with HTTP ${result.status}`) };
		},
		/** Poll one operation. */
		async operation(operationId) {
			if (!operationId) return null;
			const result = await request(`/operations?operationId=${encodeURIComponent(operationId)}`);
			if (!result || result.status !== 200) return null;
			return operationView(asRecord(result.body)?.operation);
		}
	};
}
/** Process-wide market client: one request shape, shared by every panel open. */
const marketClient = createMarketClient();

// src/client/update/host.ts
/**
* The host-side update, as the panel sees it.
*
* The host half of this package exposes two same-origin endpoints; a browser
* cannot install a package itself. Nothing here throws: every branch answers
* with a value the card can render, because "the host has no update route"
* (an older build, or a headless host) must fall back to the market path
* rather than look like a failed update.
*/
/** Where the host listens; keep in sync with `host/route.js`. */
const HOST_APPLY_PATH = "/dsh-aside-note/update/apply";
/** An install can be slow (pnpm download, build scripts) but not unbounded. */
const APPLY_TIMEOUT_MS = 3e5;
function text(value) {
	return typeof value === "string" && value.trim() !== "" ? value : void 0;
}
/**
* Ask the host to install `target` over the running copy.
*
* @param target exact version, as the version check resolved it
*/
async function applyHostUpdate(target) {
	const controller = typeof AbortController === "function" ? new AbortController() : void 0;
	const timer = setTimeout(() => controller?.abort(), APPLY_TIMEOUT_MS);
	let response;
	try {
		response = await fetch(HOST_APPLY_PATH, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ target }),
			...controller === void 0 ? {} : { signal: controller.signal }
		});
	} catch {
		return { kind: "unavailable" };
	} finally {
		clearTimeout(timer);
	}
	if (response.status === 404) return { kind: "unavailable" };
	let body;
	try {
		body = await response.json();
	} catch {
		return { kind: "unavailable" };
	}
	if (body?.ok === true) return {
		kind: "ok",
		route: body.route === "dsh-plugin" || body.route === "package-manager" || body.route === "none" ? body.route : "dsh",
		...text(body.previousVersion) === void 0 ? {} : { previousVersion: text(body.previousVersion) },
		installedVersion: text(body.installedVersion) ?? target,
		updated: body.updated === true,
		restartRequired: body.restartRequired === true,
		...text(body.output) === void 0 ? {} : { output: text(body.output) }
	};
	return {
		kind: "error",
		code: text(body?.code) ?? "UPDATE_FAILED",
		message: text(body?.message) ?? "the host refused the update",
		retryable: body?.retryable === true,
		...text(body?.hint) === void 0 ? {} : { hint: text(body.hint) }
	};
}

// src/client/domain/clipboard.ts
/** Clipboard write with a synchronous fallback. */
/** Copy plain text, with a synchronous fallback for restricted clipboards. */
async function copyText(text) {
	try {
		if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
			await navigator.clipboard.writeText(text);
			return true;
		}
	} catch {}
	try {
		const area = document.createElement("textarea");
		area.value = text;
		area.setAttribute("readonly", "");
		area.style.position = "fixed";
		area.style.opacity = "0";
		document.body.appendChild(area);
		area.select();
		const ok = document.execCommand("copy");
		area.remove();
		return ok;
	} catch {
		return false;
	}
}

// src/client/ui/useUpdateCenter.ts
/**
* Update centre state for the settings card.
*
* Three things are allowed to be independent here: the published version check
* (auto on open, manual on demand), the release notes behind that version
* (loaded as soon as an update is offered), and the in-app update itself
* (queued through the plugin market's public API and polled to a terminal
* state). Keeping them separate means a missing market or a missing release
* body cannot take the version check down with it.
*
* The market runs one mutation per host process, so it may answer
* `OPERATION_BUSY`. That window is waited out; when the market is absent or
* stays busy, the card falls back to the terminal command — the panel never
* runs a package manager itself.
*/
const CHECK_IDLE = {
	status: "idle",
	latestVersion: null,
	checkedAt: null
};
const NOTES_IDLE = {
	status: "idle",
	entries: [],
	truncated: false
};
const RUN_IDLE = {
	phase: "idle",
	percent: null,
	failureCode: null,
	message: null,
	retryable: false,
	refreshRequired: false,
	restartRequired: false,
	installedVersion: null
};
const POLL_INTERVAL_MS = 900;
/**
* The market runs one mutation per host process and answers `409
* OPERATION_BUSY` while another update — or its install lock — is held. That
* window is usually short (pnpm exiting, install post-processing, a neighbour
* update finishing), so the button waits it out before falling back to the
* terminal command. Waiting is capped: an operation that stayed busy is a real
* "do it yourself now", and the card shows how.
*/
const BUSY_RETRY_DELAYS_MS = [
	1e3,
	2e3,
	4e3
];
/**
* A manual check stays on screen for at least this long. A fast registry answer
* would otherwise flip the button back in a few milliseconds, which reads as
* "did that do anything?" and invites repeat clicks.
*/
const MIN_CHECK_MS = 3e3;
/** A terminal state never arrives for an abandoned operation; stop asking. */
const MAX_POLLS = 400;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function terminalRun(phase, patch = {}) {
	return {
		...RUN_IDLE,
		phase,
		...patch
	};
}
function useUpdateCenter(localeId) {
	const [check, setCheck] = react.default.useState(CHECK_IDLE);
	const [notes, setNotes] = react.default.useState(NOTES_IDLE);
	const [expandedVersions, setExpandedVersions] = react.default.useState({});
	const [run, setRun] = react.default.useState(RUN_IDLE);
	const disposed = react.default.useRef(false);
	const runRef = react.default.useRef(RUN_IDLE);
	runRef.current = run;
	/** The offered version, readable from callbacks without re-creating them. */
	const latestRef = react.default.useRef(null);
	latestRef.current = check.latestVersion;
	/** Set before the first await so the same panel cannot start two operations. */
	const starting = react.default.useRef(false);
	react.default.useEffect(() => {
		disposed.current = false;
		return () => {
			disposed.current = true;
		};
	}, []);
	const latestVersion = check.latestVersion;
	react.default.useEffect(() => {
		if ("1.1.2-beta.5".includes("-") && !isPublishedChannel("1.1.2-beta.5")) return void 0;
		let active = true;
		fetchLatestVersion().then((version) => {
			if (!active) return;
			if (version === null) {
				reportEvent("update_checked", {
					ext1: "auto",
					ext2: "error"
				});
				return;
			}
			const newer = isNewerVersion(version, PLUGIN_VERSION);
			reportEvent("update_checked", {
				ext1: "auto",
				ext2: newer ? "available" : "current"
			});
			if (newer) setCheck({
				status: "available",
				latestVersion: version,
				checkedAt: Date.now()
			});
			else setCheck({
				status: "current",
				latestVersion: null,
				checkedAt: Date.now()
			});
		});
		return () => {
			active = false;
		};
	}, []);
	const checkNow = react.default.useCallback(async () => {
		if (check.status === "checking") return;
		resetUpdateChecks();
		const startedAt = Date.now();
		const previousOffer = check.latestVersion;
		setCheck((previous) => ({
			...previous,
			status: "checking"
		}));
		setRun(RUN_IDLE);
		const version = await fetchLatestVersion();
		const remaining = MIN_CHECK_MS - (Date.now() - startedAt);
		if (remaining > 0) await sleep(remaining);
		if (disposed.current) return;
		if (version === null) {
			reportEvent("update_checked", {
				ext1: "manual",
				ext2: "error"
			});
			setCheck({
				status: "error",
				latestVersion: previousOffer,
				checkedAt: Date.now()
			});
			return;
		}
		reportEvent("update_checked", {
			ext1: "manual",
			ext2: isNewerVersion(version, "1.1.2-beta.5") ? "available" : "current"
		});
		if (isNewerVersion(version, "1.1.2-beta.5")) {
			const sameRelease = previousOffer !== null && version === previousOffer;
			setCheck({
				status: "available",
				latestVersion: version,
				checkedAt: Date.now()
			});
			if (!sameRelease) {
				setNotes(NOTES_IDLE);
				setExpandedVersions({});
			}
		} else {
			setCheck({
				status: "current",
				latestVersion: null,
				checkedAt: Date.now()
			});
			setNotes(NOTES_IDLE);
			setExpandedVersions({});
		}
	}, [check.status, check.latestVersion]);
	const toggleVersion = react.default.useCallback((version) => {
		setExpandedVersions((previous) => ({
			...previous,
			[version]: previous[version] !== true
		}));
	}, []);
	react.default.useEffect(() => {
		if (check.status !== "available" || check.latestVersion === null) return void 0;
		if (notes.status !== "idle") return void 0;
		let active = true;
		setNotes((previous) => ({
			...previous,
			status: "loading"
		}));
		fetchReleaseHistory(PLUGIN_VERSION, check.latestVersion).then((result) => {
			if (!active) return;
			const entries = result.entries.map((entry) => ({
				version: entry.version,
				url: entry.url,
				groups: updateNotesForLocale(entry.body, localeId)
			}));
			if (entries.length === 0) {
				setNotes({
					status: "error",
					entries: [],
					truncated: false
				});
				return;
			}
			setNotes({
				status: "ready",
				entries,
				truncated: result.truncated
			});
			const newest = entries[0].version;
			setExpandedVersions({ [newest]: true });
		});
		return () => {
			active = false;
		};
	}, [
		check.status,
		check.latestVersion,
		localeId
	]);
	const startUpdate = react.default.useCallback(async (force = false) => {
		if (starting.current) return;
		if (runRef.current.phase === "running") return;
		if (runRef.current.phase === "done" && runRef.current.installedVersion === latestRef.current) return;
		starting.current = true;
		try {
			setRun(terminalRun("starting"));
			const target = latestRef.current;
			if (target !== null) {
				const host = await applyHostUpdate(target);
				if (disposed.current) return;
				if (host.kind === "ok") {
					reportEvent("update_started", {
						ext1: "host",
						ext2: "done"
					});
					setRun(terminalRun("done", {
						percent: 100,
						installedVersion: host.installedVersion,
						refreshRequired: !host.restartRequired,
						restartRequired: host.restartRequired
					}));
					return;
				}
				if (host.kind === "error") {
					reportEvent("update_started", {
						ext1: "host",
						ext2: "failed"
					});
					setRun(terminalRun("error", {
						failureCode: host.code,
						message: host.hint ?? host.message,
						retryable: host.retryable
					}));
					return;
				}
			}
			const usable = await marketClient.available();
			if (disposed.current) return;
			if (!usable) {
				setRun(terminalRun("error", {
					failureCode: "AUTO_UPDATE_UNAVAILABLE",
					retryable: false
				}));
				return;
			}
			let started = await marketClient.start(MARKET_PACKAGE, force);
			if (disposed.current) return;
			for (let attempt = 0; attempt < BUSY_RETRY_DELAYS_MS.length; attempt += 1) {
				if (!("error" in started) || started.error.code !== "OPERATION_BUSY") break;
				setRun(terminalRun("waiting"));
				await sleep(BUSY_RETRY_DELAYS_MS[attempt]);
				if (disposed.current) return;
				started = await marketClient.start(MARKET_PACKAGE, force);
				if (disposed.current) return;
			}
			if ("error" in started) {
				reportEvent("update_started", {
					ext1: "market",
					ext2: "failed"
				});
				setRun(terminalRun("error", {
					failureCode: started.error.code,
					message: started.error.message || null,
					retryable: started.error.retryable
				}));
				return;
			}
			setRun({
				...RUN_IDLE,
				phase: "running",
				percent: 0
			});
			for (let attempt = 0; attempt < MAX_POLLS; attempt += 1) {
				await sleep(POLL_INTERVAL_MS);
				if (disposed.current) return;
				const operation = await marketClient.operation(started.operationId);
				if (disposed.current) return;
				if (operation === null) {
					setRun(terminalRun("error", {
						failureCode: "UPDATE_FAILED",
						retryable: true
					}));
					return;
				}
				if (operation.state === "queued" || operation.state === "running") {
					setRun({
						...RUN_IDLE,
						phase: "running",
						percent: operation.percent
					});
					continue;
				}
				if (operation.state === "succeeded") {
					if (latestRef.current !== null && operation.installedVersion !== null && operation.installedVersion !== latestRef.current) {
						reportEvent("update_started", {
							ext1: "market",
							ext2: "failed"
						});
						setRun(terminalRun("error", {
							failureCode: "RESOLVED_VERSION_MISMATCH",
							message: `${operation.installedVersion} installed, expected ${latestRef.current}`,
							retryable: true
						}));
						return;
					}
					reportEvent("update_started", {
						ext1: "market",
						ext2: "done"
					});
					setRun(terminalRun("done", {
						percent: 100,
						installedVersion: operation.installedVersion,
						refreshRequired: operation.refreshRequired || !operation.restartRequired,
						restartRequired: operation.restartRequired
					}));
					return;
				}
				reportEvent("update_started", {
					ext1: "market",
					ext2: "failed"
				});
				setRun(terminalRun("error", {
					failureCode: operation.failure?.code || "UPDATE_FAILED",
					message: operation.failure?.message || null,
					retryable: operation.failure?.retryable !== false
				}));
				return;
			}
			setRun(terminalRun("error", {
				failureCode: "UPDATE_TIMEOUT",
				retryable: true
			}));
		} finally {
			starting.current = false;
		}
	}, []);
	const refreshPage = react.default.useCallback(() => {
		try {
			window.location.reload();
		} catch {}
	}, []);
	/** Copy the ready-to-paste update prompt; the caller reports the outcome. */
	const copyPrompt = react.default.useCallback((text) => copyText(text), []);
	const fullReleaseUrl = notes.entries[0]?.url || (latestVersion ? `${"https://github.com/Rayle8/dsh-aside-note"}/releases/tag/v${latestVersion}` : null);
	return {
		check,
		latestVersion,
		notes,
		expandedVersions,
		releasesUrl: `${PLUGIN_REPO_URL}/releases`,
		run,
		fullReleaseUrl,
		checkNow,
		toggleVersion,
		startUpdate,
		refreshPage,
		copyPrompt
	};
}

// src/client/ui/useComposerDraft.ts
/** The add box: draft persistence, auto-grow, send chords and newline insertion. */
function useComposerDraft({ draftKey, commit, report, sendShortcut, scopeKind }) {
	const key = draftKey ? String(draftKey) : "";
	const [draft, setDraft] = react.default.useState(() => readScopeDrafts(key).add);
	const addRef = react.default.useRef(null);
	const composingRef = react.default.useRef(false);
	const resizeAdd = (node) => {
		if (!node) return;
		node.style.height = "auto";
		node.style.height = `${node.scrollHeight + 2}px`;
	};
	react.default.useEffect(() => {
		resizeAdd(addRef.current);
	}, [draft]);
	react.default.useLayoutEffect(() => {
		const node = addRef.current;
		if (!node) return;
		if (typeof window.matchMedia === "function" && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
		node.focus();
		const end = node.value.length;
		try {
			node.setSelectionRange(end, end);
		} catch {}
	}, []);
	const add = () => {
		const text = draft.trim().slice(0, 280);
		if (!text) return;
		const now = Date.now();
		if (!commit((currentItems) => [{
			id: uid(),
			text,
			done: false,
			createdAt: now,
			updatedAt: now
		}, ...currentItems])) {
			report("saveFailed");
			return;
		}
		setDraft("");
		clearAddDraft(key);
		reportEvent("note_created", { ext1: scopeKind });
	};
	const insertDraftNewline = (node) => {
		if (!node) return;
		const start = node.selectionStart === null ? node.value.length : node.selectionStart;
		const end = node.selectionEnd === null ? start : node.selectionEnd;
		const next = `${node.value.slice(0, start)}\n${node.value.slice(end)}`;
		setDraft(next);
		saveAddDraft(key, next);
		window.requestAnimationFrame(() => {
			node.selectionStart = start + 1;
			node.selectionEnd = start + 1;
			resizeAdd(node);
		});
	};
	const onDraftChange = (event) => {
		const value = event.target.value;
		setDraft(value);
		saveAddDraft(key, value);
		resizeAdd(event.target);
	};
	const onDraftKeyDown = (event) => {
		const composing = event.isComposing || event.nativeEvent && event.nativeEvent.isComposing;
		if (event.key === "Escape") {
			event.currentTarget.blur();
			return;
		}
		if (event.key !== "Enter") return;
		if (composing) {
			event.preventDefault();
			return;
		}
		const chord = event.ctrlKey || event.metaKey;
		const platformModifier = isSendModifier(event);
		if (sendShortcut === "enter" ? !chord && !event.shiftKey : platformModifier) {
			event.preventDefault();
			add();
			return;
		}
		if (sendShortcut === "enter" && (chord || event.shiftKey)) {
			event.preventDefault();
			insertDraftNewline(event.currentTarget);
		}
	};
	return {
		draft,
		addRef,
		composingRef,
		add,
		onDraftChange,
		onDraftKeyDown
	};
}

// src/client/ui/useNoteActions.ts
/** Row actions: toggle, delete, and the inline edit session. */
function useNoteActions({ draftKey, commit, report, forgetForwardedItems, scopeKind }) {
	const key = draftKey ? String(draftKey) : "";
	const [editingId, setEditingId] = react.default.useState(null);
	const [editDraft, setEditDraft] = react.default.useState("");
	const editRef = react.default.useRef(null);
	const cancelEditRef = react.default.useRef(false);
	react.default.useEffect(() => {
		if (!editingId || !editRef.current) return;
		editRef.current.focus();
		editRef.current.select();
	}, [editingId]);
	const resetEditing = (itemId) => {
		if (!editingId || editingId !== itemId) return;
		setEditingId(null);
		setEditDraft("");
	};
	const toggle = (item) => {
		if (!commit((currentItems) => currentItems.map((candidate) => {
			if (candidate.id !== item.id) return candidate;
			const now = Date.now();
			return {
				...candidate,
				done: !candidate.done,
				updatedAt: now,
				...candidate.done ? { completedAt: void 0 } : { completedAt: now }
			};
		}))) {
			report("saveFailed");
			return;
		}
		reportEvent("note_status_changed", {
			ext1: scopeKind,
			ext2: item.done ? "open" : "done"
		});
		if (item.id === editingId) {
			setEditingId(null);
			setEditDraft("");
			clearEditDraft(key, item.id);
		}
	};
	const remove = (item) => {
		if (!commit((currentItems) => currentItems.filter((candidate) => candidate.id !== item.id))) {
			report("saveFailed");
			return;
		}
		report("deleted");
		reportEvent("note_deleted", { ext1: scopeKind });
		clearEditDraft(key, item.id);
		forgetForwardedItems(item.id);
		resetEditing(item.id);
	};
	const startEdit = (item) => {
		cancelEditRef.current = false;
		const saved = readEditDraft(key, item.id);
		setEditingId(item.id);
		setEditDraft(saved === null ? item.text : saved);
	};
	const finishEdit = (item) => {
		if (cancelEditRef.current) {
			cancelEditRef.current = false;
			return;
		}
		if (!editingId) return;
		const text = editDraft.trim().slice(0, 280);
		if (text && text !== item.text) {
			if (!commit((currentItems) => currentItems.map((candidate) => {
				if (candidate.id !== item.id) return candidate;
				return {
					...candidate,
					text,
					updatedAt: Date.now()
				};
			}))) {
				report("saveFailed");
				return;
			}
			reportEvent("note_edited", { ext1: scopeKind });
		}
		setEditingId(null);
		setEditDraft("");
		clearEditDraft(key, item.id);
	};
	const cancelEdit = () => {
		cancelEditRef.current = true;
		const currentId = editingId;
		setEditingId(null);
		setEditDraft("");
		if (currentId) clearEditDraft(key, currentId);
	};
	/**
	* Close the editor without discarding the stored draft. Switching the
	* workspace/session scope only changes which list is shown; the text belongs
	* to the draft scope, so reopening the row must restore it.
	*/
	const stopEditing = () => {
		cancelEditRef.current = true;
		setEditingId(null);
		setEditDraft("");
	};
	return {
		editingId,
		editDraft,
		setEditDraft,
		editRef,
		startEdit,
		finishEdit,
		cancelEdit,
		stopEditing,
		toggle,
		remove
	};
}

// src/client/ui/useClearConfirm.ts
/** The inline second confirmation for clearing completed notes. */
function useClearConfirm({ sessionId, showDone, doneCount, onConfirm }) {
	const [confirmClear, setConfirmClear] = react.default.useState(false);
	const clearConfirmTimerRef = react.default.useRef(0);
	/** Drop the pending auto-dismiss clock without touching state. */
	const stopClearConfirmTimer = () => {
		if (!clearConfirmTimerRef.current) return;
		window.clearTimeout(clearConfirmTimerRef.current);
		clearConfirmTimerRef.current = 0;
	};
	/** Close the inline band and drop its pending timer. */
	const dismissClearConfirm = () => {
		stopClearConfirmTimer();
		setConfirmClear(false);
	};
	/** Open the inline band; it retires itself after a short pause. */
	const askClearConfirm = () => {
		stopClearConfirmTimer();
		setConfirmClear(true);
		clearConfirmTimerRef.current = window.setTimeout(() => {
			clearConfirmTimerRef.current = 0;
			setConfirmClear(false);
		}, CLEAR_CONFIRM_MS);
	};
	/** Only the destructive confirm action reaches the clear routine. */
	const confirmClearDone = () => {
		dismissClearConfirm();
		onConfirm();
	};
	react.default.useEffect(() => () => stopClearConfirmTimer(), []);
	react.default.useEffect(() => {
		if (confirmClear && (!showDone || doneCount === 0)) dismissClearConfirm();
	}, [
		confirmClear,
		showDone,
		doneCount
	]);
	react.default.useEffect(() => {
		dismissClearConfirm();
	}, [sessionId]);
	return {
		confirmClear,
		askClearConfirm,
		dismissClearConfirm,
		confirmClearDone
	};
}

// src/client/ui/useListEdge.ts
/** Tracks whether the note list can still scroll down, and updates sticky heads. */
function useListEdge({ items, showOpen, showDone }) {
	const listRef = react.default.useRef(null);
	const [listHasMore, setListHasMore] = react.default.useState(false);
	/** The bottom fade exists only while the list can still scroll down. */
	const syncListEdge = react.default.useCallback(() => {
		const node = listRef.current;
		if (!node) return;
		syncStickyHeads(node);
		const more = node.scrollTop + node.clientHeight < node.scrollHeight - 1;
		setListHasMore((current) => current === more ? current : more);
	}, []);
	react.default.useEffect(() => {
		const node = listRef.current;
		if (!node) return void 0;
		syncListEdge();
		if (typeof ResizeObserver !== "function") return void 0;
		const observer = new ResizeObserver(syncListEdge);
		observer.observe(node);
		for (const section of node.children) observer.observe(section);
		return () => observer.disconnect();
	}, [
		items,
		showOpen,
		showDone,
		syncListEdge
	]);
	return {
		listRef,
		listHasMore,
		syncListEdge
	};
}

// src/client/ui/useOutsideDismiss.ts
/** Close the panel on an outside pointerdown or Escape. */
function useOutsideDismiss(panelRef, anchorRef, onClose) {
	react.default.useEffect(() => {
		const onPointerDown = (event) => {
			if (panelRef.current && panelRef.current.contains(event.target)) return;
			if (anchorRef.current && anchorRef.current.contains(event.target)) return;
			onClose();
		};
		const onKeyDown = (event) => {
			if (event.key === "Escape") onClose();
		};
		document.addEventListener("pointerdown", onPointerDown, true);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("pointerdown", onPointerDown, true);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [onClose, anchorRef]);
}

// src/client/ui/TodoRow.ts
/** One note: checkbox, actions, inline edit and the forwarded mark. */
const h$10 = react.default.createElement;
function TodoRow(props) {
	const { item, done, say, onToast, onToggle, onStartEdit, onDelete, editing, editDraft, setEditDraft, onEditDraftChange, onFinishEdit, onCancelEdit, editRef, forwardPrefix, sendShortcut = SEND_SHORTCUT_DEFAULT, forwarded = false, onForwarded, onUnforwarded } = props;
	const editHintKey = sendShortcut === "enter" ? "edit.hintEnter" : "edit.hintCtrlEnter";
	const [pending, setPending] = react.default.useState("");
	const mountedRef = react.default.useRef(true);
	react.default.useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);
	const copy = async () => {
		if (pending) return;
		setPending("copy");
		let ok = false;
		try {
			ok = await copyText(item.text);
		} finally {
			if (mountedRef.current) setPending("");
		}
		if (!mountedRef.current) return;
		if (onToast) onToast(ok ? "copied" : "copyFailed");
	};
	const forward = () => {
		if (forwarded) {
			if (onUnforwarded) onUnforwarded(item);
			if (onToast) onToast("unforwarded");
			return;
		}
		if (!appendToConversation(item.text, forwardPrefix)) {
			if (onToast) onToast("forwardFailed");
			return;
		}
		if (onForwarded) onForwarded(item);
		reportEvent("note_forwarded", { ext1: props.scopeKind });
		if (onToast) onToast("forwarded");
	};
	const toggleCheck = () => onToggle(item);
	const resizeEditor = (node) => {
		if (!node) return;
		node.style.height = "auto";
		node.style.height = `${node.scrollHeight + 2}px`;
	};
	const setEditorRef = react.default.useCallback((node) => {
		editRef.current = node;
		if (node) {
			node.style.height = "auto";
			node.style.height = `${node.scrollHeight + 2}px`;
		}
	}, [editRef]);
	/** Insert a line break at the caret of the controlled edit textarea and keep focus there. */
	const insertEditNewline = (node) => {
		if (!node) return;
		const start = node.selectionStart === null ? node.value.length : node.selectionStart;
		const end = node.selectionEnd === null ? start : node.selectionEnd;
		const next = `${node.value.slice(0, start)}\n${node.value.slice(end)}`;
		const caret = start + 1;
		setEditDraft(next);
		if (onEditDraftChange) onEditDraftChange(next);
		window.requestAnimationFrame(() => {
			node.focus();
			try {
				node.setSelectionRange(caret, caret);
			} catch {}
			resizeEditor(node);
		});
	};
	const body = editing ? h$10("div", { className: "dsh-an-edit" }, h$10("textarea", {
		ref: setEditorRef,
		className: "dsh-an-editInput",
		value: editDraft,
		rows: 1,
		maxLength: 280,
		"aria-label": say("item.edit"),
		onChange: (event) => {
			const value = event.target.value;
			setEditDraft(value);
			if (onEditDraftChange) onEditDraftChange(value);
			resizeEditor(event.target);
		},
		onKeyDown: (event) => {
			if (event.isComposing || event.nativeEvent && event.nativeEvent.isComposing) return;
			if (event.key === "Escape") {
				event.preventDefault();
				onCancelEdit();
				return;
			}
			if (event.key !== "Enter") return;
			const chord = event.ctrlKey || event.metaKey;
			const platformModifier = isSendModifier(event);
			if (sendShortcut === "enter") {
				if (!chord && !event.shiftKey) {
					event.preventDefault();
					onFinishEdit(item);
				} else {
					event.preventDefault();
					insertEditNewline(event.currentTarget);
				}
				return;
			}
			if (platformModifier) {
				event.preventDefault();
				if (event.shiftKey) insertEditNewline(event.currentTarget);
				else onFinishEdit(item);
			} else if (event.shiftKey) {
				event.preventDefault();
				insertEditNewline(event.currentTarget);
			}
		},
		onBlur: () => onFinishEdit(item)
	}), h$10("div", { className: "dsh-an-editActions" }, h$10("button", {
		type: "button",
		className: "dsh-an-mini dsh-an-miniPrimary",
		onMouseDown: (event) => event.preventDefault(),
		onClick: () => onFinishEdit(item)
	}, say("edit.save")), h$10("button", {
		type: "button",
		className: "dsh-an-mini",
		onMouseDown: (event) => event.preventDefault(),
		onClick: onCancelEdit
	}, say("edit.cancel")), h$10("span", {
		className: "dsh-an-editHint",
		title: say(editHintKey, { mod: MOD_LABEL })
	}, say(editHintKey, { mod: MOD_LABEL })))) : h$10("div", {
		className: "dsh-an-text",
		title: say("item.editHint"),
		onDoubleClick: () => onStartEdit(item)
	}, item.text);
	const checked = done === true;
	return h$10("li", { className: done ? "dsh-an-row dsh-an-rowDone" : "dsh-an-row" }, h$10("button", {
		type: "button",
		className: "dsh-an-check",
		role: "checkbox",
		"aria-checked": checked ? "true" : "false",
		"aria-label": say(done ? "item.markOpen" : "item.markDone"),
		onClick: toggleCheck
	}, h$10("span", { className: "dsh-an-checkCircle" }, checked ? h$10(IconCheck, { size: 9 }) : null)), h$10("div", { className: "dsh-an-itemBody" }, body, editing ? null : h$10("div", { className: "dsh-an-rowFoot" }, h$10("span", {
		className: "dsh-an-meta",
		title: metaLabel(item, say, props.localeId)
	}, metaLabel(item, say, props.localeId)), h$10("div", { className: "dsh-an-actions" }, withTooltip(say("item.copy"), h$10("button", {
		type: "button",
		className: "dsh-an-iconBtn",
		"aria-label": say("item.copy"),
		"aria-busy": pending === "copy" ? "true" : "false",
		"data-loading": pending === "copy" ? "true" : void 0,
		onClick: copy
	}, h$10(IconCopy, null))), done ? null : withTooltip(say(forwarded ? "item.forwarded" : "item.forward"), h$10("button", {
		type: "button",
		className: "dsh-an-iconBtn",
		"aria-label": say(forwarded ? "item.forwarded" : "item.forward"),
		"data-forwarded": forwarded ? "true" : void 0,
		onClick: forward
	}, h$10(IconForward, null), forwarded ? h$10("span", {
		className: "dsh-an-forwardMark",
		"aria-hidden": true
	}, h$10(IconCheck, { size: 8 })) : null)), withTooltip(say("item.edit"), h$10("button", {
		type: "button",
		className: "dsh-an-iconBtn",
		"aria-label": say("item.edit"),
		onClick: () => onStartEdit(item)
	}, h$10(IconPencil, null))), withTooltip(say("item.delete"), h$10("button", {
		type: "button",
		className: "dsh-an-iconBtn dsh-an-iconBtnDanger",
		"aria-label": say("item.delete"),
		onClick: () => onDelete(item)
	}, h$10(IconTrash, null)))))));
}

// src/client/ui/ScopeSwitch.tsx
/** Segmented switch between the workspace list and the session list. */
const h$9 = react.default.createElement;
function ScopeSwitch(props) {
	const { say, mode, onChange } = props;
	const options = [{
		value: "workspace",
		label: say("scope.workspace")
	}, {
		value: "session",
		label: say("scope.session")
	}];
	return h$9("div", {
		className: "dsh-an-scope",
		role: "group",
		"aria-label": say("scope.label")
	}, options.map((option) => h$9("button", {
		key: option.value,
		type: "button",
		className: "dsh-an-scopeBtn",
		"data-scope-mode": option.value,
		"data-active": mode === option.value ? "true" : void 0,
		"aria-pressed": mode === option.value,
		onClick: () => onChange(option.value)
	}, option.label)));
}

// src/client/ui/PanelHead.ts
/** Panel title, counts, the list-scope switch and the settings/close actions. */
const h$8 = react.default.createElement;
function PanelHead(props) {
	const { say, openCount, total, showSettings, onToggleSettings, onClose, newerVersion, scopeMode, canUseWorkspace, onScopeChange } = props;
	return h$8("div", { className: "dsh-an-popHead" }, h$8("div", { className: "dsh-an-popTitleLine" }, h$8("div", { className: "dsh-an-popTitle" }, say("popover.title")), h$8("p", { className: "dsh-an-popMeta" }, say("popover.count", {
		open: openCount,
		total
	})), canUseWorkspace ? h$8(ScopeSwitch, {
		say,
		mode: scopeMode,
		onChange: onScopeChange
	}) : null), h$8("div", { className: "dsh-an-popActions" }, withTooltip(say("settings.open"), h$8("button", {
		type: "button",
		className: "dsh-an-settingsBtn",
		"data-active": showSettings ? "true" : void 0,
		"aria-label": newerVersion ? `${say("settings.open")} · ${say("update.tip", { version: `v${newerVersion}` })}` : say("settings.open"),
		"aria-expanded": showSettings,
		onClick: onToggleSettings
	}, h$8(IconGear, null), newerVersion ? h$8("span", {
		className: "dsh-an-updateDot",
		"aria-hidden": true
	}) : null)), withTooltip(say("popover.close"), h$8("button", {
		type: "button",
		className: "dsh-an-popClose",
		"aria-label": say("popover.close"),
		onClick: onClose
	}, h$8(IconClose, null)))));
}

// src/client/ui/UpdateNotice.ts
/**
* Settings › About › update centre.
*
* One compact card: the published version, the release notes it ships with, and
* the update action. The notes load and show as soon as an update is offered —
* they are not hidden behind a disclosure. The action is a button, never
* automatic: the market queues the update when it is clicked, and the panel
* reports the operation instead of guessing.
*
* When the market is missing, or stays busy with another operation after the
* waiting window, the card stops insisting on its own button and states the
* terminal command — with one click to copy a ready-to-paste prompt for an
* agent. The panel still never runs a package manager itself.
*
* A jump across several versions lists each release separately: the newest one
* opens by default and the ones behind it expand on demand, so a 2.0.0 install
* upgrading to 2.3.0 can read 2.1.0, 2.2.0 and 2.3.0 in order. The full release
* page opens from the link beside the update button.
*/
const h$7 = react.default.createElement;
const NOTES_ID = "dsh-an-update-notes";
/** Failure codes the card can explain without echoing the market's message. */
const FAILURE_COPY = {
	RELEASE_TOO_FRESH: "update.tooFresh",
	VERSION_UNCHANGED: "update.unchanged",
	PLUGIN_NOT_INSTALLED: "update.notInstalled",
	UPDATE_FORBIDDEN: "update.forbidden",
	UPDATE_REJECTED: "update.rejected",
	OPERATION_BUSY: "update.busy",
	AGENTS_RUNNING: "update.agentsRunning",
	UPDATE_TIMEOUT: "update.timeout",
	"bundle-in-use": "update.bundleInUse",
	"already-installed": "update.alreadyInstalled",
	"management-required": "update.managementRequired",
	"not-removable": "update.notRemovable",
	"stop-profile": "update.stopProfile",
	"incompatible-version": "update.incompatible",
	RESOLVED_VERSION_MISMATCH: "update.versionMismatch",
	DOWNGRADE_DETECTED: "update.downgrade",
	AUTO_UPDATE_UNAVAILABLE: "update.autoUnavailable"
};
/** Refusals a terminal command can actually get past. */
const MANUAL_FALLBACK = /* @__PURE__ */ new Set([
	"OPERATION_BUSY",
	"AGENTS_RUNNING",
	"bundle-in-use",
	"already-installed",
	"management-required",
	"not-removable",
	"stop-profile",
	"AUTO_UPDATE_UNAVAILABLE"
]);
function UpdateNotice(props) {
	const { say, latestVersion, notes, expandedVersions, run, fullReleaseUrl } = props;
	const notesRef = react.default.useRef(null);
	const [fade, setFade] = react.default.useState(false);
	const syncFade = react.default.useCallback(() => {
		const node = notesRef.current;
		if (!node) {
			setFade(false);
			return;
		}
		const overflow = node.scrollHeight > node.clientHeight + 1;
		const atBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 1;
		setFade(overflow && !atBottom);
	}, []);
	react.default.useEffect(() => {
		const node = notesRef.current;
		if (!node) return void 0;
		const frame = requestAnimationFrame(syncFade);
		const onScroll = () => syncFade();
		node.addEventListener("scroll", onScroll, { passive: true });
		let observer = null;
		if (typeof ResizeObserver === "function") {
			observer = new ResizeObserver(syncFade);
			observer.observe(node);
		}
		window.addEventListener("resize", syncFade);
		return () => {
			cancelAnimationFrame(frame);
			node.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", syncFade);
			observer?.disconnect();
		};
	}, [
		notes.status,
		notes.entries,
		expandedVersions,
		syncFade
	]);
	if (latestVersion === null) return null;
	const phase = run.phase;
	const busy = phase === "starting" || phase === "waiting" || phase === "running";
	const failureKey = run.failureCode ? FAILURE_COPY[run.failureCode] : "";
	const canForce = run.failureCode === "RELEASE_TOO_FRESH" || run.failureCode === "VERSION_UNCHANGED";
	/**
	* No market, one that stayed busy, or one that refuses to replace files under
	* a running agent: the user needs the command now, not a "try again later"
	* with nothing behind it. The panel never runs a package manager itself, so
	* the command is the way past a refusal — it does not go through the market.
	* A busy market keeps its retry button, so both paths stay reachable.
	*/
	const manual = run.failureCode !== null && MANUAL_FALLBACK.has(run.failureCode);
	const progress = phase === "running" ? run.percent === null ? say("update.updating") : say("update.updatingPercent", { percent: run.percent }) : "";
	/**
	* Hand the user a prompt they can paste into an agent; report the outcome.
	* The prompt asks for the latest release rather than this card's version, so
	* it stays correct if a newer one lands between render and click.
	*/
	const copyPrompt = () => {
		const text = say("update.prompt");
		Promise.resolve(props.onCopyPrompt(text)).then((ok) => {
			reportEvent("update_started", {
				ext1: "command",
				ext2: ok ? "copied" : "copy_failed"
			});
			if (typeof props.onToast === "function") props.onToast(ok ? "copied" : "copyFailed");
		});
	};
	const noteGroups = (list) => list.map((group, index) => h$7("div", {
		key: `${group.title}-${index}`,
		className: "dsh-an-updateGroup"
	}, group.title ? h$7("div", { className: "dsh-an-updateGroupTitle" }, group.title) : null, h$7("ul", { className: "dsh-an-updateItems" }, group.items.map((item, itemIndex) => h$7("li", {
		key: itemIndex,
		className: "dsh-an-updateItem"
	}, item.lead ? h$7("strong", null, item.lead) : null, item.lead ? " " : null, item.body)))));
	const entryBody = (entry) => entry.groups.length > 0 ? noteGroups(entry.groups) : h$7("p", { className: "dsh-an-updateHint" }, say("update.notesMissing"));
	const notesBody = notes.status === "loading" ? h$7("p", { className: "dsh-an-updateHint" }, say("update.notesLoading")) : notes.status === "error" ? h$7("p", { className: "dsh-an-updateHint" }, say("update.notesFailed")) : notes.status === "ready" && notes.entries.length === 1 ? entryBody(notes.entries[0]) : notes.status === "ready" ? h$7("div", { className: "dsh-an-updateVersions" }, h$7("p", { className: "dsh-an-updateHint" }, say("update.historyCount", { n: notes.entries.length })), notes.entries.map((entry, index) => {
		const open = expandedVersions[entry.version] === true;
		return h$7("div", {
			key: entry.version,
			className: "dsh-an-updateVersion"
		}, h$7("button", {
			type: "button",
			className: "dsh-an-updateVersionHead",
			"aria-expanded": open,
			"aria-controls": `${NOTES_ID}-${entry.version}`,
			onClick: () => props.onToggleVersion(entry.version)
		}, h$7("span", {
			className: "dsh-an-updateChevron",
			"data-open": open ? "true" : "false",
			"aria-hidden": true
		}, "▸"), h$7("span", { className: "dsh-an-updateVersionLabel" }, `v${entry.version}`), index === 0 ? h$7("span", { className: "dsh-an-updateLatest" }, say("update.latest")) : null), open ? h$7("div", {
			id: `${NOTES_ID}-${entry.version}`,
			className: "dsh-an-updateVersionBody"
		}, entryBody(entry)) : null);
	}), notes.truncated ? h$7("a", {
		className: "dsh-an-updateFull",
		href: props.releasesUrl,
		target: "_blank",
		rel: "noreferrer"
	}, say("update.olderNotes")) : null) : null;
	return h$7("div", { className: "dsh-an-updateCard" }, h$7("div", { className: "dsh-an-updateTitle" }, say("update.available", { version: `v${latestVersion}` })), h$7("div", {
		id: NOTES_ID,
		ref: notesRef,
		className: "dsh-an-updateNotes",
		role: "region",
		"aria-label": say("update.notesTitle"),
		"data-fade": fade ? "true" : void 0
	}, notesBody), h$7("div", { className: "dsh-an-updateActions" }, phase === "done" ? h$7("div", { className: "dsh-an-updateDone" }, h$7("span", { className: "dsh-an-updateHint" }, say("update.updated", { version: run.installedVersion ? `v${run.installedVersion}` : `v${latestVersion}` })), h$7("button", {
		type: "button",
		className: "dsh-an-updatePrimary",
		onClick: props.onRefresh
	}, say("update.refresh"))) : h$7("button", {
		type: "button",
		className: "dsh-an-updatePrimary",
		disabled: busy,
		"aria-busy": busy,
		onClick: () => props.onStartUpdate(false)
	}, busy ? phase === "running" ? progress : phase === "waiting" ? say("update.waiting") : say("update.starting") : say("update.now")), fullReleaseUrl ? h$7("a", {
		className: "dsh-an-updateFull",
		href: fullReleaseUrl,
		target: "_blank",
		rel: "noreferrer"
	}, say("update.full")) : null), phase === "error" ? h$7("div", { className: "dsh-an-updateErrorRow" }, h$7("p", {
		className: "dsh-an-updateError",
		role: "status"
	}, failureKey ? say(failureKey) : say("update.failed", { reason: run.message || run.failureCode || "" })), canForce ? h$7("button", {
		type: "button",
		className: "dsh-an-updateLinkBtn",
		onClick: () => props.onStartUpdate(true)
	}, say("update.force")) : null) : null, manual ? h$7("div", { className: "dsh-an-updateFallback" }, h$7("p", { className: "dsh-an-updateHint" }, say("update.manualHint")), h$7("button", {
		type: "button",
		className: "dsh-an-updateCopy",
		onClick: copyPrompt
	}, say("update.copyPrompt"))) : null, run.phase === "done" && run.restartRequired ? h$7("p", { className: "dsh-an-updateHint" }, say("update.restartHint")) : null);
}

// src/client/ui/SettingsPanel.ts
/** Settings card: send shortcut, forward prefix and about. */
const h$6 = react.default.createElement;
function SettingsPanel(props) {
	const { say, sendShortcut, chooseShortcut, forwardPrefix, changeForwardPrefix, prefixRef, analyticsEnabled, onToggleAnalytics, update } = props;
	return h$6("div", { className: "dsh-an-settings" }, h$6("div", { className: "dsh-an-settingsHead" }, say("settings.title")), h$6("div", { className: "dsh-an-settingGroup" }, h$6("div", { className: "dsh-an-settingLabel" }, say("settings.shortcut")), h$6("div", { className: "dsh-an-settingBody" }, h$6("div", { className: "dsh-an-settingChoices" }, h$6("label", { className: "dsh-an-settingChoice" }, h$6("input", {
		type: "radio",
		name: "dsh-an-send-shortcut",
		checked: sendShortcut === "enter",
		onChange: () => chooseShortcut("enter")
	}), h$6("span", null, say("settings.shortcutEnter", { mod: MOD_LABEL }))), h$6("label", { className: "dsh-an-settingChoice" }, h$6("input", {
		type: "radio",
		name: "dsh-an-send-shortcut",
		checked: sendShortcut === "ctrl-enter",
		onChange: () => chooseShortcut("ctrl-enter")
	}), h$6("span", null, say("settings.shortcutCtrlEnter", { mod: MOD_LABEL })))))), h$6("div", { className: "dsh-an-settingGroup" }, h$6("div", { className: "dsh-an-settingLabel" }, say("settings.forward")), h$6("div", { className: "dsh-an-settingBody" }, h$6("div", { className: "dsh-an-settingItem" }, h$6("textarea", {
		id: "dsh-an-forward-prefix",
		ref: prefixRef,
		className: "dsh-an-settingInput dsh-an-settingTextarea",
		value: forwardPrefix,
		rows: 1,
		maxLength: 80,
		placeholder: say("forward.prefix"),
		"aria-label": say("settings.forwardPrefixItem"),
		"aria-describedby": "dsh-an-forward-prefix-hint",
		style: {
			fontFamily: "inherit",
			fontSize: "var(--an-fs-row)",
			lineHeight: "var(--an-lh-row)",
			fontWeight: 500
		},
		onChange: (event) => changeForwardPrefix(event.target.value)
	}), h$6("p", {
		id: "dsh-an-forward-prefix-hint",
		className: "dsh-an-settingHint"
	}, say("settings.forwardPrefixHint"))))), h$6("div", { className: "dsh-an-settingGroup" }, h$6("div", { className: "dsh-an-settingLabel" }, say("settings.privacy")), h$6("div", { className: "dsh-an-settingBody" }, h$6("label", { className: "dsh-an-settingToggle" }, h$6("span", null, say("settings.analytics")), h$6("input", {
		type: "checkbox",
		role: "switch",
		className: "dsh-an-switch",
		checked: analyticsEnabled === true,
		onChange: (event) => onToggleAnalytics(event.target.checked),
		"aria-describedby": "dsh-an-analytics-hint"
	})), h$6("p", {
		id: "dsh-an-analytics-hint",
		className: "dsh-an-settingHint"
	}, say("settings.analyticsHint")))), h$6("div", { className: "dsh-an-settingGroup" }, h$6("div", { className: "dsh-an-settingLabel" }, say("settings.about")), h$6("div", { className: "dsh-an-settingBody" }, h$6("div", { className: "dsh-an-settingBrand" }, h$6("span", { className: "dsh-an-settingBrandName" }, say("title")), h$6("span", { className: "dsh-an-settingBrandTagline" }, say("settings.tagline"))), h$6("div", { className: "dsh-an-settingAbout" }, h$6("span", { className: "dsh-an-settingAboutVersion" }, `${say("settings.version")} ${PLUGIN_VERSION}`), h$6("button", {
		type: "button",
		className: "dsh-an-updateCheck",
		disabled: update.check.status === "checking",
		onClick: update.checkNow
	}, say(update.check.status === "checking" ? "update.checking" : update.check.status === "error" ? "update.retryCheck" : "update.check")), update.check.status === "current" ? h$6("span", {
		className: "dsh-an-updateHint",
		role: "status"
	}, say("update.current")) : null, update.check.status === "error" ? h$6("span", {
		className: "dsh-an-updateHint dsh-an-updateHintError",
		role: "status"
	}, say("update.checkFailed")) : null), update.latestVersion ? h$6(UpdateNotice, {
		say,
		latestVersion: update.latestVersion,
		notes: update.notes,
		expandedVersions: update.expandedVersions,
		releasesUrl: update.releasesUrl,
		run: update.run,
		fullReleaseUrl: update.fullReleaseUrl,
		onToggleVersion: update.toggleVersion,
		onStartUpdate: update.startUpdate,
		onRefresh: update.refreshPage,
		onCopyPrompt: update.copyPrompt,
		onToast: props.onToast
	}) : null, h$6("div", { className: "dsh-an-settingMetaRow" }, h$6("span", null, say("settings.author")), h$6("span", {
		className: "dsh-an-settingDot",
		"aria-hidden": true
	}, "·"), h$6("span", null, PLUGIN_AUTHOR)), h$6("div", { className: "dsh-an-settingMetaRow" }, h$6("span", null, say("settings.project")), h$6("span", {
		className: "dsh-an-settingDot",
		"aria-hidden": true
	}, "·"), h$6("a", {
		className: "dsh-an-settingLink",
		href: PLUGIN_REPO_URL,
		target: "_blank",
		rel: "noreferrer",
		title: PLUGIN_REPO_URL
	}, PLUGIN_REPO_LABEL)))));
}

// src/client/ui/ComposerForm.ts
/** The add form: one growing textarea, the shortcut hint and the submit button. */
const h$5 = react.default.createElement;
function ComposerForm(props) {
	const { say, draft, inputRef, sendShortcut, onDraftChange, onCompositionStart, onCompositionEnd, onKeyDown, onSubmit } = props;
	return h$5("form", {
		className: "dsh-an-add",
		onSubmit
	}, h$5("textarea", {
		ref: inputRef,
		className: "dsh-an-input",
		value: draft,
		rows: 1,
		maxLength: 280,
		placeholder: say("add.placeholder"),
		"aria-label": say("add.placeholder"),
		onChange: onDraftChange,
		onCompositionStart,
		onCompositionEnd,
		onKeyDown
	}), h$5("div", { className: "dsh-an-addFoot" }, h$5("span", { className: "dsh-an-addShortcut" }, say(sendShortcut === "enter" ? "add.shortcutEnter" : "add.shortcut", { mod: MOD_LABEL })), h$5("button", {
		type: "submit",
		className: "dsh-an-addBtn",
		disabled: !draft.trim()
	}, say("add.action"))));
}

// src/client/ui/ClearConfirm.ts
/** Inline second confirmation for clearing the completed notes. */
const h$4 = react.default.createElement;
function ClearConfirm(props) {
	const { say, count, onCancel, onConfirm } = props;
	return h$4("div", {
		className: "dsh-an-clearConfirm",
		role: "group",
		"aria-live": "polite",
		"aria-label": say("popover.clearConfirm", { n: count })
	}, h$4("p", { className: "dsh-an-clearConfirmText" }, say("popover.clearConfirm", { n: count })), h$4("div", { className: "dsh-an-clearConfirmActions" }, h$4("button", {
		type: "button",
		className: "dsh-an-mini",
		onClick: onCancel
	}, say("popover.clearCancel")), h$4("button", {
		type: "button",
		className: "dsh-an-mini dsh-an-miniDanger",
		onClick: onConfirm
	}, say("popover.clearConfirmAction"))));
}

// src/client/ui/EmptyState.ts
const h$3 = react.default.createElement;
function EmptyState(props) {
	return h$3("div", { className: "dsh-an-empty" }, h$3("div", { className: "dsh-an-emptyIcon" }, h$3(IconEmpty, null)), h$3("div", { className: "dsh-an-emptyTitle" }, props.title), h$3("div", { className: "dsh-an-emptyBody" }, props.body));
}

// src/client/ui/NoteList.ts
/** Open/completed sections, their sticky heads, rows and the clear confirmation. */
const h$2 = react.default.createElement;
function NoteList(props) {
	const { say, listRef, listHasMore, syncListEdge, showOpen, toggleOpen, openItems, openCount, total, row, showDone, toggleDone, doneItems, confirmClear, askClearConfirm, dismissClearConfirm, confirmClearDone } = props;
	return h$2("div", {
		className: "dsh-an-listViewport",
		"data-bottom": listHasMore ? "true" : void 0
	}, h$2("div", {
		className: "dsh-an-listArea",
		ref: listRef,
		onScroll: syncListEdge
	}, h$2("div", { className: "dsh-an-listSection" }, h$2("div", { className: "dsh-an-sectionHead" }, h$2("button", {
		type: "button",
		className: "dsh-an-doneToggle",
		"aria-expanded": showOpen ? "true" : "false",
		onClick: toggleOpen
	}, h$2("span", {
		className: "dsh-an-chevron",
		"data-open": showOpen ? "true" : "false"
	}, h$2(IconChevron, null)), say("list.open"), openCount ? h$2("span", { className: "dsh-an-sectionCount" }, String(openCount)) : null)), showOpen ? openItems.length ? h$2("ul", { className: "dsh-an-rows" }, openItems.map(row)) : h$2(EmptyState, {
		title: say(total ? "list.allDone.title" : "popover.empty.title"),
		body: say(total ? "list.allDone.body" : "popover.empty.body")
	}) : null), doneItems.length ? h$2("div", { className: "dsh-an-listSection" }, h$2("div", { className: "dsh-an-doneHead" }, h$2("button", {
		type: "button",
		className: "dsh-an-doneToggle",
		"aria-expanded": showDone ? "true" : "false",
		onClick: toggleDone
	}, h$2("span", {
		className: "dsh-an-chevron",
		"data-open": showDone ? "true" : "false"
	}, h$2(IconChevron, null)), say("popover.completed"), h$2("span", { className: "dsh-an-sectionCount" }, String(doneItems.length))), showDone ? h$2("button", {
		type: "button",
		className: "dsh-an-clear",
		"aria-expanded": confirmClear ? "true" : "false",
		onClick: askClearConfirm
	}, say("popover.clearDone")) : null), showDone && confirmClear ? h$2(ClearConfirm, {
		say,
		count: doneItems.length,
		onCancel: dismissClearConfirm,
		onConfirm: confirmClearDone
	}) : null, showDone ? h$2("ul", { className: "dsh-an-rows dsh-an-doneRows" }, doneItems.map(row)) : null) : null));
}

// src/client/ui/MemoPopover.ts
/**
* The floating notes panel.
*
* State, handlers and effects for the list in view; the markup lives in the
* sibling components, the geometry in usePanelGeometry and the store in
* useSessionMemoStore.
*/
const h$1 = react.default.createElement;
function MemoPopover(props) {
	const say = props.say;
	const localeId = props.localeId;
	const sessionId = props.sessionId || "";
	/** The header switch remembers its choice; a workspace-less session stays session-scoped. */
	const [mode, setMode] = react.default.useState(() => readScopeMode());
	react.default.useEffect(() => {
		const onStorage = (event) => {
			if (event && event.key === "dsh.aside-note.scope-mode") setMode(readScopeMode());
		};
		window.addEventListener("storage", onStorage);
		return () => window.removeEventListener("storage", onStorage);
	}, []);
	const canUseWorkspace = Boolean(workspaceScopeForSession(sessionId));
	const scope = scopeForSession(sessionId, mode);
	const draftKey = draftKeyForSession(sessionId);
	/** Settled outcomes go to the frame-wide toast host, not to inline marks. */
	const report = typeof props.onToast === "function" ? props.onToast : () => {};
	const { record, syncError, commit } = useMemoStore(scope);
	const { sectionsRef, showOpen, showDone, toggleOpen, toggleDone, applySections } = useSections();
	const { forwardedIds, rememberForwarded, unrememberForwarded, forgetForwardedItems } = useForwardMarks(scopeKey(scope));
	const { showSettings, setShowSettings, sendShortcut, chooseShortcut, forwardPrefix, changeForwardPrefix, prefixRef, analyticsEnabled, toggleAnalytics } = usePanelSettings();
	const update = useUpdateCenter(localeId);
	const newerVersion = update.latestVersion;
	const { draft, addRef, composingRef, add, onDraftChange, onDraftKeyDown } = useComposerDraft({
		draftKey,
		commit,
		report,
		sendShortcut,
		scopeKind: scope.kind
	});
	const { editingId, editDraft, setEditDraft, editRef, startEdit, finishEdit, cancelEdit, stopEditing, toggle, remove } = useNoteActions({
		draftKey,
		commit,
		report,
		forgetForwardedItems,
		scopeKind: scope.kind
	});
	const { confirmClear, askClearConfirm, dismissClearConfirm, confirmClearDone } = useClearConfirm({
		sessionId,
		showDone,
		doneCount: record.items.filter((item) => item.done).length,
		onConfirm: () => clearDone()
	});
	const panelRef = react.default.useRef(null);
	const { style, commitPanelWidth, commitPanelHeight, startPanelResize, startPanelHeightResize, onPanelResizeKeyDown, onPanelHeightKeyDown } = usePanelGeometry(props.anchorRef, props.placement, panelRef);
	const items = record.items || [];
	const openItems = items.filter((item) => !item.done);
	const doneItems = items.filter((item) => item.done).sort(compareDoneItems);
	const openCount = openItems.length;
	const total = items.length;
	const { listRef, listHasMore, syncListEdge } = useListEdge({
		items,
		showOpen,
		showDone
	});
	useOutsideDismiss(panelRef, props.anchorRef, props.onClose);
	const chooseScope = (next) => {
		if (next === mode) return;
		if (next === "workspace" && !canUseWorkspace) return;
		if (next === "workspace") {
			const workspace = scopeForSession(sessionId, "workspace");
			if (workspace.kind === "workspace") ensureWorkspaceRecord(workspace.id, workspace.sessionIds);
		}
		writeScopeMode(next);
		setMode(next);
		stopEditing();
		dismissClearConfirm();
		notifyTodoChange();
		reportEvent("note_scope_changed", { ext1: next });
	};
	const clearDone = () => {
		const clearedItems = items.filter((item) => item.done);
		if (!commit((currentItems) => currentItems.filter((item) => !item.done))) {
			report("saveFailed");
			return;
		}
		report("cleared");
		reportEvent("completed_notes_cleared", {
			ext1: scope.kind,
			ext2: String(clearedItems.length)
		});
		forgetForwardedItems(clearedItems.map((item) => item.id));
		applySections({
			open: sectionsRef.current.open,
			done: false
		});
	};
	const row = (item) => h$1(TodoRow, {
		key: item.id,
		item,
		done: item.done,
		say,
		localeId,
		scopeKind: scope.kind,
		onToast: report,
		onToggle: toggle,
		onStartEdit: startEdit,
		onDelete: remove,
		editing: editingId === item.id,
		editDraft,
		setEditDraft,
		onEditDraftChange: (value) => saveEditDraft(draftKey, item.id, value),
		onFinishEdit: finishEdit,
		onCancelEdit: cancelEdit,
		editRef,
		forwardPrefix: forwardPrefix.trim() ? forwardPrefix : say("forward.prefix"),
		sendShortcut,
		forwarded: forwardedIds[item.id] === true,
		onForwarded: rememberForwarded,
		onUnforwarded: unrememberForwarded
	});
	const content = h$1("div", {
		ref: panelRef,
		className: props.placement === "right" ? "dsh-an-popover dsh-an-popoverRight" : "dsh-an-popover",
		style,
		role: "dialog",
		"aria-label": say("popover.title")
	}, props.placement === "right" ? h$1("div", {
		className: "dsh-an-resizeHandle",
		role: "separator",
		"aria-orientation": "vertical",
		"aria-label": say("resize.width"),
		tabIndex: 0,
		title: say("resize.hint"),
		onPointerDown: startPanelResize,
		onDoubleClick: () => commitPanelWidth(360),
		onKeyDown: onPanelResizeKeyDown
	}) : null, props.placement === "right" ? h$1("div", {
		className: "dsh-an-resizeHandleBottom",
		role: "separator",
		"aria-orientation": "horizontal",
		"aria-label": say("resize.height"),
		tabIndex: 0,
		title: say("resize.hint"),
		onPointerDown: startPanelHeightResize,
		onDoubleClick: () => commitPanelHeight(0),
		onKeyDown: onPanelHeightKeyDown
	}) : null, h$1(PanelHead, {
		say,
		openCount,
		total,
		showSettings,
		onToggleSettings: () => {
			if (!showSettings) reportEvent("settings_opened");
			setShowSettings((value) => !value);
		},
		onClose: props.onClose,
		newerVersion,
		scopeMode: mode,
		canUseWorkspace,
		onScopeChange: chooseScope
	}), showSettings ? h$1(SettingsPanel, {
		say,
		sendShortcut,
		chooseShortcut,
		forwardPrefix,
		changeForwardPrefix,
		prefixRef,
		analyticsEnabled,
		onToggleAnalytics: toggleAnalytics,
		update,
		onToast: report
	}) : null, h$1(ComposerForm, {
		say,
		draft,
		inputRef: addRef,
		sendShortcut,
		onDraftChange,
		onCompositionStart: () => {
			composingRef.current = true;
		},
		onCompositionEnd: () => {
			composingRef.current = false;
		},
		onKeyDown: onDraftKeyDown,
		onSubmit: (event) => {
			event.preventDefault();
			if (composingRef.current) return;
			add();
		}
	}), h$1(NoteList, {
		say,
		listRef,
		listHasMore,
		syncListEdge,
		showOpen,
		toggleOpen,
		openItems,
		openCount,
		total,
		row,
		showDone,
		toggleDone,
		doneItems,
		confirmClear,
		askClearConfirm,
		dismissClearConfirm,
		confirmClearDone
	}), h$1("div", {
		className: "dsh-an-popFoot",
		role: "status"
	}, h$1("span", { className: syncError ? "dsh-an-error" : void 0 }, say(syncError ? "storage.failed" : "popover.local"))));
	return react_dom.default.createPortal(content, document.body);
}

// src/client/index.ts
/**
* AsideNote browser half.
*
* The plugin entry: injects the stylesheet, binds the locale namespace and
* seats the two slots (session capture + frame-wide toast host) plus the
* host-owned header entry. Copy, storage, domain rules and the panel UI live
* in their own modules; P2 splits the remaining UI out of this file.
*/
const h = react.default.createElement;
/** Hosts without ui-workspace (and the bundle test) keep the session list. */
const useNoWorkspace = () => null;
/** Panel dwell time as a stable RUM dimension. */
function dwellBucket(ms) {
	if (ms < 5e3) return "<5s";
	if (ms < 3e4) return "5-30s";
	if (ms < 12e4) return "30-120s";
	if (ms < 6e5) return "2-10m";
	return ">=10m";
}
/** Compact floating memo list, anchored to the entry that opened it. */
function apply(ctx) {
	const locale = ctx.get("locale");
	ctx.effect(() => {
		const style = document.createElement("style");
		style.dataset.dshPlugin = "dsh-aside-note";
		style.textContent = panel_css_default;
		document.head.appendChild(style);
		return () => {
			style.remove();
		};
	}, "dsh-aside-note: styles");
	if (locale && typeof locale.register === "function") ctx.effect(() => locale.register(NS, DICT), "dsh-aside-note: dictionaries");
	const localeId = () => {
		try {
			const current = locale && typeof locale.getLocale === "function" ? locale.getLocale() : null;
			const id = current && (current.id || current.locale);
			return typeof id === "string" && id ? id : "zh";
		} catch {
			return "zh";
		}
	};
	const say = makeSay(ctx, localeId);
	const tr = (key, vars) => fill(say(key), vars);
	let activePopover = null;
	let activeSessionId = "";
	const toastSeat = createToastSeat(tr);
	let refreshHeaderEntry = () => {};
	const closeMemoPopover = () => {
		const current = activePopover;
		activePopover = null;
		if (!current) return;
		reportEvent("panel_closed", {
			ext1: current.scopeKind,
			ext2: dwellBucket(performance.now() - current.openedAt)
		});
		const hadFocus = current.container.contains(document.activeElement);
		try {
			current.root.unmount();
		} catch {}
		current.container.remove();
		const anchor = current.anchor;
		if (hadFocus && anchor && anchor.isConnected && typeof anchor.focus === "function") anchor.focus({ preventScroll: true });
		refreshHeaderEntry();
	};
	const openMemoPopover = (sessionId, anchor, placement = "popover") => {
		if (activePopover && activePopover.anchor === anchor) {
			closeMemoPopover();
			return;
		}
		closeMemoPopover();
		const scope = scopeForSession(sessionId, readScopeMode());
		if (scope.kind === "workspace") ensureWorkspaceRecord(scope.id, scope.sessionIds);
		const workspace = workspaceScopeForSession(sessionId);
		if (workspace) ensureDraftScope(draftKeyForSession(sessionId), sessionId, workspace.sessionIds);
		setForwardTarget(sessionId);
		const firstOpen = !hasOpenedPanel();
		if (firstOpen) markPanelOpened();
		reportEvent("panel_opened", {
			ext1: scope.kind,
			ext2: firstOpen ? "first" : "again"
		});
		const container = document.createElement("div");
		container.dataset.dshMemoPopoverRoot = "true";
		document.body.appendChild(container);
		const root = react_dom_client.default.createRoot(container);
		activePopover = {
			container,
			root,
			anchor,
			placement,
			openedAt: performance.now(),
			scopeKind: scope.kind
		};
		root.render(h(MemoPopover, {
			sessionId,
			say: tr,
			localeId: localeId(),
			anchorRef: { current: anchor },
			placement,
			onClose: closeMemoPopover,
			onToast: (kind) => toastSeat.show(kind)
		}));
		refreshHeaderEntry();
	};
	const headerEntry = createHeaderEntry({
		getSessionId: () => activeSessionId,
		getActiveAnchor: () => activePopover ? activePopover.anchor : null,
		getLocaleId: () => localeId(),
		tr,
		onOpen: (sessionId, anchor) => openMemoPopover(sessionId, anchor, "right")
	});
	refreshHeaderEntry = headerEntry.refresh;
	ctx.effect(() => headerEntry.attach(() => closeMemoPopover()), "dsh-aside-note: right-side entry");
	function BoundSessionCapture(props) {
		const sessionId = props.sessionId || "";
		const snapshot = (typeof props.useWorkspaces === "function" ? props.useWorkspaces : useNoWorkspace)((state) => state);
		const workspace = react.default.useMemo(() => {
			return (snapshot && Array.isArray(snapshot.items) ? snapshot.items : []).find((candidate) => candidate && Array.isArray(candidate.sessionIds) && candidate.sessionIds.includes(sessionId)) || null;
		}, [snapshot, sessionId]);
		react.default.useEffect(() => {
			const changed = bindWorkspace(sessionId, workspace);
			if (activeSessionId !== sessionId) {
				activeSessionId = sessionId;
				setForwardTarget(sessionId);
				closeMemoPopover();
			} else if (changed) closeMemoPopover();
			if (workspace) ensureWorkspaceRecord(workspace.workspaceId, workspace.sessionIds);
			refreshHeaderEntry();
		}, [sessionId, workspace]);
		return null;
	}
	ctx.slots.inject("conversation.composer.dock", () => ctx.slots.register({
		name: "conversation.composer.dock",
		id: PANEL_ID,
		order: 30,
		locale: NS
	}, BoundSessionCapture));
	ctx.slots.inject("shell.overlay", () => ctx.slots.register({
		name: "shell.overlay",
		id: `${PANEL_ID}.toast`,
		order: 60,
		locale: NS
	}, toastSeat.ToastHost));
}
module.exports = {
	inject: ["slots"],
	apply
};

return module.exports; } });