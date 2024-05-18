import React, { FC, PropsWithChildren } from "react";
import { ApolloProvider } from "@apollo/client";

import { Footer, NavBar } from "@/components/layout";
import { AuthContextProvider, Errors, HistoryContextProvider } from "@/features";
import { client } from "@/graphql";

export const Body: FC<PropsWithChildren> = ({ children }) => {
  return (
    <body style={{ margin: 0, display: "flex", flexFlow: "column", minHeight: "100vh" }}>
      <ApolloProvider client={client}>
        <HistoryContextProvider>
          <AuthContextProvider>
            <NavBar />
            <main
              style={{
                flex: 1,
                margin: 2,
                display: "flex",
                justifyContent: "center",
                padding: 15,
              }}>
              {children}
            </main>
            <Errors />
            <Footer />
          </AuthContextProvider>
        </HistoryContextProvider>
      </ApolloProvider>
    </body>
  );
};
