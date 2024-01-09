import { Models } from "appwrite";
import { useInView } from "react-intersection-observer";

import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import {
  // useGetRecentPosts,
  useGetPosts,
} from "@/lib/react-query/queriesAndMutation";
import { useEffect } from "react";
import Rightbar from "@/components/shared/Rightbar";

const Home = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  console.log("infi", posts);

  // const {
  //   data: posts,
  //   isPending: isPostLoading,
  //   isError: isErrorPosts,
  // } = useGetRecentPosts();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {/* {isPostLoading && !posts ? (
            <Loader />
          ) : ( */}
          <ul className="flex flex-col flex-1 gap-9 w-full">
            {posts?.pages.map((page) =>
              page?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.$id} />
              ))
            )}
          </ul>
          {/* )} */}
        </div>
        {hasNextPage && (
          <div ref={ref} className="mt-10">
            <Loader />
          </div>
        )}
      </div>
      <Rightbar />
    </div>
  );
};

export default Home;
