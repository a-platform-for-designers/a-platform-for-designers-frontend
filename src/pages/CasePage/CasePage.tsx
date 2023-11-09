import { Container, StyledEngineProvider } from "@mui/material";
import "./CasePage.scss";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { casesService } from "../../api";
import { ICase } from "../../types";

const CasePage: React.FC = () => {
  const { id } = useParams();

  const [caseData, setCaseData] = useState<ICase>();

  useEffect(() => {
    if (id) {
      casesService
        .getCaseById(Number(id))
        .then((res) => {
          setCaseData(res);
        })
        .catch(console.log)
        .finally(() => {
          console.log("finally in case page");
        });
    }
  }, [id]);

  return (
    <StyledEngineProvider injectFirst>
      <Container component="section" className="CasePage">
        {caseData?.author}
      </Container>
    </StyledEngineProvider>
  );
};

export default CasePage;
