import React, { Component } from "react";
import { Modal, Button } from "antd";
import { Content } from "./ContentHTML";
import { TestPDF } from "./app/main";
export default class ConentReport extends Component {
  state = {
    loading: false,
    visible: false,
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  render() {
    const { visible, loading } = this.state;
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Xem report
        </Button>
        <Modal
          visible={visible}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Content />
          {/* <TestPDF /> */}
        </Modal>
      </>
    );
  }
}
