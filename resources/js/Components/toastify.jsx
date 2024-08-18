import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Toastify() {
    const page = usePage();

    useEffect(() => {
        if (page?.props?.response?.body) {
            toast(page.props.response.body, {
                type: page.props.response.type,
                position: "top-right",
            });
        }
    }, [page.props?.response]);
    
    return (
        <>
            <Toaster />
        </>
    );
}
