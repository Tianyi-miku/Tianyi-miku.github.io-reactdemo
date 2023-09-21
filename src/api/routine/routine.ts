/*
 * @Description:
 * @Author: zhangyuru
 * @Date: 2023-03-01 17:50:37
 * @LastEditors: zhangyuru
 * @LastEditTime: 2023-06-05 17:56:34
 * @FilePath: \05-simulation_training_React\src\api\login.ts
 */
import { Http } from "@/utils/axios";
import { useHttp } from "@/hooks/http";
import urls from "../urls";

export type Parameter = {
  category: string,
  defaultValue: any,
  description: string,
  displayName: string,
  displayValue: any,
  enumKVs: Array<any>,
  executor: Array<any>,
  isAdvanced: boolean,
  isBrowsable: boolean,
  isEquipment: boolean,
  isInstallation: boolean,
  isPrimaryDevice: boolean,
  isPublic: boolean,
  isReadonly: boolean,
  isSelectOnly: boolean,
  maximum: number,
  minimum: boolean,
  name: string,
  needAbilityCategory: any,
  needEquip: boolean,
  needInterfaces: any,
  needModuleCategory: string,
  needSpecificAbility: Array<any>,
  order: number,
  parameters: Array<any>,
  supportedAbility: Array<any>,
  tag: any,
  template: any,
  unit: any,
  value: any,
  valueType: string
}

type Parameters = Array<Parameter>
export function useStartTask() {
  return useHttp((data: any) => {
    return Http.Post({
      url: urls.startTask,
      data: data
    });
  });
}
