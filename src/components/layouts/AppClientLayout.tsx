import { getSearchIndex } from "@/packages/utils/loader";
import { SearchProvider } from "../features/search/SearchProvider";
import NavigationProvider from "../providers/NavigationProvider";
import { StyleProvider } from "../providers/StyleProvider";
import ThemeProvider from "../providers/ThemeProvider";
import BackgroundGridEffect from "../ui/backgrounds/BackgroundGridEffect";
import Footer from "./Footer";
import Header from "./Header";

interface AppClientLayoutProps {
  children: React.ReactNode;
}
const AppClientLayout = ({ children }: AppClientLayoutProps) => {
  return (
    <ThemeProvider>
      <StyleProvider>
        <NavigationProvider>
          <SearchProvider index={getSearchIndex()}>
            <Header />
            <BackgroundGridEffect />
            <main className="main screen-height">{children}</main>
            <Footer />
          </SearchProvider>
        </NavigationProvider>
      </StyleProvider>
    </ThemeProvider>
  );
};

export default AppClientLayout;
