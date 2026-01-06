
import React, { useState, useMemo, useCallback } from 'react';
import { ASSET_DATA } from './data';
import { Asset } from './types';
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';
import AssetDetails from './components/AssetDetails';
import { X } from 'lucide-react';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [hoveredAssetId, setHoveredAssetId] = useState<number | null>(null);

  const hasSelection = !!selectedAsset;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // 电脑端：只要有搜索词就显示列表。移动端：有选中项时优先显示详情，隐藏列表。
  const showList = searchTerm.trim().length > 0 && (!isMobile || !hasSelection);

  const filteredAssets = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return ASSET_DATA;
    const keywords = term.split(/\s+/).filter(k => k.length > 0);
    return ASSET_DATA.filter(asset => {
      const searchIndex = [
        asset.资产名称,
        asset.地址,
        asset.资产类别,
        asset.周边标志性建筑,
        asset.附近道路,
        asset.招商负责人,
        asset.物业管理单位
      ].join(' ').toLowerCase();
      return keywords.every(keyword => searchIndex.includes(keyword));
    });
  }, [searchTerm]);

  const handleSelectAsset = useCallback((asset: Asset) => {
    setSelectedAsset(asset);
  }, []);

  const handleClearSelection = () => {
    setSelectedAsset(null);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 font-sans text-slate-900">
      {/* 极简顶部栏 */}
      <header className="flex items-center justify-between px-6 py-2 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-violet-600 rounded flex items-center justify-center font-bold text-white text-[10px]">RC</div>
          <h1 className="text-sm font-black tracking-tight text-slate-800">蓉城资管公司资产地图</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-[10px] font-bold text-slate-400 tabular-nums">
            已载入 {ASSET_DATA.length} 宗资产
          </div>
        </div>
      </header>

      {/* 交互主体 */}
      <main className="flex-1 relative overflow-hidden">
        {/* 底层地图 */}
        <div className="absolute inset-0 z-0">
          <MapView 
            assets={filteredAssets} 
            selectedAsset={selectedAsset}
            onMarkerClick={handleSelectAsset}
            hoveredAssetId={hoveredAssetId}
            showSidebar={showList}
          />
        </div>

        {/* 悬浮交互层 */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col md:flex-row p-4 md:p-4 justify-between items-start h-full">
          
          {/* 左侧：搜索控制台 */}
          <div className={`
            pointer-events-auto transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
            w-full md:w-64 lg:w-72
            bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 flex flex-col
            ${showList ? 'h-[40vh] md:h-[calc(100vh-80px)]' : 'h-auto'}
          `}>
            <Sidebar 
              assets={showList ? filteredAssets : []} 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedAssetId={selectedAsset?.序号 ?? null}
              onSelectAsset={handleSelectAsset}
              setHoveredAssetId={setHoveredAssetId}
              hideList={!showList}
            />
          </div>

          {/* 右侧：详情卡片 (宽度260px，比之前增加30%) */}
          <div className={`
            pointer-events-auto transition-all duration-500 transform
            fixed md:static inset-x-4 bottom-4 md:inset-auto
            w-auto md:w-64 lg:w-[260px]
            max-h-[85vh] md:h-auto
            bg-white/95 backdrop-blur-lg rounded-[1.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] 
            border border-slate-100 flex flex-col overflow-hidden z-20
            ${hasSelection 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-[120%] md:translate-x-[120%] opacity-0'
            }
          `}>
            {selectedAsset && (
              <div className="relative flex flex-col">
                <button 
                  onClick={handleClearSelection}
                  className="absolute top-3 right-3 z-30 p-1.5 bg-slate-100/50 hover:bg-white rounded-full text-slate-400 hover:text-gray-600 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
                <AssetDetails asset={selectedAsset} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
