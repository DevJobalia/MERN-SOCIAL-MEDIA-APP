import Loader from "@/components/shared/Loader";

import { useUserContext } from "@/context/AuthContext";
import {
  // useGetUsers,
  useSavedPost,
} from "@/lib/react-query/queriesAndMutation";
import { Link } from "react-router-dom";

const Saved = () => {
  const { user } = useUserContext();
  const { data: users, isPending } = useSavedPost(user.id);
  console.log(users);

  if (isPending) {
    <Loader />;
  }
  return (
    <div className="flex flex-col px-6 py-10  ">
      <div className="m max-w-5xl flex-start gap-3 justify-start w-full">
        <img src="/assets/icons/save.svg" alt="icon" width={36} height={36} />

        <h2 className="h3-bold md:h2-bold w-full mb-5">Saved Posts</h2>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-6 py-2 cursor-pointer">
          <img
            src="/assets/icons/posts.svg"
            alt="filter"
            width={20}
            height={20}
          />
          <p className="small-mdeium md:base-medium text-light-2">Posts</p>
        </div>
        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-mdeium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            alt="filter"
            width={20}
            height={20}
          />
        </div>
      </div>

      {/* square */}
      <div className="grid-container">
        {users?.documents.map((user) => (
          // <div
          //   className="bg-dark-1 rounded-3xl border-2 border-dark-4 lg:px-14 lg:py-7 flex flex-col items-center gap-2"
          //   key={user.$id}
          // >
          <Link to={`/post/${user.post.$id}`} className="grid-post_link">
            {/* photo */}
            <img
              src={
                user.post.imageUrl || "/assets/icons/profile-placeholder.svg"
              }
              alt="profile"
              className="h-full w-full object-cover"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Saved;
