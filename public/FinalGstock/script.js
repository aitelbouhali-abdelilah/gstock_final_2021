function menuHover() {
    var n;
    $(window).width() > 1000 &&
        $(".hasSubMenu").hover(
            function () {
                hoveredMenu = $(this);
                n ||
                    (n = window.setTimeout(function () {
                        n = null;
                        hoveredMenu.addClass("active");
                        hoveredMenu.find(".subNav").slideDown();
                        $("body").addClass("overlayOpen");
                        setTimeout(function () {
                            hoveredMenu.find(".menuSubSection:eq(0)").addClass("animated");
                        }, 300);
                        setTimeout(function () {
                            hoveredMenu.find(".menu-text-image").addClass("animated");
                            hoveredMenu.find(".menuSubSection:eq(1)").addClass("animated");
                        }, 800);
                        setTimeout(function () {
                            hoveredMenu.find(".menuSubSection:eq(2)").addClass("animated");
                        }, 1200);
                        setTimeout(function () {
                            $(".blueBar").addClass("animated");
                        }, 1600);
                    }, 400));
            },
            function () {
                n
                    ? (window.clearTimeout(n), (n = null))
                    : (hoveredMenu.removeClass("active"),
                      hoveredMenu.find(".subNav").slideUp(),
                      $("body").removeClass("overlayOpen"),
                      $(".menuSubSection").removeClass("animated"),
                      $(".blueBar").removeClass("animated"),
                      $(".menu-text-image").removeClass("animated"));
            }
        );
}
function portfolioCarousel() {
    $(".spotlight .owl-carousel").length > 0 &&
        $(".spotlight .owl-carousel").each(function () {
            $(this).parents(".spotlight").addClass("spotlight-slider");
        });
    $(".spotlight .owl-carousel").owlCarousel({ margin: 26, responsive: { 0: { autoWidth: !0, dots: !0 }, 991: { items: 4 } } });
}
function matchHeightItems() {
    $(".spotlight h3").matchHeight({ byRow: !0 });
    $(".spotlight .listingDescription").matchHeight({ byRow: !0 });
    $(".spotlight .apiBlock").matchHeight({ byRow: !0 });
    $(".spotlight .listingItem").matchHeight({ byRow: !1 });
    $("#noticesListing .listingItemLI .listingItem").matchHeight({ byRow: !1 });
    $(".contentBoxListing .itemHolder").matchHeight({ byRow: !0 });
    $(".contentBoxListing .itemHolder .description").matchHeight({ byRow: !0 });
    $(".industryInsights h3").matchHeight({ byRow: !0 });
    $(".whiteCardsListing .listingItem").matchHeight({ byRow: !0 });
}
function partnersCarousel() {
    $(".partnership .owl-carousel").owlCarousel({ margin: 90, autoWidth: !0 });
    $(".partnership .owl-item").matchHeight({ byRow: !0 });
}
function fixedHeader() {
    var n = 0;
    $(window).scroll(function () {
        var t = $(this).scrollTop(),
            i = $(window).scrollTop();
        i > 81 ? ($("header").addClass("fixed"), t < n ? $("header").addClass("visible") : $("header").removeClass("visible"), (n = t)) : ($("header").removeClass("fixed"), $("header").removeClass("visible"));
    });
}
function meetYourTeam() {
    rightPadding = ($(window).width() - $(".container").width()) / 2;
    $(".generalBlock.halfImage .container").css("padding-right", rightPadding);
}
function numberPadding() {
    rightPadding = ($(window).width() - $(".container").width()) / 2;
    $(".textBlock .roundedEdgesNumber").css("padding-right", rightPadding);
    $(".textBlock.withNumber .blockSection").css("padding-left", rightPadding);
}
function imageTextMargin() {
    rightPadding = ($(window).width() - $(".container").width()) / 2;
    $(".imgText.leftImage").each(function () {
        $(".imgText.leftImage .contentHolder").css("padding-right", rightPadding);
    });
    $(".imgText.rightImage").each(function () {
        $(".imgText.rightImage .contentHolder").css("padding-left", rightPadding);
    });
}
function pageAnchors() {
    if ($(".pageAnchor").length > 0) {
        $(".pageAnchor a").click(function () {
            $(".pageAnchor a").removeClass("active");
            $(this).addClass("active");
        });
        var n = 0;
        topPosition = $(".pageAnchor").offset().top;
        $(window).scroll(function () {
            var t = $(this).scrollTop(),
                i = $(window).scrollTop();
            i > topPosition
                ? ($(".pageAnchor").addClass("fixed"), t < n ? $(".pageAnchor").addClass("visible") : $(".pageAnchor").removeClass("visible"), (n = t))
                : ($(".pageAnchor").removeClass("fixed"), $(".pageAnchor").removeClass("visible"));
        });
    }
}
function tabs() {
    $(".tabsHolder").length > 0 &&
        $(".tabsLinks a").click(function () {
            index = $(this).index();
            $(".tabsLinks a").removeClass("active");
            $(this).addClass("active");
            $(".tab").hide();
            $(".tab:eq(" + index + ")").fadeIn(300);
            $("div[data-parallax]") && $(window).trigger("resize").trigger("scroll");
            $(".officesblock") && $(".officesblock .itemHolder").matchHeight();
        });
    $(".tabsLinks a:eq(0)").click();
}
function selectDropdown() {
    $("select").select2();
}
function testimonialsCarousel() {
    $(".testimonials .owl-carousel").owlCarousel({ items: 1, nav: !0, dots: !1 });
}
function togglePopUp() {
    $(".whiteCardsListing:not(#noticesListing) .listingItem a.popupAnchor").click(function () {
        $(this).parents(".listingItemLI").find(".overlayPopUp").fadeIn();
    });
    $(".overlayPopUp .content .close").click(function () {
        $(".overlayPopUp").fadeOut();
    });
    $(document).mouseup(function (n) {
        var t = $(".overlayPopUp .content");
        t.is(n.target) || t.has(n.target).length !== 0 || $(".overlayPopUp").fadeOut();
    });
    $(".openPopUp").click(function () {
        $(this).parents(".imgText").find(".overlayPopUp").fadeIn();
    });
}
function mobileMenu() {
    $("header .logoHolder").first().after('<a class="menuBurger"><span></span><span ></span ><span></span></a>');
    $(".rightSection .searchToggle").detach().insertAfter($("header .menuBurger"));
    $("header nav + .rightSection").detach().appendTo($("header nav > ul"));
    $(".menuBurger").click(function () {
        $("header").toggleClass("alwaysVisible");
        $(this).parent().find("nav").slideToggle();
        $(this).toggleClass("open");
    });
    $("header .hasSubMenu").append('<span class="subMenuToggle"></span>');
    $("header .hasSubMenu .subMenuToggle").click(function () {
        $(this).parent().find(".subNav").toggleClass("active");
        $(this).toggleClass("back");
    });
    $("header li.hasSubMenu .subNav .menuSubSection span").click(function () {
        $(this).next().slideToggle();
        $(this).toggleClass("expand");
    });
    $("header li.hasSubMenu .subNav .menuSubSection span").each(function () {
        $(this).text() == "" && $(this).remove();
    });
    $("body").addClass("visibleMenuItems");
}
function blueMenu() {
    $(".blueMenu .linksHolder a").length > 2 &&
        ($(".blueMenu .linksHolder a:first-of-type").after("<a class='more-link'>More</a><div class='more-links'><ul></ul></div>"),
        $(".blueMenu .linksHolder a:nth-child(n+3)").appendTo(".more-links ul"),
        $(".more-link").click(function () {
            $(".more-links").slideToggle();
        }),
        $(".more-links a").click(function () {
            $(".more-links").slideUp();
        }));
}
function expandCollapse() {
    $(".toggleTitle").click(function () {
        $(this).parent().find($(".toggleContent")).slideToggle();
        $(this).toggleClass("active");
        $(".toggleContent")
            .not($(this).parent().find($(".toggleContent")))
            .slideUp();
        $(".toggleTitle").not($(this)).removeClass("active");
    });
}
function footerMobile() {
    $("footer .siteMap .row .col-md-3").detach().appendTo("footer .siteMap .row");
    $("footer .siteMap .row .col-md-2 h5").click(function () {
        $(this).next("ul").slideToggle();
        $(this).toggleClass("active");
        $("footer .siteMap .row .col-md-2 ul")
            .not($(this).parent().find($("ul")))
            .slideUp();
        $("footer .siteMap .row .col-md-2 h5").not($(this)).removeClass("active");
    });
}
function filtersMobile() {
    $(".filterSection .searchInput").after('<div class="filters-icon"></div>');
    $(" .filterSection .row > :not(:last-child) ").wrapAll("<div class='filters'></div>");
    $(".filters-icon").click(function () {
        $(".filters").slideToggle();
        $(".selectedFilters").show();
    });
}
function openSidebar() {
    $(".openSidebar").click(function () {
        $(".sidebar").addClass("open");
        $("body").addClass("sidebarOpen");
    });
    $(".sidebar .close-btn").click(function () {
        $(".sidebar").removeClass("open");
        $("body").removeClass("sidebarOpen");
    });
    $(document).mouseup(function (n) {
        var t = $(".sidebar");
        t.is(n.target) || t.has(n.target).length !== 0 || ($(".sidebar").removeClass("open"), $("body").removeClass("sidebarOpen"));
    });
}
function openBuySidebar() {
    $(".openBuySidebar").click(function () {
        $(".buySidebar").addClass("open");
        $("body").addClass("sidebarOpen");
    });
    $(".buySidebar .close-btn").click(function () {
        $(".buySidebar").removeClass("open");
        $("body").removeClass("sidebarOpen");
    });
    $(document).mouseup(function (n) {
        var t = $(".buySidebar");
        t.is(n.target) || t.has(n.target).length !== 0 || ($(".buySidebar").removeClass("open"), $("body").removeClass("sidebarOpen"));
    });
}
function membershipShowall() {
    $(".membersItem").each(function () {
        thisItem = $(this);
        thisItem.find("ul").length > 4 &&
            (thisItem.find(".namesListing ul:nth-of-type(n+5)").addClass("toHide"),
            thisItem.find(".namesListing ul.toHide").wrapAll('<div class="hiddenMemebrs"></div>'),
            $(thisItem).append('<a href="javascript:;" class="showAll"><span class="showAllText">Show all</span><span class="showLessText">Show less</span></a>'));
    });
    $(".showAll").click(function () {
        $(this).parent().find(".hiddenMemebrs").slideToggle();
        $(this).toggleClass("active");
    });
}
function comment() {
    $(".commentBtn").click(function () {
        $(this).hide();
        $(".commentForm").show();
    });
}
function ressourcesCarousel() {
    $(".normalListingParent").length > 0 &&
        $(".normalListingParent:not(.newsListing):not(.tagListing)").each(function () {
            thisSection = $(this);
            thisSection.find(".filterSection").length > 0 ||
                (thisSection.find(".col:not(.wideListingItem)").length > 3 &&
                    (thisSection.find(".row").addClass("owl-carousel"),
                    $(".normalListingParent .owl-carousel").owlCarousel({ responsive: { 0: { items: 1, nav: !1, dots: !0 }, 991: { items: 2, nav: !0, dots: !1 }, 1200: { items: 3, nav: !0, dots: !1 } } })));
        });
}
function industryInsightsCarousel() {
    $(".industryInsights").length > 0 &&
        $(".industryInsights").each(function () {
            thisSection = $(this);
            thisSection.find(".col-md-4").length > 3 &&
                (thisSection.find(".row").addClass("owl-carousel"), $(".industryInsights .owl-carousel").owlCarousel({ nav: !0, margin: 20, responsive: { 0: { items: 1 }, 991: { items: 2 }, 1200: { items: 3 } } }));
        });
}
function specialCases() {
    $(".imgText.biggerMarginBottom").length > 0 && $(".testimonials").length > 0 && $(".imgText.biggerMarginBottom").parent().next().find(".testimonials").length > 0 && $(".testimonials").addClass("smallerSpaceTop");
    $(".industryInsights.greyBackground").length > 0 &&
        $(".generalBlock.halfImage").length > 0 &&
        $(".industryInsights.greyBackground").parent().next().find(".generalBlock.halfImage").length > 0 &&
        $(".generalBlock.halfImage").addClass("noMarginTop");
    $(".spotlight.product").length > 0 && $(".apiForDev").length > 0 && $(".spotlight.product").next(".apiForDev").length > 0 && $(".spotlight.product").addClass("noBorderBottom");
}
function spotlightCarouselMobile() {
    $(".spotlight .listingHolder").addClass("owl-carousel").owlCarousel({ margin: 26, autoWidth: !0, dots: !0 });
    $(".spotlight .owl-carousel").length > 0 &&
        $(".spotlight .owl-carousel").each(function () {
            $(this).parents(".spotlight").addClass("spotlight-slider");
        });
}
function searchFunction() {
    $(".searchToggle").click(function () {
        $(".searchHolder").fadeIn(200);
        $("body").addClass("overlayOpen");
        $(".searchHolder input").focus();
    });
    $(".closeSearch").click(function () {
        $(".searchHolder").fadeOut(200);
        $("body").removeClass("overlayOpen");
    });
    $("#globalSearchBtn").click(function () {
        window.location.href = "Search?keyword=" + $("#globalSearchTextbox").val();
    });
    $("#globalSearchTextbox").on("keypress", function (n) {
        n.which === 13 && ($(this).attr("disabled", "disabled"), (window.location.href = "Search?keyword=" + $("#globalSearchTextbox").val()), $(this).removeAttr("disabled"));
    });
}
function searchDropdown() {
    $(".dropdownCol .dropdown-label").click(function () {
        $(this).toggleClass("active");
        $(".dropdown-list").fadeToggle(200);
    });
}
function agendaTabs() {
    $(".tabsParent > .tabsLink a").click(function () {
        $(".tabsParent > .tabsLink a").removeClass("active");
        $(this).addClass("active");
        firstLevelIndex = $(this).index();
        $(".mainTabs > .tab").hide();
        $(".tab").removeClass("activeTab");
        $(".mainTabs > .tab:eq(" + firstLevelIndex + ")")
            .fadeIn(200)
            .addClass("activeTab");
        $(".activeTab").find(".daysTabs a:first-of-type").click();
    });
    $(".tabsParent > .tabsLink a:first-of-type").click();
    $(".agendaEntry").each(function () {
        agendaEntry = $(this);
        agendaEntry.find(".hiddenBlock").length !== 0 && agendaEntry.addClass("withHiddenSection");
    });
    $(".withHiddenSection h3").click(function () {
        $(this).toggleClass("active");
        $(this).parent().find(".hiddenBlock").slideToggle();
    });
}
function mobileBackgroundImage() {
    $(".bigBanner").length > 0 &&
        $(".bigBanner").attr("data-mobile-image").length > 0 &&
        ((backgroundUrl = $(".bigBanner").attr("data-mobile-image")),
        $(".bigBanner")
            .addClass("test")
            .css("background-image", "url(" + backgroundUrl + ")"));
    $(".homepageBanner").length > 0 &&
        ($(".homepageBanner").attr("data-image-mobile-src").length > 0 && ((backgroundUrl1 = $(".homepageBanner").attr("data-image-mobile-src")), $(".homepageBanner").css("background-image", "url(" + backgroundUrl1 + ")")),
        console.log("tst"));
}
function annualReportFunctions() {
    colorCode = $(".banner").attr("data-color-coded");
    $(".banner").css("background-color", colorCode);
    textColorCode = $(".statement-row , .iconTextBlock, .blueListing").attr("data-color-coded");
    $(".statement-row h2 , .statement-row h3, .statement-row .quote, .iconTextBlock h2, .iconTextBlock a,.iconTextBlock strong").css("color", textColorCode);
    $(".statement-row h2, .iconTextBlock h2, .blueListing .listingInfos").css("border-color", textColorCode);
    $(".blueListing .intro").css("color", textColorCode);
    $(".blueListing .listingImage").css("background-color", textColorCode);
    sideSpaces = ($(window).width() - $(".container").width()) / 2;
    $(".icons-quotes img").css("margin-left", "-" + sideSpaces + "px");
    ($(".iconTextBlock").length > 0 || $(".arStillBanner").length > 0) && $("body").addClass("annual-report-page");
}
function shareOnTwitter(n, t, i) {
    return (
        window.open("https://twitter.com/intent/tweet?original_referer=" + encodeURIComponent(n) + "&text=" + encodeURIComponent(i) + "&url=" + encodeURIComponent(n) + "&via=SITAOnline", "twitter-share-dialog", "width=626,height=436"), !1
    );
}
function shareOnFacebook(n) {
    return window.open("https://www.facebook.com/dialog/share?app_id=1054783704984813&display=popup&href=" + encodeURIComponent(n), "facebook-share-dialog", "width=626,height=436"), !1;
}
function shareOnLinkedIn(n) {
    return window.open("https://www.linkedin.com/shareArticle?mini=true&url=" + n + "", "sharerLi", "toolbar=0,status=0,width=626,height=436"), !1;
}
function ShowMoreContentItemListingBlock(n, t) {
    var i, r;
    if ($('[data-block-id="' + n + '"]:hidden').length > 0) for (i = $('[data-block-id="' + n + '"]:hidden').attr("data-order"), r = 0; r < t; r++) $($('[data-block-id="' + n + '"][data-order="' + i + '"]')).show(), i++;
    $('[data-block-id="' + n + '"]:hidden').length == 0 && $('[data-ShowMoreItems-id="' + n + '"]').hide();
}
function showOverlay(n) {
    var f, e, r, u;
    if (((n = n || window.event), (f = n.target), n.target.nodeName == "INPUT")) {
        var t = f.value,
            i = !1;
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t) &&
            ((e = t.substr(t.indexOf("@") + 1)),
            e == "sita.aero" && (i = !0),
            (r = getParameterByName("returnUrl")),
            (u = "/internallogin.aspx"),
            r && (u += "?returnUrl=" + r),
            i &&
                !fancyBoxIsActive &&
                $.fancybox.open([
                    {
                        type: "html",
                        content:
                            '<div class="overlayPopUp"><div class="content"><h3 class="title">Do you work for SITA?</h3><p>It appears you entered a SITA.aero email address. If you currently work for SITA' +
                            ($(this).hasClass("registertxtbox") ? " you do not need to register" : "") +
                            ' click <a target="_blank" href="' +
                            u +
                            '">here</a> to sign in using your existing SITA email address and Windows password.</p></div></div>',
                        title: "SITA login",
                        width: 600,
                        height: "auto",
                        autoSize: !1,
                        beforeLoad: function () {
                            fancyBoxIsActive = !0;
                        },
                        beforeClose: function () {
                            fancyBoxIsActive = !1;
                        },
                    },
                ]));
        i && $(n.target).is(".login,.register") && (n.stopPropagation(), n.preventDefault());
    }
}
function getParameterByName(n) {
    n = n.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var i = new RegExp("[\\?&]" + n + "=([^&#]*)", "i"),
        t = i.exec(location.search);
    return t === null ? "" : t[1].replace(/\+/g, " ");
}
!(function (n, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports
        ? (module.exports = n.document
              ? t(n, !0)
              : function (n) {
                    if (!n.document) throw new Error("jQuery requires a window with a document");
                    return t(n);
                })
        : t(n);
})("undefined" != typeof window ? window : this, function (n, t) {
    "use strict";
    function br(n, t, i) {
        var r,
            e,
            u = (i = i || f).createElement("script");
        if (((u.text = n), t)) for (r in oe) (e = t[r] || (t.getAttribute && t.getAttribute(r))) && u.setAttribute(r, e);
        i.head.appendChild(u).parentNode.removeChild(u);
    }
    function ut(n) {
        return null == n ? n + "" : "object" == typeof n || "function" == typeof n ? ri[pr.call(n)] || "object" : typeof n;
    }
    function pi(n) {
        var t = !!n && "length" in n && n.length,
            i = ut(n);
        return !u(n) && !rt(n) && ("array" === i || 0 === t || ("number" == typeof t && 0 < t && t - 1 in n));
    }
    function c(n, t) {
        return n.nodeName && n.nodeName.toLowerCase() === t.toLowerCase();
    }
    function bi(n, t, r) {
        return u(t)
            ? i.grep(n, function (n, i) {
                  return !!t.call(n, i, n) !== r;
              })
            : t.nodeType
            ? i.grep(n, function (n) {
                  return (n === t) !== r;
              })
            : "string" != typeof t
            ? i.grep(n, function (n) {
                  return -1 < ii.call(t, n) !== r;
              })
            : i.filter(t, n, r);
    }
    function uu(n, t) {
        while ((n = n[t]) && 1 !== n.nodeType);
        return n;
    }
    function et(n) {
        return n;
    }
    function fi(n) {
        throw n;
    }
    function fu(n, t, i, r) {
        var f;
        try {
            n && u((f = n.promise)) ? f.call(n).done(t).fail(i) : n && u((f = n.then)) ? f.call(n, t, i) : t.apply(void 0, [n].slice(r));
        } catch (n) {
            i.apply(void 0, [n]);
        }
    }
    function oi() {
        f.removeEventListener("DOMContentLoaded", oi);
        n.removeEventListener("load", oi);
        i.ready();
    }
    function ce(n, t) {
        return t.toUpperCase();
    }
    function y(n) {
        return n.replace(se, "ms-").replace(he, ce);
    }
    function bt() {
        this.expando = i.expando + bt.uid++;
    }
    function ou(n, t, i) {
        var u, r;
        if (void 0 === i && 1 === n.nodeType)
            if (((u = "data-" + t.replace(ae, "-$&").toLowerCase()), "string" == typeof (i = n.getAttribute(u)))) {
                try {
                    i = "true" === (r = i) || ("false" !== r && ("null" === r ? null : r === +r + "" ? +r : le.test(r) ? JSON.parse(r) : r));
                } catch (n) {}
                o.set(n, t, i);
            } else i = void 0;
        return i;
    }
    function hu(n, t, r, u) {
        var s,
            h,
            c = 20,
            l = u
                ? function () {
                      return u.cur();
                  }
                : function () {
                      return i.css(n, t, "");
                  },
            o = l(),
            e = (r && r[3]) || (i.cssNumber[t] ? "" : "px"),
            f = n.nodeType && (i.cssNumber[t] || ("px" !== e && +o)) && kt.exec(i.css(n, t));
        if (f && f[3] !== e) {
            for (o /= 2, e = e || f[3], f = +o || 1; c--; ) i.style(n, t, f + e), (1 - h) * (1 - (h = l() / o || 0.5)) <= 0 && (c = 0), (f /= h);
            f *= 2;
            i.style(n, t, f + e);
            r = r || [];
        }
        return r && ((f = +f || +o || 0), (s = r[1] ? f + (r[1] + 1) * r[2] : +r[2]), u && ((u.unit = e), (u.start = f), (u.end = s))), s;
    }
    function ht(n, t) {
        for (var h, f, a, s, c, l, e, o = [], u = 0, v = n.length; u < v; u++)
            (f = n[u]).style &&
                ((h = f.style.display),
                t
                    ? ("none" === h && ((o[u] = r.get(f, "display") || null), o[u] || (f.style.display = "")),
                      "" === f.style.display &&
                          dt(f) &&
                          (o[u] =
                              ((e = c = s = void 0),
                              (c = (a = f).ownerDocument),
                              (l = a.nodeName),
                              (e = ki[l]) || ((s = c.body.appendChild(c.createElement(l))), (e = i.css(s, "display")), s.parentNode.removeChild(s), "none" === e && (e = "block"), (ki[l] = e)))))
                    : "none" !== h && ((o[u] = "none"), r.set(f, "display", h)));
        for (u = 0; u < v; u++) null != o[u] && (n[u].style.display = o[u]);
        return n;
    }
    function s(n, t) {
        var r;
        return (r = "undefined" != typeof n.getElementsByTagName ? n.getElementsByTagName(t || "*") : "undefined" != typeof n.querySelectorAll ? n.querySelectorAll(t || "*") : []), void 0 === t || (t && c(n, t)) ? i.merge([n], r) : r;
    }
    function di(n, t) {
        for (var i = 0, u = n.length; i < u; i++) r.set(n[i], "globalEval", !t || r.get(t[i], "globalEval"));
    }
    function vu(n, t, r, u, f) {
        for (var e, o, p, a, w, v, c = t.createDocumentFragment(), y = [], l = 0, b = n.length; l < b; l++)
            if ((e = n[l]) || 0 === e)
                if ("object" === ut(e)) i.merge(y, e.nodeType ? [e] : e);
                else if (au.test(e)) {
                    for (o = o || c.appendChild(t.createElement("div")), p = (cu.exec(e) || ["", ""])[1].toLowerCase(), a = h[p] || h._default, o.innerHTML = a[1] + i.htmlPrefilter(e) + a[2], v = a[0]; v--; ) o = o.lastChild;
                    i.merge(y, o.childNodes);
                    (o = c.firstChild).textContent = "";
                } else y.push(t.createTextNode(e));
        for (c.textContent = "", l = 0; (e = y[l++]); )
            if (u && -1 < i.inArray(e, u)) f && f.push(e);
            else if (((w = st(e)), (o = s(c.appendChild(e), "script")), w && di(o), r)) for (v = 0; (e = o[v++]); ) lu.test(e.type || "") && r.push(e);
        return c;
    }
    function ct() {
        return !0;
    }
    function lt() {
        return !1;
    }
    function we(n, t) {
        return (
            (n ===
                (function () {
                    try {
                        return f.activeElement;
                    } catch (n) {}
                })()) ==
            ("focus" === t)
        );
    }
    function gi(n, t, r, u, f, e) {
        var o, s;
        if ("object" == typeof t) {
            for (s in ("string" != typeof r && ((u = u || r), (r = void 0)), t)) gi(n, s, r, u, t[s], e);
            return n;
        }
        if ((null == u && null == f ? ((f = r), (u = r = void 0)) : null == f && ("string" == typeof r ? ((f = u), (u = void 0)) : ((f = u), (u = r), (r = void 0))), !1 === f)) f = lt;
        else if (!f) return n;
        return (
            1 === e &&
                ((o = f),
                ((f = function (n) {
                    return i().off(n), o.apply(this, arguments);
                }).guid = o.guid || (o.guid = i.guid++))),
            n.each(function () {
                i.event.add(this, t, f, u, r);
            })
        );
    }
    function hi(n, t, u) {
        u
            ? (r.set(n, t, !1),
              i.event.add(n, t, {
                  namespace: !1,
                  handler: function (n) {
                      var o,
                          e,
                          f = r.get(this, t);
                      if (1 & n.isTrigger && this[t]) {
                          if (f.length) (i.event.special[t] || {}).delegateType && n.stopPropagation();
                          else if (((f = k.call(arguments)), r.set(this, t, f), (o = u(this, t)), this[t](), f !== (e = r.get(this, t)) || o ? r.set(this, t, !1) : (e = {}), f !== e))
                              return n.stopImmediatePropagation(), n.preventDefault(), e.value;
                      } else f.length && (r.set(this, t, { value: i.event.trigger(i.extend(f[0], i.Event.prototype), f.slice(1), this) }), n.stopImmediatePropagation());
                  },
              }))
            : void 0 === r.get(n, t) && i.event.add(n, t, ct);
    }
    function pu(n, t) {
        return (c(n, "table") && c(11 !== t.nodeType ? t : t.firstChild, "tr") && i(n).children("tbody")[0]) || n;
    }
    function ge(n) {
        return (n.type = (null !== n.getAttribute("type")) + "/" + n.type), n;
    }
    function no(n) {
        return "true/" === (n.type || "").slice(0, 5) ? (n.type = n.type.slice(5)) : n.removeAttribute("type"), n;
    }
    function wu(n, t) {
        var u, s, f, h, c, e;
        if (1 === t.nodeType) {
            if (r.hasData(n) && (e = r.get(n).events)) for (f in (r.remove(t, "handle events"), e)) for (u = 0, s = e[f].length; u < s; u++) i.event.add(t, f, e[f][u]);
            o.hasData(n) && ((h = o.access(n)), (c = i.extend({}, h)), o.set(t, c));
        }
    }
    function at(n, t, f, o) {
        t = yr(t);
        var a,
            b,
            l,
            v,
            h,
            y,
            c = 0,
            p = n.length,
            d = p - 1,
            w = t[0],
            k = u(w);
        if (k || (1 < p && "string" == typeof w && !e.checkClone && ke.test(w)))
            return n.each(function (i) {
                var r = n.eq(i);
                k && (t[0] = w.call(this, i, r.html()));
                at(r, t, f, o);
            });
        if (p && ((b = (a = vu(t, n[0].ownerDocument, !1, n, o)).firstChild), 1 === a.childNodes.length && (a = b), b || o)) {
            for (v = (l = i.map(s(a, "script"), ge)).length; c < p; c++) (h = a), c !== d && ((h = i.clone(h, !0, !0)), v && i.merge(l, s(h, "script"))), f.call(n[c], h, c);
            if (v)
                for (y = l[l.length - 1].ownerDocument, i.map(l, no), c = 0; c < v; c++)
                    (h = l[c]),
                        lu.test(h.type || "") &&
                            !r.access(h, "globalEval") &&
                            i.contains(y, h) &&
                            (h.src && "module" !== (h.type || "").toLowerCase() ? i._evalUrl && !h.noModule && i._evalUrl(h.src, { nonce: h.nonce || h.getAttribute("nonce") }, y) : br(h.textContent.replace(de, ""), h, y));
        }
        return n;
    }
    function bu(n, t, r) {
        for (var u, e = t ? i.filter(t, n) : n, f = 0; null != (u = e[f]); f++) r || 1 !== u.nodeType || i.cleanData(s(u)), u.parentNode && (r && st(u) && di(s(u, "script")), u.parentNode.removeChild(u));
        return n;
    }
    function ni(n, t, r) {
        var o,
            s,
            h,
            f,
            u = n.style;
        return (
            (r = r || ci(n)) &&
                ("" !== (f = r.getPropertyValue(t) || r[t]) || st(n) || (f = i.style(n, t)),
                !e.pixelBoxStyles() && nr.test(f) && to.test(t) && ((o = u.width), (s = u.minWidth), (h = u.maxWidth), (u.minWidth = u.maxWidth = u.width = f), (f = r.width), (u.width = o), (u.minWidth = s), (u.maxWidth = h))),
            void 0 !== f ? f + "" : f
        );
    }
    function du(n, t) {
        return {
            get: function () {
                if (!n()) return (this.get = t).apply(this, arguments);
                delete this.get;
            },
        };
    }
    function tr(n) {
        var t = i.cssProps[n] || tf[n];
        return (
            t ||
            (n in nf
                ? n
                : (tf[n] =
                      (function (n) {
                          for (var i = n[0].toUpperCase() + n.slice(1), t = gu.length; t--; ) if ((n = gu[t] + i) in nf) return n;
                      })(n) || n))
        );
    }
    function ff(n, t, i) {
        var r = kt.exec(t);
        return r ? Math.max(0, r[2] - (i || 0)) + (r[3] || "px") : t;
    }
    function ir(n, t, r, u, f, e) {
        var o = "width" === t ? 1 : 0,
            h = 0,
            s = 0;
        if (r === (u ? "border" : "content")) return 0;
        for (; o < 4; o += 2)
            "margin" === r && (s += i.css(n, r + b[o], !0, f)),
                u
                    ? ("content" === r && (s -= i.css(n, "padding" + b[o], !0, f)), "margin" !== r && (s -= i.css(n, "border" + b[o] + "Width", !0, f)))
                    : ((s += i.css(n, "padding" + b[o], !0, f)), "padding" !== r ? (s += i.css(n, "border" + b[o] + "Width", !0, f)) : (h += i.css(n, "border" + b[o] + "Width", !0, f)));
        return !u && 0 <= e && (s += Math.max(0, Math.ceil(n["offset" + t[0].toUpperCase() + t.slice(1)] - e - s - h - 0.5)) || 0), s;
    }
    function ef(n, t, r) {
        var f = ci(n),
            o = (!e.boxSizingReliable() || r) && "border-box" === i.css(n, "boxSizing", !1, f),
            s = o,
            u = ni(n, t, f),
            h = "offset" + t[0].toUpperCase() + t.slice(1);
        if (nr.test(u)) {
            if (!r) return u;
            u = "auto";
        }
        return (
            ((!e.boxSizingReliable() && o) || (!e.reliableTrDimensions() && c(n, "tr")) || "auto" === u || (!parseFloat(u) && "inline" === i.css(n, "display", !1, f))) &&
                n.getClientRects().length &&
                ((o = "border-box" === i.css(n, "boxSizing", !1, f)), (s = h in n) && (u = n[h])),
            (u = parseFloat(u) || 0) + ir(n, t, r || (o ? "border" : "content"), s, f, u) + "px"
        );
    }
    function a(n, t, i, r, u) {
        return new a.prototype.init(n, t, i, r, u);
    }
    function rr() {
        li && (!1 === f.hidden && n.requestAnimationFrame ? n.requestAnimationFrame(rr) : n.setTimeout(rr, i.fx.interval), i.fx.tick());
    }
    function cf() {
        return (
            n.setTimeout(function () {
                vt = void 0;
            }),
            (vt = Date.now())
        );
    }
    function ai(n, t) {
        var u,
            r = 0,
            i = { height: n };
        for (t = t ? 1 : 0; r < 4; r += 2 - t) i["margin" + (u = b[r])] = i["padding" + u] = n;
        return t && (i.opacity = i.width = n), i;
    }
    function lf(n, t, i) {
        for (var u, f = (v.tweeners[t] || []).concat(v.tweeners["*"]), r = 0, e = f.length; r < e; r++) if ((u = f[r].call(i, t, n))) return u;
    }
    function v(n, t, r) {
        var o,
            s,
            h = 0,
            a = v.prefilters.length,
            e = i.Deferred().always(function () {
                delete l.elem;
            }),
            l = function () {
                if (s) return !1;
                for (var o = vt || cf(), t = Math.max(0, f.startTime + f.duration - o), i = 1 - (t / f.duration || 0), r = 0, u = f.tweens.length; r < u; r++) f.tweens[r].run(i);
                return e.notifyWith(n, [f, i, t]), i < 1 && u ? t : (u || e.notifyWith(n, [f, 1, 0]), e.resolveWith(n, [f]), !1);
            },
            f = e.promise({
                elem: n,
                props: i.extend({}, t),
                opts: i.extend(!0, { specialEasing: {}, easing: i.easing._default }, r),
                originalProperties: t,
                originalOptions: r,
                startTime: vt || cf(),
                duration: r.duration,
                tweens: [],
                createTween: function (t, r) {
                    var u = i.Tween(n, f.opts, t, r, f.opts.specialEasing[t] || f.opts.easing);
                    return f.tweens.push(u), u;
                },
                stop: function (t) {
                    var i = 0,
                        r = t ? f.tweens.length : 0;
                    if (s) return this;
                    for (s = !0; i < r; i++) f.tweens[i].run(1);
                    return t ? (e.notifyWith(n, [f, 1, 0]), e.resolveWith(n, [f, t])) : e.rejectWith(n, [f, t]), this;
                },
            }),
            c = f.props;
        for (
            !(function (n, t) {
                var r, f, e, u, o;
                for (r in n)
                    if (((e = t[(f = y(r))]), (u = n[r]), Array.isArray(u) && ((e = u[1]), (u = n[r] = u[0])), r !== f && ((n[f] = u), delete n[r]), (o = i.cssHooks[f]) && ("expand" in o)))
                        for (r in ((u = o.expand(u)), delete n[f], u)) (r in n) || ((n[r] = u[r]), (t[r] = e));
                    else t[f] = e;
            })(c, f.opts.specialEasing);
            h < a;
            h++
        )
            if ((o = v.prefilters[h].call(f, n, c, f.opts))) return u(o.stop) && (i._queueHooks(f.elem, f.opts.queue).stop = o.stop.bind(o)), o;
        return (
            i.map(c, lf, f),
            u(f.opts.start) && f.opts.start.call(n, f),
            f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always),
            i.fx.timer(i.extend(l, { elem: n, anim: f, queue: f.opts.queue })),
            f
        );
    }
    function tt(n) {
        return (n.match(l) || []).join(" ");
    }
    function it(n) {
        return (n.getAttribute && n.getAttribute("class")) || "";
    }
    function ur(n) {
        return Array.isArray(n) ? n : ("string" == typeof n && n.match(l)) || [];
    }
    function sr(n, t, r, u) {
        var f;
        if (Array.isArray(t))
            i.each(t, function (t, i) {
                r || uo.test(n) ? u(n, i) : sr(n + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, r, u);
            });
        else if (r || "object" !== ut(t)) u(n, t);
        else for (f in t) sr(n + "[" + f + "]", t[f], r, u);
    }
    function gf(n) {
        return function (t, i) {
            "string" != typeof t && ((i = t), (t = "*"));
            var r,
                f = 0,
                e = t.toLowerCase().match(l) || [];
            if (u(i)) while ((r = e[f++])) "+" === r[0] ? ((r = r.slice(1) || "*"), (n[r] = n[r] || []).unshift(i)) : (n[r] = n[r] || []).push(i);
        };
    }
    function ne(n, t, r, u) {
        function e(s) {
            var h;
            return (
                (f[s] = !0),
                i.each(n[s] || [], function (n, i) {
                    var s = i(t, r, u);
                    return "string" != typeof s || o || f[s] ? (o ? !(h = s) : void 0) : (t.dataTypes.unshift(s), e(s), !1);
                }),
                h
            );
        }
        var f = {},
            o = n === hr;
        return e(t.dataTypes[0]) || (!f["*"] && e("*"));
    }
    function lr(n, t) {
        var r,
            u,
            f = i.ajaxSettings.flatOptions || {};
        for (r in t) void 0 !== t[r] && ((f[r] ? n : u || (u = {}))[r] = t[r]);
        return u && i.extend(!0, n, u), n;
    }
    var p = [],
        vr = Object.getPrototypeOf,
        k = p.slice,
        yr = p.flat
            ? function (n) {
                  return p.flat.call(n);
              }
            : function (n) {
                  return p.concat.apply([], n);
              },
        yi = p.push,
        ii = p.indexOf,
        ri = {},
        pr = ri.toString,
        ui = ri.hasOwnProperty,
        wr = ui.toString,
        ee = wr.call(Object),
        e = {},
        u = function (n) {
            return "function" == typeof n && "number" != typeof n.nodeType;
        },
        rt = function (n) {
            return null != n && n === n.window;
        },
        f = n.document,
        oe = { type: !0, src: !0, nonce: !0, noModule: !0 },
        kr = "3.5.1",
        i = function (n, t) {
            return new i.fn.init(n, t);
        },
        d,
        wi,
        nu,
        tu,
        iu,
        ru,
        l,
        eu,
        ei,
        ot,
        dt,
        ki,
        h,
        au,
        vt,
        li,
        yt,
        of,
        sf,
        hf,
        af,
        pt,
        vf,
        yf,
        pf,
        fr,
        er,
        te,
        wt,
        ie,
        ar,
        vi,
        re,
        ue,
        fe;
    i.fn = i.prototype = {
        jquery: kr,
        constructor: i,
        length: 0,
        toArray: function () {
            return k.call(this);
        },
        get: function (n) {
            return null == n ? k.call(this) : n < 0 ? this[n + this.length] : this[n];
        },
        pushStack: function (n) {
            var t = i.merge(this.constructor(), n);
            return (t.prevObject = this), t;
        },
        each: function (n) {
            return i.each(this, n);
        },
        map: function (n) {
            return this.pushStack(
                i.map(this, function (t, i) {
                    return n.call(t, i, t);
                })
            );
        },
        slice: function () {
            return this.pushStack(k.apply(this, arguments));
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        even: function () {
            return this.pushStack(
                i.grep(this, function (n, t) {
                    return (t + 1) % 2;
                })
            );
        },
        odd: function () {
            return this.pushStack(
                i.grep(this, function (n, t) {
                    return t % 2;
                })
            );
        },
        eq: function (n) {
            var i = this.length,
                t = +n + (n < 0 ? i : 0);
            return this.pushStack(0 <= t && t < i ? [this[t]] : []);
        },
        end: function () {
            return this.prevObject || this.constructor();
        },
        push: yi,
        sort: p.sort,
        splice: p.splice,
    };
    i.extend = i.fn.extend = function () {
        var s,
            f,
            e,
            t,
            o,
            c,
            n = arguments[0] || {},
            r = 1,
            l = arguments.length,
            h = !1;
        for ("boolean" == typeof n && ((h = n), (n = arguments[r] || {}), r++), "object" == typeof n || u(n) || (n = {}), r === l && ((n = this), r--); r < l; r++)
            if (null != (s = arguments[r]))
                for (f in s)
                    (t = s[f]),
                        "__proto__" !== f &&
                            n !== t &&
                            (h && t && (i.isPlainObject(t) || (o = Array.isArray(t))) ? ((e = n[f]), (c = o && !Array.isArray(e) ? [] : o || i.isPlainObject(e) ? e : {}), (o = !1), (n[f] = i.extend(h, c, t))) : void 0 !== t && (n[f] = t));
        return n;
    };
    i.extend({
        expando: "jQuery" + (kr + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (n) {
            throw new Error(n);
        },
        noop: function () {},
        isPlainObject: function (n) {
            var t, i;
            return !(!n || "[object Object]" !== pr.call(n)) && (!(t = vr(n)) || ("function" == typeof (i = ui.call(t, "constructor") && t.constructor) && wr.call(i) === ee));
        },
        isEmptyObject: function (n) {
            var t;
            for (t in n) return !1;
            return !0;
        },
        globalEval: function (n, t, i) {
            br(n, { nonce: t && t.nonce }, i);
        },
        each: function (n, t) {
            var r,
                i = 0;
            if (pi(n)) {
                for (r = n.length; i < r; i++) if (!1 === t.call(n[i], i, n[i])) break;
            } else for (i in n) if (!1 === t.call(n[i], i, n[i])) break;
            return n;
        },
        makeArray: function (n, t) {
            var r = t || [];
            return null != n && (pi(Object(n)) ? i.merge(r, "string" == typeof n ? [n] : n) : yi.call(r, n)), r;
        },
        inArray: function (n, t, i) {
            return null == t ? -1 : ii.call(t, n, i);
        },
        merge: function (n, t) {
            for (var u = +t.length, i = 0, r = n.length; i < u; i++) n[r++] = t[i];
            return (n.length = r), n;
        },
        grep: function (n, t, i) {
            for (var u = [], r = 0, f = n.length, e = !i; r < f; r++) !t(n[r], r) !== e && u.push(n[r]);
            return u;
        },
        map: function (n, t, i) {
            var e,
                u,
                r = 0,
                f = [];
            if (pi(n)) for (e = n.length; r < e; r++) null != (u = t(n[r], r, i)) && f.push(u);
            else for (r in n) null != (u = t(n[r], r, i)) && f.push(u);
            return yr(f);
        },
        guid: 1,
        support: e,
    });
    "function" == typeof Symbol && (i.fn[Symbol.iterator] = p[Symbol.iterator]);
    i.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (n, t) {
        ri["[object " + t + "]"] = t.toLowerCase();
    });
    d = (function (n) {
        function u(n, t, r, u) {
            var s,
                y,
                c,
                l,
                p,
                w,
                d,
                v = t && t.ownerDocument,
                a = t ? t.nodeType : 9;
            if (((r = r || []), "string" != typeof n || !n || (1 !== a && 9 !== a && 11 !== a))) return r;
            if (!u && (b(t), (t = t || i), h)) {
                if (11 !== a && (p = ar.exec(n)))
                    if ((s = p[1])) {
                        if (9 === a) {
                            if (!(c = t.getElementById(s))) return r;
                            if (c.id === s) return r.push(c), r;
                        } else if (v && (c = v.getElementById(s)) && et(t, c) && c.id === s) return r.push(c), r;
                    } else {
                        if (p[2]) return k.apply(r, t.getElementsByTagName(n)), r;
                        if ((s = p[3]) && f.getElementsByClassName && t.getElementsByClassName) return k.apply(r, t.getElementsByClassName(s)), r;
                    }
                if (f.qsa && !lt[n + " "] && (!o || !o.test(n)) && (1 !== a || "object" !== t.nodeName.toLowerCase())) {
                    if (((d = n), (v = t), 1 === a && (er.test(n) || yi.test(n)))) {
                        for (((v = (ti.test(n) && ri(t.parentNode)) || t) === t && f.scope) || ((l = t.getAttribute("id")) ? (l = l.replace(pi, wi)) : t.setAttribute("id", (l = e))), y = (w = ft(n)).length; y--; )
                            w[y] = (l ? "#" + l : ":scope") + " " + pt(w[y]);
                        d = w.join(",");
                    }
                    try {
                        return k.apply(r, v.querySelectorAll(d)), r;
                    } catch (t) {
                        lt(n, !0);
                    } finally {
                        l === e && t.removeAttribute("id");
                    }
                }
            }
            return si(n.replace(at, "$1"), t, r, u);
        }
        function yt() {
            var n = [];
            return function i(r, u) {
                return n.push(r + " ") > t.cacheLength && delete i[n.shift()], (i[r + " "] = u);
            };
        }
        function l(n) {
            return (n[e] = !0), n;
        }
        function a(n) {
            var t = i.createElement("fieldset");
            try {
                return !!n(t);
            } catch (n) {
                return !1;
            } finally {
                t.parentNode && t.parentNode.removeChild(t);
                t = null;
            }
        }
        function ii(n, i) {
            for (var r = n.split("|"), u = r.length; u--; ) t.attrHandle[r[u]] = i;
        }
        function ki(n, t) {
            var i = t && n,
                r = i && 1 === n.nodeType && 1 === t.nodeType && n.sourceIndex - t.sourceIndex;
            if (r) return r;
            if (i) while ((i = i.nextSibling)) if (i === t) return -1;
            return n ? 1 : -1;
        }
        function yr(n) {
            return function (t) {
                return "input" === t.nodeName.toLowerCase() && t.type === n;
            };
        }
        function pr(n) {
            return function (t) {
                var i = t.nodeName.toLowerCase();
                return ("input" === i || "button" === i) && t.type === n;
            };
        }
        function di(n) {
            return function (t) {
                return "form" in t
                    ? t.parentNode && !1 === t.disabled
                        ? "label" in t
                            ? "label" in t.parentNode
                                ? t.parentNode.disabled === n
                                : t.disabled === n
                            : t.isDisabled === n || (t.isDisabled !== !n && vr(t) === n)
                        : t.disabled === n
                    : "label" in t && t.disabled === n;
            };
        }
        function it(n) {
            return l(function (t) {
                return (
                    (t = +t),
                    l(function (i, r) {
                        for (var u, f = n([], i.length, t), e = f.length; e--; ) i[(u = f[e])] && (i[u] = !(r[u] = i[u]));
                    })
                );
            });
        }
        function ri(n) {
            return n && "undefined" != typeof n.getElementsByTagName && n;
        }
        function gi() {}
        function pt(n) {
            for (var t = 0, r = n.length, i = ""; t < r; t++) i += n[t].value;
            return i;
        }
        function wt(n, t, i) {
            var r = t.dir,
                u = t.next,
                f = u || r,
                o = i && "parentNode" === f,
                s = nr++;
            return t.first
                ? function (t, i, u) {
                      while ((t = t[r])) if (1 === t.nodeType || o) return n(t, i, u);
                      return !1;
                  }
                : function (t, i, h) {
                      var c,
                          l,
                          a,
                          y = [v, s];
                      if (h) {
                          while ((t = t[r])) if ((1 === t.nodeType || o) && n(t, i, h)) return !0;
                      } else
                          while ((t = t[r]))
                              if (1 === t.nodeType || o)
                                  if (((l = (a = t[e] || (t[e] = {}))[t.uniqueID] || (a[t.uniqueID] = {})), u && u === t.nodeName.toLowerCase())) t = t[r] || t;
                                  else {
                                      if ((c = l[f]) && c[0] === v && c[1] === s) return (y[2] = c[2]);
                                      if (((l[f] = y)[2] = n(t, i, h))) return !0;
                                  }
                      return !1;
                  };
        }
        function ui(n) {
            return 1 < n.length
                ? function (t, i, r) {
                      for (var u = n.length; u--; ) if (!n[u](t, i, r)) return !1;
                      return !0;
                  }
                : n[0];
        }
        function bt(n, t, i, r, u) {
            for (var e, o = [], f = 0, s = n.length, h = null != t; f < s; f++) (e = n[f]) && ((i && !i(e, r, u)) || (o.push(e), h && t.push(f)));
            return o;
        }
        function fi(n, t, i, r, f, o) {
            return (
                r && !r[e] && (r = fi(r)),
                f && !f[e] && (f = fi(f, o)),
                l(function (e, o, s, h) {
                    var a,
                        l,
                        v,
                        w = [],
                        p = [],
                        b = o.length,
                        d =
                            e ||
                            (function (n, t, i) {
                                for (var r = 0, f = t.length; r < f; r++) u(n, t[r], i);
                                return i;
                            })(t || "*", s.nodeType ? [s] : s, []),
                        y = !n || (!e && t) ? d : bt(d, w, n, s, h),
                        c = i ? (f || (e ? n : b || r) ? [] : o) : y;
                    if ((i && i(y, c, s, h), r)) for (a = bt(c, p), r(a, [], s, h), l = a.length; l--; ) (v = a[l]) && (c[p[l]] = !(y[p[l]] = v));
                    if (e) {
                        if (f || n) {
                            if (f) {
                                for (a = [], l = c.length; l--; ) (v = c[l]) && a.push((y[l] = v));
                                f(null, (c = []), a, h);
                            }
                            for (l = c.length; l--; ) (v = c[l]) && -1 < (a = f ? nt(e, v) : w[l]) && (e[a] = !(o[a] = v));
                        }
                    } else (c = bt(c === o ? c.splice(b, c.length) : c)), f ? f(null, o, c, h) : k.apply(o, c);
                })
            );
        }
        function ei(n) {
            for (
                var o,
                    u,
                    r,
                    s = n.length,
                    h = t.relative[n[0].type],
                    c = h || t.relative[" "],
                    i = h ? 1 : 0,
                    l = wt(
                        function (n) {
                            return n === o;
                        },
                        c,
                        !0
                    ),
                    a = wt(
                        function (n) {
                            return -1 < nt(o, n);
                        },
                        c,
                        !0
                    ),
                    f = [
                        function (n, t, i) {
                            var r = (!h && (i || t !== ht)) || ((o = t).nodeType ? l(n, t, i) : a(n, t, i));
                            return (o = null), r;
                        },
                    ];
                i < s;
                i++
            )
                if ((u = t.relative[n[i].type])) f = [wt(ui(f), u)];
                else {
                    if ((u = t.filter[n[i].type].apply(null, n[i].matches))[e]) {
                        for (r = ++i; r < s; r++) if (t.relative[n[r].type]) break;
                        return fi(1 < i && ui(f), 1 < i && pt(n.slice(0, i - 1).concat({ value: " " === n[i - 2].type ? "*" : "" })).replace(at, "$1"), u, i < r && ei(n.slice(i, r)), r < s && ei((n = n.slice(r))), r < s && pt(n));
                    }
                    f.push(u);
                }
            return ui(f);
        }
        var rt,
            f,
            t,
            st,
            oi,
            ft,
            kt,
            si,
            ht,
            w,
            ut,
            b,
            i,
            s,
            h,
            o,
            d,
            ct,
            et,
            e = "sizzle" + 1 * new Date(),
            c = n.document,
            v = 0,
            nr = 0,
            hi = yt(),
            ci = yt(),
            li = yt(),
            lt = yt(),
            dt = function (n, t) {
                return n === t && (ut = !0), 0;
            },
            tr = {}.hasOwnProperty,
            g = [],
            ir = g.pop,
            rr = g.push,
            k = g.push,
            ai = g.slice,
            nt = function (n, t) {
                for (var i = 0, r = n.length; i < r; i++) if (n[i] === t) return i;
                return -1;
            },
            gt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            r = "[\\x20\\t\\r\\n\\f]",
            tt = "(?:\\\\[\\da-fA-F]{1,6}" + r + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
            vi = "\\[" + r + "*(" + tt + ")(?:" + r + "*([*^$|!~]?=)" + r + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + tt + "))|)" + r + "*\\]",
            ni = ":(" + tt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + vi + ")*)|.*)\\)|)",
            ur = new RegExp(r + "+", "g"),
            at = new RegExp("^" + r + "+|((?:^|[^\\\\])(?:\\\\.)*)" + r + "+$", "g"),
            fr = new RegExp("^" + r + "*," + r + "*"),
            yi = new RegExp("^" + r + "*([>+~]|" + r + ")" + r + "*"),
            er = new RegExp(r + "|>"),
            or = new RegExp(ni),
            sr = new RegExp("^" + tt + "$"),
            vt = {
                ID: new RegExp("^#(" + tt + ")"),
                CLASS: new RegExp("^\\.(" + tt + ")"),
                TAG: new RegExp("^(" + tt + "|[*])"),
                ATTR: new RegExp("^" + vi),
                PSEUDO: new RegExp("^" + ni),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + r + "*(even|odd|(([+-]|)(\\d*)n|)" + r + "*(?:([+-]|)" + r + "*(\\d+)|))" + r + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + gt + ")$", "i"),
                needsContext: new RegExp("^" + r + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + r + "*((?:-\\d)?\\d*)" + r + "*\\)|)(?=[^-]|$)", "i"),
            },
            hr = /HTML$/i,
            cr = /^(?:input|select|textarea|button)$/i,
            lr = /^h\d$/i,
            ot = /^[^{]+\{\s*\[native \w/,
            ar = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ti = /[+~]/,
            y = new RegExp("\\\\[\\da-fA-F]{1,6}" + r + "?|\\\\([^\\r\\n\\f])", "g"),
            p = function (n, t) {
                var i = "0x" + n.slice(1) - 65536;
                return t || (i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode((i >> 10) | 55296, (1023 & i) | 56320));
            },
            pi = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            wi = function (n, t) {
                return t ? ("\0" === n ? "�" : n.slice(0, -1) + "\\" + n.charCodeAt(n.length - 1).toString(16) + " ") : "\\" + n;
            },
            bi = function () {
                b();
            },
            vr = wt(
                function (n) {
                    return !0 === n.disabled && "fieldset" === n.nodeName.toLowerCase();
                },
                { dir: "parentNode", next: "legend" }
            );
        try {
            k.apply((g = ai.call(c.childNodes)), c.childNodes);
            g[c.childNodes.length].nodeType;
        } catch (rt) {
            k = {
                apply: g.length
                    ? function (n, t) {
                          rr.apply(n, ai.call(t));
                      }
                    : function (n, t) {
                          for (var i = n.length, r = 0; (n[i++] = t[r++]); );
                          n.length = i - 1;
                      },
            };
        }
        for (rt in ((f = u.support = {}),
        (oi = u.isXML = function (n) {
            var i = n.namespaceURI,
                t = (n.ownerDocument || n).documentElement;
            return !hr.test(i || (t && t.nodeName) || "HTML");
        }),
        (b = u.setDocument = function (n) {
            var v,
                u,
                l = n ? n.ownerDocument || n : c;
            return (
                l != i &&
                    9 === l.nodeType &&
                    l.documentElement &&
                    ((s = (i = l).documentElement),
                    (h = !oi(i)),
                    c != i && (u = i.defaultView) && u.top !== u && (u.addEventListener ? u.addEventListener("unload", bi, !1) : u.attachEvent && u.attachEvent("onunload", bi)),
                    (f.scope = a(function (n) {
                        return s.appendChild(n).appendChild(i.createElement("div")), "undefined" != typeof n.querySelectorAll && !n.querySelectorAll(":scope fieldset div").length;
                    })),
                    (f.attributes = a(function (n) {
                        return (n.className = "i"), !n.getAttribute("className");
                    })),
                    (f.getElementsByTagName = a(function (n) {
                        return n.appendChild(i.createComment("")), !n.getElementsByTagName("*").length;
                    })),
                    (f.getElementsByClassName = ot.test(i.getElementsByClassName)),
                    (f.getById = a(function (n) {
                        return (s.appendChild(n).id = e), !i.getElementsByName || !i.getElementsByName(e).length;
                    })),
                    f.getById
                        ? ((t.filter.ID = function (n) {
                              var t = n.replace(y, p);
                              return function (n) {
                                  return n.getAttribute("id") === t;
                              };
                          }),
                          (t.find.ID = function (n, t) {
                              if ("undefined" != typeof t.getElementById && h) {
                                  var i = t.getElementById(n);
                                  return i ? [i] : [];
                              }
                          }))
                        : ((t.filter.ID = function (n) {
                              var t = n.replace(y, p);
                              return function (n) {
                                  var i = "undefined" != typeof n.getAttributeNode && n.getAttributeNode("id");
                                  return i && i.value === t;
                              };
                          }),
                          (t.find.ID = function (n, t) {
                              if ("undefined" != typeof t.getElementById && h) {
                                  var r,
                                      u,
                                      f,
                                      i = t.getElementById(n);
                                  if (i) {
                                      if ((r = i.getAttributeNode("id")) && r.value === n) return [i];
                                      for (f = t.getElementsByName(n), u = 0; (i = f[u++]); ) if ((r = i.getAttributeNode("id")) && r.value === n) return [i];
                                  }
                                  return [];
                              }
                          })),
                    (t.find.TAG = f.getElementsByTagName
                        ? function (n, t) {
                              return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(n) : f.qsa ? t.querySelectorAll(n) : void 0;
                          }
                        : function (n, t) {
                              var i,
                                  r = [],
                                  f = 0,
                                  u = t.getElementsByTagName(n);
                              if ("*" === n) {
                                  while ((i = u[f++])) 1 === i.nodeType && r.push(i);
                                  return r;
                              }
                              return u;
                          }),
                    (t.find.CLASS =
                        f.getElementsByClassName &&
                        function (n, t) {
                            if ("undefined" != typeof t.getElementsByClassName && h) return t.getElementsByClassName(n);
                        }),
                    (d = []),
                    (o = []),
                    (f.qsa = ot.test(i.querySelectorAll)) &&
                        (a(function (n) {
                            var t;
                            s.appendChild(n).innerHTML = "<a id='" + e + "'></a><select id='" + e + "-\r\\' msallowcapture=''><option selected=''></option></select>";
                            n.querySelectorAll("[msallowcapture^='']").length && o.push("[*^$]=" + r + "*(?:''|\"\")");
                            n.querySelectorAll("[selected]").length || o.push("\\[" + r + "*(?:value|" + gt + ")");
                            n.querySelectorAll("[id~=" + e + "-]").length || o.push("~=");
                            (t = i.createElement("input")).setAttribute("name", "");
                            n.appendChild(t);
                            n.querySelectorAll("[name='']").length || o.push("\\[" + r + "*name" + r + "*=" + r + "*(?:''|\"\")");
                            n.querySelectorAll(":checked").length || o.push(":checked");
                            n.querySelectorAll("a#" + e + "+*").length || o.push(".#.+[+~]");
                            n.querySelectorAll("\\\f");
                            o.push("[\\r\\n\\f]");
                        }),
                        a(function (n) {
                            n.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                            var t = i.createElement("input");
                            t.setAttribute("type", "hidden");
                            n.appendChild(t).setAttribute("name", "D");
                            n.querySelectorAll("[name=d]").length && o.push("name" + r + "*[*^$|!~]?=");
                            2 !== n.querySelectorAll(":enabled").length && o.push(":enabled", ":disabled");
                            s.appendChild(n).disabled = !0;
                            2 !== n.querySelectorAll(":disabled").length && o.push(":enabled", ":disabled");
                            n.querySelectorAll("*,:x");
                            o.push(",.*:");
                        })),
                    (f.matchesSelector = ot.test((ct = s.matches || s.webkitMatchesSelector || s.mozMatchesSelector || s.oMatchesSelector || s.msMatchesSelector))) &&
                        a(function (n) {
                            f.disconnectedMatch = ct.call(n, "*");
                            ct.call(n, "[s!='']:x");
                            d.push("!=", ni);
                        }),
                    (o = o.length && new RegExp(o.join("|"))),
                    (d = d.length && new RegExp(d.join("|"))),
                    (v = ot.test(s.compareDocumentPosition)),
                    (et =
                        v || ot.test(s.contains)
                            ? function (n, t) {
                                  var r = 9 === n.nodeType ? n.documentElement : n,
                                      i = t && t.parentNode;
                                  return n === i || !(!i || 1 !== i.nodeType || !(r.contains ? r.contains(i) : n.compareDocumentPosition && 16 & n.compareDocumentPosition(i)));
                              }
                            : function (n, t) {
                                  if (t) while ((t = t.parentNode)) if (t === n) return !0;
                                  return !1;
                              }),
                    (dt = v
                        ? function (n, t) {
                              if (n === t) return (ut = !0), 0;
                              var r = !n.compareDocumentPosition - !t.compareDocumentPosition;
                              return (
                                  r ||
                                  (1 & (r = (n.ownerDocument || n) == (t.ownerDocument || t) ? n.compareDocumentPosition(t) : 1) || (!f.sortDetached && t.compareDocumentPosition(n) === r)
                                      ? n == i || (n.ownerDocument == c && et(c, n))
                                          ? -1
                                          : t == i || (t.ownerDocument == c && et(c, t))
                                          ? 1
                                          : w
                                          ? nt(w, n) - nt(w, t)
                                          : 0
                                      : 4 & r
                                      ? -1
                                      : 1)
                              );
                          }
                        : function (n, t) {
                              if (n === t) return (ut = !0), 0;
                              var r,
                                  u = 0,
                                  o = n.parentNode,
                                  s = t.parentNode,
                                  f = [n],
                                  e = [t];
                              if (!o || !s) return n == i ? -1 : t == i ? 1 : o ? -1 : s ? 1 : w ? nt(w, n) - nt(w, t) : 0;
                              if (o === s) return ki(n, t);
                              for (r = n; (r = r.parentNode); ) f.unshift(r);
                              for (r = t; (r = r.parentNode); ) e.unshift(r);
                              while (f[u] === e[u]) u++;
                              return u ? ki(f[u], e[u]) : f[u] == c ? -1 : e[u] == c ? 1 : 0;
                          })),
                i
            );
        }),
        (u.matches = function (n, t) {
            return u(n, null, null, t);
        }),
        (u.matchesSelector = function (n, t) {
            if ((b(n), f.matchesSelector && h && !lt[t + " "] && (!d || !d.test(t)) && (!o || !o.test(t))))
                try {
                    var r = ct.call(n, t);
                    if (r || f.disconnectedMatch || (n.document && 11 !== n.document.nodeType)) return r;
                } catch (n) {
                    lt(t, !0);
                }
            return 0 < u(t, i, null, [n]).length;
        }),
        (u.contains = function (n, t) {
            return (n.ownerDocument || n) != i && b(n), et(n, t);
        }),
        (u.attr = function (n, r) {
            (n.ownerDocument || n) != i && b(n);
            var e = t.attrHandle[r.toLowerCase()],
                u = e && tr.call(t.attrHandle, r.toLowerCase()) ? e(n, r, !h) : void 0;
            return void 0 !== u ? u : f.attributes || !h ? n.getAttribute(r) : (u = n.getAttributeNode(r)) && u.specified ? u.value : null;
        }),
        (u.escape = function (n) {
            return (n + "").replace(pi, wi);
        }),
        (u.error = function (n) {
            throw new Error("Syntax error, unrecognized expression: " + n);
        }),
        (u.uniqueSort = function (n) {
            var r,
                u = [],
                t = 0,
                i = 0;
            if (((ut = !f.detectDuplicates), (w = !f.sortStable && n.slice(0)), n.sort(dt), ut)) {
                while ((r = n[i++])) r === n[i] && (t = u.push(i));
                while (t--) n.splice(u[t], 1);
            }
            return (w = null), n;
        }),
        (st = u.getText = function (n) {
            var r,
                i = "",
                u = 0,
                t = n.nodeType;
            if (t) {
                if (1 === t || 9 === t || 11 === t) {
                    if ("string" == typeof n.textContent) return n.textContent;
                    for (n = n.firstChild; n; n = n.nextSibling) i += st(n);
                } else if (3 === t || 4 === t) return n.nodeValue;
            } else while ((r = n[u++])) i += st(r);
            return i;
        }),
        ((t = u.selectors = {
            cacheLength: 50,
            createPseudo: l,
            match: vt,
            attrHandle: {},
            find: {},
            relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
            preFilter: {
                ATTR: function (n) {
                    return (n[1] = n[1].replace(y, p)), (n[3] = (n[3] || n[4] || n[5] || "").replace(y, p)), "~=" === n[2] && (n[3] = " " + n[3] + " "), n.slice(0, 4);
                },
                CHILD: function (n) {
                    return (
                        (n[1] = n[1].toLowerCase()),
                        "nth" === n[1].slice(0, 3) ? (n[3] || u.error(n[0]), (n[4] = +(n[4] ? n[5] + (n[6] || 1) : 2 * ("even" === n[3] || "odd" === n[3]))), (n[5] = +(n[7] + n[8] || "odd" === n[3]))) : n[3] && u.error(n[0]),
                        n
                    );
                },
                PSEUDO: function (n) {
                    var i,
                        t = !n[6] && n[2];
                    return vt.CHILD.test(n[0])
                        ? null
                        : (n[3] ? (n[2] = n[4] || n[5] || "") : t && or.test(t) && (i = ft(t, !0)) && (i = t.indexOf(")", t.length - i) - t.length) && ((n[0] = n[0].slice(0, i)), (n[2] = t.slice(0, i))), n.slice(0, 3));
                },
            },
            filter: {
                TAG: function (n) {
                    var t = n.replace(y, p).toLowerCase();
                    return "*" === n
                        ? function () {
                              return !0;
                          }
                        : function (n) {
                              return n.nodeName && n.nodeName.toLowerCase() === t;
                          };
                },
                CLASS: function (n) {
                    var t = hi[n + " "];
                    return (
                        t ||
                        ((t = new RegExp("(^|" + r + ")" + n + "(" + r + "|$)")) &&
                            hi(n, function (n) {
                                return t.test(("string" == typeof n.className && n.className) || ("undefined" != typeof n.getAttribute && n.getAttribute("class")) || "");
                            }))
                    );
                },
                ATTR: function (n, t, i) {
                    return function (r) {
                        var f = u.attr(r, n);
                        return null == f
                            ? "!=" === t
                            : !t ||
                                  ((f += ""),
                                  "=" === t
                                      ? f === i
                                      : "!=" === t
                                      ? f !== i
                                      : "^=" === t
                                      ? i && 0 === f.indexOf(i)
                                      : "*=" === t
                                      ? i && -1 < f.indexOf(i)
                                      : "$=" === t
                                      ? i && f.slice(-i.length) === i
                                      : "~=" === t
                                      ? -1 < (" " + f.replace(ur, " ") + " ").indexOf(i)
                                      : "|=" === t && (f === i || f.slice(0, i.length + 1) === i + "-"));
                    };
                },
                CHILD: function (n, t, i, r, u) {
                    var s = "nth" !== n.slice(0, 3),
                        o = "last" !== n.slice(-4),
                        f = "of-type" === t;
                    return 1 === r && 0 === u
                        ? function (n) {
                              return !!n.parentNode;
                          }
                        : function (t, i, h) {
                              var p,
                                  d,
                                  y,
                                  c,
                                  a,
                                  w,
                                  b = s !== o ? "nextSibling" : "previousSibling",
                                  k = t.parentNode,
                                  nt = f && t.nodeName.toLowerCase(),
                                  g = !h && !f,
                                  l = !1;
                              if (k) {
                                  if (s) {
                                      while (b) {
                                          for (c = t; (c = c[b]); ) if (f ? c.nodeName.toLowerCase() === nt : 1 === c.nodeType) return !1;
                                          w = b = "only" === n && !w && "nextSibling";
                                      }
                                      return !0;
                                  }
                                  if (((w = [o ? k.firstChild : k.lastChild]), o && g)) {
                                      for (
                                          l = (a = (p = (d = (y = (c = k)[e] || (c[e] = {}))[c.uniqueID] || (y[c.uniqueID] = {}))[n] || [])[0] === v && p[1]) && p[2], c = a && k.childNodes[a];
                                          (c = (++a && c && c[b]) || (l = a = 0) || w.pop());

                                      )
                                          if (1 === c.nodeType && ++l && c === t) {
                                              d[n] = [v, a, l];
                                              break;
                                          }
                                  } else if ((g && (l = a = (p = (d = (y = (c = t)[e] || (c[e] = {}))[c.uniqueID] || (y[c.uniqueID] = {}))[n] || [])[0] === v && p[1]), !1 === l))
                                      while ((c = (++a && c && c[b]) || (l = a = 0) || w.pop()))
                                          if ((f ? c.nodeName.toLowerCase() === nt : 1 === c.nodeType) && ++l && (g && ((d = (y = c[e] || (c[e] = {}))[c.uniqueID] || (y[c.uniqueID] = {}))[n] = [v, l]), c === t)) break;
                                  return (l -= u) === r || (l % r == 0 && 0 <= l / r);
                              }
                          };
                },
                PSEUDO: function (n, i) {
                    var f,
                        r = t.pseudos[n] || t.setFilters[n.toLowerCase()] || u.error("unsupported pseudo: " + n);
                    return r[e]
                        ? r(i)
                        : 1 < r.length
                        ? ((f = [n, n, "", i]),
                          t.setFilters.hasOwnProperty(n.toLowerCase())
                              ? l(function (n, t) {
                                    for (var e, u = r(n, i), f = u.length; f--; ) n[(e = nt(n, u[f]))] = !(t[e] = u[f]);
                                })
                              : function (n) {
                                    return r(n, 0, f);
                                })
                        : r;
                },
            },
            pseudos: {
                not: l(function (n) {
                    var t = [],
                        r = [],
                        i = kt(n.replace(at, "$1"));
                    return i[e]
                        ? l(function (n, t, r, u) {
                              for (var e, o = i(n, null, u, []), f = n.length; f--; ) (e = o[f]) && (n[f] = !(t[f] = e));
                          })
                        : function (n, u, f) {
                              return (t[0] = n), i(t, null, f, r), (t[0] = null), !r.pop();
                          };
                }),
                has: l(function (n) {
                    return function (t) {
                        return 0 < u(n, t).length;
                    };
                }),
                contains: l(function (n) {
                    return (
                        (n = n.replace(y, p)),
                        function (t) {
                            return -1 < (t.textContent || st(t)).indexOf(n);
                        }
                    );
                }),
                lang: l(function (n) {
                    return (
                        sr.test(n || "") || u.error("unsupported lang: " + n),
                        (n = n.replace(y, p).toLowerCase()),
                        function (t) {
                            var i;
                            do if ((i = h ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))) return (i = i.toLowerCase()) === n || 0 === i.indexOf(n + "-");
                            while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1;
                        }
                    );
                }),
                target: function (t) {
                    var i = n.location && n.location.hash;
                    return i && i.slice(1) === t.id;
                },
                root: function (n) {
                    return n === s;
                },
                focus: function (n) {
                    return n === i.activeElement && (!i.hasFocus || i.hasFocus()) && !!(n.type || n.href || ~n.tabIndex);
                },
                enabled: di(!1),
                disabled: di(!0),
                checked: function (n) {
                    var t = n.nodeName.toLowerCase();
                    return ("input" === t && !!n.checked) || ("option" === t && !!n.selected);
                },
                selected: function (n) {
                    return n.parentNode && n.parentNode.selectedIndex, !0 === n.selected;
                },
                empty: function (n) {
                    for (n = n.firstChild; n; n = n.nextSibling) if (n.nodeType < 6) return !1;
                    return !0;
                },
                parent: function (n) {
                    return !t.pseudos.empty(n);
                },
                header: function (n) {
                    return lr.test(n.nodeName);
                },
                input: function (n) {
                    return cr.test(n.nodeName);
                },
                button: function (n) {
                    var t = n.nodeName.toLowerCase();
                    return ("input" === t && "button" === n.type) || "button" === t;
                },
                text: function (n) {
                    var t;
                    return "input" === n.nodeName.toLowerCase() && "text" === n.type && (null == (t = n.getAttribute("type")) || "text" === t.toLowerCase());
                },
                first: it(function () {
                    return [0];
                }),
                last: it(function (n, t) {
                    return [t - 1];
                }),
                eq: it(function (n, t, i) {
                    return [i < 0 ? i + t : i];
                }),
                even: it(function (n, t) {
                    for (var i = 0; i < t; i += 2) n.push(i);
                    return n;
                }),
                odd: it(function (n, t) {
                    for (var i = 1; i < t; i += 2) n.push(i);
                    return n;
                }),
                lt: it(function (n, t, i) {
                    for (var r = i < 0 ? i + t : t < i ? t : i; 0 <= --r; ) n.push(r);
                    return n;
                }),
                gt: it(function (n, t, i) {
                    for (var r = i < 0 ? i + t : i; ++r < t; ) n.push(r);
                    return n;
                }),
            },
        }).pseudos.nth = t.pseudos.eq),
        { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
            t.pseudos[rt] = yr(rt);
        for (rt in { submit: !0, reset: !0 }) t.pseudos[rt] = pr(rt);
        return (
            (gi.prototype = t.filters = t.pseudos),
            (t.setFilters = new gi()),
            (ft = u.tokenize = function (n, i) {
                var e,
                    f,
                    s,
                    o,
                    r,
                    h,
                    c,
                    l = ci[n + " "];
                if (l) return i ? 0 : l.slice(0);
                for (r = n, h = [], c = t.preFilter; r; ) {
                    for (o in ((e && !(f = fr.exec(r))) || (f && (r = r.slice(f[0].length) || r), h.push((s = []))),
                    (e = !1),
                    (f = yi.exec(r)) && ((e = f.shift()), s.push({ value: e, type: f[0].replace(at, " ") }), (r = r.slice(e.length))),
                    t.filter))
                        (f = vt[o].exec(r)) && (!c[o] || (f = c[o](f))) && ((e = f.shift()), s.push({ value: e, type: o, matches: f }), (r = r.slice(e.length)));
                    if (!e) break;
                }
                return i ? r.length : r ? u.error(n) : ci(n, h).slice(0);
            }),
            (kt = u.compile = function (n, r) {
                var s,
                    c,
                    a,
                    o,
                    y,
                    p,
                    w = [],
                    d = [],
                    f = li[n + " "];
                if (!f) {
                    for (r || (r = ft(n)), s = r.length; s--; ) (f = ei(r[s]))[e] ? w.push(f) : d.push(f);
                    (f = li(
                        n,
                        ((c = d),
                        (o = 0 < (a = w).length),
                        (y = 0 < c.length),
                        (p = function (n, r, f, e, s) {
                            var l,
                                nt,
                                d,
                                g = 0,
                                p = "0",
                                tt = n && [],
                                w = [],
                                it = ht,
                                rt = n || (y && t.find.TAG("*", s)),
                                ut = (v += null == it ? 1 : Math.random() || 0.1),
                                ft = rt.length;
                            for (s && (ht = r == i || r || s); p !== ft && null != (l = rt[p]); p++) {
                                if (y && l) {
                                    for (nt = 0, r || l.ownerDocument == i || (b(l), (f = !h)); (d = c[nt++]); )
                                        if (d(l, r || i, f)) {
                                            e.push(l);
                                            break;
                                        }
                                    s && (v = ut);
                                }
                                o && ((l = !d && l) && g--, n && tt.push(l));
                            }
                            if (((g += p), o && p !== g)) {
                                for (nt = 0; (d = a[nt++]); ) d(tt, w, r, f);
                                if (n) {
                                    if (0 < g) while (p--) tt[p] || w[p] || (w[p] = ir.call(e));
                                    w = bt(w);
                                }
                                k.apply(e, w);
                                s && !n && 0 < w.length && 1 < g + a.length && u.uniqueSort(e);
                            }
                            return s && ((v = ut), (ht = it)), tt;
                        }),
                        o ? l(p) : p)
                    )).selector = n;
                }
                return f;
            }),
            (si = u.select = function (n, i, r, u) {
                var o,
                    f,
                    e,
                    l,
                    a,
                    c = "function" == typeof n && n,
                    s = !u && ft((n = c.selector || n));
                if (((r = r || []), 1 === s.length)) {
                    if (2 < (f = s[0] = s[0].slice(0)).length && "ID" === (e = f[0]).type && 9 === i.nodeType && h && t.relative[f[1].type]) {
                        if (!(i = (t.find.ID(e.matches[0].replace(y, p), i) || [])[0])) return r;
                        c && (i = i.parentNode);
                        n = n.slice(f.shift().value.length);
                    }
                    for (o = vt.needsContext.test(n) ? 0 : f.length; o--; ) {
                        if (((e = f[o]), t.relative[(l = e.type)])) break;
                        if ((a = t.find[l]) && (u = a(e.matches[0].replace(y, p), (ti.test(f[0].type) && ri(i.parentNode)) || i))) {
                            if ((f.splice(o, 1), !(n = u.length && pt(f)))) return k.apply(r, u), r;
                            break;
                        }
                    }
                }
                return (c || kt(n, s))(u, i, !h, r, !i || (ti.test(n) && ri(i.parentNode)) || i), r;
            }),
            (f.sortStable = e.split("").sort(dt).join("") === e),
            (f.detectDuplicates = !!ut),
            b(),
            (f.sortDetached = a(function (n) {
                return 1 & n.compareDocumentPosition(i.createElement("fieldset"));
            })),
            a(function (n) {
                return (n.innerHTML = "<a href='#'></a>"), "#" === n.firstChild.getAttribute("href");
            }) ||
                ii("type|href|height|width", function (n, t, i) {
                    if (!i) return n.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
                }),
            (f.attributes &&
                a(function (n) {
                    return (n.innerHTML = "<input/>"), n.firstChild.setAttribute("value", ""), "" === n.firstChild.getAttribute("value");
                })) ||
                ii("value", function (n, t, i) {
                    if (!i && "input" === n.nodeName.toLowerCase()) return n.defaultValue;
                }),
            a(function (n) {
                return null == n.getAttribute("disabled");
            }) ||
                ii(gt, function (n, t, i) {
                    var r;
                    if (!i) return !0 === n[t] ? t.toLowerCase() : (r = n.getAttributeNode(t)) && r.specified ? r.value : null;
                }),
            u
        );
    })(n);
    i.find = d;
    i.expr = d.selectors;
    i.expr[":"] = i.expr.pseudos;
    i.uniqueSort = i.unique = d.uniqueSort;
    i.text = d.getText;
    i.isXMLDoc = d.isXML;
    i.contains = d.contains;
    i.escapeSelector = d.escape;
    var ft = function (n, t, r) {
            for (var u = [], f = void 0 !== r; (n = n[t]) && 9 !== n.nodeType; )
                if (1 === n.nodeType) {
                    if (f && i(n).is(r)) break;
                    u.push(n);
                }
            return u;
        },
        dr = function (n, t) {
            for (var i = []; n; n = n.nextSibling) 1 === n.nodeType && n !== t && i.push(n);
            return i;
        },
        gr = i.expr.match.needsContext;
    wi = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    i.filter = function (n, t, r) {
        var u = t[0];
        return (
            r && (n = ":not(" + n + ")"),
            1 === t.length && 1 === u.nodeType
                ? i.find.matchesSelector(u, n)
                    ? [u]
                    : []
                : i.find.matches(
                      n,
                      i.grep(t, function (n) {
                          return 1 === n.nodeType;
                      })
                  )
        );
    };
    i.fn.extend({
        find: function (n) {
            var t,
                r,
                u = this.length,
                f = this;
            if ("string" != typeof n)
                return this.pushStack(
                    i(n).filter(function () {
                        for (t = 0; t < u; t++) if (i.contains(f[t], this)) return !0;
                    })
                );
            for (r = this.pushStack([]), t = 0; t < u; t++) i.find(n, f[t], r);
            return 1 < u ? i.uniqueSort(r) : r;
        },
        filter: function (n) {
            return this.pushStack(bi(this, n || [], !1));
        },
        not: function (n) {
            return this.pushStack(bi(this, n || [], !0));
        },
        is: function (n) {
            return !!bi(this, "string" == typeof n && gr.test(n) ? i(n) : n || [], !1).length;
        },
    });
    tu = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (i.fn.init = function (n, t, r) {
        var e, o;
        if (!n) return this;
        if (((r = r || nu), "string" == typeof n)) {
            if (!(e = "<" === n[0] && ">" === n[n.length - 1] && 3 <= n.length ? [null, n, null] : tu.exec(n)) || (!e[1] && t)) return !t || t.jquery ? (t || r).find(n) : this.constructor(t).find(n);
            if (e[1]) {
                if (((t = t instanceof i ? t[0] : t), i.merge(this, i.parseHTML(e[1], t && t.nodeType ? t.ownerDocument || t : f, !0)), wi.test(e[1]) && i.isPlainObject(t))) for (e in t) u(this[e]) ? this[e](t[e]) : this.attr(e, t[e]);
                return this;
            }
            return (o = f.getElementById(e[2])) && ((this[0] = o), (this.length = 1)), this;
        }
        return n.nodeType ? ((this[0] = n), (this.length = 1), this) : u(n) ? (void 0 !== r.ready ? r.ready(n) : n(i)) : i.makeArray(n, this);
    }).prototype = i.fn;
    nu = i(f);
    iu = /^(?:parents|prev(?:Until|All))/;
    ru = { children: !0, contents: !0, next: !0, prev: !0 };
    i.fn.extend({
        has: function (n) {
            var t = i(n, this),
                r = t.length;
            return this.filter(function () {
                for (var n = 0; n < r; n++) if (i.contains(this, t[n])) return !0;
            });
        },
        closest: function (n, t) {
            var r,
                f = 0,
                o = this.length,
                u = [],
                e = "string" != typeof n && i(n);
            if (!gr.test(n))
                for (; f < o; f++)
                    for (r = this[f]; r && r !== t; r = r.parentNode)
                        if (r.nodeType < 11 && (e ? -1 < e.index(r) : 1 === r.nodeType && i.find.matchesSelector(r, n))) {
                            u.push(r);
                            break;
                        }
            return this.pushStack(1 < u.length ? i.uniqueSort(u) : u);
        },
        index: function (n) {
            return n ? ("string" == typeof n ? ii.call(i(n), this[0]) : ii.call(this, n.jquery ? n[0] : n)) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function (n, t) {
            return this.pushStack(i.uniqueSort(i.merge(this.get(), i(n, t))));
        },
        addBack: function (n) {
            return this.add(null == n ? this.prevObject : this.prevObject.filter(n));
        },
    });
    i.each(
        {
            parent: function (n) {
                var t = n.parentNode;
                return t && 11 !== t.nodeType ? t : null;
            },
            parents: function (n) {
                return ft(n, "parentNode");
            },
            parentsUntil: function (n, t, i) {
                return ft(n, "parentNode", i);
            },
            next: function (n) {
                return uu(n, "nextSibling");
            },
            prev: function (n) {
                return uu(n, "previousSibling");
            },
            nextAll: function (n) {
                return ft(n, "nextSibling");
            },
            prevAll: function (n) {
                return ft(n, "previousSibling");
            },
            nextUntil: function (n, t, i) {
                return ft(n, "nextSibling", i);
            },
            prevUntil: function (n, t, i) {
                return ft(n, "previousSibling", i);
            },
            siblings: function (n) {
                return dr((n.parentNode || {}).firstChild, n);
            },
            children: function (n) {
                return dr(n.firstChild);
            },
            contents: function (n) {
                return null != n.contentDocument && vr(n.contentDocument) ? n.contentDocument : (c(n, "template") && (n = n.content || n), i.merge([], n.childNodes));
            },
        },
        function (n, t) {
            i.fn[n] = function (r, u) {
                var f = i.map(this, t, r);
                return "Until" !== n.slice(-5) && (u = r), u && "string" == typeof u && (f = i.filter(u, f)), 1 < this.length && (ru[n] || i.uniqueSort(f), iu.test(n) && f.reverse()), this.pushStack(f);
            };
        }
    );
    l = /[^\x20\t\r\n\f]+/g;
    i.Callbacks = function (n) {
        var a, h;
        n =
            "string" == typeof n
                ? ((a = n),
                  (h = {}),
                  i.each(a.match(l) || [], function (n, t) {
                      h[t] = !0;
                  }),
                  h)
                : i.extend({}, n);
        var o,
            r,
            v,
            f,
            t = [],
            s = [],
            e = -1,
            y = function () {
                for (f = f || n.once, v = o = !0; s.length; e = -1) for (r = s.shift(); ++e < t.length; ) !1 === t[e].apply(r[0], r[1]) && n.stopOnFalse && ((e = t.length), (r = !1));
                n.memory || (r = !1);
                o = !1;
                f && (t = r ? [] : "");
            },
            c = {
                add: function () {
                    return (
                        t &&
                            (r && !o && ((e = t.length - 1), s.push(r)),
                            (function f(r) {
                                i.each(r, function (i, r) {
                                    u(r) ? (n.unique && c.has(r)) || t.push(r) : r && r.length && "string" !== ut(r) && f(r);
                                });
                            })(arguments),
                            r && !o && y()),
                        this
                    );
                },
                remove: function () {
                    return (
                        i.each(arguments, function (n, r) {
                            for (var u; -1 < (u = i.inArray(r, t, u)); ) t.splice(u, 1), u <= e && e--;
                        }),
                        this
                    );
                },
                has: function (n) {
                    return n ? -1 < i.inArray(n, t) : 0 < t.length;
                },
                empty: function () {
                    return t && (t = []), this;
                },
                disable: function () {
                    return (f = s = []), (t = r = ""), this;
                },
                disabled: function () {
                    return !t;
                },
                lock: function () {
                    return (f = s = []), r || o || (t = r = ""), this;
                },
                locked: function () {
                    return !!f;
                },
                fireWith: function (n, t) {
                    return f || ((t = [n, (t = t || []).slice ? t.slice() : t]), s.push(t), o || y()), this;
                },
                fire: function () {
                    return c.fireWith(this, arguments), this;
                },
                fired: function () {
                    return !!v;
                },
            };
        return c;
    };
    i.extend({
        Deferred: function (t) {
            var f = [
                    ["notify", "progress", i.Callbacks("memory"), i.Callbacks("memory"), 2],
                    ["resolve", "done", i.Callbacks("once memory"), i.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", i.Callbacks("once memory"), i.Callbacks("once memory"), 1, "rejected"],
                ],
                o = "pending",
                e = {
                    state: function () {
                        return o;
                    },
                    always: function () {
                        return r.done(arguments).fail(arguments), this;
                    },
                    catch: function (n) {
                        return e.then(null, n);
                    },
                    pipe: function () {
                        var n = arguments;
                        return i
                            .Deferred(function (t) {
                                i.each(f, function (i, f) {
                                    var e = u(n[f[4]]) && n[f[4]];
                                    r[f[1]](function () {
                                        var n = e && e.apply(this, arguments);
                                        n && u(n.promise) ? n.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[f[0] + "With"](this, e ? [n] : arguments);
                                    });
                                });
                                n = null;
                            })
                            .promise();
                    },
                    then: function (t, r, e) {
                        function s(t, r, f, e) {
                            return function () {
                                var h = this,
                                    c = arguments,
                                    l = function () {
                                        var n, i;
                                        if (!(t < o)) {
                                            if ((n = f.apply(h, c)) === r.promise()) throw new TypeError("Thenable self-resolution");
                                            i = n && ("object" == typeof n || "function" == typeof n) && n.then;
                                            u(i)
                                                ? e
                                                    ? i.call(n, s(o, r, et, e), s(o, r, fi, e))
                                                    : (o++, i.call(n, s(o, r, et, e), s(o, r, fi, e), s(o, r, et, r.notifyWith)))
                                                : (f !== et && ((h = void 0), (c = [n])), (e || r.resolveWith)(h, c));
                                        }
                                    },
                                    a = e
                                        ? l
                                        : function () {
                                              try {
                                                  l();
                                              } catch (l) {
                                                  i.Deferred.exceptionHook && i.Deferred.exceptionHook(l, a.stackTrace);
                                                  o <= t + 1 && (f !== fi && ((h = void 0), (c = [l])), r.rejectWith(h, c));
                                              }
                                          };
                                t ? a() : (i.Deferred.getStackHook && (a.stackTrace = i.Deferred.getStackHook()), n.setTimeout(a));
                            };
                        }
                        var o = 0;
                        return i
                            .Deferred(function (n) {
                                f[0][3].add(s(0, n, u(e) ? e : et, n.notifyWith));
                                f[1][3].add(s(0, n, u(t) ? t : et));
                                f[2][3].add(s(0, n, u(r) ? r : fi));
                            })
                            .promise();
                    },
                    promise: function (n) {
                        return null != n ? i.extend(n, e) : e;
                    },
                },
                r = {};
            return (
                i.each(f, function (n, t) {
                    var i = t[2],
                        u = t[5];
                    e[t[1]] = i.add;
                    u &&
                        i.add(
                            function () {
                                o = u;
                            },
                            f[3 - n][2].disable,
                            f[3 - n][3].disable,
                            f[0][2].lock,
                            f[0][3].lock
                        );
                    i.add(t[3].fire);
                    r[t[0]] = function () {
                        return r[t[0] + "With"](this === r ? void 0 : this, arguments), this;
                    };
                    r[t[0] + "With"] = i.fireWith;
                }),
                e.promise(r),
                t && t.call(r, r),
                r
            );
        },
        when: function (n) {
            var e = arguments.length,
                t = e,
                o = Array(t),
                f = k.call(arguments),
                r = i.Deferred(),
                s = function (n) {
                    return function (t) {
                        o[n] = this;
                        f[n] = 1 < arguments.length ? k.call(arguments) : t;
                        --e || r.resolveWith(o, f);
                    };
                };
            if (e <= 1 && (fu(n, r.done(s(t)).resolve, r.reject, !e), "pending" === r.state() || u(f[t] && f[t].then))) return r.then();
            while (t--) fu(f[t], s(t), r.reject);
            return r.promise();
        },
    });
    eu = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    i.Deferred.exceptionHook = function (t, i) {
        n.console && n.console.warn && t && eu.test(t.name) && n.console.warn("jQuery.Deferred exception: " + t.message, t.stack, i);
    };
    i.readyException = function (t) {
        n.setTimeout(function () {
            throw t;
        });
    };
    ei = i.Deferred();
    i.fn.ready = function (n) {
        return (
            ei.then(n)["catch"](function (n) {
                i.readyException(n);
            }),
            this
        );
    };
    i.extend({
        isReady: !1,
        readyWait: 1,
        ready: function (n) {
            (!0 === n ? --i.readyWait : i.isReady) || ((i.isReady = !0) !== n && 0 < --i.readyWait) || ei.resolveWith(f, [i]);
        },
    });
    i.ready.then = ei.then;
    "complete" === f.readyState || ("loading" !== f.readyState && !f.documentElement.doScroll) ? n.setTimeout(i.ready) : (f.addEventListener("DOMContentLoaded", oi), n.addEventListener("load", oi));
    var w = function (n, t, r, f, e, o, s) {
            var h = 0,
                l = n.length,
                c = null == r;
            if ("object" === ut(r)) for (h in ((e = !0), r)) w(n, t, h, r[h], !0, o, s);
            else if (
                void 0 !== f &&
                ((e = !0),
                u(f) || (s = !0),
                c &&
                    (s
                        ? (t.call(n, f), (t = null))
                        : ((c = t),
                          (t = function (n, t, r) {
                              return c.call(i(n), r);
                          }))),
                t)
            )
                for (; h < l; h++) t(n[h], r, s ? f : f.call(n[h], h, t(n[h], r)));
            return e ? n : c ? t.call(n) : l ? t(n[0], r) : o;
        },
        se = /^-ms-/,
        he = /-([a-z])/g;
    ot = function (n) {
        return 1 === n.nodeType || 9 === n.nodeType || !+n.nodeType;
    };
    bt.uid = 1;
    bt.prototype = {
        cache: function (n) {
            var t = n[this.expando];
            return t || ((t = {}), ot(n) && (n.nodeType ? (n[this.expando] = t) : Object.defineProperty(n, this.expando, { value: t, configurable: !0 }))), t;
        },
        set: function (n, t, i) {
            var r,
                u = this.cache(n);
            if ("string" == typeof t) u[y(t)] = i;
            else for (r in t) u[y(r)] = t[r];
            return u;
        },
        get: function (n, t) {
            return void 0 === t ? this.cache(n) : n[this.expando] && n[this.expando][y(t)];
        },
        access: function (n, t, i) {
            return void 0 === t || (t && "string" == typeof t && void 0 === i) ? this.get(n, t) : (this.set(n, t, i), void 0 !== i ? i : t);
        },
        remove: function (n, t) {
            var u,
                r = n[this.expando];
            if (void 0 !== r) {
                if (void 0 !== t) for (u = (t = Array.isArray(t) ? t.map(y) : ((t = y(t)) in r) ? [t] : t.match(l) || []).length; u--; ) delete r[t[u]];
                (void 0 === t || i.isEmptyObject(r)) && (n.nodeType ? (n[this.expando] = void 0) : delete n[this.expando]);
            }
        },
        hasData: function (n) {
            var t = n[this.expando];
            return void 0 !== t && !i.isEmptyObject(t);
        },
    };
    var r = new bt(),
        o = new bt(),
        le = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        ae = /[A-Z]/g;
    i.extend({
        hasData: function (n) {
            return o.hasData(n) || r.hasData(n);
        },
        data: function (n, t, i) {
            return o.access(n, t, i);
        },
        removeData: function (n, t) {
            o.remove(n, t);
        },
        _data: function (n, t, i) {
            return r.access(n, t, i);
        },
        _removeData: function (n, t) {
            r.remove(n, t);
        },
    });
    i.fn.extend({
        data: function (n, t) {
            var f,
                u,
                e,
                i = this[0],
                s = i && i.attributes;
            if (void 0 === n) {
                if (this.length && ((e = o.get(i)), 1 === i.nodeType && !r.get(i, "hasDataAttrs"))) {
                    for (f = s.length; f--; ) s[f] && 0 === (u = s[f].name).indexOf("data-") && ((u = y(u.slice(5))), ou(i, u, e[u]));
                    r.set(i, "hasDataAttrs", !0);
                }
                return e;
            }
            return "object" == typeof n
                ? this.each(function () {
                      o.set(this, n);
                  })
                : w(
                      this,
                      function (t) {
                          var r;
                          if (i && void 0 === t) return void 0 !== (r = o.get(i, n)) ? r : void 0 !== (r = ou(i, n)) ? r : void 0;
                          this.each(function () {
                              o.set(this, n, t);
                          });
                      },
                      null,
                      t,
                      1 < arguments.length,
                      null,
                      !0
                  );
        },
        removeData: function (n) {
            return this.each(function () {
                o.remove(this, n);
            });
        },
    });
    i.extend({
        queue: function (n, t, u) {
            var f;
            if (n) return (t = (t || "fx") + "queue"), (f = r.get(n, t)), u && (!f || Array.isArray(u) ? (f = r.access(n, t, i.makeArray(u))) : f.push(u)), f || [];
        },
        dequeue: function (n, t) {
            t = t || "fx";
            var r = i.queue(n, t),
                e = r.length,
                u = r.shift(),
                f = i._queueHooks(n, t);
            "inprogress" === u && ((u = r.shift()), e--);
            u &&
                ("fx" === t && r.unshift("inprogress"),
                delete f.stop,
                u.call(
                    n,
                    function () {
                        i.dequeue(n, t);
                    },
                    f
                ));
            !e && f && f.empty.fire();
        },
        _queueHooks: function (n, t) {
            var u = t + "queueHooks";
            return (
                r.get(n, u) ||
                r.access(n, u, {
                    empty: i.Callbacks("once memory").add(function () {
                        r.remove(n, [t + "queue", u]);
                    }),
                })
            );
        },
    });
    i.fn.extend({
        queue: function (n, t) {
            var r = 2;
            return (
                "string" != typeof n && ((t = n), (n = "fx"), r--),
                arguments.length < r
                    ? i.queue(this[0], n)
                    : void 0 === t
                    ? this
                    : this.each(function () {
                          var r = i.queue(this, n, t);
                          i._queueHooks(this, n);
                          "fx" === n && "inprogress" !== r[0] && i.dequeue(this, n);
                      })
            );
        },
        dequeue: function (n) {
            return this.each(function () {
                i.dequeue(this, n);
            });
        },
        clearQueue: function (n) {
            return this.queue(n || "fx", []);
        },
        promise: function (n, t) {
            var u,
                e = 1,
                o = i.Deferred(),
                f = this,
                s = this.length,
                h = function () {
                    --e || o.resolveWith(f, [f]);
                };
            for ("string" != typeof n && ((t = n), (n = void 0)), n = n || "fx"; s--; ) (u = r.get(f[s], n + "queueHooks")) && u.empty && (e++, u.empty.add(h));
            return h(), o.promise(t);
        },
    });
    var su = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        kt = new RegExp("^(?:([+-])=|)(" + su + ")([a-z%]*)$", "i"),
        b = ["Top", "Right", "Bottom", "Left"],
        g = f.documentElement,
        st = function (n) {
            return i.contains(n.ownerDocument, n);
        },
        ve = { composed: !0 };
    g.getRootNode &&
        (st = function (n) {
            return i.contains(n.ownerDocument, n) || n.getRootNode(ve) === n.ownerDocument;
        });
    dt = function (n, t) {
        return "none" === (n = t || n).style.display || ("" === n.style.display && st(n) && "none" === i.css(n, "display"));
    };
    ki = {};
    i.fn.extend({
        show: function () {
            return ht(this, !0);
        },
        hide: function () {
            return ht(this);
        },
        toggle: function (n) {
            return "boolean" == typeof n
                ? n
                    ? this.show()
                    : this.hide()
                : this.each(function () {
                      dt(this) ? i(this).show() : i(this).hide();
                  });
        },
    });
    var nt,
        si,
        gt = /^(?:checkbox|radio)$/i,
        cu = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
        lu = /^$|^module$|\/(?:java|ecma)script/i;
    nt = f.createDocumentFragment().appendChild(f.createElement("div"));
    (si = f.createElement("input")).setAttribute("type", "radio");
    si.setAttribute("checked", "checked");
    si.setAttribute("name", "t");
    nt.appendChild(si);
    e.checkClone = nt.cloneNode(!0).cloneNode(!0).lastChild.checked;
    nt.innerHTML = "<textarea>x</textarea>";
    e.noCloneChecked = !!nt.cloneNode(!0).lastChild.defaultValue;
    nt.innerHTML = "<option></option>";
    e.option = !!nt.lastChild;
    h = { thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };
    h.tbody = h.tfoot = h.colgroup = h.caption = h.thead;
    h.th = h.td;
    e.option || (h.optgroup = h.option = [1, "<select multiple='multiple'>", "</select>"]);
    au = /<|&#?\w+;/;
    var ye = /^key/,
        pe = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        yu = /^([^.]*)(?:\.(.+)|)/;
    i.event = {
        global: {},
        add: function (n, t, u, f, e) {
            var p,
                a,
                k,
                v,
                w,
                h,
                s,
                c,
                o,
                b,
                d,
                y = r.get(n);
            if (ot(n))
                for (
                    u.handler && ((u = (p = u).handler), (e = p.selector)),
                        e && i.find.matchesSelector(g, e),
                        u.guid || (u.guid = i.guid++),
                        (v = y.events) || (v = y.events = Object.create(null)),
                        (a = y.handle) ||
                            (a = y.handle = function (t) {
                                if ("undefined" != typeof i && i.event.triggered !== t.type) return i.event.dispatch.apply(n, arguments);
                            }),
                        w = (t = (t || "").match(l) || [""]).length;
                    w--;

                )
                    (o = d = (k = yu.exec(t[w]) || [])[1]),
                        (b = (k[2] || "").split(".").sort()),
                        o &&
                            ((s = i.event.special[o] || {}),
                            (o = (e ? s.delegateType : s.bindType) || o),
                            (s = i.event.special[o] || {}),
                            (h = i.extend({ type: o, origType: d, data: f, handler: u, guid: u.guid, selector: e, needsContext: e && i.expr.match.needsContext.test(e), namespace: b.join(".") }, p)),
                            (c = v[o]) || (((c = v[o] = []).delegateCount = 0), (s.setup && !1 !== s.setup.call(n, f, b, a)) || (n.addEventListener && n.addEventListener(o, a))),
                            s.add && (s.add.call(n, h), h.handler.guid || (h.handler.guid = u.guid)),
                            e ? c.splice(c.delegateCount++, 0, h) : c.push(h),
                            (i.event.global[o] = !0));
        },
        remove: function (n, t, u, f, e) {
            var y,
                k,
                c,
                v,
                p,
                s,
                h,
                a,
                o,
                b,
                d,
                w = r.hasData(n) && r.get(n);
            if (w && (v = w.events)) {
                for (p = (t = (t || "").match(l) || [""]).length; p--; )
                    if (((o = d = (c = yu.exec(t[p]) || [])[1]), (b = (c[2] || "").split(".").sort()), o)) {
                        for (h = i.event.special[o] || {}, a = v[(o = (f ? h.delegateType : h.bindType) || o)] || [], c = c[2] && new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)"), k = y = a.length; y--; )
                            (s = a[y]),
                                (!e && d !== s.origType) ||
                                    (u && u.guid !== s.guid) ||
                                    (c && !c.test(s.namespace)) ||
                                    (f && f !== s.selector && ("**" !== f || !s.selector)) ||
                                    (a.splice(y, 1), s.selector && a.delegateCount--, h.remove && h.remove.call(n, s));
                        k && !a.length && ((h.teardown && !1 !== h.teardown.call(n, b, w.handle)) || i.removeEvent(n, o, w.handle), delete v[o]);
                    } else for (o in v) i.event.remove(n, o + t[p], u, f, !0);
                i.isEmptyObject(v) && r.remove(n, "handle events");
            }
        },
        dispatch: function (n) {
            var u,
                h,
                c,
                e,
                f,
                l,
                s = new Array(arguments.length),
                t = i.event.fix(n),
                a = (r.get(this, "events") || Object.create(null))[t.type] || [],
                o = i.event.special[t.type] || {};
            for (s[0] = t, u = 1; u < arguments.length; u++) s[u] = arguments[u];
            if (((t.delegateTarget = this), !o.preDispatch || !1 !== o.preDispatch.call(this, t))) {
                for (l = i.event.handlers.call(this, t, a), u = 0; (e = l[u++]) && !t.isPropagationStopped(); )
                    for (t.currentTarget = e.elem, h = 0; (f = e.handlers[h++]) && !t.isImmediatePropagationStopped(); )
                        (t.rnamespace && !1 !== f.namespace && !t.rnamespace.test(f.namespace)) ||
                            ((t.handleObj = f), (t.data = f.data), void 0 !== (c = ((i.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, s)) && !1 === (t.result = c) && (t.preventDefault(), t.stopPropagation()));
                return o.postDispatch && o.postDispatch.call(this, t), t.result;
            }
        },
        handlers: function (n, t) {
            var f,
                h,
                u,
                e,
                o,
                c = [],
                s = t.delegateCount,
                r = n.target;
            if (s && r.nodeType && !("click" === n.type && 1 <= n.button))
                for (; r !== this; r = r.parentNode || this)
                    if (1 === r.nodeType && ("click" !== n.type || !0 !== r.disabled)) {
                        for (e = [], o = {}, f = 0; f < s; f++) void 0 === o[(u = (h = t[f]).selector + " ")] && (o[u] = h.needsContext ? -1 < i(u, this).index(r) : i.find(u, this, null, [r]).length), o[u] && e.push(h);
                        e.length && c.push({ elem: r, handlers: e });
                    }
            return (r = this), s < t.length && c.push({ elem: r, handlers: t.slice(s) }), c;
        },
        addProp: function (n, t) {
            Object.defineProperty(i.Event.prototype, n, {
                enumerable: !0,
                configurable: !0,
                get: u(t)
                    ? function () {
                          if (this.originalEvent) return t(this.originalEvent);
                      }
                    : function () {
                          if (this.originalEvent) return this.originalEvent[n];
                      },
                set: function (t) {
                    Object.defineProperty(this, n, { enumerable: !0, configurable: !0, writable: !0, value: t });
                },
            });
        },
        fix: function (n) {
            return n[i.expando] ? n : new i.Event(n);
        },
        special: {
            load: { noBubble: !0 },
            click: {
                setup: function (n) {
                    var t = this || n;
                    return gt.test(t.type) && t.click && c(t, "input") && hi(t, "click", ct), !1;
                },
                trigger: function (n) {
                    var t = this || n;
                    return gt.test(t.type) && t.click && c(t, "input") && hi(t, "click"), !0;
                },
                _default: function (n) {
                    var t = n.target;
                    return (gt.test(t.type) && t.click && c(t, "input") && r.get(t, "click")) || c(t, "a");
                },
            },
            beforeunload: {
                postDispatch: function (n) {
                    void 0 !== n.result && n.originalEvent && (n.originalEvent.returnValue = n.result);
                },
            },
        },
    };
    i.removeEvent = function (n, t, i) {
        n.removeEventListener && n.removeEventListener(t, i);
    };
    i.Event = function (n, t) {
        if (!(this instanceof i.Event)) return new i.Event(n, t);
        n && n.type
            ? ((this.originalEvent = n),
              (this.type = n.type),
              (this.isDefaultPrevented = n.defaultPrevented || (void 0 === n.defaultPrevented && !1 === n.returnValue) ? ct : lt),
              (this.target = n.target && 3 === n.target.nodeType ? n.target.parentNode : n.target),
              (this.currentTarget = n.currentTarget),
              (this.relatedTarget = n.relatedTarget))
            : (this.type = n);
        t && i.extend(this, t);
        this.timeStamp = (n && n.timeStamp) || Date.now();
        this[i.expando] = !0;
    };
    i.Event.prototype = {
        constructor: i.Event,
        isDefaultPrevented: lt,
        isPropagationStopped: lt,
        isImmediatePropagationStopped: lt,
        isSimulated: !1,
        preventDefault: function () {
            var n = this.originalEvent;
            this.isDefaultPrevented = ct;
            n && !this.isSimulated && n.preventDefault();
        },
        stopPropagation: function () {
            var n = this.originalEvent;
            this.isPropagationStopped = ct;
            n && !this.isSimulated && n.stopPropagation();
        },
        stopImmediatePropagation: function () {
            var n = this.originalEvent;
            this.isImmediatePropagationStopped = ct;
            n && !this.isSimulated && n.stopImmediatePropagation();
            this.stopPropagation();
        },
    };
    i.each(
        {
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            char: !0,
            code: !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: function (n) {
                var t = n.button;
                return null == n.which && ye.test(n.type) ? (null != n.charCode ? n.charCode : n.keyCode) : !n.which && void 0 !== t && pe.test(n.type) ? (1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0) : n.which;
            },
        },
        i.event.addProp
    );
    i.each({ focus: "focusin", blur: "focusout" }, function (n, t) {
        i.event.special[n] = {
            setup: function () {
                return hi(this, n, we), !1;
            },
            trigger: function () {
                return hi(this, n), !0;
            },
            delegateType: t,
        };
    });
    i.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (n, t) {
        i.event.special[n] = {
            delegateType: t,
            bindType: t,
            handle: function (n) {
                var u,
                    r = n.relatedTarget,
                    f = n.handleObj;
                return (r && (r === this || i.contains(this, r))) || ((n.type = f.origType), (u = f.handler.apply(this, arguments)), (n.type = t)), u;
            },
        };
    });
    i.fn.extend({
        on: function (n, t, i, r) {
            return gi(this, n, t, i, r);
        },
        one: function (n, t, i, r) {
            return gi(this, n, t, i, r, 1);
        },
        off: function (n, t, r) {
            var u, f;
            if (n && n.preventDefault && n.handleObj) return (u = n.handleObj), i(n.delegateTarget).off(u.namespace ? u.origType + "." + u.namespace : u.origType, u.selector, u.handler), this;
            if ("object" == typeof n) {
                for (f in n) this.off(f, t, n[f]);
                return this;
            }
            return (
                (!1 !== t && "function" != typeof t) || ((r = t), (t = void 0)),
                !1 === r && (r = lt),
                this.each(function () {
                    i.event.remove(this, n, r, t);
                })
            );
        },
    });
    var be = /<script|<style|<link/i,
        ke = /checked\s*(?:[^=]|=\s*.checked.)/i,
        de = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    i.extend({
        htmlPrefilter: function (n) {
            return n;
        },
        clone: function (n, t, r) {
            var u,
                c,
                o,
                f,
                l,
                a,
                v,
                h = n.cloneNode(!0),
                y = st(n);
            if (!(e.noCloneChecked || (1 !== n.nodeType && 11 !== n.nodeType) || i.isXMLDoc(n)))
                for (f = s(h), u = 0, c = (o = s(n)).length; u < c; u++)
                    (l = o[u]), (a = f[u]), void 0, "input" === (v = a.nodeName.toLowerCase()) && gt.test(l.type) ? (a.checked = l.checked) : ("input" !== v && "textarea" !== v) || (a.defaultValue = l.defaultValue);
            if (t)
                if (r) for (o = o || s(n), f = f || s(h), u = 0, c = o.length; u < c; u++) wu(o[u], f[u]);
                else wu(n, h);
            return 0 < (f = s(h, "script")).length && di(f, !y && s(n, "script")), h;
        },
        cleanData: function (n) {
            for (var u, t, f, s = i.event.special, e = 0; void 0 !== (t = n[e]); e++)
                if (ot(t)) {
                    if ((u = t[r.expando])) {
                        if (u.events) for (f in u.events) s[f] ? i.event.remove(t, f) : i.removeEvent(t, f, u.handle);
                        t[r.expando] = void 0;
                    }
                    t[o.expando] && (t[o.expando] = void 0);
                }
        },
    });
    i.fn.extend({
        detach: function (n) {
            return bu(this, n, !0);
        },
        remove: function (n) {
            return bu(this, n);
        },
        text: function (n) {
            return w(
                this,
                function (n) {
                    return void 0 === n
                        ? i.text(this)
                        : this.empty().each(function () {
                              (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || (this.textContent = n);
                          });
                },
                null,
                n,
                arguments.length
            );
        },
        append: function () {
            return at(this, arguments, function (n) {
                (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || pu(this, n).appendChild(n);
            });
        },
        prepend: function () {
            return at(this, arguments, function (n) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = pu(this, n);
                    t.insertBefore(n, t.firstChild);
                }
            });
        },
        before: function () {
            return at(this, arguments, function (n) {
                this.parentNode && this.parentNode.insertBefore(n, this);
            });
        },
        after: function () {
            return at(this, arguments, function (n) {
                this.parentNode && this.parentNode.insertBefore(n, this.nextSibling);
            });
        },
        empty: function () {
            for (var n, t = 0; null != (n = this[t]); t++) 1 === n.nodeType && (i.cleanData(s(n, !1)), (n.textContent = ""));
            return this;
        },
        clone: function (n, t) {
            return (
                (n = null != n && n),
                (t = null == t ? n : t),
                this.map(function () {
                    return i.clone(this, n, t);
                })
            );
        },
        html: function (n) {
            return w(
                this,
                function (n) {
                    var t = this[0] || {},
                        r = 0,
                        u = this.length;
                    if (void 0 === n && 1 === t.nodeType) return t.innerHTML;
                    if ("string" == typeof n && !be.test(n) && !h[(cu.exec(n) || ["", ""])[1].toLowerCase()]) {
                        n = i.htmlPrefilter(n);
                        try {
                            for (; r < u; r++) 1 === (t = this[r] || {}).nodeType && (i.cleanData(s(t, !1)), (t.innerHTML = n));
                            t = 0;
                        } catch (n) {}
                    }
                    t && this.empty().append(n);
                },
                null,
                n,
                arguments.length
            );
        },
        replaceWith: function () {
            var n = [];
            return at(
                this,
                arguments,
                function (t) {
                    var r = this.parentNode;
                    i.inArray(this, n) < 0 && (i.cleanData(s(this)), r && r.replaceChild(t, this));
                },
                n
            );
        },
    });
    i.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (n, t) {
        i.fn[n] = function (n) {
            for (var u, f = [], e = i(n), o = e.length - 1, r = 0; r <= o; r++) (u = r === o ? this : this.clone(!0)), i(e[r])[t](u), yi.apply(f, u.get());
            return this.pushStack(f);
        };
    });
    var nr = new RegExp("^(" + su + ")(?!px)[a-z%]+$", "i"),
        ci = function (t) {
            var i = t.ownerDocument.defaultView;
            return (i && i.opener) || (i = n), i.getComputedStyle(t);
        },
        ku = function (n, t, i) {
            var u,
                r,
                f = {};
            for (r in t) (f[r] = n.style[r]), (n.style[r] = t[r]);
            for (r in ((u = i.call(n)), t)) n.style[r] = f[r];
            return u;
        },
        to = new RegExp(b.join("|"), "i");
    !(function () {
        function r() {
            if (t) {
                s.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0";
                t.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%";
                g.appendChild(s).appendChild(t);
                var i = n.getComputedStyle(t);
                h = "1%" !== i.top;
                v = 12 === u(i.marginLeft);
                t.style.right = "60%";
                a = 36 === u(i.right);
                c = 36 === u(i.width);
                t.style.position = "absolute";
                l = 12 === u(t.offsetWidth / 3);
                g.removeChild(s);
                t = null;
            }
        }
        function u(n) {
            return Math.round(parseFloat(n));
        }
        var h,
            c,
            l,
            a,
            o,
            v,
            s = f.createElement("div"),
            t = f.createElement("div");
        t.style &&
            ((t.style.backgroundClip = "content-box"),
            (t.cloneNode(!0).style.backgroundClip = ""),
            (e.clearCloneStyle = "content-box" === t.style.backgroundClip),
            i.extend(e, {
                boxSizingReliable: function () {
                    return r(), c;
                },
                pixelBoxStyles: function () {
                    return r(), a;
                },
                pixelPosition: function () {
                    return r(), h;
                },
                reliableMarginLeft: function () {
                    return r(), v;
                },
                scrollboxSize: function () {
                    return r(), l;
                },
                reliableTrDimensions: function () {
                    var t, i, r, u;
                    return (
                        null == o &&
                            ((t = f.createElement("table")),
                            (i = f.createElement("tr")),
                            (r = f.createElement("div")),
                            (t.style.cssText = "position:absolute;left:-11111px"),
                            (i.style.height = "1px"),
                            (r.style.height = "9px"),
                            g.appendChild(t).appendChild(i).appendChild(r),
                            (u = n.getComputedStyle(i)),
                            (o = 3 < parseInt(u.height)),
                            g.removeChild(t)),
                        o
                    );
                },
            }));
    })();
    var gu = ["Webkit", "Moz", "ms"],
        nf = f.createElement("div").style,
        tf = {};
    var io = /^(none|table(?!-c[ea]).+)/,
        rf = /^--/,
        ro = { position: "absolute", visibility: "hidden", display: "block" },
        uf = { letterSpacing: "0", fontWeight: "400" };
    i.extend({
        cssHooks: {
            opacity: {
                get: function (n, t) {
                    if (t) {
                        var i = ni(n, "opacity");
                        return "" === i ? "1" : i;
                    }
                },
            },
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
        },
        cssProps: {},
        style: function (n, t, r, u) {
            if (n && 3 !== n.nodeType && 8 !== n.nodeType && n.style) {
                var f,
                    h,
                    o,
                    c = y(t),
                    l = rf.test(t),
                    s = n.style;
                if ((l || (t = tr(c)), (o = i.cssHooks[t] || i.cssHooks[c]), void 0 === r)) return o && "get" in o && void 0 !== (f = o.get(n, !1, u)) ? f : s[t];
                "string" == (h = typeof r) && (f = kt.exec(r)) && f[1] && ((r = hu(n, t, f)), (h = "number"));
                null != r &&
                    r == r &&
                    ("number" !== h || l || (r += (f && f[3]) || (i.cssNumber[c] ? "" : "px")),
                    e.clearCloneStyle || "" !== r || 0 !== t.indexOf("background") || (s[t] = "inherit"),
                    (o && "set" in o && void 0 === (r = o.set(n, r, u))) || (l ? s.setProperty(t, r) : (s[t] = r)));
            }
        },
        css: function (n, t, r, u) {
            var f,
                e,
                o,
                s = y(t);
            return (
                rf.test(t) || (t = tr(s)),
                (o = i.cssHooks[t] || i.cssHooks[s]) && "get" in o && (f = o.get(n, !0, r)),
                void 0 === f && (f = ni(n, t, u)),
                "normal" === f && t in uf && (f = uf[t]),
                "" === r || r ? ((e = parseFloat(f)), !0 === r || isFinite(e) ? e || 0 : f) : f
            );
        },
    });
    i.each(["height", "width"], function (n, t) {
        i.cssHooks[t] = {
            get: function (n, r, u) {
                if (r)
                    return !io.test(i.css(n, "display")) || (n.getClientRects().length && n.getBoundingClientRect().width)
                        ? ef(n, t, u)
                        : ku(n, ro, function () {
                              return ef(n, t, u);
                          });
            },
            set: function (n, r, u) {
                var s,
                    f = ci(n),
                    h = !e.scrollboxSize() && "absolute" === f.position,
                    c = (h || u) && "border-box" === i.css(n, "boxSizing", !1, f),
                    o = u ? ir(n, t, u, c, f) : 0;
                return (
                    c && h && (o -= Math.ceil(n["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(f[t]) - ir(n, t, "border", !1, f) - 0.5)),
                    o && (s = kt.exec(r)) && "px" !== (s[3] || "px") && ((n.style[t] = r), (r = i.css(n, t))),
                    ff(0, r, o)
                );
            },
        };
    });
    i.cssHooks.marginLeft = du(e.reliableMarginLeft, function (n, t) {
        if (t)
            return (
                (parseFloat(ni(n, "marginLeft")) ||
                    n.getBoundingClientRect().left -
                        ku(n, { marginLeft: 0 }, function () {
                            return n.getBoundingClientRect().left;
                        })) + "px"
            );
    });
    i.each({ margin: "", padding: "", border: "Width" }, function (n, t) {
        i.cssHooks[n + t] = {
            expand: function (i) {
                for (var r = 0, f = {}, u = "string" == typeof i ? i.split(" ") : [i]; r < 4; r++) f[n + b[r] + t] = u[r] || u[r - 2] || u[0];
                return f;
            },
        };
        "margin" !== n && (i.cssHooks[n + t].set = ff);
    });
    i.fn.extend({
        css: function (n, t) {
            return w(
                this,
                function (n, t, r) {
                    var f,
                        e,
                        o = {},
                        u = 0;
                    if (Array.isArray(t)) {
                        for (f = ci(n), e = t.length; u < e; u++) o[t[u]] = i.css(n, t[u], !1, f);
                        return o;
                    }
                    return void 0 !== r ? i.style(n, t, r) : i.css(n, t);
                },
                n,
                t,
                1 < arguments.length
            );
        },
    });
    ((i.Tween = a).prototype = {
        constructor: a,
        init: function (n, t, r, u, f, e) {
            this.elem = n;
            this.prop = r;
            this.easing = f || i.easing._default;
            this.options = t;
            this.start = this.now = this.cur();
            this.end = u;
            this.unit = e || (i.cssNumber[r] ? "" : "px");
        },
        cur: function () {
            var n = a.propHooks[this.prop];
            return n && n.get ? n.get(this) : a.propHooks._default.get(this);
        },
        run: function (n) {
            var t,
                r = a.propHooks[this.prop];
            return (
                (this.pos = this.options.duration ? (t = i.easing[this.easing](n, this.options.duration * n, 0, 1, this.options.duration)) : (t = n)),
                (this.now = (this.end - this.start) * t + this.start),
                this.options.step && this.options.step.call(this.elem, this.now, this),
                r && r.set ? r.set(this) : a.propHooks._default.set(this),
                this
            );
        },
    }).init.prototype = a.prototype;
    (a.propHooks = {
        _default: {
            get: function (n) {
                var t;
                return 1 !== n.elem.nodeType || (null != n.elem[n.prop] && null == n.elem.style[n.prop]) ? n.elem[n.prop] : (t = i.css(n.elem, n.prop, "")) && "auto" !== t ? t : 0;
            },
            set: function (n) {
                i.fx.step[n.prop] ? i.fx.step[n.prop](n) : 1 !== n.elem.nodeType || (!i.cssHooks[n.prop] && null == n.elem.style[tr(n.prop)]) ? (n.elem[n.prop] = n.now) : i.style(n.elem, n.prop, n.now + n.unit);
            },
        },
    }).scrollTop = a.propHooks.scrollLeft = {
        set: function (n) {
            n.elem.nodeType && n.elem.parentNode && (n.elem[n.prop] = n.now);
        },
    };
    i.easing = {
        linear: function (n) {
            return n;
        },
        swing: function (n) {
            return 0.5 - Math.cos(n * Math.PI) / 2;
        },
        _default: "swing",
    };
    i.fx = a.prototype.init;
    i.fx.step = {};
    sf = /^(?:toggle|show|hide)$/;
    hf = /queueHooks$/;
    i.Animation = i.extend(v, {
        tweeners: {
            "*": [
                function (n, t) {
                    var i = this.createTween(n, t);
                    return hu(i.elem, n, kt.exec(t), i), i;
                },
            ],
        },
        tweener: function (n, t) {
            u(n) ? ((t = n), (n = ["*"])) : (n = n.match(l));
            for (var i, r = 0, f = n.length; r < f; r++) (i = n[r]), (v.tweeners[i] = v.tweeners[i] || []), v.tweeners[i].unshift(t);
        },
        prefilters: [
            function (n, t, u) {
                var f,
                    y,
                    w,
                    c,
                    b,
                    h,
                    o,
                    l,
                    k = "width" in t || "height" in t,
                    v = this,
                    p = {},
                    s = n.style,
                    a = n.nodeType && dt(n),
                    e = r.get(n, "fxshow");
                for (f in (u.queue ||
                    (null == (c = i._queueHooks(n, "fx")).unqueued &&
                        ((c.unqueued = 0),
                        (b = c.empty.fire),
                        (c.empty.fire = function () {
                            c.unqueued || b();
                        })),
                    c.unqueued++,
                    v.always(function () {
                        v.always(function () {
                            c.unqueued--;
                            i.queue(n, "fx").length || c.empty.fire();
                        });
                    })),
                t))
                    if (((y = t[f]), sf.test(y))) {
                        if ((delete t[f], (w = w || "toggle" === y), y === (a ? "hide" : "show"))) {
                            if ("show" !== y || !e || void 0 === e[f]) continue;
                            a = !0;
                        }
                        p[f] = (e && e[f]) || i.style(n, f);
                    }
                if ((h = !i.isEmptyObject(t)) || !i.isEmptyObject(p))
                    for (f in (k &&
                        1 === n.nodeType &&
                        ((u.overflow = [s.overflow, s.overflowX, s.overflowY]),
                        null == (o = e && e.display) && (o = r.get(n, "display")),
                        "none" === (l = i.css(n, "display")) && (o ? (l = o) : (ht([n], !0), (o = n.style.display || o), (l = i.css(n, "display")), ht([n]))),
                        ("inline" === l || ("inline-block" === l && null != o)) &&
                            "none" === i.css(n, "float") &&
                            (h ||
                                (v.done(function () {
                                    s.display = o;
                                }),
                                null == o && ((l = s.display), (o = "none" === l ? "" : l))),
                            (s.display = "inline-block"))),
                    u.overflow &&
                        ((s.overflow = "hidden"),
                        v.always(function () {
                            s.overflow = u.overflow[0];
                            s.overflowX = u.overflow[1];
                            s.overflowY = u.overflow[2];
                        })),
                    (h = !1),
                    p))
                        h ||
                            (e ? "hidden" in e && (a = e.hidden) : (e = r.access(n, "fxshow", { display: o })),
                            w && (e.hidden = !a),
                            a && ht([n], !0),
                            v.done(function () {
                                for (f in (a || ht([n]), r.remove(n, "fxshow"), p)) i.style(n, f, p[f]);
                            })),
                            (h = lf(a ? e[f] : 0, f, v)),
                            f in e || ((e[f] = h.start), a && ((h.end = h.start), (h.start = 0)));
            },
        ],
        prefilter: function (n, t) {
            t ? v.prefilters.unshift(n) : v.prefilters.push(n);
        },
    });
    i.speed = function (n, t, r) {
        var f = n && "object" == typeof n ? i.extend({}, n) : { complete: r || (!r && t) || (u(n) && n), duration: n, easing: (r && t) || (t && !u(t) && t) };
        return (
            i.fx.off ? (f.duration = 0) : "number" != typeof f.duration && (f.duration = f.duration in i.fx.speeds ? i.fx.speeds[f.duration] : i.fx.speeds._default),
            (null != f.queue && !0 !== f.queue) || (f.queue = "fx"),
            (f.old = f.complete),
            (f.complete = function () {
                u(f.old) && f.old.call(this);
                f.queue && i.dequeue(this, f.queue);
            }),
            f
        );
    };
    i.fn.extend({
        fadeTo: function (n, t, i, r) {
            return this.filter(dt).css("opacity", 0).show().end().animate({ opacity: t }, n, i, r);
        },
        animate: function (n, t, u, f) {
            var s = i.isEmptyObject(n),
                o = i.speed(t, u, f),
                e = function () {
                    var t = v(this, i.extend({}, n), o);
                    (s || r.get(this, "finish")) && t.stop(!0);
                };
            return (e.finish = e), s || !1 === o.queue ? this.each(e) : this.queue(o.queue, e);
        },
        stop: function (n, t, u) {
            var f = function (n) {
                var t = n.stop;
                delete n.stop;
                t(u);
            };
            return (
                "string" != typeof n && ((u = t), (t = n), (n = void 0)),
                t && this.queue(n || "fx", []),
                this.each(function () {
                    var s = !0,
                        t = null != n && n + "queueHooks",
                        o = i.timers,
                        e = r.get(this);
                    if (t) e[t] && e[t].stop && f(e[t]);
                    else for (t in e) e[t] && e[t].stop && hf.test(t) && f(e[t]);
                    for (t = o.length; t--; ) o[t].elem !== this || (null != n && o[t].queue !== n) || (o[t].anim.stop(u), (s = !1), o.splice(t, 1));
                    (!s && u) || i.dequeue(this, n);
                })
            );
        },
        finish: function (n) {
            return (
                !1 !== n && (n = n || "fx"),
                this.each(function () {
                    var t,
                        e = r.get(this),
                        u = e[n + "queue"],
                        o = e[n + "queueHooks"],
                        f = i.timers,
                        s = u ? u.length : 0;
                    for (e.finish = !0, i.queue(this, n, []), o && o.stop && o.stop.call(this, !0), t = f.length; t--; ) f[t].elem === this && f[t].queue === n && (f[t].anim.stop(!0), f.splice(t, 1));
                    for (t = 0; t < s; t++) u[t] && u[t].finish && u[t].finish.call(this);
                    delete e.finish;
                })
            );
        },
    });
    i.each(["toggle", "show", "hide"], function (n, t) {
        var r = i.fn[t];
        i.fn[t] = function (n, i, u) {
            return null == n || "boolean" == typeof n ? r.apply(this, arguments) : this.animate(ai(t, !0), n, i, u);
        };
    });
    i.each({ slideDown: ai("show"), slideUp: ai("hide"), slideToggle: ai("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (n, t) {
        i.fn[n] = function (n, i, r) {
            return this.animate(t, n, i, r);
        };
    });
    i.timers = [];
    i.fx.tick = function () {
        var r,
            n = 0,
            t = i.timers;
        for (vt = Date.now(); n < t.length; n++) (r = t[n])() || t[n] !== r || t.splice(n--, 1);
        t.length || i.fx.stop();
        vt = void 0;
    };
    i.fx.timer = function (n) {
        i.timers.push(n);
        i.fx.start();
    };
    i.fx.interval = 13;
    i.fx.start = function () {
        li || ((li = !0), rr());
    };
    i.fx.stop = function () {
        li = null;
    };
    i.fx.speeds = { slow: 600, fast: 200, _default: 400 };
    i.fn.delay = function (t, r) {
        return (
            (t = (i.fx && i.fx.speeds[t]) || t),
            (r = r || "fx"),
            this.queue(r, function (i, r) {
                var u = n.setTimeout(i, t);
                r.stop = function () {
                    n.clearTimeout(u);
                };
            })
        );
    };
    yt = f.createElement("input");
    of = f.createElement("select").appendChild(f.createElement("option"));
    yt.type = "checkbox";
    e.checkOn = "" !== yt.value;
    e.optSelected = of.selected;
    (yt = f.createElement("input")).value = "t";
    yt.type = "radio";
    e.radioValue = "t" === yt.value;
    pt = i.expr.attrHandle;
    i.fn.extend({
        attr: function (n, t) {
            return w(this, i.attr, n, t, 1 < arguments.length);
        },
        removeAttr: function (n) {
            return this.each(function () {
                i.removeAttr(this, n);
            });
        },
    });
    i.extend({
        attr: function (n, t, r) {
            var f,
                u,
                e = n.nodeType;
            if (3 !== e && 8 !== e && 2 !== e)
                return "undefined" == typeof n.getAttribute
                    ? i.prop(n, t, r)
                    : ((1 === e && i.isXMLDoc(n)) || (u = i.attrHooks[t.toLowerCase()] || (i.expr.match.bool.test(t) ? af : void 0)),
                      void 0 !== r
                          ? null === r
                              ? void i.removeAttr(n, t)
                              : u && "set" in u && void 0 !== (f = u.set(n, r, t))
                              ? f
                              : (n.setAttribute(t, r + ""), r)
                          : u && "get" in u && null !== (f = u.get(n, t))
                          ? f
                          : null == (f = i.find.attr(n, t))
                          ? void 0
                          : f);
        },
        attrHooks: {
            type: {
                set: function (n, t) {
                    if (!e.radioValue && "radio" === t && c(n, "input")) {
                        var i = n.value;
                        return n.setAttribute("type", t), i && (n.value = i), t;
                    }
                },
            },
        },
        removeAttr: function (n, t) {
            var i,
                u = 0,
                r = t && t.match(l);
            if (r && 1 === n.nodeType) while ((i = r[u++])) n.removeAttribute(i);
        },
    });
    af = {
        set: function (n, t, r) {
            return !1 === t ? i.removeAttr(n, r) : n.setAttribute(r, r), r;
        },
    };
    i.each(i.expr.match.bool.source.match(/\w+/g), function (n, t) {
        var r = pt[t] || i.find.attr;
        pt[t] = function (n, t, i) {
            var f,
                e,
                u = t.toLowerCase();
            return i || ((e = pt[u]), (pt[u] = f), (f = null != r(n, t, i) ? u : null), (pt[u] = e)), f;
        };
    });
    vf = /^(?:input|select|textarea|button)$/i;
    yf = /^(?:a|area)$/i;
    i.fn.extend({
        prop: function (n, t) {
            return w(this, i.prop, n, t, 1 < arguments.length);
        },
        removeProp: function (n) {
            return this.each(function () {
                delete this[i.propFix[n] || n];
            });
        },
    });
    i.extend({
        prop: function (n, t, r) {
            var f,
                u,
                e = n.nodeType;
            if (3 !== e && 8 !== e && 2 !== e)
                return (
                    (1 === e && i.isXMLDoc(n)) || ((t = i.propFix[t] || t), (u = i.propHooks[t])),
                    void 0 !== r ? (u && "set" in u && void 0 !== (f = u.set(n, r, t)) ? f : (n[t] = r)) : u && "get" in u && null !== (f = u.get(n, t)) ? f : n[t]
                );
        },
        propHooks: {
            tabIndex: {
                get: function (n) {
                    var t = i.find.attr(n, "tabindex");
                    return t ? parseInt(t, 10) : vf.test(n.nodeName) || (yf.test(n.nodeName) && n.href) ? 0 : -1;
                },
            },
        },
        propFix: { for: "htmlFor", class: "className" },
    });
    e.optSelected ||
        (i.propHooks.selected = {
            get: function (n) {
                var t = n.parentNode;
                return t && t.parentNode && t.parentNode.selectedIndex, null;
            },
            set: function (n) {
                var t = n.parentNode;
                t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
            },
        });
    i.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        i.propFix[this.toLowerCase()] = this;
    });
    i.fn.extend({
        addClass: function (n) {
            var o,
                t,
                r,
                f,
                e,
                s,
                h,
                c = 0;
            if (u(n))
                return this.each(function (t) {
                    i(this).addClass(n.call(this, t, it(this)));
                });
            if ((o = ur(n)).length)
                while ((t = this[c++]))
                    if (((f = it(t)), (r = 1 === t.nodeType && " " + tt(f) + " "))) {
                        for (s = 0; (e = o[s++]); ) r.indexOf(" " + e + " ") < 0 && (r += e + " ");
                        f !== (h = tt(r)) && t.setAttribute("class", h);
                    }
            return this;
        },
        removeClass: function (n) {
            var o,
                r,
                t,
                f,
                e,
                s,
                h,
                c = 0;
            if (u(n))
                return this.each(function (t) {
                    i(this).removeClass(n.call(this, t, it(this)));
                });
            if (!arguments.length) return this.attr("class", "");
            if ((o = ur(n)).length)
                while ((r = this[c++]))
                    if (((f = it(r)), (t = 1 === r.nodeType && " " + tt(f) + " "))) {
                        for (s = 0; (e = o[s++]); ) while (-1 < t.indexOf(" " + e + " ")) t = t.replace(" " + e + " ", " ");
                        f !== (h = tt(t)) && r.setAttribute("class", h);
                    }
            return this;
        },
        toggleClass: function (n, t) {
            var f = typeof n,
                e = "string" === f || Array.isArray(n);
            return "boolean" == typeof t && e
                ? t
                    ? this.addClass(n)
                    : this.removeClass(n)
                : u(n)
                ? this.each(function (r) {
                      i(this).toggleClass(n.call(this, r, it(this), t), t);
                  })
                : this.each(function () {
                      var t, o, u, s;
                      if (e) for (o = 0, u = i(this), s = ur(n); (t = s[o++]); ) u.hasClass(t) ? u.removeClass(t) : u.addClass(t);
                      else (void 0 !== n && "boolean" !== f) || ((t = it(this)) && r.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === n ? "" : r.get(this, "__className__") || ""));
                  });
        },
        hasClass: function (n) {
            for (var t, r = 0, i = " " + n + " "; (t = this[r++]); ) if (1 === t.nodeType && -1 < (" " + tt(it(t)) + " ").indexOf(i)) return !0;
            return !1;
        },
    });
    pf = /\r/g;
    i.fn.extend({
        val: function (n) {
            var t,
                r,
                e,
                f = this[0];
            return arguments.length
                ? ((e = u(n)),
                  this.each(function (r) {
                      var u;
                      1 === this.nodeType &&
                          (null == (u = e ? n.call(this, r, i(this).val()) : n)
                              ? (u = "")
                              : "number" == typeof u
                              ? (u += "")
                              : Array.isArray(u) &&
                                (u = i.map(u, function (n) {
                                    return null == n ? "" : n + "";
                                })),
                          ((t = i.valHooks[this.type] || i.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, u, "value")) || (this.value = u));
                  }))
                : f
                ? (t = i.valHooks[f.type] || i.valHooks[f.nodeName.toLowerCase()]) && "get" in t && void 0 !== (r = t.get(f, "value"))
                    ? r
                    : "string" == typeof (r = f.value)
                    ? r.replace(pf, "")
                    : null == r
                    ? ""
                    : r
                : void 0;
        },
    });
    i.extend({
        valHooks: {
            option: {
                get: function (n) {
                    var t = i.find.attr(n, "value");
                    return null != t ? t : tt(i.text(n));
                },
            },
            select: {
                get: function (n) {
                    for (var e, t, o = n.options, u = n.selectedIndex, f = "select-one" === n.type, s = f ? null : [], h = f ? u + 1 : o.length, r = u < 0 ? h : f ? u : 0; r < h; r++)
                        if (((t = o[r]).selected || r === u) && !t.disabled && (!t.parentNode.disabled || !c(t.parentNode, "optgroup"))) {
                            if (((e = i(t).val()), f)) return e;
                            s.push(e);
                        }
                    return s;
                },
                set: function (n, t) {
                    for (var r, u, f = n.options, e = i.makeArray(t), o = f.length; o--; ) ((u = f[o]).selected = -1 < i.inArray(i.valHooks.option.get(u), e)) && (r = !0);
                    return r || (n.selectedIndex = -1), e;
                },
            },
        },
    });
    i.each(["radio", "checkbox"], function () {
        i.valHooks[this] = {
            set: function (n, t) {
                if (Array.isArray(t)) return (n.checked = -1 < i.inArray(i(n).val(), t));
            },
        };
        e.checkOn ||
            (i.valHooks[this].get = function (n) {
                return null === n.getAttribute("value") ? "on" : n.value;
            });
    });
    e.focusin = "onfocusin" in n;
    fr = /^(?:focusinfocus|focusoutblur)$/;
    er = function (n) {
        n.stopPropagation();
    };
    i.extend(i.event, {
        trigger: function (t, e, o, s) {
            var k,
                c,
                l,
                d,
                v,
                y,
                a,
                p,
                w = [o || f],
                h = ui.call(t, "type") ? t.type : t,
                b = ui.call(t, "namespace") ? t.namespace.split(".") : [];
            if (
                ((c = p = l = o = o || f),
                3 !== o.nodeType &&
                    8 !== o.nodeType &&
                    !fr.test(h + i.event.triggered) &&
                    (-1 < h.indexOf(".") && ((h = (b = h.split(".")).shift()), b.sort()),
                    (v = h.indexOf(":") < 0 && "on" + h),
                    ((t = t[i.expando] ? t : new i.Event(h, "object" == typeof t && t)).isTrigger = s ? 2 : 3),
                    (t.namespace = b.join(".")),
                    (t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)") : null),
                    (t.result = void 0),
                    t.target || (t.target = o),
                    (e = null == e ? [t] : i.makeArray(e, [t])),
                    (a = i.event.special[h] || {}),
                    s || !a.trigger || !1 !== a.trigger.apply(o, e)))
            ) {
                if (!s && !a.noBubble && !rt(o)) {
                    for (d = a.delegateType || h, fr.test(d + h) || (c = c.parentNode); c; c = c.parentNode) w.push(c), (l = c);
                    l === (o.ownerDocument || f) && w.push(l.defaultView || l.parentWindow || n);
                }
                for (k = 0; (c = w[k++]) && !t.isPropagationStopped(); )
                    (p = c),
                        (t.type = 1 < k ? d : a.bindType || h),
                        (y = (r.get(c, "events") || Object.create(null))[t.type] && r.get(c, "handle")) && y.apply(c, e),
                        (y = v && c[v]) && y.apply && ot(c) && ((t.result = y.apply(c, e)), !1 === t.result && t.preventDefault());
                return (
                    (t.type = h),
                    s ||
                        t.isDefaultPrevented() ||
                        (a._default && !1 !== a._default.apply(w.pop(), e)) ||
                        !ot(o) ||
                        (v &&
                            u(o[h]) &&
                            !rt(o) &&
                            ((l = o[v]) && (o[v] = null),
                            (i.event.triggered = h),
                            t.isPropagationStopped() && p.addEventListener(h, er),
                            o[h](),
                            t.isPropagationStopped() && p.removeEventListener(h, er),
                            (i.event.triggered = void 0),
                            l && (o[v] = l))),
                    t.result
                );
            }
        },
        simulate: function (n, t, r) {
            var u = i.extend(new i.Event(), r, { type: n, isSimulated: !0 });
            i.event.trigger(u, null, t);
        },
    });
    i.fn.extend({
        trigger: function (n, t) {
            return this.each(function () {
                i.event.trigger(n, t, this);
            });
        },
        triggerHandler: function (n, t) {
            var r = this[0];
            if (r) return i.event.trigger(n, t, r, !0);
        },
    });
    e.focusin ||
        i.each({ focus: "focusin", blur: "focusout" }, function (n, t) {
            var u = function (n) {
                i.event.simulate(t, n.target, i.event.fix(n));
            };
            i.event.special[t] = {
                setup: function () {
                    var i = this.ownerDocument || this.document || this,
                        f = r.access(i, t);
                    f || i.addEventListener(n, u, !0);
                    r.access(i, t, (f || 0) + 1);
                },
                teardown: function () {
                    var i = this.ownerDocument || this.document || this,
                        f = r.access(i, t) - 1;
                    f ? r.access(i, t, f) : (i.removeEventListener(n, u, !0), r.remove(i, t));
                },
            };
        });
    var ti = n.location,
        wf = { guid: Date.now() },
        or = /\?/;
    i.parseXML = function (t) {
        var r;
        if (!t || "string" != typeof t) return null;
        try {
            r = new n.DOMParser().parseFromString(t, "text/xml");
        } catch (t) {
            r = void 0;
        }
        return (r && !r.getElementsByTagName("parsererror").length) || i.error("Invalid XML: " + t), r;
    };
    var uo = /\[\]$/,
        bf = /\r?\n/g,
        fo = /^(?:submit|button|image|reset|file)$/i,
        eo = /^(?:input|select|textarea|keygen)/i;
    i.param = function (n, t) {
        var r,
            f = [],
            e = function (n, t) {
                var i = u(t) ? t() : t;
                f[f.length] = encodeURIComponent(n) + "=" + encodeURIComponent(null == i ? "" : i);
            };
        if (null == n) return "";
        if (Array.isArray(n) || (n.jquery && !i.isPlainObject(n)))
            i.each(n, function () {
                e(this.name, this.value);
            });
        else for (r in n) sr(r, n[r], t, e);
        return f.join("&");
    };
    i.fn.extend({
        serialize: function () {
            return i.param(this.serializeArray());
        },
        serializeArray: function () {
            return this.map(function () {
                var n = i.prop(this, "elements");
                return n ? i.makeArray(n) : this;
            })
                .filter(function () {
                    var n = this.type;
                    return this.name && !i(this).is(":disabled") && eo.test(this.nodeName) && !fo.test(n) && (this.checked || !gt.test(n));
                })
                .map(function (n, t) {
                    var r = i(this).val();
                    return null == r
                        ? null
                        : Array.isArray(r)
                        ? i.map(r, function (n) {
                              return { name: t.name, value: n.replace(bf, "\r\n") };
                          })
                        : { name: t.name, value: r.replace(bf, "\r\n") };
                })
                .get();
        },
    });
    var oo = /%20/g,
        so = /#.*$/,
        ho = /([?&])_=[^&]*/,
        co = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        lo = /^(?:GET|HEAD)$/,
        ao = /^\/\//,
        kf = {},
        hr = {},
        df = "*/".concat("*"),
        cr = f.createElement("a");
    return (
        (cr.href = ti.href),
        i.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: ti.href,
                type: "GET",
                isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(ti.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: { "*": df, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" },
                contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
                responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" },
                converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": i.parseXML },
                flatOptions: { url: !0, context: !0 },
            },
            ajaxSetup: function (n, t) {
                return t ? lr(lr(n, i.ajaxSettings), t) : lr(i.ajaxSettings, n);
            },
            ajaxPrefilter: gf(kf),
            ajaxTransport: gf(hr),
            ajax: function (t, r) {
                function b(t, r, f, c) {
                    var v,
                        rt,
                        b,
                        p,
                        g,
                        l = r;
                    s ||
                        ((s = !0),
                        d && n.clearTimeout(d),
                        (a = void 0),
                        (k = c || ""),
                        (e.readyState = 0 < t ? 4 : 0),
                        (v = (200 <= t && t < 300) || 304 === t),
                        f &&
                            (p = (function (n, t, i) {
                                for (var e, u, f, o, s = n.contents, r = n.dataTypes; "*" === r[0]; ) r.shift(), void 0 === e && (e = n.mimeType || t.getResponseHeader("Content-Type"));
                                if (e)
                                    for (u in s)
                                        if (s[u] && s[u].test(e)) {
                                            r.unshift(u);
                                            break;
                                        }
                                if (r[0] in i) f = r[0];
                                else {
                                    for (u in i) {
                                        if (!r[0] || n.converters[u + " " + r[0]]) {
                                            f = u;
                                            break;
                                        }
                                        o || (o = u);
                                    }
                                    f = f || o;
                                }
                                if (f) return f !== r[0] && r.unshift(f), i[f];
                            })(u, e, f)),
                        !v && -1 < i.inArray("script", u.dataTypes) && (u.converters["text script"] = function () {}),
                        (p = (function (n, t, i, r) {
                            var h,
                                u,
                                f,
                                s,
                                e,
                                o = {},
                                c = n.dataTypes.slice();
                            if (c[1]) for (f in n.converters) o[f.toLowerCase()] = n.converters[f];
                            for (u = c.shift(); u; )
                                if ((n.responseFields[u] && (i[n.responseFields[u]] = t), !e && r && n.dataFilter && (t = n.dataFilter(t, n.dataType)), (e = u), (u = c.shift())))
                                    if ("*" === u) u = e;
                                    else if ("*" !== e && e !== u) {
                                        if (!(f = o[e + " " + u] || o["* " + u]))
                                            for (h in o)
                                                if ((s = h.split(" "))[1] === u && (f = o[e + " " + s[0]] || o["* " + s[0]])) {
                                                    !0 === f ? (f = o[h]) : !0 !== o[h] && ((u = s[0]), c.unshift(s[1]));
                                                    break;
                                                }
                                        if (!0 !== f)
                                            if (f && n.throws) t = f(t);
                                            else
                                                try {
                                                    t = f(t);
                                                } catch (n) {
                                                    return { state: "parsererror", error: f ? n : "No conversion from " + e + " to " + u };
                                                }
                                    }
                            return { state: "success", data: t };
                        })(u, p, e, v)),
                        v
                            ? (u.ifModified && ((g = e.getResponseHeader("Last-Modified")) && (i.lastModified[o] = g), (g = e.getResponseHeader("etag")) && (i.etag[o] = g)),
                              204 === t || "HEAD" === u.type ? (l = "nocontent") : 304 === t ? (l = "notmodified") : ((l = p.state), (rt = p.data), (v = !(b = p.error))))
                            : ((b = l), (!t && l) || ((l = "error"), t < 0 && (t = 0))),
                        (e.status = t),
                        (e.statusText = (r || l) + ""),
                        v ? tt.resolveWith(h, [rt, l, e]) : tt.rejectWith(h, [e, l, b]),
                        e.statusCode(w),
                        (w = void 0),
                        y && nt.trigger(v ? "ajaxSuccess" : "ajaxError", [e, u, v ? rt : b]),
                        it.fireWith(h, [e, l]),
                        y && (nt.trigger("ajaxComplete", [e, u]), --i.active || i.event.trigger("ajaxStop")));
                }
                "object" == typeof t && ((r = t), (t = void 0));
                r = r || {};
                var a,
                    o,
                    k,
                    v,
                    d,
                    c,
                    s,
                    y,
                    g,
                    p,
                    u = i.ajaxSetup({}, r),
                    h = u.context || u,
                    nt = u.context && (h.nodeType || h.jquery) ? i(h) : i.event,
                    tt = i.Deferred(),
                    it = i.Callbacks("once memory"),
                    w = u.statusCode || {},
                    rt = {},
                    ut = {},
                    ft = "canceled",
                    e = {
                        readyState: 0,
                        getResponseHeader: function (n) {
                            var t;
                            if (s) {
                                if (!v) for (v = {}; (t = co.exec(k)); ) v[t[1].toLowerCase() + " "] = (v[t[1].toLowerCase() + " "] || []).concat(t[2]);
                                t = v[n.toLowerCase() + " "];
                            }
                            return null == t ? null : t.join(", ");
                        },
                        getAllResponseHeaders: function () {
                            return s ? k : null;
                        },
                        setRequestHeader: function (n, t) {
                            return null == s && ((n = ut[n.toLowerCase()] = ut[n.toLowerCase()] || n), (rt[n] = t)), this;
                        },
                        overrideMimeType: function (n) {
                            return null == s && (u.mimeType = n), this;
                        },
                        statusCode: function (n) {
                            var t;
                            if (n)
                                if (s) e.always(n[e.status]);
                                else for (t in n) w[t] = [w[t], n[t]];
                            return this;
                        },
                        abort: function (n) {
                            var t = n || ft;
                            return a && a.abort(t), b(0, t), this;
                        },
                    };
                if (
                    (tt.promise(e),
                    (u.url = ((t || u.url || ti.href) + "").replace(ao, ti.protocol + "//")),
                    (u.type = r.method || r.type || u.method || u.type),
                    (u.dataTypes = (u.dataType || "*").toLowerCase().match(l) || [""]),
                    null == u.crossDomain)
                ) {
                    c = f.createElement("a");
                    try {
                        c.href = u.url;
                        c.href = c.href;
                        u.crossDomain = cr.protocol + "//" + cr.host != c.protocol + "//" + c.host;
                    } catch (t) {
                        u.crossDomain = !0;
                    }
                }
                if ((u.data && u.processData && "string" != typeof u.data && (u.data = i.param(u.data, u.traditional)), ne(kf, u, r, e), s)) return e;
                for (g in ((y = i.event && u.global) && 0 == i.active++ && i.event.trigger("ajaxStart"),
                (u.type = u.type.toUpperCase()),
                (u.hasContent = !lo.test(u.type)),
                (o = u.url.replace(so, "")),
                u.hasContent
                    ? u.data && u.processData && 0 === (u.contentType || "").indexOf("application/x-www-form-urlencoded") && (u.data = u.data.replace(oo, "+"))
                    : ((p = u.url.slice(o.length)),
                      u.data && (u.processData || "string" == typeof u.data) && ((o += (or.test(o) ? "&" : "?") + u.data), delete u.data),
                      !1 === u.cache && ((o = o.replace(ho, "$1")), (p = (or.test(o) ? "&" : "?") + "_=" + wf.guid++ + p)),
                      (u.url = o + p)),
                u.ifModified && (i.lastModified[o] && e.setRequestHeader("If-Modified-Since", i.lastModified[o]), i.etag[o] && e.setRequestHeader("If-None-Match", i.etag[o])),
                ((u.data && u.hasContent && !1 !== u.contentType) || r.contentType) && e.setRequestHeader("Content-Type", u.contentType),
                e.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + ("*" !== u.dataTypes[0] ? ", " + df + "; q=0.01" : "") : u.accepts["*"]),
                u.headers))
                    e.setRequestHeader(g, u.headers[g]);
                if (u.beforeSend && (!1 === u.beforeSend.call(h, e, u) || s)) return e.abort();
                if (((ft = "abort"), it.add(u.complete), e.done(u.success), e.fail(u.error), (a = ne(hr, u, r, e)))) {
                    if (((e.readyState = 1), y && nt.trigger("ajaxSend", [e, u]), s)) return e;
                    u.async &&
                        0 < u.timeout &&
                        (d = n.setTimeout(function () {
                            e.abort("timeout");
                        }, u.timeout));
                    try {
                        s = !1;
                        a.send(rt, b);
                    } catch (t) {
                        if (s) throw t;
                        b(-1, t);
                    }
                } else b(-1, "No Transport");
                return e;
            },
            getJSON: function (n, t, r) {
                return i.get(n, t, r, "json");
            },
            getScript: function (n, t) {
                return i.get(n, void 0, t, "script");
            },
        }),
        i.each(["get", "post"], function (n, t) {
            i[t] = function (n, r, f, e) {
                return u(r) && ((e = e || f), (f = r), (r = void 0)), i.ajax(i.extend({ url: n, type: t, dataType: e, data: r, success: f }, i.isPlainObject(n) && n));
            };
        }),
        i.ajaxPrefilter(function (n) {
            var t;
            for (t in n.headers) "content-type" === t.toLowerCase() && (n.contentType = n.headers[t] || "");
        }),
        (i._evalUrl = function (n, t, r) {
            return i.ajax({
                url: n,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                converters: { "text script": function () {} },
                dataFilter: function (n) {
                    i.globalEval(n, t, r);
                },
            });
        }),
        i.fn.extend({
            wrapAll: function (n) {
                var t;
                return (
                    this[0] &&
                        (u(n) && (n = n.call(this[0])),
                        (t = i(n, this[0].ownerDocument).eq(0).clone(!0)),
                        this[0].parentNode && t.insertBefore(this[0]),
                        t
                            .map(function () {
                                for (var n = this; n.firstElementChild; ) n = n.firstElementChild;
                                return n;
                            })
                            .append(this)),
                    this
                );
            },
            wrapInner: function (n) {
                return u(n)
                    ? this.each(function (t) {
                          i(this).wrapInner(n.call(this, t));
                      })
                    : this.each(function () {
                          var t = i(this),
                              r = t.contents();
                          r.length ? r.wrapAll(n) : t.append(n);
                      });
            },
            wrap: function (n) {
                var t = u(n);
                return this.each(function (r) {
                    i(this).wrapAll(t ? n.call(this, r) : n);
                });
            },
            unwrap: function (n) {
                return (
                    this.parent(n)
                        .not("body")
                        .each(function () {
                            i(this).replaceWith(this.childNodes);
                        }),
                    this
                );
            },
        }),
        (i.expr.pseudos.hidden = function (n) {
            return !i.expr.pseudos.visible(n);
        }),
        (i.expr.pseudos.visible = function (n) {
            return !!(n.offsetWidth || n.offsetHeight || n.getClientRects().length);
        }),
        (i.ajaxSettings.xhr = function () {
            try {
                return new n.XMLHttpRequest();
            } catch (t) {}
        }),
        (te = { 0: 200, 1223: 204 }),
        (wt = i.ajaxSettings.xhr()),
        (e.cors = !!wt && "withCredentials" in wt),
        (e.ajax = wt = !!wt),
        i.ajaxTransport(function (t) {
            var i, r;
            if (e.cors || (wt && !t.crossDomain))
                return {
                    send: function (u, f) {
                        var o,
                            e = t.xhr();
                        if ((e.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)) for (o in t.xhrFields) e[o] = t.xhrFields[o];
                        for (o in (t.mimeType && e.overrideMimeType && e.overrideMimeType(t.mimeType), t.crossDomain || u["X-Requested-With"] || (u["X-Requested-With"] = "XMLHttpRequest"), u)) e.setRequestHeader(o, u[o]);
                        i = function (n) {
                            return function () {
                                i &&
                                    ((i = r = e.onload = e.onerror = e.onabort = e.ontimeout = e.onreadystatechange = null),
                                    "abort" === n
                                        ? e.abort()
                                        : "error" === n
                                        ? "number" != typeof e.status
                                            ? f(0, "error")
                                            : f(e.status, e.statusText)
                                        : f(te[e.status] || e.status, e.statusText, "text" !== (e.responseType || "text") || "string" != typeof e.responseText ? { binary: e.response } : { text: e.responseText }, e.getAllResponseHeaders()));
                            };
                        };
                        e.onload = i();
                        r = e.onerror = e.ontimeout = i("error");
                        void 0 !== e.onabort
                            ? (e.onabort = r)
                            : (e.onreadystatechange = function () {
                                  4 === e.readyState &&
                                      n.setTimeout(function () {
                                          i && r();
                                      });
                              });
                        i = i("abort");
                        try {
                            e.send((t.hasContent && t.data) || null);
                        } catch (u) {
                            if (i) throw u;
                        }
                    },
                    abort: function () {
                        i && i();
                    },
                };
        }),
        i.ajaxPrefilter(function (n) {
            n.crossDomain && (n.contents.script = !1);
        }),
        i.ajaxSetup({
            accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" },
            contents: { script: /\b(?:java|ecma)script\b/ },
            converters: {
                "text script": function (n) {
                    return i.globalEval(n), n;
                },
            },
        }),
        i.ajaxPrefilter("script", function (n) {
            void 0 === n.cache && (n.cache = !1);
            n.crossDomain && (n.type = "GET");
        }),
        i.ajaxTransport("script", function (n) {
            var r, t;
            if (n.crossDomain || n.scriptAttrs)
                return {
                    send: function (u, e) {
                        r = i("<script>")
                            .attr(n.scriptAttrs || {})
                            .prop({ charset: n.scriptCharset, src: n.url })
                            .on(
                                "load error",
                                (t = function (n) {
                                    r.remove();
                                    t = null;
                                    n && e("error" === n.type ? 404 : 200, n.type);
                                })
                            );
                        f.head.appendChild(r[0]);
                    },
                    abort: function () {
                        t && t();
                    },
                };
        }),
        (ar = []),
        (vi = /(=)\?(?=&|$)|\?\?/),
        i.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
                var n = ar.pop() || i.expando + "_" + wf.guid++;
                return (this[n] = !0), n;
            },
        }),
        i.ajaxPrefilter("json jsonp", function (t, r, f) {
            var e,
                o,
                s,
                h = !1 !== t.jsonp && (vi.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && vi.test(t.data) && "data");
            if (h || "jsonp" === t.dataTypes[0])
                return (
                    (e = t.jsonpCallback = u(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
                    h ? (t[h] = t[h].replace(vi, "$1" + e)) : !1 !== t.jsonp && (t.url += (or.test(t.url) ? "&" : "?") + t.jsonp + "=" + e),
                    (t.converters["script json"] = function () {
                        return s || i.error(e + " was not called"), s[0];
                    }),
                    (t.dataTypes[0] = "json"),
                    (o = n[e]),
                    (n[e] = function () {
                        s = arguments;
                    }),
                    f.always(function () {
                        void 0 === o ? i(n).removeProp(e) : (n[e] = o);
                        t[e] && ((t.jsonpCallback = r.jsonpCallback), ar.push(e));
                        s && u(o) && o(s[0]);
                        s = o = void 0;
                    }),
                    "script"
                );
        }),
        (e.createHTMLDocument = (((ie = f.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>"), 2 === ie.childNodes.length)),
        (i.parseHTML = function (n, t, r) {
            return "string" != typeof n
                ? []
                : ("boolean" == typeof t && ((r = t), (t = !1)),
                  t || (e.createHTMLDocument ? (((s = (t = f.implementation.createHTMLDocument("")).createElement("base")).href = f.location.href), t.head.appendChild(s)) : (t = f)),
                  (u = !r && []),
                  (o = wi.exec(n)) ? [t.createElement(o[1])] : ((o = vu([n], t, u)), u && u.length && i(u).remove(), i.merge([], o.childNodes)));
            var s, o, u;
        }),
        (i.fn.load = function (n, t, r) {
            var f,
                s,
                h,
                e = this,
                o = n.indexOf(" ");
            return (
                -1 < o && ((f = tt(n.slice(o))), (n = n.slice(0, o))),
                u(t) ? ((r = t), (t = void 0)) : t && "object" == typeof t && (s = "POST"),
                0 < e.length &&
                    i
                        .ajax({ url: n, type: s || "GET", dataType: "html", data: t })
                        .done(function (n) {
                            h = arguments;
                            e.html(f ? i("<div>").append(i.parseHTML(n)).find(f) : n);
                        })
                        .always(
                            r &&
                                function (n, t) {
                                    e.each(function () {
                                        r.apply(this, h || [n.responseText, t, n]);
                                    });
                                }
                        ),
                this
            );
        }),
        (i.expr.pseudos.animated = function (n) {
            return i.grep(i.timers, function (t) {
                return n === t.elem;
            }).length;
        }),
        (i.offset = {
            setOffset: function (n, t, r) {
                var v,
                    o,
                    s,
                    h,
                    e,
                    c,
                    l = i.css(n, "position"),
                    a = i(n),
                    f = {};
                "static" === l && (n.style.position = "relative");
                e = a.offset();
                s = i.css(n, "top");
                c = i.css(n, "left");
                ("absolute" === l || "fixed" === l) && -1 < (s + c).indexOf("auto") ? ((h = (v = a.position()).top), (o = v.left)) : ((h = parseFloat(s) || 0), (o = parseFloat(c) || 0));
                u(t) && (t = t.call(n, r, i.extend({}, e)));
                null != t.top && (f.top = t.top - e.top + h);
                null != t.left && (f.left = t.left - e.left + o);
                "using" in t ? t.using.call(n, f) : ("number" == typeof f.top && (f.top += "px"), "number" == typeof f.left && (f.left += "px"), a.css(f));
            },
        }),
        i.fn.extend({
            offset: function (n) {
                if (arguments.length)
                    return void 0 === n
                        ? this
                        : this.each(function (t) {
                              i.offset.setOffset(this, n, t);
                          });
                var r,
                    u,
                    t = this[0];
                if (t) return t.getClientRects().length ? ((r = t.getBoundingClientRect()), (u = t.ownerDocument.defaultView), { top: r.top + u.pageYOffset, left: r.left + u.pageXOffset }) : { top: 0, left: 0 };
            },
            position: function () {
                if (this[0]) {
                    var n,
                        r,
                        u,
                        t = this[0],
                        f = { top: 0, left: 0 };
                    if ("fixed" === i.css(t, "position")) r = t.getBoundingClientRect();
                    else {
                        for (r = this.offset(), u = t.ownerDocument, n = t.offsetParent || u.documentElement; n && (n === u.body || n === u.documentElement) && "static" === i.css(n, "position"); ) n = n.parentNode;
                        n && n !== t && 1 === n.nodeType && (((f = i(n).offset()).top += i.css(n, "borderTopWidth", !0)), (f.left += i.css(n, "borderLeftWidth", !0)));
                    }
                    return { top: r.top - f.top - i.css(t, "marginTop", !0), left: r.left - f.left - i.css(t, "marginLeft", !0) };
                }
            },
            offsetParent: function () {
                return this.map(function () {
                    for (var n = this.offsetParent; n && "static" === i.css(n, "position"); ) n = n.offsetParent;
                    return n || g;
                });
            },
        }),
        i.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (n, t) {
            var r = "pageYOffset" === t;
            i.fn[n] = function (i) {
                return w(
                    this,
                    function (n, i, u) {
                        var f;
                        if ((rt(n) ? (f = n) : 9 === n.nodeType && (f = n.defaultView), void 0 === u)) return f ? f[t] : n[i];
                        f ? f.scrollTo(r ? f.pageXOffset : u, r ? u : f.pageYOffset) : (n[i] = u);
                    },
                    n,
                    i,
                    arguments.length
                );
            };
        }),
        i.each(["top", "left"], function (n, t) {
            i.cssHooks[t] = du(e.pixelPosition, function (n, r) {
                if (r) return (r = ni(n, t)), nr.test(r) ? i(n).position()[t] + "px" : r;
            });
        }),
        i.each({ Height: "height", Width: "width" }, function (n, t) {
            i.each({ padding: "inner" + n, content: t, "": "outer" + n }, function (r, u) {
                i.fn[u] = function (f, e) {
                    var o = arguments.length && (r || "boolean" != typeof f),
                        s = r || (!0 === f || !0 === e ? "margin" : "border");
                    return w(
                        this,
                        function (t, r, f) {
                            var e;
                            return rt(t)
                                ? 0 === u.indexOf("outer")
                                    ? t["inner" + n]
                                    : t.document.documentElement["client" + n]
                                : 9 === t.nodeType
                                ? ((e = t.documentElement), Math.max(t.body["scroll" + n], e["scroll" + n], t.body["offset" + n], e["offset" + n], e["client" + n]))
                                : void 0 === f
                                ? i.css(t, r, s)
                                : i.style(t, r, f, s);
                        },
                        t,
                        o ? f : void 0,
                        o
                    );
                };
            });
        }),
        i.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (n, t) {
            i.fn[t] = function (n) {
                return this.on(t, n);
            };
        }),
        i.fn.extend({
            bind: function (n, t, i) {
                return this.on(n, null, t, i);
            },
            unbind: function (n, t) {
                return this.off(n, null, t);
            },
            delegate: function (n, t, i, r) {
                return this.on(t, n, i, r);
            },
            undelegate: function (n, t, i) {
                return 1 === arguments.length ? this.off(n, "**") : this.off(t, n || "**", i);
            },
            hover: function (n, t) {
                return this.mouseenter(n).mouseleave(t || n);
            },
        }),
        i.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (n, t) {
            i.fn[t] = function (n, i) {
                return 0 < arguments.length ? this.on(t, null, n, i) : this.trigger(t);
            };
        }),
        (re = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g),
        (i.proxy = function (n, t) {
            var r, f, e;
            if (("string" == typeof t && ((r = n[t]), (t = n), (n = r)), u(n)))
                return (
                    (f = k.call(arguments, 2)),
                    ((e = function () {
                        return n.apply(t || this, f.concat(k.call(arguments)));
                    }).guid = n.guid = n.guid || i.guid++),
                    e
                );
        }),
        (i.holdReady = function (n) {
            n ? i.readyWait++ : i.ready(!0);
        }),
        (i.isArray = Array.isArray),
        (i.parseJSON = JSON.parse),
        (i.nodeName = c),
        (i.isFunction = u),
        (i.isWindow = rt),
        (i.camelCase = y),
        (i.type = ut),
        (i.now = Date.now),
        (i.isNumeric = function (n) {
            var t = i.type(n);
            return ("number" === t || "string" === t) && !isNaN(n - parseFloat(n));
        }),
        (i.trim = function (n) {
            return null == n ? "" : (n + "").replace(re, "");
        }),
        "function" == typeof define &&
            define.amd &&
            define("jquery", [], function () {
                return i;
            }),
        (ue = n.jQuery),
        (fe = n.$),
        (i.noConflict = function (t) {
            return n.$ === i && (n.$ = fe), t && n.jQuery === i && (n.jQuery = ue), i;
        }),
        "undefined" == typeof t && (n.jQuery = n.$ = i),
        i
    );
});
!(function (n, t, i, r) {
    function u(t, i) {
        var e = this,
            f,
            o,
            s;
        if (
            ("object" == typeof i && (delete i.refresh, delete i.render, n.extend(this, i)),
            (this.$element = n(t)),
            !this.imageSrc && this.$element.is("img") && (this.imageSrc = this.$element.attr("src")),
            (f = (this.position + "").toLowerCase().match(/\S+/g) || []),
            f.length < 1 && f.push("center"),
            1 == f.length && f.push(f[0]),
            ("top" != f[0] && "bottom" != f[0] && "left" != f[1] && "right" != f[1]) || (f = [f[1], f[0]]),
            this.positionX !== r && (f[0] = this.positionX.toLowerCase()),
            this.positionY !== r && (f[1] = this.positionY.toLowerCase()),
            (e.positionX = f[0]),
            (e.positionY = f[1]),
            "left" != this.positionX && "right" != this.positionX && (this.positionX = isNaN(parseInt(this.positionX)) ? "center" : parseInt(this.positionX)),
            "top" != this.positionY && "bottom" != this.positionY && (this.positionY = isNaN(parseInt(this.positionY)) ? "center" : parseInt(this.positionY)),
            (this.position = this.positionX + (isNaN(this.positionX) ? "" : "px") + " " + this.positionY + (isNaN(this.positionY) ? "" : "px")),
            navigator.userAgent.match(/(iPod|iPhone|iPad)/))
        )
            return this.imageSrc && this.iosFix && !this.$element.is("img") && this.$element.css({ backgroundImage: 'url("' + this.imageSrc + '")', backgroundSize: "cover", backgroundPosition: this.position }), this;
        if (navigator.userAgent.match(/(Android)/))
            return this.imageSrc && this.androidFix && !this.$element.is("img") && this.$element.css({ backgroundImage: 'url("' + this.imageSrc + '")', backgroundSize: "cover", backgroundPosition: this.position }), this;
        this.$mirror = n("<div />").prependTo(this.mirrorContainer);
        o = this.$element.find(">.parallax-slider");
        s = !1;
        0 == o.length ? (this.$slider = n("<img />").prependTo(this.$mirror)) : ((this.$slider = o.prependTo(this.$mirror)), (s = !0));
        this.$mirror.addClass("parallax-mirror").css({ visibility: "hidden", zIndex: this.zIndex, position: "fixed", top: 0, left: 0, overflow: "hidden" }).find("img").attr("alt", "test");
        this.$slider.addClass("parallax-slider").one("load", function () {
            (e.naturalHeight && e.naturalWidth) || ((e.naturalHeight = this.naturalHeight || this.height || 1), (e.naturalWidth = this.naturalWidth || this.width || 1));
            e.aspectRatio = e.naturalWidth / e.naturalHeight;
            u.isSetup || u.setup();
            u.sliders.push(e);
            u.isFresh = !1;
            u.requestRender();
        });
        s || (this.$slider[0].src = this.imageSrc);
        ((this.naturalHeight && this.naturalWidth) || this.$slider[0].complete || o.length > 0) && this.$slider.trigger("load");
    }
    !(function () {
        for (var r = 0, i = ["ms", "moz", "webkit", "o"], n = 0; n < i.length && !t.requestAnimationFrame; ++n)
            (t.requestAnimationFrame = t[i[n] + "RequestAnimationFrame"]), (t.cancelAnimationFrame = t[i[n] + "CancelAnimationFrame"] || t[i[n] + "CancelRequestAnimationFrame"]);
        t.requestAnimationFrame ||
            (t.requestAnimationFrame = function (n) {
                var i = new Date().getTime(),
                    u = Math.max(0, 16 - (i - r)),
                    f = t.setTimeout(function () {
                        n(i + u);
                    }, u);
                return (r = i + u), f;
            });
        t.cancelAnimationFrame ||
            (t.cancelAnimationFrame = function (n) {
                clearTimeout(n);
            });
    })();
    n.extend(u.prototype, {
        speed: 0.2,
        bleed: 0,
        zIndex: -100,
        iosFix: !0,
        androidFix: !0,
        position: "center",
        overScrollFix: !1,
        mirrorContainer: "body",
        refresh: function () {
            this.boxWidth = this.$element.outerWidth();
            this.boxHeight = this.$element.outerHeight() + 2 * this.bleed;
            this.boxOffsetTop = this.$element.offset().top - this.bleed;
            this.boxOffsetLeft = this.$element.offset().left;
            this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;
            var n,
                r = u.winHeight,
                e = u.docHeight,
                f = Math.min(this.boxOffsetTop, e - r),
                o = Math.max(this.boxOffsetTop + this.boxHeight - r, 0),
                i = (this.boxHeight + (f - o) * (1 - this.speed)) | 0,
                t = ((this.boxOffsetTop - f) * (1 - this.speed)) | 0;
            i * this.aspectRatio >= this.boxWidth
                ? ((this.imageWidth = (i * this.aspectRatio) | 0),
                  (this.imageHeight = i),
                  (this.offsetBaseTop = t),
                  (n = this.imageWidth - this.boxWidth),
                  (this.offsetLeft = "left" == this.positionX ? 0 : "right" == this.positionX ? -n : isNaN(this.positionX) ? (-n / 2) | 0 : Math.max(this.positionX, -n)))
                : ((this.imageWidth = this.boxWidth),
                  (this.imageHeight = (this.boxWidth / this.aspectRatio) | 0),
                  (this.offsetLeft = 0),
                  (n = this.imageHeight - i),
                  (this.offsetBaseTop = "top" == this.positionY ? t : "bottom" == this.positionY ? t - n : isNaN(this.positionY) ? (t - n / 2) | 0 : t + Math.max(this.positionY, -n)));
        },
        render: function () {
            var n = u.scrollTop,
                t = u.scrollLeft,
                i = this.overScrollFix ? u.overScroll : 0,
                r = n + u.winHeight;
            this.boxOffsetBottom > n && this.boxOffsetTop <= r
                ? ((this.visibility = "visible"), (this.mirrorTop = this.boxOffsetTop - n), (this.mirrorLeft = this.boxOffsetLeft - t), (this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed)))
                : (this.visibility = "hidden");
            this.$mirror.css({ transform: "translate3d(" + this.mirrorLeft + "px, " + (this.mirrorTop - i) + "px, 0px)", visibility: this.visibility, height: this.boxHeight, width: this.boxWidth });
            this.$slider.css({ transform: "translate3d(" + this.offsetLeft + "px, " + this.offsetTop + "px, 0px)", position: "absolute", height: this.imageHeight, width: this.imageWidth, maxWidth: "none" });
        },
    });
    n.extend(u, {
        scrollTop: 0,
        scrollLeft: 0,
        winHeight: 0,
        winWidth: 0,
        docHeight: 1073741824,
        docWidth: 1073741824,
        sliders: [],
        isReady: !1,
        isFresh: !1,
        isBusy: !1,
        setup: function () {
            function f() {
                if (e == t.pageYOffset) return t.requestAnimationFrame(f), !1;
                e = t.pageYOffset;
                o.render();
                t.requestAnimationFrame(f);
            }
            var e;
            if (!this.isReady) {
                var o = this,
                    s = n(i),
                    r = n(t),
                    h = function () {
                        u.winHeight = r.height();
                        u.winWidth = r.width();
                        u.docHeight = s.height();
                        u.docWidth = s.width();
                    },
                    c = function () {
                        var n = r.scrollTop(),
                            t = u.docHeight - u.winHeight,
                            i = u.docWidth - u.winWidth;
                        u.scrollTop = Math.max(0, Math.min(t, n));
                        u.scrollLeft = Math.max(0, Math.min(i, r.scrollLeft()));
                        u.overScroll = Math.max(n - t, Math.min(n, 0));
                    };
                r.on("resize.px.parallax load.px.parallax", function () {
                    h();
                    o.refresh();
                    u.isFresh = !1;
                    u.requestRender();
                }).on("scroll.px.parallax load.px.parallax", function () {
                    c();
                    u.requestRender();
                });
                h();
                c();
                this.isReady = !0;
                e = -1;
                f();
            }
        },
        configure: function (t) {
            "object" == typeof t && (delete t.refresh, delete t.render, n.extend(this.prototype, t));
        },
        refresh: function () {
            n.each(this.sliders, function () {
                this.refresh();
            });
            this.isFresh = !0;
        },
        render: function () {
            this.isFresh || this.refresh();
            n.each(this.sliders, function () {
                this.render();
            });
        },
        requestRender: function () {
            var n = this;
            n.render();
            n.isBusy = !1;
        },
        destroy: function (i) {
            var r,
                f = n(i).data("px.parallax");
            for (f.$mirror.remove(), r = 0; r < this.sliders.length; r += 1) this.sliders[r] == f && this.sliders.splice(r, 1);
            n(i).data("px.parallax", !1);
            0 === this.sliders.length && (n(t).off("scroll.px.parallax resize.px.parallax load.px.parallax"), (this.isReady = !1), (u.isSetup = !1));
        },
    });
    var f = n.fn.parallax;
    n.fn.parallax = function (r) {
        return this.each(function () {
            var f = n(this),
                e = "object" == typeof r && r;
            this == t || this == i || f.is("body") ? u.configure(e) : f.data("px.parallax") ? "object" == typeof r && n.extend(f.data("px.parallax"), e) : ((e = n.extend({}, f.data(), e)), f.data("px.parallax", new u(this, e)));
            "string" == typeof r && ("destroy" == r ? u.destroy(this) : u[r]());
        });
    };
    n.fn.parallax.Constructor = u;
    n.fn.parallax.noConflict = function () {
        return (n.fn.parallax = f), this;
    };
    n(function () {
        n('[data-parallax="scroll"]').parallax();
    });
})(jQuery, window, document);
!(function (n) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], n) : "undefined" != typeof module && module.exports ? (module.exports = n(require("jquery"))) : n(jQuery);
})(function (n) {
    var o = -1,
        r = -1,
        i = function (n) {
            return parseFloat(n) || 0;
        },
        s = function (t) {
            var f = 1,
                e = n(t),
                u = null,
                r = [];
            return (
                e.each(function () {
                    var t = n(this),
                        e = t.offset().top - i(t.css("margin-top")),
                        o = r.length > 0 ? r[r.length - 1] : null;
                    null === o ? r.push(t) : Math.floor(Math.abs(u - e)) <= f ? (r[r.length - 1] = o.add(t)) : r.push(t);
                    u = e;
                }),
                r
            );
        },
        u = function (t) {
            var i = { byRow: !0, property: "height", target: null, remove: !1 };
            return "object" == typeof t ? n.extend(i, t) : ("boolean" == typeof t ? (i.byRow = t) : "remove" === t && (i.remove = !0), i);
        },
        t = (n.fn.matchHeight = function (i) {
            var r = u(i),
                f;
            return r.remove
                ? ((f = this),
                  this.css(r.property, ""),
                  n.each(t._groups, function (n, t) {
                      t.elements = t.elements.not(f);
                  }),
                  this)
                : this.length <= 1 && !r.target
                ? this
                : (t._groups.push({ elements: this, options: r }), t._apply(this, r), this);
        }),
        f,
        e;
    t.version = "0.7.2";
    t._groups = [];
    t._throttle = 80;
    t._maintainScroll = !1;
    t._beforeUpdate = null;
    t._afterUpdate = null;
    t._rows = s;
    t._parse = i;
    t._parseOptions = u;
    t._apply = function (r, f) {
        var e = u(f),
            o = n(r),
            c = [o],
            l = n(window).scrollTop(),
            a = n("html").outerHeight(!0),
            h = o.parents().filter(":hidden");
        return (
            h.each(function () {
                var t = n(this);
                t.data("style-cache", t.attr("style"));
            }),
            h.css("display", "block"),
            e.byRow &&
                !e.target &&
                (o.each(function () {
                    var i = n(this),
                        t = i.css("display");
                    "inline-block" !== t && "flex" !== t && "inline-flex" !== t && (t = "block");
                    i.data("style-cache", i.attr("style"));
                    i.css({ display: t, "padding-top": "0", "padding-bottom": "0", "margin-top": "0", "margin-bottom": "0", "border-top-width": "0", "border-bottom-width": "0", height: "100px", overflow: "hidden" });
                }),
                (c = s(o)),
                o.each(function () {
                    var t = n(this);
                    t.attr("style", t.data("style-cache") || "");
                })),
            n.each(c, function (t, r) {
                var u = n(r),
                    f = 0;
                if (e.target) f = e.target.outerHeight(!1);
                else {
                    if (e.byRow && u.length <= 1) return void u.css(e.property, "");
                    u.each(function () {
                        var t = n(this),
                            u = t.attr("style"),
                            i = t.css("display"),
                            r;
                        "inline-block" !== i && "flex" !== i && "inline-flex" !== i && (i = "block");
                        r = { display: i };
                        r[e.property] = "";
                        t.css(r);
                        t.outerHeight(!1) > f && (f = t.outerHeight(!1));
                        u ? t.attr("style", u) : t.css("display", "");
                    });
                }
                u.each(function () {
                    var t = n(this),
                        r = 0;
                    (e.target && t.is(e.target)) ||
                        ("border-box" !== t.css("box-sizing") && ((r += i(t.css("border-top-width")) + i(t.css("border-bottom-width"))), (r += i(t.css("padding-top")) + i(t.css("padding-bottom")))), t.css(e.property, f - r + "px"));
                });
            }),
            h.each(function () {
                var t = n(this);
                t.attr("style", t.data("style-cache") || null);
            }),
            t._maintainScroll && n(window).scrollTop((l / a) * n("html").outerHeight(!0)),
            this
        );
    };
    t._applyDataApi = function () {
        var t = {};
        n("[data-match-height], [data-mh]").each(function () {
            var i = n(this),
                r = i.attr("data-mh") || i.attr("data-match-height");
            t[r] = r in t ? t[r].add(i) : i;
        });
        n.each(t, function () {
            this.matchHeight(!0);
        });
    };
    f = function (i) {
        t._beforeUpdate && t._beforeUpdate(i, t._groups);
        n.each(t._groups, function () {
            t._apply(this.elements, this.options);
        });
        t._afterUpdate && t._afterUpdate(i, t._groups);
    };
    t._update = function (i, u) {
        if (u && "resize" === u.type) {
            var e = n(window).width();
            if (e === o) return;
            o = e;
        }
        i
            ? r === -1 &&
              (r = setTimeout(function () {
                  f(u);
                  r = -1;
              }, t._throttle))
            : f(u);
    };
    n(t._applyDataApi);
    e = n.fn.on ? "on" : "bind";
    n(window)[e]("load", function (n) {
        t._update(!1, n);
    });
    n(window)[e]("resize orientationchange", function (n) {
        t._update(!0, n);
    });
});
!(function (n, t, i, r) {
    function u(t, i) {
        this.settings = null;
        this.options = n.extend({}, u.Defaults, i);
        this.$element = n(t);
        this._handlers = {};
        this._plugins = {};
        this._supress = {};
        this._current = null;
        this._speed = null;
        this._coordinates = [];
        this._breakpoint = null;
        this._width = null;
        this._items = [];
        this._clones = [];
        this._mergers = [];
        this._widths = [];
        this._invalidated = {};
        this._pipe = [];
        this._drag = { time: null, target: null, pointer: null, stage: { start: null, current: null }, direction: null };
        this._states = { current: {}, tags: { initializing: ["busy"], animating: ["busy"], dragging: ["interacting"] } };
        n.each(
            ["onResize", "onThrottledResize"],
            n.proxy(function (t, i) {
                this._handlers[i] = n.proxy(this[i], this);
            }, this)
        );
        n.each(
            u.Plugins,
            n.proxy(function (n, t) {
                this._plugins[n.charAt(0).toLowerCase() + n.slice(1)] = new t(this);
            }, this)
        );
        n.each(
            u.Workers,
            n.proxy(function (t, i) {
                this._pipe.push({ filter: i.filter, run: n.proxy(i.run, this) });
            }, this)
        );
        this.setup();
        this.initialize();
    }
    u.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        checkVisibility: !0,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: t,
        fallbackEasing: "swing",
        slideTransition: "",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab",
    };
    u.Width = { Default: "default", Inner: "inner", Outer: "outer" };
    u.Type = { Event: "event", State: "state" };
    u.Plugins = {};
    u.Workers = [
        {
            filter: ["width", "settings"],
            run: function () {
                this._width = this.$element.width();
            },
        },
        {
            filter: ["width", "items", "settings"],
            run: function (n) {
                n.current = this._items && this._items[this.relative(this._current)];
            },
        },
        {
            filter: ["items", "settings"],
            run: function () {
                this.$stage.children(".cloned").remove();
            },
        },
        {
            filter: ["width", "items", "settings"],
            run: function (n) {
                var t = this.settings.margin || "",
                    u = !this.settings.autoWidth,
                    i = this.settings.rtl,
                    r = { width: "auto", "margin-left": i ? t : "", "margin-right": i ? "" : t };
                u || this.$stage.children().css(r);
                n.css = r;
            },
        },
        {
            filter: ["width", "items", "settings"],
            run: function (n) {
                var r = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                    t = null,
                    i = this._items.length,
                    f = !this.settings.autoWidth,
                    u = [];
                for (n.items = { merge: !1, width: r }; i--; )
                    (t = this._mergers[i]), (t = (this.settings.mergeFit && Math.min(t, this.settings.items)) || t), (n.items.merge = t > 1 || n.items.merge), (u[i] = f ? r * t : this._items[i].width());
                this._widths = u;
            },
        },
        {
            filter: ["items", "settings"],
            run: function () {
                var t = [],
                    i = this._items,
                    r = this.settings,
                    e = Math.max(2 * r.items, 4),
                    s = 2 * Math.ceil(i.length / 2),
                    u = r.loop && i.length ? (r.rewind ? e : Math.max(e, s)) : 0,
                    o = "",
                    f = "";
                for (u /= 2; u > 0; ) t.push(this.normalize(t.length / 2, !0)), (o += i[t[t.length - 1]][0].outerHTML), t.push(this.normalize(i.length - 1 - (t.length - 1) / 2, !0)), (f = i[t[t.length - 1]][0].outerHTML + f), (u -= 1);
                this._clones = t;
                n(o).addClass("cloned").appendTo(this.$stage);
                n(f).addClass("cloned").prependTo(this.$stage);
            },
        },
        {
            filter: ["width", "items", "settings"],
            run: function () {
                for (var u = this.settings.rtl ? 1 : -1, f = this._clones.length + this._items.length, n = -1, i = 0, r = 0, t = []; ++n < f; )
                    (i = t[n - 1] || 0), (r = this._widths[this.relative(n)] + this.settings.margin), t.push(i + r * u);
                this._coordinates = t;
            },
        },
        {
            filter: ["width", "items", "settings"],
            run: function () {
                var n = this.settings.stagePadding,
                    t = this._coordinates,
                    i = { width: Math.ceil(Math.abs(t[t.length - 1])) + 2 * n, "padding-left": n || "", "padding-right": n || "" };
                this.$stage.css(i);
            },
        },
        {
            filter: ["width", "items", "settings"],
            run: function (n) {
                var t = this._coordinates.length,
                    i = !this.settings.autoWidth,
                    r = this.$stage.children();
                if (i && n.items.merge) for (; t--; ) (n.css.width = this._widths[this.relative(t)]), r.eq(t).css(n.css);
                else i && ((n.css.width = n.items.width), r.css(n.css));
            },
        },
        {
            filter: ["items"],
            run: function () {
                this._coordinates.length < 1 && this.$stage.removeAttr("style");
            },
        },
        {
            filter: ["width", "items", "settings"],
            run: function (n) {
                n.current = n.current ? this.$stage.children().index(n.current) : 0;
                n.current = Math.max(this.minimum(), Math.min(this.maximum(), n.current));
                this.reset(n.current);
            },
        },
        {
            filter: ["position"],
            run: function () {
                this.animate(this.coordinates(this._current));
            },
        },
        {
            filter: ["width", "position", "items", "settings"],
            run: function () {
                for (var t, i, f = this.settings.rtl ? 1 : -1, e = 2 * this.settings.stagePadding, r = this.coordinates(this.current()) + e, o = r + this.width() * f, s = [], n = 0, u = this._coordinates.length; n < u; n++)
                    (t = this._coordinates[n - 1] || 0), (i = Math.abs(this._coordinates[n]) + e * f), ((this.op(t, "<=", r) && this.op(t, ">", o)) || (this.op(i, "<", r) && this.op(i, ">", o))) && s.push(n);
                this.$stage.children(".active").removeClass("active");
                this.$stage.children(":eq(" + s.join("), :eq(") + ")").addClass("active");
                this.$stage.children(".center").removeClass("center");
                this.settings.center && this.$stage.children().eq(this.current()).addClass("center");
            },
        },
    ];
    u.prototype.initializeStage = function () {
        this.$stage = this.$element.find("." + this.settings.stageClass);
        this.$stage.length ||
            (this.$element.addClass(this.options.loadingClass),
            (this.$stage = n("<" + this.settings.stageElement + ">", { class: this.settings.stageClass }).wrap(n("<div/>", { class: this.settings.stageOuterClass }))),
            this.$element.append(this.$stage.parent()));
    };
    u.prototype.initializeItems = function () {
        var t = this.$element.find(".owl-item");
        if (t.length)
            return (
                (this._items = t.get().map(function (t) {
                    return n(t);
                })),
                (this._mergers = this._items.map(function () {
                    return 1;
                })),
                void this.refresh()
            );
        this.replace(this.$element.children().not(this.$stage.parent()));
        this.isVisible() ? this.refresh() : this.invalidate("width");
        this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass);
    };
    u.prototype.initialize = function () {
        if ((this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading"))) {
            var n, t, i;
            n = this.$element.find("img");
            t = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : r;
            i = this.$element.children(t).width();
            n.length && i <= 0 && this.preloadAutoWidthImages(n);
        }
        this.initializeStage();
        this.initializeItems();
        this.registerEventHandlers();
        this.leave("initializing");
        this.trigger("initialized");
    };
    u.prototype.isVisible = function () {
        return !this.settings.checkVisibility || this.$element.is(":visible");
    };
    u.prototype.setup = function () {
        var u = this.viewport(),
            r = this.options.responsive,
            i = -1,
            t = null;
        r
            ? (n.each(r, function (n) {
                  n <= u && n > i && (i = Number(n));
              }),
              (t = n.extend({}, this.options, r[i])),
              "function" == typeof t.stagePadding && (t.stagePadding = t.stagePadding()),
              delete t.responsive,
              t.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + i)))
            : (t = n.extend({}, this.options));
        this.trigger("change", { property: { name: "settings", value: t } });
        this._breakpoint = i;
        this.settings = t;
        this.invalidate("settings");
        this.trigger("changed", { property: { name: "settings", value: this.settings } });
    };
    u.prototype.optionsLogic = function () {
        this.settings.autoWidth && ((this.settings.stagePadding = !1), (this.settings.merge = !1));
    };
    u.prototype.prepare = function (t) {
        var i = this.trigger("prepare", { content: t });
        return (
            i.data ||
                (i.data = n("<" + this.settings.itemElement + "/>")
                    .addClass(this.options.itemClass)
                    .append(t)),
            this.trigger("prepared", { content: i.data }),
            i.data
        );
    };
    u.prototype.update = function () {
        for (
            var t = 0,
                i = this._pipe.length,
                r = n.proxy(function (n) {
                    return this[n];
                }, this._invalidated),
                u = {};
            t < i;

        )
            (this._invalidated.all || n.grep(this._pipe[t].filter, r).length > 0) && this._pipe[t].run(u), t++;
        this._invalidated = {};
        this.is("valid") || this.enter("valid");
    };
    u.prototype.width = function (n) {
        switch ((n = n || u.Width.Default)) {
            case u.Width.Inner:
            case u.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin;
        }
    };
    u.prototype.refresh = function () {
        this.enter("refreshing");
        this.trigger("refresh");
        this.setup();
        this.optionsLogic();
        this.$element.addClass(this.options.refreshClass);
        this.update();
        this.$element.removeClass(this.options.refreshClass);
        this.leave("refreshing");
        this.trigger("refreshed");
    };
    u.prototype.onThrottledResize = function () {
        t.clearTimeout(this.resizeTimer);
        this.resizeTimer = t.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
    };
    u.prototype.onResize = function () {
        return (
            !!this._items.length &&
            this._width !== this.$element.width() &&
            !!this.isVisible() &&
            (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))
        );
    };
    u.prototype.registerEventHandlers = function () {
        n.support.transition && this.$stage.on(n.support.transition.end + ".owl.core", n.proxy(this.onTransitionEnd, this));
        !1 !== this.settings.responsive && this.on(t, "resize", this._handlers.onThrottledResize);
        this.settings.mouseDrag &&
            (this.$element.addClass(this.options.dragClass),
            this.$stage.on("mousedown.owl.core", n.proxy(this.onDragStart, this)),
            this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
                return !1;
            }));
        this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", n.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", n.proxy(this.onDragEnd, this)));
    };
    u.prototype.onDragStart = function (t) {
        var r = null;
        3 !== t.which &&
            (n.support.transform
                ? ((r = this.$stage
                      .css("transform")
                      .replace(/.*\(|\)| /g, "")
                      .split(",")),
                  (r = { x: r[16 === r.length ? 12 : 4], y: r[16 === r.length ? 13 : 5] }))
                : ((r = this.$stage.position()), (r = { x: this.settings.rtl ? r.left + this.$stage.width() - this.width() + this.settings.margin : r.left, y: r.top })),
            this.is("animating") && (n.support.transform ? this.animate(r.x) : this.$stage.stop(), this.invalidate("position")),
            this.$element.toggleClass(this.options.grabClass, "mousedown" === t.type),
            this.speed(0),
            (this._drag.time = new Date().getTime()),
            (this._drag.target = n(t.target)),
            (this._drag.stage.start = r),
            (this._drag.stage.current = r),
            (this._drag.pointer = this.pointer(t)),
            n(i).on("mouseup.owl.core touchend.owl.core", n.proxy(this.onDragEnd, this)),
            n(i).one(
                "mousemove.owl.core touchmove.owl.core",
                n.proxy(function (t) {
                    var r = this.difference(this._drag.pointer, this.pointer(t));
                    n(i).on("mousemove.owl.core touchmove.owl.core", n.proxy(this.onDragMove, this));
                    (Math.abs(r.x) < Math.abs(r.y) && this.is("valid")) || (t.preventDefault(), this.enter("dragging"), this.trigger("drag"));
                }, this)
            ));
    };
    u.prototype.onDragMove = function (n) {
        var t = null,
            i = null,
            u = null,
            f = this.difference(this._drag.pointer, this.pointer(n)),
            r = this.difference(this._drag.stage.start, f);
        this.is("dragging") &&
            (n.preventDefault(),
            this.settings.loop
                ? ((t = this.coordinates(this.minimum())), (i = this.coordinates(this.maximum() + 1) - t), (r.x = ((((r.x - t) % i) + i) % i) + t))
                : ((t = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum())),
                  (i = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum())),
                  (u = this.settings.pullDrag ? f.x / -5 : 0),
                  (r.x = Math.max(Math.min(r.x, t + u), i + u))),
            (this._drag.stage.current = r),
            this.animate(r.x));
    };
    u.prototype.onDragEnd = function (t) {
        var r = this.difference(this._drag.pointer, this.pointer(t)),
            f = this._drag.stage.current,
            u = (r.x > 0) ^ this.settings.rtl ? "left" : "right";
        n(i).off(".owl.core");
        this.$element.removeClass(this.options.grabClass);
        ((0 !== r.x && this.is("dragging")) || !this.is("valid")) &&
            (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
            this.current(this.closest(f.x, 0 !== r.x ? u : this._drag.direction)),
            this.invalidate("position"),
            this.update(),
            (this._drag.direction = u),
            (Math.abs(r.x) > 3 || new Date().getTime() - this._drag.time > 300) &&
                this._drag.target.one("click.owl.core", function () {
                    return !1;
                }));
        this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"));
    };
    u.prototype.closest = function (t, i) {
        var u = -1,
            e = 30,
            o = this.width(),
            f = this.coordinates();
        return (
            this.settings.freeDrag ||
                n.each(
                    f,
                    n.proxy(function (n, s) {
                        return (
                            "left" === i && t > s - e && t < s + e
                                ? (u = n)
                                : "right" === i && t > s - o - e && t < s - o + e
                                ? (u = n + 1)
                                : this.op(t, "<", s) && this.op(t, ">", f[n + 1] !== r ? f[n + 1] : s - o) && (u = "left" === i ? n + 1 : n),
                            -1 === u
                        );
                    }, this)
                ),
            this.settings.loop || (this.op(t, ">", f[this.minimum()]) ? (u = t = this.minimum()) : this.op(t, "<", f[this.maximum()]) && (u = t = this.maximum())),
            u
        );
    };
    u.prototype.animate = function (t) {
        var i = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd();
        i && (this.enter("animating"), this.trigger("translate"));
        n.support.transform3d && n.support.transition
            ? this.$stage.css({ transform: "translate3d(" + t + "px,0px,0px)", transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "") })
            : i
            ? this.$stage.animate({ left: t + "px" }, this.speed(), this.settings.fallbackEasing, n.proxy(this.onTransitionEnd, this))
            : this.$stage.css({ left: t + "px" });
    };
    u.prototype.is = function (n) {
        return this._states.current[n] && this._states.current[n] > 0;
    };
    u.prototype.current = function (n) {
        if (n === r) return this._current;
        if (0 === this._items.length) return r;
        if (((n = this.normalize(n)), this._current !== n)) {
            var t = this.trigger("change", { property: { name: "position", value: n } });
            t.data !== r && (n = this.normalize(t.data));
            this._current = n;
            this.invalidate("position");
            this.trigger("changed", { property: { name: "position", value: this._current } });
        }
        return this._current;
    };
    u.prototype.invalidate = function (t) {
        return (
            "string" === n.type(t) && ((this._invalidated[t] = !0), this.is("valid") && this.leave("valid")),
            n.map(this._invalidated, function (n, t) {
                return t;
            })
        );
    };
    u.prototype.reset = function (n) {
        (n = this.normalize(n)) !== r && ((this._speed = 0), (this._current = n), this.suppress(["translate", "translated"]), this.animate(this.coordinates(n)), this.release(["translate", "translated"]));
    };
    u.prototype.normalize = function (n, t) {
        var i = this._items.length,
            u = t ? 0 : this._clones.length;
        return !this.isNumeric(n) || i < 1 ? (n = r) : (n < 0 || n >= i + u) && (n = ((((n - u / 2) % i) + i) % i) + u / 2), n;
    };
    u.prototype.relative = function (n) {
        return (n -= this._clones.length / 2), this.normalize(n, !0);
    };
    u.prototype.maximum = function (n) {
        var t,
            u,
            f,
            i = this.settings,
            r = this._coordinates.length;
        if (i.loop) r = this._clones.length / 2 + this._items.length - 1;
        else if (i.autoWidth || i.merge) {
            if ((t = this._items.length)) for (u = this._items[--t].width(), f = this.$element.width(); t-- && !((u += this._items[t].width() + this.settings.margin) > f); );
            r = t + 1;
        } else r = i.center ? this._items.length - 1 : this._items.length - i.items;
        return n && (r -= this._clones.length / 2), Math.max(r, 0);
    };
    u.prototype.minimum = function (n) {
        return n ? 0 : this._clones.length / 2;
    };
    u.prototype.items = function (n) {
        return n === r ? this._items.slice() : ((n = this.normalize(n, !0)), this._items[n]);
    };
    u.prototype.mergers = function (n) {
        return n === r ? this._mergers.slice() : ((n = this.normalize(n, !0)), this._mergers[n]);
    };
    u.prototype.clones = function (t) {
        var i = this._clones.length / 2,
            f = i + this._items.length,
            u = function (n) {
                return n % 2 == 0 ? f + n / 2 : i - (n + 1) / 2;
            };
        return t === r
            ? n.map(this._clones, function (n, t) {
                  return u(t);
              })
            : n.map(this._clones, function (n, i) {
                  return n === t ? u(i) : null;
              });
    };
    u.prototype.speed = function (n) {
        return n !== r && (this._speed = n), this._speed;
    };
    u.prototype.coordinates = function (t) {
        var i,
            f = 1,
            u = t - 1;
        return t === r
            ? n.map(
                  this._coordinates,
                  n.proxy(function (n, t) {
                      return this.coordinates(t);
                  }, this)
              )
            : (this.settings.center ? (this.settings.rtl && ((f = -1), (u = t + 1)), (i = this._coordinates[t]), (i += ((this.width() - i + (this._coordinates[u] || 0)) / 2) * f)) : (i = this._coordinates[u] || 0), (i = Math.ceil(i)));
    };
    u.prototype.duration = function (n, t, i) {
        return 0 === i ? 0 : Math.min(Math.max(Math.abs(t - n), 1), 6) * Math.abs(i || this.settings.smartSpeed);
    };
    u.prototype.to = function (n, t) {
        var u = this.current(),
            f = null,
            i = n - this.relative(u),
            s = (i > 0) - (i < 0),
            e = this._items.length,
            o = this.minimum(),
            r = this.maximum();
        this.settings.loop
            ? (!this.settings.rewind && Math.abs(i) > e / 2 && (i += -1 * s * e), (n = u + i), (f = ((((n - o) % e) + e) % e) + o) !== n && f - i <= r && f - i > 0 && ((u = f - i), (n = f), this.reset(u)))
            : this.settings.rewind
            ? ((r += 1), (n = ((n % r) + r) % r))
            : (n = Math.max(o, Math.min(r, n)));
        this.speed(this.duration(u, n, t));
        this.current(n);
        this.isVisible() && this.update();
    };
    u.prototype.next = function (n) {
        n = n || !1;
        this.to(this.relative(this.current()) + 1, n);
    };
    u.prototype.prev = function (n) {
        n = n || !1;
        this.to(this.relative(this.current()) - 1, n);
    };
    u.prototype.onTransitionEnd = function (n) {
        if (n !== r && (n.stopPropagation(), (n.target || n.srcElement || n.originalTarget) !== this.$stage.get(0))) return !1;
        this.leave("animating");
        this.trigger("translated");
    };
    u.prototype.viewport = function () {
        var r;
        return (
            this.options.responsiveBaseElement !== t
                ? (r = n(this.options.responsiveBaseElement).width())
                : t.innerWidth
                ? (r = t.innerWidth)
                : i.documentElement && i.documentElement.clientWidth
                ? (r = i.documentElement.clientWidth)
                : console.warn("Can not detect viewport width."),
            r
        );
    };
    u.prototype.replace = function (t) {
        this.$stage.empty();
        this._items = [];
        t && (t = t instanceof jQuery ? t : n(t));
        this.settings.nestedItemSelector && (t = t.find("." + this.settings.nestedItemSelector));
        t.filter(function () {
            return 1 === this.nodeType;
        }).each(
            n.proxy(function (n, t) {
                t = this.prepare(t);
                this.$stage.append(t);
                this._items.push(t);
                this._mergers.push(1 * t.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1);
            }, this)
        );
        this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);
        this.invalidate("items");
    };
    u.prototype.add = function (t, i) {
        var u = this.relative(this._current);
        i = i === r ? this._items.length : this.normalize(i, !0);
        t = t instanceof jQuery ? t : n(t);
        this.trigger("add", { content: t, position: i });
        t = this.prepare(t);
        0 === this._items.length || i === this._items.length
            ? (0 === this._items.length && this.$stage.append(t), 0 !== this._items.length && this._items[i - 1].after(t), this._items.push(t), this._mergers.push(1 * t.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1))
            : (this._items[i].before(t), this._items.splice(i, 0, t), this._mergers.splice(i, 0, 1 * t.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1));
        this._items[u] && this.reset(this._items[u].index());
        this.invalidate("items");
        this.trigger("added", { content: t, position: i });
    };
    u.prototype.remove = function (n) {
        (n = this.normalize(n, !0)) !== r &&
            (this.trigger("remove", { content: this._items[n], position: n }),
            this._items[n].remove(),
            this._items.splice(n, 1),
            this._mergers.splice(n, 1),
            this.invalidate("items"),
            this.trigger("removed", { content: null, position: n }));
    };
    u.prototype.preloadAutoWidthImages = function (t) {
        t.each(
            n.proxy(function (t, i) {
                this.enter("pre-loading");
                i = n(i);
                n(new Image())
                    .one(
                        "load",
                        n.proxy(function (n) {
                            i.attr("src", n.target.src);
                            i.css("opacity", 1);
                            this.leave("pre-loading");
                            !this.is("pre-loading") && !this.is("initializing") && this.refresh();
                        }, this)
                    )
                    .attr("src", i.attr("src") || i.attr("data-src") || i.attr("data-src-retina"));
            }, this)
        );
    };
    u.prototype.destroy = function () {
        this.$element.off(".owl.core");
        this.$stage.off(".owl.core");
        n(i).off(".owl.core");
        !1 !== this.settings.responsive && (t.clearTimeout(this.resizeTimer), this.off(t, "resize", this._handlers.onThrottledResize));
        for (var r in this._plugins) this._plugins[r].destroy();
        this.$stage.children(".cloned").remove();
        this.$stage.unwrap();
        this.$stage.children().contents().unwrap();
        this.$stage.children().unwrap();
        this.$stage.remove();
        this.$element
            .removeClass(this.options.refreshClass)
            .removeClass(this.options.loadingClass)
            .removeClass(this.options.loadedClass)
            .removeClass(this.options.rtlClass)
            .removeClass(this.options.dragClass)
            .removeClass(this.options.grabClass)
            .attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), ""))
            .removeData("owl.carousel");
    };
    u.prototype.op = function (n, t, i) {
        var r = this.settings.rtl;
        switch (t) {
            case "<":
                return r ? n > i : n < i;
            case ">":
                return r ? n < i : n > i;
            case ">=":
                return r ? n <= i : n >= i;
            case "<=":
                return r ? n >= i : n <= i;
        }
    };
    u.prototype.on = function (n, t, i, r) {
        n.addEventListener ? n.addEventListener(t, i, r) : n.attachEvent && n.attachEvent("on" + t, i);
    };
    u.prototype.off = function (n, t, i, r) {
        n.removeEventListener ? n.removeEventListener(t, i, r) : n.detachEvent && n.detachEvent("on" + t, i);
    };
    u.prototype.trigger = function (t, i, r) {
        var o = { item: { count: this._items.length, index: this.current() } },
            e = n.camelCase(
                n
                    .grep(["on", t, r], function (n) {
                        return n;
                    })
                    .join("-")
                    .toLowerCase()
            ),
            f = n.Event([t, "owl", r || "carousel"].join(".").toLowerCase(), n.extend({ relatedTarget: this }, o, i));
        return (
            this._supress[t] ||
                (n.each(this._plugins, function (n, t) {
                    t.onTrigger && t.onTrigger(f);
                }),
                this.register({ type: u.Type.Event, name: t }),
                this.$element.trigger(f),
                this.settings && "function" == typeof this.settings[e] && this.settings[e].call(this, f)),
            f
        );
    };
    u.prototype.enter = function (t) {
        n.each(
            [t].concat(this._states.tags[t] || []),
            n.proxy(function (n, t) {
                this._states.current[t] === r && (this._states.current[t] = 0);
                this._states.current[t]++;
            }, this)
        );
    };
    u.prototype.leave = function (t) {
        n.each(
            [t].concat(this._states.tags[t] || []),
            n.proxy(function (n, t) {
                this._states.current[t]--;
            }, this)
        );
    };
    u.prototype.register = function (t) {
        if (t.type === u.Type.Event) {
            if ((n.event.special[t.name] || (n.event.special[t.name] = {}), !n.event.special[t.name].owl)) {
                var i = n.event.special[t.name]._default;
                n.event.special[t.name]._default = function (n) {
                    return !i || !i.apply || (n.namespace && -1 !== n.namespace.indexOf("owl")) ? n.namespace && n.namespace.indexOf("owl") > -1 : i.apply(this, arguments);
                };
                n.event.special[t.name].owl = !0;
            }
        } else
            t.type === u.Type.State &&
                ((this._states.tags[t.name] = this._states.tags[t.name] ? this._states.tags[t.name].concat(t.tags) : t.tags),
                (this._states.tags[t.name] = n.grep(
                    this._states.tags[t.name],
                    n.proxy(function (i, r) {
                        return n.inArray(i, this._states.tags[t.name]) === r;
                    }, this)
                )));
    };
    u.prototype.suppress = function (t) {
        n.each(
            t,
            n.proxy(function (n, t) {
                this._supress[t] = !0;
            }, this)
        );
    };
    u.prototype.release = function (t) {
        n.each(
            t,
            n.proxy(function (n, t) {
                delete this._supress[t];
            }, this)
        );
    };
    u.prototype.pointer = function (n) {
        var i = { x: null, y: null };
        return (
            (n = n.originalEvent || n || t.event),
            (n = n.touches && n.touches.length ? n.touches[0] : n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n),
            n.pageX ? ((i.x = n.pageX), (i.y = n.pageY)) : ((i.x = n.clientX), (i.y = n.clientY)),
            i
        );
    };
    u.prototype.isNumeric = function (n) {
        return !isNaN(parseFloat(n));
    };
    u.prototype.difference = function (n, t) {
        return { x: n.x - t.x, y: n.y - t.y };
    };
    n.fn.owlCarousel = function (t) {
        var i = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var f = n(this),
                r = f.data("owl.carousel");
            r ||
                ((r = new u(this, "object" == typeof t && t)),
                f.data("owl.carousel", r),
                n.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (t, i) {
                    r.register({ type: u.Type.Event, name: i });
                    r.$element.on(
                        i + ".owl.carousel.core",
                        n.proxy(function (n) {
                            n.namespace && n.relatedTarget !== this && (this.suppress([i]), r[i].apply(this, [].slice.call(arguments, 1)), this.release([i]));
                        }, r)
                    );
                }));
            "string" == typeof t && "_" !== t.charAt(0) && r[t].apply(r, i);
        });
    };
    n.fn.owlCarousel.Constructor = u;
})(window.Zepto || window.jQuery, window, document),
    (function (n, t) {
        var i = function (t) {
            this._core = t;
            this._interval = null;
            this._visible = null;
            this._handlers = {
                "initialized.owl.carousel": n.proxy(function (n) {
                    n.namespace && this._core.settings.autoRefresh && this.watch();
                }, this),
            };
            this._core.options = n.extend({}, i.Defaults, this._core.options);
            this._core.$element.on(this._handlers);
        };
        i.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 };
        i.prototype.watch = function () {
            this._interval || ((this._visible = this._core.isVisible()), (this._interval = t.setInterval(n.proxy(this.refresh, this), this._core.settings.autoRefreshInterval)));
        };
        i.prototype.refresh = function () {
            this._core.isVisible() !== this._visible && ((this._visible = !this._visible), this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh());
        };
        i.prototype.destroy = function () {
            var n, i;
            t.clearInterval(this._interval);
            for (n in this._handlers) this._core.$element.off(n, this._handlers[n]);
            for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null);
        };
        n.fn.owlCarousel.Constructor.Plugins.AutoRefresh = i;
    })(window.Zepto || window.jQuery, window, document),
    (function (n, t, i, r) {
        var u = function (t) {
            this._core = t;
            this._loaded = [];
            this._handlers = {
                "initialized.owl.carousel change.owl.carousel resized.owl.carousel": n.proxy(function (t) {
                    if (t.namespace && this._core.settings && this._core.settings.lazyLoad && ((t.property && "position" == t.property.name) || "initialized" == t.type)) {
                        var i = this._core.settings,
                            u = (i.center && Math.ceil(i.items / 2)) || i.items,
                            e = (i.center && -1 * u) || 0,
                            f = (t.property && t.property.value !== r ? t.property.value : this._core.current()) + e,
                            o = this._core.clones().length,
                            s = n.proxy(function (n, t) {
                                this.load(t);
                            }, this);
                        for (i.lazyLoadEager > 0 && ((u += i.lazyLoadEager), i.loop && ((f -= i.lazyLoadEager), u++)); e++ < u; ) this.load(o / 2 + this._core.relative(f)), o && n.each(this._core.clones(this._core.relative(f)), s), f++;
                    }
                }, this),
            };
            this._core.options = n.extend({}, u.Defaults, this._core.options);
            this._core.$element.on(this._handlers);
        };
        u.Defaults = { lazyLoad: !1, lazyLoadEager: 0 };
        u.prototype.load = function (i) {
            var r = this._core.$stage.children().eq(i),
                u = r && r.find(".owl-lazy");
            !u ||
                n.inArray(r.get(0), this._loaded) > -1 ||
                (u.each(
                    n.proxy(function (i, r) {
                        var e,
                            u = n(r),
                            f = (t.devicePixelRatio > 1 && u.attr("data-src-retina")) || u.attr("data-src") || u.attr("data-srcset");
                        this._core.trigger("load", { element: u, url: f }, "lazy");
                        u.is("img")
                            ? u
                                  .one(
                                      "load.owl.lazy",
                                      n.proxy(function () {
                                          u.css("opacity", 1);
                                          this._core.trigger("loaded", { element: u, url: f }, "lazy");
                                      }, this)
                                  )
                                  .attr("src", f)
                            : u.is("source")
                            ? u
                                  .one(
                                      "load.owl.lazy",
                                      n.proxy(function () {
                                          this._core.trigger("loaded", { element: u, url: f }, "lazy");
                                      }, this)
                                  )
                                  .attr("srcset", f)
                            : ((e = new Image()),
                              (e.onload = n.proxy(function () {
                                  u.css({ "background-image": 'url("' + f + '")', opacity: "1" });
                                  this._core.trigger("loaded", { element: u, url: f }, "lazy");
                              }, this)),
                              (e.src = f));
                    }, this)
                ),
                this._loaded.push(r.get(0)));
        };
        u.prototype.destroy = function () {
            var n, t;
            for (n in this.handlers) this._core.$element.off(n, this.handlers[n]);
            for (t in Object.getOwnPropertyNames(this)) "function" != typeof this[t] && (this[t] = null);
        };
        n.fn.owlCarousel.Constructor.Plugins.Lazy = u;
    })(window.Zepto || window.jQuery, window, document),
    (function (n, t) {
        var i = function (r) {
            this._core = r;
            this._previousHeight = null;
            this._handlers = {
                "initialized.owl.carousel refreshed.owl.carousel": n.proxy(function (n) {
                    n.namespace && this._core.settings.autoHeight && this.update();
                }, this),
                "changed.owl.carousel": n.proxy(function (n) {
                    n.namespace && this._core.settings.autoHeight && "position" === n.property.name && this.update();
                }, this),
                "loaded.owl.lazy": n.proxy(function (n) {
                    n.namespace && this._core.settings.autoHeight && n.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update();
                }, this),
            };
            this._core.options = n.extend({}, i.Defaults, this._core.options);
            this._core.$element.on(this._handlers);
            this._intervalId = null;
            var u = this;
            n(t).on("load", function () {
                u._core.settings.autoHeight && u.update();
            });
            n(t).resize(function () {
                u._core.settings.autoHeight &&
                    (null != u._intervalId && clearTimeout(u._intervalId),
                    (u._intervalId = setTimeout(function () {
                        u.update();
                    }, 250)));
            });
        };
        i.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" };
        i.prototype.update = function () {
            var i = this._core._current,
                u = i + this._core.settings.items,
                f = this._core.settings.lazyLoad,
                e = this._core.$stage.children().toArray().slice(i, u),
                r = [],
                t = 0;
            n.each(e, function (t, i) {
                r.push(n(i).height());
            });
            t = Math.max.apply(null, r);
            t <= 1 && f && this._previousHeight && (t = this._previousHeight);
            this._previousHeight = t;
            this._core.$stage.parent().height(t).addClass(this._core.settings.autoHeightClass);
        };
        i.prototype.destroy = function () {
            var n, t;
            for (n in this._handlers) this._core.$element.off(n, this._handlers[n]);
            for (t in Object.getOwnPropertyNames(this)) "function" != typeof this[t] && (this[t] = null);
        };
        n.fn.owlCarousel.Constructor.Plugins.AutoHeight = i;
    })(window.Zepto || window.jQuery, window, document),
    (function (n, t, i) {
        var r = function (t) {
            this._core = t;
            this._videos = {};
            this._playing = null;
            this._handlers = {
                "initialized.owl.carousel": n.proxy(function (n) {
                    n.namespace && this._core.register({ type: "state", name: "playing", tags: ["interacting"] });
                }, this),
                "resize.owl.carousel": n.proxy(function (n) {
                    n.namespace && this._core.settings.video && this.isInFullScreen() && n.preventDefault();
                }, this),
                "refreshed.owl.carousel": n.proxy(function (n) {
                    n.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove();
                }, this),
                "changed.owl.carousel": n.proxy(function (n) {
                    n.namespace && "position" === n.property.name && this._playing && this.stop();
                }, this),
                "prepared.owl.carousel": n.proxy(function (t) {
                    if (t.namespace) {
                        var i = n(t.content).find(".owl-video");
                        i.length && (i.css("display", "none"), this.fetch(i, n(t.content)));
                    }
                }, this),
            };
            this._core.options = n.extend({}, r.Defaults, this._core.options);
            this._core.$element.on(this._handlers);
            this._core.$element.on(
                "click.owl.video",
                ".owl-video-play-icon",
                n.proxy(function (n) {
                    this.play(n);
                }, this)
            );
        };
        r.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 };
        r.prototype.fetch = function (n, t) {
            var u = (function () {
                    return n.attr("data-vimeo-id") ? "vimeo" : n.attr("data-vzaar-id") ? "vzaar" : "youtube";
                })(),
                i = n.attr("data-vimeo-id") || n.attr("data-youtube-id") || n.attr("data-vzaar-id"),
                f = n.attr("data-width") || this._core.settings.videoWidth,
                e = n.attr("data-height") || this._core.settings.videoHeight,
                r = n.attr("href");
            if (!r) throw new Error("Missing video URL.");
            if (
                ((i = r.match(
                    /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
                )),
                i[3].indexOf("youtu") > -1)
            )
                u = "youtube";
            else if (i[3].indexOf("vimeo") > -1) u = "vimeo";
            else {
                if (!(i[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
                u = "vzaar";
            }
            i = i[6];
            this._videos[r] = { type: u, id: i, width: f, height: e };
            t.attr("data-video", r);
            this.thumbnail(n, this._videos[r]);
        };
        r.prototype.thumbnail = function (t, i) {
            var e,
                o,
                r,
                c = i.width && i.height ? "width:" + i.width + "px;height:" + i.height + "px;" : "",
                f = t.find("img"),
                s = "src",
                h = "",
                l = this._core.settings,
                u = function (i) {
                    o = '<div class="owl-video-play-icon"></div>';
                    e = l.lazyLoad ? n("<div/>", { class: "owl-video-tn " + h, srcType: i }) : n("<div/>", { class: "owl-video-tn", style: "opacity:1;background-image:url(" + i + ")" });
                    t.after(e);
                    t.after(o);
                };
            if ((t.wrap(n("<div/>", { class: "owl-video-wrapper", style: c })), this._core.settings.lazyLoad && ((s = "data-src"), (h = "owl-lazy")), f.length)) return u(f.attr(s)), f.remove(), !1;
            "youtube" === i.type
                ? ((r = "//img.youtube.com/vi/" + i.id + "/hqdefault.jpg"), u(r))
                : "vimeo" === i.type
                ? n.ajax({
                      type: "GET",
                      url: "//vimeo.com/api/v2/video/" + i.id + ".json",
                      jsonp: "callback",
                      dataType: "jsonp",
                      success: function (n) {
                          r = n[0].thumbnail_large;
                          u(r);
                      },
                  })
                : "vzaar" === i.type &&
                  n.ajax({
                      type: "GET",
                      url: "//vzaar.com/api/videos/" + i.id + ".json",
                      jsonp: "callback",
                      dataType: "jsonp",
                      success: function (n) {
                          r = n.framegrab_url;
                          u(r);
                      },
                  });
        };
        r.prototype.stop = function () {
            this._core.trigger("stop", null, "video");
            this._playing.find(".owl-video-frame").remove();
            this._playing.removeClass("owl-video-playing");
            this._playing = null;
            this._core.leave("playing");
            this._core.trigger("stopped", null, "video");
        };
        r.prototype.play = function (t) {
            var r,
                f = n(t.target),
                u = f.closest("." + this._core.settings.itemClass),
                i = this._videos[u.attr("data-video")],
                e = i.width || "100%",
                o = i.height || this._core.$stage.height();
            this._playing ||
                (this._core.enter("playing"),
                this._core.trigger("play", null, "video"),
                (u = this._core.items(this._core.relative(u.index()))),
                this._core.reset(u.index()),
                (r = n('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>')),
                r.attr("height", o),
                r.attr("width", e),
                "youtube" === i.type
                    ? r.attr("src", "//www.youtube.com/embed/" + i.id + "?autoplay=1&rel=0&v=" + i.id)
                    : "vimeo" === i.type
                    ? r.attr("src", "//player.vimeo.com/video/" + i.id + "?autoplay=1")
                    : "vzaar" === i.type && r.attr("src", "//view.vzaar.com/" + i.id + "/player?autoplay=true"),
                n(r).wrap('<div class="owl-video-frame" />').insertAfter(u.find(".owl-video")),
                (this._playing = u.addClass("owl-video-playing")));
        };
        r.prototype.isInFullScreen = function () {
            var t = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
            return t && n(t).parent().hasClass("owl-video-frame");
        };
        r.prototype.destroy = function () {
            var n, t;
            this._core.$element.off("click.owl.video");
            for (n in this._handlers) this._core.$element.off(n, this._handlers[n]);
            for (t in Object.getOwnPropertyNames(this)) "function" != typeof this[t] && (this[t] = null);
        };
        n.fn.owlCarousel.Constructor.Plugins.Video = r;
    })(window.Zepto || window.jQuery, window, document),
    (function (n, t, i, r) {
        var u = function (t) {
            this.core = t;
            this.core.options = n.extend({}, u.Defaults, this.core.options);
            this.swapping = !0;
            this.previous = r;
            this.next = r;
            this.handlers = {
                "change.owl.carousel": n.proxy(function (n) {
                    n.namespace && "position" == n.property.name && ((this.previous = this.core.current()), (this.next = n.property.value));
                }, this),
                "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": n.proxy(function (n) {
                    n.namespace && (this.swapping = "translated" == n.type);
                }, this),
                "translate.owl.carousel": n.proxy(function (n) {
                    n.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap();
                }, this),
            };
            this.core.$element.on(this.handlers);
        };
        u.Defaults = { animateOut: !1, animateIn: !1 };
        u.prototype.swap = function () {
            if (1 === this.core.settings.items && n.support.animation && n.support.transition) {
                this.core.speed(0);
                var t,
                    i = n.proxy(this.clear, this),
                    f = this.core.$stage.children().eq(this.previous),
                    e = this.core.$stage.children().eq(this.next),
                    r = this.core.settings.animateIn,
                    u = this.core.settings.animateOut;
                this.core.current() !== this.previous &&
                    (u &&
                        ((t = this.core.coordinates(this.previous) - this.core.coordinates(this.next)),
                        f
                            .one(n.support.animation.end, i)
                            .css({ left: t + "px" })
                            .addClass("animated owl-animated-out")
                            .addClass(u)),
                    r && e.one(n.support.animation.end, i).addClass("animated owl-animated-in").addClass(r));
            }
        };
        u.prototype.clear = function (t) {
            n(t.target).css({ left: "" }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut);
            this.core.onTransitionEnd();
        };
        u.prototype.destroy = function () {
            var n, t;
            for (n in this.handlers) this.core.$element.off(n, this.handlers[n]);
            for (t in Object.getOwnPropertyNames(this)) "function" != typeof this[t] && (this[t] = null);
        };
        n.fn.owlCarousel.Constructor.Plugins.Animate = u;
    })(window.Zepto || window.jQuery, window, document),
    (function (n, t, i) {
        var r = function (t) {
            this._core = t;
            this._call = null;
            this._time = 0;
            this._timeout = 0;
            this._paused = !0;
            this._handlers = {
                "changed.owl.carousel": n.proxy(function (n) {
                    n.namespace && "settings" === n.property.name ? (this._core.settings.autoplay ? this.play() : this.stop()) : n.namespace && "position" === n.property.name && this._paused && (this._time = 0);
                }, this),
                "initialized.owl.carousel": n.proxy(function (n) {
                    n.namespace && this._core.settings.autoplay && this.play();
                }, this),
                "play.owl.autoplay": n.proxy(function (n, t, i) {
                    n.namespace && this.play(t, i);
                }, this),
                "stop.owl.autoplay": n.proxy(function (n) {
                    n.namespace && this.stop();
                }, this),
                "mouseover.owl.autoplay": n.proxy(function () {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
                }, this),
                "mouseleave.owl.autoplay": n.proxy(function () {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play();
                }, this),
                "touchstart.owl.core": n.proxy(function () {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
                }, this),
                "touchend.owl.core": n.proxy(function () {
                    this._core.settings.autoplayHoverPause && this.play();
                }, this),
            };
            this._core.$element.on(this._handlers);
            this._core.options = n.extend({}, r.Defaults, this._core.options);
        };
        r.Defaults = { autoplay: !1, autoplayTimeout: 5e3, autoplayHoverPause: !1, autoplaySpeed: !1 };
        r.prototype._next = function (r) {
            this._call = t.setTimeout(n.proxy(this._next, this, r), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read());
            this._core.is("interacting") || i.hidden || this._core.next(r || this._core.settings.autoplaySpeed);
        };
        r.prototype.read = function () {
            return new Date().getTime() - this._time;
        };
        r.prototype.play = function (i, r) {
            var u;
            this._core.is("rotating") || this._core.enter("rotating");
            i = i || this._core.settings.autoplayTimeout;
            u = Math.min(this._time % (this._timeout || i), i);
            this._paused ? ((this._time = this.read()), (this._paused = !1)) : t.clearTimeout(this._call);
            this._time += (this.read() % i) - u;
            this._timeout = i;
            this._call = t.setTimeout(n.proxy(this._next, this, r), i - u);
        };
        r.prototype.stop = function () {
            this._core.is("rotating") && ((this._time = 0), (this._paused = !0), t.clearTimeout(this._call), this._core.leave("rotating"));
        };
        r.prototype.pause = function () {
            this._core.is("rotating") && !this._paused && ((this._time = this.read()), (this._paused = !0), t.clearTimeout(this._call));
        };
        r.prototype.destroy = function () {
            var n, t;
            this.stop();
            for (n in this._handlers) this._core.$element.off(n, this._handlers[n]);
            for (t in Object.getOwnPropertyNames(this)) "function" != typeof this[t] && (this[t] = null);
        };
        n.fn.owlCarousel.Constructor.Plugins.autoplay = r;
    })(window.Zepto || window.jQuery, window, document),
    (function (n) {
        "use strict";
        var t = function (i) {
            this._core = i;
            this._initialized = !1;
            this._pages = [];
            this._controls = {};
            this._templates = [];
            this.$element = this._core.$element;
            this._overrides = { next: this._core.next, prev: this._core.prev, to: this._core.to };
            this._handlers = {
                "prepared.owl.carousel": n.proxy(function (t) {
                    t.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + n(t.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>");
                }, this),
                "added.owl.carousel": n.proxy(function (n) {
                    n.namespace && this._core.settings.dotsData && this._templates.splice(n.position, 0, this._templates.pop());
                }, this),
                "remove.owl.carousel": n.proxy(function (n) {
                    n.namespace && this._core.settings.dotsData && this._templates.splice(n.position, 1);
                }, this),
                "changed.owl.carousel": n.proxy(function (n) {
                    n.namespace && "position" == n.property.name && this.draw();
                }, this),
                "initialized.owl.carousel": n.proxy(function (n) {
                    n.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), (this._initialized = !0), this._core.trigger("initialized", null, "navigation"));
                }, this),
                "refreshed.owl.carousel": n.proxy(function (n) {
                    n.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"));
                }, this),
            };
            this._core.options = n.extend({}, t.Defaults, this._core.options);
            this.$element.on(this._handlers);
        };
        t.Defaults = {
            nav: !1,
            navText: ['<span aria-label="Show previous section">&#x2039;</span>', '<span aria-label="Show next section">&#x203a;</span>'],
            navSpeed: !1,
            navElement: 'button type="button" aria-label="navigation button to vavigate left and right" role="presentation"',
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotsData: !1,
            dotsSpeed: !1,
            dotsContainer: !1,
        };
        t.prototype.initialize = function () {
            var i,
                t = this._core.settings;
            this._controls.$relative = (t.navContainer ? n(t.navContainer) : n("<div>").addClass(t.navContainerClass).appendTo(this.$element)).addClass("disabled");
            this._controls.$previous = n("<" + t.navElement + ">")
                .addClass(t.navClass[0])
                .html(t.navText[0])
                .prependTo(this._controls.$relative)
                .on(
                    "click",
                    n.proxy(function () {
                        this.prev(t.navSpeed);
                    }, this)
                );
            this._controls.$next = n("<" + t.navElement + ">")
                .addClass(t.navClass[1])
                .html(t.navText[1])
                .appendTo(this._controls.$relative)
                .on(
                    "click",
                    n.proxy(function () {
                        this.next(t.navSpeed);
                    }, this)
                );
            t.dotsData || (this._templates = [n('<button role="button" aria-label="carousel dot navigation button to navigate between carousel items">').addClass(t.dotClass).append(n("<span>")).prop("outerHTML")]);
            this._controls.$absolute = (t.dotsContainer ? n(t.dotsContainer) : n("<div>").addClass(t.dotsClass).appendTo(this.$element)).addClass("disabled");
            this._controls.$absolute.on(
                "click",
                "button",
                n.proxy(function (i) {
                    var r = n(i.target).parent().is(this._controls.$absolute) ? n(i.target).index() : n(i.target).parent().index();
                    i.preventDefault();
                    this.to(r, t.dotsSpeed);
                }, this)
            );
            for (i in this._overrides) this._core[i] = n.proxy(this[i], this);
        };
        t.prototype.destroy = function () {
            var t,
                n,
                i,
                r,
                u = this._core.settings;
            for (t in this._handlers) this.$element.off(t, this._handlers[t]);
            for (n in this._controls) "$relative" === n && u.navContainer ? this._controls[n].html("") : this._controls[n].remove();
            for (r in this.overides) this._core[r] = this._overrides[r];
            for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null);
        };
        t.prototype.update = function () {
            var t,
                i,
                f,
                r = this._core.clones().length / 2,
                o = r + this._core.items().length,
                u = this._core.maximum(!0),
                n = this._core.settings,
                e = n.center || n.autoWidth || n.dotsData ? 1 : n.dotsEach || n.items;
            if (("page" !== n.slideBy && (n.slideBy = Math.min(n.slideBy, n.items)), n.dots || "page" == n.slideBy))
                for (this._pages = [], t = r, i = 0, f = 0; t < o; t++) {
                    if (i >= e || 0 === i) {
                        if ((this._pages.push({ start: Math.min(u, t - r), end: t - r + e - 1 }), Math.min(u, t - r) === u)) break;
                        i = 0;
                        ++f;
                    }
                    i += this._core.mergers(this._core.relative(t));
                }
        };
        t.prototype.draw = function () {
            var i,
                t = this._core.settings,
                r = this._core.items().length <= t.items,
                u = this._core.relative(this._core.current()),
                f = t.loop || t.rewind;
            this._controls.$relative.toggleClass("disabled", !t.nav || r);
            t.nav && (this._controls.$previous.toggleClass("disabled", !f && u <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f && u >= this._core.maximum(!0)));
            this._controls.$absolute.toggleClass("disabled", !t.dots || r);
            t.dots &&
                ((i = this._pages.length - this._controls.$absolute.children().length),
                t.dotsData && 0 !== i
                    ? this._controls.$absolute.html(this._templates.join(""))
                    : i > 0
                    ? this._controls.$absolute.append(new Array(i + 1).join(this._templates[0]))
                    : i < 0 && this._controls.$absolute.children().slice(i).remove(),
                this._controls.$absolute.find(".active").removeClass("active"),
                this._controls.$absolute.children().eq(n.inArray(this.current(), this._pages)).addClass("active"));
        };
        t.prototype.onTrigger = function (t) {
            var i = this._core.settings;
            t.page = { index: n.inArray(this.current(), this._pages), count: this._pages.length, size: i && (i.center || i.autoWidth || i.dotsData ? 1 : i.dotsEach || i.items) };
        };
        t.prototype.current = function () {
            var t = this._core.relative(this._core.current());
            return n
                .grep(
                    this._pages,
                    n.proxy(function (n) {
                        return n.start <= t && n.end >= t;
                    }, this)
                )
                .pop();
        };
        t.prototype.getPosition = function (t) {
            var i,
                r,
                u = this._core.settings;
            return (
                "page" == u.slideBy
                    ? ((i = n.inArray(this.current(), this._pages)), (r = this._pages.length), t ? ++i : --i, (i = this._pages[((i % r) + r) % r].start))
                    : ((i = this._core.relative(this._core.current())), (r = this._core.items().length), t ? (i += u.slideBy) : (i -= u.slideBy)),
                i
            );
        };
        t.prototype.next = function (t) {
            n.proxy(this._overrides.to, this._core)(this.getPosition(!0), t);
        };
        t.prototype.prev = function (t) {
            n.proxy(this._overrides.to, this._core)(this.getPosition(!1), t);
        };
        t.prototype.to = function (t, i, r) {
            var u;
            !r && this._pages.length ? ((u = this._pages.length), n.proxy(this._overrides.to, this._core)(this._pages[((t % u) + u) % u].start, i)) : n.proxy(this._overrides.to, this._core)(t, i);
        };
        n.fn.owlCarousel.Constructor.Plugins.Navigation = t;
    })(window.Zepto || window.jQuery, window, document),
    (function (n, t, i, r) {
        "use strict";
        var u = function (i) {
            this._core = i;
            this._hashes = {};
            this.$element = this._core.$element;
            this._handlers = {
                "initialized.owl.carousel": n.proxy(function (i) {
                    i.namespace && "URLHash" === this._core.settings.startPosition && n(t).trigger("hashchange.owl.navigation");
                }, this),
                "prepared.owl.carousel": n.proxy(function (t) {
                    if (t.namespace) {
                        var i = n(t.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                        if (!i) return;
                        this._hashes[i] = t.content;
                    }
                }, this),
                "changed.owl.carousel": n.proxy(function (i) {
                    if (i.namespace && "position" === i.property.name) {
                        var u = this._core.items(this._core.relative(this._core.current())),
                            r = n
                                .map(this._hashes, function (n, t) {
                                    return n === u ? t : null;
                                })
                                .join();
                        if (!r || t.location.hash.slice(1) === r) return;
                        t.location.hash = r;
                    }
                }, this),
            };
            this._core.options = n.extend({}, u.Defaults, this._core.options);
            this.$element.on(this._handlers);
            n(t).on(
                "hashchange.owl.navigation",
                n.proxy(function () {
                    var i = t.location.hash.substring(1),
                        u = this._core.$stage.children(),
                        n = this._hashes[i] && u.index(this._hashes[i]);
                    n !== r && n !== this._core.current() && this._core.to(this._core.relative(n), !1, !0);
                }, this)
            );
        };
        u.Defaults = { URLhashListener: !1 };
        u.prototype.destroy = function () {
            var i, r;
            n(t).off("hashchange.owl.navigation");
            for (i in this._handlers) this._core.$element.off(i, this._handlers[i]);
            for (r in Object.getOwnPropertyNames(this)) "function" != typeof this[r] && (this[r] = null);
        };
        n.fn.owlCarousel.Constructor.Plugins.Hash = u;
    })(window.Zepto || window.jQuery, window, document),
    (function (n, t, i, r) {
        function u(t, i) {
            var u = !1,
                f = t.charAt(0).toUpperCase() + t.slice(1);
            return (
                n.each((t + " " + h.join(f + " ") + f).split(" "), function (n, t) {
                    if (s[t] !== r) return (u = !i || t), !1;
                }),
                u
            );
        }
        function e(n) {
            return u(n, !0);
        }
        var s = n("<support>").get(0).style,
            h = "Webkit Moz O ms".split(" "),
            o = {
                transition: { end: { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd", transition: "transitionend" } },
                animation: { end: { WebkitAnimation: "webkitAnimationEnd", MozAnimation: "animationend", OAnimation: "oAnimationEnd", animation: "animationend" } },
            },
            f = {
                csstransforms: function () {
                    return !!u("transform");
                },
                csstransforms3d: function () {
                    return !!u("perspective");
                },
                csstransitions: function () {
                    return !!u("transition");
                },
                cssanimations: function () {
                    return !!u("animation");
                },
            };
        f.csstransitions() && ((n.support.transition = new String(e("transition"))), (n.support.transition.end = o.transition.end[n.support.transition]));
        f.cssanimations() && ((n.support.animation = new String(e("animation"))), (n.support.animation.end = o.animation.end[n.support.animation]));
        f.csstransforms() && ((n.support.transform = new String(e("transform"))), (n.support.transform3d = f.csstransforms3d()));
    })(window.Zepto || window.jQuery, window, document);
!(function (n, t) {
    "object" == typeof exports && "undefined" != typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define(t) : (n.AOS = t());
})(this, function () {
    "use strict";
    function gt(n, t, i) {
        function b(t) {
            var i = e,
                r = o;
            return (e = o = void 0), (c = t), (h = n.apply(r, i));
        }
        function g(n) {
            var i = n - u;
            return void 0 === u || i >= t || i < 0 || (y && n - c >= a);
        }
        function p() {
            var n = s();
            if (g(n)) return nt(n);
            r = setTimeout(
                p,
                (function (n) {
                    var i = t - (n - u);
                    return y ? dt(i, a - (n - c)) : i;
                })(n)
            );
        }
        function nt(n) {
            return (r = void 0), w && e ? b(n) : ((e = o = void 0), h);
        }
        function k() {
            var n = s(),
                i = g(n);
            if (((e = arguments), (o = this), (u = n), i)) {
                if (void 0 === r)
                    return (function (n) {
                        return (c = n), (r = setTimeout(p, t)), d ? b(n) : h;
                    })(u);
                if (y) return (r = setTimeout(p, t)), b(u);
            }
            return void 0 === r && (r = setTimeout(p, t)), h;
        }
        var e,
            o,
            a,
            h,
            r,
            u,
            c = 0,
            d = !1,
            y = !1,
            w = !0;
        if ("function" != typeof n) throw new TypeError(l);
        return (
            (t = v(t) || 0),
            f(i) && ((d = !!i.leading), (a = (y = "maxWait" in i) ? kt(v(i.maxWait) || 0, t) : a), (w = "trailing" in i ? !!i.trailing : w)),
            (k.cancel = function () {
                void 0 !== r && clearTimeout(r);
                c = 0;
                e = u = o = r = void 0;
            }),
            (k.flush = function () {
                return void 0 === r ? h : nt(s());
            }),
            k
        );
    }
    function f(n) {
        var t = typeof n;
        return !!n && ("object" == t || "function" == t);
    }
    function v(n) {
        var t, i;
        return "number" == typeof n
            ? n
            : (function (n) {
                  return (
                      "symbol" == typeof n ||
                      ((function (n) {
                          return !!n && "object" == typeof n;
                      })(n) &&
                          bt.call(n) == st)
                  );
              })(n)
            ? a
            : (f(n) && ((t = "function" == typeof n.valueOf ? n.valueOf() : n), (n = f(t) ? t + "" : t)), "string" != typeof n)
            ? 0 === n
                ? n
                : +n
            : ((n = n.replace(ht, "")), (i = lt.test(n)), i || at.test(n) ? vt(n.slice(2), i ? 2 : 8) : ct.test(n) ? a : +n);
    }
    function c(n) {
        var t = typeof n;
        return !!n && ("object" == t || "function" == t);
    }
    function p(n) {
        var t, i;
        return "number" == typeof n
            ? n
            : (function (n) {
                  return (
                      "symbol" == typeof n ||
                      ((function (n) {
                          return !!n && "object" == typeof n;
                      })(n) &&
                          li.call(n) == ii)
                  );
              })(n)
            ? y
            : (c(n) && ((t = "function" == typeof n.valueOf ? n.valueOf() : n), (n = c(t) ? t + "" : t)), "string" != typeof n)
            ? 0 === n
                ? n
                : +n
            : ((n = n.replace(ri, "")), (i = fi.test(n)), i || ei.test(n) ? oi(n.slice(2), i ? 2 : 8) : ui.test(n) ? y : +n);
    }
    function yi(n) {
        n &&
            n.forEach(function (n) {
                var t = Array.prototype.slice.call(n.addedNodes),
                    i = Array.prototype.slice.call(n.removedNodes);
                if (
                    (function n(t) {
                        for (var i = void 0, r = void 0, i = 0; i < t.length; i += 1) if (((r = t[i]).dataset && r.dataset.aos) || (r.children && n(r.children))) return !0;
                        return !1;
                    })(t.concat(i))
                )
                    return b();
            });
    }
    function k() {
        return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    }
    function g() {
        return navigator.userAgent || navigator.vendor || window.opera || "";
    }
    var t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
        l = "Expected a function",
        a = NaN,
        st = "[object Symbol]",
        ht = /^\s+|\s+$/g,
        ct = /^[-+]0x[0-9a-f]+$/i,
        lt = /^0b[01]+$/i,
        at = /^0o[0-7]+$/i,
        vt = parseInt,
        yt = "object" == typeof t && t && t.Object === Object && t,
        pt = "object" == typeof self && self && self.Object === Object && self,
        wt = yt || pt || Function("return this")(),
        bt = Object.prototype.toString,
        kt = Math.max,
        dt = Math.min,
        s = function () {
            return wt.Date.now();
        },
        ni = function (n, t, i) {
            var r = !0,
                u = !0;
            if ("function" != typeof n) throw new TypeError(l);
            return f(i) && ((r = "leading" in i ? !!i.leading : r), (u = "trailing" in i ? !!i.trailing : u)), gt(n, t, { leading: r, maxWait: t, trailing: u });
        },
        ti = "Expected a function",
        y = NaN,
        ii = "[object Symbol]",
        ri = /^\s+|\s+$/g,
        ui = /^[-+]0x[0-9a-f]+$/i,
        fi = /^0b[01]+$/i,
        ei = /^0o[0-7]+$/i,
        oi = parseInt,
        si = "object" == typeof t && t && t.Object === Object && t,
        hi = "object" == typeof self && self && self.Object === Object && self,
        ci = si || hi || Function("return this")(),
        li = Object.prototype.toString,
        ai = Math.max,
        vi = Math.min,
        h = function () {
            return ci.Date.now();
        },
        w = function (n, t, i) {
            function w(t) {
                var i = f,
                    r = e;
                return (f = e = void 0), (s = t), (o = n.apply(r, i));
            }
            function d(n) {
                var i = n - u;
                return void 0 === u || i >= t || i < 0 || (a && n - s >= l);
            }
            function v() {
                var n = h();
                if (d(n)) return g(n);
                r = setTimeout(
                    v,
                    (function (n) {
                        var i = t - (n - u);
                        return a ? vi(i, l - (n - s)) : i;
                    })(n)
                );
            }
            function g(n) {
                return (r = void 0), y && f ? w(n) : ((f = e = void 0), o);
            }
            function b() {
                var n = h(),
                    i = d(n);
                if (((f = arguments), (e = this), (u = n), i)) {
                    if (void 0 === r)
                        return (function (n) {
                            return (s = n), (r = setTimeout(v, t)), k ? w(n) : o;
                        })(u);
                    if (a) return (r = setTimeout(v, t)), w(u);
                }
                return void 0 === r && (r = setTimeout(v, t)), o;
            }
            var f,
                e,
                l,
                o,
                r,
                u,
                s = 0,
                k = !1,
                a = !1,
                y = !0;
            if ("function" != typeof n) throw new TypeError(ti);
            return (
                (t = p(t) || 0),
                c(i) && ((k = !!i.leading), (l = (a = "maxWait" in i) ? ai(p(i.maxWait) || 0, t) : l), (y = "trailing" in i ? !!i.trailing : y)),
                (b.cancel = function () {
                    void 0 !== r && clearTimeout(r);
                    s = 0;
                    f = u = e = r = void 0;
                }),
                (b.flush = function () {
                    return void 0 === r ? o : g(h());
                }),
                b
            );
        },
        b = function () {},
        d = {
            isSupported: function () {
                return !!k();
            },
            ready: function (n, t) {
                var i = window.document,
                    r = new (k())(yi);
                b = t;
                r.observe(i.documentElement, { childList: !0, subtree: !0, removedNodes: !0 });
            },
        },
        pi = function (n, t) {
            if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function");
        },
        wi = (function () {
            function n(n, t) {
                for (var i, r = 0; r < t.length; r++) (i = t[r]), (i.enumerable = i.enumerable || !1), (i.configurable = !0), "value" in i && (i.writable = !0), Object.defineProperty(n, i.key, i);
            }
            return function (t, i, r) {
                return i && n(t.prototype, i), r && n(t, r), t;
            };
        })(),
        bi =
            Object.assign ||
            function (n) {
                for (var i, r, t = 1; t < arguments.length; t++) {
                    i = arguments[t];
                    for (r in i) Object.prototype.hasOwnProperty.call(i, r) && (n[r] = i[r]);
                }
                return n;
            },
        ki = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
        di = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
        gi = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
        nr = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
        e = new ((function () {
            function n() {
                pi(this, n);
            }
            return (
                wi(n, [
                    {
                        key: "phone",
                        value: function () {
                            var n = g();
                            return !(!ki.test(n) && !di.test(n.substr(0, 4)));
                        },
                    },
                    {
                        key: "mobile",
                        value: function () {
                            var n = g();
                            return !(!gi.test(n) && !nr.test(n.substr(0, 4)));
                        },
                    },
                    {
                        key: "tablet",
                        value: function () {
                            return this.mobile() && !this.phone();
                        },
                    },
                    {
                        key: "ie11",
                        value: function () {
                            return "-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style;
                        },
                    },
                ]),
                n
            );
        })())(),
        o = function (n, t) {
            var i = void 0;
            return e.ie11() ? (i = document.createEvent("CustomEvent")).initCustomEvent(n, !0, !0, { detail: t }) : (i = new CustomEvent(n, { detail: t })), document.dispatchEvent(i);
        },
        nt = function (n) {
            return n.forEach(function (n) {
                return (function (n, t) {
                    var r = n.options,
                        u = n.position,
                        i = n.node,
                        f =
                            (n.data,
                            function () {
                                n.animated &&
                                    ((function (n, t) {
                                        t &&
                                            t.forEach(function (t) {
                                                return n.classList.remove(t);
                                            });
                                    })(i, r.animatedClassNames),
                                    o("aos:out", i),
                                    n.options.id && o("aos:in:" + n.options.id, i),
                                    (n.animated = !1));
                            });
                    r.mirror && t >= u.out && !r.once
                        ? f()
                        : t >= u.in
                        ? n.animated ||
                          ((function (n, t) {
                              t &&
                                  t.forEach(function (t) {
                                      return n.classList.add(t);
                                  });
                          })(i, r.animatedClassNames),
                          o("aos:in", i),
                          n.options.id && o("aos:in:" + n.options.id, i),
                          (n.animated = !0))
                        : n.animated && !r.once && f();
                })(n, window.pageYOffset);
            });
        },
        tt = function (n) {
            for (var t = 0, i = 0; n && !isNaN(n.offsetLeft) && !isNaN(n.offsetTop); ) (t += n.offsetLeft - ("BODY" != n.tagName ? n.scrollLeft : 0)), (i += n.offsetTop - ("BODY" != n.tagName ? n.scrollTop : 0)), (n = n.offsetParent);
            return { top: i, left: t };
        },
        i = function (n, t, i) {
            var r = n.getAttribute("data-aos-" + t);
            if (void 0 !== r) {
                if ("true" === r) return !0;
                if ("false" === r) return !1;
            }
            return r || i;
        },
        tr = function (n, t) {
            return (
                n.forEach(function (n) {
                    var r = i(n.node, "mirror", t.mirror),
                        f = i(n.node, "once", t.once),
                        e = i(n.node, "id"),
                        u = t.useClassNames && n.node.getAttribute("data-aos"),
                        o = [t.animatedClassName].concat(u ? u.split(" ") : []).filter(function (n) {
                            return "string" == typeof n;
                        });
                    t.initClassName && n.node.classList.add(t.initClassName);
                    n.position = {
                        in: (function (n, t, r) {
                            var e = window.innerHeight,
                                o = i(n, "anchor"),
                                s = i(n, "anchor-placement"),
                                h = Number(i(n, "offset", s ? 0 : t)),
                                c = s || r,
                                f = n,
                                u;
                            o && document.querySelectorAll(o) && (f = document.querySelectorAll(o)[0]);
                            u = tt(f).top - e;
                            switch (c) {
                                case "center-bottom":
                                    u += f.offsetHeight / 2;
                                    break;
                                case "bottom-bottom":
                                    u += f.offsetHeight;
                                    break;
                                case "top-center":
                                    u += e / 2;
                                    break;
                                case "center-center":
                                    u += e / 2 + f.offsetHeight / 2;
                                    break;
                                case "bottom-center":
                                    u += e / 2 + f.offsetHeight;
                                    break;
                                case "top-top":
                                    u += e;
                                    break;
                                case "bottom-top":
                                    u += e + f.offsetHeight;
                                    break;
                                case "center-top":
                                    u += e + f.offsetHeight / 2;
                            }
                            return u + h;
                        })(n.node, t.offset, t.anchorPlacement),
                        out:
                            r &&
                            (function (n, t) {
                                window.innerHeight;
                                var r = i(n, "anchor"),
                                    f = i(n, "offset", t),
                                    u = n;
                                return r && document.querySelectorAll(r) && (u = document.querySelectorAll(r)[0]), tt(u).top + u.offsetHeight - f;
                            })(n.node, t.offset),
                    };
                    n.options = { once: f, mirror: r, animatedClassNames: o, id: e };
                }),
                n
            );
        },
        it = function () {
            var n = document.querySelectorAll("[data-aos]");
            return Array.prototype.map.call(n, function (n) {
                return { node: n };
            });
        },
        r = [],
        rt = !1,
        n = {
            offset: 120,
            delay: 0,
            easing: "ease",
            duration: 400,
            disable: !1,
            once: !1,
            mirror: !1,
            anchorPlacement: "top-bottom",
            startEvent: "DOMContentLoaded",
            animatedClassName: "aos-animate",
            initClassName: "aos-init",
            useClassNames: !1,
            disableMutationObserver: !1,
            throttleDelay: 99,
            debounceDelay: 50,
        },
        ut = function () {
            return document.all && !window.atob;
        },
        u = function () {
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0] && (rt = !0);
            rt &&
                ((r = tr(r, n)),
                nt(r),
                window.addEventListener(
                    "scroll",
                    ni(function () {
                        nt(r, n.once);
                    }, n.throttleDelay)
                ));
        },
        ft = function () {
            if (((r = it()), ot(n.disable) || ut())) return et();
            u();
        },
        et = function () {
            r.forEach(function (t) {
                t.node.removeAttribute("data-aos");
                t.node.removeAttribute("data-aos-easing");
                t.node.removeAttribute("data-aos-duration");
                t.node.removeAttribute("data-aos-delay");
                n.initClassName && t.node.classList.remove(n.initClassName);
                n.animatedClassName && t.node.classList.remove(n.animatedClassName);
            });
        },
        ot = function (n) {
            return !0 === n || ("mobile" === n && e.mobile()) || ("phone" === n && e.phone()) || ("tablet" === n && e.tablet()) || ("function" == typeof n && !0 === n());
        };
    return {
        init: function (t) {
            return (
                (n = bi(n, t)),
                (r = it()),
                n.disableMutationObserver ||
                    d.isSupported() ||
                    (console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '),
                    (n.disableMutationObserver = !0)),
                n.disableMutationObserver || d.ready("[data-aos]", ft),
                ot(n.disable) || ut()
                    ? et()
                    : (document.querySelector("body").setAttribute("data-aos-easing", n.easing),
                      document.querySelector("body").setAttribute("data-aos-duration", n.duration),
                      document.querySelector("body").setAttribute("data-aos-delay", n.delay),
                      -1 === ["DOMContentLoaded", "load"].indexOf(n.startEvent)
                          ? document.addEventListener(n.startEvent, function () {
                                u(!0);
                            })
                          : window.addEventListener("load", function () {
                                u(!0);
                            }),
                      "DOMContentLoaded" === n.startEvent && ["complete", "interactive"].indexOf(document.readyState) > -1 && u(!0),
                      window.addEventListener("resize", w(u, n.debounceDelay, !0)),
                      window.addEventListener("orientationchange", w(u, n.debounceDelay, !0)),
                      r)
            );
        },
        refresh: u,
        refreshHard: ft,
    };
});
!(function (n) {
    "function" == typeof define && define.amd
        ? define(["jquery"], n)
        : "object" == typeof module && module.exports
        ? (module.exports = function (t, i) {
              return void 0 === i && (i = "undefined" != typeof window ? require("jquery") : require("jquery")(t)), n(i), i;
          })
        : n(jQuery);
})(function (n) {
    var t = (function () {
            function u(n, t) {
                return d.call(n, t);
            }
            function l(n, t) {
                var e,
                    o,
                    s,
                    f,
                    h,
                    y,
                    c,
                    p,
                    i,
                    l,
                    b,
                    u = t && t.split("/"),
                    a = r.map,
                    v = (a && a["*"]) || {};
                if (n) {
                    for (h = (n = n.split("/")).length - 1, r.nodeIdCompat && w.test(n[h]) && (n[h] = n[h].replace(w, "")), "." === n[0].charAt(0) && u && (n = u.slice(0, u.length - 1).concat(n)), i = 0; i < n.length; i++)
                        if ("." === (b = n[i])) n.splice(i, 1), (i -= 1);
                        else if (".." === b) {
                            if (0 === i || (1 === i && ".." === n[2]) || ".." === n[i - 1]) continue;
                            0 < i && (n.splice(i - 1, 2), (i -= 2));
                        }
                    n = n.join("/");
                }
                if ((u || v) && a) {
                    for (i = (e = n.split("/")).length; 0 < i; i -= 1) {
                        if (((o = e.slice(0, i).join("/")), u))
                            for (l = u.length; 0 < l; l -= 1)
                                if ((s = (s = a[u.slice(0, l).join("/")]) && s[o])) {
                                    f = s;
                                    y = i;
                                    break;
                                }
                        if (f) break;
                        !c && v && v[o] && ((c = v[o]), (p = i));
                    }
                    !f && c && ((f = c), (y = p));
                    f && (e.splice(0, y, f), (n = e.join("/")));
                }
                return n;
            }
            function nt(n, t) {
                return function () {
                    var i = g.call(arguments, 0);
                    return "string" != typeof i[0] && 1 === i.length && i.push(null), o.apply(f, i.concat([n, t]));
                };
            }
            function it(n) {
                return function (t) {
                    i[n] = t;
                };
            }
            function a(n) {
                if (u(e, n)) {
                    var t = e[n];
                    delete e[n];
                    c[n] = !0;
                    h.apply(f, t);
                }
                if (!u(i, n) && !u(c, n)) throw new Error("No " + n);
                return i[n];
            }
            function b(n) {
                var i,
                    t = n ? n.indexOf("!") : -1;
                return -1 < t && ((i = n.substring(0, t)), (n = n.substring(t + 1, n.length))), [i, n];
            }
            function tt(n) {
                return n ? b(n) : [];
            }
            var t, v, y, k, f, h, o, p, s, i, e, r, c, d, g, w;
            return (
                n && n.fn && n.fn.select2 && n.fn.select2.amd && (t = n.fn.select2.amd),
                (t && t.requirejs) ||
                    (t ? (y = t) : (t = {}),
                    (i = {}),
                    (e = {}),
                    (r = {}),
                    (c = {}),
                    (d = Object.prototype.hasOwnProperty),
                    (g = [].slice),
                    (w = /\.js$/),
                    (p = function (n, t) {
                        var r,
                            u = b(n),
                            i = u[0],
                            f = t[1];
                        return (
                            (n = u[1]),
                            i && (r = a((i = l(i, f)))),
                            i
                                ? (n =
                                      r && r.normalize
                                          ? r.normalize(
                                                n,
                                                (function (n) {
                                                    return function (t) {
                                                        return l(t, n);
                                                    };
                                                })(f)
                                            )
                                          : l(n, f))
                                : ((i = (u = b((n = l(n, f))))[0]), (n = u[1]), i && (r = a(i))),
                            { f: i ? i + "!" + n : n, n: n, pr: i, p: r }
                        );
                    }),
                    (s = {
                        require: function (n) {
                            return nt(n);
                        },
                        exports: function (n) {
                            var t = i[n];
                            return void 0 !== t ? t : (i[n] = {});
                        },
                        module: function (n) {
                            return {
                                id: n,
                                uri: "",
                                exports: i[n],
                                config: (function (n) {
                                    return function () {
                                        return (r && r.config && r.config[n]) || {};
                                    };
                                })(n),
                            };
                        },
                    }),
                    (h = function (n, t, r, o) {
                        var y,
                            h,
                            b,
                            w,
                            l,
                            k,
                            d,
                            v = [],
                            g = typeof r;
                        if (((k = tt((o = o || n))), "undefined" == g || "function" == g)) {
                            for (t = !t.length && r.length ? ["require", "exports", "module"] : t, l = 0; l < t.length; l += 1)
                                if ("require" === (h = (w = p(t[l], k)).f)) v[l] = s.require(n);
                                else if ("exports" === h) (v[l] = s.exports(n)), (d = !0);
                                else if ("module" === h) y = v[l] = s.module(n);
                                else if (u(i, h) || u(e, h) || u(c, h)) v[l] = a(h);
                                else {
                                    if (!w.p) throw new Error(n + " missing " + h);
                                    w.p.load(w.n, nt(o, !0), it(h), {});
                                    v[l] = i[h];
                                }
                            b = r ? r.apply(i[n], v) : void 0;
                            n && (y && y.exports !== f && y.exports !== i[n] ? (i[n] = y.exports) : (b === f && d) || (i[n] = b));
                        } else n && (i[n] = r);
                    }),
                    (v = y = o = function (n, t, i, u, e) {
                        if ("string" == typeof n) return s[n] ? s[n](t) : a(p(n, tt(t)).f);
                        if (!n.splice) {
                            if (((r = n).deps && o(r.deps, r.callback), !t)) return;
                            t.splice ? ((n = t), (t = i), (i = null)) : (n = f);
                        }
                        return (
                            (t = t || function () {}),
                            "function" == typeof i && ((i = u), (u = e)),
                            u
                                ? h(f, n, t, i)
                                : setTimeout(function () {
                                      h(f, n, t, i);
                                  }, 4),
                            o
                        );
                    }),
                    (o.config = function (n) {
                        return o(n);
                    }),
                    (v._defined = i),
                    ((k = function (n, t, r) {
                        if ("string" != typeof n) throw new Error("See almond README: incorrect module build, no module name");
                        t.splice || ((r = t), (t = []));
                        u(i, n) || u(e, n) || (e[n] = [n, t, r]);
                    }).amd = { jQuery: !0 }),
                    (t.requirejs = v),
                    (t.require = y),
                    (t.define = k)),
                t.define("almond", function () {}),
                t.define("jquery", [], function () {
                    var t = n || $;
                    return null == t && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."), t;
                }),
                t.define("select2/utils", ["jquery"], function (n) {
                    function r(n) {
                        var i = n.prototype,
                            r = [],
                            t;
                        for (t in i) "function" == typeof i[t] && "constructor" !== t && r.push(t);
                        return r;
                    }
                    function i() {
                        this.listeners = {};
                    }
                    var t = {},
                        u;
                    return (
                        (t.Extend = function (n, t) {
                            function r() {
                                this.constructor = n;
                            }
                            var u = {}.hasOwnProperty,
                                i;
                            for (i in t) u.call(t, i) && (n[i] = t[i]);
                            return (r.prototype = t.prototype), (n.prototype = new r()), (n.__super__ = t.prototype), n;
                        }),
                        (t.Decorate = function (n, t) {
                            function i() {
                                var r = Array.prototype.unshift,
                                    u = t.prototype.constructor.length,
                                    i = n.prototype.constructor;
                                0 < u && (r.call(arguments, n.prototype.constructor), (i = t.prototype.constructor));
                                i.apply(this, arguments);
                            }
                            function c(n) {
                                var r = function () {},
                                    u;
                                return (
                                    n in i.prototype && (r = i.prototype[n]),
                                    (u = t.prototype[n]),
                                    function () {
                                        return Array.prototype.unshift.call(arguments, r), u.apply(this, arguments);
                                    }
                                );
                            }
                            var s = r(t),
                                h = r(n),
                                u,
                                e,
                                f,
                                o;
                            for (
                                t.displayName = n.displayName,
                                    i.prototype = new (function () {
                                        this.constructor = i;
                                    })(),
                                    u = 0;
                                u < h.length;
                                u++
                            )
                                (e = h[u]), (i.prototype[e] = n.prototype[e]);
                            for (f = 0; f < s.length; f++) (o = s[f]), (i.prototype[o] = c(o));
                            return i;
                        }),
                        (i.prototype.on = function (n, t) {
                            this.listeners = this.listeners || {};
                            n in this.listeners ? this.listeners[n].push(t) : (this.listeners[n] = [t]);
                        }),
                        (i.prototype.trigger = function (n) {
                            var i = Array.prototype.slice,
                                t = i.call(arguments, 1);
                            this.listeners = this.listeners || {};
                            null == t && (t = []);
                            0 === t.length && t.push({});
                            (t[0]._type = n) in this.listeners && this.invoke(this.listeners[n], i.call(arguments, 1));
                            "*" in this.listeners && this.invoke(this.listeners["*"], arguments);
                        }),
                        (i.prototype.invoke = function (n, t) {
                            for (var i = 0, r = n.length; i < r; i++) n[i].apply(this, t);
                        }),
                        (t.Observable = i),
                        (t.generateChars = function (n) {
                            for (var t = "", i = 0; i < n; i++) t += Math.floor(36 * Math.random()).toString(36);
                            return t;
                        }),
                        (t.bind = function (n, t) {
                            return function () {
                                n.apply(t, arguments);
                            };
                        }),
                        (t._convertData = function (n) {
                            var f, r, i, u, t;
                            for (f in n)
                                if (((r = f.split("-")), (i = n), 1 !== r.length)) {
                                    for (u = 0; u < r.length; u++) (t = r[u]), (t = t.substring(0, 1).toLowerCase() + t.substring(1)) in i || (i[t] = {}), u == r.length - 1 && (i[t] = n[f]), (i = i[t]);
                                    delete n[f];
                                }
                            return n;
                        }),
                        (t.hasScroll = function (t, i) {
                            var u = n(i),
                                f = i.style.overflowX,
                                r = i.style.overflowY;
                            return (f !== r || ("hidden" !== r && "visible" !== r)) && ("scroll" === f || "scroll" === r || u.innerHeight() < i.scrollHeight || u.innerWidth() < i.scrollWidth);
                        }),
                        (t.escapeMarkup = function (n) {
                            var t = { "\\": "&#92;", "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#47;" };
                            return "string" != typeof n
                                ? n
                                : String(n).replace(/[&<>"'\/\\]/g, function (n) {
                                      return t[n];
                                  });
                        }),
                        (t.__cache = {}),
                        (u = 0),
                        (t.GetUniqueElementId = function (n) {
                            var i = n.getAttribute("data-select2-id");
                            return null != i || ((i = n.id ? "select2-data-" + n.id : "select2-data-" + (++u).toString() + "-" + t.generateChars(4)), n.setAttribute("data-select2-id", i)), i;
                        }),
                        (t.StoreData = function (n, i, r) {
                            var u = t.GetUniqueElementId(n);
                            t.__cache[u] || (t.__cache[u] = {});
                            t.__cache[u][i] = r;
                        }),
                        (t.GetData = function (i, r) {
                            var u = t.GetUniqueElementId(i);
                            return r ? (t.__cache[u] && null != t.__cache[u][r] ? t.__cache[u][r] : n(i).data(r)) : t.__cache[u];
                        }),
                        (t.RemoveData = function (n) {
                            var i = t.GetUniqueElementId(n);
                            null != t.__cache[i] && delete t.__cache[i];
                            n.removeAttribute("data-select2-id");
                        }),
                        (t.copyNonInternalCssClasses = function (n, t) {
                            var r = n.getAttribute("class").trim().split(/\s+/),
                                i,
                                u;
                            r = r.filter(function (n) {
                                return 0 === n.indexOf("select2-");
                            });
                            i = t.getAttribute("class").trim().split(/\s+/);
                            i = i.filter(function (n) {
                                return 0 !== n.indexOf("select2-");
                            });
                            u = r.concat(i);
                            n.setAttribute("class", u.join(" "));
                        }),
                        t
                    );
                }),
                t.define("select2/results", ["jquery", "./utils"], function (n, t) {
                    function i(n, t, r) {
                        this.$element = n;
                        this.data = r;
                        this.options = t;
                        i.__super__.constructor.call(this);
                    }
                    return (
                        t.Extend(i, t.Observable),
                        (i.prototype.render = function () {
                            var t = n('<ul class="select2-results__options" role="listbox"></ul>');
                            return this.options.get("multiple") && t.attr("aria-multiselectable", "true"), (this.$results = t);
                        }),
                        (i.prototype.clear = function () {
                            this.$results.empty();
                        }),
                        (i.prototype.displayMessage = function (t) {
                            var u = this.options.get("escapeMarkup"),
                                i,
                                r;
                            this.clear();
                            this.hideLoading();
                            i = n('<li role="alert" aria-live="assertive" class="select2-results__option"></li>');
                            r = this.options.get("translations").get(t.message);
                            i.append(u(r(t.args)));
                            i[0].className += " select2-results__message";
                            this.$results.append(i);
                        }),
                        (i.prototype.hideMessages = function () {
                            this.$results.find(".select2-results__message").remove();
                        }),
                        (i.prototype.append = function (n) {
                            var i, t, r, u;
                            if ((this.hideLoading(), (i = []), null != n.results && 0 !== n.results.length)) {
                                for (n.results = this.sort(n.results), t = 0; t < n.results.length; t++) (r = n.results[t]), (u = this.option(r)), i.push(u);
                                this.$results.append(i);
                            } else 0 === this.$results.children().length && this.trigger("results:message", { message: "noResults" });
                        }),
                        (i.prototype.position = function (n, t) {
                            t.find(".select2-results").append(n);
                        }),
                        (i.prototype.sort = function (n) {
                            return this.options.get("sorter")(n);
                        }),
                        (i.prototype.highlightFirstItem = function () {
                            var n = this.$results.find(".select2-results__option--selectable"),
                                t = n.filter(".select2-results__option--selected");
                            0 < t.length ? t.first().trigger("mouseenter") : n.first().trigger("mouseenter");
                            this.ensureHighlightVisible();
                        }),
                        (i.prototype.setClasses = function () {
                            var i = this;
                            this.data.current(function (r) {
                                var u = r.map(function (n) {
                                    return n.id.toString();
                                });
                                i.$results.find(".select2-results__option--selectable").each(function () {
                                    var r = n(this),
                                        i = t.GetData(this, "data"),
                                        f = "" + i.id;
                                    (null != i.element && i.element.selected) || (null == i.element && -1 < u.indexOf(f))
                                        ? (this.classList.add("select2-results__option--selected"), r.attr("aria-selected", "true"))
                                        : (this.classList.remove("select2-results__option--selected"), r.attr("aria-selected", "false"));
                                });
                            });
                        }),
                        (i.prototype.showLoading = function (n) {
                            this.hideLoading();
                            var i = { disabled: !0, loading: !0, text: this.options.get("translations").get("searching")(n) },
                                t = this.option(i);
                            t.className += " loading-results";
                            this.$results.prepend(t);
                        }),
                        (i.prototype.hideLoading = function () {
                            this.$results.find(".loading-results").remove();
                        }),
                        (i.prototype.option = function (i) {
                            var r = document.createElement("li"),
                                u,
                                l,
                                o,
                                a,
                                s,
                                f,
                                h,
                                e,
                                v,
                                y,
                                c;
                            r.classList.add("select2-results__option");
                            r.classList.add("select2-results__option--selectable");
                            u = { role: "option" };
                            l = window.Element.prototype.matches || window.Element.prototype.msMatchesSelector || window.Element.prototype.webkitMatchesSelector;
                            for (o in (((null != i.element && l.call(i.element, ":disabled")) || (null == i.element && i.disabled)) &&
                                ((u["aria-disabled"] = "true"), r.classList.remove("select2-results__option--selectable"), r.classList.add("select2-results__option--disabled")),
                            null == i.id && r.classList.remove("select2-results__option--selectable"),
                            null != i._resultId && (r.id = i._resultId),
                            i.title && (r.title = i.title),
                            i.children && ((u.role = "group"), (u["aria-label"] = i.text), r.classList.remove("select2-results__option--selectable"), r.classList.add("select2-results__option--group")),
                            u))
                                (a = u[o]), r.setAttribute(o, a);
                            if (i.children) {
                                for (s = n(r), f = document.createElement("strong"), f.className = "select2-results__group", this.template(i, f), h = [], e = 0; e < i.children.length; e++)
                                    (v = i.children[e]), (y = this.option(v)), h.push(y);
                                c = n("<ul></ul>", { class: "select2-results__options select2-results__options--nested" });
                                c.append(h);
                                s.append(f);
                                s.append(c);
                            } else this.template(i, r);
                            return t.StoreData(r, "data", i), r;
                        }),
                        (i.prototype.bind = function (i) {
                            var r = this,
                                u = i.id + "-results";
                            this.$results.attr("id", u);
                            i.on("results:all", function (n) {
                                r.clear();
                                r.append(n.data);
                                i.isOpen() && (r.setClasses(), r.highlightFirstItem());
                            });
                            i.on("results:append", function (n) {
                                r.append(n.data);
                                i.isOpen() && r.setClasses();
                            });
                            i.on("query", function (n) {
                                r.hideMessages();
                                r.showLoading(n);
                            });
                            i.on("select", function () {
                                i.isOpen() && (r.setClasses(), r.options.get("scrollAfterSelect") && r.highlightFirstItem());
                            });
                            i.on("unselect", function () {
                                i.isOpen() && (r.setClasses(), r.options.get("scrollAfterSelect") && r.highlightFirstItem());
                            });
                            i.on("open", function () {
                                r.$results.attr("aria-expanded", "true");
                                r.$results.attr("aria-hidden", "false");
                                r.setClasses();
                                r.ensureHighlightVisible();
                            });
                            i.on("close", function () {
                                r.$results.attr("aria-expanded", "false");
                                r.$results.attr("aria-hidden", "true");
                                r.$results.removeAttr("aria-activedescendant");
                            });
                            i.on("results:toggle", function () {
                                var n = r.getHighlightedResults();
                                0 !== n.length && n.trigger("mouseup");
                            });
                            i.on("results:select", function () {
                                var n = r.getHighlightedResults(),
                                    i;
                                0 !== n.length && ((i = t.GetData(n[0], "data")), n.hasClass("select2-results__option--selected") ? r.trigger("close", {}) : r.trigger("select", { data: i }));
                            });
                            i.on("results:previous", function () {
                                var i = r.getHighlightedResults(),
                                    u = r.$results.find(".select2-results__option--selectable"),
                                    f = u.index(i),
                                    n,
                                    t;
                                if (!(f <= 0)) {
                                    n = f - 1;
                                    0 === i.length && (n = 0);
                                    t = u.eq(n);
                                    t.trigger("mouseenter");
                                    var e = r.$results.offset().top,
                                        o = t.offset().top,
                                        s = r.$results.scrollTop() + (o - e);
                                    0 === n ? r.$results.scrollTop(0) : o - e < 0 && r.$results.scrollTop(s);
                                }
                            });
                            i.on("results:next", function () {
                                var e = r.getHighlightedResults(),
                                    t = r.$results.find(".select2-results__option--selectable"),
                                    i = t.index(e) + 1,
                                    n;
                                if (!(i >= t.length)) {
                                    n = t.eq(i);
                                    n.trigger("mouseenter");
                                    var u = r.$results.offset().top + r.$results.outerHeight(!1),
                                        f = n.offset().top + n.outerHeight(!1),
                                        o = r.$results.scrollTop() + f - u;
                                    0 === i ? r.$results.scrollTop(0) : u < f && r.$results.scrollTop(o);
                                }
                            });
                            i.on("results:focus", function (n) {
                                n.element[0].classList.add("select2-results__option--highlighted");
                                n.element[0].setAttribute("aria-selected", "true");
                            });
                            i.on("results:message", function (n) {
                                r.displayMessage(n);
                            });
                            n.fn.mousewheel &&
                                this.$results.on("mousewheel", function (n) {
                                    var t = r.$results.scrollTop(),
                                        i = r.$results.get(0).scrollHeight - t + n.deltaY,
                                        u = 0 < n.deltaY && t - n.deltaY <= 0,
                                        f = n.deltaY < 0 && i <= r.$results.height();
                                    u ? (r.$results.scrollTop(0), n.preventDefault(), n.stopPropagation()) : f && (r.$results.scrollTop(r.$results.get(0).scrollHeight - r.$results.height()), n.preventDefault(), n.stopPropagation());
                                });
                            this.$results.on("mouseup", ".select2-results__option--selectable", function (i) {
                                var f = n(this),
                                    u = t.GetData(this, "data");
                                f.hasClass("select2-results__option--selected")
                                    ? r.options.get("multiple")
                                        ? r.trigger("unselect", { originalEvent: i, data: u })
                                        : r.trigger("close", {})
                                    : r.trigger("select", { originalEvent: i, data: u });
                            });
                            this.$results.on("mouseenter", ".select2-results__option--selectable", function () {
                                var i = t.GetData(this, "data");
                                r.getHighlightedResults().removeClass("select2-results__option--highlighted").attr("aria-selected", "false");
                                r.trigger("results:focus", { data: i, element: n(this) });
                            });
                        }),
                        (i.prototype.getHighlightedResults = function () {
                            return this.$results.find(".select2-results__option--highlighted");
                        }),
                        (i.prototype.destroy = function () {
                            this.$results.remove();
                        }),
                        (i.prototype.ensureHighlightVisible = function () {
                            var n = this.getHighlightedResults();
                            if (0 !== n.length) {
                                var f = this.$results.find(".select2-results__option--selectable").index(n),
                                    t = this.$results.offset().top,
                                    i = n.offset().top,
                                    r = this.$results.scrollTop() + (i - t),
                                    u = i - t;
                                r -= 2 * n.outerHeight(!1);
                                f <= 2 ? this.$results.scrollTop(0) : (u > this.$results.outerHeight() || u < 0) && this.$results.scrollTop(r);
                            }
                        }),
                        (i.prototype.template = function (t, i) {
                            var u = this.options.get("templateResult"),
                                f = this.options.get("escapeMarkup"),
                                r = u(t, i);
                            null == r ? (i.style.display = "none") : "string" == typeof r ? (i.innerHTML = f(r)) : n(i).append(r);
                        }),
                        i
                    );
                }),
                t.define("select2/keys", [], function () {
                    return { BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESC: 27, SPACE: 32, PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46 };
                }),
                t.define("select2/selection/base", ["jquery", "../utils", "../keys"], function (n, t, i) {
                    function r(n, t) {
                        this.$element = n;
                        this.options = t;
                        r.__super__.constructor.call(this);
                    }
                    return (
                        t.Extend(r, t.Observable),
                        (r.prototype.render = function () {
                            var i = n('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');
                            return (
                                (this._tabindex = 0),
                                null != t.GetData(this.$element[0], "old-tabindex")
                                    ? (this._tabindex = t.GetData(this.$element[0], "old-tabindex"))
                                    : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")),
                                i.attr("title", this.$element.attr("title")),
                                i.attr("tabindex", this._tabindex),
                                i.attr("aria-disabled", "false"),
                                (this.$selection = i)
                            );
                        }),
                        (r.prototype.bind = function (n) {
                            var t = this,
                                r = n.id + "-results";
                            this.container = n;
                            this.$selection.on("focus", function (n) {
                                t.trigger("focus", n);
                            });
                            this.$selection.on("blur", function (n) {
                                t._handleBlur(n);
                            });
                            this.$selection.on("keydown", function (n) {
                                t.trigger("keypress", n);
                                n.which === i.SPACE && n.preventDefault();
                            });
                            n.on("results:focus", function (n) {
                                t.$selection.attr("aria-activedescendant", n.data._resultId);
                            });
                            n.on("selection:update", function (n) {
                                t.update(n.data);
                            });
                            n.on("open", function () {
                                t.$selection.attr("aria-expanded", "true");
                                t.$selection.attr("aria-owns", r);
                                t._attachCloseHandler(n);
                            });
                            n.on("close", function () {
                                t.$selection.attr("aria-expanded", "false");
                                t.$selection.removeAttr("aria-activedescendant");
                                t.$selection.removeAttr("aria-owns");
                                t.$selection.trigger("focus");
                                t._detachCloseHandler(n);
                            });
                            n.on("enable", function () {
                                t.$selection.attr("tabindex", t._tabindex);
                                t.$selection.attr("aria-disabled", "false");
                            });
                            n.on("disable", function () {
                                t.$selection.attr("tabindex", "-1");
                                t.$selection.attr("aria-disabled", "true");
                            });
                        }),
                        (r.prototype._handleBlur = function (t) {
                            var i = this;
                            window.setTimeout(function () {
                                document.activeElement == i.$selection[0] || n.contains(i.$selection[0], document.activeElement) || i.trigger("blur", t);
                            }, 1);
                        }),
                        (r.prototype._attachCloseHandler = function (i) {
                            n(document.body).on("mousedown.select2." + i.id, function (i) {
                                var r = n(i.target).closest(".select2");
                                n(".select2.select2-container--open").each(function () {
                                    this != r[0] && t.GetData(this, "element").select2("close");
                                });
                            });
                        }),
                        (r.prototype._detachCloseHandler = function (t) {
                            n(document.body).off("mousedown.select2." + t.id);
                        }),
                        (r.prototype.position = function (n, t) {
                            t.find(".selection").append(n);
                        }),
                        (r.prototype.destroy = function () {
                            this._detachCloseHandler(this.container);
                        }),
                        (r.prototype.update = function () {
                            throw new Error("The `update` method must be defined in child classes.");
                        }),
                        (r.prototype.isEnabled = function () {
                            return !this.isDisabled();
                        }),
                        (r.prototype.isDisabled = function () {
                            return this.options.get("disabled");
                        }),
                        r
                    );
                }),
                t.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function (n, t, i) {
                    function r() {
                        r.__super__.constructor.apply(this, arguments);
                    }
                    return (
                        i.Extend(r, t),
                        (r.prototype.render = function () {
                            var n = r.__super__.render.call(this);
                            return n[0].classList.add("select2-selection--single"), n.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), n;
                        }),
                        (r.prototype.bind = function (n) {
                            var i = this,
                                t;
                            r.__super__.bind.apply(this, arguments);
                            t = n.id + "-container";
                            this.$selection.find(".select2-selection__rendered").attr("id", t).attr("role", "textbox").attr("aria-readonly", "true");
                            this.$selection.attr("aria-labelledby", t);
                            this.$selection.on("mousedown", function (n) {
                                1 === n.which && i.trigger("toggle", { originalEvent: n });
                            });
                            this.$selection.on("focus", function () {});
                            this.$selection.on("blur", function () {});
                            n.on("focus", function () {
                                n.isOpen() || i.$selection.trigger("focus");
                            });
                        }),
                        (r.prototype.clear = function () {
                            var n = this.$selection.find(".select2-selection__rendered");
                            n.empty();
                            n.removeAttr("title");
                        }),
                        (r.prototype.display = function (n, t) {
                            var i = this.options.get("templateSelection");
                            return this.options.get("escapeMarkup")(i(n, t));
                        }),
                        (r.prototype.selectionContainer = function () {
                            return n("<span></span>");
                        }),
                        (r.prototype.update = function (n) {
                            var r;
                            if (0 !== n.length) {
                                var i = n[0],
                                    t = this.$selection.find(".select2-selection__rendered"),
                                    u = this.display(i, t);
                                t.empty().append(u);
                                r = i.title || i.text;
                                r ? t.attr("title", r) : t.removeAttr("title");
                            } else this.clear();
                        }),
                        r
                    );
                }),
                t.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function (n, t, i) {
                    function r() {
                        r.__super__.constructor.apply(this, arguments);
                    }
                    return (
                        i.Extend(r, t),
                        (r.prototype.render = function () {
                            var n = r.__super__.render.call(this);
                            return n[0].classList.add("select2-selection--multiple"), n.html('<ul class="select2-selection__rendered"></ul>'), n;
                        }),
                        (r.prototype.bind = function (t) {
                            var u = this,
                                f;
                            r.__super__.bind.apply(this, arguments);
                            f = t.id + "-container";
                            this.$selection.find(".select2-selection__rendered").attr("id", f);
                            this.$selection.on("click", function (n) {
                                u.trigger("toggle", { originalEvent: n });
                            });
                            this.$selection.on("click", ".select2-selection__choice__remove", function (t) {
                                if (!u.isDisabled()) {
                                    var r = n(this).parent(),
                                        f = i.GetData(r[0], "data");
                                    u.trigger("unselect", { originalEvent: t, data: f });
                                }
                            });
                            this.$selection.on("keydown", ".select2-selection__choice__remove", function (n) {
                                u.isDisabled() || n.stopPropagation();
                            });
                        }),
                        (r.prototype.clear = function () {
                            var n = this.$selection.find(".select2-selection__rendered");
                            n.empty();
                            n.removeAttr("title");
                        }),
                        (r.prototype.display = function (n, t) {
                            var i = this.options.get("templateSelection");
                            return this.options.get("escapeMarkup")(i(n, t));
                        }),
                        (r.prototype.selectionContainer = function () {
                            return n(
                                '<li class="select2-selection__choice"><button type="button" class="select2-selection__choice__remove" tabindex="-1"  aria-label="carousel button for the remove option"><span aria-hidden="true">&times;</span></button><span class="select2-selection__choice__display"></span></li>'
                            );
                        }),
                        (r.prototype.update = function (n) {
                            var o, s, u;
                            if ((this.clear(), 0 !== n.length)) {
                                for (var h = [], c = this.$selection.find(".select2-selection__rendered").attr("id") + "-choice-", f = 0; f < n.length; f++) {
                                    var t = n[f],
                                        r = this.selectionContainer(),
                                        l = this.display(t, r),
                                        e = c + i.generateChars(4) + "-";
                                    e += t.id ? t.id : i.generateChars(4);
                                    r.find(".select2-selection__choice__display").append(l).attr("id", e);
                                    o = t.title || t.text;
                                    o && r.attr("title", o);
                                    s = this.options.get("translations").get("removeItem");
                                    u = r.find(".select2-selection__choice__remove");
                                    u.attr("title", s());
                                    u.attr("aria-label", s());
                                    u.attr("aria-describedby", e);
                                    i.StoreData(r[0], "data", t);
                                    h.push(r);
                                }
                                this.$selection.find(".select2-selection__rendered").append(h);
                            }
                        }),
                        r
                    );
                }),
                t.define("select2/selection/placeholder", [], function () {
                    function n(n, t, i) {
                        this.placeholder = this.normalizePlaceholder(i.get("placeholder"));
                        n.call(this, t, i);
                    }
                    return (
                        (n.prototype.normalizePlaceholder = function (n, t) {
                            return "string" == typeof t && (t = { id: "", text: t }), t;
                        }),
                        (n.prototype.createPlaceholder = function (n, t) {
                            var i = this.selectionContainer();
                            return i.html(this.display(t)), i[0].classList.add("select2-selection__placeholder"), i[0].classList.remove("select2-selection__choice"), i;
                        }),
                        (n.prototype.update = function (n, t) {
                            var r = 1 == t.length && t[0].id != this.placeholder.id,
                                i;
                            if (1 < t.length || r) return n.call(this, t);
                            this.clear();
                            i = this.createPlaceholder(this.placeholder);
                            this.$selection.find(".select2-selection__rendered").append(i);
                        }),
                        n
                    );
                }),
                t.define("select2/selection/allowClear", ["jquery", "../keys", "../utils"], function (n, t, i) {
                    function r() {}
                    return (
                        (r.prototype.bind = function (n, t, i) {
                            var r = this;
                            n.call(this, t, i);
                            null == this.placeholder && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option.");
                            this.$selection.on("mousedown", ".select2-selection__clear", function (n) {
                                r._handleClear(n);
                            });
                            t.on("keypress", function (n) {
                                r._handleKeyboardClear(n, t);
                            });
                        }),
                        (r.prototype._handleClear = function (n, t) {
                            var e, u, o, r, f;
                            if (!this.isDisabled() && ((e = this.$selection.find(".select2-selection__clear")), 0 !== e.length))
                                if ((t.stopPropagation(), (u = i.GetData(e[0], "data")), (o = this.$element.val()), this.$element.val(this.placeholder.id), (r = { data: u }), this.trigger("clear", r), r.prevented)) this.$element.val(o);
                                else {
                                    for (f = 0; f < u.length; f++) if (((r = { data: u[f] }), this.trigger("unselect", r), r.prevented)) return void this.$element.val(o);
                                    this.$element.trigger("input").trigger("change");
                                    this.trigger("toggle", {});
                                }
                        }),
                        (r.prototype._handleKeyboardClear = function (n, i, r) {
                            r.isOpen() || (i.which != t.DELETE && i.which != t.BACKSPACE) || this._handleClear(i);
                        }),
                        (r.prototype.update = function (t, r) {
                            if ((t.call(this, r), this.$selection.find(".select2-selection__clear").remove(), !(0 < this.$selection.find(".select2-selection__placeholder").length || 0 === r.length))) {
                                var e = this.$selection.find(".select2-selection__rendered").attr("id"),
                                    f = this.options.get("translations").get("removeAllItems"),
                                    u = n('<button type="button" class="select2-selection__clear" tabindex="-1"  aria-label="carousel button clear section option"><span aria-hidden="true">&times;</span></button>');
                                u.attr("title", f());
                                u.attr("aria-label", f());
                                u.attr("aria-describedby", e);
                                i.StoreData(u[0], "data", r);
                                this.$selection.prepend(u);
                            }
                        }),
                        r
                    );
                }),
                t.define("select2/selection/search", ["jquery", "../utils", "../keys"], function (n, t, i) {
                    function r(n, t, i) {
                        n.call(this, t, i);
                    }
                    return (
                        (r.prototype.render = function (t) {
                            var r = n(
                                    '<span class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></span>'
                                ),
                                i;
                            return (
                                (this.$searchContainer = r),
                                (this.$search = r.find("input")),
                                this.$search.prop("autocomplete", this.options.get("autocomplete")),
                                (i = t.call(this)),
                                this._transferTabIndex(),
                                i.append(this.$searchContainer),
                                i
                            );
                        }),
                        (r.prototype.bind = function (n, r, u) {
                            var f = this,
                                s = r.id + "-results",
                                h = r.id + "-container",
                                e,
                                o;
                            n.call(this, r, u);
                            f.$search.attr("aria-describedby", h);
                            r.on("open", function () {
                                f.$search.attr("aria-controls", s);
                                f.$search.trigger("focus");
                            });
                            r.on("close", function () {
                                f.$search.val("");
                                f.resizeSearch();
                                f.$search.removeAttr("aria-controls");
                                f.$search.removeAttr("aria-activedescendant");
                                f.$search.trigger("focus");
                            });
                            r.on("enable", function () {
                                f.$search.prop("disabled", !1);
                                f._transferTabIndex();
                            });
                            r.on("disable", function () {
                                f.$search.prop("disabled", !0);
                            });
                            r.on("focus", function () {
                                f.$search.trigger("focus");
                            });
                            r.on("results:focus", function (n) {
                                n.data._resultId ? f.$search.attr("aria-activedescendant", n.data._resultId) : f.$search.removeAttr("aria-activedescendant");
                            });
                            this.$selection.on("focusin", ".select2-search--inline", function (n) {
                                f.trigger("focus", n);
                            });
                            this.$selection.on("focusout", ".select2-search--inline", function (n) {
                                f._handleBlur(n);
                            });
                            this.$selection.on("keydown", ".select2-search--inline", function (n) {
                                var r, u;
                                (n.stopPropagation(), f.trigger("keypress", n), (f._keyUpPrevented = n.isDefaultPrevented()), n.which === i.BACKSPACE && "" === f.$search.val()) &&
                                    ((r = f.$selection.find(".select2-selection__choice").last()), 0 < r.length && ((u = t.GetData(r[0], "data")), f.searchRemoveChoice(u), n.preventDefault()));
                            });
                            this.$selection.on("click", ".select2-search--inline", function (n) {
                                f.$search.val() && n.stopPropagation();
                            });
                            e = document.documentMode;
                            o = e && e <= 11;
                            this.$selection.on("input.searchcheck", ".select2-search--inline", function () {
                                o ? f.$selection.off("input.search input.searchcheck") : f.$selection.off("keyup.search");
                            });
                            this.$selection.on("keyup.search input.search", ".select2-search--inline", function (n) {
                                if (o && "input" === n.type) f.$selection.off("input.search input.searchcheck");
                                else {
                                    var t = n.which;
                                    t != i.SHIFT && t != i.CTRL && t != i.ALT && t != i.TAB && f.handleSearch(n);
                                }
                            });
                        }),
                        (r.prototype._transferTabIndex = function () {
                            this.$search.attr("tabindex", this.$selection.attr("tabindex"));
                            this.$selection.attr("tabindex", "-1");
                        }),
                        (r.prototype.createPlaceholder = function (n, t) {
                            this.$search.attr("placeholder", t.text);
                        }),
                        (r.prototype.update = function (n, t) {
                            var i = this.$search[0] == document.activeElement;
                            this.$search.attr("placeholder", "");
                            n.call(this, t);
                            this.resizeSearch();
                            i && this.$search.trigger("focus");
                        }),
                        (r.prototype.handleSearch = function () {
                            if ((this.resizeSearch(), !this._keyUpPrevented)) {
                                var n = this.$search.val();
                                this.trigger("query", { term: n });
                            }
                            this._keyUpPrevented = !1;
                        }),
                        (r.prototype.searchRemoveChoice = function (n, t) {
                            this.trigger("unselect", { data: t });
                            this.$search.val(t.text);
                            this.handleSearch();
                        }),
                        (r.prototype.resizeSearch = function () {
                            this.$search.css("width", "25px");
                            var n = "100%";
                            "" === this.$search.attr("placeholder") && (n = 0.75 * (this.$search.val().length + 1) + "em");
                            this.$search.css("width", n);
                        }),
                        r
                    );
                }),
                t.define("select2/selection/selectionCss", ["../utils"], function (n) {
                    function t() {}
                    return (
                        (t.prototype.render = function (t) {
                            var r = t.call(this),
                                i = this.options.get("selectionCssClass") || "";
                            return -1 !== i.indexOf(":all:") && ((i = i.replace(":all:", "")), n.copyNonInternalCssClasses(r[0], this.$element[0])), r.addClass(i), r;
                        }),
                        t
                    );
                }),
                t.define("select2/selection/eventRelay", ["jquery"], function (n) {
                    function t() {}
                    return (
                        (t.prototype.bind = function (t, i, r) {
                            var u = this,
                                f = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting", "clear", "clearing"],
                                e = ["opening", "closing", "selecting", "unselecting", "clearing"];
                            t.call(this, i, r);
                            i.on("*", function (t, i) {
                                if (-1 !== f.indexOf(t)) {
                                    i = i || {};
                                    var r = n.Event("select2:" + t, { params: i });
                                    u.$element.trigger(r);
                                    -1 !== e.indexOf(t) && (i.prevented = r.isDefaultPrevented());
                                }
                            });
                        }),
                        t
                    );
                }),
                t.define("select2/translation", ["jquery", "require"], function (n, t) {
                    function i(n) {
                        this.dict = n || {};
                    }
                    return (
                        (i.prototype.all = function () {
                            return this.dict;
                        }),
                        (i.prototype.get = function (n) {
                            return this.dict[n];
                        }),
                        (i.prototype.extend = function (t) {
                            this.dict = n.extend({}, t.all(), this.dict);
                        }),
                        (i._cache = {}),
                        (i.loadPath = function (n) {
                            if (!(n in i._cache)) {
                                var r = t(n);
                                i._cache[n] = r;
                            }
                            return new i(i._cache[n]);
                        }),
                        i
                    );
                }),
                t.define("select2/diacritics", [], function () {
                    return {
                        "Ⓐ": "A",
                        Ａ: "A",
                        À: "A",
                        Á: "A",
                        Â: "A",
                        Ầ: "A",
                        Ấ: "A",
                        Ẫ: "A",
                        Ẩ: "A",
                        Ã: "A",
                        Ā: "A",
                        Ă: "A",
                        Ằ: "A",
                        Ắ: "A",
                        Ẵ: "A",
                        Ẳ: "A",
                        Ȧ: "A",
                        Ǡ: "A",
                        Ä: "A",
                        Ǟ: "A",
                        Ả: "A",
                        Å: "A",
                        Ǻ: "A",
                        Ǎ: "A",
                        Ȁ: "A",
                        Ȃ: "A",
                        Ạ: "A",
                        Ậ: "A",
                        Ặ: "A",
                        Ḁ: "A",
                        Ą: "A",
                        Ⱥ: "A",
                        Ɐ: "A",
                        Ꜳ: "AA",
                        Æ: "AE",
                        Ǽ: "AE",
                        Ǣ: "AE",
                        Ꜵ: "AO",
                        Ꜷ: "AU",
                        Ꜹ: "AV",
                        Ꜻ: "AV",
                        Ꜽ: "AY",
                        "Ⓑ": "B",
                        Ｂ: "B",
                        Ḃ: "B",
                        Ḅ: "B",
                        Ḇ: "B",
                        Ƀ: "B",
                        Ƃ: "B",
                        Ɓ: "B",
                        "Ⓒ": "C",
                        Ｃ: "C",
                        Ć: "C",
                        Ĉ: "C",
                        Ċ: "C",
                        Č: "C",
                        Ç: "C",
                        Ḉ: "C",
                        Ƈ: "C",
                        Ȼ: "C",
                        Ꜿ: "C",
                        "Ⓓ": "D",
                        Ｄ: "D",
                        Ḋ: "D",
                        Ď: "D",
                        Ḍ: "D",
                        Ḑ: "D",
                        Ḓ: "D",
                        Ḏ: "D",
                        Đ: "D",
                        Ƌ: "D",
                        Ɗ: "D",
                        Ɖ: "D",
                        Ꝺ: "D",
                        Ǳ: "DZ",
                        Ǆ: "DZ",
                        ǲ: "Dz",
                        ǅ: "Dz",
                        "Ⓔ": "E",
                        Ｅ: "E",
                        È: "E",
                        É: "E",
                        Ê: "E",
                        Ề: "E",
                        Ế: "E",
                        Ễ: "E",
                        Ể: "E",
                        Ẽ: "E",
                        Ē: "E",
                        Ḕ: "E",
                        Ḗ: "E",
                        Ĕ: "E",
                        Ė: "E",
                        Ë: "E",
                        Ẻ: "E",
                        Ě: "E",
                        Ȅ: "E",
                        Ȇ: "E",
                        Ẹ: "E",
                        Ệ: "E",
                        Ȩ: "E",
                        Ḝ: "E",
                        Ę: "E",
                        Ḙ: "E",
                        Ḛ: "E",
                        Ɛ: "E",
                        Ǝ: "E",
                        "Ⓕ": "F",
                        Ｆ: "F",
                        Ḟ: "F",
                        Ƒ: "F",
                        Ꝼ: "F",
                        "Ⓖ": "G",
                        Ｇ: "G",
                        Ǵ: "G",
                        Ĝ: "G",
                        Ḡ: "G",
                        Ğ: "G",
                        Ġ: "G",
                        Ǧ: "G",
                        Ģ: "G",
                        Ǥ: "G",
                        Ɠ: "G",
                        Ꞡ: "G",
                        Ᵹ: "G",
                        Ꝿ: "G",
                        "Ⓗ": "H",
                        Ｈ: "H",
                        Ĥ: "H",
                        Ḣ: "H",
                        Ḧ: "H",
                        Ȟ: "H",
                        Ḥ: "H",
                        Ḩ: "H",
                        Ḫ: "H",
                        Ħ: "H",
                        Ⱨ: "H",
                        Ⱶ: "H",
                        Ɥ: "H",
                        "Ⓘ": "I",
                        Ｉ: "I",
                        Ì: "I",
                        Í: "I",
                        Î: "I",
                        Ĩ: "I",
                        Ī: "I",
                        Ĭ: "I",
                        İ: "I",
                        Ï: "I",
                        Ḯ: "I",
                        Ỉ: "I",
                        Ǐ: "I",
                        Ȉ: "I",
                        Ȋ: "I",
                        Ị: "I",
                        Į: "I",
                        Ḭ: "I",
                        Ɨ: "I",
                        "Ⓙ": "J",
                        Ｊ: "J",
                        Ĵ: "J",
                        Ɉ: "J",
                        "Ⓚ": "K",
                        Ｋ: "K",
                        Ḱ: "K",
                        Ǩ: "K",
                        Ḳ: "K",
                        Ķ: "K",
                        Ḵ: "K",
                        Ƙ: "K",
                        Ⱪ: "K",
                        Ꝁ: "K",
                        Ꝃ: "K",
                        Ꝅ: "K",
                        Ꞣ: "K",
                        "Ⓛ": "L",
                        Ｌ: "L",
                        Ŀ: "L",
                        Ĺ: "L",
                        Ľ: "L",
                        Ḷ: "L",
                        Ḹ: "L",
                        Ļ: "L",
                        Ḽ: "L",
                        Ḻ: "L",
                        Ł: "L",
                        Ƚ: "L",
                        Ɫ: "L",
                        Ⱡ: "L",
                        Ꝉ: "L",
                        Ꝇ: "L",
                        Ꞁ: "L",
                        Ǉ: "LJ",
                        ǈ: "Lj",
                        "Ⓜ": "M",
                        Ｍ: "M",
                        Ḿ: "M",
                        Ṁ: "M",
                        Ṃ: "M",
                        Ɱ: "M",
                        Ɯ: "M",
                        "Ⓝ": "N",
                        Ｎ: "N",
                        Ǹ: "N",
                        Ń: "N",
                        Ñ: "N",
                        Ṅ: "N",
                        Ň: "N",
                        Ṇ: "N",
                        Ņ: "N",
                        Ṋ: "N",
                        Ṉ: "N",
                        Ƞ: "N",
                        Ɲ: "N",
                        Ꞑ: "N",
                        Ꞥ: "N",
                        Ǌ: "NJ",
                        ǋ: "Nj",
                        "Ⓞ": "O",
                        Ｏ: "O",
                        Ò: "O",
                        Ó: "O",
                        Ô: "O",
                        Ồ: "O",
                        Ố: "O",
                        Ỗ: "O",
                        Ổ: "O",
                        Õ: "O",
                        Ṍ: "O",
                        Ȭ: "O",
                        Ṏ: "O",
                        Ō: "O",
                        Ṑ: "O",
                        Ṓ: "O",
                        Ŏ: "O",
                        Ȯ: "O",
                        Ȱ: "O",
                        Ö: "O",
                        Ȫ: "O",
                        Ỏ: "O",
                        Ő: "O",
                        Ǒ: "O",
                        Ȍ: "O",
                        Ȏ: "O",
                        Ơ: "O",
                        Ờ: "O",
                        Ớ: "O",
                        Ỡ: "O",
                        Ở: "O",
                        Ợ: "O",
                        Ọ: "O",
                        Ộ: "O",
                        Ǫ: "O",
                        Ǭ: "O",
                        Ø: "O",
                        Ǿ: "O",
                        Ɔ: "O",
                        Ɵ: "O",
                        Ꝋ: "O",
                        Ꝍ: "O",
                        Œ: "OE",
                        Ƣ: "OI",
                        Ꝏ: "OO",
                        Ȣ: "OU",
                        "Ⓟ": "P",
                        Ｐ: "P",
                        Ṕ: "P",
                        Ṗ: "P",
                        Ƥ: "P",
                        Ᵽ: "P",
                        Ꝑ: "P",
                        Ꝓ: "P",
                        Ꝕ: "P",
                        "Ⓠ": "Q",
                        Ｑ: "Q",
                        Ꝗ: "Q",
                        Ꝙ: "Q",
                        Ɋ: "Q",
                        "Ⓡ": "R",
                        Ｒ: "R",
                        Ŕ: "R",
                        Ṙ: "R",
                        Ř: "R",
                        Ȑ: "R",
                        Ȓ: "R",
                        Ṛ: "R",
                        Ṝ: "R",
                        Ŗ: "R",
                        Ṟ: "R",
                        Ɍ: "R",
                        Ɽ: "R",
                        Ꝛ: "R",
                        Ꞧ: "R",
                        Ꞃ: "R",
                        "Ⓢ": "S",
                        Ｓ: "S",
                        ẞ: "S",
                        Ś: "S",
                        Ṥ: "S",
                        Ŝ: "S",
                        Ṡ: "S",
                        Š: "S",
                        Ṧ: "S",
                        Ṣ: "S",
                        Ṩ: "S",
                        Ș: "S",
                        Ş: "S",
                        Ȿ: "S",
                        Ꞩ: "S",
                        Ꞅ: "S",
                        "Ⓣ": "T",
                        Ｔ: "T",
                        Ṫ: "T",
                        Ť: "T",
                        Ṭ: "T",
                        Ț: "T",
                        Ţ: "T",
                        Ṱ: "T",
                        Ṯ: "T",
                        Ŧ: "T",
                        Ƭ: "T",
                        Ʈ: "T",
                        Ⱦ: "T",
                        Ꞇ: "T",
                        Ꜩ: "TZ",
                        "Ⓤ": "U",
                        Ｕ: "U",
                        Ù: "U",
                        Ú: "U",
                        Û: "U",
                        Ũ: "U",
                        Ṹ: "U",
                        Ū: "U",
                        Ṻ: "U",
                        Ŭ: "U",
                        Ü: "U",
                        Ǜ: "U",
                        Ǘ: "U",
                        Ǖ: "U",
                        Ǚ: "U",
                        Ủ: "U",
                        Ů: "U",
                        Ű: "U",
                        Ǔ: "U",
                        Ȕ: "U",
                        Ȗ: "U",
                        Ư: "U",
                        Ừ: "U",
                        Ứ: "U",
                        Ữ: "U",
                        Ử: "U",
                        Ự: "U",
                        Ụ: "U",
                        Ṳ: "U",
                        Ų: "U",
                        Ṷ: "U",
                        Ṵ: "U",
                        Ʉ: "U",
                        "Ⓥ": "V",
                        Ｖ: "V",
                        Ṽ: "V",
                        Ṿ: "V",
                        Ʋ: "V",
                        Ꝟ: "V",
                        Ʌ: "V",
                        Ꝡ: "VY",
                        "Ⓦ": "W",
                        Ｗ: "W",
                        Ẁ: "W",
                        Ẃ: "W",
                        Ŵ: "W",
                        Ẇ: "W",
                        Ẅ: "W",
                        Ẉ: "W",
                        Ⱳ: "W",
                        "Ⓧ": "X",
                        Ｘ: "X",
                        Ẋ: "X",
                        Ẍ: "X",
                        "Ⓨ": "Y",
                        Ｙ: "Y",
                        Ỳ: "Y",
                        Ý: "Y",
                        Ŷ: "Y",
                        Ỹ: "Y",
                        Ȳ: "Y",
                        Ẏ: "Y",
                        Ÿ: "Y",
                        Ỷ: "Y",
                        Ỵ: "Y",
                        Ƴ: "Y",
                        Ɏ: "Y",
                        Ỿ: "Y",
                        "Ⓩ": "Z",
                        Ｚ: "Z",
                        Ź: "Z",
                        Ẑ: "Z",
                        Ż: "Z",
                        Ž: "Z",
                        Ẓ: "Z",
                        Ẕ: "Z",
                        Ƶ: "Z",
                        Ȥ: "Z",
                        Ɀ: "Z",
                        Ⱬ: "Z",
                        Ꝣ: "Z",
                        "ⓐ": "a",
                        ａ: "a",
                        ẚ: "a",
                        à: "a",
                        á: "a",
                        â: "a",
                        ầ: "a",
                        ấ: "a",
                        ẫ: "a",
                        ẩ: "a",
                        ã: "a",
                        ā: "a",
                        ă: "a",
                        ằ: "a",
                        ắ: "a",
                        ẵ: "a",
                        ẳ: "a",
                        ȧ: "a",
                        ǡ: "a",
                        ä: "a",
                        ǟ: "a",
                        ả: "a",
                        å: "a",
                        ǻ: "a",
                        ǎ: "a",
                        ȁ: "a",
                        ȃ: "a",
                        ạ: "a",
                        ậ: "a",
                        ặ: "a",
                        ḁ: "a",
                        ą: "a",
                        ⱥ: "a",
                        ɐ: "a",
                        ꜳ: "aa",
                        æ: "ae",
                        ǽ: "ae",
                        ǣ: "ae",
                        ꜵ: "ao",
                        ꜷ: "au",
                        ꜹ: "av",
                        ꜻ: "av",
                        ꜽ: "ay",
                        "ⓑ": "b",
                        ｂ: "b",
                        ḃ: "b",
                        ḅ: "b",
                        ḇ: "b",
                        ƀ: "b",
                        ƃ: "b",
                        ɓ: "b",
                        "ⓒ": "c",
                        ｃ: "c",
                        ć: "c",
                        ĉ: "c",
                        ċ: "c",
                        č: "c",
                        ç: "c",
                        ḉ: "c",
                        ƈ: "c",
                        ȼ: "c",
                        ꜿ: "c",
                        ↄ: "c",
                        "ⓓ": "d",
                        ｄ: "d",
                        ḋ: "d",
                        ď: "d",
                        ḍ: "d",
                        ḑ: "d",
                        ḓ: "d",
                        ḏ: "d",
                        đ: "d",
                        ƌ: "d",
                        ɖ: "d",
                        ɗ: "d",
                        ꝺ: "d",
                        ǳ: "dz",
                        ǆ: "dz",
                        "ⓔ": "e",
                        ｅ: "e",
                        è: "e",
                        é: "e",
                        ê: "e",
                        ề: "e",
                        ế: "e",
                        ễ: "e",
                        ể: "e",
                        ẽ: "e",
                        ē: "e",
                        ḕ: "e",
                        ḗ: "e",
                        ĕ: "e",
                        ė: "e",
                        ë: "e",
                        ẻ: "e",
                        ě: "e",
                        ȅ: "e",
                        ȇ: "e",
                        ẹ: "e",
                        ệ: "e",
                        ȩ: "e",
                        ḝ: "e",
                        ę: "e",
                        ḙ: "e",
                        ḛ: "e",
                        ɇ: "e",
                        ɛ: "e",
                        ǝ: "e",
                        "ⓕ": "f",
                        ｆ: "f",
                        ḟ: "f",
                        ƒ: "f",
                        ꝼ: "f",
                        "ⓖ": "g",
                        ｇ: "g",
                        ǵ: "g",
                        ĝ: "g",
                        ḡ: "g",
                        ğ: "g",
                        ġ: "g",
                        ǧ: "g",
                        ģ: "g",
                        ǥ: "g",
                        ɠ: "g",
                        ꞡ: "g",
                        ᵹ: "g",
                        ꝿ: "g",
                        "ⓗ": "h",
                        ｈ: "h",
                        ĥ: "h",
                        ḣ: "h",
                        ḧ: "h",
                        ȟ: "h",
                        ḥ: "h",
                        ḩ: "h",
                        ḫ: "h",
                        ẖ: "h",
                        ħ: "h",
                        ⱨ: "h",
                        ⱶ: "h",
                        ɥ: "h",
                        ƕ: "hv",
                        "ⓘ": "i",
                        ｉ: "i",
                        ì: "i",
                        í: "i",
                        î: "i",
                        ĩ: "i",
                        ī: "i",
                        ĭ: "i",
                        ï: "i",
                        ḯ: "i",
                        ỉ: "i",
                        ǐ: "i",
                        ȉ: "i",
                        ȋ: "i",
                        ị: "i",
                        į: "i",
                        ḭ: "i",
                        ɨ: "i",
                        ı: "i",
                        "ⓙ": "j",
                        ｊ: "j",
                        ĵ: "j",
                        ǰ: "j",
                        ɉ: "j",
                        "ⓚ": "k",
                        ｋ: "k",
                        ḱ: "k",
                        ǩ: "k",
                        ḳ: "k",
                        ķ: "k",
                        ḵ: "k",
                        ƙ: "k",
                        ⱪ: "k",
                        ꝁ: "k",
                        ꝃ: "k",
                        ꝅ: "k",
                        ꞣ: "k",
                        "ⓛ": "l",
                        ｌ: "l",
                        ŀ: "l",
                        ĺ: "l",
                        ľ: "l",
                        ḷ: "l",
                        ḹ: "l",
                        ļ: "l",
                        ḽ: "l",
                        ḻ: "l",
                        ſ: "l",
                        ł: "l",
                        ƚ: "l",
                        ɫ: "l",
                        ⱡ: "l",
                        ꝉ: "l",
                        ꞁ: "l",
                        ꝇ: "l",
                        ǉ: "lj",
                        "ⓜ": "m",
                        ｍ: "m",
                        ḿ: "m",
                        ṁ: "m",
                        ṃ: "m",
                        ɱ: "m",
                        ɯ: "m",
                        "ⓝ": "n",
                        ｎ: "n",
                        ǹ: "n",
                        ń: "n",
                        ñ: "n",
                        ṅ: "n",
                        ň: "n",
                        ṇ: "n",
                        ņ: "n",
                        ṋ: "n",
                        ṉ: "n",
                        ƞ: "n",
                        ɲ: "n",
                        ŉ: "n",
                        ꞑ: "n",
                        ꞥ: "n",
                        ǌ: "nj",
                        "ⓞ": "o",
                        ｏ: "o",
                        ò: "o",
                        ó: "o",
                        ô: "o",
                        ồ: "o",
                        ố: "o",
                        ỗ: "o",
                        ổ: "o",
                        õ: "o",
                        ṍ: "o",
                        ȭ: "o",
                        ṏ: "o",
                        ō: "o",
                        ṑ: "o",
                        ṓ: "o",
                        ŏ: "o",
                        ȯ: "o",
                        ȱ: "o",
                        ö: "o",
                        ȫ: "o",
                        ỏ: "o",
                        ő: "o",
                        ǒ: "o",
                        ȍ: "o",
                        ȏ: "o",
                        ơ: "o",
                        ờ: "o",
                        ớ: "o",
                        ỡ: "o",
                        ở: "o",
                        ợ: "o",
                        ọ: "o",
                        ộ: "o",
                        ǫ: "o",
                        ǭ: "o",
                        ø: "o",
                        ǿ: "o",
                        ɔ: "o",
                        ꝋ: "o",
                        ꝍ: "o",
                        ɵ: "o",
                        œ: "oe",
                        ƣ: "oi",
                        ȣ: "ou",
                        ꝏ: "oo",
                        "ⓟ": "p",
                        ｐ: "p",
                        ṕ: "p",
                        ṗ: "p",
                        ƥ: "p",
                        ᵽ: "p",
                        ꝑ: "p",
                        ꝓ: "p",
                        ꝕ: "p",
                        "ⓠ": "q",
                        ｑ: "q",
                        ɋ: "q",
                        ꝗ: "q",
                        ꝙ: "q",
                        "ⓡ": "r",
                        ｒ: "r",
                        ŕ: "r",
                        ṙ: "r",
                        ř: "r",
                        ȑ: "r",
                        ȓ: "r",
                        ṛ: "r",
                        ṝ: "r",
                        ŗ: "r",
                        ṟ: "r",
                        ɍ: "r",
                        ɽ: "r",
                        ꝛ: "r",
                        ꞧ: "r",
                        ꞃ: "r",
                        "ⓢ": "s",
                        ｓ: "s",
                        ß: "s",
                        ś: "s",
                        ṥ: "s",
                        ŝ: "s",
                        ṡ: "s",
                        š: "s",
                        ṧ: "s",
                        ṣ: "s",
                        ṩ: "s",
                        ș: "s",
                        ş: "s",
                        ȿ: "s",
                        ꞩ: "s",
                        ꞅ: "s",
                        ẛ: "s",
                        "ⓣ": "t",
                        ｔ: "t",
                        ṫ: "t",
                        ẗ: "t",
                        ť: "t",
                        ṭ: "t",
                        ț: "t",
                        ţ: "t",
                        ṱ: "t",
                        ṯ: "t",
                        ŧ: "t",
                        ƭ: "t",
                        ʈ: "t",
                        ⱦ: "t",
                        ꞇ: "t",
                        ꜩ: "tz",
                        "ⓤ": "u",
                        ｕ: "u",
                        ù: "u",
                        ú: "u",
                        û: "u",
                        ũ: "u",
                        ṹ: "u",
                        ū: "u",
                        ṻ: "u",
                        ŭ: "u",
                        ü: "u",
                        ǜ: "u",
                        ǘ: "u",
                        ǖ: "u",
                        ǚ: "u",
                        ủ: "u",
                        ů: "u",
                        ű: "u",
                        ǔ: "u",
                        ȕ: "u",
                        ȗ: "u",
                        ư: "u",
                        ừ: "u",
                        ứ: "u",
                        ữ: "u",
                        ử: "u",
                        ự: "u",
                        ụ: "u",
                        ṳ: "u",
                        ų: "u",
                        ṷ: "u",
                        ṵ: "u",
                        ʉ: "u",
                        "ⓥ": "v",
                        ｖ: "v",
                        ṽ: "v",
                        ṿ: "v",
                        ʋ: "v",
                        ꝟ: "v",
                        ʌ: "v",
                        ꝡ: "vy",
                        "ⓦ": "w",
                        ｗ: "w",
                        ẁ: "w",
                        ẃ: "w",
                        ŵ: "w",
                        ẇ: "w",
                        ẅ: "w",
                        ẘ: "w",
                        ẉ: "w",
                        ⱳ: "w",
                        "ⓧ": "x",
                        ｘ: "x",
                        ẋ: "x",
                        ẍ: "x",
                        "ⓨ": "y",
                        ｙ: "y",
                        ỳ: "y",
                        ý: "y",
                        ŷ: "y",
                        ỹ: "y",
                        ȳ: "y",
                        ẏ: "y",
                        ÿ: "y",
                        ỷ: "y",
                        ẙ: "y",
                        ỵ: "y",
                        ƴ: "y",
                        ɏ: "y",
                        ỿ: "y",
                        "ⓩ": "z",
                        ｚ: "z",
                        ź: "z",
                        ẑ: "z",
                        ż: "z",
                        ž: "z",
                        ẓ: "z",
                        ẕ: "z",
                        ƶ: "z",
                        ȥ: "z",
                        ɀ: "z",
                        ⱬ: "z",
                        ꝣ: "z",
                        Ά: "Α",
                        Έ: "Ε",
                        Ή: "Η",
                        Ί: "Ι",
                        Ϊ: "Ι",
                        Ό: "Ο",
                        Ύ: "Υ",
                        Ϋ: "Υ",
                        Ώ: "Ω",
                        ά: "α",
                        έ: "ε",
                        ή: "η",
                        ί: "ι",
                        ϊ: "ι",
                        ΐ: "ι",
                        ό: "ο",
                        ύ: "υ",
                        ϋ: "υ",
                        ΰ: "υ",
                        ώ: "ω",
                        ς: "σ",
                        "’": "'",
                    };
                }),
                t.define("select2/data/base", ["../utils"], function (n) {
                    function t() {
                        t.__super__.constructor.call(this);
                    }
                    return (
                        n.Extend(t, n.Observable),
                        (t.prototype.current = function () {
                            throw new Error("The `current` method must be defined in child classes.");
                        }),
                        (t.prototype.query = function () {
                            throw new Error("The `query` method must be defined in child classes.");
                        }),
                        (t.prototype.bind = function () {}),
                        (t.prototype.destroy = function () {}),
                        (t.prototype.generateResultId = function (t, i) {
                            var r = t.id + "-result-";
                            return (r += n.generateChars(4)), (r += null != i.id ? "-" + i.id.toString() : "-" + n.generateChars(4)), r;
                        }),
                        t
                    );
                }),
                t.define("select2/data/select", ["./base", "../utils", "jquery"], function (n, t, i) {
                    function r(n, t) {
                        this.$element = n;
                        this.options = t;
                        r.__super__.constructor.call(this);
                    }
                    return (
                        t.Extend(r, n),
                        (r.prototype.current = function (n) {
                            var t = this;
                            n(
                                Array.prototype.map.call(this.$element[0].querySelectorAll(":checked"), function (n) {
                                    return t.item(i(n));
                                })
                            );
                        }),
                        (r.prototype.select = function (n) {
                            var t = this,
                                i;
                            if (((n.selected = !0), null != n.element && "option" === n.element.tagName.toLowerCase())) return (n.element.selected = !0), void this.$element.trigger("input").trigger("change");
                            this.$element.prop("multiple")
                                ? this.current(function (i) {
                                      var u = [],
                                          r,
                                          f;
                                      for ((n = [n]).push.apply(n, i), r = 0; r < n.length; r++) (f = n[r].id), -1 === u.indexOf(f) && u.push(f);
                                      t.$element.val(u);
                                      t.$element.trigger("input").trigger("change");
                                  })
                                : ((i = n.id), this.$element.val(i), this.$element.trigger("input").trigger("change"));
                        }),
                        (r.prototype.unselect = function (n) {
                            var t = this;
                            if (this.$element.prop("multiple")) {
                                if (((n.selected = !1), null != n.element && "option" === n.element.tagName.toLowerCase())) return (n.element.selected = !1), void this.$element.trigger("input").trigger("change");
                                this.current(function (i) {
                                    for (var f, r = [], u = 0; u < i.length; u++) (f = i[u].id), f !== n.id && -1 === r.indexOf(f) && r.push(f);
                                    t.$element.val(r);
                                    t.$element.trigger("input").trigger("change");
                                });
                            }
                        }),
                        (r.prototype.bind = function (n) {
                            var t = this;
                            (this.container = n).on("select", function (n) {
                                t.select(n.data);
                            });
                            n.on("unselect", function (n) {
                                t.unselect(n.data);
                            });
                        }),
                        (r.prototype.destroy = function () {
                            this.$element.find("*").each(function () {
                                t.RemoveData(this);
                            });
                        }),
                        (r.prototype.query = function (n, t) {
                            var r = [],
                                u = this;
                            this.$element.children().each(function () {
                                if ("option" === this.tagName.toLowerCase() || "optgroup" === this.tagName.toLowerCase()) {
                                    var f = i(this),
                                        e = u.item(f),
                                        t = u.matches(n, e);
                                    null !== t && r.push(t);
                                }
                            });
                            t({ results: r });
                        }),
                        (r.prototype.addOptions = function (n) {
                            this.$element.append(n);
                        }),
                        (r.prototype.option = function (n) {
                            var r, u;
                            return (
                                n.children ? ((r = document.createElement("optgroup")).label = n.text) : void 0 !== (r = document.createElement("option")).textContent ? (r.textContent = n.text) : (r.innerText = n.text),
                                void 0 !== n.id && (r.value = n.id),
                                n.disabled && (r.disabled = !0),
                                n.selected && (r.selected = !0),
                                n.title && (r.title = n.title),
                                (u = this._normalizeItem(n)),
                                (u.element = r),
                                t.StoreData(r, "data", u),
                                i(r)
                            );
                        }),
                        (r.prototype.item = function (n) {
                            var r = {},
                                u,
                                s,
                                h;
                            if (null != (r = t.GetData(n[0], "data"))) return r;
                            if (((u = n[0]), "option" === u.tagName.toLowerCase())) r = { id: n.val(), text: n.text(), disabled: n.prop("disabled"), selected: n.prop("selected"), title: n.prop("title") };
                            else if ("optgroup" === u.tagName.toLowerCase()) {
                                r = { text: n.prop("label"), children: [], title: n.prop("title") };
                                for (var e = n.children("option"), o = [], f = 0; f < e.length; f++) (s = i(e[f])), (h = this.item(s)), o.push(h);
                                r.children = o;
                            }
                            return ((r = this._normalizeItem(r)).element = n[0]), t.StoreData(n[0], "data", r), r;
                        }),
                        (r.prototype._normalizeItem = function (n) {
                            return (
                                n !== Object(n) && (n = { id: n, text: n }),
                                null != (n = i.extend({}, { text: "" }, n)).id && (n.id = n.id.toString()),
                                null != n.text && (n.text = n.text.toString()),
                                null == n._resultId && n.id && null != this.container && (n._resultId = this.generateResultId(this.container, n)),
                                i.extend({}, { selected: !1, disabled: !1 }, n)
                            );
                        }),
                        (r.prototype.matches = function (n, t) {
                            return this.options.get("matcher")(n, t);
                        }),
                        r
                    );
                }),
                t.define("select2/data/array", ["./select", "../utils", "jquery"], function (n, t, i) {
                    function r(n, t) {
                        this._dataToConvert = t.get("data") || [];
                        r.__super__.constructor.call(this, n, t);
                    }
                    return (
                        t.Extend(r, n),
                        (r.prototype.bind = function (n, t) {
                            r.__super__.bind.call(this, n, t);
                            this.addOptions(this.convertToOptions(this._dataToConvert));
                        }),
                        (r.prototype.select = function (n) {
                            var t = this.$element.find("option").filter(function (t, i) {
                                return i.value == n.id.toString();
                            });
                            0 === t.length && ((t = this.option(n)), this.addOptions(t));
                            r.__super__.select.call(this, n);
                        }),
                        (r.prototype.convertToOptions = function (n) {
                            function l(n) {
                                return function () {
                                    return i(this).val() == n.id;
                                };
                            }
                            for (
                                var h = this,
                                    f = this.$element.find("option"),
                                    c = f
                                        .map(function () {
                                            return h.item(i(this)).id;
                                        })
                                        .get(),
                                    e = [],
                                    t,
                                    u,
                                    s,
                                    r = 0;
                                r < n.length;
                                r++
                            )
                                if (((t = this._normalizeItem(n[r])), 0 <= c.indexOf(t.id))) {
                                    var o = f.filter(l(t)),
                                        a = this.item(o),
                                        v = i.extend(!0, {}, t, a),
                                        y = this.option(v);
                                    o.replaceWith(y);
                                } else (u = this.option(t)), t.children && ((s = this.convertToOptions(t.children)), u.append(s)), e.push(u);
                            return e;
                        }),
                        r
                    );
                }),
                t.define("select2/data/ajax", ["./array", "../utils", "jquery"], function (n, t, i) {
                    function r(n, t) {
                        this.ajaxOptions = this._applyDefaults(t.get("ajax"));
                        null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults);
                        r.__super__.constructor.call(this, n, t);
                    }
                    return (
                        t.Extend(r, n),
                        (r.prototype._applyDefaults = function (n) {
                            var t = {
                                data: function (n) {
                                    return i.extend({}, n, { q: n.term });
                                },
                                transport: function (n, t, r) {
                                    var u = i.ajax(n);
                                    return u.then(t), u.fail(r), u;
                                },
                            };
                            return i.extend({}, t, n, !0);
                        }),
                        (r.prototype.processResults = function (n) {
                            return n;
                        }),
                        (r.prototype.query = function (n, t) {
                            function f() {
                                var i = r.transport(
                                    r,
                                    function (i) {
                                        var r = u.processResults(i, n);
                                        u.options.get("debug") &&
                                            window.console &&
                                            console.error &&
                                            ((r && r.results && Array.isArray(r.results)) || console.error("Select2: The AJAX results did not return an array in the `results` key of the response."));
                                        t(r);
                                    },
                                    function () {
                                        ("status" in i && (0 === i.status || "0" === i.status)) || u.trigger("results:message", { message: "errorLoading" });
                                    }
                                );
                                u._request = i;
                            }
                            var u = this,
                                r;
                            null != this._request && (i.isFunction(this._request.abort) && this._request.abort(), (this._request = null));
                            r = i.extend({ type: "GET" }, this.ajaxOptions);
                            "function" == typeof r.url && (r.url = r.url.call(this.$element, n));
                            "function" == typeof r.data && (r.data = r.data.call(this.$element, n));
                            this.ajaxOptions.delay && null != n.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), (this._queryTimeout = window.setTimeout(f, this.ajaxOptions.delay))) : f();
                        }),
                        r
                    );
                }),
                t.define("select2/data/tags", ["jquery"], function (n) {
                    function t(n, t, i) {
                        var u = i.get("tags"),
                            e = i.get("createTag"),
                            f,
                            r;
                        if ((void 0 !== e && (this.createTag = e), (f = i.get("insertTag")), void 0 !== f && (this.insertTag = f), n.call(this, t, i), Array.isArray(u)))
                            for (r = 0; r < u.length; r++) {
                                var o = u[r],
                                    s = this._normalizeItem(o),
                                    h = this.option(s);
                                this.$element.append(h);
                            }
                    }
                    return (
                        (t.prototype.query = function (n, t, i) {
                            var r = this;
                            this._removeOldTags();
                            null != t.term && null == t.page
                                ? n.call(this, t, function n(u, f) {
                                      for (var s, l, h, c, e = u.results, o = 0; o < e.length; o++)
                                          if (((s = e[o]), (l = null != s.children && !n({ results: s.children }, !0)), (s.text || "").toUpperCase() === (t.term || "").toUpperCase() || l)) return !f && ((u.data = e), void i(u));
                                      if (f) return !0;
                                      h = r.createTag(t);
                                      null != h && ((c = r.option(h)), c.attr("data-select2-tag", !0), r.addOptions([c]), r.insertTag(e, h));
                                      u.results = e;
                                      i(u);
                                  })
                                : n.call(this, t, i);
                        }),
                        (t.prototype.createTag = function (n, t) {
                            if (null == t.term) return null;
                            var i = t.term.trim();
                            return "" === i ? null : { id: i, text: i };
                        }),
                        (t.prototype.insertTag = function (n, t, i) {
                            t.unshift(i);
                        }),
                        (t.prototype._removeOldTags = function () {
                            this.$element.find("option[data-select2-tag]").each(function () {
                                this.selected || n(this).remove();
                            });
                        }),
                        t
                    );
                }),
                t.define("select2/data/tokenizer", ["jquery"], function (n) {
                    function t(n, t, i) {
                        var r = i.get("tokenizer");
                        void 0 !== r && (this.tokenizer = r);
                        n.call(this, t, i);
                    }
                    return (
                        (t.prototype.bind = function (n, t, i) {
                            n.call(this, t, i);
                            this.$search = t.dropdown.$search || t.selection.$search || i.find(".select2-search__field");
                        }),
                        (t.prototype.query = function (t, i, r) {
                            var u = this,
                                f;
                            i.term = i.term || "";
                            f = this.tokenizer(i, this.options, function (t) {
                                var i = u._normalizeItem(t),
                                    r;
                                u.$element.find("option").filter(function () {
                                    return n(this).val() === i.id;
                                }).length || ((r = u.option(i)), r.attr("data-select2-tag", !0), u._removeOldTags(), u.addOptions([r]));
                                !(function (n) {
                                    u.trigger("select", { data: n });
                                })(i);
                            });
                            f.term !== i.term && (this.$search.length && (this.$search.val(f.term), this.$search.trigger("focus")), (i.term = f.term));
                            t.call(this, i, r);
                        }),
                        (t.prototype.tokenizer = function (t, i, r, u) {
                            for (
                                var s,
                                    h,
                                    o,
                                    c = r.get("tokenSeparators") || [],
                                    e = i.term,
                                    f = 0,
                                    l =
                                        this.createTag ||
                                        function (n) {
                                            return { id: n.term, text: n.term };
                                        };
                                f < e.length;

                            )
                                (s = e[f]), -1 !== c.indexOf(s) ? ((h = e.substr(0, f)), (o = l(n.extend({}, i, { term: h }))), null != o ? (u(o), (e = e.substr(f + 1) || ""), (f = 0)) : f++) : f++;
                            return { term: e };
                        }),
                        t
                    );
                }),
                t.define("select2/data/minimumInputLength", [], function () {
                    function n(n, t, i) {
                        this.minimumInputLength = i.get("minimumInputLength");
                        n.call(this, t, i);
                    }
                    return (
                        (n.prototype.query = function (n, t, i) {
                            t.term = t.term || "";
                            t.term.length < this.minimumInputLength ? this.trigger("results:message", { message: "inputTooShort", args: { minimum: this.minimumInputLength, input: t.term, params: t } }) : n.call(this, t, i);
                        }),
                        n
                    );
                }),
                t.define("select2/data/maximumInputLength", [], function () {
                    function n(n, t, i) {
                        this.maximumInputLength = i.get("maximumInputLength");
                        n.call(this, t, i);
                    }
                    return (
                        (n.prototype.query = function (n, t, i) {
                            t.term = t.term || "";
                            0 < this.maximumInputLength && t.term.length > this.maximumInputLength
                                ? this.trigger("results:message", { message: "inputTooLong", args: { maximum: this.maximumInputLength, input: t.term, params: t } })
                                : n.call(this, t, i);
                        }),
                        n
                    );
                }),
                t.define("select2/data/maximumSelectionLength", [], function () {
                    function n(n, t, i) {
                        this.maximumSelectionLength = i.get("maximumSelectionLength");
                        n.call(this, t, i);
                    }
                    return (
                        (n.prototype.bind = function (n, t, i) {
                            var r = this;
                            n.call(this, t, i);
                            t.on("select", function () {
                                r._checkIfMaximumSelected();
                            });
                        }),
                        (n.prototype.query = function (n, t, i) {
                            var r = this;
                            this._checkIfMaximumSelected(function () {
                                n.call(r, t, i);
                            });
                        }),
                        (n.prototype._checkIfMaximumSelected = function (n, t) {
                            var i = this;
                            this.current(function (n) {
                                var r = null != n ? n.length : 0;
                                0 < i.maximumSelectionLength && r >= i.maximumSelectionLength ? i.trigger("results:message", { message: "maximumSelected", args: { maximum: i.maximumSelectionLength } }) : t && t();
                            });
                        }),
                        n
                    );
                }),
                t.define("select2/dropdown", ["jquery", "./utils"], function (n, t) {
                    function i(n, t) {
                        this.$element = n;
                        this.options = t;
                        i.__super__.constructor.call(this);
                    }
                    return (
                        t.Extend(i, t.Observable),
                        (i.prototype.render = function () {
                            var t = n('<span class="select2-dropdown"><span class="select2-results"></span></span>');
                            return t.attr("dir", this.options.get("dir")), (this.$dropdown = t);
                        }),
                        (i.prototype.bind = function () {}),
                        (i.prototype.position = function () {}),
                        (i.prototype.destroy = function () {
                            this.$dropdown.remove();
                        }),
                        i
                    );
                }),
                t.define("select2/dropdown/search", ["jquery"], function (n) {
                    function t() {}
                    return (
                        (t.prototype.render = function (t) {
                            var r = t.call(this),
                                i = n(
                                    '<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></span>'
                                );
                            return (this.$searchContainer = i), (this.$search = i.find("input")), this.$search.prop("autocomplete", this.options.get("autocomplete")), r.prepend(i), r;
                        }),
                        (t.prototype.bind = function (t, i, r) {
                            var u = this,
                                f = i.id + "-results";
                            t.call(this, i, r);
                            this.$search.on("keydown", function (n) {
                                u.trigger("keypress", n);
                                u._keyUpPrevented = n.isDefaultPrevented();
                            });
                            this.$search.on("input", function () {
                                n(this).off("keyup");
                            });
                            this.$search.on("keyup input", function (n) {
                                u.handleSearch(n);
                            });
                            i.on("open", function () {
                                u.$search.attr("tabindex", 0);
                                u.$search.attr("aria-controls", f);
                                u.$search.trigger("focus");
                                window.setTimeout(function () {
                                    u.$search.trigger("focus");
                                }, 0);
                            });
                            i.on("close", function () {
                                u.$search.attr("tabindex", -1);
                                u.$search.removeAttr("aria-controls");
                                u.$search.removeAttr("aria-activedescendant");
                                u.$search.val("");
                                u.$search.trigger("blur");
                            });
                            i.on("focus", function () {
                                i.isOpen() || u.$search.trigger("focus");
                            });
                            i.on("results:all", function (n) {
                                (null != n.query.term && "" !== n.query.term) || (u.showSearch(n) ? u.$searchContainer[0].classList.remove("select2-search--hide") : u.$searchContainer[0].classList.add("select2-search--hide"));
                            });
                            i.on("results:focus", function (n) {
                                n.data._resultId ? u.$search.attr("aria-activedescendant", n.data._resultId) : u.$search.removeAttr("aria-activedescendant");
                            });
                        }),
                        (t.prototype.handleSearch = function () {
                            if (!this._keyUpPrevented) {
                                var n = this.$search.val();
                                this.trigger("query", { term: n });
                            }
                            this._keyUpPrevented = !1;
                        }),
                        (t.prototype.showSearch = function () {
                            return !0;
                        }),
                        t
                    );
                }),
                t.define("select2/dropdown/hidePlaceholder", [], function () {
                    function n(n, t, i, r) {
                        this.placeholder = this.normalizePlaceholder(i.get("placeholder"));
                        n.call(this, t, i, r);
                    }
                    return (
                        (n.prototype.append = function (n, t) {
                            t.results = this.removePlaceholder(t.results);
                            n.call(this, t);
                        }),
                        (n.prototype.normalizePlaceholder = function (n, t) {
                            return "string" == typeof t && (t = { id: "", text: t }), t;
                        }),
                        (n.prototype.removePlaceholder = function (n, t) {
                            for (var u, r = t.slice(0), i = t.length - 1; 0 <= i; i--) (u = t[i]), this.placeholder.id === u.id && r.splice(i, 1);
                            return r;
                        }),
                        n
                    );
                }),
                t.define("select2/dropdown/infiniteScroll", ["jquery"], function (n) {
                    function t(n, t, i, r) {
                        this.lastParams = {};
                        n.call(this, t, i, r);
                        this.$loadingMore = this.createLoadingMore();
                        this.loading = !1;
                    }
                    return (
                        (t.prototype.append = function (n, t) {
                            this.$loadingMore.remove();
                            this.loading = !1;
                            n.call(this, t);
                            this.showLoadingMore(t) && (this.$results.append(this.$loadingMore), this.loadMoreIfNeeded());
                        }),
                        (t.prototype.bind = function (n, t, i) {
                            var r = this;
                            n.call(this, t, i);
                            t.on("query", function (n) {
                                r.lastParams = n;
                                r.loading = !0;
                            });
                            t.on("query:append", function (n) {
                                r.lastParams = n;
                                r.loading = !0;
                            });
                            this.$results.on("scroll", this.loadMoreIfNeeded.bind(this));
                        }),
                        (t.prototype.loadMoreIfNeeded = function () {
                            var i = n.contains(document.documentElement, this.$loadingMore[0]),
                                t;
                            !this.loading && i && ((t = this.$results.offset().top + this.$results.outerHeight(!1)), this.$loadingMore.offset().top + this.$loadingMore.outerHeight(!1) <= t + 50 && this.loadMore());
                        }),
                        (t.prototype.loadMore = function () {
                            this.loading = !0;
                            var t = n.extend({}, { page: 1 }, this.lastParams);
                            t.page++;
                            this.trigger("query:append", t);
                        }),
                        (t.prototype.showLoadingMore = function (n, t) {
                            return t.pagination && t.pagination.more;
                        }),
                        (t.prototype.createLoadingMore = function () {
                            var t = n('<li class="select2-results__option select2-results__option--load-more"role="option" aria-disabled="true"></li>'),
                                i = this.options.get("translations").get("loadingMore");
                            return t.html(i(this.lastParams)), t;
                        }),
                        t
                    );
                }),
                t.define("select2/dropdown/attachBody", ["jquery", "../utils"], function (n, t) {
                    function i(t, i, r) {
                        this.$dropdownParent = n(r.get("dropdownParent") || document.body);
                        t.call(this, i, r);
                    }
                    return (
                        (i.prototype.bind = function (n, t, i) {
                            var r = this;
                            n.call(this, t, i);
                            t.on("open", function () {
                                r._showDropdown();
                                r._attachPositioningHandler(t);
                                r._bindContainerResultHandlers(t);
                            });
                            t.on("close", function () {
                                r._hideDropdown();
                                r._detachPositioningHandler(t);
                            });
                            this.$dropdownContainer.on("mousedown", function (n) {
                                n.stopPropagation();
                            });
                        }),
                        (i.prototype.destroy = function (n) {
                            n.call(this);
                            this.$dropdownContainer.remove();
                        }),
                        (i.prototype.position = function (n, t, i) {
                            t.attr("class", i.attr("class"));
                            t[0].classList.remove("select2");
                            t[0].classList.add("select2-container--open");
                            t.css({ position: "absolute", top: -999999 });
                            this.$container = i;
                        }),
                        (i.prototype.render = function (t) {
                            var i = n("<span></span>"),
                                r = t.call(this);
                            return i.append(r), (this.$dropdownContainer = i);
                        }),
                        (i.prototype._hideDropdown = function () {
                            this.$dropdownContainer.detach();
                        }),
                        (i.prototype._bindContainerResultHandlers = function (n, t) {
                            if (!this._containerResultsHandlersBound) {
                                var i = this;
                                t.on("results:all", function () {
                                    i._positionDropdown();
                                    i._resizeDropdown();
                                });
                                t.on("results:append", function () {
                                    i._positionDropdown();
                                    i._resizeDropdown();
                                });
                                t.on("results:message", function () {
                                    i._positionDropdown();
                                    i._resizeDropdown();
                                });
                                t.on("select", function () {
                                    i._positionDropdown();
                                    i._resizeDropdown();
                                });
                                t.on("unselect", function () {
                                    i._positionDropdown();
                                    i._resizeDropdown();
                                });
                                this._containerResultsHandlersBound = !0;
                            }
                        }),
                        (i.prototype._attachPositioningHandler = function (i, r) {
                            var u = this,
                                f = "scroll.select2." + r.id,
                                o = "resize.select2." + r.id,
                                s = "orientationchange.select2." + r.id,
                                e = this.$container.parents().filter(t.hasScroll);
                            e.each(function () {
                                t.StoreData(this, "select2-scroll-position", { x: n(this).scrollLeft(), y: n(this).scrollTop() });
                            });
                            e.on(f, function () {
                                var i = t.GetData(this, "select2-scroll-position");
                                n(this).scrollTop(i.y);
                            });
                            n(window).on(f + " " + o + " " + s, function () {
                                u._positionDropdown();
                                u._resizeDropdown();
                            });
                        }),
                        (i.prototype._detachPositioningHandler = function (i, r) {
                            var u = "scroll.select2." + r.id,
                                f = "resize.select2." + r.id,
                                e = "orientationchange.select2." + r.id;
                            this.$container.parents().filter(t.hasScroll).off(u);
                            n(window).off(u + " " + f + " " + e);
                        }),
                        (i.prototype._positionDropdown = function () {
                            var s = n(window),
                                e = this.$dropdown[0].classList.contains("select2-dropdown--above"),
                                a = this.$dropdown[0].classList.contains("select2-dropdown--below"),
                                t = null,
                                i = this.$container.offset(),
                                r,
                                f;
                            i.bottom = i.top + this.$container.outerHeight(!1);
                            r = { height: this.$container.outerHeight(!1) };
                            r.top = i.top;
                            r.bottom = i.top + r.height;
                            var h = this.$dropdown.outerHeight(!1),
                                v = s.scrollTop(),
                                y = s.scrollTop() + s.height(),
                                c = v < i.top - h,
                                l = y > i.bottom + h,
                                o = { left: i.left, top: r.bottom },
                                u = this.$dropdownParent;
                            "static" === u.css("position") && (u = u.offsetParent());
                            f = { top: 0, left: 0 };
                            (n.contains(document.body, u[0]) || u[0].isConnected) && (f = u.offset());
                            o.top -= f.top;
                            o.left -= f.left;
                            e || a || (t = "below");
                            l || !c || e ? !c && l && e && (t = "below") : (t = "above");
                            ("above" == t || (e && "below" !== t)) && (o.top = r.top - f.top - h);
                            null != t &&
                                (this.$dropdown[0].classList.remove("select2-dropdown--below"),
                                this.$dropdown[0].classList.remove("select2-dropdown--above"),
                                this.$dropdown[0].classList.add("select2-dropdown--" + t),
                                this.$container[0].classList.remove("select2-container--below"),
                                this.$container[0].classList.remove("select2-container--above"),
                                this.$container[0].classList.add("select2-container--" + t));
                            this.$dropdownContainer.css(o);
                        }),
                        (i.prototype._resizeDropdown = function () {
                            var n = { width: this.$container.outerWidth(!1) + "px" };
                            this.options.get("dropdownAutoWidth") && ((n.minWidth = n.width), (n.position = "relative"), (n.width = "auto"));
                            this.$dropdown.css(n);
                        }),
                        (i.prototype._showDropdown = function () {
                            this.$dropdownContainer.appendTo(this.$dropdownParent);
                            this._positionDropdown();
                            this._resizeDropdown();
                        }),
                        i
                    );
                }),
                t.define("select2/dropdown/minimumResultsForSearch", [], function () {
                    function n(n, t, i, r) {
                        this.minimumResultsForSearch = i.get("minimumResultsForSearch");
                        this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0);
                        n.call(this, t, i, r);
                    }
                    return (
                        (n.prototype.showSearch = function (n, t) {
                            return (
                                !(
                                    (function n(t) {
                                        for (var u, i = 0, r = 0; r < t.length; r++) (u = t[r]), u.children ? (i += n(u.children)) : i++;
                                        return i;
                                    })(t.data.results) < this.minimumResultsForSearch
                                ) && n.call(this, t)
                            );
                        }),
                        n
                    );
                }),
                t.define("select2/dropdown/selectOnClose", ["../utils"], function (n) {
                    function t() {}
                    return (
                        (t.prototype.bind = function (n, t, i) {
                            var r = this;
                            n.call(this, t, i);
                            t.on("close", function (n) {
                                r._handleSelectOnClose(n);
                            });
                        }),
                        (t.prototype._handleSelectOnClose = function (t, i) {
                            var u, f, r;
                            (i && null != i.originalSelect2Event && ((u = i.originalSelect2Event), "select" === u._type || "unselect" === u._type)) ||
                                ((f = this.getHighlightedResults()), f.length < 1 || ((r = n.GetData(f[0], "data")), (null != r.element && r.element.selected) || (null == r.element && r.selected) || this.trigger("select", { data: r })));
                        }),
                        t
                    );
                }),
                t.define("select2/dropdown/closeOnSelect", [], function () {
                    function n() {}
                    return (
                        (n.prototype.bind = function (n, t, i) {
                            var r = this;
                            n.call(this, t, i);
                            t.on("select", function (n) {
                                r._selectTriggered(n);
                            });
                            t.on("unselect", function (n) {
                                r._selectTriggered(n);
                            });
                        }),
                        (n.prototype._selectTriggered = function (n, t) {
                            var i = t.originalEvent;
                            (i && (i.ctrlKey || i.metaKey)) || this.trigger("close", { originalEvent: i, originalSelect2Event: t });
                        }),
                        n
                    );
                }),
                t.define("select2/dropdown/dropdownCss", ["../utils"], function (n) {
                    function t() {}
                    return (
                        (t.prototype.render = function (t) {
                            var r = t.call(this),
                                i = this.options.get("dropdownCssClass") || "";
                            return -1 !== i.indexOf(":all:") && ((i = i.replace(":all:", "")), n.copyNonInternalCssClasses(r[0], this.$element[0])), r.addClass(i), r;
                        }),
                        t
                    );
                }),
                t.define("select2/i18n/en", [], function () {
                    return {
                        errorLoading: function () {
                            return "The results could not be loaded.";
                        },
                        inputTooLong: function (n) {
                            var t = n.input.length - n.maximum,
                                i = "Please delete " + t + " character";
                            return 1 != t && (i += "s"), i;
                        },
                        inputTooShort: function (n) {
                            return "Please enter " + (n.minimum - n.input.length) + " or more characters";
                        },
                        loadingMore: function () {
                            return "Loading more results…";
                        },
                        maximumSelected: function (n) {
                            var t = "You can only select " + n.maximum + " item";
                            return 1 != n.maximum && (t += "s"), t;
                        },
                        noResults: function () {
                            return "No results found";
                        },
                        searching: function () {
                            return "Searching…";
                        },
                        removeAllItems: function () {
                            return "Remove all items";
                        },
                        removeItem: function () {
                            return "Remove item";
                        },
                    };
                }),
                t.define(
                    "select2/defaults",
                    [
                        "jquery",
                        "./results",
                        "./selection/single",
                        "./selection/multiple",
                        "./selection/placeholder",
                        "./selection/allowClear",
                        "./selection/search",
                        "./selection/selectionCss",
                        "./selection/eventRelay",
                        "./utils",
                        "./translation",
                        "./diacritics",
                        "./data/select",
                        "./data/array",
                        "./data/ajax",
                        "./data/tags",
                        "./data/tokenizer",
                        "./data/minimumInputLength",
                        "./data/maximumInputLength",
                        "./data/maximumSelectionLength",
                        "./dropdown",
                        "./dropdown/search",
                        "./dropdown/hidePlaceholder",
                        "./dropdown/infiniteScroll",
                        "./dropdown/attachBody",
                        "./dropdown/minimumResultsForSearch",
                        "./dropdown/selectOnClose",
                        "./dropdown/closeOnSelect",
                        "./dropdown/dropdownCss",
                        "./i18n/en",
                    ],
                    function (n, t, i, r, u, f, e, o, s, h, c, l, a, v, y, p, w, b, k, d, g, nt, tt, it, rt, ut, ft, et, ot) {
                        function st() {
                            this.reset();
                        }
                        return (
                            (st.prototype.apply = function (c) {
                                var ct, l, st, ht;
                                for (
                                    (null == (c = n.extend(!0, {}, this.defaults, c)).dataAdapter &&
                                        ((c.dataAdapter = null != c.ajax ? y : null != c.data ? v : a),
                                        0 < c.minimumInputLength && (c.dataAdapter = h.Decorate(c.dataAdapter, b)),
                                        0 < c.maximumInputLength && (c.dataAdapter = h.Decorate(c.dataAdapter, k)),
                                        0 < c.maximumSelectionLength && (c.dataAdapter = h.Decorate(c.dataAdapter, d)),
                                        c.tags && (c.dataAdapter = h.Decorate(c.dataAdapter, p)),
                                        (null == c.tokenSeparators && null == c.tokenizer) || (c.dataAdapter = h.Decorate(c.dataAdapter, w))),
                                    null == c.resultsAdapter &&
                                        ((c.resultsAdapter = t),
                                        null != c.ajax && (c.resultsAdapter = h.Decorate(c.resultsAdapter, it)),
                                        null != c.placeholder && (c.resultsAdapter = h.Decorate(c.resultsAdapter, tt)),
                                        c.selectOnClose && (c.resultsAdapter = h.Decorate(c.resultsAdapter, ft))),
                                    null == c.dropdownAdapter) &&
                                        (c.multiple ? (c.dropdownAdapter = g) : ((ct = h.Decorate(g, nt)), (c.dropdownAdapter = ct)),
                                        0 !== c.minimumResultsForSearch && (c.dropdownAdapter = h.Decorate(c.dropdownAdapter, ut)),
                                        c.closeOnSelect && (c.dropdownAdapter = h.Decorate(c.dropdownAdapter, et)),
                                        null != c.dropdownCssClass && (c.dropdownAdapter = h.Decorate(c.dropdownAdapter, ot)),
                                        (c.dropdownAdapter = h.Decorate(c.dropdownAdapter, rt))),
                                        null == c.selectionAdapter &&
                                            ((c.selectionAdapter = c.multiple ? r : i),
                                            null != c.placeholder && (c.selectionAdapter = h.Decorate(c.selectionAdapter, u)),
                                            c.allowClear && (c.selectionAdapter = h.Decorate(c.selectionAdapter, f)),
                                            c.multiple && (c.selectionAdapter = h.Decorate(c.selectionAdapter, e)),
                                            null != c.selectionCssClass && (c.selectionAdapter = h.Decorate(c.selectionAdapter, o)),
                                            (c.selectionAdapter = h.Decorate(c.selectionAdapter, s))),
                                        c.language = this._resolveLanguage(c.language),
                                        c.language.push("en"),
                                        l = [],
                                        st = 0;
                                    st < c.language.length;
                                    st++
                                )
                                    (ht = c.language[st]), -1 === l.indexOf(ht) && l.push(ht);
                                return (c.language = l), (c.translations = this._processTranslations(c.language, c.debug)), c;
                            }),
                            (st.prototype.reset = function () {
                                function t(n) {
                                    return n.replace(/[^\u0000-\u007E]/g, function (n) {
                                        return l[n] || n;
                                    });
                                }
                                this.defaults = {
                                    amdLanguageBase: "./i18n/",
                                    autocomplete: "off",
                                    closeOnSelect: !0,
                                    debug: !1,
                                    dropdownAutoWidth: !1,
                                    escapeMarkup: h.escapeMarkup,
                                    language: {},
                                    matcher: function i(r, u) {
                                        var f, e, o, s;
                                        if (null == r.term || "" === r.term.trim()) return u;
                                        if (u.children && 0 < u.children.length) {
                                            for (f = n.extend(!0, {}, u), e = u.children.length - 1; 0 <= e; e--) null == i(r, u.children[e]) && f.children.splice(e, 1);
                                            return 0 < f.children.length ? f : i(r, f);
                                        }
                                        return (o = t(u.text).toUpperCase()), (s = t(r.term).toUpperCase()), -1 < o.indexOf(s) ? u : null;
                                    },
                                    minimumInputLength: 0,
                                    maximumInputLength: 0,
                                    maximumSelectionLength: 0,
                                    minimumResultsForSearch: 0,
                                    selectOnClose: !1,
                                    scrollAfterSelect: !1,
                                    sorter: function (n) {
                                        return n;
                                    },
                                    templateResult: function (n) {
                                        return n.text;
                                    },
                                    templateSelection: function (n) {
                                        return n.text;
                                    },
                                    theme: "default",
                                    width: "resolve",
                                };
                            }),
                            (st.prototype.applyFromElement = function (n, t) {
                                var i = n.language,
                                    r = this.defaults.language,
                                    u = t.prop("lang"),
                                    f = t.closest("[lang]").prop("lang"),
                                    e = Array.prototype.concat.call(this._resolveLanguage(u), this._resolveLanguage(i), this._resolveLanguage(r), this._resolveLanguage(f));
                                return (n.language = e), n;
                            }),
                            (st.prototype._resolveLanguage = function (t) {
                                var r, u, i, f;
                                if (!t) return [];
                                if (n.isEmptyObject(t)) return [];
                                if (n.isPlainObject(t)) return [t];
                                for (r = Array.isArray(t) ? t : [t], u = [], i = 0; i < r.length; i++) (u.push(r[i]), "string" == typeof r[i] && 0 < r[i].indexOf("-")) && ((f = r[i].split("-")[0]), u.push(f));
                                return u;
                            }),
                            (st.prototype._processTranslations = function (t, i) {
                                for (var u, r, e = new c(), f = 0; f < t.length; f++) {
                                    if (((u = new c()), (r = t[f]), "string" == typeof r))
                                        try {
                                            u = c.loadPath(r);
                                        } catch (t) {
                                            try {
                                                r = this.defaults.amdLanguageBase + r;
                                                u = c.loadPath(r);
                                            } catch (t) {
                                                i && window.console && console.warn && console.warn('Select2: The language file for "' + r + '" could not be automatically loaded. A fallback will be used instead.');
                                            }
                                        }
                                    else u = n.isPlainObject(r) ? new c(r) : r;
                                    e.extend(u);
                                }
                                return e;
                            }),
                            (st.prototype.set = function (t, i) {
                                var r = {},
                                    u;
                                r[n.camelCase(t)] = i;
                                u = h._convertData(r);
                                n.extend(!0, this.defaults, u);
                            }),
                            new st()
                        );
                    }
                ),
                t.define("select2/options", ["jquery", "./defaults", "./utils"], function (n, t, i) {
                    function r(n, i) {
                        this.options = n;
                        null != i && this.fromElement(i);
                        null != i && (this.options = t.applyFromElement(this.options, i));
                        this.options = t.apply(this.options);
                    }
                    return (
                        (r.prototype.fromElement = function (t) {
                            function a(n, t) {
                                return t.toUpperCase();
                            }
                            var l = ["select2"],
                                u,
                                e,
                                s,
                                o,
                                h,
                                c,
                                f,
                                r;
                            for (
                                null == this.options.multiple && (this.options.multiple = t.prop("multiple")),
                                    null == this.options.disabled && (this.options.disabled = t.prop("disabled")),
                                    null == this.options.autocomplete && t.prop("autocomplete") && (this.options.autocomplete = t.prop("autocomplete")),
                                    null == this.options.dir && (this.options.dir = t.prop("dir") ? t.prop("dir") : t.closest("[dir]").prop("dir") ? t.closest("[dir]").prop("dir") : "ltr"),
                                    t.prop("disabled", this.options.disabled),
                                    t.prop("multiple", this.options.multiple),
                                    i.GetData(t[0], "select2Tags") &&
                                        (this.options.debug &&
                                            window.console &&
                                            console.warn &&
                                            console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),
                                        i.StoreData(t[0], "data", i.GetData(t[0], "select2Tags")),
                                        i.StoreData(t[0], "tags", !0)),
                                    i.GetData(t[0], "ajaxUrl") &&
                                        (this.options.debug &&
                                            window.console &&
                                            console.warn &&
                                            console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),
                                        t.attr("ajax--url", i.GetData(t[0], "ajaxUrl")),
                                        i.StoreData(t[0], "ajax-Url", i.GetData(t[0], "ajaxUrl"))),
                                    u = {},
                                    e = 0;
                                e < t[0].attributes.length;
                                e++
                            )
                                (s = t[0].attributes[e].name), (o = "data-"), s.substr(0, o.length) == o && ((h = s.substring(o.length)), (c = i.GetData(t[0], h)), (u[h.replace(/-([a-z])/g, a)] = c));
                            n.fn.jquery && "1." == n.fn.jquery.substr(0, 2) && t[0].dataset && (u = n.extend(!0, {}, t[0].dataset, u));
                            f = n.extend(!0, {}, i.GetData(t[0]), u);
                            for (r in (f = i._convertData(f))) -1 < l.indexOf(r) || (n.isPlainObject(this.options[r]) ? n.extend(this.options[r], f[r]) : (this.options[r] = f[r]));
                            return this;
                        }),
                        (r.prototype.get = function (n) {
                            return this.options[n];
                        }),
                        (r.prototype.set = function (n, t) {
                            this.options[n] = t;
                        }),
                        r
                    );
                }),
                t.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function (n, t, i, r) {
                    var u = function (n, r) {
                        var e, o, f, s, h, c, l;
                        null != i.GetData(n[0], "select2") && i.GetData(n[0], "select2").destroy();
                        this.$element = n;
                        this.id = this._generateId(n);
                        r = r || {};
                        this.options = new t(r, n);
                        u.__super__.constructor.call(this);
                        e = n.attr("tabindex") || 0;
                        i.StoreData(n[0], "old-tabindex", e);
                        n.attr("tabindex", "-1");
                        o = this.options.get("dataAdapter");
                        this.dataAdapter = new o(n, this.options);
                        f = this.render();
                        this._placeContainer(f);
                        s = this.options.get("selectionAdapter");
                        this.selection = new s(n, this.options);
                        this.$selection = this.selection.render();
                        this.selection.position(this.$selection, f);
                        h = this.options.get("dropdownAdapter");
                        this.dropdown = new h(n, this.options);
                        this.$dropdown = this.dropdown.render();
                        this.dropdown.position(this.$dropdown, f);
                        c = this.options.get("resultsAdapter");
                        this.results = new c(n, this.options, this.dataAdapter);
                        this.$results = this.results.render();
                        this.results.position(this.$results, this.$dropdown);
                        l = this;
                        this._bindAdapters();
                        this._registerDomEvents();
                        this._registerDataEvents();
                        this._registerSelectionEvents();
                        this._registerDropdownEvents();
                        this._registerResultsEvents();
                        this._registerEvents();
                        this.dataAdapter.current(function (n) {
                            l.trigger("selection:update", { data: n });
                        });
                        n[0].classList.add("select2-hidden-accessible");
                        n.attr("aria-hidden", "true");
                        this._syncAttributes();
                        i.StoreData(n[0], "select2", this);
                        n.data("select2", this);
                    };
                    return (
                        i.Extend(u, i.Observable),
                        (u.prototype._generateId = function (n) {
                            return "select2-" + (null != n.attr("id") ? n.attr("id") : null != n.attr("name") ? n.attr("name") + "-" + i.generateChars(2) : i.generateChars(4)).replace(/(:|\.|\[|\]|,)/g, "");
                        }),
                        (u.prototype._placeContainer = function (n) {
                            n.insertAfter(this.$element);
                            var t = this._resolveWidth(this.$element, this.options.get("width"));
                            null != t && n.css("width", t);
                        }),
                        (u.prototype._resolveWidth = function (n, t) {
                            var r, u, f, i;
                            if ("resolve" == t) return (r = this._resolveWidth(n, "style")), null != r ? r : this._resolveWidth(n, "element");
                            if ("element" == t) return (u = n.outerWidth(!1)), u <= 0 ? "auto" : u + "px";
                            if ("style" != t) return "computedstyle" != t ? t : window.getComputedStyle(n[0]).width;
                            if (((f = n.attr("style")), "string" != typeof f)) return null;
                            for (var o = f.split(";"), e = 0, s = o.length; e < s; e += 1) if (((i = o[e].replace(/\s/g, "").match(/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i)), null !== i && 1 <= i.length)) return i[1];
                            return null;
                        }),
                        (u.prototype._bindAdapters = function () {
                            this.dataAdapter.bind(this, this.$container);
                            this.selection.bind(this, this.$container);
                            this.dropdown.bind(this, this.$container);
                            this.results.bind(this, this.$container);
                        }),
                        (u.prototype._registerDomEvents = function () {
                            var n = this;
                            this.$element.on("change.select2", function () {
                                n.dataAdapter.current(function (t) {
                                    n.trigger("selection:update", { data: t });
                                });
                            });
                            this.$element.on("focus.select2", function (t) {
                                n.trigger("focus", t);
                            });
                            this._syncA = i.bind(this._syncAttributes, this);
                            this._syncS = i.bind(this._syncSubtree, this);
                            this._observer = new window.MutationObserver(function (t) {
                                n._syncA();
                                n._syncS(t);
                            });
                            this._observer.observe(this.$element[0], { attributes: !0, childList: !0, subtree: !1 });
                        }),
                        (u.prototype._registerDataEvents = function () {
                            var n = this;
                            this.dataAdapter.on("*", function (t, i) {
                                n.trigger(t, i);
                            });
                        }),
                        (u.prototype._registerSelectionEvents = function () {
                            var n = this,
                                t = ["toggle", "focus"];
                            this.selection.on("toggle", function () {
                                n.toggleDropdown();
                            });
                            this.selection.on("focus", function (t) {
                                n.focus(t);
                            });
                            this.selection.on("*", function (i, r) {
                                -1 === t.indexOf(i) && n.trigger(i, r);
                            });
                        }),
                        (u.prototype._registerDropdownEvents = function () {
                            var n = this;
                            this.dropdown.on("*", function (t, i) {
                                n.trigger(t, i);
                            });
                        }),
                        (u.prototype._registerResultsEvents = function () {
                            var n = this;
                            this.results.on("*", function (t, i) {
                                n.trigger(t, i);
                            });
                        }),
                        (u.prototype._registerEvents = function () {
                            var n = this;
                            this.on("open", function () {
                                n.$container[0].classList.add("select2-container--open");
                            });
                            this.on("close", function () {
                                n.$container[0].classList.remove("select2-container--open");
                            });
                            this.on("enable", function () {
                                n.$container[0].classList.remove("select2-container--disabled");
                            });
                            this.on("disable", function () {
                                n.$container[0].classList.add("select2-container--disabled");
                            });
                            this.on("blur", function () {
                                n.$container[0].classList.remove("select2-container--focus");
                            });
                            this.on("query", function (t) {
                                n.isOpen() || n.trigger("open", {});
                                this.dataAdapter.query(t, function (i) {
                                    n.trigger("results:all", { data: i, query: t });
                                });
                            });
                            this.on("query:append", function (t) {
                                this.dataAdapter.query(t, function (i) {
                                    n.trigger("results:append", { data: i, query: t });
                                });
                            });
                            this.on("keypress", function (t) {
                                var i = t.which;
                                n.isOpen()
                                    ? i === r.ESC || i === r.TAB || (i === r.UP && t.altKey)
                                        ? (n.close(t), t.preventDefault())
                                        : i === r.ENTER
                                        ? (n.trigger("results:select", {}), t.preventDefault())
                                        : i === r.SPACE && t.ctrlKey
                                        ? (n.trigger("results:toggle", {}), t.preventDefault())
                                        : i === r.UP
                                        ? (n.trigger("results:previous", {}), t.preventDefault())
                                        : i === r.DOWN && (n.trigger("results:next", {}), t.preventDefault())
                                    : (i === r.ENTER || i === r.SPACE || (i === r.DOWN && t.altKey)) && (n.open(), t.preventDefault());
                            });
                        }),
                        (u.prototype._syncAttributes = function () {
                            this.options.set("disabled", this.$element.prop("disabled"));
                            this.isDisabled() ? (this.isOpen() && this.close(), this.trigger("disable", {})) : this.trigger("enable", {});
                        }),
                        (u.prototype._isChangeMutation = function (n) {
                            var i = this,
                                t;
                            if (n.addedNodes && 0 < n.addedNodes.length) {
                                for (t = 0; t < n.addedNodes.length; t++) if (n.addedNodes[t].selected) return !0;
                            } else {
                                if (n.removedNodes && 0 < n.removedNodes.length) return !0;
                                if (Array.isArray(n))
                                    return n.some(function (n) {
                                        return i._isChangeMutation(n);
                                    });
                            }
                            return !1;
                        }),
                        (u.prototype._syncSubtree = function (n) {
                            var t = this._isChangeMutation(n),
                                i = this;
                            t &&
                                this.dataAdapter.current(function (n) {
                                    i.trigger("selection:update", { data: n });
                                });
                        }),
                        (u.prototype.trigger = function (n, t) {
                            var r = u.__super__.trigger,
                                f = { open: "opening", close: "closing", select: "selecting", unselect: "unselecting", clear: "clearing" },
                                e,
                                i;
                            if ((void 0 === t && (t = {}), n in f) && ((e = f[n]), (i = { prevented: !1, name: n, args: t }), r.call(this, e, i), i.prevented)) return void (t.prevented = !0);
                            r.call(this, n, t);
                        }),
                        (u.prototype.toggleDropdown = function () {
                            this.isDisabled() || (this.isOpen() ? this.close() : this.open());
                        }),
                        (u.prototype.open = function () {
                            this.isOpen() || this.isDisabled() || this.trigger("query", {});
                        }),
                        (u.prototype.close = function (n) {
                            this.isOpen() && this.trigger("close", { originalEvent: n });
                        }),
                        (u.prototype.isEnabled = function () {
                            return !this.isDisabled();
                        }),
                        (u.prototype.isDisabled = function () {
                            return this.options.get("disabled");
                        }),
                        (u.prototype.isOpen = function () {
                            return this.$container[0].classList.contains("select2-container--open");
                        }),
                        (u.prototype.hasFocus = function () {
                            return this.$container[0].classList.contains("select2-container--focus");
                        }),
                        (u.prototype.focus = function () {
                            this.hasFocus() || (this.$container[0].classList.add("select2-container--focus"), this.trigger("focus", {}));
                        }),
                        (u.prototype.enable = function (n) {
                            this.options.get("debug") &&
                                window.console &&
                                console.warn &&
                                console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.');
                            (null != n && 0 !== n.length) || (n = [!0]);
                            var t = !n[0];
                            this.$element.prop("disabled", t);
                        }),
                        (u.prototype.data = function () {
                            this.options.get("debug") &&
                                0 < arguments.length &&
                                window.console &&
                                console.warn &&
                                console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');
                            var n = [];
                            return (
                                this.dataAdapter.current(function (t) {
                                    n = t;
                                }),
                                n
                            );
                        }),
                        (u.prototype.val = function (n) {
                            if (
                                (this.options.get("debug") &&
                                    window.console &&
                                    console.warn &&
                                    console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),
                                null == n || 0 === n.length)
                            )
                                return this.$element.val();
                            var t = n[0];
                            Array.isArray(t) &&
                                (t = t.map(function (n) {
                                    return n.toString();
                                }));
                            this.$element.val(t).trigger("input").trigger("change");
                        }),
                        (u.prototype.destroy = function () {
                            this.$container.remove();
                            this._observer.disconnect();
                            this._observer = null;
                            this._syncA = null;
                            this._syncS = null;
                            this.$element.off(".select2");
                            this.$element.attr("tabindex", i.GetData(this.$element[0], "old-tabindex"));
                            this.$element[0].classList.remove("select2-hidden-accessible");
                            this.$element.attr("aria-hidden", "false");
                            i.RemoveData(this.$element[0]);
                            this.$element.removeData("select2");
                            this.dataAdapter.destroy();
                            this.selection.destroy();
                            this.dropdown.destroy();
                            this.results.destroy();
                            this.dataAdapter = null;
                            this.selection = null;
                            this.dropdown = null;
                            this.results = null;
                        }),
                        (u.prototype.render = function () {
                            var t = n('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');
                            return t.attr("dir", this.options.get("dir")), (this.$container = t), this.$container[0].classList.add("select2-container--" + this.options.get("theme")), i.StoreData(t[0], "element", this.$element), t;
                        }),
                        u
                    );
                }),
                t.define("jquery-mousewheel", ["jquery"], function (n) {
                    return n;
                }),
                t.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults", "./select2/utils"], function (n, t, i, r, u) {
                    if (null == n.fn.select2) {
                        var f = ["open", "close", "destroy"];
                        n.fn.select2 = function (t) {
                            if ("object" == typeof (t = t || {}))
                                return (
                                    this.each(function () {
                                        var r = n.extend(!0, {}, t);
                                        new i(n(this), r);
                                    }),
                                    this
                                );
                            if ("string" != typeof t) throw new Error("Invalid arguments for Select2: " + t);
                            var r,
                                e = Array.prototype.slice.call(arguments, 1);
                            return (
                                this.each(function () {
                                    var n = u.GetData(this, "select2");
                                    null == n && window.console && console.error && console.error("The select2('" + t + "') method was called on an element that is not using Select2.");
                                    r = n[t].apply(n, e);
                                }),
                                -1 < f.indexOf(t) ? this : r
                            );
                        };
                    }
                    return null == n.fn.select2.defaults && (n.fn.select2.defaults = r), i;
                }),
                { define: t.define, require: t.require }
            );
        })(),
        i = t.require("jquery.select2");
    return (n.fn.select2.amd = t), i;
});
!(function (n, t, i) {
    "use strict";
    function s(n, t) {
        var u,
            o,
            e,
            r = [],
            s = 0;
        (n && n.isDefaultPrevented()) ||
            (n.preventDefault(),
            (t = t || {}),
            n && n.data && (t = f(n.data.options, t)),
            (u = t.$target || i(n.currentTarget).trigger("blur")),
            ((e = i.fancybox.getInstance()) && e.$trigger && e.$trigger.is(u)) ||
                (t.selector ? (r = i(t.selector)) : ((o = u.attr("data-fancybox") || ""), o ? ((r = n.data ? n.data.items : []), (r = r.length ? r.filter('[data-fancybox="' + o + '"]') : i('[data-fancybox="' + o + '"]'))) : (r = [u])),
                (s = i(r).index(u)),
                s < 0 && (s = 0),
                (e = i.fancybox.open(r, t, s)),
                (e.$trigger = u)));
    }
    if (((n.console = n.console || { info: function () {} }), i)) {
        if (i.fn.fancybox) return void console.info("fancyBox already initialized");
        var l = {
                closeExisting: !1,
                loop: !1,
                gutter: 50,
                keyboard: !0,
                preventCaptionOverlap: !0,
                arrows: !0,
                infobar: !0,
                smallBtn: "auto",
                toolbar: "auto",
                buttons: ["zoom", "slideShow", "thumbs", "close"],
                idleTime: 3,
                protect: !1,
                modal: !1,
                image: { preload: !1 },
                ajax: { settings: { data: { fancybox: !0 } } },
                iframe: {
                    tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
                    preload: !0,
                    css: {},
                    attr: { scrolling: "auto" },
                },
                video: {
                    tpl:
                        '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',
                    format: "",
                    autoStart: !0,
                },
                defaultType: "image",
                animationEffect: "zoom",
                animationDuration: 366,
                zoomOpacity: "auto",
                transitionEffect: "fade",
                transitionDuration: 366,
                slideClass: "",
                baseClass: "",
                baseTpl:
                    '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',
                spinnerTpl: '<div class="fancybox-loading"></div>',
                errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
                btnTpl: {
                    download:
                        '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
                    zoom:
                        '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
                    close:
                        '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
                    arrowLeft:
                        '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
                    arrowRight:
                        '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
                    smallBtn:
                        '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>',
                },
                parentEl: "body",
                hideScrollbar: !0,
                autoFocus: !0,
                backFocus: !0,
                trapFocus: !0,
                fullScreen: { autoStart: !1 },
                touch: { vertical: !0, momentum: !0 },
                hash: null,
                media: {},
                slideShow: { autoStart: !1, speed: 3e3 },
                thumbs: { autoStart: !1, hideOnClose: !0, parentEl: ".fancybox-container", axis: "y" },
                wheel: "auto",
                onInit: i.noop,
                beforeLoad: i.noop,
                afterLoad: i.noop,
                beforeShow: i.noop,
                afterShow: i.noop,
                beforeClose: i.noop,
                afterClose: i.noop,
                onActivate: i.noop,
                onDeactivate: i.noop,
                clickContent: function (n) {
                    return "image" === n.type && "zoom";
                },
                clickSlide: "close",
                clickOutside: "close",
                dblclickContent: !1,
                dblclickSlide: !1,
                dblclickOutside: !1,
                mobile: {
                    preventCaptionOverlap: !1,
                    idleTime: !1,
                    clickContent: function (n) {
                        return "image" === n.type && "toggleControls";
                    },
                    clickSlide: function (n) {
                        return "image" === n.type ? "toggleControls" : "close";
                    },
                    dblclickContent: function (n) {
                        return "image" === n.type && "zoom";
                    },
                    dblclickSlide: function (n) {
                        return "image" === n.type && "zoom";
                    },
                },
                lang: "en",
                i18n: {
                    en: {
                        CLOSE: "Close",
                        NEXT: "Next",
                        PREV: "Previous",
                        ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                        PLAY_START: "Start slideshow",
                        PLAY_STOP: "Pause slideshow",
                        FULL_SCREEN: "Full screen",
                        THUMBS: "Thumbnails",
                        DOWNLOAD: "Download",
                        SHARE: "Share",
                        ZOOM: "Zoom",
                    },
                    de: {
                        CLOSE: "Schlie&szlig;en",
                        NEXT: "Weiter",
                        PREV: "Zur&uuml;ck",
                        ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
                        PLAY_START: "Diaschau starten",
                        PLAY_STOP: "Diaschau beenden",
                        FULL_SCREEN: "Vollbild",
                        THUMBS: "Vorschaubilder",
                        DOWNLOAD: "Herunterladen",
                        SHARE: "Teilen",
                        ZOOM: "Vergr&ouml;&szlig;ern",
                    },
                },
            },
            e = i(n),
            r = i(t),
            a = 0,
            v = function (n) {
                return n && n.hasOwnProperty && n instanceof i;
            },
            c = (function () {
                return (
                    n.requestAnimationFrame ||
                    n.webkitRequestAnimationFrame ||
                    n.mozRequestAnimationFrame ||
                    n.oRequestAnimationFrame ||
                    function (t) {
                        return n.setTimeout(t, 1e3 / 60);
                    }
                );
            })(),
            y = (function () {
                return (
                    n.cancelAnimationFrame ||
                    n.webkitCancelAnimationFrame ||
                    n.mozCancelAnimationFrame ||
                    n.oCancelAnimationFrame ||
                    function (t) {
                        n.clearTimeout(t);
                    }
                );
            })(),
            o = (function () {
                var n,
                    r = t.createElement("fakeelement"),
                    i = { transition: "transitionend", OTransition: "oTransitionEnd", MozTransition: "transitionend", WebkitTransition: "webkitTransitionEnd" };
                for (n in i) if (void 0 !== r.style[n]) return i[n];
                return "transitionend";
            })(),
            u = function (n) {
                return n && n.length && n[0].offsetHeight;
            },
            f = function (n, t) {
                var r = i.extend(!0, {}, n, t);
                return (
                    i.each(t, function (n, t) {
                        i.isArray(t) && (r[n] = t);
                    }),
                    r
                );
            },
            p = function (n) {
                var r, u;
                return (
                    !(!n || n.ownerDocument !== t) &&
                    (i(".fancybox-container").css("pointer-events", "none"),
                    (r = { x: n.getBoundingClientRect().left + n.offsetWidth / 2, y: n.getBoundingClientRect().top + n.offsetHeight / 2 }),
                    (u = t.elementFromPoint(r.x, r.y) === n),
                    i(".fancybox-container").css("pointer-events", ""),
                    u)
                );
            },
            h = function (n, t, r) {
                var u = this;
                u.opts = f({ index: r }, i.fancybox.defaults);
                i.isPlainObject(t) && (u.opts = f(u.opts, t));
                i.fancybox.isMobile && (u.opts = f(u.opts, u.opts.mobile));
                u.id = u.opts.id || ++a;
                u.currIndex = parseInt(u.opts.index, 10) || 0;
                u.prevIndex = null;
                u.prevPos = null;
                u.currPos = 0;
                u.firstRun = !0;
                u.group = [];
                u.slides = {};
                u.addContent(n);
                u.group.length && u.init();
            };
        i.extend(h.prototype, {
            init: function () {
                var f,
                    e,
                    r = this,
                    o = r.group[r.currIndex],
                    u = o.opts;
                u.closeExisting && i.fancybox.close(!0);
                i("body").addClass("fancybox-active");
                !i.fancybox.getInstance() &&
                    !1 !== u.hideScrollbar &&
                    !i.fancybox.isMobile &&
                    t.body.scrollHeight > n.innerHeight &&
                    (i("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' + (n.innerWidth - t.documentElement.clientWidth) + "px;}</style>"),
                    i("body").addClass("compensate-for-scrollbar"));
                e = "";
                i.each(u.buttons, function (n, t) {
                    e += u.btnTpl[t] || "";
                });
                f = i(r.translate(r, u.baseTpl.replace("{{buttons}}", e).replace("{{arrows}}", u.btnTpl.arrowLeft + u.btnTpl.arrowRight)))
                    .attr("id", "fancybox-container-" + r.id)
                    .addClass(u.baseClass)
                    .data("FancyBox", r)
                    .appendTo(u.parentEl);
                r.$refs = { container: f };
                ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function (n) {
                    r.$refs[n] = f.find(".fancybox-" + n);
                });
                r.trigger("onInit");
                r.activate();
                r.jumpTo(r.currIndex);
            },
            translate: function (n, t) {
                var i = n.opts.i18n[n.opts.lang] || n.opts.i18n.en;
                return t.replace(/\{\{(\w+)\}\}/g, function (n, t) {
                    return void 0 === i[t] ? n : i[t];
                });
            },
            addContent: function (n) {
                var r,
                    t = this,
                    u = i.makeArray(n);
                i.each(u, function (n, r) {
                    var h,
                        o,
                        l,
                        s,
                        c,
                        u = {},
                        e = {};
                    i.isPlainObject(r)
                        ? ((u = r), (e = r.opts || r))
                        : "object" === i.type(r) && i(r).length
                        ? ((h = i(r)), (e = h.data() || {}), (e = i.extend(!0, {}, e, e.options)), (e.$orig = h), (u.src = t.opts.src || e.src || h.attr("href")), u.type || u.src || ((u.type = "inline"), (u.src = r)))
                        : (u = { type: "html", src: r + "" });
                    u.opts = i.extend(!0, {}, t.opts, e);
                    i.isArray(e.buttons) && (u.opts.buttons = e.buttons);
                    i.fancybox.isMobile && u.opts.mobile && (u.opts = f(u.opts, u.opts.mobile));
                    o = u.type || u.opts.type;
                    s = u.src || "";
                    !o &&
                        s &&
                        ((l = s.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))
                            ? ((o = "video"), u.opts.video.format || (u.opts.video.format = "video/" + ("ogv" === l[1] ? "ogg" : l[1])))
                            : s.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)
                            ? (o = "image")
                            : s.match(/\.(pdf)((\?|#).*)?$/i)
                            ? ((o = "iframe"), (u = i.extend(!0, u, { contentType: "pdf", opts: { iframe: { preload: !1 } } })))
                            : "#" === s.charAt(0) && (o = "inline"));
                    o ? (u.type = o) : t.trigger("objectNeedsType", u);
                    u.contentType || (u.contentType = i.inArray(u.type, ["html", "inline", "ajax"]) > -1 ? "html" : u.type);
                    u.index = t.group.length;
                    "auto" == u.opts.smallBtn && (u.opts.smallBtn = i.inArray(u.type, ["html", "inline", "ajax"]) > -1);
                    "auto" === u.opts.toolbar && (u.opts.toolbar = !u.opts.smallBtn);
                    u.$thumb = u.opts.$thumb || null;
                    u.opts.$trigger && u.index === t.opts.index && ((u.$thumb = u.opts.$trigger.find("img:first")), u.$thumb.length && (u.opts.$orig = u.opts.$trigger));
                    (u.$thumb && u.$thumb.length) || !u.opts.$orig || (u.$thumb = u.opts.$orig.find("img:first"));
                    u.$thumb && !u.$thumb.length && (u.$thumb = null);
                    u.thumb = u.opts.thumb || (u.$thumb ? u.$thumb[0].src : null);
                    "function" === i.type(u.opts.caption) && (u.opts.caption = u.opts.caption.apply(r, [t, u]));
                    "function" === i.type(t.opts.caption) && (u.opts.caption = t.opts.caption.apply(r, [t, u]));
                    u.opts.caption instanceof i || (u.opts.caption = void 0 === u.opts.caption ? "" : u.opts.caption + "");
                    "ajax" === u.type && ((c = s.split(/\s+/, 2)), c.length > 1 && ((u.src = c.shift()), (u.opts.filter = c.shift())));
                    u.opts.modal &&
                        (u.opts = i.extend(!0, u.opts, {
                            trapFocus: !0,
                            infobar: 0,
                            toolbar: 0,
                            smallBtn: 0,
                            keyboard: 0,
                            slideShow: 0,
                            fullScreen: 0,
                            thumbs: 0,
                            touch: 0,
                            clickContent: !1,
                            clickSlide: !1,
                            clickOutside: !1,
                            dblclickContent: !1,
                            dblclickSlide: !1,
                            dblclickOutside: !1,
                        }));
                    t.group.push(u);
                });
                Object.keys(t.slides).length && (t.updateControls(), (r = t.Thumbs) && r.isActive && (r.create(), r.focus()));
            },
            addEvents: function () {
                var t = this;
                t.removeEvents();
                t.$refs.container
                    .on("click.fb-close", "[data-fancybox-close]", function (n) {
                        n.stopPropagation();
                        n.preventDefault();
                        t.close(n);
                    })
                    .on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function (n) {
                        n.stopPropagation();
                        n.preventDefault();
                        t.previous();
                    })
                    .on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function (n) {
                        n.stopPropagation();
                        n.preventDefault();
                        t.next();
                    })
                    .on("click.fb", "[data-fancybox-zoom]", function () {
                        t[t.isScaledDown() ? "scaleToActual" : "scaleToFit"]();
                    });
                e.on("orientationchange.fb resize.fb", function (n) {
                    n && n.originalEvent && "resize" === n.originalEvent.type
                        ? (t.requestId && y(t.requestId),
                          (t.requestId = c(function () {
                              t.update(n);
                          })))
                        : (t.current && "iframe" === t.current.type && t.$refs.stage.hide(),
                          setTimeout(
                              function () {
                                  t.$refs.stage.show();
                                  t.update(n);
                              },
                              i.fancybox.isMobile ? 600 : 250
                          ));
                });
                r.on("keydown.fb", function (n) {
                    var f = i.fancybox ? i.fancybox.getInstance() : null,
                        u = f.current,
                        r = n.keyCode || n.which;
                    return 9 == r
                        ? void (u.opts.trapFocus && t.focus(n))
                        : !u.opts.keyboard || n.ctrlKey || n.altKey || n.shiftKey || i(n.target).is("input,textarea,video,audio,select")
                        ? void 0
                        : 8 === r || 27 === r
                        ? (n.preventDefault(), void t.close(n))
                        : 37 === r || 38 === r
                        ? (n.preventDefault(), void t.previous())
                        : 39 === r || 40 === r
                        ? (n.preventDefault(), void t.next())
                        : void t.trigger("afterKeydown", n, r);
                });
                t.group[t.currIndex].opts.idleTime &&
                    ((t.idleSecondsCounter = 0),
                    r.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function () {
                        t.idleSecondsCounter = 0;
                        t.isIdle && t.showControls();
                        t.isIdle = !1;
                    }),
                    (t.idleInterval = n.setInterval(function () {
                        ++t.idleSecondsCounter >= t.group[t.currIndex].opts.idleTime && !t.isDragging && ((t.isIdle = !0), (t.idleSecondsCounter = 0), t.hideControls());
                    }, 1e3)));
            },
            removeEvents: function () {
                var t = this;
                e.off("orientationchange.fb resize.fb");
                r.off("keydown.fb .fb-idle");
                this.$refs.container.off(".fb-close .fb-prev .fb-next");
                t.idleInterval && (n.clearInterval(t.idleInterval), (t.idleInterval = null));
            },
            previous: function (n) {
                return this.jumpTo(this.currPos - 1, n);
            },
            next: function (n) {
                return this.jumpTo(this.currPos + 1, n);
            },
            jumpTo: function (n, t) {
                var s,
                    a,
                    h,
                    f,
                    e,
                    o,
                    v,
                    c,
                    y,
                    r = this,
                    l = r.group.length;
                if (!(r.isDragging || r.isClosing || (r.isAnimating && r.firstRun))) {
                    if (((n = parseInt(n, 10)), !(h = r.current ? r.current.opts.loop : r.opts.loop) && (n < 0 || n >= l))) return !1;
                    if (
                        ((s = r.firstRun = !Object.keys(r.slides).length),
                        (e = r.current),
                        (r.prevIndex = r.currIndex),
                        (r.prevPos = r.currPos),
                        (f = r.createSlide(n)),
                        l > 1 && ((h || f.index < l - 1) && r.createSlide(n + 1), (h || f.index > 0) && r.createSlide(n - 1)),
                        (r.current = f),
                        (r.currIndex = f.index),
                        (r.currPos = f.pos),
                        r.trigger("beforeShow", s),
                        r.updateControls(),
                        (f.forcedDuration = void 0),
                        i.isNumeric(t) ? (f.forcedDuration = t) : (t = f.opts[s ? "animationDuration" : "transitionDuration"]),
                        (t = parseInt(t, 10)),
                        (a = r.isMoved(f)),
                        f.$slide.addClass("fancybox-slide--current"),
                        s)
                    )
                        return f.opts.animationEffect && t && r.$refs.container.css("transition-duration", t + "ms"), r.$refs.container.addClass("fancybox-is-open").trigger("focus"), r.loadSlide(f), void r.preload("image");
                    o = i.fancybox.getTranslate(e.$slide);
                    v = i.fancybox.getTranslate(r.$refs.stage);
                    i.each(r.slides, function (n, t) {
                        i.fancybox.stop(t.$slide, !0);
                    });
                    e.pos !== f.pos && (e.isComplete = !1);
                    e.$slide.removeClass("fancybox-slide--complete fancybox-slide--current");
                    a
                        ? ((y = o.left - (e.pos * o.width + e.pos * e.opts.gutter)),
                          i.each(r.slides, function (n, e) {
                              e.$slide.removeClass("fancybox-animated").removeClass(function (n, t) {
                                  return (t.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ");
                              });
                              var s = e.pos * o.width + e.pos * e.opts.gutter;
                              i.fancybox.setTranslate(e.$slide, { top: 0, left: s - v.left + y });
                              e.pos !== f.pos && e.$slide.addClass("fancybox-slide--" + (e.pos > f.pos ? "next" : "previous"));
                              u(e.$slide);
                              i.fancybox.animate(e.$slide, { top: 0, left: (e.pos - f.pos) * o.width + (e.pos - f.pos) * e.opts.gutter }, t, function () {
                                  e.$slide.css({ transform: "", opacity: "" }).removeClass("fancybox-slide--next fancybox-slide--previous");
                                  e.pos === r.currPos && r.complete();
                              });
                          }))
                        : t &&
                          f.opts.transitionEffect &&
                          ((c = "fancybox-animated fancybox-fx-" + f.opts.transitionEffect),
                          e.$slide.addClass("fancybox-slide--" + (e.pos > f.pos ? "next" : "previous")),
                          i.fancybox.animate(
                              e.$slide,
                              c,
                              t,
                              function () {
                                  e.$slide.removeClass(c).removeClass("fancybox-slide--next fancybox-slide--previous");
                              },
                              !1
                          ));
                    f.isLoaded ? r.revealContent(f) : r.loadSlide(f);
                    r.preload("image");
                }
            },
            createSlide: function (n) {
                var u,
                    r,
                    t = this;
                return (
                    (r = n % t.group.length),
                    (r = r < 0 ? t.group.length + r : r),
                    !t.slides[n] && t.group[r] && ((u = i('<div class="fancybox-slide"></div>').appendTo(t.$refs.stage)), (t.slides[n] = i.extend(!0, {}, t.group[r], { pos: n, $slide: u, isLoaded: !1 })), t.updateSlide(t.slides[n])),
                    t.slides[n]
                );
            },
            scaleToActual: function (n, t, r) {
                var e,
                    o,
                    s,
                    v,
                    y,
                    f = this,
                    u = f.current,
                    p = u.$content,
                    l = i.fancybox.getTranslate(u.$slide).width,
                    a = i.fancybox.getTranslate(u.$slide).height,
                    h = u.width,
                    c = u.height;
                f.isAnimating ||
                    f.isMoved() ||
                    !p ||
                    "image" != u.type ||
                    !u.isLoaded ||
                    u.hasError ||
                    ((f.isAnimating = !0),
                    i.fancybox.stop(p),
                    (n = void 0 === n ? 0.5 * l : n),
                    (t = void 0 === t ? 0.5 * a : t),
                    (e = i.fancybox.getTranslate(p)),
                    (e.top -= i.fancybox.getTranslate(u.$slide).top),
                    (e.left -= i.fancybox.getTranslate(u.$slide).left),
                    (v = h / e.width),
                    (y = c / e.height),
                    (o = 0.5 * l - 0.5 * h),
                    (s = 0.5 * a - 0.5 * c),
                    h > l && ((o = e.left * v - (n * v - n)), o > 0 && (o = 0), o < l - h && (o = l - h)),
                    c > a && ((s = e.top * y - (t * y - t)), s > 0 && (s = 0), s < a - c && (s = a - c)),
                    f.updateCursor(h, c),
                    i.fancybox.animate(p, { top: s, left: o, scaleX: v, scaleY: y }, r || 366, function () {
                        f.isAnimating = !1;
                    }),
                    f.SlideShow && f.SlideShow.isActive && f.SlideShow.stop());
            },
            scaleToFit: function (n) {
                var t,
                    r = this,
                    u = r.current,
                    f = u.$content;
                r.isAnimating ||
                    r.isMoved() ||
                    !f ||
                    "image" != u.type ||
                    !u.isLoaded ||
                    u.hasError ||
                    ((r.isAnimating = !0),
                    i.fancybox.stop(f),
                    (t = r.getFitPos(u)),
                    r.updateCursor(t.width, t.height),
                    i.fancybox.animate(f, { top: t.top, left: t.left, scaleX: t.width / f.width(), scaleY: t.height / f.height() }, n || 366, function () {
                        r.isAnimating = !1;
                    }));
            },
            getFitPos: function (n) {
                var u,
                    f,
                    c,
                    s,
                    l = this,
                    e = n.$content,
                    o = n.$slide,
                    t = n.width || n.opts.width,
                    r = n.height || n.opts.height,
                    h = {};
                return (
                    !!(n.isLoaded && e && e.length) &&
                    ((u = i.fancybox.getTranslate(l.$refs.stage).width),
                    (f = i.fancybox.getTranslate(l.$refs.stage).height),
                    (u -= parseFloat(o.css("paddingLeft")) + parseFloat(o.css("paddingRight")) + parseFloat(e.css("marginLeft")) + parseFloat(e.css("marginRight"))),
                    (f -= parseFloat(o.css("paddingTop")) + parseFloat(o.css("paddingBottom")) + parseFloat(e.css("marginTop")) + parseFloat(e.css("marginBottom"))),
                    (t && r) || ((t = u), (r = f)),
                    (c = Math.min(1, u / t, f / r)),
                    (t *= c),
                    (r *= c),
                    t > u - 0.5 && (t = u),
                    r > f - 0.5 && (r = f),
                    "image" === n.type
                        ? ((h.top = Math.floor(0.5 * (f - r)) + parseFloat(o.css("paddingTop"))), (h.left = Math.floor(0.5 * (u - t)) + parseFloat(o.css("paddingLeft"))))
                        : "video" === n.contentType && ((s = n.opts.width && n.opts.height ? t / r : n.opts.ratio || 16 / 9), r > t / s ? (r = t / s) : t > r * s && (t = r * s)),
                    (h.width = t),
                    (h.height = r),
                    h)
                );
            },
            update: function (n) {
                var t = this;
                i.each(t.slides, function (i, r) {
                    t.updateSlide(r, n);
                });
            },
            updateSlide: function (n, t) {
                var r = this,
                    f = n && n.$content,
                    e = n.width || n.opts.width,
                    o = n.height || n.opts.height,
                    u = n.$slide;
                r.adjustCaption(n);
                f && (e || o || "video" === n.contentType) && !n.hasError && (i.fancybox.stop(f), i.fancybox.setTranslate(f, r.getFitPos(n)), n.pos === r.currPos && ((r.isAnimating = !1), r.updateCursor()));
                r.adjustLayout(n);
                u.length && (u.trigger("refresh"), n.pos === r.currPos && r.$refs.toolbar.add(r.$refs.navigation.find(".fancybox-button--arrow_right")).toggleClass("compensate-for-scrollbar", u.get(0).scrollHeight > u.get(0).clientHeight));
                r.trigger("onUpdate", n, t);
            },
            centerSlide: function (n) {
                var r = this,
                    u = r.current,
                    t = u.$slide;
                !r.isClosing &&
                    u &&
                    (t.siblings().css({ transform: "", opacity: "" }),
                    t.parent().children().removeClass("fancybox-slide--previous fancybox-slide--next"),
                    i.fancybox.animate(
                        t,
                        { top: 0, left: 0, opacity: 1 },
                        void 0 === n ? 0 : n,
                        function () {
                            t.css({ transform: "", opacity: "" });
                            u.isComplete || r.complete();
                        },
                        !1
                    ));
            },
            isMoved: function (n) {
                var t,
                    r,
                    u = n || this.current;
                return !!u && ((r = i.fancybox.getTranslate(this.$refs.stage)), (t = i.fancybox.getTranslate(u.$slide)), !u.$slide.hasClass("fancybox-animated") && (Math.abs(t.top - r.top) > 0.5 || Math.abs(t.left - r.left) > 0.5));
            },
            updateCursor: function (n, t) {
                var o,
                    e,
                    u = this,
                    r = u.current,
                    f = u.$refs.container;
                r &&
                    !u.isClosing &&
                    u.Guestures &&
                    (f.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"),
                    (o = u.canPan(n, t)),
                    (e = !!o || u.isZoomable()),
                    f.toggleClass("fancybox-is-zoomable", e),
                    i("[data-fancybox-zoom]").prop("disabled", !e),
                    o
                        ? f.addClass("fancybox-can-pan")
                        : e && ("zoom" === r.opts.clickContent || (i.isFunction(r.opts.clickContent) && "zoom" == r.opts.clickContent(r)))
                        ? f.addClass("fancybox-can-zoomIn")
                        : r.opts.touch && (r.opts.touch.vertical || u.group.length > 1) && "video" !== r.contentType && f.addClass("fancybox-can-swipe"));
            },
            isZoomable: function () {
                var t,
                    i = this,
                    n = i.current;
                return n && !i.isClosing && "image" === n.type && !n.hasError && (!n.isLoaded || ((t = i.getFitPos(n)) && (n.width > t.width || n.height > t.height))) ? !0 : !1;
            },
            isScaledDown: function (n, t) {
                var e = this,
                    r = !1,
                    u = e.current,
                    f = u.$content;
                return void 0 !== n && void 0 !== t ? (r = n < u.width && t < u.height) : f && ((r = i.fancybox.getTranslate(f)), (r = r.width < u.width && r.height < u.height)), r;
            },
            canPan: function (n, t) {
                var e = this,
                    r = e.current,
                    f = null,
                    u = !1;
                return (
                    "image" === r.type &&
                        (r.isComplete || (n && t)) &&
                        !r.hasError &&
                        ((u = e.getFitPos(r)),
                        void 0 !== n && void 0 !== t ? (f = { width: n, height: t }) : r.isComplete && (f = i.fancybox.getTranslate(r.$content)),
                        f && u && (u = Math.abs(f.width - u.width) > 1.5 || Math.abs(f.height - u.height) > 1.5)),
                    u
                );
            },
            loadSlide: function (n) {
                var u,
                    r,
                    f,
                    t = this;
                if (!n.isLoading && !n.isLoaded) {
                    if (((n.isLoading = !0), !1 === t.trigger("beforeLoad", n))) return (n.isLoading = !1), !1;
                    switch (((u = n.type), (r = n.$slide), r.off("refresh").trigger("onReset").addClass(n.opts.slideClass), u)) {
                        case "image":
                            t.setImage(n);
                            break;
                        case "iframe":
                            t.setIframe(n);
                            break;
                        case "html":
                            t.setContent(n, n.src || n.content);
                            break;
                        case "video":
                            t.setContent(
                                n,
                                n.opts.video.tpl
                                    .replace(/\{\{src\}\}/gi, n.src)
                                    .replace("{{format}}", n.opts.videoFormat || n.opts.video.format || "")
                                    .replace("{{poster}}", n.thumb || "")
                            );
                            break;
                        case "inline":
                            i(n.src).length ? t.setContent(n, i(n.src)) : t.setError(n);
                            break;
                        case "ajax":
                            t.showLoading(n);
                            f = i.ajax(
                                i.extend({}, n.opts.ajax.settings, {
                                    url: n.src,
                                    success: function (i, r) {
                                        "success" === r && t.setContent(n, i);
                                    },
                                    error: function (i, r) {
                                        i && "abort" !== r && t.setError(n);
                                    },
                                })
                            );
                            r.one("onReset", function () {
                                f.abort();
                            });
                            break;
                        default:
                            t.setError(n);
                    }
                    return !0;
                }
            },
            setImage: function (n) {
                var u,
                    r = this;
                setTimeout(function () {
                    var t = n.$image;
                    r.isClosing || !n.isLoading || (t && t.length && t[0].complete) || n.hasError || r.showLoading(n);
                }, 50);
                r.checkSrcset(n);
                n.$content = i('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(n.$slide.addClass("fancybox-slide--image"));
                !1 !== n.opts.preload &&
                    n.opts.width &&
                    n.opts.height &&
                    n.thumb &&
                    ((n.width = n.opts.width),
                    (n.height = n.opts.height),
                    (u = t.createElement("img")),
                    (u.onerror = function () {
                        i(this).remove();
                        n.$ghost = null;
                    }),
                    (u.onload = function () {
                        r.afterLoad(n);
                    }),
                    (n.$ghost = i(u).addClass("fancybox-image").appendTo(n.$content).attr("src", n.thumb)));
                r.setBigImage(n);
            },
            checkSrcset: function (t) {
                var i,
                    r,
                    e,
                    s,
                    o = t.opts.srcset || t.opts.image.srcset,
                    f,
                    u;
                if (o) {
                    for (
                        e = n.devicePixelRatio || 1,
                            s = n.innerWidth * e,
                            r = o.split(",").map(function (n) {
                                var t = {};
                                return (
                                    n
                                        .trim()
                                        .split(/\s+/)
                                        .forEach(function (n, i) {
                                            var r = parseInt(n.substring(0, n.length - 1), 10);
                                            if (0 === i) return (t.url = n);
                                            r && ((t.value = r), (t.postfix = n[n.length - 1]));
                                        }),
                                    t
                                );
                            }),
                            r.sort(function (n, t) {
                                return n.value - t.value;
                            }),
                            f = 0;
                        f < r.length;
                        f++
                    )
                        if (((u = r[f]), ("w" === u.postfix && u.value >= s) || ("x" === u.postfix && u.value >= e))) {
                            i = u;
                            break;
                        }
                    !i && r.length && (i = r[r.length - 1]);
                    i && ((t.src = i.url), t.width && t.height && "w" == i.postfix && ((t.height = (t.width / t.height) * i.value), (t.width = i.value)), (t.opts.srcset = o));
                }
            },
            setBigImage: function (n) {
                var r = this,
                    f = t.createElement("img"),
                    u = i(f);
                n.$image = u
                    .one("error", function () {
                        r.setError(n);
                    })
                    .one("load", function () {
                        var t;
                        n.$ghost || (r.resolveImageSlideSize(n, this.naturalWidth, this.naturalHeight), r.afterLoad(n));
                        r.isClosing ||
                            (n.opts.srcset &&
                                ((t = n.opts.sizes),
                                (t && "auto" !== t) || (t = (n.width / n.height > 1 && e.width() / e.height() > 1 ? "100" : Math.round((n.width / n.height) * 100)) + "vw"),
                                u.attr("sizes", t).attr("srcset", n.opts.srcset)),
                            n.$ghost &&
                                setTimeout(function () {
                                    n.$ghost && !r.isClosing && n.$ghost.hide();
                                }, Math.min(300, Math.max(1e3, n.height / 1600))),
                            r.hideLoading(n));
                    })
                    .addClass("fancybox-image")
                    .attr("src", n.src)
                    .appendTo(n.$content);
                (f.complete || "complete" == f.readyState) && u.naturalWidth && u.naturalHeight ? u.trigger("load") : f.error && u.trigger("error");
            },
            resolveImageSlideSize: function (n, t, i) {
                var r = parseInt(n.opts.width, 10),
                    u = parseInt(n.opts.height, 10);
                n.width = t;
                n.height = i;
                r > 0 && ((n.width = r), (n.height = Math.floor((r * i) / t)));
                u > 0 && ((n.width = Math.floor((u * t) / i)), (n.height = u));
            },
            setIframe: function (n) {
                var u,
                    f = this,
                    t = n.opts.iframe,
                    r = n.$slide;
                n.$content = i('<div class="fancybox-content' + (t.preload ? " fancybox-is-hidden" : "") + '"></div>')
                    .css(t.css)
                    .appendTo(r);
                r.addClass("fancybox-slide--" + n.contentType);
                n.$iframe = u = i(t.tpl.replace(/\{rnd\}/g, new Date().getTime()))
                    .attr(t.attr)
                    .appendTo(n.$content);
                t.preload
                    ? (f.showLoading(n),
                      u.on("load.fb error.fb", function () {
                          this.isReady = 1;
                          n.$slide.trigger("refresh");
                          f.afterLoad(n);
                      }),
                      r.on("refresh.fb", function () {
                          var s,
                              i,
                              f = n.$content,
                              e = t.css.width,
                              o = t.css.height;
                          if (1 === u[0].isReady) {
                              try {
                                  s = u.contents();
                                  i = s.find("body");
                              } catch (n) {}
                              i &&
                                  i.length &&
                                  i.children().length &&
                                  (r.css("overflow", "visible"),
                                  f.css({ width: "100%", "max-width": "100%", height: "9999px" }),
                                  void 0 === e && (e = Math.ceil(Math.max(i[0].clientWidth, i.outerWidth(!0)))),
                                  f.css("width", e || "").css("max-width", ""),
                                  void 0 === o && (o = Math.ceil(Math.max(i[0].clientHeight, i.outerHeight(!0)))),
                                  f.css("height", o || ""),
                                  r.css("overflow", "auto"));
                              f.removeClass("fancybox-is-hidden");
                          }
                      }))
                    : f.afterLoad(n);
                u.attr("src", n.src);
                r.one("onReset", function () {
                    try {
                        i(this).find("iframe").hide().unbind().attr("src", "//about:blank");
                    } catch (n) {}
                    i(this).off("refresh.fb").empty();
                    n.isLoaded = !1;
                    n.isRevealed = !1;
                });
            },
            setContent: function (n, t) {
                var r = this;
                r.isClosing ||
                    (r.hideLoading(n),
                    n.$content && i.fancybox.stop(n.$content),
                    n.$slide.empty(),
                    v(t) && t.parent().length
                        ? ((t.hasClass("fancybox-content") || t.parent().hasClass("fancybox-content")) && t.parents(".fancybox-slide").trigger("onReset"),
                          (n.$placeholder = i("<div>").hide().insertAfter(t)),
                          t.css("display", "inline-block"))
                        : n.hasError || ("string" === i.type(t) && (t = i("<div>").append(i.trim(t)).contents()), n.opts.filter && (t = i("<div>").html(t).find(n.opts.filter))),
                    n.$slide.one("onReset", function () {
                        i(this).find("video,audio").trigger("pause");
                        n.$placeholder && (n.$placeholder.after(t.removeClass("fancybox-content").hide()).remove(), (n.$placeholder = null));
                        n.$smallBtn && (n.$smallBtn.remove(), (n.$smallBtn = null));
                        n.hasError || (i(this).empty(), (n.isLoaded = !1), (n.isRevealed = !1));
                    }),
                    i(t).appendTo(n.$slide),
                    i(t).is("video,audio") &&
                        (i(t).addClass("fancybox-video"), i(t).wrap("<div></div>"), (n.contentType = "video"), (n.opts.width = n.opts.width || i(t).attr("width")), (n.opts.height = n.opts.height || i(t).attr("height"))),
                    (n.$content = n.$slide.children().filter("div,form,main,video,audio,article,.fancybox-content").first()),
                    n.$content.siblings().hide(),
                    n.$content.length || (n.$content = n.$slide.wrapInner("<div></div>").children().first()),
                    n.$content.addClass("fancybox-content"),
                    n.$slide.addClass("fancybox-slide--" + n.contentType),
                    r.afterLoad(n));
            },
            setError: function (n) {
                n.hasError = !0;
                n.$slide
                    .trigger("onReset")
                    .removeClass("fancybox-slide--" + n.contentType)
                    .addClass("fancybox-slide--error");
                n.contentType = "html";
                this.setContent(n, this.translate(n, n.opts.errorTpl));
                n.pos === this.currPos && (this.isAnimating = !1);
            },
            showLoading: function (n) {
                var t = this;
                (n = n || t.current) && !n.$spinner && (n.$spinner = i(t.translate(t, t.opts.spinnerTpl)).appendTo(n.$slide).hide().fadeIn("fast"));
            },
            hideLoading: function (n) {
                var t = this;
                (n = n || t.current) && n.$spinner && (n.$spinner.stop().remove(), delete n.$spinner);
            },
            afterLoad: function (n) {
                var t = this;
                t.isClosing ||
                    ((n.isLoading = !1),
                    (n.isLoaded = !0),
                    t.trigger("afterLoad", n),
                    t.hideLoading(n),
                    !n.opts.smallBtn || (n.$smallBtn && n.$smallBtn.length) || (n.$smallBtn = i(t.translate(n, n.opts.btnTpl.smallBtn)).appendTo(n.$content)),
                    n.opts.protect &&
                        n.$content &&
                        !n.hasError &&
                        (n.$content.on("contextmenu.fb", function (n) {
                            return 2 == n.button && n.preventDefault(), !0;
                        }),
                        "image" === n.type && i('<div class="fancybox-spaceball"></div>').appendTo(n.$content)),
                    t.adjustCaption(n),
                    t.adjustLayout(n),
                    n.pos === t.currPos && t.updateCursor(),
                    t.revealContent(n));
            },
            adjustCaption: function (n) {
                var i,
                    t = this,
                    r = n || t.current,
                    u = r.opts.caption,
                    o = r.opts.preventCaptionOverlap,
                    f = t.$refs.caption,
                    e = !1;
                f.toggleClass("fancybox-caption--separate", o);
                o &&
                    u &&
                    u.length &&
                    (r.pos !== t.currPos ? ((i = f.clone().appendTo(f.parent())), i.children().eq(0).empty().html(u), (e = i.outerHeight(!0)), i.empty().remove()) : t.$caption && (e = t.$caption.outerHeight(!0)),
                    r.$slide.css("padding-bottom", e || ""));
            },
            adjustLayout: function (n) {
                var r,
                    u,
                    f,
                    i,
                    e = this,
                    t = n || e.current;
                t.isLoaded &&
                    !0 !== t.opts.disableLayoutFix &&
                    (t.$content.css("margin-bottom", ""),
                    t.$content.outerHeight() > t.$slide.height() + 0.5 &&
                        ((f = t.$slide[0].style["padding-bottom"]),
                        (i = t.$slide.css("padding-bottom")),
                        parseFloat(i) > 0 && ((r = t.$slide[0].scrollHeight), t.$slide.css("padding-bottom", 0), Math.abs(r - t.$slide[0].scrollHeight) < 1 && (u = i), t.$slide.css("padding-bottom", f))),
                    t.$content.css("margin-bottom", u));
            },
            revealContent: function (n) {
                var r,
                    c,
                    f,
                    h,
                    t = this,
                    s = n.$slide,
                    e = !1,
                    o = !1,
                    l = t.isMoved(n),
                    a = n.isRevealed;
                return (
                    (n.isRevealed = !0),
                    (r = n.opts[t.firstRun ? "animationEffect" : "transitionEffect"]),
                    (f = n.opts[t.firstRun ? "animationDuration" : "transitionDuration"]),
                    (f = parseInt(void 0 === n.forcedDuration ? f : n.forcedDuration, 10)),
                    (!l && n.pos === t.currPos && f) || (r = !1),
                    "zoom" === r && (n.pos === t.currPos && f && "image" === n.type && !n.hasError && (o = t.getThumbPos(n)) ? (e = t.getFitPos(n)) : (r = "fade")),
                    "zoom" === r
                        ? ((t.isAnimating = !0),
                          (e.scaleX = e.width / o.width),
                          (e.scaleY = e.height / o.height),
                          (h = n.opts.zoomOpacity),
                          "auto" == h && (h = Math.abs(n.width / n.height - o.width / o.height) > 0.1),
                          h && ((o.opacity = 0.1), (e.opacity = 1)),
                          i.fancybox.setTranslate(n.$content.removeClass("fancybox-is-hidden"), o),
                          u(n.$content),
                          void i.fancybox.animate(n.$content, e, f, function () {
                              t.isAnimating = !1;
                              t.complete();
                          }))
                        : (t.updateSlide(n),
                          r
                              ? (i.fancybox.stop(s),
                                (c = "fancybox-slide--" + (n.pos >= t.prevPos ? "next" : "previous") + " fancybox-animated fancybox-fx-" + r),
                                s.addClass(c).removeClass("fancybox-slide--current"),
                                n.$content.removeClass("fancybox-is-hidden"),
                                u(s),
                                "image" !== n.type && n.$content.hide().show(0),
                                void i.fancybox.animate(
                                    s,
                                    "fancybox-slide--current",
                                    f,
                                    function () {
                                        s.removeClass(c).css({ transform: "", opacity: "" });
                                        n.pos === t.currPos && t.complete();
                                    },
                                    !0
                                ))
                              : (n.$content.removeClass("fancybox-is-hidden"), a || !l || "image" !== n.type || n.hasError || n.$content.hide().fadeIn("fast"), void (n.pos === t.currPos && t.complete())))
                );
            },
            getThumbPos: function (n) {
                var t,
                    u,
                    e,
                    o,
                    f,
                    s = !1,
                    r = n.$thumb;
                return (
                    !(!r || !p(r[0])) &&
                    ((t = i.fancybox.getTranslate(r)),
                    (u = parseFloat(r.css("border-top-width") || 0)),
                    (e = parseFloat(r.css("border-right-width") || 0)),
                    (o = parseFloat(r.css("border-bottom-width") || 0)),
                    (f = parseFloat(r.css("border-left-width") || 0)),
                    (s = { top: t.top + u, left: t.left + f, width: t.width - e - f, height: t.height - u - o, scaleX: 1, scaleY: 1 }),
                    t.width > 0 && t.height > 0 && s)
                );
            },
            complete: function () {
                var r,
                    n = this,
                    t = n.current,
                    f = {};
                !n.isMoved() &&
                    t.isLoaded &&
                    (t.isComplete ||
                        ((t.isComplete = !0),
                        t.$slide.siblings().trigger("onReset"),
                        n.preload("inline"),
                        u(t.$slide),
                        t.$slide.addClass("fancybox-slide--complete"),
                        i.each(n.slides, function (t, r) {
                            r.pos >= n.currPos - 1 && r.pos <= n.currPos + 1 ? (f[r.pos] = r) : r && (i.fancybox.stop(r.$slide), r.$slide.off().remove());
                        }),
                        (n.slides = f)),
                    (n.isAnimating = !1),
                    n.updateCursor(),
                    n.trigger("afterShow"),
                    t.opts.video.autoStart &&
                        t.$slide
                            .find("video,audio")
                            .filter(":visible:first")
                            .trigger("play")
                            .one("ended", function () {
                                Document.exitFullscreen ? Document.exitFullscreen() : this.webkitExitFullscreen && this.webkitExitFullscreen();
                                n.next();
                            }),
                    t.opts.autoFocus && "html" === t.contentType && ((r = t.$content.find("input[autofocus]:enabled:visible:first")), r.length ? r.trigger("focus") : n.focus(null, !0)),
                    t.$slide.scrollTop(0).scrollLeft(0));
            },
            preload: function (n) {
                var i,
                    r,
                    t = this;
                t.group.length < 2 || ((r = t.slides[t.currPos + 1]), (i = t.slides[t.currPos - 1]), i && i.type === n && t.loadSlide(i), r && r.type === n && t.loadSlide(r));
            },
            focus: function (n, r) {
                var u,
                    e,
                    f = this,
                    o =
                        'a[href],area[href],input:not([disabled]):not([type="hidden"]):not([aria-hidden]),select:not([disabled]):not([aria-hidden]),textarea:not([disabled]):not([aria-hidden]),button:not([disabled]):not([aria-hidden]),iframe,object,embed,video,audio,[contenteditable],[tabindex]:not([tabindex^="-"])';
                f.isClosing ||
                    ((u = !n && f.current && f.current.isComplete ? f.current.$slide.find("*:visible" + (r ? ":not(.fancybox-close-small)" : "")) : f.$refs.container.find("*:visible")),
                    (u = u.filter(o).filter(function () {
                        return "hidden" !== i(this).css("visibility") && !i(this).hasClass("disabled");
                    })),
                    u.length
                        ? ((e = u.index(t.activeElement)),
                          n && n.shiftKey ? (e < 0 || 0 == e) && (n.preventDefault(), u.eq(u.length - 1).trigger("focus")) : (e < 0 || e == u.length - 1) && (n && n.preventDefault(), u.eq(0).trigger("focus")))
                        : f.$refs.container.trigger("focus"));
            },
            activate: function () {
                var n = this;
                i(".fancybox-container").each(function () {
                    var t = i(this).data("FancyBox");
                    t && t.id !== n.id && !t.isClosing && (t.trigger("onDeactivate"), t.removeEvents(), (t.isVisible = !1));
                });
                n.isVisible = !0;
                (n.current || n.isIdle) && (n.update(), n.updateControls());
                n.trigger("onActivate");
                n.addEvents();
            },
            close: function (n, t) {
                var o,
                    s,
                    h,
                    l,
                    a,
                    y,
                    e,
                    r = this,
                    f = r.current,
                    v = function () {
                        r.cleanUp(n);
                    };
                return (
                    !r.isClosing &&
                    ((r.isClosing = !0),
                    !1 === r.trigger("beforeClose", n)
                        ? ((r.isClosing = !1),
                          c(function () {
                              r.update();
                          }),
                          !1)
                        : (r.removeEvents(),
                          (h = f.$content),
                          (o = f.opts.animationEffect),
                          (s = i.isNumeric(t) ? t : o ? f.opts.animationDuration : 0),
                          f.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"),
                          !0 !== n ? i.fancybox.stop(f.$slide) : (o = !1),
                          f.$slide.siblings().trigger("onReset").remove(),
                          s &&
                              r.$refs.container
                                  .removeClass("fancybox-is-open")
                                  .addClass("fancybox-is-closing")
                                  .css("transition-duration", s + "ms"),
                          r.hideLoading(f),
                          r.hideControls(!0),
                          r.updateCursor(),
                          "zoom" !== o || (h && s && "image" === f.type && !r.isMoved() && !f.hasError && (e = r.getThumbPos(f))) || (o = "fade"),
                          "zoom" === o
                              ? (i.fancybox.stop(h),
                                (l = i.fancybox.getTranslate(h)),
                                (y = { top: l.top, left: l.left, scaleX: l.width / e.width, scaleY: l.height / e.height, width: e.width, height: e.height }),
                                (a = f.opts.zoomOpacity),
                                "auto" == a && (a = Math.abs(f.width / f.height - e.width / e.height) > 0.1),
                                a && (e.opacity = 0),
                                i.fancybox.setTranslate(h, y),
                                u(h),
                                i.fancybox.animate(h, e, s, v),
                                !0)
                              : (o && s ? i.fancybox.animate(f.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"), "fancybox-animated fancybox-fx-" + o, s, v) : !0 === n ? setTimeout(v, s) : v(), !0)))
                );
            },
            cleanUp: function (t) {
                var f,
                    e,
                    o,
                    r = this,
                    u = r.current.opts.$orig;
                r.current.$slide.trigger("onReset");
                r.$refs.container.empty().remove();
                r.trigger("afterClose", t);
                r.current.opts.backFocus && ((u && u.length && u.is(":visible")) || (u = r.$trigger), u && u.length && ((e = n.scrollX), (o = n.scrollY), u.trigger("focus"), i("html, body").scrollTop(o).scrollLeft(e)));
                r.current = null;
                f = i.fancybox.getInstance();
                f ? f.activate() : (i("body").removeClass("fancybox-active compensate-for-scrollbar"), i("#fancybox-style-noscroll").remove());
            },
            trigger: function (n, t) {
                var o,
                    f = Array.prototype.slice.call(arguments, 1),
                    e = this,
                    u = t && t.opts ? t : e.current;
                if ((u ? f.unshift(u) : (u = e), f.unshift(e), i.isFunction(u.opts[n]) && (o = u.opts[n].apply(u, f)), !1 === o)) return o;
                "afterClose" !== n && e.$refs ? e.$refs.container.trigger(n + ".fb", f) : r.trigger(n + ".fb", f);
            },
            updateControls: function () {
                var n = this,
                    r = n.current,
                    f = r.index,
                    u = n.$refs.container,
                    o = n.$refs.caption,
                    e = r.opts.caption;
                r.$slide.trigger("refresh");
                e && e.length ? ((n.$caption = o), o.children().eq(0).html(e)) : (n.$caption = null);
                n.hasHiddenControls || n.isIdle || n.showControls();
                u.find("[data-fancybox-count]").html(n.group.length);
                u.find("[data-fancybox-index]").html(f + 1);
                u.find("[data-fancybox-prev]").prop("disabled", !r.opts.loop && f <= 0);
                u.find("[data-fancybox-next]").prop("disabled", !r.opts.loop && f >= n.group.length - 1);
                "image" === r.type
                    ? u
                          .find("[data-fancybox-zoom]")
                          .show()
                          .end()
                          .find("[data-fancybox-download]")
                          .attr("href", r.opts.image.src || r.src)
                          .show()
                    : r.opts.toolbar && u.find("[data-fancybox-download],[data-fancybox-zoom]").hide();
                i(t.activeElement).is(":hidden,[disabled]") && n.$refs.container.trigger("focus");
            },
            hideControls: function (n) {
                var i = this,
                    t = ["infobar", "toolbar", "nav"];
                (!n && i.current.opts.preventCaptionOverlap) || t.push("caption");
                this.$refs.container.removeClass(
                    t
                        .map(function (n) {
                            return "fancybox-show-" + n;
                        })
                        .join(" ")
                );
                this.hasHiddenControls = !0;
            },
            showControls: function () {
                var n = this,
                    t = n.current ? n.current.opts : n.opts,
                    i = n.$refs.container;
                n.hasHiddenControls = !1;
                n.idleSecondsCounter = 0;
                i.toggleClass("fancybox-show-toolbar", !(!t.toolbar || !t.buttons))
                    .toggleClass("fancybox-show-infobar", !!(t.infobar && n.group.length > 1))
                    .toggleClass("fancybox-show-caption", !!n.$caption)
                    .toggleClass("fancybox-show-nav", !!(t.arrows && n.group.length > 1))
                    .toggleClass("fancybox-is-modal", !!t.modal);
            },
            toggleControls: function () {
                this.hasHiddenControls ? this.showControls() : this.hideControls();
            },
        });
        i.fancybox = {
            version: "3.5.7",
            defaults: l,
            getInstance: function (n) {
                var t = i('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
                    r = Array.prototype.slice.call(arguments, 1);
                return t instanceof h && ("string" === i.type(n) ? t[n].apply(t, r) : "function" === i.type(n) && n.apply(t, r), t);
            },
            open: function (n, t, i) {
                return new h(n, t, i);
            },
            close: function (n) {
                var t = this.getInstance();
                t && (t.close(), !0 === n && this.close(n));
            },
            destroy: function () {
                this.close(!0);
                r.add("body").off("click.fb-start", "**");
            },
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            use3d: (function () {
                var i = t.createElement("div");
                return n.getComputedStyle && n.getComputedStyle(i) && n.getComputedStyle(i).getPropertyValue("transform") && !(t.documentMode && t.documentMode < 11);
            })(),
            getTranslate: function (n) {
                var t;
                return !(!n || !n.length) && ((t = n[0].getBoundingClientRect()), { top: t.top || 0, left: t.left || 0, width: t.width, height: t.height, opacity: parseFloat(n.css("opacity")) });
            },
            setTranslate: function (n, t) {
                var i = "",
                    r = {};
                if (n && t)
                    return (
                        (void 0 === t.left && void 0 === t.top) ||
                            ((i = (void 0 === t.left ? n.position().left : t.left) + "px, " + (void 0 === t.top ? n.position().top : t.top) + "px"), (i = this.use3d ? "translate3d(" + i + ", 0px)" : "translate(" + i + ")")),
                        void 0 !== t.scaleX && void 0 !== t.scaleY ? (i += " scale(" + t.scaleX + ", " + t.scaleY + ")") : void 0 !== t.scaleX && (i += " scaleX(" + t.scaleX + ")"),
                        i.length && (r.transform = i),
                        void 0 !== t.opacity && (r.opacity = t.opacity),
                        void 0 !== t.width && (r.width = t.width),
                        void 0 !== t.height && (r.height = t.height),
                        n.css(r)
                    );
            },
            animate: function (n, t, r, u, f) {
                var s,
                    e = this;
                i.isFunction(r) && ((u = r), (r = null));
                e.stop(n);
                s = e.getTranslate(n);
                n.on(o, function (o) {
                    (o && o.originalEvent && (!n.is(o.originalEvent.target) || "z-index" == o.originalEvent.propertyName)) ||
                        (e.stop(n),
                        i.isNumeric(r) && n.css("transition-duration", ""),
                        i.isPlainObject(t)
                            ? void 0 !== t.scaleX && void 0 !== t.scaleY && e.setTranslate(n, { top: t.top, left: t.left, width: s.width * t.scaleX, height: s.height * t.scaleY, scaleX: 1, scaleY: 1 })
                            : !0 !== f && n.removeClass(t),
                        i.isFunction(u) && u(o));
                });
                i.isNumeric(r) && n.css("transition-duration", r + "ms");
                i.isPlainObject(t)
                    ? (void 0 !== t.scaleX && void 0 !== t.scaleY && (delete t.width, delete t.height, n.parent().hasClass("fancybox-slide--image") && n.parent().addClass("fancybox-is-scaling")), i.fancybox.setTranslate(n, t))
                    : n.addClass(t);
                n.data(
                    "timer",
                    setTimeout(function () {
                        n.trigger(o);
                    }, r + 33)
                );
            },
            stop: function (n, t) {
                n && n.length && (clearTimeout(n.data("timer")), t && n.trigger(o), n.off(o).css("transition-duration", ""), n.parent().removeClass("fancybox-is-scaling"));
            },
        };
        i.fn.fancybox = function (n) {
            var t;
            return (n = n || {}), (t = n.selector || !1), t ? i("body").off("click.fb-start", t).on("click.fb-start", t, { options: n }, s) : this.off("click.fb-start").on("click.fb-start", { items: this, options: n }, s), this;
        };
        r.on("click.fb-start", "[data-fancybox]", s);
        r.on("click.fb-start", "[data-fancybox-trigger]", function () {
            i('[data-fancybox="' + i(this).attr("data-fancybox-trigger") + '"]')
                .eq(i(this).attr("data-fancybox-index") || 0)
                .trigger("click.fb-start", { $trigger: i(this) });
        }),
            (function () {
                var n = null;
                r.on("mousedown mouseup focus blur", ".fancybox-button", function (t) {
                    switch (t.type) {
                        case "mousedown":
                            n = i(this);
                            break;
                        case "mouseup":
                            n = null;
                            break;
                        case "focusin":
                            i(".fancybox-button").removeClass("fancybox-focus");
                            i(this).is(n) || i(this).is("[disabled]") || i(this).addClass("fancybox-focus");
                            break;
                        case "focusout":
                            i(".fancybox-button").removeClass("fancybox-focus");
                    }
                });
            })();
    }
})(window, document, jQuery),
    (function (n) {
        "use strict";
        var r = {
                youtube: {
                    matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
                    params: { autoplay: 1, autohide: 1, fs: 1, rel: 0, hd: 1, wmode: "transparent", enablejsapi: 1, html5: 1 },
                    paramPlace: 8,
                    type: "iframe",
                    url: "https://www.youtube-nocookie.com/embed/$4",
                    thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg",
                },
                vimeo: { matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/, params: { autoplay: 1, hd: 1, show_title: 1, show_byline: 1, show_portrait: 0, fullscreen: 1 }, paramPlace: 3, type: "iframe", url: "//player.vimeo.com/video/$2" },
                instagram: { matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i, type: "image", url: "//$1/p/$2/media/?size=l" },
                gmap_place: {
                    matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
                    type: "iframe",
                    url: function (n) {
                        return (
                            "//maps.google." +
                            n[2] +
                            "/?ll=" +
                            (n[9] ? n[9] + "&z=" + Math.floor(n[10]) + (n[12] ? n[12].replace(/^\//, "&") : "") : n[12] + "").replace(/\?/, "&") +
                            "&output=" +
                            (n[12] && n[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
                        );
                    },
                },
                gmap_search: {
                    matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
                    type: "iframe",
                    url: function (n) {
                        return "//maps.google." + n[2] + "/maps?q=" + n[5].replace("query=", "q=").replace("api=1", "") + "&output=embed";
                    },
                },
            },
            t = function (t, i, r) {
                if (t)
                    return (
                        (r = r || ""),
                        "object" === n.type(r) && (r = n.param(r, !0)),
                        n.each(i, function (n, i) {
                            t = t.replace("$" + n, i || "");
                        }),
                        r.length && (t += (t.indexOf("?") > 0 ? "&" : "?") + r),
                        t
                    );
            },
            i;
        n(document).on("objectNeedsType.fb", function (i, u, f) {
            var v,
                y,
                s,
                c,
                e,
                a,
                l,
                o = f.src || "",
                h = !1;
            v = n.extend(!0, {}, r, f.opts.media);
            n.each(v, function (i, r) {
                var u, v;
                if ((s = o.match(r.matcher))) {
                    if (((h = r.type), (l = i), (a = {}), r.paramPlace && s[r.paramPlace]))
                        for (e = s[r.paramPlace], "?" == e[0] && (e = e.substring(1)), e = e.split("&"), u = 0; u < e.length; ++u) (v = e[u].split("=", 2)), 2 == v.length && (a[v[0]] = decodeURIComponent(v[1].replace(/\+/g, " ")));
                    return (
                        (c = n.extend(!0, {}, r.params, f.opts[i], a)),
                        (o = "function" === n.type(r.url) ? r.url.call(this, s, c, f) : t(r.url, s, c)),
                        (y = "function" === n.type(r.thumb) ? r.thumb.call(this, s, c, f) : t(r.thumb, s)),
                        "youtube" === i
                            ? (o = o.replace(/&t=((\d+)m)?(\d+)s/, function (n, t, i, r) {
                                  return "&start=" + ((i ? 60 * parseInt(i, 10) : 0) + parseInt(r, 10));
                              }))
                            : "vimeo" === i && (o = o.replace("&%23", "#")),
                        !1
                    );
                }
            });
            h
                ? (f.opts.thumb || (f.opts.$thumb && f.opts.$thumb.length) || (f.opts.thumb = y),
                  "iframe" === h && (f.opts = n.extend(!0, f.opts, { iframe: { preload: !1, attr: { scrolling: "no" } } })),
                  n.extend(f, { type: h, src: o, origSrc: f.src, contentSource: l, contentType: "image" === h ? "image" : "gmap_place" == l || "gmap_search" == l ? "map" : "video" }))
                : o && (f.type = f.opts.defaultType);
        });
        i = {
            youtube: { src: "https://www.youtube.com/iframe_api", class: "YT", loading: !1, loaded: !1 },
            vimeo: { src: "https://player.vimeo.com/api/player.js", class: "Vimeo", loading: !1, loaded: !1 },
            load: function (n) {
                var t,
                    i = this;
                if (this[n].loaded)
                    return void setTimeout(function () {
                        i.done(n);
                    });
                this[n].loading ||
                    ((this[n].loading = !0),
                    (t = document.createElement("script")),
                    (t.type = "text/javascript"),
                    (t.src = this[n].src),
                    "youtube" === n
                        ? (window.onYouTubeIframeAPIReady = function () {
                              i[n].loaded = !0;
                              i.done(n);
                          })
                        : (t.onload = function () {
                              i[n].loaded = !0;
                              i.done(n);
                          }),
                    document.body.appendChild(t));
            },
            done: function (t) {
                var i, r, u;
                "youtube" === t && delete window.onYouTubeIframeAPIReady;
                (i = n.fancybox.getInstance()) &&
                    ((r = i.current.$content.find("iframe")),
                    "youtube" === t && void 0 !== YT && YT
                        ? (u = new YT.Player(r.attr("id"), {
                              events: {
                                  onStateChange: function (n) {
                                      0 == n.data && i.next();
                                  },
                              },
                          }))
                        : "vimeo" === t &&
                          void 0 !== Vimeo &&
                          Vimeo &&
                          ((u = new Vimeo.Player(r)),
                          u.on("ended", function () {
                              i.next();
                          })));
            },
        };
        n(document).on({
            "afterShow.fb": function (n, t, r) {
                t.group.length > 1 && ("youtube" === r.contentSource || "vimeo" === r.contentSource) && i.load(r.contentSource);
            },
        });
    })(jQuery),
    (function (n, t, i) {
        "use strict";
        var o = (function () {
                return (
                    n.requestAnimationFrame ||
                    n.webkitRequestAnimationFrame ||
                    n.mozRequestAnimationFrame ||
                    n.oRequestAnimationFrame ||
                    function (t) {
                        return n.setTimeout(t, 1e3 / 60);
                    }
                );
            })(),
            f = (function () {
                return (
                    n.cancelAnimationFrame ||
                    n.webkitCancelAnimationFrame ||
                    n.mozCancelAnimationFrame ||
                    n.oCancelAnimationFrame ||
                    function (t) {
                        n.clearTimeout(t);
                    }
                );
            })(),
            e = function (t) {
                var r = [],
                    i;
                t = t.originalEvent || t || n.e;
                t = t.touches && t.touches.length ? t.touches : t.changedTouches && t.changedTouches.length ? t.changedTouches : [t];
                for (i in t) t[i].pageX ? r.push({ x: t[i].pageX, y: t[i].pageY }) : t[i].clientX && r.push({ x: t[i].clientX, y: t[i].clientY });
                return r;
            },
            u = function (n, t, i) {
                return t && n ? ("x" === i ? n.x - t.x : "y" === i ? n.y - t.y : Math.sqrt(Math.pow(n.x - t.x, 2) + Math.pow(n.y - t.y, 2))) : 0;
            },
            s = function (n) {
                if (n.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe') || i.isFunction(n.get(0).onclick) || n.data("selectable")) return !0;
                for (var t = 0, r = n[0].attributes, u = r.length; t < u; t++) if ("data-fancybox-" === r[t].nodeName.substr(0, 14)) return !0;
                return !1;
            },
            c = function (t) {
                var i = n.getComputedStyle(t)["overflow-y"],
                    r = n.getComputedStyle(t)["overflow-x"],
                    u = ("scroll" === i || "auto" === i) && t.scrollHeight > t.clientHeight,
                    f = ("scroll" === r || "auto" === r) && t.scrollWidth > t.clientWidth;
                return u || f;
            },
            h = function (n) {
                for (var t = !1; ; ) {
                    if ((t = c(n.get(0)))) break;
                    if (((n = n.parent()), !n.length || n.hasClass("fancybox-stage") || n.is("body"))) break;
                }
                return t;
            },
            r = function (n) {
                var t = this;
                t.instance = n;
                t.$bg = n.$refs.bg;
                t.$stage = n.$refs.stage;
                t.$container = n.$refs.container;
                t.destroy();
                t.$container.on("touchstart.fb.touch mousedown.fb.touch", i.proxy(t, "ontouchstart"));
            };
        r.prototype.destroy = function () {
            var n = this;
            n.$container.off(".fb.touch");
            i(t).off(".fb.touch");
            n.requestId && (f(n.requestId), (n.requestId = null));
            n.tapped && (clearTimeout(n.tapped), (n.tapped = null));
        };
        r.prototype.ontouchstart = function (r) {
            var f = this,
                o = i(r.target),
                l = f.instance,
                c = l.current,
                a = c.$slide,
                y = c.$content,
                v = "touchstart" == r.type;
            if (
                (v && f.$container.off("mousedown.fb.touch"),
                (!r.originalEvent || 2 != r.originalEvent.button) && a.length && o.length && !s(o) && !s(o.parent()) && (o.is("img") || !(r.originalEvent.clientX > o[0].clientWidth + o.offset().left)))
            ) {
                if (!c || l.isAnimating || c.$slide.hasClass("fancybox-animated")) return r.stopPropagation(), void r.preventDefault();
                f.realPoints = f.startPoints = e(r);
                f.startPoints.length &&
                    (c.touch && r.stopPropagation(),
                    (f.startEvent = r),
                    (f.canTap = !0),
                    (f.$target = o),
                    (f.$content = y),
                    (f.opts = c.opts.touch),
                    (f.isPanning = !1),
                    (f.isSwiping = !1),
                    (f.isZooming = !1),
                    (f.isScrolling = !1),
                    (f.canPan = l.canPan()),
                    (f.startTime = new Date().getTime()),
                    (f.distanceX = f.distanceY = f.distance = 0),
                    (f.canvasWidth = Math.round(a[0].clientWidth)),
                    (f.canvasHeight = Math.round(a[0].clientHeight)),
                    (f.contentLastPos = null),
                    (f.contentStartPos = i.fancybox.getTranslate(f.$content) || { top: 0, left: 0 }),
                    (f.sliderStartPos = i.fancybox.getTranslate(a)),
                    (f.stagePos = i.fancybox.getTranslate(l.$refs.stage)),
                    (f.sliderStartPos.top -= f.stagePos.top),
                    (f.sliderStartPos.left -= f.stagePos.left),
                    (f.contentStartPos.top -= f.stagePos.top),
                    (f.contentStartPos.left -= f.stagePos.left),
                    i(t)
                        .off(".fb.touch")
                        .on(v ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", i.proxy(f, "ontouchend"))
                        .on(v ? "touchmove.fb.touch" : "mousemove.fb.touch", i.proxy(f, "ontouchmove")),
                    i.fancybox.isMobile && t.addEventListener("scroll", f.onscroll, !0),
                    (((f.opts || f.canPan) && (o.is(f.$stage) || f.$stage.find(o).length)) || (o.is(".fancybox-image") && r.preventDefault(), i.fancybox.isMobile && o.parents(".fancybox-caption").length)) &&
                        ((f.isScrollable = h(o) || h(o.parent())),
                        (i.fancybox.isMobile && f.isScrollable) || r.preventDefault(),
                        (1 === f.startPoints.length || c.hasError) && (f.canPan ? (i.fancybox.stop(f.$content), (f.isPanning = !0)) : (f.isSwiping = !0), f.$container.addClass("fancybox-is-grabbing")),
                        2 === f.startPoints.length &&
                            "image" === c.type &&
                            (c.isLoaded || c.$ghost) &&
                            ((f.canTap = !1),
                            (f.isSwiping = !1),
                            (f.isPanning = !1),
                            (f.isZooming = !0),
                            i.fancybox.stop(f.$content),
                            (f.centerPointStartX = 0.5 * (f.startPoints[0].x + f.startPoints[1].x) - i(n).scrollLeft()),
                            (f.centerPointStartY = 0.5 * (f.startPoints[0].y + f.startPoints[1].y) - i(n).scrollTop()),
                            (f.percentageOfImageAtPinchPointX = (f.centerPointStartX - f.contentStartPos.left) / f.contentStartPos.width),
                            (f.percentageOfImageAtPinchPointY = (f.centerPointStartY - f.contentStartPos.top) / f.contentStartPos.height),
                            (f.startDistanceBetweenFingers = u(f.startPoints[0], f.startPoints[1])))));
            }
        };
        r.prototype.onscroll = function () {
            var n = this;
            n.isScrolling = !0;
            t.removeEventListener("scroll", n.onscroll, !0);
        };
        r.prototype.ontouchmove = function (n) {
            var t = this;
            return void 0 !== n.originalEvent.buttons && 0 === n.originalEvent.buttons
                ? void t.ontouchend(n)
                : t.isScrolling
                ? void (t.canTap = !1)
                : ((t.newPoints = e(n)),
                  void (
                      (t.opts || t.canPan) &&
                      t.newPoints.length &&
                      t.newPoints.length &&
                      ((t.isSwiping && !0 === t.isSwiping) || n.preventDefault(),
                      (t.distanceX = u(t.newPoints[0], t.startPoints[0], "x")),
                      (t.distanceY = u(t.newPoints[0], t.startPoints[0], "y")),
                      (t.distance = u(t.newPoints[0], t.startPoints[0])),
                      t.distance > 0 && (t.isSwiping ? t.onSwipe(n) : t.isPanning ? t.onPan() : t.isZooming && t.onZoom()))
                  ));
        };
        r.prototype.onSwipe = function () {
            var e,
                t = this,
                r = t.instance,
                s = t.isSwiping,
                u = t.sliderStartPos.left || 0;
            if (!0 !== s)
                "x" == s &&
                    (t.distanceX > 0 && (t.instance.group.length < 2 || (0 === t.instance.current.index && !t.instance.current.opts.loop))
                        ? (u += Math.pow(t.distanceX, 0.8))
                        : t.distanceX < 0 && (t.instance.group.length < 2 || (t.instance.current.index === t.instance.group.length - 1 && !t.instance.current.opts.loop))
                        ? (u -= Math.pow(-t.distanceX, 0.8))
                        : (u += t.distanceX)),
                    (t.sliderLastPos = { top: "x" == s ? 0 : t.sliderStartPos.top + t.distanceY, left: u }),
                    t.requestId && (f(t.requestId), (t.requestId = null)),
                    (t.requestId = o(function () {
                        t.sliderLastPos &&
                            (i.each(t.instance.slides, function (n, r) {
                                var u = r.pos - t.instance.currPos;
                                i.fancybox.setTranslate(r.$slide, { top: t.sliderLastPos.top, left: t.sliderLastPos.left + u * t.canvasWidth + u * r.opts.gutter });
                            }),
                            t.$container.addClass("fancybox-is-sliding"));
                    }));
            else if (Math.abs(t.distance) > 10) {
                if (
                    ((t.canTap = !1),
                    r.group.length < 2 && t.opts.vertical
                        ? (t.isSwiping = "y")
                        : r.isDragging || !1 === t.opts.vertical || ("auto" === t.opts.vertical && i(n).width() > 800)
                        ? (t.isSwiping = "x")
                        : ((e = Math.abs((180 * Math.atan2(t.distanceY, t.distanceX)) / Math.PI)), (t.isSwiping = e > 45 && e < 135 ? "y" : "x")),
                    "y" === t.isSwiping && i.fancybox.isMobile && t.isScrollable)
                )
                    return void (t.isScrolling = !0);
                r.isDragging = t.isSwiping;
                t.startPoints = t.newPoints;
                i.each(r.slides, function (n, u) {
                    var f, e;
                    i.fancybox.stop(u.$slide);
                    f = i.fancybox.getTranslate(u.$slide);
                    e = i.fancybox.getTranslate(r.$refs.stage);
                    u.$slide
                        .css({ transform: "", opacity: "", "transition-duration": "" })
                        .removeClass("fancybox-animated")
                        .removeClass(function (n, t) {
                            return (t.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ");
                        });
                    u.pos === r.current.pos && ((t.sliderStartPos.top = f.top - e.top), (t.sliderStartPos.left = f.left - e.left));
                    i.fancybox.setTranslate(u.$slide, { top: f.top - e.top, left: f.left - e.left });
                });
                r.SlideShow && r.SlideShow.isActive && r.SlideShow.stop();
            }
        };
        r.prototype.onPan = function () {
            var n = this;
            if (u(n.newPoints[0], n.realPoints[0]) < (i.fancybox.isMobile ? 10 : 5)) return void (n.startPoints = n.newPoints);
            n.canTap = !1;
            n.contentLastPos = n.limitMovement();
            n.requestId && f(n.requestId);
            n.requestId = o(function () {
                i.fancybox.setTranslate(n.$content, n.contentLastPos);
            });
        };
        r.prototype.limitMovement = function () {
            var f,
                e,
                o,
                s,
                n,
                t,
                i = this,
                h = i.canvasWidth,
                v = i.canvasHeight,
                r = i.distanceX,
                u = i.distanceY,
                c = i.contentStartPos,
                l = c.left,
                y = c.top,
                a = c.width,
                p = c.height;
            return (
                (n = a > h ? l + r : l),
                (t = y + u),
                (f = Math.max(0, 0.5 * h - 0.5 * a)),
                (e = Math.max(0, 0.5 * v - 0.5 * p)),
                (o = Math.min(h - a, 0.5 * h - 0.5 * a)),
                (s = Math.min(v - p, 0.5 * v - 0.5 * p)),
                r > 0 && n > f && (n = f - 1 + Math.pow(-f + l + r, 0.8) || 0),
                r < 0 && n < o && (n = o + 1 - Math.pow(o - l - r, 0.8) || 0),
                u > 0 && t > e && (t = e - 1 + Math.pow(-e + y + u, 0.8) || 0),
                u < 0 && t < s && (t = s + 1 - Math.pow(s - y - u, 0.8) || 0),
                { top: t, left: n }
            );
        };
        r.prototype.limitPosition = function (n, t, i, r) {
            var e = this,
                u = e.canvasWidth,
                f = e.canvasHeight;
            return i > u ? ((n = n > 0 ? 0 : n), (n = n < u - i ? u - i : n)) : (n = Math.max(0, u / 2 - i / 2)), r > f ? ((t = t > 0 ? 0 : t), (t = t < f - r ? f - r : t)) : (t = Math.max(0, f / 2 - r / 2)), { top: t, left: n };
        };
        r.prototype.onZoom = function () {
            var t = this,
                r = t.contentStartPos,
                s = r.width,
                h = r.height,
                a = r.left,
                v = r.top,
                y = u(t.newPoints[0], t.newPoints[1]),
                e = y / t.startDistanceBetweenFingers,
                c = Math.floor(s * e),
                l = Math.floor(h * e),
                p = (s - c) * t.percentageOfImageAtPinchPointX,
                w = (h - l) * t.percentageOfImageAtPinchPointY,
                b = (t.newPoints[0].x + t.newPoints[1].x) / 2 - i(n).scrollLeft(),
                k = (t.newPoints[0].y + t.newPoints[1].y) / 2 - i(n).scrollTop(),
                d = b - t.centerPointStartX,
                g = k - t.centerPointStartY,
                nt = a + (p + d),
                tt = v + (w + g),
                it = { top: tt, left: nt, scaleX: e, scaleY: e };
            t.canTap = !1;
            t.newWidth = c;
            t.newHeight = l;
            t.contentLastPos = it;
            t.requestId && f(t.requestId);
            t.requestId = o(function () {
                i.fancybox.setTranslate(t.$content, t.contentLastPos);
            });
        };
        r.prototype.ontouchend = function (n) {
            var r = this,
                u = r.isSwiping,
                o = r.isPanning,
                s = r.isZooming,
                h = r.isScrolling;
            if (
                ((r.endPoints = e(n)),
                (r.dMs = Math.max(new Date().getTime() - r.startTime, 1)),
                r.$container.removeClass("fancybox-is-grabbing"),
                i(t).off(".fb.touch"),
                t.removeEventListener("scroll", r.onscroll, !0),
                r.requestId && (f(r.requestId), (r.requestId = null)),
                (r.isSwiping = !1),
                (r.isPanning = !1),
                (r.isZooming = !1),
                (r.isScrolling = !1),
                (r.instance.isDragging = !1),
                r.canTap)
            )
                return r.onTap(n);
            r.speed = 100;
            r.velocityX = (r.distanceX / r.dMs) * 0.5;
            r.velocityY = (r.distanceY / r.dMs) * 0.5;
            o ? r.endPanning() : s ? r.endZooming() : r.endSwiping(u, h);
        };
        r.prototype.endSwiping = function (n, t) {
            var r = this,
                u = !1,
                o = r.instance.group.length,
                f = Math.abs(r.distanceX),
                e = "x" == n && o > 1 && ((r.dMs > 130 && f > 10) || f > 50);
            r.sliderLastPos = null;
            "y" == n && !t && Math.abs(r.distanceY) > 50
                ? (i.fancybox.animate(r.instance.current.$slide, { top: r.sliderStartPos.top + r.distanceY + 150 * r.velocityY, opacity: 0 }, 200), (u = r.instance.close(!0, 250)))
                : e && r.distanceX > 0
                ? (u = r.instance.previous(300))
                : e && r.distanceX < 0 && (u = r.instance.next(300));
            !1 !== u || ("x" != n && "y" != n) || r.instance.centerSlide(200);
            r.$container.removeClass("fancybox-is-sliding");
        };
        r.prototype.endPanning = function () {
            var r,
                u,
                t,
                n = this;
            n.contentLastPos &&
                (!1 === n.opts.momentum || n.dMs > 350 ? ((r = n.contentLastPos.left), (u = n.contentLastPos.top)) : ((r = n.contentLastPos.left + 500 * n.velocityX), (u = n.contentLastPos.top + 500 * n.velocityY)),
                (t = n.limitPosition(r, u, n.contentStartPos.width, n.contentStartPos.height)),
                (t.width = n.contentStartPos.width),
                (t.height = n.contentStartPos.height),
                i.fancybox.animate(n.$content, t, 366));
        };
        r.prototype.endZooming = function () {
            var u,
                f,
                e,
                o,
                n = this,
                s = n.instance.current,
                t = n.newWidth,
                r = n.newHeight;
            n.contentLastPos &&
                ((u = n.contentLastPos.left),
                (f = n.contentLastPos.top),
                (o = { top: f, left: u, width: t, height: r, scaleX: 1, scaleY: 1 }),
                i.fancybox.setTranslate(n.$content, o),
                t < n.canvasWidth && r < n.canvasHeight
                    ? n.instance.scaleToFit(150)
                    : t > s.width || r > s.height
                    ? n.instance.scaleToActual(n.centerPointStartX, n.centerPointStartY, 150)
                    : ((e = n.limitPosition(u, f, t, r)), i.fancybox.animate(n.$content, e, 150)));
        };
        r.prototype.onTap = function (t) {
            var f,
                u = this,
                s = i(t.target),
                r = u.instance,
                o = r.current,
                h = (t && e(t)) || u.startPoints,
                c = h[0] ? h[0].x - i(n).scrollLeft() - u.stagePos.left : 0,
                l = h[0] ? h[0].y - i(n).scrollTop() - u.stagePos.top : 0,
                a = function (n) {
                    var f = o.opts[n];
                    if ((i.isFunction(f) && (f = f.apply(r, [o, t])), f))
                        switch (f) {
                            case "close":
                                r.close(u.startEvent);
                                break;
                            case "toggleControls":
                                r.toggleControls();
                                break;
                            case "next":
                                r.next();
                                break;
                            case "nextOrClose":
                                r.group.length > 1 ? r.next() : r.close(u.startEvent);
                                break;
                            case "zoom":
                                "image" == o.type && (o.isLoaded || o.$ghost) && (r.canPan() ? r.scaleToFit() : r.isScaledDown() ? r.scaleToActual(c, l) : r.group.length < 2 && r.close(u.startEvent));
                        }
                };
            if ((!t.originalEvent || 2 != t.originalEvent.button) && (s.is("img") || !(c > s[0].clientWidth + s.offset().left))) {
                if (s.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) f = "Outside";
                else if (s.is(".fancybox-slide")) f = "Slide";
                else {
                    if (!r.current.$content || !r.current.$content.find(s).addBack().filter(s).length) return;
                    f = "Content";
                }
                if (u.tapped) {
                    if ((clearTimeout(u.tapped), (u.tapped = null), Math.abs(c - u.tapX) > 50 || Math.abs(l - u.tapY) > 50)) return this;
                    a("dblclick" + f);
                } else
                    (u.tapX = c),
                        (u.tapY = l),
                        o.opts["dblclick" + f] && o.opts["dblclick" + f] !== o.opts["click" + f]
                            ? (u.tapped = setTimeout(function () {
                                  u.tapped = null;
                                  r.isAnimating || a("click" + f);
                              }, 500))
                            : a("click" + f);
                return this;
            }
        };
        i(t)
            .on("onActivate.fb", function (n, t) {
                t && !t.Guestures && (t.Guestures = new r(t));
            })
            .on("beforeClose.fb", function (n, t) {
                t && t.Guestures && t.Guestures.destroy();
            });
    })(window, document, jQuery),
    (function (n, t) {
        "use strict";
        t.extend(!0, t.fancybox.defaults, {
            btnTpl: {
                slideShow:
                    '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>',
            },
            slideShow: { autoStart: !1, speed: 3e3, progress: !0 },
        });
        var i = function (n) {
            this.instance = n;
            this.init();
        };
        t.extend(i.prototype, {
            timer: null,
            isActive: !1,
            $button: null,
            init: function () {
                var n = this,
                    i = n.instance,
                    r = i.group[i.currIndex].opts.slideShow;
                n.$button = i.$refs.toolbar.find("[data-fancybox-play]").on("click", function () {
                    n.toggle();
                });
                i.group.length < 2 || !r ? n.$button.hide() : r.progress && (n.$progress = t('<div class="fancybox-progress"></div>').appendTo(i.$refs.inner));
            },
            set: function (n) {
                var r = this,
                    i = r.instance,
                    u = i.current;
                u && (!0 === n || u.opts.loop || i.currIndex < i.group.length - 1)
                    ? r.isActive &&
                      "video" !== u.contentType &&
                      (r.$progress && t.fancybox.animate(r.$progress.show(), { scaleX: 1 }, u.opts.slideShow.speed),
                      (r.timer = setTimeout(function () {
                          i.current.opts.loop || i.current.index != i.group.length - 1 ? i.next() : i.jumpTo(0);
                      }, u.opts.slideShow.speed)))
                    : (r.stop(), (i.idleSecondsCounter = 0), i.showControls());
            },
            clear: function () {
                var n = this;
                clearTimeout(n.timer);
                n.timer = null;
                n.$progress && n.$progress.removeAttr("style").hide();
            },
            start: function () {
                var n = this,
                    t = n.instance.current;
                t &&
                    (n.$button
                        .attr("title", (t.opts.i18n[t.opts.lang] || t.opts.i18n.en).PLAY_STOP)
                        .removeClass("fancybox-button--play")
                        .addClass("fancybox-button--pause"),
                    (n.isActive = !0),
                    t.isComplete && n.set(!0),
                    n.instance.trigger("onSlideShowChange", !0));
            },
            stop: function () {
                var n = this,
                    t = n.instance.current;
                n.clear();
                n.$button
                    .attr("title", (t.opts.i18n[t.opts.lang] || t.opts.i18n.en).PLAY_START)
                    .removeClass("fancybox-button--pause")
                    .addClass("fancybox-button--play");
                n.isActive = !1;
                n.instance.trigger("onSlideShowChange", !1);
                n.$progress && n.$progress.removeAttr("style").hide();
            },
            toggle: function () {
                var n = this;
                n.isActive ? n.stop() : n.start();
            },
        });
        t(n).on({
            "onInit.fb": function (n, t) {
                t && !t.SlideShow && (t.SlideShow = new i(t));
            },
            "beforeShow.fb": function (n, t, i, r) {
                var u = t && t.SlideShow;
                r ? u && i.opts.slideShow.autoStart && u.start() : u && u.isActive && u.clear();
            },
            "afterShow.fb": function (n, t) {
                var i = t && t.SlideShow;
                i && i.isActive && i.set();
            },
            "afterKeydown.fb": function (i, r, u, f, e) {
                var o = r && r.SlideShow;
                o && u.opts.slideShow && (80 === e || 32 === e) && !t(n.activeElement).is("button,a,input") && (f.preventDefault(), o.toggle());
            },
            "beforeClose.fb onDeactivate.fb": function (n, t) {
                var i = t && t.SlideShow;
                i && i.stop();
            },
        });
        t(n).on("visibilitychange", function () {
            var r = t.fancybox.getInstance(),
                i = r && r.SlideShow;
            i && i.isActive && (n.hidden ? i.clear() : i.set());
        });
    })(document, jQuery),
    (function (n, t) {
        "use strict";
        var i = (function () {
                for (
                    var t,
                        i,
                        r = [
                            ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                            ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                            ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                            ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                            ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"],
                        ],
                        f = {},
                        u = 0;
                    u < r.length;
                    u++
                )
                    if (((t = r[u]), t && t[1] in n)) {
                        for (i = 0; i < t.length; i++) f[r[0][i]] = t[i];
                        return f;
                    }
                return !1;
            })(),
            r;
        i &&
            ((r = {
                request: function (t) {
                    t = t || n.documentElement;
                    t[i.requestFullscreen](t.ALLOW_KEYBOARD_INPUT);
                },
                exit: function () {
                    n[i.exitFullscreen]();
                },
                toggle: function (t) {
                    t = t || n.documentElement;
                    this.isFullscreen() ? this.exit() : this.request(t);
                },
                isFullscreen: function () {
                    return Boolean(n[i.fullscreenElement]);
                },
                enabled: function () {
                    return Boolean(n[i.fullscreenEnabled]);
                },
            }),
            t.extend(!0, t.fancybox.defaults, {
                btnTpl: {
                    fullScreen:
                        '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>',
                },
                fullScreen: { autoStart: !1 },
            }),
            t(n).on(i.fullscreenchange, function () {
                var i = r.isFullscreen(),
                    n = t.fancybox.getInstance();
                n &&
                    (n.current && "image" === n.current.type && n.isAnimating && ((n.isAnimating = !1), n.update(!0, !0, 0), n.isComplete || n.complete()),
                    n.trigger("onFullscreenChange", i),
                    n.$refs.container.toggleClass("fancybox-is-fullscreen", i),
                    n.$refs.toolbar.find("[data-fancybox-fullscreen]").toggleClass("fancybox-button--fsenter", !i).toggleClass("fancybox-button--fsexit", i));
            }));
        t(n).on({
            "onInit.fb": function (n, t) {
                var u;
                if (!i) return void t.$refs.toolbar.find("[data-fancybox-fullscreen]").remove();
                t && t.group[t.currIndex].opts.fullScreen
                    ? ((u = t.$refs.container),
                      u.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function (n) {
                          n.stopPropagation();
                          n.preventDefault();
                          r.toggle();
                      }),
                      t.opts.fullScreen && !0 === t.opts.fullScreen.autoStart && r.request(),
                      (t.FullScreen = r))
                    : t && t.$refs.toolbar.find("[data-fancybox-fullscreen]").hide();
            },
            "afterKeydown.fb": function (n, t, i, r, u) {
                t && t.FullScreen && 70 === u && (r.preventDefault(), t.FullScreen.toggle());
            },
            "beforeClose.fb": function (n, t) {
                t && t.FullScreen && t.$refs.container.hasClass("fancybox-is-fullscreen") && r.exit();
            },
        });
    })(document, jQuery),
    (function (n, t) {
        "use strict";
        var i = "fancybox-thumbs",
            r;
        t.fancybox.defaults = t.extend(
            !0,
            {
                btnTpl: {
                    thumbs:
                        '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>',
                },
                thumbs: { autoStart: !1, hideOnClose: !0, parentEl: ".fancybox-container", axis: "y" },
            },
            t.fancybox.defaults
        );
        r = function (n) {
            this.init(n);
        };
        t.extend(r.prototype, {
            $button: null,
            $grid: null,
            $list: null,
            isVisible: !1,
            isActive: !1,
            init: function (n) {
                var t = this,
                    r = n.group,
                    u = 0,
                    i,
                    f;
                for (t.instance = n, t.opts = r[n.currIndex].opts.thumbs, n.Thumbs = t, t.$button = n.$refs.toolbar.find("[data-fancybox-thumbs]"), i = 0, f = r.length; i < f && (r[i].thumb && u++, !(u > 1)); i++);
                u > 1 && t.opts
                    ? (t.$button.removeAttr("style").on("click", function () {
                          t.toggle();
                      }),
                      (t.isActive = !0))
                    : t.$button.hide();
            },
            create: function () {
                var r,
                    n = this,
                    u = n.instance,
                    f = n.opts.parentEl,
                    e = [];
                n.$grid ||
                    ((n.$grid = t('<div class="' + i + " " + i + "-" + n.opts.axis + '"></div>').appendTo(u.$refs.container.find(f).addBack().filter(f))),
                    n.$grid.on("click", "a", function () {
                        u.jumpTo(t(this).attr("data-index"));
                    }));
                n.$list || (n.$list = t('<div class="' + i + '__list">').appendTo(n.$grid));
                t.each(u.group, function (n, t) {
                    r = t.thumb;
                    r || "image" !== t.type || (r = t.src);
                    e.push('<a href="javascript:;" tabindex="0" data-index="' + n + '"' + (r && r.length ? ' style="background-image:url(' + r + ')"' : 'class="fancybox-thumbs-missing"') + "></a>");
                });
                n.$list[0].innerHTML = e.join("");
                "x" === n.opts.axis && n.$list.width(parseInt(n.$grid.css("padding-right"), 10) + u.group.length * n.$list.children().eq(0).outerWidth(!0));
            },
            focus: function (n) {
                var u,
                    t,
                    i = this,
                    r = i.$list,
                    f = i.$grid;
                i.instance.current &&
                    ((u = r
                        .children()
                        .removeClass("fancybox-thumbs-active")
                        .filter('[data-index="' + i.instance.current.index + '"]')
                        .addClass("fancybox-thumbs-active")),
                    (t = u.position()),
                    "y" === i.opts.axis && (t.top < 0 || t.top > r.height() - u.outerHeight())
                        ? r.stop().animate({ scrollTop: r.scrollTop() + t.top }, n)
                        : "x" === i.opts.axis && (t.left < f.scrollLeft() || t.left > f.scrollLeft() + (f.width() - u.outerWidth())) && r.parent().stop().animate({ scrollLeft: t.left }, n));
            },
            update: function () {
                var n = this;
                n.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible);
                n.isVisible ? (n.$grid || n.create(), n.instance.trigger("onThumbsShow"), n.focus(0)) : n.$grid && n.instance.trigger("onThumbsHide");
                n.instance.update();
            },
            hide: function () {
                this.isVisible = !1;
                this.update();
            },
            show: function () {
                this.isVisible = !0;
                this.update();
            },
            toggle: function () {
                this.isVisible = !this.isVisible;
                this.update();
            },
        });
        t(n).on({
            "onInit.fb": function (n, t) {
                var i;
                t && !t.Thumbs && ((i = new r(t)), i.isActive && !0 === i.opts.autoStart && i.show());
            },
            "beforeShow.fb": function (n, t, i, r) {
                var u = t && t.Thumbs;
                u && u.isVisible && u.focus(r ? 0 : 250);
            },
            "afterKeydown.fb": function (n, t, i, r, u) {
                var f = t && t.Thumbs;
                f && f.isActive && 71 === u && (r.preventDefault(), f.toggle());
            },
            "beforeClose.fb": function (n, t) {
                var i = t && t.Thumbs;
                i && i.isVisible && !1 !== i.opts.hideOnClose && i.$grid.hide();
            },
        });
    })(document, jQuery),
    (function (n, t) {
        "use strict";
        function i(n) {
            var t = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;", "`": "&#x60;", "=": "&#x3D;" };
            return String(n).replace(/[&<>"'`=\/]/g, function (n) {
                return t[n];
            });
        }
        t.extend(!0, t.fancybox.defaults, {
            btnTpl: {
                share:
                    '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>',
            },
            share: {
                url: function (n, t) {
                    return (!n.currentHash && "inline" !== t.type && "html" !== t.type && (t.origSrc || t.src)) || window.location;
                },
                tpl:
                    '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>',
            },
        });
        t(n).on("click", "[data-fancybox-share]", function () {
            var u,
                f,
                r = t.fancybox.getInstance(),
                n = r.current || null;
            n &&
                ("function" === t.type(n.opts.share.url) && (u = n.opts.share.url.apply(n, [r, n])),
                (f = n.opts.share.tpl
                    .replace(/\{\{media\}\}/g, "image" === n.type ? encodeURIComponent(n.src) : "")
                    .replace(/\{\{url\}\}/g, encodeURIComponent(u))
                    .replace(/\{\{url_raw\}\}/g, i(u))
                    .replace(/\{\{descr\}\}/g, r.$caption ? encodeURIComponent(r.$caption.text()) : "")),
                t.fancybox.open({
                    src: r.translate(r, f),
                    type: "html",
                    opts: {
                        touch: !1,
                        animationEffect: !1,
                        afterLoad: function (n, t) {
                            r.$refs.container.one("beforeClose.fb", function () {
                                n.close(null, 0);
                            });
                            t.$content.find(".fancybox-share__button").click(function () {
                                return window.open(this.href, "Share", "width=550, height=450"), !1;
                            });
                        },
                        mobile: { autoFocus: !1 },
                    },
                }));
        });
    })(document, jQuery),
    (function (n, t, i) {
        "use strict";
        function r() {
            var i = n.location.hash.substr(1),
                t = i.split("-"),
                r = t.length > 1 && /^\+?\d+$/.test(t[t.length - 1]) ? parseInt(t.pop(-1), 10) || 1 : 1,
                u = t.join("-");
            return { hash: i, index: r < 1 ? 1 : r, gallery: u };
        }
        function u(n) {
            "" !== n.gallery &&
                i("[data-fancybox='" + i.escapeSelector(n.gallery) + "']")
                    .eq(n.index - 1)
                    .focus()
                    .trigger("click.fb-start");
        }
        function f(n) {
            var t, i;
            return !!n && ((t = n.current ? n.current.opts : n.opts), "" !== (i = t.hash || (t.$orig ? t.$orig.data("fancybox") || t.$orig.data("fancybox-trigger") : "")) && i);
        }
        i.escapeSelector ||
            (i.escapeSelector = function (n) {
                return (n + "").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, function (n, t) {
                    return t ? ("\0" === n ? "�" : n.slice(0, -1) + "\\" + n.charCodeAt(n.length - 1).toString(16) + " ") : "\\" + n;
                });
            });
        i(function () {
            !1 !== i.fancybox.defaults.hash &&
                (i(t).on({
                    "onInit.fb": function (n, t) {
                        var i, u;
                        !1 !== t.group[t.currIndex].opts.hash && ((i = r()), (u = f(t)) && i.gallery && u == i.gallery && (t.currIndex = i.index - 1));
                    },
                    "beforeShow.fb": function (i, r, u, e) {
                        var o;
                        u &&
                            !1 !== u.opts.hash &&
                            (o = f(r)) &&
                            ((r.currentHash = o + (r.group.length > 1 ? "-" + (u.index + 1) : "")),
                            n.location.hash !== "#" + r.currentHash &&
                                (e && !r.origHash && (r.origHash = n.location.hash),
                                r.hashTimer && clearTimeout(r.hashTimer),
                                (r.hashTimer = setTimeout(function () {
                                    "replaceState" in n.history
                                        ? (n.history[e ? "pushState" : "replaceState"]({}, t.title, n.location.pathname + n.location.search + "#" + r.currentHash), e && (r.hasCreatedHistory = !0))
                                        : (n.location.hash = r.currentHash);
                                    r.hashTimer = null;
                                }, 300))));
                    },
                    "beforeClose.fb": function (i, r, u) {
                        u &&
                            !1 !== u.opts.hash &&
                            (clearTimeout(r.hashTimer),
                            r.currentHash && r.hasCreatedHistory
                                ? n.history.back()
                                : r.currentHash && ("replaceState" in n.history ? n.history.replaceState({}, t.title, n.location.pathname + n.location.search + (r.origHash || "")) : (n.location.hash = r.origHash)),
                            (r.currentHash = null));
                    },
                }),
                i(n).on("hashchange.fb", function () {
                    var n = r(),
                        t = null;
                    i.each(i(".fancybox-container").get().reverse(), function (n, r) {
                        var u = i(r).data("FancyBox");
                        if (u && u.currentHash) return (t = u), !1;
                    });
                    t ? t.currentHash === n.gallery + "-" + n.index || (1 === n.index && t.currentHash == n.gallery) || ((t.currentHash = null), t.close()) : "" !== n.gallery && u(n);
                }),
                setTimeout(function () {
                    i.fancybox.getInstance() || u(r());
                }, 50));
        });
    })(window, document, jQuery),
    (function (n, t) {
        "use strict";
        var i = new Date().getTime();
        t(n).on({
            "onInit.fb": function (n, t) {
                t.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function (n) {
                    var r = t.current,
                        u = new Date().getTime();
                    t.group.length < 2 ||
                        !1 === r.opts.wheel ||
                        ("auto" === r.opts.wheel && "image" !== r.type) ||
                        (n.preventDefault(),
                        n.stopPropagation(),
                        r.$slide.hasClass("fancybox-animated") || ((n = n.originalEvent || n), u - i < 250 || ((i = u), t[(-n.deltaY || -n.deltaX || n.wheelDelta || -n.detail) < 0 ? "next" : "previous"]())));
                });
            },
        });
    })(document, jQuery);
$(document).ready(function () {
    $(window).width() < 1000 && mobileBackgroundImage();
    industryInsightsCarousel();
    searchFunction();
    menuHover();
    fixedHeader();
    portfolioCarousel();
    partnersCarousel();
    pageAnchors();
    AOS.init({ once: !0, duration: 1500 });
    meetYourTeam();
    imageTextMargin();
    tabs();
    //selectDropdown();
    togglePopUp();
    numberPadding();
    testimonialsCarousel();
    openSidebar();
    openBuySidebar();
    expandCollapse();
    comment();
    $(window).resize(function () {
        meetYourTeam();
        imageTextMargin();
        numberPadding();
        matchHeightItems();
    });
    $(window).width() < 1000 && (mobileMenu(), blueMenu(), filtersMobile(), footerMobile(), spotlightCarouselMobile());
    membershipShowall();
    ressourcesCarousel();
    specialCases();
    $(".logoWrapper").parents(".imgText").addClass("subsidiariesBlock");
    setTimeout(function () {
        $(".banner .contentHolder").addClass("overflowvisible");
    }, 1e3);
    $(".viewAll").click(function () {
        $("div[data-parallax]") && $(window).trigger("resize").trigger("scroll");
    });
    $(".contentitemlistingblock .openPopUp").click(function () {
        $(this).parent().find(".overlayPopUp").show();
    });
    searchDropdown();
    agendaTabs();
    annualReportFunctions();
});
$(window).on("load", function () {
    setTimeout(function () {
        matchHeightItems();
    }, 500);
    $(".ui-autocomplete").appendTo(".searchHolder .innerBlock");
    $(".marketoFormSection textarea").parents(".mktoFormRow").addClass("textAreaParent");
    $(window).width() > 767 &&
        setTimeout(function () {
            $(".col:not(.wideListingItem) .normalListingItem .listingInfos").matchHeight({ byRow: !0 });
            $(".solutionsListing .listingInfos").matchHeight({ byRow: !0 });
            setTimeout(function () {
                $("div[data-parallax]") && $(window).trigger("resize").trigger("scroll");
            }, 2e3);
        }, 4e3);
});
var fancyBoxIsActive = !1;
$(function () {
    $("#globalSearchTextbox").autocomplete({
        source: function (n, t) {
            $.ajax({
                url: "/find_v2/_autocomplete?prefix=" + encodeURIComponent(n.term) + "&size=5",
                success: function (n) {
                    t(
                        $.map(n.hits, function (n) {
                            return { label: n.query, value: n.query };
                        })
                    );
                },
            });
        },
        minLength: 2,
    });
});
