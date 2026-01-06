
import React, { useState, useMemo, useCallback } from 'react';
import { ASSET_DATA } from './data';
import { Asset } from './types';
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';
import AssetDetails from './components/AssetDetails';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [hoveredAssetId, setHoveredAssetId] = useState<number | null>(null);

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

  return (
    <div className="flex flex-col h-screen overflow-hidden text-gray-900 bg-white">
      {/* 典雅深紫色渐变顶栏 - 已移除图标 */}
      <header className="flex items-center justify-between px-8 py-5 bg-gradient-to-r from-[#4a3075] to-[#63459d] text-white shadow-xl z-50">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-widest font-serif">蓉城资管公司资产地图</h1>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <div className="flex flex-col items-end">
            <span className="opacity-70 text-[10px] uppercase tracking-tighter">Total Assets</span>
            <span className="text-lg font-light">{ASSET_DATA.length} 个项目</span>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <div className="flex flex-col items-end text-amber-200">
            <span className="opacity-70 text-[10px] uppercase tracking-tighter">Data Version</span>
            <span className="text-lg font-light italic">2024 V2.2</span>
          </div>
        </div>
      </header>

      {/* 主体布局：左侧搜索，中间地图，右侧信息 */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* 左边搜索 */}
        <section className="w-1/4 border-r border-gray-200 flex flex-col bg-gray-50 shadow-inner z-30">
          <Sidebar 
            assets={filteredAssets}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedAssetId={selectedAsset?.序号 ?? null}
            onSelectAsset={handleSelectAsset}
            setHoveredAssetId={setHoveredAssetId}
          />
        </section>

        {/* 中间地图 */}
        <section className="flex-1 relative z-10 bg-[#f4f1f8]">
          <MapView 
            assets={filteredAssets}
            selectedAsset={selectedAsset}
            onMarkerClick={handleSelectAsset}
            hoveredAssetId={hoveredAssetId}
          />
        </section>

        {/* 右边项目信息 */}
        <section className="w-1/4 border-l border-gray-200 flex flex-col bg-white shadow-2xl z-20">
          <AssetDetails asset={selectedAsset} />
        </section>

      </main>

      {/* 页脚信息 */}
      <footer className="px-6 py-2 bg-[#4a3075] border-t border-white/10 text-xs text-white/60 flex justify-between items-center">
        <span>© 2024 蓉城资产管理有限公司 - 专业资产管理领航者</span>
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400"></span> 高空置</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> 中空置</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> 运营稳健</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
