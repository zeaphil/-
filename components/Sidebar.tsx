
import React from 'react';
import { Asset } from '../types';
import { Search, MapPin, Sparkles, X } from 'lucide-react';

interface SidebarProps {
  assets: Asset[];
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedAssetId: number | null;
  onSelectAsset: (asset: Asset) => void;
  setHoveredAssetId: (id: number | null) => void;
  hideList?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  assets, 
  searchTerm, 
  setSearchTerm, 
  selectedAssetId, 
  onSelectAsset,
  setHoveredAssetId,
  hideList = false
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* 极简搜索框 */}
      <div className="p-4">
        <div className="relative group">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${searchTerm ? 'text-violet-600' : 'text-slate-300'}`} />
          <input
            type="text"
            className="w-full pl-11 pr-10 py-3.5 bg-slate-50/50 rounded-2xl text-xs placeholder:text-slate-300 focus:ring-2 focus:ring-violet-500/10 outline-none transition-all"
            placeholder="搜索项目名称或地址..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-300 hover:text-slate-500"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* 搜索结果列表 */}
      {!hideList && (
        <div className="flex-1 overflow-y-auto px-2 pb-4 custom-scrollbar">
          <div className="space-y-1.5">
            {assets.length > 0 ? (
              assets.map(asset => (
                <button
                  key={asset.序号}
                  onClick={() => onSelectAsset(asset)}
                  onMouseEnter={() => setHoveredAssetId(asset.序号)}
                  onMouseLeave={() => setHoveredAssetId(null)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all border ${
                    selectedAssetId === asset.序号 
                    ? 'bg-violet-600 border-violet-600 text-white shadow-lg' 
                    : 'bg-white border-transparent hover:border-slate-100 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] font-bold truncate pr-2">{asset.资产名称}</span>
                    <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${
                      selectedAssetId === asset.序号 ? 'bg-white/20' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {asset.空置程度标签}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1 text-[9px] ${selectedAssetId === asset.序号 ? 'text-violet-100' : 'text-slate-400'}`}>
                    <MapPin className="w-2.5 h-2.5 shrink-0" />
                    <span className="truncate">{asset.地址}</span>
                  </div>
                </button>
              ))
            ) : (
              <div className="py-12 text-center opacity-40">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-slate-200" />
                <p className="text-[10px] font-medium">无匹配项</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
