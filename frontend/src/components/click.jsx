"use client";
import { motion } from "framer-motion";

import React from "react";

const Click = ({ children, noTap = true }) => {
  return <motion.div whileTap={noTap && { scale: 0.9 }}>{children}</motion.div>;
};

export default Click;
