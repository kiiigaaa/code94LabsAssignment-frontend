import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DataTable from "react-data-table-component";


const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        // Fetch search results based on the search term
        const response = await fetch(`http://localhost:8070/api/items/search?term=${searchTerm}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  const columnsOrders = [

    {
      name: "SKU",
      selector: (row) => row.SKU,
      sortable: true
    },
    {
      name: "Preview",
      cell: (row) => (
        row.images.length > 0 && <img width={75} height={75} src={row.images[row.thumbnail]} alt="Preview" />
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true
    },

  ];

  return (
    <div>

<div className='row justify-content-center'>
   
        <div className='col-md-9 m-3 p-0'>
        <br></br>
    <br></br>
    <br/>
    <br/>
    <br/>
          {/* Data table for customer details */}
          <DataTable
            title=<div style={{ paddingTop: '25px' }}><h2>Search Results for "{searchTerm}"</h2></div>
            columns={columnsOrders}
            data={searchResults}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="450px"
            selectableRows
            selectableRowsHighlight
            subHeader
            noDataComponent={<div className="text-center"><p10>No items available...</p10></div>}
          />

          <br />
          <br />





        </div>
      </div>
      
    </div>
  );
};
export default SearchPage;
