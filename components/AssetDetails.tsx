
import React from 'react';
import { Asset } from '../types';
import { 
  Building2, 
  MapPin, 
  Ruler, 
  User, 
  Phone, 
  ShieldCheck, 
  TrendingDown, 
  Navigation,
  Info,
  Calendar
} from 'lucide-react';

interface AssetDetailsProps {
  asset: Asset | null;
}

const AssetDetails: React.FC<AssetDetailsProps> = ({ asset }) => {
  if (!asset) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center text-gray-400 bg-white">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Info className="w-10 h-10 text-gray-300" />
        </div>
        <h3 className="text-lg font-bold text-gray-600 mb-2">欢迎查阅</h3>
        <p className="text-sm">请点击地图上的标记或在左侧搜索列表中选择资产，以查看详细的项目信息情况。</p>
      </div>
    );
  }

  const vacancyColorClass = asset.空置程度标签 === '高' ? 'text-red-600 bg-red-50 border-red-100' :
                           asset.空置程度标签 === '中' ? 'text-yellow-600 bg-yellow-50 border-yellow-100' :
                           'text-green-600 bg-green-50 border-green-100';

  return (
    <div className="flex-1 overflow-y-auto flex flex-col bg-white">
      {/* Detail Header */}
      <div className="p-6 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="flex justify-between items-start mb-4">
          <span className="px-2 py-1 bg-white/20 rounded text-[10px] font-bold uppercase tracking-widest">序号: {asset.序号}</span>
          <span className={`px-2 py-1 rounded text-[10px] font-bold border ${vacancyColorClass.replace('bg-', 'bg-white/90 bg-')}`}>
            {asset.空置程度标签}空置率
          </span>
        </div>
        <h2 className="text-2xl font-black mb-2 leading-tight">{asset.资产名称}</h2>
        <div className="flex items-center gap-2 text-blue-200 text-xs">
          <Building2 className="w-3.5 h-3.5" />
          <span>{asset.资产类别}</span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 border-b border-gray-100 bg-gray-50/50">
        <div className="p-4 border-r border-gray-100 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] text-gray-400 uppercase font-bold mb-1">经营性面积</span>
          <span className="text-lg font-bold text-blue-900">
            {asset["经营性总面积（平）"] || asset["资产总面积（平）"] || asset["经营性面积（平）"] || 0}
            <span className="text-xs ml-1 font-normal text-gray-500">㎡</span>
          </span>
        </div>
        <div className="p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] text-gray-400 uppercase font-bold mb-1">空置率</span>
          <span className="text-lg font-bold text-blue-900">
            {asset["空置率（%）"]}%
          </span>
        </div>
      </div>

      {/* Details Sections */}
      <div className="p-6 space-y-8">
        {/* Basic Info */}
        <section>
          <h4 className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-4 border-b pb-2 border-gray-100">
            <MapPin className="w-3.5 h-3.5" /> 基本位置
          </h4>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600 h-fit"><Navigation className="w-4 h-4" /></div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">地址信息</p>
                <p className="text-sm font-medium text-gray-800">{asset.地址}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600 h-fit"><TrendingDown className="w-4 h-4" /></div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">附近道路</p>
                <p className="text-sm font-medium text-gray-800 leading-relaxed">{asset.附近道路}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Landmarks Section */}
        <section className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <h4 className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
             周边标志性建筑
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {asset.周边标志性建筑}
          </p>
        </section>

        {/* Pricing & Management */}
        <section>
          <h4 className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-4 border-b pb-2 border-gray-100">
            <TrendingDown className="w-3.5 h-3.5" /> 价格与运营
          </h4>
          <div className="grid grid-cols-1 gap-4">
             <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                <span className="text-xs text-gray-500">租金价格 (元/平·月)</span>
                <span className="text-sm font-bold text-blue-600">{asset["租金价格（元/平·月）"]}</span>
             </div>
             <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                <span className="text-xs text-gray-500">物业费 (元)</span>
                <span className="text-sm font-bold text-gray-800">{asset["物业费（元）"]}</span>
             </div>
          </div>
        </section>

        {/* Contacts */}
        <section>
          <h4 className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-4 border-b pb-2 border-gray-100">
            <User className="w-3.5 h-3.5" /> 负责人与团队
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">招</div>
                <div className="text-xs">
                   <p className="text-gray-400">招商负责人</p>
                   <p className="font-bold text-gray-700">{asset.招商负责人.replace(/\d+$/, '')}</p>
                </div>
              </div>
              <a href={`tel:${asset.招商负责人.match(/\d+/)?.[0]}`} className="p-2 bg-gray-100 rounded-full hover:bg-green-100 hover:text-green-600 transition-colors">
                <Phone className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-xs font-bold">运</div>
                <div className="text-xs">
                   <p className="text-gray-400">运营负责人</p>
                   <p className="font-bold text-gray-700">{asset.运营负责人.replace(/\d+$/, '')}</p>
                </div>
              </div>
              {asset.运营负责人 !== '/' && (
                <a href={`tel:${asset.运营负责人.match(/\d+/)?.[0]}`} className="p-2 bg-gray-100 rounded-full hover:bg-green-100 hover:text-green-600 transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Management Unit */}
        <section className="pb-10">
          <h4 className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-4 border-b pb-2 border-gray-100">
            <ShieldCheck className="w-3.5 h-3.5" /> 物业管理单位
          </h4>
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-3">
            <div className="p-1.5 bg-blue-600 text-white rounded-lg mt-0.5"><Building2 className="w-4 h-4" /></div>
            <div>
              <p className="text-sm font-bold text-blue-900">{asset.物业管理单位}</p>
              <p className="text-[10px] text-blue-500 font-medium uppercase mt-1">负责本资产的日常维护及安保</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AssetDetails;
