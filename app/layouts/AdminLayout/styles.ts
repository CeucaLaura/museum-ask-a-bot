import css from "styled-jsx/css";

import DIMS from "~/constants/dims";

export default css`
  .main-container {
    height: 100%;
    margin-left: ${DIMS.WIDTHS.SIDEBAR}px;
    overflow-x: hidden;
    width: calc(100% - ${DIMS.WIDTHS.SIDEBAR}px);
  }
  .page-container {
    height: 100%;
    width: 100%;
  }
`;
