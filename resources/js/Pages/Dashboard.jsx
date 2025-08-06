import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TableLayanan from './TableLayanan';

export default function Dashboard(props) {
    //console.log('dashboard :',props);
    return (
        <AuthenticatedLayout
           
        >
            <Head title="Dashboard" />
            
            <TableLayanan data={props.data}/>
        </AuthenticatedLayout>
    );
}
