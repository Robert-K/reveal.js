!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = t())
        : "function" == typeof define && define.amd
        ? define(t)
        : ((e =
              "undefined" != typeof globalThis
                  ? globalThis
                  : e || self).RevealSearch = t())
})(this, function () {
    "use strict"
    /*!
     * Handles finding a text string anywhere in the slides and showing the next occurrence to the user
     * by navigatating to that slide and highlighting it.
     *
     * @author Jon Snyder <snyder.jon@gmail.com>, February 2013
     */ return () => {
        let e, t, n, i, o, l, r
        function s() {
            ;(t = document.createElement("div")),
                t.classList.add("searchbox"),
                (t.style.position = "absolute"),
                (t.style.top = "20px"),
                (t.style.marginLeft = "auto"),
                (t.style.marginRight = "auto"),
                (t.style.left = "0"),
                (t.style.right = "0"),
                (t.style.width = "62%"),
                (t.style.zIndex = 10),
                (t.innerHTML =
                    '<input type="search" class="searchinput" placeholder="Looking for something?" style="vertical-align: top;"/>\n\t\t</span>'),
                (n = t.querySelector(".searchinput")),
                (n.style.width = "100%"),
                (n.style.fontFamily = "var(--r-main-font)"),
                (n.style.fontSize = "var(--r-main-font-size)"),
                (n.style.padding = "4px 6px"),
                (n.style.color = "var(--r-main-color)"),
                (n.style.background = "var(--r-code-background-color)"),
                (n.style.border = "0"),
                (n.style.outline = "0"),
                (n.style.textAlign = "center"),
                (n.style.boxShadow = "0px 5px 15px rgba(0, 0, 0, 0.15)"),
                (n.style["-webkit-appearance"] = "none"),
                e.getRevealElement().appendChild(t),
                n.addEventListener(
                    "keyup",
                    function (t) {
                        if (13 === t.keyCode)
                            t.preventDefault(),
                                (function () {
                                    if (l) {
                                        var t = n.value
                                        "" === t
                                            ? (r && r.remove(), (i = null))
                                            : ((r = new c("slidecontent")),
                                              (i = r.apply(t)),
                                              (o = 0))
                                    }
                                    i &&
                                        (i.length && i.length <= o && (o = 0),
                                        i.length > o &&
                                            (e.slide(i[o].h, i[o].v), o++))
                                })(),
                                (l = !1)
                        else l = !0
                    },
                    !1
                ),
                d()
        }
        function a() {
            t || s(), (t.style.display = "inline"), n.focus(), n.select()
        }
        function d() {
            t || s(), (t.style.display = "none"), r && r.remove()
        }
        function c(t, n) {
            var i = document.getElementById(t) || document.body,
                o = n || "EM",
                l = new RegExp("^(?:" + o + "|SCRIPT|FORM)$"),
                r = ["#ff6", "#a0ffff", "#9f9", "#f99", "#f6f"],
                s = [],
                a = 0,
                d = "",
                c = []
            ;(this.setRegex = function (e) {
                ;(e = e.trim()), (d = new RegExp("(" + e + ")", "i"))
            }),
                (this.getRegex = function () {
                    return d
                        .toString()
                        .replace(/^\/\\b\(|\)\\b\/i$/g, "")
                        .replace(/\|/g, " ")
                }),
                (this.hiliteWords = function (t) {
                    if (null != t && t && d && !l.test(t.nodeName)) {
                        if (t.hasChildNodes())
                            for (var n = 0; n < t.childNodes.length; n++)
                                this.hiliteWords(t.childNodes[n])
                        var i, f
                        if (3 == t.nodeType)
                            if ((i = t.nodeValue) && (f = d.exec(i))) {
                                for (
                                    var u = t;
                                    null != u && "SECTION" != u.nodeName;

                                )
                                    u = u.parentNode
                                var p = e.getIndices(u),
                                    h = c.length,
                                    y = !1
                                for (n = 0; n < h; n++)
                                    c[n].h === p.h && c[n].v === p.v && (y = !0)
                                y || c.push(p),
                                    s[f[0].toLowerCase()] ||
                                        (s[f[0].toLowerCase()] =
                                            r[a++ % r.length])
                                var g = document.createElement(o)
                                g.appendChild(document.createTextNode(f[0])),
                                    (g.style.backgroundColor = "var(--r-accent-color)"),
                                    //    s[f[0].toLowerCase()]),
                                    (g.style.fontStyle = "inherit"),
                                    (g.style.color = "#000")
                                var v = t.splitText(f.index)
                                ;(v.nodeValue = v.nodeValue.substring(
                                    f[0].length
                                )),
                                    t.parentNode.insertBefore(g, v)
                            }
                    }
                }),
                (this.remove = function () {
                    for (
                        var e, t = document.getElementsByTagName(o);
                        t.length && (e = t[0]);

                    )
                        e.parentNode.replaceChild(e.firstChild, e)
                }),
                (this.apply = function (e) {
                    if (null != e && e)
                        return (
                            this.remove(),
                            this.setRegex(e),
                            this.hiliteWords(i),
                            c
                        )
                })
        }
        return {
            id: "search",
            init: (n) => {
                ;(e = n),
                    e.registerKeyboardShortcut("CTRL + Shift + F", "Search"),
                    document.addEventListener(
                        "keydown",
                        function (e) {
                            "F" == e.key &&
                                (e.ctrlKey || e.metaKey) &&
                                (e.preventDefault(),
                                t || s(),
                                "inline" !== t.style.display ? a() : d())
                            // If key is ESC, close search
                            if (e.key === "Escape") {
                                d()
                            }
                        },
                        !1
                    )
            },
            open: a,
        }
    }
})
