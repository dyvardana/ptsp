import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TableLayanan from './TableLayanan';

export default function Dashboard(props) {
    //console.log('dashboard :',props);
    return (
        <AuthenticatedLayout
           
        >
            <Head title={props.title}/>
            
            <TableLayanan data={props.data}/>
        </AuthenticatedLayout>
    );
}
