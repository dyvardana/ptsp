import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TableLayananStaff from './TableLayananStaff';

export default function DashboardStaff(props) {
    
    return (
        
        <AuthenticatedLayout
           
        >
            <Head title={props.title}/>
            <TableLayananStaff data={props.data}/>
           
        </AuthenticatedLayout>
    );
}
