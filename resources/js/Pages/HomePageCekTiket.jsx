import Homepage from "@/Layouts/Homepage";

import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import React from "react";
import {
    Clock,
    CheckCircle,
    Send,
    FileText,
    X,
    Loader,
    Download,
} from "lucide-react";

export default function HomePageCekTiket({ data, tindak_lanjut, feedback }) {
  
    console.log(feedback);
    const [ratings, setRatings] = useState({
        kecepatan: 2,
        kesesuaian: 2,
        kemudahan: 2,
    });
    const [saran, setSaran] = useState("");

    const handleRatingChange = (name, value) => {
        setRatings((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post("/feedback", {
            id_permohonan_layanan: data.id_permohonan_layanan,
            no_tiket: data.no_tiket,
            kecepatan: ratings.kecepatan,
            kesesuaian: ratings.kesesuaian,
            kemudahan: ratings.kemudahan,
            saran: saran,
        });
    };
   const [showModal, setShowModal] = useState(false);

const handleDownload = () => {
  if (!feedback || Object.keys(feedback).length === 0) {
    setShowModal(true);
    return;
  }

  window.location.href = `/storage/${tindak_lanjut.file_lampiran}`;
};




    return (
        <Homepage>
            <div className="mockup-window border border-base-300 max-w-4xl mx-auto pt-40">
                <div className="border-t border-base-300 p-10 space-y-8">
                    {/* ✅ 2 kolom kiri & kanan */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Kolom kiri */}
                        <div className="bg-base-200 p-6 rounded-lg shadow">
                            <h1 className="text-xl font-bold mb-4">
                                Detail Tiket
                            </h1>
                            <p>
                                <strong>Nama Pemohon:</strong>{" "}
                                {data.nama_pemohon}
                            </p>
                            <p>
                                <strong>Email:</strong> {data.email}
                            </p>
                            <p>
                                <strong>Karegori:</strong>{" "}
                                {data.kategori_pengguna}
                            </p>
                            <p>
                                <strong>Layanan:</strong> {data.nama_layanan}
                            </p>
                            <p>
                                <strong>No Tiket:</strong> {data.no_tiket}
                            </p>
                            <p>
                                <strong>Tanggal Pengajuan:</strong>{" "}
                                {data.tanggal_pengajuan}
                            </p>
                        </div>

                        {/* Kolom kanan */}
                        <div className="bg-base-200 p-6 rounded-lg shadow">
                            <h2 className="text-lg font-semibold mb-4">
                                Informasi Tambahan
                            </h2>
                            <p>
                                <strong>Status:</strong> {data.status}
                            </p>
                            <p>
                                <strong>
                                    Keterangan: {data.keterangan_tiket}
                                </strong>
                            </p>
                            <p>
                                <strong>Tanggal:</strong>
                                <span>
                                    {tindak_lanjut?.updated_at
                                        ? new Date(
                                              tindak_lanjut.updated_at
                                          ).toLocaleString()
                                        : data?.updated_at
                                        ? new Date(
                                              data.updated_at
                                          ).toLocaleString()
                                        : "-"}
                                </span>
                            </p>
                           {data.status === "selesai" ? (
    <p className="flex items-center gap-2">
        <strong>File:</strong>
        <button
            onClick={handleDownload}
            className="text-green-600 hover:underline flex items-center gap-1"
        >
            <Download /> Download
        </button>
    </p>
) : null}

                        </div>
                    </div>
                    <div className="w-full">
                        {data.status === "selesai" ? (
                            <>
                                <ul className="steps w-full">
                                    <li className="step step-success">
                                        <span className="step-icon">
                                            <FileText size={18} />
                                        </span>
                                        Pengajuan
                                    </li>
                                    <li className="step step-success">
                                        <span className="step-icon">
                                            <Clock size={18} />
                                        </span>
                                        Diterima
                                    </li>
                                    <li className="step step-success">
                                        <span className="step-icon">
                                            <Loader size={18} />
                                        </span>
                                        Diproses
                                    </li>
                                    <li className="step step-success">
                                        <span className="step-icon">
                                            <CheckCircle size={18} />
                                        </span>
                                        Selesai
                                    </li>
                                </ul>
                            </>
                        ) : data.status === "ditolak" ? (
                            <>
                                <ul className="steps w-full">
                                    <li className="step step-error">
                                        <span className="step-icon">
                                            <FileText size={18} />
                                        </span>
                                        Pengajuan
                                    </li>
                                    <li className="step step-error">
                                        <span className="step-icon">
                                            <X size={18} />
                                        </span>
                                        Ditolak
                                    </li>
                                    <li className="step step">
                                        <span className="step-icon">
                                            <Loader size={18} />
                                        </span>
                                        Diproses
                                    </li>
                                    <li className="step">
                                        <span className="step-icon">
                                            <CheckCircle size={18} />
                                        </span>
                                        Selesai
                                    </li>
                                </ul>
                            </>
                        ) : data.status === "diproses" ? (
                            <>
                                <ul className="steps w-full">
                                    <li className="step step-warning">
                                        <span className="step-icon">
                                            <FileText size={18} />
                                        </span>
                                        Pengajuan
                                    </li>
                                    <li className="step step-warning">
                                        <span className="step-icon">
                                            <Clock size={18} />
                                        </span>
                                        Diterima
                                    </li>
                                    <li className="step step-warning">
                                        <span className="step-icon">
                                            <Loader size={18} />
                                        </span>
                                        Diproses
                                    </li>
                                    <li className="step">
                                        <span className="step-icon">
                                            <CheckCircle size={18} />
                                        </span>
                                        Selesai
                                    </li>
                                </ul>
                            </>
                        ) : data.status === "diterima" ? (
                            <>
                                <ul className="steps w-full">
                                    <li className="step step-info">
                                        <span className="step-icon">
                                            <FileText size={18} />
                                        </span>
                                        Pengajuan
                                    </li>
                                    <li className="step step-info">
                                        <span className="step-icon">
                                            <Clock size={18} />
                                        </span>
                                        Diterima
                                    </li>
                                    <li className="step">
                                        <span className="step-icon">
                                            <Loader size={18} />
                                        </span>
                                        Diproses
                                    </li>
                                    <li className="step">
                                        <span className="step-icon">
                                            <CheckCircle size={18} />
                                        </span>
                                        Selesai
                                    </li>
                                </ul>
                            </>
                        ) : data.status === "menunggu" ? (
                            <>
                                <ul className="steps w-full">
                                    <li className="step step-neutral">
                                        <span className="step-icon">
                                            <FileText size={18} />
                                        </span>
                                        Pengajuan
                                    </li>
                                    <li className="step ">
                                        <span className="step-icon">
                                            <Clock size={18} />
                                        </span>
                                        Diterima
                                    </li>
                                    <li className="step">
                                        <span className="step-icon">
                                            <Loader size={18} />
                                        </span>
                                        Diproses
                                    </li>
                                    <li className="step">
                                        <span className="step-icon">
                                            <CheckCircle size={18} />
                                        </span>
                                        Selesai
                                    </li>
                                </ul>
                            </>
                        ) : null}
                    </div>

                    {data.status === "selesai" && !feedback ? (
                        <>
                            {/* ✅ Rating Section - Minimalis */}
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <h2 className="text-base font-semibold">
                                    Feedback
                                </h2>

                                {[
                                    { label: "Kecepatan", name: "kecepatan" },
                                    { label: "Kesesuaian", name: "kesesuaian" },
                                    { label: "Kemudahan", name: "kemudahan" },
                                ].map((item) => (
                                    <div
                                        key={item.name}
                                        className="flex items-center justify-between"
                                    >
                                        <span className="text-sm">
                                            {item.label}
                                        </span>
                                        <div className="rating rating-sm">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <input
                                                    key={star}
                                                    type="radio"
                                                    name={item.name}
                                                    className="mask mask-star-2 bg-orange-400"
                                                    aria-label={`${star} star`}
                                                    checked={
                                                        ratings[item.name] ===
                                                        star
                                                    }
                                                    onChange={() =>
                                                        handleRatingChange(
                                                            item.name,
                                                            star
                                                        )
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                <div>
                                    <textarea
                                        placeholder="Saran..."
                                        className="textarea textarea-bordered textarea-sm w-full"
                                        value={saran}
                                        onChange={(e) =>
                                            setSaran(e.target.value)
                                        }
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success btn-sm w-full"
                                >
                                    Kirim
                                </button>
                            </form>
                        </>
                    ) : data.status === "selesai" && feedback ? (
                        <>
                            <h2 className="text-base font-semibold">
                                Feedback
                            </h2>

                            {[
                                {
                                    label: "Kecepatan",
                                    name: "kecepatan",
                                    value: feedback.kecepatan,
                                },
                                {
                                    label: "Kesesuaian",
                                    name: "kesesuaian",
                                    value: feedback.kesesuaian,
                                },
                                {
                                    label: "Kemudahan",
                                    name: "kemudahan",
                                    value: feedback.kemudahan,
                                },
                            ].map((item) => (
                                <div
                                    key={item.name}
                                    className="flex items-center justify-between"
                                >
                                    <span className="text-sm">
                                        {item.label}
                                    </span>
                                    <div className="rating rating-sm">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <input
                                                key={star}
                                                type="radio"
                                                name={item.name}
                                                className="mask mask-star-2 bg-orange-400"
                                                aria-label={`${star} star`}
                                                disabled
                                                checked={item.value === star}
                                                readOnly
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div>
                                <textarea
                                    placeholder="Saran..."
                                    className="textarea textarea-bordered textarea-sm w-full"
                                    value={feedback.saran}
                                    disabled
                                ></textarea>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
          {showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center">
      <h3 className="text-lg font-bold mb-2">Feedback Diperlukan</h3>
      <p className="text-sm text-gray-600">
        Silakan isi feedback terlebih dahulu sebelum mengunduh lampiran.
      </p>
      <div className="mt-4 flex justify-center gap-2">
        <button
          className="btn btn-sm btn-primary"
          onClick={() => setShowModal(false)}
        >
          OK, Mengerti
        </button>
      </div>
    </div>
  </div>
)}


        </Homepage>
    );
}
