/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module "vuejs-paginate-next" {
  const Paginate: any;
  export default Paginate;
}
