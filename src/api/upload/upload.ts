import { useHttp } from "@/hooks/http";
import { Http } from "@/utils/axios";

export type UploadPropsTyle = {
  action: string,
  data?: any | undefined,
  multiple?: boolean | undefined,
  filleName?: string | undefined,
}

// 上传，不需要处理返回值
export function uploadApi(url: string, data: any) {
  return Http.Post({
    url: url || 'upload',
    data: data,
    responseType: "blob",
    headers: {
      "Content-Type": false,
    }
  });
}
