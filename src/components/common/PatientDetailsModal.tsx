import { useGetPatientsSummaryByIdQuery } from "@/redux/apis/patientsApi";
import { closeModal } from "@/redux/slice/modal";
import type { AppDispatch, RootState } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import { skipToken } from "@reduxjs/toolkit/query";

const PatientDetailsModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const modalState = useSelector((state: RootState) => state.modal);
  const patientId = modalState.data as string | null;

  const { data, isLoading } = useGetPatientsSummaryByIdQuery(
    patientId ?? skipToken
  );

  const basic_info = data?.basic_info;

  const handleClose = () => dispatch(closeModal());

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {basic_info?.first_name} {basic_info?.last_name}
              </h3>
              <p className="text-sm text-gray-500">
                DOB: {basic_info?.dob} · Sex: {basic_info?.sex}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-50 rounded-lg p-3 border">
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <div>Blood Pressure:</div>
                <div className="font-medium">
                  {basic_info?.bp_s} / {basic_info?.bp_d}
                </div>

                <div>Heart Rate:</div>
                <div className="font-medium">{basic_info?.hr}</div>

                <div>Temperature:</div>
                <div className="font-medium">{basic_info?.temperature}</div>

                <div>O₂ %:</div>
                <div className="font-medium">{basic_info?.o2_percent}</div>

                <div>Height:</div>
                <div className="font-medium">{basic_info?.height}</div>

                <div>Weight:</div>
                <div className="font-medium">{basic_info?.weight}</div>

                <div>BMI:</div>
                <div className="font-medium">{basic_info?.bmi}</div>

                <div>PHQ9 Score:</div>
                <div className="font-medium">{basic_info?.phq9_score}</div>

                <div>Cognitive Score:</div>
                <div className="font-medium">{basic_info?.cognitive_score}</div>

                <div>ACP Status:</div>
                <div className="font-medium">{basic_info?.acp_status}</div>

                <div>Care Plan Status:</div>
                <div className="font-medium">{basic_info?.careplan_status}</div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700"
            >
              Close
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default PatientDetailsModal;
