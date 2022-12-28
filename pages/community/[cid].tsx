import { useRouter } from 'next/router';

const CommunityPage = () => {
  const router = useRouter();
  const { cid } = router.query;

  return (
    <div>
      <h1>Community: {cid}</h1>
    </div>
  );
};

export default CommunityPage;
