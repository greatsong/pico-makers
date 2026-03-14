import { Cable, MapPin, Code, Lightbulb } from 'lucide-react';
import useAppStore from '../../stores/appStore';
import MultiWiring from '../board/MultiWiring';
import PinMapView from '../board/PinMapView';
import CodeView from '../board/CodeView';
import TipsView from '../board/TipsView';

const TABS = [
  { id: 'wiring', label: '배선', icon: Cable },
  { id: 'pinmap', label: '핀맵', icon: MapPin },
  { id: 'code', label: '코드', icon: Code },
  { id: 'tips', label: '팁', icon: Lightbulb },
];

export default function RightPanel() {
  const rightTab = useAppStore(s => s.rightTab);
  const setRightTab = useAppStore(s => s.setRightTab);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-bg-surface">
      {/* 탭 바 */}
      <div className="flex border-b border-border">
        {TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setRightTab(tab.id)}
              className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 text-xs font-medium transition-colors ${
                rightTab === tab.id
                  ? 'text-cyan border-b-2 border-cyan bg-bg-primary/50'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 탭 콘텐츠 */}
      <div className="flex-1 overflow-y-auto p-4">
        {rightTab === 'wiring' && <MultiWiring />}
        {rightTab === 'pinmap' && <PinMapView />}
        {rightTab === 'code' && <CodeView />}
        {rightTab === 'tips' && <TipsView />}
      </div>
    </div>
  );
}
