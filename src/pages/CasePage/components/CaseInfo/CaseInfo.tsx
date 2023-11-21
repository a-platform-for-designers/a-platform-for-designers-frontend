import {
  Grid,
  Paper,
  Stack,
  StyledEngineProvider,
  Typography,
} from "@mui/material";
import "./CaseInfo.scss";
import React from "react";
import { ICase } from "../../../../types";

interface ICaseInfoProps {
  data: ICase;
}

const CaseInfo: React.FC<ICaseInfoProps> = ({ data }) => {
  const { title, sphere, working_term, description } = data;

  return (
    <StyledEngineProvider injectFirst>
      <Grid
        className="caseInfo"
        container
        gap="12px"
        wrap="nowrap"
        justifyContent="flex-start"
        flexDirection="column"
        component={Paper}
      >
        <Typography className="caseInfo__title" component="h3">
          {title}
        </Typography>
        <Typography className="caseInfo__text" component="p">
          {description}
        </Typography>
        <Typography className="caseInfo__deadline" component="p">
          Срок реализации: {working_term}
        </Typography>
        <Stack
          className={`${"caseInfo__list"}`}
          component="ul"
          color="secondary"
          sx={{
            color: (theme) => theme.palette.text.secondary,
            borderColor: (theme) => theme.palette.text.secondary,
          }}
        >
          <li className={`${"caseInfo__list-item"}`} key={sphere.id}>
            {sphere.name}
          </li>
        </Stack>
      </Grid>
    </StyledEngineProvider>
  );
};

export default CaseInfo;
