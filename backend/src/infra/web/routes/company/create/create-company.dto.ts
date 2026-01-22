export type CreateCompanyRouteRequest = {
  name: string;
  cnpj: string;
  cep: string;
};

export type CreateCompanyRouteResponse = {
  id: string;
};
