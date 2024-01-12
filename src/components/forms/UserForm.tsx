import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

import { UserSchema } from "@/lib/validation";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetUserById,
  useUpdateUser,
} from "@/lib/react-query/queriesAndMutation";
import Loader from "../shared/Loader";

import { toast } from "../ui/use-toast";
import ProfileUploader from "../shared/ProfileUploader";

const UserForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { data: currentUser } = useGetUserById(id || "");
  const { mutateAsync: updateUser, isPending: isLoadingUpdate } =
    useUpdateUser();

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  console.log("before zod", currentUser);

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: currentUser.name || "",
      username: currentUser.username || "",
      email: currentUser.email || "",
      bio: currentUser.bio || "",
      file: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UserSchema>) {
    const updatedPost = await updateUser({
      ...values,
      userId: currentUser?.$id || "",
      imageId: currentUser?.imageId,
      imageUrl: currentUser?.imageUrl,
    });

    if (!updatedPost) {
      toast({ title: "Please try again" });
    }

    return navigate(`/profile/${currentUser?.$id}`);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <div className="flex items-center gap-5">
                  {/* <img
                    src={
                      currentUser.imageUrl ||
                      "/assets/icons/profile-placeholder.svg"
                    }
                    alt="profile"
                    className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
                  /> */}
                  {/* <input
                    type="file"
                    {...field}
                    ref={fileInputRef}
                    className="hidden" // Hide the input
                  />
                  <Button
                    onClick={() => fileInputRef.current.click()}
                    className={
                      "h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg"
                    }
                  >
                    <img
                      src={"/assets/icons/edit.svg"}
                      alt="edit"
                      width={20}
                      height={20}
                    />
                    <p className="flex whitespace-nowrap small-medium">
                      Change Profile Photo
                    </p>
                  </Button> */}
                  <ProfileUploader
                    fieldChange={field.onChange}
                    mediaUrl={currentUser.imageUrl}
                  />
                </div>
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Email</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Bio</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="shad-textarea custom-scrollbar"
                />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingUpdate}
          >
            {isLoadingUpdate && <Loader />}
            Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
