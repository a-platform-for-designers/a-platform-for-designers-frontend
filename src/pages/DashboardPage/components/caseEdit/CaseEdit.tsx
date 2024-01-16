import { StyledEngineProvider } from "@mui/material";
import { useParams } from "react-router-dom";
import { ICase } from "@/types";
import { useState, useEffect } from "react";
import { casesService } from "@/api";
import CaseCreation from "../caseCreation/CaseCreation";
import Preloader from "@/shared/Preloader/Preloader";

const CaseEdit: React.FC = () => {
  const { id } = useParams();
  const [caseInfo, setCaseInfo] = useState<ICase>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const caseData = await casesService.getCaseById(Number(id));
        console.log(caseData);
        setCaseInfo(caseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <StyledEngineProvider injectFirst>
      {isLoading ? <Preloader /> : <CaseCreation caseInfo={caseInfo} />}
    </StyledEngineProvider>
  );
};

export default CaseEdit;
