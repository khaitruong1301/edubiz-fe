import React, { Component } from 'react'
import { Table, Input, Button, Icon , Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { LAY_DANH_SACH_LO_TRINH } from '../../redux/types/ActionsTypes';
import QuanLyNguoiDung from './QuanLyNguoiDung';


class QuanLyLoTrinh extends Component {
    state = {
        //khoi tao search table
        searchText: '',
        searchedColumn: '',

        visible: false,//khoi tao cho modal popup dieu khoan
        modalAction:"abc", //khoi tao popup
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Tìm
            </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Xoá
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                    text
                ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

     //xu ly modal popup dieu khoan
     showModal = () => {
        this.setState({
            visible: true,
        });
    };


    closeModal = () => {
        this.setState({
            visible: false
        });
    };

    //xu ly cap nhat lo trinh
    handleSua = (idLoTrinh) =>{
        this.setState({
            modalAction:""
        })
        this.showModal();
    }

    //xu ly xoa lo trinh
    handleXoa = (idLoTrinh) =>{
        this.setState({
            modalAction:<QuanLyNguoiDung idLoTrinh={idLoTrinh} />,
        })
        this.showModal();
    }

    render() {

        const columns = [
            {
                title: 'TÊN LỘ TRÌNH',
                dataIndex: 'tenLoTrinh',
                key: 'tenLoTrinh',
                width: '20%',
                ...this.getColumnSearchProps('tenLoTrinh'),
            },
            {
                title: 'NGÔN NGỮ',
                dataIndex: 'ngonNgu',
                key: 'ngonNgu',
                width: '20%',
                ...this.getColumnSearchProps('ngonNgu'),
            },
            {
                title: 'GIÁ',
                dataIndex: 'gia',
                key: 'gia',
            },
            {
                title: 'TỔNG THỜI LƯỢNG',
                dataIndex: 'tongThoiLuong',
                key: 'tongThoiLuong',
            },
            {
                title: '',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button type="primary" icon="edit" onClick={()=>this.handleSua(record.id)}/>
                        <span className="pr-2"></span>
                        <Button type="danger" icon="delete" onClick={()=>this.handleXoa(record.id)}/>
                    </span>
                ),
            },
        ];

        return (
            <div className="container" style={{ background: "white" }}>
                <div className="p-2">
                    <button type="button" class="btn btn-success"><i className="fa fa-plus"></i> THÊM LỘ TRÌNH</button>
                </div>
                <div>
                    <Table columns={columns} dataSource={this.props.dsLoTrinh} pagination={{ defaultPageSize: 10 }} />
                </div>
                <Modal visible={this.state.visible} onCancel={this.closeModal} width={1000} footer={null}>
                    {this.state.modalAction}
                </Modal>
            </div>
        )
    }
    componentDidMount = () => {
        this.props.dispatch({ type: LAY_DANH_SACH_LO_TRINH }) // lay danh sach lo trinh tu store
    }
}

const mapStateToProps = (state) => {

    return {
        dsLoTrinh: state.LoTrinhReducer.dsLoTrinh,
    }

}

export default connect(mapStateToProps)(QuanLyLoTrinh)


