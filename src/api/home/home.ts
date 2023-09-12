import { useHttp } from "@/hooks/http";
import urls from "../urls";
import { Http } from "@/utils/axios";

// 获取站点
export function useGetstations() {
  return useHttp((params: any) => {
    return Http.Get({
      url: urls.stations,
      data: params,
    });
  });
}