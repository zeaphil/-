
import React from 'react';
import { Asset } from '../types';
import { 
  Building2, 
  MapPin, 
  User, 
  Phone, 
  Activity,
  Navigation,
  ExternalLink
} from 'lucide-react';

interface AssetDetailsProps {
  asset: Asset | null;
}

const AssetDetails: React.FC<AssetDetailsProps> = ({ asset }) => {
  if (!asset) return null;

  const getStatusStyle = (label: string) => {
    switch(label) {
      case '高': return 'text-rose-600 bg-rose-50';
      case '中': return 'text-amber-600 bg-amber-50';
      default: return 'text-emerald-600 bg-emerald-50';
    }
  };

  return (
    <div className="flex flex-col bg-white overflow-hidden text-[11px]">
      {/* 纤细装饰条 */}
      <div className="h-1 bg-violet-600" />
      
      {/* 增加内边距和垂直间距以符合 40% 长度增加的要求 */}
      <div className="px-5 py-7 space-y-6">
        {/* 头部标题区 */}
        <header className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[8px] font-black text-violet-500 uppercase tracking-widest">
            <Building2 className="w-3 h-3" /> {asset.资产类别}
          </div>
          <h2 className="text-lg font-black text-slate-900 leading-tight pr-5 break-words">
            {asset.资产名称}
          </h2>
          <div className="flex items-start gap-1.5 text-[10px] text-slate-400 font-medium pt-0.5">
            <MapPin className="w-3 h-3 mt-0.5 shrink-0" /> 
            <span className="leading-normal">{asset.地址}</span>
          </div>
        </header>

        {/* 核心指标 - 间距增加 */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="px-3 py-3 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[7px] font-bold text-slate-400 uppercase leading-none mb-1.5">经营面积</p>
            <p className="text-xs font-black text-slate-800 tabular-nums">
              {asset["经营性总面积（平）"] || asset["资产总面积（平）"] || 0}
              <span className="text-[9px] font-normal text-slate-400 ml-0.5">m²</span>
            </p>
          </div>
          <div className={`px-3 py-3 rounded-xl border ${getStatusStyle(asset.空置程度标签)} border-transparent`}>
            <p className="text-[7px] font-bold opacity-60 uppercase leading-none mb-1.5">空置率</p>
            <p className="text-xs font-black tabular-nums">
              {asset["空置率（%）"]}%
            </p>
          </div>
        </div>

        {/* 核心详情 */}
        <div className="space-y-5 pt-1">
          <div className="flex gap-2.5 items-start">
            <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 border border-slate-100">
              <Navigation className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[7px] font-bold text-slate-300 uppercase leading-none mb-1 tracking-wider">标志性地标</p>
              <p className="text-[10px] text-slate-600 leading-relaxed italic">{asset.周边标志性建筑}</p>
            </div>
          </div>

          <div className="p-4 bg-slate-900 rounded-2xl text-white shadow-lg shadow-slate-100">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[7px] font-bold text-slate-500 uppercase">租金报价参考</span>
              <ExternalLink className="w-2.5 h-2.5 text-slate-600" />
            </div>
            <div className="text-base font-black tracking-tight leading-none">
              {asset["租金价格（元/平·月）"]} <span className="text-[8px] font-medium opacity-40 italic">RMB/㎡/M</span>
            </div>
          </div>

          {/* 交互按钮 */}
          <div className="flex items-center justify-between p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
             <div className="flex items-center gap-2">
               <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white ring-2 ring-emerald-100 shadow-sm">
                 <User className="w-3 h-3" />
               </div>
               <span className="text-xs font-bold text-emerald-800 truncate max-w-[80px]">{asset.招商负责人.split(/\d+/)[0]}</span>
             </div>
             <a href={`tel:${asset.招商负责人.match(/\d+/)?.[0]}`} className="p-1.5 bg-white text-emerald-600 rounded-lg border border-emerald-100 shadow-sm hover:scale-105 transition-transform active:scale-95">
               <Phone className="w-3.5 h-3.5" />
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetails;
