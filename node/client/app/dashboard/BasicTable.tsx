import React, { useState, useEffect, useMemo } from 'react';
import { useTable, Column } from 'react-table';
import axios from 'axios';

interface Data {
    id: string,
    from: string,
    to: string[],
    subject: string,
    text: string,
    created_at: string,
    updated_at: string
}

const BasicTable = () => {
    const columns = useMemo<Column<Data>[]>(() => [
        {
            Header: 'ID',
            accessor: 'id',
        },
        {
            Header: 'From',
            accessor: 'from',
        },
        {
            Header: 'To',
            accessor: 'to',
        },
        {
            Header: 'Subject',
            accessor: 'subject',
        },
        {
            Header: 'Text',
            accessor: 'text',
        },
        {
            Header: 'Created At',
            accessor: 'created_at',
        },
        {
            Header: 'Updated At',
            accessor: 'updated_at',
        },
    ], []);
    const [data, setData] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/emails`, {
                    withCredentials: true
                });
                setData(data.results);   
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    // Use the useTable Hook to send the columns and data to build the table
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
    } = useTable({
        columns,
        data
    });

    /* 
      Render the UI for your table
      - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
    */
    return (
        <table {...getTableProps()} className="table w-full border-collapse">
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} className="p-2 bg-gray-200 font-semibold text-left">{column.render("Header")}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()} className="p-2 border-t">{cell.render("Cell")}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default BasicTable;