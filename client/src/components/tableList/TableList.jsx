import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableList = ({ onSelectTables }) => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/table/available_tables', {
                    headers: { Authorization: localStorage.getItem('Saved Token') }
                });

                console.log('API Response:', response.data);
                const { success, tables } = response.data;
                const tablesWithIsChosen = tables.map(table => ({
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

    const handleCheckboxChange = (tableNumber) => {
        const updatedTables = tables.map((table) => ({
            ...table,
            isChosen: table.table_number === tableNumber ? !table.isChosen : false,
        }));
    
        setTables(updatedTables);
    
        const selectedTable = updatedTables.find((table) => table.isChosen);
    
        onSelectTables(selectedTable);
    };

    return (
        <div className='bookTable'>
            <div className="tableList">
                {tables.map((table) => (
                    <div key={table.table_number}>
                        <div className="table_info">
                            <h2>Loại bàn: {table.table_type}</h2>
                            <p>Số bàn: {table.table_number}</p>
                            <p>Trạng thái: {table.states}</p>
                            <p>Giá bàn: {table.price}</p>
                            <input
                                type="checkbox"
                                checked={table.isChosen}
                                onChange={() => handleCheckboxChange(table.table_number)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableList;
