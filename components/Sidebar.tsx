
import React from 'react';
import { Asset } from '../types';
import { Search, Filter, MapPin } from 'lucide-react';

interface SidebarProps {
  assets: Asset[];
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedAssetId: number | null;
  onSelectAsset: (asset: Asset) => void;
  setHoveredAssetId: (id: number | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  assets, 
  searchTerm, 
  setSearchTerm, 
  selectedAssetId, 
  onSelectAsset,
  setHoveredAssetId
}) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Search Header */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="搜索资产名称、地址或类型..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* List Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-2 space-y-1">
          {assets.length > 0 ? (
            assets.map(asset => (
              <button
                key={asset.序号}
                onClick={() => onSelectAsset(asset)}
                onMouseEnter={() => setHoveredAssetId(asset.序号)}
                onMouseLeave={() => setHoveredAssetId(null)}
                className={`w-full text-left p-4 rounded-xl transition-all group ${
                  selectedAssetId === asset.序号 
                  ? 'bg-blue-50 border border-blue-200 shadow-sm' 
                  : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-bold text-blue-900 truncate pr-2 group-hover:text-blue-700 transition-colors">
                    {asset.资产名称}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border whitespace-nowrap ${
                    asset.空置程度标签 === '高' ? 'bg-red-50 text-red-600 border-red-100' :
                    asset.空置程度标签 === '中' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' :
                    'bg-green-50 text-green-600 border-green-100'
                  }`}>
                    {asset.空置程度标签}空置
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-gray-500 mb-2">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="truncate">{asset.地址}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-wider">
                  <span>{asset.资产类别}</span>
                  <span className="font-medium text-gray-600">ID: {asset.序号}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400 text-sm">未搜索到相关资产</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Result Count */}
      <div className="p-3 bg-gray-100 border-t border-gray-200 text-center text-xs text-gray-500 font-medium">
        已显示 {assets.length} 个结果
      </div>
    </div>
  );
};

export default Sidebar;
