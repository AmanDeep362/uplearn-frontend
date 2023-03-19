import React, {useState, useEffect} from "react";
import { MdSimCardDownload, MdSearch } from "react-icons/md";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import Books from "./../../assets/images/booklibrary.jpg"
import axios from 'axios';

function LibraryHome(props){

    /////////////////////////////
    const [search, setsearch] = useState(props.bookfind);
    const [bookData , setbookData] = useState([]);

    const [start, setstart] = useState(0);
    const [end, setend] = useState(8);

    const searchBook=()=>{
        axios.get(
            'https://www.googleapis.com/books/v1/volumes?q='+ search + '&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU'+'&maxResults=20'
            )
            .then(res => {
                setbookData(res.data.items)
            })
            .catch(err => console.log(err))
    }

    // console.log(bookData)
    ////////////////////////////////
   
    const product =  props.data;

    useEffect(() => {
        var e = document.getElementById('replyprob');
        if(e){
            e.innerHTML = '';
        }
        setstart(0);
        setend(8);
    }, [product])

  
    const LoadLessBooks = () => {
        if(start > 0){
            setstart(start - 8);
            setend(end - 8);
            window.scroll(0, 300);
        }
        else{
            document.getElementById('replyprob').innerHTML = 'You are at start.'
        }
    }
    const LoadMoreBooks = () => {
        if(end < product.length){
            setstart(start + 8);
            setend(end + 8);
            window.scroll(0, 300);
        }
        else{
            document.getElementById('replyprob').innerHTML = 'No more Books Available.'
        }
    }

    return(
        <>
            <div className="library_products_heading ">
                <h1>BEST BOOKS</h1>
                <p>Total Books Available: {product.length}</p>
            </div>
            {
                product.length > 0 ? 
                null :
                <div  className="libraryaxios">
                        <h1> No data Found ...</h1>
                        <p>Sorry from our side but the book you are finding is not available in our library, you
                            can found more books by click on Search more.
                        </p>
                        {/* Adding Code to show extra available books using axios */}
                        <div className="library-filter-container" style={{padding: "0"}}>
                            <div className="librarySearch">
                                <input 
                                    name="librarySearch" 
                                    placeholder="What are you looking for ?"
                                    value={search}
                                    onChange={(e) => {setsearch(e.target.value)}}
                                />
                                
                                <button type="submit" onClick={searchBook}>
                                    <i><MdSearch /></i> Search
                                </button>
                            </div>
                        </div>
                        
                        {
                            bookData.length > 0 ?
                            <div className="home-products-details">
                                {bookData.map( (item) => {
                                    return(
                                        <div key={item.id} className={"card"} style={{width: "17.5rem"}}>
                                            {/* Upper Image Portion of card  */}
                                            <div className="Product-image-container">
                                                <img src={item.volumeInfo.imageLinks !== undefined ? item.volumeInfo.imageLinks.thumbnail : Books} 
                                                    className="home-product-image" alt="Products" 
                                                    style={{height: "200px"}}
                                                />
                                                    
                                                {/* Hot Icon On Card  */}
                                                <div className="Hotproducts">
                                                    {item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'General'}
                                                </div>
                                            </div>
                                                
                                            {/* Lower Body Portion of card  */}
                                            <div className="card-body">
                                                {/* Product Price in Body  */}
                                                <p className="card-text">{item.volumeInfo.title}</p>
                                                <h5 className="fade-title-header"> by {item.volumeInfo.publisher ? item.volumeInfo.publisher : 'NCERT'}</h5>  

                                                <a href={item.volumeInfo.previewLink}  target='_blank' rel="noreferrer noopener" className="downloadpdf">
                                                    <button className="lib-card-button">
                                                        <MdSimCardDownload/>&nbsp; Download
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    )
                                    })}
                                </div>
                                : null
                        }
                </div>
            }
            {/* Details of Product  */}
            <div className="home-products-details">
                {product.slice( start, end).map( (item) => {
                    return(
                        <div key={item._id} className={"card"} style={{width: "17.5rem"}}>
                            {/* Upper Image Portion of card  */}
                            <div className="Product-image-container">
                                <img src={item.BookImage} className="home-product-image" alt="Products" />
                                    
                                {/* Hot Icon On Card  */}
                                <div className="Hotproducts">
                                    {item.bookSubject}
                                </div>
                            </div>
                                   
                            {/* Lower Body Portion of card  */}
                            <div className="card-body">
                                {/* Product Price in Body  */}
                                <p className="card-text">{item.bookName}</p>
                                <h5 className="fade-title-header"> by {item.AuthorName}</h5>  

                                <a href={item.BookPdf}  target='_blank' rel="noreferrer noopener" className="downloadpdf">
                                    <button className="lib-card-button">
                                        <MdSimCardDownload/>&nbsp; Download
                                    </button>
                                </a>
                            </div>
                        </div>
                    )
                })}
            </div>

     
            {product.length > 0 ? 
                <div className="pagination" id="load"> 
                    <div>
                        <span onClick={LoadLessBooks}><GrLinkPrevious /></span>
                        <p>Load more books by click icons.</p>
                        <span onClick={LoadMoreBooks}><GrLinkNext /></span> 
                    </div>
 
                    <p className="invalid" id='replyprob'></p>
                </div>
                : 
                null
            } 
        </>
    )
}

export default LibraryHome;