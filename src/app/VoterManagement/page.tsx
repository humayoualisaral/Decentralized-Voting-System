import RegisterVoterForm from './RegisterVoterForm';
import RemoveVoterForm from './RemoveVoterForm';

export default function VoterPage() {
  return (
    <div className="min-h-screen bg-black text-white grid md:grid-cols-2 gap-6 p-6">
      <RegisterVoterForm />
      <RemoveVoterForm />
    </div>
  );
}
