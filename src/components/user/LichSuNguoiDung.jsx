import React, { Component } from 'react'
import { Table, Input, Button, Icon, DatePicker, Select } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import {  LAY_LICH_SU_TUONG_TAC_THEO_USER } from '../../redux/types/ActionsTypes';
import { dinhDangNgay, dinhDangNgayCheck } from '../../commons/format/FormatDate';
import { listHanhDong } from '../../redux/Config/LichSuDataStyle';

const InputGroup = Input.Group;
const { RangePicker } = DatePicker;
const { Option } = Select;

let valueNgayTao = "", valueHanhDong = "all";

class LichSuNguoiDung extends Component {
    state = {
        userLogin: JSON.parse(localStorage.getItem('checkLogin')),

        //khoi tao search table
        searchText: '',
        searchedColumn: '',

        visible: false,//khoi tao cho modal popup dieu khoan

        dataDSLichSu: this.props.dsLichSu
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

    // xu ly filter chinh 
    filterLichSu(datestring, hanhdong) {

        let { dsLichSu } = this.props;
        let data = dsLichSu;

        // filter theo ngay
        if (datestring != "") {
            if (datestring[0] !== undefined) {
                data = data.filter(function (product) {
                    var datestart = Date.parse(dinhDangNgayCheck(datestring[0]));
                    var dateend = Date.parse(dinhDangNgayCheck(datestring[1]));
                    var date = Date.parse(dinhDangNgayCheck(product.ngayTao));

                    if (date >= datestart && date <= dateend)
                        return product
                });
            }

        }

        //filter theo hanh dong
        if (hanhdong != "all") {
            switch (hanhdong) {
                case 0: {
                    data = data.filter(n => n.hanhDong == "WRITE" || n.hanhDong == "CREATE");
                    break;
                }
                case 1: {
                    data = data.filter(n => n.hanhDong == "HOANTHANHBAIHOC" || n.hanhDong == "BAIDANGHOC");
                    break;
                }
                case 2: {
                    data = data.filter(n => n.hanhDong == "GHIDANH" || n.hanhDong == "DANGKY" || n.hanhDong == "KICHHOAT");
                    break;
                }
            }
        }

        return data;

    }

    //filter theo ngay tao
    searchNgayTao = (datestring) => {

        let data = this.filterLichSu(datestring, valueHanhDong);
        valueNgayTao = datestring;
        this.setState({

            dataDSLichSu: data
        })
    }

    // xu ly filter
    xuatDSFilter = () => {

        return (
            <Select defaultValue="all" style={{ width: 150 }} onSelect={(value) => this.filterHanhDong(value)}>
                <Option value="all">Tất cả</Option>
                {
                    listHanhDong.map(ds => {
                        return (<Option value={ds.id}>{ds.name}</Option>)
                    })
                }

            </Select>
        )
    }

    filterHanhDong = (value) => {
        let data = this.filterLichSu(valueNgayTao, value);
        valueHanhDong = value;
        this.setState({

            dataDSLichSu: data
        })
    }


    render() {
        var HtmlToReactParser = require('html-to-react').Parser;
        var htmlToReactParser = new HtmlToReactParser();
        const columns = [
            {
                title: 'LỊCH SỬ',
                key: 'hoTen',
                render: (text, record) => (
                    htmlToReactParser.parse(record.content)
                ),
            },
            {
                title: 'THỜI GIAN',
                key: 'ngayTao',
                width: '35%',
                render: (text, record) => (
                    dinhDangNgay(record.ngayTao)
                ),
            },
        ];


        let { dataDSLichSu, userLogin } = this.state;

        //sort ngay moi nhat voi loc theo id user dang nhap
        dataDSLichSu = dataDSLichSu.filter(n => n.nguoiDungId == userLogin.id);
        dataDSLichSu = dataDSLichSu.sort((a, b) => Date.parse(b.ngayTao) - Date.parse(a.ngayTao));

        return (

            <div className="container" style={{ background: "white" }}>

                <h3 className="py-3"> LỊCH SỬ TƯƠNG TÁC</h3>
                <div className="row">
                    <div className="col-md-12 py-2">
                        <RangePicker format="DD/MM/YYYY" onChange={(datestring) => this.searchNgayTao(datestring)} />

                        {this.xuatDSFilter()}
                    </div>
                    <div className="col-md-12">
                        <Table columns={columns} dataSource={dataDSLichSu} pagination={{ defaultPageSize: 7 }} />
                    </div>
                </div>

            </div>
        )
    }
    componentDidMount = () => {
        const checkLogin =JSON.parse(localStorage.getItem('checkLogin'));

        this.props.dispatch({ type: LAY_LICH_SU_TUONG_TAC_THEO_USER, maNguoiDung: checkLogin.id }) // lay danh sach lo trinh tu store

    }
}

const mapStateToProps = (state) => {
    return {
        dsLichSu: state.LichSuTuongTacReducer.dsLichSu,
    }

}

export default connect(mapStateToProps)(LichSuNguoiDung)


