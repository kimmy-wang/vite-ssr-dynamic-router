import request from "@/utils/request";

// 后端的结构体定义
export type RouteItem = {
  id: number | string;
  parentId: number | string;
  name: string;
  path: string;
  redirect: string;
  component: string;
  meta: {
    title: string | false;
    icon?: string;
    target?: "_blank" | "_self";
    hideInMenu?: boolean;
    hideChildrenInMenu?: boolean;
    authority?: string | string[];
    [key: string]: any;
  };
};

export async function getCurrentUserNav() {
  return request.get<any, RouteItem[]>("/currentUserNav");
}
