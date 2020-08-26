import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { getAuthors } from '../actions/author';
import { getProfiles } from '../actions/profile';
import {Link, BrowserRouter as Router} from 'react-router-dom';


const TopAuthors = ({ profile:{profiles}, author:{authors}, getProfiles, getAuthors}) => {

    useEffect(() => {
        getProfiles()
        getAuthors()
    }, [])

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
    authorsArray.forEach((i) => { count[i] = (count[i] || 0) + 1});
    
    let values = []
        for (var element in count) {
            values.push({author: element, number: count[element]});
            
        }
    const sortedByValue = values.sort(compare)
        
        
    let authorsBySubValue = []

        sortedByValue.filter(function(newData){
            return authors.filter(function(oldData){
                
                if(newData.author == oldData._id){
                    authorsBySubValue.push({
                        '_id': newData.author,
                        'name': oldData.author,
                        'number': newData.number
                    })
                }

            })
        });
    
    const [currentPage, setCurrentPage] = useState(1)
    const authorsPerPage = 10;

    const total = authorsBySubValue.length;

    const lastIndex = currentPage * authorsPerPage;
    const firstIndex = lastIndex - authorsPerPage;

    const selectedAuthors = authorsBySubValue.slice(firstIndex, lastIndex);
        
    const theLastPage = total / authorsPerPage;

    const pageNumbers = []

    for(let i = 0; i < theLastPage; i++){
        pageNumbers.push(i)
    }

    return (
        <Fragment>
                
                    {
                        selectedAuthors.map((author, index) => <Fragment key={author._id}>
                            <div className="topList-item" key={author._id}>
                               <Link to={`/authors/${author._id}`}> {(currentPage - 1) * authorsPerPage + index + parseFloat(1)}. {author.name} <div className="authorSub"> <img height="15.5px" src={require('../style/author.png')}/>{author.number} </div></Link>

                            </div>
                        </Fragment>)
                    }
                    {
                        authors && pageNumbers.length > 0 && <Fragment>
                            <div className="pageNumbers">
                            {
                                pageNumbers.map(number => <div className="pageNumber" key={number} onClick={e=>setCurrentPage(number + 1)}>{number + 1}</div>)
                            }
                        </div>
                        </Fragment>
                    }
                    
                    
                    
                
        </Fragment>
    );
}
const mapStateToProps = state => ({
    profile: state.profile,
    author: state.author
})
export default connect(mapStateToProps, {getProfiles, getAuthors})(TopAuthors);