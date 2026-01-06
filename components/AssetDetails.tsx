
import React from 'react';
import { Asset } from '../types';
import { 
  Building2, 
  MapPin, 
  User, 
  Phone, 
  ShieldCheck, 
  TrendingDown, 
  Navigation,
  Info
} from 'lucide-react';

interface AssetDetailsProps {
  asset: Asset | null;
}

const AssetDetails: React.FC<AssetDetailsProps> = ({ asset }) => {
  if (!asset) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center text-gray-400 bg-white">
        <div className="w-20 h-20 bg-violet-50 rounded-full flex items-center justify-center mb-6">
          <Info className="w-10 h-10 text-violet-200" />
        </div>
        <h3 className="text-lg font-bold text-gray-600 mb-2">欢迎查阅</h3>
        <p className="text-sm">请点击地图标记或列表项查阅资产详情</p>
      </div>
    );
  }

  const vacancyColorClass = asset.空置程度标签 === '高' ? 'text-red-600 bg-red-50 border-red-100' :
                           asset.空置程度标签 === '中' ? 'text-yellow-600 bg-yellow-50 border-yellow-100' :
                           'text-green-600 bg-green-50 border-green-100';

  return (
    <div className="flex-1 overflow-y-auto flex flex-col bg-white">
      {/* Detail Header - Updated to Deep Purple */}
      <div className="p-8 bg-gradient-to-br from-[#4a3075] to-[#63459d] text-white">
        <div className="flex justify-between items-start mb-6">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">
            PROJECT ID: {asset.序号}
          </span>
          <span className={`px-2 py-1 rounded text-[10px] font-bold border bg-white/90 ${vacancyColorClass}`}>
            {asset.空置程度标签}空置
          </span>
        </div>
        <h2 className="text-2xl font-black mb-3 leading-tight tracking-wide">{asset.资产名称}</h2>
        <div className="flex items-center gap-2 text-violet-200 text-xs">
          <Building2 className="w-4 h-4" />
          <span className="font-medium">{asset.资产类别}</span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 border-b border-gray-100 bg-violet-50/30">
        <div className="p-6 border-r border-gray-100 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] text-violet-400 uppercase font-black mb-1">经营性面积</span>
          <span className="text-xl font-black text-[#4a3075]">
            {asset["经营性总面积（平）"] || asset["资产总面积（平）"] || asset["经营性面积（平）"] || 0}
            <span className="text-xs ml-1 font-normal opacity-50">㎡</span>
          </span>
        </div>
        <div className="p-6 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] text-violet-400 uppercase font-black mb-1">当前空置率</span>
          <span className="text-xl font-black text-[#4a3075]">
            {asset["空置率（%）"]}<span className="text-xs ml-0.5">%</span>
          </span>
        </div>
      </div>

      {/* Details Sections */}
      <div className="p-6 space-y-10">
        {/* Basic Info */}
        <section>
          <h4 className="flex items-center gap-2 text-xs font-black text-gray-300 uppercase tracking-widest mb-6 border-b pb-2 border-gray-100">
            <MapPin className="w-3.5 h-3.5" /> 地理位置详情
          </h4>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="p-2.5 bg-violet-50 rounded-xl text-violet-600 h-fit shadow-sm"><Navigation className="w-4 h-4" /></div>
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase mb-0.5">资产坐落</p>
                <p className="text-sm font-bold text-gray-800 leading-snug">{asset.地址}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-2.5 bg-violet-50 rounded-xl text-violet-600 h-fit shadow-sm"><TrendingDown className="w-4 h-4" /></div>
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase mb-0.5">附近主要道路</p>
                <p className="text-sm font-medium text-gray-600 leading-relaxed">{asset.附近道路}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Landmarks Section */}
        <section className="bg-gray-50 p-5 rounded-3xl border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-100/50 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110"></div>
          <h4 className="flex items-center gap-2 text-xs font-black text-violet-300 uppercase tracking-widest mb-4">
             周边标志性地标
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed relative z-10">
            {asset.周边标志性建筑}
          </p>
        </section>

        {/* Pricing & Contact */}
        <section>
          <h4 className="flex items-center gap-2 text-xs font-black text-gray-300 uppercase tracking-widest mb-6 border-b pb-2 border-gray-100">
            <User className="w-3.5 h-3.5" /> 运营管理与联系
          </h4>
          <div className="grid grid-cols-1 gap-4 mb-6">
             <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-violet-200 transition-colors">
                <span className="text-xs font-bold text-gray-400">参考租金</span>
                <span className="text-sm font-black text-violet-600">{asset["租金价格（元/平·月）"]}</span>
             </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 text-xs font-black">招</div>
                <div>
                   <p className="text-[10px] text-gray-400 font-bold">招商负责人</p>
                   <p className="text-sm font-bold text-gray-800">{asset.招商负责人.replace(/\d+$/, '')}</p>
                </div>
              </div>
              <a href={`tel:${asset.招商负责人.match(/\d+/)?.[0]}`} className="p-3 bg-gray-50 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                <Phone className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-center justify-between p-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-xs font-black">运</div>
                <div>
                   <p className="text-[10px] text-gray-400 font-bold">运营负责人</p>
                   <p className="text-sm font-bold text-gray-800">{asset.运营负责人.replace(/\d+$/, '')}</p>
                </div>
              </div>
              {asset.运营负责人 !== '/' && (
                <a href={`tel:${asset.运营负责人.match(/\d+/)?.[0]}`} className="p-3 bg-gray-50 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                  <Phone className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Management */}
        <section className="pb-12">
          <h4 className="flex items-center gap-2 text-xs font-black text-gray-300 uppercase tracking-widest mb-6 border-b pb-2 border-gray-100">
            <ShieldCheck className="w-3.5 h-3.5" /> 资产维护保障
          </h4>
          <div className="p-5 bg-gradient-to-br from-violet-50 to-white rounded-3xl border border-violet-100 flex items-start gap-4 shadow-sm">
            <div className="p-2 bg-[#4a3075] text-white rounded-xl shadow-lg"><ShieldCheck className="w-5 h-5" /></div>
            <div>
              <p className="text-xs text-violet-400 font-black uppercase mb-1 tracking-tighter">Property Management</p>
              <p className="text-sm font-black text-[#4a3075] leading-tight">{asset.物业管理单位}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AssetDetails;
