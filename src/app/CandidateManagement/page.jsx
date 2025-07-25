import RegisterCandidateForm from './RegisterCandidateForm';
import RemoveCandidateForm from './RemoveCandidateForm';
import GetAllCandidates from './GetAllCandidates';
import GetCandidateByCNIC from './GetCandidateByCNIC';

export default function CandidatePage() {
  return (
    <div className="grid md:grid-cols-2 gap-6 p-6">
      <RegisterCandidateForm />
      <RemoveCandidateForm />
      <GetAllCandidates />
      <GetCandidateByCNIC />
    </div>
  );
}
