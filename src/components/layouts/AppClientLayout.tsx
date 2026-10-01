import { getSearchIndex } from "@/packages/utils/loader";
import { SearchProvider } from "../features/search/SearchProvider";
import NavigationProvider from "../providers/NavigationProvider";
import { StyleProvider } from "../providers/StyleProvider";
import ThemeProvider from "../providers/ThemeProvider";
import BackgroundFadeEffectImage from "../ui/backgrounds/BackgroundFadeEffectImage";
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
            {/* <BackgroundGridEffect /> */}
            <BackgroundFadeEffectImage
              images={[
                { src: "/images/backgrounds/bg-01.jpg", alt: "Background" },
              ]}
            />
            <main className="main screen-height" id="main">
              {children}
            </main>
            <Footer />
          </SearchProvider>
        </NavigationProvider>
      </StyleProvider>
    </ThemeProvider>
  );
};

export default AppClientLayout;
