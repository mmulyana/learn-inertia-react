import { Head } from "@inertiajs/react";
import GuestLayout from "vendor/laravel/breeze/stubs/inertia-vue-ts/resources/js/Layouts/GuestLayout.vue";

export default function Error() {
    return (
        <GuestLayout>
            <Head title="An error occured" />
            <div className="mb-4 font-medium text-sm text-red-600">
                An Error Occurred
            </div>
        </GuestLayout>
    );
}
