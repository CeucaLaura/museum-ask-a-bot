import { isEmpty } from "lodash";

const ENV =
  process && !isEmpty(process.env) ? process.env : (window as any)["__ENV__"]; // eslint-disable-line dot-notation

export default ENV;
