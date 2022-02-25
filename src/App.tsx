import React from "react";
import Container from "components/Container";
import DetailPage from "pages/DetailPage";
import LinkPage from "pages/LinkPage";
import GlobalStyle from "styles/GlobalStyle";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <GlobalStyle />
      <Container>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path={"/"} element={<LinkPage />} />
              <Route path={"/files/:key"} element={<DetailPage />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </Container>
    </>
  );
}

export default App;
