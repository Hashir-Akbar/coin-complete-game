"use client"
import React, { useState } from "react";
import { Button, Modal } from "antd";
const WithdrawModal = ({ click, children, title, shouldModal }) => {
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  return (
    <>
      <div onClick={() => shouldModal && setModal2Open(true)}>{click}</div>
      <Modal
        title={title}
        centered
        open={modal2Open}
        onOk={() => _gD()}
        onCancel={() => setModal2Open(false)}
      >
        {children}
      </Modal>
    </>
  );
};
export default WithdrawModal;
