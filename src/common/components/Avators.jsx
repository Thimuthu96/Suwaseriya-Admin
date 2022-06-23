import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import profile from "../../assets/images/profile.png";

const Avators = () => {
  return (
    <div>
      <Stack direction="row">
        <Avatar alt="Travis Howard" src={profile} />
      </Stack>
    </div>
  );
};

export default Avators;
