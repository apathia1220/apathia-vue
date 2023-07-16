import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, createVNode, withCtx, createBlock, inject, normalizeStyle, Fragment, renderList, toDisplayString, createCommentVNode, ref, mergeProps, createTextVNode, Transition, onMounted, onUpdated, watch, toRefs, provide, renderSlot, shallowRef } from "vue";
import { style, css, apply } from "@apathia/apathia.twind";
import { Loading } from "@apathia/apathia.loading";
import { CustomRender } from "@apathia/apathia.custom-render";
import { Checkbox } from "@apathia/apathia.checkbox";
import { Icon } from "@apathia/apathia.icon";
import { SortUp, SortDown, Minus, Plus } from "@apathia/apathia.icon-svg";
import { get } from "lodash";
import { BaseButton } from "@apathia/apathia.button";
import { useEventListener } from "@apathia/apathia.hooks";
const _sfc_main$4 = defineComponent({
  ...{
    name: "TableSorter"
  },
  __name: "TableSorter",
  props: {
    sort: {},
    prop: {}
  },
  emits: ["sort-change"],
  setup(__props, { emit }) {
    const props = __props;
    const active = computed(() => props.prop === props.sort.prop);
    function sortChange() {
      const newOrder = active.value && props.sort.order === "desc" ? "asc" : "desc";
      emit("sort-change", { prop: props.prop, order: newOrder });
    }
    const getStyles = () => ({
      arrowWrap: style`inline-block pl-px align-middle`,
      arrow: style`text-content-neutral cursor-pointer`,
      arrowIcon: style`h-3.5 w-3.5 align-middle`,
      active: style`text-content-accent`
    });
    const styles = getStyles();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", {
        class: normalizeClass(unref(styles).arrowWrap)
      }, [
        createElementVNode("span", {
          class: normalizeClass({
            [unref(styles).arrow]: true,
            [unref(styles).active]: active.value
          }),
          onClick: sortChange
        }, [
          createVNode(unref(Icon), { size: 14 }, {
            default: withCtx(() => [
              _ctx.sort.order === "asc" ? (openBlock(), createBlock(unref(SortUp), { key: 0 })) : (openBlock(), createBlock(unref(SortDown), { key: 1 }))
            ]),
            _: 1
          })
        ], 2)
      ], 2);
    };
  }
});
function toStyleObject(value) {
  if (!value) {
    return {};
  }
  if (typeof value === "string") {
    return value.split(";").reduce((acc, item) => {
      if (item) {
        const [key, val] = item.split(":");
        acc[key.trim()] = val.trim();
        return acc;
      }
      return acc;
    }, {});
  }
  return value;
}
function toRealWidth(width) {
  if (!width)
    return "";
  return typeof width === "number" || /^\d+$/.test(width) ? `${width}px` : width;
}
const _hoisted_1$2 = ["colspan"];
const _hoisted_2$2 = { key: 1 };
const _sfc_main$3 = defineComponent({
  ...{
    name: "TableHeader"
  },
  __name: "TableHeader",
  props: {
    columns: {},
    border: { type: Boolean, default: false },
    headerRowClassName: {},
    headerRowStyle: {},
    headerCellClassName: {},
    headerCellStyle: {},
    sort: { default: () => ({ sort: "id", order: "asc" }) },
    fixedHeader: { type: Boolean }
  },
  emits: ["sort-change", "check-all-change"],
  setup(__props, { emit }) {
    var _a, _b;
    const props = __props;
    const { allSelected, toggleAllSelected, indeterminate } = inject(
      "TableMultiSelected"
    );
    const handleColumnSortChange = ({
      prop,
      order
    }) => {
      emit("sort-change", {
        prop,
        order
      });
    };
    const headerRowClasses = ((_a = props.headerRowClassName) == null ? void 0 : _a.call(props)) || "";
    const headerRowStyles = (_b = props.headerRowStyle) == null ? void 0 : _b.call(props);
    const headerCols = computed(
      () => props.columns.map((column, colIndex) => {
        var _a2, _b2;
        const { width, align = "center", colSpan, fixed } = column;
        if (colSpan === 0)
          return null;
        if ("sortable" in column && column.sortable && !column.prop) {
          console.warn("[Table] \u5982\u679C\u6709\u6392\u5E8F\uFF0C\u5FC5\u987B\u5728prop\u5B57\u6BB5\u4E2D\u58F0\u660E\u6392\u5E8F\u4F7F\u7528\u7684\u5B57\u6BB5");
          return null;
        }
        const cellClassNames = ((_a2 = props.headerCellClassName) == null ? void 0 : _a2.call(props, { colIndex })) || "";
        const cellStyles = {
          ...toStyleObject((_b2 = props.headerCellStyle) == null ? void 0 : _b2.call(props, { colIndex })),
          width: toRealWidth(width),
          textAlign: align,
          zIndex: fixed && props.fixedHeader ? 30 : fixed && !props.fixedHeader ? 20 : !fixed && props.fixedHeader ? 10 : 0
        };
        return {
          ...column,
          thAttrs: {
            class: cellClassNames,
            colspan: colSpan,
            style: cellStyles
          }
        };
      }).filter((v) => v !== null)
    );
    const getStyles = () => {
      const borderRight = css`
    border-right: 1px solid rgb(0 0 0 / 12%);
  `;
      const borderLeft = css`
    border-left: 1px solid rgb(0 0 0 / 12%);
  `;
      return {
        headerWrap: style`overflow-hidden`,
        thead: style`bg-fill-light`,
        th: style`text(left content-accent) text-sm font-normal px-2 py-3 border-dashed border bg-fill-gray tracking-wider break-words box-border leading-normal ${css`
      ${apply("border-fill-gray")};
      border-width: 1px 1px 1px 0;
      border-style: solid;
      &:first-child {
        border-left-width: 1px;
      }
    `}`,
        thBordered: style`border-line-accent`,
        fixed: style`sticky`,
        fixedHeader: style`top-0`,
        fixedColumnLeft: style`left-0 ${borderRight}`,
        fixedColumnRight: style`right-0 ${borderLeft}`
      };
    };
    const styles = getStyles();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("thead", {
        class: normalizeClass(unref(styles).thead)
      }, [
        createElementVNode("tr", {
          class: normalizeClass(unref(headerRowClasses)),
          style: normalizeStyle(unref(headerRowStyles))
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(headerCols.value, (col, index) => {
            return openBlock(), createElementBlock("th", {
              key: index,
              class: normalizeClass({
                [unref(styles).th]: true,
                [unref(styles).fixed]: _ctx.fixedHeader || (col == null ? void 0 : col.fixed),
                [unref(styles).fixedHeader]: _ctx.fixedHeader,
                [unref(styles).fixedColumnLeft]: (col == null ? void 0 : col.fixed) === "left",
                [unref(styles).fixedColumnRight]: (col == null ? void 0 : col.fixed) === "right",
                [unref(styles).thBordered]: _ctx.border,
                [col == null ? void 0 : col.thAttrs.class]: true
              }),
              colspan: col == null ? void 0 : col.thAttrs.colspan,
              style: normalizeStyle(col == null ? void 0 : col.thAttrs.style),
              scope: "col"
            }, [
              (col == null ? void 0 : col.type) === "selection" ? (openBlock(), createBlock(unref(Checkbox), {
                key: 0,
                "model-value": unref(allSelected),
                indeterminate: unref(indeterminate),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(toggleAllSelected)())
              }, null, 8, ["model-value", "indeterminate"])) : (col == null ? void 0 : col.title) ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                typeof col.title === "function" ? (openBlock(), createBlock(unref(CustomRender), {
                  key: 0,
                  render: col.title
                }, null, 8, ["render"])) : (openBlock(), createElementBlock("span", _hoisted_2$2, toDisplayString(col.title), 1))
              ], 64)) : createCommentVNode("", true),
              (col == null ? void 0 : col.sortable) ? (openBlock(), createBlock(_sfc_main$4, {
                key: 2,
                sort: _ctx.sort,
                prop: (col == null ? void 0 : col.prop) || "",
                onSortChange: handleColumnSortChange
              }, null, 8, ["sort", "prop"])) : createCommentVNode("", true)
            ], 14, _hoisted_1$2);
          }), 128))
        ], 6)
      ], 2);
    };
  }
});
const _hoisted_1$1 = { key: 0 };
const _hoisted_2$1 = { key: 1 };
const _hoisted_3$1 = { key: 0 };
const _hoisted_4$1 = ["colspan"];
const _sfc_main$2 = defineComponent({
  ...{
    name: "TableRow"
  },
  __name: "TableRow",
  props: {
    columns: {},
    row: {},
    border: { type: Boolean, default: false },
    stripe: { type: Boolean },
    rowClassName: {},
    rowStyle: {},
    cellClassName: {},
    cellStyle: {},
    cellSpan: { type: Function, default: () => [1, 1] },
    highlightCurrentRow: { type: Boolean },
    rowKey: { default: "id" },
    rowIndex: { default: 0 },
    currentActiveRow: { default: 0 },
    expand: { default: () => ({}) }
  },
  emits: ["row-click"],
  setup(__props, { emit }) {
    var _a, _b;
    const props = __props;
    const rowClasses = ((_a = props.rowClassName) == null ? void 0 : _a.call(props, { row: props.row, rowIndex: props.rowIndex })) || "";
    const rowStyles = ((_b = props.rowStyle) == null ? void 0 : _b.call(props, { row: props.row, rowIndex: props.rowIndex })) || "";
    const { selectedMap } = inject("TableMultiSelected");
    const isRowActiveStyle = computed(
      () => props.highlightCurrentRow && props.currentActiveRow === props.rowIndex
    );
    const expandable = computed(
      () => {
        var _a2, _b2;
        return typeof props.expand.expandRowRender === "function" && !!((_b2 = (_a2 = props.expand).rowExpandable) == null ? void 0 : _b2.call(_a2, {
          row: props.row,
          rowIndex: props.rowIndex
        }));
      }
    );
    const expandActive = ref(false);
    const toggleExpand = () => {
      expandActive.value = !expandActive.value;
    };
    let cancelClick = false;
    const clickRow = (e, rowIndex) => {
      if (cancelClick)
        return;
      emit("row-click", e, rowIndex, props.row);
    };
    const handleRowMouseUp = (e) => {
      const selection = window.getSelection();
      if (selection && selection.type === "Range" && selection.focusNode && selection.anchorNode && selection.anchorNode.nodeType !== Node.ELEMENT_NODE && selection.anchorNode.nodeType === selection.focusNode.nodeType) {
        cancelClick = true;
        e.stopPropagation();
      } else {
        cancelClick = false;
      }
    };
    const cols = computed(
      () => props.columns.map((col, colIndex) => {
        var _a2, _b2, _c;
        const [rowSpan, colSpan] = (_a2 = props.cellSpan) == null ? void 0 : _a2.call(props, {
          row: props.row,
          col,
          rowIndex: props.rowIndex,
          colIndex
        });
        if (colSpan === 0 || rowSpan === 0) {
          return null;
        }
        const cellClassName = ((_b2 = props.cellClassName) == null ? void 0 : _b2.call(props, {
          row: props.row,
          col,
          rowIndex: props.rowIndex,
          colIndex
        })) || "";
        const cellStyles = {
          ...toStyleObject(
            (_c = props.cellStyle) == null ? void 0 : _c.call(props, {
              row: props.row,
              col,
              rowIndex: props.rowIndex,
              colIndex
            })
          ),
          textAlign: col.align || "center",
          width: toRealWidth(col.width)
        };
        const tdAttrs = {
          style: cellStyles
        };
        if (colSpan !== 1)
          tdAttrs.colSpan = colSpan;
        if (rowSpan !== 1)
          tdAttrs.rowSpan = rowSpan;
        const tdClasses = {
          [styles.cell]: true,
          [styles.bordered]: props.border,
          [styles.fixedColumnLeft]: col.fixed === "left",
          [styles.fixedColumnRight]: col.fixed === "right",
          [styles.activeRow]: isRowActiveStyle.value,
          [styles.stripedRow]: props.stripe && props.rowIndex % 2 === 1,
          [styles.whiteRow]: !(isRowActiveStyle.value || props.stripe && props.rowIndex % 2 === 1),
          [cellClassName]: true
        };
        return {
          ...col,
          tdClasses,
          tdAttrs
        };
      }).filter(Boolean)
    );
    const classNames2props = (str) => {
      if (!str) {
        return {
          primary: true
        };
      }
      return str.split(" ").filter((v) => !!v).reduce((acc, v) => {
        acc[v] = true;
        return acc;
      }, {});
    };
    const getStyles = () => {
      const borderRight = css`
    border-right: 1px solid rgb(0 0 0 / 12%);
  `;
      const borderLeft = css`
    border-left: 1px solid rgb(0 0 0 / 12%);
  `;
      return {
        row: style`hover:(bg-fill-light) transition`,
        cell: style`px-2 py-3 border(b solid line-accent) break-words text-sm`,
        fixedColumnLeft: style`sticky z-20 left-0 ${borderRight}`,
        fixedColumnRight: style`sticky z-20 right-0 ${borderLeft}`,
        bordered: style`border(r solid line-accent)`,
        stripedRow: style`bg-fill-light`,
        activeRow: style`bg-brand-hover`,
        whiteRow: style`bg-fill-white`,
        cellBtnsWrap: style`inline-flex flex-wrap ${css`
      --gap: 0.25rem;
      --column-gap: var(--gap);
      --row-gap: var(--gap);
      margin: calc(var(--row-gap) / -2) calc(var(--column-gap) / -2);
      & > * {
        margin: calc(var(--row-gap) / 2) calc(var(--column-gap) / 2);
      }
    `}`,
        fadeEnd: style`opacity-0`,
        fadeActive: style`transition-all duration-100`
      };
    };
    const styles = getStyles();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createElementVNode("tr", {
          class: normalizeClass({
            [unref(styles).row]: true,
            [unref(rowClasses)]: true,
            [unref(styles).stripedRow]: _ctx.stripe && _ctx.rowIndex % 2 === 1
          }),
          style: normalizeStyle(unref(rowStyles)),
          onClick: _cache[0] || (_cache[0] = ($event) => clickRow($event, _ctx.rowIndex)),
          "on:mouseUp": handleRowMouseUp
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(cols.value, (col, colIndex) => {
            return openBlock(), createElementBlock("td", mergeProps({
              key: colIndex,
              class: col == null ? void 0 : col.tdClasses
            }, col == null ? void 0 : col.tdAttrs), [
              col && "type" in col ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                col.type === "index" ? (openBlock(), createElementBlock("span", _hoisted_1$1, toDisplayString(_ctx.rowIndex + 1), 1)) : col.type === "selection" ? (openBlock(), createBlock(unref(Checkbox), {
                  key: 1,
                  "model-value": !!unref(selectedMap)[_ctx.row[_ctx.rowKey]],
                  disabled: col.disabledWhen ? !!col.disabledWhen({ row: _ctx.row, rowIndex: _ctx.rowIndex }) : false
                }, null, 8, ["model-value", "disabled"])) : col.type === "expand" && expandable.value ? (openBlock(), createBlock(unref(Icon), {
                  key: 2,
                  onClick: toggleExpand
                }, {
                  default: withCtx(() => [
                    expandActive.value ? (openBlock(), createBlock(unref(Minus), { key: 0 })) : (openBlock(), createBlock(unref(Plus), { key: 1 }))
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ], 64)) : col && "field" in col ? (openBlock(), createElementBlock("span", _hoisted_2$1, toDisplayString(unref(get)(_ctx.row, col.field || "")), 1)) : col && "buttons" in col && col.buttons ? (openBlock(), createElementBlock("div", {
                key: 2,
                class: normalizeClass(unref(styles).cellBtnsWrap)
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(col.buttons({
                  row: _ctx.row,
                  rowIndex: _ctx.rowIndex,
                  colIndex
                }), (button, buttonIndex) => {
                  return openBlock(), createBlock(unref(BaseButton), mergeProps({
                    key: buttonIndex,
                    small: ""
                  }, classNames2props(button.className), {
                    onClick: ($event) => button.onClick({
                      row: _ctx.row,
                      rowIndex: _ctx.rowIndex,
                      colIndex
                    })
                  }), {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(button.text), 1)
                    ]),
                    _: 2
                  }, 1040, ["onClick"]);
                }), 128))
              ], 2)) : col && "render" in col ? (openBlock(), createBlock(unref(CustomRender), {
                key: 3,
                render: col.render,
                row: _ctx.row,
                "col-index": colIndex,
                "row-index": _ctx.rowIndex
              }, null, 8, ["render", "row", "col-index", "row-index"])) : createCommentVNode("", true)
            ], 16);
          }), 128))
        ], 38),
        createVNode(Transition, {
          "enter-from-class": unref(styles).fadeEnd,
          "enter-active-class": unref(styles).fadeActive,
          "leave-active-class": unref(styles).fadeActive,
          "leave-to-class": unref(styles).fadeEnd
        }, {
          default: withCtx(() => [
            expandable.value && expandActive.value ? (openBlock(), createElementBlock("tr", _hoisted_3$1, [
              createElementVNode("td", {
                colspan: _ctx.columns.length
              }, [
                createVNode(unref(CustomRender), {
                  render: _ctx.expand.expandRowRender,
                  row: _ctx.row,
                  "row-index": _ctx.rowIndex
                }, null, 8, ["render", "row", "row-index"])
              ], 8, _hoisted_4$1)
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["enter-from-class", "enter-active-class", "leave-active-class", "leave-to-class"])
      ], 64);
    };
  }
});
const _sfc_main$1 = defineComponent({
  ...{
    name: "TableBody",
    inheritAttrs: false
  },
  __name: "TableBody",
  props: {
    columns: {},
    data: {},
    current: { default: -1 },
    highlightCurrentRow: { type: Boolean },
    rowKey: { default: "id" }
  },
  emits: ["current-change"],
  setup(__props, { emit }) {
    const props = __props;
    const currentRowIndex = computed({
      get: () => {
        return props.data.findIndex((i) => i[props.rowKey] === props.current);
      },
      set: (rowIndex) => {
        emit("current-change", props.data[rowIndex]);
      }
    });
    const { selectedMap, toggleItem, shiftToggle } = inject(
      "TableMultiSelected"
    );
    const multiSelected = computed(
      () => props.columns.findIndex((col) => "type" in col && col.type === "selection") > -1
    );
    const shiftIndex = ref(-1);
    const normalIndex = ref(-1);
    const clickRow = (e, rowIndex, row) => {
      currentRowIndex.value = rowIndex;
      if (!multiSelected.value) {
        return;
      }
      if (e.shiftKey) {
        shiftIndex.value = rowIndex;
        if (normalIndex.value === shiftIndex.value) {
          toggleItem(row);
          normalIndex.value = rowIndex;
          return;
        }
        let range = [];
        if (normalIndex.value < shiftIndex.value) {
          const start = props.data.slice(normalIndex.value, shiftIndex.value + 1).findIndex((item) => !!selectedMap.value[`${item[props.rowKey]}`]) + normalIndex.value;
          range = props.data.slice(start, shiftIndex.value + 1);
        } else if (normalIndex.value > shiftIndex.value) {
          const start = selectedMap.value[`${row[`${props.rowKey}`]}`] ? shiftIndex.value + 1 : shiftIndex.value;
          range = props.data.slice(start, normalIndex.value + 1);
        }
        shiftToggle(range);
      } else {
        toggleItem(row);
      }
      normalIndex.value = rowIndex;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("tbody", null, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.data, (row, rowIndex) => {
          return openBlock(), createBlock(_sfc_main$2, mergeProps(_ctx.$attrs, {
            key: row[_ctx.rowKey],
            row,
            "row-key": _ctx.rowKey,
            columns: _ctx.columns,
            "highlight-current-row": _ctx.highlightCurrentRow,
            "row-index": rowIndex,
            "current-active-row": currentRowIndex.value,
            onRowClick: clickRow
          }), null, 16, ["row", "row-key", "columns", "highlight-current-row", "row-index", "current-active-row"]);
        }), 128))
      ]);
    };
  }
});
function useTableColumns(props) {
  const tableWidth = ref(0);
  const containerRef = ref(null);
  const updateTableWidth = () => {
    var _a;
    tableWidth.value = ((_a = containerRef.value) === null || _a === void 0 ? void 0 : _a.offsetWidth) || 0;
  };
  useEventListener("resize", updateTableWidth);
  onMounted(updateTableWidth);
  onUpdated(updateTableWidth);
  const realColumns = ref([]);
  const resolveColumns = () => {
    const unsureColumnCount = props.columns.filter((col) => col.width === void 0).length;
    const definedColumnTotalWidth = props.columns.reduce((acc, col) => col.width !== void 0 ? acc + parseInt(col.width + "", 10) : acc, 0);
    const noCalcWidth = unsureColumnCount === props.columns.length;
    const columnWidth = (tableWidth.value - definedColumnTotalWidth) / unsureColumnCount;
    realColumns.value = props.columns.filter((col) => col.when ? col.when() : true).map((col) => {
      col.align = col.align || "center";
      return col.width || noCalcWidth ? col : Object.assign(Object.assign({}, col), { width: columnWidth });
    });
  };
  watch(() => tableWidth.value, resolveColumns, { flush: "post" });
  watch([
    ...props.columns.filter((col) => col.when && typeof col.when === "function").map((col) => col.when),
    () => props.columns
  ], resolveColumns, { immediate: true });
  return {
    realColumns,
    containerRef
  };
}
function useTableSelected(data, selectedKeys, selected, key, columns, emit) {
  const disabledKeyMap = computed(() => {
    const [selectionColumn] = columns.value.filter((col) => "type" in col && col.type === "selection");
    if (!selectionColumn || !("disabledWhen" in selectionColumn) || typeof selectionColumn.disabledWhen !== "function")
      return {};
    return data.value.filter((item, index) => selectionColumn.disabledWhen({ row: item, rowIndex: index })).reduce((map, item) => {
      map[`${item[key.value]}`] = true;
      return map;
    }, {});
  });
  const checkableCount = computed(() => {
    return data.value.length - Object.keys(disabledKeyMap.value).length;
  });
  const selectedMap = computed({
    get: () => {
      if (selected.value && selected.value.length) {
        return selected.value.reduce((acc, cur) => {
          acc[`${cur[key.value]}`] = true;
          return acc;
        }, {});
      } else if (selectedKeys.value && selectedKeys.value.length) {
        return selectedKeys.value.reduce((acc, key2) => {
          acc[key2] = true;
          return acc;
        }, {});
      } else {
        return {};
      }
    },
    set: (checkedMap) => {
      const selectedItems = data.value.filter((item) => checkedMap[`${item[key.value]}`] && !disabledKeyMap.value[`${item[key.value]}`]);
      emit("update:selected", selectedItems);
      emit("update:selectedKeys", selectedItems.map((item) => item[key.value]));
    }
  });
  const allSelected = computed({
    get() {
      return data.value.length === 0 || checkableCount.value === 0 ? false : selected.value.length === checkableCount.value;
    },
    set(value) {
      if (value) {
        selectedMap.value = data.value.reduce((acc, item) => {
          acc[`${item[key.value]}`] = true;
          return acc;
        }, {});
      } else {
        selectedMap.value = {};
      }
    }
  });
  const toggleItem = (item) => {
    const identify = `${item[`${key.value}`]}`;
    selectedMap.value = Object.assign(Object.assign({}, selectedMap.value), { [identify]: !selectedMap.value[identify] });
  };
  const toggleAllSelected = () => {
    allSelected.value = !allSelected.value;
  };
  const shiftToggle = (range) => {
    const rangeAllChecked = range.every((i) => selectedMap.value[`${i[key.value]}`]);
    selectedMap.value = Object.assign(Object.assign({}, selectedMap.value), range.reduce((acc, cur) => {
      acc[`${cur[key.value]}`] = !rangeAllChecked;
      return acc;
    }, {}));
  };
  const indeterminate = computed(() => {
    const intersection = data.value.filter((item) => {
      return selectedMap.value[`${item[key.value]}`];
    });
    return intersection.length > 0 && !allSelected.value;
  });
  return {
    selectedMap,
    allSelected,
    indeterminate,
    toggleItem,
    toggleAllSelected,
    shiftToggle
  };
}
const _hoisted_1 = { key: 1 };
const _hoisted_2 = { style: { "height": "55px", "text-align": "center" } };
const _hoisted_3 = ["colspan"];
const _hoisted_4 = /* @__PURE__ */ createElementVNode("p", null, "\u6CA1\u6709\u6570\u636E", -1);
const _sfc_main = defineComponent({
  ...{
    name: "Table"
  },
  __name: "Table",
  props: {
    data: {},
    columns: {},
    stripe: { type: Boolean, default: false },
    border: { type: Boolean, default: false },
    headerRowClassName: {},
    headerRowStyle: {},
    headerCellClassName: {},
    headerCellStyle: {},
    rowClassName: {},
    rowStyle: {},
    cellClassName: {},
    cellStyle: {},
    cellSpan: { type: Function, default: () => [1, 1] },
    height: {},
    showHeader: { type: Boolean, default: true },
    showData: { type: Boolean, default: true },
    rowKey: { default: "key" },
    highlightCurrentRow: { type: Boolean, default: true },
    current: { default: -1 },
    currentSelected: { default: null },
    selected: { default: () => [] },
    selectedKeys: { default: () => [] },
    sort: { default: () => ({}) },
    expand: { default: () => ({}) },
    loading: { type: Boolean },
    scroll: { default: () => ({}) }
  },
  emits: ["update:selected", "update:selectedKeys", "update:current", "update:currentSelected", "sort-change"],
  setup(__props, { emit }) {
    const props = __props;
    const getStyles = () => ({
      container: style`shadow relative overflow-auto border(b line-accent)`,
      table: style`min-w-full w-full table-fixed divide-y divide-line-accent text(sm left) leading-normal rounded box-border m-0 p-0 ${css(
        { "border-collapse": "separate", "border-spacing": 0 }
      )}`
    });
    const styles = getStyles();
    const currentId = computed(
      () => props.currentSelected ? props.currentSelected[props.rowKey] : props.current
    );
    const { data, selected, selectedKeys, rowKey, columns } = toRefs(props);
    const tableMultiSelected = useTableSelected(
      data,
      selectedKeys,
      selected,
      rowKey,
      columns,
      emit
    );
    const tableStyle = computed(() => ({
      minWidth: props.scroll.width ? `${props.scroll.width}px` : "",
      minHeight: props.scroll.height ? `${props.scroll.height}px` : ""
    }));
    provide("TableMultiSelected", tableMultiSelected);
    const { containerRef, realColumns } = useTableColumns(props);
    const fixedHeader = computed(() => props.height !== 0);
    watch(
      () => props.data,
      () => {
        tableMultiSelected.selectedMap.value = {};
      }
    );
    function onCurrentChange(item) {
      emit("update:current", item[rowKey.value]);
      emit("update:currentSelected", item);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "containerRef",
        ref: containerRef,
        class: normalizeClass(unref(styles).container),
        style: normalizeStyle({
          "max-height": fixedHeader.value ? `${_ctx.height}px` : "auto"
        })
      }, [
        createElementVNode("table", mergeProps({
          class: unref(styles).table,
          style: tableStyle.value
        }, _ctx.$attrs), [
          _ctx.showHeader ? (openBlock(), createBlock(_sfc_main$3, {
            key: 0,
            columns: unref(realColumns),
            border: _ctx.border,
            "header-row-class-name": _ctx.headerRowClassName,
            "header-row-style": _ctx.headerRowStyle,
            "header-cell-class-name": _ctx.headerCellClassName,
            "header-cell-style": _ctx.headerCellStyle,
            sort: _ctx.sort,
            "fixed-header": fixedHeader.value,
            onSortChange: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("sort-change", $event))
          }, null, 8, ["columns", "border", "header-row-class-name", "header-row-style", "header-cell-class-name", "header-cell-style", "sort", "fixed-header"])) : createCommentVNode("", true),
          unref(data).length === 0 || _ctx.loading ? (openBlock(), createElementBlock("tbody", _hoisted_1, [
            createElementVNode("tr", _hoisted_2, [
              createElementVNode("td", {
                colspan: unref(realColumns).length
              }, [
                _ctx.loading ? renderSlot(_ctx.$slots, "loading", { key: 0 }, () => [
                  createVNode(unref(Loading))
                ]) : unref(data).length === 0 ? renderSlot(_ctx.$slots, "empty", { key: 1 }, () => [
                  _hoisted_4
                ]) : createCommentVNode("", true)
              ], 8, _hoisted_3)
            ])
          ])) : createCommentVNode("", true),
          unref(data).length && !_ctx.loading && _ctx.showData ? (openBlock(), createBlock(_sfc_main$1, {
            key: 2,
            columns: unref(realColumns),
            data: unref(data),
            border: _ctx.border,
            stripe: _ctx.stripe,
            "row-class-name": _ctx.rowClassName,
            "row-style": _ctx.rowStyle,
            "cell-class-name": _ctx.cellClassName,
            "cell-style": _ctx.cellStyle,
            "cell-span": _ctx.cellSpan,
            current: currentId.value,
            "highlight-current-row": _ctx.highlightCurrentRow,
            "row-key": unref(rowKey),
            expand: _ctx.expand,
            onCurrentChange
          }, null, 8, ["columns", "data", "border", "stripe", "row-class-name", "row-style", "cell-class-name", "cell-style", "cell-span", "current", "highlight-current-row", "row-key", "expand"])) : createCommentVNode("", true)
        ], 16)
      ], 6);
    };
  }
});
function createTable(cols, shallowData = false) {
  const columns = shallowRef(cols);
  const setColumns = (value) => {
    columns.value = value;
  };
  const getColmns = () => columns.value;
  const loading = ref(false);
  const data = shallowData ? shallowRef([]) : ref([]);
  const setData = (newData) => {
    if (Array.isArray(newData)) {
      data.value = newData;
    } else {
      loading.value = true;
      newData().then((value) => {
        data.value = value;
      }).catch((err) => {
        console.error(err);
      }).finally(() => {
        loading.value = false;
      });
    }
  };
  const getData = () => data.value;
  const pagination = ref({
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
    jumpPage: false,
    totalTemplate(totalItems) {
      return `\u5171 ${totalItems} \u6761\u6570\u636E`;
    }
  });
  const getPagination = () => pagination.value;
  const setPagination = (pager) => {
    pagination.value.currentPage = pager.num;
    pagination.value.totalItems = pager.total;
    pagination.value.pageSize = pager.size;
  };
  const updatePager = (pager) => {
    if (!pager) {
      setPagination({
        num: 1,
        size: 0,
        total: 0
      });
    } else if ("num" in pager) {
      setPagination(pager);
    } else {
      setPagination({
        num: pager.current_page,
        size: pager.page_size,
        total: pager.total_items
      });
    }
  };
  const getCurrentPage = () => pagination.value.currentPage;
  const showPagination = ref(true);
  const triggerPagination = (value) => {
    showPagination.value = value;
  };
  const showData = ref(true);
  const triggerData = (value) => {
    showData.value = value;
  };
  const showHeader = ref(true);
  const triggerHeader = (value) => {
    showHeader.value = value;
  };
  const tableOptions = computed(() => ({
    data: unref(data),
    loading: unref(loading),
    columns: unref(columns),
    pagination: unref(pagination),
    showPagination: unref(showPagination),
    showData: unref(showData),
    showHeader: unref(showHeader)
  }));
  const tools = {
    setColumns,
    getColmns,
    setData,
    getData,
    getPagination,
    setPagination,
    updatePager,
    getCurrentPage,
    triggerPagination,
    triggerData,
    triggerHeader
  };
  return [tableOptions, tools];
}
export { _sfc_main as Table, createTable };
