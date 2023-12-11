import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TableDetail from '../../components/Stuff Detail/TableDetail';

const ManageTable = () => {
    const history = useNavigate();
    const [tables, setTables] = useState([]);
    const [newTable, setNewTable] = useState({
        table_type: '',
        table_number: '',
        state: '',
        price: '',
    });
    const [editTable, setEditTable] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/table/all_tables', {
                    headers: { Authorization: localStorage.getItem('Saved Token') },
                });
                const { success, tables } = response.data;
                setTables(tables);
            } catch (error) {
                console.error('Error fetching tables:', error.response?.status, error.response?.data);
            }
        };

        fetchData();
    }, []);

    const handleDeletetable = async (tableId) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/table/${tableId}`, {
                headers: {
                    Authorization: localStorage.getItem('Saved Token'),
                },
            });

            console.log(res.data);

            // Update the state by filtering out the deleted table
            setTables(prevTables => prevTables.filter(table => table.table_number !== tableId));
        } catch (e) {
            console.error('Error deleting table:', e);
        }
    };

    const handleEditClick = (table) => {
        setEditTable({ ...table });
    };

    const handleAddClick = () => {
        setShowAddForm(true);
    };

    const handleAddTableSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/table/add_table', newTable, {
                headers: {
                    Authorization: localStorage.getItem('Saved Token'),
                },
            });

            const { success, table } = response.data;

            // Update the state only if the table is not already present
           
            setTables(prevTables => [...prevTables, table]);
            

            
            setShowAddForm(false);
        } catch (error) {
            console.error('Error adding table:', error.response?.status, error.response?.data);
        }
    };

    const handleCancelAddTable = () => {
        setShowAddForm(false);
    };

    return (
        <div>
            <h2>Manage tables</h2>
            <ul>
                {tables.map((table) => (
                    <li key={table.table_number}>
                        <TableDetail
                            table={table}
                            onEditClick={handleEditClick}
                            onDeleteClick={handleDeletetable}
                        />
                    </li>
                ))}
            </ul>
            {showAddForm && (
                <div>
                    <h3>Add new table</h3>
                    <form onSubmit={handleAddTableSubmit}>
                    <label>Table Type:
                            <input
                                type="text"
                                value={newTable.table_type}
                                onChange={(e) => setNewTable({ ...newTable, table_type: e.target.value })}
                                required
                            />
                        </label>
                        <br />
                        <label>Table number:
                            <input
                                type="text"
                                value={newTable.table_number}
                                onChange={(e) => setNewTable({ ...newTable, table_number: e.target.value })}
                                required
                            />
                        </label>
                        <br />
                        <label>State:
                            <input
                                type="text"
                                value={newTable.state}
                                onChange={(e) => setNewTable({ ...newTable, state: e.target.value })}
                                required
                            />
                        </label>
                        <br />
                        <label>Price:
                            <input
                                type="text"  // Chuyển type về text để có thể tự do nhập số
                                inputMode="numeric"  // Chỉ cho phép nhập số
                                pattern="[0-9]*"  // Bảo đảm chỉ nhập ký tự số
                                name="price"
                                value={newTable.price}
                                onChange={(e) => setNewTable({ ...newTable, price: e.target.value })}
                                required
                            />
                        </label>
                        <br />
                        <button type="submit">Gửi</button>
                        <button type="button" onClick={handleCancelAddTable}>Huỷ bỏ</button>
                    </form>
                </div>
            )}
            <button onClick={handleAddClick}>Thêm bàn mới</button>
        </div>
    );
};

export default ManageTable;
