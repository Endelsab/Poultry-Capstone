export {};

// Create a type for the roles
export type Roles = "admin" | "costumer";

declare global {
     interface CustomJwtSessionClaims {
          metadata: {
               role?: Roles;
          };
     }
}
