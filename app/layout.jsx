import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";


export const metadata = {
  title: "Promptcom",
  description: "The community for prompts and ideas",
  icons: {
    icon: "/assets/images/icon.svg",
  },
};

const layout = ({children}) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

export default layout
