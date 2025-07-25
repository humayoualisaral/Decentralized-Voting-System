import AddPartyForm from './AddPartyForm';
import RemovePartyForm from './RemovePartyForm';
import PartyList from './PartyList';

export default function PartyPage() {
  return (
    <div className="min-h-screen bg-black text-white grid md:grid-cols-2 gap-6 p-6">
      <AddPartyForm />
      <RemovePartyForm />
      <PartyList />
    </div>
  );
}
