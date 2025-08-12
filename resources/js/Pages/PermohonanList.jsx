import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TableLayanan from './TableLayanan';
import {
  Clock,Eye,ListChecks,Loader2,CheckCircle,XCircle,X} from 'lucide-react';
export default function PermohonanList(props) {
   // console.log('dashboard :',props);
    return (
        <AuthenticatedLayout
           
        >
            <Head title={props.title}/>
        <div className='flex justify-center items-center flex-col gap-4 p-4'>
            <div className="stats bg-base-100 shadow">
                <div className="stat bg-base-100">
                  <div className="stat-figure text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-8 w-8 stroke-current"
                    >
                      <Clock/>
                    </svg>
                  </div>
                  <div className="stat-title">Menunggu</div>
                  <div className="stat-value">{props.statusData.menunggu}</div>
                  <div className="stat-desc">Layanan</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-8 w-8 stroke-current"
                    >
                      <ListChecks />
                    </svg>
                  </div>
                  <div className="stat-title">Diterima</div>
                  <div className="stat-value">{props.statusData.diterima}</div>
                  <div className="stat-desc">Layanan</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-yellow-500">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                    <div className="stat-title">Diproses</div>
                    <div className="stat-value">{props.statusData.diproses}</div>
                    <div className="stat-desc">Layanan</div>
                    </div>
                <div className="stat">
                    <div className="stat-figure text-green-500">
                        <CheckCircle className="h-8 w-8" />
                    </div>
                    <div className="stat-title">Selesai</div>
                    <div className="stat-value">{props.statusData.selesai}</div>
                    <div className="stat-desc">Layanan</div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-red-500">
                        <X className="h-8 w-8" />
                    </div>
                    <div className="stat-title">Ditolak</div>
                    <div className="stat-value">{props.statusData.ditolak}</div>
                    <div className="stat-desc">Layanan</div>
                </div>
              </div>
      </div>

            <TableLayanan  data={props.data} staff={props.staff}/>
        </AuthenticatedLayout>
    );
}
