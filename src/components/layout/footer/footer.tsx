import { useState, useMemo, useContext } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Icon from "@/components/Icon/Icon";
import withRouter, { WithRouterProps } from "@/hooks/withRouter";
import { controlCtx, ControlCtx } from "@/pages/indexHoc";
import { checkImgPrefix, openPage } from "@/utils/utils";
import { useSelector } from "react-redux";
import { Store } from "@/store";
import "./footer.less";
import { cloneDeep } from "lodash";
import images from "@/assets/images";

const FooterApp = (props: WithRouterProps) => {
  // 从用户信息中获取菜单权限
  // const menuVos = useSelector((s: Store) => s.menu.menuVos);
  // function filterMenuVos(list: any[], hideIcon: boolean = false) {
  //   return list.map((item: any) => {
  //     let { name, path, children, meta } = item;
  //     const result: any = { label: name, key: path, title: name };
  //     // 系统管理不用添加子菜单
  //     if (children?.length && !item.path.includes("system")) {
  //       result.children = filterMenuVos(children, true); // 子节点递归不显示icon
  //     }

  //     if (!hideIcon) {
  //       result.icon = (
  //         <span>
  //           <img src={checkImgPrefix(meta?.icon)} alt="icon" />
  //         </span>
  //       );
  //     }
  //     return result;
  //   });
  // }

  // //去掉空的children，删除子菜单type为3的
  // function filChildren(list: any[], parent?: any) {
  //   if (list && list.length > 0) {
  //     list = list.filter((item: any) => item?.type !== 3)

  //     for (let index = 0; index < list.length; index++) {
  //       let element = list[index];
  //       if (element?.children) {
  //         element.children = filChildren(element?.children, element)
  //       }
  //     }
  //   }
  //   if (list && list.length === 0 && parent) {
  //     delete parent.children
  //   }
  //   return list
  // }

  // const menu = cloneDeep(menuVos)
  // let items
  // if (menu.length > 0) {
  //   const i = filChildren(menu)
  //   items = filterMenuVos(i);
  // }

  // let items
  const items: MenuProps["items"] = [
    {
      label: "首页",
      key: "/home",
      icon: (
        <span>
          <img src={images.appList} alt="" />
        </span>
      ),
    },
    {
      label: "常规监测",
      key: "/routine",
      icon: (
        <span>
          <img src={images.examTest} alt="" />
        </span>
      ),
    },
    {
      label: "监测覆盖率",
      key: "/coverageRate",
      icon: (
        <span>
          <img src={images.misControl} alt="" />
        </span>
      ),
    },
    {
      label: "设备详情",
      key: "/deviceDetails",
      icon: (
        <span>
          <img src={images.resultManage} alt="" />
        </span>
      ),
    },
    {
      label: "系统管理",
      key: "/system",
      icon: (
        <span>
          <img src={images.systemManage} alt="" />
        </span>
      ),
    },
  ];


  const ctx: ControlCtx = useContext(controlCtx);
  const { state, dispatch } = ctx;
  const [current, setCurrent] = useState(props.location.pathname);

  const onClick: MenuProps["onClick"] = (item) => {
    setCurrent(item.key);
    if (item.key === "/system") {
      openPage(item.key);
    } else props.navigate(item.key);
  };

  function setFooter(height: number) {
    dispatch?.setFooterHeight(height);
  }

  const isShow = useMemo(() => {
    return state?.footerHeight === 234;
  }, [state]);

  return (
    <>
      <div className="footer" style={{ height: isShow ? "120px" : "0px" }}>
        <Menu
          theme="dark"
          className={isShow ? "show" : "hide"}
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </div>
      <div className="spread-btn" onClick={() => setFooter(isShow ? 144 : 234)}>
        <Icon icon={isShow ? "jiantouxia" : "jiantoushang"} />
      </div>
    </>
  );
};

export default withRouter(FooterApp);
