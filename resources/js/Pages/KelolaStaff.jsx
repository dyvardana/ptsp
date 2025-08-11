import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import { Table } from "lucide-react";
import TableListStaff from "./Komponen/TableListStaff";

export default function KelolaStaff(props) {
    console.log('Kelola Staff :', props);
    return (
       
        <AuthenticatedLayout

            auth={props.auth}
            errors={props.errors}
        >
            <Head title={props.title} />
            <div className='flex justify-center items-center '>
                 <TableListStaff data={props.staff}/> 
            </div>
        </AuthenticatedLayout>
    );
}