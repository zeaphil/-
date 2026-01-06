
import React, { useState, useMemo, useCallback } from 'react';
import { ASSET_DATA } from './data';
import { Asset, VacancyLevel } from './types';
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';
import AssetDetails from './components/AssetDetails';
import { Search, Map as MapIcon, Database } from 'lucide-react';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [hoveredAssetId, setHoveredAssetId] = useState<number | null>(null);

  const filteredAssets = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return ASSET_DATA.filter(asset => 
      asset.资产名称.toLowerCase().includes(term) ||
      asset.地址.toLowerCase().includes(term) ||
      asset.资产类别.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const handleSelectAsset = useCallback((asset: Asset) => {
    setSelectedAsset(asset);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden text-gray-900 bg-white">
      {/* Top Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-blue-900 text-white shadow-lg z-50">
        <div className="flex items-center gap-3">
          <Database className="w-8 h-8 text-blue-300" />
          <h1 className="text-2xl font-bold tracking-tight">蓉城资管公司资产地图</h1>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <div className="flex flex-col items-end">
            <span className="opacity-70">资产总计</span>
            <span className="text-lg">{ASSET_DATA.length} 个项目</span>
          </div>
          <div className="w-px h-8 bg-blue-700"></div>
          <div className="flex flex-col items-end">
            <span className="opacity-70">数据版本</span>
            <span className="text-lg">2024 V2.0</span>
          </div>
        </div>
      </header>

      {/* Main Container: Left Search, Middle Map, Right Info */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Search & List */}
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

        {/* Middle: Interactive Map */}
        <section className="flex-1 relative z-10 bg-blue-50">
          <MapView 
            assets={filteredAssets}
            selectedAsset={selectedAsset}
            onMarkerClick={handleSelectAsset}
            hoveredAssetId={hoveredAssetId}
          />
        </section>

        {/* Right Side: Detailed Project Information */}
        <section className="w-1/4 border-l border-gray-200 flex flex-col bg-white shadow-2xl z-20">
          <AssetDetails asset={selectedAsset} />
        </section>

      </main>

      {/* Footer Info */}
      <footer className="px-6 py-1 bg-gray-100 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
        <span>© 2024 蓉城资产管理有限公司 - 专业资产管理服务</span>
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> 高空置率</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> 中空置率</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> 低/无空置</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
