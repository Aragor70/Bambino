import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

const FrontPictures = ({authors, profiles, labelUrl, authorsLimitPerPage, authorContent, setAuthorContent, frontAuthors, setFrontAuthors, frontAuthor, setFrontAuthor }) => {

    const mapSubscribes = profiles.map(profile => profile.subscribes)
    const authorsArray = mapSubscribes.flat(1).map(sub => sub.author)
    
        function compare(a, b){
            const authorA = a.number
            const authorB = b.number
            let comparsion = 0
            if(authorA < authorB){
                comparsion = 1
            }
            else if(authorA > authorB){
                comparsion = -1
            }
            return comparsion;
        }
    
    let count = [];
    authorsArray.forEach(i => {count[i] = (count[i] || 0) + 1})
    
    let values = []
    for (var element in count) {
        values.push({author: element, number: count[element]});
        
    }
    


    const [currentAuthors, setCurrentAuthors] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [authorsPerPage, setAuthorsPerPage] = useState(authorsLimitPerPage);
    

    useEffect(() => {
        const fetchAuthors = () => {
            setCurrentAuthors(authors.filter(author => author));
            
        }
        fetchAuthors()
    }, [authors]);




    const sortedByValue = values.sort(compare)
    
    let authorsBySubValue = []
    sortedByValue.filter(function(newData){
        return currentAuthors.filter(function(oldData){
            
            if(newData.author == oldData._id){
                authorsBySubValue.push({
                    '_id': newData.author,
                    'name': oldData.author,
                    'number': newData.number,
                    'images': oldData.images,
                    'albums': oldData.albums,
                    'subscribes': newData.number,
                    'bio': oldData.bio
                })
            }

        })
    });

    


    const indexOfLastPost = currentPage * authorsPerPage;
    const indexOfFirstPost = 0;
    const selectedAuthors = authorsBySubValue.slice(indexOfFirstPost, indexOfLastPost);
    

    const totalAuthors = currentAuthors.length;
    const lastPageNumber = totalAuthors / authorsPerPage;
    
    const pageNumbers = []

    for(let i = 1; i <= lastPageNumber; i++){
        pageNumbers.push(i)
    }

    console.log(selectedAuthors)



    return (
        <Fragment>
        {
            authors == null ? "loading..." : <Fragment>
        
        <div className="featureFrontOfficial" style={{"backgroundColor": "#252525"}}>
                
            {selectedAuthors.map((author, index) => <Fragment key={author._id}>
                
                <div className={`picture official${index}`} key={author._id} onClick={e => {setFrontAuthors(false), setFrontAuthor(true), setAuthorContent(author)}}>
                    {
                        author.images[0] ? <img src={require(`../uploads/authors/image/${author.images[0].image}`)} /> : <img src={require("./style/guitar.png")} />
                    }  
                    <div className="officialName">{author.name}</div>
                
                </div>
            </Fragment>)}
            </div>
            </Fragment>
        }
        
        </Fragment>
    );
}
export default FrontPictures;