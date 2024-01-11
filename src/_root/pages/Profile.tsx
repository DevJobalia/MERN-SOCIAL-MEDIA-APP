// import GridPostList from "@/components/shared/GridPostList";
// import Loader from "@/components/shared/Loader";
// import { useUserContext } from "@/context/AuthContext";
// import { useUsersPost } from "@/lib/react-query/queriesAndMutation";
// import { useEffect } from "react";
// import { InView, useInView } from "react-intersection-observer";

// const Profile = () => {
//   const { ref, inView } = useInView();
//   const { user } = useUserContext();
//   const {
//     data: posts,
//     fetchNextPage,
//     hasNextPage,
//     isFetching,
//   } = useUsersPost(user.name);
//   useEffect(() => {
//     if (InView) {
//       fetchNextPage();
//     }
//   }, [inView]);
//   if (isFetching) {
//     <Loader />;
//   }
//   console.log(posts);

//   return (
//     <div className="explore-container">
//       <div className="flex flex-col lg:flex-row gap-3 items-center w-full">
//         <div className="h-full justify-start">
//           <img
//             src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
//             alt="profile"
//             className="h-24 w-24 rounded-full p-2 object-cover"
//           />
//         </div>
//         <div className="flex flex-col">
//           <h1 className="h1-bold">{user.name}</h1>
//           <p className="small-regular text-light-3">@{user.username}</p>
//           <div className="flex gap-8 py-3">
//             <div className="flex flex-col">
//               <p className="d text-light-3 body-bold">273</p>
//               <p className="base-regular">Posts</p>
//             </div>
//             <div className="flex flex-col">
//               <p className="d text-light-3 body-bold">147</p>
//               <p className="base-regular">Followers</p>
//             </div>
//             <div className="flex flex-col">
//               <p className="d text-light-3 body-bold">151</p>
//               <p className="base-regular">Following</p>
//             </div>
//           </div>
//           <p className="m max-w-2xl">
//             {user.bio ||
//               "Passionate creator navigating life's journey with curiosity and joy. 🌟 | Explorer | Dreamer | 📍 [Your Location] | #LifeAdventures"}
//           </p>
//         </div>
//       </div>
//       <div className="flex-between w-full mt-16 mb-7">
//         <div className="flex-center gap-3 bg-dark-3 rounded-xl px-6 py-2 cursor-pointer">
//           <img
//             src="/assets/icons/posts.svg"
//             alt="filter"
//             width={20}
//             height={20}
//           />
//           <p className="small-mdeium md:base-medium text-light-2">Posts</p>
//         </div>
//         <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
//           <p className="small-mdeium md:base-medium text-light-2">All</p>
//           <img
//             src="/assets/icons/filter.svg"
//             alt="filter"
//             width={20}
//             height={20}
//           />
//         </div>
//       </div>
//       <div className="flex flex-wrap gap-9 w-full max-w-5xl">
//         {posts?.pages.map((item, index) => (
//           <GridPostList key={`page-${index}`} posts={item?.documents} />
//         ))}
//       </div>
//       {hasNextPage && (
//         <div ref={ref} className="mt-10">
//           <Loader />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;
import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";

import { LikedPosts } from "@/_root/pages";
import { useUserContext } from "@/context/AuthContext";
import Loader from "@/components/shared/Loader";
import GridPostList from "@/components/shared/GridPostList";
import { Button } from "@/components/ui/button";
import { useGetUserById } from "@/lib/react-query/queriesAndMutation";

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  const { data: currentUser } = useGetUserById(id || "");

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentUser.username}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock value={20} label="Followers" />
              <StatBlock value={20} label="Following" />
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div className={`${user.id !== currentUser.$id && "hidden"}`}>
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                  user.id !== currentUser.$id && "hidden"
                }`}
              >
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className={`${user.id === id && "hidden"}`}>
              <Button type="button" className="shad-button_primary px-8">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>

      {currentUser.$id === user.id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-dark-3"
            }`}
          >
            <img
              src={"/assets/icons/posts.svg"}
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
            }`}
          >
            <img
              src={"/assets/icons/like.svg"}
              alt="like"
              width={20}
              height={20}
            />
            Liked Posts
          </Link>
        </div>
      )}

      <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser.posts} showUser={false} />}
        />
        {currentUser.$id === user.id && (
          <Route path="/liked-posts" element={<LikedPosts />} />
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
