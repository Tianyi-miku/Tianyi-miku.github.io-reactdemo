/*
 * @Description:table组件相关的hook 和AntTable组件搭配使用
 * @Author: zhangyuru
 * @Date: 2023-03-07 16:53:09
 * @LastEditors: zhangyuru
 * @LastEditTime: 2023-08-21 15:43:17
 * @FilePath: \05-simulation_training_React\src\hooks\table.ts
 */
// import TablePage from "@/components/TablePage/TablePage";
import { cloneDeep, isEqual } from "lodash";
import React, { useCallback, useEffect, useState, useMemo } from "react";

/**
 * @description: table表格 增删改查公用逻辑
 * 调用此函数 会得到以下数据:
 * + datas: 一组(响应式)数据的对象 其中包含了以下数据
 *    tableData       列表数据
 *    record          当前选中行
 *    pageState       分页相关数据
 *    loading         表格加载中
 *    isEdit          是否编辑
 *    showEdit        是否打开编辑/新增弹窗 --- 也可动态搭配对应的事件使用，不局限于打开编辑……
 *    showDetails     是否打开详情弹窗 --- 也可动态搭配对应的事件使用，同上……
 *    showDelete      是否打开删除弹窗 --- 也可动态搭配对应的事件使用
 *    showRead        是否打开阅卷弹窗 --- 也可动态搭配对应的事件使用
 *    showConfig      是否打开配置弹窗 --- 也可动态搭配对应的事件使用
 *    saveLoading     保存按钮loading
 *    didMount        初次渲染时(模拟生命周期)
 * + actions: 一组改变上面响应式数据的回调函数
 *    setTableData    设置列表数据
 *    setRecord       切换当前选中项
 *    setPageState    切换分页
 *    setLoading      切换loading状态
 *    setShowEdit     切换编辑弹窗显示状态
 *    setIsEdit       切换是否编辑状态
 *    setShowDetails  切换详情弹窗显示状态
 *    setShowDelete   切换删除弹窗显示状态
 *    setShowConfig   切换config配置显示状态
 *    setSearchParams 设置列表查询参数
 *    saveLoading     切换保存按钮loading状态
 *    useGetTableData 查询表格数据 一个柯里化函数
 *    onAdd           点击【添加】按钮执行的公共逻辑
 *    onEdit          点击【编辑】按钮执行的公共逻辑
 *    onDelete        点击【删除】按钮执行的公共逻辑
 *    onDetails       点击【查看/详情】按钮执行的公共逻辑
 *    onRead          点击【阅卷/阅读】按钮执行的公共逻辑
 *    onConfig        点击【配置】按钮执行的公共逻辑
 * + callbacks: 操作列表时的一些回调函数集合
 *    onChangePage    分页切换时会主动调用此函数,函数中主动setPageState
 *    onClickRow      单击行时会主动调用此函数,函数中主动setRecord
 *    onDoubleClick   双击行时会主动调用此函数,函数中主动setRecord
 *  以上几乎满足此项目大多数交互场景 放心食用
 *  record 列表行 同时也是tableData的数据类型
 *  ... 目前只有 any
 * @return { TableOptions }
 * @param initOptions
 */
export const useTable = <T>(
  initOptions: {
    pageState?: {
      pageNum: number;
      pageSize: number;
      total?: number;
    };
  } = {}
): TableOptions => {
  const defaultPages = useMemo(() => {
    return (
      initOptions?.pageState || {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      }
    );
  }, [initOptions]);

  const [tableData, setTableData] = useState<any[]>([]);
  const [record, setRecord] = useState<any>(null);
  const [pageState, setPageState] = useState(defaultPages);
  const [loading, setLoading] = useState<boolean>(false);

  const callbacks = {
    onChangePage(newPageNum: number, newPageSize: number) {
      const { pageNum, pageSize, total } = pageState;
      if (newPageNum !== pageNum || newPageSize !== pageSize) {
        setPageState({
          pageNum: newPageNum,
          pageSize: newPageSize,
          total: total,
        });
      }
    },
    onClickRow(newRecord: any, e: React.ReactElement) {
      if (!isEqual(newRecord, record)) {
        setRecord(cloneDeep(newRecord));
      }
    },
    onDoubleClick(newRecord: any, e: React.ReactElement) {
      if (!isEqual(newRecord, record)) {
        setRecord(cloneDeep(newRecord));
      }
    },
  };
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showRead, setShowRead] = useState<boolean>(false);
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<object>({});
  const [didMount, setDidMount] = useState<boolean>(true);

  /*
    一个 自动收集请求参数 以及 预处理响应数据 的请求函数
    ---------------------------
    + searchFunc是一个执行请求的函数，这里会自动收集page等请求参数，再帮你把收集好的参数传递给searchFunc，发送请求。
    + disposeData是处理响应数据的函数，例如(res)=> res?.data?.name 非必传
    ---------------------------
    + 返回一个函数，返回的函数接收两个参数
      values      查询参数
      resetPage   是否需要重置pege（场景举例：假如在停用状态下的第二页切换到启用状态，此时需要重置page，否则查询的是启用状态第二页 同时页码显示的是1，这样数据就错乱了。）
    ---------------------------
    + 食用方式
      + 创建请求函数
      const getXxx = useGetTableData(searchFunc)
      + 调用请求函数
      getXxx(values,resetPage)
  */
  const useGetTableData = useCallback(
    (
      searchFunc: Function, // 请求函数
      disposeData?: Function // 返回值处理函数
    ): ((value: any, resetPage?: boolean) => void) => {
      return (values: any = {}, resetPage: boolean = false) => {
        // 处理请求数据
        if (!values?.pageNum && !values?.pageSize) {
          setSearchParams({ ...searchParams, ...values });
        }
        let pages = resetPage ? defaultPages : pageState;
        const data = { ...pages, ...searchParams, ...values };
        if (data.total != null) delete data.total;

        // 发请求
        if (!loading) setLoading(true);
        searchFunc(data, async (resData: any) => {
          setLoading(false);
          // 处理响应数据
          if (disposeData) {
            resData = (await disposeData(resData)) || {};
          }
          if (resData?.records) {
            const { records, total } = resData;
            setTableData(records);
            if (pageState.total !== total) {
              setPageState({
                ...(resetPage ? defaultPages : pageState),
                total,
              });
            }
          }
        });
      };
    },
    [pageState, searchParams, defaultPages, loading]
  );

  const onAdd = () => {
    setIsEdit(false);
    setRecord(null);
    setShowEdit(true);
    console.log("点击添加");
  };

  const onEdit = (record: any) => {
    setRecord(cloneDeep(record));
    setIsEdit(true);
    setShowEdit(true);
    console.log("点击编辑", record);
  };

  const onDelete = (record: any) => {
    setRecord(record);
    setShowDelete(true);
    console.log("点击删除", record);
  };

  const onDetails = (record: any) => {
    setRecord(record);
    setShowDetails(true);
    console.log("点击详情", record);
  };

  const onRead = (record: any) => {
    setRecord(record);
    setShowRead(true);
    console.log("点击阅读", record);
  };

  const onConfig = (record: any) => {
    setRecord(cloneDeep(record));
    setShowConfig(true);
    console.log("点击配置", record);
  };

  useEffect(() => {
    if (didMount) setDidMount(false);
  }, [didMount]);

  return {
    datas: {
      tableData,
      record,
      pageState,
      loading,
      isEdit,
      showEdit,
      showDetails,
      showDelete,
      showRead,
      showConfig,
      saveLoading,
      didMount,
    },
    actions: {
      setTableData: (value: any) => {
        // ... 在改变数据前 可做一些统一的数据拦截
        setTableData(value);
      },
      setRecord,
      setPageState,
      setLoading,
      setShowEdit,
      setIsEdit,
      setShowDetails,
      setShowDelete,
      setSaveLoading,
      useGetTableData,
      onAdd,
      onEdit,
      onDelete,
      onDetails,
      onRead,
      onConfig,
      setShowConfig,
      setSearchParams,
    },
    callbacks,
  } as TableOptions;
};

export type TableDatas = {
  tableData: any[];
  record: any;
  pageState: {
    pageNum: number;
    pageSize: number;
    total: number;
  };
  loading: boolean;
  isEdit: boolean;
  showEdit: boolean;
  showDetails: boolean;
  showDelete: boolean;
  showRead: boolean;
  showConfig: boolean;
  saveLoading: boolean;
  didMount: boolean;
};

export type TableActions = {
  setTableData: Function;
  setRecord: Function;
  setPageState: Function;
  setLoading: Function;
  setShowEdit: Function;
  setIsEdit: Function;
  setShowDetails: Function;
  setShowDelete: Function;
  setSaveLoading: Function;
  useGetTableData: (
    searchFunc: Function,
    disposeData?: Function
  ) => (value?: any, resetPage?: boolean) => void;
  onAdd: Function;
  onEdit: Function;
  onDelete: Function;
  onDetails: Function;
  onRead: Function;
  onConfig: Function;
  setShowConfig: Function;
  setSearchParams: Function;
};

export type TableCallbacks = {
  onChangePage: Function;
  onClickRow: Function;
  onDoubleClick: Function;
};

export type TableOptions = {
  datas: TableDatas;
  actions: TableActions;
  callbacks: TableCallbacks;
};
