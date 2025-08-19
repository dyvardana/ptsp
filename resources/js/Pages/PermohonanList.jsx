import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TablePermohonanLayanan from './TablePermohonanLayanan';
import {
  Clock,Eye,ListChecks,Loader2,CheckCircle,XCircle,X} from 'lucide-react';
export default function PermohonanList(props) {
   // console.log('dashboard :',props);
    return (
        <AuthenticatedLayout
           
        >
            <Head title={props.title}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-4">
  <div className="stat bg-base-100 shadow rounded-xl p-4 
                  hover:scale-105 hover:shadow-xl hover:-translate-y-1 
                  transition-transform duration-300">
    <div className="stat-figure text-secondary">
      <Clock className="h-8 w-8" />
    </div>
    <div className="stat-title">Menunggu</div>
    <div className="stat-value">{props.statusData.menunggu}</div>
    <div className="stat-desc">Layanan</div>
  </div>

  <div className="stat bg-base-100 shadow rounded-xl p-4 
                  hover:scale-105 hover:shadow-xl hover:-translate-y-1 
                  transition-transform duration-300">
    <div className="stat-figure text-blue-500">
      <ListChecks className="h-8 w-8" />
    </div>
    <div className="stat-title">Diterima</div>
    <div className="stat-value">{props.statusData.diterima}</div>
    <div className="stat-desc">Layanan</div>
  </div>

  <div className="stat bg-base-100 shadow rounded-xl p-4 
                  hover:scale-105 hover:shadow-xl hover:-translate-y-1 
                  transition-transform duration-300">
    <div className="stat-figure text-yellow-500">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
    <div className="stat-title">Diproses</div>
    <div className="stat-value">{props.statusData.diproses}</div>
    <div className="stat-desc">Layanan</div>
  </div>

  <div className="stat bg-base-100 shadow rounded-xl p-4 
                  hover:scale-105 hover:shadow-xl hover:-translate-y-1 
                  transition-transform duration-300">
    <div className="stat-figure text-green-500">
      <CheckCircle className="h-8 w-8" />
    </div>
    <div className="stat-title">Selesai</div>
    <div className="stat-value">{props.statusData.selesai}</div>
    <div className="stat-desc">Layanan</div>
  </div>

  <div className="stat bg-base-100 shadow rounded-xl p-4 
                  hover:scale-105 hover:shadow-xl hover:-translate-y-1 
                  transition-transform duration-300">
    <div className="stat-figure text-red-500">
      <X className="h-8 w-8" />
    </div>
    <div className="stat-title">Ditolak</div>
    <div className="stat-value">{props.statusData.ditolak}</div>
    <div className="stat-desc">Layanan</div>
  </div>
</div>


            <TablePermohonanLayanan  data={props.data} staff={props.staff}/>
        </AuthenticatedLayout>
    );
}
