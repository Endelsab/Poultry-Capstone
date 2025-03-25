import { Html, Heading } from "@react-email/components";
import * as React from "react";

export const EmailTemplate = (username: string, status: string) => (
     <Html>
          <Heading>Hi {username}!</Heading>
          <p>{status}</p>
     </Html>
);
