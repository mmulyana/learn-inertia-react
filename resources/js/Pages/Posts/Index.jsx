import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Dashboard({ auth, posts }) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm("postForm", {
            body: "",
        });

    const page = usePage();

    useEffect(() => {
        if (page?.props?.response?.body) {
            toast(page.props.response.body, {
                type: page.props.response.type,
                position: "top-right",
            });
        }
    }, [page.props?.response]);

    const submit = (e) => {
        e.preventDefault();
        post(route("posts.store"), {
            onSuccess: () => {
                reset();
                // toast.success("success create post");
            },
        });
    };

    const refresh = () =>
        router.visit(route("posts.index"), {
            only: ["posts"],
            preserveScroll: true,
            preserveState: true,
        });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Posts
                </h2>
            }
        >
            <Head title="Posts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-4">
                    <form
                        className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4"
                        onSubmit={submit}
                    >
                        <label htmlFor="body" className="sr-only">
                            Body
                        </label>
                        <textarea
                            name="body"
                            id="body"
                            cols="30"
                            rows="5"
                            onFocus={() => clearErrors("body")}
                            value={data.body}
                            onChange={(e) => setData("body", e.target.value)}
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-400 rounded-sm shadow-sm w-full"
                        ></textarea>
                        {errors.body && (
                            <p className="text-red-500 text-sm">
                                {errors.body}
                            </p>
                        )}
                        <button
                            type="submit"
                            disabled={processing}
                            className={[
                                "mt-2 bg-gray-700 px-4 py-2 rounded-md font-medium text-white",
                                processing ? "opacity-50" : "",
                            ].join(" ")}
                        >
                            {processing ? "Loading..." : "Post"}
                        </button>
                    </form>
                    <div className="flex justify-center gap-4 items-center">
                        <button
                            className="px-4 py-2 rounded-md bg-gray-700 text-white"
                            onClick={refresh}
                        >
                            Refresh
                        </button>
                        <Link
                            className="px-4 py-2 rounded-md bg-gray-700 text-white"
                            href={route("posts.index")}
                            only={["posts"]}
                            preserveScroll
                        >
                            Refresh By Link
                        </Link>
                    </div>
                    {!!posts.data.length &&
                        posts?.data?.map((post) => (
                            <div
                                key={post.id}
                                className="px-4 py-2 bg-white rounded-lg"
                            >
                                <p className="text-lg">{post.body}</p>
                            </div>
                        ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
