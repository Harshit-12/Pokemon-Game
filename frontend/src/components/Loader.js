import { Player } from "@lottiefiles/react-lottie-player";

import React from "react";

const Loader = ({ classes }) => {
  return (
    <Player
      src="https://assets9.lottiefiles.com/packages/lf20_x62chJ.json"
      className={`player ${classes}`}
      loop
      autoplay
    />
  );
};

export default Loader;
