import AddProvinceForm from './AddProvinceForm';
import AddConstituenciesForm from './AddConstituenciesForm';
import ViewProvinces from './ViewProvinces';
import ViewConstituencies from './ViewConstituencies';

export default function GeographicManagementPage() {
  return (
    <div className="min-h-screen bg-black text-white grid md:grid-cols-2 gap-6 p-6">
      <AddProvinceForm />
      <AddConstituenciesForm />
      <ViewProvinces />
      <ViewConstituencies />
    </div>
  );
}
