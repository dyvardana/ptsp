
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TableListLayanan from "./Komponen/TableListLayanan";


export default function KelolaLayanan(props) {
  

  return (
    <AuthenticatedLayout>
      <div className="mockup-window bg-base-100 border border-base-300">
        <TableListLayanan datalist={props.list} />
      </div>
    </AuthenticatedLayout>
  );
}
