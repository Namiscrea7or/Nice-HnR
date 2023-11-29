import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TableList = ({ onSelectTables }) => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('URL_API/tables');
                const tablesWithIsChosen = response.data.map(table => ({
                    ...table,
                    isChosen: false,
                }));
                setTables(tablesWithIsChosen);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bàn:', error);
            }
        };

        fetchData();
    }, []);

    const handleCheckboxChange = (tableId) => {
        const updatedTables = tables.map((table) =>
            table.id === tableId ? { ...table, isChosen: !table.isChosen } : table
        );

        setTables(updatedTables);

        const selectedItems = updatedTables
            .filter((table) => table.isChosen)
            .map((table) => table.id);

        onSelectTables(selectedItems);
    };

    return (
        <div className='bookTable'>
            <h1 id='bookingTableHeader'>Đặt bàn ăn tại khách sạn</h1>
            <div className="tableList">
                {tables.map((table) => (
                    <div key={table.id}>
                        {/* <img src={require(`./img/${table.table_type}.jpg`)} alt="" /> */}
                        <div className="table_info">
                            <input
                                type="checkbox"
                                checked={table.isChosen}
                                onChange={() => handleCheckboxChange(table.id)}
                            />
                            <h2>Loại phòng: {table.table_type}</h2>
                            <p>Số phòng: {table.table_number}</p>
                            <p>Trạng thái: {table.states}</p>
                            <p>Giá phòng: {table.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableList;
