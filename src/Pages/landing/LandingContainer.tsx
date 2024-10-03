import React, { useState } from "react";
import LandingPresentation from "./LandingPresentation";

const LandingContainer = () => {
  const [liked, setLiked] = useState<boolean>(false);

  const handleChangeLike = () => {
    setLiked(!liked);
  }

  return (
  <LandingPresentation 
  liked={liked} 
  setLike={setLiked} 
  handleChangeLike={handleChangeLike}
  />
);
};

export default LandingContainer;
