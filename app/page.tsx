"use client";
import React, { useState } from "react";
import { z, ZodError } from "zod";

import Image from "next/image";
import heart from "../public/heartVector.svg";
import sendVector from "../public/sendVector.svg";
import emptyHeart from "../public/heartBorderVector.svg";
import { useRef } from "react";

const commentSchema = z.object({
  username: z.string().min(2, { message: "Username is too short" }),
  comment: z.string().min(5, { message: "Comment is too short" }),
  likeCount: z.number(),
  liked: z.boolean(),
});

const initialFormValues = {
  username: "",
  comment: "",
  likeCount: 0,
  liked: false,
};

export default function Home() {
  const [imagePreview, setImagePreview] = useState<any>();
  const imageRef = useRef(null);
  const [toggleLike, setToggleLike] = useState(false);
  const [count, setCount] = useState<number>(0);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [validationErrors, setValidationErrors] =
    useState<ZodError<any> | null>(null);

  const handleFile = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.target.files?.[0];

    if (file) {
      const url = window.URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      commentSchema.parse(formValues);
      // If validation succeeds, clear any previous errors
      setValidationErrors(null);
      // You can proceed with form submission or other actions here.
      console.log("Form is valid:", formValues);
    } catch (error) {
      if (error instanceof ZodError) {
        setValidationErrors(error);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#E9EDF5] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md mx-auto">
          <h2 className="mt-6 text-center text-2xl font-extrabold text-black">
            Comment Preview
          </h2>
        </div>
        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="">
            <div>
              <div className="mt-1 mb-10">
                <div className="flex gap-2 appearance-none p-4 w-full bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <div className="w-[50px]">
                    <Image
                      src={imagePreview}
                      width={10}
                      height={10}
                      alt="image"
                      className="rounded-3xl border h-9 w-9"
                    />
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold mb-2 text-[#424D6A] pt-2"
                    >
                      Mitchael Brown
                    </label>
                    <p className="text-[#676565]">
                      Hello, how are you doing this fine and lovely evening. I
                      hope this message finds you well.
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 justify-center items-center w-14">
                    {toggleLike ? (
                      <Image
                        src={heart}
                        alt="heart"
                        className="w-4 cursor-pointer"
                        // onClick={() => setToggleLike(toggleLike)}
                      />
                    ) : (
                      <Image
                        src={emptyHeart}
                        alt="heart"
                        className="w-4 cursor-pointer"
                        onClick={() => setToggleLike(!toggleLike)}
                      />
                    )}
                    <label className="text-[#676565] text-[12px]">
                      {count}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium"
                ></label>
                <div className="mt-2 flex items-center justify-center">
                  <span className="inline-block h-8 w-8 rounded-full overflow-hidden"></span>
                  <label
                    htmlFor="file-input"
                    className="cursor-pointer flex items-center justify-center w-28 h-28 rounded-full shadow-sm text-sm text-center font-medium text-gray-700 bg-white hover:bg-gray-50 relative"
                  >
                    <span className="inset-0 flex items-center justify-center font-bold w-[2px]">
                      Select Image
                    </span>
                    <input
                      type="file"
                      name="avatar"
                      id="file-input"
                      accept=".jpg,.jpeg,.png"
                      ref={imageRef}
                      onChange={(e) => handleFile(e)}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="pl-2 block text-sm font-bold text-[#424D6A]"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="username"
                    value={formValues.username}
                    onChange={(e) =>
                      setFormValues({ ...formValues, username: e.target.value })
                    }
                    className="appearance-none block w-full px-3 py-3 bg-white rounded-md shadow-sm placeholder:text-[#7A7A7A] focus:outline-none sm:text-sm"
                    placeholder="Enter username"
                  />
                </div>
                {validationErrors &&
                  validationErrors.errors.find(
                    (error) => error.path[0] === "username"
                  ) && (
                    <div className="text-red-500">
                      {
                        validationErrors.errors.find(
                          (error) => error.path[0] === "username"
                        )?.message
                      }
                    </div>
                  )}
              </div>
              <div>
                <label
                  htmlFor="comment"
                  className="pl-2 block text-sm font-bold text-[#424D6A]"
                >
                  Comment
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="comment"
                    value={formValues.comment}
                    onChange={(e) =>
                      setFormValues({ ...formValues, comment: e.target.value })
                    }
                    className="appearance-none block w-full px-3 py-3 bg-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none placeholder:text-[#7A7A7A] sm:text-sm"
                    placeholder="Enter your comment"
                  />
                </div>
                {validationErrors &&
                  validationErrors.errors.find(
                    (error) => error.path[0] === "comment"
                  ) && (
                    <div className="text-red-500">
                      {
                        validationErrors.errors.find(
                          (error) => error.path[0] === "comment"
                        )?.message
                      }
                    </div>
                  )}
              </div>
              <div>
                <label
                  htmlFor="likeCount"
                  className="pl-2 block text-sm font-bold text-[#424D6A]"
                >
                  Like count
                </label>
                <div className="mt-1 relative flex gap-2">
                  <input
                    type="number"
                    name="likeCount"
                    value={formValues.likeCount && count.toString()}
                    onChange={(e) => {
                      setFormValues({
                        ...formValues,
                        likeCount: parseInt(e.target.value) || 0,
                      });
                      setCount(Number(e.target.value));
                    }}
                    className="appearance-none block w-full px-3 py-3 bg-white rounded-md shadow-sm focus:outline-none placeholder:text-[#7A7A7A] sm:text-sm"
                    placeholder="Enter the like count"
                  />
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      name="liked"
                      id="liked"
                      onChange={() => {
                        setFormValues({
                          ...formValues,
                          liked: !formValues.liked,
                        });
                        setToggleLike(!toggleLike);
                        setCount(toggleLike ? count + 1 : count - 1);
                      }}
                    />
                    <label className="font-sm text-[#424D6A] text-[12px] pt-1">
                      Liked
                    </label>
                  </div>
                </div>
                {validationErrors &&
                  validationErrors.errors.find(
                    (error) => error.path[0] === "likeCount"
                  ) && (
                    <div className="text-red-500">
                      {
                        validationErrors.errors.find(
                          (error) => error.path[0] === "likeCount"
                        )?.message
                      }
                    </div>
                  )}
              </div>

              <div className="">
                <button
                  type="submit"
                  onClick={handleFormSubmit}
                  className="flex gap-2 group relative w-full h-[40px] justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#9BE5AB] hover:opacity-90"
                >
                  <Image src={sendVector} alt="sendVector" className="w-4" />
                  <label className="text-[#424D6A] font-bold cursor-pointer">
                    Generate Comment
                  </label>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
