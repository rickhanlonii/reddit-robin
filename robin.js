(function (e, t, n) {
  if (t.hidden !== n)return;
  var r = ["webkit", "o", "ms", "moz"];
  for (var i = 0; i < r.length; i++) {
    var s = r[i];
    if (t[s + "Hidden"] !== n) {
      var o = new Event("visibilitychange");
      t.addEventListener(s + "visibilitychange", function () {
        t.dispatchEvent(o)
      }), Object.defineProperty(t, "hidden", {
        get: function () {
          return t[s + "Hidden"]
        }
      }), Object.defineProperty(t, "visibilityState", {
        get: function () {
          return t[s + "VisibilityState"]
        }
      });
      return
    }
  }
})(this, document), function () {
  var e = {}, t = null, n = null, r = null, i = null, s = {}, o = window.devicePixelRatio || 1, u = 16 * o, a = {
    width: 7,
    height: 9,
    font: 10 * o + "px arial",
    colour: "#ffffff",
    background: "#F03D25",
    fallback: !0,
    crossOrigin: !0,
    abbreviate: !0
  }, f = function () {
    var e = navigator.userAgent.toLowerCase();
    return function (t) {
      return e.indexOf(t) !== -1
    }
  }(), l = {
    ie: f("msie"),
    chrome: f("chrome"),
    webkit: f("chrome") || f("safari"),
    safari: f("safari") && !f("chrome"),
    mozilla: f("mozilla") && !f("chrome") && !f("safari")
  }, c = function () {
    var e = document.getElementsByTagName("link");
    for (var t = 0, n = e.length; t < n; t++)if ((e[t].getAttribute("rel") || "").match(/\bicon\b/))return e[t];
    return !1
  }, h = function () {
    var e = document.getElementsByTagName("link"), t = document.getElementsByTagName("head")[0];
    for (var n = 0, r = e.length; n < r; n++) {
      var i = typeof e[n] != "undefined";
      i && (e[n].getAttribute("rel") || "").match(/\bicon\b/) && t.removeChild(e[n])
    }
  }, p = function () {
    if (!n || !t) {
      var e = c();
      n = e ? e.getAttribute("href") : "/favicon.ico", t || (t = n)
    }
    return t
  }, d = function () {
    return i || (i = document.createElement("canvas"), i.width = u, i.height = u), i
  }, v = function (e) {
    h();
    var t = document.createElement("link");
    t.type = "image/x-icon", t.rel = "icon", t.href = e, document.getElementsByTagName("head")[0].appendChild(t)
  }, m = function (e) {
    window.console && window.console.log(e)
  }, g = function (e, t) {
    if (!d().getContext || l.ie || l.safari || s.fallback === "force")return y(e);
    var n = d().getContext("2d"), t = t || "#000000", i = p();
    r = document.createElement("img"), r.onload = function () {
      n.clearRect(0, 0, u, u), n.drawImage(r, 0, 0, r.width, r.height, 0, 0, u, u), (e + "").length > 0 && b(n, e, t), w()
    }, !i.match(/^data/) && s.crossOrigin && (r.crossOrigin = "anonymous"), r.src = i
  }, y = function (e) {
    if (s.fallback) {
      var t = document.title;
      t[0] === "(" && (t = t.slice(t.indexOf(" "))), (e + "").length > 0 ? document.title = "(" + e + ") " + t : document.title = t
    }
  }, b = function (e, t, n) {
    typeof t == "number" && t > 99 && s.abbreviate && (t = E(t));
    var r = (t + "").length - 1, i = s.width * o + 6 * o * r, a = s.height * o, f = u - a, c = u - i - o, h = 16 * o, p = 16 * o, d = 2 * o;
    e.font = (l.webkit ? "bold " : "") + s.font, e.fillStyle = s.background, e.strokeStyle = s.background, e.lineWidth = o, e.beginPath(), e.moveTo(c + d, f), e.quadraticCurveTo(c, f, c, f + d), e.lineTo(c, h - d), e.quadraticCurveTo(c, h, c + d, h), e.lineTo(p - d, h), e.quadraticCurveTo(p, h, p, h - d), e.lineTo(p, f + d), e.quadraticCurveTo(p, f, p - d, f), e.closePath(), e.fill(), e.beginPath(), e.strokeStyle = "rgba(0,0,0,0.3)", e.moveTo(c + d / 2, h), e.lineTo(p - d / 2, h), e.stroke(), e.fillStyle = s.colour, e.textAlign = "right", e.textBaseline = "top", e.fillText(t, o === 2 ? 29 : 15, l.mozilla ? 7 * o : 6 * o)
  }, w = function () {
    if (!d().getContext)return;
    v(d().toDataURL())
  }, E = function (e) {
    var t = [["G", 1e9], ["M", 1e6], ["k", 1e3]];
    for (var n = 0; n < t.length; ++n)if (e >= t[n][1]) {
      e = S(e / t[n][1]) + t[n][0];
      break
    }
    return e
  }, S = function (e, t) {
    var n = Number(e);
    return n.toFixed(t)
  };
  e.setOptions = function (e) {
    s = {};
    for (var t in a)s[t] = e.hasOwnProperty(t) ? e[t] : a[t];
    return this
  }, e.setImage = function (e) {
    return t = e, w(), this
  }, e.setBubble = function (e, t) {
    return e = e || "", g(e, t), this
  }, e.reset = function () {
    v(n)
  }, e.setOptions(a), window.Tinycon = e, typeof define == "function" && define.amd && define(e)
}(), r.WebSocket = function (e) {
  this._url = e, this._connectionAttempts = 0, this.on({"message:refresh": this._onRefresh}, this)
}, _.extend(r.WebSocket.prototype, Backbone.Events, {
  _backoffTime: 2e3,
  _maximumRetries: 9,
  _retryJitterAmount: 3e3,
  start: function () {
    var e = "WebSocket" in window;
    e && this._connect()
  },
  _connect: function () {
    r.debug("websocket: connecting"), this.trigger("connecting"), this._connectionStart = Date.now(), this._socket = new WebSocket(this._url), this._socket.onopen = _.bind(this._onOpen, this), this._socket.onmessage = _.bind(this._onMessage, this), this._socket.onclose = _.bind(this._onClose, this), this._connectionAttempts += 1
  },
  _sendStats: function (e) {
    if (!r.config.stats_domain)return;
    $.ajax({
      type: "POST",
      url: r.config.stats_domain,
      data: JSON.stringify(e),
      contentType: "application/json; charset=utf-8"
    })
  },
  _onOpen: function (e) {
    r.debug("websocket: connected"), this.trigger("connected"), this._connectionAttempts = 0, this._sendStats({websocketPerformance: {connectionTiming: Date.now() - this._connectionStart}})
  },
  _onMessage: function (e) {
    var t = JSON.parse(e.data);
    r.debug('websocket: received "' + t.type + '" message'), this.trigger("message message:" + t.type, t.payload)
  },
  _onRefresh: function () {
    var e = Math.random() * 300 * 1e3;
    setTimeout(function () {
      location.reload()
    }, e)
  },
  _onClose: function (e) {
    if (this._connectionAttempts < this._maximumRetries) {
      var t = this._backoffTime * Math.pow(2, this._connectionAttempts), n = Math.random() * this._retryJitterAmount - this._retryJitterAmount / 2, i = Math.round(t + n);
      r.debug("websocket: connection lost (" + e.code + "), reconnecting in " + i + "ms"), r.debug("(can't connect? Make sure you've allowed https access in your browser.)"), this.trigger("reconnecting", i), setTimeout(_.bind(this._connect, this), i)
    } else r.debug("websocket: maximum retries exceeded. bailing out"), this.trigger("disconnected");
    this._sendStats({websocketError: {error: 1}})
  }
}), r.templates.set([{
  style: "html",
  name: "robin/robinmessage",
  template: '<div class="robin-message\n        <% if (thing.displayCompact) { %>\n            robin-message--display-compact\n        <% } %>\n        robin--flair-class--<%- thing.flairClass %>\n        robin--message-class--<%- thing.messageClass %>\n        robin--user-class--<%- thing.userClass %>">\n    <time class="robin-message--timestamp" datetime="<%- thing.isoDate %>"><%- thing.timestamp %></time>\n    <% if (!thing.displayCompact) { %>\n      <span class="robin-message--from robin--username"><%- thing.author %></span>\n    <% } %>\n    <span class="robin-message--message"><%- thing.message %></span>\n</div>\n'
}]), r.templates.set([{
  style: "html",
  name: "robin/robinroomparticipant",
  template: '<div class="robin-room-participant\n        robin--user-class--<%- thing.userClass %>\n        robin--presence-class--<%- thing.presenceClass %>\n        robin--vote-class--<%- thing.voteClass %>">\n    <span class="robin--icon"></span>\n    <span class="robin--username"><%- thing.from %></span>\n</div>\n'
}]), !function (e) {
  function n() {
  }

  function r(e) {
    var t = e.stack;
    return t && t.split("\n").slice(1).join("\n")
  }

  function i(e, t, n, s) {
    if (!(this instanceof i))return new i(e, t, n, s);
    var o = Error.call(this);
    if ("stack" in o)if ("captureStackTrace" in Error)Error.captureStackTrace(this, i); else try {
      Object.defineProperty(this, "stack", {
        configurable: !0, get: function () {
          var e = r(o);
          return this.stack = e
        }
      })
    } catch (u) {
      this.stack = r(o)
    }
    var a = e + " | " + t;
    this.name = "ApiError", this.message = a, this.displayName = e, this.displayMessage = t, this.field = n || "", this.source = s || "api"
  }

  var t = {
    UNKNOWN_ERROR: e._("unknown error %(message)s"),
    NO_TEXT: e._("we need something here"),
    TOO_LONG: e._("this is too long (max: %(max_length)s)"),
    TOO_SHORT: e._("this is too short (min: %(min_length)s)"),
    SR_RULE_EXISTS: e._("A subreddit rule by that name already exists."),
    SR_RULE_TOO_MANY: e._("This subreddit already has the maximum number of rules.")
  };
  n.prototype = Error.prototype, i.prototype = new n, e.errors = {
    formatAPIError: function (e) {
      var t = e[0], n = e[1], r = e[2];
      return new i(t, n, r)
    }, getAPIErrorsFromResponse: function (t) {
      if (t && t.json && t.json.errors && t.json.errors.length)return t.json.errors.map(e.errors.formatAPIError);
      if (!t || t.error && typeof t.error == "string") {
        var n = t ? t.error : "unknown";
        return [e.errors.createAPIError("", "UNKNOWN_ERROR", {message: n})]
      }
    }, createAPIError: function (e, n, r) {
      var s = t[n] || "unknown";
      return r && (s = s.format(r)), new i(n, s, e, "client")
    }, _getErrorFieldSelector: function (e) {
      var t = ".error." + e.displayName;
      return e.field && (t += ".field-" + e.field), t
    }, showAPIError: function (e, t) {
      var n = this._getErrorFieldSelector(t);
      $(e).find(n).text(t.displayMessage).css("display", "inline")
    }, showAPIErrors: function (t, n) {
      n.forEach(function (n) {
        e.errors.showAPIError(t, n)
      })
    }, clearAPIErrors: function (e, t) {
      var n;
      t ? n = t.map(this._getErrorFieldSelector).join(", ") : n = ".error", $(e).find(n).text("").css("display", "none")
    }
  }
}(r), !function (e, t) {
  e.models = e.models || {}, e.models.validators = {
    validate: function (e, t) {
      for (var n = 0; n < t.length; n++) {
        validator = t[n], error = validator(e);
        if (error)return error
      }
    }
  }, e.models.validators.StringLength = function (t, n, i) {
    return n = Math.max(0, parseInt(n, 10)), i = Math.max(0, parseInt(i, 10)), function (o) {
      var u = o.get(t);
      if (typeof u != "string")return e.errors.createAPIError(t, "NO_TEXT");
      if (u.length < n)return e.errors.createAPIError(t, "TOO_SHORT", {min_length: n});
      if (i && u.length > i)return e.errors.createAPIError(t, "TOO_LONG", {max_length: i})
    }
  }
}(r), !function (e, t) {
  function c(e, t) {
    return function (n) {
      var r = n.get(e);
      if (t.indexOf(r) < 0)return new Error("INVALID_OPTION")
    }
  }

  function h(e) {
    return function (t) {
      if (typeof t.get(e) != "boolean")return new Error("NOT_BOOLEAN")
    }
  }

  function p(e) {
    return function (t) {
      if (typeof t.get(e) != "string")return new Error("NOT_STRING")
    }
  }

  e.robin = e.robin || {};
  var n = ["INCREASE", "CONTINUE", "ABANDON"], r = "NOVOTE", i = "user", s = ["user", "self", "system"], o = "message", u = ["message", "action"], a = "no-flair", f = 6, l = 140, d = Backbone.Model.extend({
    validate: function (t) {
      return e.models.validators.validate(this, this.validators)
    }, sync: function () {
      throw new Error("UNIMPLEMENTED")
    }
  }), v = d.extend({
    validators: [e.models.validators.StringLength("message", 1, l), c("messageClass", u), c("userClass", s)],
    defaults: {author: "", message: "", messageClass: o, userClass: i, flairClass: a}
  }), m = d.extend({validators: [c("vote", n)], defaults: {vote: r}}), g = d.extend({
    idAttribute: "name",
    flairClass: a,
    validators: [p("name"), c("userClass", s), c("vote", n), h("present")],
    defaults: {name: null, userClass: i, vote: r, present: !1},
    initialize: function () {
      var e = this.get("name").toLowerCase(), t = e.replace(/[^a-z0-9]/g, ""), n = parseInt(t, 36) % f;
      this.flairClass = "flair-" + n
    },
    hasVoted: function () {
      return this.get("vote") !== r
    },
    set: function (e, t) {
      var n = [e].concat(Object.keys(g.prototype.defaults));
      return e = _.pick.apply(_, n), g.__super__.set.call(this, e, t)
    }
  }), y = Backbone.Collection.extend({model: g}), b = Backbone.Collection.extend({model: v}), w = Backbone.Model.extend({
    idAttribute: "room_id",
    defaults: {room_id: null, room_name: null, api_type: "json", winning_vote: r},
    isComplete: function () {
      return this.get("winning_vote") !== r
    },
    postMessage: function (e) {
      var t = new v({message: e}), n = t.validate();
      n ? this.trigger("invalid:message", this, n) : this._post("message", t)
    },
    postVote: function (e) {
      var t = new m({vote: e}), n = t.validate();
      n ? (this.trigger("invalid:vote", this, n), this.trigger("invalid", this, n)) : this._post("vote", t)
    },
    postLeaveRoom: function () {
      this._post("leave_room")
    },
    _getPostData: function (e) {
      var e = [this].concat(e), t = e.map(function (e) {
        return e.toJSON()
      });
      return _.defaults.apply(_, t)
    },
    _post: function (t) {
      var n = [].slice.call(arguments, 1), r = this._getPostData(n);
      this.trigger("request:" + t, this), this.trigger("request", this), e.ajax({
        type: "POST",
        url: "/api/robin/" + e.config.robin_room_id + "/" + t,
        data: r,
        success: function (n) {
          var i = e.errors.getAPIErrorsFromResponse(n);
          i ? (this.trigger("error:" + t, this, i), this.trigger("error", this, i)) : (this.trigger("success:" + t, this, r), this.trigger("success", this, r))
        }.bind(this),
        error: function (e) {
          this.trigger("error:" + t, this, e), this.trigger("error", this, e)
        }.bind(this)
      })
    }
  });
  e.robin.VOTE_TYPES = n, e.robin.ROBIN_MESSAGE_MAX_LENGTH = l, e.robin.models = {
    RobinUser: g,
    RobinMessage: v,
    RobinRoomParticipants: y,
    RobinRoomMessages: b,
    RobinVote: m,
    RobinRoom: w
  }
}(r), !function (e, t, n) {
  e.robin = e.robin || {};
  var r = Backbone.View.extend({
    TEMPLATE_NAME: "robin/robinmessage",
    CHAR_CLASS: "robin-message--character",
    SPACE_CHAR_CLASS: "robin-message--space-character",
    JUICE_CLASS: "robin--animation-class--juicy-pop",
    JUICY_POP_INTERVAL: 200,
    _juicyPopInterval: null,
    initialize: function () {
      this.$chatList = this.$el.find("#robinChatMessageList"), this.lastMessageFrom = null
    },
    addMessage: function (t) {
      var r = new Date, i = r.toLocaleTimeString ? r.toLocaleTimeString() : r.toTimeString(), s = this.$el.prop("scrollHeight") - this.$el.scrollTop(), o = s === this.$el.height(), u = n.extend(t.toJSON(), {
        isoDate: r.toISOString(),
        timestamp: i
      });
      t.get("messageClass") !== "message" ? this.lastMessageFrom = null : t.get("author") === this.lastMessageFrom ? u.displayCompact = !0 : this.lastMessageFrom = t.get("author");
      var a = e.templates.make(this.TEMPLATE_NAME, u);
      this.$chatList.append(a), o && this.scrollToRecent()
    },
    scrollToRecent: function () {
      this.el.scrollTop = this.el.scrollHeight
    },
    juicyPop: function () {
      var e = this.$chatList.children(":not(." + this.JUICE_CLASS + ")").last();
      if (!e.length)return !1;
      this.lastMessageFrom = null;
      var n = e.find(".robin-message--message"), r = n.text(), i = [], s;
      for (var o = 0; o < r.length; o++)s = t(t.parseHTML("<span></span>")), s.text(r[o]), r[o] !== " " ? s.addClass(this.CHAR_CLASS) : s.addClass(this.SPACE_CHAR_CLASS), s.css({"transition-delay": Math.floor(Math.random() * 1e3) + "ms"}), i.push(s);
      return n.empty().append(i), setTimeout(function () {
        e.addClass(this.JUICE_CLASS)
      }.bind(this), 10), setTimeout(function () {
        e.remove()
      }.bind(this), 1500), !0
    },
    startJuicyPoppin: function () {
      console.log("started"), this._juicyPopInterval = setInterval(function () {
        console.log("poppin");
        var e = this.juicyPop();
        e || this.stopJuicyPoppin()
      }.bind(this), this.JUICY_POP_INTERVAL)
    },
    stopJuicyPoppin: function () {
      console.log("stopped"), this._juicyPopInterval = clearInterval(this._juicyPopInterval)
    }
  }), i = Backbone.View.extend({
    LAST_WORD_REGEX: /[^\s]+$/,
    _autoCompleting: !1,
    _autoCompleteIndex: 0,
    _autoCompleteValues: null,
    events: {"submit #robinSendMessage": "_onMessage", "keydown input[type=text]": "_onKeydown"},
    initialize: function () {
      this.form = t("#robinSendMessage")[0], this.counter = new e.ui.TextCounter({
        el: this.el,
        maxLength: e.robin.ROBIN_MESSAGE_MAX_LENGTH
      })
    },
    _onMessage: function (e) {
      e.preventDefault();
      var t = this.form.message.value;
      if (t[0] !== "/")this.trigger("chat", t), this.trigger("chat:message", t); else {
        var n = t.slice(1).split(/\s+/);
        n[0] && (this.trigger("chat", t), this.trigger("chat:command", n[0], n.slice(1)))
      }
    },
    _onKeydown: function (e) {
      if (!this.collection)return;
      var t = this.form.message;
      if (e.keyCode !== 9 || !t.selectionEnd || t.selectionStart !== t.selectionEnd) {
        this._autoCompleting = !1;
        return
      }
      if (this._autoCompleting) {
        e.preventDefault(), this._nextAutoComplete();
        return
      }
      var n = t.selectionEnd, r = t.value.slice(0, n);
      if (!r)return;
      var i = r.match(this.LAST_WORD_REGEX);
      if (!i)return;
      e.preventDefault(), this._startAutoComplete(i[0])
    },
    _startAutoComplete: function (e) {
      var t = new RegExp("^" + e), n = this.collection.filter(function (e) {
        return t.test(e.get("name"))
      });
      if (!n.length)return;
      this._autoCompleting = !0, this._autoCompleteIndex = 0, this._autoCompleteValues = n.map(function (e) {
        return e.get("name")
      }), this._nextAutoComplete()
    },
    _nextAutoComplete: function () {
      var e = this.form.message, t = e.value, n = e.selectionEnd, r = t.slice(0, n), i = t.slice(n), s = this._autoCompleteValues[this._autoCompleteIndex], o = r.replace(this.LAST_WORD_REGEX, s), n = o.length;
      e.value = o + i, e.setSelectionRange(n, n), this.counter.update(o), this._autoCompleteIndex = (this._autoCompleteIndex + 1) % this._autoCompleteValues.length
    },
    disable: function () {
      this.form.message.disabled = !0
    },
    enable: function () {
      this.form.message.disabled = !1
    },
    clear: function () {
      this.enable(), this.form.message.value = "", this.counter.update("")
    }
  }), s = Backbone.View.extend({
    ACTIVE_STATE_CLASS: "robin--active",
    isHidden: !1,
    currentTarget: null,
    initialize: function (e) {
      this.isHidden = !!e.isHidden, this.isHidden ? this.$el.hide() : this.isHidden || this.$el.show(), this.$el.removeAttr("hidden")
    },
    hide: function () {
      this.isHidden = !0, this.$el.slideUp()
    },
    show: function () {
      this.isHidden = !1, this.$el.slideDown()
    },
    _setActiveTarget: function (e) {
      this.currentTarget && t(this.currentTarget).removeClass(this.ACTIVE_STATE_CLASS), e && (this.currentTarget = e, t(this.currentTarget).addClass(this.ACTIVE_STATE_CLASS))
    }
  }), o = s.extend({
    VOTE_BUTTON_CLASS: "robin-chat--vote",
    VOTE_LABEL_CLASS: "robin-chat--vote-label",
    events: {"click .robin-chat--vote": "_onVote"},
    _onVote: function (e) {
      if (this.isHidden)return;
      var n = t(e.target).closest("button")[0];
      if (n === this.currentTarget)return;
      var r = n.value;
      this.trigger("vote", r), this._setActiveTarget(n)
    },
    setActiveVote: function (e) {
      var t = "." + this.VOTE_BUTTON_CLASS + "-" + e.toLowerCase(), n = this.$el.find(t)[0];
      this._setActiveTarget(n)
    }
  }), u = s.extend({
    isHidden: !0, events: {"click .robin-chat--quit": "_onQuit"}, _onQuit: function (e) {
      if (this.isHidden)return;
      this.trigger("quit"), this._setActiveTarget(e.target)
    }
  }), a = Backbone.View.extend({
    className: "robin-user-list-overflow-indicator", initialize: function (e) {
      this.render({count: e.count || 0})
    }, render: function (t) {
      this.$el.text(e._("and %(count)s more").format(t))
    }
  }), f = Backbone.View.extend({
    TEMPLATE_NAME: "robin/robinroomparticipant",
    length: 0,
    maxDisplayLength: Infinity,
    initialize: function (e) {
      this.userNamesToEl = {}, n.isNumber(e.maxDisplayLength) && !n.isNaN(e.maxDisplayLength) && (this.maxDisplayLength = e.maxDisplayLength), e.participants && e.participants.forEach(this.addUser.bind(this))
    },
    addUser: function (e) {
      this.length += 1;
      if (this.length <= this.maxDisplayLength) {
        var n = t(this.render(e));
        this.$el.append(n), this.userNamesToEl[e.get("name")] = n, this.listenTo(e, "change", function () {
          var r = t(this.render(e));
          n.before(r), n.remove(), n = r, this.userNamesToEl[e.get("name")] = n
        })
      } else this.length === this.maxDisplayLength + 1 ? (this.overflowIndicator = new a({count: this.length - this.maxDisplayLength}), this.$el.append(this.overflowIndicator.el)) : this.overflowIndicator.render({count: this.length - this.maxDisplayLength})
    },
    removeUser: function (e) {
      this.stopListening(e);
      var t = this.userNamesToEl[e.get("name")];
      if (!t)return;
      t.remove()
    },
    render: function (t) {
      var n = {
        from: t.get("name"),
        userClass: t.get("userClass"),
        voteClass: t.get("vote").toLowerCase(),
        presenceClass: t.get("present") ? "present" : "away"
      };
      return e.templates.make(this.TEMPLATE_NAME, n)
    }
  });
  e.robin.views = {
    RobinChatWindow: r,
    RobinChatInput: i,
    RobinVoteWidget: o,
    RobinQuitWidget: u,
    RobinUserListWidget: f
  }
}(r, jQuery, _), !function (e, t, n, r, i) {
  "use strict";
  function u(e, t) {
    return e.length > t ? e.substring(0, t) + "…" : e
  }

  var s = e.robin.notifications = {}, o = 10;
  s.DesktopNotifier = t.View.extend({
    tagName: "input",
    attributes: {type: "checkbox", name: "robin-desktop-notifier"},
    events: {change: "onSettingsChange"},
    initialize: function () {
      this.storageKey = "robin.notifications", this.requestingPermission = !1, Notification.permission === "granted" ? this.notificationsDesired = i.safeGet(this.storageKey) : this.notificationsDesired = !1, this.notifications = [], this.listenTo(this.model, "add", this.onNewUpdate), n(document).on("visibilitychange", n.proxy(this, "onVisibilityChange"))
    },
    shouldNotify: function () {
      return this.notificationsDesired && Notification.permission === "granted" && document.hidden
    },
    onNewUpdate: function (t, n, r) {
      if (!this.shouldNotify())return;
      var i = t.get("author"), s = t.get("message");
      if (i === e.config.logged)return;
      if (s.indexOf(e.config.logged) < 0)return;
      var a = new Notification(i, {body: u(s, 160), icon: e.utils.staticURL("robin-icons/robin-icon-robin-big.png")});
      this.notifications.push(a), a.onclick = function (e) {
        window.focus(), e.preventDefault()
      }, a.onclose = function (e) {
        var t = this.notifications.indexOf(e.target);
        this.notifications.splice(t, 1)
      }.bind(this), setTimeout(function () {
        a.close()
      }, o * 1e3)
    },
    onVisibilityChange: function () {
      document.hidden || this.clearNotifications()
    },
    onSettingsChange: function () {
      this.notificationsDesired = this.$el.prop("checked"), i.safeSet(this.storageKey, this.notificationsDesired), this.notificationsDesired && Notification.permission !== "granted" && this.requestPermission()
    },
    requestPermission: function () {
      this.requestingPermission = !0, Notification.requestPermission(r.bind(this.onPermissionChange, this)), this.render()
    },
    onPermissionChange: function () {
      this.requestingPermission = !1, this.render()
    },
    clearNotifications: function () {
      r.invoke(this.notifications, "close")
    },
    render: function () {
      return this.$el.prop("disabled", this.requestingPermission || Notification.permission === "denied").prop("checked", this.notificationsDesired), this
    }
  })
}(r, Backbone, jQuery, _, store), !function (e, t, n, r) {
  "use strict";
  var i = e.robin.favicon = {}, s = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAEfUlEQVRoQ+2ZXYhUZRzGn+ec3ZkzzqpZiYZlF2UFgn1RO6OIXkRk5e7syhAipZEt3QQhBAUaW2jURvSxUrq7dJGRwYrurIQUSSbqzBaFBV4Y3UR0sfQFm7pzZmfOE7NZ6O66550Z150dz7l9n////f/e5/065xBX2cOrjBcBcK07HjgcOFxjIxBM6RozdBxO4HDgcI2NQDCla8zQYNMKpnS1Tmm1tdVnfxjcCOFxULcTjAL4BcBXltgTGuj71qT2GeGw4slrs8odgnT/RFAEBLArfOeCZ9nVNTIZeNUDS2I23vwlhFX+DvIooe8EDFvEqZAT/YxH9v5+YVzVA7uxpg2e8JE/7MUKkgURb0TSqRdnFHA21vS9hGUmwAQ9EKchfAortNtJ9/40Nq6qHR6Jta7IK3/MBBZg2omEHuSR3jMzdg27seYPPOlJP2ASLursZc6xAz/6av0E09WutW2z3N8GByU1+NVgEdvCmf7tfrpie9VO6eFY82ZI3X4QJPY7mf51frr/2qsOWGs2zHH/+vs1CM8UD1dfEOKbSKZ/wvP5Eme2b8orJnDjiYQnbyeERaadFi8d4Uh4jt9mVVUOa2XrDe5IoVOS8dS8cEDqbHt5/YkDaZNB8p8yJlnK1Jy/RW2m2CHomjLTwLKslnC6r88kftqAs43rlogj3WZXxslRbIsbQ+nUh1UJrNXtdTn35POS95IEx6RIP41lMxk+kdrnp7vix1KuMXGvB/UIusukOFNN1a1hxZMR18u9DGKLJNsUxFTnILqQA3sHTfRTvoZH4i2rCir0SLjVpKBSNQRPOgOpu03jpgx49ALx55kOQG1GFwjTisfqaG2PZPq2mYZPCXA23vKoVNhVygXCtOALdcV3Xtha6hzvP20af1mBtTI5P5tz3wGw3rSASnQke5xM6ulSclw2YDfW/Jgn7QRwfSkFlKslORxmaAnTvb+WkqNiYK1OLnSHc+8LSpTScaVaklucTOqtUvNUBJyLNz/hSW9LmFdqx5XoCe5zBlLJcnKUBazVrTe62cJuSQ+X02klMSQPh+ctfoSHOt1y8pQMPBxPPEVPbwqaW06HlcSQ7A/PX7CeB7vOlZvHGPhfV/PdEh4qt7Ny44pfIwW97qy5Zyvb271y8xTjjICHY4lNLK7VaXAV4NE623rB9H3XbzAmBVbj+gUuz3VLWnt+dIZEdgL8gmI9La+BZIPnoQH0GiQrSmkWgFkCZhO4SdQtEBb7FXLxhQJ5gAct2+4IHd+fKSXWT3tJYLcxsc6Dt6t4ro5+BgXfC0etHTx84A+/pGPb9UBybv5sbmkeuoPibYIWEbhudHcn8gSHBAxZ0CnPxnEnOvdrfr7nbKn9mOjHAWtF0+xcge960qbi1Y3AnpBlt/PE/p9NEla75iLg3PLW+7xC/hOQN0v4mFbolYl+V1Q71GT1/Q+cjSeeg+ftENHLOvtVk6/4MxF8FNiNNW0tbjLhEHfyaKr4k7lmH6NjqZboA+BacnMilsDhwOEaG4FgSteYoeNwAodr3eF/ANj0iEwu4kNUAAAAAElFTkSuQmCC";
  i.UnreadUpdateCounter = t.View.extend({
    initialize: function () {
      this.unreadItemCount = 0, n.setOptions({background: "#ff4500"}), n.setImage(s), this.listenTo(this.model, "add", this.onUpdateAdded), r(document).on("visibilitychange", r.proxy(this.onVisibilityChange, this)), this.onVisibilityChange()
    }, onUpdateAdded: function (e, t, r) {
      document.hidden && (this.unreadItemCount += 1, n.setBubble(this.unreadItemCount))
    }, onVisibilityChange: function () {
      document.hidden || (n.setBubble(), this.unreadItemCount = 0)
    }
  })
}(r, Backbone, Tinycon, jQuery), !function (e, t, n) {
  "use strict";
  var r = e.robin.models, i = e.robin.views, s = Backbone.View.extend({
    SYSTEM_USER_NAME: "[robin]",
    MAX_USERS_TO_DISPLAY: 200,
    lastMessageText: null,
    websocketEvents: {
      connecting: function () {
        this.addSystemAction("connecting")
      }, connected: function () {
        this.addSystemAction("connected!")
      }, disconnected: function () {
        this.addSystemAction("disconnected :(")
      }, reconnecting: function (e) {
        this.addSystemAction("reconnecting in " + Math.floor(e / 1e3) + " seconds...")
      }, "message:chat": function (e) {
        e.body.indexOf("/me ") === 0 ? this.addUserAction(e.from, e.body.slice(4)) : this.addUserMessage(e.from, e.body)
      }, "message:system_broadcast": function (e) {
        this.addSystemMessage(e.body)
      }, "message:vote": function (e) {
        this.updateUserVote(e.from, e.vote)
      }, "message:join": function (e) {
        this._ensureUser(e.user, {present: !0})
      }, "message:part": function (e) {
        this._ensureUser(e.user, {present: !1})
      }, "message:please_vote": function (e) {
        this.addSystemAction("polls are closing soon, please vote")
      }, "message:merge": function (e) {
        this.room.set({winning_vote: "INCREASE"})
      }, "message:users_abandoned": function (e) {
        if (!e.users || !e.users.length)return;
        var n = this.currentUser.get("name");
        if (e.users.indexOf(this.currentUser.get("name")) >= 0) {
          this.addSystemAction("abandoning..."), t.refresh();
          return
        }
        var r = 0;
        e.users.forEach(function (e) {
          this.roomParticipants.remove(e), r += 1
        }, this), this.addSystemAction(r + " users abandoned")
      }, "message:abandon": function (e) {
        this.room.set({winning_vote: "ABANDON"})
      }, "message:continue": function (e) {
        this.room.set({winning_vote: "CONTINUE"}), this.addSystemMessage("continue the discussion at /r/" + e.body)
      }, "message:no_match": function (e) {
        this.addSystemAction("no compatible room found for matching, we will count votes and check again for a match in 1 minute.")
      }, "message:updated_name": function (e) {
        this.room.set({room_name: e.room_name})
      }
    },
    roomEvents: {
      "success:vote": function (e, t) {
        this.currentUser.set(t)
      }, "request:message": function () {
        this.chatInput.clear()
      }, "invalid:message error:message": function () {
        this.addSystemMessage("could not send your message:"), this.addSystemMessage(this.lastMessageText), this.lastMessageText = null
      }, "success:message": function () {
        this.lastMessageText = null
      }, "change:room_name": function (e, t) {
        this.addSystemAction("found a match"), this.$el.find(".robin-chat--room-name").text(t)
      }, "change:winning_vote": function (e, t) {
        e.isComplete() && this.voteWidget.hide(), t === "ABANDON" ? (this.addSystemAction("room has been abandoned"), this.transitionRefresh()) : t === "CONTINUE" ? (this.addSystemAction("room has been continued"), this.quitWidget.show()) : t === "INCREASE" && (this.addSystemAction("room has been increased"), this.addSystemAction("merging with other room..."), this.transitionRefresh())
      }, "success:leave_room": function () {
        t.refresh()
      }
    },
    roomParticipantsEvents: {
      add: function (e, t) {
        this.userListWidget.addUser(e)
      }, remove: function (e, t) {
        this.userListWidget.removeUser(e)
      }
    },
    roomMessagesEvents: {
      add: function (e, t) {
        this.chatWindow.addMessage(e)
      }
    },
    chatInputEvents: {
      chat: function (e) {
        this.chatWindow.scrollToRecent()
      }, "chat:message": function (e) {
        if (this.lastMessageText)return;
        this.lastMessageText = e, this.room.postMessage(e)
      }, "chat:command": function (e, t) {
        typeof this.chatCommands[e] != "function" ? (t = [e], e = "unknown") : this.chatInput.clear(), this.chatCommands[e].apply(this, t)
      }
    },
    voteWidgetEvents: {
      vote: function (e) {
        this.room.isComplete() ? this.addSystemMessage("voting is complete") : this.room.postVote(e.toUpperCase())
      }
    },
    quitWidgetEvents: {
      quit: function () {
        this.addSystemMessage("leaving room..."), this.room.postLeaveRoom()
      }
    },
    chatCommands: {
      unknown: function (e) {
        this.addSystemMessage('"/' + e + '" is not a command')
      }, help: function () {
        this.addSystemMessage("Welcome to Robin."), this.addSystemMessage("Be sure to use the buttons in the sidebar to vote on the future of the room before the polls are closed."), this.addSystemMessage("Non-votes and abstentions will be counted as votes to abandon."), this.addSystemMessage("We do hope you enjoy the discussion.")
      }, commands: function () {
        this.addSystemMessage("/vote abandon - vote to abandon"), this.addSystemMessage("/vote stay - vote to stay"), this.addSystemMessage("/vote grow - vote to grow"), this.addSystemMessage("/whois <user_in_room> - provide information about <user_in_room>")
      }, vote: function (t) {
        if (this.room.isComplete()) {
          this.addSystemMessage("voting is complete");
          return
        }
        var n = e.robin.VOTE_TYPES.map(function (e) {
          return this.getLabelFromVote(e)
        }, this);
        if (!t) {
          this.addSystemMessage("use: /vote [" + n.join(",") + "]");
          return
        }
        var r = t.toUpperCase();
        n.indexOf(r) < 0 && (r = this.getLabelFromVote(r));
        var i = this.getVoteFromLabel(r);
        e.robin.VOTE_TYPES.indexOf(i) < 0 ? this.addSystemMessage("that is not a valid vote type") : i === this.currentUser.get("vote") ? this.addSystemMessage("that is already your vote") : (this.room.postVote(i), this.voteWidget.setActiveVote(i))
      }, me: function () {
        var e = [].slice.call(arguments).join(" ");
        e.length > 0 ? this.room.postMessage("/me " + e) : this.addSystemMessage("use: /me your message here")
      }, whois: function (e) {
        var t = this.roomParticipants.get(e);
        if (!t)this.addSystemMessage("There is no user by that name in the room"); else if (t === this.currentUser)this.addSystemMessage("That is you"); else {
          var n = t.get("present") ? "present" : "away";
          t.hasVoted() ? this.addSystemMessage("%(userName)s is %(presence)s and has voted to %(vote)s".format({
            userName: e,
            presence: n,
            vote: t.get("vote")
          })) : this.addSystemMessage("%(userName)s is %(presence)s and has not voted".format({
            userName: e,
            presence: n
          }))
        }
      }, leave_room: function () {
        this.room.postLeaveRoom()
      }, remind: function (e) {
        e = parseInt(e, 10);
        var t = [].slice.call(arguments, 1).join(" ");
        if (n.isNaN(e) || t.length === 0) {
          this.addSystemMessage("use: /remind <seconds> <message>");
          return
        }
        var i = this.currentUser.get("name"), s = i + ": " + t;
        setTimeout(function () {
          this.addSystemMessage(s.slice(0, r.RobinMessage.MAX_LENGTH))
        }.bind(this), e * 1e3), this.addSystemAction("set timer for " + e + " seconds from now")
      }, clear: function () {
        this.chatWindow.startJuicyPoppin()
      }
    },
    initialize: function (s) {
      this.websocketEvents = this._autobind(this.websocketEvents), this.chatCommands = this._autobind(this.chatCommands), this.room = new r.RobinRoom({
        room_id: this.options.room_id,
        room_name: this.options.room_name,
        winning_vote: this.options.is_continued ? "CONTINUE" : undefined
      });
      var o, u = [];
      s.participants && s.participants.forEach(function (e) {
        var t = e.name === s.logged_in_username, i = n.clone(e);
        t && (i.userClass = "self", i.present = !0);
        var a = new r.RobinUser(i);
        t && (o = a), u.push(a)
      }), o || (o = new r.RobinUser({
        name: this.options.logged_in_username,
        userClass: "self",
        present: !0
      })), this.currentUser = o, this.roomParticipants = new r.RobinRoomParticipants(u), this.roomMessages = new r.RobinRoomMessages, this.chatInput = new i.RobinChatInput({
        el: this.$el.find("#robinChatInput")[0],
        collection: this.roomParticipants
      }), this.chatWindow = new i.RobinChatWindow({el: this.$el.find("#robinChatWindow")[0]}), this.voteWidget = new i.RobinVoteWidget({
        el: this.$el.find("#robinVoteWidget")[0],
        isHidden: this.room.isComplete()
      }), this.quitWidget = new i.RobinQuitWidget({
        el: this.$el.find("#robinQuitWidget")[0],
        isHidden: !this.room.isComplete()
      }), this.userListWidget = new i.RobinUserListWidget({
        el: this.$el.find("#robinUserList")[0],
        participants: u,
        maxDisplayLength: this.MAX_USERS_TO_DISPLAY
      }), this.currentUser.hasVoted() && this.voteWidget.setActiveVote(this.currentUser.get("vote")), "Notification" in window && (this.desktopNotifier = new e.robin.notifications.DesktopNotifier({model: this.roomMessages}), this.desktopNotifier.render(), t("#robinDesktopNotifier").removeAttr("hidden").find("label").prepend(this.desktopNotifier.$el)), this.faviconUpdater = new e.robin.favicon.UnreadUpdateCounter({model: this.roomMessages}), this._voteToLabel = {}, this._labelToVote = {}, this.voteWidget.$el.find("." + this.voteWidget.VOTE_BUTTON_CLASS).toArray().forEach(function (e) {
        var n = t(e), r = n.val().toUpperCase(), i = n.find("." + this.voteWidget.VOTE_LABEL_CLASS).text().toUpperCase();
        this._voteToLabel[r] = i, this._labelToVote[i] = r
      }, this), this._listenToEvents(this.room, this.roomEvents), this._listenToEvents(this.roomParticipants, this.roomParticipantsEvents), this._listenToEvents(this.roomMessages, this.roomMessagesEvents), this._listenToEvents(this.chatInput, this.chatInputEvents), this._listenToEvents(this.voteWidget, this.voteWidgetEvents), this._listenToEvents(this.quitWidget, this.quitWidgetEvents), this.addSystemMessage("Welcome to robin.  Please type /help or /commands for more information."), u.length === 1 && (this.addSystemMessage("Please wait to be matched."), this.listenToOnce(this.roomParticipants, "add", function (e, t) {
        this.addUserAction(e.get("name"), "joined the room")
      }));
      if (!this.options.is_continued) {
        var a = this.options.reap_time - Date.now(), f = Math.floor(a / 6e4);
        f > 1 ? this.addSystemMessage("Voting will end in approximately " + f + " minutes") : this.addSystemMessage("Voting will end soon")
      }
      this.websocket = new e.WebSocket(s.websocket_url), this.websocket.on(this.websocketEvents), this.websocket.start()
    },
    transitionRefresh: function () {
      var e = 1e3 + Math.floor(Math.random() * 4e3);
      this.chatWindow.startJuicyPoppin(), setTimeout(function () {
        t.refresh()
      }, e)
    },
    getLabelFromVote: function (e) {
      return this._voteToLabel[e]
    },
    getVoteFromLabel: function (e) {
      return this._labelToVote[e]
    },
    _listenToEvents: function (e, t) {
      for (var n in t)this.listenTo(e, n, t[n])
    },
    _autobind: function (e) {
      var t = {};
      for (var n in e)t[n] = e[n].bind(this);
      return t
    },
    _ensureUser: function (e, t) {
      var i = this.roomParticipants.get(e);
      return i ? t && i.set(t) : (i = new r.RobinUser(n.defaults({name: e}, t)), this.roomParticipants.add(i)), i
    },
    addUserMessage: function (e, t) {
      var n = this._ensureUser(e, {present: !0}), i = new r.RobinMessage({
        author: e,
        message: t,
        userClass: n.get("userClass"),
        flairClass: n.flairClass
      });
      this.roomMessages.add(i)
    },
    addUserAction: function (e, t) {
      var n = this._ensureUser(e, {present: !0}), i = new r.RobinMessage({
        author: e,
        message: t,
        messageClass: "action",
        userClass: n.get("userClass"),
        flairClass: n.flairClass
      });
      this.roomMessages.add(i)
    },
    addSystemMessage: function (e) {
      var t = new r.RobinMessage({author: this.SYSTEM_USER_NAME, message: e, userClass: "system"});
      this.roomMessages.add(t)
    },
    addSystemAction: function (e) {
      var t = new r.RobinMessage({
        author: this.SYSTEM_USER_NAME,
        message: e,
        messageClass: "action",
        userClass: "system"
      });
      this.roomMessages.add(t)
    },
    updateUserVote: function (e, t) {
      var n = {vote: t, present: !0}, r = this._ensureUser(e, n), i = this.getLabelFromVote(t) || t;
      this.addUserAction(e, "voted to " + i)
    }
  });
  t(function () {
    new s({
      el: document.getElementById("robinChat"),
      is_continued: e.config.robin_room_is_continued,
      room_name: e.config.robin_room_name,
      room_id: e.config.robin_room_id,
      websocket_url: e.config.robin_websocket_url,
      participants: e.config.robin_user_list,
      reap_time: parseInt(e.config.robin_room_reap_time, 10),
      logged_in_username: e.config.logged
    })
  })
}(r, jQuery, _);
r.i18n.addMessages({
  "this is too short (min: %(min_length)s)": [null, "this is too short (min: %(min_length)s)"],
  "we need something here": [null, "we need something here"],
  "this is too long (max: %(max_length)s)": [null, "this is too long (max: %(max_length)s)"]
});
