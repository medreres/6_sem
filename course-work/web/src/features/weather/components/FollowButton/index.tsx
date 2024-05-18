import React, { FC } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

interface FollowButtonProps {
  onClick: () => any;
  following: boolean;
  loading: boolean;
}

export const FollowButton: FC<FollowButtonProps> = ({ onClick, following, loading }) => {
  return (
    <LoadingButton
      onClick={onClick}
      variant="outlined"
      color={following ? "error" : "primary"}
      endIcon={loading ? <SaveIcon /> : following ? <DeleteOutlineIcon /> : <FavoriteBorderIcon />}
      loading={loading}>
      {following ? "Unfollow" : "Follow"}
    </LoadingButton>
  );
};
