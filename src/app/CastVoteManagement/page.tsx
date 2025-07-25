import CastVoteForm from './CastVoteForm';
import VerifyMyVote from './VerifyMyVote';

export default function VotePage() {
  return (
    <div className="min-h-screen bg-black text-white grid md:grid-cols-2 gap-6 p-6">
      <CastVoteForm />
      <VerifyMyVote />
    </div>
  );
}
