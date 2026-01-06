
export interface Asset {
  "序号": number;
  "资产名称": string;
  "资产类别": string;
  "地址": string;
  "geometry": string;
  "附近道路": string;
  "周边标志性建筑": string;
  "经营性总面积（平）"?: number;
  "资产总面积（平）"?: number;
  "经营性面积（平）"?: number;
  "空置面积（平）": number;
  "空置率（%）": number;
  "空置程度标签": string;
  "租金价格（元/平·月）": string;
  "物业费（元）": string | number;
  "招商负责人": string;
  "运营负责人": string;
  "物业管理单位": string;
}

export enum VacancyLevel {
  HIGH = '高',
  MEDIUM = '中',
  LOW = '低',
  NONE = '无'
}
