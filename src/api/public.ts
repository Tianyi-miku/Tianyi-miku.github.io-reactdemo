
import { Http } from "@/utils/axios";
import urls from "./urls/index";

// 查询全部字典数据
export function getDictsHttp() {
  return Http.Get({
    url: urls.dic.dict,
  });
}