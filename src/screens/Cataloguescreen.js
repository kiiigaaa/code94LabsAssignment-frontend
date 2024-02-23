import React from 'react';
import axios from 'axios';
import DataTable from "react-data-table-component";
import { Modal } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
// import { addToCart } from "../actions/cartAction";
import { updateItemsAction, addItemsAction, deleteItemsAction } from '../actions/itemAction';
import star from '../assets/star.svg'
import starred from '../assets/starred.svg'

let itemId;
let x;

export default function Cataloguescreen() {

  const [catalogues, setCatalogues] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredCatalogues, setFilteredCatalogues] = useState([]);
  const [searchCatalogues, setSearchCatalogues] = useState("");
  const [filterType, setFilterType] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {

    function getCatalogues() {

      //get all catalogues from database
      axios.get("/api/items/getallitems").then((res) => {
        setCatalogues(res.data);
        setFilteredCatalogues(res.data);

      }).catch((err) => {
        console.log(err.message);
      })
    }

    getCatalogues();

  }, []);

  useEffect(() => {
    const results = catalogues.filter(catalogue => {
      if (filterType === "isFavourite") {
        return catalogue.isFavourite;
      } else {
        return true;
      }
    }).filter(catalogue => catalogue.name.toLowerCase().includes(searchCatalogues.toLowerCase()));
    setFilteredCatalogues(results);
  }, [filterType, catalogues, searchCatalogues]);

  const handleFilterChange = (e) => {
    setFilterType(e.target.checked ? "isFavourite" : "");
  };



  const handleImageUpload = (event) => {
    const files = event.target.files;
    setProductImages(files);
  };

  function getCurrentItem(itemId) {

    axios.get(`/api/items/getcurrentitem/${itemId}`).then((res) => {

      setItems(res.data);
      const items = res.data


    }).catch((error) => {
      console.log(error)


    })
  }

  const toggleFavorite = (itemId) => {
    const updatedFavorites = favorites.includes(itemId)
      ? favorites.filter(id => id !== itemId)
      : [...favorites, itemId];

    setFavorites(updatedFavorites);

    // Update favorites in local storage
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    // Update favorites on the backend
    axios.post('/api/items/updateFavorites', { favorites: updatedFavorites })
      .then(response => {
        console.log('Favorites updated on the backend:', response.data);
      })
      .catch(error => {
        console.error('Error updating favorites on the backend:', error);
      });
  };

  // UseEffect to load favorites from local storage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);



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
    {
      name: "Actions",
      cell: row => (
        <div>
          <button onClick={() => getCurrentItem(itemId = row._id)} data-bs-toggle="modal" href="#staticBackdrop1" style={{ background: 'none', border: 'none', fontSize: '20px', color: '#001EB9' }}>
            <i className="fas fa-edit"></i>
          </button>
          <button onClick={() => deleteItems(row._id)} type="button" style={{ background: 'none', border: 'none', fontSize: '20px', color: '#001EB9' }}>
            <i className="fas fa-trash-alt"></i>
          </button>
          <button onClick={() => toggleFavorite(row._id)} className="icon" style={{ background: 'none', border: 'none', fontSize: '20px' }}>
            {favorites.includes(row._id) ? (
              <i className="fas fa-star text-primary"></i>
            ) : (
              <i className="far fa-star"></i>
            )}
          </button>

        </div>
      ),
    },

  ];

  const [quantity, setquantity] = useState(1)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const dispatch = useDispatch()

  //update items

  const [name, updateitemName] = useState(items.name);
  const [image, updateitemImage] = useState(items.image);
  const [description, updateitemDescription] = useState(items.description);
  const [price, updateitemPrices] = useState(items.price);
  const [SKU, updateSKU] = useState(items.SKU);
  const [QTY, updateQty] = useState(items.QTY);


  function updateforitem(itemId) {


    const formData = new FormData();
    formData.append('name',name);
    formData.append('price',price);
    formData.append('description',description);
    formData.append('thumbnail', thumbnailIndex);
    formData.append('SKU',SKU);
    formData.append('QTY',QTY);

    for (let i = 0; i < image.length; i++) {
      formData.append('productImages', image[i]);
    }

    dispatch(updateItemsAction(formData, itemId));
  }

  //add new items

  const [newName, setitemName] = useState('');
  const [newImage, setitemImage] = useState('');
  const [newDescription, setitemDescription] = useState('');
  const [newPrices, setitemPrices] = useState('');
  const [newSKU, setSKU] = useState('');


  function addnewitem() {
    const formData = new FormData();
    formData.append('newName', newName);
    formData.append('newPrices', newPrices);
    formData.append('newDescription', newDescription);
    formData.append('thumbnail', thumbnailIndex);
    formData.append('sku', newSKU);
    formData.append('newQty',quantity);

    for (let i = 0; i < images.length; i++) {
      formData.append('productImages', images[i]);
    }

    console.log(newPrices,newSKU)

    dispatch(addItemsAction(formData));
  }

  //delete items
  function deleteItems(itemId) {

    if (window.confirm('Do you want to delete?')) {

    dispatch(deleteItemsAction(itemId));
  }

  }
  

  const [images, setImages] = useState([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(null);
  const [displaiImg, setdisplaiImg] = useState([]);


  const handleFileSelect = (e) => {
    const selectedFiles = e.target.files;
    const fileURLs = Array.from(selectedFiles).map(file => URL.createObjectURL(file));
    setImages(selectedFiles);
    setdisplaiImg(fileURLs);
  };

  const handleUpdateFileSelect = (e) => {
    const selectedFiles = e.target.files;
    const fileURLs = Array.from(selectedFiles).map(file => URL.createObjectURL(file));
    updateitemImage(selectedFiles);
    setdisplaiImg(fileURLs);
  };

  const handleThumbnailSelect = (index) => {
    setThumbnailIndex(index);
  };

  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);


  useEffect(() => {
    const results = catalogues.filter(catalogue => {
      if (showOnlyFavorites) {
        return catalogue.isFavourite;
      } else {
        return true;
      }
    }).filter(catalogue => catalogue.name.toLowerCase().includes(searchCatalogues.toLowerCase()));
    setFilteredCatalogues(results);
  }, [showOnlyFavorites, catalogues, searchCatalogues]);

  const toggleShowOnlyFavorites = () => {
    setShowOnlyFavorites(!showOnlyFavorites);
  };



  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className='row justify-content-center'>
        <div className='col-md-9 m-3 p-0'>
          {/* Data table for customer details */}
          <DataTable
            title=<div style={{ paddingTop: '25px' }}><h20>Products</h20></div>
            columns={columnsOrders}
            data={filteredCatalogues}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="450px"
            selectableRows
            selectableRowsHighlight
            subHeader
            noDataComponent={<div className="text-center"><p10>No items available...</p10></div>}
            subHeaderComponent={
              <div className="p-3 d-flex align-items-center">
                <input
                  type="text"
                  placeholder="Search Items..."
                  className='w-100 form-control mr-2'
                  value={searchCatalogues}
                  onChange={(e) => setSearchCatalogues(e.target.value)}
                />

                <img
                  className="p-2"
                  src={showOnlyFavorites ? starred : star}
                  alt="Toggle Favorites"
                  style={{ cursor: 'pointer', backgroundColor: 'white', border: 'white',border: '1px solid #001EB9',borderRadius: '20%',padding:'3px',marginLeft:'20px',marginTop:"7px" }}
                  onClick={toggleShowOnlyFavorites}
                />

              </div>

            }
          />

          <br />
          <br />
          <div className='modal-footer'>
            <button class="btn" data-bs-target="#staticBackdrop2" data-bs-toggle="modal" data-bs-dismiss="modal"><i class="fa-solid fa-plus fa-beat" style={{ "color": "white" }}></i> Add New Items</button>
          </div>





        </div>
      </div>


      {/* Model 1 - Preview & Edit Items */}
      <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">



            <div class="modal-header">


              <h5 class="modal-title" id="exampleModalToggleLabel">
                <h20>Edit Items</h20>


              </h5>

              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>



            </div>

            <div class="modal-body">

              <div class="container p-4">
                <div class="row">
                  <div class="col order-last">


                    <div className="container text-center">

                      <div className="form-group">
                        <label htmlFor="itemName"><h9 style={{ fontSize: "15px", color: 'black' }}>Item Name</h9></label>
                        <input
                          type="text"
                          id="itemName"
                          placeholder='Enter Item Name'
                          className="form-control"
                          value={name}
                          onChange={(e) => { updateitemName(e.target.value) }}
                          style={{ fontFamily: 'Mukta, calibri', color: "black", fontStyle: "italic", fontSize: "15px" }}
                        />
                      </div>

                      <br></br>

                      <div class="form-group">
                        <label htmlFor="foodDescription" style={{ display: 'block', marginBottom: '10px' }}><h9 style={{ fontSize: "15px", color: 'black' }}>Food Description</h9></label>

                        <textarea
                          class="form-control"
                          id="foodDescription"
                          rows="15"
                          placeholder='Enter Description'
                          value={description}
                          onChange={(e) => { updateitemDescription(e.target.value) }}
                          style={{ fontFamily: 'Mukta, calibri', color: "#6c757d", fontStyle: "italic", fontSize: "15px" }}
                        >

                        </textarea>
                      </div>

                      <br></br>
                      <div className="row">

                        <label style={{ display: 'block', marginBottom: '10px' }}>
                          <h9 style={{ fontSize: "15px", color: 'black' }}>Item Price</h9>
                        </label>
                        <div className="col">
                          <div style={{ alignItems: 'center' }}>
                            <input
                              type="text"
                              id="price"
                              className="form-control"
                              value={price}
                              onChange={(e) => { updateitemPrices(e.target.value) }}
                              style={{ fontFamily: 'Signika Negative, sans-serif', color: "black", fontSize: "20px" }}
                            />
                          </div>
                          <br />
                        </div>
                      </div>

                    </div>

                  </div>


                  <div class="col order-first">

                  <div className="form-group">
                        <label htmlFor="itemSKU"><h9 style={{ fontSize: "15px", color: 'black' }}>SKU</h9></label>
                        <input
                          type="text"
                          id="itemSKU"
                          placeholder='Enter Item Name'
                          className="form-control"
                          value={SKU}
                          onChange={(e) => { updateSKU(e.target.value) }}
                          style={{ fontFamily: 'Mukta, calibri', color: "black", fontStyle: "italic", fontSize: "15px" }}
                        />
                      </div>


                    <div className='row justify-content center'>

                      <label htmlFor="itemImage" style={{ display: 'block', marginBottom: '10px' }}>
                        <br></br>
                        <h9 style={{ fontSize: '15px', color: 'black' }}>Item Image</h9>
                      </label>
                      <form encType='multipart/form-data'>
                        <input type='file' name='productImages' multiple onChange={handleUpdateFileSelect} />
                      </form>

                      {/* Image Upload Section */}
                      <div className="container text-center">
                        <div className="row">
                          <br></br>
                          {displaiImg.map((image, index) => (
                            <div key={index} className="col">
                              <img src={image} width={150} height={150} alt={`Image ${index + 1}`} style={{  marginBottom: '10px', paddingTop:'20px' }} />
                              {/* Add a button to select as thumbnail */}
                              <button onClick={() => handleThumbnailSelect(index)} className="btn btn-primary">
                                {thumbnailIndex === index ? 'Thumbnail Selected' : 'Select as Thumbnail'}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>




                    </div>
                    <br></br>
                  </div>
                </div>
              </div>

            </div>




            <div class="modal-footer">
              <button onClick={() => updateforitem(itemId, updateforitem)} type="button" class="btn " >Update</button>
            </div>

          </div>
        </div>
      </div >

      {/* Model 1 - Add Items */}
      <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">



            <div class="modal-header">


              <h5 class="modal-title" id="exampleModalToggleLabel">
                <h20>Add New Items</h20>


              </h5>

              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>



            </div>





            <div class="modal-body">

              <div class="container p-4">
                <div class="row">
                  <div class="col order-last">


                    <div className="container text-center">

                      <div className="form-group">
                        <label htmlFor="itemName"><h9 style={{ fontSize: "15px", color: 'black' }}>Item Name</h9></label>
                        <input
                          type="text"
                          id="itemName"
                          placeholder='Enter Item Name'
                          className="form-control"
                          value={newName}
                          onChange={(e) => { setitemName(e.target.value) }}
                          style={{ fontFamily: 'Mukta, calibri', color: "black", fontStyle: "italic", fontSize: "15px" }}
                        />
                      </div>

                      <br></br>

                      <div class="form-group">
                        <label htmlFor="foodDescription" style={{ display: 'block', marginBottom: '10px' }}><h9 style={{ fontSize: "15px", color: 'black' }}>Food Description</h9></label>

                        <textarea
                          class="form-control"
                          id="foodDescription"
                          rows="15"
                          placeholder='Enter Description'
                          value={newDescription}
                          onChange={(e) => { setitemDescription(e.target.value) }}
                          style={{ fontFamily: 'Mukta, calibri', color: "#6c757d", fontStyle: "italic", fontSize: "15px" }}
                        >

                        </textarea>
                      </div>

                      <br></br>
                      <div className="row">

                        <label style={{ display: 'block', marginBottom: '10px' }}>
                          <h9 style={{ fontSize: "15px", color: 'black' }}>Item Price</h9>
                        </label>
                        <div className="col">
                          <div style={{ alignItems: 'center' }}>
                            <input
                              type="text"
                              id="price"
                              className="form-control"
                              value={newPrices}
                              onChange={(e) => { setitemPrices(e.target.value) }}
                              style={{ fontFamily: 'Signika Negative, sans-serif', color: "black", fontSize: "20px" }}
                            />
                          </div>
                          <br />
                        </div>
                      </div>

                    </div>

                    <div className="flex-container">

                        <div className='w-100 m-1'>
                          <p>Quantity</p>
                          <select className='form-control' value={quantity} onChange={(e) => { setquantity(e.target.value) }}>
                            {Array(10).keys() && [...Array(10).keys()].map((x, i) => {
                              return <option value={i + 1}>{i + 1}</option>
                            })}
                          </select>
                        </div>

                      </div>

                  </div>


                  <div class="col order-first">

                  <div className="form-group">
                        <label htmlFor="itemSKU"><h9 style={{ fontSize: "15px", color: 'black' }}>SKU</h9></label>
                        <input
                          type="text"
                          id="itemSKU"
                          placeholder='Enter Item Name'
                          className="form-control"
                          value={newSKU}
                          onChange={(e) => { setSKU(e.target.value) }}
                          style={{ fontFamily: 'Mukta, calibri', color: "black", fontStyle: "italic", fontSize: "15px" }}
                        />
                      </div>


                    <div className='row justify-content center'>

                      <label htmlFor="itemImage" style={{ display: 'block', marginBottom: '10px' }}>
                        <br></br>
                        <h9 style={{ fontSize: '15px', color: 'black' }}>Item Image</h9>
                      </label>
                      <form encType='multipart/form-data'>
                        <input type='file' name='productImages' multiple onChange={handleFileSelect} />
                      </form>

                      {/* Image Upload Section */}
                      <div className="container text-center">
                        <div className="row">
                          <br></br>
                          {displaiImg.map((image, index) => (
                            <div key={index} className="col">
                              <img src={image} width={150} height={150} alt={`Image ${index + 1}`} style={{  marginBottom: '10px', paddingTop:'20px' }} />
                              {/* Add a button to select as thumbnail */}
                              <button onClick={() => handleThumbnailSelect(index)} className="btn btn-primary">
                                {thumbnailIndex === index ? 'Thumbnail Selected' : 'Select as Thumbnail'}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>




                    </div>
                    <br></br>
                  </div>
                </div>
              </div>

            </div>

            <div class="modal-footer">
              <button onClick={() => addnewitem(addnewitem)} type="button" class="btn " >Add Product</button>
            </div>

          </div>
        </div>
      </div >



    </div >
  )
}
