// React import removed as it is not used directly
import { Layout } from './components/Layout';
import { useStore } from './store/useStore';

// استيراد كافة الواجهات
import { PlantNeedsView } from './views/PlantNeedsView';
import { DashboardView } from './views/DashboardView';
import { IrrigationCenterView } from './views/IrrigationCenterView';
import { ZonesView } from './views/ZonesView';
import { DemandView } from './views/DemandView';
import { RecsView } from './views/RecsView';
import { SimulationView } from './views/SimulationView';
import { BOQView } from './views/BOQView';
import { FertilizationView } from './views/FertilizationView';
import { OperationsView } from './views/OperationsView';
import { PestControlView } from './views/PestControlView';
import { HarvestView } from './views/HarvestView';
import { WarningsView } from './views/WarningsView';
import { PlaceholderView } from './views/PlaceholderView';

function App() {
  // جلب الحالة النشطة من المتجر التفاعلي
  const activeView = useStore((state) => state.activeView);

  // وظيفة اختيار الواجهة بناءً على ضغطة الزر في القائمة الجانبية
  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView />;
      case 'plant_needs': return <PlantNeedsView />;
      case 'setup': return <IrrigationCenterView />;
      case 'zones': return <ZonesView />;
      case 'demand': return <DemandView />;
      case 'recommendations': return <RecsView />;
      case 'simulation': return <SimulationView />;
      case 'boq': return <BOQView />;
      case 'fertilization': return <FertilizationView />;
      case 'operations': return <OperationsView />;
      case 'pest': return <PestControlView />;
      case 'harvest': return <HarvestView />;
      case 'warnings': return <WarningsView />;

      default: return <PlaceholderView title={activeView} />;
    }
  };

  return (
    <Layout>
      {renderView()}
    </Layout>
  );
}

export default App;