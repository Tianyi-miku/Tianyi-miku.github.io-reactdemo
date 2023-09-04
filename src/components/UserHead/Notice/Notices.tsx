/*
 * @Description:
 * @Author: zhangyuru
 * @Date: 2023-03-14 18:01:15
 * @LastEditors: zhangyuru
 * @LastEditTime: 2023-04-20 11:06:50
 * @FilePath: \05-simulation_training_React\src\components\UserHead\Notice\Notices.tsx
 */
import { useNotice } from "@/api/public";
import { setNotice } from "@/store/modules/notice";
import type { Store } from "@/store";
import { BellOutlined } from "@ant-design/icons";
import { Badge, Popover, Tabs, TabsProps } from "antd";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDidMount } from "@/hooks/period";
import "./Notices.less";

const Notice = () => {
  const dispatch = useDispatch();
  const [onGetNotice, resData] = useNotice();
  const noticeState = useSelector((s: Store) => s.notice);
  const notice = noticeState.notice;

  //已读未读
  let redMap: any;
  let noReadMap;
  if (notice.length > 0) {
    redMap = notice.filter((item: any) => item.readState);
    noReadMap = notice.filter((item: any) => !item.readState);
  }

  const didMount = useDidMount();

  useEffect(() => {
    if (!resData && didMount) {
      // onGetNotice();
    }
    if (resData) {
      dispatch(setNotice(resData.data));
    }
  }, [resData, didMount, dispatch, onGetNotice]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `未读`,
      children: redMap?.map((item: any) => {
        return (
          <div className="describe" key={item.id}>
            <span>{item.describe}</span>
            <span className="read">已读</span>
          </div>
        );
      }),
    },
    {
      key: "2",
      label: `已读`,
      children: noReadMap?.map((item: any) => {
        return (
          <div className="describe" key={item.id}>
            <span>{item.describe}</span>
          </div>
        );
      }),
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  const content = (
    <Tabs
      defaultActiveKey="1"
      items={items}
      onChange={onChange}
      className="tabs"
    />
  );

  return (
    <Popover content={content} placement="bottomRight" className="Notice">
      <Badge count={redMap?.length}>
        <BellOutlined className="badge" />
      </Badge>
    </Popover>
  );
};

export default memo(Notice);
