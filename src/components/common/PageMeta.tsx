import { HelmetProvider, Helmet } from "react-helmet-async";
import { store } from "@/redux/store/index.ts";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

const PageMeta = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Helmet>
);

export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <HelmetProvider>
    <Toaster position="top-right" reverseOrder={false} />
    <Provider store={store}>{children} </Provider>
  </HelmetProvider>
);

export default PageMeta;
