import { fetchUser } from "@/lib/data";
import SingleUserComponent from "@/components/singleUsercomponent";

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const user = await fetchUser(id);
  const Userjson = JSON.parse(JSON.stringify(user));

  return (
    <>
      <SingleUserComponent user={Userjson} />
    </>
  );
};

export default SingleUserPage;
