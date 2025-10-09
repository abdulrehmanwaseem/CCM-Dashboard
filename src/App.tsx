import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { ScrollToTop } from "./components/common/ScrollToTop";
import AppLayout from "./layout/AppLayout";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import PatientRecords from "./pages/Patients";
import Blank from "./pages/Blank";
import Calendar from "./pages/Calendar";
import BarChart from "./pages/Charts/BarChart";
import LineChart from "./pages/Charts/LineChart";
import Home from "./pages/Dashboard/Home";
import FormElements from "./pages/Forms/FormElements";
import NotFound from "./pages/OtherPage/NotFound";
import Alerts from "./pages/UiElements/Alerts";
import Avatars from "./pages/UiElements/Avatars";
import Badges from "./pages/UiElements/Badges";
import Buttons from "./pages/UiElements/Buttons";
import Images from "./pages/UiElements/Images";
import Videos from "./pages/UiElements/Videos";
import UserProfiles from "./pages/UserProfiles";
// import ViewCSV from "./pages/CSVRecords/ViewCSV";
import { setAuthenticated, setUnAuthenticated } from "./redux/slice/auth";
import Gaps from "./pages/Patients/gaps";
import Vitals from "./pages/Patients/vitals";
import Medications from "./pages/Patients/medications";
import Metrics from "./pages/Patients/metrics";
import History from "./pages/Patients/history";
import HistoryDetail from "./pages/Patients/history/HistoryDetail";

export default function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const excludedEndpoints = [""];
  const auth = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (auth === "true") {
      const userData = localStorage.getItem("userData");
      if (userData) {
        dispatch(setAuthenticated(JSON.parse(userData)));
      } else {
        dispatch(setAuthenticated(null));
      }
    } else {
      dispatch(setUnAuthenticated());
    }
  }, [dispatch, auth]);

  const isSomeQueryPending = useSelector(
    (state: RootState) =>
      Object.values(state.apis?.queries || {}).some(
        (query) =>
          query?.status === "pending" &&
          !excludedEndpoints.includes(query?.endpointName)
      ) ||
      Object.values(state.apis?.mutations || {}).some(
        (mutation) =>
          mutation?.status === "pending" &&
          !excludedEndpoints.includes(mutation?.endpointName)
      )
  );
  console.log("isSomeQueryPending", isSomeQueryPending);

  return (
    <>
      {/* {isSomeQueryPending && <Spinner />} */}

      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Auth Layout */}
          <Route
            path="/signin"
            element={<SignIn isAuthenticated={isAuthenticated} />}
          />
          <Route path="/signup" element={<SignUp />} />
          {/* Dashboard Layout */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index path="/" element={<Home />} />
            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            {/* <Route path="/csv/view" element={<ViewCSV />} /> */}
            <Route path="/patients" element={<PatientRecords />} />
            <Route path="/patients/gaps" element={<Gaps />} />
            <Route path="/patients/vitals" element={<Vitals />} />
            <Route path="/patients/medications" element={<Medications />} />
            <Route path="/patients/metrics" element={<Metrics />} />
            <Route path="/patients/history" element={<History />} />
            <Route path="/patients/history/:id" element={<HistoryDetail />} />

            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
