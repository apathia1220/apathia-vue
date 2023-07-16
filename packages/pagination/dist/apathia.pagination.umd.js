(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue"), require("@apathia/apathia.shared"), require("@apathia/apathia.twind")) : typeof define === "function" && define.amd ? define(["exports", "vue", "@apathia/apathia.shared", "@apathia/apathia.twind"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.pagination = {}, global.Vue, global.shared, global.twind));
})(this, function(exports2, vue, apathia_shared, apathia_twind) {
  "use strict";
  const DEFAULT_OPTIONS = {
    currentPage: 1,
    totalItems: 0,
    pageSize: 10,
    totalPages: 0,
    maxLength: 7,
    keepMiddle: true,
    directionBtns: true,
    previousText: "\u4E0A\u4E00\u9875",
    nextText: "\u4E0B\u4E00\u9875",
    boundaryBtns: true,
    firstText: "\u9996\u9875",
    lastText: "\u672B\u9875",
    totalCount: true,
    jumpPage: false
  };
  function usePagination(props, emit) {
    const realOptions = vue.shallowReactive(apathia_shared.mergeWithDefault(DEFAULT_OPTIONS, props.options.value));
    const jumpTo = vue.ref("1");
    const prevPage = vue.ref(0);
    const init = vue.ref(false);
    const pages = vue.ref([]);
    const btnsRef = vue.ref([]);
    const setPageBtnRef = (el) => {
      btnsRef.value.push(el);
    };
    vue.onBeforeUpdate(() => {
      btnsRef.value = [];
    });
    vue.onUpdated(() => {
      updateButtonFocus(realOptions.currentPage);
    });
    const totalItems = vue.computed(() => {
      if (typeof realOptions.totalItems === "number") {
        return realOptions.totalItems;
      }
      return 0;
    });
    const totalPages = vue.computed(() => {
      const options = realOptions;
      if (totalItems.value === 0) {
        return 0;
      }
      return Math.ceil(totalItems.value / options.pageSize);
    });
    const selectPage = (newPage) => {
      const pageNumber = Number(newPage) || 1;
      if (realOptions.currentPage === pageNumber) {
        return;
      }
      if (prevPage.value == null) {
        prevPage.value = realOptions.currentPage;
      }
      realOptions.currentPage = pageNumber;
      prevPage.value = pageNumber;
      emit("page-change", pageNumber, totalPages.value);
      handlePageChange(pageNumber);
    };
    const handlePageChange = (pageNumber) => {
      const limit = realOptions.maxLength;
      if (limit === void 0 || pageNumber === 0) {
        return;
      }
      const keepMiddle2 = realOptions.keepMiddle;
      if (pageNumber === 1 && prevPage.value > limit) {
        pages.value = initPagesArray(keepMiddle2, totalPages.value, pageNumber, limit);
        init.value = true;
        return;
      }
      if (keepMiddle2 && limit < totalPages.value) {
        pages.value = updatePagesArray(keepMiddle2, totalPages.value, pageNumber, limit);
        return;
      }
      const start = (Math.ceil(prevPage.value / limit) - 1) * limit + 1;
      const end = Math.min(start + limit - 1, totalPages.value);
      if (pageNumber < start || pageNumber > end) {
        pages.value = updatePagesArray(keepMiddle2, totalPages.value, pageNumber, limit);
      }
    };
    const updateButtonFocus = (pageNumber = 1) => {
      const pageIndex = pages.value.findIndex((page) => page.number === pageNumber);
      const btns = btnsRef.value;
      if (btns && btns[pageIndex]) {
        btns[pageIndex].focus();
      }
    };
    const keepMiddle = !!realOptions.keepMiddle;
    prevPage.value = realOptions.currentPage;
    vue.watch(() => props.options.value, (optionsVal) => {
      Object.keys(optionsVal).forEach((key) => {
        if (optionsVal[key] !== void 0) {
          switch (key) {
            case "currentPage":
            case "totalItems":
            case "pageSize":
            case "totalPages":
            case "maxLength":
              realOptions[key] = Number(optionsVal[key]);
              break;
            default:
              realOptions[key] = optionsVal[key];
              break;
          }
        }
      });
    }, { immediate: true });
    vue.watch(() => realOptions, (optionsVal) => {
      Object.keys(optionsVal).forEach((key) => {
        if (optionsVal[key] !== void 0) {
          switch (key) {
            case "currentPage":
            case "totalItems":
            case "pageSize":
            case "totalPages":
            case "maxLength":
              realOptions[key] = Number(optionsVal[key]);
              break;
            default:
              realOptions[key] = optionsVal[key];
              break;
          }
        }
      });
    }, { immediate: true });
    vue.watch(() => totalPages.value, () => {
      pages.value = initPagesArray(keepMiddle, totalPages.value, realOptions.currentPage, realOptions.maxLength);
      init.value = true;
    }, { immediate: true });
    vue.watch(() => realOptions.currentPage, (page) => {
      if (init.value === true) {
        init.value = false;
        return;
      }
      if (page === prevPage.value)
        return;
      if (page > 1 && page > totalPages.value) {
        selectPage(totalPages.value);
        return;
      }
      prevPage.value = page;
      handlePageChange(page);
    });
    vue.watch(() => jumpTo.value, (val) => {
      if (val === "") {
        return;
      }
      let newValue = Number(String(val).replace(/[^0-9]/gi, ""));
      if (newValue > 0 && newValue <= totalPages.value) {
        newValue = Math.ceil(newValue);
      } else {
        newValue = newValue <= 0 ? 1 : totalPages.value;
      }
      jumpTo.value = String(newValue);
    });
    return {
      jumpTo,
      pages,
      totalPages,
      totalItems,
      selectPage,
      setPageBtnRef,
      innerOptions: realOptions
    };
  }
  function createPage(number, text) {
    return {
      number,
      text
    };
  }
  function initPagesArray(keepMiddle, totalPages, currentPage, limit) {
    const pages = [];
    let number;
    let start = 1;
    let end = totalPages;
    if (!currentPage) {
      return pages;
    }
    if (keepMiddle && currentPage > limit) {
      start = Math.max(currentPage - Math.floor(limit / 2), 1);
      end = start + limit - 1;
      if (end > totalPages) {
        end = totalPages;
        start = end - limit + 1;
        if (start < 1) {
          start = 1;
        }
      }
    } else {
      start = (Math.ceil(currentPage / limit) - 1) * limit + 1;
      end = Math.min(start + limit - 1, totalPages);
    }
    for (number = start; number <= end; number++) {
      pages.push(createPage(number, number));
    }
    if (totalPages > end && !keepMiddle) {
      pages.push(createPage(number, "..."));
    }
    return pages;
  }
  function updatePagesArray(keepMiddle, totalPages, currentPage, limit) {
    const pages = [];
    let number;
    let start = 1;
    let end;
    if (keepMiddle) {
      start = Math.max(currentPage - Math.floor(limit / 2), 1);
      end = start + limit - 1;
      if (end > totalPages) {
        end = totalPages;
        start = end - limit + 1;
      }
    } else {
      start = (Math.ceil(currentPage / limit) - 1) * limit + 1;
      end = Math.min(start + limit - 1, totalPages);
    }
    for (number = start; number <= end; number++) {
      pages.push(createPage(number, number));
    }
    if (keepMiddle) {
      return pages;
    }
    if (limit <= 0) {
      return pages;
    }
    if (start > 1) {
      pages.unshift(createPage(start - 1, "..."));
    }
    if (end < totalPages) {
      pages.push(createPage(end + 1, "..."));
    }
    return pages;
  }
  const _hoisted_1 = ["onClick"];
  const _sfc_main = vue.defineComponent({
    ...{
      name: "Pagination"
    },
    __name: "Pagination",
    props: {
      options: {}
    },
    emits: ["page-change"],
    setup(__props, { emit }) {
      const props = __props;
      const options = vue.computed(() => ({ ...props.options }));
      const userProps = {
        options
      };
      const {
        jumpTo,
        pages,
        totalPages,
        totalItems,
        selectPage,
        setPageBtnRef,
        innerOptions
      } = usePagination(userProps, emit);
      const getPaginationStyles = () => ({
        wrapper: apathia_twind.style`relative bg-fill-white py-3 flex items-center justify-between`,
        ul: apathia_twind.style`relative z-0 inline-flex items-center text-base`,
        item: apathia_twind.style`relative inline-flex flex-shrink-0 mx-1 px-btn-lg-y py-px border border-fill-neutral rounded 
    bg-fill-white text-content-primary cursor-pointer select-none hover:bg-brand-primary hover:text-content-white`,
        active: apathia_twind.style`text-content-white bg-brand-primary border-brand-primary outline-none`,
        itemDisabled: apathia_twind.style`cursor-not-allowed pointer-events-none text-content-neutral bg-fill-light border-fill-gray`,
        numberBtn: apathia_twind.style`outline-none`,
        jump: apathia_twind.style`relative z-0 inline-flex items-center -space-x-px text-base border border-fill-neutral rounded`,
        jumpInput: apathia_twind.style`outline-none text-center w-8 px-btn-lg-y py-px border-0 rounded`,
        jumpBtn: apathia_twind.style`text-center w-14  px-btn-lg-y py-px border-0 bg-fill-white rounded
    cursor-pointer hover:bg-brand-primary hover:text-content-white`,
        count: apathia_twind.style`px-4`,
        pages: apathia_twind.style`pr-1`
      });
      const styles = getPaginationStyles();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("nav", {
          class: vue.normalizeClass(vue.unref(styles).wrapper)
        }, [
          vue.createElementVNode("ul", {
            class: vue.normalizeClass(vue.unref(styles).ul)
          }, [
            vue.unref(innerOptions).totalCount ? (vue.openBlock(), vue.createElementBlock("li", {
              key: 0,
              class: vue.normalizeClass(vue.unref(styles).count)
            }, [
              vue.renderSlot(_ctx.$slots, "total", {
                totalItems: vue.unref(totalItems),
                totalPages: vue.unref(totalPages)
              }, () => [
                vue.createTextVNode(" \u5171" + vue.toDisplayString(vue.unref(totalItems)) + " \u6761\u6570\u636E ", 1)
              ])
            ], 2)) : vue.createCommentVNode("", true),
            vue.unref(innerOptions).boundaryBtns ? (vue.openBlock(), vue.createElementBlock("li", {
              key: 1,
              class: vue.normalizeClass({
                [vue.unref(styles).item]: true,
                [vue.unref(styles).itemDisabled]: vue.unref(innerOptions).currentPage === 1
              }),
              onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(selectPage)(1))
            }, vue.toDisplayString(vue.unref(innerOptions).firstText), 3)) : vue.createCommentVNode("", true),
            vue.unref(innerOptions).directionBtns ? (vue.openBlock(), vue.createElementBlock("li", {
              key: 2,
              class: vue.normalizeClass({
                [vue.unref(styles).item]: true,
                [vue.unref(styles).itemDisabled]: vue.unref(innerOptions).currentPage === 1
              }),
              onClick: _cache[1] || (_cache[1] = ($event) => vue.unref(selectPage)(vue.unref(innerOptions).currentPage - 1))
            }, vue.toDisplayString(vue.unref(innerOptions).previousText), 3)) : vue.createCommentVNode("", true),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(pages), (page, index) => {
              return vue.openBlock(), vue.createElementBlock("li", {
                key: index,
                ref_for: true,
                ref: vue.unref(setPageBtnRef),
                class: vue.normalizeClass({
                  [vue.unref(styles).item]: true,
                  [vue.unref(styles).numberBtn]: true,
                  [vue.unref(styles).active]: page.number === vue.unref(innerOptions).currentPage
                }),
                onClick: ($event) => vue.unref(selectPage)(page.number)
              }, vue.toDisplayString(page.text), 11, _hoisted_1);
            }), 128)),
            vue.unref(innerOptions).directionBtns ? (vue.openBlock(), vue.createElementBlock("li", {
              key: 3,
              class: vue.normalizeClass({
                [vue.unref(styles).item]: true,
                [vue.unref(styles).itemDisabled]: vue.unref(innerOptions).currentPage === vue.unref(totalPages) || vue.unref(innerOptions).totalItems === 0
              }),
              onClick: _cache[2] || (_cache[2] = ($event) => vue.unref(selectPage)(vue.unref(innerOptions).currentPage + 1))
            }, vue.toDisplayString(vue.unref(innerOptions).nextText), 3)) : vue.createCommentVNode("", true),
            vue.unref(innerOptions).boundaryBtns ? (vue.openBlock(), vue.createElementBlock("li", {
              key: 4,
              class: vue.normalizeClass({
                [vue.unref(styles).item]: true,
                [vue.unref(styles).itemDisabled]: vue.unref(innerOptions).currentPage === vue.unref(totalPages) || vue.unref(innerOptions).totalItems === 0
              }),
              onClick: _cache[3] || (_cache[3] = ($event) => vue.unref(selectPage)(vue.unref(totalPages)))
            }, vue.toDisplayString(vue.unref(innerOptions).lastText), 3)) : vue.createCommentVNode("", true),
            vue.unref(innerOptions).jumpPage ? (vue.openBlock(), vue.createElementBlock("li", {
              key: 5,
              class: vue.normalizeClass({
                [vue.unref(styles).jump]: true
              })
            }, [
              vue.withDirectives(vue.createElementVNode("input", {
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => vue.isRef(jumpTo) ? jumpTo.value = $event : null),
                class: vue.normalizeClass({
                  [vue.unref(styles).jumpInput]: true
                }),
                onKeyup: _cache[5] || (_cache[5] = vue.withKeys(($event) => vue.unref(selectPage)(vue.unref(jumpTo)), ["enter"]))
              }, null, 34), [
                [vue.vModelText, vue.unref(jumpTo)]
              ]),
              vue.createElementVNode("span", {
                class: vue.normalizeClass({
                  [vue.unref(styles).pages]: true
                })
              }, "/ " + vue.toDisplayString(vue.unref(totalPages)), 3),
              vue.createElementVNode("span", {
                class: vue.normalizeClass({
                  [vue.unref(styles).jumpBtn]: true
                }),
                onClick: _cache[6] || (_cache[6] = ($event) => vue.unref(selectPage)(vue.unref(jumpTo)))
              }, " \u8DF3\u9875 ", 2)
            ], 2)) : vue.createCommentVNode("", true)
          ], 2)
        ], 2);
      };
    }
  });
  exports2.Pagination = _sfc_main;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
