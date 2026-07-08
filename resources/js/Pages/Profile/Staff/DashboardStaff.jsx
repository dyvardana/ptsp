import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TableLayananStaff from '@/Pages/TableLayananStaff';
import { Head } from '@inertiajs/react';



export default function DashboardStaff(props) {
    
    return (
        
        <AuthenticatedLayout diproses={props.diproses} selesai={props.selesai} jumlah={props.jumlah} >
            <Head title={props.title}/>
            <TableLayananStaff data={props.data}/>
           
        </AuthenticatedLayout>
    );
}
